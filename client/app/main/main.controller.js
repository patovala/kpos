'use strict';

angular.module('kposApp')
  .controller('MainCtrl', function ($scope, $http) {
    // $scope.awesomeThings = [];
    // $http.get('/api/things').success(function(awesomeThings) {
    //   $scope.awesomeThings = awesomeThings;
    // });
  	var user = new Object();
  	user.name = "admin";
    $scope.nombre="admin";
    user.iduser= 0;
    user.idsession=0;
    user.image = "assets/images/usericon.png"
    $scope.user = user;
  });