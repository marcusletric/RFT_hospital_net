/**
 * Created by Administrator on 2015.12.09..
 */
hospitalNet.service('dataService',function($http, $q, backendConfig){
    var backendUrl = 'http://' + backendConfig.address;

    var reqCnf = function(url,data,mock){
        return {
            method: mock ? 'GET' : 'POST',
            url: mock ? url + '/app/mock/' + data.table + '.json': url,
            data: $.param(data),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }
    };

    this.getData = function(table,filterCondition){
        var deferred = $q.defer();
        $http(reqCnf(backendUrl,{'table' : table, 'filter':filterCondition},true)).then(function(res){
            deferred.resolve(res.data);
        },function(err){
            deferred.reject(err);
        });

        return deferred.promise;
    };

    this.setData = function(table,dataSet){
        var deferred = $q.defer();
        dataSet['table']=table;
        $http(reqCnf(backendUrl,dataSet,true)).then(function(res){
            deferred.resolve(res.data);
        },function(err){
            deferred.reject(err);
        });

        return deferred.promise;
    };
});