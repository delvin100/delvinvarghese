import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { deleteProject } from '@/app/actions/portfolio'
import { GitHubSyncButton } from '@/components/admin/github-sync-button'
import { DeleteProjectButton } from '@/components/admin/delete-project-button'
import { ProjectsDndList } from '@/components/admin/projects-dnd-list'

export default async function AdminProjectsPage() {
  const supabase = await createClient()

  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) {
    return <div>Error loading projects: {error.message}</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Manage the projects displayed on your portfolio.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
          <GitHubSyncButton />
          <Link href="/admin/projects/new">
            <Button>
              <Plus className="h-4 w-4" />
              Add Project
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
          <CardDescription>
            You have {projects.length} project(s) in total.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectsDndList initialProjects={projects} />
        </CardContent>
      </Card>
    </div>
  )
}
