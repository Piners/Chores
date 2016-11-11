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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXJzL2FkZENoaWxkQ3RybC5qcyIsImNvbnRyb2xsZXJzL2Fzc2lnbkNob3JlQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NhbWVyYUN0cmwuanMiLCJjb250cm9sbGVycy9jaGlsZEJhbmtDdHJsLmpzIiwiY29udHJvbGxlcnMvY2hpbGRIb21lQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NoaWxkTG9naW5DdHJsLmpzIiwiY29udHJvbGxlcnMvZWRpdENoaWxkQ3RybC5qcyIsImNvbnRyb2xsZXJzL2hpc3RvcnlDdHJsLmpzIiwiY29udHJvbGxlcnMvaG9tZUN0cmwuanMiLCJjb250cm9sbGVycy9sb2dpbkN0cmwuanMiLCJjb250cm9sbGVycy9tYWtlQ2hvcmVDdHJsLmpzIiwiY29udHJvbGxlcnMvc2V0UmV3YXJkc0N0cmwuanMiLCJjb250cm9sbGVycy9zZXR0aW5nc0N0cmwuanMiLCJjb250cm9sbGVycy90cmFja2VyQ3RybC5qcyIsImNvbnRyb2xsZXJzL3VzZXJJbmZvQ3RybC5qcyIsInNlcnZpY2UvY2hvcmVTZXJ2aWNlLmpzIiwic2VydmljZS9sb2dpblNlcnZpY2UuanMiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsImNvbmZpZyIsIiRzdGF0ZVByb3ZpZGVyIiwiJHVybFJvdXRlclByb3ZpZGVyIiwiJGF1dGhQcm92aWRlciIsIm90aGVyd2lzZSIsInN0YXRlIiwidXJsIiwidGVtcGxhdGVVcmwiLCJjb250cm9sbGVyIiwiY2FjaGUiLCJmYWNlYm9vayIsImNsaWVudElkIiwicmVzcG9uc2VUeXBlIiwiZ29vZ2xlIiwicnVuIiwiJGlvbmljUGxhdGZvcm0iLCJyZWFkeSIsIndpbmRvdyIsImNvcmRvdmEiLCJwbHVnaW5zIiwiS2V5Ym9hcmQiLCJoaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIiLCJkaXNhYmxlU2Nyb2xsIiwiU3RhdHVzQmFyIiwic3R5bGVEZWZhdWx0IiwiJHNjb3BlIiwidXNlclNlcnZpY2UiLCIkc3RhdGUiLCJnb2JhY2siLCJoaXN0b3J5IiwiZ28iLCJ1c2VyIiwiZ2V0VXNlckluZm8iLCJzdWIiLCJjb25zb2xlIiwibG9nIiwic3VibWl0Q2hpbGQiLCJjaGlsZCIsInVzZXJfaG91c2Vob2xkIiwiYWRkQ2hpbGQiLCJ0aGVuIiwicmVzIiwiY2hvcmVTZXJ2aWNlIiwiJHdpbmRvdyIsImN1cnJlbnRVc2VyIiwiZ2V0Q2hpbGRyZW4iLCJjaGlsZHMiLCJkYXRhIiwidmFsdWVzIiwiY2hvcmUiLCJjaG9yZV9kYWlseSIsImNob3JlX3dlZWtseSIsImNob3JlX21vbnRobHkiLCJDcmVhdGVDaG9yZSIsIm5hbWUiLCJkZXNjcmlwdGlvbiIsImhvdXNlaG9sZCIsInZhbHVlIiwiZGFpbHkiLCJ3ZWVrbHkiLCJtb250aGx5IiwiY2hvcmVfbmFtZSIsImNob3JlX2Rlc2NyaXB0aW9uIiwidXNlcl9ob3VzZWhvbGRfZmsiLCJjaG9yZV92YWx1ZSIsInVzZXJfaWRfZmsiLCJjaGlsZElkcyIsImNoaWxkcmVuQ2hvcmVzIiwiY2hpbGRDaG9yZSIsInNlbGVjdENoaWxkIiwidXNlcl9pZF9wayIsImluZGV4T2YiLCJwdXNoIiwic3VibWl0Q2hvcmUiLCJmb3JFYWNoIiwidmFsIiwiY3JlYXRlQ2hvcmUiLCJsb2NhdGlvbiIsInJlbG9hZCIsIm1ha2VDaG9pY2UiLCJzZWxlY3RlZCIsIiRjb3Jkb3ZhQ2FtZXJhIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiJGNvcmRvdmFQbHVnaW4iLCJzb21lRnVuY3Rpb24iLCJzdWNjZXNzIiwiZXJyb3IiLCJ0YWtlUGljdHVyZSIsIm9wdGlvbnMiLCJxdWFsaXR5IiwiZGVzdGluYXRpb25UeXBlIiwiQ2FtZXJhIiwiRGVzdGluYXRpb25UeXBlIiwiREFUQV9VUkwiLCJzb3VyY2VUeXBlIiwiUGljdHVyZVNvdXJjZVR5cGUiLCJDQU1FUkEiLCJhbGxvd0VkaXQiLCJlbmNvZGluZ1R5cGUiLCJFbmNvZGluZ1R5cGUiLCJKUEVHIiwidGFyZ2V0V2lkdGgiLCJ0YXJnZXRIZWlnaHQiLCJwb3BvdmVyT3B0aW9ucyIsIkNhbWVyYVBvcG92ZXJPcHRpb25zIiwic2F2ZVRvUGhvdG9BbGJ1bSIsImNvcnJlY3RPcmllbnRhdGlvbiIsImdldFBpY3R1cmUiLCJpbWFnZURhdGEiLCJpbWdVUkkiLCJlcnIiLCIkYXV0aCIsInVzZXJUb2tlbiIsImdldFBheWxvYWQiLCJ0aGVtZSIsInVzZXJfdGhlbWUiLCIkb24iLCJnZXRUaGVtZSIsInJldHVyblRoZW1lIiwic2V0VGhlbWUiLCJ0aGVtZUltYWdlIiwiZ2V0UG9pbnRzIiwiaWQiLCJyZXNwb25zZSIsInBvaW50VG90YWwiLCJ1c2VyX3BvaW50c190b3RhbCIsImdldFJld2FyZHMiLCJyZXdhcmRzIiwiJGlvbmljTW9kYWwiLCJ1c2VyX2FkbWluIiwiY2hvaWNlIiwidXNlcklkIiwic3RhdHVzIiwiZ2V0RGFpbHlDaG9yZXMiLCJkYWlseUNob3JlcyIsImdldFdlZWtseUNob3JlcyIsIndlZWtseUNob3JlcyIsImdldE1vbnRobHlDaG9yZXMiLCJtb250aGx5Q2hvcmVzIiwiZnJvbVRlbXBsYXRlVXJsIiwic2NvcGUiLCJiYWNrZHJvcENsaWNrVG9DbG9zZSIsImFuaW1hdGlvbiIsIm1vZGFsIiwib01vZGFsMSIsIm9wZW5Nb2RhbCIsImluZGV4Iiwic2hvdyIsIm9Nb2RhbDIiLCJjbG9zZU1vZGFsIiwiaGlkZSIsInJlbW92ZSIsInJldmVhbGVyIiwiY2hlY2tPZmZjaG9yZSIsImxvZ291dCIsImxvZ2luU2VydmljZSIsImxvZ2luQ2hpbGQiLCJ1c2VyTG9naW4iLCJzZXRUb2tlbiIsImdldENoaWxkIiwicGFyYW1zIiwiY2hpbGRTdWJtaXRJbWFnZSIsImltYWdlIiwidXBkYXRlSW1hZ2UiLCJnZXRFbGVtZW50QnlJZCIsImNoaWxkU3VibWl0TmFtZSIsInVwZGF0ZU5hbWUiLCJjaGlsZFN1Ym1pdEVtYWlsIiwiZW1haWwiLCJ1cGRhdGVFbWFpbCIsImNoaWxkU3VibWl0UGFzc3dvcmQiLCJwYXNzd29yZCIsInVwZGF0ZVBhc3N3b3JkIiwidGVzdCIsImJhbm5lciIsInVzZXJfYmFubmVyX2ltYWdlIiwiZ2V0YmFubmVyIiwiZ2V0V2VhdGhlciIsInppcCIsIndlYXRoZXIiLCJzaG93Y2hpbGQiLCJzdWJtaXRCYW5uZXIiLCJiYW5uZXJJbmZvIiwicG9zdGJhbm5lciIsImxvZ2luIiwiYWxlcnQiLCJtYWtlVXNlciIsIm5ld1VzZXIiLCJhdXRoZW50aWNhdGUiLCJwcm92aWRlciIsInJlbW92ZVJld2FyZCIsImkiLCJyZXdhcmQiLCJyZXdhcmRJZCIsInNwbGljZSIsIm1ha2VSZXdhcmQiLCJuZXdSZXdhcmQiLCJjaGVja2VkIiwib3V0ZXIiLCJpbm5lciIsInJld2FyZF9kZXNjcmlwdGlvbiIsInJld2FyZF90b3RhbCIsImNoaWxkcmVuIiwibGVuZ3RoIiwiY2FsbHMiLCJqIiwiZWxlbWVudCIsIm9Nb2RhbDMiLCJvTW9kYWw0Iiwib01vZGFsNSIsInVzZXJJbmZvIiwic3VibWl0UGFzc3dvcmQiLCJ1c2VyX25ld19wYXNzd29yZCIsInN1Ym1pdEhvdXNlaG9sZCIsImhvdXNlIiwidXBkYXRlSG91c2Vob2xkIiwic3VibWl0WmlwQ29kZSIsInppcGNvZGUiLCJ1cGRhdGV6aXAiLCJjcmVhdGVQYXJlbnQiLCJyZW1vdmVDaGlsZCIsImxvZ2dlciIsInNlbGVjdGVkQ2hpbGQiLCJkZWxldGVDaGlsZCIsImNvbmZpcm1DaG9yZSIsImNob3JlSUQiLCJkZW55Q2hvcmUiLCJjaG9yZV9zdGF0dXMiLCJyZW1vdmVDaG9yZSIsInJlZHVjZVBvaW50cyIsInBvaW50cyIsInNlcnZpY2UiLCIkaHR0cCIsIiRxIiwibWV0aG9kIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQUEsUUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0IsQ0FBQyxPQUFELEVBQVUsWUFBVixDQUF4QixFQUNDQyxNQURELENBQ1EsVUFBU0MsY0FBVCxFQUF5QkMsa0JBQXpCLEVBQTZDQyxhQUE3QyxFQUEyRDtBQUNqRUQscUJBQW1CRSxT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WXlKLE9BQVo7QUFDQSxXQUFPNkMsTUFBTTtBQUNYRSxjQUFRLE1BREc7QUFFWHJPLFdBQUssc0NBRk07QUFHWHlDLFlBQU02STtBQUhLLEtBQU4sQ0FBUDtBQUtELEdBUEQ7QUFRRCxDQXRCRCxHQXNCRyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJb25pYyBTdGFydGVyIEFwcFxuXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xuLy8gJ3N0YXJ0ZXInIGlzIHRoZSBuYW1lIG9mIHRoaXMgYW5ndWxhciBtb2R1bGUgZXhhbXBsZSAoYWxzbyBzZXQgaW4gYSA8Ym9keT4gYXR0cmlidXRlIGluIGluZGV4Lmh0bWwpXG4vLyB0aGUgMm5kIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvZiAncmVxdWlyZXMnXG5cbmFuZ3VsYXIubW9kdWxlKCdjaG9yZScsIFsnaW9uaWMnLCAnc2F0ZWxsaXplciddKVxuLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkYXV0aFByb3ZpZGVyKXtcbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShcIi9sb2dpblwiKTtcbiAgJHN0YXRlUHJvdmlkZXJcbiAgLnN0YXRlKCdhZGRDaGlsZCcse1xuICAgIHVybDpcIi9hZGRDaGlsZFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2FkZENoaWxkLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImFkZENoaWxkQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnYXNzaWduQ2hvcmUnLHtcbiAgICB1cmw6XCIvYXNzaWduQ2hvcmVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9hc3NpZ25DaG9yZS5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJhc3NpZ25DaG9yZUN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2VkaXRDaGlsZCcse1xuICAgIHVybDpcIi9lZGl0Q2hpbGQvOmlkXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvZWRpdENoaWxkLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImVkaXRDaGlsZEN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2hpc3RvcnknLHtcbiAgICB1cmw6XCIvaGlzdG9yeVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2hpc3RvcnkuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiaGlzdG9yeUN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2hvbWUnLHtcbiAgICBjYWNoZTogZmFsc2UsXG4gICAgdXJsOlwiL2hvbWVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9ob21lLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImhvbWVDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdsb2dpbicse1xuICAgIHVybDpcIi9sb2dpblwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2xvZ2luLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImxvZ2luQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnbWFrZUNob3JlJyx7XG4gICAgdXJsOlwiL21ha2VDaG9yZVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL21ha2VDaG9yZS5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJtYWtlQ2hvcmVDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdzZXRSZXdhcmRzJyx7XG4gICAgdXJsOlwiL3NldFJld2FyZHMvOmlkXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvc2V0UmV3YXJkcy5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJzZXRSZXdhcmRzQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnc2V0dGluZ3MnLHtcbiAgICB1cmw6XCIvc2V0dGluZ3NcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9zZXR0aW5ncy5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJzZXR0aW5nc0N0cmxcIlxuICB9KVxuICAuc3RhdGUoJ3RyYWNrZXInLHtcbiAgICB1cmw6XCIvdHJhY2tlci86aWRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy90cmFja2VyLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcInRyYWNrZXJDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCd1c2VySW5mbycse1xuICAgIHVybDpcIi91c2VySW5mb1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL3VzZXJJbmZvLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcInVzZXJJbmZvQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnY2hpbGRCYW5rJyx7XG4gICAgdXJsOlwiL2NoaWxkL2JhbmtcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9jaGlsZEJhbmsuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRCYW5rQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnY2hpbGRIb21lJyx7XG4gICAgdXJsOlwiL2NoaWxkL2hvbWVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9jaGlsZEhvbWUuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRIb21lQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnY2hpbGRMb2dpbicse1xuICAgIHVybDpcIi9jaGlsZC9sb2dpblwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2NoaWxkTG9naW4uaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRMb2dpbkN0cmxcIlxuICB9KVxuXG4gICRhdXRoUHJvdmlkZXIuZmFjZWJvb2soe1xuICAgIGNsaWVudElkOiAnMzMyMjcyMDU3MTMyNjgxJ1xuICB9KTtcblxuICAvLyBPcHRpb25hbDogRm9yIGNsaWVudC1zaWRlIHVzZSAoSW1wbGljaXQgR3JhbnQpLCBzZXQgcmVzcG9uc2VUeXBlIHRvICd0b2tlbicgKGRlZmF1bHQ6ICdjb2RlJylcbiAgJGF1dGhQcm92aWRlci5mYWNlYm9vayh7XG4gICAgY2xpZW50SWQ6ICczMzIyNzIwNTcxMzI2ODEnLFxuICAgIHJlc3BvbnNlVHlwZTogJ3Rva2VuJ1xuICB9KTtcblxuICAkYXV0aFByb3ZpZGVyLmdvb2dsZSh7XG4gICAgY2xpZW50SWQ6ICcyNzUzNTI5NjA5NDYtNXJjYW4zcWtobHNjN201MGhldjVkbjJlMmNhZTltYnAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20nLFxuICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODEwMC8jL2xvZ2luLydcbiAgfSk7XG59KVxuXG5cblxuLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xuICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICBpZih3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuXG4gICAgICAvLyBEb24ndCByZW1vdmUgdGhpcyBsaW5lIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuIEl0IHN0b3BzIHRoZSB2aWV3cG9ydFxuICAgICAgLy8gZnJvbSBzbmFwcGluZyB3aGVuIHRleHQgaW5wdXRzIGFyZSBmb2N1c2VkLiBJb25pYyBoYW5kbGVzIHRoaXMgaW50ZXJuYWxseSBmb3JcbiAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgfVxuICAgIGlmKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcbiAgICB9XG4gIH0pO1xufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJhZGRDaGlsZEN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLHVzZXJTZXJ2aWNlLCRzdGF0ZSl7XG4gIC8vYmFja2J1dHRvblxuICAkc2NvcGUuZ29iYWNrID0gZnVuY3Rpb24oKXtcbiAgICB3aW5kb3cuaGlzdG9yeS5nbygtMSlcbiAgfVxudmFyIHVzZXIgPSB1c2VyU2VydmljZS5nZXRVc2VySW5mby5zdWI7XG5jb25zb2xlLmxvZyh1c2VyKTtcbiRzY29wZS5zdWJtaXRDaGlsZCA9IGZ1bmN0aW9uKGNoaWxkKXtcbiAgY2hpbGQudXNlcl9ob3VzZWhvbGQgPSB1c2VyLnVzZXJfaG91c2Vob2xkO1xuICBjb25zb2xlLmxvZyhjaGlsZCk7XG4gIHVzZXJTZXJ2aWNlLmFkZENoaWxkKGNoaWxkKVxuICAudGhlbihmdW5jdGlvbihyZXMpe1xuICAgICRzdGF0ZS5nbygnaG9tZScpO1xuICB9KTtcblxufVxuXG5cblxuXG5cbn0pIC8vZW5kIG9mIGNvbnRyb2xsZXJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJhc3NpZ25DaG9yZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLGNob3JlU2VydmljZSwkc3RhdGUsICR3aW5kb3cpe1xuXG52YXIgY3VycmVudFVzZXIgPSBjaG9yZVNlcnZpY2UuZ2V0VXNlckluZm8uc3ViO1xuXG5cbmNob3JlU2VydmljZS5nZXRDaGlsZHJlbihjdXJyZW50VXNlci51c2VyX2hvdXNlaG9sZClcbi50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gIC8vICRzY29wZS5jaG9yZXMgPSByZXMuZGF0YTtcbiAgJHNjb3BlLmNoaWxkcyA9IHJlcy5kYXRhO1xufSk7XG5cblxuJHNjb3BlLnZhbHVlcyA9IFtdO1xuXG4kc2NvcGUuY2hvcmUgPSB7XG5jaG9yZV9kYWlseTogZmFsc2UsXG5jaG9yZV93ZWVrbHk6IGZhbHNlLFxuY2hvcmVfbW9udGhseTpmYWxzZSxcblxufTtcblxuZnVuY3Rpb24gQ3JlYXRlQ2hvcmUobmFtZSxkZXNjcmlwdGlvbixob3VzZWhvbGQsdmFsdWUsZGFpbHksd2Vla2x5LG1vbnRobHksY2hpbGQpe1xuICB0aGlzLmNob3JlX25hbWUgPSBuYW1lO1xuICB0aGlzLmNob3JlX2Rlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gIHRoaXMudXNlcl9ob3VzZWhvbGRfZmsgPSBob3VzZWhvbGQ7XG4gIHRoaXMuY2hvcmVfdmFsdWUgPSB2YWx1ZTtcbiAgdGhpcy5jaG9yZV9kYWlseSA9IGRhaWx5O1xuICB0aGlzLmNob3JlX3dlZWtseSA9IHdlZWtseTtcbiAgdGhpcy5jaG9yZV9tb250aGx5ID0gbW9udGhseTtcbiAgdGhpcy51c2VyX2lkX2ZrID0gY2hpbGQ7XG59XG5cbnZhciBjaGlsZElkcyA9IFtdO1xudmFyIGNoaWxkcmVuQ2hvcmVzID0gW107XG4kc2NvcGUuY2hpbGRDaG9yZSA9IGZ1bmN0aW9uKGNob3JlKXtcbiAgdmFyIHNlbGVjdENoaWxkID0gdGhpcy5jaGlsZC51c2VyX2lkX3BrO1xuICBpZihjaGlsZElkcy5pbmRleE9mKHNlbGVjdENoaWxkKSAhPT0gLTEpe1xuICAgIHJldHVyblxuICB9XG4gIGVsc2V7XG4gIHZhciBjaGlsZENob3JlID0gbmV3IENyZWF0ZUNob3JlKGNob3JlLmNob3JlX25hbWUsY2hvcmUuY2hvcmVfZGVzY3JpcHRpb24sY3VycmVudFVzZXIudXNlcl9ob3VzZWhvbGQsY2hvcmUuY2hvcmVfdmFsdWUsY2hvcmUuY2hvcmVfZGFpbHksY2hvcmUuY2hvcmVfd2Vla2x5LGNob3JlLmNob3JlX21vbnRobHksc2VsZWN0Q2hpbGQpO1xuICBjaGlsZHJlbkNob3Jlcy5wdXNoKGNoaWxkQ2hvcmUpO1xuICBjaGlsZElkcy5wdXNoKHNlbGVjdENoaWxkKVxuIH1cbn07XG5cbiRzY29wZS5zdWJtaXRDaG9yZSA9IGZ1bmN0aW9uKCl7XG4gIGNoaWxkcmVuQ2hvcmVzLmZvckVhY2goZnVuY3Rpb24odmFsKXtcbiAgICBjaG9yZVNlcnZpY2UuY3JlYXRlQ2hvcmUodmFsKVxuICAgIC50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gICAgJHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxuICAgIH0pO1xuICB9XG5cbik7XG5jaGlsZHJlbkNob3JlcyA9IFtdO1xufTtcblxuJHNjb3BlLm1ha2VDaG9pY2UgPSBmdW5jdGlvbigpe1xuICB0aGlzLnNlbGVjdGVkID0ge1xuICAgICdib3JkZXInOiAnc29saWQgMnB4ICNmOWY5ZjknXG4gICAgfVxufVxuXG5cblxuXG5cbn0pOy8vZW5kIG9mIGNvbnRyb2xsZXJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoJ2NhbWVyYUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRjb3Jkb3ZhQ2FtZXJhKSB7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRldmljZXJlYWR5XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICRjb3Jkb3ZhUGx1Z2luLnNvbWVGdW5jdGlvbigpLnRoZW4oc3VjY2VzcywgZXJyb3IpO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIC8vIE9SIHdpdGggSU9OSUNcblxuICAgICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgJGNvcmRvdmFQbHVnaW4uc29tZUZ1bmN0aW9uKCkudGhlbihzdWNjZXNzLCBlcnJvcik7XG4gICAgfSk7XG5cbiAgJHNjb3BlLnRha2VQaWN0dXJlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICBxdWFsaXR5OiA1MCxcbiAgICAgIGRlc3RpbmF0aW9uVHlwZTogQ2FtZXJhLkRlc3RpbmF0aW9uVHlwZS5EQVRBX1VSTCxcbiAgICAgIHNvdXJjZVR5cGU6IENhbWVyYS5QaWN0dXJlU291cmNlVHlwZS5DQU1FUkEsXG4gICAgICBhbGxvd0VkaXQ6IGZhbHNlLFxuICAgICAgZW5jb2RpbmdUeXBlOiBDYW1lcmEuRW5jb2RpbmdUeXBlLkpQRUcsXG4gICAgICB0YXJnZXRXaWR0aDogMzAwLFxuICAgICAgdGFyZ2V0SGVpZ2h0OiAzMDAsXG4gICAgICBwb3BvdmVyT3B0aW9uczogQ2FtZXJhUG9wb3Zlck9wdGlvbnMsXG4gICAgICBzYXZlVG9QaG90b0FsYnVtOiBmYWxzZSxcblx0ICAgIGNvcnJlY3RPcmllbnRhdGlvbjp0cnVlXG4gICAgfTtcblxuICAgICRjb3Jkb3ZhQ2FtZXJhLmdldFBpY3R1cmUob3B0aW9ucykudGhlbihmdW5jdGlvbihpbWFnZURhdGEpIHtcbiAgICAgICRzY29wZS5pbWdVUkkgPSBcImRhdGE6aW1hZ2UvanBlZztiYXNlNjQsXCIgKyBpbWFnZURhdGE7XG4gICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAvLyBlcnJvclxuICAgIH0pO1xuXG4gIH07XG4gIH0sIGZhbHNlKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJjaGlsZEJhbmtDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGF1dGgsIHVzZXJTZXJ2aWNlKXtcbiAgdmFyIHVzZXJUb2tlbiA9ICRhdXRoLmdldFBheWxvYWQoKTtcbiAgIHVzZXJTZXJ2aWNlLmdldFVzZXJJbmZvID0gdXNlclRva2VuO1xuICAgJHNjb3BlLnVzZXIgPSB1c2VyVG9rZW4uc3ViO1xuICAgJHNjb3BlLnRoZW1lID0gJHNjb3BlLnVzZXIudXNlcl90aGVtZTtcblxuICAgJHNjb3BlLiRvbignJGlvbmljVmlldy5iZWZvcmVFbnRlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgdmFyIGdldFRoZW1lID0gZnVuY3Rpb24oKXtcbiAgICAgICAkc2NvcGUudGhlbWUgPSB1c2VyU2VydmljZS5yZXR1cm5UaGVtZSgpXG4gICAgIH1cbiAgICAgaWYodXNlclNlcnZpY2UucmV0dXJuVGhlbWUoKSl7XG4gICAgICAgZ2V0VGhlbWUoKVxuICAgICB9XG4gICAgICRzY29wZS5zZXRUaGVtZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAnYmFzZWJhbGwnKXtcbiAgICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL2ltZy1iYXNlYmFsbC10cmFucy5wbmcnXG4gICAgICAgfVxuICAgICAgIGlmKCRzY29wZS50aGVtZSA9PT0gJ2NoYXJsaWVCcm93bicpe1xuICAgICAgICAgJHNjb3BlLnRoZW1lSW1hZ2UgPSAnLi9pbWcvc25vb3B5LnBuZydcbiAgICAgICB9XG4gICAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAncHJpbmNlc3MnKXtcbiAgICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL0Nyb3duX1ByaW5jZXNzLnBuZydcbiAgICAgICB9XG4gICAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAnc3RhcldhcnMnKXtcbiAgICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL2RlYXRoLXN0YXItMm5kLWljb24ucG5nJ1xuICAgICAgIH1cbiAgICAgICBpZigkc2NvcGUudGhlbWUgPT09ICd3YXRlcicpe1xuICAgICAgICAgJHNjb3BlLnRoZW1lSW1hZ2UgPSAnLi9pbWcvVHJhbnNwYXJlbnRfV2F0ZXJfRHJvcF9QTkdfUGljdHVyZS5wbmcnXG4gICAgICAgfVxuICAgICB9XG4gICAgICRzY29wZS5zZXRUaGVtZSgpO1xuICB9KTtcblxuICB2YXIgZ2V0UG9pbnRzID0gZnVuY3Rpb24oKXtcbiAgICBpZCA9ICRzY29wZS51c2VyLnVzZXJfaWRfcGs7XG4gICAgdXNlclNlcnZpY2UuZ2V0UG9pbnRzKGlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICRzY29wZS5wb2ludFRvdGFsID0gcmVzcG9uc2VbMF0udXNlcl9wb2ludHNfdG90YWwgIFxuICAgIH0pXG4gIH1cbiAgZ2V0UG9pbnRzKClcblxuXG4gICB2YXIgZ2V0UmV3YXJkcyA9IGZ1bmN0aW9uKCl7XG4gICAgIGlkID0gJHNjb3BlLnVzZXIudXNlcl9pZF9waztcbiAgICAgdXNlclNlcnZpY2UuZ2V0UmV3YXJkcyhpZCkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgJHNjb3BlLnJld2FyZHMgPSByZXNwb25zZTtcbiAgICAgfSlcbiAgIH1cbiAgIGdldFJld2FyZHMoKTtcblxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImNoaWxkSG9tZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCwgJGF1dGgsIHVzZXJTZXJ2aWNlLCAkc3RhdGUpe1xuICAvLyAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tICBjaGlsZCBIb21lIGNvbnRyb2xsZXJcIlxuICAvL3ZhciB1c2VyVG9rZW4gPSB1c2VyU2VydmljZS5nZXRVc2VySW5mby5zdWI7XG4gJHNjb3BlLiRvbignJGlvbmljVmlldy5iZWZvcmVFbnRlcicsIGZ1bmN0aW9uICgpIHtcbiAgdmFyIHVzZXJUb2tlbiA9ICRhdXRoLmdldFBheWxvYWQoKTtcbiAgdXNlclNlcnZpY2UuZ2V0VXNlckluZm8gPSB1c2VyVG9rZW47XG4gICRzY29wZS51c2VyID0gdXNlclRva2VuLnN1YjtcbiAgaWYoJHNjb3BlLnVzZXIudXNlcl9hZG1pbil7XG4gICAgJHN0YXRlLmdvKCdsb2dpbicpXG4gIH1cblxuICAkc2NvcGUudGhlbWUgPSAkc2NvcGUudXNlci51c2VyX3RoZW1lXG4gICRzY29wZS5zZXRUaGVtZSA9IGZ1bmN0aW9uKGNob2ljZSl7XG4gICAgdmFyIGRhdGEgPSB7fVxuICAgIGRhdGEudGhlbWUgPSBjaG9pY2VcbiAgICBkYXRhLnVzZXJJZCA9ICRzY29wZS51c2VyLnVzZXJfaWRfcGs7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgdXNlclNlcnZpY2Uuc2V0VGhlbWUoZGF0YSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgaWYocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApe1xuICAgICAgJHNjb3BlLnRoZW1lID0gY2hvaWNlXG4gICAgICB9XG4gIH0pXG4gIH1cblxuXG4gIHZhciBnZXREYWlseUNob3JlcyA9IGZ1bmN0aW9uKCl7XG4gICAgaWQgPSAkc2NvcGUudXNlci51c2VyX2lkX3BrXG4gICAgdXNlclNlcnZpY2UuZ2V0RGFpbHlDaG9yZXMoaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgJHNjb3BlLmRhaWx5Q2hvcmVzID0gcmVzcG9uc2U7XG4gICAgfSlcbiAgfVxuICAgZ2V0RGFpbHlDaG9yZXMoKVxuICB2YXIgZ2V0V2Vla2x5Q2hvcmVzID0gZnVuY3Rpb24oKXtcbiAgICBpZCA9ICRzY29wZS51c2VyLnVzZXJfaWRfcGtcbiAgICB1c2VyU2VydmljZS5nZXRXZWVrbHlDaG9yZXMoaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgJHNjb3BlLndlZWtseUNob3JlcyA9IHJlc3BvbnNlO1xuICAgIH0pXG4gIH1cbiAgZ2V0V2Vla2x5Q2hvcmVzKClcbiAgdmFyIGdldE1vbnRobHlDaG9yZXMgPSBmdW5jdGlvbigpe1xuICAgIGlkID0gJHNjb3BlLnVzZXIudXNlcl9pZF9wa1xuICAgIHVzZXJTZXJ2aWNlLmdldE1vbnRobHlDaG9yZXMoaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgJHNjb3BlLm1vbnRobHlDaG9yZXMgPSByZXNwb25zZTtcbiAgICB9KVxuICB9XG4gIGdldE1vbnRobHlDaG9yZXMoKVxuXG5cbn0pXG5cbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCd0aGVtZU1vZGFsLmh0bWwnLCB7XG4gICAgIGlkOiAnMScsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsMSA9IG1vZGFsO1xuICAgfSk7XG5cbiAgIC8vIE1vZGFsIDJcbiAgLy8gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgndGFrZVBpY3R1cmVNb2RhbC5odG1sJywge1xuICAvLyAgICBpZDogJzInLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgLy8gICAgc2NvcGU6ICRzY29wZSxcbiAgLy8gICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAvLyAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgLy8gIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgLy8gICAgJHNjb3BlLm9Nb2RhbDIgPSBtb2RhbDtcbiAgLy8gIH0pO1xuICAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgIGlmIChpbmRleCA9PSAxKSAkc2NvcGUub01vZGFsMS5zaG93KCk7XG4gICAgIGVsc2UgJHNjb3BlLm9Nb2RhbDIuc2hvdygpO1xuICAgfTtcblxuICAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICBpZiAoaW5kZXggPT0gMSkgJHNjb3BlLm9Nb2RhbDEuaGlkZSgpO1xuICAgICBlbHNlICRzY29wZS5vTW9kYWwyLmhpZGUoKTtcbiAgIH07XG5cbiAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICRzY29wZS5vTW9kYWwxLnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsMi5yZW1vdmUoKTtcblxuICAgfSk7XG5cblxuICAkc2NvcGUucmV2ZWFsZXIgPSBmdW5jdGlvbigpe1xuICAgdGhpcy5oaWRlID0gIXRoaXMuaGlkZTtcbiAgfVxuXG4gICRzY29wZS5jaGVja09mZmNob3JlID0gZnVuY3Rpb24oaWQpe1xuICAgIGNvbnNvbGUubG9nKGlkKTtcbiAgICB1c2VyU2VydmljZS5jaGVja09mZmNob3JlKGlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICB9KVxuICAgfVxuXG4gICAkc2NvcGUubG9nb3V0ID0gZnVuY3Rpb24oKXtcbiAgICAgJGF1dGgubG9nb3V0KClcbiAgICAgJHN0YXRlLmdvKCdsb2dpbicpXG4gICB9XG5cbn0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImNoaWxkTG9naW5DdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGF1dGgsICRzdGF0ZSwgbG9naW5TZXJ2aWNlKXtcbiAgLy8gICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gY2hpbGQgTG9naW4gY29udHJvbGxlclwiXG5cbiAgICRzY29wZS5sb2dpbkNoaWxkID0gZnVuY3Rpb24odXNlcil7XG4gICAgIGNvbnNvbGUubG9nKHVzZXIpXG4gICAgIGxvZ2luU2VydmljZS51c2VyTG9naW4odXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgJGF1dGguc2V0VG9rZW4ocmVzcG9uc2UpXG4gICAgICAgICAkc3RhdGUuZ28oJ2NoaWxkSG9tZScpXG5cbiAgICAgfSlcbiAgIH1cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiZWRpdENoaWxkQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsdXNlclNlcnZpY2UsJHN0YXRlLCRhdXRoKXtcbiAgLy9iYWNrYnV0dG9uXG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKTtcbiAgfTtcblxuICB2YXIgZ2V0Q2hpbGQgPSBmdW5jdGlvbigpe1xuICAgIHVzZXJTZXJ2aWNlLmdldENoaWxkKCRzdGF0ZS5wYXJhbXMuaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgJHNjb3BlLmNoaWxkID0gcmVzcG9uc2VbMF1cbiAgICB9KVxuICB9XG4gIGdldENoaWxkKClcblxuICAkc2NvcGUuY2hpbGRTdWJtaXRJbWFnZSA9IGZ1bmN0aW9uKGltYWdlKXtcbiAgICB1c2VyU2VydmljZS51cGRhdGVJbWFnZSgkc2NvcGUuY2hpbGQudXNlcl9pZF9wayxpbWFnZSlcbiAgICAudGhlbihmdW5jdGlvbihyZXMpe1xuICAgICAgaWYocmVzLnN0YXR1cyA9PT0gMjAwKXtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoaWxkLXNldHRpbmctaW1hZ2VcIikudmFsdWUgPSAnJztcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICAkc2NvcGUuY2hpbGRTdWJtaXROYW1lID0gZnVuY3Rpb24obmFtZSl7XG4gICAgdXNlclNlcnZpY2UudXBkYXRlTmFtZSgkc2NvcGUuY2hpbGQudXNlcl9pZF9wayxuYW1lKVxuICAgIC50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gICAgICBpZihyZXMuc3RhdHVzID09PSAyMDApe1xuICAgICAgICBnZXRDaGlsZCgpXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hpbGQtc2V0dGluZy1uYW1lXCIpLnZhbHVlID0gJyc7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgJHNjb3BlLmNoaWxkU3VibWl0RW1haWwgPSBmdW5jdGlvbihlbWFpbCl7XG4gICAgdXNlclNlcnZpY2UudXBkYXRlRW1haWwoJHNjb3BlLmNoaWxkLnVzZXJfaWRfcGssZW1haWwpXG4gICAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hpbGQtc2V0dGluZy1lbWFpbFwiKS52YWx1ZSA9ICcnO1xuICAgIH0pO1xuICB9O1xuXG4gICRzY29wZS5jaGlsZFN1Ym1pdFBhc3N3b3JkID0gZnVuY3Rpb24ocGFzc3dvcmQpe1xuICAgIGNvbnNvbGUubG9nKCRzY29wZS5jaGlsZC51c2VyX2lkX3BrKTtcbiAgICB1c2VyU2VydmljZS51cGRhdGVQYXNzd29yZCgkc2NvcGUuY2hpbGQudXNlcl9pZF9waywgcGFzc3dvcmQpXG4gICAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoaWxkLXNldHRpbmctcGFzc3dvcmRcIikudmFsdWUgPSAnJztcbiAgICB9KTtcbiAgfTtcblxuXG5cblxuXG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJoaXN0b3J5Q3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBIaXN0b3J5IGNvbnRyb2xsZXJcIlxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImhvbWVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwsdXNlclNlcnZpY2UsJHdpbmRvdywgJGF1dGgsICRzdGF0ZSl7XG5cbiAgICB2YXIgdXNlclRva2VuID0gJGF1dGguZ2V0UGF5bG9hZCgpO1xuICAgIHVzZXJTZXJ2aWNlLmdldFVzZXJJbmZvID0gdXNlclRva2VuO1xuICAgICRzY29wZS51c2VyID0gdXNlclRva2VuLnN1YjtcbiAgICBpZighJHNjb3BlLnVzZXIudXNlcl9hZG1pbil7XG4gICAgICAkc3RhdGUuZ28oJ2NoaWxkTG9naW4nKVxuICAgIH1cbiAgICAkc2NvcGUuYmFubmVyID0gJHNjb3BlLnVzZXJfYmFubmVyX2ltYWdlO1xuICAgICRzY29wZS5ob3VzZWhvbGQgPSAgJHNjb3BlLnVzZXIudXNlcl9ob3VzZWhvbGQ7XG4gICAgdXNlclNlcnZpY2UuZ2V0YmFubmVyKCRzY29wZS51c2VyLnVzZXJfaWRfcGspLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgJHNjb3BlLmJhbm5lciA9IHJlc1swXS51c2VyX2Jhbm5lcl9pbWFnZTtcbiAgICB9KTtcblxuICAgIHVzZXJTZXJ2aWNlLmdldFdlYXRoZXIoJHNjb3BlLnVzZXIuemlwKVxuICAgIC50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gICAgICAkc2NvcGUud2VhdGhlciA9IHJlcy5kYXRhO1xuICAgIH0pXG5cbiAgICB1c2VyU2VydmljZS5zaG93Y2hpbGQoJHNjb3BlLnVzZXIudXNlcl9ob3VzZWhvbGQpXG4gICAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAgICRzY29wZS5zaG93Y2hpbGQgPSByZXMuZGF0YTtcbiAgICB9KVxuXG5cblxuXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2Jhbm5lck1vZGFsLmh0bWwnLCB7XG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUubW9kYWwgPSBtb2RhbDtcbiAgIH0pO1xuICAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICAkc2NvcGUubW9kYWwuc2hvdygpO1xuICAgfTtcbiAgICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWwtYm94XCIpLnZhbHVlID0gJyc7XG4gICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gICB9O1xuICAgLy8gQ2xlYW51cCB0aGUgbW9kYWwgd2hlbiB3ZSdyZSBkb25lIHdpdGggaXQhXG4gICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAkc2NvcGUubW9kYWwucmVtb3ZlKCk7XG4gICB9KTtcbiAgIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIGhpZGUgbW9kYWxcbiAgICRzY29wZS4kb24oJ21vZGFsLmhpZGRlbicsIGZ1bmN0aW9uKCkge1xuICAgICAvLyBFeGVjdXRlIGFjdGlvblxuICAgfSk7XG4gICAvLyBFeGVjdXRlIGFjdGlvbiBvbiByZW1vdmUgbW9kYWxcbiAgICRzY29wZS4kb24oJ21vZGFsLnJlbW92ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgIH0pO1xuXG5cbiAgICRzY29wZS5zdWJtaXRCYW5uZXIgPSBmdW5jdGlvbihiYW5uZXIpe1xuICAgICB2YXIgYmFubmVySW5mbyA9IHtcbiAgICAgICB1c2VyX2hvdXNlaG9sZDokc2NvcGUudXNlci51c2VyX2hvdXNlaG9sZCxcbiAgICAgICB1c2VyX2Jhbm5lcl9pbWFnZTpiYW5uZXJcbiAgICAgfVxuICAgICAgdXNlclNlcnZpY2UucG9zdGJhbm5lcihiYW5uZXJJbmZvKVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgaWYgKHJlcy5zdGF0dXMgPT09IDIwMCl7XG4gICAgICAgICAgJHNjb3BlLmNsb3NlTW9kYWwoKVxuICAgICAgICAgICRzY29wZS5iYW5uZXI9IGJhbm5lclxuICAgICAgICB9XG4gICAgIH0pO1xuICAgfTtcblxuXG5cbiRzY29wZS5sb2dvdXQgPSBmdW5jdGlvbigpe1xuICAkYXV0aC5sb2dvdXQoKVxuICAkc3RhdGUuZ28oJ2xvZ2luJylcbn1cblxufSkvL2VuZCBvZiBjb250cm9sbGVyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwibG9naW5DdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGF1dGgsICRzdGF0ZSwgbG9naW5TZXJ2aWNlKXtcblxuJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24odXNlcil7XG4gIC8vIGNvbnNvbGUubG9nKHVzZXIpXG4gIGxvZ2luU2VydmljZS51c2VyTG9naW4odXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgaWYocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApe1xuICAgICAgJGF1dGguc2V0VG9rZW4ocmVzcG9uc2UpXG4gICAgICAgICRzdGF0ZS5nbygnaG9tZScpXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICBhbGVydCgnRW1haWwgb3IgcGFzc3dvcmQgaW5jb3JyZWN0JylcbiAgICB9XG5cbiAgfSlcbn1cblxuJHNjb3BlLm1ha2VVc2VyID0gZnVuY3Rpb24obmV3VXNlcil7XG4gIGxvZ2luU2VydmljZS5tYWtlVXNlcihuZXdVc2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAkYXV0aC5zZXRUb2tlbihyZXNwb25zZSlcbiAgICBhbGVydChcIm5ldyB1c2VyIGNyZWF0ZWRcIilcbiAgfSlcbn1cbiAgJHNjb3BlLmF1dGhlbnRpY2F0ZSA9IGZ1bmN0aW9uKHByb3ZpZGVyKSB7XG4gICRhdXRoLmF1dGhlbnRpY2F0ZShwcm92aWRlcil9O1xuICAvLyAkc2NvcGUudGVzdCA9IFwiSGVsbG8gZnJvbSBsb2dpbiBjb250cm9sbGVyXCJcblxuXG4gICRzY29wZS5yZXZlYWxlciA9IGZ1bmN0aW9uKCl7XG4gICRzY29wZS5oaWRlID0gISRzY29wZS5oaWRlO1xuIH1cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJtYWtlQ2hvcmVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxuICB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwic2V0UmV3YXJkc0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCwgJHN0YXRlLCB1c2VyU2VydmljZSwgJGF1dGgpe1xuICB2YXIgdXNlclRva2VuID0gJGF1dGguZ2V0UGF5bG9hZCgpO1xuICB1c2VyU2VydmljZS5nZXRVc2VySW5mbyA9IHVzZXJUb2tlbjtcbiAgJHNjb3BlLnVzZXIgPSB1c2VyVG9rZW4uc3ViO1xuICBjb25zb2xlLmxvZygkc2NvcGUudXNlcik7XG5cbiAgdmFyIGdldENoaWxkID0gZnVuY3Rpb24oKXtcbiAgICB1c2VyU2VydmljZS5nZXRDaGlsZCgkc3RhdGUucGFyYW1zLmlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICRzY29wZS5jaGlsZCA9IHJlc3BvbnNlWzBdXG4gICAgICBjb25zb2xlLmxvZygkc2NvcGUuY2hpbGQpO1xuICAgIH0pXG4gIH1cbiAgZ2V0Q2hpbGQoKVxuICB2YXIgZ2V0UmV3YXJkcyA9IGZ1bmN0aW9uKCl7XG4gICAgdXNlclNlcnZpY2UuZ2V0UmV3YXJkcygkc3RhdGUucGFyYW1zLmlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICRzY29wZS5yZXdhcmRzID0gcmVzcG9uc2U7XG4gICAgfSlcbiAgfVxuICBnZXRSZXdhcmRzKClcblxuICAkc2NvcGUucmVtb3ZlUmV3YXJkID0gZnVuY3Rpb24oaWQsaSl7XG4gICAgcmV3YXJkID0ge31cbiAgICB1c2VySWQgPSAkc3RhdGUucGFyYW1zLmlkO1xuICAgIHJld2FyZElkID0gaWQ7XG4gICAgdXNlclNlcnZpY2UucmVtb3ZlUmV3YXJkKHVzZXJJZCwgcmV3YXJkSWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApe1xuICAgICAgICAgICAgJHNjb3BlLnJld2FyZHMuc3BsaWNlKGksIDEpXG4gICAgICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAgJHNjb3BlLm1ha2VSZXdhcmQgPSBmdW5jdGlvbihuZXdSZXdhcmQpe1xuICAgICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZ2dsZWNoZWNrYm94XCIpLmNoZWNrZWQpe1xuICAgICAgIG5ld1Jld2FyZC51c2VyX2lkX2ZrID0gJHN0YXRlLnBhcmFtcy5pZDtcbiAgICAgICBuZXdSZXdhcmQudXNlcl9ob3VzZWhvbGRfZmsgPSAkc2NvcGUuY2hpbGQudXNlcl9ob3VzZWhvbGQ7XG4gICAgICAgdXNlclNlcnZpY2UubWFrZVJld2FyZChuZXdSZXdhcmQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApe1xuICAgICAgICAgICBnZXRSZXdhcmRzKClcbiAgICAgICAgICAgJHNjb3BlLmNsb3NlTW9kYWwoKVxuICAgICAgICAgfVxuICAgICAgIH0pXG4gICAgIH1cbiAgICAgZWxzZXtcbiAgICAgICB1c2VyU2VydmljZS5zaG93Y2hpbGQoJHNjb3BlLnVzZXIudXNlcl9ob3VzZWhvbGQpXG4gICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgIHZhciBjaGlsZHJlbiA9IFtdXG4gICAgICAgICBmb3IgKHZhciBpID0wOyBpIDwgcmVzLmRhdGEubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICBjaGlsZHJlbi5wdXNoKHJlcy5kYXRhW2ldLnVzZXJfaWRfcGspXG4gICAgICAgICB9XG4gICAgICAgICBjb25zb2xlLmxvZyhjaGlsZHJlbik7XG4gICAgICAgICB2YXIgY2FsbHM9W11cbiAgICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBjaGlsZHJlbi5sZW5ndGg7IGorKyl7XG5cbiAgICAgICAgICAgIGNhbGxzLnB1c2gob3V0ZXIoY2hpbGRyZW5bal0pKTtcbiAgICAgICAgIH1cbiAgICAgICAgIGNhbGxzLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCl7XG4gICAgICAgICAgICAgICBlbGVtZW50KClcbiAgICAgICAgICAgICB9KVxuICAgICAgIH0pXG4gICAgICAgZnVuY3Rpb24gb3V0ZXIoY2hpbGQpe1xuICAgICAgICAgY29uc29sZS5sb2coY2hpbGQpO1xuICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBpbm5lcigpe1xuICAgICAgICAgICAgICAgdmFyIHJld2FyZCA9IHt9O1xuICAgICAgICAgICAgICAgcmV3YXJkLnVzZXJfaWRfZmsgPSBjaGlsZDtcbiAgICAgICAgICAgICAgIHJld2FyZC51c2VyX2hvdXNlaG9sZF9mayA9ICRzY29wZS5jaGlsZC51c2VyX2hvdXNlaG9sZDtcbiAgICAgICAgICAgICAgIHJld2FyZC5yZXdhcmRfZGVzY3JpcHRpb24gPSBuZXdSZXdhcmQucmV3YXJkX2Rlc2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgcmV3YXJkLnJld2FyZF90b3RhbCA9IG5ld1Jld2FyZC5yZXdhcmRfdG90YWxcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJld2FyZCk7XG4gICAgICAgICAgICAgICAgdXNlclNlcnZpY2UubWFrZVJld2FyZChyZXdhcmQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5zdGF0dXMgPT09IDIwMCl7XG4gICAgICAgICAgICAgICAgICAgJHNjb3BlLmNsb3NlTW9kYWwoKVxuICAgICAgICAgICAgICAgICAgIGdldFJld2FyZHMoKVxuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgfVxuICAgICB9XG5cbiAgIH1cblxuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3Jld2FyZE1vZGFsLmh0bWwnLCB7XG4gICAgc2NvcGU6ICRzY29wZSxcbiAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICRzY29wZS5tb2RhbCA9IG1vZGFsO1xuICB9KTtcbiAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5zaG93KCk7XG4gIH07XG4gICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcbiAgfTtcbiAgLy8gQ2xlYW51cCB0aGUgbW9kYWwgd2hlbiB3ZSdyZSBkb25lIHdpdGggaXQhXG4gICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuICB9KTtcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gaGlkZSBtb2RhbFxuICAkc2NvcGUuJG9uKCdtb2RhbC5oaWRkZW4nLCBmdW5jdGlvbigpIHtcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxuICB9KTtcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gcmVtb3ZlIG1vZGFsXG4gICRzY29wZS4kb24oJ21vZGFsLnJlbW92ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxuICB9KTtcbiAgLy9iYWNrYnV0dG9uXG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxuICB9XG5cblxuXG59KVxuIiwiXG5hbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwic2V0dGluZ3NDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwsIHVzZXJTZXJ2aWNlLGxvZ2luU2VydmljZSwkYXV0aCwkc3RhdGUpe1xuXG4gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnY2hhbmdlUGFzc3dvcmQuaHRtbCcsIHtcbiAgICAgaWQ6ICcxJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWwxID0gbW9kYWw7XG4gICB9KTtcblxuICAgLy8gTW9kYWwgMlxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdjaGFuZ2VIb3VzZWhvbGQuaHRtbCcsIHtcbiAgICAgaWQ6ICcyJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWwyID0gbW9kYWw7XG4gICB9KTtcblxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdjaGFuZ2VaaXAuaHRtbCcsIHtcbiAgICAgaWQ6ICczJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWwzID0gbW9kYWw7XG4gICB9KTtcblxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdhZGRQYXJlbnQuaHRtbCcsIHtcbiAgICAgaWQ6ICc0JywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWw0ID0gbW9kYWw7XG4gICB9KTtcblxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdyZW1vdmVDaGlsZC5odG1sJywge1xuICAgICBpZDogJzUnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDUgPSBtb2RhbDtcbiAgIH0pO1xuXG5cblxuICAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgIGlmIChpbmRleCA9PSAxKSAkc2NvcGUub01vZGFsMS5zaG93KCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMikgJHNjb3BlLm9Nb2RhbDIuc2hvdygpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDMpICRzY29wZS5vTW9kYWwzLnNob3coKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSA0KSAkc2NvcGUub01vZGFsNC5zaG93KCk7XG4gICAgIGVsc2UgJHNjb3BlLm9Nb2RhbDUuc2hvdygpO1xuICAgfTtcblxuICAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICBpZiAoaW5kZXggPT0gMSkgJHNjb3BlLm9Nb2RhbDEuaGlkZSgpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDIpICRzY29wZS5vTW9kYWwyLmhpZGUoKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSAzKSAkc2NvcGUub01vZGFsMy5oaWRlKCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gNCkgJHNjb3BlLm9Nb2RhbDQuaGlkZSgpO1xuICAgICBlbHNlICRzY29wZS5vTW9kYWw1LmhpZGUoKTtcbiAgIH07XG5cbiAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICRzY29wZS5vTW9kYWwxLnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsMi5yZW1vdmUoKTtcbiAgICAgJHNjb3BlLm9Nb2RhbDMucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWw0LnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsNS5yZW1vdmUoKTtcbiAgIH0pO1xuXG52YXIgdXNlckluZm8gPSAkYXV0aC5nZXRQYXlsb2FkKCkuc3ViO1xuXG5jb25zb2xlLmxvZyh1c2VySW5mbyk7XG5cblxuJHNjb3BlLnN1Ym1pdFBhc3N3b3JkID0gZnVuY3Rpb24odXNlcil7XG4gIGNvbnNvbGUubG9nKHVzZXJJbmZvLnVzZXJfaWRfcGspO1xuICB1c2VyU2VydmljZS51cGRhdGVQYXNzd29yZCh1c2VySW5mby51c2VyX2lkX3BrLHVzZXIudXNlcl9uZXdfcGFzc3dvcmQpXG4gIC50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gICAgJHNjb3BlLmNsb3NlTW9kYWwoMSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvbGQtcGFzc3dvcmRcIikudmFsdWUgPSAnJztcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctcGFzc3dvcmRcIikudmFsdWUgPSAnJztcbiAgfSk7XG5cbn07XG5cbiRzY29wZS5zdWJtaXRIb3VzZWhvbGQgPSBmdW5jdGlvbihob3VzZSl7XG4gIHVzZXJTZXJ2aWNlLnVwZGF0ZUhvdXNlaG9sZCh1c2VySW5mby51c2VyX2hvdXNlaG9sZCxob3VzZSlcbiAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgJHNjb3BlLmNsb3NlTW9kYWwoMik7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1cGRhdGUtaG91c2Vob2xkXCIpLnZhbHVlID0nJztcbiAgfSk7XG59O1xuXG4kc2NvcGUuc3VibWl0WmlwQ29kZSA9IGZ1bmN0aW9uKHppcGNvZGUpe1xuICB1c2VyU2VydmljZS51cGRhdGV6aXAodXNlckluZm8udXNlcl9ob3VzZWhvbGQsemlwY29kZSlcbiAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAkc2NvcGUuY2xvc2VNb2RhbCgzKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVwZGF0ZS16aXBcIikudmFsdWUgPScnO1xuXG4gIH0pO1xufTtcblxuJHNjb3BlLmNyZWF0ZVBhcmVudCA9IGZ1bmN0aW9uKHVzZXIpe1xuICB1c2VyLnppcGNvZGUgPSB1c2VySW5mby56aXA7XG4gIHVzZXIuaG91c2Vob2xkID0gdXNlckluZm8udXNlcl9ob3VzZWhvbGQ7XG4gIGxvZ2luU2VydmljZS5tYWtlVXNlcih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAkYXV0aC5zZXRUb2tlbihyZXNwb25zZSk7XG4gICAgICAkc2NvcGUuY2xvc2VNb2RhbCg0KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2V0dGluZy1wYXJlbnQtZmlyc3RcIikudmFsdWUgPScnO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZXR0aW5nLXBhcmVudC1sYXN0XCIpLnZhbHVlID0nJztcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2V0dGluZy1lbWFpbFwiKS52YWx1ZSA9Jyc7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNldHRpbmctcGFzc3dvcmRcIikudmFsdWUgPScnO1xuXG4gIH0pO1xufTtcblxuJHNjb3BlLmdldENoaWxkID0gZnVuY3Rpb24oKXtcbiAgY29uc29sZS5sb2coJ2ZpcmVkJyk7XG51c2VyU2VydmljZS5zaG93Y2hpbGQodXNlckluZm8udXNlcl9ob3VzZWhvbGQpXG4udGhlbihmdW5jdGlvbihyZXMpe1xuICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4gICRzY29wZS5zaG93Y2hpbGQgPSByZXMuZGF0YTtcbn0pO1xufTtcbnZhciByZW1vdmVDaGlsZCA9IFtdO1xuXG4kc2NvcGUubG9nZ2VyPSBmdW5jdGlvbihpbmRleCl7XG4gICRzY29wZS5zaG93Y2hpbGRbaW5kZXhdLnNlbGVjdGVkID0gISRzY29wZS5zaG93Y2hpbGRbaW5kZXhdLnNlbGVjdGVkO1xuICAkc2NvcGUucmVtb3ZlQ2hpbGQoaW5kZXgpO1xuICBjb25zb2xlLmxvZyhpbmRleCk7XG59XG5cbiRzY29wZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uKGluZGV4KXtcbiRzY29wZS5zaG93Y2hpbGRbaW5kZXhdLnNlbGVjdGVkID0gISRzY29wZS5zaG93Y2hpbGRbaW5kZXhdLnNlbGVjdGVkO1xuICB2YXIgc2VsZWN0ZWRDaGlsZCA9ICRzY29wZS5zaG93Y2hpbGRbaW5kZXhdLnVzZXJfaWRfcGs7XG4gIGlmKCRzY29wZS5zaG93Y2hpbGRbaW5kZXhdLnNlbGVjdGVkKXtcbiAgICAgIHJlbW92ZUNoaWxkLnB1c2goc2VsZWN0ZWRDaGlsZCk7XG4gIH1lbHNle1xuICAgIHZhciBpID0gcmVtb3ZlQ2hpbGQuaW5kZXhPZihzZWxlY3RlZENoaWxkKTtcbiAgICByZW1vdmVDaGlsZC5zcGxpY2UoaSwxKTtcbiAgfVxufVxuXG4kc2NvcGUuZGVsZXRlQ2hpbGQgPSBmdW5jdGlvbigpe1xuICBjb25zb2xlLmxvZyhyZW1vdmVDaGlsZCk7XG4gIHJlbW92ZUNoaWxkLmZvckVhY2goZnVuY3Rpb24odmFsKXtcbiAgICB1c2VyU2VydmljZS5kZWxldGVDaGlsZCh2YWwpXG4gICAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcblxuICAgIH0pO1xuICB9XG4pXG5yZW1vdmVDaGlsZCA9IFtdO1xuJHNjb3BlLmNsb3NlTW9kYWwoNSk7XG59XG5cbiRzY29wZS5sb2dvdXQgPSBmdW5jdGlvbigpe1xuICAkYXV0aC5sb2dvdXQoKVxuICAkc3RhdGUuZ28oJ2xvZ2luJylcbn1cblxufSk7IC8vIGVuZCBvZiBjb250cm9sbGVyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwidHJhY2tlckN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCwgJHN0YXRlLCB1c2VyU2VydmljZSl7XG4gICAgdmFyIGdldENoaWxkID0gZnVuY3Rpb24oKXtcbiAgICAgIHVzZXJTZXJ2aWNlLmdldENoaWxkKCRzdGF0ZS5wYXJhbXMuaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICAkc2NvcGUuY2hpbGQgPSByZXNwb25zZVswXVxuICAgICAgfSlcbiAgICB9XG4gICAgZ2V0Q2hpbGQoKVxuXG4gICAgXG4gICAgICB1c2VyU2VydmljZS5nZXREYWlseUNob3Jlcygkc3RhdGUucGFyYW1zLmlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgJHNjb3BlLmRhaWx5Q2hvcmVzID0gcmVzcG9uc2U7XG4gICAgICB9KTtcblxuICAgICAgdXNlclNlcnZpY2UuZ2V0V2Vla2x5Q2hvcmVzKCRzdGF0ZS5wYXJhbXMuaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICAkc2NvcGUud2Vla2x5Q2hvcmVzID0gcmVzcG9uc2U7XG4gICAgICB9KTtcblxuICAgICAgdXNlclNlcnZpY2UuZ2V0TW9udGhseUNob3Jlcygkc3RhdGUucGFyYW1zLmlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgJHNjb3BlLm1vbnRobHlDaG9yZXMgPSByZXNwb25zZTtcbiAgICAgIH0pO1xuXG4gICAgICAkc2NvcGUuY29uZmlybUNob3JlID0gZnVuY3Rpb24oY2hvcmVJRCwgaW5kZXgsIHNjb3BlKXtcbiAgICAgICAgIHVzZXJTZXJ2aWNlLmNvbmZpcm1DaG9yZShjaG9yZUlEKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgICBpZihyZXNwb25zZS5zdGF0dXMgPT09IDIwMCl7XG4gICAgICAgICAgICAgICAgaWYoc2NvcGUuY2hvcmVfZGFpbHkpe1xuICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhaWx5Q2hvcmVzLnNwbGljZShpbmRleCwgMSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoc2NvcGUuY2hvcmVfd2Vla2x5KXtcbiAgICAgICAgICAgICAgICAgICRzY29wZS53ZWVrbHlDaG9yZXMuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihzY29wZS5jaG9yZV9tb250aGx5KXtcbiAgICAgICAgICAgICAgICAgICRzY29wZS5tb250aGx5Q2hvcmVzLnNwbGljZShpbmRleCwgMSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgJHNjb3BlLmRlbnlDaG9yZSA9IGZ1bmN0aW9uKGNob3JlSUQsIGluZGV4LCBzY29wZSl7XG4gICAgICAgIHVzZXJTZXJ2aWNlLmRlbnlDaG9yZShjaG9yZUlEKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKXtcbiAgICAgICAgICAgICAgIGlmKHNjb3BlLmNob3JlX2RhaWx5KXtcbiAgICAgICAgICAgICAgICAgJHNjb3BlLmRhaWx5Q2hvcmVzW2luZGV4XS5jaG9yZV9zdGF0dXMgPSBmYWxzZVxuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgaWYoc2NvcGUuY2hvcmVfd2Vla2x5KXtcbiAgICAgICAgICAgICAgICAgJHNjb3BlLndlZWtseUNob3Jlc1tpbmRleF0uY2hvcmVfc3RhdHVzID0gZmFsc2VcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIGlmKHNjb3BlLmNob3JlX21vbnRobHkpe1xuICAgICAgICAgICAgICAgICAkc2NvcGUubW9udGhseUNob3Jlc1tpbmRleF0uY2hvcmVfc3RhdHVzID0gZmFsc2VcbiAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICAkc2NvcGUucmVtb3ZlQ2hvcmUgPSBmdW5jdGlvbihjaG9yZUlELCBpbmRleCwgc2NvcGUpe1xuICAgICAgICB1c2VyU2VydmljZS5yZW1vdmVDaG9yZShjaG9yZUlEKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKXtcbiAgICAgICAgICAgICAgIGlmKHNjb3BlLmNob3JlX2RhaWx5KXtcbiAgICAgICAgICAgICAgICAgJHNjb3BlLmRhaWx5Q2hvcmVzLnNwbGljZShpbmRleCwgMSlcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIGlmKHNjb3BlLmNob3JlX3dlZWtseSl7XG4gICAgICAgICAgICAgICAgICRzY29wZS53ZWVrbHlDaG9yZXMuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgaWYoc2NvcGUuY2hvcmVfbW9udGhseSl7XG4gICAgICAgICAgICAgICAgICRzY29wZS5tb250aGx5Q2hvcmVzLnNwbGljZShpbmRleCwgMSlcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgJHNjb3BlLnJlZHVjZVBvaW50cyA9IGZ1bmN0aW9uKHBvaW50cyl7XG4gICAgICAgIHZhciBpZCA9ICRzY29wZS5jaGlsZC51c2VyX2lkX3BrXG4gICAgICAgIHVzZXJTZXJ2aWNlLnJlZHVjZVBvaW50cyhpZCwgcG9pbnRzKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgICBjb25zb2xlLmxvZygndXBkYXRlZCcpO1xuICAgICAgICB9KVxuICAgICAgfVxuXG5cbiAgICB9KTsvL2VuZCBvZiBjb250b2xsZXJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJ1c2VySW5mb0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gaW5mbyBjb250cm9sbGVyXCJcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLnNlcnZpY2UoXCJjaG9yZVNlcnZpY2VcIiwgZnVuY3Rpb24oJGh0dHAsJHEsJGF1dGgpe1xuXG50aGlzLmdldFVzZXJJbmZvID0gJGF1dGguZ2V0UGF5bG9hZCgpO1xuXG5cbnRoaXMuZ2V0Q2hpbGRyZW4gPSBmdW5jdGlvbihob3VzZWhvbGQpe1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDpcIkdFVFwiLFxuICAgIHVybDpcImh0dHA6Ly9jaG9yZWNoZWNrb2ZmLmNvbS9jaGlsZHJlbi9cIiArIGhvdXNlaG9sZFxuICB9KVxufVxuXG50aGlzLmNyZWF0ZUNob3JlID0gZnVuY3Rpb24oY2hvcmUpe1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDpcIlBPU1RcIixcbiAgICB1cmw6XCJodHRwOi8vY2hvcmVjaGVja29mZi5jb20vYXNzaWduY2hvcmVcIixcbiAgICBkYXRhOmNob3JlXG4gIH0pXG59XG5cblxuXG5cbn0pLy9lbmQgb2Ygc2VydmljZVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuc2VydmljZSgnbG9naW5TZXJ2aWNlJywgZnVuY3Rpb24oJGh0dHApe1xuXG5cbiAgdGhpcy51c2VyTG9naW4gPSBmdW5jdGlvbih1c2VyKSB7XG4gICAgY29uc29sZS5sb2codXNlciwgXCJzZXJ2aWNlXCIpXG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB1cmw6ICdodHRwOi8vY2hvcmVjaGVja29mZi5jb20vYXV0aC9sb2dpbicsXG4gICAgICBkYXRhOiB1c2VyXG4gICAgfSkudGhlbihmdW5jdGlvbihyZXMpe1xuICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfSlcbiAgfVxuICB0aGlzLm1ha2VVc2VyID0gZnVuY3Rpb24obmV3VXNlcikge1xuICAgIGNvbnNvbGUubG9nKG5ld1VzZXIpO1xuICAgIHJldHVybiAkaHR0cCh7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgdXJsOiAnaHR0cDovL2Nob3JlY2hlY2tvZmYuY29tL2F1dGgvc2lnbnVwJyxcbiAgICAgIGRhdGE6IG5ld1VzZXJcbiAgICB9KVxuICB9XG59KSAvLyBlbmQgb2Ygc2VydmljZVxuIl19
