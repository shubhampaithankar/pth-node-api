import { Router } from 'express'
import { GetGenerationPokemon, GetRandomPokemon } from '../controllers/pokemon.controller.js'
const router = Router()

router.post('/get-random', GetRandomPokemon)
router.post('/get-by-generation', GetGenerationPokemon)

export default router