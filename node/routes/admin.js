var express = require('express');
var router = express.Router();

const { User } = require('../models/index');

// users#index TODO: FOR ADMIN
router.get('/users', function(req, res, next) {
  const {is_admin} = req.user

  if(is_admin){
    User
    .findAll({where: {token: null}
  })
    .then(users => res.send(JSON.stringify((users))))
  } else {
    adminError(res)
  }
});

// users#create
// sign up user/ create the user in db
router.post('/users/:id', function(req, res, next) {
  const {is_admin,token} = req.user
  if (is_admin) {
    const {id} =
     req.params

    User
      .findById(id)
      .then(user => {
        console.log(user.token);
        user.update({token:user.generateToken()})
      })
      .then(response => {
        // console.log(response);
        res.send(JSON.stringify({user:"updated"}))
      })
      .catch(err => next(err))
  } else {
    adminError(res)
  }
});

function adminError(res) {
  return res.send(JSON.stringify({error: "You can't tho"}))
}


module.exports = router;
