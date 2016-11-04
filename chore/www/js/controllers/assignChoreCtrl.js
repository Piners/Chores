angular.module('chore').controller("assignChoreCtrl", function($scope,choreService,$state, $window){

var currentUser = choreService.getUserInfo.sub;


choreService.getChildren(currentUser.user_household)
.then(function(res){
  // $scope.chores = res.data;
  $scope.childs = res.data;
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

var childIds = [];
var childrenChores = [];
$scope.childChore = function(chore){
  var selectChild = this.child.user_id_pk;
  if(childIds.indexOf(selectChild) !== -1){
    return
  }
  else{
  var childChore = new CreateChore(chore.chore_name,chore.chore_description,currentUser.user_household,chore.chore_value,chore.chore_daily,chore.chore_weekly,chore.chore_monthly,selectChild);
  childrenChores.push(childChore);
  childIds.push(selectChild)
 }
};

$scope.submitChore = function(){
  childrenChores.forEach(function(val){
    choreService.createChore(val)
    .then(function(res){
    $window.location.reload()
    });
  }

);
childrenChores = [];
};

$scope.makeChoice = function(){
  this.selected = {
    'border': 'solid 2px #f9f9f9'
    }
}





});//end of controller
