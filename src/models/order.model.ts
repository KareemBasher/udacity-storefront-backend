import db from '../database'
import Order from '../types/order.type'

class OrderModel {
  // Showing all products
  async index(): Promise<Order[]> {
    try {
      const connection = await db.connect()
      const sql = `SELECT * FROM orders`
      const result = await connection.query(sql)

      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Unable to show orders, ${error}`)
    }
  }

  // Showing a specific order using its ID
  async show(id: string): Promise<Order> {
    try {
      const connection = await db.connect()
      const sql = `SELECT * FROM orders WHERE id=($1)`
      const result = await connection.query(sql, [id])

      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to show order with id '${id}', ${error}`)
    }
  }

  // Creating a new order
  async create(order: Order): Promise<Order> {
    try {
      const connection = await db.connect()
      const sql = `INSERT INTO orders (status, user_id)
                   VALUES ($1, $2)
                   RETURNING *`

      const result = await connection.query(sql, [order.status, order.user_id])

      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to create a new order, ${error}`)
    }
  }

  // Updating an order
  async update(order: Order, id: string): Promise<Order> {
    try {
      const connection = await db.connect()
      const sql = `UPDATE orders
                   SET status=$1, user_id=$2
                   WHERE id=($3)
                   RETURNING *`

      const result = await connection.query(sql, [order.status, order.user_id, id])

      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to update the order with the id ${id}, ${error}`)
    }
  }

  // Deleting an order
  async delete(id: string): Promise<Order> {
    try {
      const connection = await db.connect()
      const sql = `DELETE FROM orders
                   WHERE id=($1)
                   RETURNING *`

      const result = await connection.query(sql, [id])

      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to delete the order with the id ${id}, ${error}`)
    }
  }

  // Showing all orders by a user
  async ordersByUser(userId: string): Promise<Order[]> {
    try {
      const connection = await db.connect()
      const sql = `SELECT * FROM orders WHERE user_id=($1)`

      const result = await connection.query(sql, [userId])

      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Unable to show orders by user ${userId}, ${error}`)
    }
  }

  // Adding a product to the cart (open order)
  async addProduct(order: Order, orderId: string): Promise<Order> {
    try {
      const connection = await db.connect()
      const orderSql = 'SELECT * FROM orders WHERE id=($1)'
      const result = await connection.query(orderSql, [orderId])

      if (result.rows[0].status !== 'open') {
        throw new Error(
          `Could not add product ${order.product_id} to order ${orderId} because the order status is not open`
        )
      }

      connection.release()
    } catch (error) {
      throw new Error(`${error}`)
    }

    try {
      const connection = await db.connect()
      const sql = `INSERT INTO order_products (quantity, product_id, order_id)
                     VALUES ($1, $2, $3)
                     Returning *`

      const result = await connection.query(sql, [order.quantity, order.product_id, orderId])

      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not add product ${order.product_id} to order ${orderId}: ${error}`)
    }
  }
}

export default OrderModel
