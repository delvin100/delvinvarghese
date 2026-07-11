'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { syncGitHubRepos } from '@/app/actions/github'

export function GitHubSyncButton() {
  const [isSyncing, setIsSyncing] = useState(false)

  const handleSync = async () => {
    // Prompt the user for their username
    const username = prompt("Enter your GitHub username to sync repositories (e.g. delvin100):", "delvin100")
    if (!username) return

    setIsSyncing(true)
    try {
      const result = await syncGitHubRepos(username)
      alert("Sync Complete: " + result.message)
    } catch (error: any) {
      alert("Sync Failed: " + error.message)
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <Button 
      variant="outline" 
      onClick={handleSync} 
      disabled={isSyncing}
      className="bg-[#24292e] text-white hover:bg-[#2f363d] border-[#1b1f23] hover:text-white"
    >
      {isSyncing ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <FaGithub className="mr-2 h-4 w-4" />
      )}
      {isSyncing ? "Syncing..." : "Sync from GitHub"}
    </Button>
  )
}
