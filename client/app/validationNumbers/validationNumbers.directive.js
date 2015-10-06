'use strict';

function validationNumbers() {
  var directive = {
    require: 'ngModel',
    restrict: 'A',
    scope: {
      validationType: '@'
    },
    link: validate
  };

  return directive;
  function validate(scope, element, attr, ngModelCtrl) {
      function fromUser(text) {
        var transformedInput;
        if (scope.validationType) {
          if ('integer' === scope.validationType){
            transformedInput = text.replace(/[^0-9]/g, '');
          }

          if ('float' === scope.validationType){
            transformedInput = text.replace(/[^\d\.]/g, '');
          }
        }

        if (transformedInput) {
          if (transformedInput !== text) {
              ngModelCtrl.$setViewValue(transformedInput);
              ngModelCtrl.$render();
          }
          return transformedInput;
        }
      }
      ngModelCtrl.$parsers.push(fromUser);
    }
}

angular.module('kposApp')
.directive('validationNumbers', validationNumbers);
