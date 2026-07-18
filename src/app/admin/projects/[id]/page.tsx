import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { updateProject } from '@/app/actions/portfolio'
import { createClient } from '@/lib/supabase/server'
import { SubmitButton } from '@/components/admin/submit-button'
import { ImageSelector } from '@/components/admin/image-selector'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Type, FileText, ListOrdered, Eye, Sparkles } from 'lucide-react'
import { ProjectUrlFields } from '@/components/admin/project-url-fields'

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient()
  const { data: project, error } = await supabase.from('projects').select('*').eq('id', id).single()

  if (error || !project) {
    redirect('/admin/projects')
  }

  const updateProjectWithId = updateProject.bind(null, id)

  return (
    <div className="space-y-8 max-w-3xl mx-auto relative mt-10">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[600px] bg-primary/10 blur-[100px] rounded-full pointer-events-none -z-10 transform-gpu" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">Edit Project</h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">Make changes to your existing project.</p>
        </div>
        <Link href="/admin/projects" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">Cancel</Button>
        </Link>
      </div>

      <Card className="glass-card border-white/10 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500" />
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-400" />
            Project Details
          </CardTitle>
          <CardDescription>Update the information below to modify your project.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateProjectWithId} className="space-y-6">
            <div className="space-y-3">
              <label htmlFor="title" className="text-sm font-medium flex items-center gap-2 text-foreground/80">
                <Type className="h-4 w-4 text-blue-400" />
                Title
              </label>
              <Input id="title" name="title" required defaultValue={project.title} placeholder="e.g. EcoGrow Precision Agriculture" className="bg-background/50 border-white/10 focus-visible:ring-blue-500/50 transition-all h-12 text-lg" />
            </div>

            <div className="space-y-3">
              <label htmlFor="description" className="text-sm font-medium flex items-center gap-2 text-foreground/80">
                <FileText className="h-4 w-4 text-purple-400" />
                Description
              </label>
              <Textarea id="description" name="description" required defaultValue={project.description} placeholder="Brief description of the project" rows={5} className="bg-background/50 border-white/10 focus-visible:ring-purple-500/50 transition-all text-base resize-none" />
            </div>

              <ImageSelector defaultValue={project.image_url || ''} />

            <ProjectUrlFields 
              defaultLiveUrl={project.live_url || ''} 
              defaultGithubUrl={project.github_url || ''}
              defaultTags={(project.tags || []).join(', ')}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-background/30 rounded-lg border border-white/5 mt-4">
              <div className="space-y-3">
                <label htmlFor="order_index" className="text-sm font-medium flex items-center gap-2 text-foreground/80">
                  <ListOrdered className="h-4 w-4 text-orange-400" />
                  Display Order
                </label>
                <Input id="order_index" name="order_index" type="number" defaultValue={project.order_index} className="bg-background/80 border-white/10 h-11 w-full max-w-[120px]" />
              </div>
              
              <div className="flex items-center space-x-3 pt-8 md:pt-0 md:h-full md:items-end md:pb-2">
                <div className="relative flex items-start">
                  <div className="flex h-6 items-center">
                    <input 
                      type="checkbox" 
                      id="is_published" 
                      name="is_published" 
                      className="h-5 w-5 rounded border-white/20 bg-background/50 text-blue-500 focus:ring-blue-500 focus:ring-offset-background cursor-pointer" 
                      defaultChecked={project.is_published} 
                    />
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <label htmlFor="is_published" className="font-medium text-foreground flex items-center gap-2 cursor-pointer">
                      <Eye className="h-4 w-4 text-blue-400" />
                      Published
                    </label>
                    <p className="text-muted-foreground text-xs">Make this project visible on your live site.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <SubmitButton label="Save Changes" />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
