'use strict';

describe('Directive: checkoutPanel', function () {

  // load the directive's module and view
  beforeEach(module('kposApp'));
  beforeEach(module('app/checkoutPanel/checkoutPanel.html'));
  beforeEach(module('app/main/partials/login.html'));
  beforeEach(module('app/main/main.html'));

  var element, scope, cartService, ctrl, $httpBackend;

  beforeEach(inject(function ($rootScope, _cartService_, $compile, _$httpBackend_) {
    scope = $rootScope.$new();
    cartService = _cartService_;
    $httpBackend = _$httpBackend_;
    element = angular.element('<checkout-panel></checkout-panel>');
    spyOn(cartService, 'getCart');
    element = $compile(element)(scope);
    scope.$digest();
    ctrl = element.controller('checkoutPanel');
  }));

  afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
  });

  it('should get the cart when loaded ', function () {
    spyOn(cartService, 'getTotalCart');
    ctrl.getTotalCheck();
    expect(cartService.getTotalCart).toHaveBeenCalled();
  });

  it('should call backend when the payment process button is pressed', function () {
    ctrl.cart = {
      client: {
        _id: '02',
        name: 'juanito alimana',
      },
      items: []
    };

    ctrl.order = {
      user: ctrl.cart.client.name,
      cart: ctrl.cart,
      dateCreated: Date.now(),
      paymentMethods: []
    };

    cartService.setCart(ctrl.cart);
    $httpBackend.expectPOST('api/orders/new').respond(ctrl.order);
    ctrl.processPayment();
    $httpBackend.flush();

    //also should do it only if payment method totals are > cart total
    expect(ctrl.order.paymentMethods).toBeTruthy();


  });

  /*Calcular el cambio del CART en base al ingreso del cliente y
   el total del cart*/
  it('should get the change of cart ', function () {
    spyOn(cartService, 'getTotalCart').andReturn(2);
    ctrl.cashPayment.amountTendered = 5;
    expect(ctrl.getChangeCheck()).toEqual(3);
  });

  it('should get the change of cart 2', function () {
    spyOn(cartService, 'getTotalCart').andReturn(3.75);
    ctrl.cashPayment.amountTendered= 5;
    expect(ctrl.getChangeCheck()).toEqual(1.25);
  });

});
