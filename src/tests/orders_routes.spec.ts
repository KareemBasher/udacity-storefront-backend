import supertest from 'supertest'
import app from '../index'
import jwt from 'jsonwebtoken'
import config from '../config'

// create a request object
const request = supertest(app)

describe('Test response for the /orders enpoint', () => {
  const tokenBody = {
    user: 'admin'
  }
  const token = jwt.sign(tokenBody, config.signiture as string)

  it('tests orders index response (/orders [GET])', async () => {
    const response = await request.get('/orders').auth(token, { type: 'bearer' })
    expect(response.status).toEqual(200)
  })

  it('tests orders show response with an id (/orders/:id [GET])', async () => {
    const response = await request.get('/orders/1').auth(token, { type: 'bearer' })
    expect(response.status).toEqual(200)
  })

  const body = {
    status: 'open',
    user_id: 1
  }

  const userBody = {
    first_name: 'Frank',
    last_name: 'Clinton',
    password: 'illSeeYouAtWork'
  }

  // Adding a user to the users table first for the foreign key to work
  const addUser = async () => {
    await request.post('/users').auth(token, { type: 'bearer' }).send(userBody)
  }
  addUser()

  it('tests orders create response(/orders [POST])', async () => {
    const response = await request.post('/orders').auth(token, { type: 'bearer' }).send(body)
    expect(response.status).toEqual(200)
  })

  it('tests orders update response(/orders/:id [PATCH])', async () => {
    const response = await request.patch('/orders/1').auth(token, { type: 'bearer' }).send(body)
    expect(response.status).toEqual(200)
  })

  it('tests orders delete response(/orders/:id [DELETE])', async () => {
    const response = await request.delete('/orders/1').auth(token, { type: 'bearer' })
    expect(response.status).toEqual(200)
  })

  it('tests orderByUser response(/orders/:id/users [GET])', async () => {
    const response = await request.get('/orders/1/users').auth(token, { type: 'bearer' })
    expect(response.status).toEqual(200)
  })

  it('tests closedOrders response(/orders/closed/:id/users [GET])', async () => {
    const response = await request.get('/orders/closed/1/users').auth(token, { type: 'bearer' })
    expect(response.status).toEqual(200)
  })
})
