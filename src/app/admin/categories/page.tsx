import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { deleteCategory } from '@/app/actions/portfolio'

export default async function AdminCategoriesPage() {
  const supabase = await createClient()

  const { data: categories, error } = await supabase
    .from('skill_categories')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) {
    return <div>Error loading categories: {error.message}</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground mt-2">
            Manage your skill categories.
          </p>
        </div>
        <Link href="/admin/categories/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </Link>
      </div>

      {categories.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-6 text-muted-foreground">
              No categories found. Click "Add Category" to create one.
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Card key={cat.id} className="bg-[#0b1120] border-[#1e293b]">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {cat.icon_type === 'lucide' ? (
                    <div className="text-slate-400 font-mono text-sm bg-white/5 px-2 py-1 rounded">{cat.icon}</div>
                  ) : (
                    <img src={cat.icon} alt={cat.name} className="w-8 h-8 rounded object-cover bg-white/10" />
                  )}
                  <span className="font-semibold text-slate-200">{cat.name}</span>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/categories/${cat.id}`}>
                    <Button variant="ghost" size="icon" className="text-blue-500 hover:text-blue-400">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
