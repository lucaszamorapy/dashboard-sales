import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'

dotenv.config()

export const sequelizeDb = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})