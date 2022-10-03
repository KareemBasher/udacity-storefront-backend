import { Application, Request, Response } from 'express'
import DashboardQueries from '../services/dashboard'

const dashboard = new DashboardQueries()

// Shows products from certain category
const category = async (req: Request, res: Response) => {
  try {
    const products = await dashboard.category(req.params.category as string)
    res.json(products)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

// Returning the top five products
const topProducts = async (req: Request, res: Response) => {
  try {
    const products = await dashboard.topProducts()
    res.json(products)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

// Returning closed orders by a certain user
const closedOrders = async (req: Request, res: Response) => {
  try {
    const orders = await dashboard.closedOrders(req.params.id as string)
    res.json(orders)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const dashboard_routes = (app: Application) => {
  app.get('/products/category/:category', category)
  app.get('/products/top/five', topProducts)
  app.get('/orders/closed/:id/users', closedOrders)
}

export default dashboard_routes
