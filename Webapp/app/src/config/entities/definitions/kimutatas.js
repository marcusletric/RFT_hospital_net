/**
 * Created by Administrator on 2015.12.09..
 */
hospitalNet.config(function(entityDefinitions){
    entityDefinitions.kimutatas = {
        table: 'beosztasok',
        entity: 'beosztas',
        dataFields: {
            tipus: {
                desc: 'Kimutatás',
                type: 'select',
                options: {
                    staticData: [
                        //{id: 'betegsegek', label: 'Betegségek'},
                        {id: 'beosztas', label: 'Beosztások'}
                        //{id: 'raktar_targyak', label: 'Raktár'}
                    ]
                },
                reqired: true
            },
            kezdete: {
                desc: 'Időszak kezdete',
                type: 'date',
                reqired: true
            },
            vege: {
                desc: 'Időszak vége',
                type: 'date',
                reqired: true
            }
        }
    };
});