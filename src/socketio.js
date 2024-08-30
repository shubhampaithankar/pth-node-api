import { Server } from 'socket.io'
import battle from './events/battle.js'

const io = new Server({
})

battle(io)

export default io
