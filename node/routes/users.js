var express = require('express');
var router = express.Router();

const { User, MyDrills, DrillGroup } = require('../models/index');

// users#index TODO: FOR ADMIN
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Users#create
// sign up user/ create the user in db
router.post('/', function(req, res, next) {
  const { first_name, last_name, email, password, passwordConfirmation } = req.body;
  console.log(req);

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
            // console.log('user: ', user)
            res.send(JSON.stringify(Object.assign({},{
              path: '/account-pending',
              user: user.toJSON()
            })));
          })
          .catch(err=>{
            // console.log('error: ',err)
            res.send(JSON.stringify(Object.assign({},{
              path: '/users/new',
              errors: ['Error: Email already exists']
            })));
            // console.log(err);
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



//////// MyDrills Routes ///////////

// MyDrills#index
// PATH: /users/:userId/drill-groups/
router.get('/:userId/drill-groups/', function (req, res, next) {
  const {userId} = req.params;
  let myDrillsCollection = [];
  let drillGroupIds = [];

  MyDrills
    .findAll({
        where: {
                  UserId: userId,
               }
    })
    .then(myDrills => {
      myDrillsCollection = myDrills;

      myDrills.forEach( (mydrill) => { drillGroupIds.push(mydrill.DrillGroupId) })
    })
    .then(() => {
      console.log(drillGroupIds);
      res.send({});
    })
    // .then(myDrills => {
    //   res.send(JSON.stringify(
    //     {
    //       UserId: userId,
    //       DrillGroupId: drillGroupId,
    //       attempts: myDrills[0].attempts,
    //       score: myDrills[0].score,
    //       drillsVisible: myDrills[0].drillsVisible
    //   }));
    // })
    .catch(err => next(err))
});


// MyDrills#show
// PATH: /user/:userId/drill-group/:drillGroupId/
router.get('/:userId/drill-groups/:drillGroupId/', function (req, res, next) {
  const {userId, drillGroupId}            = req.params;

  MyDrills
    .findAll({
        where: {
                  UserId: userId,
                  DrillGroupId: drillGroupId
               }
    })
    .then(myDrills => {
      console.log(myDrills);
      res.send(JSON.stringify(
        {
          UserId: userId,
          DrillGroupId: drillGroupId,
          attempts: myDrills[0].attempts,
          score: myDrills[0].score,
          drillsVisible: myDrills[0].drillsVisible
      }));
    })
    .catch(err => next(err))
});


// MyDrills#create
// PATH: /user/:userId/drill-group/:drillGroupId/
router.post('/:userId/drill-groups/:drillGroupId/', function (req, res, next) {
  const {userId, drillGroupId}            = req.params;
  const {attempts, score, drillsVisible}  = req.body;

  MyDrills
    .create({
        UserId: userId,
        DrillGroupId: drillGroupId,
        attempts, score, drillsVisible
      })
    .then(myDrills => {
      res.send(JSON.stringify(
        {
          UserId: userId,
          DrillGroupId: drillGroupId,
          attempts: attempts,
          score: score,
          drillsVisible: drillsVisible
      }));
    })
    .catch(err => next(err))
});















module.exports = router;
