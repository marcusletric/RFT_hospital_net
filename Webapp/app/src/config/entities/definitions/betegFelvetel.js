/**
 * Created by Administrator on 2015.12.08..
 */
hospitalNet.config(function(entityDefinitions){
    entityDefinitions.betegFelvetel = {
        table: 'betegfelvetel',
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
            szobaID: {
                desc: 'Szoba',
                type: 'select',
                options: {dynamicData: {table:'helyseg'}},
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
});