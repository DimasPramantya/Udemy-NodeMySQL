const Sequelize = require('sequelize');

const sequelize = require('../utils/db');

const Order = sequelize.define('order',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    }
})

module.exports = Order;