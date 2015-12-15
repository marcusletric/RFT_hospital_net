/**
 * Created by Administrator on 2015.12.08..
 */
hospitalNet.run(function(entityDefinitions,$filter) {
    entityDefinitions.gyogyszerKiiras = {
        table: 'kiirasok',
        entity: 'kiiras',
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
            gyogyszerID: {
                desc: 'Gyógyszer',
                type: 'select',
                options: {
                    dynamicData: {
                        table: 'targyak',
                        entity: 'targy',
                        labelFields: ['nev']
                    }
                },
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
                defaultValue: $filter('date')(new Date(),'yyyy-MM-dd'),
                disabled: true
            }
        }
    };
});