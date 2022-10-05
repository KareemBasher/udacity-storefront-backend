import supertest from 'supertest'
import app from '../index'
import Product from '../types/product.type'
import db from '../database'
import User from '../types/user.type'

// create a request object
const request = supertest(app)

describe('Test response for the /products enpoint', () => {
  let token: string

  beforeAll(async () => {
    const body: User = {
      first_name: 'John',
      last_name: 'Smith',
      password: 'HakunaMatata'
    }

    const response = await request.post('/users').send(body)
    token = response.body
  })

  afterAll(async () => {
    const connection = await db.connect()
    const sql = `DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n
                 DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n`
    await connection.query(sql)
    connection.release()
  })

  it('tests products index response (/products [GET])', async () => {
    const response = await request.get('/products')
    expect(response.status).toEqual(200)
  })

  it('tests products show response with an id (/products/:id [GET])', async () => {
    const response = await request.get('/products/1')
    expect(response.status).toEqual(200)
  })

  const body: Product = {
    product_name: 'Apples',
    price: 2,
    category: 'Food'
  }

  it('tests products create response (/products [POST])', async () => {
    const response = await request.post('/products').auth(token, { type: 'bearer' }).send(body)
    expect(response.status).toEqual(200)
  })

  it('tests products index response without token (/products [GET])', async () => {
    const response = await request.post('/products').send(body)
    expect(response.status).toEqual(401)
  })

  it('tests products update response (/products/:id [PATCH])', async () => {
    const response = await request.patch('/products/1').auth(token, { type: 'bearer' }).send(body)
    expect(response.status).toEqual(200)
  })

  it('tests products update response without token (/products/:id [PATCH])', async () => {
    const response = await request.patch('/products/1').send(body)
    expect(response.status).toEqual(401)
  })

  it('tests products delete response (/products/:id [DELETE])', async () => {
    const response = await request.delete('/products/1').auth(token, { type: 'bearer' })
    expect(response.status).toEqual(200)
  })

  it('tests products delete response without token (/products/:id [DELETE])', async () => {
    const response = await request.delete('/products/1')
    expect(response.status).toEqual(401)
  })

  it('tests products by category response (/products/category/:category [GET])', async () => {
    const response = await request.get('/products/category/Food')
    expect(response.status).toEqual(200)
  })

  it('tests top five products response (/products/top/five [GET])', async () => {
    const response = await request.get('/products/top/five')
    expect(response.status).toEqual(200)
  })
})
