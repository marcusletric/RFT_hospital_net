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

hospitalNet.run(function($rootScope){
    $rootScope.Utils = {
        keys : Object.keys
    }
});