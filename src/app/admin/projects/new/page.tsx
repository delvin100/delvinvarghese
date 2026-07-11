import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createProject } from '@/app/actions/portfolio'
import Link from 'next/link'

export default function NewProjectPage() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Add Project</h1>
        <Link href="/admin/projects">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createProject} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input id="title" name="title" required placeholder="e.g. EcoGrow Precision Agriculture" />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea id="description" name="description" required placeholder="Brief description of the project" rows={4} />
            </div>

            <div className="space-y-2">
              <label htmlFor="image_url" className="text-sm font-medium">Image URL</label>
              <Input id="image_url" name="image_url" placeholder="https://..." />
            </div>

            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm font-medium">Tags (comma separated)</label>
              <Input id="tags" name="tags" placeholder="Python, React, Node.js" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="live_url" className="text-sm font-medium">Live Demo URL</label>
                <Input id="live_url" name="live_url" placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <label htmlFor="github_url" className="text-sm font-medium">GitHub URL</label>
                <Input id="github_url" name="github_url" placeholder="https://github.com/..." />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="order_index" className="text-sm font-medium">Display Order</label>
                <Input id="order_index" name="order_index" type="number" defaultValue="0" />
              </div>
              <div className="flex items-center space-x-2 pt-8">
                <input type="checkbox" id="is_published" name="is_published" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                <label htmlFor="is_published" className="text-sm font-medium">Published</label>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit">Create Project</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
