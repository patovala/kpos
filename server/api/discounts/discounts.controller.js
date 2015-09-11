'use strict';

var _ = require('lodash');
var config = require('../../config/environment');

// Configure mongo access
var MongoClient,
    url = config.mongo.uri;

MongoClient = require('mongodb').MongoClient;

// Get list of discounts via POST
exports.index = function(req, res) {
  MongoClient.connect(url, function(err, db) {
    var discounts = db.collection('discounts');

    var query = {};

    if(req.params && req.params.filter){
      // we need a cart anylizer to generate the discounts for
      // each case
      query = {category: req.params.filter};
    }

    discounts.find(query).toArray(function(err, docs){
      res.json(docs);
      db.close();
    });
  });
};
