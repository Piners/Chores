angular.module('chore').controller("trackerCtrl", function($scope, $ionicModal, $state, userService){
    var getChild = function(){
      userService.getChild($state.params.id).then(function(response){
        $scope.child = response[0]
      })
    }
    getChild()


      userService.getDailyChores($state.params.id).then(function(response){
        console.log(response);
        $scope.dailyChores = response;
      });

      userService.getWeeklyChores($state.params.id).then(function(response){
        console.log(response);
        $scope.weeklyChores = response;
      });

      userService.getMonthlyChores($state.params.id).then(function(response){
        console.log(response);
        $scope.monthlyChores = response;
      });


    });



  // $ionicModal.fromTemplateUrl('picConfModal.html', {
  //   scope: $scope,
  //   animation: 'slide-in-up'
  // }).then(function(modal) {
  //   $scope.modal = modal;
  // });
  // $scope.openModal = function() {
  //   $scope.modal.show();
  // };
  // $scope.closeModal = function() {
  //   $scope.modal.hide();
  // };
  // // Cleanup the modal when we're done with it!
  // $scope.$on('$destroy', function() {
  //   $scope.modal.remove();
  // });
  // // Execute action on hide modal
  // $scope.$on('modal.hidden', function() {
  //   // Execute action
  // });
  // // Execute action on remove modal
  // $scope.$on('modal.removed', function() {
  //   // Execute action
  // });
