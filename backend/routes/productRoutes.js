import express from 'express'
const router = express.Router()
import {
    getAllProduct,
    createProduct,
    getSingleProduct,
    removeProduct,
    updateProduct,
    prodcutDetails
} from '../controllers/productController.js'

import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(protect, getAllProduct).post(protect, createProduct)


router.route('/public/:id').get(prodcutDetails)

router
  .route('/:id')
  .get( protect, getSingleProduct)
  .delete(protect, removeProduct)
  .put(protect, updateProduct)

export default router
