const express = require('express');
const router = express.Router();
const {Drill} = require('../models/index');

router.get('/', function (req,res,next) {
    res.send ({name:"hello"})
})

//drill#edit
//PATH /drills/:id/edit
//works
router.get('/:id/edit', function (req, res, next) {
  const {id} = req.params;
  console.log(req.params);
  Drill
    .findById(id)
    .then(drill => res.render('/drills/edit', {drill}))
    .catch(err => next(err))
})

//drill#destroy
//PATH /drills/:id
//works
router.delete('/:id', function(req, res, next) {
  const {id} = req.params;
  // const id = req.params.id;
  Drill
    .findById(id)
    .then(drill  => drill.destroy())
    .then(drill => res.send({drill:"deleted"}))
    .catch(err => next(err))
});


module.exports = router;
