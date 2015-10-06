'use strict';

var _ = require('lodash');
var config = require('../../config/environment');

// Configure mongo access
var MongoClient,
    url = config.mongo.uri;

MongoClient = require('mongodb').MongoClient;

// Get list of users
exports.findAll = function(req, res) {
  MongoClient.connect(url, function(err, db) {
    var users = db.collection('users');
    users.find({}).toArray(function(err, docs){
      res.json(docs);
      db.close();
    });
  });
};

// Get user by name and password
exports.loggedUser = function(req, res) {
  MongoClient.connect(url, function(err, db) {
    var users = db.collection('users');
    if(req.query && req.query.username && req.query.password){
        users.findOne({$and:[{$or:[{email: req.query.email},{username: req.query.username}]},
                      {password: req.query.password}]}, function(err, doc){
            res.json(doc);
            db.close();
        });
    }
  });
};

// Add users
exports.addUser = function (req, res) {
  MongoClient.connect(url, function (err, db) {
    var users = db.collection('users');
    users.findOne({$or:[{dni: req.body.user.dni},
                  {email: req.body.user.email},
                  {username: req.body.user.username}]}, function(err, doc){
      if(doc !== null){
        res.send({resp:'duplicated'});
        db.close();
      }else{
        users.insert(req.body.user, function(err, result){
          res.send(
            (err === null) ? result : { msg: err }
          );
          db.close();
        });
      }
    });
  });
};

//Updated users by _id
exports.updateUser = function (req, res) {
  MongoClient.connect(url, function (err, db) {
    var users = db.collection('users');
    users.findOne({$or:[{dni: req.body.user.dni},
                  {email: req.body.user.email},
                  {username: req.body.user.username}]}, function(err, doc){
      if(doc !== null){
        res.send({resp:'elements duplicated'});
        db.close();
      }else{
        users.findAndModify({_id: req.body.user._id}, [['_id','asc']],
        {$set: {dni: req.body.user.dni, firstname: req.body.user.firstname,
                lastname: req.body.user.lastname, username: req.body.user.username,
                password: req.body.user.password, session_id: req.body.user.session_id}},
        {},function(err, result) {
          res.send((err === null) ? result : { msg: err });
          db.close();
        });
      }
    });
  });
};

//Deleted users by _id
exports.deleteUser = function (req, res) {
  MongoClient.connect(url, function (err, db) {
    var users = db.collection('users');
    if(req.query && req.query._id){
        users.deleteOne({'_id': parseInt(req.query._id)},
        function(err, result) {
            res.send((err === null) ? result : { msg: err });
            db.close();
        });
    }else{
        db.close();
    }
  });
};
