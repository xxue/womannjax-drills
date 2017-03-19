'use strict';
// load faker package
const faker = require('faker');

module.exports = {
  up: function (queryInterface, Sequelize) {
    const drillgroups = Array.from(
      {length: 10},
      (value, index) => ({
        name: faker.lorem.words(3),
        description: faker.lorem.sentence(),
        level: 'beginner',
        createdAt: new Date(),
        updatedAt: new Date()
      })
    );
      return queryInterface.bulkInsert('DrillGroups', drillgroups, {});
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
