'use strict';

/*
 * DEPRECATED: this modal requires unit test
 * */

function CheckoutCartModalCtrl($scope, $modalInstance) {
  var vmc = this;

  vmc.cancel = cancel;
  return vmc;

  function cancel(){
    $modalInstance.dismiss('cancel');
  }

}

angular.module('kposApp')
  .controller('checkoutCartModalCtrl', CheckoutCartModalCtrl);
