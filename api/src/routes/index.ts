import express from 'express'
import { alterUserController, createUserController, loginController } from '../controllers/users'
import { createClientController, getAllClientsController, getClientController, updateClientController } from '../controllers/clients'
import { verifyToken } from '../middleware'
import { createProductController, getAllProductsController, getProductController, updateProductController } from '../controllers/products'


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

//products
router.get("/products", verifyToken, getAllProductsController)
router.get("/products/:id", verifyToken, getProductController)
router.post("/products", verifyToken, createProductController)
router.put("/products", verifyToken, updateProductController)
