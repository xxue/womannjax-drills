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

router.get('/:id/drill-groups', function(req,res,next){
  res.send(JSON.stringify({
                  myDrillGroups: [{
                    id: 1,
                    name:'Rails Routes',
                    attempts: 4,
                    score: 70.0
                  },
                    {
                      id: 12,
                      name: 'Javascript Objects',
                    attempts: 15,
                    score: 5.0
                  }
                  ],
                  allDrillGroups:
                    [
                      {id:2,
                        name: "Javascipt Arrays"},
                      {id:5,
                        name: "Javascipt Functions"}
                    ]
                  }));
})

router.post('/:id/drill-groups', function(req,res,next){
  res.send(JSON.stringify({
                    id: 1,
                    name:'Rails Routes',
                    attempts: 4,
                    score: 70.0
                  }));
})



module.exports = router;
