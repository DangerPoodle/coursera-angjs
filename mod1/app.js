(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
    $scope.items = "";          // the list of items
    $scope.message = "";        // our output message

    // count the comma-separated items in $scope.items and generate
    // an appropriate response in $scope.message.

    $scope.check = function() {

            // handle empty string separately, since split() always
            // returns at least 1 element, even for empty string.

        if ($scope.items === "") {
            $scope.message = "Please enter data first";
            return;
        }

            // FIXME: This counts consecutive and trailing commas
            // as items, but they should be ignored

        var nItems = $scope.items.split(',').length;
        // console.log("nItems = " + nItems);

        if (nItems <= 3) {
            $scope.message = "Enjoy!";
        } else {
            $scope.message = "Too much!";
        }
    };
}

})();
