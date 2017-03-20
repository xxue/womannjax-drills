'use strict';
module.exports = function(sequelize, DataTypes) {
  var Solution = sequelize.define('Solution', {
    DrillId: DataTypes.INTEGER,
    body: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Solution.belongsTo(models.Drill);
      }
    }
  });
  return Solution;
};
