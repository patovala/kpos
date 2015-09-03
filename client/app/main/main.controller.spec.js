'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('kposApp'));
  beforeEach(module('app/main/main.html'));
  beforeEach(module('components/navbar/navbar.html'));
  var MainCtrl, scope, $httpBackend,$compile, element,templateCache;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, _$compile_,$templateCache) {
    $httpBackend = _$httpBackend_;
    $compile = _$compile_;
    templateCache=$templateCache;
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
   * Test para ingresar con un usuario válido y ponerlo en el titulo
   * ver gráfico (admin)
   * */
  it('should validate user', function(){
    expect(scope.user.name).toEqual('admin');
  });

  /* Test para comprobar la creación del div con el icono y nombre de usuario*/
  it('should exists', inject(function (){
    var viewHtml = templateCache.get('components/navbar/navbar.html');
    element = angular.element(viewHtml);
    element = $compile(element)(scope);
    scope.$digest();
    var div = element.find('label');
    expect(div.html()).toContain('admin');
    expect(div.hasClass('userinfo')).toBe(true);
  }));


  /*
   * TODO: deberia renderizar dos panels el de productos y el de cartPanel
   * */

});
