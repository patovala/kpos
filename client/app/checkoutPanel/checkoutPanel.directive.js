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
    cc.getChangeCheck=getChangeCheck;
    return cc;
    function getTotalCheck(){
      cartService.getTotalCart();
    }
    function getChangeCheck(incl){
      console.log('val clien',incl);
    }


  }
}
angular.module('kposApp')
.directive('checkoutPanel', checkoutPanel );
