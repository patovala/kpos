'use strict';

var _ = require('lodash');
var should = require('should');
var app = require('../../app');
var request = require('supertest');

var MongoClient = require('mongo-mock').MongoClient,
    products;

beforeEach(function(done) {
  //populate the db with some json
  MongoClient.persist = 'server/fixtures/products.js';
  var url = 'mongodb://localhost/kpos-test';

  MongoClient.connect(url, {}, function(err, db) {
    // Get the documents collection
    var collection = db.collection('products');
    // Insert some documents
    products = _.map([1, 2, 3, 4, 5], function(i){
      return {_id: i, name: 'product ' + i, price: i * 100};
    });

    collection.insert(products, function(err, result) {
      console.log('populando DB');
    });
    db.close();
    done();
  });
});

describe('GET /api/products', function() {

  it('should get the products (all)', function(done) {
    request(app)
      .get('/api/products')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        res.body.length.should.equal(5);
        done();
      });
  });

  /*
   * TODO: we should get the product filtered
   * when we call /api/products/<q>
   * been <q> the query
   * */
  it('should get the products filtered by ', function(done) {
   request(app)
     .get('/api/products/product%201')
     .expect(200)
     .expect('Content-Type', /json/)
     .end(function(err, res) {
       if (err) return done(err);
       res.body.should.be.instanceof(Array);
       res.body.length.should.equal(1);
       done();
     });
  });
});
