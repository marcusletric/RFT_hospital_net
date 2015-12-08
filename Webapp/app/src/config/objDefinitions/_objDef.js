/**
 * Created by Administrator on 2015.12.06..
 */
hospitalNet.constant('objectDefinitions', {
    beteg: betegReg,
    betegfelvetel: betegFelvetel,
    mutet: mutetElojegyzes,
    gyogyszerkiiras: gyogyszerKiiras,
    raktari_targy: raktariTargy
});

hospitalNet.run(function($rootScope,objectDefinitions){
    $rootScope.objDef = objectDefinitions;
});