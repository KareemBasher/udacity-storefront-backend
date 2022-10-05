import ProductModel from '../models/product.model'
import db from '../database'

const productModel = new ProductModel()

describe('Product Model', () => {
  afterAll(async () => {
    const connection = await db.connect()
    const sql = `DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n`
    await connection.query(sql)
    connection.release()
  })

  it('should have an index method', () => {
    expect(productModel.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(productModel.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(productModel.create).toBeDefined()
  })

  it('should have a update method', () => {
    expect(productModel.update).toBeDefined()
  })

  it('should have a delete method', () => {
    expect(productModel.delete).toBeDefined()
  })

  it('create method should create a new product', async () => {
    const result = await productModel.create({
      product_name: 'Apple',
      price: 2,
      category: 'Food'
    })
    expect(result).toEqual({
      id: 1,
      product_name: 'Apple',
      price: 2,
      category: 'Food'
    })
  })

  it('index method should return a list of products', async () => {
    const result = await productModel.index()
    expect(result).toEqual([
      {
        id: 1,
        product_name: 'Apple',
        price: 2,
        category: 'Food'
      }
    ])
  })

  it('show method should return the correct product', async () => {
    const result = await productModel.show('1')
    expect(result).toEqual({
      id: 1,
      product_name: 'Apple',
      price: 2,
      category: 'Food'
    })
  })

  it('update method should update the correct product', async () => {
    const result = await productModel.update(
      {
        product_name: 'Apple',
        price: 3,
        category: 'Food'
      },
      '1'
    )
    expect(result).toEqual({
      id: 1,
      product_name: 'Apple',
      price: 3,
      category: 'Food'
    })
  })

  it('delete method should delete the correct product', async () => {
    const result = await productModel.delete('1')
    expect(result).toEqual({
      id: 1,
      product_name: 'Apple',
      price: 3,
      category: 'Food'
    })
  })
})
