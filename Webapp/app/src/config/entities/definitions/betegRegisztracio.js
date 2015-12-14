/**
 * Created by Administrator on 2015.12.08..
 */
hospitalNet.config(function(entityDefinitions) {
    entityDefinitions.betegRegisztracio = {
        table: 'szemelyek',
        entity: 'szemely',
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
            tipus: {
                desc: 'Típus',
                type: 'select',
                options: {
                    staticData: [
                        {id: 'orvos', label: 'Orvos'},
                        {id: 'beteg', label: 'Beteg'},
                        {id: 'recepcios', label: 'Recepcios'},
                        {id: 'recepcios', label: 'Raktarfelugyelo'},
                        {id: 'recepcios', label: 'Vezeto'}
                    ]
                },
                defaultValue: 1,
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