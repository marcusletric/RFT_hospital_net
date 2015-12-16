/**
 * Created by Administrator on 2015.12.13..
 */
hospitalNet.controller('betegfelvetelekCtrl',function($scope,$state,$rootScope,dataService){
    $scope.deleteItem = function(item){
        dataService.deleteRecord($rootScope.entities.betegFelvetel.table,{id: item.id}).then(function(data){
            $rootScope.reloadView();
        });
    };

    $scope.releaseItem = function(item){
        $state.go('betegelbocsatas',{id: item.id});
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