import http from 'http'
import mongoose from 'mongoose'
import { config } from 'dotenv'

import app from './src/app.js'

config()

const PORT = 3001

mongoose.connect(process.env.MONGO_URL)
    .then((connection) => console.log(`connected to mongo database: ${connection.connection.db.databaseName}`))
    .catch(err => console.log(`mongoose connection error ${err}`))


const server = http.createServer(app)
server.listen(PORT, () => console.log(`started on http://localhost:${PORT}`))