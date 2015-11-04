'use strict';

var _ = require('lodash');
var config = require('../../config/environment');

var MongoClient,
    url = config.mongo.uri;

var exports = module.exports = {};

MongoClient = require('mongodb').MongoClient;

/*
 * Get discounts for internet service opcional, only to people
 * that buys coffee
 * */
exports.coupondiscount = function (cart, cb){

  MongoClient.connect(url, {}, function(err, db) {
    // first check if there is a discount for internet service in the collection
    var coupons = db.collection('coupons'),
        ds = [];

    if(cart.pendingCoupons && cart.pendingCoupons.length){
      coupons.find({_id: {$in: cart.pendingCoupons}}).toArray(function(err, docs){

        //find the items with category equal to the one in the discount
        docs && _.each(docs, function(c){
          //process each doc related to its coupon discount to get the anti item
          // 1. 2x1 in selected items
          if(c.category==="2x1" && c.applyToItems && _.isArray(c.applyToItems)){
            var elems = _.intersection(_.pluck(cart.items, '_id'), c.applyToItems);
            ds = _.filter(cart.items, function(i){
              return _.contains(elems, i._id);
            });

            // finally we need to calculate the correct number of items multiple of 2
            _.map(ds, function(i){
              i.quantity = parseInt(i.quantity / 2);
            });
          }
        });

        cb(ds);
        db.close();
      });
    }else{
      cb(ds);
    }

  });
}
