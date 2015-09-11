'use strict';

var express = require('express');
var controller = require('./discounts.controller');

var router = express.Router();

router.post('/:filter', controller.index);

module.exports = router;
