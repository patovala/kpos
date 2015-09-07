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
 * /api/products?query=algo (only product with name = algo)
 * /api/products/:filter products by filter
 */
exports.findProducts = function(req, res) {
  MongoClient.connect(url, function(err, db) {
    var products = db.collection('products');

    var q = {};

    if(req.query && req.query._id){
      products.findOne({_id: parseInt(req.query._id)}, function(err, doc){
        res.json(doc);
        db.close();
      });
      return;
    }else if(req.query && req.params.query){
      q = {'name': {$regex: req.params.query}};
    }

    if(req.params && req.params._filter){
      var key = req.params._filter;
      q[req.params._filter] = true;
    }

    products.find(q).toArray(function(err, docs){
      res.json(docs);
      db.close();
    });
  });
};
