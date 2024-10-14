import {
  getAllSpecimens,
  getSpecimensJsonSchema,
} from '@/services/specimen-services'
import { createHandler } from '@/utils/create'

export const handleGetAllSpecimens = createHandler(async (_req, res) => {
  const specimens = await getAllSpecimens()
  res.status(200).json({
    records: specimens,
    schema: getSpecimensJsonSchema(),
  })
})
