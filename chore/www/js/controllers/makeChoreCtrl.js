angular.module('chore').controller("makeChoreCtrl", function($scope){
  $scope.goback = function(){
    window.history.go(-1)
  }

})
