import * as dotenv from 'dotenv'

dotenv.config()

const {
  PORT,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  BCRYPT_SECRET,
  SALT,
  SIGNITURE
} = process.env

export default {
  port: PORT,
  host: POSTGRES_HOST,
  dbPort: POSTGRES_PORT,
  db: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  pepper: BCRYPT_SECRET,
  salt: SALT,
  signiture: SIGNITURE
}