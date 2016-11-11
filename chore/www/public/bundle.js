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
    cache: false,
    url: "/home",
    templateUrl: "./templates/home.html",
    controller: "homeCtrl"
  }).state('login', {
    url: "/login",
    templateUrl: "./templates/login.html",
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
      url: "http://chorecheckoff.com/children/" + household
    });
  };

  this.createChore = function (chore) {
    return $http({
      method: "POST",
      url: "http://chorecheckoff.com/assignchore",
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
      url: 'http://chorecheckoff.com/auth/login',
      data: user
    }).then(function (res) {
      console.log(res);
      return res;
    });
  };
  this.makeUser = function (newUser) {
    console.log(newUser);
    return $http({
      method: "POST",
      url: 'http://chorecheckoff.com/auth/signup',
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
    return $http({
      method: "PUT",
      url: "http://chorecheckoff.com/banner/" + banner.user_household,
      data: JSON.stringify({ user_banner_image: banner.user_banner_image })
    }).then(function (res) {
      return res;
    }).catch(function (err) {
      console.log(err);
    });
  };

  this.getbanner = function (userId) {
    return $http({
      method: "GET",
      url: "http://chorecheckoff.com/banner/" + userId
    }).then(function (res) {
      return res.data;
    }).catch(function (err) {
      console.log(err);
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
      url: "http://chorecheckoff.com/theme",
      data: data
    }).then(function (res) {
      theme = res.data[0].user_theme;
      return res;
    }).catch(function (err) {
      console.log(err);
    });
  };

  this.addChild = function (child) {
    return $http({
      method: "POST",
      url: "http://chorecheckoff.com/children",
      data: child
    });
  };

  this.showchild = function (household) {
    return $http({
      method: "GET",
      url: "http://chorecheckoff.com/children/" + household
    });
  };

  this.getRewards = function (id) {
    return $http({
      method: "Get",
      url: 'http://chorecheckoff.com/childrewards/' + id
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
      url: 'http://chorecheckoff.com/dailychore/' + id
    }).then(function (res) {
      return res.data;
    }).catch(function (err) {
      console.log(err);
    });
  };

  this.getWeeklyChores = function (id) {
    return $http({
      method: "Get",
      url: 'http://chorecheckoff.com/weeklychore/' + id
    }).then(function (res) {
      return res.data;
    }).catch(function (err) {
      console.log(err);
    });
  };

  this.getMonthlyChores = function (id) {
    return $http({
      method: "Get",
      url: 'http://chorecheckoff.com/monthlychore/' + id
    }).then(function (res) {
      return res.data;
    }).catch(function (err) {
      console.log(err);
    });
  };
  this.checkOffchore = function (id) {
    return $http({
      method: "PUT",
      url: 'http://chorecheckoff.com/completed/' + id
    }).then(function (res) {
      return res;
    }).catch(function (err) {
      console.log(err);
    });
  };

  this.getChild = function (id) {
    return $http({
      method: "Get",
      url: 'http://chorecheckoff.com/child/' + id
    }).then(function (res) {
      return res.data;
    });
  };
  this.removeReward = function (uID, rID) {
    console.log(reward);
    return $http({
      method: "DELETE",
      url: 'http://chorecheckoff.com/reward/' + uID + '/' + rID
    }).then(function (res) {
      return res;
    }).catch(function (err) {
      console.log(err);
    });
  };

  this.makeReward = function (newReward) {
    return $http({
      method: "POST",
      url: 'http://chorecheckoff.com/reward',
      data: newReward
    }).then(function (res) {
      return res;
    }).catch(function (err) {
      console.log(err);
    });
  };

  this.updatePassword = function (id, data) {
    console.log(id);
    console.log(data);
    console.log(JSON.stringify({ "user_new_password": data }));
    return $http({
      method: "PUT",
      url: 'http://chorecheckoff.com/password/' + id,
      data: JSON.stringify({ "user_new_password": data })
    });
  };

  this.updateHousehold = function (id, house) {
    console.log(id);
    console.log(house);
    console.log(JSON.stringify({ "user_household": house }));
    return $http({
      method: "PUT",
      url: 'http://chorecheckoff.com/household/' + id,
      data: JSON.stringify({ "user_household": house })
    });
  };

  this.updatezip = function (id, zipcode) {
    console.log(id);
    console.log(zipcode);
    return $http({
      method: "PUT",
      url: 'http://chorecheckoff.com/zip/' + id,
      data: JSON.stringify({ "zip": zipcode })
    });
  };

  this.deleteChild = function (id) {
    return $http({
      method: "DELETE",
      url: 'http://chorecheckoff.com/deleteuser/' + id
    });
  };

  this.updateImage = function (id, image) {
    return $http({
      method: "PUT",
      url: 'http://chorecheckoff.com/image/' + id,
      data: JSON.stringify({ "user_image": image })
    }).then(function (res) {
      return res;
    }).catch(function (err) {
      console.log(err);
    });
  };

  this.updateName = function (id, name) {
    return $http({
      method: "PUT",
      url: 'http://chorecheckoff.com/firstname/' + id,

      data: JSON.stringify({ "user_first_name": name })
    });
  };

  this.updateEmail = function (id, email) {
    return $http({
      method: "PUT",
      url: 'http://chorecheckoff.com/email/' + id,
      data: JSON.stringify({ "user_email": email })
    });
  };

  this.updatePassword = function (id, password) {
    return $http({
      method: "PUT",
      url: 'http://chorecheckoff.com/password/' + id,
      data: JSON.stringify({ "password": password })
    });
  };

  this.confirmChore = function (choreID) {
    return $http({
      method: "PUT",
      url: 'http://chorecheckoff.com/completed/' + choreID
    }).then(function (res) {
      return res;
    }).catch(function (err) {
      console.log(err);
    });
  };
  this.denyChore = function (id) {
    return $http({
      method: "PUT",
      url: 'http://chorecheckoff.com/parentChoreStatus/' + id
    }).then(function (res) {
      return res;
    }).catch(function (err) {
      console.log(err);
    });
  };
  this.removeChore = function (id) {
    return $http({
      method: "DELETE",
      url: 'http://chorecheckoff.com/assignedchore/' + id
    }).then(function (res) {
      return res;
    }).catch(function (err) {
      console.log(err);
    });
  };
  this.reducePoints = function (id, points) {
    return $http({
      method: "PUT",
      url: 'http://chorecheckoff.com/minuspoints/' + id,
      data: JSON.stringify({ "points": points })
    }).then(function (res) {
      return res;
    }).catch(function (err) {
      console.log(err);
    });
  };
  this.getPoints = function (id) {
    return $http({
      method: "Get",
      url: 'http://chorecheckoff.com/points/' + id
    }).then(function (res) {
      return res.data;
    }).catch(function (err) {
      console.log(err);
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

angular.module('chore').controller("assignChoreCtrl", function ($scope, choreService, $state, $window) {

  var currentUser = choreService.getUserInfo.sub;

  choreService.getChildren(currentUser.user_household).then(function (res) {
    // $scope.chores = res.data;
    $scope.childs = res.data;
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

  var childIds = [];
  var childrenChores = [];
  $scope.childChore = function (chore) {
    var selectChild = this.child.user_id_pk;
    if (childIds.indexOf(selectChild) !== -1) {
      return;
    } else {
      var childChore = new CreateChore(chore.chore_name, chore.chore_description, currentUser.user_household, chore.chore_value, chore.chore_daily, chore.chore_weekly, chore.chore_monthly, selectChild);
      childrenChores.push(childChore);
      childIds.push(selectChild);
    }
  };

  $scope.submitChore = function () {
    childrenChores.forEach(function (val) {
      choreService.createChore(val).then(function (res) {
        $window.location.reload();
      });
    });
    childrenChores = [];
  };

  $scope.makeChoice = function () {
    this.selected = {
      'border': 'solid 2px #f9f9f9'
    };
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

  var getPoints = function getPoints() {
    id = $scope.user.user_id_pk;
    userService.getPoints(id).then(function (response) {
      $scope.pointTotal = response[0].user_points_total;
    });
  };
  getPoints();

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
  $scope.$on('$ionicView.beforeEnter', function () {
    var userToken = $auth.getPayload();
    userService.getUserInfo = userToken;
    $scope.user = userToken.sub;
    if ($scope.user.user_admin) {
      $state.go('login');
    }

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
        $scope.monthlyChores = response;
      });
    };
    getMonthlyChores();
  });

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

angular.module('chore').controller("editChildCtrl", function ($scope, userService, $state, $auth) {
  //backbutton
  $scope.goback = function () {
    window.history.go(-1);
  };

  var getChild = function getChild() {
    userService.getChild($state.params.id).then(function (response) {
      $scope.child = response[0];
    });
  };
  getChild();

  $scope.childSubmitImage = function (image) {
    userService.updateImage($scope.child.user_id_pk, image).then(function (res) {
      if (res.status === 200) {
        document.getElementById("child-setting-image").value = '';
      }
    });
  };

  $scope.childSubmitName = function (name) {
    userService.updateName($scope.child.user_id_pk, name).then(function (res) {
      if (res.status === 200) {
        getChild();
        document.getElementById("child-setting-name").value = '';
      }
    });
  };

  $scope.childSubmitEmail = function (email) {
    userService.updateEmail($scope.child.user_id_pk, email).then(function (res) {
      document.getElementById("child-setting-email").value = '';
    });
  };

  $scope.childSubmitPassword = function (password) {
    console.log($scope.child.user_id_pk);
    userService.updatePassword($scope.child.user_id_pk, password).then(function (res) {
      document.getElementById("child-setting-password").value = '';
    });
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
  if (!$scope.user.user_admin) {
    $state.go('childLogin');
  }
  $scope.banner = $scope.user_banner_image;
  $scope.household = $scope.user.user_household;
  userService.getbanner($scope.user.user_id_pk).then(function (res) {
    $scope.banner = res[0].user_banner_image;
  });

  userService.getWeather($scope.user.zip).then(function (res) {
    $scope.weather = res.data;
  });

  userService.showchild($scope.user.user_household).then(function (res) {
    $scope.showchild = res.data;
  });

  $ionicModal.fromTemplateUrl('bannerModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function () {
    $scope.modal.show();
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

  $scope.submitBanner = function (banner) {
    var bannerInfo = {
      user_household: $scope.user.user_household,
      user_banner_image: banner
    };
    userService.postbanner(bannerInfo).then(function (res) {
      if (res.status === 200) {
        $scope.closeModal();
        $scope.banner = banner;
      }
    });
  };

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
      if (response.status === 200) {
        $auth.setToken(response);
        $state.go('home');
      } else {
        alert('Email or password incorrect');
      }
    });
  };

  $scope.makeUser = function (newUser) {
    loginService.makeUser(newUser).then(function (response) {
      $auth.setToken(response);
      alert("new user created");
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
"use strict";

angular.module('chore').controller("setRewardsCtrl", function ($scope, $ionicModal, $state, userService, $auth) {
  var userToken = $auth.getPayload();
  userService.getUserInfo = userToken;
  $scope.user = userToken.sub;
  console.log($scope.user);

  var getChild = function getChild() {
    userService.getChild($state.params.id).then(function (response) {
      $scope.child = response[0];
      console.log($scope.child);
    });
  };
  getChild();
  var getRewards = function getRewards() {
    userService.getRewards($state.params.id).then(function (response) {
      $scope.rewards = response;
    });
  };
  getRewards();

  $scope.removeReward = function (id, i) {
    reward = {};
    userId = $state.params.id;
    rewardId = id;
    userService.removeReward(userId, rewardId).then(function (response) {
      if (response.status === 200) {
        $scope.rewards.splice(i, 1);
      }
    });
  };

  $scope.makeReward = function (newReward) {
    if (document.getElementById("togglecheckbox").checked) {
      newReward.user_id_fk = $state.params.id;
      newReward.user_household_fk = $scope.child.user_household;
      userService.makeReward(newReward).then(function (response) {
        if (response.status === 200) {
          getRewards();
          $scope.closeModal();
        }
      });
    } else {
      (function () {
        var outer = function outer(child) {
          console.log(child);
          return function inner() {
            var reward = {};
            reward.user_id_fk = child;
            reward.user_household_fk = $scope.child.user_household;
            reward.reward_description = newReward.reward_description;
            reward.reward_total = newReward.reward_total;
            console.log(reward);
            userService.makeReward(reward).then(function (response) {
              if (response.status === 200) {
                $scope.closeModal();
                getRewards();
              }
            });
          };
        };

        userService.showchild($scope.user.user_household).then(function (res) {
          var children = [];
          for (var i = 0; i < res.data.length; i++) {
            children.push(res.data[i].user_id_pk);
          }
          console.log(children);
          var calls = [];
          for (var j = 0; j < children.length; j++) {

            calls.push(outer(children[j]));
          }
          calls.forEach(function (element) {
            element();
          });
        });
      })();
    }
  };

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

angular.module('chore').controller("settingsCtrl", function ($scope, $ionicModal, userService, loginService, $auth, $state) {

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
    userService.updateHousehold(userInfo.user_household, house).then(function (res) {
      $scope.closeModal(2);
      document.getElementById("update-household").value = '';
    });
  };

  $scope.submitZipCode = function (zipcode) {
    userService.updatezip(userInfo.user_household, zipcode).then(function (res) {
      $scope.closeModal(3);
      document.getElementById("update-zip").value = '';
    });
  };

  $scope.createParent = function (user) {
    user.zipcode = userInfo.zip;
    user.household = userInfo.user_household;
    loginService.makeUser(user).then(function (response) {
      $auth.setToken(response);
      $scope.closeModal(4);
      document.getElementById("setting-parent-first").value = '';
      document.getElementById("setting-parent-last").value = '';
      document.getElementById("setting-email").value = '';
      document.getElementById("setting-password").value = '';
    });
  };

  $scope.getChild = function () {
    console.log('fired');
    userService.showchild(userInfo.user_household).then(function (res) {
      console.log(res.data);
      $scope.showchild = res.data;
    });
  };
  var removeChild = [];

  $scope.logger = function (index) {
    $scope.showchild[index].selected = !$scope.showchild[index].selected;
    $scope.removeChild(index);
    console.log(index);
  };

  $scope.removeChild = function (index) {
    $scope.showchild[index].selected = !$scope.showchild[index].selected;
    var selectedChild = $scope.showchild[index].user_id_pk;
    if ($scope.showchild[index].selected) {
      removeChild.push(selectedChild);
    } else {
      var i = removeChild.indexOf(selectedChild);
      removeChild.splice(i, 1);
    }
  };

  $scope.deleteChild = function () {
    console.log(removeChild);
    removeChild.forEach(function (val) {
      userService.deleteChild(val).then(function (res) {});
    });
    removeChild = [];
    $scope.closeModal(5);
  };

  $scope.logout = function () {
    $auth.logout();
    $state.go('login');
  };
}); // end of controller
'use strict';

angular.module('chore').controller("trackerCtrl", function ($scope, $ionicModal, $state, userService) {
  var getChild = function getChild() {
    userService.getChild($state.params.id).then(function (response) {
      $scope.child = response[0];
    });
  };
  getChild();

  userService.getDailyChores($state.params.id).then(function (response) {
    $scope.dailyChores = response;
  });

  userService.getWeeklyChores($state.params.id).then(function (response) {
    $scope.weeklyChores = response;
  });

  userService.getMonthlyChores($state.params.id).then(function (response) {
    $scope.monthlyChores = response;
  });

  $scope.confirmChore = function (choreID, index, scope) {
    userService.confirmChore(choreID).then(function (response) {
      if (response.status === 200) {
        if (scope.chore_daily) {
          $scope.dailyChores.splice(index, 1);
        }
        if (scope.chore_weekly) {
          $scope.weeklyChores.splice(index, 1);
        }
        if (scope.chore_monthly) {
          $scope.monthlyChores.splice(index, 1);
        }
      }
    });
  };

  $scope.denyChore = function (choreID, index, scope) {
    userService.denyChore(choreID).then(function (response) {
      if (response.status === 200) {
        if (scope.chore_daily) {
          $scope.dailyChores[index].chore_status = false;
        }
        if (scope.chore_weekly) {
          $scope.weeklyChores[index].chore_status = false;
        }
        if (scope.chore_monthly) {
          $scope.monthlyChores[index].chore_status = false;
        }
      }
    });
  };

  $scope.removeChore = function (choreID, index, scope) {
    userService.removeChore(choreID).then(function (response) {
      if (response.status === 200) {
        if (scope.chore_daily) {
          $scope.dailyChores.splice(index, 1);
        }
        if (scope.chore_weekly) {
          $scope.weeklyChores.splice(index, 1);
        }
        if (scope.chore_monthly) {
          $scope.monthlyChores.splice(index, 1);
        }
      }
    });
  };

  $scope.reducePoints = function (points) {
    var id = $scope.child.user_id_pk;
    userService.reducePoints(id, points).then(function (response) {
      console.log('updated');
    });
  };
}); //end of contoller
"use strict";

angular.module('chore').controller("userInfoCtrl", function ($scope) {
   $scope.test = "Message from info controller";
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInNlcnZpY2UvY2hvcmVTZXJ2aWNlLmpzIiwic2VydmljZS9sb2dpblNlcnZpY2UuanMiLCJzZXJ2aWNlL3VzZXJTZXJ2aWNlLmpzIiwiY29udHJvbGxlcnMvYWRkQ2hpbGRDdHJsLmpzIiwiY29udHJvbGxlcnMvYXNzaWduQ2hvcmVDdHJsLmpzIiwiY29udHJvbGxlcnMvY2FtZXJhQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NoaWxkQmFua0N0cmwuanMiLCJjb250cm9sbGVycy9jaGlsZEhvbWVDdHJsLmpzIiwiY29udHJvbGxlcnMvY2hpbGRMb2dpbkN0cmwuanMiLCJjb250cm9sbGVycy9lZGl0Q2hpbGRDdHJsLmpzIiwiY29udHJvbGxlcnMvaGlzdG9yeUN0cmwuanMiLCJjb250cm9sbGVycy9ob21lQ3RybC5qcyIsImNvbnRyb2xsZXJzL2xvZ2luQ3RybC5qcyIsImNvbnRyb2xsZXJzL21ha2VDaG9yZUN0cmwuanMiLCJjb250cm9sbGVycy9zZXRSZXdhcmRzQ3RybC5qcyIsImNvbnRyb2xsZXJzL3NldHRpbmdzQ3RybC5qcyIsImNvbnRyb2xsZXJzL3RyYWNrZXJDdHJsLmpzIiwiY29udHJvbGxlcnMvdXNlckluZm9DdHJsLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsIiR1cmxSb3V0ZXJQcm92aWRlciIsIiRhdXRoUHJvdmlkZXIiLCJvdGhlcndpc2UiLCJzdGF0ZSIsInVybCIsInRlbXBsYXRlVXJsIiwiY29udHJvbGxlciIsImNhY2hlIiwiZmFjZWJvb2siLCJjbGllbnRJZCIsInJlc3BvbnNlVHlwZSIsImdvb2dsZSIsInJ1biIsIiRpb25pY1BsYXRmb3JtIiwicmVhZHkiLCJ3aW5kb3ciLCJjb3Jkb3ZhIiwicGx1Z2lucyIsIktleWJvYXJkIiwiaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyIiwiZGlzYWJsZVNjcm9sbCIsIlN0YXR1c0JhciIsInN0eWxlRGVmYXVsdCIsInNlcnZpY2UiLCIkaHR0cCIsIiRxIiwiJGF1dGgiLCJnZXRVc2VySW5mbyIsImdldFBheWxvYWQiLCJnZXRDaGlsZHJlbiIsImhvdXNlaG9sZCIsIm1ldGhvZCIsImNyZWF0ZUNob3JlIiwiY2hvcmUiLCJkYXRhIiwidXNlckxvZ2luIiwidXNlciIsImNvbnNvbGUiLCJsb2ciLCJ0aGVuIiwicmVzIiwibWFrZVVzZXIiLCJuZXdVc2VyIiwiYmFubmVyIiwidGhlbWUiLCJwb3N0YmFubmVyIiwidXNlcl9ob3VzZWhvbGQiLCJKU09OIiwic3RyaW5naWZ5IiwidXNlcl9iYW5uZXJfaW1hZ2UiLCJjYXRjaCIsImVyciIsImdldGJhbm5lciIsInVzZXJJZCIsImdldFdlYXRoZXIiLCJsb2NhdGlvbiIsInNldFRoZW1lIiwidXNlcl90aGVtZSIsImFkZENoaWxkIiwiY2hpbGQiLCJzaG93Y2hpbGQiLCJnZXRSZXdhcmRzIiwiaWQiLCJyZXR1cm5UaGVtZSIsImdldERhaWx5Q2hvcmVzIiwiZ2V0V2Vla2x5Q2hvcmVzIiwiZ2V0TW9udGhseUNob3JlcyIsImNoZWNrT2ZmY2hvcmUiLCJnZXRDaGlsZCIsInJlbW92ZVJld2FyZCIsInVJRCIsInJJRCIsInJld2FyZCIsIm1ha2VSZXdhcmQiLCJuZXdSZXdhcmQiLCJ1cGRhdGVQYXNzd29yZCIsInVwZGF0ZUhvdXNlaG9sZCIsImhvdXNlIiwidXBkYXRlemlwIiwiemlwY29kZSIsImRlbGV0ZUNoaWxkIiwidXBkYXRlSW1hZ2UiLCJpbWFnZSIsInVwZGF0ZU5hbWUiLCJuYW1lIiwidXBkYXRlRW1haWwiLCJlbWFpbCIsInBhc3N3b3JkIiwiY29uZmlybUNob3JlIiwiY2hvcmVJRCIsImRlbnlDaG9yZSIsInJlbW92ZUNob3JlIiwicmVkdWNlUG9pbnRzIiwicG9pbnRzIiwiZ2V0UG9pbnRzIiwiJHNjb3BlIiwidXNlclNlcnZpY2UiLCIkc3RhdGUiLCJnb2JhY2siLCJoaXN0b3J5IiwiZ28iLCJzdWIiLCJzdWJtaXRDaGlsZCIsImNob3JlU2VydmljZSIsIiR3aW5kb3ciLCJjdXJyZW50VXNlciIsImNoaWxkcyIsInZhbHVlcyIsImNob3JlX2RhaWx5IiwiY2hvcmVfd2Vla2x5IiwiY2hvcmVfbW9udGhseSIsIkNyZWF0ZUNob3JlIiwiZGVzY3JpcHRpb24iLCJ2YWx1ZSIsImRhaWx5Iiwid2Vla2x5IiwibW9udGhseSIsImNob3JlX25hbWUiLCJjaG9yZV9kZXNjcmlwdGlvbiIsInVzZXJfaG91c2Vob2xkX2ZrIiwiY2hvcmVfdmFsdWUiLCJ1c2VyX2lkX2ZrIiwiY2hpbGRJZHMiLCJjaGlsZHJlbkNob3JlcyIsImNoaWxkQ2hvcmUiLCJzZWxlY3RDaGlsZCIsInVzZXJfaWRfcGsiLCJpbmRleE9mIiwicHVzaCIsInN1Ym1pdENob3JlIiwiZm9yRWFjaCIsInZhbCIsInJlbG9hZCIsIm1ha2VDaG9pY2UiLCJzZWxlY3RlZCIsIiRjb3Jkb3ZhQ2FtZXJhIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiJGNvcmRvdmFQbHVnaW4iLCJzb21lRnVuY3Rpb24iLCJzdWNjZXNzIiwiZXJyb3IiLCJ0YWtlUGljdHVyZSIsIm9wdGlvbnMiLCJxdWFsaXR5IiwiZGVzdGluYXRpb25UeXBlIiwiQ2FtZXJhIiwiRGVzdGluYXRpb25UeXBlIiwiREFUQV9VUkwiLCJzb3VyY2VUeXBlIiwiUGljdHVyZVNvdXJjZVR5cGUiLCJDQU1FUkEiLCJhbGxvd0VkaXQiLCJlbmNvZGluZ1R5cGUiLCJFbmNvZGluZ1R5cGUiLCJKUEVHIiwidGFyZ2V0V2lkdGgiLCJ0YXJnZXRIZWlnaHQiLCJwb3BvdmVyT3B0aW9ucyIsIkNhbWVyYVBvcG92ZXJPcHRpb25zIiwic2F2ZVRvUGhvdG9BbGJ1bSIsImNvcnJlY3RPcmllbnRhdGlvbiIsImdldFBpY3R1cmUiLCJpbWFnZURhdGEiLCJpbWdVUkkiLCJ1c2VyVG9rZW4iLCIkb24iLCJnZXRUaGVtZSIsInRoZW1lSW1hZ2UiLCJyZXNwb25zZSIsInBvaW50VG90YWwiLCJ1c2VyX3BvaW50c190b3RhbCIsInJld2FyZHMiLCIkaW9uaWNNb2RhbCIsInVzZXJfYWRtaW4iLCJjaG9pY2UiLCJzdGF0dXMiLCJkYWlseUNob3JlcyIsIndlZWtseUNob3JlcyIsIm1vbnRobHlDaG9yZXMiLCJmcm9tVGVtcGxhdGVVcmwiLCJzY29wZSIsImJhY2tkcm9wQ2xpY2tUb0Nsb3NlIiwiYW5pbWF0aW9uIiwibW9kYWwiLCJvTW9kYWwxIiwib3Blbk1vZGFsIiwiaW5kZXgiLCJzaG93Iiwib01vZGFsMiIsImNsb3NlTW9kYWwiLCJoaWRlIiwicmVtb3ZlIiwicmV2ZWFsZXIiLCJsb2dvdXQiLCJsb2dpblNlcnZpY2UiLCJsb2dpbkNoaWxkIiwic2V0VG9rZW4iLCJwYXJhbXMiLCJjaGlsZFN1Ym1pdEltYWdlIiwiZ2V0RWxlbWVudEJ5SWQiLCJjaGlsZFN1Ym1pdE5hbWUiLCJjaGlsZFN1Ym1pdEVtYWlsIiwiY2hpbGRTdWJtaXRQYXNzd29yZCIsInRlc3QiLCJ6aXAiLCJ3ZWF0aGVyIiwic3VibWl0QmFubmVyIiwiYmFubmVySW5mbyIsImxvZ2luIiwiYWxlcnQiLCJhdXRoZW50aWNhdGUiLCJwcm92aWRlciIsImkiLCJyZXdhcmRJZCIsInNwbGljZSIsImNoZWNrZWQiLCJvdXRlciIsImlubmVyIiwicmV3YXJkX2Rlc2NyaXB0aW9uIiwicmV3YXJkX3RvdGFsIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJjYWxscyIsImoiLCJlbGVtZW50Iiwib01vZGFsMyIsIm9Nb2RhbDQiLCJvTW9kYWw1IiwidXNlckluZm8iLCJzdWJtaXRQYXNzd29yZCIsInVzZXJfbmV3X3Bhc3N3b3JkIiwic3VibWl0SG91c2Vob2xkIiwic3VibWl0WmlwQ29kZSIsImNyZWF0ZVBhcmVudCIsInJlbW92ZUNoaWxkIiwibG9nZ2VyIiwic2VsZWN0ZWRDaGlsZCIsImNob3JlX3N0YXR1cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUFBLFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCLENBQUMsT0FBRCxFQUFVLFlBQVYsQ0FBeEIsRUFDQ0MsTUFERCxD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QUFDbERyRixnQkFBWUwsV0FBWixDQUF3QkYsT0FBeEIsRUFBaUNsRCxJQUFqQyxDQUFzQyxVQUFTa0ksUUFBVCxFQUFrQjtBQUN2RCxVQUFHQSxTQUFTTyxNQUFULEtBQW9CLEdBQXZCLEVBQTJCO0FBQ3JCLFlBQUdLLE1BQU16RSxXQUFULEVBQXFCO0FBQ25CYixpQkFBT2tGLFdBQVAsQ0FBbUJzQyxNQUFuQixDQUEwQjVCLEtBQTFCLEVBQWlDLENBQWpDO0FBQ0Q7QUFDRCxZQUFHTixNQUFNeEUsWUFBVCxFQUFzQjtBQUNwQmQsaUJBQU9tRixZQUFQLENBQW9CcUMsTUFBcEIsQ0FBMkI1QixLQUEzQixFQUFrQyxDQUFsQztBQUNEO0FBQ0QsWUFBR04sTUFBTXZFLGFBQVQsRUFBdUI7QUFDckJmLGlCQUFPb0YsYUFBUCxDQUFxQm9DLE1BQXJCLENBQTRCNUIsS0FBNUIsRUFBbUMsQ0FBbkM7QUFDRDtBQUNOO0FBQ0QsS0FaRDtBQWFELEdBZEQ7O0FBZ0JBNUYsU0FBT0gsWUFBUCxHQUFzQixVQUFTQyxNQUFULEVBQWdCO0FBQ3BDLFFBQUkvQixLQUFLaUMsT0FBT3BDLEtBQVAsQ0FBYW1FLFVBQXRCO0FBQ0E5QixnQkFBWUosWUFBWixDQUF5QjlCLEVBQXpCLEVBQTZCK0IsTUFBN0IsRUFBcUN0RCxJQUFyQyxDQUEwQyxVQUFTa0ksUUFBVCxFQUFrQjtBQUMxRHBJLGNBQVFDLEdBQVIsQ0FBWSxTQUFaO0FBQ0QsS0FGRDtBQUdELEdBTEQ7QUFRRCxDQTlFTCxHQThFTzs7O0FDOUVQMUMsUUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0JTLFVBQXhCLENBQW1DLGNBQW5DLEVBQW1ELFVBQVN5RixNQUFULEVBQWdCO0FBQ2hFQSxVQUFPNkcsSUFBUCxHQUFjLDhCQUFkO0FBRUYsQ0FIRCIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJb25pYyBTdGFydGVyIEFwcFxuXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xuLy8gJ3N0YXJ0ZXInIGlzIHRoZSBuYW1lIG9mIHRoaXMgYW5ndWxhciBtb2R1bGUgZXhhbXBsZSAoYWxzbyBzZXQgaW4gYSA8Ym9keT4gYXR0cmlidXRlIGluIGluZGV4Lmh0bWwpXG4vLyB0aGUgMm5kIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvZiAncmVxdWlyZXMnXG5cbmFuZ3VsYXIubW9kdWxlKCdjaG9yZScsIFsnaW9uaWMnLCAnc2F0ZWxsaXplciddKVxuLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkYXV0aFByb3ZpZGVyKXtcbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShcIi9sb2dpblwiKTtcbiAgJHN0YXRlUHJvdmlkZXJcbiAgLnN0YXRlKCdhZGRDaGlsZCcse1xuICAgIHVybDpcIi9hZGRDaGlsZFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2FkZENoaWxkLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImFkZENoaWxkQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnYXNzaWduQ2hvcmUnLHtcbiAgICB1cmw6XCIvYXNzaWduQ2hvcmVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9hc3NpZ25DaG9yZS5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJhc3NpZ25DaG9yZUN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2VkaXRDaGlsZCcse1xuICAgIHVybDpcIi9lZGl0Q2hpbGQvOmlkXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvZWRpdENoaWxkLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImVkaXRDaGlsZEN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2hpc3RvcnknLHtcbiAgICB1cmw6XCIvaGlzdG9yeVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2hpc3RvcnkuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiaGlzdG9yeUN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2hvbWUnLHtcbiAgICBjYWNoZTogZmFsc2UsXG4gICAgdXJsOlwiL2hvbWVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9ob21lLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImhvbWVDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdsb2dpbicse1xuICAgIHVybDpcIi9sb2dpblwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2xvZ2luLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImxvZ2luQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnbWFrZUNob3JlJyx7XG4gICAgdXJsOlwiL21ha2VDaG9yZVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL21ha2VDaG9yZS5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJtYWtlQ2hvcmVDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdzZXRSZXdhcmRzJyx7XG4gICAgdXJsOlwiL3NldFJld2FyZHMvOmlkXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvc2V0UmV3YXJkcy5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJzZXRSZXdhcmRzQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnc2V0dGluZ3MnLHtcbiAgICB1cmw6XCIvc2V0dGluZ3NcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9zZXR0aW5ncy5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJzZXR0aW5nc0N0cmxcIlxuICB9KVxuICAuc3RhdGUoJ3RyYWNrZXInLHtcbiAgICB1cmw6XCIvdHJhY2tlci86aWRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy90cmFja2VyLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcInRyYWNrZXJDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCd1c2VySW5mbycse1xuICAgIHVybDpcIi91c2VySW5mb1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL3VzZXJJbmZvLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcInVzZXJJbmZvQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnY2hpbGRCYW5rJyx7XG4gICAgdXJsOlwiL2NoaWxkL2JhbmtcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9jaGlsZEJhbmsuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRCYW5rQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnY2hpbGRIb21lJyx7XG4gICAgdXJsOlwiL2NoaWxkL2hvbWVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9jaGlsZEhvbWUuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRIb21lQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnY2hpbGRMb2dpbicse1xuICAgIHVybDpcIi9jaGlsZC9sb2dpblwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2NoaWxkTG9naW4uaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRMb2dpbkN0cmxcIlxuICB9KVxuXG4gICRhdXRoUHJvdmlkZXIuZmFjZWJvb2soe1xuICAgIGNsaWVudElkOiAnMzMyMjcyMDU3MTMyNjgxJ1xuICB9KTtcblxuICAvLyBPcHRpb25hbDogRm9yIGNsaWVudC1zaWRlIHVzZSAoSW1wbGljaXQgR3JhbnQpLCBzZXQgcmVzcG9uc2VUeXBlIHRvICd0b2tlbicgKGRlZmF1bHQ6ICdjb2RlJylcbiAgJGF1dGhQcm92aWRlci5mYWNlYm9vayh7XG4gICAgY2xpZW50SWQ6ICczMzIyNzIwNTcxMzI2ODEnLFxuICAgIHJlc3BvbnNlVHlwZTogJ3Rva2VuJ1xuICB9KTtcblxuICAkYXV0aFByb3ZpZGVyLmdvb2dsZSh7XG4gICAgY2xpZW50SWQ6ICcyNzUzNTI5NjA5NDYtNXJjYW4zcWtobHNjN201MGhldjVkbjJlMmNhZTltYnAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20nLFxuICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODEwMC8jL2xvZ2luLydcbiAgfSk7XG59KVxuXG5cblxuLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xuICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICBpZih3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuXG4gICAgICAvLyBEb24ndCByZW1vdmUgdGhpcyBsaW5lIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuIEl0IHN0b3BzIHRoZSB2aWV3cG9ydFxuICAgICAgLy8gZnJvbSBzbmFwcGluZyB3aGVuIHRleHQgaW5wdXRzIGFyZSBmb2N1c2VkLiBJb25pYyBoYW5kbGVzIHRoaXMgaW50ZXJuYWxseSBmb3JcbiAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgfVxuICAgIGlmKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcbiAgICB9XG4gIH0pO1xufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLnNlcnZpY2UoXCJjaG9yZVNlcnZpY2VcIiwgZnVuY3Rpb24oJGh0dHAsJHEsJGF1dGgpe1xuXG50aGlzLmdldFVzZXJJbmZvID0gJGF1dGguZ2V0UGF5bG9hZCgpO1xuXG5cbnRoaXMuZ2V0Q2hpbGRyZW4gPSBmdW5jdGlvbihob3VzZWhvbGQpe1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDpcIkdFVFwiLFxuICAgIHVybDpcImh0dHA6Ly9jaG9yZWNoZWNrb2ZmLmNvbS9jaGlsZHJlbi9cIiArIGhvdXNlaG9sZFxuICB9KVxufVxuXG50aGlzLmNyZWF0ZUNob3JlID0gZnVuY3Rpb24oY2hvcmUpe1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDpcIlBPU1RcIixcbiAgICB1cmw6XCJodHRwOi8vY2hvcmVjaGVja29mZi5jb20vYXNzaWduY2hvcmVcIixcbiAgICBkYXRhOmNob3JlXG4gIH0pXG59XG5cblxuXG5cbn0pLy9lbmQgb2Ygc2VydmljZVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuc2VydmljZSgnbG9naW5TZXJ2aWNlJywgZnVuY3Rpb24oJGh0dHApe1xuXG5cbiAgdGhpcy51c2VyTG9naW4gPSBmdW5jdGlvbih1c2VyKSB7XG4gICAgY29uc29sZS5sb2codXNlciwgXCJzZXJ2aWNlXCIpXG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB1cmw6ICdodHRwOi8vY2hvcmVjaGVja29mZi5jb20vYXV0aC9sb2dpbicsXG4gICAgICBkYXRhOiB1c2VyXG4gICAgfSkudGhlbihmdW5jdGlvbihyZXMpe1xuICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfSlcbiAgfVxuICB0aGlzLm1ha2VVc2VyID0gZnVuY3Rpb24obmV3VXNlcikge1xuICAgIGNvbnNvbGUubG9nKG5ld1VzZXIpO1xuICAgIHJldHVybiAkaHR0cCh7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgdXJsOiAnaHR0cDovL2Nob3JlY2hlY2tvZmYuY29tL2F1dGgvc2lnbnVwJyxcbiAgICAgIGRhdGE6IG5ld1VzZXJcbiAgICB9KVxuICB9XG59KSAvLyBlbmQgb2Ygc2VydmljZVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuc2VydmljZSgndXNlclNlcnZpY2UnLCBmdW5jdGlvbigkaHR0cCwkcSwkYXV0aCl7XG5cbnZhciBiYW5uZXI7XG50aGlzLmdldFVzZXJJbmZvID0gJGF1dGguZ2V0UGF5bG9hZCgpO1xudmFyIHRoZW1lO1xuXG5cbnRoaXMucG9zdGJhbm5lciA9IGZ1bmN0aW9uKGJhbm5lcil7XG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgIHVybDpcImh0dHA6Ly9jaG9yZWNoZWNrb2ZmLmNvbS9iYW5uZXIvXCIgKyBiYW5uZXIudXNlcl9ob3VzZWhvbGQsXG4gICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe3VzZXJfYmFubmVyX2ltYWdlOmJhbm5lci51c2VyX2Jhbm5lcl9pbWFnZX0pXG4gIH0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICByZXR1cm4gcmVzO1xuICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgY29uc29sZS5sb2coZXJyKTtcbn0pXG59XG5cbnRoaXMuZ2V0YmFubmVyID0gZnVuY3Rpb24odXNlcklkKXtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgdXJsOlwiaHR0cDovL2Nob3JlY2hlY2tvZmYuY29tL2Jhbm5lci9cIiArIHVzZXJJZFxuICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgY29uc29sZS5sb2coZXJyKTtcbn0pXG5cbn1cblxuXG50aGlzLmdldFdlYXRoZXIgPSBmdW5jdGlvbihsb2NhdGlvbil7XG5yZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6J2h0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT16aXA9Jytsb2NhdGlvbisnJnVuaXRzPWltcGVyaWFsJmFwcGlkPWMxMGVmOTljNWFmZGVlM2ZkZmJhNzhlOGM5ODFhOWI2J1xuICB9KVxuXG59O1xuXG5cbiB0aGlzLnNldFRoZW1lID0gZnVuY3Rpb24oZGF0YSl7XG4gICByZXR1cm4gJGh0dHAoe1xuICAgICBtZXRob2Q6ICdQdXQnLFxuICAgICB1cmw6XCJodHRwOi8vY2hvcmVjaGVja29mZi5jb20vdGhlbWVcIixcbiAgICAgZGF0YTogZGF0YVxuICAgfSkudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgdGhlbWUgPSByZXMuZGF0YVswXS51c2VyX3RoZW1lXG4gICAgICAgcmV0dXJuIHJlcztcbiAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiB9KVxuIH1cblxudGhpcy5hZGRDaGlsZCA9IGZ1bmN0aW9uKGNoaWxkKXtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6XCJQT1NUXCIsXG4gICAgdXJsOlwiaHR0cDovL2Nob3JlY2hlY2tvZmYuY29tL2NoaWxkcmVuXCIsXG4gICAgZGF0YTogY2hpbGRcbiAgfSlcbn1cblxuXG50aGlzLnNob3djaGlsZCA9IGZ1bmN0aW9uKGhvdXNlaG9sZCl7XG5yZXR1cm4gJGh0dHAoe1xuICBtZXRob2Q6XCJHRVRcIixcbiAgdXJsOlwiaHR0cDovL2Nob3JlY2hlY2tvZmYuY29tL2NoaWxkcmVuL1wiICsgaG91c2Vob2xkXG59KVxufVxuXG50aGlzLmdldFJld2FyZHMgPSBmdW5jdGlvbihpZCl7XG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogXCJHZXRcIixcbiAgICAgIHVybDonaHR0cDovL2Nob3JlY2hlY2tvZmYuY29tL2NoaWxkcmV3YXJkcy8nICsgaWQsXG4gICAgfSkudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gIH0pXG5cbn1cblxuICB0aGlzLnJldHVyblRoZW1lID0gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gdGhlbWU7XG4gIH1cblxuXG50aGlzLmdldERhaWx5Q2hvcmVzID0gZnVuY3Rpb24oaWQpe1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDogXCJHZXRcIixcbiAgICB1cmw6J2h0dHA6Ly9jaG9yZWNoZWNrb2ZmLmNvbS9kYWlseWNob3JlLycgKyBpZCxcbiAgfSkudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgIHJldHVybiByZXMuZGF0YTtcbiAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgIGNvbnNvbGUubG9nKGVycik7XG59KVxufVxuXG50aGlzLmdldFdlZWtseUNob3JlcyA9IGZ1bmN0aW9uKGlkKXtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6IFwiR2V0XCIsXG4gICAgdXJsOidodHRwOi8vY2hvcmVjaGVja29mZi5jb20vd2Vla2x5Y2hvcmUvJyArIGlkLFxuICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgY29uc29sZS5sb2coZXJyKTtcbn0pXG59XG5cbnRoaXMuZ2V0TW9udGhseUNob3JlcyA9IGZ1bmN0aW9uKGlkKXtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6IFwiR2V0XCIsXG4gICAgdXJsOidodHRwOi8vY2hvcmVjaGVja29mZi5jb20vbW9udGhseWNob3JlLycgKyBpZCxcbiAgfSkudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgIHJldHVybiByZXMuZGF0YTtcbiAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgIGNvbnNvbGUubG9nKGVycik7XG59KVxufVxuIHRoaXMuY2hlY2tPZmZjaG9yZSA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICAgdXJsOidodHRwOi8vY2hvcmVjaGVja29mZi5jb20vY29tcGxldGVkLycgKyBpZFxuICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgcmV0dXJuIHJlcztcbiAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XG4gICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgfSlcbiAgIH1cblxudGhpcy5nZXRDaGlsZCA9IGZ1bmN0aW9uKGlkKXtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6IFwiR2V0XCIsXG4gICAgdXJsOiAnaHR0cDovL2Nob3JlY2hlY2tvZmYuY29tL2NoaWxkLycrIGlkXG4gIH0pLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICByZXR1cm4gcmVzLmRhdGFcbiAgfSlcbn1cbnRoaXMucmVtb3ZlUmV3YXJkID0gZnVuY3Rpb24odUlELCBySUQpe1xuICBjb25zb2xlLmxvZyhyZXdhcmQpO1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDpcIkRFTEVURVwiLFxuICAgIHVybDonaHR0cDovL2Nob3JlY2hlY2tvZmYuY29tL3Jld2FyZC8nICsgdUlEICsgJy8nICsgcklEXG4gIH0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICByZXR1cm4gcmVzO1xuICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgIH0pXG59XG5cbnRoaXMubWFrZVJld2FyZCA9IGZ1bmN0aW9uKG5ld1Jld2FyZCl7XG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOlwiUE9TVFwiLFxuICAgIHVybDonaHR0cDovL2Nob3JlY2hlY2tvZmYuY29tL3Jld2FyZCcsXG4gICAgZGF0YTogbmV3UmV3YXJkXG4gIH0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICByZXR1cm4gcmVzO1xuICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgIH0pXG59XG5cbnRoaXMudXBkYXRlUGFzc3dvcmQgPSBmdW5jdGlvbihpZCxkYXRhKXtcbiAgY29uc29sZS5sb2coaWQpXG4gIGNvbnNvbGUubG9nKGRhdGEpO1xuICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh7IFwidXNlcl9uZXdfcGFzc3dvcmRcIjogZGF0YX0pKVxuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDpcIlBVVFwiLFxuICAgIHVybDonaHR0cDovL2Nob3JlY2hlY2tvZmYuY29tL3Bhc3N3b3JkLycgKyBpZCxcbiAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7IFwidXNlcl9uZXdfcGFzc3dvcmRcIjogZGF0YX0pXG4gIH0pXG59XG5cbnRoaXMudXBkYXRlSG91c2Vob2xkID0gZnVuY3Rpb24oaWQsaG91c2Upe1xuICBjb25zb2xlLmxvZyhpZClcbiAgY29uc29sZS5sb2coaG91c2UpXG4gIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHtcInVzZXJfaG91c2Vob2xkXCI6IGhvdXNlfSkpXG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOlwiUFVUXCIsXG4gICAgdXJsOidodHRwOi8vY2hvcmVjaGVja29mZi5jb20vaG91c2Vob2xkLycgKyBpZCxcbiAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XCJ1c2VyX2hvdXNlaG9sZFwiOiBob3VzZX0pXG4gIH0pXG59XG5cbnRoaXMudXBkYXRlemlwID0gZnVuY3Rpb24oaWQsemlwY29kZSl7XG4gIGNvbnNvbGUubG9nKGlkKTtcbiAgY29uc29sZS5sb2coemlwY29kZSk7XG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOlwiUFVUXCIsXG4gICAgdXJsOidodHRwOi8vY2hvcmVjaGVja29mZi5jb20vemlwLycgKyBpZCxcbiAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XCJ6aXBcIjogemlwY29kZX0pXG4gIH0pO1xufTtcblxudGhpcy5kZWxldGVDaGlsZCA9IGZ1bmN0aW9uKGlkKXtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6XCJERUxFVEVcIixcbiAgICB1cmw6J2h0dHA6Ly9jaG9yZWNoZWNrb2ZmLmNvbS9kZWxldGV1c2VyLycgKyBpZFxuICB9KTtcbn07XG5cbnRoaXMudXBkYXRlSW1hZ2UgPSBmdW5jdGlvbihpZCxpbWFnZSl7XG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOlwiUFVUXCIsXG4gICAgdXJsOidodHRwOi8vY2hvcmVjaGVja29mZi5jb20vaW1hZ2UvJyArIGlkLFxuICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcInVzZXJfaW1hZ2VcIjogaW1hZ2V9KVxuICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgcmV0dXJuIHJlcztcbiAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgIGNvbnNvbGUubG9nKGVycik7XG4gICB9KVxufTtcblxudGhpcy51cGRhdGVOYW1lID0gZnVuY3Rpb24oaWQsbmFtZSl7XG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOlwiUFVUXCIsXG4gICAgdXJsOidodHRwOi8vY2hvcmVjaGVja29mZi5jb20vZmlyc3RuYW1lLycgKyBpZCxcblxuICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcInVzZXJfZmlyc3RfbmFtZVwiOiBuYW1lfSlcbiAgfSk7XG59O1xuXG50aGlzLnVwZGF0ZUVtYWlsID0gZnVuY3Rpb24oaWQsIGVtYWlsKXtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6XCJQVVRcIixcbiAgICB1cmw6J2h0dHA6Ly9jaG9yZWNoZWNrb2ZmLmNvbS9lbWFpbC8nICsgaWQsXG4gICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1widXNlcl9lbWFpbFwiOiBlbWFpbH0pXG4gIH0pO1xufTtcblxudGhpcy51cGRhdGVQYXNzd29yZCA9IGZ1bmN0aW9uKGlkLCBwYXNzd29yZCl7XG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOlwiUFVUXCIsXG4gICAgdXJsOidodHRwOi8vY2hvcmVjaGVja29mZi5jb20vcGFzc3dvcmQvJyArIGlkLFxuICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcInBhc3N3b3JkXCI6IHBhc3N3b3JkfSlcbiAgfSk7XG59O1xuXG50aGlzLmNvbmZpcm1DaG9yZSA9IGZ1bmN0aW9uKGNob3JlSUQpe1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDpcIlBVVFwiLFxuICAgIHVybDonaHR0cDovL2Nob3JlY2hlY2tvZmYuY29tL2NvbXBsZXRlZC8nICsgY2hvcmVJRFxuICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgcmV0dXJuIHJlcztcbiAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgIGNvbnNvbGUubG9nKGVycik7XG4gICB9KVxufVxudGhpcy5kZW55Q2hvcmUgPSBmdW5jdGlvbihpZCl7XG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOlwiUFVUXCIsXG4gICAgdXJsOiAnaHR0cDovL2Nob3JlY2hlY2tvZmYuY29tL3BhcmVudENob3JlU3RhdHVzLycgKyBpZFxuICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgcmV0dXJuIHJlcztcbiAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgIGNvbnNvbGUubG9nKGVycik7XG4gICB9KVxufVxudGhpcy5yZW1vdmVDaG9yZSA9IGZ1bmN0aW9uKGlkKXtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgdXJsOidodHRwOi8vY2hvcmVjaGVja29mZi5jb20vYXNzaWduZWRjaG9yZS8nICsgaWRcbiAgfSkudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgIHJldHVybiByZXM7XG4gIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgfSlcbn1cbnRoaXMucmVkdWNlUG9pbnRzID0gZnVuY3Rpb24oaWQsIHBvaW50cyl7XG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgIHVybDogJ2h0dHA6Ly9jaG9yZWNoZWNrb2ZmLmNvbS9taW51c3BvaW50cy8nICsgaWQsXG4gICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1wicG9pbnRzXCI6IHBvaW50c30pXG4gIH0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICByZXR1cm4gcmVzO1xuICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgIH0pXG59XG50aGlzLmdldFBvaW50cyA9IGZ1bmN0aW9uKGlkKXtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6IFwiR2V0XCIsXG4gICAgdXJsOidodHRwOi8vY2hvcmVjaGVja29mZi5jb20vcG9pbnRzLycgKyBpZFxuICB9KS50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gICAgcmV0dXJuIHJlcy5kYXRhXG4gIH0pLmNhdGNoKGZ1bmN0aW9uKGVycil7XG4gICAgY29uc29sZS5sb2coZXJyICk7XG4gIH0pXG59XG5cbn0pOy8vZW5kIG9mIHNlcnZpY2VcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJhZGRDaGlsZEN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLHVzZXJTZXJ2aWNlLCRzdGF0ZSl7XG4gIC8vYmFja2J1dHRvblxuICAkc2NvcGUuZ29iYWNrID0gZnVuY3Rpb24oKXtcbiAgICB3aW5kb3cuaGlzdG9yeS5nbygtMSlcbiAgfVxudmFyIHVzZXIgPSB1c2VyU2VydmljZS5nZXRVc2VySW5mby5zdWI7XG5jb25zb2xlLmxvZyh1c2VyKTtcbiRzY29wZS5zdWJtaXRDaGlsZCA9IGZ1bmN0aW9uKGNoaWxkKXtcbiAgY2hpbGQudXNlcl9ob3VzZWhvbGQgPSB1c2VyLnVzZXJfaG91c2Vob2xkO1xuICBjb25zb2xlLmxvZyhjaGlsZCk7XG4gIHVzZXJTZXJ2aWNlLmFkZENoaWxkKGNoaWxkKVxuICAudGhlbihmdW5jdGlvbihyZXMpe1xuICAgICRzdGF0ZS5nbygnaG9tZScpO1xuICB9KTtcblxufVxuXG5cblxuXG5cbn0pIC8vZW5kIG9mIGNvbnRyb2xsZXJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJhc3NpZ25DaG9yZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLGNob3JlU2VydmljZSwkc3RhdGUsICR3aW5kb3cpe1xuXG52YXIgY3VycmVudFVzZXIgPSBjaG9yZVNlcnZpY2UuZ2V0VXNlckluZm8uc3ViO1xuXG5cbmNob3JlU2VydmljZS5nZXRDaGlsZHJlbihjdXJyZW50VXNlci51c2VyX2hvdXNlaG9sZClcbi50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gIC8vICRzY29wZS5jaG9yZXMgPSByZXMuZGF0YTtcbiAgJHNjb3BlLmNoaWxkcyA9IHJlcy5kYXRhO1xufSk7XG5cblxuJHNjb3BlLnZhbHVlcyA9IFtdO1xuXG4kc2NvcGUuY2hvcmUgPSB7XG5jaG9yZV9kYWlseTogZmFsc2UsXG5jaG9yZV93ZWVrbHk6IGZhbHNlLFxuY2hvcmVfbW9udGhseTpmYWxzZSxcblxufTtcblxuZnVuY3Rpb24gQ3JlYXRlQ2hvcmUobmFtZSxkZXNjcmlwdGlvbixob3VzZWhvbGQsdmFsdWUsZGFpbHksd2Vla2x5LG1vbnRobHksY2hpbGQpe1xuICB0aGlzLmNob3JlX25hbWUgPSBuYW1lO1xuICB0aGlzLmNob3JlX2Rlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gIHRoaXMudXNlcl9ob3VzZWhvbGRfZmsgPSBob3VzZWhvbGQ7XG4gIHRoaXMuY2hvcmVfdmFsdWUgPSB2YWx1ZTtcbiAgdGhpcy5jaG9yZV9kYWlseSA9IGRhaWx5O1xuICB0aGlzLmNob3JlX3dlZWtseSA9IHdlZWtseTtcbiAgdGhpcy5jaG9yZV9tb250aGx5ID0gbW9udGhseTtcbiAgdGhpcy51c2VyX2lkX2ZrID0gY2hpbGQ7XG59XG5cbnZhciBjaGlsZElkcyA9IFtdO1xudmFyIGNoaWxkcmVuQ2hvcmVzID0gW107XG4kc2NvcGUuY2hpbGRDaG9yZSA9IGZ1bmN0aW9uKGNob3JlKXtcbiAgdmFyIHNlbGVjdENoaWxkID0gdGhpcy5jaGlsZC51c2VyX2lkX3BrO1xuICBpZihjaGlsZElkcy5pbmRleE9mKHNlbGVjdENoaWxkKSAhPT0gLTEpe1xuICAgIHJldHVyblxuICB9XG4gIGVsc2V7XG4gIHZhciBjaGlsZENob3JlID0gbmV3IENyZWF0ZUNob3JlKGNob3JlLmNob3JlX25hbWUsY2hvcmUuY2hvcmVfZGVzY3JpcHRpb24sY3VycmVudFVzZXIudXNlcl9ob3VzZWhvbGQsY2hvcmUuY2hvcmVfdmFsdWUsY2hvcmUuY2hvcmVfZGFpbHksY2hvcmUuY2hvcmVfd2Vla2x5LGNob3JlLmNob3JlX21vbnRobHksc2VsZWN0Q2hpbGQpO1xuICBjaGlsZHJlbkNob3Jlcy5wdXNoKGNoaWxkQ2hvcmUpO1xuICBjaGlsZElkcy5wdXNoKHNlbGVjdENoaWxkKVxuIH1cbn07XG5cbiRzY29wZS5zdWJtaXRDaG9yZSA9IGZ1bmN0aW9uKCl7XG4gIGNoaWxkcmVuQ2hvcmVzLmZvckVhY2goZnVuY3Rpb24odmFsKXtcbiAgICBjaG9yZVNlcnZpY2UuY3JlYXRlQ2hvcmUodmFsKVxuICAgIC50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gICAgJHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxuICAgIH0pO1xuICB9XG5cbik7XG5jaGlsZHJlbkNob3JlcyA9IFtdO1xufTtcblxuJHNjb3BlLm1ha2VDaG9pY2UgPSBmdW5jdGlvbigpe1xuICB0aGlzLnNlbGVjdGVkID0ge1xuICAgICdib3JkZXInOiAnc29saWQgMnB4ICNmOWY5ZjknXG4gICAgfVxufVxuXG5cblxuXG5cbn0pOy8vZW5kIG9mIGNvbnRyb2xsZXJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoJ2NhbWVyYUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRjb3Jkb3ZhQ2FtZXJhKSB7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRldmljZXJlYWR5XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICRjb3Jkb3ZhUGx1Z2luLnNvbWVGdW5jdGlvbigpLnRoZW4oc3VjY2VzcywgZXJyb3IpO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIC8vIE9SIHdpdGggSU9OSUNcblxuICAgICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgJGNvcmRvdmFQbHVnaW4uc29tZUZ1bmN0aW9uKCkudGhlbihzdWNjZXNzLCBlcnJvcik7XG4gICAgfSk7XG5cbiAgJHNjb3BlLnRha2VQaWN0dXJlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICBxdWFsaXR5OiA1MCxcbiAgICAgIGRlc3RpbmF0aW9uVHlwZTogQ2FtZXJhLkRlc3RpbmF0aW9uVHlwZS5EQVRBX1VSTCxcbiAgICAgIHNvdXJjZVR5cGU6IENhbWVyYS5QaWN0dXJlU291cmNlVHlwZS5DQU1FUkEsXG4gICAgICBhbGxvd0VkaXQ6IGZhbHNlLFxuICAgICAgZW5jb2RpbmdUeXBlOiBDYW1lcmEuRW5jb2RpbmdUeXBlLkpQRUcsXG4gICAgICB0YXJnZXRXaWR0aDogMzAwLFxuICAgICAgdGFyZ2V0SGVpZ2h0OiAzMDAsXG4gICAgICBwb3BvdmVyT3B0aW9uczogQ2FtZXJhUG9wb3Zlck9wdGlvbnMsXG4gICAgICBzYXZlVG9QaG90b0FsYnVtOiBmYWxzZSxcblx0ICAgIGNvcnJlY3RPcmllbnRhdGlvbjp0cnVlXG4gICAgfTtcblxuICAgICRjb3Jkb3ZhQ2FtZXJhLmdldFBpY3R1cmUob3B0aW9ucykudGhlbihmdW5jdGlvbihpbWFnZURhdGEpIHtcbiAgICAgICRzY29wZS5pbWdVUkkgPSBcImRhdGE6aW1hZ2UvanBlZztiYXNlNjQsXCIgKyBpbWFnZURhdGE7XG4gICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAvLyBlcnJvclxuICAgIH0pO1xuXG4gIH07XG4gIH0sIGZhbHNlKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJjaGlsZEJhbmtDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGF1dGgsIHVzZXJTZXJ2aWNlKXtcbiAgdmFyIHVzZXJUb2tlbiA9ICRhdXRoLmdldFBheWxvYWQoKTtcbiAgIHVzZXJTZXJ2aWNlLmdldFVzZXJJbmZvID0gdXNlclRva2VuO1xuICAgJHNjb3BlLnVzZXIgPSB1c2VyVG9rZW4uc3ViO1xuICAgJHNjb3BlLnRoZW1lID0gJHNjb3BlLnVzZXIudXNlcl90aGVtZTtcblxuICAgJHNjb3BlLiRvbignJGlvbmljVmlldy5iZWZvcmVFbnRlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgdmFyIGdldFRoZW1lID0gZnVuY3Rpb24oKXtcbiAgICAgICAkc2NvcGUudGhlbWUgPSB1c2VyU2VydmljZS5yZXR1cm5UaGVtZSgpXG4gICAgIH1cbiAgICAgaWYodXNlclNlcnZpY2UucmV0dXJuVGhlbWUoKSl7XG4gICAgICAgZ2V0VGhlbWUoKVxuICAgICB9XG4gICAgICRzY29wZS5zZXRUaGVtZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAnYmFzZWJhbGwnKXtcbiAgICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL2ltZy1iYXNlYmFsbC10cmFucy5wbmcnXG4gICAgICAgfVxuICAgICAgIGlmKCRzY29wZS50aGVtZSA9PT0gJ2NoYXJsaWVCcm93bicpe1xuICAgICAgICAgJHNjb3BlLnRoZW1lSW1hZ2UgPSAnLi9pbWcvc25vb3B5LnBuZydcbiAgICAgICB9XG4gICAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAncHJpbmNlc3MnKXtcbiAgICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL0Nyb3duX1ByaW5jZXNzLnBuZydcbiAgICAgICB9XG4gICAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAnc3RhcldhcnMnKXtcbiAgICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL2RlYXRoLXN0YXItMm5kLWljb24ucG5nJ1xuICAgICAgIH1cbiAgICAgICBpZigkc2NvcGUudGhlbWUgPT09ICd3YXRlcicpe1xuICAgICAgICAgJHNjb3BlLnRoZW1lSW1hZ2UgPSAnLi9pbWcvVHJhbnNwYXJlbnRfV2F0ZXJfRHJvcF9QTkdfUGljdHVyZS5wbmcnXG4gICAgICAgfVxuICAgICB9XG4gICAgICRzY29wZS5zZXRUaGVtZSgpO1xuICB9KTtcblxuICB2YXIgZ2V0UG9pbnRzID0gZnVuY3Rpb24oKXtcbiAgICBpZCA9ICRzY29wZS51c2VyLnVzZXJfaWRfcGs7XG4gICAgdXNlclNlcnZpY2UuZ2V0UG9pbnRzKGlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICRzY29wZS5wb2ludFRvdGFsID0gcmVzcG9uc2VbMF0udXNlcl9wb2ludHNfdG90YWwgIFxuICAgIH0pXG4gIH1cbiAgZ2V0UG9pbnRzKClcblxuXG4gICB2YXIgZ2V0UmV3YXJkcyA9IGZ1bmN0aW9uKCl7XG4gICAgIGlkID0gJHNjb3BlLnVzZXIudXNlcl9pZF9waztcbiAgICAgdXNlclNlcnZpY2UuZ2V0UmV3YXJkcyhpZCkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgJHNjb3BlLnJld2FyZHMgPSByZXNwb25zZTtcbiAgICAgfSlcbiAgIH1cbiAgIGdldFJld2FyZHMoKTtcblxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImNoaWxkSG9tZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCwgJGF1dGgsIHVzZXJTZXJ2aWNlLCAkc3RhdGUpe1xuICAvLyAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tICBjaGlsZCBIb21lIGNvbnRyb2xsZXJcIlxuICAvL3ZhciB1c2VyVG9rZW4gPSB1c2VyU2VydmljZS5nZXRVc2VySW5mby5zdWI7XG4gJHNjb3BlLiRvbignJGlvbmljVmlldy5iZWZvcmVFbnRlcicsIGZ1bmN0aW9uICgpIHtcbiAgdmFyIHVzZXJUb2tlbiA9ICRhdXRoLmdldFBheWxvYWQoKTtcbiAgdXNlclNlcnZpY2UuZ2V0VXNlckluZm8gPSB1c2VyVG9rZW47XG4gICRzY29wZS51c2VyID0gdXNlclRva2VuLnN1YjtcbiAgaWYoJHNjb3BlLnVzZXIudXNlcl9hZG1pbil7XG4gICAgJHN0YXRlLmdvKCdsb2dpbicpXG4gIH1cblxuICAkc2NvcGUudGhlbWUgPSAkc2NvcGUudXNlci51c2VyX3RoZW1lXG4gICRzY29wZS5zZXRUaGVtZSA9IGZ1bmN0aW9uKGNob2ljZSl7XG4gICAgdmFyIGRhdGEgPSB7fVxuICAgIGRhdGEudGhlbWUgPSBjaG9pY2VcbiAgICBkYXRhLnVzZXJJZCA9ICRzY29wZS51c2VyLnVzZXJfaWRfcGs7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgdXNlclNlcnZpY2Uuc2V0VGhlbWUoZGF0YSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgaWYocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApe1xuICAgICAgJHNjb3BlLnRoZW1lID0gY2hvaWNlXG4gICAgICB9XG4gIH0pXG4gIH1cblxuXG4gIHZhciBnZXREYWlseUNob3JlcyA9IGZ1bmN0aW9uKCl7XG4gICAgaWQgPSAkc2NvcGUudXNlci51c2VyX2lkX3BrXG4gICAgdXNlclNlcnZpY2UuZ2V0RGFpbHlDaG9yZXMoaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgJHNjb3BlLmRhaWx5Q2hvcmVzID0gcmVzcG9uc2U7XG4gICAgfSlcbiAgfVxuICAgZ2V0RGFpbHlDaG9yZXMoKVxuICB2YXIgZ2V0V2Vla2x5Q2hvcmVzID0gZnVuY3Rpb24oKXtcbiAgICBpZCA9ICRzY29wZS51c2VyLnVzZXJfaWRfcGtcbiAgICB1c2VyU2VydmljZS5nZXRXZWVrbHlDaG9yZXMoaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgJHNjb3BlLndlZWtseUNob3JlcyA9IHJlc3BvbnNlO1xuICAgIH0pXG4gIH1cbiAgZ2V0V2Vla2x5Q2hvcmVzKClcbiAgdmFyIGdldE1vbnRobHlDaG9yZXMgPSBmdW5jdGlvbigpe1xuICAgIGlkID0gJHNjb3BlLnVzZXIudXNlcl9pZF9wa1xuICAgIHVzZXJTZXJ2aWNlLmdldE1vbnRobHlDaG9yZXMoaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgJHNjb3BlLm1vbnRobHlDaG9yZXMgPSByZXNwb25zZTtcbiAgICB9KVxuICB9XG4gIGdldE1vbnRobHlDaG9yZXMoKVxuXG5cbn0pXG5cbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCd0aGVtZU1vZGFsLmh0bWwnLCB7XG4gICAgIGlkOiAnMScsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsMSA9IG1vZGFsO1xuICAgfSk7XG5cbiAgIC8vIE1vZGFsIDJcbiAgLy8gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgndGFrZVBpY3R1cmVNb2RhbC5odG1sJywge1xuICAvLyAgICBpZDogJzInLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgLy8gICAgc2NvcGU6ICRzY29wZSxcbiAgLy8gICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAvLyAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgLy8gIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgLy8gICAgJHNjb3BlLm9Nb2RhbDIgPSBtb2RhbDtcbiAgLy8gIH0pO1xuICAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgIGlmIChpbmRleCA9PSAxKSAkc2NvcGUub01vZGFsMS5zaG93KCk7XG4gICAgIGVsc2UgJHNjb3BlLm9Nb2RhbDIuc2hvdygpO1xuICAgfTtcblxuICAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICBpZiAoaW5kZXggPT0gMSkgJHNjb3BlLm9Nb2RhbDEuaGlkZSgpO1xuICAgICBlbHNlICRzY29wZS5vTW9kYWwyLmhpZGUoKTtcbiAgIH07XG5cbiAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICRzY29wZS5vTW9kYWwxLnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsMi5yZW1vdmUoKTtcblxuICAgfSk7XG5cblxuICAkc2NvcGUucmV2ZWFsZXIgPSBmdW5jdGlvbigpe1xuICAgdGhpcy5oaWRlID0gIXRoaXMuaGlkZTtcbiAgfVxuXG4gICRzY29wZS5jaGVja09mZmNob3JlID0gZnVuY3Rpb24oaWQpe1xuICAgIGNvbnNvbGUubG9nKGlkKTtcbiAgICB1c2VyU2VydmljZS5jaGVja09mZmNob3JlKGlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICB9KVxuICAgfVxuXG4gICAkc2NvcGUubG9nb3V0ID0gZnVuY3Rpb24oKXtcbiAgICAgJGF1dGgubG9nb3V0KClcbiAgICAgJHN0YXRlLmdvKCdsb2dpbicpXG4gICB9XG5cbn0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImNoaWxkTG9naW5DdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGF1dGgsICRzdGF0ZSwgbG9naW5TZXJ2aWNlKXtcbiAgLy8gICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gY2hpbGQgTG9naW4gY29udHJvbGxlclwiXG5cbiAgICRzY29wZS5sb2dpbkNoaWxkID0gZnVuY3Rpb24odXNlcil7XG4gICAgIGNvbnNvbGUubG9nKHVzZXIpXG4gICAgIGxvZ2luU2VydmljZS51c2VyTG9naW4odXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgJGF1dGguc2V0VG9rZW4ocmVzcG9uc2UpXG4gICAgICAgICAkc3RhdGUuZ28oJ2NoaWxkSG9tZScpXG5cbiAgICAgfSlcbiAgIH1cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiZWRpdENoaWxkQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsdXNlclNlcnZpY2UsJHN0YXRlLCRhdXRoKXtcbiAgLy9iYWNrYnV0dG9uXG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKTtcbiAgfTtcblxuICB2YXIgZ2V0Q2hpbGQgPSBmdW5jdGlvbigpe1xuICAgIHVzZXJTZXJ2aWNlLmdldENoaWxkKCRzdGF0ZS5wYXJhbXMuaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgJHNjb3BlLmNoaWxkID0gcmVzcG9uc2VbMF1cbiAgICB9KVxuICB9XG4gIGdldENoaWxkKClcblxuICAkc2NvcGUuY2hpbGRTdWJtaXRJbWFnZSA9IGZ1bmN0aW9uKGltYWdlKXtcbiAgICB1c2VyU2VydmljZS51cGRhdGVJbWFnZSgkc2NvcGUuY2hpbGQudXNlcl9pZF9wayxpbWFnZSlcbiAgICAudGhlbihmdW5jdGlvbihyZXMpe1xuICAgICAgaWYocmVzLnN0YXR1cyA9PT0gMjAwKXtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoaWxkLXNldHRpbmctaW1hZ2VcIikudmFsdWUgPSAnJztcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICAkc2NvcGUuY2hpbGRTdWJtaXROYW1lID0gZnVuY3Rpb24obmFtZSl7XG4gICAgdXNlclNlcnZpY2UudXBkYXRlTmFtZSgkc2NvcGUuY2hpbGQudXNlcl9pZF9wayxuYW1lKVxuICAgIC50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gICAgICBpZihyZXMuc3RhdHVzID09PSAyMDApe1xuICAgICAgICBnZXRDaGlsZCgpXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hpbGQtc2V0dGluZy1uYW1lXCIpLnZhbHVlID0gJyc7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgJHNjb3BlLmNoaWxkU3VibWl0RW1haWwgPSBmdW5jdGlvbihlbWFpbCl7XG4gICAgdXNlclNlcnZpY2UudXBkYXRlRW1haWwoJHNjb3BlLmNoaWxkLnVzZXJfaWRfcGssZW1haWwpXG4gICAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hpbGQtc2V0dGluZy1lbWFpbFwiKS52YWx1ZSA9ICcnO1xuICAgIH0pO1xuICB9O1xuXG4gICRzY29wZS5jaGlsZFN1Ym1pdFBhc3N3b3JkID0gZnVuY3Rpb24ocGFzc3dvcmQpe1xuICAgIGNvbnNvbGUubG9nKCRzY29wZS5jaGlsZC51c2VyX2lkX3BrKTtcbiAgICB1c2VyU2VydmljZS51cGRhdGVQYXNzd29yZCgkc2NvcGUuY2hpbGQudXNlcl9pZF9waywgcGFzc3dvcmQpXG4gICAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoaWxkLXNldHRpbmctcGFzc3dvcmRcIikudmFsdWUgPSAnJztcbiAgICB9KTtcbiAgfTtcblxuXG5cblxuXG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJoaXN0b3J5Q3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBIaXN0b3J5IGNvbnRyb2xsZXJcIlxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImhvbWVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwsdXNlclNlcnZpY2UsJHdpbmRvdywgJGF1dGgsICRzdGF0ZSl7XG5cbiAgICB2YXIgdXNlclRva2VuID0gJGF1dGguZ2V0UGF5bG9hZCgpO1xuICAgIHVzZXJTZXJ2aWNlLmdldFVzZXJJbmZvID0gdXNlclRva2VuO1xuICAgICRzY29wZS51c2VyID0gdXNlclRva2VuLnN1YjtcbiAgICBpZighJHNjb3BlLnVzZXIudXNlcl9hZG1pbil7XG4gICAgICAkc3RhdGUuZ28oJ2NoaWxkTG9naW4nKVxuICAgIH1cbiAgICAkc2NvcGUuYmFubmVyID0gJHNjb3BlLnVzZXJfYmFubmVyX2ltYWdlO1xuICAgICRzY29wZS5ob3VzZWhvbGQgPSAgJHNjb3BlLnVzZXIudXNlcl9ob3VzZWhvbGQ7XG4gICAgdXNlclNlcnZpY2UuZ2V0YmFubmVyKCRzY29wZS51c2VyLnVzZXJfaWRfcGspLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgJHNjb3BlLmJhbm5lciA9IHJlc1swXS51c2VyX2Jhbm5lcl9pbWFnZTtcbiAgICB9KTtcblxuICAgIHVzZXJTZXJ2aWNlLmdldFdlYXRoZXIoJHNjb3BlLnVzZXIuemlwKVxuICAgIC50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gICAgICAkc2NvcGUud2VhdGhlciA9IHJlcy5kYXRhO1xuICAgIH0pXG5cbiAgICB1c2VyU2VydmljZS5zaG93Y2hpbGQoJHNjb3BlLnVzZXIudXNlcl9ob3VzZWhvbGQpXG4gICAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAgICRzY29wZS5zaG93Y2hpbGQgPSByZXMuZGF0YTtcbiAgICB9KVxuXG5cblxuXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2Jhbm5lck1vZGFsLmh0bWwnLCB7XG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUubW9kYWwgPSBtb2RhbDtcbiAgIH0pO1xuICAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICAkc2NvcGUubW9kYWwuc2hvdygpO1xuICAgfTtcbiAgICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWwtYm94XCIpLnZhbHVlID0gJyc7XG4gICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gICB9O1xuICAgLy8gQ2xlYW51cCB0aGUgbW9kYWwgd2hlbiB3ZSdyZSBkb25lIHdpdGggaXQhXG4gICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAkc2NvcGUubW9kYWwucmVtb3ZlKCk7XG4gICB9KTtcbiAgIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIGhpZGUgbW9kYWxcbiAgICRzY29wZS4kb24oJ21vZGFsLmhpZGRlbicsIGZ1bmN0aW9uKCkge1xuICAgICAvLyBFeGVjdXRlIGFjdGlvblxuICAgfSk7XG4gICAvLyBFeGVjdXRlIGFjdGlvbiBvbiByZW1vdmUgbW9kYWxcbiAgICRzY29wZS4kb24oJ21vZGFsLnJlbW92ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgIH0pO1xuXG5cbiAgICRzY29wZS5zdWJtaXRCYW5uZXIgPSBmdW5jdGlvbihiYW5uZXIpe1xuICAgICB2YXIgYmFubmVySW5mbyA9IHtcbiAgICAgICB1c2VyX2hvdXNlaG9sZDokc2NvcGUudXNlci51c2VyX2hvdXNlaG9sZCxcbiAgICAgICB1c2VyX2Jhbm5lcl9pbWFnZTpiYW5uZXJcbiAgICAgfVxuICAgICAgdXNlclNlcnZpY2UucG9zdGJhbm5lcihiYW5uZXJJbmZvKVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgaWYgKHJlcy5zdGF0dXMgPT09IDIwMCl7XG4gICAgICAgICAgJHNjb3BlLmNsb3NlTW9kYWwoKVxuICAgICAgICAgICRzY29wZS5iYW5uZXI9IGJhbm5lclxuICAgICAgICB9XG4gICAgIH0pO1xuICAgfTtcblxuXG5cbiRzY29wZS5sb2dvdXQgPSBmdW5jdGlvbigpe1xuICAkYXV0aC5sb2dvdXQoKVxuICAkc3RhdGUuZ28oJ2xvZ2luJylcbn1cblxufSkvL2VuZCBvZiBjb250cm9sbGVyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwibG9naW5DdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGF1dGgsICRzdGF0ZSwgbG9naW5TZXJ2aWNlKXtcblxuJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24odXNlcil7XG4gIC8vIGNvbnNvbGUubG9nKHVzZXIpXG4gIGxvZ2luU2VydmljZS51c2VyTG9naW4odXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgaWYocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApe1xuICAgICAgJGF1dGguc2V0VG9rZW4ocmVzcG9uc2UpXG4gICAgICAgICRzdGF0ZS5nbygnaG9tZScpXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICBhbGVydCgnRW1haWwgb3IgcGFzc3dvcmQgaW5jb3JyZWN0JylcbiAgICB9XG5cbiAgfSlcbn1cblxuJHNjb3BlLm1ha2VVc2VyID0gZnVuY3Rpb24obmV3VXNlcil7XG4gIGxvZ2luU2VydmljZS5tYWtlVXNlcihuZXdVc2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAkYXV0aC5zZXRUb2tlbihyZXNwb25zZSlcbiAgICBhbGVydChcIm5ldyB1c2VyIGNyZWF0ZWRcIilcbiAgfSlcbn1cbiAgJHNjb3BlLmF1dGhlbnRpY2F0ZSA9IGZ1bmN0aW9uKHByb3ZpZGVyKSB7XG4gICRhdXRoLmF1dGhlbnRpY2F0ZShwcm92aWRlcil9O1xuICAvLyAkc2NvcGUudGVzdCA9IFwiSGVsbG8gZnJvbSBsb2dpbiBjb250cm9sbGVyXCJcblxuXG4gICRzY29wZS5yZXZlYWxlciA9IGZ1bmN0aW9uKCl7XG4gICRzY29wZS5oaWRlID0gISRzY29wZS5oaWRlO1xuIH1cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJtYWtlQ2hvcmVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxuICB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwic2V0UmV3YXJkc0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCwgJHN0YXRlLCB1c2VyU2VydmljZSwgJGF1dGgpe1xuICB2YXIgdXNlclRva2VuID0gJGF1dGguZ2V0UGF5bG9hZCgpO1xuICB1c2VyU2VydmljZS5nZXRVc2VySW5mbyA9IHVzZXJUb2tlbjtcbiAgJHNjb3BlLnVzZXIgPSB1c2VyVG9rZW4uc3ViO1xuICBjb25zb2xlLmxvZygkc2NvcGUudXNlcik7XG5cbiAgdmFyIGdldENoaWxkID0gZnVuY3Rpb24oKXtcbiAgICB1c2VyU2VydmljZS5nZXRDaGlsZCgkc3RhdGUucGFyYW1zLmlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICRzY29wZS5jaGlsZCA9IHJlc3BvbnNlWzBdXG4gICAgICBjb25zb2xlLmxvZygkc2NvcGUuY2hpbGQpO1xuICAgIH0pXG4gIH1cbiAgZ2V0Q2hpbGQoKVxuICB2YXIgZ2V0UmV3YXJkcyA9IGZ1bmN0aW9uKCl7XG4gICAgdXNlclNlcnZpY2UuZ2V0UmV3YXJkcygkc3RhdGUucGFyYW1zLmlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICRzY29wZS5yZXdhcmRzID0gcmVzcG9uc2U7XG4gICAgfSlcbiAgfVxuICBnZXRSZXdhcmRzKClcblxuICAkc2NvcGUucmVtb3ZlUmV3YXJkID0gZnVuY3Rpb24oaWQsaSl7XG4gICAgcmV3YXJkID0ge31cbiAgICB1c2VySWQgPSAkc3RhdGUucGFyYW1zLmlkO1xuICAgIHJld2FyZElkID0gaWQ7XG4gICAgdXNlclNlcnZpY2UucmVtb3ZlUmV3YXJkKHVzZXJJZCwgcmV3YXJkSWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApe1xuICAgICAgICAgICAgJHNjb3BlLnJld2FyZHMuc3BsaWNlKGksIDEpXG4gICAgICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAgJHNjb3BlLm1ha2VSZXdhcmQgPSBmdW5jdGlvbihuZXdSZXdhcmQpe1xuICAgICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZ2dsZWNoZWNrYm94XCIpLmNoZWNrZWQpe1xuICAgICAgIG5ld1Jld2FyZC51c2VyX2lkX2ZrID0gJHN0YXRlLnBhcmFtcy5pZDtcbiAgICAgICBuZXdSZXdhcmQudXNlcl9ob3VzZWhvbGRfZmsgPSAkc2NvcGUuY2hpbGQudXNlcl9ob3VzZWhvbGQ7XG4gICAgICAgdXNlclNlcnZpY2UubWFrZVJld2FyZChuZXdSZXdhcmQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApe1xuICAgICAgICAgICBnZXRSZXdhcmRzKClcbiAgICAgICAgICAgJHNjb3BlLmNsb3NlTW9kYWwoKVxuICAgICAgICAgfVxuICAgICAgIH0pXG4gICAgIH1cbiAgICAgZWxzZXtcbiAgICAgICB1c2VyU2VydmljZS5zaG93Y2hpbGQoJHNjb3BlLnVzZXIudXNlcl9ob3VzZWhvbGQpXG4gICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgIHZhciBjaGlsZHJlbiA9IFtdXG4gICAgICAgICBmb3IgKHZhciBpID0wOyBpIDwgcmVzLmRhdGEubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICBjaGlsZHJlbi5wdXNoKHJlcy5kYXRhW2ldLnVzZXJfaWRfcGspXG4gICAgICAgICB9XG4gICAgICAgICBjb25zb2xlLmxvZyhjaGlsZHJlbik7XG4gICAgICAgICB2YXIgY2FsbHM9W11cbiAgICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBjaGlsZHJlbi5sZW5ndGg7IGorKyl7XG5cbiAgICAgICAgICAgIGNhbGxzLnB1c2gob3V0ZXIoY2hpbGRyZW5bal0pKTtcbiAgICAgICAgIH1cbiAgICAgICAgIGNhbGxzLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCl7XG4gICAgICAgICAgICAgICBlbGVtZW50KClcbiAgICAgICAgICAgICB9KVxuICAgICAgIH0pXG4gICAgICAgZnVuY3Rpb24gb3V0ZXIoY2hpbGQpe1xuICAgICAgICAgY29uc29sZS5sb2coY2hpbGQpO1xuICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBpbm5lcigpe1xuICAgICAgICAgICAgICAgdmFyIHJld2FyZCA9IHt9O1xuICAgICAgICAgICAgICAgcmV3YXJkLnVzZXJfaWRfZmsgPSBjaGlsZDtcbiAgICAgICAgICAgICAgIHJld2FyZC51c2VyX2hvdXNlaG9sZF9mayA9ICRzY29wZS5jaGlsZC51c2VyX2hvdXNlaG9sZDtcbiAgICAgICAgICAgICAgIHJld2FyZC5yZXdhcmRfZGVzY3JpcHRpb24gPSBuZXdSZXdhcmQucmV3YXJkX2Rlc2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgcmV3YXJkLnJld2FyZF90b3RhbCA9IG5ld1Jld2FyZC5yZXdhcmRfdG90YWxcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJld2FyZCk7XG4gICAgICAgICAgICAgICAgdXNlclNlcnZpY2UubWFrZVJld2FyZChyZXdhcmQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5zdGF0dXMgPT09IDIwMCl7XG4gICAgICAgICAgICAgICAgICAgJHNjb3BlLmNsb3NlTW9kYWwoKVxuICAgICAgICAgICAgICAgICAgIGdldFJld2FyZHMoKVxuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgfVxuICAgICB9XG5cbiAgIH1cblxuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3Jld2FyZE1vZGFsLmh0bWwnLCB7XG4gICAgc2NvcGU6ICRzY29wZSxcbiAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICRzY29wZS5tb2RhbCA9IG1vZGFsO1xuICB9KTtcbiAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5zaG93KCk7XG4gIH07XG4gICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcbiAgfTtcbiAgLy8gQ2xlYW51cCB0aGUgbW9kYWwgd2hlbiB3ZSdyZSBkb25lIHdpdGggaXQhXG4gICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuICB9KTtcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gaGlkZSBtb2RhbFxuICAkc2NvcGUuJG9uKCdtb2RhbC5oaWRkZW4nLCBmdW5jdGlvbigpIHtcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxuICB9KTtcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gcmVtb3ZlIG1vZGFsXG4gICRzY29wZS4kb24oJ21vZGFsLnJlbW92ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxuICB9KTtcbiAgLy9iYWNrYnV0dG9uXG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxuICB9XG5cblxuXG59KVxuIiwiXG5hbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwic2V0dGluZ3NDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwsIHVzZXJTZXJ2aWNlLGxvZ2luU2VydmljZSwkYXV0aCwkc3RhdGUpe1xuXG4gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnY2hhbmdlUGFzc3dvcmQuaHRtbCcsIHtcbiAgICAgaWQ6ICcxJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWwxID0gbW9kYWw7XG4gICB9KTtcblxuICAgLy8gTW9kYWwgMlxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdjaGFuZ2VIb3VzZWhvbGQuaHRtbCcsIHtcbiAgICAgaWQ6ICcyJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWwyID0gbW9kYWw7XG4gICB9KTtcblxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdjaGFuZ2VaaXAuaHRtbCcsIHtcbiAgICAgaWQ6ICczJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWwzID0gbW9kYWw7XG4gICB9KTtcblxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdhZGRQYXJlbnQuaHRtbCcsIHtcbiAgICAgaWQ6ICc0JywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWw0ID0gbW9kYWw7XG4gICB9KTtcblxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdyZW1vdmVDaGlsZC5odG1sJywge1xuICAgICBpZDogJzUnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDUgPSBtb2RhbDtcbiAgIH0pO1xuXG5cblxuICAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgIGlmIChpbmRleCA9PSAxKSAkc2NvcGUub01vZGFsMS5zaG93KCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMikgJHNjb3BlLm9Nb2RhbDIuc2hvdygpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDMpICRzY29wZS5vTW9kYWwzLnNob3coKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSA0KSAkc2NvcGUub01vZGFsNC5zaG93KCk7XG4gICAgIGVsc2UgJHNjb3BlLm9Nb2RhbDUuc2hvdygpO1xuICAgfTtcblxuICAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICBpZiAoaW5kZXggPT0gMSkgJHNjb3BlLm9Nb2RhbDEuaGlkZSgpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDIpICRzY29wZS5vTW9kYWwyLmhpZGUoKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSAzKSAkc2NvcGUub01vZGFsMy5oaWRlKCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gNCkgJHNjb3BlLm9Nb2RhbDQuaGlkZSgpO1xuICAgICBlbHNlICRzY29wZS5vTW9kYWw1LmhpZGUoKTtcbiAgIH07XG5cbiAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICRzY29wZS5vTW9kYWwxLnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsMi5yZW1vdmUoKTtcbiAgICAgJHNjb3BlLm9Nb2RhbDMucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWw0LnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsNS5yZW1vdmUoKTtcbiAgIH0pO1xuXG52YXIgdXNlckluZm8gPSAkYXV0aC5nZXRQYXlsb2FkKCkuc3ViO1xuXG5jb25zb2xlLmxvZyh1c2VySW5mbyk7XG5cblxuJHNjb3BlLnN1Ym1pdFBhc3N3b3JkID0gZnVuY3Rpb24odXNlcil7XG4gIGNvbnNvbGUubG9nKHVzZXJJbmZvLnVzZXJfaWRfcGspO1xuICB1c2VyU2VydmljZS51cGRhdGVQYXNzd29yZCh1c2VySW5mby51c2VyX2lkX3BrLHVzZXIudXNlcl9uZXdfcGFzc3dvcmQpXG4gIC50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gICAgJHNjb3BlLmNsb3NlTW9kYWwoMSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvbGQtcGFzc3dvcmRcIikudmFsdWUgPSAnJztcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctcGFzc3dvcmRcIikudmFsdWUgPSAnJztcbiAgfSk7XG5cbn07XG5cbiRzY29wZS5zdWJtaXRIb3VzZWhvbGQgPSBmdW5jdGlvbihob3VzZSl7XG4gIHVzZXJTZXJ2aWNlLnVwZGF0ZUhvdXNlaG9sZCh1c2VySW5mby51c2VyX2hvdXNlaG9sZCxob3VzZSlcbiAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgJHNjb3BlLmNsb3NlTW9kYWwoMik7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1cGRhdGUtaG91c2Vob2xkXCIpLnZhbHVlID0nJztcbiAgfSk7XG59O1xuXG4kc2NvcGUuc3VibWl0WmlwQ29kZSA9IGZ1bmN0aW9uKHppcGNvZGUpe1xuICB1c2VyU2VydmljZS51cGRhdGV6aXAodXNlckluZm8udXNlcl9ob3VzZWhvbGQsemlwY29kZSlcbiAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAkc2NvcGUuY2xvc2VNb2RhbCgzKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVwZGF0ZS16aXBcIikudmFsdWUgPScnO1xuXG4gIH0pO1xufTtcblxuJHNjb3BlLmNyZWF0ZVBhcmVudCA9IGZ1bmN0aW9uKHVzZXIpe1xuICB1c2VyLnppcGNvZGUgPSB1c2VySW5mby56aXA7XG4gIHVzZXIuaG91c2Vob2xkID0gdXNlckluZm8udXNlcl9ob3VzZWhvbGQ7XG4gIGxvZ2luU2VydmljZS5tYWtlVXNlcih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAkYXV0aC5zZXRUb2tlbihyZXNwb25zZSk7XG4gICAgICAkc2NvcGUuY2xvc2VNb2RhbCg0KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2V0dGluZy1wYXJlbnQtZmlyc3RcIikudmFsdWUgPScnO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZXR0aW5nLXBhcmVudC1sYXN0XCIpLnZhbHVlID0nJztcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2V0dGluZy1lbWFpbFwiKS52YWx1ZSA9Jyc7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNldHRpbmctcGFzc3dvcmRcIikudmFsdWUgPScnO1xuXG4gIH0pO1xufTtcblxuJHNjb3BlLmdldENoaWxkID0gZnVuY3Rpb24oKXtcbiAgY29uc29sZS5sb2coJ2ZpcmVkJyk7XG51c2VyU2VydmljZS5zaG93Y2hpbGQodXNlckluZm8udXNlcl9ob3VzZWhvbGQpXG4udGhlbihmdW5jdGlvbihyZXMpe1xuICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4gICRzY29wZS5zaG93Y2hpbGQgPSByZXMuZGF0YTtcbn0pO1xufTtcbnZhciByZW1vdmVDaGlsZCA9IFtdO1xuXG4kc2NvcGUubG9nZ2VyPSBmdW5jdGlvbihpbmRleCl7XG4gICRzY29wZS5zaG93Y2hpbGRbaW5kZXhdLnNlbGVjdGVkID0gISRzY29wZS5zaG93Y2hpbGRbaW5kZXhdLnNlbGVjdGVkO1xuICAkc2NvcGUucmVtb3ZlQ2hpbGQoaW5kZXgpO1xuICBjb25zb2xlLmxvZyhpbmRleCk7XG59XG5cbiRzY29wZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uKGluZGV4KXtcbiRzY29wZS5zaG93Y2hpbGRbaW5kZXhdLnNlbGVjdGVkID0gISRzY29wZS5zaG93Y2hpbGRbaW5kZXhdLnNlbGVjdGVkO1xuICB2YXIgc2VsZWN0ZWRDaGlsZCA9ICRzY29wZS5zaG93Y2hpbGRbaW5kZXhdLnVzZXJfaWRfcGs7XG4gIGlmKCRzY29wZS5zaG93Y2hpbGRbaW5kZXhdLnNlbGVjdGVkKXtcbiAgICAgIHJlbW92ZUNoaWxkLnB1c2goc2VsZWN0ZWRDaGlsZCk7XG4gIH1lbHNle1xuICAgIHZhciBpID0gcmVtb3ZlQ2hpbGQuaW5kZXhPZihzZWxlY3RlZENoaWxkKTtcbiAgICByZW1vdmVDaGlsZC5zcGxpY2UoaSwxKTtcbiAgfVxufVxuXG4kc2NvcGUuZGVsZXRlQ2hpbGQgPSBmdW5jdGlvbigpe1xuICBjb25zb2xlLmxvZyhyZW1vdmVDaGlsZCk7XG4gIHJlbW92ZUNoaWxkLmZvckVhY2goZnVuY3Rpb24odmFsKXtcbiAgICB1c2VyU2VydmljZS5kZWxldGVDaGlsZCh2YWwpXG4gICAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcblxuICAgIH0pO1xuICB9XG4pXG5yZW1vdmVDaGlsZCA9IFtdO1xuJHNjb3BlLmNsb3NlTW9kYWwoNSk7XG59XG5cbiRzY29wZS5sb2dvdXQgPSBmdW5jdGlvbigpe1xuICAkYXV0aC5sb2dvdXQoKVxuICAkc3RhdGUuZ28oJ2xvZ2luJylcbn1cblxufSk7IC8vIGVuZCBvZiBjb250cm9sbGVyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwidHJhY2tlckN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCwgJHN0YXRlLCB1c2VyU2VydmljZSl7XG4gICAgdmFyIGdldENoaWxkID0gZnVuY3Rpb24oKXtcbiAgICAgIHVzZXJTZXJ2aWNlLmdldENoaWxkKCRzdGF0ZS5wYXJhbXMuaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICAkc2NvcGUuY2hpbGQgPSByZXNwb25zZVswXVxuICAgICAgfSlcbiAgICB9XG4gICAgZ2V0Q2hpbGQoKVxuXG4gICAgXG4gICAgICB1c2VyU2VydmljZS5nZXREYWlseUNob3Jlcygkc3RhdGUucGFyYW1zLmlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgJHNjb3BlLmRhaWx5Q2hvcmVzID0gcmVzcG9uc2U7XG4gICAgICB9KTtcblxuICAgICAgdXNlclNlcnZpY2UuZ2V0V2Vla2x5Q2hvcmVzKCRzdGF0ZS5wYXJhbXMuaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICAkc2NvcGUud2Vla2x5Q2hvcmVzID0gcmVzcG9uc2U7XG4gICAgICB9KTtcblxuICAgICAgdXNlclNlcnZpY2UuZ2V0TW9udGhseUNob3Jlcygkc3RhdGUucGFyYW1zLmlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgJHNjb3BlLm1vbnRobHlDaG9yZXMgPSByZXNwb25zZTtcbiAgICAgIH0pO1xuXG4gICAgICAkc2NvcGUuY29uZmlybUNob3JlID0gZnVuY3Rpb24oY2hvcmVJRCwgaW5kZXgsIHNjb3BlKXtcbiAgICAgICAgIHVzZXJTZXJ2aWNlLmNvbmZpcm1DaG9yZShjaG9yZUlEKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgICBpZihyZXNwb25zZS5zdGF0dXMgPT09IDIwMCl7XG4gICAgICAgICAgICAgICAgaWYoc2NvcGUuY2hvcmVfZGFpbHkpe1xuICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhaWx5Q2hvcmVzLnNwbGljZShpbmRleCwgMSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoc2NvcGUuY2hvcmVfd2Vla2x5KXtcbiAgICAgICAgICAgICAgICAgICRzY29wZS53ZWVrbHlDaG9yZXMuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihzY29wZS5jaG9yZV9tb250aGx5KXtcbiAgICAgICAgICAgICAgICAgICRzY29wZS5tb250aGx5Q2hvcmVzLnNwbGljZShpbmRleCwgMSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgJHNjb3BlLmRlbnlDaG9yZSA9IGZ1bmN0aW9uKGNob3JlSUQsIGluZGV4LCBzY29wZSl7XG4gICAgICAgIHVzZXJTZXJ2aWNlLmRlbnlDaG9yZShjaG9yZUlEKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKXtcbiAgICAgICAgICAgICAgIGlmKHNjb3BlLmNob3JlX2RhaWx5KXtcbiAgICAgICAgICAgICAgICAgJHNjb3BlLmRhaWx5Q2hvcmVzW2luZGV4XS5jaG9yZV9zdGF0dXMgPSBmYWxzZVxuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgaWYoc2NvcGUuY2hvcmVfd2Vla2x5KXtcbiAgICAgICAgICAgICAgICAgJHNjb3BlLndlZWtseUNob3Jlc1tpbmRleF0uY2hvcmVfc3RhdHVzID0gZmFsc2VcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIGlmKHNjb3BlLmNob3JlX21vbnRobHkpe1xuICAgICAgICAgICAgICAgICAkc2NvcGUubW9udGhseUNob3Jlc1tpbmRleF0uY2hvcmVfc3RhdHVzID0gZmFsc2VcbiAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICAkc2NvcGUucmVtb3ZlQ2hvcmUgPSBmdW5jdGlvbihjaG9yZUlELCBpbmRleCwgc2NvcGUpe1xuICAgICAgICB1c2VyU2VydmljZS5yZW1vdmVDaG9yZShjaG9yZUlEKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKXtcbiAgICAgICAgICAgICAgIGlmKHNjb3BlLmNob3JlX2RhaWx5KXtcbiAgICAgICAgICAgICAgICAgJHNjb3BlLmRhaWx5Q2hvcmVzLnNwbGljZShpbmRleCwgMSlcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIGlmKHNjb3BlLmNob3JlX3dlZWtseSl7XG4gICAgICAgICAgICAgICAgICRzY29wZS53ZWVrbHlDaG9yZXMuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgaWYoc2NvcGUuY2hvcmVfbW9udGhseSl7XG4gICAgICAgICAgICAgICAgICRzY29wZS5tb250aGx5Q2hvcmVzLnNwbGljZShpbmRleCwgMSlcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgJHNjb3BlLnJlZHVjZVBvaW50cyA9IGZ1bmN0aW9uKHBvaW50cyl7XG4gICAgICAgIHZhciBpZCA9ICRzY29wZS5jaGlsZC51c2VyX2lkX3BrXG4gICAgICAgIHVzZXJTZXJ2aWNlLnJlZHVjZVBvaW50cyhpZCwgcG9pbnRzKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgICBjb25zb2xlLmxvZygndXBkYXRlZCcpO1xuICAgICAgICB9KVxuICAgICAgfVxuXG5cbiAgICB9KTsvL2VuZCBvZiBjb250b2xsZXJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJ1c2VySW5mb0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gaW5mbyBjb250cm9sbGVyXCJcblxufSlcbiJdfQ==
