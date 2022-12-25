import asyncHandler from 'express-async-handler'
import { v4 as uuidv4 } from 'uuid'
import ProBatch from '../models/productBatchModel.js'
import Product from '../models/productsModel.js'
import Material from '../models/RMmodel.js'
import db from '../config/db.js'

ProBatch.belongsTo(Product)
ProBatch.belongsTo(Material)
Material.hasMany(ProBatch)
Product.hasMany(ProBatch)

// @desc create a Product
// @route POST / api/probatch

const createBatch = asyncHandler(async (req, res) => {

  let name = req.body.name.toLowerCase().split(' ')

  name = name.filter((item) => item).join(' ')

  let product = await Product.findOne({
    where: {
      name: name,
    },
  })
  let material = await Material.findOne({
    where: {
      name: name,
    },
  })

  
  if (product) {
    let batchId = uuidv4()
    let batch = {
      id: batchId,
      qty: req.body.qty,
      salesPrice: req.body.salesPrice,
      costPrice: req.body.costPrice,
      productId: product.id,
      name: product.name,
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
      materialId: material.id,
      name: material.name,
    }

    const result = await ProBatch.create(batch)
    return res.status(201).json(result)
  }

  res.status(400).json('Invalid Product or Material ID')
})

// @desc  list all probatch
// @route GET /api/probatch
// @access Private
const getAllBatches = asyncHandler(async (req, res) => {
  const batch = await ProBatch.findAll({
    order: [['createdAt', 'DESC']],
  })

  res.status(200).json(batch)
})



//@desc update product mint
//@route UPDATE /api/probatch
//@access Private

const updateMaterialsBatches = asyncHandler(async (req, res) => {
  
 
  for(let i=0; i < req.body.batches.length; i++) {
   let batch = await ProBatch.findByPk( req.body.batches[i].id)
   console.log(req.body.batches[i])
    if(batch) {
      batch.set({ qty: batch.qty - (req.body.batches[i].qty),})
      await batch.save()
    }else{
      res.status(404)
      throw new Error('Batch Not Found')
    }
  }
  res.status(200).json('Success')
})




// ///////////////////////////////////////////////
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
// @route UPDATE /api/product/:id
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

// @desc  total cost
// @route GET /api/probatch/total
// @access Private
const totalCost = asyncHandler(async (req, res) => {
  const sales = await db.query(`SELECT SUM(costPrice) as totalCost
  FROM probatches`)
  console.log('dfd')
  res.status(200).json(sales[0][0])
})


export { getAllBatches, createBatch, getSingleBatch, removeBatch, updateBatch,updateMaterialsBatches,totalCost }
