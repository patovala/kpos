'use strict';

function panelPopup() {
  var directive = {
    templateUrl: 'app/panelPopup/panelField.html',
    restrict: 'E',
    link: function () {},
    controllerAs: 'pp',
    controller: panelPopupCtrl
  };
  return directive;
  function panelFieldCtrl($scope, $resource, cartService) {
    var pp = this;
    pp.qty="";

    function updateQty(idProduct,qty){
      cartService.updateItemQty(idProduct,qty);  
      cartService.resetDiscounts();
      cartService.getDiscountsForCart('byclient');    
    }
   }
angular.module('kposApp')
 .directive('panelField', panelField);
