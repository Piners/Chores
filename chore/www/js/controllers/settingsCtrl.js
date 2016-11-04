
angular.module('chore').controller("settingsCtrl", function($scope, $ionicModal, userService,loginService,$auth,$state){

  $ionicModal.fromTemplateUrl('changePassword.html', {
     id: '1', // We need to use and ID to identify the modal that is firing the event!
     scope: $scope,
     backdropClickToClose: false,
     animation: 'slide-in-up'
   }).then(function(modal) {
     $scope.oModal1 = modal;
   });

   // Modal 2
   $ionicModal.fromTemplateUrl('changeHousehold.html', {
     id: '2', // We need to use and ID to identify the modal that is firing the event!
     scope: $scope,
     backdropClickToClose: false,
     animation: 'slide-in-up'
   }).then(function(modal) {
     $scope.oModal2 = modal;
   });

   $ionicModal.fromTemplateUrl('changeZip.html', {
     id: '3', // We need to use and ID to identify the modal that is firing the event!
     scope: $scope,
     backdropClickToClose: false,
     animation: 'slide-in-up'
   }).then(function(modal) {
     $scope.oModal3 = modal;
   });

   $ionicModal.fromTemplateUrl('addParent.html', {
     id: '4', // We need to use and ID to identify the modal that is firing the event!
     scope: $scope,
     backdropClickToClose: false,
     animation: 'slide-in-up'
   }).then(function(modal) {
     $scope.oModal4 = modal;
   });

   $ionicModal.fromTemplateUrl('removeChild.html', {
     id: '5', // We need to use and ID to identify the modal that is firing the event!
     scope: $scope,
     backdropClickToClose: false,
     animation: 'slide-in-up'
   }).then(function(modal) {
     $scope.oModal5 = modal;
   });



   $scope.openModal = function(index) {
     if (index == 1) $scope.oModal1.show();
     else if(index == 2) $scope.oModal2.show();
     else if(index == 3) $scope.oModal3.show();
     else if(index == 4) $scope.oModal4.show();
     else $scope.oModal5.show();
   };

   $scope.closeModal = function(index) {
     if (index == 1) $scope.oModal1.hide();
     else if(index == 2) $scope.oModal2.hide();
     else if(index == 3) $scope.oModal3.hide();
     else if(index == 4) $scope.oModal4.hide();
     else $scope.oModal5.hide();
   };

   $scope.$on('$destroy', function() {
     $scope.oModal1.remove();
     $scope.oModal2.remove();
     $scope.oModal3.remove();
     $scope.oModal4.remove();
     $scope.oModal5.remove();
   });

var userInfo = $auth.getPayload().sub;

console.log(userInfo);


$scope.submitPassword = function(user){
  console.log(userInfo.user_id_pk);
  userService.updatePassword(userInfo.user_id_pk,user.user_new_password)
  .then(function(res){
    $scope.closeModal(1);
    document.getElementById("old-password").value = '';
        document.getElementById("new-password").value = '';
  });

};

$scope.submitHousehold = function(house){
  userService.updateHousehold(userInfo.user_household,house)
  .then(function(res){
        $scope.closeModal(2);
    document.getElementById("update-household").value ='';
  });
};

$scope.submitZipCode = function(zipcode){
  userService.updatezip(userInfo.user_household,zipcode)
  .then(function(res){
    $scope.closeModal(3);
    document.getElementById("update-zip").value ='';

  });
};

$scope.createParent = function(user){
  user.zipcode = userInfo.zip;
  user.household = userInfo.user_household;
  loginService.makeUser(user).then(function(response){
    $auth.setToken(response);
      $scope.closeModal(4);
      document.getElementById("setting-parent-first").value ='';
      document.getElementById("setting-parent-last").value ='';
      document.getElementById("setting-email").value ='';
      document.getElementById("setting-password").value ='';

  });
};

$scope.getChild = function(){
  console.log('fired');
userService.showchild(userInfo.user_household)
.then(function(res){
  console.log(res.data);
  $scope.showchild = res.data;
});
};
var removeChild = [];

$scope.logger= function(index){
  $scope.showchild[index].selected = !$scope.showchild[index].selected;
  $scope.removeChild(index);
  console.log(index);
}

$scope.removeChild = function(index){
$scope.showchild[index].selected = !$scope.showchild[index].selected;
  var selectedChild = $scope.showchild[index].user_id_pk;
  if($scope.showchild[index].selected){
      removeChild.push(selectedChild);
  }else{
    var i = removeChild.indexOf(selectedChild);
    removeChild.splice(i,1);
  }
}

$scope.deleteChild = function(){
  console.log(removeChild);
  removeChild.forEach(function(val){
    userService.deleteChild(val)
    .then(function(res){

    });
  }
)
removeChild = [];
$scope.closeModal(5);
}

$scope.logout = function(){
  $auth.logout()
  $state.go('login')
}

}); // end of controller
