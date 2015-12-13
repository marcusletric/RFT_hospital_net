/**
 * Created by Administrator on 2015.12.06..
 */
hospitalNet.directive('formInput', function($compile,$http,dataService){
    return {
        restrict: 'E',
        replace: true,
        link: function(scope,elem,attrs){
            var newElem,inputField,asyncRender;
            var fieldDef = scope.objectDef.dataFields[attrs['formField']];
            var inputSelectors = "input, select, button, textarea, uib-timepicker";

            $http.get('src/components/form/templates/inputs/' + fieldDef.type + '.html').then(
                function(response){
                    newElem = $(response.data);
                    inputField = newElem.is(inputSelectors) ? newElem : newElem.find(inputSelectors);
                    inputField.attr({
                        'ng-model' : attrs['formField'],
                        'ng-focus' : attrs['formField'] + '_opened=true;',
                        'placeholder' : fieldDef.desc,
                        'is-open': attrs['formField'] + '_opened'
                    });
                    if(fieldDef.options){
                        newElem.find('option').html(fieldDef.desc);
                        if(fieldDef.options.dynamicData){
                            asyncRender = true;
                            dataService.getData(fieldDef.options.dynamicData.table,fieldDef.options.dynamicData.filter).then(function(options){
                                applySelectOptions(attrs['formField'],inputField,options);
                                renderElement();
                            },function(){
                                applySelectOptions(attrs['formField'],inputField,[]);
                                renderElement();
                            });
                        } else if(fieldDef.options.staticData){
                            applySelectOptions(attrs['formField'],inputField,fieldDef.options.staticData);
                        }
                    }
                    fieldDef.disabled ? inputField.attr('disabled', 'disabled') : '';
                    fieldDef.reqired ? inputField.attr('ng-required', true) : '';
                    elem.append(newElem);
                    if(!asyncRender){
                        renderElement();
                    }
                }
            );

            function renderElement(){
                $compile(elem.contents())(scope.$parent);
            }

            function applySelectOptions(field, inputField, options){
                scope.$parent[field + "_options"] = options;
                inputField.attr({'ng-options' : "value as value.label for value in " + field + "_options track by value.id"});
            }
        }
    }
});