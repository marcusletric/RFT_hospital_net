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
                        'ng-click' : attrs['formField'] + '_opened=true;',
                        'placeholder' : fieldDef.desc,
                        'is-open': attrs['formField'] + '_opened'
                    });
                    if(fieldDef.options){
                        newElem.find('option').html(fieldDef.desc);
                        if(fieldDef.options.dynamicData){
                            asyncRender = true;
                            var optionsDef = fieldDef.options.dynamicData;
                            dataService.getData(optionsDef.table,optionsDef.entity,optionsDef.filter).then(function(options){
                                options = processDynamicOptions(options,optionsDef);
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
                if(fieldDef.defaultValue){
                    scope.$parent[attrs['formField']] = (fieldDef.options ? scope.$parent[attrs['formField'] + "_options"][fieldDef.defaultValue]:fieldDef.defaultValue);
                }
                $compile(elem.contents())(scope.$parent);
                scope.$emit('elementRendered');
            }

            function processDynamicOptions(data,definition){
                var list = data;
                angular.isArray(list) && list.forEach(function(item){
                    var labelElements = [];
                    definition.labelFields.forEach(function(labelField){
                        labelElements.push(item[labelField]);
                    });
                    item.label = labelElements.join(' ');
                });
                return list;
            }

            function applySelectOptions(field, inputField, options){
                scope.$parent[field + "_options"] = options;
                inputField.attr({'ng-options' : "value.id as value.label for value in " + field + "_options track by value.id"});
            }
        }
    }
});