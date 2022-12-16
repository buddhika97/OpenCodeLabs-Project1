import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const Customer = db.define('customers', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },
 
  phone: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },

  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  nic: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  }

})

db.sync()


// try {
//   await db.sync()
//   console.log('Users table created successfully!')
// } catch (error) {
//   console.error('Unable to create table : ', error)
// }

export default Customer
