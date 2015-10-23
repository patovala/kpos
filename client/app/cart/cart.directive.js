'use strict';

function cart(){
  var directive = {
      templateUrl: 'app/cart/cart.html',
      restrict: 'EA',
      scope: {
          remove: '&',
          flag: '@'
      },
      controllerAs: 'c',
      controller: cartCtrl
  };
  return directive;

  function cartCtrl($scope, cartService){
    var c = this;

    c.totalCart = totalCart;
    c.totalTax = totalTax;
    c.getSubTotal = getSubTotal;

    init();
    return c;

      function init(){
        c.cart = cartService.getCart();
      }

      function totalCart(){
        return cartService.getTotalCart();
      }

      function totalTax(){
        return cartService.getTotalTax();
      }

      function getSubTotal(items){
        return cartService.getSubTotal(items);
      }
  }
}
angular.module('kposApp')
    .directive('cart', cart);
