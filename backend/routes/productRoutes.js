import express from 'express'
const router = express.Router()
import {
    getAllProduct,
    createProduct,
    getSingleProduct,
    removeProduct,
    updateProduct,
    prodcutDetails,
    getProductNames,
    getallProductsAndMaterial
} from '../controllers/productController.js'

import { protect,admin, } from '../middleware/authMiddleware.js'

router.route('/').get(protect, getAllProduct).post(protect,admin, createProduct)

router.get('/names', protect,admin, getProductNames)
router.get('/allnames', protect,admin, getallProductsAndMaterial)

router.route('/public/:id').get(prodcutDetails)



router
  .route('/:id')
  .get(protect,admin, getSingleProduct)
  .delete(protect,admin, removeProduct)
  .put(protect,admin, updateProduct)

export default router
