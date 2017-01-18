(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.directive('foundItems', FoundItemsDirective)
.service('MenuSearchService', MenuSearchService);

NarrowItDownController.$inject = ['MenuSearchService', '$q'];

function NarrowItDownController(MenuSearchService, $q) {
    var nid = this;

    nid.stext = "";
    nid.found = [];

    nid.narrow = function() {
        MenuSearchService.getMatchedMenuItems(nid.stext)
        .then(function(foundItems) {
            nid.found = foundItems;
        }).catch(function(error) {
            console.log("ERROR: " + error);
        });

    }

    nid.onRemove = function(index) {
        this.found.splice(index, 1);
    }
}

MenuSearchService.$inject = ['$http'];

function MenuSearchService($http) {
    var mss = this;

    // returns promise
    mss.getMatchedMenuItems = function(txt) {

        var foundItems = [];
        var promise = $http({
            method: "GET",
            url:    "https://davids-restaurant.herokuapp.com/menu_items.json"
        }).then(function(resp) {
            return doMatch(txt, resp.data);
        });

        return promise;
    }

    // actually do the matching.  Only the short_name, name,
    // and description fields are searched.
    function doMatch(txt, data) {
        var ret = [];
        var ltxt = txt.toLowerCase();

        for (var i = 0; i < data.menu_items.length; i++) {
            var d = data.menu_items[i];
            if ((d.description.toLowerCase().indexOf(ltxt) >= 0) ||
                (d.name.toLowerCase().indexOf(ltxt) >= 0)        ||
                (d.short_name.toLowerCase().indexOf(ltxt) >= 0)
            )
                ret.push(d);
        }
 
        return ret;
    }
}

function FoundItemsDirective()
{
    var ddo = {
        templateUrl: 'foundItems.html',
        scope: {
            found: '<',
            onRemove: '&'
        }
    };

    return ddo;
}

})();
