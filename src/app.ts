import express, { Express } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app: Express = express()
const port = process.env.PORT;

import { router as primeRoute } from './routes/primeRoute'
app.use('/primeapi', primeRoute)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}/primeapi`);
});