
(function(){

   angular.module('main')
      .controller('ctrl.animations', function($timeout){
         var vm = this;
         vm.texts = [];

         var animations = [
            "fade-normal", "fade-down", "fade-down-big",
            "fade-left", "fade-left-big", "fade-right",
            "fade-right-big", "fade-up", "fade-up-big", "bounce-normal",
            "bounce-down", "bounce-left", "bounce-up", "bounce-right",
            "rotate-clock", "rotate-counterclock", "rotate-clock-left", 
            "rotate-counterclock-right", "rotate-counterclock-up",
            "zoom-normal", "zoom-up", "zoom-down", "zoom-left", "zoom-right"
         ];


         function shuffle (obj) {
            var rand;
            var index = 0;
            var shuffled = [];
            angular.forEach(obj, function(value) {
               rand = random(index++);
               shuffled[index - 1] = shuffled[rand];
               shuffled[rand] = value;
            });
            return shuffled;
         }

         function random (min, max) {
            if (max === null) {
               max = min;
               min = 0;
            }
            return min + Math.floor(Math.random() * (max - min + 1));
         }

         animations = shuffle(animations);

         vm.addtext = function(){
            vm.texts.push( animations[vm.texts.length]);
         };

         var deltext = function(i){
            $timeout(function(){
               vm.texts.pop();
            }, 300 * i );
         };

         var ani = function(){
            for(var i=0; i<animations.length;i++)
               $timeout(vm.addtext, 300 * i);
            $timeout(function() {
              for(var i=0; i < animations.length;i++) 
                  deltext(i);
            }, 10000);
            $timeout(ani, 18000);
         };
          ani();
      });
})();
