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
              items: [
                {
                  _id: 1,
                  name: 'Product 1',
                  price: 0.99,
                  quantity: 1
                }
              ],
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

  it('should add discount to cart', function () {
    var discount = {
      type: 'value',
      valor: 3
    };

    cartService.addDiscount(discount);

    expect(cartService.getCart().discounts).toContain(discount);
  });

  it('should set a client for the cart', function () {
    var client = {
      _id: '1',
      name: 'Janina'
    };
    cartService.setClient(client);

    expect(cartService.getCart().client).toEqual(client);
  });

  it('should change the tax in the cart', function () {
    cartService.changeTax(13);

    expect(cartService.getCart().tax).toEqual(13);
  });

  it('should update the quantity of an item in the cart', function () {
    $httpBackend.expectGET('api/products?_id=1').respond(products[0]);
    cartService.addToCart(1);

    $httpBackend.flush();

    cart.items[0].quantity = 4;

    cartService.updateItemQuantity(cart.items[0]);
    expect(cartService.getCart().items[0].quantity).toEqual(4);
  });
});
