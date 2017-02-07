(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['SignupService'];
function SignupController(SignupService) {
  var sc = this;

  sc.info = SignupService.getInfo();

  sc.save = function() {
    SignupService.checkAndSave();
  }
}


})();
