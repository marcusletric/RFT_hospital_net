/**
 * Created by Administrator on 2015.12.08..
 */
hospitalNet.config(function(entityDefinitions){
    entityDefinitions.raktariTargy = {
        table: 'targyak',
        entity: 'targy',
        dataFields: {
            tipus: {
                desc: 'Típus',
                type: 'select',
                options: {
                    staticData: [
                        {id: 'gyogyszer', label: 'Gyógyszer'},
                        {id: 'kotszer', label: 'Kötszer'}
                    ]
                },
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