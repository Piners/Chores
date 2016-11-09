angular.module('chore').controller("editChildCtrl", function($scope,userService,$state,$auth){
  //backbutton
  $scope.goback = function(){
    window.history.go(-1);
  };

  var getChild = function(){
    userService.getChild($state.params.id).then(function(response){
      $scope.child = response[0]
    })
  }
  getChild()

  $scope.childSubmitImage = function(image){
    userService.updateImage($scope.child.user_id_pk,image)
    .then(function(res){
      if(res.status === 200){
          document.getElementById("child-setting-image").value = '';
      }
    });
  };

  $scope.childSubmitName = function(name){
    userService.updateName($scope.child.user_id_pk,name)
    .then(function(res){
      if(res.status === 200){
        getChild()
        document.getElementById("child-setting-name").value = '';
      }
    });
  };

  $scope.childSubmitEmail = function(email){
    userService.updateEmail($scope.child.user_id_pk,email)
    .then(function(res){
      document.getElementById("child-setting-email").value = '';
    });
  };

  $scope.childSubmitPassword = function(password){
    console.log($scope.child.user_id_pk);
    userService.updatePassword($scope.child.user_id_pk, password)
    .then(function(res){
          document.getElementById("child-setting-password").value = '';
    });
  };





});
