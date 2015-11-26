'use strict';
function printReceipt () {
  var directive = {
    templateUrl: 'app/printReceipt/printReceipt.html',
    restrict: 'E',
    controllerAs: 'pr',
    controller: printReceiptCtrl
  };

  return directive;

  function printReceiptCtrl(cartService, $rootScope){
    var pr = this;

    pr.client = cartService.getCart().client.name;
    pr.newOrder = newOrder;
    pr.printTicked = printTicked;
    init();

    return pr;


    function init(){
      pr.order = cartService.getOrder();
    }

    function newOrder(){
      cartService.resetCart();
      cartService.resetClient();
      $rootScope.$emit('changePanel', 1);
    }

    function printTicked(){
      window.print();
    }
  }
}

angular.module('kposApp')
  .directive('printReceipt',printReceipt);
