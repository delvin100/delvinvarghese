'use client'

import { useState, useEffect } from "react"
import { Reorder, useDragControls } from "framer-motion"
import { Button, buttonVariants } from "@/components/ui/button"
import { Save, GripVertical, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { updateProjectsOrder, deleteProjects, toggleProjectPublishStatus } from "@/app/actions/portfolio"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { DeleteProjectButton } from "./delete-project-button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Project = {
  id: string
  title: string
  is_published: boolean
  order_index: number
}

function ProjectItem({ 
  project, 
  isSelectionMode,
  isSelected,
  onToggleSelect 
}: { 
  project: Project
  isSelectionMode: boolean
  isSelected: boolean
  onToggleSelect: (id: string) => void
}) {
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
            if (!isSelectionMode) {
              e.preventDefault()
              controls.start(e)
            }
          }}
        >
          {!isSelectionMode && <GripVertical className="h-4 w-4" />}
        </div>
        <div className="flex items-center gap-3 justify-center ml-4">
          {isSelectionMode && (
            <Checkbox 
              checked={isSelected}
              onCheckedChange={() => onToggleSelect(project.id)}
              className="border-slate-500"
            />
          )}
          {project.title}
        </div>
      </td>
      <td className="px-4 py-4 text-center align-middle">
        <button
          onClick={async () => {
            const nextStatus = !project.is_published;
            try {
              await toggleProjectPublishStatus(project.id, nextStatus);
              toast.success(`Project ${nextStatus ? 'Published' : 'Moved to Draft'}`);
            } catch (error: any) {
              toast.error("Failed to update status");
            }
          }}
          className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border cursor-pointer hover:scale-105 transition-all shadow-sm ${
            project.is_published 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/40 hover:shadow-emerald-500/10' 
              : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white hover:border-slate-500'
          }`}
        >
          {project.is_published ? (
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Published</span>
          ) : (
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span> Draft</span>
          )}
        </button>
      </td>
      <td className="px-4 py-4 text-center align-middle">
        <div className="flex justify-center items-center gap-1">
          {!isSelectionMode && (
            <>
              <Link href={`/admin/projects/${project.id}`} className={buttonVariants({ variant: "ghost", size: "icon", className: "h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10" })}>
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Link>
              <DeleteProjectButton projectId={project.id} projectTitle={project.title} />
            </>
          )}
        </div>
      </td>
    </Reorder.Item>
  )
}

export function ProjectsDndList({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  
  useEffect(() => {
    setProjects(initialProjects)
  }, [initialProjects])

  const [isSaving, setIsSaving] = useState(false)
  const [isSelectionMode, setIsSelectionMode] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [isDeletingBulk, setIsDeletingBulk] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  
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

  const handleToggleSelect = (id: string) => {
    const next = new Set(selectedIds)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    setSelectedIds(next)
  }

  const handleToggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode)
    setSelectedIds(new Set()) // clear selection when toggling mode
  }

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return
    
    setIsDeletingBulk(true)
    try {
      await deleteProjects(Array.from(selectedIds))
      toast.success(`${selectedIds.size} project(s) deleted successfully`)
      
      // Update local state
      setProjects(prev => prev.filter(p => !selectedIds.has(p.id)))
      setIsSelectionMode(false)
      setSelectedIds(new Set())
      setIsDeleteDialogOpen(false)
    } catch (error: any) {
      toast.error("Failed to delete projects", {
        description: error.message,
      })
    } finally {
      setIsDeletingBulk(false)
    }
  }

  const selectedProjectNames = projects
    .filter(p => selectedIds.has(p.id))
    .map(p => p.title)

  const formatNamesList = (names: string[]) => {
    if (names.length === 0) return ""
    if (names.length === 1) return names[0]
    if (names.length === 2) return `${names[0]} and ${names[1]}`
    return `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-primary/5 border border-primary/20 rounded-xl p-4">
        <div className="flex flex-col gap-2">
          <div>
            <h3 className="font-semibold text-primary">Interactive Layout Editor</h3>
            <p className="text-sm text-muted-foreground mt-1">Drag the handles (⋮⋮) to reorder your projects.</p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Checkbox 
              id="selection-mode" 
              checked={isSelectionMode} 
              onCheckedChange={handleToggleSelectionMode} 
            />
            <label htmlFor="selection-mode" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
              Enable Selection Mode
            </label>
          </div>
        </div>
        <div className="flex gap-2">
          {isSelectionMode && selectedIds.size > 0 && (
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogTrigger render={<Button variant="destructive" className="transition-all" />}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Selected ({selectedIds.size})
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-[#0b1120] border-[#1e293b] shadow-2xl p-6">
                <DialogHeader className="gap-3">
                  <DialogTitle className="text-xl flex items-center gap-2 text-slate-100">
                    <div className="p-2 bg-red-500/10 rounded-full">
                      <Trash2 className="h-5 w-5 text-red-500" />
                    </div>
                    Delete Selected Projects
                  </DialogTitle>
                  <DialogDescription className="text-slate-400 text-base leading-relaxed pt-2">
                    Are you sure you want to delete <strong className="text-white font-semibold">{formatNamesList(selectedProjectNames)}</strong>? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end gap-3 pt-6 border-t border-[#1e293b]/50 mt-2 bg-transparent">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-white/10 bg-transparent text-slate-300 hover:bg-white/5 hover:text-white"
                    onClick={() => setIsDeleteDialogOpen(false)}
                    disabled={isDeletingBulk}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg hover:shadow-red-500/25 transition-all"
                    onClick={handleBulkDelete}
                    disabled={isDeletingBulk}
                  >
                    {isDeletingBulk ? "Deleting..." : "Delete All Selected"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          
          <Button 
            onClick={handleSaveOrder} 
            disabled={isSaving || isSelectionMode}
          >
            {isSaving ? "Saving..." : (
              <>
                <Save className="h-4 w-4" />
                Save Layout Order
              </>
            )}
          </Button>
        </div>
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
                <ProjectItem 
                  key={project.id} 
                  project={project} 
                  isSelectionMode={isSelectionMode}
                  isSelected={selectedIds.has(project.id)}
                  onToggleSelect={handleToggleSelect}
                />
              ))
            )}
          </Reorder.Group>
        </table>
      </div>
    </div>
  )
}
