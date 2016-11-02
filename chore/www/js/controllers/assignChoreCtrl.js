angular.module('chore').controller("assignChoreCtrl", function($scope,choreService,$state){

var currentUser = choreService.getUserInfo.sub;


choreService.getDefaultChores()
.then(function(res){
  $scope.chores = res.data;
  console.log(res.data);
})







})//end of controller
