'use strict';

describe('Directive: popupField', function () {

  // load the directive's module and view
  beforeEach(module('kposApp'));
  beforeEach(module('app/popupField/popupField.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<popup-field></popup-field>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the popupField directive');
  }));
});
