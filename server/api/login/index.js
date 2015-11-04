'use strict';

var express = require('express');
var controller = require('./login.controller');

var router = express.Router();

router.post('/', controller.loginUser);
module.exports = router;
