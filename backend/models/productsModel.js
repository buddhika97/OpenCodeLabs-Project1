import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const Product = db.define('products', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    description: {
        type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING
    },
    brand: {
      type: DataTypes.STRING
    },
    qty: {
      type: DataTypes.FLOAT
    },
    re_order_level: {
      type: DataTypes.FLOAT
    },
    discountPrice: {
      type: DataTypes.FLOAT
    },

  });

  db.sync()
export default Product

