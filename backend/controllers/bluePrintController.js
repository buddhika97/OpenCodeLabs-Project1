import asyncHandler from 'express-async-handler'
import { v4 as uuidv4 } from 'uuid'

import Product from '../models/productsModel.js'
import BluePrint from '../models/bluePrintModel.js'
import Material from '../models/RMmodel.js'
import ProBatch from '../models/productBatchModel.js'
import db from '../config/db.js'

// @desc create a BluePrint
// @route POST / api/blueprint

export const createBluePrint = asyncHandler(async (req, res) => {
  let name = req.body.name.toLowerCase().split(' ')

  name = name.filter((item) => item).join(' ')

  const product = await Product.findOne({
    where: {
      name: name,
    },
  })

  if (product) {
    let bluePrintId = uuidv4()
    let blueprint = {
      id: bluePrintId,
      resources: JSON.stringify(req.body.resources),
      productId: product.id,
    }
    const result = await BluePrint.create(blueprint)
    return res.status(201).json(result)
  } else {
    res.status(400)
    throw new Error('Check product name')
  }
})

// @desc  list all blueprints
// @route GET /api/blueprint
// @access Private
export const getAllBluePrints = asyncHandler(async (req, res) => {
  const batch = await BluePrint.findAll({
    order: [['createdAt', 'DESC']],
  })

  let result = []
  for (let i = 0; i < batch.length; i++) {
    batch[i].resources = JSON.parse(batch[i].resources)

    let BluPrintReturn = {
      id: batch[i].id,
      productId: batch[i].productId,
      resources: batch[i].resources,
      items: await findProductCountAndCost(batch[i].resources),
    }

    result.push(BluPrintReturn)
  }

  res.status(200).json(result)
})

//product counter helper
const findProductCountAndCost = async (materialList) => {
  let productCountArr = []

  for (const property in materialList) {
    let available = await db.query(
      `SELECT SUM(qty) FROM probatches WHERE materialId = '${property}' AND qty > 0;`
    )
    available = available[0][0]['SUM(qty)']
    if (available > materialList[property]) {
      productCountArr.push(Math.floor(available / materialList[property]))
    } else {
      productCountArr.push(Math.floor(available / materialList[property]))
    }

    let total = await db.query(
      `SELECT * FROM probatches WHERE materialId = '${property}' AND qty > 0 ORDER BY createdAt ASC`
    )
  }

  return productCountArr.sort((a, b) => a - b)[0]
}

// @desc  product details
// @route GET /api/product/:id
// @access Private
export const getSingleBluePrint = asyncHandler(async (req, res) => {
  const blueprint = await BluePrint.findByPk(req.params.id)

  if (blueprint) {
    res.status(200).json(blueprint)
  } else {
    res.status(404)
    throw new Error('Blueprint not found')
  }
})

//@desc remove blueprint
// @route DELETE /api/blueprint/:id
// @access Private
export const removeBlueprint = asyncHandler(async (req, res) => {
  const blueprint = await BluePrint.findByPk(req.params.id)

  if (blueprint) {
    await blueprint.destroy() // Would just set the `deletedAt` flag
    await blueprint.destroy({ force: true }) // Would really delete the record
    res.status(200).json('Successfully deleted!')
  } else {
    res.status(404)
    throw new Error('blueprint not found')
  }
})

//@desc update blueprint
// @route DELETE /api/blueprint/:id
// @access Private
export const updateBlueprint = asyncHandler(async (req, res) => {
  const propertyNames = Object.entries(req.body)
  let filteredObject = propertyNames.filter((item) => item[1] !== '')
  filteredObject = Object.fromEntries(filteredObject)

  const blueprint = await BluePrint.findByPk(req.params.id)

  if (blueprint) {
    blueprint.set(filteredObject)

    await blueprint.save()

    res.status(200).json(batch)
  } else {
    res.status(404)
    throw new Error('blueprint not found')
  }
})
