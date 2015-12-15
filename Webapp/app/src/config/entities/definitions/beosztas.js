/**
 * Created by Administrator on 2015.12.09..
 */
hospitalNet.config(function(entityDefinitions){
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
                reqired: true
            },
            mettol: {
                desc: 'Kezdés',
                type: 'time',
                reqired: true
            },
            meddig: {
                desc: 'Vége',
                type: 'time',
                reqired: true
            }
        }
    };
});