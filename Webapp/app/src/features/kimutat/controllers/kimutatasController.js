/**
 * Created by Administrator on 2015.12.14..
 */
hospitalNet.controller('kimutatasCtrl',function($scope,$rootScope,$state,innerTransfer){
    var self = this;
    this.data = {};
    var entityDef = $rootScope.entities['kimutatas'];

    $scope.getData = function(formScope){
        for(key in entityDef.dataFields){
            $scope[key] = formScope[key];
        }
        $scope.startRender();
    };

    innerTransfer.set({'tipus': 'beosztas'});
});