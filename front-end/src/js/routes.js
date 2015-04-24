
(function(){

   angular.module('main')
      .config(function($stateProvider, config, $urlRouterProvider, $locationProvider) {
         
         var state = {};

         $urlRouterProvider.otherwise("home");
         $locationProvider.html5Mode({
            enabled     : true,
            requireBase : false
         });

         for (state in config.states) {
            $stateProvider
               .state(config.states[state].name, {
                  url : '/' + config.states[state].url,
                  views : config.states[state].views
               });
         }
      

      });

}());
