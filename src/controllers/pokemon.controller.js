import lodash from 'lodash'

const POKE_API = 'https://pokeapi.co/api/v2'
const { slice, shuffle } = lodash

export const GetRandomPokemon = async (req, res) => {
    try {
        const response = await fetch(`${POKE_API}/pokemon?limit=1500`, {
            method: 'GET'
        })
        const { results } = await response.json()
        // const modifiedArray = slice(shuffle(results), 0, 9) 

        res.status(200).send({
            ack: 1,
            results
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