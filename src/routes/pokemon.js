import { Router } from 'express'
import { GetGenerationalPokemon, GetRandomPokemon } from '../controllers/pokemon.controller.js'
const router = Router()

router.post('/get-random', GetRandomPokemon)
router.post('/get-by-generation', GetGenerationalPokemon)

export default router