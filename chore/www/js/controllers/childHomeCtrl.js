angular.module('chore').controller("childHomeCtrl", function($scope, $ionicModal, $auth, userService, $state){
  // $scope.test = "Message from  child Home controller"
  //var userToken = userService.getUserInfo.sub;
 $scope.$on('$ionicView.beforeEnter', function () {
  var userToken = $auth.getPayload();
  userService.getUserInfo = userToken;
  $scope.user = userToken.sub;

  $scope.theme = $scope.user.user_theme
  $scope.setTheme = function(choice){
    var data = {}
    data.theme = choice
    data.userId = $scope.user.user_id_pk;
    console.log(data);
    userService.setTheme(data).then(function(response){
    if(response.status === 200){
      $scope.theme = choice
      }
  })
  }


  var getDailyChores = function(){
    id = $scope.user.user_id_pk
    userService.getDailyChores(id).then(function(response){
      $scope.dailyChores = response;
    })
  }
   getDailyChores()
  var getWeeklyChores = function(){
    id = $scope.user.user_id_pk
    userService.getWeeklyChores(id).then(function(response){
      $scope.weeklyChores = response;
    })
  }
  getWeeklyChores()
  var getMonthlyChores = function(){
    id = $scope.user.user_id_pk
    userService.getMonthlyChores(id).then(function(response){
      $scope.monthlyChores = response;
    })
  }
  getMonthlyChores()


})

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


  $scope.revealer = function(){
   this.hide = !this.hide;
  }

  $scope.checkOffchore = function(id){
    console.log(id);
    userService.checkOffchore(id).then(function(response){
      console.log(response);
    })
   }

   $scope.logout = function(){
     $auth.logout()
     $state.go('login')
   }

});
