'use strict';

/*
 * TODO: this modal requires unit test
 * */

function ClientModalCtrl($scope, $modalInstance) {

  $scope.update = function () {
    $modalInstance.close({'TODO': 'this should be the new created client'});
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}

angular.module('kposApp')
  .controller('clientModalCtrl', ClientModalCtrl);
