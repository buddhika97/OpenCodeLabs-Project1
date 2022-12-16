import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const User = db.define('users', {
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
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  type: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
  },
})

db.sync().then(() => {
   console.log('Users table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

// try {
//   await db.sync()
//   console.log('Users table created successfully!')
// } catch (error) {
//   console.error('Unable to create table : ', error)
// }

export default User
