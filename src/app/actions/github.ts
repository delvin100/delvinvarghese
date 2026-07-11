'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function syncGitHubRepos(username: string) {
  if (!username) {
    throw new Error('GitHub username is required.')
  }

  const supabase = await createClient()

  // 1. Fetch repos from GitHub
  const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      // If the user configures a token later, it can be added here to avoid rate limits
    },
    next: { revalidate: 0 }
  })

  if (!response.ok) {
    if (response.status === 404) throw new Error('GitHub user not found.')
    if (response.status === 403) throw new Error('GitHub API rate limit exceeded. Please try again later.')
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

  if (newRepos.length === 0) {
    return { success: true, message: 'No new repositories to sync. Everything is up to date!' }
  }

  // 4. Map GitHub repo structure to our database structure
  const projectsToInsert = newRepos.map((repo: any, index: number) => ({
    title: repo.name.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase()),
    description: repo.description || 'No description provided.',
    github_url: repo.html_url,
    live_url: repo.homepage || '',
    image_url: '', // Left blank so user can add custom cover image
    is_published: false, // Draft by default
    order_index: existingProjects ? existingProjects.length + index : index,
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
    message: `Successfully imported ${newRepos.length} new project(s) as drafts.` 
  }
}
