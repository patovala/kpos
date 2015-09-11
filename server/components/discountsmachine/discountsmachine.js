'use strict';

var _ = require('lodash');
var config = require('../../config/environment');

var MongoClient,
    url = config.mongo.uri;

MongoClient = require('mongodb').MongoClient;

// require here other discounts
// var GenericDiscount = require('genericDiscount');

var DiscountChain = function(cblogic) {
    this.discount_logic = cblogic;
    this.next = null;
};

DiscountChain.prototype = {
    calculate: function(cart, discounts, cb) {
        var that = this;
        this.discount_logic(cart, function(ds){
          // add the generated discount to the discounts collection

          //ds && _.extend(discounts, ds);
          ds && discounts.push.apply(discounts, ds);

          if(that.next){
            that.next.calculate(cart, discounts, cb);
          }else{
            cb(discounts);
          }
        });
    },
    // set the stack that comes next in the chain
    setNextDiscount: function(stack) {
        this.next = stack;
    }
};

/*
 * Get the generic discounts
 * */
function collectgeneric(cart, cb){
  MongoClient.connect(url, {}, function(err, db) {

    var discounts = db.collection('discounts');

    discounts.find({category: 'generic'}).toArray(function(err, docs){
      db.close();
      cb(docs);
    });
  });
}

/*
 * Internet Service Discount
 * */

function internetdiscount(cart, cb){

  MongoClient.connect(url, {}, function(err, db) {
    // first check if there is a discount for internet service in the collection
    var discounts = db.collection('discounts'),
        ds = [];

    discounts.findOne({name: 'internetservice'}, function(err, discount){

      //find the items with category equal to the one in the discount
      if(discount && _.some(cart.items, {category: discount.appliesToItemCategory})){
        // add the discount to the discount chain
        ds.push(discount.discount);
      }
      cb(ds);
      db.close();
    });

  });
}

/*
 * Chain or responsability entry point
 * */

var DiscountsMachine = function () {
  // create the chained discounts, add here the imported
  // discounts
  //add the link for the chain internet discount

  var genericDiscount = new DiscountChain(collectgeneric),
      internetDiscount = new DiscountChain(internetdiscount);
  //  byclientDiscount = new ByClientDiscount()
  //  internetDiscount = new InternetDiscount()

  genericDiscount.setNextDiscount(internetDiscount);

  // Set the top stack as a property
  this.discountsStack = genericDiscount;
};

DiscountsMachine.prototype.getDiscounts = function(cart, cb) {
  var discounts = [];
  this.discountsStack.calculate(cart, discounts, cb);
};

module.exports.DiscountsMachine = DiscountsMachine;
