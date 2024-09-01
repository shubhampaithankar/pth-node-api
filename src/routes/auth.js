import { Router } from 'express'
import { LoginUser, RefreshToken, RegisterUser } from '../controllers/auth.controller.js'

const router = Router()

router.post('/login', LoginUser)
router.post('/register', RegisterUser)
router.post('/refresh', RefreshToken)

export default router