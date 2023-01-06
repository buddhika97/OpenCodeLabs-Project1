import { Sequelize, DataTypes } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const db = new Sequelize(process.env.DB_STRING)

export default db
