import express from 'express'
const router = express.Router()

import {
    createSale,
    listSales,
    listSalesbyItem,
    latestSales,
    totalSales
} from '../controllers/salesController.js'

import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(protect, listSales).post(protect, createSale)

router.get('/items', protect, listSalesbyItem)

router.get('/latest', protect, latestSales)

router.get('/total', protect, totalSales)

// router
//   .route('/:id')
//   .get(protect, getSingleMaterial)
//   .delete(protect, removeMaterial)
//   .put(protect, updateMaterial)

export default router
