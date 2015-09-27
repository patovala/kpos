'use strict';

var _ = require('lodash');

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
    _.partial(_.has, order)) && order.user !== ''){
    //TODO: hacer algo util con la orden por ejemplo guardarla en Mongo
    res.json({resp: 'ok'});
  }else{
    res.json({resp: 'error', msg: 'invalid order'});
  }
};
