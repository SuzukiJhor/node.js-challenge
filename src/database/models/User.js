const Sequelize = require('sequelize')
const database = require('../database')

const User = database.define('usuario', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cnpj: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    businessman: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }

})

User.sync({force: false}).then(()=>{
    'table created'
})

module.exports = User