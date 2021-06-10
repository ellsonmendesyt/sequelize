const Sequelize = require('sequelize');
const sequelize = new Sequelize('meubanco', 'root', '', {host:'localhost', dialect:'sqlite', storage:'./meubanco.sqlite'});
module.exports=sequelize;
global.sequelize=sequelize;

