/**
 * Created by Administrator on 2015.12.08..
 */
var gyogyszerKiiras = {
    table: 'raktari_targy',
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
        gyogyszerID: {
            desc: 'Gyógyszer',
            type: 'select',
            reqired: true
        },
        mennyiseg: {
            desc: 'Mennyiség',
            type: 'text',
            reqired: true
        },
        adagolas: {
            desc: 'Adagolás',
            type: 'textarea',
            reqired: true
        },
        kiirasDatum: {
            desc: 'Kiírás dátuma',
            type: 'date',
            reqired: true,
            disabled: true
        }
    }
};