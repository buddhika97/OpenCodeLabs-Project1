
import asyncHandler from 'express-async-handler'
import generateToken from '../Utils/generateToken.js'
import colors from 'colors'
import mysql from 'mysql'
import{ db} from '../config/db.js'

import { v4 as uuidv4 } from 'uuid'

import bcrypt from 'bcryptjs'

// @desc  Auth user & get token
// @route POST /api/users/login
// @access Public

const authUser = asyncHandler( async (req, res) => {

    let {email, password} =  req.body


    const sql = "SELECT * FROM user WHERE email= ? "


    db.query(sql, [email], async (err, data) => {
        let user = ''
        if (err) return res.send(err)
        user = data[0].password

       if(await bcrypt.compare(password, user)) {
        let response = data[0]
        delete response.password

        res.json(response)
       }
      });

})

// @desc  Register a new User
// @route POST /api/users/
// @access Public

const registerUser = asyncHandler( async (req, res) => {
   
  console.log(req.body)

    let {name, email , password} =  req.body

    const sql = "INSERT INTO user(`id`, `name`, `email`, `password`, `token`) VALUES (?)";

    let userID =  uuidv4()
        
        const salt = await bcrypt.genSalt(10)
        password = await bcrypt.hash(password, salt)
    
      const values = [
        userID,
        name,
        email,
        password,
        generateToken(userID)
      ];
    
      db.query(sql, [values], (err, data) => {
        if (err){
          return res.status(500).json(err);
        }
        const response = {
            id : values[0],
            name: values[1],
            email: values[2],
            token: values[4]
        }
        return res.json(response);
      });

})

export { authUser, registerUser} 