import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { deleteExperience } from '@/app/actions/portfolio'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default async function AdminExperiencePage() {
  const supabase = await createClient()

  const { data: experiences, error } = await supabase
    .from('experience')
    .select('*')
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
        <Link href="/admin/experience/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Experience
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Experience</CardTitle>
          <CardDescription>
            You have {experiences.length} experience record(s) in total.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {experiences.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                    No experience records found. Click "Add Experience" to create one.
                  </TableCell>
                </TableRow>
              ) : (
                experiences.map((exp) => (
                  <TableRow key={exp.id}>
                    <TableCell className="font-medium">{exp.role}</TableCell>
                    <TableCell>{exp.company}</TableCell>
                    <TableCell>
                      {exp.start_date ? new Date(exp.start_date).toLocaleDateString() : ''} 
                      {exp.end_date ? ` - ${new Date(exp.end_date).toLocaleDateString()}` : ' - Present'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/admin/experience/${exp.id}`} className={buttonVariants({ variant: "ghost", size: "icon", className: "h-8 w-8" })}>
                        <Pencil className="h-4 w-4 text-blue-500" />
                        <span className="sr-only">Edit</span>
                      </Link>
                      <form action={async () => {
                        'use server'
                        await deleteExperience(exp.id)
                      }} className="inline-block">
                        <Button type="submit" variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </form>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
