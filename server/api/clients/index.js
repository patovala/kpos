'use strict';

var express = require('express');
var controller = require('./clients.controller');

var router = express.Router();

router.get('/', controller.findAllOrById);
router.post('/add', controller.addClient);

module.exports = router;
