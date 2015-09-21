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
    cc.getChangeCheck = getChangeCheck;
    cc.dissmissCash = dissmissCash;
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
    function getChangeCheck(incl){
      console.log('val clien',incl);
    }

    function dissmissCash(){
      cc.hideCash = !cc.hideCash;
    }
  }
}
angular.module('kposApp')
.directive('checkoutPanel', checkoutPanel);
