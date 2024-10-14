import { selectSpecimenSchema, specimens } from '@/db/schema/specimen'
import { db } from '@/utils/db'
import { and, eq } from 'drizzle-orm'
import { zodToJsonSchema } from 'zod-to-json-schema'

export async function getAllSpecimens() {
  return await db.select().from(specimens)
}

export function getSpecimensJsonSchema() {
  return zodToJsonSchema(selectSpecimenSchema)
}
