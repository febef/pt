
(function(){

   angular.module('main')
      .controller('ctrl.main', function($timeout, cfpLoadingBar){
         cfpLoadingBar.start();
      });

})();
