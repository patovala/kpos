'use strict';

angular.module('kposApp')
  .directive('productsPanel', productsPanel);

/*Jhon Papa recomendations to have a separate function for the directive */
function productsPanel() {
  var directive = {
    templateUrl: 'app/productsPanel/productsPanel.html',
    restrict: 'E',
    link: function () {},
    controller: productsPanelCtrl
  };

  return directive;

  function productsPanelCtrl($scope, $resource) {
    var vm = this;

    var r = $resource('api/products');
    vm.products = r.query();
  }
}
