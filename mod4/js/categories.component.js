(function () {
'use strict';

angular.module('Data')
.component('categories', {
    templateUrl: 'tpl/categories.tpl.html',
    bindings: {
        menuCategories: '<'
    }
});
    

})();
