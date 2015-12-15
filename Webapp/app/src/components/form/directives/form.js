/**
 * Created by Administrator on 2015.12.06..
 */
hospitalNet.directive('form', function($stateParams,$rootScope,$state,dataService,$filter){
    return {
        restrict: 'C',
        templateUrl: 'src/components/form/templates/formTemplate.html',
        replace: true,
        scope: {
            objectDef : '=',
            saveControls : '=',
            getData: '&'
        },
        link: function(scope){
            var hasValidStateParam = false;
            var elementsToRender = $rootScope.Utils.keys(scope.objectDef.dataFields).length;

            for(key in $stateParams){
                if($stateParams[key]){
                    hasValidStateParam = true;
                    break;
                }
            }

            scope.$on('elementRendered',function(){elementsToRender--;});
            var renderWatch = scope.$watch(function(){return elementsToRender;},function(remaining){
                if(hasValidStateParam == remaining <1){
                    loadData();
                    renderWatch();
                }
            });

            scope.leftInputs = {};
            scope.rightInputs = {};

            for (field in scope.objectDef.dataFields){
                var fieldName = field;
                formField = scope.objectDef.dataFields[field];
                formField.reqired ? scope.leftInputs[fieldName] = formField : scope.rightInputs[fieldName] = formField;
            }

            scope.back = function(){
                $window.history.back();
            };

            angular.isFunction(scope.getData()) && scope.getData()(scope);

            scope.saveData = function(){
                var dataset = {};
                for (field in scope.objectDef.dataFields){
                    (angular.isUndefined(field.save) || field.save) && scope[field] && scope[field].toString().length > 0 ? dataset[field]=scope[field] : '';
                }
                for(key in dataset){
                    if(angular.isDate(dataset[key])){
                        dataset[key] = $filter('date')(dataset[key], 'yyyy-MM-dd')
                    }
                    if(angular.isObject(dataset[key])){
                        dataset[key] = dataset[key].id;
                    }
                }

                if(hasValidStateParam) {
                    dataset['id'] = $stateParams.id;
                }

                var postData = {};
                postData[scope.objectDef.entity] = dataset;

                dataService[(hasValidStateParam ? 'setData' : 'saveData')](scope.objectDef.table,postData).then(function(){
                    $.notify("Az adatokat sikeresen elmentettük.", "success");
                    $state.go($state.getName());
                });
            };

            function loadData(){
                dataService.getData(scope.objectDef.table,scope.objectDef.entity,{id: $stateParams.id}).then(function(data){
                    for(field in data[0]){
                        if(scope.objectDef.dataFields[field] && scope.objectDef.dataFields[field].type=='select'){
                            scope[field] = scope[field + '_options'].filter(function(option){
                                return option.id == data[0][field];
                            })[0];
                        } else {
                            scope[field] = data[0][field];
                        }
                    }
                });
            }
        }
    }
});