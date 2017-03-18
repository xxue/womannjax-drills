const {DrillGroup, Drill} = require('./models/index');

DrillGroup
  .findById(1)
  // promises can only resolve one value
  // to resolve "multiple values" we wrap them in an array
  // If any of the values in our array is a promise, we need to resolve them
  // use Promise.all to do so. It will resolve an array with the resolved values
  // of elements of the array.
  .then(drillgroup => Promise.all([drillgroup, drillgroup.getDrills({order: [['updatedAt', 'DESC']]})]))
  .then(
    ([drillgroup, drills]) => {
      drills.forEach(drill => {
        console.log(drill.dataValues);
      });
    }
  )
  // .catch(
  //   // The next function is a parameter passed to the callback function this is
  //   // part of. Calling it will tell express to move on to the next middleware
  //   // which are error handlers (in this case)
  //   // ð in this situation, we let the error handlers display the error message
  //   err => next(err)
  // )
