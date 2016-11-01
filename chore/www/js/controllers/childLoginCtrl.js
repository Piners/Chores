angular.module('chore').controller("childLoginCtrl", function($scope, $auth, $state, loginService){
  //  $scope.test = "Message from child Login controller"

   $scope.loginChild = function(user){
     console.log(user)
     loginService.userLogin(user).then(function(response){
       console.log(response)
       $auth.setToken(response)
         $state.go('childHome')

     })
   }
})
