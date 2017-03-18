'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
              type: DataTypes.STRING,
              unique: true
            },
    password: DataTypes.STRING,
    token: {
                  type: DataTypes.STRING,
                  defaultValue: null
                },
    is_admin: {
                  type: DataTypes.BOOLEAN,
                  defaultValue: false
                }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.MyDrills);
        User.belongsToMany(models.DrillGroup, {through: 'MyDrills'});

      }
    },
    indexes: [
      // Create a unique index on email
      {
        unique: true,
        fields: ['email']
      }
    ]
  });
  return User;
};
