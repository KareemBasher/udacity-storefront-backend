import express, { Application } from 'express'
import morgan from 'morgan'
import users_routes from './handlers/users'
import bp from 'body-parser'

const PORT = process.env.PORT || 3000

// create an instance server
const app: Application = express()

// Middleware
app.use(morgan('short'))
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

users_routes(app)

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting on port: ${PORT}`)
})

export default app
