const express = require('express');
const router = express.Router();
// to load all models with sequelize, require
// the index.js file in the models folder
// const models = require('../models/index');
// models.DrillGroup ð gets DrillGroup model object

const {DrillGroup, Drill, User} = require('../models/index');

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
  const {is_admin} = req.user
  console.log("creating a drill")
  if (is_admin) {
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
      // req.flash('notice', `DrillGroups #${drillgroup.id} created!`);
      res.send(JSON.stringify({
        path: `/drillgroups/${drillGroup.id}`,
        drillGroup: drillGroup
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
        const drillGroup = []
         drillgroups.forEach((dg) =>{
             drillGroup.push(dg.toJSON())
          })

        res.send(JSON.stringify(drillGroup))
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
  const {id} = req.params;
  const {token} = req.user;

  if (token !=null) {
    // .findById is an asynchronous method that queri
    // es the database which
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
      ([drillgroup, drills]) => {
        console.log(drills)
        res.send(JSON.stringify(Object.assign({},{
          drillgroup:drillgroup.toJSON(),
          drills: drills.map((d)=>{
            return d.toJSON()
          })
        })))
      }
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
    .then(
      ([drillgroup, drills]) => {
        console.log(drills)
        res.send(JSON.stringify(Object.assign({},{
          drillgroup:drillgroup.toJSON(),
          drills: drills.map((d)=>{
            return d.toJSON()
          })
        })))
      }
    )
    .catch(err => next(err))
  }

})

// DrillGroup#update
// PATH /drillgroups/:id Method: patch
router.put('/:id', function (req, res, next) {
  const {is_admin} = req.user

  if (is_admin) {
    const {id} = req.params;
    const {title, description, price} = req.body;

    DrillGroup
    .findById(id)
    .then(drillgroup => {
      // console.log(drillgroup);
      drillgroup.update({title, description, price})
    })

    .then(() => res.send(JSON.stringify({status:"updated"})))
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

    DrillGroup
    .findById(id)
    .then(drillgroup  => drillgroup.destroy())
    .then(() => res.send(JSON.stringify({status:"deleted"})))
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
