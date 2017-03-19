'use strict';

const Promise = require("bluebird"),
    bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

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

      },
      validPassword: function(password, passwd){
				return bcrypt.compareAsync(password, passwd ).then(isMatch => {
          return isMatch
        }
        ).catch(console.error)
			}
    },
    instanceMethods: {
      toJSON: function(){
        return { id: this.id,
                 first_name: this.first_name,
                 last_name: this.last_name,
                 email:this.email,
                 token: this.token,
                 is_admin: this.is_admin
               }
      },
      generateToken: function() {
        // This is a while loop with promises
        // generates a token, checks to see if token already exists in db
        // if already exists, loop
        // else assign token to 'this' user which we call 'that'
        const that = this;

        const Promise = require('bluebird');

        const promiseWhile = function(condition, action) {
            var resolver = Promise.defer();

            var loop = function() {
                condition().then(res=>{
                  if(!res){
                    return resolver.resolve();
                  }
                  return Promise.cast(action())
                      .then(loop)
                      .catch(resolver.reject);
                })
            };

            process.nextTick(loop);

            return resolver.promise;
        };

        promiseWhile(function() {
            // Condition for stopping
            return bcrypt
              .genSaltAsync(SALT_WORK_FACTOR)
              .then((salt)=> {
                 return bcrypt.hashAsync(Math.random(), salt, null);
              })
              .then((hash)=> {
                 return Promise.all([hash, User.find({where: {token: hash}})])
                          .then(([hash,r])=>{
                            if(r==null){
                              that.token = hash;

                              that.save();
                              return false;
                            }
                            return true;
                          });
              })
        }, function() {
        });
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
  User.beforeCreate((user,options,done)=>{
    bcrypt.genSaltAsync(SALT_WORK_FACTOR)
             .then((salt)=> {
               return bcrypt.hashAsync(user.password, salt, null);
             })
             .then((hash)=> {
               user.password = hash;
               return done(null,user);
             })
             .catch(console.error);
  });
  return User;
};
