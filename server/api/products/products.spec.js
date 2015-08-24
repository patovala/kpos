'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/products', function() {

  /*TODO: necesitamos retornar la lista de proudctos
   * obtenidos desde mongo
   * */
  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/products')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});
