import asyncHandler from 'express-async-handler'
import { v4 as uuidv4 } from 'uuid'
import ProBatch from '../models/productBatchModel.js'
import Product from '../models/productsModel.js'
import Material from '../models/RMmodel.js'

ProBatch.belongsTo(Product)
ProBatch.belongsTo(Material)
Material.hasMany(ProBatch)
Product.hasMany(ProBatch)

// @desc create a Product
// @route POST / api/customer

const createBatch = asyncHandler(async (req, res) => {
  console.log(req.body)

  let product = await Product.findByPk(req.body.id)
  let material = await Material.findByPk(req.body.id)
 
  if (product) {
    let batchId = uuidv4()
    let batch = {
      id: batchId,
      qty: req.body.qty,
      salesPrice: req.body.salesPrice,
      costPrice: req.body.costPrice,
      productId: req.body.id,
    }

    const result = await ProBatch.create(batch)
    return res.status(201).json(result)
  }

  if (material) {
    let batchId = uuidv4()
    let batch = {
      id: batchId,
      qty: req.body.qty,
      salesPrice: req.body.salesPrice,
      costPrice: req.body.costPrice,
      materialId: req.body.id,
    }

    const result = await ProBatch.create(batch)
    return res.status(201).json(result)
  }

  res.status(400).json('Invalid Product or Material ID')
})

// @desc  list all products
// @route GET /api/products
// @access Private
const getAllBatches = asyncHandler(async (req, res) => {
  const batch = await ProBatch.findAll({
    order: [['createdAt', 'DESC']],
  })

  res.status(200).json(batch)
})

// @desc  product details
// @route GET /api/product/:id
// @access Private
const getSingleBatch = asyncHandler(async (req, res) => {
  const batch = await ProBatch.findByPk(req.params.id)

  if (batch) {
    res.status(200).json(batch)
  } else {
    res.status(404)
    throw new Error('batch not found')
  }
})

//@desc remove product
// @route DELETE /api/product/:id
// @access Private
const removeBatch = asyncHandler(async (req, res) => {
  const batch = await ProBatch.findByPk(req.params.id)

  if (batch) {
    await batch.destroy() // Would just set the `deletedAt` flag
    await batch.destroy({ force: true }) // Would really delete the record
    res.status(200).json('Successfully deleted!')
  } else {
    res.status(404)
    throw new Error('batch not found')
  }
})

//@desc update prouduct
// @route DELETE /api/product/:id
// @access Private
const updateBatch = asyncHandler(async (req, res) => {
  const propertyNames = Object.entries(req.body)
  let filteredObject = propertyNames.filter((item) => item[1] !== '')
  filteredObject = Object.fromEntries(filteredObject)

  const batch = await ProBatch.findByPk(req.params.id)

  if (batch) {
    customer.set(filteredObject)

    await customer.save()

    res.status(200).json(batch)
  } else {
    res.status(404)
    throw new Error('product not found')
  }
})

export { getAllBatches, createBatch, getSingleBatch, removeBatch, updateBatch }
