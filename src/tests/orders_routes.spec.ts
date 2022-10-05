import supertest from 'supertest'
import app from '../index'
import jwt from 'jsonwebtoken'
import config from '../config'
import UserModel from '../models/user.model'
import OrderModel from '../models/order.model'
import ProductModel from '../models/product.model'
import db from '../database'
import Order from '../types/order.type'

// create a request object
const request = supertest(app)

const userModel = new UserModel()
const orderModel = new OrderModel()
const productModel = new ProductModel()

describe('Test response for the /orders enpoint', () => {
  const tokenBody = {
    user: 'admin'
  }
  const token = jwt.sign(tokenBody, config.signiture as string)

  beforeAll(async () => {
    await userModel.create({
      first_name: 'John',
      last_name: 'Smith',
      password: 'HakunaMatata'
    })

    await orderModel.create({
      status: 'open',
      user_id: '1'
    })

    await productModel.create({
      product_name: 'Corn',
      price: 3,
      category: 'Food'
    })
  })

  afterAll(async () => {
    const connection = await db.connect()
    const sql = `DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n
                 DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n
                 DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n`
    await connection.query(sql)
    connection.release()
  })

  it('tests orders index response (/orders [GET])', async () => {
    const response = await request.get('/orders').auth(token, { type: 'bearer' })
    expect(response.status).toEqual(200)
  })

  it('tests orders show response with an id (/orders/:id [GET])', async () => {
    const response = await request.get('/orders/1').auth(token, { type: 'bearer' })
    expect(response.status).toEqual(200)
  })

  const body: Order = {
    status: 'open',
    user_id: '1'
  }

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
