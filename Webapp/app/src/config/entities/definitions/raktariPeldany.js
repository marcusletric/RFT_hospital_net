/**
 * Created by Administrator on 2015.12.08..
 */
/**
 * Created by Administrator on 2015.12.08..
 */
hospitalNet.config(function(entityDefinitions){
    entityDefinitions.raktariPeldany= {
        table: 'targyak_raktaron',
        dataFields: {
            raktarID: {
                desc: 'Raktár',
                type: 'select',
                reqired: true
            },
            targyID: {
                desc: 'Termék',
                type: 'select',
                reqired: true
            },
            szavatossag: {
                desc: 'Szavatosság',
                type: 'date',
                reqired: true
            },
            statusz: {
                desc: 'Raktáron',
                type: 'checkbox',
                reqired: false
            },
            kivetelOka: {
                desc: 'Termék kivételének oka',
                type: 'select',
                reqired: false
            },
            kivetelDátum: {
                desc: 'Kivétel dátuma',
                type: 'date',
                reqired: false
            }
        }
    };
});