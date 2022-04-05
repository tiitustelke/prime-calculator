import { check, validationResult } from 'express-validator'
import { NextFunction, Request, Response } from 'express'

const validateNumbers = [
  check('numbers')
    .exists()
    .withMessage('missing')
    .custom((value) => {
      const parsed = JSON.parse(value)
      if (!parsed.every(Number.isInteger)) {
        throw new Error('Not all elements of array are integers')
      }
      return true
    })
    .withMessage('Numbers were send in invalid format.')
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
  check('number').isNumeric().withMessage('Please send a valid number.').bail(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
]

export { validateNumbers, validateNumber }
