import express from 'express'
const router = express.Router()

import {
  authUser,
  registerUser,
  getUsers,
  updateUser,
  getSingleUser,
} from '../controllers/userController.js'
import { protect,admin, } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect,admin, getUsers)

router.post('/login', authUser)

router.route('/:id').put(protect,admin, updateUser).get(protect,admin, getSingleUser)

export default router

