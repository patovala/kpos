'use strict';

var _ = require('lodash');
var config = require('../../config/environment');

// Configure mongo access
var MongoClient,
    url = config.mongo.uri;

MongoClient = require('mongodb').MongoClient;

// Get list of clients
exports.findAll = function(req, res) {
  MongoClient.connect(url, function(err, db) {
    console.log("Connected correctly to server");
    var clients = db.collection('clients');

    clients.find({}).toArray(function(err, docs){
      res.json(docs);
      db.close();
    });
  });
};

//Get clients
exports.findbyQuery = function(req, res) {
    var str = req.params.query;
    var val = str.replace('%20', ' ').trim();    
    var patt = /[a-zA-Z0-9_  ]{3,}/g;
    if(patt.test(val)){
      console.log("cadena valida"); 
      MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to server for find filtered");
        var clients = db.collection('clients');        
        clients.find(query).toArray(function(err, docs){        
          res.json(docs);
          db.close();
        });    
      });
    }else
      console.log("cadena invalida");          
};
