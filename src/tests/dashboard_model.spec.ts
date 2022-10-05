import DashboardQueries from '../services/dashboard'
import UserModel from '../models/user.model'
import OrderModel from '../models/order.model'
import ProductModel from '../models/product.model'
import db from '../database'

const dashboard = new DashboardQueries()
const userModel = new UserModel()
const orderModel = new OrderModel()
const productModel = new ProductModel()

describe('Dashboard Model', () => {
  beforeAll(async () => {
    await userModel.create({
      first_name: 'John',
      last_name: 'Smith',
      password: 'HakunaMatata'
    })

    await productModel.create({
      product_name: 'Pineapple',
      price: 5,
      category: 'Food'
    })

    await orderModel.create({
      status: 'open',
      user_id: '1'
    })

    await orderModel.create({
      status: 'closed',
      user_id: '1'
    })

    await orderModel.addProduct(
      {
        quantity: 1,
        product_id: '1'
      },
      '1'
    )
  })

  afterAll(async () => {
    const connection = await db.connect()
    const sql = `DELETE FROM order_products;\n ALTER SEQUENCE order_products_id_seq RESTART WITH 1;\n
               DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;
               DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n
               DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n`
    await connection.query(sql)
    connection.release()
  })

  it('should have a category method', () => {
    expect(dashboard.category).toBeDefined()
  })

  it('should have a topProducts method', () => {
    expect(dashboard.topProducts).toBeDefined()
  })

  it('should have a closedOrders method', () => {
    expect(dashboard.closedOrders).toBeDefined()
  })

  it('category method should return a list of products from the correct category', async () => {
    const result = await dashboard.category('Food')
    expect(result).toEqual([
      {
        id: 1,
        product_name: 'Pineapple',
        price: 5,
        category: 'Food'
      }
    ])
  })

  it('closedOrders method should return a list of closed orders from the correct user', async () => {
    const result = await dashboard.closedOrders('1')
    expect(result).toEqual([
      {
        id: 2,
        status: 'closed',
        user_id: '1'
      }
    ])
  })
})
