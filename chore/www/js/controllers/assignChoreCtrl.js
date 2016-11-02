angular.module('chore').controller("assignChoreCtrl", function($scope,choreService,$state){

var currentUser = choreService.getUserInfo.sub;


choreService.getChildren(currentUser.user_household)
.then(function(res){
  // $scope.chores = res.data;
  $scope.childs = res.data
  console.log(res.data[0]);
})




$scope.chore = {
chore_daily: false,
chore_weekly: false,
chore_monthly:false
}

$scope.submitChore = function(chore){
  chore.user_household_fk = currentUser.user_household;
  console.log(chore)
  // choreService.createChore(chore)
  // .then(function(res){
  //
  // })
}







})//end of controller
