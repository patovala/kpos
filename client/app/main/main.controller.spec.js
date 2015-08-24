'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('kposApp'));

  var MainCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    //$httpBackend.expectGET('/api/things')
    //  .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  //it('should attach a list of things to the scope', function () {
  //  $httpBackend.flush();
  //  expect(scope.awesomeThings.length).toBe(4);
  //});

  /*
   * TODO: Deberia ingresar con un usuario válido y ponerlo en el titulo
   * ver gráfico (admin)
   * */

  /*
   * TODO: deberia renderizar dos panels el de productos y el de cartPanel
   * */

});
