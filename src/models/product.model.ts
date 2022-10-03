import db from '../database'
import Product from '../types/product.type'

class ProductModel {
  // Showing all products
  async index(): Promise<Product[]> {
    try {
      const connection = await db.connect()
      const sql = `SELECT id, product_name, price, category FROM products`
      const result = await connection.query(sql)

      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Unable to show products, ${error}`)
    }
  }

  // Showing a specific product using its ID
  async show(id: string): Promise<Product> {
    try {
      const connection = await db.connect()
      const sql = `SELECT id, product_name, price, category FROM products WHERE id=($1)`
      const result = await connection.query(sql, [id])

      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to show product with id '${id}', ${error}`)
    }
  }

  // Creating a new product
  async create(product: Product): Promise<Product> {
    try {
      const connection = await db.connect()
      const sql = `INSERT INTO products (product_name, price, category)
                   VALUES ($1, $2, $3)
                   RETURNING id, product_name, price, category`

      const result = await connection.query(sql, [product.name, product.price, product.category])

      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to create a new product, ${error}`)
    }
  }

  // Updating a product
  async update(product: Product, id: string): Promise<Product> {
    try {
      const connection = await db.connect()
      const sql = `UPDATE products
                   SET product_name=$1, price=$2, category=$3
                   WHERE id=($4)
                   RETURNING id, product_name, price, category`

      const result = await connection.query(sql, [
        product.name,
        product.price,
        product.category,
        id
      ])

      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to update the product with the id ${id}, ${error}`)
    }
  }

  // Deleting a product
  async delete(id: string): Promise<Product> {
    try {
      const connection = await db.connect()
      const sql = `DELETE FROM products
                   WHERE id=($1)
                   RETURNING id, product_name, price, category`

      const result = await connection.query(sql, [id])

      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to delete the product with the id ${id}, ${error}`)
    }
  }
}

export default ProductModel
