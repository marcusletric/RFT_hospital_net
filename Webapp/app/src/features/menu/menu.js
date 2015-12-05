/**
 * Created by Administrator on 2015.12.05..
 */
hospitalNet.directive('menu', function(routes){
    return {
        restrict: 'C',
        templateUrl: 'src/features/menu/menuItem.html',
        link: function(scope){
            scope.routes = routes;
        }
    }
});