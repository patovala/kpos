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

  function cartPanelCtrl($scope, $resource, cartService, $modal) {
    var cp = this;

    /**
    * Public methods
    */
    cp.searchClient = searchClient;
    cp.changeClient = changeClient;
    cp.newClientModal = newClientModal;
    cp.getDiscountsForCart = getDiscountsForCart;

    init();
    return cp;

    function init () {
      cp.cart = cartService.getCart();
      cp.defaultClient = angular.copy(cp.cart.client) || {'name': 'Consumidor Final'};
      cp.discounts = [];
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

    function newClientModal(){
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'components/clientmodal/clientModal.html',
        controller: 'clientModalCtrl',
        size: 'sm'
        //resolve: {
        //  algo: function(){}
        //}
      });

      modalInstance.result.then(function (createdClient) {
        cp.cart.client = createdClient;
        cartService.resetDiscounts();
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    }

    function getDiscountsForCart(open){
      if(open === 'open'){
        var r = $resource('api/discounts/:filter', {filter:'@filter'});
        r.save({cart: cp.cart, filter: 'all'})
          .$promise.then(function(data){
            cp.discounts = data.discounts;
        });
      }
    }
  }

}

angular.module('kposApp')
  .directive('cartPanel', cartPanel);
