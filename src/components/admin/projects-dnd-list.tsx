'use client'

import { useState } from "react"
import { Reorder, useDragControls } from "framer-motion"
import { Button, buttonVariants } from "@/components/ui/button"
import { Save, GripVertical, Pencil } from "lucide-react"
import Link from "next/link"
import { updateProjectsOrder } from "@/app/actions/portfolio"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { DeleteProjectButton } from "./delete-project-button"

type Project = {
  id: string
  title: string
  is_published: boolean
  order_index: number
}

function ProjectItem({ project }: { project: Project }) {
  const controls = useDragControls()

  return (
    <Reorder.Item 
      value={project} 
      id={project.id}
      as="tr"
      dragListener={false} 
      dragControls={controls}
      className="hover:bg-white/[0.02] transition-colors border-b border-white/5 group relative bg-transparent select-none"
    >
      <td className="relative px-4 py-4 text-center font-medium text-slate-200 align-middle">
        {/* Absolute drag handle on the far left edge, invisible until hover */}
        <div 
          className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing text-slate-500 hover:text-slate-300 p-3 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity touch-none"
          onPointerDown={(e) => {
            e.preventDefault()
            controls.start(e)
          }}
        >
          <GripVertical className="h-4 w-4" />
        </div>
        {project.title}
      </td>
      <td className="px-4 py-4 text-center align-middle">
        {project.is_published ? (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Published
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
            Draft
          </span>
        )}
      </td>
      <td className="px-4 py-4 text-center align-middle">
        <div className="flex justify-center items-center gap-1">
          <Link href={`/admin/projects/${project.id}`} className={buttonVariants({ variant: "ghost", size: "icon", className: "h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10" })}>
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Link>
          <DeleteProjectButton projectId={project.id} projectTitle={project.title} />
        </div>
      </td>
    </Reorder.Item>
  )
}

export function ProjectsDndList({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  const handleSaveOrder = async () => {
    setIsSaving(true)
    
    try {
      const updates = projects.map((p, index) => ({
        id: p.id,
        order_index: index + 1
      }))

      await updateProjectsOrder(updates)
      toast.success("Project Order Saved!")
      router.refresh()
    } catch (error: any) {
      toast.error("Failed to save order", {
        description: error.message,
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-xl p-4">
        <div>
          <h3 className="font-semibold text-primary">Interactive Layout Editor</h3>
          <p className="text-sm text-muted-foreground mt-1">Drag the handles (⋮⋮) to reorder your projects.</p>
        </div>
        <Button 
          onClick={handleSaveOrder} 
          disabled={isSaving}
          className="bg-primary text-primary-foreground shadow-lg hover:shadow-primary/25 transition-all"
        >
          {isSaving ? "Saving..." : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Layout Order
            </>
          )}
        </Button>
      </div>

      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b border-white/10">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-center text-slate-400 font-bold uppercase text-xs tracking-wider py-4 align-middle">Title</th>
              <th className="h-12 px-4 text-center text-slate-400 font-bold uppercase text-xs tracking-wider py-4 align-middle">Status</th>
              <th className="h-12 px-4 text-center text-slate-400 font-bold uppercase text-xs tracking-wider py-4 align-middle">Actions</th>
            </tr>
          </thead>
          <Reorder.Group 
            as="tbody"
            axis="y" 
            values={projects} 
            onReorder={setProjects}
            className="[&_tr:last-child]:border-0"
          >
            {projects.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-8 text-slate-400">
                  No projects found. Click "Add Project" to create one.
                </td>
              </tr>
            ) : (
              projects.map(project => (
                <ProjectItem key={project.id} project={project} />
              ))
            )}
          </Reorder.Group>
        </table>
      </div>
    </div>
  )
}
