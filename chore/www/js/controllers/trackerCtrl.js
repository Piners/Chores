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

      $scope.confirmChore = function(choreID, index, scope){
         userService.confirmChore(choreID).then(function(response){
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

      $scope.denyChore = function(choreID, index, scope){
        userService.denyChore(choreID).then(function(response){
         if(response.status === 200){
               if(scope.chore_daily){
                 $scope.dailyChores[index].chore_status = false
               }
               if(scope.chore_weekly){
                 $scope.weeklyChores[index].chore_status = false
               }
               if(scope.chore_monthly){
                 $scope.monthlyChores[index].chore_status = false
               }

         }
        })
      }

      $scope.removeChore = function(choreID, index, scope){
        userService.removeChore(choreID).then(function(response){
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

      $scope.reducePoints = function(points){
        var id = $scope.child.user_id_pk
        userService.reducePoints(id, points).then(function(response){
          console.log('updated');
        })
      }


    });//end of contoller
