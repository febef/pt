
(function(){

   angular.module('main')
      .config(function($stateProvider, $urlRouterProvider) {
      
         $urlRouterProvider.otherwise("");

         $stateProvider
            .state("home", {
               url: "",
               views : {
               "main" : {
                  templateUrl: "/panels/main",
                     controller: 'ctrl.home',
                     controllerAs: 'ctrl'
                  }
               }
            });

      });

})();
