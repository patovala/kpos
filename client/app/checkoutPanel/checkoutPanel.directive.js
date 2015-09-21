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

    cc.changeClient = 0;

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

    function dissmissCash(){
      cc.hideCash = !cc.hideCash;
    }

    function getChangeCheck(){
      var change = cc.changeClient - getTotalCheck();
      return change > 0 ? change : 0;
    }
  }
}
angular.module('kposApp')
.directive('checkoutPanel', checkoutPanel);
