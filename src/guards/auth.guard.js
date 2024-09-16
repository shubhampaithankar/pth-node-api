import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    try{
        const token = req.header('Authorization')?.split(' ')[1]
        if(!token) return res.status(401).json({ ack: 0, error: 'No authentication token, access denied' })
        
        const verified = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        if(!verified) return res.status(401).json({ ack: 2, error: 'Token verification failed, authorization denied' })

        req.user = verified.id
        next()
    } catch (err) {
        res.status(500).json({ ack: 0, error: err.message })
    }
}