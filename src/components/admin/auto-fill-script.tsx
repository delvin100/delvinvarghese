'use client'

import { useEffect } from 'react'

export function AutoFillScript({ categoryIconMap }: { categoryIconMap: Record<string, string> }) {
  useEffect(() => {
    const input = document.getElementById('category') as HTMLInputElement
    const iconInput = document.getElementById('icon') as HTMLInputElement
    
    if (!input || !iconInput) return
    
    const handler = (e: Event) => {
      const val = (e.target as HTMLInputElement).value
      if (categoryIconMap[val]) {
        iconInput.value = categoryIconMap[val]
      }
    }
    
    input.addEventListener('input', handler)
    return () => input.removeEventListener('input', handler)
  }, [categoryIconMap])

  return null
}
