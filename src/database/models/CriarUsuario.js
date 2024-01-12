const Sequelize = require('sequelize')
const database = require('../database')

const criarUsuario = database.define('UserController', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sobrenome: {
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
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }

})

criarUsuario.sync({force: false}).then(()=>{
    'tabela criada'
})

module.exports = criarUsuario