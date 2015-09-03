'use strict';

/*Jhon Papa recomendations to have a separate function for the directive */
function productsPanel() {
  var directive = {
    templateUrl: 'app/productsPanel/productsPanel.html',
    restrict: 'E',
    link: function () {},
    controller: productsPanelCtrl
  };

  return directive;

  function productsPanelCtrl($scope, $resource, cartService) {
    var vm = this;

    var r = $resource('api/products/:q', {q: '@q'});
    var r2 = $resource('api/products/:qp/:qf', {qp: '@qp', qf: '@qf'});
    vm.products = r.query();

    vm.search = function(){
      if(vm.searchTerm && vm.searchTerm.length > 2){
        vm.products = r.query({q: vm.searchTerm});
      }
    };
    vm.getProductsFilter = function(query){
      vm.productsFilter = r2.query({qp: vm.searchTerm, qf: query});   
      console.log(query);  
    };
    vm.addToCart = function(id){
      cartService.addToCart(id);
    };

  }

  
}

angular.module('kposApp')
  .directive('productsPanel', productsPanel);
