angular.module('chore').controller("childLoginCtrl", function($scope, $auth, $state, childLoginService){
  //  $scope.test = "Message from child Login controller"

   $scope.login = function(user){
    //  console.log(user)
     childLoginService.userLogin(user).then(function(response){
      //  console.log(response)
       $auth.setToken(response)
         $state.go('childHome')

     })
   }
   $scope.authenticate = function(provider) {
   $auth.authenticate(provider)};
   // $scope.test = "Hello from login controller"
   $scope.revealer = function(){
   $scope.hide = !$scope.hide;

  }
})
