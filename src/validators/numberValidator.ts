import { check, validationResult } from 'express-validator'
import { NextFunction, Request, Response } from 'express'

const validateNumbers = [
  check('numbers')
    .exists()
    .withMessage('missing')
    .custom((value) => {
      const arr: Array<number> = JSON.parse(<string>value)
      const res = arr.every((e) => {
        return parseInt(String(e)) || e == 0
      })
      if (!res) throw new Error('Array does not contain Integers') // check that contains Integers
      return true
    })
    .withMessage('Array is not valid')
    .bail(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
]

const validateNumber = [
  check('number').isInt({min: 1}).withMessage('Please send a valid number.').bail(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
]

export { validateNumbers, validateNumber }
