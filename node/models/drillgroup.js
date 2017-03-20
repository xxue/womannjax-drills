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
    instanceMethods:{
      toJSON: function(){
        return {
                id: this.id,
                name: this.name,
                description: this.description,
                level: this.level
              }
      }
    },
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
