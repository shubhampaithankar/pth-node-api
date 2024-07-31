import bycrpt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/user.model.js'

export const LoginUser = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({
            username: username
        })
    
        if (!user) return res.status(400).send({
            ack: 0,
            msg: 'User not found'
        })
    
        const isMatch = await bycrpt.compare(password, user.password)
    
        if (!isMatch) return res.status(400).send({
            ack: 0,
            msg: 'Invalid credentials'
        })
    
        const token = jwt.sign({id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    
        res.status(200).send({
            ack: 1,
            token,
            user: {
                username,
                id: user._id,
                pokemon: user.pokemon
            }
        })
    } catch (error) {
        res.status(500).send({
            ack: 3,
            error: err.message
        })
    }
}

export const RegisterUser = async (req, res) => {
    try {
        const { username, password } = req.body
        
        const user = await User.findOne({
            username: username
        })

        if (user) return res.status(406).send({
            ack: 0,
            msg: 'Username is taken'
        })

        const hashedPassword = await bycrpt.hash(password, 8)

        const newUser = new User({ username, password: hashedPassword, pokemon: [] })

        await newUser.save()

        res.status(200).send({
            ack: 1,
        })

    } catch (err) {
        res.status(500).send({
            ack: 3,
            error: err.message
        })
    }
}