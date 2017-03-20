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
                    id: 24,
                    name:'This is the newest one',
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


  // const {userId} = req.params;
  // let myDrillsCollection = [];
  // let drillGroupIds = [];
  // let drillGroupNames = [];
  // let responseCollection = [];
  //
  // MyDrills
  //   .findAll({
  //       where: {
  //                 UserId: userId,
  //              }
  //   })
  //   .then(myDrills => {
  //     myDrillsCollection = myDrills;
  //     myDrills.forEach( (mydrill) => { drillGroupIds.push(mydrill.DrillGroupId) })
  //   })
  //   .then(() => {
  //         // console.log(drillGroupIds);
  //         DrillGroup
  //         .findAll({
  //           where: {
  //             id: { $in: drillGroupIds }
  //           },
  //           attributes: ['name']
  //         })
  //         .then(
  //           drillgroups => {
  //             // console.log(drillgroups);
  //             drillGroupNames = drillgroups;
  //
  //             drillgroups.forEach( (group,i,arr) => {
  //               responseCollection.push(
  //                 Object.assign({}, {
  //                   name: drillGroupNames[i].name,
  //                   UserId: userId,
  //                   DrillGroupId: drillGroupIds[i],
  //                   attempts: myDrillsCollection[i].attempts,
  //                   score: myDrillsCollection[i].score,
  //                   drillsVisible: myDrillsCollection[i].drillsVisible
  //                 })
  //               );
  //             });
  //             console.log(responseCollection);
  //             res.send(JSON.stringify(responseCollection));
  //           }
  //         )
  //         .catch(err => next(err));
  //   })
  //   .catch(err => next(err))
});


// MyDrills#show
// PATH: /users/:userId/drill-group/:drillGroupId/
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
router.post('/:UserId/drill-groups/:DrillGroupId/', function (req, res, next) {
  const {token} = req.user
  const {UserId, DrillGroupId}            = req.params;
  mydrillExists(UserId,DrillGroupId)
  .then(drillExists=>{
    if(token != null && !drillExists){
      MyDrills
      .create({
        UserId,
        DrillGroupId,
        attempts: 0,
        score: 0,
        drillsVisible:true
      })
      .then(myDrills => {
        res.send(JSON.stringify({myDrill:"created"}))
        })
        .catch(err => next(err))
    } else {
      MyDrills
      .find({where:{UserId,DrillGroupId}})
      .then(mydrill => {
        mydrill.update({drillsVisible:true})
      })
      .then(response => res.send(JSON.stringify({drillGroup:"added"})))
      .catch(err => next(err))
    }
  });

  function mydrillExists(UserId,DrillGroupId) {
    return MyDrills
    .find({where:{UserId,DrillGroupId}})
    .then(response => {
      // console.log(response != null )
       return response != null
    })
}
});
















module.exports = router;
