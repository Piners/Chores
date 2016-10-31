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
"use strict";

angular.module('chore').controller("childLoginCtrl", function ($scope) {
   $scope.test = "Message from child Login controller";
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

angular.module('chore').controller("homeCtrl", function ($scope, $ionicModal) {
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
    console.log(user);
    loginService.userLogin(user).then(function (response) {
      console.log(response);
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
  // this.login = function(provider){
  //
  // $http({
  //     method: "GET",
  //     url: "/api/me"
  //
  //   }).then(function(response){
  //       console.log(response);
  //
  //
  //
  //   });

  // this.payLoad = function() {
  //   var payLoadData = $auth.getPayload() {
  //     return payLoadData;
  //   }
  // }


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
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXJzL2FkZENoaWxkQ3RybC5qcyIsImNvbnRyb2xsZXJzL2Fzc2lnbkNob3JlQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NoaWxkQmFua0N0cmwuanMiLCJjb250cm9sbGVycy9jaGlsZEhvbWVDdHJsLmpzIiwiY29udHJvbGxlcnMvY2hpbGRMb2dpbkN0cmwuanMiLCJjb250cm9sbGVycy9jaGlsZFNldHRpbmdzQ3RybC5qcyIsImNvbnRyb2xsZXJzL2VkaXRDaGlsZEN0cmwuanMiLCJjb250cm9sbGVycy9oaXN0b3J5Q3RybC5qcyIsImNvbnRyb2xsZXJzL2hvbWVDdHJsLmpzIiwiY29udHJvbGxlcnMvbG9naW5DdHJsLmpzIiwiY29udHJvbGxlcnMvbWFrZUNob3JlQ3RybC5qcyIsImNvbnRyb2xsZXJzL3NldFJld2FyZHNDdHJsLmpzIiwiY29udHJvbGxlcnMvc2V0dGluZ3NDdHJsLmpzIiwiY29udHJvbGxlcnMvdHJhY2tlckN0cmwuanMiLCJjb250cm9sbGVycy91c2VySW5mb0N0cmwuanMiLCJzZXJ2aWNlL2xvZ2luU2VydmljZS5qcyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwiY29uZmlnIiwiJHN0YXRlUHJvdmlkZXIiLCIkdXJsUm91dGVyUHJvdmlkZXIiLCIkYXV0aFByb3ZpZGVyIiwib3RoZXJ3aXNlIiwic3RhdGUiLCJ1cmwiLCJ0ZW1wbGF0ZVVybCIsImNvbnRyb2xsZXIiLCJmYWNlYm9vayIsImNsaWVudElkIiwicmVzcG9uc2VUeXBlIiwiZ29vZ2xlIiwicnVuIiwiJGlvbmljUGxhdGZvcm0iLCJyZWFkeSIsIndpbmRvdyIsImNvcmRvdmEiLCJwbHVnaW5zIiwiS2V5Ym9hcmQiLCJoaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIiLCJkaXNhYmxlU2Nyb2xsIiwiU3RhdHVzQmFyIiwic3R5bGVEZWZhdWx0IiwiJHNjb3BlIiwiZ29iYWNrIiwiaGlzdG9yeSIsImdvIiwidGVzdCIsIiRpb25pY01vZGFsIiwiZnJvbVRlbXBsYXRlVXJsIiwic2NvcGUiLCJhbmltYXRpb24iLCJ0aGVuIiwibW9kYWwiLCJvcGVuTW9kYWwiLCJzaG93IiwiY2xvc2VNb2RhbCIsImhpZGUiLCIkb24iLCJyZW1vdmUiLCIkYXV0aCIsIiRzdGF0ZSIsImxvZ2luU2VydmljZSIsImxvZ2luIiwidXNlciIsImNvbnNvbGUiLCJsb2ciLCJ1c2VyTG9naW4iLCJyZXNwb25zZSIsInNldFRva2VuIiwibWFrZVVzZXIiLCJuZXdVc2VyIiwiYXV0aGVudGljYXRlIiwicHJvdmlkZXIiLCJyZXZlYWxlciIsImlkIiwiYmFja2Ryb3BDbGlja1RvQ2xvc2UiLCJvTW9kYWwxIiwib01vZGFsMiIsIm9Nb2RhbDMiLCJvTW9kYWw0Iiwib01vZGFsNSIsImluZGV4Iiwic2VydmljZSIsIiRodHRwIiwibWV0aG9kIiwiZGF0YSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQUEsUUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0IsQ0FBQyxPQUFELEVBQVUsWUFBVixDQUF4QixFQUNDQyxNQURELENBQ1EsVUFBU0MsY0FBVCxFQUF5QkMsa0JBQXpCLEVBQTZDQyxhQUE3QyxFQUEyRDtBQUNqRUQscUJBQW1CRSxTQUFuQixDQUE2QixPQUE3QjtBQUNBSCxpQkFDQ0ksS0FERCxDQUNPLFVBRFAsRUFDa0I7QUFDaEJDLFNBQUksV0FEWTtBQUVoQkMsaUJBQWEsMkJBRkc7QUFHaEJDLGdCQUFZO0FBSEksR0FEbEIsRUFNQ0gsS0FORCxDQU1PLGFBTlAsRUFNcUI7QUFDbkJDLFNBQUksY0FEZTtBQUVuQkMsaUJBQWEsOEJBRk07QUFHbkJDLGdCQUFZO0FBSE8sR0FOckIsRUFXQ0gsS0FYRCxDQVdPLFdBWFAsRUFXbUI7QUFDakJDLFNBQUksZ0JBRGE7QUFFakJDLGlCQUFhLDRCQUZJO0FBR2pCQyxnQkFBWTtBQUhLLEdBWG5CLEVBZ0JDSCxLQWhCRCxDQWdCTyxTQWhCUCxFQWdCaUI7QUFDZkMsU0FBSSxVQURXO0FBRWZDLGlCQUFh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aEIsU0FBT2UsR0FBUCxDQUFXLGNBQVgsRUFBMkIsWUFBVztBQUNwQztBQUNELEdBRkQ7QUFHQTtBQUNBZixTQUFPZSxHQUFQLENBQVcsZUFBWCxFQUE0QixZQUFXO0FBQ3JDO0FBQ0QsR0FGRDtBQUlELENBMUJEOzs7QUNBQXpDLFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCUyxVQUF4QixDQUFtQyxjQUFuQyxFQUFtRCxVQUFTZ0IsTUFBVCxFQUFnQjtBQUNoRUEsVUFBT0ksSUFBUCxHQUFjLDhCQUFkO0FBRUYsQ0FIRDs7O0FDQUE5QixRQUFRQyxNQUFSLENBQWUsT0FBZixFQUF3QmlFLE9BQXhCLENBQWdDLGNBQWhDLEVBQWdELFVBQVNDLEtBQVQsRUFBZTtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsT0FBS2pCLFNBQUwsR0FBaUIsVUFBU0gsSUFBVCxFQUFlO0FBQzlCQyxZQUFRQyxHQUFSLENBQVlGLElBQVosRUFBa0IsU0FBbEI7QUFDQSxXQUFPb0IsTUFBTTtBQUNYQyxjQUFRLE1BREc7QUFFWDVELFdBQUssYUFGTTtBQUdYNkQsWUFBTXRCO0FBSEssS0FBTixDQUFQO0FBS0QsR0FQRDtBQVFBLE9BQUtNLFFBQUwsR0FBZ0IsVUFBU0MsT0FBVCxFQUFrQjtBQUNoQyxXQUFPYSxNQUFNO0FBQ1hDLGNBQVEsTUFERztBQUVYNUQsV0FBSyxjQUZNO0FBR1g2RCxZQUFNZjtBQUhLLEtBQU4sQ0FBUDtBQUtELEdBTkQ7QUFPRCxDQXBDRCIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJb25pYyBTdGFydGVyIEFwcFxuXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xuLy8gJ3N0YXJ0ZXInIGlzIHRoZSBuYW1lIG9mIHRoaXMgYW5ndWxhciBtb2R1bGUgZXhhbXBsZSAoYWxzbyBzZXQgaW4gYSA8Ym9keT4gYXR0cmlidXRlIGluIGluZGV4Lmh0bWwpXG4vLyB0aGUgMm5kIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvZiAncmVxdWlyZXMnXG5hbmd1bGFyLm1vZHVsZSgnY2hvcmUnLCBbJ2lvbmljJywgJ3NhdGVsbGl6ZXInXSlcbi5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJGF1dGhQcm92aWRlcil7XG4gICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoXCIvaG9tZVwiKTtcbiAgJHN0YXRlUHJvdmlkZXJcbiAgLnN0YXRlKCdhZGRDaGlsZCcse1xuICAgIHVybDpcIi9hZGRDaGlsZFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2FkZENoaWxkLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImFkZENoaWxkQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnYXNzaWduQ2hvcmUnLHtcbiAgICB1cmw6XCIvYXNzaWduQ2hvcmVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9hc3NpZ25DaG9yZS5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJhc3NpZ25DaG9yZUN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2VkaXRDaGlsZCcse1xuICAgIHVybDpcIi9lZGl0Q2hpbGQvOmlkXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvZWRpdENoaWxkLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImVkaXRDaGlsZEN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2hpc3RvcnknLHtcbiAgICB1cmw6XCIvaGlzdG9yeVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2hpc3RvcnkuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiaGlzdG9yeUN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2hvbWUnLHtcbiAgICB1cmw6XCIvaG9tZVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2hvbWUuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiaG9tZUN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2xvZ2luJyx7XG4gICAgdXJsOlwiL2xvZ2luXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvTG9naW4uaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwibG9naW5DdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdtYWtlQ2hvcmUnLHtcbiAgICB1cmw6XCIvbWFrZUNob3JlXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvbWFrZUNob3JlLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcIm1ha2VDaG9yZUN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ3NldFJld2FyZHMnLHtcbiAgICB1cmw6XCIvc2V0UmV3YXJkcy86aWRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9zZXRSZXdhcmRzLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcInNldFJld2FyZHNDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdzZXR0aW5ncycse1xuICAgIHVybDpcIi9zZXR0aW5nc1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL3NldHRpbmdzLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcInNldHRpbmdzQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgndHJhY2tlcicse1xuICAgIHVybDpcIi90cmFja2VyLzppZFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL3RyYWNrZXIuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwidHJhY2tlckN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ3VzZXJJbmZvJyx7XG4gICAgdXJsOlwiL3VzZXJJbmZvXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvdXNlckluZm8uaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwidXNlckluZm9DdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdjaGlsZEJhbmsnLHtcbiAgICB1cmw6XCIvY2hpbGQvYmFua1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2NoaWxkQmFuay5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJjaGlsZEJhbmtDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdjaGlsZEhvbWUnLHtcbiAgICB1cmw6XCIvY2hpbGQvaG9tZVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2NoaWxkSG9tZS5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJjaGlsZEhvbWVDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdjaGlsZExvZ2luJyx7XG4gICAgdXJsOlwiL2NoaWxkL2xvZ2luXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvY2hpbGRMb2dpbi5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJjaGlsZExvZ2luQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnY2hpbGRTZXR0aW5ncycse1xuICAgIHVybDpcIi9jaGlsZC9zZXR0aW5nc1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2NoaWxkU2V0dGluZ3MuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRTZXR0aW5nc0N0cmxcIlxuICB9KTtcbiAgJGF1dGhQcm92aWRlci5mYWNlYm9vayh7XG4gICAgY2xpZW50SWQ6ICczMzIyNzIwNTcxMzI2ODEnXG4gIH0pO1xuXG4gIC8vIE9wdGlvbmFsOiBGb3IgY2xpZW50LXNpZGUgdXNlIChJbXBsaWNpdCBHcmFudCksIHNldCByZXNwb25zZVR5cGUgdG8gJ3Rva2VuJyAoZGVmYXVsdDogJ2NvZGUnKVxuICAkYXV0aFByb3ZpZGVyLmZhY2Vib29rKHtcbiAgICBjbGllbnRJZDogJzMzMjI3MjA1NzEzMjY4MScsXG4gICAgcmVzcG9uc2VUeXBlOiAndG9rZW4nXG4gIH0pO1xuXG4gICRhdXRoUHJvdmlkZXIuZ29vZ2xlKHtcbiAgICBjbGllbnRJZDogJzI3NTM1Mjk2MDk0Ni01cmNhbjNxa2hsc2M3bTUwaGV2NWRuMmUyY2FlOW1icC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbScsXG4gICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTAwLyMvbG9naW4vJ1xuICB9KTtcbn0pXG5cblxuXG4ucnVuKGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtKSB7XG4gICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIGlmKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgIC8vIEhpZGUgdGhlIGFjY2Vzc29yeSBiYXIgYnkgZGVmYXVsdCAocmVtb3ZlIHRoaXMgdG8gc2hvdyB0aGUgYWNjZXNzb3J5IGJhciBhYm92ZSB0aGUga2V5Ym9hcmRcbiAgICAgIC8vIGZvciBmb3JtIGlucHV0cylcbiAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG5cbiAgICAgIC8vIERvbid0IHJlbW92ZSB0aGlzIGxpbmUgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZy4gSXQgc3RvcHMgdGhlIHZpZXdwb3J0XG4gICAgICAvLyBmcm9tIHNuYXBwaW5nIHdoZW4gdGV4dCBpbnB1dHMgYXJlIGZvY3VzZWQuIElvbmljIGhhbmRsZXMgdGhpcyBpbnRlcm5hbGx5IGZvclxuICAgICAgLy8gYSBtdWNoIG5pY2VyIGtleWJvYXJkIGV4cGVyaWVuY2UuXG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbCh0cnVlKTtcbiAgICB9XG4gICAgaWYod2luZG93LlN0YXR1c0Jhcikge1xuICAgICAgU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpO1xuICAgIH1cbiAgfSk7XG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImFkZENoaWxkQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAvL2JhY2tidXR0b25cbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XG4gICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpXG4gIH1cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJhc3NpZ25DaG9yZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gYXNzaWduIGNob3JlIGNvbnRyb2xsZXJcIlxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImNoaWxkQmFua0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gYmFuayBjb250cm9sbGVyXCJcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJjaGlsZEhvbWVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tICBjaGlsZCBIb21lIGNvbnRyb2xsZXJcIlxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImNoaWxkTG9naW5DdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIGNoaWxkIExvZ2luIGNvbnRyb2xsZXJcIlxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImNoaWxkU2V0dGluZ3NDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIGNoaWxkIHNldHRpbmdzIGNvbnRyb2xsZXJcIlxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImVkaXRDaGlsZEN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XG4gICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpXG4gIH1cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJoaXN0b3J5Q3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBIaXN0b3J5IGNvbnRyb2xsZXJcIlxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImhvbWVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwpe1xuICAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBIb21lIGNvbnRyb2xsZXJcIlxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdiYW5uZXJNb2RhbC5odG1sJywge1xuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm1vZGFsID0gbW9kYWw7XG4gICB9KTtcbiAgICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAgJHNjb3BlLm1vZGFsLnNob3coKTtcbiAgIH07XG4gICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICAkc2NvcGUubW9kYWwuaGlkZSgpO1xuICAgfTtcbiAgIC8vIENsZWFudXAgdGhlIG1vZGFsIHdoZW4gd2UncmUgZG9uZSB3aXRoIGl0IVxuICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgJHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuICAgfSk7XG4gICAvLyBFeGVjdXRlIGFjdGlvbiBvbiBoaWRlIG1vZGFsXG4gICAkc2NvcGUuJG9uKCdtb2RhbC5oaWRkZW4nLCBmdW5jdGlvbigpIHtcbiAgICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgIH0pO1xuICAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gcmVtb3ZlIG1vZGFsXG4gICAkc2NvcGUuJG9uKCdtb2RhbC5yZW1vdmVkJywgZnVuY3Rpb24oKSB7XG4gICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gICB9KTtcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJsb2dpbkN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkYXV0aCwgJHN0YXRlLCBsb2dpblNlcnZpY2Upe1xuXG4kc2NvcGUubG9naW4gPSBmdW5jdGlvbih1c2VyKXtcbiAgY29uc29sZS5sb2codXNlcilcbiAgbG9naW5TZXJ2aWNlLnVzZXJMb2dpbih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAkYXV0aC5zZXRUb2tlbihyZXNwb25zZSlcbiAgICAgICRzdGF0ZS5nbygnaG9tZScpXG5cbiAgfSlcbn1cbiRzY29wZS5tYWtlVXNlciA9IGZ1bmN0aW9uKG5ld1VzZXIpe1xuICBsb2dpblNlcnZpY2UubWFrZVVzZXIobmV3VXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgJGF1dGguc2V0VG9rZW4ocmVzcG9uc2UpXG4gICAgICAkc3RhdGUuZ28oJ2hvbWUnKVxuICB9KVxufVxuICAkc2NvcGUuYXV0aGVudGljYXRlID0gZnVuY3Rpb24ocHJvdmlkZXIpIHtcbiAgJGF1dGguYXV0aGVudGljYXRlKHByb3ZpZGVyKX07XG4gIC8vICRzY29wZS50ZXN0ID0gXCJIZWxsbyBmcm9tIGxvZ2luIGNvbnRyb2xsZXJcIlxuICAkc2NvcGUucmV2ZWFsZXIgPSBmdW5jdGlvbigpe1xuICAkc2NvcGUuaGlkZSA9ICEkc2NvcGUuaGlkZTtcblxuIH1cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJtYWtlQ2hvcmVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxuICB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwic2V0UmV3YXJkc0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCl7XG4gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgncmV3YXJkTW9kYWwuaHRtbCcsIHtcbiAgICBzY29wZTogJHNjb3BlLFxuICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgJHNjb3BlLm1vZGFsID0gbW9kYWw7XG4gIH0pO1xuICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLnNob3coKTtcbiAgfTtcbiAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwuaGlkZSgpO1xuICB9O1xuICAvLyBDbGVhbnVwIHRoZSBtb2RhbCB3aGVuIHdlJ3JlIGRvbmUgd2l0aCBpdCFcbiAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwucmVtb3ZlKCk7XG4gIH0pO1xuICAvLyBFeGVjdXRlIGFjdGlvbiBvbiBoaWRlIG1vZGFsXG4gICRzY29wZS4kb24oJ21vZGFsLmhpZGRlbicsIGZ1bmN0aW9uKCkge1xuICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gIH0pO1xuICAvLyBFeGVjdXRlIGFjdGlvbiBvbiByZW1vdmUgbW9kYWxcbiAgJHNjb3BlLiRvbignbW9kYWwucmVtb3ZlZCcsIGZ1bmN0aW9uKCkge1xuICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gIH0pO1xuXG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwic2V0dGluZ3NDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwpe1xuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2NoYW5nZVBhc3N3b3JkLmh0bWwnLCB7XG4gICAgIGlkOiAnMScsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsMSA9IG1vZGFsO1xuICAgfSk7XG5cbiAgIC8vIE1vZGFsIDJcbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnY2hhbmdlSG91c2Vob2xkLmh0bWwnLCB7XG4gICAgIGlkOiAnMicsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsMiA9IG1vZGFsO1xuICAgfSk7XG5cbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnY2hhbmdlWmlwLmh0bWwnLCB7XG4gICAgIGlkOiAnMycsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsMyA9IG1vZGFsO1xuICAgfSk7XG5cbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnYWRkUGFyZW50Lmh0bWwnLCB7XG4gICAgIGlkOiAnNCcsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsNCA9IG1vZGFsO1xuICAgfSk7XG5cbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgncmVtb3ZlQ2hpbGQuaHRtbCcsIHtcbiAgICAgaWQ6ICc1JywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWw1ID0gbW9kYWw7XG4gICB9KTtcblxuXG5cbiAgICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICBpZiAoaW5kZXggPT0gMSkgJHNjb3BlLm9Nb2RhbDEuc2hvdygpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDIpICRzY29wZS5vTW9kYWwyLnNob3coKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSAzKSAkc2NvcGUub01vZGFsMy5zaG93KCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gNCkgJHNjb3BlLm9Nb2RhbDQuc2hvdygpO1xuICAgICBlbHNlICRzY29wZS5vTW9kYWw1LnNob3coKTtcbiAgIH07XG5cbiAgICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgaWYgKGluZGV4ID09IDEpICRzY29wZS5vTW9kYWwxLmhpZGUoKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSAyKSAkc2NvcGUub01vZGFsMi5oaWRlKCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMykgJHNjb3BlLm9Nb2RhbDMuaGlkZSgpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDQpICRzY29wZS5vTW9kYWw0LmhpZGUoKTtcbiAgICAgZWxzZSAkc2NvcGUub01vZGFsNS5oaWRlKCk7XG4gICB9O1xuXG4gICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAkc2NvcGUub01vZGFsMS5yZW1vdmUoKTtcbiAgICAgJHNjb3BlLm9Nb2RhbDIucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWwzLnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsNC5yZW1vdmUoKTtcbiAgICAgJHNjb3BlLm9Nb2RhbDUucmVtb3ZlKCk7XG4gICB9KTtcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJ0cmFja2VyQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsKXtcbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdwaWNDb25mTW9kYWwuaHRtbCcsIHtcbiAgICBzY29wZTogJHNjb3BlLFxuICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgJHNjb3BlLm1vZGFsID0gbW9kYWw7XG4gIH0pO1xuICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLnNob3coKTtcbiAgfTtcbiAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwuaGlkZSgpO1xuICB9O1xuICAvLyBDbGVhbnVwIHRoZSBtb2RhbCB3aGVuIHdlJ3JlIGRvbmUgd2l0aCBpdCFcbiAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwucmVtb3ZlKCk7XG4gIH0pO1xuICAvLyBFeGVjdXRlIGFjdGlvbiBvbiBoaWRlIG1vZGFsXG4gICRzY29wZS4kb24oJ21vZGFsLmhpZGRlbicsIGZ1bmN0aW9uKCkge1xuICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gIH0pO1xuICAvLyBFeGVjdXRlIGFjdGlvbiBvbiByZW1vdmUgbW9kYWxcbiAgJHNjb3BlLiRvbignbW9kYWwucmVtb3ZlZCcsIGZ1bmN0aW9uKCkge1xuICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gIH0pO1xuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcInVzZXJJbmZvQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBpbmZvIGNvbnRyb2xsZXJcIlxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuc2VydmljZSgnbG9naW5TZXJ2aWNlJywgZnVuY3Rpb24oJGh0dHApe1xuICAvLyB0aGlzLmxvZ2luID0gZnVuY3Rpb24ocHJvdmlkZXIpe1xuICAvL1xuICAvLyAkaHR0cCh7XG4gIC8vICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gIC8vICAgICB1cmw6IFwiL2FwaS9tZVwiXG4gIC8vXG4gIC8vICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gIC8vICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgLy9cbiAgLy9cbiAgLy9cbiAgLy8gICB9KTtcblxuICAvLyB0aGlzLnBheUxvYWQgPSBmdW5jdGlvbigpIHtcbiAgLy8gICB2YXIgcGF5TG9hZERhdGEgPSAkYXV0aC5nZXRQYXlsb2FkKCkge1xuICAvLyAgICAgcmV0dXJuIHBheUxvYWREYXRhO1xuICAvLyAgIH1cbiAgLy8gfVxuXG5cbiAgdGhpcy51c2VyTG9naW4gPSBmdW5jdGlvbih1c2VyKSB7XG4gICAgY29uc29sZS5sb2codXNlciwgXCJzZXJ2aWNlXCIpXG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB1cmw6ICcvYXV0aC9sb2dpbicsXG4gICAgICBkYXRhOiB1c2VyXG4gICAgfSlcbiAgfVxuICB0aGlzLm1ha2VVc2VyID0gZnVuY3Rpb24obmV3VXNlcikge1xuICAgIHJldHVybiAkaHR0cCh7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgdXJsOiAnL2F1dGgvc2lnbnVwJyxcbiAgICAgIGRhdGE6IG5ld1VzZXJcbiAgICB9KVxuICB9XG59KTtcbiJdfQ==
