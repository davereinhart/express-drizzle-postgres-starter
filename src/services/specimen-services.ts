import { specimens } from '@/schema/specimen'
import { db } from '@/utils/db'
import { and, eq } from 'drizzle-orm'

export async function getAllSpecimens() {
  return await db.select({
    id: specimens.id,
    name: specimens.name,
  }).from(specimens)
}
