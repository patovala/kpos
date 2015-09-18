'use strict';

describe('Directive: checkoutPanel', function () {

  // load the directive's module and view
  beforeEach(module('kposApp'));
  beforeEach(module('app/checkoutPanel/checkoutPanel.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  /*
   * TODO: volar este
   * */
  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<checkout-panel></checkout-panel>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the checkoutPanel directive');
  }));

  /*
   * TODO:should get the cart when loaded
   * */

  /*
   * When the user enters the ammount tendered, the directive should
   * resolve the change
   * */

  /*
   * Should call backend when checkout button is pressed, the call
   * should get the cart
   * */

});
