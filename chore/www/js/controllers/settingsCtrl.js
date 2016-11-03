angular.module('chore').controller("settingsCtrl", function($scope, $ionicModal, $auth){
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

   // send a request to your server to perform server-side logout
    $http.post('/logout').succcess(function() {
      console.log('Successfully logged out');
    });;
});
