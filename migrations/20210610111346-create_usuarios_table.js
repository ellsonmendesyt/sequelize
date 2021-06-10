'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('usuarios', {
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
    },
    createdAt:Sequelize.DATE,
    updatedAt:Sequelize.DATE,
    })
  },

  down: async (queryInterface, Sequelize) => {
     return queryInterface.dropTable('usuarios');
  }
};
