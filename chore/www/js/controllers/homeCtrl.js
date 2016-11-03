angular.module('chore').controller("homeCtrl", function($scope, $ionicModal,userService,$window){
var userToken = userService.getUserInfo.sub;
console.log(userToken);
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
       user_household:userToken.user_household,
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

$scope.household =  userToken.user_household;
userService.getbanner(userToken.user_household).then(function(res){
console.log(res.data[0].user_banner_image);
  $scope.banner = res.data[0].user_banner_image;
});

console.log(userToken.zip);

userService.getWeather(userToken.zip)
.then(function(res){
  console.log(res.data);
  $scope.weather = res.data;
})


userService.showchild(userToken.user_household)
.then(function(res){
  console.log(res.data)
  $scope.showchild = res.data;
})


})//end of controller
