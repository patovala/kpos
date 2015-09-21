'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

var MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://localhost/kpos-test',
    discounts;

describe('#discounts api', function() {
  before(function(done) {

    MongoClient.connect(url, {}, function(err, db) {
      var collection = db.collection('discounts');
      // Insert some documents
      discounts = [
        {_id: 1, category: 'generic', type: 'percent', name: 'discount 1', value: 10},
        {_id: 2, category: 'generic', type: 'value', name: 'discount 2', value: 0.10},
        {_id: 3, category: 'forclients', type: 'percent', name: 'vip', value: 10},
      ];
      collection.insert(discounts, function(err, result) {
        console.log('populando DB');
        db.close();
        done();
      });
    });
  });

  after(function(done){
    MongoClient.connect(url, {}, function(err, db) {
      var discounts = db.collection('discounts');

      discounts.drop(function(){
        console.log('destroying DB');
        db.close();
        done();
      });
    });
  });

  it('should get the generic discounts', function(done) {
    request(app)
      .post('/api/discounts/generic', {cart: {}})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.discounts.length.should.equal(2);
        done();
      });
  });

  it('should get discounts if the client in the cart has type vip', function(done) {
    var cart = {
      client: {name: 'Juanito Piguave', type: ['vip']},
      items: [{name: 'item a'}, {name: 'item b'}]
    };

    request(app)
      .post('/api/discounts/byclient')
      .send(cart)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });
});
