/**
 * Created by Administrator on 2015.12.06..
 */
hospitalNet.directive('form', function(dataService){
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

            scope.saveData = function(){
                var dataset = {};
                for (field in scope.objectDef.dataFields){
                    scope[field] && scope[field].toString().length > 0 ? dataset[field]=scope[field] : '';
                }
                dataService.setData(scope.objectDef.table,dataset).then(function(){
                    $.notify("Az adatokat sikeresen elmentettük.", "success");
                },function(){
                    $.notify("Hiba történt az adatok mentése során.", "error");
                });
            }
        }
    }
});