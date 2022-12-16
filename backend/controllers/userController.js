import asyncHandler from 'express-async-handler'
import generateToken from '../Utils/generateToken.js'

import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'

// @desc  Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  console.log(req.body)
  let { email, password } = req.body

  const user = await User.findOne({ where: { email: email } })

  const bcryptPW = user.password

  if (await bcrypt.compare(password, bcryptPW)) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type,
      token: generateToken(user.id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc  Register a new User
// @route POST /api/users/
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  let { name, email, password } = req.body

  let userID = uuidv4()

  const salt = await bcrypt.genSalt(10)

  password = await bcrypt.hash(password, salt)
  
  const user = await User.create({
    id: userID,
    name: name,
    email: email,
    password:password,
  })

  res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    type: user.type,
    token: generateToken(user.id),
  })
})

// @desc  list all users
// @route GET /api/users/
// @access private

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'email', 'name', 'type', 'email', 'age', 'phone', 'address'],
  })

  res.status(200).json(users)
})


// @desc  customer details
// @route GET /api/users/:id
// @access private

const getSingleUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id)

  if (user) {
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
      phone: user.phone,
      type: user.type,
      address: user.address,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc  updateUser
// @route PUT /api/users/:id
// @access private

const updateUser = asyncHandler(async (req, res) => {
 
  const user = await User.findByPk(req.params.id)

  if (user) {
    user.set({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      phone: req.body.phone,
      type: req.body.type,
      address: req.body.address,
    })
    const salt = await bcrypt.genSalt(10)

    if (req.body.password) {
      user.set({
        password: await bcrypt.hash(req.body.password, salt),
      })
    }

    await user.save()

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
      phone: user.phone,
      type: user.type,
      address: user.address,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export { authUser, registerUser, getUsers, updateUser, getSingleUser }
