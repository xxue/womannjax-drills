var express = require('express');
var router = express.Router();

const { User } = require('../models/index');

// users#index TODO: FOR ADMIN
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// users#create
// sign up user/ create the user in db
router.post('/', function(req, res, next) {
  const { first_name, last_name, email, password, passwordConfirmation } = req.body;
  if (email == ""){
    res.send(JSON.stringify(Object.assign({},{
      path: '/users/new',
      errors: ['Email can\'t be empty']
    })));
  } else if (password != passwordConfirmation){
    res.send(JSON.stringify(Object.assign({},{
      path: '/users/new',
      errors: ['Error: Passwords do not match']
    })));
  } else {
      User
        .create({ first_name, last_name, email, password })
        .then(user=>{
            res.send(JSON.stringify(Object.assign({},{
              path: '/account-pending',
              user: user.toJSON()
            })));
          })
          .catch(err=>{
            res.send(JSON.stringify(Object.assign({},{
              path: '/users/new',
              errors: ['Error: Email already exists']
            })));
          })
  }
});


module.exports = router;
