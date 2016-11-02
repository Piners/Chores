'use strict';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('chore', ['ionic', 'satellizer']).config(function ($stateProvider, $urlRouterProvider, $authProvider) {
  $urlRouterProvider.otherwise("/login");
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
      url: "/children/" + household
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

  choreService.getChildren(currentUser.user_household).then(function (res) {
    // $scope.chores = res.data;
    $scope.childs = res.data;
    console.log(res.data[0]);
  });

  $scope.chore = {
    chore_daily: false,
    chore_weekly: false,
    chore_monthly: false
  };

  $scope.submitChore = function (chore) {
    chore.user_household_fk = currentUser.user_household;
    console.log(chore);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInNlcnZpY2UvY2hvcmVTZXJ2aWNlLmpzIiwic2VydmljZS9sb2dpblNlcnZpY2UuanMiLCJzZXJ2aWNlL3VzZXJTZXJ2aWNlLmpzIiwiY29udHJvbGxlcnMvYWRkQ2hpbGRDdHJsLmpzIiwiY29udHJvbGxlcnMvYXNzaWduQ2hvcmVDdHJsLmpzIiwiY29udHJvbGxlcnMvY2FtZXJhQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NoaWxkQmFua0N0cmwuanMiLCJjb250cm9sbGVycy9jaGlsZEhvbWVDdHJsLmpzIiwiY29udHJvbGxlcnMvY2hpbGRMb2dpbkN0cmwuanMiLCJjb250cm9sbGVycy9lZGl0Q2hpbGRDdHJsLmpzIiwiY29udHJvbGxlcnMvaGlzdG9yeUN0cmwuanMiLCJjb250cm9sbGVycy9ob21lQ3RybC5qcyIsImNvbnRyb2xsZXJzL2xvZ2luQ3RybC5qcyIsImNvbnRyb2xsZXJzL21ha2VDaG9yZUN0cmwuanMiLCJjb250cm9sbGVycy9zZXRSZXdhcmRzQ3RybC5qcyIsImNvbnRyb2xsZXJzL3NldHRpbmdzQ3RybC5qcyIsImNvbnRyb2xsZXJzL3RyYWNrZXJDdHJsLmpzIiwiY29udHJvbGxlcnMvdXNlckluZm9DdHJsLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsIiR1cmxSb3V0ZXJQcm92aWRlciIsIiRhdXRoUHJvdmlkZXIiLCJvdGhlcndpc2UiLCJzdGF0ZSIsInVybCIsInRlbXBsYXRlVXJsIiwiY29udHJvbGxlciIsImZhY2Vib29rIiwiY2xpZW50SWQiLCJyZXNwb25zZVR5cGUiLCJnb29nbGUiLCJydW4iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5Iiwid2luZG93IiwiY29yZG92YSIsInBsdWdpbnMiLCJLZXlib2FyZCIsImhpZGVLZXlib2FyZEFjY2Vzc29yeUJhciIsImRpc2FibGVTY3JvbGwiLCJTdGF0dXNCYXIiLCJzdHlsZURlZmF1bHQiLCJzZXJ2aWNlIiwiJGh0dHAiLCIkcSIsIiRhdXRoIiwiZ2V0VXNlckluZm8iLCJnZXRQYXlsb2FkIiwiZ2V0Q2hpbGRyZW4iLCJob3VzZWhvbGQiLCJtZXRob2QiLCJjcmVhdGVDaG9yZSIsImNob3JlIiwiZGF0YSIsInVzZXJMb2dpbiIsInVzZXIiLCJjb25zb2xlIiwibG9nIiwibWFrZVVzZXIiLCJuZXdVc2VyIiwiYmFubmVyIiwidGhlbWUiLCJwb3N0YmFubmVyIiwidXNlcl9iYW5uZXJfaW1hZ2UiLCJ1c2VyX2hvdXNlaG9sZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJnZXRiYW5uZXIiLCJ1c2VySWQiLCJnZXRXZWF0aGVyIiwic2V0VGhlbWUiLCJ0aGVuIiwicmVzIiwidXNlcl90aGVtZSIsImNhdGNoIiwiZXJyIiwiYWRkQ2hpbGQiLCJjaGlsZCIsImdldFJld2FyZHMiLCJpZCIsInJldHVyblRoZW1lIiwiJHNjb3BlIiwidXNlclNlcnZpY2UiLCIkc3RhdGUiLCJnb2JhY2siLCJoaXN0b3J5IiwiZ28iLCJzdWIiLCJzdWJtaXRDaGlsZCIsImNob3JlU2VydmljZSIsImN1cnJlbnRVc2VyIiwiY2hpbGRzIiwiY2hvcmVfZGFpbHkiLCJjaG9yZV93ZWVrbHkiLCJjaG9yZV9tb250aGx5Iiwic3VibWl0Q2hvcmUiLCJ1c2VyX2hvdXNlaG9sZF9mayIsIiRjb3Jkb3ZhQ2FtZXJhIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiJGNvcmRvdmFQbHVnaW4iLCJzb21lRnVuY3Rpb24iLCJzdWNjZXNzIiwiZXJyb3IiLCJ0YWtlUGljdHVyZSIsIm9wdGlvbnMiLCJxdWFsaXR5IiwiZGVzdGluYXRpb25UeXBlIiwiQ2FtZXJhIiwiRGVzdGluYXRpb25UeXBlIiwiREFUQV9VUkwiLCJzb3VyY2VUeXBlIiwiUGljdHVyZVNvdXJjZVR5cGUiLCJDQU1FUkEiLCJhbGxvd0VkaXQiLCJlbmNvZGluZ1R5cGUiLCJFbmNvZGluZ1R5cGUiLCJKUEVHIiwidGFyZ2V0V2lkdGgiLCJ0YXJnZXRIZWlnaHQiLCJwb3BvdmVyT3B0aW9ucyIsIkNhbWVyYVBvcG92ZXJPcHRpb25zIiwic2F2ZVRvUGhvdG9BbGJ1bSIsImNvcnJlY3RPcmllbnRhdGlvbiIsImdldFBpY3R1cmUiLCJpbWFnZURhdGEiLCJpbWdVUkkiLCJ1c2VyVG9rZW4iLCIkb24iLCJnZXRUaGVtZSIsInRoZW1lSW1hZ2UiLCJ1c2VyX2lkX3BrIiwicmVzcG9uc2UiLCJyZXdhcmRzIiwiJGlvbmljTW9kYWwiLCJmcm9tVGVtcGxhdGVVcmwiLCJzY29wZSIsImJhY2tkcm9wQ2xpY2tUb0Nsb3NlIiwiYW5pbWF0aW9uIiwibW9kYWwiLCJvTW9kYWwxIiwib3Blbk1vZGFsIiwiaW5kZXgiLCJzaG93Iiwib01vZGFsMiIsImNsb3NlTW9kYWwiLCJoaWRlIiwicmVtb3ZlIiwiY2hvaWNlIiwic3RhdHVzIiwibG9naW5TZXJ2aWNlIiwibG9naW5DaGlsZCIsInNldFRva2VuIiwidGVzdCIsIiR3aW5kb3ciLCJzdWJtaXRCYW5uZXIiLCJiYW5uZXJJbmZvIiwiZ2V0RWxlbWVudEJ5SWQiLCJ2YWx1ZSIsImxvY2F0aW9uIiwicmVsb2FkIiwiemlwIiwid2VhdGhlciIsImxvZ2luIiwiYXV0aGVudGljYXRlIiwicHJvdmlkZXIiLCJyZXZlYWxlciIsIm9Nb2RhbDMiLCJvTW9kYWw0Iiwib01vZGFsNSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUFBLFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCLENBQUMsT0FBRCxFQUFVLFlBQVYsQ0FBeEIsRUFDQ0MsTUFERCxDQUNRLFVBQVNDLGNBQVQsRUFBeUJDLGtCQUF6QixFQUE2Q0MsYUFBN0MsRUFBMkQ7QUFDakVELHFCQUFtQkUsU0FBbkIsQ0FBNkIsUUFBN0I7QUFDQUgsaUJBQ0NJLEtBREQsQ0FDTyxVQURQLEVBQ2tCO0FBQ2hCQyxTQUFJLFdBRFk7QUFFaEJDLGlCQUFhLDJCQUZHO0FBR2hCQyxnQkFBWTtBQUhJLEdBRGxCLEVBTUNILEtBTkQsQ0FNTyxhQU5QLEVBTXFCO0FBQ25CQyxTQUFJ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LENBQWUsT0FBZixFQUF3QlMsVUFBeEIsQ0FBbUMsYUFBbkMsRUFBa0QsVUFBU3VELE1BQVQsRUFBaUJxRCxXQUFqQixFQUE2QjtBQUM3RUEsY0FBWUMsZUFBWixDQUE0QixtQkFBNUIsRUFBaUQ7QUFDL0NDLFdBQU92RCxNQUR3QztBQUUvQ3lELGVBQVc7QUFGb0MsR0FBakQsRUFHR25FLElBSEgsQ0FHUSxVQUFTb0UsS0FBVCxFQUFnQjtBQUN0QjFELFdBQU8wRCxLQUFQLEdBQWVBLEtBQWY7QUFDRCxHQUxEO0FBTUExRCxTQUFPNEQsU0FBUCxHQUFtQixZQUFXO0FBQzVCNUQsV0FBTzBELEtBQVAsQ0FBYUksSUFBYjtBQUNELEdBRkQ7QUFHQTlELFNBQU9nRSxVQUFQLEdBQW9CLFlBQVc7QUFDN0JoRSxXQUFPMEQsS0FBUCxDQUFhTyxJQUFiO0FBQ0QsR0FGRDtBQUdBO0FBQ0FqRSxTQUFPK0MsR0FBUCxDQUFXLFVBQVgsRUFBdUIsWUFBVztBQUNoQy9DLFdBQU8wRCxLQUFQLENBQWFRLE1BQWI7QUFDRCxHQUZEO0FBR0E7QUFDQWxFLFNBQU8rQyxHQUFQLENBQVcsY0FBWCxFQUEyQixZQUFXO0FBQ3BDO0FBQ0QsR0FGRDtBQUdBO0FBQ0EvQyxTQUFPK0MsR0FBUCxDQUFXLGVBQVgsRUFBNEIsWUFBVztBQUNyQztBQUNELEdBRkQ7QUFJRCxDQTFCRDs7O0FDQUFoSCxRQUFRQyxNQUFSLENBQWUsT0FBZixFQUF3QlMsVUFBeEIsQ0FBbUMsY0FBbkMsRUFBbUQsVUFBU3VELE1BQVQsRUFBZ0I7QUFDaEVBLFVBQU93RSxJQUFQLEdBQWMsOEJBQWQ7QUFFRixDQUhEIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIElvbmljIFN0YXJ0ZXIgQXBwXG5cbi8vIGFuZ3VsYXIubW9kdWxlIGlzIGEgZ2xvYmFsIHBsYWNlIGZvciBjcmVhdGluZywgcmVnaXN0ZXJpbmcgYW5kIHJldHJpZXZpbmcgQW5ndWxhciBtb2R1bGVzXG4vLyAnc3RhcnRlcicgaXMgdGhlIG5hbWUgb2YgdGhpcyBhbmd1bGFyIG1vZHVsZSBleGFtcGxlIChhbHNvIHNldCBpbiBhIDxib2R5PiBhdHRyaWJ1dGUgaW4gaW5kZXguaHRtbClcbi8vIHRoZSAybmQgcGFyYW1ldGVyIGlzIGFuIGFycmF5IG9mICdyZXF1aXJlcydcblxuYW5ndWxhci5tb2R1bGUoJ2Nob3JlJywgWydpb25pYycsICdzYXRlbGxpemVyJ10pXG4uY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRhdXRoUHJvdmlkZXIpe1xuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKFwiL2xvZ2luXCIpO1xuICAkc3RhdGVQcm92aWRlclxuICAuc3RhdGUoJ2FkZENoaWxkJyx7XG4gICAgdXJsOlwiL2FkZENoaWxkXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvYWRkQ2hpbGQuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiYWRkQ2hpbGRDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdhc3NpZ25DaG9yZScse1xuICAgIHVybDpcIi9hc3NpZ25DaG9yZVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2Fzc2lnbkNob3JlLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImFzc2lnbkNob3JlQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnZWRpdENoaWxkJyx7XG4gICAgdXJsOlwiL2VkaXRDaGlsZC86aWRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9lZGl0Q2hpbGQuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiZWRpdENoaWxkQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnaGlzdG9yeScse1xuICAgIHVybDpcIi9oaXN0b3J5XCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvaGlzdG9yeS5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJoaXN0b3J5Q3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnaG9tZScse1xuICAgIHVybDpcIi9ob21lXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvaG9tZS5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJob21lQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnbG9naW4nLHtcbiAgICB1cmw6XCIvbG9naW5cIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9Mb2dpbi5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJsb2dpbkN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ21ha2VDaG9yZScse1xuICAgIHVybDpcIi9tYWtlQ2hvcmVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9tYWtlQ2hvcmUuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwibWFrZUNob3JlQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnc2V0UmV3YXJkcycse1xuICAgIHVybDpcIi9zZXRSZXdhcmRzLzppZFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL3NldFJld2FyZHMuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwic2V0UmV3YXJkc0N0cmxcIlxuICB9KVxuICAuc3RhdGUoJ3NldHRpbmdzJyx7XG4gICAgdXJsOlwiL3NldHRpbmdzXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvc2V0dGluZ3MuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwic2V0dGluZ3NDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCd0cmFja2VyJyx7XG4gICAgdXJsOlwiL3RyYWNrZXIvOmlkXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvdHJhY2tlci5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJ0cmFja2VyQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgndXNlckluZm8nLHtcbiAgICB1cmw6XCIvdXNlckluZm9cIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy91c2VySW5mby5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJ1c2VySW5mb0N0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2NoaWxkQmFuaycse1xuICAgIHVybDpcIi9jaGlsZC9iYW5rXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvY2hpbGRCYW5rLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImNoaWxkQmFua0N0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2NoaWxkSG9tZScse1xuICAgIHVybDpcIi9jaGlsZC9ob21lXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvY2hpbGRIb21lLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImNoaWxkSG9tZUN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2NoaWxkTG9naW4nLHtcbiAgICB1cmw6XCIvY2hpbGQvbG9naW5cIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9jaGlsZExvZ2luLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImNoaWxkTG9naW5DdHJsXCJcbiAgfSlcblxuICAkYXV0aFByb3ZpZGVyLmZhY2Vib29rKHtcbiAgICBjbGllbnRJZDogJzMzMjI3MjA1NzEzMjY4MSdcbiAgfSk7XG5cbiAgLy8gT3B0aW9uYWw6IEZvciBjbGllbnQtc2lkZSB1c2UgKEltcGxpY2l0IEdyYW50KSwgc2V0IHJlc3BvbnNlVHlwZSB0byAndG9rZW4nIChkZWZhdWx0OiAnY29kZScpXG4gICRhdXRoUHJvdmlkZXIuZmFjZWJvb2soe1xuICAgIGNsaWVudElkOiAnMzMyMjcyMDU3MTMyNjgxJyxcbiAgICByZXNwb25zZVR5cGU6ICd0b2tlbidcbiAgfSk7XG5cbiAgJGF1dGhQcm92aWRlci5nb29nbGUoe1xuICAgIGNsaWVudElkOiAnMjc1MzUyOTYwOTQ2LTVyY2FuM3FraGxzYzdtNTBoZXY1ZG4yZTJjYWU5bWJwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tJyxcbiAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxMDAvIy9sb2dpbi8nXG4gIH0pO1xufSlcblxuXG5cbi5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0pIHtcbiAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgaWYod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxuICAgICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcblxuICAgICAgLy8gRG9uJ3QgcmVtb3ZlIHRoaXMgbGluZSB1bmxlc3MgeW91IGtub3cgd2hhdCB5b3UgYXJlIGRvaW5nLiBJdCBzdG9wcyB0aGUgdmlld3BvcnRcbiAgICAgIC8vIGZyb20gc25hcHBpbmcgd2hlbiB0ZXh0IGlucHV0cyBhcmUgZm9jdXNlZC4gSW9uaWMgaGFuZGxlcyB0aGlzIGludGVybmFsbHkgZm9yXG4gICAgICAvLyBhIG11Y2ggbmljZXIga2V5Ym9hcmQgZXhwZXJpZW5jZS5cbiAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5kaXNhYmxlU2Nyb2xsKHRydWUpO1xuICAgIH1cbiAgICBpZih3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XG4gICAgfVxuICB9KTtcbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5zZXJ2aWNlKFwiY2hvcmVTZXJ2aWNlXCIsIGZ1bmN0aW9uKCRodHRwLCRxLCRhdXRoKXtcblxudGhpcy5nZXRVc2VySW5mbyA9ICRhdXRoLmdldFBheWxvYWQoKTtcblxuXG50aGlzLmdldENoaWxkcmVuID0gZnVuY3Rpb24oaG91c2Vob2xkKXtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6XCJHRVRcIixcbiAgICB1cmw6XCIvY2hpbGRyZW4vXCIgKyBob3VzZWhvbGRcbiAgfSlcbn1cblxudGhpcy5jcmVhdGVDaG9yZSA9IGZ1bmN0aW9uKGNob3JlKXtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6XCJQT1NUXCIsXG4gICAgdXJsOlwiL2Fzc2lnbmNob3JlXCIsXG4gICAgZGF0YTpjaG9yZVxuICB9KVxufVxuXG5cblxuXG59KS8vZW5kIG9mIHNlcnZpY2VcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLnNlcnZpY2UoJ2xvZ2luU2VydmljZScsIGZ1bmN0aW9uKCRodHRwKXtcblxuXG4gIHRoaXMudXNlckxvZ2luID0gZnVuY3Rpb24odXNlcikge1xuICAgIGNvbnNvbGUubG9nKHVzZXIsIFwic2VydmljZVwiKVxuICAgIHJldHVybiAkaHR0cCh7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgdXJsOiAnL2F1dGgvbG9naW4nLFxuICAgICAgZGF0YTogdXNlclxuICAgIH0pXG4gIH1cbiAgdGhpcy5tYWtlVXNlciA9IGZ1bmN0aW9uKG5ld1VzZXIpIHtcbiAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIHVybDogJy9hdXRoL3NpZ251cCcsXG4gICAgICBkYXRhOiBuZXdVc2VyXG4gICAgfSlcbiAgfVxufSkgLy8gZW5kIG9mIHNlcnZpY2VcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLnNlcnZpY2UoJ3VzZXJTZXJ2aWNlJywgZnVuY3Rpb24oJGh0dHAsJHEsJGF1dGgpe1xuXG52YXIgYmFubmVyO1xuXG50aGlzLmdldFVzZXJJbmZvO1xudmFyIHRoZW1lO1xuXG5cbnRoaXMucG9zdGJhbm5lciA9IGZ1bmN0aW9uKGJhbm5lcil7XG4gIGNvbnNvbGUubG9nKGJhbm5lcik7XG4gIGNvbnNvbGUubG9nKGJhbm5lci51c2VyX2Jhbm5lcl9pbWFnZSk7XG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgIHVybDpcIi9iYW5uZXIvXCIgKyBiYW5uZXIudXNlcl9ob3VzZWhvbGQsXG4gICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe3VzZXJfYmFubmVyX2ltYWdlOmJhbm5lci51c2VyX2Jhbm5lcl9pbWFnZX0pXG4gIH0pXG59XG5cbnRoaXMuZ2V0YmFubmVyID0gZnVuY3Rpb24odXNlcklkKXtcbiAgY29uc29sZS5sb2codXNlcklkKTtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgdXJsOlwiL2Jhbm5lci9cIiArIHVzZXJJZFxuICB9KVxufVxuXG5cbnRoaXMuZ2V0V2VhdGhlciA9IGZ1bmN0aW9uKCl7XG5yZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6J2h0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT16aXA9ODQwMTAmdW5pdHM9aW1wZXJpYWwmYXBwaWQ9YzEwZWY5OWM1YWZkZWUzZmRmYmE3OGU4Yzk4MWE5YjYnXG4gIH0pXG5cbn07XG5cblxuIHRoaXMuc2V0VGhlbWUgPSBmdW5jdGlvbihkYXRhKXtcbiAgIHJldHVybiAkaHR0cCh7XG4gICAgIG1ldGhvZDogJ1B1dCcsXG4gICAgIHVybDpcIi90aGVtZVwiLFxuICAgICBkYXRhOiBkYXRhXG4gICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICB0aGVtZSA9IHJlcy5kYXRhWzBdLnVzZXJfdGhlbWVcbiAgICAgICByZXR1cm4gcmVzO1xuICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuIH0pXG4gfVxuXG50aGlzLmFkZENoaWxkID0gZnVuY3Rpb24oY2hpbGQpe1xuICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShjaGlsZCkpO1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDpcIlBPU1RcIixcbiAgICB1cmw6XCIvY2hpbGRyZW5cIixcbiAgICBkYXRhOiBjaGlsZFxuICB9KVxufVxuXG50aGlzLmdldFJld2FyZHMgPSBmdW5jdGlvbihpZCl7XG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogXCJHZXRcIixcbiAgICAgIHVybDonL2NoaWxkcmV3YXJkcy8nICsgaWQsXG4gICAgfSkudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gIH0pXG59XG5cbiAgdGhpcy5yZXR1cm5UaGVtZSA9IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIHRoZW1lO1xuICB9XG4vLyB0aGlzLmdldERhaWx5Q2hvcmVzID0gZnVuY3Rpb24oaWQpe1xuLy8gICByZXR1cm4gJGh0dHAoe1xuLy8gICAgIG1ldGhvZDogXCJHZXRcIixcbi8vICAgICB1cmw6JycgKyBpZCxcbi8vICAgfSkudGhlbihmdW5jdGlvbihyZXMpIHtcbi8vICAgICAgIHJldHVybiByZXMuZGF0YTtcbi8vICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4vLyAgICAgIGNvbnNvbGUubG9nKGVycik7XG4vLyB9KVxuLy8gfVxuLy9cbi8vIHRoaXMuZ2V0V2Vla2x5Q2hvcmVzID0gZnVuY3Rpb24oaWQpe1xuLy8gICByZXR1cm4gJGh0dHAoe1xuLy8gICAgIG1ldGhvZDogXCJHZXRcIixcbi8vICAgICB1cmw6JycgKyBpZCxcbi8vICAgfSkudGhlbihmdW5jdGlvbihyZXMpIHtcbi8vICAgICAgIHJldHVybiByZXMuZGF0YTtcbi8vICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4vLyAgICAgIGNvbnNvbGUubG9nKGVycik7XG4vLyB9KVxuLy8gfVxuLy9cbi8vIHRoaXMuZ2V0U3BlY2lhbENob3JlcyA9IGZ1bmN0aW9uKGlkKXtcbi8vICAgcmV0dXJuICRodHRwKHtcbi8vICAgICBtZXRob2Q6IFwiR2V0XCIsXG4vLyAgICAgdXJsOicnICsgaWQsXG4vLyAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4vLyAgICAgICByZXR1cm4gcmVzLmRhdGE7XG4vLyAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuLy8gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuLy8gfSlcbi8vIH1cbiAgLy8gdGhpcy5jaGVja09mZmNob3JlID0gZnVuY3Rpb24oaWQpe1xuICAvLyAgIHJldHVybiAkaHR0cCh7XG4gIC8vICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gIC8vICAgICB1cmw6XG4gIC8vICAgfSlcbiAgLy8gfVxuXG59KTsvL2VuZCBvZiBzZXJ2aWNlXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiYWRkQ2hpbGRDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSx1c2VyU2VydmljZSwkc3RhdGUpe1xuICAvL2JhY2tidXR0b25cbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XG4gICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpXG4gIH1cbnZhciB1c2VyID0gdXNlclNlcnZpY2UuZ2V0VXNlckluZm8uc3ViO1xuY29uc29sZS5sb2codXNlcik7XG4kc2NvcGUuc3VibWl0Q2hpbGQgPSBmdW5jdGlvbihjaGlsZCl7XG4gIGNoaWxkLnVzZXJfaG91c2Vob2xkID0gdXNlci51c2VyX2hvdXNlaG9sZDtcbiAgY29uc29sZS5sb2coY2hpbGQpO1xuICB1c2VyU2VydmljZS5hZGRDaGlsZChjaGlsZClcbiAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAkc3RhdGUuZ28oJ2hvbWUnKTtcbiAgfSk7XG5cbn1cblxuXG5cblxuXG59KSAvL2VuZCBvZiBjb250cm9sbGVyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiYXNzaWduQ2hvcmVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSxjaG9yZVNlcnZpY2UsJHN0YXRlKXtcblxudmFyIGN1cnJlbnRVc2VyID0gY2hvcmVTZXJ2aWNlLmdldFVzZXJJbmZvLnN1YjtcblxuXG5jaG9yZVNlcnZpY2UuZ2V0Q2hpbGRyZW4oY3VycmVudFVzZXIudXNlcl9ob3VzZWhvbGQpXG4udGhlbihmdW5jdGlvbihyZXMpe1xuICAvLyAkc2NvcGUuY2hvcmVzID0gcmVzLmRhdGE7XG4gICRzY29wZS5jaGlsZHMgPSByZXMuZGF0YVxuICBjb25zb2xlLmxvZyhyZXMuZGF0YVswXSk7XG59KVxuXG5cblxuXG4kc2NvcGUuY2hvcmUgPSB7XG5jaG9yZV9kYWlseTogZmFsc2UsXG5jaG9yZV93ZWVrbHk6IGZhbHNlLFxuY2hvcmVfbW9udGhseTpmYWxzZVxufVxuXG4kc2NvcGUuc3VibWl0Q2hvcmUgPSBmdW5jdGlvbihjaG9yZSl7XG4gIGNob3JlLnVzZXJfaG91c2Vob2xkX2ZrID0gY3VycmVudFVzZXIudXNlcl9ob3VzZWhvbGQ7XG4gIGNvbnNvbGUubG9nKGNob3JlKVxuICAvLyBjaG9yZVNlcnZpY2UuY3JlYXRlQ2hvcmUoY2hvcmUpXG4gIC8vIC50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gIC8vXG4gIC8vIH0pXG59XG5cblxuXG5cblxuXG5cbn0pLy9lbmQgb2YgY29udHJvbGxlclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcignY2FtZXJhQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGNvcmRvdmFDYW1lcmEpIHtcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZGV2aWNlcmVhZHlcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgJGNvcmRvdmFQbHVnaW4uc29tZUZ1bmN0aW9uKCkudGhlbihzdWNjZXNzLCBlcnJvcik7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgLy8gT1Igd2l0aCBJT05JQ1xuXG4gICAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAkY29yZG92YVBsdWdpbi5zb21lRnVuY3Rpb24oKS50aGVuKHN1Y2Nlc3MsIGVycm9yKTtcbiAgICB9KTtcblxuICAkc2NvcGUudGFrZVBpY3R1cmUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIHF1YWxpdHk6IDUwLFxuICAgICAgZGVzdGluYXRpb25UeXBlOiBDYW1lcmEuRGVzdGluYXRpb25UeXBlLkRBVEFfVVJMLFxuICAgICAgc291cmNlVHlwZTogQ2FtZXJhLlBpY3R1cmVTb3VyY2VUeXBlLkNBTUVSQSxcbiAgICAgIGFsbG93RWRpdDogZmFsc2UsXG4gICAgICBlbmNvZGluZ1R5cGU6IENhbWVyYS5FbmNvZGluZ1R5cGUuSlBFRyxcbiAgICAgIHRhcmdldFdpZHRoOiAzMDAsXG4gICAgICB0YXJnZXRIZWlnaHQ6IDMwMCxcbiAgICAgIHBvcG92ZXJPcHRpb25zOiBDYW1lcmFQb3BvdmVyT3B0aW9ucyxcbiAgICAgIHNhdmVUb1Bob3RvQWxidW06IGZhbHNlLFxuXHQgICAgY29ycmVjdE9yaWVudGF0aW9uOnRydWVcbiAgICB9O1xuXG4gICAgJGNvcmRvdmFDYW1lcmEuZ2V0UGljdHVyZShvcHRpb25zKS50aGVuKGZ1bmN0aW9uKGltYWdlRGF0YSkge1xuICAgICAgJHNjb3BlLmltZ1VSSSA9IFwiZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCxcIiArIGltYWdlRGF0YTtcbiAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgIC8vIGVycm9yXG4gICAgfSk7XG5cbiAgfTtcbiAgfSwgZmFsc2UpO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImNoaWxkQmFua0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkYXV0aCwgdXNlclNlcnZpY2Upe1xuICB2YXIgdXNlclRva2VuID0gJGF1dGguZ2V0UGF5bG9hZCgpO1xuICAgdXNlclNlcnZpY2UuZ2V0VXNlckluZm8gPSB1c2VyVG9rZW47XG4gICAkc2NvcGUudXNlciA9IHVzZXJUb2tlbi5zdWI7XG4gICAkc2NvcGUudGhlbWUgPSAkc2NvcGUudXNlci51c2VyX3RoZW1lXG5cbiAgICRzY29wZS4kb24oJyRpb25pY1ZpZXcuYmVmb3JlRW50ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgIHZhciBnZXRUaGVtZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgJHNjb3BlLnRoZW1lID0gdXNlclNlcnZpY2UucmV0dXJuVGhlbWUoKVxuICAgICB9XG4gICAgIGlmKHVzZXJTZXJ2aWNlLnJldHVyblRoZW1lKCkpe1xuICAgICAgIGdldFRoZW1lKClcbiAgICAgfVxuICAgICAkc2NvcGUuc2V0VGhlbWUgPSBmdW5jdGlvbigpe1xuICAgICAgIGlmKCRzY29wZS50aGVtZSA9PT0gJ2Jhc2ViYWxsJyl7XG4gICAgICAgICAkc2NvcGUudGhlbWVJbWFnZSA9ICcuL2ltZy9pbWctYmFzZWJhbGwtdHJhbnMucG5nJ1xuICAgICAgIH1cbiAgICAgICBpZigkc2NvcGUudGhlbWUgPT09ICdjaGFybGllQnJvd24nKXtcbiAgICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL3Nub29weS5wbmcnXG4gICAgICAgfVxuICAgICAgIGlmKCRzY29wZS50aGVtZSA9PT0gJ3ByaW5jZXNzJyl7XG4gICAgICAgICAkc2NvcGUudGhlbWVJbWFnZSA9ICcuL2ltZy9Dcm93bl9QcmluY2Vzcy5wbmcnXG4gICAgICAgfVxuICAgICAgIGlmKCRzY29wZS50aGVtZSA9PT0gJ3N0YXJXYXJzJyl7XG4gICAgICAgICAkc2NvcGUudGhlbWVJbWFnZSA9ICcuL2ltZy9kZWF0aC1zdGFyLTJuZC1pY29uLnBuZydcbiAgICAgICB9XG4gICAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAnd2F0ZXInKXtcbiAgICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL1RyYW5zcGFyZW50X1dhdGVyX0Ryb3BfUE5HX1BpY3R1cmUucG5nJ1xuICAgICAgIH1cblxuICAgICB9XG4gICAgICRzY29wZS5zZXRUaGVtZSgpO1xuICB9KTtcblxuXG5cblxuXG4gICB2YXIgZ2V0UmV3YXJkcyA9IGZ1bmN0aW9uKCl7XG4gICAgIGlkID0gJHNjb3BlLnVzZXIudXNlcl9pZF9waztcbiAgICAgdXNlclNlcnZpY2UuZ2V0UmV3YXJkcyhpZCkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgJHNjb3BlLnJld2FyZHMgPSByZXNwb25zZTtcbiAgICAgfSlcbiAgIH1cbiAgIGdldFJld2FyZHMoKTtcblxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImNoaWxkSG9tZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCwgJGF1dGgsIHVzZXJTZXJ2aWNlKXtcbiAgLy8gJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSAgY2hpbGQgSG9tZSBjb250cm9sbGVyXCJcbiAgLy92YXIgdXNlclRva2VuID0gdXNlclNlcnZpY2UuZ2V0VXNlckluZm8uc3ViO1xuXG4gIHZhciB1c2VyVG9rZW4gPSAkYXV0aC5nZXRQYXlsb2FkKCk7XG4gIHVzZXJTZXJ2aWNlLmdldFVzZXJJbmZvID0gdXNlclRva2VuO1xuICAkc2NvcGUudXNlciA9IHVzZXJUb2tlbi5zdWI7XG5cbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCd0aGVtZU1vZGFsLmh0bWwnLCB7XG4gICAgIGlkOiAnMScsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsMSA9IG1vZGFsO1xuICAgfSk7XG5cbiAgIC8vIE1vZGFsIDJcbiAgLy8gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgndGFrZVBpY3R1cmVNb2RhbC5odG1sJywge1xuICAvLyAgICBpZDogJzInLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgLy8gICAgc2NvcGU6ICRzY29wZSxcbiAgLy8gICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAvLyAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgLy8gIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgLy8gICAgJHNjb3BlLm9Nb2RhbDIgPSBtb2RhbDtcbiAgLy8gIH0pO1xuICAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgIGlmIChpbmRleCA9PSAxKSAkc2NvcGUub01vZGFsMS5zaG93KCk7XG4gICAgIGVsc2UgJHNjb3BlLm9Nb2RhbDIuc2hvdygpO1xuICAgfTtcblxuICAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICBpZiAoaW5kZXggPT0gMSkgJHNjb3BlLm9Nb2RhbDEuaGlkZSgpO1xuICAgICBlbHNlICRzY29wZS5vTW9kYWwyLmhpZGUoKTtcbiAgIH07XG5cbiAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICRzY29wZS5vTW9kYWwxLnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsMi5yZW1vdmUoKTtcblxuICAgfSk7XG5cbiAgJHNjb3BlLnRoZW1lID0gJHNjb3BlLnVzZXIudXNlcl90aGVtZVxuICAkc2NvcGUuc2V0VGhlbWUgPSBmdW5jdGlvbihjaG9pY2Upe1xuICAgIHZhciBkYXRhID0ge31cbiAgICBkYXRhLnRoZW1lID0gY2hvaWNlXG4gICAgZGF0YS51c2VySWQgPSAkc2NvcGUudXNlci51c2VyX2lkX3BrO1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIHVzZXJTZXJ2aWNlLnNldFRoZW1lKGRhdGEpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgIGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKXtcbiAgICAgICRzY29wZS50aGVtZSA9IGNob2ljZVxuICAgICAgfVxuICB9KVxuICB9XG5cbiAgLy8gdmFyIGdldERhaWx5Q2hvcmVzID0gZnVuY3Rpb24oKXtcbiAgLy8gICBpZCA9ICRzY29wZS51c2VyLnVzZXJfaWRfcGtcbiAgLy8gICBjaG9yZVNlcnZpY2UuZ2V0RGFpbHlDaG9yZXMoaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAvLyAgICAgJHNjb3BlLmRhaWx5Q2hvcmVzID0gcmVzcG9uc2U7XG4gIC8vICAgfSlcbiAgLy8gfVxuICAvLyAgZ2V0RGFpbHlDaG9yZXMoKVxuICAvLyB2YXIgZ2V0V2Vla2x5Q2hvcmVzID0gZnVuY3Rpb24oKXtcbiAgLy8gICBpZCA9ICRzY29wZS51c2VyLnVzZXJfaWRfcGtcbiAgLy8gICBjaG9yZVNlcnZpY2UuZ2V0V2Vla2x5Q2hvcmVzKGlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgLy8gICAgICRzY29wZS53ZWVrbHlDaG9yZXMgPSByZXNwb25zZTtcbiAgLy8gICB9KVxuICAvLyB9XG4gIC8vIGdldFdlZWtseUNob3JlcygpXG4gIC8vIHZhciBnZXRTcGVjaWFsQ2hvcmVzID0gZnVuY3Rpb24oKXtcbiAgLy8gICBpZCA9ICRzY29wZS51c2VyLnVzZXJfaWRfcGtcbiAgLy8gICBjaG9yZVNlcnZpY2UuZ2V0U3BlY2lhbENob3JlcyhpZCkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gIC8vICAgICAkc2NvcGUuc3BlY2lhbENob3JlcyA9IHJlc3BvbnNlO1xuICAvLyAgIH0pXG4gIC8vIH1cbi8vICAgZ2V0U3BlY2lhbENob3JlcygpXG4gICAgICAvLyAkc2NvcGUuY2hlY2tPZmZjaG9yZSA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIC8vICAgdXNlclNlcnZpY2UuY2hlY2tPZmZjaG9yZShpZClcbiAgICAgIC8vIH1cblxufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiY2hpbGRMb2dpbkN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkYXV0aCwgJHN0YXRlLCBsb2dpblNlcnZpY2Upe1xuICAvLyAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBjaGlsZCBMb2dpbiBjb250cm9sbGVyXCJcblxuICAgJHNjb3BlLmxvZ2luQ2hpbGQgPSBmdW5jdGlvbih1c2VyKXtcbiAgICAgY29uc29sZS5sb2codXNlcilcbiAgICAgbG9naW5TZXJ2aWNlLnVzZXJMb2dpbih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAkYXV0aC5zZXRUb2tlbihyZXNwb25zZSlcbiAgICAgICAgICRzdGF0ZS5nbygnY2hpbGRIb21lJylcblxuICAgICB9KVxuICAgfVxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJlZGl0Q2hpbGRDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxuICB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiaGlzdG9yeUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gSGlzdG9yeSBjb250cm9sbGVyXCJcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJob21lQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsLHVzZXJTZXJ2aWNlLCR3aW5kb3csICRhdXRoKXtcbnZhciB1c2VyVG9rZW4gPSB1c2VyU2VydmljZS5nZXRVc2VySW5mby5zdWI7XG5jb25zb2xlLmxvZyh1c2VyVG9rZW4pO1xuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdiYW5uZXJNb2RhbC5odG1sJywge1xuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm1vZGFsID0gbW9kYWw7XG4gICB9KTtcbiAgICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAgJHNjb3BlLm1vZGFsLnNob3coKTtcbiAgIH07XG4gICAkc2NvcGUuc3VibWl0QmFubmVyID0gZnVuY3Rpb24oYmFubmVyKXtcbiAgICAgdmFyIGJhbm5lckluZm8gPSB7XG4gICAgICAgdXNlcl9ob3VzZWhvbGQ6dXNlclRva2VuLnVzZXJfaG91c2Vob2xkLFxuICAgICAgIHVzZXJfYmFubmVyX2ltYWdlOmJhbm5lclxuICAgICB9XG4gICAgICB1c2VyU2VydmljZS5wb3N0YmFubmVyKGJhbm5lckluZm8pXG4gICAgICAudGhlbihmdW5jdGlvbihyZXMpe1xuICAgICAkc2NvcGUubW9kYWwuaGlkZSgpO1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWwtYm94XCIpLnZhbHVlID0gJyc7XG4gICAgICAgICAgJHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQodHJ1ZSk7XG4gICAgIH0pO1xuICAgfTtcbiAgICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWwtYm94XCIpLnZhbHVlID0gJyc7XG4gICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gICB9O1xuICAgLy8gQ2xlYW51cCB0aGUgbW9kYWwgd2hlbiB3ZSdyZSBkb25lIHdpdGggaXQhXG4gICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAkc2NvcGUubW9kYWwucmVtb3ZlKCk7XG4gICB9KTtcbiAgIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIGhpZGUgbW9kYWxcbiAgICRzY29wZS4kb24oJ21vZGFsLmhpZGRlbicsIGZ1bmN0aW9uKCkge1xuICAgICAvLyBFeGVjdXRlIGFjdGlvblxuXG4gICB9KTtcbiAgIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIHJlbW92ZSBtb2RhbFxuICAgJHNjb3BlLiRvbignbW9kYWwucmVtb3ZlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAvLyBFeGVjdXRlIGFjdGlvblxuICAgfSk7XG5cbiRzY29wZS5ob3VzZWhvbGQgPSAgdXNlclRva2VuLnVzZXJfaG91c2Vob2xkO1xudXNlclNlcnZpY2UuZ2V0YmFubmVyKHVzZXJUb2tlbi51c2VyX2hvdXNlaG9sZCkudGhlbihmdW5jdGlvbihyZXMpe1xuY29uc29sZS5sb2cocmVzLmRhdGFbMF0udXNlcl9iYW5uZXJfaW1hZ2UpO1xuICAkc2NvcGUuYmFubmVyID0gcmVzLmRhdGFbMF0udXNlcl9iYW5uZXJfaW1hZ2U7XG59KTtcblxuY29uc29sZS5sb2codXNlclRva2VuLnppcCk7XG5cbnVzZXJTZXJ2aWNlLmdldFdlYXRoZXIodXNlclRva2VuLnppcClcbi50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbiAgJHNjb3BlLndlYXRoZXIgPSByZXMuZGF0YTtcbn0pXG5cblxufSkvL2VuZCBvZiBjb250cm9sbGVyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwibG9naW5DdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGF1dGgsICRzdGF0ZSwgbG9naW5TZXJ2aWNlKXtcblxuJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24odXNlcil7XG4gIC8vIGNvbnNvbGUubG9nKHVzZXIpXG4gIGxvZ2luU2VydmljZS51c2VyTG9naW4odXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgJGF1dGguc2V0VG9rZW4ocmVzcG9uc2UpXG4gICAgICAkc3RhdGUuZ28oJ2hvbWUnKVxuXG4gIH0pXG59XG4kc2NvcGUubWFrZVVzZXIgPSBmdW5jdGlvbihuZXdVc2VyKXtcbiAgbG9naW5TZXJ2aWNlLm1ha2VVc2VyKG5ld1VzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICRhdXRoLnNldFRva2VuKHJlc3BvbnNlKVxuICAgICAgJHN0YXRlLmdvKCdob21lJylcbiAgfSlcbn1cbiAgJHNjb3BlLmF1dGhlbnRpY2F0ZSA9IGZ1bmN0aW9uKHByb3ZpZGVyKSB7XG4gICRhdXRoLmF1dGhlbnRpY2F0ZShwcm92aWRlcil9O1xuICAvLyAkc2NvcGUudGVzdCA9IFwiSGVsbG8gZnJvbSBsb2dpbiBjb250cm9sbGVyXCJcblxuXG4gICRzY29wZS5yZXZlYWxlciA9IGZ1bmN0aW9uKCl7XG4gICRzY29wZS5oaWRlID0gISRzY29wZS5oaWRlO1xuIH1cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJtYWtlQ2hvcmVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxuICB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwic2V0UmV3YXJkc0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCl7XG4gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgncmV3YXJkTW9kYWwuaHRtbCcsIHtcbiAgICBzY29wZTogJHNjb3BlLFxuICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgJHNjb3BlLm1vZGFsID0gbW9kYWw7XG4gIH0pO1xuICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLnNob3coKTtcbiAgfTtcbiAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwuaGlkZSgpO1xuICB9O1xuICAvLyBDbGVhbnVwIHRoZSBtb2RhbCB3aGVuIHdlJ3JlIGRvbmUgd2l0aCBpdCFcbiAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwucmVtb3ZlKCk7XG4gIH0pO1xuICAvLyBFeGVjdXRlIGFjdGlvbiBvbiBoaWRlIG1vZGFsXG4gICRzY29wZS4kb24oJ21vZGFsLmhpZGRlbicsIGZ1bmN0aW9uKCkge1xuICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gIH0pO1xuICAvLyBFeGVjdXRlIGFjdGlvbiBvbiByZW1vdmUgbW9kYWxcbiAgJHNjb3BlLiRvbignbW9kYWwucmVtb3ZlZCcsIGZ1bmN0aW9uKCkge1xuICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gIH0pO1xuICAvL2JhY2tidXR0b25cbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XG4gICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpXG4gIH1cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJzZXR0aW5nc0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCl7XG4gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnY2hhbmdlUGFzc3dvcmQuaHRtbCcsIHtcbiAgICAgaWQ6ICcxJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWwxID0gbW9kYWw7XG4gICB9KTtcblxuICAgLy8gTW9kYWwgMlxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdjaGFuZ2VIb3VzZWhvbGQuaHRtbCcsIHtcbiAgICAgaWQ6ICcyJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWwyID0gbW9kYWw7XG4gICB9KTtcblxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdjaGFuZ2VaaXAuaHRtbCcsIHtcbiAgICAgaWQ6ICczJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWwzID0gbW9kYWw7XG4gICB9KTtcblxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdhZGRQYXJlbnQuaHRtbCcsIHtcbiAgICAgaWQ6ICc0JywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWw0ID0gbW9kYWw7XG4gICB9KTtcblxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdyZW1vdmVDaGlsZC5odG1sJywge1xuICAgICBpZDogJzUnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDUgPSBtb2RhbDtcbiAgIH0pO1xuXG5cblxuICAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgIGlmIChpbmRleCA9PSAxKSAkc2NvcGUub01vZGFsMS5zaG93KCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMikgJHNjb3BlLm9Nb2RhbDIuc2hvdygpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDMpICRzY29wZS5vTW9kYWwzLnNob3coKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSA0KSAkc2NvcGUub01vZGFsNC5zaG93KCk7XG4gICAgIGVsc2UgJHNjb3BlLm9Nb2RhbDUuc2hvdygpO1xuICAgfTtcblxuICAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICBpZiAoaW5kZXggPT0gMSkgJHNjb3BlLm9Nb2RhbDEuaGlkZSgpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDIpICRzY29wZS5vTW9kYWwyLmhpZGUoKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSAzKSAkc2NvcGUub01vZGFsMy5oaWRlKCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gNCkgJHNjb3BlLm9Nb2RhbDQuaGlkZSgpO1xuICAgICBlbHNlICRzY29wZS5vTW9kYWw1LmhpZGUoKTtcbiAgIH07XG5cbiAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICRzY29wZS5vTW9kYWwxLnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsMi5yZW1vdmUoKTtcbiAgICAgJHNjb3BlLm9Nb2RhbDMucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWw0LnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsNS5yZW1vdmUoKTtcbiAgIH0pO1xuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcInRyYWNrZXJDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwpe1xuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3BpY0NvbmZNb2RhbC5odG1sJywge1xuICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAkc2NvcGUubW9kYWwgPSBtb2RhbDtcbiAgfSk7XG4gICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwuc2hvdygpO1xuICB9O1xuICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gIH07XG4gIC8vIENsZWFudXAgdGhlIG1vZGFsIHdoZW4gd2UncmUgZG9uZSB3aXRoIGl0IVxuICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5yZW1vdmUoKTtcbiAgfSk7XG4gIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIGhpZGUgbW9kYWxcbiAgJHNjb3BlLiRvbignbW9kYWwuaGlkZGVuJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgfSk7XG4gIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIHJlbW92ZSBtb2RhbFxuICAkc2NvcGUuJG9uKCdtb2RhbC5yZW1vdmVkJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgfSk7XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwidXNlckluZm9DdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIGluZm8gY29udHJvbGxlclwiXG5cbn0pXG4iXX0=
