import { Router } from 'express'
import { GetGenerationalPokemon, GetPokemonDetails, GetRandomPokemon } from '../controllers/pokemon.controller.js'
const router = Router()

router.post('/get-random', GetRandomPokemon)
router.post('/get-by-generation', GetGenerationalPokemon)
router.post('/get-details', GetPokemonDetails)

export default router