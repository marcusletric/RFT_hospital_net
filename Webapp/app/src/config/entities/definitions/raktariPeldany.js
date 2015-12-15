/**
 * Created by Administrator on 2015.12.08..
 */
/**
 * Created by Administrator on 2015.12.08..
 */
hospitalNet.config(function(entityDefinitions){
    entityDefinitions.raktariPeldany= {
        table: 'raktar_targyak',
        entity: 'targy',
        dataFields: {
            raktarID: {
                desc: 'Raktár',
                type: 'select',
                options: {
                    dynamicData: {
                        table: 'szobak',
                        entity: 'szoba',
                        labelFields: ['szam'],
                        filter: {'tipus': 'raktar'}
                    }
                },
                reqired: true
            },
            targyID: {
                desc: 'Termék',
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
            szavatossag: {
                desc: 'Szavatosság',
                type: 'date',
                reqired: true
            },
            mennyiseg: {
                desc: 'Mennyiség',
                type: 'text',
                save: false,
                reqired: true
            },
            kivetel_ok: {
                desc: 'Termék kivételének oka',
                type: 'select',
                options: {
                    staticData: [
                        {id: 'kiadas', label: 'Kiadás'},
                        {id: 'selejtezes', label: 'Selejtezés'},
                    ]
                },
                reqired: false,
                disabled: true
            },
            kivetel_datum: {
                desc: 'Kivétel dátuma',
                type: 'date',
                reqired: false,
                disabled: true
            }
        }
    };
});