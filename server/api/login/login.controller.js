'use strict';

var _ = require('lodash');
var config = require('../../config/environment');

// Configure mongo access
var MongoClient,
    url = config.mongo.uri;

MongoClient = require('mongodb').MongoClient;

// Get user by name and password
exports.loginUser = function(req, res) {
  MongoClient.connect(url, function(err, db) {
    var users = db.collection('users');
    if(req.body && req.body.userName && req.body.password){
      users.findOne({$and:[{$or:[{email: req.body.userName},{userName: req.body.userName}]},
      {password: req.body.password}]}, function(err, doc){
        res.json({result: doc});
        db.close();
      });
    }
  });
};
