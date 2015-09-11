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
      resetDiscounts: resetDiscounts,
      applyCoupon: applyCoupon,
      getDiscountsForCart: getDiscountsForCart,
      getSubTotalCart: getSubTotalCart,
      getTotalItem: getTotalItem,
      getTotalCart: getTotalCart,
      getTotalTax: getTotalTax
    };

    function addToCart(id){
      if(!cart.items){
        cart.items = [];
      }

      if (updateItemQuantity(id)) {
        return;
      }

      var r = $resource('api/products');
      var promise = r.get({_id: id}, function(item) {
        cart.items.push(item);
        updateItemQuantity(id, 1);
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

    function updateItemQuantity (id, quantity) {
      var itemSaved, quantityUpdate;
      _.forEach(cart.items, function (i) {
          if (id === i._id) {
            quantityUpdate = quantity ? quantity : i.quantity + 1;
            i.quantity = quantityUpdate;
            i.total = getTotalItem(i);
            itemSaved = i;
          }
      });

      getSubTotalCart();
      return itemSaved;
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

    function getDiscountsForCart(filter){
        var r = $resource('api/discounts/:filter', {filter:'@filter'});
        var promise = r.save({cart: cart, filter: filter}, function(data){
            if(filter === 'byclient'){
              cart.discounts = data.discounts;
            }else{
              return data;
            }
        });

        return promise;
    }
    function applyCoupon (idCoupon) {
      cart.pendingCoupons = cart.pendingCoupons || [];
      cart.pendingCoupons.push(idCoupon);
      getDiscountsForCart('byclient');

    }
    function getTotalItem (item) {
      return  Math.round((item.quantity * item.price) * 100)/100;
    }

    function getSubTotalCart () {
      var subtotal = 0;
      _.forEach(cart.items, function (item) {
        subtotal = subtotal + item.total;
      });
      cart.subtotal = subtotal;
    }

    function getTotalCart () {
      var totalDiscounts = cart.totalDiscounts || 0,
          totalCupons = cart.totalCupons || 0,
          totalTax = getTotalTax(cart.tax);
      return Math.round(((cart.subtotal + totalTax) - (totalDiscounts + totalCupons)) * 100)/100;
    }

    function getTotalTax () {
      return Math.round((cart.subtotal * (cart.tax/100)) * 100)/100;
    }
  });
