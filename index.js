import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import router from './src/routes/router.js'

config()
const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URL)
    .then((connection) => console.log(`connected to mongo database: ${connection.connection.db.databaseName}`))
    .catch(err => console.log(`mongoose connection error ${err}`))


app.use('/api', router)

const PORT = 3001
app.listen(PORT, () => console.log(`started on http://localhost:${PORT}`))