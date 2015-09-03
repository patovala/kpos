'use strict';

var _ = require('lodash');
var config = require('../../config/environment');

// Configure mongo access
var MongoClient,
    url = config.mongo.uri;

MongoClient = require('mongodb').MongoClient;

// Get list of products
exports.findAll = function(req, res) {
  MongoClient.connect(url, function(err, db) {
    var products = db.collection('products');

    products.find({}).toArray(function(err, docs){
      res.json(docs);
      db.close();
    });
  });
};

//Get products by query
exports.findbyQuery = function(req, res) {
  MongoClient.connect(url, function(err, db) {
    var products = db.collection('products');
    var str = req.params.query || '';

    console.log('DEBUG:', str);
    products.find({"name": {$regex: str}}).toArray(function(err, docs){
      res.json(docs);
      db.close();
    });
  });
};
