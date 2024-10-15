import { selectSpecimenSchema, type Specimen, specimens, type UpdateSpecimen } from '@/db/schema/specimen'
import { db } from '@/utils/db'
import { and, eq } from 'drizzle-orm'
import { zodToJsonSchema } from 'zod-to-json-schema'

export async function getAllSpecimens() {
  return await db.select().from(specimens)
}

export async function updateSpecimen(specimenId: string, { name }: UpdateSpecimen) {
  const [updatedSpecimen] = await db
    .update(specimens)
    .set({
      name,
    })
    .where(eq(specimens.id, specimenId))
    .returning(
      {
        id: specimens.id,
        name: specimens.name,
        updated_at: specimens.updated_at,
        created_at: specimens.created_at,
        deleted_at: specimens.deleted_at,
      },
    )

  return updatedSpecimen
}

export function getSpecimensJsonSchema() {
  return zodToJsonSchema(selectSpecimenSchema)
}
