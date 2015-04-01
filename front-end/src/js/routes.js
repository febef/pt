
(function(){

   angular.module('main')
      .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

         $urlRouterProvider.otherwise("home");
         $stateProvider
            .state("home", {
               url: "/home",
               views : {
                  "main" : {
                     templateUrl: "/panels/main",
                     controller: 'ctrl.home',
                     controllerAs:'home'
                  }
               }
            })
            .state("animations", {
               url: "/animations",
               views : {
                  "main" : {
                     templateUrl: "/panels/animations",
                     controller:'ctrl.animations',
                     controllerAs:'ani'
                  }
               }
            })
            .state("login", {
               url: "/login",
               views : {
                  "main" : {
                     templateUrl: "/panels/login",
                     controller: 'ctrl.login',
                     controllerAs:'login'
                  }
               }
            });


      });

})();
