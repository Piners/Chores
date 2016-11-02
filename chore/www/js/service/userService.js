angular.module('chore').service('userService', function($http,$q,$auth){

var banner;
this.getUserInfo;


this.postbanner = function(banner){
  console.log(banner);
  console.log(banner.user_banner_image);
  return $http({
    method: "PUT",
    url:"/banner/" + banner.user_household,
    data: JSON.stringify({user_banner_image:banner.user_banner_image})
  })
}

this.getbanner = function(userId){
  console.log(userId);
  return $http({
    method: "GET",
    url:"/banner/" + userId
  })
}


this.getWeather = function(){
return $http({
    method: "GET",
    url:'http://api.openweathermap.org/data/2.5/weather?q=zip=84010&units=imperial&appid=c10ef99c5afdee3fdfba78e8c981a9b6'
  })

};

// this.postTheme = function(data){
//   return $http({
//     method: 'GET',
//     url:
//     data: data
//   }).then(function(res) {
//       return res;
//   }).catch(function(err) {
//      console.log(err);
//   })
// }



});//end of service
