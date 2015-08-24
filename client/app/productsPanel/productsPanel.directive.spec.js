/**
 * productsPanel: directiva para generar el panel de productos ver referencia en:
 * docs/producsPanel.png.
 *
 */


'use strict';

describe('Directive: productsPanel', function () {

  // load the directive's module and view
  beforeEach(module('kposApp'));
  beforeEach(module('app/productsPanel/productsPanel.html'));

  var element, scope, $httpBackend, products, ctrl;

  beforeEach(inject(function ($rootScope, _$httpBackend_) {
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    products = [
      {_id: 1,
       name: 'Product 1',
       price: 0.99,
       featured: false,
       onSale: false
      },
      {_id: 2,
       name: 'Product 2',
       price: 0.99,
       featured: true,
       onSale: false
      },
      {_id: 3,
       name: 'Product 3',
       price: 0.99,
       featured: false,
       onSale: true
      }
    ];
  }));

  afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
  });

  /*
   * La directiva deberia hacer una llamada al endpoint /api/products
   * y obtener la lista de todos los productos disponibles, nos abstraemos de
   * pedir productos especiales por eso retornamos todos
   * */
  it('should get all the products from /api/products', inject(function ($compile) {
    element = angular.element('<products-panel></products-panel>');
    $httpBackend.expectGET('api/products').respond(products);
    element = $compile(element)(scope);
    scope.$apply();
    scope.$digest();
    $httpBackend.flush();

    ctrl = element.controller('productsPanel');
    expect(ctrl.products.length).toBe(3);
  }));

  /*
   * Deberia crear tabs con los tres tipos de productos que tenemos
   * 'All', 'onSale', 'Featured'
   * */
  it('should get all the products from /api/products', inject(function ($compile) {
    element = angular.element('<products-panel></products-panel>');
    $httpBackend.expectGET('api/products').respond(products);
    element = $compile(element)(scope);
    scope.$apply();
    scope.$digest();
    $httpBackend.flush();

    expect(element.find('tab')).toBeTruthy();
  }));



});
