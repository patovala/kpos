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

  .run(['$rootScope', '$cookies','$state', 'authenticationService','$timeout','$document','CONFIG', function(
    $rootScope, $cookies, $state, authenticationService, $timeout, $document, CONFIG){

      var timeoutSession = CONFIG.timeSession;
      var timeoutTotal = $timeout(function(){logoutByTimer();}, timeoutSession);
      var bodyElement = angular.element($document);
      bodyElement.bind('keydown keyup click mousemove DOMMouseScroll mousewheel mousedown touchstart touchmove scroll focus', function () { timeoutReset();});

    function logoutByTimer(){
      if(authenticationService.checkStatus()){
        authenticationService.logOut(authenticationService.getCookie().sessionId);
      }
    }

    function timeoutReset(){
        $timeout.cancel(timeoutTotal);
        timeoutTotal = $timeout(function(){logoutByTimer();}, timeoutSession);
    }

    $rootScope.$on('$stateChangeStart',
      function(event, toState){
        var access = authenticationService.checkStatus();
        if(toState.name.indexOf('home') > -1 && access === false){
          event.preventDefault();
          $state.go('login');
        }else{
          if(toState.name.indexOf('login') > -1 && access === true){
            event.preventDefault();
            $state.go('home');
          }
        }

      });
  }]);
