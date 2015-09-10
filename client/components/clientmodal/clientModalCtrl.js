'use strict';

/*
 * TODO: this modal requires unit test
 * */

function ClientModalCtrl($scope, $modalInstance, $resource) {
  var vm = this;
  vm.updateClient = updateClient;
  vm.cancel = cancel;
  reset();
  return vm;

  function updateClient(){
    var r = $resource('api/clients');
    r.save({client: vm.client}, function(){
        alertify.success('Client Created');
        $modalInstance.close();
    });

  }
  function reset(){
    vm.client = { name:'', address:'', dni:''};
  }
  function cancel(){
    $modalInstance.dismiss('cancel');
  }

}

angular.module('kposApp')
  .controller('clientModalCtrl', ClientModalCtrl);
