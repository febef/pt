
(function(){

   angular.module('main')
      .controller('ctrl.main', function($timeout, $state, cfpLoadingBar){
         this.state = $state;
         cfpLoadingBar.start();
      });

})();
