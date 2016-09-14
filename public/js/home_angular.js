/**
 * Created by lzf on 2016/9/5.
 */

angular.module('app',['ngRoute'])
var home_ctrl = angular.module('app',[]);

//anjularJS发送/home/detail请求,后台得到请求，返回数据
home_ctrl.controller('myCtrl', function ($scope, $http) {
    $http.get('/home/detail').success(function(data){

       //$scope.zhangmu_number = data[0][0].zm_number;
       //$scope.total_zc = data[0][0].total_zc;
        $scope.zhangmu_number = data.total_zm_number;
        $scope.total_zc = data.total_zc;
        $scope.total_sr = data.total_sr;
        $scope.hf_star_list = data.hf_star_list;
        $scope.sr_star_list = data.sr_star_list;
    });

    $scope.showDetail = function(HF_ID){

        console.log(HF_ID);
    }
});



