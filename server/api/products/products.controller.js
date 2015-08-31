'use strict';

var _ = require('lodash');
var config = require('../../config/environment');

// Configure mongo access
var MongoClient,
    url = config.mongo.uri;

if(config.mongo.uri === 'mongodb://localhost/kpos-test'){
  MongoClient = require('mongo-mock').MongoClient
}else{
  MongoClient = require('mongodb').MongoClient
}

// Get list of products
exports.index = function(req, res) {
  MongoClient.connect(url, function(err, db) {
    console.log("Connected correctly to server");
    var products = db.collection('products');

    products.find({}).toArray(function(err, docs){
      res.json(docs);
      db.close();
    });
  });
  //res.json([]);
};
