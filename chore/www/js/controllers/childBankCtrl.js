angular.module('chore').controller("childBankCtrl", function($scope, $auth, userService){
  var userToken = $auth.getPayload();
   userService.getUserInfo = userToken;
   $scope.user = userToken.sub;
   $scope.theme = $scope.user.user_theme

   $scope.$on('$ionicView.beforeEnter', function () {
     var getTheme = function(){
       $scope.theme = userService.returnTheme()
     }
     if(userService.returnTheme()){
       getTheme()
     }
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
  });





   var getRewards = function(){
     id = $scope.user.user_id_pk;
     userService.getRewards(id).then(function(response){
       $scope.rewards = response;
     })
   }
   getRewards();


})
