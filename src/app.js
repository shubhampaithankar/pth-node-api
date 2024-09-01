import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import router from './routes/router.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/api', router)

export default app