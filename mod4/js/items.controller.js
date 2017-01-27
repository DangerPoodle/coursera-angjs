(function () {
'use strict';

angular.module('Data')
.controller("ItemsController", ItemsController);

ItemsController.$inject = ['items'];
function ItemsController(Items) {
    var ic = this;

    ic.items = Items;
}

})();
