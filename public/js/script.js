/**
 * Created by lzf on 2016/7/5.
 */
angular.module('timeExampleModule', []).
// Declare new object call time,
// which will be available for injection
    factory('time', function($timeout) {
        var time = {};
        (function tick() {
            time.now = new Date().toString();
            $timeout(tick, 1000);
        })();
        return time;
    });
// Notice that you can simply ask for time
// and it will be provided. No need to look for it.
function ClockCtrl($scope, time) {
    $scope.time = time;
}

