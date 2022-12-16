import asyncHandler from 'express-async-handler'
import { v4 as uuidv4 } from 'uuid'
import ProBatch from '../models/productBatchModel.js'
import Material from '../models/RMmodel.js'
import db from '../config/db.js'



// @desc create a Material
// @route POST / api/material

const createMaterial = asyncHandler(async (req, res) => {

  let Id = uuidv4()
  let material = req.body
  material.id = Id
  material.name = material.name.toLowerCase()
  const result = await Material.create(material)
  res.status(201).json(result)
})

// @desc  list all Material
// @route GET /api/material
// @access Private
const getAllMaterials = asyncHandler(async (req, res) => {

  let materials = await ProBatch.findAll({ include: Material })
  let outOfStock = await Material.findAll({ include: ProBatch })
  outOfStock =  outOfStock.filter(item => item.ProBatches.length < 1)
  outOfStock.forEach(item => item.qty = 0)

  let amount = await db.query(`SELECT materials.id, materials.name, materials.description,materials.category, materials.brand, materials.re_order_level, 
  SUM(probatches.qty) as sum FROM materials,probatches 
  WHERE materials.id = probatches.materialId 
  GROUP BY probatches.materialId`)

  let filterArr = amount[0]
  filterArr = filterArr.filter(item => item.sum < 1) 
  outOfStock = [...outOfStock, ...filterArr]
  let inStock = materials.filter(item => item.qty > 0)
  inStock = inStock.filter(item => item.materialId !== null)

  if(req.query.stock ==='in') {
    res.status(200).json(inStock)
  }else{
    res.status(200).json(outOfStock)
  }
  
  
})


// @desc  Material details
// @route GET /api/Material/:id
// @access Private
const getSingleMaterial = asyncHandler(async (req, res) => {
  const material = await Material.findByPk(req.params.id)

  if (material) {
    res.status(200).json(material)
  } else {
    res.status(404)
    throw new Error('Material not found')
  }
})

//@desc remove Material
// @route DELETE /api/Material/:id
// @access Private
const removeMaterial = asyncHandler(async (req, res) => {
  const material = await Material.findByPk(req.params.id)

  if (material) {
    await material.destroy() // Would just set the `deletedAt` flag
    await material.destroy({ force: true }) // Would really delete the record
    res.status(200).json('Successfully deleted!')
  } else {
    res.status(404)
    throw new Error('material not found')
  }
})

//@desc update prouduct
// @route DELETE /api/material/:id
// @access Private
const updateMaterial = asyncHandler(async (req, res) => {
  console.log('dddd')
  const propertyNames = Object.entries(req.body)
  let filteredObject = propertyNames.filter((item) => item[1] !== '')
  filteredObject = Object.fromEntries(filteredObject)

  const material = await Material.findByPk(req.params.id)

  if (material) {
    material.set(filteredObject)

    await material.save()

    res.status(200).json(material)
  } else {
    res.status(404)
    throw new Error('material not found')
  }
})

export {
  getAllMaterials,
  createMaterial,
  getSingleMaterial,
  removeMaterial,
  updateMaterial,
}
