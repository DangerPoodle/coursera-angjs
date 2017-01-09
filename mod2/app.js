(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];

function ToBuyController(ShoppingListCheckOffService) {
    var tobuy = this;

    tobuy.items = ShoppingListCheckOffService.getItemsToBuy();

    tobuy.buyItem = function(itemIndex) {
        ShoppingListCheckOffService.buyItem(itemIndex);
    }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;

    bought.items = ShoppingListCheckOffService.getItemsBought();
}

function ShoppingListCheckOffService() {
    var service = this;

    var itemsToBuy = [
        { name: "cat food", quantity: 2},
        { name: "catnip",   quantity: 1},
        { name: "cat videos", quantity: 8},
        { name: "cat toys", quantity: 3},
        { name: "cat art", quantity: 4},
        { name: "cat magazine", quantity: 1},
        { name: "cat treats", quantity: 5}
        ];
    var itemsBought = [];

    service.getItemsToBuy = function() {
        return itemsToBuy;
    }

    service.getItemsBought = function() {
        return itemsBought;
    }

    service.buyItem = function(itemIndex) {
        //console.log("buy item " + itemIndex);
        if ( (itemIndex < 0) || (itemIndex >= itemsToBuy.length) )
            return;     // FIXME: throw an error
        itemsBought.push(itemsToBuy[itemIndex]);
        itemsToBuy.splice(itemIndex, 1);
    }

}

})();
