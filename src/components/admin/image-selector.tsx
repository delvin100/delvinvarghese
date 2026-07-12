'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Image as ImageIcon, Link as LinkIcon } from 'lucide-react'

export function ImageSelector({ defaultValue = '' }: { defaultValue?: string }) {
  // If defaultValue is a local URL from supabase storage, it might start with http...
  // Let's just default to 'url' unless there's a specific need. 
  // We don't track 'type' in DB for project images, just the URL.
  // We can guess if it's an upload by checking if the URL contains 'supabase.co' or 'portfolio_icons'
  const isLikelyUpload = defaultValue && (defaultValue.includes('supabase.co') || defaultValue.includes('portfolio_icons'))
  const [imageType, setImageType] = useState(isLikelyUpload ? 'upload' : 'url')
  
  const [urlValue, setUrlValue] = useState(imageType === 'url' ? defaultValue : '')

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium flex items-center gap-2 text-foreground/80">
        <ImageIcon className="h-4 w-4 text-emerald-400" />
        Image Source
      </Label>
      
      <RadioGroup 
        value={imageType} 
        name="image_type"
        onValueChange={setImageType} 
        className="flex gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="url" id="img-url" />
          <Label htmlFor="img-url" className="cursor-pointer flex items-center gap-1">
            <LinkIcon className="w-4 h-4" /> URL
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="upload" id="img-upload" />
          <Label htmlFor="img-upload" className="cursor-pointer flex items-center gap-1">
            <ImageIcon className="w-4 h-4" /> Upload
          </Label>
        </div>
      </RadioGroup>

      <div className="mt-3">
        {imageType === 'url' && (
          <div className="space-y-2">
            <Input 
              name="image_url" 
              type="url"
              value={urlValue}
              onChange={(e) => setUrlValue(e.target.value)}
              placeholder="https://example.com/project-image.jpg" 
              className="bg-background/50 border-white/10 h-11"
              required={imageType === 'url'}
            />
            <p className="text-xs text-muted-foreground">Provide a direct link to an image.</p>
          </div>
        )}

        {imageType === 'upload' && (
          <div className="space-y-2">
            <input 
              name="image_file" 
              type="file" 
              accept="image/*"
              className="flex w-full rounded-md bg-background/50 border border-white/10 text-sm text-slate-300 overflow-hidden cursor-pointer file:cursor-pointer file:border-0 file:border-r file:border-white/10 file:bg-blue-500/10 file:px-4 file:py-2.5 file:mr-4 file:text-blue-400 file:font-medium hover:file:bg-blue-500/20 file:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
              required={!defaultValue || imageType !== 'upload'}
            />
            <Input type="hidden" name="image_url" value={defaultValue} />
            {imageType === 'upload' && defaultValue && (
              <p className="text-xs text-muted-foreground">Leave blank to keep current uploaded image.</p>
            )}
            <p className="text-xs text-muted-foreground">Upload a project cover image (PNG, JPG, WebP)</p>
          </div>
        )}
      </div>
    </div>
  )
}
