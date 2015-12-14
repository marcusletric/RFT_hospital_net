/**
 * Created by Administrator on 2015.12.06..
 */
hospitalNet.directive('form', function($stateParams,$rootScope,$window,dataService,$filter){
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
                    scope[field] && scope[field].toString().length > 0 ? dataset[field]=scope[field] : '';
                }
                for(key in dataset){
                    if(angular.isDate(dataset[key])){
                        dataset[key] = $filter('date')(dataset[key], 'yyyy-MM-dd')
                    }
                    if(angular.isObject(dataset[key])){
                        dataset[key] = dataset[key].id;
                    }
                }

                var postData = {};
                postData[scope.objectDef.entity] = dataset;

                dataService.saveData(scope.objectDef.table,postData).then(function(){
                    $.notify("Az adatokat sikeresen elmentettük.", "success");
                });
            };

            function loadData(){
                dataService.getData(scope.objectDef.table,$stateParams).then(function(data){
                    for(field in data){
                        scope[field] = data;
                    }
                });
            }

            var hasValidStateParam = false;
            for(key in $stateParams){
                if($stateParams[key]){
                    hasValidStateParam = true;
                    break;
                }
            }

            if(hasValidStateParam){
                loadData();
            }
        }
    }
});