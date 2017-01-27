(function () {
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http'];

function MenuDataService($http)
{
    var mds = this;

    mds.getAllCategories = function()
    {
        var promise = $http({
            method: "GET",
            url: "https://davids-restaurant.herokuapp.com/categories.json"
        });

        return promise;
    }

    mds.getItemsForCategory = function(catShortName)
    {
        var promise = $http({
            method: "GET",
            url: "https://davids-restaurant.herokuapp.com/menu_items.json",
            params: { "category": catShortName }
        });

        return promise;
    }
}

})();
