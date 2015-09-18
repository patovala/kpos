'use strict';

describe('Directive: checkoutPanel', function () {

  // load the directive's module and view
  beforeEach(module('kposApp'));
  beforeEach(module('app/checkoutPanel/checkoutPanel.html'));

  var element, scope, cartService, ctrl;

  beforeEach(inject(function ($rootScope, _cartService_,$compile) {
    scope = $rootScope.$new();
    cartService = _cartService_;
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

});
