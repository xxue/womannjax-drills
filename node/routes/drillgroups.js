const express = require('express');
const router = express.Router();
// to load all models with sequelize, require
// the index.js file in the models folder
// const models = require('../models/index');
// models.DrillGroup ð gets DrillGroup model object
const {DrillGroup, Drill, Solution} = require('../models/index');

// Drills#create
// PATH /drill-groups/:drillgroupId/drills METHOD: post
router.post('/:drillgroupId/drills', function (req, res, next) {

  const {is_admin} = req.user
  console.log("creating a drill")
  if (is_admin) {
    const {drillgroupId} = req.params;
    const {exercise, points,solutions} = req.body;
    let jsonResponse = {};
    let drillId;
    let solutionsArray = [];

    Drill
    .create({exercise, points, DrillGroupId: drillgroupId})
    .then((drill) => {
      drillId = drill.id;

      //Create solution array with DrillId appended for bulk record creation
      for(solution of solutions) {
        solutionsArray.push( Object.assign( {},
            {
              DrillId: drillId,
              body: solution.body
            }
        ));
      }

      Object.assign(jsonResponse,
        {
          exercise: exercise,
          points: points,
          DrillGroupId: drillgroupId,
          solutions: solutions
        }
      );
    })
    .then( () => Solution.bulkCreate(solutionsArray) )
    .then( () => res.send(JSON.stringify(jsonResponse)))
    .catch(err => next(err));
  } else {
    // function defined at bottom
    adminError(res);
  }
});

// DrillGroup#create
// PATH: /drillgroups/
router.post('/', function (req, res, next) {

  // check if we received body params from form post
  // res.send(req.body)
  const {is_admin} = req.user
  if(is_admin){
    // We destructure form fields for our DrillGroup from the req.body
    // title..etc map to the name (i.e. html attribute name) of
    // the respective fields in our new DrillGroup form
   const {name, description, level} = req.body;
    // All Sequelize models have a .create method that takes an object
    // that represent the attributes of the model instance to be created
  DrillGroup
    .create({name, description, level})
    .then(drillGroup => {
      res.send(JSON.stringify(
        { id: drillGroup.id,
          name: name,
          description: description,
          level: level,
          drills: []
      }));
    })
    // next is a function passed to this callback that will
    // make the next middleware handle the request
    .catch(err => next(err))
  } else {
    adminError(res);
  }

});

// DrillGroups#index
// PATH: /drillgroups
router.get('/', function(req, res, next) {
  // the .findAll method (available on models)
  // returns a Promise that resolves to a collection of all instances of the
  // the model
  // it can take an object as argument to configure the results
  // Here we use order to sort all drillgroups by its createdAt column in descending order
  // then its updatedAt column in descending order
  const {token} = req.user

  if(token != null){
    DrillGroup
    .findAll({order: [['createdAt', 'DESC'], ['updatedAt', 'DESC']]})
    .then(
      drillgroups => {
        res.send(JSON.stringify(drillgroups));
      }
    )
    .catch(err => next(err))
  } else {
    adminError(res);
  }
});

// DrillGroups#show
// PATH: /drillgroups/:id/
router.get('/:id', function(req, res, next) {
  const {token} = req.user;
    console.log("Aldo")
  if (token !=null) {
    const {id} = req.params;
        console.log("Aldo")
    // .findById is an asynchronous method that queri
    // es the database which
    // means that it returns a promise. To the get the resolved value of the promise,
    // we use its .then method and pass it a callback
    DrillGroup
    .findById(id)
    .then(drillgroup => Promise.all([drillgroup, drillgroup.getDrills({order: [['updatedAt', 'DESC']]})]))
    .then(
       ([drillgroup, drills]) => res.send(JSON.stringify(Object.assign({},
                   drillgroup.toJSON(), {drills:drills})))
    )


    .catch(
      // The next function is a parameter passed to the callback function this is
      // part of. Calling it will tell express to move on to the next middleware
      // which are error handlers (in this case)
      // ð in this situation, we let the error handlers display the error message
      err => next(err)
    )
  } else {
    adminError(res);
  }
});

// DrillGroups#edit
// PATH /drillgroups/:id/edit METHOD: get
router.get('/:id/edit', function (req, res, next) {
  const {id} = req.params;
  const {is_admin} = req.user

  if (is_admin) {
    DrillGroup
    .findById(id)
    .then(drillgroup => Promise.all([drillgroup, drillgroup.getDrills({order: [['updatedAt', 'DESC']]})]))
    .then(drillgroup => res.send( JSON.stringify(
      {
        name: drillgroup.name,
        description: drillgroup.description,
        level: drillgroup.level
      })))

    .catch(err => next(err))
  } else {
    adminError(res);
  }

})

// DrillGroup#update
// PATH /drillgroups/:id Method: patch
router.put('/:id', function (req, res, next) {
  const {is_admin} = req.user

  if (is_admin) {
    const {id} = req.params;
    const {name, description, level} = req.body;

    DrillGroup
    .findById(id)

    .then(drillgroup => drillgroup.update({name, description, level}))
    .then(drillgroup => res.send( JSON.stringify(
      {
        id: drillgroup.id,
        name: drillgroup.name,
        description: drillgroup.description,
        level: drillgroup.level
      })))
    .catch(err => next(err))
  } else {
    adminError(res)
  }
})

// DrillGroups#destroy
// PATH /drill-groups/:id METHOD: delete

router.delete('/:id', function(req, res, next) {
  const {is_admin} = req.user

  if (is_admin) {
    const {id} = req.params;
    console.log('hi Aldo')
    DrillGroup
    .findById(id)
    .then(drillgroup  => drillgroup.destroy())
    .then(() => res.send(JSON.stringify({drillgroup: 'DrillGroup Deleted!'})))
    .catch(err => next(err))
  } else {
    adminError(res)
  }
});

// before action functions

function adminError(res) {
  return res.send(JSON.stringify({error: "You can't tho"}))
}

module.exports = router;
