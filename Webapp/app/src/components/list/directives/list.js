/**
 * Created by Administrator on 2015.12.06..
 */
hospitalNet.directive('list', function(dataService){
    return {
        restrict: 'E',
        templateUrl: 'src/components/list/templates/listTemplate.html',
        replace: true,
        link: function(scope,element,attrs){
            var condition = scope.$eval(attrs.condition);
            var table = attrs.table;
            var fields = scope.$eval(attrs.fields);
            var listData;

            scope.controls = scope.$eval(attrs.controls);

            dataService.getData(table,condition).then(function(response){
                processDatas(response);
            });

            function processDatas(data){
                var i = 0;
                for(index in data){
                    var descFields={};
                    for(key in data[index]){
                        if(fields.indexOf(key) > -1){
                            descFields[key] = data[index][key];
                        }
                    }
                    data[i].descFields = descFields;
                    i++;
                }
                listData = data;
                scope.list = data;
            }

            scope.getControlTemplate = function(control){
                return 'src/components/list/templates/controls/' + control + '.html';
            };

            scope.$watch('searchExpression',function(searchExp){
                if(searchExp && searchExp.length > 0){
                    var regex = new RegExp( searchExp, 'i');
                    scope.list = listData.filter(function(listItem){
                        for(key in listItem.descFields){
                            if(regex.test(listItem.descFields[key])){
                                return true;
                            }
                        }
                        return false;
                    });
                } else {
                    scope.list = listData;
                }
            });
        }
    }
});