import express from 'express'
const router = express.Router()

import {
    createSale,
    listSales,
    listSalesbyItem,
    latestSales,
    totalSales,
    invoiceData
} from '../controllers/salesController.js'

import { protect,admin } from '../middleware/authMiddleware.js'

router.route('/').get(protect, listSales).post(protect, createSale)

router.get('/items', protect, listSalesbyItem)

router.get('/latest', protect, latestSales)

router.get('/invoice/:id',  invoiceData)

router.get('/total', protect,admin, totalSales)


export default router
