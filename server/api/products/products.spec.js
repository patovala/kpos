'use strict';

var _ = require('lodash');
var should = require('should');
var app = require('../../app');
var request = require('supertest');

var MongoClient = require('mongodb').MongoClient,
    products,
    url = 'mongodb://localhost/kpos-test';


describe('GET /api/products', function() {

  before(function(done) {
    //populate the db with some json
    //MongoClient.persist = 'server/fixtures/products.js';

    MongoClient.connect(url, {}, function(err, db) {
      // Get the documents collection
      var collection = db.collection('products');
      // Insert some documents
      products = _.map([1, 2, 3, 4, 5], function(i){
        return {_id: i, name: 'product ' + i, price: i * 100};
      });

      collection.insert(products);

      console.log('populando DB');
      db.close();
      done();
    });
  });

  after(function(done){
    MongoClient.connect(url, {}, function(err, db) {
      var products = db.collection('products');

      products.drop(function(){
        console.log('destroying DB');
        db.close();
        done();
      });
    });
  });

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

  it('should get the product with a specific id', function(done) {
    request(app)
      .get('/api/products?_id=1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        //TODO: esto deberia ser solo un objeto
        res.body.should.be.instanceof(Array);
        res.body.length.should.equal(1);
        done();
      });
  });

  it('should not get the product because the parameter is not an integer', function(done) {
    request(app)
      .get('/api/products?_id=product')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        res.body.length.should.equal(0);
        done();
      });
  });

  /*
   * we should get the product filtered
   * when we call /api/products/<f>
   * been <f> the filter
   * */
  it('should get the products filtered by featured', function(done) {
    request(app)
    .get('/api/products/featured')
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
