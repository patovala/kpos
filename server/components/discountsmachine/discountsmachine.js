'use strict';

var _ = require('lodash');
var config = require('../../config/environment');
var twoforone = require('./coupondiscount').coupondiscount;
var discountsClients = require('./discountsclient').discountsClients;

var MongoClient,
    url = config.mongo.uri;

MongoClient = require('mongodb').MongoClient;

// require here other discounts
// var GenericDiscount = require('genericDiscount');
var DiscountChain = function(cblogic, rslogic) {
    this.discount_logic = cblogic;
    this.resolve_logic = rslogic;
    this.next = null;
};

DiscountChain.prototype = {
    calculate: function(cart, discounts, cb) {
        var that = this;
        this.discount_logic && this.discount_logic(cart, function(ds){
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
    },
    resolve: function(cart, cb){
        var that = this;
        if(this.resolve_logic){
          this.resolve_logic(cart, function(cart){
            if(that.next){
              that.next.resolve(cart, cb);
            }else{
              cb(cart);
            }
          });
        }else{
          if(that.next){
            that.next.resolve(cart, cb);
          }else{
            cb(cart);
          }
        }
    }

};

/*
 * Get the generic discounts, when the cart has pendingDiscounts
 * */
function collectgeneric(cart, cb){
  if (cart.pendingDiscounts && _.contains(cart.pendingDiscounts, 'BYO')){

    MongoClient.connect(url, {}, function(err, db) {

      var discounts = db.collection('discounts');

      //discounts.find({category: 'generic'}).toArray(function(err, docs){
      discounts.findOne({_id: 'BYO'}, function(err, d){
        db.close();
        if(d){
          // buscar en la carta los items que tengan categoria d.applyToCategory
          var elems = _.filter(cart.items, function(i){return i.category === d.applyToCategory;});
          if (elems.length) {
            d.quantity = _.reduce(_.pluck(elems, 'quantity'), function(sum, num){
              return parseInt(sum) + parseInt(num);
            });
            cb([d]);
          }else{
            cb([]);
          }
        }
      });
    });

  }else{
    cb([]);
  }
}

/*
 * Internet Service Discount
 * */
function internetDiscount(cart, cb){

  if (cart.pendingDiscounts && _.contains(cart.pendingDiscounts, 'internetservice')){

    MongoClient.connect(url, {}, function(err, db) {
      // first check if there is a discount for internet service in the collection
      var discounts = db.collection('discounts'),
        ds = [];

      discounts.findOne({_id: 'internetservice'}, function(err, discount){

        //find the items with category equal to the one in the discount
        if(discount && _.some(cart.items, {category: discount.applyToItemCategory})){
          // add the discount to the discount chain
          ds.push(discount.discount);
        }
        db.close();
        cb(ds);
      });
    });

  }else{
    cb([]);
  }
}

/*
 * Internet Service Discount Resolver
 *
 * */
function internetDiscountResolver(cart, cb){

  if (cart.pendingDiscounts && _.contains(cart.pendingDiscounts, 'internetservice')){

    MongoClient.connect(url, {}, function(err, db) {
      var discounts = db.collection('discounts'), ds = [];

      discounts.findOne({_id: 'internetservice'}, function(err, discount){

        //find the items with category equal to the one in the discount
        if(discount){
          var ds =  _.filter(cart.items, {category: discount.applyToItemCategory});
          //TODO PV work in progress, calcula el total de consumo aqui
          var total = _.reduce(ds, function(total, i){
            return total + i.price * i.quantity;
          }, 0);

          // give 15min for $1 spent with a max of 1 hour
          var x = total * 15, // <-- change here for other unit values
              ticket_amount = 0;

          if(Math.floor(x / 60)){
            ticket_amount = 60;
          }else if(Math.floor(x / 30)){
            ticket_amount = 30;
          }else{
            ticket_amount = 15;
          }

          var tickets = db.collection('internettickets');
          tickets.findOne({ticket_amount: ticket_amount, used: false}, function(err, ticket){
            cart.ticket = ticket.serial;

            // remove the pendingDiscounts
            cart.pendingDiscounts = _.pull(cart.pendingDiscounts, 'internetservice');
            db.close();
            cb(cart);
          })


        } else {
          cb(cart);
        }
      });
    });


  } else {
    cb(cart);
  }
}

/*
 * Chain or responsability entry point
 * */

var DiscountsMachine = function () {
  // create the chained discounts, add here the imported
  // discounts
  //add the link for the chain internet discount

  var genericDiscount = new DiscountChain(collectgeneric),
      internetDiscount = new DiscountChain(internetDiscount, internetDiscountResolver),
      twoforoneDiscount = new DiscountChain(twoforone),
      discountsClientsDiscount = new DiscountChain(discountsClients);
  //byclientDiscount = new ByClientDiscount()
  //  internetDiscount = new InternetDiscount()

  genericDiscount.setNextDiscount(internetDiscount);
  internetDiscount.setNextDiscount(twoforoneDiscount);
  twoforoneDiscount.setNextDiscount(discountsClientsDiscount);

  // Set the top stack as a property
  this.discountsStack = genericDiscount;
};

DiscountsMachine.prototype.getDiscounts = function(cart, cb) {
  var discounts = [];
  this.discountsStack.calculate(cart, discounts, cb);
};

DiscountsMachine.prototype.resolveDiscounts = function(cart, cb) {
  this.discountsStack.resolve(cart, cb);
};

module.exports.DiscountsMachine = DiscountsMachine;
