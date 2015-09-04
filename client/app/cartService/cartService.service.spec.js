'use strict';

describe('Service: cartService', function () {

  // load the service's module
  beforeEach(module('kposApp'));

  // instantiate service
  var cartService, cart, products, $httpBackend, $rootScope;
  beforeEach(inject(function (_cartService_, _$httpBackend_, _$rootScope_) {
    cartService = _cartService_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;

    cart = {
              client: {_id: 'defualt', name: 'Consumidor Final', address: ''},
              items: [],
              subtotal: 0,
              tax: 12,
              total: 0,
              discounts: []
          };

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

  }));

  afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
  });

  it('should add to cart by id and do the broadcast', function () {
    spyOn($rootScope, '$broadcast').andCallThrough();
    $httpBackend.expectGET('api/products?_id=1').respond(products[0]);
    expect(!!cartService.addToCart).toBe(true);

    cartService.addToCart(1).$promise.then(
      function(){console.log('look! with promises');}
    );
    $httpBackend.flush();

    expect(cartService.getCart().items.map(
      function(e){return e._id;}
    )).toContain(1);

    expect($rootScope.$broadcast).toHaveBeenCalledWith(
      '_new_item_added_',
      jasmine.objectContaining({_id:1})
    );

  });

  it('should remove from cart one by one by id', function () {
    expect(!!cartService.removeFromCart).toBe(true);
    $httpBackend.expectGET('api/products?_id=1').respond(products[0]);

    cartService.addToCart(1);
    $httpBackend.flush();

    cartService.removeFromCart(1);

    expect(cartService.getCart().items.map(
      function(e){return e._id;}
    )).not.toContain(1);
  });

  /*
   * TODO: crear un método para agregar descuentos
   * el descuento deberia ser un objeto que descuente por porcentaje
   * o por valor {'tipo': 'porcentaje', 'monto': 12}
   * */

  /*
   * TODO: should set a client for the cart
   * */

  /*
   * TODO: should change the tax in the cart
   * */

  /*
   * TODO: should update the qty for an item in the cart
   * */
});
