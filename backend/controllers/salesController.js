import asyncHandler from 'express-async-handler'
import { v4 as uuidv4 } from 'uuid'
import ProBatch from '../models/productBatchModel.js'
import Product from '../models/productsModel.js'
import db from '../config/db.js'
import Sales from '../models/salesModel.js'
import SaleItems from '../models/salesItemModel.js'

// @desc create a Sale
// @route POST / api/sales
// @access Private
const createSale = asyncHandler(async (req, res) => {
  if (req.body.SalesItems) {
    for (let i = 0; i < req.body.SalesItems.length; i++) {
      const batch = await ProBatch.findByPk(req.body.SalesItems[i].id)
      if (batch.qty < req.body.SalesItems[i].qty) {
        res.status(500)
        throw new Error('Please Reset Your cart and try again')
      }
    }
  }

  const sale = {
    id: uuidv4(),
    customer: req.body.customer,
    total: req.body.cartTotal,
    discount: req.body.discount,
    subTotal: Number(req.body.cartTotal) - Number(req.body.discount),
  }

  if (req.body.SalesItems) {
    const saleResult = await Sales.create(sale)
    if (saleResult) {
      for (let i = 0; i < req.body.SalesItems.length; i++) {
        const batch = await ProBatch.findByPk(req.body.SalesItems[i].id)

        batch.set({
          qty: Number(batch.qty) - Number(req.body.SalesItems[i].qty),
        })

        await batch.save()

        const salesItem = {
          id: uuidv4(),
          saleId: saleResult.id,
          productId: req.body.SalesItems[i].productId,
          productName: req.body.SalesItems[i].product.name,
          quantity: req.body.SalesItems[i].qty,
          costPrice: req.body.SalesItems[i].costPrice,
          price: req.body.SalesItems[i].salesPrice,
        }

        await SaleItems.create(salesItem)
      }
    }
    res.status(201).json('Success!')
  } else {
    res.status(500)
    throw new Error('Something went Wrong')
  }
})

// @desc  list all Sales
// @route GET /api/sales
// @access Private
const listSales = asyncHandler(async (req, res) => {
  const sales = await Sales.findAll()
  res.status(200).json(sales)
})


// @desc  list latest 10 sales
// @route GET /api/latest
// @access Private
const latestSales = asyncHandler(async (req, res) => {
 const sales =  await Sales.findAll({
    limit: 10,
    order: [['createdAt', 'DESC']]
  });

  res.status(200).json(sales)
})

// @desc  list all Sales by item
// @route GET /api/sales/items
// @access Private
const listSalesbyItem = asyncHandler(async (req, res) => {
  const sales = await SaleItems.findAll()
  res.status(200).json(sales)
})


// @desc  total of sales
// @route GET /api/sales/total
// @access Private
const totalSales = asyncHandler(async (req, res) => {
  const sales = await db.query(`SELECT SUM(subTotal) as totalSales
  FROM sales`)
  res.status(200).json(sales[0][0])
})


export { createSale, listSales, listSalesbyItem,latestSales,totalSales }
