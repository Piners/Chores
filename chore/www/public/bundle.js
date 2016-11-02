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

  this.getDefaultChores = function () {
    return $http({
      method: "GET",
      url: "/defaultchores"
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

  this.addChild = function (child) {
    console.log(JSON.stringify(child));
    return $http({
      method: "POST",
      url: "/children",
      data: child
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

  choreService.getDefaultChores().then(function (res) {
    $scope.chores = res.data;
    console.log(res.data);
  });
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

angular.module('chore').controller("childBankCtrl", function ($scope) {
  $scope.theme = 'water'; //load user theme

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
'use strict';

angular.module('chore').controller("childHomeCtrl", function ($scope, $ionicModal, $auth, userService) {
  // $scope.test = "Message from  child Home controller"
  //var userToken = userService.getUserInfo.sub;

  var userToken = $auth.getPayload();
  userService.getUserInfo = userToken;
  var user = userToken.sub;

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

  $scope.theme = user.user_theme;
  console.log(user);

  $scope.setTheme = function (choice) {
    //service.setTheme(choice).then(function(response){
    //if(response.status === 200){
    $scope.theme = choice;
    //  }
    //  })
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

angular.module('chore').controller("homeCtrl", function ($scope, $ionicModal, userService, $window) {
  var userToken = userService.getUserInfo.sub;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInNlcnZpY2UvY2hvcmVTZXJ2aWNlLmpzIiwic2VydmljZS9sb2dpblNlcnZpY2UuanMiLCJzZXJ2aWNlL3VzZXJTZXJ2aWNlLmpzIiwiY29udHJvbGxlcnMvYWRkQ2hpbGRDdHJsLmpzIiwiY29udHJvbGxlcnMvYXNzaWduQ2hvcmVDdHJsLmpzIiwiY29udHJvbGxlcnMvY2FtZXJhQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NoaWxkQmFua0N0cmwuanMiLCJjb250cm9sbGVycy9jaGlsZEhvbWVDdHJsLmpzIiwiY29udHJvbGxlcnMvY2hpbGRMb2dpbkN0cmwuanMiLCJjb250cm9sbGVycy9lZGl0Q2hpbGRDdHJsLmpzIiwiY29udHJvbGxlcnMvaGlzdG9yeUN0cmwuanMiLCJjb250cm9sbGVycy9ob21lQ3RybC5qcyIsImNvbnRyb2xsZXJzL2xvZ2luQ3RybC5qcyIsImNvbnRyb2xsZXJzL21ha2VDaG9yZUN0cmwuanMiLCJjb250cm9sbGVycy9zZXRSZXdhcmRzQ3RybC5qcyIsImNvbnRyb2xsZXJzL3NldHRpbmdzQ3RybC5qcyIsImNvbnRyb2xsZXJzL3RyYWNrZXJDdHJsLmpzIiwiY29udHJvbGxlcnMvdXNlckluZm9DdHJsLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsIiR1cmxSb3V0ZXJQcm92aWRlciIsIiRhdXRoUHJvdmlkZXIiLCJvdGhlcndpc2UiLCJzdGF0ZSIsInVybCIsInRlbXBsYXRlVXJsIiwiY29udHJvbGxlciIsImZhY2Vib29rIiwiY2xpZW50SWQiLCJyZXNwb25zZVR5cGUiLCJnb29nbGUiLCJydW4iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5Iiwid2luZG93IiwiY29yZG92YSIsInBsdWdpbnMiLCJLZXlib2FyZCIsImhpZGVLZXlib2FyZEFjY2Vzc29yeUJhciIsImRpc2FibGVTY3JvbGwiLCJTdGF0dXNCYXIiLCJzdHlsZURlZmF1bHQiLCJzZXJ2aWNlIiwiJGh0dHAiLCIkcSIsIiRhdXRoIiwiZ2V0VXNlckluZm8iLCJnZXRQYXlsb2FkIiwiZ2V0RGVmYXVsdENob3JlcyIsIm1ldGhvZCIsInVzZXJMb2dpbiIsInVzZXIiLCJjb25zb2xlIiwibG9nIiwiZGF0YSIsIm1ha2VVc2VyIiwibmV3VXNlciIsImJhbm5lciIsInBvc3RiYW5uZXIiLCJ1c2VyX2Jhbm5lcl9pbWFnZSIsInVzZXJfaG91c2Vob2xkIiwiSlNPTiIsInN0cmluZ2lmeSIsImdldGJhbm5lciIsInVzZXJJZCIsImdldFdlYXRoZXIiLCJhZGRDaGlsZCIsImNoaWxkIiwiJHNjb3BlIiwidXNlclNlcnZpY2UiLCIkc3RhdGUiLCJnb2JhY2siLCJoaXN0b3J5IiwiZ28iLCJzdWIiLCJzdWJtaXRDaGlsZCIsInRoZW4iLCJyZXMiLCJjaG9yZVNlcnZpY2UiLCJjdXJyZW50VXNlciIsImNob3JlcyIsIiRjb3Jkb3ZhQ2FtZXJhIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiJGNvcmRvdmFQbHVnaW4iLCJzb21lRnVuY3Rpb24iLCJzdWNjZXNzIiwiZXJyb3IiLCJ0YWtlUGljdHVyZSIsIm9wdGlvbnMiLCJxdWFsaXR5IiwiZGVzdGluYXRpb25UeXBlIiwiQ2FtZXJhIiwiRGVzdGluYXRpb25UeXBlIiwiREFUQV9VUkwiLCJzb3VyY2VUeXBlIiwiUGljdHVyZVNvdXJjZVR5cGUiLCJDQU1FUkEiLCJhbGxvd0VkaXQiLCJlbmNvZGluZ1R5cGUiLCJFbmNvZGluZ1R5cGUiLCJKUEVHIiwidGFyZ2V0V2lkdGgiLCJ0YXJnZXRIZWlnaHQiLCJwb3BvdmVyT3B0aW9ucyIsIkNhbWVyYVBvcG92ZXJPcHRpb25zIiwic2F2ZVRvUGhvdG9BbGJ1bSIsImNvcnJlY3RPcmllbnRhdGlvbiIsImdldFBpY3R1cmUiLCJpbWFnZURhdGEiLCJpbWdVUkkiLCJlcnIiLCJ0aGVtZSIsInNldFRoZW1lIiwidGhlbWVJbWFnZSIsIiRpb25pY01vZGFsIiwidXNlclRva2VuIiwiZnJvbVRlbXBsYXRlVXJsIiwiaWQiLCJzY29wZSIsImJhY2tkcm9wQ2xpY2tUb0Nsb3NlIiwiYW5pbWF0aW9uIiwibW9kYWwiLCJvTW9kYWwxIiwib3Blbk1vZGFsIiwiaW5kZXgiLCJzaG93Iiwib01vZGFsMiIsImNsb3NlTW9kYWwiLCJoaWRlIiwiJG9uIiwicmVtb3ZlIiwidXNlcl90aGVtZSIsImNob2ljZSIsImxvZ2luU2VydmljZSIsImxvZ2luQ2hpbGQiLCJyZXNwb25zZSIsInNldFRva2VuIiwidGVzdCIsIiR3aW5kb3ciLCJzdWJtaXRCYW5uZXIiLCJiYW5uZXJJbmZvIiwiZ2V0RWxlbWVudEJ5SWQiLCJ2YWx1ZSIsImxvY2F0aW9uIiwicmVsb2FkIiwiaG91c2Vob2xkIiwiemlwIiwid2VhdGhlciIsImxvZ2luIiwiYXV0aGVudGljYXRlIiwicHJvdmlkZXIiLCJyZXZlYWxlciIsIm9Nb2RhbDMiLCJvTW9kYWw0Iiwib01vZGFsNSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUFBLFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCLENBQUMsT0FBRCxFQUFVLFlBQVYsQ0FBeEIsRUFDQ0MsTUFERCxDQUNRLFVBQVNDLGNBQVQsRUFBeUJDLGtCQUF6QixFQUE2Q0MsYUFBN0MsRUFBMkQ7QUFDakVELHFCQUFtQkUsU0FBbkIsQ0FBNkIsYUFBN0I7QUFDQUgsaUJBQ0NJLEtBREQsQ0FDTyxVQURQLEVBQ2tCO0FBQ2hCQyxTQUFJLFdBRFk7QUFFaEJDLGlCQUFhLDJCQUZHO0FBR2hCQyxnQkFBWTtBQUhJLEdBRGxCLEVBTUNILEtBTkQsQ0FNTyxhQU5QLEVBTXFCO0FBQ25CQyxTQUFJLGNBRGU7QUFFbkJDLGlCQUFhLDhCQUZNO0FBR25CQyxnQkFBWTtBQUhPLEdBTnJCLEVBV0NILEtBWEQsQ0FXTyxXQVhQLEVBV21CO0FBQ2pCQyxTQUFJLGdCQURhO0FBRWpCQyxpQkFBYSw0QkFGSTtBQUdqQkMsZ0JBQVk7QUFISyxHQVhuQixFQWdCQ0gsS0FoQkQsQ0FnQk8sU0FoQlAsRUFnQmlCO0FBQ2ZD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QVgsRUFBNEIsWUFBVztBQUNyQztBQUNELEdBRkQ7QUFJRCxDQTFCRDs7O0FDQUFsSCxRQUFRQyxNQUFSLENBQWUsT0FBZixFQUF3QlMsVUFBeEIsQ0FBbUMsY0FBbkMsRUFBbUQsVUFBUzBDLE1BQVQsRUFBZ0I7QUFDaEVBLFVBQU9zRSxJQUFQLEdBQWMsOEJBQWQ7QUFFRixDQUhEIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIElvbmljIFN0YXJ0ZXIgQXBwXHJcblxyXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xyXG4vLyAnc3RhcnRlcicgaXMgdGhlIG5hbWUgb2YgdGhpcyBhbmd1bGFyIG1vZHVsZSBleGFtcGxlIChhbHNvIHNldCBpbiBhIDxib2R5PiBhdHRyaWJ1dGUgaW4gaW5kZXguaHRtbClcclxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ2Nob3JlJywgWydpb25pYycsICdzYXRlbGxpemVyJ10pXHJcbi5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJGF1dGhQcm92aWRlcil7XHJcbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShcIi9jaGlsZC9ob21lXCIpO1xyXG4gICRzdGF0ZVByb3ZpZGVyXHJcbiAgLnN0YXRlKCdhZGRDaGlsZCcse1xyXG4gICAgdXJsOlwiL2FkZENoaWxkXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9hZGRDaGlsZC5odG1sXCIsXHJcbiAgICBjb250cm9sbGVyOiBcImFkZENoaWxkQ3RybFwiXHJcbiAgfSlcclxuICAuc3RhdGUoJ2Fzc2lnbkNob3JlJyx7XHJcbiAgICB1cmw6XCIvYXNzaWduQ2hvcmVcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2Fzc2lnbkNob3JlLmh0bWxcIixcclxuICAgIGNvbnRyb2xsZXI6IFwiYXNzaWduQ2hvcmVDdHJsXCJcclxuICB9KVxyXG4gIC5zdGF0ZSgnZWRpdENoaWxkJyx7XHJcbiAgICB1cmw6XCIvZWRpdENoaWxkLzppZFwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvZWRpdENoaWxkLmh0bWxcIixcclxuICAgIGNvbnRyb2xsZXI6IFwiZWRpdENoaWxkQ3RybFwiXHJcbiAgfSlcclxuICAuc3RhdGUoJ2hpc3RvcnknLHtcclxuICAgIHVybDpcIi9oaXN0b3J5XCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9oaXN0b3J5Lmh0bWxcIixcclxuICAgIGNvbnRyb2xsZXI6IFwiaGlzdG9yeUN0cmxcIlxyXG4gIH0pXHJcbiAgLnN0YXRlKCdob21lJyx7XHJcbiAgICB1cmw6XCIvaG9tZVwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvaG9tZS5odG1sXCIsXHJcbiAgICBjb250cm9sbGVyOiBcImhvbWVDdHJsXCJcclxuICB9KVxyXG4gIC5zdGF0ZSgnbG9naW4nLHtcclxuICAgIHVybDpcIi9sb2dpblwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvTG9naW4uaHRtbFwiLFxyXG4gICAgY29udHJvbGxlcjogXCJsb2dpbkN0cmxcIlxyXG4gIH0pXHJcbiAgLnN0YXRlKCdtYWtlQ2hvcmUnLHtcclxuICAgIHVybDpcIi9tYWtlQ2hvcmVcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL21ha2VDaG9yZS5odG1sXCIsXHJcbiAgICBjb250cm9sbGVyOiBcIm1ha2VDaG9yZUN0cmxcIlxyXG4gIH0pXHJcbiAgLnN0YXRlKCdzZXRSZXdhcmRzJyx7XHJcbiAgICB1cmw6XCIvc2V0UmV3YXJkcy86aWRcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL3NldFJld2FyZHMuaHRtbFwiLFxyXG4gICAgY29udHJvbGxlcjogXCJzZXRSZXdhcmRzQ3RybFwiXHJcbiAgfSlcclxuICAuc3RhdGUoJ3NldHRpbmdzJyx7XHJcbiAgICB1cmw6XCIvc2V0dGluZ3NcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL3NldHRpbmdzLmh0bWxcIixcclxuICAgIGNvbnRyb2xsZXI6IFwic2V0dGluZ3NDdHJsXCJcclxuICB9KVxyXG4gIC5zdGF0ZSgndHJhY2tlcicse1xyXG4gICAgdXJsOlwiL3RyYWNrZXIvOmlkXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy90cmFja2VyLmh0bWxcIixcclxuICAgIGNvbnRyb2xsZXI6IFwidHJhY2tlckN0cmxcIlxyXG4gIH0pXHJcbiAgLnN0YXRlKCd1c2VySW5mbycse1xyXG4gICAgdXJsOlwiL3VzZXJJbmZvXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy91c2VySW5mby5odG1sXCIsXHJcbiAgICBjb250cm9sbGVyOiBcInVzZXJJbmZvQ3RybFwiXHJcbiAgfSlcclxuICAuc3RhdGUoJ2NoaWxkQmFuaycse1xyXG4gICAgdXJsOlwiL2NoaWxkL2JhbmtcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2NoaWxkQmFuay5odG1sXCIsXHJcbiAgICBjb250cm9sbGVyOiBcImNoaWxkQmFua0N0cmxcIlxyXG4gIH0pXHJcbiAgLnN0YXRlKCdjaGlsZEhvbWUnLHtcclxuICAgIHVybDpcIi9jaGlsZC9ob21lXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9jaGlsZEhvbWUuaHRtbFwiLFxyXG4gICAgY29udHJvbGxlcjogXCJjaGlsZEhvbWVDdHJsXCJcclxuICB9KVxyXG4gIC5zdGF0ZSgnY2hpbGRMb2dpbicse1xyXG4gICAgdXJsOlwiL2NoaWxkL2xvZ2luXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9jaGlsZExvZ2luLmh0bWxcIixcclxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRMb2dpbkN0cmxcIlxyXG4gIH0pXHJcblxyXG4gICRhdXRoUHJvdmlkZXIuZmFjZWJvb2soe1xyXG4gICAgY2xpZW50SWQ6ICczMzIyNzIwNTcxMzI2ODEnXHJcbiAgfSk7XHJcblxyXG4gIC8vIE9wdGlvbmFsOiBGb3IgY2xpZW50LXNpZGUgdXNlIChJbXBsaWNpdCBHcmFudCksIHNldCByZXNwb25zZVR5cGUgdG8gJ3Rva2VuJyAoZGVmYXVsdDogJ2NvZGUnKVxyXG4gICRhdXRoUHJvdmlkZXIuZmFjZWJvb2soe1xyXG4gICAgY2xpZW50SWQ6ICczMzIyNzIwNTcxMzI2ODEnLFxyXG4gICAgcmVzcG9uc2VUeXBlOiAndG9rZW4nXHJcbiAgfSk7XHJcblxyXG4gICRhdXRoUHJvdmlkZXIuZ29vZ2xlKHtcclxuICAgIGNsaWVudElkOiAnMjc1MzUyOTYwOTQ2LTVyY2FuM3FraGxzYzdtNTBoZXY1ZG4yZTJjYWU5bWJwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tJyxcclxuICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODEwMC8jL2xvZ2luLydcclxuICB9KTtcclxufSlcclxuXHJcblxyXG5cclxuLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xyXG4gICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgaWYod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xyXG4gICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXHJcbiAgICAgIC8vIGZvciBmb3JtIGlucHV0cylcclxuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcclxuXHJcbiAgICAgIC8vIERvbid0IHJlbW92ZSB0aGlzIGxpbmUgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZy4gSXQgc3RvcHMgdGhlIHZpZXdwb3J0XHJcbiAgICAgIC8vIGZyb20gc25hcHBpbmcgd2hlbiB0ZXh0IGlucHV0cyBhcmUgZm9jdXNlZC4gSW9uaWMgaGFuZGxlcyB0aGlzIGludGVybmFsbHkgZm9yXHJcbiAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxyXG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbCh0cnVlKTtcclxuICAgIH1cclxuICAgIGlmKHdpbmRvdy5TdGF0dXNCYXIpIHtcclxuICAgICAgU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KVxyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5zZXJ2aWNlKFwiY2hvcmVTZXJ2aWNlXCIsIGZ1bmN0aW9uKCRodHRwLCRxLCRhdXRoKXtcclxuXHJcbnRoaXMuZ2V0VXNlckluZm8gPSAkYXV0aC5nZXRQYXlsb2FkKCk7XHJcblxyXG5cclxudGhpcy5nZXREZWZhdWx0Q2hvcmVzID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gJGh0dHAoe1xyXG4gICAgbWV0aG9kOlwiR0VUXCIsXHJcbiAgICB1cmw6XCIvZGVmYXVsdGNob3Jlc1wiXHJcbiAgfSlcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbn0pLy9lbmQgb2Ygc2VydmljZVxyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5zZXJ2aWNlKCdsb2dpblNlcnZpY2UnLCBmdW5jdGlvbigkaHR0cCl7XHJcblxyXG5cclxuICB0aGlzLnVzZXJMb2dpbiA9IGZ1bmN0aW9uKHVzZXIpIHtcclxuICAgIGNvbnNvbGUubG9nKHVzZXIsIFwic2VydmljZVwiKVxyXG4gICAgcmV0dXJuICRodHRwKHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgdXJsOiAnL2F1dGgvbG9naW4nLFxyXG4gICAgICBkYXRhOiB1c2VyXHJcbiAgICB9KVxyXG4gIH1cclxuICB0aGlzLm1ha2VVc2VyID0gZnVuY3Rpb24obmV3VXNlcikge1xyXG4gICAgcmV0dXJuICRodHRwKHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgdXJsOiAnL2F1dGgvc2lnbnVwJyxcclxuICAgICAgZGF0YTogbmV3VXNlclxyXG4gICAgfSlcclxuICB9XHJcbn0pIC8vIGVuZCBvZiBzZXJ2aWNlXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLnNlcnZpY2UoJ3VzZXJTZXJ2aWNlJywgZnVuY3Rpb24oJGh0dHAsJHEsJGF1dGgpe1xyXG5cclxudmFyIGJhbm5lcjtcclxudGhpcy5nZXRVc2VySW5mbztcclxuXHJcblxyXG50aGlzLnBvc3RiYW5uZXIgPSBmdW5jdGlvbihiYW5uZXIpe1xyXG4gIGNvbnNvbGUubG9nKGJhbm5lcik7XHJcbiAgY29uc29sZS5sb2coYmFubmVyLnVzZXJfYmFubmVyX2ltYWdlKTtcclxuICByZXR1cm4gJGh0dHAoe1xyXG4gICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgdXJsOlwiL2Jhbm5lci9cIiArIGJhbm5lci51c2VyX2hvdXNlaG9sZCxcclxuICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHt1c2VyX2Jhbm5lcl9pbWFnZTpiYW5uZXIudXNlcl9iYW5uZXJfaW1hZ2V9KVxyXG4gIH0pXHJcbn1cclxuXHJcbnRoaXMuZ2V0YmFubmVyID0gZnVuY3Rpb24odXNlcklkKXtcclxuICBjb25zb2xlLmxvZyh1c2VySWQpO1xyXG4gIHJldHVybiAkaHR0cCh7XHJcbiAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICB1cmw6XCIvYmFubmVyL1wiICsgdXNlcklkXHJcbiAgfSlcclxufVxyXG5cclxuXHJcbnRoaXMuZ2V0V2VhdGhlciA9IGZ1bmN0aW9uKCl7XHJcbnJldHVybiAkaHR0cCh7XHJcbiAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICB1cmw6J2h0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT16aXA9ODQwMTAmdW5pdHM9aW1wZXJpYWwmYXBwaWQ9YzEwZWY5OWM1YWZkZWUzZmRmYmE3OGU4Yzk4MWE5YjYnXHJcbiAgfSlcclxuXHJcbn07XHJcblxyXG50aGlzLmFkZENoaWxkID0gZnVuY3Rpb24oY2hpbGQpe1xyXG4gIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGNoaWxkKSk7XHJcbiAgcmV0dXJuICRodHRwKHtcclxuICAgIG1ldGhvZDpcIlBPU1RcIixcclxuICAgIHVybDpcIi9jaGlsZHJlblwiLFxyXG4gICAgZGF0YTogY2hpbGRcclxuICB9KVxyXG59XHJcblxyXG5cclxuXHJcblxyXG59KTsvL2VuZCBvZiBzZXJ2aWNlXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJhZGRDaGlsZEN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLHVzZXJTZXJ2aWNlLCRzdGF0ZSl7XHJcbiAgLy9iYWNrYnV0dG9uXHJcbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5nbygtMSlcclxuICB9XHJcbnZhciB1c2VyID0gdXNlclNlcnZpY2UuZ2V0VXNlckluZm8uc3ViO1xyXG5jb25zb2xlLmxvZyh1c2VyKTtcclxuJHNjb3BlLnN1Ym1pdENoaWxkID0gZnVuY3Rpb24oY2hpbGQpe1xyXG4gIGNoaWxkLnVzZXJfaG91c2Vob2xkID0gdXNlci51c2VyX2hvdXNlaG9sZDtcclxuICBjb25zb2xlLmxvZyhjaGlsZCk7XHJcbiAgdXNlclNlcnZpY2UuYWRkQ2hpbGQoY2hpbGQpXHJcbiAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcclxuICAgICRzdGF0ZS5nbygnaG9tZScpO1xyXG4gIH0pO1xyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbn0pIC8vZW5kIG9mIGNvbnRyb2xsZXJcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImFzc2lnbkNob3JlQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsY2hvcmVTZXJ2aWNlLCRzdGF0ZSl7XHJcblxyXG52YXIgY3VycmVudFVzZXIgPSBjaG9yZVNlcnZpY2UuZ2V0VXNlckluZm8uc3ViO1xyXG5cclxuXHJcbmNob3JlU2VydmljZS5nZXREZWZhdWx0Q2hvcmVzKClcclxuLnRoZW4oZnVuY3Rpb24ocmVzKXtcclxuICAkc2NvcGUuY2hvcmVzID0gcmVzLmRhdGE7XHJcbiAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xyXG59KVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxufSkvL2VuZCBvZiBjb250cm9sbGVyXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoJ2NhbWVyYUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRjb3Jkb3ZhQ2FtZXJhKSB7XHJcblxyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkZXZpY2VyZWFkeVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICRjb3Jkb3ZhUGx1Z2luLnNvbWVGdW5jdGlvbigpLnRoZW4oc3VjY2VzcywgZXJyb3IpO1xyXG4gICAgfSwgZmFsc2UpO1xyXG5cclxuICAgIC8vIE9SIHdpdGggSU9OSUNcclxuXHJcbiAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgICAgJGNvcmRvdmFQbHVnaW4uc29tZUZ1bmN0aW9uKCkudGhlbihzdWNjZXNzLCBlcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgJHNjb3BlLnRha2VQaWN0dXJlID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgb3B0aW9ucyA9IHtcclxuICAgICAgcXVhbGl0eTogNTAsXHJcbiAgICAgIGRlc3RpbmF0aW9uVHlwZTogQ2FtZXJhLkRlc3RpbmF0aW9uVHlwZS5EQVRBX1VSTCxcclxuICAgICAgc291cmNlVHlwZTogQ2FtZXJhLlBpY3R1cmVTb3VyY2VUeXBlLkNBTUVSQSxcclxuICAgICAgYWxsb3dFZGl0OiBmYWxzZSxcclxuICAgICAgZW5jb2RpbmdUeXBlOiBDYW1lcmEuRW5jb2RpbmdUeXBlLkpQRUcsXHJcbiAgICAgIHRhcmdldFdpZHRoOiAzMDAsXHJcbiAgICAgIHRhcmdldEhlaWdodDogMzAwLFxyXG4gICAgICBwb3BvdmVyT3B0aW9uczogQ2FtZXJhUG9wb3Zlck9wdGlvbnMsXHJcbiAgICAgIHNhdmVUb1Bob3RvQWxidW06IGZhbHNlLFxyXG5cdCAgICBjb3JyZWN0T3JpZW50YXRpb246dHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICAkY29yZG92YUNhbWVyYS5nZXRQaWN0dXJlKG9wdGlvbnMpLnRoZW4oZnVuY3Rpb24oaW1hZ2VEYXRhKSB7XHJcbiAgICAgICRzY29wZS5pbWdVUkkgPSBcImRhdGE6aW1hZ2UvanBlZztiYXNlNjQsXCIgKyBpbWFnZURhdGE7XHJcbiAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgLy8gZXJyb3JcclxuICAgIH0pO1xyXG5cclxuICB9O1xyXG4gIH0sIGZhbHNlKTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImNoaWxkQmFua0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcclxuICAgJHNjb3BlLnRoZW1lID0gJ3dhdGVyJy8vbG9hZCB1c2VyIHRoZW1lXHJcblxyXG4gICAkc2NvcGUuc2V0VGhlbWUgPSBmdW5jdGlvbigpe1xyXG4gICAgIGlmKCRzY29wZS50aGVtZSA9PT0gJ2Jhc2ViYWxsJyl7XHJcbiAgICAgICAkc2NvcGUudGhlbWVJbWFnZSA9ICcuL2ltZy9pbWctYmFzZWJhbGwtdHJhbnMucG5nJ1xyXG4gICAgIH1cclxuICAgICBpZigkc2NvcGUudGhlbWUgPT09ICdjaGFybGllQnJvd24nKXtcclxuICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL3Nub29weS5wbmcnXHJcbiAgICAgfVxyXG4gICAgIGlmKCRzY29wZS50aGVtZSA9PT0gJ3ByaW5jZXNzJyl7XHJcbiAgICAgICAkc2NvcGUudGhlbWVJbWFnZSA9ICcuL2ltZy9Dcm93bl9QcmluY2Vzcy5wbmcnXHJcbiAgICAgfVxyXG4gICAgIGlmKCRzY29wZS50aGVtZSA9PT0gJ3N0YXJXYXJzJyl7XHJcbiAgICAgICAkc2NvcGUudGhlbWVJbWFnZSA9ICcuL2ltZy9kZWF0aC1zdGFyLTJuZC1pY29uLnBuZydcclxuICAgICB9XHJcbiAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAnd2F0ZXInKXtcclxuICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL1RyYW5zcGFyZW50X1dhdGVyX0Ryb3BfUE5HX1BpY3R1cmUucG5nJ1xyXG4gICAgIH1cclxuXHJcbiAgIH1cclxuICAgJHNjb3BlLnNldFRoZW1lKCk7XHJcbn0pXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJjaGlsZEhvbWVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwsICRhdXRoLCB1c2VyU2VydmljZSl7XHJcbiAgLy8gJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSAgY2hpbGQgSG9tZSBjb250cm9sbGVyXCJcclxuICAvL3ZhciB1c2VyVG9rZW4gPSB1c2VyU2VydmljZS5nZXRVc2VySW5mby5zdWI7XHJcblxyXG4gIHZhciB1c2VyVG9rZW4gPSAkYXV0aC5nZXRQYXlsb2FkKCk7XHJcbiAgdXNlclNlcnZpY2UuZ2V0VXNlckluZm8gPSB1c2VyVG9rZW47XHJcbiAgdmFyIHVzZXIgPSB1c2VyVG9rZW4uc3ViO1xyXG5cclxuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3RoZW1lTW9kYWwuaHRtbCcsIHtcclxuICAgICBpZDogJzEnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcclxuICAgICBzY29wZTogJHNjb3BlLFxyXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcclxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcclxuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xyXG4gICAgICRzY29wZS5vTW9kYWwxID0gbW9kYWw7XHJcbiAgIH0pO1xyXG5cclxuICAgLy8gTW9kYWwgMlxyXG4gIC8vICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3Rha2VQaWN0dXJlTW9kYWwuaHRtbCcsIHtcclxuICAvLyAgICBpZDogJzInLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcclxuICAvLyAgICBzY29wZTogJHNjb3BlLFxyXG4gIC8vICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcclxuICAvLyAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcclxuICAvLyAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xyXG4gIC8vICAgICRzY29wZS5vTW9kYWwyID0gbW9kYWw7XHJcbiAgLy8gIH0pO1xyXG4gICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgICBpZiAoaW5kZXggPT0gMSkgJHNjb3BlLm9Nb2RhbDEuc2hvdygpO1xyXG4gICAgIGVsc2UgJHNjb3BlLm9Nb2RhbDIuc2hvdygpO1xyXG4gICB9O1xyXG5cclxuICAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbihpbmRleCkge1xyXG4gICAgIGlmIChpbmRleCA9PSAxKSAkc2NvcGUub01vZGFsMS5oaWRlKCk7XHJcbiAgICAgZWxzZSAkc2NvcGUub01vZGFsMi5oaWRlKCk7XHJcbiAgIH07XHJcblxyXG4gICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICRzY29wZS5vTW9kYWwxLnJlbW92ZSgpO1xyXG4gICAgICRzY29wZS5vTW9kYWwyLnJlbW92ZSgpO1xyXG5cclxuICAgfSk7XHJcblxyXG5cclxuICAkc2NvcGUudGhlbWUgPSB1c2VyLnVzZXJfdGhlbWVcclxuY29uc29sZS5sb2codXNlcik7XHJcblxyXG5cclxuXHJcbiAgJHNjb3BlLnNldFRoZW1lID0gZnVuY3Rpb24oY2hvaWNlKXtcclxuICAgIC8vc2VydmljZS5zZXRUaGVtZShjaG9pY2UpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgLy9pZihyZXNwb25zZS5zdGF0dXMgPT09IDIwMCl7XHJcbiAgICAkc2NvcGUudGhlbWUgPSBjaG9pY2VcclxuICAgIC8vICB9XHJcbi8vICB9KVxyXG4gIH1cclxuXHJcblxyXG5cclxuXHJcbn0pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiY2hpbGRMb2dpbkN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkYXV0aCwgJHN0YXRlLCBsb2dpblNlcnZpY2Upe1xyXG4gIC8vICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIGNoaWxkIExvZ2luIGNvbnRyb2xsZXJcIlxyXG5cclxuICAgJHNjb3BlLmxvZ2luQ2hpbGQgPSBmdW5jdGlvbih1c2VyKXtcclxuICAgICBjb25zb2xlLmxvZyh1c2VyKVxyXG4gICAgIGxvZ2luU2VydmljZS51c2VyTG9naW4odXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcclxuICAgICAgICRhdXRoLnNldFRva2VuKHJlc3BvbnNlKVxyXG4gICAgICAgICAkc3RhdGUuZ28oJ2NoaWxkSG9tZScpXHJcblxyXG4gICAgIH0pXHJcbiAgIH1cclxufSlcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImVkaXRDaGlsZEN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcclxuICAkc2NvcGUuZ29iYWNrID0gZnVuY3Rpb24oKXtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxyXG4gIH1cclxuXHJcbn0pXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJoaXN0b3J5Q3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xyXG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIEhpc3RvcnkgY29udHJvbGxlclwiXHJcblxyXG59KVxyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiaG9tZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCx1c2VyU2VydmljZSwkd2luZG93KXtcclxudmFyIHVzZXJUb2tlbiA9IHVzZXJTZXJ2aWNlLmdldFVzZXJJbmZvLnN1YjtcclxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdiYW5uZXJNb2RhbC5odG1sJywge1xyXG4gICAgIHNjb3BlOiAkc2NvcGUsXHJcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXHJcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcclxuICAgICAkc2NvcGUubW9kYWwgPSBtb2RhbDtcclxuICAgfSk7XHJcbiAgICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcclxuICAgICAkc2NvcGUubW9kYWwuc2hvdygpO1xyXG4gICB9O1xyXG4gICAkc2NvcGUuc3VibWl0QmFubmVyID0gZnVuY3Rpb24oYmFubmVyKXtcclxuICAgICB2YXIgYmFubmVySW5mbyA9IHtcclxuICAgICAgIHVzZXJfaG91c2Vob2xkOnVzZXJUb2tlbi51c2VyX2hvdXNlaG9sZCxcclxuICAgICAgIHVzZXJfYmFubmVyX2ltYWdlOmJhbm5lclxyXG4gICAgIH1cclxuICAgICAgdXNlclNlcnZpY2UucG9zdGJhbm5lcihiYW5uZXJJbmZvKVxyXG4gICAgICAudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XHJcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsLWJveFwiKS52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgJHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQodHJ1ZSk7XHJcbiAgICAgfSk7XHJcbiAgIH07XHJcbiAgICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbC1ib3hcIikudmFsdWUgPSAnJztcclxuICAgICAkc2NvcGUubW9kYWwuaGlkZSgpO1xyXG4gICB9O1xyXG4gICAvLyBDbGVhbnVwIHRoZSBtb2RhbCB3aGVuIHdlJ3JlIGRvbmUgd2l0aCBpdCFcclxuICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcclxuICAgICAkc2NvcGUubW9kYWwucmVtb3ZlKCk7XHJcbiAgIH0pO1xyXG4gICAvLyBFeGVjdXRlIGFjdGlvbiBvbiBoaWRlIG1vZGFsXHJcbiAgICRzY29wZS4kb24oJ21vZGFsLmhpZGRlbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgIC8vIEV4ZWN1dGUgYWN0aW9uXHJcblxyXG4gICB9KTtcclxuICAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gcmVtb3ZlIG1vZGFsXHJcbiAgICRzY29wZS4kb24oJ21vZGFsLnJlbW92ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAvLyBFeGVjdXRlIGFjdGlvblxyXG4gICB9KTtcclxuXHJcbiRzY29wZS5ob3VzZWhvbGQgPSAgdXNlclRva2VuLnVzZXJfaG91c2Vob2xkO1xyXG51c2VyU2VydmljZS5nZXRiYW5uZXIodXNlclRva2VuLnVzZXJfaG91c2Vob2xkKS50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbmNvbnNvbGUubG9nKHJlcy5kYXRhWzBdLnVzZXJfYmFubmVyX2ltYWdlKTtcclxuICAkc2NvcGUuYmFubmVyID0gcmVzLmRhdGFbMF0udXNlcl9iYW5uZXJfaW1hZ2U7XHJcbn0pO1xyXG5cclxuY29uc29sZS5sb2codXNlclRva2VuLnppcCk7XHJcblxyXG51c2VyU2VydmljZS5nZXRXZWF0aGVyKHVzZXJUb2tlbi56aXApXHJcbi50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xyXG4gICRzY29wZS53ZWF0aGVyID0gcmVzLmRhdGE7XHJcbn0pXHJcblxyXG5cclxufSkvL2VuZCBvZiBjb250cm9sbGVyXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJsb2dpbkN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkYXV0aCwgJHN0YXRlLCBsb2dpblNlcnZpY2Upe1xyXG5cclxuJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24odXNlcil7XHJcbiAgLy8gY29uc29sZS5sb2codXNlcilcclxuICBsb2dpblNlcnZpY2UudXNlckxvZ2luKHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UpXHJcbiAgICAkYXV0aC5zZXRUb2tlbihyZXNwb25zZSlcclxuICAgICAgJHN0YXRlLmdvKCdob21lJylcclxuXHJcbiAgfSlcclxufVxyXG4kc2NvcGUubWFrZVVzZXIgPSBmdW5jdGlvbihuZXdVc2VyKXtcclxuICBsb2dpblNlcnZpY2UubWFrZVVzZXIobmV3VXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAkYXV0aC5zZXRUb2tlbihyZXNwb25zZSlcclxuICAgICAgJHN0YXRlLmdvKCdob21lJylcclxuICB9KVxyXG59XHJcbiAgJHNjb3BlLmF1dGhlbnRpY2F0ZSA9IGZ1bmN0aW9uKHByb3ZpZGVyKSB7XHJcbiAgJGF1dGguYXV0aGVudGljYXRlKHByb3ZpZGVyKX07XHJcbiAgLy8gJHNjb3BlLnRlc3QgPSBcIkhlbGxvIGZyb20gbG9naW4gY29udHJvbGxlclwiXHJcblxyXG5cclxuICAkc2NvcGUucmV2ZWFsZXIgPSBmdW5jdGlvbigpe1xyXG4gICRzY29wZS5oaWRlID0gISRzY29wZS5oaWRlO1xyXG4gfVxyXG5cclxufSlcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcIm1ha2VDaG9yZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcclxuICAkc2NvcGUuZ29iYWNrID0gZnVuY3Rpb24oKXtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxyXG4gIH1cclxuXHJcbn0pXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJzZXRSZXdhcmRzQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsKXtcclxuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3Jld2FyZE1vZGFsLmh0bWwnLCB7XHJcbiAgICBzY29wZTogJHNjb3BlLFxyXG4gICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXHJcbiAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xyXG4gICAgJHNjb3BlLm1vZGFsID0gbW9kYWw7XHJcbiAgfSk7XHJcbiAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJHNjb3BlLm1vZGFsLnNob3coKTtcclxuICB9O1xyXG4gICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAkc2NvcGUubW9kYWwuaGlkZSgpO1xyXG4gIH07XHJcbiAgLy8gQ2xlYW51cCB0aGUgbW9kYWwgd2hlbiB3ZSdyZSBkb25lIHdpdGggaXQhXHJcbiAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcclxuICAgICRzY29wZS5tb2RhbC5yZW1vdmUoKTtcclxuICB9KTtcclxuICAvLyBFeGVjdXRlIGFjdGlvbiBvbiBoaWRlIG1vZGFsXHJcbiAgJHNjb3BlLiRvbignbW9kYWwuaGlkZGVuJywgZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxyXG4gIH0pO1xyXG4gIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIHJlbW92ZSBtb2RhbFxyXG4gICRzY29wZS4kb24oJ21vZGFsLnJlbW92ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIC8vIEV4ZWN1dGUgYWN0aW9uXHJcbiAgfSk7XHJcbiAgLy9iYWNrYnV0dG9uXHJcbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5nbygtMSlcclxuICB9XHJcblxyXG59KVxyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwic2V0dGluZ3NDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwpe1xyXG4gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnY2hhbmdlUGFzc3dvcmQuaHRtbCcsIHtcclxuICAgICBpZDogJzEnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcclxuICAgICBzY29wZTogJHNjb3BlLFxyXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcclxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcclxuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xyXG4gICAgICRzY29wZS5vTW9kYWwxID0gbW9kYWw7XHJcbiAgIH0pO1xyXG5cclxuICAgLy8gTW9kYWwgMlxyXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2NoYW5nZUhvdXNlaG9sZC5odG1sJywge1xyXG4gICAgIGlkOiAnMicsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxyXG4gICAgIHNjb3BlOiAkc2NvcGUsXHJcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxyXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xyXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XHJcbiAgICAgJHNjb3BlLm9Nb2RhbDIgPSBtb2RhbDtcclxuICAgfSk7XHJcblxyXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2NoYW5nZVppcC5odG1sJywge1xyXG4gICAgIGlkOiAnMycsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxyXG4gICAgIHNjb3BlOiAkc2NvcGUsXHJcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxyXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xyXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XHJcbiAgICAgJHNjb3BlLm9Nb2RhbDMgPSBtb2RhbDtcclxuICAgfSk7XHJcblxyXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2FkZFBhcmVudC5odG1sJywge1xyXG4gICAgIGlkOiAnNCcsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxyXG4gICAgIHNjb3BlOiAkc2NvcGUsXHJcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxyXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xyXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XHJcbiAgICAgJHNjb3BlLm9Nb2RhbDQgPSBtb2RhbDtcclxuICAgfSk7XHJcblxyXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3JlbW92ZUNoaWxkLmh0bWwnLCB7XHJcbiAgICAgaWQ6ICc1JywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXHJcbiAgICAgc2NvcGU6ICRzY29wZSxcclxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXHJcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXHJcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcclxuICAgICAkc2NvcGUub01vZGFsNSA9IG1vZGFsO1xyXG4gICB9KTtcclxuXHJcblxyXG5cclxuICAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKGluZGV4KSB7XHJcbiAgICAgaWYgKGluZGV4ID09IDEpICRzY29wZS5vTW9kYWwxLnNob3coKTtcclxuICAgICBlbHNlIGlmKGluZGV4ID09IDIpICRzY29wZS5vTW9kYWwyLnNob3coKTtcclxuICAgICBlbHNlIGlmKGluZGV4ID09IDMpICRzY29wZS5vTW9kYWwzLnNob3coKTtcclxuICAgICBlbHNlIGlmKGluZGV4ID09IDQpICRzY29wZS5vTW9kYWw0LnNob3coKTtcclxuICAgICBlbHNlICRzY29wZS5vTW9kYWw1LnNob3coKTtcclxuICAgfTtcclxuXHJcbiAgICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgICBpZiAoaW5kZXggPT0gMSkgJHNjb3BlLm9Nb2RhbDEuaGlkZSgpO1xyXG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMikgJHNjb3BlLm9Nb2RhbDIuaGlkZSgpO1xyXG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMykgJHNjb3BlLm9Nb2RhbDMuaGlkZSgpO1xyXG4gICAgIGVsc2UgaWYoaW5kZXggPT0gNCkgJHNjb3BlLm9Nb2RhbDQuaGlkZSgpO1xyXG4gICAgIGVsc2UgJHNjb3BlLm9Nb2RhbDUuaGlkZSgpO1xyXG4gICB9O1xyXG5cclxuICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcclxuICAgICAkc2NvcGUub01vZGFsMS5yZW1vdmUoKTtcclxuICAgICAkc2NvcGUub01vZGFsMi5yZW1vdmUoKTtcclxuICAgICAkc2NvcGUub01vZGFsMy5yZW1vdmUoKTtcclxuICAgICAkc2NvcGUub01vZGFsNC5yZW1vdmUoKTtcclxuICAgICAkc2NvcGUub01vZGFsNS5yZW1vdmUoKTtcclxuICAgfSk7XHJcblxyXG59KVxyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwidHJhY2tlckN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCl7XHJcbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdwaWNDb25mTW9kYWwuaHRtbCcsIHtcclxuICAgIHNjb3BlOiAkc2NvcGUsXHJcbiAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcclxuICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XHJcbiAgICAkc2NvcGUubW9kYWwgPSBtb2RhbDtcclxuICB9KTtcclxuICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAkc2NvcGUubW9kYWwuc2hvdygpO1xyXG4gIH07XHJcbiAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbigpIHtcclxuICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XHJcbiAgfTtcclxuICAvLyBDbGVhbnVwIHRoZSBtb2RhbCB3aGVuIHdlJ3JlIGRvbmUgd2l0aCBpdCFcclxuICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xyXG4gICAgJHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xyXG4gIH0pO1xyXG4gIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIGhpZGUgbW9kYWxcclxuICAkc2NvcGUuJG9uKCdtb2RhbC5oaWRkZW4nLCBmdW5jdGlvbigpIHtcclxuICAgIC8vIEV4ZWN1dGUgYWN0aW9uXHJcbiAgfSk7XHJcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gcmVtb3ZlIG1vZGFsXHJcbiAgJHNjb3BlLiRvbignbW9kYWwucmVtb3ZlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gRXhlY3V0ZSBhY3Rpb25cclxuICB9KTtcclxuXHJcbn0pXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJ1c2VySW5mb0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcclxuICAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBpbmZvIGNvbnRyb2xsZXJcIlxyXG5cclxufSlcclxuIl19
