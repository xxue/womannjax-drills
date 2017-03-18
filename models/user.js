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
    is_verified: {
                  type: DataTypes.BOOLEAN,
                  defaultValue: false
                },
    is_admin: {
                  type: DataTypes.BOOLEAN,
                  defaultValue: false
                }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
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
