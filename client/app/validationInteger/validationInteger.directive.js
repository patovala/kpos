'use strict';

function validationInteger() {
  var directive = {
    require: 'ngModel',
    restrict: 'A',
    link: validatei
  };

  return directive;
  function validatei(scope, element, attr, ngModelCtrl) {
      function fromUser(text) {
        var transformedInput = text.replace(/[^0-9]/g, '');
        if(transformedInput !== text) {
          console.log(transformedInput);
            ngModelCtrl.$setViewValue(transformedInput);
            ngModelCtrl.$render();
        }
        return transformedInput;
      }
      ngModelCtrl.$parsers.push(fromUser);
    }
}

angular.module('kposApp')
.directive('validationInteger', validationInteger);
