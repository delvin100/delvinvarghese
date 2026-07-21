'use client'

import { useState } from 'react'
import { Trash2, Loader2 } from 'lucide-react'
import { deleteUser } from '@/app/actions/admin'
import { toast } from 'sonner'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function DeleteUserButton({ userId, userName }: { userId: string, userName: string }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [open, setOpen] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    const result = await deleteUser(userId)
    if (result?.error) {
      toast.error(result.error)
      setIsDeleting(false)
    } else {
      toast.success("User deleted successfully")
      setOpen(false)
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger 
        render={
          <button 
            disabled={isDeleting}
            className="text-red-500 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-red-500/20 inline-flex items-center justify-center disabled:opacity-50"
            title="Delete user"
          />
        }
      >
        {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
      </DialogTrigger>
      
      <DialogContent showCloseButton={true} className="sm:max-w-md bg-[#0f172a] border-slate-800 text-white p-0 overflow-hidden rounded-xl">
        <div className="p-6 pb-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl font-semibold text-white">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500/10">
                <Trash2 className="h-5 w-5 text-[#f43f5e]" />
              </div>
              Delete User
            </DialogTitle>
            <DialogDescription className="text-slate-300 mt-4 text-base">
              Are you sure you want to delete <span className="text-[#f43f5e] font-medium">{userName}</span>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
        </div>
        
        <div className="border-t border-slate-800 p-4 flex justify-end gap-3 bg-[#0f172a]">
          <DialogClose 
            render={
              <Button className="bg-slate-800 hover:bg-slate-700 text-white border-0" />
            }
          >
            Cancel
          </DialogClose>
          <Button 
            variant="destructive" 
            onClick={handleDelete} 
            disabled={isDeleting}
            className="bg-[#f43f5e] hover:bg-[#e11d48] text-white font-medium"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
