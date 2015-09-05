'use strict';

function cartPanel() {
  var directive = {
  templateUrl: 'app/cartPanel/cartPanel.html',
  restrict: 'E',
  link: function () {},
  controllerAs: 'cartP',
  controller: cartPanelCtrl
  };

  return directive;

  function cartPanelCtrl($scope, $resource, cartService) {
    var cartP = this;

    /**
    * Public methods
    */

    init();
    return cartP;

    function init () {
      cartP.cart = cartService.getCart();
    }
  }

}

angular.module('kposApp')
  .directive('cartPanel', cartPanel);
