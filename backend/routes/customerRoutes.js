import express from 'express'
const router = express.Router()
import {
  getAllUsers,
  createCustomer,
  getSingleCustomer,
  removeCustomer,
  updateCustomer,
  totalCustomers
} from '../controllers/customerController.js'

import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(protect, getAllUsers).post(protect, createCustomer)

router.get('/total', protect, totalCustomers)

router
  .route('/:id')
  .get(protect, getSingleCustomer)
  .delete(protect, removeCustomer)
  .put(protect, updateCustomer)



export default router
