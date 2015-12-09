/**
 * Created by Administrator on 2015.12.06..
 */
hospitalNet.directive('list', function(dataService){
    return {
        restrict: 'C',
        templateUrl: 'src/components/list/templates/listTemplate.html',
        replace: true,
        scope: {
            condition : '=',
            fieldList : '&'
        },
        link: function(scope,element,attrs){
            scope.loading = true;

            dataService.getData(attrs.table,scope.condition).then(function(response){
                processDatas(response);
                scope.loading = false;
            });

            function processDatas(data){
                var dataArray = [];
                var i = 0;
                for(index in data){
                    dataArray[i]={};
                    for(key in data[index]){
                        if(scope.fieldList().indexOf(key) > -1){
                            dataArray[i][key] = data[index][key];
                        }
                    }
                    i++;
                }
                scope.list = dataArray;
            }
        }
    }
});