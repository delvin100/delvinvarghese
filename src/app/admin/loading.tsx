import { Loader2 } from "lucide-react"

export default function AdminLoading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[60vh] gap-4">
      <Loader2 className="w-10 h-10 animate-spin text-primary/50" />
      <p className="text-sm text-muted-foreground animate-pulse">Loading data...</p>
    </div>
  )
}
