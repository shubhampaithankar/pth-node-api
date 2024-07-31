import express from 'express'
const app = express()

import cors from 'cors'

import { config } from 'dotenv'
config()

app.use(express.json())
app.use(cors())

const PORT = 3001
app.listen(PORT, () => console.log(`started on http://localhost:${PORT}`))