import lodash from 'lodash'
import Pokedex from 'pokedex-promise-v2';


const options = {
    cacheLimit: 100 * 1000, // 100s
    timeout: 5 * 1000 // 5s
}
const P = new Pokedex(options)

const { slice, shuffle } = lodash



export const GetRandomPokemon = async (req, res) => {
    try {
        const { results }  = (await P.getResource(['api/v2/pokemon-species?limit=1500']))[0]
        const pokemons = slice(shuffle(results), 0, 10).map(({ url }) => {
            const parts = url.split('/')
            const id = parts[parts.length - 2]
            return id
        })

        console.log(pokemons)

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

export const GetGenerationPokemon = async (req, res) => {
    try {
        const { generation } = req.body

        // https://pokeapi.co/api/v2/generation/{id or name}/
        const response = await fetch(`${POKE_API}/generation/${generation}`, {
            method: 'GET'
        })

        const { pokemon_species } = await response.json()
        // const modifiedArray = slice(shuffle(pokemon_species), 0, 9) 

        res.status(200).send({
            ack: 1,
            results: pokemon_species
        })

    } catch (err) {
        res.status(500).send({
            ack: 3,
            error: err.message
        })
    }
}