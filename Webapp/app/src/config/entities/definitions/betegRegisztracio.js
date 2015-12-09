/**
 * Created by Administrator on 2015.12.08..
 */
hospitalNet.config(function(entityDefinitions) {
    entityDefinitions.betegRegisztracio = {
        table: 'szemely',
        dataFields: {
            vezeteknev: {
                desc: 'Vezetéknév',
                type: 'text',
                reqired: true
            },
            keresztnev: {
                desc: 'Keresztnév',
                type: 'text',
                reqired: true
            },
            felhasznalo: {
                desc: 'Felhasználónév',
                type: 'text',
                reqired: false,
                disabled: true
            },
            jelszo: {
                desc: 'Jelszó',
                type: 'password',
                reqired: false,
                disabled: true
            },
            cim: {
                desc: 'Cím',
                type: 'text',
                reqired: false
            },
            tel: {
                desc: 'Telefonszám',
                type: 'text',
                reqired: false
            },
            szul: {
                desc: 'Születési dátum',
                type: 'date',
                reqired: true
            },
            taj: {
                desc: 'TAJ-szám',
                type: 'text',
                reqired: true
            }
        }
    };
});