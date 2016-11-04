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
}); // end of controller
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInNlcnZpY2UvY2hvcmVTZXJ2aWNlLmpzIiwic2VydmljZS9sb2dpblNlcnZpY2UuanMiLCJzZXJ2aWNlL3VzZXJTZXJ2aWNlLmpzIiwiY29udHJvbGxlcnMvYWRkQ2hpbGRDdHJsLmpzIiwiY29udHJvbGxlcnMvYXNzaWduQ2hvcmVDdHJsLmpzIiwiY29udHJvbGxlcnMvY2FtZXJhQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NoaWxkQmFua0N0cmwuanMiLCJjb250cm9sbGVycy9jaGlsZEhvbWVDdHJsLmpzIiwiY29udHJvbGxlcnMvY2hpbGRMb2dpbkN0cmwuanMiLCJjb250cm9sbGVycy9lZGl0Q2hpbGRDdHJsLmpzIiwiY29udHJvbGxlcnMvaGlzdG9yeUN0cmwuanMiLCJjb250cm9sbGVycy9ob21lQ3RybC5qcyIsImNvbnRyb2xsZXJzL2xvZ2luQ3RybC5qcyIsImNvbnRyb2xsZXJzL21ha2VDaG9yZUN0cmwuanMiLCJjb250cm9sbGVycy9zZXRSZXdhcmRzQ3RybC5qcyIsImNvbnRyb2xsZXJzL3NldHRpbmdzQ3RybC5qcyIsImNvbnRyb2xsZXJzL3RyYWNrZXJDdHJsLmpzIiwiY29udHJvbGxlcnMvdXNlckluZm9DdHJsLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsIiR1cmxSb3V0ZXJQcm92aWRlciIsIiRhdXRoUHJvdmlkZXIiLCJvdGhlcndpc2UiLCJzdGF0ZSIsInVybCIsInRlbXBsYXRlVXJsIiwiY29udHJvbGxlciIsImZhY2Vib29rIiwiY2xpZW50SWQiLCJyZXNwb25zZVR5cGUiLCJnb29nbGUiLCJydW4iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5Iiwid2luZG93IiwiY29yZG92YSIsInBsdWdpbnMiLCJLZXlib2FyZCIsImhpZGVLZXlib2FyZEFjY2Vzc29yeUJhciIsImRpc2FibGVTY3JvbGwiLCJTdGF0dXNCYXIiLCJzdHlsZURlZmF1bHQiLCJzZXJ2aWNlIiwiJGh0dHAiLCIkcSIsIiRhdXRoIiwiZ2V0VXNlckluZm8iLCJnZXRQYXlsb2FkIiwiZ2V0Q2hpbGRyZW4iLCJob3VzZWhvbGQiLCJtZXRob2QiLCJjcmVhdGVDaG9yZSIsImNob3JlIiwiY29uc29sZSIsImxvZyIsImRhdGEiLCJ1c2VyTG9naW4iLCJ1c2VyIiwibWFrZVVzZXIiLCJuZXdVc2VyIiwiYmFubmVyIiwidGhlbWUiLCJwb3N0YmFubmVyIiwidXNlcl9iYW5uZXJfaW1hZ2UiLCJ1c2VyX2hvdXNlaG9sZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJnZXRiYW5uZXIiLCJ1c2VySWQiLCJnZXRXZWF0aGVyIiwibG9jYXRpb24iLCJzZXRUaGVtZSIsInRoZW4iLCJyZXMiLCJ1c2VyX3RoZW1lIiwiY2F0Y2giLCJlcnIiLCJhZGRDaGlsZCIsImNoaWxkIiwic2hvd2NoaWxkIiwiZ2V0UmV3YXJkcyIsImlkIiwicmV0dXJuVGhlbWUiLCJnZXREYWlseUNob3JlcyIsImdldFdlZWtseUNob3JlcyIsImdldE1vbnRobHlDaG9yZXMiLCJjaGVja09mZmNob3JlIiwidXBkYXRlUGFzc3dvcmQiLCJ1cGRhdGVIb3VzZWhvbGQiLCJob3VzZSIsIiRzY29wZSIsInVzZXJTZXJ2aWNlIiwiJHN0YXRlIiwiZ29iYWNrIiwiaGlzdG9yeSIsImdvIiwic3ViIiwic3VibWl0Q2hpbGQiLCJjaG9yZVNlcnZpY2UiLCJjdXJyZW50VXNlciIsImNoaWxkcyIsInZhbHVlcyIsImNob3JlX2RhaWx5IiwiY2hvcmVfd2Vla2x5IiwiY2hvcmVfbW9udGhseSIsIkNyZWF0ZUNob3JlIiwibmFtZSIsImRlc2NyaXB0aW9uIiwidmFsdWUiLCJkYWlseSIsIndlZWtseSIsIm1vbnRobHkiLCJjaG9yZV9uYW1lIiwiY2hvcmVfZGVzY3JpcHRpb24iLCJ1c2VyX2hvdXNlaG9sZF9mayIsImNob3JlX3ZhbHVlIiwidXNlcl9pZF9mayIsImNoaWxkcmVuQ2hvcmVzIiwiY2hpbGRDaG9yZSIsInNlbGVjdENoaWxkIiwidXNlcl9pZF9wayIsInB1c2giLCJzdWJtaXRDaG9yZSIsImZvckVhY2giLCJ2YWwiLCIkY29yZG92YUNhbWVyYSIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsIiRjb3Jkb3ZhUGx1Z2luIiwic29tZUZ1bmN0aW9uIiwic3VjY2VzcyIsImVycm9yIiwidGFrZVBpY3R1cmUiLCJvcHRpb25zIiwicXVhbGl0eSIsImRlc3RpbmF0aW9uVHlwZSIsIkNhbWVyYSIsIkRlc3RpbmF0aW9uVHlwZSIsIkRBVEFfVVJMIiwic291cmNlVHlwZSIsIlBpY3R1cmVTb3VyY2VUeXBlIiwiQ0FNRVJBIiwiYWxsb3dFZGl0IiwiZW5jb2RpbmdUeXBlIiwiRW5jb2RpbmdUeXBlIiwiSlBFRyIsInRhcmdldFdpZHRoIiwidGFyZ2V0SGVpZ2h0IiwicG9wb3Zlck9wdGlvbnMiLCJDYW1lcmFQb3BvdmVyT3B0aW9ucyIsInNhdmVUb1Bob3RvQWxidW0iLCJjb3JyZWN0T3JpZW50YXRpb24iLCJnZXRQaWN0dXJlIiwiaW1hZ2VEYXRhIiwiaW1nVVJJIiwidXNlclRva2VuIiwiJG9uIiwiZ2V0VGhlbWUiLCJ0aGVtZUltYWdlIiwicmVzcG9uc2UiLCJyZXdhcmRzIiwiJGlvbmljTW9kYWwiLCJmcm9tVGVtcGxhdGVVcmwiLCJzY29wZSIsImJhY2tkcm9wQ2xpY2tUb0Nsb3NlIiwiYW5pbWF0aW9uIiwibW9kYWwiLCJvTW9kYWwxIiwib3Blbk1vZGFsIiwiaW5kZXgiLCJzaG93Iiwib01vZGFsMiIsImNsb3NlTW9kYWwiLCJoaWRlIiwicmVtb3ZlIiwiY2hvaWNlIiwic3RhdHVzIiwiZGFpbHlDaG9yZXMiLCJ3ZWVrbHlDaG9yZXMiLCJtb250aGx5Q2hvcmVzIiwicmV2ZWFsZXIiLCJsb2dpblNlcnZpY2UiLCJsb2dpbkNoaWxkIiwic2V0VG9rZW4iLCJ0ZXN0IiwiJHdpbmRvdyIsInN1Ym1pdEJhbm5lciIsImJhbm5lckluZm8iLCJnZXRFbGVtZW50QnlJZCIsInJlbG9hZCIsInppcCIsIndlYXRoZXIiLCJsb2dpbiIsImF1dGhlbnRpY2F0ZSIsInByb3ZpZGVyIiwib01vZGFsMyIsIm9Nb2RhbDQiLCJvTW9kYWw1IiwidXNlckluZm8iLCJzdWJtaXRQYXNzd29yZCIsInVzZXJfbmV3X3Bhc3N3b3JkIiwic3VibWl0SG91c2Vob2xkIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQUEsUUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0IsQ0FBQyxPQUFELEVBQVUsWUFBVixDQUF4QixFQUNDQyxNQURELENBQ1EsVUFBU0MsY0FBVCxFQUF5QkMsa0JBQXpCLEVBQTZDQyxhQUE3QyxFQUEyRDtBQUNqRUQscUJBQW1CRSxTQUFuQixDQUE2QixhQUE3QjtBQUNBSCxpQkFDQ0ksS0FERCxDQUNPLFVBRFAsRUFDa0I7QUFDaEJDLFNBQUksV0FEWTtBQUVoQkMsaUJBQWEsMkJBRkc7QUFHaEJDLGdCQUFZO0FBSEksR0FEbEIsRUFNQ0gsS0FORCxDQU1PLGFBTlAsRUFNcUI7QUFDbkJDLFNBQUksY0FEZTtBQUVuQkMsaUJBQWEsOEJBRk07QUFHbkJDLGdCQUFZO0FBSE8sR0FOckIsRUFXQ0gsS0FYRCxDQVdPLFdBWFAsRUFXbUI7QUFDakJDLFNBQUksZ0JBRGE7QUFFakJDLGlCQUFhLDRCQUZJO0FBR2pCQyxnQkFBWTtBQUhLLEdBWG5CLEVBZ0JDSCxLQWhCRCxDQWdCTyxTQWhCUCxFQWdCaUI7QUFDZkMsU0FBSSxVQURXO0FBRWZDLGlCQUFhLDBCQUZFO0FBR2ZDLGdCQUFZO0FBSEcsR0FoQmpCLEVBcUJDSCxLQXJCRCxDQXFCTyxNQXJCUCxFQXFCYztBQUNaQyxTQUFJLE9BRFE7QUFFWkMsaUJBQWEsdUJBRkQ7QUFHWkMsZ0JBQVk7QUFIQSxHQXJCZCxFQTBCQ0gsS0ExQkQsQ0EwQk8sT0ExQlAsRUEwQmU7QUFDYkMsU0FBSSxRQURTO0FBRWJDLGlCQUFhLHdCQUZBO0FBR2JDLGdCQUFZO0FBSEMsR0ExQmYsRUErQkNILEtBL0JELENBK0JPLFdBL0JQLEVBK0JtQjtBQUNqQkMsU0FBSSxZQURhO0FBRWpCQyxpQkFBYSw0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QixtQkFBNUIsRUFBaUQ7QUFDL0NDLFdBQU96RSxNQUR3QztBQUUvQzJFLGVBQVc7QUFGb0MsR0FBakQsRUFHRzdGLElBSEgsQ0FHUSxVQUFTOEYsS0FBVCxFQUFnQjtBQUN0QjVFLFdBQU80RSxLQUFQLEdBQWVBLEtBQWY7QUFDRCxHQUxEO0FBTUE1RSxTQUFPOEUsU0FBUCxHQUFtQixZQUFXO0FBQzVCOUUsV0FBTzRFLEtBQVAsQ0FBYUksSUFBYjtBQUNELEdBRkQ7QUFHQWhGLFNBQU9rRixVQUFQLEdBQW9CLFlBQVc7QUFDN0JsRixXQUFPNEUsS0FBUCxDQUFhTyxJQUFiO0FBQ0QsR0FGRDtBQUdBO0FBQ0FuRixTQUFPa0UsR0FBUCxDQUFXLFVBQVgsRUFBdUIsWUFBVztBQUNoQ2xFLFdBQU80RSxLQUFQLENBQWFRLE1BQWI7QUFDRCxHQUZEO0FBR0E7QUFDQXBGLFNBQU9rRSxHQUFQLENBQVcsY0FBWCxFQUEyQixZQUFXO0FBQ3BDO0FBQ0QsR0FGRDtBQUdBO0FBQ0FsRSxTQUFPa0UsR0FBUCxDQUFXLGVBQVgsRUFBNEIsWUFBVztBQUNyQztBQUNELEdBRkQ7QUFJRCxDQTFCRDs7O0FDQUE1SSxRQUFRQyxNQUFSLENBQWUsT0FBZixFQUF3QlMsVUFBeEIsQ0FBbUMsY0FBbkMsRUFBbUQsVUFBU2dFLE1BQVQsRUFBZ0I7QUFDaEVBLFVBQU84RixJQUFQLEdBQWMsOEJBQWQ7QUFFRixDQUhEIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIElvbmljIFN0YXJ0ZXIgQXBwXG5cbi8vIGFuZ3VsYXIubW9kdWxlIGlzIGEgZ2xvYmFsIHBsYWNlIGZvciBjcmVhdGluZywgcmVnaXN0ZXJpbmcgYW5kIHJldHJpZXZpbmcgQW5ndWxhciBtb2R1bGVzXG4vLyAnc3RhcnRlcicgaXMgdGhlIG5hbWUgb2YgdGhpcyBhbmd1bGFyIG1vZHVsZSBleGFtcGxlIChhbHNvIHNldCBpbiBhIDxib2R5PiBhdHRyaWJ1dGUgaW4gaW5kZXguaHRtbClcbi8vIHRoZSAybmQgcGFyYW1ldGVyIGlzIGFuIGFycmF5IG9mICdyZXF1aXJlcydcblxuYW5ndWxhci5tb2R1bGUoJ2Nob3JlJywgWydpb25pYycsICdzYXRlbGxpemVyJ10pXG4uY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRhdXRoUHJvdmlkZXIpe1xuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKFwiL2NoaWxkL2hvbWVcIik7XG4gICRzdGF0ZVByb3ZpZGVyXG4gIC5zdGF0ZSgnYWRkQ2hpbGQnLHtcbiAgICB1cmw6XCIvYWRkQ2hpbGRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9hZGRDaGlsZC5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJhZGRDaGlsZEN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2Fzc2lnbkNob3JlJyx7XG4gICAgdXJsOlwiL2Fzc2lnbkNob3JlXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvYXNzaWduQ2hvcmUuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiYXNzaWduQ2hvcmVDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdlZGl0Q2hpbGQnLHtcbiAgICB1cmw6XCIvZWRpdENoaWxkLzppZFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2VkaXRDaGlsZC5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJlZGl0Q2hpbGRDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdoaXN0b3J5Jyx7XG4gICAgdXJsOlwiL2hpc3RvcnlcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9oaXN0b3J5Lmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImhpc3RvcnlDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdob21lJyx7XG4gICAgdXJsOlwiL2hvbWVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9ob21lLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImhvbWVDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdsb2dpbicse1xuICAgIHVybDpcIi9sb2dpblwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL0xvZ2luLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImxvZ2luQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnbWFrZUNob3JlJyx7XG4gICAgdXJsOlwiL21ha2VDaG9yZVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL21ha2VDaG9yZS5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJtYWtlQ2hvcmVDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdzZXRSZXdhcmRzJyx7XG4gICAgdXJsOlwiL3NldFJld2FyZHMvOmlkXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvc2V0UmV3YXJkcy5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJzZXRSZXdhcmRzQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnc2V0dGluZ3MnLHtcbiAgICB1cmw6XCIvc2V0dGluZ3NcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9zZXR0aW5ncy5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJzZXR0aW5nc0N0cmxcIlxuICB9KVxuICAuc3RhdGUoJ3RyYWNrZXInLHtcbiAgICB1cmw6XCIvdHJhY2tlci86aWRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy90cmFja2VyLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcInRyYWNrZXJDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCd1c2VySW5mbycse1xuICAgIHVybDpcIi91c2VySW5mb1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL3VzZXJJbmZvLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcInVzZXJJbmZvQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnY2hpbGRCYW5rJyx7XG4gICAgdXJsOlwiL2NoaWxkL2JhbmtcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9jaGlsZEJhbmsuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRCYW5rQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnY2hpbGRIb21lJyx7XG4gICAgdXJsOlwiL2NoaWxkL2hvbWVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9jaGlsZEhvbWUuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRIb21lQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnY2hpbGRMb2dpbicse1xuICAgIHVybDpcIi9jaGlsZC9sb2dpblwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2NoaWxkTG9naW4uaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRMb2dpbkN0cmxcIlxuICB9KVxuXG4gICRhdXRoUHJvdmlkZXIuZmFjZWJvb2soe1xuICAgIGNsaWVudElkOiAnMzMyMjcyMDU3MTMyNjgxJ1xuICB9KTtcblxuICAvLyBPcHRpb25hbDogRm9yIGNsaWVudC1zaWRlIHVzZSAoSW1wbGljaXQgR3JhbnQpLCBzZXQgcmVzcG9uc2VUeXBlIHRvICd0b2tlbicgKGRlZmF1bHQ6ICdjb2RlJylcbiAgJGF1dGhQcm92aWRlci5mYWNlYm9vayh7XG4gICAgY2xpZW50SWQ6ICczMzIyNzIwNTcxMzI2ODEnLFxuICAgIHJlc3BvbnNlVHlwZTogJ3Rva2VuJ1xuICB9KTtcblxuICAkYXV0aFByb3ZpZGVyLmdvb2dsZSh7XG4gICAgY2xpZW50SWQ6ICcyNzUzNTI5NjA5NDYtNXJjYW4zcWtobHNjN201MGhldjVkbjJlMmNhZTltYnAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20nLFxuICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODEwMC8jL2xvZ2luLydcbiAgfSk7XG59KVxuXG5cblxuLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xuICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICBpZih3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuXG4gICAgICAvLyBEb24ndCByZW1vdmUgdGhpcyBsaW5lIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuIEl0IHN0b3BzIHRoZSB2aWV3cG9ydFxuICAgICAgLy8gZnJvbSBzbmFwcGluZyB3aGVuIHRleHQgaW5wdXRzIGFyZSBmb2N1c2VkLiBJb25pYyBoYW5kbGVzIHRoaXMgaW50ZXJuYWxseSBmb3JcbiAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgfVxuICAgIGlmKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcbiAgICB9XG4gIH0pO1xufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLnNlcnZpY2UoXCJjaG9yZVNlcnZpY2VcIiwgZnVuY3Rpb24oJGh0dHAsJHEsJGF1dGgpe1xuXG50aGlzLmdldFVzZXJJbmZvID0gJGF1dGguZ2V0UGF5bG9hZCgpO1xuXG5cbnRoaXMuZ2V0Q2hpbGRyZW4gPSBmdW5jdGlvbihob3VzZWhvbGQpe1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDpcIkdFVFwiLFxuICAgIHVybDpcIi9jaGlsZHJlbi9cIiArIGhvdXNlaG9sZFxuICB9KVxufVxuXG50aGlzLmNyZWF0ZUNob3JlID0gZnVuY3Rpb24oY2hvcmUpe1xuICBjb25zb2xlLmxvZygnaG93IG1hbnkgdGltZXMnKVxuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDpcIlBPU1RcIixcbiAgICB1cmw6XCIvYXNzaWduY2hvcmVcIixcbiAgICBkYXRhOmNob3JlXG4gIH0pXG59XG5cblxuXG5cbn0pLy9lbmQgb2Ygc2VydmljZVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuc2VydmljZSgnbG9naW5TZXJ2aWNlJywgZnVuY3Rpb24oJGh0dHApe1xuXG5cbiAgdGhpcy51c2VyTG9naW4gPSBmdW5jdGlvbih1c2VyKSB7XG4gICAgY29uc29sZS5sb2codXNlciwgXCJzZXJ2aWNlXCIpXG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB1cmw6ICcvYXV0aC9sb2dpbicsXG4gICAgICBkYXRhOiB1c2VyXG4gICAgfSlcbiAgfVxuICB0aGlzLm1ha2VVc2VyID0gZnVuY3Rpb24obmV3VXNlcikge1xuICAgIHJldHVybiAkaHR0cCh7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgdXJsOiAnL2F1dGgvc2lnbnVwJyxcbiAgICAgIGRhdGE6IG5ld1VzZXJcbiAgICB9KVxuICB9XG59KSAvLyBlbmQgb2Ygc2VydmljZVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuc2VydmljZSgndXNlclNlcnZpY2UnLCBmdW5jdGlvbigkaHR0cCwkcSwkYXV0aCl7XG5cbnZhciBiYW5uZXI7XG5cbnRoaXMuZ2V0VXNlckluZm8gPSAkYXV0aC5nZXRQYXlsb2FkKCk7XG52YXIgdGhlbWU7XG5cblxudGhpcy5wb3N0YmFubmVyID0gZnVuY3Rpb24oYmFubmVyKXtcbiAgY29uc29sZS5sb2coYmFubmVyKTtcbiAgY29uc29sZS5sb2coYmFubmVyLnVzZXJfYmFubmVyX2ltYWdlKTtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgdXJsOlwiL2Jhbm5lci9cIiArIGJhbm5lci51c2VyX2hvdXNlaG9sZCxcbiAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7dXNlcl9iYW5uZXJfaW1hZ2U6YmFubmVyLnVzZXJfYmFubmVyX2ltYWdlfSlcbiAgfSlcbn1cblxudGhpcy5nZXRiYW5uZXIgPSBmdW5jdGlvbih1c2VySWQpe1xuICBjb25zb2xlLmxvZyh1c2VySWQpO1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6XCIvYmFubmVyL1wiICsgdXNlcklkXG4gIH0pXG59XG5cblxudGhpcy5nZXRXZWF0aGVyID0gZnVuY3Rpb24obG9jYXRpb24pe1xucmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgdXJsOidodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9emlwPScrbG9jYXRpb24rJyZ1bml0cz1pbXBlcmlhbCZhcHBpZD1jMTBlZjk5YzVhZmRlZTNmZGZiYTc4ZThjOTgxYTliNidcbiAgfSlcblxufTtcblxuXG4gdGhpcy5zZXRUaGVtZSA9IGZ1bmN0aW9uKGRhdGEpe1xuICAgcmV0dXJuICRodHRwKHtcbiAgICAgbWV0aG9kOiAnUHV0JyxcbiAgICAgdXJsOlwiL3RoZW1lXCIsXG4gICAgIGRhdGE6IGRhdGFcbiAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgIHRoZW1lID0gcmVzLmRhdGFbMF0udXNlcl90aGVtZVxuICAgICAgIHJldHVybiByZXM7XG4gICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gfSlcbiB9XG5cbnRoaXMuYWRkQ2hpbGQgPSBmdW5jdGlvbihjaGlsZCl7XG4gIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGNoaWxkKSk7XG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOlwiUE9TVFwiLFxuICAgIHVybDpcIi9jaGlsZHJlblwiLFxuICAgIGRhdGE6IGNoaWxkXG4gIH0pXG59XG5cblxudGhpcy5zaG93Y2hpbGQgPSBmdW5jdGlvbihob3VzZWhvbGQpe1xucmV0dXJuICRodHRwKHtcbiAgbWV0aG9kOlwiR0VUXCIsXG4gIHVybDpcIi9jaGlsZHJlbi9cIiArIGhvdXNlaG9sZFxufSlcbn1cblxudGhpcy5nZXRSZXdhcmRzID0gZnVuY3Rpb24oaWQpe1xuICAgIHJldHVybiAkaHR0cCh7XG4gICAgICBtZXRob2Q6IFwiR2V0XCIsXG4gICAgICB1cmw6Jy9jaGlsZHJld2FyZHMvJyArIGlkLFxuICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIHJldHVybiByZXMuZGF0YTtcbiAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICB9KVxuXG59XG5cbiAgdGhpcy5yZXR1cm5UaGVtZSA9IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIHRoZW1lO1xuICB9XG5cblxudGhpcy5nZXREYWlseUNob3JlcyA9IGZ1bmN0aW9uKGlkKXtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6IFwiR2V0XCIsXG4gICAgdXJsOicvZGFpbHljaG9yZS8nICsgaWQsXG4gIH0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICByZXR1cm4gcmVzLmRhdGE7XG4gIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICBjb25zb2xlLmxvZyhlcnIpO1xufSlcbn1cblxudGhpcy5nZXRXZWVrbHlDaG9yZXMgPSBmdW5jdGlvbihpZCl7XG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOiBcIkdldFwiLFxuICAgIHVybDonL3dlZWtseWNob3JlLycgKyBpZCxcbiAgfSkudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgIHJldHVybiByZXMuZGF0YTtcbiAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgIGNvbnNvbGUubG9nKGVycik7XG59KVxufVxuXG50aGlzLmdldE1vbnRobHlDaG9yZXMgPSBmdW5jdGlvbihpZCl7XG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOiBcIkdldFwiLFxuICAgIHVybDonL21vbnRobHljaG9yZS8nICsgaWQsXG4gIH0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICByZXR1cm4gcmVzLmRhdGE7XG4gIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICBjb25zb2xlLmxvZyhlcnIpO1xufSlcbn1cbiB0aGlzLmNoZWNrT2ZmY2hvcmUgPSBmdW5jdGlvbihpZCl7XG4gICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgIHVybDonL2NvbXBsZXRlZC8nICsgaWRcbiAgICAgfSkudGhlbihmdW5jdGlvbihyZXMpe1xuICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgIH0pXG4gICB9XG5cbnRoaXMudXBkYXRlUGFzc3dvcmQgPSBmdW5jdGlvbihpZCxkYXRhKXtcbiAgY29uc29sZS5sb2coaWQpXG4gIGNvbnNvbGUubG9nKGRhdGEpO1xuICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh7IFwidXNlcl9uZXdfcGFzc3dvcmRcIjogZGF0YX0pKVxuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDpcIlBVVFwiLFxuICAgIHVybDonL3Bhc3N3b3JkLycgKyBpZCxcbiAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7IFwidXNlcl9uZXdfcGFzc3dvcmRcIjogZGF0YX0pXG4gIH0pXG59XG5cbnRoaXMudXBkYXRlSG91c2Vob2xkID0gZnVuY3Rpb24oaWQsaG91c2Upe1xuICBjb25zb2xlLmxvZyhpZClcbiAgY29uc29sZS5sb2coaG91c2UpXG4gIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHtcInVzZXJfaG91c2Vob2xkXCI6IGhvdXNlfSkpXG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOlwiUFVUXCIsXG4gICAgdXJsOicvaG91c2Vob2xkLycgKyBpZCxcbiAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XCJ1c2VyX2hvdXNlaG9sZFwiOiBob3VzZX0pXG4gIH0pXG59XG5cblxuXG5cblxuXG59KTsvL2VuZCBvZiBzZXJ2aWNlXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiYWRkQ2hpbGRDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSx1c2VyU2VydmljZSwkc3RhdGUpe1xuICAvL2JhY2tidXR0b25cbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XG4gICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpXG4gIH1cbnZhciB1c2VyID0gdXNlclNlcnZpY2UuZ2V0VXNlckluZm8uc3ViO1xuY29uc29sZS5sb2codXNlcik7XG4kc2NvcGUuc3VibWl0Q2hpbGQgPSBmdW5jdGlvbihjaGlsZCl7XG4gIGNoaWxkLnVzZXJfaG91c2Vob2xkID0gdXNlci51c2VyX2hvdXNlaG9sZDtcbiAgY29uc29sZS5sb2coY2hpbGQpO1xuICB1c2VyU2VydmljZS5hZGRDaGlsZChjaGlsZClcbiAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAkc3RhdGUuZ28oJ2hvbWUnKTtcbiAgfSk7XG5cbn1cblxuXG5cblxuXG59KSAvL2VuZCBvZiBjb250cm9sbGVyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiYXNzaWduQ2hvcmVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSxjaG9yZVNlcnZpY2UsJHN0YXRlKXtcblxudmFyIGN1cnJlbnRVc2VyID0gY2hvcmVTZXJ2aWNlLmdldFVzZXJJbmZvLnN1YjtcblxuXG5jaG9yZVNlcnZpY2UuZ2V0Q2hpbGRyZW4oY3VycmVudFVzZXIudXNlcl9ob3VzZWhvbGQpXG4udGhlbihmdW5jdGlvbihyZXMpe1xuICAvLyAkc2NvcGUuY2hvcmVzID0gcmVzLmRhdGE7XG4gICRzY29wZS5jaGlsZHMgPSByZXMuZGF0YTtcbiAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xufSk7XG5cblxuJHNjb3BlLnZhbHVlcyA9IFtdO1xuXG4kc2NvcGUuY2hvcmUgPSB7XG5jaG9yZV9kYWlseTogZmFsc2UsXG5jaG9yZV93ZWVrbHk6IGZhbHNlLFxuY2hvcmVfbW9udGhseTpmYWxzZSxcblxufTtcblxuZnVuY3Rpb24gQ3JlYXRlQ2hvcmUobmFtZSxkZXNjcmlwdGlvbixob3VzZWhvbGQsdmFsdWUsZGFpbHksd2Vla2x5LG1vbnRobHksY2hpbGQpe1xuICB0aGlzLmNob3JlX25hbWUgPSBuYW1lO1xuICB0aGlzLmNob3JlX2Rlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gIHRoaXMudXNlcl9ob3VzZWhvbGRfZmsgPSBob3VzZWhvbGQ7XG4gIHRoaXMuY2hvcmVfdmFsdWUgPSB2YWx1ZTtcbiAgdGhpcy5jaG9yZV9kYWlseSA9IGRhaWx5O1xuICB0aGlzLmNob3JlX3dlZWtseSA9IHdlZWtseTtcbiAgdGhpcy5jaG9yZV9tb250aGx5ID0gbW9udGhseTtcbiAgdGhpcy51c2VyX2lkX2ZrID0gY2hpbGQ7XG59XG5cblxudmFyIGNoaWxkcmVuQ2hvcmVzID0gW107XG4kc2NvcGUuY2hpbGRDaG9yZSA9IGZ1bmN0aW9uKGNob3JlKXtcbiAgdmFyIHNlbGVjdENoaWxkID0gdGhpcy5jaGlsZC51c2VyX2lkX3BrO1xuICB2YXIgY2hpbGRDaG9yZSA9IG5ldyBDcmVhdGVDaG9yZShjaG9yZS5jaG9yZV9uYW1lLGNob3JlLmNob3JlX2Rlc2NyaXB0aW9uLGN1cnJlbnRVc2VyLnVzZXJfaG91c2Vob2xkLGNob3JlLmNob3JlX3ZhbHVlLGNob3JlLmNob3JlX2RhaWx5LGNob3JlLmNob3JlX3dlZWtseSxjaG9yZS5jaG9yZV9tb250aGx5LHNlbGVjdENoaWxkKTtcbmNvbnNvbGUubG9nKGNoaWxkQ2hvcmUpO1xuICBjaGlsZHJlbkNob3Jlcy5wdXNoKGNoaWxkQ2hvcmUpO1xuICBjb25zb2xlLmxvZyhjaGlsZHJlbkNob3Jlcyk7XG59O1xuXG5cbiRzY29wZS5zdWJtaXRDaG9yZSA9IGZ1bmN0aW9uKCl7XG4gIGNvbnNvbGUubG9nKGNoaWxkcmVuQ2hvcmVzKTtcbiAgY2hpbGRyZW5DaG9yZXMuZm9yRWFjaChmdW5jdGlvbih2YWwpe1xuICAgIGNvbnNvbGUubG9nKCdpJyk7XG4gICAgY2hvcmVTZXJ2aWNlLmNyZWF0ZUNob3JlKHZhbClcbiAgICAudGhlbihmdW5jdGlvbihyZXMpe30pO1xuICB9XG5cbik7XG5jaGlsZHJlbkNob3JlcyA9IFtdO1xufTtcblxuXG5cblxuXG5cblxufSk7Ly9lbmQgb2YgY29udHJvbGxlclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcignY2FtZXJhQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGNvcmRvdmFDYW1lcmEpIHtcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZGV2aWNlcmVhZHlcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgJGNvcmRvdmFQbHVnaW4uc29tZUZ1bmN0aW9uKCkudGhlbihzdWNjZXNzLCBlcnJvcik7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgLy8gT1Igd2l0aCBJT05JQ1xuXG4gICAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAkY29yZG92YVBsdWdpbi5zb21lRnVuY3Rpb24oKS50aGVuKHN1Y2Nlc3MsIGVycm9yKTtcbiAgICB9KTtcblxuICAkc2NvcGUudGFrZVBpY3R1cmUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIHF1YWxpdHk6IDUwLFxuICAgICAgZGVzdGluYXRpb25UeXBlOiBDYW1lcmEuRGVzdGluYXRpb25UeXBlLkRBVEFfVVJMLFxuICAgICAgc291cmNlVHlwZTogQ2FtZXJhLlBpY3R1cmVTb3VyY2VUeXBlLkNBTUVSQSxcbiAgICAgIGFsbG93RWRpdDogZmFsc2UsXG4gICAgICBlbmNvZGluZ1R5cGU6IENhbWVyYS5FbmNvZGluZ1R5cGUuSlBFRyxcbiAgICAgIHRhcmdldFdpZHRoOiAzMDAsXG4gICAgICB0YXJnZXRIZWlnaHQ6IDMwMCxcbiAgICAgIHBvcG92ZXJPcHRpb25zOiBDYW1lcmFQb3BvdmVyT3B0aW9ucyxcbiAgICAgIHNhdmVUb1Bob3RvQWxidW06IGZhbHNlLFxuXHQgICAgY29ycmVjdE9yaWVudGF0aW9uOnRydWVcbiAgICB9O1xuXG4gICAgJGNvcmRvdmFDYW1lcmEuZ2V0UGljdHVyZShvcHRpb25zKS50aGVuKGZ1bmN0aW9uKGltYWdlRGF0YSkge1xuICAgICAgJHNjb3BlLmltZ1VSSSA9IFwiZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCxcIiArIGltYWdlRGF0YTtcbiAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgIC8vIGVycm9yXG4gICAgfSk7XG5cbiAgfTtcbiAgfSwgZmFsc2UpO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImNoaWxkQmFua0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkYXV0aCwgdXNlclNlcnZpY2Upe1xuICB2YXIgdXNlclRva2VuID0gJGF1dGguZ2V0UGF5bG9hZCgpO1xuICAgdXNlclNlcnZpY2UuZ2V0VXNlckluZm8gPSB1c2VyVG9rZW47XG4gICAkc2NvcGUudXNlciA9IHVzZXJUb2tlbi5zdWI7XG4gICAkc2NvcGUudGhlbWUgPSAkc2NvcGUudXNlci51c2VyX3RoZW1lXG5cbiAgICRzY29wZS4kb24oJyRpb25pY1ZpZXcuYmVmb3JlRW50ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgIHZhciBnZXRUaGVtZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgJHNjb3BlLnRoZW1lID0gdXNlclNlcnZpY2UucmV0dXJuVGhlbWUoKVxuICAgICB9XG4gICAgIGlmKHVzZXJTZXJ2aWNlLnJldHVyblRoZW1lKCkpe1xuICAgICAgIGdldFRoZW1lKClcbiAgICAgfVxuICAgICAkc2NvcGUuc2V0VGhlbWUgPSBmdW5jdGlvbigpe1xuICAgICAgIGlmKCRzY29wZS50aGVtZSA9PT0gJ2Jhc2ViYWxsJyl7XG4gICAgICAgICAkc2NvcGUudGhlbWVJbWFnZSA9ICcuL2ltZy9pbWctYmFzZWJhbGwtdHJhbnMucG5nJ1xuICAgICAgIH1cbiAgICAgICBpZigkc2NvcGUudGhlbWUgPT09ICdjaGFybGllQnJvd24nKXtcbiAgICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL3Nub29weS5wbmcnXG4gICAgICAgfVxuICAgICAgIGlmKCRzY29wZS50aGVtZSA9PT0gJ3ByaW5jZXNzJyl7XG4gICAgICAgICAkc2NvcGUudGhlbWVJbWFnZSA9ICcuL2ltZy9Dcm93bl9QcmluY2Vzcy5wbmcnXG4gICAgICAgfVxuICAgICAgIGlmKCRzY29wZS50aGVtZSA9PT0gJ3N0YXJXYXJzJyl7XG4gICAgICAgICAkc2NvcGUudGhlbWVJbWFnZSA9ICcuL2ltZy9kZWF0aC1zdGFyLTJuZC1pY29uLnBuZydcbiAgICAgICB9XG4gICAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAnd2F0ZXInKXtcbiAgICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL1RyYW5zcGFyZW50X1dhdGVyX0Ryb3BfUE5HX1BpY3R1cmUucG5nJ1xuICAgICAgIH1cblxuICAgICB9XG4gICAgICRzY29wZS5zZXRUaGVtZSgpO1xuICB9KTtcblxuXG5cblxuXG4gICB2YXIgZ2V0UmV3YXJkcyA9IGZ1bmN0aW9uKCl7XG4gICAgIGlkID0gJHNjb3BlLnVzZXIudXNlcl9pZF9waztcbiAgICAgdXNlclNlcnZpY2UuZ2V0UmV3YXJkcyhpZCkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgJHNjb3BlLnJld2FyZHMgPSByZXNwb25zZTtcbiAgICAgfSlcbiAgIH1cbiAgIGdldFJld2FyZHMoKTtcblxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImNoaWxkSG9tZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCwgJGF1dGgsIHVzZXJTZXJ2aWNlKXtcbiAgLy8gJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSAgY2hpbGQgSG9tZSBjb250cm9sbGVyXCJcbiAgLy92YXIgdXNlclRva2VuID0gdXNlclNlcnZpY2UuZ2V0VXNlckluZm8uc3ViO1xuXG4gIHZhciB1c2VyVG9rZW4gPSAkYXV0aC5nZXRQYXlsb2FkKCk7XG4gIHVzZXJTZXJ2aWNlLmdldFVzZXJJbmZvID0gdXNlclRva2VuO1xuICAkc2NvcGUudXNlciA9IHVzZXJUb2tlbi5zdWI7XG5cbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCd0aGVtZU1vZGFsLmh0bWwnLCB7XG4gICAgIGlkOiAnMScsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsMSA9IG1vZGFsO1xuICAgfSk7XG5cbiAgIC8vIE1vZGFsIDJcbiAgLy8gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgndGFrZVBpY3R1cmVNb2RhbC5odG1sJywge1xuICAvLyAgICBpZDogJzInLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgLy8gICAgc2NvcGU6ICRzY29wZSxcbiAgLy8gICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAvLyAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgLy8gIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgLy8gICAgJHNjb3BlLm9Nb2RhbDIgPSBtb2RhbDtcbiAgLy8gIH0pO1xuICAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgIGlmIChpbmRleCA9PSAxKSAkc2NvcGUub01vZGFsMS5zaG93KCk7XG4gICAgIGVsc2UgJHNjb3BlLm9Nb2RhbDIuc2hvdygpO1xuICAgfTtcblxuICAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICBpZiAoaW5kZXggPT0gMSkgJHNjb3BlLm9Nb2RhbDEuaGlkZSgpO1xuICAgICBlbHNlICRzY29wZS5vTW9kYWwyLmhpZGUoKTtcbiAgIH07XG5cbiAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICRzY29wZS5vTW9kYWwxLnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsMi5yZW1vdmUoKTtcblxuICAgfSk7XG5cbiAgJHNjb3BlLnRoZW1lID0gJHNjb3BlLnVzZXIudXNlcl90aGVtZVxuICAkc2NvcGUuc2V0VGhlbWUgPSBmdW5jdGlvbihjaG9pY2Upe1xuICAgIHZhciBkYXRhID0ge31cbiAgICBkYXRhLnRoZW1lID0gY2hvaWNlXG4gICAgZGF0YS51c2VySWQgPSAkc2NvcGUudXNlci51c2VyX2lkX3BrO1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIHVzZXJTZXJ2aWNlLnNldFRoZW1lKGRhdGEpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgIGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKXtcbiAgICAgICRzY29wZS50aGVtZSA9IGNob2ljZVxuICAgICAgfVxuICB9KVxuICB9XG5cblxuICB2YXIgZ2V0RGFpbHlDaG9yZXMgPSBmdW5jdGlvbigpe1xuICAgIGlkID0gJHNjb3BlLnVzZXIudXNlcl9pZF9wa1xuICAgIHVzZXJTZXJ2aWNlLmdldERhaWx5Q2hvcmVzKGlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICRzY29wZS5kYWlseUNob3JlcyA9IHJlc3BvbnNlO1xuICAgIH0pXG4gIH1cbiAgIGdldERhaWx5Q2hvcmVzKClcbiAgdmFyIGdldFdlZWtseUNob3JlcyA9IGZ1bmN0aW9uKCl7XG4gICAgaWQgPSAkc2NvcGUudXNlci51c2VyX2lkX3BrXG4gICAgdXNlclNlcnZpY2UuZ2V0V2Vla2x5Q2hvcmVzKGlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICRzY29wZS53ZWVrbHlDaG9yZXMgPSByZXNwb25zZTtcbiAgICB9KVxuICB9XG4gIGdldFdlZWtseUNob3JlcygpXG4gIHZhciBnZXRNb250aGx5Q2hvcmVzID0gZnVuY3Rpb24oKXtcbiAgICBpZCA9ICRzY29wZS51c2VyLnVzZXJfaWRfcGtcbiAgICB1c2VyU2VydmljZS5nZXRNb250aGx5Q2hvcmVzKGlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICRzY29wZS5tb250aGx5Q2hvcmVzID0gcmVzcG9uc2U7XG4gICAgfSlcbiAgfVxuICBnZXRNb250aGx5Q2hvcmVzKClcblxuICAkc2NvcGUucmV2ZWFsZXIgPSBmdW5jdGlvbigpe1xuICAgdGhpcy5oaWRlID0gIXRoaXMuaGlkZTtcbiAgfVxuXG4gIC8vICRzY29wZS5jaGVja09mZmNob3JlID0gZnVuY3Rpb24oaWQpe1xuICAvLyAgIHVzZXJTZXJ2aWNlLmNoZWNrT2ZmY2hvcmUoaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAvLyAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKXtcbiAgLy9cbiAgLy8gICAgIH1cbiAgLy8gICB9KVxuICAvLyAgfVxuXG5cbn0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImNoaWxkTG9naW5DdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGF1dGgsICRzdGF0ZSwgbG9naW5TZXJ2aWNlKXtcbiAgLy8gICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gY2hpbGQgTG9naW4gY29udHJvbGxlclwiXG5cbiAgICRzY29wZS5sb2dpbkNoaWxkID0gZnVuY3Rpb24odXNlcil7XG4gICAgIGNvbnNvbGUubG9nKHVzZXIpXG4gICAgIGxvZ2luU2VydmljZS51c2VyTG9naW4odXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgJGF1dGguc2V0VG9rZW4ocmVzcG9uc2UpXG4gICAgICAgICAkc3RhdGUuZ28oJ2NoaWxkSG9tZScpXG5cbiAgICAgfSlcbiAgIH1cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiZWRpdENoaWxkQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAkc2NvcGUuZ29iYWNrID0gZnVuY3Rpb24oKXtcbiAgICB3aW5kb3cuaGlzdG9yeS5nbygtMSlcbiAgfVxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImhpc3RvcnlDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIEhpc3RvcnkgY29udHJvbGxlclwiXG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiaG9tZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCx1c2VyU2VydmljZSwkd2luZG93LCAkYXV0aCl7XG52YXIgdXNlclRva2VuID0gdXNlclNlcnZpY2UuZ2V0VXNlckluZm8uc3ViO1xuY29uc29sZS5sb2codXNlclRva2VuKTtcbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnYmFubmVyTW9kYWwuaHRtbCcsIHtcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5tb2RhbCA9IG1vZGFsO1xuICAgfSk7XG4gICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgICRzY29wZS5tb2RhbC5zaG93KCk7XG4gICB9O1xuICAgJHNjb3BlLnN1Ym1pdEJhbm5lciA9IGZ1bmN0aW9uKGJhbm5lcil7XG4gICAgIHZhciBiYW5uZXJJbmZvID0ge1xuICAgICAgIHVzZXJfaG91c2Vob2xkOnVzZXJUb2tlbi51c2VyX2hvdXNlaG9sZCxcbiAgICAgICB1c2VyX2Jhbm5lcl9pbWFnZTpiYW5uZXJcbiAgICAgfVxuICAgICAgdXNlclNlcnZpY2UucG9zdGJhbm5lcihiYW5uZXJJbmZvKVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsLWJveFwiKS52YWx1ZSA9ICcnO1xuICAgICAgICAgICR3aW5kb3cubG9jYXRpb24ucmVsb2FkKHRydWUpO1xuICAgICB9KTtcbiAgIH07XG4gICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsLWJveFwiKS52YWx1ZSA9ICcnO1xuICAgICAkc2NvcGUubW9kYWwuaGlkZSgpO1xuICAgfTtcbiAgIC8vIENsZWFudXAgdGhlIG1vZGFsIHdoZW4gd2UncmUgZG9uZSB3aXRoIGl0IVxuICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgJHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuICAgfSk7XG4gICAvLyBFeGVjdXRlIGFjdGlvbiBvbiBoaWRlIG1vZGFsXG4gICAkc2NvcGUuJG9uKCdtb2RhbC5oaWRkZW4nLCBmdW5jdGlvbigpIHtcbiAgICAgLy8gRXhlY3V0ZSBhY3Rpb25cblxuICAgfSk7XG4gICAvLyBFeGVjdXRlIGFjdGlvbiBvbiByZW1vdmUgbW9kYWxcbiAgICRzY29wZS4kb24oJ21vZGFsLnJlbW92ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgIH0pO1xuXG4kc2NvcGUuaG91c2Vob2xkID0gIHVzZXJUb2tlbi51c2VyX2hvdXNlaG9sZDtcbnVzZXJTZXJ2aWNlLmdldGJhbm5lcih1c2VyVG9rZW4udXNlcl9ob3VzZWhvbGQpLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgJHNjb3BlLmJhbm5lciA9IHJlcy5kYXRhWzBdLnVzZXJfYmFubmVyX2ltYWdlO1xufSk7XG5cblxudXNlclNlcnZpY2UuZ2V0V2VhdGhlcih1c2VyVG9rZW4uemlwKVxuLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgJHNjb3BlLndlYXRoZXIgPSByZXMuZGF0YTtcbn0pXG5cblxudXNlclNlcnZpY2Uuc2hvd2NoaWxkKHVzZXJUb2tlbi51c2VyX2hvdXNlaG9sZClcbi50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gIGNvbnNvbGUubG9nKHJlcy5kYXRhKVxuICAkc2NvcGUuc2hvd2NoaWxkID0gcmVzLmRhdGE7XG59KVxuXG5cbn0pLy9lbmQgb2YgY29udHJvbGxlclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImxvZ2luQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRhdXRoLCAkc3RhdGUsIGxvZ2luU2VydmljZSl7XG5cbiRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uKHVzZXIpe1xuICAvLyBjb25zb2xlLmxvZyh1c2VyKVxuICBsb2dpblNlcnZpY2UudXNlckxvZ2luKHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICRhdXRoLnNldFRva2VuKHJlc3BvbnNlKVxuICAgICAgJHN0YXRlLmdvKCdob21lJylcblxuICB9KVxufVxuJHNjb3BlLm1ha2VVc2VyID0gZnVuY3Rpb24obmV3VXNlcil7XG4gIGxvZ2luU2VydmljZS5tYWtlVXNlcihuZXdVc2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAkYXV0aC5zZXRUb2tlbihyZXNwb25zZSlcbiAgICAgICRzdGF0ZS5nbygnaG9tZScpXG4gIH0pXG59XG4gICRzY29wZS5hdXRoZW50aWNhdGUgPSBmdW5jdGlvbihwcm92aWRlcikge1xuICAkYXV0aC5hdXRoZW50aWNhdGUocHJvdmlkZXIpfTtcbiAgLy8gJHNjb3BlLnRlc3QgPSBcIkhlbGxvIGZyb20gbG9naW4gY29udHJvbGxlclwiXG5cblxuICAkc2NvcGUucmV2ZWFsZXIgPSBmdW5jdGlvbigpe1xuICAkc2NvcGUuaGlkZSA9ICEkc2NvcGUuaGlkZTtcbiB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwibWFrZUNob3JlQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAkc2NvcGUuZ29iYWNrID0gZnVuY3Rpb24oKXtcbiAgICB3aW5kb3cuaGlzdG9yeS5nbygtMSlcbiAgfVxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcInNldFJld2FyZHNDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwpe1xuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3Jld2FyZE1vZGFsLmh0bWwnLCB7XG4gICAgc2NvcGU6ICRzY29wZSxcbiAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICRzY29wZS5tb2RhbCA9IG1vZGFsO1xuICB9KTtcbiAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5zaG93KCk7XG4gIH07XG4gICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcbiAgfTtcbiAgLy8gQ2xlYW51cCB0aGUgbW9kYWwgd2hlbiB3ZSdyZSBkb25lIHdpdGggaXQhXG4gICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuICB9KTtcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gaGlkZSBtb2RhbFxuICAkc2NvcGUuJG9uKCdtb2RhbC5oaWRkZW4nLCBmdW5jdGlvbigpIHtcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxuICB9KTtcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gcmVtb3ZlIG1vZGFsXG4gICRzY29wZS4kb24oJ21vZGFsLnJlbW92ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxuICB9KTtcbiAgLy9iYWNrYnV0dG9uXG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxuICB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwic2V0dGluZ3NDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwsIHVzZXJTZXJ2aWNlLCRhdXRoKXtcbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdjaGFuZ2VQYXNzd29yZC5odG1sJywge1xuICAgICBpZDogJzEnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDEgPSBtb2RhbDtcbiAgIH0pO1xuXG4gICAvLyBNb2RhbCAyXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2NoYW5nZUhvdXNlaG9sZC5odG1sJywge1xuICAgICBpZDogJzInLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDIgPSBtb2RhbDtcbiAgIH0pO1xuXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2NoYW5nZVppcC5odG1sJywge1xuICAgICBpZDogJzMnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDMgPSBtb2RhbDtcbiAgIH0pO1xuXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2FkZFBhcmVudC5odG1sJywge1xuICAgICBpZDogJzQnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDQgPSBtb2RhbDtcbiAgIH0pO1xuXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3JlbW92ZUNoaWxkLmh0bWwnLCB7XG4gICAgIGlkOiAnNScsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsNSA9IG1vZGFsO1xuICAgfSk7XG5cblxuXG4gICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgaWYgKGluZGV4ID09IDEpICRzY29wZS5vTW9kYWwxLnNob3coKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSAyKSAkc2NvcGUub01vZGFsMi5zaG93KCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMykgJHNjb3BlLm9Nb2RhbDMuc2hvdygpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDQpICRzY29wZS5vTW9kYWw0LnNob3coKTtcbiAgICAgZWxzZSAkc2NvcGUub01vZGFsNS5zaG93KCk7XG4gICB9O1xuXG4gICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgIGlmIChpbmRleCA9PSAxKSAkc2NvcGUub01vZGFsMS5oaWRlKCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMikgJHNjb3BlLm9Nb2RhbDIuaGlkZSgpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDMpICRzY29wZS5vTW9kYWwzLmhpZGUoKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSA0KSAkc2NvcGUub01vZGFsNC5oaWRlKCk7XG4gICAgIGVsc2UgJHNjb3BlLm9Nb2RhbDUuaGlkZSgpO1xuICAgfTtcblxuICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDEucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWwyLnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsMy5yZW1vdmUoKTtcbiAgICAgJHNjb3BlLm9Nb2RhbDQucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWw1LnJlbW92ZSgpO1xuICAgfSk7XG5cbnZhciB1c2VySW5mbyA9ICRhdXRoLmdldFBheWxvYWQoKS5zdWI7XG5jb25zb2xlLmxvZyh1c2VySW5mbyk7XG5cbiRzY29wZS5zdWJtaXRQYXNzd29yZCA9IGZ1bmN0aW9uKHVzZXIpe1xuICBjb25zb2xlLmxvZyh1c2VySW5mby51c2VyX2lkX3BrKTtcbiAgdXNlclNlcnZpY2UudXBkYXRlUGFzc3dvcmQodXNlckluZm8udXNlcl9pZF9wayx1c2VyLnVzZXJfbmV3X3Bhc3N3b3JkKVxuICAudGhlbihmdW5jdGlvbihyZXMpe1xuICAgICRzY29wZS5jbG9zZU1vZGFsKDEpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib2xkLXBhc3N3b3JkXCIpLnZhbHVlID0gJyc7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV3LXBhc3N3b3JkXCIpLnZhbHVlID0gJyc7XG4gIH0pO1xuXG59XG5cbiRzY29wZS5zdWJtaXRIb3VzZWhvbGQgPSBmdW5jdGlvbihob3VzZSl7XG4gIGNvbnNvbGUubG9nKGhvdXNlKTtcbiAgY29uc29sZS5sb2codXNlckluZm8udXNlcl9ob3VzZWhvbGQpO1xuICB1c2VyU2VydmljZS51cGRhdGVIb3VzZWhvbGQodXNlckluZm8udXNlcl9ob3VzZWhvbGQsaG91c2UpXG4gIC50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICRzY29wZS5jbG9zZU1vZGFsKDIpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXBkYXRlLWhvdXNlaG9sZFwiKS52YWx1ZSA9Jyc7XG4gIH0pXG59XG5cblxuXG5cbn0pIC8vIGVuZCBvZiBjb250cm9sbGVyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwidHJhY2tlckN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCl7XG4gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgncGljQ29uZk1vZGFsLmh0bWwnLCB7XG4gICAgc2NvcGU6ICRzY29wZSxcbiAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICRzY29wZS5tb2RhbCA9IG1vZGFsO1xuICB9KTtcbiAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5zaG93KCk7XG4gIH07XG4gICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcbiAgfTtcbiAgLy8gQ2xlYW51cCB0aGUgbW9kYWwgd2hlbiB3ZSdyZSBkb25lIHdpdGggaXQhXG4gICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuICB9KTtcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gaGlkZSBtb2RhbFxuICAkc2NvcGUuJG9uKCdtb2RhbC5oaWRkZW4nLCBmdW5jdGlvbigpIHtcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxuICB9KTtcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gcmVtb3ZlIG1vZGFsXG4gICRzY29wZS4kb24oJ21vZGFsLnJlbW92ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxuICB9KTtcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJ1c2VySW5mb0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gaW5mbyBjb250cm9sbGVyXCJcblxufSlcbiJdfQ==
