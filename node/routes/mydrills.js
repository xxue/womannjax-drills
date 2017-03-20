const express = require('express');
const router = express.Router();
const {User, DrillGroup, MyDrills} = require('../models/index');

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
  let myDrillsCollection = [];
  let drillGroupIds = [];
  let drillGroupNames = [];
  let responseCollectionMyDrills = [];
  let response = {};

  MyDrills
    .findAll({attributes: ['id', 'UserId','DrillGroupId','attempts','score','drillsVisible']})
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
                responseCollectionMyDrills.push(
                  Object.assign({}, {
                    myDrillsId: myDrillsCollection[i].id,
                    name: drillGroupNames[i].name,
                    UserId: myDrillsCollection[i].UserId,
                    DrillGroupId: drillGroupIds[i],
                    attempts: myDrillsCollection[i].attempts,
                    score: myDrillsCollection[i].score,
                    drillsVisible: myDrillsCollection[i].drillsVisible
                  })
                );
              });
              // console.log(responseCollectionMyDrills);
              Object.assign(response,{myDrillGroups: responseCollectionMyDrills})
            }
          )
          .then(()=>{
            console.log("------------------------------")
             DrillGroup
              .findAll()
              .then(allDrillGroups=>{
                console.log('drillGroups',allDrillGroups)
                Object.assign(response,{allDrillGroups: allDrillGroups || []})
              })
              .then(()=>{
                res.send(JSON.stringify(response));
              })
          })

          .catch(err => next(err));
    })
    .catch(err => next(err))
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
