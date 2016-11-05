angular.module('chore').controller("trackerCtrl", function($scope, $ionicModal, $state, userService){
    var getChild = function(){
      userService.getChild($state.params.id).then(function(response){
        $scope.child = response[0]
      })
    }
    getChild()

      userService.getDailyChores($state.params.id).then(function(response){
        $scope.dailyChores = response;
      });

      userService.getWeeklyChores($state.params.id).then(function(response){
        $scope.weeklyChores = response;
      });

      userService.getMonthlyChores($state.params.id).then(function(response){
        $scope.monthlyChores = response;
      });

      $scope.confirmChore = function(choreID, childID, index, scope){
        console.log(choreID, childID)
        console.log(index, scope);
         userService.confirmChore(choreID, childID).then(function(response){
          if(response.status === 200){
                if(scope.chore_daily){
                  $scope.dailyChores.splice(index, 1)
                }
                if(scope.chore_weekly){
                  $scope.weeklyChores.splice(index, 1)
                }
                if(scope.chore_monthly){
                  $scope.monthlyChores.splice(index, 1)
                }

          }
         })
      }

      $scope.denyChore = function(choreID, childID){
        console.log(choreID, childID);
      }
      $scope.removeChore = function(choreID, childID){

        console.log(choreID, childID);
      }
    });//end of contoller


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
