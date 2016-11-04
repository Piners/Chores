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
    $scope.banner = res.data[0].user_banner_image;
  });

  userService.getWeather($scope.user.zip).then(function (res) {
    $scope.weather = res.data;
  });

  userService.showchild($scope.user.user_household).then(function (res) {
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

angular.module('chore').controller("settingsCtrl", function ($scope, $ionicModal, userService, $auth) {

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

  var userInfo = $auth.getPayload().sub;
  console.log(userInfo);

  $scope.submitPassword = function (user) {
    console.log(userInfo.user_id_pk);
    userService.updatePassword(userInfo.user_id_pk, user.user_new_password).then(function (res) {
      $scope.closeModal(1);
      document.getElementById("old-password").value = '';
      document.getElementById("new-password").value = '';
    });
  };

  $scope.submitHousehold = function (house) {
    console.log(house);
    console.log(userInfo.user_household);
    userService.updateHousehold(userInfo.user_household, house).then(function (res) {
      $scope.closeModal(2);
      document.getElementById("update-household").value = '';
    });
  };

  // send a request to your server to perform server-side logout
  $http.post('/logout').succcess(function () {
    console.log('Successfully logged out');
  });;
}); // end of controller
"use strict";

angular.module('chore').controller("trackerCtrl", function ($scope, $ionicModal, $state, userService) {
  var getChild = function getChild() {
    userService.getChild($state.params.id).then(function (response) {
      console.log(response);
      $scope.child = response[0];
    });

    userService.getDailyChores($state.params.id).then(function (response) {
      console.log(response);
      $scope.dailyChores = response;
    });

    userService.getWeeklyChores($state.params.id).then(function (response) {
      console.log(response);
      $scope.weeklyChores = response;
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

  this.updatePassword = function (id, data) {
    console.log(id);
    console.log(data);
    console.log(JSON.stringify({ "user_new_password": data }));
    return $http({
      method: "PUT",
      url: '/password/' + id,
      data: JSON.stringify({ "user_new_password": data })
    });
  };

  this.updateHousehold = function (id, house) {
    console.log(id);
    console.log(house);
    console.log(JSON.stringify({ "user_household": house }));
    return $http({
      method: "PUT",
      url: '/household/' + id,
      data: JSON.stringify({ "user_household": house })
    });
  };
}); //end of service
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXJzL2FkZENoaWxkQ3RybC5qcyIsImNvbnRyb2xsZXJzL2Fzc2lnbkNob3JlQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NhbWVyYUN0cmwuanMiLCJjb250cm9sbGVycy9jaGlsZEJhbmtDdHJsLmpzIiwiY29udHJvbGxlcnMvY2hpbGRIb21lQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NoaWxkTG9naW5DdHJsLmpzIiwiY29udHJvbGxlcnMvZWRpdENoaWxkQ3RybC5qcyIsImNvbnRyb2xsZXJzL2hpc3RvcnlDdHJsLmpzIiwiY29udHJvbGxlcnMvaG9tZUN0cmwuanMiLCJjb250cm9sbGVycy9sb2dpbkN0cmwuanMiLCJjb250cm9sbGVycy9tYWtlQ2hvcmVDdHJsLmpzIiwiY29udHJvbGxlcnMvc2V0UmV3YXJkc0N0cmwuanMiLCJjb250cm9sbGVycy9zZXR0aW5nc0N0cmwuanMiLCJjb250cm9sbGVycy90cmFja2VyQ3RybC5qcyIsImNvbnRyb2xsZXJzL3VzZXJJbmZvQ3RybC5qcyIsInNlcnZpY2UvY2hvcmVTZXJ2aWNlLmpzIiwic2VydmljZS9sb2dpblNlcnZpY2UuanMiLCJzZXJ2aWNlL3VzZXJTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsIiR1cmxSb3V0ZXJQcm92aWRlciIsIiRhdXRoUHJvdmlkZXIiLCJvdGhlcndpc2UiLCJzdGF0ZSIsInVybCIsInRlbXBsYXRlVXJsIiwiY29udHJvbGxlciIsImZhY2Vib29rIiwiY2xpZW50SWQiLCJyZXNwb25zZVR5cGUiLCJnb29nbGUiLCJydW4iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5Iiwid2luZG93IiwiY29yZG92YSIsInBsdWdpbnMiLCJLZXlib2FyZCIsImhpZGVLZXlib2FyZEFjY2Vzc29yeUJhciIsImRpc2FibGVTY3JvbGwiLCJTdGF0dXNCYXIiLCJzdHlsZURlZmF1bHQiLCIkc2NvcGUiLCJ1c2VyU2VydmljZSIsIiRzdGF0ZSIsImdvYmFjayIsImhpc3RvcnkiLCJnbyIsInVzZXIiLCJnZXRVc2VySW5mbyIsInN1YiIsImNvbnNvbGUiLCJsb2ciLCJzdWJtaXRDaGlsZCIsImNoaWxkIiwidXNlcl9ob3VzZWhvbGQiLCJhZGRDaGlsZCIsInRoZW4iLCJyZXMiLCJjaG9yZVNlcnZpY2UiLCJjdXJyZW50VXNlciIsImdldENoaWxkcmVuIiwiY2hpbGRzIiwiZGF0YSIsInZhbHVlcyIsImNob3JlIiwiY2hvcmVfZGFpbHkiLCJjaG9yZV93ZWVrbHkiLCJjaG9yZV9tb250aGx5IiwiQ3JlYXRlQ2hvcmUiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJob3VzZWhvbGQiLCJ2YWx1ZSIsImRhaWx5Iiwid2Vla2x5IiwibW9udGhseSIsImNob3JlX25hbWUiLCJjaG9yZV9kZXNjcmlwdGlvbiIsInVzZXJfaG91c2Vob2xkX2ZrIiwiY2hvcmVfdmFsdWUiLCJ1c2VyX2lkX2ZrIiwiY2hpbGRyZW5DaG9yZXMiLCJjaGlsZENob3JlIiwic2VsZWN0Q2hpbGQiLCJ1c2VyX2lkX3BrIiwicHVzaCIsInN1Ym1pdENob3JlIiwiZm9yRWFjaCIsInZhbCIsImNyZWF0ZUNob3JlIiwiJGNvcmRvdmFDYW1lcmEiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCIkY29yZG92YVBsdWdpbiIsInNvbWVGdW5jdGlvbiIsInN1Y2Nlc3MiLCJlcnJvciIsInRha2VQaWN0dXJlIiwib3B0aW9ucyIsInF1YWxpdHkiLCJkZXN0aW5hdGlvblR5cGUiLCJDYW1lcmEiLCJEZXN0aW5hdGlvblR5cGUiLCJEQVRBX1VSTCIsInNvdXJjZVR5cGUiLCJQaWN0dXJlU291cmNlVHlwZSIsIkNBTUVSQSIsImFsbG93RWRpdCIsImVuY29kaW5nVHlwZSIsIkVuY29kaW5nVHlwZSIsIkpQRUciLCJ0YXJnZXRXaWR0aCIsInRhcmdldEhlaWdodCIsInBvcG92ZXJPcHRpb25zIiwiQ2FtZXJhUG9wb3Zlck9wdGlvbnMiLCJzYXZlVG9QaG90b0FsYnVtIiwiY29ycmVjdE9yaWVudGF0aW9uIiwiZ2V0UGljdHVyZSIsImltYWdlRGF0YSIsImltZ1VSSSIsImVyciIsIiRhdXRoIiwidXNlclRva2VuIiwiZ2V0UGF5bG9hZCIsInRoZW1lIiwidXNlcl90aGVtZSIsIiRvbiIsImdldFRoZW1lIiwicmV0dXJuVGhlbWUiLCJzZXRUaGVtZSIsInRoZW1lSW1hZ2UiLCJnZXRSZXdhcmRzIiwiaWQiLCJyZXNwb25zZSIsInJld2FyZHMiLCIkaW9uaWNNb2RhbCIsImZyb21UZW1wbGF0ZVVybCIsInNjb3BlIiwiYmFja2Ryb3BDbGlja1RvQ2xvc2UiLCJhbmltYXRpb24iLCJtb2RhbCIsIm9Nb2RhbDEiLCJvcGVuTW9kYWwiLCJpbmRleCIsInNob3ciLCJvTW9kYWwyIiwiY2xvc2VNb2RhbCIsImhpZGUiLCJyZW1vdmUiLCJjaG9pY2UiLCJ1c2VySWQiLCJzdGF0dXMiLCJnZXREYWlseUNob3JlcyIsImRhaWx5Q2hvcmVzIiwiZ2V0V2Vla2x5Q2hvcmVzIiwid2Vla2x5Q2hvcmVzIiwiZ2V0TW9udGhseUNob3JlcyIsIm1vbnRobHlDaG9yZXMiLCJyZXZlYWxlciIsImNoZWNrT2ZmY2hvcmUiLCIkaHR0cCIsInBvc3QiLCJzdWNjY2VzcyIsImxvZ2luU2VydmljZSIsImxvZ2luQ2hpbGQiLCJ1c2VyTG9naW4iLCJzZXRUb2tlbiIsInRlc3QiLCIkd2luZG93IiwiYmFubmVyIiwidXNlcl9iYW5uZXJfaW1hZ2UiLCJzdWJtaXRCYW5uZXIiLCJiYW5uZXJJbmZvIiwicG9zdGJhbm5lciIsImdldEVsZW1lbnRCeUlkIiwibG9jYXRpb24iLCJyZWxvYWQiLCJnZXRiYW5uZXIiLCJnZXRXZWF0aGVyIiwiemlwIiwid2VhdGhlciIsInNob3djaGlsZCIsImxvZ291dCIsImxvZ2luIiwibWFrZVVzZXIiLCJuZXdVc2VyIiwiYXV0aGVudGljYXRlIiwicHJvdmlkZXIiLCJvTW9kYWwzIiwib01vZGFsNCIsIm9Nb2RhbDUiLCJ1c2VySW5mbyIsInN1Ym1pdFBhc3N3b3JkIiwidXBkYXRlUGFzc3dvcmQiLCJ1c2VyX25ld19wYXNzd29yZCIsInN1Ym1pdEhvdXNlaG9sZCIsImhvdXNlIiwidXBkYXRlSG91c2Vob2xkIiwiZ2V0Q2hpbGQiLCJwYXJhbXMiLCJzZXJ2aWNlIiwiJHEiLCJtZXRob2QiLCJKU09OIiwic3RyaW5naWZ5IiwiY2F0Y2giXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBQSxRQUFRQyxNQUFSLENBQWUsT0FBZixFQUF3QixDQUFDLE9BQUQsRUFBVSxZQUFWLENBQXhCLEVBQ0NDLE1BREQsQ0FDUSxVQUFTQyxjQUFULEVBQXlCQyxrQkFBekIsRUFBNkNDLGFBQTdDLEVBQTJEO0FBQ2pFRCxxQkFBbUJFLFNBQW5CLENBQTZCLFFBQTdCO0FBQ0FILGlCQUNDSSxLQURELENBQ08sVUFEUCxFQUNrQjtBQUNoQkMsU0FBSSxXQURZO0FBRWhCQyxpQkFBYSwyQkFGRztBQUdoQkMsZ0JBQVk7QUFISSxHQURsQixFQU1DSCxLQU5ELENBTU8sYUFOUCxFQU1xQjtBQUNuQkMsU0FBSSxjQURlO0FBRW5CQyxpQkFBYSw4QkFGTTtBQUduQkMsZ0JBQVk7QUFITyxHQU5yQixFQVdDSCxLQVhELENBV08sV0FYUCxFQVdtQjtBQUNqQkMsU0FBSSxnQkFEYTtBQUVqQkMsaUJBQWEsNEJBRkk7QUFHakJDLGdCQUFZO0FBSEssR0FYbkIsRUFnQkNILEtBaEJELENBZ0JPLFNBaEJQLEVBZ0JpQjtBQUNmQyxTQUFJLFVBRFc7QUFFZkMsaUJBQWEsMEJBRkU7QUFHZkMsZ0JBQVk7QUFIRyxHQWhCakIsRUFxQkNILEtBckJELENBcUJPLE1BckJQLEVBcUJjO0FBQ1pDLFNBQUksT0FEUTtBQUVaQyxpQkFBYSx1QkFGRDtBQUdaQyxnQkFBWTtBQUhBLEdBckJkLEVBMEJDSCxLQTFCRCxDQTBCTyxPQTFCUCxFQTBCZTtBQUNiQyxTQUFJLFFBRFM7QUFFYkMsaUJBQWEsd0JBRkE7QUFHYkMsZ0JBQVk7QUFIQyxHQTFCZixFQStCQ0gsS0EvQkQsQ0Er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QU02SSxLQUFLQyxTQUFMLENBQWUsRUFBQyxrQkFBa0JSLEtBQW5CLEVBQWY7QUFISyxLQUFOLENBQVA7QUFLRCxHQVREO0FBZ0JDLENBaktELEdBaUtHIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIElvbmljIFN0YXJ0ZXIgQXBwXG5cbi8vIGFuZ3VsYXIubW9kdWxlIGlzIGEgZ2xvYmFsIHBsYWNlIGZvciBjcmVhdGluZywgcmVnaXN0ZXJpbmcgYW5kIHJldHJpZXZpbmcgQW5ndWxhciBtb2R1bGVzXG4vLyAnc3RhcnRlcicgaXMgdGhlIG5hbWUgb2YgdGhpcyBhbmd1bGFyIG1vZHVsZSBleGFtcGxlIChhbHNvIHNldCBpbiBhIDxib2R5PiBhdHRyaWJ1dGUgaW4gaW5kZXguaHRtbClcbi8vIHRoZSAybmQgcGFyYW1ldGVyIGlzIGFuIGFycmF5IG9mICdyZXF1aXJlcydcblxuYW5ndWxhci5tb2R1bGUoJ2Nob3JlJywgWydpb25pYycsICdzYXRlbGxpemVyJ10pXG4uY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRhdXRoUHJvdmlkZXIpe1xuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKFwiL2xvZ2luXCIpO1xuICAkc3RhdGVQcm92aWRlclxuICAuc3RhdGUoJ2FkZENoaWxkJyx7XG4gICAgdXJsOlwiL2FkZENoaWxkXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvYWRkQ2hpbGQuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiYWRkQ2hpbGRDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdhc3NpZ25DaG9yZScse1xuICAgIHVybDpcIi9hc3NpZ25DaG9yZVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2Fzc2lnbkNob3JlLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImFzc2lnbkNob3JlQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnZWRpdENoaWxkJyx7XG4gICAgdXJsOlwiL2VkaXRDaGlsZC86aWRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9lZGl0Q2hpbGQuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiZWRpdENoaWxkQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnaGlzdG9yeScse1xuICAgIHVybDpcIi9oaXN0b3J5XCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvaGlzdG9yeS5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJoaXN0b3J5Q3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnaG9tZScse1xuICAgIHVybDpcIi9ob21lXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvaG9tZS5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJob21lQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnbG9naW4nLHtcbiAgICB1cmw6XCIvbG9naW5cIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9Mb2dpbi5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJsb2dpbkN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ21ha2VDaG9yZScse1xuICAgIHVybDpcIi9tYWtlQ2hvcmVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9tYWtlQ2hvcmUuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwibWFrZUNob3JlQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnc2V0UmV3YXJkcycse1xuICAgIHVybDpcIi9zZXRSZXdhcmRzLzppZFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL3NldFJld2FyZHMuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwic2V0UmV3YXJkc0N0cmxcIlxuICB9KVxuICAuc3RhdGUoJ3NldHRpbmdzJyx7XG4gICAgdXJsOlwiL3NldHRpbmdzXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvc2V0dGluZ3MuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwic2V0dGluZ3NDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCd0cmFja2VyJyx7XG4gICAgdXJsOlwiL3RyYWNrZXIvOmlkXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvdHJhY2tlci5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJ0cmFja2VyQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgndXNlckluZm8nLHtcbiAgICB1cmw6XCIvdXNlckluZm9cIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy91c2VySW5mby5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJ1c2VySW5mb0N0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2NoaWxkQmFuaycse1xuICAgIHVybDpcIi9jaGlsZC9iYW5rXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvY2hpbGRCYW5rLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImNoaWxkQmFua0N0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2NoaWxkSG9tZScse1xuICAgIHVybDpcIi9jaGlsZC9ob21lXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvY2hpbGRIb21lLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImNoaWxkSG9tZUN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2NoaWxkTG9naW4nLHtcbiAgICB1cmw6XCIvY2hpbGQvbG9naW5cIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9jaGlsZExvZ2luLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImNoaWxkTG9naW5DdHJsXCJcbiAgfSlcblxuICAkYXV0aFByb3ZpZGVyLmZhY2Vib29rKHtcbiAgICBjbGllbnRJZDogJzMzMjI3MjA1NzEzMjY4MSdcbiAgfSk7XG5cbiAgLy8gT3B0aW9uYWw6IEZvciBjbGllbnQtc2lkZSB1c2UgKEltcGxpY2l0IEdyYW50KSwgc2V0IHJlc3BvbnNlVHlwZSB0byAndG9rZW4nIChkZWZhdWx0OiAnY29kZScpXG4gICRhdXRoUHJvdmlkZXIuZmFjZWJvb2soe1xuICAgIGNsaWVudElkOiAnMzMyMjcyMDU3MTMyNjgxJyxcbiAgICByZXNwb25zZVR5cGU6ICd0b2tlbidcbiAgfSk7XG5cbiAgJGF1dGhQcm92aWRlci5nb29nbGUoe1xuICAgIGNsaWVudElkOiAnMjc1MzUyOTYwOTQ2LTVyY2FuM3FraGxzYzdtNTBoZXY1ZG4yZTJjYWU5bWJwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tJyxcbiAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxMDAvIy9sb2dpbi8nXG4gIH0pO1xufSlcblxuXG5cbi5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0pIHtcbiAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgaWYod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxuICAgICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcblxuICAgICAgLy8gRG9uJ3QgcmVtb3ZlIHRoaXMgbGluZSB1bmxlc3MgeW91IGtub3cgd2hhdCB5b3UgYXJlIGRvaW5nLiBJdCBzdG9wcyB0aGUgdmlld3BvcnRcbiAgICAgIC8vIGZyb20gc25hcHBpbmcgd2hlbiB0ZXh0IGlucHV0cyBhcmUgZm9jdXNlZC4gSW9uaWMgaGFuZGxlcyB0aGlzIGludGVybmFsbHkgZm9yXG4gICAgICAvLyBhIG11Y2ggbmljZXIga2V5Ym9hcmQgZXhwZXJpZW5jZS5cbiAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5kaXNhYmxlU2Nyb2xsKHRydWUpO1xuICAgIH1cbiAgICBpZih3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XG4gICAgfVxuICB9KTtcbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiYWRkQ2hpbGRDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSx1c2VyU2VydmljZSwkc3RhdGUpe1xuICAvL2JhY2tidXR0b25cbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XG4gICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpXG4gIH1cbnZhciB1c2VyID0gdXNlclNlcnZpY2UuZ2V0VXNlckluZm8uc3ViO1xuY29uc29sZS5sb2codXNlcik7XG4kc2NvcGUuc3VibWl0Q2hpbGQgPSBmdW5jdGlvbihjaGlsZCl7XG4gIGNoaWxkLnVzZXJfaG91c2Vob2xkID0gdXNlci51c2VyX2hvdXNlaG9sZDtcbiAgY29uc29sZS5sb2coY2hpbGQpO1xuICB1c2VyU2VydmljZS5hZGRDaGlsZChjaGlsZClcbiAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAkc3RhdGUuZ28oJ2hvbWUnKTtcbiAgfSk7XG5cbn1cblxuXG5cblxuXG59KSAvL2VuZCBvZiBjb250cm9sbGVyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiYXNzaWduQ2hvcmVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSxjaG9yZVNlcnZpY2UsJHN0YXRlKXtcblxudmFyIGN1cnJlbnRVc2VyID0gY2hvcmVTZXJ2aWNlLmdldFVzZXJJbmZvLnN1YjtcblxuXG5jaG9yZVNlcnZpY2UuZ2V0Q2hpbGRyZW4oY3VycmVudFVzZXIudXNlcl9ob3VzZWhvbGQpXG4udGhlbihmdW5jdGlvbihyZXMpe1xuICAvLyAkc2NvcGUuY2hvcmVzID0gcmVzLmRhdGE7XG4gICRzY29wZS5jaGlsZHMgPSByZXMuZGF0YTtcbiAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xufSk7XG5cblxuJHNjb3BlLnZhbHVlcyA9IFtdO1xuXG4kc2NvcGUuY2hvcmUgPSB7XG5jaG9yZV9kYWlseTogZmFsc2UsXG5jaG9yZV93ZWVrbHk6IGZhbHNlLFxuY2hvcmVfbW9udGhseTpmYWxzZSxcblxufTtcblxuZnVuY3Rpb24gQ3JlYXRlQ2hvcmUobmFtZSxkZXNjcmlwdGlvbixob3VzZWhvbGQsdmFsdWUsZGFpbHksd2Vla2x5LG1vbnRobHksY2hpbGQpe1xuICB0aGlzLmNob3JlX25hbWUgPSBuYW1lO1xuICB0aGlzLmNob3JlX2Rlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gIHRoaXMudXNlcl9ob3VzZWhvbGRfZmsgPSBob3VzZWhvbGQ7XG4gIHRoaXMuY2hvcmVfdmFsdWUgPSB2YWx1ZTtcbiAgdGhpcy5jaG9yZV9kYWlseSA9IGRhaWx5O1xuICB0aGlzLmNob3JlX3dlZWtseSA9IHdlZWtseTtcbiAgdGhpcy5jaG9yZV9tb250aGx5ID0gbW9udGhseTtcbiAgdGhpcy51c2VyX2lkX2ZrID0gY2hpbGQ7XG59XG5cblxudmFyIGNoaWxkcmVuQ2hvcmVzID0gW107XG4kc2NvcGUuY2hpbGRDaG9yZSA9IGZ1bmN0aW9uKGNob3JlKXtcbiAgdmFyIHNlbGVjdENoaWxkID0gdGhpcy5jaGlsZC51c2VyX2lkX3BrO1xuICB2YXIgY2hpbGRDaG9yZSA9IG5ldyBDcmVhdGVDaG9yZShjaG9yZS5jaG9yZV9uYW1lLGNob3JlLmNob3JlX2Rlc2NyaXB0aW9uLGN1cnJlbnRVc2VyLnVzZXJfaG91c2Vob2xkLGNob3JlLmNob3JlX3ZhbHVlLGNob3JlLmNob3JlX2RhaWx5LGNob3JlLmNob3JlX3dlZWtseSxjaG9yZS5jaG9yZV9tb250aGx5LHNlbGVjdENoaWxkKTtcbmNvbnNvbGUubG9nKGNoaWxkQ2hvcmUpO1xuICBjaGlsZHJlbkNob3Jlcy5wdXNoKGNoaWxkQ2hvcmUpO1xuICBjb25zb2xlLmxvZyhjaGlsZHJlbkNob3Jlcyk7XG59O1xuXG5cbiRzY29wZS5zdWJtaXRDaG9yZSA9IGZ1bmN0aW9uKCl7XG4gIGNvbnNvbGUubG9nKGNoaWxkcmVuQ2hvcmVzKTtcbiAgY2hpbGRyZW5DaG9yZXMuZm9yRWFjaChmdW5jdGlvbih2YWwpe1xuICAgIGNvbnNvbGUubG9nKCdpJyk7XG4gICAgY2hvcmVTZXJ2aWNlLmNyZWF0ZUNob3JlKHZhbClcbiAgICAudGhlbihmdW5jdGlvbihyZXMpe30pO1xuICB9XG5cbik7XG5jaGlsZHJlbkNob3JlcyA9IFtdO1xufTtcblxuXG5cblxuXG5cblxufSk7Ly9lbmQgb2YgY29udHJvbGxlclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcignY2FtZXJhQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGNvcmRvdmFDYW1lcmEpIHtcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZGV2aWNlcmVhZHlcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgJGNvcmRvdmFQbHVnaW4uc29tZUZ1bmN0aW9uKCkudGhlbihzdWNjZXNzLCBlcnJvcik7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgLy8gT1Igd2l0aCBJT05JQ1xuXG4gICAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAkY29yZG92YVBsdWdpbi5zb21lRnVuY3Rpb24oKS50aGVuKHN1Y2Nlc3MsIGVycm9yKTtcbiAgICB9KTtcblxuICAkc2NvcGUudGFrZVBpY3R1cmUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIHF1YWxpdHk6IDUwLFxuICAgICAgZGVzdGluYXRpb25UeXBlOiBDYW1lcmEuRGVzdGluYXRpb25UeXBlLkRBVEFfVVJMLFxuICAgICAgc291cmNlVHlwZTogQ2FtZXJhLlBpY3R1cmVTb3VyY2VUeXBlLkNBTUVSQSxcbiAgICAgIGFsbG93RWRpdDogZmFsc2UsXG4gICAgICBlbmNvZGluZ1R5cGU6IENhbWVyYS5FbmNvZGluZ1R5cGUuSlBFRyxcbiAgICAgIHRhcmdldFdpZHRoOiAzMDAsXG4gICAgICB0YXJnZXRIZWlnaHQ6IDMwMCxcbiAgICAgIHBvcG92ZXJPcHRpb25zOiBDYW1lcmFQb3BvdmVyT3B0aW9ucyxcbiAgICAgIHNhdmVUb1Bob3RvQWxidW06IGZhbHNlLFxuXHQgICAgY29ycmVjdE9yaWVudGF0aW9uOnRydWVcbiAgICB9O1xuXG4gICAgJGNvcmRvdmFDYW1lcmEuZ2V0UGljdHVyZShvcHRpb25zKS50aGVuKGZ1bmN0aW9uKGltYWdlRGF0YSkge1xuICAgICAgJHNjb3BlLmltZ1VSSSA9IFwiZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCxcIiArIGltYWdlRGF0YTtcbiAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgIC8vIGVycm9yXG4gICAgfSk7XG5cbiAgfTtcbiAgfSwgZmFsc2UpO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImNoaWxkQmFua0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkYXV0aCwgdXNlclNlcnZpY2Upe1xuICB2YXIgdXNlclRva2VuID0gJGF1dGguZ2V0UGF5bG9hZCgpO1xuICAgdXNlclNlcnZpY2UuZ2V0VXNlckluZm8gPSB1c2VyVG9rZW47XG4gICAkc2NvcGUudXNlciA9IHVzZXJUb2tlbi5zdWI7XG4gICAkc2NvcGUudGhlbWUgPSAkc2NvcGUudXNlci51c2VyX3RoZW1lXG5cbiAgICRzY29wZS4kb24oJyRpb25pY1ZpZXcuYmVmb3JlRW50ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgIHZhciBnZXRUaGVtZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgJHNjb3BlLnRoZW1lID0gdXNlclNlcnZpY2UucmV0dXJuVGhlbWUoKVxuICAgICB9XG4gICAgIGlmKHVzZXJTZXJ2aWNlLnJldHVyblRoZW1lKCkpe1xuICAgICAgIGdldFRoZW1lKClcbiAgICAgfVxuICAgICAkc2NvcGUuc2V0VGhlbWUgPSBmdW5jdGlvbigpe1xuICAgICAgIGlmKCRzY29wZS50aGVtZSA9PT0gJ2Jhc2ViYWxsJyl7XG4gICAgICAgICAkc2NvcGUudGhlbWVJbWFnZSA9ICcuL2ltZy9pbWctYmFzZWJhbGwtdHJhbnMucG5nJ1xuICAgICAgIH1cbiAgICAgICBpZigkc2NvcGUudGhlbWUgPT09ICdjaGFybGllQnJvd24nKXtcbiAgICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL3Nub29weS5wbmcnXG4gICAgICAgfVxuICAgICAgIGlmKCRzY29wZS50aGVtZSA9PT0gJ3ByaW5jZXNzJyl7XG4gICAgICAgICAkc2NvcGUudGhlbWVJbWFnZSA9ICcuL2ltZy9Dcm93bl9QcmluY2Vzcy5wbmcnXG4gICAgICAgfVxuICAgICAgIGlmKCRzY29wZS50aGVtZSA9PT0gJ3N0YXJXYXJzJyl7XG4gICAgICAgICAkc2NvcGUudGhlbWVJbWFnZSA9ICcuL2ltZy9kZWF0aC1zdGFyLTJuZC1pY29uLnBuZydcbiAgICAgICB9XG4gICAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAnd2F0ZXInKXtcbiAgICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL1RyYW5zcGFyZW50X1dhdGVyX0Ryb3BfUE5HX1BpY3R1cmUucG5nJ1xuICAgICAgIH1cblxuICAgICB9XG4gICAgICRzY29wZS5zZXRUaGVtZSgpO1xuICB9KTtcblxuXG5cblxuXG4gICB2YXIgZ2V0UmV3YXJkcyA9IGZ1bmN0aW9uKCl7XG4gICAgIGlkID0gJHNjb3BlLnVzZXIudXNlcl9pZF9waztcbiAgICAgdXNlclNlcnZpY2UuZ2V0UmV3YXJkcyhpZCkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgJHNjb3BlLnJld2FyZHMgPSByZXNwb25zZTtcbiAgICAgfSlcbiAgIH1cbiAgIGdldFJld2FyZHMoKTtcblxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImNoaWxkSG9tZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCwgJGF1dGgsIHVzZXJTZXJ2aWNlKXtcbiAgLy8gJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSAgY2hpbGQgSG9tZSBjb250cm9sbGVyXCJcbiAgLy92YXIgdXNlclRva2VuID0gdXNlclNlcnZpY2UuZ2V0VXNlckluZm8uc3ViO1xuXG4gIHZhciB1c2VyVG9rZW4gPSAkYXV0aC5nZXRQYXlsb2FkKCk7XG4gIHVzZXJTZXJ2aWNlLmdldFVzZXJJbmZvID0gdXNlclRva2VuO1xuICAkc2NvcGUudXNlciA9IHVzZXJUb2tlbi5zdWI7XG5cbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCd0aGVtZU1vZGFsLmh0bWwnLCB7XG4gICAgIGlkOiAnMScsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsMSA9IG1vZGFsO1xuICAgfSk7XG5cbiAgIC8vIE1vZGFsIDJcbiAgLy8gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgndGFrZVBpY3R1cmVNb2RhbC5odG1sJywge1xuICAvLyAgICBpZDogJzInLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgLy8gICAgc2NvcGU6ICRzY29wZSxcbiAgLy8gICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAvLyAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgLy8gIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgLy8gICAgJHNjb3BlLm9Nb2RhbDIgPSBtb2RhbDtcbiAgLy8gIH0pO1xuICAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgIGlmIChpbmRleCA9PSAxKSAkc2NvcGUub01vZGFsMS5zaG93KCk7XG4gICAgIGVsc2UgJHNjb3BlLm9Nb2RhbDIuc2hvdygpO1xuICAgfTtcblxuICAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICBpZiAoaW5kZXggPT0gMSkgJHNjb3BlLm9Nb2RhbDEuaGlkZSgpO1xuICAgICBlbHNlICRzY29wZS5vTW9kYWwyLmhpZGUoKTtcbiAgIH07XG5cbiAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICRzY29wZS5vTW9kYWwxLnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsMi5yZW1vdmUoKTtcblxuICAgfSk7XG5cbiAgJHNjb3BlLnRoZW1lID0gJHNjb3BlLnVzZXIudXNlcl90aGVtZVxuICAkc2NvcGUuc2V0VGhlbWUgPSBmdW5jdGlvbihjaG9pY2Upe1xuICAgIHZhciBkYXRhID0ge31cbiAgICBkYXRhLnRoZW1lID0gY2hvaWNlXG4gICAgZGF0YS51c2VySWQgPSAkc2NvcGUudXNlci51c2VyX2lkX3BrO1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIHVzZXJTZXJ2aWNlLnNldFRoZW1lKGRhdGEpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgIGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKXtcbiAgICAgICRzY29wZS50aGVtZSA9IGNob2ljZVxuICAgICAgfVxuICB9KVxuICB9XG5cblxuICB2YXIgZ2V0RGFpbHlDaG9yZXMgPSBmdW5jdGlvbigpe1xuICAgIGlkID0gJHNjb3BlLnVzZXIudXNlcl9pZF9wa1xuICAgIHVzZXJTZXJ2aWNlLmdldERhaWx5Q2hvcmVzKGlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXsgXG4gICAgICAkc2NvcGUuZGFpbHlDaG9yZXMgPSByZXNwb25zZTtcbiAgICB9KVxuICB9XG4gICBnZXREYWlseUNob3JlcygpXG4gIHZhciBnZXRXZWVrbHlDaG9yZXMgPSBmdW5jdGlvbigpe1xuICAgIGlkID0gJHNjb3BlLnVzZXIudXNlcl9pZF9wa1xuICAgIHVzZXJTZXJ2aWNlLmdldFdlZWtseUNob3JlcyhpZCkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAkc2NvcGUud2Vla2x5Q2hvcmVzID0gcmVzcG9uc2U7XG4gICAgfSlcbiAgfVxuICBnZXRXZWVrbHlDaG9yZXMoKVxuICB2YXIgZ2V0TW9udGhseUNob3JlcyA9IGZ1bmN0aW9uKCl7XG4gICAgaWQgPSAkc2NvcGUudXNlci51c2VyX2lkX3BrXG4gICAgdXNlclNlcnZpY2UuZ2V0TW9udGhseUNob3JlcyhpZCkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAkc2NvcGUubW9udGhseUNob3JlcyA9IHJlc3BvbnNlO1xuICAgIH0pXG4gIH1cbiAgZ2V0TW9udGhseUNob3JlcygpXG5cbiAgJHNjb3BlLnJldmVhbGVyID0gZnVuY3Rpb24oKXtcbiAgIHRoaXMuaGlkZSA9ICF0aGlzLmhpZGU7XG4gIH1cblxuICAkc2NvcGUuY2hlY2tPZmZjaG9yZSA9IGZ1bmN0aW9uKGlkKXtcbiAgICBjb25zb2xlLmxvZyhpZCk7XG4gICAgdXNlclNlcnZpY2UuY2hlY2tPZmZjaG9yZShpZCkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgfSlcbiAgIH1cbiAgIC8vIHNlbmQgYSByZXF1ZXN0IHRvIHlvdXIgc2VydmVyIHRvIHBlcmZvcm0gc2VydmVyLXNpZGUgbG9nb3V0XG4gICAgJGh0dHAucG9zdCgnL2xvZ291dCcpLnN1Y2NjZXNzKGZ1bmN0aW9uKCkge1xuICAgICAgY29uc29sZS5sb2coJ1N1Y2Nlc3NmdWxseSBsb2dnZWQgb3V0Jyk7XG4gICAgfSk7O1xufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiY2hpbGRMb2dpbkN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkYXV0aCwgJHN0YXRlLCBsb2dpblNlcnZpY2Upe1xuICAvLyAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBjaGlsZCBMb2dpbiBjb250cm9sbGVyXCJcblxuICAgJHNjb3BlLmxvZ2luQ2hpbGQgPSBmdW5jdGlvbih1c2VyKXtcbiAgICAgY29uc29sZS5sb2codXNlcilcbiAgICAgbG9naW5TZXJ2aWNlLnVzZXJMb2dpbih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAkYXV0aC5zZXRUb2tlbihyZXNwb25zZSlcbiAgICAgICAgICRzdGF0ZS5nbygnY2hpbGRIb21lJylcblxuICAgICB9KVxuICAgfVxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJlZGl0Q2hpbGRDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxuICB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiaGlzdG9yeUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gSGlzdG9yeSBjb250cm9sbGVyXCJcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJob21lQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsLHVzZXJTZXJ2aWNlLCR3aW5kb3csICRhdXRoKXtcbiAgdmFyIHVzZXJUb2tlbiA9ICRhdXRoLmdldFBheWxvYWQoKTtcbiAgdXNlclNlcnZpY2UuZ2V0VXNlckluZm8gPSB1c2VyVG9rZW47XG4gICRzY29wZS51c2VyID0gdXNlclRva2VuLnN1YjtcbiAgJHNjb3BlLmJhbm5lciA9ICRzY29wZS51c2VyX2Jhbm5lcl9pbWFnZTtcblxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdiYW5uZXJNb2RhbC5odG1sJywge1xuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm1vZGFsID0gbW9kYWw7XG4gICB9KTtcbiAgICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAgJHNjb3BlLm1vZGFsLnNob3coKTtcbiAgIH07XG4gICAkc2NvcGUuc3VibWl0QmFubmVyID0gZnVuY3Rpb24oYmFubmVyKXtcbiAgICAgdmFyIGJhbm5lckluZm8gPSB7XG4gICAgICAgdXNlcl9ob3VzZWhvbGQ6dXNlci51c2VyX2hvdXNlaG9sZCxcbiAgICAgICB1c2VyX2Jhbm5lcl9pbWFnZTpiYW5uZXJcbiAgICAgfVxuICAgICAgdXNlclNlcnZpY2UucG9zdGJhbm5lcihiYW5uZXJJbmZvKVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsLWJveFwiKS52YWx1ZSA9ICcnO1xuICAgICAgICAgICR3aW5kb3cubG9jYXRpb24ucmVsb2FkKHRydWUpO1xuICAgICB9KTtcbiAgIH07XG4gICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsLWJveFwiKS52YWx1ZSA9ICcnO1xuICAgICAkc2NvcGUubW9kYWwuaGlkZSgpO1xuICAgfTtcbiAgIC8vIENsZWFudXAgdGhlIG1vZGFsIHdoZW4gd2UncmUgZG9uZSB3aXRoIGl0IVxuICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgJHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuICAgfSk7XG4gICAvLyBFeGVjdXRlIGFjdGlvbiBvbiBoaWRlIG1vZGFsXG4gICAkc2NvcGUuJG9uKCdtb2RhbC5oaWRkZW4nLCBmdW5jdGlvbigpIHtcbiAgICAgLy8gRXhlY3V0ZSBhY3Rpb25cblxuICAgfSk7XG4gICAvLyBFeGVjdXRlIGFjdGlvbiBvbiByZW1vdmUgbW9kYWxcbiAgICRzY29wZS4kb24oJ21vZGFsLnJlbW92ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgIH0pO1xuXG5cbiRzY29wZS5ob3VzZWhvbGQgPSAgJHNjb3BlLnVzZXIudXNlcl9ob3VzZWhvbGQ7XG51c2VyU2VydmljZS5nZXRiYW5uZXIoJHNjb3BlLnVzZXIudXNlcl9ob3VzZWhvbGQpLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAkc2NvcGUuYmFubmVyID0gcmVzLmRhdGFbMF0udXNlcl9iYW5uZXJfaW1hZ2U7XG59KTtcblxuXG5cbnVzZXJTZXJ2aWNlLmdldFdlYXRoZXIoJHNjb3BlLnVzZXIuemlwKVxuLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgJHNjb3BlLndlYXRoZXIgPSByZXMuZGF0YTtcbn0pXG5cblxudXNlclNlcnZpY2Uuc2hvd2NoaWxkKCRzY29wZS51c2VyLnVzZXJfaG91c2Vob2xkKVxuLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgJHNjb3BlLnNob3djaGlsZCA9IHJlcy5kYXRhO1xufSlcbiRhdXRoLmxvZ291dCgpLnRoZW4oZnVuY3Rpb24oKSB7XG5cbiAvLyBzZW5kIGEgcmVxdWVzdCB0byB5b3VyIHNlcnZlciB0byBwZXJmb3JtIHNlcnZlci1zaWRlIGxvZ291dFxuICAkaHR0cC5wb3N0KCcvbG9nb3V0Jykuc3VjY2Nlc3MoZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coJ1N1Y2Nlc3NmdWxseSBsb2dnZWQgb3V0Jyk7XG4gIH0pOztcblxufSk7XG5cblxufSkvL2VuZCBvZiBjb250cm9sbGVyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwibG9naW5DdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGF1dGgsICRzdGF0ZSwgbG9naW5TZXJ2aWNlKXtcblxuJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24odXNlcil7XG4gIC8vIGNvbnNvbGUubG9nKHVzZXIpXG4gIGxvZ2luU2VydmljZS51c2VyTG9naW4odXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgJGF1dGguc2V0VG9rZW4ocmVzcG9uc2UpXG4gICAgICAkc3RhdGUuZ28oJ2hvbWUnKVxuXG4gIH0pXG59XG4kc2NvcGUubWFrZVVzZXIgPSBmdW5jdGlvbihuZXdVc2VyKXtcbiAgbG9naW5TZXJ2aWNlLm1ha2VVc2VyKG5ld1VzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICRhdXRoLnNldFRva2VuKHJlc3BvbnNlKVxuICAgICAgJHN0YXRlLmdvKCdob21lJylcbiAgfSlcbn1cbiAgJHNjb3BlLmF1dGhlbnRpY2F0ZSA9IGZ1bmN0aW9uKHByb3ZpZGVyKSB7XG4gICRhdXRoLmF1dGhlbnRpY2F0ZShwcm92aWRlcil9O1xuICAvLyAkc2NvcGUudGVzdCA9IFwiSGVsbG8gZnJvbSBsb2dpbiBjb250cm9sbGVyXCJcblxuXG4gICRzY29wZS5yZXZlYWxlciA9IGZ1bmN0aW9uKCl7XG4gICRzY29wZS5oaWRlID0gISRzY29wZS5oaWRlO1xuIH1cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJtYWtlQ2hvcmVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxuICB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwic2V0UmV3YXJkc0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCl7XG4gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgncmV3YXJkTW9kYWwuaHRtbCcsIHtcbiAgICBzY29wZTogJHNjb3BlLFxuICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgJHNjb3BlLm1vZGFsID0gbW9kYWw7XG4gIH0pO1xuICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLnNob3coKTtcbiAgfTtcbiAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwuaGlkZSgpO1xuICB9O1xuICAvLyBDbGVhbnVwIHRoZSBtb2RhbCB3aGVuIHdlJ3JlIGRvbmUgd2l0aCBpdCFcbiAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwucmVtb3ZlKCk7XG4gIH0pO1xuICAvLyBFeGVjdXRlIGFjdGlvbiBvbiBoaWRlIG1vZGFsXG4gICRzY29wZS4kb24oJ21vZGFsLmhpZGRlbicsIGZ1bmN0aW9uKCkge1xuICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gIH0pO1xuICAvLyBFeGVjdXRlIGFjdGlvbiBvbiByZW1vdmUgbW9kYWxcbiAgJHNjb3BlLiRvbignbW9kYWwucmVtb3ZlZCcsIGZ1bmN0aW9uKCkge1xuICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gIH0pO1xuICAvL2JhY2tidXR0b25cbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XG4gICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpXG4gIH1cblxufSlcbiIsIlxuYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcInNldHRpbmdzQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsLCB1c2VyU2VydmljZSwkYXV0aCl7XG5cbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdjaGFuZ2VQYXNzd29yZC5odG1sJywge1xuICAgICBpZDogJzEnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDEgPSBtb2RhbDtcbiAgIH0pO1xuXG4gICAvLyBNb2RhbCAyXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2NoYW5nZUhvdXNlaG9sZC5odG1sJywge1xuICAgICBpZDogJzInLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDIgPSBtb2RhbDtcbiAgIH0pO1xuXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2NoYW5nZVppcC5odG1sJywge1xuICAgICBpZDogJzMnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDMgPSBtb2RhbDtcbiAgIH0pO1xuXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2FkZFBhcmVudC5odG1sJywge1xuICAgICBpZDogJzQnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDQgPSBtb2RhbDtcbiAgIH0pO1xuXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3JlbW92ZUNoaWxkLmh0bWwnLCB7XG4gICAgIGlkOiAnNScsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsNSA9IG1vZGFsO1xuICAgfSk7XG5cblxuXG4gICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgaWYgKGluZGV4ID09IDEpICRzY29wZS5vTW9kYWwxLnNob3coKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSAyKSAkc2NvcGUub01vZGFsMi5zaG93KCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMykgJHNjb3BlLm9Nb2RhbDMuc2hvdygpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDQpICRzY29wZS5vTW9kYWw0LnNob3coKTtcbiAgICAgZWxzZSAkc2NvcGUub01vZGFsNS5zaG93KCk7XG4gICB9O1xuXG4gICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgIGlmIChpbmRleCA9PSAxKSAkc2NvcGUub01vZGFsMS5oaWRlKCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMikgJHNjb3BlLm9Nb2RhbDIuaGlkZSgpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDMpICRzY29wZS5vTW9kYWwzLmhpZGUoKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSA0KSAkc2NvcGUub01vZGFsNC5oaWRlKCk7XG4gICAgIGVsc2UgJHNjb3BlLm9Nb2RhbDUuaGlkZSgpO1xuICAgfTtcblxuICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDEucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWwyLnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsMy5yZW1vdmUoKTtcbiAgICAgJHNjb3BlLm9Nb2RhbDQucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWw1LnJlbW92ZSgpO1xuICAgfSk7XG5cbnZhciB1c2VySW5mbyA9ICRhdXRoLmdldFBheWxvYWQoKS5zdWI7XG5jb25zb2xlLmxvZyh1c2VySW5mbyk7XG5cbiRzY29wZS5zdWJtaXRQYXNzd29yZCA9IGZ1bmN0aW9uKHVzZXIpe1xuICBjb25zb2xlLmxvZyh1c2VySW5mby51c2VyX2lkX3BrKTtcbiAgdXNlclNlcnZpY2UudXBkYXRlUGFzc3dvcmQodXNlckluZm8udXNlcl9pZF9wayx1c2VyLnVzZXJfbmV3X3Bhc3N3b3JkKVxuICAudGhlbihmdW5jdGlvbihyZXMpe1xuICAgICRzY29wZS5jbG9zZU1vZGFsKDEpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib2xkLXBhc3N3b3JkXCIpLnZhbHVlID0gJyc7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV3LXBhc3N3b3JkXCIpLnZhbHVlID0gJyc7XG4gIH0pO1xuXG59XG5cbiRzY29wZS5zdWJtaXRIb3VzZWhvbGQgPSBmdW5jdGlvbihob3VzZSl7XG4gIGNvbnNvbGUubG9nKGhvdXNlKTtcbiAgY29uc29sZS5sb2codXNlckluZm8udXNlcl9ob3VzZWhvbGQpO1xuICB1c2VyU2VydmljZS51cGRhdGVIb3VzZWhvbGQodXNlckluZm8udXNlcl9ob3VzZWhvbGQsaG91c2UpXG4gIC50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICRzY29wZS5jbG9zZU1vZGFsKDIpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXBkYXRlLWhvdXNlaG9sZFwiKS52YWx1ZSA9Jyc7XG4gIH0pXG59XG5cblxuLy8gc2VuZCBhIHJlcXVlc3QgdG8geW91ciBzZXJ2ZXIgdG8gcGVyZm9ybSBzZXJ2ZXItc2lkZSBsb2dvdXRcbiAkaHR0cC5wb3N0KCcvbG9nb3V0Jykuc3VjY2Nlc3MoZnVuY3Rpb24oKSB7XG4gICBjb25zb2xlLmxvZygnU3VjY2Vzc2Z1bGx5IGxvZ2dlZCBvdXQnKTtcbiB9KTs7XG5cblxuXG59KTsgLy8gZW5kIG9mIGNvbnRyb2xsZXJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJ0cmFja2VyQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsLCAkc3RhdGUsIHVzZXJTZXJ2aWNlKXtcbiAgICB2YXIgZ2V0Q2hpbGQgPSBmdW5jdGlvbigpe1xuICAgICAgdXNlclNlcnZpY2UuZ2V0Q2hpbGQoJHN0YXRlLnBhcmFtcy5pZCkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgJHNjb3BlLmNoaWxkID0gcmVzcG9uc2VbMF07XG4gICAgICB9KTtcblxuICAgICAgdXNlclNlcnZpY2UuZ2V0RGFpbHlDaG9yZXMoJHN0YXRlLnBhcmFtcy5pZCkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgJHNjb3BlLmRhaWx5Q2hvcmVzID0gcmVzcG9uc2U7XG4gICAgICB9KTtcblxuICAgICAgdXNlclNlcnZpY2UuZ2V0V2Vla2x5Q2hvcmVzKCRzdGF0ZS5wYXJhbXMuaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICRzY29wZS53ZWVrbHlDaG9yZXMgPSByZXNwb25zZTtcbiAgICAgIH0pO1xuXG4gICAgICB1c2VyU2VydmljZS5nZXRNb250aGx5Q2hvcmVzKCRzdGF0ZS5wYXJhbXMuaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICRzY29wZS5tb250aGx5Q2hvcmVzID0gcmVzcG9uc2U7XG4gICAgICB9KTtcblxuICAgIH07XG4gICAgZ2V0Q2hpbGQoKTtcblxuICAvLyAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3BpY0NvbmZNb2RhbC5odG1sJywge1xuICAvLyAgIHNjb3BlOiAkc2NvcGUsXG4gIC8vICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gIC8vIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgLy8gICAkc2NvcGUubW9kYWwgPSBtb2RhbDtcbiAgLy8gfSk7XG4gIC8vICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgLy8gICAkc2NvcGUubW9kYWwuc2hvdygpO1xuICAvLyB9O1xuICAvLyAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAvLyAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gIC8vIH07XG4gIC8vIC8vIENsZWFudXAgdGhlIG1vZGFsIHdoZW4gd2UncmUgZG9uZSB3aXRoIGl0IVxuICAvLyAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAvLyAgICRzY29wZS5tb2RhbC5yZW1vdmUoKTtcbiAgLy8gfSk7XG4gIC8vIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIGhpZGUgbW9kYWxcbiAgLy8gJHNjb3BlLiRvbignbW9kYWwuaGlkZGVuJywgZnVuY3Rpb24oKSB7XG4gIC8vICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgLy8gfSk7XG4gIC8vIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIHJlbW92ZSBtb2RhbFxuICAvLyAkc2NvcGUuJG9uKCdtb2RhbC5yZW1vdmVkJywgZnVuY3Rpb24oKSB7XG4gIC8vICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgLy8gfSk7XG5cbn0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcInVzZXJJbmZvQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBpbmZvIGNvbnRyb2xsZXJcIlxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuc2VydmljZShcImNob3JlU2VydmljZVwiLCBmdW5jdGlvbigkaHR0cCwkcSwkYXV0aCl7XG5cbnRoaXMuZ2V0VXNlckluZm8gPSAkYXV0aC5nZXRQYXlsb2FkKCk7XG5cblxudGhpcy5nZXRDaGlsZHJlbiA9IGZ1bmN0aW9uKGhvdXNlaG9sZCl7XG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOlwiR0VUXCIsXG4gICAgdXJsOlwiL2NoaWxkcmVuL1wiICsgaG91c2Vob2xkXG4gIH0pXG59XG5cbnRoaXMuY3JlYXRlQ2hvcmUgPSBmdW5jdGlvbihjaG9yZSl7XG4gIGNvbnNvbGUubG9nKCdob3cgbWFueSB0aW1lcycpXG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOlwiUE9TVFwiLFxuICAgIHVybDpcIi9hc3NpZ25jaG9yZVwiLFxuICAgIGRhdGE6Y2hvcmVcbiAgfSlcbn1cblxuXG5cblxufSkvL2VuZCBvZiBzZXJ2aWNlXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5zZXJ2aWNlKCdsb2dpblNlcnZpY2UnLCBmdW5jdGlvbigkaHR0cCl7XG5cblxuICB0aGlzLnVzZXJMb2dpbiA9IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICBjb25zb2xlLmxvZyh1c2VyLCBcInNlcnZpY2VcIilcbiAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIHVybDogJy9hdXRoL2xvZ2luJyxcbiAgICAgIGRhdGE6IHVzZXJcbiAgICB9KVxuICB9XG4gIHRoaXMubWFrZVVzZXIgPSBmdW5jdGlvbihuZXdVc2VyKSB7XG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB1cmw6ICcvYXV0aC9zaWdudXAnLFxuICAgICAgZGF0YTogbmV3VXNlclxuICAgIH0pXG4gIH1cbn0pIC8vIGVuZCBvZiBzZXJ2aWNlXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5zZXJ2aWNlKCd1c2VyU2VydmljZScsIGZ1bmN0aW9uKCRodHRwLCRxLCRhdXRoKXtcblxudmFyIGJhbm5lcjtcblxudGhpcy5nZXRVc2VySW5mbyA9ICRhdXRoLmdldFBheWxvYWQoKTtcbnZhciB0aGVtZTtcblxuXG50aGlzLnBvc3RiYW5uZXIgPSBmdW5jdGlvbihiYW5uZXIpe1xuICBjb25zb2xlLmxvZyhiYW5uZXIpO1xuICBjb25zb2xlLmxvZyhiYW5uZXIudXNlcl9iYW5uZXJfaW1hZ2UpO1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICB1cmw6XCIvYmFubmVyL1wiICsgYmFubmVyLnVzZXJfaG91c2Vob2xkLFxuICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHt1c2VyX2Jhbm5lcl9pbWFnZTpiYW5uZXIudXNlcl9iYW5uZXJfaW1hZ2V9KVxuICB9KVxufVxuXG50aGlzLmdldGJhbm5lciA9IGZ1bmN0aW9uKHVzZXJJZCl7XG4gIGNvbnNvbGUubG9nKHVzZXJJZCk7XG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIHVybDpcIi9iYW5uZXIvXCIgKyB1c2VySWRcbiAgfSlcbn1cblxuXG50aGlzLmdldFdlYXRoZXIgPSBmdW5jdGlvbihsb2NhdGlvbil7XG5yZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6J2h0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT16aXA9Jytsb2NhdGlvbisnJnVuaXRzPWltcGVyaWFsJmFwcGlkPWMxMGVmOTljNWFmZGVlM2ZkZmJhNzhlOGM5ODFhOWI2J1xuICB9KVxuXG59O1xuXG5cbiB0aGlzLnNldFRoZW1lID0gZnVuY3Rpb24oZGF0YSl7XG4gICByZXR1cm4gJGh0dHAoe1xuICAgICBtZXRob2Q6ICdQdXQnLFxuICAgICB1cmw6XCIvdGhlbWVcIixcbiAgICAgZGF0YTogZGF0YVxuICAgfSkudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgdGhlbWUgPSByZXMuZGF0YVswXS51c2VyX3RoZW1lXG4gICAgICAgcmV0dXJuIHJlcztcbiAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiB9KVxuIH1cblxudGhpcy5hZGRDaGlsZCA9IGZ1bmN0aW9uKGNoaWxkKXtcbiAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoY2hpbGQpKTtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6XCJQT1NUXCIsXG4gICAgdXJsOlwiL2NoaWxkcmVuXCIsXG4gICAgZGF0YTogY2hpbGRcbiAgfSlcbn1cblxuXG50aGlzLnNob3djaGlsZCA9IGZ1bmN0aW9uKGhvdXNlaG9sZCl7XG5yZXR1cm4gJGh0dHAoe1xuICBtZXRob2Q6XCJHRVRcIixcbiAgdXJsOlwiL2NoaWxkcmVuL1wiICsgaG91c2Vob2xkXG59KVxufVxuXG50aGlzLmdldFJld2FyZHMgPSBmdW5jdGlvbihpZCl7XG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogXCJHZXRcIixcbiAgICAgIHVybDonL2NoaWxkcmV3YXJkcy8nICsgaWQsXG4gICAgfSkudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gIH0pXG5cbn1cblxuICB0aGlzLnJldHVyblRoZW1lID0gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gdGhlbWU7XG4gIH1cblxuXG50aGlzLmdldERhaWx5Q2hvcmVzID0gZnVuY3Rpb24oaWQpe1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDogXCJHZXRcIixcbiAgICB1cmw6Jy9kYWlseWNob3JlLycgKyBpZCxcbiAgfSkudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgIHJldHVybiByZXMuZGF0YTtcbiAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgIGNvbnNvbGUubG9nKGVycik7XG59KVxufVxuXG50aGlzLmdldFdlZWtseUNob3JlcyA9IGZ1bmN0aW9uKGlkKXtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6IFwiR2V0XCIsXG4gICAgdXJsOicvd2Vla2x5Y2hvcmUvJyArIGlkLFxuICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgY29uc29sZS5sb2coZXJyKTtcbn0pXG59XG5cbnRoaXMuZ2V0TW9udGhseUNob3JlcyA9IGZ1bmN0aW9uKGlkKXtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6IFwiR2V0XCIsXG4gICAgdXJsOicvbW9udGhseWNob3JlLycgKyBpZCxcbiAgfSkudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgIHJldHVybiByZXMuZGF0YTtcbiAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgIGNvbnNvbGUubG9nKGVycik7XG59KVxufVxuIHRoaXMuY2hlY2tPZmZjaG9yZSA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICAgdXJsOicvY29tcGxldGVkLycgKyBpZFxuICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgcmV0dXJuIHJlcztcbiAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XG4gICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgfSlcbiAgIH1cbnRoaXMuZ2V0Q2hpbGQgPSBmdW5jdGlvbihpZCl7XG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOiBcIkdldFwiLFxuICAgIHVybDogJy9jaGlsZC8nKyBpZFxuICB9KS50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gICAgcmV0dXJuIHJlcy5kYXRhXG4gIH0pXG59XG5cbnRoaXMudXBkYXRlUGFzc3dvcmQgPSBmdW5jdGlvbihpZCxkYXRhKXtcbiAgY29uc29sZS5sb2coaWQpXG4gIGNvbnNvbGUubG9nKGRhdGEpO1xuICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh7IFwidXNlcl9uZXdfcGFzc3dvcmRcIjogZGF0YX0pKVxuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDpcIlBVVFwiLFxuICAgIHVybDonL3Bhc3N3b3JkLycgKyBpZCxcbiAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7IFwidXNlcl9uZXdfcGFzc3dvcmRcIjogZGF0YX0pXG4gIH0pXG59XG5cbnRoaXMudXBkYXRlSG91c2Vob2xkID0gZnVuY3Rpb24oaWQsaG91c2Upe1xuICBjb25zb2xlLmxvZyhpZClcbiAgY29uc29sZS5sb2coaG91c2UpXG4gIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHtcInVzZXJfaG91c2Vob2xkXCI6IGhvdXNlfSkpXG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOlwiUFVUXCIsXG4gICAgdXJsOicvaG91c2Vob2xkLycgKyBpZCxcbiAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XCJ1c2VyX2hvdXNlaG9sZFwiOiBob3VzZX0pXG4gIH0pXG59XG5cblxuXG5cblxuXG59KTsvL2VuZCBvZiBzZXJ2aWNlXG4iXX0=
