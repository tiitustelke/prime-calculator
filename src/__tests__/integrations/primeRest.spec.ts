import 'jest'
import request from 'supertest'
import express from 'express'
import { router as primeRoute } from '../../routes/primeRoute'

const app = express()
app.use('/primeapi', primeRoute)

describe('number response tests', () => {
  //prime check single number
  it('Single non-prime number is sent', async () => {
    const response = await request(app).get('/primeapi/checkprime?number=36')

    expect(response.statusCode).toBe(200)
    expect(response.body.isPrime).toBe(false)
  })

  it('Single prime number is sent', async () => {
    const response = await request(app).get('/primeapi/checkprime?number=73')

    expect(response.statusCode).toBe(200)
    expect(response.body.isPrime).toBe(true)
  })

  it('Zero is sent', async () => {
    const response = await request(app).get('/primeapi/checkprime?number=0')

    expect(response.statusCode).toBe(400)
  })

  it('Letters are sent', async () => {
    const response = await request(app).get('/primeapi/checkprime?asdsdgf')

    expect(response.statusCode).toBe(400)
  })

  it('Negative num is sent', async () => {
    const response = await request(app).get('/primeapi/checkprime?-64')

    expect(response.statusCode).toBe(400)
  })

  //sum and prime check
  it('Prime numbers are sent', async () => {
    const response = await request(app).get('/primeapi/sumandcheck?numbers=[345,43,43]')

    expect(response.body.isPrime).toBe(true)
    expect(response.body.result).toBe(431)

    expect(response.statusCode).toBe(200)
  })

  it('Single number is sent', async () => {
    const response = await request(app).get('/primeapi/sumandcheck?numbers=43')

    expect(response.statusCode).toBe(400)
  })

  it('Single number is sent', async () => {
    const response = await request(app).get('/primeapi/sumandcheck?numbers=43')

    expect(response.statusCode).toBe(400)
  })

  it('Letters are sent', async () => {
    const response = await request(app).get(
      '/primeapi/sumandcheck?[23,asdsdgf,666]'
    )
    expect(response.statusCode).toBe(400)
  })

  it('Zero is sent', async () => {
    const response = await request(app).get(
      '/primeapi/sumandcheck?[54,0,43]'
    )
    expect(response.statusCode).toBe(200)
    expect(response.body.result).toBe(388)
    expect(response.body.isPrime).toBe(false)
  })

  it('Negative is sent', async () => {
    const response = await request(app).get(
      '/primeapi/sumandcheck?[54,-54,43]'
    )
    expect(response.statusCode).toBe(400)
  })
})
