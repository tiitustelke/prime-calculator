import express from 'express'

const router = express.Router()
import { calculateNumbers, isPrime } from '../services/primeCalculator'
import { validateNumbers, validateNumber } from '../validators/numberValidator'

router.get('/sumandcheck', validateNumbers, calculateNumbers, isPrime)

router.get('/checkprime', validateNumber, isPrime)

router.get('/', (req, res) => {
  res.send('moi')
})

export { router }
