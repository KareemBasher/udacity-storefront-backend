import supertest from 'supertest'
import app from '../index'

// create a request object
const request = supertest(app)

describe('Test endpoint response', () => {
  it('tests users endpoint', async () => {
    const response = await request.get('/users')
    expect(response.body).toBeDefined
  })
})
