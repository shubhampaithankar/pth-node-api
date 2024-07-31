import User from '../models/user.model.js'

export const GetAllPokemon = async (req, res) => {
    try {
        
        const { user_id } = req.query
        
        const user = await User.findOne({
            _id: user_id
        })

        if (!user) return res.status(406).send({
            ack: 0,
            msg: 'User not found'
        })

        res.status(200).send({
            ack: 1,
            pokemon: user.pokemon
        })

    } catch (err) {
        res.status(500).send({
            ack: 3,
            error: err.message
        })
    }
}

export const GetRandomPokemon = async (req, res) => {
    try {
        
        // const { user_id } = req.query
        
        // const user = await User.findOne({
        //     _id: user_id
        // })

        // if (!user) return res.status(406).send({
        //     ack: 0,
        //     msg: 'User not found'
        // })

        // res.status(200).send({
        //     ack: 1,
        //     pokemon: user.pokemon
        // })

    } catch (err) {
        res.status(500).send({
            ack: 3,
            error: err.message
        })
    }
}