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

import { protect } from '../middleware/authMiddleware.js'

router
  .route('/')
  .get(protect, getAllBatches)
  .post(protect, createBatch)
  .put(protect, updateMaterialsBatches)

router.get('/total', protect, totalCost)

router.route('/:id').get(getSingleBatch)

export default router
