'use strict';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('chore', ['ionic', 'satellizer']).config(function ($stateProvider, $authProvider) {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXJzL2FkZENoaWxkQ3RybC5qcyIsImNvbnRyb2xsZXJzL2Fzc2lnbkNob3JlQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NoaWxkQmFua0N0cmwuanMiLCJjb250cm9sbGVycy9jaGlsZEhvbWVDdHJsLmpzIiwiY29udHJvbGxlcnMvY2hpbGRMb2dpbkN0cmwuanMiLCJjb250cm9sbGVycy9jaGlsZFNldHRpbmdzQ3RybC5qcyIsImNvbnRyb2xsZXJzL2VkaXRDaGlsZEN0cmwuanMiLCJjb250cm9sbGVycy9oaXN0b3J5Q3RybC5qcyIsImNvbnRyb2xsZXJzL2hvbWVDdHJsLmpzIiwiY29udHJvbGxlcnMvbG9naW5DdHJsLmpzIiwiY29udHJvbGxlcnMvbWFrZUNob3JlQ3RybC5qcyIsImNvbnRyb2xsZXJzL3NldFJld2FyZHNDdHJsLmpzIiwiY29udHJvbGxlcnMvc2V0dGluZ3NDdHJsLmpzIiwiY29udHJvbGxlcnMvdHJhY2tlckN0cmwuanMiLCJjb250cm9sbGVycy91c2VySW5mb0N0cmwuanMiLCJzZXJ2aWNlL2xvZ2luU2VydmljZS5qcyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwiY29uZmlnIiwiJHN0YXRlUHJvdmlkZXIiLCIkYXV0aFByb3ZpZGVyIiwic3RhdGUiLCJ1cmwiLCJ0ZW1wbGF0ZVVybCIsImNvbnRyb2xsZXIiLCJmYWNlYm9vayIsImNsaWVudElkIiwicmVzcG9uc2VUeXBlIiwiZ29vZ2xlIiwicnVuIiwiJGlvbmljUGxhdGZvcm0iLCJyZWFkeSIsIndpbmRvdyIsImNvcmRvdmEiLCJwbHVnaW5zIiwiS2V5Ym9hcmQiLCJoaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIiLCJkaXNhYmxlU2Nyb2xsIiwiU3RhdHVzQmFyIiwic3R5bGVEZWZhdWx0IiwiJHNjb3BlIiwiZ29iYWNrIiwiaGlzdG9yeSIsImdvIiwidGVzdCIsIiRpb25pY01vZGFsIiwiZnJvbVRlbXBsYXRlVXJsIiwic2NvcGUiLCJhbmltYXRpb24iLCJ0aGVuIiwibW9kYWwiLCJvcGVuTW9kYWwiLCJzaG93IiwiY2xvc2VNb2RhbCIsImhpZGUiLCIkb24iLCJyZW1vdmUiLCIkYXV0aCIsIiRzdGF0ZSIsImxvZ2luU2VydmljZSIsImxvZ2luIiwidXNlciIsImNvbnNvbGUiLCJsb2ciLCJ1c2VyTG9naW4iLCJyZXNwb25zZSIsInNldFRva2VuIiwibWFrZVVzZXIiLCJuZXdVc2VyIiwiYXV0aGVudGljYXRlIiwicHJvdmlkZXIiLCJyZXZlYWxlciIsImlkIiwiYmFja2Ryb3BDbGlja1RvQ2xvc2UiLCJvTW9kYWwxIiwib01vZGFsMiIsIm9Nb2RhbDMiLCJvTW9kYWw0Iiwib01vZGFsNSIsImluZGV4Iiwic2VydmljZSIsIiRodHRwIiwibWV0aG9kIiwiZGF0YSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQUEsUUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0IsQ0FBQyxPQUFELEVBQVUsWUFBVixDQUF4QixFQUNDQyxNQURELENBQ1EsVUFBU0MsY0FBVCxFQUF5QkMsYUFBekIsRUFBdUM7QUFDN0NELGlCQUNDRSxLQURELENBQ08sVUFEUCxFQUNrQjtBQUNoQkMsU0FBSSxXQURZO0FBRWhCQyxpQkFBYSwyQkFGRztBQUdoQkMsZ0JBQVk7QUFISSxHQURsQixFQU1DSCxLQU5ELENBTU8sYUFOUCxFQU1xQjtBQUNuQkMsU0FBSSxjQURlO0FBRW5CQyxpQkFBYSw4QkFGTTtBQUduQkMsZ0JBQVk7QUFITyxHQU5yQixFQVdDSCxLQVhELENBV08sV0FYUCxFQVdtQjtBQUNqQkMsU0FBSSxnQkFEYTtBQUVqQkMsaUJBQWEsNEJBRkk7QUFHakJDLGdCQUFZO0FBSEssR0FYbkIsRUFnQkNILEtBaEJELENBZ0JPLFNBaEJQLEVBZ0JpQjtBQUNmQyxTQUFJLFVBRFc7QUFFZkMsaUJBQWEsMEJBRkU7QUFHZkMsZ0JBQVk7QUFIRyxHQWhCakIsRUFxQkNILEtBckJELENBcUJPLE1BckJQLEVBcUJjO0FBQ1pDLFNBQUksT0FEUTtB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QUFYLEVBQTRCLFlBQVc7QUFDckM7QUFDRCxHQUZEO0FBSUQsQ0ExQkQ7OztBQ0FBdkMsUUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0JPLFVBQXhCLENBQW1DLGNBQW5DLEVBQW1ELFVBQVNnQixNQUFULEVBQWdCO0FBQ2hFQSxVQUFPSSxJQUFQLEdBQWMsOEJBQWQ7QUFFRixDQUhEOzs7QUNBQTVCLFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCK0QsT0FBeEIsQ0FBZ0MsY0FBaEMsRUFBZ0QsVUFBU0MsS0FBVCxFQUFlO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxPQUFLakIsU0FBTCxHQUFpQixVQUFTSCxJQUFULEVBQWU7QUFDOUJDLFlBQVFDLEdBQVIsQ0FBWUYsSUFBWixFQUFrQixTQUFsQjtBQUNBLFdBQU9vQixNQUFNO0FBQ1hDLGNBQVEsTUFERztBQUVYNUQsV0FBSyxhQUZNO0FBR1g2RCxZQUFNdEI7QUFISyxLQUFOLENBQVA7QUFLRCxHQVBEO0FBUUEsT0FBS00sUUFBTCxHQUFnQixVQUFTQyxPQUFULEVBQWtCO0FBQ2hDLFdBQU9hLE1BQU07QUFDWEMsY0FBUSxNQURHO0FBRVg1RCxXQUFLLGNBRk07QUFHWDZELFlBQU1mO0FBSEssS0FBTixDQUFQO0FBS0QsR0FORDtBQU9ELENBcENEIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIElvbmljIFN0YXJ0ZXIgQXBwXG5cbi8vIGFuZ3VsYXIubW9kdWxlIGlzIGEgZ2xvYmFsIHBsYWNlIGZvciBjcmVhdGluZywgcmVnaXN0ZXJpbmcgYW5kIHJldHJpZXZpbmcgQW5ndWxhciBtb2R1bGVzXG4vLyAnc3RhcnRlcicgaXMgdGhlIG5hbWUgb2YgdGhpcyBhbmd1bGFyIG1vZHVsZSBleGFtcGxlIChhbHNvIHNldCBpbiBhIDxib2R5PiBhdHRyaWJ1dGUgaW4gaW5kZXguaHRtbClcbi8vIHRoZSAybmQgcGFyYW1ldGVyIGlzIGFuIGFycmF5IG9mICdyZXF1aXJlcydcbmFuZ3VsYXIubW9kdWxlKCdjaG9yZScsIFsnaW9uaWMnLCAnc2F0ZWxsaXplciddKVxuLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJGF1dGhQcm92aWRlcil7XG4gICRzdGF0ZVByb3ZpZGVyXG4gIC5zdGF0ZSgnYWRkQ2hpbGQnLHtcbiAgICB1cmw6XCIvYWRkQ2hpbGRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9hZGRDaGlsZC5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJhZGRDaGlsZEN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2Fzc2lnbkNob3JlJyx7XG4gICAgdXJsOlwiL2Fzc2lnbkNob3JlXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvYXNzaWduQ2hvcmUuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiYXNzaWduQ2hvcmVDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdlZGl0Q2hpbGQnLHtcbiAgICB1cmw6XCIvZWRpdENoaWxkLzppZFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2VkaXRDaGlsZC5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJlZGl0Q2hpbGRDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdoaXN0b3J5Jyx7XG4gICAgdXJsOlwiL2hpc3RvcnlcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9oaXN0b3J5Lmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImhpc3RvcnlDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdob21lJyx7XG4gICAgdXJsOlwiL2hvbWVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9ob21lLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImhvbWVDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdsb2dpbicse1xuICAgIHVybDpcIi9sb2dpblwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL0xvZ2luLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImxvZ2luQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnbWFrZUNob3JlJyx7XG4gICAgdXJsOlwiL21ha2VDaG9yZVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL21ha2VDaG9yZS5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJtYWtlQ2hvcmVDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdzZXRSZXdhcmRzJyx7XG4gICAgdXJsOlwiL3NldFJld2FyZHMvOmlkXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvc2V0UmV3YXJkcy5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJzZXRSZXdhcmRzQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnc2V0dGluZ3MnLHtcbiAgICB1cmw6XCIvc2V0dGluZ3NcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9zZXR0aW5ncy5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJzZXR0aW5nc0N0cmxcIlxuICB9KVxuICAuc3RhdGUoJ3RyYWNrZXInLHtcbiAgICB1cmw6XCIvdHJhY2tlci86aWRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy90cmFja2VyLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcInRyYWNrZXJDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCd1c2VySW5mbycse1xuICAgIHVybDpcIi91c2VySW5mb1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL3VzZXJJbmZvLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcInVzZXJJbmZvQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnY2hpbGRCYW5rJyx7XG4gICAgdXJsOlwiL2NoaWxkL2JhbmtcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9jaGlsZEJhbmsuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRCYW5rQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnY2hpbGRIb21lJyx7XG4gICAgdXJsOlwiL2NoaWxkL2hvbWVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9jaGlsZEhvbWUuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRIb21lQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnY2hpbGRMb2dpbicse1xuICAgIHVybDpcIi9jaGlsZC9sb2dpblwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2NoaWxkTG9naW4uaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRMb2dpbkN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2NoaWxkU2V0dGluZ3MnLHtcbiAgICB1cmw6XCIvY2hpbGQvc2V0dGluZ3NcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9jaGlsZFNldHRpbmdzLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImNoaWxkU2V0dGluZ3NDdHJsXCJcbiAgfSk7XG4gICRhdXRoUHJvdmlkZXIuZmFjZWJvb2soe1xuICAgIGNsaWVudElkOiAnMzMyMjcyMDU3MTMyNjgxJ1xuICB9KTtcblxuICAvLyBPcHRpb25hbDogRm9yIGNsaWVudC1zaWRlIHVzZSAoSW1wbGljaXQgR3JhbnQpLCBzZXQgcmVzcG9uc2VUeXBlIHRvICd0b2tlbicgKGRlZmF1bHQ6ICdjb2RlJylcbiAgJGF1dGhQcm92aWRlci5mYWNlYm9vayh7XG4gICAgY2xpZW50SWQ6ICczMzIyNzIwNTcxMzI2ODEnLFxuICAgIHJlc3BvbnNlVHlwZTogJ3Rva2VuJ1xuICB9KTtcblxuICAkYXV0aFByb3ZpZGVyLmdvb2dsZSh7XG4gICAgY2xpZW50SWQ6ICcyNzUzNTI5NjA5NDYtNXJjYW4zcWtobHNjN201MGhldjVkbjJlMmNhZTltYnAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20nLFxuICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODEwMC8jL2xvZ2luLydcbiAgfSk7XG59KVxuXG5cblxuLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xuICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICBpZih3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuXG4gICAgICAvLyBEb24ndCByZW1vdmUgdGhpcyBsaW5lIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuIEl0IHN0b3BzIHRoZSB2aWV3cG9ydFxuICAgICAgLy8gZnJvbSBzbmFwcGluZyB3aGVuIHRleHQgaW5wdXRzIGFyZSBmb2N1c2VkLiBJb25pYyBoYW5kbGVzIHRoaXMgaW50ZXJuYWxseSBmb3JcbiAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgfVxuICAgIGlmKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcbiAgICB9XG4gIH0pO1xufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJhZGRDaGlsZEN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgLy9iYWNrYnV0dG9uXG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxuICB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiYXNzaWduQ2hvcmVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIGFzc2lnbiBjaG9yZSBjb250cm9sbGVyXCJcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJjaGlsZEJhbmtDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIGJhbmsgY29udHJvbGxlclwiXG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiY2hpbGRIb21lQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSAgY2hpbGQgSG9tZSBjb250cm9sbGVyXCJcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJjaGlsZExvZ2luQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBjaGlsZCBMb2dpbiBjb250cm9sbGVyXCJcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJjaGlsZFNldHRpbmdzQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBjaGlsZCBzZXR0aW5ncyBjb250cm9sbGVyXCJcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJlZGl0Q2hpbGRDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxuICB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiaGlzdG9yeUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gSGlzdG9yeSBjb250cm9sbGVyXCJcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJob21lQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsKXtcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gSG9tZSBjb250cm9sbGVyXCJcbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnYmFubmVyTW9kYWwuaHRtbCcsIHtcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5tb2RhbCA9IG1vZGFsO1xuICAgfSk7XG4gICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgICRzY29wZS5tb2RhbC5zaG93KCk7XG4gICB9O1xuICAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcbiAgIH07XG4gICAvLyBDbGVhbnVwIHRoZSBtb2RhbCB3aGVuIHdlJ3JlIGRvbmUgd2l0aCBpdCFcbiAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICRzY29wZS5tb2RhbC5yZW1vdmUoKTtcbiAgIH0pO1xuICAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gaGlkZSBtb2RhbFxuICAgJHNjb3BlLiRvbignbW9kYWwuaGlkZGVuJywgZnVuY3Rpb24oKSB7XG4gICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gICB9KTtcbiAgIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIHJlbW92ZSBtb2RhbFxuICAgJHNjb3BlLiRvbignbW9kYWwucmVtb3ZlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAvLyBFeGVjdXRlIGFjdGlvblxuICAgfSk7XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwibG9naW5DdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGF1dGgsICRzdGF0ZSwgbG9naW5TZXJ2aWNlKXtcblxuJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24odXNlcil7XG4gIGNvbnNvbGUubG9nKHVzZXIpXG4gIGxvZ2luU2VydmljZS51c2VyTG9naW4odXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgJGF1dGguc2V0VG9rZW4ocmVzcG9uc2UpXG4gICAgICAkc3RhdGUuZ28oJ2hvbWUnKVxuXG4gIH0pXG59XG4kc2NvcGUubWFrZVVzZXIgPSBmdW5jdGlvbihuZXdVc2VyKXtcbiAgbG9naW5TZXJ2aWNlLm1ha2VVc2VyKG5ld1VzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICRhdXRoLnNldFRva2VuKHJlc3BvbnNlKVxuICAgICAgJHN0YXRlLmdvKCdob21lJylcbiAgfSlcbn1cbiAgJHNjb3BlLmF1dGhlbnRpY2F0ZSA9IGZ1bmN0aW9uKHByb3ZpZGVyKSB7XG4gICRhdXRoLmF1dGhlbnRpY2F0ZShwcm92aWRlcil9O1xuICAvLyAkc2NvcGUudGVzdCA9IFwiSGVsbG8gZnJvbSBsb2dpbiBjb250cm9sbGVyXCJcbiAgJHNjb3BlLnJldmVhbGVyID0gZnVuY3Rpb24oKXtcbiAgJHNjb3BlLmhpZGUgPSAhJHNjb3BlLmhpZGU7XG5cbiB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwibWFrZUNob3JlQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAkc2NvcGUuZ29iYWNrID0gZnVuY3Rpb24oKXtcbiAgICB3aW5kb3cuaGlzdG9yeS5nbygtMSlcbiAgfVxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcInNldFJld2FyZHNDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwpe1xuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3Jld2FyZE1vZGFsLmh0bWwnLCB7XG4gICAgc2NvcGU6ICRzY29wZSxcbiAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICRzY29wZS5tb2RhbCA9IG1vZGFsO1xuICB9KTtcbiAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5zaG93KCk7XG4gIH07XG4gICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcbiAgfTtcbiAgLy8gQ2xlYW51cCB0aGUgbW9kYWwgd2hlbiB3ZSdyZSBkb25lIHdpdGggaXQhXG4gICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuICB9KTtcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gaGlkZSBtb2RhbFxuICAkc2NvcGUuJG9uKCdtb2RhbC5oaWRkZW4nLCBmdW5jdGlvbigpIHtcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxuICB9KTtcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gcmVtb3ZlIG1vZGFsXG4gICRzY29wZS4kb24oJ21vZGFsLnJlbW92ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxuICB9KTtcblxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcInNldHRpbmdzQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsKXtcbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdjaGFuZ2VQYXNzd29yZC5odG1sJywge1xuICAgICBpZDogJzEnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDEgPSBtb2RhbDtcbiAgIH0pO1xuXG4gICAvLyBNb2RhbCAyXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2NoYW5nZUhvdXNlaG9sZC5odG1sJywge1xuICAgICBpZDogJzInLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDIgPSBtb2RhbDtcbiAgIH0pO1xuXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2NoYW5nZVppcC5odG1sJywge1xuICAgICBpZDogJzMnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDMgPSBtb2RhbDtcbiAgIH0pO1xuXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2FkZFBhcmVudC5odG1sJywge1xuICAgICBpZDogJzQnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDQgPSBtb2RhbDtcbiAgIH0pO1xuXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3JlbW92ZUNoaWxkLmh0bWwnLCB7XG4gICAgIGlkOiAnNScsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsNSA9IG1vZGFsO1xuICAgfSk7XG5cblxuXG4gICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgaWYgKGluZGV4ID09IDEpICRzY29wZS5vTW9kYWwxLnNob3coKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSAyKSAkc2NvcGUub01vZGFsMi5zaG93KCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMykgJHNjb3BlLm9Nb2RhbDMuc2hvdygpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDQpICRzY29wZS5vTW9kYWw0LnNob3coKTtcbiAgICAgZWxzZSAkc2NvcGUub01vZGFsNS5zaG93KCk7XG4gICB9O1xuXG4gICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgIGlmIChpbmRleCA9PSAxKSAkc2NvcGUub01vZGFsMS5oaWRlKCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMikgJHNjb3BlLm9Nb2RhbDIuaGlkZSgpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDMpICRzY29wZS5vTW9kYWwzLmhpZGUoKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSA0KSAkc2NvcGUub01vZGFsNC5oaWRlKCk7XG4gICAgIGVsc2UgJHNjb3BlLm9Nb2RhbDUuaGlkZSgpO1xuICAgfTtcblxuICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDEucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWwyLnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsMy5yZW1vdmUoKTtcbiAgICAgJHNjb3BlLm9Nb2RhbDQucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWw1LnJlbW92ZSgpO1xuICAgfSk7XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwidHJhY2tlckN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCl7XG4gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgncGljQ29uZk1vZGFsLmh0bWwnLCB7XG4gICAgc2NvcGU6ICRzY29wZSxcbiAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICRzY29wZS5tb2RhbCA9IG1vZGFsO1xuICB9KTtcbiAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5zaG93KCk7XG4gIH07XG4gICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcbiAgfTtcbiAgLy8gQ2xlYW51cCB0aGUgbW9kYWwgd2hlbiB3ZSdyZSBkb25lIHdpdGggaXQhXG4gICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuICB9KTtcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gaGlkZSBtb2RhbFxuICAkc2NvcGUuJG9uKCdtb2RhbC5oaWRkZW4nLCBmdW5jdGlvbigpIHtcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxuICB9KTtcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gcmVtb3ZlIG1vZGFsXG4gICRzY29wZS4kb24oJ21vZGFsLnJlbW92ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxuICB9KTtcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJ1c2VySW5mb0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gaW5mbyBjb250cm9sbGVyXCJcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLnNlcnZpY2UoJ2xvZ2luU2VydmljZScsIGZ1bmN0aW9uKCRodHRwKXtcbiAgLy8gdGhpcy5sb2dpbiA9IGZ1bmN0aW9uKHByb3ZpZGVyKXtcbiAgLy9cbiAgLy8gJGh0dHAoe1xuICAvLyAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAvLyAgICAgdXJsOiBcIi9hcGkvbWVcIlxuICAvL1xuICAvLyAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAvLyAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gIC8vXG4gIC8vXG4gIC8vXG4gIC8vICAgfSk7XG5cbiAgLy8gdGhpcy5wYXlMb2FkID0gZnVuY3Rpb24oKSB7XG4gIC8vICAgdmFyIHBheUxvYWREYXRhID0gJGF1dGguZ2V0UGF5bG9hZCgpIHtcbiAgLy8gICAgIHJldHVybiBwYXlMb2FkRGF0YTtcbiAgLy8gICB9XG4gIC8vIH1cblxuXG4gIHRoaXMudXNlckxvZ2luID0gZnVuY3Rpb24odXNlcikge1xuICAgIGNvbnNvbGUubG9nKHVzZXIsIFwic2VydmljZVwiKVxuICAgIHJldHVybiAkaHR0cCh7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgdXJsOiAnL2F1dGgvbG9naW4nLFxuICAgICAgZGF0YTogdXNlclxuICAgIH0pXG4gIH1cbiAgdGhpcy5tYWtlVXNlciA9IGZ1bmN0aW9uKG5ld1VzZXIpIHtcbiAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIHVybDogJy9hdXRoL3NpZ251cCcsXG4gICAgICBkYXRhOiBuZXdVc2VyXG4gICAgfSlcbiAgfVxufSk7XG4iXX0=
