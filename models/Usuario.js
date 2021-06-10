const Sequelize = require('sequelize');
module.exports=sequelize.define(
    'Usuario',{

   id:{
    type:Sequelize.INTEGER(11),
    allowNull:false,
    autoIncrement:true,
    primaryKey:true,
   },
   nome:{
       type:Sequelize.STRING,
       allowNull:false,
   },
   email:{
    type:Sequelize.STRING,
    allowNull:false,
    unique:true,
},
senha:{
    type:Sequelize.STRING,
    allowNull:false,
}
});