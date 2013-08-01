"use strict";

angularPrmApp.directive('search', function ($timeout, $routeParams) {
    return {
        restrict:'E',
        replace:true,
        template:'<input type="hidden" style="width: 300px;"/>',
        scope: { data: '=', favorite: '='},
        link:function (scope, element, attrs, ctrl) {
            $timeout(element.select2({
                placeholder: "Search",
                tags :["name : psg", "name : nantes", "name : bordeaux", "field5 : r8"],
                tokenSeparators: [","]
            }),0);
            var currentValues = null;
            try {
                currentValues = $routeParams.searchQueries;
            } catch (err) {
                currentValues = null;
            }
            if (currentValues) {
                $("#searchId").val(currentValues).trigger("change");
            }
            element.bind("change", function(){
                var currentFilter = $("#searchId").val();
                console.log("change " + currentFilter.split(","));
                scope.$emit("FilterChanged", currentFilter.split(","));
            });

        }
    }
});
