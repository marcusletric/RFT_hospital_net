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
            name: 'Kimutatások',
            href: 'kimutat',
            icon: 'chart.svg'
        }
    ]
);

hospitalNet.config(function($stateProvider, routes) {
        routes.forEach(function (route) {
            $stateProvider.state(route.href, {
                url: "/" + route.href,
                templateUrl: 'src/features/' + route.href + '/' + route.href + '.html'
            });
        });
    }
);

hospitalNet.run(function($state){
   if(!$state.current.name || $state.current.name == ''){
        $state.go('home');
   }
});
