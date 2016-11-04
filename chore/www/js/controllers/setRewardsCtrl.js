angular.module('chore').controller("setRewardsCtrl", function($scope, $ionicModal, $state, userService, $auth){
  var userToken = $auth.getPayload();
  userService.getUserInfo = userToken;
  $scope.user = userToken.sub;
  console.log($scope.user);

  var getChild = function(){
    userService.getChild($state.params.id).then(function(response){
      $scope.child = response[0]
      console.log($scope.child);
    })
  }
  getChild()
  var getRewards = function(){
    userService.getRewards($state.params.id).then(function(response){
      $scope.rewards = response;
    })
  }
  getRewards()

  $scope.removeReward = function(id,i){
    reward = {}
    userId = $state.params.id;
    rewardId = id;
    userService.removeReward(userId, rewardId).then(function(response){
      if(response.status === 200){
            $scope.rewards.splice(i, 1)
          }
    })
  }

   $scope.makeReward = function(newReward){
     if(document.getElementById("togglecheckbox").checked){
       newReward.user_id_fk = $state.params.id;
       newReward.user_household_fk = $scope.child.user_household;
       userService.makeReward(newReward).then(function(response){
         if(response.status === 200){
           getRewards()
           $scope.closeModal()
         }
       })
     }
     else{
       userService.showchild($scope.user.user_household)
       .then(function(res){
         var children = []
         for (var i =0; i < res.data.length; i++){
           children.push(res.data[i].user_id_pk)
         }
         console.log(children);
         var calls=[]
         for(var j = 0; j < children.length; j++){

            calls.push(outer(children[j]));
         }
         calls.forEach(function(element){
               element()
             })
       })
       function outer(child){
         console.log(child);
             return function inner(){
               var reward = {};
               reward.user_id_fk = child;
               reward.user_household_fk = $scope.child.user_household;
               reward.reward_description = newReward.reward_description;
               reward.reward_total = newReward.reward_total
               console.log(reward);
                userService.makeReward(reward).then(function(response){
                 if(response.status === 200){
                   $scope.closeModal()
                   getRewards()
                 }
                })
             }

           }
     }

   }

  $ionicModal.fromTemplateUrl('rewardModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
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
  //backbutton
  $scope.goback = function(){
    window.history.go(-1)
  }



})
