angular.module('chore').service('childLoginService', function($http){


  this.userLogin = function(user) {
    // console.log(user, "service")
    return $http({
      method: "POST",
      url: '/auth/login',
      data: user
    })
  }
)}
