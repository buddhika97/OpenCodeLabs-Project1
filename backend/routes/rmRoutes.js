import express from 'express'
const router = express.Router()
import {
  getAllMaterials,
  createMaterial,
  getSingleMaterial,
  removeMaterial,
  updateMaterial,
} from '../controllers/rmController.js'

import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(protect, getAllMaterials).post(protect, createMaterial)

router
  .route('/:id')
  .get(protect, getSingleMaterial)
  .delete(protect, removeMaterial)
  .put(protect, updateMaterial)

export default router
