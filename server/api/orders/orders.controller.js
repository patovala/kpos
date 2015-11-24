-'use strict';

var _ = require('lodash');
var config = require('../../config/environment');

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
          //TODO aqui hay que volver a verificar en la maquina de estados y resolver los
          //pendientes <-- no es en la maquina de estados sino en algun otro resolver post venta
          //que quite los pending del cart y que los reemplace con lo que se supone que debe
          //reemplazar
          res.send(result);
          db.close();
        });
      });

  }else{
    console.log('DEBUG:', order);
    res.json({resp: 'error', msg: 'invalid order'});
  }
};
