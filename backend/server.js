import path from 'path'
import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import customerRoutes from './routes/customerRoutes.js'
import ProductRoutes from './routes/productRoutes.js'
import ProductBatchRoutes from './routes/productBatchRoutes.js'
import RmRoutes from './routes/rmRoutes.js'
import blueprintRoutes from './routes/bluePrintRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import salesRoutes from './routes/salesRoute.js'

import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import db from './config/db.js'

dotenv.config()



const app = express()

try {
  await db.authenticate();
  console.log('Connection has been established successfully.'.cyan.underline);
} catch (error) {
  console.error('Unable to connect to the database:', error);
}



if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//parse req.body GET/POST
app.use(express.json())

//we dont access __dirname when working with ES modules, it only available for common js modules, so path.resolve is used to mimic the __driname
const __dirname = path.resolve()

//making the uploads file static so browser can access it
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//routes
app.use('/api/users', userRoutes)
app.use('/api/customer', customerRoutes)
app.use('/api/product', ProductRoutes)
app.use('/api/probatch', ProductBatchRoutes)
app.use('/api/material', RmRoutes)
app.use('/api/blueprint', blueprintRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/sales', salesRoutes)


 // after building react application giviing the access to react build version
 if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  // Set up a route to serve the index.html file for all other routes
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  // Set up a route to send a message when the root URL is accessed
  app.get('/', (req, res) => {
    res.send('api is running!')
  })
}

//error handling
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
)
