import type { InferSelectModel } from 'drizzle-orm'
import { timestamps } from '@/db/helpers/columns'
import { dateSchema, nullableDateSchema } from '@/db/helpers/schemas'
import { boolean, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const specimens = pgTable('specimens', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  ...timestamps,
})

export const selectSpecimenSchema = createSelectSchema(specimens)

// export const updateSpecimenSchema = z.object({
//   body: selectSpecimenSchema.pick({
//     name: true,
//     // created_at: true,
//     // updated_at: true,
//     // deleted_at: true,
//   }), // .partial(),
// })
export const updateSpecimenSchema = z.object({
  body: z.object({
    name: z.string(),
    created_at: dateSchema,
    updated_at: nullableDateSchema,
    deleted_at: nullableDateSchema,
  }),
})

export const newSpecimenSchema = z.object({
  body: selectSpecimenSchema.pick({
    name: true,
  }),
})

export type Specimen = InferSelectModel<typeof specimens>
export type NewSpecimen = z.infer<typeof newSpecimenSchema>['body']
export type UpdateSpecimen = z.infer<typeof updateSpecimenSchema>['body']
