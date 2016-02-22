'use strict';

angular.module('kposApp')
  .service('cartService', function ($resource, $rootScope) {
    var cart = {
                client: {_id: 'default', name: 'Consumidor Final', address: ''},
                items:[],
                subtotal: 0,
                tax: 12
    }, order;


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
      applyDiscount: applyDiscount,
      getDiscountsForCart: getDiscountsForCart,
      resetCart: resetCart,
      resetClient:resetClient,
      getSubTotal: getSubTotal,
      getTotalCart: getTotalCart,
      getTotalTax: getTotalTax,
      getOrder: getOrder,
      setOrder: setOrder,
      setCart: setCart
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

    function setCart(_cart_){
      cart = _cart_;
    }

    function setOrder(_order_){
      order = _order_;
    }

    function getOrder(){
      return order;
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
            itemSaved = i;
          }
      });

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

    function applyDiscount (idDiscount) {
      cart.pendingDiscounts = cart.pendingDiscounts || [];
      cart.pendingDiscounts.push(idDiscount);
      getDiscountsForCart('byclient');
    }

    function resetCart(){
      var client = {_id: 'default', name: 'Consumidor Final', address: ''};
      cart.items = [];
      cart.discounts = [];
      setClient(client);

    }

    function resetClient(){
      var client = {_id: 'default', name: 'Consumidor Final', address: ''};
      setClient(client);
    }

    function getSubTotal (items) {
      var subtotal = 0;
      if (items) {
        _.forEach(items, function (item) {
          var itemValue = item.price || item.value;
          subtotal = subtotal + (item.quantity * itemValue);
        });
      }
      return subtotal;
    }

    function getTotalCart() {
      var totalDiscounts = getSubTotal(cart.discounts) || 0,
          subtotal = getSubTotal(cart.items),
          totalTax = getTotalTax(cart.tax);
      return (subtotal + totalTax) - totalDiscounts;
    }

    function getTotalTax () {
      return getSubTotal(cart.items) * (cart.tax/100);
    }
  });
