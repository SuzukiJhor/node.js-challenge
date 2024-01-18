const { Sequelize } = require("sequelize")
const connection = require('../database')

const UserAccount = connection.define('usuarioConta', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         
            model: 'usuario',
            key: 'id'
          }
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
