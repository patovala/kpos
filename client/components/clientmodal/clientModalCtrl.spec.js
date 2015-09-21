/*jshint -W030 */
'use strict';
describe('Controller: clientModalCtrl', function () {
  beforeEach(module('kposApp'));
  beforeEach(module('components/clientmodal/clientModal.html'));
  // load the controller's module
  var clientModalCtrl, $httpBackend, modalInstanceMock, scope, dependencies, $resource, client;
    // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, _$resource_) {
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    $resource = _$resource_;
    modalInstanceMock = {
          close: function () {
          }
      };
    client = {
      name:'Jorge',
      address:'Sauces norte',
      dni:'1104697187'
    };
    dependencies = {
      $scope: scope,
      $modalInstance:modalInstanceMock,
      $resource: $resource
    },
    clientModalCtrl = $controller('clientModalCtrl as vm', dependencies);
  }));

  describe('#newClientModal', function () {
    it('#newClientModal save Client', function(){
      spyOn(modalInstanceMock, 'close');
      clientModalCtrl.client = client;

      $httpBackend.expectPOST('api/clients/add',
        { client: client}).respond(201);

      clientModalCtrl.updateClient();

      $httpBackend.flush();
      expect(modalInstanceMock.close).toHaveBeenCalled();
    });
  });
});
