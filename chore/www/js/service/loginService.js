angular.module('chore').service('loginService', function($http){
  // this.login = function(provider){
  //
  // $http({
  //     method: "GET",
  //     url: "/api/me"
  //
  //   }).then(function(response){
  //       console.log(response);
  //
  //
  //
  //   });

  this.payLoad = function() {
    var payLoadData = $auth.getPayload() {
      return payLoadData;
    }
  }


  this.userLogin = function(user) {
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
  };
