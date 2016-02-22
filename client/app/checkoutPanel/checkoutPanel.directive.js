'use strict';

function checkoutPanel(){
  var directive = {
    templateUrl: 'app/checkoutPanel/checkoutPanel.html',
    restrict: 'E',
    link: function () {},
    controller: checkoutPanelCtrl,
    controllerAs: 'cc'
  };

  return directive;
  function checkoutPanelCtrl($scope, cartService, $resource, $rootScope, authenticationService){
    var cc = this;

    cc.cashPayment = {type: 'cash', amountTendered: 0.00};
    cc.hidePayPal = false;
    cc.hideCard = false;
    cc.statusButton = true;

    //cc.cart = cartService.getCart;
    cc.getTotalCheck = getTotalCheck;
    cc.processPayment = processPayment;
    cc.getChangeCheck = getChangeCheck;
    cc.dissmissPanel = dissmissPanel;

    return cc;

    function getTotalCheck(){
      return cartService.getTotalCart();

    }

    function processPayment() {

      var cart = cartService.getCart();

      cc.order = {
        user: authenticationService.getCookie(),
        cart: cart,
        dateCreated: Date.now(),
        paymentMethods: []
      };

      cc.order.paymentMethods.push(cc.cashPayment);

      var r = $resource('api/orders/new');
        r.save(cc.order, function(data){
          cartService.setCart(data.cart);
          cartService.setOrder(data);
          $rootScope.$emit('changePanel', 3);
        });
    }

    function dissmissPanel(panel){
      cc[panel] = !cc[panel];
    }

    function getChangeCheck(){
      //TODO: we need to fix this when we get more payment methods cause user will be allowed to
      //      pay with different payments methods not only cash.
      var change = cc.cashPayment.amountTendered - cartService.getTotalCart();

      if(change > 0){
        cc.statusButton = false;
        return change;
      }else{
        cc.statusButton = true;
        return  0;
      }
    }
  }
}

angular.module('kposApp')
.directive('checkoutPanel', checkoutPanel);
