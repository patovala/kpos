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
    cc.hidePayPal=false;
    cc.hideCard=false;
    cc.statusButton=true;

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
      var r = $resource('api/orders/newOrder');
        r.save({cart: cc.cart}, function(data){
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
      if(change>0){
        cc.statusButton=false;
        return change;
      }else{
        cc.statusButton=true;
        return  0;
      }
    }
  }
}
angular.module('kposApp')
.directive('checkoutPanel', checkoutPanel);
