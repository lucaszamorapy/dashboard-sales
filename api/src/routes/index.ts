import express from 'express'
import { alterUserController, createUserController, loginController } from '../controllers/users'
import { createClientController, getAllClientsController, getClientController, updateClientController } from '../controllers/clients'


export const router = express.Router()

//user
router.post("/user", createUserController)
router.put("/user", alterUserController)
router.post("/user/login", loginController)

//clients
router.get("/clients", getAllClientsController)
router.get("/clients/:id", getClientController)
router.post("/clients", createClientController)
router.put("/clients", updateClientController)