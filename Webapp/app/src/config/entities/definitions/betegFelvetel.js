/**
 * Created by Administrator on 2015.12.08..
 */
hospitalNet.config(function(entityDefinitions){
    entityDefinitions.betegFelvetel = {
        table: 'beteg_fel_elbocs',
        entity: 'felv_elbocs',
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
            orvosID: {
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
            szobaID: {
                desc: 'Szoba',
                type: 'select',
                options: {
                    dynamicData: {
                        table: 'szobak',
                        entity: 'szoba',
                        labelFields: ['szam'],
                        filter: {'tipus': ['vizsgalo', 'elfekvo']}
                    }
                },
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
            elbocsatas_ok: {
                desc: 'Elbocsátás oka',
                type: 'textarea',
                reqired: false,
                disabled: true
            }
        }
    };
});