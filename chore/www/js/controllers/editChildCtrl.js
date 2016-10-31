angular.module('chore').controller("editChildCtrl", function($scope){
  $scope.goback = function(){
    window.history.go(-1)
  }

})
