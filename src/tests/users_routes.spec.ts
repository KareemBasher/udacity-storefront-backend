import supertest from 'supertest'
import app from '../index'
import User from '../types/user.type'

// create a request object
const request = supertest(app)

describe('Test response for the /users enpoint', () => {
  const body: User = {
    first_name: 'John',
    last_name: 'Smith',
    password: 'HakunaMatata'
  }

  let token: string

  it('tests users create response(/users [POST])', async () => {
    const response = await request.post('/users').send(body)
    expect(response.status).toEqual(200)

    token = response.body
  })

  it('tests users index response (/users [GET])', async () => {
    const response = await request.get('/users').auth(token, { type: 'bearer' })
    expect(response.status).toEqual(200)
  })

  it('tests users index response without token (/users [GET])', async () => {
    const response = await request.get('/users')
    expect(response.status).toEqual(401)
  })

  it('tests users show response with an id (/users/:id [GET])', async () => {
    const response = await request.get('/users/1').auth(token, { type: 'bearer' })
    expect(response.status).toEqual(200)
  })

  it('tests users show response with an id without token (/users/:id [GET])', async () => {
    const response = await request.get('/users/1')
    expect(response.status).toEqual(401)
  })

  it('tests users update response (/users/:id [PATCH])', async () => {
    const response = await request.patch('/users/1').auth(token, { type: 'bearer' }).send(body)
    expect(response.status).toEqual(200)
  })

  it('tests users update response without token (/users/:id [PATCH])', async () => {
    const response = await request.patch('/users/1').send(body)
    expect(response.status).toEqual(401)
  })

  it('tests users delete response (/users/:id [DELETE])', async () => {
    const response = await request.delete('/users/1').auth(token, { type: 'bearer' })
    expect(response.status).toEqual(200)
  })

  it('tests users delete response without token (/users/:id [DELETE])', async () => {
    const response = await request.delete('/users/1')
    expect(response.status).toEqual(401)
  })
})
