"use client"

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import { toast } from 'sonner'

export function SubmitButton({ 
  label,
  loadingText = "Saving..."
}: { 
  label: string
  loadingText?: string
}) {
  const { pending } = useFormStatus()
  
  return (
    <Button 
      type="submit" 
      size="lg" 
      disabled={pending}
      className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white shadow-lg hover:shadow-blue-500/25 transition-all w-full sm:w-auto text-md font-semibold"
    >
      {pending ? (
        <>
          <span className="flex items-center gap-2">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {loadingText}
          </span>
        </>
      ) : (
        <>
          {label}
          <Sparkles className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  )
}
