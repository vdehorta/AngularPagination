"use strict";

var angularPrmApp = angular.module('angularPrmApp', ['$strap.directives']);

angularPrmApp.config(function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'partials/home.html',
            controller : 'homeController'
        })
        .otherwise({
            redirectTo: '/home'
        });
});