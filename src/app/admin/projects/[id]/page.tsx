import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { updateProject } from '@/app/actions/portfolio'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: project, error } = await supabase.from('projects').select('*').eq('id', params.id).single()

  if (error || !project) {
    redirect('/admin/projects')
  }

  const updateProjectWithId = updateProject.bind(null, params.id)

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
        <Link href="/admin/projects">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updateProjectWithId} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input id="title" name="title" required defaultValue={project.title} />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea id="description" name="description" required defaultValue={project.description} rows={4} />
            </div>

            <div className="space-y-2">
              <label htmlFor="image_url" className="text-sm font-medium">Image URL</label>
              <Input id="image_url" name="image_url" defaultValue={project.image_url || ''} />
            </div>

            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm font-medium">Tags (comma separated)</label>
              <Input id="tags" name="tags" defaultValue={(project.tags || []).join(', ')} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="live_url" className="text-sm font-medium">Live Demo URL</label>
                <Input id="live_url" name="live_url" defaultValue={project.live_url || ''} />
              </div>
              <div className="space-y-2">
                <label htmlFor="github_url" className="text-sm font-medium">GitHub URL</label>
                <Input id="github_url" name="github_url" defaultValue={project.github_url || ''} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="order_index" className="text-sm font-medium">Display Order</label>
                <Input id="order_index" name="order_index" type="number" defaultValue={project.order_index} />
              </div>
              <div className="flex items-center space-x-2 pt-8">
                <input type="checkbox" id="is_published" name="is_published" className="h-4 w-4 rounded border-gray-300" defaultChecked={project.is_published} />
                <label htmlFor="is_published" className="text-sm font-medium">Published</label>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
