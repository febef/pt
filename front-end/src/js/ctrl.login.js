
(function(){

   angular.module('main')
      .controller('ctrl.login', function($timeout, $resource){
        var vm = this;
         vm.animation='';

         vm.do = function() {
            $resource('/login').save({
               username: vm.username,
               password: vm.password
            }, function(resopnse){
            
            });
         };


         $timeout(function(){
            vm.animation='fx-fade-up fx-speed-600';
         }, 50);
      });

})();
