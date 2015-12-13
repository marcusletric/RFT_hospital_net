/**
 * Created by Administrator on 2015.12.06..
 */
hospitalNet.directive('formInput', function($compile,$http,dataService){
    return {
        restrict: 'E',
        replace: true,
        link: function(scope,elem,attrs){
            var fieldDef = scope.objectDef.dataFields[attrs['formField']];
            var inputSelectors = "input, select, button, textarea, uib-timepicker";
            $http.get('src/components/form/templates/inputs/' + fieldDef.type + '.html').then(
                function(response){
                    var newElem = $(response.data);
                    var inputField = newElem.is(inputSelectors) ? newElem : newElem.find(inputSelectors);
                    inputField.attr({
                        'ng-model' : attrs['formField'],
                        'placeholder' : fieldDef.desc
                    });
                    if(fieldDef.options){
                        if(fieldDef.options.dynamicData){
                            dataService.getData(fieldDef.options.dynamicData.table,fieldDef.options.dynamicData.filter).then(function(options){
                                applySelectOptions(attrs['formField'],options);
                            });
                        } else if(fieldDef.options.staticData){
                            applySelectOptions(attrs['formField'],fieldDef.options.staticData);
                        }
                    }
                    fieldDef.disabled ? inputField.attr('disabled', 'disabled') : '';
                    fieldDef.reqired ? inputField.attr('ng-required', true) : '';
                    elem.append(newElem);
                    $compile(elem.contents())(scope.$parent);
                }
            );

            function applySelectOptions(field,options){
                scope.$parent[field + "-options"] = options;
                inputField.attr({'ng-options' : "option in " + field + "-options"});
            }
        }
    }
});