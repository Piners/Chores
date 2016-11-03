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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * ngCordova
 * v0.1.27-alpha
 * Copyright 2015 Drifty Co. http://drifty.com/
 * See LICENSE in this repository for license information
 */
!function () {
  angular.module("ngCordova", ["ngCordova.plugins"]), angular.module("ngCordova.plugins.3dtouch", []).factory("$cordova3DTouch", ["$q", function (e) {
    var n = [],
        r = {},
        o = function o(e) {
      return function (n) {
        for (var r in e) {
          n.type === r && e[r]();
        }
      };
    };return { isAvailable: function isAvailable() {
        var n = e.defer();return window.cordova ? window.ThreeDeeTouch ? window.ThreeDeeTouch.isAvailable(function (e) {
          n.resolve(e);
        }, function (e) {
          n.reject(e);
        }) : n.reject("Could not find 3D touch plugin") : n.reject("Not supported in browser"), n.promise;
      }, addQuickAction: function addQuickAction(t, i, a, c, u, s) {
        var l = e.defer(),
            f = { type: t, title: i, subtitle: u };return a && (f.iconType = a), c && (f.iconTemplate = c), this.isAvailable().then(function () {
          n.push(f), r[t] = s, window.ThreeDeeTouch.configureQuickActions(n), window.ThreeDeeTouch.onHomeIconPressed = o(r), l.resolve(n);
        }, function (e) {
          l.reject(e);
        }), l.promise;
      }, addQuickActionHandler: function addQuickActionHandler(n, t) {
        var i = e.defer();return this.isAvailable().then(function () {
          r[n] = t, window.ThreeDeeTouch.onHomeIconPressed = o(r), i.resolve(!0);
        }, function (e) {
          i.reject(e);
        }), i.promise;
      }, enableLinkPreview: function enableLinkPreview() {
        var n = e.defer();return this.isAvailable().then(function () {
          window.ThreeDeeTouch.enableLinkPreview(), n.resolve(!0);
        }, function (e) {
          n.reject(e);
        }), n.promise;
      }, addForceTouchHandler: function addForceTouchHandler(n) {
        var r = e.defer();return this.isAvailable().then(function () {
          window.ThreeDeeTouch.watchForceTouches(n), r.resolve(!0);
        }, function (e) {
          r.reject(e);
        }), r.promise;
      } };
  }]), angular.module("ngCordova.plugins.actionSheet", []).factory("$cordovaActionSheet", ["$q", "$window", function (e, n) {
    return { show: function show(r) {
        var o = e.defer();return n.plugins.actionsheet.show(r, function (e) {
          o.resolve(e);
        }), o.promise;
      }, hide: function hide() {
        return n.plugins.actionsheet.hide();
      } };
  }]), angular.module("ngCordova.plugins.adMob", []).factory("$cordovaAdMob", ["$q", "$window", function (e, n) {
    return { createBannerView: function createBannerView(r) {
        var o = e.defer();return n.plugins.AdMob.createBannerView(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, createInterstitialView: function createInterstitialView(r) {
        var o = e.defer();return n.plugins.AdMob.createInterstitialView(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, requestAd: function requestAd(r) {
        var o = e.defer();return n.plugins.AdMob.requestAd(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, showAd: function showAd(r) {
        var o = e.defer();return n.plugins.AdMob.showAd(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, requestInterstitialAd: function requestInterstitialAd(r) {
        var o = e.defer();return n.plugins.AdMob.requestInterstitialAd(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      } };
  }]), angular.module("ngCordova.plugins.appAvailability", []).factory("$cordovaAppAvailability", ["$q", function (e) {
    return { check: function check(n) {
        var r = e.defer();return appAvailability.check(n, function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }), r.promise;
      } };
  }]), angular.module("ngCordova.plugins.appRate", []).provider("$cordovaAppRate", [function () {
    this.setPreferences = function (e) {
      e && angular.isObject(e) && (AppRate.preferences.useLanguage = e.language || null, AppRate.preferences.displayAppName = e.appName || "", AppRate.preferences.promptAgainForEachNewVersion = e.promptForNewVersion || !0, AppRate.preferences.openStoreInApp = e.openStoreInApp || !1, AppRate.preferences.usesUntilPrompt = e.usesUntilPrompt || 3, AppRate.preferences.useCustomRateDialog = e.useCustomRateDialog || !1, AppRate.preferences.storeAppURL.ios = e.iosURL || null, AppRate.preferences.storeAppURL.android = e.androidURL || null, AppRate.preferences.storeAppURL.blackberry = e.blackberryURL || null, AppRate.preferences.storeAppURL.windows8 = e.windowsURL || null);
    }, this.setCustomLocale = function (e) {
      var n = { title: "Rate %@", message: "If you enjoy using %@, would you mind taking a moment to rate it? It won’t take more than a minute. Thanks for your support!", cancelButtonLabel: "No, Thanks", laterButtonLabel: "Remind Me Later", rateButtonLabel: "Rate It Now" };n = angular.extend(n, e), AppRate.preferences.customLocale = n;
    }, this.$get = ["$q", function (e) {
      return { promptForRating: function promptForRating(n) {
          var r = e.defer(),
              o = AppRate.promptForRating(n);return r.resolve(o), r.promise;
        }, navigateToAppStore: function navigateToAppStore() {
          var n = e.defer(),
              r = AppRate.navigateToAppStore();return n.resolve(r), n.promise;
        }, onButtonClicked: function onButtonClicked(e) {
          AppRate.preferences.callbacks.onButtonClicked = e.bind(this);
        }, onRateDialogShow: function onRateDialogShow(e) {
          AppRate.preferences.callbacks.onRateDialogShow = e.bind(this);
        } };
    }];
  }]), angular.module("ngCordova.plugins.appVersion", []).factory("$cordovaAppVersion", ["$q", function (e) {
    return { getAppName: function getAppName() {
        var n = e.defer();return cordova.getAppVersion.getAppName(function (e) {
          n.resolve(e);
        }), n.promise;
      }, getPackageName: function getPackageName() {
        var n = e.defer();return cordova.getAppVersion.getPackageName(function (e) {
          n.resolve(e);
        }), n.promise;
      }, getVersionNumber: function getVersionNumber() {
        var n = e.defer();return cordova.getAppVersion.getVersionNumber(function (e) {
          n.resolve(e);
        }), n.promise;
      }, getVersionCode: function getVersionCode() {
        var n = e.defer();return cordova.getAppVersion.getVersionCode(function (e) {
          n.resolve(e);
        }), n.promise;
      } };
  }]), angular.module("ngCordova.plugins.backgroundGeolocation", []).factory("$cordovaBackgroundGeolocation", ["$q", "$window", function (e, n) {
    return { init: function init() {
        n.navigator.geolocation.getCurrentPosition(function (e) {
          return e;
        });
      }, configure: function configure(r) {
        this.init();var o = e.defer();return n.plugins.backgroundGeoLocation.configure(function (e) {
          o.notify(e), n.plugins.backgroundGeoLocation.finish();
        }, function (e) {
          o.reject(e);
        }, r), this.start(), o.promise;
      }, start: function start() {
        var r = e.defer();return n.plugins.backgroundGeoLocation.start(function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }), r.promise;
      }, stop: function stop() {
        var r = e.defer();return n.plugins.backgroundGeoLocation.stop(function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }), r.promise;
      } };
  }]), angular.module("ngCordova.plugins.badge", []).factory("$cordovaBadge", ["$q", function (e) {
    return { hasPermission: function hasPermission() {
        var n = e.defer();return cordova.plugins.notification.badge.hasPermission(function (e) {
          e ? n.resolve(!0) : n.reject("You do not have permission");
        }), n.promise;
      }, promptForPermission: function promptForPermission() {
        return cordova.plugins.notification.badge.promptForPermission();
      }, set: function set(n, r, o) {
        var t = e.defer();return cordova.plugins.notification.badge.hasPermission(function (e) {
          e ? t.resolve(cordova.plugins.notification.badge.set(n, r, o)) : t.reject("You do not have permission to set Badge");
        }), t.promise;
      }, get: function get() {
        var n = e.defer();return cordova.plugins.notification.badge.hasPermission(function (e) {
          e ? cordova.plugins.notification.badge.get(function (e) {
            n.resolve(e);
          }) : n.reject("You do not have permission to get Badge");
        }), n.promise;
      }, clear: function clear(n, r) {
        var o = e.defer();return cordova.plugins.notification.badge.hasPermission(function (e) {
          e ? o.resolve(cordova.plugins.notification.badge.clear(n, r)) : o.reject("You do not have permission to clear Badge");
        }), o.promise;
      }, increase: function increase(n, r, o) {
        var t = e.defer();return this.hasPermission().then(function () {
          t.resolve(cordova.plugins.notification.badge.increase(n, r, o));
        }, function () {
          t.reject("You do not have permission to increase Badge");
        }), t.promise;
      }, decrease: function decrease(n, r, o) {
        var t = e.defer();return this.hasPermission().then(function () {
          t.resolve(cordova.plugins.notification.badge.decrease(n, r, o));
        }, function () {
          t.reject("You do not have permission to decrease Badge");
        }), t.promise;
      }, configure: function configure(e) {
        return cordova.plugins.notification.badge.configure(e);
      } };
  }]), angular.module("ngCordova.plugins.barcodeScanner", []).factory("$cordovaBarcodeScanner", ["$q", function (e) {
    return { scan: function scan(n) {
        var r = e.defer();return cordova.plugins.barcodeScanner.scan(function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }, n), r.promise;
      }, encode: function encode(n, r) {
        var o = e.defer();return n = n || "TEXT_TYPE", cordova.plugins.barcodeScanner.encode(n, r, function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      } };
  }]), angular.module("ngCordova.plugins.batteryStatus", []).factory("$cordovaBatteryStatus", ["$rootScope", "$window", "$timeout", function (e, n, r) {
    var o = function o(n) {
      r(function () {
        e.$broadcast("$cordovaBatteryStatus:status", n);
      });
    },
        t = function t(n) {
      r(function () {
        e.$broadcast("$cordovaBatteryStatus:critical", n);
      });
    },
        i = function i(n) {
      r(function () {
        e.$broadcast("$cordovaBatteryStatus:low", n);
      });
    };return document.addEventListener("deviceready", function () {
      navigator.battery && (n.addEventListener("batterystatus", o, !1), n.addEventListener("batterycritical", t, !1), n.addEventListener("batterylow", i, !1));
    }, !1), !0;
  }]).run(["$injector", function (e) {
    e.get("$cordovaBatteryStatus");
  }]), angular.module("ngCordova.plugins.beacon", []).factory("$cordovaBeacon", ["$window", "$rootScope", "$timeout", "$q", function (e, n, r, o) {
    var t = null,
        i = null,
        a = null,
        c = null,
        u = null,
        s = null,
        l = null,
        f = null;return document.addEventListener("deviceready", function () {
      if (e.cordova && e.cordova.plugins && e.cordova.plugins.locationManager) {
        var o = new e.cordova.plugins.locationManager.Delegate();o.didDetermineStateForRegion = function (e) {
          r(function () {
            n.$broadcast("$cordovaBeacon:didDetermineStateForRegion", e);
          }), t && t(e);
        }, o.didStartMonitoringForRegion = function (e) {
          r(function () {
            n.$broadcast("$cordovaBeacon:didStartMonitoringForRegion", e);
          }), i && i(e);
        }, o.didExitRegion = function (e) {
          r(function () {
            n.$broadcast("$cordovaBeacon:didExitRegion", e);
          }), a && a(e);
        }, o.didEnterRegion = function (e) {
          r(function () {
            n.$broadcast("$cordovaBeacon:didEnterRegion", e);
          }), c && c(e);
        }, o.didRangeBeaconsInRegion = function (e) {
          r(function () {
            n.$broadcast("$cordovaBeacon:didRangeBeaconsInRegion", e);
          }), u && u(e);
        }, o.peripheralManagerDidStartAdvertising = function (e) {
          r(function () {
            n.$broadcast("$cordovaBeacon:peripheralManagerDidStartAdvertising", e);
          }), s && s(e);
        }, o.peripheralManagerDidUpdateState = function (e) {
          r(function () {
            n.$broadcast("$cordovaBeacon:peripheralManagerDidUpdateState", e);
          }), l && l(e);
        }, o.didChangeAuthorizationStatus = function (e) {
          r(function () {
            n.$broadcast("$cordovaBeacon:didChangeAuthorizationStatus", e);
          }), f && f(e);
        }, e.cordova.plugins.locationManager.setDelegate(o);
      }
    }, !1), { setCallbackDidDetermineStateForRegion: function setCallbackDidDetermineStateForRegion(e) {
        t = e;
      }, setCallbackDidStartMonitoringForRegion: function setCallbackDidStartMonitoringForRegion(e) {
        i = e;
      }, setCallbackDidExitRegion: function setCallbackDidExitRegion(e) {
        a = e;
      }, setCallbackDidEnterRegion: function setCallbackDidEnterRegion(e) {
        c = e;
      }, setCallbackDidRangeBeaconsInRegion: function setCallbackDidRangeBeaconsInRegion(e) {
        u = e;
      }, setCallbackPeripheralManagerDidStartAdvertising: function setCallbackPeripheralManagerDidStartAdvertising(e) {
        s = e;
      }, setCallbackPeripheralManagerDidUpdateState: function setCallbackPeripheralManagerDidUpdateState(e) {
        l = e;
      }, setCallbackDidChangeAuthorizationStatus: function setCallbackDidChangeAuthorizationStatus(e) {
        f = e;
      }, createBeaconRegion: function createBeaconRegion(n, r, o, t, i) {
        return o = o || void 0, t = t || void 0, new e.cordova.plugins.locationManager.BeaconRegion(n, r, o, t, i);
      }, isBluetoothEnabled: function isBluetoothEnabled() {
        return o.when(e.cordova.plugins.locationManager.isBluetoothEnabled());
      }, enableBluetooth: function enableBluetooth() {
        return o.when(e.cordova.plugins.locationManager.enableBluetooth());
      }, disableBluetooth: function disableBluetooth() {
        return o.when(e.cordova.plugins.locationManager.disableBluetooth());
      }, startMonitoringForRegion: function startMonitoringForRegion(n) {
        return o.when(e.cordova.plugins.locationManager.startMonitoringForRegion(n));
      }, stopMonitoringForRegion: function stopMonitoringForRegion(n) {
        return o.when(e.cordova.plugins.locationManager.stopMonitoringForRegion(n));
      }, requestStateForRegion: function requestStateForRegion(n) {
        return o.when(e.cordova.plugins.locationManager.requestStateForRegion(n));
      }, startRangingBeaconsInRegion: function startRangingBeaconsInRegion(n) {
        return o.when(e.cordova.plugins.locationManager.startRangingBeaconsInRegion(n));
      }, stopRangingBeaconsInRegion: function stopRangingBeaconsInRegion(n) {
        return o.when(e.cordova.plugins.locationManager.stopRangingBeaconsInRegion(n));
      }, getAuthorizationStatus: function getAuthorizationStatus() {
        return o.when(e.cordova.plugins.locationManager.getAuthorizationStatus());
      }, requestWhenInUseAuthorization: function requestWhenInUseAuthorization() {
        return o.when(e.cordova.plugins.locationManager.requestWhenInUseAuthorization());
      }, requestAlwaysAuthorization: function requestAlwaysAuthorization() {
        return o.when(e.cordova.plugins.locationManager.requestAlwaysAuthorization());
      }, getMonitoredRegions: function getMonitoredRegions() {
        return o.when(e.cordova.plugins.locationManager.getMonitoredRegions());
      }, getRangedRegions: function getRangedRegions() {
        return o.when(e.cordova.plugins.locationManager.getRangedRegions());
      }, isRangingAvailable: function isRangingAvailable() {
        return o.when(e.cordova.plugins.locationManager.isRangingAvailable());
      }, isMonitoringAvailableForClass: function isMonitoringAvailableForClass(n) {
        return o.when(e.cordova.plugins.locationManager.isMonitoringAvailableForClass(n));
      }, startAdvertising: function startAdvertising(n, r) {
        return o.when(e.cordova.plugins.locationManager.startAdvertising(n, r));
      }, stopAdvertising: function stopAdvertising() {
        return o.when(e.cordova.plugins.locationManager.stopAdvertising());
      }, isAdvertisingAvailable: function isAdvertisingAvailable() {
        return o.when(e.cordova.plugins.locationManager.isAdvertisingAvailable());
      }, isAdvertising: function isAdvertising() {
        return o.when(e.cordova.plugins.locationManager.isAdvertising());
      }, disableDebugLogs: function disableDebugLogs() {
        return o.when(e.cordova.plugins.locationManager.disableDebugLogs());
      }, enableDebugNotifications: function enableDebugNotifications() {
        return o.when(e.cordova.plugins.locationManager.enableDebugNotifications());
      }, disableDebugNotifications: function disableDebugNotifications() {
        return o.when(e.cordova.plugins.locationManager.disableDebugNotifications());
      }, enableDebugLogs: function enableDebugLogs() {
        return o.when(e.cordova.plugins.locationManager.enableDebugLogs());
      }, appendToDeviceLog: function appendToDeviceLog(n) {
        return o.when(e.cordova.plugins.locationManager.appendToDeviceLog(n));
      } };
  }]), angular.module("ngCordova.plugins.ble", []).factory("$cordovaBLE", ["$q", "$timeout", "$log", function (e, n, r) {
    return { scan: function scan(r, o) {
        var t = e.defer();return ble.startScan(r, function (e) {
          t.notify(e);
        }, function (e) {
          t.reject(e);
        }), n(function () {
          ble.stopScan(function () {
            t.resolve();
          }, function (e) {
            t.reject(e);
          });
        }, 1e3 * o), t.promise;
      }, startScan: function startScan(e, n, r) {
        return ble.startScan(e, n, r);
      }, stopScan: function stopScan() {
        var n = e.defer();return ble.stopScan(function () {
          n.resolve();
        }, function (e) {
          n.reject(e);
        }), n.promise;
      }, connect: function connect(n) {
        var r = e.defer();return ble.connect(n, function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }), r.promise;
      }, disconnect: function disconnect(n) {
        var r = e.defer();return ble.disconnect(n, function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }), r.promise;
      }, read: function read(n, r, o) {
        var t = e.defer();return ble.read(n, r, o, function (e) {
          t.resolve(e);
        }, function (e) {
          t.reject(e);
        }), t.promise;
      }, write: function write(n, r, o, t) {
        var i = e.defer();return ble.write(n, r, o, t, function (e) {
          i.resolve(e);
        }, function (e) {
          i.reject(e);
        }), i.promise;
      }, writeWithoutResponse: function writeWithoutResponse(n, r, o, t) {
        var i = e.defer();return ble.writeWithoutResponse(n, r, o, t, function (e) {
          i.resolve(e);
        }, function (e) {
          i.reject(e);
        }), i.promise;
      }, writeCommand: function writeCommand(e, n, o, t) {
        return r.warning("writeCommand is deprecated, use writeWithoutResponse"), this.writeWithoutResponse(e, n, o, t);
      }, startNotification: function startNotification(e, n, r, o, t) {
        return ble.startNotification(e, n, r, o, t);
      }, stopNotification: function stopNotification(n, r, o) {
        var t = e.defer();return ble.stopNotification(n, r, o, function (e) {
          t.resolve(e);
        }, function (e) {
          t.reject(e);
        }), t.promise;
      }, isConnected: function isConnected(n) {
        var r = e.defer();return ble.isConnected(n, function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }), r.promise;
      }, enable: function enable() {
        var n = e.defer();return ble.enable(function (e) {
          n.resolve(e);
        }, function (e) {
          n.reject(e);
        }), n.promise;
      }, isEnabled: function isEnabled() {
        var n = e.defer();return ble.isEnabled(function (e) {
          n.resolve(e);
        }, function (e) {
          n.reject(e);
        }), n.promise;
      } };
  }]), angular.module("ngCordova.plugins.bluetoothSerial", []).factory("$cordovaBluetoothSerial", ["$q", "$window", function (e, n) {
    return { connect: function connect(r) {
        var o = e.defer(),
            t = e.defer(),
            i = !1;return n.bluetoothSerial.connect(r, function () {
          i = !0, o.resolve(t);
        }, function (e) {
          i === !1 && t.reject(e), o.reject(e);
        }), o.promise;
      }, connectInsecure: function connectInsecure(r) {
        var o = e.defer();return n.bluetoothSerial.connectInsecure(r, function () {
          o.resolve();
        }, function (e) {
          o.reject(e);
        }), o.promise;
      }, disconnect: function disconnect() {
        var r = e.defer();return n.bluetoothSerial.disconnect(function () {
          r.resolve();
        }, function (e) {
          r.reject(e);
        }), r.promise;
      }, list: function list() {
        var r = e.defer();return n.bluetoothSerial.list(function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }), r.promise;
      }, discoverUnpaired: function discoverUnpaired() {
        var r = e.defer();return n.bluetoothSerial.discoverUnpaired(function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }), r.promise;
      }, setDeviceDiscoveredListener: function setDeviceDiscoveredListener() {
        var r = e.defer();return n.bluetoothSerial.setDeviceDiscoveredListener(function (e) {
          r.notify(e);
        }), r.promise;
      }, clearDeviceDiscoveredListener: function clearDeviceDiscoveredListener() {
        n.bluetoothSerial.clearDeviceDiscoveredListener();
      }, showBluetoothSettings: function showBluetoothSettings() {
        var r = e.defer();return n.bluetoothSerial.showBluetoothSettings(function () {
          r.resolve();
        }, function (e) {
          r.reject(e);
        }), r.promise;
      }, isEnabled: function isEnabled() {
        var r = e.defer();return n.bluetoothSerial.isEnabled(function () {
          r.resolve();
        }, function () {
          r.reject();
        }), r.promise;
      }, enable: function enable() {
        var r = e.defer();return n.bluetoothSerial.enable(function () {
          r.resolve();
        }, function () {
          r.reject();
        }), r.promise;
      }, isConnected: function isConnected() {
        var r = e.defer();return n.bluetoothSerial.isConnected(function () {
          r.resolve();
        }, function () {
          r.reject();
        }), r.promise;
      }, available: function available() {
        var r = e.defer();return n.bluetoothSerial.available(function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }), r.promise;
      }, read: function read() {
        var r = e.defer();return n.bluetoothSerial.read(function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }), r.promise;
      }, readUntil: function readUntil(r) {
        var o = e.defer();return n.bluetoothSerial.readUntil(r, function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      }, write: function write(r) {
        var o = e.defer();return n.bluetoothSerial.write(r, function () {
          o.resolve();
        }, function (e) {
          o.reject(e);
        }), o.promise;
      }, subscribe: function subscribe(r) {
        var o = e.defer();return n.bluetoothSerial.subscribe(r, function (e) {
          o.notify(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      }, subscribeRawData: function subscribeRawData() {
        var r = e.defer();return n.bluetoothSerial.subscribeRawData(function (e) {
          r.notify(e);
        }, function (e) {
          r.reject(e);
        }), r.promise;
      }, unsubscribe: function unsubscribe() {
        var r = e.defer();return n.bluetoothSerial.unsubscribe(function () {
          r.resolve();
        }, function (e) {
          r.reject(e);
        }), r.promise;
      }, unsubscribeRawData: function unsubscribeRawData() {
        var r = e.defer();return n.bluetoothSerial.unsubscribeRawData(function () {
          r.resolve();
        }, function (e) {
          r.reject(e);
        }), r.promise;
      }, clear: function clear() {
        var r = e.defer();return n.bluetoothSerial.clear(function () {
          r.resolve();
        }, function (e) {
          r.reject(e);
        }), r.promise;
      }, readRSSI: function readRSSI() {
        var r = e.defer();return n.bluetoothSerial.readRSSI(function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }), r.promise;
      } };
  }]), angular.module("ngCordova.plugins.brightness", []).factory("$cordovaBrightness", ["$q", "$window", function (e, n) {
    return { get: function get() {
        var r = e.defer();return n.cordova ? n.cordova.plugins.brightness.getBrightness(function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }) : r.reject("Not supported without cordova.js"), r.promise;
      }, set: function set(r) {
        var o = e.defer();return n.cordova ? n.cordova.plugins.brightness.setBrightness(r, function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }) : o.reject("Not supported without cordova.js"), o.promise;
      }, setKeepScreenOn: function setKeepScreenOn(r) {
        var o = e.defer();return n.cordova ? n.cordova.plugins.brightness.setKeepScreenOn(r, function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }) : o.reject("Not supported without cordova.js"), o.promise;
      } };
  }]), angular.module("ngCordova.plugins.calendar", []).factory("$cordovaCalendar", ["$q", "$window", function (e, n) {
    return { createCalendar: function createCalendar(r) {
        var o = e.defer(),
            t = n.plugins.calendar.getCreateCalendarOptions();return "string" == typeof r ? t.calendarName = r : t = angular.extend(t, r), n.plugins.calendar.createCalendar(t, function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      }, deleteCalendar: function deleteCalendar(r) {
        var o = e.defer();return n.plugins.calendar.deleteCalendar(r, function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      }, createEvent: function createEvent(r) {
        var o = e.defer(),
            t = { title: null, location: null, notes: null, startDate: null, endDate: null };return t = angular.extend(t, r), n.plugins.calendar.createEvent(t.title, t.location, t.notes, new Date(t.startDate), new Date(t.endDate), function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      }, createEventWithOptions: function createEventWithOptions(r) {
        var o = e.defer(),
            t = [],
            i = window.plugins.calendar.getCalendarOptions(),
            a = { title: null, location: null, notes: null, startDate: null, endDate: null };t = Object.keys(a);for (var c in r) {
          -1 === t.indexOf(c) ? i[c] = r[c] : a[c] = r[c];
        }return n.plugins.calendar.createEventWithOptions(a.title, a.location, a.notes, new Date(a.startDate), new Date(a.endDate), i, function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      }, createEventInteractively: function createEventInteractively(r) {
        var o = e.defer(),
            t = { title: null, location: null, notes: null, startDate: null, endDate: null };return t = angular.extend(t, r), n.plugins.calendar.createEventInteractively(t.title, t.location, t.notes, new Date(t.startDate), new Date(t.endDate), function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      }, createEventInNamedCalendar: function createEventInNamedCalendar(r) {
        var o = e.defer(),
            t = { title: null, location: null, notes: null, startDate: null, endDate: null, calendarName: null };return t = angular.extend(t, r), n.plugins.calendar.createEventInNamedCalendar(t.title, t.location, t.notes, new Date(t.startDate), new Date(t.endDate), t.calendarName, function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      }, findEvent: function findEvent(r) {
        var o = e.defer(),
            t = { title: null, location: null, notes: null, startDate: null, endDate: null };return t = angular.extend(t, r), n.plugins.calendar.findEvent(t.title, t.location, t.notes, new Date(t.startDate), new Date(t.endDate), function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      }, listEventsInRange: function listEventsInRange(r, o) {
        var t = e.defer();return n.plugins.calendar.listEventsInRange(r, o, function (e) {
          t.resolve(e);
        }, function (e) {
          t.reject(e);
        }), t.promise;
      }, listCalendars: function listCalendars() {
        var r = e.defer();return n.plugins.calendar.listCalendars(function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }), r.promise;
      }, findAllEventsInNamedCalendar: function findAllEventsInNamedCalendar(r) {
        var o = e.defer();return n.plugins.calendar.findAllEventsInNamedCalendar(r, function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      }, modifyEvent: function modifyEvent(r) {
        var o = e.defer(),
            t = { title: null, location: null, notes: null, startDate: null, endDate: null, newTitle: null, newLocation: null, newNotes: null, newStartDate: null, newEndDate: null };return t = angular.extend(t, r), n.plugins.calendar.modifyEvent(t.title, t.location, t.notes, new Date(t.startDate), new Date(t.endDate), t.newTitle, t.newLocation, t.newNotes, new Date(t.newStartDate), new Date(t.newEndDate), function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      }, deleteEvent: function deleteEvent(r) {
        var o = e.defer(),
            t = { newTitle: null, location: null, notes: null, startDate: null, endDate: null };return t = angular.extend(t, r), n.plugins.calendar.deleteEvent(t.newTitle, t.location, t.notes, new Date(t.startDate), new Date(t.endDate), function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      } };
  }]), angular.module("ngCordova.plugins.camera", []).factory("$cordovaCamera", ["$q", function (e) {
    return { getPicture: function getPicture(n) {
        var r = e.defer();return navigator.camera ? (navigator.camera.getPicture(function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }, n), r.promise) : (r.resolve(null), r.promise);
      }, cleanup: function cleanup() {
        var n = e.defer();return navigator.camera.cleanup(function () {
          n.resolve();
        }, function (e) {
          n.reject(e);
        }), n.promise;
      } };
  }]), angular.module("ngCordova.plugins.capture", []).factory("$cordovaCapture", ["$q", function (e) {
    return { captureAudio: function captureAudio(n) {
        var r = e.defer();return navigator.device.capture ? (navigator.device.capture.captureAudio(function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }, n), r.promise) : (r.resolve(null), r.promise);
      }, captureImage: function captureImage(n) {
        var r = e.defer();return navigator.device.capture ? (navigator.device.capture.captureImage(function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }, n), r.promise) : (r.resolve(null), r.promise);
      }, captureVideo: function captureVideo(n) {
        var r = e.defer();return navigator.device.capture ? (navigator.device.capture.captureVideo(function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }, n), r.promise) : (r.resolve(null), r.promise);
      } };
  }]), angular.module("ngCordova.plugins.cardIO", []).provider("$cordovaNgCardIO", [function () {
    var e = ["card_type", "redacted_card_number", "card_number", "expiry_month", "expiry_year", "short_expiry_year", "cvv", "zip"],
        n = { expiry: !0, cvv: !0, zip: !1, suppressManual: !1, suppressConfirm: !1, hideLogo: !0 };this.setCardIOResponseFields = function (n) {
      n && angular.isArray(n) && (e = n);
    }, this.setScanerConfig = function (e) {
      e && angular.isObject(e) && (n.expiry = e.expiry || !0, n.cvv = e.cvv || !0, n.zip = e.zip || !1, n.suppressManual = e.suppressManual || !1, n.suppressConfirm = e.suppressConfirm || !1, n.hideLogo = e.hideLogo || !0);
    }, this.$get = ["$q", function (r) {
      return { scanCard: function scanCard() {
          var o = r.defer();return CardIO.scan(n, function (n) {
            if (null === n) o.reject(null);else {
              for (var r = {}, t = 0, i = e.length; i > t; t++) {
                var a = e[t];"short_expiry_year" === a ? r[a] = String(n.expiry_year).substr(2, 2) || "" : r[a] = n[a] || "";
              }o.resolve(r);
            }
          }, function () {
            o.reject(null);
          }), o.promise;
        } };
    }];
  }]), angular.module("ngCordova.plugins.clipboard", []).factory("$cordovaClipboard", ["$q", "$window", function (e, n) {
    return { copy: function copy(r) {
        var o = e.defer();return n.cordova.plugins.clipboard.copy(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, paste: function paste() {
        var r = e.defer();return n.cordova.plugins.clipboard.paste(function (e) {
          r.resolve(e);
        }, function () {
          r.reject();
        }), r.promise;
      } };
  }]), angular.module("ngCordova.plugins.contacts", []).factory("$cordovaContacts", ["$q", function (e) {
    return { save: function save(n) {
        var r = e.defer(),
            o = navigator.contacts.create(n);return o.save(function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }), r.promise;
      }, remove: function remove(n) {
        var r = e.defer(),
            o = navigator.contacts.create(n);return o.remove(function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }), r.promise;
      }, clone: function clone(e) {
        var n = navigator.contacts.create(e);return n.clone(e);
      }, find: function find(n) {
        var r = e.defer(),
            o = n.fields || ["id", "displayName"];return delete n.fields, 0 === Object.keys(n).length ? navigator.contacts.find(o, function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }) : navigator.contacts.find(o, function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }, n), r.promise;
      }, pickContact: function pickContact() {
        var n = e.defer();return navigator.contacts.pickContact(function (e) {
          n.resolve(e);
        }, function (e) {
          n.reject(e);
        }), n.promise;
      } };
  }]), angular.module("ngCordova.plugins.datePicker", []).factory("$cordovaDatePicker", ["$window", "$q", function (e, n) {
    return { show: function show(r) {
        var o = n.defer();return r = r || { date: new Date(), mode: "date" }, e.datePicker.show(r, function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      } };
  }]), angular.module("ngCordova.plugins.device", []).factory("$cordovaDevice", [function () {
    return { getDevice: function getDevice() {
        return device;
      }, getCordova: function getCordova() {
        return device.cordova;
      }, getModel: function getModel() {
        return device.model;
      }, getName: function getName() {
        return device.name;
      }, getPlatform: function getPlatform() {
        return device.platform;
      }, getUUID: function getUUID() {
        return device.uuid;
      }, getVersion: function getVersion() {
        return device.version;
      }, getManufacturer: function getManufacturer() {
        return device.manufacturer;
      } };
  }]), angular.module("ngCordova.plugins.deviceMotion", []).factory("$cordovaDeviceMotion", ["$q", function (e) {
    return { getCurrentAcceleration: function getCurrentAcceleration() {
        var n = e.defer();return angular.isUndefined(navigator.accelerometer) || !angular.isFunction(navigator.accelerometer.getCurrentAcceleration) ? (n.reject("Device do not support watchAcceleration"), n.promise) : (navigator.accelerometer.getCurrentAcceleration(function (e) {
          n.resolve(e);
        }, function (e) {
          n.reject(e);
        }), n.promise);
      }, watchAcceleration: function watchAcceleration(n) {
        var r = e.defer();if (angular.isUndefined(navigator.accelerometer) || !angular.isFunction(navigator.accelerometer.watchAcceleration)) return r.reject("Device do not support watchAcceleration"), r.promise;var o = navigator.accelerometer.watchAcceleration(function (e) {
          r.notify(e);
        }, function (e) {
          r.reject(e);
        }, n);return r.promise.cancel = function () {
          navigator.accelerometer.clearWatch(o);
        }, r.promise.clearWatch = function (e) {
          navigator.accelerometer.clearWatch(e || o);
        }, r.promise.watchID = o, r.promise;
      }, clearWatch: function clearWatch(e) {
        return navigator.accelerometer.clearWatch(e);
      } };
  }]), angular.module("ngCordova.plugins.deviceOrientation", []).factory("$cordovaDeviceOrientation", ["$q", function (e) {
    var n = { frequency: 3e3 };return { getCurrentHeading: function getCurrentHeading() {
        var n = e.defer();return navigator.compass ? (navigator.compass.getCurrentHeading(function (e) {
          n.resolve(e);
        }, function (e) {
          n.reject(e);
        }), n.promise) : (n.reject("No compass on Device"), n.promise);
      }, watchHeading: function watchHeading(r) {
        var o = e.defer();if (!navigator.compass) return o.reject("No compass on Device"), o.promise;var t = angular.extend(n, r),
            i = navigator.compass.watchHeading(function (e) {
          o.notify(e);
        }, function (e) {
          o.reject(e);
        }, t);return o.promise.cancel = function () {
          navigator.compass.clearWatch(i);
        }, o.promise.clearWatch = function (e) {
          navigator.compass.clearWatch(e || i);
        }, o.promise.watchID = i, o.promise;
      }, clearWatch: function clearWatch(e) {
        return navigator.compass.clearWatch(e);
      } };
  }]), angular.module("ngCordova.plugins.dialogs", []).factory("$cordovaDialogs", ["$q", "$window", function (e, n) {
    return { alert: function alert(r, o, t) {
        var i = e.defer();return n.navigator.notification ? navigator.notification.alert(r, function () {
          i.resolve();
        }, o, t) : (n.alert(r), i.resolve()), i.promise;
      }, confirm: function confirm(r, o, t) {
        var i = e.defer();return n.navigator.notification ? navigator.notification.confirm(r, function (e) {
          i.resolve(e);
        }, o, t) : n.confirm(r) ? i.resolve(1) : i.resolve(2), i.promise;
      }, prompt: function prompt(r, o, t, i) {
        var a = e.defer();if (n.navigator.notification) navigator.notification.prompt(r, function (e) {
          a.resolve(e);
        }, o, t, i);else {
          var c = n.prompt(r, i);null !== c ? a.resolve({ input1: c, buttonIndex: 1 }) : a.resolve({ input1: c, buttonIndex: 2 });
        }return a.promise;
      }, beep: function beep(e) {
        return navigator.notification.beep(e);
      }, activityStart: function activityStart(n, r) {
        var o = e.defer();return "android" === cordova.platformId ? (navigator.notification.activityStart(r, n), o.resolve()) : o.reject(n, r), o.promise;
      }, activityStop: function activityStop() {
        var n = e.defer();return "android" === cordova.platformId ? (navigator.notification.activityStop(), n.resolve()) : n.reject(), n.promise;
      }, progressStart: function progressStart(n, r) {
        var o = e.defer();return "android" === cordova.platformId ? (navigator.notification.progressStart(r, n), o.resolve()) : o.reject(n, r), o.promise;
      }, progressStop: function progressStop() {
        var n = e.defer();return "android" === cordova.platformId ? (navigator.notification.progressStop(), n.resolve()) : n.reject(), n.promise;
      }, progressValue: function progressValue(n) {
        var r = e.defer();return "android" === cordova.platformId ? (navigator.notification.progressValue(n), r.resolve()) : r.reject(n), r.promise;
      } };
  }]), angular.module("ngCordova.plugins.emailComposer", []).factory("$cordovaEmailComposer", ["$q", function (e) {
    return { isAvailable: function isAvailable() {
        var n = e.defer();return cordova.plugins.email.isAvailable(function (e) {
          e ? n.resolve() : n.reject();
        }), n.promise;
      }, open: function open(n) {
        var r = e.defer();return cordova.plugins.email.open(n, function () {
          r.reject();
        }), r.promise;
      }, addAlias: function addAlias(e, n) {
        cordova.plugins.email.addAlias(e, n);
      } };
  }]), angular.module("ngCordova.plugins.facebook", []).provider("$cordovaFacebook", [function () {
    this.browserInit = function (e, n) {
      this.appID = e, this.appVersion = n || "v2.0", facebookConnectPlugin.browserInit(this.appID, this.appVersion);
    }, this.$get = ["$q", function (e) {
      return { login: function login(n) {
          var r = e.defer();return facebookConnectPlugin.login(n, function (e) {
            r.resolve(e);
          }, function (e) {
            r.reject(e);
          }), r.promise;
        }, showDialog: function showDialog(n) {
          var r = e.defer();return facebookConnectPlugin.showDialog(n, function (e) {
            r.resolve(e);
          }, function (e) {
            r.reject(e);
          }), r.promise;
        }, api: function api(n, r) {
          var o = e.defer();return facebookConnectPlugin.api(n, r, function (e) {
            o.resolve(e);
          }, function (e) {
            o.reject(e);
          }), o.promise;
        }, getAccessToken: function getAccessToken() {
          var n = e.defer();return facebookConnectPlugin.getAccessToken(function (e) {
            n.resolve(e);
          }, function (e) {
            n.reject(e);
          }), n.promise;
        }, getLoginStatus: function getLoginStatus() {
          var n = e.defer();return facebookConnectPlugin.getLoginStatus(function (e) {
            n.resolve(e);
          }, function (e) {
            n.reject(e);
          }), n.promise;
        }, logout: function logout() {
          var n = e.defer();return facebookConnectPlugin.logout(function (e) {
            n.resolve(e);
          }, function (e) {
            n.reject(e);
          }), n.promise;
        } };
    }];
  }]), angular.module("ngCordova.plugins.facebookAds", []).factory("$cordovaFacebookAds", ["$q", "$window", function (e, n) {
    return { setOptions: function setOptions(r) {
        var o = e.defer();return n.FacebookAds.setOptions(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, createBanner: function createBanner(r) {
        var o = e.defer();return n.FacebookAds.createBanner(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, removeBanner: function removeBanner() {
        var r = e.defer();return n.FacebookAds.removeBanner(function () {
          r.resolve();
        }, function () {
          r.reject();
        }), r.promise;
      }, showBanner: function showBanner(r) {
        var o = e.defer();return n.FacebookAds.showBanner(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, showBannerAtXY: function showBannerAtXY(r, o) {
        var t = e.defer();return n.FacebookAds.showBannerAtXY(r, o, function () {
          t.resolve();
        }, function () {
          t.reject();
        }), t.promise;
      }, hideBanner: function hideBanner() {
        var r = e.defer();return n.FacebookAds.hideBanner(function () {
          r.resolve();
        }, function () {
          r.reject();
        }), r.promise;
      }, prepareInterstitial: function prepareInterstitial(r) {
        var o = e.defer();return n.FacebookAds.prepareInterstitial(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, showInterstitial: function showInterstitial() {
        var r = e.defer();return n.FacebookAds.showInterstitial(function () {
          r.resolve();
        }, function () {
          r.reject();
        }), r.promise;
      } };
  }]), angular.module("ngCordova.plugins.file", []).constant("$cordovaFileError", { 1: "NOT_FOUND_ERR", 2: "SECURITY_ERR", 3: "ABORT_ERR", 4: "NOT_READABLE_ERR", 5: "ENCODING_ERR", 6: "NO_MODIFICATION_ALLOWED_ERR", 7: "INVALID_STATE_ERR", 8: "SYNTAX_ERR", 9: "INVALID_MODIFICATION_ERR", 10: "QUOTA_EXCEEDED_ERR", 11: "TYPE_MISMATCH_ERR", 12: "PATH_EXISTS_ERR" }).provider("$cordovaFile", [function () {
    this.$get = ["$q", "$window", "$cordovaFileError", function (e, n, r) {
      return { getFreeDiskSpace: function getFreeDiskSpace() {
          var n = e.defer();return cordova.exec(function (e) {
            n.resolve(e);
          }, function (e) {
            n.reject(e);
          }, "File", "getFreeDiskSpace", []), n.promise;
        }, checkDir: function checkDir(o, t) {
          var i = e.defer();/^\//.test(t) && i.reject("directory cannot start with /");try {
            var a = o + t;n.resolveLocalFileSystemURL(a, function (e) {
              e.isDirectory === !0 ? i.resolve(e) : i.reject({ code: 13, message: "input is not a directory" });
            }, function (e) {
              e.message = r[e.code], i.reject(e);
            });
          } catch (c) {
            c.message = r[c.code], i.reject(c);
          }return i.promise;
        }, checkFile: function checkFile(o, t) {
          var i = e.defer();/^\//.test(t) && i.reject("directory cannot start with /");try {
            var a = o + t;n.resolveLocalFileSystemURL(a, function (e) {
              e.isFile === !0 ? i.resolve(e) : i.reject({ code: 13, message: "input is not a file" });
            }, function (e) {
              e.message = r[e.code], i.reject(e);
            });
          } catch (c) {
            c.message = r[c.code], i.reject(c);
          }return i.promise;
        }, createDir: function createDir(o, t, i) {
          var a = e.defer();/^\//.test(t) && a.reject("directory cannot start with /"), i = i ? !1 : !0;var c = { create: !0, exclusive: i };try {
            n.resolveLocalFileSystemURL(o, function (e) {
              e.getDirectory(t, c, function (e) {
                a.resolve(e);
              }, function (e) {
                e.message = r[e.code], a.reject(e);
              });
            }, function (e) {
              e.message = r[e.code], a.reject(e);
            });
          } catch (u) {
            u.message = r[u.code], a.reject(u);
          }return a.promise;
        }, createFile: function createFile(o, t, i) {
          var a = e.defer();/^\//.test(t) && a.reject("file-name cannot start with /"), i = i ? !1 : !0;var c = { create: !0, exclusive: i };try {
            n.resolveLocalFileSystemURL(o, function (e) {
              e.getFile(t, c, function (e) {
                a.resolve(e);
              }, function (e) {
                e.message = r[e.code], a.reject(e);
              });
            }, function (e) {
              e.message = r[e.code], a.reject(e);
            });
          } catch (u) {
            u.message = r[u.code], a.reject(u);
          }return a.promise;
        }, removeDir: function removeDir(o, t) {
          var i = e.defer();/^\//.test(t) && i.reject("file-name cannot start with /");try {
            n.resolveLocalFileSystemURL(o, function (e) {
              e.getDirectory(t, { create: !1 }, function (e) {
                e.remove(function () {
                  i.resolve({ success: !0, fileRemoved: e });
                }, function (e) {
                  e.message = r[e.code], i.reject(e);
                });
              }, function (e) {
                e.message = r[e.code], i.reject(e);
              });
            }, function (e) {
              e.message = r[e.code], i.reject(e);
            });
          } catch (a) {
            a.message = r[a.code], i.reject(a);
          }return i.promise;
        }, removeFile: function removeFile(o, t) {
          var i = e.defer();/^\//.test(t) && i.reject("file-name cannot start with /");try {
            n.resolveLocalFileSystemURL(o, function (e) {
              e.getFile(t, { create: !1 }, function (e) {
                e.remove(function () {
                  i.resolve({ success: !0, fileRemoved: e });
                }, function (e) {
                  e.message = r[e.code], i.reject(e);
                });
              }, function (e) {
                e.message = r[e.code], i.reject(e);
              });
            }, function (e) {
              e.message = r[e.code], i.reject(e);
            });
          } catch (a) {
            a.message = r[a.code], i.reject(a);
          }return i.promise;
        }, removeRecursively: function removeRecursively(o, t) {
          var i = e.defer();/^\//.test(t) && i.reject("file-name cannot start with /");try {
            n.resolveLocalFileSystemURL(o, function (e) {
              e.getDirectory(t, { create: !1 }, function (e) {
                e.removeRecursively(function () {
                  i.resolve({ success: !0, fileRemoved: e });
                }, function (e) {
                  e.message = r[e.code], i.reject(e);
                });
              }, function (e) {
                e.message = r[e.code], i.reject(e);
              });
            }, function (e) {
              e.message = r[e.code], i.reject(e);
            });
          } catch (a) {
            a.message = r[a.code], i.reject(a);
          }return i.promise;
        }, writeFile: function writeFile(o, t, i, a) {
          var c = e.defer();/^\//.test(t) && c.reject("file-name cannot start with /"), a = a ? !1 : !0;var u = { create: !0, exclusive: a };try {
            n.resolveLocalFileSystemURL(o, function (e) {
              e.getFile(t, u, function (e) {
                e.createWriter(function (e) {
                  u.append === !0 && e.seek(e.length), u.truncate && e.truncate(u.truncate), e.onwriteend = function (e) {
                    this.error ? c.reject(this.error) : c.resolve(e);
                  }, e.write(i), c.promise.abort = function () {
                    e.abort();
                  };
                });
              }, function (e) {
                e.message = r[e.code], c.reject(e);
              });
            }, function (e) {
              e.message = r[e.code], c.reject(e);
            });
          } catch (s) {
            s.message = r[s.code], c.reject(s);
          }return c.promise;
        }, writeExistingFile: function writeExistingFile(o, t, i) {
          var a = e.defer();/^\//.test(t) && a.reject("file-name cannot start with /");try {
            n.resolveLocalFileSystemURL(o, function (e) {
              e.getFile(t, { create: !1 }, function (e) {
                e.createWriter(function (e) {
                  e.seek(e.length), e.onwriteend = function (e) {
                    this.error ? a.reject(this.error) : a.resolve(e);
                  }, e.write(i), a.promise.abort = function () {
                    e.abort();
                  };
                });
              }, function (e) {
                e.message = r[e.code], a.reject(e);
              });
            }, function (e) {
              e.message = r[e.code], a.reject(e);
            });
          } catch (c) {
            c.message = r[c.code], a.reject(c);
          }return a.promise;
        }, readAsText: function readAsText(o, t) {
          var i = e.defer();/^\//.test(t) && i.reject("file-name cannot start with /");try {
            n.resolveLocalFileSystemURL(o, function (e) {
              e.getFile(t, { create: !1 }, function (e) {
                e.file(function (e) {
                  var n = new FileReader();n.onloadend = function (e) {
                    void 0 !== e.target.result || null !== e.target.result ? i.resolve(e.target.result) : void 0 !== e.target.error || null !== e.target.error ? i.reject(e.target.error) : i.reject({ code: null, message: "READER_ONLOADEND_ERR" });
                  }, n.readAsText(e);
                });
              }, function (e) {
                e.message = r[e.code], i.reject(e);
              });
            }, function (e) {
              e.message = r[e.code], i.reject(e);
            });
          } catch (a) {
            a.message = r[a.code], i.reject(a);
          }return i.promise;
        }, readAsDataURL: function readAsDataURL(o, t) {
          var i = e.defer();/^\//.test(t) && i.reject("file-name cannot start with /");try {
            n.resolveLocalFileSystemURL(o, function (e) {
              e.getFile(t, { create: !1 }, function (e) {
                e.file(function (e) {
                  var n = new FileReader();n.onloadend = function (e) {
                    void 0 !== e.target.result || null !== e.target.result ? i.resolve(e.target.result) : void 0 !== e.target.error || null !== e.target.error ? i.reject(e.target.error) : i.reject({ code: null, message: "READER_ONLOADEND_ERR" });
                  }, n.readAsDataURL(e);
                });
              }, function (e) {
                e.message = r[e.code], i.reject(e);
              });
            }, function (e) {
              e.message = r[e.code], i.reject(e);
            });
          } catch (a) {
            a.message = r[a.code], i.reject(a);
          }return i.promise;
        }, readAsBinaryString: function readAsBinaryString(o, t) {
          var i = e.defer();/^\//.test(t) && i.reject("file-name cannot start with /");try {
            n.resolveLocalFileSystemURL(o, function (e) {
              e.getFile(t, { create: !1 }, function (e) {
                e.file(function (e) {
                  var n = new FileReader();n.onloadend = function (e) {
                    void 0 !== e.target.result || null !== e.target.result ? i.resolve(e.target.result) : void 0 !== e.target.error || null !== e.target.error ? i.reject(e.target.error) : i.reject({ code: null, message: "READER_ONLOADEND_ERR" });
                  }, n.readAsBinaryString(e);
                });
              }, function (e) {
                e.message = r[e.code], i.reject(e);
              });
            }, function (e) {
              e.message = r[e.code], i.reject(e);
            });
          } catch (a) {
            a.message = r[a.code], i.reject(a);
          }return i.promise;
        }, readAsArrayBuffer: function readAsArrayBuffer(o, t) {
          var i = e.defer();/^\//.test(t) && i.reject("file-name cannot start with /");try {
            n.resolveLocalFileSystemURL(o, function (e) {
              e.getFile(t, { create: !1 }, function (e) {
                e.file(function (e) {
                  var n = new FileReader();n.onloadend = function (e) {
                    void 0 !== e.target.result || null !== e.target.result ? i.resolve(e.target.result) : void 0 !== e.target.error || null !== e.target.error ? i.reject(e.target.error) : i.reject({ code: null, message: "READER_ONLOADEND_ERR" });
                  }, n.readAsArrayBuffer(e);
                });
              }, function (e) {
                e.message = r[e.code], i.reject(e);
              });
            }, function (e) {
              e.message = r[e.code], i.reject(e);
            });
          } catch (a) {
            a.message = r[a.code], i.reject(a);
          }return i.promise;
        }, moveFile: function moveFile(r, o, t, i) {
          var a = e.defer();i = i || o, (/^\//.test(o) || /^\//.test(i)) && a.reject("file-name cannot start with /");try {
            n.resolveLocalFileSystemURL(r, function (e) {
              e.getFile(o, { create: !1 }, function (e) {
                n.resolveLocalFileSystemURL(t, function (n) {
                  e.moveTo(n, i, function (e) {
                    a.resolve(e);
                  }, function (e) {
                    a.reject(e);
                  });
                }, function (e) {
                  a.reject(e);
                });
              }, function (e) {
                a.reject(e);
              });
            }, function (e) {
              a.reject(e);
            });
          } catch (c) {
            a.reject(c);
          }return a.promise;
        }, moveDir: function moveDir(r, o, t, i) {
          var a = e.defer();i = i || o, (/^\//.test(o) || /^\//.test(i)) && a.reject("file-name cannot start with /");try {
            n.resolveLocalFileSystemURL(r, function (e) {
              e.getDirectory(o, { create: !1 }, function (e) {
                n.resolveLocalFileSystemURL(t, function (n) {
                  e.moveTo(n, i, function (e) {
                    a.resolve(e);
                  }, function (e) {
                    a.reject(e);
                  });
                }, function (e) {
                  a.reject(e);
                });
              }, function (e) {
                a.reject(e);
              });
            }, function (e) {
              a.reject(e);
            });
          } catch (c) {
            a.reject(c);
          }return a.promise;
        }, copyDir: function copyDir(o, t, i, a) {
          var c = e.defer();a = a || t, (/^\//.test(t) || /^\//.test(a)) && c.reject("file-name cannot start with /");try {
            n.resolveLocalFileSystemURL(o, function (e) {
              e.getDirectory(t, { create: !1, exclusive: !1 }, function (e) {
                n.resolveLocalFileSystemURL(i, function (n) {
                  e.copyTo(n, a, function (e) {
                    c.resolve(e);
                  }, function (e) {
                    e.message = r[e.code], c.reject(e);
                  });
                }, function (e) {
                  e.message = r[e.code], c.reject(e);
                });
              }, function (e) {
                e.message = r[e.code], c.reject(e);
              });
            }, function (e) {
              e.message = r[e.code], c.reject(e);
            });
          } catch (u) {
            u.message = r[u.code], c.reject(u);
          }return c.promise;
        }, copyFile: function copyFile(o, t, i, a) {
          var c = e.defer();a = a || t, /^\//.test(t) && c.reject("file-name cannot start with /");try {
            n.resolveLocalFileSystemURL(o, function (e) {
              e.getFile(t, { create: !1, exclusive: !1 }, function (e) {
                n.resolveLocalFileSystemURL(i, function (n) {
                  e.copyTo(n, a, function (e) {
                    c.resolve(e);
                  }, function (e) {
                    e.message = r[e.code], c.reject(e);
                  });
                }, function (e) {
                  e.message = r[e.code], c.reject(e);
                });
              }, function (e) {
                e.message = r[e.code], c.reject(e);
              });
            }, function (e) {
              e.message = r[e.code], c.reject(e);
            });
          } catch (u) {
            u.message = r[u.code], c.reject(u);
          }return c.promise;
        }, readFileMetadata: function readFileMetadata(o, t) {
          var i = e.defer();/^\//.test(t) && i.reject("directory cannot start with /");try {
            var a = o + t;n.resolveLocalFileSystemURL(a, function (e) {
              e.file(function (e) {
                i.resolve(e);
              }, function (e) {
                e.message = r[e.code], i.reject(e);
              });
            }, function (e) {
              e.message = r[e.code], i.reject(e);
            });
          } catch (c) {
            c.message = r[c.code], i.reject(c);
          }return i.promise;
        } };
    }];
  }]), angular.module("ngCordova.plugins.fileOpener2", []).factory("$cordovaFileOpener2", ["$q", function (e) {
    return { open: function open(n, r) {
        var o = e.defer();return cordova.plugins.fileOpener2.open(n, r, { error: function error(e) {
            o.reject(e);
          }, success: function success() {
            o.resolve();
          } }), o.promise;
      }, uninstall: function uninstall(n) {
        var r = e.defer();return cordova.plugins.fileOpener2.uninstall(n, { error: function error(e) {
            r.reject(e);
          }, success: function success() {
            r.resolve();
          } }), r.promise;
      }, appIsInstalled: function appIsInstalled(n) {
        var r = e.defer();return cordova.plugins.fileOpener2.appIsInstalled(n, { success: function success(e) {
            r.resolve(e);
          } }), r.promise;
      } };
  }]), angular.module("ngCordova.plugins.fileTransfer", []).factory("$cordovaFileTransfer", ["$q", "$timeout", function (e, n) {
    return { download: function download(r, o, t, i) {
        var a = e.defer(),
            c = new FileTransfer(),
            u = t && t.encodeURI === !1 ? r : encodeURI(r);return t && void 0 !== t.timeout && null !== t.timeout && (n(function () {
          c.abort();
        }, t.timeout), t.timeout = null), c.onprogress = function (e) {
          a.notify(e);
        }, a.promise.abort = function () {
          c.abort();
        }, c.download(u, o, a.resolve, a.reject, i, t), a.promise;
      }, upload: function upload(r, o, t, i) {
        var a = e.defer(),
            c = new FileTransfer(),
            u = t && t.encodeURI === !1 ? r : encodeURI(r);return t && void 0 !== t.timeout && null !== t.timeout && (n(function () {
          c.abort();
        }, t.timeout), t.timeout = null), c.onprogress = function (e) {
          a.notify(e);
        }, a.promise.abort = function () {
          c.abort();
        }, c.upload(o, u, a.resolve, a.reject, t, i), a.promise;
      } };
  }]), angular.module("ngCordova.plugins.flashlight", []).factory("$cordovaFlashlight", ["$q", "$window", function (e, n) {
    return { available: function available() {
        var r = e.defer();return n.plugins.flashlight.available(function (e) {
          r.resolve(e);
        }), r.promise;
      }, switchOn: function switchOn() {
        var r = e.defer();return n.plugins.flashlight.switchOn(function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }), r.promise;
      }, switchOff: function switchOff() {
        var r = e.defer();return n.plugins.flashlight.switchOff(function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }), r.promise;
      }, toggle: function toggle() {
        var r = e.defer();return n.plugins.flashlight.toggle(function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }), r.promise;
      } };
  }]), angular.module("ngCordova.plugins.flurryAds", []).factory("$cordovaFlurryAds", ["$q", "$window", function (e, n) {
    return { setOptions: function setOptions(r) {
        var o = e.defer();return n.FlurryAds.setOptions(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, createBanner: function createBanner(r) {
        var o = e.defer();return n.FlurryAds.createBanner(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, removeBanner: function removeBanner() {
        var r = e.defer();return n.FlurryAds.removeBanner(function () {
          r.resolve();
        }, function () {
          r.reject();
        }), r.promise;
      }, showBanner: function showBanner(r) {
        var o = e.defer();return n.FlurryAds.showBanner(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, showBannerAtXY: function showBannerAtXY(r, o) {
        var t = e.defer();return n.FlurryAds.showBannerAtXY(r, o, function () {
          t.resolve();
        }, function () {
          t.reject();
        }), t.promise;
      }, hideBanner: function hideBanner() {
        var r = e.defer();return n.FlurryAds.hideBanner(function () {
          r.resolve();
        }, function () {
          r.reject();
        }), r.promise;
      }, prepareInterstitial: function prepareInterstitial(r) {
        var o = e.defer();return n.FlurryAds.prepareInterstitial(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, showInterstitial: function showInterstitial() {
        var r = e.defer();return n.FlurryAds.showInterstitial(function () {
          r.resolve();
        }, function () {
          r.reject();
        }), r.promise;
      } };
  }]), angular.module("ngCordova.plugins.ga", []).factory("$cordovaGA", ["$q", "$window", function (e, n) {
    return { init: function init(r, o) {
        var t = e.defer();return o = o >= 0 ? o : 10, n.plugins.gaPlugin.init(function (e) {
          t.resolve(e);
        }, function (e) {
          t.reject(e);
        }, r, o), t.promise;
      }, trackEvent: function trackEvent(r, o, t, i, a, c) {
        var u = e.defer();return n.plugins.gaPlugin.trackEvent(function (e) {
          u.resolve(e);
        }, function (e) {
          u.reject(e);
        }, t, i, a, c), u.promise;
      }, trackPage: function trackPage(r, o, t) {
        var i = e.defer();return n.plugins.gaPlugin.trackPage(function (e) {
          i.resolve(e);
        }, function (e) {
          i.reject(e);
        }, t), i.promise;
      }, setVariable: function setVariable(r, o, t, i) {
        var a = e.defer();return n.plugins.gaPlugin.setVariable(function (e) {
          a.resolve(e);
        }, function (e) {
          a.reject(e);
        }, t, i), a.promise;
      }, exit: function exit() {
        var r = e.defer();return n.plugins.gaPlugin.exit(function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }), r.promise;
      } };
  }]), angular.module("ngCordova.plugins.geolocation", []).factory("$cordovaGeolocation", ["$q", function (e) {
    return { getCurrentPosition: function getCurrentPosition(n) {
        var r = e.defer();return navigator.geolocation.getCurrentPosition(function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }, n), r.promise;
      }, watchPosition: function watchPosition(n) {
        var r = e.defer(),
            o = navigator.geolocation.watchPosition(function (e) {
          r.notify(e);
        }, function (e) {
          r.reject(e);
        }, n);return r.promise.cancel = function () {
          navigator.geolocation.clearWatch(o);
        }, r.promise.clearWatch = function (e) {
          navigator.geolocation.clearWatch(e || o);
        }, r.promise.watchID = o, r.promise;
      }, clearWatch: function clearWatch(e) {
        return navigator.geolocation.clearWatch(e);
      } };
  }]), angular.module("ngCordova.plugins.globalization", []).factory("$cordovaGlobalization", ["$q", function (e) {
    return { getPreferredLanguage: function getPreferredLanguage() {
        var n = e.defer();return navigator.globalization.getPreferredLanguage(function (e) {
          n.resolve(e);
        }, function (e) {
          n.reject(e);
        }), n.promise;
      }, getLocaleName: function getLocaleName() {
        var n = e.defer();return navigator.globalization.getLocaleName(function (e) {
          n.resolve(e);
        }, function (e) {
          n.reject(e);
        }), n.promise;
      }, getFirstDayOfWeek: function getFirstDayOfWeek() {
        var n = e.defer();return navigator.globalization.getFirstDayOfWeek(function (e) {
          n.resolve(e);
        }, function (e) {
          n.reject(e);
        }), n.promise;
      }, dateToString: function dateToString(n, r) {
        var o = e.defer();return navigator.globalization.dateToString(n, function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }, r), o.promise;
      }, stringToDate: function stringToDate(n, r) {
        var o = e.defer();return navigator.globalization.stringToDate(n, function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }, r), o.promise;
      }, getDatePattern: function getDatePattern(n) {
        var r = e.defer();return navigator.globalization.getDatePattern(function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }, n), r.promise;
      }, getDateNames: function getDateNames(n) {
        var r = e.defer();return navigator.globalization.getDateNames(function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }, n), r.promise;
      }, isDayLightSavingsTime: function isDayLightSavingsTime(n) {
        var r = e.defer();return navigator.globalization.isDayLightSavingsTime(n, function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }), r.promise;
      }, numberToString: function numberToString(n, r) {
        var o = e.defer();return navigator.globalization.numberToString(n, function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }, r), o.promise;
      }, stringToNumber: function stringToNumber(n, r) {
        var o = e.defer();return navigator.globalization.stringToNumber(n, function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }, r), o.promise;
      }, getNumberPattern: function getNumberPattern(n) {
        var r = e.defer();return navigator.globalization.getNumberPattern(function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }, n), r.promise;
      }, getCurrencyPattern: function getCurrencyPattern(n) {
        var r = e.defer();return navigator.globalization.getCurrencyPattern(n, function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }), r.promise;
      } };
  }]), angular.module("ngCordova.plugins.googleAds", []).factory("$cordovaGoogleAds", ["$q", "$window", function (e, n) {
    return { setOptions: function setOptions(r) {
        var o = e.defer();return n.AdMob.setOptions(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, createBanner: function createBanner(r) {
        var o = e.defer();return n.AdMob.createBanner(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, removeBanner: function removeBanner() {
        var r = e.defer();return n.AdMob.removeBanner(function () {
          r.resolve();
        }, function () {
          r.reject();
        }), r.promise;
      }, showBanner: function showBanner(r) {
        var o = e.defer();return n.AdMob.showBanner(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, showBannerAtXY: function showBannerAtXY(r, o) {
        var t = e.defer();return n.AdMob.showBannerAtXY(r, o, function () {
          t.resolve();
        }, function () {
          t.reject();
        }), t.promise;
      }, hideBanner: function hideBanner() {
        var r = e.defer();return n.AdMob.hideBanner(function () {
          r.resolve();
        }, function () {
          r.reject();
        }), r.promise;
      }, prepareInterstitial: function prepareInterstitial(r) {
        var o = e.defer();return n.AdMob.prepareInterstitial(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, showInterstitial: function showInterstitial() {
        var r = e.defer();return n.AdMob.showInterstitial(function () {
          r.resolve();
        }, function () {
          r.reject();
        }), r.promise;
      } };
  }]), angular.module("ngCordova.plugins.googleAnalytics", []).factory("$cordovaGoogleAnalytics", ["$q", "$window", function (e, n) {
    return { startTrackerWithId: function startTrackerWithId(r) {
        var o = e.defer();return n.analytics.startTrackerWithId(r, function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      }, setUserId: function setUserId(r) {
        var o = e.defer();return n.analytics.setUserId(r, function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      }, debugMode: function debugMode() {
        var r = e.defer();return n.analytics.debugMode(function (e) {
          r.resolve(e);
        }, function () {
          r.reject();
        }), r.promise;
      }, trackView: function trackView(r) {
        var o = e.defer();return n.analytics.trackView(r, function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      }, addCustomDimension: function addCustomDimension(r, o) {
        var t = e.defer(),
            i = parseInt(r, 10);return isNaN(i) && t.reject('Parameter "key" must be an integer.'), n.analytics.addCustomDimension(i, o, function () {
          t.resolve();
        }, function (e) {
          t.reject(e);
        }), t.promise;
      }, trackEvent: function trackEvent(r, o, t, i) {
        var a = e.defer();return n.analytics.trackEvent(r, o, t, i, function (e) {
          a.resolve(e);
        }, function (e) {
          a.reject(e);
        }), a.promise;
      }, trackException: function trackException(r, o) {
        var t = e.defer();return n.analytics.trackException(r, o, function (e) {
          t.resolve(e);
        }, function (e) {
          t.reject(e);
        }), t.promise;
      }, trackTiming: function trackTiming(r, o, t, i) {
        var a = e.defer();return n.analytics.trackTiming(r, o, t, i, function (e) {
          a.resolve(e);
        }, function (e) {
          a.reject(e);
        }), a.promise;
      }, addTransaction: function addTransaction(r, o, t, i, a, c) {
        var u = e.defer();return n.analytics.addTransaction(r, o, t, i, a, c, function (e) {
          u.resolve(e);
        }, function (e) {
          u.reject(e);
        }), u.promise;
      }, addTransactionItem: function addTransactionItem(r, o, t, i, a, c, u) {
        var s = e.defer();return n.analytics.addTransactionItem(r, o, t, i, a, c, u, function (e) {
          s.resolve(e);
        }, function (e) {
          s.reject(e);
        }), s.promise;
      } };
  }]), angular.module("ngCordova.plugins.googleMap", []).factory("$cordovaGoogleMap", ["$q", "$window", function (e, n) {
    var r = null;return { getMap: function getMap(o) {
        var t = e.defer();if (n.plugin.google.maps) {
          var i = document.getElementById("map_canvas");r = n.plugin.google.maps.Map.getMap(o), r.setDiv(i), t.resolve(r);
        } else t.reject(null);return t.promise;
      }, isMapLoaded: function isMapLoaded() {
        return !!r;
      }, addMarker: function addMarker(n) {
        var o = e.defer();return r.addMarker(n, function (e) {
          o.resolve(e);
        }), o.promise;
      }, getMapTypeIds: function getMapTypeIds() {
        return n.plugin.google.maps.mapTypeId;
      }, setVisible: function setVisible(n) {
        var o = e.defer();return r.setVisible(n), o.promise;
      }, cleanup: function cleanup() {
        r = null;
      } };
  }]), angular.module("ngCordova.plugins.googlePlayGame", []).factory("$cordovaGooglePlayGame", ["$q", function (e) {
    return { auth: function auth() {
        var n = e.defer();return googleplaygame.auth(function (e) {
          return n.resolve(e);
        }, function (e) {
          return n.reject(e);
        }), n.promise;
      }, signout: function signout() {
        var n = e.defer();return googleplaygame.signout(function (e) {
          return n.resolve(e);
        }, function (e) {
          return n.reject(e);
        }), n.promise;
      }, isSignedIn: function isSignedIn() {
        var n = e.defer();return googleplaygame.isSignedIn(function (e) {
          return n.resolve(e);
        }, function (e) {
          return n.reject(e);
        }), n.promise;
      }, showPlayer: function showPlayer() {
        var n = e.defer();return googleplaygame.showPlayer(function (e) {
          return n.resolve(e);
        }, function (e) {
          return n.reject(e);
        }), n.promise;
      }, submitScore: function submitScore(n) {
        var r = e.defer();return googleplaygame.submitScore(n, function (e) {
          return r.resolve(e);
        }, function (e) {
          return r.reject(e);
        }), r.promise;
      }, showAllLeaderboards: function showAllLeaderboards() {
        var n = e.defer();return googleplaygame.showAllLeaderboards(function (e) {
          return n.resolve(e);
        }, function (e) {
          return n.reject(e);
        }), n.promise;
      }, showLeaderboard: function showLeaderboard(n) {
        var r = e.defer();return googleplaygame.showLeaderboard(n, function (e) {
          return r.resolve(e);
        }, function (e) {
          return r.reject(e);
        }), r.promise;
      }, unlockAchievement: function unlockAchievement(n) {
        var r = e.defer();return googleplaygame.unlockAchievement(n, function (e) {
          return r.resolve(e);
        }, function (e) {
          return r.reject(e);
        }), r.promise;
      }, incrementAchievement: function incrementAchievement(n) {
        var r = e.defer();return googleplaygame.incrementAchievement(n, function (e) {
          return r.resolve(e);
        }, function (e) {
          return r.reject(e);
        }), r.promise;
      }, showAchievements: function showAchievements() {
        var n = e.defer();return googleplaygame.showAchievements(function (e) {
          return n.resolve(e);
        }, function (e) {
          return n.reject(e);
        }), n.promise;
      } };
  }]), angular.module("ngCordova.plugins.googlePlus", []).factory("$cordovaGooglePlus", ["$q", "$window", function (e, n) {
    return { login: function login(r) {
        var o = e.defer();return void 0 === r && (r = {}), n.plugins.googleplus.login({ iOSApiKey: r }, function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      }, silentLogin: function silentLogin(r) {
        var o = e.defer();return void 0 === r && (r = {}), n.plugins.googleplus.trySilentLogin({ iOSApiKey: r }, function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      }, logout: function logout() {
        var r = e.defer();n.plugins.googleplus.logout(function (e) {
          r.resolve(e);
        });
      }, disconnect: function disconnect() {
        var r = e.defer();n.plugins.googleplus.disconnect(function (e) {
          r.resolve(e);
        });
      }, isAvailable: function isAvailable() {
        var r = e.defer();return n.plugins.googleplus.isAvailable(function (e) {
          e ? r.resolve(e) : r.reject(e);
        }), r.promise;
      } };
  }]), angular.module("ngCordova.plugins.healthKit", []).factory("$cordovaHealthKit", ["$q", "$window", function (e, n) {
    return { isAvailable: function isAvailable() {
        var r = e.defer();return n.plugins.healthkit.available(function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }), r.promise;
      }, checkAuthStatus: function checkAuthStatus(r) {
        var o = e.defer();return r = r || "HKQuantityTypeIdentifierHeight", n.plugins.healthkit.checkAuthStatus({ type: r }, function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      }, requestAuthorization: function requestAuthorization(r, o) {
        var t = e.defer();return r = r || ["HKCharacteristicTypeIdentifierDateOfBirth", "HKQuantityTypeIdentifierActiveEnergyBurned", "HKQuantityTypeIdentifierHeight"], o = o || ["HKQuantityTypeIdentifierActiveEnergyBurned", "HKQuantityTypeIdentifierHeight", "HKQuantityTypeIdentifierDistanceCycling"], n.plugins.healthkit.requestAuthorization({ readTypes: r, writeTypes: o }, function (e) {
          t.resolve(e);
        }, function (e) {
          t.reject(e);
        }), t.promise;
      }, readDateOfBirth: function readDateOfBirth() {
        var r = e.defer();return n.plugins.healthkit.readDateOfBirth(function (e) {
          r.resolve(e);
        }, function (e) {
          r.resolve(e);
        }), r.promise;
      }, readGender: function readGender() {
        var r = e.defer();return n.plugins.healthkit.readGender(function (e) {
          r.resolve(e);
        }, function (e) {
          r.resolve(e);
        }), r.promise;
      }, saveWeight: function saveWeight(r, o, t) {
        var i = e.defer();return n.plugins.healthkit.saveWeight({ unit: o || "lb", amount: r, date: t || new Date() }, function (e) {
          i.resolve(e);
        }, function (e) {
          i.resolve(e);
        }), i.promise;
      }, readWeight: function readWeight(r) {
        var o = e.defer();return n.plugins.healthkit.readWeight({ unit: r || "lb" }, function (e) {
          o.resolve(e);
        }, function (e) {
          o.resolve(e);
        }), o.promise;
      }, saveHeight: function saveHeight(r, o, t) {
        var i = e.defer();return n.plugins.healthkit.saveHeight({ unit: o || "in", amount: r, date: t || new Date() }, function (e) {
          i.resolve(e);
        }, function (e) {
          i.resolve(e);
        }), i.promise;
      }, readHeight: function readHeight(r) {
        var o = e.defer();return n.plugins.healthkit.readHeight({ unit: r || "in" }, function (e) {
          o.resolve(e);
        }, function (e) {
          o.resolve(e);
        }), o.promise;
      }, findWorkouts: function findWorkouts() {
        var r = e.defer();return n.plugins.healthkit.findWorkouts({}, function (e) {
          r.resolve(e);
        }, function (e) {
          r.resolve(e);
        }), r.promise;
      }, saveWorkout: function saveWorkout(r) {
        var o = e.defer();return n.plugins.healthkit.saveWorkout(r, function (e) {
          o.resolve(e);
        }, function (e) {
          o.resolve(e);
        }), o.promise;
      }, querySampleType: function querySampleType(r) {
        var o = e.defer();return n.plugins.healthkit.querySampleType(r, function (e) {
          o.resolve(e);
        }, function (e) {
          o.resolve(e);
        }), o.promise;
      } };
  }]), angular.module("ngCordova.plugins.httpd", []).factory("$cordovaHttpd", ["$q", function (e) {
    return { startServer: function startServer(n) {
        var r = e.defer();return cordova.plugins.CorHttpd.startServer(n, function () {
          r.resolve();
        }, function () {
          r.reject();
        }), r.promise;
      }, stopServer: function stopServer() {
        var n = e.defer();return cordova.plugins.CorHttpd.stopServer(function () {
          n.resolve();
        }, function () {
          n.reject();
        }), n.promise;
      }, getURL: function getURL() {
        var n = e.defer();return cordova.plugins.CorHttpd.getURL(function (e) {
          n.resolve(e);
        }, function () {
          n.reject();
        }), n.promise;
      }, getLocalPath: function getLocalPath() {
        var n = e.defer();return cordova.plugins.CorHttpd.getLocalPath(function (e) {
          n.resolve(e);
        }, function () {
          n.reject();
        }), n.promise;
      } };
  }]), angular.module("ngCordova.plugins.iAd", []).factory("$cordovaiAd", ["$q", "$window", function (e, n) {
    return { setOptions: function setOptions(r) {
        var o = e.defer();return n.iAd.setOptions(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, createBanner: function createBanner(r) {
        var o = e.defer();return n.iAd.createBanner(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, removeBanner: function removeBanner() {
        var r = e.defer();return n.iAd.removeBanner(function () {
          r.resolve();
        }, function () {
          r.reject();
        }), r.promise;
      }, showBanner: function showBanner(r) {
        var o = e.defer();return n.iAd.showBanner(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, showBannerAtXY: function showBannerAtXY(r, o) {
        var t = e.defer();return n.iAd.showBannerAtXY(r, o, function () {
          t.resolve();
        }, function () {
          t.reject();
        }), t.promise;
      }, hideBanner: function hideBanner() {
        var r = e.defer();return n.iAd.hideBanner(function () {
          r.resolve();
        }, function () {
          r.reject();
        }), r.promise;
      }, prepareInterstitial: function prepareInterstitial(r) {
        var o = e.defer();return n.iAd.prepareInterstitial(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, showInterstitial: function showInterstitial() {
        var r = e.defer();return n.iAd.showInterstitial(function () {
          r.resolve();
        }, function () {
          r.reject();
        }), r.promise;
      } };
  }]), angular.module("ngCordova.plugins.imagePicker", []).factory("$cordovaImagePicker", ["$q", "$window", function (e, n) {
    return { getPictures: function getPictures(r) {
        var o = e.defer();return n.imagePicker.getPictures(function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }, r), o.promise;
      } };
  }]), angular.module("ngCordova.plugins.inAppBrowser", []).provider("$cordovaInAppBrowser", [function () {
    var e,
        n = this.defaultOptions = {};this.setDefaultOptions = function (e) {
      n = angular.extend(n, e);
    }, this.$get = ["$rootScope", "$q", "$window", "$timeout", function (r, o, t, i) {
      return { open: function open(a, c, u) {
          var s = o.defer();if (u && !angular.isObject(u)) return s.reject("options must be an object"), s.promise;var l = angular.extend({}, n, u),
              f = [];angular.forEach(l, function (e, n) {
            f.push(n + "=" + e);
          });var d = f.join();return e = t.open(a, c, d), e.addEventListener("loadstart", function (e) {
            i(function () {
              r.$broadcast("$cordovaInAppBrowser:loadstart", e);
            });
          }, !1), e.addEventListener("loadstop", function (e) {
            s.resolve(e), i(function () {
              r.$broadcast("$cordovaInAppBrowser:loadstop", e);
            });
          }, !1), e.addEventListener("loaderror", function (e) {
            s.reject(e), i(function () {
              r.$broadcast("$cordovaInAppBrowser:loaderror", e);
            });
          }, !1), e.addEventListener("exit", function (e) {
            i(function () {
              r.$broadcast("$cordovaInAppBrowser:exit", e);
            });
          }, !1), s.promise;
        }, close: function close() {
          e.close(), e = null;
        }, show: function show() {
          e.show();
        }, executeScript: function executeScript(n) {
          var r = o.defer();return e.executeScript(n, function (e) {
            r.resolve(e);
          }), r.promise;
        }, insertCSS: function insertCSS(n) {
          var r = o.defer();return e.insertCSS(n, function (e) {
            r.resolve(e);
          }), r.promise;
        } };
    }];
  }]), angular.module("ngCordova.plugins.insomnia", []).factory("$cordovaInsomnia", ["$window", function (e) {
    return { keepAwake: function keepAwake() {
        return e.plugins.insomnia.keepAwake();
      }, allowSleepAgain: function allowSleepAgain() {
        return e.plugins.insomnia.allowSleepAgain();
      } };
  }]), angular.module("ngCordova.plugins.instagram", []).factory("$cordovaInstagram", ["$q", function (e) {
    return { share: function share(n) {
        var r = e.defer();return window.Instagram ? (Instagram.share(n.image, n.caption, function (e) {
          e ? r.reject(e) : r.resolve(!0);
        }), r.promise) : (console.error("Tried to call Instagram.share but the Instagram plugin isn't installed!"), r.resolve(null), r.promise);
      }, isInstalled: function isInstalled() {
        var n = e.defer();return window.Instagram ? (Instagram.isInstalled(function (e, r) {
          e ? n.reject(e) : n.resolve(r);
        }), n.promise) : (console.error("Tried to call Instagram.isInstalled but the Instagram plugin isn't installed!"), n.resolve(null), n.promise);
      } };
  }]), angular.module("ngCordova.plugins.keyboard", []).factory("$cordovaKeyboard", ["$rootScope", function (e) {
    var n = function n() {
      e.$evalAsync(function () {
        e.$broadcast("$cordovaKeyboard:show");
      });
    },
        r = function r() {
      e.$evalAsync(function () {
        e.$broadcast("$cordovaKeyboard:hide");
      });
    };return document.addEventListener("deviceready", function () {
      cordova.plugins.Keyboard && (window.addEventListener("native.keyboardshow", n, !1), window.addEventListener("native.keyboardhide", r, !1));
    }), { hideAccessoryBar: function hideAccessoryBar(e) {
        return cordova.plugins.Keyboard.hideKeyboardAccessoryBar(e);
      }, close: function close() {
        return cordova.plugins.Keyboard.close();
      }, show: function show() {
        return cordova.plugins.Keyboard.show();
      }, disableScroll: function disableScroll(e) {
        return cordova.plugins.Keyboard.disableScroll(e);
      }, isVisible: function isVisible() {
        return cordova.plugins.Keyboard.isVisible;
      }, clearShowWatch: function clearShowWatch() {
        document.removeEventListener("native.keyboardshow", n), e.$$listeners["$cordovaKeyboard:show"] = [];
      }, clearHideWatch: function clearHideWatch() {
        document.removeEventListener("native.keyboardhide", r), e.$$listeners["$cordovaKeyboard:hide"] = [];
      } };
  }]), angular.module("ngCordova.plugins.keychain", []).factory("$cordovaKeychain", ["$q", function (e) {
    return { getForKey: function getForKey(n, r) {
        var o = e.defer(),
            t = new Keychain();return t.getForKey(o.resolve, o.reject, n, r), o.promise;
      }, setForKey: function setForKey(n, r, o) {
        var t = e.defer(),
            i = new Keychain();return i.setForKey(t.resolve, t.reject, n, r, o), t.promise;
      }, removeForKey: function removeForKey(n, r) {
        var o = e.defer(),
            t = new Keychain();return t.removeForKey(o.resolve, o.reject, n, r), o.promise;
      } };
  }]), angular.module("ngCordova.plugins.launchNavigator", []).factory("$cordovaLaunchNavigator", ["$q", function (e) {
    return { navigate: function navigate(n, r, o) {
        var t = e.defer();return launchnavigator.navigate(n, r, function () {
          t.resolve();
        }, function (e) {
          t.reject(e);
        }, o), t.promise;
      } };
  }]), angular.module("ngCordova.plugins.localNotification", []).factory("$cordovaLocalNotification", ["$q", "$window", "$rootScope", "$timeout", function (e, n, r, o) {
    return document.addEventListener("deviceready", function () {
      n.cordova && n.cordova.plugins && n.cordova.plugins.notification && n.cordova.plugins.notification.local && (n.cordova.plugins.notification.local.on("schedule", function (e, n) {
        o(function () {
          r.$broadcast("$cordovaLocalNotification:schedule", e, n);
        });
      }), n.cordova.plugins.notification.local.on("trigger", function (e, n) {
        o(function () {
          r.$broadcast("$cordovaLocalNotification:trigger", e, n);
        });
      }), n.cordova.plugins.notification.local.on("update", function (e, n) {
        o(function () {
          r.$broadcast("$cordovaLocalNotification:update", e, n);
        });
      }), n.cordova.plugins.notification.local.on("clear", function (e, n) {
        o(function () {
          r.$broadcast("$cordovaLocalNotification:clear", e, n);
        });
      }), n.cordova.plugins.notification.local.on("clearall", function (e) {
        o(function () {
          r.$broadcast("$cordovaLocalNotification:clearall", e);
        });
      }), n.cordova.plugins.notification.local.on("cancel", function (e, n) {
        o(function () {
          r.$broadcast("$cordovaLocalNotification:cancel", e, n);
        });
      }), n.cordova.plugins.notification.local.on("cancelall", function (e) {
        o(function () {
          r.$broadcast("$cordovaLocalNotification:cancelall", e);
        });
      }), n.cordova.plugins.notification.local.on("click", function (e, n) {
        o(function () {
          r.$broadcast("$cordovaLocalNotification:click", e, n);
        });
      }));
    }, !1), { schedule: function schedule(r, o) {
        var t = e.defer();return o = o || null, n.cordova.plugins.notification.local.schedule(r, function (e) {
          t.resolve(e);
        }, o), t.promise;
      }, add: function add(r, o) {
        console.warn('Deprecated: use "schedule" instead.');var t = e.defer();return o = o || null, n.cordova.plugins.notification.local.schedule(r, function (e) {
          t.resolve(e);
        }, o), t.promise;
      }, update: function update(r, o) {
        var t = e.defer();return o = o || null, n.cordova.plugins.notification.local.update(r, function (e) {
          t.resolve(e);
        }, o), t.promise;
      }, clear: function clear(r, o) {
        var t = e.defer();
        return o = o || null, n.cordova.plugins.notification.local.clear(r, function (e) {
          t.resolve(e);
        }, o), t.promise;
      }, clearAll: function clearAll(r) {
        var o = e.defer();return r = r || null, n.cordova.plugins.notification.local.clearAll(function (e) {
          o.resolve(e);
        }, r), o.promise;
      }, cancel: function cancel(r, o) {
        var t = e.defer();return o = o || null, n.cordova.plugins.notification.local.cancel(r, function (e) {
          t.resolve(e);
        }, o), t.promise;
      }, cancelAll: function cancelAll(r) {
        var o = e.defer();return r = r || null, n.cordova.plugins.notification.local.cancelAll(function (e) {
          o.resolve(e);
        }, r), o.promise;
      }, isPresent: function isPresent(r, o) {
        var t = e.defer();return o = o || null, n.cordova.plugins.notification.local.isPresent(r, function (e) {
          t.resolve(e);
        }, o), t.promise;
      }, isScheduled: function isScheduled(r, o) {
        var t = e.defer();return o = o || null, n.cordova.plugins.notification.local.isScheduled(r, function (e) {
          t.resolve(e);
        }, o), t.promise;
      }, isTriggered: function isTriggered(r, o) {
        var t = e.defer();return o = o || null, n.cordova.plugins.notification.local.isTriggered(r, function (e) {
          t.resolve(e);
        }, o), t.promise;
      }, hasPermission: function hasPermission(r) {
        var o = e.defer();return r = r || null, n.cordova.plugins.notification.local.hasPermission(function (e) {
          e ? o.resolve(e) : o.reject(e);
        }, r), o.promise;
      }, registerPermission: function registerPermission(r) {
        var o = e.defer();return r = r || null, n.cordova.plugins.notification.local.registerPermission(function (e) {
          e ? o.resolve(e) : o.reject(e);
        }, r), o.promise;
      }, promptForPermission: function promptForPermission(r) {
        console.warn('Deprecated: use "registerPermission" instead.');var o = e.defer();return r = r || null, n.cordova.plugins.notification.local.registerPermission(function (e) {
          e ? o.resolve(e) : o.reject(e);
        }, r), o.promise;
      }, getAllIds: function getAllIds(r) {
        var o = e.defer();return r = r || null, n.cordova.plugins.notification.local.getAllIds(function (e) {
          o.resolve(e);
        }, r), o.promise;
      }, getIds: function getIds(r) {
        var o = e.defer();return r = r || null, n.cordova.plugins.notification.local.getIds(function (e) {
          o.resolve(e);
        }, r), o.promise;
      }, getScheduledIds: function getScheduledIds(r) {
        var o = e.defer();return r = r || null, n.cordova.plugins.notification.local.getScheduledIds(function (e) {
          o.resolve(e);
        }, r), o.promise;
      }, getTriggeredIds: function getTriggeredIds(r) {
        var o = e.defer();return r = r || null, n.cordova.plugins.notification.local.getTriggeredIds(function (e) {
          o.resolve(e);
        }, r), o.promise;
      }, get: function get(r, o) {
        var t = e.defer();return o = o || null, n.cordova.plugins.notification.local.get(r, function (e) {
          t.resolve(e);
        }, o), t.promise;
      }, getAll: function getAll(r) {
        var o = e.defer();return r = r || null, n.cordova.plugins.notification.local.getAll(function (e) {
          o.resolve(e);
        }, r), o.promise;
      }, getScheduled: function getScheduled(r, o) {
        var t = e.defer();return o = o || null, n.cordova.plugins.notification.local.getScheduled(r, function (e) {
          t.resolve(e);
        }, o), t.promise;
      }, getAllScheduled: function getAllScheduled(r) {
        var o = e.defer();return r = r || null, n.cordova.plugins.notification.local.getAllScheduled(function (e) {
          o.resolve(e);
        }, r), o.promise;
      }, getTriggered: function getTriggered(r, o) {
        var t = e.defer();return o = o || null, n.cordova.plugins.notification.local.getTriggered(r, function (e) {
          t.resolve(e);
        }, o), t.promise;
      }, getAllTriggered: function getAllTriggered(r) {
        var o = e.defer();return r = r || null, n.cordova.plugins.notification.local.getAllTriggered(function (e) {
          o.resolve(e);
        }, r), o.promise;
      }, getDefaults: function getDefaults() {
        return n.cordova.plugins.notification.local.getDefaults();
      }, setDefaults: function setDefaults(e) {
        n.cordova.plugins.notification.local.setDefaults(e);
      } };
  }]), angular.module("ngCordova.plugins.mMediaAds", []).factory("$cordovaMMediaAds", ["$q", "$window", function (e, n) {
    return { setOptions: function setOptions(r) {
        var o = e.defer();return n.mMedia.setOptions(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, createBanner: function createBanner(r) {
        var o = e.defer();return n.mMedia.createBanner(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, removeBanner: function removeBanner() {
        var r = e.defer();return n.mMedia.removeBanner(function () {
          r.resolve();
        }, function () {
          r.reject();
        }), r.promise;
      }, showBanner: function showBanner(r) {
        var o = e.defer();return n.mMedia.showBanner(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, showBannerAtXY: function showBannerAtXY(r, o) {
        var t = e.defer();return n.mMedia.showBannerAtXY(r, o, function () {
          t.resolve();
        }, function () {
          t.reject();
        }), t.promise;
      }, hideBanner: function hideBanner() {
        var r = e.defer();return n.mMedia.hideBanner(function () {
          r.resolve();
        }, function () {
          r.reject();
        }), r.promise;
      }, prepareInterstitial: function prepareInterstitial(r) {
        var o = e.defer();return n.mMedia.prepareInterstitial(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, showInterstitial: function showInterstitial() {
        var r = e.defer();return n.mMedia.showInterstitial(function () {
          r.resolve();
        }, function () {
          r.reject();
        }), r.promise;
      } };
  }]), angular.module("ngCordova.plugins.media", []).service("NewMedia", ["$q", "$interval", function (e, n) {
    function r(e) {
      angular.isDefined(s) || (s = n(function () {
        0 > d && (d = e.getDuration(), a && d > 0 && a.notify({ duration: d })), e.getCurrentPosition(function (e) {
          e > -1 && (f = e);
        }, function (e) {
          console.log("Error getting pos=" + e);
        }), a && a.notify({ position: f });
      }, 1e3));
    }function o() {
      angular.isDefined(s) && (n.cancel(s), s = void 0);
    }function t() {
      f = -1, d = -1;
    }function i(e) {
      this.media = new Media(e, function (e) {
        o(), t(), a.resolve(e);
      }, function (e) {
        o(), t(), a.reject(e);
      }, function (e) {
        l = e, a.notify({ status: l });
      });
    }var a,
        c,
        u,
        s,
        l = null,
        f = -1,
        d = -1;return i.prototype.play = function (n) {
      return a = e.defer(), "object" != (typeof n === "undefined" ? "undefined" : _typeof(n)) && (n = {}), this.media.play(n), r(this.media), a.promise;
    }, i.prototype.pause = function () {
      o(), this.media.pause();
    }, i.prototype.stop = function () {
      this.media.stop();
    }, i.prototype.release = function () {
      this.media.release(), this.media = void 0;
    }, i.prototype.seekTo = function (e) {
      this.media.seekTo(e);
    }, i.prototype.setVolume = function (e) {
      this.media.setVolume(e);
    }, i.prototype.startRecord = function () {
      this.media.startRecord();
    }, i.prototype.stopRecord = function () {
      this.media.stopRecord();
    }, i.prototype.currentTime = function () {
      return c = e.defer(), this.media.getCurrentPosition(function (e) {
        c.resolve(e);
      }), c.promise;
    }, i.prototype.getDuration = function () {
      return u = e.defer(), this.media.getDuration(function (e) {
        u.resolve(e);
      }), u.promise;
    }, i;
  }]).factory("$cordovaMedia", ["NewMedia", function (e) {
    return { newMedia: function newMedia(n) {
        return new e(n);
      } };
  }]), angular.module("ngCordova.plugins.mobfoxAds", []).factory("$cordovaMobFoxAds", ["$q", "$window", function (e, n) {
    return { setOptions: function setOptions(r) {
        var o = e.defer();return n.MobFox.setOptions(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, createBanner: function createBanner(r) {
        var o = e.defer();return n.MobFox.createBanner(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, removeBanner: function removeBanner() {
        var r = e.defer();return n.MobFox.removeBanner(function () {
          r.resolve();
        }, function () {
          r.reject();
        }), r.promise;
      }, showBanner: function showBanner(r) {
        var o = e.defer();return n.MobFox.showBanner(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, showBannerAtXY: function showBannerAtXY(r, o) {
        var t = e.defer();return n.MobFox.showBannerAtXY(r, o, function () {
          t.resolve();
        }, function () {
          t.reject();
        }), t.promise;
      }, hideBanner: function hideBanner() {
        var r = e.defer();return n.MobFox.hideBanner(function () {
          r.resolve();
        }, function () {
          r.reject();
        }), r.promise;
      }, prepareInterstitial: function prepareInterstitial(r) {
        var o = e.defer();return n.MobFox.prepareInterstitial(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, showInterstitial: function showInterstitial() {
        var r = e.defer();return n.MobFox.showInterstitial(function () {
          r.resolve();
        }, function () {
          r.reject();
        }), r.promise;
      } };
  }]), angular.module("ngCordova.plugins", ["ngCordova.plugins.3dtouch", "ngCordova.plugins.actionSheet", "ngCordova.plugins.adMob", "ngCordova.plugins.appAvailability", "ngCordova.plugins.appRate", "ngCordova.plugins.appVersion", "ngCordova.plugins.backgroundGeolocation", "ngCordova.plugins.badge", "ngCordova.plugins.barcodeScanner", "ngCordova.plugins.batteryStatus", "ngCordova.plugins.beacon", "ngCordova.plugins.ble", "ngCordova.plugins.bluetoothSerial", "ngCordova.plugins.brightness", "ngCordova.plugins.calendar", "ngCordova.plugins.camera", "ngCordova.plugins.capture", "ngCordova.plugins.clipboard", "ngCordova.plugins.contacts", "ngCordova.plugins.datePicker", "ngCordova.plugins.device", "ngCordova.plugins.deviceMotion", "ngCordova.plugins.deviceOrientation", "ngCordova.plugins.dialogs", "ngCordova.plugins.emailComposer", "ngCordova.plugins.facebook", "ngCordova.plugins.facebookAds", "ngCordova.plugins.file", "ngCordova.plugins.fileTransfer", "ngCordova.plugins.fileOpener2", "ngCordova.plugins.flashlight", "ngCordova.plugins.flurryAds", "ngCordova.plugins.ga", "ngCordova.plugins.geolocation", "ngCordova.plugins.globalization", "ngCordova.plugins.googleAds", "ngCordova.plugins.googleAnalytics", "ngCordova.plugins.googleMap", "ngCordova.plugins.googlePlayGame", "ngCordova.plugins.googlePlus", "ngCordova.plugins.healthKit", "ngCordova.plugins.httpd", "ngCordova.plugins.iAd", "ngCordova.plugins.imagePicker", "ngCordova.plugins.inAppBrowser", "ngCordova.plugins.instagram", "ngCordova.plugins.keyboard", "ngCordova.plugins.keychain", "ngCordova.plugins.launchNavigator", "ngCordova.plugins.localNotification", "ngCordova.plugins.media", "ngCordova.plugins.mMediaAds", "ngCordova.plugins.mobfoxAds", "ngCordova.plugins.mopubAds", "ngCordova.plugins.nativeAudio", "ngCordova.plugins.network", "ngCordova.plugins.pinDialog", "ngCordova.plugins.preferences", "ngCordova.plugins.printer", "ngCordova.plugins.progressIndicator", "ngCordova.plugins.push", "ngCordova.plugins.push_v5", "ngCordova.plugins.sms", "ngCordova.plugins.socialSharing", "ngCordova.plugins.spinnerDialog", "ngCordova.plugins.splashscreen", "ngCordova.plugins.sqlite", "ngCordova.plugins.statusbar", "ngCordova.plugins.toast", "ngCordova.plugins.touchid", "ngCordova.plugins.vibration", "ngCordova.plugins.videoCapturePlus", "ngCordova.plugins.zip", "ngCordova.plugins.insomnia"]), angular.module("ngCordova.plugins.mopubAds", []).factory("$cordovaMoPubAds", ["$q", "$window", function (e, n) {
    return { setOptions: function setOptions(r) {
        var o = e.defer();return n.MoPub.setOptions(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, createBanner: function createBanner(r) {
        var o = e.defer();return n.MoPub.createBanner(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, removeBanner: function removeBanner() {
        var r = e.defer();return n.MoPub.removeBanner(function () {
          r.resolve();
        }, function () {
          r.reject();
        }), r.promise;
      }, showBanner: function showBanner(r) {
        var o = e.defer();return n.MoPub.showBanner(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, showBannerAtXY: function showBannerAtXY(r, o) {
        var t = e.defer();return n.MoPub.showBannerAtXY(r, o, function () {
          t.resolve();
        }, function () {
          t.reject();
        }), t.promise;
      }, hideBanner: function hideBanner() {
        var r = e.defer();return n.MoPub.hideBanner(function () {
          r.resolve();
        }, function () {
          r.reject();
        }), r.promise;
      }, prepareInterstitial: function prepareInterstitial(r) {
        var o = e.defer();return n.MoPub.prepareInterstitial(r, function () {
          o.resolve();
        }, function () {
          o.reject();
        }), o.promise;
      }, showInterstitial: function showInterstitial() {
        var r = e.defer();return n.MoPub.showInterstitial(function () {
          r.resolve();
        }, function () {
          r.reject();
        }), r.promise;
      } };
  }]), angular.module("ngCordova.plugins.nativeAudio", []).factory("$cordovaNativeAudio", ["$q", "$window", function (e, n) {
    return { preloadSimple: function preloadSimple(r, o) {
        var t = e.defer();return n.plugins.NativeAudio.preloadSimple(r, o, function (e) {
          t.resolve(e);
        }, function (e) {
          t.reject(e);
        }), t.promise;
      }, preloadComplex: function preloadComplex(r, o, t, i, a) {
        var c = e.defer();return n.plugins.NativeAudio.preloadComplex(r, o, t, i, a, function (e) {
          c.resolve(e);
        }, function (e) {
          c.reject(e);
        }), c.promise;
      }, play: function play(r, o) {
        var t = e.defer();return n.plugins.NativeAudio.play(r, function (e) {
          t.resolve(e);
        }, function (e) {
          t.reject(e);
        }, o), t.promise;
      }, stop: function stop(r) {
        var o = e.defer();return n.plugins.NativeAudio.stop(r, function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      }, loop: function loop(r) {
        var o = e.defer();return n.plugins.NativeAudio.loop(r, function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      }, unload: function unload(r) {
        var o = e.defer();return n.plugins.NativeAudio.unload(r, function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      }, setVolumeForComplexAsset: function setVolumeForComplexAsset(r, o) {
        var t = e.defer();return n.plugins.NativeAudio.setVolumeForComplexAsset(r, o, function (e) {
          t.resolve(e);
        }, function (e) {
          t.reject(e);
        }), t.promise;
      } };
  }]), angular.module("ngCordova.plugins.network", []).factory("$cordovaNetwork", ["$rootScope", "$timeout", function (e, n) {
    var r = function r() {
      var r = navigator.connection.type;n(function () {
        e.$broadcast("$cordovaNetwork:offline", r);
      });
    },
        o = function o() {
      var r = navigator.connection.type;n(function () {
        e.$broadcast("$cordovaNetwork:online", r);
      });
    };return document.addEventListener("deviceready", function () {
      navigator.connection && (document.addEventListener("offline", r, !1), document.addEventListener("online", o, !1));
    }), { getNetwork: function getNetwork() {
        return navigator.connection.type;
      }, isOnline: function isOnline() {
        var e = navigator.connection.type;return e !== Connection.UNKNOWN && e !== Connection.NONE;
      }, isOffline: function isOffline() {
        var e = navigator.connection.type;return e === Connection.UNKNOWN || e === Connection.NONE;
      }, clearOfflineWatch: function clearOfflineWatch() {
        document.removeEventListener("offline", r), e.$$listeners["$cordovaNetwork:offline"] = [];
      }, clearOnlineWatch: function clearOnlineWatch() {
        document.removeEventListener("online", o), e.$$listeners["$cordovaNetwork:online"] = [];
      } };
  }]).run(["$injector", function (e) {
    e.get("$cordovaNetwork");
  }]), angular.module("ngCordova.plugins.pinDialog", []).factory("$cordovaPinDialog", ["$q", "$window", function (e, n) {
    return { prompt: function prompt(r, o, t) {
        var i = e.defer();return n.plugins.pinDialog.prompt(r, function (e) {
          i.resolve(e);
        }, o, t), i.promise;
      } };
  }]), angular.module("ngCordova.plugins.preferences", []).factory("$cordovaPreferences", ["$window", "$q", function (e, n) {
    return { pluginNotEnabledMessage: "Plugin not enabled", decoratePromise: function decoratePromise(e) {
        e.success = function (n) {
          return e.then(n), e;
        }, e.error = function (n) {
          return e.then(null, n), e;
        };
      }, store: function store(r, o, t) {
        function i(e) {
          c.resolve(e);
        }function a(e) {
          c.reject(new Error(e));
        }var c = n.defer(),
            u = c.promise;if (e.plugins) {
          var s;s = 3 === arguments.length ? e.plugins.appPreferences.store(t, r, o) : e.plugins.appPreferences.store(r, o), s.then(i, a);
        } else c.reject(new Error(this.pluginNotEnabledMessage));return this.decoratePromise(u), u;
      }, fetch: function fetch(r, o) {
        function t(e) {
          a.resolve(e);
        }function i(e) {
          a.reject(new Error(e));
        }var a = n.defer(),
            c = a.promise;if (e.plugins) {
          var u;u = 2 === arguments.length ? e.plugins.appPreferences.fetch(o, r) : e.plugins.appPreferences.fetch(r), u.then(t, i);
        } else a.reject(new Error(this.pluginNotEnabledMessage));return this.decoratePromise(c), c;
      }, remove: function remove(r, o) {
        function t(e) {
          a.resolve(e);
        }function i(e) {
          a.reject(new Error(e));
        }var a = n.defer(),
            c = a.promise;if (e.plugins) {
          var u;u = 2 === arguments.length ? e.plugins.appPreferences.remove(o, r) : e.plugins.appPreferences.remove(r), u.then(t, i);
        } else a.reject(new Error(this.pluginNotEnabledMessage));return this.decoratePromise(c), c;
      }, show: function show() {
        function r(e) {
          t.resolve(e);
        }function o(e) {
          t.reject(new Error(e));
        }var t = n.defer(),
            i = t.promise;return e.plugins ? e.plugins.appPreferences.show().then(r, o) : t.reject(new Error(this.pluginNotEnabledMessage)), this.decoratePromise(i), i;
      } };
  }]), angular.module("ngCordova.plugins.printer", []).factory("$cordovaPrinter", ["$q", "$window", function (e, n) {
    return { isAvailable: function isAvailable() {
        var r = e.defer();return n.plugin.printer.isAvailable(function (e) {
          r.resolve(e);
        }), r.promise;
      }, print: function print(r, o) {
        var t = e.defer();return n.plugin.printer.print(r, o, function () {
          t.resolve();
        }), t.promise;
      } };
  }]), angular.module("ngCordova.plugins.progressIndicator", []).factory("$cordovaProgress", [function () {
    return { show: function show(e) {
        var n = e || "Please wait...";return ProgressIndicator.show(n);
      }, showSimple: function showSimple(e) {
        var n = e || !1;return ProgressIndicator.showSimple(n);
      }, showSimpleWithLabel: function showSimpleWithLabel(e, n) {
        var r = e || !1,
            o = n || "Loading...";return ProgressIndicator.showSimpleWithLabel(r, o);
      }, showSimpleWithLabelDetail: function showSimpleWithLabelDetail(e, n, r) {
        var o = e || !1,
            t = n || "Loading...",
            i = r || "Please wait";return ProgressIndicator.showSimpleWithLabelDetail(o, t, i);
      }, showDeterminate: function showDeterminate(e, n) {
        var r = e || !1,
            o = n || 5e4;return ProgressIndicator.showDeterminate(r, o);
      }, showDeterminateWithLabel: function showDeterminateWithLabel(e, n, r) {
        var o = e || !1,
            t = n || 5e4,
            i = r || "Loading...";return ProgressIndicator.showDeterminateWithLabel(o, t, i);
      }, showAnnular: function showAnnular(e, n) {
        var r = e || !1,
            o = n || 5e4;return ProgressIndicator.showAnnular(r, o);
      }, showAnnularWithLabel: function showAnnularWithLabel(e, n, r) {
        var o = e || !1,
            t = n || 5e4,
            i = r || "Loading...";return ProgressIndicator.showAnnularWithLabel(o, t, i);
      }, showBar: function showBar(e, n) {
        var r = e || !1,
            o = n || 5e4;return ProgressIndicator.showBar(r, o);
      }, showBarWithLabel: function showBarWithLabel(e, n, r) {
        var o = e || !1,
            t = n || 5e4,
            i = r || "Loading...";return ProgressIndicator.showBarWithLabel(o, t, i);
      }, showSuccess: function showSuccess(e, n) {
        var r = e || !1,
            o = n || "Success";return ProgressIndicator.showSuccess(r, o);
      }, showText: function showText(e, n, r) {
        var o = e || !1,
            t = n || "Warning",
            i = r || "center";return ProgressIndicator.showText(o, t, i);
      }, hide: function hide() {
        return ProgressIndicator.hide();
      } };
  }]), angular.module("ngCordova.plugins.push", []).factory("$cordovaPush", ["$q", "$window", "$rootScope", "$timeout", function (e, n, r, o) {
    return { onNotification: function onNotification(e) {
        o(function () {
          r.$broadcast("$cordovaPush:notificationReceived", e);
        });
      }, register: function register(r) {
        var o,
            t = e.defer();return void 0 !== r && void 0 === r.ecb && (o = null === document.querySelector("[ng-app]") ? "document.body" : "document.querySelector('[ng-app]')", r.ecb = "angular.element(" + o + ").injector().get('$cordovaPush').onNotification"), n.plugins.pushNotification.register(function (e) {
          t.resolve(e);
        }, function (e) {
          t.reject(e);
        }, r), t.promise;
      }, unregister: function unregister(r) {
        var o = e.defer();return n.plugins.pushNotification.unregister(function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }, r), o.promise;
      }, setBadgeNumber: function setBadgeNumber(r) {
        var o = e.defer();return n.plugins.pushNotification.setApplicationIconBadgeNumber(function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }, r), o.promise;
      } };
  }]), angular.module("ngCordova.plugins.push_v5", []).factory("$cordovaPushV5", ["$q", "$rootScope", "$timeout", function (e, n, r) {
    var o;return { initialize: function initialize(n) {
        var r = e.defer();return o = PushNotification.init(n), r.resolve(o), r.promise;
      }, onNotification: function onNotification() {
        r(function () {
          o.on("notification", function (e) {
            n.$emit("$cordovaPushV5:notificationReceived", e);
          });
        });
      }, onError: function onError() {
        r(function () {
          o.on("error", function (e) {
            n.$emit("$cordovaPushV5:errorOccurred", e);
          });
        });
      }, register: function register() {
        var n = e.defer();return void 0 === o ? n.reject(new Error("init must be called before any other operation")) : o.on("registration", function (e) {
          n.resolve(e.registrationId);
        }), n.promise;
      }, unregister: function unregister() {
        var n = e.defer();return void 0 === o ? n.reject(new Error("init must be called before any other operation")) : o.unregister(function (e) {
          n.resolve(e);
        }, function (e) {
          n.reject(e);
        }), n.promise;
      }, getBadgeNumber: function getBadgeNumber() {
        var n = e.defer();return void 0 === o ? n.reject(new Error("init must be called before any other operation")) : o.getApplicationIconBadgeNumber(function (e) {
          n.resolve(e);
        }, function (e) {
          n.reject(e);
        }), n.promise;
      }, setBadgeNumber: function setBadgeNumber(n) {
        var r = e.defer();return void 0 === o ? r.reject(new Error("init must be called before any other operation")) : o.setApplicationIconBadgeNumber(function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }, n), r.promise;
      }, finish: function finish() {
        var n = e.defer();return void 0 === o ? n.reject(new Error("init must be called before any other operation")) : o.finish(function (e) {
          n.resolve(e);
        }, function (e) {
          n.reject(e);
        }), n.promise;
      } };
  }]), angular.module("ngCordova.plugins.recentsControl", []).factory("$cordovaRecents", function () {
    return { setColor: function setColor(e) {
        return RecentsControl.setColor(e);
      }, setDescription: function setDescription(e) {
        return RecentsControl.setDescription(e);
      }, setOptions: function setOptions(e, n) {
        return RecentsControl.setOptions(e, n);
      } };
  }), angular.module("ngCordova.plugins.screenshot", []).factory("$cordovaScreenshot", ["$q", function (e) {
    return { captureToFile: function captureToFile(n) {
        var r = n || {},
            o = r.extension || "jpg",
            t = r.quality || "100",
            i = e.defer();return navigator.screenshot ? (navigator.screenshot.save(function (e, n) {
          e ? i.reject(e) : i.resolve(n.filePath);
        }, o, t, r.filename), i.promise) : (i.resolve(null), i.promise);
      }, captureToUri: function captureToUri(n) {
        var r = n || {},
            o = r.extension || "jpg",
            t = r.quality || "100",
            i = e.defer();return navigator.screenshot ? (navigator.screenshot.URI(function (e, n) {
          e ? i.reject(e) : i.resolve(n.URI);
        }, o, t, r.filename), i.promise) : (i.resolve(null), i.promise);
      } };
  }]), angular.module("ngCordova.plugins.serial", []).factory("$cordovaSerial", ["$q", function (e) {
    var n = {};return n.requestPermission = function (n) {
      var r = e.defer();return serial.requestPermission(n, function () {
        r.resolve();
      }, function (e) {
        r.reject(e);
      }), r.promise;
    }, n.open = function (n) {
      var r = e.defer();return serial.open(n, function () {
        r.resolve();
      }, function (e) {
        r.reject(e);
      }), r.promise;
    }, n.write = function (n) {
      var r = e.defer();return serial.write(n, function () {
        r.resolve();
      }, function (e) {
        r.reject(e);
      }), r.promise;
    }, n.writeHex = function (n) {
      var r = e.defer();return serial.writeHex(n, function () {
        r.resolve();
      }, function (e) {
        r.reject(e);
      }), r.promise;
    }, n.read = function () {
      var n = e.defer();return serial.read(function (e) {
        var r = new Uint8Array(e);n.resolve(r);
      }, function (e) {
        n.reject(e);
      }), n.promise;
    }, n.registerReadCallback = function (e, n) {
      serial.registerReadCallback(function (n) {
        var r = new Uint8Array(n);e(r);
      }, n);
    }, n.close = function () {
      var n = e.defer();return serial.close(function () {
        n.resolve();
      }, function (e) {
        n.reject(e);
      }), n.promise;
    }, n;
  }]), angular.module("ngCordova.plugins.sms", []).factory("$cordovaSms", ["$q", function (e) {
    return { send: function send(n, r, o) {
        var t = e.defer();return sms.send(n, r, o, function (e) {
          t.resolve(e);
        }, function (e) {
          t.reject(e);
        }), t.promise;
      } };
  }]), angular.module("ngCordova.plugins.socialSharing", []).factory("$cordovaSocialSharing", ["$q", "$window", function (e, n) {
    return { share: function share(r, o, t, i) {
        var a = e.defer();return o = o || null, t = t || null, i = i || null, n.plugins.socialsharing.share(r, o, t, i, function () {
          a.resolve(!0);
        }, function () {
          a.reject(!1);
        }), a.promise;
      }, shareWithOptions: function shareWithOptions(r) {
        var o = e.defer();return n.plugins.socialsharing.shareWithOptions(r, function () {
          o.resolve(!0);
        }, function () {
          o.reject(!1);
        }), o.promise;
      }, shareViaTwitter: function shareViaTwitter(r, o, t) {
        var i = e.defer();return o = o || null, t = t || null, n.plugins.socialsharing.shareViaTwitter(r, o, t, function () {
          i.resolve(!0);
        }, function () {
          i.reject(!1);
        }), i.promise;
      }, shareViaWhatsApp: function shareViaWhatsApp(r, o, t) {
        var i = e.defer();return o = o || null, t = t || null, n.plugins.socialsharing.shareViaWhatsApp(r, o, t, function () {
          i.resolve(!0);
        }, function () {
          i.reject(!1);
        }), i.promise;
      }, shareViaFacebook: function shareViaFacebook(r, o, t) {
        var i = e.defer();return r = r || null, o = o || null, t = t || null, n.plugins.socialsharing.shareViaFacebook(r, o, t, function () {
          i.resolve(!0);
        }, function () {
          i.reject(!1);
        }), i.promise;
      }, shareViaFacebookWithPasteMessageHint: function shareViaFacebookWithPasteMessageHint(r, o, t, i) {
        var a = e.defer();return o = o || null, t = t || null, n.plugins.socialsharing.shareViaFacebookWithPasteMessageHint(r, o, t, i, function () {
          a.resolve(!0);
        }, function () {
          a.reject(!1);
        }), a.promise;
      }, shareViaSMS: function shareViaSMS(r, o) {
        var t = e.defer();return n.plugins.socialsharing.shareViaSMS(r, o, function () {
          t.resolve(!0);
        }, function () {
          t.reject(!1);
        }), t.promise;
      }, shareViaEmail: function shareViaEmail(r, o, t, i, a, c) {
        var u = e.defer();return t = t || null, i = i || null, a = a || null, c = c || null, n.plugins.socialsharing.shareViaEmail(r, o, t, i, a, c, function () {
          u.resolve(!0);
        }, function () {
          u.reject(!1);
        }), u.promise;
      }, shareVia: function shareVia(r, o, t, i, a) {
        var c = e.defer();return o = o || null, t = t || null, i = i || null, a = a || null, n.plugins.socialsharing.shareVia(r, o, t, i, a, function () {
          c.resolve(!0);
        }, function () {
          c.reject(!1);
        }), c.promise;
      }, canShareViaEmail: function canShareViaEmail() {
        var r = e.defer();return n.plugins.socialsharing.canShareViaEmail(function () {
          r.resolve(!0);
        }, function () {
          r.reject(!1);
        }), r.promise;
      }, canShareVia: function canShareVia(r, o, t, i, a) {
        var c = e.defer();return n.plugins.socialsharing.canShareVia(r, o, t, i, a, function (e) {
          c.resolve(e);
        }, function (e) {
          c.reject(e);
        }), c.promise;
      }, available: function available() {
        var n = e.defer();return window.plugins.socialsharing.available(function (e) {
          e ? n.resolve() : n.reject();
        }), n.promise;
      } };
  }]), angular.module("ngCordova.plugins.spinnerDialog", []).factory("$cordovaSpinnerDialog", ["$window", function (e) {
    return { show: function show(n, r, o, t) {
        return o = o || !1, e.plugins.spinnerDialog.show(n, r, o, t);
      }, hide: function hide() {
        return e.plugins.spinnerDialog.hide();
      } };
  }]), angular.module("ngCordova.plugins.splashscreen", []).factory("$cordovaSplashscreen", [function () {
    return { hide: function hide() {
        return navigator.splashscreen.hide();
      }, show: function show() {
        return navigator.splashscreen.show();
      } };
  }]), angular.module("ngCordova.plugins.sqlite", []).factory("$cordovaSQLite", ["$q", "$window", function (e, n) {
    return { openDB: function openDB(e, r) {
        return angular.isObject(e) && !angular.isString(e) ? ("undefined" != typeof r && (e.bgType = r), n.sqlitePlugin.openDatabase(e)) : n.sqlitePlugin.openDatabase({ name: e, bgType: r });
      }, execute: function execute(n, r, o) {
        var t = e.defer();return n.transaction(function (e) {
          e.executeSql(r, o, function (e, n) {
            t.resolve(n);
          }, function (e, n) {
            t.reject(n);
          });
        }), t.promise;
      }, insertCollection: function insertCollection(n, r, o) {
        var t = e.defer(),
            i = o.slice(0);return n.transaction(function (e) {
          !function n() {
            var o = i.splice(0, 1)[0];try {
              e.executeSql(r, o, function (e, r) {
                0 === i.length ? t.resolve(r) : n();
              }, function (e, n) {
                t.reject(n);
              });
            } catch (a) {
              t.reject(a);
            }
          }();
        }), t.promise;
      }, nestedExecute: function nestedExecute(n, r, o, t, i) {
        var a = e.defer();return n.transaction(function (e) {
          e.executeSql(r, t, function (e, n) {
            a.resolve(n), e.executeSql(o, i, function (e, n) {
              a.resolve(n);
            });
          });
        }, function (e, n) {
          a.reject(n);
        }), a.promise;
      }, deleteDB: function deleteDB(r) {
        var o = e.defer();return n.sqlitePlugin.deleteDatabase(r, function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      } };
  }]), angular.module("ngCordova.plugins.statusbar", []).factory("$cordovaStatusbar", [function () {
    return { overlaysWebView: function overlaysWebView(e) {
        return StatusBar.overlaysWebView(!!e);
      }, STYLES: { DEFAULT: 0, LIGHT_CONTENT: 1, BLACK_TRANSLUCENT: 2, BLACK_OPAQUE: 3 }, style: function style(e) {
        switch (e) {case 0:
            return StatusBar.styleDefault();case 1:
            return StatusBar.styleLightContent();case 2:
            return StatusBar.styleBlackTranslucent();case 3:
            return StatusBar.styleBlackOpaque();default:
            return StatusBar.styleDefault();}
      }, styleColor: function styleColor(e) {
        return StatusBar.backgroundColorByName(e);
      }, styleHex: function styleHex(e) {
        return StatusBar.backgroundColorByHexString(e);
      }, hide: function hide() {
        return StatusBar.hide();
      }, show: function show() {
        return StatusBar.show();
      }, isVisible: function isVisible() {
        return StatusBar.isVisible;
      } };
  }]), angular.module("ngCordova.plugins.toast", []).factory("$cordovaToast", ["$q", "$window", function (e, n) {
    return { showShortTop: function showShortTop(r) {
        var o = e.defer();return n.plugins.toast.showShortTop(r, function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      }, showShortCenter: function showShortCenter(r) {
        var o = e.defer();return n.plugins.toast.showShortCenter(r, function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      }, showShortBottom: function showShortBottom(r) {
        var o = e.defer();return n.plugins.toast.showShortBottom(r, function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      }, showLongTop: function showLongTop(r) {
        var o = e.defer();return n.plugins.toast.showLongTop(r, function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      }, showLongCenter: function showLongCenter(r) {
        var o = e.defer();return n.plugins.toast.showLongCenter(r, function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      }, showLongBottom: function showLongBottom(r) {
        var o = e.defer();return n.plugins.toast.showLongBottom(r, function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      }, showWithOptions: function showWithOptions(r) {
        var o = e.defer();return n.plugins.toast.showWithOptions(r, function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      }, show: function show(r, o, t) {
        var i = e.defer();return n.plugins.toast.show(r, o, t, function (e) {
          i.resolve(e);
        }, function (e) {
          i.reject(e);
        }), i.promise;
      }, hide: function hide() {
        var r = e.defer();try {
          n.plugins.toast.hide(), r.resolve();
        } catch (o) {
          r.reject(o && o.message);
        }return r.promise;
      } };
  }]), angular.module("ngCordova.plugins.touchid", []).factory("$cordovaTouchID", ["$q", function (e) {
    return { checkSupport: function checkSupport() {
        var n = e.defer();return window.cordova ? touchid.checkSupport(function (e) {
          n.resolve(e);
        }, function (e) {
          n.reject(e);
        }) : n.reject("Not supported without cordova.js"), n.promise;
      }, authenticate: function authenticate(n) {
        var r = e.defer();return window.cordova ? touchid.authenticate(function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }, n) : r.reject("Not supported without cordova.js"), r.promise;
      } };
  }]), angular.module("ngCordova.plugins.tts", []).factory("$cordovaTTS", function () {
    return { speak: function speak(e, n, r) {
        return TTS.speak(e, n, r);
      } };
  }), angular.module("ngCordova.plugins.upsPush", []).factory("$cordovaUpsPush", ["$q", "$window", "$rootScope", "$timeout", function (e, n, r, o) {
    return { register: function register(t) {
        var i = e.defer();return n.push.register(function (e) {
          o(function () {
            r.$broadcast("$cordovaUpsPush:notificationReceived", e);
          });
        }, function () {
          i.resolve();
        }, function (e) {
          i.reject(e);
        }, t), i.promise;
      }, unregister: function unregister(r) {
        var o = e.defer();return n.push.unregister(function () {
          o.resolve();
        }, function (e) {
          o.reject(e);
        }, r), o.promise;
      }, setBadgeNumber: function setBadgeNumber(r) {
        var o = e.defer();return n.push.setApplicationIconBadgeNumber(function () {
          o.resolve();
        }, r), o.promise;
      } };
  }]), angular.module("ngCordova.plugins.vibration", []).factory("$cordovaVibration", [function () {
    return { vibrate: function vibrate(e) {
        return navigator.notification.vibrate(e);
      }, vibrateWithPattern: function vibrateWithPattern(e, n) {
        return navigator.notification.vibrateWithPattern(e, n);
      }, cancelVibration: function cancelVibration() {
        return navigator.notification.cancelVibration();
      } };
  }]), angular.module("ngCordova.plugins.videoCapturePlus", []).provider("$cordovaVideoCapturePlus", [function () {
    var e = {};this.setLimit = function (n) {
      e.limit = n;
    }, this.setMaxDuration = function (n) {
      e.duration = n;
    }, this.setHighQuality = function (n) {
      e.highquality = n;
    }, this.useFrontCamera = function (n) {
      e.frontcamera = n;
    }, this.setPortraitOverlay = function (n) {
      e.portraitOverlay = n;
    }, this.setLandscapeOverlay = function (n) {
      e.landscapeOverlay = n;
    }, this.setOverlayText = function (n) {
      e.overlayText = n;
    }, this.$get = ["$q", "$window", function (n, r) {
      return { captureVideo: function captureVideo(o) {
          var t = n.defer();return r.plugins.videocaptureplus ? (r.plugins.videocaptureplus.captureVideo(t.resolve, t.reject, angular.extend({}, e, o)), t.promise) : (t.resolve(null), t.promise);
        } };
    }];
  }]), angular.module("ngCordova.plugins.zip", []).factory("$cordovaZip", ["$q", "$window", function (e, n) {
    return { unzip: function unzip(r, o) {
        var t = e.defer();return n.zip.unzip(r, o, function (e) {
          0 === e ? t.resolve() : t.reject();
        }, function (e) {
          t.notify(e);
        }), t.promise;
      } };
  }]);
}();
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

  $scope.submitChore = function (chore) {
    chore.user_household_fk = currentUser.user_household;
    console.log(chore);
    console.log($scope.values);
    // choreService.createChore(chore)
    // .then(function(res){
    //
    // })
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
    console.log(res.data[0].user_banner_image);
    $scope.banner = res.data[0].user_banner_image;
  });

  console.log(userToken.zip);

  userService.getWeather(userToken.zip).then(function (res) {
    console.log(res.data);
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

  this.showchild = function (household) {
    return $http({
      method: "GET",
      url: "/children/" + household
    });
  };
}); //end of service
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm5nLWNvcmRvdmEubWluLmpzIiwiY29udHJvbGxlcnMvYWRkQ2hpbGRDdHJsLmpzIiwiY29udHJvbGxlcnMvYXNzaWduQ2hvcmVDdHJsLmpzIiwiY29udHJvbGxlcnMvY2FtZXJhQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NoaWxkQmFua0N0cmwuanMiLCJjb250cm9sbGVycy9jaGlsZEhvbWVDdHJsLmpzIiwiY29udHJvbGxlcnMvY2hpbGRMb2dpbkN0cmwuanMiLCJjb250cm9sbGVycy9lZGl0Q2hpbGRDdHJsLmpzIiwiY29udHJvbGxlcnMvaGlzdG9yeUN0cmwuanMiLCJjb250cm9sbGVycy9ob21lQ3RybC5qcyIsImNvbnRyb2xsZXJzL2xvZ2luQ3RybC5qcyIsImNvbnRyb2xsZXJzL21ha2VDaG9yZUN0cmwuanMiLCJjb250cm9sbGVycy9zZXRSZXdhcmRzQ3RybC5qcyIsImNvbnRyb2xsZXJzL3NldHRpbmdzQ3RybC5qcyIsImNvbnRyb2xsZXJzL3RyYWNrZXJDdHJsLmpzIiwiY29udHJvbGxlcnMvdXNlckluZm9DdHJsLmpzIiwic2VydmljZS9jaG9yZVNlcnZpY2UuanMiLCJzZXJ2aWNlL2xvZ2luU2VydmljZS5qcyIsInNlcnZpY2UvdXNlclNlcnZpY2UuanMiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsImNvbmZpZyIsIiRzdGF0ZVByb3ZpZGVyIiwiJHVybFJvdXRlclByb3ZpZGVyIiwiJGF1dGhQcm92aWRlciIsIm90aGVyd2lzZSIsInN0YXRlIiwidXJsIiwidGVtcGxhdGVVcmwiLCJjb250cm9sbGVyIiwiZmFjZWJvb2siLCJjbGllbnRJZCIsInJlc3BvbnNlVHlwZSIsImdvb2dsZSIsInJ1biIsIiRpb25pY1BsYXRmb3JtIiwicmVhZHkiLCJ3aW5kb3ciLCJjb3Jkb3ZhIiwicGx1Z2lucyIsIktleWJvYXJkIiwiaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyIiwiZGlzYWJsZVNjcm9sbCIsIlN0YXR1c0JhciIsInN0eWxlRGVmYXVsdCIsImZhY3RvcnkiLCJlIiwibiIsInIiLCJvIiwidHlwZSIsImlzQXZhaWxhYmxlIiwiZGVmZXIiLCJUaHJlZURlZVRvdWNoIiwicmVzb2x2ZSIsInJlamVjdCIsInByb21pc2UiLCJhZGRRdWlja0FjdGlvbiIsInQiLCJpIiwiYSIsImMiLCJ1IiwicyIsImwiLCJmIiwidGl0bGUiLCJzdWJ0aXRsZSIsImljb25UeXBlIiwiaWNvblRlbXBsYXRlIiwidGhlbiIsInB1c2giLCJjb25maWd1cmVRdWlja0FjdGlvbnMiLCJvbkhvbWVJY29uUHJlc3NlZCIsImFkZFF1aWNrQWN0aW9uSGFuZGxlciIsImVuYWJsZUxpbmtQcmV2aWV3IiwiYWRkRm9yY2VUb3VjaEhhbmRsZXIiLCJ3YXRjaEZvcmNlVG91Y2hlcyIsInNob3ciLCJhY3Rpb25zaGVldCIsImhpZGUiLCJjcmVhdGVCYW5uZXJWaWV3IiwiQWRNb2IiLCJjcmVhdGVJbnRlcnN0aXRpYWxWaWV3IiwicmVxdWVzdEFkIiwic2hvd0FkIiwicmVxdWVzdEludGVyc3RpdGlhbEFkIiwiY2hlY2siLCJhcHBBdmFpbGFiaWxpdHkiLCJwcm92aWRlciIsInNldFByZWZlcmVuY2VzIiwiaXNPYmplY3QiLCJBcHBSYXRlIiwicHJlZmVyZW5jZXMiLCJ1c2VMYW5ndWFnZSIsImxhbmd1YWdlIiwiZGlzcGxheUFwcE5hbWUiLCJhcHBOYW1lIiwicHJvbXB0QWdhaW5Gb3JFYWNoTmV3VmVyc2lvbiIsInByb21wdEZvck5ld1ZlcnNpb24iLCJvcGVuU3RvcmVJbkFwcCIsInVzZXNVbnRpbFByb21wdCIsInVzZUN1c3RvbVJhdGVEaWFsb2ciLCJzdG9yZUFwcFVSTCIsImlvcyIsImlvc1VSTCIsImFuZHJvaWQiLCJhbmRyb2lkVVJMIiwiYmxhY2tiZXJyeSIsImJsYWNrYmVycnlVUkwiLCJ3aW5kb3dzOCIsIndpbmRvd3NVUkwiLCJzZXRDdXN0b21Mb2NhbGUiLCJtZXNzYWdlIiwiY2FuY2VsQnV0dG9uTGFiZWwiLCJsYXRlckJ1dHRvbkxhYmVsIiwicmF0ZUJ1dHRvbkxhYmVsIiwiZXh0ZW5kIiwiY3VzdG9tTG9jYWxlIiwiJGdldCIsInByb21wdEZvclJhdGluZyIsIm5hdmlnYXRlVG9BcHBTdG9yZSIsIm9uQnV0dG9uQ2xpY2tlZCIsImNhbGxiYWNrcyIsImJpbmQiLCJvblJhdGVEaWFsb2dTaG93IiwiZ2V0QXBwTmFtZSIsImdldEFwcFZlcnNpb24iLCJnZXRQYWNrYWdlTmFtZSIsImdldFZlcnNpb25OdW1iZXIiLCJnZXRWZXJzaW9uQ29kZSIsImluaXQiLCJuYXZpZ2F0b3IiLCJnZW9sb2NhdGlvbiIsImdldEN1cnJlbnRQb3NpdGlvbiIsImNvbmZpZ3VyZSIsImJhY2tncm91bmRHZW9Mb2NhdGlvbiIsIm5vdGlmeSIsImZpbmlzaCIsInN0YXJ0Iiwic3RvcCIsImhhc1Blcm1pc3Npb24iLCJub3RpZmljYXRpb24iLCJiYWRnZSIsInByb21wdEZvclBlcm1pc3Npb24iLCJzZXQiLCJnZXQiLCJjbGVhciIsImluY3JlYXNlIiwiZGVjcmVhc2UiLCJzY2FuIiwiYmFyY29kZVNjYW5uZXIiLCJlbmNvZGUiLCIkYnJvYWRjYXN0IiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiYmF0dGVyeSIsImxvY2F0aW9uTWFuYWdlciIsIkRlbGVnYXRlIiwiZGlkRGV0ZXJtaW5lU3RhdGVGb3JSZWdpb24iLCJkaWRTdGFydE1vbml0b3JpbmdGb3JSZWdpb24iLCJkaWRFeGl0UmVnaW9uIiwiZGlkRW50ZXJSZWdpb24iLCJkaWRSYW5nZUJlYWNvbnNJblJlZ2lvbiIsInBlcmlwaGVyYWxNYW5hZ2VyRGlkU3RhcnRBZHZlcnRpc2luZyIsInBlcmlwaGVyYWxNYW5hZ2VyRGlkVXBkYXRlU3RhdGUiLCJkaWRDaGFuZ2VBdXRob3JpemF0aW9uU3RhdHVzIiwic2V0RGVsZWdhdGUiLCJzZXRDYWxsYmFja0RpZERldGVybWluZVN0YXRlRm9yUmVnaW9uIiwic2V0Q2FsbGJhY2tEaWRTdGFydE1vbml0b3JpbmdGb3JSZWdpb24iLCJzZXRDYWxsYmFja0RpZEV4aXRSZWdpb24iLCJzZXRDYWxsYmFja0RpZEVudGVyUmVnaW9uIiwic2V0Q2FsbGJhY2tEaWRSYW5nZUJlYWNvbnNJblJlZ2lvbiIsInNldENhbGxiYWNrUGVyaXBoZXJhbE1hbmFnZXJEaWRTdGFydEFkdmVydGlzaW5nIiwic2V0Q2FsbGJhY2tQZXJpcGhlcmFsTWFuYWdlckRpZFVwZGF0ZVN0YXRlIiwic2V0Q2FsbGJhY2tEaWRDaGFuZ2VBdXRob3JpemF0aW9uU3RhdHVzIiwiY3JlYXRlQmVhY29uUmVnaW9uIiwiQmVhY29uUmVnaW9uIiwiaXNCbHVldG9vdGhFbmFibGVkIiwid2hlbiIsImVuYWJsZUJsdWV0b290aCIsImRpc2FibGVCbHVldG9vdGgiLCJzdGFydE1vbml0b3JpbmdGb3JSZWdpb24iLCJzdG9wTW9uaXRvcmluZ0ZvclJlZ2lvbiIsInJlcXVlc3RTdGF0ZUZvclJlZ2lvbiIsInN0YXJ0UmFuZ2luZ0JlYWNvbnNJblJlZ2lvbiIsInN0b3BSYW5naW5nQmVhY29uc0luUmVnaW9uIiwiZ2V0QXV0aG9yaXphdGlvblN0YXR1cyIsInJlcXVlc3RXaGVuSW5Vc2VBdXRob3JpemF0aW9uIiwicmVxdWVzdEFsd2F5c0F1dGhvcml6YXRpb24iLCJnZXRNb25pdG9yZWRSZWdpb25zIiwiZ2V0UmFuZ2VkUmVnaW9ucyIsImlzUmFuZ2luZ0F2YWlsYWJsZSIsImlzTW9uaXRvcmluZ0F2YWlsYWJsZUZvckNsYXNzIiwic3RhcnRBZHZlcnRpc2luZyIsInN0b3BBZHZlcnRpc2luZyIsImlzQWR2ZXJ0aXNpbmdBdmFpbGFibGUiLCJpc0FkdmVydGlzaW5nIiwiZGlzYWJsZURlYnVnTG9ncyIsImVuYWJsZURlYnVnTm90aWZpY2F0aW9ucyIsImRpc2FibGVEZWJ1Z05vdGlmaWNhdGlvbnMiLCJlbmFibGVEZWJ1Z0xvZ3MiLCJhcHBlbmRUb0RldmljZUxvZyIsImJsZSIsInN0YXJ0U2NhbiIsInN0b3BTY2FuIiwiY29ubmVjdCIsImRpc2Nvbm5lY3QiLCJyZWFkIiwid3JpdGUiLCJ3cml0ZVdpdGhvdXRSZXNwb25zZSIsIndyaXRlQ29tbWFuZCIsIndhcm5pbmciLCJzdGFydE5vdGlmaWNhdGlvbiIsInN0b3BOb3RpZmljYXRpb24iLCJpc0Nvbm5lY3RlZCIsImVuYWJsZSIsImlzRW5hYmxlZCIsImJsdWV0b290aFNlcmlhbCIsImNvbm5lY3RJbnNlY3VyZSIsImxpc3QiLCJkaXNjb3ZlclVucGFpcmVkIiwic2V0RGV2aWNlRGlzY292ZXJlZExpc3RlbmVyIiwiY2xlYXJEZXZpY2VEaXNjb3ZlcmVkTGlzdGVuZXIiLCJzaG93Qmx1ZXRvb3RoU2V0dGluZ3MiLCJhdmFpbGFibGUiLCJyZWFkVW50aWwiLCJzdWJzY3JpYmUiLCJzdWJzY3JpYmVSYXdEYXRhIiwidW5zdWJzY3JpYmUiLCJ1bnN1YnNjcmliZVJhd0RhdGEiLCJyZWFkUlNTSSIsImJyaWdodG5lc3MiLCJnZXRCcmlnaHRuZXNzIiwic2V0QnJpZ2h0bmVzcyIsInNldEtlZXBTY3JlZW5PbiIsImNyZWF0ZUNhbGVuZGFyIiwiY2FsZW5kYXIiLCJnZXRDcmVhdGVDYWxlbmRhck9wdGlvbnMiLCJjYWxlbmRhck5hbWUiLCJkZWxldGVDYWxlbmRhciIsImNyZWF0ZUV2ZW50IiwibG9jYXRpb24iLCJub3RlcyIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJEYXRlIiwiY3JlYXRlRXZlbnRXaXRoT3B0aW9ucyIsImdldENhbGVuZGFyT3B0aW9ucyIsIk9iamVjdCIsImtleXMiLCJpbmRleE9mIiwiY3JlYXRlRXZlbnRJbnRlcmFjdGl2ZWx5IiwiY3JlYXRlRXZlbnRJbk5hbWVkQ2FsZW5kYXIiLCJmaW5kRXZlbnQiLCJsaXN0RXZlbnRzSW5SYW5nZSIsImxpc3RDYWxlbmRhcnMiLCJmaW5kQWxsRXZlbnRzSW5OYW1lZENhbGVuZGFyIiwibW9kaWZ5RXZlbnQiLCJuZXdUaXRsZSIsIm5ld0xvY2F0aW9uIiwibmV3Tm90ZXMiLCJuZXdTdGFydERhdGUiLCJuZXdFbmREYXRlIiwiZGVsZXRlRXZlbnQiLCJnZXRQaWN0dXJlIiwiY2FtZXJhIiwiY2xlYW51cCIsImNhcHR1cmVBdWRpbyIsImRldmljZSIsImNhcHR1cmUiLCJjYXB0dXJlSW1hZ2UiLCJjYXB0dXJlVmlkZW8iLCJleHBpcnkiLCJjdnYiLCJ6aXAiLCJzdXBwcmVzc01hbnVhbCIsInN1cHByZXNzQ29uZmlybSIsImhpZGVMb2dvIiwic2V0Q2FyZElPUmVzcG9uc2VGaWVsZHMiLCJpc0FycmF5Iiwic2V0U2NhbmVyQ29uZmlnIiwic2NhbkNhcmQiLCJDYXJkSU8iLCJsZW5ndGgiLCJTdHJpbmciLCJleHBpcnlfeWVhciIsInN1YnN0ciIsImNvcHkiLCJjbGlwYm9hcmQiLCJwYXN0ZSIsInNhdmUiLCJjb250YWN0cyIsImNyZWF0ZSIsInJlbW92ZSIsImNsb25lIiwiZmluZCIsImZpZWxkcyIsInBpY2tDb250YWN0IiwiZGF0ZSIsIm1vZGUiLCJkYXRlUGlja2VyIiwiZ2V0RGV2aWNlIiwiZ2V0Q29yZG92YSIsImdldE1vZGVsIiwibW9kZWwiLCJnZXROYW1lIiwibmFtZSIsImdldFBsYXRmb3JtIiwicGxhdGZvcm0iLCJnZXRVVUlEIiwidXVpZCIsImdldFZlcnNpb24iLCJ2ZXJzaW9uIiwiZ2V0TWFudWZhY3R1cmVyIiwibWFudWZhY3R1cmVyIiwiZ2V0Q3VycmVudEFjY2VsZXJhdGlvbiIsImlzVW5kZWZpbmVkIiwiYWNjZWxlcm9tZXRlciIsImlzRnVuY3Rpb24iLCJ3YXRjaEFjY2VsZXJhdGlvbiIsImNhbmNlbCIsImNsZWFyV2F0Y2giLCJ3YXRjaElEIiwiZnJlcXVlbmN5IiwiZ2V0Q3VycmVudEhlYWRpbmciLCJjb21wYXNzIiwid2F0Y2hIZWFkaW5nIiwiYWxlcnQiLCJjb25maXJtIiwicHJvbXB0IiwiaW5wdXQxIiwiYnV0dG9uSW5kZXgiLCJiZWVwIiwiYWN0aXZpdHlTdGFydCIsInBsYXRmb3JtSWQiLCJhY3Rpdml0eVN0b3AiLCJwcm9ncmVzc1N0YXJ0IiwicHJvZ3Jlc3NTdG9wIiwicHJvZ3Jlc3NWYWx1ZSIsImVtYWlsIiwib3BlbiIsImFkZEFsaWFzIiwiYnJvd3NlckluaXQiLCJhcHBJRCIsImFwcFZlcnNpb24iLCJmYWNlYm9va0Nvbm5lY3RQbHVnaW4iLCJsb2dpbiIsInNob3dEaWFsb2ciLCJhcGkiLCJnZXRBY2Nlc3NUb2tlbiIsImdldExvZ2luU3RhdHVzIiwibG9nb3V0Iiwic2V0T3B0aW9ucyIsIkZhY2Vib29rQWRzIiwiY3JlYXRlQmFubmVyIiwicmVtb3ZlQmFubmVyIiwic2hvd0Jhbm5lciIsInNob3dCYW5uZXJBdFhZIiwiaGlkZUJhbm5lciIsInByZXBhcmVJbnRlcnN0aXRpYWwiLCJzaG93SW50ZXJzdGl0aWFsIiwiY29uc3RhbnQiLCJnZXRGcmVlRGlza1NwYWNlIiwiZXhlYyIsImNoZWNrRGlyIiwidGVzdCIsInJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwiLCJpc0RpcmVjdG9yeSIsImNvZGUiLCJjaGVja0ZpbGUiLCJpc0ZpbGUiLCJjcmVhdGVEaXIiLCJleGNsdXNpdmUiLCJnZXREaXJlY3RvcnkiLCJjcmVhdGVGaWxlIiwiZ2V0RmlsZSIsInJlbW92ZURpciIsInN1Y2Nlc3MiLCJmaWxlUmVtb3ZlZCIsInJlbW92ZUZpbGUiLCJyZW1vdmVSZWN1cnNpdmVseSIsIndyaXRlRmlsZSIsImNyZWF0ZVdyaXRlciIsImFwcGVuZCIsInNlZWsiLCJ0cnVuY2F0ZSIsIm9ud3JpdGVlbmQiLCJlcnJvciIsImFib3J0Iiwid3JpdGVFeGlzdGluZ0ZpbGUiLCJyZWFkQXNUZXh0IiwiZmlsZSIsIkZpbGVSZWFkZXIiLCJvbmxvYWRlbmQiLCJ0YXJnZXQiLCJyZXN1bHQiLCJyZWFkQXNEYXRhVVJMIiwicmVhZEFzQmluYXJ5U3RyaW5nIiwicmVhZEFzQXJyYXlCdWZmZXIiLCJtb3ZlRmlsZSIsIm1vdmVUbyIsIm1vdmVEaXIiLCJjb3B5RGlyIiwiY29weVRvIiwiY29weUZpbGUiLCJyZWFkRmlsZU1ldGFkYXRhIiwiZmlsZU9wZW5lcjIiLCJ1bmluc3RhbGwiLCJhcHBJc0luc3RhbGxlZCIsImRvd25sb2FkIiwiRmlsZVRyYW5zZmVyIiwiZW5jb2RlVVJJIiwidGltZW91dCIsIm9ucHJvZ3Jlc3MiLCJ1cGxvYWQiLCJmbGFzaGxpZ2h0Iiwic3dpdGNoT24iLCJzd2l0Y2hPZmYiLCJ0b2dnbGUiLCJGbHVycnlBZHMiLCJnYVBsdWdpbiIsInRyYWNrRXZlbnQiLCJ0cmFja1BhZ2UiLCJzZXRWYXJpYWJsZSIsImV4aXQiLCJ3YXRjaFBvc2l0aW9uIiwiZ2V0UHJlZmVycmVkTGFuZ3VhZ2UiLCJnbG9iYWxpemF0aW9uIiwiZ2V0TG9jYWxlTmFtZSIsImdldEZpcnN0RGF5T2ZXZWVrIiwiZGF0ZVRvU3RyaW5nIiwic3RyaW5nVG9EYXRlIiwiZ2V0RGF0ZVBhdHRlcm4iLCJnZXREYXRlTmFtZXMiLCJpc0RheUxpZ2h0U2F2aW5nc1RpbWUiLCJudW1iZXJUb1N0cmluZyIsInN0cmluZ1RvTnVtYmVyIiwiZ2V0TnVtYmVyUGF0dGVybiIsImdldEN1cnJlbmN5UGF0dGVybiIsInN0YXJ0VHJhY2tlcldpdGhJZCIsImFuYWx5dGljcyIsInNldFVzZXJJZCIsImRlYnVnTW9kZSIsInRyYWNrVmlldyIsImFkZEN1c3RvbURpbWVuc2lvbiIsInBhcnNlSW50IiwiaXNOYU4iLCJ0cmFja0V4Y2VwdGlvbiIsInRyYWNrVGltaW5nIiwiYWRkVHJhbnNhY3Rpb24iLCJhZGRUcmFuc2FjdGlvbkl0ZW0iLCJnZXRNYXAiLCJwbHVnaW4iLCJtYXBzIiwiZ2V0RWxlbWVudEJ5SWQiLCJNYXAiLCJzZXREaXYiLCJpc01hcExvYWRlZCIsImFkZE1hcmtlciIsImdldE1hcFR5cGVJZHMiLCJtYXBUeXBlSWQiLCJzZXRWaXNpYmxlIiwiYXV0aCIsImdvb2dsZXBsYXlnYW1lIiwic2lnbm91dCIsImlzU2lnbmVkSW4iLCJzaG93UGxheWVyIiwic3VibWl0U2NvcmUiLCJzaG93QWxsTGVhZGVyYm9hcmRzIiwic2hvd0xlYWRlcmJvYXJkIiwidW5sb2NrQWNoaWV2ZW1lbnQiLCJpbmNyZW1lbnRBY2hpZXZlbWVudCIsInNob3dBY2hpZXZlbWVudHMiLCJnb29nbGVwbHVzIiwiaU9TQXBpS2V5Iiwic2lsZW50TG9naW4iLCJ0cnlTaWxlbnRMb2dpbiIsImhlYWx0aGtpdCIsImNoZWNrQXV0aFN0YXR1cyIsInJlcXVlc3RBdXRob3JpemF0aW9uIiwicmVhZFR5cGVzIiwid3JpdGVUeXBlcyIsInJlYWREYXRlT2ZCaXJ0aCIsInJlYWRHZW5kZXIiLCJzYXZlV2VpZ2h0IiwidW5pdCIsImFtb3VudCIsInJlYWRXZWlnaHQiLCJzYXZlSGVpZ2h0IiwicmVhZEhlaWdodCIsImZpbmRXb3Jrb3V0cyIsInNhdmVXb3Jrb3V0IiwicXVlcnlTYW1wbGVUeXBlIiwic3RhcnRTZXJ2ZXIiLCJDb3JIdHRwZCIsInN0b3BTZXJ2ZXIiLCJnZXRVUkwiLCJnZXRMb2NhbFBhdGgiLCJpQWQiLCJnZXRQaWN0dXJlcyIsImltYWdlUGlja2VyIiwiZGVmYXVsdE9wdGlvbnMiLCJzZXREZWZhdWx0T3B0aW9ucyIsImZvckVhY2giLCJkIiwiam9pbiIsImNsb3NlIiwiZXhlY3V0ZVNjcmlwdCIsImluc2VydENTUyIsImtlZXBBd2FrZSIsImluc29tbmlhIiwiYWxsb3dTbGVlcEFnYWluIiwic2hhcmUiLCJJbnN0YWdyYW0iLCJpbWFnZSIsImNhcHRpb24iLCJjb25zb2xlIiwiaXNJbnN0YWxsZWQiLCIkZXZhbEFzeW5jIiwiaGlkZUFjY2Vzc29yeUJhciIsImlzVmlzaWJsZSIsImNsZWFyU2hvd1dhdGNoIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIiQkbGlzdGVuZXJzIiwiY2xlYXJIaWRlV2F0Y2giLCJnZXRGb3JLZXkiLCJLZXljaGFpbiIsInNldEZvcktleSIsInJlbW92ZUZvcktleSIsIm5hdmlnYXRlIiwibGF1bmNobmF2aWdhdG9yIiwibG9jYWwiLCJvbiIsInNjaGVkdWxlIiwiYWRkIiwid2FybiIsInVwZGF0ZSIsImNsZWFyQWxsIiwiY2FuY2VsQWxsIiwiaXNQcmVzZW50IiwiaXNTY2hlZHVsZWQiLCJpc1RyaWdnZXJlZCIsInJlZ2lzdGVyUGVybWlzc2lvbiIsImdldEFsbElkcyIsImdldElkcyIsImdldFNjaGVkdWxlZElkcyIsImdldFRyaWdnZXJlZElkcyIsImdldEFsbCIsImdldFNjaGVkdWxlZCIsImdldEFsbFNjaGVkdWxlZCIsImdldFRyaWdnZXJlZCIsImdldEFsbFRyaWdnZXJlZCIsImdldERlZmF1bHRzIiwic2V0RGVmYXVsdHMiLCJtTWVkaWEiLCJzZXJ2aWNlIiwiaXNEZWZpbmVkIiwiZ2V0RHVyYXRpb24iLCJkdXJhdGlvbiIsImxvZyIsInBvc2l0aW9uIiwibWVkaWEiLCJNZWRpYSIsInN0YXR1cyIsInByb3RvdHlwZSIsInBsYXkiLCJwYXVzZSIsInJlbGVhc2UiLCJzZWVrVG8iLCJzZXRWb2x1bWUiLCJzdGFydFJlY29yZCIsInN0b3BSZWNvcmQiLCJjdXJyZW50VGltZSIsIm5ld01lZGlhIiwiTW9iRm94IiwiTW9QdWIiLCJwcmVsb2FkU2ltcGxlIiwiTmF0aXZlQXVkaW8iLCJwcmVsb2FkQ29tcGxleCIsImxvb3AiLCJ1bmxvYWQiLCJzZXRWb2x1bWVGb3JDb21wbGV4QXNzZXQiLCJjb25uZWN0aW9uIiwiZ2V0TmV0d29yayIsImlzT25saW5lIiwiQ29ubmVjdGlvbiIsIlVOS05PV04iLCJOT05FIiwiaXNPZmZsaW5lIiwiY2xlYXJPZmZsaW5lV2F0Y2giLCJjbGVhck9ubGluZVdhdGNoIiwicGluRGlhbG9nIiwicGx1Z2luTm90RW5hYmxlZE1lc3NhZ2UiLCJkZWNvcmF0ZVByb21pc2UiLCJzdG9yZSIsIkVycm9yIiwiYXJndW1lbnRzIiwiYXBwUHJlZmVyZW5jZXMiLCJmZXRjaCIsInByaW50ZXIiLCJwcmludCIsIlByb2dyZXNzSW5kaWNhdG9yIiwic2hvd1NpbXBsZSIsInNob3dTaW1wbGVXaXRoTGFiZWwiLCJzaG93U2ltcGxlV2l0aExhYmVsRGV0YWlsIiwic2hvd0RldGVybWluYXRlIiwic2hvd0RldGVybWluYXRlV2l0aExhYmVsIiwic2hvd0FubnVsYXIiLCJzaG93QW5udWxhcldpdGhMYWJlbCIsInNob3dCYXIiLCJzaG93QmFyV2l0aExhYmVsIiwic2hvd1N1Y2Nlc3MiLCJzaG93VGV4dCIsIm9uTm90aWZpY2F0aW9uIiwicmVnaXN0ZXIiLCJlY2IiLCJxdWVyeVNlbGVjdG9yIiwicHVzaE5vdGlmaWNhdGlvbiIsInVucmVnaXN0ZXIiLCJzZXRCYWRnZU51bWJlciIsInNldEFwcGxpY2F0aW9uSWNvbkJhZGdlTnVtYmVyIiwiaW5pdGlhbGl6ZSIsIlB1c2hOb3RpZmljYXRpb24iLCIkZW1pdCIsIm9uRXJyb3IiLCJyZWdpc3RyYXRpb25JZCIsImdldEJhZGdlTnVtYmVyIiwiZ2V0QXBwbGljYXRpb25JY29uQmFkZ2VOdW1iZXIiLCJzZXRDb2xvciIsIlJlY2VudHNDb250cm9sIiwic2V0RGVzY3JpcHRpb24iLCJjYXB0dXJlVG9GaWxlIiwiZXh0ZW5zaW9uIiwicXVhbGl0eSIsInNjcmVlbnNob3QiLCJmaWxlUGF0aCIsImZpbGVuYW1lIiwiY2FwdHVyZVRvVXJpIiwiVVJJIiwicmVxdWVzdFBlcm1pc3Npb24iLCJzZXJpYWwiLCJ3cml0ZUhleCIsIlVpbnQ4QXJyYXkiLCJyZWdpc3RlclJlYWRDYWxsYmFjayIsInNlbmQiLCJzbXMiLCJzb2NpYWxzaGFyaW5nIiwic2hhcmVXaXRoT3B0aW9ucyIsInNoYXJlVmlhVHdpdHRlciIsInNoYXJlVmlhV2hhdHNBcHAiLCJzaGFyZVZpYUZhY2Vib29rIiwic2hhcmVWaWFGYWNlYm9va1dpdGhQYXN0ZU1lc3NhZ2VIaW50Iiwic2hhcmVWaWFTTVMiLCJzaGFyZVZpYUVtYWlsIiwic2hhcmVWaWEiLCJjYW5TaGFyZVZpYUVtYWlsIiwiY2FuU2hhcmVWaWEiLCJzcGlubmVyRGlhbG9nIiwic3BsYXNoc2NyZWVuIiwib3BlbkRCIiwiaXNTdHJpbmciLCJiZ1R5cGUiLCJzcWxpdGVQbHVnaW4iLCJvcGVuRGF0YWJhc2UiLCJleGVjdXRlIiwidHJhbnNhY3Rpb24iLCJleGVjdXRlU3FsIiwiaW5zZXJ0Q29sbGVjdGlvbiIsInNsaWNlIiwic3BsaWNlIiwibmVzdGVkRXhlY3V0ZSIsImRlbGV0ZURCIiwiZGVsZXRlRGF0YWJhc2UiLCJvdmVybGF5c1dlYlZpZXciLCJTVFlMRVMiLCJERUZBVUxUIiwiTElHSFRfQ09OVEVOVCIsIkJMQUNLX1RSQU5TTFVDRU5UIiwiQkxBQ0tfT1BBUVVFIiwic3R5bGUiLCJzdHlsZUxpZ2h0Q29udGVudCIsInN0eWxlQmxhY2tUcmFuc2x1Y2VudCIsInN0eWxlQmxhY2tPcGFxdWUiLCJzdHlsZUNvbG9yIiwiYmFja2dyb3VuZENvbG9yQnlOYW1lIiwic3R5bGVIZXgiLCJiYWNrZ3JvdW5kQ29sb3JCeUhleFN0cmluZyIsInNob3dTaG9ydFRvcCIsInRvYXN0Iiwic2hvd1Nob3J0Q2VudGVyIiwic2hvd1Nob3J0Qm90dG9tIiwic2hvd0xvbmdUb3AiLCJzaG93TG9uZ0NlbnRlciIsInNob3dMb25nQm90dG9tIiwic2hvd1dpdGhPcHRpb25zIiwiY2hlY2tTdXBwb3J0IiwidG91Y2hpZCIsImF1dGhlbnRpY2F0ZSIsInNwZWFrIiwiVFRTIiwidmlicmF0ZSIsInZpYnJhdGVXaXRoUGF0dGVybiIsImNhbmNlbFZpYnJhdGlvbiIsInNldExpbWl0IiwibGltaXQiLCJzZXRNYXhEdXJhdGlvbiIsInNldEhpZ2hRdWFsaXR5IiwiaGlnaHF1YWxpdHkiLCJ1c2VGcm9udENhbWVyYSIsImZyb250Y2FtZXJhIiwic2V0UG9ydHJhaXRPdmVybGF5IiwicG9ydHJhaXRPdmVybGF5Iiwic2V0TGFuZHNjYXBlT3ZlcmxheSIsImxhbmRzY2FwZU92ZXJsYXkiLCJzZXRPdmVybGF5VGV4dCIsIm92ZXJsYXlUZXh0IiwidmlkZW9jYXB0dXJlcGx1cyIsInVuemlwIiwiJHNjb3BlIiwidXNlclNlcnZpY2UiLCIkc3RhdGUiLCJnb2JhY2siLCJoaXN0b3J5IiwiZ28iLCJ1c2VyIiwiZ2V0VXNlckluZm8iLCJzdWIiLCJzdWJtaXRDaGlsZCIsImNoaWxkIiwidXNlcl9ob3VzZWhvbGQiLCJhZGRDaGlsZCIsInJlcyIsImNob3JlU2VydmljZSIsImN1cnJlbnRVc2VyIiwiZ2V0Q2hpbGRyZW4iLCJjaGlsZHMiLCJkYXRhIiwidmFsdWVzIiwiY2hvcmUiLCJjaG9yZV9kYWlseSIsImNob3JlX3dlZWtseSIsImNob3JlX21vbnRobHkiLCJzdWJtaXRDaG9yZSIsInVzZXJfaG91c2Vob2xkX2ZrIiwiJGNvcmRvdmFDYW1lcmEiLCIkY29yZG92YVBsdWdpbiIsInNvbWVGdW5jdGlvbiIsInRha2VQaWN0dXJlIiwib3B0aW9ucyIsImRlc3RpbmF0aW9uVHlwZSIsIkNhbWVyYSIsIkRlc3RpbmF0aW9uVHlwZSIsIkRBVEFfVVJMIiwic291cmNlVHlwZSIsIlBpY3R1cmVTb3VyY2VUeXBlIiwiQ0FNRVJBIiwiYWxsb3dFZGl0IiwiZW5jb2RpbmdUeXBlIiwiRW5jb2RpbmdUeXBlIiwiSlBFRyIsInRhcmdldFdpZHRoIiwidGFyZ2V0SGVpZ2h0IiwicG9wb3Zlck9wdGlvbnMiLCJDYW1lcmFQb3BvdmVyT3B0aW9ucyIsInNhdmVUb1Bob3RvQWxidW0iLCJjb3JyZWN0T3JpZW50YXRpb24iLCJpbWFnZURhdGEiLCJpbWdVUkkiLCJlcnIiLCJ0aGVtZSIsInNldFRoZW1lIiwidGhlbWVJbWFnZSIsIiRpb25pY01vZGFsIiwiJGF1dGgiLCJ1c2VyVG9rZW4iLCJnZXRQYXlsb2FkIiwiZnJvbVRlbXBsYXRlVXJsIiwiaWQiLCJzY29wZSIsImJhY2tkcm9wQ2xpY2tUb0Nsb3NlIiwiYW5pbWF0aW9uIiwibW9kYWwiLCJvTW9kYWwxIiwib3Blbk1vZGFsIiwiaW5kZXgiLCJvTW9kYWwyIiwiY2xvc2VNb2RhbCIsIiRvbiIsInVzZXJfdGhlbWUiLCJjaG9pY2UiLCJsb2dpblNlcnZpY2UiLCJsb2dpbkNoaWxkIiwidXNlckxvZ2luIiwicmVzcG9uc2UiLCJzZXRUb2tlbiIsIiR3aW5kb3ciLCJzdWJtaXRCYW5uZXIiLCJiYW5uZXIiLCJiYW5uZXJJbmZvIiwidXNlcl9iYW5uZXJfaW1hZ2UiLCJwb3N0YmFubmVyIiwidmFsdWUiLCJyZWxvYWQiLCJob3VzZWhvbGQiLCJnZXRiYW5uZXIiLCJnZXRXZWF0aGVyIiwid2VhdGhlciIsInNob3djaGlsZCIsIm1ha2VVc2VyIiwibmV3VXNlciIsInJldmVhbGVyIiwib01vZGFsMyIsIm9Nb2RhbDQiLCJvTW9kYWw1IiwiJGh0dHAiLCIkcSIsIm1ldGhvZCIsImNyZWF0ZUNob3JlIiwiSlNPTiIsInN0cmluZ2lmeSIsInVzZXJJZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUFBLFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCLENBQUMsT0FBRCxFQUFVLFlBQVYsQ0FBeEIsRUFDQ0MsTUFERCxDQUNRLFVBQVNDLGNBQVQsRUFBeUJDLGtCQUF6QixFQUE2Q0MsYUFBN0MsRUFBMkQ7QUFDakVELHFCQUFtQkUsU0FBbkIsQ0FBNkIsYUFBN0I7QUFDQUgsaUJBQ0NJLEtBREQsQ0FDTyxVQURQLEVBQ2tCO0FBQ2hCQyxTQUFJLFdBRFk7QUFFaEJDLGlCQUFhLDJCQUZHO0FBR2hCQyxnQkFBWTtBQUhJLEdBRGxCLEVBTUNILEtBTkQsQ0FNTyxhQU5QLEVBTXFCO0FBQ25CQyxTQUFJLGNBRGU7QUFFbkJDLGlCQUFhLDhCQUZNO0FBR25CQyxnQkFBWTtBQUhPLEdBTnJCLEVBV0NILEtBWEQsQ0FXTyxXQVhQLEVBV21CO0FBQ2pCQyxTQUFJLGdCQURhO0FBRWpCQyxpQkFBYSw0QkFGSTtBQUdqQkMsZ0JBQVk7QUFISyxHQVhuQixFQWdCQ0gsS0FoQkQsQ0FnQk8sU0FoQlAsRUFnQmlCO0FBQ2ZDLFNBQUksVUFEVztBQUVmQyxpQkFBYSwwQkFGRTtBQUdmQyxnQkFBWTtBQUhHLEdBaEJqQixFQXFCQ0gsS0FyQkQsQ0FxQk8sTUFyQlAsRUFxQmM7QUFDWkMsU0FBSSxPQURRO0FBRVpDLGlCQUFhLHVCQUZEO0FBR1pDLGdCQUFZO0FBSEEsR0FyQmQsRUEwQkNILEtBMUJELENBMEJPLE9BMUJQLEVBMEJlO0FBQ2JDLFNBQUksUUFEUztBQUViQyxpQkFBYSx3QkFGQTtBQUdiQyxnQkFBWTtBQUhDLEdBMUJmLEVBK0JDSCxLQS9CRCxDQStCTyxXQS9CUCxFQStCbUI7QUFDakJDLFNBQUksWUFEYTtBQUVqQkMsaUJB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ZXNDb250ZW50IjpbIi8vIElvbmljIFN0YXJ0ZXIgQXBwXG5cbi8vIGFuZ3VsYXIubW9kdWxlIGlzIGEgZ2xvYmFsIHBsYWNlIGZvciBjcmVhdGluZywgcmVnaXN0ZXJpbmcgYW5kIHJldHJpZXZpbmcgQW5ndWxhciBtb2R1bGVzXG4vLyAnc3RhcnRlcicgaXMgdGhlIG5hbWUgb2YgdGhpcyBhbmd1bGFyIG1vZHVsZSBleGFtcGxlIChhbHNvIHNldCBpbiBhIDxib2R5PiBhdHRyaWJ1dGUgaW4gaW5kZXguaHRtbClcbi8vIHRoZSAybmQgcGFyYW1ldGVyIGlzIGFuIGFycmF5IG9mICdyZXF1aXJlcydcblxuYW5ndWxhci5tb2R1bGUoJ2Nob3JlJywgWydpb25pYycsICdzYXRlbGxpemVyJ10pXG4uY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRhdXRoUHJvdmlkZXIpe1xuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKFwiL2NoaWxkL2hvbWVcIik7XG4gICRzdGF0ZVByb3ZpZGVyXG4gIC5zdGF0ZSgnYWRkQ2hpbGQnLHtcbiAgICB1cmw6XCIvYWRkQ2hpbGRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9hZGRDaGlsZC5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJhZGRDaGlsZEN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2Fzc2lnbkNob3JlJyx7XG4gICAgdXJsOlwiL2Fzc2lnbkNob3JlXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvYXNzaWduQ2hvcmUuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiYXNzaWduQ2hvcmVDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdlZGl0Q2hpbGQnLHtcbiAgICB1cmw6XCIvZWRpdENoaWxkLzppZFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2VkaXRDaGlsZC5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJlZGl0Q2hpbGRDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdoaXN0b3J5Jyx7XG4gICAgdXJsOlwiL2hpc3RvcnlcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9oaXN0b3J5Lmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImhpc3RvcnlDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdob21lJyx7XG4gICAgdXJsOlwiL2hvbWVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9ob21lLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImhvbWVDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdsb2dpbicse1xuICAgIHVybDpcIi9sb2dpblwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL0xvZ2luLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImxvZ2luQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnbWFrZUNob3JlJyx7XG4gICAgdXJsOlwiL21ha2VDaG9yZVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL21ha2VDaG9yZS5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJtYWtlQ2hvcmVDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdzZXRSZXdhcmRzJyx7XG4gICAgdXJsOlwiL3NldFJld2FyZHMvOmlkXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvc2V0UmV3YXJkcy5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJzZXRSZXdhcmRzQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnc2V0dGluZ3MnLHtcbiAgICB1cmw6XCIvc2V0dGluZ3NcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9zZXR0aW5ncy5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJzZXR0aW5nc0N0cmxcIlxuICB9KVxuICAuc3RhdGUoJ3RyYWNrZXInLHtcbiAgICB1cmw6XCIvdHJhY2tlci86aWRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy90cmFja2VyLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcInRyYWNrZXJDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCd1c2VySW5mbycse1xuICAgIHVybDpcIi91c2VySW5mb1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL3VzZXJJbmZvLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcInVzZXJJbmZvQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnY2hpbGRCYW5rJyx7XG4gICAgdXJsOlwiL2NoaWxkL2JhbmtcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9jaGlsZEJhbmsuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRCYW5rQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnY2hpbGRIb21lJyx7XG4gICAgdXJsOlwiL2NoaWxkL2hvbWVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9jaGlsZEhvbWUuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRIb21lQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnY2hpbGRMb2dpbicse1xuICAgIHVybDpcIi9jaGlsZC9sb2dpblwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2NoaWxkTG9naW4uaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRMb2dpbkN0cmxcIlxuICB9KVxuXG4gICRhdXRoUHJvdmlkZXIuZmFjZWJvb2soe1xuICAgIGNsaWVudElkOiAnMzMyMjcyMDU3MTMyNjgxJ1xuICB9KTtcblxuICAvLyBPcHRpb25hbDogRm9yIGNsaWVudC1zaWRlIHVzZSAoSW1wbGljaXQgR3JhbnQpLCBzZXQgcmVzcG9uc2VUeXBlIHRvICd0b2tlbicgKGRlZmF1bHQ6ICdjb2RlJylcbiAgJGF1dGhQcm92aWRlci5mYWNlYm9vayh7XG4gICAgY2xpZW50SWQ6ICczMzIyNzIwNTcxMzI2ODEnLFxuICAgIHJlc3BvbnNlVHlwZTogJ3Rva2VuJ1xuICB9KTtcblxuICAkYXV0aFByb3ZpZGVyLmdvb2dsZSh7XG4gICAgY2xpZW50SWQ6ICcyNzUzNTI5NjA5NDYtNXJjYW4zcWtobHNjN201MGhldjVkbjJlMmNhZTltYnAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20nLFxuICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODEwMC8jL2xvZ2luLydcbiAgfSk7XG59KVxuXG5cblxuLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xuICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICBpZih3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuXG4gICAgICAvLyBEb24ndCByZW1vdmUgdGhpcyBsaW5lIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuIEl0IHN0b3BzIHRoZSB2aWV3cG9ydFxuICAgICAgLy8gZnJvbSBzbmFwcGluZyB3aGVuIHRleHQgaW5wdXRzIGFyZSBmb2N1c2VkLiBJb25pYyBoYW5kbGVzIHRoaXMgaW50ZXJuYWxseSBmb3JcbiAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgfVxuICAgIGlmKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcbiAgICB9XG4gIH0pO1xufSlcbiIsIi8qIVxuICogbmdDb3Jkb3ZhXG4gKiB2MC4xLjI3LWFscGhhXG4gKiBDb3B5cmlnaHQgMjAxNSBEcmlmdHkgQ28uIGh0dHA6Ly9kcmlmdHkuY29tL1xuICogU2VlIExJQ0VOU0UgaW4gdGhpcyByZXBvc2l0b3J5IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uXG4gKi9cbiFmdW5jdGlvbigpe2FuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhXCIsW1wibmdDb3Jkb3ZhLnBsdWdpbnNcIl0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuM2R0b3VjaFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmEzRFRvdWNoXCIsW1wiJHFcIixmdW5jdGlvbihlKXt2YXIgbj1bXSxyPXt9LG89ZnVuY3Rpb24oZSl7cmV0dXJuIGZ1bmN0aW9uKG4pe2Zvcih2YXIgciBpbiBlKW4udHlwZT09PXImJmVbcl0oKX19O3JldHVybntpc0F2YWlsYWJsZTpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gd2luZG93LmNvcmRvdmE/d2luZG93LlRocmVlRGVlVG91Y2g/d2luZG93LlRocmVlRGVlVG91Y2guaXNBdmFpbGFibGUoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pOm4ucmVqZWN0KFwiQ291bGQgbm90IGZpbmQgM0QgdG91Y2ggcGx1Z2luXCIpOm4ucmVqZWN0KFwiTm90IHN1cHBvcnRlZCBpbiBicm93c2VyXCIpLG4ucHJvbWlzZX0sYWRkUXVpY2tBY3Rpb246ZnVuY3Rpb24odCxpLGEsYyx1LHMpe3ZhciBsPWUuZGVmZXIoKSxmPXt0eXBlOnQsdGl0bGU6aSxzdWJ0aXRsZTp1fTtyZXR1cm4gYSYmKGYuaWNvblR5cGU9YSksYyYmKGYuaWNvblRlbXBsYXRlPWMpLHRoaXMuaXNBdmFpbGFibGUoKS50aGVuKGZ1bmN0aW9uKCl7bi5wdXNoKGYpLHJbdF09cyx3aW5kb3cuVGhyZWVEZWVUb3VjaC5jb25maWd1cmVRdWlja0FjdGlvbnMobiksd2luZG93LlRocmVlRGVlVG91Y2gub25Ib21lSWNvblByZXNzZWQ9byhyKSxsLnJlc29sdmUobil9LGZ1bmN0aW9uKGUpe2wucmVqZWN0KGUpfSksbC5wcm9taXNlfSxhZGRRdWlja0FjdGlvbkhhbmRsZXI6ZnVuY3Rpb24obix0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIHRoaXMuaXNBdmFpbGFibGUoKS50aGVuKGZ1bmN0aW9uKCl7cltuXT10LHdpbmRvdy5UaHJlZURlZVRvdWNoLm9uSG9tZUljb25QcmVzc2VkPW8ociksaS5yZXNvbHZlKCEwKX0sZnVuY3Rpb24oZSl7aS5yZWplY3QoZSl9KSxpLnByb21pc2V9LGVuYWJsZUxpbmtQcmV2aWV3OmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiB0aGlzLmlzQXZhaWxhYmxlKCkudGhlbihmdW5jdGlvbigpe3dpbmRvdy5UaHJlZURlZVRvdWNoLmVuYWJsZUxpbmtQcmV2aWV3KCksbi5yZXNvbHZlKCEwKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9LGFkZEZvcmNlVG91Y2hIYW5kbGVyOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gdGhpcy5pc0F2YWlsYWJsZSgpLnRoZW4oZnVuY3Rpb24oKXt3aW5kb3cuVGhyZWVEZWVUb3VjaC53YXRjaEZvcmNlVG91Y2hlcyhuKSxyLnJlc29sdmUoITApfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuYWN0aW9uU2hlZXRcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQWN0aW9uU2hlZXRcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3Nob3c6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuYWN0aW9uc2hlZXQuc2hvdyhyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0pLG8ucHJvbWlzZX0saGlkZTpmdW5jdGlvbigpe3JldHVybiBuLnBsdWdpbnMuYWN0aW9uc2hlZXQuaGlkZSgpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5hZE1vYlwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFBZE1vYlwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57Y3JlYXRlQmFubmVyVmlldzpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5BZE1vYi5jcmVhdGVCYW5uZXJWaWV3KHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxjcmVhdGVJbnRlcnN0aXRpYWxWaWV3OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLkFkTW9iLmNyZWF0ZUludGVyc3RpdGlhbFZpZXcocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHJlcXVlc3RBZDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5BZE1vYi5yZXF1ZXN0QWQocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dBZDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5BZE1vYi5zaG93QWQocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHJlcXVlc3RJbnRlcnN0aXRpYWxBZDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5BZE1vYi5yZXF1ZXN0SW50ZXJzdGl0aWFsQWQocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmFwcEF2YWlsYWJpbGl0eVwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFBcHBBdmFpbGFiaWxpdHlcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntjaGVjazpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGFwcEF2YWlsYWJpbGl0eS5jaGVjayhuLGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmFwcFJhdGVcIixbXSkucHJvdmlkZXIoXCIkY29yZG92YUFwcFJhdGVcIixbZnVuY3Rpb24oKXt0aGlzLnNldFByZWZlcmVuY2VzPWZ1bmN0aW9uKGUpe2UmJmFuZ3VsYXIuaXNPYmplY3QoZSkmJihBcHBSYXRlLnByZWZlcmVuY2VzLnVzZUxhbmd1YWdlPWUubGFuZ3VhZ2V8fG51bGwsQXBwUmF0ZS5wcmVmZXJlbmNlcy5kaXNwbGF5QXBwTmFtZT1lLmFwcE5hbWV8fFwiXCIsQXBwUmF0ZS5wcmVmZXJlbmNlcy5wcm9tcHRBZ2FpbkZvckVhY2hOZXdWZXJzaW9uPWUucHJvbXB0Rm9yTmV3VmVyc2lvbnx8ITAsQXBwUmF0ZS5wcmVmZXJlbmNlcy5vcGVuU3RvcmVJbkFwcD1lLm9wZW5TdG9yZUluQXBwfHwhMSxBcHBSYXRlLnByZWZlcmVuY2VzLnVzZXNVbnRpbFByb21wdD1lLnVzZXNVbnRpbFByb21wdHx8MyxBcHBSYXRlLnByZWZlcmVuY2VzLnVzZUN1c3RvbVJhdGVEaWFsb2c9ZS51c2VDdXN0b21SYXRlRGlhbG9nfHwhMSxBcHBSYXRlLnByZWZlcmVuY2VzLnN0b3JlQXBwVVJMLmlvcz1lLmlvc1VSTHx8bnVsbCxBcHBSYXRlLnByZWZlcmVuY2VzLnN0b3JlQXBwVVJMLmFuZHJvaWQ9ZS5hbmRyb2lkVVJMfHxudWxsLEFwcFJhdGUucHJlZmVyZW5jZXMuc3RvcmVBcHBVUkwuYmxhY2tiZXJyeT1lLmJsYWNrYmVycnlVUkx8fG51bGwsQXBwUmF0ZS5wcmVmZXJlbmNlcy5zdG9yZUFwcFVSTC53aW5kb3dzOD1lLndpbmRvd3NVUkx8fG51bGwpfSx0aGlzLnNldEN1c3RvbUxvY2FsZT1mdW5jdGlvbihlKXt2YXIgbj17dGl0bGU6XCJSYXRlICVAXCIsbWVzc2FnZTpcIklmIHlvdSBlbmpveSB1c2luZyAlQCwgd291bGQgeW91IG1pbmQgdGFraW5nIGEgbW9tZW50IHRvIHJhdGUgaXQ/IEl0IHdvbuKAmXQgdGFrZSBtb3JlIHRoYW4gYSBtaW51dGUuIFRoYW5rcyBmb3IgeW91ciBzdXBwb3J0IVwiLGNhbmNlbEJ1dHRvbkxhYmVsOlwiTm8sIFRoYW5rc1wiLGxhdGVyQnV0dG9uTGFiZWw6XCJSZW1pbmQgTWUgTGF0ZXJcIixyYXRlQnV0dG9uTGFiZWw6XCJSYXRlIEl0IE5vd1wifTtuPWFuZ3VsYXIuZXh0ZW5kKG4sZSksQXBwUmF0ZS5wcmVmZXJlbmNlcy5jdXN0b21Mb2NhbGU9bn0sdGhpcy4kZ2V0PVtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue3Byb21wdEZvclJhdGluZzpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCksbz1BcHBSYXRlLnByb21wdEZvclJhdGluZyhuKTtyZXR1cm4gci5yZXNvbHZlKG8pLHIucHJvbWlzZX0sbmF2aWdhdGVUb0FwcFN0b3JlOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpLHI9QXBwUmF0ZS5uYXZpZ2F0ZVRvQXBwU3RvcmUoKTtyZXR1cm4gbi5yZXNvbHZlKHIpLG4ucHJvbWlzZX0sb25CdXR0b25DbGlja2VkOmZ1bmN0aW9uKGUpe0FwcFJhdGUucHJlZmVyZW5jZXMuY2FsbGJhY2tzLm9uQnV0dG9uQ2xpY2tlZD1lLmJpbmQodGhpcyl9LG9uUmF0ZURpYWxvZ1Nob3c6ZnVuY3Rpb24oZSl7QXBwUmF0ZS5wcmVmZXJlbmNlcy5jYWxsYmFja3Mub25SYXRlRGlhbG9nU2hvdz1lLmJpbmQodGhpcyl9fX1dfV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuYXBwVmVyc2lvblwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFBcHBWZXJzaW9uXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57Z2V0QXBwTmFtZTpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5nZXRBcHBWZXJzaW9uLmdldEFwcE5hbWUoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSksbi5wcm9taXNlfSxnZXRQYWNrYWdlTmFtZTpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5nZXRBcHBWZXJzaW9uLmdldFBhY2thZ2VOYW1lKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0pLG4ucHJvbWlzZX0sZ2V0VmVyc2lvbk51bWJlcjpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5nZXRBcHBWZXJzaW9uLmdldFZlcnNpb25OdW1iZXIoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSksbi5wcm9taXNlfSxnZXRWZXJzaW9uQ29kZTpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5nZXRBcHBWZXJzaW9uLmdldFZlcnNpb25Db2RlKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0pLG4ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuYmFja2dyb3VuZEdlb2xvY2F0aW9uXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUJhY2tncm91bmRHZW9sb2NhdGlvblwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57aW5pdDpmdW5jdGlvbigpe24ubmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihmdW5jdGlvbihlKXtyZXR1cm4gZX0pfSxjb25maWd1cmU6ZnVuY3Rpb24ocil7dGhpcy5pbml0KCk7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuYmFja2dyb3VuZEdlb0xvY2F0aW9uLmNvbmZpZ3VyZShmdW5jdGlvbihlKXtvLm5vdGlmeShlKSxuLnBsdWdpbnMuYmFja2dyb3VuZEdlb0xvY2F0aW9uLmZpbmlzaCgpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0sciksdGhpcy5zdGFydCgpLG8ucHJvbWlzZX0sc3RhcnQ6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5iYWNrZ3JvdW5kR2VvTG9jYXRpb24uc3RhcnQoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sc3RvcDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmJhY2tncm91bmRHZW9Mb2NhdGlvbi5zdG9wKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmJhZGdlXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUJhZGdlXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57aGFzUGVybWlzc2lvbjpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5iYWRnZS5oYXNQZXJtaXNzaW9uKGZ1bmN0aW9uKGUpe2U/bi5yZXNvbHZlKCEwKTpuLnJlamVjdChcIllvdSBkbyBub3QgaGF2ZSBwZXJtaXNzaW9uXCIpfSksbi5wcm9taXNlfSxwcm9tcHRGb3JQZXJtaXNzaW9uOmZ1bmN0aW9uKCl7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24uYmFkZ2UucHJvbXB0Rm9yUGVybWlzc2lvbigpfSxzZXQ6ZnVuY3Rpb24obixyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5iYWRnZS5oYXNQZXJtaXNzaW9uKGZ1bmN0aW9uKGUpe2U/dC5yZXNvbHZlKGNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24uYmFkZ2Uuc2V0KG4scixvKSk6dC5yZWplY3QoXCJZb3UgZG8gbm90IGhhdmUgcGVybWlzc2lvbiB0byBzZXQgQmFkZ2VcIil9KSx0LnByb21pc2V9LGdldDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5iYWRnZS5oYXNQZXJtaXNzaW9uKGZ1bmN0aW9uKGUpe2U/Y29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5iYWRnZS5nZXQoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSk6bi5yZWplY3QoXCJZb3UgZG8gbm90IGhhdmUgcGVybWlzc2lvbiB0byBnZXQgQmFkZ2VcIil9KSxuLnByb21pc2V9LGNsZWFyOmZ1bmN0aW9uKG4scil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmJhZGdlLmhhc1Blcm1pc3Npb24oZnVuY3Rpb24oZSl7ZT9vLnJlc29sdmUoY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5iYWRnZS5jbGVhcihuLHIpKTpvLnJlamVjdChcIllvdSBkbyBub3QgaGF2ZSBwZXJtaXNzaW9uIHRvIGNsZWFyIEJhZGdlXCIpfSksby5wcm9taXNlfSxpbmNyZWFzZTpmdW5jdGlvbihuLHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiB0aGlzLmhhc1Blcm1pc3Npb24oKS50aGVuKGZ1bmN0aW9uKCl7dC5yZXNvbHZlKGNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24uYmFkZ2UuaW5jcmVhc2UobixyLG8pKX0sZnVuY3Rpb24oKXt0LnJlamVjdChcIllvdSBkbyBub3QgaGF2ZSBwZXJtaXNzaW9uIHRvIGluY3JlYXNlIEJhZGdlXCIpfSksdC5wcm9taXNlfSxkZWNyZWFzZTpmdW5jdGlvbihuLHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiB0aGlzLmhhc1Blcm1pc3Npb24oKS50aGVuKGZ1bmN0aW9uKCl7dC5yZXNvbHZlKGNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24uYmFkZ2UuZGVjcmVhc2UobixyLG8pKX0sZnVuY3Rpb24oKXt0LnJlamVjdChcIllvdSBkbyBub3QgaGF2ZSBwZXJtaXNzaW9uIHRvIGRlY3JlYXNlIEJhZGdlXCIpfSksdC5wcm9taXNlfSxjb25maWd1cmU6ZnVuY3Rpb24oZSl7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24uYmFkZ2UuY29uZmlndXJlKGUpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5iYXJjb2RlU2Nhbm5lclwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFCYXJjb2RlU2Nhbm5lclwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue3NjYW46ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuYmFyY29kZVNjYW5uZXIuc2NhbihmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKSxyLnByb21pc2V9LGVuY29kZTpmdW5jdGlvbihuLHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbj1ufHxcIlRFWFRfVFlQRVwiLGNvcmRvdmEucGx1Z2lucy5iYXJjb2RlU2Nhbm5lci5lbmNvZGUobixyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmJhdHRlcnlTdGF0dXNcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQmF0dGVyeVN0YXR1c1wiLFtcIiRyb290U2NvcGVcIixcIiR3aW5kb3dcIixcIiR0aW1lb3V0XCIsZnVuY3Rpb24oZSxuLHIpe3ZhciBvPWZ1bmN0aW9uKG4pe3IoZnVuY3Rpb24oKXtlLiRicm9hZGNhc3QoXCIkY29yZG92YUJhdHRlcnlTdGF0dXM6c3RhdHVzXCIsbil9KX0sdD1mdW5jdGlvbihuKXtyKGZ1bmN0aW9uKCl7ZS4kYnJvYWRjYXN0KFwiJGNvcmRvdmFCYXR0ZXJ5U3RhdHVzOmNyaXRpY2FsXCIsbil9KX0saT1mdW5jdGlvbihuKXtyKGZ1bmN0aW9uKCl7ZS4kYnJvYWRjYXN0KFwiJGNvcmRvdmFCYXR0ZXJ5U3RhdHVzOmxvd1wiLG4pfSl9O3JldHVybiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZGV2aWNlcmVhZHlcIixmdW5jdGlvbigpe25hdmlnYXRvci5iYXR0ZXJ5JiYobi5hZGRFdmVudExpc3RlbmVyKFwiYmF0dGVyeXN0YXR1c1wiLG8sITEpLG4uYWRkRXZlbnRMaXN0ZW5lcihcImJhdHRlcnljcml0aWNhbFwiLHQsITEpLG4uYWRkRXZlbnRMaXN0ZW5lcihcImJhdHRlcnlsb3dcIixpLCExKSl9LCExKSwhMH1dKS5ydW4oW1wiJGluamVjdG9yXCIsZnVuY3Rpb24oZSl7ZS5nZXQoXCIkY29yZG92YUJhdHRlcnlTdGF0dXNcIil9XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5iZWFjb25cIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQmVhY29uXCIsW1wiJHdpbmRvd1wiLFwiJHJvb3RTY29wZVwiLFwiJHRpbWVvdXRcIixcIiRxXCIsZnVuY3Rpb24oZSxuLHIsbyl7dmFyIHQ9bnVsbCxpPW51bGwsYT1udWxsLGM9bnVsbCx1PW51bGwscz1udWxsLGw9bnVsbCxmPW51bGw7cmV0dXJuIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkZXZpY2VyZWFkeVwiLGZ1bmN0aW9uKCl7aWYoZS5jb3Jkb3ZhJiZlLmNvcmRvdmEucGx1Z2lucyYmZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyKXt2YXIgbz1uZXcgZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLkRlbGVnYXRlO28uZGlkRGV0ZXJtaW5lU3RhdGVGb3JSZWdpb249ZnVuY3Rpb24oZSl7cihmdW5jdGlvbigpe24uJGJyb2FkY2FzdChcIiRjb3Jkb3ZhQmVhY29uOmRpZERldGVybWluZVN0YXRlRm9yUmVnaW9uXCIsZSl9KSx0JiZ0KGUpfSxvLmRpZFN0YXJ0TW9uaXRvcmluZ0ZvclJlZ2lvbj1mdW5jdGlvbihlKXtyKGZ1bmN0aW9uKCl7bi4kYnJvYWRjYXN0KFwiJGNvcmRvdmFCZWFjb246ZGlkU3RhcnRNb25pdG9yaW5nRm9yUmVnaW9uXCIsZSl9KSxpJiZpKGUpfSxvLmRpZEV4aXRSZWdpb249ZnVuY3Rpb24oZSl7cihmdW5jdGlvbigpe24uJGJyb2FkY2FzdChcIiRjb3Jkb3ZhQmVhY29uOmRpZEV4aXRSZWdpb25cIixlKX0pLGEmJmEoZSl9LG8uZGlkRW50ZXJSZWdpb249ZnVuY3Rpb24oZSl7cihmdW5jdGlvbigpe24uJGJyb2FkY2FzdChcIiRjb3Jkb3ZhQmVhY29uOmRpZEVudGVyUmVnaW9uXCIsZSl9KSxjJiZjKGUpfSxvLmRpZFJhbmdlQmVhY29uc0luUmVnaW9uPWZ1bmN0aW9uKGUpe3IoZnVuY3Rpb24oKXtuLiRicm9hZGNhc3QoXCIkY29yZG92YUJlYWNvbjpkaWRSYW5nZUJlYWNvbnNJblJlZ2lvblwiLGUpfSksdSYmdShlKX0sby5wZXJpcGhlcmFsTWFuYWdlckRpZFN0YXJ0QWR2ZXJ0aXNpbmc9ZnVuY3Rpb24oZSl7cihmdW5jdGlvbigpe24uJGJyb2FkY2FzdChcIiRjb3Jkb3ZhQmVhY29uOnBlcmlwaGVyYWxNYW5hZ2VyRGlkU3RhcnRBZHZlcnRpc2luZ1wiLGUpfSkscyYmcyhlKX0sby5wZXJpcGhlcmFsTWFuYWdlckRpZFVwZGF0ZVN0YXRlPWZ1bmN0aW9uKGUpe3IoZnVuY3Rpb24oKXtuLiRicm9hZGNhc3QoXCIkY29yZG92YUJlYWNvbjpwZXJpcGhlcmFsTWFuYWdlckRpZFVwZGF0ZVN0YXRlXCIsZSl9KSxsJiZsKGUpfSxvLmRpZENoYW5nZUF1dGhvcml6YXRpb25TdGF0dXM9ZnVuY3Rpb24oZSl7cihmdW5jdGlvbigpe24uJGJyb2FkY2FzdChcIiRjb3Jkb3ZhQmVhY29uOmRpZENoYW5nZUF1dGhvcml6YXRpb25TdGF0dXNcIixlKX0pLGYmJmYoZSl9LGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5zZXREZWxlZ2F0ZShvKX19LCExKSx7c2V0Q2FsbGJhY2tEaWREZXRlcm1pbmVTdGF0ZUZvclJlZ2lvbjpmdW5jdGlvbihlKXt0PWV9LHNldENhbGxiYWNrRGlkU3RhcnRNb25pdG9yaW5nRm9yUmVnaW9uOmZ1bmN0aW9uKGUpe2k9ZX0sc2V0Q2FsbGJhY2tEaWRFeGl0UmVnaW9uOmZ1bmN0aW9uKGUpe2E9ZX0sc2V0Q2FsbGJhY2tEaWRFbnRlclJlZ2lvbjpmdW5jdGlvbihlKXtjPWV9LHNldENhbGxiYWNrRGlkUmFuZ2VCZWFjb25zSW5SZWdpb246ZnVuY3Rpb24oZSl7dT1lfSxzZXRDYWxsYmFja1BlcmlwaGVyYWxNYW5hZ2VyRGlkU3RhcnRBZHZlcnRpc2luZzpmdW5jdGlvbihlKXtzPWV9LHNldENhbGxiYWNrUGVyaXBoZXJhbE1hbmFnZXJEaWRVcGRhdGVTdGF0ZTpmdW5jdGlvbihlKXtsPWV9LHNldENhbGxiYWNrRGlkQ2hhbmdlQXV0aG9yaXphdGlvblN0YXR1czpmdW5jdGlvbihlKXtmPWV9LGNyZWF0ZUJlYWNvblJlZ2lvbjpmdW5jdGlvbihuLHIsbyx0LGkpe3JldHVybiBvPW98fHZvaWQgMCx0PXR8fHZvaWQgMCxuZXcgZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLkJlYWNvblJlZ2lvbihuLHIsbyx0LGkpfSxpc0JsdWV0b290aEVuYWJsZWQ6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5pc0JsdWV0b290aEVuYWJsZWQoKSl9LGVuYWJsZUJsdWV0b290aDpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmVuYWJsZUJsdWV0b290aCgpKX0sZGlzYWJsZUJsdWV0b290aDpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmRpc2FibGVCbHVldG9vdGgoKSl9LHN0YXJ0TW9uaXRvcmluZ0ZvclJlZ2lvbjpmdW5jdGlvbihuKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5zdGFydE1vbml0b3JpbmdGb3JSZWdpb24obikpfSxzdG9wTW9uaXRvcmluZ0ZvclJlZ2lvbjpmdW5jdGlvbihuKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5zdG9wTW9uaXRvcmluZ0ZvclJlZ2lvbihuKSl9LHJlcXVlc3RTdGF0ZUZvclJlZ2lvbjpmdW5jdGlvbihuKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5yZXF1ZXN0U3RhdGVGb3JSZWdpb24obikpfSxzdGFydFJhbmdpbmdCZWFjb25zSW5SZWdpb246ZnVuY3Rpb24obil7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuc3RhcnRSYW5naW5nQmVhY29uc0luUmVnaW9uKG4pKX0sc3RvcFJhbmdpbmdCZWFjb25zSW5SZWdpb246ZnVuY3Rpb24obil7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuc3RvcFJhbmdpbmdCZWFjb25zSW5SZWdpb24obikpfSxnZXRBdXRob3JpemF0aW9uU3RhdHVzOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuZ2V0QXV0aG9yaXphdGlvblN0YXR1cygpKX0scmVxdWVzdFdoZW5JblVzZUF1dGhvcml6YXRpb246ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5yZXF1ZXN0V2hlbkluVXNlQXV0aG9yaXphdGlvbigpKX0scmVxdWVzdEFsd2F5c0F1dGhvcml6YXRpb246ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5yZXF1ZXN0QWx3YXlzQXV0aG9yaXphdGlvbigpKX0sZ2V0TW9uaXRvcmVkUmVnaW9uczpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmdldE1vbml0b3JlZFJlZ2lvbnMoKSl9LGdldFJhbmdlZFJlZ2lvbnM6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5nZXRSYW5nZWRSZWdpb25zKCkpfSxpc1JhbmdpbmdBdmFpbGFibGU6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5pc1JhbmdpbmdBdmFpbGFibGUoKSl9LGlzTW9uaXRvcmluZ0F2YWlsYWJsZUZvckNsYXNzOmZ1bmN0aW9uKG4pe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmlzTW9uaXRvcmluZ0F2YWlsYWJsZUZvckNsYXNzKG4pKX0sc3RhcnRBZHZlcnRpc2luZzpmdW5jdGlvbihuLHIpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLnN0YXJ0QWR2ZXJ0aXNpbmcobixyKSl9LHN0b3BBZHZlcnRpc2luZzpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLnN0b3BBZHZlcnRpc2luZygpKX0saXNBZHZlcnRpc2luZ0F2YWlsYWJsZTpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmlzQWR2ZXJ0aXNpbmdBdmFpbGFibGUoKSl9LGlzQWR2ZXJ0aXNpbmc6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5pc0FkdmVydGlzaW5nKCkpfSxkaXNhYmxlRGVidWdMb2dzOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuZGlzYWJsZURlYnVnTG9ncygpKX0sZW5hYmxlRGVidWdOb3RpZmljYXRpb25zOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuZW5hYmxlRGVidWdOb3RpZmljYXRpb25zKCkpfSxkaXNhYmxlRGVidWdOb3RpZmljYXRpb25zOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuZGlzYWJsZURlYnVnTm90aWZpY2F0aW9ucygpKX0sZW5hYmxlRGVidWdMb2dzOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuZW5hYmxlRGVidWdMb2dzKCkpfSxhcHBlbmRUb0RldmljZUxvZzpmdW5jdGlvbihuKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5hcHBlbmRUb0RldmljZUxvZyhuKSl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmJsZVwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFCTEVcIixbXCIkcVwiLFwiJHRpbWVvdXRcIixcIiRsb2dcIixmdW5jdGlvbihlLG4scil7cmV0dXJue3NjYW46ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIGJsZS5zdGFydFNjYW4ocixmdW5jdGlvbihlKXt0Lm5vdGlmeShlKX0sZnVuY3Rpb24oZSl7dC5yZWplY3QoZSl9KSxuKGZ1bmN0aW9uKCl7YmxlLnN0b3BTY2FuKGZ1bmN0aW9uKCl7dC5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSl9LDFlMypvKSx0LnByb21pc2V9LHN0YXJ0U2NhbjpmdW5jdGlvbihlLG4scil7cmV0dXJuIGJsZS5zdGFydFNjYW4oZSxuLHIpfSxzdG9wU2NhbjpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gYmxlLnN0b3BTY2FuKGZ1bmN0aW9uKCl7bi5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxjb25uZWN0OmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gYmxlLmNvbm5lY3QobixmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxkaXNjb25uZWN0OmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gYmxlLmRpc2Nvbm5lY3QobixmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxyZWFkOmZ1bmN0aW9uKG4scixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIGJsZS5yZWFkKG4scixvLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7dC5yZWplY3QoZSl9KSx0LnByb21pc2V9LHdyaXRlOmZ1bmN0aW9uKG4scixvLHQpe3ZhciBpPWUuZGVmZXIoKTtyZXR1cm4gYmxlLndyaXRlKG4scixvLHQsZnVuY3Rpb24oZSl7aS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtpLnJlamVjdChlKX0pLGkucHJvbWlzZX0sd3JpdGVXaXRob3V0UmVzcG9uc2U6ZnVuY3Rpb24obixyLG8sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiBibGUud3JpdGVXaXRob3V0UmVzcG9uc2UobixyLG8sdCxmdW5jdGlvbihlKXtpLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2kucmVqZWN0KGUpfSksaS5wcm9taXNlfSx3cml0ZUNvbW1hbmQ6ZnVuY3Rpb24oZSxuLG8sdCl7cmV0dXJuIHIud2FybmluZyhcIndyaXRlQ29tbWFuZCBpcyBkZXByZWNhdGVkLCB1c2Ugd3JpdGVXaXRob3V0UmVzcG9uc2VcIiksdGhpcy53cml0ZVdpdGhvdXRSZXNwb25zZShlLG4sbyx0KX0sc3RhcnROb3RpZmljYXRpb246ZnVuY3Rpb24oZSxuLHIsbyx0KXtyZXR1cm4gYmxlLnN0YXJ0Tm90aWZpY2F0aW9uKGUsbixyLG8sdCl9LHN0b3BOb3RpZmljYXRpb246ZnVuY3Rpb24obixyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gYmxlLnN0b3BOb3RpZmljYXRpb24obixyLG8sZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0pLHQucHJvbWlzZX0saXNDb25uZWN0ZWQ6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBibGUuaXNDb25uZWN0ZWQobixmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxlbmFibGU6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGJsZS5lbmFibGUoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0saXNFbmFibGVkOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBibGUuaXNFbmFibGVkKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmJsdWV0b290aFNlcmlhbFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFCbHVldG9vdGhTZXJpYWxcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2Nvbm5lY3Q6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpLHQ9ZS5kZWZlcigpLGk9ITE7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLmNvbm5lY3QocixmdW5jdGlvbigpe2k9ITAsby5yZXNvbHZlKHQpfSxmdW5jdGlvbihlKXtpPT09ITEmJnQucmVqZWN0KGUpLG8ucmVqZWN0KGUpfSksby5wcm9taXNlfSxjb25uZWN0SW5zZWN1cmU6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5jb25uZWN0SW5zZWN1cmUocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sZGlzY29ubmVjdDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwuZGlzY29ubmVjdChmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sbGlzdDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwubGlzdChmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxkaXNjb3ZlclVucGFpcmVkOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5kaXNjb3ZlclVucGFpcmVkKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHNldERldmljZURpc2NvdmVyZWRMaXN0ZW5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwuc2V0RGV2aWNlRGlzY292ZXJlZExpc3RlbmVyKGZ1bmN0aW9uKGUpe3Iubm90aWZ5KGUpfSksci5wcm9taXNlfSxjbGVhckRldmljZURpc2NvdmVyZWRMaXN0ZW5lcjpmdW5jdGlvbigpe24uYmx1ZXRvb3RoU2VyaWFsLmNsZWFyRGV2aWNlRGlzY292ZXJlZExpc3RlbmVyKCl9LHNob3dCbHVldG9vdGhTZXR0aW5nczpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwuc2hvd0JsdWV0b290aFNldHRpbmdzKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxpc0VuYWJsZWQ6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLmlzRW5hYmxlZChmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LGVuYWJsZTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwuZW5hYmxlKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0saXNDb25uZWN0ZWQ6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLmlzQ29ubmVjdGVkKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0sYXZhaWxhYmxlOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5hdmFpbGFibGUoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0scmVhZDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwucmVhZChmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxyZWFkVW50aWw6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5yZWFkVW50aWwocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSx3cml0ZTpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLndyaXRlKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHN1YnNjcmliZTpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLnN1YnNjcmliZShyLGZ1bmN0aW9uKGUpe28ubm90aWZ5KGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sc3Vic2NyaWJlUmF3RGF0YTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwuc3Vic2NyaWJlUmF3RGF0YShmdW5jdGlvbihlKXtyLm5vdGlmeShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHVuc3Vic2NyaWJlOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC51bnN1YnNjcmliZShmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sdW5zdWJzY3JpYmVSYXdEYXRhOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC51bnN1YnNjcmliZVJhd0RhdGEoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LGNsZWFyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5jbGVhcihmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0scmVhZFJTU0k6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLnJlYWRSU1NJKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmJyaWdodG5lc3NcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQnJpZ2h0bmVzc1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57Z2V0OmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmNvcmRvdmE/bi5jb3Jkb3ZhLnBsdWdpbnMuYnJpZ2h0bmVzcy5nZXRCcmlnaHRuZXNzKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KTpyLnJlamVjdChcIk5vdCBzdXBwb3J0ZWQgd2l0aG91dCBjb3Jkb3ZhLmpzXCIpLHIucHJvbWlzZX0sc2V0OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5jb3Jkb3ZhP24uY29yZG92YS5wbHVnaW5zLmJyaWdodG5lc3Muc2V0QnJpZ2h0bmVzcyhyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KTpvLnJlamVjdChcIk5vdCBzdXBwb3J0ZWQgd2l0aG91dCBjb3Jkb3ZhLmpzXCIpLG8ucHJvbWlzZX0sc2V0S2VlcFNjcmVlbk9uOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5jb3Jkb3ZhP24uY29yZG92YS5wbHVnaW5zLmJyaWdodG5lc3Muc2V0S2VlcFNjcmVlbk9uKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pOm8ucmVqZWN0KFwiTm90IHN1cHBvcnRlZCB3aXRob3V0IGNvcmRvdmEuanNcIiksby5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5jYWxlbmRhclwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFDYWxlbmRhclwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57Y3JlYXRlQ2FsZW5kYXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpLHQ9bi5wbHVnaW5zLmNhbGVuZGFyLmdldENyZWF0ZUNhbGVuZGFyT3B0aW9ucygpO3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiByP3QuY2FsZW5kYXJOYW1lPXI6dD1hbmd1bGFyLmV4dGVuZCh0LHIpLG4ucGx1Z2lucy5jYWxlbmRhci5jcmVhdGVDYWxlbmRhcih0LGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGRlbGV0ZUNhbGVuZGFyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmNhbGVuZGFyLmRlbGV0ZUNhbGVuZGFyKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sY3JlYXRlRXZlbnQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpLHQ9e3RpdGxlOm51bGwsbG9jYXRpb246bnVsbCxub3RlczpudWxsLHN0YXJ0RGF0ZTpudWxsLGVuZERhdGU6bnVsbH07cmV0dXJuIHQ9YW5ndWxhci5leHRlbmQodCxyKSxuLnBsdWdpbnMuY2FsZW5kYXIuY3JlYXRlRXZlbnQodC50aXRsZSx0LmxvY2F0aW9uLHQubm90ZXMsbmV3IERhdGUodC5zdGFydERhdGUpLG5ldyBEYXRlKHQuZW5kRGF0ZSksZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sY3JlYXRlRXZlbnRXaXRoT3B0aW9uczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCksdD1bXSxpPXdpbmRvdy5wbHVnaW5zLmNhbGVuZGFyLmdldENhbGVuZGFyT3B0aW9ucygpLGE9e3RpdGxlOm51bGwsbG9jYXRpb246bnVsbCxub3RlczpudWxsLHN0YXJ0RGF0ZTpudWxsLGVuZERhdGU6bnVsbH07dD1PYmplY3Qua2V5cyhhKTtmb3IodmFyIGMgaW4gciktMT09PXQuaW5kZXhPZihjKT9pW2NdPXJbY106YVtjXT1yW2NdO3JldHVybiBuLnBsdWdpbnMuY2FsZW5kYXIuY3JlYXRlRXZlbnRXaXRoT3B0aW9ucyhhLnRpdGxlLGEubG9jYXRpb24sYS5ub3RlcyxuZXcgRGF0ZShhLnN0YXJ0RGF0ZSksbmV3IERhdGUoYS5lbmREYXRlKSxpLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGNyZWF0ZUV2ZW50SW50ZXJhY3RpdmVseTpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCksdD17dGl0bGU6bnVsbCxsb2NhdGlvbjpudWxsLG5vdGVzOm51bGwsc3RhcnREYXRlOm51bGwsZW5kRGF0ZTpudWxsfTtyZXR1cm4gdD1hbmd1bGFyLmV4dGVuZCh0LHIpLG4ucGx1Z2lucy5jYWxlbmRhci5jcmVhdGVFdmVudEludGVyYWN0aXZlbHkodC50aXRsZSx0LmxvY2F0aW9uLHQubm90ZXMsbmV3IERhdGUodC5zdGFydERhdGUpLG5ldyBEYXRlKHQuZW5kRGF0ZSksZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sY3JlYXRlRXZlbnRJbk5hbWVkQ2FsZW5kYXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpLHQ9e3RpdGxlOm51bGwsbG9jYXRpb246bnVsbCxub3RlczpudWxsLHN0YXJ0RGF0ZTpudWxsLGVuZERhdGU6bnVsbCxjYWxlbmRhck5hbWU6bnVsbH07cmV0dXJuIHQ9YW5ndWxhci5leHRlbmQodCxyKSxuLnBsdWdpbnMuY2FsZW5kYXIuY3JlYXRlRXZlbnRJbk5hbWVkQ2FsZW5kYXIodC50aXRsZSx0LmxvY2F0aW9uLHQubm90ZXMsbmV3IERhdGUodC5zdGFydERhdGUpLG5ldyBEYXRlKHQuZW5kRGF0ZSksdC5jYWxlbmRhck5hbWUsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sZmluZEV2ZW50OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKSx0PXt0aXRsZTpudWxsLGxvY2F0aW9uOm51bGwsbm90ZXM6bnVsbCxzdGFydERhdGU6bnVsbCxlbmREYXRlOm51bGx9O3JldHVybiB0PWFuZ3VsYXIuZXh0ZW5kKHQsciksbi5wbHVnaW5zLmNhbGVuZGFyLmZpbmRFdmVudCh0LnRpdGxlLHQubG9jYXRpb24sdC5ub3RlcyxuZXcgRGF0ZSh0LnN0YXJ0RGF0ZSksbmV3IERhdGUodC5lbmREYXRlKSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxsaXN0RXZlbnRzSW5SYW5nZTpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmNhbGVuZGFyLmxpc3RFdmVudHNJblJhbmdlKHIsbyxmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSksdC5wcm9taXNlfSxsaXN0Q2FsZW5kYXJzOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuY2FsZW5kYXIubGlzdENhbGVuZGFycyhmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxmaW5kQWxsRXZlbnRzSW5OYW1lZENhbGVuZGFyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmNhbGVuZGFyLmZpbmRBbGxFdmVudHNJbk5hbWVkQ2FsZW5kYXIocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxtb2RpZnlFdmVudDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCksdD17dGl0bGU6bnVsbCxsb2NhdGlvbjpudWxsLG5vdGVzOm51bGwsc3RhcnREYXRlOm51bGwsZW5kRGF0ZTpudWxsLG5ld1RpdGxlOm51bGwsbmV3TG9jYXRpb246bnVsbCxuZXdOb3RlczpudWxsLG5ld1N0YXJ0RGF0ZTpudWxsLG5ld0VuZERhdGU6bnVsbH07cmV0dXJuIHQ9YW5ndWxhci5leHRlbmQodCxyKSxuLnBsdWdpbnMuY2FsZW5kYXIubW9kaWZ5RXZlbnQodC50aXRsZSx0LmxvY2F0aW9uLHQubm90ZXMsbmV3IERhdGUodC5zdGFydERhdGUpLG5ldyBEYXRlKHQuZW5kRGF0ZSksdC5uZXdUaXRsZSx0Lm5ld0xvY2F0aW9uLHQubmV3Tm90ZXMsbmV3IERhdGUodC5uZXdTdGFydERhdGUpLG5ldyBEYXRlKHQubmV3RW5kRGF0ZSksZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sZGVsZXRlRXZlbnQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpLHQ9e25ld1RpdGxlOm51bGwsbG9jYXRpb246bnVsbCxub3RlczpudWxsLHN0YXJ0RGF0ZTpudWxsLGVuZERhdGU6bnVsbH07cmV0dXJuIHQ9YW5ndWxhci5leHRlbmQodCxyKSxuLnBsdWdpbnMuY2FsZW5kYXIuZGVsZXRlRXZlbnQodC5uZXdUaXRsZSx0LmxvY2F0aW9uLHQubm90ZXMsbmV3IERhdGUodC5zdGFydERhdGUpLG5ldyBEYXRlKHQuZW5kRGF0ZSksZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuY2FtZXJhXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUNhbWVyYVwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2dldFBpY3R1cmU6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuY2FtZXJhPyhuYXZpZ2F0b3IuY2FtZXJhLmdldFBpY3R1cmUoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbiksci5wcm9taXNlKTooci5yZXNvbHZlKG51bGwpLHIucHJvbWlzZSl9LGNsZWFudXA6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5jYW1lcmEuY2xlYW51cChmdW5jdGlvbigpe24ucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuY2FwdHVyZVwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFDYXB0dXJlXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57Y2FwdHVyZUF1ZGlvOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmRldmljZS5jYXB0dXJlPyhuYXZpZ2F0b3IuZGV2aWNlLmNhcHR1cmUuY2FwdHVyZUF1ZGlvKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LG4pLHIucHJvbWlzZSk6KHIucmVzb2x2ZShudWxsKSxyLnByb21pc2UpfSxjYXB0dXJlSW1hZ2U6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZGV2aWNlLmNhcHR1cmU/KG5hdmlnYXRvci5kZXZpY2UuY2FwdHVyZS5jYXB0dXJlSW1hZ2UoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbiksci5wcm9taXNlKTooci5yZXNvbHZlKG51bGwpLHIucHJvbWlzZSl9LGNhcHR1cmVWaWRlbzpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5kZXZpY2UuY2FwdHVyZT8obmF2aWdhdG9yLmRldmljZS5jYXB0dXJlLmNhcHR1cmVWaWRlbyhmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKSxyLnByb21pc2UpOihyLnJlc29sdmUobnVsbCksci5wcm9taXNlKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuY2FyZElPXCIsW10pLnByb3ZpZGVyKFwiJGNvcmRvdmFOZ0NhcmRJT1wiLFtmdW5jdGlvbigpe3ZhciBlPVtcImNhcmRfdHlwZVwiLFwicmVkYWN0ZWRfY2FyZF9udW1iZXJcIixcImNhcmRfbnVtYmVyXCIsXCJleHBpcnlfbW9udGhcIixcImV4cGlyeV95ZWFyXCIsXCJzaG9ydF9leHBpcnlfeWVhclwiLFwiY3Z2XCIsXCJ6aXBcIl0sbj17ZXhwaXJ5OiEwLGN2djohMCx6aXA6ITEsc3VwcHJlc3NNYW51YWw6ITEsc3VwcHJlc3NDb25maXJtOiExLGhpZGVMb2dvOiEwfTt0aGlzLnNldENhcmRJT1Jlc3BvbnNlRmllbGRzPWZ1bmN0aW9uKG4pe24mJmFuZ3VsYXIuaXNBcnJheShuKSYmKGU9bil9LHRoaXMuc2V0U2NhbmVyQ29uZmlnPWZ1bmN0aW9uKGUpe2UmJmFuZ3VsYXIuaXNPYmplY3QoZSkmJihuLmV4cGlyeT1lLmV4cGlyeXx8ITAsbi5jdnY9ZS5jdnZ8fCEwLG4uemlwPWUuemlwfHwhMSxuLnN1cHByZXNzTWFudWFsPWUuc3VwcHJlc3NNYW51YWx8fCExLG4uc3VwcHJlc3NDb25maXJtPWUuc3VwcHJlc3NDb25maXJtfHwhMSxuLmhpZGVMb2dvPWUuaGlkZUxvZ298fCEwKX0sdGhpcy4kZ2V0PVtcIiRxXCIsZnVuY3Rpb24ocil7cmV0dXJue3NjYW5DYXJkOmZ1bmN0aW9uKCl7dmFyIG89ci5kZWZlcigpO3JldHVybiBDYXJkSU8uc2NhbihuLGZ1bmN0aW9uKG4pe2lmKG51bGw9PT1uKW8ucmVqZWN0KG51bGwpO2Vsc2V7Zm9yKHZhciByPXt9LHQ9MCxpPWUubGVuZ3RoO2k+dDt0Kyspe3ZhciBhPWVbdF07XCJzaG9ydF9leHBpcnlfeWVhclwiPT09YT9yW2FdPVN0cmluZyhuLmV4cGlyeV95ZWFyKS5zdWJzdHIoMiwyKXx8XCJcIjpyW2FdPW5bYV18fFwiXCJ9by5yZXNvbHZlKHIpfX0sZnVuY3Rpb24oKXtvLnJlamVjdChudWxsKX0pLG8ucHJvbWlzZX19fV19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5jbGlwYm9hcmRcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQ2xpcGJvYXJkXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntjb3B5OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5jb3Jkb3ZhLnBsdWdpbnMuY2xpcGJvYXJkLmNvcHkocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHBhc3RlOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmNvcmRvdmEucGx1Z2lucy5jbGlwYm9hcmQucGFzdGUoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmNvbnRhY3RzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUNvbnRhY3RzXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57c2F2ZTpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCksbz1uYXZpZ2F0b3IuY29udGFjdHMuY3JlYXRlKG4pO3JldHVybiBvLnNhdmUoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0scmVtb3ZlOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKSxvPW5hdmlnYXRvci5jb250YWN0cy5jcmVhdGUobik7cmV0dXJuIG8ucmVtb3ZlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LGNsb25lOmZ1bmN0aW9uKGUpe3ZhciBuPW5hdmlnYXRvci5jb250YWN0cy5jcmVhdGUoZSk7cmV0dXJuIG4uY2xvbmUoZSl9LGZpbmQ6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpLG89bi5maWVsZHN8fFtcImlkXCIsXCJkaXNwbGF5TmFtZVwiXTtyZXR1cm4gZGVsZXRlIG4uZmllbGRzLDA9PT1PYmplY3Qua2V5cyhuKS5sZW5ndGg/bmF2aWdhdG9yLmNvbnRhY3RzLmZpbmQobyxmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSk6bmF2aWdhdG9yLmNvbnRhY3RzLmZpbmQobyxmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKSxyLnByb21pc2V9LHBpY2tDb250YWN0OmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuY29udGFjdHMucGlja0NvbnRhY3QoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZGF0ZVBpY2tlclwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFEYXRlUGlja2VyXCIsW1wiJHdpbmRvd1wiLFwiJHFcIixmdW5jdGlvbihlLG4pe3JldHVybntzaG93OmZ1bmN0aW9uKHIpe3ZhciBvPW4uZGVmZXIoKTtyZXR1cm4gcj1yfHx7ZGF0ZTpuZXcgRGF0ZSxtb2RlOlwiZGF0ZVwifSxlLmRhdGVQaWNrZXIuc2hvdyhyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmRldmljZVwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFEZXZpY2VcIixbZnVuY3Rpb24oKXtyZXR1cm57Z2V0RGV2aWNlOmZ1bmN0aW9uKCl7cmV0dXJuIGRldmljZX0sZ2V0Q29yZG92YTpmdW5jdGlvbigpe3JldHVybiBkZXZpY2UuY29yZG92YX0sZ2V0TW9kZWw6ZnVuY3Rpb24oKXtyZXR1cm4gZGV2aWNlLm1vZGVsfSxnZXROYW1lOmZ1bmN0aW9uKCl7cmV0dXJuIGRldmljZS5uYW1lfSxnZXRQbGF0Zm9ybTpmdW5jdGlvbigpe3JldHVybiBkZXZpY2UucGxhdGZvcm19LGdldFVVSUQ6ZnVuY3Rpb24oKXtyZXR1cm4gZGV2aWNlLnV1aWR9LGdldFZlcnNpb246ZnVuY3Rpb24oKXtyZXR1cm4gZGV2aWNlLnZlcnNpb259LGdldE1hbnVmYWN0dXJlcjpmdW5jdGlvbigpe3JldHVybiBkZXZpY2UubWFudWZhY3R1cmVyfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5kZXZpY2VNb3Rpb25cIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhRGV2aWNlTW90aW9uXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57Z2V0Q3VycmVudEFjY2VsZXJhdGlvbjpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gYW5ndWxhci5pc1VuZGVmaW5lZChuYXZpZ2F0b3IuYWNjZWxlcm9tZXRlcil8fCFhbmd1bGFyLmlzRnVuY3Rpb24obmF2aWdhdG9yLmFjY2VsZXJvbWV0ZXIuZ2V0Q3VycmVudEFjY2VsZXJhdGlvbik/KG4ucmVqZWN0KFwiRGV2aWNlIGRvIG5vdCBzdXBwb3J0IHdhdGNoQWNjZWxlcmF0aW9uXCIpLG4ucHJvbWlzZSk6KG5hdmlnYXRvci5hY2NlbGVyb21ldGVyLmdldEN1cnJlbnRBY2NlbGVyYXRpb24oZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZSl9LHdhdGNoQWNjZWxlcmF0aW9uOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtpZihhbmd1bGFyLmlzVW5kZWZpbmVkKG5hdmlnYXRvci5hY2NlbGVyb21ldGVyKXx8IWFuZ3VsYXIuaXNGdW5jdGlvbihuYXZpZ2F0b3IuYWNjZWxlcm9tZXRlci53YXRjaEFjY2VsZXJhdGlvbikpcmV0dXJuIHIucmVqZWN0KFwiRGV2aWNlIGRvIG5vdCBzdXBwb3J0IHdhdGNoQWNjZWxlcmF0aW9uXCIpLHIucHJvbWlzZTt2YXIgbz1uYXZpZ2F0b3IuYWNjZWxlcm9tZXRlci53YXRjaEFjY2VsZXJhdGlvbihmdW5jdGlvbihlKXtyLm5vdGlmeShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LG4pO3JldHVybiByLnByb21pc2UuY2FuY2VsPWZ1bmN0aW9uKCl7bmF2aWdhdG9yLmFjY2VsZXJvbWV0ZXIuY2xlYXJXYXRjaChvKX0sci5wcm9taXNlLmNsZWFyV2F0Y2g9ZnVuY3Rpb24oZSl7bmF2aWdhdG9yLmFjY2VsZXJvbWV0ZXIuY2xlYXJXYXRjaChlfHxvKX0sci5wcm9taXNlLndhdGNoSUQ9byxyLnByb21pc2V9LGNsZWFyV2F0Y2g6ZnVuY3Rpb24oZSl7cmV0dXJuIG5hdmlnYXRvci5hY2NlbGVyb21ldGVyLmNsZWFyV2F0Y2goZSl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmRldmljZU9yaWVudGF0aW9uXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YURldmljZU9yaWVudGF0aW9uXCIsW1wiJHFcIixmdW5jdGlvbihlKXt2YXIgbj17ZnJlcXVlbmN5OjNlM307cmV0dXJue2dldEN1cnJlbnRIZWFkaW5nOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuY29tcGFzcz8obmF2aWdhdG9yLmNvbXBhc3MuZ2V0Q3VycmVudEhlYWRpbmcoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZSk6KG4ucmVqZWN0KFwiTm8gY29tcGFzcyBvbiBEZXZpY2VcIiksbi5wcm9taXNlKX0sd2F0Y2hIZWFkaW5nOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtpZighbmF2aWdhdG9yLmNvbXBhc3MpcmV0dXJuIG8ucmVqZWN0KFwiTm8gY29tcGFzcyBvbiBEZXZpY2VcIiksby5wcm9taXNlO3ZhciB0PWFuZ3VsYXIuZXh0ZW5kKG4sciksaT1uYXZpZ2F0b3IuY29tcGFzcy53YXRjaEhlYWRpbmcoZnVuY3Rpb24oZSl7by5ub3RpZnkoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSx0KTtyZXR1cm4gby5wcm9taXNlLmNhbmNlbD1mdW5jdGlvbigpe25hdmlnYXRvci5jb21wYXNzLmNsZWFyV2F0Y2goaSl9LG8ucHJvbWlzZS5jbGVhcldhdGNoPWZ1bmN0aW9uKGUpe25hdmlnYXRvci5jb21wYXNzLmNsZWFyV2F0Y2goZXx8aSl9LG8ucHJvbWlzZS53YXRjaElEPWksby5wcm9taXNlfSxjbGVhcldhdGNoOmZ1bmN0aW9uKGUpe3JldHVybiBuYXZpZ2F0b3IuY29tcGFzcy5jbGVhcldhdGNoKGUpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5kaWFsb2dzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YURpYWxvZ3NcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2FsZXJ0OmZ1bmN0aW9uKHIsbyx0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIG4ubmF2aWdhdG9yLm5vdGlmaWNhdGlvbj9uYXZpZ2F0b3Iubm90aWZpY2F0aW9uLmFsZXJ0KHIsZnVuY3Rpb24oKXtpLnJlc29sdmUoKX0sbyx0KToobi5hbGVydChyKSxpLnJlc29sdmUoKSksaS5wcm9taXNlfSxjb25maXJtOmZ1bmN0aW9uKHIsbyx0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIG4ubmF2aWdhdG9yLm5vdGlmaWNhdGlvbj9uYXZpZ2F0b3Iubm90aWZpY2F0aW9uLmNvbmZpcm0ocixmdW5jdGlvbihlKXtpLnJlc29sdmUoZSl9LG8sdCk6bi5jb25maXJtKHIpP2kucmVzb2x2ZSgxKTppLnJlc29sdmUoMiksaS5wcm9taXNlfSxwcm9tcHQ6ZnVuY3Rpb24ocixvLHQsaSl7dmFyIGE9ZS5kZWZlcigpO2lmKG4ubmF2aWdhdG9yLm5vdGlmaWNhdGlvbiluYXZpZ2F0b3Iubm90aWZpY2F0aW9uLnByb21wdChyLGZ1bmN0aW9uKGUpe2EucmVzb2x2ZShlKX0sbyx0LGkpO2Vsc2V7dmFyIGM9bi5wcm9tcHQocixpKTtudWxsIT09Yz9hLnJlc29sdmUoe2lucHV0MTpjLGJ1dHRvbkluZGV4OjF9KTphLnJlc29sdmUoe2lucHV0MTpjLGJ1dHRvbkluZGV4OjJ9KX1yZXR1cm4gYS5wcm9taXNlfSxiZWVwOmZ1bmN0aW9uKGUpe3JldHVybiBuYXZpZ2F0b3Iubm90aWZpY2F0aW9uLmJlZXAoZSl9LGFjdGl2aXR5U3RhcnQ6ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuXCJhbmRyb2lkXCI9PT1jb3Jkb3ZhLnBsYXRmb3JtSWQ/KG5hdmlnYXRvci5ub3RpZmljYXRpb24uYWN0aXZpdHlTdGFydChyLG4pLG8ucmVzb2x2ZSgpKTpvLnJlamVjdChuLHIpLG8ucHJvbWlzZX0sYWN0aXZpdHlTdG9wOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVyblwiYW5kcm9pZFwiPT09Y29yZG92YS5wbGF0Zm9ybUlkPyhuYXZpZ2F0b3Iubm90aWZpY2F0aW9uLmFjdGl2aXR5U3RvcCgpLG4ucmVzb2x2ZSgpKTpuLnJlamVjdCgpLG4ucHJvbWlzZX0scHJvZ3Jlc3NTdGFydDpmdW5jdGlvbihuLHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm5cImFuZHJvaWRcIj09PWNvcmRvdmEucGxhdGZvcm1JZD8obmF2aWdhdG9yLm5vdGlmaWNhdGlvbi5wcm9ncmVzc1N0YXJ0KHIsbiksby5yZXNvbHZlKCkpOm8ucmVqZWN0KG4sciksby5wcm9taXNlfSxwcm9ncmVzc1N0b3A6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuXCJhbmRyb2lkXCI9PT1jb3Jkb3ZhLnBsYXRmb3JtSWQ/KG5hdmlnYXRvci5ub3RpZmljYXRpb24ucHJvZ3Jlc3NTdG9wKCksbi5yZXNvbHZlKCkpOm4ucmVqZWN0KCksbi5wcm9taXNlfSxwcm9ncmVzc1ZhbHVlOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm5cImFuZHJvaWRcIj09PWNvcmRvdmEucGxhdGZvcm1JZD8obmF2aWdhdG9yLm5vdGlmaWNhdGlvbi5wcm9ncmVzc1ZhbHVlKG4pLHIucmVzb2x2ZSgpKTpyLnJlamVjdChuKSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmVtYWlsQ29tcG9zZXJcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhRW1haWxDb21wb3NlclwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2lzQXZhaWxhYmxlOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuZW1haWwuaXNBdmFpbGFibGUoZnVuY3Rpb24oZSl7ZT9uLnJlc29sdmUoKTpuLnJlamVjdCgpfSksbi5wcm9taXNlfSxvcGVuOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLmVtYWlsLm9wZW4obixmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LGFkZEFsaWFzOmZ1bmN0aW9uKGUsbil7Y29yZG92YS5wbHVnaW5zLmVtYWlsLmFkZEFsaWFzKGUsbil9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmZhY2Vib29rXCIsW10pLnByb3ZpZGVyKFwiJGNvcmRvdmFGYWNlYm9va1wiLFtmdW5jdGlvbigpe3RoaXMuYnJvd3NlckluaXQ9ZnVuY3Rpb24oZSxuKXt0aGlzLmFwcElEPWUsdGhpcy5hcHBWZXJzaW9uPW58fFwidjIuMFwiLGZhY2Vib29rQ29ubmVjdFBsdWdpbi5icm93c2VySW5pdCh0aGlzLmFwcElELHRoaXMuYXBwVmVyc2lvbil9LHRoaXMuJGdldD1bXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntsb2dpbjpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGZhY2Vib29rQ29ubmVjdFBsdWdpbi5sb2dpbihuLGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHNob3dEaWFsb2c6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBmYWNlYm9va0Nvbm5lY3RQbHVnaW4uc2hvd0RpYWxvZyhuLGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LGFwaTpmdW5jdGlvbihuLHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gZmFjZWJvb2tDb25uZWN0UGx1Z2luLmFwaShuLHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sZ2V0QWNjZXNzVG9rZW46ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGZhY2Vib29rQ29ubmVjdFBsdWdpbi5nZXRBY2Nlc3NUb2tlbihmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxnZXRMb2dpblN0YXR1czpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gZmFjZWJvb2tDb25uZWN0UGx1Z2luLmdldExvZ2luU3RhdHVzKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9LGxvZ291dDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gZmFjZWJvb2tDb25uZWN0UGx1Z2luLmxvZ291dChmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfX19XX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmZhY2Vib29rQWRzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUZhY2Vib29rQWRzXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntzZXRPcHRpb25zOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5GYWNlYm9va0Fkcy5zZXRPcHRpb25zKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxjcmVhdGVCYW5uZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLkZhY2Vib29rQWRzLmNyZWF0ZUJhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0scmVtb3ZlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLkZhY2Vib29rQWRzLnJlbW92ZUJhbm5lcihmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHNob3dCYW5uZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLkZhY2Vib29rQWRzLnNob3dCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dCYW5uZXJBdFhZOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLkZhY2Vib29rQWRzLnNob3dCYW5uZXJBdFhZKHIsbyxmdW5jdGlvbigpe3QucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3QucmVqZWN0KCl9KSx0LnByb21pc2V9LGhpZGVCYW5uZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uRmFjZWJvb2tBZHMuaGlkZUJhbm5lcihmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHByZXBhcmVJbnRlcnN0aXRpYWw6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLkZhY2Vib29rQWRzLnByZXBhcmVJbnRlcnN0aXRpYWwocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dJbnRlcnN0aXRpYWw6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uRmFjZWJvb2tBZHMuc2hvd0ludGVyc3RpdGlhbChmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe1xuci5yZWplY3QoKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmlsZVwiLFtdKS5jb25zdGFudChcIiRjb3Jkb3ZhRmlsZUVycm9yXCIsezE6XCJOT1RfRk9VTkRfRVJSXCIsMjpcIlNFQ1VSSVRZX0VSUlwiLDM6XCJBQk9SVF9FUlJcIiw0OlwiTk9UX1JFQURBQkxFX0VSUlwiLDU6XCJFTkNPRElOR19FUlJcIiw2OlwiTk9fTU9ESUZJQ0FUSU9OX0FMTE9XRURfRVJSXCIsNzpcIklOVkFMSURfU1RBVEVfRVJSXCIsODpcIlNZTlRBWF9FUlJcIiw5OlwiSU5WQUxJRF9NT0RJRklDQVRJT05fRVJSXCIsMTA6XCJRVU9UQV9FWENFRURFRF9FUlJcIiwxMTpcIlRZUEVfTUlTTUFUQ0hfRVJSXCIsMTI6XCJQQVRIX0VYSVNUU19FUlJcIn0pLnByb3ZpZGVyKFwiJGNvcmRvdmFGaWxlXCIsW2Z1bmN0aW9uKCl7dGhpcy4kZ2V0PVtcIiRxXCIsXCIkd2luZG93XCIsXCIkY29yZG92YUZpbGVFcnJvclwiLGZ1bmN0aW9uKGUsbixyKXtyZXR1cm57Z2V0RnJlZURpc2tTcGFjZTpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5leGVjKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9LFwiRmlsZVwiLFwiZ2V0RnJlZURpc2tTcGFjZVwiLFtdKSxuLnByb21pc2V9LGNoZWNrRGlyOmZ1bmN0aW9uKG8sdCl7dmFyIGk9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZpLnJlamVjdChcImRpcmVjdG9yeSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXt2YXIgYT1vK3Q7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKGEsZnVuY3Rpb24oZSl7ZS5pc0RpcmVjdG9yeT09PSEwP2kucmVzb2x2ZShlKTppLnJlamVjdCh7Y29kZToxMyxtZXNzYWdlOlwiaW5wdXQgaXMgbm90IGEgZGlyZWN0b3J5XCJ9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfWNhdGNoKGMpe2MubWVzc2FnZT1yW2MuY29kZV0saS5yZWplY3QoYyl9cmV0dXJuIGkucHJvbWlzZX0sY2hlY2tGaWxlOmZ1bmN0aW9uKG8sdCl7dmFyIGk9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZpLnJlamVjdChcImRpcmVjdG9yeSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXt2YXIgYT1vK3Q7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKGEsZnVuY3Rpb24oZSl7ZS5pc0ZpbGU9PT0hMD9pLnJlc29sdmUoZSk6aS5yZWplY3Qoe2NvZGU6MTMsbWVzc2FnZTpcImlucHV0IGlzIG5vdCBhIGZpbGVcIn0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9Y2F0Y2goYyl7Yy5tZXNzYWdlPXJbYy5jb2RlXSxpLnJlamVjdChjKX1yZXR1cm4gaS5wcm9taXNlfSxjcmVhdGVEaXI6ZnVuY3Rpb24obyx0LGkpe3ZhciBhPWUuZGVmZXIoKTsvXlxcLy8udGVzdCh0KSYmYS5yZWplY3QoXCJkaXJlY3RvcnkgY2Fubm90IHN0YXJ0IHdpdGggL1wiKSxpPWk/ITE6ITA7dmFyIGM9e2NyZWF0ZTohMCxleGNsdXNpdmU6aX07dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChvLGZ1bmN0aW9uKGUpe2UuZ2V0RGlyZWN0b3J5KHQsYyxmdW5jdGlvbihlKXthLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxhLnJlamVjdChlKX0pfWNhdGNoKHUpe3UubWVzc2FnZT1yW3UuY29kZV0sYS5yZWplY3QodSl9cmV0dXJuIGEucHJvbWlzZX0sY3JlYXRlRmlsZTpmdW5jdGlvbihvLHQsaSl7dmFyIGE9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZhLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpLGk9aT8hMTohMDt2YXIgYz17Y3JlYXRlOiEwLGV4Y2x1c2l2ZTppfTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKG8sZnVuY3Rpb24oZSl7ZS5nZXRGaWxlKHQsYyxmdW5jdGlvbihlKXthLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxhLnJlamVjdChlKX0pfWNhdGNoKHUpe3UubWVzc2FnZT1yW3UuY29kZV0sYS5yZWplY3QodSl9cmV0dXJuIGEucHJvbWlzZX0scmVtb3ZlRGlyOmZ1bmN0aW9uKG8sdCl7dmFyIGk9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZpLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwobyxmdW5jdGlvbihlKXtlLmdldERpcmVjdG9yeSh0LHtjcmVhdGU6ITF9LGZ1bmN0aW9uKGUpe2UucmVtb3ZlKGZ1bmN0aW9uKCl7aS5yZXNvbHZlKHtzdWNjZXNzOiEwLGZpbGVSZW1vdmVkOmV9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX1jYXRjaChhKXthLm1lc3NhZ2U9clthLmNvZGVdLGkucmVqZWN0KGEpfXJldHVybiBpLnByb21pc2V9LHJlbW92ZUZpbGU6ZnVuY3Rpb24obyx0KXt2YXIgaT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmkucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChvLGZ1bmN0aW9uKGUpe2UuZ2V0RmlsZSh0LHtjcmVhdGU6ITF9LGZ1bmN0aW9uKGUpe2UucmVtb3ZlKGZ1bmN0aW9uKCl7aS5yZXNvbHZlKHtzdWNjZXNzOiEwLGZpbGVSZW1vdmVkOmV9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX1jYXRjaChhKXthLm1lc3NhZ2U9clthLmNvZGVdLGkucmVqZWN0KGEpfXJldHVybiBpLnByb21pc2V9LHJlbW92ZVJlY3Vyc2l2ZWx5OmZ1bmN0aW9uKG8sdCl7dmFyIGk9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZpLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwobyxmdW5jdGlvbihlKXtlLmdldERpcmVjdG9yeSh0LHtjcmVhdGU6ITF9LGZ1bmN0aW9uKGUpe2UucmVtb3ZlUmVjdXJzaXZlbHkoZnVuY3Rpb24oKXtpLnJlc29sdmUoe3N1Y2Nlc3M6ITAsZmlsZVJlbW92ZWQ6ZX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfWNhdGNoKGEpe2EubWVzc2FnZT1yW2EuY29kZV0saS5yZWplY3QoYSl9cmV0dXJuIGkucHJvbWlzZX0sd3JpdGVGaWxlOmZ1bmN0aW9uKG8sdCxpLGEpe3ZhciBjPWUuZGVmZXIoKTsvXlxcLy8udGVzdCh0KSYmYy5yZWplY3QoXCJmaWxlLW5hbWUgY2Fubm90IHN0YXJ0IHdpdGggL1wiKSxhPWE/ITE6ITA7dmFyIHU9e2NyZWF0ZTohMCxleGNsdXNpdmU6YX07dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChvLGZ1bmN0aW9uKGUpe2UuZ2V0RmlsZSh0LHUsZnVuY3Rpb24oZSl7ZS5jcmVhdGVXcml0ZXIoZnVuY3Rpb24oZSl7dS5hcHBlbmQ9PT0hMCYmZS5zZWVrKGUubGVuZ3RoKSx1LnRydW5jYXRlJiZlLnRydW5jYXRlKHUudHJ1bmNhdGUpLGUub253cml0ZWVuZD1mdW5jdGlvbihlKXt0aGlzLmVycm9yP2MucmVqZWN0KHRoaXMuZXJyb3IpOmMucmVzb2x2ZShlKX0sZS53cml0ZShpKSxjLnByb21pc2UuYWJvcnQ9ZnVuY3Rpb24oKXtlLmFib3J0KCl9fSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYy5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxjLnJlamVjdChlKX0pfWNhdGNoKHMpe3MubWVzc2FnZT1yW3MuY29kZV0sYy5yZWplY3Qocyl9cmV0dXJuIGMucHJvbWlzZX0sd3JpdGVFeGlzdGluZ0ZpbGU6ZnVuY3Rpb24obyx0LGkpe3ZhciBhPWUuZGVmZXIoKTsvXlxcLy8udGVzdCh0KSYmYS5yZWplY3QoXCJmaWxlLW5hbWUgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKG8sZnVuY3Rpb24oZSl7ZS5nZXRGaWxlKHQse2NyZWF0ZTohMX0sZnVuY3Rpb24oZSl7ZS5jcmVhdGVXcml0ZXIoZnVuY3Rpb24oZSl7ZS5zZWVrKGUubGVuZ3RoKSxlLm9ud3JpdGVlbmQ9ZnVuY3Rpb24oZSl7dGhpcy5lcnJvcj9hLnJlamVjdCh0aGlzLmVycm9yKTphLnJlc29sdmUoZSl9LGUud3JpdGUoaSksYS5wcm9taXNlLmFib3J0PWZ1bmN0aW9uKCl7ZS5hYm9ydCgpfX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGEucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYS5yZWplY3QoZSl9KX1jYXRjaChjKXtjLm1lc3NhZ2U9cltjLmNvZGVdLGEucmVqZWN0KGMpfXJldHVybiBhLnByb21pc2V9LHJlYWRBc1RleHQ6ZnVuY3Rpb24obyx0KXt2YXIgaT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmkucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChvLGZ1bmN0aW9uKGUpe2UuZ2V0RmlsZSh0LHtjcmVhdGU6ITF9LGZ1bmN0aW9uKGUpe2UuZmlsZShmdW5jdGlvbihlKXt2YXIgbj1uZXcgRmlsZVJlYWRlcjtuLm9ubG9hZGVuZD1mdW5jdGlvbihlKXt2b2lkIDAhPT1lLnRhcmdldC5yZXN1bHR8fG51bGwhPT1lLnRhcmdldC5yZXN1bHQ/aS5yZXNvbHZlKGUudGFyZ2V0LnJlc3VsdCk6dm9pZCAwIT09ZS50YXJnZXQuZXJyb3J8fG51bGwhPT1lLnRhcmdldC5lcnJvcj9pLnJlamVjdChlLnRhcmdldC5lcnJvcik6aS5yZWplY3Qoe2NvZGU6bnVsbCxtZXNzYWdlOlwiUkVBREVSX09OTE9BREVORF9FUlJcIn0pfSxuLnJlYWRBc1RleHQoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9Y2F0Y2goYSl7YS5tZXNzYWdlPXJbYS5jb2RlXSxpLnJlamVjdChhKX1yZXR1cm4gaS5wcm9taXNlfSxyZWFkQXNEYXRhVVJMOmZ1bmN0aW9uKG8sdCl7dmFyIGk9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZpLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwobyxmdW5jdGlvbihlKXtlLmdldEZpbGUodCx7Y3JlYXRlOiExfSxmdW5jdGlvbihlKXtlLmZpbGUoZnVuY3Rpb24oZSl7dmFyIG49bmV3IEZpbGVSZWFkZXI7bi5vbmxvYWRlbmQ9ZnVuY3Rpb24oZSl7dm9pZCAwIT09ZS50YXJnZXQucmVzdWx0fHxudWxsIT09ZS50YXJnZXQucmVzdWx0P2kucmVzb2x2ZShlLnRhcmdldC5yZXN1bHQpOnZvaWQgMCE9PWUudGFyZ2V0LmVycm9yfHxudWxsIT09ZS50YXJnZXQuZXJyb3I/aS5yZWplY3QoZS50YXJnZXQuZXJyb3IpOmkucmVqZWN0KHtjb2RlOm51bGwsbWVzc2FnZTpcIlJFQURFUl9PTkxPQURFTkRfRVJSXCJ9KX0sbi5yZWFkQXNEYXRhVVJMKGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfWNhdGNoKGEpe2EubWVzc2FnZT1yW2EuY29kZV0saS5yZWplY3QoYSl9cmV0dXJuIGkucHJvbWlzZX0scmVhZEFzQmluYXJ5U3RyaW5nOmZ1bmN0aW9uKG8sdCl7dmFyIGk9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZpLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwobyxmdW5jdGlvbihlKXtlLmdldEZpbGUodCx7Y3JlYXRlOiExfSxmdW5jdGlvbihlKXtlLmZpbGUoZnVuY3Rpb24oZSl7dmFyIG49bmV3IEZpbGVSZWFkZXI7bi5vbmxvYWRlbmQ9ZnVuY3Rpb24oZSl7dm9pZCAwIT09ZS50YXJnZXQucmVzdWx0fHxudWxsIT09ZS50YXJnZXQucmVzdWx0P2kucmVzb2x2ZShlLnRhcmdldC5yZXN1bHQpOnZvaWQgMCE9PWUudGFyZ2V0LmVycm9yfHxudWxsIT09ZS50YXJnZXQuZXJyb3I/aS5yZWplY3QoZS50YXJnZXQuZXJyb3IpOmkucmVqZWN0KHtjb2RlOm51bGwsbWVzc2FnZTpcIlJFQURFUl9PTkxPQURFTkRfRVJSXCJ9KX0sbi5yZWFkQXNCaW5hcnlTdHJpbmcoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9Y2F0Y2goYSl7YS5tZXNzYWdlPXJbYS5jb2RlXSxpLnJlamVjdChhKX1yZXR1cm4gaS5wcm9taXNlfSxyZWFkQXNBcnJheUJ1ZmZlcjpmdW5jdGlvbihvLHQpe3ZhciBpPWUuZGVmZXIoKTsvXlxcLy8udGVzdCh0KSYmaS5yZWplY3QoXCJmaWxlLW5hbWUgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKG8sZnVuY3Rpb24oZSl7ZS5nZXRGaWxlKHQse2NyZWF0ZTohMX0sZnVuY3Rpb24oZSl7ZS5maWxlKGZ1bmN0aW9uKGUpe3ZhciBuPW5ldyBGaWxlUmVhZGVyO24ub25sb2FkZW5kPWZ1bmN0aW9uKGUpe3ZvaWQgMCE9PWUudGFyZ2V0LnJlc3VsdHx8bnVsbCE9PWUudGFyZ2V0LnJlc3VsdD9pLnJlc29sdmUoZS50YXJnZXQucmVzdWx0KTp2b2lkIDAhPT1lLnRhcmdldC5lcnJvcnx8bnVsbCE9PWUudGFyZ2V0LmVycm9yP2kucmVqZWN0KGUudGFyZ2V0LmVycm9yKTppLnJlamVjdCh7Y29kZTpudWxsLG1lc3NhZ2U6XCJSRUFERVJfT05MT0FERU5EX0VSUlwifSl9LG4ucmVhZEFzQXJyYXlCdWZmZXIoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9Y2F0Y2goYSl7YS5tZXNzYWdlPXJbYS5jb2RlXSxpLnJlamVjdChhKX1yZXR1cm4gaS5wcm9taXNlfSxtb3ZlRmlsZTpmdW5jdGlvbihyLG8sdCxpKXt2YXIgYT1lLmRlZmVyKCk7aT1pfHxvLCgvXlxcLy8udGVzdChvKXx8L15cXC8vLnRlc3QoaSkpJiZhLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwocixmdW5jdGlvbihlKXtlLmdldEZpbGUobyx7Y3JlYXRlOiExfSxmdW5jdGlvbihlKXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwodCxmdW5jdGlvbihuKXtlLm1vdmVUbyhuLGksZnVuY3Rpb24oZSl7YS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXthLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXthLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXthLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXthLnJlamVjdChlKX0pfWNhdGNoKGMpe2EucmVqZWN0KGMpfXJldHVybiBhLnByb21pc2V9LG1vdmVEaXI6ZnVuY3Rpb24ocixvLHQsaSl7dmFyIGE9ZS5kZWZlcigpO2k9aXx8bywoL15cXC8vLnRlc3Qobyl8fC9eXFwvLy50ZXN0KGkpKSYmYS5yZWplY3QoXCJmaWxlLW5hbWUgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKHIsZnVuY3Rpb24oZSl7ZS5nZXREaXJlY3Rvcnkobyx7Y3JlYXRlOiExfSxmdW5jdGlvbihlKXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwodCxmdW5jdGlvbihuKXtlLm1vdmVUbyhuLGksZnVuY3Rpb24oZSl7YS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXthLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXthLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXthLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXthLnJlamVjdChlKX0pfWNhdGNoKGMpe2EucmVqZWN0KGMpfXJldHVybiBhLnByb21pc2V9LGNvcHlEaXI6ZnVuY3Rpb24obyx0LGksYSl7dmFyIGM9ZS5kZWZlcigpO2E9YXx8dCwoL15cXC8vLnRlc3QodCl8fC9eXFwvLy50ZXN0KGEpKSYmYy5yZWplY3QoXCJmaWxlLW5hbWUgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKG8sZnVuY3Rpb24oZSl7ZS5nZXREaXJlY3RvcnkodCx7Y3JlYXRlOiExLGV4Y2x1c2l2ZTohMX0sZnVuY3Rpb24oZSl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKGksZnVuY3Rpb24obil7ZS5jb3B5VG8obixhLGZ1bmN0aW9uKGUpe2MucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxjLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGMucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYy5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxjLnJlamVjdChlKX0pfWNhdGNoKHUpe3UubWVzc2FnZT1yW3UuY29kZV0sYy5yZWplY3QodSl9cmV0dXJuIGMucHJvbWlzZX0sY29weUZpbGU6ZnVuY3Rpb24obyx0LGksYSl7dmFyIGM9ZS5kZWZlcigpO2E9YXx8dCwvXlxcLy8udGVzdCh0KSYmYy5yZWplY3QoXCJmaWxlLW5hbWUgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKG8sZnVuY3Rpb24oZSl7ZS5nZXRGaWxlKHQse2NyZWF0ZTohMSxleGNsdXNpdmU6ITF9LGZ1bmN0aW9uKGUpe24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChpLGZ1bmN0aW9uKG4pe2UuY29weVRvKG4sYSxmdW5jdGlvbihlKXtjLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYy5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxjLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGMucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYy5yZWplY3QoZSl9KX1jYXRjaCh1KXt1Lm1lc3NhZ2U9clt1LmNvZGVdLGMucmVqZWN0KHUpfXJldHVybiBjLnByb21pc2V9LHJlYWRGaWxlTWV0YWRhdGE6ZnVuY3Rpb24obyx0KXt2YXIgaT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmkucmVqZWN0KFwiZGlyZWN0b3J5IGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e3ZhciBhPW8rdDtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwoYSxmdW5jdGlvbihlKXtlLmZpbGUoZnVuY3Rpb24oZSl7aS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX1jYXRjaChjKXtjLm1lc3NhZ2U9cltjLmNvZGVdLGkucmVqZWN0KGMpfXJldHVybiBpLnByb21pc2V9fX1dfV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmlsZU9wZW5lcjJcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhRmlsZU9wZW5lcjJcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntvcGVuOmZ1bmN0aW9uKG4scil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuZmlsZU9wZW5lcjIub3BlbihuLHIse2Vycm9yOmZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSxzdWNjZXNzOmZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9fSksby5wcm9taXNlfSx1bmluc3RhbGw6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuZmlsZU9wZW5lcjIudW5pbnN0YWxsKG4se2Vycm9yOmZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxzdWNjZXNzOmZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9fSksci5wcm9taXNlfSxhcHBJc0luc3RhbGxlZDpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5maWxlT3BlbmVyMi5hcHBJc0luc3RhbGxlZChuLHtzdWNjZXNzOmZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX19KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmZpbGVUcmFuc2ZlclwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFGaWxlVHJhbnNmZXJcIixbXCIkcVwiLFwiJHRpbWVvdXRcIixmdW5jdGlvbihlLG4pe3JldHVybntkb3dubG9hZDpmdW5jdGlvbihyLG8sdCxpKXt2YXIgYT1lLmRlZmVyKCksYz1uZXcgRmlsZVRyYW5zZmVyLHU9dCYmdC5lbmNvZGVVUkk9PT0hMT9yOmVuY29kZVVSSShyKTtyZXR1cm4gdCYmdm9pZCAwIT09dC50aW1lb3V0JiZudWxsIT09dC50aW1lb3V0JiYobihmdW5jdGlvbigpe2MuYWJvcnQoKX0sdC50aW1lb3V0KSx0LnRpbWVvdXQ9bnVsbCksYy5vbnByb2dyZXNzPWZ1bmN0aW9uKGUpe2Eubm90aWZ5KGUpfSxhLnByb21pc2UuYWJvcnQ9ZnVuY3Rpb24oKXtjLmFib3J0KCl9LGMuZG93bmxvYWQodSxvLGEucmVzb2x2ZSxhLnJlamVjdCxpLHQpLGEucHJvbWlzZX0sdXBsb2FkOmZ1bmN0aW9uKHIsbyx0LGkpe3ZhciBhPWUuZGVmZXIoKSxjPW5ldyBGaWxlVHJhbnNmZXIsdT10JiZ0LmVuY29kZVVSST09PSExP3I6ZW5jb2RlVVJJKHIpO3JldHVybiB0JiZ2b2lkIDAhPT10LnRpbWVvdXQmJm51bGwhPT10LnRpbWVvdXQmJihuKGZ1bmN0aW9uKCl7Yy5hYm9ydCgpfSx0LnRpbWVvdXQpLHQudGltZW91dD1udWxsKSxjLm9ucHJvZ3Jlc3M9ZnVuY3Rpb24oZSl7YS5ub3RpZnkoZSl9LGEucHJvbWlzZS5hYm9ydD1mdW5jdGlvbigpe2MuYWJvcnQoKX0sYy51cGxvYWQobyx1LGEucmVzb2x2ZSxhLnJlamVjdCx0LGkpLGEucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmxhc2hsaWdodFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFGbGFzaGxpZ2h0XCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybnthdmFpbGFibGU6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5mbGFzaGxpZ2h0LmF2YWlsYWJsZShmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9KSxyLnByb21pc2V9LHN3aXRjaE9uOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuZmxhc2hsaWdodC5zd2l0Y2hPbihmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxzd2l0Y2hPZmY6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5mbGFzaGxpZ2h0LnN3aXRjaE9mZihmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSx0b2dnbGU6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5mbGFzaGxpZ2h0LnRvZ2dsZShmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5mbHVycnlBZHNcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhRmx1cnJ5QWRzXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntzZXRPcHRpb25zOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5GbHVycnlBZHMuc2V0T3B0aW9ucyhyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sY3JlYXRlQmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5GbHVycnlBZHMuY3JlYXRlQmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxyZW1vdmVCYW5uZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uRmx1cnJ5QWRzLnJlbW92ZUJhbm5lcihmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHNob3dCYW5uZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLkZsdXJyeUFkcy5zaG93QmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93QmFubmVyQXRYWTpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi5GbHVycnlBZHMuc2hvd0Jhbm5lckF0WFkocixvLGZ1bmN0aW9uKCl7dC5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7dC5yZWplY3QoKX0pLHQucHJvbWlzZX0saGlkZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5GbHVycnlBZHMuaGlkZUJhbm5lcihmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHByZXBhcmVJbnRlcnN0aXRpYWw6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLkZsdXJyeUFkcy5wcmVwYXJlSW50ZXJzdGl0aWFsKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93SW50ZXJzdGl0aWFsOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLkZsdXJyeUFkcy5zaG93SW50ZXJzdGl0aWFsKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ2FcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhR0FcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2luaXQ6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG89bz49MD9vOjEwLG4ucGx1Z2lucy5nYVBsdWdpbi5pbml0KGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7dC5yZWplY3QoZSl9LHIsbyksdC5wcm9taXNlfSx0cmFja0V2ZW50OmZ1bmN0aW9uKHIsbyx0LGksYSxjKXt2YXIgdT1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5nYVBsdWdpbi50cmFja0V2ZW50KGZ1bmN0aW9uKGUpe3UucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7dS5yZWplY3QoZSl9LHQsaSxhLGMpLHUucHJvbWlzZX0sdHJhY2tQYWdlOmZ1bmN0aW9uKHIsbyx0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5nYVBsdWdpbi50cmFja1BhZ2UoZnVuY3Rpb24oZSl7aS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtpLnJlamVjdChlKX0sdCksaS5wcm9taXNlfSxzZXRWYXJpYWJsZTpmdW5jdGlvbihyLG8sdCxpKXt2YXIgYT1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5nYVBsdWdpbi5zZXRWYXJpYWJsZShmdW5jdGlvbihlKXthLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2EucmVqZWN0KGUpfSx0LGkpLGEucHJvbWlzZX0sZXhpdDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmdhUGx1Z2luLmV4aXQoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ2VvbG9jYXRpb25cIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhR2VvbG9jYXRpb25cIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntnZXRDdXJyZW50UG9zaXRpb246ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LG4pLHIucHJvbWlzZX0sd2F0Y2hQb3NpdGlvbjpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCksbz1uYXZpZ2F0b3IuZ2VvbG9jYXRpb24ud2F0Y2hQb3NpdGlvbihmdW5jdGlvbihlKXtyLm5vdGlmeShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LG4pO3JldHVybiByLnByb21pc2UuY2FuY2VsPWZ1bmN0aW9uKCl7bmF2aWdhdG9yLmdlb2xvY2F0aW9uLmNsZWFyV2F0Y2gobyl9LHIucHJvbWlzZS5jbGVhcldhdGNoPWZ1bmN0aW9uKGUpe25hdmlnYXRvci5nZW9sb2NhdGlvbi5jbGVhcldhdGNoKGV8fG8pfSxyLnByb21pc2Uud2F0Y2hJRD1vLHIucHJvbWlzZX0sY2xlYXJXYXRjaDpmdW5jdGlvbihlKXtyZXR1cm4gbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmNsZWFyV2F0Y2goZSl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmdsb2JhbGl6YXRpb25cIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhR2xvYmFsaXphdGlvblwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2dldFByZWZlcnJlZExhbmd1YWdlOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZ2xvYmFsaXphdGlvbi5nZXRQcmVmZXJyZWRMYW5ndWFnZShmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxnZXRMb2NhbGVOYW1lOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZ2xvYmFsaXphdGlvbi5nZXRMb2NhbGVOYW1lKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9LGdldEZpcnN0RGF5T2ZXZWVrOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZ2xvYmFsaXphdGlvbi5nZXRGaXJzdERheU9mV2VlayhmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxkYXRlVG9TdHJpbmc6ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLmRhdGVUb1N0cmluZyhuLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9LHIpLG8ucHJvbWlzZX0sc3RyaW5nVG9EYXRlOmZ1bmN0aW9uKG4scil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZ2xvYmFsaXphdGlvbi5zdHJpbmdUb0RhdGUobixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSxyKSxvLnByb21pc2V9LGdldERhdGVQYXR0ZXJuOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmdsb2JhbGl6YXRpb24uZ2V0RGF0ZVBhdHRlcm4oZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbiksci5wcm9taXNlfSxnZXREYXRlTmFtZXM6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZ2xvYmFsaXphdGlvbi5nZXREYXRlTmFtZXMoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbiksci5wcm9taXNlfSxpc0RheUxpZ2h0U2F2aW5nc1RpbWU6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZ2xvYmFsaXphdGlvbi5pc0RheUxpZ2h0U2F2aW5nc1RpbWUobixmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxudW1iZXJUb1N0cmluZzpmdW5jdGlvbihuLHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmdsb2JhbGl6YXRpb24ubnVtYmVyVG9TdHJpbmcobixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSxyKSxvLnByb21pc2V9LHN0cmluZ1RvTnVtYmVyOmZ1bmN0aW9uKG4scil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZ2xvYmFsaXphdGlvbi5zdHJpbmdUb051bWJlcihuLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9LHIpLG8ucHJvbWlzZX0sZ2V0TnVtYmVyUGF0dGVybjpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLmdldE51bWJlclBhdHRlcm4oZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbiksci5wcm9taXNlfSxnZXRDdXJyZW5jeVBhdHRlcm46ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZ2xvYmFsaXphdGlvbi5nZXRDdXJyZW5jeVBhdHRlcm4obixmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5nb29nbGVBZHNcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhR29vZ2xlQWRzXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntzZXRPcHRpb25zOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5BZE1vYi5zZXRPcHRpb25zKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxjcmVhdGVCYW5uZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLkFkTW9iLmNyZWF0ZUJhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0scmVtb3ZlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLkFkTW9iLnJlbW92ZUJhbm5lcihmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHNob3dCYW5uZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLkFkTW9iLnNob3dCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dCYW5uZXJBdFhZOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLkFkTW9iLnNob3dCYW5uZXJBdFhZKHIsbyxmdW5jdGlvbigpe3QucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3QucmVqZWN0KCl9KSx0LnByb21pc2V9LGhpZGVCYW5uZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uQWRNb2IuaGlkZUJhbm5lcihmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHByZXBhcmVJbnRlcnN0aXRpYWw6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLkFkTW9iLnByZXBhcmVJbnRlcnN0aXRpYWwocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dJbnRlcnN0aXRpYWw6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uQWRNb2Iuc2hvd0ludGVyc3RpdGlhbChmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmdvb2dsZUFuYWx5dGljc1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFHb29nbGVBbmFseXRpY3NcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3N0YXJ0VHJhY2tlcldpdGhJZDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uYW5hbHl0aWNzLnN0YXJ0VHJhY2tlcldpdGhJZChyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHNldFVzZXJJZDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uYW5hbHl0aWNzLnNldFVzZXJJZChyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGRlYnVnTW9kZTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5hbmFseXRpY3MuZGVidWdNb2RlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSx0cmFja1ZpZXc6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmFuYWx5dGljcy50cmFja1ZpZXcocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxhZGRDdXN0b21EaW1lbnNpb246ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCksaT1wYXJzZUludChyLDEwKTtyZXR1cm4gaXNOYU4oaSkmJnQucmVqZWN0KCdQYXJhbWV0ZXIgXCJrZXlcIiBtdXN0IGJlIGFuIGludGVnZXIuJyksbi5hbmFseXRpY3MuYWRkQ3VzdG9tRGltZW5zaW9uKGksbyxmdW5jdGlvbigpe3QucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0pLHQucHJvbWlzZX0sdHJhY2tFdmVudDpmdW5jdGlvbihyLG8sdCxpKXt2YXIgYT1lLmRlZmVyKCk7cmV0dXJuIG4uYW5hbHl0aWNzLnRyYWNrRXZlbnQocixvLHQsaSxmdW5jdGlvbihlKXthLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2EucmVqZWN0KGUpfSksYS5wcm9taXNlfSx0cmFja0V4Y2VwdGlvbjpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi5hbmFseXRpY3MudHJhY2tFeGNlcHRpb24ocixvLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7dC5yZWplY3QoZSl9KSx0LnByb21pc2V9LHRyYWNrVGltaW5nOmZ1bmN0aW9uKHIsbyx0LGkpe3ZhciBhPWUuZGVmZXIoKTtyZXR1cm4gbi5hbmFseXRpY3MudHJhY2tUaW1pbmcocixvLHQsaSxmdW5jdGlvbihlKXthLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2EucmVqZWN0KGUpfSksYS5wcm9taXNlfSxhZGRUcmFuc2FjdGlvbjpmdW5jdGlvbihyLG8sdCxpLGEsYyl7dmFyIHU9ZS5kZWZlcigpO3JldHVybiBuLmFuYWx5dGljcy5hZGRUcmFuc2FjdGlvbihyLG8sdCxpLGEsYyxmdW5jdGlvbihlKXt1LnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3UucmVqZWN0KGUpfSksdS5wcm9taXNlfSxhZGRUcmFuc2FjdGlvbkl0ZW06ZnVuY3Rpb24ocixvLHQsaSxhLGMsdSl7dmFyIHM9ZS5kZWZlcigpO3JldHVybiBuLmFuYWx5dGljcy5hZGRUcmFuc2FjdGlvbkl0ZW0ocixvLHQsaSxhLGMsdSxmdW5jdGlvbihlKXtzLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3MucmVqZWN0KGUpfSkscy5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5nb29nbGVNYXBcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhR29vZ2xlTWFwXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3ZhciByPW51bGw7cmV0dXJue2dldE1hcDpmdW5jdGlvbihvKXt2YXIgdD1lLmRlZmVyKCk7aWYobi5wbHVnaW4uZ29vZ2xlLm1hcHMpe3ZhciBpPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFwX2NhbnZhc1wiKTtyPW4ucGx1Z2luLmdvb2dsZS5tYXBzLk1hcC5nZXRNYXAobyksci5zZXREaXYoaSksdC5yZXNvbHZlKHIpfWVsc2UgdC5yZWplY3QobnVsbCk7cmV0dXJuIHQucHJvbWlzZX0saXNNYXBMb2FkZWQ6ZnVuY3Rpb24oKXtyZXR1cm4hIXJ9LGFkZE1hcmtlcjpmdW5jdGlvbihuKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHIuYWRkTWFya2VyKG4sZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSksby5wcm9taXNlfSxnZXRNYXBUeXBlSWRzOmZ1bmN0aW9uKCl7cmV0dXJuIG4ucGx1Z2luLmdvb2dsZS5tYXBzLm1hcFR5cGVJZH0sc2V0VmlzaWJsZTpmdW5jdGlvbihuKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHIuc2V0VmlzaWJsZShuKSxvLnByb21pc2V9LGNsZWFudXA6ZnVuY3Rpb24oKXtyPW51bGx9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmdvb2dsZVBsYXlHYW1lXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUdvb2dsZVBsYXlHYW1lXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57YXV0aDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gZ29vZ2xlcGxheWdhbWUuYXV0aChmdW5jdGlvbihlKXtyZXR1cm4gbi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyZXR1cm4gbi5yZWplY3QoZSl9KSxuLnByb21pc2V9LHNpZ25vdXQ6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGdvb2dsZXBsYXlnYW1lLnNpZ25vdXQoZnVuY3Rpb24oZSl7cmV0dXJuIG4ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7cmV0dXJuIG4ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxpc1NpZ25lZEluOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBnb29nbGVwbGF5Z2FtZS5pc1NpZ25lZEluKGZ1bmN0aW9uKGUpe3JldHVybiBuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3JldHVybiBuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sc2hvd1BsYXllcjpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gZ29vZ2xlcGxheWdhbWUuc2hvd1BsYXllcihmdW5jdGlvbihlKXtyZXR1cm4gbi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyZXR1cm4gbi5yZWplY3QoZSl9KSxuLnByb21pc2V9LHN1Ym1pdFNjb3JlOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gZ29vZ2xlcGxheWdhbWUuc3VibWl0U2NvcmUobixmdW5jdGlvbihlKXtyZXR1cm4gci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyZXR1cm4gci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHNob3dBbGxMZWFkZXJib2FyZHM6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGdvb2dsZXBsYXlnYW1lLnNob3dBbGxMZWFkZXJib2FyZHMoZnVuY3Rpb24oZSl7cmV0dXJuIG4ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7cmV0dXJuIG4ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxzaG93TGVhZGVyYm9hcmQ6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBnb29nbGVwbGF5Z2FtZS5zaG93TGVhZGVyYm9hcmQobixmdW5jdGlvbihlKXtyZXR1cm4gci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyZXR1cm4gci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHVubG9ja0FjaGlldmVtZW50OmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gZ29vZ2xlcGxheWdhbWUudW5sb2NrQWNoaWV2ZW1lbnQobixmdW5jdGlvbihlKXtyZXR1cm4gci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyZXR1cm4gci5yZWplY3QoZSl9KSxyLnByb21pc2V9LGluY3JlbWVudEFjaGlldmVtZW50OmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gZ29vZ2xlcGxheWdhbWUuaW5jcmVtZW50QWNoaWV2ZW1lbnQobixmdW5jdGlvbihlKXtyZXR1cm4gci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyZXR1cm4gci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHNob3dBY2hpZXZlbWVudHM6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGdvb2dsZXBsYXlnYW1lLnNob3dBY2hpZXZlbWVudHMoZnVuY3Rpb24oZSl7cmV0dXJuIG4ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7cmV0dXJuIG4ucmVqZWN0KGUpfSksbi5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5nb29nbGVQbHVzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUdvb2dsZVBsdXNcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2xvZ2luOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gdm9pZCAwPT09ciYmKHI9e30pLG4ucGx1Z2lucy5nb29nbGVwbHVzLmxvZ2luKHtpT1NBcGlLZXk6cn0sZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sc2lsZW50TG9naW46ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiB2b2lkIDA9PT1yJiYocj17fSksbi5wbHVnaW5zLmdvb2dsZXBsdXMudHJ5U2lsZW50TG9naW4oe2lPU0FwaUtleTpyfSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxsb2dvdXQ6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7bi5wbHVnaW5zLmdvb2dsZXBsdXMubG9nb3V0KGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0pfSxkaXNjb25uZWN0OmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO24ucGx1Z2lucy5nb29nbGVwbHVzLmRpc2Nvbm5lY3QoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSl9LGlzQXZhaWxhYmxlOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuZ29vZ2xlcGx1cy5pc0F2YWlsYWJsZShmdW5jdGlvbihlKXtlP3IucmVzb2x2ZShlKTpyLnJlamVjdChlKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuaGVhbHRoS2l0XCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUhlYWx0aEtpdFwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57aXNBdmFpbGFibGU6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5oZWFsdGhraXQuYXZhaWxhYmxlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LGNoZWNrQXV0aFN0YXR1czpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8XCJIS1F1YW50aXR5VHlwZUlkZW50aWZpZXJIZWlnaHRcIixuLnBsdWdpbnMuaGVhbHRoa2l0LmNoZWNrQXV0aFN0YXR1cyh7dHlwZTpyfSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxyZXF1ZXN0QXV0aG9yaXphdGlvbjpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gcj1yfHxbXCJIS0NoYXJhY3RlcmlzdGljVHlwZUlkZW50aWZpZXJEYXRlT2ZCaXJ0aFwiLFwiSEtRdWFudGl0eVR5cGVJZGVudGlmaWVyQWN0aXZlRW5lcmd5QnVybmVkXCIsXCJIS1F1YW50aXR5VHlwZUlkZW50aWZpZXJIZWlnaHRcIl0sbz1vfHxbXCJIS1F1YW50aXR5VHlwZUlkZW50aWZpZXJBY3RpdmVFbmVyZ3lCdXJuZWRcIixcIkhLUXVhbnRpdHlUeXBlSWRlbnRpZmllckhlaWdodFwiLFwiSEtRdWFudGl0eVR5cGVJZGVudGlmaWVyRGlzdGFuY2VDeWNsaW5nXCJdLG4ucGx1Z2lucy5oZWFsdGhraXQucmVxdWVzdEF1dGhvcml6YXRpb24oe3JlYWRUeXBlczpyLHdyaXRlVHlwZXM6b30sZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0pLHQucHJvbWlzZX0scmVhZERhdGVPZkJpcnRoOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuaGVhbHRoa2l0LnJlYWREYXRlT2ZCaXJ0aChmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0pLHIucHJvbWlzZX0scmVhZEdlbmRlcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmhlYWx0aGtpdC5yZWFkR2VuZGVyKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSksci5wcm9taXNlfSxzYXZlV2VpZ2h0OmZ1bmN0aW9uKHIsbyx0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5oZWFsdGhraXQuc2F2ZVdlaWdodCh7dW5pdDpvfHxcImxiXCIsYW1vdW50OnIsZGF0ZTp0fHxuZXcgRGF0ZX0sZnVuY3Rpb24oZSl7aS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtpLnJlc29sdmUoZSl9KSxpLnByb21pc2V9LHJlYWRXZWlnaHQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuaGVhbHRoa2l0LnJlYWRXZWlnaHQoe3VuaXQ6cnx8XCJsYlwifSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0pLG8ucHJvbWlzZX0sc2F2ZUhlaWdodDpmdW5jdGlvbihyLG8sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuaGVhbHRoa2l0LnNhdmVIZWlnaHQoe3VuaXQ6b3x8XCJpblwiLGFtb3VudDpyLGRhdGU6dHx8bmV3IERhdGV9LGZ1bmN0aW9uKGUpe2kucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7aS5yZXNvbHZlKGUpfSksaS5wcm9taXNlfSxyZWFkSGVpZ2h0OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmhlYWx0aGtpdC5yZWFkSGVpZ2h0KHt1bml0OnJ8fFwiaW5cIn0sZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9KSxvLnByb21pc2V9LGZpbmRXb3Jrb3V0czpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmhlYWx0aGtpdC5maW5kV29ya291dHMoe30sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9KSxyLnByb21pc2V9LHNhdmVXb3Jrb3V0OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmhlYWx0aGtpdC5zYXZlV29ya291dChyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSksby5wcm9taXNlfSxxdWVyeVNhbXBsZVR5cGU6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuaGVhbHRoa2l0LnF1ZXJ5U2FtcGxlVHlwZShyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSksby5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5odHRwZFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFIdHRwZFwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue3N0YXJ0U2VydmVyOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLkNvckh0dHBkLnN0YXJ0U2VydmVyKG4sZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxzdG9wU2VydmVyOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuQ29ySHR0cGQuc3RvcFNlcnZlcihmdW5jdGlvbigpe24ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe24ucmVqZWN0KCl9KSxuLnByb21pc2V9LGdldFVSTDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLkNvckh0dHBkLmdldFVSTChmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKCl7bi5yZWplY3QoKX0pLG4ucHJvbWlzZX0sZ2V0TG9jYWxQYXRoOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuQ29ySHR0cGQuZ2V0TG9jYWxQYXRoKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oKXtuLnJlamVjdCgpfSksbi5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5pQWRcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhaUFkXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntzZXRPcHRpb25zOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5pQWQuc2V0T3B0aW9ucyhyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sY3JlYXRlQmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5pQWQuY3JlYXRlQmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxyZW1vdmVCYW5uZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uaUFkLnJlbW92ZUJhbm5lcihmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHNob3dCYW5uZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmlBZC5zaG93QmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93QmFubmVyQXRYWTpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi5pQWQuc2hvd0Jhbm5lckF0WFkocixvLGZ1bmN0aW9uKCl7dC5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7dC5yZWplY3QoKX0pLHQucHJvbWlzZX0saGlkZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5pQWQuaGlkZUJhbm5lcihmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHByZXBhcmVJbnRlcnN0aXRpYWw6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmlBZC5wcmVwYXJlSW50ZXJzdGl0aWFsKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93SW50ZXJzdGl0aWFsOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmlBZC5zaG93SW50ZXJzdGl0aWFsKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuaW1hZ2VQaWNrZXJcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhSW1hZ2VQaWNrZXJcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2dldFBpY3R1cmVzOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5pbWFnZVBpY2tlci5nZXRQaWN0dXJlcyhmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSxyKSxvLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmluQXBwQnJvd3NlclwiLFtdKS5wcm92aWRlcihcIiRjb3Jkb3ZhSW5BcHBCcm93c2VyXCIsW2Z1bmN0aW9uKCl7dmFyIGUsbj10aGlzLmRlZmF1bHRPcHRpb25zPXt9O3RoaXMuc2V0RGVmYXVsdE9wdGlvbnM9ZnVuY3Rpb24oZSl7bj1hbmd1bGFyLmV4dGVuZChuLGUpfSx0aGlzLiRnZXQ9W1wiJHJvb3RTY29wZVwiLFwiJHFcIixcIiR3aW5kb3dcIixcIiR0aW1lb3V0XCIsZnVuY3Rpb24ocixvLHQsaSl7cmV0dXJue29wZW46ZnVuY3Rpb24oYSxjLHUpe3ZhciBzPW8uZGVmZXIoKTtpZih1JiYhYW5ndWxhci5pc09iamVjdCh1KSlyZXR1cm4gcy5yZWplY3QoXCJvcHRpb25zIG11c3QgYmUgYW4gb2JqZWN0XCIpLHMucHJvbWlzZTt2YXIgbD1hbmd1bGFyLmV4dGVuZCh7fSxuLHUpLGY9W107YW5ndWxhci5mb3JFYWNoKGwsZnVuY3Rpb24oZSxuKXtmLnB1c2gobitcIj1cIitlKX0pO3ZhciBkPWYuam9pbigpO3JldHVybiBlPXQub3BlbihhLGMsZCksZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZHN0YXJ0XCIsZnVuY3Rpb24oZSl7aShmdW5jdGlvbigpe3IuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhSW5BcHBCcm93c2VyOmxvYWRzdGFydFwiLGUpfSl9LCExKSxlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2Fkc3RvcFwiLGZ1bmN0aW9uKGUpe3MucmVzb2x2ZShlKSxpKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFJbkFwcEJyb3dzZXI6bG9hZHN0b3BcIixlKX0pfSwhMSksZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVycm9yXCIsZnVuY3Rpb24oZSl7cy5yZWplY3QoZSksaShmdW5jdGlvbigpe3IuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhSW5BcHBCcm93c2VyOmxvYWRlcnJvclwiLGUpfSl9LCExKSxlLmFkZEV2ZW50TGlzdGVuZXIoXCJleGl0XCIsZnVuY3Rpb24oZSl7aShmdW5jdGlvbigpe3IuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhSW5BcHBCcm93c2VyOmV4aXRcIixlKX0pfSwhMSkscy5wcm9taXNlfSxjbG9zZTpmdW5jdGlvbigpe2UuY2xvc2UoKSxlPW51bGx9LHNob3c6ZnVuY3Rpb24oKXtlLnNob3coKX0sZXhlY3V0ZVNjcmlwdDpmdW5jdGlvbihuKXt2YXIgcj1vLmRlZmVyKCk7cmV0dXJuIGUuZXhlY3V0ZVNjcmlwdChuLGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0pLHIucHJvbWlzZX0saW5zZXJ0Q1NTOmZ1bmN0aW9uKG4pe3ZhciByPW8uZGVmZXIoKTtyZXR1cm4gZS5pbnNlcnRDU1MobixmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9KSxyLnByb21pc2V9fX1dfV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuaW5zb21uaWFcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhSW5zb21uaWFcIixbXCIkd2luZG93XCIsZnVuY3Rpb24oZSl7cmV0dXJue2tlZXBBd2FrZTpmdW5jdGlvbigpe3JldHVybiBlLnBsdWdpbnMuaW5zb21uaWEua2VlcEF3YWtlKCl9LGFsbG93U2xlZXBBZ2FpbjpmdW5jdGlvbigpe3JldHVybiBlLnBsdWdpbnMuaW5zb21uaWEuYWxsb3dTbGVlcEFnYWluKCl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmluc3RhZ3JhbVwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFJbnN0YWdyYW1cIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntzaGFyZTpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIHdpbmRvdy5JbnN0YWdyYW0/KEluc3RhZ3JhbS5zaGFyZShuLmltYWdlLG4uY2FwdGlvbixmdW5jdGlvbihlKXtlP3IucmVqZWN0KGUpOnIucmVzb2x2ZSghMCl9KSxyLnByb21pc2UpOihjb25zb2xlLmVycm9yKFwiVHJpZWQgdG8gY2FsbCBJbnN0YWdyYW0uc2hhcmUgYnV0IHRoZSBJbnN0YWdyYW0gcGx1Z2luIGlzbid0IGluc3RhbGxlZCFcIiksci5yZXNvbHZlKG51bGwpLHIucHJvbWlzZSl9LGlzSW5zdGFsbGVkOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiB3aW5kb3cuSW5zdGFncmFtPyhJbnN0YWdyYW0uaXNJbnN0YWxsZWQoZnVuY3Rpb24oZSxyKXtlP24ucmVqZWN0KGUpOm4ucmVzb2x2ZShyKX0pLG4ucHJvbWlzZSk6KGNvbnNvbGUuZXJyb3IoXCJUcmllZCB0byBjYWxsIEluc3RhZ3JhbS5pc0luc3RhbGxlZCBidXQgdGhlIEluc3RhZ3JhbSBwbHVnaW4gaXNuJ3QgaW5zdGFsbGVkIVwiKSxuLnJlc29sdmUobnVsbCksbi5wcm9taXNlKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMua2V5Ym9hcmRcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhS2V5Ym9hcmRcIixbXCIkcm9vdFNjb3BlXCIsZnVuY3Rpb24oZSl7dmFyIG49ZnVuY3Rpb24oKXtlLiRldmFsQXN5bmMoZnVuY3Rpb24oKXtlLiRicm9hZGNhc3QoXCIkY29yZG92YUtleWJvYXJkOnNob3dcIil9KX0scj1mdW5jdGlvbigpe2UuJGV2YWxBc3luYyhmdW5jdGlvbigpe2UuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhS2V5Ym9hcmQ6aGlkZVwiKX0pfTtyZXR1cm4gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRldmljZXJlYWR5XCIsZnVuY3Rpb24oKXtjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQmJih3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm5hdGl2ZS5rZXlib2FyZHNob3dcIixuLCExKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm5hdGl2ZS5rZXlib2FyZGhpZGVcIixyLCExKSl9KSx7aGlkZUFjY2Vzc29yeUJhcjpmdW5jdGlvbihlKXtyZXR1cm4gY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcihlKX0sY2xvc2U6ZnVuY3Rpb24oKXtyZXR1cm4gY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmNsb3NlKCl9LHNob3c6ZnVuY3Rpb24oKXtyZXR1cm4gY29yZG92YS5wbHVnaW5zLktleWJvYXJkLnNob3coKX0sZGlzYWJsZVNjcm9sbDpmdW5jdGlvbihlKXtyZXR1cm4gY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwoZSl9LGlzVmlzaWJsZTpmdW5jdGlvbigpe3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaXNWaXNpYmxlfSxjbGVhclNob3dXYXRjaDpmdW5jdGlvbigpe2RvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJuYXRpdmUua2V5Ym9hcmRzaG93XCIsbiksZS4kJGxpc3RlbmVyc1tcIiRjb3Jkb3ZhS2V5Ym9hcmQ6c2hvd1wiXT1bXX0sY2xlYXJIaWRlV2F0Y2g6ZnVuY3Rpb24oKXtkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibmF0aXZlLmtleWJvYXJkaGlkZVwiLHIpLGUuJCRsaXN0ZW5lcnNbXCIkY29yZG92YUtleWJvYXJkOmhpZGVcIl09W119fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmtleWNoYWluXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUtleWNoYWluXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57Z2V0Rm9yS2V5OmZ1bmN0aW9uKG4scil7dmFyIG89ZS5kZWZlcigpLHQ9bmV3IEtleWNoYWluO3JldHVybiB0LmdldEZvcktleShvLnJlc29sdmUsby5yZWplY3QsbixyKSxvLnByb21pc2V9LHNldEZvcktleTpmdW5jdGlvbihuLHIsbyl7dmFyIHQ9ZS5kZWZlcigpLGk9bmV3IEtleWNoYWluO3JldHVybiBpLnNldEZvcktleSh0LnJlc29sdmUsdC5yZWplY3QsbixyLG8pLHQucHJvbWlzZX0scmVtb3ZlRm9yS2V5OmZ1bmN0aW9uKG4scil7dmFyIG89ZS5kZWZlcigpLHQ9bmV3IEtleWNoYWluO3JldHVybiB0LnJlbW92ZUZvcktleShvLnJlc29sdmUsby5yZWplY3QsbixyKSxvLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmxhdW5jaE5hdmlnYXRvclwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFMYXVuY2hOYXZpZ2F0b3JcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntuYXZpZ2F0ZTpmdW5jdGlvbihuLHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBsYXVuY2huYXZpZ2F0b3IubmF2aWdhdGUobixyLGZ1bmN0aW9uKCl7dC5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSxvKSx0LnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmxvY2FsTm90aWZpY2F0aW9uXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUxvY2FsTm90aWZpY2F0aW9uXCIsW1wiJHFcIixcIiR3aW5kb3dcIixcIiRyb290U2NvcGVcIixcIiR0aW1lb3V0XCIsZnVuY3Rpb24oZSxuLHIsbyl7cmV0dXJuIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkZXZpY2VyZWFkeVwiLGZ1bmN0aW9uKCl7bi5jb3Jkb3ZhJiZuLmNvcmRvdmEucGx1Z2lucyYmbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uJiZuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwmJihuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwub24oXCJzY2hlZHVsZVwiLGZ1bmN0aW9uKGUsbil7byhmdW5jdGlvbigpe3IuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhTG9jYWxOb3RpZmljYXRpb246c2NoZWR1bGVcIixlLG4pfSl9KSxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwub24oXCJ0cmlnZ2VyXCIsZnVuY3Rpb24oZSxuKXtvKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFMb2NhbE5vdGlmaWNhdGlvbjp0cmlnZ2VyXCIsZSxuKX0pfSksbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLm9uKFwidXBkYXRlXCIsZnVuY3Rpb24oZSxuKXtvKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFMb2NhbE5vdGlmaWNhdGlvbjp1cGRhdGVcIixlLG4pfSl9KSxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwub24oXCJjbGVhclwiLGZ1bmN0aW9uKGUsbil7byhmdW5jdGlvbigpe3IuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhTG9jYWxOb3RpZmljYXRpb246Y2xlYXJcIixlLG4pfSl9KSxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwub24oXCJjbGVhcmFsbFwiLGZ1bmN0aW9uKGUpe28oZnVuY3Rpb24oKXtyLiRicm9hZGNhc3QoXCIkY29yZG92YUxvY2FsTm90aWZpY2F0aW9uOmNsZWFyYWxsXCIsZSl9KX0pLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5vbihcImNhbmNlbFwiLGZ1bmN0aW9uKGUsbil7byhmdW5jdGlvbigpe3IuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhTG9jYWxOb3RpZmljYXRpb246Y2FuY2VsXCIsZSxuKX0pfSksbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLm9uKFwiY2FuY2VsYWxsXCIsZnVuY3Rpb24oZSl7byhmdW5jdGlvbigpe3IuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhTG9jYWxOb3RpZmljYXRpb246Y2FuY2VsYWxsXCIsZSl9KX0pLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5vbihcImNsaWNrXCIsZnVuY3Rpb24oZSxuKXtvKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFMb2NhbE5vdGlmaWNhdGlvbjpjbGlja1wiLGUsbil9KX0pKX0sITEpLHtzY2hlZHVsZTpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbz1vfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5zY2hlZHVsZShyLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sbyksdC5wcm9taXNlfSxhZGQ6ZnVuY3Rpb24ocixvKXtjb25zb2xlLndhcm4oJ0RlcHJlY2F0ZWQ6IHVzZSBcInNjaGVkdWxlXCIgaW5zdGVhZC4nKTt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuc2NoZWR1bGUocixmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LG8pLHQucHJvbWlzZX0sdXBkYXRlOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLnVwZGF0ZShyLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sbyksdC5wcm9taXNlfSxjbGVhcjpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtcbnJldHVybiBvPW98fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmNsZWFyKHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxvKSx0LnByb21pc2V9LGNsZWFyQWxsOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gcj1yfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5jbGVhckFsbChmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LHIpLG8ucHJvbWlzZX0sY2FuY2VsOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmNhbmNlbChyLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sbyksdC5wcm9taXNlfSxjYW5jZWxBbGw6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmNhbmNlbEFsbChmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LHIpLG8ucHJvbWlzZX0saXNQcmVzZW50OmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmlzUHJlc2VudChyLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sbyksdC5wcm9taXNlfSxpc1NjaGVkdWxlZDpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbz1vfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5pc1NjaGVkdWxlZChyLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sbyksdC5wcm9taXNlfSxpc1RyaWdnZXJlZDpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbz1vfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5pc1RyaWdnZXJlZChyLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sbyksdC5wcm9taXNlfSxoYXNQZXJtaXNzaW9uOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gcj1yfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5oYXNQZXJtaXNzaW9uKGZ1bmN0aW9uKGUpe2U/by5yZXNvbHZlKGUpOm8ucmVqZWN0KGUpfSxyKSxvLnByb21pc2V9LHJlZ2lzdGVyUGVybWlzc2lvbjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwucmVnaXN0ZXJQZXJtaXNzaW9uKGZ1bmN0aW9uKGUpe2U/by5yZXNvbHZlKGUpOm8ucmVqZWN0KGUpfSxyKSxvLnByb21pc2V9LHByb21wdEZvclBlcm1pc3Npb246ZnVuY3Rpb24ocil7Y29uc29sZS53YXJuKCdEZXByZWNhdGVkOiB1c2UgXCJyZWdpc3RlclBlcm1pc3Npb25cIiBpbnN0ZWFkLicpO3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gcj1yfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5yZWdpc3RlclBlcm1pc3Npb24oZnVuY3Rpb24oZSl7ZT9vLnJlc29sdmUoZSk6by5yZWplY3QoZSl9LHIpLG8ucHJvbWlzZX0sZ2V0QWxsSWRzOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gcj1yfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5nZXRBbGxJZHMoZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxyKSxvLnByb21pc2V9LGdldElkczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuZ2V0SWRzKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sciksby5wcm9taXNlfSxnZXRTY2hlZHVsZWRJZHM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmdldFNjaGVkdWxlZElkcyhmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LHIpLG8ucHJvbWlzZX0sZ2V0VHJpZ2dlcmVkSWRzOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gcj1yfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5nZXRUcmlnZ2VyZWRJZHMoZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxyKSxvLnByb21pc2V9LGdldDpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbz1vfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5nZXQocixmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LG8pLHQucHJvbWlzZX0sZ2V0QWxsOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gcj1yfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5nZXRBbGwoZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxyKSxvLnByb21pc2V9LGdldFNjaGVkdWxlZDpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbz1vfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5nZXRTY2hlZHVsZWQocixmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LG8pLHQucHJvbWlzZX0sZ2V0QWxsU2NoZWR1bGVkOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gcj1yfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5nZXRBbGxTY2hlZHVsZWQoZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxyKSxvLnByb21pc2V9LGdldFRyaWdnZXJlZDpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbz1vfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5nZXRUcmlnZ2VyZWQocixmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LG8pLHQucHJvbWlzZX0sZ2V0QWxsVHJpZ2dlcmVkOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gcj1yfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5nZXRBbGxUcmlnZ2VyZWQoZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxyKSxvLnByb21pc2V9LGdldERlZmF1bHRzOmZ1bmN0aW9uKCl7cmV0dXJuIG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5nZXREZWZhdWx0cygpfSxzZXREZWZhdWx0czpmdW5jdGlvbihlKXtuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuc2V0RGVmYXVsdHMoZSl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLm1NZWRpYUFkc1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFNTWVkaWFBZHNcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3NldE9wdGlvbnM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLm1NZWRpYS5zZXRPcHRpb25zKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxjcmVhdGVCYW5uZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLm1NZWRpYS5jcmVhdGVCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHJlbW92ZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5tTWVkaWEucmVtb3ZlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0sc2hvd0Jhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ubU1lZGlhLnNob3dCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dCYW5uZXJBdFhZOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLm1NZWRpYS5zaG93QmFubmVyQXRYWShyLG8sZnVuY3Rpb24oKXt0LnJlc29sdmUoKX0sZnVuY3Rpb24oKXt0LnJlamVjdCgpfSksdC5wcm9taXNlfSxoaWRlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLm1NZWRpYS5oaWRlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0scHJlcGFyZUludGVyc3RpdGlhbDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ubU1lZGlhLnByZXBhcmVJbnRlcnN0aXRpYWwocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dJbnRlcnN0aXRpYWw6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ubU1lZGlhLnNob3dJbnRlcnN0aXRpYWwoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5tZWRpYVwiLFtdKS5zZXJ2aWNlKFwiTmV3TWVkaWFcIixbXCIkcVwiLFwiJGludGVydmFsXCIsZnVuY3Rpb24oZSxuKXtmdW5jdGlvbiByKGUpe2FuZ3VsYXIuaXNEZWZpbmVkKHMpfHwocz1uKGZ1bmN0aW9uKCl7MD5kJiYoZD1lLmdldER1cmF0aW9uKCksYSYmZD4wJiZhLm5vdGlmeSh7ZHVyYXRpb246ZH0pKSxlLmdldEN1cnJlbnRQb3NpdGlvbihmdW5jdGlvbihlKXtlPi0xJiYoZj1lKX0sZnVuY3Rpb24oZSl7Y29uc29sZS5sb2coXCJFcnJvciBnZXR0aW5nIHBvcz1cIitlKX0pLGEmJmEubm90aWZ5KHtwb3NpdGlvbjpmfSl9LDFlMykpfWZ1bmN0aW9uIG8oKXthbmd1bGFyLmlzRGVmaW5lZChzKSYmKG4uY2FuY2VsKHMpLHM9dm9pZCAwKX1mdW5jdGlvbiB0KCl7Zj0tMSxkPS0xfWZ1bmN0aW9uIGkoZSl7dGhpcy5tZWRpYT1uZXcgTWVkaWEoZSxmdW5jdGlvbihlKXtvKCksdCgpLGEucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bygpLHQoKSxhLnJlamVjdChlKX0sZnVuY3Rpb24oZSl7bD1lLGEubm90aWZ5KHtzdGF0dXM6bH0pfSl9dmFyIGEsYyx1LHMsbD1udWxsLGY9LTEsZD0tMTtyZXR1cm4gaS5wcm90b3R5cGUucGxheT1mdW5jdGlvbihuKXtyZXR1cm4gYT1lLmRlZmVyKCksXCJvYmplY3RcIiE9dHlwZW9mIG4mJihuPXt9KSx0aGlzLm1lZGlhLnBsYXkobikscih0aGlzLm1lZGlhKSxhLnByb21pc2V9LGkucHJvdG90eXBlLnBhdXNlPWZ1bmN0aW9uKCl7bygpLHRoaXMubWVkaWEucGF1c2UoKX0saS5wcm90b3R5cGUuc3RvcD1mdW5jdGlvbigpe3RoaXMubWVkaWEuc3RvcCgpfSxpLnByb3RvdHlwZS5yZWxlYXNlPWZ1bmN0aW9uKCl7dGhpcy5tZWRpYS5yZWxlYXNlKCksdGhpcy5tZWRpYT12b2lkIDB9LGkucHJvdG90eXBlLnNlZWtUbz1mdW5jdGlvbihlKXt0aGlzLm1lZGlhLnNlZWtUbyhlKX0saS5wcm90b3R5cGUuc2V0Vm9sdW1lPWZ1bmN0aW9uKGUpe3RoaXMubWVkaWEuc2V0Vm9sdW1lKGUpfSxpLnByb3RvdHlwZS5zdGFydFJlY29yZD1mdW5jdGlvbigpe3RoaXMubWVkaWEuc3RhcnRSZWNvcmQoKX0saS5wcm90b3R5cGUuc3RvcFJlY29yZD1mdW5jdGlvbigpe3RoaXMubWVkaWEuc3RvcFJlY29yZCgpfSxpLnByb3RvdHlwZS5jdXJyZW50VGltZT1mdW5jdGlvbigpe3JldHVybiBjPWUuZGVmZXIoKSx0aGlzLm1lZGlhLmdldEN1cnJlbnRQb3NpdGlvbihmdW5jdGlvbihlKXtjLnJlc29sdmUoZSl9KSxjLnByb21pc2V9LGkucHJvdG90eXBlLmdldER1cmF0aW9uPWZ1bmN0aW9uKCl7cmV0dXJuIHU9ZS5kZWZlcigpLHRoaXMubWVkaWEuZ2V0RHVyYXRpb24oZnVuY3Rpb24oZSl7dS5yZXNvbHZlKGUpfSksdS5wcm9taXNlfSxpfV0pLmZhY3RvcnkoXCIkY29yZG92YU1lZGlhXCIsW1wiTmV3TWVkaWFcIixmdW5jdGlvbihlKXtyZXR1cm57bmV3TWVkaWE6ZnVuY3Rpb24obil7cmV0dXJuIG5ldyBlKG4pfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5tb2Jmb3hBZHNcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhTW9iRm94QWRzXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntzZXRPcHRpb25zOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb2JGb3guc2V0T3B0aW9ucyhyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sY3JlYXRlQmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb2JGb3guY3JlYXRlQmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxyZW1vdmVCYW5uZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uTW9iRm94LnJlbW92ZUJhbm5lcihmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHNob3dCYW5uZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLk1vYkZveC5zaG93QmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93QmFubmVyQXRYWTpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi5Nb2JGb3guc2hvd0Jhbm5lckF0WFkocixvLGZ1bmN0aW9uKCl7dC5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7dC5yZWplY3QoKX0pLHQucHJvbWlzZX0saGlkZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb2JGb3guaGlkZUJhbm5lcihmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHByZXBhcmVJbnRlcnN0aXRpYWw6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLk1vYkZveC5wcmVwYXJlSW50ZXJzdGl0aWFsKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93SW50ZXJzdGl0aWFsOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLk1vYkZveC5zaG93SW50ZXJzdGl0aWFsKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnNcIixbXCJuZ0NvcmRvdmEucGx1Z2lucy4zZHRvdWNoXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5hY3Rpb25TaGVldFwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuYWRNb2JcIixcIm5nQ29yZG92YS5wbHVnaW5zLmFwcEF2YWlsYWJpbGl0eVwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuYXBwUmF0ZVwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuYXBwVmVyc2lvblwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuYmFja2dyb3VuZEdlb2xvY2F0aW9uXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5iYWRnZVwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuYmFyY29kZVNjYW5uZXJcIixcIm5nQ29yZG92YS5wbHVnaW5zLmJhdHRlcnlTdGF0dXNcIixcIm5nQ29yZG92YS5wbHVnaW5zLmJlYWNvblwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuYmxlXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5ibHVldG9vdGhTZXJpYWxcIixcIm5nQ29yZG92YS5wbHVnaW5zLmJyaWdodG5lc3NcIixcIm5nQ29yZG92YS5wbHVnaW5zLmNhbGVuZGFyXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5jYW1lcmFcIixcIm5nQ29yZG92YS5wbHVnaW5zLmNhcHR1cmVcIixcIm5nQ29yZG92YS5wbHVnaW5zLmNsaXBib2FyZFwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuY29udGFjdHNcIixcIm5nQ29yZG92YS5wbHVnaW5zLmRhdGVQaWNrZXJcIixcIm5nQ29yZG92YS5wbHVnaW5zLmRldmljZVwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZGV2aWNlTW90aW9uXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5kZXZpY2VPcmllbnRhdGlvblwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZGlhbG9nc1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZW1haWxDb21wb3NlclwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmFjZWJvb2tcIixcIm5nQ29yZG92YS5wbHVnaW5zLmZhY2Vib29rQWRzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5maWxlXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5maWxlVHJhbnNmZXJcIixcIm5nQ29yZG92YS5wbHVnaW5zLmZpbGVPcGVuZXIyXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5mbGFzaGxpZ2h0XCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5mbHVycnlBZHNcIixcIm5nQ29yZG92YS5wbHVnaW5zLmdhXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5nZW9sb2NhdGlvblwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ2xvYmFsaXphdGlvblwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ29vZ2xlQWRzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5nb29nbGVBbmFseXRpY3NcIixcIm5nQ29yZG92YS5wbHVnaW5zLmdvb2dsZU1hcFwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ29vZ2xlUGxheUdhbWVcIixcIm5nQ29yZG92YS5wbHVnaW5zLmdvb2dsZVBsdXNcIixcIm5nQ29yZG92YS5wbHVnaW5zLmhlYWx0aEtpdFwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuaHR0cGRcIixcIm5nQ29yZG92YS5wbHVnaW5zLmlBZFwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuaW1hZ2VQaWNrZXJcIixcIm5nQ29yZG92YS5wbHVnaW5zLmluQXBwQnJvd3NlclwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuaW5zdGFncmFtXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5rZXlib2FyZFwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMua2V5Y2hhaW5cIixcIm5nQ29yZG92YS5wbHVnaW5zLmxhdW5jaE5hdmlnYXRvclwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMubG9jYWxOb3RpZmljYXRpb25cIixcIm5nQ29yZG92YS5wbHVnaW5zLm1lZGlhXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5tTWVkaWFBZHNcIixcIm5nQ29yZG92YS5wbHVnaW5zLm1vYmZveEFkc1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMubW9wdWJBZHNcIixcIm5nQ29yZG92YS5wbHVnaW5zLm5hdGl2ZUF1ZGlvXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5uZXR3b3JrXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5waW5EaWFsb2dcIixcIm5nQ29yZG92YS5wbHVnaW5zLnByZWZlcmVuY2VzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5wcmludGVyXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5wcm9ncmVzc0luZGljYXRvclwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMucHVzaFwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMucHVzaF92NVwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuc21zXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5zb2NpYWxTaGFyaW5nXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5zcGlubmVyRGlhbG9nXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5zcGxhc2hzY3JlZW5cIixcIm5nQ29yZG92YS5wbHVnaW5zLnNxbGl0ZVwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuc3RhdHVzYmFyXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy50b2FzdFwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMudG91Y2hpZFwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMudmlicmF0aW9uXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy52aWRlb0NhcHR1cmVQbHVzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy56aXBcIixcIm5nQ29yZG92YS5wbHVnaW5zLmluc29tbmlhXCJdKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLm1vcHViQWRzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YU1vUHViQWRzXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntzZXRPcHRpb25zOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb1B1Yi5zZXRPcHRpb25zKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxjcmVhdGVCYW5uZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLk1vUHViLmNyZWF0ZUJhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0scmVtb3ZlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLk1vUHViLnJlbW92ZUJhbm5lcihmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHNob3dCYW5uZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLk1vUHViLnNob3dCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dCYW5uZXJBdFhZOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLk1vUHViLnNob3dCYW5uZXJBdFhZKHIsbyxmdW5jdGlvbigpe3QucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3QucmVqZWN0KCl9KSx0LnByb21pc2V9LGhpZGVCYW5uZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uTW9QdWIuaGlkZUJhbm5lcihmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHByZXBhcmVJbnRlcnN0aXRpYWw6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLk1vUHViLnByZXBhcmVJbnRlcnN0aXRpYWwocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dJbnRlcnN0aXRpYWw6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uTW9QdWIuc2hvd0ludGVyc3RpdGlhbChmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLm5hdGl2ZUF1ZGlvXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YU5hdGl2ZUF1ZGlvXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntwcmVsb2FkU2ltcGxlOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuTmF0aXZlQXVkaW8ucHJlbG9hZFNpbXBsZShyLG8sZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0pLHQucHJvbWlzZX0scHJlbG9hZENvbXBsZXg6ZnVuY3Rpb24ocixvLHQsaSxhKXt2YXIgYz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5OYXRpdmVBdWRpby5wcmVsb2FkQ29tcGxleChyLG8sdCxpLGEsZnVuY3Rpb24oZSl7Yy5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtjLnJlamVjdChlKX0pLGMucHJvbWlzZX0scGxheTpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLk5hdGl2ZUF1ZGlvLnBsYXkocixmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSxvKSx0LnByb21pc2V9LHN0b3A6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuTmF0aXZlQXVkaW8uc3RvcChyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGxvb3A6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuTmF0aXZlQXVkaW8ubG9vcChyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHVubG9hZDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5OYXRpdmVBdWRpby51bmxvYWQocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxzZXRWb2x1bWVGb3JDb21wbGV4QXNzZXQ6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5OYXRpdmVBdWRpby5zZXRWb2x1bWVGb3JDb21wbGV4QXNzZXQocixvLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7dC5yZWplY3QoZSl9KSx0LnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLm5ldHdvcmtcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhTmV0d29ya1wiLFtcIiRyb290U2NvcGVcIixcIiR0aW1lb3V0XCIsZnVuY3Rpb24oZSxuKXt2YXIgcj1mdW5jdGlvbigpe3ZhciByPW5hdmlnYXRvci5jb25uZWN0aW9uLnR5cGU7bihmdW5jdGlvbigpe2UuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhTmV0d29yazpvZmZsaW5lXCIscil9KX0sbz1mdW5jdGlvbigpe3ZhciByPW5hdmlnYXRvci5jb25uZWN0aW9uLnR5cGU7bihmdW5jdGlvbigpe2UuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhTmV0d29yazpvbmxpbmVcIixyKX0pfTtyZXR1cm4gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRldmljZXJlYWR5XCIsZnVuY3Rpb24oKXtuYXZpZ2F0b3IuY29ubmVjdGlvbiYmKGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJvZmZsaW5lXCIsciwhMSksZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm9ubGluZVwiLG8sITEpKX0pLHtnZXROZXR3b3JrOmZ1bmN0aW9uKCl7cmV0dXJuIG5hdmlnYXRvci5jb25uZWN0aW9uLnR5cGV9LGlzT25saW5lOmZ1bmN0aW9uKCl7dmFyIGU9bmF2aWdhdG9yLmNvbm5lY3Rpb24udHlwZTtyZXR1cm4gZSE9PUNvbm5lY3Rpb24uVU5LTk9XTiYmZSE9PUNvbm5lY3Rpb24uTk9ORX0saXNPZmZsaW5lOmZ1bmN0aW9uKCl7dmFyIGU9bmF2aWdhdG9yLmNvbm5lY3Rpb24udHlwZTtyZXR1cm4gZT09PUNvbm5lY3Rpb24uVU5LTk9XTnx8ZT09PUNvbm5lY3Rpb24uTk9ORX0sY2xlYXJPZmZsaW5lV2F0Y2g6ZnVuY3Rpb24oKXtkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwib2ZmbGluZVwiLHIpLGUuJCRsaXN0ZW5lcnNbXCIkY29yZG92YU5ldHdvcms6b2ZmbGluZVwiXT1bXX0sY2xlYXJPbmxpbmVXYXRjaDpmdW5jdGlvbigpe2RvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJvbmxpbmVcIixvKSxlLiQkbGlzdGVuZXJzW1wiJGNvcmRvdmFOZXR3b3JrOm9ubGluZVwiXT1bXX19fV0pLnJ1bihbXCIkaW5qZWN0b3JcIixmdW5jdGlvbihlKXtlLmdldChcIiRjb3Jkb3ZhTmV0d29ya1wiKX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnBpbkRpYWxvZ1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFQaW5EaWFsb2dcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3Byb21wdDpmdW5jdGlvbihyLG8sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMucGluRGlhbG9nLnByb21wdChyLGZ1bmN0aW9uKGUpe2kucmVzb2x2ZShlKX0sbyx0KSxpLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnByZWZlcmVuY2VzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVByZWZlcmVuY2VzXCIsW1wiJHdpbmRvd1wiLFwiJHFcIixmdW5jdGlvbihlLG4pe3JldHVybntwbHVnaW5Ob3RFbmFibGVkTWVzc2FnZTpcIlBsdWdpbiBub3QgZW5hYmxlZFwiLGRlY29yYXRlUHJvbWlzZTpmdW5jdGlvbihlKXtlLnN1Y2Nlc3M9ZnVuY3Rpb24obil7cmV0dXJuIGUudGhlbihuKSxlfSxlLmVycm9yPWZ1bmN0aW9uKG4pe3JldHVybiBlLnRoZW4obnVsbCxuKSxlfX0sc3RvcmU6ZnVuY3Rpb24ocixvLHQpe2Z1bmN0aW9uIGkoZSl7Yy5yZXNvbHZlKGUpfWZ1bmN0aW9uIGEoZSl7Yy5yZWplY3QobmV3IEVycm9yKGUpKX12YXIgYz1uLmRlZmVyKCksdT1jLnByb21pc2U7aWYoZS5wbHVnaW5zKXt2YXIgcztzPTM9PT1hcmd1bWVudHMubGVuZ3RoP2UucGx1Z2lucy5hcHBQcmVmZXJlbmNlcy5zdG9yZSh0LHIsbyk6ZS5wbHVnaW5zLmFwcFByZWZlcmVuY2VzLnN0b3JlKHIsbykscy50aGVuKGksYSl9ZWxzZSBjLnJlamVjdChuZXcgRXJyb3IodGhpcy5wbHVnaW5Ob3RFbmFibGVkTWVzc2FnZSkpO3JldHVybiB0aGlzLmRlY29yYXRlUHJvbWlzZSh1KSx1fSxmZXRjaDpmdW5jdGlvbihyLG8pe2Z1bmN0aW9uIHQoZSl7YS5yZXNvbHZlKGUpfWZ1bmN0aW9uIGkoZSl7YS5yZWplY3QobmV3IEVycm9yKGUpKX12YXIgYT1uLmRlZmVyKCksYz1hLnByb21pc2U7aWYoZS5wbHVnaW5zKXt2YXIgdTt1PTI9PT1hcmd1bWVudHMubGVuZ3RoP2UucGx1Z2lucy5hcHBQcmVmZXJlbmNlcy5mZXRjaChvLHIpOmUucGx1Z2lucy5hcHBQcmVmZXJlbmNlcy5mZXRjaChyKSx1LnRoZW4odCxpKX1lbHNlIGEucmVqZWN0KG5ldyBFcnJvcih0aGlzLnBsdWdpbk5vdEVuYWJsZWRNZXNzYWdlKSk7cmV0dXJuIHRoaXMuZGVjb3JhdGVQcm9taXNlKGMpLGN9LHJlbW92ZTpmdW5jdGlvbihyLG8pe2Z1bmN0aW9uIHQoZSl7YS5yZXNvbHZlKGUpfWZ1bmN0aW9uIGkoZSl7YS5yZWplY3QobmV3IEVycm9yKGUpKX12YXIgYT1uLmRlZmVyKCksYz1hLnByb21pc2U7aWYoZS5wbHVnaW5zKXt2YXIgdTt1PTI9PT1hcmd1bWVudHMubGVuZ3RoP2UucGx1Z2lucy5hcHBQcmVmZXJlbmNlcy5yZW1vdmUobyxyKTplLnBsdWdpbnMuYXBwUHJlZmVyZW5jZXMucmVtb3ZlKHIpLHUudGhlbih0LGkpfWVsc2UgYS5yZWplY3QobmV3IEVycm9yKHRoaXMucGx1Z2luTm90RW5hYmxlZE1lc3NhZ2UpKTtyZXR1cm4gdGhpcy5kZWNvcmF0ZVByb21pc2UoYyksY30sc2hvdzpmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSl7dC5yZXNvbHZlKGUpfWZ1bmN0aW9uIG8oZSl7dC5yZWplY3QobmV3IEVycm9yKGUpKX12YXIgdD1uLmRlZmVyKCksaT10LnByb21pc2U7cmV0dXJuIGUucGx1Z2lucz9lLnBsdWdpbnMuYXBwUHJlZmVyZW5jZXMuc2hvdygpLnRoZW4ocixvKTp0LnJlamVjdChuZXcgRXJyb3IodGhpcy5wbHVnaW5Ob3RFbmFibGVkTWVzc2FnZSkpLHRoaXMuZGVjb3JhdGVQcm9taXNlKGkpLGl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnByaW50ZXJcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhUHJpbnRlclwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57aXNBdmFpbGFibGU6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2luLnByaW50ZXIuaXNBdmFpbGFibGUoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSksci5wcm9taXNlfSxwcmludDpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW4ucHJpbnRlci5wcmludChyLG8sZnVuY3Rpb24oKXt0LnJlc29sdmUoKX0pLHQucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMucHJvZ3Jlc3NJbmRpY2F0b3JcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhUHJvZ3Jlc3NcIixbZnVuY3Rpb24oKXtyZXR1cm57c2hvdzpmdW5jdGlvbihlKXt2YXIgbj1lfHxcIlBsZWFzZSB3YWl0Li4uXCI7cmV0dXJuIFByb2dyZXNzSW5kaWNhdG9yLnNob3cobil9LHNob3dTaW1wbGU6ZnVuY3Rpb24oZSl7dmFyIG49ZXx8ITE7cmV0dXJuIFByb2dyZXNzSW5kaWNhdG9yLnNob3dTaW1wbGUobil9LHNob3dTaW1wbGVXaXRoTGFiZWw6ZnVuY3Rpb24oZSxuKXt2YXIgcj1lfHwhMSxvPW58fFwiTG9hZGluZy4uLlwiO3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93U2ltcGxlV2l0aExhYmVsKHIsbyl9LHNob3dTaW1wbGVXaXRoTGFiZWxEZXRhaWw6ZnVuY3Rpb24oZSxuLHIpe3ZhciBvPWV8fCExLHQ9bnx8XCJMb2FkaW5nLi4uXCIsaT1yfHxcIlBsZWFzZSB3YWl0XCI7cmV0dXJuIFByb2dyZXNzSW5kaWNhdG9yLnNob3dTaW1wbGVXaXRoTGFiZWxEZXRhaWwobyx0LGkpfSxzaG93RGV0ZXJtaW5hdGU6ZnVuY3Rpb24oZSxuKXt2YXIgcj1lfHwhMSxvPW58fDVlNDtyZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3Iuc2hvd0RldGVybWluYXRlKHIsbyl9LHNob3dEZXRlcm1pbmF0ZVdpdGhMYWJlbDpmdW5jdGlvbihlLG4scil7dmFyIG89ZXx8ITEsdD1ufHw1ZTQsaT1yfHxcIkxvYWRpbmcuLi5cIjtyZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3Iuc2hvd0RldGVybWluYXRlV2l0aExhYmVsKG8sdCxpKX0sc2hvd0FubnVsYXI6ZnVuY3Rpb24oZSxuKXt2YXIgcj1lfHwhMSxvPW58fDVlNDtyZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3Iuc2hvd0FubnVsYXIocixvKX0sc2hvd0FubnVsYXJXaXRoTGFiZWw6ZnVuY3Rpb24oZSxuLHIpe3ZhciBvPWV8fCExLHQ9bnx8NWU0LGk9cnx8XCJMb2FkaW5nLi4uXCI7cmV0dXJuIFByb2dyZXNzSW5kaWNhdG9yLnNob3dBbm51bGFyV2l0aExhYmVsKG8sdCxpKX0sc2hvd0JhcjpmdW5jdGlvbihlLG4pe3ZhciByPWV8fCExLG89bnx8NWU0O3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93QmFyKHIsbyl9LHNob3dCYXJXaXRoTGFiZWw6ZnVuY3Rpb24oZSxuLHIpe3ZhciBvPWV8fCExLHQ9bnx8NWU0LGk9cnx8XCJMb2FkaW5nLi4uXCI7cmV0dXJuIFByb2dyZXNzSW5kaWNhdG9yLnNob3dCYXJXaXRoTGFiZWwobyx0LGkpfSxzaG93U3VjY2VzczpmdW5jdGlvbihlLG4pe3ZhciByPWV8fCExLG89bnx8XCJTdWNjZXNzXCI7cmV0dXJuIFByb2dyZXNzSW5kaWNhdG9yLnNob3dTdWNjZXNzKHIsbyl9LHNob3dUZXh0OmZ1bmN0aW9uKGUsbixyKXt2YXIgbz1lfHwhMSx0PW58fFwiV2FybmluZ1wiLGk9cnx8XCJjZW50ZXJcIjtyZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3Iuc2hvd1RleHQobyx0LGkpfSxoaWRlOmZ1bmN0aW9uKCl7cmV0dXJuIFByb2dyZXNzSW5kaWNhdG9yLmhpZGUoKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMucHVzaFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFQdXNoXCIsW1wiJHFcIixcIiR3aW5kb3dcIixcIiRyb290U2NvcGVcIixcIiR0aW1lb3V0XCIsZnVuY3Rpb24oZSxuLHIsbyl7cmV0dXJue29uTm90aWZpY2F0aW9uOmZ1bmN0aW9uKGUpe28oZnVuY3Rpb24oKXtyLiRicm9hZGNhc3QoXCIkY29yZG92YVB1c2g6bm90aWZpY2F0aW9uUmVjZWl2ZWRcIixlKX0pfSxyZWdpc3RlcjpmdW5jdGlvbihyKXt2YXIgbyx0PWUuZGVmZXIoKTtyZXR1cm4gdm9pZCAwIT09ciYmdm9pZCAwPT09ci5lY2ImJihvPW51bGw9PT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW25nLWFwcF1cIik/XCJkb2N1bWVudC5ib2R5XCI6XCJkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbbmctYXBwXScpXCIsci5lY2I9XCJhbmd1bGFyLmVsZW1lbnQoXCIrbytcIikuaW5qZWN0b3IoKS5nZXQoJyRjb3Jkb3ZhUHVzaCcpLm9uTm90aWZpY2F0aW9uXCIpLG4ucGx1Z2lucy5wdXNoTm90aWZpY2F0aW9uLnJlZ2lzdGVyKGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7dC5yZWplY3QoZSl9LHIpLHQucHJvbWlzZX0sdW5yZWdpc3RlcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5wdXNoTm90aWZpY2F0aW9uLnVucmVnaXN0ZXIoZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0sciksby5wcm9taXNlfSxzZXRCYWRnZU51bWJlcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5wdXNoTm90aWZpY2F0aW9uLnNldEFwcGxpY2F0aW9uSWNvbkJhZGdlTnVtYmVyKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9LHIpLG8ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMucHVzaF92NVwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFQdXNoVjVcIixbXCIkcVwiLFwiJHJvb3RTY29wZVwiLFwiJHRpbWVvdXRcIixmdW5jdGlvbihlLG4scil7dmFyIG87cmV0dXJue2luaXRpYWxpemU6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBvPVB1c2hOb3RpZmljYXRpb24uaW5pdChuKSxyLnJlc29sdmUobyksci5wcm9taXNlfSxvbk5vdGlmaWNhdGlvbjpmdW5jdGlvbigpe3IoZnVuY3Rpb24oKXtvLm9uKFwibm90aWZpY2F0aW9uXCIsZnVuY3Rpb24oZSl7bi4kZW1pdChcIiRjb3Jkb3ZhUHVzaFY1Om5vdGlmaWNhdGlvblJlY2VpdmVkXCIsZSl9KX0pfSxvbkVycm9yOmZ1bmN0aW9uKCl7cihmdW5jdGlvbigpe28ub24oXCJlcnJvclwiLGZ1bmN0aW9uKGUpe24uJGVtaXQoXCIkY29yZG92YVB1c2hWNTplcnJvck9jY3VycmVkXCIsZSl9KX0pfSxyZWdpc3RlcjpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gdm9pZCAwPT09bz9uLnJlamVjdChuZXcgRXJyb3IoXCJpbml0IG11c3QgYmUgY2FsbGVkIGJlZm9yZSBhbnkgb3RoZXIgb3BlcmF0aW9uXCIpKTpvLm9uKFwicmVnaXN0cmF0aW9uXCIsZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUucmVnaXN0cmF0aW9uSWQpfSksbi5wcm9taXNlfSx1bnJlZ2lzdGVyOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiB2b2lkIDA9PT1vP24ucmVqZWN0KG5ldyBFcnJvcihcImluaXQgbXVzdCBiZSBjYWxsZWQgYmVmb3JlIGFueSBvdGhlciBvcGVyYXRpb25cIikpOm8udW5yZWdpc3RlcihmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxnZXRCYWRnZU51bWJlcjpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gdm9pZCAwPT09bz9uLnJlamVjdChuZXcgRXJyb3IoXCJpbml0IG11c3QgYmUgY2FsbGVkIGJlZm9yZSBhbnkgb3RoZXIgb3BlcmF0aW9uXCIpKTpvLmdldEFwcGxpY2F0aW9uSWNvbkJhZGdlTnVtYmVyKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9LHNldEJhZGdlTnVtYmVyOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gdm9pZCAwPT09bz9yLnJlamVjdChuZXcgRXJyb3IoXCJpbml0IG11c3QgYmUgY2FsbGVkIGJlZm9yZSBhbnkgb3RoZXIgb3BlcmF0aW9uXCIpKTpvLnNldEFwcGxpY2F0aW9uSWNvbkJhZGdlTnVtYmVyKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LG4pLHIucHJvbWlzZX0sZmluaXNoOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiB2b2lkIDA9PT1vP24ucmVqZWN0KG5ldyBFcnJvcihcImluaXQgbXVzdCBiZSBjYWxsZWQgYmVmb3JlIGFueSBvdGhlciBvcGVyYXRpb25cIikpOm8uZmluaXNoKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnJlY2VudHNDb250cm9sXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVJlY2VudHNcIixmdW5jdGlvbigpe3JldHVybntzZXRDb2xvcjpmdW5jdGlvbihlKXtyZXR1cm4gUmVjZW50c0NvbnRyb2wuc2V0Q29sb3IoZSl9LHNldERlc2NyaXB0aW9uOmZ1bmN0aW9uKGUpe3JldHVybiBSZWNlbnRzQ29udHJvbC5zZXREZXNjcmlwdGlvbihlKX0sc2V0T3B0aW9uczpmdW5jdGlvbihlLG4pe3JldHVybiBSZWNlbnRzQ29udHJvbC5zZXRPcHRpb25zKGUsbil9fX0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuc2NyZWVuc2hvdFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFTY3JlZW5zaG90XCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57Y2FwdHVyZVRvRmlsZTpmdW5jdGlvbihuKXt2YXIgcj1ufHx7fSxvPXIuZXh0ZW5zaW9ufHxcImpwZ1wiLHQ9ci5xdWFsaXR5fHxcIjEwMFwiLGk9ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3Iuc2NyZWVuc2hvdD8obmF2aWdhdG9yLnNjcmVlbnNob3Quc2F2ZShmdW5jdGlvbihlLG4pe2U/aS5yZWplY3QoZSk6aS5yZXNvbHZlKG4uZmlsZVBhdGgpfSxvLHQsci5maWxlbmFtZSksaS5wcm9taXNlKTooaS5yZXNvbHZlKG51bGwpLGkucHJvbWlzZSl9LGNhcHR1cmVUb1VyaTpmdW5jdGlvbihuKXt2YXIgcj1ufHx7fSxvPXIuZXh0ZW5zaW9ufHxcImpwZ1wiLHQ9ci5xdWFsaXR5fHxcIjEwMFwiLGk9ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3Iuc2NyZWVuc2hvdD8obmF2aWdhdG9yLnNjcmVlbnNob3QuVVJJKGZ1bmN0aW9uKGUsbil7ZT9pLnJlamVjdChlKTppLnJlc29sdmUobi5VUkkpfSxvLHQsci5maWxlbmFtZSksaS5wcm9taXNlKTooaS5yZXNvbHZlKG51bGwpLGkucHJvbWlzZSl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnNlcmlhbFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFTZXJpYWxcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3ZhciBuPXt9O3JldHVybiBuLnJlcXVlc3RQZXJtaXNzaW9uPWZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gc2VyaWFsLnJlcXVlc3RQZXJtaXNzaW9uKG4sZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LG4ub3Blbj1mdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIHNlcmlhbC5vcGVuKG4sZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LG4ud3JpdGU9ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBzZXJpYWwud3JpdGUobixmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sbi53cml0ZUhleD1mdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIHNlcmlhbC53cml0ZUhleChuLGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxuLnJlYWQ9ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIHNlcmlhbC5yZWFkKGZ1bmN0aW9uKGUpe3ZhciByPW5ldyBVaW50OEFycmF5KGUpO24ucmVzb2x2ZShyKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9LG4ucmVnaXN0ZXJSZWFkQ2FsbGJhY2s9ZnVuY3Rpb24oZSxuKXtzZXJpYWwucmVnaXN0ZXJSZWFkQ2FsbGJhY2soZnVuY3Rpb24obil7dmFyIHI9bmV3IFVpbnQ4QXJyYXkobik7ZShyKX0sbil9LG4uY2xvc2U9ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIHNlcmlhbC5jbG9zZShmdW5jdGlvbigpe24ucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sbn1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnNtc1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFTbXNcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntzZW5kOmZ1bmN0aW9uKG4scixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIHNtcy5zZW5kKG4scixvLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7dC5yZWplY3QoZSl9KSx0LnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnNvY2lhbFNoYXJpbmdcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhU29jaWFsU2hhcmluZ1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57c2hhcmU6ZnVuY3Rpb24ocixvLHQsaSl7dmFyIGE9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsdD10fHxudWxsLGk9aXx8bnVsbCxuLnBsdWdpbnMuc29jaWFsc2hhcmluZy5zaGFyZShyLG8sdCxpLGZ1bmN0aW9uKCl7YS5yZXNvbHZlKCEwKX0sZnVuY3Rpb24oKXthLnJlamVjdCghMSl9KSxhLnByb21pc2V9LHNoYXJlV2l0aE9wdGlvbnM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuc29jaWFsc2hhcmluZy5zaGFyZVdpdGhPcHRpb25zKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoITApfSxmdW5jdGlvbigpe28ucmVqZWN0KCExKX0pLG8ucHJvbWlzZX0sc2hhcmVWaWFUd2l0dGVyOmZ1bmN0aW9uKHIsbyx0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCx0PXR8fG51bGwsbi5wbHVnaW5zLnNvY2lhbHNoYXJpbmcuc2hhcmVWaWFUd2l0dGVyKHIsbyx0LGZ1bmN0aW9uKCl7aS5yZXNvbHZlKCEwKX0sZnVuY3Rpb24oKXtpLnJlamVjdCghMSl9KSxpLnByb21pc2V9LHNoYXJlVmlhV2hhdHNBcHA6ZnVuY3Rpb24ocixvLHQpe3ZhciBpPWUuZGVmZXIoKTtyZXR1cm4gbz1vfHxudWxsLHQ9dHx8bnVsbCxuLnBsdWdpbnMuc29jaWFsc2hhcmluZy5zaGFyZVZpYVdoYXRzQXBwKHIsbyx0LGZ1bmN0aW9uKCl7aS5yZXNvbHZlKCEwKX0sZnVuY3Rpb24oKXtpLnJlamVjdCghMSl9KSxpLnByb21pc2V9LHNoYXJlVmlhRmFjZWJvb2s6ZnVuY3Rpb24ocixvLHQpe3ZhciBpPWUuZGVmZXIoKTtyZXR1cm4gcj1yfHxudWxsLG89b3x8bnVsbCx0PXR8fG51bGwsbi5wbHVnaW5zLnNvY2lhbHNoYXJpbmcuc2hhcmVWaWFGYWNlYm9vayhyLG8sdCxmdW5jdGlvbigpe2kucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKCl7aS5yZWplY3QoITEpfSksaS5wcm9taXNlfSxzaGFyZVZpYUZhY2Vib29rV2l0aFBhc3RlTWVzc2FnZUhpbnQ6ZnVuY3Rpb24ocixvLHQsaSl7dmFyIGE9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsdD10fHxudWxsLG4ucGx1Z2lucy5zb2NpYWxzaGFyaW5nLnNoYXJlVmlhRmFjZWJvb2tXaXRoUGFzdGVNZXNzYWdlSGludChyLG8sdCxpLGZ1bmN0aW9uKCl7YS5yZXNvbHZlKCEwKX0sZnVuY3Rpb24oKXthLnJlamVjdCghMSl9KSxhLnByb21pc2V9LHNoYXJlVmlhU01TOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuc29jaWFsc2hhcmluZy5zaGFyZVZpYVNNUyhyLG8sZnVuY3Rpb24oKXt0LnJlc29sdmUoITApfSxmdW5jdGlvbigpe3QucmVqZWN0KCExKX0pLHQucHJvbWlzZX0sc2hhcmVWaWFFbWFpbDpmdW5jdGlvbihyLG8sdCxpLGEsYyl7dmFyIHU9ZS5kZWZlcigpO3JldHVybiB0PXR8fG51bGwsaT1pfHxudWxsLGE9YXx8bnVsbCxjPWN8fG51bGwsbi5wbHVnaW5zLnNvY2lhbHNoYXJpbmcuc2hhcmVWaWFFbWFpbChyLG8sdCxpLGEsYyxmdW5jdGlvbigpe3UucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKCl7dS5yZWplY3QoITEpfSksdS5wcm9taXNlfSxzaGFyZVZpYTpmdW5jdGlvbihyLG8sdCxpLGEpe3ZhciBjPWUuZGVmZXIoKTtyZXR1cm4gbz1vfHxudWxsLHQ9dHx8bnVsbCxpPWl8fG51bGwsYT1hfHxudWxsLG4ucGx1Z2lucy5zb2NpYWxzaGFyaW5nLnNoYXJlVmlhKHIsbyx0LGksYSxmdW5jdGlvbigpe2MucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKCl7Yy5yZWplY3QoITEpfSksYy5wcm9taXNlfSxjYW5TaGFyZVZpYUVtYWlsOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuc29jaWFsc2hhcmluZy5jYW5TaGFyZVZpYUVtYWlsKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCEwKX0sZnVuY3Rpb24oKXtyLnJlamVjdCghMSl9KSxyLnByb21pc2V9LGNhblNoYXJlVmlhOmZ1bmN0aW9uKHIsbyx0LGksYSl7dmFyIGM9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuc29jaWFsc2hhcmluZy5jYW5TaGFyZVZpYShyLG8sdCxpLGEsZnVuY3Rpb24oZSl7Yy5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtjLnJlamVjdChlKX0pLGMucHJvbWlzZX0sYXZhaWxhYmxlOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiB3aW5kb3cucGx1Z2lucy5zb2NpYWxzaGFyaW5nLmF2YWlsYWJsZShmdW5jdGlvbihlKXtlP24ucmVzb2x2ZSgpOm4ucmVqZWN0KCl9KSxuLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnNwaW5uZXJEaWFsb2dcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhU3Bpbm5lckRpYWxvZ1wiLFtcIiR3aW5kb3dcIixmdW5jdGlvbihlKXtyZXR1cm57c2hvdzpmdW5jdGlvbihuLHIsbyx0KXtyZXR1cm4gbz1vfHwhMSxlLnBsdWdpbnMuc3Bpbm5lckRpYWxvZy5zaG93KG4scixvLHQpfSxoaWRlOmZ1bmN0aW9uKCl7cmV0dXJuIGUucGx1Z2lucy5zcGlubmVyRGlhbG9nLmhpZGUoKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuc3BsYXNoc2NyZWVuXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVNwbGFzaHNjcmVlblwiLFtmdW5jdGlvbigpe3JldHVybntoaWRlOmZ1bmN0aW9uKCl7cmV0dXJuIG5hdmlnYXRvci5zcGxhc2hzY3JlZW4uaGlkZSgpfSxzaG93OmZ1bmN0aW9uKCl7cmV0dXJuIG5hdmlnYXRvci5zcGxhc2hzY3JlZW4uc2hvdygpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5zcWxpdGVcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhU1FMaXRlXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntvcGVuREI6ZnVuY3Rpb24oZSxyKXtyZXR1cm4gYW5ndWxhci5pc09iamVjdChlKSYmIWFuZ3VsYXIuaXNTdHJpbmcoZSk/KFwidW5kZWZpbmVkXCIhPXR5cGVvZiByJiYoZS5iZ1R5cGU9ciksbi5zcWxpdGVQbHVnaW4ub3BlbkRhdGFiYXNlKGUpKTpuLnNxbGl0ZVBsdWdpbi5vcGVuRGF0YWJhc2Uoe25hbWU6ZSxiZ1R5cGU6cn0pfSxleGVjdXRlOmZ1bmN0aW9uKG4scixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4udHJhbnNhY3Rpb24oZnVuY3Rpb24oZSl7ZS5leGVjdXRlU3FsKHIsbyxmdW5jdGlvbihlLG4pe3QucmVzb2x2ZShuKX0sZnVuY3Rpb24oZSxuKXt0LnJlamVjdChuKX0pfSksdC5wcm9taXNlfSxpbnNlcnRDb2xsZWN0aW9uOmZ1bmN0aW9uKG4scixvKXt2YXIgdD1lLmRlZmVyKCksaT1vLnNsaWNlKDApO3JldHVybiBuLnRyYW5zYWN0aW9uKGZ1bmN0aW9uKGUpeyFmdW5jdGlvbiBuKCl7dmFyIG89aS5zcGxpY2UoMCwxKVswXTt0cnl7ZS5leGVjdXRlU3FsKHIsbyxmdW5jdGlvbihlLHIpezA9PT1pLmxlbmd0aD90LnJlc29sdmUocik6bigpfSxmdW5jdGlvbihlLG4pe3QucmVqZWN0KG4pfSl9Y2F0Y2goYSl7dC5yZWplY3QoYSl9fSgpfSksdC5wcm9taXNlfSxuZXN0ZWRFeGVjdXRlOmZ1bmN0aW9uKG4scixvLHQsaSl7dmFyIGE9ZS5kZWZlcigpO3JldHVybiBuLnRyYW5zYWN0aW9uKGZ1bmN0aW9uKGUpe2UuZXhlY3V0ZVNxbChyLHQsZnVuY3Rpb24oZSxuKXthLnJlc29sdmUobiksZS5leGVjdXRlU3FsKG8saSxmdW5jdGlvbihlLG4pe2EucmVzb2x2ZShuKX0pfSl9LGZ1bmN0aW9uKGUsbil7YS5yZWplY3Qobil9KSxhLnByb21pc2V9LGRlbGV0ZURCOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5zcWxpdGVQbHVnaW4uZGVsZXRlRGF0YWJhc2UocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5zdGF0dXNiYXJcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhU3RhdHVzYmFyXCIsW2Z1bmN0aW9uKCl7cmV0dXJue292ZXJsYXlzV2ViVmlldzpmdW5jdGlvbihlKXtyZXR1cm4gU3RhdHVzQmFyLm92ZXJsYXlzV2ViVmlldyghIWUpfSxTVFlMRVM6e0RFRkFVTFQ6MCxMSUdIVF9DT05URU5UOjEsQkxBQ0tfVFJBTlNMVUNFTlQ6MixCTEFDS19PUEFRVUU6M30sc3R5bGU6ZnVuY3Rpb24oZSl7c3dpdGNoKGUpe2Nhc2UgMDpyZXR1cm4gU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpO2Nhc2UgMTpyZXR1cm4gU3RhdHVzQmFyLnN0eWxlTGlnaHRDb250ZW50KCk7Y2FzZSAyOnJldHVybiBTdGF0dXNCYXIuc3R5bGVCbGFja1RyYW5zbHVjZW50KCk7Y2FzZSAzOnJldHVybiBTdGF0dXNCYXIuc3R5bGVCbGFja09wYXF1ZSgpO2RlZmF1bHQ6cmV0dXJuIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKX19LHN0eWxlQ29sb3I6ZnVuY3Rpb24oZSl7cmV0dXJuIFN0YXR1c0Jhci5iYWNrZ3JvdW5kQ29sb3JCeU5hbWUoZSl9LHN0eWxlSGV4OmZ1bmN0aW9uKGUpe3JldHVybiBTdGF0dXNCYXIuYmFja2dyb3VuZENvbG9yQnlIZXhTdHJpbmcoZSl9LGhpZGU6ZnVuY3Rpb24oKXtyZXR1cm4gU3RhdHVzQmFyLmhpZGUoKX0sc2hvdzpmdW5jdGlvbigpe3JldHVybiBTdGF0dXNCYXIuc2hvdygpfSxpc1Zpc2libGU6ZnVuY3Rpb24oKXtyZXR1cm4gU3RhdHVzQmFyLmlzVmlzaWJsZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMudG9hc3RcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhVG9hc3RcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3Nob3dTaG9ydFRvcDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy50b2FzdC5zaG93U2hvcnRUb3AocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxzaG93U2hvcnRDZW50ZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMudG9hc3Quc2hvd1Nob3J0Q2VudGVyKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sc2hvd1Nob3J0Qm90dG9tOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnRvYXN0LnNob3dTaG9ydEJvdHRvbShyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHNob3dMb25nVG9wOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnRvYXN0LnNob3dMb25nVG9wKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sc2hvd0xvbmdDZW50ZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMudG9hc3Quc2hvd0xvbmdDZW50ZXIocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxzaG93TG9uZ0JvdHRvbTpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy50b2FzdC5zaG93TG9uZ0JvdHRvbShyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHNob3dXaXRoT3B0aW9uczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy50b2FzdC5zaG93V2l0aE9wdGlvbnMocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxzaG93OmZ1bmN0aW9uKHIsbyx0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy50b2FzdC5zaG93KHIsbyx0LGZ1bmN0aW9uKGUpe2kucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7aS5yZWplY3QoZSl9KSxpLnByb21pc2V9LGhpZGU6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7dHJ5e24ucGx1Z2lucy50b2FzdC5oaWRlKCksci5yZXNvbHZlKCl9Y2F0Y2gobyl7ci5yZWplY3QobyYmby5tZXNzYWdlKX1yZXR1cm4gci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy50b3VjaGlkXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVRvdWNoSURcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntjaGVja1N1cHBvcnQ6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIHdpbmRvdy5jb3Jkb3ZhP3RvdWNoaWQuY2hlY2tTdXBwb3J0KGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KTpuLnJlamVjdChcIk5vdCBzdXBwb3J0ZWQgd2l0aG91dCBjb3Jkb3ZhLmpzXCIpLG4ucHJvbWlzZX0sYXV0aGVudGljYXRlOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gd2luZG93LmNvcmRvdmE/dG91Y2hpZC5hdXRoZW50aWNhdGUoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbik6ci5yZWplY3QoXCJOb3Qgc3VwcG9ydGVkIHdpdGhvdXQgY29yZG92YS5qc1wiKSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnR0c1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFUVFNcIixmdW5jdGlvbigpe3JldHVybntzcGVhazpmdW5jdGlvbihlLG4scil7cmV0dXJuIFRUUy5zcGVhayhlLG4scil9fX0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMudXBzUHVzaFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFVcHNQdXNoXCIsW1wiJHFcIixcIiR3aW5kb3dcIixcIiRyb290U2NvcGVcIixcIiR0aW1lb3V0XCIsZnVuY3Rpb24oZSxuLHIsbyl7cmV0dXJue3JlZ2lzdGVyOmZ1bmN0aW9uKHQpe3ZhciBpPWUuZGVmZXIoKTtyZXR1cm4gbi5wdXNoLnJlZ2lzdGVyKGZ1bmN0aW9uKGUpe28oZnVuY3Rpb24oKXtyLiRicm9hZGNhc3QoXCIkY29yZG92YVVwc1B1c2g6bm90aWZpY2F0aW9uUmVjZWl2ZWRcIixlKX0pfSxmdW5jdGlvbigpe2kucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtpLnJlamVjdChlKX0sdCksaS5wcm9taXNlfSx1bnJlZ2lzdGVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wdXNoLnVucmVnaXN0ZXIoZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9LHIpLG8ucHJvbWlzZX0sc2V0QmFkZ2VOdW1iZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnB1c2guc2V0QXBwbGljYXRpb25JY29uQmFkZ2VOdW1iZXIoZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sciksby5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy52aWJyYXRpb25cIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhVmlicmF0aW9uXCIsW2Z1bmN0aW9uKCl7cmV0dXJue3ZpYnJhdGU6ZnVuY3Rpb24oZSl7cmV0dXJuIG5hdmlnYXRvci5ub3RpZmljYXRpb24udmlicmF0ZShlKX0sdmlicmF0ZVdpdGhQYXR0ZXJuOmZ1bmN0aW9uKGUsbil7cmV0dXJuIG5hdmlnYXRvci5ub3RpZmljYXRpb24udmlicmF0ZVdpdGhQYXR0ZXJuKGUsbil9LGNhbmNlbFZpYnJhdGlvbjpmdW5jdGlvbigpe3JldHVybiBuYXZpZ2F0b3Iubm90aWZpY2F0aW9uLmNhbmNlbFZpYnJhdGlvbigpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy52aWRlb0NhcHR1cmVQbHVzXCIsW10pLnByb3ZpZGVyKFwiJGNvcmRvdmFWaWRlb0NhcHR1cmVQbHVzXCIsW2Z1bmN0aW9uKCl7dmFyIGU9e307dGhpcy5zZXRMaW1pdD1mdW5jdGlvbihuKXtlLmxpbWl0PW59LHRoaXMuc2V0TWF4RHVyYXRpb249ZnVuY3Rpb24obil7ZS5kdXJhdGlvbj1ufSx0aGlzLnNldEhpZ2hRdWFsaXR5PWZ1bmN0aW9uKG4pe2UuaGlnaHF1YWxpdHk9bn0sdGhpcy51c2VGcm9udENhbWVyYT1mdW5jdGlvbihuKXtlLmZyb250Y2FtZXJhPW59LHRoaXMuc2V0UG9ydHJhaXRPdmVybGF5PWZ1bmN0aW9uKG4pe2UucG9ydHJhaXRPdmVybGF5PW59LHRoaXMuc2V0TGFuZHNjYXBlT3ZlcmxheT1mdW5jdGlvbihuKXtlLmxhbmRzY2FwZU92ZXJsYXk9bn0sdGhpcy5zZXRPdmVybGF5VGV4dD1mdW5jdGlvbihuKXtlLm92ZXJsYXlUZXh0PW59LHRoaXMuJGdldD1bXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKG4scil7cmV0dXJue2NhcHR1cmVWaWRlbzpmdW5jdGlvbihvKXt2YXIgdD1uLmRlZmVyKCk7cmV0dXJuIHIucGx1Z2lucy52aWRlb2NhcHR1cmVwbHVzPyhyLnBsdWdpbnMudmlkZW9jYXB0dXJlcGx1cy5jYXB0dXJlVmlkZW8odC5yZXNvbHZlLHQucmVqZWN0LGFuZ3VsYXIuZXh0ZW5kKHt9LGUsbykpLHQucHJvbWlzZSk6KHQucmVzb2x2ZShudWxsKSx0LnByb21pc2UpfX19XX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnppcFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFaaXBcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3VuemlwOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLnppcC51bnppcChyLG8sZnVuY3Rpb24oZSl7MD09PWU/dC5yZXNvbHZlKCk6dC5yZWplY3QoKX0sZnVuY3Rpb24oZSl7dC5ub3RpZnkoZSl9KSx0LnByb21pc2V9fX1dKX0oKTsiLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiYWRkQ2hpbGRDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSx1c2VyU2VydmljZSwkc3RhdGUpe1xuICAvL2JhY2tidXR0b25cbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XG4gICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpXG4gIH1cbnZhciB1c2VyID0gdXNlclNlcnZpY2UuZ2V0VXNlckluZm8uc3ViO1xuY29uc29sZS5sb2codXNlcik7XG4kc2NvcGUuc3VibWl0Q2hpbGQgPSBmdW5jdGlvbihjaGlsZCl7XG4gIGNoaWxkLnVzZXJfaG91c2Vob2xkID0gdXNlci51c2VyX2hvdXNlaG9sZDtcbiAgY29uc29sZS5sb2coY2hpbGQpO1xuICB1c2VyU2VydmljZS5hZGRDaGlsZChjaGlsZClcbiAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAkc3RhdGUuZ28oJ2hvbWUnKTtcbiAgfSk7XG5cbn1cblxuXG5cblxuXG59KSAvL2VuZCBvZiBjb250cm9sbGVyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiYXNzaWduQ2hvcmVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSxjaG9yZVNlcnZpY2UsJHN0YXRlKXtcblxudmFyIGN1cnJlbnRVc2VyID0gY2hvcmVTZXJ2aWNlLmdldFVzZXJJbmZvLnN1YjtcblxuXG5jaG9yZVNlcnZpY2UuZ2V0Q2hpbGRyZW4oY3VycmVudFVzZXIudXNlcl9ob3VzZWhvbGQpXG4udGhlbihmdW5jdGlvbihyZXMpe1xuICAvLyAkc2NvcGUuY2hvcmVzID0gcmVzLmRhdGE7XG4gICRzY29wZS5jaGlsZHMgPSByZXMuZGF0YVxuICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG59KVxuXG5cbiRzY29wZS52YWx1ZXMgPSBbXTtcblxuJHNjb3BlLmNob3JlID0ge1xuY2hvcmVfZGFpbHk6IGZhbHNlLFxuY2hvcmVfd2Vla2x5OiBmYWxzZSxcbmNob3JlX21vbnRobHk6ZmFsc2Vcbn1cblxuJHNjb3BlLnN1Ym1pdENob3JlID0gZnVuY3Rpb24oY2hvcmUpe1xuICBjaG9yZS51c2VyX2hvdXNlaG9sZF9mayA9IGN1cnJlbnRVc2VyLnVzZXJfaG91c2Vob2xkO1xuICBjb25zb2xlLmxvZyhjaG9yZSlcbiAgY29uc29sZS5sb2coJHNjb3BlLnZhbHVlcyk7XG4gIC8vIGNob3JlU2VydmljZS5jcmVhdGVDaG9yZShjaG9yZSlcbiAgLy8gLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgLy9cbiAgLy8gfSlcbn1cblxuXG5cblxuXG5cblxufSkvL2VuZCBvZiBjb250cm9sbGVyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKCdjYW1lcmFDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkY29yZG92YUNhbWVyYSkge1xuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkZXZpY2VyZWFkeVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAkY29yZG92YVBsdWdpbi5zb21lRnVuY3Rpb24oKS50aGVuKHN1Y2Nlc3MsIGVycm9yKTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICAvLyBPUiB3aXRoIElPTklDXG5cbiAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICRjb3Jkb3ZhUGx1Z2luLnNvbWVGdW5jdGlvbigpLnRoZW4oc3VjY2VzcywgZXJyb3IpO1xuICAgIH0pO1xuXG4gICRzY29wZS50YWtlUGljdHVyZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgcXVhbGl0eTogNTAsXG4gICAgICBkZXN0aW5hdGlvblR5cGU6IENhbWVyYS5EZXN0aW5hdGlvblR5cGUuREFUQV9VUkwsXG4gICAgICBzb3VyY2VUeXBlOiBDYW1lcmEuUGljdHVyZVNvdXJjZVR5cGUuQ0FNRVJBLFxuICAgICAgYWxsb3dFZGl0OiBmYWxzZSxcbiAgICAgIGVuY29kaW5nVHlwZTogQ2FtZXJhLkVuY29kaW5nVHlwZS5KUEVHLFxuICAgICAgdGFyZ2V0V2lkdGg6IDMwMCxcbiAgICAgIHRhcmdldEhlaWdodDogMzAwLFxuICAgICAgcG9wb3Zlck9wdGlvbnM6IENhbWVyYVBvcG92ZXJPcHRpb25zLFxuICAgICAgc2F2ZVRvUGhvdG9BbGJ1bTogZmFsc2UsXG5cdCAgICBjb3JyZWN0T3JpZW50YXRpb246dHJ1ZVxuICAgIH07XG5cbiAgICAkY29yZG92YUNhbWVyYS5nZXRQaWN0dXJlKG9wdGlvbnMpLnRoZW4oZnVuY3Rpb24oaW1hZ2VEYXRhKSB7XG4gICAgICAkc2NvcGUuaW1nVVJJID0gXCJkYXRhOmltYWdlL2pwZWc7YmFzZTY0LFwiICsgaW1hZ2VEYXRhO1xuICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgLy8gZXJyb3JcbiAgICB9KTtcblxuICB9O1xuICB9LCBmYWxzZSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiY2hpbGRCYW5rQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAgJHNjb3BlLnRoZW1lID0gJ3dhdGVyJy8vbG9hZCB1c2VyIHRoZW1lXG5cbiAgICRzY29wZS5zZXRUaGVtZSA9IGZ1bmN0aW9uKCl7XG4gICAgIGlmKCRzY29wZS50aGVtZSA9PT0gJ2Jhc2ViYWxsJyl7XG4gICAgICAgJHNjb3BlLnRoZW1lSW1hZ2UgPSAnLi9pbWcvaW1nLWJhc2ViYWxsLXRyYW5zLnBuZydcbiAgICAgfVxuICAgICBpZigkc2NvcGUudGhlbWUgPT09ICdjaGFybGllQnJvd24nKXtcbiAgICAgICAkc2NvcGUudGhlbWVJbWFnZSA9ICcuL2ltZy9zbm9vcHkucG5nJ1xuICAgICB9XG4gICAgIGlmKCRzY29wZS50aGVtZSA9PT0gJ3ByaW5jZXNzJyl7XG4gICAgICAgJHNjb3BlLnRoZW1lSW1hZ2UgPSAnLi9pbWcvQ3Jvd25fUHJpbmNlc3MucG5nJ1xuICAgICB9XG4gICAgIGlmKCRzY29wZS50aGVtZSA9PT0gJ3N0YXJXYXJzJyl7XG4gICAgICAgJHNjb3BlLnRoZW1lSW1hZ2UgPSAnLi9pbWcvZGVhdGgtc3Rhci0ybmQtaWNvbi5wbmcnXG4gICAgIH1cbiAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAnd2F0ZXInKXtcbiAgICAgICAkc2NvcGUudGhlbWVJbWFnZSA9ICcuL2ltZy9UcmFuc3BhcmVudF9XYXRlcl9Ecm9wX1BOR19QaWN0dXJlLnBuZydcbiAgICAgfVxuXG4gICB9XG4gICAkc2NvcGUuc2V0VGhlbWUoKTtcbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiY2hpbGRIb21lQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsLCAkYXV0aCwgdXNlclNlcnZpY2Upe1xuICAvLyAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tICBjaGlsZCBIb21lIGNvbnRyb2xsZXJcIlxuICAvL3ZhciB1c2VyVG9rZW4gPSB1c2VyU2VydmljZS5nZXRVc2VySW5mby5zdWI7XG5cbiAgdmFyIHVzZXJUb2tlbiA9ICRhdXRoLmdldFBheWxvYWQoKTtcbiAgdXNlclNlcnZpY2UuZ2V0VXNlckluZm8gPSB1c2VyVG9rZW47XG4gIHZhciB1c2VyID0gdXNlclRva2VuLnN1YjtcblxuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3RoZW1lTW9kYWwuaHRtbCcsIHtcbiAgICAgaWQ6ICcxJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWwxID0gbW9kYWw7XG4gICB9KTtcblxuICAgLy8gTW9kYWwgMlxuICAvLyAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCd0YWtlUGljdHVyZU1vZGFsLmh0bWwnLCB7XG4gIC8vICAgIGlkOiAnMicsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAvLyAgICBzY29wZTogJHNjb3BlLFxuICAvLyAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gIC8vICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAvLyAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAvLyAgICAkc2NvcGUub01vZGFsMiA9IG1vZGFsO1xuICAvLyAgfSk7XG4gICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgaWYgKGluZGV4ID09IDEpICRzY29wZS5vTW9kYWwxLnNob3coKTtcbiAgICAgZWxzZSAkc2NvcGUub01vZGFsMi5zaG93KCk7XG4gICB9O1xuXG4gICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgIGlmIChpbmRleCA9PSAxKSAkc2NvcGUub01vZGFsMS5oaWRlKCk7XG4gICAgIGVsc2UgJHNjb3BlLm9Nb2RhbDIuaGlkZSgpO1xuICAgfTtcblxuICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDEucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWwyLnJlbW92ZSgpO1xuXG4gICB9KTtcblxuXG4gICRzY29wZS50aGVtZSA9IHVzZXIudXNlcl90aGVtZVxuY29uc29sZS5sb2codXNlcik7XG5cblxuXG4gICRzY29wZS5zZXRUaGVtZSA9IGZ1bmN0aW9uKGNob2ljZSl7XG4gICAgLy9zZXJ2aWNlLnNldFRoZW1lKGNob2ljZSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgLy9pZihyZXNwb25zZS5zdGF0dXMgPT09IDIwMCl7XG4gICAgJHNjb3BlLnRoZW1lID0gY2hvaWNlXG4gICAgLy8gIH1cbi8vICB9KVxuICB9XG5cblxuXG5cbn0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImNoaWxkTG9naW5DdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGF1dGgsICRzdGF0ZSwgbG9naW5TZXJ2aWNlKXtcbiAgLy8gICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gY2hpbGQgTG9naW4gY29udHJvbGxlclwiXG5cbiAgICRzY29wZS5sb2dpbkNoaWxkID0gZnVuY3Rpb24odXNlcil7XG4gICAgIGNvbnNvbGUubG9nKHVzZXIpXG4gICAgIGxvZ2luU2VydmljZS51c2VyTG9naW4odXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgJGF1dGguc2V0VG9rZW4ocmVzcG9uc2UpXG4gICAgICAgICAkc3RhdGUuZ28oJ2NoaWxkSG9tZScpXG5cbiAgICAgfSlcbiAgIH1cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiZWRpdENoaWxkQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAkc2NvcGUuZ29iYWNrID0gZnVuY3Rpb24oKXtcbiAgICB3aW5kb3cuaGlzdG9yeS5nbygtMSlcbiAgfVxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImhpc3RvcnlDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIEhpc3RvcnkgY29udHJvbGxlclwiXG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiaG9tZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCx1c2VyU2VydmljZSwkd2luZG93KXtcbnZhciB1c2VyVG9rZW4gPSB1c2VyU2VydmljZS5nZXRVc2VySW5mby5zdWI7XG5jb25zb2xlLmxvZyh1c2VyVG9rZW4pO1xuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdiYW5uZXJNb2RhbC5odG1sJywge1xuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm1vZGFsID0gbW9kYWw7XG4gICB9KTtcbiAgICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAgJHNjb3BlLm1vZGFsLnNob3coKTtcbiAgIH07XG4gICAkc2NvcGUuc3VibWl0QmFubmVyID0gZnVuY3Rpb24oYmFubmVyKXtcbiAgICAgdmFyIGJhbm5lckluZm8gPSB7XG4gICAgICAgdXNlcl9ob3VzZWhvbGQ6dXNlclRva2VuLnVzZXJfaG91c2Vob2xkLFxuICAgICAgIHVzZXJfYmFubmVyX2ltYWdlOmJhbm5lclxuICAgICB9XG4gICAgICB1c2VyU2VydmljZS5wb3N0YmFubmVyKGJhbm5lckluZm8pXG4gICAgICAudGhlbihmdW5jdGlvbihyZXMpe1xuICAgICAkc2NvcGUubW9kYWwuaGlkZSgpO1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWwtYm94XCIpLnZhbHVlID0gJyc7XG4gICAgICAgICAgJHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQodHJ1ZSk7XG4gICAgIH0pO1xuICAgfTtcbiAgICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWwtYm94XCIpLnZhbHVlID0gJyc7XG4gICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gICB9O1xuICAgLy8gQ2xlYW51cCB0aGUgbW9kYWwgd2hlbiB3ZSdyZSBkb25lIHdpdGggaXQhXG4gICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAkc2NvcGUubW9kYWwucmVtb3ZlKCk7XG4gICB9KTtcbiAgIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIGhpZGUgbW9kYWxcbiAgICRzY29wZS4kb24oJ21vZGFsLmhpZGRlbicsIGZ1bmN0aW9uKCkge1xuICAgICAvLyBFeGVjdXRlIGFjdGlvblxuXG4gICB9KTtcbiAgIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIHJlbW92ZSBtb2RhbFxuICAgJHNjb3BlLiRvbignbW9kYWwucmVtb3ZlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAvLyBFeGVjdXRlIGFjdGlvblxuICAgfSk7XG5cbiRzY29wZS5ob3VzZWhvbGQgPSAgdXNlclRva2VuLnVzZXJfaG91c2Vob2xkO1xudXNlclNlcnZpY2UuZ2V0YmFubmVyKHVzZXJUb2tlbi51c2VyX2hvdXNlaG9sZCkudGhlbihmdW5jdGlvbihyZXMpe1xuY29uc29sZS5sb2cocmVzLmRhdGFbMF0udXNlcl9iYW5uZXJfaW1hZ2UpO1xuICAkc2NvcGUuYmFubmVyID0gcmVzLmRhdGFbMF0udXNlcl9iYW5uZXJfaW1hZ2U7XG59KTtcblxuY29uc29sZS5sb2codXNlclRva2VuLnppcCk7XG5cbnVzZXJTZXJ2aWNlLmdldFdlYXRoZXIodXNlclRva2VuLnppcClcbi50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbiAgJHNjb3BlLndlYXRoZXIgPSByZXMuZGF0YTtcbn0pXG5cblxudXNlclNlcnZpY2Uuc2hvd2NoaWxkKHVzZXJUb2tlbi51c2VyX2hvdXNlaG9sZClcbi50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gIGNvbnNvbGUubG9nKHJlcy5kYXRhKVxuICAkc2NvcGUuc2hvd2NoaWxkID0gcmVzLmRhdGE7XG59KVxuXG5cbn0pLy9lbmQgb2YgY29udHJvbGxlclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImxvZ2luQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRhdXRoLCAkc3RhdGUsIGxvZ2luU2VydmljZSl7XG5cbiRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uKHVzZXIpe1xuICAvLyBjb25zb2xlLmxvZyh1c2VyKVxuICBsb2dpblNlcnZpY2UudXNlckxvZ2luKHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICRhdXRoLnNldFRva2VuKHJlc3BvbnNlKVxuICAgICAgJHN0YXRlLmdvKCdob21lJylcblxuICB9KVxufVxuJHNjb3BlLm1ha2VVc2VyID0gZnVuY3Rpb24obmV3VXNlcil7XG4gIGxvZ2luU2VydmljZS5tYWtlVXNlcihuZXdVc2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAkYXV0aC5zZXRUb2tlbihyZXNwb25zZSlcbiAgICAgICRzdGF0ZS5nbygnaG9tZScpXG4gIH0pXG59XG4gICRzY29wZS5hdXRoZW50aWNhdGUgPSBmdW5jdGlvbihwcm92aWRlcikge1xuICAkYXV0aC5hdXRoZW50aWNhdGUocHJvdmlkZXIpfTtcbiAgLy8gJHNjb3BlLnRlc3QgPSBcIkhlbGxvIGZyb20gbG9naW4gY29udHJvbGxlclwiXG5cblxuICAkc2NvcGUucmV2ZWFsZXIgPSBmdW5jdGlvbigpe1xuICAkc2NvcGUuaGlkZSA9ICEkc2NvcGUuaGlkZTtcbiB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwibWFrZUNob3JlQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAkc2NvcGUuZ29iYWNrID0gZnVuY3Rpb24oKXtcbiAgICB3aW5kb3cuaGlzdG9yeS5nbygtMSlcbiAgfVxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcInNldFJld2FyZHNDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwpe1xuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3Jld2FyZE1vZGFsLmh0bWwnLCB7XG4gICAgc2NvcGU6ICRzY29wZSxcbiAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICRzY29wZS5tb2RhbCA9IG1vZGFsO1xuICB9KTtcbiAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5zaG93KCk7XG4gIH07XG4gICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcbiAgfTtcbiAgLy8gQ2xlYW51cCB0aGUgbW9kYWwgd2hlbiB3ZSdyZSBkb25lIHdpdGggaXQhXG4gICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuICB9KTtcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gaGlkZSBtb2RhbFxuICAkc2NvcGUuJG9uKCdtb2RhbC5oaWRkZW4nLCBmdW5jdGlvbigpIHtcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxuICB9KTtcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gcmVtb3ZlIG1vZGFsXG4gICRzY29wZS4kb24oJ21vZGFsLnJlbW92ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxuICB9KTtcbiAgLy9iYWNrYnV0dG9uXG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxuICB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwic2V0dGluZ3NDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwpe1xuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2NoYW5nZVBhc3N3b3JkLmh0bWwnLCB7XG4gICAgIGlkOiAnMScsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsMSA9IG1vZGFsO1xuICAgfSk7XG5cbiAgIC8vIE1vZGFsIDJcbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnY2hhbmdlSG91c2Vob2xkLmh0bWwnLCB7XG4gICAgIGlkOiAnMicsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsMiA9IG1vZGFsO1xuICAgfSk7XG5cbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnY2hhbmdlWmlwLmh0bWwnLCB7XG4gICAgIGlkOiAnMycsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsMyA9IG1vZGFsO1xuICAgfSk7XG5cbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnYWRkUGFyZW50Lmh0bWwnLCB7XG4gICAgIGlkOiAnNCcsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsNCA9IG1vZGFsO1xuICAgfSk7XG5cbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgncmVtb3ZlQ2hpbGQuaHRtbCcsIHtcbiAgICAgaWQ6ICc1JywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWw1ID0gbW9kYWw7XG4gICB9KTtcblxuXG5cbiAgICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICBpZiAoaW5kZXggPT0gMSkgJHNjb3BlLm9Nb2RhbDEuc2hvdygpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDIpICRzY29wZS5vTW9kYWwyLnNob3coKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSAzKSAkc2NvcGUub01vZGFsMy5zaG93KCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gNCkgJHNjb3BlLm9Nb2RhbDQuc2hvdygpO1xuICAgICBlbHNlICRzY29wZS5vTW9kYWw1LnNob3coKTtcbiAgIH07XG5cbiAgICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgaWYgKGluZGV4ID09IDEpICRzY29wZS5vTW9kYWwxLmhpZGUoKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSAyKSAkc2NvcGUub01vZGFsMi5oaWRlKCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMykgJHNjb3BlLm9Nb2RhbDMuaGlkZSgpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDQpICRzY29wZS5vTW9kYWw0LmhpZGUoKTtcbiAgICAgZWxzZSAkc2NvcGUub01vZGFsNS5oaWRlKCk7XG4gICB9O1xuXG4gICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAkc2NvcGUub01vZGFsMS5yZW1vdmUoKTtcbiAgICAgJHNjb3BlLm9Nb2RhbDIucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWwzLnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsNC5yZW1vdmUoKTtcbiAgICAgJHNjb3BlLm9Nb2RhbDUucmVtb3ZlKCk7XG4gICB9KTtcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJ0cmFja2VyQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsKXtcbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdwaWNDb25mTW9kYWwuaHRtbCcsIHtcbiAgICBzY29wZTogJHNjb3BlLFxuICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgJHNjb3BlLm1vZGFsID0gbW9kYWw7XG4gIH0pO1xuICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLnNob3coKTtcbiAgfTtcbiAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwuaGlkZSgpO1xuICB9O1xuICAvLyBDbGVhbnVwIHRoZSBtb2RhbCB3aGVuIHdlJ3JlIGRvbmUgd2l0aCBpdCFcbiAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwucmVtb3ZlKCk7XG4gIH0pO1xuICAvLyBFeGVjdXRlIGFjdGlvbiBvbiBoaWRlIG1vZGFsXG4gICRzY29wZS4kb24oJ21vZGFsLmhpZGRlbicsIGZ1bmN0aW9uKCkge1xuICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gIH0pO1xuICAvLyBFeGVjdXRlIGFjdGlvbiBvbiByZW1vdmUgbW9kYWxcbiAgJHNjb3BlLiRvbignbW9kYWwucmVtb3ZlZCcsIGZ1bmN0aW9uKCkge1xuICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gIH0pO1xuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcInVzZXJJbmZvQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBpbmZvIGNvbnRyb2xsZXJcIlxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuc2VydmljZShcImNob3JlU2VydmljZVwiLCBmdW5jdGlvbigkaHR0cCwkcSwkYXV0aCl7XG5cbnRoaXMuZ2V0VXNlckluZm8gPSAkYXV0aC5nZXRQYXlsb2FkKCk7XG5cblxudGhpcy5nZXRDaGlsZHJlbiA9IGZ1bmN0aW9uKGhvdXNlaG9sZCl7XG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOlwiR0VUXCIsXG4gICAgdXJsOlwiL2NoaWxkcmVuL1wiICsgaG91c2Vob2xkXG4gIH0pXG59XG5cbnRoaXMuY3JlYXRlQ2hvcmUgPSBmdW5jdGlvbihjaG9yZSl7XG4gIHJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOlwiUE9TVFwiLFxuICAgIHVybDpcIi9hc3NpZ25jaG9yZVwiLFxuICAgIGRhdGE6Y2hvcmVcbiAgfSlcbn1cblxuXG5cblxufSkvL2VuZCBvZiBzZXJ2aWNlXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5zZXJ2aWNlKCdsb2dpblNlcnZpY2UnLCBmdW5jdGlvbigkaHR0cCl7XG5cblxuICB0aGlzLnVzZXJMb2dpbiA9IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICBjb25zb2xlLmxvZyh1c2VyLCBcInNlcnZpY2VcIilcbiAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIHVybDogJy9hdXRoL2xvZ2luJyxcbiAgICAgIGRhdGE6IHVzZXJcbiAgICB9KVxuICB9XG4gIHRoaXMubWFrZVVzZXIgPSBmdW5jdGlvbihuZXdVc2VyKSB7XG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB1cmw6ICcvYXV0aC9zaWdudXAnLFxuICAgICAgZGF0YTogbmV3VXNlclxuICAgIH0pXG4gIH1cbn0pIC8vIGVuZCBvZiBzZXJ2aWNlXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5zZXJ2aWNlKCd1c2VyU2VydmljZScsIGZ1bmN0aW9uKCRodHRwLCRxLCRhdXRoKXtcblxudmFyIGJhbm5lcjtcbnRoaXMuZ2V0VXNlckluZm8gPSAkYXV0aC5nZXRQYXlsb2FkKCk7XG5cblxudGhpcy5wb3N0YmFubmVyID0gZnVuY3Rpb24oYmFubmVyKXtcbiAgY29uc29sZS5sb2coYmFubmVyKTtcbiAgY29uc29sZS5sb2coYmFubmVyLnVzZXJfYmFubmVyX2ltYWdlKTtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgdXJsOlwiL2Jhbm5lci9cIiArIGJhbm5lci51c2VyX2hvdXNlaG9sZCxcbiAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7dXNlcl9iYW5uZXJfaW1hZ2U6YmFubmVyLnVzZXJfYmFubmVyX2ltYWdlfSlcbiAgfSlcbn1cblxudGhpcy5nZXRiYW5uZXIgPSBmdW5jdGlvbih1c2VySWQpe1xuICBjb25zb2xlLmxvZyh1c2VySWQpO1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6XCIvYmFubmVyL1wiICsgdXNlcklkXG4gIH0pXG59XG5cblxudGhpcy5nZXRXZWF0aGVyID0gZnVuY3Rpb24oKXtcbnJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIHVybDonaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPXppcD04NDAxMCZ1bml0cz1pbXBlcmlhbCZhcHBpZD1jMTBlZjk5YzVhZmRlZTNmZGZiYTc4ZThjOTgxYTliNidcbiAgfSlcblxufTtcblxudGhpcy5hZGRDaGlsZCA9IGZ1bmN0aW9uKGNoaWxkKXtcbiAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoY2hpbGQpKTtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6XCJQT1NUXCIsXG4gICAgdXJsOlwiL2NoaWxkcmVuXCIsXG4gICAgZGF0YTogY2hpbGRcbiAgfSlcbn1cblxudGhpcy5zaG93Y2hpbGQgPSBmdW5jdGlvbihob3VzZWhvbGQpe1xucmV0dXJuICRodHRwKHtcbiAgbWV0aG9kOlwiR0VUXCIsXG4gIHVybDpcIi9jaGlsZHJlbi9cIiArIGhvdXNlaG9sZFxufSlcbn1cblxuXG5cbn0pOy8vZW5kIG9mIHNlcnZpY2VcbiJdfQ==
