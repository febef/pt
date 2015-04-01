
(function(){

   angular
      .module("main", [
         "ui.router",
         "ui.bootstrap",
         "ngFx",
         "ngResource",
         "chieffancypants.loadingBar"
      ])
      .config(function(cfpLoadingBarProvider) {
         //true is the default, but I left this here as an example:
         cfpLoadingBarProvider.includeSpinner = true;
      });

})();
