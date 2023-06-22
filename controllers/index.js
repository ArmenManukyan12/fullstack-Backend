const Sequelize = require('sequelize');
const DataTypes = require('sequelize');
const sequelize = new Sequelize('mydb',null,null,{dialect:'sqlite',storage:'database.db'});
const Product = require('../models/product')(sequelize, DataTypes);
const Users = require('../models/user')(sequelize, DataTypes);
module.exports = {Users,Product}