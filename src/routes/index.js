import { Router } from 'express'

import authRoute from './auth.route.js'
import userRoute from './user.route.js'
import pokemonRoute from './pokemon.route.js'
// import messageRoute from './message.route.js'

import authGuard from '../guards/auth.guard.js'

const router = Router()

router.use('/auth', authRoute)
router.use('/pokemon', authGuard, pokemonRoute)
router.use('/user', authGuard, userRoute)
// router.use('/message', authGuard, messageRoute)

export default router