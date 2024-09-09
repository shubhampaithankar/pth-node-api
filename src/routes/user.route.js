import { Router } from 'express'
import { AddPokemonToUser, DeletePokemonFromUser, GetAllPokemon, GetUser } from '../controllers/user.controller.js'

const router = Router()

router.post('/get', GetUser)

router.post('/get-all-pokemon', GetAllPokemon)

router.post('/add-pokemon', AddPokemonToUser)

router.post('/delete-pokemon', DeletePokemonFromUser)

export default router