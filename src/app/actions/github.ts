'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function fetchAvailableRepos(username: string) {
  if (!username) {
    throw new Error('GitHub username is required.')
  }

  const supabase = await createClient()
  const token = process.env.GITHUB_TOKEN

  // 1. Fetch repos from GitHub
  const headers: any = {
    'Accept': 'application/vnd.github.v3+json',
  }
  if (token) {
    headers['Authorization'] = `token ${token}`
  }

  // If token is provided, use /user/repos to get all repos (including private). 
  // Otherwise, use /users/{username}/repos to get public repos for the given username.
  const url = token 
    ? `https://api.github.com/user/repos?type=all&sort=updated&per_page=100` 
    : `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`

  const response = await fetch(url, {
    headers,
    next: { revalidate: 0 }
  })

  if (!response.ok) {
    if (response.status === 404) throw new Error('GitHub user not found.')
    if (response.status === 403) throw new Error('GitHub API rate limit exceeded. Please try again later.')
    if (response.status === 401) throw new Error('Invalid GitHub token.')
    throw new Error(`Failed to fetch from GitHub: ${response.statusText}`)
  }

  const repos = await response.json()

  // 2. Fetch existing projects to avoid duplicates
  const { data: existingProjects } = await supabase.from('projects').select('github_url')
  const existingUrls = new Set((existingProjects || []).map(p => p.github_url).filter(Boolean))

  // 3. Filter out forks, archived repos, and already synced repos
  const newRepos = repos.filter((repo: any) => 
    !repo.fork && 
    !repo.archived && 
    repo.html_url && 
    !existingUrls.has(repo.html_url)
  )

  return { success: true, data: newRepos }
}

export async function syncSelectedRepos(repos: any[]) {
  if (!repos || repos.length === 0) {
    return { success: true, message: 'No repositories selected to sync.' }
  }

  const supabase = await createClient()
  
  const { data: existingProjects } = await supabase.from('projects').select('id')
  const baseOrderIndex = existingProjects ? existingProjects.length : 0

  // 4. Map GitHub repo structure to our database structure
  const projectsToInsert = repos.map((repo: any, index: number) => ({
    title: repo.name.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase()),
    description: repo.description || 'No description provided.',
    github_url: repo.html_url,
    live_url: repo.homepage || '',
    image_url: '', // Left blank so user can add custom cover image
    is_published: false, // Draft by default
    order_index: baseOrderIndex + index,
    tags: repo.topics && repo.topics.length > 0 ? repo.topics : (repo.language ? [repo.language] : [])
  }))

  // 5. Insert into Supabase
  const { error } = await supabase.from('projects').insert(projectsToInsert)

  if (error) {
    throw new Error(`Database error: ${error.message}`)
  }

  revalidatePath('/', 'layout')
  
  return { 
    success: true, 
    message: `Successfully imported ${repos.length} new project(s) as drafts.` 
  }
}
