angular.module('chore').service('userService', function($http,$q,$auth){

var banner;

this.getUserInfo = $auth.getPayload();
var theme;


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


this.getWeather = function(location){
return $http({
    method: "GET",
    url:'http://api.openweathermap.org/data/2.5/weather?q=zip='+location+'&units=imperial&appid=c10ef99c5afdee3fdfba78e8c981a9b6'
  })

};


 this.setTheme = function(data){
   return $http({
     method: 'Put',
     url:"/theme",
     data: data
   }).then(function(res) {
     theme = res.data[0].user_theme
       return res;
   }).catch(function(err) {
      console.log(err);
 })
 }

this.addChild = function(child){
  console.log(JSON.stringify(child));
  return $http({
    method:"POST",
    url:"/children",
    data: child
  })
}


this.showchild = function(household){
return $http({
  method:"GET",
  url:"/children/" + household
})
}

this.getRewards = function(id){
    return $http({
      method: "Get",
      url:'/childrewards/' + id,
    }).then(function(res) {
        return res.data;
    }).catch(function(err) {
       console.log(err);
  })

}

  this.returnTheme = function(){
    return theme;
  }


this.getDailyChores = function(id){
  return $http({
    method: "Get",
    url:'/dailychore/' + id,
  }).then(function(res) {
      return res.data;
  }).catch(function(err) {
     console.log(err);
})
}

this.getWeeklyChores = function(id){
  return $http({
    method: "Get",
    url:'/weeklychore/' + id,
  }).then(function(res) {
      return res.data;
  }).catch(function(err) {
     console.log(err);
})
}

this.getMonthlyChores = function(id){
  return $http({
    method: "Get",
    url:'/monthlychore/' + id,
  }).then(function(res) {
      return res.data;
  }).catch(function(err) {
     console.log(err);
})
}
 this.checkOffchore = function(id){
     return $http({
       method: "PUT",
       url:'/completed/' + id
     }).then(function(res){
       return res;
     }).catch(function (err){
       console.log(err);
     })
   }
this.getChild = function(id){
  return $http({
    method: "Get",
    url: '/child/'+ id
  }).then(function(res){
    return res.data
  })
}
this.removeReward = function(reward){
  return $http({
    method:"DELETE",
    url:'/reward',
    data: reward
  }).then(function(res) {
      return res;
  }).catch(function(err) {
     console.log(err);
   })
}
this.makeReward = function(newReward){
  return $http({
    method:"POST",
    url:'/reward',
    data: newReward
  }).then(function(res) {
      return res;
  }).catch(function(err) {
     console.log(err);
   })
}

this.updatePassword = function(id,data){
  console.log(id)
  console.log(data);
  console.log(JSON.stringify({ "user_new_password": data}))
  return $http({
    method:"PUT",
    url:'/password/' + id,
    data: JSON.stringify({ "user_new_password": data})
  })
}

this.updateHousehold = function(id,house){
  console.log(id)
  console.log(house)
  console.log(JSON.stringify({"user_household": house}))
  return $http({
    method:"PUT",
    url:'/household/' + id,
    data: JSON.stringify({"user_household": house})
  })
}






});//end of service
