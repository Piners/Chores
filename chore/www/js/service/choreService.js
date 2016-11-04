angular.module('chore').service("choreService", function($http,$q,$auth){

this.getUserInfo = $auth.getPayload();


this.getChildren = function(household){
  return $http({
    method:"GET",
    url:"/children/" + household
  })
}

this.createChore = function(chore){
  console.log('how many times')
  return $http({
    method:"POST",
    url:"/assignchore",
    data:chore
  })
}




})//end of service
