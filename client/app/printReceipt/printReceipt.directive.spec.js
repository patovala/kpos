'use strict';

describe('Directive: printReceipt', function () {

  // load the directive's module and view
  beforeEach(module('kposApp'));
  beforeEach(module('app/printReceipt/printReceipt.html'));
  beforeEach(module('app/cart/cart.html'));

  var element, scope, cartService, ctrl, rootScope;

  beforeEach(inject(function (_$rootScope_, $compile, _cartService_) {
    scope = _$rootScope_.$new();
    rootScope = _$rootScope_;
    cartService = _cartService_;
    element = angular.element('<print-receipt></print-receipt>');
    element = $compile(element)(scope);
    scope.$digest();
    ctrl = element.controller('printReceipt');
  }));

    it('calls the cartService for resetCart ', function () {
    spyOn(cartService, 'resetCart');
    ctrl.newOrder();
    expect(cartService.resetCart).toHaveBeenCalled();
  });

    it('calls the cartService for resetClient', function () {
    spyOn(cartService, 'resetClient');
    ctrl.newOrder();
    expect(cartService.resetClient).toHaveBeenCalled();
  });

    it('calls the rootScope for change the changePanel ', function () {
    spyOn(rootScope, '$emit');
    ctrl.newOrder();
    expect(rootScope.$emit).toHaveBeenCalledWith('changePanel',1);
  });

  it('calls the newOrder for change for create the windows of print ', function () {
    spyOn(window,'print');
    ctrl.printTicked();
    expect(window.print).toHaveBeenCalled();
  });

});
