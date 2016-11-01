angular.module('chore').controller("childBankCtrl", function($scope){
   $scope.theme = 'water'//load user theme

   $scope.setTheme = function(){
     if($scope.theme === 'baseball'){
       $scope.themeImage = './img/img-baseball-trans.png'
     }
     if($scope.theme === 'charlieBrown'){
       $scope.themeImage = './img/snoopy.png'
     }
     if($scope.theme === 'princess'){
       $scope.themeImage = './img/Crown_Princess.png'
     }
     if($scope.theme === 'starWars'){
       $scope.themeImage = './img/death-star-2nd-icon.png'
     }
     if($scope.theme === 'water'){
       $scope.themeImage = './img/Transparent_Water_Drop_PNG_Picture.png'
     }

   }
   $scope.setTheme();
})
