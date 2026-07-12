'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Image as ImageIcon, Link as LinkIcon, Type } from 'lucide-react'

export function IconSelector({ defaultType = 'lucide', defaultValue = '' }: { defaultType?: string, defaultValue?: string }) {
  const [iconType, setIconType] = useState(defaultType)

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium flex items-center gap-2 text-foreground/80">
        <ImageIcon className="h-4 w-4 text-purple-400" />
        Icon Type
      </Label>
      
      <RadioGroup 
        defaultValue={defaultType} 
        name="icon_type"
        onValueChange={setIconType} 
        className="flex gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="lucide" id="t-lucide" />
          <Label htmlFor="t-lucide" className="cursor-pointer flex items-center gap-1">
            <Type className="w-4 h-4" /> Lucide
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="url" id="t-url" />
          <Label htmlFor="t-url" className="cursor-pointer flex items-center gap-1">
            <LinkIcon className="w-4 h-4" /> URL
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="upload" id="t-upload" />
          <Label htmlFor="t-upload" className="cursor-pointer flex items-center gap-1">
            <ImageIcon className="w-4 h-4" /> Upload
          </Label>
        </div>
      </RadioGroup>

      <div className="mt-3">
        {iconType === 'lucide' && (
          <div className="space-y-2">
            <Input 
              name="icon_value" 
              defaultValue={iconType === 'lucide' ? defaultValue : ''} 
              placeholder="e.g. Terminal, Database" 
              className="bg-background/50 border-white/10"
              required 
            />
            <p className="text-xs text-muted-foreground">Type a Lucide icon name (e.g., Code2, Layout)</p>
          </div>
        )}

        {iconType === 'url' && (
          <div className="space-y-2">
            <Input 
              name="icon_value" 
              type="url"
              defaultValue={iconType === 'url' ? defaultValue : ''} 
              placeholder="https://example.com/icon.svg" 
              className="bg-background/50 border-white/10"
              required 
            />
            <p className="text-xs text-muted-foreground">Provide a direct link to an image (SVG, PNG, etc.)</p>
          </div>
        )}

        {iconType === 'upload' && (
          <div className="space-y-2">
            <Input 
              name="icon_file" 
              type="file" 
              accept="image/*"
              className="bg-background/50 border-white/10 h-auto p-0 cursor-pointer overflow-hidden file:border-0 file:border-r file:border-white/10 file:bg-blue-500/10 file:text-blue-400 file:px-4 file:py-3 file:mr-4 file:font-medium file:cursor-pointer file:hover:bg-blue-500/20 transition-all text-muted-foreground"
              required={!defaultValue || defaultType !== 'upload'}
            />
            <Input type="hidden" name="icon_value" value={defaultValue} />
            {defaultType === 'upload' && defaultValue && (
              <p className="text-xs text-muted-foreground">Leave blank to keep current uploaded image.</p>
            )}
            <p className="text-xs text-muted-foreground">Upload a square image (SVG, PNG, JPG)</p>
          </div>
        )}
      </div>
    </div>
  )
}
