/**
 * Created by Administrator on 2015.12.08..
 */
hospitalNet.config(function(entityDefinitions){
    entityDefinitions.raktariTargy = {
        table: 'raktari_targy',
        dataFields: {
            tipus: {
                desc: 'Típus',
                type: 'text',
                reqired: true
            },
            nev: {
                desc: 'Név',
                type: 'text',
                reqired: true
            }
        }
    };
});