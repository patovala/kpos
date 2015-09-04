'use strict';

angular.module('kposApp')
  .directive('cartPanel', function () {
    return {
      templateUrl: 'app/cartPanel/cartPanel.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });