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
  function checkoutPanelCtrl($scope, cartService, $resource){
    var cc = this;
    cc.cart = cartService.getCart;
    cc.getTotalCheck = getTotalCheck;
    cc.paymentProcess = paymentProcess;

    return cc;
    function getTotalCheck(){
      return cartService.getTotalCart();
    }

    function paymentProcess() {
      var r = $resource('api/orders/newOrder');
        r.save({cart: cc.cart}, function(data){
          console.log(data);
        });
    }
  }
}
angular.module('kposApp')
.directive('checkoutPanel', checkoutPanel);
