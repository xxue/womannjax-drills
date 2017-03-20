const express = require('express');
const router = express.Router();
const {User, DrillGroup} = require('../models/index');

//xinxin
//attempts
//score
//drillsvisible
router.get('/', function (req,res,next) {
    res.send ({name:"mydrillsprofile"})
})
