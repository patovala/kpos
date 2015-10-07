'use strict';

function mainController(CONFIG) {
  var mc = this;

  mc.user = {
    name: 'admin',
    iduser: 0,
    idsession: 0,
    image: 'assets/images/usericon.png'
  };

  mc.checkout = false;
  mc.togglePanel = togglePanel;
  mc.logo = CONFIG.logo;

  return mc;

  function togglePanel() {
    mc.checkout = !mc.checkout;
  }
}

angular.module('kposApp')
  .controller('MainCtrl', mainController);
