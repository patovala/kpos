'use strict';

var _ = require('lodash');
var should = require('should');
var app = require('../../app');
var request = require('supertest');

var MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://localhost/kpos-test',
    clients;



describe('GET /api/clients', function() {
  before(function(done) {

    MongoClient.connect(url, {}, function(err, db) {
    // Get the documents collection
      var collection = db.collection('clients');
      // Insert some documents
      clients = _.map([1, 2, 3, 4, 5], function(i){
        return {_id: i,  session_id: i * 100, name: 'client ' + i};
      });
      collection.insert(clients, function(err, result) {
        console.log('populando DB');
        db.close();
        done();
      });
    });
  });

  after(function(done){
    MongoClient.connect(url, {}, function(err, db) {
      var clients = db.collection('clients');

      clients.drop(function(){
        console.log('destroying DB');
        db.close();
        done();
      });
    });
  });

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

  it('should get clients filtered by name', function(done) {
    request(app)
      .get('/api/clients?query=client%201')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
          res.body.should.be.instanceof(Array);
          res.body.length.should.equal(1);
          done();
        });
  });

  it('should get the client by id', function(done) {
    request(app)
      .get('/api/clients?_id=1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
          res.body.should.be.instanceof(Object);
          res.body._id.should.equal(1);
          done();
        });
  });
});
