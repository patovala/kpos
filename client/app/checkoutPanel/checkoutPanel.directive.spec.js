'use strict';

describe('Directive: checkoutPanel', function () {

  // load the directive's module and view
  beforeEach(module('kposApp'));
  beforeEach(module('app/checkoutPanel/checkoutPanel.html'));

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

  it('should get the cart when loaded ', function () {
    spyOn(cartService, 'getTotalCart');
    ctrl.getTotalCheck();
    expect(cartService.getTotalCart).toHaveBeenCalled();
  });

  it('should call backend whe the payment process button is pressed', function () {
    ctrl.cart = {
      client: {
        _id: '02',
        name: 'juanito alimana',
      },
      items: []
    };

    ctrl.paymentProcess();

    $httpBackend.expectPOST('api/orders/newOrder',{cart: ctrl.cart}).respond({});
    $httpBackend.flush();

  });

});
