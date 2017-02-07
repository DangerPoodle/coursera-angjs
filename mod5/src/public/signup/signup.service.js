(function () {
"use strict";

angular.module('public')
.service('SignupService', SignupService);


SignupService.$inject = ['$http', 'ApiPath'];
function SignupService($http, ApiPath) {
  var ss = this;

  ss.info = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    fav: "",
    favExists: true,
    saved: false,
    menuItem: null
  };

  ss.getInfo = function() {
    return ss.info;
  };

  ss.checkAndSave = function() {
    ss.info.fav = ss.info.fav.toUpperCase();
    var promise = getMenuItem(ss.info.fav);
    promise.then(function(xhr) {
        saveOK(xhr.data);
    }).catch(function(err) {
        saveBAD(err);
    });
  };

  function saveOK(xd) {
    ss.info.menuItem = xd;
    ss.info.saved = true;
    ss.info.favExists = true;
  };

  function saveBAD(err) {
    ss.info.menuItem = null;
    ss.info.favExists = false;
    ss.info.saved = false;
  };
  
  // returns promise
  function getMenuItem(sn)
  {
    return $http({
      method: "GET",
      url: ApiPath + "/menu_items/" + sn + ".json"
    });
  }

}

})();
