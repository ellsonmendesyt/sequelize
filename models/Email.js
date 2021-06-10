const Sequelize = require('sequelize');
module.exports=sequelize.define(
    'Email',{

   id:{
    type:Sequelize.INTEGER(11),
    allowNull:false,
    autoIncrement:true,
    primaryKey:true,
   },
   remetente:{
       type:Sequelize.STRING,
       allowNull:false,
   },
   destinatario:{
    type:Sequelize.STRING,
    allowNull:false,
},
mensagem:{
    type:Sequelize.TEXT,
    allowNull:false,
}
});