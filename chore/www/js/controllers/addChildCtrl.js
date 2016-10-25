angular.module('chore').controller("addChildCtrl", function($scope){
  //backbutton
  $scope.goback = function(){
    window.history.go(-1)
  }

})
