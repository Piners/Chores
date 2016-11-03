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
    console.log(res.data);
  });

  $scope.values = [];

  $scope.chore = {
    chore_daily: false,
    chore_weekly: false,
    chore_monthly: false
  };

  $scope.submitChore = function (chore) {
    chore.user_household_fk = currentUser.user_household;
    console.log(chore);
    console.log($scope.values);
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

  var getDailyChores = function getDailyChores() {
    id = $scope.user.user_id_pk;
    userService.getDailyChores(id).then(function (response) {
      $scope.dailyChores = response;
    });
  };
  getDailyChores();
  var getWeeklyChores = function getWeeklyChores() {
    id = $scope.user.user_id_pk;
    userService.getWeeklyChores(id).then(function (response) {
      $scope.weeklyChores = response;
    });
  };
  getWeeklyChores();
  var getMonthlyChores = function getMonthlyChores() {
    id = $scope.user.user_id_pk;
    userService.getMonthlyChores(id).then(function (response) {
      console.log(response);
      $scope.monthlyChores = response;
    });
  };
  getMonthlyChores();

  $scope.revealer = function () {
    this.hide = !this.hide;
  };

  $scope.checkOffchore = function (id) {
    console.log(id);
    userService.checkOffchore(id).then(function (response) {
      console.log(response);
    });
  };
  // send a request to your server to perform server-side logout
  $http.post('/logout').succcess(function () {
    console.log('Successfully logged out');
  });;
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
  var userToken = $auth.getPayload();
  userService.getUserInfo = userToken;
  $scope.user = userToken.sub;
  $scope.banner = $scope.user_banner_image;

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
      user_household: user.user_household,
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

  $scope.household = $scope.user.user_household;
  userService.getbanner($scope.user.user_household).then(function (res) {
    console.log(res.data[0].user_banner_image);
    $scope.banner = res.data[0].user_banner_image;
  });

  console.log($scope.user.zip);

  userService.getWeather($scope.user.zip).then(function (res) {
    console.log(res.data);
    $scope.weather = res.data;
  });

  userService.showchild($scope.user.user_household).then(function (res) {
    console.log(res.data);
    $scope.showchild = res.data;
  });
  $auth.logout().then(function () {

    // send a request to your server to perform server-side logout
    $http.post('/logout').succcess(function () {
      console.log('Successfully logged out');
    });;
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

angular.module('chore').controller("settingsCtrl", function ($scope, $ionicModal, $auth) {
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

  // send a request to your server to perform server-side logout
  $http.post('/logout').succcess(function () {
    console.log('Successfully logged out');
  });;
});
"use strict";

angular.module('chore').controller("trackerCtrl", function ($scope, $ionicModal, $state, userService) {
  var getChild = function getChild() {
    userService.getChild($state.params.id).then(function (response) {
      console.log(response);
      $scope.child = response[0];
    });
  };
  getChild();

  // $ionicModal.fromTemplateUrl('picConfModal.html', {
  //   scope: $scope,
  //   animation: 'slide-in-up'
  // }).then(function(modal) {
  //   $scope.modal = modal;
  // });
  // $scope.openModal = function() {
  //   $scope.modal.show();
  // };
  // $scope.closeModal = function() {
  //   $scope.modal.hide();
  // };
  // // Cleanup the modal when we're done with it!
  // $scope.$on('$destroy', function() {
  //   $scope.modal.remove();
  // });
  // // Execute action on hide modal
  // $scope.$on('modal.hidden', function() {
  //   // Execute action
  // });
  // // Execute action on remove modal
  // $scope.$on('modal.removed', function() {
  //   // Execute action
  // });
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

  this.showchild = function (household) {
    return $http({
      method: "GET",
      url: "/children/" + household
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

  this.getDailyChores = function (id) {
    return $http({
      method: "Get",
      url: '/dailychore/' + id
    }).then(function (res) {
      return res.data;
    }).catch(function (err) {
      console.log(err);
    });
  };

  this.getWeeklyChores = function (id) {
    return $http({
      method: "Get",
      url: '/weeklychore/' + id
    }).then(function (res) {
      return res.data;
    }).catch(function (err) {
      console.log(err);
    });
  };

  this.getMonthlyChores = function (id) {
    return $http({
      method: "Get",
      url: '/monthlychore/' + id
    }).then(function (res) {
      return res.data;
    }).catch(function (err) {
      console.log(err);
    });
  };
  this.checkOffchore = function (id) {
    return $http({
      method: "PUT",
      url: '/completed/' + id
    }).then(function (res) {
      return res;
    }).catch(function (err) {
      console.log(err);
    });
  };
  this.getChild = function (id) {
    return $http({
      method: "Get",
      url: '/child/' + id
    }).then(function (res) {
      return res.data;
    });
  };
}); //end of service
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXJzL2FkZENoaWxkQ3RybC5qcyIsImNvbnRyb2xsZXJzL2Fzc2lnbkNob3JlQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NhbWVyYUN0cmwuanMiLCJjb250cm9sbGVycy9jaGlsZEJhbmtDdHJsLmpzIiwiY29udHJvbGxlcnMvY2hpbGRIb21lQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NoaWxkTG9naW5DdHJsLmpzIiwiY29udHJvbGxlcnMvZWRpdENoaWxkQ3RybC5qcyIsImNvbnRyb2xsZXJzL2hpc3RvcnlDdHJsLmpzIiwiY29udHJvbGxlcnMvaG9tZUN0cmwuanMiLCJjb250cm9sbGVycy9sb2dpbkN0cmwuanMiLCJjb250cm9sbGVycy9tYWtlQ2hvcmVDdHJsLmpzIiwiY29udHJvbGxlcnMvc2V0UmV3YXJkc0N0cmwuanMiLCJjb250cm9sbGVycy9zZXR0aW5nc0N0cmwuanMiLCJjb250cm9sbGVycy90cmFja2VyQ3RybC5qcyIsImNvbnRyb2xsZXJzL3VzZXJJbmZvQ3RybC5qcyIsInNlcnZpY2UvY2hvcmVTZXJ2aWNlLmpzIiwic2VydmljZS9sb2dpblNlcnZpY2UuanMiLCJzZXJ2aWNlL3VzZXJTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsIiR1cmxSb3V0ZXJQcm92aWRlciIsIiRhdXRoUHJvdmlkZXIiLCJvdGhlcndpc2UiLCJzdGF0ZSIsInVybCIsInRlbXBsYXRlVXJsIiwiY29udHJvbGxlciIsImZhY2Vib29rIiwiY2xpZW50SWQiLCJyZXNwb25zZVR5cGUiLCJnb29nbGUiLCJydW4iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5Iiwid2luZG93IiwiY29yZG92YSIsInBsdWdpbnMiLCJLZXlib2FyZCIsImhpZGVLZXlib2FyZEFjY2Vzc29yeUJhciIsImRpc2FibGVTY3JvbGwiLCJTdGF0dXNCYXIiLCJzdHlsZURlZmF1bHQiLCIkc2NvcGUiLCJ1c2VyU2VydmljZSIsIiRzdGF0ZSIsImdvYmFjayIsImhpc3RvcnkiLCJnbyIsInVzZXIiLCJnZXRVc2VySW5mbyIsInN1YiIsImNvbnNvbGUiLCJsb2ciLCJzdWJtaXRDaGlsZCIsImNoaWxkIiwidXNlcl9ob3VzZWhvbGQiLCJhZGRDaGlsZCIsInRoZW4iLCJyZXMiLCJjaG9yZVNlcnZpY2UiLCJjdXJyZW50VXNlciIsImdldENoaWxkcmVuIiwiY2hpbGRzIiwiZGF0YSIsInZhbHVlcyIsImNob3JlIiwiY2hvcmVfZGFpbHkiLCJjaG9yZV93ZWVrbHkiLCJjaG9yZV9tb250aGx5Iiwic3VibWl0Q2hvcmUiLCJ1c2VyX2hvdXNlaG9sZF9mayIsIiRjb3Jkb3ZhQ2FtZXJhIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiJGNvcmRvdmFQbHVnaW4iLCJzb21lRnVuY3Rpb24iLCJzdWNjZXNzIiwiZXJyb3IiLCJ0YWtlUGljdHVyZSIsIm9wdGlvbnMiLCJxdWFsaXR5IiwiZGVzdGluYXRpb25UeXBlIiwiQ2FtZXJhIiwiRGVzdGluYXRpb25UeXBlIiwiREFUQV9VUkwiLCJzb3VyY2VUeXBlIiwiUGljdHVyZVNvdXJjZVR5cGUiLCJDQU1FUkEiLCJhbGxvd0VkaXQiLCJlbmNvZGluZ1R5cGUiLCJFbmNvZGluZ1R5cGUiLCJKUEVHIiwidGFyZ2V0V2lkdGgiLCJ0YXJnZXRIZWlnaHQiLCJwb3BvdmVyT3B0aW9ucyIsIkNhbWVyYVBvcG92ZXJPcHRpb25zIiwic2F2ZVRvUGhvdG9BbGJ1bSIsImNvcnJlY3RPcmllbnRhdGlvbiIsImdldFBpY3R1cmUiLCJpbWFnZURhdGEiLCJpbWdVUkkiLCJlcnIiLCIkYXV0aCIsInVzZXJUb2tlbiIsImdldFBheWxvYWQiLCJ0aGVtZSIsInVzZXJfdGhlbWUiLCIkb24iLCJnZXRUaGVtZSIsInJldHVyblRoZW1lIiwic2V0VGhlbWUiLCJ0aGVtZUltYWdlIiwiZ2V0UmV3YXJkcyIsImlkIiwidXNlcl9pZF9wayIsInJlc3BvbnNlIiwicmV3YXJkcyIsIiRpb25pY01vZGFsIiwiZnJvbVRlbXBsYXRlVXJsIiwic2NvcGUiLCJiYWNrZHJvcENsaWNrVG9DbG9zZSIsImFuaW1hdGlvbiIsIm1vZGFsIiwib01vZGFsMSIsIm9wZW5Nb2RhbCIsImluZGV4Iiwic2hvdyIsIm9Nb2RhbDIiLCJjbG9zZU1vZGFsIiwiaGlkZSIsInJlbW92ZSIsImNob2ljZSIsInVzZXJJZCIsInN0YXR1cyIsImdldERhaWx5Q2hvcmVzIiwiZGFpbHlDaG9yZXMiLCJnZXRXZWVrbHlDaG9yZXMiLCJ3ZWVrbHlDaG9yZXMiLCJnZXRNb250aGx5Q2hvcmVzIiwibW9udGhseUNob3JlcyIsInJldmVhbGVyIiwiY2hlY2tPZmZjaG9yZSIsIiRodHRwIiwicG9zdCIsInN1Y2NjZXNzIiwibG9naW5TZXJ2aWNlIiwibG9naW5DaGlsZCIsInVzZXJMb2dpbiIsInNldFRva2VuIiwidGVzdCIsIiR3aW5kb3ciLCJiYW5uZXIiLCJ1c2VyX2Jhbm5lcl9pbWFnZSIsInN1Ym1pdEJhbm5lciIsImJhbm5lckluZm8iLCJwb3N0YmFubmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJ2YWx1ZSIsImxvY2F0aW9uIiwicmVsb2FkIiwiaG91c2Vob2xkIiwiZ2V0YmFubmVyIiwiemlwIiwiZ2V0V2VhdGhlciIsIndlYXRoZXIiLCJzaG93Y2hpbGQiLCJsb2dvdXQiLCJsb2dpbiIsIm1ha2VVc2VyIiwibmV3VXNlciIsImF1dGhlbnRpY2F0ZSIsInByb3ZpZGVyIiwib01vZGFsMyIsIm9Nb2RhbDQiLCJvTW9kYWw1IiwiZ2V0Q2hpbGQiLCJwYXJhbXMiLCJzZXJ2aWNlIiwiJHEiLCJtZXRob2QiLCJjcmVhdGVDaG9yZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjYXRjaCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUFBLFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCLENBQUMsT0FBRCxFQUFVLFlBQVYsQ0FBeEIsRUFDQ0MsTUFERCxDQUNRLFVBQVNDLGNBQVQsRUFBeUJDLGtCQUF6QixF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O0FBQ0osS0FQUSxDQUFQO0FBUUQsR0FURDs7QUFXQSxPQUFLcUMsZ0JBQUwsR0FBd0IsVUFBU3pCLEVBQVQsRUFBWTtBQUNsQyxXQUFPNkIsTUFBTTtBQUNYcUMsY0FBUSxLQURHO0FBRVgzSixXQUFJLG1CQUFtQnlGO0FBRlosS0FBTixFQUdKeEQsSUFISSxDQUdDLFVBQVNDLEdBQVQsRUFBYztBQUNsQixhQUFPQSxJQUFJSyxJQUFYO0FBQ0gsS0FMTSxFQUtKd0gsS0FMSSxDQUtFLFVBQVNsRixHQUFULEVBQWM7QUFDcEJsRCxjQUFRQyxHQUFSLENBQVlpRCxHQUFaO0FBQ0osS0FQUSxDQUFQO0FBUUQsR0FURDtBQVVDLE9BQUt3QyxhQUFMLEdBQXFCLFVBQVM1QixFQUFULEVBQVk7QUFDN0IsV0FBTzZCLE1BQU07QUFDWHFDLGNBQVEsS0FERztBQUVYM0osV0FBSSxnQkFBZ0J5RjtBQUZULEtBQU4sRUFHSnhELElBSEksQ0FHQyxVQUFTQyxHQUFULEVBQWE7QUFDbkIsYUFBT0EsR0FBUDtBQUNELEtBTE0sRUFLSjZILEtBTEksQ0FLRSxVQUFVbEYsR0FBVixFQUFjO0FBQ3JCbEQsY0FBUUMsR0FBUixDQUFZaUQsR0FBWjtBQUNELEtBUE0sQ0FBUDtBQVFELEdBVEg7QUFVRCxPQUFLMEUsUUFBTCxHQUFnQixVQUFTOUQsRUFBVCxFQUFZO0FBQzFCLFdBQU82QixNQUFNO0FBQ1hxQyxjQUFRLEtBREc7QUFFWDNKLFdBQUssWUFBV3lGO0FBRkwsS0FBTixFQUdKeEQsSUFISSxDQUdDLFVBQVNDLEdBQVQsRUFBYTtBQUNuQixhQUFPQSxJQUFJSyxJQUFYO0FBQ0QsS0FMTSxDQUFQO0FBTUQsR0FQRDtBQVNDLENBdElELEdBc0lHIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIElvbmljIFN0YXJ0ZXIgQXBwXG5cbi8vIGFuZ3VsYXIubW9kdWxlIGlzIGEgZ2xvYmFsIHBsYWNlIGZvciBjcmVhdGluZywgcmVnaXN0ZXJpbmcgYW5kIHJldHJpZXZpbmcgQW5ndWxhciBtb2R1bGVzXG4vLyAnc3RhcnRlcicgaXMgdGhlIG5hbWUgb2YgdGhpcyBhbmd1bGFyIG1vZHVsZSBleGFtcGxlIChhbHNvIHNldCBpbiBhIDxib2R5PiBhdHRyaWJ1dGUgaW4gaW5kZXguaHRtbClcbi8vIHRoZSAybmQgcGFyYW1ldGVyIGlzIGFuIGFycmF5IG9mICdyZXF1aXJlcydcblxuYW5ndWxhci5tb2R1bGUoJ2Nob3JlJywgWydpb25pYycsICdzYXRlbGxpemVyJ10pXG4uY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRhdXRoUHJvdmlkZXIpe1xuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKFwiL2xvZ2luXCIpO1xuICAkc3RhdGVQcm92aWRlclxuICAuc3RhdGUoJ2FkZENoaWxkJyx7XG4gICAgdXJsOlwiL2FkZENoaWxkXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvYWRkQ2hpbGQuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiYWRkQ2hpbGRDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdhc3NpZ25DaG9yZScse1xuICAgIHVybDpcIi9hc3NpZ25DaG9yZVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2Fzc2lnbkNob3JlLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImFzc2lnbkNob3JlQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnZWRpdENoaWxkJyx7XG4gICAgdXJsOlwiL2VkaXRDaGlsZC86aWRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9lZGl0Q2hpbGQuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiZWRpdENoaWxkQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnaGlzdG9yeScse1xuICAgIHVybDpcIi9oaXN0b3J5XCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvaGlzdG9yeS5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJoaXN0b3J5Q3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnaG9tZScse1xuICAgIHVybDpcIi9ob21lXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvaG9tZS5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJob21lQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnbG9naW4nLHtcbiAgICB1cmw6XCIvbG9naW5cIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9Mb2dpbi5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJsb2dpbkN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ21ha2VDaG9yZScse1xuICAgIHVybDpcIi9tYWtlQ2hvcmVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9tYWtlQ2hvcmUuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwibWFrZUNob3JlQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnc2V0UmV3YXJkcycse1xuICAgIHVybDpcIi9zZXRSZXdhcmRzLzppZFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL3NldFJld2FyZHMuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwic2V0UmV3YXJkc0N0cmxcIlxuICB9KVxuICAuc3RhdGUoJ3NldHRpbmdzJyx7XG4gICAgdXJsOlwiL3NldHRpbmdzXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvc2V0dGluZ3MuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwic2V0dGluZ3NDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCd0cmFja2VyJyx7XG4gICAgdXJsOlwiL3RyYWNrZXIvOmlkXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvdHJhY2tlci5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJ0cmFja2VyQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgndXNlckluZm8nLHtcbiAgICB1cmw6XCIvdXNlckluZm9cIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy91c2VySW5mby5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJ1c2VySW5mb0N0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2NoaWxkQmFuaycse1xuICAgIHVybDpcIi9jaGlsZC9iYW5rXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvY2hpbGRCYW5rLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImNoaWxkQmFua0N0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2NoaWxkSG9tZScse1xuICAgIHVybDpcIi9jaGlsZC9ob21lXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvY2hpbGRIb21lLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImNoaWxkSG9tZUN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2NoaWxkTG9naW4nLHtcbiAgICB1cmw6XCIvY2hpbGQvbG9naW5cIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9jaGlsZExvZ2luLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImNoaWxkTG9naW5DdHJsXCJcbiAgfSlcblxuICAkYXV0aFByb3ZpZGVyLmZhY2Vib29rKHtcbiAgICBjbGllbnRJZDogJzMzMjI3MjA1NzEzMjY4MSdcbiAgfSk7XG5cbiAgLy8gT3B0aW9uYWw6IEZvciBjbGllbnQtc2lkZSB1c2UgKEltcGxpY2l0IEdyYW50KSwgc2V0IHJlc3BvbnNlVHlwZSB0byAndG9rZW4nIChkZWZhdWx0OiAnY29kZScpXG4gICRhdXRoUHJvdmlkZXIuZmFjZWJvb2soe1xuICAgIGNsaWVudElkOiAnMzMyMjcyMDU3MTMyNjgxJyxcbiAgICByZXNwb25zZVR5cGU6ICd0b2tlbidcbiAgfSk7XG5cbiAgJGF1dGhQcm92aWRlci5nb29nbGUoe1xuICAgIGNsaWVudElkOiAnMjc1MzUyOTYwOTQ2LTVyY2FuM3FraGxzYzdtNTBoZXY1ZG4yZTJjYWU5bWJwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tJyxcbiAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxMDAvIy9sb2dpbi8nXG4gIH0pO1xufSlcblxuXG5cbi5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0pIHtcbiAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgaWYod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxuICAgICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcblxuICAgICAgLy8gRG9uJ3QgcmVtb3ZlIHRoaXMgbGluZSB1bmxlc3MgeW91IGtub3cgd2hhdCB5b3UgYXJlIGRvaW5nLiBJdCBzdG9wcyB0aGUgdmlld3BvcnRcbiAgICAgIC8vIGZyb20gc25hcHBpbmcgd2hlbiB0ZXh0IGlucHV0cyBhcmUgZm9jdXNlZC4gSW9uaWMgaGFuZGxlcyB0aGlzIGludGVybmFsbHkgZm9yXG4gICAgICAvLyBhIG11Y2ggbmljZXIga2V5Ym9hcmQgZXhwZXJpZW5jZS5cbiAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5kaXNhYmxlU2Nyb2xsKHRydWUpO1xuICAgIH1cbiAgICBpZih3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XG4gICAgfVxuICB9KTtcbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiYWRkQ2hpbGRDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSx1c2VyU2VydmljZSwkc3RhdGUpe1xuICAvL2JhY2tidXR0b25cbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XG4gICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpXG4gIH1cbnZhciB1c2VyID0gdXNlclNlcnZpY2UuZ2V0VXNlckluZm8uc3ViO1xuY29uc29sZS5sb2codXNlcik7XG4kc2NvcGUuc3VibWl0Q2hpbGQgPSBmdW5jdGlvbihjaGlsZCl7XG4gIGNoaWxkLnVzZXJfaG91c2Vob2xkID0gdXNlci51c2VyX2hvdXNlaG9sZDtcbiAgY29uc29sZS5sb2coY2hpbGQpO1xuICB1c2VyU2VydmljZS5hZGRDaGlsZChjaGlsZClcbiAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAkc3RhdGUuZ28oJ2hvbWUnKTtcbiAgfSk7XG5cbn1cblxuXG5cblxuXG59KSAvL2VuZCBvZiBjb250cm9sbGVyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiYXNzaWduQ2hvcmVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSxjaG9yZVNlcnZpY2UsJHN0YXRlKXtcblxudmFyIGN1cnJlbnRVc2VyID0gY2hvcmVTZXJ2aWNlLmdldFVzZXJJbmZvLnN1YjtcblxuXG5jaG9yZVNlcnZpY2UuZ2V0Q2hpbGRyZW4oY3VycmVudFVzZXIudXNlcl9ob3VzZWhvbGQpXG4udGhlbihmdW5jdGlvbihyZXMpe1xuICAvLyAkc2NvcGUuY2hvcmVzID0gcmVzLmRhdGE7XG4gICRzY29wZS5jaGlsZHMgPSByZXMuZGF0YVxuICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG59KVxuXG5cbiRzY29wZS52YWx1ZXMgPSBbXTtcblxuJHNjb3BlLmNob3JlID0ge1xuY2hvcmVfZGFpbHk6IGZhbHNlLFxuY2hvcmVfd2Vla2x5OiBmYWxzZSxcbmNob3JlX21vbnRobHk6ZmFsc2Vcbn1cblxuJHNjb3BlLnN1Ym1pdENob3JlID0gZnVuY3Rpb24oY2hvcmUpe1xuICBjaG9yZS51c2VyX2hvdXNlaG9sZF9mayA9IGN1cnJlbnRVc2VyLnVzZXJfaG91c2Vob2xkO1xuICBjb25zb2xlLmxvZyhjaG9yZSlcbiAgY29uc29sZS5sb2coJHNjb3BlLnZhbHVlcyk7XG4gIC8vIGNob3JlU2VydmljZS5jcmVhdGVDaG9yZShjaG9yZSlcbiAgLy8gLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgLy9cbiAgLy8gfSlcbn1cblxuXG5cblxuXG5cblxufSkvL2VuZCBvZiBjb250cm9sbGVyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKCdjYW1lcmFDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkY29yZG92YUNhbWVyYSkge1xuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkZXZpY2VyZWFkeVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAkY29yZG92YVBsdWdpbi5zb21lRnVuY3Rpb24oKS50aGVuKHN1Y2Nlc3MsIGVycm9yKTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICAvLyBPUiB3aXRoIElPTklDXG5cbiAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICRjb3Jkb3ZhUGx1Z2luLnNvbWVGdW5jdGlvbigpLnRoZW4oc3VjY2VzcywgZXJyb3IpO1xuICAgIH0pO1xuXG4gICRzY29wZS50YWtlUGljdHVyZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgcXVhbGl0eTogNTAsXG4gICAgICBkZXN0aW5hdGlvblR5cGU6IENhbWVyYS5EZXN0aW5hdGlvblR5cGUuREFUQV9VUkwsXG4gICAgICBzb3VyY2VUeXBlOiBDYW1lcmEuUGljdHVyZVNvdXJjZVR5cGUuQ0FNRVJBLFxuICAgICAgYWxsb3dFZGl0OiBmYWxzZSxcbiAgICAgIGVuY29kaW5nVHlwZTogQ2FtZXJhLkVuY29kaW5nVHlwZS5KUEVHLFxuICAgICAgdGFyZ2V0V2lkdGg6IDMwMCxcbiAgICAgIHRhcmdldEhlaWdodDogMzAwLFxuICAgICAgcG9wb3Zlck9wdGlvbnM6IENhbWVyYVBvcG92ZXJPcHRpb25zLFxuICAgICAgc2F2ZVRvUGhvdG9BbGJ1bTogZmFsc2UsXG5cdCAgICBjb3JyZWN0T3JpZW50YXRpb246dHJ1ZVxuICAgIH07XG5cbiAgICAkY29yZG92YUNhbWVyYS5nZXRQaWN0dXJlKG9wdGlvbnMpLnRoZW4oZnVuY3Rpb24oaW1hZ2VEYXRhKSB7XG4gICAgICAkc2NvcGUuaW1nVVJJID0gXCJkYXRhOmltYWdlL2pwZWc7YmFzZTY0LFwiICsgaW1hZ2VEYXRhO1xuICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgLy8gZXJyb3JcbiAgICB9KTtcblxuICB9O1xuICB9LCBmYWxzZSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiY2hpbGRCYW5rQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRhdXRoLCB1c2VyU2VydmljZSl7XG4gIHZhciB1c2VyVG9rZW4gPSAkYXV0aC5nZXRQYXlsb2FkKCk7XG4gICB1c2VyU2VydmljZS5nZXRVc2VySW5mbyA9IHVzZXJUb2tlbjtcbiAgICRzY29wZS51c2VyID0gdXNlclRva2VuLnN1YjtcbiAgICRzY29wZS50aGVtZSA9ICRzY29wZS51c2VyLnVzZXJfdGhlbWVcblxuICAgJHNjb3BlLiRvbignJGlvbmljVmlldy5iZWZvcmVFbnRlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgdmFyIGdldFRoZW1lID0gZnVuY3Rpb24oKXtcbiAgICAgICAkc2NvcGUudGhlbWUgPSB1c2VyU2VydmljZS5yZXR1cm5UaGVtZSgpXG4gICAgIH1cbiAgICAgaWYodXNlclNlcnZpY2UucmV0dXJuVGhlbWUoKSl7XG4gICAgICAgZ2V0VGhlbWUoKVxuICAgICB9XG4gICAgICRzY29wZS5zZXRUaGVtZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAnYmFzZWJhbGwnKXtcbiAgICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL2ltZy1iYXNlYmFsbC10cmFucy5wbmcnXG4gICAgICAgfVxuICAgICAgIGlmKCRzY29wZS50aGVtZSA9PT0gJ2NoYXJsaWVCcm93bicpe1xuICAgICAgICAgJHNjb3BlLnRoZW1lSW1hZ2UgPSAnLi9pbWcvc25vb3B5LnBuZydcbiAgICAgICB9XG4gICAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAncHJpbmNlc3MnKXtcbiAgICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL0Nyb3duX1ByaW5jZXNzLnBuZydcbiAgICAgICB9XG4gICAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAnc3RhcldhcnMnKXtcbiAgICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL2RlYXRoLXN0YXItMm5kLWljb24ucG5nJ1xuICAgICAgIH1cbiAgICAgICBpZigkc2NvcGUudGhlbWUgPT09ICd3YXRlcicpe1xuICAgICAgICAgJHNjb3BlLnRoZW1lSW1hZ2UgPSAnLi9pbWcvVHJhbnNwYXJlbnRfV2F0ZXJfRHJvcF9QTkdfUGljdHVyZS5wbmcnXG4gICAgICAgfVxuXG4gICAgIH1cbiAgICAgJHNjb3BlLnNldFRoZW1lKCk7XG4gIH0pO1xuXG5cblxuXG5cbiAgIHZhciBnZXRSZXdhcmRzID0gZnVuY3Rpb24oKXtcbiAgICAgaWQgPSAkc2NvcGUudXNlci51c2VyX2lkX3BrO1xuICAgICB1c2VyU2VydmljZS5nZXRSZXdhcmRzKGlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAkc2NvcGUucmV3YXJkcyA9IHJlc3BvbnNlO1xuICAgICB9KVxuICAgfVxuICAgZ2V0UmV3YXJkcygpO1xuXG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiY2hpbGRIb21lQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsLCAkYXV0aCwgdXNlclNlcnZpY2Upe1xuICAvLyAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tICBjaGlsZCBIb21lIGNvbnRyb2xsZXJcIlxuICAvL3ZhciB1c2VyVG9rZW4gPSB1c2VyU2VydmljZS5nZXRVc2VySW5mby5zdWI7XG5cbiAgdmFyIHVzZXJUb2tlbiA9ICRhdXRoLmdldFBheWxvYWQoKTtcbiAgdXNlclNlcnZpY2UuZ2V0VXNlckluZm8gPSB1c2VyVG9rZW47XG4gICRzY29wZS51c2VyID0gdXNlclRva2VuLnN1YjtcblxuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3RoZW1lTW9kYWwuaHRtbCcsIHtcbiAgICAgaWQ6ICcxJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWwxID0gbW9kYWw7XG4gICB9KTtcblxuICAgLy8gTW9kYWwgMlxuICAvLyAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCd0YWtlUGljdHVyZU1vZGFsLmh0bWwnLCB7XG4gIC8vICAgIGlkOiAnMicsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAvLyAgICBzY29wZTogJHNjb3BlLFxuICAvLyAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gIC8vICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAvLyAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAvLyAgICAkc2NvcGUub01vZGFsMiA9IG1vZGFsO1xuICAvLyAgfSk7XG4gICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgaWYgKGluZGV4ID09IDEpICRzY29wZS5vTW9kYWwxLnNob3coKTtcbiAgICAgZWxzZSAkc2NvcGUub01vZGFsMi5zaG93KCk7XG4gICB9O1xuXG4gICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgIGlmIChpbmRleCA9PSAxKSAkc2NvcGUub01vZGFsMS5oaWRlKCk7XG4gICAgIGVsc2UgJHNjb3BlLm9Nb2RhbDIuaGlkZSgpO1xuICAgfTtcblxuICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDEucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWwyLnJlbW92ZSgpO1xuXG4gICB9KTtcblxuICAkc2NvcGUudGhlbWUgPSAkc2NvcGUudXNlci51c2VyX3RoZW1lXG4gICRzY29wZS5zZXRUaGVtZSA9IGZ1bmN0aW9uKGNob2ljZSl7XG4gICAgdmFyIGRhdGEgPSB7fVxuICAgIGRhdGEudGhlbWUgPSBjaG9pY2VcbiAgICBkYXRhLnVzZXJJZCA9ICRzY29wZS51c2VyLnVzZXJfaWRfcGs7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgdXNlclNlcnZpY2Uuc2V0VGhlbWUoZGF0YSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgaWYocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApe1xuICAgICAgJHNjb3BlLnRoZW1lID0gY2hvaWNlXG4gICAgICB9XG4gIH0pXG4gIH1cblxuXG4gIHZhciBnZXREYWlseUNob3JlcyA9IGZ1bmN0aW9uKCl7XG4gICAgaWQgPSAkc2NvcGUudXNlci51c2VyX2lkX3BrXG4gICAgdXNlclNlcnZpY2UuZ2V0RGFpbHlDaG9yZXMoaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgJHNjb3BlLmRhaWx5Q2hvcmVzID0gcmVzcG9uc2U7XG4gICAgfSlcbiAgfVxuICAgZ2V0RGFpbHlDaG9yZXMoKVxuICB2YXIgZ2V0V2Vla2x5Q2hvcmVzID0gZnVuY3Rpb24oKXtcbiAgICBpZCA9ICRzY29wZS51c2VyLnVzZXJfaWRfcGtcbiAgICB1c2VyU2VydmljZS5nZXRXZWVrbHlDaG9yZXMoaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgJHNjb3BlLndlZWtseUNob3JlcyA9IHJlc3BvbnNlO1xuICAgIH0pXG4gIH1cbiAgZ2V0V2Vla2x5Q2hvcmVzKClcbiAgdmFyIGdldE1vbnRobHlDaG9yZXMgPSBmdW5jdGlvbigpe1xuICAgIGlkID0gJHNjb3BlLnVzZXIudXNlcl9pZF9wa1xuICAgIHVzZXJTZXJ2aWNlLmdldE1vbnRobHlDaG9yZXMoaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgJHNjb3BlLm1vbnRobHlDaG9yZXMgPSByZXNwb25zZTtcbiAgICB9KVxuICB9XG4gIGdldE1vbnRobHlDaG9yZXMoKVxuXG4gICRzY29wZS5yZXZlYWxlciA9IGZ1bmN0aW9uKCl7XG4gICB0aGlzLmhpZGUgPSAhdGhpcy5oaWRlO1xuICB9XG5cbiAgJHNjb3BlLmNoZWNrT2ZmY2hvcmUgPSBmdW5jdGlvbihpZCl7XG4gICAgY29uc29sZS5sb2coaWQpO1xuICAgIHVzZXJTZXJ2aWNlLmNoZWNrT2ZmY2hvcmUoaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgIH0pXG4gICB9XG4gICAvLyBzZW5kIGEgcmVxdWVzdCB0byB5b3VyIHNlcnZlciB0byBwZXJmb3JtIHNlcnZlci1zaWRlIGxvZ291dFxuICAgICRodHRwLnBvc3QoJy9sb2dvdXQnKS5zdWNjY2VzcyhmdW5jdGlvbigpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdTdWNjZXNzZnVsbHkgbG9nZ2VkIG91dCcpO1xuICAgIH0pOztcbn0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImNoaWxkTG9naW5DdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGF1dGgsICRzdGF0ZSwgbG9naW5TZXJ2aWNlKXtcbiAgLy8gICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gY2hpbGQgTG9naW4gY29udHJvbGxlclwiXG5cbiAgICRzY29wZS5sb2dpbkNoaWxkID0gZnVuY3Rpb24odXNlcil7XG4gICAgIGNvbnNvbGUubG9nKHVzZXIpXG4gICAgIGxvZ2luU2VydmljZS51c2VyTG9naW4odXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgJGF1dGguc2V0VG9rZW4ocmVzcG9uc2UpXG4gICAgICAgICAkc3RhdGUuZ28oJ2NoaWxkSG9tZScpXG5cbiAgICAgfSlcbiAgIH1cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiZWRpdENoaWxkQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAkc2NvcGUuZ29iYWNrID0gZnVuY3Rpb24oKXtcbiAgICB3aW5kb3cuaGlzdG9yeS5nbygtMSlcbiAgfVxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImhpc3RvcnlDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIEhpc3RvcnkgY29udHJvbGxlclwiXG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiaG9tZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCx1c2VyU2VydmljZSwkd2luZG93LCAkYXV0aCl7XG4gIHZhciB1c2VyVG9rZW4gPSAkYXV0aC5nZXRQYXlsb2FkKCk7XG4gIHVzZXJTZXJ2aWNlLmdldFVzZXJJbmZvID0gdXNlclRva2VuO1xuICAkc2NvcGUudXNlciA9IHVzZXJUb2tlbi5zdWI7XG4gICRzY29wZS5iYW5uZXIgPSAkc2NvcGUudXNlcl9iYW5uZXJfaW1hZ2U7XG5cbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnYmFubmVyTW9kYWwuaHRtbCcsIHtcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5tb2RhbCA9IG1vZGFsO1xuICAgfSk7XG4gICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgICRzY29wZS5tb2RhbC5zaG93KCk7XG4gICB9O1xuICAgJHNjb3BlLnN1Ym1pdEJhbm5lciA9IGZ1bmN0aW9uKGJhbm5lcil7XG4gICAgIHZhciBiYW5uZXJJbmZvID0ge1xuICAgICAgIHVzZXJfaG91c2Vob2xkOnVzZXIudXNlcl9ob3VzZWhvbGQsXG4gICAgICAgdXNlcl9iYW5uZXJfaW1hZ2U6YmFubmVyXG4gICAgIH1cbiAgICAgIHVzZXJTZXJ2aWNlLnBvc3RiYW5uZXIoYmFubmVySW5mbylcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbC1ib3hcIikudmFsdWUgPSAnJztcbiAgICAgICAgICAkd2luZG93LmxvY2F0aW9uLnJlbG9hZCh0cnVlKTtcbiAgICAgfSk7XG4gICB9O1xuICAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbC1ib3hcIikudmFsdWUgPSAnJztcbiAgICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcbiAgIH07XG4gICAvLyBDbGVhbnVwIHRoZSBtb2RhbCB3aGVuIHdlJ3JlIGRvbmUgd2l0aCBpdCFcbiAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICRzY29wZS5tb2RhbC5yZW1vdmUoKTtcbiAgIH0pO1xuICAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gaGlkZSBtb2RhbFxuICAgJHNjb3BlLiRvbignbW9kYWwuaGlkZGVuJywgZnVuY3Rpb24oKSB7XG4gICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG5cbiAgIH0pO1xuICAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gcmVtb3ZlIG1vZGFsXG4gICAkc2NvcGUuJG9uKCdtb2RhbC5yZW1vdmVkJywgZnVuY3Rpb24oKSB7XG4gICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gICB9KTtcblxuJHNjb3BlLmhvdXNlaG9sZCA9ICAkc2NvcGUudXNlci51c2VyX2hvdXNlaG9sZDtcbnVzZXJTZXJ2aWNlLmdldGJhbm5lcigkc2NvcGUudXNlci51c2VyX2hvdXNlaG9sZCkudGhlbihmdW5jdGlvbihyZXMpe1xuICBjb25zb2xlLmxvZyhyZXMuZGF0YVswXS51c2VyX2Jhbm5lcl9pbWFnZSk7XG4gICAgJHNjb3BlLmJhbm5lciA9IHJlcy5kYXRhWzBdLnVzZXJfYmFubmVyX2ltYWdlO1xufSk7XG5cbmNvbnNvbGUubG9nKCRzY29wZS51c2VyLnppcCk7XG5cbnVzZXJTZXJ2aWNlLmdldFdlYXRoZXIoJHNjb3BlLnVzZXIuemlwKVxuLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAkc2NvcGUud2VhdGhlciA9IHJlcy5kYXRhO1xufSlcblxuXG51c2VyU2VydmljZS5zaG93Y2hpbGQoJHNjb3BlLnVzZXIudXNlcl9ob3VzZWhvbGQpXG4udGhlbihmdW5jdGlvbihyZXMpe1xuICBjb25zb2xlLmxvZyhyZXMuZGF0YSlcbiAgJHNjb3BlLnNob3djaGlsZCA9IHJlcy5kYXRhO1xufSlcbiRhdXRoLmxvZ291dCgpLnRoZW4oZnVuY3Rpb24oKSB7XG5cbiAvLyBzZW5kIGEgcmVxdWVzdCB0byB5b3VyIHNlcnZlciB0byBwZXJmb3JtIHNlcnZlci1zaWRlIGxvZ291dFxuICAkaHR0cC5wb3N0KCcvbG9nb3V0Jykuc3VjY2Nlc3MoZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coJ1N1Y2Nlc3NmdWxseSBsb2dnZWQgb3V0Jyk7XG4gIH0pOztcblxufSk7XG5cblxufSkvL2VuZCBvZiBjb250cm9sbGVyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwibG9naW5DdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGF1dGgsICRzdGF0ZSwgbG9naW5TZXJ2aWNlKXtcblxuJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24odXNlcil7XG4gIC8vIGNvbnNvbGUubG9nKHVzZXIpXG4gIGxvZ2luU2VydmljZS51c2VyTG9naW4odXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgJGF1dGguc2V0VG9rZW4ocmVzcG9uc2UpXG4gICAgICAkc3RhdGUuZ28oJ2hvbWUnKVxuXG4gIH0pXG59XG4kc2NvcGUubWFrZVVzZXIgPSBmdW5jdGlvbihuZXdVc2VyKXtcbiAgbG9naW5TZXJ2aWNlLm1ha2VVc2VyKG5ld1VzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICRhdXRoLnNldFRva2VuKHJlc3BvbnNlKVxuICAgICAgJHN0YXRlLmdvKCdob21lJylcbiAgfSlcbn1cbiAgJHNjb3BlLmF1dGhlbnRpY2F0ZSA9IGZ1bmN0aW9uKHByb3ZpZGVyKSB7XG4gICRhdXRoLmF1dGhlbnRpY2F0ZShwcm92aWRlcil9O1xuICAvLyAkc2NvcGUudGVzdCA9IFwiSGVsbG8gZnJvbSBsb2dpbiBjb250cm9sbGVyXCJcblxuXG4gICRzY29wZS5yZXZlYWxlciA9IGZ1bmN0aW9uKCl7XG4gICRzY29wZS5oaWRlID0gISRzY29wZS5oaWRlO1xuIH1cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJtYWtlQ2hvcmVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxuICB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwic2V0UmV3YXJkc0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCl7XG4gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgncmV3YXJkTW9kYWwuaHRtbCcsIHtcbiAgICBzY29wZTogJHNjb3BlLFxuICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgJHNjb3BlLm1vZGFsID0gbW9kYWw7XG4gIH0pO1xuICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLnNob3coKTtcbiAgfTtcbiAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwuaGlkZSgpO1xuICB9O1xuICAvLyBDbGVhbnVwIHRoZSBtb2RhbCB3aGVuIHdlJ3JlIGRvbmUgd2l0aCBpdCFcbiAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwucmVtb3ZlKCk7XG4gIH0pO1xuICAvLyBFeGVjdXRlIGFjdGlvbiBvbiBoaWRlIG1vZGFsXG4gICRzY29wZS4kb24oJ21vZGFsLmhpZGRlbicsIGZ1bmN0aW9uKCkge1xuICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gIH0pO1xuICAvLyBFeGVjdXRlIGFjdGlvbiBvbiByZW1vdmUgbW9kYWxcbiAgJHNjb3BlLiRvbignbW9kYWwucmVtb3ZlZCcsIGZ1bmN0aW9uKCkge1xuICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gIH0pO1xuICAvL2JhY2tidXR0b25cbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XG4gICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpXG4gIH1cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJzZXR0aW5nc0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCwgJGF1dGgpe1xuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2NoYW5nZVBhc3N3b3JkLmh0bWwnLCB7XG4gICAgIGlkOiAnMScsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsMSA9IG1vZGFsO1xuICAgfSk7XG5cbiAgIC8vIE1vZGFsIDJcbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnY2hhbmdlSG91c2Vob2xkLmh0bWwnLCB7XG4gICAgIGlkOiAnMicsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsMiA9IG1vZGFsO1xuICAgfSk7XG5cbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnY2hhbmdlWmlwLmh0bWwnLCB7XG4gICAgIGlkOiAnMycsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsMyA9IG1vZGFsO1xuICAgfSk7XG5cbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnYWRkUGFyZW50Lmh0bWwnLCB7XG4gICAgIGlkOiAnNCcsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsNCA9IG1vZGFsO1xuICAgfSk7XG5cbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgncmVtb3ZlQ2hpbGQuaHRtbCcsIHtcbiAgICAgaWQ6ICc1JywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWw1ID0gbW9kYWw7XG4gICB9KTtcblxuXG5cbiAgICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICBpZiAoaW5kZXggPT0gMSkgJHNjb3BlLm9Nb2RhbDEuc2hvdygpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDIpICRzY29wZS5vTW9kYWwyLnNob3coKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSAzKSAkc2NvcGUub01vZGFsMy5zaG93KCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gNCkgJHNjb3BlLm9Nb2RhbDQuc2hvdygpO1xuICAgICBlbHNlICRzY29wZS5vTW9kYWw1LnNob3coKTtcbiAgIH07XG5cbiAgICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgaWYgKGluZGV4ID09IDEpICRzY29wZS5vTW9kYWwxLmhpZGUoKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSAyKSAkc2NvcGUub01vZGFsMi5oaWRlKCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMykgJHNjb3BlLm9Nb2RhbDMuaGlkZSgpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDQpICRzY29wZS5vTW9kYWw0LmhpZGUoKTtcbiAgICAgZWxzZSAkc2NvcGUub01vZGFsNS5oaWRlKCk7XG4gICB9O1xuXG4gICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAkc2NvcGUub01vZGFsMS5yZW1vdmUoKTtcbiAgICAgJHNjb3BlLm9Nb2RhbDIucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWwzLnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsNC5yZW1vdmUoKTtcbiAgICAgJHNjb3BlLm9Nb2RhbDUucmVtb3ZlKCk7XG4gICB9KTtcblxuICAgLy8gc2VuZCBhIHJlcXVlc3QgdG8geW91ciBzZXJ2ZXIgdG8gcGVyZm9ybSBzZXJ2ZXItc2lkZSBsb2dvdXRcbiAgICAkaHR0cC5wb3N0KCcvbG9nb3V0Jykuc3VjY2Nlc3MoZnVuY3Rpb24oKSB7XG4gICAgICBjb25zb2xlLmxvZygnU3VjY2Vzc2Z1bGx5IGxvZ2dlZCBvdXQnKTtcbiAgICB9KTs7XG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJ0cmFja2VyQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsLCAkc3RhdGUsIHVzZXJTZXJ2aWNlKXtcbiAgICB2YXIgZ2V0Q2hpbGQgPSBmdW5jdGlvbigpe1xuICAgICAgdXNlclNlcnZpY2UuZ2V0Q2hpbGQoJHN0YXRlLnBhcmFtcy5pZCkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgJHNjb3BlLmNoaWxkID0gcmVzcG9uc2VbMF1cbiAgICAgIH0pXG4gICAgfVxuICAgIGdldENoaWxkKClcblxuICAvLyAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3BpY0NvbmZNb2RhbC5odG1sJywge1xuICAvLyAgIHNjb3BlOiAkc2NvcGUsXG4gIC8vICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gIC8vIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgLy8gICAkc2NvcGUubW9kYWwgPSBtb2RhbDtcbiAgLy8gfSk7XG4gIC8vICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgLy8gICAkc2NvcGUubW9kYWwuc2hvdygpO1xuICAvLyB9O1xuICAvLyAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAvLyAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gIC8vIH07XG4gIC8vIC8vIENsZWFudXAgdGhlIG1vZGFsIHdoZW4gd2UncmUgZG9uZSB3aXRoIGl0IVxuICAvLyAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAvLyAgICRzY29wZS5tb2RhbC5yZW1vdmUoKTtcbiAgLy8gfSk7XG4gIC8vIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIGhpZGUgbW9kYWxcbiAgLy8gJHNjb3BlLiRvbignbW9kYWwuaGlkZGVuJywgZnVuY3Rpb24oKSB7XG4gIC8vICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgLy8gfSk7XG4gIC8vIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIHJlbW92ZSBtb2RhbFxuICAvLyAkc2NvcGUuJG9uKCdtb2RhbC5yZW1vdmVkJywgZnVuY3Rpb24oKSB7XG4gIC8vICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgLy8gfSk7XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwidXNlckluZm9DdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIGluZm8gY29udHJvbGxlclwiXG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5zZXJ2aWNlKFwiY2hvcmVTZXJ2aWNlXCIsIGZ1bmN0aW9uKCRodHRwLCRxLCRhdXRoKXtcblxudGhpcy5nZXRVc2VySW5mbyA9ICRhdXRoLmdldFBheWxvYWQoKTtcblxuXG50aGlzLmdldENoaWxkcmVuID0gZnVuY3Rpb24oaG91c2Vob2xkKXtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6XCJHRVRcIixcbiAgICB1cmw6XCIvY2hpbGRyZW4vXCIgKyBob3VzZWhvbGRcbiAgfSlcbn1cblxudGhpcy5jcmVhdGVDaG9yZSA9IGZ1bmN0aW9uKGNob3JlKXtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6XCJQT1NUXCIsXG4gICAgdXJsOlwiL2Fzc2lnbmNob3JlXCIsXG4gICAgZGF0YTpjaG9yZVxuICB9KVxufVxuXG5cblxuXG59KS8vZW5kIG9mIHNlcnZpY2VcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLnNlcnZpY2UoJ2xvZ2luU2VydmljZScsIGZ1bmN0aW9uKCRodHRwKXtcblxuXG4gIHRoaXMudXNlckxvZ2luID0gZnVuY3Rpb24odXNlcikge1xuICAgIGNvbnNvbGUubG9nKHVzZXIsIFwic2VydmljZVwiKVxuICAgIHJldHVybiAkaHR0cCh7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgdXJsOiAnL2F1dGgvbG9naW4nLFxuICAgICAgZGF0YTogdXNlclxuICAgIH0pXG4gIH1cbiAgdGhpcy5tYWtlVXNlciA9IGZ1bmN0aW9uKG5ld1VzZXIpIHtcbiAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIHVybDogJy9hdXRoL3NpZ251cCcsXG4gICAgICBkYXRhOiBuZXdVc2VyXG4gICAgfSlcbiAgfVxufSkgLy8gZW5kIG9mIHNlcnZpY2VcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLnNlcnZpY2UoJ3VzZXJTZXJ2aWNlJywgZnVuY3Rpb24oJGh0dHAsJHEsJGF1dGgpe1xuXG52YXIgYmFubmVyO1xuXG50aGlzLmdldFVzZXJJbmZvO1xudmFyIHRoZW1lO1xuXG5cbnRoaXMucG9zdGJhbm5lciA9IGZ1bmN0aW9uKGJhbm5lcil7XG4gIGNvbnNvbGUubG9nKGJhbm5lcik7XG4gIGNvbnNvbGUubG9nKGJhbm5lci51c2VyX2Jhbm5lcl9pbWFnZSk7XG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgIHVybDpcIi9iYW5uZXIvXCIgKyBiYW5uZXIudXNlcl9ob3VzZWhvbGQsXG4gICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe3VzZXJfYmFubmVyX2ltYWdlOmJhbm5lci51c2VyX2Jhbm5lcl9pbWFnZX0pXG4gIH0pXG59XG5cbnRoaXMuZ2V0YmFubmVyID0gZnVuY3Rpb24odXNlcklkKXtcbiAgY29uc29sZS5sb2codXNlcklkKTtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgdXJsOlwiL2Jhbm5lci9cIiArIHVzZXJJZFxuICB9KVxufVxuXG5cbnRoaXMuZ2V0V2VhdGhlciA9IGZ1bmN0aW9uKCl7XG5yZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6J2h0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT16aXA9ODQwMTAmdW5pdHM9aW1wZXJpYWwmYXBwaWQ9YzEwZWY5OWM1YWZkZWUzZmRmYmE3OGU4Yzk4MWE5YjYnXG4gIH0pXG5cbn07XG5cblxuIHRoaXMuc2V0VGhlbWUgPSBmdW5jdGlvbihkYXRhKXtcbiAgIHJldHVybiAkaHR0cCh7XG4gICAgIG1ldGhvZDogJ1B1dCcsXG4gICAgIHVybDpcIi90aGVtZVwiLFxuICAgICBkYXRhOiBkYXRhXG4gICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICB0aGVtZSA9IHJlcy5kYXRhWzBdLnVzZXJfdGhlbWVcbiAgICAgICByZXR1cm4gcmVzO1xuICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuIH0pXG4gfVxuXG50aGlzLmFkZENoaWxkID0gZnVuY3Rpb24oY2hpbGQpe1xuICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShjaGlsZCkpO1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDpcIlBPU1RcIixcbiAgICB1cmw6XCIvY2hpbGRyZW5cIixcbiAgICBkYXRhOiBjaGlsZFxuICB9KVxufVxuXG5cbnRoaXMuc2hvd2NoaWxkID0gZnVuY3Rpb24oaG91c2Vob2xkKXtcbnJldHVybiAkaHR0cCh7XG4gIG1ldGhvZDpcIkdFVFwiLFxuICB1cmw6XCIvY2hpbGRyZW4vXCIgKyBob3VzZWhvbGRcbn0pXG59XG5cbnRoaXMuZ2V0UmV3YXJkcyA9IGZ1bmN0aW9uKGlkKXtcbiAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgbWV0aG9kOiBcIkdldFwiLFxuICAgICAgdXJsOicvY2hpbGRyZXdhcmRzLycgKyBpZCxcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICByZXR1cm4gcmVzLmRhdGE7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgfSlcblxufVxuXG4gIHRoaXMucmV0dXJuVGhlbWUgPSBmdW5jdGlvbigpe1xuICAgIHJldHVybiB0aGVtZTtcbiAgfVxuXG5cbnRoaXMuZ2V0RGFpbHlDaG9yZXMgPSBmdW5jdGlvbihpZCl7XG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOiBcIkdldFwiLFxuICAgIHVybDonL2RhaWx5Y2hvcmUvJyArIGlkLFxuICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgY29uc29sZS5sb2coZXJyKTtcbn0pXG59XG5cbnRoaXMuZ2V0V2Vla2x5Q2hvcmVzID0gZnVuY3Rpb24oaWQpe1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDogXCJHZXRcIixcbiAgICB1cmw6Jy93ZWVrbHljaG9yZS8nICsgaWQsXG4gIH0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICByZXR1cm4gcmVzLmRhdGE7XG4gIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICBjb25zb2xlLmxvZyhlcnIpO1xufSlcbn1cblxudGhpcy5nZXRNb250aGx5Q2hvcmVzID0gZnVuY3Rpb24oaWQpe1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDogXCJHZXRcIixcbiAgICB1cmw6Jy9tb250aGx5Y2hvcmUvJyArIGlkLFxuICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgY29uc29sZS5sb2coZXJyKTtcbn0pXG59XG4gdGhpcy5jaGVja09mZmNob3JlID0gZnVuY3Rpb24oaWQpe1xuICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgICB1cmw6Jy9jb21wbGV0ZWQvJyArIGlkXG4gICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAgICByZXR1cm4gcmVzO1xuICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKXtcbiAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICB9KVxuICAgfVxudGhpcy5nZXRDaGlsZCA9IGZ1bmN0aW9uKGlkKXtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6IFwiR2V0XCIsXG4gICAgdXJsOiAnL2NoaWxkLycrIGlkXG4gIH0pLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICByZXR1cm4gcmVzLmRhdGFcbiAgfSlcbn1cblxufSk7Ly9lbmQgb2Ygc2VydmljZVxuIl19
