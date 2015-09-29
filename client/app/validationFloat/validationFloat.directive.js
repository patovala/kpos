'use strict';

function validationFloat() {
  var directive = {
    require: 'ngModel',
    restrict: 'A',
    link: validatef
  };

  return directive;
  function validatef(scope, element, attr, ngModelCtrl) {
      function fromUser(text) {
        var transformedInput = text.replace(/[^\d\.]/g, '');
        if(transformedInput !== text) {
            ngModelCtrl.$setViewValue(transformedInput);
            ngModelCtrl.$render();
        }
        return transformedInput;
      }
      ngModelCtrl.$parsers.push(fromUser);
    }
}

angular.module('kposApp')
.directive('validationFloat', validationFloat);
