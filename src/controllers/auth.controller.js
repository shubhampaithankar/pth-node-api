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
            error: 'User not found'
        })
    
        const isMatch = await bycrpt.compare(password, user.password)
    
        if (!isMatch) return res.status(400).send({
            ack: 0,
            error: 'Invalid credentials'
        })
    
        const accessToken  = jwt.sign({id: user._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1d' })

        const refreshToken = jwt.sign({
            username: username,
        }, process.env.JWT_REFRESH_SECRET, { expiresIn: '3d' });

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None', secure: true,
            maxAge: 24 * 60 * 60 * 1000
        })
    
        res.status(200).send({
            ack: 1,
            token: accessToken ,
            user: {
                username,
                id: user._id,
                pokemon: user.pokemon
            }
        })
    } catch (err) {
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
            error: 'Username is taken'
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

export const RefreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.jwt;

        // Verifying refresh token
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET,
            async (err, decoded) => {
                if (err) {
                    // loguser user on client
                    return res.status(401).json({ error: 'Unauthorized' });
                }
                else {
                    const user = await User.findById(decoded.id)

                    if (!user) return res.status(400).send({
                        ack: 0,
                        error: 'User not found'
                    })

                    // Correct token we send a new access token
                    const accessToken = jwt.sign({
                        username: user.username,
                    }, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: '10m'
                    });
                    return res.json({ token: accessToken });
                }
            })
    } catch (err) {
        res.status(500).send({
            ack: 3,
            error: err.message
        })
    }
}