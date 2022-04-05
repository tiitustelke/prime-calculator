import { NextFunction, Request, Response } from 'express'

const calculateNumbers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const numbers: Array<number> = JSON.parse(<string>req.query.numbers)
    res.locals.number = numbers.reduce((partialSum, a) => partialSum + a, 0)
    next()
  } catch (error) {
    console.error('calculateNumbers: ', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

const isPrime = async (req: Request, res: Response) => {
  try {
    const num: number = res.locals.number ? res.locals.number : req.query.number

    if (res.locals.number) {
      res.json({
        number: num,
        isPrime: calculatePrime(num),
      })
    } else {
      res.json({
        isPrime: calculatePrime(num),
      })
    }
  } catch (error) {
    console.error('isPrime: ', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

const calculatePrime = (num: number) => {
  if (num == 1) {
    return false
  }
  for (let i = 2; i < num; i++) {
    if (num % i == 0) {
      return false
    }
  }
  return true
}

export { calculateNumbers, isPrime }
