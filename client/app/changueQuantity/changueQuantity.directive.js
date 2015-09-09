'use strict';

angular.module('kposApp')
  .directive('changueQuantity', function () {
    return {
      templateUrl: 'app/changueQuantity/changueQuantity.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });