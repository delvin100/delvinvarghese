import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createExperience } from '@/app/actions/portfolio'
import { SubmitButton } from '@/components/admin/submit-button'
import Link from 'next/link'
import { Briefcase, ArrowLeft } from 'lucide-react'

export default function NewExperiencePage() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto relative mt-10 pb-12">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[600px] bg-primary/10 blur-[100px] rounded-full pointer-events-none -z-10 transform-gpu" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Add New Experience</h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">Document your professional journey and roles.</p>
        </div>
        <Link href="/admin/experience" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">Cancel</Button>
        </Link>
      </div>

      <Card className="relative border-muted/30 shadow-xl shadow-black/5 bg-surface/40 backdrop-blur-sm overflow-hidden mt-1">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400" />
        <CardHeader className="pb-6 pt-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 rounded-xl">
              <Briefcase className="w-6 h-6 text-blue-500" />
            </div>
            <CardTitle className="text-xl">Experience Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form action={createExperience} className="space-y-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="role" className="text-sm font-medium text-muted-foreground">Role / Title</label>
              <Input id="role" name="role" required placeholder="e.g. Full Stack Developer" className="h-12 bg-muted/10 border-muted-foreground/20 focus-visible:ring-blue-500/50" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="company" className="text-sm font-medium text-muted-foreground">Company</label>
              <Input id="company" name="company" required placeholder="e.g. Google, Tech Corp..." className="h-12 bg-muted/10 border-muted-foreground/20 focus-visible:ring-blue-500/50" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="start_date" className="text-sm font-medium text-muted-foreground">Start Date</label>
                <Input id="start_date" name="start_date" type="date" max={new Date().toISOString().split('T')[0]} className="h-12 bg-muted/10 border-muted-foreground/20 focus-visible:ring-blue-500/50" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="end_date" className="text-sm font-medium text-muted-foreground">End Date <span className="text-xs opacity-70">(Empty = Present)</span></label>
                <Input id="end_date" name="end_date" type="date" max={new Date().toISOString().split('T')[0]} className="h-12 bg-muted/10 border-muted-foreground/20 focus-visible:ring-blue-500/50" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-sm font-medium text-muted-foreground">Description</label>
              <Textarea id="description" name="description" required placeholder="Describe your responsibilities" rows={5} className="bg-muted/10 border-muted-foreground/20 focus-visible:ring-blue-500/50 resize-none" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="technologies" className="text-sm font-medium text-muted-foreground">Technologies Used <span className="text-xs opacity-70">(Comma separated)</span></label>
              <Input id="technologies" name="technologies" placeholder="e.g. React.js, Node.js, TailwindCSS" className="h-12 bg-muted/10 border-muted-foreground/20 focus-visible:ring-blue-500/50" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="icon" className="text-sm font-medium text-muted-foreground">Icon Name (Lucide)</label>
              <Input id="icon" name="icon" placeholder="e.g. Briefcase" className="h-12 bg-muted/10 border-muted-foreground/20 focus-visible:ring-blue-500/50" />
              <p className="text-xs text-muted-foreground mt-1">Valid icons: Briefcase, GraduationCap</p>
            </div>

            <div className="pt-6 flex justify-end">
              <SubmitButton label="Create Experience" loadingText="Creating..." />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
