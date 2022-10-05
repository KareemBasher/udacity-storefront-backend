import OrderModel from '../models/order.model'
import UserModel from '../models/user.model'
import db from '../database'

const orderModel = new OrderModel()
const userModel = new UserModel()

describe('Order Model', () => {
  beforeAll(async () => {
    await userModel.create({
      first_name: 'John',
      last_name: 'Smith',
      password: 'HakunaMatata'
    })
  })

  afterAll(async () => {
    const connection = await db.connect()
    const sql = `DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;
                 DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n`
    await connection.query(sql)
    connection.release()
  })

  it('should have an index method', () => {
    expect(orderModel.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(orderModel.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(orderModel.create).toBeDefined()
  })

  it('should have a update method', () => {
    expect(orderModel.update).toBeDefined()
  })

  it('should have a delete method', () => {
    expect(orderModel.delete).toBeDefined()
  })

  it('create method should create a new order', async () => {
    const result = await orderModel.create({
      status: 'open',
      user_id: '1'
    })
    expect(result).toEqual({
      id: 1,
      status: 'open',
      user_id: '1'
    })
  })

  it('index method should return a list of orders', async () => {
    const result = await orderModel.index()
    expect(result).toEqual([
      {
        id: 1,
        status: 'open',
        user_id: '1'
      }
    ])
  })

  it('show method should return the correct order', async () => {
    const result = await orderModel.show('1')
    expect(result).toEqual({
      id: 1,
      status: 'open',
      user_id: '1'
    })
  })

  it('upadte method should update the correct order', async () => {
    const result = await orderModel.update(
      {
        status: 'closed',
        user_id: '1'
      },
      '1'
    )
    expect(result).toEqual({
      id: 1,
      status: 'closed',
      user_id: '1'
    })
  })

  it('orderByUser method should return all orders by the correct user', async () => {
    const result = await orderModel.ordersByUser('1')
    expect(result).toEqual([
      {
        id: 1,
        status: 'closed',
        user_id: '1'
      }
    ])
  })
})
