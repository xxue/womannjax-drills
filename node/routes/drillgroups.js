const express = require('express');
const router = express.Router();
// to load all models with sequelize, require
// the index.js file in the models folder
// const models = require('../models/index');
// models.DrillGroup ð gets DrillGroup model object

const {DrillGroup, Drill} = require('../models/index');

// Drills#create
// PATH /drillgroups/:drillgroupId/drills METHOD: post
router.post('/:drillgroupId/drills', function (req, res, next) {
  const {drillgroupId} = req.params;
  const {exercise, points} = req.body;

  Drill
    .create({exercise, points, DrillGroupId: drillgroupId})
    .then((drill) => res.send(JSON.stringify(
        {
          id: drill.id,
          exercise: exercise,
          points: points,
          DrillGroupId: drillgroupId
        }
    )))
    .catch(err => next(err));
});

// DrillGroup#create
// PATH: /drillgroups/
router.post('/', function (req, res, next) {
  const {name, description, level} = req.body;

  DrillGroup
    .create({name, description, level})
    .then(drillGroup => {
      res.send(JSON.stringify(
        {
          name: name,
          description: description,
          level: level
      }));
    })
    // next is a function passed to this callback that will
    // make the next middleware handle the request
    .catch(err => next(err))

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
  DrillGroup
    .findAll({order: [['createdAt', 'DESC'], ['updatedAt', 'DESC']]})
    .then(
      drillgroups => {
        res.send(JSON.stringify(
          {
            drillgroups
          }));
      }
    )
});

// DrillGroups#show
// PATH: /drillgroups/:id/
router.get('/:id', function(req, res, next) {
  const {id} = req.params;

  DrillGroup
    .findById(id)
    .then(drillgroup => Promise.all([drillgroup, drillgroup.getDrills({order: [['updatedAt', 'DESC']]})]))
    .then(
      ([drillgroup, drills]) =>  res.send(JSON.stringify( {drillgroup, drills})))
    .catch(
      // The next function is a parameter passed to the callback function this is
      // part of. Calling it will tell express to move on to the next middleware
      // which are error handlers (in this case)
      // ð in this situation, we let the error handlers display the error message
      err => next(err)
    )
});

// DrillGroups#edit
// PATH /drillgroups/:id/edit METHOD: get
router.get('/:id/edit', function (req, res, next) {
  const {id} = req.params;

  DrillGroup
    .findById(id)
    .then(drillgroup => res.send( JSON.stringify(
      {
        name: drillgroup.name,
        description: drillgroup.description,
        level: drillgroup.level
      })))
    .catch(err => next(err))
})

// DrillGroup#update
// PATH /drillgroups/:id Method: patch
router.patch('/:id', function (req, res, next) {
  const {id} = req.params;
  const {name, description, level} = req.body;

  DrillGroup
    .findById(id)
    .then(drillgroup => drillgroup.update({name, description, level}))
    .then(drillgroup => res.send( JSON.stringify(
      {
        name: drillgroup.name,
        description: drillgroup.description,
        level: drillgroup.level
      })))
    .catch(err => next(err))
})

// DrillGroups#destroy
// PATH /drillgroups/:id METHOD: delete
router.delete('/:id', function(req, res, next) {
  const {id} = req.params;

  DrillGroup
    .findById(id)
    .then(drillgroup  => drillgroup.destroy())
    .then(() => res.send(JSON.stringify({drillgroup: 'DrillGroup Deleted!'})))
    .catch(err => next(err))
});


module.exports = router;
