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
    cp.getDiscountsDropdown = getDiscountsDropdown;

    init();
    return cp;

    function init () {
      cp.cart = cartService.getCart();
      cp.defaultClient = angular.copy(cp.cart.client) || {'name': 'Consumidor Final'};
      cp.discounts = [];
    }

    function searchClient(value){
     // var r = $resource('api/clients');
      //cp.clients = r.query({query: value});
      return r.query({query: value}).$promise.then(function(clients){
        cp.clients = clients;
        return clients;
      });
    }

    function changeClient($client){
      cp.cart = cartService.getCart();
      cp.cart.client = cp.selectedClient = $client;
      cartService.resetDiscounts();
      getDiscountsForCart('byclient');
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
        getDiscountsForCart('byclient');
        console.log('enmodal');
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    }

    function getDiscountsDropdown(open){
      if(open){
        getDiscountsForCart('generic');
      }
    }

    function getDiscountsForCart(filter){
        var r = $resource('api/discounts/:filter', {filter:'@filter'});
        r.save({cart: cp.cart, filter: filter})
          .$promise.then(function(data){
            if(filter==='byclient'){
              cp.cart.discounts = data.discounts;
            }else{
              cp.discounts = data.discounts;
            }
        });
    }
  }

}

angular.module('kposApp')
  .directive('cartPanel', cartPanel);
