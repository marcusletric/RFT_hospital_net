/**
 * Created by Administrator on 2015.12.06..
 */
hospitalNet.directive('formInput', function($compile,$http){
    return {
        restrict: 'E',
        replace: true,
        link: function(scope,elem,attrs){
            var fieldDef = scope.objectDef.dataFields[attrs['formField']];
            var inputSelectors = "input, select, button, textarea";
            $http.get('src/components/form/templates/inputs/' + fieldDef.type + '.html').then(
                function(response){
                    var newElem = $(response.data);
                    var inputField = newElem.is(inputSelectors) ? newElem : newElem.find(inputSelectors);
                    inputField.attr({
                        'ng-model' : attrs['formField'],
                        'placeholder' : fieldDef.desc
                    });
                    fieldDef.disabled ? inputField.attr('disabled', 'disabled') : '';
                    fieldDef.reqired ? inputField.attr('ng-required', true) : '';
                    elem.append(newElem);
                    $compile(elem.contents())(scope);
                }
            );
        }
    }
});