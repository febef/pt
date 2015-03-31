
(function(){

   angular.module('main')
      .controller('ctrl.home', function($timeout){
        var vm = this;
         vm.ani='';

         $timeout(function(){
            vm.ani='fx-fade-up fx-speed-500';
         }, 0);
      });

})();
