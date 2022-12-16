import express from 'express'
const router = express.Router()
import {
    getAllBatches,
  createBatch,
  getSingleBatch,
  removeBatch,
  updateBatch,
} from '../controllers/productBatchesController.js'

import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(protect, getAllBatches).post(protect, createBatch)



router
  .route('/:id')
  .get(protect, getSingleBatch)


export default router
