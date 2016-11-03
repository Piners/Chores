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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInNlcnZpY2UvY2hvcmVTZXJ2aWNlLmpzIiwic2VydmljZS9sb2dpblNlcnZpY2UuanMiLCJzZXJ2aWNlL3VzZXJTZXJ2aWNlLmpzIiwiY29udHJvbGxlcnMvYWRkQ2hpbGRDdHJsLmpzIiwiY29udHJvbGxlcnMvYXNzaWduQ2hvcmVDdHJsLmpzIiwiY29udHJvbGxlcnMvY2FtZXJhQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NoaWxkQmFua0N0cmwuanMiLCJjb250cm9sbGVycy9jaGlsZEhvbWVDdHJsLmpzIiwiY29udHJvbGxlcnMvY2hpbGRMb2dpbkN0cmwuanMiLCJjb250cm9sbGVycy9lZGl0Q2hpbGRDdHJsLmpzIiwiY29udHJvbGxlcnMvaGlzdG9yeUN0cmwuanMiLCJjb250cm9sbGVycy9ob21lQ3RybC5qcyIsImNvbnRyb2xsZXJzL2xvZ2luQ3RybC5qcyIsImNvbnRyb2xsZXJzL21ha2VDaG9yZUN0cmwuanMiLCJjb250cm9sbGVycy9zZXRSZXdhcmRzQ3RybC5qcyIsImNvbnRyb2xsZXJzL3NldHRpbmdzQ3RybC5qcyIsImNvbnRyb2xsZXJzL3RyYWNrZXJDdHJsLmpzIiwiY29udHJvbGxlcnMvdXNlckluZm9DdHJsLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsIiR1cmxSb3V0ZXJQcm92aWRlciIsIiRhdXRoUHJvdmlkZXIiLCJvdGhlcndpc2UiLCJzdGF0ZSIsInVybCIsInRlbXBsYXRlVXJsIiwiY29udHJvbGxlciIsImZhY2Vib29rIiwiY2xpZW50SWQiLCJyZXNwb25zZVR5cGUiLCJnb29nbGUiLCJydW4iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5Iiwid2luZG93IiwiY29yZG92YSIsInBsdWdpbnMiLCJLZXlib2FyZCIsImhpZGVLZXlib2FyZEFjY2Vzc29yeUJhciIsImRpc2FibGVTY3JvbGwiLCJTdGF0dXNCYXIiLCJzdHlsZURlZmF1bHQiLCJzZXJ2aWNlIiwiJGh0dHAiLCIkcSIsIiRhdXRoIiwiZ2V0VXNlckluZm8iLCJnZXRQYXlsb2FkIiwiZ2V0Q2hpbGRyZW4iLCJob3VzZWhvbGQiLCJtZXRob2QiLCJjcmVhdGVDaG9yZSIsImNob3JlIiwiZGF0YSIsInVzZXJMb2dpbiIsInVzZXIiLCJjb25zb2xlIiwibG9nIiwibWFrZVVzZXIiLCJuZXdVc2VyIiwiYmFubmVyIiwidGhlbWUiLCJwb3N0YmFubmVyIiwidXNlcl9iYW5uZXJfaW1hZ2UiLCJ1c2VyX2hvdXNlaG9sZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJnZXRiYW5uZXIiLCJ1c2VySWQiLCJnZXRXZWF0aGVyIiwic2V0VGhlbWUiLCJ0aGVuIiwicmVzIiwidXNlcl90aGVtZSIsImNhdGNoIiwiZXJyIiwiYWRkQ2hpbGQiLCJjaGlsZCIsInNob3djaGlsZCIsImdldFJld2FyZHMiLCJpZCIsInJldHVyblRoZW1lIiwiZ2V0RGFpbHlDaG9yZXMiLCJnZXRXZWVrbHlDaG9yZXMiLCJnZXRNb250aGx5Q2hvcmVzIiwiY2hlY2tPZmZjaG9yZSIsImdldENoaWxkIiwiJHNjb3BlIiwidXNlclNlcnZpY2UiLCIkc3RhdGUiLCJnb2JhY2siLCJoaXN0b3J5IiwiZ28iLCJzdWIiLCJzdWJtaXRDaGlsZCIsImNob3JlU2VydmljZSIsImN1cnJlbnRVc2VyIiwiY2hpbGRzIiwidmFsdWVzIiwiY2hvcmVfZGFpbHkiLCJjaG9yZV93ZWVrbHkiLCJjaG9yZV9tb250aGx5Iiwic3VibWl0Q2hvcmUiLCJ1c2VyX2hvdXNlaG9sZF9mayIsIiRjb3Jkb3ZhQ2FtZXJhIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiJGNvcmRvdmFQbHVnaW4iLCJzb21lRnVuY3Rpb24iLCJzdWNjZXNzIiwiZXJyb3IiLCJ0YWtlUGljdHVyZSIsIm9wdGlvbnMiLCJxdWFsaXR5IiwiZGVzdGluYXRpb25UeXBlIiwiQ2FtZXJhIiwiRGVzdGluYXRpb25UeXBlIiwiREFUQV9VUkwiLCJzb3VyY2VUeXBlIiwiUGljdHVyZVNvdXJjZVR5cGUiLCJDQU1FUkEiLCJhbGxvd0VkaXQiLCJlbmNvZGluZ1R5cGUiLCJFbmNvZGluZ1R5cGUiLCJKUEVHIiwidGFyZ2V0V2lkdGgiLCJ0YXJnZXRIZWlnaHQiLCJwb3BvdmVyT3B0aW9ucyIsIkNhbWVyYVBvcG92ZXJPcHRpb25zIiwic2F2ZVRvUGhvdG9BbGJ1bSIsImNvcnJlY3RPcmllbnRhdGlvbiIsImdldFBpY3R1cmUiLCJpbWFnZURhdGEiLCJpbWdVUkkiLCJ1c2VyVG9rZW4iLCIkb24iLCJnZXRUaGVtZSIsInRoZW1lSW1hZ2UiLCJ1c2VyX2lkX3BrIiwicmVzcG9uc2UiLCJyZXdhcmRzIiwiJGlvbmljTW9kYWwiLCJmcm9tVGVtcGxhdGVVcmwiLCJzY29wZSIsImJhY2tkcm9wQ2xpY2tUb0Nsb3NlIiwiYW5pbWF0aW9uIiwibW9kYWwiLCJvTW9kYWwxIiwib3Blbk1vZGFsIiwiaW5kZXgiLCJzaG93Iiwib01vZGFsMiIsImNsb3NlTW9kYWwiLCJoaWRlIiwicmVtb3ZlIiwiY2hvaWNlIiwic3RhdHVzIiwiZGFpbHlDaG9yZXMiLCJ3ZWVrbHlDaG9yZXMiLCJtb250aGx5Q2hvcmVzIiwicmV2ZWFsZXIiLCJsb2dpblNlcnZpY2UiLCJsb2dpbkNoaWxkIiwic2V0VG9rZW4iLCJ0ZXN0IiwiJHdpbmRvdyIsInN1Ym1pdEJhbm5lciIsImJhbm5lckluZm8iLCJnZXRFbGVtZW50QnlJZCIsInZhbHVlIiwibG9jYXRpb24iLCJyZWxvYWQiLCJ6aXAiLCJ3ZWF0aGVyIiwibG9naW4iLCJhdXRoZW50aWNhdGUiLCJwcm92aWRlciIsIm9Nb2RhbDMiLCJvTW9kYWw0Iiwib01vZGFsNSIsInBhcmFtcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUFBLFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCLENBQUMsT0FBRCxFQUFVLFlBQVYsQ0FBeEIsRUFDQ0MsTUFERCxDQUNRLFVBQVNDLGNBQVQsRUFBeUJDLGtCQUF6QixFQUE2Q0MsYUFBN0MsRUFBMkQ7QUFDakVELHFCQUFtQkUsU0FBbkIsQ0FBNkIsUUFBN0I7QUFDQUgsaUJBQ0NJLEtBREQsQ0FDTyxVQURQLEVBQ2tCO0FBQ2hCQyxTQUFJLFdBRFk7QUFFaEJDLGlCQUFhLDJCQUZHO0FBR2hCQyxnQkFBWTtBQUhJLEdBRGxCLEVBTUNILEtBTkQsQ0FNTyxhQU5QLEVBTXFCO0FBQ25CQyxTQUFJLGNBRGU7QUFFbkJDLGlCQUFhLDhCQUZNO0FBR25CQyxnQkFBWTtBQUhPLEdBTnJCLEVBV0NILEtBWEQsQ0FXTyxXQVhQLEVBV21CO0FBQ2pCQyxTQUFJLGdCQURhO0FBRWpCQyxpQkFBYSw0QkFGSTtBQUdqQkMsZ0JBQVk7QUFISyxHQVhuQixFQWdCQ0gsS0FoQkQsQ0FnQk8sU0FoQlAsRUFnQmlCO0FBQ2ZDLFNBQUksVUFEVztBQUVmQyxpQkFBYSwwQkFGRTtBQUdmQyxnQkFBWTtBQUhHLEdBaEJqQixFQXFCQ0gsS0FyQkQsQ0FxQk8sTUFyQlAsRUFxQmM7QUFDWkMsU0FBSSxPQURRO0FBRVpDLGlCQUFhLHVCQUZEO0FBR1pDLGdCQUFZO0FBSEEsR0FyQmQsRUEwQkNILEtBMUJELENBMEJPLE9BMUJQLEVBMEJlO0FBQ2JDLFNBQUksUUFEUztBQUViQyxpQkFBYSx3QkFGQTtBQUdiQyxnQkFBWTtBQUhDLEdBMUJmLEVBK0JDSCxLQS9CRCxDQStCTyxXQS9CUCxFQStCbUI7QUFDakJDLFNBQUksWUFEYTtBQUVqQkMsaUJBQWEsNEJBRkk7QUFHakJDLGdCQUFZO0FBSEssR0EvQm5CLEVBb0NDSCxLQXBDRCxDQW9DTyxZQXBDUCxFQW9Db0I7QUFDbEJDLFNBQUksaUJBRGM7QUFFbEJDLGlCQUFhLDZCQUZLO0FBR2xCQyxnQkFBWTtBQUhNLEdBcENwQixFQXlDQ0gsS0F6Q0QsQ0F5Q08sVUF6Q1AsRUF5Q2tCO0FBQ2hCQyxTQUFJLFdBRFk7QUFFaEJDLGlCQUFhLDJCQUZHO0FBR2hCQyxnQkFBWTtBQUhJLEdBekNsQixFQThDQ0gsS0E5Q0QsQ0E4Q08sU0E5Q1AsRUE4Q2lCO0FBQ2ZDLFNBQUksY0FEVztBQUVmQyxpQkFBYSwwQkFGRTtBQUdmQyxnQkFBWTtBQUhHLEdBOUNqQixFQW1EQ0gsS0FuREQsQ0FtRE8sVUFuRFAsRUFtRGtCO0FBQ2hCQyxTQUFJLFdBRFk7QUFFaEJDLGlCQUFhLDJCQUZHO0FBR2hCQyxnQkFBWTtBQUhJLEdBbkRsQixFQXdEQ0gsS0F4REQsQ0F3RE8sV0F4RFAsRUF3RG1CO0FBQ2pCQyxTQUFJLGFBRGE7QUFFakJDLGlCQUFhLDRCQUZJO0FBR2pCQyxnQkFBWTtBQUhLLEdBeERuQixFQTZEQ0gsS0E3REQsQ0E2RE8sV0E3RFAsRUE2RG1CO0FBQ2pCQyxTQUFJLGFBRGE7QUFFakJDLGlCQUFhLDRCQUZJO0FBR2pCQyxnQkFBWTtBQUhLLEdBN0RuQixFQWtFQ0gsS0FsRUQsQ0FrRU8sWUFsRVAsRUFrRW9CO0FBQ2xCQyxTQUFJLGNBRGM7QUFFbEJDLGlCQUFhLDZCQUZLO0FBR2xCQyxnQkFBWTtBQUhNLEdBbEVwQjs7QUF3RUFMLGdCQUFjTSxRQUFkLENBQXVCO0FBQ3JCQyxjQUFVO0FBRFcsR0FBdkI7O0FBSUE7QUFDQVAsZ0JBQWNNLFFBQWQsQ0FBdUI7QUFDckJDLGNBQVUsaUJBRFc7QUFFckJDLGtCQUFjO0FBRk8sR0FBdkI7O0FBS0FSLGdCQUFjUyxNQUFkLENBQXFCO0FBQ25CRixjQUFVLDBFQURTO0FBRW5CSixTQUFLO0FBRmMsR0FBckI7QUFJRCxDQXpGRCxFQTZGQ08sR0E3RkQsQ0E2RkssVUFBU0MsY0FBVCxFQUF5QjtBQUM1QkEsaUJBQWVDLEtBQWYsQ0FBcUIsWUFBVztBQUM5QixRQUFHQyxPQUFPQyxPQUFQLElBQWtCRCxPQUFPQyxPQUFQLENBQWVDLE9BQWYsQ0FBdUJDLFFBQTVDLEVBQXNEO0FBQ3BEO0FBQ0E7QUFDQUYsY0FBUUMsT0FBUixDQUFnQkMsUUFBaEIsQ0FBeUJDLHdCQUF6QixDQUFrRCxJQUFsRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQUgsY0FBUUMsT0FBUixDQUFnQkMsUUFBaEIsQ0FBeUJFLGFBQXpCLENBQXVDLElBQXZDO0FBQ0Q7QUFDRCxRQUFHTCxPQUFPTSxTQUFWLEVBQXFCO0FBQ25CQSxnQkFBVUMsWUFBVjtBQUNEO0FBQ0YsR0FkRDtBQWVELENBN0dEOzs7QUNOQXpCLFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCeUIsT0FBeEIsQ0FBZ0MsY0FBaEMsRUFBZ0QsVUFBU0MsS0FBVCxFQUFlQyxFQUFmLEVBQWtCQyxLQUFsQixFQUF3Qjs7QUFFeEUsT0FBS0MsV0FBTCxHQUFtQkQsTUFBTUUsVUFBTixFQUFuQjs7QUFHQSxPQUFLQyxXQUFMLEdBQW1CLFVBQVNDLFNBQVQsRUFBbUI7QUFDcEMsV0FBT04sTUFBTTtBQUNYTyxjQUFPLEtBREk7QUFFWDFCLFdBQUksZUFBZXlCO0FBRlIsS0FBTixDQUFQO0FBSUQsR0FMRDs7QUFPQSxPQUFLRSxXQUFMLEdBQW1CLFVBQVNDLEtBQVQsRUFBZTtBQUNoQyxXQUFPVCxNQUFNO0FBQ1hPLGNBQU8sTUFESTtBQUVYMUIsV0FBSSxjQUZPO0FBR1g2QixZQUFLRDtBQUhNLEtBQU4sQ0FBUDtBQUtELEdBTkQ7QUFXQyxDQXZCRCxHQXVCRTs7O0FDdkJGcEMsUUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0J5QixPQUF4QixDQUFnQyxjQUFoQyxFQUFnRCxVQUFTQyxLQUFULEVBQWU7O0FBRzdELE9BQUtXLFNBQUwsR0FBaUIsVUFBU0MsSUFBVCxFQUFlO0FBQzlCQyxZQUFRQyxHQUFSLENBQVlGLElBQVosRUFBa0IsU0FBbEI7QUFDQSxXQUFPWixNQUFNO0FBQ1hPLGNBQVEsTUFERztBQUVYMUIsV0FBSyxhQUZNO0FBR1g2QixZQUFNRTtBQUhLLEtBQU4sQ0FBUDtBQUtELEdBUEQ7QUFRQSxPQUFLRyxRQUFMLEdBQWdCLFVBQVNDLE9BQVQsRUFBa0I7QUFDaEMsV0FBT2hCLE1BQU07QUFDWE8sY0FBUSxNQURHO0FBRVgxQixXQUFLLGNBRk07QUFHWDZCLFlBQU1NO0FBSEssS0FBTixDQUFQO0FBS0QsR0FORDtBQU9ELENBbEJELEdBa0JHOzs7QUNsQkgzQyxRQUFRQyxNQUFSLENBQWUsT0FBZixFQUF3QnlCLE9BQXhCLENBQWdDLGFBQWhDLEVBQStDLFVBQVNDLEtBQVQsRUFBZUMsRUFBZixFQUFrQkMsS0FBbEIsRUFBd0I7O0FBRXZFLE1BQUllLE1BQUo7O0FBRUEsT0FBS2QsV0FBTDtBQUNBLE1BQUllLEtBQUo7O0FBR0EsT0FBS0MsVUFBTCxHQUFrQixVQUFTRixNQUFULEVBQWdCO0FBQ2hDSixZQUFRQyxHQUFSLENBQVlHLE1BQVo7QUFDQUosWUFBUUMsR0FBUixDQUFZRyxPQUFPRyxpQkFBbkI7QUFDQSxXQUFPcEIsTUFBTTtBQUNYTyxjQUFRLEtBREc7QUFFWDFCLFdBQUksYUFBYW9DLE9BQU9JLGNBRmI7QUFHWFgsWUFBTVksS0FBS0MsU0FBTCxDQUFlLEVBQUNILG1CQUFrQkgsT0FBT0csaUJBQTFCLEVBQWY7QUFISyxLQUFOLENBQVA7QUFLRCxHQVJEOztBQVVBLE9BQUtJLFNBQUwsR0FBaUIsVUFBU0MsTUFBVCxFQUFnQjtBQUMvQlosWUFBUUMsR0FBUixDQUFZVyxNQUFaO0FBQ0EsV0FBT3pCLE1BQU07QUFDWE8sY0FBUSxLQURHO0FBRVgxQixXQUFJLGFBQWE0QztBQUZOLEtBQU4sQ0FBUDtBQUlELEdBTkQ7O0FBU0EsT0FBS0MsVUFBTCxHQUFrQixZQUFVO0FBQzVCLFdBQU8xQixNQUFNO0FBQ1RPLGNBQVEsS0FEQztBQUVUMUIsV0FBSTtBQUZLLEtBQU4sQ0FBUDtBQUtDLEdBTkQ7O0FBU0MsT0FBSzhDLFFBQUwsR0FBZ0IsVUFBU2pCLElBQVQsRUFBYztBQUM1QixXQUFPVixNQUFNO0FBQ1hPLGNBQVEsS0FERztBQUVYMUIsV0FBSSxRQUZPO0FBR1g2QixZQUFNQTtBQUhLLEtBQU4sRUFJSmtCLElBSkksQ0FJQyxVQUFTQyxHQUFULEVBQWM7QUFDcEJYLGNBQVFXLElBQUluQixJQUFKLENBQVMsQ0FBVCxFQUFZb0IsVUFBcEI7QUFDRSxhQUFPRCxHQUFQO0FBQ0gsS0FQTSxFQU9KRSxLQVBJLENBT0UsVUFBU0MsR0FBVCxFQUFjO0FBQ3BCbkIsY0FBUUMsR0FBUixDQUFZa0IsR0FBWjtBQUNKLEtBVFEsQ0FBUDtBQVVELEdBWEQ7O0FBYUQsT0FBS0MsUUFBTCxHQUFnQixVQUFTQyxLQUFULEVBQWU7QUFDN0JyQixZQUFRQyxHQUFSLENBQVlRLEtBQUtDLFNBQUwsQ0FBZVcsS0FBZixDQUFaO0FBQ0EsV0FBT2xDLE1BQU07QUFDWE8sY0FBTyxNQURJO0FBRVgxQixXQUFJLFdBRk87QUFHWDZCLFlBQU13QjtBQUhLLEtBQU4sQ0FBUDtBQUtELEdBUEQ7O0FBVUEsT0FBS0MsU0FBTCxHQUFpQixVQUFTN0IsU0FBVCxFQUFtQjtBQUNwQyxXQUFPTixNQUFNO0FBQ1hPLGNBQU8sS0FESTtBQUVYMUIsV0FBSSxlQUFleUI7QUFGUixLQUFOLENBQVA7QUFJQyxHQUxEOztBQU9BLE9BQUs4QixVQUFMLEdBQWtCLFVBQVNDLEVBQVQsRUFBWTtBQUMxQixXQUFPckMsTUFBTTtBQUNYTyxjQUFRLEtBREc7QUFFWDFCLFdBQUksbUJBQW1Cd0Q7QUFGWixLQUFOLEVBR0pULElBSEksQ0FHQyxVQUFTQyxHQUFULEVBQWM7QUFDbEIsYUFBT0EsSUFBSW5CLElBQVg7QUFDSCxLQUxNLEVBS0pxQixLQUxJLENBS0UsVUFBU0MsR0FBVCxFQUFjO0FBQ3BCbkIsY0FBUUMsR0FBUixDQUFZa0IsR0FBWjtBQUNKLEtBUFEsQ0FBUDtBQVNILEdBVkQ7O0FBWUUsT0FBS00sV0FBTCxHQUFtQixZQUFVO0FBQzNCLFdBQU9wQixLQUFQO0FBQ0QsR0FGRDs7QUFLRixPQUFLcUIsY0FBTCxHQUFzQixVQUFTRixFQUFULEVBQVk7QUFDaEMsV0FBT3JDLE1BQU07QUFDWE8sY0FBUSxLQURHO0FBRVgxQixXQUFJLGlCQUFpQndEO0FBRlYsS0FBTixFQUdKVCxJQUhJLENBR0MsVUFBU0MsR0FBVCxFQUFjO0FBQ2xCLGFBQU9BLElBQUluQixJQUFYO0FBQ0gsS0FMTSxFQUtKcUIsS0FMSSxDQUtFLFVBQVNDLEdBQVQsRUFBYztBQUNwQm5CLGNBQVFDLEdBQVIsQ0FBWWtCLEdBQVo7QUFDSixLQVBRLENBQVA7QUFRRCxHQVREOztBQVdBLE9BQUtRLGVBQUwsR0FBdUIsVUFBU0gsRUFBVCxFQUFZO0FBQ2pDLFdBQU9yQyxNQUFNO0FBQ1hPLGNBQVEsS0FERztBQUVYMUIsV0FBSSxrQkFBa0J3RDtBQUZYLEtBQU4sRUFHSlQsSUFISSxDQUdDLFVBQVNDLEdBQVQsRUFBYztBQUNsQixhQUFPQSxJQUFJbkIsSUFBWDtBQUNILEtBTE0sRUFLSnFCLEtBTEksQ0FLRSxVQUFTQyxHQUFULEVBQWM7QUFDcEJuQixjQUFRQyxHQUFSLENBQVlrQixHQUFaO0FBQ0osS0FQUSxDQUFQO0FBUUQsR0FURDs7QUFXQSxPQUFLUyxnQkFBTCxHQUF3QixVQUFTSixFQUFULEVBQVk7QUFDbEMsV0FBT3JDLE1BQU07QUFDWE8sY0FBUSxLQURHO0FBRVgxQixXQUFJLG1CQUFtQndEO0FBRlosS0FBTixFQUdKVCxJQUhJLENBR0MsVUFBU0MsR0FBVCxFQUFjO0FBQ2xCLGFBQU9BLElBQUluQixJQUFYO0FBQ0gsS0FMTSxFQUtKcUIsS0FMSSxDQUtFLFVBQVNDLEdBQVQsRUFBYztBQUNwQm5CLGNBQVFDLEdBQVIsQ0FBWWtCLEdBQVo7QUFDSixLQVBRLENBQVA7QUFRRCxHQVREO0FBVUMsT0FBS1UsYUFBTCxHQUFxQixVQUFTTCxFQUFULEVBQVk7QUFDN0IsV0FBT3JDLE1BQU07QUFDWE8sY0FBUSxLQURHO0FBRVgxQixXQUFJLGdCQUFnQndEO0FBRlQsS0FBTixFQUdKVCxJQUhJLENBR0MsVUFBU0MsR0FBVCxFQUFhO0FBQ25CLGFBQU9BLEdBQVA7QUFDRCxLQUxNLEVBS0pFLEtBTEksQ0FLRSxVQUFVQyxHQUFWLEVBQWM7QUFDckJuQixjQUFRQyxHQUFSLENBQVlrQixHQUFaO0FBQ0QsS0FQTSxDQUFQO0FBUUQsR0FUSDtBQVVELE9BQUtXLFFBQUwsR0FBZ0IsVUFBU04sRUFBVCxFQUFZO0FBQzFCLFdBQU9yQyxNQUFNO0FBQ1hPLGNBQVEsS0FERztBQUVYMUIsV0FBSyxZQUFXd0Q7QUFGTCxLQUFOLEVBR0pULElBSEksQ0FHQyxVQUFTQyxHQUFULEVBQWE7QUFDbkIsYUFBT0EsSUFBSW5CLElBQVg7QUFDRCxLQUxNLENBQVA7QUFNRCxHQVBEO0FBU0MsQ0F0SUQsR0FzSUc7OztBQ3RJSHJDLFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCUyxVQUF4QixDQUFtQyxjQUFuQyxFQUFtRCxVQUFTNkQsTUFBVCxFQUFnQkMsV0FBaEIsRUFBNEJDLE1BQTVCLEVBQW1DO0FBQ3BGO0FBQ0FGLFNBQU9HLE1BQVAsR0FBZ0IsWUFBVTtBQUN4QnhELFdBQU95RCxPQUFQLENBQWVDLEVBQWYsQ0FBa0IsQ0FBQyxDQUFuQjtBQUNELEdBRkQ7QUFHRixNQUFJckMsT0FBT2lDLFlBQVkxQyxXQUFaLENBQXdCK0MsR0FBbkM7QUFDQXJDLFVBQVFDLEdBQVIsQ0FBWUYsSUFBWjtBQUNBZ0MsU0FBT08sV0FBUCxHQUFxQixVQUFTakIsS0FBVCxFQUFlO0FBQ2xDQSxVQUFNYixjQUFOLEdBQXVCVCxLQUFLUyxjQUE1QjtBQUNBUixZQUFRQyxHQUFSLENBQVlvQixLQUFaO0FBQ0FXLGdCQUFZWixRQUFaLENBQXFCQyxLQUFyQixFQUNDTixJQURELENBQ00sVUFBU0MsR0FBVCxFQUFhO0FBQ2pCaUIsYUFBT0csRUFBUCxDQUFVLE1BQVY7QUFDRCxLQUhEO0FBS0QsR0FSRDtBQWNDLENBckJELEdBcUJHOzs7QUNyQkg1RSxRQUFRQyxNQUFSLENBQWUsT0FBZixFQUF3QlMsVUFBeEIsQ0FBbUMsaUJBQW5DLEVBQXNELFVBQVM2RCxNQUFULEVBQWdCUSxZQUFoQixFQUE2Qk4sTUFBN0IsRUFBb0M7O0FBRTFGLE1BQUlPLGNBQWNELGFBQWFqRCxXQUFiLENBQXlCK0MsR0FBM0M7O0FBR0FFLGVBQWEvQyxXQUFiLENBQXlCZ0QsWUFBWWhDLGNBQXJDLEVBQ0NPLElBREQsQ0FDTSxVQUFTQyxHQUFULEVBQWE7QUFDakI7QUFDQWUsV0FBT1UsTUFBUCxHQUFnQnpCLElBQUluQixJQUFwQjtBQUNBRyxZQUFRQyxHQUFSLENBQVllLElBQUluQixJQUFoQjtBQUNELEdBTEQ7O0FBUUFrQyxTQUFPVyxNQUFQLEdBQWdCLEVBQWhCOztBQUVBWCxTQUFPbkMsS0FBUCxHQUFlO0FBQ2YrQyxpQkFBYSxLQURFO0FBRWZDLGtCQUFjLEtBRkM7QUFHZkMsbUJBQWM7QUFIQyxHQUFmOztBQU1BZCxTQUFPZSxXQUFQLEdBQXFCLFVBQVNsRCxLQUFULEVBQWU7QUFDbENBLFVBQU1tRCxpQkFBTixHQUEwQlAsWUFBWWhDLGNBQXRDO0FBQ0FSLFlBQVFDLEdBQVIsQ0FBWUwsS0FBWjtBQUNBSSxZQUFRQyxHQUFSLENBQVk4QixPQUFPVyxNQUFuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0QsR0FSRDtBQWdCQyxDQXJDRCxHQXFDRTs7O0FDckNGbEYsUUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0JTLFVBQXhCLENBQW1DLFlBQW5DLEVBQWlELFVBQVM2RCxNQUFULEVBQWlCaUIsY0FBakIsRUFBaUM7O0FBRWhGQyxXQUFTQyxnQkFBVCxDQUEwQixhQUExQixFQUF5QyxZQUFZO0FBQ2pEQyxtQkFBZUMsWUFBZixHQUE4QnJDLElBQTlCLENBQW1Dc0MsT0FBbkMsRUFBNENDLEtBQTVDO0FBQ0QsR0FGSCxFQUVLLEtBRkw7O0FBSUU7O0FBRUE5RSxpQkFBZUMsS0FBZixDQUFxQixZQUFXO0FBQzlCMEUsbUJBQWVDLFlBQWYsR0FBOEJyQyxJQUE5QixDQUFtQ3NDLE9BQW5DLEVBQTRDQyxLQUE1QztBQUNELEdBRkQ7O0FBSUZ2QixTQUFPd0IsV0FBUCxHQUFxQixZQUFXO0FBQzlCLFFBQUlDLFVBQVU7QUFDWkMsZUFBUyxFQURHO0FBRVpDLHVCQUFpQkMsT0FBT0MsZUFBUCxDQUF1QkMsUUFGNUI7QUFHWkMsa0JBQVlILE9BQU9JLGlCQUFQLENBQXlCQyxNQUh6QjtBQUlaQyxpQkFBVyxLQUpDO0FBS1pDLG9CQUFjUCxPQUFPUSxZQUFQLENBQW9CQyxJQUx0QjtBQU1aQyxtQkFBYSxHQU5EO0FBT1pDLG9CQUFjLEdBUEY7QUFRWkMsc0JBQWdCQyxvQkFSSjtBQVNaQyx3QkFBa0IsS0FUTjtBQVViQywwQkFBbUI7QUFWTixLQUFkOztBQWFBMUIsbUJBQWUyQixVQUFmLENBQTBCbkIsT0FBMUIsRUFBbUN6QyxJQUFuQyxDQUF3QyxVQUFTNkQsU0FBVCxFQUFvQjtBQUMxRDdDLGFBQU84QyxNQUFQLEdBQWdCLDRCQUE0QkQsU0FBNUM7QUFDRCxLQUZELEVBRUcsVUFBU3pELEdBQVQsRUFBYztBQUNmO0FBQ0QsS0FKRDtBQU1ELEdBcEJEO0FBcUJDLENBakNILEVBaUNLLEtBakNMOzs7QUNBQTNELFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCUyxVQUF4QixDQUFtQyxlQUFuQyxFQUFvRCxVQUFTNkQsTUFBVCxFQUFpQjFDLEtBQWpCLEVBQXdCMkMsV0FBeEIsRUFBb0M7QUFDdEYsTUFBSThDLFlBQVl6RixNQUFNRSxVQUFOLEVBQWhCO0FBQ0N5QyxjQUFZMUMsV0FBWixHQUEwQndGLFNBQTFCO0FBQ0EvQyxTQUFPaEMsSUFBUCxHQUFjK0UsVUFBVXpDLEdBQXhCO0FBQ0FOLFNBQU8xQixLQUFQLEdBQWUwQixPQUFPaEMsSUFBUCxDQUFZa0IsVUFBM0I7O0FBRUFjLFNBQU9nRCxHQUFQLENBQVcsd0JBQVgsRUFBcUMsWUFBWTtBQUMvQyxRQUFJQyxXQUFXLFNBQVhBLFFBQVcsR0FBVTtBQUN2QmpELGFBQU8xQixLQUFQLEdBQWUyQixZQUFZUCxXQUFaLEVBQWY7QUFDRCxLQUZEO0FBR0EsUUFBR08sWUFBWVAsV0FBWixFQUFILEVBQTZCO0FBQzNCdUQ7QUFDRDtBQUNEakQsV0FBT2pCLFFBQVAsR0FBa0IsWUFBVTtBQUMxQixVQUFHaUIsT0FBTzFCLEtBQVAsS0FBaUIsVUFBcEIsRUFBK0I7QUFDN0IwQixlQUFPa0QsVUFBUCxHQUFvQiw4QkFBcEI7QUFDRDtBQUNELFVBQUdsRCxPQUFPMUIsS0FBUCxLQUFpQixjQUFwQixFQUFtQztBQUNqQzBCLGVBQU9rRCxVQUFQLEdBQW9CLGtCQUFwQjtBQUNEO0FBQ0QsVUFBR2xELE9BQU8xQixLQUFQLEtBQWlCLFVBQXBCLEVBQStCO0FBQzdCMEIsZUFBT2tELFVBQVAsR0FBb0IsMEJBQXBCO0FBQ0Q7QUFDRCxVQUFHbEQsT0FBTzFCLEtBQVAsS0FBaUIsVUFBcEIsRUFBK0I7QUFDN0IwQixlQUFPa0QsVUFBUCxHQUFvQiwrQkFBcEI7QUFDRDtBQUNELFVBQUdsRCxPQUFPMUIsS0FBUCxLQUFpQixPQUFwQixFQUE0QjtBQUMxQjBCLGVBQU9rRCxVQUFQLEdBQW9CLDhDQUFwQjtBQUNEO0FBRUYsS0FqQkQ7QUFrQkFsRCxXQUFPakIsUUFBUDtBQUNGLEdBMUJBOztBQWdDQSxNQUFJUyxhQUFhLFNBQWJBLFVBQWEsR0FBVTtBQUN6QkMsU0FBS08sT0FBT2hDLElBQVAsQ0FBWW1GLFVBQWpCO0FBQ0FsRCxnQkFBWVQsVUFBWixDQUF1QkMsRUFBdkIsRUFBMkJULElBQTNCLENBQWdDLFVBQVNvRSxRQUFULEVBQWtCO0FBQ2hEcEQsYUFBT3FELE9BQVAsR0FBaUJELFFBQWpCO0FBQ0QsS0FGRDtBQUdELEdBTEQ7QUFNQTVEO0FBR0YsQ0EvQ0Q7OztBQ0FBL0QsUUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0JTLFVBQXhCLENBQW1DLGVBQW5DLEVBQW9ELFVBQVM2RCxNQUFULEVBQWlCc0QsV0FBakIsRUFBOEJoRyxLQUE5QixFQUFxQzJDLFdBQXJDLEVBQWlEO0FBQ25HO0FBQ0E7O0FBRUEsTUFBSThDLFlBQVl6RixNQUFNRSxVQUFOLEVBQWhCO0FBQ0F5QyxjQUFZMUMsV0FBWixHQUEwQndGLFNBQTFCO0FBQ0EvQyxTQUFPaEMsSUFBUCxHQUFjK0UsVUFBVXpDLEdBQXhCOztBQUVBZ0QsY0FBWUMsZUFBWixDQUE0QixpQkFBNUIsRUFBK0M7QUFDNUM5RCxRQUFJLEdBRHdDLEVBQ25DO0FBQ1QrRCxXQUFPeEQsTUFGcUM7QUFHNUN5RCwwQkFBc0IsS0FIc0I7QUFJNUNDLGVBQVc7QUFKaUMsR0FBL0MsRUFLSTFFLElBTEosQ0FLUyxVQUFTMkUsS0FBVCxFQUFnQjtBQUN0QjNELFdBQU80RCxPQUFQLEdBQWlCRCxLQUFqQjtBQUNELEdBUEY7O0FBU0M7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0MzRCxTQUFPNkQsU0FBUCxHQUFtQixVQUFTQyxLQUFULEVBQWdCO0FBQ2pDLFFBQUlBLFNBQVMsQ0FBYixFQUFnQjlELE9BQU80RCxPQUFQLENBQWVHLElBQWYsR0FBaEIsS0FDSy9ELE9BQU9nRSxPQUFQLENBQWVELElBQWY7QUFDTixHQUhEOztBQUtBL0QsU0FBT2lFLFVBQVAsR0FBb0IsVUFBU0gsS0FBVCxFQUFnQjtBQUNsQyxRQUFJQSxTQUFTLENBQWIsRUFBZ0I5RCxPQUFPNEQsT0FBUCxDQUFlTSxJQUFmLEdBQWhCLEtBQ0tsRSxPQUFPZ0UsT0FBUCxDQUFlRSxJQUFmO0FBQ04sR0FIRDs7QUFLQWxFLFNBQU9nRCxHQUFQLENBQVcsVUFBWCxFQUF1QixZQUFXO0FBQ2hDaEQsV0FBTzRELE9BQVAsQ0FBZU8sTUFBZjtBQUNBbkUsV0FBT2dFLE9BQVAsQ0FBZUcsTUFBZjtBQUVELEdBSkQ7O0FBTURuRSxTQUFPMUIsS0FBUCxHQUFlMEIsT0FBT2hDLElBQVAsQ0FBWWtCLFVBQTNCO0FBQ0FjLFNBQU9qQixRQUFQLEdBQWtCLFVBQVNxRixNQUFULEVBQWdCO0FBQ2hDLFFBQUl0RyxPQUFPLEVBQVg7QUFDQUEsU0FBS1EsS0FBTCxHQUFhOEYsTUFBYjtBQUNBdEcsU0FBS2UsTUFBTCxHQUFjbUIsT0FBT2hDLElBQVAsQ0FBWW1GLFVBQTFCO0FBQ0FsRixZQUFRQyxHQUFSLENBQVlKLElBQVo7QUFDQW1DLGdCQUFZbEIsUUFBWixDQUFxQmpCLElBQXJCLEVBQTJCa0IsSUFBM0IsQ0FBZ0MsVUFBU29FLFFBQVQsRUFBa0I7QUFDbEQsVUFBR0EsU0FBU2lCLE1BQVQsS0FBb0IsR0FBdkIsRUFBMkI7QUFDekJyRSxlQUFPMUIsS0FBUCxHQUFlOEYsTUFBZjtBQUNDO0FBQ0osS0FKQztBQUtELEdBVkQ7O0FBYUEsTUFBSXpFLGlCQUFpQixTQUFqQkEsY0FBaUIsR0FBVTtBQUM3QkYsU0FBS08sT0FBT2hDLElBQVAsQ0FBWW1GLFVBQWpCO0FBQ0FsRCxnQkFBWU4sY0FBWixDQUEyQkYsRUFBM0IsRUFBK0JULElBQS9CLENBQW9DLFVBQVNvRSxRQUFULEVBQWtCO0FBQ3BEcEQsYUFBT3NFLFdBQVAsR0FBcUJsQixRQUFyQjtBQUNELEtBRkQ7QUFHRCxHQUxEO0FBTUN6RDtBQUNELE1BQUlDLGtCQUFrQixTQUFsQkEsZUFBa0IsR0FBVTtBQUM5QkgsU0FBS08sT0FBT2hDLElBQVAsQ0FBWW1GLFVBQWpCO0FBQ0FsRCxnQkFBWUwsZUFBWixDQUE0QkgsRUFBNUIsRUFBZ0NULElBQWhDLENBQXFDLFVBQVNvRSxRQUFULEVBQWtCO0FBQ3JEcEQsYUFBT3VFLFlBQVAsR0FBc0JuQixRQUF0QjtBQUNELEtBRkQ7QUFHRCxHQUxEO0FBTUF4RDtBQUNBLE1BQUlDLG1CQUFtQixTQUFuQkEsZ0JBQW1CLEdBQVU7QUFDL0JKLFNBQUtPLE9BQU9oQyxJQUFQLENBQVltRixVQUFqQjtBQUNBbEQsZ0JBQVlKLGdCQUFaLENBQTZCSixFQUE3QixFQUFpQ1QsSUFBakMsQ0FBc0MsVUFBU29FLFFBQVQsRUFBa0I7QUFDdERuRixjQUFRQyxHQUFSLENBQVlrRixRQUFaO0FBQ0FwRCxhQUFPd0UsYUFBUCxHQUF1QnBCLFFBQXZCO0FBQ0QsS0FIRDtBQUlELEdBTkQ7QUFPQXZEOztBQUVBRyxTQUFPeUUsUUFBUCxHQUFrQixZQUFVO0FBQzNCLFNBQUtQLElBQUwsR0FBWSxDQUFDLEtBQUtBLElBQWxCO0FBQ0EsR0FGRDs7QUFJQWxFLFNBQU9GLGFBQVAsR0FBdUIsVUFBU0wsRUFBVCxFQUFZO0FBQ2pDeEIsWUFBUUMsR0FBUixDQUFZdUIsRUFBWjtBQUNBUSxnQkFBWUgsYUFBWixDQUEwQkwsRUFBMUIsRUFBOEJULElBQTlCLENBQW1DLFVBQVNvRSxRQUFULEVBQWtCO0FBQ25EbkYsY0FBUUMsR0FBUixDQUFZa0YsUUFBWjtBQUNELEtBRkQ7QUFHQSxHQUxGO0FBUUQsQ0EzRkQ7OztBQ0FBM0gsUUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0JTLFVBQXhCLENBQW1DLGdCQUFuQyxFQUFxRCxVQUFTNkQsTUFBVCxFQUFpQjFDLEtBQWpCLEVBQXdCNEMsTUFBeEIsRUFBZ0N3RSxZQUFoQyxFQUE2QztBQUNoRzs7QUFFQzFFLFNBQU8yRSxVQUFQLEdBQW9CLFVBQVMzRyxJQUFULEVBQWM7QUFDaENDLFlBQVFDLEdBQVIsQ0FBWUYsSUFBWjtBQUNBMEcsaUJBQWEzRyxTQUFiLENBQXVCQyxJQUF2QixFQUE2QmdCLElBQTdCLENBQWtDLFVBQVNvRSxRQUFULEVBQWtCO0FBQ2xEbkYsY0FBUUMsR0FBUixDQUFZa0YsUUFBWjtBQUNBOUYsWUFBTXNILFFBQU4sQ0FBZXhCLFFBQWY7QUFDRWxELGFBQU9HLEVBQVAsQ0FBVSxXQUFWO0FBRUgsS0FMRDtBQU1ELEdBUkQ7QUFTRixDQVpEOzs7QUNBQTVFLFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCUyxVQUF4QixDQUFtQyxlQUFuQyxFQUFvRCxVQUFTNkQsTUFBVCxFQUFnQjtBQUNsRUEsU0FBT0csTUFBUCxHQUFnQixZQUFVO0FBQ3hCeEQsV0FBT3lELE9BQVAsQ0FBZUMsRUFBZixDQUFrQixDQUFDLENBQW5CO0FBQ0QsR0FGRDtBQUlELENBTEQ7OztBQ0FBNUUsUUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0JTLFVBQXhCLENBQW1DLGFBQW5DLEVBQWtELFVBQVM2RCxNQUFULEVBQWdCO0FBQy9EQSxVQUFPNkUsSUFBUCxHQUFjLGlDQUFkO0FBRUYsQ0FIRDs7O0FDQUFwSixRQUFRQyxNQUFSLENBQWUsT0FBZixFQUF3QlMsVUFBeEIsQ0FBbUMsVUFBbkMsRUFBK0MsVUFBUzZELE1BQVQsRUFBaUJzRCxXQUFqQixFQUE2QnJELFdBQTdCLEVBQXlDNkUsT0FBekMsRUFBa0R4SCxLQUFsRCxFQUF3RDtBQUNyRyxNQUFJeUYsWUFBWXpGLE1BQU1FLFVBQU4sRUFBaEI7QUFDQXlDLGNBQVkxQyxXQUFaLEdBQTBCd0YsU0FBMUI7QUFDQS9DLFNBQU9oQyxJQUFQLEdBQWMrRSxVQUFVekMsR0FBeEI7QUFDQU4sU0FBTzNCLE1BQVAsR0FBZ0IyQixPQUFPeEIsaUJBQXZCOztBQUVDOEUsY0FBWUMsZUFBWixDQUE0QixrQkFBNUIsRUFBZ0Q7QUFDOUNDLFdBQU94RCxNQUR1QztBQUU5QzBELGVBQVc7QUFGbUMsR0FBaEQsRUFHRzFFLElBSEgsQ0FHUSxVQUFTMkUsS0FBVCxFQUFnQjtBQUN0QjNELFdBQU8yRCxLQUFQLEdBQWVBLEtBQWY7QUFDRCxHQUxEO0FBTUEzRCxTQUFPNkQsU0FBUCxHQUFtQixZQUFXO0FBQzVCN0QsV0FBTzJELEtBQVAsQ0FBYUksSUFBYjtBQUNELEdBRkQ7QUFHQS9ELFNBQU8rRSxZQUFQLEdBQXNCLFVBQVMxRyxNQUFULEVBQWdCO0FBQ3BDLFFBQUkyRyxhQUFhO0FBQ2Z2RyxzQkFBZVQsS0FBS1MsY0FETDtBQUVmRCx5QkFBa0JIO0FBRkgsS0FBakI7QUFJQzRCLGdCQUFZMUIsVUFBWixDQUF1QnlHLFVBQXZCLEVBQ0NoRyxJQURELENBQ00sVUFBU0MsR0FBVCxFQUFhO0FBQ3BCZSxhQUFPMkQsS0FBUCxDQUFhTyxJQUFiO0FBQ0toRCxlQUFTK0QsY0FBVCxDQUF3QixXQUF4QixFQUFxQ0MsS0FBckMsR0FBNkMsRUFBN0M7QUFDQUosY0FBUUssUUFBUixDQUFpQkMsTUFBakIsQ0FBd0IsSUFBeEI7QUFDSixLQUxBO0FBTUYsR0FYRDtBQVlBcEYsU0FBT2lFLFVBQVAsR0FBb0IsWUFBVztBQUM3Qi9DLGFBQVMrRCxjQUFULENBQXdCLFdBQXhCLEVBQXFDQyxLQUFyQyxHQUE2QyxFQUE3QztBQUNBbEYsV0FBTzJELEtBQVAsQ0FBYU8sSUFBYjtBQUNELEdBSEQ7QUFJQTtBQUNBbEUsU0FBT2dELEdBQVAsQ0FBVyxVQUFYLEVBQXVCLFlBQVc7QUFDaENoRCxXQUFPMkQsS0FBUCxDQUFhUSxNQUFiO0FBQ0QsR0FGRDtBQUdBO0FBQ0FuRSxTQUFPZ0QsR0FBUCxDQUFXLGNBQVgsRUFBMkIsWUFBVztBQUNwQzs7QUFFRCxHQUhEO0FBSUE7QUFDQWhELFNBQU9nRCxHQUFQLENBQVcsZUFBWCxFQUE0QixZQUFXO0FBQ3JDO0FBQ0QsR0FGRDs7QUFJSGhELFNBQU90QyxTQUFQLEdBQW9Cc0MsT0FBT2hDLElBQVAsQ0FBWVMsY0FBaEM7QUFDQXdCLGNBQVlyQixTQUFaLENBQXNCb0IsT0FBT2hDLElBQVAsQ0FBWVMsY0FBbEMsRUFBa0RPLElBQWxELENBQXVELFVBQVNDLEdBQVQsRUFBYTtBQUNsRWhCLFlBQVFDLEdBQVIsQ0FBWWUsSUFBSW5CLElBQUosQ0FBUyxDQUFULEVBQVlVLGlCQUF4QjtBQUNFd0IsV0FBTzNCLE1BQVAsR0FBZ0JZLElBQUluQixJQUFKLENBQVMsQ0FBVCxFQUFZVSxpQkFBNUI7QUFDSCxHQUhEOztBQUtBUCxVQUFRQyxHQUFSLENBQVk4QixPQUFPaEMsSUFBUCxDQUFZcUgsR0FBeEI7O0FBRUFwRixjQUFZbkIsVUFBWixDQUF1QmtCLE9BQU9oQyxJQUFQLENBQVlxSCxHQUFuQyxFQUNDckcsSUFERCxDQUNNLFVBQVNDLEdBQVQsRUFBYTtBQUNqQmhCLFlBQVFDLEdBQVIsQ0FBWWUsSUFBSW5CLElBQWhCO0FBQ0FrQyxXQUFPc0YsT0FBUCxHQUFpQnJHLElBQUluQixJQUFyQjtBQUNELEdBSkQ7O0FBT0FtQyxjQUFZVixTQUFaLENBQXNCUyxPQUFPaEMsSUFBUCxDQUFZUyxjQUFsQyxFQUNDTyxJQURELENBQ00sVUFBU0MsR0FBVCxFQUFhO0FBQ2pCaEIsWUFBUUMsR0FBUixDQUFZZSxJQUFJbkIsSUFBaEI7QUFDQWtDLFdBQU9ULFNBQVAsR0FBbUJOLElBQUluQixJQUF2QjtBQUNELEdBSkQ7QUFPQyxDQW5FRCxHQW1FRTs7O0FDbkVGckMsUUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0JTLFVBQXhCLENBQW1DLFdBQW5DLEVBQWdELFVBQVM2RCxNQUFULEVBQWlCMUMsS0FBakIsRUFBd0I0QyxNQUF4QixFQUFnQ3dFLFlBQWhDLEVBQTZDOztBQUU3RjFFLFNBQU91RixLQUFQLEdBQWUsVUFBU3ZILElBQVQsRUFBYztBQUMzQjtBQUNBMEcsaUJBQWEzRyxTQUFiLENBQXVCQyxJQUF2QixFQUE2QmdCLElBQTdCLENBQWtDLFVBQVNvRSxRQUFULEVBQWtCO0FBQ2xEO0FBQ0E5RixZQUFNc0gsUUFBTixDQUFleEIsUUFBZjtBQUNFbEQsYUFBT0csRUFBUCxDQUFVLE1BQVY7QUFFSCxLQUxEO0FBTUQsR0FSRDtBQVNBTCxTQUFPN0IsUUFBUCxHQUFrQixVQUFTQyxPQUFULEVBQWlCO0FBQ2pDc0csaUJBQWF2RyxRQUFiLENBQXNCQyxPQUF0QixFQUErQlksSUFBL0IsQ0FBb0MsVUFBU29FLFFBQVQsRUFBa0I7QUFDcEQ5RixZQUFNc0gsUUFBTixDQUFleEIsUUFBZjtBQUNFbEQsYUFBT0csRUFBUCxDQUFVLE1BQVY7QUFDSCxLQUhEO0FBSUQsR0FMRDtBQU1FTCxTQUFPd0YsWUFBUCxHQUFzQixVQUFTQyxRQUFULEVBQW1CO0FBQ3pDbkksVUFBTWtJLFlBQU4sQ0FBbUJDLFFBQW5CO0FBQTZCLEdBRDdCO0FBRUE7OztBQUdBekYsU0FBT3lFLFFBQVAsR0FBa0IsWUFBVTtBQUM1QnpFLFdBQU9rRSxJQUFQLEdBQWMsQ0FBQ2xFLE9BQU9rRSxJQUF0QjtBQUNBLEdBRkE7QUFJRCxDQTFCRDs7O0FDQUF6SSxRQUFRQyxNQUFSLENBQWUsT0FBZixFQUF3QlMsVUFBeEIsQ0FBbUMsZUFBbkMsRUFBb0QsVUFBUzZELE1BQVQsRUFBZ0I7QUFDbEVBLFNBQU9HLE1BQVAsR0FBZ0IsWUFBVTtBQUN4QnhELFdBQU95RCxPQUFQLENBQWVDLEVBQWYsQ0FBa0IsQ0FBQyxDQUFuQjtBQUNELEdBRkQ7QUFJRCxDQUxEOzs7QUNBQTVFLFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCUyxVQUF4QixDQUFtQyxnQkFBbkMsRUFBcUQsVUFBUzZELE1BQVQsRUFBaUJzRCxXQUFqQixFQUE2QjtBQUNoRkEsY0FBWUMsZUFBWixDQUE0QixrQkFBNUIsRUFBZ0Q7QUFDOUNDLFdBQU94RCxNQUR1QztBQUU5QzBELGVBQVc7QUFGbUMsR0FBaEQsRUFHRzFFLElBSEgsQ0FHUSxVQUFTMkUsS0FBVCxFQUFnQjtBQUN0QjNELFdBQU8yRCxLQUFQLEdBQWVBLEtBQWY7QUFDRCxHQUxEO0FBTUEzRCxTQUFPNkQsU0FBUCxHQUFtQixZQUFXO0FBQzVCN0QsV0FBTzJELEtBQVAsQ0FBYUksSUFBYjtBQUNELEdBRkQ7QUFHQS9ELFNBQU9pRSxVQUFQLEdBQW9CLFlBQVc7QUFDN0JqRSxXQUFPMkQsS0FBUCxDQUFhTyxJQUFiO0FBQ0QsR0FGRDtBQUdBO0FBQ0FsRSxTQUFPZ0QsR0FBUCxDQUFXLFVBQVgsRUFBdUIsWUFBVztBQUNoQ2hELFdBQU8yRCxLQUFQLENBQWFRLE1BQWI7QUFDRCxHQUZEO0FBR0E7QUFDQW5FLFNBQU9nRCxHQUFQLENBQVcsY0FBWCxFQUEyQixZQUFXO0FBQ3BDO0FBQ0QsR0FGRDtBQUdBO0FBQ0FoRCxTQUFPZ0QsR0FBUCxDQUFXLGVBQVgsRUFBNEIsWUFBVztBQUNyQztBQUNELEdBRkQ7QUFHQTtBQUNBaEQsU0FBT0csTUFBUCxHQUFnQixZQUFVO0FBQ3hCeEQsV0FBT3lELE9BQVAsQ0FBZUMsRUFBZixDQUFrQixDQUFDLENBQW5CO0FBQ0QsR0FGRDtBQUlELENBOUJEOzs7QUNBQTVFLFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCUyxVQUF4QixDQUFtQyxjQUFuQyxFQUFtRCxVQUFTNkQsTUFBVCxFQUFpQnNELFdBQWpCLEVBQTZCO0FBQzlFQSxjQUFZQyxlQUFaLENBQTRCLHFCQUE1QixFQUFtRDtBQUNoRDlELFFBQUksR0FENEMsRUFDdkM7QUFDVCtELFdBQU94RCxNQUZ5QztBQUdoRHlELDBCQUFzQixLQUgwQjtBQUloREMsZUFBVztBQUpxQyxHQUFuRCxFQUtJMUUsSUFMSixDQUtTLFVBQVMyRSxLQUFULEVBQWdCO0FBQ3RCM0QsV0FBTzRELE9BQVAsR0FBaUJELEtBQWpCO0FBQ0QsR0FQRjs7QUFTQztBQUNBTCxjQUFZQyxlQUFaLENBQTRCLHNCQUE1QixFQUFvRDtBQUNsRDlELFFBQUksR0FEOEMsRUFDekM7QUFDVCtELFdBQU94RCxNQUYyQztBQUdsRHlELDBCQUFzQixLQUg0QjtBQUlsREMsZUFBVztBQUp1QyxHQUFwRCxFQUtHMUUsSUFMSCxDQUtRLFVBQVMyRSxLQUFULEVBQWdCO0FBQ3RCM0QsV0FBT2dFLE9BQVAsR0FBaUJMLEtBQWpCO0FBQ0QsR0FQRDs7QUFTQUwsY0FBWUMsZUFBWixDQUE0QixnQkFBNUIsRUFBOEM7QUFDNUM5RCxRQUFJLEdBRHdDLEVBQ25DO0FBQ1QrRCxXQUFPeEQsTUFGcUM7QUFHNUN5RCwwQkFBc0IsS0FIc0I7QUFJNUNDLGVBQVc7QUFKaUMsR0FBOUMsRUFLRzFFLElBTEgsQ0FLUSxVQUFTMkUsS0FBVCxFQUFnQjtBQUN0QjNELFdBQU8wRixPQUFQLEdBQWlCL0IsS0FBakI7QUFDRCxHQVBEOztBQVNBTCxjQUFZQyxlQUFaLENBQTRCLGdCQUE1QixFQUE4QztBQUM1QzlELFFBQUksR0FEd0MsRUFDbkM7QUFDVCtELFdBQU94RCxNQUZxQztBQUc1Q3lELDBCQUFzQixLQUhzQjtBQUk1Q0MsZUFBVztBQUppQyxHQUE5QyxFQUtHMUUsSUFMSCxDQUtRLFVBQVMyRSxLQUFULEVBQWdCO0FBQ3RCM0QsV0FBTzJGLE9BQVAsR0FBaUJoQyxLQUFqQjtBQUNELEdBUEQ7O0FBU0FMLGNBQVlDLGVBQVosQ0FBNEIsa0JBQTVCLEVBQWdEO0FBQzlDOUQsUUFBSSxHQUQwQyxFQUNyQztBQUNUK0QsV0FBT3hELE1BRnVDO0FBRzlDeUQsMEJBQXNCLEtBSHdCO0FBSTlDQyxlQUFXO0FBSm1DLEdBQWhELEVBS0cxRSxJQUxILENBS1EsVUFBUzJFLEtBQVQsRUFBZ0I7QUFDdEIzRCxXQUFPNEYsT0FBUCxHQUFpQmpDLEtBQWpCO0FBQ0QsR0FQRDs7QUFXQTNELFNBQU82RCxTQUFQLEdBQW1CLFVBQVNDLEtBQVQsRUFBZ0I7QUFDakMsUUFBSUEsU0FBUyxDQUFiLEVBQWdCOUQsT0FBTzRELE9BQVAsQ0FBZUcsSUFBZixHQUFoQixLQUNLLElBQUdELFNBQVMsQ0FBWixFQUFlOUQsT0FBT2dFLE9BQVAsQ0FBZUQsSUFBZixHQUFmLEtBQ0EsSUFBR0QsU0FBUyxDQUFaLEVBQWU5RCxPQUFPMEYsT0FBUCxDQUFlM0IsSUFBZixHQUFmLEtBQ0EsSUFBR0QsU0FBUyxDQUFaLEVBQWU5RCxPQUFPMkYsT0FBUCxDQUFlNUIsSUFBZixHQUFmLEtBQ0EvRCxPQUFPNEYsT0FBUCxDQUFlN0IsSUFBZjtBQUNOLEdBTkQ7O0FBUUEvRCxTQUFPaUUsVUFBUCxHQUFvQixVQUFTSCxLQUFULEVBQWdCO0FBQ2xDLFFBQUlBLFNBQVMsQ0FBYixFQUFnQjlELE9BQU80RCxPQUFQLENBQWVNLElBQWYsR0FBaEIsS0FDSyxJQUFHSixTQUFTLENBQVosRUFBZTlELE9BQU9nRSxPQUFQLENBQWVFLElBQWYsR0FBZixLQUNBLElBQUdKLFNBQVMsQ0FBWixFQUFlOUQsT0FBTzBGLE9BQVAsQ0FBZXhCLElBQWYsR0FBZixLQUNBLElBQUdKLFNBQVMsQ0FBWixFQUFlOUQsT0FBTzJGLE9BQVAsQ0FBZXpCLElBQWYsR0FBZixLQUNBbEUsT0FBTzRGLE9BQVAsQ0FBZTFCLElBQWY7QUFDTixHQU5EOztBQVFBbEUsU0FBT2dELEdBQVAsQ0FBVyxVQUFYLEVBQXVCLFlBQVc7QUFDaENoRCxXQUFPNEQsT0FBUCxDQUFlTyxNQUFmO0FBQ0FuRSxXQUFPZ0UsT0FBUCxDQUFlRyxNQUFmO0FBQ0FuRSxXQUFPMEYsT0FBUCxDQUFldkIsTUFBZjtBQUNBbkUsV0FBTzJGLE9BQVAsQ0FBZXhCLE1BQWY7QUFDQW5FLFdBQU80RixPQUFQLENBQWV6QixNQUFmO0FBQ0QsR0FORDtBQVFGLENBekVEOzs7QUNBQTFJLFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCUyxVQUF4QixDQUFtQyxhQUFuQyxFQUFrRCxVQUFTNkQsTUFBVCxFQUFpQnNELFdBQWpCLEVBQThCcEQsTUFBOUIsRUFBc0NELFdBQXRDLEVBQWtEO0FBQ2hHLE1BQUlGLFdBQVcsU0FBWEEsUUFBVyxHQUFVO0FBQ3ZCRSxnQkFBWUYsUUFBWixDQUFxQkcsT0FBTzJGLE1BQVAsQ0FBY3BHLEVBQW5DLEVBQXVDVCxJQUF2QyxDQUE0QyxVQUFTb0UsUUFBVCxFQUFrQjtBQUM1RG5GLGNBQVFDLEdBQVIsQ0FBWWtGLFFBQVo7QUFDQXBELGFBQU9WLEtBQVAsR0FBZThELFNBQVMsQ0FBVCxDQUFmO0FBQ0QsS0FIRDtBQUlELEdBTEQ7QUFNQXJEOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVELENBbENEOzs7QUNBQXRFLFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCUyxVQUF4QixDQUFtQyxjQUFuQyxFQUFtRCxVQUFTNkQsTUFBVCxFQUFnQjtBQUNoRUEsVUFBTzZFLElBQVAsR0FBYyw4QkFBZDtBQUVGLENBSEQiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW9uaWMgU3RhcnRlciBBcHBcblxuLy8gYW5ndWxhci5tb2R1bGUgaXMgYSBnbG9iYWwgcGxhY2UgZm9yIGNyZWF0aW5nLCByZWdpc3RlcmluZyBhbmQgcmV0cmlldmluZyBBbmd1bGFyIG1vZHVsZXNcbi8vICdzdGFydGVyJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xuXG5hbmd1bGFyLm1vZHVsZSgnY2hvcmUnLCBbJ2lvbmljJywgJ3NhdGVsbGl6ZXInXSlcbi5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJGF1dGhQcm92aWRlcil7XG4gICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoXCIvbG9naW5cIik7XG4gICRzdGF0ZVByb3ZpZGVyXG4gIC5zdGF0ZSgnYWRkQ2hpbGQnLHtcbiAgICB1cmw6XCIvYWRkQ2hpbGRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9hZGRDaGlsZC5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJhZGRDaGlsZEN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2Fzc2lnbkNob3JlJyx7XG4gICAgdXJsOlwiL2Fzc2lnbkNob3JlXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvYXNzaWduQ2hvcmUuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiYXNzaWduQ2hvcmVDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdlZGl0Q2hpbGQnLHtcbiAgICB1cmw6XCIvZWRpdENoaWxkLzppZFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2VkaXRDaGlsZC5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJlZGl0Q2hpbGRDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdoaXN0b3J5Jyx7XG4gICAgdXJsOlwiL2hpc3RvcnlcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9oaXN0b3J5Lmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImhpc3RvcnlDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdob21lJyx7XG4gICAgdXJsOlwiL2hvbWVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9ob21lLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImhvbWVDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdsb2dpbicse1xuICAgIHVybDpcIi9sb2dpblwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL0xvZ2luLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImxvZ2luQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnbWFrZUNob3JlJyx7XG4gICAgdXJsOlwiL21ha2VDaG9yZVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL21ha2VDaG9yZS5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJtYWtlQ2hvcmVDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdzZXRSZXdhcmRzJyx7XG4gICAgdXJsOlwiL3NldFJld2FyZHMvOmlkXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvc2V0UmV3YXJkcy5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJzZXRSZXdhcmRzQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnc2V0dGluZ3MnLHtcbiAgICB1cmw6XCIvc2V0dGluZ3NcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9zZXR0aW5ncy5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJzZXR0aW5nc0N0cmxcIlxuICB9KVxuICAuc3RhdGUoJ3RyYWNrZXInLHtcbiAgICB1cmw6XCIvdHJhY2tlci86aWRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy90cmFja2VyLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcInRyYWNrZXJDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCd1c2VySW5mbycse1xuICAgIHVybDpcIi91c2VySW5mb1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL3VzZXJJbmZvLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcInVzZXJJbmZvQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnY2hpbGRCYW5rJyx7XG4gICAgdXJsOlwiL2NoaWxkL2JhbmtcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9jaGlsZEJhbmsuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRCYW5rQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnY2hpbGRIb21lJyx7XG4gICAgdXJsOlwiL2NoaWxkL2hvbWVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9jaGlsZEhvbWUuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRIb21lQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnY2hpbGRMb2dpbicse1xuICAgIHVybDpcIi9jaGlsZC9sb2dpblwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2NoaWxkTG9naW4uaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRMb2dpbkN0cmxcIlxuICB9KVxuXG4gICRhdXRoUHJvdmlkZXIuZmFjZWJvb2soe1xuICAgIGNsaWVudElkOiAnMzMyMjcyMDU3MTMyNjgxJ1xuICB9KTtcblxuICAvLyBPcHRpb25hbDogRm9yIGNsaWVudC1zaWRlIHVzZSAoSW1wbGljaXQgR3JhbnQpLCBzZXQgcmVzcG9uc2VUeXBlIHRvICd0b2tlbicgKGRlZmF1bHQ6ICdjb2RlJylcbiAgJGF1dGhQcm92aWRlci5mYWNlYm9vayh7XG4gICAgY2xpZW50SWQ6ICczMzIyNzIwNTcxMzI2ODEnLFxuICAgIHJlc3BvbnNlVHlwZTogJ3Rva2VuJ1xuICB9KTtcblxuICAkYXV0aFByb3ZpZGVyLmdvb2dsZSh7XG4gICAgY2xpZW50SWQ6ICcyNzUzNTI5NjA5NDYtNXJjYW4zcWtobHNjN201MGhldjVkbjJlMmNhZTltYnAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20nLFxuICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODEwMC8jL2xvZ2luLydcbiAgfSk7XG59KVxuXG5cblxuLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xuICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICBpZih3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuXG4gICAgICAvLyBEb24ndCByZW1vdmUgdGhpcyBsaW5lIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuIEl0IHN0b3BzIHRoZSB2aWV3cG9ydFxuICAgICAgLy8gZnJvbSBzbmFwcGluZyB3aGVuIHRleHQgaW5wdXRzIGFyZSBmb2N1c2VkLiBJb25pYyBoYW5kbGVzIHRoaXMgaW50ZXJuYWxseSBmb3JcbiAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgfVxuICAgIGlmKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcbiAgICB9XG4gIH0pO1xufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLnNlcnZpY2UoXCJjaG9yZVNlcnZpY2VcIiwgZnVuY3Rpb24oJGh0dHAsJHEsJGF1dGgpe1xuXG50aGlzLmdldFVzZXJJbmZvID0gJGF1dGguZ2V0UGF5bG9hZCgpO1xuXG5cbnRoaXMuZ2V0Q2hpbGRyZW4gPSBmdW5jdGlvbihob3VzZWhvbGQpe1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDpcIkdFVFwiLFxuICAgIHVybDpcIi9jaGlsZHJlbi9cIiArIGhvdXNlaG9sZFxuICB9KVxufVxuXG50aGlzLmNyZWF0ZUNob3JlID0gZnVuY3Rpb24oY2hvcmUpe1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDpcIlBPU1RcIixcbiAgICB1cmw6XCIvYXNzaWduY2hvcmVcIixcbiAgICBkYXRhOmNob3JlXG4gIH0pXG59XG5cblxuXG5cbn0pLy9lbmQgb2Ygc2VydmljZVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuc2VydmljZSgnbG9naW5TZXJ2aWNlJywgZnVuY3Rpb24oJGh0dHApe1xuXG5cbiAgdGhpcy51c2VyTG9naW4gPSBmdW5jdGlvbih1c2VyKSB7XG4gICAgY29uc29sZS5sb2codXNlciwgXCJzZXJ2aWNlXCIpXG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB1cmw6ICcvYXV0aC9sb2dpbicsXG4gICAgICBkYXRhOiB1c2VyXG4gICAgfSlcbiAgfVxuICB0aGlzLm1ha2VVc2VyID0gZnVuY3Rpb24obmV3VXNlcikge1xuICAgIHJldHVybiAkaHR0cCh7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgdXJsOiAnL2F1dGgvc2lnbnVwJyxcbiAgICAgIGRhdGE6IG5ld1VzZXJcbiAgICB9KVxuICB9XG59KSAvLyBlbmQgb2Ygc2VydmljZVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuc2VydmljZSgndXNlclNlcnZpY2UnLCBmdW5jdGlvbigkaHR0cCwkcSwkYXV0aCl7XG5cbnZhciBiYW5uZXI7XG5cbnRoaXMuZ2V0VXNlckluZm87XG52YXIgdGhlbWU7XG5cblxudGhpcy5wb3N0YmFubmVyID0gZnVuY3Rpb24oYmFubmVyKXtcbiAgY29uc29sZS5sb2coYmFubmVyKTtcbiAgY29uc29sZS5sb2coYmFubmVyLnVzZXJfYmFubmVyX2ltYWdlKTtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgdXJsOlwiL2Jhbm5lci9cIiArIGJhbm5lci51c2VyX2hvdXNlaG9sZCxcbiAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7dXNlcl9iYW5uZXJfaW1hZ2U6YmFubmVyLnVzZXJfYmFubmVyX2ltYWdlfSlcbiAgfSlcbn1cblxudGhpcy5nZXRiYW5uZXIgPSBmdW5jdGlvbih1c2VySWQpe1xuICBjb25zb2xlLmxvZyh1c2VySWQpO1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6XCIvYmFubmVyL1wiICsgdXNlcklkXG4gIH0pXG59XG5cblxudGhpcy5nZXRXZWF0aGVyID0gZnVuY3Rpb24oKXtcbnJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIHVybDonaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPXppcD04NDAxMCZ1bml0cz1pbXBlcmlhbCZhcHBpZD1jMTBlZjk5YzVhZmRlZTNmZGZiYTc4ZThjOTgxYTliNidcbiAgfSlcblxufTtcblxuXG4gdGhpcy5zZXRUaGVtZSA9IGZ1bmN0aW9uKGRhdGEpe1xuICAgcmV0dXJuICRodHRwKHtcbiAgICAgbWV0aG9kOiAnUHV0JyxcbiAgICAgdXJsOlwiL3RoZW1lXCIsXG4gICAgIGRhdGE6IGRhdGFcbiAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgIHRoZW1lID0gcmVzLmRhdGFbMF0udXNlcl90aGVtZVxuICAgICAgIHJldHVybiByZXM7XG4gICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gfSlcbiB9XG5cbnRoaXMuYWRkQ2hpbGQgPSBmdW5jdGlvbihjaGlsZCl7XG4gIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGNoaWxkKSk7XG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOlwiUE9TVFwiLFxuICAgIHVybDpcIi9jaGlsZHJlblwiLFxuICAgIGRhdGE6IGNoaWxkXG4gIH0pXG59XG5cblxudGhpcy5zaG93Y2hpbGQgPSBmdW5jdGlvbihob3VzZWhvbGQpe1xucmV0dXJuICRodHRwKHtcbiAgbWV0aG9kOlwiR0VUXCIsXG4gIHVybDpcIi9jaGlsZHJlbi9cIiArIGhvdXNlaG9sZFxufSlcbn1cblxudGhpcy5nZXRSZXdhcmRzID0gZnVuY3Rpb24oaWQpe1xuICAgIHJldHVybiAkaHR0cCh7XG4gICAgICBtZXRob2Q6IFwiR2V0XCIsXG4gICAgICB1cmw6Jy9jaGlsZHJld2FyZHMvJyArIGlkLFxuICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIHJldHVybiByZXMuZGF0YTtcbiAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICB9KVxuXG59XG5cbiAgdGhpcy5yZXR1cm5UaGVtZSA9IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIHRoZW1lO1xuICB9XG5cblxudGhpcy5nZXREYWlseUNob3JlcyA9IGZ1bmN0aW9uKGlkKXtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6IFwiR2V0XCIsXG4gICAgdXJsOicvZGFpbHljaG9yZS8nICsgaWQsXG4gIH0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICByZXR1cm4gcmVzLmRhdGE7XG4gIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICBjb25zb2xlLmxvZyhlcnIpO1xufSlcbn1cblxudGhpcy5nZXRXZWVrbHlDaG9yZXMgPSBmdW5jdGlvbihpZCl7XG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOiBcIkdldFwiLFxuICAgIHVybDonL3dlZWtseWNob3JlLycgKyBpZCxcbiAgfSkudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgIHJldHVybiByZXMuZGF0YTtcbiAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgIGNvbnNvbGUubG9nKGVycik7XG59KVxufVxuXG50aGlzLmdldE1vbnRobHlDaG9yZXMgPSBmdW5jdGlvbihpZCl7XG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOiBcIkdldFwiLFxuICAgIHVybDonL21vbnRobHljaG9yZS8nICsgaWQsXG4gIH0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICByZXR1cm4gcmVzLmRhdGE7XG4gIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICBjb25zb2xlLmxvZyhlcnIpO1xufSlcbn1cbiB0aGlzLmNoZWNrT2ZmY2hvcmUgPSBmdW5jdGlvbihpZCl7XG4gICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgIHVybDonL2NvbXBsZXRlZC8nICsgaWRcbiAgICAgfSkudGhlbihmdW5jdGlvbihyZXMpe1xuICAgICAgIHJldHVybiByZXM7XG4gICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xuICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgIH0pXG4gICB9XG50aGlzLmdldENoaWxkID0gZnVuY3Rpb24oaWQpe1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDogXCJHZXRcIixcbiAgICB1cmw6ICcvY2hpbGQvJysgaWRcbiAgfSkudGhlbihmdW5jdGlvbihyZXMpe1xuICAgIHJldHVybiByZXMuZGF0YVxuICB9KVxufVxuXG59KTsvL2VuZCBvZiBzZXJ2aWNlXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiYWRkQ2hpbGRDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSx1c2VyU2VydmljZSwkc3RhdGUpe1xuICAvL2JhY2tidXR0b25cbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XG4gICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpXG4gIH1cbnZhciB1c2VyID0gdXNlclNlcnZpY2UuZ2V0VXNlckluZm8uc3ViO1xuY29uc29sZS5sb2codXNlcik7XG4kc2NvcGUuc3VibWl0Q2hpbGQgPSBmdW5jdGlvbihjaGlsZCl7XG4gIGNoaWxkLnVzZXJfaG91c2Vob2xkID0gdXNlci51c2VyX2hvdXNlaG9sZDtcbiAgY29uc29sZS5sb2coY2hpbGQpO1xuICB1c2VyU2VydmljZS5hZGRDaGlsZChjaGlsZClcbiAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAkc3RhdGUuZ28oJ2hvbWUnKTtcbiAgfSk7XG5cbn1cblxuXG5cblxuXG59KSAvL2VuZCBvZiBjb250cm9sbGVyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiYXNzaWduQ2hvcmVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSxjaG9yZVNlcnZpY2UsJHN0YXRlKXtcblxudmFyIGN1cnJlbnRVc2VyID0gY2hvcmVTZXJ2aWNlLmdldFVzZXJJbmZvLnN1YjtcblxuXG5jaG9yZVNlcnZpY2UuZ2V0Q2hpbGRyZW4oY3VycmVudFVzZXIudXNlcl9ob3VzZWhvbGQpXG4udGhlbihmdW5jdGlvbihyZXMpe1xuICAvLyAkc2NvcGUuY2hvcmVzID0gcmVzLmRhdGE7XG4gICRzY29wZS5jaGlsZHMgPSByZXMuZGF0YVxuICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG59KVxuXG5cbiRzY29wZS52YWx1ZXMgPSBbXTtcblxuJHNjb3BlLmNob3JlID0ge1xuY2hvcmVfZGFpbHk6IGZhbHNlLFxuY2hvcmVfd2Vla2x5OiBmYWxzZSxcbmNob3JlX21vbnRobHk6ZmFsc2Vcbn1cblxuJHNjb3BlLnN1Ym1pdENob3JlID0gZnVuY3Rpb24oY2hvcmUpe1xuICBjaG9yZS51c2VyX2hvdXNlaG9sZF9mayA9IGN1cnJlbnRVc2VyLnVzZXJfaG91c2Vob2xkO1xuICBjb25zb2xlLmxvZyhjaG9yZSlcbiAgY29uc29sZS5sb2coJHNjb3BlLnZhbHVlcyk7XG4gIC8vIGNob3JlU2VydmljZS5jcmVhdGVDaG9yZShjaG9yZSlcbiAgLy8gLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgLy9cbiAgLy8gfSlcbn1cblxuXG5cblxuXG5cblxufSkvL2VuZCBvZiBjb250cm9sbGVyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKCdjYW1lcmFDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkY29yZG92YUNhbWVyYSkge1xuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkZXZpY2VyZWFkeVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAkY29yZG92YVBsdWdpbi5zb21lRnVuY3Rpb24oKS50aGVuKHN1Y2Nlc3MsIGVycm9yKTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICAvLyBPUiB3aXRoIElPTklDXG5cbiAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICRjb3Jkb3ZhUGx1Z2luLnNvbWVGdW5jdGlvbigpLnRoZW4oc3VjY2VzcywgZXJyb3IpO1xuICAgIH0pO1xuXG4gICRzY29wZS50YWtlUGljdHVyZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgcXVhbGl0eTogNTAsXG4gICAgICBkZXN0aW5hdGlvblR5cGU6IENhbWVyYS5EZXN0aW5hdGlvblR5cGUuREFUQV9VUkwsXG4gICAgICBzb3VyY2VUeXBlOiBDYW1lcmEuUGljdHVyZVNvdXJjZVR5cGUuQ0FNRVJBLFxuICAgICAgYWxsb3dFZGl0OiBmYWxzZSxcbiAgICAgIGVuY29kaW5nVHlwZTogQ2FtZXJhLkVuY29kaW5nVHlwZS5KUEVHLFxuICAgICAgdGFyZ2V0V2lkdGg6IDMwMCxcbiAgICAgIHRhcmdldEhlaWdodDogMzAwLFxuICAgICAgcG9wb3Zlck9wdGlvbnM6IENhbWVyYVBvcG92ZXJPcHRpb25zLFxuICAgICAgc2F2ZVRvUGhvdG9BbGJ1bTogZmFsc2UsXG5cdCAgICBjb3JyZWN0T3JpZW50YXRpb246dHJ1ZVxuICAgIH07XG5cbiAgICAkY29yZG92YUNhbWVyYS5nZXRQaWN0dXJlKG9wdGlvbnMpLnRoZW4oZnVuY3Rpb24oaW1hZ2VEYXRhKSB7XG4gICAgICAkc2NvcGUuaW1nVVJJID0gXCJkYXRhOmltYWdlL2pwZWc7YmFzZTY0LFwiICsgaW1hZ2VEYXRhO1xuICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgLy8gZXJyb3JcbiAgICB9KTtcblxuICB9O1xuICB9LCBmYWxzZSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiY2hpbGRCYW5rQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRhdXRoLCB1c2VyU2VydmljZSl7XG4gIHZhciB1c2VyVG9rZW4gPSAkYXV0aC5nZXRQYXlsb2FkKCk7XG4gICB1c2VyU2VydmljZS5nZXRVc2VySW5mbyA9IHVzZXJUb2tlbjtcbiAgICRzY29wZS51c2VyID0gdXNlclRva2VuLnN1YjtcbiAgICRzY29wZS50aGVtZSA9ICRzY29wZS51c2VyLnVzZXJfdGhlbWVcblxuICAgJHNjb3BlLiRvbignJGlvbmljVmlldy5iZWZvcmVFbnRlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgdmFyIGdldFRoZW1lID0gZnVuY3Rpb24oKXtcbiAgICAgICAkc2NvcGUudGhlbWUgPSB1c2VyU2VydmljZS5yZXR1cm5UaGVtZSgpXG4gICAgIH1cbiAgICAgaWYodXNlclNlcnZpY2UucmV0dXJuVGhlbWUoKSl7XG4gICAgICAgZ2V0VGhlbWUoKVxuICAgICB9XG4gICAgICRzY29wZS5zZXRUaGVtZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAnYmFzZWJhbGwnKXtcbiAgICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL2ltZy1iYXNlYmFsbC10cmFucy5wbmcnXG4gICAgICAgfVxuICAgICAgIGlmKCRzY29wZS50aGVtZSA9PT0gJ2NoYXJsaWVCcm93bicpe1xuICAgICAgICAgJHNjb3BlLnRoZW1lSW1hZ2UgPSAnLi9pbWcvc25vb3B5LnBuZydcbiAgICAgICB9XG4gICAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAncHJpbmNlc3MnKXtcbiAgICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL0Nyb3duX1ByaW5jZXNzLnBuZydcbiAgICAgICB9XG4gICAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAnc3RhcldhcnMnKXtcbiAgICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL2RlYXRoLXN0YXItMm5kLWljb24ucG5nJ1xuICAgICAgIH1cbiAgICAgICBpZigkc2NvcGUudGhlbWUgPT09ICd3YXRlcicpe1xuICAgICAgICAgJHNjb3BlLnRoZW1lSW1hZ2UgPSAnLi9pbWcvVHJhbnNwYXJlbnRfV2F0ZXJfRHJvcF9QTkdfUGljdHVyZS5wbmcnXG4gICAgICAgfVxuXG4gICAgIH1cbiAgICAgJHNjb3BlLnNldFRoZW1lKCk7XG4gIH0pO1xuXG5cblxuXG5cbiAgIHZhciBnZXRSZXdhcmRzID0gZnVuY3Rpb24oKXtcbiAgICAgaWQgPSAkc2NvcGUudXNlci51c2VyX2lkX3BrO1xuICAgICB1c2VyU2VydmljZS5nZXRSZXdhcmRzKGlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAkc2NvcGUucmV3YXJkcyA9IHJlc3BvbnNlO1xuICAgICB9KVxuICAgfVxuICAgZ2V0UmV3YXJkcygpO1xuXG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiY2hpbGRIb21lQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsLCAkYXV0aCwgdXNlclNlcnZpY2Upe1xuICAvLyAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tICBjaGlsZCBIb21lIGNvbnRyb2xsZXJcIlxuICAvL3ZhciB1c2VyVG9rZW4gPSB1c2VyU2VydmljZS5nZXRVc2VySW5mby5zdWI7XG5cbiAgdmFyIHVzZXJUb2tlbiA9ICRhdXRoLmdldFBheWxvYWQoKTtcbiAgdXNlclNlcnZpY2UuZ2V0VXNlckluZm8gPSB1c2VyVG9rZW47XG4gICRzY29wZS51c2VyID0gdXNlclRva2VuLnN1YjtcblxuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3RoZW1lTW9kYWwuaHRtbCcsIHtcbiAgICAgaWQ6ICcxJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWwxID0gbW9kYWw7XG4gICB9KTtcblxuICAgLy8gTW9kYWwgMlxuICAvLyAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCd0YWtlUGljdHVyZU1vZGFsLmh0bWwnLCB7XG4gIC8vICAgIGlkOiAnMicsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAvLyAgICBzY29wZTogJHNjb3BlLFxuICAvLyAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gIC8vICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAvLyAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAvLyAgICAkc2NvcGUub01vZGFsMiA9IG1vZGFsO1xuICAvLyAgfSk7XG4gICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgaWYgKGluZGV4ID09IDEpICRzY29wZS5vTW9kYWwxLnNob3coKTtcbiAgICAgZWxzZSAkc2NvcGUub01vZGFsMi5zaG93KCk7XG4gICB9O1xuXG4gICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgIGlmIChpbmRleCA9PSAxKSAkc2NvcGUub01vZGFsMS5oaWRlKCk7XG4gICAgIGVsc2UgJHNjb3BlLm9Nb2RhbDIuaGlkZSgpO1xuICAgfTtcblxuICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDEucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWwyLnJlbW92ZSgpO1xuXG4gICB9KTtcblxuICAkc2NvcGUudGhlbWUgPSAkc2NvcGUudXNlci51c2VyX3RoZW1lXG4gICRzY29wZS5zZXRUaGVtZSA9IGZ1bmN0aW9uKGNob2ljZSl7XG4gICAgdmFyIGRhdGEgPSB7fVxuICAgIGRhdGEudGhlbWUgPSBjaG9pY2VcbiAgICBkYXRhLnVzZXJJZCA9ICRzY29wZS51c2VyLnVzZXJfaWRfcGs7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgdXNlclNlcnZpY2Uuc2V0VGhlbWUoZGF0YSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgaWYocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApe1xuICAgICAgJHNjb3BlLnRoZW1lID0gY2hvaWNlXG4gICAgICB9XG4gIH0pXG4gIH1cblxuXG4gIHZhciBnZXREYWlseUNob3JlcyA9IGZ1bmN0aW9uKCl7XG4gICAgaWQgPSAkc2NvcGUudXNlci51c2VyX2lkX3BrXG4gICAgdXNlclNlcnZpY2UuZ2V0RGFpbHlDaG9yZXMoaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgJHNjb3BlLmRhaWx5Q2hvcmVzID0gcmVzcG9uc2U7XG4gICAgfSlcbiAgfVxuICAgZ2V0RGFpbHlDaG9yZXMoKVxuICB2YXIgZ2V0V2Vla2x5Q2hvcmVzID0gZnVuY3Rpb24oKXtcbiAgICBpZCA9ICRzY29wZS51c2VyLnVzZXJfaWRfcGtcbiAgICB1c2VyU2VydmljZS5nZXRXZWVrbHlDaG9yZXMoaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgJHNjb3BlLndlZWtseUNob3JlcyA9IHJlc3BvbnNlO1xuICAgIH0pXG4gIH1cbiAgZ2V0V2Vla2x5Q2hvcmVzKClcbiAgdmFyIGdldE1vbnRobHlDaG9yZXMgPSBmdW5jdGlvbigpe1xuICAgIGlkID0gJHNjb3BlLnVzZXIudXNlcl9pZF9wa1xuICAgIHVzZXJTZXJ2aWNlLmdldE1vbnRobHlDaG9yZXMoaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgJHNjb3BlLm1vbnRobHlDaG9yZXMgPSByZXNwb25zZTtcbiAgICB9KVxuICB9XG4gIGdldE1vbnRobHlDaG9yZXMoKVxuXG4gICRzY29wZS5yZXZlYWxlciA9IGZ1bmN0aW9uKCl7XG4gICB0aGlzLmhpZGUgPSAhdGhpcy5oaWRlO1xuICB9XG5cbiAgJHNjb3BlLmNoZWNrT2ZmY2hvcmUgPSBmdW5jdGlvbihpZCl7XG4gICAgY29uc29sZS5sb2coaWQpO1xuICAgIHVzZXJTZXJ2aWNlLmNoZWNrT2ZmY2hvcmUoaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgIH0pXG4gICB9XG5cblxufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiY2hpbGRMb2dpbkN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkYXV0aCwgJHN0YXRlLCBsb2dpblNlcnZpY2Upe1xuICAvLyAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBjaGlsZCBMb2dpbiBjb250cm9sbGVyXCJcblxuICAgJHNjb3BlLmxvZ2luQ2hpbGQgPSBmdW5jdGlvbih1c2VyKXtcbiAgICAgY29uc29sZS5sb2codXNlcilcbiAgICAgbG9naW5TZXJ2aWNlLnVzZXJMb2dpbih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAkYXV0aC5zZXRUb2tlbihyZXNwb25zZSlcbiAgICAgICAgICRzdGF0ZS5nbygnY2hpbGRIb21lJylcblxuICAgICB9KVxuICAgfVxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJlZGl0Q2hpbGRDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxuICB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiaGlzdG9yeUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gSGlzdG9yeSBjb250cm9sbGVyXCJcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJob21lQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsLHVzZXJTZXJ2aWNlLCR3aW5kb3csICRhdXRoKXtcbiAgdmFyIHVzZXJUb2tlbiA9ICRhdXRoLmdldFBheWxvYWQoKTtcbiAgdXNlclNlcnZpY2UuZ2V0VXNlckluZm8gPSB1c2VyVG9rZW47XG4gICRzY29wZS51c2VyID0gdXNlclRva2VuLnN1YjtcbiAgJHNjb3BlLmJhbm5lciA9ICRzY29wZS51c2VyX2Jhbm5lcl9pbWFnZTtcblxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdiYW5uZXJNb2RhbC5odG1sJywge1xuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm1vZGFsID0gbW9kYWw7XG4gICB9KTtcbiAgICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAgJHNjb3BlLm1vZGFsLnNob3coKTtcbiAgIH07XG4gICAkc2NvcGUuc3VibWl0QmFubmVyID0gZnVuY3Rpb24oYmFubmVyKXtcbiAgICAgdmFyIGJhbm5lckluZm8gPSB7XG4gICAgICAgdXNlcl9ob3VzZWhvbGQ6dXNlci51c2VyX2hvdXNlaG9sZCxcbiAgICAgICB1c2VyX2Jhbm5lcl9pbWFnZTpiYW5uZXJcbiAgICAgfVxuICAgICAgdXNlclNlcnZpY2UucG9zdGJhbm5lcihiYW5uZXJJbmZvKVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsLWJveFwiKS52YWx1ZSA9ICcnO1xuICAgICAgICAgICR3aW5kb3cubG9jYXRpb24ucmVsb2FkKHRydWUpO1xuICAgICB9KTtcbiAgIH07XG4gICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsLWJveFwiKS52YWx1ZSA9ICcnO1xuICAgICAkc2NvcGUubW9kYWwuaGlkZSgpO1xuICAgfTtcbiAgIC8vIENsZWFudXAgdGhlIG1vZGFsIHdoZW4gd2UncmUgZG9uZSB3aXRoIGl0IVxuICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgJHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuICAgfSk7XG4gICAvLyBFeGVjdXRlIGFjdGlvbiBvbiBoaWRlIG1vZGFsXG4gICAkc2NvcGUuJG9uKCdtb2RhbC5oaWRkZW4nLCBmdW5jdGlvbigpIHtcbiAgICAgLy8gRXhlY3V0ZSBhY3Rpb25cblxuICAgfSk7XG4gICAvLyBFeGVjdXRlIGFjdGlvbiBvbiByZW1vdmUgbW9kYWxcbiAgICRzY29wZS4kb24oJ21vZGFsLnJlbW92ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgIH0pO1xuXG4kc2NvcGUuaG91c2Vob2xkID0gICRzY29wZS51c2VyLnVzZXJfaG91c2Vob2xkO1xudXNlclNlcnZpY2UuZ2V0YmFubmVyKCRzY29wZS51c2VyLnVzZXJfaG91c2Vob2xkKS50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gIGNvbnNvbGUubG9nKHJlcy5kYXRhWzBdLnVzZXJfYmFubmVyX2ltYWdlKTtcbiAgICAkc2NvcGUuYmFubmVyID0gcmVzLmRhdGFbMF0udXNlcl9iYW5uZXJfaW1hZ2U7XG59KTtcblxuY29uc29sZS5sb2coJHNjb3BlLnVzZXIuemlwKTtcblxudXNlclNlcnZpY2UuZ2V0V2VhdGhlcigkc2NvcGUudXNlci56aXApXG4udGhlbihmdW5jdGlvbihyZXMpe1xuICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4gICRzY29wZS53ZWF0aGVyID0gcmVzLmRhdGE7XG59KVxuXG5cbnVzZXJTZXJ2aWNlLnNob3djaGlsZCgkc2NvcGUudXNlci51c2VyX2hvdXNlaG9sZClcbi50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gIGNvbnNvbGUubG9nKHJlcy5kYXRhKVxuICAkc2NvcGUuc2hvd2NoaWxkID0gcmVzLmRhdGE7XG59KVxuXG5cbn0pLy9lbmQgb2YgY29udHJvbGxlclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImxvZ2luQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRhdXRoLCAkc3RhdGUsIGxvZ2luU2VydmljZSl7XG5cbiRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uKHVzZXIpe1xuICAvLyBjb25zb2xlLmxvZyh1c2VyKVxuICBsb2dpblNlcnZpY2UudXNlckxvZ2luKHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICRhdXRoLnNldFRva2VuKHJlc3BvbnNlKVxuICAgICAgJHN0YXRlLmdvKCdob21lJylcblxuICB9KVxufVxuJHNjb3BlLm1ha2VVc2VyID0gZnVuY3Rpb24obmV3VXNlcil7XG4gIGxvZ2luU2VydmljZS5tYWtlVXNlcihuZXdVc2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAkYXV0aC5zZXRUb2tlbihyZXNwb25zZSlcbiAgICAgICRzdGF0ZS5nbygnaG9tZScpXG4gIH0pXG59XG4gICRzY29wZS5hdXRoZW50aWNhdGUgPSBmdW5jdGlvbihwcm92aWRlcikge1xuICAkYXV0aC5hdXRoZW50aWNhdGUocHJvdmlkZXIpfTtcbiAgLy8gJHNjb3BlLnRlc3QgPSBcIkhlbGxvIGZyb20gbG9naW4gY29udHJvbGxlclwiXG5cblxuICAkc2NvcGUucmV2ZWFsZXIgPSBmdW5jdGlvbigpe1xuICAkc2NvcGUuaGlkZSA9ICEkc2NvcGUuaGlkZTtcbiB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwibWFrZUNob3JlQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAkc2NvcGUuZ29iYWNrID0gZnVuY3Rpb24oKXtcbiAgICB3aW5kb3cuaGlzdG9yeS5nbygtMSlcbiAgfVxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcInNldFJld2FyZHNDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwpe1xuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3Jld2FyZE1vZGFsLmh0bWwnLCB7XG4gICAgc2NvcGU6ICRzY29wZSxcbiAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICRzY29wZS5tb2RhbCA9IG1vZGFsO1xuICB9KTtcbiAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5zaG93KCk7XG4gIH07XG4gICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcbiAgfTtcbiAgLy8gQ2xlYW51cCB0aGUgbW9kYWwgd2hlbiB3ZSdyZSBkb25lIHdpdGggaXQhXG4gICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuICB9KTtcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gaGlkZSBtb2RhbFxuICAkc2NvcGUuJG9uKCdtb2RhbC5oaWRkZW4nLCBmdW5jdGlvbigpIHtcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxuICB9KTtcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gcmVtb3ZlIG1vZGFsXG4gICRzY29wZS4kb24oJ21vZGFsLnJlbW92ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxuICB9KTtcbiAgLy9iYWNrYnV0dG9uXG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxuICB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwic2V0dGluZ3NDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwpe1xuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2NoYW5nZVBhc3N3b3JkLmh0bWwnLCB7XG4gICAgIGlkOiAnMScsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsMSA9IG1vZGFsO1xuICAgfSk7XG5cbiAgIC8vIE1vZGFsIDJcbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnY2hhbmdlSG91c2Vob2xkLmh0bWwnLCB7XG4gICAgIGlkOiAnMicsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsMiA9IG1vZGFsO1xuICAgfSk7XG5cbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnY2hhbmdlWmlwLmh0bWwnLCB7XG4gICAgIGlkOiAnMycsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsMyA9IG1vZGFsO1xuICAgfSk7XG5cbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnYWRkUGFyZW50Lmh0bWwnLCB7XG4gICAgIGlkOiAnNCcsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsNCA9IG1vZGFsO1xuICAgfSk7XG5cbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgncmVtb3ZlQ2hpbGQuaHRtbCcsIHtcbiAgICAgaWQ6ICc1JywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWw1ID0gbW9kYWw7XG4gICB9KTtcblxuXG5cbiAgICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICBpZiAoaW5kZXggPT0gMSkgJHNjb3BlLm9Nb2RhbDEuc2hvdygpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDIpICRzY29wZS5vTW9kYWwyLnNob3coKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSAzKSAkc2NvcGUub01vZGFsMy5zaG93KCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gNCkgJHNjb3BlLm9Nb2RhbDQuc2hvdygpO1xuICAgICBlbHNlICRzY29wZS5vTW9kYWw1LnNob3coKTtcbiAgIH07XG5cbiAgICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgaWYgKGluZGV4ID09IDEpICRzY29wZS5vTW9kYWwxLmhpZGUoKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSAyKSAkc2NvcGUub01vZGFsMi5oaWRlKCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMykgJHNjb3BlLm9Nb2RhbDMuaGlkZSgpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDQpICRzY29wZS5vTW9kYWw0LmhpZGUoKTtcbiAgICAgZWxzZSAkc2NvcGUub01vZGFsNS5oaWRlKCk7XG4gICB9O1xuXG4gICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAkc2NvcGUub01vZGFsMS5yZW1vdmUoKTtcbiAgICAgJHNjb3BlLm9Nb2RhbDIucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWwzLnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsNC5yZW1vdmUoKTtcbiAgICAgJHNjb3BlLm9Nb2RhbDUucmVtb3ZlKCk7XG4gICB9KTtcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJ0cmFja2VyQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsLCAkc3RhdGUsIHVzZXJTZXJ2aWNlKXtcbiAgICB2YXIgZ2V0Q2hpbGQgPSBmdW5jdGlvbigpe1xuICAgICAgdXNlclNlcnZpY2UuZ2V0Q2hpbGQoJHN0YXRlLnBhcmFtcy5pZCkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgJHNjb3BlLmNoaWxkID0gcmVzcG9uc2VbMF1cbiAgICAgIH0pXG4gICAgfVxuICAgIGdldENoaWxkKClcblxuICAvLyAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3BpY0NvbmZNb2RhbC5odG1sJywge1xuICAvLyAgIHNjb3BlOiAkc2NvcGUsXG4gIC8vICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gIC8vIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgLy8gICAkc2NvcGUubW9kYWwgPSBtb2RhbDtcbiAgLy8gfSk7XG4gIC8vICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgLy8gICAkc2NvcGUubW9kYWwuc2hvdygpO1xuICAvLyB9O1xuICAvLyAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAvLyAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gIC8vIH07XG4gIC8vIC8vIENsZWFudXAgdGhlIG1vZGFsIHdoZW4gd2UncmUgZG9uZSB3aXRoIGl0IVxuICAvLyAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAvLyAgICRzY29wZS5tb2RhbC5yZW1vdmUoKTtcbiAgLy8gfSk7XG4gIC8vIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIGhpZGUgbW9kYWxcbiAgLy8gJHNjb3BlLiRvbignbW9kYWwuaGlkZGVuJywgZnVuY3Rpb24oKSB7XG4gIC8vICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgLy8gfSk7XG4gIC8vIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIHJlbW92ZSBtb2RhbFxuICAvLyAkc2NvcGUuJG9uKCdtb2RhbC5yZW1vdmVkJywgZnVuY3Rpb24oKSB7XG4gIC8vICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgLy8gfSk7XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwidXNlckluZm9DdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIGluZm8gY29udHJvbGxlclwiXG5cbn0pXG4iXX0=
