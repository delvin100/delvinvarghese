import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createSkill } from '@/app/actions/portfolio'
import Link from 'next/link'

export default function NewSkillPage() {
  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Add Skill</h1>
        <Link href="/admin/skills">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Skill Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createSkill} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Skill Name</label>
              <Input id="name" name="name" required placeholder="e.g. React" />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">Category</label>
              <Input id="category" name="category" required placeholder="e.g. Programming" />
            </div>

            <div className="space-y-2">
              <label htmlFor="icon" className="text-sm font-medium">Icon Name (Lucide)</label>
              <Input id="icon" name="icon" required placeholder="e.g. Terminal" />
              <p className="text-xs text-muted-foreground">Valid icons: Database, Terminal, Layout, Code2</p>
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit">Create Skill</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
