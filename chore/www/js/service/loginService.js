angular.module('chore').service('loginService', function($http){
  this.login = function(provider){

  $http({
      method: "GET",
      url: "/api/me"

    }).then(function(response){
        console.log(response);



    });
  };
