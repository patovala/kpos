'use strict';

function panelPopup() {
  var directive = {
    templateUrl: 'app/panelPopup/panelPopup.html',
    restrict: 'E',
    link: function () {},
    controllerAs: 'pp',
    controller: panelPopupCtrl
  };
  return directive;

  function panelPopupCtrl($scope, $resource, cartService) {
    var pp = this;
    var cart = cartService.getCart();
    pp.updateItemQuantity=updateItemQuantity;

    function updateItemQuantity (id, quantity) {
      var itemSaved, quantityUpdate;
      _.forEach(cart.items, function (i) {
          if (id === i._id) {
            quantityUpdate =  i.quantity + quantity;
            i.quantity = quantityUpdate;
            i.total = getTotalItem(i);
            itemSaved = i;
          }
      });
      return itemSaved;
    }

    function getTotalItem (item) {
      return  Math.round((item.quantity * item.price) * 100)/100;
    }
  }
}
angular.module('kposApp')
  .directive('panelPopup', panelPopup);
