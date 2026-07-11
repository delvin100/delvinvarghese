import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createExperience } from '@/app/actions/portfolio'
import Link from 'next/link'

export default function NewExperiencePage() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Add Experience</h1>
        <Link href="/admin/experience">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Experience Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createExperience} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">Role / Title</label>
              <Input id="role" name="role" required placeholder="e.g. AI Engineer Intern" />
            </div>

            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium">Company</label>
              <Input id="company" name="company" required placeholder="e.g. Agrowtein Labs" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="start_date" className="text-sm font-medium">Start Date</label>
                <Input id="start_date" name="start_date" type="date" />
              </div>
              <div className="space-y-2">
                <label htmlFor="end_date" className="text-sm font-medium">End Date (Leave empty if present)</label>
                <Input id="end_date" name="end_date" type="date" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea id="description" name="description" required placeholder="Describe your responsibilities" rows={4} />
            </div>

            <div className="space-y-2">
              <label htmlFor="icon" className="text-sm font-medium">Icon Name (Lucide)</label>
              <Input id="icon" name="icon" defaultValue="Briefcase" placeholder="e.g. Briefcase" />
              <p className="text-xs text-muted-foreground">Valid icons: Briefcase, GraduationCap</p>
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit">Create Experience</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
