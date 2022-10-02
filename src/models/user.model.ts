import db from '../database'
import bcrypt from 'bcrypt'
import config from '../config'
import User from '../types/user.type'

// Function that gets passed a plain text passowrd and returns a hashed password using bcrypt
const hashPassowrd = (password: string) => {
  const salt = parseInt(config.salt as string)
  return bcrypt.hashSync(password + config.pepper, salt)
}

// DB model for the users table
class UserModel {
  [x: string]: any
  // Showing all users
  async index(): Promise<User[]> {
    try {
      const connection = await db.connect()
      const sql = `SELECT id, first_name, last_name FROM users`
      const result = await connection.query(sql)

      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Unable to show users, ${error}`)
    }
  }

  // Showing a specific user using their ID
  async show(id: string): Promise<User> {
    try {
      const connection = await db.connect()
      const sql = `SELECT id, first_name, last_name FROM users WHERE id=($1)`
      const result = await connection.query(sql, [id])

      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to show user with id '${id}', ${error}`)
    }
  }

  // Creating a new user
  async create(user: User): Promise<User> {
    try {
      const connection = await db.connect()
      const sql = `INSERT INTO users (first_name, last_name, password)
                   VALUES ($1, $2, $3)
                   RETURNING id, first_name, last_name`

      const result = await connection.query(sql, [
        user.first_name,
        user.last_name,
        hashPassowrd(user.password)
      ])

      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to create a new user, ${error}`)
    }
  }

  // Updating a user
  async update(user: User, id: string): Promise<User> {
    try {
      const connection = await db.connect()
      const sql = `UPDATE users
                   SET first_name=$1, last_name=$2, password=$3
                   WHERE id=($4)
                   RETURNING id, first_name, last_name`

      const result = await connection.query(sql, [
        user.first_name,
        user.last_name,
        hashPassowrd(user.password),
        id
      ])

      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to update the user with the id ${id}, ${error}`)
    }
  }

  // Deleting a user
  async delete(id: string): Promise<User> {
    try {
      const connection = await db.connect()
      const sql = `DELETE FROM users
                   WHERE id=($1)
                   RETURNING id, first_name, last_name`

      const result = await connection.query(sql, [id])

      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to delete the user with the id ${id}, ${error}`)
    }
  }
}

export default UserModel
