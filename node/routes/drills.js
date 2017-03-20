const express = require('express');
const router = express.Router();
const {Drill} = require('../models/index');

// router.get('/', function (req,res,next) {
//     res.send ({name:"hello"})
// })

//drill#update
//PATH /drills/:id/edit
//works
router.patch('/:id/edit', function (req, res, next) {
  const {id} = req.params;
  const {exercise, points, DrillGroupId} = req.body;
  console.log(req.params);
  Drill
    .findById(id)
    .then(drill => drill.update({exercise, points, DrillGroupId}))
    .then(drill => res.send(JSON.stringify({
      exercise: drill.exercise,
      points: drill.points,
      DrillGroupId: drill.DrillGroupId
      }
    )))
    .catch(err => next(err))
})

//drill#destroy
//PATH /drills/:id
//works
router.delete('/:id', function(req, res, next) {
  const {id} = req.params;
  // const id = req.params.id;

  console.log("id", id);
  Drill
    .findById(id)
    .then(drill  => drill.destroy())
    .then(drill => res.send(JSON.stringify(
      {drill:"deleted"}))
    )
    .catch(err => next(err))
});

router.post('/:id', function(req, res, next) {
  const {id} = req.params;
  const {userAnswer} = req.body;

  // const id = req.params.id;
  Drill
    .findById(id)
    .then(drill  => drill.getSolutions())
    .then(solutions=>{
      let isCorrect = false;
      solutions.forEach(solution=>{
        if (solution.body == userAnswer) {
          isCorrect = true;
        }
      })
      res.send(JSON.stringify({
        isCorrect: isCorrect,
        correctAnswers: solutions
      }));
    })
});


module.exports = router;
