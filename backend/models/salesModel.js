import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const Sales = db.define('sales', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  customer: {
    type: DataTypes.STRING,
  },
  total:{
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  discount:{
    type: DataTypes.FLOAT,
  },
  subTotal:{
    type: DataTypes.FLOAT,
    allowNull: false,
  }

})

db.sync()

export default Sales

