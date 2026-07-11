import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { updateExperience } from '@/app/actions/portfolio'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient()
  const { data: experience, error } = await supabase.from('experience').select('*').eq('id', id).single()

  if (error || !experience) {
    redirect('/admin/experience')
  }

  const updateExperienceWithId = updateExperience.bind(null, id)

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Edit Experience</h1>
        <Link href="/admin/experience">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Experience Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updateExperienceWithId} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">Role / Title</label>
              <Input id="role" name="role" required defaultValue={experience.role} />
            </div>

            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium">Company</label>
              <Input id="company" name="company" required defaultValue={experience.company} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="start_date" className="text-sm font-medium">Start Date</label>
                <Input id="start_date" name="start_date" type="date" defaultValue={experience.start_date || ''} />
              </div>
              <div className="space-y-2">
                <label htmlFor="end_date" className="text-sm font-medium">End Date (Leave empty if present)</label>
                <Input id="end_date" name="end_date" type="date" defaultValue={experience.end_date || ''} />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea id="description" name="description" required defaultValue={experience.description} rows={4} />
            </div>

            <div className="space-y-2">
              <label htmlFor="icon" className="text-sm font-medium">Icon Name (Lucide)</label>
              <Input id="icon" name="icon" defaultValue={experience.icon || 'Briefcase'} />
              <p className="text-xs text-muted-foreground">Valid icons: Briefcase, GraduationCap</p>
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
