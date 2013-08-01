"use strict";

"use strict";

angularPrmApp.service("UtilSrvc", function () {

    return {
        dynamicSort : function(property) {
            var sortOrder = 1;
            if(property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1, property.length - 1);
            }
            return function (a,b) {
                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            }
        },
        safeApply: function (scope, fn) {
            var phase = scope.$root.$$phase;
            if(phase == '$apply' || phase == '$digest')
                scope.$eval(fn);
            else
                scope.$apply(fn);
        },
        strContains: function(a, b) {
            var result = false;
            if (this.isAString(a) && this.isAString(b)) {
                result = (a.indexOf(b) !== -1);
            }
            return result;
        } ,
        isAString: function(o) {
            return typeof o == "string" || (typeof o == "object" && o.constructor === String);
        } ,
        isAnArray: function(o) {
            return Object.prototype.toString.call( o ) === '[object Array]';
        }
    };

});