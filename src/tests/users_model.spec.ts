import UserModel from '../models/user.model'
import db from '../database'

const userModel = new UserModel()

describe('User Model', () => {
  afterAll(async () => {
    const connection = await db.connect()
    const sql = `DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n`
    await connection.query(sql)
    connection.release()
  })

  it('should have an index method', () => {
    expect(userModel.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(userModel.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(userModel.create).toBeDefined()
  })

  it('should have a update method', () => {
    expect(userModel.update).toBeDefined()
  })

  it('should have a delete method', () => {
    expect(userModel.delete).toBeDefined()
  })

  it('create method should create a new user', async () => {
    const result = await userModel.create({
      first_name: 'John',
      last_name: 'Smith',
      password: 'HakunaMatata'
    })
    expect(result).toEqual({
      id: 1,
      first_name: 'John',
      last_name: 'Smith'
    })
  })

  it('index method should return a list of users', async () => {
    const result = await userModel.index()
    expect(result).toEqual([
      {
        id: 1,
        first_name: 'John',
        last_name: 'Smith'
      }
    ])
  })

  it('show method should return the correct user', async () => {
    const result = await userModel.show('1')
    expect(result).toEqual({
      id: 1,
      first_name: 'John',
      last_name: 'Smith'
    })
  })

  it('update method should update the correct user', async () => {
    const result = await userModel.update(
      {
        first_name: 'John',
        last_name: 'Doe',
        password: 'HakunaMatata'
      },
      '1'
    )
    expect(result).toEqual({
      id: 1,
      first_name: 'John',
      last_name: 'Doe'
    })
  })

  it('delete method should delete the correct user', async () => {
    const result = await userModel.delete('1')
    expect(result).toEqual({
      id: 1,
      first_name: 'John',
      last_name: 'Doe'
    })
  })
})
