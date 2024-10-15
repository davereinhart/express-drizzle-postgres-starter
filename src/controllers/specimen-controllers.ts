import {
  type Specimen,
  updateSpecimenSchema,
} from '@/db/schema/specimen'
import {
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
  const { id, name } = req.body

  const updatedSpecimen = await updateSpecimen(id, { name })

  res.status(200).json({
    record: updatedSpecimen,
  })
})
