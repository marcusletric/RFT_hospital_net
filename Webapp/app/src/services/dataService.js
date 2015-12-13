/**
 * Created by Administrator on 2015.12.09..
 */
hospitalNet.run(function($rootScope){
    $rootScope.loading = false;
});

hospitalNet.service('dataService',function($http, $q, backendConfig, $rootScope){
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
        $rootScope.loading = true;
        $http(reqCnf(backendUrl,{'table' : table, 'filter':filterCondition})).then(function(res){
            deferred.resolve(res.data);
            $rootScope.loading = false;
        },function(err){
            $.notify("Hiba történt a kiszolgáló elérése során", "error");
            deferred.reject(err);
            $rootScope.loading = false;
        });

        return deferred.promise;
    };

    this.setData = function(table,dataSet){
        var deferred = $q.defer();
        dataSet['table']=table;
        $rootScope.loading = true;
        $http(reqCnf(backendUrl,dataSet)).then(function(res){
            deferred.resolve(res.data);
            $rootScope.loading = false;
        },function(err){
            $.notify("Hiba történt a kiszolgáló elérése során", "error");
            deferred.reject(err);
            $rootScope.loading = false;
        });

        return deferred.promise;
    };
});