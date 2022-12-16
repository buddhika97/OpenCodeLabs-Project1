import express from 'express'
const router = express.Router()
import {
    createBluePrint,
    getAllBluePrints,
    getSingleBluePrint,
    removeBlueprint,
    updateBlueprint,
} from '../controllers/bluePrintController.js'

import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(protect, getAllBluePrints).post(protect, createBluePrint)

router
  .route('/:id')
  .get( getSingleBluePrint)
  .delete(protect, removeBlueprint)
  .put(protect, updateBlueprint)

export default router
