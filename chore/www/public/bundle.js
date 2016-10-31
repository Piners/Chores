'use strict';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('chore', ['ionic', 'satellizer']).config(function ($stateProvider, $urlRouterProvider, $authProvider) {
  $urlRouterProvider.otherwise("/home");
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
  }).state('childSettings', {
    url: "/child/settings",
    templateUrl: "./templates/childSettings.html",
    controller: "childSettingsCtrl"
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

angular.module('chore').controller("addChildCtrl", function ($scope) {
  //backbutton
  $scope.goback = function () {
    window.history.go(-1);
  };
});
"use strict";

angular.module('chore').controller("assignChoreCtrl", function ($scope) {
   $scope.test = "Message from assign chore controller";
});
"use strict";

angular.module('chore').controller("childBankCtrl", function ($scope) {
   $scope.test = "Message from bank controller";
});
"use strict";

angular.module('chore').controller("childHomeCtrl", function ($scope) {
   $scope.test = "Message from  child Home controller";
});
'use strict';

angular.module('chore').controller("childLoginCtrl", function ($scope, $auth, $state, childLoginService) {
  //  $scope.test = "Message from child Login controller"

  $scope.login = function (user) {
    //  console.log(user)
    childLoginService.userLogin(user).then(function (response) {
      //  console.log(response)
      $auth.setToken(response);
      $state.go('childHome');
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

angular.module('chore').controller("childSettingsCtrl", function ($scope) {
   $scope.test = "Message from child settings controller";
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
"use strict";

angular.module('chore').controller("homeCtrl", function ($scope, $ionicModal, userService) {
  $scope.test = "Message from Home controller";
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
'use strict';

angular.module('chore').service('loginService', function ($http) {

  this.userLogin = function (user) {
    // console.log(user, "service")
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

  this.getUserInfo = $auth.getPayload();

  console.log(this.getUserInfo);

  console.log('hello from service');
}); //end of service
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXJzL2FkZENoaWxkQ3RybC5qcyIsImNvbnRyb2xsZXJzL2Fzc2lnbkNob3JlQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NoaWxkQmFua0N0cmwuanMiLCJjb250cm9sbGVycy9jaGlsZEhvbWVDdHJsLmpzIiwiY29udHJvbGxlcnMvY2hpbGRMb2dpbkN0cmwuanMiLCJjb250cm9sbGVycy9jaGlsZFNldHRpbmdzQ3RybC5qcyIsImNvbnRyb2xsZXJzL2VkaXRDaGlsZEN0cmwuanMiLCJjb250cm9sbGVycy9oaXN0b3J5Q3RybC5qcyIsImNvbnRyb2xsZXJzL2hvbWVDdHJsLmpzIiwiY29udHJvbGxlcnMvbG9naW5DdHJsLmpzIiwiY29udHJvbGxlcnMvbWFrZUNob3JlQ3RybC5qcyIsImNvbnRyb2xsZXJzL3NldFJld2FyZHNDdHJsLmpzIiwiY29udHJvbGxlcnMvc2V0dGluZ3NDdHJsLmpzIiwiY29udHJvbGxlcnMvdHJhY2tlckN0cmwuanMiLCJjb250cm9sbGVycy91c2VySW5mb0N0cmwuanMiLCJzZXJ2aWNlL2xvZ2luU2VydmljZS5qcyIsInNlcnZpY2UvdXNlclNlcnZpY2UuanMiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsImNvbmZpZyIsIiRzdGF0ZVByb3ZpZGVyIiwiJHVybFJvdXRlclByb3ZpZGVyIiwiJGF1dGhQcm92aWRlciIsIm90aGVyd2lzZSIsInN0YXRlIiwidXJsIiwidGVtcGxhdGVVcmwiLCJjb250cm9sbGVyIiwiZmFjZWJvb2siLCJjbGllbnRJZCIsInJlc3BvbnNlVHlwZSIsImdvb2dsZSIsInJ1biIsIiRpb25pY1BsYXRmb3JtIiwicmVhZHkiLCJ3aW5kb3ciLCJjb3Jkb3ZhIiwicGx1Z2lucyIsIktleWJvYXJkIiwiaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyIiwiZGlzYWJsZVNjcm9sbCIsIlN0YXR1c0JhciIsInN0eWxlRGVmYXVsdCIsIiRzY29wZSIsImdvYmFjayIsImhpc3RvcnkiLCJnbyIsInRlc3QiLCIkYXV0aCIsIiRzdGF0ZSIsImNoaWxkTG9naW5TZXJ2aWNlIiwibG9naW4iLCJ1c2VyIiwidXNlckxvZ2luIiwidGhlbiIsInJlc3BvbnNlIiwic2V0VG9rZW4iLCJhdXRoZW50aWNhdGUiLCJwcm92aWRlciIsInJldmVhbGVyIiwiaGlkZSIsIiRpb25pY01vZGFsIiwidXNlclNlcnZpY2UiLCJmcm9tVGVtcGxhdGVVcmwiLCJzY29wZSIsImFuaW1hdGlvbiIsIm1vZGFsIiwib3Blbk1vZGFsIiwic2hvdyIsImNsb3NlTW9kYWwiLCIkb24iLCJyZW1vdmUiLCJsb2dpblNlcnZpY2UiLCJtYWtlVXNlciIsIm5ld1VzZXIiLCJpZCIsImJhY2tkcm9wQ2xpY2tUb0Nsb3NlIiwib01vZGFsMSIsIm9Nb2RhbDIiLCJvTW9kYWwzIiwib01vZGFsNCIsIm9Nb2RhbDUiLCJpbmRleCIsInNlcnZpY2UiLCIkaHR0cCIsIm1ldGhvZCIsImRhdGEiLCIkcSIsImdldFVzZXJJbmZvIiwiZ2V0UGF5bG9hZCIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0FBLFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCLENBQUMsT0FBRCxFQUFVLFlBQVYsQ0FBeEIsRUFDQ0MsTUFERCxDQUNRLFVBQVNDLGNBQVQsRUFBeUJDLGtCQUF6QixFQUE2Q0MsYUFBN0MsRUFBMkQ7QUFDakVELHFCQUFtQkUsU0FBbkIsQ0FBNkIsT0FBN0I7QUFDQUgsaUJBQ0NJLEtBREQsQ0FDTyxVQURQLEVBQ2tCO0FBQ2hCQyxTQUFJLFdBRFk7QUFFaEJDLGlCQUFhLDJCQUZHO0FBR2hCQyxnQkFBWTtBQUhJLEdBRGxCLEVBTUNILEtBTkQsQ0FNTyxhQU5QLEVBTXFCO0FBQ25CQyxTQUFJLGNBRGU7QUFFbkJDLGlCQUFhLDhCQUZNO0FBR25CQyxnQkFBWTtBQUhPLEdBTnJCLEVBV0NILEtBWEQsQ0FXTyxXQVhQLEVBV21CO0FBQ2pCQyxTQUFJLGdCQURhO0FBRWpCQyxpQkFB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Rk07QUFHWDZELFlBQU1sQztBQUhLLEtBQU4sQ0FBUDtBQUtELEdBUEQ7QUFRQSxPQUFLcUIsUUFBTCxHQUFnQixVQUFTQyxPQUFULEVBQWtCO0FBQ2hDLFdBQU9VLE1BQU07QUFDWEMsY0FBUSxNQURHO0FBRVg1RCxXQUFLLGNBRk07QUFHWDZELFlBQU1aO0FBSEssS0FBTixDQUFQO0FBS0QsR0FORDtBQU9ELENBbEJELEdBa0JHOzs7QUNsQkh6RCxRQUFRQyxNQUFSLENBQWUsT0FBZixFQUF3QmlFLE9BQXhCLENBQWdDLGFBQWhDLEVBQStDLFVBQVNDLEtBQVQsRUFBZUcsRUFBZixFQUFrQnZDLEtBQWxCLEVBQXdCOztBQUd2RSxPQUFLd0MsV0FBTCxHQUFtQnhDLE1BQU15QyxVQUFOLEVBQW5COztBQUVBQyxVQUFRQyxHQUFSLENBQVksS0FBS0gsV0FBakI7O0FBRUFFLFVBQVFDLEdBQVIsQ0FBWSxvQkFBWjtBQUtDLENBWkQsR0FZRyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJb25pYyBTdGFydGVyIEFwcFxuXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xuLy8gJ3N0YXJ0ZXInIGlzIHRoZSBuYW1lIG9mIHRoaXMgYW5ndWxhciBtb2R1bGUgZXhhbXBsZSAoYWxzbyBzZXQgaW4gYSA8Ym9keT4gYXR0cmlidXRlIGluIGluZGV4Lmh0bWwpXG4vLyB0aGUgMm5kIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvZiAncmVxdWlyZXMnXG5hbmd1bGFyLm1vZHVsZSgnY2hvcmUnLCBbJ2lvbmljJywgJ3NhdGVsbGl6ZXInXSlcbi5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJGF1dGhQcm92aWRlcil7XG4gICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoXCIvaG9tZVwiKTtcbiAgJHN0YXRlUHJvdmlkZXJcbiAgLnN0YXRlKCdhZGRDaGlsZCcse1xuICAgIHVybDpcIi9hZGRDaGlsZFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2FkZENoaWxkLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImFkZENoaWxkQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnYXNzaWduQ2hvcmUnLHtcbiAgICB1cmw6XCIvYXNzaWduQ2hvcmVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9hc3NpZ25DaG9yZS5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJhc3NpZ25DaG9yZUN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2VkaXRDaGlsZCcse1xuICAgIHVybDpcIi9lZGl0Q2hpbGQvOmlkXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvZWRpdENoaWxkLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImVkaXRDaGlsZEN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2hpc3RvcnknLHtcbiAgICB1cmw6XCIvaGlzdG9yeVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2hpc3RvcnkuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiaGlzdG9yeUN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2hvbWUnLHtcbiAgICB1cmw6XCIvaG9tZVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2hvbWUuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiaG9tZUN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2xvZ2luJyx7XG4gICAgdXJsOlwiL2xvZ2luXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvTG9naW4uaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwibG9naW5DdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdtYWtlQ2hvcmUnLHtcbiAgICB1cmw6XCIvbWFrZUNob3JlXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvbWFrZUNob3JlLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcIm1ha2VDaG9yZUN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ3NldFJld2FyZHMnLHtcbiAgICB1cmw6XCIvc2V0UmV3YXJkcy86aWRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9zZXRSZXdhcmRzLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcInNldFJld2FyZHNDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdzZXR0aW5ncycse1xuICAgIHVybDpcIi9zZXR0aW5nc1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL3NldHRpbmdzLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcInNldHRpbmdzQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgndHJhY2tlcicse1xuICAgIHVybDpcIi90cmFja2VyLzppZFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL3RyYWNrZXIuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwidHJhY2tlckN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ3VzZXJJbmZvJyx7XG4gICAgdXJsOlwiL3VzZXJJbmZvXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvdXNlckluZm8uaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwidXNlckluZm9DdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdjaGlsZEJhbmsnLHtcbiAgICB1cmw6XCIvY2hpbGQvYmFua1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2NoaWxkQmFuay5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJjaGlsZEJhbmtDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdjaGlsZEhvbWUnLHtcbiAgICB1cmw6XCIvY2hpbGQvaG9tZVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2NoaWxkSG9tZS5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJjaGlsZEhvbWVDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdjaGlsZExvZ2luJyx7XG4gICAgdXJsOlwiL2NoaWxkL2xvZ2luXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvY2hpbGRMb2dpbi5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJjaGlsZExvZ2luQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnY2hpbGRTZXR0aW5ncycse1xuICAgIHVybDpcIi9jaGlsZC9zZXR0aW5nc1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2NoaWxkU2V0dGluZ3MuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRTZXR0aW5nc0N0cmxcIlxuICB9KTtcbiAgJGF1dGhQcm92aWRlci5mYWNlYm9vayh7XG4gICAgY2xpZW50SWQ6ICczMzIyNzIwNTcxMzI2ODEnXG4gIH0pO1xuXG4gIC8vIE9wdGlvbmFsOiBGb3IgY2xpZW50LXNpZGUgdXNlIChJbXBsaWNpdCBHcmFudCksIHNldCByZXNwb25zZVR5cGUgdG8gJ3Rva2VuJyAoZGVmYXVsdDogJ2NvZGUnKVxuICAkYXV0aFByb3ZpZGVyLmZhY2Vib29rKHtcbiAgICBjbGllbnRJZDogJzMzMjI3MjA1NzEzMjY4MScsXG4gICAgcmVzcG9uc2VUeXBlOiAndG9rZW4nXG4gIH0pO1xuXG4gICRhdXRoUHJvdmlkZXIuZ29vZ2xlKHtcbiAgICBjbGllbnRJZDogJzI3NTM1Mjk2MDk0Ni01cmNhbjNxa2hsc2M3bTUwaGV2NWRuMmUyY2FlOW1icC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbScsXG4gICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTAwLyMvbG9naW4vJ1xuICB9KTtcbn0pXG5cblxuXG4ucnVuKGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtKSB7XG4gICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIGlmKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgIC8vIEhpZGUgdGhlIGFjY2Vzc29yeSBiYXIgYnkgZGVmYXVsdCAocmVtb3ZlIHRoaXMgdG8gc2hvdyB0aGUgYWNjZXNzb3J5IGJhciBhYm92ZSB0aGUga2V5Ym9hcmRcbiAgICAgIC8vIGZvciBmb3JtIGlucHV0cylcbiAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG5cbiAgICAgIC8vIERvbid0IHJlbW92ZSB0aGlzIGxpbmUgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZy4gSXQgc3RvcHMgdGhlIHZpZXdwb3J0XG4gICAgICAvLyBmcm9tIHNuYXBwaW5nIHdoZW4gdGV4dCBpbnB1dHMgYXJlIGZvY3VzZWQuIElvbmljIGhhbmRsZXMgdGhpcyBpbnRlcm5hbGx5IGZvclxuICAgICAgLy8gYSBtdWNoIG5pY2VyIGtleWJvYXJkIGV4cGVyaWVuY2UuXG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbCh0cnVlKTtcbiAgICB9XG4gICAgaWYod2luZG93LlN0YXR1c0Jhcikge1xuICAgICAgU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpO1xuICAgIH1cbiAgfSk7XG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImFkZENoaWxkQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAvL2JhY2tidXR0b25cbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XG4gICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpXG4gIH1cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJhc3NpZ25DaG9yZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gYXNzaWduIGNob3JlIGNvbnRyb2xsZXJcIlxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImNoaWxkQmFua0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gYmFuayBjb250cm9sbGVyXCJcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJjaGlsZEhvbWVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tICBjaGlsZCBIb21lIGNvbnRyb2xsZXJcIlxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImNoaWxkTG9naW5DdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGF1dGgsICRzdGF0ZSwgY2hpbGRMb2dpblNlcnZpY2Upe1xuICAvLyAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBjaGlsZCBMb2dpbiBjb250cm9sbGVyXCJcblxuICAgJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24odXNlcil7XG4gICAgLy8gIGNvbnNvbGUubG9nKHVzZXIpXG4gICAgIGNoaWxkTG9naW5TZXJ2aWNlLnVzZXJMb2dpbih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgIC8vICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAkYXV0aC5zZXRUb2tlbihyZXNwb25zZSlcbiAgICAgICAgICRzdGF0ZS5nbygnY2hpbGRIb21lJylcblxuICAgICB9KVxuICAgfVxuICAgJHNjb3BlLmF1dGhlbnRpY2F0ZSA9IGZ1bmN0aW9uKHByb3ZpZGVyKSB7XG4gICAkYXV0aC5hdXRoZW50aWNhdGUocHJvdmlkZXIpfTtcbiAgIC8vICRzY29wZS50ZXN0ID0gXCJIZWxsbyBmcm9tIGxvZ2luIGNvbnRyb2xsZXJcIlxuICAgJHNjb3BlLnJldmVhbGVyID0gZnVuY3Rpb24oKXtcbiAgICRzY29wZS5oaWRlID0gISRzY29wZS5oaWRlO1xuXG4gIH1cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiY2hpbGRTZXR0aW5nc0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gY2hpbGQgc2V0dGluZ3MgY29udHJvbGxlclwiXG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiZWRpdENoaWxkQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAkc2NvcGUuZ29iYWNrID0gZnVuY3Rpb24oKXtcbiAgICB3aW5kb3cuaGlzdG9yeS5nbygtMSlcbiAgfVxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImhpc3RvcnlDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIEhpc3RvcnkgY29udHJvbGxlclwiXG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiaG9tZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCx1c2VyU2VydmljZSl7XG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIEhvbWUgY29udHJvbGxlclwiXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2Jhbm5lck1vZGFsLmh0bWwnLCB7XG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUubW9kYWwgPSBtb2RhbDtcbiAgIH0pO1xuICAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICAkc2NvcGUubW9kYWwuc2hvdygpO1xuICAgfTtcbiAgICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gICB9O1xuICAgLy8gQ2xlYW51cCB0aGUgbW9kYWwgd2hlbiB3ZSdyZSBkb25lIHdpdGggaXQhXG4gICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAkc2NvcGUubW9kYWwucmVtb3ZlKCk7XG4gICB9KTtcbiAgIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIGhpZGUgbW9kYWxcbiAgICRzY29wZS4kb24oJ21vZGFsLmhpZGRlbicsIGZ1bmN0aW9uKCkge1xuICAgICAvLyBFeGVjdXRlIGFjdGlvblxuICAgfSk7XG4gICAvLyBFeGVjdXRlIGFjdGlvbiBvbiByZW1vdmUgbW9kYWxcbiAgICRzY29wZS4kb24oJ21vZGFsLnJlbW92ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgIH0pO1xuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImxvZ2luQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRhdXRoLCAkc3RhdGUsIGxvZ2luU2VydmljZSl7XG5cbiRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uKHVzZXIpe1xuICAvLyBjb25zb2xlLmxvZyh1c2VyKVxuICBsb2dpblNlcnZpY2UudXNlckxvZ2luKHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICRhdXRoLnNldFRva2VuKHJlc3BvbnNlKVxuICAgICAgJHN0YXRlLmdvKCdob21lJylcblxuICB9KVxufVxuJHNjb3BlLm1ha2VVc2VyID0gZnVuY3Rpb24obmV3VXNlcil7XG4gIGxvZ2luU2VydmljZS5tYWtlVXNlcihuZXdVc2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAkYXV0aC5zZXRUb2tlbihyZXNwb25zZSlcbiAgICAgICRzdGF0ZS5nbygnaG9tZScpXG4gIH0pXG59XG4gICRzY29wZS5hdXRoZW50aWNhdGUgPSBmdW5jdGlvbihwcm92aWRlcikge1xuICAkYXV0aC5hdXRoZW50aWNhdGUocHJvdmlkZXIpfTtcbiAgLy8gJHNjb3BlLnRlc3QgPSBcIkhlbGxvIGZyb20gbG9naW4gY29udHJvbGxlclwiXG4gICRzY29wZS5yZXZlYWxlciA9IGZ1bmN0aW9uKCl7XG4gICRzY29wZS5oaWRlID0gISRzY29wZS5oaWRlO1xuXG4gfVxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcIm1ha2VDaG9yZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XG4gICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpXG4gIH1cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJzZXRSZXdhcmRzQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsKXtcbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdyZXdhcmRNb2RhbC5odG1sJywge1xuICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAkc2NvcGUubW9kYWwgPSBtb2RhbDtcbiAgfSk7XG4gICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwuc2hvdygpO1xuICB9O1xuICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gIH07XG4gIC8vIENsZWFudXAgdGhlIG1vZGFsIHdoZW4gd2UncmUgZG9uZSB3aXRoIGl0IVxuICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5yZW1vdmUoKTtcbiAgfSk7XG4gIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIGhpZGUgbW9kYWxcbiAgJHNjb3BlLiRvbignbW9kYWwuaGlkZGVuJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgfSk7XG4gIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIHJlbW92ZSBtb2RhbFxuICAkc2NvcGUuJG9uKCdtb2RhbC5yZW1vdmVkJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgfSk7XG5cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJzZXR0aW5nc0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCl7XG4gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnY2hhbmdlUGFzc3dvcmQuaHRtbCcsIHtcbiAgICAgaWQ6ICcxJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWwxID0gbW9kYWw7XG4gICB9KTtcblxuICAgLy8gTW9kYWwgMlxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdjaGFuZ2VIb3VzZWhvbGQuaHRtbCcsIHtcbiAgICAgaWQ6ICcyJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWwyID0gbW9kYWw7XG4gICB9KTtcblxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdjaGFuZ2VaaXAuaHRtbCcsIHtcbiAgICAgaWQ6ICczJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWwzID0gbW9kYWw7XG4gICB9KTtcblxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdhZGRQYXJlbnQuaHRtbCcsIHtcbiAgICAgaWQ6ICc0JywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWw0ID0gbW9kYWw7XG4gICB9KTtcblxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdyZW1vdmVDaGlsZC5odG1sJywge1xuICAgICBpZDogJzUnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDUgPSBtb2RhbDtcbiAgIH0pO1xuXG5cblxuICAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgIGlmIChpbmRleCA9PSAxKSAkc2NvcGUub01vZGFsMS5zaG93KCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMikgJHNjb3BlLm9Nb2RhbDIuc2hvdygpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDMpICRzY29wZS5vTW9kYWwzLnNob3coKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSA0KSAkc2NvcGUub01vZGFsNC5zaG93KCk7XG4gICAgIGVsc2UgJHNjb3BlLm9Nb2RhbDUuc2hvdygpO1xuICAgfTtcblxuICAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICBpZiAoaW5kZXggPT0gMSkgJHNjb3BlLm9Nb2RhbDEuaGlkZSgpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDIpICRzY29wZS5vTW9kYWwyLmhpZGUoKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSAzKSAkc2NvcGUub01vZGFsMy5oaWRlKCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gNCkgJHNjb3BlLm9Nb2RhbDQuaGlkZSgpO1xuICAgICBlbHNlICRzY29wZS5vTW9kYWw1LmhpZGUoKTtcbiAgIH07XG5cbiAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICRzY29wZS5vTW9kYWwxLnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsMi5yZW1vdmUoKTtcbiAgICAgJHNjb3BlLm9Nb2RhbDMucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWw0LnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsNS5yZW1vdmUoKTtcbiAgIH0pO1xuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcInRyYWNrZXJDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwpe1xuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3BpY0NvbmZNb2RhbC5odG1sJywge1xuICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAkc2NvcGUubW9kYWwgPSBtb2RhbDtcbiAgfSk7XG4gICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwuc2hvdygpO1xuICB9O1xuICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gIH07XG4gIC8vIENsZWFudXAgdGhlIG1vZGFsIHdoZW4gd2UncmUgZG9uZSB3aXRoIGl0IVxuICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5yZW1vdmUoKTtcbiAgfSk7XG4gIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIGhpZGUgbW9kYWxcbiAgJHNjb3BlLiRvbignbW9kYWwuaGlkZGVuJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgfSk7XG4gIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIHJlbW92ZSBtb2RhbFxuICAkc2NvcGUuJG9uKCdtb2RhbC5yZW1vdmVkJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgfSk7XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwidXNlckluZm9DdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIGluZm8gY29udHJvbGxlclwiXG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5zZXJ2aWNlKCdsb2dpblNlcnZpY2UnLCBmdW5jdGlvbigkaHR0cCl7XG5cblxuICB0aGlzLnVzZXJMb2dpbiA9IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICAvLyBjb25zb2xlLmxvZyh1c2VyLCBcInNlcnZpY2VcIilcbiAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIHVybDogJy9hdXRoL2xvZ2luJyxcbiAgICAgIGRhdGE6IHVzZXJcbiAgICB9KVxuICB9XG4gIHRoaXMubWFrZVVzZXIgPSBmdW5jdGlvbihuZXdVc2VyKSB7XG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB1cmw6ICcvYXV0aC9zaWdudXAnLFxuICAgICAgZGF0YTogbmV3VXNlclxuICAgIH0pXG4gIH1cbn0pIC8vIGVuZCBvZiBzZXJ2aWNlXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5zZXJ2aWNlKCd1c2VyU2VydmljZScsIGZ1bmN0aW9uKCRodHRwLCRxLCRhdXRoKXtcblxuXG50aGlzLmdldFVzZXJJbmZvID0gJGF1dGguZ2V0UGF5bG9hZCgpO1xuXG5jb25zb2xlLmxvZyh0aGlzLmdldFVzZXJJbmZvKTtcblxuY29uc29sZS5sb2coJ2hlbGxvIGZyb20gc2VydmljZScpO1xuXG5cblxuXG59KTsvL2VuZCBvZiBzZXJ2aWNlXG4iXX0=
