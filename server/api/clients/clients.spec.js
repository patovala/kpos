'use strict';

var _ = require('lodash');
var should = require('should');
var app = require('../../app');
var request = require('supertest');

var MongoClient = require('mongo-mock').MongoClient,
    clients;

beforeEach(function(done) {
  //populate the db with some json
  MongoClient.persist = 'server/fixtures/clients.js';
  var url = 'mongodb://localhost/kpos-test';

  MongoClient.connect(url, {}, function(err, db) {
    // Get the documents collection
    var collection = db.collection('clients');
    // Insert some documents
    clients = _.map([1, 2, 3, 4, 5], function(i){
      return {_id: i,  session_id: i * 100, name: 'client ' + i};
    });

    collection.insert(clients, function(err, result) {
      console.log('populando DB');
    });
    db.close();
    done();
  });
});

describe('GET /api/clients', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/clients')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        res.body.length.should.equal(5);
        done();
      });
  });
});
