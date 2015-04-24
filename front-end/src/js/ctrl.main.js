
(function(){

   angular.module('main')
      .controller('ctrl.main', function($window, config, $state, cfpLoadingBar){
         var vm = this;

         vm.state = $state;
         vm.states = config.states;

         vm.nextpage = function(){
            $window.history.forward();
         };
         vm.backpage = function(){
            $window.history.back();
         };

         cfpLoadingBar.start();
      });

}());
