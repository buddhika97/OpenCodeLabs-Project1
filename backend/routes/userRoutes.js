import express from 'express'
const router = express.Router()

import {
  authUser,
  registerUser,
  getUsers,
  updateUser,
  getSingleUser,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'


router.route('/').post(registerUser).get(protect, getUsers)

router.post('/login', authUser)

router.route('/:id').put(protect, updateUser).get(protect, getSingleUser)

export default router

