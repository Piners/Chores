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
"use strict";

angular.module('chore').controller("trackerCtrl", function ($scope, $ionicModal, $state, userService) {
  var getChild = function getChild() {
    userService.getChild($state.params.id).then(function (response) {
      console.log(response);
      $scope.child = response[0];
    });

    userService.getDailyChores($state.params.id).then(function (response) {
      console.log(response);
      $scope.dailychore = response;
    });

    userService.getWeeklyChores($state.params.id).then(function (response) {
      console.log(response);
      $scope.WeeklyChores = response;
    });

    userService.getMonthlyChores($state.params.id).then(function (response) {
      console.log(response);
      $scope.monthlyChores = response;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXJzL2FkZENoaWxkQ3RybC5qcyIsImNvbnRyb2xsZXJzL2Fzc2lnbkNob3JlQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NhbWVyYUN0cmwuanMiLCJjb250cm9sbGVycy9jaGlsZEJhbmtDdHJsLmpzIiwiY29udHJvbGxlcnMvY2hpbGRIb21lQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NoaWxkTG9naW5DdHJsLmpzIiwiY29udHJvbGxlcnMvZWRpdENoaWxkQ3RybC5qcyIsImNvbnRyb2xsZXJzL2hpc3RvcnlDdHJsLmpzIiwiY29udHJvbGxlcnMvaG9tZUN0cmwuanMiLCJjb250cm9sbGVycy9sb2dpbkN0cmwuanMiLCJjb250cm9sbGVycy9tYWtlQ2hvcmVDdHJsLmpzIiwiY29udHJvbGxlcnMvc2V0UmV3YXJkc0N0cmwuanMiLCJjb250cm9sbGVycy9zZXR0aW5nc0N0cmwuanMiLCJjb250cm9sbGVycy90cmFja2VyQ3RybC5qcyIsImNvbnRyb2xsZXJzL3VzZXJJbmZvQ3RybC5qcyIsInNlcnZpY2UvY2hvcmVTZXJ2aWNlLmpzIiwic2VydmljZS9sb2dpblNlcnZpY2UuanMiLCJzZXJ2aWNlL3VzZXJTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsIiR1cmxSb3V0ZXJQcm92aWRlciIsIiRhdXRoUHJvdmlkZXIiLCJvdGhlcndpc2UiLCJzdGF0ZSIsInVybCIsInRlbXBsYXRlVXJsIiwiY29udHJvbGxlciIsImZhY2Vib29rIiwiY2xpZW50SWQiLCJyZXNwb25zZVR5cGUiLCJnb29nbGUiLCJydW4iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5Iiwid2luZG93IiwiY29yZG92YSIsInBsdWdpbnMiLCJLZXlib2FyZCIsImhpZGVLZXlib2FyZEFjY2Vzc29yeUJhciIsImRpc2FibGVTY3JvbGwiLCJTdGF0dXNCYXIiLCJzdHlsZURlZmF1bHQiLCIkc2NvcGUiLCJ1c2VyU2VydmljZSIsIiRzdGF0ZSIsImdvYmFjayIsImhpc3RvcnkiLCJnbyIsInVzZXIiLCJnZXRVc2VySW5mbyIsInN1YiIsImNvbnNvbGUiLCJsb2ciLCJzdWJtaXRDaGlsZCIsImNoaWxkIiwidXNlcl9ob3VzZWhvbGQiLCJhZGRDaGlsZCIsInRoZW4iLCJyZXMiLCJjaG9yZVNlcnZpY2UiLCJjdXJyZW50VXNlciIsImdldENoaWxkcmVuIiwiY2hpbGRzIiwiZGF0YSIsInZhbHVlcyIsImNob3JlIiwiY2hvcmVfZGFpbHkiLCJjaG9yZV93ZWVrbHkiLCJjaG9yZV9tb250aGx5Iiwic3VibWl0Q2hvcmUiLCJ1c2VyX2hvdXNlaG9sZF9mayIsIiRjb3Jkb3ZhQ2FtZXJhIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiJGNvcmRvdmFQbHVnaW4iLCJzb21lRnVuY3Rpb24iLCJzdWNjZXNzIiwiZXJyb3IiLCJ0YWtlUGljdHVyZSIsIm9wdGlvbnMiLCJxdWFsaXR5IiwiZGVzdGluYXRpb25UeXBlIiwiQ2FtZXJhIiwiRGVzdGluYXRpb25UeXBlIiwiREFUQV9VUkwiLCJzb3VyY2VUeXBlIiwiUGljdHVyZVNvdXJjZVR5cGUiLCJDQU1FUkEiLCJhbGxvd0VkaXQiLCJlbmNvZGluZ1R5cGUiLCJFbmNvZGluZ1R5cGUiLCJKUEVHIiwidGFyZ2V0V2lkdGgiLCJ0YXJnZXRIZWlnaHQiLCJwb3BvdmVyT3B0aW9ucyIsIkNhbWVyYVBvcG92ZXJPcHRpb25zIiwic2F2ZVRvUGhvdG9BbGJ1bSIsImNvcnJlY3RPcmllbnRhdGlvbiIsImdldFBpY3R1cmUiLCJpbWFnZURhdGEiLCJpbWdVUkkiLCJlcnIiLCIkYXV0aCIsInVzZXJUb2tlbiIsImdldFBheWxvYWQiLCJ0aGVtZSIsInVzZXJfdGhlbWUiLCIkb24iLCJnZXRUaGVtZSIsInJldHVyblRoZW1lIiwic2V0VGhlbWUiLCJ0aGVtZUltYWdlIiwiZ2V0UmV3YXJkcyIsImlkIiwidXNlcl9pZF9wayIsInJlc3BvbnNlIiwicmV3YXJkcyIsIiRpb25pY01vZGFsIiwiZnJvbVRlbXBsYXRlVXJsIiwic2NvcGUiLCJiYWNrZHJvcENsaWNrVG9DbG9zZSIsImFuaW1hdGlvbiIsIm1vZGFsIiwib01vZGFsMSIsIm9wZW5Nb2RhbCIsImluZGV4Iiwic2hvdyIsIm9Nb2RhbDIiLCJjbG9zZU1vZGFsIiwiaGlkZSIsInJlbW92ZSIsImNob2ljZSIsInVzZXJJZCIsInN0YXR1cyIsImdldERhaWx5Q2hvcmVzIiwiZGFpbHlDaG9yZXMiLCJnZXRXZWVrbHlDaG9yZXMiLCJ3ZWVrbHlDaG9yZXMiLCJnZXRNb250aGx5Q2hvcmVzIiwibW9udGhseUNob3JlcyIsInJldmVhbGVyIiwiY2hlY2tPZmZjaG9yZSIsImxvZ2luU2VydmljZSIsImxvZ2luQ2hpbGQiLCJ1c2VyTG9naW4iLCJzZXRUb2tlbiIsInRlc3QiLCIkd2luZG93IiwiYmFubmVyIiwidXNlcl9iYW5uZXJfaW1hZ2UiLCJzdWJtaXRCYW5uZXIiLCJiYW5uZXJJbmZvIiwicG9zdGJhbm5lciIsImdldEVsZW1lbnRCeUlkIiwidmFsdWUiLCJsb2NhdGlvbiIsInJlbG9hZCIsImhvdXNlaG9sZCIsImdldGJhbm5lciIsInppcCIsImdldFdlYXRoZXIiLCJ3ZWF0aGVyIiwic2hvd2NoaWxkIiwibG9naW4iLCJtYWtlVXNlciIsIm5ld1VzZXIiLCJhdXRoZW50aWNhdGUiLCJwcm92aWRlciIsIm9Nb2RhbDMiLCJvTW9kYWw0Iiwib01vZGFsNSIsImdldENoaWxkIiwicGFyYW1zIiwiZGFpbHljaG9yZSIsIldlZWtseUNob3JlcyIsInNlcnZpY2UiLCIkaHR0cCIsIiRxIiwibWV0aG9kIiwiY3JlYXRlQ2hvcmUiLCJKU09OIiwic3RyaW5naWZ5IiwiY2F0Y2giXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBQSxRQUFRQyxNQUFSLENBQWUsT0FBZixFQUF3QixDQUFDLE9BQUQsRUFBVSxZQUFWLENBQXhCLEVBQ0NDLE1BREQsQ0FDUSxVQUFTQyxjQUFULEVBQXlCQyxrQkFBekIs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SW9uaWMgU3RhcnRlciBBcHBcblxuLy8gYW5ndWxhci5tb2R1bGUgaXMgYSBnbG9iYWwgcGxhY2UgZm9yIGNyZWF0aW5nLCByZWdpc3RlcmluZyBhbmQgcmV0cmlldmluZyBBbmd1bGFyIG1vZHVsZXNcbi8vICdzdGFydGVyJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xuXG5hbmd1bGFyLm1vZHVsZSgnY2hvcmUnLCBbJ2lvbmljJywgJ3NhdGVsbGl6ZXInXSlcbi5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJGF1dGhQcm92aWRlcil7XG4gICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoXCIvbG9naW5cIik7XG4gICRzdGF0ZVByb3ZpZGVyXG4gIC5zdGF0ZSgnYWRkQ2hpbGQnLHtcbiAgICB1cmw6XCIvYWRkQ2hpbGRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9hZGRDaGlsZC5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJhZGRDaGlsZEN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2Fzc2lnbkNob3JlJyx7XG4gICAgdXJsOlwiL2Fzc2lnbkNob3JlXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvYXNzaWduQ2hvcmUuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiYXNzaWduQ2hvcmVDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdlZGl0Q2hpbGQnLHtcbiAgICB1cmw6XCIvZWRpdENoaWxkLzppZFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2VkaXRDaGlsZC5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJlZGl0Q2hpbGRDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdoaXN0b3J5Jyx7XG4gICAgdXJsOlwiL2hpc3RvcnlcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9oaXN0b3J5Lmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImhpc3RvcnlDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdob21lJyx7XG4gICAgdXJsOlwiL2hvbWVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9ob21lLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImhvbWVDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdsb2dpbicse1xuICAgIHVybDpcIi9sb2dpblwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL0xvZ2luLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImxvZ2luQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnbWFrZUNob3JlJyx7XG4gICAgdXJsOlwiL21ha2VDaG9yZVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL21ha2VDaG9yZS5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJtYWtlQ2hvcmVDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdzZXRSZXdhcmRzJyx7XG4gICAgdXJsOlwiL3NldFJld2FyZHMvOmlkXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvc2V0UmV3YXJkcy5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJzZXRSZXdhcmRzQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnc2V0dGluZ3MnLHtcbiAgICB1cmw6XCIvc2V0dGluZ3NcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9zZXR0aW5ncy5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJzZXR0aW5nc0N0cmxcIlxuICB9KVxuICAuc3RhdGUoJ3RyYWNrZXInLHtcbiAgICB1cmw6XCIvdHJhY2tlci86aWRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy90cmFja2VyLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcInRyYWNrZXJDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCd1c2VySW5mbycse1xuICAgIHVybDpcIi91c2VySW5mb1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL3VzZXJJbmZvLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcInVzZXJJbmZvQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnY2hpbGRCYW5rJyx7XG4gICAgdXJsOlwiL2NoaWxkL2JhbmtcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9jaGlsZEJhbmsuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRCYW5rQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnY2hpbGRIb21lJyx7XG4gICAgdXJsOlwiL2NoaWxkL2hvbWVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9jaGlsZEhvbWUuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRIb21lQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnY2hpbGRMb2dpbicse1xuICAgIHVybDpcIi9jaGlsZC9sb2dpblwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2NoaWxkTG9naW4uaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRMb2dpbkN0cmxcIlxuICB9KVxuXG4gICRhdXRoUHJvdmlkZXIuZmFjZWJvb2soe1xuICAgIGNsaWVudElkOiAnMzMyMjcyMDU3MTMyNjgxJ1xuICB9KTtcblxuICAvLyBPcHRpb25hbDogRm9yIGNsaWVudC1zaWRlIHVzZSAoSW1wbGljaXQgR3JhbnQpLCBzZXQgcmVzcG9uc2VUeXBlIHRvICd0b2tlbicgKGRlZmF1bHQ6ICdjb2RlJylcbiAgJGF1dGhQcm92aWRlci5mYWNlYm9vayh7XG4gICAgY2xpZW50SWQ6ICczMzIyNzIwNTcxMzI2ODEnLFxuICAgIHJlc3BvbnNlVHlwZTogJ3Rva2VuJ1xuICB9KTtcblxuICAkYXV0aFByb3ZpZGVyLmdvb2dsZSh7XG4gICAgY2xpZW50SWQ6ICcyNzUzNTI5NjA5NDYtNXJjYW4zcWtobHNjN201MGhldjVkbjJlMmNhZTltYnAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20nLFxuICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODEwMC8jL2xvZ2luLydcbiAgfSk7XG59KVxuXG5cblxuLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xuICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICBpZih3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuXG4gICAgICAvLyBEb24ndCByZW1vdmUgdGhpcyBsaW5lIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuIEl0IHN0b3BzIHRoZSB2aWV3cG9ydFxuICAgICAgLy8gZnJvbSBzbmFwcGluZyB3aGVuIHRleHQgaW5wdXRzIGFyZSBmb2N1c2VkLiBJb25pYyBoYW5kbGVzIHRoaXMgaW50ZXJuYWxseSBmb3JcbiAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgfVxuICAgIGlmKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcbiAgICB9XG4gIH0pO1xufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJhZGRDaGlsZEN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLHVzZXJTZXJ2aWNlLCRzdGF0ZSl7XG4gIC8vYmFja2J1dHRvblxuICAkc2NvcGUuZ29iYWNrID0gZnVuY3Rpb24oKXtcbiAgICB3aW5kb3cuaGlzdG9yeS5nbygtMSlcbiAgfVxudmFyIHVzZXIgPSB1c2VyU2VydmljZS5nZXRVc2VySW5mby5zdWI7XG5jb25zb2xlLmxvZyh1c2VyKTtcbiRzY29wZS5zdWJtaXRDaGlsZCA9IGZ1bmN0aW9uKGNoaWxkKXtcbiAgY2hpbGQudXNlcl9ob3VzZWhvbGQgPSB1c2VyLnVzZXJfaG91c2Vob2xkO1xuICBjb25zb2xlLmxvZyhjaGlsZCk7XG4gIHVzZXJTZXJ2aWNlLmFkZENoaWxkKGNoaWxkKVxuICAudGhlbihmdW5jdGlvbihyZXMpe1xuICAgICRzdGF0ZS5nbygnaG9tZScpO1xuICB9KTtcblxufVxuXG5cblxuXG5cbn0pIC8vZW5kIG9mIGNvbnRyb2xsZXJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJhc3NpZ25DaG9yZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLGNob3JlU2VydmljZSwkc3RhdGUpe1xuXG52YXIgY3VycmVudFVzZXIgPSBjaG9yZVNlcnZpY2UuZ2V0VXNlckluZm8uc3ViO1xuXG5cbmNob3JlU2VydmljZS5nZXRDaGlsZHJlbihjdXJyZW50VXNlci51c2VyX2hvdXNlaG9sZClcbi50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gIC8vICRzY29wZS5jaG9yZXMgPSByZXMuZGF0YTtcbiAgJHNjb3BlLmNoaWxkcyA9IHJlcy5kYXRhXG4gIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbn0pXG5cblxuJHNjb3BlLnZhbHVlcyA9IFtdO1xuXG4kc2NvcGUuY2hvcmUgPSB7XG5jaG9yZV9kYWlseTogZmFsc2UsXG5jaG9yZV93ZWVrbHk6IGZhbHNlLFxuY2hvcmVfbW9udGhseTpmYWxzZVxufVxuXG4kc2NvcGUuc3VibWl0Q2hvcmUgPSBmdW5jdGlvbihjaG9yZSl7XG4gIGNob3JlLnVzZXJfaG91c2Vob2xkX2ZrID0gY3VycmVudFVzZXIudXNlcl9ob3VzZWhvbGQ7XG4gIGNvbnNvbGUubG9nKGNob3JlKVxuICBjb25zb2xlLmxvZygkc2NvcGUudmFsdWVzKTtcbiAgLy8gY2hvcmVTZXJ2aWNlLmNyZWF0ZUNob3JlKGNob3JlKVxuICAvLyAudGhlbihmdW5jdGlvbihyZXMpe1xuICAvL1xuICAvLyB9KVxufVxuXG5cblxuXG5cblxuXG59KS8vZW5kIG9mIGNvbnRyb2xsZXJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoJ2NhbWVyYUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRjb3Jkb3ZhQ2FtZXJhKSB7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRldmljZXJlYWR5XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICRjb3Jkb3ZhUGx1Z2luLnNvbWVGdW5jdGlvbigpLnRoZW4oc3VjY2VzcywgZXJyb3IpO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIC8vIE9SIHdpdGggSU9OSUNcblxuICAgICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgJGNvcmRvdmFQbHVnaW4uc29tZUZ1bmN0aW9uKCkudGhlbihzdWNjZXNzLCBlcnJvcik7XG4gICAgfSk7XG5cbiAgJHNjb3BlLnRha2VQaWN0dXJlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICBxdWFsaXR5OiA1MCxcbiAgICAgIGRlc3RpbmF0aW9uVHlwZTogQ2FtZXJhLkRlc3RpbmF0aW9uVHlwZS5EQVRBX1VSTCxcbiAgICAgIHNvdXJjZVR5cGU6IENhbWVyYS5QaWN0dXJlU291cmNlVHlwZS5DQU1FUkEsXG4gICAgICBhbGxvd0VkaXQ6IGZhbHNlLFxuICAgICAgZW5jb2RpbmdUeXBlOiBDYW1lcmEuRW5jb2RpbmdUeXBlLkpQRUcsXG4gICAgICB0YXJnZXRXaWR0aDogMzAwLFxuICAgICAgdGFyZ2V0SGVpZ2h0OiAzMDAsXG4gICAgICBwb3BvdmVyT3B0aW9uczogQ2FtZXJhUG9wb3Zlck9wdGlvbnMsXG4gICAgICBzYXZlVG9QaG90b0FsYnVtOiBmYWxzZSxcblx0ICAgIGNvcnJlY3RPcmllbnRhdGlvbjp0cnVlXG4gICAgfTtcblxuICAgICRjb3Jkb3ZhQ2FtZXJhLmdldFBpY3R1cmUob3B0aW9ucykudGhlbihmdW5jdGlvbihpbWFnZURhdGEpIHtcbiAgICAgICRzY29wZS5pbWdVUkkgPSBcImRhdGE6aW1hZ2UvanBlZztiYXNlNjQsXCIgKyBpbWFnZURhdGE7XG4gICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAvLyBlcnJvclxuICAgIH0pO1xuXG4gIH07XG4gIH0sIGZhbHNlKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJjaGlsZEJhbmtDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGF1dGgsIHVzZXJTZXJ2aWNlKXtcbiAgdmFyIHVzZXJUb2tlbiA9ICRhdXRoLmdldFBheWxvYWQoKTtcbiAgIHVzZXJTZXJ2aWNlLmdldFVzZXJJbmZvID0gdXNlclRva2VuO1xuICAgJHNjb3BlLnVzZXIgPSB1c2VyVG9rZW4uc3ViO1xuICAgJHNjb3BlLnRoZW1lID0gJHNjb3BlLnVzZXIudXNlcl90aGVtZVxuXG4gICAkc2NvcGUuJG9uKCckaW9uaWNWaWV3LmJlZm9yZUVudGVyJywgZnVuY3Rpb24gKCkge1xuICAgICB2YXIgZ2V0VGhlbWUgPSBmdW5jdGlvbigpe1xuICAgICAgICRzY29wZS50aGVtZSA9IHVzZXJTZXJ2aWNlLnJldHVyblRoZW1lKClcbiAgICAgfVxuICAgICBpZih1c2VyU2VydmljZS5yZXR1cm5UaGVtZSgpKXtcbiAgICAgICBnZXRUaGVtZSgpXG4gICAgIH1cbiAgICAgJHNjb3BlLnNldFRoZW1lID0gZnVuY3Rpb24oKXtcbiAgICAgICBpZigkc2NvcGUudGhlbWUgPT09ICdiYXNlYmFsbCcpe1xuICAgICAgICAgJHNjb3BlLnRoZW1lSW1hZ2UgPSAnLi9pbWcvaW1nLWJhc2ViYWxsLXRyYW5zLnBuZydcbiAgICAgICB9XG4gICAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAnY2hhcmxpZUJyb3duJyl7XG4gICAgICAgICAkc2NvcGUudGhlbWVJbWFnZSA9ICcuL2ltZy9zbm9vcHkucG5nJ1xuICAgICAgIH1cbiAgICAgICBpZigkc2NvcGUudGhlbWUgPT09ICdwcmluY2Vzcycpe1xuICAgICAgICAgJHNjb3BlLnRoZW1lSW1hZ2UgPSAnLi9pbWcvQ3Jvd25fUHJpbmNlc3MucG5nJ1xuICAgICAgIH1cbiAgICAgICBpZigkc2NvcGUudGhlbWUgPT09ICdzdGFyV2Fycycpe1xuICAgICAgICAgJHNjb3BlLnRoZW1lSW1hZ2UgPSAnLi9pbWcvZGVhdGgtc3Rhci0ybmQtaWNvbi5wbmcnXG4gICAgICAgfVxuICAgICAgIGlmKCRzY29wZS50aGVtZSA9PT0gJ3dhdGVyJyl7XG4gICAgICAgICAkc2NvcGUudGhlbWVJbWFnZSA9ICcuL2ltZy9UcmFuc3BhcmVudF9XYXRlcl9Ecm9wX1BOR19QaWN0dXJlLnBuZydcbiAgICAgICB9XG5cbiAgICAgfVxuICAgICAkc2NvcGUuc2V0VGhlbWUoKTtcbiAgfSk7XG5cblxuXG5cblxuICAgdmFyIGdldFJld2FyZHMgPSBmdW5jdGlvbigpe1xuICAgICBpZCA9ICRzY29wZS51c2VyLnVzZXJfaWRfcGs7XG4gICAgIHVzZXJTZXJ2aWNlLmdldFJld2FyZHMoaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICRzY29wZS5yZXdhcmRzID0gcmVzcG9uc2U7XG4gICAgIH0pXG4gICB9XG4gICBnZXRSZXdhcmRzKCk7XG5cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJjaGlsZEhvbWVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwsICRhdXRoLCB1c2VyU2VydmljZSl7XG4gIC8vICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gIGNoaWxkIEhvbWUgY29udHJvbGxlclwiXG4gIC8vdmFyIHVzZXJUb2tlbiA9IHVzZXJTZXJ2aWNlLmdldFVzZXJJbmZvLnN1YjtcblxuICB2YXIgdXNlclRva2VuID0gJGF1dGguZ2V0UGF5bG9hZCgpO1xuICB1c2VyU2VydmljZS5nZXRVc2VySW5mbyA9IHVzZXJUb2tlbjtcbiAgJHNjb3BlLnVzZXIgPSB1c2VyVG9rZW4uc3ViO1xuXG4gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgndGhlbWVNb2RhbC5odG1sJywge1xuICAgICBpZDogJzEnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDEgPSBtb2RhbDtcbiAgIH0pO1xuXG4gICAvLyBNb2RhbCAyXG4gIC8vICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3Rha2VQaWN0dXJlTW9kYWwuaHRtbCcsIHtcbiAgLy8gICAgaWQ6ICcyJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gIC8vICAgIHNjb3BlOiAkc2NvcGUsXG4gIC8vICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgLy8gICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gIC8vICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gIC8vICAgICRzY29wZS5vTW9kYWwyID0gbW9kYWw7XG4gIC8vICB9KTtcbiAgICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICBpZiAoaW5kZXggPT0gMSkgJHNjb3BlLm9Nb2RhbDEuc2hvdygpO1xuICAgICBlbHNlICRzY29wZS5vTW9kYWwyLnNob3coKTtcbiAgIH07XG5cbiAgICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgaWYgKGluZGV4ID09IDEpICRzY29wZS5vTW9kYWwxLmhpZGUoKTtcbiAgICAgZWxzZSAkc2NvcGUub01vZGFsMi5oaWRlKCk7XG4gICB9O1xuXG4gICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAkc2NvcGUub01vZGFsMS5yZW1vdmUoKTtcbiAgICAgJHNjb3BlLm9Nb2RhbDIucmVtb3ZlKCk7XG5cbiAgIH0pO1xuXG4gICRzY29wZS50aGVtZSA9ICRzY29wZS51c2VyLnVzZXJfdGhlbWVcbiAgJHNjb3BlLnNldFRoZW1lID0gZnVuY3Rpb24oY2hvaWNlKXtcbiAgICB2YXIgZGF0YSA9IHt9XG4gICAgZGF0YS50aGVtZSA9IGNob2ljZVxuICAgIGRhdGEudXNlcklkID0gJHNjb3BlLnVzZXIudXNlcl9pZF9waztcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICB1c2VyU2VydmljZS5zZXRUaGVtZShkYXRhKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICBpZihyZXNwb25zZS5zdGF0dXMgPT09IDIwMCl7XG4gICAgICAkc2NvcGUudGhlbWUgPSBjaG9pY2VcbiAgICAgIH1cbiAgfSlcbiAgfVxuXG5cbiAgdmFyIGdldERhaWx5Q2hvcmVzID0gZnVuY3Rpb24oKXtcbiAgICBpZCA9ICRzY29wZS51c2VyLnVzZXJfaWRfcGtcbiAgICB1c2VyU2VydmljZS5nZXREYWlseUNob3JlcyhpZCkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7IFxuICAgICAgJHNjb3BlLmRhaWx5Q2hvcmVzID0gcmVzcG9uc2U7XG4gICAgfSlcbiAgfVxuICAgZ2V0RGFpbHlDaG9yZXMoKVxuICB2YXIgZ2V0V2Vla2x5Q2hvcmVzID0gZnVuY3Rpb24oKXtcbiAgICBpZCA9ICRzY29wZS51c2VyLnVzZXJfaWRfcGtcbiAgICB1c2VyU2VydmljZS5nZXRXZWVrbHlDaG9yZXMoaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgJHNjb3BlLndlZWtseUNob3JlcyA9IHJlc3BvbnNlO1xuICAgIH0pXG4gIH1cbiAgZ2V0V2Vla2x5Q2hvcmVzKClcbiAgdmFyIGdldE1vbnRobHlDaG9yZXMgPSBmdW5jdGlvbigpe1xuICAgIGlkID0gJHNjb3BlLnVzZXIudXNlcl9pZF9wa1xuICAgIHVzZXJTZXJ2aWNlLmdldE1vbnRobHlDaG9yZXMoaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgJHNjb3BlLm1vbnRobHlDaG9yZXMgPSByZXNwb25zZTtcbiAgICB9KVxuICB9XG4gIGdldE1vbnRobHlDaG9yZXMoKVxuXG4gICRzY29wZS5yZXZlYWxlciA9IGZ1bmN0aW9uKCl7XG4gICB0aGlzLmhpZGUgPSAhdGhpcy5oaWRlO1xuICB9XG5cbiAgJHNjb3BlLmNoZWNrT2ZmY2hvcmUgPSBmdW5jdGlvbihpZCl7XG4gICAgY29uc29sZS5sb2coaWQpO1xuICAgIHVzZXJTZXJ2aWNlLmNoZWNrT2ZmY2hvcmUoaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgIH0pXG4gICB9XG5cblxufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiY2hpbGRMb2dpbkN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkYXV0aCwgJHN0YXRlLCBsb2dpblNlcnZpY2Upe1xuICAvLyAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBjaGlsZCBMb2dpbiBjb250cm9sbGVyXCJcblxuICAgJHNjb3BlLmxvZ2luQ2hpbGQgPSBmdW5jdGlvbih1c2VyKXtcbiAgICAgY29uc29sZS5sb2codXNlcilcbiAgICAgbG9naW5TZXJ2aWNlLnVzZXJMb2dpbih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAkYXV0aC5zZXRUb2tlbihyZXNwb25zZSlcbiAgICAgICAgICRzdGF0ZS5nbygnY2hpbGRIb21lJylcblxuICAgICB9KVxuICAgfVxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJlZGl0Q2hpbGRDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxuICB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiaGlzdG9yeUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gSGlzdG9yeSBjb250cm9sbGVyXCJcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJob21lQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsLHVzZXJTZXJ2aWNlLCR3aW5kb3csICRhdXRoKXtcbiAgdmFyIHVzZXJUb2tlbiA9ICRhdXRoLmdldFBheWxvYWQoKTtcbiAgdXNlclNlcnZpY2UuZ2V0VXNlckluZm8gPSB1c2VyVG9rZW47XG4gICRzY29wZS51c2VyID0gdXNlclRva2VuLnN1YjtcbiAgJHNjb3BlLmJhbm5lciA9ICRzY29wZS51c2VyX2Jhbm5lcl9pbWFnZTtcblxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdiYW5uZXJNb2RhbC5odG1sJywge1xuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm1vZGFsID0gbW9kYWw7XG4gICB9KTtcbiAgICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAgJHNjb3BlLm1vZGFsLnNob3coKTtcbiAgIH07XG4gICAkc2NvcGUuc3VibWl0QmFubmVyID0gZnVuY3Rpb24oYmFubmVyKXtcbiAgICAgdmFyIGJhbm5lckluZm8gPSB7XG4gICAgICAgdXNlcl9ob3VzZWhvbGQ6dXNlci51c2VyX2hvdXNlaG9sZCxcbiAgICAgICB1c2VyX2Jhbm5lcl9pbWFnZTpiYW5uZXJcbiAgICAgfVxuICAgICAgdXNlclNlcnZpY2UucG9zdGJhbm5lcihiYW5uZXJJbmZvKVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsLWJveFwiKS52YWx1ZSA9ICcnO1xuICAgICAgICAgICR3aW5kb3cubG9jYXRpb24ucmVsb2FkKHRydWUpO1xuICAgICB9KTtcbiAgIH07XG4gICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsLWJveFwiKS52YWx1ZSA9ICcnO1xuICAgICAkc2NvcGUubW9kYWwuaGlkZSgpO1xuICAgfTtcbiAgIC8vIENsZWFudXAgdGhlIG1vZGFsIHdoZW4gd2UncmUgZG9uZSB3aXRoIGl0IVxuICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgJHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuICAgfSk7XG4gICAvLyBFeGVjdXRlIGFjdGlvbiBvbiBoaWRlIG1vZGFsXG4gICAkc2NvcGUuJG9uKCdtb2RhbC5oaWRkZW4nLCBmdW5jdGlvbigpIHtcbiAgICAgLy8gRXhlY3V0ZSBhY3Rpb25cblxuICAgfSk7XG4gICAvLyBFeGVjdXRlIGFjdGlvbiBvbiByZW1vdmUgbW9kYWxcbiAgICRzY29wZS4kb24oJ21vZGFsLnJlbW92ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgIH0pO1xuXG4kc2NvcGUuaG91c2Vob2xkID0gICRzY29wZS51c2VyLnVzZXJfaG91c2Vob2xkO1xudXNlclNlcnZpY2UuZ2V0YmFubmVyKCRzY29wZS51c2VyLnVzZXJfaG91c2Vob2xkKS50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gIGNvbnNvbGUubG9nKHJlcy5kYXRhWzBdLnVzZXJfYmFubmVyX2ltYWdlKTtcbiAgICAkc2NvcGUuYmFubmVyID0gcmVzLmRhdGFbMF0udXNlcl9iYW5uZXJfaW1hZ2U7XG59KTtcblxuY29uc29sZS5sb2coJHNjb3BlLnVzZXIuemlwKTtcblxudXNlclNlcnZpY2UuZ2V0V2VhdGhlcigkc2NvcGUudXNlci56aXApXG4udGhlbihmdW5jdGlvbihyZXMpe1xuICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4gICRzY29wZS53ZWF0aGVyID0gcmVzLmRhdGE7XG59KVxuXG5cbnVzZXJTZXJ2aWNlLnNob3djaGlsZCgkc2NvcGUudXNlci51c2VyX2hvdXNlaG9sZClcbi50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gIGNvbnNvbGUubG9nKHJlcy5kYXRhKVxuICAkc2NvcGUuc2hvd2NoaWxkID0gcmVzLmRhdGE7XG59KVxuXG5cbn0pLy9lbmQgb2YgY29udHJvbGxlclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImxvZ2luQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRhdXRoLCAkc3RhdGUsIGxvZ2luU2VydmljZSl7XG5cbiRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uKHVzZXIpe1xuICAvLyBjb25zb2xlLmxvZyh1c2VyKVxuICBsb2dpblNlcnZpY2UudXNlckxvZ2luKHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICRhdXRoLnNldFRva2VuKHJlc3BvbnNlKVxuICAgICAgJHN0YXRlLmdvKCdob21lJylcblxuICB9KVxufVxuJHNjb3BlLm1ha2VVc2VyID0gZnVuY3Rpb24obmV3VXNlcil7XG4gIGxvZ2luU2VydmljZS5tYWtlVXNlcihuZXdVc2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAkYXV0aC5zZXRUb2tlbihyZXNwb25zZSlcbiAgICAgICRzdGF0ZS5nbygnaG9tZScpXG4gIH0pXG59XG4gICRzY29wZS5hdXRoZW50aWNhdGUgPSBmdW5jdGlvbihwcm92aWRlcikge1xuICAkYXV0aC5hdXRoZW50aWNhdGUocHJvdmlkZXIpfTtcbiAgLy8gJHNjb3BlLnRlc3QgPSBcIkhlbGxvIGZyb20gbG9naW4gY29udHJvbGxlclwiXG5cblxuICAkc2NvcGUucmV2ZWFsZXIgPSBmdW5jdGlvbigpe1xuICAkc2NvcGUuaGlkZSA9ICEkc2NvcGUuaGlkZTtcbiB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwibWFrZUNob3JlQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAkc2NvcGUuZ29iYWNrID0gZnVuY3Rpb24oKXtcbiAgICB3aW5kb3cuaGlzdG9yeS5nbygtMSlcbiAgfVxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcInNldFJld2FyZHNDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwpe1xuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3Jld2FyZE1vZGFsLmh0bWwnLCB7XG4gICAgc2NvcGU6ICRzY29wZSxcbiAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICRzY29wZS5tb2RhbCA9IG1vZGFsO1xuICB9KTtcbiAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5zaG93KCk7XG4gIH07XG4gICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcbiAgfTtcbiAgLy8gQ2xlYW51cCB0aGUgbW9kYWwgd2hlbiB3ZSdyZSBkb25lIHdpdGggaXQhXG4gICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuICB9KTtcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gaGlkZSBtb2RhbFxuICAkc2NvcGUuJG9uKCdtb2RhbC5oaWRkZW4nLCBmdW5jdGlvbigpIHtcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxuICB9KTtcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gcmVtb3ZlIG1vZGFsXG4gICRzY29wZS4kb24oJ21vZGFsLnJlbW92ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxuICB9KTtcbiAgLy9iYWNrYnV0dG9uXG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxuICB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwic2V0dGluZ3NDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwpe1xuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2NoYW5nZVBhc3N3b3JkLmh0bWwnLCB7XG4gICAgIGlkOiAnMScsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsMSA9IG1vZGFsO1xuICAgfSk7XG5cbiAgIC8vIE1vZGFsIDJcbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnY2hhbmdlSG91c2Vob2xkLmh0bWwnLCB7XG4gICAgIGlkOiAnMicsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsMiA9IG1vZGFsO1xuICAgfSk7XG5cbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnY2hhbmdlWmlwLmh0bWwnLCB7XG4gICAgIGlkOiAnMycsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsMyA9IG1vZGFsO1xuICAgfSk7XG5cbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnYWRkUGFyZW50Lmh0bWwnLCB7XG4gICAgIGlkOiAnNCcsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsNCA9IG1vZGFsO1xuICAgfSk7XG5cbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgncmVtb3ZlQ2hpbGQuaHRtbCcsIHtcbiAgICAgaWQ6ICc1JywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWw1ID0gbW9kYWw7XG4gICB9KTtcblxuXG5cbiAgICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICBpZiAoaW5kZXggPT0gMSkgJHNjb3BlLm9Nb2RhbDEuc2hvdygpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDIpICRzY29wZS5vTW9kYWwyLnNob3coKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSAzKSAkc2NvcGUub01vZGFsMy5zaG93KCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gNCkgJHNjb3BlLm9Nb2RhbDQuc2hvdygpO1xuICAgICBlbHNlICRzY29wZS5vTW9kYWw1LnNob3coKTtcbiAgIH07XG5cbiAgICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgaWYgKGluZGV4ID09IDEpICRzY29wZS5vTW9kYWwxLmhpZGUoKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSAyKSAkc2NvcGUub01vZGFsMi5oaWRlKCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMykgJHNjb3BlLm9Nb2RhbDMuaGlkZSgpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDQpICRzY29wZS5vTW9kYWw0LmhpZGUoKTtcbiAgICAgZWxzZSAkc2NvcGUub01vZGFsNS5oaWRlKCk7XG4gICB9O1xuXG4gICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAkc2NvcGUub01vZGFsMS5yZW1vdmUoKTtcbiAgICAgJHNjb3BlLm9Nb2RhbDIucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWwzLnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsNC5yZW1vdmUoKTtcbiAgICAgJHNjb3BlLm9Nb2RhbDUucmVtb3ZlKCk7XG4gICB9KTtcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJ0cmFja2VyQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsLCAkc3RhdGUsIHVzZXJTZXJ2aWNlKXtcbiAgICB2YXIgZ2V0Q2hpbGQgPSBmdW5jdGlvbigpe1xuICAgICAgdXNlclNlcnZpY2UuZ2V0Q2hpbGQoJHN0YXRlLnBhcmFtcy5pZCkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgJHNjb3BlLmNoaWxkID0gcmVzcG9uc2VbMF07XG4gICAgICB9KTtcblxuICAgICAgdXNlclNlcnZpY2UuZ2V0RGFpbHlDaG9yZXMoJHN0YXRlLnBhcmFtcy5pZCkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgJHNjb3BlLmRhaWx5Y2hvcmUgPSByZXNwb25zZTtcbiAgICAgIH0pO1xuXG4gICAgICB1c2VyU2VydmljZS5nZXRXZWVrbHlDaG9yZXMoJHN0YXRlLnBhcmFtcy5pZCkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgJHNjb3BlLldlZWtseUNob3JlcyA9IHJlc3BvbnNlO1xuICAgICAgfSk7XG5cbiAgICAgIHVzZXJTZXJ2aWNlLmdldE1vbnRobHlDaG9yZXMoJHN0YXRlLnBhcmFtcy5pZCkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgJHNjb3BlLm1vbnRobHlDaG9yZXMgPSByZXNwb25zZTtcbiAgICAgIH0pO1xuXG4gICAgfTtcbiAgICBnZXRDaGlsZCgpO1xuXG4gIC8vICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgncGljQ29uZk1vZGFsLmh0bWwnLCB7XG4gIC8vICAgc2NvcGU6ICRzY29wZSxcbiAgLy8gICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgLy8gfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAvLyAgICRzY29wZS5tb2RhbCA9IG1vZGFsO1xuICAvLyB9KTtcbiAgLy8gJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAvLyAgICRzY29wZS5tb2RhbC5zaG93KCk7XG4gIC8vIH07XG4gIC8vICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XG4gIC8vICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcbiAgLy8gfTtcbiAgLy8gLy8gQ2xlYW51cCB0aGUgbW9kYWwgd2hlbiB3ZSdyZSBkb25lIHdpdGggaXQhXG4gIC8vICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gIC8vICAgJHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuICAvLyB9KTtcbiAgLy8gLy8gRXhlY3V0ZSBhY3Rpb24gb24gaGlkZSBtb2RhbFxuICAvLyAkc2NvcGUuJG9uKCdtb2RhbC5oaWRkZW4nLCBmdW5jdGlvbigpIHtcbiAgLy8gICAvLyBFeGVjdXRlIGFjdGlvblxuICAvLyB9KTtcbiAgLy8gLy8gRXhlY3V0ZSBhY3Rpb24gb24gcmVtb3ZlIG1vZGFsXG4gIC8vICRzY29wZS4kb24oJ21vZGFsLnJlbW92ZWQnLCBmdW5jdGlvbigpIHtcbiAgLy8gICAvLyBFeGVjdXRlIGFjdGlvblxuICAvLyB9KTtcblxufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwidXNlckluZm9DdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIGluZm8gY29udHJvbGxlclwiXG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5zZXJ2aWNlKFwiY2hvcmVTZXJ2aWNlXCIsIGZ1bmN0aW9uKCRodHRwLCRxLCRhdXRoKXtcblxudGhpcy5nZXRVc2VySW5mbyA9ICRhdXRoLmdldFBheWxvYWQoKTtcblxuXG50aGlzLmdldENoaWxkcmVuID0gZnVuY3Rpb24oaG91c2Vob2xkKXtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6XCJHRVRcIixcbiAgICB1cmw6XCIvY2hpbGRyZW4vXCIgKyBob3VzZWhvbGRcbiAgfSlcbn1cblxudGhpcy5jcmVhdGVDaG9yZSA9IGZ1bmN0aW9uKGNob3JlKXtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6XCJQT1NUXCIsXG4gICAgdXJsOlwiL2Fzc2lnbmNob3JlXCIsXG4gICAgZGF0YTpjaG9yZVxuICB9KVxufVxuXG5cblxuXG59KS8vZW5kIG9mIHNlcnZpY2VcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLnNlcnZpY2UoJ2xvZ2luU2VydmljZScsIGZ1bmN0aW9uKCRodHRwKXtcblxuXG4gIHRoaXMudXNlckxvZ2luID0gZnVuY3Rpb24odXNlcikge1xuICAgIGNvbnNvbGUubG9nKHVzZXIsIFwic2VydmljZVwiKVxuICAgIHJldHVybiAkaHR0cCh7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgdXJsOiAnL2F1dGgvbG9naW4nLFxuICAgICAgZGF0YTogdXNlclxuICAgIH0pXG4gIH1cbiAgdGhpcy5tYWtlVXNlciA9IGZ1bmN0aW9uKG5ld1VzZXIpIHtcbiAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIHVybDogJy9hdXRoL3NpZ251cCcsXG4gICAgICBkYXRhOiBuZXdVc2VyXG4gICAgfSlcbiAgfVxufSkgLy8gZW5kIG9mIHNlcnZpY2VcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLnNlcnZpY2UoJ3VzZXJTZXJ2aWNlJywgZnVuY3Rpb24oJGh0dHAsJHEsJGF1dGgpe1xuXG52YXIgYmFubmVyO1xuXG50aGlzLmdldFVzZXJJbmZvO1xudmFyIHRoZW1lO1xuXG5cbnRoaXMucG9zdGJhbm5lciA9IGZ1bmN0aW9uKGJhbm5lcil7XG4gIGNvbnNvbGUubG9nKGJhbm5lcik7XG4gIGNvbnNvbGUubG9nKGJhbm5lci51c2VyX2Jhbm5lcl9pbWFnZSk7XG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgIHVybDpcIi9iYW5uZXIvXCIgKyBiYW5uZXIudXNlcl9ob3VzZWhvbGQsXG4gICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe3VzZXJfYmFubmVyX2ltYWdlOmJhbm5lci51c2VyX2Jhbm5lcl9pbWFnZX0pXG4gIH0pXG59XG5cbnRoaXMuZ2V0YmFubmVyID0gZnVuY3Rpb24odXNlcklkKXtcbiAgY29uc29sZS5sb2codXNlcklkKTtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgdXJsOlwiL2Jhbm5lci9cIiArIHVzZXJJZFxuICB9KVxufVxuXG5cbnRoaXMuZ2V0V2VhdGhlciA9IGZ1bmN0aW9uKCl7XG5yZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6J2h0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT16aXA9ODQwMTAmdW5pdHM9aW1wZXJpYWwmYXBwaWQ9YzEwZWY5OWM1YWZkZWUzZmRmYmE3OGU4Yzk4MWE5YjYnXG4gIH0pXG5cbn07XG5cblxuIHRoaXMuc2V0VGhlbWUgPSBmdW5jdGlvbihkYXRhKXtcbiAgIHJldHVybiAkaHR0cCh7XG4gICAgIG1ldGhvZDogJ1B1dCcsXG4gICAgIHVybDpcIi90aGVtZVwiLFxuICAgICBkYXRhOiBkYXRhXG4gICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICB0aGVtZSA9IHJlcy5kYXRhWzBdLnVzZXJfdGhlbWVcbiAgICAgICByZXR1cm4gcmVzO1xuICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuIH0pXG4gfVxuXG50aGlzLmFkZENoaWxkID0gZnVuY3Rpb24oY2hpbGQpe1xuICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShjaGlsZCkpO1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDpcIlBPU1RcIixcbiAgICB1cmw6XCIvY2hpbGRyZW5cIixcbiAgICBkYXRhOiBjaGlsZFxuICB9KVxufVxuXG5cbnRoaXMuc2hvd2NoaWxkID0gZnVuY3Rpb24oaG91c2Vob2xkKXtcbnJldHVybiAkaHR0cCh7XG4gIG1ldGhvZDpcIkdFVFwiLFxuICB1cmw6XCIvY2hpbGRyZW4vXCIgKyBob3VzZWhvbGRcbn0pXG59XG5cbnRoaXMuZ2V0UmV3YXJkcyA9IGZ1bmN0aW9uKGlkKXtcbiAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgbWV0aG9kOiBcIkdldFwiLFxuICAgICAgdXJsOicvY2hpbGRyZXdhcmRzLycgKyBpZCxcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICByZXR1cm4gcmVzLmRhdGE7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgfSlcblxufVxuXG4gIHRoaXMucmV0dXJuVGhlbWUgPSBmdW5jdGlvbigpe1xuICAgIHJldHVybiB0aGVtZTtcbiAgfVxuXG5cbnRoaXMuZ2V0RGFpbHlDaG9yZXMgPSBmdW5jdGlvbihpZCl7XG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOiBcIkdldFwiLFxuICAgIHVybDonL2RhaWx5Y2hvcmUvJyArIGlkLFxuICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgY29uc29sZS5sb2coZXJyKTtcbn0pXG59XG5cbnRoaXMuZ2V0V2Vla2x5Q2hvcmVzID0gZnVuY3Rpb24oaWQpe1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDogXCJHZXRcIixcbiAgICB1cmw6Jy93ZWVrbHljaG9yZS8nICsgaWQsXG4gIH0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICByZXR1cm4gcmVzLmRhdGE7XG4gIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICBjb25zb2xlLmxvZyhlcnIpO1xufSlcbn1cblxudGhpcy5nZXRNb250aGx5Q2hvcmVzID0gZnVuY3Rpb24oaWQpe1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDogXCJHZXRcIixcbiAgICB1cmw6Jy9tb250aGx5Y2hvcmUvJyArIGlkLFxuICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgY29uc29sZS5sb2coZXJyKTtcbn0pXG59XG4gdGhpcy5jaGVja09mZmNob3JlID0gZnVuY3Rpb24oaWQpe1xuICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgICB1cmw6Jy9jb21wbGV0ZWQvJyArIGlkXG4gICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAgICByZXR1cm4gcmVzO1xuICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKXtcbiAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICB9KVxuICAgfVxudGhpcy5nZXRDaGlsZCA9IGZ1bmN0aW9uKGlkKXtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6IFwiR2V0XCIsXG4gICAgdXJsOiAnL2NoaWxkLycrIGlkXG4gIH0pLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICByZXR1cm4gcmVzLmRhdGFcbiAgfSlcbn1cblxufSk7Ly9lbmQgb2Ygc2VydmljZVxuIl19
