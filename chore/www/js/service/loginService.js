angular.module('chore').service('loginService', function($http){


  this.userLogin = function(user) {
//     console.log(user, "service")
    return $http({
      method: "POST",
      url: 'http://chorecheckoff.com/auth/login',
      data: user
    }).then(function(res){
      console.log(res);
      return res;
    })
  }
  this.makeUser = function(newUser) {
//     console.log(newUser);
    return $http({
      method: "POST",
      url: 'http://chorecheckoff.com/auth/signup',
      data: newUser
    })
  }
}) // end of service
