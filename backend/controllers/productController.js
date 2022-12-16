import asyncHandler from 'express-async-handler'
import { v4 as uuidv4 } from 'uuid'
import ProBatch from '../models/productBatchModel.js'
import Product from '../models/productsModel.js'

import { Sequelize, Model, Op } from 'sequelize'
import db from '../config/db.js'
import Material from '../models/RMmodel.js'

// ProBatch.belongsTo(Product)
// Product.hasMany(ProBatch)

// @desc create a Product
// @route POST / api/customer

const createProduct = asyncHandler(async (req, res) => {
  let productId = uuidv4()
  let product = req.body
  product.id = productId
  product.name = product.name.toLowerCase()
  const result = await Product.create(product)
  res.status(201).json(result)
})

// @desc  list all products
// @route GET /api/products
// @access Private
const getAllProduct = asyncHandler(async (req, res) => {
  let products = await ProBatch.findAll({ include: Product })
  let outOfStock = await Product.findAll({ include: ProBatch })
  outOfStock = outOfStock.filter((item) => item.ProBatches.length < 1)
  outOfStock.forEach((item) => (item.qty = 0))

  let amount =
    await db.query(`SELECT products.id, products.name, products.description,products.category, products.brand, products.re_order_level, 
  SUM(probatches.qty) as sum FROM products,probatches 
  WHERE products.id = probatches.productId
  GROUP BY probatches.productId`)

  let filterArr = amount[0]
  filterArr = filterArr.filter((item) => item.sum < 1)
  outOfStock = [...outOfStock, ...filterArr]
  let inStock = products.filter((item) => item.qty > 0)
  inStock = products.filter((item) => item.productId !== null)



  // out of stock materials 
  // let outOfStockm = await Material.findAll({ include: ProBatch })
  // outOfStockm = outOfStockm.filter((item) => item.ProBatches.length < 1)
  // outOfStockm.forEach((item) => (item.qty = 0))
  // let amountm =
  //   await db.query(`SELECT materials.id, materials.name, materials.description,materials.category, materials.brand, materials.re_order_level, 
  // SUM(probatches.qty) as sum FROM materials,probatches 
  // WHERE materials.id = probatches.materialId 
  // GROUP BY probatches.materialId`)
  // let filterArrm = amountm[0]
  // filterArrm = filterArrm.filter((item) => item.sum < 1)
  // outOfStockm = [...outOfStockm, ...filterArrm]


  console.log(req.query)
  if (req.query.stock === 'in') {
    res.status(200).json(inStock)
  } else {
    res.status(200).json(outOfStock)
  }
})

// @desc  product details
// @route GET /api/product/:id
// @access Private
const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByPk(req.params.id)

  if (product) {
    res.status(200).json(product)
  } else {
    res.status(404)
    throw new Error('product not found')
  }
})

//@desc remove product
// @route DELETE /api/product/:id
// @access Private
const removeProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByPk(req.params.id)

  if (product) {
    await product.destroy() // Would just set the `deletedAt` flag
    await product.destroy({ force: true }) // Would really delete the record
    res.status(200).json('Successfully deleted!')
  } else {
    res.status(404)
    throw new Error('product not found')
  }
})

//@desc update prouduct
// @route DELETE /api/product/:id
// @access Private
const updateProduct = asyncHandler(async (req, res) => {
  console.log('dddd')
  const propertyNames = Object.entries(req.body)
  let filteredObject = propertyNames.filter((item) => item[1] !== '')
  filteredObject = Object.fromEntries(filteredObject)

  const product = await Product.findByPk(req.params.id)

  if (product) {
    product.set(filteredObject)

    await product.save()

    res.status(200).json(product)
  } else {
    res.status(404)
    throw new Error('product not found')
  }
})

export {
  getAllProduct,
  createProduct,
  getSingleProduct,
  removeProduct,
  updateProduct,
}
