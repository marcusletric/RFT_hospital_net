/**
 * Created by Administrator on 2015.12.08..
 */
hospitalNet.config(function(entityDefinitions){
    entityDefinitions.betegElbocsatas = {
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
                reqired: true,
                disabled: true
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
                reqired: true,
                disabled: true
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
                reqired: true,
                disabled: true
            },
            felvetel: {
                desc: 'Felvétel ideje',
                type: 'date',
                reqired: true,
                disabled: true
            },
            elbocsatas: {
                desc: 'Elbocsátás ideje',
                type: 'date',
                reqired: true
            },
            elbocsatas_ok: {
                desc: 'Elbocsátás oka',
                type: 'textarea',
                reqired: false
            }
        }
    };
});