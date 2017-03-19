var express = require('express');
var router = express.Router();
var passport = require('../config/passport')

// sessions#new (Render Login View)
router.get('/new', function(req, res, next) {
  res.render('sessions/new');
});

/*
  sessions#create (Create a session/ Login in user)
  if pass passport.authenticate, req.user now exists
  json that we send back needs to look like this:
  {
    path: '/',
    user: {
      user_id:
      email:
      token:
      is_admin:
    }
  }
*/
router.post('/',
  passport.authenticate('local'),
  function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    // found a user.check that user "is verified"
    let sendPath = "";
    if (req.user.token) {
      // if token exists, account is verified.
      // redirect to My Drills
      sendPath = `/users/${req.user.id}/drill_groups`;
    } else {
      // account is not verified
      // redirect to account pending
      sendPath = '/account-pending';
    }
    res.send(JSON.stringify(Object.assign({},{
      user: req.user,
      path: sendPath
    })));
  });
module.exports = router;
