/**
 * Created by Administrator on 2015.12.08..
 */
hospitalNet.config(function(entityDefinitions){
    entityDefinitions.betegseg = {
        table: 'betegsegek',
        dataFields: {
            betegID: {
                desc: 'Beteg',
                type: 'select',
                reqired: true
            },
            OrvosID: {
                desc: 'Orvos',
                type: 'select',
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