'use strict';
const faker = require('faker');

module.exports = {
  up: function (queryInterface, Sequelize) {
    const drills = Array.from(
      {length: 5},
      (value, index) => ({
        exercise: faker.lorem.words(3),
        DrillGroupId: 1,
        points: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    );
      return queryInterface.bulkInsert('Drills', drills, {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
