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
'use strict';

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

  function CreateChore(name, description, household, value, daily, weekly, monthly, child) {
    this.chore_name = name;
    this.chore_description = description;
    this.user_household_fk = household;
    this.chore_value = value;
    this.chore_daily = daily;
    this.chore_weekly = weekly;
    this.chore_monthly = monthly;
    this.user_id_fk = child;
  }

  var childrenChores = [];
  $scope.childChore = function (chore) {
    var selectChild = this.child.user_id_pk;
    var childChore = new CreateChore(chore.chore_name, chore.chore_description, currentUser.user_household, chore.chore_value, chore.chore_daily, chore.chore_weekly, chore.chore_monthly, selectChild);
    console.log(childChore);
    childrenChores.push(childChore);
    console.log(childrenChores);
  };

  $scope.submitChore = function () {
    console.log(childrenChores);
    childrenChores.forEach(function (val) {
      console.log('i');
      choreService.createChore(val).then(function (res) {});
    });
    childrenChores = [];
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

  // $scope.checkOffchore = function(id){
  //   userService.checkOffchore(id).then(function(response){
  //     if (response.status === 200){
  //
  //     }
  //   })
  //  }

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
    $scope.banner = res.data[0].user_banner_image;
  });

  userService.getWeather(userToken.zip).then(function (res) {
    $scope.weather = res.data;
  });

  userService.showchild(userToken.user_household).then(function (res) {
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
    console.log('how many times');
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

  this.getUserInfo = $auth.getPayload();
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

  this.getWeather = function (location) {
    return $http({
      method: "GET",
      url: 'http://api.openweathermap.org/data/2.5/weather?q=zip=' + location + '&units=imperial&appid=c10ef99c5afdee3fdfba78e8c981a9b6'
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
      console.log(res);
    });
  };
}); //end of service
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXJzL2FkZENoaWxkQ3RybC5qcyIsImNvbnRyb2xsZXJzL2Fzc2lnbkNob3JlQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NhbWVyYUN0cmwuanMiLCJjb250cm9sbGVycy9jaGlsZEJhbmtDdHJsLmpzIiwiY29udHJvbGxlcnMvY2hpbGRIb21lQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NoaWxkTG9naW5DdHJsLmpzIiwiY29udHJvbGxlcnMvZWRpdENoaWxkQ3RybC5qcyIsImNvbnRyb2xsZXJzL2hpc3RvcnlDdHJsLmpzIiwiY29udHJvbGxlcnMvaG9tZUN0cmwuanMiLCJjb250cm9sbGVycy9sb2dpbkN0cmwuanMiLCJjb250cm9sbGVycy9tYWtlQ2hvcmVDdHJsLmpzIiwiY29udHJvbGxlcnMvc2V0UmV3YXJkc0N0cmwuanMiLCJjb250cm9sbGVycy9zZXR0aW5nc0N0cmwuanMiLCJjb250cm9sbGVycy90cmFja2VyQ3RybC5qcyIsImNvbnRyb2xsZXJzL3VzZXJJbmZvQ3RybC5qcyIsInNlcnZpY2UvY2hvcmVTZXJ2aWNlLmpzIiwic2VydmljZS9sb2dpblNlcnZpY2UuanMiLCJzZXJ2aWNlL3VzZXJTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsIiR1cmxSb3V0ZXJQcm92aWRlciIsIiRhdXRoUHJvdmlkZXIiLCJvdGhlcndpc2UiLCJzdGF0ZSIsInVybCIsInRlbXBsYXRlVXJsIiwiY29udHJvbGxlciIsImZhY2Vib29rIiwiY2xpZW50SWQiLCJyZXNwb25zZVR5cGUiLCJnb29nbGUiLCJydW4iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5Iiwid2luZG93IiwiY29yZG92YSIsInBsdWdpbnMiLCJLZXlib2FyZCIsImhpZGVLZXlib2FyZEFjY2Vzc29yeUJhciIsImRpc2FibGVTY3JvbGwiLCJTdGF0dXNCYXIiLCJzdHlsZURlZmF1bHQiLCIkc2NvcGUiLCJ1c2VyU2VydmljZSIsIiRzdGF0ZSIsImdvYmFjayIsImhpc3RvcnkiLCJnbyIsInVzZXIiLCJnZXRVc2VySW5mbyIsInN1YiIsImNvbnNvbGUiLCJsb2ciLCJzdWJtaXRDaGlsZCIsImNoaWxkIiwidXNlcl9ob3VzZWhvbGQiLCJhZGRDaGlsZCIsInRoZW4iLCJyZXMiLCJjaG9yZVNlcnZpY2UiLCJjdXJyZW50VXNlciIsImdldENoaWxkcmVuIiwiY2hpbGRzIiwiZGF0YSIsInZhbHVlcyIsImNob3JlIiwiY2hvcmVfZGFpbHkiLCJjaG9yZV93ZWVrbHkiLCJjaG9yZV9tb250aGx5IiwiQ3JlYXRlQ2hvcmUiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJob3VzZWhvbGQiLCJ2YWx1ZSIsImRhaWx5Iiwid2Vla2x5IiwibW9udGhseSIsImNob3JlX25hbWUiLCJjaG9yZV9kZXNjcmlwdGlvbiIsInVzZXJfaG91c2Vob2xkX2ZrIiwiY2hvcmVfdmFsdWUiLCJ1c2VyX2lkX2ZrIiwiY2hpbGRyZW5DaG9yZXMiLCJjaGlsZENob3JlIiwic2VsZWN0Q2hpbGQiLCJ1c2VyX2lkX3BrIiwicHVzaCIsInN1Ym1pdENob3JlIiwiZm9yRWFjaCIsInZhbCIsImNyZWF0ZUNob3JlIiwiJGNvcmRvdmFDYW1lcmEiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCIkY29yZG92YVBsdWdpbiIsInNvbWVGdW5jdGlvbiIsInN1Y2Nlc3MiLCJlcnJvciIsInRha2VQaWN0dXJlIiwib3B0aW9ucyIsInF1YWxpdHkiLCJkZXN0aW5hdGlvblR5cGUiLCJDYW1lcmEiLCJEZXN0aW5hdGlvblR5cGUiLCJEQVRBX1VSTCIsInNvdXJjZVR5cGUiLCJQaWN0dXJlU291cmNlVHlwZSIsIkNBTUVSQSIsImFsbG93RWRpdCIsImVuY29kaW5nVHlwZSIsIkVuY29kaW5nVHlwZSIsIkpQRUciLCJ0YXJnZXRXaWR0aCIsInRhcmdldEhlaWdodCIsInBvcG92ZXJPcHRpb25zIiwiQ2FtZXJhUG9wb3Zlck9wdGlvbnMiLCJzYXZlVG9QaG90b0FsYnVtIiwiY29ycmVjdE9yaWVudGF0aW9uIiwiZ2V0UGljdHVyZSIsImltYWdlRGF0YSIsImltZ1VSSSIsImVyciIsIiRhdXRoIiwidXNlclRva2VuIiwiZ2V0UGF5bG9hZCIsInRoZW1lIiwidXNlcl90aGVtZSIsIiRvbiIsImdldFRoZW1lIiwicmV0dXJuVGhlbWUiLCJzZXRUaGVtZSIsInRoZW1lSW1hZ2UiLCJnZXRSZXdhcmRzIiwiaWQiLCJyZXNwb25zZSIsInJld2FyZHMiLCIkaW9uaWNNb2RhbCIsImZyb21UZW1wbGF0ZVVybCIsInNjb3BlIiwiYmFja2Ryb3BDbGlja1RvQ2xvc2UiLCJhbmltYXRpb24iLCJtb2RhbCIsIm9Nb2RhbDEiLCJvcGVuTW9kYWwiLCJpbmRleCIsInNob3ciLCJvTW9kYWwyIiwiY2xvc2VNb2RhbCIsImhpZGUiLCJyZW1vdmUiLCJjaG9pY2UiLCJ1c2VySWQiLCJzdGF0dXMiLCJnZXREYWlseUNob3JlcyIsImRhaWx5Q2hvcmVzIiwiZ2V0V2Vla2x5Q2hvcmVzIiwid2Vla2x5Q2hvcmVzIiwiZ2V0TW9udGhseUNob3JlcyIsIm1vbnRobHlDaG9yZXMiLCJyZXZlYWxlciIsImxvZ2luU2VydmljZSIsImxvZ2luQ2hpbGQiLCJ1c2VyTG9naW4iLCJzZXRUb2tlbiIsInRlc3QiLCIkd2luZG93Iiwic3VibWl0QmFubmVyIiwiYmFubmVyIiwiYmFubmVySW5mbyIsInVzZXJfYmFubmVyX2ltYWdlIiwicG9zdGJhbm5lciIsImdldEVsZW1lbnRCeUlkIiwibG9jYXRpb24iLCJyZWxvYWQiLCJnZXRiYW5uZXIiLCJnZXRXZWF0aGVyIiwiemlwIiwid2VhdGhlciIsInNob3djaGlsZCIsImxvZ2luIiwibWFrZVVzZXIiLCJuZXdVc2VyIiwiYXV0aGVudGljYXRlIiwicHJvdmlkZXIiLCJvTW9kYWwzIiwib01vZGFsNCIsIm9Nb2RhbDUiLCJzZXJ2aWNlIiwiJGh0dHAiLCIkcSIsIm1ldGhvZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJjYXRjaCIsImNoZWNrT2ZmY2hv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ZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIElvbmljIFN0YXJ0ZXIgQXBwXG5cbi8vIGFuZ3VsYXIubW9kdWxlIGlzIGEgZ2xvYmFsIHBsYWNlIGZvciBjcmVhdGluZywgcmVnaXN0ZXJpbmcgYW5kIHJldHJpZXZpbmcgQW5ndWxhciBtb2R1bGVzXG4vLyAnc3RhcnRlcicgaXMgdGhlIG5hbWUgb2YgdGhpcyBhbmd1bGFyIG1vZHVsZSBleGFtcGxlIChhbHNvIHNldCBpbiBhIDxib2R5PiBhdHRyaWJ1dGUgaW4gaW5kZXguaHRtbClcbi8vIHRoZSAybmQgcGFyYW1ldGVyIGlzIGFuIGFycmF5IG9mICdyZXF1aXJlcydcblxuYW5ndWxhci5tb2R1bGUoJ2Nob3JlJywgWydpb25pYycsICdzYXRlbGxpemVyJ10pXG4uY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRhdXRoUHJvdmlkZXIpe1xuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKFwiL2NoaWxkL2hvbWVcIik7XG4gICRzdGF0ZVByb3ZpZGVyXG4gIC5zdGF0ZSgnYWRkQ2hpbGQnLHtcbiAgICB1cmw6XCIvYWRkQ2hpbGRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9hZGRDaGlsZC5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJhZGRDaGlsZEN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2Fzc2lnbkNob3JlJyx7XG4gICAgdXJsOlwiL2Fzc2lnbkNob3JlXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvYXNzaWduQ2hvcmUuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiYXNzaWduQ2hvcmVDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdlZGl0Q2hpbGQnLHtcbiAgICB1cmw6XCIvZWRpdENoaWxkLzppZFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2VkaXRDaGlsZC5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJlZGl0Q2hpbGRDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdoaXN0b3J5Jyx7XG4gICAgdXJsOlwiL2hpc3RvcnlcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9oaXN0b3J5Lmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImhpc3RvcnlDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdob21lJyx7XG4gICAgdXJsOlwiL2hvbWVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9ob21lLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImhvbWVDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdsb2dpbicse1xuICAgIHVybDpcIi9sb2dpblwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL0xvZ2luLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImxvZ2luQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnbWFrZUNob3JlJyx7XG4gICAgdXJsOlwiL21ha2VDaG9yZVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL21ha2VDaG9yZS5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJtYWtlQ2hvcmVDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdzZXRSZXdhcmRzJyx7XG4gICAgdXJsOlwiL3NldFJld2FyZHMvOmlkXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvc2V0UmV3YXJkcy5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJzZXRSZXdhcmRzQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnc2V0dGluZ3MnLHtcbiAgICB1cmw6XCIvc2V0dGluZ3NcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9zZXR0aW5ncy5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJzZXR0aW5nc0N0cmxcIlxuICB9KVxuICAuc3RhdGUoJ3RyYWNrZXInLHtcbiAgICB1cmw6XCIvdHJhY2tlci86aWRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy90cmFja2VyLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcInRyYWNrZXJDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCd1c2VySW5mbycse1xuICAgIHVybDpcIi91c2VySW5mb1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL3VzZXJJbmZvLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcInVzZXJJbmZvQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnY2hpbGRCYW5rJyx7XG4gICAgdXJsOlwiL2NoaWxkL2JhbmtcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9jaGlsZEJhbmsuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRCYW5rQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnY2hpbGRIb21lJyx7XG4gICAgdXJsOlwiL2NoaWxkL2hvbWVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9jaGlsZEhvbWUuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRIb21lQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnY2hpbGRMb2dpbicse1xuICAgIHVybDpcIi9jaGlsZC9sb2dpblwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2NoaWxkTG9naW4uaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRMb2dpbkN0cmxcIlxuICB9KVxuXG4gICRhdXRoUHJvdmlkZXIuZmFjZWJvb2soe1xuICAgIGNsaWVudElkOiAnMzMyMjcyMDU3MTMyNjgxJ1xuICB9KTtcblxuICAvLyBPcHRpb25hbDogRm9yIGNsaWVudC1zaWRlIHVzZSAoSW1wbGljaXQgR3JhbnQpLCBzZXQgcmVzcG9uc2VUeXBlIHRvICd0b2tlbicgKGRlZmF1bHQ6ICdjb2RlJylcbiAgJGF1dGhQcm92aWRlci5mYWNlYm9vayh7XG4gICAgY2xpZW50SWQ6ICczMzIyNzIwNTcxMzI2ODEnLFxuICAgIHJlc3BvbnNlVHlwZTogJ3Rva2VuJ1xuICB9KTtcblxuICAkYXV0aFByb3ZpZGVyLmdvb2dsZSh7XG4gICAgY2xpZW50SWQ6ICcyNzUzNTI5NjA5NDYtNXJjYW4zcWtobHNjN201MGhldjVkbjJlMmNhZTltYnAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20nLFxuICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODEwMC8jL2xvZ2luLydcbiAgfSk7XG59KVxuXG5cblxuLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xuICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICBpZih3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuXG4gICAgICAvLyBEb24ndCByZW1vdmUgdGhpcyBsaW5lIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuIEl0IHN0b3BzIHRoZSB2aWV3cG9ydFxuICAgICAgLy8gZnJvbSBzbmFwcGluZyB3aGVuIHRleHQgaW5wdXRzIGFyZSBmb2N1c2VkLiBJb25pYyBoYW5kbGVzIHRoaXMgaW50ZXJuYWxseSBmb3JcbiAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgfVxuICAgIGlmKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcbiAgICB9XG4gIH0pO1xufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJhZGRDaGlsZEN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLHVzZXJTZXJ2aWNlLCRzdGF0ZSl7XG4gIC8vYmFja2J1dHRvblxuICAkc2NvcGUuZ29iYWNrID0gZnVuY3Rpb24oKXtcbiAgICB3aW5kb3cuaGlzdG9yeS5nbygtMSlcbiAgfVxudmFyIHVzZXIgPSB1c2VyU2VydmljZS5nZXRVc2VySW5mby5zdWI7XG5jb25zb2xlLmxvZyh1c2VyKTtcbiRzY29wZS5zdWJtaXRDaGlsZCA9IGZ1bmN0aW9uKGNoaWxkKXtcbiAgY2hpbGQudXNlcl9ob3VzZWhvbGQgPSB1c2VyLnVzZXJfaG91c2Vob2xkO1xuICBjb25zb2xlLmxvZyhjaGlsZCk7XG4gIHVzZXJTZXJ2aWNlLmFkZENoaWxkKGNoaWxkKVxuICAudGhlbihmdW5jdGlvbihyZXMpe1xuICAgICRzdGF0ZS5nbygnaG9tZScpO1xuICB9KTtcblxufVxuXG5cblxuXG5cbn0pIC8vZW5kIG9mIGNvbnRyb2xsZXJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJhc3NpZ25DaG9yZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLGNob3JlU2VydmljZSwkc3RhdGUpe1xuXG52YXIgY3VycmVudFVzZXIgPSBjaG9yZVNlcnZpY2UuZ2V0VXNlckluZm8uc3ViO1xuXG5cbmNob3JlU2VydmljZS5nZXRDaGlsZHJlbihjdXJyZW50VXNlci51c2VyX2hvdXNlaG9sZClcbi50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gIC8vICRzY29wZS5jaG9yZXMgPSByZXMuZGF0YTtcbiAgJHNjb3BlLmNoaWxkcyA9IHJlcy5kYXRhO1xuICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG59KTtcblxuXG4kc2NvcGUudmFsdWVzID0gW107XG5cbiRzY29wZS5jaG9yZSA9IHtcbmNob3JlX2RhaWx5OiBmYWxzZSxcbmNob3JlX3dlZWtseTogZmFsc2UsXG5jaG9yZV9tb250aGx5OmZhbHNlLFxuXG59O1xuXG5mdW5jdGlvbiBDcmVhdGVDaG9yZShuYW1lLGRlc2NyaXB0aW9uLGhvdXNlaG9sZCx2YWx1ZSxkYWlseSx3ZWVrbHksbW9udGhseSxjaGlsZCl7XG4gIHRoaXMuY2hvcmVfbmFtZSA9IG5hbWU7XG4gIHRoaXMuY2hvcmVfZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgdGhpcy51c2VyX2hvdXNlaG9sZF9mayA9IGhvdXNlaG9sZDtcbiAgdGhpcy5jaG9yZV92YWx1ZSA9IHZhbHVlO1xuICB0aGlzLmNob3JlX2RhaWx5ID0gZGFpbHk7XG4gIHRoaXMuY2hvcmVfd2Vla2x5ID0gd2Vla2x5O1xuICB0aGlzLmNob3JlX21vbnRobHkgPSBtb250aGx5O1xuICB0aGlzLnVzZXJfaWRfZmsgPSBjaGlsZDtcbn1cblxuXG52YXIgY2hpbGRyZW5DaG9yZXMgPSBbXTtcbiRzY29wZS5jaGlsZENob3JlID0gZnVuY3Rpb24oY2hvcmUpe1xuICB2YXIgc2VsZWN0Q2hpbGQgPSB0aGlzLmNoaWxkLnVzZXJfaWRfcGs7XG4gIHZhciBjaGlsZENob3JlID0gbmV3IENyZWF0ZUNob3JlKGNob3JlLmNob3JlX25hbWUsY2hvcmUuY2hvcmVfZGVzY3JpcHRpb24sY3VycmVudFVzZXIudXNlcl9ob3VzZWhvbGQsY2hvcmUuY2hvcmVfdmFsdWUsY2hvcmUuY2hvcmVfZGFpbHksY2hvcmUuY2hvcmVfd2Vla2x5LGNob3JlLmNob3JlX21vbnRobHksc2VsZWN0Q2hpbGQpO1xuY29uc29sZS5sb2coY2hpbGRDaG9yZSk7XG4gIGNoaWxkcmVuQ2hvcmVzLnB1c2goY2hpbGRDaG9yZSk7XG4gIGNvbnNvbGUubG9nKGNoaWxkcmVuQ2hvcmVzKTtcbn07XG5cblxuJHNjb3BlLnN1Ym1pdENob3JlID0gZnVuY3Rpb24oKXtcbiAgY29uc29sZS5sb2coY2hpbGRyZW5DaG9yZXMpO1xuICBjaGlsZHJlbkNob3Jlcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbCl7XG4gICAgY29uc29sZS5sb2coJ2knKTtcbiAgICBjaG9yZVNlcnZpY2UuY3JlYXRlQ2hvcmUodmFsKVxuICAgIC50aGVuKGZ1bmN0aW9uKHJlcyl7fSk7XG4gIH1cblxuKTtcbmNoaWxkcmVuQ2hvcmVzID0gW107XG59O1xuXG5cblxuXG5cblxuXG59KTsvL2VuZCBvZiBjb250cm9sbGVyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKCdjYW1lcmFDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkY29yZG92YUNhbWVyYSkge1xuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkZXZpY2VyZWFkeVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAkY29yZG92YVBsdWdpbi5zb21lRnVuY3Rpb24oKS50aGVuKHN1Y2Nlc3MsIGVycm9yKTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICAvLyBPUiB3aXRoIElPTklDXG5cbiAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICRjb3Jkb3ZhUGx1Z2luLnNvbWVGdW5jdGlvbigpLnRoZW4oc3VjY2VzcywgZXJyb3IpO1xuICAgIH0pO1xuXG4gICRzY29wZS50YWtlUGljdHVyZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgcXVhbGl0eTogNTAsXG4gICAgICBkZXN0aW5hdGlvblR5cGU6IENhbWVyYS5EZXN0aW5hdGlvblR5cGUuREFUQV9VUkwsXG4gICAgICBzb3VyY2VUeXBlOiBDYW1lcmEuUGljdHVyZVNvdXJjZVR5cGUuQ0FNRVJBLFxuICAgICAgYWxsb3dFZGl0OiBmYWxzZSxcbiAgICAgIGVuY29kaW5nVHlwZTogQ2FtZXJhLkVuY29kaW5nVHlwZS5KUEVHLFxuICAgICAgdGFyZ2V0V2lkdGg6IDMwMCxcbiAgICAgIHRhcmdldEhlaWdodDogMzAwLFxuICAgICAgcG9wb3Zlck9wdGlvbnM6IENhbWVyYVBvcG92ZXJPcHRpb25zLFxuICAgICAgc2F2ZVRvUGhvdG9BbGJ1bTogZmFsc2UsXG5cdCAgICBjb3JyZWN0T3JpZW50YXRpb246dHJ1ZVxuICAgIH07XG5cbiAgICAkY29yZG92YUNhbWVyYS5nZXRQaWN0dXJlKG9wdGlvbnMpLnRoZW4oZnVuY3Rpb24oaW1hZ2VEYXRhKSB7XG4gICAgICAkc2NvcGUuaW1nVVJJID0gXCJkYXRhOmltYWdlL2pwZWc7YmFzZTY0LFwiICsgaW1hZ2VEYXRhO1xuICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgLy8gZXJyb3JcbiAgICB9KTtcblxuICB9O1xuICB9LCBmYWxzZSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiY2hpbGRCYW5rQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRhdXRoLCB1c2VyU2VydmljZSl7XG4gIHZhciB1c2VyVG9rZW4gPSAkYXV0aC5nZXRQYXlsb2FkKCk7XG4gICB1c2VyU2VydmljZS5nZXRVc2VySW5mbyA9IHVzZXJUb2tlbjtcbiAgICRzY29wZS51c2VyID0gdXNlclRva2VuLnN1YjtcbiAgICRzY29wZS50aGVtZSA9ICRzY29wZS51c2VyLnVzZXJfdGhlbWVcblxuICAgJHNjb3BlLiRvbignJGlvbmljVmlldy5iZWZvcmVFbnRlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgdmFyIGdldFRoZW1lID0gZnVuY3Rpb24oKXtcbiAgICAgICAkc2NvcGUudGhlbWUgPSB1c2VyU2VydmljZS5yZXR1cm5UaGVtZSgpXG4gICAgIH1cbiAgICAgaWYodXNlclNlcnZpY2UucmV0dXJuVGhlbWUoKSl7XG4gICAgICAgZ2V0VGhlbWUoKVxuICAgICB9XG4gICAgICRzY29wZS5zZXRUaGVtZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAnYmFzZWJhbGwnKXtcbiAgICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL2ltZy1iYXNlYmFsbC10cmFucy5wbmcnXG4gICAgICAgfVxuICAgICAgIGlmKCRzY29wZS50aGVtZSA9PT0gJ2NoYXJsaWVCcm93bicpe1xuICAgICAgICAgJHNjb3BlLnRoZW1lSW1hZ2UgPSAnLi9pbWcvc25vb3B5LnBuZydcbiAgICAgICB9XG4gICAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAncHJpbmNlc3MnKXtcbiAgICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL0Nyb3duX1ByaW5jZXNzLnBuZydcbiAgICAgICB9XG4gICAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAnc3RhcldhcnMnKXtcbiAgICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL2RlYXRoLXN0YXItMm5kLWljb24ucG5nJ1xuICAgICAgIH1cbiAgICAgICBpZigkc2NvcGUudGhlbWUgPT09ICd3YXRlcicpe1xuICAgICAgICAgJHNjb3BlLnRoZW1lSW1hZ2UgPSAnLi9pbWcvVHJhbnNwYXJlbnRfV2F0ZXJfRHJvcF9QTkdfUGljdHVyZS5wbmcnXG4gICAgICAgfVxuXG4gICAgIH1cbiAgICAgJHNjb3BlLnNldFRoZW1lKCk7XG4gIH0pO1xuXG5cblxuXG5cbiAgIHZhciBnZXRSZXdhcmRzID0gZnVuY3Rpb24oKXtcbiAgICAgaWQgPSAkc2NvcGUudXNlci51c2VyX2lkX3BrO1xuICAgICB1c2VyU2VydmljZS5nZXRSZXdhcmRzKGlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAkc2NvcGUucmV3YXJkcyA9IHJlc3BvbnNlO1xuICAgICB9KVxuICAgfVxuICAgZ2V0UmV3YXJkcygpO1xuXG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiY2hpbGRIb21lQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsLCAkYXV0aCwgdXNlclNlcnZpY2Upe1xuICAvLyAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tICBjaGlsZCBIb21lIGNvbnRyb2xsZXJcIlxuICAvL3ZhciB1c2VyVG9rZW4gPSB1c2VyU2VydmljZS5nZXRVc2VySW5mby5zdWI7XG5cbiAgdmFyIHVzZXJUb2tlbiA9ICRhdXRoLmdldFBheWxvYWQoKTtcbiAgdXNlclNlcnZpY2UuZ2V0VXNlckluZm8gPSB1c2VyVG9rZW47XG4gICRzY29wZS51c2VyID0gdXNlclRva2VuLnN1YjtcblxuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3RoZW1lTW9kYWwuaHRtbCcsIHtcbiAgICAgaWQ6ICcxJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWwxID0gbW9kYWw7XG4gICB9KTtcblxuICAgLy8gTW9kYWwgMlxuICAvLyAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCd0YWtlUGljdHVyZU1vZGFsLmh0bWwnLCB7XG4gIC8vICAgIGlkOiAnMicsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAvLyAgICBzY29wZTogJHNjb3BlLFxuICAvLyAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gIC8vICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAvLyAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAvLyAgICAkc2NvcGUub01vZGFsMiA9IG1vZGFsO1xuICAvLyAgfSk7XG4gICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgaWYgKGluZGV4ID09IDEpICRzY29wZS5vTW9kYWwxLnNob3coKTtcbiAgICAgZWxzZSAkc2NvcGUub01vZGFsMi5zaG93KCk7XG4gICB9O1xuXG4gICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgIGlmIChpbmRleCA9PSAxKSAkc2NvcGUub01vZGFsMS5oaWRlKCk7XG4gICAgIGVsc2UgJHNjb3BlLm9Nb2RhbDIuaGlkZSgpO1xuICAgfTtcblxuICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDEucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWwyLnJlbW92ZSgpO1xuXG4gICB9KTtcblxuICAkc2NvcGUudGhlbWUgPSAkc2NvcGUudXNlci51c2VyX3RoZW1lXG4gICRzY29wZS5zZXRUaGVtZSA9IGZ1bmN0aW9uKGNob2ljZSl7XG4gICAgdmFyIGRhdGEgPSB7fVxuICAgIGRhdGEudGhlbWUgPSBjaG9pY2VcbiAgICBkYXRhLnVzZXJJZCA9ICRzY29wZS51c2VyLnVzZXJfaWRfcGs7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgdXNlclNlcnZpY2Uuc2V0VGhlbWUoZGF0YSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgaWYocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApe1xuICAgICAgJHNjb3BlLnRoZW1lID0gY2hvaWNlXG4gICAgICB9XG4gIH0pXG4gIH1cblxuXG4gIHZhciBnZXREYWlseUNob3JlcyA9IGZ1bmN0aW9uKCl7XG4gICAgaWQgPSAkc2NvcGUudXNlci51c2VyX2lkX3BrXG4gICAgdXNlclNlcnZpY2UuZ2V0RGFpbHlDaG9yZXMoaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgJHNjb3BlLmRhaWx5Q2hvcmVzID0gcmVzcG9uc2U7XG4gICAgfSlcbiAgfVxuICAgZ2V0RGFpbHlDaG9yZXMoKVxuICB2YXIgZ2V0V2Vla2x5Q2hvcmVzID0gZnVuY3Rpb24oKXtcbiAgICBpZCA9ICRzY29wZS51c2VyLnVzZXJfaWRfcGtcbiAgICB1c2VyU2VydmljZS5nZXRXZWVrbHlDaG9yZXMoaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgJHNjb3BlLndlZWtseUNob3JlcyA9IHJlc3BvbnNlO1xuICAgIH0pXG4gIH1cbiAgZ2V0V2Vla2x5Q2hvcmVzKClcbiAgdmFyIGdldE1vbnRobHlDaG9yZXMgPSBmdW5jdGlvbigpe1xuICAgIGlkID0gJHNjb3BlLnVzZXIudXNlcl9pZF9wa1xuICAgIHVzZXJTZXJ2aWNlLmdldE1vbnRobHlDaG9yZXMoaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgJHNjb3BlLm1vbnRobHlDaG9yZXMgPSByZXNwb25zZTtcbiAgICB9KVxuICB9XG4gIGdldE1vbnRobHlDaG9yZXMoKVxuXG4gICRzY29wZS5yZXZlYWxlciA9IGZ1bmN0aW9uKCl7XG4gICB0aGlzLmhpZGUgPSAhdGhpcy5oaWRlO1xuICB9XG5cbiAgLy8gJHNjb3BlLmNoZWNrT2ZmY2hvcmUgPSBmdW5jdGlvbihpZCl7XG4gIC8vICAgdXNlclNlcnZpY2UuY2hlY2tPZmZjaG9yZShpZCkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gIC8vICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApe1xuICAvL1xuICAvLyAgICAgfVxuICAvLyAgIH0pXG4gIC8vICB9XG5cblxufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiY2hpbGRMb2dpbkN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkYXV0aCwgJHN0YXRlLCBsb2dpblNlcnZpY2Upe1xuICAvLyAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBjaGlsZCBMb2dpbiBjb250cm9sbGVyXCJcblxuICAgJHNjb3BlLmxvZ2luQ2hpbGQgPSBmdW5jdGlvbih1c2VyKXtcbiAgICAgY29uc29sZS5sb2codXNlcilcbiAgICAgbG9naW5TZXJ2aWNlLnVzZXJMb2dpbih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAkYXV0aC5zZXRUb2tlbihyZXNwb25zZSlcbiAgICAgICAgICRzdGF0ZS5nbygnY2hpbGRIb21lJylcblxuICAgICB9KVxuICAgfVxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJlZGl0Q2hpbGRDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxuICB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiaGlzdG9yeUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gSGlzdG9yeSBjb250cm9sbGVyXCJcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJob21lQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsLHVzZXJTZXJ2aWNlLCR3aW5kb3csICRhdXRoKXtcbnZhciB1c2VyVG9rZW4gPSB1c2VyU2VydmljZS5nZXRVc2VySW5mby5zdWI7XG5jb25zb2xlLmxvZyh1c2VyVG9rZW4pO1xuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdiYW5uZXJNb2RhbC5odG1sJywge1xuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm1vZGFsID0gbW9kYWw7XG4gICB9KTtcbiAgICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAgJHNjb3BlLm1vZGFsLnNob3coKTtcbiAgIH07XG4gICAkc2NvcGUuc3VibWl0QmFubmVyID0gZnVuY3Rpb24oYmFubmVyKXtcbiAgICAgdmFyIGJhbm5lckluZm8gPSB7XG4gICAgICAgdXNlcl9ob3VzZWhvbGQ6dXNlclRva2VuLnVzZXJfaG91c2Vob2xkLFxuICAgICAgIHVzZXJfYmFubmVyX2ltYWdlOmJhbm5lclxuICAgICB9XG4gICAgICB1c2VyU2VydmljZS5wb3N0YmFubmVyKGJhbm5lckluZm8pXG4gICAgICAudGhlbihmdW5jdGlvbihyZXMpe1xuICAgICAkc2NvcGUubW9kYWwuaGlkZSgpO1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWwtYm94XCIpLnZhbHVlID0gJyc7XG4gICAgICAgICAgJHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQodHJ1ZSk7XG4gICAgIH0pO1xuICAgfTtcbiAgICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWwtYm94XCIpLnZhbHVlID0gJyc7XG4gICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gICB9O1xuICAgLy8gQ2xlYW51cCB0aGUgbW9kYWwgd2hlbiB3ZSdyZSBkb25lIHdpdGggaXQhXG4gICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAkc2NvcGUubW9kYWwucmVtb3ZlKCk7XG4gICB9KTtcbiAgIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIGhpZGUgbW9kYWxcbiAgICRzY29wZS4kb24oJ21vZGFsLmhpZGRlbicsIGZ1bmN0aW9uKCkge1xuICAgICAvLyBFeGVjdXRlIGFjdGlvblxuXG4gICB9KTtcbiAgIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIHJlbW92ZSBtb2RhbFxuICAgJHNjb3BlLiRvbignbW9kYWwucmVtb3ZlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAvLyBFeGVjdXRlIGFjdGlvblxuICAgfSk7XG5cbiRzY29wZS5ob3VzZWhvbGQgPSAgdXNlclRva2VuLnVzZXJfaG91c2Vob2xkO1xudXNlclNlcnZpY2UuZ2V0YmFubmVyKHVzZXJUb2tlbi51c2VyX2hvdXNlaG9sZCkudGhlbihmdW5jdGlvbihyZXMpe1xuICAkc2NvcGUuYmFubmVyID0gcmVzLmRhdGFbMF0udXNlcl9iYW5uZXJfaW1hZ2U7XG59KTtcblxuXG51c2VyU2VydmljZS5nZXRXZWF0aGVyKHVzZXJUb2tlbi56aXApXG4udGhlbihmdW5jdGlvbihyZXMpe1xuICAkc2NvcGUud2VhdGhlciA9IHJlcy5kYXRhO1xufSlcblxuXG51c2VyU2VydmljZS5zaG93Y2hpbGQodXNlclRva2VuLnVzZXJfaG91c2Vob2xkKVxuLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgY29uc29sZS5sb2cocmVzLmRhdGEpXG4gICRzY29wZS5zaG93Y2hpbGQgPSByZXMuZGF0YTtcbn0pXG5cblxufSkvL2VuZCBvZiBjb250cm9sbGVyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwibG9naW5DdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGF1dGgsICRzdGF0ZSwgbG9naW5TZXJ2aWNlKXtcblxuJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24odXNlcil7XG4gIC8vIGNvbnNvbGUubG9nKHVzZXIpXG4gIGxvZ2luU2VydmljZS51c2VyTG9naW4odXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgJGF1dGguc2V0VG9rZW4ocmVzcG9uc2UpXG4gICAgICAkc3RhdGUuZ28oJ2hvbWUnKVxuXG4gIH0pXG59XG4kc2NvcGUubWFrZVVzZXIgPSBmdW5jdGlvbihuZXdVc2VyKXtcbiAgbG9naW5TZXJ2aWNlLm1ha2VVc2VyKG5ld1VzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICRhdXRoLnNldFRva2VuKHJlc3BvbnNlKVxuICAgICAgJHN0YXRlLmdvKCdob21lJylcbiAgfSlcbn1cbiAgJHNjb3BlLmF1dGhlbnRpY2F0ZSA9IGZ1bmN0aW9uKHByb3ZpZGVyKSB7XG4gICRhdXRoLmF1dGhlbnRpY2F0ZShwcm92aWRlcil9O1xuICAvLyAkc2NvcGUudGVzdCA9IFwiSGVsbG8gZnJvbSBsb2dpbiBjb250cm9sbGVyXCJcblxuXG4gICRzY29wZS5yZXZlYWxlciA9IGZ1bmN0aW9uKCl7XG4gICRzY29wZS5oaWRlID0gISRzY29wZS5oaWRlO1xuIH1cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJtYWtlQ2hvcmVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxuICB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwic2V0UmV3YXJkc0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCl7XG4gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgncmV3YXJkTW9kYWwuaHRtbCcsIHtcbiAgICBzY29wZTogJHNjb3BlLFxuICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgJHNjb3BlLm1vZGFsID0gbW9kYWw7XG4gIH0pO1xuICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLnNob3coKTtcbiAgfTtcbiAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwuaGlkZSgpO1xuICB9O1xuICAvLyBDbGVhbnVwIHRoZSBtb2RhbCB3aGVuIHdlJ3JlIGRvbmUgd2l0aCBpdCFcbiAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwucmVtb3ZlKCk7XG4gIH0pO1xuICAvLyBFeGVjdXRlIGFjdGlvbiBvbiBoaWRlIG1vZGFsXG4gICRzY29wZS4kb24oJ21vZGFsLmhpZGRlbicsIGZ1bmN0aW9uKCkge1xuICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gIH0pO1xuICAvLyBFeGVjdXRlIGFjdGlvbiBvbiByZW1vdmUgbW9kYWxcbiAgJHNjb3BlLiRvbignbW9kYWwucmVtb3ZlZCcsIGZ1bmN0aW9uKCkge1xuICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gIH0pO1xuICAvL2JhY2tidXR0b25cbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XG4gICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpXG4gIH1cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJzZXR0aW5nc0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCl7XG4gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnY2hhbmdlUGFzc3dvcmQuaHRtbCcsIHtcbiAgICAgaWQ6ICcxJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWwxID0gbW9kYWw7XG4gICB9KTtcblxuICAgLy8gTW9kYWwgMlxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdjaGFuZ2VIb3VzZWhvbGQuaHRtbCcsIHtcbiAgICAgaWQ6ICcyJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWwyID0gbW9kYWw7XG4gICB9KTtcblxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdjaGFuZ2VaaXAuaHRtbCcsIHtcbiAgICAgaWQ6ICczJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWwzID0gbW9kYWw7XG4gICB9KTtcblxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdhZGRQYXJlbnQuaHRtbCcsIHtcbiAgICAgaWQ6ICc0JywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWw0ID0gbW9kYWw7XG4gICB9KTtcblxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdyZW1vdmVDaGlsZC5odG1sJywge1xuICAgICBpZDogJzUnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDUgPSBtb2RhbDtcbiAgIH0pO1xuXG5cblxuICAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgIGlmIChpbmRleCA9PSAxKSAkc2NvcGUub01vZGFsMS5zaG93KCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMikgJHNjb3BlLm9Nb2RhbDIuc2hvdygpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDMpICRzY29wZS5vTW9kYWwzLnNob3coKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSA0KSAkc2NvcGUub01vZGFsNC5zaG93KCk7XG4gICAgIGVsc2UgJHNjb3BlLm9Nb2RhbDUuc2hvdygpO1xuICAgfTtcblxuICAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICBpZiAoaW5kZXggPT0gMSkgJHNjb3BlLm9Nb2RhbDEuaGlkZSgpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDIpICRzY29wZS5vTW9kYWwyLmhpZGUoKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSAzKSAkc2NvcGUub01vZGFsMy5oaWRlKCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gNCkgJHNjb3BlLm9Nb2RhbDQuaGlkZSgpO1xuICAgICBlbHNlICRzY29wZS5vTW9kYWw1LmhpZGUoKTtcbiAgIH07XG5cbiAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICRzY29wZS5vTW9kYWwxLnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsMi5yZW1vdmUoKTtcbiAgICAgJHNjb3BlLm9Nb2RhbDMucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWw0LnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsNS5yZW1vdmUoKTtcbiAgIH0pO1xuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcInRyYWNrZXJDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwpe1xuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3BpY0NvbmZNb2RhbC5odG1sJywge1xuICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAkc2NvcGUubW9kYWwgPSBtb2RhbDtcbiAgfSk7XG4gICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwuc2hvdygpO1xuICB9O1xuICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gIH07XG4gIC8vIENsZWFudXAgdGhlIG1vZGFsIHdoZW4gd2UncmUgZG9uZSB3aXRoIGl0IVxuICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5yZW1vdmUoKTtcbiAgfSk7XG4gIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIGhpZGUgbW9kYWxcbiAgJHNjb3BlLiRvbignbW9kYWwuaGlkZGVuJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgfSk7XG4gIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIHJlbW92ZSBtb2RhbFxuICAkc2NvcGUuJG9uKCdtb2RhbC5yZW1vdmVkJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgfSk7XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwidXNlckluZm9DdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIGluZm8gY29udHJvbGxlclwiXG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5zZXJ2aWNlKFwiY2hvcmVTZXJ2aWNlXCIsIGZ1bmN0aW9uKCRodHRwLCRxLCRhdXRoKXtcblxudGhpcy5nZXRVc2VySW5mbyA9ICRhdXRoLmdldFBheWxvYWQoKTtcblxuXG50aGlzLmdldENoaWxkcmVuID0gZnVuY3Rpb24oaG91c2Vob2xkKXtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6XCJHRVRcIixcbiAgICB1cmw6XCIvY2hpbGRyZW4vXCIgKyBob3VzZWhvbGRcbiAgfSlcbn1cblxudGhpcy5jcmVhdGVDaG9yZSA9IGZ1bmN0aW9uKGNob3JlKXtcbiAgY29uc29sZS5sb2coJ2hvdyBtYW55IHRpbWVzJylcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6XCJQT1NUXCIsXG4gICAgdXJsOlwiL2Fzc2lnbmNob3JlXCIsXG4gICAgZGF0YTpjaG9yZVxuICB9KVxufVxuXG5cblxuXG59KS8vZW5kIG9mIHNlcnZpY2VcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLnNlcnZpY2UoJ2xvZ2luU2VydmljZScsIGZ1bmN0aW9uKCRodHRwKXtcblxuXG4gIHRoaXMudXNlckxvZ2luID0gZnVuY3Rpb24odXNlcikge1xuICAgIGNvbnNvbGUubG9nKHVzZXIsIFwic2VydmljZVwiKVxuICAgIHJldHVybiAkaHR0cCh7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgdXJsOiAnL2F1dGgvbG9naW4nLFxuICAgICAgZGF0YTogdXNlclxuICAgIH0pXG4gIH1cbiAgdGhpcy5tYWtlVXNlciA9IGZ1bmN0aW9uKG5ld1VzZXIpIHtcbiAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIHVybDogJy9hdXRoL3NpZ251cCcsXG4gICAgICBkYXRhOiBuZXdVc2VyXG4gICAgfSlcbiAgfVxufSkgLy8gZW5kIG9mIHNlcnZpY2VcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLnNlcnZpY2UoJ3VzZXJTZXJ2aWNlJywgZnVuY3Rpb24oJGh0dHAsJHEsJGF1dGgpe1xuXG52YXIgYmFubmVyO1xuXG50aGlzLmdldFVzZXJJbmZvID0gJGF1dGguZ2V0UGF5bG9hZCgpO1xudmFyIHRoZW1lO1xuXG5cbnRoaXMucG9zdGJhbm5lciA9IGZ1bmN0aW9uKGJhbm5lcil7XG4gIGNvbnNvbGUubG9nKGJhbm5lcik7XG4gIGNvbnNvbGUubG9nKGJhbm5lci51c2VyX2Jhbm5lcl9pbWFnZSk7XG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgIHVybDpcIi9iYW5uZXIvXCIgKyBiYW5uZXIudXNlcl9ob3VzZWhvbGQsXG4gICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe3VzZXJfYmFubmVyX2ltYWdlOmJhbm5lci51c2VyX2Jhbm5lcl9pbWFnZX0pXG4gIH0pXG59XG5cbnRoaXMuZ2V0YmFubmVyID0gZnVuY3Rpb24odXNlcklkKXtcbiAgY29uc29sZS5sb2codXNlcklkKTtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgdXJsOlwiL2Jhbm5lci9cIiArIHVzZXJJZFxuICB9KVxufVxuXG5cbnRoaXMuZ2V0V2VhdGhlciA9IGZ1bmN0aW9uKGxvY2F0aW9uKXtcbnJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIHVybDonaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPXppcD0nK2xvY2F0aW9uKycmdW5pdHM9aW1wZXJpYWwmYXBwaWQ9YzEwZWY5OWM1YWZkZWUzZmRmYmE3OGU4Yzk4MWE5YjYnXG4gIH0pXG5cbn07XG5cblxuIHRoaXMuc2V0VGhlbWUgPSBmdW5jdGlvbihkYXRhKXtcbiAgIHJldHVybiAkaHR0cCh7XG4gICAgIG1ldGhvZDogJ1B1dCcsXG4gICAgIHVybDpcIi90aGVtZVwiLFxuICAgICBkYXRhOiBkYXRhXG4gICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICB0aGVtZSA9IHJlcy5kYXRhWzBdLnVzZXJfdGhlbWVcbiAgICAgICByZXR1cm4gcmVzO1xuICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuIH0pXG4gfVxuXG50aGlzLmFkZENoaWxkID0gZnVuY3Rpb24oY2hpbGQpe1xuICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShjaGlsZCkpO1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDpcIlBPU1RcIixcbiAgICB1cmw6XCIvY2hpbGRyZW5cIixcbiAgICBkYXRhOiBjaGlsZFxuICB9KVxufVxuXG5cbnRoaXMuc2hvd2NoaWxkID0gZnVuY3Rpb24oaG91c2Vob2xkKXtcbnJldHVybiAkaHR0cCh7XG4gIG1ldGhvZDpcIkdFVFwiLFxuICB1cmw6XCIvY2hpbGRyZW4vXCIgKyBob3VzZWhvbGRcbn0pXG59XG5cbnRoaXMuZ2V0UmV3YXJkcyA9IGZ1bmN0aW9uKGlkKXtcbiAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgbWV0aG9kOiBcIkdldFwiLFxuICAgICAgdXJsOicvY2hpbGRyZXdhcmRzLycgKyBpZCxcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICByZXR1cm4gcmVzLmRhdGE7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgfSlcblxufVxuXG4gIHRoaXMucmV0dXJuVGhlbWUgPSBmdW5jdGlvbigpe1xuICAgIHJldHVybiB0aGVtZTtcbiAgfVxuXG5cbnRoaXMuZ2V0RGFpbHlDaG9yZXMgPSBmdW5jdGlvbihpZCl7XG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOiBcIkdldFwiLFxuICAgIHVybDonL2RhaWx5Y2hvcmUvJyArIGlkLFxuICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgY29uc29sZS5sb2coZXJyKTtcbn0pXG59XG5cbnRoaXMuZ2V0V2Vla2x5Q2hvcmVzID0gZnVuY3Rpb24oaWQpe1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDogXCJHZXRcIixcbiAgICB1cmw6Jy93ZWVrbHljaG9yZS8nICsgaWQsXG4gIH0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICByZXR1cm4gcmVzLmRhdGE7XG4gIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICBjb25zb2xlLmxvZyhlcnIpO1xufSlcbn1cblxudGhpcy5nZXRNb250aGx5Q2hvcmVzID0gZnVuY3Rpb24oaWQpe1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDogXCJHZXRcIixcbiAgICB1cmw6Jy9tb250aGx5Y2hvcmUvJyArIGlkLFxuICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgY29uc29sZS5sb2coZXJyKTtcbn0pXG59XG4gdGhpcy5jaGVja09mZmNob3JlID0gZnVuY3Rpb24oaWQpe1xuICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgICB1cmw6Jy9jb21wbGV0ZWQvJyArIGlkXG4gICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICB9KVxuICAgfVxuXG59KTsvL2VuZCBvZiBzZXJ2aWNlXG4iXX0=
