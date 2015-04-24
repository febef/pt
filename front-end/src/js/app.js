
(function(){

   angular
      .module("main", [
         "ui.router",
         "ui.bootstrap",
         "ngFx",
         "ngResource",
         "chieffancypants.loadingBar"
      ])
      .config(function(cfpLoadingBarProvider) {
         //true is the default, but I left this here as an example:
         cfpLoadingBarProvider.includeSpinner = true;
      })
      .constant('config', {
         states : [{
               label : 'Inicio',
               url   : 'home',
               name  : 'home',
               views : {
                  'main' : {
                     templateUrl  : '/panels/main',
                     controller   : 'ctrl.home',
                     controllerAs : 'home'
                  }
               }
            },{
               label : 'Animaciones',
               url   : 'animations',
               name  : 'animations',
               views : {
                  'main' : {
                     templateUrl  : '/panels/animations',
                     controller   : 'ctrl.animations',
                     controllerAs : 'ani'
                  }
               }
            },{
               label : 'Ingresar',
               url   : 'login',
               name  : 'login',
               views : {
                  'main' : {
                     templateUrl  : '/panels/login',
                     controller   : 'ctrl.login',
                     controllerAs : 'login'
                  }
               }
            }]
         });

}());
