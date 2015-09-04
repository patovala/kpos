'use strict';

var _ = require('lodash');
var config = require('../../config/environment');

// Configure mongo access
var MongoClient,
    url = config.mongo.uri;

MongoClient = require('mongodb').MongoClient;

/**
 * Get list of products
 * /api/products (all products)
 * /api/products?_id=1 (only product with id = 1)
 */
exports.findAllOrById = function(req, res) {
  MongoClient.connect(url, function(err, db) {
    var products = db.collection('products');
    var query = req.query && req.query._id ? {'_id' : parseInt(req.query._id)} : {};

    products.find(query).toArray(function(err, docs){
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

    products.find({"name": {$regex: str}}).toArray(function(err, docs){
      res.json(docs);
      db.close();
    });
  });
};
