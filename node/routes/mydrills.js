const express = require('express');
const router = express.Router();
const {User, DrillGroup} = require('../models/index');


// MyDrillss#create
// PATH /my-drills/:drillGroupId/drills METHOD: post
router.post('/', function (req, res, next) {
  const {drillGroupId} = req.params;
  const {exercise, points, solutions} = req.body;
  let jsonResponse = {};
  let drillId;
  let solutionsArray = [];

  Drill
    .create({exercise, points, DrillGroupId: drillGroupId})
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
          DrillGroupId: drillGroupId,
          solutions: solutions
        }
      );
    })
    .then( () => Solution.bulkCreate(solutionsArray) )
    .then( () => res.send(JSON.stringify(jsonResponse)))
    .catch(err => next(err));

});


module.exports = router;
