import type { Router } from 'express'
import {
  handleAddSpecimen,
  handleGetAllSpecimens,
  handleUpdateSpecimen,
} from '@/controllers/specimen-controllers'
import { authenticate } from '@/middlewares/auth'
import { createRouter } from '@/utils/create'

export default createRouter((router: Router) => {
  router.get('/', authenticate(), handleGetAllSpecimens)
  router.put('/:id', authenticate(), handleUpdateSpecimen)
  router.post('/', authenticate(), handleAddSpecimen)
})
