'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var assert = require("assert");

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

  /*
   * TODO: Una orden debería contener los siguientes aspectos importantes:
   * - cliente: alguien o consumidor final
   * - cart: el cart para poder verificar descuentos y costos del lado del servidor
   * - forma de pago: la forma de pago con el total recaudado
   *
   * Luego de recibir la orden se debería procesar antes de contestar algo.
   *
   * */
  it('should have basic entities', function(done) {
    request(app)
      .post('/api/orders/new')
      .send(completeOrder)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        assert(res.body.resp === 'success');
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

  /*TODO:
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

  /*TODO:
   * Deberia dar error si la cart no tiene formas de pago
   * */
  it('should have basic entities', function(done) {
    completeOrder.paymentMethods = [];
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

  /*TODO:
   * Por lo menos deberia haber un payment method con forma de pago cash
   * */
  it('should have almost one cash payment method', function(done) {
    request(app)
      .post('/api/orders/new')
      .send(completeOrder)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        assert(res.body.resp === 'success');
        done();
      });
  });

  it('should trow error if dont have almost one cash payment method', function(done) {
    completeOrder.paymentMethods = [{type: 'paypal'}]
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

});
