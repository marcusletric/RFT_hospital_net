/**
 * Created by Administrator on 2015.12.08..
 */
var betegFelvetel = {
    table: 'betegfelvetel',
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
        felvetel: {
            desc: 'Felvétel ideje',
                type: 'date',
                reqired: true
        },
        elbocsatas: {
            desc: 'Elbocsátás ideje',
                type: 'date',
                reqired: false,
                disabled: true
        },
        elbocsatasOka: {
            desc: 'Elbocsátás oka',
                type: 'textarea',
                reqired: false,
                disabled: true
        }
    }
};