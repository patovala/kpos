'use strict';

function cartPanel() {
  var directive = {
    templateUrl: 'app/cartPanel/cartPanel.html',
    restrict: 'E',
    link: function () {},
    controllerAs: 'cp',
    controller: cartPanelCtrl
  };

  return directive;

  function cartPanelCtrl($scope, $resource, cartService) {
    var cp = this;

    /**
    * Public methods
    */
    cp.searchClient = searchClient;
    cp.changeClient = changeClient;

    init();
    return cp;

    function init () {
      cp.cart = cartService.getCart();
      cp.defaultClient = angular.copy(cp.cart.client) || {'name': 'Consumidor Final'};
    }

    function searchClient(value){
      var r = $resource('api/clients');
      //cp.clients = r.query({query: value});
      return r.query({query: value}).$promise.then(function(clients){
        cp.clients = clients;
        return clients;
      });
    }

    function changeClient($client){
      cartService.resetDiscounts();
      cp.cart = cartService.getCart();
      cp.cart.client = cp.selectedClient = $client;
    }
  }

}

angular.module('kposApp')
  .directive('cartPanel', cartPanel);
