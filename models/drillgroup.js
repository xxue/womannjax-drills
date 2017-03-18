'use strict';
module.exports = function(sequelize, DataTypes) {
  var DrillGroup = sequelize.define('DrillGroup', {
    name:  {
              type: DataTypes.STRING,
              unique: true
            },
    description: DataTypes.TEXT,
    level: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        DrillGroup.hasMany(models.Drill);
        DrillGroup.hasMany(models.MyDrills);
        DrillGroup.belongsToMany(models.User, {through: 'MyDrills'});
      }
    }
  });
  return DrillGroup;
};
