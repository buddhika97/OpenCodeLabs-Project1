import express from 'express'
const router = express.Router()
import {
    getAllProduct,
    createProduct,
    getSingleProduct,
    removeProduct,
    updateProduct,
} from '../controllers/productController.js'

import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(protect, getAllProduct).post(protect, createProduct)

router
  .route('/:id')
  .get( getSingleProduct)
  .delete(protect, removeProduct)
  .put(protect, updateProduct)

export default router
