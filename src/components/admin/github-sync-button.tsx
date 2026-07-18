'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, Search } from 'lucide-react'
import { FaGithub, FaLock, FaGlobe } from 'react-icons/fa'
import { fetchAvailableRepos, syncSelectedRepos } from '@/app/actions/github'
import { Input } from '@/components/ui/input'
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
  const [isLoading, setIsLoading] = useState(false)
  const [repos, setRepos] = useState<any[]>([])
  const [selectedRepos, setSelectedRepos] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')

  // Automatically fetch when the modal is opened
  useEffect(() => {
    if (isOpen) {
      handleFetchRepos()
    }
  }, [isOpen])

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      // Reset state when closed
      setTimeout(() => {
        setRepos([])
        setSelectedRepos(new Set())
        setSearchQuery('')
      }, 300)
    }
  }

  const handleFetchRepos = async () => {
    const username = "delvin100" // Hardcoded as per request
    
    setIsLoading(true)
    try {
      const result = await fetchAvailableRepos(username)
      if (result.success && result.data) {
        if (result.data.length === 0) {
          toast.success("No new repositories to sync. Everything is up to date!")
          setIsOpen(false)
        } else {
          setRepos(result.data)
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch repositories")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSyncSelected = async () => {
    const reposToSync = repos.filter(r => selectedRepos.has(r.html_url))
    if (reposToSync.length === 0) return

    setIsLoading(true)
    try {
      const result = await syncSelectedRepos(reposToSync)
      toast.success(result.message || "Repositories synced successfully!")
      setIsOpen(false)
    } catch (error: any) {
      toast.error(error.message || "Failed to sync repositories")
    } finally {
      setIsLoading(false)
    }
  }

  const toggleSelection = (url: string) => {
    const next = new Set(selectedRepos)
    if (next.has(url)) {
      next.delete(url)
    } else {
      next.add(url)
    }
    setSelectedRepos(next)
  }

  const filteredRepos = repos.filter(repo => 
    repo.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const toggleSelectAll = () => {
    if (filteredRepos.length === 0) return
    const allFilteredSelected = filteredRepos.every(r => selectedRepos.has(r.html_url))
    const next = new Set(selectedRepos)
    if (allFilteredSelected) {
      filteredRepos.forEach(r => next.delete(r.html_url))
    } else {
      filteredRepos.forEach(r => next.add(r.html_url))
    }
    setSelectedRepos(next)
  }

  const selectedFilteredCount = filteredRepos.filter(r => selectedRepos.has(r.html_url)).length

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger 
        render={
          <Button 
            variant="outline" 
            disabled={isLoading}
            className="bg-[#24292e] text-white hover:bg-[#2f363d] border-[#1b1f23] hover:text-white transition-all shadow-lg hover:shadow-black/20"
          />
        }
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <FaGithub className="h-4 w-4" />
        )}
        {isLoading ? "Loading..." : "Sync from GitHub"}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-xl max-h-[85vh] flex flex-col bg-[#0b1120] border-[#1e293b] shadow-2xl p-6 overflow-hidden">
        <DialogHeader className="gap-3 shrink-0">
          <DialogTitle className="text-xl flex items-center gap-2 text-slate-100">
            <div className="p-2 bg-blue-500/10 rounded-full">
              <FaGithub className="h-5 w-5 text-blue-400" />
            </div>
            Sync Repositories
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-base leading-relaxed pt-2">
            Select the repositories you want to add to your portfolio.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 flex-1 overflow-y-auto min-h-0">
          {isLoading && repos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <Loader2 className="h-8 w-8 animate-spin mb-4 text-blue-500" />
              <p>Fetching repositories from GitHub...</p>
            </div>
          ) : (
            <div className="space-y-4 h-full flex flex-col">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Search repositories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-[#0f172a] border-[#1e293b] text-slate-200 placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500 focus-visible:ring-offset-0"
                />
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-[#1e293b]">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox"
                    className="w-4 h-4 rounded border-[#334155] bg-[#0f172a] text-blue-600 focus:ring-blue-500/50 focus:ring-offset-[#0b1120]"
                    checked={filteredRepos.length > 0 && filteredRepos.every(r => selectedRepos.has(r.html_url))}
                    onChange={toggleSelectAll}
                  />
                  <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                    Select All {searchQuery ? 'Filtered' : ''} ({selectedFilteredCount}/{filteredRepos.length})
                  </span>
                </label>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 space-y-2 max-h-[40vh] custom-scrollbar">
                {filteredRepos.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 text-sm">
                    No repositories found matching your search.
                  </div>
                ) : (
                  filteredRepos.map(repo => (
                  <label 
                    key={repo.html_url} 
                    className="flex items-start gap-3 p-3 rounded-lg border border-[#1e293b] bg-slate-900/50 hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <div className="pt-1">
                      <input 
                        type="checkbox"
                        className="w-4 h-4 rounded border-[#334155] bg-[#0f172a] text-blue-600 focus:ring-blue-500/50 focus:ring-offset-[#0b1120]"
                        checked={selectedRepos.has(repo.html_url)}
                        onChange={() => toggleSelection(repo.html_url)}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-slate-200 truncate">
                          {repo.name}
                        </span>
                        {repo.private ? (
                          <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                            <FaLock className="w-2.5 h-2.5" /> Private
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                            <FaGlobe className="w-2.5 h-2.5" /> Public
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-400 line-clamp-2 leading-snug">
                        {repo.description || "No description provided"}
                      </p>
                    </div>
                  </label>
                )))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="sm:justify-end gap-3 pt-4 border-t border-[#1e293b]/50 mt-auto bg-[#0b1120] shrink-0">
          <Button
            type="button"
            variant="outline"
            className="border-white/10 bg-transparent text-slate-300 hover:bg-white/5 hover:text-white"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          
          <Button
            type="button"
            className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/25 transition-all"
            onClick={handleSyncSelected}
            disabled={isLoading || selectedRepos.size === 0 || repos.length === 0}
          >
            {isLoading && repos.length > 0 ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Syncing...
              </>
            ) : `Sync Selected (${selectedRepos.size})`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
