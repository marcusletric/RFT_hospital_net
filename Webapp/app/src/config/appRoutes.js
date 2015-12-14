/**
 * Created by Administrator on 2015.12.05..
 */
hospitalNet.constant('routes', [
        {
            name: 'Kezdőképernyő',
            href: 'home'
        },
        {
            name: 'Regisztráció',
            href: 'regisztracio',
            icon: 'registration.svg'
        },
        {
            name: 'Betegfelvétel',
            href: 'betegfelvetel',
            icon: 'illness.svg'
        },
        {
            name: 'Gyógyszer kiírása',
            href: 'gyogyszer',
            icon: 'pharmacy.svg'
        },
        {
            name: 'Műtét előjegyzése',
            href: 'mutet',
            icon: 'surgery.svg'
        },
        {
            name: 'Beosztás',
            href: 'beosztas',
            icon: 'workreport.svg'
        },
        {
            name: 'Raktár',
            href: 'raktar',
            icon: 'warehouse.png'
        },
        {
            name: 'Raktári egyed',
            href: 'raktari_egyed?egyed_id',
            params: {
                'egyed_id': null
            }
        },
        {
            name: 'Kimutatások',
            href: 'kimutat',
            icon: 'chart.svg'
        },
        {
            name: 'Kimutatás render',
            href: 'kimutatas_render',
            params: {
                'data': null
                /*'idoszak_kezd': null,
                'idoszak_vege': null*/
            }
        }
    ]
);

hospitalNet.config(function($stateProvider, routes) {
        routes.forEach(function (route) {
            var stateName = route.href.split('?')[0]
            $stateProvider.state(stateName, {
                url: "/" + route.href,
                templateUrl: 'src/features/' + stateName + '/' + stateName + '.html'
            });
        });
    }
);

hospitalNet.run(function($state){
   if(!$state.current.name || $state.current.name == ''){
        $state.go('home');
   }
});
