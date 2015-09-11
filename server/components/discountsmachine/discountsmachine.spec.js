'use strict';

var _ = require('lodash');
var should = require('should');
var DiscountsMachine = require('./discountsmachine.js').DiscountsMachine;

var config = require('../../config/environment');

// Configure mongo access
var MongoClient,
    url = config.mongo.uri;

MongoClient = require('mongodb').MongoClient;

function addToCollection(data){
    MongoClient.connect(url, {}, function(err, db) {
      var collection = db.collection('discounts');

      collection.insert(data, function(err, result) {
        db.close();
      });
    });
}

describe('DiscountsMachine chain of responsabilities', function() {

  var genericDiscount = {category: 'generic', type:'value', name: 'BYO', value: 0.10},
      internetDiscount = {"_id":2,
                          "name":"internetservice",
                          "appliesToItemCategory":"coffee",
                          "discount":
                            {"name":"Internet Service",
                              "type":"notvalue",
                              "comment":"this object has to be resolved in the checkout phase"}
                        };
  before(function(done) {
    done();
  });

  after(function(done){
    MongoClient.connect(url, {}, function(err, db) {
      var discounts = db.collection('discounts');

      discounts.drop(function(){
        db.close();
        done();
      });
    });
  });

  /*
   * Here is how we use the discounts machine
   * */
  it('should get generic discounts when queried', function(done) {
    addToCollection(genericDiscount);
    addToCollection(internetDiscount);

    var D = new DiscountsMachine();
    var cart = {};

    D.getDiscounts(cart, function(discounts){
      discounts.should.be.instanceof(Array);
      discounts.length.should.equal(1);
      done();
    });
  });

  /*
   * Findout a generic + internet discount
   * */
  it('should get generic + internet discount when queried', function(done) {
    addToCollection(genericDiscount);
    addToCollection(internetDiscount);

    var D = new DiscountsMachine();
    var cart = {items: [{category:"coffee"}]};

    D.getDiscounts(cart, function(discounts){
      discounts.should.be.instanceof(Array);
      discounts.length.should.equal(2);
      done();
    });
  });

});
