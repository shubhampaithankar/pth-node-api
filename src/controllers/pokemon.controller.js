import lodash from 'lodash'
import Pokedex from 'pokedex-promise-v2';

const { slice, shuffle } = lodash

const options = {
    cacheLimit: 100 * 1000, // 100s
    timeout: 5 * 1000 // 5s
}
const P = new Pokedex(options)

export const GetRandomPokemon = async (req, res) => {
    try {
        const { results }  = (await P.getResource(['api/v2/pokemon-species?limit=1500']))[0]
        const pokemons = slice(shuffle(results), 0, 10).map(({ url }) => {
            const parts = url.split('/')
            const id = parts[parts.length - 2]
            return id
        })

        P.getPokemonByName(pokemons, (response, err) => {
            if (err) throw err
            const result = response.map(pokemon => ({
                abilities: pokemon.abilities,
                id: pokemon.id,
                name: pokemon.name,
                sprites: pokemon.sprites, 
                stats: pokemon.stats,
                types: pokemon.types
            }))
            res.status(200).send({
                ack: 1,
                result
            })
            
        })

    } catch (err) {
        res.status(500).send({
            ack: 3,
            error: err.message
        })
    }
}

export const GetGenerationalPokemon = async (req, res) => {
    try {
        const { generation } = req.body
        const { pokemon_species } = await P.getGenerationByName(generation)

        res.status(200).send({
            ack: 1,
            result: pokemon_species
        })

    } catch (err) {
        res.status(500).send({
            ack: 3,
            error: err.message
        })
    }
}

export const GetPokemonDetails = async (req, res) => {
    try {
        const { id } = req.body
        const pokemon = await P.getPokemonByName(id)

        res.status(200).send({
            ack: 1,
            result: pokemon
        })

    } catch (err) {
        res.status(500).send({
            ack: 3,
            error: err.message
        })
    }
}