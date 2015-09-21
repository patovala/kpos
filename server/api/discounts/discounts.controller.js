'use strict';

var _ = require('lodash');
var config = require('../../config/environment');
var DiscountsMachine = require('../../components/discountsmachine/discountsmachine.js').DiscountsMachine;


// Configure mongo access
var MongoClient,
    url = config.mongo.uri;

MongoClient = require('mongodb').MongoClient;

// Get list of discounts via POST
exports.index = function(req, res) {
  MongoClient.connect(url, function(err, db) {
    var discounts = db.collection('discounts');

    var query = {};
    console.log('discounts', req.body.filter);

    if(req.body && req.body.filter && req.body.filter === 'byclient'){
      var D = new DiscountsMachine();

      D.getDiscounts(req.body.cart, function(ds){
        res.json({discounts: ds});
      });
    } else {
      query = {category: req.params.filter};
      discounts.find(query).toArray(function(err, ds){
        res.json({discounts: ds});
        db.close();
      });
    }
  });
};
