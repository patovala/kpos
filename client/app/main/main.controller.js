'use strict';

function mainController($location, CONFIG, authenticationService, $cookies) {
    var mc = this;

    mc.user = $cookies.getObject('user') ? $cookies.getObject('user') : null;
    mc.checkout = false;
    mc.togglePanel = togglePanel;
    mc.logo = CONFIG.logo;
    mc.logIn = logIn;
    mc.logOut = logOut;

  return mc;

  function togglePanel() {
    mc.checkout = !mc.checkout;
  }

    function logIn(){
        authenticationService.logIn(mc.usuer.userName,mc.usuer.password).then(function(data){
            if(data){
                $location.path('/home');
                alertify.success('Good login');
            }else{
                $location.path('/');
                alertify.error('Invalid credentials');
            }
        });
    }

    function logOut(){
        authenticationService.logOut();
        $location.path('/login');
    }

}

angular.module('kposApp')
  .controller('MainCtrl', mainController);
