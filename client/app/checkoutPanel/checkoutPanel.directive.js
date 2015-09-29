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
    cc.cart = cartService.getCart();
    cc.hideCard = false;
    cc.hidePaypal = false;
    cc.cart = cartService.getCart;
    cc.getTotalCheck = getTotalCheck;
    cc.paymentProcess = paymentProcess;
    cc.getChangeCheck = getChangeCheck;
    cc.dissmissCash = dissmissCash;
    cc.dissmissPaypal = dissmissPaypal;
    cc.dissmissCard = dissmissCard;
    return cc;

    function getTotalCheck(){
      return cartService.getTotalCart();
    }

    function paymentProcess() {

      var date = Date.now();

      console.log(cc.cart);

      cc.order = {
        user: cc.cart.client.name,
        cart: cc.cart,
        dateCreated: date,
        paymentMethods: [{type: 'cash', value: 10}]
      };

      var r = $resource('api/orders/new');
        r.save(cc.order, function(data){
          console.log(data);
        });
    }

    function dissmissCash(){
      cc.hideCash = !cc.hideCash;
    }

    function dissmissPaypal(){
      cc.hidePaypal = !cc.hidePaypal;
    }

    function dissmissCard(){
      cc.hideCard = !cc.hideCard;
    }

    function getChangeCheck(){
      var change = cc.changeClient - getTotalCheck();
      return change > 0 ? change : 0;
    }
  }
}
angular.module('kposApp')
.directive('checkoutPanel', checkoutPanel);
