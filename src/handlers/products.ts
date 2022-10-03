import { Application, Request, Response } from 'express'
import Product from '../types/product.type'
import ProductModel from '../models/product.model'
import authenticateToken from '../middleware/authentication.middleware'

const productModel = new ProductModel()

// Showing all products
const index = async (req: Request, res: Response) => {
  try {
    const products = await productModel.index()
    res.json(products)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

// Showing a product using its ID
const show = async (req: Request, res: Response) => {
  try {
    const product = await productModel.show(req.params.id as string)
    res.json(product)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

// Creating a product
const create = async (req: Request, res: Response) => {
  const productObj: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category
  }

  try {
    const product = await productModel.create(productObj)
    res.json(product)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

// Updating a product
const update = async (req: Request, res: Response) => {
  const productObj: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category
  }

  try {
    const product = await productModel.update(productObj, req.params.id as string)
    res.json(product)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

// Deleting a product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await productModel.delete(req.params.id as string)
    res.json(product)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

// User routes
const product_routes = (app: Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', authenticateToken, create)
  app.patch('/products/:id', authenticateToken, update)
  app.delete('/products/:id', authenticateToken, deleteProduct)
}

export default product_routes
