/**
 * Created by Administrator on 2015.12.09..
 */
hospitalNet.run(function(entityDefinitions,$filter){
    entityDefinitions.beosztas = {
        table: 'beosztasok',
        entity: 'beosztas',
        dataFields: {
            dolgozoID: {
                desc: 'Munkatárs',
                type: 'select',
                options: {
                    dynamicData: {
                        table: 'szemelyek',
                        entity: 'szemely',
                        labelFields: ['vezeteknev', 'keresztnev'],
                        filter: {'tipus': ['orvos','recepcios','raktarfelugyelo']}
                    }
                },
                reqired: true
            },
            datum: {
                desc: 'Dátum',
                type: 'date',
                reqired: true,
                defaultValue: $filter('date')(new Date(),'yyyy-MM-dd')
            },
            mettol: {
                desc: 'Kezdés',
                type: 'time',
                reqired: true,
                defaultValue: new Date(2000,1,1,7,30,0,0)
            },
            meddig: {
                desc: 'Vége',
                type: 'time',
                reqired: true,
                defaultValue: new Date(2000,1,1,16,0,0,0)
            }
        }
    };
});