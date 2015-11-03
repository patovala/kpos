'use strict';

var _ = require('lodash');
var config = require('../../config/environment');

var MongoClient,
    url = config.mongo.uri;

var exports = module.exports = {};

MongoClient = require('mongodb').MongoClient;

/*
 * Get discounts for clients, only to client
 * that buys coffee
 * */
var totalItem, discountsItem, sum = 0;
exports.discountsClients = function (cart, cb){

  if (cart.pendingDiscounts && _.contains(cart.pendingDiscounts, 'DiscountClients')){

    MongoClient.connect(url, {}, function(err, db) {

      var discounts = db.collection('discounts');

      discounts.findOne({_id: 'DiscountClients'}, function(err, d){
        db.close();
        if(d){
          // buscar en la carta los items que tengan categoria d.applyToCategory
          var elems = _.filter(cart.items, function(i){return i.category === d.applyToCategory;});
          if (elems.length) {
            sum = 0;
            _.forEach(elems, function(i){
                totalItem = i.quantity * i.price;
                discountsItem = parseInt(totalItem * d.value) / 100;
                sum = sum + discountsItem;
            });
            d.quantity = sum;
            cb([d]);
          }else{
            cb([]);
          }
        }
      });
    });

  }else{
    cb([]);
  }
}
