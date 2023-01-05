import express from 'express'
const router = express.Router()
import {
  getAllMaterials,
  createMaterial,
  getSingleMaterial,
  removeMaterial,
  updateMaterial,
} from '../controllers/rmController.js'

import { protect,admin } from '../middleware/authMiddleware.js'

router.route('/').get(protect,admin, getAllMaterials).post(protect,admin, createMaterial)

router
  .route('/:id')
  .get(protect,admin, getSingleMaterial)
  .delete(protect,admin, removeMaterial)
  .put(protect,admin, updateMaterial)

export default router
