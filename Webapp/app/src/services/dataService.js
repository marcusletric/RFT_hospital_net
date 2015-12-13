/**
 * Created by Administrator on 2015.12.09..
 */
hospitalNet.run(function($rootScope){
    $rootScope.loading = false;
});

hospitalNet.service('dataService',function($http, $q, backendConfig, $rootScope){
    var self = this;

    var backendUrl = 'http://' + backendConfig.address;

    var reqCnf = function(url,data,mock){
        return {
            method: mock ? 'GET' : 'POST',
            url: mock ? url + '/app/mock/' + data.table + '.json': url,
            data: $.param(data),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }
    };

    this.pendingRequests = 0;
    this.err = 0;

    this.setLoadingState = function(pendingReqDelta){
        this.pendingRequests += pendingReqDelta;
        $rootScope.loading = this.pendingRequests > 0;
        if(!$rootScope.loading){
            if(this.err > 0){
                $.notify("Hiba történt a kiszolgáló elérése során", "error");
            }
            this.err = 0;
        }
    };

    this.getData = function(table,filterCondition){
        var deferred = $q.defer();
        self.setLoadingState(1);
        $http(reqCnf(backendUrl,{'table' : table, 'filter':angular.toJson(filterCondition)})).then(function(res){
            deferred.resolve(res.data);
            self.setLoadingState(-1);
        },function(err){
            deferred.reject(err);
            self.err++;
            self.setLoadingState(-1);
        });

        return deferred.promise;
    };

    this.setData = function(table,dataSet){
        var deferred = $q.defer();
        var postData = {};
        postData.table = table;
        postData.data = angular.toJson(dataSet);
        self.setLoadingState(1);
        $http(reqCnf(backendUrl,postData)).then(function(res){
            deferred.resolve(res.data);
            self.setLoadingState(-1);
        },function(err){
            deferred.reject(err);
            self.err++;
            self.setLoadingState(-1);
        });

        return deferred.promise;
    };
});