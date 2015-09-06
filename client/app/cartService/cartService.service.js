'use strict';

angular.module('kposApp')
  .service('cartService', function ($resource, $rootScope) {
    var cart = {
                client: {_id: 'default', name: 'Consumidor Final', address: ''},
                items:[],
                subtotal: 0,
                tax: 12
    };

    return {
      addToCart: addToCart,
      removeFromCart: removeFromCart,
      getCart: getCart,
      changeTax: changeTax,
      updateItemQuantity: updateItemQuantity,
      setClient: setClient,
      addDiscount: addDiscount,
      resetDiscounts: resetDiscounts
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

    function changeTax (tax) {
      cart.tax = tax;
    }

    function updateItemQuantity (item) {
      _.forEach(cart.items, function (i) {
          var itemSaved = _.findWhere(cart.items, {_id: item._id});
          if (itemSaved) {
              i.quantity = item.quantity;
          }
      });
    }

    function setClient (client) {
      cart.client = client;
    }

    function addDiscount (discount) {
      cart.discounts = cart.discounts || [];
      cart.discounts.push(discount);
    }

    function resetDiscounts(){
      cart.discounts = [];
    }
  });
