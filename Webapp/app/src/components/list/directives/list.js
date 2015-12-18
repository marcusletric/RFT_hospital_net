/**
 * Created by Administrator on 2015.12.06..
 */
hospitalNet.directive('list', function(dataService,$rootScope,$q){
    return {
        restrict: 'E',
        templateUrl: 'src/components/list/templates/listTemplate.html',
        replace: true,
        link: function(scope,element,attrs){
            var condition = scope.$eval(attrs.condition);
            var objDef = scope.$eval(attrs.objectDef);
            var joinTables = scope.$eval(attrs.joinTables);
            var table = objDef.table;
            var entity = objDef.entity;
            var listData = null;
            var joinData = {};
            var loadPromises = [];

            joinTables && angular.isArray(joinTables) && joinTables.forEach(function(joinDef){
                joinData[joinDef.joinField] = {};
                loadPromises.push(dataService.getData(joinDef.entityDef.table,joinDef.entityDef.entity,joinDef.condition).then(function(response){
                    joinData[joinDef.joinField].data = response;
                    joinData[joinDef.joinField].definition = joinDef;
                }));
            });

            scope.fields = scope.$eval(attrs.fields);
            scope.controls = scope.$eval(attrs.controls);
            scope.fieldDef = {};
            for(key in objDef.dataFields){
                scope.fieldDef[key] = objDef.dataFields[key];
            }

            loadPromises.push(dataService.getData(table,entity,condition).then(function(response){
                listData = response;
            }));

            $q.all(loadPromises).then(function(){
                processDatas();
            });

            function processDatas(){
                for(index in listData){
                    for(key in listData[index]){
                        if(joinData[key]){
                            var oldFieldDef = joinData[key].definition.entityDef.dataFields;
                            var joinableRows = joinData[key].data.filter(function(joinRow){
                                return joinRow.id == listData[index][key];
                            });
                            for(joinRowFieldKey in joinableRows[0]){
                                var newFieldName = joinData[key].definition.alias + '_' + joinRowFieldKey;
                                listData[index][newFieldName] = joinableRows[0][joinRowFieldKey];
                                scope.fieldDef[newFieldName] = oldFieldDef[joinRowFieldKey];
                            }
                        }
                    }
                }
                var i = 0;
                for(index in listData){
                    var descFields={};
                    for(var j in scope.fields){
                        if($rootScope.Utils.keys(listData[index]).indexOf(scope.fields[j]) > -1){
                            descFields[j] = listData[index][scope.fields[j]];
                        }
                    }
                    listData[i].descFields = descFields;
                    i++;
                }
                scope.list = listData;
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