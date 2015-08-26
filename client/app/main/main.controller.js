'use strict';

angular.module('kposApp')
  .controller('MainCtrl', function ($scope) {
    // $scope.awesomeThings = [];
    // $http.get('/api/things').success(function(awesomeThings) {
    //   $scope.awesomeThings = awesomeThings;
    // });
    var user = {
      name: 'admin',
      iduser: 0,
      idsession: 0,
      image: 'assets/images/usericon.png'
    };

    $scope.user = user;
  });
