import mysql from 'mysql2'
import dotenv from 'dotenv'
// import { v4 as uuidv4 } from 'uuid';

dotenv.config()

export const db = await mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
})

db.connect((err) => {
  if (err) {
    console.error(`Error: ${err}`.red.underline.bold);
    process.exit(1);
  }
  console.log(`MYSQL Connected: ${process.env.HOST}`.cyan.underline);
})



// const sql = `CREATE DATABASE  IF NOT EXISTS ${process.env.DATABASE}`
// db.query(sql, (err) => {
//     console.error(`Error: ${err}`.red.underline.bold);
//     process.exit(1);
// })
// console.log(`Database Created: ${process.env.DATABASE}`.cyan.underline)