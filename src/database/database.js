const Sequelize = require('sequelize')
const dotenv = require('dotenv').config()

const dbHost = process.env.DB_HOST
const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dialect = process.env.SEQUELIZE_DIALECT

const connection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dialect
})

module.exports = connection