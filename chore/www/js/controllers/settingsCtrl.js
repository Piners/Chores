angular.module('chore').controller("settingsCtrl", function($scope, $ionicModal, userService,$auth){
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

}

$scope.submitHousehold = function(house){
  console.log(house);
  console.log(userInfo.user_household);
  userService.updateHousehold(userInfo.user_household,house)
  .then(function(res){
        $scope.closeModal(2);
    document.getElementById("update-household").value ='';
  })
}




}) // end of controller
