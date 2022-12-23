import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const BluePrint = db.define('BluePrints', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  resources: {
    type: DataTypes.STRING,
  },

  productName: {
    type: DataTypes.STRING,
  },

  
  productId: {
    type: DataTypes.UUID,
    unique: true,
    references: {
      model: 'products', // name of the referenced model
      key: 'id', // name of the foreign key column in the Profile model
    },
  },
})

db.sync()

export default BluePrint
