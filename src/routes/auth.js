import { Router } from 'express'
import { LoginUser, RegisterUser } from '../controllers/auth.controller.js'

const router = Router()

router.post('/login', LoginUser)

router.post('/register', RegisterUser)

export default router