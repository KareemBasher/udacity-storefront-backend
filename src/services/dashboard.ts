import db from '../database'
import Product from '../types/product.type'
import Order from '../types/order.type'

class DashboardQueries {
  // Shows all products from a certain category
  async category(category: string): Promise<Product[]> {
    try {
      const connection = await db.connect()
      const sql = `SELECT * FROM products
                   WHERE category LIKE '%' || $1 || '%'`
      const result = await connection.query(sql, [category])

      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Unable to show products by category ${category}, ${error}`)
    }
  }

  // Returning top 5 popular products
  async topProducts(): Promise<Product[]> {
    try {
      const connection = await db.connect()
      const sql = `SELECT products.product_name FROM products
                   INNER JOIN order_products ON products.id = order_products.product_id
                   GROUP BY products.product_name
                   ORDER BY SUM(quantity)
                   DESC LIMIT 5`

      const result = await connection.query(sql)

      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Unable to show products, ${error}`)
    }
  }

  // Returning closed orders by a certain user
  async closedOrders(userId: string): Promise<Order[]> {
    try {
      const connection = await db.connect()
      const sql = `SELECT * FROM orders
                   WHERE status='closed'
                   AND user_id=($1)`

      const result = await connection.query(sql, [userId])

      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Unable to show closed orders by user ${userId}, ${error}`)
    }
  }
}

export default DashboardQueries
