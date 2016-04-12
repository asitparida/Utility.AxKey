(function () {
    "use strict";

    angular.module('utility.axKey', [])
     .directive("axKey", ['$rootScope', '$parse', function ($rootScope, $parse) {
         return {
             restrict: 'A',
             compile: function ($element, attr) {
                 var fn = $parse(attr['axKey']);
                 return function axKeyHandler(scope, element) {
                     if (!element.attr('role')) {
                         element.attr('role', 'button');
                     }
                     if (!element.attr('tabindex')) {
                         element.attr('tabindex', 0);
                     }
                     var _watchListeners = [];
                     scope._origTabindex = 0;
                     _watchListeners.push(scope.$watch(attr['axDisabled'] || attr['ngDisabled'], function (value) {
                         if (value) {
                             scope._origTabindex = element.attr('tabindex');
                             element.attr('tabindex', -1);
                         }
                         else
                             element.attr('tabindex', scope._origTabindex);
                     }));
                     element.on('click', function (e) {
                         if (scope.$eval(attr['axDisabled']) || scope.$eval(attr['ngDisabled']))
                             return;
                         axKeyHandlerCallback(e)
                     });
                     element.on('keyup', function (e) {
                         if (scope.$eval(attr['axDisabled']) || scope.$eval(attr['ngDisabled']))
                             return;
                         if (e.keyCode == 13 || e.keyCode == 32) {
                             axKeyHandlerCallback(e);
                         }
                     });
                     function axKeyHandlerCallback(e) {
                         var callback = function () {
                             fn(scope, { $event: e });
                         };
                         if ($rootScope.$$phase) {
                             scope.$evalAsync(callback);
                         } else {
                             scope.$apply(callback);
                         }
                     }
                     scope.$on("$destroy", function () {
                         while (_watchListeners.length) {
                             _watchListeners.shift()();
                         }
                     });
                 }
             }
         };
     }])
})();