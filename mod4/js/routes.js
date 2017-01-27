(function () {
'use strict';

angular.module('MenuApp').config(Routecfg);

Routecfg.$inject = ['$stateProvider', '$urlRouterProvider'];
function Routecfg($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'tpl/home.tpl.html'
    })

    .state('categories', {
        url: '/cat',
        controller: 'CatController as cc',
        templateUrl: 'tpl/categories.tpl.html',
        resolve: {
            menuCategories: ['MenuDataService', function(mds) {
                return mds.getAllCategories().then(function(xhr) {
                    return xhr.data;
                })
            }]
        }
    })

    .state('items', {
        url: '/items/:sn',
        controller: 'ItemsController as ic',
        templateUrl: 'tpl/items.tpl.html',
        resolve: {
            items: ['MenuDataService', '$stateParams',
                function(mds, $stateParams) {
                    return mds.getItemsForCategory($stateParams.sn)
                    .then(function(xhr) {
                        return xhr.data;
                    });
                }
            ]
        }
    });
}

})();
