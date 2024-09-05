import { Router } from 'express'
import { AddPokemonToUser, DeletePokemonFromUser, GetAllPokemon, GetUser } from '../controllers/user.controller.js'

const router = Router()

router.post('/get', GetUser)

router.post('/pokemon/get-all', GetAllPokemon)

router.post('/pokemon/add', AddPokemonToUser)

router.post('/pokemon/delete', DeletePokemonFromUser)

export default router