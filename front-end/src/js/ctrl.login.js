
(function(){

   angular.module('main')
      .controller('ctrl.login', function($timeout){
        var vm = this;
         vm.animation='';

         $timeout(function(){
            vm.animation='fx-fade-up fx-speed-600';
         }, 50);
      });

})();
