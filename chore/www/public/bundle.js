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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXJzL2FkZENoaWxkQ3RybC5qcyIsImNvbnRyb2xsZXJzL2Fzc2lnbkNob3JlQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NhbWVyYUN0cmwuanMiLCJjb250cm9sbGVycy9jaGlsZEJhbmtDdHJsLmpzIiwiY29udHJvbGxlcnMvY2hpbGRIb21lQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NoaWxkTG9naW5DdHJsLmpzIiwiY29udHJvbGxlcnMvZWRpdENoaWxkQ3RybC5qcyIsImNvbnRyb2xsZXJzL2hpc3RvcnlDdHJsLmpzIiwiY29udHJvbGxlcnMvaG9tZUN0cmwuanMiLCJjb250cm9sbGVycy9sb2dpbkN0cmwuanMiLCJjb250cm9sbGVycy9tYWtlQ2hvcmVDdHJsLmpzIiwiY29udHJvbGxlcnMvc2V0UmV3YXJkc0N0cmwuanMiLCJjb250cm9sbGVycy9zZXR0aW5nc0N0cmwuanMiLCJjb250cm9sbGVycy90cmFja2VyQ3RybC5qcyIsImNvbnRyb2xsZXJzL3VzZXJJbmZvQ3RybC5qcyIsInNlcnZpY2UvY2hvcmVTZXJ2aWNlLmpzIiwic2VydmljZS9sb2dpblNlcnZpY2UuanMiLCJzZXJ2aWNlL3VzZXJTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsIiR1cmxSb3V0ZXJQcm92aWRlciIsIiRhdXRoUHJvdmlkZXIiLCJvdGhlcndpc2UiLCJzdGF0ZSIsInVybCIsInRlbXBsYXRlVXJsIiwiY29udHJvbGxlciIsImZhY2Vib29rIiwiY2xpZW50SWQiLCJyZXNwb25zZVR5cGUiLCJnb29nbGUiLCJydW4iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5Iiwid2luZG93IiwiY29yZG92YSIsInBsdWdpbnMiLCJLZXlib2FyZCIsImhpZGVLZXlib2FyZEFjY2Vzc29yeUJhciIsImRpc2FibGVTY3JvbGwiLCJTdGF0dXNCYXIiLCJzdHlsZURlZmF1bHQiLCIkc2NvcGUiLCJ1c2VyU2VydmljZSIsIiRzdGF0ZSIsImdvYmFjayIsImhpc3RvcnkiLCJnbyIsInVzZXIiLCJnZXRVc2VySW5mbyIsInN1YiIsImNvbnNvbGUiLCJsb2ciLCJzdWJtaXRDaGlsZCIsImNoaWxkIiwidXNlcl9ob3VzZWhvbGQiLCJhZGRDaGlsZCIsInRoZW4iLCJyZXMiLCJjaG9yZVNlcnZpY2UiLCJjdXJyZW50VXNlciIsImdldENoaWxkcmVuIiwiY2hpbGRzIiwiZGF0YSIsImNob3JlIiwiY2hvcmVfZGFpbHkiLCJjaG9yZV93ZWVrbHkiLCJjaG9yZV9tb250aGx5Iiwic3VibWl0Q2hvcmUiLCJ1c2VyX2hvdXNlaG9sZF9mayIsIiRjb3Jkb3ZhQ2FtZXJhIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiJGNvcmRvdmFQbHVnaW4iLCJzb21lRnVuY3Rpb24iLCJzdWNjZXNzIiwiZXJyb3IiLCJ0YWtlUGljdHVyZSIsIm9wdGlvbnMiLCJxdWFsaXR5IiwiZGVzdGluYXRpb25UeXBlIiwiQ2FtZXJhIiwiRGVzdGluYXRpb25UeXBlIiwiREFUQV9VUkwiLCJzb3VyY2VUeXBlIiwiUGljdHVyZVNvdXJjZVR5cGUiLCJDQU1FUkEiLCJhbGxvd0VkaXQiLCJlbmNvZGluZ1R5cGUiLCJFbmNvZGluZ1R5cGUiLCJKUEVHIiwidGFyZ2V0V2lkdGgiLCJ0YXJnZXRIZWlnaHQiLCJwb3BvdmVyT3B0aW9ucyIsIkNhbWVyYVBvcG92ZXJPcHRpb25zIiwic2F2ZVRvUGhvdG9BbGJ1bSIsImNvcnJlY3RPcmllbnRhdGlvbiIsImdldFBpY3R1cmUiLCJpbWFnZURhdGEiLCJpbWdVUkkiLCJlcnIiLCIkYXV0aCIsInVzZXJUb2tlbiIsImdldFBheWxvYWQiLCJ0aGVtZSIsInVzZXJfdGhlbWUiLCIkb24iLCJnZXRUaGVtZSIsInJldHVyblRoZW1lIiwic2V0VGhlbWUiLCJ0aGVtZUltYWdlIiwiZ2V0UmV3YXJkcyIsImlkIiwidXNlcl9pZF9wayIsInJlc3BvbnNlIiwicmV3YXJkcyIsIiRpb25pY01vZGFsIiwiZnJvbVRlbXBsYXRlVXJsIiwic2NvcGUiLCJiYWNrZHJvcENsaWNrVG9DbG9zZSIsImFuaW1hdGlvbiIsIm1vZGFsIiwib01vZGFsMSIsIm9wZW5Nb2RhbCIsImluZGV4Iiwic2hvdyIsIm9Nb2RhbDIiLCJjbG9zZU1vZGFsIiwiaGlkZSIsInJlbW92ZSIsImNob2ljZSIsInVzZXJJZCIsInN0YXR1cyIsImxvZ2luU2VydmljZSIsImxvZ2luQ2hpbGQiLCJ1c2VyTG9naW4iLCJzZXRUb2tlbiIsInRlc3QiLCIkd2luZG93Iiwic3VibWl0QmFubmVyIiwiYmFubmVyIiwiYmFubmVySW5mbyIsInVzZXJfYmFubmVyX2ltYWdlIiwicG9zdGJhbm5lciIsImdldEVsZW1lbnRCeUlkIiwidmFsdWUiLCJsb2NhdGlvbiIsInJlbG9hZCIsImhvdXNlaG9sZCIsImdldGJhbm5lciIsInppcCIsImdldFdlYXRoZXIiLCJ3ZWF0aGVyIiwibG9naW4iLCJtYWtlVXNlciIsIm5ld1VzZXIiLCJhdXRoZW50aWNhdGUiLCJwcm92aWRlciIsInJldmVhbGVyIiwib01vZGFsMyIsIm9Nb2RhbDQiLCJvTW9kYWw1Iiwic2VydmljZSIsIiRodHRwIiwiJHEiLCJtZXRob2QiLCJjcmVhdGVDaG9yZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjYXRjaCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUFBLFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCLENBQUMsT0FBRCxFQUFVLFlBQVYsQ0FBeEIsRUFDQ0MsTUFERCxDQUNRLFVBQVNDLGNBQVQsRUFBeUJDLGtCQUF6QixFQUE2Q0MsYUFBN0MsRUFBMkQ7QUFDakVELHFCQUFtQkUsU0FBbkIsQ0FBNkIsUUFBN0I7QUFDQUgsaUJBQ0NJLEtBREQsQ0FDTyxVQURQLEVBQ2tCO0FBQ2hCQyxTQUFJLFdBRFk7QUFFaEJDLGlCQUFhLDJCQUZHO0FBR2hCQyxnQkFBWTtBQUhJLEdBRGxCLEVBTUNILEtBTkQsQ0FNTyxhQU5QLEVBTXFCO0FBQ25CQyxTQUFJ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QWFELE9BQUs1QyxRQUFMLEdBQWdCLFVBQVNGLEtBQVQsRUFBZTtBQUM3QkgsWUFBUUMsR0FBUixDQUFZbUgsS0FBS0MsU0FBTCxDQUFlbEgsS0FBZixDQUFaO0FBQ0EsV0FBTzZHLE1BQU07QUFDWEUsY0FBTyxNQURJO0FBRVg3SSxXQUFJLFdBRk87QUFHWHVDLFlBQU1UO0FBSEssS0FBTixDQUFQO0FBS0QsR0FQRDs7QUFTQSxPQUFLeUQsVUFBTCxHQUFrQixVQUFTQyxFQUFULEVBQVk7QUFDMUIsV0FBT21ELE1BQU07QUFDWEUsY0FBUSxLQURHO0FBRVg3SSxXQUFJLG1CQUFtQndGO0FBRlosS0FBTixFQUdKdkQsSUFISSxDQUdDLFVBQVNDLEdBQVQsRUFBYztBQUNsQixhQUFPQSxJQUFJSyxJQUFYO0FBQ0gsS0FMTSxFQUtKMEcsS0FMSSxDQUtFLFVBQVNyRSxHQUFULEVBQWM7QUFDcEJqRCxjQUFRQyxHQUFSLENBQVlnRCxHQUFaO0FBQ0osS0FQUSxDQUFQO0FBUUgsR0FURDs7QUFXRSxPQUFLUSxXQUFMLEdBQW1CLFlBQVU7QUFDM0IsV0FBT0osS0FBUDtBQUNELEdBRkQ7QUFHRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUQsQ0EvR0QsR0ErR0ciLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW9uaWMgU3RhcnRlciBBcHBcblxuLy8gYW5ndWxhci5tb2R1bGUgaXMgYSBnbG9iYWwgcGxhY2UgZm9yIGNyZWF0aW5nLCByZWdpc3RlcmluZyBhbmQgcmV0cmlldmluZyBBbmd1bGFyIG1vZHVsZXNcbi8vICdzdGFydGVyJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xuXG5hbmd1bGFyLm1vZHVsZSgnY2hvcmUnLCBbJ2lvbmljJywgJ3NhdGVsbGl6ZXInXSlcbi5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJGF1dGhQcm92aWRlcil7XG4gICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoXCIvbG9naW5cIik7XG4gICRzdGF0ZVByb3ZpZGVyXG4gIC5zdGF0ZSgnYWRkQ2hpbGQnLHtcbiAgICB1cmw6XCIvYWRkQ2hpbGRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9hZGRDaGlsZC5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJhZGRDaGlsZEN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2Fzc2lnbkNob3JlJyx7XG4gICAgdXJsOlwiL2Fzc2lnbkNob3JlXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvYXNzaWduQ2hvcmUuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiYXNzaWduQ2hvcmVDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdlZGl0Q2hpbGQnLHtcbiAgICB1cmw6XCIvZWRpdENoaWxkLzppZFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2VkaXRDaGlsZC5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJlZGl0Q2hpbGRDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdoaXN0b3J5Jyx7XG4gICAgdXJsOlwiL2hpc3RvcnlcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9oaXN0b3J5Lmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImhpc3RvcnlDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdob21lJyx7XG4gICAgdXJsOlwiL2hvbWVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9ob21lLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImhvbWVDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdsb2dpbicse1xuICAgIHVybDpcIi9sb2dpblwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL0xvZ2luLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImxvZ2luQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnbWFrZUNob3JlJyx7XG4gICAgdXJsOlwiL21ha2VDaG9yZVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL21ha2VDaG9yZS5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJtYWtlQ2hvcmVDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdzZXRSZXdhcmRzJyx7XG4gICAgdXJsOlwiL3NldFJld2FyZHMvOmlkXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvc2V0UmV3YXJkcy5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJzZXRSZXdhcmRzQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnc2V0dGluZ3MnLHtcbiAgICB1cmw6XCIvc2V0dGluZ3NcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9zZXR0aW5ncy5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJzZXR0aW5nc0N0cmxcIlxuICB9KVxuICAuc3RhdGUoJ3RyYWNrZXInLHtcbiAgICB1cmw6XCIvdHJhY2tlci86aWRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy90cmFja2VyLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcInRyYWNrZXJDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCd1c2VySW5mbycse1xuICAgIHVybDpcIi91c2VySW5mb1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL3VzZXJJbmZvLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcInVzZXJJbmZvQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnY2hpbGRCYW5rJyx7XG4gICAgdXJsOlwiL2NoaWxkL2JhbmtcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9jaGlsZEJhbmsuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRCYW5rQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnY2hpbGRIb21lJyx7XG4gICAgdXJsOlwiL2NoaWxkL2hvbWVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9jaGlsZEhvbWUuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRIb21lQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnY2hpbGRMb2dpbicse1xuICAgIHVybDpcIi9jaGlsZC9sb2dpblwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2NoaWxkTG9naW4uaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRMb2dpbkN0cmxcIlxuICB9KVxuXG4gICRhdXRoUHJvdmlkZXIuZmFjZWJvb2soe1xuICAgIGNsaWVudElkOiAnMzMyMjcyMDU3MTMyNjgxJ1xuICB9KTtcblxuICAvLyBPcHRpb25hbDogRm9yIGNsaWVudC1zaWRlIHVzZSAoSW1wbGljaXQgR3JhbnQpLCBzZXQgcmVzcG9uc2VUeXBlIHRvICd0b2tlbicgKGRlZmF1bHQ6ICdjb2RlJylcbiAgJGF1dGhQcm92aWRlci5mYWNlYm9vayh7XG4gICAgY2xpZW50SWQ6ICczMzIyNzIwNTcxMzI2ODEnLFxuICAgIHJlc3BvbnNlVHlwZTogJ3Rva2VuJ1xuICB9KTtcblxuICAkYXV0aFByb3ZpZGVyLmdvb2dsZSh7XG4gICAgY2xpZW50SWQ6ICcyNzUzNTI5NjA5NDYtNXJjYW4zcWtobHNjN201MGhldjVkbjJlMmNhZTltYnAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20nLFxuICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODEwMC8jL2xvZ2luLydcbiAgfSk7XG59KVxuXG5cblxuLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xuICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICBpZih3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuXG4gICAgICAvLyBEb24ndCByZW1vdmUgdGhpcyBsaW5lIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuIEl0IHN0b3BzIHRoZSB2aWV3cG9ydFxuICAgICAgLy8gZnJvbSBzbmFwcGluZyB3aGVuIHRleHQgaW5wdXRzIGFyZSBmb2N1c2VkLiBJb25pYyBoYW5kbGVzIHRoaXMgaW50ZXJuYWxseSBmb3JcbiAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgfVxuICAgIGlmKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcbiAgICB9XG4gIH0pO1xufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJhZGRDaGlsZEN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLHVzZXJTZXJ2aWNlLCRzdGF0ZSl7XG4gIC8vYmFja2J1dHRvblxuICAkc2NvcGUuZ29iYWNrID0gZnVuY3Rpb24oKXtcbiAgICB3aW5kb3cuaGlzdG9yeS5nbygtMSlcbiAgfVxudmFyIHVzZXIgPSB1c2VyU2VydmljZS5nZXRVc2VySW5mby5zdWI7XG5jb25zb2xlLmxvZyh1c2VyKTtcbiRzY29wZS5zdWJtaXRDaGlsZCA9IGZ1bmN0aW9uKGNoaWxkKXtcbiAgY2hpbGQudXNlcl9ob3VzZWhvbGQgPSB1c2VyLnVzZXJfaG91c2Vob2xkO1xuICBjb25zb2xlLmxvZyhjaGlsZCk7XG4gIHVzZXJTZXJ2aWNlLmFkZENoaWxkKGNoaWxkKVxuICAudGhlbihmdW5jdGlvbihyZXMpe1xuICAgICRzdGF0ZS5nbygnaG9tZScpO1xuICB9KTtcblxufVxuXG5cblxuXG5cbn0pIC8vZW5kIG9mIGNvbnRyb2xsZXJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJhc3NpZ25DaG9yZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLGNob3JlU2VydmljZSwkc3RhdGUpe1xuXG52YXIgY3VycmVudFVzZXIgPSBjaG9yZVNlcnZpY2UuZ2V0VXNlckluZm8uc3ViO1xuXG5cbmNob3JlU2VydmljZS5nZXRDaGlsZHJlbihjdXJyZW50VXNlci51c2VyX2hvdXNlaG9sZClcbi50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gIC8vICRzY29wZS5jaG9yZXMgPSByZXMuZGF0YTtcbiAgJHNjb3BlLmNoaWxkcyA9IHJlcy5kYXRhXG4gIGNvbnNvbGUubG9nKHJlcy5kYXRhWzBdKTtcbn0pXG5cblxuXG5cbiRzY29wZS5jaG9yZSA9IHtcbmNob3JlX2RhaWx5OiBmYWxzZSxcbmNob3JlX3dlZWtseTogZmFsc2UsXG5jaG9yZV9tb250aGx5OmZhbHNlXG59XG5cbiRzY29wZS5zdWJtaXRDaG9yZSA9IGZ1bmN0aW9uKGNob3JlKXtcbiAgY2hvcmUudXNlcl9ob3VzZWhvbGRfZmsgPSBjdXJyZW50VXNlci51c2VyX2hvdXNlaG9sZDtcbiAgY29uc29sZS5sb2coY2hvcmUpXG4gIC8vIGNob3JlU2VydmljZS5jcmVhdGVDaG9yZShjaG9yZSlcbiAgLy8gLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgLy9cbiAgLy8gfSlcbn1cblxuXG5cblxuXG5cblxufSkvL2VuZCBvZiBjb250cm9sbGVyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKCdjYW1lcmFDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkY29yZG92YUNhbWVyYSkge1xuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkZXZpY2VyZWFkeVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAkY29yZG92YVBsdWdpbi5zb21lRnVuY3Rpb24oKS50aGVuKHN1Y2Nlc3MsIGVycm9yKTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICAvLyBPUiB3aXRoIElPTklDXG5cbiAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICRjb3Jkb3ZhUGx1Z2luLnNvbWVGdW5jdGlvbigpLnRoZW4oc3VjY2VzcywgZXJyb3IpO1xuICAgIH0pO1xuXG4gICRzY29wZS50YWtlUGljdHVyZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgcXVhbGl0eTogNTAsXG4gICAgICBkZXN0aW5hdGlvblR5cGU6IENhbWVyYS5EZXN0aW5hdGlvblR5cGUuREFUQV9VUkwsXG4gICAgICBzb3VyY2VUeXBlOiBDYW1lcmEuUGljdHVyZVNvdXJjZVR5cGUuQ0FNRVJBLFxuICAgICAgYWxsb3dFZGl0OiBmYWxzZSxcbiAgICAgIGVuY29kaW5nVHlwZTogQ2FtZXJhLkVuY29kaW5nVHlwZS5KUEVHLFxuICAgICAgdGFyZ2V0V2lkdGg6IDMwMCxcbiAgICAgIHRhcmdldEhlaWdodDogMzAwLFxuICAgICAgcG9wb3Zlck9wdGlvbnM6IENhbWVyYVBvcG92ZXJPcHRpb25zLFxuICAgICAgc2F2ZVRvUGhvdG9BbGJ1bTogZmFsc2UsXG5cdCAgICBjb3JyZWN0T3JpZW50YXRpb246dHJ1ZVxuICAgIH07XG5cbiAgICAkY29yZG92YUNhbWVyYS5nZXRQaWN0dXJlKG9wdGlvbnMpLnRoZW4oZnVuY3Rpb24oaW1hZ2VEYXRhKSB7XG4gICAgICAkc2NvcGUuaW1nVVJJID0gXCJkYXRhOmltYWdlL2pwZWc7YmFzZTY0LFwiICsgaW1hZ2VEYXRhO1xuICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgLy8gZXJyb3JcbiAgICB9KTtcblxuICB9O1xuICB9LCBmYWxzZSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiY2hpbGRCYW5rQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRhdXRoLCB1c2VyU2VydmljZSl7XG4gIHZhciB1c2VyVG9rZW4gPSAkYXV0aC5nZXRQYXlsb2FkKCk7XG4gICB1c2VyU2VydmljZS5nZXRVc2VySW5mbyA9IHVzZXJUb2tlbjtcbiAgICRzY29wZS51c2VyID0gdXNlclRva2VuLnN1YjtcbiAgICRzY29wZS50aGVtZSA9ICRzY29wZS51c2VyLnVzZXJfdGhlbWVcblxuICAgJHNjb3BlLiRvbignJGlvbmljVmlldy5iZWZvcmVFbnRlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgdmFyIGdldFRoZW1lID0gZnVuY3Rpb24oKXtcbiAgICAgICAkc2NvcGUudGhlbWUgPSB1c2VyU2VydmljZS5yZXR1cm5UaGVtZSgpXG4gICAgIH1cbiAgICAgaWYodXNlclNlcnZpY2UucmV0dXJuVGhlbWUoKSl7XG4gICAgICAgZ2V0VGhlbWUoKVxuICAgICB9XG4gICAgICRzY29wZS5zZXRUaGVtZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAnYmFzZWJhbGwnKXtcbiAgICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL2ltZy1iYXNlYmFsbC10cmFucy5wbmcnXG4gICAgICAgfVxuICAgICAgIGlmKCRzY29wZS50aGVtZSA9PT0gJ2NoYXJsaWVCcm93bicpe1xuICAgICAgICAgJHNjb3BlLnRoZW1lSW1hZ2UgPSAnLi9pbWcvc25vb3B5LnBuZydcbiAgICAgICB9XG4gICAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAncHJpbmNlc3MnKXtcbiAgICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL0Nyb3duX1ByaW5jZXNzLnBuZydcbiAgICAgICB9XG4gICAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAnc3RhcldhcnMnKXtcbiAgICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL2RlYXRoLXN0YXItMm5kLWljb24ucG5nJ1xuICAgICAgIH1cbiAgICAgICBpZigkc2NvcGUudGhlbWUgPT09ICd3YXRlcicpe1xuICAgICAgICAgJHNjb3BlLnRoZW1lSW1hZ2UgPSAnLi9pbWcvVHJhbnNwYXJlbnRfV2F0ZXJfRHJvcF9QTkdfUGljdHVyZS5wbmcnXG4gICAgICAgfVxuXG4gICAgIH1cbiAgICAgJHNjb3BlLnNldFRoZW1lKCk7XG4gIH0pO1xuXG5cblxuXG5cbiAgIHZhciBnZXRSZXdhcmRzID0gZnVuY3Rpb24oKXtcbiAgICAgaWQgPSAkc2NvcGUudXNlci51c2VyX2lkX3BrO1xuICAgICB1c2VyU2VydmljZS5nZXRSZXdhcmRzKGlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAkc2NvcGUucmV3YXJkcyA9IHJlc3BvbnNlO1xuICAgICB9KVxuICAgfVxuICAgZ2V0UmV3YXJkcygpO1xuXG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiY2hpbGRIb21lQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsLCAkYXV0aCwgdXNlclNlcnZpY2Upe1xuICAvLyAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tICBjaGlsZCBIb21lIGNvbnRyb2xsZXJcIlxuICAvL3ZhciB1c2VyVG9rZW4gPSB1c2VyU2VydmljZS5nZXRVc2VySW5mby5zdWI7XG5cbiAgdmFyIHVzZXJUb2tlbiA9ICRhdXRoLmdldFBheWxvYWQoKTtcbiAgdXNlclNlcnZpY2UuZ2V0VXNlckluZm8gPSB1c2VyVG9rZW47XG4gICRzY29wZS51c2VyID0gdXNlclRva2VuLnN1YjtcblxuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3RoZW1lTW9kYWwuaHRtbCcsIHtcbiAgICAgaWQ6ICcxJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWwxID0gbW9kYWw7XG4gICB9KTtcblxuICAgLy8gTW9kYWwgMlxuICAvLyAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCd0YWtlUGljdHVyZU1vZGFsLmh0bWwnLCB7XG4gIC8vICAgIGlkOiAnMicsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAvLyAgICBzY29wZTogJHNjb3BlLFxuICAvLyAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gIC8vICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAvLyAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAvLyAgICAkc2NvcGUub01vZGFsMiA9IG1vZGFsO1xuICAvLyAgfSk7XG4gICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgaWYgKGluZGV4ID09IDEpICRzY29wZS5vTW9kYWwxLnNob3coKTtcbiAgICAgZWxzZSAkc2NvcGUub01vZGFsMi5zaG93KCk7XG4gICB9O1xuXG4gICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgIGlmIChpbmRleCA9PSAxKSAkc2NvcGUub01vZGFsMS5oaWRlKCk7XG4gICAgIGVsc2UgJHNjb3BlLm9Nb2RhbDIuaGlkZSgpO1xuICAgfTtcblxuICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDEucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWwyLnJlbW92ZSgpO1xuXG4gICB9KTtcblxuICAkc2NvcGUudGhlbWUgPSAkc2NvcGUudXNlci51c2VyX3RoZW1lXG4gICRzY29wZS5zZXRUaGVtZSA9IGZ1bmN0aW9uKGNob2ljZSl7XG4gICAgdmFyIGRhdGEgPSB7fVxuICAgIGRhdGEudGhlbWUgPSBjaG9pY2VcbiAgICBkYXRhLnVzZXJJZCA9ICRzY29wZS51c2VyLnVzZXJfaWRfcGs7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgdXNlclNlcnZpY2Uuc2V0VGhlbWUoZGF0YSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgaWYocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApe1xuICAgICAgJHNjb3BlLnRoZW1lID0gY2hvaWNlXG4gICAgICB9XG4gIH0pXG4gIH1cblxuICAvLyB2YXIgZ2V0RGFpbHlDaG9yZXMgPSBmdW5jdGlvbigpe1xuICAvLyAgIGlkID0gJHNjb3BlLnVzZXIudXNlcl9pZF9wa1xuICAvLyAgIGNob3JlU2VydmljZS5nZXREYWlseUNob3JlcyhpZCkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gIC8vICAgICAkc2NvcGUuZGFpbHlDaG9yZXMgPSByZXNwb25zZTtcbiAgLy8gICB9KVxuICAvLyB9XG4gIC8vICBnZXREYWlseUNob3JlcygpXG4gIC8vIHZhciBnZXRXZWVrbHlDaG9yZXMgPSBmdW5jdGlvbigpe1xuICAvLyAgIGlkID0gJHNjb3BlLnVzZXIudXNlcl9pZF9wa1xuICAvLyAgIGNob3JlU2VydmljZS5nZXRXZWVrbHlDaG9yZXMoaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAvLyAgICAgJHNjb3BlLndlZWtseUNob3JlcyA9IHJlc3BvbnNlO1xuICAvLyAgIH0pXG4gIC8vIH1cbiAgLy8gZ2V0V2Vla2x5Q2hvcmVzKClcbiAgLy8gdmFyIGdldFNwZWNpYWxDaG9yZXMgPSBmdW5jdGlvbigpe1xuICAvLyAgIGlkID0gJHNjb3BlLnVzZXIudXNlcl9pZF9wa1xuICAvLyAgIGNob3JlU2VydmljZS5nZXRTcGVjaWFsQ2hvcmVzKGlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgLy8gICAgICRzY29wZS5zcGVjaWFsQ2hvcmVzID0gcmVzcG9uc2U7XG4gIC8vICAgfSlcbiAgLy8gfVxuLy8gICBnZXRTcGVjaWFsQ2hvcmVzKClcbiAgICAgIC8vICRzY29wZS5jaGVja09mZmNob3JlID0gZnVuY3Rpb24oaWQpe1xuICAgICAgLy8gICB1c2VyU2VydmljZS5jaGVja09mZmNob3JlKGlkKVxuICAgICAgLy8gfVxuXG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJjaGlsZExvZ2luQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRhdXRoLCAkc3RhdGUsIGxvZ2luU2VydmljZSl7XG4gIC8vICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIGNoaWxkIExvZ2luIGNvbnRyb2xsZXJcIlxuXG4gICAkc2NvcGUubG9naW5DaGlsZCA9IGZ1bmN0aW9uKHVzZXIpe1xuICAgICBjb25zb2xlLmxvZyh1c2VyKVxuICAgICBsb2dpblNlcnZpY2UudXNlckxvZ2luKHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICRhdXRoLnNldFRva2VuKHJlc3BvbnNlKVxuICAgICAgICAgJHN0YXRlLmdvKCdjaGlsZEhvbWUnKVxuXG4gICAgIH0pXG4gICB9XG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImVkaXRDaGlsZEN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XG4gICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpXG4gIH1cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJoaXN0b3J5Q3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBIaXN0b3J5IGNvbnRyb2xsZXJcIlxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImhvbWVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwsdXNlclNlcnZpY2UsJHdpbmRvdywgJGF1dGgpe1xudmFyIHVzZXJUb2tlbiA9IHVzZXJTZXJ2aWNlLmdldFVzZXJJbmZvLnN1YjtcbmNvbnNvbGUubG9nKHVzZXJUb2tlbik7XG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2Jhbm5lck1vZGFsLmh0bWwnLCB7XG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUubW9kYWwgPSBtb2RhbDtcbiAgIH0pO1xuICAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICAkc2NvcGUubW9kYWwuc2hvdygpO1xuICAgfTtcbiAgICRzY29wZS5zdWJtaXRCYW5uZXIgPSBmdW5jdGlvbihiYW5uZXIpe1xuICAgICB2YXIgYmFubmVySW5mbyA9IHtcbiAgICAgICB1c2VyX2hvdXNlaG9sZDp1c2VyVG9rZW4udXNlcl9ob3VzZWhvbGQsXG4gICAgICAgdXNlcl9iYW5uZXJfaW1hZ2U6YmFubmVyXG4gICAgIH1cbiAgICAgIHVzZXJTZXJ2aWNlLnBvc3RiYW5uZXIoYmFubmVySW5mbylcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbC1ib3hcIikudmFsdWUgPSAnJztcbiAgICAgICAgICAkd2luZG93LmxvY2F0aW9uLnJlbG9hZCh0cnVlKTtcbiAgICAgfSk7XG4gICB9O1xuICAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbC1ib3hcIikudmFsdWUgPSAnJztcbiAgICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcbiAgIH07XG4gICAvLyBDbGVhbnVwIHRoZSBtb2RhbCB3aGVuIHdlJ3JlIGRvbmUgd2l0aCBpdCFcbiAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICRzY29wZS5tb2RhbC5yZW1vdmUoKTtcbiAgIH0pO1xuICAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gaGlkZSBtb2RhbFxuICAgJHNjb3BlLiRvbignbW9kYWwuaGlkZGVuJywgZnVuY3Rpb24oKSB7XG4gICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG5cbiAgIH0pO1xuICAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gcmVtb3ZlIG1vZGFsXG4gICAkc2NvcGUuJG9uKCdtb2RhbC5yZW1vdmVkJywgZnVuY3Rpb24oKSB7XG4gICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gICB9KTtcblxuJHNjb3BlLmhvdXNlaG9sZCA9ICB1c2VyVG9rZW4udXNlcl9ob3VzZWhvbGQ7XG51c2VyU2VydmljZS5nZXRiYW5uZXIodXNlclRva2VuLnVzZXJfaG91c2Vob2xkKS50aGVuKGZ1bmN0aW9uKHJlcyl7XG5jb25zb2xlLmxvZyhyZXMuZGF0YVswXS51c2VyX2Jhbm5lcl9pbWFnZSk7XG4gICRzY29wZS5iYW5uZXIgPSByZXMuZGF0YVswXS51c2VyX2Jhbm5lcl9pbWFnZTtcbn0pO1xuXG5jb25zb2xlLmxvZyh1c2VyVG9rZW4uemlwKTtcblxudXNlclNlcnZpY2UuZ2V0V2VhdGhlcih1c2VyVG9rZW4uemlwKVxuLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAkc2NvcGUud2VhdGhlciA9IHJlcy5kYXRhO1xufSlcblxuXG59KS8vZW5kIG9mIGNvbnRyb2xsZXJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJsb2dpbkN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkYXV0aCwgJHN0YXRlLCBsb2dpblNlcnZpY2Upe1xuXG4kc2NvcGUubG9naW4gPSBmdW5jdGlvbih1c2VyKXtcbiAgLy8gY29uc29sZS5sb2codXNlcilcbiAgbG9naW5TZXJ2aWNlLnVzZXJMb2dpbih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAkYXV0aC5zZXRUb2tlbihyZXNwb25zZSlcbiAgICAgICRzdGF0ZS5nbygnaG9tZScpXG5cbiAgfSlcbn1cbiRzY29wZS5tYWtlVXNlciA9IGZ1bmN0aW9uKG5ld1VzZXIpe1xuICBsb2dpblNlcnZpY2UubWFrZVVzZXIobmV3VXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgJGF1dGguc2V0VG9rZW4ocmVzcG9uc2UpXG4gICAgICAkc3RhdGUuZ28oJ2hvbWUnKVxuICB9KVxufVxuICAkc2NvcGUuYXV0aGVudGljYXRlID0gZnVuY3Rpb24ocHJvdmlkZXIpIHtcbiAgJGF1dGguYXV0aGVudGljYXRlKHByb3ZpZGVyKX07XG4gIC8vICRzY29wZS50ZXN0ID0gXCJIZWxsbyBmcm9tIGxvZ2luIGNvbnRyb2xsZXJcIlxuXG5cbiAgJHNjb3BlLnJldmVhbGVyID0gZnVuY3Rpb24oKXtcbiAgJHNjb3BlLmhpZGUgPSAhJHNjb3BlLmhpZGU7XG4gfVxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcIm1ha2VDaG9yZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XG4gICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpXG4gIH1cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJzZXRSZXdhcmRzQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsKXtcbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdyZXdhcmRNb2RhbC5odG1sJywge1xuICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAkc2NvcGUubW9kYWwgPSBtb2RhbDtcbiAgfSk7XG4gICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwuc2hvdygpO1xuICB9O1xuICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gIH07XG4gIC8vIENsZWFudXAgdGhlIG1vZGFsIHdoZW4gd2UncmUgZG9uZSB3aXRoIGl0IVxuICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5yZW1vdmUoKTtcbiAgfSk7XG4gIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIGhpZGUgbW9kYWxcbiAgJHNjb3BlLiRvbignbW9kYWwuaGlkZGVuJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgfSk7XG4gIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIHJlbW92ZSBtb2RhbFxuICAkc2NvcGUuJG9uKCdtb2RhbC5yZW1vdmVkJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgfSk7XG4gIC8vYmFja2J1dHRvblxuICAkc2NvcGUuZ29iYWNrID0gZnVuY3Rpb24oKXtcbiAgICB3aW5kb3cuaGlzdG9yeS5nbygtMSlcbiAgfVxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcInNldHRpbmdzQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsKXtcbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdjaGFuZ2VQYXNzd29yZC5odG1sJywge1xuICAgICBpZDogJzEnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDEgPSBtb2RhbDtcbiAgIH0pO1xuXG4gICAvLyBNb2RhbCAyXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2NoYW5nZUhvdXNlaG9sZC5odG1sJywge1xuICAgICBpZDogJzInLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDIgPSBtb2RhbDtcbiAgIH0pO1xuXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2NoYW5nZVppcC5odG1sJywge1xuICAgICBpZDogJzMnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDMgPSBtb2RhbDtcbiAgIH0pO1xuXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2FkZFBhcmVudC5odG1sJywge1xuICAgICBpZDogJzQnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDQgPSBtb2RhbDtcbiAgIH0pO1xuXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3JlbW92ZUNoaWxkLmh0bWwnLCB7XG4gICAgIGlkOiAnNScsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsNSA9IG1vZGFsO1xuICAgfSk7XG5cblxuXG4gICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgaWYgKGluZGV4ID09IDEpICRzY29wZS5vTW9kYWwxLnNob3coKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSAyKSAkc2NvcGUub01vZGFsMi5zaG93KCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMykgJHNjb3BlLm9Nb2RhbDMuc2hvdygpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDQpICRzY29wZS5vTW9kYWw0LnNob3coKTtcbiAgICAgZWxzZSAkc2NvcGUub01vZGFsNS5zaG93KCk7XG4gICB9O1xuXG4gICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgIGlmIChpbmRleCA9PSAxKSAkc2NvcGUub01vZGFsMS5oaWRlKCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMikgJHNjb3BlLm9Nb2RhbDIuaGlkZSgpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDMpICRzY29wZS5vTW9kYWwzLmhpZGUoKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSA0KSAkc2NvcGUub01vZGFsNC5oaWRlKCk7XG4gICAgIGVsc2UgJHNjb3BlLm9Nb2RhbDUuaGlkZSgpO1xuICAgfTtcblxuICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDEucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWwyLnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsMy5yZW1vdmUoKTtcbiAgICAgJHNjb3BlLm9Nb2RhbDQucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWw1LnJlbW92ZSgpO1xuICAgfSk7XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwidHJhY2tlckN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCl7XG4gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgncGljQ29uZk1vZGFsLmh0bWwnLCB7XG4gICAgc2NvcGU6ICRzY29wZSxcbiAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICRzY29wZS5tb2RhbCA9IG1vZGFsO1xuICB9KTtcbiAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5zaG93KCk7XG4gIH07XG4gICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcbiAgfTtcbiAgLy8gQ2xlYW51cCB0aGUgbW9kYWwgd2hlbiB3ZSdyZSBkb25lIHdpdGggaXQhXG4gICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuICB9KTtcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gaGlkZSBtb2RhbFxuICAkc2NvcGUuJG9uKCdtb2RhbC5oaWRkZW4nLCBmdW5jdGlvbigpIHtcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxuICB9KTtcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gcmVtb3ZlIG1vZGFsXG4gICRzY29wZS4kb24oJ21vZGFsLnJlbW92ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxuICB9KTtcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJ1c2VySW5mb0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gaW5mbyBjb250cm9sbGVyXCJcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLnNlcnZpY2UoXCJjaG9yZVNlcnZpY2VcIiwgZnVuY3Rpb24oJGh0dHAsJHEsJGF1dGgpe1xuXG50aGlzLmdldFVzZXJJbmZvID0gJGF1dGguZ2V0UGF5bG9hZCgpO1xuXG5cbnRoaXMuZ2V0Q2hpbGRyZW4gPSBmdW5jdGlvbihob3VzZWhvbGQpe1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDpcIkdFVFwiLFxuICAgIHVybDpcIi9jaGlsZHJlbi9cIiArIGhvdXNlaG9sZFxuICB9KVxufVxuXG50aGlzLmNyZWF0ZUNob3JlID0gZnVuY3Rpb24oY2hvcmUpe1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDpcIlBPU1RcIixcbiAgICB1cmw6XCIvYXNzaWduY2hvcmVcIixcbiAgICBkYXRhOmNob3JlXG4gIH0pXG59XG5cblxuXG5cbn0pLy9lbmQgb2Ygc2VydmljZVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuc2VydmljZSgnbG9naW5TZXJ2aWNlJywgZnVuY3Rpb24oJGh0dHApe1xuXG5cbiAgdGhpcy51c2VyTG9naW4gPSBmdW5jdGlvbih1c2VyKSB7XG4gICAgY29uc29sZS5sb2codXNlciwgXCJzZXJ2aWNlXCIpXG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB1cmw6ICcvYXV0aC9sb2dpbicsXG4gICAgICBkYXRhOiB1c2VyXG4gICAgfSlcbiAgfVxuICB0aGlzLm1ha2VVc2VyID0gZnVuY3Rpb24obmV3VXNlcikge1xuICAgIHJldHVybiAkaHR0cCh7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgdXJsOiAnL2F1dGgvc2lnbnVwJyxcbiAgICAgIGRhdGE6IG5ld1VzZXJcbiAgICB9KVxuICB9XG59KSAvLyBlbmQgb2Ygc2VydmljZVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuc2VydmljZSgndXNlclNlcnZpY2UnLCBmdW5jdGlvbigkaHR0cCwkcSwkYXV0aCl7XG5cbnZhciBiYW5uZXI7XG5cbnRoaXMuZ2V0VXNlckluZm87XG52YXIgdGhlbWU7XG5cblxudGhpcy5wb3N0YmFubmVyID0gZnVuY3Rpb24oYmFubmVyKXtcbiAgY29uc29sZS5sb2coYmFubmVyKTtcbiAgY29uc29sZS5sb2coYmFubmVyLnVzZXJfYmFubmVyX2ltYWdlKTtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgdXJsOlwiL2Jhbm5lci9cIiArIGJhbm5lci51c2VyX2hvdXNlaG9sZCxcbiAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7dXNlcl9iYW5uZXJfaW1hZ2U6YmFubmVyLnVzZXJfYmFubmVyX2ltYWdlfSlcbiAgfSlcbn1cblxudGhpcy5nZXRiYW5uZXIgPSBmdW5jdGlvbih1c2VySWQpe1xuICBjb25zb2xlLmxvZyh1c2VySWQpO1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6XCIvYmFubmVyL1wiICsgdXNlcklkXG4gIH0pXG59XG5cblxudGhpcy5nZXRXZWF0aGVyID0gZnVuY3Rpb24oKXtcbnJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIHVybDonaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPXppcD04NDAxMCZ1bml0cz1pbXBlcmlhbCZhcHBpZD1jMTBlZjk5YzVhZmRlZTNmZGZiYTc4ZThjOTgxYTliNidcbiAgfSlcblxufTtcblxuXG4gdGhpcy5zZXRUaGVtZSA9IGZ1bmN0aW9uKGRhdGEpe1xuICAgcmV0dXJuICRodHRwKHtcbiAgICAgbWV0aG9kOiAnUHV0JyxcbiAgICAgdXJsOlwiL3RoZW1lXCIsXG4gICAgIGRhdGE6IGRhdGFcbiAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgIHRoZW1lID0gcmVzLmRhdGFbMF0udXNlcl90aGVtZVxuICAgICAgIHJldHVybiByZXM7XG4gICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gfSlcbiB9XG5cbnRoaXMuYWRkQ2hpbGQgPSBmdW5jdGlvbihjaGlsZCl7XG4gIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGNoaWxkKSk7XG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOlwiUE9TVFwiLFxuICAgIHVybDpcIi9jaGlsZHJlblwiLFxuICAgIGRhdGE6IGNoaWxkXG4gIH0pXG59XG5cbnRoaXMuZ2V0UmV3YXJkcyA9IGZ1bmN0aW9uKGlkKXtcbiAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgbWV0aG9kOiBcIkdldFwiLFxuICAgICAgdXJsOicvY2hpbGRyZXdhcmRzLycgKyBpZCxcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICByZXR1cm4gcmVzLmRhdGE7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgfSlcbn1cblxuICB0aGlzLnJldHVyblRoZW1lID0gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gdGhlbWU7XG4gIH1cbi8vIHRoaXMuZ2V0RGFpbHlDaG9yZXMgPSBmdW5jdGlvbihpZCl7XG4vLyAgIHJldHVybiAkaHR0cCh7XG4vLyAgICAgbWV0aG9kOiBcIkdldFwiLFxuLy8gICAgIHVybDonJyArIGlkLFxuLy8gICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuLy8gICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuLy8gICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbi8vICAgICAgY29uc29sZS5sb2coZXJyKTtcbi8vIH0pXG4vLyB9XG4vL1xuLy8gdGhpcy5nZXRXZWVrbHlDaG9yZXMgPSBmdW5jdGlvbihpZCl7XG4vLyAgIHJldHVybiAkaHR0cCh7XG4vLyAgICAgbWV0aG9kOiBcIkdldFwiLFxuLy8gICAgIHVybDonJyArIGlkLFxuLy8gICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuLy8gICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuLy8gICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbi8vICAgICAgY29uc29sZS5sb2coZXJyKTtcbi8vIH0pXG4vLyB9XG4vL1xuLy8gdGhpcy5nZXRTcGVjaWFsQ2hvcmVzID0gZnVuY3Rpb24oaWQpe1xuLy8gICByZXR1cm4gJGh0dHAoe1xuLy8gICAgIG1ldGhvZDogXCJHZXRcIixcbi8vICAgICB1cmw6JycgKyBpZCxcbi8vICAgfSkudGhlbihmdW5jdGlvbihyZXMpIHtcbi8vICAgICAgIHJldHVybiByZXMuZGF0YTtcbi8vICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4vLyAgICAgIGNvbnNvbGUubG9nKGVycik7XG4vLyB9KVxuLy8gfVxuICAvLyB0aGlzLmNoZWNrT2ZmY2hvcmUgPSBmdW5jdGlvbihpZCl7XG4gIC8vICAgcmV0dXJuICRodHRwKHtcbiAgLy8gICAgIG1ldGhvZDogXCJQVVRcIixcbiAgLy8gICAgIHVybDpcbiAgLy8gICB9KVxuICAvLyB9XG5cbn0pOy8vZW5kIG9mIHNlcnZpY2VcbiJdfQ==
