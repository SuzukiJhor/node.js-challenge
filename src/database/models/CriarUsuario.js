const Sequelize = require('sequelize')
const database = require('./database')

const criarUsuario = database.define('createAccount', {
    nome: {
        type: Sequelize.STRING,
        allownull: false
    },
    sobrenome: {
        type: Sequelize.STRING,
        allownull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allownull: false
    },
    cnpj: {
        type: Sequelize.STRING,
        allownull: false
    },
    email: {
        type: Sequelize.STRING,
        allownull: false
    },
    senha: {
        type: Sequelize.STRING,
        allownull: false
    }

})