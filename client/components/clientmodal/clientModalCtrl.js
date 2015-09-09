'use strict';

/*
 * TODO: this modal requires unit test
 * */

function ClientModalCtrl($scope, $modalInstance) {
  var vm = this;
  vm.updateClient = updateClient;
  vm.cancel = cancel;
  vm.clientForm;
  return vm;

  function updateClient(){
    if(vm.clientForm.$valid){
      console.log(vm.client.name);
       alertify.success('Success message');
       $modalInstance.close({'TODO': 'this should be the new created client'});
       reset();

    }else{
      alertify.error('Error message');
    }

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
