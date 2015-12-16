/**
 * Created by Administrator on 2015.12.13..
 */
hospitalNet.directive('chart',function($rootScope,innerTransfer,dataService){
    return {
        restrict: 'E',
        templateUrl: 'src/components/chart/templates/chartTemplate.html',
        scope: {
            objectDef: '='
        },
        link: function (scope,element) {

            var entityDef = $rootScope.entities[innerTransfer.get()['tipus']];
            var labels = {};

            dataService.getData('szemelyek','szemely').then(function(data){
                data.forEach(function(item){
                   labels[item.id] = item.vezeteknev + ' ' + item.keresztnev;
                });
            });

            dataService.getData(entityDef.table,entityDef.entity).then(function(data){
                var chartData = separateChartData(filterChartData(data),'dolgozoID',function(input){return input;});
                for(key in chartData){
                    chartData[key] = aggregateChartData(chartData[key],
                                                        'datum',
                                                        function(data){
                                                            return new Date(data).getMonth();
                                                        },
                                                        function(datas){
                                                            var sum = 0;
                                                            datas.forEach(function(data){
                                                                sum += (new Date("2000-01-01 " + data.meddig).getTime() - new Date("2000-01-01 " + data.mettol).getTime())/1000/60/60;
                                                            });
                                                            return parseFloat((sum / datas.length).toFixed(1));
                                                        }
                    );
                }
                $(element).highcharts(composeChartConfig(chartData));
            });

            function composeChartConfig(data){
                var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

                var categories = [];

                var num = 0;
                var startMonth = innerTransfer.get()['kezdete'].getMonth();
                do{categories.push(months[innerTransfer.get()['kezdete'].getMonth()]);num++}
                while(innerTransfer.get()['kezdete'].setMonth(innerTransfer.get()['kezdete'].getMonth()+1) < innerTransfer.get()['vege']);



                var dataSeries = [];

                for(key in data){
                    var dataArray = [];
                    for(var i = startMonth; i < startMonth + num; i++){
                        if(data[key][i]){
                            dataArray.push(data[key][i]);
                        } else {
                            dataArray.push(0);
                        }
                    }
                    dataSeries.push({
                        name : labels[key],
                        data : dataArray
                    });
                }



                return {
                    title: {
                        text: 'Átlagos napi munkaóra / hónap',
                        x: -20 //center
                    },
                    xAxis: {
                        categories: categories
                    },
                    yAxis: {
                        title: {
                            text: 'Átlagos napi munkaóra'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    tooltip: {
                        valueSuffix: ' óra'
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0
                    },
                    series: dataSeries
                };
            }

            function separateChartData(data,field,agrIndexer){
                var agr = {};
                data.forEach(function(record){
                    var agrIndex = agrIndexer(record[field]);
                    if(!agr[agrIndex]){
                        agr[agrIndex] = [];
                    }
                    agr[agrIndex].push(record);
                });
                return agr;
            }

            function aggregateChartData(data,agrField,agrIndex,agrFn){
                var agr = {};
                agr = separateChartData(data,agrField,agrIndex);
                for(key in agr){
                    agr[key] = agrFn(agr[key]);
                }
                return agr;
            }

            function filterChartData(data){
                return data.filter(function(record){
                    return new Date(record.datum).getTime() >= innerTransfer.get()['kezdete'].getTime() && new Date(record.datum).getTime() <= innerTransfer.get()['vege'].getTime();
                });
            }
        }
    }
});