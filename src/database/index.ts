import { Pool } from 'pg'
import config from '../config'

const db = new Pool({
  host: config.host,
  database: config.db,
  password: config.password,
  port: parseInt(config.dbPort as string)
})

export default db
