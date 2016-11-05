angular.module('chore').controller("editChildCtrl", function($scope,userService,$state,$auth){
  //backbutton
  $scope.goback = function(){
    window.history.go(-1);
  };

  var userInfo = $auth.getPayload().sub;
  console.log(userInfo);
  $scope.username = userInfo.user_first_name;

  $scope.childSubmitImage = function(image){
    userService.updateImage(userInfo.user_id_pk,image)
    .then(function(res){
      document.getElementById("child-setting-image").value = '';
    });
  };   id="child-setting-image"

  $scope.childSubmitName = function(name){
    userService.updateName(userInfo.user_id_pk,name)
    .then(function(res){
      document.getElementById("child-setting-name").value = '';
    });
  };

  $scope.childSubmitEmail = function(email){
    userService.updateEmail(userInfo.user_id_pk,email)
    .then(function(res){
      document.getElementById("child-setting-email").value = '';
    });
  };

  $scope.childSubmitPassword = function(password){
    console.log(userInfo.user_id_pk);
    userService.updatePassword(userInfo.user_id_pk,user_password)
    .then(function(res){
          document.getElementById("child-setting-password").value = '';
    });
  };





});
