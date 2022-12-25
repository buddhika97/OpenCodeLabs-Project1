import asyncHandler from 'express-async-handler'
import { v4 as uuidv4 } from 'uuid'
import Customer from '../models/customerModel.js'
import User from '../models/userModel.js'

// @desc create a customer
// @route POST / api/customer

const createCustomer = asyncHandler(async (req, res) => {
  let cusId = uuidv4()
  let customer = req.body
  customer.id = cusId
  const result = await Customer.create(customer)
  res.status(201).json(result)
})

// @desc  list all customers
// @route GET /api/customer
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  const customers = await Customer.findAll({})
  console.log('users')
  res.status(200).json(customers)
})

// @desc  customer details
// @route GET /api/customer/:id
// @access Private
const getSingleCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findByPk(req.params.id)

  if (customer) {
    res.status(200).json(customer)
  } else {
    res.status(404)
    throw new Error('Customer not found')
  }
})

//@desc remove customer
// @route DELETE /api/customer/:id
// @access Private
const removeCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findByPk(req.params.id)

  if (customer) {
    await customer.destroy() // Would just set the `deletedAt` flag
    await customer.destroy({ force: true }) // Would really delete the record
    res.status(200).json('Successfully deleted!')
  } else {
    res.status(404)
    throw new Error('Customer not found')
  }
})

//@desc update customer
// @route DELETE /api/customer/:id
// @access Private
const updateCustomer = asyncHandler(async (req, res) => {
 
  const propertyNames = Object.entries(req.body);
  let filteredObject = propertyNames.filter((item) => item[1] !== '')
  filteredObject = Object.fromEntries(filteredObject)
  
  const customer = await Customer.findByPk(req.params.id)
 

  if (customer) {
    customer.set(filteredObject)

    await customer.save()

    res.status(200).json(customer)
  } else {
    res.status(404)
    throw new Error('Customer not found')
  }
})


// @desc  list customer count
// @route GET /api/customer/count
// @access Private
const totalCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.count({})
  console.log('users')
  res.status(200).json(customers)
})



export {
  getAllUsers,
  createCustomer,
  getSingleCustomer,
  removeCustomer,
  updateCustomer,
  totalCustomers
}
