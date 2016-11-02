angular.module('chore').service("choreService", function($http,$q,$auth){

this.getUserInfo = $auth.getPayload();


this.getDefaultChores = function(){
  return $http({
    method:"GET",
    url:"/defaultchores"
  })
}





})//end of service
