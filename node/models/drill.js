'use strict';
module.exports = function(sequelize, DataTypes) {
  var Drill = sequelize.define('Drill', {
    exercise: DataTypes.TEXT,
    DrillGroupId: DataTypes.INTEGER,
    points: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Drill.belongsTo(models.DrillGroup);
        Drill.hasMany(models.Solution);
      }
    },
    instanceMethods: {
      toJSON: function(){
        return {
          id: this.id,
          exercise: this.exercise,
          points: this.points
        }
      }
    }
  });
  return Drill;
};
