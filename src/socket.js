import { Server } from 'socket.io'
import battle from './events/battle.js'

const io = new Server({
    cors: {
        origin: process.env.HOSTNAME,
        methods: ["GET", "POST"],
    }
})

battle(io)

export default io
