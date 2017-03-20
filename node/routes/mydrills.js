const express = require('express');
const router = express.Router();
const {User, DrillGroup, MyDrills} = require('../models/index');
const Promise = require('bluebird');


// MyDrills#update
router.put('/:UserId/drill-groups/:DrillGroupId/', function(req, res, next) {
  const {token} = req.user
  console.log(token);
  if(token != null){
    const {UserId,DrillGroupId} = req.params
    MyDrills
    .find({where:{UserId,DrillGroupId}})
    .then(mydrill => {
      console.log(mydrill);
      mydrill.update({drillsVisible:false})
  })
    .then(mydrill=> res.send(JSON.stringify({mydrill:"removed"})))
    .catch(err => next(err))
  } else {
    console.log('error');
    adminError(res)
  }

});


// MyDrills#index
// PATH: /my-drills/drill-groups/
router.get('/drill-groups/', function (req, res, next) {
  const {id} = req.user;
  MyDrills
    .findAll({
      where: {
        UserId: id
      },
      attributes: [
        'id',
        'UserId',
        'DrillGroupId',
        'attempts',
        'score',
        'drillsVisible'
      ]
    })
    .then(myDrills=>{
      return Promise.all([myDrills,Promise.map(myDrills, (myDrill)=>{
        return DrillGroup.findOne({where: {id: myDrill.DrillGroupId }});
      })]);
    })
    .then(([myDrills,drillGroups])=>{
      return Promise.all([myDrills,drillGroups,DrillGroup.findAll()])
    })
    .then(([myDrills,drillGroups,allDrillGroups])=>{
      let myDrillGroups = [];
      myDrills.forEach((myDrill,index)=>{
        const values = myDrill.dataValues;
        myDrillGroups.push(
          Object.assign(
            {},
            values,
            {name: drillGroups[index].name}
          ))
      })

      const response = {
        myDrillGroups: myDrillGroups,
        allDrillGroups: allDrillGroups
      };
      // console.log(response);
      res.send(JSON.stringify(response));
    })
});

router.put('/:id',function(req,res,next){
  const {id} = req.params;
  const {attempts, score} = req.body;
  MyDrills
    .find({where: {id: id}})
    .then(myDrill=>{
      myDrill.update({attempts:attempts,score:score})
    })
    .then(res.send(JSON.stringify({})))
});


function adminError(res) {
  return res.send(JSON.stringify({error: "You can't tho"}))
}

module.exports = router;
