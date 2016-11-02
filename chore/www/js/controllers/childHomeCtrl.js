angular.module('chore').controller("childHomeCtrl", function($scope, $ionicModal, $window){
  // $scope.test = "Message from  child Home controller"
  $ionicModal.fromTemplateUrl('themeModal.html', {
     id: '1', // We need to use and ID to identify the modal that is firing the event!
     scope: $scope,
     backdropClickToClose: false,
     animation: 'slide-in-up'
   }).then(function(modal) {
     $scope.oModal1 = modal;
   });

   // Modal 2
  //  $ionicModal.fromTemplateUrl('takePictureModal.html', {
  //    id: '2', // We need to use and ID to identify the modal that is firing the event!
  //    scope: $scope,
  //    backdropClickToClose: false,
  //    animation: 'slide-in-up'
  //  }).then(function(modal) {
  //    $scope.oModal2 = modal;
  //  });
   $scope.openModal = function(index) {
     if (index == 1) $scope.oModal1.show();
     else $scope.oModal2.show();
   };

   $scope.closeModal = function(index) {
     if (index == 1) $scope.oModal1.hide();
     else $scope.oModal2.hide();
   };

   $scope.$on('$destroy', function() {
     $scope.oModal1.remove();
     $scope.oModal2.remove();

   });

  $scope.theme = "water"//user.theme




  $scope.setTheme = function(choice){
    //service.setTheme(choice).then(function(response){
    //if(response.status === 200){
    $scope.theme = choice
    //  }
//  })
  }




});
