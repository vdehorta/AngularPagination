"use strict";

angularPrmApp.controller("homeController" ,function ($scope) {
});

angularPrmApp.controller("SearchCtrl" ,function ($scope, $filter, UtilSrvc) {
});

angularPrmApp.controller("MyCtrl" ,function ($location, $scope, $filter, UtilSrvc, $routeParams) {

    $scope.searchObject={};

    $scope.currentPage = $routeParams.currentPage;


    if (!$scope.currentPage) {
        $scope.currentPage = 0;
    }

    $scope.searchObject.currentPage = $scope.currentPage;

    console.log("currentPage is ");
    console.log($scope.currentPage);



    $scope.itemsPerPage = 5;
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.pagedItems = [];
    $scope.items = [
        {"id":"01","name":"nantes","description":"club de foot","field3":"petit","field4":"ligue 1","field5":"r8"},
        {"id":"02","name":"guingamp","description":"club de tennis","field3":"petit","field4":"ligue 1","field5":"r8"},
        {"id":"03","name":"rennes","description":"club de foot","field3":"grand","field4":"ligue 1","field5":"r8"},
        {"id":"04","name":"psg","description":"club de tennis","field3":"grand","field4":"ligue 1","field5":"r8"},
        {"id":"05","name":"bordeaux","description":"club de foot","field3":"moyen","field4":"ligue 1","field5":"r8"},
        {"id":"06","name":"toulouse","description":"club de tennis","field3":"moyen","field4":"ligue 1","field5":"r8"},
        {"id":"07","name":"lille","description":"club de foot","field3":"grand","field4":"ligue 1","field5":"r8"},
        {"id":"08","name":"strasbourg","description":"club de tennis","field3":"moyen","field4":"ligue 1","field5":"r9"},
        {"id":"09","name":"nantes2","description":"club de foot","field3":"petit","field4":"ligue 1","field5":"r9"},
        {"id":"10","name":"guingamp2","description":"club de tennis","field3":"petit","field4":"ligue 1","field5":"r9"},
        {"id":"11","name":"rennes2","description":"club de foot","field3":"grand","field4":"ligue 1","field5":"r9"},
        {"id":"12","name":"psg2","description":"club de tennis","field3":"grand","field4":"ligue 1","field5":"r9"},
        {"id":"13","name":"bordeaux2","description":"club de foot","field3":"moyen","field4":"ligue 1","field5":"r9"},
        {"id":"14","name":"toulouse2","description":"club de tennis","field3":"moyen","field4":"ligue 1","field5":"r9"},
        {"id":"15","name":"lille2","description":"club de foot","field3":"grand","field4":"ligue 1","field5":"r9"},
        {"id":"16","name":"strasbourg2","description":"club de tennis","field3":"moyen","field4":"ligue 1","field5":"r9"}
    ];


// init the filtered items
    $scope.search = function (queryTerms) {
        $scope.filteredItems = angular.copy($scope.items);
        // now group by pages
        $scope.groupToPages();
    };



    // calculate page in place
    $scope.groupToPages = function () {
        $scope.pagedItems = [];

        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
    };

    $scope.range = function (start, end) {
        var ret = [];
        if (!end) {
            end = start;
            start = 0;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        return ret;
    };

    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
            UtilSrvc.safeApply($scope, function() {
                $scope.searchObject.currentPage = $scope.currentPage;
                $location.search($scope.searchObject);
            });

        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
            UtilSrvc.safeApply($scope, function() {
                $scope.searchObject.currentPage = $scope.currentPage;
                $location.search($scope.searchObject);
            });
        }
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    $scope.search($scope.searchQueries);

});
