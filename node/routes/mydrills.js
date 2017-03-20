const express = require('express');
const router = express.Router();
const {User, DrillGroup, MyDrills} = require('../models/index');

router.put('/:UserId/drill-groups/:DrillGroupId/', function(req, res, next) {
  const {token} = req.user
  console.log(token);
  if(token != null){
    const {UserId,DrillGroupId} = req.params
    MyDrills
    .find({where:{UserId,DrillGroupId}})
    .then(mydrill => {
      console.log(mydrill);
      mydrill.update({score:30,drillsVisible:false})
  })
    .then(mydrill=> res.send(JSON.stringify({mydrill:"removed"})))
    .catch(err => next(err))
  } else {
    console.log('error');
    adminError(res)
  }

});

function adminError(res) {
  return res.send(JSON.stringify({error: "You can't tho"}))
}
module.exports = router;
