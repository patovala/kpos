'use strict';

describe('<Unit test> DiscountsMachine chain of responsabilities', function() {
  var _ = require('lodash');
  var should = require('should');
  var DiscountsMachine = require('./discountsmachine.js').DiscountsMachine;

  var config = require('../../config/environment');

  // Configure mongo access
  var MongoClient,
      url = config.mongo.uri;

  MongoClient = require('mongodb').MongoClient;

  function addToCollection(data, done){
      MongoClient.connect(url, {}, function(err, db) {
        var collection = db.collection('discounts');

        collection.insert(data, function(err, result) {
          db.close();
          done();
        });
      });
  }

  function createCoupon(data, done){
      MongoClient.connect(url, {}, function(err, db) {
        var collection = db.collection('coupons');

        collection.insert(data, function(err, result) {
          db.close();
          done();
        });
      });
  }

  describe('#discounts', function() {

    var genericDiscount = {_id: 'BYO', category: 'generic', type:'value', name: 'BYO', value: 0.10, applyToCategory:'coffee'},
        internetDiscount = {"_id":"internetservice",
                            "name":"internetservice",
                            "applyToItemCategory":"coffee",
                            "discount":
                              {"name":"Internet Service",
                                "type":"notvalue",
                                "comment":"this object has to be resolved in the checkout phase"}
                          };
    beforeEach(function(done) {
      var discounts =[];
      discounts.push(genericDiscount);
      discounts.push(internetDiscount);
      addToCollection(discounts, done);
    });

    afterEach(function(done){
      MongoClient.connect(url, {}, function(err, db) {
        var discounts = db.collection('discounts');

        discounts.drop(function(){
          db.close();
          done();
        });

      });
    });

    /*
     * A generic discount is an optional discount that can apply
     * to a cart. For instance the most common is the BYO, that applies
     * only to categories of products.
     * */
    it('should get BYO generic discounts', function(done) {
      var D = new DiscountsMachine();
      var cart = {pendingDiscounts: ['BYO'],
                  items: [
                      {_id:1, name: 'item 1', category: 'coffee', quantity: 1},
                      {_id:2, name: 'item 2', category: 'coffee', quantity: 1},
                  ]};

      D.getDiscounts(cart, function(discounts){
        discounts.should.be.instanceof(Array);
        discounts.length.should.equal(1);
        discounts[0].quantity.should.equal(2);
        done();
      });
    });

    /*
     * A generic discount is an optional discount that can apply
     * to a cart. For instance if there is no items with category
     * it should not add a discount.
     * */
    it('should not get generic discounts', function(done) {
      var D = new DiscountsMachine();
      var cart = {pendingDiscounts: ['BYO'],
                  items: []};

      D.getDiscounts(cart, function(discounts){
        console.log('DISCOUNTS:', discounts);
        discounts.should.be.instanceof(Array);
        discounts.length.should.equal(0);
        done();
      });
    });

    /*
     * Findout a generic + internet discount
     * */
    it('should get internet discount when queried', function(done) {
      var D = new DiscountsMachine();
      var cart = {items: [{category:"coffee"}], pendingDiscounts: ['internetservice']};

      D.getDiscounts(cart, function(discounts){
        discounts.should.be.instanceof(Array);
        discounts.length.should.equal(1);
        done();
      });
    });
  });

  describe('#coupons', function() {
    var coupon = {
      '_id': '2x1-1234',
      'name': 'Dos por uno en mocachino y flat white',
      'category': '2x1',
      'applyToItems': [1,3],
      'expirationDate': '',
      'state': 'new'
    };

    beforeEach(function(done) {
      createCoupon(coupon, done);
    });

    afterEach(function(done){
      MongoClient.connect(url, {}, function(err, db) {
        var coupons = db.collection('coupons');
        coupons.drop(function(){
          db.close();
          done();
        });
      });
    });

    /*
     * test coupon discounts
     * */
    it('should get coupons', function(done) {

      var D = new DiscountsMachine();
      var cart = {items: [{_id: 1, quantity: 1, name: "mocachino"}, {_id: 2, quantity: 4, name: "mocachino"},
                          {_id: 3, quantity: 3, name: "flatwhite"}], pendingCoupons: ['2x1-1234']};

      D.getDiscounts(cart, function(discounts){
        discounts.should.be.instanceof(Array);
        console.log('DESCUENTOS:', discounts);
        discounts[0].quantity.should.equal(0);
        discounts[1].quantity.should.equal(1);
        discounts.length.should.equal(2);
        done();
      });
    });
  });
});
