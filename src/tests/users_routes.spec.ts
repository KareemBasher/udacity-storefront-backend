import supertest from 'supertest'
import app from '../index'
import jwt from 'jsonwebtoken'
import config from '../config'

// create a request object
const request = supertest(app)

describe('Test response for the /users enpoint', () => {
  const tokenBody = {
    user: 'admin'
  }
  const token = jwt.sign(tokenBody, config.signiture as string)

  it('tests users index response (/users [GET])', async () => {
    const response = await request.get('/users').auth(token, { type: 'bearer' })
    expect(response.status).toEqual(200)
  })

  it('tests users show response with an id (/users/:id [GET])', async () => {
    const response = await request.get('/users/1').auth(token, { type: 'bearer' })
    expect(response.status).toEqual(200)
  })

  const body = {
    first_name: 'John',
    last_name: 'Smith',
    password: 'HakunaMatata'
  }

  it('tests users create response(/users [POST])', async () => {
    const response = await request.post('/users').auth(token, { type: 'bearer' }).send(body)
    expect(response.status).toEqual(200)
  })

  it('tests users update response(/users/:id [PATCH])', async () => {
    const response = await request.patch('/users/1').auth(token, { type: 'bearer' }).send(body)
    expect(response.status).toEqual(200)
  })

  it('tests users delete response(/users/:id [DELETE])', async () => {
    const response = await request.delete('/users/1').auth(token, { type: 'bearer' })
    expect(response.status).toEqual(200)
  })
})
