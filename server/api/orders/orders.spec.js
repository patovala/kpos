'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var assert = require("assert");

var MongoClient = require('mongodb').MongoClient,
    orders,
    url = 'mongodb://localhost/kpos-test';

describe('POST /api/orders/new', function() {

  var completeOrder;

  beforeEach(function(done) {
    completeOrder = {
      'user': 'trueuser',
      'dateCreated': new Date().getTime(),
      'paymentMethods': [{type:'cash'}],
      'cart': {
        client: {
          "_id": "default",
          "name": "Consumidor Final",
          "address": ""
        },
        items: [
          {'name': 'product1'},
          {'name': 'product2'},
          {'name': 'product3'},
        ],
      }
    };
    done();
  });

  after(function(done){
    MongoClient.connect(url, {}, function(err, db) {
      var orders = db.collection('orders');

      orders.drop(function(){
        console.log('destroying DB');
        db.close();
        done();
      });
    });
  });

  /*
   * the test with order store and check if it was stored
   * Una orden debería contener los siguientes aspectos importantes:
   * - cliente: alguien o consumidor final
   * - cart: el cart para poder verificar descuentos y costos del lado del servidor
   * - forma de pago: la forma de pago con el total recaudado*/
  it('should store order and check if it was stored', function(done) {
    request(app)
      .post('/api/orders/new')
      .send(completeOrder)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        assert(typeof(res.body.cart) === 'object');
        done();
    });
  });

    /*
   * Luego de recibir la orden se debería procesar antes de contestar algo.
   *
   * */
  it('should have basic entities and should store the order', function(done) {
    request(app)
      .post('/api/orders/new')
      .send(completeOrder)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        assert(typeof(res.body.cart) === 'object');
        assert(typeof(res.body.cart.client) === 'object');
        assert(res.body.user === 'trueuser');
        done();
      });
  });

  /*
   * deberia retornar error si no hay user
   *
   * */
  it('should have user', function(done) {
    completeOrder.user = '';

    request(app)
      .post('/api/orders/new')
      .send(completeOrder)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        assert(res.body.resp === 'error');
        done();
      });
  });

  /*:
   * Deberia dar error si el cliente no esta seteado (objeto)
   * */
  it('should have a client into the cart', function(done) {
    delete completeOrder.cart.client;

    request(app)
      .post('/api/orders/new')
      .send(completeOrder)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        assert(res.body.resp === 'error');
        done();
      });
  });

  /*
   * Deberia dar error si la cart no tiene formas de pago
   * */
  it('should have basic entities', function(done) {
    delete completeOrder.paymentMethods;

    request(app)
      .post('/api/orders/new')
      .send(completeOrder)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        assert(res.body.resp === 'error');
        done();
      });
  });

  /*
   * Por lo menos deberia haber un payment method
   * */
  it('should have almost one payment method', function(done) {
    var incompleteOrder = completeOrder;
    incompleteOrder.paymentMethods = [];

    request(app)
      .post('/api/orders/new')
      .send(incompleteOrder)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        assert(res.body.resp === 'error');
        done();
      });
  });

});
