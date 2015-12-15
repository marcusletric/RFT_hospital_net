/**
 * Created by Administrator on 2015.12.08..
 */
hospitalNet.config(function(entityDefinitions){
    entityDefinitions.betegseg = {
        table: 'betegsegek',
        entity: 'betegseg',
        dataFields: {
            betegID: {
                desc: 'Beteg',
                type: 'select',
                options: {
                    dynamicData: {
                        table: 'szemelyek',
                        entity: 'szemely',
                        labelFields: ['vezeteknev', 'keresztnev'],
                        filter: {'tipus': 'beteg'}
                    }
                },
                reqired: true
            },
            OrvosID: {
                desc: 'Orvos',
                type: 'select',
                options: {
                    dynamicData: {
                        table: 'szemelyek',
                        entity: 'szemely',
                        labelFields: ['vezeteknev', 'keresztnev'],
                        filter: {'tipus': 'orvos'}
                    }
                },
                reqired: true
            },
            betegseg: {
                desc: 'Betegség',
                type: 'text',
                reqired: true
            },
            kezdete: {
                desc: 'Kedzete',
                type: 'date',
                reqired: true
            },
            vege: {
                desc: 'Vége',
                type: 'date',
                reqired: false
            }
        }
    };
});