import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    try{
        const token = req.header('x-auth-token')
        if(!token) return res.status(401).json({ ack: 0, msg: 'No authentication token, access denied' })
        
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if(!verified) return res.status(401).json({ ack: 2, msg: 'Token verification failed, authorization denied' })
        
        req.user = verified.id
        next()
    } catch (err) {
        res.status(500).json({ ack: 0, error: err.message })
    }
}