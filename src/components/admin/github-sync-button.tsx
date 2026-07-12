'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { syncGitHubRepos } from '@/app/actions/github'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"

export function GitHubSyncButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)

  const handleSync = async () => {
    const username = "delvin100" // Hardcoded as per request
    
    setIsSyncing(true)
    try {
      const result = await syncGitHubRepos(username)
      toast.success(result.message || "Repositories synced successfully!")
      setIsOpen(false)
    } catch (error: any) {
      toast.error(error.message || "Failed to sync repositories")
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger 
        render={
          <Button 
            variant="outline" 
            disabled={isSyncing}
            className="w-full bg-[#24292e] text-white hover:bg-[#2f363d] border-[#1b1f23] hover:text-white transition-all shadow-lg hover:shadow-black/20"
          />
        }
      >
        {isSyncing ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FaGithub className="mr-2 h-4 w-4" />
        )}
        {isSyncing ? "Syncing..." : "Sync from GitHub"}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md bg-[#0b1120] border-[#1e293b] shadow-2xl p-6">
        <DialogHeader className="gap-3">
          <DialogTitle className="text-xl flex items-center gap-2 text-slate-100">
            <div className="p-2 bg-blue-500/10 rounded-full">
              <FaGithub className="h-5 w-5 text-blue-400" />
            </div>
            Sync Repositories
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-base leading-relaxed pt-2">
            Are you sure you want to sync repositories from Github account <strong className="text-blue-400 font-semibold">delvin100</strong>? This will fetch your latest projects and update your portfolio.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end gap-3 pt-6 border-t border-[#1e293b]/50 mt-2 bg-transparent">
          <Button
            type="button"
            variant="outline"
            className="border-white/10 bg-transparent text-slate-300 hover:bg-white/5 hover:text-white"
            onClick={() => setIsOpen(false)}
            disabled={isSyncing}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/25 transition-all"
            onClick={handleSync}
            disabled={isSyncing}
          >
            {isSyncing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Syncing...
              </>
            ) : "Yes, Sync Now"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
