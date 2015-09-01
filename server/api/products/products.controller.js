'use strict';

var _ = require('lodash');
var config = require('../../config/environment');

// Configure mongo access
var MongoClient,
    url = config.mongo.uri;

if(config.mongo.uri === 'mongodb://localhost/kpos-test'){
  MongoClient = require('mongo-mock').MongoClient;
}else{
  MongoClient = require('mongodb').MongoClient;
}

// Get list of products
exports.findAll = function(req, res) {
  MongoClient.connect(url, function(err, db) {
    console.log("Connected correctly to server");
    var products = db.collection('products');

    products.find({}).toArray(function(err, docs){
      res.json(docs);
      db.close();
    });
  });
};
//Get product
exports.findbyQuery = function(req, res) {
  MongoClient.connect(url, function(err, db) {
    console.log("Connected correctly to server for find filtered");
    var products = db.collection('products');
    var str = req.params.query;
    var val = str.replace('%20', ' ');
    products.find({"name": val }).toArray(function(err, docs){
      res.json(docs);
      db.close();
    });
  });
};
