import type { Router } from 'express'
import adminRoutes from '@/routes/admin-routes'
import specimenRoutes from '@/routes/specimen-routes'
import userRoutes from '@/routes/user-routes'
import { createRouter } from '@/utils/create'

export default createRouter((router: Router) => {
  router.use('/admin', adminRoutes)
  router.use('/user', userRoutes)
  router.use('/specimen', specimenRoutes)
})
