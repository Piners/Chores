angular.module('chore').controller("addChildCtrl", function($scope,userService,$state){
  //backbutton
  $scope.goback = function(){
    window.history.go(-1)
  }
var user = userService.getUserInfo.sub;
console.log(user);
$scope.submitChild = function(child){
  child.user_household = user.user_household;
  console.log(child);
  userService.addChild(child)
  .then(function(res){
    $state.go('home');
  });

}





}) //end of controller
