-'use strict';

var _ = require('lodash');
var config = require('../../config/environment');
var DiscountsMachine = require('../../components/discountsmachine/discountsmachine.js').DiscountsMachine;

// Configure mongo access
var MongoClient,
    url = config.mongo.uri;

MongoClient = require('mongodb').MongoClient;

// Get list of orderss
exports.index = function(req, res) {
  res.json([]);
};

/*
 * Create a new order but doing basic checking if the order has all
 * the expected details
 * */
exports.addOrder = function(req, res) {
  var order = req.body;

  if(_.all(['cart', 'dateCreated', 'paymentMethods', 'user'],
    _.partial(_.has, order)) && order.user !== '' &&
    order.cart.client && order.paymentMethods.length !== 0){

      MongoClient.connect(url, function (err, db) {
        var orders = db.collection('orders');
        orders.insert(order, function(err, result){
          var D = new DiscountsMachine();
          D.resolveDiscounts(order.cart, function(cart){
            order.cart = cart;
            res.json(order);
          });
          //res.send(result);
          db.close();
        });
      });

  }else{
    console.log('DEBUG:', order);
    res.json({resp: 'error', msg: 'invalid order'});
  }
};
