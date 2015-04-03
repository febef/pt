
(function(){

   angular.module('main')
      .controller('ctrl.main', function($window, $timeout, $state, cfpLoadingBar){
         var vm = this;

         vm.state = $state;
         
         vm.nextpage = function(){
            $window.history.forward();
         };
         vm.backpage = function(){
            $window.history.back();
         };

         cfpLoadingBar.start();
      });

})();
