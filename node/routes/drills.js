const express = require('express');
const router = express.Router();
const {Solution, Drill} = require('../models/index');

router.get('/', function (req,res,next) {
    res.send ({name:"hello"})
})

//drill#destroy
//PATH /drills/:id
//works
router.delete('/drill-groups/:drillgroupId/drills/:id', function(req, res, next) {
  const {id} = req.params;
  // const id = req.params.id;
  Drill
    .findById(id)
    .then(drill  => drill.destroy())
    .then(drill => res.send({drill:"deleted"}))
    .catch(err => next(err))
});


module.exports = router;
