angular.module('sampleApp', ['utility.axKey'])
.controller('sampleCtrl', ["$scope", function ($scope) {
    var self = this;
    self.axKeyCallback = function (e) {
        console.log(1);
        console.log(e);
    }
    self.axKeyCallback2 = function (e) {
        console.log(2);
        console.log(e);
    }
    self.eventType = '';
    self.disabled = false;
    self.disabled2 = false;
}]);