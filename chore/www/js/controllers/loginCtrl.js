angular.module('chore').controller("loginCtrl", function($scope, $auth, $state, loginService){

$scope.login = function(user){
  // console.log(user)
  loginService.userLogin(user).then(function(response){
    // console.log(response)
    $auth.setToken(response)
      $state.go('home')

  })
}
$scope.makeUser = function(newUser){
  loginService.makeUser(newUser).then(function(response){
    $auth.setToken(response)
      $state.go('home')
  })
}
  $scope.authenticate = function(provider) {
  $auth.authenticate(provider)};
  // $scope.test = "Hello from login controller"
  $scope.revealer = function(){
  // $scope.hide = !$scope.hide;

 }

})
