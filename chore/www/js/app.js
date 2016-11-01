// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('chore', ['ionic', 'satellizer'])
.config(function($stateProvider, $urlRouterProvider, $authProvider){
  $urlRouterProvider.otherwise("/tracker/");

  $stateProvider
  .state('addChild',{
    url:"/addChild",
    templateUrl: "./templates/addChild.html",
    controller: "addChildCtrl"
  })
  .state('assignChore',{
    url:"/assignChore",
    templateUrl: "./templates/assignChore.html",
    controller: "assignChoreCtrl"
  })
  .state('editChild',{
    url:"/editChild/:id",
    templateUrl: "./templates/editChild.html",
    controller: "editChildCtrl"
  })
  .state('history',{
    url:"/history",
    templateUrl: "./templates/history.html",
    controller: "historyCtrl"
  })
  .state('home',{
    url:"/home",
    templateUrl: "./templates/home.html",
    controller: "homeCtrl"
  })
  .state('login',{
    url:"/login",
    templateUrl: "./templates/Login.html",
    controller: "loginCtrl"
  })
  .state('makeChore',{
    url:"/makeChore",
    templateUrl: "./templates/makeChore.html",
    controller: "makeChoreCtrl"
  })
  .state('setRewards',{
    url:"/setRewards/:id",
    templateUrl: "./templates/setRewards.html",
    controller: "setRewardsCtrl"
  })
  .state('settings',{
    url:"/settings",
    templateUrl: "./templates/settings.html",
    controller: "settingsCtrl"
  })
  .state('tracker',{
    url:"/tracker/:id",
    templateUrl: "./templates/tracker.html",
    controller: "trackerCtrl"
  })
  .state('userInfo',{
    url:"/userInfo",
    templateUrl: "./templates/userInfo.html",
    controller: "userInfoCtrl"
  })
  .state('childBank',{
    url:"/child/bank",
    templateUrl: "./templates/childBank.html",
    controller: "childBankCtrl"
  })
  .state('childHome',{
    url:"/child/home",
    templateUrl: "./templates/childHome.html",
    controller: "childHomeCtrl"
  })
  .state('childLogin',{
    url:"/child/login",
    templateUrl: "./templates/childLogin.html",
    controller: "childLoginCtrl"
  })
  .state('childSettings',{
    url:"/child/settings",
    templateUrl: "./templates/childSettings.html",
    controller: "childSettingsCtrl"
  });
  $authProvider.facebook({
    clientId: '332272057132681'
  });

  // Optional: For client-side use (Implicit Grant), set responseType to 'token' (default: 'code')
  $authProvider.facebook({
    clientId: '332272057132681',
    responseType: 'token'
  });

  $authProvider.google({
    clientId: '275352960946-5rcan3qkhlsc7m50hev5dn2e2cae9mbp.apps.googleusercontent.com',
    url: 'http://localhost:8100/#/login/'
  });
})



.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
