import { Application, Request, Response } from 'express'
import Order from '../types/order.type'
import OrderModel from '../models/order.model'
import authenticateToken from '../middleware/authentication.middleware'

const orderModel = new OrderModel()

// Showing all orders
const index = async (req: Request, res: Response) => {
  try {
    const orders = await orderModel.index()
    res.json(orders)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Showing an order using its ID
const show = async (req: Request, res: Response) => {
  try {
    const order = await orderModel.show(req.params.id as string)
    res.json(order)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Creating an order
const create = async (req: Request, res: Response) => {
  const orderObj: Order = {
    status: req.body.status,
    user_id: req.body.user_id
  }

  try {
    const order = await orderModel.create(orderObj)
    res.json(order)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Updating an order
const update = async (req: Request, res: Response) => {
  const orderObj: Order = {
    status: req.body.status,
    user_id: req.body.user_id
  }

  try {
    const order = await orderModel.update(orderObj, req.params.id as string)
    res.json(order)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Deleting an order
const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await orderModel.delete(req.params.id as string)
    res.json(order)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Showing all orders by a user
const ordersByUser = async (req: Request, res: Response) => {
  try {
    const orders = await orderModel.ordersByUser(req.params.id as string)
    res.json(orders)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Adding a product to the cart (open order)
const addProduct = async (req: Request, res: Response) => {
  const orderObj: Order = {
    quantity: parseInt(req.body.quantity),
    product_id: req.body.product_id
  }

  try {
    const addedProduct = await orderModel.addProduct(orderObj, req.params.id)
    res.json(addedProduct)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Order routes
const order_routes = (app: Application) => {
  app.get('/orders', authenticateToken, index)
  app.get('/orders/:id', authenticateToken, show)
  app.post('/orders', authenticateToken, create)
  app.patch('/orders/:id', authenticateToken, update)
  app.delete('/orders/:id', authenticateToken, deleteOrder)
  app.post('/orders/:id/products', authenticateToken, addProduct)
  app.get('/orders/:id/users', authenticateToken, ordersByUser)
}

export default order_routes
