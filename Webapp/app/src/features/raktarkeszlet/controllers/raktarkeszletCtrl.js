/**
 * Created by Administrator on 2015.12.13..
 */
hospitalNet.controller('raktarkeszletCtrl',function($scope,$state){
    $scope.targyID = $state.params['id'];

    $scope.deleteItem = function(itemID){

    };

    $scope.modifyItem = function(item){
        $state.go('raktari_egyed',{id: item.id});
    };

    $scope.addItem = function(){
        $state.go('raktari_egyed');
    };

    $scope.fillItem = function(item){
        $state.go('raktarkeszlet',{id: item.id});
    };

    $scope.fillSet = function(){
        $state.go('raktarkeszlet');
    }
});