'use strict';

describe('Directive: validationInteger', function () {

  // load the directive's module and view
  beforeEach(module('kposApp'));
  beforeEach(module('app/validationInteger/validationInteger.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<validation-integer></validation-integer>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the validationInteger directive');
  }));
});