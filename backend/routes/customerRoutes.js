import express from 'express'
const router = express.Router()
import {
  getAllUsers,
  createCustomer,
  getSingleCustomer,
  removeCustomer,
  updateCustomer,
} from '../controllers/customerController.js'

import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(protect, getAllUsers).post(protect, createCustomer)

router
  .route('/:id')
  .get(protect, getSingleCustomer)
  .delete(protect, removeCustomer)
  .put(protect, updateCustomer)

export default router
