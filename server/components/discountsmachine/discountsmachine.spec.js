'use strict';

describe('<Unit test> DiscountsMachine chain of responsabilities', function() {
  var _ = require('lodash');
  var should = require('should');
  var DiscountsMachine = require('./discountsmachine.js').DiscountsMachine;

  var config = require('../../config/environment');

  // Configure mongo access
  var MongoClient,
      url = config.mongo.uri,
      internetDiscount = {"_id":"internetservice",
          "name":"internetservice",
          "applyToItemCategory":"coffee",
          "discount":
            {"name":"Internet Service",
              "type":"notvalue",
              "comment":"this object has to be resolved in the checkout phase"},
          };

  MongoClient = require('mongodb').MongoClient;

  function addToDiscounts(data, done){
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

  function addToTickets(data, done){
      MongoClient.connect(url, {}, function(err, db) {
        var collection = db.collection('internettickets');

        collection.insert(data, function(err, result) {
          db.close();
          done();
        });
      });
  }

  describe('#discounts', function() {

    var genericDiscount = {_id: 'BYO', category: 'generic', type:'value', name: 'BYO', value: 0.10, applyToCategory:'coffee'},
        discountsClientsDiscount = {_id: 'DiscountClients', category: 'client', type:'percent', name: 'DiscountsClients', value: 15, applyToCategory:'coffee'};


    beforeEach(function(done) {
      var discounts =[];
      discounts.push(genericDiscount);
      discounts.push(internetDiscount);
      discounts.push(discountsClientsDiscount);
      addToDiscounts(discounts, done);
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

    /* */
    it('should get DiscountClients of client discounts', function(done) {
      var D = new DiscountsMachine();
      var cart = {pendingDiscounts: ['DiscountClients'],
                  items: [
                      {_id:1, name: 'item 1', category: 'coffee', quantity: 1, price:0.60},
                      {_id:2, name: 'item 2', category: 'coffee', quantity: 1, price:0.30},
                      {_id:3, name: 'item 2', category: 'coffee', quantity: 1, price:0.50},
                      {_id:4, name: 'item 2', category: 'coffee', quantity: 3, price:0.70},
                  ]};

      D.getDiscounts(cart, function(discounts){
        discounts.should.be.instanceof(Array);
        discounts.length.should.equal(1);
        discounts[0].quantity.should.equal(0.51);
        done();
      });
    });

    it('should not get client discounts, the not category is coffee ', function(done) {
      var D = new DiscountsMachine();
      var cart = {pendingDiscounts: ['DiscountClients'],
                  items: [
                      {_id:1, name: 'item 1', category: 'tea', quantity: 1, price:0.60},
                      {_id:2, name: 'item 2', category: 'tea', quantity: 1, price:0.30},
                      {_id:3, name: 'item 2', category: 'tea', quantity: 1, price:0.50},
                      {_id:4, name: 'item 2', category: 'tea', quantity: 3, price:0.70},
                      {_id:4, name: 'item 2', category: 'tea', quantity: 3, price:0.90},
                  ]};

      D.getDiscounts(cart, function(discounts){
        discounts.should.be.instanceof(Array);
        discounts.length.should.equal(0);
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

  describe.only('#resolver', function() {

    beforeEach(function(done) {
      var discounts =[];
      discounts.push(internetDiscount);
      addToDiscounts(discounts, done);

    });


    beforeEach(function(done) {
      // add some tickets
      var tickets = [
        {_id: 1, ticket_amount: 15, serial: "15minSerialNo", used: false},
        {_id: 2, ticket_amount: 30, serial: "30minSerialNo", used: false},
        {_id: 3, ticket_amount: 60, serial: "60minSerialNo", used: false}
      ];

      addToTickets(tickets, done);
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

    afterEach(function(done){
      MongoClient.connect(url, {}, function(err, db) {

        var internettickets = db.collection('internettickets');
        internettickets.drop(function(){
          db.close();
          done();
        });

      });
    });

    /*
     * Resolve an internet discount
     * */
    it('should add the discount ticket to the cart', function(done) {
      var D = new DiscountsMachine();
      var cart = {items: [
          {_id:1, name: "coffee1", category:"coffee", quantity: 1, price: 0.5},
          {_id:2, name: "coffee2", category:"coffee", quantity: 2, price: 0.6},
          {_id:3, name: "coffee3", category:"coffee", quantity: 3, price: 0.7}
          ], pendingDiscounts: ['internetservice']};

      D.resolveDiscounts(cart, function(cart){
        cart.ticket.should.equal("30minSerialNo");
        cart.pendingDiscounts.should.not.containEql("internetservice");
        done();
      });
    });

  });
});
