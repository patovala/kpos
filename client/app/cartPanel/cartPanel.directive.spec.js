'use strict';

describe('Directive: cartPanel', function () {

  // load the directive's module and view
  beforeEach(module('kposApp'));
  beforeEach(module('app/cartPanel/cartPanel.html'));

  var element, scope, cartService, ctrl, $httpBackend, cart;

  beforeEach(inject(function ($rootScope, $compile, _cartService_, _$httpBackend_) {
    scope = $rootScope.$new();
    cartService = _cartService_;
    $httpBackend = _$httpBackend_;

    element = angular.element('<cart-panel></cart-panel>');
    cart = {
              client: {_id: 'default', name: 'Consumidor Final', address: ''},
              items: [{quantity:1, product:'coffee', price:0.5, total:0.50}],
              subtotal: 0,
              tax: 12,
              total: 0,
              discounts: []
            };
    spyOn(cartService, 'getCart').andReturn(cart);
    element = $compile(element)(scope);
    scope.$digest();

    ctrl = element.controller('cartPanel');
  }));

  afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
  });

  /*
   * Should render a cart with subtotal, tax and total
   * - call cartService getCart on init
   * - Should have a customer, even 'consumidor final'
   **/
  it('should render a cart', inject(function () {
    expect(cartService.getCart).toHaveBeenCalled();
    //console.log(cartService.getCart());
    expect(cartService.getCart().client.name).toBe('Consumidor Final');
    expect(cartService.getCart().subtotal).toBe(0);
    expect(cartService.getCart().tax).toBe(12);
    expect(cartService.getCart().total).toBe(0);
  }));

  it('should render items from a cart', inject(function () {
    expect(element.html()).toContain('ng-repeat="i in cp.cart.items"');
  }));

  /*
   * Should allow to search for clients from the dropdown
   * */
  it('should trigger search for client from input', inject(function(){
    ctrl.searchClient('jua');

    $httpBackend.expectGET('api/clients?query=jua').respond([{'name': 'juanito'}]);
    $httpBackend.flush();

    // the selected client should be the defaultClient
    expect(ctrl.cart.client._id).toBe(ctrl.defaultClient._id);
  }));

  /*
   * TODO: If the client is changed it should reset the cart discounts and
   *        set the new client
   */
  it('should reset the discount and set the new client', inject(function(){
    spyOn(cartService, 'resetDiscounts').andCallThrough();
    ctrl.selectedClient = {_id: '12', name: 'Juanito Pigueave', address: ''};

    ctrl.changeClient({client:{_id:1}}, {}, 'label');

    // the selected client should be the defaultClient
    expect(ctrl.cart.client._id).toBe(ctrl.selectedClient._id);
    expect(cartService.resetDiscounts).toHaveBeenCalled();
  }));


  /*
   * TODO: Should allow to change the quantity
   * and reset the discounts
   * */

  /*
   * TODO: Should allow to delete the entire item row
   * and reset the discounts
   * */

  /*
   * TODO: Should open the new client modal to create new
   * clients
   * */

  /*
   * TODO: Should add discount if the selected client has
   * discount, should call cartService to add a new
   * discount, the api should be:
   * /api/discounts?_id='byo' returns a nounce for the discount
   * in this cart. This should be POST to add the cart
   * */

  /*
   * TODO: Should not add a discount if the api denies
   * the discount maybe /api/discounts?_id='byo' returns
   * not allowed.
   * */

  /*
   * TODO; Deberia permitir agregar otro tipo de descuento
   * ej. BYO (bring your own mug)
   * */

});
