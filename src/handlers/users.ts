import { Application, Request, Response } from 'express'
import User from '../types/user.type'
import UserModel from '../models/user.model'
import jwt from 'jsonwebtoken'
import config from '../config'
import authenticateToken from '../middleware/authentication.middleware'

const userModel = new UserModel()

// Showing all users
const index = async (req: Request, res: Response) => {
  try {
    const users = await userModel.index()
    res.json(users)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Showing a user using their ID
const show = async (req: Request, res: Response) => {
  try {
    const user = await userModel.show(req.params.id as string)
    res.json(user)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Creating a user
const create = async (req: Request, res: Response) => {
  const userObj: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.passowrd
  }

  try {
    const token = jwt.sign(userObj, config.signiture as string)
    await userModel.create(userObj)
    res.json(token)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Updating a user
const update = async (req: Request, res: Response) => {
  const userObj: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.passowrd
  }

  try {
    const user = await userModel.update(userObj, req.params.id as string)
    res.json(user)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Deleting a user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.delete(req.params.id as string)
    res.json(user)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// User routes
const users_routes = (app: Application) => {
  app.get('/users', authenticateToken, index)
  app.get('/users/:id', authenticateToken, show)
  app.post('/users', create)
  app.patch('/users/:id', authenticateToken, update)
  app.delete('/users/:id', authenticateToken, deleteUser)
}

export default users_routes
