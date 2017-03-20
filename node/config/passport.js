var passport = require('passport')
  , { Strategy:LocalStrategy } = require('passport-local')
  , db = require('../models/index')

// Serialize Sessions
passport.serializeUser(function(user, done){
	done(null, user);
});

//Deserialize Sessions
passport.deserializeUser(function(user, done){
	db.User.find({where: {id: user.id}}).then(function(user){
		done(null, user);
	}).catch(function(err){
		done(err, null)
	});
});

// For Authentication Purposes
passport.use(new LocalStrategy(
	function(email, password, done){
    console.log('username ', email);
		db.User.findOne({where: {email: email}})
      .then((user) => {
        console.log(user)
        if(!user) return done(null, false);
        return Promise.all([user,db.User.validPassword(password, user.password)])
      })
      .then(([user,isMatch]) => {
        console.log('\n\n\n\n----isMatch----\n\n',isMatch);
          if (!isMatch) {
            return done(null, false)
          } else {
            return done(null,user)
          }
        })
      .catch((err)=> {return done(err);})
	}
));

module.exports = passport
