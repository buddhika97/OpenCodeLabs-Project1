import express from 'express'
const router = express.Router()
import {
    createBluePrint,
    getAllBluePrints,
    getSingleBluePrint,
    removeBlueprint,
    updateBlueprint,
} from '../controllers/bluePrintController.js'

import { protect,admin } from '../middleware/authMiddleware.js'

router.route('/').get(protect, admin,getAllBluePrints).post(protect,admin, createBluePrint)

router
  .route('/:id')
  .get( protect, admin, getSingleBluePrint)
  .delete(protect, admin,removeBlueprint)
  .put(protect,admin, updateBlueprint)

export default router
