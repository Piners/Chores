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
'use strict';


angular.module('chore').controller("userInfoCtrl", function ($scope) {
   $scope.test = "Message from info controller";
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXJzL2FkZENoaWxkQ3RybC5qcyIsImNvbnRyb2xsZXJzL2Fzc2lnbkNob3JlQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NoaWxkQmFua0N0cmwuanMiLCJjb250cm9sbGVycy9jaGlsZEhvbWVDdHJsLmpzIiwiY29udHJvbGxlcnMvY2hpbGRMb2dpbkN0cmwuanMiLCJjb250cm9sbGVycy9jaGlsZFNldHRpbmdzQ3RybC5qcyIsImNvbnRyb2xsZXJzL2VkaXRDaGlsZEN0cmwuanMiLCJjb250cm9sbGVycy9oaXN0b3J5Q3RybC5qcyIsImNvbnRyb2xsZXJzL2hvbWVDdHJsLmpzIiwiY29udHJvbGxlcnMvbG9naW5DdHJsLmpzIiwiY29udHJvbGxlcnMvbWFrZUNob3JlQ3RybC5qcyIsImNvbnRyb2xsZXJzL3NldFJld2FyZHNDdHJsLmpzIiwiY29udHJvbGxlcnMvc2V0dGluZ3NDdHJsLmpzIiwiY29udHJvbGxlcnMvdHJhY2tlckN0cmwuanMiLCJjb250cm9sbGVycy91c2VySW5mb0N0cmwuanMiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsImNvbmZpZyIsIiRzdGF0ZVByb3ZpZGVyIiwic3RhdGUiLCJ1cmwiLCJ0ZW1wbGF0ZVVybCIsImNvbnRyb2xsZXIiLCJydW4iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5Iiwid2luZG93IiwiY29yZG92YSIsInBsdWdpbnMiLCJLZXlib2FyZCIsImhpZGVLZXlib2FyZEFjY2Vzc29yeUJhciIsImRpc2FibGVTY3JvbGwiLCJTdGF0dXNCYXIiLCJzdHlsZURlZmF1bHQiLCIkc2NvcGUiLCJnb2JhY2siLCJoaXN0b3J5IiwiZ28iLCJ0ZXN0IiwiJGlvbmljTW9kYWwiLCJmcm9tVGVtcGxhdGVVcmwiLCJzY29wZSIsImFuaW1hdGlvbiIsInRoZW4iLCJtb2RhbCIsIm9wZW5Nb2RhbCIsInNob3ciLCJjbG9zZU1vZGFsIiwiaGlkZSIsIiRvbiIsInJlbW92ZSIsInJldmVhbGVyIiwiaWQiLCJiYWNrZHJvcENsaWNrVG9DbG9zZSIsIm9Nb2RhbDEiLCJvTW9kYWwyIiwib01vZGFsMyIsIm9Nb2RhbDQiLCJvTW9kYWw1IiwiaW5kZXgiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0FBLFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCLENBQUMsT0FBRCxDQUF4QixFQUNDQyxNQURELENBQ1EsVUFBU0MsY0FBVCxFQUF3QjtBQUM5QkEsaUJBQ0NDLEtBREQsQ0FDTyxVQURQLEVBQ2tCO0FBQ2hCQyxTQUFJLFdBRFk7QUFFaEJDLGlCQUFhLDJCQUZHO0FBR2hCQyxnQkFBWTtBQUhJLEdBRGxCLEVBTUNILEtBTkQsQ0FNTyxhQU5QLEVBTXFCO0FBQ25CQyxTQUFJLGNBRGU7QUFFbkJDLGlCQUFhLDhCQUZNO0FBR25CQyxnQkFBWTtBQUhPLEdBTnJCLEVBV0NILEtBWEQsQ0FXTyxXQVhQLEVBV21CO0FBQ2pCQyxTQUFJLGdCQURhO0FBRWpCQyxpQkFBYSw0QkFGSTtBQUdqQkMsZ0JBQVk7QUFISyxHQVhuQixFQWdCQ0gsS0FoQkQsQ0FnQk8sU0FoQlAsRUFnQmlCO0FBQ2ZDLFNBQUksVUFEVztBQUVmQyxpQkFBYSwwQkFGRTtBQUdmQyxnQkFBWTtBQUhHLEdBaEJqQixFQXFCQ0gsS0FyQkQsQ0FxQk8sTUFyQlAsRUFxQmM7QUFDWkMsU0FBSSxPQURRO0FBRVpDLGlCQUFhLHVCQUZEO0FBR1pDLGdCQUFZO0FBSEEsR0FyQmQsRUEwQkNILEtBMUJELENBMEJPLE9BMUJQLEVBMEJlO0FBQ2JDLFNBQUksUUFEUztBQUViQyxpQkFBYSx3QkFGQTtBQUdiQyxnQkFBWTtBQUhDLEdBMUJmLEVBK0JDSCxLQS9CRCxDQStCTyxXQS9CUCxFQStCbUI7QUFDakJDLFNBQUksWUFEYTtBQUVqQkMsaUJBQWEsNEJBRkk7QUFHakJDLGdCQUFZO0FBSEssR0EvQm5CLEVBb0NDSCxLQXBDRCxDQW9DTyxZQXBDUCxFQW9Db0I7QUFDbEJDLFNBQUksaUJBRGM7QUFFbEJDLGlCQUFhLDZCQUZL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c0NvbnRlbnQiOlsiLy8gSW9uaWMgU3RhcnRlciBBcHBcclxuXHJcbi8vIGFuZ3VsYXIubW9kdWxlIGlzIGEgZ2xvYmFsIHBsYWNlIGZvciBjcmVhdGluZywgcmVnaXN0ZXJpbmcgYW5kIHJldHJpZXZpbmcgQW5ndWxhciBtb2R1bGVzXHJcbi8vICdzdGFydGVyJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxyXG4vLyB0aGUgMm5kIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvZiAncmVxdWlyZXMnXHJcbmFuZ3VsYXIubW9kdWxlKCdjaG9yZScsIFsnaW9uaWMnXSlcclxuLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcil7XHJcbiAgJHN0YXRlUHJvdmlkZXJcclxuICAuc3RhdGUoJ2FkZENoaWxkJyx7XHJcbiAgICB1cmw6XCIvYWRkQ2hpbGRcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2FkZENoaWxkLmh0bWxcIixcclxuICAgIGNvbnRyb2xsZXI6IFwiYWRkQ2hpbGRDdHJsXCJcclxuICB9KVxyXG4gIC5zdGF0ZSgnYXNzaWduQ2hvcmUnLHtcclxuICAgIHVybDpcIi9hc3NpZ25DaG9yZVwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvYXNzaWduQ2hvcmUuaHRtbFwiLFxyXG4gICAgY29udHJvbGxlcjogXCJhc3NpZ25DaG9yZUN0cmxcIlxyXG4gIH0pXHJcbiAgLnN0YXRlKCdlZGl0Q2hpbGQnLHtcclxuICAgIHVybDpcIi9lZGl0Q2hpbGQvOmlkXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9lZGl0Q2hpbGQuaHRtbFwiLFxyXG4gICAgY29udHJvbGxlcjogXCJlZGl0Q2hpbGRDdHJsXCJcclxuICB9KVxyXG4gIC5zdGF0ZSgnaGlzdG9yeScse1xyXG4gICAgdXJsOlwiL2hpc3RvcnlcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2hpc3RvcnkuaHRtbFwiLFxyXG4gICAgY29udHJvbGxlcjogXCJoaXN0b3J5Q3RybFwiXHJcbiAgfSlcclxuICAuc3RhdGUoJ2hvbWUnLHtcclxuICAgIHVybDpcIi9ob21lXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9ob21lLmh0bWxcIixcclxuICAgIGNvbnRyb2xsZXI6IFwiaG9tZUN0cmxcIlxyXG4gIH0pXHJcbiAgLnN0YXRlKCdsb2dpbicse1xyXG4gICAgdXJsOlwiL2xvZ2luXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9Mb2dpbi5odG1sXCIsXHJcbiAgICBjb250cm9sbGVyOiBcImxvZ2luQ3RybFwiXHJcbiAgfSlcclxuICAuc3RhdGUoJ21ha2VDaG9yZScse1xyXG4gICAgdXJsOlwiL21ha2VDaG9yZVwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvbWFrZUNob3JlLmh0bWxcIixcclxuICAgIGNvbnRyb2xsZXI6IFwibWFrZUNob3JlQ3RybFwiXHJcbiAgfSlcclxuICAuc3RhdGUoJ3NldFJld2FyZHMnLHtcclxuICAgIHVybDpcIi9zZXRSZXdhcmRzLzppZFwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvc2V0UmV3YXJkcy5odG1sXCIsXHJcbiAgICBjb250cm9sbGVyOiBcInNldFJld2FyZHNDdHJsXCJcclxuICB9KVxyXG4gIC5zdGF0ZSgnc2V0dGluZ3MnLHtcclxuICAgIHVybDpcIi9zZXR0aW5nc1wiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvc2V0dGluZ3MuaHRtbFwiLFxyXG4gICAgY29udHJvbGxlcjogXCJzZXR0aW5nc0N0cmxcIlxyXG4gIH0pXHJcbiAgLnN0YXRlKCd0cmFja2VyJyx7XHJcbiAgICB1cmw6XCIvdHJhY2tlci86aWRcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL3RyYWNrZXIuaHRtbFwiLFxyXG4gICAgY29udHJvbGxlcjogXCJ0cmFja2VyQ3RybFwiXHJcbiAgfSlcclxuICAuc3RhdGUoJ3VzZXJJbmZvJyx7XHJcbiAgICB1cmw6XCIvdXNlckluZm9cIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL3VzZXJJbmZvLmh0bWxcIixcclxuICAgIGNvbnRyb2xsZXI6IFwidXNlckluZm9DdHJsXCJcclxuICB9KVxyXG4gIC5zdGF0ZSgnY2hpbGRCYW5rJyx7XHJcbiAgICB1cmw6XCIvY2hpbGQvYmFua1wiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvY2hpbGRCYW5rLmh0bWxcIixcclxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRCYW5rQ3RybFwiXHJcbiAgfSlcclxuICAuc3RhdGUoJ2NoaWxkSG9tZScse1xyXG4gICAgdXJsOlwiL2NoaWxkL2hvbWVcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2NoaWxkSG9tZS5odG1sXCIsXHJcbiAgICBjb250cm9sbGVyOiBcImNoaWxkSG9tZUN0cmxcIlxyXG4gIH0pXHJcbiAgLnN0YXRlKCdjaGlsZExvZ2luJyx7XHJcbiAgICB1cmw6XCIvY2hpbGQvbG9naW5cIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2NoaWxkTG9naW4uaHRtbFwiLFxyXG4gICAgY29udHJvbGxlcjogXCJjaGlsZExvZ2luQ3RybFwiXHJcbiAgfSlcclxuICAuc3RhdGUoJ2NoaWxkU2V0dGluZ3MnLHtcclxuICAgIHVybDpcIi9jaGlsZC9zZXR0aW5nc1wiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvY2hpbGRTZXR0aW5ncy5odG1sXCIsXHJcbiAgICBjb250cm9sbGVyOiBcImNoaWxkU2V0dGluZ3NDdHJsXCJcclxuICB9KVxyXG59KVxyXG5cclxuLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xyXG4gICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgaWYod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xyXG4gICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXHJcbiAgICAgIC8vIGZvciBmb3JtIGlucHV0cylcclxuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcclxuXHJcbiAgICAgIC8vIERvbid0IHJlbW92ZSB0aGlzIGxpbmUgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZy4gSXQgc3RvcHMgdGhlIHZpZXdwb3J0XHJcbiAgICAgIC8vIGZyb20gc25hcHBpbmcgd2hlbiB0ZXh0IGlucHV0cyBhcmUgZm9jdXNlZC4gSW9uaWMgaGFuZGxlcyB0aGlzIGludGVybmFsbHkgZm9yXHJcbiAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxyXG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbCh0cnVlKTtcclxuICAgIH1cclxuICAgIGlmKHdpbmRvdy5TdGF0dXNCYXIpIHtcclxuICAgICAgU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KVxyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiYWRkQ2hpbGRDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XHJcbiAgLy9iYWNrYnV0dG9uXHJcbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5nbygtMSlcclxuICB9XHJcblxyXG59KVxyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiYXNzaWduQ2hvcmVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XHJcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gYXNzaWduIGNob3JlIGNvbnRyb2xsZXJcIlxyXG5cclxufSlcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImNoaWxkQmFua0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcclxuICAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBiYW5rIGNvbnRyb2xsZXJcIlxyXG5cclxufSlcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImNoaWxkSG9tZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcclxuICAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSAgY2hpbGQgSG9tZSBjb250cm9sbGVyXCJcclxuXHJcbn0pXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJjaGlsZExvZ2luQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xyXG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIGNoaWxkIExvZ2luIGNvbnRyb2xsZXJcIlxyXG5cclxufSlcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImNoaWxkU2V0dGluZ3NDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XHJcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gY2hpbGQgc2V0dGluZ3MgY29udHJvbGxlclwiXHJcblxyXG59KVxyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiZWRpdENoaWxkQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xyXG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xyXG4gICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpXHJcbiAgfVxyXG5cclxufSlcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImhpc3RvcnlDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XHJcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gSGlzdG9yeSBjb250cm9sbGVyXCJcclxuXHJcbn0pXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJob21lQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsKXtcclxuICAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBIb21lIGNvbnRyb2xsZXJcIlxyXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2Jhbm5lck1vZGFsLmh0bWwnLCB7XHJcbiAgICAgc2NvcGU6ICRzY29wZSxcclxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcclxuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xyXG4gICAgICRzY29wZS5tb2RhbCA9IG1vZGFsO1xyXG4gICB9KTtcclxuICAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICRzY29wZS5tb2RhbC5zaG93KCk7XHJcbiAgIH07XHJcbiAgICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcclxuICAgfTtcclxuICAgLy8gQ2xlYW51cCB0aGUgbW9kYWwgd2hlbiB3ZSdyZSBkb25lIHdpdGggaXQhXHJcbiAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgJHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xyXG4gICB9KTtcclxuICAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gaGlkZSBtb2RhbFxyXG4gICAkc2NvcGUuJG9uKCdtb2RhbC5oaWRkZW4nLCBmdW5jdGlvbigpIHtcclxuICAgICAvLyBFeGVjdXRlIGFjdGlvblxyXG4gICB9KTtcclxuICAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gcmVtb3ZlIG1vZGFsXHJcbiAgICRzY29wZS4kb24oJ21vZGFsLnJlbW92ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAvLyBFeGVjdXRlIGFjdGlvblxyXG4gICB9KTtcclxuXHJcbn0pXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJsb2dpbkN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcclxuICAvLyAkc2NvcGUudGVzdCA9IFwiSGVsbG8gZnJvbSBsb2dpbiBjb250cm9sbGVyXCJcclxuICAkc2NvcGUucmV2ZWFsZXIgPSBmdW5jdGlvbigpe1xyXG4gICRzY29wZS5oaWRlID0gISRzY29wZS5oaWRlO1xyXG5cclxuIH1cclxuXHJcbn0pXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJtYWtlQ2hvcmVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XHJcbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5nbygtMSlcclxuICB9XHJcblxyXG59KVxyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwic2V0UmV3YXJkc0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCl7XHJcbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdyZXdhcmRNb2RhbC5odG1sJywge1xyXG4gICAgc2NvcGU6ICRzY29wZSxcclxuICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xyXG4gIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcclxuICAgICRzY29wZS5tb2RhbCA9IG1vZGFsO1xyXG4gIH0pO1xyXG4gICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcclxuICAgICRzY29wZS5tb2RhbC5zaG93KCk7XHJcbiAgfTtcclxuICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcclxuICB9O1xyXG4gIC8vIENsZWFudXAgdGhlIG1vZGFsIHdoZW4gd2UncmUgZG9uZSB3aXRoIGl0IVxyXG4gICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XHJcbiAgICAkc2NvcGUubW9kYWwucmVtb3ZlKCk7XHJcbiAgfSk7XHJcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gaGlkZSBtb2RhbFxyXG4gICRzY29wZS4kb24oJ21vZGFsLmhpZGRlbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gRXhlY3V0ZSBhY3Rpb25cclxuICB9KTtcclxuICAvLyBFeGVjdXRlIGFjdGlvbiBvbiByZW1vdmUgbW9kYWxcclxuICAkc2NvcGUuJG9uKCdtb2RhbC5yZW1vdmVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxyXG4gIH0pO1xyXG5cclxuXHJcbn0pXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJzZXR0aW5nc0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCl7XHJcbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdjaGFuZ2VQYXNzd29yZC5odG1sJywge1xyXG4gICAgIGlkOiAnMScsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxyXG4gICAgIHNjb3BlOiAkc2NvcGUsXHJcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxyXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xyXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XHJcbiAgICAgJHNjb3BlLm9Nb2RhbDEgPSBtb2RhbDtcclxuICAgfSk7XHJcblxyXG4gICAvLyBNb2RhbCAyXHJcbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnY2hhbmdlSG91c2Vob2xkLmh0bWwnLCB7XHJcbiAgICAgaWQ6ICcyJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXHJcbiAgICAgc2NvcGU6ICRzY29wZSxcclxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXHJcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXHJcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcclxuICAgICAkc2NvcGUub01vZGFsMiA9IG1vZGFsO1xyXG4gICB9KTtcclxuXHJcbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnY2hhbmdlWmlwLmh0bWwnLCB7XHJcbiAgICAgaWQ6ICczJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXHJcbiAgICAgc2NvcGU6ICRzY29wZSxcclxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXHJcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXHJcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcclxuICAgICAkc2NvcGUub01vZGFsMyA9IG1vZGFsO1xyXG4gICB9KTtcclxuXHJcbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnYWRkUGFyZW50Lmh0bWwnLCB7XHJcbiAgICAgaWQ6ICc0JywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXHJcbiAgICAgc2NvcGU6ICRzY29wZSxcclxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXHJcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXHJcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcclxuICAgICAkc2NvcGUub01vZGFsNCA9IG1vZGFsO1xyXG4gICB9KTtcclxuXHJcbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgncmVtb3ZlQ2hpbGQuaHRtbCcsIHtcclxuICAgICBpZDogJzUnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcclxuICAgICBzY29wZTogJHNjb3BlLFxyXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcclxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcclxuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xyXG4gICAgICRzY29wZS5vTW9kYWw1ID0gbW9kYWw7XHJcbiAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgICBpZiAoaW5kZXggPT0gMSkgJHNjb3BlLm9Nb2RhbDEuc2hvdygpO1xyXG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMikgJHNjb3BlLm9Nb2RhbDIuc2hvdygpO1xyXG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMykgJHNjb3BlLm9Nb2RhbDMuc2hvdygpO1xyXG4gICAgIGVsc2UgaWYoaW5kZXggPT0gNCkgJHNjb3BlLm9Nb2RhbDQuc2hvdygpO1xyXG4gICAgIGVsc2UgJHNjb3BlLm9Nb2RhbDUuc2hvdygpO1xyXG4gICB9O1xyXG5cclxuICAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbihpbmRleCkge1xyXG4gICAgIGlmIChpbmRleCA9PSAxKSAkc2NvcGUub01vZGFsMS5oaWRlKCk7XHJcbiAgICAgZWxzZSBpZihpbmRleCA9PSAyKSAkc2NvcGUub01vZGFsMi5oaWRlKCk7XHJcbiAgICAgZWxzZSBpZihpbmRleCA9PSAzKSAkc2NvcGUub01vZGFsMy5oaWRlKCk7XHJcbiAgICAgZWxzZSBpZihpbmRleCA9PSA0KSAkc2NvcGUub01vZGFsNC5oaWRlKCk7XHJcbiAgICAgZWxzZSAkc2NvcGUub01vZGFsNS5oaWRlKCk7XHJcbiAgIH07XHJcblxyXG4gICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICRzY29wZS5vTW9kYWwxLnJlbW92ZSgpO1xyXG4gICAgICRzY29wZS5vTW9kYWwyLnJlbW92ZSgpO1xyXG4gICAgICRzY29wZS5vTW9kYWwzLnJlbW92ZSgpO1xyXG4gICAgICRzY29wZS5vTW9kYWw0LnJlbW92ZSgpO1xyXG4gICAgICRzY29wZS5vTW9kYWw1LnJlbW92ZSgpO1xyXG4gICB9KTtcclxuXHJcbn0pXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJ0cmFja2VyQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsKXtcclxuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3BpY0NvbmZNb2RhbC5odG1sJywge1xyXG4gICAgc2NvcGU6ICRzY29wZSxcclxuICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xyXG4gIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcclxuICAgICRzY29wZS5tb2RhbCA9IG1vZGFsO1xyXG4gIH0pO1xyXG4gICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcclxuICAgICRzY29wZS5tb2RhbC5zaG93KCk7XHJcbiAgfTtcclxuICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcclxuICB9O1xyXG4gIC8vIENsZWFudXAgdGhlIG1vZGFsIHdoZW4gd2UncmUgZG9uZSB3aXRoIGl0IVxyXG4gICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XHJcbiAgICAkc2NvcGUubW9kYWwucmVtb3ZlKCk7XHJcbiAgfSk7XHJcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gaGlkZSBtb2RhbFxyXG4gICRzY29wZS4kb24oJ21vZGFsLmhpZGRlbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gRXhlY3V0ZSBhY3Rpb25cclxuICB9KTtcclxuICAvLyBFeGVjdXRlIGFjdGlvbiBvbiByZW1vdmUgbW9kYWxcclxuICAkc2NvcGUuJG9uKCdtb2RhbC5yZW1vdmVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxyXG4gIH0pO1xyXG5cclxufSlcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcInVzZXJJbmZvQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xyXG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIGluZm8gY29udHJvbGxlclwiXHJcblxyXG59KVxyXG4iXX0=


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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInNlcnZpY2UvbG9naW5TZXJ2aWNlLmpzIiwiY29udHJvbGxlcnMvYWRkQ2hpbGRDdHJsLmpzIiwiY29udHJvbGxlcnMvYXNzaWduQ2hvcmVDdHJsLmpzIiwiY29udHJvbGxlcnMvY2hpbGRCYW5rQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NoaWxkSG9tZUN0cmwuanMiLCJjb250cm9sbGVycy9jaGlsZExvZ2luQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NoaWxkU2V0dGluZ3NDdHJsLmpzIiwiY29udHJvbGxlcnMvZWRpdENoaWxkQ3RybC5qcyIsImNvbnRyb2xsZXJzL2hpc3RvcnlDdHJsLmpzIiwiY29udHJvbGxlcnMvaG9tZUN0cmwuanMiLCJjb250cm9sbGVycy9sb2dpbkN0cmwuanMiLCJjb250cm9sbGVycy9tYWtlQ2hvcmVDdHJsLmpzIiwiY29udHJvbGxlcnMvc2V0UmV3YXJkc0N0cmwuanMiLCJjb250cm9sbGVycy9zZXR0aW5nc0N0cmwuanMiLCJjb250cm9sbGVycy90cmFja2VyQ3RybC5qcyIsImNvbnRyb2xsZXJzL3VzZXJJbmZvQ3RybC5qcyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwiY29uZmlnIiwiJHN0YXRlUHJvdmlkZXIiLCIkYXV0aFByb3ZpZGVyIiwic3RhdGUiLCJ1cmwiLCJ0ZW1wbGF0ZVVybCIsImNvbnRyb2xsZXIiLCJmYWNlYm9vayIsImNsaWVudElkIiwicmVzcG9uc2VUeXBlIiwiZ29vZ2xlIiwicnVuIiwiJGlvbmljUGxhdGZvcm0iLCJyZWFkeSIsIndpbmRvdyIsImNvcmRvdmEiLCJwbHVnaW5zIiwiS2V5Ym9hcmQiLCJoaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIiLCJkaXNhYmxlU2Nyb2xsIiwiU3RhdHVzQmFyIiwic3R5bGVEZWZhdWx0Iiwic2VydmljZSIsIiRodHRwIiwidXNlckxvZ2luIiwidXNlciIsImNvbnNvbGUiLCJsb2ciLCJtZXRob2QiLCJkYXRhIiwibWFrZVVzZXIiLCJuZXdVc2VyIiwiJHNjb3BlIiwiZ29iYWNrIiwiaGlzdG9yeSIsImdvIiwidGVzdCIsIiRpb25pY01vZGFsIiwiZnJvbVRlbXBsYXRlVXJsIiwic2NvcGUiLCJhbmltYXRpb24iLCJ0aGVuIiwibW9kYWwiLCJvcGVuTW9kYWwiLCJzaG93IiwiY2xvc2VNb2RhbCIsImhpZGUiLCIkb24iLCJyZW1vdmUiLCIkYXV0aCIsIiRzdGF0ZSIsImxvZ2luU2VydmljZSIsImxvZ2luIiwicmVzcG9uc2UiLCJzZXRUb2tlbiIsImF1dGhlbnRpY2F0ZSIsInByb3ZpZGVyIiwicmV2ZWFsZXIiLCJpZCIsImJhY2tkcm9wQ2xpY2tUb0Nsb3NlIiwib01vZGFsMSIsIm9Nb2RhbDIiLCJvTW9kYWwzIiwib01vZGFsNCIsIm9Nb2RhbDUiLCJpbmRleCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQUEsUUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0IsQ0FBQyxPQUFELEVBQVUsWUFBVixDQUF4QixFQUNDQyxNQURELENBQ1EsVUFBU0MsY0FBVCxFQUF5QkMsYUFBekIsRUFBdUM7QUFDN0NELGlCQUNDRSxLQURELENBQ08sVUFEUCxFQUNrQjtBQUNoQkMsU0FBSSxXQURZO0FBRWhCQyxpQkFBYSwyQkFGRztBQUdoQkMsZ0JBQVk7QUFISSxHQURsQixFQU1DSCxLQU5ELENBTU8sYUFOUCxFQU1xQjtBQUNuQkMsU0FBSSxjQURlO0FBRW5CQyxpQkFBYSw4QkFGTTtBQUduQkMsZ0JBQVk7QUFITyxHQU5yQixFQVdDSCxLQVhELENBV08sV0FYUCxFQVdtQjtBQUNqQkMsU0FBSSxnQkFEYTtBQUVqQkMsaUJBQWEsNEJBRkk7QUFHakJDLGdCQUFZO0FBSEssR0FYbkIsRUFnQkNILEtBaEJELENBZ0JPLFNBaEJQLEVBZ0JpQjtBQUNmQyxTQUFJLFVBRFc7QUFFZkMsaUJBQWEsMEJBRkU7QUFHZkMsZ0JBQVk7QUFIRyxHQWhCakIsRUFxQkNILEtBckJELENBcUJPLE1BckJQLEVBcUJjO0FBQ1pDLFNBQUksT0FEUTtB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RUFBaUJLLFdBQWpCLEVBQTZCO0FBQzdFQSxjQUFZQyxlQUFaLENBQTRCLG1CQUE1QixFQUFpRDtBQUMvQ0MsV0FBT1AsTUFEd0M7QUFFL0NRLGVBQVc7QUFGb0MsR0FBakQsRUFHR0MsSUFISCxDQUdRLFVBQVNDLEtBQVQsRUFBZ0I7QUFDdEJWLFdBQU9VLEtBQVAsR0FBZUEsS0FBZjtBQUNELEdBTEQ7QUFNQVYsU0FBT1csU0FBUCxHQUFtQixZQUFXO0FBQzVCWCxXQUFPVSxLQUFQLENBQWFFLElBQWI7QUFDRCxHQUZEO0FBR0FaLFNBQU9hLFVBQVAsR0FBb0IsWUFBVztBQUM3QmIsV0FBT1UsS0FBUCxDQUFhSSxJQUFiO0FBQ0QsR0FGRDtBQUdBO0FBQ0FkLFNBQU9lLEdBQVAsQ0FBVyxVQUFYLEVBQXVCLFlBQVc7QUFDaENmLFdBQU9VLEtBQVAsQ0FBYU0sTUFBYjtBQUNELEdBRkQ7QUFHQTtBQUNBaEIsU0FBT2UsR0FBUCxDQUFXLGNBQVgsRUFBMkIsWUFBVztBQUNwQztBQUNELEdBRkQ7QUFHQTtBQUNBZixTQUFPZSxHQUFQLENBQVcsZUFBWCxFQUE0QixZQUFXO0FBQ3JDO0FBQ0QsR0FGRDtBQUlELENBMUJEOzs7QUNBQWpELFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCTyxVQUF4QixDQUFtQyxjQUFuQyxFQUFtRCxVQUFTMEIsTUFBVCxFQUFnQjtBQUNoRUEsVUFBT0ksSUFBUCxHQUFjLDhCQUFkO0FBRUYsQ0FIRCIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJb25pYyBTdGFydGVyIEFwcFxuXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xuLy8gJ3N0YXJ0ZXInIGlzIHRoZSBuYW1lIG9mIHRoaXMgYW5ndWxhciBtb2R1bGUgZXhhbXBsZSAoYWxzbyBzZXQgaW4gYSA8Ym9keT4gYXR0cmlidXRlIGluIGluZGV4Lmh0bWwpXG4vLyB0aGUgMm5kIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvZiAncmVxdWlyZXMnXG5hbmd1bGFyLm1vZHVsZSgnY2hvcmUnLCBbJ2lvbmljJywgJ3NhdGVsbGl6ZXInXSlcbi5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICRhdXRoUHJvdmlkZXIpe1xuICAkc3RhdGVQcm92aWRlclxuICAuc3RhdGUoJ2FkZENoaWxkJyx7XG4gICAgdXJsOlwiL2FkZENoaWxkXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvYWRkQ2hpbGQuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiYWRkQ2hpbGRDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdhc3NpZ25DaG9yZScse1xuICAgIHVybDpcIi9hc3NpZ25DaG9yZVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2Fzc2lnbkNob3JlLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImFzc2lnbkNob3JlQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnZWRpdENoaWxkJyx7XG4gICAgdXJsOlwiL2VkaXRDaGlsZC86aWRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9lZGl0Q2hpbGQuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiZWRpdENoaWxkQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnaGlzdG9yeScse1xuICAgIHVybDpcIi9oaXN0b3J5XCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvaGlzdG9yeS5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJoaXN0b3J5Q3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnaG9tZScse1xuICAgIHVybDpcIi9ob21lXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvaG9tZS5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJob21lQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnbG9naW4nLHtcbiAgICB1cmw6XCIvbG9naW5cIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9Mb2dpbi5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJsb2dpbkN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ21ha2VDaG9yZScse1xuICAgIHVybDpcIi9tYWtlQ2hvcmVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9tYWtlQ2hvcmUuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwibWFrZUNob3JlQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnc2V0UmV3YXJkcycse1xuICAgIHVybDpcIi9zZXRSZXdhcmRzLzppZFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL3NldFJld2FyZHMuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwic2V0UmV3YXJkc0N0cmxcIlxuICB9KVxuICAuc3RhdGUoJ3NldHRpbmdzJyx7XG4gICAgdXJsOlwiL3NldHRpbmdzXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvc2V0dGluZ3MuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwic2V0dGluZ3NDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCd0cmFja2VyJyx7XG4gICAgdXJsOlwiL3RyYWNrZXIvOmlkXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvdHJhY2tlci5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJ0cmFja2VyQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgndXNlckluZm8nLHtcbiAgICB1cmw6XCIvdXNlckluZm9cIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy91c2VySW5mby5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJ1c2VySW5mb0N0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2NoaWxkQmFuaycse1xuICAgIHVybDpcIi9jaGlsZC9iYW5rXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvY2hpbGRCYW5rLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImNoaWxkQmFua0N0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2NoaWxkSG9tZScse1xuICAgIHVybDpcIi9jaGlsZC9ob21lXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvY2hpbGRIb21lLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImNoaWxkSG9tZUN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2NoaWxkTG9naW4nLHtcbiAgICB1cmw6XCIvY2hpbGQvbG9naW5cIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9jaGlsZExvZ2luLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImNoaWxkTG9naW5DdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdjaGlsZFNldHRpbmdzJyx7XG4gICAgdXJsOlwiL2NoaWxkL3NldHRpbmdzXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvY2hpbGRTZXR0aW5ncy5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJjaGlsZFNldHRpbmdzQ3RybFwiXG4gIH0pO1xuICAkYXV0aFByb3ZpZGVyLmZhY2Vib29rKHtcbiAgICBjbGllbnRJZDogJzMzMjI3MjA1NzEzMjY4MSdcbiAgfSk7XG5cbiAgLy8gT3B0aW9uYWw6IEZvciBjbGllbnQtc2lkZSB1c2UgKEltcGxpY2l0IEdyYW50KSwgc2V0IHJlc3BvbnNlVHlwZSB0byAndG9rZW4nIChkZWZhdWx0OiAnY29kZScpXG4gICRhdXRoUHJvdmlkZXIuZmFjZWJvb2soe1xuICAgIGNsaWVudElkOiAnMzMyMjcyMDU3MTMyNjgxJyxcbiAgICByZXNwb25zZVR5cGU6ICd0b2tlbidcbiAgfSk7XG5cbiAgJGF1dGhQcm92aWRlci5nb29nbGUoe1xuICAgIGNsaWVudElkOiAnMjc1MzUyOTYwOTQ2LTVyY2FuM3FraGxzYzdtNTBoZXY1ZG4yZTJjYWU5bWJwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tJyxcbiAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxMDAvIy9sb2dpbi8nXG4gIH0pO1xufSlcblxuXG5cbi5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0pIHtcbiAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgaWYod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxuICAgICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcblxuICAgICAgLy8gRG9uJ3QgcmVtb3ZlIHRoaXMgbGluZSB1bmxlc3MgeW91IGtub3cgd2hhdCB5b3UgYXJlIGRvaW5nLiBJdCBzdG9wcyB0aGUgdmlld3BvcnRcbiAgICAgIC8vIGZyb20gc25hcHBpbmcgd2hlbiB0ZXh0IGlucHV0cyBhcmUgZm9jdXNlZC4gSW9uaWMgaGFuZGxlcyB0aGlzIGludGVybmFsbHkgZm9yXG4gICAgICAvLyBhIG11Y2ggbmljZXIga2V5Ym9hcmQgZXhwZXJpZW5jZS5cbiAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5kaXNhYmxlU2Nyb2xsKHRydWUpO1xuICAgIH1cbiAgICBpZih3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XG4gICAgfVxuICB9KTtcbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5zZXJ2aWNlKCdsb2dpblNlcnZpY2UnLCBmdW5jdGlvbigkaHR0cCl7XG4gIC8vIHRoaXMubG9naW4gPSBmdW5jdGlvbihwcm92aWRlcil7XG4gIC8vXG4gIC8vICRodHRwKHtcbiAgLy8gICAgIG1ldGhvZDogXCJHRVRcIixcbiAgLy8gICAgIHVybDogXCIvYXBpL21lXCJcbiAgLy9cbiAgLy8gICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgLy8gICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAvL1xuICAvL1xuICAvL1xuICAvLyAgIH0pO1xuXG4gIC8vIHRoaXMucGF5TG9hZCA9IGZ1bmN0aW9uKCkge1xuICAvLyAgIHZhciBwYXlMb2FkRGF0YSA9ICRhdXRoLmdldFBheWxvYWQoKSB7XG4gIC8vICAgICByZXR1cm4gcGF5TG9hZERhdGE7XG4gIC8vICAgfVxuICAvLyB9XG5cblxuICB0aGlzLnVzZXJMb2dpbiA9IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICBjb25zb2xlLmxvZyh1c2VyLCBcInNlcnZpY2VcIilcbiAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIHVybDogJy9hdXRoL2xvZ2luJyxcbiAgICAgIGRhdGE6IHVzZXJcbiAgICB9KVxuICB9XG4gIHRoaXMubWFrZVVzZXIgPSBmdW5jdGlvbihuZXdVc2VyKSB7XG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB1cmw6ICcvYXV0aC9zaWdudXAnLFxuICAgICAgZGF0YTogbmV3VXNlclxuICAgIH0pXG4gIH1cbn0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImFkZENoaWxkQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAvL2JhY2tidXR0b25cbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XG4gICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpXG4gIH1cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJhc3NpZ25DaG9yZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gYXNzaWduIGNob3JlIGNvbnRyb2xsZXJcIlxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImNoaWxkQmFua0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gYmFuayBjb250cm9sbGVyXCJcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJjaGlsZEhvbWVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tICBjaGlsZCBIb21lIGNvbnRyb2xsZXJcIlxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImNoaWxkTG9naW5DdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIGNoaWxkIExvZ2luIGNvbnRyb2xsZXJcIlxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImNoaWxkU2V0dGluZ3NDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIGNoaWxkIHNldHRpbmdzIGNvbnRyb2xsZXJcIlxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImVkaXRDaGlsZEN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XG4gICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpXG4gIH1cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJoaXN0b3J5Q3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBIaXN0b3J5IGNvbnRyb2xsZXJcIlxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImhvbWVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwpe1xuICAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBIb21lIGNvbnRyb2xsZXJcIlxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdiYW5uZXJNb2RhbC5odG1sJywge1xuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm1vZGFsID0gbW9kYWw7XG4gICB9KTtcbiAgICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAgJHNjb3BlLm1vZGFsLnNob3coKTtcbiAgIH07XG4gICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICAkc2NvcGUubW9kYWwuaGlkZSgpO1xuICAgfTtcbiAgIC8vIENsZWFudXAgdGhlIG1vZGFsIHdoZW4gd2UncmUgZG9uZSB3aXRoIGl0IVxuICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgJHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuICAgfSk7XG4gICAvLyBFeGVjdXRlIGFjdGlvbiBvbiBoaWRlIG1vZGFsXG4gICAkc2NvcGUuJG9uKCdtb2RhbC5oaWRkZW4nLCBmdW5jdGlvbigpIHtcbiAgICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgIH0pO1xuICAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gcmVtb3ZlIG1vZGFsXG4gICAkc2NvcGUuJG9uKCdtb2RhbC5yZW1vdmVkJywgZnVuY3Rpb24oKSB7XG4gICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gICB9KTtcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJsb2dpbkN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkYXV0aCwgJHN0YXRlLCBsb2dpblNlcnZpY2Upe1xuXG4kc2NvcGUubG9naW4gPSBmdW5jdGlvbih1c2VyKXtcbiAgY29uc29sZS5sb2codXNlcilcbiAgbG9naW5TZXJ2aWNlLnVzZXJMb2dpbih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAkYXV0aC5zZXRUb2tlbihyZXNwb25zZSlcbiAgICAgICRzdGF0ZS5nbygnaG9tZScpXG5cbiAgfSlcbn1cbiRzY29wZS5tYWtlVXNlciA9IGZ1bmN0aW9uKG5ld1VzZXIpe1xuICBsb2dpblNlcnZpY2UubWFrZVVzZXIobmV3VXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgJGF1dGguc2V0VG9rZW4ocmVzcG9uc2UpXG4gICAgICAkc3RhdGUuZ28oJ2hvbWUnKVxuICB9KVxufVxuICAkc2NvcGUuYXV0aGVudGljYXRlID0gZnVuY3Rpb24ocHJvdmlkZXIpIHtcbiAgJGF1dGguYXV0aGVudGljYXRlKHByb3ZpZGVyKX07XG4gIC8vICRzY29wZS50ZXN0ID0gXCJIZWxsbyBmcm9tIGxvZ2luIGNvbnRyb2xsZXJcIlxuICAkc2NvcGUucmV2ZWFsZXIgPSBmdW5jdGlvbigpe1xuICAkc2NvcGUuaGlkZSA9ICEkc2NvcGUuaGlkZTtcblxuIH1cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJtYWtlQ2hvcmVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxuICB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwic2V0UmV3YXJkc0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCl7XG4gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgncmV3YXJkTW9kYWwuaHRtbCcsIHtcbiAgICBzY29wZTogJHNjb3BlLFxuICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgJHNjb3BlLm1vZGFsID0gbW9kYWw7XG4gIH0pO1xuICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLnNob3coKTtcbiAgfTtcbiAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwuaGlkZSgpO1xuICB9O1xuICAvLyBDbGVhbnVwIHRoZSBtb2RhbCB3aGVuIHdlJ3JlIGRvbmUgd2l0aCBpdCFcbiAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwucmVtb3ZlKCk7XG4gIH0pO1xuICAvLyBFeGVjdXRlIGFjdGlvbiBvbiBoaWRlIG1vZGFsXG4gICRzY29wZS4kb24oJ21vZGFsLmhpZGRlbicsIGZ1bmN0aW9uKCkge1xuICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gIH0pO1xuICAvLyBFeGVjdXRlIGFjdGlvbiBvbiByZW1vdmUgbW9kYWxcbiAgJHNjb3BlLiRvbignbW9kYWwucmVtb3ZlZCcsIGZ1bmN0aW9uKCkge1xuICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gIH0pO1xuXG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwic2V0dGluZ3NDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwpe1xuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2NoYW5nZVBhc3N3b3JkLmh0bWwnLCB7XG4gICAgIGlkOiAnMScsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsMSA9IG1vZGFsO1xuICAgfSk7XG5cbiAgIC8vIE1vZGFsIDJcbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnY2hhbmdlSG91c2Vob2xkLmh0bWwnLCB7XG4gICAgIGlkOiAnMicsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsMiA9IG1vZGFsO1xuICAgfSk7XG5cbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnY2hhbmdlWmlwLmh0bWwnLCB7XG4gICAgIGlkOiAnMycsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsMyA9IG1vZGFsO1xuICAgfSk7XG5cbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnYWRkUGFyZW50Lmh0bWwnLCB7XG4gICAgIGlkOiAnNCcsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsNCA9IG1vZGFsO1xuICAgfSk7XG5cbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgncmVtb3ZlQ2hpbGQuaHRtbCcsIHtcbiAgICAgaWQ6ICc1JywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWw1ID0gbW9kYWw7XG4gICB9KTtcblxuXG5cbiAgICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICBpZiAoaW5kZXggPT0gMSkgJHNjb3BlLm9Nb2RhbDEuc2hvdygpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDIpICRzY29wZS5vTW9kYWwyLnNob3coKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSAzKSAkc2NvcGUub01vZGFsMy5zaG93KCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gNCkgJHNjb3BlLm9Nb2RhbDQuc2hvdygpO1xuICAgICBlbHNlICRzY29wZS5vTW9kYWw1LnNob3coKTtcbiAgIH07XG5cbiAgICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgaWYgKGluZGV4ID09IDEpICRzY29wZS5vTW9kYWwxLmhpZGUoKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSAyKSAkc2NvcGUub01vZGFsMi5oaWRlKCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMykgJHNjb3BlLm9Nb2RhbDMuaGlkZSgpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDQpICRzY29wZS5vTW9kYWw0LmhpZGUoKTtcbiAgICAgZWxzZSAkc2NvcGUub01vZGFsNS5oaWRlKCk7XG4gICB9O1xuXG4gICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAkc2NvcGUub01vZGFsMS5yZW1vdmUoKTtcbiAgICAgJHNjb3BlLm9Nb2RhbDIucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWwzLnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsNC5yZW1vdmUoKTtcbiAgICAgJHNjb3BlLm9Nb2RhbDUucmVtb3ZlKCk7XG4gICB9KTtcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJ0cmFja2VyQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsKXtcbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdwaWNDb25mTW9kYWwuaHRtbCcsIHtcbiAgICBzY29wZTogJHNjb3BlLFxuICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgJHNjb3BlLm1vZGFsID0gbW9kYWw7XG4gIH0pO1xuICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLnNob3coKTtcbiAgfTtcbiAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwuaGlkZSgpO1xuICB9O1xuICAvLyBDbGVhbnVwIHRoZSBtb2RhbCB3aGVuIHdlJ3JlIGRvbmUgd2l0aCBpdCFcbiAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwucmVtb3ZlKCk7XG4gIH0pO1xuICAvLyBFeGVjdXRlIGFjdGlvbiBvbiBoaWRlIG1vZGFsXG4gICRzY29wZS4kb24oJ21vZGFsLmhpZGRlbicsIGZ1bmN0aW9uKCkge1xuICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gIH0pO1xuICAvLyBFeGVjdXRlIGFjdGlvbiBvbiByZW1vdmUgbW9kYWxcbiAgJHNjb3BlLiRvbignbW9kYWwucmVtb3ZlZCcsIGZ1bmN0aW9uKCkge1xuICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gIH0pO1xuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcInVzZXJJbmZvQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBpbmZvIGNvbnRyb2xsZXJcIlxuXG59KVxuIl19
