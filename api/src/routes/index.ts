import express from 'express'
import { alterUserController, createUserController, loginController } from '../controllers/users'


export const router = express.Router()

//user
router.post("/user", createUserController)
router.put("/user", alterUserController)
router.post("/user/login", loginController)