'use strict';

angular.module('kposApp')
  .service('cartService', function ($resource, $rootScope) {
    var cart = {};

    return {
      addToCart: addToCart,
      removeFromCart: removeFromCart,
      getCart: getCart
    };

    function addToCart(id){
      if(!cart.items){
        cart.items = [];
      }
      //var r = $resource('api/products:id', {id: '@id'});
      var r = $resource('api/products');
      var promise = r.get({_id: id}, function(item) {
        cart.items.push(item);
        // notify that we added an item to the cart
        $rootScope.$broadcast('_new_item_added_', item);
      });

      return promise; // return the promise for further handling
    }

    function removeFromCart(id){
      cart.items = cart.items.filter(function(e){
        return e._id !== id;
      });
    }

    /* get the cart from somewhere */
    function getCart(){
      return cart;
    }

  });
