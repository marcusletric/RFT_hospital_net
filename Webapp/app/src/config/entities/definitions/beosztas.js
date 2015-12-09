/**
 * Created by Administrator on 2015.12.09..
 */
hospitalNet.config(function(entityDefinitions){
    entityDefinitions.beosztas = {
        table: 'beosztas',
        dataFields: {
            dolgozoID: {
                desc: 'Munkatárs',
                type: 'select',
                reqired: true
            },
            datum: {
                desc: 'Dátum',
                type: 'date',
                reqired: true
            },
            kezdete: {
                desc: 'Kezdés',
                type: 'time',
                reqired: true
            },
            vege: {
                desc: 'Vége',
                type: 'time',
                reqired: true
            }
        }
    };
});