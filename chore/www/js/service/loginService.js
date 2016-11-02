angular.module('chore').service('loginService', function($http){


  this.userLogin = function(user) {
    console.log(user, "service")
    return $http({
      method: "POST",
      url: '/auth/login',
      data: user
    })
  }
  this.makeUser = function(newUser) {
    return $http({
      method: "POST",
      url: '/auth/signup',
      data: newUser
    })
  }
}) // end of service
