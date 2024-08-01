import { Router } from 'express'
import authRoute from './auth.js'
import userRoute from './user.js'
import pokemonRoute from './pokemon.js'

import authGuard from '../guards/auth.guard.js'

const router = Router()

router.use('/auth', authRoute)
router.use('/pokemon', pokemonRoute)
router.use('/user', authGuard, userRoute)

export default router