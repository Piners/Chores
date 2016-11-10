angular.module('chore').controller("loginCtrl", function($scope, $auth, $state, loginService){

$scope.login = function(user){
  // console.log(user)
  loginService.userLogin(user).then(function(response){
    if(response.status === 200){
      $auth.setToken(response)
        $state.go('home')
    }
    else{
      alert('Email or password incorrect')
    }

  })
}

$scope.makeUser = function(newUser){
  loginService.makeUser(newUser).then(function(response){
    $auth.setToken(response)
    alert("new user created")
  })
}
  $scope.authenticate = function(provider) {
  $auth.authenticate(provider)};
  // $scope.test = "Hello from login controller"


  $scope.revealer = function(){
  $scope.hide = !$scope.hide;
 }

})
