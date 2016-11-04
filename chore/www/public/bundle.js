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

angular.module('chore').controller("childHomeCtrl", function ($scope, $ionicModal, $auth, userService, $state) {
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
  $scope.logout = function () {
    $auth.logout();
    $state.go('login');
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

angular.module('chore').controller("homeCtrl", function ($scope, $ionicModal, userService, $window, $auth, $state) {
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
  $scope.logout = function () {
    $auth.logout();
    $state.go('login');
  };
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

angular.module('chore').controller("settingsCtrl", function ($scope, $ionicModal, userService, $auth, $state) {

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
  $scope.logout = function () {
    $auth.logout();
    $state.go('login');
  };
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXJzL2FkZENoaWxkQ3RybC5qcyIsImNvbnRyb2xsZXJzL2Fzc2lnbkNob3JlQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NhbWVyYUN0cmwuanMiLCJjb250cm9sbGVycy9jaGlsZEJhbmtDdHJsLmpzIiwiY29udHJvbGxlcnMvY2hpbGRIb21lQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NoaWxkTG9naW5DdHJsLmpzIiwiY29udHJvbGxlcnMvZWRpdENoaWxkQ3RybC5qcyIsImNvbnRyb2xsZXJzL2hpc3RvcnlDdHJsLmpzIiwiY29udHJvbGxlcnMvaG9tZUN0cmwuanMiLCJjb250cm9sbGVycy9sb2dpbkN0cmwuanMiLCJjb250cm9sbGVycy9tYWtlQ2hvcmVDdHJsLmpzIiwiY29udHJvbGxlcnMvc2V0UmV3YXJkc0N0cmwuanMiLCJjb250cm9sbGVycy9zZXR0aW5nc0N0cmwuanMiLCJjb250cm9sbGVycy90cmFja2VyQ3RybC5qcyIsImNvbnRyb2xsZXJzL3VzZXJJbmZvQ3RybC5qcyIsInNlcnZpY2UvY2hvcmVTZXJ2aWNlLmpzIiwic2VydmljZS9sb2dpblNlcnZpY2UuanMiLCJzZXJ2aWNlL3VzZXJTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsIiR1cmxSb3V0ZXJQcm92aWRlciIsIiRhdXRoUHJvdmlkZXIiLCJvdGhlcndpc2UiLCJzdGF0ZSIsInVybCIsInRlbXBsYXRlVXJsIiwiY29udHJvbGxlciIsImZhY2Vib29rIiwiY2xpZW50SWQiLCJyZXNwb25zZVR5cGUiLCJnb29nbGUiLCJydW4iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5Iiwid2luZG93IiwiY29yZG92YSIsInBsdWdpbnMiLCJLZXlib2FyZCIsImhpZGVLZXlib2FyZEFjY2Vzc29yeUJhciIsImRpc2FibGVTY3JvbGwiLCJTdGF0dXNCYXIiLCJzdHlsZURlZmF1bHQiLCIkc2NvcGUiLCJ1c2VyU2VydmljZSIsIiRzdGF0ZSIsImdvYmFjayIsImhpc3RvcnkiLCJnbyIsInVzZXIiLCJnZXRVc2VySW5mbyIsInN1YiIsImNvbnNvbGUiLCJsb2ciLCJzdWJtaXRDaGlsZCIsImNoaWxkIiwidXNlcl9ob3VzZWhvbGQiLCJhZGRDaGlsZCIsInRoZW4iLCJyZXMiLCJjaG9yZVNlcnZpY2UiLCJjdXJyZW50VXNlciIsImdldENoaWxkcmVuIiwiY2hpbGRzIiwiZGF0YSIsInZhbHVlcyIsImNob3JlIiwiY2hvcmVfZGFpbHkiLCJjaG9yZV93ZWVrbHkiLCJjaG9yZV9tb250aGx5IiwiQ3JlYXRlQ2hvcmUiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJob3VzZWhvbGQiLCJ2YWx1ZSIsImRhaWx5Iiwid2Vla2x5IiwibW9udGhseSIsImNob3JlX25hbWUiLCJjaG9yZV9kZXNjcmlwdGlvbiIsInVzZXJfaG91c2Vob2xkX2ZrIiwiY2hvcmVfdmFsdWUiLCJ1c2VyX2lkX2ZrIiwiY2hpbGRyZW5DaG9yZXMiLCJjaGlsZENob3JlIiwic2VsZWN0Q2hpbGQiLCJ1c2VyX2lkX3BrIiwicHVzaCIsInN1Ym1pdENob3JlIiwiZm9yRWFjaCIsInZhbCIsImNyZWF0ZUNob3JlIiwiJGNvcmRvdmFDYW1lcmEiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCIkY29yZG92YVBsdWdpbiIsInNvbWVGdW5jdGlvbiIsInN1Y2Nlc3MiLCJlcnJvciIsInRha2VQaWN0dXJlIiwib3B0aW9ucyIsInF1YWxpdHkiLCJkZXN0aW5hdGlvblR5cGUiLCJDYW1lcmEiLCJEZXN0aW5hdGlvblR5cGUiLCJEQVRBX1VSTCIsInNvdXJjZVR5cGUiLCJQaWN0dXJlU291cmNlVHlwZSIsIkNBTUVSQSIsImFsbG93RWRpdCIsImVuY29kaW5nVHlwZSIsIkVuY29kaW5nVHlwZSIsIkpQRUciLCJ0YXJnZXRXaWR0aCIsInRhcmdldEhlaWdodCIsInBvcG92ZXJPcHRpb25zIiwiQ2FtZXJhUG9wb3Zlck9wdGlvbnMiLCJzYXZlVG9QaG90b0FsYnVtIiwiY29ycmVjdE9yaWVudGF0aW9uIiwiZ2V0UGljdHVyZSIsImltYWdlRGF0YSIsImltZ1VSSSIsImVyciIsIiRhdXRoIiwidXNlclRva2VuIiwiZ2V0UGF5bG9hZCIsInRoZW1lIiwidXNlcl90aGVtZSIsIiRvbiIsImdldFRoZW1lIiwicmV0dXJuVGhlbWUiLCJzZXRUaGVtZSIsInRoZW1lSW1hZ2UiLCJnZXRSZXdhcmRzIiwiaWQiLCJyZXNwb25zZSIsInJld2FyZHMiLCIkaW9uaWNNb2RhbCIsImZyb21UZW1wbGF0ZVVybCIsInNjb3BlIiwiYmFja2Ryb3BDbGlja1RvQ2xvc2UiLCJhbmltYXRpb24iLCJtb2RhbCIsIm9Nb2RhbDEiLCJvcGVuTW9kYWwiLCJpbmRleCIsInNob3ciLCJvTW9kYWwyIiwiY2xvc2VNb2RhbCIsImhpZGUiLCJyZW1vdmUiLCJjaG9pY2UiLCJ1c2VySWQiLCJzdGF0dXMiLCJnZXREYWlseUNob3JlcyIsImRhaWx5Q2hvcmVzIiwiZ2V0V2Vla2x5Q2hvcmVzIiwid2Vla2x5Q2hvcmVzIiwiZ2V0TW9udGhseUNob3JlcyIsIm1vbnRobHlDaG9yZXMiLCJyZXZlYWxlciIsImNoZWNrT2ZmY2hvcmUiLCJsb2dvdXQiLCJsb2dpblNlcnZpY2UiLCJsb2dpbkNoaWxkIiwidXNlckxvZ2luIiwic2V0VG9rZW4iLCJ0ZXN0IiwiJHdpbmRvdyIsImJhbm5lciIsInVzZXJfYmFubmVyX2ltYWdlIiwic3VibWl0QmFubmVyIiwiYmFubmVySW5mbyIsInBvc3RiYW5uZXIiLCJnZXRFbGVtZW50QnlJZCIsImxvY2F0aW9uIiwicmVsb2FkIiwiZ2V0YmFubmVyIiwiemlwIiwiZ2V0V2VhdGhlciIsIndlYXRoZXIiLCJzaG93Y2hpbGQiLCJsb2dpbiIsIm1ha2VVc2VyIiwibmV3VXNlciIsImF1dGhlbnRpY2F0ZSIsInByb3ZpZGVyIiwib01vZGFsMyIsIm9Nb2RhbDQiLCJvTW9kYWw1IiwidXNlckluZm8iLCJzdWJtaXRQYXNzd29yZCIsInVwZGF0ZVBhc3N3b3JkIiwidXNlcl9uZXdfcGFzc3dvcmQiLCJzdWJtaXRIb3VzZWhvbGQiLCJob3VzZSIsInVwZGF0ZUhvdXNlaG9sZCIsImdldENoaWxkIiwicGFyYW1zIiwic2VydmljZSIsIiRodHRwIiwiJHEiLCJtZXRob2QiLCJKU09OIiwic3RyaW5naWZ5IiwiY2F0Y2giXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBQSxRQUFRQyxNQUFSLENBQWUsT0FBZixFQUF3QixDQUFDLE9BQUQsRUFBVSxZQUFWLENBQXhCLEVBQ0NDLE1BREQsQ0FDUSxVQUFTQyxjQUFULEVBQXlCQyxrQkFBekIsRUFBNkNDLGFBQTdDLEVBQTJEO0FBQ2pFRCxxQkFBbUJFLFNBQW5CLENBQTZCLFFBQTdCO0FBQ0FILGlCQUNDSSxLQURELENBQ08sVUFEUCxFQUNrQjtBQUNoQkMsU0FBSSxXQURZO0FBRWhCQyxpQkFBYSwyQkFGRztBQUdoQkMsZ0JBQVk7QUFISSxHQURsQixFQU1DSCxLQU5ELENBTU8sYUFOUCxFQU1xQjtBQUNuQkMsU0FBSSxjQURlO0FBRW5CQyxpQkFBYSw4QkFGTTtBQUduQkMsZ0JBQVk7QUFITyxHQU5yQixFQVdDSCxLQVhELENBV08sV0FYUCxFQVdtQjtBQUNqQkMsU0FBSSxnQkFEYTtBQUVqQkMsaUJBQWEsNEJBRkk7QUFHakJDLGdCQUFZO0FBSEssR0FYbkIsRUFnQkNILEtBaEJELENBZ0JPLFNBaEJQLEVBZ0JpQjtBQUNmQyxTQUFJLFVBRFc7QUFFZkMsaUJBQWEsMEJBRkU7QUFHZkMsZ0JBQVk7QUFIRyxHQWhCakIsRUFxQkNILEtBckJELENBcUJPLE1BckJQLEVBcUJjO0FBQ1pDLFNBQUksT0FEUTtBQUVaQyxpQkFBYSx1QkFGRDtBQUdaQyxnQkFBWTtBQUhBLEdBckJkLEVBMEJDSCxLQTFCRCxDQTBCTyxPQTFCUCxFQTBCZTtBQUNiQyxTQUFJLFFBRFM7QUFFYkMsaUJBQWEsd0JBRkE7QUFHYkMsZ0JBQVk7QUFIQyxHQTFCZixFQStCQ0gsS0EvQkQsQ0ErQk8sV0EvQlAsRUErQm1CO0FB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VCxLQUFuQixFQUFmLENBQVo7QUFDQSxXQUFPSyxNQUFNO0FBQ1hFLGNBQU8sS0FESTtBQUVYakwsV0FBSSxnQkFBZ0I2RyxFQUZUO0FBR1h0RSxZQUFNMkksS0FBS0MsU0FBTCxDQUFlLEVBQUMsa0JBQWtCVCxLQUFuQixFQUFmO0FBSEssS0FBTixDQUFQO0FBS0QsR0FURDtBQWdCQyxDQWpLRCxHQWlLRyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJb25pYyBTdGFydGVyIEFwcFxuXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xuLy8gJ3N0YXJ0ZXInIGlzIHRoZSBuYW1lIG9mIHRoaXMgYW5ndWxhciBtb2R1bGUgZXhhbXBsZSAoYWxzbyBzZXQgaW4gYSA8Ym9keT4gYXR0cmlidXRlIGluIGluZGV4Lmh0bWwpXG4vLyB0aGUgMm5kIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvZiAncmVxdWlyZXMnXG5cbmFuZ3VsYXIubW9kdWxlKCdjaG9yZScsIFsnaW9uaWMnLCAnc2F0ZWxsaXplciddKVxuLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkYXV0aFByb3ZpZGVyKXtcbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShcIi9sb2dpblwiKTtcbiAgJHN0YXRlUHJvdmlkZXJcbiAgLnN0YXRlKCdhZGRDaGlsZCcse1xuICAgIHVybDpcIi9hZGRDaGlsZFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2FkZENoaWxkLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImFkZENoaWxkQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnYXNzaWduQ2hvcmUnLHtcbiAgICB1cmw6XCIvYXNzaWduQ2hvcmVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9hc3NpZ25DaG9yZS5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJhc3NpZ25DaG9yZUN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2VkaXRDaGlsZCcse1xuICAgIHVybDpcIi9lZGl0Q2hpbGQvOmlkXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvZWRpdENoaWxkLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImVkaXRDaGlsZEN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2hpc3RvcnknLHtcbiAgICB1cmw6XCIvaGlzdG9yeVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2hpc3RvcnkuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiaGlzdG9yeUN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2hvbWUnLHtcbiAgICB1cmw6XCIvaG9tZVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2hvbWUuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiaG9tZUN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2xvZ2luJyx7XG4gICAgdXJsOlwiL2xvZ2luXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvTG9naW4uaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwibG9naW5DdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdtYWtlQ2hvcmUnLHtcbiAgICB1cmw6XCIvbWFrZUNob3JlXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvbWFrZUNob3JlLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcIm1ha2VDaG9yZUN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ3NldFJld2FyZHMnLHtcbiAgICB1cmw6XCIvc2V0UmV3YXJkcy86aWRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9zZXRSZXdhcmRzLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcInNldFJld2FyZHNDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdzZXR0aW5ncycse1xuICAgIHVybDpcIi9zZXR0aW5nc1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL3NldHRpbmdzLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcInNldHRpbmdzQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgndHJhY2tlcicse1xuICAgIHVybDpcIi90cmFja2VyLzppZFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL3RyYWNrZXIuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwidHJhY2tlckN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ3VzZXJJbmZvJyx7XG4gICAgdXJsOlwiL3VzZXJJbmZvXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvdXNlckluZm8uaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwidXNlckluZm9DdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdjaGlsZEJhbmsnLHtcbiAgICB1cmw6XCIvY2hpbGQvYmFua1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2NoaWxkQmFuay5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJjaGlsZEJhbmtDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdjaGlsZEhvbWUnLHtcbiAgICB1cmw6XCIvY2hpbGQvaG9tZVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2NoaWxkSG9tZS5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJjaGlsZEhvbWVDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdjaGlsZExvZ2luJyx7XG4gICAgdXJsOlwiL2NoaWxkL2xvZ2luXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvY2hpbGRMb2dpbi5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJjaGlsZExvZ2luQ3RybFwiXG4gIH0pXG5cbiAgJGF1dGhQcm92aWRlci5mYWNlYm9vayh7XG4gICAgY2xpZW50SWQ6ICczMzIyNzIwNTcxMzI2ODEnXG4gIH0pO1xuXG4gIC8vIE9wdGlvbmFsOiBGb3IgY2xpZW50LXNpZGUgdXNlIChJbXBsaWNpdCBHcmFudCksIHNldCByZXNwb25zZVR5cGUgdG8gJ3Rva2VuJyAoZGVmYXVsdDogJ2NvZGUnKVxuICAkYXV0aFByb3ZpZGVyLmZhY2Vib29rKHtcbiAgICBjbGllbnRJZDogJzMzMjI3MjA1NzEzMjY4MScsXG4gICAgcmVzcG9uc2VUeXBlOiAndG9rZW4nXG4gIH0pO1xuXG4gICRhdXRoUHJvdmlkZXIuZ29vZ2xlKHtcbiAgICBjbGllbnRJZDogJzI3NTM1Mjk2MDk0Ni01cmNhbjNxa2hsc2M3bTUwaGV2NWRuMmUyY2FlOW1icC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbScsXG4gICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTAwLyMvbG9naW4vJ1xuICB9KTtcbn0pXG5cblxuXG4ucnVuKGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtKSB7XG4gICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIGlmKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgIC8vIEhpZGUgdGhlIGFjY2Vzc29yeSBiYXIgYnkgZGVmYXVsdCAocmVtb3ZlIHRoaXMgdG8gc2hvdyB0aGUgYWNjZXNzb3J5IGJhciBhYm92ZSB0aGUga2V5Ym9hcmRcbiAgICAgIC8vIGZvciBmb3JtIGlucHV0cylcbiAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG5cbiAgICAgIC8vIERvbid0IHJlbW92ZSB0aGlzIGxpbmUgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZy4gSXQgc3RvcHMgdGhlIHZpZXdwb3J0XG4gICAgICAvLyBmcm9tIHNuYXBwaW5nIHdoZW4gdGV4dCBpbnB1dHMgYXJlIGZvY3VzZWQuIElvbmljIGhhbmRsZXMgdGhpcyBpbnRlcm5hbGx5IGZvclxuICAgICAgLy8gYSBtdWNoIG5pY2VyIGtleWJvYXJkIGV4cGVyaWVuY2UuXG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbCh0cnVlKTtcbiAgICB9XG4gICAgaWYod2luZG93LlN0YXR1c0Jhcikge1xuICAgICAgU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpO1xuICAgIH1cbiAgfSk7XG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImFkZENoaWxkQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsdXNlclNlcnZpY2UsJHN0YXRlKXtcbiAgLy9iYWNrYnV0dG9uXG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxuICB9XG52YXIgdXNlciA9IHVzZXJTZXJ2aWNlLmdldFVzZXJJbmZvLnN1YjtcbmNvbnNvbGUubG9nKHVzZXIpO1xuJHNjb3BlLnN1Ym1pdENoaWxkID0gZnVuY3Rpb24oY2hpbGQpe1xuICBjaGlsZC51c2VyX2hvdXNlaG9sZCA9IHVzZXIudXNlcl9ob3VzZWhvbGQ7XG4gIGNvbnNvbGUubG9nKGNoaWxkKTtcbiAgdXNlclNlcnZpY2UuYWRkQ2hpbGQoY2hpbGQpXG4gIC50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gICAgJHN0YXRlLmdvKCdob21lJyk7XG4gIH0pO1xuXG59XG5cblxuXG5cblxufSkgLy9lbmQgb2YgY29udHJvbGxlclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImFzc2lnbkNob3JlQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsY2hvcmVTZXJ2aWNlLCRzdGF0ZSl7XG5cbnZhciBjdXJyZW50VXNlciA9IGNob3JlU2VydmljZS5nZXRVc2VySW5mby5zdWI7XG5cblxuY2hvcmVTZXJ2aWNlLmdldENoaWxkcmVuKGN1cnJlbnRVc2VyLnVzZXJfaG91c2Vob2xkKVxuLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgLy8gJHNjb3BlLmNob3JlcyA9IHJlcy5kYXRhO1xuICAkc2NvcGUuY2hpbGRzID0gcmVzLmRhdGE7XG4gIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbn0pO1xuXG5cbiRzY29wZS52YWx1ZXMgPSBbXTtcblxuJHNjb3BlLmNob3JlID0ge1xuY2hvcmVfZGFpbHk6IGZhbHNlLFxuY2hvcmVfd2Vla2x5OiBmYWxzZSxcbmNob3JlX21vbnRobHk6ZmFsc2UsXG5cbn07XG5cbmZ1bmN0aW9uIENyZWF0ZUNob3JlKG5hbWUsZGVzY3JpcHRpb24saG91c2Vob2xkLHZhbHVlLGRhaWx5LHdlZWtseSxtb250aGx5LGNoaWxkKXtcbiAgdGhpcy5jaG9yZV9uYW1lID0gbmFtZTtcbiAgdGhpcy5jaG9yZV9kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICB0aGlzLnVzZXJfaG91c2Vob2xkX2ZrID0gaG91c2Vob2xkO1xuICB0aGlzLmNob3JlX3ZhbHVlID0gdmFsdWU7XG4gIHRoaXMuY2hvcmVfZGFpbHkgPSBkYWlseTtcbiAgdGhpcy5jaG9yZV93ZWVrbHkgPSB3ZWVrbHk7XG4gIHRoaXMuY2hvcmVfbW9udGhseSA9IG1vbnRobHk7XG4gIHRoaXMudXNlcl9pZF9mayA9IGNoaWxkO1xufVxuXG5cbnZhciBjaGlsZHJlbkNob3JlcyA9IFtdO1xuJHNjb3BlLmNoaWxkQ2hvcmUgPSBmdW5jdGlvbihjaG9yZSl7XG4gIHZhciBzZWxlY3RDaGlsZCA9IHRoaXMuY2hpbGQudXNlcl9pZF9waztcbiAgdmFyIGNoaWxkQ2hvcmUgPSBuZXcgQ3JlYXRlQ2hvcmUoY2hvcmUuY2hvcmVfbmFtZSxjaG9yZS5jaG9yZV9kZXNjcmlwdGlvbixjdXJyZW50VXNlci51c2VyX2hvdXNlaG9sZCxjaG9yZS5jaG9yZV92YWx1ZSxjaG9yZS5jaG9yZV9kYWlseSxjaG9yZS5jaG9yZV93ZWVrbHksY2hvcmUuY2hvcmVfbW9udGhseSxzZWxlY3RDaGlsZCk7XG5jb25zb2xlLmxvZyhjaGlsZENob3JlKTtcbiAgY2hpbGRyZW5DaG9yZXMucHVzaChjaGlsZENob3JlKTtcbiAgY29uc29sZS5sb2coY2hpbGRyZW5DaG9yZXMpO1xufTtcblxuXG4kc2NvcGUuc3VibWl0Q2hvcmUgPSBmdW5jdGlvbigpe1xuICBjb25zb2xlLmxvZyhjaGlsZHJlbkNob3Jlcyk7XG4gIGNoaWxkcmVuQ2hvcmVzLmZvckVhY2goZnVuY3Rpb24odmFsKXtcbiAgICBjb25zb2xlLmxvZygnaScpO1xuICAgIGNob3JlU2VydmljZS5jcmVhdGVDaG9yZSh2YWwpXG4gICAgLnRoZW4oZnVuY3Rpb24ocmVzKXt9KTtcbiAgfVxuXG4pO1xuY2hpbGRyZW5DaG9yZXMgPSBbXTtcbn07XG5cblxuXG5cblxuXG5cbn0pOy8vZW5kIG9mIGNvbnRyb2xsZXJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoJ2NhbWVyYUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRjb3Jkb3ZhQ2FtZXJhKSB7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRldmljZXJlYWR5XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICRjb3Jkb3ZhUGx1Z2luLnNvbWVGdW5jdGlvbigpLnRoZW4oc3VjY2VzcywgZXJyb3IpO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIC8vIE9SIHdpdGggSU9OSUNcblxuICAgICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgJGNvcmRvdmFQbHVnaW4uc29tZUZ1bmN0aW9uKCkudGhlbihzdWNjZXNzLCBlcnJvcik7XG4gICAgfSk7XG5cbiAgJHNjb3BlLnRha2VQaWN0dXJlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICBxdWFsaXR5OiA1MCxcbiAgICAgIGRlc3RpbmF0aW9uVHlwZTogQ2FtZXJhLkRlc3RpbmF0aW9uVHlwZS5EQVRBX1VSTCxcbiAgICAgIHNvdXJjZVR5cGU6IENhbWVyYS5QaWN0dXJlU291cmNlVHlwZS5DQU1FUkEsXG4gICAgICBhbGxvd0VkaXQ6IGZhbHNlLFxuICAgICAgZW5jb2RpbmdUeXBlOiBDYW1lcmEuRW5jb2RpbmdUeXBlLkpQRUcsXG4gICAgICB0YXJnZXRXaWR0aDogMzAwLFxuICAgICAgdGFyZ2V0SGVpZ2h0OiAzMDAsXG4gICAgICBwb3BvdmVyT3B0aW9uczogQ2FtZXJhUG9wb3Zlck9wdGlvbnMsXG4gICAgICBzYXZlVG9QaG90b0FsYnVtOiBmYWxzZSxcblx0ICAgIGNvcnJlY3RPcmllbnRhdGlvbjp0cnVlXG4gICAgfTtcblxuICAgICRjb3Jkb3ZhQ2FtZXJhLmdldFBpY3R1cmUob3B0aW9ucykudGhlbihmdW5jdGlvbihpbWFnZURhdGEpIHtcbiAgICAgICRzY29wZS5pbWdVUkkgPSBcImRhdGE6aW1hZ2UvanBlZztiYXNlNjQsXCIgKyBpbWFnZURhdGE7XG4gICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAvLyBlcnJvclxuICAgIH0pO1xuXG4gIH07XG4gIH0sIGZhbHNlKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJjaGlsZEJhbmtDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGF1dGgsIHVzZXJTZXJ2aWNlKXtcbiAgdmFyIHVzZXJUb2tlbiA9ICRhdXRoLmdldFBheWxvYWQoKTtcbiAgIHVzZXJTZXJ2aWNlLmdldFVzZXJJbmZvID0gdXNlclRva2VuO1xuICAgJHNjb3BlLnVzZXIgPSB1c2VyVG9rZW4uc3ViO1xuICAgJHNjb3BlLnRoZW1lID0gJHNjb3BlLnVzZXIudXNlcl90aGVtZVxuXG4gICAkc2NvcGUuJG9uKCckaW9uaWNWaWV3LmJlZm9yZUVudGVyJywgZnVuY3Rpb24gKCkge1xuICAgICB2YXIgZ2V0VGhlbWUgPSBmdW5jdGlvbigpe1xuICAgICAgICRzY29wZS50aGVtZSA9IHVzZXJTZXJ2aWNlLnJldHVyblRoZW1lKClcbiAgICAgfVxuICAgICBpZih1c2VyU2VydmljZS5yZXR1cm5UaGVtZSgpKXtcbiAgICAgICBnZXRUaGVtZSgpXG4gICAgIH1cbiAgICAgJHNjb3BlLnNldFRoZW1lID0gZnVuY3Rpb24oKXtcbiAgICAgICBpZigkc2NvcGUudGhlbWUgPT09ICdiYXNlYmFsbCcpe1xuICAgICAgICAgJHNjb3BlLnRoZW1lSW1hZ2UgPSAnLi9pbWcvaW1nLWJhc2ViYWxsLXRyYW5zLnBuZydcbiAgICAgICB9XG4gICAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAnY2hhcmxpZUJyb3duJyl7XG4gICAgICAgICAkc2NvcGUudGhlbWVJbWFnZSA9ICcuL2ltZy9zbm9vcHkucG5nJ1xuICAgICAgIH1cbiAgICAgICBpZigkc2NvcGUudGhlbWUgPT09ICdwcmluY2Vzcycpe1xuICAgICAgICAgJHNjb3BlLnRoZW1lSW1hZ2UgPSAnLi9pbWcvQ3Jvd25fUHJpbmNlc3MucG5nJ1xuICAgICAgIH1cbiAgICAgICBpZigkc2NvcGUudGhlbWUgPT09ICdzdGFyV2Fycycpe1xuICAgICAgICAgJHNjb3BlLnRoZW1lSW1hZ2UgPSAnLi9pbWcvZGVhdGgtc3Rhci0ybmQtaWNvbi5wbmcnXG4gICAgICAgfVxuICAgICAgIGlmKCRzY29wZS50aGVtZSA9PT0gJ3dhdGVyJyl7XG4gICAgICAgICAkc2NvcGUudGhlbWVJbWFnZSA9ICcuL2ltZy9UcmFuc3BhcmVudF9XYXRlcl9Ecm9wX1BOR19QaWN0dXJlLnBuZydcbiAgICAgICB9XG5cbiAgICAgfVxuICAgICAkc2NvcGUuc2V0VGhlbWUoKTtcbiAgfSk7XG5cblxuXG5cblxuICAgdmFyIGdldFJld2FyZHMgPSBmdW5jdGlvbigpe1xuICAgICBpZCA9ICRzY29wZS51c2VyLnVzZXJfaWRfcGs7XG4gICAgIHVzZXJTZXJ2aWNlLmdldFJld2FyZHMoaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICRzY29wZS5yZXdhcmRzID0gcmVzcG9uc2U7XG4gICAgIH0pXG4gICB9XG4gICBnZXRSZXdhcmRzKCk7XG5cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJjaGlsZEhvbWVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwsICRhdXRoLCB1c2VyU2VydmljZSwgJHN0YXRlKXtcbiAgLy8gJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSAgY2hpbGQgSG9tZSBjb250cm9sbGVyXCJcbiAgLy92YXIgdXNlclRva2VuID0gdXNlclNlcnZpY2UuZ2V0VXNlckluZm8uc3ViO1xuXG4gIHZhciB1c2VyVG9rZW4gPSAkYXV0aC5nZXRQYXlsb2FkKCk7XG4gIHVzZXJTZXJ2aWNlLmdldFVzZXJJbmZvID0gdXNlclRva2VuO1xuICAkc2NvcGUudXNlciA9IHVzZXJUb2tlbi5zdWI7XG5cbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCd0aGVtZU1vZGFsLmh0bWwnLCB7XG4gICAgIGlkOiAnMScsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsMSA9IG1vZGFsO1xuICAgfSk7XG5cbiAgIC8vIE1vZGFsIDJcbiAgLy8gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgndGFrZVBpY3R1cmVNb2RhbC5odG1sJywge1xuICAvLyAgICBpZDogJzInLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgLy8gICAgc2NvcGU6ICRzY29wZSxcbiAgLy8gICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAvLyAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgLy8gIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgLy8gICAgJHNjb3BlLm9Nb2RhbDIgPSBtb2RhbDtcbiAgLy8gIH0pO1xuICAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgIGlmIChpbmRleCA9PSAxKSAkc2NvcGUub01vZGFsMS5zaG93KCk7XG4gICAgIGVsc2UgJHNjb3BlLm9Nb2RhbDIuc2hvdygpO1xuICAgfTtcblxuICAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICBpZiAoaW5kZXggPT0gMSkgJHNjb3BlLm9Nb2RhbDEuaGlkZSgpO1xuICAgICBlbHNlICRzY29wZS5vTW9kYWwyLmhpZGUoKTtcbiAgIH07XG5cbiAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICRzY29wZS5vTW9kYWwxLnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsMi5yZW1vdmUoKTtcblxuICAgfSk7XG5cbiAgJHNjb3BlLnRoZW1lID0gJHNjb3BlLnVzZXIudXNlcl90aGVtZVxuICAkc2NvcGUuc2V0VGhlbWUgPSBmdW5jdGlvbihjaG9pY2Upe1xuICAgIHZhciBkYXRhID0ge31cbiAgICBkYXRhLnRoZW1lID0gY2hvaWNlXG4gICAgZGF0YS51c2VySWQgPSAkc2NvcGUudXNlci51c2VyX2lkX3BrO1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIHVzZXJTZXJ2aWNlLnNldFRoZW1lKGRhdGEpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgIGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKXtcbiAgICAgICRzY29wZS50aGVtZSA9IGNob2ljZVxuICAgICAgfVxuICB9KVxuICB9XG5cblxuICB2YXIgZ2V0RGFpbHlDaG9yZXMgPSBmdW5jdGlvbigpe1xuICAgIGlkID0gJHNjb3BlLnVzZXIudXNlcl9pZF9wa1xuICAgIHVzZXJTZXJ2aWNlLmdldERhaWx5Q2hvcmVzKGlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICRzY29wZS5kYWlseUNob3JlcyA9IHJlc3BvbnNlO1xuICAgIH0pXG4gIH1cbiAgIGdldERhaWx5Q2hvcmVzKClcbiAgdmFyIGdldFdlZWtseUNob3JlcyA9IGZ1bmN0aW9uKCl7XG4gICAgaWQgPSAkc2NvcGUudXNlci51c2VyX2lkX3BrXG4gICAgdXNlclNlcnZpY2UuZ2V0V2Vla2x5Q2hvcmVzKGlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICRzY29wZS53ZWVrbHlDaG9yZXMgPSByZXNwb25zZTtcbiAgICB9KVxuICB9XG4gIGdldFdlZWtseUNob3JlcygpXG4gIHZhciBnZXRNb250aGx5Q2hvcmVzID0gZnVuY3Rpb24oKXtcbiAgICBpZCA9ICRzY29wZS51c2VyLnVzZXJfaWRfcGtcbiAgICB1c2VyU2VydmljZS5nZXRNb250aGx5Q2hvcmVzKGlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICRzY29wZS5tb250aGx5Q2hvcmVzID0gcmVzcG9uc2U7XG4gICAgfSlcbiAgfVxuICBnZXRNb250aGx5Q2hvcmVzKClcblxuICAkc2NvcGUucmV2ZWFsZXIgPSBmdW5jdGlvbigpe1xuICAgdGhpcy5oaWRlID0gIXRoaXMuaGlkZTtcbiAgfVxuXG4gICRzY29wZS5jaGVja09mZmNob3JlID0gZnVuY3Rpb24oaWQpe1xuICAgIGNvbnNvbGUubG9nKGlkKTtcbiAgICB1c2VyU2VydmljZS5jaGVja09mZmNob3JlKGlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICB9KVxuICAgfVxuICAgJHNjb3BlLmxvZ291dCA9IGZ1bmN0aW9uKCl7XG4gICAgICRhdXRoLmxvZ291dCgpXG4gICAgICRzdGF0ZS5nbygnbG9naW4nKVxuICAgfVxufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiY2hpbGRMb2dpbkN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkYXV0aCwgJHN0YXRlLCBsb2dpblNlcnZpY2Upe1xuICAvLyAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBjaGlsZCBMb2dpbiBjb250cm9sbGVyXCJcblxuICAgJHNjb3BlLmxvZ2luQ2hpbGQgPSBmdW5jdGlvbih1c2VyKXtcbiAgICAgY29uc29sZS5sb2codXNlcilcbiAgICAgbG9naW5TZXJ2aWNlLnVzZXJMb2dpbih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAkYXV0aC5zZXRUb2tlbihyZXNwb25zZSlcbiAgICAgICAgICRzdGF0ZS5nbygnY2hpbGRIb21lJylcblxuICAgICB9KVxuICAgfVxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJlZGl0Q2hpbGRDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxuICB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiaGlzdG9yeUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gSGlzdG9yeSBjb250cm9sbGVyXCJcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJob21lQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsLHVzZXJTZXJ2aWNlLCR3aW5kb3csICRhdXRoLCAkc3RhdGUpe1xuICB2YXIgdXNlclRva2VuID0gJGF1dGguZ2V0UGF5bG9hZCgpO1xuICB1c2VyU2VydmljZS5nZXRVc2VySW5mbyA9IHVzZXJUb2tlbjtcbiAgJHNjb3BlLnVzZXIgPSB1c2VyVG9rZW4uc3ViO1xuICAkc2NvcGUuYmFubmVyID0gJHNjb3BlLnVzZXJfYmFubmVyX2ltYWdlO1xuXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2Jhbm5lck1vZGFsLmh0bWwnLCB7XG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUubW9kYWwgPSBtb2RhbDtcbiAgIH0pO1xuICAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICAkc2NvcGUubW9kYWwuc2hvdygpO1xuICAgfTtcbiAgICRzY29wZS5zdWJtaXRCYW5uZXIgPSBmdW5jdGlvbihiYW5uZXIpe1xuICAgICB2YXIgYmFubmVySW5mbyA9IHtcbiAgICAgICB1c2VyX2hvdXNlaG9sZDp1c2VyLnVzZXJfaG91c2Vob2xkLFxuICAgICAgIHVzZXJfYmFubmVyX2ltYWdlOmJhbm5lclxuICAgICB9XG4gICAgICB1c2VyU2VydmljZS5wb3N0YmFubmVyKGJhbm5lckluZm8pXG4gICAgICAudGhlbihmdW5jdGlvbihyZXMpe1xuICAgICAkc2NvcGUubW9kYWwuaGlkZSgpO1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWwtYm94XCIpLnZhbHVlID0gJyc7XG4gICAgICAgICAgJHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQodHJ1ZSk7XG4gICAgIH0pO1xuICAgfTtcbiAgICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWwtYm94XCIpLnZhbHVlID0gJyc7XG4gICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gICB9O1xuICAgLy8gQ2xlYW51cCB0aGUgbW9kYWwgd2hlbiB3ZSdyZSBkb25lIHdpdGggaXQhXG4gICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAkc2NvcGUubW9kYWwucmVtb3ZlKCk7XG4gICB9KTtcbiAgIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIGhpZGUgbW9kYWxcbiAgICRzY29wZS4kb24oJ21vZGFsLmhpZGRlbicsIGZ1bmN0aW9uKCkge1xuICAgICAvLyBFeGVjdXRlIGFjdGlvblxuXG4gICB9KTtcbiAgIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIHJlbW92ZSBtb2RhbFxuICAgJHNjb3BlLiRvbignbW9kYWwucmVtb3ZlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAvLyBFeGVjdXRlIGFjdGlvblxuICAgfSk7XG5cbiRzY29wZS5ob3VzZWhvbGQgPSAgJHNjb3BlLnVzZXIudXNlcl9ob3VzZWhvbGQ7XG51c2VyU2VydmljZS5nZXRiYW5uZXIoJHNjb3BlLnVzZXIudXNlcl9ob3VzZWhvbGQpLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgY29uc29sZS5sb2cocmVzLmRhdGFbMF0udXNlcl9iYW5uZXJfaW1hZ2UpO1xuICAgICRzY29wZS5iYW5uZXIgPSByZXMuZGF0YVswXS51c2VyX2Jhbm5lcl9pbWFnZTtcbn0pO1xuXG5jb25zb2xlLmxvZygkc2NvcGUudXNlci56aXApO1xuXG51c2VyU2VydmljZS5nZXRXZWF0aGVyKCRzY29wZS51c2VyLnppcClcbi50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbiAgJHNjb3BlLndlYXRoZXIgPSByZXMuZGF0YTtcbn0pXG5cblxudXNlclNlcnZpY2Uuc2hvd2NoaWxkKCRzY29wZS51c2VyLnVzZXJfaG91c2Vob2xkKVxuLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgY29uc29sZS5sb2cocmVzLmRhdGEpXG4gICRzY29wZS5zaG93Y2hpbGQgPSByZXMuZGF0YTtcbn0pXG4kc2NvcGUubG9nb3V0ID0gZnVuY3Rpb24oKXtcbiAgJGF1dGgubG9nb3V0KClcbiAgJHN0YXRlLmdvKCdsb2dpbicpXG59XG59KS8vZW5kIG9mIGNvbnRyb2xsZXJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJsb2dpbkN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkYXV0aCwgJHN0YXRlLCBsb2dpblNlcnZpY2Upe1xuXG4kc2NvcGUubG9naW4gPSBmdW5jdGlvbih1c2VyKXtcbiAgLy8gY29uc29sZS5sb2codXNlcilcbiAgbG9naW5TZXJ2aWNlLnVzZXJMb2dpbih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAkYXV0aC5zZXRUb2tlbihyZXNwb25zZSlcbiAgICAgICRzdGF0ZS5nbygnaG9tZScpXG5cbiAgfSlcbn1cbiRzY29wZS5tYWtlVXNlciA9IGZ1bmN0aW9uKG5ld1VzZXIpe1xuICBsb2dpblNlcnZpY2UubWFrZVVzZXIobmV3VXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgJGF1dGguc2V0VG9rZW4ocmVzcG9uc2UpXG4gICAgICAkc3RhdGUuZ28oJ2hvbWUnKVxuICB9KVxufVxuICAkc2NvcGUuYXV0aGVudGljYXRlID0gZnVuY3Rpb24ocHJvdmlkZXIpIHtcbiAgJGF1dGguYXV0aGVudGljYXRlKHByb3ZpZGVyKX07XG4gIC8vICRzY29wZS50ZXN0ID0gXCJIZWxsbyBmcm9tIGxvZ2luIGNvbnRyb2xsZXJcIlxuXG5cbiAgJHNjb3BlLnJldmVhbGVyID0gZnVuY3Rpb24oKXtcbiAgJHNjb3BlLmhpZGUgPSAhJHNjb3BlLmhpZGU7XG4gfVxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcIm1ha2VDaG9yZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XG4gICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpXG4gIH1cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJzZXRSZXdhcmRzQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsKXtcbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdyZXdhcmRNb2RhbC5odG1sJywge1xuICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAkc2NvcGUubW9kYWwgPSBtb2RhbDtcbiAgfSk7XG4gICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwuc2hvdygpO1xuICB9O1xuICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gIH07XG4gIC8vIENsZWFudXAgdGhlIG1vZGFsIHdoZW4gd2UncmUgZG9uZSB3aXRoIGl0IVxuICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5yZW1vdmUoKTtcbiAgfSk7XG4gIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIGhpZGUgbW9kYWxcbiAgJHNjb3BlLiRvbignbW9kYWwuaGlkZGVuJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgfSk7XG4gIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIHJlbW92ZSBtb2RhbFxuICAkc2NvcGUuJG9uKCdtb2RhbC5yZW1vdmVkJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgfSk7XG4gIC8vYmFja2J1dHRvblxuICAkc2NvcGUuZ29iYWNrID0gZnVuY3Rpb24oKXtcbiAgICB3aW5kb3cuaGlzdG9yeS5nbygtMSlcbiAgfVxuXG59KVxuIiwiXG5hbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwic2V0dGluZ3NDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwsIHVzZXJTZXJ2aWNlLCAkYXV0aCwgJHN0YXRlKXtcblxuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2NoYW5nZVBhc3N3b3JkLmh0bWwnLCB7XG4gICAgIGlkOiAnMScsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsMSA9IG1vZGFsO1xuICAgfSk7XG5cbiAgIC8vIE1vZGFsIDJcbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnY2hhbmdlSG91c2Vob2xkLmh0bWwnLCB7XG4gICAgIGlkOiAnMicsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsMiA9IG1vZGFsO1xuICAgfSk7XG5cbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnY2hhbmdlWmlwLmh0bWwnLCB7XG4gICAgIGlkOiAnMycsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsMyA9IG1vZGFsO1xuICAgfSk7XG5cbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnYWRkUGFyZW50Lmh0bWwnLCB7XG4gICAgIGlkOiAnNCcsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsNCA9IG1vZGFsO1xuICAgfSk7XG5cbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgncmVtb3ZlQ2hpbGQuaHRtbCcsIHtcbiAgICAgaWQ6ICc1JywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWw1ID0gbW9kYWw7XG4gICB9KTtcblxuXG5cbiAgICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICBpZiAoaW5kZXggPT0gMSkgJHNjb3BlLm9Nb2RhbDEuc2hvdygpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDIpICRzY29wZS5vTW9kYWwyLnNob3coKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSAzKSAkc2NvcGUub01vZGFsMy5zaG93KCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gNCkgJHNjb3BlLm9Nb2RhbDQuc2hvdygpO1xuICAgICBlbHNlICRzY29wZS5vTW9kYWw1LnNob3coKTtcbiAgIH07XG5cbiAgICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgaWYgKGluZGV4ID09IDEpICRzY29wZS5vTW9kYWwxLmhpZGUoKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSAyKSAkc2NvcGUub01vZGFsMi5oaWRlKCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMykgJHNjb3BlLm9Nb2RhbDMuaGlkZSgpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDQpICRzY29wZS5vTW9kYWw0LmhpZGUoKTtcbiAgICAgZWxzZSAkc2NvcGUub01vZGFsNS5oaWRlKCk7XG4gICB9O1xuXG4gICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAkc2NvcGUub01vZGFsMS5yZW1vdmUoKTtcbiAgICAgJHNjb3BlLm9Nb2RhbDIucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWwzLnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsNC5yZW1vdmUoKTtcbiAgICAgJHNjb3BlLm9Nb2RhbDUucmVtb3ZlKCk7XG4gICB9KTtcblxudmFyIHVzZXJJbmZvID0gJGF1dGguZ2V0UGF5bG9hZCgpLnN1YjtcbmNvbnNvbGUubG9nKHVzZXJJbmZvKTtcblxuJHNjb3BlLnN1Ym1pdFBhc3N3b3JkID0gZnVuY3Rpb24odXNlcil7XG4gIGNvbnNvbGUubG9nKHVzZXJJbmZvLnVzZXJfaWRfcGspO1xuICB1c2VyU2VydmljZS51cGRhdGVQYXNzd29yZCh1c2VySW5mby51c2VyX2lkX3BrLHVzZXIudXNlcl9uZXdfcGFzc3dvcmQpXG4gIC50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gICAgJHNjb3BlLmNsb3NlTW9kYWwoMSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvbGQtcGFzc3dvcmRcIikudmFsdWUgPSAnJztcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctcGFzc3dvcmRcIikudmFsdWUgPSAnJztcbiAgfSk7XG5cbn1cblxuJHNjb3BlLnN1Ym1pdEhvdXNlaG9sZCA9IGZ1bmN0aW9uKGhvdXNlKXtcbiAgY29uc29sZS5sb2coaG91c2UpO1xuICBjb25zb2xlLmxvZyh1c2VySW5mby51c2VyX2hvdXNlaG9sZCk7XG4gIHVzZXJTZXJ2aWNlLnVwZGF0ZUhvdXNlaG9sZCh1c2VySW5mby51c2VyX2hvdXNlaG9sZCxob3VzZSlcbiAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgJHNjb3BlLmNsb3NlTW9kYWwoMik7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1cGRhdGUtaG91c2Vob2xkXCIpLnZhbHVlID0nJztcbiAgfSlcbn1cbiRzY29wZS5sb2dvdXQgPSBmdW5jdGlvbigpe1xuICAkYXV0aC5sb2dvdXQoKVxuICAkc3RhdGUuZ28oJ2xvZ2luJylcbn1cbn0pOyAvLyBlbmQgb2YgY29udHJvbGxlclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcInRyYWNrZXJDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwsICRzdGF0ZSwgdXNlclNlcnZpY2Upe1xuICAgIHZhciBnZXRDaGlsZCA9IGZ1bmN0aW9uKCl7XG4gICAgICB1c2VyU2VydmljZS5nZXRDaGlsZCgkc3RhdGUucGFyYW1zLmlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAkc2NvcGUuY2hpbGQgPSByZXNwb25zZVswXTtcbiAgICAgIH0pO1xuXG4gICAgICB1c2VyU2VydmljZS5nZXREYWlseUNob3Jlcygkc3RhdGUucGFyYW1zLmlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAkc2NvcGUuZGFpbHlDaG9yZXMgPSByZXNwb25zZTtcbiAgICAgIH0pO1xuXG4gICAgICB1c2VyU2VydmljZS5nZXRXZWVrbHlDaG9yZXMoJHN0YXRlLnBhcmFtcy5pZCkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgJHNjb3BlLndlZWtseUNob3JlcyA9IHJlc3BvbnNlO1xuICAgICAgfSk7XG5cbiAgICAgIHVzZXJTZXJ2aWNlLmdldE1vbnRobHlDaG9yZXMoJHN0YXRlLnBhcmFtcy5pZCkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgJHNjb3BlLm1vbnRobHlDaG9yZXMgPSByZXNwb25zZTtcbiAgICAgIH0pO1xuXG4gICAgfTtcbiAgICBnZXRDaGlsZCgpO1xuXG4gIC8vICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgncGljQ29uZk1vZGFsLmh0bWwnLCB7XG4gIC8vICAgc2NvcGU6ICRzY29wZSxcbiAgLy8gICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgLy8gfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAvLyAgICRzY29wZS5tb2RhbCA9IG1vZGFsO1xuICAvLyB9KTtcbiAgLy8gJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAvLyAgICRzY29wZS5tb2RhbC5zaG93KCk7XG4gIC8vIH07XG4gIC8vICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XG4gIC8vICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcbiAgLy8gfTtcbiAgLy8gLy8gQ2xlYW51cCB0aGUgbW9kYWwgd2hlbiB3ZSdyZSBkb25lIHdpdGggaXQhXG4gIC8vICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gIC8vICAgJHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuICAvLyB9KTtcbiAgLy8gLy8gRXhlY3V0ZSBhY3Rpb24gb24gaGlkZSBtb2RhbFxuICAvLyAkc2NvcGUuJG9uKCdtb2RhbC5oaWRkZW4nLCBmdW5jdGlvbigpIHtcbiAgLy8gICAvLyBFeGVjdXRlIGFjdGlvblxuICAvLyB9KTtcbiAgLy8gLy8gRXhlY3V0ZSBhY3Rpb24gb24gcmVtb3ZlIG1vZGFsXG4gIC8vICRzY29wZS4kb24oJ21vZGFsLnJlbW92ZWQnLCBmdW5jdGlvbigpIHtcbiAgLy8gICAvLyBFeGVjdXRlIGFjdGlvblxuICAvLyB9KTtcblxufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwidXNlckluZm9DdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIGluZm8gY29udHJvbGxlclwiXG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5zZXJ2aWNlKFwiY2hvcmVTZXJ2aWNlXCIsIGZ1bmN0aW9uKCRodHRwLCRxLCRhdXRoKXtcblxudGhpcy5nZXRVc2VySW5mbyA9ICRhdXRoLmdldFBheWxvYWQoKTtcblxuXG50aGlzLmdldENoaWxkcmVuID0gZnVuY3Rpb24oaG91c2Vob2xkKXtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6XCJHRVRcIixcbiAgICB1cmw6XCIvY2hpbGRyZW4vXCIgKyBob3VzZWhvbGRcbiAgfSlcbn1cblxudGhpcy5jcmVhdGVDaG9yZSA9IGZ1bmN0aW9uKGNob3JlKXtcbiAgY29uc29sZS5sb2coJ2hvdyBtYW55IHRpbWVzJylcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6XCJQT1NUXCIsXG4gICAgdXJsOlwiL2Fzc2lnbmNob3JlXCIsXG4gICAgZGF0YTpjaG9yZVxuICB9KVxufVxuXG5cblxuXG59KS8vZW5kIG9mIHNlcnZpY2VcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLnNlcnZpY2UoJ2xvZ2luU2VydmljZScsIGZ1bmN0aW9uKCRodHRwKXtcblxuXG4gIHRoaXMudXNlckxvZ2luID0gZnVuY3Rpb24odXNlcikge1xuICAgIGNvbnNvbGUubG9nKHVzZXIsIFwic2VydmljZVwiKVxuICAgIHJldHVybiAkaHR0cCh7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgdXJsOiAnL2F1dGgvbG9naW4nLFxuICAgICAgZGF0YTogdXNlclxuICAgIH0pXG4gIH1cbiAgdGhpcy5tYWtlVXNlciA9IGZ1bmN0aW9uKG5ld1VzZXIpIHtcbiAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIHVybDogJy9hdXRoL3NpZ251cCcsXG4gICAgICBkYXRhOiBuZXdVc2VyXG4gICAgfSlcbiAgfVxufSkgLy8gZW5kIG9mIHNlcnZpY2VcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLnNlcnZpY2UoJ3VzZXJTZXJ2aWNlJywgZnVuY3Rpb24oJGh0dHAsJHEsJGF1dGgpe1xuXG52YXIgYmFubmVyO1xuXG50aGlzLmdldFVzZXJJbmZvID0gJGF1dGguZ2V0UGF5bG9hZCgpO1xudmFyIHRoZW1lO1xuXG5cbnRoaXMucG9zdGJhbm5lciA9IGZ1bmN0aW9uKGJhbm5lcil7XG4gIGNvbnNvbGUubG9nKGJhbm5lcik7XG4gIGNvbnNvbGUubG9nKGJhbm5lci51c2VyX2Jhbm5lcl9pbWFnZSk7XG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgIHVybDpcIi9iYW5uZXIvXCIgKyBiYW5uZXIudXNlcl9ob3VzZWhvbGQsXG4gICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe3VzZXJfYmFubmVyX2ltYWdlOmJhbm5lci51c2VyX2Jhbm5lcl9pbWFnZX0pXG4gIH0pXG59XG5cbnRoaXMuZ2V0YmFubmVyID0gZnVuY3Rpb24odXNlcklkKXtcbiAgY29uc29sZS5sb2codXNlcklkKTtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgdXJsOlwiL2Jhbm5lci9cIiArIHVzZXJJZFxuICB9KVxufVxuXG5cbnRoaXMuZ2V0V2VhdGhlciA9IGZ1bmN0aW9uKGxvY2F0aW9uKXtcbnJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIHVybDonaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPXppcD0nK2xvY2F0aW9uKycmdW5pdHM9aW1wZXJpYWwmYXBwaWQ9YzEwZWY5OWM1YWZkZWUzZmRmYmE3OGU4Yzk4MWE5YjYnXG4gIH0pXG5cbn07XG5cblxuIHRoaXMuc2V0VGhlbWUgPSBmdW5jdGlvbihkYXRhKXtcbiAgIHJldHVybiAkaHR0cCh7XG4gICAgIG1ldGhvZDogJ1B1dCcsXG4gICAgIHVybDpcIi90aGVtZVwiLFxuICAgICBkYXRhOiBkYXRhXG4gICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICB0aGVtZSA9IHJlcy5kYXRhWzBdLnVzZXJfdGhlbWVcbiAgICAgICByZXR1cm4gcmVzO1xuICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuIH0pXG4gfVxuXG50aGlzLmFkZENoaWxkID0gZnVuY3Rpb24oY2hpbGQpe1xuICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShjaGlsZCkpO1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDpcIlBPU1RcIixcbiAgICB1cmw6XCIvY2hpbGRyZW5cIixcbiAgICBkYXRhOiBjaGlsZFxuICB9KVxufVxuXG5cbnRoaXMuc2hvd2NoaWxkID0gZnVuY3Rpb24oaG91c2Vob2xkKXtcbnJldHVybiAkaHR0cCh7XG4gIG1ldGhvZDpcIkdFVFwiLFxuICB1cmw6XCIvY2hpbGRyZW4vXCIgKyBob3VzZWhvbGRcbn0pXG59XG5cbnRoaXMuZ2V0UmV3YXJkcyA9IGZ1bmN0aW9uKGlkKXtcbiAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgbWV0aG9kOiBcIkdldFwiLFxuICAgICAgdXJsOicvY2hpbGRyZXdhcmRzLycgKyBpZCxcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICByZXR1cm4gcmVzLmRhdGE7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgfSlcblxufVxuXG4gIHRoaXMucmV0dXJuVGhlbWUgPSBmdW5jdGlvbigpe1xuICAgIHJldHVybiB0aGVtZTtcbiAgfVxuXG5cbnRoaXMuZ2V0RGFpbHlDaG9yZXMgPSBmdW5jdGlvbihpZCl7XG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOiBcIkdldFwiLFxuICAgIHVybDonL2RhaWx5Y2hvcmUvJyArIGlkLFxuICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgY29uc29sZS5sb2coZXJyKTtcbn0pXG59XG5cbnRoaXMuZ2V0V2Vla2x5Q2hvcmVzID0gZnVuY3Rpb24oaWQpe1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDogXCJHZXRcIixcbiAgICB1cmw6Jy93ZWVrbHljaG9yZS8nICsgaWQsXG4gIH0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICByZXR1cm4gcmVzLmRhdGE7XG4gIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICBjb25zb2xlLmxvZyhlcnIpO1xufSlcbn1cblxudGhpcy5nZXRNb250aGx5Q2hvcmVzID0gZnVuY3Rpb24oaWQpe1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDogXCJHZXRcIixcbiAgICB1cmw6Jy9tb250aGx5Y2hvcmUvJyArIGlkLFxuICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgY29uc29sZS5sb2coZXJyKTtcbn0pXG59XG4gdGhpcy5jaGVja09mZmNob3JlID0gZnVuY3Rpb24oaWQpe1xuICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgICB1cmw6Jy9jb21wbGV0ZWQvJyArIGlkXG4gICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAgICByZXR1cm4gcmVzO1xuICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKXtcbiAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICB9KVxuICAgfVxudGhpcy5nZXRDaGlsZCA9IGZ1bmN0aW9uKGlkKXtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6IFwiR2V0XCIsXG4gICAgdXJsOiAnL2NoaWxkLycrIGlkXG4gIH0pLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICByZXR1cm4gcmVzLmRhdGFcbiAgfSlcbn1cblxudGhpcy51cGRhdGVQYXNzd29yZCA9IGZ1bmN0aW9uKGlkLGRhdGEpe1xuICBjb25zb2xlLmxvZyhpZClcbiAgY29uc29sZS5sb2coZGF0YSk7XG4gIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHsgXCJ1c2VyX25ld19wYXNzd29yZFwiOiBkYXRhfSkpXG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOlwiUFVUXCIsXG4gICAgdXJsOicvcGFzc3dvcmQvJyArIGlkLFxuICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHsgXCJ1c2VyX25ld19wYXNzd29yZFwiOiBkYXRhfSlcbiAgfSlcbn1cblxudGhpcy51cGRhdGVIb3VzZWhvbGQgPSBmdW5jdGlvbihpZCxob3VzZSl7XG4gIGNvbnNvbGUubG9nKGlkKVxuICBjb25zb2xlLmxvZyhob3VzZSlcbiAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoe1widXNlcl9ob3VzZWhvbGRcIjogaG91c2V9KSlcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6XCJQVVRcIixcbiAgICB1cmw6Jy9ob3VzZWhvbGQvJyArIGlkLFxuICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcInVzZXJfaG91c2Vob2xkXCI6IGhvdXNlfSlcbiAgfSlcbn1cblxuXG5cblxuXG5cbn0pOy8vZW5kIG9mIHNlcnZpY2VcbiJdfQ==
