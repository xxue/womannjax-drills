const express = require('express');
const router = express.Router();
const {User, DrillGroup, MyDrills} = require('../models/index');


// MyDrills#index
// PATH: /my-drills/drill-groups/
router.get('/drill-groups/', function (req, res, next) {
  let myDrillsCollection = [];
  let drillGroupIds = [];
  let drillGroupNames = [];
  let responseCollection = [];

  MyDrills
    .findAll()
    .then(myDrills => {
      myDrillsCollection = myDrills;
      myDrills.forEach( (mydrill) => { drillGroupIds.push(mydrill.DrillGroupId) })
    })
    .then(() => {
          DrillGroup
          .findAll({where: {id: { $in: drillGroupIds }}, attributes: ['name']})
          .then( drillgroups => {
              drillGroupNames = drillgroups;

              drillgroups.forEach( (group,i,arr) => {
                responseCollection.push(
                  Object.assign({}, {
                    name: drillGroupNames[i].name,
                    UserId: myDrillsCollection[i].UserId,
                    DrillGroupId: drillGroupIds[i],
                    attempts: myDrillsCollection[i].attempts,
                    score: myDrillsCollection[i].score,
                    drillsVisible: myDrillsCollection[i].drillsVisible
                  })
                );
              });
              console.log(responseCollection);
              res.send(JSON.stringify(responseCollection));
            }
          )
          .catch(err => next(err));
    })
    .catch(err => next(err))
});



module.exports = router;
