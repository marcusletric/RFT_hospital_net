/**
 * Created by Administrator on 2015.12.08..
 */
var mutetElojegyzes = {
    table: 'mutetek',
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
        szobaID: {
            desc: 'Szoba',
            type: 'select',
            reqired: true
        },
        datum: {
            desc: 'Dátum',
            type: 'date',
            reqired: true
        },
        csapat: {
            desc: 'Műtőcsapat',
            type: 'textarea',
            reqired: false
        }
    }
};