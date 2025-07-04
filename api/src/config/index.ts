import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'
import { Order } from '../models/orders';
import { Client } from '../models/clients';
import { Product } from '../models/products';
import { User } from '../models/users';
import { OrderProducts } from '../models/orderProducts';


export const sequelizeDb = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
})

Order.initModel(sequelizeDb)
Client.initModel(sequelizeDb)
Product.initModel(sequelizeDb)
User.initModel(sequelizeDb)
OrderProducts.initModel(sequelizeDb)

// Associa os relacionamentos (chama associate)
Order.associate();
Client.associate();
Product.associate();
OrderProducts.associate()