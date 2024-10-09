import type { Router } from 'express'
import {
  handleAddUser,
  handleDeleteUser,
  handleGetUser,
  handleRefreshTokens,
  handleUpdateUser,
  handleUserLogin,
  handleVerifyUser,
} from '@/controllers/user-controllers'
import { authenticate } from '@/middlewares/auth'
import { createRouter } from '@/utils/create'

export default createRouter((router: Router) => {
  router.get('/', authenticate(), handleGetUser)
  router.get('/verify', (req, res, next) => handleVerifyUser(req, res, next))
  router.get('/refresh', (req, res, next) => handleRefreshTokens(req, res, next))
  router.post('/register', handleAddUser)
  router.post('/login', handleUserLogin)
  router.post('/remove', authenticate(), handleDeleteUser)
  router.put('/update', authenticate(), handleUpdateUser)
})
