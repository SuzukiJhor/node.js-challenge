const { Sequelize } = require("sequelize")
const connection = require('../database')

const InfoUsuario = connection.define('info', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    contaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    saldo: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
    
});

InfoUsuario.sync({force: false})

module.exports = InfoUsuario
