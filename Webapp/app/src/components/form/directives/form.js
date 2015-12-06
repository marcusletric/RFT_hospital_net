/**
 * Created by Administrator on 2015.12.06..
 */
hospitalNet.directive('form', function(){
    return {
        restrict: 'C',
        templateUrl: 'src/components/form/templates/formTemplate.html',
        replace: true,
        scope: {
            objectDef : '='
        },
        link: function(scope){
            scope.leftInputs = {};
            scope.rightInputs = {};
            for (field in scope.objectDef.dataFields){
                var fieldName = field;
                formField = scope.objectDef.dataFields[field];
                formField.reqired ? scope.leftInputs[fieldName] = formField : scope.rightInputs[fieldName] = formField;
            }
        }
    }
});