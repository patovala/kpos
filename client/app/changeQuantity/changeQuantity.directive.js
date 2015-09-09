'use strict';

angular.module('kposApp')
  .directive('changeQuantity', function () {
    return {
      templateUrl: 'app/changeQuantity/changeQuantity.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });