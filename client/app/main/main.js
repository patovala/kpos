'use strict';

angular.module('kposApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'app/main/partials/login.html',
        controller: 'MainCtrl',
        controllerAs: 'mc'
      })
      .state('home', {
        url: '/home',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'mc'
      });
  })

  .run(['$rootScope', '$cookies','$state', 'authenticationService', function($rootScope, $cookies, $state, authenticationService){


    $rootScope.$on('$stateChangeStart',
      function(event, toState){
        var access = authenticationService.checkStatus();
        if(toState.name.indexOf('home') > -1 && access === false){
          console.log('noooo');
          event.preventDefault();
          $state.go('login');
        }else{
          if(toState.name.indexOf('login') > -1 && access === true){
            console.log('siiiii');
            event.preventDefault();
            $state.go('home');
          }
        }

      });
  }]);
