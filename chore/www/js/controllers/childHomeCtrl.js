angular.module('chore').controller("childHomeCtrl", function($scope, $ionicModal, $auth, userService, $state){

   var userToken = $auth.getPayload();
   userService.getUserInfo = userToken;
   $scope.user = userToken.sub;
   if($scope.user.user_admin){
     $state.go('login')
   }
  //$scope.theme = $scope.user.user_theme
$scope.$on('$ionicView.beforeEnter', function () {
  var getTheme = function(){
    $scope.theme = userService.returnTheme()
  }
  if(userService.returnTheme()){
    getTheme()
  }
})


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




  $ionicModal.fromTemplateUrl('themeModal.html', {
     id: '1',
     scope: $scope,
     backdropClickToClose: false,
     animation: 'slide-in-up'
   }).then(function(modal) {
     $scope.oModal1 = modal;
   });


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

   });


  $scope.revealer = function(){
   this.hide = !this.hide;
  }

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
