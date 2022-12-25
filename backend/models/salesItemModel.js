import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const SaleItems = db.define('saleItems', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  saleId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'sales',
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id'
    }
  },

  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  
  costPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  }

})

db.sync()

export default SaleItems

