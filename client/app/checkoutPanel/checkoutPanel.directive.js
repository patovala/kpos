'use strict';

angular.module('kposApp')
  .directive('checkoutPanel', function () {
    return {
      templateUrl: 'app/checkoutPanel/checkoutPanel.html',
      restrict: 'EA',
      link: function () {
      }
    };
  });
