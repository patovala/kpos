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
        if(doc !== null){
            var number = Math.floor(new Date().getTime() / 1000);
            users.update({_id: doc._id},{$set: {sessionId: number}},function(err, objec){
                users.findOne({sessionId: number}, function(err, val){
                    res.json({result: {sessionId: val.sessionId, userName: val.userName, name: val.firstName}});
                    db.close();
                });
            });
        }else{
          res.json({result: 'Not Found'});
          db.close();
        }
      });
    }
  });
};

exports.logoutUser = function(req, res) {

  MongoClient.connect(url, function(err, db) {
    var users = db.collection('users');
    if(req.body && req.body.sessionId){
      users.findOne({sessionId: req.body.sessionId}, function(err, doc){
        if (doc !== null){
          users.update({_id: doc._id},{$set: {sessionId: 0}},function(err, objec){
              res.json({flag: true});
              db.close();
          });
        }else{
          res.json({flag: false});
          db.close();
        }
      });
    }
  });
};
