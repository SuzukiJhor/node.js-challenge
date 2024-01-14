const { Sequelize } = require("sequelize")
const connection = require('../database')

const UserAccount = connection.define('usuarioConta', {
 
    contaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    value: {
        type: Sequelize.FLOAT,
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
    
});

UserAccount.sync({force: false})

module.exports = UserAccount
