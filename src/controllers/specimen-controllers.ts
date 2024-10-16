import type { Request, Response } from 'express'
import {
  deleteSpecimenSchema,
  newSpecimenSchema,
  type Specimen,
  updateSpecimenSchema,
} from '@/db/schema/specimen'
import {
  addSpecimen,
  deleteSpecimen,
  getAllSpecimens,
  getSpecimensJsonSchema,
  updateSpecimen,
} from '@/services/specimen-services'
import { createHandler } from '@/utils/create'
import consola from 'consola'

export const handleGetAllSpecimens = createHandler(async (_req, res) => {
  const specimens = await getAllSpecimens()
  res.status(200).json({
    records: specimens,
    schema: getSpecimensJsonSchema(),
  })
})

export const handleUpdateSpecimen = createHandler(updateSpecimenSchema, async (req, res) => {
  const id = req.params.id
  const values = updateSpecimenSchema.parse(req).body

  if (id && values) {
    const updatedSpecimen = await updateSpecimen(id, values)

    res.status(200).json({
      record: updatedSpecimen,
    })
  }
})

export const handleAddSpecimen = createHandler(newSpecimenSchema, async (req, res) => {
  const values = newSpecimenSchema.parse(req).body

  if (values) {
    const newSpecimen = await addSpecimen(values)
    res.status(200).json({
      record: newSpecimen,
    })
  }
})

export async function handleDeleteSpecimen(req: Request, res: Response) {
  const id = req.params.id
  if (id) {
    const deletedSpecimen = await deleteSpecimen(id)

    res.status(200).json({
      record: deletedSpecimen,
    })
  }
}
