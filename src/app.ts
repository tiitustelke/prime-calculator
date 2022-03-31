import express from 'express'

const app = express()
import { router as primeRoute } from './routes/primeRoute'

app.use('/primeapi', primeRoute)
