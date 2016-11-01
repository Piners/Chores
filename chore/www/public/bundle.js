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

module.controller('cameraCtrl', function ($scope, $cordovaCamera) {

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
"use strict";

angular.module('chore').controller("childBankCtrl", function ($scope) {
   $scope.test = "Message from bank controller";
});
'use strict';

angular.module('chore').controller("childHomeCtrl", function ($scope, $ionicModal) {
  // $scope.test = "Message from  child Home controller"
  $ionicModal.fromTemplateUrl('themeModal.html', {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm5nLWNvcmRvdmEubWluLmpzIiwiY29udHJvbGxlcnMvYWRkQ2hpbGRDdHJsLmpzIiwiY29udHJvbGxlcnMvYXNzaWduQ2hvcmVDdHJsLmpzIiwiY29udHJvbGxlcnMvY2FtZXJhQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NoaWxkQmFua0N0cmwuanMiLCJjb250cm9sbGVycy9jaGlsZEhvbWVDdHJsLmpzIiwiY29udHJvbGxlcnMvY2hpbGRMb2dpbkN0cmwuanMiLCJjb250cm9sbGVycy9lZGl0Q2hpbGRDdHJsLmpzIiwiY29udHJvbGxlcnMvaGlzdG9yeUN0cmwuanMiLCJjb250cm9sbGVycy9ob21lQ3RybC5qcyIsImNvbnRyb2xsZXJzL2xvZ2luQ3RybC5qcyIsImNvbnRyb2xsZXJzL21ha2VDaG9yZUN0cmwuanMiLCJjb250cm9sbGVycy9zZXRSZXdhcmRzQ3RybC5qcyIsImNvbnRyb2xsZXJzL3NldHRpbmdzQ3RybC5qcyIsImNvbnRyb2xsZXJzL3RyYWNrZXJDdHJsLmpzIiwiY29udHJvbGxlcnMvdXNlckluZm9DdHJsLmpzIiwic2VydmljZS9sb2dpblNlcnZpY2UuanMiLCJzZXJ2aWNlL3VzZXJTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsIiR1cmxSb3V0ZXJQcm92aWRlciIsIiRhdXRoUHJvdmlkZXIiLCJvdGhlcndpc2UiLCJzdGF0ZSIsInVybCIsInRlbXBsYXRlVXJsIiwiY29udHJvbGxlciIsImZhY2Vib29rIiwiY2xpZW50SWQiLCJyZXNwb25zZVR5cGUiLCJnb29nbGUiLCJydW4iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5Iiwid2luZG93IiwiY29yZG92YSIsInBsdWdpbnMiLCJLZXlib2FyZCIsImhpZGVLZXlib2FyZEFjY2Vzc29yeUJhciIsImRpc2FibGVTY3JvbGwiLCJTdGF0dXNCYXIiLCJzdHlsZURlZmF1bHQiLCJmYWN0b3J5IiwiZSIsIm4iLCJyIiwibyIsInR5cGUiLCJpc0F2YWlsYWJsZSIsImRlZmVyIiwiVGhyZWVEZWVUb3VjaCIsInJlc29sdmUiLCJyZWplY3QiLCJwcm9taXNlIiwiYWRkUXVpY2tBY3Rpb24iLCJ0IiwiaSIsImEiLCJjIiwidSIsInMiLCJsIiwiZiIsInRpdGxlIiwic3VidGl0bGUiLCJpY29uVHlwZSIsImljb25UZW1wbGF0ZSIsInRoZW4iLCJwdXNoIiwiY29uZmlndXJlUXVpY2tBY3Rpb25zIiwib25Ib21lSWNvblByZXNzZWQiLCJhZGRRdWlja0FjdGlvbkhhbmRsZXIiLCJlbmFibGVMaW5rUHJldmlldyIsImFkZEZvcmNlVG91Y2hIYW5kbGVyIiwid2F0Y2hGb3JjZVRvdWNoZXMiLCJzaG93IiwiYWN0aW9uc2hlZXQiLCJoaWRlIiwiY3JlYXRlQmFubmVyVmlldyIsIkFkTW9iIiwiY3JlYXRlSW50ZXJzdGl0aWFsVmlldyIsInJlcXVlc3RBZCIsInNob3dBZCIsInJlcXVlc3RJbnRlcnN0aXRpYWxBZCIsImNoZWNrIiwiYXBwQXZhaWxhYmlsaXR5IiwicHJvdmlkZXIiLCJzZXRQcmVmZXJlbmNlcyIsImlzT2JqZWN0IiwiQXBwUmF0ZSIsInByZWZlcmVuY2VzIiwidXNlTGFuZ3VhZ2UiLCJsYW5ndWFnZSIsImRpc3BsYXlBcHBOYW1lIiwiYXBwTmFtZSIsInByb21wdEFnYWluRm9yRWFjaE5ld1ZlcnNpb24iLCJwcm9tcHRGb3JOZXdWZXJzaW9uIiwib3BlblN0b3JlSW5BcHAiLCJ1c2VzVW50aWxQcm9tcHQiLCJ1c2VDdXN0b21SYXRlRGlhbG9nIiwic3RvcmVBcHBVUkwiLCJpb3MiLCJpb3NVUkwiLCJhbmRyb2lkIiwiYW5kcm9pZFVSTCIsImJsYWNrYmVycnkiLCJibGFja2JlcnJ5VVJMIiwid2luZG93czgiLCJ3aW5kb3dzVVJMIiwic2V0Q3VzdG9tTG9jYWxlIiwibWVzc2FnZSIsImNhbmNlbEJ1dHRvbkxhYmVsIiwibGF0ZXJCdXR0b25MYWJlbCIsInJhdGVCdXR0b25MYWJlbCIsImV4dGVuZCIsImN1c3RvbUxvY2FsZSIsIiRnZXQiLCJwcm9tcHRGb3JSYXRpbmciLCJuYXZpZ2F0ZVRvQXBwU3RvcmUiLCJvbkJ1dHRvbkNsaWNrZWQiLCJjYWxsYmFja3MiLCJiaW5kIiwib25SYXRlRGlhbG9nU2hvdyIsImdldEFwcE5hbWUiLCJnZXRBcHBWZXJzaW9uIiwiZ2V0UGFja2FnZU5hbWUiLCJnZXRWZXJzaW9uTnVtYmVyIiwiZ2V0VmVyc2lvbkNvZGUiLCJpbml0IiwibmF2aWdhdG9yIiwiZ2VvbG9jYXRpb24iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJjb25maWd1cmUiLCJiYWNrZ3JvdW5kR2VvTG9jYXRpb24iLCJub3RpZnkiLCJmaW5pc2giLCJzdGFydCIsInN0b3AiLCJoYXNQZXJtaXNzaW9uIiwibm90aWZpY2F0aW9uIiwiYmFkZ2UiLCJwcm9tcHRGb3JQZXJtaXNzaW9uIiwic2V0IiwiZ2V0IiwiY2xlYXIiLCJpbmNyZWFzZSIsImRlY3JlYXNlIiwic2NhbiIsImJhcmNvZGVTY2FubmVyIiwiZW5jb2RlIiwiJGJyb2FkY2FzdCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImJhdHRlcnkiLCJsb2NhdGlvbk1hbmFnZXIiLCJEZWxlZ2F0ZSIsImRpZERldGVybWluZVN0YXRlRm9yUmVnaW9uIiwiZGlkU3RhcnRNb25pdG9yaW5nRm9yUmVnaW9uIiwiZGlkRXhpdFJlZ2lvbiIsImRpZEVudGVyUmVnaW9uIiwiZGlkUmFuZ2VCZWFjb25zSW5SZWdpb24iLCJwZXJpcGhlcmFsTWFuYWdlckRpZFN0YXJ0QWR2ZXJ0aXNpbmciLCJwZXJpcGhlcmFsTWFuYWdlckRpZFVwZGF0ZVN0YXRlIiwiZGlkQ2hhbmdlQXV0aG9yaXphdGlvblN0YXR1cyIsInNldERlbGVnYXRlIiwic2V0Q2FsbGJhY2tEaWREZXRlcm1pbmVTdGF0ZUZvclJlZ2lvbiIsInNldENhbGxiYWNrRGlkU3RhcnRNb25pdG9yaW5nRm9yUmVnaW9uIiwic2V0Q2FsbGJhY2tEaWRFeGl0UmVnaW9uIiwic2V0Q2FsbGJhY2tEaWRFbnRlclJlZ2lvbiIsInNldENhbGxiYWNrRGlkUmFuZ2VCZWFjb25zSW5SZWdpb24iLCJzZXRDYWxsYmFja1BlcmlwaGVyYWxNYW5hZ2VyRGlkU3RhcnRBZHZlcnRpc2luZyIsInNldENhbGxiYWNrUGVyaXBoZXJhbE1hbmFnZXJEaWRVcGRhdGVTdGF0ZSIsInNldENhbGxiYWNrRGlkQ2hhbmdlQXV0aG9yaXphdGlvblN0YXR1cyIsImNyZWF0ZUJlYWNvblJlZ2lvbiIsIkJlYWNvblJlZ2lvbiIsImlzQmx1ZXRvb3RoRW5hYmxlZCIsIndoZW4iLCJlbmFibGVCbHVldG9vdGgiLCJkaXNhYmxlQmx1ZXRvb3RoIiwic3RhcnRNb25pdG9yaW5nRm9yUmVnaW9uIiwic3RvcE1vbml0b3JpbmdGb3JSZWdpb24iLCJyZXF1ZXN0U3RhdGVGb3JSZWdpb24iLCJzdGFydFJhbmdpbmdCZWFjb25zSW5SZWdpb24iLCJzdG9wUmFuZ2luZ0JlYWNvbnNJblJlZ2lvbiIsImdldEF1dGhvcml6YXRpb25TdGF0dXMiLCJyZXF1ZXN0V2hlbkluVXNlQXV0aG9yaXphdGlvbiIsInJlcXVlc3RBbHdheXNBdXRob3JpemF0aW9uIiwiZ2V0TW9uaXRvcmVkUmVnaW9ucyIsImdldFJhbmdlZFJlZ2lvbnMiLCJpc1JhbmdpbmdBdmFpbGFibGUiLCJpc01vbml0b3JpbmdBdmFpbGFibGVGb3JDbGFzcyIsInN0YXJ0QWR2ZXJ0aXNpbmciLCJzdG9wQWR2ZXJ0aXNpbmciLCJpc0FkdmVydGlzaW5nQXZhaWxhYmxlIiwiaXNBZHZlcnRpc2luZyIsImRpc2FibGVEZWJ1Z0xvZ3MiLCJlbmFibGVEZWJ1Z05vdGlmaWNhdGlvbnMiLCJkaXNhYmxlRGVidWdOb3RpZmljYXRpb25zIiwiZW5hYmxlRGVidWdMb2dzIiwiYXBwZW5kVG9EZXZpY2VMb2ciLCJibGUiLCJzdGFydFNjYW4iLCJzdG9wU2NhbiIsImNvbm5lY3QiLCJkaXNjb25uZWN0IiwicmVhZCIsIndyaXRlIiwid3JpdGVXaXRob3V0UmVzcG9uc2UiLCJ3cml0ZUNvbW1hbmQiLCJ3YXJuaW5nIiwic3RhcnROb3RpZmljYXRpb24iLCJzdG9wTm90aWZpY2F0aW9uIiwiaXNDb25uZWN0ZWQiLCJlbmFibGUiLCJpc0VuYWJsZWQiLCJibHVldG9vdGhTZXJpYWwiLCJjb25uZWN0SW5zZWN1cmUiLCJsaXN0IiwiZGlzY292ZXJVbnBhaXJlZCIsInNldERldmljZURpc2NvdmVyZWRMaXN0ZW5lciIsImNsZWFyRGV2aWNlRGlzY292ZXJlZExpc3RlbmVyIiwic2hvd0JsdWV0b290aFNldHRpbmdzIiwiYXZhaWxhYmxlIiwicmVhZFVudGlsIiwic3Vic2NyaWJlIiwic3Vic2NyaWJlUmF3RGF0YSIsInVuc3Vic2NyaWJlIiwidW5zdWJzY3JpYmVSYXdEYXRhIiwicmVhZFJTU0kiLCJicmlnaHRuZXNzIiwiZ2V0QnJpZ2h0bmVzcyIsInNldEJyaWdodG5lc3MiLCJzZXRLZWVwU2NyZWVuT24iLCJjcmVhdGVDYWxlbmRhciIsImNhbGVuZGFyIiwiZ2V0Q3JlYXRlQ2FsZW5kYXJPcHRpb25zIiwiY2FsZW5kYXJOYW1lIiwiZGVsZXRlQ2FsZW5kYXIiLCJjcmVhdGVFdmVudCIsImxvY2F0aW9uIiwibm90ZXMiLCJzdGFydERhdGUiLCJlbmREYXRlIiwiRGF0ZSIsImNyZWF0ZUV2ZW50V2l0aE9wdGlvbnMiLCJnZXRDYWxlbmRhck9wdGlvbnMiLCJPYmplY3QiLCJrZXlzIiwiaW5kZXhPZiIsImNyZWF0ZUV2ZW50SW50ZXJhY3RpdmVseSIsImNyZWF0ZUV2ZW50SW5OYW1lZENhbGVuZGFyIiwiZmluZEV2ZW50IiwibGlzdEV2ZW50c0luUmFuZ2UiLCJsaXN0Q2FsZW5kYXJzIiwiZmluZEFsbEV2ZW50c0luTmFtZWRDYWxlbmRhciIsIm1vZGlmeUV2ZW50IiwibmV3VGl0bGUiLCJuZXdMb2NhdGlvbiIsIm5ld05vdGVzIiwibmV3U3RhcnREYXRlIiwibmV3RW5kRGF0ZSIsImRlbGV0ZUV2ZW50IiwiZ2V0UGljdHVyZSIsImNhbWVyYSIsImNsZWFudXAiLCJjYXB0dXJlQXVkaW8iLCJkZXZpY2UiLCJjYXB0dXJlIiwiY2FwdHVyZUltYWdlIiwiY2FwdHVyZVZpZGVvIiwiZXhwaXJ5IiwiY3Z2IiwiemlwIiwic3VwcHJlc3NNYW51YWwiLCJzdXBwcmVzc0NvbmZpcm0iLCJoaWRlTG9nbyIsInNldENhcmRJT1Jlc3BvbnNlRmllbGRzIiwiaXNBcnJheSIsInNldFNjYW5lckNvbmZpZyIsInNjYW5DYXJkIiwiQ2FyZElPIiwibGVuZ3RoIiwiU3RyaW5nIiwiZXhwaXJ5X3llYXIiLCJzdWJzdHIiLCJjb3B5IiwiY2xpcGJvYXJkIiwicGFzdGUiLCJzYXZlIiwiY29udGFjdHMiLCJjcmVhdGUiLCJyZW1vdmUiLCJjbG9uZSIsImZpbmQiLCJmaWVsZHMiLCJwaWNrQ29udGFjdCIsImRhdGUiLCJtb2RlIiwiZGF0ZVBpY2tlciIsImdldERldmljZSIsImdldENvcmRvdmEiLCJnZXRNb2RlbCIsIm1vZGVsIiwiZ2V0TmFtZSIsIm5hbWUiLCJnZXRQbGF0Zm9ybSIsInBsYXRmb3JtIiwiZ2V0VVVJRCIsInV1aWQiLCJnZXRWZXJzaW9uIiwidmVyc2lvbiIsImdldE1hbnVmYWN0dXJlciIsIm1hbnVmYWN0dXJlciIsImdldEN1cnJlbnRBY2NlbGVyYXRpb24iLCJpc1VuZGVmaW5lZCIsImFjY2VsZXJvbWV0ZXIiLCJpc0Z1bmN0aW9uIiwid2F0Y2hBY2NlbGVyYXRpb24iLCJjYW5jZWwiLCJjbGVhcldhdGNoIiwid2F0Y2hJRCIsImZyZXF1ZW5jeSIsImdldEN1cnJlbnRIZWFkaW5nIiwiY29tcGFzcyIsIndhdGNoSGVhZGluZyIsImFsZXJ0IiwiY29uZmlybSIsInByb21wdCIsImlucHV0MSIsImJ1dHRvbkluZGV4IiwiYmVlcCIsImFjdGl2aXR5U3RhcnQiLCJwbGF0Zm9ybUlkIiwiYWN0aXZpdHlTdG9wIiwicHJvZ3Jlc3NTdGFydCIsInByb2dyZXNzU3RvcCIsInByb2dyZXNzVmFsdWUiLCJlbWFpbCIsIm9wZW4iLCJhZGRBbGlhcyIsImJyb3dzZXJJbml0IiwiYXBwSUQiLCJhcHBWZXJzaW9uIiwiZmFjZWJvb2tDb25uZWN0UGx1Z2luIiwibG9naW4iLCJzaG93RGlhbG9nIiwiYXBpIiwiZ2V0QWNjZXNzVG9rZW4iLCJnZXRMb2dpblN0YXR1cyIsImxvZ291dCIsInNldE9wdGlvbnMiLCJGYWNlYm9va0FkcyIsImNyZWF0ZUJhbm5lciIsInJlbW92ZUJhbm5lciIsInNob3dCYW5uZXIiLCJzaG93QmFubmVyQXRYWSIsImhpZGVCYW5uZXIiLCJwcmVwYXJlSW50ZXJzdGl0aWFsIiwic2hvd0ludGVyc3RpdGlhbCIsImNvbnN0YW50IiwiZ2V0RnJlZURpc2tTcGFjZSIsImV4ZWMiLCJjaGVja0RpciIsInRlc3QiLCJyZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMIiwiaXNEaXJlY3RvcnkiLCJjb2RlIiwiY2hlY2tGaWxlIiwiaXNGaWxlIiwiY3JlYXRlRGlyIiwiZXhjbHVzaXZlIiwiZ2V0RGlyZWN0b3J5IiwiY3JlYXRlRmlsZSIsImdldEZpbGUiLCJyZW1vdmVEaXIiLCJzdWNjZXNzIiwiZmlsZVJlbW92ZWQiLCJyZW1vdmVGaWxlIiwicmVtb3ZlUmVjdXJzaXZlbHkiLCJ3cml0ZUZpbGUiLCJjcmVhdGVXcml0ZXIiLCJhcHBlbmQiLCJzZWVrIiwidHJ1bmNhdGUiLCJvbndyaXRlZW5kIiwiZXJyb3IiLCJhYm9ydCIsIndyaXRlRXhpc3RpbmdGaWxlIiwicmVhZEFzVGV4dCIsImZpbGUiLCJGaWxlUmVhZGVyIiwib25sb2FkZW5kIiwidGFyZ2V0IiwicmVzdWx0IiwicmVhZEFzRGF0YVVSTCIsInJlYWRBc0JpbmFyeVN0cmluZyIsInJlYWRBc0FycmF5QnVmZmVyIiwibW92ZUZpbGUiLCJtb3ZlVG8iLCJtb3ZlRGlyIiwiY29weURpciIsImNvcHlUbyIsImNvcHlGaWxlIiwicmVhZEZpbGVNZXRhZGF0YSIsImZpbGVPcGVuZXIyIiwidW5pbnN0YWxsIiwiYXBwSXNJbnN0YWxsZWQiLCJkb3dubG9hZCIsIkZpbGVUcmFuc2ZlciIsImVuY29kZVVSSSIsInRpbWVvdXQiLCJvbnByb2dyZXNzIiwidXBsb2FkIiwiZmxhc2hsaWdodCIsInN3aXRjaE9uIiwic3dpdGNoT2ZmIiwidG9nZ2xlIiwiRmx1cnJ5QWRzIiwiZ2FQbHVnaW4iLCJ0cmFja0V2ZW50IiwidHJhY2tQYWdlIiwic2V0VmFyaWFibGUiLCJleGl0Iiwid2F0Y2hQb3NpdGlvbiIsImdldFByZWZlcnJlZExhbmd1YWdlIiwiZ2xvYmFsaXphdGlvbiIsImdldExvY2FsZU5hbWUiLCJnZXRGaXJzdERheU9mV2VlayIsImRhdGVUb1N0cmluZyIsInN0cmluZ1RvRGF0ZSIsImdldERhdGVQYXR0ZXJuIiwiZ2V0RGF0ZU5hbWVzIiwiaXNEYXlMaWdodFNhdmluZ3NUaW1lIiwibnVtYmVyVG9TdHJpbmciLCJzdHJpbmdUb051bWJlciIsImdldE51bWJlclBhdHRlcm4iLCJnZXRDdXJyZW5jeVBhdHRlcm4iLCJzdGFydFRyYWNrZXJXaXRoSWQiLCJhbmFseXRpY3MiLCJzZXRVc2VySWQiLCJkZWJ1Z01vZGUiLCJ0cmFja1ZpZXciLCJhZGRDdXN0b21EaW1lbnNpb24iLCJwYXJzZUludCIsImlzTmFOIiwidHJhY2tFeGNlcHRpb24iLCJ0cmFja1RpbWluZyIsImFkZFRyYW5zYWN0aW9uIiwiYWRkVHJhbnNhY3Rpb25JdGVtIiwiZ2V0TWFwIiwicGx1Z2luIiwibWFwcyIsImdldEVsZW1lbnRCeUlkIiwiTWFwIiwic2V0RGl2IiwiaXNNYXBMb2FkZWQiLCJhZGRNYXJrZXIiLCJnZXRNYXBUeXBlSWRzIiwibWFwVHlwZUlkIiwic2V0VmlzaWJsZSIsImF1dGgiLCJnb29nbGVwbGF5Z2FtZSIsInNpZ25vdXQiLCJpc1NpZ25lZEluIiwic2hvd1BsYXllciIsInN1Ym1pdFNjb3JlIiwic2hvd0FsbExlYWRlcmJvYXJkcyIsInNob3dMZWFkZXJib2FyZCIsInVubG9ja0FjaGlldmVtZW50IiwiaW5jcmVtZW50QWNoaWV2ZW1lbnQiLCJzaG93QWNoaWV2ZW1lbnRzIiwiZ29vZ2xlcGx1cyIsImlPU0FwaUtleSIsInNpbGVudExvZ2luIiwidHJ5U2lsZW50TG9naW4iLCJoZWFsdGhraXQiLCJjaGVja0F1dGhTdGF0dXMiLCJyZXF1ZXN0QXV0aG9yaXphdGlvbiIsInJlYWRUeXBlcyIsIndyaXRlVHlwZXMiLCJyZWFkRGF0ZU9mQmlydGgiLCJyZWFkR2VuZGVyIiwic2F2ZVdlaWdodCIsInVuaXQiLCJhbW91bnQiLCJyZWFkV2VpZ2h0Iiwic2F2ZUhlaWdodCIsInJlYWRIZWlnaHQiLCJmaW5kV29ya291dHMiLCJzYXZlV29ya291dCIsInF1ZXJ5U2FtcGxlVHlwZSIsInN0YXJ0U2VydmVyIiwiQ29ySHR0cGQiLCJzdG9wU2VydmVyIiwiZ2V0VVJMIiwiZ2V0TG9jYWxQYXRoIiwiaUFkIiwiZ2V0UGljdHVyZXMiLCJpbWFnZVBpY2tlciIsImRlZmF1bHRPcHRpb25zIiwic2V0RGVmYXVsdE9wdGlvbnMiLCJmb3JFYWNoIiwiZCIsImpvaW4iLCJjbG9zZSIsImV4ZWN1dGVTY3JpcHQiLCJpbnNlcnRDU1MiLCJrZWVwQXdha2UiLCJpbnNvbW5pYSIsImFsbG93U2xlZXBBZ2FpbiIsInNoYXJlIiwiSW5zdGFncmFtIiwiaW1hZ2UiLCJjYXB0aW9uIiwiY29uc29sZSIsImlzSW5zdGFsbGVkIiwiJGV2YWxBc3luYyIsImhpZGVBY2Nlc3NvcnlCYXIiLCJpc1Zpc2libGUiLCJjbGVhclNob3dXYXRjaCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCIkJGxpc3RlbmVycyIsImNsZWFySGlkZVdhdGNoIiwiZ2V0Rm9yS2V5IiwiS2V5Y2hhaW4iLCJzZXRGb3JLZXkiLCJyZW1vdmVGb3JLZXkiLCJuYXZpZ2F0ZSIsImxhdW5jaG5hdmlnYXRvciIsImxvY2FsIiwib24iLCJzY2hlZHVsZSIsImFkZCIsIndhcm4iLCJ1cGRhdGUiLCJjbGVhckFsbCIsImNhbmNlbEFsbCIsImlzUHJlc2VudCIsImlzU2NoZWR1bGVkIiwiaXNUcmlnZ2VyZWQiLCJyZWdpc3RlclBlcm1pc3Npb24iLCJnZXRBbGxJZHMiLCJnZXRJZHMiLCJnZXRTY2hlZHVsZWRJZHMiLCJnZXRUcmlnZ2VyZWRJZHMiLCJnZXRBbGwiLCJnZXRTY2hlZHVsZWQiLCJnZXRBbGxTY2hlZHVsZWQiLCJnZXRUcmlnZ2VyZWQiLCJnZXRBbGxUcmlnZ2VyZWQiLCJnZXREZWZhdWx0cyIsInNldERlZmF1bHRzIiwibU1lZGlhIiwic2VydmljZSIsImlzRGVmaW5lZCIsImdldER1cmF0aW9uIiwiZHVyYXRpb24iLCJsb2ciLCJwb3NpdGlvbiIsIm1lZGlhIiwiTWVkaWEiLCJzdGF0dXMiLCJwcm90b3R5cGUiLCJwbGF5IiwicGF1c2UiLCJyZWxlYXNlIiwic2Vla1RvIiwic2V0Vm9sdW1lIiwic3RhcnRSZWNvcmQiLCJzdG9wUmVjb3JkIiwiY3VycmVudFRpbWUiLCJuZXdNZWRpYSIsIk1vYkZveCIsIk1vUHViIiwicHJlbG9hZFNpbXBsZSIsIk5hdGl2ZUF1ZGlvIiwicHJlbG9hZENvbXBsZXgiLCJsb29wIiwidW5sb2FkIiwic2V0Vm9sdW1lRm9yQ29tcGxleEFzc2V0IiwiY29ubmVjdGlvbiIsImdldE5ldHdvcmsiLCJpc09ubGluZSIsIkNvbm5lY3Rpb24iLCJVTktOT1dOIiwiTk9ORSIsImlzT2ZmbGluZSIsImNsZWFyT2ZmbGluZVdhdGNoIiwiY2xlYXJPbmxpbmVXYXRjaCIsInBpbkRpYWxvZyIsInBsdWdpbk5vdEVuYWJsZWRNZXNzYWdlIiwiZGVjb3JhdGVQcm9taXNlIiwic3RvcmUiLCJFcnJvciIsImFyZ3VtZW50cyIsImFwcFByZWZlcmVuY2VzIiwiZmV0Y2giLCJwcmludGVyIiwicHJpbnQiLCJQcm9ncmVzc0luZGljYXRvciIsInNob3dTaW1wbGUiLCJzaG93U2ltcGxlV2l0aExhYmVsIiwic2hvd1NpbXBsZVdpdGhMYWJlbERldGFpbCIsInNob3dEZXRlcm1pbmF0ZSIsInNob3dEZXRlcm1pbmF0ZVdpdGhMYWJlbCIsInNob3dBbm51bGFyIiwic2hvd0FubnVsYXJXaXRoTGFiZWwiLCJzaG93QmFyIiwic2hvd0JhcldpdGhMYWJlbCIsInNob3dTdWNjZXNzIiwic2hvd1RleHQiLCJvbk5vdGlmaWNhdGlvbiIsInJlZ2lzdGVyIiwiZWNiIiwicXVlcnlTZWxlY3RvciIsInB1c2hOb3RpZmljYXRpb24iLCJ1bnJlZ2lzdGVyIiwic2V0QmFkZ2VOdW1iZXIiLCJzZXRBcHBsaWNhdGlvbkljb25CYWRnZU51bWJlciIsImluaXRpYWxpemUiLCJQdXNoTm90aWZpY2F0aW9uIiwiJGVtaXQiLCJvbkVycm9yIiwicmVnaXN0cmF0aW9uSWQiLCJnZXRCYWRnZU51bWJlciIsImdldEFwcGxpY2F0aW9uSWNvbkJhZGdlTnVtYmVyIiwic2V0Q29sb3IiLCJSZWNlbnRzQ29udHJvbCIsInNldERlc2NyaXB0aW9uIiwiY2FwdHVyZVRvRmlsZSIsImV4dGVuc2lvbiIsInF1YWxpdHkiLCJzY3JlZW5zaG90IiwiZmlsZVBhdGgiLCJmaWxlbmFtZSIsImNhcHR1cmVUb1VyaSIsIlVSSSIsInJlcXVlc3RQZXJtaXNzaW9uIiwic2VyaWFsIiwid3JpdGVIZXgiLCJVaW50OEFycmF5IiwicmVnaXN0ZXJSZWFkQ2FsbGJhY2siLCJzZW5kIiwic21zIiwic29jaWFsc2hhcmluZyIsInNoYXJlV2l0aE9wdGlvbnMiLCJzaGFyZVZpYVR3aXR0ZXIiLCJzaGFyZVZpYVdoYXRzQXBwIiwic2hhcmVWaWFGYWNlYm9vayIsInNoYXJlVmlhRmFjZWJvb2tXaXRoUGFzdGVNZXNzYWdlSGludCIsInNoYXJlVmlhU01TIiwic2hhcmVWaWFFbWFpbCIsInNoYXJlVmlhIiwiY2FuU2hhcmVWaWFFbWFpbCIsImNhblNoYXJlVmlhIiwic3Bpbm5lckRpYWxvZyIsInNwbGFzaHNjcmVlbiIsIm9wZW5EQiIsImlzU3RyaW5nIiwiYmdUeXBlIiwic3FsaXRlUGx1Z2luIiwib3BlbkRhdGFiYXNlIiwiZXhlY3V0ZSIsInRyYW5zYWN0aW9uIiwiZXhlY3V0ZVNxbCIsImluc2VydENvbGxlY3Rpb24iLCJzbGljZSIsInNwbGljZSIsIm5lc3RlZEV4ZWN1dGUiLCJkZWxldGVEQiIsImRlbGV0ZURhdGFiYXNlIiwib3ZlcmxheXNXZWJWaWV3IiwiU1RZTEVTIiwiREVGQVVMVCIsIkxJR0hUX0NPTlRFTlQiLCJCTEFDS19UUkFOU0xVQ0VOVCIsIkJMQUNLX09QQVFVRSIsInN0eWxlIiwic3R5bGVMaWdodENvbnRlbnQiLCJzdHlsZUJsYWNrVHJhbnNsdWNlbnQiLCJzdHlsZUJsYWNrT3BhcXVlIiwic3R5bGVDb2xvciIsImJhY2tncm91bmRDb2xvckJ5TmFtZSIsInN0eWxlSGV4IiwiYmFja2dyb3VuZENvbG9yQnlIZXhTdHJpbmciLCJzaG93U2hvcnRUb3AiLCJ0b2FzdCIsInNob3dTaG9ydENlbnRlciIsInNob3dTaG9ydEJvdHRvbSIsInNob3dMb25nVG9wIiwic2hvd0xvbmdDZW50ZXIiLCJzaG93TG9uZ0JvdHRvbSIsInNob3dXaXRoT3B0aW9ucyIsImNoZWNrU3VwcG9ydCIsInRvdWNoaWQiLCJhdXRoZW50aWNhdGUiLCJzcGVhayIsIlRUUyIsInZpYnJhdGUiLCJ2aWJyYXRlV2l0aFBhdHRlcm4iLCJjYW5jZWxWaWJyYXRpb24iLCJzZXRMaW1pdCIsImxpbWl0Iiwic2V0TWF4RHVyYXRpb24iLCJzZXRIaWdoUXVhbGl0eSIsImhpZ2hxdWFsaXR5IiwidXNlRnJvbnRDYW1lcmEiLCJmcm9udGNhbWVyYSIsInNldFBvcnRyYWl0T3ZlcmxheSIsInBvcnRyYWl0T3ZlcmxheSIsInNldExhbmRzY2FwZU92ZXJsYXkiLCJsYW5kc2NhcGVPdmVybGF5Iiwic2V0T3ZlcmxheVRleHQiLCJvdmVybGF5VGV4dCIsInZpZGVvY2FwdHVyZXBsdXMiLCJ1bnppcCIsIiRzY29wZSIsImdvYmFjayIsImhpc3RvcnkiLCJnbyIsIiRjb3Jkb3ZhQ2FtZXJhIiwiJGNvcmRvdmFQbHVnaW4iLCJzb21lRnVuY3Rpb24iLCJ0YWtlUGljdHVyZSIsIm9wdGlvbnMiLCJkZXN0aW5hdGlvblR5cGUiLCJDYW1lcmEiLCJEZXN0aW5hdGlvblR5cGUiLCJEQVRBX1VSTCIsInNvdXJjZVR5cGUiLCJQaWN0dXJlU291cmNlVHlwZSIsIkNBTUVSQSIsImFsbG93RWRpdCIsImVuY29kaW5nVHlwZSIsIkVuY29kaW5nVHlwZSIsIkpQRUciLCJ0YXJnZXRXaWR0aCIsInRhcmdldEhlaWdodCIsInBvcG92ZXJPcHRpb25zIiwiQ2FtZXJhUG9wb3Zlck9wdGlvbnMiLCJzYXZlVG9QaG90b0FsYnVtIiwiY29ycmVjdE9yaWVudGF0aW9uIiwiaW1hZ2VEYXRhIiwiaW1nVVJJIiwiZXJyIiwiJGlvbmljTW9kYWwiLCJmcm9tVGVtcGxhdGVVcmwiLCJzY29wZSIsImFuaW1hdGlvbiIsIm1vZGFsIiwib3Blbk1vZGFsIiwiY2xvc2VNb2RhbCIsIiRvbiIsIiRhdXRoIiwiJHN0YXRlIiwiY2hpbGRMb2dpblNlcnZpY2UiLCJ1c2VyIiwidXNlckxvZ2luIiwicmVzcG9uc2UiLCJzZXRUb2tlbiIsInJldmVhbGVyIiwidXNlclNlcnZpY2UiLCJsb2dpblNlcnZpY2UiLCJtYWtlVXNlciIsIm5ld1VzZXIiLCJpZCIsImJhY2tkcm9wQ2xpY2tUb0Nsb3NlIiwib01vZGFsMSIsIm9Nb2RhbDIiLCJvTW9kYWwzIiwib01vZGFsNCIsIm9Nb2RhbDUiLCJpbmRleCIsIiRodHRwIiwibWV0aG9kIiwiZGF0YSIsIiRxIiwiZ2V0VXNlckluZm8iLCJnZXRQYXlsb2FkIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQUEsUUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0IsQ0FBQyxPQUFELEVBQVUsWUFBVixDQUF4QixFQUNDQyxNQURELENBQ1EsVUFBU0MsY0FBVCxFQUF5QkMsa0JBQXpCLEVBQTZDQyxhQUE3QyxFQUEyRDtBQUNqRUQscUJBQW1CRSxTQUFuQixDQUE2QixPQUE3QjtBQUNBSCxpQkFDQ0ksS0FERCxDQUNPLFVBRFAsRUFDa0I7QUFDaEJDLFNBQUksV0FEWTtBQUVoQkMsaUJBQWEsMkJBRkc7QUFHaEJDLGdCQUFZO0FBSEksR0FEbEIsRUFNQ0gsS0FORCxDQU1PLGFBTlAsRUFNcUI7QUFDbkJDLFNBQUksY0FEZTtBQUVuQkMsaUJBQWEsOEJBRk07QUFHbkJDLGdCQUFZO0FBSE8sR0FOckIsRUFXQ0gs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QW1CeEIsTUFBTXlCLFVBQU4sRUFBbkI7O0FBRUF4USxVQUFRMkMsR0FBUixDQUFZLEtBQUs0TixXQUFqQjs7QUFFQXZRLFVBQVEyQyxHQUFSLENBQVksb0JBQVo7QUFLQyxDQVpELEdBWUciLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW9uaWMgU3RhcnRlciBBcHBcblxuLy8gYW5ndWxhci5tb2R1bGUgaXMgYSBnbG9iYWwgcGxhY2UgZm9yIGNyZWF0aW5nLCByZWdpc3RlcmluZyBhbmQgcmV0cmlldmluZyBBbmd1bGFyIG1vZHVsZXNcbi8vICdzdGFydGVyJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xuXG5hbmd1bGFyLm1vZHVsZSgnY2hvcmUnLCBbJ2lvbmljJywgJ3NhdGVsbGl6ZXInXSlcbi5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJGF1dGhQcm92aWRlcil7XG4gICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoXCIvaG9tZVwiKTtcbiAgJHN0YXRlUHJvdmlkZXJcbiAgLnN0YXRlKCdhZGRDaGlsZCcse1xuICAgIHVybDpcIi9hZGRDaGlsZFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2FkZENoaWxkLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImFkZENoaWxkQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnYXNzaWduQ2hvcmUnLHtcbiAgICB1cmw6XCIvYXNzaWduQ2hvcmVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9hc3NpZ25DaG9yZS5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJhc3NpZ25DaG9yZUN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2VkaXRDaGlsZCcse1xuICAgIHVybDpcIi9lZGl0Q2hpbGQvOmlkXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvZWRpdENoaWxkLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImVkaXRDaGlsZEN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2hpc3RvcnknLHtcbiAgICB1cmw6XCIvaGlzdG9yeVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2hpc3RvcnkuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiaGlzdG9yeUN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2hvbWUnLHtcbiAgICB1cmw6XCIvaG9tZVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2hvbWUuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiaG9tZUN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2xvZ2luJyx7XG4gICAgdXJsOlwiL2xvZ2luXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvTG9naW4uaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwibG9naW5DdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdtYWtlQ2hvcmUnLHtcbiAgICB1cmw6XCIvbWFrZUNob3JlXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvbWFrZUNob3JlLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcIm1ha2VDaG9yZUN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ3NldFJld2FyZHMnLHtcbiAgICB1cmw6XCIvc2V0UmV3YXJkcy86aWRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9zZXRSZXdhcmRzLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcInNldFJld2FyZHNDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdzZXR0aW5ncycse1xuICAgIHVybDpcIi9zZXR0aW5nc1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL3NldHRpbmdzLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcInNldHRpbmdzQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgndHJhY2tlcicse1xuICAgIHVybDpcIi90cmFja2VyLzppZFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL3RyYWNrZXIuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwidHJhY2tlckN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ3VzZXJJbmZvJyx7XG4gICAgdXJsOlwiL3VzZXJJbmZvXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvdXNlckluZm8uaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwidXNlckluZm9DdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdjaGlsZEJhbmsnLHtcbiAgICB1cmw6XCIvY2hpbGQvYmFua1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2NoaWxkQmFuay5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJjaGlsZEJhbmtDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdjaGlsZEhvbWUnLHtcbiAgICB1cmw6XCIvY2hpbGQvaG9tZVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2NoaWxkSG9tZS5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJjaGlsZEhvbWVDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdjaGlsZExvZ2luJyx7XG4gICAgdXJsOlwiL2NoaWxkL2xvZ2luXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvY2hpbGRMb2dpbi5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJjaGlsZExvZ2luQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnY2hpbGRTZXR0aW5ncycse1xuICAgIHVybDpcIi9jaGlsZC9zZXR0aW5nc1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2NoaWxkU2V0dGluZ3MuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRTZXR0aW5nc0N0cmxcIlxuICB9KTtcbiAgJGF1dGhQcm92aWRlci5mYWNlYm9vayh7XG4gICAgY2xpZW50SWQ6ICczMzIyNzIwNTcxMzI2ODEnXG4gIH0pO1xuXG4gIC8vIE9wdGlvbmFsOiBGb3IgY2xpZW50LXNpZGUgdXNlIChJbXBsaWNpdCBHcmFudCksIHNldCByZXNwb25zZVR5cGUgdG8gJ3Rva2VuJyAoZGVmYXVsdDogJ2NvZGUnKVxuICAkYXV0aFByb3ZpZGVyLmZhY2Vib29rKHtcbiAgICBjbGllbnRJZDogJzMzMjI3MjA1NzEzMjY4MScsXG4gICAgcmVzcG9uc2VUeXBlOiAndG9rZW4nXG4gIH0pO1xuXG4gICRhdXRoUHJvdmlkZXIuZ29vZ2xlKHtcbiAgICBjbGllbnRJZDogJzI3NTM1Mjk2MDk0Ni01cmNhbjNxa2hsc2M3bTUwaGV2NWRuMmUyY2FlOW1icC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbScsXG4gICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTAwLyMvbG9naW4vJ1xuICB9KTtcbn0pXG5cblxuXG4ucnVuKGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtKSB7XG4gICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIGlmKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgIC8vIEhpZGUgdGhlIGFjY2Vzc29yeSBiYXIgYnkgZGVmYXVsdCAocmVtb3ZlIHRoaXMgdG8gc2hvdyB0aGUgYWNjZXNzb3J5IGJhciBhYm92ZSB0aGUga2V5Ym9hcmRcbiAgICAgIC8vIGZvciBmb3JtIGlucHV0cylcbiAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG5cbiAgICAgIC8vIERvbid0IHJlbW92ZSB0aGlzIGxpbmUgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZy4gSXQgc3RvcHMgdGhlIHZpZXdwb3J0XG4gICAgICAvLyBmcm9tIHNuYXBwaW5nIHdoZW4gdGV4dCBpbnB1dHMgYXJlIGZvY3VzZWQuIElvbmljIGhhbmRsZXMgdGhpcyBpbnRlcm5hbGx5IGZvclxuICAgICAgLy8gYSBtdWNoIG5pY2VyIGtleWJvYXJkIGV4cGVyaWVuY2UuXG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbCh0cnVlKTtcbiAgICB9XG4gICAgaWYod2luZG93LlN0YXR1c0Jhcikge1xuICAgICAgU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpO1xuICAgIH1cbiAgfSk7XG59KVxuIiwiLyohXG4gKiBuZ0NvcmRvdmFcbiAqIHYwLjEuMjctYWxwaGFcbiAqIENvcHlyaWdodCAyMDE1IERyaWZ0eSBDby4gaHR0cDovL2RyaWZ0eS5jb20vXG4gKiBTZWUgTElDRU5TRSBpbiB0aGlzIHJlcG9zaXRvcnkgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb25cbiAqL1xuIWZ1bmN0aW9uKCl7YW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmFcIixbXCJuZ0NvcmRvdmEucGx1Z2luc1wiXSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy4zZHRvdWNoXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YTNEVG91Y2hcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3ZhciBuPVtdLHI9e30sbz1mdW5jdGlvbihlKXtyZXR1cm4gZnVuY3Rpb24obil7Zm9yKHZhciByIGluIGUpbi50eXBlPT09ciYmZVtyXSgpfX07cmV0dXJue2lzQXZhaWxhYmxlOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiB3aW5kb3cuY29yZG92YT93aW5kb3cuVGhyZWVEZWVUb3VjaD93aW5kb3cuVGhyZWVEZWVUb3VjaC5pc0F2YWlsYWJsZShmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSk6bi5yZWplY3QoXCJDb3VsZCBub3QgZmluZCAzRCB0b3VjaCBwbHVnaW5cIik6bi5yZWplY3QoXCJOb3Qgc3VwcG9ydGVkIGluIGJyb3dzZXJcIiksbi5wcm9taXNlfSxhZGRRdWlja0FjdGlvbjpmdW5jdGlvbih0LGksYSxjLHUscyl7dmFyIGw9ZS5kZWZlcigpLGY9e3R5cGU6dCx0aXRsZTppLHN1YnRpdGxlOnV9O3JldHVybiBhJiYoZi5pY29uVHlwZT1hKSxjJiYoZi5pY29uVGVtcGxhdGU9YyksdGhpcy5pc0F2YWlsYWJsZSgpLnRoZW4oZnVuY3Rpb24oKXtuLnB1c2goZiksclt0XT1zLHdpbmRvdy5UaHJlZURlZVRvdWNoLmNvbmZpZ3VyZVF1aWNrQWN0aW9ucyhuKSx3aW5kb3cuVGhyZWVEZWVUb3VjaC5vbkhvbWVJY29uUHJlc3NlZD1vKHIpLGwucmVzb2x2ZShuKX0sZnVuY3Rpb24oZSl7bC5yZWplY3QoZSl9KSxsLnByb21pc2V9LGFkZFF1aWNrQWN0aW9uSGFuZGxlcjpmdW5jdGlvbihuLHQpe3ZhciBpPWUuZGVmZXIoKTtyZXR1cm4gdGhpcy5pc0F2YWlsYWJsZSgpLnRoZW4oZnVuY3Rpb24oKXtyW25dPXQsd2luZG93LlRocmVlRGVlVG91Y2gub25Ib21lSWNvblByZXNzZWQ9byhyKSxpLnJlc29sdmUoITApfSxmdW5jdGlvbihlKXtpLnJlamVjdChlKX0pLGkucHJvbWlzZX0sZW5hYmxlTGlua1ByZXZpZXc6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIHRoaXMuaXNBdmFpbGFibGUoKS50aGVuKGZ1bmN0aW9uKCl7d2luZG93LlRocmVlRGVlVG91Y2guZW5hYmxlTGlua1ByZXZpZXcoKSxuLnJlc29sdmUoITApfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sYWRkRm9yY2VUb3VjaEhhbmRsZXI6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiB0aGlzLmlzQXZhaWxhYmxlKCkudGhlbihmdW5jdGlvbigpe3dpbmRvdy5UaHJlZURlZVRvdWNoLndhdGNoRm9yY2VUb3VjaGVzKG4pLHIucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5hY3Rpb25TaGVldFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFBY3Rpb25TaGVldFwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57c2hvdzpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5hY3Rpb25zaGVldC5zaG93KHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSksby5wcm9taXNlfSxoaWRlOmZ1bmN0aW9uKCl7cmV0dXJuIG4ucGx1Z2lucy5hY3Rpb25zaGVldC5oaWRlKCl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmFkTW9iXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUFkTW9iXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntjcmVhdGVCYW5uZXJWaWV3OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLkFkTW9iLmNyZWF0ZUJhbm5lclZpZXcocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LGNyZWF0ZUludGVyc3RpdGlhbFZpZXc6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuQWRNb2IuY3JlYXRlSW50ZXJzdGl0aWFsVmlldyhyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0scmVxdWVzdEFkOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLkFkTW9iLnJlcXVlc3RBZChyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0FkOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLkFkTW9iLnNob3dBZChyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0scmVxdWVzdEludGVyc3RpdGlhbEFkOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLkFkTW9iLnJlcXVlc3RJbnRlcnN0aXRpYWxBZChyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuYXBwQXZhaWxhYmlsaXR5XCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUFwcEF2YWlsYWJpbGl0eVwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2NoZWNrOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gYXBwQXZhaWxhYmlsaXR5LmNoZWNrKG4sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuYXBwUmF0ZVwiLFtdKS5wcm92aWRlcihcIiRjb3Jkb3ZhQXBwUmF0ZVwiLFtmdW5jdGlvbigpe3RoaXMuc2V0UHJlZmVyZW5jZXM9ZnVuY3Rpb24oZSl7ZSYmYW5ndWxhci5pc09iamVjdChlKSYmKEFwcFJhdGUucHJlZmVyZW5jZXMudXNlTGFuZ3VhZ2U9ZS5sYW5ndWFnZXx8bnVsbCxBcHBSYXRlLnByZWZlcmVuY2VzLmRpc3BsYXlBcHBOYW1lPWUuYXBwTmFtZXx8XCJcIixBcHBSYXRlLnByZWZlcmVuY2VzLnByb21wdEFnYWluRm9yRWFjaE5ld1ZlcnNpb249ZS5wcm9tcHRGb3JOZXdWZXJzaW9ufHwhMCxBcHBSYXRlLnByZWZlcmVuY2VzLm9wZW5TdG9yZUluQXBwPWUub3BlblN0b3JlSW5BcHB8fCExLEFwcFJhdGUucHJlZmVyZW5jZXMudXNlc1VudGlsUHJvbXB0PWUudXNlc1VudGlsUHJvbXB0fHwzLEFwcFJhdGUucHJlZmVyZW5jZXMudXNlQ3VzdG9tUmF0ZURpYWxvZz1lLnVzZUN1c3RvbVJhdGVEaWFsb2d8fCExLEFwcFJhdGUucHJlZmVyZW5jZXMuc3RvcmVBcHBVUkwuaW9zPWUuaW9zVVJMfHxudWxsLEFwcFJhdGUucHJlZmVyZW5jZXMuc3RvcmVBcHBVUkwuYW5kcm9pZD1lLmFuZHJvaWRVUkx8fG51bGwsQXBwUmF0ZS5wcmVmZXJlbmNlcy5zdG9yZUFwcFVSTC5ibGFja2JlcnJ5PWUuYmxhY2tiZXJyeVVSTHx8bnVsbCxBcHBSYXRlLnByZWZlcmVuY2VzLnN0b3JlQXBwVVJMLndpbmRvd3M4PWUud2luZG93c1VSTHx8bnVsbCl9LHRoaXMuc2V0Q3VzdG9tTG9jYWxlPWZ1bmN0aW9uKGUpe3ZhciBuPXt0aXRsZTpcIlJhdGUgJUBcIixtZXNzYWdlOlwiSWYgeW91IGVuam95IHVzaW5nICVALCB3b3VsZCB5b3UgbWluZCB0YWtpbmcgYSBtb21lbnQgdG8gcmF0ZSBpdD8gSXQgd29u4oCZdCB0YWtlIG1vcmUgdGhhbiBhIG1pbnV0ZS4gVGhhbmtzIGZvciB5b3VyIHN1cHBvcnQhXCIsY2FuY2VsQnV0dG9uTGFiZWw6XCJObywgVGhhbmtzXCIsbGF0ZXJCdXR0b25MYWJlbDpcIlJlbWluZCBNZSBMYXRlclwiLHJhdGVCdXR0b25MYWJlbDpcIlJhdGUgSXQgTm93XCJ9O249YW5ndWxhci5leHRlbmQobixlKSxBcHBSYXRlLnByZWZlcmVuY2VzLmN1c3RvbUxvY2FsZT1ufSx0aGlzLiRnZXQ9W1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57cHJvbXB0Rm9yUmF0aW5nOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKSxvPUFwcFJhdGUucHJvbXB0Rm9yUmF0aW5nKG4pO3JldHVybiByLnJlc29sdmUobyksci5wcm9taXNlfSxuYXZpZ2F0ZVRvQXBwU3RvcmU6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCkscj1BcHBSYXRlLm5hdmlnYXRlVG9BcHBTdG9yZSgpO3JldHVybiBuLnJlc29sdmUociksbi5wcm9taXNlfSxvbkJ1dHRvbkNsaWNrZWQ6ZnVuY3Rpb24oZSl7QXBwUmF0ZS5wcmVmZXJlbmNlcy5jYWxsYmFja3Mub25CdXR0b25DbGlja2VkPWUuYmluZCh0aGlzKX0sb25SYXRlRGlhbG9nU2hvdzpmdW5jdGlvbihlKXtBcHBSYXRlLnByZWZlcmVuY2VzLmNhbGxiYWNrcy5vblJhdGVEaWFsb2dTaG93PWUuYmluZCh0aGlzKX19fV19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5hcHBWZXJzaW9uXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUFwcFZlcnNpb25cIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntnZXRBcHBOYW1lOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLmdldEFwcFZlcnNpb24uZ2V0QXBwTmFtZShmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9KSxuLnByb21pc2V9LGdldFBhY2thZ2VOYW1lOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLmdldEFwcFZlcnNpb24uZ2V0UGFja2FnZU5hbWUoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSksbi5wcm9taXNlfSxnZXRWZXJzaW9uTnVtYmVyOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLmdldEFwcFZlcnNpb24uZ2V0VmVyc2lvbk51bWJlcihmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9KSxuLnByb21pc2V9LGdldFZlcnNpb25Db2RlOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLmdldEFwcFZlcnNpb24uZ2V0VmVyc2lvbkNvZGUoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSksbi5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5iYWNrZ3JvdW5kR2VvbG9jYXRpb25cIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQmFja2dyb3VuZEdlb2xvY2F0aW9uXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntpbml0OmZ1bmN0aW9uKCl7bi5uYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKGZ1bmN0aW9uKGUpe3JldHVybiBlfSl9LGNvbmZpZ3VyZTpmdW5jdGlvbihyKXt0aGlzLmluaXQoKTt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5iYWNrZ3JvdW5kR2VvTG9jYXRpb24uY29uZmlndXJlKGZ1bmN0aW9uKGUpe28ubm90aWZ5KGUpLG4ucGx1Z2lucy5iYWNrZ3JvdW5kR2VvTG9jYXRpb24uZmluaXNoKCl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSxyKSx0aGlzLnN0YXJ0KCksby5wcm9taXNlfSxzdGFydDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmJhY2tncm91bmRHZW9Mb2NhdGlvbi5zdGFydChmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxzdG9wOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuYmFja2dyb3VuZEdlb0xvY2F0aW9uLnN0b3AoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuYmFkZ2VcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQmFkZ2VcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntoYXNQZXJtaXNzaW9uOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmJhZGdlLmhhc1Blcm1pc3Npb24oZnVuY3Rpb24oZSl7ZT9uLnJlc29sdmUoITApOm4ucmVqZWN0KFwiWW91IGRvIG5vdCBoYXZlIHBlcm1pc3Npb25cIil9KSxuLnByb21pc2V9LHByb21wdEZvclBlcm1pc3Npb246ZnVuY3Rpb24oKXtyZXR1cm4gY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5iYWRnZS5wcm9tcHRGb3JQZXJtaXNzaW9uKCl9LHNldDpmdW5jdGlvbihuLHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmJhZGdlLmhhc1Blcm1pc3Npb24oZnVuY3Rpb24oZSl7ZT90LnJlc29sdmUoY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5iYWRnZS5zZXQobixyLG8pKTp0LnJlamVjdChcIllvdSBkbyBub3QgaGF2ZSBwZXJtaXNzaW9uIHRvIHNldCBCYWRnZVwiKX0pLHQucHJvbWlzZX0sZ2V0OmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmJhZGdlLmhhc1Blcm1pc3Npb24oZnVuY3Rpb24oZSl7ZT9jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmJhZGdlLmdldChmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9KTpuLnJlamVjdChcIllvdSBkbyBub3QgaGF2ZSBwZXJtaXNzaW9uIHRvIGdldCBCYWRnZVwiKX0pLG4ucHJvbWlzZX0sY2xlYXI6ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24uYmFkZ2UuaGFzUGVybWlzc2lvbihmdW5jdGlvbihlKXtlP28ucmVzb2x2ZShjb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmJhZGdlLmNsZWFyKG4scikpOm8ucmVqZWN0KFwiWW91IGRvIG5vdCBoYXZlIHBlcm1pc3Npb24gdG8gY2xlYXIgQmFkZ2VcIil9KSxvLnByb21pc2V9LGluY3JlYXNlOmZ1bmN0aW9uKG4scixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIHRoaXMuaGFzUGVybWlzc2lvbigpLnRoZW4oZnVuY3Rpb24oKXt0LnJlc29sdmUoY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5iYWRnZS5pbmNyZWFzZShuLHIsbykpfSxmdW5jdGlvbigpe3QucmVqZWN0KFwiWW91IGRvIG5vdCBoYXZlIHBlcm1pc3Npb24gdG8gaW5jcmVhc2UgQmFkZ2VcIil9KSx0LnByb21pc2V9LGRlY3JlYXNlOmZ1bmN0aW9uKG4scixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIHRoaXMuaGFzUGVybWlzc2lvbigpLnRoZW4oZnVuY3Rpb24oKXt0LnJlc29sdmUoY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5iYWRnZS5kZWNyZWFzZShuLHIsbykpfSxmdW5jdGlvbigpe3QucmVqZWN0KFwiWW91IGRvIG5vdCBoYXZlIHBlcm1pc3Npb24gdG8gZGVjcmVhc2UgQmFkZ2VcIil9KSx0LnByb21pc2V9LGNvbmZpZ3VyZTpmdW5jdGlvbihlKXtyZXR1cm4gY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5iYWRnZS5jb25maWd1cmUoZSl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmJhcmNvZGVTY2FubmVyXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUJhcmNvZGVTY2FubmVyXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57c2NhbjpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5iYXJjb2RlU2Nhbm5lci5zY2FuKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LG4pLHIucHJvbWlzZX0sZW5jb2RlOmZ1bmN0aW9uKG4scil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuPW58fFwiVEVYVF9UWVBFXCIsY29yZG92YS5wbHVnaW5zLmJhcmNvZGVTY2FubmVyLmVuY29kZShuLHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuYmF0dGVyeVN0YXR1c1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFCYXR0ZXJ5U3RhdHVzXCIsW1wiJHJvb3RTY29wZVwiLFwiJHdpbmRvd1wiLFwiJHRpbWVvdXRcIixmdW5jdGlvbihlLG4scil7dmFyIG89ZnVuY3Rpb24obil7cihmdW5jdGlvbigpe2UuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhQmF0dGVyeVN0YXR1czpzdGF0dXNcIixuKX0pfSx0PWZ1bmN0aW9uKG4pe3IoZnVuY3Rpb24oKXtlLiRicm9hZGNhc3QoXCIkY29yZG92YUJhdHRlcnlTdGF0dXM6Y3JpdGljYWxcIixuKX0pfSxpPWZ1bmN0aW9uKG4pe3IoZnVuY3Rpb24oKXtlLiRicm9hZGNhc3QoXCIkY29yZG92YUJhdHRlcnlTdGF0dXM6bG93XCIsbil9KX07cmV0dXJuIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkZXZpY2VyZWFkeVwiLGZ1bmN0aW9uKCl7bmF2aWdhdG9yLmJhdHRlcnkmJihuLmFkZEV2ZW50TGlzdGVuZXIoXCJiYXR0ZXJ5c3RhdHVzXCIsbywhMSksbi5hZGRFdmVudExpc3RlbmVyKFwiYmF0dGVyeWNyaXRpY2FsXCIsdCwhMSksbi5hZGRFdmVudExpc3RlbmVyKFwiYmF0dGVyeWxvd1wiLGksITEpKX0sITEpLCEwfV0pLnJ1bihbXCIkaW5qZWN0b3JcIixmdW5jdGlvbihlKXtlLmdldChcIiRjb3Jkb3ZhQmF0dGVyeVN0YXR1c1wiKX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmJlYWNvblwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFCZWFjb25cIixbXCIkd2luZG93XCIsXCIkcm9vdFNjb3BlXCIsXCIkdGltZW91dFwiLFwiJHFcIixmdW5jdGlvbihlLG4scixvKXt2YXIgdD1udWxsLGk9bnVsbCxhPW51bGwsYz1udWxsLHU9bnVsbCxzPW51bGwsbD1udWxsLGY9bnVsbDtyZXR1cm4gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRldmljZXJlYWR5XCIsZnVuY3Rpb24oKXtpZihlLmNvcmRvdmEmJmUuY29yZG92YS5wbHVnaW5zJiZlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIpe3ZhciBvPW5ldyBlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuRGVsZWdhdGU7by5kaWREZXRlcm1pbmVTdGF0ZUZvclJlZ2lvbj1mdW5jdGlvbihlKXtyKGZ1bmN0aW9uKCl7bi4kYnJvYWRjYXN0KFwiJGNvcmRvdmFCZWFjb246ZGlkRGV0ZXJtaW5lU3RhdGVGb3JSZWdpb25cIixlKX0pLHQmJnQoZSl9LG8uZGlkU3RhcnRNb25pdG9yaW5nRm9yUmVnaW9uPWZ1bmN0aW9uKGUpe3IoZnVuY3Rpb24oKXtuLiRicm9hZGNhc3QoXCIkY29yZG92YUJlYWNvbjpkaWRTdGFydE1vbml0b3JpbmdGb3JSZWdpb25cIixlKX0pLGkmJmkoZSl9LG8uZGlkRXhpdFJlZ2lvbj1mdW5jdGlvbihlKXtyKGZ1bmN0aW9uKCl7bi4kYnJvYWRjYXN0KFwiJGNvcmRvdmFCZWFjb246ZGlkRXhpdFJlZ2lvblwiLGUpfSksYSYmYShlKX0sby5kaWRFbnRlclJlZ2lvbj1mdW5jdGlvbihlKXtyKGZ1bmN0aW9uKCl7bi4kYnJvYWRjYXN0KFwiJGNvcmRvdmFCZWFjb246ZGlkRW50ZXJSZWdpb25cIixlKX0pLGMmJmMoZSl9LG8uZGlkUmFuZ2VCZWFjb25zSW5SZWdpb249ZnVuY3Rpb24oZSl7cihmdW5jdGlvbigpe24uJGJyb2FkY2FzdChcIiRjb3Jkb3ZhQmVhY29uOmRpZFJhbmdlQmVhY29uc0luUmVnaW9uXCIsZSl9KSx1JiZ1KGUpfSxvLnBlcmlwaGVyYWxNYW5hZ2VyRGlkU3RhcnRBZHZlcnRpc2luZz1mdW5jdGlvbihlKXtyKGZ1bmN0aW9uKCl7bi4kYnJvYWRjYXN0KFwiJGNvcmRvdmFCZWFjb246cGVyaXBoZXJhbE1hbmFnZXJEaWRTdGFydEFkdmVydGlzaW5nXCIsZSl9KSxzJiZzKGUpfSxvLnBlcmlwaGVyYWxNYW5hZ2VyRGlkVXBkYXRlU3RhdGU9ZnVuY3Rpb24oZSl7cihmdW5jdGlvbigpe24uJGJyb2FkY2FzdChcIiRjb3Jkb3ZhQmVhY29uOnBlcmlwaGVyYWxNYW5hZ2VyRGlkVXBkYXRlU3RhdGVcIixlKX0pLGwmJmwoZSl9LG8uZGlkQ2hhbmdlQXV0aG9yaXphdGlvblN0YXR1cz1mdW5jdGlvbihlKXtyKGZ1bmN0aW9uKCl7bi4kYnJvYWRjYXN0KFwiJGNvcmRvdmFCZWFjb246ZGlkQ2hhbmdlQXV0aG9yaXphdGlvblN0YXR1c1wiLGUpfSksZiYmZihlKX0sZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLnNldERlbGVnYXRlKG8pfX0sITEpLHtzZXRDYWxsYmFja0RpZERldGVybWluZVN0YXRlRm9yUmVnaW9uOmZ1bmN0aW9uKGUpe3Q9ZX0sc2V0Q2FsbGJhY2tEaWRTdGFydE1vbml0b3JpbmdGb3JSZWdpb246ZnVuY3Rpb24oZSl7aT1lfSxzZXRDYWxsYmFja0RpZEV4aXRSZWdpb246ZnVuY3Rpb24oZSl7YT1lfSxzZXRDYWxsYmFja0RpZEVudGVyUmVnaW9uOmZ1bmN0aW9uKGUpe2M9ZX0sc2V0Q2FsbGJhY2tEaWRSYW5nZUJlYWNvbnNJblJlZ2lvbjpmdW5jdGlvbihlKXt1PWV9LHNldENhbGxiYWNrUGVyaXBoZXJhbE1hbmFnZXJEaWRTdGFydEFkdmVydGlzaW5nOmZ1bmN0aW9uKGUpe3M9ZX0sc2V0Q2FsbGJhY2tQZXJpcGhlcmFsTWFuYWdlckRpZFVwZGF0ZVN0YXRlOmZ1bmN0aW9uKGUpe2w9ZX0sc2V0Q2FsbGJhY2tEaWRDaGFuZ2VBdXRob3JpemF0aW9uU3RhdHVzOmZ1bmN0aW9uKGUpe2Y9ZX0sY3JlYXRlQmVhY29uUmVnaW9uOmZ1bmN0aW9uKG4scixvLHQsaSl7cmV0dXJuIG89b3x8dm9pZCAwLHQ9dHx8dm9pZCAwLG5ldyBlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuQmVhY29uUmVnaW9uKG4scixvLHQsaSl9LGlzQmx1ZXRvb3RoRW5hYmxlZDpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmlzQmx1ZXRvb3RoRW5hYmxlZCgpKX0sZW5hYmxlQmx1ZXRvb3RoOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuZW5hYmxlQmx1ZXRvb3RoKCkpfSxkaXNhYmxlQmx1ZXRvb3RoOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuZGlzYWJsZUJsdWV0b290aCgpKX0sc3RhcnRNb25pdG9yaW5nRm9yUmVnaW9uOmZ1bmN0aW9uKG4pe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLnN0YXJ0TW9uaXRvcmluZ0ZvclJlZ2lvbihuKSl9LHN0b3BNb25pdG9yaW5nRm9yUmVnaW9uOmZ1bmN0aW9uKG4pe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLnN0b3BNb25pdG9yaW5nRm9yUmVnaW9uKG4pKX0scmVxdWVzdFN0YXRlRm9yUmVnaW9uOmZ1bmN0aW9uKG4pe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLnJlcXVlc3RTdGF0ZUZvclJlZ2lvbihuKSl9LHN0YXJ0UmFuZ2luZ0JlYWNvbnNJblJlZ2lvbjpmdW5jdGlvbihuKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5zdGFydFJhbmdpbmdCZWFjb25zSW5SZWdpb24obikpfSxzdG9wUmFuZ2luZ0JlYWNvbnNJblJlZ2lvbjpmdW5jdGlvbihuKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5zdG9wUmFuZ2luZ0JlYWNvbnNJblJlZ2lvbihuKSl9LGdldEF1dGhvcml6YXRpb25TdGF0dXM6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5nZXRBdXRob3JpemF0aW9uU3RhdHVzKCkpfSxyZXF1ZXN0V2hlbkluVXNlQXV0aG9yaXphdGlvbjpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLnJlcXVlc3RXaGVuSW5Vc2VBdXRob3JpemF0aW9uKCkpfSxyZXF1ZXN0QWx3YXlzQXV0aG9yaXphdGlvbjpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLnJlcXVlc3RBbHdheXNBdXRob3JpemF0aW9uKCkpfSxnZXRNb25pdG9yZWRSZWdpb25zOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuZ2V0TW9uaXRvcmVkUmVnaW9ucygpKX0sZ2V0UmFuZ2VkUmVnaW9uczpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmdldFJhbmdlZFJlZ2lvbnMoKSl9LGlzUmFuZ2luZ0F2YWlsYWJsZTpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmlzUmFuZ2luZ0F2YWlsYWJsZSgpKX0saXNNb25pdG9yaW5nQXZhaWxhYmxlRm9yQ2xhc3M6ZnVuY3Rpb24obil7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuaXNNb25pdG9yaW5nQXZhaWxhYmxlRm9yQ2xhc3MobikpfSxzdGFydEFkdmVydGlzaW5nOmZ1bmN0aW9uKG4scil7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuc3RhcnRBZHZlcnRpc2luZyhuLHIpKX0sc3RvcEFkdmVydGlzaW5nOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuc3RvcEFkdmVydGlzaW5nKCkpfSxpc0FkdmVydGlzaW5nQXZhaWxhYmxlOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuaXNBZHZlcnRpc2luZ0F2YWlsYWJsZSgpKX0saXNBZHZlcnRpc2luZzpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmlzQWR2ZXJ0aXNpbmcoKSl9LGRpc2FibGVEZWJ1Z0xvZ3M6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5kaXNhYmxlRGVidWdMb2dzKCkpfSxlbmFibGVEZWJ1Z05vdGlmaWNhdGlvbnM6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5lbmFibGVEZWJ1Z05vdGlmaWNhdGlvbnMoKSl9LGRpc2FibGVEZWJ1Z05vdGlmaWNhdGlvbnM6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5kaXNhYmxlRGVidWdOb3RpZmljYXRpb25zKCkpfSxlbmFibGVEZWJ1Z0xvZ3M6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5lbmFibGVEZWJ1Z0xvZ3MoKSl9LGFwcGVuZFRvRGV2aWNlTG9nOmZ1bmN0aW9uKG4pe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmFwcGVuZFRvRGV2aWNlTG9nKG4pKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuYmxlXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUJMRVwiLFtcIiRxXCIsXCIkdGltZW91dFwiLFwiJGxvZ1wiLGZ1bmN0aW9uKGUsbixyKXtyZXR1cm57c2NhbjpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gYmxlLnN0YXJ0U2NhbihyLGZ1bmN0aW9uKGUpe3Qubm90aWZ5KGUpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0pLG4oZnVuY3Rpb24oKXtibGUuc3RvcFNjYW4oZnVuY3Rpb24oKXt0LnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7dC5yZWplY3QoZSl9KX0sMWUzKm8pLHQucHJvbWlzZX0sc3RhcnRTY2FuOmZ1bmN0aW9uKGUsbixyKXtyZXR1cm4gYmxlLnN0YXJ0U2NhbihlLG4scil9LHN0b3BTY2FuOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBibGUuc3RvcFNjYW4oZnVuY3Rpb24oKXtuLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9LGNvbm5lY3Q6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBibGUuY29ubmVjdChuLGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LGRpc2Nvbm5lY3Q6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBibGUuZGlzY29ubmVjdChuLGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHJlYWQ6ZnVuY3Rpb24obixyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gYmxlLnJlYWQobixyLG8sZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0pLHQucHJvbWlzZX0sd3JpdGU6ZnVuY3Rpb24obixyLG8sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiBibGUud3JpdGUobixyLG8sdCxmdW5jdGlvbihlKXtpLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2kucmVqZWN0KGUpfSksaS5wcm9taXNlfSx3cml0ZVdpdGhvdXRSZXNwb25zZTpmdW5jdGlvbihuLHIsbyx0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIGJsZS53cml0ZVdpdGhvdXRSZXNwb25zZShuLHIsbyx0LGZ1bmN0aW9uKGUpe2kucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7aS5yZWplY3QoZSl9KSxpLnByb21pc2V9LHdyaXRlQ29tbWFuZDpmdW5jdGlvbihlLG4sbyx0KXtyZXR1cm4gci53YXJuaW5nKFwid3JpdGVDb21tYW5kIGlzIGRlcHJlY2F0ZWQsIHVzZSB3cml0ZVdpdGhvdXRSZXNwb25zZVwiKSx0aGlzLndyaXRlV2l0aG91dFJlc3BvbnNlKGUsbixvLHQpfSxzdGFydE5vdGlmaWNhdGlvbjpmdW5jdGlvbihlLG4scixvLHQpe3JldHVybiBibGUuc3RhcnROb3RpZmljYXRpb24oZSxuLHIsbyx0KX0sc3RvcE5vdGlmaWNhdGlvbjpmdW5jdGlvbihuLHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBibGUuc3RvcE5vdGlmaWNhdGlvbihuLHIsbyxmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSksdC5wcm9taXNlfSxpc0Nvbm5lY3RlZDpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGJsZS5pc0Nvbm5lY3RlZChuLGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LGVuYWJsZTpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gYmxlLmVuYWJsZShmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxpc0VuYWJsZWQ6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGJsZS5pc0VuYWJsZWQoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuYmx1ZXRvb3RoU2VyaWFsXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUJsdWV0b290aFNlcmlhbFwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57Y29ubmVjdDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCksdD1lLmRlZmVyKCksaT0hMTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwuY29ubmVjdChyLGZ1bmN0aW9uKCl7aT0hMCxvLnJlc29sdmUodCl9LGZ1bmN0aW9uKGUpe2k9PT0hMSYmdC5yZWplY3QoZSksby5yZWplY3QoZSl9KSxvLnByb21pc2V9LGNvbm5lY3RJbnNlY3VyZTpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLmNvbm5lY3RJbnNlY3VyZShyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxkaXNjb25uZWN0OmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5kaXNjb25uZWN0KGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxsaXN0OmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5saXN0KGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LGRpc2NvdmVyVW5wYWlyZWQ6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLmRpc2NvdmVyVW5wYWlyZWQoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sc2V0RGV2aWNlRGlzY292ZXJlZExpc3RlbmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5zZXREZXZpY2VEaXNjb3ZlcmVkTGlzdGVuZXIoZnVuY3Rpb24oZSl7ci5ub3RpZnkoZSl9KSxyLnByb21pc2V9LGNsZWFyRGV2aWNlRGlzY292ZXJlZExpc3RlbmVyOmZ1bmN0aW9uKCl7bi5ibHVldG9vdGhTZXJpYWwuY2xlYXJEZXZpY2VEaXNjb3ZlcmVkTGlzdGVuZXIoKX0sc2hvd0JsdWV0b290aFNldHRpbmdzOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5zaG93Qmx1ZXRvb3RoU2V0dGluZ3MoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LGlzRW5hYmxlZDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwuaXNFbmFibGVkKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0sZW5hYmxlOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5lbmFibGUoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxpc0Nvbm5lY3RlZDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwuaXNDb25uZWN0ZWQoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxhdmFpbGFibGU6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLmF2YWlsYWJsZShmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxyZWFkOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5yZWFkKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHJlYWRVbnRpbDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLnJlYWRVbnRpbChyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHdyaXRlOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwud3JpdGUocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sc3Vic2NyaWJlOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwuc3Vic2NyaWJlKHIsZnVuY3Rpb24oZSl7by5ub3RpZnkoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxzdWJzY3JpYmVSYXdEYXRhOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5zdWJzY3JpYmVSYXdEYXRhKGZ1bmN0aW9uKGUpe3Iubm90aWZ5KGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sdW5zdWJzY3JpYmU6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLnVuc3Vic2NyaWJlKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSx1bnN1YnNjcmliZVJhd0RhdGE6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLnVuc3Vic2NyaWJlUmF3RGF0YShmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sY2xlYXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLmNsZWFyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxyZWFkUlNTSTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwucmVhZFJTU0koZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuYnJpZ2h0bmVzc1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFCcmlnaHRuZXNzXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntnZXQ6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uY29yZG92YT9uLmNvcmRvdmEucGx1Z2lucy5icmlnaHRuZXNzLmdldEJyaWdodG5lc3MoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pOnIucmVqZWN0KFwiTm90IHN1cHBvcnRlZCB3aXRob3V0IGNvcmRvdmEuanNcIiksci5wcm9taXNlfSxzZXQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmNvcmRvdmE/bi5jb3Jkb3ZhLnBsdWdpbnMuYnJpZ2h0bmVzcy5zZXRCcmlnaHRuZXNzKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pOm8ucmVqZWN0KFwiTm90IHN1cHBvcnRlZCB3aXRob3V0IGNvcmRvdmEuanNcIiksby5wcm9taXNlfSxzZXRLZWVwU2NyZWVuT246ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmNvcmRvdmE/bi5jb3Jkb3ZhLnBsdWdpbnMuYnJpZ2h0bmVzcy5zZXRLZWVwU2NyZWVuT24ocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSk6by5yZWplY3QoXCJOb3Qgc3VwcG9ydGVkIHdpdGhvdXQgY29yZG92YS5qc1wiKSxvLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmNhbGVuZGFyXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUNhbGVuZGFyXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntjcmVhdGVDYWxlbmRhcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCksdD1uLnBsdWdpbnMuY2FsZW5kYXIuZ2V0Q3JlYXRlQ2FsZW5kYXJPcHRpb25zKCk7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIHI/dC5jYWxlbmRhck5hbWU9cjp0PWFuZ3VsYXIuZXh0ZW5kKHQsciksbi5wbHVnaW5zLmNhbGVuZGFyLmNyZWF0ZUNhbGVuZGFyKHQsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sZGVsZXRlQ2FsZW5kYXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuY2FsZW5kYXIuZGVsZXRlQ2FsZW5kYXIocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxjcmVhdGVFdmVudDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCksdD17dGl0bGU6bnVsbCxsb2NhdGlvbjpudWxsLG5vdGVzOm51bGwsc3RhcnREYXRlOm51bGwsZW5kRGF0ZTpudWxsfTtyZXR1cm4gdD1hbmd1bGFyLmV4dGVuZCh0LHIpLG4ucGx1Z2lucy5jYWxlbmRhci5jcmVhdGVFdmVudCh0LnRpdGxlLHQubG9jYXRpb24sdC5ub3RlcyxuZXcgRGF0ZSh0LnN0YXJ0RGF0ZSksbmV3IERhdGUodC5lbmREYXRlKSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxjcmVhdGVFdmVudFdpdGhPcHRpb25zOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKSx0PVtdLGk9d2luZG93LnBsdWdpbnMuY2FsZW5kYXIuZ2V0Q2FsZW5kYXJPcHRpb25zKCksYT17dGl0bGU6bnVsbCxsb2NhdGlvbjpudWxsLG5vdGVzOm51bGwsc3RhcnREYXRlOm51bGwsZW5kRGF0ZTpudWxsfTt0PU9iamVjdC5rZXlzKGEpO2Zvcih2YXIgYyBpbiByKS0xPT09dC5pbmRleE9mKGMpP2lbY109cltjXTphW2NdPXJbY107cmV0dXJuIG4ucGx1Z2lucy5jYWxlbmRhci5jcmVhdGVFdmVudFdpdGhPcHRpb25zKGEudGl0bGUsYS5sb2NhdGlvbixhLm5vdGVzLG5ldyBEYXRlKGEuc3RhcnREYXRlKSxuZXcgRGF0ZShhLmVuZERhdGUpLGksZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sY3JlYXRlRXZlbnRJbnRlcmFjdGl2ZWx5OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKSx0PXt0aXRsZTpudWxsLGxvY2F0aW9uOm51bGwsbm90ZXM6bnVsbCxzdGFydERhdGU6bnVsbCxlbmREYXRlOm51bGx9O3JldHVybiB0PWFuZ3VsYXIuZXh0ZW5kKHQsciksbi5wbHVnaW5zLmNhbGVuZGFyLmNyZWF0ZUV2ZW50SW50ZXJhY3RpdmVseSh0LnRpdGxlLHQubG9jYXRpb24sdC5ub3RlcyxuZXcgRGF0ZSh0LnN0YXJ0RGF0ZSksbmV3IERhdGUodC5lbmREYXRlKSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxjcmVhdGVFdmVudEluTmFtZWRDYWxlbmRhcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCksdD17dGl0bGU6bnVsbCxsb2NhdGlvbjpudWxsLG5vdGVzOm51bGwsc3RhcnREYXRlOm51bGwsZW5kRGF0ZTpudWxsLGNhbGVuZGFyTmFtZTpudWxsfTtyZXR1cm4gdD1hbmd1bGFyLmV4dGVuZCh0LHIpLG4ucGx1Z2lucy5jYWxlbmRhci5jcmVhdGVFdmVudEluTmFtZWRDYWxlbmRhcih0LnRpdGxlLHQubG9jYXRpb24sdC5ub3RlcyxuZXcgRGF0ZSh0LnN0YXJ0RGF0ZSksbmV3IERhdGUodC5lbmREYXRlKSx0LmNhbGVuZGFyTmFtZSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxmaW5kRXZlbnQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpLHQ9e3RpdGxlOm51bGwsbG9jYXRpb246bnVsbCxub3RlczpudWxsLHN0YXJ0RGF0ZTpudWxsLGVuZERhdGU6bnVsbH07cmV0dXJuIHQ9YW5ndWxhci5leHRlbmQodCxyKSxuLnBsdWdpbnMuY2FsZW5kYXIuZmluZEV2ZW50KHQudGl0bGUsdC5sb2NhdGlvbix0Lm5vdGVzLG5ldyBEYXRlKHQuc3RhcnREYXRlKSxuZXcgRGF0ZSh0LmVuZERhdGUpLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGxpc3RFdmVudHNJblJhbmdlOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuY2FsZW5kYXIubGlzdEV2ZW50c0luUmFuZ2UocixvLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7dC5yZWplY3QoZSl9KSx0LnByb21pc2V9LGxpc3RDYWxlbmRhcnM6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5jYWxlbmRhci5saXN0Q2FsZW5kYXJzKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LGZpbmRBbGxFdmVudHNJbk5hbWVkQ2FsZW5kYXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuY2FsZW5kYXIuZmluZEFsbEV2ZW50c0luTmFtZWRDYWxlbmRhcihyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LG1vZGlmeUV2ZW50OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKSx0PXt0aXRsZTpudWxsLGxvY2F0aW9uOm51bGwsbm90ZXM6bnVsbCxzdGFydERhdGU6bnVsbCxlbmREYXRlOm51bGwsbmV3VGl0bGU6bnVsbCxuZXdMb2NhdGlvbjpudWxsLG5ld05vdGVzOm51bGwsbmV3U3RhcnREYXRlOm51bGwsbmV3RW5kRGF0ZTpudWxsfTtyZXR1cm4gdD1hbmd1bGFyLmV4dGVuZCh0LHIpLG4ucGx1Z2lucy5jYWxlbmRhci5tb2RpZnlFdmVudCh0LnRpdGxlLHQubG9jYXRpb24sdC5ub3RlcyxuZXcgRGF0ZSh0LnN0YXJ0RGF0ZSksbmV3IERhdGUodC5lbmREYXRlKSx0Lm5ld1RpdGxlLHQubmV3TG9jYXRpb24sdC5uZXdOb3RlcyxuZXcgRGF0ZSh0Lm5ld1N0YXJ0RGF0ZSksbmV3IERhdGUodC5uZXdFbmREYXRlKSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxkZWxldGVFdmVudDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCksdD17bmV3VGl0bGU6bnVsbCxsb2NhdGlvbjpudWxsLG5vdGVzOm51bGwsc3RhcnREYXRlOm51bGwsZW5kRGF0ZTpudWxsfTtyZXR1cm4gdD1hbmd1bGFyLmV4dGVuZCh0LHIpLG4ucGx1Z2lucy5jYWxlbmRhci5kZWxldGVFdmVudCh0Lm5ld1RpdGxlLHQubG9jYXRpb24sdC5ub3RlcyxuZXcgRGF0ZSh0LnN0YXJ0RGF0ZSksbmV3IERhdGUodC5lbmREYXRlKSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5jYW1lcmFcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQ2FtZXJhXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57Z2V0UGljdHVyZTpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5jYW1lcmE/KG5hdmlnYXRvci5jYW1lcmEuZ2V0UGljdHVyZShmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKSxyLnByb21pc2UpOihyLnJlc29sdmUobnVsbCksci5wcm9taXNlKX0sY2xlYW51cDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmNhbWVyYS5jbGVhbnVwKGZ1bmN0aW9uKCl7bi5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5jYXB0dXJlXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUNhcHR1cmVcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntjYXB0dXJlQXVkaW86ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZGV2aWNlLmNhcHR1cmU/KG5hdmlnYXRvci5kZXZpY2UuY2FwdHVyZS5jYXB0dXJlQXVkaW8oZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbiksci5wcm9taXNlKTooci5yZXNvbHZlKG51bGwpLHIucHJvbWlzZSl9LGNhcHR1cmVJbWFnZTpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5kZXZpY2UuY2FwdHVyZT8obmF2aWdhdG9yLmRldmljZS5jYXB0dXJlLmNhcHR1cmVJbWFnZShmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKSxyLnByb21pc2UpOihyLnJlc29sdmUobnVsbCksci5wcm9taXNlKX0sY2FwdHVyZVZpZGVvOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmRldmljZS5jYXB0dXJlPyhuYXZpZ2F0b3IuZGV2aWNlLmNhcHR1cmUuY2FwdHVyZVZpZGVvKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LG4pLHIucHJvbWlzZSk6KHIucmVzb2x2ZShudWxsKSxyLnByb21pc2UpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5jYXJkSU9cIixbXSkucHJvdmlkZXIoXCIkY29yZG92YU5nQ2FyZElPXCIsW2Z1bmN0aW9uKCl7dmFyIGU9W1wiY2FyZF90eXBlXCIsXCJyZWRhY3RlZF9jYXJkX251bWJlclwiLFwiY2FyZF9udW1iZXJcIixcImV4cGlyeV9tb250aFwiLFwiZXhwaXJ5X3llYXJcIixcInNob3J0X2V4cGlyeV95ZWFyXCIsXCJjdnZcIixcInppcFwiXSxuPXtleHBpcnk6ITAsY3Z2OiEwLHppcDohMSxzdXBwcmVzc01hbnVhbDohMSxzdXBwcmVzc0NvbmZpcm06ITEsaGlkZUxvZ286ITB9O3RoaXMuc2V0Q2FyZElPUmVzcG9uc2VGaWVsZHM9ZnVuY3Rpb24obil7biYmYW5ndWxhci5pc0FycmF5KG4pJiYoZT1uKX0sdGhpcy5zZXRTY2FuZXJDb25maWc9ZnVuY3Rpb24oZSl7ZSYmYW5ndWxhci5pc09iamVjdChlKSYmKG4uZXhwaXJ5PWUuZXhwaXJ5fHwhMCxuLmN2dj1lLmN2dnx8ITAsbi56aXA9ZS56aXB8fCExLG4uc3VwcHJlc3NNYW51YWw9ZS5zdXBwcmVzc01hbnVhbHx8ITEsbi5zdXBwcmVzc0NvbmZpcm09ZS5zdXBwcmVzc0NvbmZpcm18fCExLG4uaGlkZUxvZ289ZS5oaWRlTG9nb3x8ITApfSx0aGlzLiRnZXQ9W1wiJHFcIixmdW5jdGlvbihyKXtyZXR1cm57c2NhbkNhcmQ6ZnVuY3Rpb24oKXt2YXIgbz1yLmRlZmVyKCk7cmV0dXJuIENhcmRJTy5zY2FuKG4sZnVuY3Rpb24obil7aWYobnVsbD09PW4pby5yZWplY3QobnVsbCk7ZWxzZXtmb3IodmFyIHI9e30sdD0wLGk9ZS5sZW5ndGg7aT50O3QrKyl7dmFyIGE9ZVt0XTtcInNob3J0X2V4cGlyeV95ZWFyXCI9PT1hP3JbYV09U3RyaW5nKG4uZXhwaXJ5X3llYXIpLnN1YnN0cigyLDIpfHxcIlwiOnJbYV09blthXXx8XCJcIn1vLnJlc29sdmUocil9fSxmdW5jdGlvbigpe28ucmVqZWN0KG51bGwpfSksby5wcm9taXNlfX19XX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmNsaXBib2FyZFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFDbGlwYm9hcmRcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2NvcHk6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmNvcmRvdmEucGx1Z2lucy5jbGlwYm9hcmQuY29weShyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0scGFzdGU6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uY29yZG92YS5wbHVnaW5zLmNsaXBib2FyZC5wYXN0ZShmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuY29udGFjdHNcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQ29udGFjdHNcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntzYXZlOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKSxvPW5hdmlnYXRvci5jb250YWN0cy5jcmVhdGUobik7cmV0dXJuIG8uc2F2ZShmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxyZW1vdmU6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpLG89bmF2aWdhdG9yLmNvbnRhY3RzLmNyZWF0ZShuKTtyZXR1cm4gby5yZW1vdmUoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sY2xvbmU6ZnVuY3Rpb24oZSl7dmFyIG49bmF2aWdhdG9yLmNvbnRhY3RzLmNyZWF0ZShlKTtyZXR1cm4gbi5jbG9uZShlKX0sZmluZDpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCksbz1uLmZpZWxkc3x8W1wiaWRcIixcImRpc3BsYXlOYW1lXCJdO3JldHVybiBkZWxldGUgbi5maWVsZHMsMD09PU9iamVjdC5rZXlzKG4pLmxlbmd0aD9uYXZpZ2F0b3IuY29udGFjdHMuZmluZChvLGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KTpuYXZpZ2F0b3IuY29udGFjdHMuZmluZChvLGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LG4pLHIucHJvbWlzZX0scGlja0NvbnRhY3Q6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5jb250YWN0cy5waWNrQ29udGFjdChmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5kYXRlUGlja2VyXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YURhdGVQaWNrZXJcIixbXCIkd2luZG93XCIsXCIkcVwiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3Nob3c6ZnVuY3Rpb24ocil7dmFyIG89bi5kZWZlcigpO3JldHVybiByPXJ8fHtkYXRlOm5ldyBEYXRlLG1vZGU6XCJkYXRlXCJ9LGUuZGF0ZVBpY2tlci5zaG93KHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZGV2aWNlXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YURldmljZVwiLFtmdW5jdGlvbigpe3JldHVybntnZXREZXZpY2U6ZnVuY3Rpb24oKXtyZXR1cm4gZGV2aWNlfSxnZXRDb3Jkb3ZhOmZ1bmN0aW9uKCl7cmV0dXJuIGRldmljZS5jb3Jkb3ZhfSxnZXRNb2RlbDpmdW5jdGlvbigpe3JldHVybiBkZXZpY2UubW9kZWx9LGdldE5hbWU6ZnVuY3Rpb24oKXtyZXR1cm4gZGV2aWNlLm5hbWV9LGdldFBsYXRmb3JtOmZ1bmN0aW9uKCl7cmV0dXJuIGRldmljZS5wbGF0Zm9ybX0sZ2V0VVVJRDpmdW5jdGlvbigpe3JldHVybiBkZXZpY2UudXVpZH0sZ2V0VmVyc2lvbjpmdW5jdGlvbigpe3JldHVybiBkZXZpY2UudmVyc2lvbn0sZ2V0TWFudWZhY3R1cmVyOmZ1bmN0aW9uKCl7cmV0dXJuIGRldmljZS5tYW51ZmFjdHVyZXJ9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmRldmljZU1vdGlvblwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFEZXZpY2VNb3Rpb25cIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntnZXRDdXJyZW50QWNjZWxlcmF0aW9uOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBhbmd1bGFyLmlzVW5kZWZpbmVkKG5hdmlnYXRvci5hY2NlbGVyb21ldGVyKXx8IWFuZ3VsYXIuaXNGdW5jdGlvbihuYXZpZ2F0b3IuYWNjZWxlcm9tZXRlci5nZXRDdXJyZW50QWNjZWxlcmF0aW9uKT8obi5yZWplY3QoXCJEZXZpY2UgZG8gbm90IHN1cHBvcnQgd2F0Y2hBY2NlbGVyYXRpb25cIiksbi5wcm9taXNlKToobmF2aWdhdG9yLmFjY2VsZXJvbWV0ZXIuZ2V0Q3VycmVudEFjY2VsZXJhdGlvbihmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlKX0sd2F0Y2hBY2NlbGVyYXRpb246ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO2lmKGFuZ3VsYXIuaXNVbmRlZmluZWQobmF2aWdhdG9yLmFjY2VsZXJvbWV0ZXIpfHwhYW5ndWxhci5pc0Z1bmN0aW9uKG5hdmlnYXRvci5hY2NlbGVyb21ldGVyLndhdGNoQWNjZWxlcmF0aW9uKSlyZXR1cm4gci5yZWplY3QoXCJEZXZpY2UgZG8gbm90IHN1cHBvcnQgd2F0Y2hBY2NlbGVyYXRpb25cIiksci5wcm9taXNlO3ZhciBvPW5hdmlnYXRvci5hY2NlbGVyb21ldGVyLndhdGNoQWNjZWxlcmF0aW9uKGZ1bmN0aW9uKGUpe3Iubm90aWZ5KGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbik7cmV0dXJuIHIucHJvbWlzZS5jYW5jZWw9ZnVuY3Rpb24oKXtuYXZpZ2F0b3IuYWNjZWxlcm9tZXRlci5jbGVhcldhdGNoKG8pfSxyLnByb21pc2UuY2xlYXJXYXRjaD1mdW5jdGlvbihlKXtuYXZpZ2F0b3IuYWNjZWxlcm9tZXRlci5jbGVhcldhdGNoKGV8fG8pfSxyLnByb21pc2Uud2F0Y2hJRD1vLHIucHJvbWlzZX0sY2xlYXJXYXRjaDpmdW5jdGlvbihlKXtyZXR1cm4gbmF2aWdhdG9yLmFjY2VsZXJvbWV0ZXIuY2xlYXJXYXRjaChlKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZGV2aWNlT3JpZW50YXRpb25cIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhRGV2aWNlT3JpZW50YXRpb25cIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3ZhciBuPXtmcmVxdWVuY3k6M2UzfTtyZXR1cm57Z2V0Q3VycmVudEhlYWRpbmc6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5jb21wYXNzPyhuYXZpZ2F0b3IuY29tcGFzcy5nZXRDdXJyZW50SGVhZGluZyhmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlKToobi5yZWplY3QoXCJObyBjb21wYXNzIG9uIERldmljZVwiKSxuLnByb21pc2UpfSx3YXRjaEhlYWRpbmc6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO2lmKCFuYXZpZ2F0b3IuY29tcGFzcylyZXR1cm4gby5yZWplY3QoXCJObyBjb21wYXNzIG9uIERldmljZVwiKSxvLnByb21pc2U7dmFyIHQ9YW5ndWxhci5leHRlbmQobixyKSxpPW5hdmlnYXRvci5jb21wYXNzLndhdGNoSGVhZGluZyhmdW5jdGlvbihlKXtvLm5vdGlmeShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9LHQpO3JldHVybiBvLnByb21pc2UuY2FuY2VsPWZ1bmN0aW9uKCl7bmF2aWdhdG9yLmNvbXBhc3MuY2xlYXJXYXRjaChpKX0sby5wcm9taXNlLmNsZWFyV2F0Y2g9ZnVuY3Rpb24oZSl7bmF2aWdhdG9yLmNvbXBhc3MuY2xlYXJXYXRjaChlfHxpKX0sby5wcm9taXNlLndhdGNoSUQ9aSxvLnByb21pc2V9LGNsZWFyV2F0Y2g6ZnVuY3Rpb24oZSl7cmV0dXJuIG5hdmlnYXRvci5jb21wYXNzLmNsZWFyV2F0Y2goZSl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmRpYWxvZ3NcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhRGlhbG9nc1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57YWxlcnQ6ZnVuY3Rpb24ocixvLHQpe3ZhciBpPWUuZGVmZXIoKTtyZXR1cm4gbi5uYXZpZ2F0b3Iubm90aWZpY2F0aW9uP25hdmlnYXRvci5ub3RpZmljYXRpb24uYWxlcnQocixmdW5jdGlvbigpe2kucmVzb2x2ZSgpfSxvLHQpOihuLmFsZXJ0KHIpLGkucmVzb2x2ZSgpKSxpLnByb21pc2V9LGNvbmZpcm06ZnVuY3Rpb24ocixvLHQpe3ZhciBpPWUuZGVmZXIoKTtyZXR1cm4gbi5uYXZpZ2F0b3Iubm90aWZpY2F0aW9uP25hdmlnYXRvci5ub3RpZmljYXRpb24uY29uZmlybShyLGZ1bmN0aW9uKGUpe2kucmVzb2x2ZShlKX0sbyx0KTpuLmNvbmZpcm0ocik/aS5yZXNvbHZlKDEpOmkucmVzb2x2ZSgyKSxpLnByb21pc2V9LHByb21wdDpmdW5jdGlvbihyLG8sdCxpKXt2YXIgYT1lLmRlZmVyKCk7aWYobi5uYXZpZ2F0b3Iubm90aWZpY2F0aW9uKW5hdmlnYXRvci5ub3RpZmljYXRpb24ucHJvbXB0KHIsZnVuY3Rpb24oZSl7YS5yZXNvbHZlKGUpfSxvLHQsaSk7ZWxzZXt2YXIgYz1uLnByb21wdChyLGkpO251bGwhPT1jP2EucmVzb2x2ZSh7aW5wdXQxOmMsYnV0dG9uSW5kZXg6MX0pOmEucmVzb2x2ZSh7aW5wdXQxOmMsYnV0dG9uSW5kZXg6Mn0pfXJldHVybiBhLnByb21pc2V9LGJlZXA6ZnVuY3Rpb24oZSl7cmV0dXJuIG5hdmlnYXRvci5ub3RpZmljYXRpb24uYmVlcChlKX0sYWN0aXZpdHlTdGFydDpmdW5jdGlvbihuLHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm5cImFuZHJvaWRcIj09PWNvcmRvdmEucGxhdGZvcm1JZD8obmF2aWdhdG9yLm5vdGlmaWNhdGlvbi5hY3Rpdml0eVN0YXJ0KHIsbiksby5yZXNvbHZlKCkpOm8ucmVqZWN0KG4sciksby5wcm9taXNlfSxhY3Rpdml0eVN0b3A6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuXCJhbmRyb2lkXCI9PT1jb3Jkb3ZhLnBsYXRmb3JtSWQ/KG5hdmlnYXRvci5ub3RpZmljYXRpb24uYWN0aXZpdHlTdG9wKCksbi5yZXNvbHZlKCkpOm4ucmVqZWN0KCksbi5wcm9taXNlfSxwcm9ncmVzc1N0YXJ0OmZ1bmN0aW9uKG4scil7dmFyIG89ZS5kZWZlcigpO3JldHVyblwiYW5kcm9pZFwiPT09Y29yZG92YS5wbGF0Zm9ybUlkPyhuYXZpZ2F0b3Iubm90aWZpY2F0aW9uLnByb2dyZXNzU3RhcnQocixuKSxvLnJlc29sdmUoKSk6by5yZWplY3QobixyKSxvLnByb21pc2V9LHByb2dyZXNzU3RvcDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm5cImFuZHJvaWRcIj09PWNvcmRvdmEucGxhdGZvcm1JZD8obmF2aWdhdG9yLm5vdGlmaWNhdGlvbi5wcm9ncmVzc1N0b3AoKSxuLnJlc29sdmUoKSk6bi5yZWplY3QoKSxuLnByb21pc2V9LHByb2dyZXNzVmFsdWU6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVyblwiYW5kcm9pZFwiPT09Y29yZG92YS5wbGF0Zm9ybUlkPyhuYXZpZ2F0b3Iubm90aWZpY2F0aW9uLnByb2dyZXNzVmFsdWUobiksci5yZXNvbHZlKCkpOnIucmVqZWN0KG4pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZW1haWxDb21wb3NlclwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFFbWFpbENvbXBvc2VyXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57aXNBdmFpbGFibGU6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5lbWFpbC5pc0F2YWlsYWJsZShmdW5jdGlvbihlKXtlP24ucmVzb2x2ZSgpOm4ucmVqZWN0KCl9KSxuLnByb21pc2V9LG9wZW46ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuZW1haWwub3BlbihuLGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0sYWRkQWxpYXM6ZnVuY3Rpb24oZSxuKXtjb3Jkb3ZhLnBsdWdpbnMuZW1haWwuYWRkQWxpYXMoZSxuKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmFjZWJvb2tcIixbXSkucHJvdmlkZXIoXCIkY29yZG92YUZhY2Vib29rXCIsW2Z1bmN0aW9uKCl7dGhpcy5icm93c2VySW5pdD1mdW5jdGlvbihlLG4pe3RoaXMuYXBwSUQ9ZSx0aGlzLmFwcFZlcnNpb249bnx8XCJ2Mi4wXCIsZmFjZWJvb2tDb25uZWN0UGx1Z2luLmJyb3dzZXJJbml0KHRoaXMuYXBwSUQsdGhpcy5hcHBWZXJzaW9uKX0sdGhpcy4kZ2V0PVtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2xvZ2luOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gZmFjZWJvb2tDb25uZWN0UGx1Z2luLmxvZ2luKG4sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sc2hvd0RpYWxvZzpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGZhY2Vib29rQ29ubmVjdFBsdWdpbi5zaG93RGlhbG9nKG4sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sYXBpOmZ1bmN0aW9uKG4scil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBmYWNlYm9va0Nvbm5lY3RQbHVnaW4uYXBpKG4scixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxnZXRBY2Nlc3NUb2tlbjpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gZmFjZWJvb2tDb25uZWN0UGx1Z2luLmdldEFjY2Vzc1Rva2VuKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9LGdldExvZ2luU3RhdHVzOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBmYWNlYm9va0Nvbm5lY3RQbHVnaW4uZ2V0TG9naW5TdGF0dXMoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sbG9nb3V0OmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBmYWNlYm9va0Nvbm5lY3RQbHVnaW4ubG9nb3V0KGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9fX1dfV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmFjZWJvb2tBZHNcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhRmFjZWJvb2tBZHNcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3NldE9wdGlvbnM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLkZhY2Vib29rQWRzLnNldE9wdGlvbnMocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LGNyZWF0ZUJhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uRmFjZWJvb2tBZHMuY3JlYXRlQmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxyZW1vdmVCYW5uZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uRmFjZWJvb2tBZHMucmVtb3ZlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0sc2hvd0Jhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uRmFjZWJvb2tBZHMuc2hvd0Jhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0Jhbm5lckF0WFk6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4uRmFjZWJvb2tBZHMuc2hvd0Jhbm5lckF0WFkocixvLGZ1bmN0aW9uKCl7dC5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7dC5yZWplY3QoKX0pLHQucHJvbWlzZX0saGlkZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5GYWNlYm9va0Fkcy5oaWRlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0scHJlcGFyZUludGVyc3RpdGlhbDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uRmFjZWJvb2tBZHMucHJlcGFyZUludGVyc3RpdGlhbChyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0ludGVyc3RpdGlhbDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5GYWNlYm9va0Fkcy5zaG93SW50ZXJzdGl0aWFsKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7XG5yLnJlamVjdCgpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5maWxlXCIsW10pLmNvbnN0YW50KFwiJGNvcmRvdmFGaWxlRXJyb3JcIix7MTpcIk5PVF9GT1VORF9FUlJcIiwyOlwiU0VDVVJJVFlfRVJSXCIsMzpcIkFCT1JUX0VSUlwiLDQ6XCJOT1RfUkVBREFCTEVfRVJSXCIsNTpcIkVOQ09ESU5HX0VSUlwiLDY6XCJOT19NT0RJRklDQVRJT05fQUxMT1dFRF9FUlJcIiw3OlwiSU5WQUxJRF9TVEFURV9FUlJcIiw4OlwiU1lOVEFYX0VSUlwiLDk6XCJJTlZBTElEX01PRElGSUNBVElPTl9FUlJcIiwxMDpcIlFVT1RBX0VYQ0VFREVEX0VSUlwiLDExOlwiVFlQRV9NSVNNQVRDSF9FUlJcIiwxMjpcIlBBVEhfRVhJU1RTX0VSUlwifSkucHJvdmlkZXIoXCIkY29yZG92YUZpbGVcIixbZnVuY3Rpb24oKXt0aGlzLiRnZXQ9W1wiJHFcIixcIiR3aW5kb3dcIixcIiRjb3Jkb3ZhRmlsZUVycm9yXCIsZnVuY3Rpb24oZSxuLHIpe3JldHVybntnZXRGcmVlRGlza1NwYWNlOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLmV4ZWMoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0sXCJGaWxlXCIsXCJnZXRGcmVlRGlza1NwYWNlXCIsW10pLG4ucHJvbWlzZX0sY2hlY2tEaXI6ZnVuY3Rpb24obyx0KXt2YXIgaT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmkucmVqZWN0KFwiZGlyZWN0b3J5IGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e3ZhciBhPW8rdDtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwoYSxmdW5jdGlvbihlKXtlLmlzRGlyZWN0b3J5PT09ITA/aS5yZXNvbHZlKGUpOmkucmVqZWN0KHtjb2RlOjEzLG1lc3NhZ2U6XCJpbnB1dCBpcyBub3QgYSBkaXJlY3RvcnlcIn0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9Y2F0Y2goYyl7Yy5tZXNzYWdlPXJbYy5jb2RlXSxpLnJlamVjdChjKX1yZXR1cm4gaS5wcm9taXNlfSxjaGVja0ZpbGU6ZnVuY3Rpb24obyx0KXt2YXIgaT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmkucmVqZWN0KFwiZGlyZWN0b3J5IGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e3ZhciBhPW8rdDtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwoYSxmdW5jdGlvbihlKXtlLmlzRmlsZT09PSEwP2kucmVzb2x2ZShlKTppLnJlamVjdCh7Y29kZToxMyxtZXNzYWdlOlwiaW5wdXQgaXMgbm90IGEgZmlsZVwifSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX1jYXRjaChjKXtjLm1lc3NhZ2U9cltjLmNvZGVdLGkucmVqZWN0KGMpfXJldHVybiBpLnByb21pc2V9LGNyZWF0ZURpcjpmdW5jdGlvbihvLHQsaSl7dmFyIGE9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZhLnJlamVjdChcImRpcmVjdG9yeSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpLGk9aT8hMTohMDt2YXIgYz17Y3JlYXRlOiEwLGV4Y2x1c2l2ZTppfTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKG8sZnVuY3Rpb24oZSl7ZS5nZXREaXJlY3RvcnkodCxjLGZ1bmN0aW9uKGUpe2EucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxhLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGEucmVqZWN0KGUpfSl9Y2F0Y2godSl7dS5tZXNzYWdlPXJbdS5jb2RlXSxhLnJlamVjdCh1KX1yZXR1cm4gYS5wcm9taXNlfSxjcmVhdGVGaWxlOmZ1bmN0aW9uKG8sdCxpKXt2YXIgYT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmEucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIiksaT1pPyExOiEwO3ZhciBjPXtjcmVhdGU6ITAsZXhjbHVzaXZlOml9O3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwobyxmdW5jdGlvbihlKXtlLmdldEZpbGUodCxjLGZ1bmN0aW9uKGUpe2EucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxhLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGEucmVqZWN0KGUpfSl9Y2F0Y2godSl7dS5tZXNzYWdlPXJbdS5jb2RlXSxhLnJlamVjdCh1KX1yZXR1cm4gYS5wcm9taXNlfSxyZW1vdmVEaXI6ZnVuY3Rpb24obyx0KXt2YXIgaT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmkucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChvLGZ1bmN0aW9uKGUpe2UuZ2V0RGlyZWN0b3J5KHQse2NyZWF0ZTohMX0sZnVuY3Rpb24oZSl7ZS5yZW1vdmUoZnVuY3Rpb24oKXtpLnJlc29sdmUoe3N1Y2Nlc3M6ITAsZmlsZVJlbW92ZWQ6ZX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfWNhdGNoKGEpe2EubWVzc2FnZT1yW2EuY29kZV0saS5yZWplY3QoYSl9cmV0dXJuIGkucHJvbWlzZX0scmVtb3ZlRmlsZTpmdW5jdGlvbihvLHQpe3ZhciBpPWUuZGVmZXIoKTsvXlxcLy8udGVzdCh0KSYmaS5yZWplY3QoXCJmaWxlLW5hbWUgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKG8sZnVuY3Rpb24oZSl7ZS5nZXRGaWxlKHQse2NyZWF0ZTohMX0sZnVuY3Rpb24oZSl7ZS5yZW1vdmUoZnVuY3Rpb24oKXtpLnJlc29sdmUoe3N1Y2Nlc3M6ITAsZmlsZVJlbW92ZWQ6ZX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfWNhdGNoKGEpe2EubWVzc2FnZT1yW2EuY29kZV0saS5yZWplY3QoYSl9cmV0dXJuIGkucHJvbWlzZX0scmVtb3ZlUmVjdXJzaXZlbHk6ZnVuY3Rpb24obyx0KXt2YXIgaT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmkucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChvLGZ1bmN0aW9uKGUpe2UuZ2V0RGlyZWN0b3J5KHQse2NyZWF0ZTohMX0sZnVuY3Rpb24oZSl7ZS5yZW1vdmVSZWN1cnNpdmVseShmdW5jdGlvbigpe2kucmVzb2x2ZSh7c3VjY2VzczohMCxmaWxlUmVtb3ZlZDplfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9Y2F0Y2goYSl7YS5tZXNzYWdlPXJbYS5jb2RlXSxpLnJlamVjdChhKX1yZXR1cm4gaS5wcm9taXNlfSx3cml0ZUZpbGU6ZnVuY3Rpb24obyx0LGksYSl7dmFyIGM9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZjLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpLGE9YT8hMTohMDt2YXIgdT17Y3JlYXRlOiEwLGV4Y2x1c2l2ZTphfTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKG8sZnVuY3Rpb24oZSl7ZS5nZXRGaWxlKHQsdSxmdW5jdGlvbihlKXtlLmNyZWF0ZVdyaXRlcihmdW5jdGlvbihlKXt1LmFwcGVuZD09PSEwJiZlLnNlZWsoZS5sZW5ndGgpLHUudHJ1bmNhdGUmJmUudHJ1bmNhdGUodS50cnVuY2F0ZSksZS5vbndyaXRlZW5kPWZ1bmN0aW9uKGUpe3RoaXMuZXJyb3I/Yy5yZWplY3QodGhpcy5lcnJvcik6Yy5yZXNvbHZlKGUpfSxlLndyaXRlKGkpLGMucHJvbWlzZS5hYm9ydD1mdW5jdGlvbigpe2UuYWJvcnQoKX19KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxjLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGMucmVqZWN0KGUpfSl9Y2F0Y2gocyl7cy5tZXNzYWdlPXJbcy5jb2RlXSxjLnJlamVjdChzKX1yZXR1cm4gYy5wcm9taXNlfSx3cml0ZUV4aXN0aW5nRmlsZTpmdW5jdGlvbihvLHQsaSl7dmFyIGE9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZhLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwobyxmdW5jdGlvbihlKXtlLmdldEZpbGUodCx7Y3JlYXRlOiExfSxmdW5jdGlvbihlKXtlLmNyZWF0ZVdyaXRlcihmdW5jdGlvbihlKXtlLnNlZWsoZS5sZW5ndGgpLGUub253cml0ZWVuZD1mdW5jdGlvbihlKXt0aGlzLmVycm9yP2EucmVqZWN0KHRoaXMuZXJyb3IpOmEucmVzb2x2ZShlKX0sZS53cml0ZShpKSxhLnByb21pc2UuYWJvcnQ9ZnVuY3Rpb24oKXtlLmFib3J0KCl9fSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxhLnJlamVjdChlKX0pfWNhdGNoKGMpe2MubWVzc2FnZT1yW2MuY29kZV0sYS5yZWplY3QoYyl9cmV0dXJuIGEucHJvbWlzZX0scmVhZEFzVGV4dDpmdW5jdGlvbihvLHQpe3ZhciBpPWUuZGVmZXIoKTsvXlxcLy8udGVzdCh0KSYmaS5yZWplY3QoXCJmaWxlLW5hbWUgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKG8sZnVuY3Rpb24oZSl7ZS5nZXRGaWxlKHQse2NyZWF0ZTohMX0sZnVuY3Rpb24oZSl7ZS5maWxlKGZ1bmN0aW9uKGUpe3ZhciBuPW5ldyBGaWxlUmVhZGVyO24ub25sb2FkZW5kPWZ1bmN0aW9uKGUpe3ZvaWQgMCE9PWUudGFyZ2V0LnJlc3VsdHx8bnVsbCE9PWUudGFyZ2V0LnJlc3VsdD9pLnJlc29sdmUoZS50YXJnZXQucmVzdWx0KTp2b2lkIDAhPT1lLnRhcmdldC5lcnJvcnx8bnVsbCE9PWUudGFyZ2V0LmVycm9yP2kucmVqZWN0KGUudGFyZ2V0LmVycm9yKTppLnJlamVjdCh7Y29kZTpudWxsLG1lc3NhZ2U6XCJSRUFERVJfT05MT0FERU5EX0VSUlwifSl9LG4ucmVhZEFzVGV4dChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX1jYXRjaChhKXthLm1lc3NhZ2U9clthLmNvZGVdLGkucmVqZWN0KGEpfXJldHVybiBpLnByb21pc2V9LHJlYWRBc0RhdGFVUkw6ZnVuY3Rpb24obyx0KXt2YXIgaT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmkucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChvLGZ1bmN0aW9uKGUpe2UuZ2V0RmlsZSh0LHtjcmVhdGU6ITF9LGZ1bmN0aW9uKGUpe2UuZmlsZShmdW5jdGlvbihlKXt2YXIgbj1uZXcgRmlsZVJlYWRlcjtuLm9ubG9hZGVuZD1mdW5jdGlvbihlKXt2b2lkIDAhPT1lLnRhcmdldC5yZXN1bHR8fG51bGwhPT1lLnRhcmdldC5yZXN1bHQ/aS5yZXNvbHZlKGUudGFyZ2V0LnJlc3VsdCk6dm9pZCAwIT09ZS50YXJnZXQuZXJyb3J8fG51bGwhPT1lLnRhcmdldC5lcnJvcj9pLnJlamVjdChlLnRhcmdldC5lcnJvcik6aS5yZWplY3Qoe2NvZGU6bnVsbCxtZXNzYWdlOlwiUkVBREVSX09OTE9BREVORF9FUlJcIn0pfSxuLnJlYWRBc0RhdGFVUkwoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9Y2F0Y2goYSl7YS5tZXNzYWdlPXJbYS5jb2RlXSxpLnJlamVjdChhKX1yZXR1cm4gaS5wcm9taXNlfSxyZWFkQXNCaW5hcnlTdHJpbmc6ZnVuY3Rpb24obyx0KXt2YXIgaT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmkucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChvLGZ1bmN0aW9uKGUpe2UuZ2V0RmlsZSh0LHtjcmVhdGU6ITF9LGZ1bmN0aW9uKGUpe2UuZmlsZShmdW5jdGlvbihlKXt2YXIgbj1uZXcgRmlsZVJlYWRlcjtuLm9ubG9hZGVuZD1mdW5jdGlvbihlKXt2b2lkIDAhPT1lLnRhcmdldC5yZXN1bHR8fG51bGwhPT1lLnRhcmdldC5yZXN1bHQ/aS5yZXNvbHZlKGUudGFyZ2V0LnJlc3VsdCk6dm9pZCAwIT09ZS50YXJnZXQuZXJyb3J8fG51bGwhPT1lLnRhcmdldC5lcnJvcj9pLnJlamVjdChlLnRhcmdldC5lcnJvcik6aS5yZWplY3Qoe2NvZGU6bnVsbCxtZXNzYWdlOlwiUkVBREVSX09OTE9BREVORF9FUlJcIn0pfSxuLnJlYWRBc0JpbmFyeVN0cmluZyhlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX1jYXRjaChhKXthLm1lc3NhZ2U9clthLmNvZGVdLGkucmVqZWN0KGEpfXJldHVybiBpLnByb21pc2V9LHJlYWRBc0FycmF5QnVmZmVyOmZ1bmN0aW9uKG8sdCl7dmFyIGk9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZpLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwobyxmdW5jdGlvbihlKXtlLmdldEZpbGUodCx7Y3JlYXRlOiExfSxmdW5jdGlvbihlKXtlLmZpbGUoZnVuY3Rpb24oZSl7dmFyIG49bmV3IEZpbGVSZWFkZXI7bi5vbmxvYWRlbmQ9ZnVuY3Rpb24oZSl7dm9pZCAwIT09ZS50YXJnZXQucmVzdWx0fHxudWxsIT09ZS50YXJnZXQucmVzdWx0P2kucmVzb2x2ZShlLnRhcmdldC5yZXN1bHQpOnZvaWQgMCE9PWUudGFyZ2V0LmVycm9yfHxudWxsIT09ZS50YXJnZXQuZXJyb3I/aS5yZWplY3QoZS50YXJnZXQuZXJyb3IpOmkucmVqZWN0KHtjb2RlOm51bGwsbWVzc2FnZTpcIlJFQURFUl9PTkxPQURFTkRfRVJSXCJ9KX0sbi5yZWFkQXNBcnJheUJ1ZmZlcihlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX1jYXRjaChhKXthLm1lc3NhZ2U9clthLmNvZGVdLGkucmVqZWN0KGEpfXJldHVybiBpLnByb21pc2V9LG1vdmVGaWxlOmZ1bmN0aW9uKHIsbyx0LGkpe3ZhciBhPWUuZGVmZXIoKTtpPWl8fG8sKC9eXFwvLy50ZXN0KG8pfHwvXlxcLy8udGVzdChpKSkmJmEucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChyLGZ1bmN0aW9uKGUpe2UuZ2V0RmlsZShvLHtjcmVhdGU6ITF9LGZ1bmN0aW9uKGUpe24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTCh0LGZ1bmN0aW9uKG4pe2UubW92ZVRvKG4saSxmdW5jdGlvbihlKXthLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2EucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2EucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2EucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2EucmVqZWN0KGUpfSl9Y2F0Y2goYyl7YS5yZWplY3QoYyl9cmV0dXJuIGEucHJvbWlzZX0sbW92ZURpcjpmdW5jdGlvbihyLG8sdCxpKXt2YXIgYT1lLmRlZmVyKCk7aT1pfHxvLCgvXlxcLy8udGVzdChvKXx8L15cXC8vLnRlc3QoaSkpJiZhLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwocixmdW5jdGlvbihlKXtlLmdldERpcmVjdG9yeShvLHtjcmVhdGU6ITF9LGZ1bmN0aW9uKGUpe24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTCh0LGZ1bmN0aW9uKG4pe2UubW92ZVRvKG4saSxmdW5jdGlvbihlKXthLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2EucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2EucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2EucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2EucmVqZWN0KGUpfSl9Y2F0Y2goYyl7YS5yZWplY3QoYyl9cmV0dXJuIGEucHJvbWlzZX0sY29weURpcjpmdW5jdGlvbihvLHQsaSxhKXt2YXIgYz1lLmRlZmVyKCk7YT1hfHx0LCgvXlxcLy8udGVzdCh0KXx8L15cXC8vLnRlc3QoYSkpJiZjLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwobyxmdW5jdGlvbihlKXtlLmdldERpcmVjdG9yeSh0LHtjcmVhdGU6ITEsZXhjbHVzaXZlOiExfSxmdW5jdGlvbihlKXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwoaSxmdW5jdGlvbihuKXtlLmNvcHlUbyhuLGEsZnVuY3Rpb24oZSl7Yy5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGMucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYy5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxjLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGMucmVqZWN0KGUpfSl9Y2F0Y2godSl7dS5tZXNzYWdlPXJbdS5jb2RlXSxjLnJlamVjdCh1KX1yZXR1cm4gYy5wcm9taXNlfSxjb3B5RmlsZTpmdW5jdGlvbihvLHQsaSxhKXt2YXIgYz1lLmRlZmVyKCk7YT1hfHx0LC9eXFwvLy50ZXN0KHQpJiZjLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwobyxmdW5jdGlvbihlKXtlLmdldEZpbGUodCx7Y3JlYXRlOiExLGV4Y2x1c2l2ZTohMX0sZnVuY3Rpb24oZSl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKGksZnVuY3Rpb24obil7ZS5jb3B5VG8obixhLGZ1bmN0aW9uKGUpe2MucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxjLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGMucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYy5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxjLnJlamVjdChlKX0pfWNhdGNoKHUpe3UubWVzc2FnZT1yW3UuY29kZV0sYy5yZWplY3QodSl9cmV0dXJuIGMucHJvbWlzZX0scmVhZEZpbGVNZXRhZGF0YTpmdW5jdGlvbihvLHQpe3ZhciBpPWUuZGVmZXIoKTsvXlxcLy8udGVzdCh0KSYmaS5yZWplY3QoXCJkaXJlY3RvcnkgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7dmFyIGE9byt0O24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChhLGZ1bmN0aW9uKGUpe2UuZmlsZShmdW5jdGlvbihlKXtpLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfWNhdGNoKGMpe2MubWVzc2FnZT1yW2MuY29kZV0saS5yZWplY3QoYyl9cmV0dXJuIGkucHJvbWlzZX19fV19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5maWxlT3BlbmVyMlwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFGaWxlT3BlbmVyMlwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue29wZW46ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5maWxlT3BlbmVyMi5vcGVuKG4scix7ZXJyb3I6ZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9LHN1Y2Nlc3M6ZnVuY3Rpb24oKXtvLnJlc29sdmUoKX19KSxvLnByb21pc2V9LHVuaW5zdGFsbDpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5maWxlT3BlbmVyMi51bmluc3RhbGwobix7ZXJyb3I6ZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LHN1Y2Nlc3M6ZnVuY3Rpb24oKXtyLnJlc29sdmUoKX19KSxyLnByb21pc2V9LGFwcElzSW5zdGFsbGVkOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLmZpbGVPcGVuZXIyLmFwcElzSW5zdGFsbGVkKG4se3N1Y2Nlc3M6ZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmlsZVRyYW5zZmVyXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUZpbGVUcmFuc2ZlclwiLFtcIiRxXCIsXCIkdGltZW91dFwiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2Rvd25sb2FkOmZ1bmN0aW9uKHIsbyx0LGkpe3ZhciBhPWUuZGVmZXIoKSxjPW5ldyBGaWxlVHJhbnNmZXIsdT10JiZ0LmVuY29kZVVSST09PSExP3I6ZW5jb2RlVVJJKHIpO3JldHVybiB0JiZ2b2lkIDAhPT10LnRpbWVvdXQmJm51bGwhPT10LnRpbWVvdXQmJihuKGZ1bmN0aW9uKCl7Yy5hYm9ydCgpfSx0LnRpbWVvdXQpLHQudGltZW91dD1udWxsKSxjLm9ucHJvZ3Jlc3M9ZnVuY3Rpb24oZSl7YS5ub3RpZnkoZSl9LGEucHJvbWlzZS5hYm9ydD1mdW5jdGlvbigpe2MuYWJvcnQoKX0sYy5kb3dubG9hZCh1LG8sYS5yZXNvbHZlLGEucmVqZWN0LGksdCksYS5wcm9taXNlfSx1cGxvYWQ6ZnVuY3Rpb24ocixvLHQsaSl7dmFyIGE9ZS5kZWZlcigpLGM9bmV3IEZpbGVUcmFuc2Zlcix1PXQmJnQuZW5jb2RlVVJJPT09ITE/cjplbmNvZGVVUkkocik7cmV0dXJuIHQmJnZvaWQgMCE9PXQudGltZW91dCYmbnVsbCE9PXQudGltZW91dCYmKG4oZnVuY3Rpb24oKXtjLmFib3J0KCl9LHQudGltZW91dCksdC50aW1lb3V0PW51bGwpLGMub25wcm9ncmVzcz1mdW5jdGlvbihlKXthLm5vdGlmeShlKX0sYS5wcm9taXNlLmFib3J0PWZ1bmN0aW9uKCl7Yy5hYm9ydCgpfSxjLnVwbG9hZChvLHUsYS5yZXNvbHZlLGEucmVqZWN0LHQsaSksYS5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5mbGFzaGxpZ2h0XCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUZsYXNobGlnaHRcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2F2YWlsYWJsZTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmZsYXNobGlnaHQuYXZhaWxhYmxlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0pLHIucHJvbWlzZX0sc3dpdGNoT246ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5mbGFzaGxpZ2h0LnN3aXRjaE9uKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHN3aXRjaE9mZjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmZsYXNobGlnaHQuc3dpdGNoT2ZmKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHRvZ2dsZTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmZsYXNobGlnaHQudG9nZ2xlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmZsdXJyeUFkc1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFGbHVycnlBZHNcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3NldE9wdGlvbnM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLkZsdXJyeUFkcy5zZXRPcHRpb25zKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxjcmVhdGVCYW5uZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLkZsdXJyeUFkcy5jcmVhdGVCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHJlbW92ZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5GbHVycnlBZHMucmVtb3ZlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0sc2hvd0Jhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uRmx1cnJ5QWRzLnNob3dCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dCYW5uZXJBdFhZOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLkZsdXJyeUFkcy5zaG93QmFubmVyQXRYWShyLG8sZnVuY3Rpb24oKXt0LnJlc29sdmUoKX0sZnVuY3Rpb24oKXt0LnJlamVjdCgpfSksdC5wcm9taXNlfSxoaWRlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLkZsdXJyeUFkcy5oaWRlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0scHJlcGFyZUludGVyc3RpdGlhbDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uRmx1cnJ5QWRzLnByZXBhcmVJbnRlcnN0aXRpYWwocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dJbnRlcnN0aXRpYWw6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uRmx1cnJ5QWRzLnNob3dJbnRlcnN0aXRpYWwoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5nYVwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFHQVwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57aW5pdDpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbz1vPj0wP286MTAsbi5wbHVnaW5zLmdhUGx1Z2luLmluaXQoZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0scixvKSx0LnByb21pc2V9LHRyYWNrRXZlbnQ6ZnVuY3Rpb24ocixvLHQsaSxhLGMpe3ZhciB1PWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmdhUGx1Z2luLnRyYWNrRXZlbnQoZnVuY3Rpb24oZSl7dS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt1LnJlamVjdChlKX0sdCxpLGEsYyksdS5wcm9taXNlfSx0cmFja1BhZ2U6ZnVuY3Rpb24ocixvLHQpe3ZhciBpPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmdhUGx1Z2luLnRyYWNrUGFnZShmdW5jdGlvbihlKXtpLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2kucmVqZWN0KGUpfSx0KSxpLnByb21pc2V9LHNldFZhcmlhYmxlOmZ1bmN0aW9uKHIsbyx0LGkpe3ZhciBhPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmdhUGx1Z2luLnNldFZhcmlhYmxlKGZ1bmN0aW9uKGUpe2EucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7YS5yZWplY3QoZSl9LHQsaSksYS5wcm9taXNlfSxleGl0OmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuZ2FQbHVnaW4uZXhpdChmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5nZW9sb2NhdGlvblwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFHZW9sb2NhdGlvblwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2dldEN1cnJlbnRQb3NpdGlvbjpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbiksci5wcm9taXNlfSx3YXRjaFBvc2l0aW9uOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKSxvPW5hdmlnYXRvci5nZW9sb2NhdGlvbi53YXRjaFBvc2l0aW9uKGZ1bmN0aW9uKGUpe3Iubm90aWZ5KGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbik7cmV0dXJuIHIucHJvbWlzZS5jYW5jZWw9ZnVuY3Rpb24oKXtuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uY2xlYXJXYXRjaChvKX0sci5wcm9taXNlLmNsZWFyV2F0Y2g9ZnVuY3Rpb24oZSl7bmF2aWdhdG9yLmdlb2xvY2F0aW9uLmNsZWFyV2F0Y2goZXx8byl9LHIucHJvbWlzZS53YXRjaElEPW8sci5wcm9taXNlfSxjbGVhcldhdGNoOmZ1bmN0aW9uKGUpe3JldHVybiBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uY2xlYXJXYXRjaChlKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ2xvYmFsaXphdGlvblwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFHbG9iYWxpemF0aW9uXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57Z2V0UHJlZmVycmVkTGFuZ3VhZ2U6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLmdldFByZWZlcnJlZExhbmd1YWdlKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9LGdldExvY2FsZU5hbWU6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLmdldExvY2FsZU5hbWUoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sZ2V0Rmlyc3REYXlPZldlZWs6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLmdldEZpcnN0RGF5T2ZXZWVrKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9LGRhdGVUb1N0cmluZzpmdW5jdGlvbihuLHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmdsb2JhbGl6YXRpb24uZGF0ZVRvU3RyaW5nKG4sZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0sciksby5wcm9taXNlfSxzdHJpbmdUb0RhdGU6ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLnN0cmluZ1RvRGF0ZShuLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9LHIpLG8ucHJvbWlzZX0sZ2V0RGF0ZVBhdHRlcm46ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZ2xvYmFsaXphdGlvbi5nZXREYXRlUGF0dGVybihmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKSxyLnByb21pc2V9LGdldERhdGVOYW1lczpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLmdldERhdGVOYW1lcyhmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKSxyLnByb21pc2V9LGlzRGF5TGlnaHRTYXZpbmdzVGltZTpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLmlzRGF5TGlnaHRTYXZpbmdzVGltZShuLGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LG51bWJlclRvU3RyaW5nOmZ1bmN0aW9uKG4scil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZ2xvYmFsaXphdGlvbi5udW1iZXJUb1N0cmluZyhuLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9LHIpLG8ucHJvbWlzZX0sc3RyaW5nVG9OdW1iZXI6ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLnN0cmluZ1RvTnVtYmVyKG4sZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0sciksby5wcm9taXNlfSxnZXROdW1iZXJQYXR0ZXJuOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmdsb2JhbGl6YXRpb24uZ2V0TnVtYmVyUGF0dGVybihmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKSxyLnByb21pc2V9LGdldEN1cnJlbmN5UGF0dGVybjpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLmdldEN1cnJlbmN5UGF0dGVybihuLGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmdvb2dsZUFkc1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFHb29nbGVBZHNcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3NldE9wdGlvbnM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLkFkTW9iLnNldE9wdGlvbnMocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LGNyZWF0ZUJhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uQWRNb2IuY3JlYXRlQmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxyZW1vdmVCYW5uZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uQWRNb2IucmVtb3ZlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0sc2hvd0Jhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uQWRNb2Iuc2hvd0Jhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0Jhbm5lckF0WFk6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4uQWRNb2Iuc2hvd0Jhbm5lckF0WFkocixvLGZ1bmN0aW9uKCl7dC5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7dC5yZWplY3QoKX0pLHQucHJvbWlzZX0saGlkZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5BZE1vYi5oaWRlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0scHJlcGFyZUludGVyc3RpdGlhbDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uQWRNb2IucHJlcGFyZUludGVyc3RpdGlhbChyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0ludGVyc3RpdGlhbDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5BZE1vYi5zaG93SW50ZXJzdGl0aWFsKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ29vZ2xlQW5hbHl0aWNzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUdvb2dsZUFuYWx5dGljc1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57c3RhcnRUcmFja2VyV2l0aElkOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5hbmFseXRpY3Muc3RhcnRUcmFja2VyV2l0aElkKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sc2V0VXNlcklkOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5hbmFseXRpY3Muc2V0VXNlcklkKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sZGVidWdNb2RlOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmFuYWx5dGljcy5kZWJ1Z01vZGUoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHRyYWNrVmlldzpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uYW5hbHl0aWNzLnRyYWNrVmlldyhyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGFkZEN1c3RvbURpbWVuc2lvbjpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKSxpPXBhcnNlSW50KHIsMTApO3JldHVybiBpc05hTihpKSYmdC5yZWplY3QoJ1BhcmFtZXRlciBcImtleVwiIG11c3QgYmUgYW4gaW50ZWdlci4nKSxuLmFuYWx5dGljcy5hZGRDdXN0b21EaW1lbnNpb24oaSxvLGZ1bmN0aW9uKCl7dC5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSksdC5wcm9taXNlfSx0cmFja0V2ZW50OmZ1bmN0aW9uKHIsbyx0LGkpe3ZhciBhPWUuZGVmZXIoKTtyZXR1cm4gbi5hbmFseXRpY3MudHJhY2tFdmVudChyLG8sdCxpLGZ1bmN0aW9uKGUpe2EucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7YS5yZWplY3QoZSl9KSxhLnByb21pc2V9LHRyYWNrRXhjZXB0aW9uOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLmFuYWx5dGljcy50cmFja0V4Y2VwdGlvbihyLG8sZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0pLHQucHJvbWlzZX0sdHJhY2tUaW1pbmc6ZnVuY3Rpb24ocixvLHQsaSl7dmFyIGE9ZS5kZWZlcigpO3JldHVybiBuLmFuYWx5dGljcy50cmFja1RpbWluZyhyLG8sdCxpLGZ1bmN0aW9uKGUpe2EucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7YS5yZWplY3QoZSl9KSxhLnByb21pc2V9LGFkZFRyYW5zYWN0aW9uOmZ1bmN0aW9uKHIsbyx0LGksYSxjKXt2YXIgdT1lLmRlZmVyKCk7cmV0dXJuIG4uYW5hbHl0aWNzLmFkZFRyYW5zYWN0aW9uKHIsbyx0LGksYSxjLGZ1bmN0aW9uKGUpe3UucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7dS5yZWplY3QoZSl9KSx1LnByb21pc2V9LGFkZFRyYW5zYWN0aW9uSXRlbTpmdW5jdGlvbihyLG8sdCxpLGEsYyx1KXt2YXIgcz1lLmRlZmVyKCk7cmV0dXJuIG4uYW5hbHl0aWNzLmFkZFRyYW5zYWN0aW9uSXRlbShyLG8sdCxpLGEsYyx1LGZ1bmN0aW9uKGUpe3MucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7cy5yZWplY3QoZSl9KSxzLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmdvb2dsZU1hcFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFHb29nbGVNYXBcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7dmFyIHI9bnVsbDtyZXR1cm57Z2V0TWFwOmZ1bmN0aW9uKG8pe3ZhciB0PWUuZGVmZXIoKTtpZihuLnBsdWdpbi5nb29nbGUubWFwcyl7dmFyIGk9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBfY2FudmFzXCIpO3I9bi5wbHVnaW4uZ29vZ2xlLm1hcHMuTWFwLmdldE1hcChvKSxyLnNldERpdihpKSx0LnJlc29sdmUocil9ZWxzZSB0LnJlamVjdChudWxsKTtyZXR1cm4gdC5wcm9taXNlfSxpc01hcExvYWRlZDpmdW5jdGlvbigpe3JldHVybiEhcn0sYWRkTWFya2VyOmZ1bmN0aW9uKG4pe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gci5hZGRNYXJrZXIobixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9KSxvLnByb21pc2V9LGdldE1hcFR5cGVJZHM6ZnVuY3Rpb24oKXtyZXR1cm4gbi5wbHVnaW4uZ29vZ2xlLm1hcHMubWFwVHlwZUlkfSxzZXRWaXNpYmxlOmZ1bmN0aW9uKG4pe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gci5zZXRWaXNpYmxlKG4pLG8ucHJvbWlzZX0sY2xlYW51cDpmdW5jdGlvbigpe3I9bnVsbH19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ29vZ2xlUGxheUdhbWVcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhR29vZ2xlUGxheUdhbWVcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybnthdXRoOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBnb29nbGVwbGF5Z2FtZS5hdXRoKGZ1bmN0aW9uKGUpe3JldHVybiBuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3JldHVybiBuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sc2lnbm91dDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gZ29vZ2xlcGxheWdhbWUuc2lnbm91dChmdW5jdGlvbihlKXtyZXR1cm4gbi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyZXR1cm4gbi5yZWplY3QoZSl9KSxuLnByb21pc2V9LGlzU2lnbmVkSW46ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGdvb2dsZXBsYXlnYW1lLmlzU2lnbmVkSW4oZnVuY3Rpb24oZSl7cmV0dXJuIG4ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7cmV0dXJuIG4ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxzaG93UGxheWVyOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBnb29nbGVwbGF5Z2FtZS5zaG93UGxheWVyKGZ1bmN0aW9uKGUpe3JldHVybiBuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3JldHVybiBuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sc3VibWl0U2NvcmU6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBnb29nbGVwbGF5Z2FtZS5zdWJtaXRTY29yZShuLGZ1bmN0aW9uKGUpe3JldHVybiByLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3JldHVybiByLnJlamVjdChlKX0pLHIucHJvbWlzZX0sc2hvd0FsbExlYWRlcmJvYXJkczpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gZ29vZ2xlcGxheWdhbWUuc2hvd0FsbExlYWRlcmJvYXJkcyhmdW5jdGlvbihlKXtyZXR1cm4gbi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyZXR1cm4gbi5yZWplY3QoZSl9KSxuLnByb21pc2V9LHNob3dMZWFkZXJib2FyZDpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGdvb2dsZXBsYXlnYW1lLnNob3dMZWFkZXJib2FyZChuLGZ1bmN0aW9uKGUpe3JldHVybiByLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3JldHVybiByLnJlamVjdChlKX0pLHIucHJvbWlzZX0sdW5sb2NrQWNoaWV2ZW1lbnQ6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBnb29nbGVwbGF5Z2FtZS51bmxvY2tBY2hpZXZlbWVudChuLGZ1bmN0aW9uKGUpe3JldHVybiByLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3JldHVybiByLnJlamVjdChlKX0pLHIucHJvbWlzZX0saW5jcmVtZW50QWNoaWV2ZW1lbnQ6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBnb29nbGVwbGF5Z2FtZS5pbmNyZW1lbnRBY2hpZXZlbWVudChuLGZ1bmN0aW9uKGUpe3JldHVybiByLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3JldHVybiByLnJlamVjdChlKX0pLHIucHJvbWlzZX0sc2hvd0FjaGlldmVtZW50czpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gZ29vZ2xlcGxheWdhbWUuc2hvd0FjaGlldmVtZW50cyhmdW5jdGlvbihlKXtyZXR1cm4gbi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyZXR1cm4gbi5yZWplY3QoZSl9KSxuLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmdvb2dsZVBsdXNcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhR29vZ2xlUGx1c1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57bG9naW46ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiB2b2lkIDA9PT1yJiYocj17fSksbi5wbHVnaW5zLmdvb2dsZXBsdXMubG9naW4oe2lPU0FwaUtleTpyfSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxzaWxlbnRMb2dpbjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHZvaWQgMD09PXImJihyPXt9KSxuLnBsdWdpbnMuZ29vZ2xlcGx1cy50cnlTaWxlbnRMb2dpbih7aU9TQXBpS2V5OnJ9LGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGxvZ291dDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtuLnBsdWdpbnMuZ29vZ2xlcGx1cy5sb2dvdXQoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSl9LGRpc2Nvbm5lY3Q6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7bi5wbHVnaW5zLmdvb2dsZXBsdXMuZGlzY29ubmVjdChmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9KX0saXNBdmFpbGFibGU6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5nb29nbGVwbHVzLmlzQXZhaWxhYmxlKGZ1bmN0aW9uKGUpe2U/ci5yZXNvbHZlKGUpOnIucmVqZWN0KGUpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5oZWFsdGhLaXRcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhSGVhbHRoS2l0XCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntpc0F2YWlsYWJsZTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmhlYWx0aGtpdC5hdmFpbGFibGUoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sY2hlY2tBdXRoU3RhdHVzOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gcj1yfHxcIkhLUXVhbnRpdHlUeXBlSWRlbnRpZmllckhlaWdodFwiLG4ucGx1Z2lucy5oZWFsdGhraXQuY2hlY2tBdXRoU3RhdHVzKHt0eXBlOnJ9LGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHJlcXVlc3RBdXRob3JpemF0aW9uOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiByPXJ8fFtcIkhLQ2hhcmFjdGVyaXN0aWNUeXBlSWRlbnRpZmllckRhdGVPZkJpcnRoXCIsXCJIS1F1YW50aXR5VHlwZUlkZW50aWZpZXJBY3RpdmVFbmVyZ3lCdXJuZWRcIixcIkhLUXVhbnRpdHlUeXBlSWRlbnRpZmllckhlaWdodFwiXSxvPW98fFtcIkhLUXVhbnRpdHlUeXBlSWRlbnRpZmllckFjdGl2ZUVuZXJneUJ1cm5lZFwiLFwiSEtRdWFudGl0eVR5cGVJZGVudGlmaWVySGVpZ2h0XCIsXCJIS1F1YW50aXR5VHlwZUlkZW50aWZpZXJEaXN0YW5jZUN5Y2xpbmdcIl0sbi5wbHVnaW5zLmhlYWx0aGtpdC5yZXF1ZXN0QXV0aG9yaXphdGlvbih7cmVhZFR5cGVzOnIsd3JpdGVUeXBlczpvfSxmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSksdC5wcm9taXNlfSxyZWFkRGF0ZU9mQmlydGg6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5oZWFsdGhraXQucmVhZERhdGVPZkJpcnRoKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSksci5wcm9taXNlfSxyZWFkR2VuZGVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuaGVhbHRoa2l0LnJlYWRHZW5kZXIoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9KSxyLnByb21pc2V9LHNhdmVXZWlnaHQ6ZnVuY3Rpb24ocixvLHQpe3ZhciBpPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmhlYWx0aGtpdC5zYXZlV2VpZ2h0KHt1bml0Om98fFwibGJcIixhbW91bnQ6cixkYXRlOnR8fG5ldyBEYXRlfSxmdW5jdGlvbihlKXtpLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2kucmVzb2x2ZShlKX0pLGkucHJvbWlzZX0scmVhZFdlaWdodDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5oZWFsdGhraXQucmVhZFdlaWdodCh7dW5pdDpyfHxcImxiXCJ9LGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSksby5wcm9taXNlfSxzYXZlSGVpZ2h0OmZ1bmN0aW9uKHIsbyx0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5oZWFsdGhraXQuc2F2ZUhlaWdodCh7dW5pdDpvfHxcImluXCIsYW1vdW50OnIsZGF0ZTp0fHxuZXcgRGF0ZX0sZnVuY3Rpb24oZSl7aS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtpLnJlc29sdmUoZSl9KSxpLnByb21pc2V9LHJlYWRIZWlnaHQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuaGVhbHRoa2l0LnJlYWRIZWlnaHQoe3VuaXQ6cnx8XCJpblwifSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0pLG8ucHJvbWlzZX0sZmluZFdvcmtvdXRzOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuaGVhbHRoa2l0LmZpbmRXb3Jrb3V0cyh7fSxmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0pLHIucHJvbWlzZX0sc2F2ZVdvcmtvdXQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuaGVhbHRoa2l0LnNhdmVXb3Jrb3V0KHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9KSxvLnByb21pc2V9LHF1ZXJ5U2FtcGxlVHlwZTpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5oZWFsdGhraXQucXVlcnlTYW1wbGVUeXBlKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9KSxvLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmh0dHBkXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUh0dHBkXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57c3RhcnRTZXJ2ZXI6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuQ29ySHR0cGQuc3RhcnRTZXJ2ZXIobixmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHN0b3BTZXJ2ZXI6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5Db3JIdHRwZC5zdG9wU2VydmVyKGZ1bmN0aW9uKCl7bi5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7bi5yZWplY3QoKX0pLG4ucHJvbWlzZX0sZ2V0VVJMOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuQ29ySHR0cGQuZ2V0VVJMKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oKXtuLnJlamVjdCgpfSksbi5wcm9taXNlfSxnZXRMb2NhbFBhdGg6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5Db3JIdHRwZC5nZXRMb2NhbFBhdGgoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbigpe24ucmVqZWN0KCl9KSxuLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmlBZFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFpQWRcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3NldE9wdGlvbnM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmlBZC5zZXRPcHRpb25zKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxjcmVhdGVCYW5uZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmlBZC5jcmVhdGVCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHJlbW92ZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5pQWQucmVtb3ZlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0sc2hvd0Jhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uaUFkLnNob3dCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dCYW5uZXJBdFhZOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLmlBZC5zaG93QmFubmVyQXRYWShyLG8sZnVuY3Rpb24oKXt0LnJlc29sdmUoKX0sZnVuY3Rpb24oKXt0LnJlamVjdCgpfSksdC5wcm9taXNlfSxoaWRlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmlBZC5oaWRlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0scHJlcGFyZUludGVyc3RpdGlhbDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uaUFkLnByZXBhcmVJbnRlcnN0aXRpYWwocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dJbnRlcnN0aXRpYWw6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uaUFkLnNob3dJbnRlcnN0aXRpYWwoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5pbWFnZVBpY2tlclwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFJbWFnZVBpY2tlclwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57Z2V0UGljdHVyZXM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmltYWdlUGlja2VyLmdldFBpY3R1cmVzKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9LHIpLG8ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuaW5BcHBCcm93c2VyXCIsW10pLnByb3ZpZGVyKFwiJGNvcmRvdmFJbkFwcEJyb3dzZXJcIixbZnVuY3Rpb24oKXt2YXIgZSxuPXRoaXMuZGVmYXVsdE9wdGlvbnM9e307dGhpcy5zZXREZWZhdWx0T3B0aW9ucz1mdW5jdGlvbihlKXtuPWFuZ3VsYXIuZXh0ZW5kKG4sZSl9LHRoaXMuJGdldD1bXCIkcm9vdFNjb3BlXCIsXCIkcVwiLFwiJHdpbmRvd1wiLFwiJHRpbWVvdXRcIixmdW5jdGlvbihyLG8sdCxpKXtyZXR1cm57b3BlbjpmdW5jdGlvbihhLGMsdSl7dmFyIHM9by5kZWZlcigpO2lmKHUmJiFhbmd1bGFyLmlzT2JqZWN0KHUpKXJldHVybiBzLnJlamVjdChcIm9wdGlvbnMgbXVzdCBiZSBhbiBvYmplY3RcIikscy5wcm9taXNlO3ZhciBsPWFuZ3VsYXIuZXh0ZW5kKHt9LG4sdSksZj1bXTthbmd1bGFyLmZvckVhY2gobCxmdW5jdGlvbihlLG4pe2YucHVzaChuK1wiPVwiK2UpfSk7dmFyIGQ9Zi5qb2luKCk7cmV0dXJuIGU9dC5vcGVuKGEsYyxkKSxlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2Fkc3RhcnRcIixmdW5jdGlvbihlKXtpKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFJbkFwcEJyb3dzZXI6bG9hZHN0YXJ0XCIsZSl9KX0sITEpLGUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRzdG9wXCIsZnVuY3Rpb24oZSl7cy5yZXNvbHZlKGUpLGkoZnVuY3Rpb24oKXtyLiRicm9hZGNhc3QoXCIkY29yZG92YUluQXBwQnJvd3Nlcjpsb2Fkc3RvcFwiLGUpfSl9LCExKSxlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZXJyb3JcIixmdW5jdGlvbihlKXtzLnJlamVjdChlKSxpKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFJbkFwcEJyb3dzZXI6bG9hZGVycm9yXCIsZSl9KX0sITEpLGUuYWRkRXZlbnRMaXN0ZW5lcihcImV4aXRcIixmdW5jdGlvbihlKXtpKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFJbkFwcEJyb3dzZXI6ZXhpdFwiLGUpfSl9LCExKSxzLnByb21pc2V9LGNsb3NlOmZ1bmN0aW9uKCl7ZS5jbG9zZSgpLGU9bnVsbH0sc2hvdzpmdW5jdGlvbigpe2Uuc2hvdygpfSxleGVjdXRlU2NyaXB0OmZ1bmN0aW9uKG4pe3ZhciByPW8uZGVmZXIoKTtyZXR1cm4gZS5leGVjdXRlU2NyaXB0KG4sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSksci5wcm9taXNlfSxpbnNlcnRDU1M6ZnVuY3Rpb24obil7dmFyIHI9by5kZWZlcigpO3JldHVybiBlLmluc2VydENTUyhuLGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0pLHIucHJvbWlzZX19fV19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5pbnNvbW5pYVwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFJbnNvbW5pYVwiLFtcIiR3aW5kb3dcIixmdW5jdGlvbihlKXtyZXR1cm57a2VlcEF3YWtlOmZ1bmN0aW9uKCl7cmV0dXJuIGUucGx1Z2lucy5pbnNvbW5pYS5rZWVwQXdha2UoKX0sYWxsb3dTbGVlcEFnYWluOmZ1bmN0aW9uKCl7cmV0dXJuIGUucGx1Z2lucy5pbnNvbW5pYS5hbGxvd1NsZWVwQWdhaW4oKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuaW5zdGFncmFtXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUluc3RhZ3JhbVwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue3NoYXJlOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gd2luZG93Lkluc3RhZ3JhbT8oSW5zdGFncmFtLnNoYXJlKG4uaW1hZ2Usbi5jYXB0aW9uLGZ1bmN0aW9uKGUpe2U/ci5yZWplY3QoZSk6ci5yZXNvbHZlKCEwKX0pLHIucHJvbWlzZSk6KGNvbnNvbGUuZXJyb3IoXCJUcmllZCB0byBjYWxsIEluc3RhZ3JhbS5zaGFyZSBidXQgdGhlIEluc3RhZ3JhbSBwbHVnaW4gaXNuJ3QgaW5zdGFsbGVkIVwiKSxyLnJlc29sdmUobnVsbCksci5wcm9taXNlKX0saXNJbnN0YWxsZWQ6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIHdpbmRvdy5JbnN0YWdyYW0/KEluc3RhZ3JhbS5pc0luc3RhbGxlZChmdW5jdGlvbihlLHIpe2U/bi5yZWplY3QoZSk6bi5yZXNvbHZlKHIpfSksbi5wcm9taXNlKTooY29uc29sZS5lcnJvcihcIlRyaWVkIHRvIGNhbGwgSW5zdGFncmFtLmlzSW5zdGFsbGVkIGJ1dCB0aGUgSW5zdGFncmFtIHBsdWdpbiBpc24ndCBpbnN0YWxsZWQhXCIpLG4ucmVzb2x2ZShudWxsKSxuLnByb21pc2UpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5rZXlib2FyZFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFLZXlib2FyZFwiLFtcIiRyb290U2NvcGVcIixmdW5jdGlvbihlKXt2YXIgbj1mdW5jdGlvbigpe2UuJGV2YWxBc3luYyhmdW5jdGlvbigpe2UuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhS2V5Ym9hcmQ6c2hvd1wiKX0pfSxyPWZ1bmN0aW9uKCl7ZS4kZXZhbEFzeW5jKGZ1bmN0aW9uKCl7ZS4kYnJvYWRjYXN0KFwiJGNvcmRvdmFLZXlib2FyZDpoaWRlXCIpfSl9O3JldHVybiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZGV2aWNlcmVhZHlcIixmdW5jdGlvbigpe2NvcmRvdmEucGx1Z2lucy5LZXlib2FyZCYmKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibmF0aXZlLmtleWJvYXJkc2hvd1wiLG4sITEpLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibmF0aXZlLmtleWJvYXJkaGlkZVwiLHIsITEpKX0pLHtoaWRlQWNjZXNzb3J5QmFyOmZ1bmN0aW9uKGUpe3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKGUpfSxjbG9zZTpmdW5jdGlvbigpe3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuY2xvc2UoKX0sc2hvdzpmdW5jdGlvbigpe3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuc2hvdygpfSxkaXNhYmxlU2Nyb2xsOmZ1bmN0aW9uKGUpe3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbChlKX0saXNWaXNpYmxlOmZ1bmN0aW9uKCl7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5pc1Zpc2libGV9LGNsZWFyU2hvd1dhdGNoOmZ1bmN0aW9uKCl7ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm5hdGl2ZS5rZXlib2FyZHNob3dcIixuKSxlLiQkbGlzdGVuZXJzW1wiJGNvcmRvdmFLZXlib2FyZDpzaG93XCJdPVtdfSxjbGVhckhpZGVXYXRjaDpmdW5jdGlvbigpe2RvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJuYXRpdmUua2V5Ym9hcmRoaWRlXCIsciksZS4kJGxpc3RlbmVyc1tcIiRjb3Jkb3ZhS2V5Ym9hcmQ6aGlkZVwiXT1bXX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMua2V5Y2hhaW5cIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhS2V5Y2hhaW5cIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntnZXRGb3JLZXk6ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCksdD1uZXcgS2V5Y2hhaW47cmV0dXJuIHQuZ2V0Rm9yS2V5KG8ucmVzb2x2ZSxvLnJlamVjdCxuLHIpLG8ucHJvbWlzZX0sc2V0Rm9yS2V5OmZ1bmN0aW9uKG4scixvKXt2YXIgdD1lLmRlZmVyKCksaT1uZXcgS2V5Y2hhaW47cmV0dXJuIGkuc2V0Rm9yS2V5KHQucmVzb2x2ZSx0LnJlamVjdCxuLHIsbyksdC5wcm9taXNlfSxyZW1vdmVGb3JLZXk6ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCksdD1uZXcgS2V5Y2hhaW47cmV0dXJuIHQucmVtb3ZlRm9yS2V5KG8ucmVzb2x2ZSxvLnJlamVjdCxuLHIpLG8ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMubGF1bmNoTmF2aWdhdG9yXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUxhdW5jaE5hdmlnYXRvclwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue25hdmlnYXRlOmZ1bmN0aW9uKG4scixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIGxhdW5jaG5hdmlnYXRvci5uYXZpZ2F0ZShuLHIsZnVuY3Rpb24oKXt0LnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7dC5yZWplY3QoZSl9LG8pLHQucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMubG9jYWxOb3RpZmljYXRpb25cIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhTG9jYWxOb3RpZmljYXRpb25cIixbXCIkcVwiLFwiJHdpbmRvd1wiLFwiJHJvb3RTY29wZVwiLFwiJHRpbWVvdXRcIixmdW5jdGlvbihlLG4scixvKXtyZXR1cm4gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRldmljZXJlYWR5XCIsZnVuY3Rpb24oKXtuLmNvcmRvdmEmJm4uY29yZG92YS5wbHVnaW5zJiZuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24mJm4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbCYmKG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5vbihcInNjaGVkdWxlXCIsZnVuY3Rpb24oZSxuKXtvKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFMb2NhbE5vdGlmaWNhdGlvbjpzY2hlZHVsZVwiLGUsbil9KX0pLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5vbihcInRyaWdnZXJcIixmdW5jdGlvbihlLG4pe28oZnVuY3Rpb24oKXtyLiRicm9hZGNhc3QoXCIkY29yZG92YUxvY2FsTm90aWZpY2F0aW9uOnRyaWdnZXJcIixlLG4pfSl9KSxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwub24oXCJ1cGRhdGVcIixmdW5jdGlvbihlLG4pe28oZnVuY3Rpb24oKXtyLiRicm9hZGNhc3QoXCIkY29yZG92YUxvY2FsTm90aWZpY2F0aW9uOnVwZGF0ZVwiLGUsbil9KX0pLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5vbihcImNsZWFyXCIsZnVuY3Rpb24oZSxuKXtvKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFMb2NhbE5vdGlmaWNhdGlvbjpjbGVhclwiLGUsbil9KX0pLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5vbihcImNsZWFyYWxsXCIsZnVuY3Rpb24oZSl7byhmdW5jdGlvbigpe3IuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhTG9jYWxOb3RpZmljYXRpb246Y2xlYXJhbGxcIixlKX0pfSksbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLm9uKFwiY2FuY2VsXCIsZnVuY3Rpb24oZSxuKXtvKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFMb2NhbE5vdGlmaWNhdGlvbjpjYW5jZWxcIixlLG4pfSl9KSxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwub24oXCJjYW5jZWxhbGxcIixmdW5jdGlvbihlKXtvKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFMb2NhbE5vdGlmaWNhdGlvbjpjYW5jZWxhbGxcIixlKX0pfSksbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLm9uKFwiY2xpY2tcIixmdW5jdGlvbihlLG4pe28oZnVuY3Rpb24oKXtyLiRicm9hZGNhc3QoXCIkY29yZG92YUxvY2FsTm90aWZpY2F0aW9uOmNsaWNrXCIsZSxuKX0pfSkpfSwhMSkse3NjaGVkdWxlOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLnNjaGVkdWxlKHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxvKSx0LnByb21pc2V9LGFkZDpmdW5jdGlvbihyLG8pe2NvbnNvbGUud2FybignRGVwcmVjYXRlZDogdXNlIFwic2NoZWR1bGVcIiBpbnN0ZWFkLicpO3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbz1vfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5zY2hlZHVsZShyLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sbyksdC5wcm9taXNlfSx1cGRhdGU6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwudXBkYXRlKHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxvKSx0LnByb21pc2V9LGNsZWFyOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO1xucmV0dXJuIG89b3x8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuY2xlYXIocixmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LG8pLHQucHJvbWlzZX0sY2xlYXJBbGw6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmNsZWFyQWxsKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sciksby5wcm9taXNlfSxjYW5jZWw6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuY2FuY2VsKHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxvKSx0LnByb21pc2V9LGNhbmNlbEFsbDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuY2FuY2VsQWxsKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sciksby5wcm9taXNlfSxpc1ByZXNlbnQ6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuaXNQcmVzZW50KHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxvKSx0LnByb21pc2V9LGlzU2NoZWR1bGVkOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmlzU2NoZWR1bGVkKHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxvKSx0LnByb21pc2V9LGlzVHJpZ2dlcmVkOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmlzVHJpZ2dlcmVkKHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxvKSx0LnByb21pc2V9LGhhc1Blcm1pc3Npb246ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmhhc1Blcm1pc3Npb24oZnVuY3Rpb24oZSl7ZT9vLnJlc29sdmUoZSk6by5yZWplY3QoZSl9LHIpLG8ucHJvbWlzZX0scmVnaXN0ZXJQZXJtaXNzaW9uOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gcj1yfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5yZWdpc3RlclBlcm1pc3Npb24oZnVuY3Rpb24oZSl7ZT9vLnJlc29sdmUoZSk6by5yZWplY3QoZSl9LHIpLG8ucHJvbWlzZX0scHJvbXB0Rm9yUGVybWlzc2lvbjpmdW5jdGlvbihyKXtjb25zb2xlLndhcm4oJ0RlcHJlY2F0ZWQ6IHVzZSBcInJlZ2lzdGVyUGVybWlzc2lvblwiIGluc3RlYWQuJyk7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLnJlZ2lzdGVyUGVybWlzc2lvbihmdW5jdGlvbihlKXtlP28ucmVzb2x2ZShlKTpvLnJlamVjdChlKX0sciksby5wcm9taXNlfSxnZXRBbGxJZHM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmdldEFsbElkcyhmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LHIpLG8ucHJvbWlzZX0sZ2V0SWRzOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gcj1yfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5nZXRJZHMoZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxyKSxvLnByb21pc2V9LGdldFNjaGVkdWxlZElkczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuZ2V0U2NoZWR1bGVkSWRzKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sciksby5wcm9taXNlfSxnZXRUcmlnZ2VyZWRJZHM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmdldFRyaWdnZXJlZElkcyhmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LHIpLG8ucHJvbWlzZX0sZ2V0OmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmdldChyLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sbyksdC5wcm9taXNlfSxnZXRBbGw6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmdldEFsbChmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LHIpLG8ucHJvbWlzZX0sZ2V0U2NoZWR1bGVkOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmdldFNjaGVkdWxlZChyLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sbyksdC5wcm9taXNlfSxnZXRBbGxTY2hlZHVsZWQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmdldEFsbFNjaGVkdWxlZChmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LHIpLG8ucHJvbWlzZX0sZ2V0VHJpZ2dlcmVkOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmdldFRyaWdnZXJlZChyLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sbyksdC5wcm9taXNlfSxnZXRBbGxUcmlnZ2VyZWQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmdldEFsbFRyaWdnZXJlZChmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LHIpLG8ucHJvbWlzZX0sZ2V0RGVmYXVsdHM6ZnVuY3Rpb24oKXtyZXR1cm4gbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmdldERlZmF1bHRzKCl9LHNldERlZmF1bHRzOmZ1bmN0aW9uKGUpe24uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5zZXREZWZhdWx0cyhlKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMubU1lZGlhQWRzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YU1NZWRpYUFkc1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57c2V0T3B0aW9uczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ubU1lZGlhLnNldE9wdGlvbnMocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LGNyZWF0ZUJhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ubU1lZGlhLmNyZWF0ZUJhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0scmVtb3ZlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLm1NZWRpYS5yZW1vdmVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxzaG93QmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5tTWVkaWEuc2hvd0Jhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0Jhbm5lckF0WFk6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4ubU1lZGlhLnNob3dCYW5uZXJBdFhZKHIsbyxmdW5jdGlvbigpe3QucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3QucmVqZWN0KCl9KSx0LnByb21pc2V9LGhpZGVCYW5uZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ubU1lZGlhLmhpZGVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxwcmVwYXJlSW50ZXJzdGl0aWFsOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5tTWVkaWEucHJlcGFyZUludGVyc3RpdGlhbChyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0ludGVyc3RpdGlhbDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5tTWVkaWEuc2hvd0ludGVyc3RpdGlhbChmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLm1lZGlhXCIsW10pLnNlcnZpY2UoXCJOZXdNZWRpYVwiLFtcIiRxXCIsXCIkaW50ZXJ2YWxcIixmdW5jdGlvbihlLG4pe2Z1bmN0aW9uIHIoZSl7YW5ndWxhci5pc0RlZmluZWQocyl8fChzPW4oZnVuY3Rpb24oKXswPmQmJihkPWUuZ2V0RHVyYXRpb24oKSxhJiZkPjAmJmEubm90aWZ5KHtkdXJhdGlvbjpkfSkpLGUuZ2V0Q3VycmVudFBvc2l0aW9uKGZ1bmN0aW9uKGUpe2U+LTEmJihmPWUpfSxmdW5jdGlvbihlKXtjb25zb2xlLmxvZyhcIkVycm9yIGdldHRpbmcgcG9zPVwiK2UpfSksYSYmYS5ub3RpZnkoe3Bvc2l0aW9uOmZ9KX0sMWUzKSl9ZnVuY3Rpb24gbygpe2FuZ3VsYXIuaXNEZWZpbmVkKHMpJiYobi5jYW5jZWwocykscz12b2lkIDApfWZ1bmN0aW9uIHQoKXtmPS0xLGQ9LTF9ZnVuY3Rpb24gaShlKXt0aGlzLm1lZGlhPW5ldyBNZWRpYShlLGZ1bmN0aW9uKGUpe28oKSx0KCksYS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvKCksdCgpLGEucmVqZWN0KGUpfSxmdW5jdGlvbihlKXtsPWUsYS5ub3RpZnkoe3N0YXR1czpsfSl9KX12YXIgYSxjLHUscyxsPW51bGwsZj0tMSxkPS0xO3JldHVybiBpLnByb3RvdHlwZS5wbGF5PWZ1bmN0aW9uKG4pe3JldHVybiBhPWUuZGVmZXIoKSxcIm9iamVjdFwiIT10eXBlb2YgbiYmKG49e30pLHRoaXMubWVkaWEucGxheShuKSxyKHRoaXMubWVkaWEpLGEucHJvbWlzZX0saS5wcm90b3R5cGUucGF1c2U9ZnVuY3Rpb24oKXtvKCksdGhpcy5tZWRpYS5wYXVzZSgpfSxpLnByb3RvdHlwZS5zdG9wPWZ1bmN0aW9uKCl7dGhpcy5tZWRpYS5zdG9wKCl9LGkucHJvdG90eXBlLnJlbGVhc2U9ZnVuY3Rpb24oKXt0aGlzLm1lZGlhLnJlbGVhc2UoKSx0aGlzLm1lZGlhPXZvaWQgMH0saS5wcm90b3R5cGUuc2Vla1RvPWZ1bmN0aW9uKGUpe3RoaXMubWVkaWEuc2Vla1RvKGUpfSxpLnByb3RvdHlwZS5zZXRWb2x1bWU9ZnVuY3Rpb24oZSl7dGhpcy5tZWRpYS5zZXRWb2x1bWUoZSl9LGkucHJvdG90eXBlLnN0YXJ0UmVjb3JkPWZ1bmN0aW9uKCl7dGhpcy5tZWRpYS5zdGFydFJlY29yZCgpfSxpLnByb3RvdHlwZS5zdG9wUmVjb3JkPWZ1bmN0aW9uKCl7dGhpcy5tZWRpYS5zdG9wUmVjb3JkKCl9LGkucHJvdG90eXBlLmN1cnJlbnRUaW1lPWZ1bmN0aW9uKCl7cmV0dXJuIGM9ZS5kZWZlcigpLHRoaXMubWVkaWEuZ2V0Q3VycmVudFBvc2l0aW9uKGZ1bmN0aW9uKGUpe2MucmVzb2x2ZShlKX0pLGMucHJvbWlzZX0saS5wcm90b3R5cGUuZ2V0RHVyYXRpb249ZnVuY3Rpb24oKXtyZXR1cm4gdT1lLmRlZmVyKCksdGhpcy5tZWRpYS5nZXREdXJhdGlvbihmdW5jdGlvbihlKXt1LnJlc29sdmUoZSl9KSx1LnByb21pc2V9LGl9XSkuZmFjdG9yeShcIiRjb3Jkb3ZhTWVkaWFcIixbXCJOZXdNZWRpYVwiLGZ1bmN0aW9uKGUpe3JldHVybntuZXdNZWRpYTpmdW5jdGlvbihuKXtyZXR1cm4gbmV3IGUobil9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLm1vYmZveEFkc1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFNb2JGb3hBZHNcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3NldE9wdGlvbnM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLk1vYkZveC5zZXRPcHRpb25zKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxjcmVhdGVCYW5uZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLk1vYkZveC5jcmVhdGVCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHJlbW92ZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb2JGb3gucmVtb3ZlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0sc2hvd0Jhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uTW9iRm94LnNob3dCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dCYW5uZXJBdFhZOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLk1vYkZveC5zaG93QmFubmVyQXRYWShyLG8sZnVuY3Rpb24oKXt0LnJlc29sdmUoKX0sZnVuY3Rpb24oKXt0LnJlamVjdCgpfSksdC5wcm9taXNlfSxoaWRlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLk1vYkZveC5oaWRlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0scHJlcGFyZUludGVyc3RpdGlhbDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uTW9iRm94LnByZXBhcmVJbnRlcnN0aXRpYWwocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dJbnRlcnN0aXRpYWw6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uTW9iRm94LnNob3dJbnRlcnN0aXRpYWwoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2luc1wiLFtcIm5nQ29yZG92YS5wbHVnaW5zLjNkdG91Y2hcIixcIm5nQ29yZG92YS5wbHVnaW5zLmFjdGlvblNoZWV0XCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5hZE1vYlwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuYXBwQXZhaWxhYmlsaXR5XCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5hcHBSYXRlXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5hcHBWZXJzaW9uXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5iYWNrZ3JvdW5kR2VvbG9jYXRpb25cIixcIm5nQ29yZG92YS5wbHVnaW5zLmJhZGdlXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5iYXJjb2RlU2Nhbm5lclwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuYmF0dGVyeVN0YXR1c1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuYmVhY29uXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5ibGVcIixcIm5nQ29yZG92YS5wbHVnaW5zLmJsdWV0b290aFNlcmlhbFwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuYnJpZ2h0bmVzc1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuY2FsZW5kYXJcIixcIm5nQ29yZG92YS5wbHVnaW5zLmNhbWVyYVwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuY2FwdHVyZVwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuY2xpcGJvYXJkXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5jb250YWN0c1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZGF0ZVBpY2tlclwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZGV2aWNlXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5kZXZpY2VNb3Rpb25cIixcIm5nQ29yZG92YS5wbHVnaW5zLmRldmljZU9yaWVudGF0aW9uXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5kaWFsb2dzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5lbWFpbENvbXBvc2VyXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5mYWNlYm9va1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmFjZWJvb2tBZHNcIixcIm5nQ29yZG92YS5wbHVnaW5zLmZpbGVcIixcIm5nQ29yZG92YS5wbHVnaW5zLmZpbGVUcmFuc2ZlclwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmlsZU9wZW5lcjJcIixcIm5nQ29yZG92YS5wbHVnaW5zLmZsYXNobGlnaHRcIixcIm5nQ29yZG92YS5wbHVnaW5zLmZsdXJyeUFkc1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ2FcIixcIm5nQ29yZG92YS5wbHVnaW5zLmdlb2xvY2F0aW9uXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5nbG9iYWxpemF0aW9uXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5nb29nbGVBZHNcIixcIm5nQ29yZG92YS5wbHVnaW5zLmdvb2dsZUFuYWx5dGljc1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ29vZ2xlTWFwXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5nb29nbGVQbGF5R2FtZVwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ29vZ2xlUGx1c1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuaGVhbHRoS2l0XCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5odHRwZFwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuaUFkXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5pbWFnZVBpY2tlclwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuaW5BcHBCcm93c2VyXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5pbnN0YWdyYW1cIixcIm5nQ29yZG92YS5wbHVnaW5zLmtleWJvYXJkXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5rZXljaGFpblwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMubGF1bmNoTmF2aWdhdG9yXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5sb2NhbE5vdGlmaWNhdGlvblwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMubWVkaWFcIixcIm5nQ29yZG92YS5wbHVnaW5zLm1NZWRpYUFkc1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMubW9iZm94QWRzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5tb3B1YkFkc1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMubmF0aXZlQXVkaW9cIixcIm5nQ29yZG92YS5wbHVnaW5zLm5ldHdvcmtcIixcIm5nQ29yZG92YS5wbHVnaW5zLnBpbkRpYWxvZ1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMucHJlZmVyZW5jZXNcIixcIm5nQ29yZG92YS5wbHVnaW5zLnByaW50ZXJcIixcIm5nQ29yZG92YS5wbHVnaW5zLnByb2dyZXNzSW5kaWNhdG9yXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5wdXNoXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5wdXNoX3Y1XCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5zbXNcIixcIm5nQ29yZG92YS5wbHVnaW5zLnNvY2lhbFNoYXJpbmdcIixcIm5nQ29yZG92YS5wbHVnaW5zLnNwaW5uZXJEaWFsb2dcIixcIm5nQ29yZG92YS5wbHVnaW5zLnNwbGFzaHNjcmVlblwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuc3FsaXRlXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5zdGF0dXNiYXJcIixcIm5nQ29yZG92YS5wbHVnaW5zLnRvYXN0XCIsXCJuZ0NvcmRvdmEucGx1Z2lucy50b3VjaGlkXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy52aWJyYXRpb25cIixcIm5nQ29yZG92YS5wbHVnaW5zLnZpZGVvQ2FwdHVyZVBsdXNcIixcIm5nQ29yZG92YS5wbHVnaW5zLnppcFwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuaW5zb21uaWFcIl0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMubW9wdWJBZHNcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhTW9QdWJBZHNcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3NldE9wdGlvbnM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLk1vUHViLnNldE9wdGlvbnMocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LGNyZWF0ZUJhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uTW9QdWIuY3JlYXRlQmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxyZW1vdmVCYW5uZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uTW9QdWIucmVtb3ZlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0sc2hvd0Jhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uTW9QdWIuc2hvd0Jhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0Jhbm5lckF0WFk6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4uTW9QdWIuc2hvd0Jhbm5lckF0WFkocixvLGZ1bmN0aW9uKCl7dC5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7dC5yZWplY3QoKX0pLHQucHJvbWlzZX0saGlkZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb1B1Yi5oaWRlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0scHJlcGFyZUludGVyc3RpdGlhbDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uTW9QdWIucHJlcGFyZUludGVyc3RpdGlhbChyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0ludGVyc3RpdGlhbDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb1B1Yi5zaG93SW50ZXJzdGl0aWFsKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMubmF0aXZlQXVkaW9cIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhTmF0aXZlQXVkaW9cIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3ByZWxvYWRTaW1wbGU6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5OYXRpdmVBdWRpby5wcmVsb2FkU2ltcGxlKHIsbyxmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSksdC5wcm9taXNlfSxwcmVsb2FkQ29tcGxleDpmdW5jdGlvbihyLG8sdCxpLGEpe3ZhciBjPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLk5hdGl2ZUF1ZGlvLnByZWxvYWRDb21wbGV4KHIsbyx0LGksYSxmdW5jdGlvbihlKXtjLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2MucmVqZWN0KGUpfSksYy5wcm9taXNlfSxwbGF5OmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuTmF0aXZlQXVkaW8ucGxheShyLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7dC5yZWplY3QoZSl9LG8pLHQucHJvbWlzZX0sc3RvcDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5OYXRpdmVBdWRpby5zdG9wKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sbG9vcDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5OYXRpdmVBdWRpby5sb29wKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sdW5sb2FkOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLk5hdGl2ZUF1ZGlvLnVubG9hZChyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHNldFZvbHVtZUZvckNvbXBsZXhBc3NldDpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLk5hdGl2ZUF1ZGlvLnNldFZvbHVtZUZvckNvbXBsZXhBc3NldChyLG8sZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0pLHQucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMubmV0d29ya1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFOZXR3b3JrXCIsW1wiJHJvb3RTY29wZVwiLFwiJHRpbWVvdXRcIixmdW5jdGlvbihlLG4pe3ZhciByPWZ1bmN0aW9uKCl7dmFyIHI9bmF2aWdhdG9yLmNvbm5lY3Rpb24udHlwZTtuKGZ1bmN0aW9uKCl7ZS4kYnJvYWRjYXN0KFwiJGNvcmRvdmFOZXR3b3JrOm9mZmxpbmVcIixyKX0pfSxvPWZ1bmN0aW9uKCl7dmFyIHI9bmF2aWdhdG9yLmNvbm5lY3Rpb24udHlwZTtuKGZ1bmN0aW9uKCl7ZS4kYnJvYWRjYXN0KFwiJGNvcmRvdmFOZXR3b3JrOm9ubGluZVwiLHIpfSl9O3JldHVybiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZGV2aWNlcmVhZHlcIixmdW5jdGlvbigpe25hdmlnYXRvci5jb25uZWN0aW9uJiYoZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm9mZmxpbmVcIixyLCExKSxkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwib25saW5lXCIsbywhMSkpfSkse2dldE5ldHdvcms6ZnVuY3Rpb24oKXtyZXR1cm4gbmF2aWdhdG9yLmNvbm5lY3Rpb24udHlwZX0saXNPbmxpbmU6ZnVuY3Rpb24oKXt2YXIgZT1uYXZpZ2F0b3IuY29ubmVjdGlvbi50eXBlO3JldHVybiBlIT09Q29ubmVjdGlvbi5VTktOT1dOJiZlIT09Q29ubmVjdGlvbi5OT05FfSxpc09mZmxpbmU6ZnVuY3Rpb24oKXt2YXIgZT1uYXZpZ2F0b3IuY29ubmVjdGlvbi50eXBlO3JldHVybiBlPT09Q29ubmVjdGlvbi5VTktOT1dOfHxlPT09Q29ubmVjdGlvbi5OT05FfSxjbGVhck9mZmxpbmVXYXRjaDpmdW5jdGlvbigpe2RvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJvZmZsaW5lXCIsciksZS4kJGxpc3RlbmVyc1tcIiRjb3Jkb3ZhTmV0d29yazpvZmZsaW5lXCJdPVtdfSxjbGVhck9ubGluZVdhdGNoOmZ1bmN0aW9uKCl7ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm9ubGluZVwiLG8pLGUuJCRsaXN0ZW5lcnNbXCIkY29yZG92YU5ldHdvcms6b25saW5lXCJdPVtdfX19XSkucnVuKFtcIiRpbmplY3RvclwiLGZ1bmN0aW9uKGUpe2UuZ2V0KFwiJGNvcmRvdmFOZXR3b3JrXCIpfV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMucGluRGlhbG9nXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVBpbkRpYWxvZ1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57cHJvbXB0OmZ1bmN0aW9uKHIsbyx0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5waW5EaWFsb2cucHJvbXB0KHIsZnVuY3Rpb24oZSl7aS5yZXNvbHZlKGUpfSxvLHQpLGkucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMucHJlZmVyZW5jZXNcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhUHJlZmVyZW5jZXNcIixbXCIkd2luZG93XCIsXCIkcVwiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3BsdWdpbk5vdEVuYWJsZWRNZXNzYWdlOlwiUGx1Z2luIG5vdCBlbmFibGVkXCIsZGVjb3JhdGVQcm9taXNlOmZ1bmN0aW9uKGUpe2Uuc3VjY2Vzcz1mdW5jdGlvbihuKXtyZXR1cm4gZS50aGVuKG4pLGV9LGUuZXJyb3I9ZnVuY3Rpb24obil7cmV0dXJuIGUudGhlbihudWxsLG4pLGV9fSxzdG9yZTpmdW5jdGlvbihyLG8sdCl7ZnVuY3Rpb24gaShlKXtjLnJlc29sdmUoZSl9ZnVuY3Rpb24gYShlKXtjLnJlamVjdChuZXcgRXJyb3IoZSkpfXZhciBjPW4uZGVmZXIoKSx1PWMucHJvbWlzZTtpZihlLnBsdWdpbnMpe3ZhciBzO3M9Mz09PWFyZ3VtZW50cy5sZW5ndGg/ZS5wbHVnaW5zLmFwcFByZWZlcmVuY2VzLnN0b3JlKHQscixvKTplLnBsdWdpbnMuYXBwUHJlZmVyZW5jZXMuc3RvcmUocixvKSxzLnRoZW4oaSxhKX1lbHNlIGMucmVqZWN0KG5ldyBFcnJvcih0aGlzLnBsdWdpbk5vdEVuYWJsZWRNZXNzYWdlKSk7cmV0dXJuIHRoaXMuZGVjb3JhdGVQcm9taXNlKHUpLHV9LGZldGNoOmZ1bmN0aW9uKHIsbyl7ZnVuY3Rpb24gdChlKXthLnJlc29sdmUoZSl9ZnVuY3Rpb24gaShlKXthLnJlamVjdChuZXcgRXJyb3IoZSkpfXZhciBhPW4uZGVmZXIoKSxjPWEucHJvbWlzZTtpZihlLnBsdWdpbnMpe3ZhciB1O3U9Mj09PWFyZ3VtZW50cy5sZW5ndGg/ZS5wbHVnaW5zLmFwcFByZWZlcmVuY2VzLmZldGNoKG8scik6ZS5wbHVnaW5zLmFwcFByZWZlcmVuY2VzLmZldGNoKHIpLHUudGhlbih0LGkpfWVsc2UgYS5yZWplY3QobmV3IEVycm9yKHRoaXMucGx1Z2luTm90RW5hYmxlZE1lc3NhZ2UpKTtyZXR1cm4gdGhpcy5kZWNvcmF0ZVByb21pc2UoYyksY30scmVtb3ZlOmZ1bmN0aW9uKHIsbyl7ZnVuY3Rpb24gdChlKXthLnJlc29sdmUoZSl9ZnVuY3Rpb24gaShlKXthLnJlamVjdChuZXcgRXJyb3IoZSkpfXZhciBhPW4uZGVmZXIoKSxjPWEucHJvbWlzZTtpZihlLnBsdWdpbnMpe3ZhciB1O3U9Mj09PWFyZ3VtZW50cy5sZW5ndGg/ZS5wbHVnaW5zLmFwcFByZWZlcmVuY2VzLnJlbW92ZShvLHIpOmUucGx1Z2lucy5hcHBQcmVmZXJlbmNlcy5yZW1vdmUociksdS50aGVuKHQsaSl9ZWxzZSBhLnJlamVjdChuZXcgRXJyb3IodGhpcy5wbHVnaW5Ob3RFbmFibGVkTWVzc2FnZSkpO3JldHVybiB0aGlzLmRlY29yYXRlUHJvbWlzZShjKSxjfSxzaG93OmZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlKXt0LnJlc29sdmUoZSl9ZnVuY3Rpb24gbyhlKXt0LnJlamVjdChuZXcgRXJyb3IoZSkpfXZhciB0PW4uZGVmZXIoKSxpPXQucHJvbWlzZTtyZXR1cm4gZS5wbHVnaW5zP2UucGx1Z2lucy5hcHBQcmVmZXJlbmNlcy5zaG93KCkudGhlbihyLG8pOnQucmVqZWN0KG5ldyBFcnJvcih0aGlzLnBsdWdpbk5vdEVuYWJsZWRNZXNzYWdlKSksdGhpcy5kZWNvcmF0ZVByb21pc2UoaSksaX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMucHJpbnRlclwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFQcmludGVyXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntpc0F2YWlsYWJsZTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW4ucHJpbnRlci5pc0F2YWlsYWJsZShmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9KSxyLnByb21pc2V9LHByaW50OmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbi5wcmludGVyLnByaW50KHIsbyxmdW5jdGlvbigpe3QucmVzb2x2ZSgpfSksdC5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5wcm9ncmVzc0luZGljYXRvclwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFQcm9ncmVzc1wiLFtmdW5jdGlvbigpe3JldHVybntzaG93OmZ1bmN0aW9uKGUpe3ZhciBuPWV8fFwiUGxlYXNlIHdhaXQuLi5cIjtyZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3Iuc2hvdyhuKX0sc2hvd1NpbXBsZTpmdW5jdGlvbihlKXt2YXIgbj1lfHwhMTtyZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3Iuc2hvd1NpbXBsZShuKX0sc2hvd1NpbXBsZVdpdGhMYWJlbDpmdW5jdGlvbihlLG4pe3ZhciByPWV8fCExLG89bnx8XCJMb2FkaW5nLi4uXCI7cmV0dXJuIFByb2dyZXNzSW5kaWNhdG9yLnNob3dTaW1wbGVXaXRoTGFiZWwocixvKX0sc2hvd1NpbXBsZVdpdGhMYWJlbERldGFpbDpmdW5jdGlvbihlLG4scil7dmFyIG89ZXx8ITEsdD1ufHxcIkxvYWRpbmcuLi5cIixpPXJ8fFwiUGxlYXNlIHdhaXRcIjtyZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3Iuc2hvd1NpbXBsZVdpdGhMYWJlbERldGFpbChvLHQsaSl9LHNob3dEZXRlcm1pbmF0ZTpmdW5jdGlvbihlLG4pe3ZhciByPWV8fCExLG89bnx8NWU0O3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93RGV0ZXJtaW5hdGUocixvKX0sc2hvd0RldGVybWluYXRlV2l0aExhYmVsOmZ1bmN0aW9uKGUsbixyKXt2YXIgbz1lfHwhMSx0PW58fDVlNCxpPXJ8fFwiTG9hZGluZy4uLlwiO3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93RGV0ZXJtaW5hdGVXaXRoTGFiZWwobyx0LGkpfSxzaG93QW5udWxhcjpmdW5jdGlvbihlLG4pe3ZhciByPWV8fCExLG89bnx8NWU0O3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93QW5udWxhcihyLG8pfSxzaG93QW5udWxhcldpdGhMYWJlbDpmdW5jdGlvbihlLG4scil7dmFyIG89ZXx8ITEsdD1ufHw1ZTQsaT1yfHxcIkxvYWRpbmcuLi5cIjtyZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3Iuc2hvd0FubnVsYXJXaXRoTGFiZWwobyx0LGkpfSxzaG93QmFyOmZ1bmN0aW9uKGUsbil7dmFyIHI9ZXx8ITEsbz1ufHw1ZTQ7cmV0dXJuIFByb2dyZXNzSW5kaWNhdG9yLnNob3dCYXIocixvKX0sc2hvd0JhcldpdGhMYWJlbDpmdW5jdGlvbihlLG4scil7dmFyIG89ZXx8ITEsdD1ufHw1ZTQsaT1yfHxcIkxvYWRpbmcuLi5cIjtyZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3Iuc2hvd0JhcldpdGhMYWJlbChvLHQsaSl9LHNob3dTdWNjZXNzOmZ1bmN0aW9uKGUsbil7dmFyIHI9ZXx8ITEsbz1ufHxcIlN1Y2Nlc3NcIjtyZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3Iuc2hvd1N1Y2Nlc3MocixvKX0sc2hvd1RleHQ6ZnVuY3Rpb24oZSxuLHIpe3ZhciBvPWV8fCExLHQ9bnx8XCJXYXJuaW5nXCIsaT1yfHxcImNlbnRlclwiO3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93VGV4dChvLHQsaSl9LGhpZGU6ZnVuY3Rpb24oKXtyZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3IuaGlkZSgpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5wdXNoXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVB1c2hcIixbXCIkcVwiLFwiJHdpbmRvd1wiLFwiJHJvb3RTY29wZVwiLFwiJHRpbWVvdXRcIixmdW5jdGlvbihlLG4scixvKXtyZXR1cm57b25Ob3RpZmljYXRpb246ZnVuY3Rpb24oZSl7byhmdW5jdGlvbigpe3IuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhUHVzaDpub3RpZmljYXRpb25SZWNlaXZlZFwiLGUpfSl9LHJlZ2lzdGVyOmZ1bmN0aW9uKHIpe3ZhciBvLHQ9ZS5kZWZlcigpO3JldHVybiB2b2lkIDAhPT1yJiZ2b2lkIDA9PT1yLmVjYiYmKG89bnVsbD09PWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbbmctYXBwXVwiKT9cImRvY3VtZW50LmJvZHlcIjpcImRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tuZy1hcHBdJylcIixyLmVjYj1cImFuZ3VsYXIuZWxlbWVudChcIitvK1wiKS5pbmplY3RvcigpLmdldCgnJGNvcmRvdmFQdXNoJykub25Ob3RpZmljYXRpb25cIiksbi5wbHVnaW5zLnB1c2hOb3RpZmljYXRpb24ucmVnaXN0ZXIoZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0sciksdC5wcm9taXNlfSx1bnJlZ2lzdGVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnB1c2hOb3RpZmljYXRpb24udW5yZWdpc3RlcihmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSxyKSxvLnByb21pc2V9LHNldEJhZGdlTnVtYmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnB1c2hOb3RpZmljYXRpb24uc2V0QXBwbGljYXRpb25JY29uQmFkZ2VOdW1iZXIoZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0sciksby5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5wdXNoX3Y1XCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVB1c2hWNVwiLFtcIiRxXCIsXCIkcm9vdFNjb3BlXCIsXCIkdGltZW91dFwiLGZ1bmN0aW9uKGUsbixyKXt2YXIgbztyZXR1cm57aW5pdGlhbGl6ZTpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG89UHVzaE5vdGlmaWNhdGlvbi5pbml0KG4pLHIucmVzb2x2ZShvKSxyLnByb21pc2V9LG9uTm90aWZpY2F0aW9uOmZ1bmN0aW9uKCl7cihmdW5jdGlvbigpe28ub24oXCJub3RpZmljYXRpb25cIixmdW5jdGlvbihlKXtuLiRlbWl0KFwiJGNvcmRvdmFQdXNoVjU6bm90aWZpY2F0aW9uUmVjZWl2ZWRcIixlKX0pfSl9LG9uRXJyb3I6ZnVuY3Rpb24oKXtyKGZ1bmN0aW9uKCl7by5vbihcImVycm9yXCIsZnVuY3Rpb24oZSl7bi4kZW1pdChcIiRjb3Jkb3ZhUHVzaFY1OmVycm9yT2NjdXJyZWRcIixlKX0pfSl9LHJlZ2lzdGVyOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiB2b2lkIDA9PT1vP24ucmVqZWN0KG5ldyBFcnJvcihcImluaXQgbXVzdCBiZSBjYWxsZWQgYmVmb3JlIGFueSBvdGhlciBvcGVyYXRpb25cIikpOm8ub24oXCJyZWdpc3RyYXRpb25cIixmdW5jdGlvbihlKXtuLnJlc29sdmUoZS5yZWdpc3RyYXRpb25JZCl9KSxuLnByb21pc2V9LHVucmVnaXN0ZXI6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIHZvaWQgMD09PW8/bi5yZWplY3QobmV3IEVycm9yKFwiaW5pdCBtdXN0IGJlIGNhbGxlZCBiZWZvcmUgYW55IG90aGVyIG9wZXJhdGlvblwiKSk6by51bnJlZ2lzdGVyKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9LGdldEJhZGdlTnVtYmVyOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiB2b2lkIDA9PT1vP24ucmVqZWN0KG5ldyBFcnJvcihcImluaXQgbXVzdCBiZSBjYWxsZWQgYmVmb3JlIGFueSBvdGhlciBvcGVyYXRpb25cIikpOm8uZ2V0QXBwbGljYXRpb25JY29uQmFkZ2VOdW1iZXIoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sc2V0QmFkZ2VOdW1iZXI6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiB2b2lkIDA9PT1vP3IucmVqZWN0KG5ldyBFcnJvcihcImluaXQgbXVzdCBiZSBjYWxsZWQgYmVmb3JlIGFueSBvdGhlciBvcGVyYXRpb25cIikpOm8uc2V0QXBwbGljYXRpb25JY29uQmFkZ2VOdW1iZXIoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbiksci5wcm9taXNlfSxmaW5pc2g6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIHZvaWQgMD09PW8/bi5yZWplY3QobmV3IEVycm9yKFwiaW5pdCBtdXN0IGJlIGNhbGxlZCBiZWZvcmUgYW55IG90aGVyIG9wZXJhdGlvblwiKSk6by5maW5pc2goZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMucmVjZW50c0NvbnRyb2xcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhUmVjZW50c1wiLGZ1bmN0aW9uKCl7cmV0dXJue3NldENvbG9yOmZ1bmN0aW9uKGUpe3JldHVybiBSZWNlbnRzQ29udHJvbC5zZXRDb2xvcihlKX0sc2V0RGVzY3JpcHRpb246ZnVuY3Rpb24oZSl7cmV0dXJuIFJlY2VudHNDb250cm9sLnNldERlc2NyaXB0aW9uKGUpfSxzZXRPcHRpb25zOmZ1bmN0aW9uKGUsbil7cmV0dXJuIFJlY2VudHNDb250cm9sLnNldE9wdGlvbnMoZSxuKX19fSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5zY3JlZW5zaG90XCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVNjcmVlbnNob3RcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntjYXB0dXJlVG9GaWxlOmZ1bmN0aW9uKG4pe3ZhciByPW58fHt9LG89ci5leHRlbnNpb258fFwianBnXCIsdD1yLnF1YWxpdHl8fFwiMTAwXCIsaT1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5zY3JlZW5zaG90PyhuYXZpZ2F0b3Iuc2NyZWVuc2hvdC5zYXZlKGZ1bmN0aW9uKGUsbil7ZT9pLnJlamVjdChlKTppLnJlc29sdmUobi5maWxlUGF0aCl9LG8sdCxyLmZpbGVuYW1lKSxpLnByb21pc2UpOihpLnJlc29sdmUobnVsbCksaS5wcm9taXNlKX0sY2FwdHVyZVRvVXJpOmZ1bmN0aW9uKG4pe3ZhciByPW58fHt9LG89ci5leHRlbnNpb258fFwianBnXCIsdD1yLnF1YWxpdHl8fFwiMTAwXCIsaT1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5zY3JlZW5zaG90PyhuYXZpZ2F0b3Iuc2NyZWVuc2hvdC5VUkkoZnVuY3Rpb24oZSxuKXtlP2kucmVqZWN0KGUpOmkucmVzb2x2ZShuLlVSSSl9LG8sdCxyLmZpbGVuYW1lKSxpLnByb21pc2UpOihpLnJlc29sdmUobnVsbCksaS5wcm9taXNlKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuc2VyaWFsXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVNlcmlhbFwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7dmFyIG49e307cmV0dXJuIG4ucmVxdWVzdFBlcm1pc3Npb249ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBzZXJpYWwucmVxdWVzdFBlcm1pc3Npb24obixmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sbi5vcGVuPWZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gc2VyaWFsLm9wZW4obixmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sbi53cml0ZT1mdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIHNlcmlhbC53cml0ZShuLGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxuLndyaXRlSGV4PWZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gc2VyaWFsLndyaXRlSGV4KG4sZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LG4ucmVhZD1mdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gc2VyaWFsLnJlYWQoZnVuY3Rpb24oZSl7dmFyIHI9bmV3IFVpbnQ4QXJyYXkoZSk7bi5yZXNvbHZlKHIpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sbi5yZWdpc3RlclJlYWRDYWxsYmFjaz1mdW5jdGlvbihlLG4pe3NlcmlhbC5yZWdpc3RlclJlYWRDYWxsYmFjayhmdW5jdGlvbihuKXt2YXIgcj1uZXcgVWludDhBcnJheShuKTtlKHIpfSxuKX0sbi5jbG9zZT1mdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gc2VyaWFsLmNsb3NlKGZ1bmN0aW9uKCl7bi5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxufV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuc21zXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVNtc1wiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue3NlbmQ6ZnVuY3Rpb24obixyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gc21zLnNlbmQobixyLG8sZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0pLHQucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuc29jaWFsU2hhcmluZ1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFTb2NpYWxTaGFyaW5nXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntzaGFyZTpmdW5jdGlvbihyLG8sdCxpKXt2YXIgYT1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCx0PXR8fG51bGwsaT1pfHxudWxsLG4ucGx1Z2lucy5zb2NpYWxzaGFyaW5nLnNoYXJlKHIsbyx0LGksZnVuY3Rpb24oKXthLnJlc29sdmUoITApfSxmdW5jdGlvbigpe2EucmVqZWN0KCExKX0pLGEucHJvbWlzZX0sc2hhcmVXaXRoT3B0aW9uczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5zb2NpYWxzaGFyaW5nLnNoYXJlV2l0aE9wdGlvbnMocixmdW5jdGlvbigpe28ucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoITEpfSksby5wcm9taXNlfSxzaGFyZVZpYVR3aXR0ZXI6ZnVuY3Rpb24ocixvLHQpe3ZhciBpPWUuZGVmZXIoKTtyZXR1cm4gbz1vfHxudWxsLHQ9dHx8bnVsbCxuLnBsdWdpbnMuc29jaWFsc2hhcmluZy5zaGFyZVZpYVR3aXR0ZXIocixvLHQsZnVuY3Rpb24oKXtpLnJlc29sdmUoITApfSxmdW5jdGlvbigpe2kucmVqZWN0KCExKX0pLGkucHJvbWlzZX0sc2hhcmVWaWFXaGF0c0FwcDpmdW5jdGlvbihyLG8sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsdD10fHxudWxsLG4ucGx1Z2lucy5zb2NpYWxzaGFyaW5nLnNoYXJlVmlhV2hhdHNBcHAocixvLHQsZnVuY3Rpb24oKXtpLnJlc29sdmUoITApfSxmdW5jdGlvbigpe2kucmVqZWN0KCExKX0pLGkucHJvbWlzZX0sc2hhcmVWaWFGYWNlYm9vazpmdW5jdGlvbihyLG8sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbz1vfHxudWxsLHQ9dHx8bnVsbCxuLnBsdWdpbnMuc29jaWFsc2hhcmluZy5zaGFyZVZpYUZhY2Vib29rKHIsbyx0LGZ1bmN0aW9uKCl7aS5yZXNvbHZlKCEwKX0sZnVuY3Rpb24oKXtpLnJlamVjdCghMSl9KSxpLnByb21pc2V9LHNoYXJlVmlhRmFjZWJvb2tXaXRoUGFzdGVNZXNzYWdlSGludDpmdW5jdGlvbihyLG8sdCxpKXt2YXIgYT1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCx0PXR8fG51bGwsbi5wbHVnaW5zLnNvY2lhbHNoYXJpbmcuc2hhcmVWaWFGYWNlYm9va1dpdGhQYXN0ZU1lc3NhZ2VIaW50KHIsbyx0LGksZnVuY3Rpb24oKXthLnJlc29sdmUoITApfSxmdW5jdGlvbigpe2EucmVqZWN0KCExKX0pLGEucHJvbWlzZX0sc2hhcmVWaWFTTVM6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5zb2NpYWxzaGFyaW5nLnNoYXJlVmlhU01TKHIsbyxmdW5jdGlvbigpe3QucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKCl7dC5yZWplY3QoITEpfSksdC5wcm9taXNlfSxzaGFyZVZpYUVtYWlsOmZ1bmN0aW9uKHIsbyx0LGksYSxjKXt2YXIgdT1lLmRlZmVyKCk7cmV0dXJuIHQ9dHx8bnVsbCxpPWl8fG51bGwsYT1hfHxudWxsLGM9Y3x8bnVsbCxuLnBsdWdpbnMuc29jaWFsc2hhcmluZy5zaGFyZVZpYUVtYWlsKHIsbyx0LGksYSxjLGZ1bmN0aW9uKCl7dS5yZXNvbHZlKCEwKX0sZnVuY3Rpb24oKXt1LnJlamVjdCghMSl9KSx1LnByb21pc2V9LHNoYXJlVmlhOmZ1bmN0aW9uKHIsbyx0LGksYSl7dmFyIGM9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsdD10fHxudWxsLGk9aXx8bnVsbCxhPWF8fG51bGwsbi5wbHVnaW5zLnNvY2lhbHNoYXJpbmcuc2hhcmVWaWEocixvLHQsaSxhLGZ1bmN0aW9uKCl7Yy5yZXNvbHZlKCEwKX0sZnVuY3Rpb24oKXtjLnJlamVjdCghMSl9KSxjLnByb21pc2V9LGNhblNoYXJlVmlhRW1haWw6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5zb2NpYWxzaGFyaW5nLmNhblNoYXJlVmlhRW1haWwoZnVuY3Rpb24oKXtyLnJlc29sdmUoITApfSxmdW5jdGlvbigpe3IucmVqZWN0KCExKX0pLHIucHJvbWlzZX0sY2FuU2hhcmVWaWE6ZnVuY3Rpb24ocixvLHQsaSxhKXt2YXIgYz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5zb2NpYWxzaGFyaW5nLmNhblNoYXJlVmlhKHIsbyx0LGksYSxmdW5jdGlvbihlKXtjLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2MucmVqZWN0KGUpfSksYy5wcm9taXNlfSxhdmFpbGFibGU6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIHdpbmRvdy5wbHVnaW5zLnNvY2lhbHNoYXJpbmcuYXZhaWxhYmxlKGZ1bmN0aW9uKGUpe2U/bi5yZXNvbHZlKCk6bi5yZWplY3QoKX0pLG4ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuc3Bpbm5lckRpYWxvZ1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFTcGlubmVyRGlhbG9nXCIsW1wiJHdpbmRvd1wiLGZ1bmN0aW9uKGUpe3JldHVybntzaG93OmZ1bmN0aW9uKG4scixvLHQpe3JldHVybiBvPW98fCExLGUucGx1Z2lucy5zcGlubmVyRGlhbG9nLnNob3cobixyLG8sdCl9LGhpZGU6ZnVuY3Rpb24oKXtyZXR1cm4gZS5wbHVnaW5zLnNwaW5uZXJEaWFsb2cuaGlkZSgpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5zcGxhc2hzY3JlZW5cIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhU3BsYXNoc2NyZWVuXCIsW2Z1bmN0aW9uKCl7cmV0dXJue2hpZGU6ZnVuY3Rpb24oKXtyZXR1cm4gbmF2aWdhdG9yLnNwbGFzaHNjcmVlbi5oaWRlKCl9LHNob3c6ZnVuY3Rpb24oKXtyZXR1cm4gbmF2aWdhdG9yLnNwbGFzaHNjcmVlbi5zaG93KCl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnNxbGl0ZVwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFTUUxpdGVcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue29wZW5EQjpmdW5jdGlvbihlLHIpe3JldHVybiBhbmd1bGFyLmlzT2JqZWN0KGUpJiYhYW5ndWxhci5pc1N0cmluZyhlKT8oXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHImJihlLmJnVHlwZT1yKSxuLnNxbGl0ZVBsdWdpbi5vcGVuRGF0YWJhc2UoZSkpOm4uc3FsaXRlUGx1Z2luLm9wZW5EYXRhYmFzZSh7bmFtZTplLGJnVHlwZTpyfSl9LGV4ZWN1dGU6ZnVuY3Rpb24obixyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi50cmFuc2FjdGlvbihmdW5jdGlvbihlKXtlLmV4ZWN1dGVTcWwocixvLGZ1bmN0aW9uKGUsbil7dC5yZXNvbHZlKG4pfSxmdW5jdGlvbihlLG4pe3QucmVqZWN0KG4pfSl9KSx0LnByb21pc2V9LGluc2VydENvbGxlY3Rpb246ZnVuY3Rpb24obixyLG8pe3ZhciB0PWUuZGVmZXIoKSxpPW8uc2xpY2UoMCk7cmV0dXJuIG4udHJhbnNhY3Rpb24oZnVuY3Rpb24oZSl7IWZ1bmN0aW9uIG4oKXt2YXIgbz1pLnNwbGljZSgwLDEpWzBdO3RyeXtlLmV4ZWN1dGVTcWwocixvLGZ1bmN0aW9uKGUscil7MD09PWkubGVuZ3RoP3QucmVzb2x2ZShyKTpuKCl9LGZ1bmN0aW9uKGUsbil7dC5yZWplY3Qobil9KX1jYXRjaChhKXt0LnJlamVjdChhKX19KCl9KSx0LnByb21pc2V9LG5lc3RlZEV4ZWN1dGU6ZnVuY3Rpb24obixyLG8sdCxpKXt2YXIgYT1lLmRlZmVyKCk7cmV0dXJuIG4udHJhbnNhY3Rpb24oZnVuY3Rpb24oZSl7ZS5leGVjdXRlU3FsKHIsdCxmdW5jdGlvbihlLG4pe2EucmVzb2x2ZShuKSxlLmV4ZWN1dGVTcWwobyxpLGZ1bmN0aW9uKGUsbil7YS5yZXNvbHZlKG4pfSl9KX0sZnVuY3Rpb24oZSxuKXthLnJlamVjdChuKX0pLGEucHJvbWlzZX0sZGVsZXRlREI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnNxbGl0ZVBsdWdpbi5kZWxldGVEYXRhYmFzZShyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnN0YXR1c2JhclwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFTdGF0dXNiYXJcIixbZnVuY3Rpb24oKXtyZXR1cm57b3ZlcmxheXNXZWJWaWV3OmZ1bmN0aW9uKGUpe3JldHVybiBTdGF0dXNCYXIub3ZlcmxheXNXZWJWaWV3KCEhZSl9LFNUWUxFUzp7REVGQVVMVDowLExJR0hUX0NPTlRFTlQ6MSxCTEFDS19UUkFOU0xVQ0VOVDoyLEJMQUNLX09QQVFVRTozfSxzdHlsZTpmdW5jdGlvbihlKXtzd2l0Y2goZSl7Y2FzZSAwOnJldHVybiBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7Y2FzZSAxOnJldHVybiBTdGF0dXNCYXIuc3R5bGVMaWdodENvbnRlbnQoKTtjYXNlIDI6cmV0dXJuIFN0YXR1c0Jhci5zdHlsZUJsYWNrVHJhbnNsdWNlbnQoKTtjYXNlIDM6cmV0dXJuIFN0YXR1c0Jhci5zdHlsZUJsYWNrT3BhcXVlKCk7ZGVmYXVsdDpyZXR1cm4gU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpfX0sc3R5bGVDb2xvcjpmdW5jdGlvbihlKXtyZXR1cm4gU3RhdHVzQmFyLmJhY2tncm91bmRDb2xvckJ5TmFtZShlKX0sc3R5bGVIZXg6ZnVuY3Rpb24oZSl7cmV0dXJuIFN0YXR1c0Jhci5iYWNrZ3JvdW5kQ29sb3JCeUhleFN0cmluZyhlKX0saGlkZTpmdW5jdGlvbigpe3JldHVybiBTdGF0dXNCYXIuaGlkZSgpfSxzaG93OmZ1bmN0aW9uKCl7cmV0dXJuIFN0YXR1c0Jhci5zaG93KCl9LGlzVmlzaWJsZTpmdW5jdGlvbigpe3JldHVybiBTdGF0dXNCYXIuaXNWaXNpYmxlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy50b2FzdFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFUb2FzdFwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57c2hvd1Nob3J0VG9wOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnRvYXN0LnNob3dTaG9ydFRvcChyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHNob3dTaG9ydENlbnRlcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy50b2FzdC5zaG93U2hvcnRDZW50ZXIocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxzaG93U2hvcnRCb3R0b206ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMudG9hc3Quc2hvd1Nob3J0Qm90dG9tKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sc2hvd0xvbmdUb3A6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMudG9hc3Quc2hvd0xvbmdUb3AocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxzaG93TG9uZ0NlbnRlcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy50b2FzdC5zaG93TG9uZ0NlbnRlcihyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHNob3dMb25nQm90dG9tOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnRvYXN0LnNob3dMb25nQm90dG9tKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sc2hvd1dpdGhPcHRpb25zOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnRvYXN0LnNob3dXaXRoT3B0aW9ucyhyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHNob3c6ZnVuY3Rpb24ocixvLHQpe3ZhciBpPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnRvYXN0LnNob3cocixvLHQsZnVuY3Rpb24oZSl7aS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtpLnJlamVjdChlKX0pLGkucHJvbWlzZX0saGlkZTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTt0cnl7bi5wbHVnaW5zLnRvYXN0LmhpZGUoKSxyLnJlc29sdmUoKX1jYXRjaChvKXtyLnJlamVjdChvJiZvLm1lc3NhZ2UpfXJldHVybiByLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnRvdWNoaWRcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhVG91Y2hJRFwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2NoZWNrU3VwcG9ydDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gd2luZG93LmNvcmRvdmE/dG91Y2hpZC5jaGVja1N1cHBvcnQoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pOm4ucmVqZWN0KFwiTm90IHN1cHBvcnRlZCB3aXRob3V0IGNvcmRvdmEuanNcIiksbi5wcm9taXNlfSxhdXRoZW50aWNhdGU6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiB3aW5kb3cuY29yZG92YT90b3VjaGlkLmF1dGhlbnRpY2F0ZShmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKTpyLnJlamVjdChcIk5vdCBzdXBwb3J0ZWQgd2l0aG91dCBjb3Jkb3ZhLmpzXCIpLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMudHRzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVRUU1wiLGZ1bmN0aW9uKCl7cmV0dXJue3NwZWFrOmZ1bmN0aW9uKGUsbixyKXtyZXR1cm4gVFRTLnNwZWFrKGUsbixyKX19fSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy51cHNQdXNoXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVVwc1B1c2hcIixbXCIkcVwiLFwiJHdpbmRvd1wiLFwiJHJvb3RTY29wZVwiLFwiJHRpbWVvdXRcIixmdW5jdGlvbihlLG4scixvKXtyZXR1cm57cmVnaXN0ZXI6ZnVuY3Rpb24odCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiBuLnB1c2gucmVnaXN0ZXIoZnVuY3Rpb24oZSl7byhmdW5jdGlvbigpe3IuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhVXBzUHVzaDpub3RpZmljYXRpb25SZWNlaXZlZFwiLGUpfSl9LGZ1bmN0aW9uKCl7aS5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe2kucmVqZWN0KGUpfSx0KSxpLnByb21pc2V9LHVucmVnaXN0ZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnB1c2gudW5yZWdpc3RlcihmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0sciksby5wcm9taXNlfSxzZXRCYWRnZU51bWJlcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucHVzaC5zZXRBcHBsaWNhdGlvbkljb25CYWRnZU51bWJlcihmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxyKSxvLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnZpYnJhdGlvblwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFWaWJyYXRpb25cIixbZnVuY3Rpb24oKXtyZXR1cm57dmlicmF0ZTpmdW5jdGlvbihlKXtyZXR1cm4gbmF2aWdhdG9yLm5vdGlmaWNhdGlvbi52aWJyYXRlKGUpfSx2aWJyYXRlV2l0aFBhdHRlcm46ZnVuY3Rpb24oZSxuKXtyZXR1cm4gbmF2aWdhdG9yLm5vdGlmaWNhdGlvbi52aWJyYXRlV2l0aFBhdHRlcm4oZSxuKX0sY2FuY2VsVmlicmF0aW9uOmZ1bmN0aW9uKCl7cmV0dXJuIG5hdmlnYXRvci5ub3RpZmljYXRpb24uY2FuY2VsVmlicmF0aW9uKCl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnZpZGVvQ2FwdHVyZVBsdXNcIixbXSkucHJvdmlkZXIoXCIkY29yZG92YVZpZGVvQ2FwdHVyZVBsdXNcIixbZnVuY3Rpb24oKXt2YXIgZT17fTt0aGlzLnNldExpbWl0PWZ1bmN0aW9uKG4pe2UubGltaXQ9bn0sdGhpcy5zZXRNYXhEdXJhdGlvbj1mdW5jdGlvbihuKXtlLmR1cmF0aW9uPW59LHRoaXMuc2V0SGlnaFF1YWxpdHk9ZnVuY3Rpb24obil7ZS5oaWdocXVhbGl0eT1ufSx0aGlzLnVzZUZyb250Q2FtZXJhPWZ1bmN0aW9uKG4pe2UuZnJvbnRjYW1lcmE9bn0sdGhpcy5zZXRQb3J0cmFpdE92ZXJsYXk9ZnVuY3Rpb24obil7ZS5wb3J0cmFpdE92ZXJsYXk9bn0sdGhpcy5zZXRMYW5kc2NhcGVPdmVybGF5PWZ1bmN0aW9uKG4pe2UubGFuZHNjYXBlT3ZlcmxheT1ufSx0aGlzLnNldE92ZXJsYXlUZXh0PWZ1bmN0aW9uKG4pe2Uub3ZlcmxheVRleHQ9bn0sdGhpcy4kZ2V0PVtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24obixyKXtyZXR1cm57Y2FwdHVyZVZpZGVvOmZ1bmN0aW9uKG8pe3ZhciB0PW4uZGVmZXIoKTtyZXR1cm4gci5wbHVnaW5zLnZpZGVvY2FwdHVyZXBsdXM/KHIucGx1Z2lucy52aWRlb2NhcHR1cmVwbHVzLmNhcHR1cmVWaWRlbyh0LnJlc29sdmUsdC5yZWplY3QsYW5ndWxhci5leHRlbmQoe30sZSxvKSksdC5wcm9taXNlKToodC5yZXNvbHZlKG51bGwpLHQucHJvbWlzZSl9fX1dfV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuemlwXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVppcFwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57dW56aXA6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4uemlwLnVuemlwKHIsbyxmdW5jdGlvbihlKXswPT09ZT90LnJlc29sdmUoKTp0LnJlamVjdCgpfSxmdW5jdGlvbihlKXt0Lm5vdGlmeShlKX0pLHQucHJvbWlzZX19fV0pfSgpOyIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJhZGRDaGlsZEN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgLy9iYWNrYnV0dG9uXG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxuICB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiYXNzaWduQ2hvcmVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIGFzc2lnbiBjaG9yZSBjb250cm9sbGVyXCJcblxufSlcbiIsIm1vZHVsZS5jb250cm9sbGVyKCdjYW1lcmFDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkY29yZG92YUNhbWVyYSkge1xuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkZXZpY2VyZWFkeVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAkY29yZG92YVBsdWdpbi5zb21lRnVuY3Rpb24oKS50aGVuKHN1Y2Nlc3MsIGVycm9yKTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICAvLyBPUiB3aXRoIElPTklDXG5cbiAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICRjb3Jkb3ZhUGx1Z2luLnNvbWVGdW5jdGlvbigpLnRoZW4oc3VjY2VzcywgZXJyb3IpO1xuICAgIH0pO1xuXG4gICRzY29wZS50YWtlUGljdHVyZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgcXVhbGl0eTogNTAsXG4gICAgICBkZXN0aW5hdGlvblR5cGU6IENhbWVyYS5EZXN0aW5hdGlvblR5cGUuREFUQV9VUkwsXG4gICAgICBzb3VyY2VUeXBlOiBDYW1lcmEuUGljdHVyZVNvdXJjZVR5cGUuQ0FNRVJBLFxuICAgICAgYWxsb3dFZGl0OiBmYWxzZSxcbiAgICAgIGVuY29kaW5nVHlwZTogQ2FtZXJhLkVuY29kaW5nVHlwZS5KUEVHLFxuICAgICAgdGFyZ2V0V2lkdGg6IDMwMCxcbiAgICAgIHRhcmdldEhlaWdodDogMzAwLFxuICAgICAgcG9wb3Zlck9wdGlvbnM6IENhbWVyYVBvcG92ZXJPcHRpb25zLFxuICAgICAgc2F2ZVRvUGhvdG9BbGJ1bTogZmFsc2UsXG5cdCAgICBjb3JyZWN0T3JpZW50YXRpb246dHJ1ZVxuICAgIH07XG5cbiAgICAkY29yZG92YUNhbWVyYS5nZXRQaWN0dXJlKG9wdGlvbnMpLnRoZW4oZnVuY3Rpb24oaW1hZ2VEYXRhKSB7XG4gICAgICAkc2NvcGUuaW1nVVJJID0gXCJkYXRhOmltYWdlL2pwZWc7YmFzZTY0LFwiICsgaW1hZ2VEYXRhO1xuICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgLy8gZXJyb3JcbiAgICB9KTtcblxuICB9O1xuICB9LCBmYWxzZSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiY2hpbGRCYW5rQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBiYW5rIGNvbnRyb2xsZXJcIlxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImNoaWxkSG9tZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCl7XG4gIC8vICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gIGNoaWxkIEhvbWUgY29udHJvbGxlclwiXG4gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgndGhlbWVNb2RhbC5odG1sJywge1xuICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAkc2NvcGUubW9kYWwgPSBtb2RhbDtcbiAgfSk7XG4gICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwuc2hvdygpO1xuICB9O1xuICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gIH07XG4gIC8vIENsZWFudXAgdGhlIG1vZGFsIHdoZW4gd2UncmUgZG9uZSB3aXRoIGl0IVxuICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5yZW1vdmUoKTtcbiAgfSk7XG4gIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIGhpZGUgbW9kYWxcbiAgJHNjb3BlLiRvbignbW9kYWwuaGlkZGVuJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgfSk7XG4gIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIHJlbW92ZSBtb2RhbFxuICAkc2NvcGUuJG9uKCdtb2RhbC5yZW1vdmVkJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgfSk7XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiY2hpbGRMb2dpbkN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkYXV0aCwgJHN0YXRlLCBjaGlsZExvZ2luU2VydmljZSl7XG4gIC8vICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIGNoaWxkIExvZ2luIGNvbnRyb2xsZXJcIlxuXG4gICAkc2NvcGUubG9naW4gPSBmdW5jdGlvbih1c2VyKXtcbiAgICAvLyAgY29uc29sZS5sb2codXNlcilcbiAgICAgY2hpbGRMb2dpblNlcnZpY2UudXNlckxvZ2luKHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgLy8gIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICRhdXRoLnNldFRva2VuKHJlc3BvbnNlKVxuICAgICAgICAgJHN0YXRlLmdvKCdjaGlsZEhvbWUnKVxuXG4gICAgIH0pXG4gICB9XG4gICAkc2NvcGUuYXV0aGVudGljYXRlID0gZnVuY3Rpb24ocHJvdmlkZXIpIHtcbiAgICRhdXRoLmF1dGhlbnRpY2F0ZShwcm92aWRlcil9O1xuICAgLy8gJHNjb3BlLnRlc3QgPSBcIkhlbGxvIGZyb20gbG9naW4gY29udHJvbGxlclwiXG4gICAkc2NvcGUucmV2ZWFsZXIgPSBmdW5jdGlvbigpe1xuICAgJHNjb3BlLmhpZGUgPSAhJHNjb3BlLmhpZGU7XG5cbiAgfVxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJlZGl0Q2hpbGRDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxuICB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiaGlzdG9yeUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gSGlzdG9yeSBjb250cm9sbGVyXCJcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJob21lQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsLHVzZXJTZXJ2aWNlKXtcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gSG9tZSBjb250cm9sbGVyXCJcbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnYmFubmVyTW9kYWwuaHRtbCcsIHtcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5tb2RhbCA9IG1vZGFsO1xuICAgfSk7XG4gICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgICRzY29wZS5tb2RhbC5zaG93KCk7XG4gICB9O1xuICAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcbiAgIH07XG4gICAvLyBDbGVhbnVwIHRoZSBtb2RhbCB3aGVuIHdlJ3JlIGRvbmUgd2l0aCBpdCFcbiAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICRzY29wZS5tb2RhbC5yZW1vdmUoKTtcbiAgIH0pO1xuICAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gaGlkZSBtb2RhbFxuICAgJHNjb3BlLiRvbignbW9kYWwuaGlkZGVuJywgZnVuY3Rpb24oKSB7XG4gICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gICB9KTtcbiAgIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIHJlbW92ZSBtb2RhbFxuICAgJHNjb3BlLiRvbignbW9kYWwucmVtb3ZlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAvLyBFeGVjdXRlIGFjdGlvblxuICAgfSk7XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwibG9naW5DdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGF1dGgsICRzdGF0ZSwgbG9naW5TZXJ2aWNlKXtcblxuJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24odXNlcil7XG4gIC8vIGNvbnNvbGUubG9nKHVzZXIpXG4gIGxvZ2luU2VydmljZS51c2VyTG9naW4odXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgJGF1dGguc2V0VG9rZW4ocmVzcG9uc2UpXG4gICAgICAkc3RhdGUuZ28oJ2hvbWUnKVxuXG4gIH0pXG59XG4kc2NvcGUubWFrZVVzZXIgPSBmdW5jdGlvbihuZXdVc2VyKXtcbiAgbG9naW5TZXJ2aWNlLm1ha2VVc2VyKG5ld1VzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICRhdXRoLnNldFRva2VuKHJlc3BvbnNlKVxuICAgICAgJHN0YXRlLmdvKCdob21lJylcbiAgfSlcbn1cbiAgJHNjb3BlLmF1dGhlbnRpY2F0ZSA9IGZ1bmN0aW9uKHByb3ZpZGVyKSB7XG4gICRhdXRoLmF1dGhlbnRpY2F0ZShwcm92aWRlcil9O1xuICAvLyAkc2NvcGUudGVzdCA9IFwiSGVsbG8gZnJvbSBsb2dpbiBjb250cm9sbGVyXCJcbiAgJHNjb3BlLnJldmVhbGVyID0gZnVuY3Rpb24oKXtcbiAgJHNjb3BlLmhpZGUgPSAhJHNjb3BlLmhpZGU7XG5cbiB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwibWFrZUNob3JlQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAkc2NvcGUuZ29iYWNrID0gZnVuY3Rpb24oKXtcbiAgICB3aW5kb3cuaGlzdG9yeS5nbygtMSlcbiAgfVxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcInNldFJld2FyZHNDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwpe1xuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3Jld2FyZE1vZGFsLmh0bWwnLCB7XG4gICAgc2NvcGU6ICRzY29wZSxcbiAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICRzY29wZS5tb2RhbCA9IG1vZGFsO1xuICB9KTtcbiAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5zaG93KCk7XG4gIH07XG4gICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcbiAgfTtcbiAgLy8gQ2xlYW51cCB0aGUgbW9kYWwgd2hlbiB3ZSdyZSBkb25lIHdpdGggaXQhXG4gICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuICB9KTtcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gaGlkZSBtb2RhbFxuICAkc2NvcGUuJG9uKCdtb2RhbC5oaWRkZW4nLCBmdW5jdGlvbigpIHtcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxuICB9KTtcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gcmVtb3ZlIG1vZGFsXG4gICRzY29wZS4kb24oJ21vZGFsLnJlbW92ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxuICB9KTtcbiAgLy9iYWNrYnV0dG9uXG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxuICB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwic2V0dGluZ3NDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwpe1xuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2NoYW5nZVBhc3N3b3JkLmh0bWwnLCB7XG4gICAgIGlkOiAnMScsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsMSA9IG1vZGFsO1xuICAgfSk7XG5cbiAgIC8vIE1vZGFsIDJcbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnY2hhbmdlSG91c2Vob2xkLmh0bWwnLCB7XG4gICAgIGlkOiAnMicsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsMiA9IG1vZGFsO1xuICAgfSk7XG5cbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnY2hhbmdlWmlwLmh0bWwnLCB7XG4gICAgIGlkOiAnMycsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsMyA9IG1vZGFsO1xuICAgfSk7XG5cbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnYWRkUGFyZW50Lmh0bWwnLCB7XG4gICAgIGlkOiAnNCcsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsNCA9IG1vZGFsO1xuICAgfSk7XG5cbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgncmVtb3ZlQ2hpbGQuaHRtbCcsIHtcbiAgICAgaWQ6ICc1JywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWw1ID0gbW9kYWw7XG4gICB9KTtcblxuXG5cbiAgICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICBpZiAoaW5kZXggPT0gMSkgJHNjb3BlLm9Nb2RhbDEuc2hvdygpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDIpICRzY29wZS5vTW9kYWwyLnNob3coKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSAzKSAkc2NvcGUub01vZGFsMy5zaG93KCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gNCkgJHNjb3BlLm9Nb2RhbDQuc2hvdygpO1xuICAgICBlbHNlICRzY29wZS5vTW9kYWw1LnNob3coKTtcbiAgIH07XG5cbiAgICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgaWYgKGluZGV4ID09IDEpICRzY29wZS5vTW9kYWwxLmhpZGUoKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSAyKSAkc2NvcGUub01vZGFsMi5oaWRlKCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMykgJHNjb3BlLm9Nb2RhbDMuaGlkZSgpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDQpICRzY29wZS5vTW9kYWw0LmhpZGUoKTtcbiAgICAgZWxzZSAkc2NvcGUub01vZGFsNS5oaWRlKCk7XG4gICB9O1xuXG4gICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAkc2NvcGUub01vZGFsMS5yZW1vdmUoKTtcbiAgICAgJHNjb3BlLm9Nb2RhbDIucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWwzLnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsNC5yZW1vdmUoKTtcbiAgICAgJHNjb3BlLm9Nb2RhbDUucmVtb3ZlKCk7XG4gICB9KTtcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJ0cmFja2VyQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsKXtcbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdwaWNDb25mTW9kYWwuaHRtbCcsIHtcbiAgICBzY29wZTogJHNjb3BlLFxuICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgJHNjb3BlLm1vZGFsID0gbW9kYWw7XG4gIH0pO1xuICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLnNob3coKTtcbiAgfTtcbiAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwuaGlkZSgpO1xuICB9O1xuICAvLyBDbGVhbnVwIHRoZSBtb2RhbCB3aGVuIHdlJ3JlIGRvbmUgd2l0aCBpdCFcbiAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwucmVtb3ZlKCk7XG4gIH0pO1xuICAvLyBFeGVjdXRlIGFjdGlvbiBvbiBoaWRlIG1vZGFsXG4gICRzY29wZS4kb24oJ21vZGFsLmhpZGRlbicsIGZ1bmN0aW9uKCkge1xuICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gIH0pO1xuICAvLyBFeGVjdXRlIGFjdGlvbiBvbiByZW1vdmUgbW9kYWxcbiAgJHNjb3BlLiRvbignbW9kYWwucmVtb3ZlZCcsIGZ1bmN0aW9uKCkge1xuICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gIH0pO1xuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcInVzZXJJbmZvQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBpbmZvIGNvbnRyb2xsZXJcIlxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuc2VydmljZSgnbG9naW5TZXJ2aWNlJywgZnVuY3Rpb24oJGh0dHApe1xuXG5cbiAgdGhpcy51c2VyTG9naW4gPSBmdW5jdGlvbih1c2VyKSB7XG4gICAgLy8gY29uc29sZS5sb2codXNlciwgXCJzZXJ2aWNlXCIpXG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB1cmw6ICcvYXV0aC9sb2dpbicsXG4gICAgICBkYXRhOiB1c2VyXG4gICAgfSlcbiAgfVxuICB0aGlzLm1ha2VVc2VyID0gZnVuY3Rpb24obmV3VXNlcikge1xuICAgIHJldHVybiAkaHR0cCh7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgdXJsOiAnL2F1dGgvc2lnbnVwJyxcbiAgICAgIGRhdGE6IG5ld1VzZXJcbiAgICB9KVxuICB9XG59KSAvLyBlbmQgb2Ygc2VydmljZVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuc2VydmljZSgndXNlclNlcnZpY2UnLCBmdW5jdGlvbigkaHR0cCwkcSwkYXV0aCl7XG5cblxudGhpcy5nZXRVc2VySW5mbyA9ICRhdXRoLmdldFBheWxvYWQoKTtcblxuY29uc29sZS5sb2codGhpcy5nZXRVc2VySW5mbyk7XG5cbmNvbnNvbGUubG9nKCdoZWxsbyBmcm9tIHNlcnZpY2UnKTtcblxuXG5cblxufSk7Ly9lbmQgb2Ygc2VydmljZVxuIl19
