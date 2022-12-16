import { DataTypes } from 'sequelize'
import db from '../config/db.js'
import Product from './productsModel.js'

const ProBatch = db.define('ProBatches', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  qty: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  costPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  salesPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
})

db.sync()

export default ProBatch
