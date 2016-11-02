'use strict';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('chore', ['ionic', 'satellizer']).config(function ($stateProvider, $urlRouterProvider, $authProvider) {
  $urlRouterProvider.otherwise("/child/home");
  $stateProvider.state('addChild', {
    url: "/addChild",
    templateUrl: "./templates/addChild.html",
    controller: "addChildCtrl"
  }).state('assignChore', {
    url: "/assignChore",
    templateUrl: "./templates/assignChore.html",
    controller: "assignChoreCtrl"
  }).state('editChild', {
    url: "/editChild/:id",
    templateUrl: "./templates/editChild.html",
    controller: "editChildCtrl"
  }).state('history', {
    url: "/history",
    templateUrl: "./templates/history.html",
    controller: "historyCtrl"
  }).state('home', {
    url: "/home",
    templateUrl: "./templates/home.html",
    controller: "homeCtrl"
  }).state('login', {
    url: "/login",
    templateUrl: "./templates/Login.html",
    controller: "loginCtrl"
  }).state('makeChore', {
    url: "/makeChore",
    templateUrl: "./templates/makeChore.html",
    controller: "makeChoreCtrl"
  }).state('setRewards', {
    url: "/setRewards/:id",
    templateUrl: "./templates/setRewards.html",
    controller: "setRewardsCtrl"
  }).state('settings', {
    url: "/settings",
    templateUrl: "./templates/settings.html",
    controller: "settingsCtrl"
  }).state('tracker', {
    url: "/tracker/:id",
    templateUrl: "./templates/tracker.html",
    controller: "trackerCtrl"
  }).state('userInfo', {
    url: "/userInfo",
    templateUrl: "./templates/userInfo.html",
    controller: "userInfoCtrl"
  }).state('childBank', {
    url: "/child/bank",
    templateUrl: "./templates/childBank.html",
    controller: "childBankCtrl"
  }).state('childHome', {
    url: "/child/home",
    templateUrl: "./templates/childHome.html",
    controller: "childHomeCtrl"
  }).state('childLogin', {
    url: "/child/login",
    templateUrl: "./templates/childLogin.html",
    controller: "childLoginCtrl"
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
}).run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
"use strict";

angular.module('chore').service("choreService", function ($http, $q, $auth) {

  this.getUserInfo = $auth.getPayload();

  this.getChildren = function (household) {
    return $http({
      method: "GET",
      url: "/children" + household
    });
  };

  this.createChore = function (chore) {
    return $http({
      method: "POST",
      url: "/assignchore",
      data: chore
    });
  };
}); //end of service
'use strict';

angular.module('chore').service('loginService', function ($http) {

  this.userLogin = function (user) {
    console.log(user, "service");
    return $http({
      method: "POST",
      url: '/auth/login',
      data: user
    });
  };
  this.makeUser = function (newUser) {
    return $http({
      method: "POST",
      url: '/auth/signup',
      data: newUser
    });
  };
}); // end of service
'use strict';

angular.module('chore').service('userService', function ($http, $q, $auth) {

  var banner;

  this.getUserInfo;
  var theme;

  this.postbanner = function (banner) {
    console.log(banner);
    console.log(banner.user_banner_image);
    return $http({
      method: "PUT",
      url: "/banner/" + banner.user_household,
      data: JSON.stringify({ user_banner_image: banner.user_banner_image })
    });
  };

  this.getbanner = function (userId) {
    console.log(userId);
    return $http({
      method: "GET",
      url: "/banner/" + userId
    });
  };

  this.getWeather = function () {
    return $http({
      method: "GET",
      url: 'http://api.openweathermap.org/data/2.5/weather?q=zip=84010&units=imperial&appid=c10ef99c5afdee3fdfba78e8c981a9b6'
    });
  };

  this.setTheme = function (data) {
    return $http({
      method: 'Put',
      url: "/theme",
      data: data
    }).then(function (res) {
      theme = res.data[0].user_theme;
      return res;
    }).catch(function (err) {
      console.log(err);
    });
  };

  this.addChild = function (child) {
    console.log(JSON.stringify(child));
    return $http({
      method: "POST",
      url: "/children",
      data: child
    });
  };

  this.getRewards = function (id) {
    return $http({
      method: "Get",
      url: '/childrewards/' + id
    }).then(function (res) {
      return res.data;
    }).catch(function (err) {
      console.log(err);
    });
  };

  this.returnTheme = function () {
    return theme;
  };
  // this.getDailyChores = function(id){
  //   return $http({
  //     method: "Get",
  //     url:'' + id,
  //   }).then(function(res) {
  //       return res.data;
  //   }).catch(function(err) {
  //      console.log(err);
  // })
  // }
  //
  // this.getWeeklyChores = function(id){
  //   return $http({
  //     method: "Get",
  //     url:'' + id,
  //   }).then(function(res) {
  //       return res.data;
  //   }).catch(function(err) {
  //      console.log(err);
  // })
  // }
  //
  // this.getSpecialChores = function(id){
  //   return $http({
  //     method: "Get",
  //     url:'' + id,
  //   }).then(function(res) {
  //       return res.data;
  //   }).catch(function(err) {
  //      console.log(err);
  // })
  // }
  // this.checkOffchore = function(id){
  //   return $http({
  //     method: "PUT",
  //     url:
  //   })
  // }
}); //end of service
'use strict';

angular.module('chore').controller("addChildCtrl", function ($scope, userService, $state) {
  //backbutton
  $scope.goback = function () {
    window.history.go(-1);
  };
  var user = userService.getUserInfo.sub;
  console.log(user);
  $scope.submitChild = function (child) {
    child.user_household = user.user_household;
    console.log(child);
    userService.addChild(child).then(function (res) {
      $state.go('home');
    });
  };
}); //end of controller
"use strict";

angular.module('chore').controller("assignChoreCtrl", function ($scope, choreService, $state) {

  var currentUser = choreService.getUserInfo.sub;

  choreService.getChildren(household).then(function (res) {
    $scope.chores = res.data;
    console.log(res.data);
  });

  $scope.chore = {
    chore_daily: false,
    chore_weekly: false,
    chore_monthly: false
  };

  $scope.submitChore = function (chore) {
    chore.user_household_fk = currentUser.user_household;
    console.log(chore.user_household_fk);
    // choreService.createChore(chore)
    // .then(function(res){
    //
    // })
  };
}); //end of controller
'use strict';

angular.module('chore').controller('cameraCtrl', function ($scope, $cordovaCamera) {

  document.addEventListener("deviceready", function () {
    $cordovaPlugin.someFunction().then(success, error);
  }, false);

  // OR with IONIC

  $ionicPlatform.ready(function () {
    $cordovaPlugin.someFunction().then(success, error);
  });

  $scope.takePicture = function () {
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    $cordovaCamera.getPicture(options).then(function (imageData) {
      $scope.imgURI = "data:image/jpeg;base64," + imageData;
    }, function (err) {
      // error
    });
  };
}, false);
'use strict';

angular.module('chore').controller("childBankCtrl", function ($scope, $auth, userService) {
  var userToken = $auth.getPayload();
  userService.getUserInfo = userToken;
  $scope.user = userToken.sub;
  $scope.theme = $scope.user.user_theme;

  $scope.$on('$ionicView.beforeEnter', function () {
    var getTheme = function getTheme() {
      $scope.theme = userService.returnTheme();
    };
    if (userService.returnTheme()) {
      getTheme();
    }
    $scope.setTheme = function () {
      if ($scope.theme === 'baseball') {
        $scope.themeImage = './img/img-baseball-trans.png';
      }
      if ($scope.theme === 'charlieBrown') {
        $scope.themeImage = './img/snoopy.png';
      }
      if ($scope.theme === 'princess') {
        $scope.themeImage = './img/Crown_Princess.png';
      }
      if ($scope.theme === 'starWars') {
        $scope.themeImage = './img/death-star-2nd-icon.png';
      }
      if ($scope.theme === 'water') {
        $scope.themeImage = './img/Transparent_Water_Drop_PNG_Picture.png';
      }
    };
    $scope.setTheme();
  });

  var getRewards = function getRewards() {
    id = $scope.user.user_id_pk;
    userService.getRewards(id).then(function (response) {
      $scope.rewards = response;
    });
  };
  getRewards();
});
'use strict';

angular.module('chore').controller("childHomeCtrl", function ($scope, $ionicModal, $auth, userService) {
  // $scope.test = "Message from  child Home controller"
  //var userToken = userService.getUserInfo.sub;

  var userToken = $auth.getPayload();
  userService.getUserInfo = userToken;
  $scope.user = userToken.sub;

  $ionicModal.fromTemplateUrl('themeModal.html', {
    id: '1', // We need to use and ID to identify the modal that is firing the event!
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.oModal1 = modal;
  });

  // Modal 2
  //  $ionicModal.fromTemplateUrl('takePictureModal.html', {
  //    id: '2', // We need to use and ID to identify the modal that is firing the event!
  //    scope: $scope,
  //    backdropClickToClose: false,
  //    animation: 'slide-in-up'
  //  }).then(function(modal) {
  //    $scope.oModal2 = modal;
  //  });
  $scope.openModal = function (index) {
    if (index == 1) $scope.oModal1.show();else $scope.oModal2.show();
  };

  $scope.closeModal = function (index) {
    if (index == 1) $scope.oModal1.hide();else $scope.oModal2.hide();
  };

  $scope.$on('$destroy', function () {
    $scope.oModal1.remove();
    $scope.oModal2.remove();
  });

  $scope.theme = $scope.user.user_theme;
  $scope.setTheme = function (choice) {
    var data = {};
    data.theme = choice;
    data.userId = $scope.user.user_id_pk;
    console.log(data);
    userService.setTheme(data).then(function (response) {
      if (response.status === 200) {
        $scope.theme = choice;
      }
    });
  };

  // var getDailyChores = function(){
  //   id = $scope.user.user_id_pk
  //   choreService.getDailyChores(id).then(function(response){
  //     $scope.dailyChores = response;
  //   })
  // }
  //  getDailyChores()
  // var getWeeklyChores = function(){
  //   id = $scope.user.user_id_pk
  //   choreService.getWeeklyChores(id).then(function(response){
  //     $scope.weeklyChores = response;
  //   })
  // }
  // getWeeklyChores()
  // var getSpecialChores = function(){
  //   id = $scope.user.user_id_pk
  //   choreService.getSpecialChores(id).then(function(response){
  //     $scope.specialChores = response;
  //   })
  // }
  //   getSpecialChores()
  // $scope.checkOffchore = function(id){
  //   userService.checkOffchore(id)
  // }
});
'use strict';

angular.module('chore').controller("childLoginCtrl", function ($scope, $auth, $state, loginService) {
  //  $scope.test = "Message from child Login controller"

  $scope.loginChild = function (user) {
    console.log(user);
    loginService.userLogin(user).then(function (response) {
      console.log(response);
      $auth.setToken(response);
      $state.go('childHome');
    });
  };
});
"use strict";

angular.module('chore').controller("editChildCtrl", function ($scope) {
  $scope.goback = function () {
    window.history.go(-1);
  };
});
"use strict";

angular.module('chore').controller("historyCtrl", function ($scope) {
   $scope.test = "Message from History controller";
});
'use strict';

angular.module('chore').controller("homeCtrl", function ($scope, $ionicModal, userService, $window, $auth) {
  var userToken = userService.getUserInfo.sub;
  console.log(userToken);
  $ionicModal.fromTemplateUrl('bannerModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function () {
    $scope.modal.show();
  };
  $scope.submitBanner = function (banner) {
    var bannerInfo = {
      user_household: userToken.user_household,
      user_banner_image: banner
    };
    userService.postbanner(bannerInfo).then(function (res) {
      $scope.modal.hide();
      document.getElementById("modal-box").value = '';
      $window.location.reload(true);
    });
  };
  $scope.closeModal = function () {
    document.getElementById("modal-box").value = '';
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function () {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function () {
    // Execute action

  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function () {
    // Execute action
  });

  $scope.household = userToken.user_household;
  userService.getbanner(userToken.user_household).then(function (res) {
    console.log(res.data[0].user_banner_image);
    $scope.banner = res.data[0].user_banner_image;
  });

  console.log(userToken.zip);

  userService.getWeather(userToken.zip).then(function (res) {
    console.log(res.data);
    $scope.weather = res.data;
  });
}); //end of controller
'use strict';

angular.module('chore').controller("loginCtrl", function ($scope, $auth, $state, loginService) {

  $scope.login = function (user) {
    // console.log(user)
    loginService.userLogin(user).then(function (response) {
      // console.log(response)
      $auth.setToken(response);
      $state.go('home');
    });
  };
  $scope.makeUser = function (newUser) {
    loginService.makeUser(newUser).then(function (response) {
      $auth.setToken(response);
      $state.go('home');
    });
  };
  $scope.authenticate = function (provider) {
    $auth.authenticate(provider);
  };
  // $scope.test = "Hello from login controller"


  $scope.revealer = function () {
    $scope.hide = !$scope.hide;
  };
});
"use strict";

angular.module('chore').controller("makeChoreCtrl", function ($scope) {
  $scope.goback = function () {
    window.history.go(-1);
  };
});
'use strict';

angular.module('chore').controller("setRewardsCtrl", function ($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('rewardModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function () {
    $scope.modal.show();
  };
  $scope.closeModal = function () {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function () {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function () {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function () {
    // Execute action
  });
  //backbutton
  $scope.goback = function () {
    window.history.go(-1);
  };
});
'use strict';

angular.module('chore').controller("settingsCtrl", function ($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('changePassword.html', {
    id: '1', // We need to use and ID to identify the modal that is firing the event!
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.oModal1 = modal;
  });

  // Modal 2
  $ionicModal.fromTemplateUrl('changeHousehold.html', {
    id: '2', // We need to use and ID to identify the modal that is firing the event!
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.oModal2 = modal;
  });

  $ionicModal.fromTemplateUrl('changeZip.html', {
    id: '3', // We need to use and ID to identify the modal that is firing the event!
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.oModal3 = modal;
  });

  $ionicModal.fromTemplateUrl('addParent.html', {
    id: '4', // We need to use and ID to identify the modal that is firing the event!
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.oModal4 = modal;
  });

  $ionicModal.fromTemplateUrl('removeChild.html', {
    id: '5', // We need to use and ID to identify the modal that is firing the event!
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.oModal5 = modal;
  });

  $scope.openModal = function (index) {
    if (index == 1) $scope.oModal1.show();else if (index == 2) $scope.oModal2.show();else if (index == 3) $scope.oModal3.show();else if (index == 4) $scope.oModal4.show();else $scope.oModal5.show();
  };

  $scope.closeModal = function (index) {
    if (index == 1) $scope.oModal1.hide();else if (index == 2) $scope.oModal2.hide();else if (index == 3) $scope.oModal3.hide();else if (index == 4) $scope.oModal4.hide();else $scope.oModal5.hide();
  };

  $scope.$on('$destroy', function () {
    $scope.oModal1.remove();
    $scope.oModal2.remove();
    $scope.oModal3.remove();
    $scope.oModal4.remove();
    $scope.oModal5.remove();
  });
});
'use strict';

angular.module('chore').controller("trackerCtrl", function ($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('picConfModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function () {
    $scope.modal.show();
  };
  $scope.closeModal = function () {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function () {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function () {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function () {
    // Execute action
  });
});
"use strict";

angular.module('chore').controller("userInfoCtrl", function ($scope) {
   $scope.test = "Message from info controller";
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInNlcnZpY2UvY2hvcmVTZXJ2aWNlLmpzIiwic2VydmljZS9sb2dpblNlcnZpY2UuanMiLCJzZXJ2aWNlL3VzZXJTZXJ2aWNlLmpzIiwiY29udHJvbGxlcnMvYWRkQ2hpbGRDdHJsLmpzIiwiY29udHJvbGxlcnMvYXNzaWduQ2hvcmVDdHJsLmpzIiwiY29udHJvbGxlcnMvY2FtZXJhQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NoaWxkQmFua0N0cmwuanMiLCJjb250cm9sbGVycy9jaGlsZEhvbWVDdHJsLmpzIiwiY29udHJvbGxlcnMvY2hpbGRMb2dpbkN0cmwuanMiLCJjb250cm9sbGVycy9lZGl0Q2hpbGRDdHJsLmpzIiwiY29udHJvbGxlcnMvaGlzdG9yeUN0cmwuanMiLCJjb250cm9sbGVycy9ob21lQ3RybC5qcyIsImNvbnRyb2xsZXJzL2xvZ2luQ3RybC5qcyIsImNvbnRyb2xsZXJzL21ha2VDaG9yZUN0cmwuanMiLCJjb250cm9sbGVycy9zZXRSZXdhcmRzQ3RybC5qcyIsImNvbnRyb2xsZXJzL3NldHRpbmdzQ3RybC5qcyIsImNvbnRyb2xsZXJzL3RyYWNrZXJDdHJsLmpzIiwiY29udHJvbGxlcnMvdXNlckluZm9DdHJsLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsIiR1cmxSb3V0ZXJQcm92aWRlciIsIiRhdXRoUHJvdmlkZXIiLCJvdGhlcndpc2UiLCJzdGF0ZSIsInVybCIsInRlbXBsYXRlVXJsIiwiY29udHJvbGxlciIsImZhY2Vib29rIiwiY2xpZW50SWQiLCJyZXNwb25zZVR5cGUiLCJnb29nbGUiLCJydW4iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5Iiwid2luZG93IiwiY29yZG92YSIsInBsdWdpbnMiLCJLZXlib2FyZCIsImhpZGVLZXlib2FyZEFjY2Vzc29yeUJhciIsImRpc2FibGVTY3JvbGwiLCJTdGF0dXNCYXIiLCJzdHlsZURlZmF1bHQiLCJzZXJ2aWNlIiwiJGh0dHAiLCIkcSIsIiRhdXRoIiwiZ2V0VXNlckluZm8iLCJnZXRQYXlsb2FkIiwiZ2V0Q2hpbGRyZW4iLCJob3VzZWhvbGQiLCJtZXRob2QiLCJjcmVhdGVDaG9yZSIsImNob3JlIiwiZGF0YSIsInVzZXJMb2dpbiIsInVzZXIiLCJjb25zb2xlIiwibG9nIiwibWFrZVVzZXIiLCJuZXdVc2VyIiwiYmFubmVyIiwidGhlbWUiLCJwb3N0YmFubmVyIiwidXNlcl9iYW5uZXJfaW1hZ2UiLCJ1c2VyX2hvdXNlaG9sZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJnZXRiYW5uZXIiLCJ1c2VySWQiLCJnZXRXZWF0aGVyIiwic2V0VGhlbWUiLCJ0aGVuIiwicmVzIiwidXNlcl90aGVtZSIsImNhdGNoIiwiZXJyIiwiYWRkQ2hpbGQiLCJjaGlsZCIsImdldFJld2FyZHMiLCJpZCIsInJldHVyblRoZW1lIiwiJHNjb3BlIiwidXNlclNlcnZpY2UiLCIkc3RhdGUiLCJnb2JhY2siLCJoaXN0b3J5IiwiZ28iLCJzdWIiLCJzdWJtaXRDaGlsZCIsImNob3JlU2VydmljZSIsImN1cnJlbnRVc2VyIiwiY2hvcmVzIiwiY2hvcmVfZGFpbHkiLCJjaG9yZV93ZWVrbHkiLCJjaG9yZV9tb250aGx5Iiwic3VibWl0Q2hvcmUiLCJ1c2VyX2hvdXNlaG9sZF9mayIsIiRjb3Jkb3ZhQ2FtZXJhIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiJGNvcmRvdmFQbHVnaW4iLCJzb21lRnVuY3Rpb24iLCJzdWNjZXNzIiwiZXJyb3IiLCJ0YWtlUGljdHVyZSIsIm9wdGlvbnMiLCJxdWFsaXR5IiwiZGVzdGluYXRpb25UeXBlIiwiQ2FtZXJhIiwiRGVzdGluYXRpb25UeXBlIiwiREFUQV9VUkwiLCJzb3VyY2VUeXBlIiwiUGljdHVyZVNvdXJjZVR5cGUiLCJDQU1FUkEiLCJhbGxvd0VkaXQiLCJlbmNvZGluZ1R5cGUiLCJFbmNvZGluZ1R5cGUiLCJKUEVHIiwidGFyZ2V0V2lkdGgiLCJ0YXJnZXRIZWlnaHQiLCJwb3BvdmVyT3B0aW9ucyIsIkNhbWVyYVBvcG92ZXJPcHRpb25zIiwic2F2ZVRvUGhvdG9BbGJ1bSIsImNvcnJlY3RPcmllbnRhdGlvbiIsImdldFBpY3R1cmUiLCJpbWFnZURhdGEiLCJpbWdVUkkiLCJ1c2VyVG9rZW4iLCIkb24iLCJnZXRUaGVtZSIsInRoZW1lSW1hZ2UiLCJ1c2VyX2lkX3BrIiwicmVzcG9uc2UiLCJyZXdhcmRzIiwiJGlvbmljTW9kYWwiLCJmcm9tVGVtcGxhdGVVcmwiLCJzY29wZSIsImJhY2tkcm9wQ2xpY2tUb0Nsb3NlIiwiYW5pbWF0aW9uIiwibW9kYWwiLCJvTW9kYWwxIiwib3Blbk1vZGFsIiwiaW5kZXgiLCJzaG93Iiwib01vZGFsMiIsImNsb3NlTW9kYWwiLCJoaWRlIiwicmVtb3ZlIiwiY2hvaWNlIiwic3RhdHVzIiwibG9naW5TZXJ2aWNlIiwibG9naW5DaGlsZCIsInNldFRva2VuIiwidGVzdCIsIiR3aW5kb3ciLCJzdWJtaXRCYW5uZXIiLCJiYW5uZXJJbmZvIiwiZ2V0RWxlbWVudEJ5SWQiLCJ2YWx1ZSIsImxvY2F0aW9uIiwicmVsb2FkIiwiemlwIiwid2VhdGhlciIsImxvZ2luIiwiYXV0aGVudGljYXRlIiwicHJvdmlkZXIiLCJyZXZlYWxlciIsIm9Nb2RhbDMiLCJvTW9kYWw0Iiwib01vZGFsNSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUFBLFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCLENBQUMsT0FBRCxFQUFVLFlBQVYsQ0FBeEIsRUFDQ0MsTUFERCxDQUNRLFVBQVNDLGNBQVQsRUFBeUJDLGtCQUF6QixFQUE2Q0MsYUFBN0MsRUFBMkQ7QUFDakVELHFCQUFtQkUsU0FBbkIsQ0FBNkIsYUFBN0I7QUFDQUgsaUJBQ0NJLEtBREQsQ0FDTyxVQURQLEVBQ2tCO0FBQ2hCQyxTQUFJLFdBRFk7QUFFaEJDLGlCQUFhLDJCQUZHO0FBR2hCQyxnQkFBWTtBQUhJLEdBRGxCLEVBTUNILEtBTkQsQ0FNTyxhQU5QLEVBTXFCO0FBQ25CQyxTQUFJ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LFVBQXhCLENBQW1DLGFBQW5DLEVBQWtELFVBQVN1RCxNQUFULEVBQWlCcUQsV0FBakIsRUFBNkI7QUFDN0VBLGNBQVlDLGVBQVosQ0FBNEIsbUJBQTVCLEVBQWlEO0FBQy9DQyxXQUFPdkQsTUFEd0M7QUFFL0N5RCxlQUFXO0FBRm9DLEdBQWpELEVBR0duRSxJQUhILENBR1EsVUFBU29FLEtBQVQsRUFBZ0I7QUFDdEIxRCxXQUFPMEQsS0FBUCxHQUFlQSxLQUFmO0FBQ0QsR0FMRDtBQU1BMUQsU0FBTzRELFNBQVAsR0FBbUIsWUFBVztBQUM1QjVELFdBQU8wRCxLQUFQLENBQWFJLElBQWI7QUFDRCxHQUZEO0FBR0E5RCxTQUFPZ0UsVUFBUCxHQUFvQixZQUFXO0FBQzdCaEUsV0FBTzBELEtBQVAsQ0FBYU8sSUFBYjtBQUNELEdBRkQ7QUFHQTtBQUNBakUsU0FBTytDLEdBQVAsQ0FBVyxVQUFYLEVBQXVCLFlBQVc7QUFDaEMvQyxXQUFPMEQsS0FBUCxDQUFhUSxNQUFiO0FBQ0QsR0FGRDtBQUdBO0FBQ0FsRSxTQUFPK0MsR0FBUCxDQUFXLGNBQVgsRUFBMkIsWUFBVztBQUNwQztBQUNELEdBRkQ7QUFHQTtBQUNBL0MsU0FBTytDLEdBQVAsQ0FBVyxlQUFYLEVBQTRCLFlBQVc7QUFDckM7QUFDRCxHQUZEO0FBSUQsQ0ExQkQ7OztBQ0FBaEgsUUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0JTLFVBQXhCLENBQW1DLGNBQW5DLEVBQW1ELFVBQVN1RCxNQUFULEVBQWdCO0FBQ2hFQSxVQUFPd0UsSUFBUCxHQUFjLDhCQUFkO0FBRUYsQ0FIRCIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJb25pYyBTdGFydGVyIEFwcFxuXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xuLy8gJ3N0YXJ0ZXInIGlzIHRoZSBuYW1lIG9mIHRoaXMgYW5ndWxhciBtb2R1bGUgZXhhbXBsZSAoYWxzbyBzZXQgaW4gYSA8Ym9keT4gYXR0cmlidXRlIGluIGluZGV4Lmh0bWwpXG4vLyB0aGUgMm5kIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvZiAncmVxdWlyZXMnXG5cbmFuZ3VsYXIubW9kdWxlKCdjaG9yZScsIFsnaW9uaWMnLCAnc2F0ZWxsaXplciddKVxuLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkYXV0aFByb3ZpZGVyKXtcbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShcIi9jaGlsZC9ob21lXCIpO1xuICAkc3RhdGVQcm92aWRlclxuICAuc3RhdGUoJ2FkZENoaWxkJyx7XG4gICAgdXJsOlwiL2FkZENoaWxkXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvYWRkQ2hpbGQuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiYWRkQ2hpbGRDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdhc3NpZ25DaG9yZScse1xuICAgIHVybDpcIi9hc3NpZ25DaG9yZVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2Fzc2lnbkNob3JlLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImFzc2lnbkNob3JlQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnZWRpdENoaWxkJyx7XG4gICAgdXJsOlwiL2VkaXRDaGlsZC86aWRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9lZGl0Q2hpbGQuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiZWRpdENoaWxkQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnaGlzdG9yeScse1xuICAgIHVybDpcIi9oaXN0b3J5XCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvaGlzdG9yeS5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJoaXN0b3J5Q3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnaG9tZScse1xuICAgIHVybDpcIi9ob21lXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvaG9tZS5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJob21lQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnbG9naW4nLHtcbiAgICB1cmw6XCIvbG9naW5cIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9Mb2dpbi5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJsb2dpbkN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ21ha2VDaG9yZScse1xuICAgIHVybDpcIi9tYWtlQ2hvcmVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9tYWtlQ2hvcmUuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwibWFrZUNob3JlQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnc2V0UmV3YXJkcycse1xuICAgIHVybDpcIi9zZXRSZXdhcmRzLzppZFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL3NldFJld2FyZHMuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwic2V0UmV3YXJkc0N0cmxcIlxuICB9KVxuICAuc3RhdGUoJ3NldHRpbmdzJyx7XG4gICAgdXJsOlwiL3NldHRpbmdzXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvc2V0dGluZ3MuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwic2V0dGluZ3NDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCd0cmFja2VyJyx7XG4gICAgdXJsOlwiL3RyYWNrZXIvOmlkXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvdHJhY2tlci5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJ0cmFja2VyQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgndXNlckluZm8nLHtcbiAgICB1cmw6XCIvdXNlckluZm9cIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy91c2VySW5mby5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJ1c2VySW5mb0N0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2NoaWxkQmFuaycse1xuICAgIHVybDpcIi9jaGlsZC9iYW5rXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvY2hpbGRCYW5rLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImNoaWxkQmFua0N0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2NoaWxkSG9tZScse1xuICAgIHVybDpcIi9jaGlsZC9ob21lXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvY2hpbGRIb21lLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImNoaWxkSG9tZUN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2NoaWxkTG9naW4nLHtcbiAgICB1cmw6XCIvY2hpbGQvbG9naW5cIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9jaGlsZExvZ2luLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImNoaWxkTG9naW5DdHJsXCJcbiAgfSlcblxuICAkYXV0aFByb3ZpZGVyLmZhY2Vib29rKHtcbiAgICBjbGllbnRJZDogJzMzMjI3MjA1NzEzMjY4MSdcbiAgfSk7XG5cbiAgLy8gT3B0aW9uYWw6IEZvciBjbGllbnQtc2lkZSB1c2UgKEltcGxpY2l0IEdyYW50KSwgc2V0IHJlc3BvbnNlVHlwZSB0byAndG9rZW4nIChkZWZhdWx0OiAnY29kZScpXG4gICRhdXRoUHJvdmlkZXIuZmFjZWJvb2soe1xuICAgIGNsaWVudElkOiAnMzMyMjcyMDU3MTMyNjgxJyxcbiAgICByZXNwb25zZVR5cGU6ICd0b2tlbidcbiAgfSk7XG5cbiAgJGF1dGhQcm92aWRlci5nb29nbGUoe1xuICAgIGNsaWVudElkOiAnMjc1MzUyOTYwOTQ2LTVyY2FuM3FraGxzYzdtNTBoZXY1ZG4yZTJjYWU5bWJwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tJyxcbiAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxMDAvIy9sb2dpbi8nXG4gIH0pO1xufSlcblxuXG5cbi5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0pIHtcbiAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgaWYod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxuICAgICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcblxuICAgICAgLy8gRG9uJ3QgcmVtb3ZlIHRoaXMgbGluZSB1bmxlc3MgeW91IGtub3cgd2hhdCB5b3UgYXJlIGRvaW5nLiBJdCBzdG9wcyB0aGUgdmlld3BvcnRcbiAgICAgIC8vIGZyb20gc25hcHBpbmcgd2hlbiB0ZXh0IGlucHV0cyBhcmUgZm9jdXNlZC4gSW9uaWMgaGFuZGxlcyB0aGlzIGludGVybmFsbHkgZm9yXG4gICAgICAvLyBhIG11Y2ggbmljZXIga2V5Ym9hcmQgZXhwZXJpZW5jZS5cbiAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5kaXNhYmxlU2Nyb2xsKHRydWUpO1xuICAgIH1cbiAgICBpZih3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XG4gICAgfVxuICB9KTtcbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5zZXJ2aWNlKFwiY2hvcmVTZXJ2aWNlXCIsIGZ1bmN0aW9uKCRodHRwLCRxLCRhdXRoKXtcblxudGhpcy5nZXRVc2VySW5mbyA9ICRhdXRoLmdldFBheWxvYWQoKTtcblxuXG50aGlzLmdldENoaWxkcmVuID0gZnVuY3Rpb24oaG91c2Vob2xkKXtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6XCJHRVRcIixcbiAgICB1cmw6XCIvY2hpbGRyZW5cIiArIGhvdXNlaG9sZFxuICB9KVxufVxuXG50aGlzLmNyZWF0ZUNob3JlID0gZnVuY3Rpb24oY2hvcmUpe1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDpcIlBPU1RcIixcbiAgICB1cmw6XCIvYXNzaWduY2hvcmVcIixcbiAgICBkYXRhOmNob3JlXG4gIH0pXG59XG5cblxuXG5cbn0pLy9lbmQgb2Ygc2VydmljZVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuc2VydmljZSgnbG9naW5TZXJ2aWNlJywgZnVuY3Rpb24oJGh0dHApe1xuXG5cbiAgdGhpcy51c2VyTG9naW4gPSBmdW5jdGlvbih1c2VyKSB7XG4gICAgY29uc29sZS5sb2codXNlciwgXCJzZXJ2aWNlXCIpXG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB1cmw6ICcvYXV0aC9sb2dpbicsXG4gICAgICBkYXRhOiB1c2VyXG4gICAgfSlcbiAgfVxuICB0aGlzLm1ha2VVc2VyID0gZnVuY3Rpb24obmV3VXNlcikge1xuICAgIHJldHVybiAkaHR0cCh7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgdXJsOiAnL2F1dGgvc2lnbnVwJyxcbiAgICAgIGRhdGE6IG5ld1VzZXJcbiAgICB9KVxuICB9XG59KSAvLyBlbmQgb2Ygc2VydmljZVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuc2VydmljZSgndXNlclNlcnZpY2UnLCBmdW5jdGlvbigkaHR0cCwkcSwkYXV0aCl7XG5cbnZhciBiYW5uZXI7XG5cbnRoaXMuZ2V0VXNlckluZm87XG52YXIgdGhlbWU7XG5cblxudGhpcy5wb3N0YmFubmVyID0gZnVuY3Rpb24oYmFubmVyKXtcbiAgY29uc29sZS5sb2coYmFubmVyKTtcbiAgY29uc29sZS5sb2coYmFubmVyLnVzZXJfYmFubmVyX2ltYWdlKTtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgdXJsOlwiL2Jhbm5lci9cIiArIGJhbm5lci51c2VyX2hvdXNlaG9sZCxcbiAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7dXNlcl9iYW5uZXJfaW1hZ2U6YmFubmVyLnVzZXJfYmFubmVyX2ltYWdlfSlcbiAgfSlcbn1cblxudGhpcy5nZXRiYW5uZXIgPSBmdW5jdGlvbih1c2VySWQpe1xuICBjb25zb2xlLmxvZyh1c2VySWQpO1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6XCIvYmFubmVyL1wiICsgdXNlcklkXG4gIH0pXG59XG5cblxudGhpcy5nZXRXZWF0aGVyID0gZnVuY3Rpb24oKXtcbnJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIHVybDonaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPXppcD04NDAxMCZ1bml0cz1pbXBlcmlhbCZhcHBpZD1jMTBlZjk5YzVhZmRlZTNmZGZiYTc4ZThjOTgxYTliNidcbiAgfSlcblxufTtcblxuXG4gdGhpcy5zZXRUaGVtZSA9IGZ1bmN0aW9uKGRhdGEpe1xuICAgcmV0dXJuICRodHRwKHtcbiAgICAgbWV0aG9kOiAnUHV0JyxcbiAgICAgdXJsOlwiL3RoZW1lXCIsXG4gICAgIGRhdGE6IGRhdGFcbiAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgIHRoZW1lID0gcmVzLmRhdGFbMF0udXNlcl90aGVtZVxuICAgICAgIHJldHVybiByZXM7XG4gICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gfSlcbiB9XG5cbnRoaXMuYWRkQ2hpbGQgPSBmdW5jdGlvbihjaGlsZCl7XG4gIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGNoaWxkKSk7XG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOlwiUE9TVFwiLFxuICAgIHVybDpcIi9jaGlsZHJlblwiLFxuICAgIGRhdGE6IGNoaWxkXG4gIH0pXG59XG5cbnRoaXMuZ2V0UmV3YXJkcyA9IGZ1bmN0aW9uKGlkKXtcbiAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgbWV0aG9kOiBcIkdldFwiLFxuICAgICAgdXJsOicvY2hpbGRyZXdhcmRzLycgKyBpZCxcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICByZXR1cm4gcmVzLmRhdGE7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgfSlcbn1cblxuICB0aGlzLnJldHVyblRoZW1lID0gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gdGhlbWU7XG4gIH1cbi8vIHRoaXMuZ2V0RGFpbHlDaG9yZXMgPSBmdW5jdGlvbihpZCl7XG4vLyAgIHJldHVybiAkaHR0cCh7XG4vLyAgICAgbWV0aG9kOiBcIkdldFwiLFxuLy8gICAgIHVybDonJyArIGlkLFxuLy8gICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuLy8gICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuLy8gICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbi8vICAgICAgY29uc29sZS5sb2coZXJyKTtcbi8vIH0pXG4vLyB9XG4vL1xuLy8gdGhpcy5nZXRXZWVrbHlDaG9yZXMgPSBmdW5jdGlvbihpZCl7XG4vLyAgIHJldHVybiAkaHR0cCh7XG4vLyAgICAgbWV0aG9kOiBcIkdldFwiLFxuLy8gICAgIHVybDonJyArIGlkLFxuLy8gICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuLy8gICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuLy8gICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbi8vICAgICAgY29uc29sZS5sb2coZXJyKTtcbi8vIH0pXG4vLyB9XG4vL1xuLy8gdGhpcy5nZXRTcGVjaWFsQ2hvcmVzID0gZnVuY3Rpb24oaWQpe1xuLy8gICByZXR1cm4gJGh0dHAoe1xuLy8gICAgIG1ldGhvZDogXCJHZXRcIixcbi8vICAgICB1cmw6JycgKyBpZCxcbi8vICAgfSkudGhlbihmdW5jdGlvbihyZXMpIHtcbi8vICAgICAgIHJldHVybiByZXMuZGF0YTtcbi8vICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4vLyAgICAgIGNvbnNvbGUubG9nKGVycik7XG4vLyB9KVxuLy8gfVxuICAvLyB0aGlzLmNoZWNrT2ZmY2hvcmUgPSBmdW5jdGlvbihpZCl7XG4gIC8vICAgcmV0dXJuICRodHRwKHtcbiAgLy8gICAgIG1ldGhvZDogXCJQVVRcIixcbiAgLy8gICAgIHVybDpcbiAgLy8gICB9KVxuICAvLyB9XG5cbn0pOy8vZW5kIG9mIHNlcnZpY2VcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJhZGRDaGlsZEN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLHVzZXJTZXJ2aWNlLCRzdGF0ZSl7XG4gIC8vYmFja2J1dHRvblxuICAkc2NvcGUuZ29iYWNrID0gZnVuY3Rpb24oKXtcbiAgICB3aW5kb3cuaGlzdG9yeS5nbygtMSlcbiAgfVxudmFyIHVzZXIgPSB1c2VyU2VydmljZS5nZXRVc2VySW5mby5zdWI7XG5jb25zb2xlLmxvZyh1c2VyKTtcbiRzY29wZS5zdWJtaXRDaGlsZCA9IGZ1bmN0aW9uKGNoaWxkKXtcbiAgY2hpbGQudXNlcl9ob3VzZWhvbGQgPSB1c2VyLnVzZXJfaG91c2Vob2xkO1xuICBjb25zb2xlLmxvZyhjaGlsZCk7XG4gIHVzZXJTZXJ2aWNlLmFkZENoaWxkKGNoaWxkKVxuICAudGhlbihmdW5jdGlvbihyZXMpe1xuICAgICRzdGF0ZS5nbygnaG9tZScpO1xuICB9KTtcblxufVxuXG5cblxuXG5cbn0pIC8vZW5kIG9mIGNvbnRyb2xsZXJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJhc3NpZ25DaG9yZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLGNob3JlU2VydmljZSwkc3RhdGUpe1xuXG52YXIgY3VycmVudFVzZXIgPSBjaG9yZVNlcnZpY2UuZ2V0VXNlckluZm8uc3ViO1xuXG5cbmNob3JlU2VydmljZS5nZXRDaGlsZHJlbihob3VzZWhvbGQpXG4udGhlbihmdW5jdGlvbihyZXMpe1xuICAkc2NvcGUuY2hvcmVzID0gcmVzLmRhdGE7XG4gIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbn0pXG5cblxuXG5cbiRzY29wZS5jaG9yZSA9IHtcbmNob3JlX2RhaWx5OiBmYWxzZSxcbmNob3JlX3dlZWtseTogZmFsc2UsXG5jaG9yZV9tb250aGx5OmZhbHNlXG59XG5cbiRzY29wZS5zdWJtaXRDaG9yZSA9IGZ1bmN0aW9uKGNob3JlKXtcbiAgY2hvcmUudXNlcl9ob3VzZWhvbGRfZmsgPSBjdXJyZW50VXNlci51c2VyX2hvdXNlaG9sZDtcbiAgY29uc29sZS5sb2coY2hvcmUudXNlcl9ob3VzZWhvbGRfZmspXG4gIC8vIGNob3JlU2VydmljZS5jcmVhdGVDaG9yZShjaG9yZSlcbiAgLy8gLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgLy9cbiAgLy8gfSlcbn1cblxuXG5cblxuXG5cblxufSkvL2VuZCBvZiBjb250cm9sbGVyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKCdjYW1lcmFDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkY29yZG92YUNhbWVyYSkge1xuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkZXZpY2VyZWFkeVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAkY29yZG92YVBsdWdpbi5zb21lRnVuY3Rpb24oKS50aGVuKHN1Y2Nlc3MsIGVycm9yKTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICAvLyBPUiB3aXRoIElPTklDXG5cbiAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICRjb3Jkb3ZhUGx1Z2luLnNvbWVGdW5jdGlvbigpLnRoZW4oc3VjY2VzcywgZXJyb3IpO1xuICAgIH0pO1xuXG4gICRzY29wZS50YWtlUGljdHVyZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgcXVhbGl0eTogNTAsXG4gICAgICBkZXN0aW5hdGlvblR5cGU6IENhbWVyYS5EZXN0aW5hdGlvblR5cGUuREFUQV9VUkwsXG4gICAgICBzb3VyY2VUeXBlOiBDYW1lcmEuUGljdHVyZVNvdXJjZVR5cGUuQ0FNRVJBLFxuICAgICAgYWxsb3dFZGl0OiBmYWxzZSxcbiAgICAgIGVuY29kaW5nVHlwZTogQ2FtZXJhLkVuY29kaW5nVHlwZS5KUEVHLFxuICAgICAgdGFyZ2V0V2lkdGg6IDMwMCxcbiAgICAgIHRhcmdldEhlaWdodDogMzAwLFxuICAgICAgcG9wb3Zlck9wdGlvbnM6IENhbWVyYVBvcG92ZXJPcHRpb25zLFxuICAgICAgc2F2ZVRvUGhvdG9BbGJ1bTogZmFsc2UsXG5cdCAgICBjb3JyZWN0T3JpZW50YXRpb246dHJ1ZVxuICAgIH07XG5cbiAgICAkY29yZG92YUNhbWVyYS5nZXRQaWN0dXJlKG9wdGlvbnMpLnRoZW4oZnVuY3Rpb24oaW1hZ2VEYXRhKSB7XG4gICAgICAkc2NvcGUuaW1nVVJJID0gXCJkYXRhOmltYWdlL2pwZWc7YmFzZTY0LFwiICsgaW1hZ2VEYXRhO1xuICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgLy8gZXJyb3JcbiAgICB9KTtcblxuICB9O1xuICB9LCBmYWxzZSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiY2hpbGRCYW5rQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRhdXRoLCB1c2VyU2VydmljZSl7XG4gIHZhciB1c2VyVG9rZW4gPSAkYXV0aC5nZXRQYXlsb2FkKCk7XG4gICB1c2VyU2VydmljZS5nZXRVc2VySW5mbyA9IHVzZXJUb2tlbjtcbiAgICRzY29wZS51c2VyID0gdXNlclRva2VuLnN1YjtcbiAgICRzY29wZS50aGVtZSA9ICRzY29wZS51c2VyLnVzZXJfdGhlbWVcblxuICAgJHNjb3BlLiRvbignJGlvbmljVmlldy5iZWZvcmVFbnRlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgdmFyIGdldFRoZW1lID0gZnVuY3Rpb24oKXtcbiAgICAgICAkc2NvcGUudGhlbWUgPSB1c2VyU2VydmljZS5yZXR1cm5UaGVtZSgpXG4gICAgIH1cbiAgICAgaWYodXNlclNlcnZpY2UucmV0dXJuVGhlbWUoKSl7XG4gICAgICAgZ2V0VGhlbWUoKVxuICAgICB9XG4gICAgICRzY29wZS5zZXRUaGVtZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAnYmFzZWJhbGwnKXtcbiAgICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL2ltZy1iYXNlYmFsbC10cmFucy5wbmcnXG4gICAgICAgfVxuICAgICAgIGlmKCRzY29wZS50aGVtZSA9PT0gJ2NoYXJsaWVCcm93bicpe1xuICAgICAgICAgJHNjb3BlLnRoZW1lSW1hZ2UgPSAnLi9pbWcvc25vb3B5LnBuZydcbiAgICAgICB9XG4gICAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAncHJpbmNlc3MnKXtcbiAgICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL0Nyb3duX1ByaW5jZXNzLnBuZydcbiAgICAgICB9XG4gICAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAnc3RhcldhcnMnKXtcbiAgICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL2RlYXRoLXN0YXItMm5kLWljb24ucG5nJ1xuICAgICAgIH1cbiAgICAgICBpZigkc2NvcGUudGhlbWUgPT09ICd3YXRlcicpe1xuICAgICAgICAgJHNjb3BlLnRoZW1lSW1hZ2UgPSAnLi9pbWcvVHJhbnNwYXJlbnRfV2F0ZXJfRHJvcF9QTkdfUGljdHVyZS5wbmcnXG4gICAgICAgfVxuXG4gICAgIH1cbiAgICAgJHNjb3BlLnNldFRoZW1lKCk7XG4gIH0pO1xuXG5cblxuXG5cbiAgIHZhciBnZXRSZXdhcmRzID0gZnVuY3Rpb24oKXtcbiAgICAgaWQgPSAkc2NvcGUudXNlci51c2VyX2lkX3BrO1xuICAgICB1c2VyU2VydmljZS5nZXRSZXdhcmRzKGlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAkc2NvcGUucmV3YXJkcyA9IHJlc3BvbnNlO1xuICAgICB9KVxuICAgfVxuICAgZ2V0UmV3YXJkcygpO1xuXG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiY2hpbGRIb21lQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsLCAkYXV0aCwgdXNlclNlcnZpY2Upe1xuICAvLyAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tICBjaGlsZCBIb21lIGNvbnRyb2xsZXJcIlxuICAvL3ZhciB1c2VyVG9rZW4gPSB1c2VyU2VydmljZS5nZXRVc2VySW5mby5zdWI7XG5cbiAgdmFyIHVzZXJUb2tlbiA9ICRhdXRoLmdldFBheWxvYWQoKTtcbiAgdXNlclNlcnZpY2UuZ2V0VXNlckluZm8gPSB1c2VyVG9rZW47XG4gICRzY29wZS51c2VyID0gdXNlclRva2VuLnN1YjtcblxuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3RoZW1lTW9kYWwuaHRtbCcsIHtcbiAgICAgaWQ6ICcxJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWwxID0gbW9kYWw7XG4gICB9KTtcblxuICAgLy8gTW9kYWwgMlxuICAvLyAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCd0YWtlUGljdHVyZU1vZGFsLmh0bWwnLCB7XG4gIC8vICAgIGlkOiAnMicsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAvLyAgICBzY29wZTogJHNjb3BlLFxuICAvLyAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gIC8vICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAvLyAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAvLyAgICAkc2NvcGUub01vZGFsMiA9IG1vZGFsO1xuICAvLyAgfSk7XG4gICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgaWYgKGluZGV4ID09IDEpICRzY29wZS5vTW9kYWwxLnNob3coKTtcbiAgICAgZWxzZSAkc2NvcGUub01vZGFsMi5zaG93KCk7XG4gICB9O1xuXG4gICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgIGlmIChpbmRleCA9PSAxKSAkc2NvcGUub01vZGFsMS5oaWRlKCk7XG4gICAgIGVsc2UgJHNjb3BlLm9Nb2RhbDIuaGlkZSgpO1xuICAgfTtcblxuICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDEucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWwyLnJlbW92ZSgpO1xuXG4gICB9KTtcblxuICAkc2NvcGUudGhlbWUgPSAkc2NvcGUudXNlci51c2VyX3RoZW1lXG4gICRzY29wZS5zZXRUaGVtZSA9IGZ1bmN0aW9uKGNob2ljZSl7XG4gICAgdmFyIGRhdGEgPSB7fVxuICAgIGRhdGEudGhlbWUgPSBjaG9pY2VcbiAgICBkYXRhLnVzZXJJZCA9ICRzY29wZS51c2VyLnVzZXJfaWRfcGs7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgdXNlclNlcnZpY2Uuc2V0VGhlbWUoZGF0YSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgaWYocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApe1xuICAgICAgJHNjb3BlLnRoZW1lID0gY2hvaWNlXG4gICAgICB9XG4gIH0pXG4gIH1cblxuICAvLyB2YXIgZ2V0RGFpbHlDaG9yZXMgPSBmdW5jdGlvbigpe1xuICAvLyAgIGlkID0gJHNjb3BlLnVzZXIudXNlcl9pZF9wa1xuICAvLyAgIGNob3JlU2VydmljZS5nZXREYWlseUNob3JlcyhpZCkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gIC8vICAgICAkc2NvcGUuZGFpbHlDaG9yZXMgPSByZXNwb25zZTtcbiAgLy8gICB9KVxuICAvLyB9XG4gIC8vICBnZXREYWlseUNob3JlcygpXG4gIC8vIHZhciBnZXRXZWVrbHlDaG9yZXMgPSBmdW5jdGlvbigpe1xuICAvLyAgIGlkID0gJHNjb3BlLnVzZXIudXNlcl9pZF9wa1xuICAvLyAgIGNob3JlU2VydmljZS5nZXRXZWVrbHlDaG9yZXMoaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAvLyAgICAgJHNjb3BlLndlZWtseUNob3JlcyA9IHJlc3BvbnNlO1xuICAvLyAgIH0pXG4gIC8vIH1cbiAgLy8gZ2V0V2Vla2x5Q2hvcmVzKClcbiAgLy8gdmFyIGdldFNwZWNpYWxDaG9yZXMgPSBmdW5jdGlvbigpe1xuICAvLyAgIGlkID0gJHNjb3BlLnVzZXIudXNlcl9pZF9wa1xuICAvLyAgIGNob3JlU2VydmljZS5nZXRTcGVjaWFsQ2hvcmVzKGlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgLy8gICAgICRzY29wZS5zcGVjaWFsQ2hvcmVzID0gcmVzcG9uc2U7XG4gIC8vICAgfSlcbiAgLy8gfVxuLy8gICBnZXRTcGVjaWFsQ2hvcmVzKClcbiAgICAgIC8vICRzY29wZS5jaGVja09mZmNob3JlID0gZnVuY3Rpb24oaWQpe1xuICAgICAgLy8gICB1c2VyU2VydmljZS5jaGVja09mZmNob3JlKGlkKVxuICAgICAgLy8gfVxuXG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJjaGlsZExvZ2luQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRhdXRoLCAkc3RhdGUsIGxvZ2luU2VydmljZSl7XG4gIC8vICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIGNoaWxkIExvZ2luIGNvbnRyb2xsZXJcIlxuXG4gICAkc2NvcGUubG9naW5DaGlsZCA9IGZ1bmN0aW9uKHVzZXIpe1xuICAgICBjb25zb2xlLmxvZyh1c2VyKVxuICAgICBsb2dpblNlcnZpY2UudXNlckxvZ2luKHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICRhdXRoLnNldFRva2VuKHJlc3BvbnNlKVxuICAgICAgICAgJHN0YXRlLmdvKCdjaGlsZEhvbWUnKVxuXG4gICAgIH0pXG4gICB9XG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImVkaXRDaGlsZEN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XG4gICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpXG4gIH1cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJoaXN0b3J5Q3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBIaXN0b3J5IGNvbnRyb2xsZXJcIlxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImhvbWVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwsdXNlclNlcnZpY2UsJHdpbmRvdywgJGF1dGgpe1xudmFyIHVzZXJUb2tlbiA9IHVzZXJTZXJ2aWNlLmdldFVzZXJJbmZvLnN1YjtcbmNvbnNvbGUubG9nKHVzZXJUb2tlbik7XG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2Jhbm5lck1vZGFsLmh0bWwnLCB7XG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUubW9kYWwgPSBtb2RhbDtcbiAgIH0pO1xuICAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICAkc2NvcGUubW9kYWwuc2hvdygpO1xuICAgfTtcbiAgICRzY29wZS5zdWJtaXRCYW5uZXIgPSBmdW5jdGlvbihiYW5uZXIpe1xuICAgICB2YXIgYmFubmVySW5mbyA9IHtcbiAgICAgICB1c2VyX2hvdXNlaG9sZDp1c2VyVG9rZW4udXNlcl9ob3VzZWhvbGQsXG4gICAgICAgdXNlcl9iYW5uZXJfaW1hZ2U6YmFubmVyXG4gICAgIH1cbiAgICAgIHVzZXJTZXJ2aWNlLnBvc3RiYW5uZXIoYmFubmVySW5mbylcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbC1ib3hcIikudmFsdWUgPSAnJztcbiAgICAgICAgICAkd2luZG93LmxvY2F0aW9uLnJlbG9hZCh0cnVlKTtcbiAgICAgfSk7XG4gICB9O1xuICAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbC1ib3hcIikudmFsdWUgPSAnJztcbiAgICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcbiAgIH07XG4gICAvLyBDbGVhbnVwIHRoZSBtb2RhbCB3aGVuIHdlJ3JlIGRvbmUgd2l0aCBpdCFcbiAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICRzY29wZS5tb2RhbC5yZW1vdmUoKTtcbiAgIH0pO1xuICAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gaGlkZSBtb2RhbFxuICAgJHNjb3BlLiRvbignbW9kYWwuaGlkZGVuJywgZnVuY3Rpb24oKSB7XG4gICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG5cbiAgIH0pO1xuICAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gcmVtb3ZlIG1vZGFsXG4gICAkc2NvcGUuJG9uKCdtb2RhbC5yZW1vdmVkJywgZnVuY3Rpb24oKSB7XG4gICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gICB9KTtcblxuJHNjb3BlLmhvdXNlaG9sZCA9ICB1c2VyVG9rZW4udXNlcl9ob3VzZWhvbGQ7XG51c2VyU2VydmljZS5nZXRiYW5uZXIodXNlclRva2VuLnVzZXJfaG91c2Vob2xkKS50aGVuKGZ1bmN0aW9uKHJlcyl7XG5jb25zb2xlLmxvZyhyZXMuZGF0YVswXS51c2VyX2Jhbm5lcl9pbWFnZSk7XG4gICRzY29wZS5iYW5uZXIgPSByZXMuZGF0YVswXS51c2VyX2Jhbm5lcl9pbWFnZTtcbn0pO1xuXG5jb25zb2xlLmxvZyh1c2VyVG9rZW4uemlwKTtcblxudXNlclNlcnZpY2UuZ2V0V2VhdGhlcih1c2VyVG9rZW4uemlwKVxuLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAkc2NvcGUud2VhdGhlciA9IHJlcy5kYXRhO1xufSlcblxuXG59KS8vZW5kIG9mIGNvbnRyb2xsZXJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJsb2dpbkN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkYXV0aCwgJHN0YXRlLCBsb2dpblNlcnZpY2Upe1xuXG4kc2NvcGUubG9naW4gPSBmdW5jdGlvbih1c2VyKXtcbiAgLy8gY29uc29sZS5sb2codXNlcilcbiAgbG9naW5TZXJ2aWNlLnVzZXJMb2dpbih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAkYXV0aC5zZXRUb2tlbihyZXNwb25zZSlcbiAgICAgICRzdGF0ZS5nbygnaG9tZScpXG5cbiAgfSlcbn1cbiRzY29wZS5tYWtlVXNlciA9IGZ1bmN0aW9uKG5ld1VzZXIpe1xuICBsb2dpblNlcnZpY2UubWFrZVVzZXIobmV3VXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgJGF1dGguc2V0VG9rZW4ocmVzcG9uc2UpXG4gICAgICAkc3RhdGUuZ28oJ2hvbWUnKVxuICB9KVxufVxuICAkc2NvcGUuYXV0aGVudGljYXRlID0gZnVuY3Rpb24ocHJvdmlkZXIpIHtcbiAgJGF1dGguYXV0aGVudGljYXRlKHByb3ZpZGVyKX07XG4gIC8vICRzY29wZS50ZXN0ID0gXCJIZWxsbyBmcm9tIGxvZ2luIGNvbnRyb2xsZXJcIlxuXG5cbiAgJHNjb3BlLnJldmVhbGVyID0gZnVuY3Rpb24oKXtcbiAgJHNjb3BlLmhpZGUgPSAhJHNjb3BlLmhpZGU7XG4gfVxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcIm1ha2VDaG9yZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XG4gICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpXG4gIH1cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJzZXRSZXdhcmRzQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsKXtcbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdyZXdhcmRNb2RhbC5odG1sJywge1xuICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAkc2NvcGUubW9kYWwgPSBtb2RhbDtcbiAgfSk7XG4gICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwuc2hvdygpO1xuICB9O1xuICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gIH07XG4gIC8vIENsZWFudXAgdGhlIG1vZGFsIHdoZW4gd2UncmUgZG9uZSB3aXRoIGl0IVxuICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5yZW1vdmUoKTtcbiAgfSk7XG4gIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIGhpZGUgbW9kYWxcbiAgJHNjb3BlLiRvbignbW9kYWwuaGlkZGVuJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgfSk7XG4gIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIHJlbW92ZSBtb2RhbFxuICAkc2NvcGUuJG9uKCdtb2RhbC5yZW1vdmVkJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgfSk7XG4gIC8vYmFja2J1dHRvblxuICAkc2NvcGUuZ29iYWNrID0gZnVuY3Rpb24oKXtcbiAgICB3aW5kb3cuaGlzdG9yeS5nbygtMSlcbiAgfVxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcInNldHRpbmdzQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsKXtcbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdjaGFuZ2VQYXNzd29yZC5odG1sJywge1xuICAgICBpZDogJzEnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDEgPSBtb2RhbDtcbiAgIH0pO1xuXG4gICAvLyBNb2RhbCAyXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2NoYW5nZUhvdXNlaG9sZC5odG1sJywge1xuICAgICBpZDogJzInLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDIgPSBtb2RhbDtcbiAgIH0pO1xuXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2NoYW5nZVppcC5odG1sJywge1xuICAgICBpZDogJzMnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDMgPSBtb2RhbDtcbiAgIH0pO1xuXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2FkZFBhcmVudC5odG1sJywge1xuICAgICBpZDogJzQnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDQgPSBtb2RhbDtcbiAgIH0pO1xuXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3JlbW92ZUNoaWxkLmh0bWwnLCB7XG4gICAgIGlkOiAnNScsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsNSA9IG1vZGFsO1xuICAgfSk7XG5cblxuXG4gICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgaWYgKGluZGV4ID09IDEpICRzY29wZS5vTW9kYWwxLnNob3coKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSAyKSAkc2NvcGUub01vZGFsMi5zaG93KCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMykgJHNjb3BlLm9Nb2RhbDMuc2hvdygpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDQpICRzY29wZS5vTW9kYWw0LnNob3coKTtcbiAgICAgZWxzZSAkc2NvcGUub01vZGFsNS5zaG93KCk7XG4gICB9O1xuXG4gICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgIGlmIChpbmRleCA9PSAxKSAkc2NvcGUub01vZGFsMS5oaWRlKCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMikgJHNjb3BlLm9Nb2RhbDIuaGlkZSgpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDMpICRzY29wZS5vTW9kYWwzLmhpZGUoKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSA0KSAkc2NvcGUub01vZGFsNC5oaWRlKCk7XG4gICAgIGVsc2UgJHNjb3BlLm9Nb2RhbDUuaGlkZSgpO1xuICAgfTtcblxuICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDEucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWwyLnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsMy5yZW1vdmUoKTtcbiAgICAgJHNjb3BlLm9Nb2RhbDQucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWw1LnJlbW92ZSgpO1xuICAgfSk7XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwidHJhY2tlckN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCl7XG4gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgncGljQ29uZk1vZGFsLmh0bWwnLCB7XG4gICAgc2NvcGU6ICRzY29wZSxcbiAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICRzY29wZS5tb2RhbCA9IG1vZGFsO1xuICB9KTtcbiAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5zaG93KCk7XG4gIH07XG4gICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcbiAgfTtcbiAgLy8gQ2xlYW51cCB0aGUgbW9kYWwgd2hlbiB3ZSdyZSBkb25lIHdpdGggaXQhXG4gICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuICB9KTtcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gaGlkZSBtb2RhbFxuICAkc2NvcGUuJG9uKCdtb2RhbC5oaWRkZW4nLCBmdW5jdGlvbigpIHtcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxuICB9KTtcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gcmVtb3ZlIG1vZGFsXG4gICRzY29wZS4kb24oJ21vZGFsLnJlbW92ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxuICB9KTtcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJ1c2VySW5mb0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gaW5mbyBjb250cm9sbGVyXCJcblxufSlcbiJdfQ==
