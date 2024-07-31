import * as lodash from 'lodash'

import User from '../models/user.model.js'

export const GetUser = async (req, res) => {
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
            pokemon: user.pokemon,
            user: lodash.omit(user.toJSON(), ['password', '__v'])
        })
    
    } catch (err) {
        res.status(500).send({
            ack: 3,
            error: err.message
        })
    }
}

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

export const AddPokemonToUser = async (req, res) => {
    try {

        const { user_id, pokemon } = req.body
        
        const user = await User.findOne({
            _id: user_id
        })

        if (!user) return res.status(406).send({
            ack: 0,
            msg: 'User not found'
        })

        if (!user.pokemon.includes(pokemon)) { 

            await User.updateOne(
                { _id: user_id, }, 
                { $push: { pokemon }}
            )

            res.status(200).send({
                ack: 1
            })

        } else {

            res.status(406).send({
                ack: 0,
                msg: 'User already has this pokemon'
            })

        }

    } catch (err) {
        res.status(500).send({
            ack: 3,
            error: err.message
        })
    }
}

export const DeletePokemonFromUser = async (req, res) => {
    try {

        const { user_id, pokemon } = req.body
        
        const user = await User.findOne({
            _id: user_id
        })

        if (!user) return res.status(406).send({
            ack: 0,
            msg: 'User not found'
        })

        if (user.pokemon.includes(pokemon)) { 

            await User.updateOne(
                { _id: user_id, }, 
                { $pull: { pokemon }}
            )

            res.status(200).send({
                ack: 1
            })

        } else {

            res.status(406).send({
                ack: 0,
                msg: 'User doesnt have this pokemon'
            })

        }

    } catch (err) {
        res.status(500).send({
            ack: 3,
            error: err.message
        })
    }
}