'use strict';

var express = require('express');
var controller = require('./products.controller');

var router = express.Router();

router.get('/:_filter?', controller.findProducts);

module.exports = router;
