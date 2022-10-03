import express, { Application } from 'express'
import morgan from 'morgan'
import users_routes from './handlers/users'
import product_routes from './handlers/products'
import order_routes from './handlers/orders'
import dashboard_routes from './handlers/dashboard'
import bp from 'body-parser'

const PORT = process.env.PORT || 3000

// create an instance server
const app: Application = express()

// Middleware
app.use(morgan('short'))
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

users_routes(app)
product_routes(app)
order_routes(app)
dashboard_routes(app)

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting on port: ${PORT}`)
})

export default app
