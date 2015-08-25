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

  var element, scope, $httpBackend, products, ctrl, cartService;

  beforeEach(inject(function ($rootScope, _$httpBackend_, $compile, _cartService_) {
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    cartService = _cartService_;

    products = [
      {_id: 1,
       name: 'Product 1',
       image: 'path/to/image',
       price: 0.99,
       featured: false,
       onSale: false
      },
      {_id: 2,
       name: 'Product 2',
       image: 'path/to/image',
       price: 0.99,
       featured: true,
       onSale: false
      },
      {_id: 3,
       name: 'Product 3',
       image: 'path/to/image',
       price: 0.99,
       featured: false,
       onSale: true
      }
    ];

    element = angular.element('<products-panel></products-panel>');
    $httpBackend.expectGET('api/products').respond(products);
    element = $compile(element)(scope);
    scope.$digest();

    $httpBackend.flush();

    ctrl = element.controller('productsPanel');
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
  it('should get all the products from /api/products', inject(function () {
    expect(ctrl.products.length).toBe(3);
  }));

  /*
   * Deberia crear tabs con los tres tipos de productos que tenemos
   * 'All', 'onSale', 'Featured'
   * */
  it('should get all the products from /api/products', inject(function () {
    expect(element.find('tab')).toBeDefined();
    expect(element.html()).toContain('heading="All"');
    expect(element.html()).toContain('heading="Featured"');
    expect(element.html()).toContain('heading="On Sale"');

    //other way to get elements from the compiled node: this one gets the ul
    //from the tabset
    //console.log('DEBUG', element.find('div').find('ul'));
  }));

  /*
   * Deberia la directiva generar el input para busqueda de productos
   * */
  it('should have a search input for search for product', inject(function () {
    //expect(element.html()).toContain('input');
    expect(element.find('input').attr('type')).toBe('text');
    expect(element.find('input').attr('ng-model')).toBe('searchTerm');
  }));

  /*
   * No debe llamar al search si el query tiene menos de 3 caracteres
   * Al escribir en el 3er elemento del search deberia llamar al api para
   * buscar el producto con nombre 'searchTerm' y enviar el request al backend
   *
   * */
  it('should have a search input for search for product', inject(function () {
    scope.searchTerm = 'ab';
    ctrl.search();

    ctrl.searchTerm = 'abcd';
    ctrl.search();

    $httpBackend.expectGET('api/products/abcd').respond([{'name': 'abc'}]);
    $httpBackend.flush();
  }));


  /*
   * Al hacer click en el boton (+) Deberia agregar al cartService el producto
   * como un item solo
   * */
  it('should call to cartService on click', inject(function () {
    spyOn(cartService, 'addToCart').andCallThrough();
    ctrl.addToCart(1);

    expect(cartService.addToCart).toHaveBeenCalled();
  }));

});
