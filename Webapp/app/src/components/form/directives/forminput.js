/**
 * Created by Administrator on 2015.12.06..
 */
hospitalNet.directive('formInput', function($compile,$http){
    return {
        restrict: 'E',
        replace: true,
        link: function(scope,elem,attrs){
            var fieldDef = scope.objectDef.dataFields[attrs['formField']];
            $http.get('src/components/form/templates/inputs/' + fieldDef.type + '.html').then(
                function(response){
                    var newElem = elem.append($(response.data));
                    $compile(elem.contents())(scope);
                }
            );
        }
    }
});