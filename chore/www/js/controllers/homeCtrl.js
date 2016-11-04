angular.module('chore').controller("homeCtrl", function($scope, $ionicModal,userService,$window, $auth){
  var userToken = $auth.getPayload();
  userService.getUserInfo = userToken;
  $scope.user = userToken.sub;
  $scope.banner = $scope.user_banner_image;

   $ionicModal.fromTemplateUrl('bannerModal.html', {
     scope: $scope,
     animation: 'slide-in-up'
   }).then(function(modal) {
     $scope.modal = modal;
   });
   $scope.openModal = function() {
     $scope.modal.show();
   };
   $scope.submitBanner = function(banner){
     var bannerInfo = {
       user_household:user.user_household,
       user_banner_image:banner
     }
      userService.postbanner(bannerInfo)
      .then(function(res){
     $scope.modal.hide();
          document.getElementById("modal-box").value = '';
          $window.location.reload(true);
     });
   };
   $scope.closeModal = function() {
     document.getElementById("modal-box").value = '';
     $scope.modal.hide();
   };
   // Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
     $scope.modal.remove();
   });
   // Execute action on hide modal
   $scope.$on('modal.hidden', function() {
     // Execute action

   });
   // Execute action on remove modal
   $scope.$on('modal.removed', function() {
     // Execute action
   });


$scope.household =  $scope.user.user_household;
userService.getbanner($scope.user.user_household).then(function(res){
    $scope.banner = res.data[0].user_banner_image;
});



userService.getWeather($scope.user.zip)
.then(function(res){
  $scope.weather = res.data;
})


userService.showchild($scope.user.user_household)
.then(function(res){
  $scope.showchild = res.data;
})
// $auth.logout().then(function() {

 // send a request to your server to perform server-side logout
//   $http.post('/logout').succcess(function() {
//     console.log('Successfully logged out');
//   });;
//
 // });


})//end of controller
