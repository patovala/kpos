'use strict';

var express = require('express');
var controller = require('./orders.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/newOrder', controller.addOrder);

module.exports = router;
