'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/orders', function() {

  /*
   * TODO: Una orden debería contener los siguientes aspectos importantes:
   * - cliente: alguien o consumidor final
   * - cart: el cart para poder verificar descuentos y costos del lado del servidor
   * - forma de pago: la forma de pago con el total recaudado
   *
   * Luego de recibir la orden se debería procesar antes de contestar algo.
   *
   * */
  it('should respond with JSON array', function(done) {
    request(app)
      .post('/api/orders/add')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.response.should.be('ok');
        done();
      });
  });
});
