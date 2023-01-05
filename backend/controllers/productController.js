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

// @desc  list all products based on the stock
// @route GET /api/products
// @access Private
const getAllProduct = asyncHandler(async (req, res) => {
  // Retrieve all products that have batches
  let products = await ProBatch.findAll({ include: Product })
  // Retrieve all products that do not have batches
  let outOfStock = await Product.findAll({ include: ProBatch })
  // Filter outOfStock array to only include products with no batches
  outOfStock = outOfStock.filter((item) => item.ProBatches.length < 1)
  // Set the quantity of outOfStock products to 0
  outOfStock.forEach((item) => (item.qty = 0))

  // Retrieve all products and their total quantities from the database
  let amount =
    await db.query(`SELECT products.id, products.name, products.description,products.category, products.brand, products.re_order_level, 
  SUM(probatches.qty) as sum FROM products,probatches 
  WHERE products.id = probatches.productId
  GROUP BY probatches.productId`)

  // Filter the amount array to only include products with no quantities
  let filterArr = amount[0]
  filterArr = filterArr.filter((item) => item.sum < 1)
  // Add the outOfStock products to the amount array
  outOfStock = [...outOfStock, ...filterArr]
  // Filter the products array to only include products with quantities greater than 0
  let inStock = products.filter((item) => Number(item.qty) > 0)
  // Remove products from the inStock array that do not have a productId
  inStock = inStock.filter((item) => item.productId !== null)

  // Return the inStock array if the "stock" query parameter is "in", otherwise return the outOfStock array
  console.log(inStock[0])
  if (req.query.stock === 'in') {
    res.status(200).json(inStock)
  } else {
    res.status(200).json(outOfStock)
  }
})

// @desc  list all products
// @route GET /api/products/names
// @access Private
const getProductNames = asyncHandler(async (req, res) => {
  // let products = await db.query(`SELECT * FROM products WHERE name LIKE '%${req.query.key}%'`)

  let products = await db.query(`SELECT name FROM products`)

  res.status(200).json(products[0])
})

// @desc  product details
// @route GET /api/product/public/:id
// @access public
const prodcutDetails = asyncHandler(async (req, res) => {
  let probatch = await ProBatch.findOne({
    where: {
      productId: req.params.id,
    },
  })

  let result = {
    id: probatch.productId,
    name: probatch.name,
    qty: probatch.qty,
    price: probatch.salesPrice,
  }

  if (probatch) {
    res.status(200).json(result)
  } else {
    res.status(404)
    throw new Error('product not found')
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


//@desc get names of all products and materils
// @route GET /api/product/allnames
// @access Private
const getallProductsAndMaterial = asyncHandler(async (req, res) => {
  const productnames = await Product.findAll({
    attributes: ['name']
  });
  const matNames = await Material.findAll({
    attributes: ['name']
  });

  const resArr = [...productnames,...matNames]

  res.status(200).json(resArr)
})

export {
  getAllProduct,
  createProduct,
  getSingleProduct,
  removeProduct,
  prodcutDetails,
  updateProduct,
  getProductNames,
  getallProductsAndMaterial
}
