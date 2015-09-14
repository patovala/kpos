'use strict';

function popupField() {
  var directive = {
    templateUrl: 'app/popupField/panelField.html',
    restrict: 'E',
    link: function () {},
    controllerAs: 'pf',	
    controller: popupFieldCtrl
  };
  return directive;
  function popupFieldCtrl($scope, $resource, cartService) {
    var pf = this;
    pf.qty="";

    function updateQty(idProduct,qty){
      cartService.updateItemQty(idProduct,qty);  
      cartService.resetDiscounts();
      cartService.getDiscountsForCart('byclient');    
    }
   }
angular.module('kposApp')
 .directive('popupField', popupField);
