import express from 'express';
import cors from 'cors';
import { router } from './routes';
import { sequelizeDb } from './config';

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api", router)
const port = 8082

const start = async () => {
  try {
    await sequelizeDb.authenticate()
    console.log('Conexão ao banco de dados estabelecida')
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`)
    })
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
    setTimeout(start, 5000);
  }
}
start();