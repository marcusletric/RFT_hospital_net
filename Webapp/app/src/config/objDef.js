/**
 * Created by Administrator on 2015.12.06..
 */
hospitalNet.constant('objectDefinitions', {
    szemely: {
        dataFields: {
            vezeteknev: {
                desc: 'Vezetéknév',
                type: 'text',
                reqired: true
            },
            keresztnev: {
                desc: 'Keresztnév',
                type: 'text',
                reqired: true
            },
            taj: {
                desc: 'Taj szám',
                type: 'text',
                reqired: true
            }
        }
    }
});

hospitalNet.run(function($rootScope,objectDefinitions){
    $rootScope.objDef = objectDefinitions;
});