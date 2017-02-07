(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['SignupService', 'ApiPath'];
function MyInfoController(SignupService, ApiPath) {
  var sc = this;

  sc.info = SignupService.getInfo();
  sc.basePath = ApiPath;
}


})();
