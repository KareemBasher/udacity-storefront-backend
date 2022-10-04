import supertest from 'supertest'
import app from '../index'
import jwt from 'jsonwebtoken'
import config from '../config'

// create a request object
const request = supertest(app)

describe('Test response for the /products enpoint', () => {
  const tokenBody = {
    user: 'admin'
  }
  const token = jwt.sign(tokenBody, config.signiture as string)

  it('tests products index response (/products [GET])', async () => {
    const response = await request.get('/products')
    expect(response.status).toEqual(200)
  })

  it('tests products show response with an id (/products/:id [GET])', async () => {
    const response = await request.get('/products/1')
    expect(response.status).toEqual(200)
  })

  const body = {
    name: 'Apples',
    price: 2,
    category: 'Food'
  }

  it('tests products create response(/products [POST])', async () => {
    const response = await request.post('/products').auth(token, { type: 'bearer' }).send(body)
    expect(response.status).toEqual(200)
  })

  it('tests products update response(/products/:id [PATCH])', async () => {
    const response = await request.patch('/products/1').auth(token, { type: 'bearer' }).send(body)
    expect(response.status).toEqual(200)
  })

  it('tests products delete response(/products/:id [DELETE])', async () => {
    const response = await request.delete('/products/1').auth(token, { type: 'bearer' })
    expect(response.status).toEqual(200)
  })

  it('tests products by category response(/products/category/:category [GET])', async () => {
    const response = await request.get('/products/category/Food').auth(token, { type: 'bearer' })
    expect(response.status).toEqual(200)
  })

  it('tests top five products response(/products/top/five [GET])', async () => {
    const response = await request.get('/products/top/five').auth(token, { type: 'bearer' })
    expect(response.status).toEqual(200)
  })
})
