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
  const { email, password } = req.body;
  console.log(email,password)
  User.create({email,password})
    .then((user)=>{
      console.log('created user');
      res.send(JSON.stringify(Object.assign({},{
        user: user,
        path: '/account-pending'
      })));
    })
    .catch(err=>{
      res.send(JSON.stringify(Object.assign({},{
        path: '/users/new'
      })));
    })
});

module.exports = router;
