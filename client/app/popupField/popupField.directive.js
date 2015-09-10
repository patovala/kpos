'use strict';

angular.module('kposApp')
  .directive('popupField', function () {
    return {
      templateUrl: 'app/popupField/popupField.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });