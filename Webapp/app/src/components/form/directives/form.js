/**
 * Created by Administrator on 2015.12.06..
 */
hospitalNet.directive('form', function($stateParams,$rootScope,$window,$state,dataService,$filter,$compile,$http){
    return {
        restrict: 'C',
        templateUrl: 'src/components/form/templates/formTemplate.html',
        replace: true,
        scope: {
            objectDef : '=',
            saveControls : '=',
            validatorService : '=',
            getData: '&'
        },
        link: function(scope,element,attrs){
            var hasValidStateParam = false;
            var elementsToRender = $rootScope.Utils.keys(scope.objectDef.dataFields).length;

            scope.validatorService = element.error;
            if(attrs.customTemplateUrl){
                $http.get(attrs.customTemplateUrl).then(function(response){
                    element.html('');
                    element.append($(response.data));
                    $compile($(element).contents())(scope);
                });
            }

            for(key in $stateParams){
                if($stateParams[key]){
                    hasValidStateParam = true;
                    break;
                }
            }

            scope.$on('elementRendered',function(){elementsToRender--;});
            var renderWatch = scope.$watch(function(){return elementsToRender;},function(remaining){
                if( remaining <1){
                    if(hasValidStateParam){
                        loadData();
                        renderWatch();
                    } else {
                        $rootScope.loading = false;
                    }

                }
            });

            scope.leftInputs = {};
            scope.rightInputs = {};
            scope.allInputs = {};

            for (field in scope.objectDef.dataFields){
                var fieldName = field;
                formField = scope.objectDef.dataFields[field];
                formField.reqired ? scope.leftInputs[fieldName] = formField : scope.rightInputs[fieldName] = formField;
                scope.allInputs[fieldName] = formField ;

            }

            scope.back = function(){
                $window.history.back();
            };

            scope.saveData = function(){
                var dataset = {};
                for (field in scope.objectDef.dataFields){
                    (angular.isUndefined(field.save) || field.save) && scope[field] && scope[field].toString().length > 0 ? dataset[field]=scope[field] : '';
                }
                for(key in dataset){
                    if(scope.objectDef.dataFields[key].type=='date'){
                        dataset[key] = $filter('date')(dataset[key], 'yyyy-MM-dd')
                    }
                    if(scope.objectDef.dataFields[key].type=='time'){
                        dataset[key] = $filter('date')(dataset[key], 'HH:mm');
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
                    $rootScope.reloadView();
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