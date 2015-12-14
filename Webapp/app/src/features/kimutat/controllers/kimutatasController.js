/**
 * Created by Administrator on 2015.12.14..
 */
hospitalNet.controller('kimutatasCtrl',function($scope,$state,innerTransfer){
    var self = this;
    this.data = {};
    $scope.getData = function(data){
        self.data = data;
    };

    $scope.kimutatas_render = function(){
        innerTransfer.set(self.data);
        $state.go('kimutatas_render');
    }
});