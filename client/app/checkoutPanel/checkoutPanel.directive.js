'use strict';

function checkoutPanel(){
  var directive = {
    templateUrl: 'app/checkoutPanel/checkoutPanel.html',
    restrict: 'E',
    link: function () {},
    controllerAs: 'cc',
    controller: checkoutPanelCtrl
  };

  return directive;
  function checkoutPanelCtrl($scope, cartService){
    var cc = this;
    cc.cart = cartService.getCart;
    cc.getTotalCheck = getTotalCheck;
    return cc;
    function getTotalCheck(){
      cartService.getTotalCart();
    }
  }
}
angular.module('kposApp')
.directive('checkoutPanel', checkoutPanel );
