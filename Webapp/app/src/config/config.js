/**
 * Created by Administrator on 2015.12.05..
 */
hospitalNet.service('innerTransfer',function(){
        this.set = function(data){
            this.data = data;
        };

        this.get = function(){
            return this.data;
        };
});

hospitalNet.run(function($rootScope,$timeout){
    $rootScope.Utils = {
        keys : Object.keys
    };
    $rootScope.reloadView = function(){
        $rootScope.loading = true;
        $rootScope.reload = true;
        $timeout(function(){
            $rootScope.reload = false;
        });
    };
});