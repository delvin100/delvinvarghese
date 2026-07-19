'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { FaGithub } from 'react-icons/fa'
import { Tags, Link as LinkIcon, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function ProjectUrlFields({ 
  defaultLiveUrl = '',
  defaultGithubUrl = '',
  defaultTags = '' 
}: { 
  defaultLiveUrl?: string
  defaultGithubUrl?: string
  defaultTags?: string 
}) {
  const initialHidden = defaultGithubUrl.startsWith('HIDE_')
  const [hideGithub, setHideGithub] = useState(initialHidden)
  const [githubUrl, setGithubUrl] = useState(defaultGithubUrl.replace(/^HIDE_/, ''))
  const [tags, setTags] = useState(defaultTags)
  const [isFetching, setIsFetching] = useState(false)

  const handleFetchLanguages = async (urlToFetch: string, isManual: boolean = true) => {
    if (!urlToFetch) return;
    try {
      const url = new URL(urlToFetch.replace(/^HIDE_/, ''));
      if (url.hostname === 'github.com') {
        const parts = url.pathname.split('/').filter(Boolean);
        if (parts.length >= 2) {
          setIsFetching(true);
          const owner = parts[0];
          const repo = parts[1];
          const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, {
            cache: 'no-store'
          });
          
          if (res.ok) {
            const data = await res.json();
            const fetchedLanguages = Object.keys(data);
            setTags(fetchedLanguages.join(', '));
            if (isManual) {
              toast.success('Languages fetched successfully!');
            }
          } else {
            const errorData = await res.json().catch(() => ({}));
            console.warn('GitHub API Error:', errorData);
            if (isManual) {
              toast.error('Failed to fetch from GitHub', {
                description: `${errorData.message || res.statusText}. This usually means the repository is private or misspelled.`
              });
            }
          }
        }
      }
    } catch (e) {
      console.warn(e)
      if (isManual) {
        toast.error('Error fetching languages', {
          description: 'Please check the URL.'
        });
      }
    } finally {
      setIsFetching(false)
    }
  }

  return (
    <div className="space-y-6 w-full">
      <input type="hidden" name="hide_github_link" value={hideGithub ? 'on' : 'off'} />
      
      <div className="space-y-3">
        <label htmlFor="tags" className="text-sm font-medium flex items-center justify-between text-foreground/80">
          <div className="flex items-center gap-2">
            <Tags className="h-4 w-4 text-rose-400" />
            Languages (comma separated)
          </div>
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            className="h-6 text-xs px-2 text-blue-400 hover:text-blue-300"
            onClick={() => handleFetchLanguages(githubUrl, true)}
            disabled={isFetching || !githubUrl}
          >
            {isFetching ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <FaGithub className="h-3 w-3 mr-1" />}
            {isFetching ? 'Fetching...' : 'Auto-fetch'}
          </Button>
        </label>
        <Input 
          id="tags" 
          name="tags" 
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Python, React, Node.js" 
          className="bg-background/50 border-white/10 focus-visible:ring-rose-500/50 transition-all h-11" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label htmlFor="live_url" className="text-sm font-medium flex items-center gap-2 text-foreground/80">
            <LinkIcon className="h-4 w-4 text-cyan-400" />
            Live Demo URL
          </label>
          <Input 
            id="live_url" 
            name="live_url" 
            defaultValue={defaultLiveUrl}
            placeholder="https://..." 
            className="bg-background/50 border-white/10 focus-visible:ring-cyan-500/50 transition-all h-11" 
          />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="github_url" className="text-sm font-medium flex items-center gap-2 text-foreground/80">
              <FaGithub className="h-4 w-4 text-slate-400" />
              GitHub URL
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs text-foreground/70 hover:text-foreground">
              <input 
                type="checkbox" 
                checked={hideGithub}
                onChange={(e) => setHideGithub(e.target.checked)}
                className="rounded border-white/10 bg-background/50 text-rose-500 focus:ring-rose-500/50"
              />
              Hide link from visitors
            </label>
          </div>
          <Input 
            id="github_url" 
            name="github_url" 
            value={githubUrl}
            onChange={(e) => {
              setGithubUrl(e.target.value);
            }}
            onBlur={() => handleFetchLanguages(githubUrl, false)}
            placeholder="https://github.com/..." 
            className="bg-background/50 border-white/10 focus-visible:ring-slate-500/50 transition-all h-11" 
          />
        </div>
      </div>
    </div>
  )
}
