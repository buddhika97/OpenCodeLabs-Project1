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

  if (product && product.id) {
    let bluePrintId = uuidv4()
    let blueprint = {
      id: bluePrintId,
      resources: JSON.stringify(req.body.resources),
      productId: product.id,
      productName: product.name,
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
      productName: batch[i].productName,
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
  // Initialize an empty array to store the product counts
  let productCountArr = []

  // Loop through the material list and get the available quantity and cost for each material
  for (const property in materialList) {
    // Get the available quantity of the material from the probatches table
    const available = await db.query(
      `SELECT SUM(qty) FROM ProBatches WHERE materialId = '${property}' AND qty > 0;`
    )
    // Get the total cost of the material from the probatches table
    const total = await db.query(
      `SELECT * FROM ProBatches WHERE materialId = '${property}' AND qty > 0 ORDER BY createdAt ASC`
    )

    // Calculate the number of products that can be made with the available quantity of the material
    const productCount = Math.floor(
      available[0][0]['SUM(qty)'] / materialList[property]
    )

    // Add the product count to the array
    productCountArr.push(productCount)
  }

  // Sort the array of product counts in ascending order and return the first (smallest) value
  return productCountArr.sort((a, b) => a - b)[0]
}

// @desc  product details
// @route GET /api/product/:id
// @access Private
export const getSingleBluePrint = asyncHandler(async (req, res) => {
  const blueprint = await BluePrint.findByPk(req.params.id)

  const resourecesArr = []
  let returnArr = []
  // blueprint.resources.forEach((item)=> console.log(item))

  if (blueprint) {
    const materialList = JSON.parse(blueprint.resources)

    for (const property in materialList) {
      const material = await db.query(
        `SELECT * from 	ProBatches WHERE materialId='${property}' AND qty >       0 ORDER BY createdAt ASC`
      )

      let availableQty = 0

      if (materialList[property] > material[0][0].qty) {
        for (let i = 0; i < material[0].length; i++) {
          let cache = availableQty
          availableQty += material[0][i].qty
          if (availableQty > materialList[property]) {
            material[0][i].qty = materialList[property] - cache
            returnArr.push(material[0][i])
            break
          } else {
            returnArr.push(material[0][i])
          }
        }
      } else {
        material[0][0].qty = materialList[property]
        returnArr.push(material[0][0])
      }
    }

    blueprint.resources = returnArr

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
