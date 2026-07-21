'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function deleteUser(userId: string, formData?: FormData) {
  try {
    // First delete from public.User (Prisma table)
    await prisma.user.delete({
      where: { id: userId },
    })
    
    // Then delete from Supabase Auth (auth.users) using a raw SQL query
    // This works because the connection uses the 'postgres' superuser role
    await prisma.$executeRawUnsafe(`DELETE FROM auth.users WHERE id = $1::uuid`, userId)
    revalidatePath('/admin/users')
    return { success: true }
  } catch (error) {
    console.error("Failed to delete user:", error)
    return { error: 'Failed to delete user' }
  }
}
