angular.module('chore').service("choreService", function($http,$q,$auth){

this.getUserInfo = $auth.getPayload();


this.getChildren = function(household){
  return $http({
    method:"GET",
    url:"http://chorecheckoff.com/children/" + household
  })
}

this.createChore = function(chore){
  return $http({
    method:"POST",
    url:"http://chorecheckoff.com/assignchore",
    data:chore
  })
}




})//end of service
