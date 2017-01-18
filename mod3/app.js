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
    nid.showFound = false;

    nid.narrow = function() {
        MenuSearchService.getMatchedMenuItems(nid.stext)
        .then(function(foundItems) {
            nid.found = foundItems;
            nid.showFound = true;
        }).catch(function(error) {
            console.log("ERROR: " + error);
        });

    }

    nid.hideFound = function() {
        nid.showFound = false;
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

    // actually do the matching.  Only the description field is searched.
    // As a special case, passing an empty or whitespace-only string for
    // txt matches nothing.
    function doMatch(txt, data) {
        var ret = [];
        var ltxt = txt.trim().toLowerCase();
        
        if (ltxt == "")
            return ret;

        for (var i = 0; i < data.menu_items.length; i++) {
            var d = data.menu_items[i];
            if (d.description.toLowerCase().indexOf(ltxt) >= 0)
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
            showFound: '<',
            onRemove: '&'
        }
    };

    return ddo;
}

})();
