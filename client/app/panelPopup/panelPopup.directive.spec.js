'use strict';

describe('Directive: panelPopup', function () {

  // load the directive's module and view
  beforeEach(module('kposApp'));
  beforeEach(module('app/panelPopup/panelPopup.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<panel-popup></panel-popup>');
    element = $compile(element)(scope);
    scope.$apply();
    //expect(element.text()).toBe('this is the panelPopup directive');
  }));
});
