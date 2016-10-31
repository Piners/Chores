angular.module('chore').service('userService', function($http,$q,$auth){


this.getUserInfo = $auth.getPayload();

console.log(this.getUserInfo);

console.log('hello from service');




});//end of service
