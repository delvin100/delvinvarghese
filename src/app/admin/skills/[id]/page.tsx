import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { updateSkill } from '@/app/actions/portfolio'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function EditSkillPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: skill, error } = await supabase.from('skills').select('*').eq('id', params.id).single()

  if (error || !skill) {
    redirect('/admin/skills')
  }

  const updateSkillWithId = updateSkill.bind(null, params.id)

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Edit Skill</h1>
        <Link href="/admin/skills">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Skill Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updateSkillWithId} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Skill Name</label>
              <Input id="name" name="name" required defaultValue={skill.name} />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">Category</label>
              <Input id="category" name="category" required defaultValue={skill.category} />
            </div>

            <div className="space-y-2">
              <label htmlFor="icon" className="text-sm font-medium">Icon Name (Lucide)</label>
              <Input id="icon" name="icon" required defaultValue={skill.icon || ''} />
              <p className="text-xs text-muted-foreground">Valid icons: Database, Terminal, Layout, Code2</p>
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
