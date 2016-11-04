angular.module('chore').controller("editChildCtrl", function($scope,userService,$state){
  //backbutton
  $scope.goback = function(){
    window.history.go(-1);
  };

  var user = userService.getUserInfo.sub;
  console.log(user);
  $scope.changeImage = function(image){
    image.user_household = user.user_household;
    console.log(image);
    userService.addImage(image)
    .then(function(res){
      $state.go('editChild');
    });
  };

  var user = userService.getUserInfo.sub;
  console.log(user);
  $scope.changeName = function(name){
    name.user_household = user.user_household;
    console.log(image);
    userService.addName(name)
    .then(function(res){
      $state.go('editChild');
    });
  };

});
