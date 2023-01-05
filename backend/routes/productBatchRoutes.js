import express from 'express'
const router = express.Router()
import {
  getAllBatches,
  createBatch,
  getSingleBatch,
  removeBatch,
  updateBatch,
  updateMaterialsBatches,
  totalCost
} from '../controllers/productBatchesController.js'

import { protect,admin } from '../middleware/authMiddleware.js'

router
  .route('/')
  .get(protect,admin, getAllBatches)
  .post(protect,admin, createBatch)
  .put(protect,admin, updateMaterialsBatches)

router.get('/total',protect,admin, totalCost)

router.route('/:id').get(protect,admin, getSingleBatch)

export default router
