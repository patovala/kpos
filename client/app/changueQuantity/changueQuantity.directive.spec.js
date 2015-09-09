'use strict';

describe('Directive: changueQuantity', function () {

  // load the directive's module and view
  beforeEach(module('kposApp'));
  beforeEach(module('app/changueQuantity/changueQuantity.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<changue-quantity></changue-quantity>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the changueQuantity directive');
  }));
});