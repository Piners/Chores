angular.module('chore').controller("addChildCtrl", function($scope){
  //backbutton
  $scope.goback = function(){
    window.history.go(-1)
  }

$scope.submitChild = function(child){
  console.log(child);
  $scope.child = "";
  document.getElementById("child-input").value = "";
}





}) //end of controller
