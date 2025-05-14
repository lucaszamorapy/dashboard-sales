import express from 'express'
import { alterUserController, createUserController, loginController } from '../controllers/users'
import { createClientController, getAllClientsController, getClientController, updateClientController } from '../controllers/clients'
import { verifyToken } from '../middleware'
import { createProductController, getAllProductsController, getProductController, updateProductController } from '../controllers/products'
import { createOrderController, filterOrderController, getAllOrdersController, getOrderController, updateOrderController } from '../controllers/orders'


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

//orders
router.get("/orders", verifyToken, getAllOrdersController)
router.get("/orders/:id", verifyToken, getOrderController)
router.post("/orders", verifyToken, createOrderController)
router.post("/orders/filter", verifyToken, filterOrderController)
router.put("/orders", verifyToken, updateOrderController)
