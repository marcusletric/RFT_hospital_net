/**
 * Created by Administrator on 2015.12.08..
 */
hospitalNet.config(function(entityDefinitions){
    entityDefinitions.mutetElojegyzes = {
        table: 'mutetek',
        dataFields: {
            betegID: {
                desc: 'Beteg',
                type: 'select',
                options: {
                    dynamicData: {
                        table: 'szemelyek',
                        entity: 'szemely',
                        labelFields: ['vezeteknev', 'keresztnev'],
                        filter: {'tipus':'beteg'}
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
                options: {dynamicData: {table:'helyseg',filter:{'tipus':'muto'}}},
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
});