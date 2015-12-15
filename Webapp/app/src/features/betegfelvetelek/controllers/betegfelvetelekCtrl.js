/**
 * Created by Administrator on 2015.12.13..
 */
hospitalNet.controller('betegfelvetelekCtrl',function($scope,$state){
    $scope.deleteItem = function(itemID){

    };

    $scope.modifyItem = function(item){
        $state.go('betegfelvetel',{id: item.id});
    };

    $scope.addItem = function(){
        $state.go('raktari_egyed');
    };

    $scope.fillItem = function(item){
        $state.go('raktarkeszlet',{egyed_id: item.id});
    };

    $scope.fillSet = function(){
        $state.go('raktarkeszlet');
    }
});