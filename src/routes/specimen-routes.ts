import type { Router } from 'express'
import {
  handleGetAllSpecimens,
} from '@/controllers/specimen-controllers'
import { authenticate } from '@/middlewares/auth'
import { createRouter } from '@/utils/create'

export default createRouter((router: Router) => {
  router.get('/all', authenticate(), handleGetAllSpecimens)
})
