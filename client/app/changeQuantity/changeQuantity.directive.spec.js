'use strict';

describe('Directive: changeQuantity', function () {

  // load the directive's module and view
  beforeEach(module('kposApp'));
  beforeEach(module('app/changeQuantity/changeQuantity.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<change-quantity></change-quantity>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the changeQuantity directive');
  }));
});