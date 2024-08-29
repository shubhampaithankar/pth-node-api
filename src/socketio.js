import { Server } from 'socket.io'

const io = new Server({
})

io.on('connection', (client) => {
  console.log('Socket.IO initialized', client.id)

  client.on('disconnect', () => {
    console.log('Client disconnected', client.id)
  })
})

export default io
