import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { SkillsDndList } from '@/components/admin/skills-dnd-list'

export default async function AdminSkillsPage() {
  const supabase = await createClient()

  const { data: rawSkills, error: skillsError } = await supabase
    .from('skills')
    .select('*')
    .order('order_index', { ascending: true })

  const { data: categories, error: catError } = await supabase
    .from('skill_categories')
    .select('*')
    .order('order_index', { ascending: true })

  if (skillsError || catError) {
    return <div>Error loading data: {skillsError?.message || catError?.message}</div>
  }

  // Map category data into skills so the DnD list works
  const skills = rawSkills.map(skill => {
    const category = categories?.find(c => c.id === skill.category_id)
    return {
      ...skill,
      category_name: category?.name || 'Uncategorized',
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Skills</h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Manage the skills displayed on your portfolio.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
          <Link href="/admin/categories/new">
            <Button variant="outline">
              <Plus className="h-4 w-4" />
              Add Category
            </Button>
          </Link>
          <Link href="/admin/skills/new">
            <Button>
              <Plus className="h-4 w-4" />
              Add Skill
            </Button>
          </Link>
        </div>
      </div>

      {skills.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-6 text-muted-foreground">
              No skills found. Click "Add Skill" to create one.
            </div>
          </CardContent>
        </Card>
      ) : (
        <SkillsDndList initialSkills={skills} categories={categories || []} />
      )}
    </div>
  )
}
