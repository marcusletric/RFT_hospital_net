/**
 * Created by Administrator on 2015.12.09..
 */
/**
 * Created by Administrator on 2015.12.08..
 */
hospitalNet.config(function(entityDefinitions){
    entityDefinitions.helyseg = {
        table: 'helyseg',
        dataFields: {
            szam: {
                desc: 'Szobaszám',
                type: 'text',
                reqired: true
            },
            ferohely: {
                desc: 'Férőhely',
                type: 'text',
                reqired: true
            },
            tipus: {
                desc: 'Típus',
                type: 'select',
                reqired: true
            }
        }
    };
});