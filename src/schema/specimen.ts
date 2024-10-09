import type { InferSelectModel } from 'drizzle-orm'
import { boolean, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const specimens = pgTable('specimens', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
})

export const selectSpecimenSchema = createSelectSchema(specimens)

export const updateSpecimenSchema = z.object({
  body: selectSpecimenSchema.pick({
    name: true,
  }),
  // .partial(),
})

export const newSpecimenSchema = z.object({
  body: selectSpecimenSchema.pick({
    name: true,
  }),
})

export type Specimen = InferSelectModel<typeof specimens>
export type NewSpecimen = z.infer<typeof newSpecimenSchema>['body']
export type UpdateUser = z.infer<typeof updateSpecimenSchema>['body']
