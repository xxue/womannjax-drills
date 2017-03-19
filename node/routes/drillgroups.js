const express = require('express');
const router = express.Router();
// to load all models with sequelize, require
// the index.js file in the models folder
// const models = require('../models/index');
// models.DrillGroup ð gets DrillGroup model object

const {DrillGroup, Drill} = require('../models/index');

// DrillGroups#new
// PATH: /drillgroups/new
router.get('/new', function (req, res, next) {
  res.send(JSON.stringify(
    {
      drillgroup: DrillGroup.build({name: '', description:'', level:''})
    }));
});

// Drills#create
// PATH /drillgroups/:drillgroupId/drills METHOD: post
router.post('/:drillgroupId/drills', function (req, res, next) {
  const {drillgroupId} = req.params;
  const {exercise, points} = req.body;

  Drill
    .create({exercise, points, DrillGroupId: drillgroupId})
    .then((drill) => res.send(JSON.stringify(
        {
          id: drill.id
        }
    )))
    .catch(err => next(err));
});

// DrillGroup#create
// PATH: /drillgroups/
router.post('/', function (req, res, next) {
  // check if we received body params from form post
  // res.send(req.body)

  // We destructure form fields for our DrillGroup from the req.body
  // title..etc map to the name (i.e. html attribute name) of
  // the respective fields in our new DrillGroup form
  const {title, description, price} = req.body;

  // All Sequelize models have a .create method that takes an object
  // that represent the attributes of the model instance to be created
  DrillGroup
    .create({title, description, price})
    .then(drillgroup => {
      // req.flash('notice', `DrillGroups #${drillgroup.id} created!`);
      res.redirect(`/drillgroups/${drillgroup.id}`);
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
        res.render('drillgroups/index', {drillgroups})
      }
    )
});

// DrillGroups#show
// PATH: /drillgroups/:id/
router.get('/:id', function(req, res, next) {
  const {id} = req.params;

  // .findById is an asynchronous method that queries the database which
  // means that it returns a promise. To the get the resolved value of the promise,
  // we use its .then method and pass it a callback
  DrillGroup
    .findById(id)
    // promises can only resolve one value
    // to resolve "multiple values" we wrap them in an array
    // If any of the values in our array is a promise, we need to resolve them
    // use Promise.all to do so. It will resolve an array with the resolved values
    // of elements of the array.
    .then(drillgroup => Promise.all([drillgroup, drillgroup.getDrills({order: [['updatedAt', 'DESC']]})]))
    .then(
      ([drillgroup, drills]) => res.render('drillgroups/show', {drillgroup, drills})
    )
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
    .then(drillgroup => res.render('drillgroups/edit', {drillgroup}))
    .catch(err => next(err))
})

// DrillGroup#update
// PATH /drillgroups/:id Method: patch
router.patch('/:id', function (req, res, next) {
  const {id} = req.params;
  const {title, description, price} = req.body;

  DrillGroup
    .findById(id)
    .then(drillgroup => drillgroup.update({title, description, price}))
    .then(() => res.redirect(`/drillgroups/${id}`))
    .catch(err => next(err))
})

// DrillGroups#destroy
// PATH /drill s/:id METHOD: delete
router.delete('/:id', function(req, res, next) {
  const {id} = req.params;

  DrillGroup
    .findById(id)
    .then(drillgroup  => drillgroup.destroy())
    .then(() => res.redirect(`/drillgroups/`))
    .catch(err => next(err))
});


module.exports = router;
