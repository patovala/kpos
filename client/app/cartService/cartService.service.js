'use strict';

angular.module('kposApp')
  .service('cartService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      addToCart: function(id){ return id;}
    };
  });
