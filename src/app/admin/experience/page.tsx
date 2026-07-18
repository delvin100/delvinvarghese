import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { ExperienceDndList } from '@/components/admin/experience-dnd-list'

export default async function AdminExperiencePage() {
  const supabase = await createClient()

  const { data: experiences, error } = await supabase
    .from('experience')
    .select('*')
    .order('order_index', { ascending: true })
    .order('start_date', { ascending: false, nullsFirst: false })

  if (error) {
    return <div>Error loading experience: {error.message}</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
          <p className="text-muted-foreground mt-2">
            Manage your work history and roles.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
          <Link href="/admin/experience/new">
            <Button>
              <Plus className="h-4 w-4" />
              Add Experience
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Experience</CardTitle>
          <CardDescription>
            You have {experiences.length} experience record(s) in total.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ExperienceDndList initialExperiences={experiences} />
        </CardContent>
      </Card>
    </div>
  )
}
