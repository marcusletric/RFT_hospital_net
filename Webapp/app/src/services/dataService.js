/**
 * Created by Administrator on 2015.12.09..
 */
hospitalNet.service('dataService',function($http, $q, backendConfig){
    var backendUrl = 'http://' + backendConfig.address;

    this.getData = function(table,filterCondition){
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: backendUrl,
            data: $.param({'table' : table, 'filter':filterCondition}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(res){
            deferred.resolve(res.data);
        },function(err){
            deferred.reject(err);
        });

        return deferred.promise;
    };

    this.setData = function(table,dataSet){
        var deferred = $q.defer();
        dataSet['table']=table;
        $http({
            method: 'POST',
            url: backendUrl,
            data: $.param(dataSet),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(res){
            deferred.resolve(res.data);
        },function(err){
            deferred.reject(err);
        });

        return deferred.promise;
    };
});