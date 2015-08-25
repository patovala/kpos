'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('kposApp'));

  var MainCtrl,
      scope,
      $httpBackend,$templateCache,$compile;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, _$templateCache_,_$compile_) {
    $httpBackend = _$httpBackend_;
    $templateCache = _$templateCache_;
    $compile = _$compile_;
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
  it('should validate user', function(){
    expect(scope.user.name).toEqual('admin');
  });

  it('should exists', function(){
            var html = $templateCache.get('main.html');
            var view = $compile(angular.element(html))(scope);
            scope.$digest(); 
            expect(view.find('#username')).toBe('admin');
        });


  /*
   * TODO: deberia renderizar dos panels el de productos y el de cartPanel
   * */

});
