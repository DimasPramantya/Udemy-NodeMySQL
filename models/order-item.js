const Sequelize = require('sequelize');

const sequelize = require('../utils/db');

const OrderItem = sequelize.define('orderItem',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    prodQuantity:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = OrderItem;