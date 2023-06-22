'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      {
        name:"six",
        image:"http",
        description:"e",
        price:1000,
        categoryId:1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, 
      // {
      //   name:"second",
      //   image:"http",
      //   description:"bbb",
      //   price:1000,
      //   categoryId:2,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      
     
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
