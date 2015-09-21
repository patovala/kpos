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
    vm.filter = null;

    vm.addToCart = addToCart;
    vm.getProductsFilter = getProductsFilter;
    vm.getProducts = getProducts;
    vm.refresh = refresh;

    getProducts();
    return vm;

    /**
     * Private methods
     */
    function getProducts () {
        var r = $resource('api/products');
        vm.products = r.query();
        vm.filter = null;
    }

    function getProductsFilter(filter){
      var r = $resource('api/products/:filter', {filter: '@filter'});
      vm.products = r.query({filter: filter, query:vm.searchTerm});
      vm.filter = filter;
    }

    function addToCart(id){
      cartService.addToCart(id);
    }

    function refresh () {
      vm.searchTerm = '';

      if (vm.filter) {
        getProductsFilter(vm.filter);
      } else {
        getProducts();
      }
    }
  }

}

angular.module('kposApp')
  .directive('productsPanel', productsPanel);
