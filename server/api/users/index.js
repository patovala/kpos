'use strict';

var express = require('express');
var controller = require('./users.controller');

var router = express.Router();

router.get('/', controller.findAll);
router.get('/logged', controller.loggedUser);
router.post('/add', controller.addUser);
router.post('/update', controller.updateUser);
router.get('/delete', controller.deleteUser);

module.exports = router;
