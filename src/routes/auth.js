import { Router } from 'express'
const router = Router()

import { LoginUser, RegisterUser } from '../controllers/auth.controller.js'

router.post('/login', LoginUser)

router.post('/register', RegisterUser)

export default router