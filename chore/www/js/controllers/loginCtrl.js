angular.module('chore').controller("loginCtrl", function($scope, $auth){

  $scope.authenticate = function(provider) {
  $auth.authenticate(provider);
  // $scope.test = "Hello from login controller"
  $scope.revealer = function(){
  $scope.hide = !$scope.hide;
  }
 }

})
