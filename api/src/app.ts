import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
});

import express from 'express';
import cors from 'cors';
import { router } from './routes';
import { sequelizeDb } from './config';

const app = express();
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});
app.use(cors());
app.use(express.json());
app.use("/api", router);

const start = async () => {
  try {
    await sequelizeDb.authenticate();
    console.log('Conexão ao banco de dados estabelecida');
    app.listen(process.env.PORT, () => {
      console.log(`Servidor rodando na porta ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
    setTimeout(start, 5000);
  }
};

start();
