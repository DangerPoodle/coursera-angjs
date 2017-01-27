(function () {
'use strict';

angular.module('Data')
.controller("CatController", CatController);

CatController.$inject = ['menuCategories'];
function CatController(menuCategories) {
    var cc = this;

    cc.menuCategories = menuCategories;
}

})();
