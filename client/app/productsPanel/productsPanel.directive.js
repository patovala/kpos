'use strict';

/*Jhon Papa recomendations to have a separate function for the directive */
function productsPanel() {
  var directive = {
    templateUrl: 'app/productsPanel/productsPanel.html',
    restrict: 'E',
    link: function () {},
    controllerAs: 'vm',
    controller: productsPanelCtrl
  };

  return directive;

  function productsPanelCtrl($scope, $resource, cartService) {
    var vm = this;

    /**
     * Public methods
     */
    vm.searchTerm = '';
    vm.search = search;
    vm.addToCart = addToCart;
    vm.getProductsFilter = getProductsFilter;

    init();
    return vm;

    /**
     * Private methods
     */
    function init () {
        var r = $resource('api/products/:q', {q: '@q'});
        vm.products = r.query();
    }

    function search (){
      var r = $resource('api/products/:q', {q: '@q'});
      if(vm.searchTerm && vm.searchTerm.length > 2){
        vm.products = r.query({q: vm.searchTerm});
      }
    }

    function getProductsFilter(query){
      var r = $resource('api/products/:qp/:q', {qp: '@qp', q: '@q'});
      vm.products = r.query({qp: vm.searchTerm, q: query});
      console.log(query);
    }

    function addToCart(id){
      cartService.addToCart(id);
    }
  }

}

angular.module('kposApp')
  .directive('productsPanel', productsPanel);
