import express from 'express'
import { alterUserController, createUserController, loginController } from '../controllers/users'
import { createClientController, getAllClientsController, getClientController, updateClientController } from '../controllers/clients'
import { verifyToken } from '../middleware'


export const router = express.Router()

//user
router.post("/user", verifyToken, createUserController)
router.put("/user", verifyToken, alterUserController)
router.post("/user/login", loginController)

//clients
router.get("/clients", verifyToken, getAllClientsController)
router.get("/clients/:id", verifyToken, getClientController)
router.post("/clients", verifyToken, createClientController)
router.put("/clients", verifyToken, updateClientController)