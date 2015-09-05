'use strict';

describe('Directive: cartPanel', function () {

  // load the directive's module and view
  beforeEach(module('kposApp'));
  beforeEach(module('app/cartPanel/cartPanel.html'));

  var element, scope, cartService, ctrl;

  beforeEach(inject(function ($rootScope, $compile, _cartService_) {
    scope = $rootScope.$new();
    cartService = _cartService_;
    element = angular.element('<cart-panel></cart-panel>');
    var c = {
              client: {_id: 'default', name: 'Consumidor Final', address: ''},
              items: [{quantity:1, product:'coffee', price:0.5, total:0.50}],
              subtotal: 0,
              tax: 12,
              total: 0,
              discounts: []
            };
    spyOn(cartService, 'getCart').andReturn(c);
    element = $compile(element)(scope);
  }));

  /*
  it('should make hidden element visible', inject(function () {
    scope.$apply();
    expect(element.text()).toBe('this is the cartPanel directive');
  }));
  */

  /*
   * TODO: Should render a cart with subtotal, tax and total
   * - call cartService getCart on init
   * - Should have a customer, even 'consumidor final'
   **/
  it('should render a cart', inject(function () {
    scope.$digest();
    ctrl = element.controller('cartPanel');
    expect(cartService.getCart).toHaveBeenCalled();
    //console.log(cartService.getCart());
    expect(cartService.getCart().client.name).toBe('Consumidor Final');
    expect(cartService.getCart().subtotal).toBe(0);
    expect(cartService.getCart().tax).toBe(12);
    expect(cartService.getCart().total).toBe(0);
  }));

  it('should render a cart', inject(function () {
    scope.$digest();
    expect(element.html()).toContain('ng-repeat="i in cartP.cart.items"');
  }));

  /*
   * TODO: Should allow to change the client from the dropdown
   * and reset the discounts
   * */

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
