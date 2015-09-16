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
    var r = $resource('api/clients/add');
    r.save({client: vm.client}, function(data){
      if(data && data.resp === 'duplicated'){
        alertify.error('Client Duplicated');
      }else{
        alertify.success('Client Saved');
        $modalInstance.close();
      }
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
