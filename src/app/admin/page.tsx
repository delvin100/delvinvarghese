import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'
import { Briefcase, Code, FileText, Award } from 'lucide-react'

async function getStats() {
  const supabase = await createClient()

  // Execute queries in parallel
  const [
    { count: projectsCount },
    { count: skillsCount },
    { count: expCount },
    { count: certsCount }
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('skills').select('*', { count: 'exact', head: true }),
    supabase.from('experience').select('*', { count: 'exact', head: true }),
    supabase.from('certifications').select('*', { count: 'exact', head: true }),
  ])

  return {
    projects: projectsCount || 0,
    skills: skillsCount || 0,
    experience: expCount || 0,
    certifications: certsCount || 0,
  }
}

export default async function AdminOverviewPage() {
  const stats = await getStats()

  const cards = [
    { title: 'Total Projects', value: stats.projects, icon: Briefcase, color: 'text-blue-500' },
    { title: 'Skills Tracked', value: stats.skills, icon: Code, color: 'text-green-500' },
    { title: 'Experience Roles', value: stats.experience, icon: FileText, color: 'text-amber-500' },
    { title: 'Certifications', value: stats.certifications, icon: Award, color: 'text-purple-500' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here is a summary of your portfolio content.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Feature coming soon... You'll see your recent updates here.
            </p>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-2">
            <a href="/" target="_blank" className="text-sm text-primary hover:underline flex items-center">
              View Public Portfolio
            </a>
            <a href="https://supabase.com/dashboard" target="_blank" className="text-sm text-primary hover:underline flex items-center">
              Supabase Dashboard
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
