import express from 'express'
import { alterUserController, createUserController, loginController, validTokenController } from '../controllers/users'
import { createClientController, getAllClientsController, getClientController, updateClientController } from '../controllers/clients'
import { verifyToken } from '../middleware'
import { createProductController, getAllProductsController, getProductController, updateProductController } from '../controllers/products'
import { createOrderController, deleteOrderController, filterOrderController, getAllOrdersController, getOrderController, updateOrderController } from '../controllers/orders'
import { createOrderProductController, deleteOrderProductController, updateOrderProductController } from '../controllers/orderProducts'


export const router = express.Router()

//user
router.post("/user", verifyToken, createUserController)
router.post("/user/login", loginController)
router.post("/user/token", validTokenController)
router.put("/user", verifyToken, alterUserController)

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
router.delete("/orders/:id", verifyToken, deleteOrderController)

//orderProducts
router.post("/orderProducts", verifyToken, createOrderProductController)
router.put("/orderProducts", verifyToken, updateOrderProductController)
router.delete("/orderProducts/:id", verifyToken, deleteOrderProductController)