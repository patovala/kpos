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
  });
