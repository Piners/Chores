angular.module('chore').controller("assignChoreCtrl", function($scope,choreService,$state){

var currentUser = choreService.getUserInfo.sub;


choreService.getChildren(currentUser.user_household)
.then(function(res){
  // $scope.chores = res.data;
  $scope.childs = res.data;
  console.log(res.data);
});


$scope.values = [];

$scope.chore = {
chore_daily: false,
chore_weekly: false,
chore_monthly:false,

};

function CreateChore(name,description,household,value,daily,weekly,monthly,child){
  this.chore_name = name;
  this.chore_description = description;
  this.user_household_fk = household;
  this.chore_value = value;
  this.chore_daily = daily;
  this.chore_weekly = weekly;
  this.chore_monthly = monthly;
  this.user_id_fk = child;
}


var childrenChores = [];
$scope.childChore = function(chore){
  var selectChild = this.child.user_id_pk;
  var childChore = new CreateChore(chore.chore_name,chore.chore_description,currentUser.user_household,chore.chore_value,chore.chore_daily,chore.chore_weekly,chore.chore_monthly,selectChild);
console.log(childChore);
  childrenChores.push(childChore);
  console.log(childrenChores);
};


$scope.submitChore = function(){
  console.log(childrenChores);
  childrenChores.forEach(function(val){
    console.log('i');
    choreService.createChore(val)
    .then(function(res){});
  }

);
childrenChores = [];
};







});//end of controller
