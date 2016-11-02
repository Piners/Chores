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

angular.module('chore').controller("homeCtrl", function ($scope, $ionicModal, userService, $window, $auth) {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm5nLWNvcmRvdmEubWluLmpzIiwic2VydmljZS9jaG9yZVNlcnZpY2UuanMiLCJzZXJ2aWNlL2xvZ2luU2VydmljZS5qcyIsInNlcnZpY2UvdXNlclNlcnZpY2UuanMiLCJjb250cm9sbGVycy9hZGRDaGlsZEN0cmwuanMiLCJjb250cm9sbGVycy9hc3NpZ25DaG9yZUN0cmwuanMiLCJjb250cm9sbGVycy9jYW1lcmFDdHJsLmpzIiwiY29udHJvbGxlcnMvY2hpbGRCYW5rQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NoaWxkSG9tZUN0cmwuanMiLCJjb250cm9sbGVycy9jaGlsZExvZ2luQ3RybC5qcyIsImNvbnRyb2xsZXJzL2VkaXRDaGlsZEN0cmwuanMiLCJjb250cm9sbGVycy9oaXN0b3J5Q3RybC5qcyIsImNvbnRyb2xsZXJzL2hvbWVDdHJsLmpzIiwiY29udHJvbGxlcnMvbG9naW5DdHJsLmpzIiwiY29udHJvbGxlcnMvbWFrZUNob3JlQ3RybC5qcyIsImNvbnRyb2xsZXJzL3NldFJld2FyZHNDdHJsLmpzIiwiY29udHJvbGxlcnMvc2V0dGluZ3NDdHJsLmpzIiwiY29udHJvbGxlcnMvdHJhY2tlckN0cmwuanMiLCJjb250cm9sbGVycy91c2VySW5mb0N0cmwuanMiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsImNvbmZpZyIsIiRzdGF0ZVByb3ZpZGVyIiwiJHVybFJvdXRlclByb3ZpZGVyIiwiJGF1dGhQcm92aWRlciIsIm90aGVyd2lzZSIsInN0YXRlIiwidXJsIiwidGVtcGxhdGVVcmwiLCJjb250cm9sbGVyIiwiZmFjZWJvb2siLCJjbGllbnRJZCIsInJlc3BvbnNlVHlwZSIsImdvb2dsZSIsInJ1biIsIiRpb25pY1BsYXRmb3JtIiwicmVhZHkiLCJ3aW5kb3ciLCJjb3Jkb3ZhIiwicGx1Z2lucyIsIktleWJvYXJkIiwiaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyIiwiZGlzYWJsZVNjcm9sbCIsIlN0YXR1c0JhciIsInN0eWxlRGVmYXVsdCIsImZhY3RvcnkiLCJlIiwibiIsInIiLCJvIiwidHlwZSIsImlzQXZhaWxhYmxlIiwiZGVmZXIiLCJUaHJlZURlZVRvdWNoIiwicmVzb2x2ZSIsInJlamVjdCIsInByb21pc2UiLCJhZGRRdWlja0FjdGlvbiIsInQiLCJpIiwiYSIsImMiLCJ1IiwicyIsImwiLCJmIiwidGl0bGUiLCJzdWJ0aXRsZSIsImljb25UeXBlIiwiaWNvblRlbXBsYXRlIiwidGhlbiIsInB1c2giLCJjb25maWd1cmVRdWlja0FjdGlvbnMiLCJvbkhvbWVJY29uUHJlc3NlZCIsImFkZFF1aWNrQWN0aW9uSGFuZGxlciIsImVuYWJsZUxpbmtQcmV2aWV3IiwiYWRkRm9yY2VUb3VjaEhhbmRsZXIiLCJ3YXRjaEZvcmNlVG91Y2hlcyIsInNob3ciLCJhY3Rpb25zaGVldCIsImhpZGUiLCJjcmVhdGVCYW5uZXJWaWV3IiwiQWRNb2IiLCJjcmVhdGVJbnRlcnN0aXRpYWxWaWV3IiwicmVxdWVzdEFkIiwic2hvd0FkIiwicmVxdWVzdEludGVyc3RpdGlhbEFkIiwiY2hlY2siLCJhcHBBdmFpbGFiaWxpdHkiLCJwcm92aWRlciIsInNldFByZWZlcmVuY2VzIiwiaXNPYmplY3QiLCJBcHBSYXRlIiwicHJlZmVyZW5jZXMiLCJ1c2VMYW5ndWFnZSIsImxhbmd1YWdlIiwiZGlzcGxheUFwcE5hbWUiLCJhcHBOYW1lIiwicHJvbXB0QWdhaW5Gb3JFYWNoTmV3VmVyc2lvbiIsInByb21wdEZvck5ld1ZlcnNpb24iLCJvcGVuU3RvcmVJbkFwcCIsInVzZXNVbnRpbFByb21wdCIsInVzZUN1c3RvbVJhdGVEaWFsb2ciLCJzdG9yZUFwcFVSTCIsImlvcyIsImlvc1VSTCIsImFuZHJvaWQiLCJhbmRyb2lkVVJMIiwiYmxhY2tiZXJyeSIsImJsYWNrYmVycnlVUkwiLCJ3aW5kb3dzOCIsIndpbmRvd3NVUkwiLCJzZXRDdXN0b21Mb2NhbGUiLCJtZXNzYWdlIiwiY2FuY2VsQnV0dG9uTGFiZWwiLCJsYXRlckJ1dHRvbkxhYmVsIiwicmF0ZUJ1dHRvbkxhYmVsIiwiZXh0ZW5kIiwiY3VzdG9tTG9jYWxlIiwiJGdldCIsInByb21wdEZvclJhdGluZyIsIm5hdmlnYXRlVG9BcHBTdG9yZSIsIm9uQnV0dG9uQ2xpY2tlZCIsImNhbGxiYWNrcyIsImJpbmQiLCJvblJhdGVEaWFsb2dTaG93IiwiZ2V0QXBwTmFtZSIsImdldEFwcFZlcnNpb24iLCJnZXRQYWNrYWdlTmFtZSIsImdldFZlcnNpb25OdW1iZXIiLCJnZXRWZXJzaW9uQ29kZSIsImluaXQiLCJuYXZpZ2F0b3IiLCJnZW9sb2NhdGlvbiIsImdldEN1cnJlbnRQb3NpdGlvbiIsImNvbmZpZ3VyZSIsImJhY2tncm91bmRHZW9Mb2NhdGlvbiIsIm5vdGlmeSIsImZpbmlzaCIsInN0YXJ0Iiwic3RvcCIsImhhc1Blcm1pc3Npb24iLCJub3RpZmljYXRpb24iLCJiYWRnZSIsInByb21wdEZvclBlcm1pc3Npb24iLCJzZXQiLCJnZXQiLCJjbGVhciIsImluY3JlYXNlIiwiZGVjcmVhc2UiLCJzY2FuIiwiYmFyY29kZVNjYW5uZXIiLCJlbmNvZGUiLCIkYnJvYWRjYXN0IiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiYmF0dGVyeSIsImxvY2F0aW9uTWFuYWdlciIsIkRlbGVnYXRlIiwiZGlkRGV0ZXJtaW5lU3RhdGVGb3JSZWdpb24iLCJkaWRTdGFydE1vbml0b3JpbmdGb3JSZWdpb24iLCJkaWRFeGl0UmVnaW9uIiwiZGlkRW50ZXJSZWdpb24iLCJkaWRSYW5nZUJlYWNvbnNJblJlZ2lvbiIsInBlcmlwaGVyYWxNYW5hZ2VyRGlkU3RhcnRBZHZlcnRpc2luZyIsInBlcmlwaGVyYWxNYW5hZ2VyRGlkVXBkYXRlU3RhdGUiLCJkaWRDaGFuZ2VBdXRob3JpemF0aW9uU3RhdHVzIiwic2V0RGVsZWdhdGUiLCJzZXRDYWxsYmFja0RpZERldGVybWluZVN0YXRlRm9yUmVnaW9uIiwic2V0Q2FsbGJhY2tEaWRTdGFydE1vbml0b3JpbmdGb3JSZWdpb24iLCJzZXRDYWxsYmFja0RpZEV4aXRSZWdpb24iLCJzZXRDYWxsYmFja0RpZEVudGVyUmVnaW9uIiwic2V0Q2FsbGJhY2tEaWRSYW5nZUJlYWNvbnNJblJlZ2lvbiIsInNldENhbGxiYWNrUGVyaXBoZXJhbE1hbmFnZXJEaWRTdGFydEFkdmVydGlzaW5nIiwic2V0Q2FsbGJhY2tQZXJpcGhlcmFsTWFuYWdlckRpZFVwZGF0ZVN0YXRlIiwic2V0Q2FsbGJhY2tEaWRDaGFuZ2VBdXRob3JpemF0aW9uU3RhdHVzIiwiY3JlYXRlQmVhY29uUmVnaW9uIiwiQmVhY29uUmVnaW9uIiwiaXNCbHVldG9vdGhFbmFibGVkIiwid2hlbiIsImVuYWJsZUJsdWV0b290aCIsImRpc2FibGVCbHVldG9vdGgiLCJzdGFydE1vbml0b3JpbmdGb3JSZWdpb24iLCJzdG9wTW9uaXRvcmluZ0ZvclJlZ2lvbiIsInJlcXVlc3RTdGF0ZUZvclJlZ2lvbiIsInN0YXJ0UmFuZ2luZ0JlYWNvbnNJblJlZ2lvbiIsInN0b3BSYW5naW5nQmVhY29uc0luUmVnaW9uIiwiZ2V0QXV0aG9yaXphdGlvblN0YXR1cyIsInJlcXVlc3RXaGVuSW5Vc2VBdXRob3JpemF0aW9uIiwicmVxdWVzdEFsd2F5c0F1dGhvcml6YXRpb24iLCJnZXRNb25pdG9yZWRSZWdpb25zIiwiZ2V0UmFuZ2VkUmVnaW9ucyIsImlzUmFuZ2luZ0F2YWlsYWJsZSIsImlzTW9uaXRvcmluZ0F2YWlsYWJsZUZvckNsYXNzIiwic3RhcnRBZHZlcnRpc2luZyIsInN0b3BBZHZlcnRpc2luZyIsImlzQWR2ZXJ0aXNpbmdBdmFpbGFibGUiLCJpc0FkdmVydGlzaW5nIiwiZGlzYWJsZURlYnVnTG9ncyIsImVuYWJsZURlYnVnTm90aWZpY2F0aW9ucyIsImRpc2FibGVEZWJ1Z05vdGlmaWNhdGlvbnMiLCJlbmFibGVEZWJ1Z0xvZ3MiLCJhcHBlbmRUb0RldmljZUxvZyIsImJsZSIsInN0YXJ0U2NhbiIsInN0b3BTY2FuIiwiY29ubmVjdCIsImRpc2Nvbm5lY3QiLCJyZWFkIiwid3JpdGUiLCJ3cml0ZVdpdGhvdXRSZXNwb25zZSIsIndyaXRlQ29tbWFuZCIsIndhcm5pbmciLCJzdGFydE5vdGlmaWNhdGlvbiIsInN0b3BOb3RpZmljYXRpb24iLCJpc0Nvbm5lY3RlZCIsImVuYWJsZSIsImlzRW5hYmxlZCIsImJsdWV0b290aFNlcmlhbCIsImNvbm5lY3RJbnNlY3VyZSIsImxpc3QiLCJkaXNjb3ZlclVucGFpcmVkIiwic2V0RGV2aWNlRGlzY292ZXJlZExpc3RlbmVyIiwiY2xlYXJEZXZpY2VEaXNjb3ZlcmVkTGlzdGVuZXIiLCJzaG93Qmx1ZXRvb3RoU2V0dGluZ3MiLCJhdmFpbGFibGUiLCJyZWFkVW50aWwiLCJzdWJzY3JpYmUiLCJzdWJzY3JpYmVSYXdEYXRhIiwidW5zdWJzY3JpYmUiLCJ1bnN1YnNjcmliZVJhd0RhdGEiLCJyZWFkUlNTSSIsImJyaWdodG5lc3MiLCJnZXRCcmlnaHRuZXNzIiwic2V0QnJpZ2h0bmVzcyIsInNldEtlZXBTY3JlZW5PbiIsImNyZWF0ZUNhbGVuZGFyIiwiY2FsZW5kYXIiLCJnZXRDcmVhdGVDYWxlbmRhck9wdGlvbnMiLCJjYWxlbmRhck5hbWUiLCJkZWxldGVDYWxlbmRhciIsImNyZWF0ZUV2ZW50IiwibG9jYXRpb24iLCJub3RlcyIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJEYXRlIiwiY3JlYXRlRXZlbnRXaXRoT3B0aW9ucyIsImdldENhbGVuZGFyT3B0aW9ucyIsIk9iamVjdCIsImtleXMiLCJpbmRleE9mIiwiY3JlYXRlRXZlbnRJbnRlcmFjdGl2ZWx5IiwiY3JlYXRlRXZlbnRJbk5hbWVkQ2FsZW5kYXIiLCJmaW5kRXZlbnQiLCJsaXN0RXZlbnRzSW5SYW5nZSIsImxpc3RDYWxlbmRhcnMiLCJmaW5kQWxsRXZlbnRzSW5OYW1lZENhbGVuZGFyIiwibW9kaWZ5RXZlbnQiLCJuZXdUaXRsZSIsIm5ld0xvY2F0aW9uIiwibmV3Tm90ZXMiLCJuZXdTdGFydERhdGUiLCJuZXdFbmREYXRlIiwiZGVsZXRlRXZlbnQiLCJnZXRQaWN0dXJlIiwiY2FtZXJhIiwiY2xlYW51cCIsImNhcHR1cmVBdWRpbyIsImRldmljZSIsImNhcHR1cmUiLCJjYXB0dXJlSW1hZ2UiLCJjYXB0dXJlVmlkZW8iLCJleHBpcnkiLCJjdnYiLCJ6aXAiLCJzdXBwcmVzc01hbnVhbCIsInN1cHByZXNzQ29uZmlybSIsImhpZGVMb2dvIiwic2V0Q2FyZElPUmVzcG9uc2VGaWVsZHMiLCJpc0FycmF5Iiwic2V0U2NhbmVyQ29uZmlnIiwic2NhbkNhcmQiLCJDYXJkSU8iLCJsZW5ndGgiLCJTdHJpbmciLCJleHBpcnlfeWVhciIsInN1YnN0ciIsImNvcHkiLCJjbGlwYm9hcmQiLCJwYXN0ZSIsInNhdmUiLCJjb250YWN0cyIsImNyZWF0ZSIsInJlbW92ZSIsImNsb25lIiwiZmluZCIsImZpZWxkcyIsInBpY2tDb250YWN0IiwiZGF0ZSIsIm1vZGUiLCJkYXRlUGlja2VyIiwiZ2V0RGV2aWNlIiwiZ2V0Q29yZG92YSIsImdldE1vZGVsIiwibW9kZWwiLCJnZXROYW1lIiwibmFtZSIsImdldFBsYXRmb3JtIiwicGxhdGZvcm0iLCJnZXRVVUlEIiwidXVpZCIsImdldFZlcnNpb24iLCJ2ZXJzaW9uIiwiZ2V0TWFudWZhY3R1cmVyIiwibWFudWZhY3R1cmVyIiwiZ2V0Q3VycmVudEFjY2VsZXJhdGlvbiIsImlzVW5kZWZpbmVkIiwiYWNjZWxlcm9tZXRlciIsImlzRnVuY3Rpb24iLCJ3YXRjaEFjY2VsZXJhdGlvbiIsImNhbmNlbCIsImNsZWFyV2F0Y2giLCJ3YXRjaElEIiwiZnJlcXVlbmN5IiwiZ2V0Q3VycmVudEhlYWRpbmciLCJjb21wYXNzIiwid2F0Y2hIZWFkaW5nIiwiYWxlcnQiLCJjb25maXJtIiwicHJvbXB0IiwiaW5wdXQxIiwiYnV0dG9uSW5kZXgiLCJiZWVwIiwiYWN0aXZpdHlTdGFydCIsInBsYXRmb3JtSWQiLCJhY3Rpdml0eVN0b3AiLCJwcm9ncmVzc1N0YXJ0IiwicHJvZ3Jlc3NTdG9wIiwicHJvZ3Jlc3NWYWx1ZSIsImVtYWlsIiwib3BlbiIsImFkZEFsaWFzIiwiYnJvd3NlckluaXQiLCJhcHBJRCIsImFwcFZlcnNpb24iLCJmYWNlYm9va0Nvbm5lY3RQbHVnaW4iLCJsb2dpbiIsInNob3dEaWFsb2ciLCJhcGkiLCJnZXRBY2Nlc3NUb2tlbiIsImdldExvZ2luU3RhdHVzIiwibG9nb3V0Iiwic2V0T3B0aW9ucyIsIkZhY2Vib29rQWRzIiwiY3JlYXRlQmFubmVyIiwicmVtb3ZlQmFubmVyIiwic2hvd0Jhbm5lciIsInNob3dCYW5uZXJBdFhZIiwiaGlkZUJhbm5lciIsInByZXBhcmVJbnRlcnN0aXRpYWwiLCJzaG93SW50ZXJzdGl0aWFsIiwiY29uc3RhbnQiLCJnZXRGcmVlRGlza1NwYWNlIiwiZXhlYyIsImNoZWNrRGlyIiwidGVzdCIsInJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwiLCJpc0RpcmVjdG9yeSIsImNvZGUiLCJjaGVja0ZpbGUiLCJpc0ZpbGUiLCJjcmVhdGVEaXIiLCJleGNsdXNpdmUiLCJnZXREaXJlY3RvcnkiLCJjcmVhdGVGaWxlIiwiZ2V0RmlsZSIsInJlbW92ZURpciIsInN1Y2Nlc3MiLCJmaWxlUmVtb3ZlZCIsInJlbW92ZUZpbGUiLCJyZW1vdmVSZWN1cnNpdmVseSIsIndyaXRlRmlsZSIsImNyZWF0ZVdyaXRlciIsImFwcGVuZCIsInNlZWsiLCJ0cnVuY2F0ZSIsIm9ud3JpdGVlbmQiLCJlcnJvciIsImFib3J0Iiwid3JpdGVFeGlzdGluZ0ZpbGUiLCJyZWFkQXNUZXh0IiwiZmlsZSIsIkZpbGVSZWFkZXIiLCJvbmxvYWRlbmQiLCJ0YXJnZXQiLCJyZXN1bHQiLCJyZWFkQXNEYXRhVVJMIiwicmVhZEFzQmluYXJ5U3RyaW5nIiwicmVhZEFzQXJyYXlCdWZmZXIiLCJtb3ZlRmlsZSIsIm1vdmVUbyIsIm1vdmVEaXIiLCJjb3B5RGlyIiwiY29weVRvIiwiY29weUZpbGUiLCJyZWFkRmlsZU1ldGFkYXRhIiwiZmlsZU9wZW5lcjIiLCJ1bmluc3RhbGwiLCJhcHBJc0luc3RhbGxlZCIsImRvd25sb2FkIiwiRmlsZVRyYW5zZmVyIiwiZW5jb2RlVVJJIiwidGltZW91dCIsIm9ucHJvZ3Jlc3MiLCJ1cGxvYWQiLCJmbGFzaGxpZ2h0Iiwic3dpdGNoT24iLCJzd2l0Y2hPZmYiLCJ0b2dnbGUiLCJGbHVycnlBZHMiLCJnYVBsdWdpbiIsInRyYWNrRXZlbnQiLCJ0cmFja1BhZ2UiLCJzZXRWYXJpYWJsZSIsImV4aXQiLCJ3YXRjaFBvc2l0aW9uIiwiZ2V0UHJlZmVycmVkTGFuZ3VhZ2UiLCJnbG9iYWxpemF0aW9uIiwiZ2V0TG9jYWxlTmFtZSIsImdldEZpcnN0RGF5T2ZXZWVrIiwiZGF0ZVRvU3RyaW5nIiwic3RyaW5nVG9EYXRlIiwiZ2V0RGF0ZVBhdHRlcm4iLCJnZXREYXRlTmFtZXMiLCJpc0RheUxpZ2h0U2F2aW5nc1RpbWUiLCJudW1iZXJUb1N0cmluZyIsInN0cmluZ1RvTnVtYmVyIiwiZ2V0TnVtYmVyUGF0dGVybiIsImdldEN1cnJlbmN5UGF0dGVybiIsInN0YXJ0VHJhY2tlcldpdGhJZCIsImFuYWx5dGljcyIsInNldFVzZXJJZCIsImRlYnVnTW9kZSIsInRyYWNrVmlldyIsImFkZEN1c3RvbURpbWVuc2lvbiIsInBhcnNlSW50IiwiaXNOYU4iLCJ0cmFja0V4Y2VwdGlvbiIsInRyYWNrVGltaW5nIiwiYWRkVHJhbnNhY3Rpb24iLCJhZGRUcmFuc2FjdGlvbkl0ZW0iLCJnZXRNYXAiLCJwbHVnaW4iLCJtYXBzIiwiZ2V0RWxlbWVudEJ5SWQiLCJNYXAiLCJzZXREaXYiLCJpc01hcExvYWRlZCIsImFkZE1hcmtlciIsImdldE1hcFR5cGVJZHMiLCJtYXBUeXBlSWQiLCJzZXRWaXNpYmxlIiwiYXV0aCIsImdvb2dsZXBsYXlnYW1lIiwic2lnbm91dCIsImlzU2lnbmVkSW4iLCJzaG93UGxheWVyIiwic3VibWl0U2NvcmUiLCJzaG93QWxsTGVhZGVyYm9hcmRzIiwic2hvd0xlYWRlcmJvYXJkIiwidW5sb2NrQWNoaWV2ZW1lbnQiLCJpbmNyZW1lbnRBY2hpZXZlbWVudCIsInNob3dBY2hpZXZlbWVudHMiLCJnb29nbGVwbHVzIiwiaU9TQXBpS2V5Iiwic2lsZW50TG9naW4iLCJ0cnlTaWxlbnRMb2dpbiIsImhlYWx0aGtpdCIsImNoZWNrQXV0aFN0YXR1cyIsInJlcXVlc3RBdXRob3JpemF0aW9uIiwicmVhZFR5cGVzIiwid3JpdGVUeXBlcyIsInJlYWREYXRlT2ZCaXJ0aCIsInJlYWRHZW5kZXIiLCJzYXZlV2VpZ2h0IiwidW5pdCIsImFtb3VudCIsInJlYWRXZWlnaHQiLCJzYXZlSGVpZ2h0IiwicmVhZEhlaWdodCIsImZpbmRXb3Jrb3V0cyIsInNhdmVXb3Jrb3V0IiwicXVlcnlTYW1wbGVUeXBlIiwic3RhcnRTZXJ2ZXIiLCJDb3JIdHRwZCIsInN0b3BTZXJ2ZXIiLCJnZXRVUkwiLCJnZXRMb2NhbFBhdGgiLCJpQWQiLCJnZXRQaWN0dXJlcyIsImltYWdlUGlja2VyIiwiZGVmYXVsdE9wdGlvbnMiLCJzZXREZWZhdWx0T3B0aW9ucyIsImZvckVhY2giLCJkIiwiam9pbiIsImNsb3NlIiwiZXhlY3V0ZVNjcmlwdCIsImluc2VydENTUyIsImtlZXBBd2FrZSIsImluc29tbmlhIiwiYWxsb3dTbGVlcEFnYWluIiwic2hhcmUiLCJJbnN0YWdyYW0iLCJpbWFnZSIsImNhcHRpb24iLCJjb25zb2xlIiwiaXNJbnN0YWxsZWQiLCIkZXZhbEFzeW5jIiwiaGlkZUFjY2Vzc29yeUJhciIsImlzVmlzaWJsZSIsImNsZWFyU2hvd1dhdGNoIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIiQkbGlzdGVuZXJzIiwiY2xlYXJIaWRlV2F0Y2giLCJnZXRGb3JLZXkiLCJLZXljaGFpbiIsInNldEZvcktleSIsInJlbW92ZUZvcktleSIsIm5hdmlnYXRlIiwibGF1bmNobmF2aWdhdG9yIiwibG9jYWwiLCJvbiIsInNjaGVkdWxlIiwiYWRkIiwid2FybiIsInVwZGF0ZSIsImNsZWFyQWxsIiwiY2FuY2VsQWxsIiwiaXNQcmVzZW50IiwiaXNTY2hlZHVsZWQiLCJpc1RyaWdnZXJlZCIsInJlZ2lzdGVyUGVybWlzc2lvbiIsImdldEFsbElkcyIsImdldElkcyIsImdldFNjaGVkdWxlZElkcyIsImdldFRyaWdnZXJlZElkcyIsImdldEFsbCIsImdldFNjaGVkdWxlZCIsImdldEFsbFNjaGVkdWxlZCIsImdldFRyaWdnZXJlZCIsImdldEFsbFRyaWdnZXJlZCIsImdldERlZmF1bHRzIiwic2V0RGVmYXVsdHMiLCJtTWVkaWEiLCJzZXJ2aWNlIiwiaXNEZWZpbmVkIiwiZ2V0RHVyYXRpb24iLCJkdXJhdGlvbiIsImxvZyIsInBvc2l0aW9uIiwibWVkaWEiLCJNZWRpYSIsInN0YXR1cyIsInByb3RvdHlwZSIsInBsYXkiLCJwYXVzZSIsInJlbGVhc2UiLCJzZWVrVG8iLCJzZXRWb2x1bWUiLCJzdGFydFJlY29yZCIsInN0b3BSZWNvcmQiLCJjdXJyZW50VGltZSIsIm5ld01lZGlhIiwiTW9iRm94IiwiTW9QdWIiLCJwcmVsb2FkU2ltcGxlIiwiTmF0aXZlQXVkaW8iLCJwcmVsb2FkQ29tcGxleCIsImxvb3AiLCJ1bmxvYWQiLCJzZXRWb2x1bWVGb3JDb21wbGV4QXNzZXQiLCJjb25uZWN0aW9uIiwiZ2V0TmV0d29yayIsImlzT25saW5lIiwiQ29ubmVjdGlvbiIsIlVOS05PV04iLCJOT05FIiwiaXNPZmZsaW5lIiwiY2xlYXJPZmZsaW5lV2F0Y2giLCJjbGVhck9ubGluZVdhdGNoIiwicGluRGlhbG9nIiwicGx1Z2luTm90RW5hYmxlZE1lc3NhZ2UiLCJkZWNvcmF0ZVByb21pc2UiLCJzdG9yZSIsIkVycm9yIiwiYXJndW1lbnRzIiwiYXBwUHJlZmVyZW5jZXMiLCJmZXRjaCIsInByaW50ZXIiLCJwcmludCIsIlByb2dyZXNzSW5kaWNhdG9yIiwic2hvd1NpbXBsZSIsInNob3dTaW1wbGVXaXRoTGFiZWwiLCJzaG93U2ltcGxlV2l0aExhYmVsRGV0YWlsIiwic2hvd0RldGVybWluYXRlIiwic2hvd0RldGVybWluYXRlV2l0aExhYmVsIiwic2hvd0FubnVsYXIiLCJzaG93QW5udWxhcldpdGhMYWJlbCIsInNob3dCYXIiLCJzaG93QmFyV2l0aExhYmVsIiwic2hvd1N1Y2Nlc3MiLCJzaG93VGV4dCIsIm9uTm90aWZpY2F0aW9uIiwicmVnaXN0ZXIiLCJlY2IiLCJxdWVyeVNlbGVjdG9yIiwicHVzaE5vdGlmaWNhdGlvbiIsInVucmVnaXN0ZXIiLCJzZXRCYWRnZU51bWJlciIsInNldEFwcGxpY2F0aW9uSWNvbkJhZGdlTnVtYmVyIiwiaW5pdGlhbGl6ZSIsIlB1c2hOb3RpZmljYXRpb24iLCIkZW1pdCIsIm9uRXJyb3IiLCJyZWdpc3RyYXRpb25JZCIsImdldEJhZGdlTnVtYmVyIiwiZ2V0QXBwbGljYXRpb25JY29uQmFkZ2VOdW1iZXIiLCJzZXRDb2xvciIsIlJlY2VudHNDb250cm9sIiwic2V0RGVzY3JpcHRpb24iLCJjYXB0dXJlVG9GaWxlIiwiZXh0ZW5zaW9uIiwicXVhbGl0eSIsInNjcmVlbnNob3QiLCJmaWxlUGF0aCIsImZpbGVuYW1lIiwiY2FwdHVyZVRvVXJpIiwiVVJJIiwicmVxdWVzdFBlcm1pc3Npb24iLCJzZXJpYWwiLCJ3cml0ZUhleCIsIlVpbnQ4QXJyYXkiLCJyZWdpc3RlclJlYWRDYWxsYmFjayIsInNlbmQiLCJzbXMiLCJzb2NpYWxzaGFyaW5nIiwic2hhcmVXaXRoT3B0aW9ucyIsInNoYXJlVmlhVHdpdHRlciIsInNoYXJlVmlhV2hhdHNBcHAiLCJzaGFyZVZpYUZhY2Vib29rIiwic2hhcmVWaWFGYWNlYm9va1dpdGhQYXN0ZU1lc3NhZ2VIaW50Iiwic2hhcmVWaWFTTVMiLCJzaGFyZVZpYUVtYWlsIiwic2hhcmVWaWEiLCJjYW5TaGFyZVZpYUVtYWlsIiwiY2FuU2hhcmVWaWEiLCJzcGlubmVyRGlhbG9nIiwic3BsYXNoc2NyZWVuIiwib3BlbkRCIiwiaXNTdHJpbmciLCJiZ1R5cGUiLCJzcWxpdGVQbHVnaW4iLCJvcGVuRGF0YWJhc2UiLCJleGVjdXRlIiwidHJhbnNhY3Rpb24iLCJleGVjdXRlU3FsIiwiaW5zZXJ0Q29sbGVjdGlvbiIsInNsaWNlIiwic3BsaWNlIiwibmVzdGVkRXhlY3V0ZSIsImRlbGV0ZURCIiwiZGVsZXRlRGF0YWJhc2UiLCJvdmVybGF5c1dlYlZpZXciLCJTVFlMRVMiLCJERUZBVUxUIiwiTElHSFRfQ09OVEVOVCIsIkJMQUNLX1RSQU5TTFVDRU5UIiwiQkxBQ0tfT1BBUVVFIiwic3R5bGUiLCJzdHlsZUxpZ2h0Q29udGVudCIsInN0eWxlQmxhY2tUcmFuc2x1Y2VudCIsInN0eWxlQmxhY2tPcGFxdWUiLCJzdHlsZUNvbG9yIiwiYmFja2dyb3VuZENvbG9yQnlOYW1lIiwic3R5bGVIZXgiLCJiYWNrZ3JvdW5kQ29sb3JCeUhleFN0cmluZyIsInNob3dTaG9ydFRvcCIsInRvYXN0Iiwic2hvd1Nob3J0Q2VudGVyIiwic2hvd1Nob3J0Qm90dG9tIiwic2hvd0xvbmdUb3AiLCJzaG93TG9uZ0NlbnRlciIsInNob3dMb25nQm90dG9tIiwic2hvd1dpdGhPcHRpb25zIiwiY2hlY2tTdXBwb3J0IiwidG91Y2hpZCIsImF1dGhlbnRpY2F0ZSIsInNwZWFrIiwiVFRTIiwidmlicmF0ZSIsInZpYnJhdGVXaXRoUGF0dGVybiIsImNhbmNlbFZpYnJhdGlvbiIsInNldExpbWl0IiwibGltaXQiLCJzZXRNYXhEdXJhdGlvbiIsInNldEhpZ2hRdWFsaXR5IiwiaGlnaHF1YWxpdHkiLCJ1c2VGcm9udENhbWVyYSIsImZyb250Y2FtZXJhIiwic2V0UG9ydHJhaXRPdmVybGF5IiwicG9ydHJhaXRPdmVybGF5Iiwic2V0TGFuZHNjYXBlT3ZlcmxheSIsImxhbmRzY2FwZU92ZXJsYXkiLCJzZXRPdmVybGF5VGV4dCIsIm92ZXJsYXlUZXh0IiwidmlkZW9jYXB0dXJlcGx1cyIsInVuemlwIiwiJGh0dHAiLCIkcSIsIiRhdXRoIiwiZ2V0VXNlckluZm8iLCJnZXRQYXlsb2FkIiwiZ2V0RGVmYXVsdENob3JlcyIsIm1ldGhvZCIsInVzZXJMb2dpbiIsInVzZXIiLCJkYXRhIiwibWFrZVVzZXIiLCJuZXdVc2VyIiwiYmFubmVyIiwicG9zdGJhbm5lciIsInVzZXJfYmFubmVyX2ltYWdlIiwidXNlcl9ob3VzZWhvbGQiLCJKU09OIiwic3RyaW5naWZ5IiwiZ2V0YmFubmVyIiwidXNlcklkIiwiZ2V0V2VhdGhlciIsImFkZENoaWxkIiwiY2hpbGQiLCIkc2NvcGUiLCJ1c2VyU2VydmljZSIsIiRzdGF0ZSIsImdvYmFjayIsImhpc3RvcnkiLCJnbyIsInN1YiIsInN1Ym1pdENoaWxkIiwicmVzIiwiY2hvcmVTZXJ2aWNlIiwiY3VycmVudFVzZXIiLCJjaG9yZXMiLCIkY29yZG92YUNhbWVyYSIsIiRjb3Jkb3ZhUGx1Z2luIiwic29tZUZ1bmN0aW9uIiwidGFrZVBpY3R1cmUiLCJvcHRpb25zIiwiZGVzdGluYXRpb25UeXBlIiwiQ2FtZXJhIiwiRGVzdGluYXRpb25UeXBlIiwiREFUQV9VUkwiLCJzb3VyY2VUeXBlIiwiUGljdHVyZVNvdXJjZVR5cGUiLCJDQU1FUkEiLCJhbGxvd0VkaXQiLCJlbmNvZGluZ1R5cGUiLCJFbmNvZGluZ1R5cGUiLCJKUEVHIiwidGFyZ2V0V2lkdGgiLCJ0YXJnZXRIZWlnaHQiLCJwb3BvdmVyT3B0aW9ucyIsIkNhbWVyYVBvcG92ZXJPcHRpb25zIiwic2F2ZVRvUGhvdG9BbGJ1bSIsImNvcnJlY3RPcmllbnRhdGlvbiIsImltYWdlRGF0YSIsImltZ1VSSSIsImVyciIsInRoZW1lIiwic2V0VGhlbWUiLCJ0aGVtZUltYWdlIiwiJGlvbmljTW9kYWwiLCJ1c2VyVG9rZW4iLCJmcm9tVGVtcGxhdGVVcmwiLCJpZCIsInNjb3BlIiwiYmFja2Ryb3BDbGlja1RvQ2xvc2UiLCJhbmltYXRpb24iLCJtb2RhbCIsIm9Nb2RhbDEiLCJvcGVuTW9kYWwiLCJpbmRleCIsIm9Nb2RhbDIiLCJjbG9zZU1vZGFsIiwiJG9uIiwidXNlcl90aGVtZSIsImNob2ljZSIsImxvZ2luU2VydmljZSIsImxvZ2luQ2hpbGQiLCJyZXNwb25zZSIsInNldFRva2VuIiwiJHdpbmRvdyIsInN1Ym1pdEJhbm5lciIsImJhbm5lckluZm8iLCJ2YWx1ZSIsInJlbG9hZCIsImhvdXNlaG9sZCIsIndlYXRoZXIiLCJyZXZlYWxlciIsIm9Nb2RhbDMiLCJvTW9kYWw0Iiwib01vZGFsNSJd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YyBTdGFydGVyIEFwcFxuXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xuLy8gJ3N0YXJ0ZXInIGlzIHRoZSBuYW1lIG9mIHRoaXMgYW5ndWxhciBtb2R1bGUgZXhhbXBsZSAoYWxzbyBzZXQgaW4gYSA8Ym9keT4gYXR0cmlidXRlIGluIGluZGV4Lmh0bWwpXG4vLyB0aGUgMm5kIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvZiAncmVxdWlyZXMnXG5cbmFuZ3VsYXIubW9kdWxlKCdjaG9yZScsIFsnaW9uaWMnLCAnc2F0ZWxsaXplciddKVxuLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkYXV0aFByb3ZpZGVyKXtcbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShcIi9jaGlsZC9ob21lXCIpO1xuICAkc3RhdGVQcm92aWRlclxuICAuc3RhdGUoJ2FkZENoaWxkJyx7XG4gICAgdXJsOlwiL2FkZENoaWxkXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvYWRkQ2hpbGQuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiYWRkQ2hpbGRDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCdhc3NpZ25DaG9yZScse1xuICAgIHVybDpcIi9hc3NpZ25DaG9yZVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2Fzc2lnbkNob3JlLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImFzc2lnbkNob3JlQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnZWRpdENoaWxkJyx7XG4gICAgdXJsOlwiL2VkaXRDaGlsZC86aWRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9lZGl0Q2hpbGQuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwiZWRpdENoaWxkQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnaGlzdG9yeScse1xuICAgIHVybDpcIi9oaXN0b3J5XCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvaGlzdG9yeS5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJoaXN0b3J5Q3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnaG9tZScse1xuICAgIHVybDpcIi9ob21lXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvaG9tZS5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJob21lQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnbG9naW4nLHtcbiAgICB1cmw6XCIvbG9naW5cIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9Mb2dpbi5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJsb2dpbkN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ21ha2VDaG9yZScse1xuICAgIHVybDpcIi9tYWtlQ2hvcmVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9tYWtlQ2hvcmUuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwibWFrZUNob3JlQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgnc2V0UmV3YXJkcycse1xuICAgIHVybDpcIi9zZXRSZXdhcmRzLzppZFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL3NldFJld2FyZHMuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwic2V0UmV3YXJkc0N0cmxcIlxuICB9KVxuICAuc3RhdGUoJ3NldHRpbmdzJyx7XG4gICAgdXJsOlwiL3NldHRpbmdzXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvc2V0dGluZ3MuaHRtbFwiLFxuICAgIGNvbnRyb2xsZXI6IFwic2V0dGluZ3NDdHJsXCJcbiAgfSlcbiAgLnN0YXRlKCd0cmFja2VyJyx7XG4gICAgdXJsOlwiL3RyYWNrZXIvOmlkXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvdHJhY2tlci5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJ0cmFja2VyQ3RybFwiXG4gIH0pXG4gIC5zdGF0ZSgndXNlckluZm8nLHtcbiAgICB1cmw6XCIvdXNlckluZm9cIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy91c2VySW5mby5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJ1c2VySW5mb0N0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2NoaWxkQmFuaycse1xuICAgIHVybDpcIi9jaGlsZC9iYW5rXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvY2hpbGRCYW5rLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImNoaWxkQmFua0N0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2NoaWxkSG9tZScse1xuICAgIHVybDpcIi9jaGlsZC9ob21lXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvY2hpbGRIb21lLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImNoaWxkSG9tZUN0cmxcIlxuICB9KVxuICAuc3RhdGUoJ2NoaWxkTG9naW4nLHtcbiAgICB1cmw6XCIvY2hpbGQvbG9naW5cIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9jaGlsZExvZ2luLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcImNoaWxkTG9naW5DdHJsXCJcbiAgfSlcblxuICAkYXV0aFByb3ZpZGVyLmZhY2Vib29rKHtcbiAgICBjbGllbnRJZDogJzMzMjI3MjA1NzEzMjY4MSdcbiAgfSk7XG5cbiAgLy8gT3B0aW9uYWw6IEZvciBjbGllbnQtc2lkZSB1c2UgKEltcGxpY2l0IEdyYW50KSwgc2V0IHJlc3BvbnNlVHlwZSB0byAndG9rZW4nIChkZWZhdWx0OiAnY29kZScpXG4gICRhdXRoUHJvdmlkZXIuZmFjZWJvb2soe1xuICAgIGNsaWVudElkOiAnMzMyMjcyMDU3MTMyNjgxJyxcbiAgICByZXNwb25zZVR5cGU6ICd0b2tlbidcbiAgfSk7XG5cbiAgJGF1dGhQcm92aWRlci5nb29nbGUoe1xuICAgIGNsaWVudElkOiAnMjc1MzUyOTYwOTQ2LTVyY2FuM3FraGxzYzdtNTBoZXY1ZG4yZTJjYWU5bWJwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tJyxcbiAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxMDAvIy9sb2dpbi8nXG4gIH0pO1xufSlcblxuXG5cbi5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0pIHtcbiAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgaWYod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxuICAgICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcblxuICAgICAgLy8gRG9uJ3QgcmVtb3ZlIHRoaXMgbGluZSB1bmxlc3MgeW91IGtub3cgd2hhdCB5b3UgYXJlIGRvaW5nLiBJdCBzdG9wcyB0aGUgdmlld3BvcnRcbiAgICAgIC8vIGZyb20gc25hcHBpbmcgd2hlbiB0ZXh0IGlucHV0cyBhcmUgZm9jdXNlZC4gSW9uaWMgaGFuZGxlcyB0aGlzIGludGVybmFsbHkgZm9yXG4gICAgICAvLyBhIG11Y2ggbmljZXIga2V5Ym9hcmQgZXhwZXJpZW5jZS5cbiAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5kaXNhYmxlU2Nyb2xsKHRydWUpO1xuICAgIH1cbiAgICBpZih3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XG4gICAgfVxuICB9KTtcbn0pXG4iLCIvKiFcbiAqIG5nQ29yZG92YVxuICogdjAuMS4yNy1hbHBoYVxuICogQ29weXJpZ2h0IDIwMTUgRHJpZnR5IENvLiBodHRwOi8vZHJpZnR5LmNvbS9cbiAqIFNlZSBMSUNFTlNFIGluIHRoaXMgcmVwb3NpdG9yeSBmb3IgbGljZW5zZSBpbmZvcm1hdGlvblxuICovXG4hZnVuY3Rpb24oKXthbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YVwiLFtcIm5nQ29yZG92YS5wbHVnaW5zXCJdKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLjNkdG91Y2hcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhM0RUb3VjaFwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7dmFyIG49W10scj17fSxvPWZ1bmN0aW9uKGUpe3JldHVybiBmdW5jdGlvbihuKXtmb3IodmFyIHIgaW4gZSluLnR5cGU9PT1yJiZlW3JdKCl9fTtyZXR1cm57aXNBdmFpbGFibGU6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIHdpbmRvdy5jb3Jkb3ZhP3dpbmRvdy5UaHJlZURlZVRvdWNoP3dpbmRvdy5UaHJlZURlZVRvdWNoLmlzQXZhaWxhYmxlKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KTpuLnJlamVjdChcIkNvdWxkIG5vdCBmaW5kIDNEIHRvdWNoIHBsdWdpblwiKTpuLnJlamVjdChcIk5vdCBzdXBwb3J0ZWQgaW4gYnJvd3NlclwiKSxuLnByb21pc2V9LGFkZFF1aWNrQWN0aW9uOmZ1bmN0aW9uKHQsaSxhLGMsdSxzKXt2YXIgbD1lLmRlZmVyKCksZj17dHlwZTp0LHRpdGxlOmksc3VidGl0bGU6dX07cmV0dXJuIGEmJihmLmljb25UeXBlPWEpLGMmJihmLmljb25UZW1wbGF0ZT1jKSx0aGlzLmlzQXZhaWxhYmxlKCkudGhlbihmdW5jdGlvbigpe24ucHVzaChmKSxyW3RdPXMsd2luZG93LlRocmVlRGVlVG91Y2guY29uZmlndXJlUXVpY2tBY3Rpb25zKG4pLHdpbmRvdy5UaHJlZURlZVRvdWNoLm9uSG9tZUljb25QcmVzc2VkPW8ociksbC5yZXNvbHZlKG4pfSxmdW5jdGlvbihlKXtsLnJlamVjdChlKX0pLGwucHJvbWlzZX0sYWRkUXVpY2tBY3Rpb25IYW5kbGVyOmZ1bmN0aW9uKG4sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiB0aGlzLmlzQXZhaWxhYmxlKCkudGhlbihmdW5jdGlvbigpe3Jbbl09dCx3aW5kb3cuVGhyZWVEZWVUb3VjaC5vbkhvbWVJY29uUHJlc3NlZD1vKHIpLGkucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKGUpe2kucmVqZWN0KGUpfSksaS5wcm9taXNlfSxlbmFibGVMaW5rUHJldmlldzpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gdGhpcy5pc0F2YWlsYWJsZSgpLnRoZW4oZnVuY3Rpb24oKXt3aW5kb3cuVGhyZWVEZWVUb3VjaC5lbmFibGVMaW5rUHJldmlldygpLG4ucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxhZGRGb3JjZVRvdWNoSGFuZGxlcjpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIHRoaXMuaXNBdmFpbGFibGUoKS50aGVuKGZ1bmN0aW9uKCl7d2luZG93LlRocmVlRGVlVG91Y2gud2F0Y2hGb3JjZVRvdWNoZXMobiksci5yZXNvbHZlKCEwKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmFjdGlvblNoZWV0XCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUFjdGlvblNoZWV0XCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntzaG93OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmFjdGlvbnNoZWV0LnNob3cocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9KSxvLnByb21pc2V9LGhpZGU6ZnVuY3Rpb24oKXtyZXR1cm4gbi5wbHVnaW5zLmFjdGlvbnNoZWV0LmhpZGUoKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuYWRNb2JcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQWRNb2JcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2NyZWF0ZUJhbm5lclZpZXc6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuQWRNb2IuY3JlYXRlQmFubmVyVmlldyhyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sY3JlYXRlSW50ZXJzdGl0aWFsVmlldzpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5BZE1vYi5jcmVhdGVJbnRlcnN0aXRpYWxWaWV3KHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxyZXF1ZXN0QWQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuQWRNb2IucmVxdWVzdEFkKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93QWQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuQWRNb2Iuc2hvd0FkKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxyZXF1ZXN0SW50ZXJzdGl0aWFsQWQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuQWRNb2IucmVxdWVzdEludGVyc3RpdGlhbEFkKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5hcHBBdmFpbGFiaWxpdHlcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQXBwQXZhaWxhYmlsaXR5XCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57Y2hlY2s6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBhcHBBdmFpbGFiaWxpdHkuY2hlY2sobixmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5hcHBSYXRlXCIsW10pLnByb3ZpZGVyKFwiJGNvcmRvdmFBcHBSYXRlXCIsW2Z1bmN0aW9uKCl7dGhpcy5zZXRQcmVmZXJlbmNlcz1mdW5jdGlvbihlKXtlJiZhbmd1bGFyLmlzT2JqZWN0KGUpJiYoQXBwUmF0ZS5wcmVmZXJlbmNlcy51c2VMYW5ndWFnZT1lLmxhbmd1YWdlfHxudWxsLEFwcFJhdGUucHJlZmVyZW5jZXMuZGlzcGxheUFwcE5hbWU9ZS5hcHBOYW1lfHxcIlwiLEFwcFJhdGUucHJlZmVyZW5jZXMucHJvbXB0QWdhaW5Gb3JFYWNoTmV3VmVyc2lvbj1lLnByb21wdEZvck5ld1ZlcnNpb258fCEwLEFwcFJhdGUucHJlZmVyZW5jZXMub3BlblN0b3JlSW5BcHA9ZS5vcGVuU3RvcmVJbkFwcHx8ITEsQXBwUmF0ZS5wcmVmZXJlbmNlcy51c2VzVW50aWxQcm9tcHQ9ZS51c2VzVW50aWxQcm9tcHR8fDMsQXBwUmF0ZS5wcmVmZXJlbmNlcy51c2VDdXN0b21SYXRlRGlhbG9nPWUudXNlQ3VzdG9tUmF0ZURpYWxvZ3x8ITEsQXBwUmF0ZS5wcmVmZXJlbmNlcy5zdG9yZUFwcFVSTC5pb3M9ZS5pb3NVUkx8fG51bGwsQXBwUmF0ZS5wcmVmZXJlbmNlcy5zdG9yZUFwcFVSTC5hbmRyb2lkPWUuYW5kcm9pZFVSTHx8bnVsbCxBcHBSYXRlLnByZWZlcmVuY2VzLnN0b3JlQXBwVVJMLmJsYWNrYmVycnk9ZS5ibGFja2JlcnJ5VVJMfHxudWxsLEFwcFJhdGUucHJlZmVyZW5jZXMuc3RvcmVBcHBVUkwud2luZG93czg9ZS53aW5kb3dzVVJMfHxudWxsKX0sdGhpcy5zZXRDdXN0b21Mb2NhbGU9ZnVuY3Rpb24oZSl7dmFyIG49e3RpdGxlOlwiUmF0ZSAlQFwiLG1lc3NhZ2U6XCJJZiB5b3UgZW5qb3kgdXNpbmcgJUAsIHdvdWxkIHlvdSBtaW5kIHRha2luZyBhIG1vbWVudCB0byByYXRlIGl0PyBJdCB3b27igJl0IHRha2UgbW9yZSB0aGFuIGEgbWludXRlLiBUaGFua3MgZm9yIHlvdXIgc3VwcG9ydCFcIixjYW5jZWxCdXR0b25MYWJlbDpcIk5vLCBUaGFua3NcIixsYXRlckJ1dHRvbkxhYmVsOlwiUmVtaW5kIE1lIExhdGVyXCIscmF0ZUJ1dHRvbkxhYmVsOlwiUmF0ZSBJdCBOb3dcIn07bj1hbmd1bGFyLmV4dGVuZChuLGUpLEFwcFJhdGUucHJlZmVyZW5jZXMuY3VzdG9tTG9jYWxlPW59LHRoaXMuJGdldD1bXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntwcm9tcHRGb3JSYXRpbmc6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpLG89QXBwUmF0ZS5wcm9tcHRGb3JSYXRpbmcobik7cmV0dXJuIHIucmVzb2x2ZShvKSxyLnByb21pc2V9LG5hdmlnYXRlVG9BcHBTdG9yZTpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKSxyPUFwcFJhdGUubmF2aWdhdGVUb0FwcFN0b3JlKCk7cmV0dXJuIG4ucmVzb2x2ZShyKSxuLnByb21pc2V9LG9uQnV0dG9uQ2xpY2tlZDpmdW5jdGlvbihlKXtBcHBSYXRlLnByZWZlcmVuY2VzLmNhbGxiYWNrcy5vbkJ1dHRvbkNsaWNrZWQ9ZS5iaW5kKHRoaXMpfSxvblJhdGVEaWFsb2dTaG93OmZ1bmN0aW9uKGUpe0FwcFJhdGUucHJlZmVyZW5jZXMuY2FsbGJhY2tzLm9uUmF0ZURpYWxvZ1Nob3c9ZS5iaW5kKHRoaXMpfX19XX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmFwcFZlcnNpb25cIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQXBwVmVyc2lvblwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2dldEFwcE5hbWU6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEuZ2V0QXBwVmVyc2lvbi5nZXRBcHBOYW1lKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0pLG4ucHJvbWlzZX0sZ2V0UGFja2FnZU5hbWU6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEuZ2V0QXBwVmVyc2lvbi5nZXRQYWNrYWdlTmFtZShmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9KSxuLnByb21pc2V9LGdldFZlcnNpb25OdW1iZXI6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEuZ2V0QXBwVmVyc2lvbi5nZXRWZXJzaW9uTnVtYmVyKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0pLG4ucHJvbWlzZX0sZ2V0VmVyc2lvbkNvZGU6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEuZ2V0QXBwVmVyc2lvbi5nZXRWZXJzaW9uQ29kZShmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9KSxuLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmJhY2tncm91bmRHZW9sb2NhdGlvblwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFCYWNrZ3JvdW5kR2VvbG9jYXRpb25cIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2luaXQ6ZnVuY3Rpb24oKXtuLm5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oZnVuY3Rpb24oZSl7cmV0dXJuIGV9KX0sY29uZmlndXJlOmZ1bmN0aW9uKHIpe3RoaXMuaW5pdCgpO3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmJhY2tncm91bmRHZW9Mb2NhdGlvbi5jb25maWd1cmUoZnVuY3Rpb24oZSl7by5ub3RpZnkoZSksbi5wbHVnaW5zLmJhY2tncm91bmRHZW9Mb2NhdGlvbi5maW5pc2goKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9LHIpLHRoaXMuc3RhcnQoKSxvLnByb21pc2V9LHN0YXJ0OmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuYmFja2dyb3VuZEdlb0xvY2F0aW9uLnN0YXJ0KGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHN0b3A6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5iYWNrZ3JvdW5kR2VvTG9jYXRpb24uc3RvcChmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5iYWRnZVwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFCYWRnZVwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2hhc1Blcm1pc3Npb246ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24uYmFkZ2UuaGFzUGVybWlzc2lvbihmdW5jdGlvbihlKXtlP24ucmVzb2x2ZSghMCk6bi5yZWplY3QoXCJZb3UgZG8gbm90IGhhdmUgcGVybWlzc2lvblwiKX0pLG4ucHJvbWlzZX0scHJvbXB0Rm9yUGVybWlzc2lvbjpmdW5jdGlvbigpe3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmJhZGdlLnByb21wdEZvclBlcm1pc3Npb24oKX0sc2V0OmZ1bmN0aW9uKG4scixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24uYmFkZ2UuaGFzUGVybWlzc2lvbihmdW5jdGlvbihlKXtlP3QucmVzb2x2ZShjb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmJhZGdlLnNldChuLHIsbykpOnQucmVqZWN0KFwiWW91IGRvIG5vdCBoYXZlIHBlcm1pc3Npb24gdG8gc2V0IEJhZGdlXCIpfSksdC5wcm9taXNlfSxnZXQ6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24uYmFkZ2UuaGFzUGVybWlzc2lvbihmdW5jdGlvbihlKXtlP2NvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24uYmFkZ2UuZ2V0KGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0pOm4ucmVqZWN0KFwiWW91IGRvIG5vdCBoYXZlIHBlcm1pc3Npb24gdG8gZ2V0IEJhZGdlXCIpfSksbi5wcm9taXNlfSxjbGVhcjpmdW5jdGlvbihuLHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5iYWRnZS5oYXNQZXJtaXNzaW9uKGZ1bmN0aW9uKGUpe2U/by5yZXNvbHZlKGNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24uYmFkZ2UuY2xlYXIobixyKSk6by5yZWplY3QoXCJZb3UgZG8gbm90IGhhdmUgcGVybWlzc2lvbiB0byBjbGVhciBCYWRnZVwiKX0pLG8ucHJvbWlzZX0saW5jcmVhc2U6ZnVuY3Rpb24obixyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gdGhpcy5oYXNQZXJtaXNzaW9uKCkudGhlbihmdW5jdGlvbigpe3QucmVzb2x2ZShjb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmJhZGdlLmluY3JlYXNlKG4scixvKSl9LGZ1bmN0aW9uKCl7dC5yZWplY3QoXCJZb3UgZG8gbm90IGhhdmUgcGVybWlzc2lvbiB0byBpbmNyZWFzZSBCYWRnZVwiKX0pLHQucHJvbWlzZX0sZGVjcmVhc2U6ZnVuY3Rpb24obixyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gdGhpcy5oYXNQZXJtaXNzaW9uKCkudGhlbihmdW5jdGlvbigpe3QucmVzb2x2ZShjb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmJhZGdlLmRlY3JlYXNlKG4scixvKSl9LGZ1bmN0aW9uKCl7dC5yZWplY3QoXCJZb3UgZG8gbm90IGhhdmUgcGVybWlzc2lvbiB0byBkZWNyZWFzZSBCYWRnZVwiKX0pLHQucHJvbWlzZX0sY29uZmlndXJlOmZ1bmN0aW9uKGUpe3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmJhZGdlLmNvbmZpZ3VyZShlKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuYmFyY29kZVNjYW5uZXJcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQmFyY29kZVNjYW5uZXJcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntzY2FuOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLmJhcmNvZGVTY2FubmVyLnNjYW4oZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbiksci5wcm9taXNlfSxlbmNvZGU6ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG49bnx8XCJURVhUX1RZUEVcIixjb3Jkb3ZhLnBsdWdpbnMuYmFyY29kZVNjYW5uZXIuZW5jb2RlKG4scixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5iYXR0ZXJ5U3RhdHVzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUJhdHRlcnlTdGF0dXNcIixbXCIkcm9vdFNjb3BlXCIsXCIkd2luZG93XCIsXCIkdGltZW91dFwiLGZ1bmN0aW9uKGUsbixyKXt2YXIgbz1mdW5jdGlvbihuKXtyKGZ1bmN0aW9uKCl7ZS4kYnJvYWRjYXN0KFwiJGNvcmRvdmFCYXR0ZXJ5U3RhdHVzOnN0YXR1c1wiLG4pfSl9LHQ9ZnVuY3Rpb24obil7cihmdW5jdGlvbigpe2UuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhQmF0dGVyeVN0YXR1czpjcml0aWNhbFwiLG4pfSl9LGk9ZnVuY3Rpb24obil7cihmdW5jdGlvbigpe2UuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhQmF0dGVyeVN0YXR1czpsb3dcIixuKX0pfTtyZXR1cm4gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRldmljZXJlYWR5XCIsZnVuY3Rpb24oKXtuYXZpZ2F0b3IuYmF0dGVyeSYmKG4uYWRkRXZlbnRMaXN0ZW5lcihcImJhdHRlcnlzdGF0dXNcIixvLCExKSxuLmFkZEV2ZW50TGlzdGVuZXIoXCJiYXR0ZXJ5Y3JpdGljYWxcIix0LCExKSxuLmFkZEV2ZW50TGlzdGVuZXIoXCJiYXR0ZXJ5bG93XCIsaSwhMSkpfSwhMSksITB9XSkucnVuKFtcIiRpbmplY3RvclwiLGZ1bmN0aW9uKGUpe2UuZ2V0KFwiJGNvcmRvdmFCYXR0ZXJ5U3RhdHVzXCIpfV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuYmVhY29uXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUJlYWNvblwiLFtcIiR3aW5kb3dcIixcIiRyb290U2NvcGVcIixcIiR0aW1lb3V0XCIsXCIkcVwiLGZ1bmN0aW9uKGUsbixyLG8pe3ZhciB0PW51bGwsaT1udWxsLGE9bnVsbCxjPW51bGwsdT1udWxsLHM9bnVsbCxsPW51bGwsZj1udWxsO3JldHVybiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZGV2aWNlcmVhZHlcIixmdW5jdGlvbigpe2lmKGUuY29yZG92YSYmZS5jb3Jkb3ZhLnBsdWdpbnMmJmUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlcil7dmFyIG89bmV3IGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5EZWxlZ2F0ZTtvLmRpZERldGVybWluZVN0YXRlRm9yUmVnaW9uPWZ1bmN0aW9uKGUpe3IoZnVuY3Rpb24oKXtuLiRicm9hZGNhc3QoXCIkY29yZG92YUJlYWNvbjpkaWREZXRlcm1pbmVTdGF0ZUZvclJlZ2lvblwiLGUpfSksdCYmdChlKX0sby5kaWRTdGFydE1vbml0b3JpbmdGb3JSZWdpb249ZnVuY3Rpb24oZSl7cihmdW5jdGlvbigpe24uJGJyb2FkY2FzdChcIiRjb3Jkb3ZhQmVhY29uOmRpZFN0YXJ0TW9uaXRvcmluZ0ZvclJlZ2lvblwiLGUpfSksaSYmaShlKX0sby5kaWRFeGl0UmVnaW9uPWZ1bmN0aW9uKGUpe3IoZnVuY3Rpb24oKXtuLiRicm9hZGNhc3QoXCIkY29yZG92YUJlYWNvbjpkaWRFeGl0UmVnaW9uXCIsZSl9KSxhJiZhKGUpfSxvLmRpZEVudGVyUmVnaW9uPWZ1bmN0aW9uKGUpe3IoZnVuY3Rpb24oKXtuLiRicm9hZGNhc3QoXCIkY29yZG92YUJlYWNvbjpkaWRFbnRlclJlZ2lvblwiLGUpfSksYyYmYyhlKX0sby5kaWRSYW5nZUJlYWNvbnNJblJlZ2lvbj1mdW5jdGlvbihlKXtyKGZ1bmN0aW9uKCl7bi4kYnJvYWRjYXN0KFwiJGNvcmRvdmFCZWFjb246ZGlkUmFuZ2VCZWFjb25zSW5SZWdpb25cIixlKX0pLHUmJnUoZSl9LG8ucGVyaXBoZXJhbE1hbmFnZXJEaWRTdGFydEFkdmVydGlzaW5nPWZ1bmN0aW9uKGUpe3IoZnVuY3Rpb24oKXtuLiRicm9hZGNhc3QoXCIkY29yZG92YUJlYWNvbjpwZXJpcGhlcmFsTWFuYWdlckRpZFN0YXJ0QWR2ZXJ0aXNpbmdcIixlKX0pLHMmJnMoZSl9LG8ucGVyaXBoZXJhbE1hbmFnZXJEaWRVcGRhdGVTdGF0ZT1mdW5jdGlvbihlKXtyKGZ1bmN0aW9uKCl7bi4kYnJvYWRjYXN0KFwiJGNvcmRvdmFCZWFjb246cGVyaXBoZXJhbE1hbmFnZXJEaWRVcGRhdGVTdGF0ZVwiLGUpfSksbCYmbChlKX0sby5kaWRDaGFuZ2VBdXRob3JpemF0aW9uU3RhdHVzPWZ1bmN0aW9uKGUpe3IoZnVuY3Rpb24oKXtuLiRicm9hZGNhc3QoXCIkY29yZG92YUJlYWNvbjpkaWRDaGFuZ2VBdXRob3JpemF0aW9uU3RhdHVzXCIsZSl9KSxmJiZmKGUpfSxlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuc2V0RGVsZWdhdGUobyl9fSwhMSkse3NldENhbGxiYWNrRGlkRGV0ZXJtaW5lU3RhdGVGb3JSZWdpb246ZnVuY3Rpb24oZSl7dD1lfSxzZXRDYWxsYmFja0RpZFN0YXJ0TW9uaXRvcmluZ0ZvclJlZ2lvbjpmdW5jdGlvbihlKXtpPWV9LHNldENhbGxiYWNrRGlkRXhpdFJlZ2lvbjpmdW5jdGlvbihlKXthPWV9LHNldENhbGxiYWNrRGlkRW50ZXJSZWdpb246ZnVuY3Rpb24oZSl7Yz1lfSxzZXRDYWxsYmFja0RpZFJhbmdlQmVhY29uc0luUmVnaW9uOmZ1bmN0aW9uKGUpe3U9ZX0sc2V0Q2FsbGJhY2tQZXJpcGhlcmFsTWFuYWdlckRpZFN0YXJ0QWR2ZXJ0aXNpbmc6ZnVuY3Rpb24oZSl7cz1lfSxzZXRDYWxsYmFja1BlcmlwaGVyYWxNYW5hZ2VyRGlkVXBkYXRlU3RhdGU6ZnVuY3Rpb24oZSl7bD1lfSxzZXRDYWxsYmFja0RpZENoYW5nZUF1dGhvcml6YXRpb25TdGF0dXM6ZnVuY3Rpb24oZSl7Zj1lfSxjcmVhdGVCZWFjb25SZWdpb246ZnVuY3Rpb24obixyLG8sdCxpKXtyZXR1cm4gbz1vfHx2b2lkIDAsdD10fHx2b2lkIDAsbmV3IGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5CZWFjb25SZWdpb24obixyLG8sdCxpKX0saXNCbHVldG9vdGhFbmFibGVkOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuaXNCbHVldG9vdGhFbmFibGVkKCkpfSxlbmFibGVCbHVldG9vdGg6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5lbmFibGVCbHVldG9vdGgoKSl9LGRpc2FibGVCbHVldG9vdGg6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5kaXNhYmxlQmx1ZXRvb3RoKCkpfSxzdGFydE1vbml0b3JpbmdGb3JSZWdpb246ZnVuY3Rpb24obil7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuc3RhcnRNb25pdG9yaW5nRm9yUmVnaW9uKG4pKX0sc3RvcE1vbml0b3JpbmdGb3JSZWdpb246ZnVuY3Rpb24obil7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuc3RvcE1vbml0b3JpbmdGb3JSZWdpb24obikpfSxyZXF1ZXN0U3RhdGVGb3JSZWdpb246ZnVuY3Rpb24obil7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIucmVxdWVzdFN0YXRlRm9yUmVnaW9uKG4pKX0sc3RhcnRSYW5naW5nQmVhY29uc0luUmVnaW9uOmZ1bmN0aW9uKG4pe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLnN0YXJ0UmFuZ2luZ0JlYWNvbnNJblJlZ2lvbihuKSl9LHN0b3BSYW5naW5nQmVhY29uc0luUmVnaW9uOmZ1bmN0aW9uKG4pe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLnN0b3BSYW5naW5nQmVhY29uc0luUmVnaW9uKG4pKX0sZ2V0QXV0aG9yaXphdGlvblN0YXR1czpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmdldEF1dGhvcml6YXRpb25TdGF0dXMoKSl9LHJlcXVlc3RXaGVuSW5Vc2VBdXRob3JpemF0aW9uOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIucmVxdWVzdFdoZW5JblVzZUF1dGhvcml6YXRpb24oKSl9LHJlcXVlc3RBbHdheXNBdXRob3JpemF0aW9uOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIucmVxdWVzdEFsd2F5c0F1dGhvcml6YXRpb24oKSl9LGdldE1vbml0b3JlZFJlZ2lvbnM6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5nZXRNb25pdG9yZWRSZWdpb25zKCkpfSxnZXRSYW5nZWRSZWdpb25zOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuZ2V0UmFuZ2VkUmVnaW9ucygpKX0saXNSYW5naW5nQXZhaWxhYmxlOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuaXNSYW5naW5nQXZhaWxhYmxlKCkpfSxpc01vbml0b3JpbmdBdmFpbGFibGVGb3JDbGFzczpmdW5jdGlvbihuKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5pc01vbml0b3JpbmdBdmFpbGFibGVGb3JDbGFzcyhuKSl9LHN0YXJ0QWR2ZXJ0aXNpbmc6ZnVuY3Rpb24obixyKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5zdGFydEFkdmVydGlzaW5nKG4scikpfSxzdG9wQWR2ZXJ0aXNpbmc6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5zdG9wQWR2ZXJ0aXNpbmcoKSl9LGlzQWR2ZXJ0aXNpbmdBdmFpbGFibGU6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5pc0FkdmVydGlzaW5nQXZhaWxhYmxlKCkpfSxpc0FkdmVydGlzaW5nOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuaXNBZHZlcnRpc2luZygpKX0sZGlzYWJsZURlYnVnTG9nczpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmRpc2FibGVEZWJ1Z0xvZ3MoKSl9LGVuYWJsZURlYnVnTm90aWZpY2F0aW9uczpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmVuYWJsZURlYnVnTm90aWZpY2F0aW9ucygpKX0sZGlzYWJsZURlYnVnTm90aWZpY2F0aW9uczpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmRpc2FibGVEZWJ1Z05vdGlmaWNhdGlvbnMoKSl9LGVuYWJsZURlYnVnTG9nczpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmVuYWJsZURlYnVnTG9ncygpKX0sYXBwZW5kVG9EZXZpY2VMb2c6ZnVuY3Rpb24obil7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuYXBwZW5kVG9EZXZpY2VMb2cobikpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5ibGVcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQkxFXCIsW1wiJHFcIixcIiR0aW1lb3V0XCIsXCIkbG9nXCIsZnVuY3Rpb24oZSxuLHIpe3JldHVybntzY2FuOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBibGUuc3RhcnRTY2FuKHIsZnVuY3Rpb24oZSl7dC5ub3RpZnkoZSl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSksbihmdW5jdGlvbigpe2JsZS5zdG9wU2NhbihmdW5jdGlvbigpe3QucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0pfSwxZTMqbyksdC5wcm9taXNlfSxzdGFydFNjYW46ZnVuY3Rpb24oZSxuLHIpe3JldHVybiBibGUuc3RhcnRTY2FuKGUsbixyKX0sc3RvcFNjYW46ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGJsZS5zdG9wU2NhbihmdW5jdGlvbigpe24ucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sY29ubmVjdDpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGJsZS5jb25uZWN0KG4sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sZGlzY29ubmVjdDpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGJsZS5kaXNjb25uZWN0KG4sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0scmVhZDpmdW5jdGlvbihuLHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBibGUucmVhZChuLHIsbyxmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSksdC5wcm9taXNlfSx3cml0ZTpmdW5jdGlvbihuLHIsbyx0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIGJsZS53cml0ZShuLHIsbyx0LGZ1bmN0aW9uKGUpe2kucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7aS5yZWplY3QoZSl9KSxpLnByb21pc2V9LHdyaXRlV2l0aG91dFJlc3BvbnNlOmZ1bmN0aW9uKG4scixvLHQpe3ZhciBpPWUuZGVmZXIoKTtyZXR1cm4gYmxlLndyaXRlV2l0aG91dFJlc3BvbnNlKG4scixvLHQsZnVuY3Rpb24oZSl7aS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtpLnJlamVjdChlKX0pLGkucHJvbWlzZX0sd3JpdGVDb21tYW5kOmZ1bmN0aW9uKGUsbixvLHQpe3JldHVybiByLndhcm5pbmcoXCJ3cml0ZUNvbW1hbmQgaXMgZGVwcmVjYXRlZCwgdXNlIHdyaXRlV2l0aG91dFJlc3BvbnNlXCIpLHRoaXMud3JpdGVXaXRob3V0UmVzcG9uc2UoZSxuLG8sdCl9LHN0YXJ0Tm90aWZpY2F0aW9uOmZ1bmN0aW9uKGUsbixyLG8sdCl7cmV0dXJuIGJsZS5zdGFydE5vdGlmaWNhdGlvbihlLG4scixvLHQpfSxzdG9wTm90aWZpY2F0aW9uOmZ1bmN0aW9uKG4scixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIGJsZS5zdG9wTm90aWZpY2F0aW9uKG4scixvLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7dC5yZWplY3QoZSl9KSx0LnByb21pc2V9LGlzQ29ubmVjdGVkOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gYmxlLmlzQ29ubmVjdGVkKG4sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sZW5hYmxlOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBibGUuZW5hYmxlKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9LGlzRW5hYmxlZDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gYmxlLmlzRW5hYmxlZChmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5ibHVldG9vdGhTZXJpYWxcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQmx1ZXRvb3RoU2VyaWFsXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntjb25uZWN0OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKSx0PWUuZGVmZXIoKSxpPSExO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5jb25uZWN0KHIsZnVuY3Rpb24oKXtpPSEwLG8ucmVzb2x2ZSh0KX0sZnVuY3Rpb24oZSl7aT09PSExJiZ0LnJlamVjdChlKSxvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sY29ubmVjdEluc2VjdXJlOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwuY29ubmVjdEluc2VjdXJlKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGRpc2Nvbm5lY3Q6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLmRpc2Nvbm5lY3QoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LGxpc3Q6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLmxpc3QoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sZGlzY292ZXJVbnBhaXJlZDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwuZGlzY292ZXJVbnBhaXJlZChmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxzZXREZXZpY2VEaXNjb3ZlcmVkTGlzdGVuZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLnNldERldmljZURpc2NvdmVyZWRMaXN0ZW5lcihmdW5jdGlvbihlKXtyLm5vdGlmeShlKX0pLHIucHJvbWlzZX0sY2xlYXJEZXZpY2VEaXNjb3ZlcmVkTGlzdGVuZXI6ZnVuY3Rpb24oKXtuLmJsdWV0b290aFNlcmlhbC5jbGVhckRldmljZURpc2NvdmVyZWRMaXN0ZW5lcigpfSxzaG93Qmx1ZXRvb3RoU2V0dGluZ3M6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLnNob3dCbHVldG9vdGhTZXR0aW5ncyhmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0saXNFbmFibGVkOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5pc0VuYWJsZWQoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxlbmFibGU6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLmVuYWJsZShmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LGlzQ29ubmVjdGVkOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5pc0Nvbm5lY3RlZChmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LGF2YWlsYWJsZTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwuYXZhaWxhYmxlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHJlYWQ6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLnJlYWQoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0scmVhZFVudGlsOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwucmVhZFVudGlsKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sd3JpdGU6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC53cml0ZShyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxzdWJzY3JpYmU6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5zdWJzY3JpYmUocixmdW5jdGlvbihlKXtvLm5vdGlmeShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHN1YnNjcmliZVJhd0RhdGE6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLnN1YnNjcmliZVJhd0RhdGEoZnVuY3Rpb24oZSl7ci5ub3RpZnkoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSx1bnN1YnNjcmliZTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwudW5zdWJzY3JpYmUoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHVuc3Vic2NyaWJlUmF3RGF0YTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwudW5zdWJzY3JpYmVSYXdEYXRhKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxjbGVhcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwuY2xlYXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHJlYWRSU1NJOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5yZWFkUlNTSShmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5icmlnaHRuZXNzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUJyaWdodG5lc3NcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2dldDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5jb3Jkb3ZhP24uY29yZG92YS5wbHVnaW5zLmJyaWdodG5lc3MuZ2V0QnJpZ2h0bmVzcyhmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSk6ci5yZWplY3QoXCJOb3Qgc3VwcG9ydGVkIHdpdGhvdXQgY29yZG92YS5qc1wiKSxyLnByb21pc2V9LHNldDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uY29yZG92YT9uLmNvcmRvdmEucGx1Z2lucy5icmlnaHRuZXNzLnNldEJyaWdodG5lc3MocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSk6by5yZWplY3QoXCJOb3Qgc3VwcG9ydGVkIHdpdGhvdXQgY29yZG92YS5qc1wiKSxvLnByb21pc2V9LHNldEtlZXBTY3JlZW5PbjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uY29yZG92YT9uLmNvcmRvdmEucGx1Z2lucy5icmlnaHRuZXNzLnNldEtlZXBTY3JlZW5PbihyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KTpvLnJlamVjdChcIk5vdCBzdXBwb3J0ZWQgd2l0aG91dCBjb3Jkb3ZhLmpzXCIpLG8ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuY2FsZW5kYXJcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQ2FsZW5kYXJcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2NyZWF0ZUNhbGVuZGFyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKSx0PW4ucGx1Z2lucy5jYWxlbmRhci5nZXRDcmVhdGVDYWxlbmRhck9wdGlvbnMoKTtyZXR1cm5cInN0cmluZ1wiPT10eXBlb2Ygcj90LmNhbGVuZGFyTmFtZT1yOnQ9YW5ndWxhci5leHRlbmQodCxyKSxuLnBsdWdpbnMuY2FsZW5kYXIuY3JlYXRlQ2FsZW5kYXIodCxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxkZWxldGVDYWxlbmRhcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5jYWxlbmRhci5kZWxldGVDYWxlbmRhcihyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGNyZWF0ZUV2ZW50OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKSx0PXt0aXRsZTpudWxsLGxvY2F0aW9uOm51bGwsbm90ZXM6bnVsbCxzdGFydERhdGU6bnVsbCxlbmREYXRlOm51bGx9O3JldHVybiB0PWFuZ3VsYXIuZXh0ZW5kKHQsciksbi5wbHVnaW5zLmNhbGVuZGFyLmNyZWF0ZUV2ZW50KHQudGl0bGUsdC5sb2NhdGlvbix0Lm5vdGVzLG5ldyBEYXRlKHQuc3RhcnREYXRlKSxuZXcgRGF0ZSh0LmVuZERhdGUpLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGNyZWF0ZUV2ZW50V2l0aE9wdGlvbnM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpLHQ9W10saT13aW5kb3cucGx1Z2lucy5jYWxlbmRhci5nZXRDYWxlbmRhck9wdGlvbnMoKSxhPXt0aXRsZTpudWxsLGxvY2F0aW9uOm51bGwsbm90ZXM6bnVsbCxzdGFydERhdGU6bnVsbCxlbmREYXRlOm51bGx9O3Q9T2JqZWN0LmtleXMoYSk7Zm9yKHZhciBjIGluIHIpLTE9PT10LmluZGV4T2YoYyk/aVtjXT1yW2NdOmFbY109cltjXTtyZXR1cm4gbi5wbHVnaW5zLmNhbGVuZGFyLmNyZWF0ZUV2ZW50V2l0aE9wdGlvbnMoYS50aXRsZSxhLmxvY2F0aW9uLGEubm90ZXMsbmV3IERhdGUoYS5zdGFydERhdGUpLG5ldyBEYXRlKGEuZW5kRGF0ZSksaSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxjcmVhdGVFdmVudEludGVyYWN0aXZlbHk6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpLHQ9e3RpdGxlOm51bGwsbG9jYXRpb246bnVsbCxub3RlczpudWxsLHN0YXJ0RGF0ZTpudWxsLGVuZERhdGU6bnVsbH07cmV0dXJuIHQ9YW5ndWxhci5leHRlbmQodCxyKSxuLnBsdWdpbnMuY2FsZW5kYXIuY3JlYXRlRXZlbnRJbnRlcmFjdGl2ZWx5KHQudGl0bGUsdC5sb2NhdGlvbix0Lm5vdGVzLG5ldyBEYXRlKHQuc3RhcnREYXRlKSxuZXcgRGF0ZSh0LmVuZERhdGUpLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGNyZWF0ZUV2ZW50SW5OYW1lZENhbGVuZGFyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKSx0PXt0aXRsZTpudWxsLGxvY2F0aW9uOm51bGwsbm90ZXM6bnVsbCxzdGFydERhdGU6bnVsbCxlbmREYXRlOm51bGwsY2FsZW5kYXJOYW1lOm51bGx9O3JldHVybiB0PWFuZ3VsYXIuZXh0ZW5kKHQsciksbi5wbHVnaW5zLmNhbGVuZGFyLmNyZWF0ZUV2ZW50SW5OYW1lZENhbGVuZGFyKHQudGl0bGUsdC5sb2NhdGlvbix0Lm5vdGVzLG5ldyBEYXRlKHQuc3RhcnREYXRlKSxuZXcgRGF0ZSh0LmVuZERhdGUpLHQuY2FsZW5kYXJOYW1lLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGZpbmRFdmVudDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCksdD17dGl0bGU6bnVsbCxsb2NhdGlvbjpudWxsLG5vdGVzOm51bGwsc3RhcnREYXRlOm51bGwsZW5kRGF0ZTpudWxsfTtyZXR1cm4gdD1hbmd1bGFyLmV4dGVuZCh0LHIpLG4ucGx1Z2lucy5jYWxlbmRhci5maW5kRXZlbnQodC50aXRsZSx0LmxvY2F0aW9uLHQubm90ZXMsbmV3IERhdGUodC5zdGFydERhdGUpLG5ldyBEYXRlKHQuZW5kRGF0ZSksZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sbGlzdEV2ZW50c0luUmFuZ2U6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5jYWxlbmRhci5saXN0RXZlbnRzSW5SYW5nZShyLG8sZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0pLHQucHJvbWlzZX0sbGlzdENhbGVuZGFyczpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmNhbGVuZGFyLmxpc3RDYWxlbmRhcnMoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sZmluZEFsbEV2ZW50c0luTmFtZWRDYWxlbmRhcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5jYWxlbmRhci5maW5kQWxsRXZlbnRzSW5OYW1lZENhbGVuZGFyKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sbW9kaWZ5RXZlbnQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpLHQ9e3RpdGxlOm51bGwsbG9jYXRpb246bnVsbCxub3RlczpudWxsLHN0YXJ0RGF0ZTpudWxsLGVuZERhdGU6bnVsbCxuZXdUaXRsZTpudWxsLG5ld0xvY2F0aW9uOm51bGwsbmV3Tm90ZXM6bnVsbCxuZXdTdGFydERhdGU6bnVsbCxuZXdFbmREYXRlOm51bGx9O3JldHVybiB0PWFuZ3VsYXIuZXh0ZW5kKHQsciksbi5wbHVnaW5zLmNhbGVuZGFyLm1vZGlmeUV2ZW50KHQudGl0bGUsdC5sb2NhdGlvbix0Lm5vdGVzLG5ldyBEYXRlKHQuc3RhcnREYXRlKSxuZXcgRGF0ZSh0LmVuZERhdGUpLHQubmV3VGl0bGUsdC5uZXdMb2NhdGlvbix0Lm5ld05vdGVzLG5ldyBEYXRlKHQubmV3U3RhcnREYXRlKSxuZXcgRGF0ZSh0Lm5ld0VuZERhdGUpLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGRlbGV0ZUV2ZW50OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKSx0PXtuZXdUaXRsZTpudWxsLGxvY2F0aW9uOm51bGwsbm90ZXM6bnVsbCxzdGFydERhdGU6bnVsbCxlbmREYXRlOm51bGx9O3JldHVybiB0PWFuZ3VsYXIuZXh0ZW5kKHQsciksbi5wbHVnaW5zLmNhbGVuZGFyLmRlbGV0ZUV2ZW50KHQubmV3VGl0bGUsdC5sb2NhdGlvbix0Lm5vdGVzLG5ldyBEYXRlKHQuc3RhcnREYXRlKSxuZXcgRGF0ZSh0LmVuZERhdGUpLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmNhbWVyYVwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFDYW1lcmFcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntnZXRQaWN0dXJlOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmNhbWVyYT8obmF2aWdhdG9yLmNhbWVyYS5nZXRQaWN0dXJlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LG4pLHIucHJvbWlzZSk6KHIucmVzb2x2ZShudWxsKSxyLnByb21pc2UpfSxjbGVhbnVwOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuY2FtZXJhLmNsZWFudXAoZnVuY3Rpb24oKXtuLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmNhcHR1cmVcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQ2FwdHVyZVwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2NhcHR1cmVBdWRpbzpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5kZXZpY2UuY2FwdHVyZT8obmF2aWdhdG9yLmRldmljZS5jYXB0dXJlLmNhcHR1cmVBdWRpbyhmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKSxyLnByb21pc2UpOihyLnJlc29sdmUobnVsbCksci5wcm9taXNlKX0sY2FwdHVyZUltYWdlOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmRldmljZS5jYXB0dXJlPyhuYXZpZ2F0b3IuZGV2aWNlLmNhcHR1cmUuY2FwdHVyZUltYWdlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LG4pLHIucHJvbWlzZSk6KHIucmVzb2x2ZShudWxsKSxyLnByb21pc2UpfSxjYXB0dXJlVmlkZW86ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZGV2aWNlLmNhcHR1cmU/KG5hdmlnYXRvci5kZXZpY2UuY2FwdHVyZS5jYXB0dXJlVmlkZW8oZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbiksci5wcm9taXNlKTooci5yZXNvbHZlKG51bGwpLHIucHJvbWlzZSl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmNhcmRJT1wiLFtdKS5wcm92aWRlcihcIiRjb3Jkb3ZhTmdDYXJkSU9cIixbZnVuY3Rpb24oKXt2YXIgZT1bXCJjYXJkX3R5cGVcIixcInJlZGFjdGVkX2NhcmRfbnVtYmVyXCIsXCJjYXJkX251bWJlclwiLFwiZXhwaXJ5X21vbnRoXCIsXCJleHBpcnlfeWVhclwiLFwic2hvcnRfZXhwaXJ5X3llYXJcIixcImN2dlwiLFwiemlwXCJdLG49e2V4cGlyeTohMCxjdnY6ITAsemlwOiExLHN1cHByZXNzTWFudWFsOiExLHN1cHByZXNzQ29uZmlybTohMSxoaWRlTG9nbzohMH07dGhpcy5zZXRDYXJkSU9SZXNwb25zZUZpZWxkcz1mdW5jdGlvbihuKXtuJiZhbmd1bGFyLmlzQXJyYXkobikmJihlPW4pfSx0aGlzLnNldFNjYW5lckNvbmZpZz1mdW5jdGlvbihlKXtlJiZhbmd1bGFyLmlzT2JqZWN0KGUpJiYobi5leHBpcnk9ZS5leHBpcnl8fCEwLG4uY3Z2PWUuY3Z2fHwhMCxuLnppcD1lLnppcHx8ITEsbi5zdXBwcmVzc01hbnVhbD1lLnN1cHByZXNzTWFudWFsfHwhMSxuLnN1cHByZXNzQ29uZmlybT1lLnN1cHByZXNzQ29uZmlybXx8ITEsbi5oaWRlTG9nbz1lLmhpZGVMb2dvfHwhMCl9LHRoaXMuJGdldD1bXCIkcVwiLGZ1bmN0aW9uKHIpe3JldHVybntzY2FuQ2FyZDpmdW5jdGlvbigpe3ZhciBvPXIuZGVmZXIoKTtyZXR1cm4gQ2FyZElPLnNjYW4obixmdW5jdGlvbihuKXtpZihudWxsPT09bilvLnJlamVjdChudWxsKTtlbHNle2Zvcih2YXIgcj17fSx0PTAsaT1lLmxlbmd0aDtpPnQ7dCsrKXt2YXIgYT1lW3RdO1wic2hvcnRfZXhwaXJ5X3llYXJcIj09PWE/clthXT1TdHJpbmcobi5leHBpcnlfeWVhcikuc3Vic3RyKDIsMil8fFwiXCI6clthXT1uW2FdfHxcIlwifW8ucmVzb2x2ZShyKX19LGZ1bmN0aW9uKCl7by5yZWplY3QobnVsbCl9KSxvLnByb21pc2V9fX1dfV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuY2xpcGJvYXJkXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUNsaXBib2FyZFwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57Y29weTpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uY29yZG92YS5wbHVnaW5zLmNsaXBib2FyZC5jb3B5KHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxwYXN0ZTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5jb3Jkb3ZhLnBsdWdpbnMuY2xpcGJvYXJkLnBhc3RlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5jb250YWN0c1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFDb250YWN0c1wiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue3NhdmU6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpLG89bmF2aWdhdG9yLmNvbnRhY3RzLmNyZWF0ZShuKTtyZXR1cm4gby5zYXZlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHJlbW92ZTpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCksbz1uYXZpZ2F0b3IuY29udGFjdHMuY3JlYXRlKG4pO3JldHVybiBvLnJlbW92ZShmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxjbG9uZTpmdW5jdGlvbihlKXt2YXIgbj1uYXZpZ2F0b3IuY29udGFjdHMuY3JlYXRlKGUpO3JldHVybiBuLmNsb25lKGUpfSxmaW5kOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKSxvPW4uZmllbGRzfHxbXCJpZFwiLFwiZGlzcGxheU5hbWVcIl07cmV0dXJuIGRlbGV0ZSBuLmZpZWxkcywwPT09T2JqZWN0LmtleXMobikubGVuZ3RoP25hdmlnYXRvci5jb250YWN0cy5maW5kKG8sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pOm5hdmlnYXRvci5jb250YWN0cy5maW5kKG8sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbiksci5wcm9taXNlfSxwaWNrQ29udGFjdDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmNvbnRhY3RzLnBpY2tDb250YWN0KGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmRhdGVQaWNrZXJcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhRGF0ZVBpY2tlclwiLFtcIiR3aW5kb3dcIixcIiRxXCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57c2hvdzpmdW5jdGlvbihyKXt2YXIgbz1uLmRlZmVyKCk7cmV0dXJuIHI9cnx8e2RhdGU6bmV3IERhdGUsbW9kZTpcImRhdGVcIn0sZS5kYXRlUGlja2VyLnNob3cocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5kZXZpY2VcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhRGV2aWNlXCIsW2Z1bmN0aW9uKCl7cmV0dXJue2dldERldmljZTpmdW5jdGlvbigpe3JldHVybiBkZXZpY2V9LGdldENvcmRvdmE6ZnVuY3Rpb24oKXtyZXR1cm4gZGV2aWNlLmNvcmRvdmF9LGdldE1vZGVsOmZ1bmN0aW9uKCl7cmV0dXJuIGRldmljZS5tb2RlbH0sZ2V0TmFtZTpmdW5jdGlvbigpe3JldHVybiBkZXZpY2UubmFtZX0sZ2V0UGxhdGZvcm06ZnVuY3Rpb24oKXtyZXR1cm4gZGV2aWNlLnBsYXRmb3JtfSxnZXRVVUlEOmZ1bmN0aW9uKCl7cmV0dXJuIGRldmljZS51dWlkfSxnZXRWZXJzaW9uOmZ1bmN0aW9uKCl7cmV0dXJuIGRldmljZS52ZXJzaW9ufSxnZXRNYW51ZmFjdHVyZXI6ZnVuY3Rpb24oKXtyZXR1cm4gZGV2aWNlLm1hbnVmYWN0dXJlcn19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZGV2aWNlTW90aW9uXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YURldmljZU1vdGlvblwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2dldEN1cnJlbnRBY2NlbGVyYXRpb246ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGFuZ3VsYXIuaXNVbmRlZmluZWQobmF2aWdhdG9yLmFjY2VsZXJvbWV0ZXIpfHwhYW5ndWxhci5pc0Z1bmN0aW9uKG5hdmlnYXRvci5hY2NlbGVyb21ldGVyLmdldEN1cnJlbnRBY2NlbGVyYXRpb24pPyhuLnJlamVjdChcIkRldmljZSBkbyBub3Qgc3VwcG9ydCB3YXRjaEFjY2VsZXJhdGlvblwiKSxuLnByb21pc2UpOihuYXZpZ2F0b3IuYWNjZWxlcm9tZXRlci5nZXRDdXJyZW50QWNjZWxlcmF0aW9uKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2UpfSx3YXRjaEFjY2VsZXJhdGlvbjpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7aWYoYW5ndWxhci5pc1VuZGVmaW5lZChuYXZpZ2F0b3IuYWNjZWxlcm9tZXRlcil8fCFhbmd1bGFyLmlzRnVuY3Rpb24obmF2aWdhdG9yLmFjY2VsZXJvbWV0ZXIud2F0Y2hBY2NlbGVyYXRpb24pKXJldHVybiByLnJlamVjdChcIkRldmljZSBkbyBub3Qgc3VwcG9ydCB3YXRjaEFjY2VsZXJhdGlvblwiKSxyLnByb21pc2U7dmFyIG89bmF2aWdhdG9yLmFjY2VsZXJvbWV0ZXIud2F0Y2hBY2NlbGVyYXRpb24oZnVuY3Rpb24oZSl7ci5ub3RpZnkoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKTtyZXR1cm4gci5wcm9taXNlLmNhbmNlbD1mdW5jdGlvbigpe25hdmlnYXRvci5hY2NlbGVyb21ldGVyLmNsZWFyV2F0Y2gobyl9LHIucHJvbWlzZS5jbGVhcldhdGNoPWZ1bmN0aW9uKGUpe25hdmlnYXRvci5hY2NlbGVyb21ldGVyLmNsZWFyV2F0Y2goZXx8byl9LHIucHJvbWlzZS53YXRjaElEPW8sci5wcm9taXNlfSxjbGVhcldhdGNoOmZ1bmN0aW9uKGUpe3JldHVybiBuYXZpZ2F0b3IuYWNjZWxlcm9tZXRlci5jbGVhcldhdGNoKGUpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5kZXZpY2VPcmllbnRhdGlvblwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFEZXZpY2VPcmllbnRhdGlvblwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7dmFyIG49e2ZyZXF1ZW5jeTozZTN9O3JldHVybntnZXRDdXJyZW50SGVhZGluZzpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmNvbXBhc3M/KG5hdmlnYXRvci5jb21wYXNzLmdldEN1cnJlbnRIZWFkaW5nKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2UpOihuLnJlamVjdChcIk5vIGNvbXBhc3Mgb24gRGV2aWNlXCIpLG4ucHJvbWlzZSl9LHdhdGNoSGVhZGluZzpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7aWYoIW5hdmlnYXRvci5jb21wYXNzKXJldHVybiBvLnJlamVjdChcIk5vIGNvbXBhc3Mgb24gRGV2aWNlXCIpLG8ucHJvbWlzZTt2YXIgdD1hbmd1bGFyLmV4dGVuZChuLHIpLGk9bmF2aWdhdG9yLmNvbXBhc3Mud2F0Y2hIZWFkaW5nKGZ1bmN0aW9uKGUpe28ubm90aWZ5KGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0sdCk7cmV0dXJuIG8ucHJvbWlzZS5jYW5jZWw9ZnVuY3Rpb24oKXtuYXZpZ2F0b3IuY29tcGFzcy5jbGVhcldhdGNoKGkpfSxvLnByb21pc2UuY2xlYXJXYXRjaD1mdW5jdGlvbihlKXtuYXZpZ2F0b3IuY29tcGFzcy5jbGVhcldhdGNoKGV8fGkpfSxvLnByb21pc2Uud2F0Y2hJRD1pLG8ucHJvbWlzZX0sY2xlYXJXYXRjaDpmdW5jdGlvbihlKXtyZXR1cm4gbmF2aWdhdG9yLmNvbXBhc3MuY2xlYXJXYXRjaChlKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZGlhbG9nc1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFEaWFsb2dzXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybnthbGVydDpmdW5jdGlvbihyLG8sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiBuLm5hdmlnYXRvci5ub3RpZmljYXRpb24/bmF2aWdhdG9yLm5vdGlmaWNhdGlvbi5hbGVydChyLGZ1bmN0aW9uKCl7aS5yZXNvbHZlKCl9LG8sdCk6KG4uYWxlcnQociksaS5yZXNvbHZlKCkpLGkucHJvbWlzZX0sY29uZmlybTpmdW5jdGlvbihyLG8sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiBuLm5hdmlnYXRvci5ub3RpZmljYXRpb24/bmF2aWdhdG9yLm5vdGlmaWNhdGlvbi5jb25maXJtKHIsZnVuY3Rpb24oZSl7aS5yZXNvbHZlKGUpfSxvLHQpOm4uY29uZmlybShyKT9pLnJlc29sdmUoMSk6aS5yZXNvbHZlKDIpLGkucHJvbWlzZX0scHJvbXB0OmZ1bmN0aW9uKHIsbyx0LGkpe3ZhciBhPWUuZGVmZXIoKTtpZihuLm5hdmlnYXRvci5ub3RpZmljYXRpb24pbmF2aWdhdG9yLm5vdGlmaWNhdGlvbi5wcm9tcHQocixmdW5jdGlvbihlKXthLnJlc29sdmUoZSl9LG8sdCxpKTtlbHNle3ZhciBjPW4ucHJvbXB0KHIsaSk7bnVsbCE9PWM/YS5yZXNvbHZlKHtpbnB1dDE6YyxidXR0b25JbmRleDoxfSk6YS5yZXNvbHZlKHtpbnB1dDE6YyxidXR0b25JbmRleDoyfSl9cmV0dXJuIGEucHJvbWlzZX0sYmVlcDpmdW5jdGlvbihlKXtyZXR1cm4gbmF2aWdhdG9yLm5vdGlmaWNhdGlvbi5iZWVwKGUpfSxhY3Rpdml0eVN0YXJ0OmZ1bmN0aW9uKG4scil7dmFyIG89ZS5kZWZlcigpO3JldHVyblwiYW5kcm9pZFwiPT09Y29yZG92YS5wbGF0Zm9ybUlkPyhuYXZpZ2F0b3Iubm90aWZpY2F0aW9uLmFjdGl2aXR5U3RhcnQocixuKSxvLnJlc29sdmUoKSk6by5yZWplY3QobixyKSxvLnByb21pc2V9LGFjdGl2aXR5U3RvcDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm5cImFuZHJvaWRcIj09PWNvcmRvdmEucGxhdGZvcm1JZD8obmF2aWdhdG9yLm5vdGlmaWNhdGlvbi5hY3Rpdml0eVN0b3AoKSxuLnJlc29sdmUoKSk6bi5yZWplY3QoKSxuLnByb21pc2V9LHByb2dyZXNzU3RhcnQ6ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuXCJhbmRyb2lkXCI9PT1jb3Jkb3ZhLnBsYXRmb3JtSWQ/KG5hdmlnYXRvci5ub3RpZmljYXRpb24ucHJvZ3Jlc3NTdGFydChyLG4pLG8ucmVzb2x2ZSgpKTpvLnJlamVjdChuLHIpLG8ucHJvbWlzZX0scHJvZ3Jlc3NTdG9wOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVyblwiYW5kcm9pZFwiPT09Y29yZG92YS5wbGF0Zm9ybUlkPyhuYXZpZ2F0b3Iubm90aWZpY2F0aW9uLnByb2dyZXNzU3RvcCgpLG4ucmVzb2x2ZSgpKTpuLnJlamVjdCgpLG4ucHJvbWlzZX0scHJvZ3Jlc3NWYWx1ZTpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuXCJhbmRyb2lkXCI9PT1jb3Jkb3ZhLnBsYXRmb3JtSWQ/KG5hdmlnYXRvci5ub3RpZmljYXRpb24ucHJvZ3Jlc3NWYWx1ZShuKSxyLnJlc29sdmUoKSk6ci5yZWplY3Qobiksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5lbWFpbENvbXBvc2VyXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUVtYWlsQ29tcG9zZXJcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntpc0F2YWlsYWJsZTpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLmVtYWlsLmlzQXZhaWxhYmxlKGZ1bmN0aW9uKGUpe2U/bi5yZXNvbHZlKCk6bi5yZWplY3QoKX0pLG4ucHJvbWlzZX0sb3BlbjpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5lbWFpbC5vcGVuKG4sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxhZGRBbGlhczpmdW5jdGlvbihlLG4pe2NvcmRvdmEucGx1Z2lucy5lbWFpbC5hZGRBbGlhcyhlLG4pfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5mYWNlYm9va1wiLFtdKS5wcm92aWRlcihcIiRjb3Jkb3ZhRmFjZWJvb2tcIixbZnVuY3Rpb24oKXt0aGlzLmJyb3dzZXJJbml0PWZ1bmN0aW9uKGUsbil7dGhpcy5hcHBJRD1lLHRoaXMuYXBwVmVyc2lvbj1ufHxcInYyLjBcIixmYWNlYm9va0Nvbm5lY3RQbHVnaW4uYnJvd3NlckluaXQodGhpcy5hcHBJRCx0aGlzLmFwcFZlcnNpb24pfSx0aGlzLiRnZXQ9W1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57bG9naW46ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBmYWNlYm9va0Nvbm5lY3RQbHVnaW4ubG9naW4obixmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxzaG93RGlhbG9nOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gZmFjZWJvb2tDb25uZWN0UGx1Z2luLnNob3dEaWFsb2cobixmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxhcGk6ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIGZhY2Vib29rQ29ubmVjdFBsdWdpbi5hcGkobixyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGdldEFjY2Vzc1Rva2VuOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBmYWNlYm9va0Nvbm5lY3RQbHVnaW4uZ2V0QWNjZXNzVG9rZW4oZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sZ2V0TG9naW5TdGF0dXM6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGZhY2Vib29rQ29ubmVjdFBsdWdpbi5nZXRMb2dpblN0YXR1cyhmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxsb2dvdXQ6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGZhY2Vib29rQ29ubmVjdFBsdWdpbi5sb2dvdXQoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX19fV19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5mYWNlYm9va0Fkc1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFGYWNlYm9va0Fkc1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57c2V0T3B0aW9uczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uRmFjZWJvb2tBZHMuc2V0T3B0aW9ucyhyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sY3JlYXRlQmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5GYWNlYm9va0Fkcy5jcmVhdGVCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHJlbW92ZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5GYWNlYm9va0Fkcy5yZW1vdmVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxzaG93QmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5GYWNlYm9va0Fkcy5zaG93QmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93QmFubmVyQXRYWTpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi5GYWNlYm9va0Fkcy5zaG93QmFubmVyQXRYWShyLG8sZnVuY3Rpb24oKXt0LnJlc29sdmUoKX0sZnVuY3Rpb24oKXt0LnJlamVjdCgpfSksdC5wcm9taXNlfSxoaWRlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLkZhY2Vib29rQWRzLmhpZGVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxwcmVwYXJlSW50ZXJzdGl0aWFsOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5GYWNlYm9va0Fkcy5wcmVwYXJlSW50ZXJzdGl0aWFsKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93SW50ZXJzdGl0aWFsOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLkZhY2Vib29rQWRzLnNob3dJbnRlcnN0aXRpYWwoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtcbnIucmVqZWN0KCl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmZpbGVcIixbXSkuY29uc3RhbnQoXCIkY29yZG92YUZpbGVFcnJvclwiLHsxOlwiTk9UX0ZPVU5EX0VSUlwiLDI6XCJTRUNVUklUWV9FUlJcIiwzOlwiQUJPUlRfRVJSXCIsNDpcIk5PVF9SRUFEQUJMRV9FUlJcIiw1OlwiRU5DT0RJTkdfRVJSXCIsNjpcIk5PX01PRElGSUNBVElPTl9BTExPV0VEX0VSUlwiLDc6XCJJTlZBTElEX1NUQVRFX0VSUlwiLDg6XCJTWU5UQVhfRVJSXCIsOTpcIklOVkFMSURfTU9ESUZJQ0FUSU9OX0VSUlwiLDEwOlwiUVVPVEFfRVhDRUVERURfRVJSXCIsMTE6XCJUWVBFX01JU01BVENIX0VSUlwiLDEyOlwiUEFUSF9FWElTVFNfRVJSXCJ9KS5wcm92aWRlcihcIiRjb3Jkb3ZhRmlsZVwiLFtmdW5jdGlvbigpe3RoaXMuJGdldD1bXCIkcVwiLFwiJHdpbmRvd1wiLFwiJGNvcmRvdmFGaWxlRXJyb3JcIixmdW5jdGlvbihlLG4scil7cmV0dXJue2dldEZyZWVEaXNrU3BhY2U6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEuZXhlYyhmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSxcIkZpbGVcIixcImdldEZyZWVEaXNrU3BhY2VcIixbXSksbi5wcm9taXNlfSxjaGVja0RpcjpmdW5jdGlvbihvLHQpe3ZhciBpPWUuZGVmZXIoKTsvXlxcLy8udGVzdCh0KSYmaS5yZWplY3QoXCJkaXJlY3RvcnkgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7dmFyIGE9byt0O24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChhLGZ1bmN0aW9uKGUpe2UuaXNEaXJlY3Rvcnk9PT0hMD9pLnJlc29sdmUoZSk6aS5yZWplY3Qoe2NvZGU6MTMsbWVzc2FnZTpcImlucHV0IGlzIG5vdCBhIGRpcmVjdG9yeVwifSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX1jYXRjaChjKXtjLm1lc3NhZ2U9cltjLmNvZGVdLGkucmVqZWN0KGMpfXJldHVybiBpLnByb21pc2V9LGNoZWNrRmlsZTpmdW5jdGlvbihvLHQpe3ZhciBpPWUuZGVmZXIoKTsvXlxcLy8udGVzdCh0KSYmaS5yZWplY3QoXCJkaXJlY3RvcnkgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7dmFyIGE9byt0O24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChhLGZ1bmN0aW9uKGUpe2UuaXNGaWxlPT09ITA/aS5yZXNvbHZlKGUpOmkucmVqZWN0KHtjb2RlOjEzLG1lc3NhZ2U6XCJpbnB1dCBpcyBub3QgYSBmaWxlXCJ9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfWNhdGNoKGMpe2MubWVzc2FnZT1yW2MuY29kZV0saS5yZWplY3QoYyl9cmV0dXJuIGkucHJvbWlzZX0sY3JlYXRlRGlyOmZ1bmN0aW9uKG8sdCxpKXt2YXIgYT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmEucmVqZWN0KFwiZGlyZWN0b3J5IGNhbm5vdCBzdGFydCB3aXRoIC9cIiksaT1pPyExOiEwO3ZhciBjPXtjcmVhdGU6ITAsZXhjbHVzaXZlOml9O3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwobyxmdW5jdGlvbihlKXtlLmdldERpcmVjdG9yeSh0LGMsZnVuY3Rpb24oZSl7YS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGEucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYS5yZWplY3QoZSl9KX1jYXRjaCh1KXt1Lm1lc3NhZ2U9clt1LmNvZGVdLGEucmVqZWN0KHUpfXJldHVybiBhLnByb21pc2V9LGNyZWF0ZUZpbGU6ZnVuY3Rpb24obyx0LGkpe3ZhciBhPWUuZGVmZXIoKTsvXlxcLy8udGVzdCh0KSYmYS5yZWplY3QoXCJmaWxlLW5hbWUgY2Fubm90IHN0YXJ0IHdpdGggL1wiKSxpPWk/ITE6ITA7dmFyIGM9e2NyZWF0ZTohMCxleGNsdXNpdmU6aX07dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChvLGZ1bmN0aW9uKGUpe2UuZ2V0RmlsZSh0LGMsZnVuY3Rpb24oZSl7YS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGEucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYS5yZWplY3QoZSl9KX1jYXRjaCh1KXt1Lm1lc3NhZ2U9clt1LmNvZGVdLGEucmVqZWN0KHUpfXJldHVybiBhLnByb21pc2V9LHJlbW92ZURpcjpmdW5jdGlvbihvLHQpe3ZhciBpPWUuZGVmZXIoKTsvXlxcLy8udGVzdCh0KSYmaS5yZWplY3QoXCJmaWxlLW5hbWUgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKG8sZnVuY3Rpb24oZSl7ZS5nZXREaXJlY3RvcnkodCx7Y3JlYXRlOiExfSxmdW5jdGlvbihlKXtlLnJlbW92ZShmdW5jdGlvbigpe2kucmVzb2x2ZSh7c3VjY2VzczohMCxmaWxlUmVtb3ZlZDplfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9Y2F0Y2goYSl7YS5tZXNzYWdlPXJbYS5jb2RlXSxpLnJlamVjdChhKX1yZXR1cm4gaS5wcm9taXNlfSxyZW1vdmVGaWxlOmZ1bmN0aW9uKG8sdCl7dmFyIGk9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZpLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwobyxmdW5jdGlvbihlKXtlLmdldEZpbGUodCx7Y3JlYXRlOiExfSxmdW5jdGlvbihlKXtlLnJlbW92ZShmdW5jdGlvbigpe2kucmVzb2x2ZSh7c3VjY2VzczohMCxmaWxlUmVtb3ZlZDplfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9Y2F0Y2goYSl7YS5tZXNzYWdlPXJbYS5jb2RlXSxpLnJlamVjdChhKX1yZXR1cm4gaS5wcm9taXNlfSxyZW1vdmVSZWN1cnNpdmVseTpmdW5jdGlvbihvLHQpe3ZhciBpPWUuZGVmZXIoKTsvXlxcLy8udGVzdCh0KSYmaS5yZWplY3QoXCJmaWxlLW5hbWUgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKG8sZnVuY3Rpb24oZSl7ZS5nZXREaXJlY3RvcnkodCx7Y3JlYXRlOiExfSxmdW5jdGlvbihlKXtlLnJlbW92ZVJlY3Vyc2l2ZWx5KGZ1bmN0aW9uKCl7aS5yZXNvbHZlKHtzdWNjZXNzOiEwLGZpbGVSZW1vdmVkOmV9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX1jYXRjaChhKXthLm1lc3NhZ2U9clthLmNvZGVdLGkucmVqZWN0KGEpfXJldHVybiBpLnByb21pc2V9LHdyaXRlRmlsZTpmdW5jdGlvbihvLHQsaSxhKXt2YXIgYz1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmMucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIiksYT1hPyExOiEwO3ZhciB1PXtjcmVhdGU6ITAsZXhjbHVzaXZlOmF9O3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwobyxmdW5jdGlvbihlKXtlLmdldEZpbGUodCx1LGZ1bmN0aW9uKGUpe2UuY3JlYXRlV3JpdGVyKGZ1bmN0aW9uKGUpe3UuYXBwZW5kPT09ITAmJmUuc2VlayhlLmxlbmd0aCksdS50cnVuY2F0ZSYmZS50cnVuY2F0ZSh1LnRydW5jYXRlKSxlLm9ud3JpdGVlbmQ9ZnVuY3Rpb24oZSl7dGhpcy5lcnJvcj9jLnJlamVjdCh0aGlzLmVycm9yKTpjLnJlc29sdmUoZSl9LGUud3JpdGUoaSksYy5wcm9taXNlLmFib3J0PWZ1bmN0aW9uKCl7ZS5hYm9ydCgpfX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGMucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYy5yZWplY3QoZSl9KX1jYXRjaChzKXtzLm1lc3NhZ2U9cltzLmNvZGVdLGMucmVqZWN0KHMpfXJldHVybiBjLnByb21pc2V9LHdyaXRlRXhpc3RpbmdGaWxlOmZ1bmN0aW9uKG8sdCxpKXt2YXIgYT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmEucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChvLGZ1bmN0aW9uKGUpe2UuZ2V0RmlsZSh0LHtjcmVhdGU6ITF9LGZ1bmN0aW9uKGUpe2UuY3JlYXRlV3JpdGVyKGZ1bmN0aW9uKGUpe2Uuc2VlayhlLmxlbmd0aCksZS5vbndyaXRlZW5kPWZ1bmN0aW9uKGUpe3RoaXMuZXJyb3I/YS5yZWplY3QodGhpcy5lcnJvcik6YS5yZXNvbHZlKGUpfSxlLndyaXRlKGkpLGEucHJvbWlzZS5hYm9ydD1mdW5jdGlvbigpe2UuYWJvcnQoKX19KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxhLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGEucmVqZWN0KGUpfSl9Y2F0Y2goYyl7Yy5tZXNzYWdlPXJbYy5jb2RlXSxhLnJlamVjdChjKX1yZXR1cm4gYS5wcm9taXNlfSxyZWFkQXNUZXh0OmZ1bmN0aW9uKG8sdCl7dmFyIGk9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZpLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwobyxmdW5jdGlvbihlKXtlLmdldEZpbGUodCx7Y3JlYXRlOiExfSxmdW5jdGlvbihlKXtlLmZpbGUoZnVuY3Rpb24oZSl7dmFyIG49bmV3IEZpbGVSZWFkZXI7bi5vbmxvYWRlbmQ9ZnVuY3Rpb24oZSl7dm9pZCAwIT09ZS50YXJnZXQucmVzdWx0fHxudWxsIT09ZS50YXJnZXQucmVzdWx0P2kucmVzb2x2ZShlLnRhcmdldC5yZXN1bHQpOnZvaWQgMCE9PWUudGFyZ2V0LmVycm9yfHxudWxsIT09ZS50YXJnZXQuZXJyb3I/aS5yZWplY3QoZS50YXJnZXQuZXJyb3IpOmkucmVqZWN0KHtjb2RlOm51bGwsbWVzc2FnZTpcIlJFQURFUl9PTkxPQURFTkRfRVJSXCJ9KX0sbi5yZWFkQXNUZXh0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfWNhdGNoKGEpe2EubWVzc2FnZT1yW2EuY29kZV0saS5yZWplY3QoYSl9cmV0dXJuIGkucHJvbWlzZX0scmVhZEFzRGF0YVVSTDpmdW5jdGlvbihvLHQpe3ZhciBpPWUuZGVmZXIoKTsvXlxcLy8udGVzdCh0KSYmaS5yZWplY3QoXCJmaWxlLW5hbWUgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKG8sZnVuY3Rpb24oZSl7ZS5nZXRGaWxlKHQse2NyZWF0ZTohMX0sZnVuY3Rpb24oZSl7ZS5maWxlKGZ1bmN0aW9uKGUpe3ZhciBuPW5ldyBGaWxlUmVhZGVyO24ub25sb2FkZW5kPWZ1bmN0aW9uKGUpe3ZvaWQgMCE9PWUudGFyZ2V0LnJlc3VsdHx8bnVsbCE9PWUudGFyZ2V0LnJlc3VsdD9pLnJlc29sdmUoZS50YXJnZXQucmVzdWx0KTp2b2lkIDAhPT1lLnRhcmdldC5lcnJvcnx8bnVsbCE9PWUudGFyZ2V0LmVycm9yP2kucmVqZWN0KGUudGFyZ2V0LmVycm9yKTppLnJlamVjdCh7Y29kZTpudWxsLG1lc3NhZ2U6XCJSRUFERVJfT05MT0FERU5EX0VSUlwifSl9LG4ucmVhZEFzRGF0YVVSTChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX1jYXRjaChhKXthLm1lc3NhZ2U9clthLmNvZGVdLGkucmVqZWN0KGEpfXJldHVybiBpLnByb21pc2V9LHJlYWRBc0JpbmFyeVN0cmluZzpmdW5jdGlvbihvLHQpe3ZhciBpPWUuZGVmZXIoKTsvXlxcLy8udGVzdCh0KSYmaS5yZWplY3QoXCJmaWxlLW5hbWUgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKG8sZnVuY3Rpb24oZSl7ZS5nZXRGaWxlKHQse2NyZWF0ZTohMX0sZnVuY3Rpb24oZSl7ZS5maWxlKGZ1bmN0aW9uKGUpe3ZhciBuPW5ldyBGaWxlUmVhZGVyO24ub25sb2FkZW5kPWZ1bmN0aW9uKGUpe3ZvaWQgMCE9PWUudGFyZ2V0LnJlc3VsdHx8bnVsbCE9PWUudGFyZ2V0LnJlc3VsdD9pLnJlc29sdmUoZS50YXJnZXQucmVzdWx0KTp2b2lkIDAhPT1lLnRhcmdldC5lcnJvcnx8bnVsbCE9PWUudGFyZ2V0LmVycm9yP2kucmVqZWN0KGUudGFyZ2V0LmVycm9yKTppLnJlamVjdCh7Y29kZTpudWxsLG1lc3NhZ2U6XCJSRUFERVJfT05MT0FERU5EX0VSUlwifSl9LG4ucmVhZEFzQmluYXJ5U3RyaW5nKGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfWNhdGNoKGEpe2EubWVzc2FnZT1yW2EuY29kZV0saS5yZWplY3QoYSl9cmV0dXJuIGkucHJvbWlzZX0scmVhZEFzQXJyYXlCdWZmZXI6ZnVuY3Rpb24obyx0KXt2YXIgaT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmkucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChvLGZ1bmN0aW9uKGUpe2UuZ2V0RmlsZSh0LHtjcmVhdGU6ITF9LGZ1bmN0aW9uKGUpe2UuZmlsZShmdW5jdGlvbihlKXt2YXIgbj1uZXcgRmlsZVJlYWRlcjtuLm9ubG9hZGVuZD1mdW5jdGlvbihlKXt2b2lkIDAhPT1lLnRhcmdldC5yZXN1bHR8fG51bGwhPT1lLnRhcmdldC5yZXN1bHQ/aS5yZXNvbHZlKGUudGFyZ2V0LnJlc3VsdCk6dm9pZCAwIT09ZS50YXJnZXQuZXJyb3J8fG51bGwhPT1lLnRhcmdldC5lcnJvcj9pLnJlamVjdChlLnRhcmdldC5lcnJvcik6aS5yZWplY3Qoe2NvZGU6bnVsbCxtZXNzYWdlOlwiUkVBREVSX09OTE9BREVORF9FUlJcIn0pfSxuLnJlYWRBc0FycmF5QnVmZmVyKGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfWNhdGNoKGEpe2EubWVzc2FnZT1yW2EuY29kZV0saS5yZWplY3QoYSl9cmV0dXJuIGkucHJvbWlzZX0sbW92ZUZpbGU6ZnVuY3Rpb24ocixvLHQsaSl7dmFyIGE9ZS5kZWZlcigpO2k9aXx8bywoL15cXC8vLnRlc3Qobyl8fC9eXFwvLy50ZXN0KGkpKSYmYS5yZWplY3QoXCJmaWxlLW5hbWUgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKHIsZnVuY3Rpb24oZSl7ZS5nZXRGaWxlKG8se2NyZWF0ZTohMX0sZnVuY3Rpb24oZSl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKHQsZnVuY3Rpb24obil7ZS5tb3ZlVG8obixpLGZ1bmN0aW9uKGUpe2EucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7YS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7YS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7YS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7YS5yZWplY3QoZSl9KX1jYXRjaChjKXthLnJlamVjdChjKX1yZXR1cm4gYS5wcm9taXNlfSxtb3ZlRGlyOmZ1bmN0aW9uKHIsbyx0LGkpe3ZhciBhPWUuZGVmZXIoKTtpPWl8fG8sKC9eXFwvLy50ZXN0KG8pfHwvXlxcLy8udGVzdChpKSkmJmEucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChyLGZ1bmN0aW9uKGUpe2UuZ2V0RGlyZWN0b3J5KG8se2NyZWF0ZTohMX0sZnVuY3Rpb24oZSl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKHQsZnVuY3Rpb24obil7ZS5tb3ZlVG8obixpLGZ1bmN0aW9uKGUpe2EucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7YS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7YS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7YS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7YS5yZWplY3QoZSl9KX1jYXRjaChjKXthLnJlamVjdChjKX1yZXR1cm4gYS5wcm9taXNlfSxjb3B5RGlyOmZ1bmN0aW9uKG8sdCxpLGEpe3ZhciBjPWUuZGVmZXIoKTthPWF8fHQsKC9eXFwvLy50ZXN0KHQpfHwvXlxcLy8udGVzdChhKSkmJmMucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChvLGZ1bmN0aW9uKGUpe2UuZ2V0RGlyZWN0b3J5KHQse2NyZWF0ZTohMSxleGNsdXNpdmU6ITF9LGZ1bmN0aW9uKGUpe24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChpLGZ1bmN0aW9uKG4pe2UuY29weVRvKG4sYSxmdW5jdGlvbihlKXtjLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYy5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxjLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGMucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYy5yZWplY3QoZSl9KX1jYXRjaCh1KXt1Lm1lc3NhZ2U9clt1LmNvZGVdLGMucmVqZWN0KHUpfXJldHVybiBjLnByb21pc2V9LGNvcHlGaWxlOmZ1bmN0aW9uKG8sdCxpLGEpe3ZhciBjPWUuZGVmZXIoKTthPWF8fHQsL15cXC8vLnRlc3QodCkmJmMucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChvLGZ1bmN0aW9uKGUpe2UuZ2V0RmlsZSh0LHtjcmVhdGU6ITEsZXhjbHVzaXZlOiExfSxmdW5jdGlvbihlKXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwoaSxmdW5jdGlvbihuKXtlLmNvcHlUbyhuLGEsZnVuY3Rpb24oZSl7Yy5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGMucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYy5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxjLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGMucmVqZWN0KGUpfSl9Y2F0Y2godSl7dS5tZXNzYWdlPXJbdS5jb2RlXSxjLnJlamVjdCh1KX1yZXR1cm4gYy5wcm9taXNlfSxyZWFkRmlsZU1ldGFkYXRhOmZ1bmN0aW9uKG8sdCl7dmFyIGk9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZpLnJlamVjdChcImRpcmVjdG9yeSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXt2YXIgYT1vK3Q7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKGEsZnVuY3Rpb24oZSl7ZS5maWxlKGZ1bmN0aW9uKGUpe2kucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9Y2F0Y2goYyl7Yy5tZXNzYWdlPXJbYy5jb2RlXSxpLnJlamVjdChjKX1yZXR1cm4gaS5wcm9taXNlfX19XX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmZpbGVPcGVuZXIyXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUZpbGVPcGVuZXIyXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57b3BlbjpmdW5jdGlvbihuLHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLmZpbGVPcGVuZXIyLm9wZW4obixyLHtlcnJvcjpmdW5jdGlvbihlKXtvLnJlamVjdChlKX0sc3VjY2VzczpmdW5jdGlvbigpe28ucmVzb2x2ZSgpfX0pLG8ucHJvbWlzZX0sdW5pbnN0YWxsOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLmZpbGVPcGVuZXIyLnVuaW5zdGFsbChuLHtlcnJvcjpmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sc3VjY2VzczpmdW5jdGlvbigpe3IucmVzb2x2ZSgpfX0pLHIucHJvbWlzZX0sYXBwSXNJbnN0YWxsZWQ6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuZmlsZU9wZW5lcjIuYXBwSXNJbnN0YWxsZWQobix7c3VjY2VzczpmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9fSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5maWxlVHJhbnNmZXJcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhRmlsZVRyYW5zZmVyXCIsW1wiJHFcIixcIiR0aW1lb3V0XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57ZG93bmxvYWQ6ZnVuY3Rpb24ocixvLHQsaSl7dmFyIGE9ZS5kZWZlcigpLGM9bmV3IEZpbGVUcmFuc2Zlcix1PXQmJnQuZW5jb2RlVVJJPT09ITE/cjplbmNvZGVVUkkocik7cmV0dXJuIHQmJnZvaWQgMCE9PXQudGltZW91dCYmbnVsbCE9PXQudGltZW91dCYmKG4oZnVuY3Rpb24oKXtjLmFib3J0KCl9LHQudGltZW91dCksdC50aW1lb3V0PW51bGwpLGMub25wcm9ncmVzcz1mdW5jdGlvbihlKXthLm5vdGlmeShlKX0sYS5wcm9taXNlLmFib3J0PWZ1bmN0aW9uKCl7Yy5hYm9ydCgpfSxjLmRvd25sb2FkKHUsbyxhLnJlc29sdmUsYS5yZWplY3QsaSx0KSxhLnByb21pc2V9LHVwbG9hZDpmdW5jdGlvbihyLG8sdCxpKXt2YXIgYT1lLmRlZmVyKCksYz1uZXcgRmlsZVRyYW5zZmVyLHU9dCYmdC5lbmNvZGVVUkk9PT0hMT9yOmVuY29kZVVSSShyKTtyZXR1cm4gdCYmdm9pZCAwIT09dC50aW1lb3V0JiZudWxsIT09dC50aW1lb3V0JiYobihmdW5jdGlvbigpe2MuYWJvcnQoKX0sdC50aW1lb3V0KSx0LnRpbWVvdXQ9bnVsbCksYy5vbnByb2dyZXNzPWZ1bmN0aW9uKGUpe2Eubm90aWZ5KGUpfSxhLnByb21pc2UuYWJvcnQ9ZnVuY3Rpb24oKXtjLmFib3J0KCl9LGMudXBsb2FkKG8sdSxhLnJlc29sdmUsYS5yZWplY3QsdCxpKSxhLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmZsYXNobGlnaHRcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhRmxhc2hsaWdodFwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57YXZhaWxhYmxlOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuZmxhc2hsaWdodC5hdmFpbGFibGUoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSksci5wcm9taXNlfSxzd2l0Y2hPbjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmZsYXNobGlnaHQuc3dpdGNoT24oZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sc3dpdGNoT2ZmOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuZmxhc2hsaWdodC5zd2l0Y2hPZmYoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sdG9nZ2xlOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuZmxhc2hsaWdodC50b2dnbGUoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmx1cnJ5QWRzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUZsdXJyeUFkc1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57c2V0T3B0aW9uczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uRmx1cnJ5QWRzLnNldE9wdGlvbnMocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LGNyZWF0ZUJhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uRmx1cnJ5QWRzLmNyZWF0ZUJhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0scmVtb3ZlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLkZsdXJyeUFkcy5yZW1vdmVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxzaG93QmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5GbHVycnlBZHMuc2hvd0Jhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0Jhbm5lckF0WFk6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4uRmx1cnJ5QWRzLnNob3dCYW5uZXJBdFhZKHIsbyxmdW5jdGlvbigpe3QucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3QucmVqZWN0KCl9KSx0LnByb21pc2V9LGhpZGVCYW5uZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uRmx1cnJ5QWRzLmhpZGVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxwcmVwYXJlSW50ZXJzdGl0aWFsOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5GbHVycnlBZHMucHJlcGFyZUludGVyc3RpdGlhbChyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0ludGVyc3RpdGlhbDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5GbHVycnlBZHMuc2hvd0ludGVyc3RpdGlhbChmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmdhXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUdBXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntpbml0OmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBvPW8+PTA/bzoxMCxuLnBsdWdpbnMuZ2FQbHVnaW4uaW5pdChmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSxyLG8pLHQucHJvbWlzZX0sdHJhY2tFdmVudDpmdW5jdGlvbihyLG8sdCxpLGEsYyl7dmFyIHU9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuZ2FQbHVnaW4udHJhY2tFdmVudChmdW5jdGlvbihlKXt1LnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3UucmVqZWN0KGUpfSx0LGksYSxjKSx1LnByb21pc2V9LHRyYWNrUGFnZTpmdW5jdGlvbihyLG8sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuZ2FQbHVnaW4udHJhY2tQYWdlKGZ1bmN0aW9uKGUpe2kucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7aS5yZWplY3QoZSl9LHQpLGkucHJvbWlzZX0sc2V0VmFyaWFibGU6ZnVuY3Rpb24ocixvLHQsaSl7dmFyIGE9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuZ2FQbHVnaW4uc2V0VmFyaWFibGUoZnVuY3Rpb24oZSl7YS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXthLnJlamVjdChlKX0sdCxpKSxhLnByb21pc2V9LGV4aXQ6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5nYVBsdWdpbi5leGl0KGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmdlb2xvY2F0aW9uXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUdlb2xvY2F0aW9uXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57Z2V0Q3VycmVudFBvc2l0aW9uOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKSxyLnByb21pc2V9LHdhdGNoUG9zaXRpb246ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpLG89bmF2aWdhdG9yLmdlb2xvY2F0aW9uLndhdGNoUG9zaXRpb24oZnVuY3Rpb24oZSl7ci5ub3RpZnkoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKTtyZXR1cm4gci5wcm9taXNlLmNhbmNlbD1mdW5jdGlvbigpe25hdmlnYXRvci5nZW9sb2NhdGlvbi5jbGVhcldhdGNoKG8pfSxyLnByb21pc2UuY2xlYXJXYXRjaD1mdW5jdGlvbihlKXtuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uY2xlYXJXYXRjaChlfHxvKX0sci5wcm9taXNlLndhdGNoSUQ9byxyLnByb21pc2V9LGNsZWFyV2F0Y2g6ZnVuY3Rpb24oZSl7cmV0dXJuIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5jbGVhcldhdGNoKGUpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5nbG9iYWxpemF0aW9uXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUdsb2JhbGl6YXRpb25cIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntnZXRQcmVmZXJyZWRMYW5ndWFnZTpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmdsb2JhbGl6YXRpb24uZ2V0UHJlZmVycmVkTGFuZ3VhZ2UoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sZ2V0TG9jYWxlTmFtZTpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmdsb2JhbGl6YXRpb24uZ2V0TG9jYWxlTmFtZShmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxnZXRGaXJzdERheU9mV2VlazpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmdsb2JhbGl6YXRpb24uZ2V0Rmlyc3REYXlPZldlZWsoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sZGF0ZVRvU3RyaW5nOmZ1bmN0aW9uKG4scil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZ2xvYmFsaXphdGlvbi5kYXRlVG9TdHJpbmcobixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSxyKSxvLnByb21pc2V9LHN0cmluZ1RvRGF0ZTpmdW5jdGlvbihuLHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmdsb2JhbGl6YXRpb24uc3RyaW5nVG9EYXRlKG4sZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0sciksby5wcm9taXNlfSxnZXREYXRlUGF0dGVybjpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLmdldERhdGVQYXR0ZXJuKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LG4pLHIucHJvbWlzZX0sZ2V0RGF0ZU5hbWVzOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmdsb2JhbGl6YXRpb24uZ2V0RGF0ZU5hbWVzKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LG4pLHIucHJvbWlzZX0saXNEYXlMaWdodFNhdmluZ3NUaW1lOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmdsb2JhbGl6YXRpb24uaXNEYXlMaWdodFNhdmluZ3NUaW1lKG4sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sbnVtYmVyVG9TdHJpbmc6ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLm51bWJlclRvU3RyaW5nKG4sZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0sciksby5wcm9taXNlfSxzdHJpbmdUb051bWJlcjpmdW5jdGlvbihuLHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmdsb2JhbGl6YXRpb24uc3RyaW5nVG9OdW1iZXIobixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSxyKSxvLnByb21pc2V9LGdldE51bWJlclBhdHRlcm46ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZ2xvYmFsaXphdGlvbi5nZXROdW1iZXJQYXR0ZXJuKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LG4pLHIucHJvbWlzZX0sZ2V0Q3VycmVuY3lQYXR0ZXJuOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmdsb2JhbGl6YXRpb24uZ2V0Q3VycmVuY3lQYXR0ZXJuKG4sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ29vZ2xlQWRzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUdvb2dsZUFkc1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57c2V0T3B0aW9uczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uQWRNb2Iuc2V0T3B0aW9ucyhyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sY3JlYXRlQmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5BZE1vYi5jcmVhdGVCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHJlbW92ZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5BZE1vYi5yZW1vdmVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxzaG93QmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5BZE1vYi5zaG93QmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93QmFubmVyQXRYWTpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi5BZE1vYi5zaG93QmFubmVyQXRYWShyLG8sZnVuY3Rpb24oKXt0LnJlc29sdmUoKX0sZnVuY3Rpb24oKXt0LnJlamVjdCgpfSksdC5wcm9taXNlfSxoaWRlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLkFkTW9iLmhpZGVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxwcmVwYXJlSW50ZXJzdGl0aWFsOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5BZE1vYi5wcmVwYXJlSW50ZXJzdGl0aWFsKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93SW50ZXJzdGl0aWFsOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLkFkTW9iLnNob3dJbnRlcnN0aXRpYWwoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5nb29nbGVBbmFseXRpY3NcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhR29vZ2xlQW5hbHl0aWNzXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntzdGFydFRyYWNrZXJXaXRoSWQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmFuYWx5dGljcy5zdGFydFRyYWNrZXJXaXRoSWQocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxzZXRVc2VySWQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmFuYWx5dGljcy5zZXRVc2VySWQocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxkZWJ1Z01vZGU6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYW5hbHl0aWNzLmRlYnVnTW9kZShmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0sdHJhY2tWaWV3OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5hbmFseXRpY3MudHJhY2tWaWV3KHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sYWRkQ3VzdG9tRGltZW5zaW9uOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpLGk9cGFyc2VJbnQociwxMCk7cmV0dXJuIGlzTmFOKGkpJiZ0LnJlamVjdCgnUGFyYW1ldGVyIFwia2V5XCIgbXVzdCBiZSBhbiBpbnRlZ2VyLicpLG4uYW5hbHl0aWNzLmFkZEN1c3RvbURpbWVuc2lvbihpLG8sZnVuY3Rpb24oKXt0LnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7dC5yZWplY3QoZSl9KSx0LnByb21pc2V9LHRyYWNrRXZlbnQ6ZnVuY3Rpb24ocixvLHQsaSl7dmFyIGE9ZS5kZWZlcigpO3JldHVybiBuLmFuYWx5dGljcy50cmFja0V2ZW50KHIsbyx0LGksZnVuY3Rpb24oZSl7YS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXthLnJlamVjdChlKX0pLGEucHJvbWlzZX0sdHJhY2tFeGNlcHRpb246ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4uYW5hbHl0aWNzLnRyYWNrRXhjZXB0aW9uKHIsbyxmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSksdC5wcm9taXNlfSx0cmFja1RpbWluZzpmdW5jdGlvbihyLG8sdCxpKXt2YXIgYT1lLmRlZmVyKCk7cmV0dXJuIG4uYW5hbHl0aWNzLnRyYWNrVGltaW5nKHIsbyx0LGksZnVuY3Rpb24oZSl7YS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXthLnJlamVjdChlKX0pLGEucHJvbWlzZX0sYWRkVHJhbnNhY3Rpb246ZnVuY3Rpb24ocixvLHQsaSxhLGMpe3ZhciB1PWUuZGVmZXIoKTtyZXR1cm4gbi5hbmFseXRpY3MuYWRkVHJhbnNhY3Rpb24ocixvLHQsaSxhLGMsZnVuY3Rpb24oZSl7dS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt1LnJlamVjdChlKX0pLHUucHJvbWlzZX0sYWRkVHJhbnNhY3Rpb25JdGVtOmZ1bmN0aW9uKHIsbyx0LGksYSxjLHUpe3ZhciBzPWUuZGVmZXIoKTtyZXR1cm4gbi5hbmFseXRpY3MuYWRkVHJhbnNhY3Rpb25JdGVtKHIsbyx0LGksYSxjLHUsZnVuY3Rpb24oZSl7cy5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtzLnJlamVjdChlKX0pLHMucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ29vZ2xlTWFwXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUdvb2dsZU1hcFwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXt2YXIgcj1udWxsO3JldHVybntnZXRNYXA6ZnVuY3Rpb24obyl7dmFyIHQ9ZS5kZWZlcigpO2lmKG4ucGx1Z2luLmdvb2dsZS5tYXBzKXt2YXIgaT1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1hcF9jYW52YXNcIik7cj1uLnBsdWdpbi5nb29nbGUubWFwcy5NYXAuZ2V0TWFwKG8pLHIuc2V0RGl2KGkpLHQucmVzb2x2ZShyKX1lbHNlIHQucmVqZWN0KG51bGwpO3JldHVybiB0LnByb21pc2V9LGlzTWFwTG9hZGVkOmZ1bmN0aW9uKCl7cmV0dXJuISFyfSxhZGRNYXJrZXI6ZnVuY3Rpb24obil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByLmFkZE1hcmtlcihuLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0pLG8ucHJvbWlzZX0sZ2V0TWFwVHlwZUlkczpmdW5jdGlvbigpe3JldHVybiBuLnBsdWdpbi5nb29nbGUubWFwcy5tYXBUeXBlSWR9LHNldFZpc2libGU6ZnVuY3Rpb24obil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByLnNldFZpc2libGUobiksby5wcm9taXNlfSxjbGVhbnVwOmZ1bmN0aW9uKCl7cj1udWxsfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5nb29nbGVQbGF5R2FtZVwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFHb29nbGVQbGF5R2FtZVwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2F1dGg6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGdvb2dsZXBsYXlnYW1lLmF1dGgoZnVuY3Rpb24oZSl7cmV0dXJuIG4ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7cmV0dXJuIG4ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxzaWdub3V0OmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBnb29nbGVwbGF5Z2FtZS5zaWdub3V0KGZ1bmN0aW9uKGUpe3JldHVybiBuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3JldHVybiBuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0saXNTaWduZWRJbjpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gZ29vZ2xlcGxheWdhbWUuaXNTaWduZWRJbihmdW5jdGlvbihlKXtyZXR1cm4gbi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyZXR1cm4gbi5yZWplY3QoZSl9KSxuLnByb21pc2V9LHNob3dQbGF5ZXI6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGdvb2dsZXBsYXlnYW1lLnNob3dQbGF5ZXIoZnVuY3Rpb24oZSl7cmV0dXJuIG4ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7cmV0dXJuIG4ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxzdWJtaXRTY29yZTpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGdvb2dsZXBsYXlnYW1lLnN1Ym1pdFNjb3JlKG4sZnVuY3Rpb24oZSl7cmV0dXJuIHIucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7cmV0dXJuIHIucmVqZWN0KGUpfSksci5wcm9taXNlfSxzaG93QWxsTGVhZGVyYm9hcmRzOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBnb29nbGVwbGF5Z2FtZS5zaG93QWxsTGVhZGVyYm9hcmRzKGZ1bmN0aW9uKGUpe3JldHVybiBuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3JldHVybiBuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sc2hvd0xlYWRlcmJvYXJkOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gZ29vZ2xlcGxheWdhbWUuc2hvd0xlYWRlcmJvYXJkKG4sZnVuY3Rpb24oZSl7cmV0dXJuIHIucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7cmV0dXJuIHIucmVqZWN0KGUpfSksci5wcm9taXNlfSx1bmxvY2tBY2hpZXZlbWVudDpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGdvb2dsZXBsYXlnYW1lLnVubG9ja0FjaGlldmVtZW50KG4sZnVuY3Rpb24oZSl7cmV0dXJuIHIucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7cmV0dXJuIHIucmVqZWN0KGUpfSksci5wcm9taXNlfSxpbmNyZW1lbnRBY2hpZXZlbWVudDpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGdvb2dsZXBsYXlnYW1lLmluY3JlbWVudEFjaGlldmVtZW50KG4sZnVuY3Rpb24oZSl7cmV0dXJuIHIucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7cmV0dXJuIHIucmVqZWN0KGUpfSksci5wcm9taXNlfSxzaG93QWNoaWV2ZW1lbnRzOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBnb29nbGVwbGF5Z2FtZS5zaG93QWNoaWV2ZW1lbnRzKGZ1bmN0aW9uKGUpe3JldHVybiBuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3JldHVybiBuLnJlamVjdChlKX0pLG4ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ29vZ2xlUGx1c1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFHb29nbGVQbHVzXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntsb2dpbjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHZvaWQgMD09PXImJihyPXt9KSxuLnBsdWdpbnMuZ29vZ2xlcGx1cy5sb2dpbih7aU9TQXBpS2V5OnJ9LGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHNpbGVudExvZ2luOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gdm9pZCAwPT09ciYmKHI9e30pLG4ucGx1Z2lucy5nb29nbGVwbHVzLnRyeVNpbGVudExvZ2luKHtpT1NBcGlLZXk6cn0sZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sbG9nb3V0OmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO24ucGx1Z2lucy5nb29nbGVwbHVzLmxvZ291dChmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9KX0sZGlzY29ubmVjdDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtuLnBsdWdpbnMuZ29vZ2xlcGx1cy5kaXNjb25uZWN0KGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0pfSxpc0F2YWlsYWJsZTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmdvb2dsZXBsdXMuaXNBdmFpbGFibGUoZnVuY3Rpb24oZSl7ZT9yLnJlc29sdmUoZSk6ci5yZWplY3QoZSl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmhlYWx0aEtpdFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFIZWFsdGhLaXRcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2lzQXZhaWxhYmxlOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuaGVhbHRoa2l0LmF2YWlsYWJsZShmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxjaGVja0F1dGhTdGF0dXM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fFwiSEtRdWFudGl0eVR5cGVJZGVudGlmaWVySGVpZ2h0XCIsbi5wbHVnaW5zLmhlYWx0aGtpdC5jaGVja0F1dGhTdGF0dXMoe3R5cGU6cn0sZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0scmVxdWVzdEF1dGhvcml6YXRpb246ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8W1wiSEtDaGFyYWN0ZXJpc3RpY1R5cGVJZGVudGlmaWVyRGF0ZU9mQmlydGhcIixcIkhLUXVhbnRpdHlUeXBlSWRlbnRpZmllckFjdGl2ZUVuZXJneUJ1cm5lZFwiLFwiSEtRdWFudGl0eVR5cGVJZGVudGlmaWVySGVpZ2h0XCJdLG89b3x8W1wiSEtRdWFudGl0eVR5cGVJZGVudGlmaWVyQWN0aXZlRW5lcmd5QnVybmVkXCIsXCJIS1F1YW50aXR5VHlwZUlkZW50aWZpZXJIZWlnaHRcIixcIkhLUXVhbnRpdHlUeXBlSWRlbnRpZmllckRpc3RhbmNlQ3ljbGluZ1wiXSxuLnBsdWdpbnMuaGVhbHRoa2l0LnJlcXVlc3RBdXRob3JpemF0aW9uKHtyZWFkVHlwZXM6cix3cml0ZVR5cGVzOm99LGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7dC5yZWplY3QoZSl9KSx0LnByb21pc2V9LHJlYWREYXRlT2ZCaXJ0aDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmhlYWx0aGtpdC5yZWFkRGF0ZU9mQmlydGgoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9KSxyLnByb21pc2V9LHJlYWRHZW5kZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5oZWFsdGhraXQucmVhZEdlbmRlcihmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0pLHIucHJvbWlzZX0sc2F2ZVdlaWdodDpmdW5jdGlvbihyLG8sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuaGVhbHRoa2l0LnNhdmVXZWlnaHQoe3VuaXQ6b3x8XCJsYlwiLGFtb3VudDpyLGRhdGU6dHx8bmV3IERhdGV9LGZ1bmN0aW9uKGUpe2kucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7aS5yZXNvbHZlKGUpfSksaS5wcm9taXNlfSxyZWFkV2VpZ2h0OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmhlYWx0aGtpdC5yZWFkV2VpZ2h0KHt1bml0OnJ8fFwibGJcIn0sZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9KSxvLnByb21pc2V9LHNhdmVIZWlnaHQ6ZnVuY3Rpb24ocixvLHQpe3ZhciBpPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmhlYWx0aGtpdC5zYXZlSGVpZ2h0KHt1bml0Om98fFwiaW5cIixhbW91bnQ6cixkYXRlOnR8fG5ldyBEYXRlfSxmdW5jdGlvbihlKXtpLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2kucmVzb2x2ZShlKX0pLGkucHJvbWlzZX0scmVhZEhlaWdodDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5oZWFsdGhraXQucmVhZEhlaWdodCh7dW5pdDpyfHxcImluXCJ9LGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSksby5wcm9taXNlfSxmaW5kV29ya291dHM6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5oZWFsdGhraXQuZmluZFdvcmtvdXRzKHt9LGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSksci5wcm9taXNlfSxzYXZlV29ya291dDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5oZWFsdGhraXQuc2F2ZVdvcmtvdXQocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0pLG8ucHJvbWlzZX0scXVlcnlTYW1wbGVUeXBlOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmhlYWx0aGtpdC5xdWVyeVNhbXBsZVR5cGUocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0pLG8ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuaHR0cGRcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhSHR0cGRcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntzdGFydFNlcnZlcjpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5Db3JIdHRwZC5zdGFydFNlcnZlcihuLGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0sc3RvcFNlcnZlcjpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLkNvckh0dHBkLnN0b3BTZXJ2ZXIoZnVuY3Rpb24oKXtuLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtuLnJlamVjdCgpfSksbi5wcm9taXNlfSxnZXRVUkw6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5Db3JIdHRwZC5nZXRVUkwoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbigpe24ucmVqZWN0KCl9KSxuLnByb21pc2V9LGdldExvY2FsUGF0aDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLkNvckh0dHBkLmdldExvY2FsUGF0aChmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKCl7bi5yZWplY3QoKX0pLG4ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuaUFkXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YWlBZFwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57c2V0T3B0aW9uczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uaUFkLnNldE9wdGlvbnMocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LGNyZWF0ZUJhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uaUFkLmNyZWF0ZUJhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0scmVtb3ZlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmlBZC5yZW1vdmVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxzaG93QmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5pQWQuc2hvd0Jhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0Jhbm5lckF0WFk6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4uaUFkLnNob3dCYW5uZXJBdFhZKHIsbyxmdW5jdGlvbigpe3QucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3QucmVqZWN0KCl9KSx0LnByb21pc2V9LGhpZGVCYW5uZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uaUFkLmhpZGVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxwcmVwYXJlSW50ZXJzdGl0aWFsOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5pQWQucHJlcGFyZUludGVyc3RpdGlhbChyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0ludGVyc3RpdGlhbDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5pQWQuc2hvd0ludGVyc3RpdGlhbChmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmltYWdlUGlja2VyXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUltYWdlUGlja2VyXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntnZXRQaWN0dXJlczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uaW1hZ2VQaWNrZXIuZ2V0UGljdHVyZXMoZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0sciksby5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5pbkFwcEJyb3dzZXJcIixbXSkucHJvdmlkZXIoXCIkY29yZG92YUluQXBwQnJvd3NlclwiLFtmdW5jdGlvbigpe3ZhciBlLG49dGhpcy5kZWZhdWx0T3B0aW9ucz17fTt0aGlzLnNldERlZmF1bHRPcHRpb25zPWZ1bmN0aW9uKGUpe249YW5ndWxhci5leHRlbmQobixlKX0sdGhpcy4kZ2V0PVtcIiRyb290U2NvcGVcIixcIiRxXCIsXCIkd2luZG93XCIsXCIkdGltZW91dFwiLGZ1bmN0aW9uKHIsbyx0LGkpe3JldHVybntvcGVuOmZ1bmN0aW9uKGEsYyx1KXt2YXIgcz1vLmRlZmVyKCk7aWYodSYmIWFuZ3VsYXIuaXNPYmplY3QodSkpcmV0dXJuIHMucmVqZWN0KFwib3B0aW9ucyBtdXN0IGJlIGFuIG9iamVjdFwiKSxzLnByb21pc2U7dmFyIGw9YW5ndWxhci5leHRlbmQoe30sbix1KSxmPVtdO2FuZ3VsYXIuZm9yRWFjaChsLGZ1bmN0aW9uKGUsbil7Zi5wdXNoKG4rXCI9XCIrZSl9KTt2YXIgZD1mLmpvaW4oKTtyZXR1cm4gZT10Lm9wZW4oYSxjLGQpLGUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRzdGFydFwiLGZ1bmN0aW9uKGUpe2koZnVuY3Rpb24oKXtyLiRicm9hZGNhc3QoXCIkY29yZG92YUluQXBwQnJvd3Nlcjpsb2Fkc3RhcnRcIixlKX0pfSwhMSksZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZHN0b3BcIixmdW5jdGlvbihlKXtzLnJlc29sdmUoZSksaShmdW5jdGlvbigpe3IuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhSW5BcHBCcm93c2VyOmxvYWRzdG9wXCIsZSl9KX0sITEpLGUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlcnJvclwiLGZ1bmN0aW9uKGUpe3MucmVqZWN0KGUpLGkoZnVuY3Rpb24oKXtyLiRicm9hZGNhc3QoXCIkY29yZG92YUluQXBwQnJvd3Nlcjpsb2FkZXJyb3JcIixlKX0pfSwhMSksZS5hZGRFdmVudExpc3RlbmVyKFwiZXhpdFwiLGZ1bmN0aW9uKGUpe2koZnVuY3Rpb24oKXtyLiRicm9hZGNhc3QoXCIkY29yZG92YUluQXBwQnJvd3NlcjpleGl0XCIsZSl9KX0sITEpLHMucHJvbWlzZX0sY2xvc2U6ZnVuY3Rpb24oKXtlLmNsb3NlKCksZT1udWxsfSxzaG93OmZ1bmN0aW9uKCl7ZS5zaG93KCl9LGV4ZWN1dGVTY3JpcHQ6ZnVuY3Rpb24obil7dmFyIHI9by5kZWZlcigpO3JldHVybiBlLmV4ZWN1dGVTY3JpcHQobixmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9KSxyLnByb21pc2V9LGluc2VydENTUzpmdW5jdGlvbihuKXt2YXIgcj1vLmRlZmVyKCk7cmV0dXJuIGUuaW5zZXJ0Q1NTKG4sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSksci5wcm9taXNlfX19XX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmluc29tbmlhXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUluc29tbmlhXCIsW1wiJHdpbmRvd1wiLGZ1bmN0aW9uKGUpe3JldHVybntrZWVwQXdha2U6ZnVuY3Rpb24oKXtyZXR1cm4gZS5wbHVnaW5zLmluc29tbmlhLmtlZXBBd2FrZSgpfSxhbGxvd1NsZWVwQWdhaW46ZnVuY3Rpb24oKXtyZXR1cm4gZS5wbHVnaW5zLmluc29tbmlhLmFsbG93U2xlZXBBZ2FpbigpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5pbnN0YWdyYW1cIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhSW5zdGFncmFtXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57c2hhcmU6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiB3aW5kb3cuSW5zdGFncmFtPyhJbnN0YWdyYW0uc2hhcmUobi5pbWFnZSxuLmNhcHRpb24sZnVuY3Rpb24oZSl7ZT9yLnJlamVjdChlKTpyLnJlc29sdmUoITApfSksci5wcm9taXNlKTooY29uc29sZS5lcnJvcihcIlRyaWVkIHRvIGNhbGwgSW5zdGFncmFtLnNoYXJlIGJ1dCB0aGUgSW5zdGFncmFtIHBsdWdpbiBpc24ndCBpbnN0YWxsZWQhXCIpLHIucmVzb2x2ZShudWxsKSxyLnByb21pc2UpfSxpc0luc3RhbGxlZDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gd2luZG93Lkluc3RhZ3JhbT8oSW5zdGFncmFtLmlzSW5zdGFsbGVkKGZ1bmN0aW9uKGUscil7ZT9uLnJlamVjdChlKTpuLnJlc29sdmUocil9KSxuLnByb21pc2UpOihjb25zb2xlLmVycm9yKFwiVHJpZWQgdG8gY2FsbCBJbnN0YWdyYW0uaXNJbnN0YWxsZWQgYnV0IHRoZSBJbnN0YWdyYW0gcGx1Z2luIGlzbid0IGluc3RhbGxlZCFcIiksbi5yZXNvbHZlKG51bGwpLG4ucHJvbWlzZSl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmtleWJvYXJkXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUtleWJvYXJkXCIsW1wiJHJvb3RTY29wZVwiLGZ1bmN0aW9uKGUpe3ZhciBuPWZ1bmN0aW9uKCl7ZS4kZXZhbEFzeW5jKGZ1bmN0aW9uKCl7ZS4kYnJvYWRjYXN0KFwiJGNvcmRvdmFLZXlib2FyZDpzaG93XCIpfSl9LHI9ZnVuY3Rpb24oKXtlLiRldmFsQXN5bmMoZnVuY3Rpb24oKXtlLiRicm9hZGNhc3QoXCIkY29yZG92YUtleWJvYXJkOmhpZGVcIil9KX07cmV0dXJuIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkZXZpY2VyZWFkeVwiLGZ1bmN0aW9uKCl7Y29yZG92YS5wbHVnaW5zLktleWJvYXJkJiYod2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJuYXRpdmUua2V5Ym9hcmRzaG93XCIsbiwhMSksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJuYXRpdmUua2V5Ym9hcmRoaWRlXCIsciwhMSkpfSkse2hpZGVBY2Nlc3NvcnlCYXI6ZnVuY3Rpb24oZSl7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIoZSl9LGNsb3NlOmZ1bmN0aW9uKCl7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5jbG9zZSgpfSxzaG93OmZ1bmN0aW9uKCl7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5zaG93KCl9LGRpc2FibGVTY3JvbGw6ZnVuY3Rpb24oZSl7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5kaXNhYmxlU2Nyb2xsKGUpfSxpc1Zpc2libGU6ZnVuY3Rpb24oKXtyZXR1cm4gY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmlzVmlzaWJsZX0sY2xlYXJTaG93V2F0Y2g6ZnVuY3Rpb24oKXtkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibmF0aXZlLmtleWJvYXJkc2hvd1wiLG4pLGUuJCRsaXN0ZW5lcnNbXCIkY29yZG92YUtleWJvYXJkOnNob3dcIl09W119LGNsZWFySGlkZVdhdGNoOmZ1bmN0aW9uKCl7ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm5hdGl2ZS5rZXlib2FyZGhpZGVcIixyKSxlLiQkbGlzdGVuZXJzW1wiJGNvcmRvdmFLZXlib2FyZDpoaWRlXCJdPVtdfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5rZXljaGFpblwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFLZXljaGFpblwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2dldEZvcktleTpmdW5jdGlvbihuLHIpe3ZhciBvPWUuZGVmZXIoKSx0PW5ldyBLZXljaGFpbjtyZXR1cm4gdC5nZXRGb3JLZXkoby5yZXNvbHZlLG8ucmVqZWN0LG4sciksby5wcm9taXNlfSxzZXRGb3JLZXk6ZnVuY3Rpb24obixyLG8pe3ZhciB0PWUuZGVmZXIoKSxpPW5ldyBLZXljaGFpbjtyZXR1cm4gaS5zZXRGb3JLZXkodC5yZXNvbHZlLHQucmVqZWN0LG4scixvKSx0LnByb21pc2V9LHJlbW92ZUZvcktleTpmdW5jdGlvbihuLHIpe3ZhciBvPWUuZGVmZXIoKSx0PW5ldyBLZXljaGFpbjtyZXR1cm4gdC5yZW1vdmVGb3JLZXkoby5yZXNvbHZlLG8ucmVqZWN0LG4sciksby5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5sYXVuY2hOYXZpZ2F0b3JcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhTGF1bmNoTmF2aWdhdG9yXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57bmF2aWdhdGU6ZnVuY3Rpb24obixyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbGF1bmNobmF2aWdhdG9yLm5hdmlnYXRlKG4scixmdW5jdGlvbigpe3QucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0sbyksdC5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5sb2NhbE5vdGlmaWNhdGlvblwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFMb2NhbE5vdGlmaWNhdGlvblwiLFtcIiRxXCIsXCIkd2luZG93XCIsXCIkcm9vdFNjb3BlXCIsXCIkdGltZW91dFwiLGZ1bmN0aW9uKGUsbixyLG8pe3JldHVybiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZGV2aWNlcmVhZHlcIixmdW5jdGlvbigpe24uY29yZG92YSYmbi5jb3Jkb3ZhLnBsdWdpbnMmJm4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbiYmbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsJiYobi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLm9uKFwic2NoZWR1bGVcIixmdW5jdGlvbihlLG4pe28oZnVuY3Rpb24oKXtyLiRicm9hZGNhc3QoXCIkY29yZG92YUxvY2FsTm90aWZpY2F0aW9uOnNjaGVkdWxlXCIsZSxuKX0pfSksbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLm9uKFwidHJpZ2dlclwiLGZ1bmN0aW9uKGUsbil7byhmdW5jdGlvbigpe3IuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhTG9jYWxOb3RpZmljYXRpb246dHJpZ2dlclwiLGUsbil9KX0pLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5vbihcInVwZGF0ZVwiLGZ1bmN0aW9uKGUsbil7byhmdW5jdGlvbigpe3IuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhTG9jYWxOb3RpZmljYXRpb246dXBkYXRlXCIsZSxuKX0pfSksbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLm9uKFwiY2xlYXJcIixmdW5jdGlvbihlLG4pe28oZnVuY3Rpb24oKXtyLiRicm9hZGNhc3QoXCIkY29yZG92YUxvY2FsTm90aWZpY2F0aW9uOmNsZWFyXCIsZSxuKX0pfSksbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLm9uKFwiY2xlYXJhbGxcIixmdW5jdGlvbihlKXtvKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFMb2NhbE5vdGlmaWNhdGlvbjpjbGVhcmFsbFwiLGUpfSl9KSxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwub24oXCJjYW5jZWxcIixmdW5jdGlvbihlLG4pe28oZnVuY3Rpb24oKXtyLiRicm9hZGNhc3QoXCIkY29yZG92YUxvY2FsTm90aWZpY2F0aW9uOmNhbmNlbFwiLGUsbil9KX0pLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5vbihcImNhbmNlbGFsbFwiLGZ1bmN0aW9uKGUpe28oZnVuY3Rpb24oKXtyLiRicm9hZGNhc3QoXCIkY29yZG92YUxvY2FsTm90aWZpY2F0aW9uOmNhbmNlbGFsbFwiLGUpfSl9KSxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwub24oXCJjbGlja1wiLGZ1bmN0aW9uKGUsbil7byhmdW5jdGlvbigpe3IuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhTG9jYWxOb3RpZmljYXRpb246Y2xpY2tcIixlLG4pfSl9KSl9LCExKSx7c2NoZWR1bGU6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuc2NoZWR1bGUocixmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LG8pLHQucHJvbWlzZX0sYWRkOmZ1bmN0aW9uKHIsbyl7Y29uc29sZS53YXJuKCdEZXByZWNhdGVkOiB1c2UgXCJzY2hlZHVsZVwiIGluc3RlYWQuJyk7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLnNjaGVkdWxlKHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxvKSx0LnByb21pc2V9LHVwZGF0ZTpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbz1vfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC51cGRhdGUocixmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LG8pLHQucHJvbWlzZX0sY2xlYXI6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7XG5yZXR1cm4gbz1vfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5jbGVhcihyLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sbyksdC5wcm9taXNlfSxjbGVhckFsbDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuY2xlYXJBbGwoZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxyKSxvLnByb21pc2V9LGNhbmNlbDpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbz1vfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5jYW5jZWwocixmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LG8pLHQucHJvbWlzZX0sY2FuY2VsQWxsOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gcj1yfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5jYW5jZWxBbGwoZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxyKSxvLnByb21pc2V9LGlzUHJlc2VudDpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbz1vfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5pc1ByZXNlbnQocixmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LG8pLHQucHJvbWlzZX0saXNTY2hlZHVsZWQ6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuaXNTY2hlZHVsZWQocixmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LG8pLHQucHJvbWlzZX0saXNUcmlnZ2VyZWQ6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuaXNUcmlnZ2VyZWQocixmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LG8pLHQucHJvbWlzZX0saGFzUGVybWlzc2lvbjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuaGFzUGVybWlzc2lvbihmdW5jdGlvbihlKXtlP28ucmVzb2x2ZShlKTpvLnJlamVjdChlKX0sciksby5wcm9taXNlfSxyZWdpc3RlclBlcm1pc3Npb246ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLnJlZ2lzdGVyUGVybWlzc2lvbihmdW5jdGlvbihlKXtlP28ucmVzb2x2ZShlKTpvLnJlamVjdChlKX0sciksby5wcm9taXNlfSxwcm9tcHRGb3JQZXJtaXNzaW9uOmZ1bmN0aW9uKHIpe2NvbnNvbGUud2FybignRGVwcmVjYXRlZDogdXNlIFwicmVnaXN0ZXJQZXJtaXNzaW9uXCIgaW5zdGVhZC4nKTt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwucmVnaXN0ZXJQZXJtaXNzaW9uKGZ1bmN0aW9uKGUpe2U/by5yZXNvbHZlKGUpOm8ucmVqZWN0KGUpfSxyKSxvLnByb21pc2V9LGdldEFsbElkczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuZ2V0QWxsSWRzKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sciksby5wcm9taXNlfSxnZXRJZHM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmdldElkcyhmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LHIpLG8ucHJvbWlzZX0sZ2V0U2NoZWR1bGVkSWRzOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gcj1yfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5nZXRTY2hlZHVsZWRJZHMoZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxyKSxvLnByb21pc2V9LGdldFRyaWdnZXJlZElkczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuZ2V0VHJpZ2dlcmVkSWRzKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sciksby5wcm9taXNlfSxnZXQ6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuZ2V0KHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxvKSx0LnByb21pc2V9LGdldEFsbDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuZ2V0QWxsKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sciksby5wcm9taXNlfSxnZXRTY2hlZHVsZWQ6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuZ2V0U2NoZWR1bGVkKHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxvKSx0LnByb21pc2V9LGdldEFsbFNjaGVkdWxlZDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuZ2V0QWxsU2NoZWR1bGVkKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sciksby5wcm9taXNlfSxnZXRUcmlnZ2VyZWQ6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuZ2V0VHJpZ2dlcmVkKHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxvKSx0LnByb21pc2V9LGdldEFsbFRyaWdnZXJlZDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuZ2V0QWxsVHJpZ2dlcmVkKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sciksby5wcm9taXNlfSxnZXREZWZhdWx0czpmdW5jdGlvbigpe3JldHVybiBuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuZ2V0RGVmYXVsdHMoKX0sc2V0RGVmYXVsdHM6ZnVuY3Rpb24oZSl7bi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLnNldERlZmF1bHRzKGUpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5tTWVkaWFBZHNcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhTU1lZGlhQWRzXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntzZXRPcHRpb25zOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5tTWVkaWEuc2V0T3B0aW9ucyhyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sY3JlYXRlQmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5tTWVkaWEuY3JlYXRlQmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxyZW1vdmVCYW5uZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ubU1lZGlhLnJlbW92ZUJhbm5lcihmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHNob3dCYW5uZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLm1NZWRpYS5zaG93QmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93QmFubmVyQXRYWTpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi5tTWVkaWEuc2hvd0Jhbm5lckF0WFkocixvLGZ1bmN0aW9uKCl7dC5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7dC5yZWplY3QoKX0pLHQucHJvbWlzZX0saGlkZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5tTWVkaWEuaGlkZUJhbm5lcihmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHByZXBhcmVJbnRlcnN0aXRpYWw6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLm1NZWRpYS5wcmVwYXJlSW50ZXJzdGl0aWFsKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93SW50ZXJzdGl0aWFsOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLm1NZWRpYS5zaG93SW50ZXJzdGl0aWFsKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMubWVkaWFcIixbXSkuc2VydmljZShcIk5ld01lZGlhXCIsW1wiJHFcIixcIiRpbnRlcnZhbFwiLGZ1bmN0aW9uKGUsbil7ZnVuY3Rpb24gcihlKXthbmd1bGFyLmlzRGVmaW5lZChzKXx8KHM9bihmdW5jdGlvbigpezA+ZCYmKGQ9ZS5nZXREdXJhdGlvbigpLGEmJmQ+MCYmYS5ub3RpZnkoe2R1cmF0aW9uOmR9KSksZS5nZXRDdXJyZW50UG9zaXRpb24oZnVuY3Rpb24oZSl7ZT4tMSYmKGY9ZSl9LGZ1bmN0aW9uKGUpe2NvbnNvbGUubG9nKFwiRXJyb3IgZ2V0dGluZyBwb3M9XCIrZSl9KSxhJiZhLm5vdGlmeSh7cG9zaXRpb246Zn0pfSwxZTMpKX1mdW5jdGlvbiBvKCl7YW5ndWxhci5pc0RlZmluZWQocykmJihuLmNhbmNlbChzKSxzPXZvaWQgMCl9ZnVuY3Rpb24gdCgpe2Y9LTEsZD0tMX1mdW5jdGlvbiBpKGUpe3RoaXMubWVkaWE9bmV3IE1lZGlhKGUsZnVuY3Rpb24oZSl7bygpLHQoKSxhLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28oKSx0KCksYS5yZWplY3QoZSl9LGZ1bmN0aW9uKGUpe2w9ZSxhLm5vdGlmeSh7c3RhdHVzOmx9KX0pfXZhciBhLGMsdSxzLGw9bnVsbCxmPS0xLGQ9LTE7cmV0dXJuIGkucHJvdG90eXBlLnBsYXk9ZnVuY3Rpb24obil7cmV0dXJuIGE9ZS5kZWZlcigpLFwib2JqZWN0XCIhPXR5cGVvZiBuJiYobj17fSksdGhpcy5tZWRpYS5wbGF5KG4pLHIodGhpcy5tZWRpYSksYS5wcm9taXNlfSxpLnByb3RvdHlwZS5wYXVzZT1mdW5jdGlvbigpe28oKSx0aGlzLm1lZGlhLnBhdXNlKCl9LGkucHJvdG90eXBlLnN0b3A9ZnVuY3Rpb24oKXt0aGlzLm1lZGlhLnN0b3AoKX0saS5wcm90b3R5cGUucmVsZWFzZT1mdW5jdGlvbigpe3RoaXMubWVkaWEucmVsZWFzZSgpLHRoaXMubWVkaWE9dm9pZCAwfSxpLnByb3RvdHlwZS5zZWVrVG89ZnVuY3Rpb24oZSl7dGhpcy5tZWRpYS5zZWVrVG8oZSl9LGkucHJvdG90eXBlLnNldFZvbHVtZT1mdW5jdGlvbihlKXt0aGlzLm1lZGlhLnNldFZvbHVtZShlKX0saS5wcm90b3R5cGUuc3RhcnRSZWNvcmQ9ZnVuY3Rpb24oKXt0aGlzLm1lZGlhLnN0YXJ0UmVjb3JkKCl9LGkucHJvdG90eXBlLnN0b3BSZWNvcmQ9ZnVuY3Rpb24oKXt0aGlzLm1lZGlhLnN0b3BSZWNvcmQoKX0saS5wcm90b3R5cGUuY3VycmVudFRpbWU9ZnVuY3Rpb24oKXtyZXR1cm4gYz1lLmRlZmVyKCksdGhpcy5tZWRpYS5nZXRDdXJyZW50UG9zaXRpb24oZnVuY3Rpb24oZSl7Yy5yZXNvbHZlKGUpfSksYy5wcm9taXNlfSxpLnByb3RvdHlwZS5nZXREdXJhdGlvbj1mdW5jdGlvbigpe3JldHVybiB1PWUuZGVmZXIoKSx0aGlzLm1lZGlhLmdldER1cmF0aW9uKGZ1bmN0aW9uKGUpe3UucmVzb2x2ZShlKX0pLHUucHJvbWlzZX0saX1dKS5mYWN0b3J5KFwiJGNvcmRvdmFNZWRpYVwiLFtcIk5ld01lZGlhXCIsZnVuY3Rpb24oZSl7cmV0dXJue25ld01lZGlhOmZ1bmN0aW9uKG4pe3JldHVybiBuZXcgZShuKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMubW9iZm94QWRzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YU1vYkZveEFkc1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57c2V0T3B0aW9uczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uTW9iRm94LnNldE9wdGlvbnMocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LGNyZWF0ZUJhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uTW9iRm94LmNyZWF0ZUJhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0scmVtb3ZlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLk1vYkZveC5yZW1vdmVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxzaG93QmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb2JGb3guc2hvd0Jhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0Jhbm5lckF0WFk6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4uTW9iRm94LnNob3dCYW5uZXJBdFhZKHIsbyxmdW5jdGlvbigpe3QucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3QucmVqZWN0KCl9KSx0LnByb21pc2V9LGhpZGVCYW5uZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uTW9iRm94LmhpZGVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxwcmVwYXJlSW50ZXJzdGl0aWFsOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb2JGb3gucHJlcGFyZUludGVyc3RpdGlhbChyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0ludGVyc3RpdGlhbDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb2JGb3guc2hvd0ludGVyc3RpdGlhbChmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zXCIsW1wibmdDb3Jkb3ZhLnBsdWdpbnMuM2R0b3VjaFwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuYWN0aW9uU2hlZXRcIixcIm5nQ29yZG92YS5wbHVnaW5zLmFkTW9iXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5hcHBBdmFpbGFiaWxpdHlcIixcIm5nQ29yZG92YS5wbHVnaW5zLmFwcFJhdGVcIixcIm5nQ29yZG92YS5wbHVnaW5zLmFwcFZlcnNpb25cIixcIm5nQ29yZG92YS5wbHVnaW5zLmJhY2tncm91bmRHZW9sb2NhdGlvblwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuYmFkZ2VcIixcIm5nQ29yZG92YS5wbHVnaW5zLmJhcmNvZGVTY2FubmVyXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5iYXR0ZXJ5U3RhdHVzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5iZWFjb25cIixcIm5nQ29yZG92YS5wbHVnaW5zLmJsZVwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuYmx1ZXRvb3RoU2VyaWFsXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5icmlnaHRuZXNzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5jYWxlbmRhclwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuY2FtZXJhXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5jYXB0dXJlXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5jbGlwYm9hcmRcIixcIm5nQ29yZG92YS5wbHVnaW5zLmNvbnRhY3RzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5kYXRlUGlja2VyXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5kZXZpY2VcIixcIm5nQ29yZG92YS5wbHVnaW5zLmRldmljZU1vdGlvblwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZGV2aWNlT3JpZW50YXRpb25cIixcIm5nQ29yZG92YS5wbHVnaW5zLmRpYWxvZ3NcIixcIm5nQ29yZG92YS5wbHVnaW5zLmVtYWlsQ29tcG9zZXJcIixcIm5nQ29yZG92YS5wbHVnaW5zLmZhY2Vib29rXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5mYWNlYm9va0Fkc1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmlsZVwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmlsZVRyYW5zZmVyXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5maWxlT3BlbmVyMlwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmxhc2hsaWdodFwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmx1cnJ5QWRzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5nYVwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ2VvbG9jYXRpb25cIixcIm5nQ29yZG92YS5wbHVnaW5zLmdsb2JhbGl6YXRpb25cIixcIm5nQ29yZG92YS5wbHVnaW5zLmdvb2dsZUFkc1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ29vZ2xlQW5hbHl0aWNzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5nb29nbGVNYXBcIixcIm5nQ29yZG92YS5wbHVnaW5zLmdvb2dsZVBsYXlHYW1lXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5nb29nbGVQbHVzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5oZWFsdGhLaXRcIixcIm5nQ29yZG92YS5wbHVnaW5zLmh0dHBkXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5pQWRcIixcIm5nQ29yZG92YS5wbHVnaW5zLmltYWdlUGlja2VyXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5pbkFwcEJyb3dzZXJcIixcIm5nQ29yZG92YS5wbHVnaW5zLmluc3RhZ3JhbVwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMua2V5Ym9hcmRcIixcIm5nQ29yZG92YS5wbHVnaW5zLmtleWNoYWluXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5sYXVuY2hOYXZpZ2F0b3JcIixcIm5nQ29yZG92YS5wbHVnaW5zLmxvY2FsTm90aWZpY2F0aW9uXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5tZWRpYVwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMubU1lZGlhQWRzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5tb2Jmb3hBZHNcIixcIm5nQ29yZG92YS5wbHVnaW5zLm1vcHViQWRzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5uYXRpdmVBdWRpb1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMubmV0d29ya1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMucGluRGlhbG9nXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5wcmVmZXJlbmNlc1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMucHJpbnRlclwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMucHJvZ3Jlc3NJbmRpY2F0b3JcIixcIm5nQ29yZG92YS5wbHVnaW5zLnB1c2hcIixcIm5nQ29yZG92YS5wbHVnaW5zLnB1c2hfdjVcIixcIm5nQ29yZG92YS5wbHVnaW5zLnNtc1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuc29jaWFsU2hhcmluZ1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuc3Bpbm5lckRpYWxvZ1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuc3BsYXNoc2NyZWVuXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5zcWxpdGVcIixcIm5nQ29yZG92YS5wbHVnaW5zLnN0YXR1c2JhclwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMudG9hc3RcIixcIm5nQ29yZG92YS5wbHVnaW5zLnRvdWNoaWRcIixcIm5nQ29yZG92YS5wbHVnaW5zLnZpYnJhdGlvblwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMudmlkZW9DYXB0dXJlUGx1c1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuemlwXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5pbnNvbW5pYVwiXSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5tb3B1YkFkc1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFNb1B1YkFkc1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57c2V0T3B0aW9uczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uTW9QdWIuc2V0T3B0aW9ucyhyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sY3JlYXRlQmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb1B1Yi5jcmVhdGVCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHJlbW92ZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb1B1Yi5yZW1vdmVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxzaG93QmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb1B1Yi5zaG93QmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93QmFubmVyQXRYWTpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi5Nb1B1Yi5zaG93QmFubmVyQXRYWShyLG8sZnVuY3Rpb24oKXt0LnJlc29sdmUoKX0sZnVuY3Rpb24oKXt0LnJlamVjdCgpfSksdC5wcm9taXNlfSxoaWRlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLk1vUHViLmhpZGVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxwcmVwYXJlSW50ZXJzdGl0aWFsOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb1B1Yi5wcmVwYXJlSW50ZXJzdGl0aWFsKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93SW50ZXJzdGl0aWFsOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLk1vUHViLnNob3dJbnRlcnN0aXRpYWwoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5uYXRpdmVBdWRpb1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFOYXRpdmVBdWRpb1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57cHJlbG9hZFNpbXBsZTpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLk5hdGl2ZUF1ZGlvLnByZWxvYWRTaW1wbGUocixvLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7dC5yZWplY3QoZSl9KSx0LnByb21pc2V9LHByZWxvYWRDb21wbGV4OmZ1bmN0aW9uKHIsbyx0LGksYSl7dmFyIGM9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuTmF0aXZlQXVkaW8ucHJlbG9hZENvbXBsZXgocixvLHQsaSxhLGZ1bmN0aW9uKGUpe2MucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7Yy5yZWplY3QoZSl9KSxjLnByb21pc2V9LHBsYXk6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5OYXRpdmVBdWRpby5wbGF5KHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0sbyksdC5wcm9taXNlfSxzdG9wOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLk5hdGl2ZUF1ZGlvLnN0b3AocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxsb29wOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLk5hdGl2ZUF1ZGlvLmxvb3AocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSx1bmxvYWQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuTmF0aXZlQXVkaW8udW5sb2FkKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sc2V0Vm9sdW1lRm9yQ29tcGxleEFzc2V0OmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuTmF0aXZlQXVkaW8uc2V0Vm9sdW1lRm9yQ29tcGxleEFzc2V0KHIsbyxmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSksdC5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5uZXR3b3JrXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YU5ldHdvcmtcIixbXCIkcm9vdFNjb3BlXCIsXCIkdGltZW91dFwiLGZ1bmN0aW9uKGUsbil7dmFyIHI9ZnVuY3Rpb24oKXt2YXIgcj1uYXZpZ2F0b3IuY29ubmVjdGlvbi50eXBlO24oZnVuY3Rpb24oKXtlLiRicm9hZGNhc3QoXCIkY29yZG92YU5ldHdvcms6b2ZmbGluZVwiLHIpfSl9LG89ZnVuY3Rpb24oKXt2YXIgcj1uYXZpZ2F0b3IuY29ubmVjdGlvbi50eXBlO24oZnVuY3Rpb24oKXtlLiRicm9hZGNhc3QoXCIkY29yZG92YU5ldHdvcms6b25saW5lXCIscil9KX07cmV0dXJuIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkZXZpY2VyZWFkeVwiLGZ1bmN0aW9uKCl7bmF2aWdhdG9yLmNvbm5lY3Rpb24mJihkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwib2ZmbGluZVwiLHIsITEpLGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJvbmxpbmVcIixvLCExKSl9KSx7Z2V0TmV0d29yazpmdW5jdGlvbigpe3JldHVybiBuYXZpZ2F0b3IuY29ubmVjdGlvbi50eXBlfSxpc09ubGluZTpmdW5jdGlvbigpe3ZhciBlPW5hdmlnYXRvci5jb25uZWN0aW9uLnR5cGU7cmV0dXJuIGUhPT1Db25uZWN0aW9uLlVOS05PV04mJmUhPT1Db25uZWN0aW9uLk5PTkV9LGlzT2ZmbGluZTpmdW5jdGlvbigpe3ZhciBlPW5hdmlnYXRvci5jb25uZWN0aW9uLnR5cGU7cmV0dXJuIGU9PT1Db25uZWN0aW9uLlVOS05PV058fGU9PT1Db25uZWN0aW9uLk5PTkV9LGNsZWFyT2ZmbGluZVdhdGNoOmZ1bmN0aW9uKCl7ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm9mZmxpbmVcIixyKSxlLiQkbGlzdGVuZXJzW1wiJGNvcmRvdmFOZXR3b3JrOm9mZmxpbmVcIl09W119LGNsZWFyT25saW5lV2F0Y2g6ZnVuY3Rpb24oKXtkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwib25saW5lXCIsbyksZS4kJGxpc3RlbmVyc1tcIiRjb3Jkb3ZhTmV0d29yazpvbmxpbmVcIl09W119fX1dKS5ydW4oW1wiJGluamVjdG9yXCIsZnVuY3Rpb24oZSl7ZS5nZXQoXCIkY29yZG92YU5ldHdvcmtcIil9XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5waW5EaWFsb2dcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhUGluRGlhbG9nXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntwcm9tcHQ6ZnVuY3Rpb24ocixvLHQpe3ZhciBpPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnBpbkRpYWxvZy5wcm9tcHQocixmdW5jdGlvbihlKXtpLnJlc29sdmUoZSl9LG8sdCksaS5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5wcmVmZXJlbmNlc1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFQcmVmZXJlbmNlc1wiLFtcIiR3aW5kb3dcIixcIiRxXCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57cGx1Z2luTm90RW5hYmxlZE1lc3NhZ2U6XCJQbHVnaW4gbm90IGVuYWJsZWRcIixkZWNvcmF0ZVByb21pc2U6ZnVuY3Rpb24oZSl7ZS5zdWNjZXNzPWZ1bmN0aW9uKG4pe3JldHVybiBlLnRoZW4obiksZX0sZS5lcnJvcj1mdW5jdGlvbihuKXtyZXR1cm4gZS50aGVuKG51bGwsbiksZX19LHN0b3JlOmZ1bmN0aW9uKHIsbyx0KXtmdW5jdGlvbiBpKGUpe2MucmVzb2x2ZShlKX1mdW5jdGlvbiBhKGUpe2MucmVqZWN0KG5ldyBFcnJvcihlKSl9dmFyIGM9bi5kZWZlcigpLHU9Yy5wcm9taXNlO2lmKGUucGx1Z2lucyl7dmFyIHM7cz0zPT09YXJndW1lbnRzLmxlbmd0aD9lLnBsdWdpbnMuYXBwUHJlZmVyZW5jZXMuc3RvcmUodCxyLG8pOmUucGx1Z2lucy5hcHBQcmVmZXJlbmNlcy5zdG9yZShyLG8pLHMudGhlbihpLGEpfWVsc2UgYy5yZWplY3QobmV3IEVycm9yKHRoaXMucGx1Z2luTm90RW5hYmxlZE1lc3NhZ2UpKTtyZXR1cm4gdGhpcy5kZWNvcmF0ZVByb21pc2UodSksdX0sZmV0Y2g6ZnVuY3Rpb24ocixvKXtmdW5jdGlvbiB0KGUpe2EucmVzb2x2ZShlKX1mdW5jdGlvbiBpKGUpe2EucmVqZWN0KG5ldyBFcnJvcihlKSl9dmFyIGE9bi5kZWZlcigpLGM9YS5wcm9taXNlO2lmKGUucGx1Z2lucyl7dmFyIHU7dT0yPT09YXJndW1lbnRzLmxlbmd0aD9lLnBsdWdpbnMuYXBwUHJlZmVyZW5jZXMuZmV0Y2gobyxyKTplLnBsdWdpbnMuYXBwUHJlZmVyZW5jZXMuZmV0Y2gociksdS50aGVuKHQsaSl9ZWxzZSBhLnJlamVjdChuZXcgRXJyb3IodGhpcy5wbHVnaW5Ob3RFbmFibGVkTWVzc2FnZSkpO3JldHVybiB0aGlzLmRlY29yYXRlUHJvbWlzZShjKSxjfSxyZW1vdmU6ZnVuY3Rpb24ocixvKXtmdW5jdGlvbiB0KGUpe2EucmVzb2x2ZShlKX1mdW5jdGlvbiBpKGUpe2EucmVqZWN0KG5ldyBFcnJvcihlKSl9dmFyIGE9bi5kZWZlcigpLGM9YS5wcm9taXNlO2lmKGUucGx1Z2lucyl7dmFyIHU7dT0yPT09YXJndW1lbnRzLmxlbmd0aD9lLnBsdWdpbnMuYXBwUHJlZmVyZW5jZXMucmVtb3ZlKG8scik6ZS5wbHVnaW5zLmFwcFByZWZlcmVuY2VzLnJlbW92ZShyKSx1LnRoZW4odCxpKX1lbHNlIGEucmVqZWN0KG5ldyBFcnJvcih0aGlzLnBsdWdpbk5vdEVuYWJsZWRNZXNzYWdlKSk7cmV0dXJuIHRoaXMuZGVjb3JhdGVQcm9taXNlKGMpLGN9LHNob3c6ZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUpe3QucmVzb2x2ZShlKX1mdW5jdGlvbiBvKGUpe3QucmVqZWN0KG5ldyBFcnJvcihlKSl9dmFyIHQ9bi5kZWZlcigpLGk9dC5wcm9taXNlO3JldHVybiBlLnBsdWdpbnM/ZS5wbHVnaW5zLmFwcFByZWZlcmVuY2VzLnNob3coKS50aGVuKHIsbyk6dC5yZWplY3QobmV3IEVycm9yKHRoaXMucGx1Z2luTm90RW5hYmxlZE1lc3NhZ2UpKSx0aGlzLmRlY29yYXRlUHJvbWlzZShpKSxpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5wcmludGVyXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVByaW50ZXJcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2lzQXZhaWxhYmxlOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbi5wcmludGVyLmlzQXZhaWxhYmxlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0pLHIucHJvbWlzZX0scHJpbnQ6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2luLnByaW50ZXIucHJpbnQocixvLGZ1bmN0aW9uKCl7dC5yZXNvbHZlKCl9KSx0LnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnByb2dyZXNzSW5kaWNhdG9yXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVByb2dyZXNzXCIsW2Z1bmN0aW9uKCl7cmV0dXJue3Nob3c6ZnVuY3Rpb24oZSl7dmFyIG49ZXx8XCJQbGVhc2Ugd2FpdC4uLlwiO3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93KG4pfSxzaG93U2ltcGxlOmZ1bmN0aW9uKGUpe3ZhciBuPWV8fCExO3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93U2ltcGxlKG4pfSxzaG93U2ltcGxlV2l0aExhYmVsOmZ1bmN0aW9uKGUsbil7dmFyIHI9ZXx8ITEsbz1ufHxcIkxvYWRpbmcuLi5cIjtyZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3Iuc2hvd1NpbXBsZVdpdGhMYWJlbChyLG8pfSxzaG93U2ltcGxlV2l0aExhYmVsRGV0YWlsOmZ1bmN0aW9uKGUsbixyKXt2YXIgbz1lfHwhMSx0PW58fFwiTG9hZGluZy4uLlwiLGk9cnx8XCJQbGVhc2Ugd2FpdFwiO3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93U2ltcGxlV2l0aExhYmVsRGV0YWlsKG8sdCxpKX0sc2hvd0RldGVybWluYXRlOmZ1bmN0aW9uKGUsbil7dmFyIHI9ZXx8ITEsbz1ufHw1ZTQ7cmV0dXJuIFByb2dyZXNzSW5kaWNhdG9yLnNob3dEZXRlcm1pbmF0ZShyLG8pfSxzaG93RGV0ZXJtaW5hdGVXaXRoTGFiZWw6ZnVuY3Rpb24oZSxuLHIpe3ZhciBvPWV8fCExLHQ9bnx8NWU0LGk9cnx8XCJMb2FkaW5nLi4uXCI7cmV0dXJuIFByb2dyZXNzSW5kaWNhdG9yLnNob3dEZXRlcm1pbmF0ZVdpdGhMYWJlbChvLHQsaSl9LHNob3dBbm51bGFyOmZ1bmN0aW9uKGUsbil7dmFyIHI9ZXx8ITEsbz1ufHw1ZTQ7cmV0dXJuIFByb2dyZXNzSW5kaWNhdG9yLnNob3dBbm51bGFyKHIsbyl9LHNob3dBbm51bGFyV2l0aExhYmVsOmZ1bmN0aW9uKGUsbixyKXt2YXIgbz1lfHwhMSx0PW58fDVlNCxpPXJ8fFwiTG9hZGluZy4uLlwiO3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93QW5udWxhcldpdGhMYWJlbChvLHQsaSl9LHNob3dCYXI6ZnVuY3Rpb24oZSxuKXt2YXIgcj1lfHwhMSxvPW58fDVlNDtyZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3Iuc2hvd0JhcihyLG8pfSxzaG93QmFyV2l0aExhYmVsOmZ1bmN0aW9uKGUsbixyKXt2YXIgbz1lfHwhMSx0PW58fDVlNCxpPXJ8fFwiTG9hZGluZy4uLlwiO3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93QmFyV2l0aExhYmVsKG8sdCxpKX0sc2hvd1N1Y2Nlc3M6ZnVuY3Rpb24oZSxuKXt2YXIgcj1lfHwhMSxvPW58fFwiU3VjY2Vzc1wiO3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93U3VjY2VzcyhyLG8pfSxzaG93VGV4dDpmdW5jdGlvbihlLG4scil7dmFyIG89ZXx8ITEsdD1ufHxcIldhcm5pbmdcIixpPXJ8fFwiY2VudGVyXCI7cmV0dXJuIFByb2dyZXNzSW5kaWNhdG9yLnNob3dUZXh0KG8sdCxpKX0saGlkZTpmdW5jdGlvbigpe3JldHVybiBQcm9ncmVzc0luZGljYXRvci5oaWRlKCl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnB1c2hcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhUHVzaFwiLFtcIiRxXCIsXCIkd2luZG93XCIsXCIkcm9vdFNjb3BlXCIsXCIkdGltZW91dFwiLGZ1bmN0aW9uKGUsbixyLG8pe3JldHVybntvbk5vdGlmaWNhdGlvbjpmdW5jdGlvbihlKXtvKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFQdXNoOm5vdGlmaWNhdGlvblJlY2VpdmVkXCIsZSl9KX0scmVnaXN0ZXI6ZnVuY3Rpb24ocil7dmFyIG8sdD1lLmRlZmVyKCk7cmV0dXJuIHZvaWQgMCE9PXImJnZvaWQgMD09PXIuZWNiJiYobz1udWxsPT09ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltuZy1hcHBdXCIpP1wiZG9jdW1lbnQuYm9keVwiOlwiZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW25nLWFwcF0nKVwiLHIuZWNiPVwiYW5ndWxhci5lbGVtZW50KFwiK28rXCIpLmluamVjdG9yKCkuZ2V0KCckY29yZG92YVB1c2gnKS5vbk5vdGlmaWNhdGlvblwiKSxuLnBsdWdpbnMucHVzaE5vdGlmaWNhdGlvbi5yZWdpc3RlcihmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSxyKSx0LnByb21pc2V9LHVucmVnaXN0ZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMucHVzaE5vdGlmaWNhdGlvbi51bnJlZ2lzdGVyKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9LHIpLG8ucHJvbWlzZX0sc2V0QmFkZ2VOdW1iZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMucHVzaE5vdGlmaWNhdGlvbi5zZXRBcHBsaWNhdGlvbkljb25CYWRnZU51bWJlcihmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSxyKSxvLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnB1c2hfdjVcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhUHVzaFY1XCIsW1wiJHFcIixcIiRyb290U2NvcGVcIixcIiR0aW1lb3V0XCIsZnVuY3Rpb24oZSxuLHIpe3ZhciBvO3JldHVybntpbml0aWFsaXplOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbz1QdXNoTm90aWZpY2F0aW9uLmluaXQobiksci5yZXNvbHZlKG8pLHIucHJvbWlzZX0sb25Ob3RpZmljYXRpb246ZnVuY3Rpb24oKXtyKGZ1bmN0aW9uKCl7by5vbihcIm5vdGlmaWNhdGlvblwiLGZ1bmN0aW9uKGUpe24uJGVtaXQoXCIkY29yZG92YVB1c2hWNTpub3RpZmljYXRpb25SZWNlaXZlZFwiLGUpfSl9KX0sb25FcnJvcjpmdW5jdGlvbigpe3IoZnVuY3Rpb24oKXtvLm9uKFwiZXJyb3JcIixmdW5jdGlvbihlKXtuLiRlbWl0KFwiJGNvcmRvdmFQdXNoVjU6ZXJyb3JPY2N1cnJlZFwiLGUpfSl9KX0scmVnaXN0ZXI6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIHZvaWQgMD09PW8/bi5yZWplY3QobmV3IEVycm9yKFwiaW5pdCBtdXN0IGJlIGNhbGxlZCBiZWZvcmUgYW55IG90aGVyIG9wZXJhdGlvblwiKSk6by5vbihcInJlZ2lzdHJhdGlvblwiLGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlLnJlZ2lzdHJhdGlvbklkKX0pLG4ucHJvbWlzZX0sdW5yZWdpc3RlcjpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gdm9pZCAwPT09bz9uLnJlamVjdChuZXcgRXJyb3IoXCJpbml0IG11c3QgYmUgY2FsbGVkIGJlZm9yZSBhbnkgb3RoZXIgb3BlcmF0aW9uXCIpKTpvLnVucmVnaXN0ZXIoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sZ2V0QmFkZ2VOdW1iZXI6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIHZvaWQgMD09PW8/bi5yZWplY3QobmV3IEVycm9yKFwiaW5pdCBtdXN0IGJlIGNhbGxlZCBiZWZvcmUgYW55IG90aGVyIG9wZXJhdGlvblwiKSk6by5nZXRBcHBsaWNhdGlvbkljb25CYWRnZU51bWJlcihmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxzZXRCYWRnZU51bWJlcjpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIHZvaWQgMD09PW8/ci5yZWplY3QobmV3IEVycm9yKFwiaW5pdCBtdXN0IGJlIGNhbGxlZCBiZWZvcmUgYW55IG90aGVyIG9wZXJhdGlvblwiKSk6by5zZXRBcHBsaWNhdGlvbkljb25CYWRnZU51bWJlcihmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKSxyLnByb21pc2V9LGZpbmlzaDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gdm9pZCAwPT09bz9uLnJlamVjdChuZXcgRXJyb3IoXCJpbml0IG11c3QgYmUgY2FsbGVkIGJlZm9yZSBhbnkgb3RoZXIgb3BlcmF0aW9uXCIpKTpvLmZpbmlzaChmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5yZWNlbnRzQ29udHJvbFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFSZWNlbnRzXCIsZnVuY3Rpb24oKXtyZXR1cm57c2V0Q29sb3I6ZnVuY3Rpb24oZSl7cmV0dXJuIFJlY2VudHNDb250cm9sLnNldENvbG9yKGUpfSxzZXREZXNjcmlwdGlvbjpmdW5jdGlvbihlKXtyZXR1cm4gUmVjZW50c0NvbnRyb2wuc2V0RGVzY3JpcHRpb24oZSl9LHNldE9wdGlvbnM6ZnVuY3Rpb24oZSxuKXtyZXR1cm4gUmVjZW50c0NvbnRyb2wuc2V0T3B0aW9ucyhlLG4pfX19KSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnNjcmVlbnNob3RcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhU2NyZWVuc2hvdFwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2NhcHR1cmVUb0ZpbGU6ZnVuY3Rpb24obil7dmFyIHI9bnx8e30sbz1yLmV4dGVuc2lvbnx8XCJqcGdcIix0PXIucXVhbGl0eXx8XCIxMDBcIixpPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLnNjcmVlbnNob3Q/KG5hdmlnYXRvci5zY3JlZW5zaG90LnNhdmUoZnVuY3Rpb24oZSxuKXtlP2kucmVqZWN0KGUpOmkucmVzb2x2ZShuLmZpbGVQYXRoKX0sbyx0LHIuZmlsZW5hbWUpLGkucHJvbWlzZSk6KGkucmVzb2x2ZShudWxsKSxpLnByb21pc2UpfSxjYXB0dXJlVG9Vcmk6ZnVuY3Rpb24obil7dmFyIHI9bnx8e30sbz1yLmV4dGVuc2lvbnx8XCJqcGdcIix0PXIucXVhbGl0eXx8XCIxMDBcIixpPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLnNjcmVlbnNob3Q/KG5hdmlnYXRvci5zY3JlZW5zaG90LlVSSShmdW5jdGlvbihlLG4pe2U/aS5yZWplY3QoZSk6aS5yZXNvbHZlKG4uVVJJKX0sbyx0LHIuZmlsZW5hbWUpLGkucHJvbWlzZSk6KGkucmVzb2x2ZShudWxsKSxpLnByb21pc2UpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5zZXJpYWxcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhU2VyaWFsXCIsW1wiJHFcIixmdW5jdGlvbihlKXt2YXIgbj17fTtyZXR1cm4gbi5yZXF1ZXN0UGVybWlzc2lvbj1mdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIHNlcmlhbC5yZXF1ZXN0UGVybWlzc2lvbihuLGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxuLm9wZW49ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBzZXJpYWwub3BlbihuLGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxuLndyaXRlPWZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gc2VyaWFsLndyaXRlKG4sZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LG4ud3JpdGVIZXg9ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBzZXJpYWwud3JpdGVIZXgobixmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sbi5yZWFkPWZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBzZXJpYWwucmVhZChmdW5jdGlvbihlKXt2YXIgcj1uZXcgVWludDhBcnJheShlKTtuLnJlc29sdmUocil9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxuLnJlZ2lzdGVyUmVhZENhbGxiYWNrPWZ1bmN0aW9uKGUsbil7c2VyaWFsLnJlZ2lzdGVyUmVhZENhbGxiYWNrKGZ1bmN0aW9uKG4pe3ZhciByPW5ldyBVaW50OEFycmF5KG4pO2Uocil9LG4pfSxuLmNsb3NlPWZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBzZXJpYWwuY2xvc2UoZnVuY3Rpb24oKXtuLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9LG59XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5zbXNcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhU21zXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57c2VuZDpmdW5jdGlvbihuLHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBzbXMuc2VuZChuLHIsbyxmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSksdC5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5zb2NpYWxTaGFyaW5nXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVNvY2lhbFNoYXJpbmdcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3NoYXJlOmZ1bmN0aW9uKHIsbyx0LGkpe3ZhciBhPWUuZGVmZXIoKTtyZXR1cm4gbz1vfHxudWxsLHQ9dHx8bnVsbCxpPWl8fG51bGwsbi5wbHVnaW5zLnNvY2lhbHNoYXJpbmcuc2hhcmUocixvLHQsaSxmdW5jdGlvbigpe2EucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKCl7YS5yZWplY3QoITEpfSksYS5wcm9taXNlfSxzaGFyZVdpdGhPcHRpb25zOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnNvY2lhbHNoYXJpbmcuc2hhcmVXaXRoT3B0aW9ucyhyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCEwKX0sZnVuY3Rpb24oKXtvLnJlamVjdCghMSl9KSxvLnByb21pc2V9LHNoYXJlVmlhVHdpdHRlcjpmdW5jdGlvbihyLG8sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsdD10fHxudWxsLG4ucGx1Z2lucy5zb2NpYWxzaGFyaW5nLnNoYXJlVmlhVHdpdHRlcihyLG8sdCxmdW5jdGlvbigpe2kucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKCl7aS5yZWplY3QoITEpfSksaS5wcm9taXNlfSxzaGFyZVZpYVdoYXRzQXBwOmZ1bmN0aW9uKHIsbyx0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCx0PXR8fG51bGwsbi5wbHVnaW5zLnNvY2lhbHNoYXJpbmcuc2hhcmVWaWFXaGF0c0FwcChyLG8sdCxmdW5jdGlvbigpe2kucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKCl7aS5yZWplY3QoITEpfSksaS5wcm9taXNlfSxzaGFyZVZpYUZhY2Vib29rOmZ1bmN0aW9uKHIsbyx0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxvPW98fG51bGwsdD10fHxudWxsLG4ucGx1Z2lucy5zb2NpYWxzaGFyaW5nLnNoYXJlVmlhRmFjZWJvb2socixvLHQsZnVuY3Rpb24oKXtpLnJlc29sdmUoITApfSxmdW5jdGlvbigpe2kucmVqZWN0KCExKX0pLGkucHJvbWlzZX0sc2hhcmVWaWFGYWNlYm9va1dpdGhQYXN0ZU1lc3NhZ2VIaW50OmZ1bmN0aW9uKHIsbyx0LGkpe3ZhciBhPWUuZGVmZXIoKTtyZXR1cm4gbz1vfHxudWxsLHQ9dHx8bnVsbCxuLnBsdWdpbnMuc29jaWFsc2hhcmluZy5zaGFyZVZpYUZhY2Vib29rV2l0aFBhc3RlTWVzc2FnZUhpbnQocixvLHQsaSxmdW5jdGlvbigpe2EucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKCl7YS5yZWplY3QoITEpfSksYS5wcm9taXNlfSxzaGFyZVZpYVNNUzpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnNvY2lhbHNoYXJpbmcuc2hhcmVWaWFTTVMocixvLGZ1bmN0aW9uKCl7dC5yZXNvbHZlKCEwKX0sZnVuY3Rpb24oKXt0LnJlamVjdCghMSl9KSx0LnByb21pc2V9LHNoYXJlVmlhRW1haWw6ZnVuY3Rpb24ocixvLHQsaSxhLGMpe3ZhciB1PWUuZGVmZXIoKTtyZXR1cm4gdD10fHxudWxsLGk9aXx8bnVsbCxhPWF8fG51bGwsYz1jfHxudWxsLG4ucGx1Z2lucy5zb2NpYWxzaGFyaW5nLnNoYXJlVmlhRW1haWwocixvLHQsaSxhLGMsZnVuY3Rpb24oKXt1LnJlc29sdmUoITApfSxmdW5jdGlvbigpe3UucmVqZWN0KCExKX0pLHUucHJvbWlzZX0sc2hhcmVWaWE6ZnVuY3Rpb24ocixvLHQsaSxhKXt2YXIgYz1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCx0PXR8fG51bGwsaT1pfHxudWxsLGE9YXx8bnVsbCxuLnBsdWdpbnMuc29jaWFsc2hhcmluZy5zaGFyZVZpYShyLG8sdCxpLGEsZnVuY3Rpb24oKXtjLnJlc29sdmUoITApfSxmdW5jdGlvbigpe2MucmVqZWN0KCExKX0pLGMucHJvbWlzZX0sY2FuU2hhcmVWaWFFbWFpbDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnNvY2lhbHNoYXJpbmcuY2FuU2hhcmVWaWFFbWFpbChmdW5jdGlvbigpe3IucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoITEpfSksci5wcm9taXNlfSxjYW5TaGFyZVZpYTpmdW5jdGlvbihyLG8sdCxpLGEpe3ZhciBjPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnNvY2lhbHNoYXJpbmcuY2FuU2hhcmVWaWEocixvLHQsaSxhLGZ1bmN0aW9uKGUpe2MucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7Yy5yZWplY3QoZSl9KSxjLnByb21pc2V9LGF2YWlsYWJsZTpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gd2luZG93LnBsdWdpbnMuc29jaWFsc2hhcmluZy5hdmFpbGFibGUoZnVuY3Rpb24oZSl7ZT9uLnJlc29sdmUoKTpuLnJlamVjdCgpfSksbi5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5zcGlubmVyRGlhbG9nXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVNwaW5uZXJEaWFsb2dcIixbXCIkd2luZG93XCIsZnVuY3Rpb24oZSl7cmV0dXJue3Nob3c6ZnVuY3Rpb24obixyLG8sdCl7cmV0dXJuIG89b3x8ITEsZS5wbHVnaW5zLnNwaW5uZXJEaWFsb2cuc2hvdyhuLHIsbyx0KX0saGlkZTpmdW5jdGlvbigpe3JldHVybiBlLnBsdWdpbnMuc3Bpbm5lckRpYWxvZy5oaWRlKCl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnNwbGFzaHNjcmVlblwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFTcGxhc2hzY3JlZW5cIixbZnVuY3Rpb24oKXtyZXR1cm57aGlkZTpmdW5jdGlvbigpe3JldHVybiBuYXZpZ2F0b3Iuc3BsYXNoc2NyZWVuLmhpZGUoKX0sc2hvdzpmdW5jdGlvbigpe3JldHVybiBuYXZpZ2F0b3Iuc3BsYXNoc2NyZWVuLnNob3coKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuc3FsaXRlXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVNRTGl0ZVwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57b3BlbkRCOmZ1bmN0aW9uKGUscil7cmV0dXJuIGFuZ3VsYXIuaXNPYmplY3QoZSkmJiFhbmd1bGFyLmlzU3RyaW5nKGUpPyhcInVuZGVmaW5lZFwiIT10eXBlb2YgciYmKGUuYmdUeXBlPXIpLG4uc3FsaXRlUGx1Z2luLm9wZW5EYXRhYmFzZShlKSk6bi5zcWxpdGVQbHVnaW4ub3BlbkRhdGFiYXNlKHtuYW1lOmUsYmdUeXBlOnJ9KX0sZXhlY3V0ZTpmdW5jdGlvbihuLHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLnRyYW5zYWN0aW9uKGZ1bmN0aW9uKGUpe2UuZXhlY3V0ZVNxbChyLG8sZnVuY3Rpb24oZSxuKXt0LnJlc29sdmUobil9LGZ1bmN0aW9uKGUsbil7dC5yZWplY3Qobil9KX0pLHQucHJvbWlzZX0saW5zZXJ0Q29sbGVjdGlvbjpmdW5jdGlvbihuLHIsbyl7dmFyIHQ9ZS5kZWZlcigpLGk9by5zbGljZSgwKTtyZXR1cm4gbi50cmFuc2FjdGlvbihmdW5jdGlvbihlKXshZnVuY3Rpb24gbigpe3ZhciBvPWkuc3BsaWNlKDAsMSlbMF07dHJ5e2UuZXhlY3V0ZVNxbChyLG8sZnVuY3Rpb24oZSxyKXswPT09aS5sZW5ndGg/dC5yZXNvbHZlKHIpOm4oKX0sZnVuY3Rpb24oZSxuKXt0LnJlamVjdChuKX0pfWNhdGNoKGEpe3QucmVqZWN0KGEpfX0oKX0pLHQucHJvbWlzZX0sbmVzdGVkRXhlY3V0ZTpmdW5jdGlvbihuLHIsbyx0LGkpe3ZhciBhPWUuZGVmZXIoKTtyZXR1cm4gbi50cmFuc2FjdGlvbihmdW5jdGlvbihlKXtlLmV4ZWN1dGVTcWwocix0LGZ1bmN0aW9uKGUsbil7YS5yZXNvbHZlKG4pLGUuZXhlY3V0ZVNxbChvLGksZnVuY3Rpb24oZSxuKXthLnJlc29sdmUobil9KX0pfSxmdW5jdGlvbihlLG4pe2EucmVqZWN0KG4pfSksYS5wcm9taXNlfSxkZWxldGVEQjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uc3FsaXRlUGx1Z2luLmRlbGV0ZURhdGFiYXNlKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuc3RhdHVzYmFyXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVN0YXR1c2JhclwiLFtmdW5jdGlvbigpe3JldHVybntvdmVybGF5c1dlYlZpZXc6ZnVuY3Rpb24oZSl7cmV0dXJuIFN0YXR1c0Jhci5vdmVybGF5c1dlYlZpZXcoISFlKX0sU1RZTEVTOntERUZBVUxUOjAsTElHSFRfQ09OVEVOVDoxLEJMQUNLX1RSQU5TTFVDRU5UOjIsQkxBQ0tfT1BBUVVFOjN9LHN0eWxlOmZ1bmN0aW9uKGUpe3N3aXRjaChlKXtjYXNlIDA6cmV0dXJuIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtjYXNlIDE6cmV0dXJuIFN0YXR1c0Jhci5zdHlsZUxpZ2h0Q29udGVudCgpO2Nhc2UgMjpyZXR1cm4gU3RhdHVzQmFyLnN0eWxlQmxhY2tUcmFuc2x1Y2VudCgpO2Nhc2UgMzpyZXR1cm4gU3RhdHVzQmFyLnN0eWxlQmxhY2tPcGFxdWUoKTtkZWZhdWx0OnJldHVybiBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCl9fSxzdHlsZUNvbG9yOmZ1bmN0aW9uKGUpe3JldHVybiBTdGF0dXNCYXIuYmFja2dyb3VuZENvbG9yQnlOYW1lKGUpfSxzdHlsZUhleDpmdW5jdGlvbihlKXtyZXR1cm4gU3RhdHVzQmFyLmJhY2tncm91bmRDb2xvckJ5SGV4U3RyaW5nKGUpfSxoaWRlOmZ1bmN0aW9uKCl7cmV0dXJuIFN0YXR1c0Jhci5oaWRlKCl9LHNob3c6ZnVuY3Rpb24oKXtyZXR1cm4gU3RhdHVzQmFyLnNob3coKX0saXNWaXNpYmxlOmZ1bmN0aW9uKCl7cmV0dXJuIFN0YXR1c0Jhci5pc1Zpc2libGV9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnRvYXN0XCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVRvYXN0XCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntzaG93U2hvcnRUb3A6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMudG9hc3Quc2hvd1Nob3J0VG9wKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sc2hvd1Nob3J0Q2VudGVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnRvYXN0LnNob3dTaG9ydENlbnRlcihyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHNob3dTaG9ydEJvdHRvbTpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy50b2FzdC5zaG93U2hvcnRCb3R0b20ocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxzaG93TG9uZ1RvcDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy50b2FzdC5zaG93TG9uZ1RvcChyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHNob3dMb25nQ2VudGVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnRvYXN0LnNob3dMb25nQ2VudGVyKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sc2hvd0xvbmdCb3R0b206ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMudG9hc3Quc2hvd0xvbmdCb3R0b20ocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxzaG93V2l0aE9wdGlvbnM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMudG9hc3Quc2hvd1dpdGhPcHRpb25zKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sc2hvdzpmdW5jdGlvbihyLG8sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMudG9hc3Quc2hvdyhyLG8sdCxmdW5jdGlvbihlKXtpLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2kucmVqZWN0KGUpfSksaS5wcm9taXNlfSxoaWRlOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3RyeXtuLnBsdWdpbnMudG9hc3QuaGlkZSgpLHIucmVzb2x2ZSgpfWNhdGNoKG8pe3IucmVqZWN0KG8mJm8ubWVzc2FnZSl9cmV0dXJuIHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMudG91Y2hpZFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFUb3VjaElEXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57Y2hlY2tTdXBwb3J0OmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiB3aW5kb3cuY29yZG92YT90b3VjaGlkLmNoZWNrU3VwcG9ydChmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSk6bi5yZWplY3QoXCJOb3Qgc3VwcG9ydGVkIHdpdGhvdXQgY29yZG92YS5qc1wiKSxuLnByb21pc2V9LGF1dGhlbnRpY2F0ZTpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIHdpbmRvdy5jb3Jkb3ZhP3RvdWNoaWQuYXV0aGVudGljYXRlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LG4pOnIucmVqZWN0KFwiTm90IHN1cHBvcnRlZCB3aXRob3V0IGNvcmRvdmEuanNcIiksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy50dHNcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhVFRTXCIsZnVuY3Rpb24oKXtyZXR1cm57c3BlYWs6ZnVuY3Rpb24oZSxuLHIpe3JldHVybiBUVFMuc3BlYWsoZSxuLHIpfX19KSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnVwc1B1c2hcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhVXBzUHVzaFwiLFtcIiRxXCIsXCIkd2luZG93XCIsXCIkcm9vdFNjb3BlXCIsXCIkdGltZW91dFwiLGZ1bmN0aW9uKGUsbixyLG8pe3JldHVybntyZWdpc3RlcjpmdW5jdGlvbih0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIG4ucHVzaC5yZWdpc3RlcihmdW5jdGlvbihlKXtvKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFVcHNQdXNoOm5vdGlmaWNhdGlvblJlY2VpdmVkXCIsZSl9KX0sZnVuY3Rpb24oKXtpLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7aS5yZWplY3QoZSl9LHQpLGkucHJvbWlzZX0sdW5yZWdpc3RlcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucHVzaC51bnJlZ2lzdGVyKGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSxyKSxvLnByb21pc2V9LHNldEJhZGdlTnVtYmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wdXNoLnNldEFwcGxpY2F0aW9uSWNvbkJhZGdlTnVtYmVyKGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LHIpLG8ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMudmlicmF0aW9uXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVZpYnJhdGlvblwiLFtmdW5jdGlvbigpe3JldHVybnt2aWJyYXRlOmZ1bmN0aW9uKGUpe3JldHVybiBuYXZpZ2F0b3Iubm90aWZpY2F0aW9uLnZpYnJhdGUoZSl9LHZpYnJhdGVXaXRoUGF0dGVybjpmdW5jdGlvbihlLG4pe3JldHVybiBuYXZpZ2F0b3Iubm90aWZpY2F0aW9uLnZpYnJhdGVXaXRoUGF0dGVybihlLG4pfSxjYW5jZWxWaWJyYXRpb246ZnVuY3Rpb24oKXtyZXR1cm4gbmF2aWdhdG9yLm5vdGlmaWNhdGlvbi5jYW5jZWxWaWJyYXRpb24oKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMudmlkZW9DYXB0dXJlUGx1c1wiLFtdKS5wcm92aWRlcihcIiRjb3Jkb3ZhVmlkZW9DYXB0dXJlUGx1c1wiLFtmdW5jdGlvbigpe3ZhciBlPXt9O3RoaXMuc2V0TGltaXQ9ZnVuY3Rpb24obil7ZS5saW1pdD1ufSx0aGlzLnNldE1heER1cmF0aW9uPWZ1bmN0aW9uKG4pe2UuZHVyYXRpb249bn0sdGhpcy5zZXRIaWdoUXVhbGl0eT1mdW5jdGlvbihuKXtlLmhpZ2hxdWFsaXR5PW59LHRoaXMudXNlRnJvbnRDYW1lcmE9ZnVuY3Rpb24obil7ZS5mcm9udGNhbWVyYT1ufSx0aGlzLnNldFBvcnRyYWl0T3ZlcmxheT1mdW5jdGlvbihuKXtlLnBvcnRyYWl0T3ZlcmxheT1ufSx0aGlzLnNldExhbmRzY2FwZU92ZXJsYXk9ZnVuY3Rpb24obil7ZS5sYW5kc2NhcGVPdmVybGF5PW59LHRoaXMuc2V0T3ZlcmxheVRleHQ9ZnVuY3Rpb24obil7ZS5vdmVybGF5VGV4dD1ufSx0aGlzLiRnZXQ9W1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihuLHIpe3JldHVybntjYXB0dXJlVmlkZW86ZnVuY3Rpb24obyl7dmFyIHQ9bi5kZWZlcigpO3JldHVybiByLnBsdWdpbnMudmlkZW9jYXB0dXJlcGx1cz8oci5wbHVnaW5zLnZpZGVvY2FwdHVyZXBsdXMuY2FwdHVyZVZpZGVvKHQucmVzb2x2ZSx0LnJlamVjdCxhbmd1bGFyLmV4dGVuZCh7fSxlLG8pKSx0LnByb21pc2UpOih0LnJlc29sdmUobnVsbCksdC5wcm9taXNlKX19fV19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy56aXBcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhWmlwXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybnt1bnppcDpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi56aXAudW56aXAocixvLGZ1bmN0aW9uKGUpezA9PT1lP3QucmVzb2x2ZSgpOnQucmVqZWN0KCl9LGZ1bmN0aW9uKGUpe3Qubm90aWZ5KGUpfSksdC5wcm9taXNlfX19XSl9KCk7IiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuc2VydmljZShcImNob3JlU2VydmljZVwiLCBmdW5jdGlvbigkaHR0cCwkcSwkYXV0aCl7XG5cbnRoaXMuZ2V0VXNlckluZm8gPSAkYXV0aC5nZXRQYXlsb2FkKCk7XG5cblxudGhpcy5nZXREZWZhdWx0Q2hvcmVzID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6XCJHRVRcIixcbiAgICB1cmw6XCIvZGVmYXVsdGNob3Jlc1wiXG4gIH0pXG59XG5cblxuXG5cblxufSkvL2VuZCBvZiBzZXJ2aWNlXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5zZXJ2aWNlKCdsb2dpblNlcnZpY2UnLCBmdW5jdGlvbigkaHR0cCl7XG5cblxuICB0aGlzLnVzZXJMb2dpbiA9IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICBjb25zb2xlLmxvZyh1c2VyLCBcInNlcnZpY2VcIilcbiAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIHVybDogJy9hdXRoL2xvZ2luJyxcbiAgICAgIGRhdGE6IHVzZXJcbiAgICB9KVxuICB9XG4gIHRoaXMubWFrZVVzZXIgPSBmdW5jdGlvbihuZXdVc2VyKSB7XG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB1cmw6ICcvYXV0aC9zaWdudXAnLFxuICAgICAgZGF0YTogbmV3VXNlclxuICAgIH0pXG4gIH1cbn0pIC8vIGVuZCBvZiBzZXJ2aWNlXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5zZXJ2aWNlKCd1c2VyU2VydmljZScsIGZ1bmN0aW9uKCRodHRwLCRxLCRhdXRoKXtcblxudmFyIGJhbm5lcjtcbnRoaXMuZ2V0VXNlckluZm87XG5cblxudGhpcy5wb3N0YmFubmVyID0gZnVuY3Rpb24oYmFubmVyKXtcbiAgY29uc29sZS5sb2coYmFubmVyKTtcbiAgY29uc29sZS5sb2coYmFubmVyLnVzZXJfYmFubmVyX2ltYWdlKTtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgdXJsOlwiL2Jhbm5lci9cIiArIGJhbm5lci51c2VyX2hvdXNlaG9sZCxcbiAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7dXNlcl9iYW5uZXJfaW1hZ2U6YmFubmVyLnVzZXJfYmFubmVyX2ltYWdlfSlcbiAgfSlcbn1cblxudGhpcy5nZXRiYW5uZXIgPSBmdW5jdGlvbih1c2VySWQpe1xuICBjb25zb2xlLmxvZyh1c2VySWQpO1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6XCIvYmFubmVyL1wiICsgdXNlcklkXG4gIH0pXG59XG5cblxudGhpcy5nZXRXZWF0aGVyID0gZnVuY3Rpb24oKXtcbnJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIHVybDonaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPXppcD04NDAxMCZ1bml0cz1pbXBlcmlhbCZhcHBpZD1jMTBlZjk5YzVhZmRlZTNmZGZiYTc4ZThjOTgxYTliNidcbiAgfSlcblxufTtcblxudGhpcy5hZGRDaGlsZCA9IGZ1bmN0aW9uKGNoaWxkKXtcbiAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoY2hpbGQpKTtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6XCJQT1NUXCIsXG4gICAgdXJsOlwiL2NoaWxkcmVuXCIsXG4gICAgZGF0YTogY2hpbGRcbiAgfSlcbn1cblxuXG5cblxufSk7Ly9lbmQgb2Ygc2VydmljZVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImFkZENoaWxkQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsdXNlclNlcnZpY2UsJHN0YXRlKXtcbiAgLy9iYWNrYnV0dG9uXG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxuICB9XG52YXIgdXNlciA9IHVzZXJTZXJ2aWNlLmdldFVzZXJJbmZvLnN1YjtcbmNvbnNvbGUubG9nKHVzZXIpO1xuJHNjb3BlLnN1Ym1pdENoaWxkID0gZnVuY3Rpb24oY2hpbGQpe1xuICBjaGlsZC51c2VyX2hvdXNlaG9sZCA9IHVzZXIudXNlcl9ob3VzZWhvbGQ7XG4gIGNvbnNvbGUubG9nKGNoaWxkKTtcbiAgdXNlclNlcnZpY2UuYWRkQ2hpbGQoY2hpbGQpXG4gIC50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gICAgJHN0YXRlLmdvKCdob21lJyk7XG4gIH0pO1xuXG59XG5cblxuXG5cblxufSkgLy9lbmQgb2YgY29udHJvbGxlclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImFzc2lnbkNob3JlQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsY2hvcmVTZXJ2aWNlLCRzdGF0ZSl7XG5cbnZhciBjdXJyZW50VXNlciA9IGNob3JlU2VydmljZS5nZXRVc2VySW5mby5zdWI7XG5cblxuY2hvcmVTZXJ2aWNlLmdldERlZmF1bHRDaG9yZXMoKVxuLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgJHNjb3BlLmNob3JlcyA9IHJlcy5kYXRhO1xuICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG59KVxuXG5cblxuXG5cblxuXG59KS8vZW5kIG9mIGNvbnRyb2xsZXJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoJ2NhbWVyYUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRjb3Jkb3ZhQ2FtZXJhKSB7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRldmljZXJlYWR5XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICRjb3Jkb3ZhUGx1Z2luLnNvbWVGdW5jdGlvbigpLnRoZW4oc3VjY2VzcywgZXJyb3IpO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIC8vIE9SIHdpdGggSU9OSUNcblxuICAgICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgJGNvcmRvdmFQbHVnaW4uc29tZUZ1bmN0aW9uKCkudGhlbihzdWNjZXNzLCBlcnJvcik7XG4gICAgfSk7XG5cbiAgJHNjb3BlLnRha2VQaWN0dXJlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICBxdWFsaXR5OiA1MCxcbiAgICAgIGRlc3RpbmF0aW9uVHlwZTogQ2FtZXJhLkRlc3RpbmF0aW9uVHlwZS5EQVRBX1VSTCxcbiAgICAgIHNvdXJjZVR5cGU6IENhbWVyYS5QaWN0dXJlU291cmNlVHlwZS5DQU1FUkEsXG4gICAgICBhbGxvd0VkaXQ6IGZhbHNlLFxuICAgICAgZW5jb2RpbmdUeXBlOiBDYW1lcmEuRW5jb2RpbmdUeXBlLkpQRUcsXG4gICAgICB0YXJnZXRXaWR0aDogMzAwLFxuICAgICAgdGFyZ2V0SGVpZ2h0OiAzMDAsXG4gICAgICBwb3BvdmVyT3B0aW9uczogQ2FtZXJhUG9wb3Zlck9wdGlvbnMsXG4gICAgICBzYXZlVG9QaG90b0FsYnVtOiBmYWxzZSxcblx0ICAgIGNvcnJlY3RPcmllbnRhdGlvbjp0cnVlXG4gICAgfTtcblxuICAgICRjb3Jkb3ZhQ2FtZXJhLmdldFBpY3R1cmUob3B0aW9ucykudGhlbihmdW5jdGlvbihpbWFnZURhdGEpIHtcbiAgICAgICRzY29wZS5pbWdVUkkgPSBcImRhdGE6aW1hZ2UvanBlZztiYXNlNjQsXCIgKyBpbWFnZURhdGE7XG4gICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAvLyBlcnJvclxuICAgIH0pO1xuXG4gIH07XG4gIH0sIGZhbHNlKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJjaGlsZEJhbmtDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAkc2NvcGUudGhlbWUgPSAnd2F0ZXInLy9sb2FkIHVzZXIgdGhlbWVcblxuICAgJHNjb3BlLnNldFRoZW1lID0gZnVuY3Rpb24oKXtcbiAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAnYmFzZWJhbGwnKXtcbiAgICAgICAkc2NvcGUudGhlbWVJbWFnZSA9ICcuL2ltZy9pbWctYmFzZWJhbGwtdHJhbnMucG5nJ1xuICAgICB9XG4gICAgIGlmKCRzY29wZS50aGVtZSA9PT0gJ2NoYXJsaWVCcm93bicpe1xuICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL3Nub29weS5wbmcnXG4gICAgIH1cbiAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAncHJpbmNlc3MnKXtcbiAgICAgICAkc2NvcGUudGhlbWVJbWFnZSA9ICcuL2ltZy9Dcm93bl9QcmluY2Vzcy5wbmcnXG4gICAgIH1cbiAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAnc3RhcldhcnMnKXtcbiAgICAgICAkc2NvcGUudGhlbWVJbWFnZSA9ICcuL2ltZy9kZWF0aC1zdGFyLTJuZC1pY29uLnBuZydcbiAgICAgfVxuICAgICBpZigkc2NvcGUudGhlbWUgPT09ICd3YXRlcicpe1xuICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL1RyYW5zcGFyZW50X1dhdGVyX0Ryb3BfUE5HX1BpY3R1cmUucG5nJ1xuICAgICB9XG5cbiAgIH1cbiAgICRzY29wZS5zZXRUaGVtZSgpO1xufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJjaGlsZEhvbWVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwsICRhdXRoLCB1c2VyU2VydmljZSl7XG4gIC8vICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gIGNoaWxkIEhvbWUgY29udHJvbGxlclwiXG4gIC8vdmFyIHVzZXJUb2tlbiA9IHVzZXJTZXJ2aWNlLmdldFVzZXJJbmZvLnN1YjtcblxuICB2YXIgdXNlclRva2VuID0gJGF1dGguZ2V0UGF5bG9hZCgpO1xuICB1c2VyU2VydmljZS5nZXRVc2VySW5mbyA9IHVzZXJUb2tlbjtcbiAgdmFyIHVzZXIgPSB1c2VyVG9rZW4uc3ViO1xuXG4gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgndGhlbWVNb2RhbC5odG1sJywge1xuICAgICBpZDogJzEnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDEgPSBtb2RhbDtcbiAgIH0pO1xuXG4gICAvLyBNb2RhbCAyXG4gIC8vICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3Rha2VQaWN0dXJlTW9kYWwuaHRtbCcsIHtcbiAgLy8gICAgaWQ6ICcyJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gIC8vICAgIHNjb3BlOiAkc2NvcGUsXG4gIC8vICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgLy8gICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gIC8vICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gIC8vICAgICRzY29wZS5vTW9kYWwyID0gbW9kYWw7XG4gIC8vICB9KTtcbiAgICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICBpZiAoaW5kZXggPT0gMSkgJHNjb3BlLm9Nb2RhbDEuc2hvdygpO1xuICAgICBlbHNlICRzY29wZS5vTW9kYWwyLnNob3coKTtcbiAgIH07XG5cbiAgICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgaWYgKGluZGV4ID09IDEpICRzY29wZS5vTW9kYWwxLmhpZGUoKTtcbiAgICAgZWxzZSAkc2NvcGUub01vZGFsMi5oaWRlKCk7XG4gICB9O1xuXG4gICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAkc2NvcGUub01vZGFsMS5yZW1vdmUoKTtcbiAgICAgJHNjb3BlLm9Nb2RhbDIucmVtb3ZlKCk7XG5cbiAgIH0pO1xuXG5cbiAgJHNjb3BlLnRoZW1lID0gdXNlci51c2VyX3RoZW1lXG5jb25zb2xlLmxvZyh1c2VyKTtcblxuXG5cbiAgJHNjb3BlLnNldFRoZW1lID0gZnVuY3Rpb24oY2hvaWNlKXtcbiAgICAvL3NlcnZpY2Uuc2V0VGhlbWUoY2hvaWNlKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAvL2lmKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKXtcbiAgICAkc2NvcGUudGhlbWUgPSBjaG9pY2VcbiAgICAvLyAgfVxuLy8gIH0pXG4gIH1cblxuXG5cblxufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiY2hpbGRMb2dpbkN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkYXV0aCwgJHN0YXRlLCBsb2dpblNlcnZpY2Upe1xuICAvLyAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBjaGlsZCBMb2dpbiBjb250cm9sbGVyXCJcblxuICAgJHNjb3BlLmxvZ2luQ2hpbGQgPSBmdW5jdGlvbih1c2VyKXtcbiAgICAgY29uc29sZS5sb2codXNlcilcbiAgICAgbG9naW5TZXJ2aWNlLnVzZXJMb2dpbih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAkYXV0aC5zZXRUb2tlbihyZXNwb25zZSlcbiAgICAgICAgICRzdGF0ZS5nbygnY2hpbGRIb21lJylcblxuICAgICB9KVxuICAgfVxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJlZGl0Q2hpbGRDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxuICB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiaGlzdG9yeUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gSGlzdG9yeSBjb250cm9sbGVyXCJcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJob21lQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsLHVzZXJTZXJ2aWNlLCR3aW5kb3csICRhdXRoKXtcbnZhciB1c2VyVG9rZW4gPSB1c2VyU2VydmljZS5nZXRVc2VySW5mby5zdWI7XG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2Jhbm5lck1vZGFsLmh0bWwnLCB7XG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUubW9kYWwgPSBtb2RhbDtcbiAgIH0pO1xuICAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICAkc2NvcGUubW9kYWwuc2hvdygpO1xuICAgfTtcbiAgICRzY29wZS5zdWJtaXRCYW5uZXIgPSBmdW5jdGlvbihiYW5uZXIpe1xuICAgICB2YXIgYmFubmVySW5mbyA9IHtcbiAgICAgICB1c2VyX2hvdXNlaG9sZDp1c2VyVG9rZW4udXNlcl9ob3VzZWhvbGQsXG4gICAgICAgdXNlcl9iYW5uZXJfaW1hZ2U6YmFubmVyXG4gICAgIH1cbiAgICAgIHVzZXJTZXJ2aWNlLnBvc3RiYW5uZXIoYmFubmVySW5mbylcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbC1ib3hcIikudmFsdWUgPSAnJztcbiAgICAgICAgICAkd2luZG93LmxvY2F0aW9uLnJlbG9hZCh0cnVlKTtcbiAgICAgfSk7XG4gICB9O1xuICAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbC1ib3hcIikudmFsdWUgPSAnJztcbiAgICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcbiAgIH07XG4gICAvLyBDbGVhbnVwIHRoZSBtb2RhbCB3aGVuIHdlJ3JlIGRvbmUgd2l0aCBpdCFcbiAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICRzY29wZS5tb2RhbC5yZW1vdmUoKTtcbiAgIH0pO1xuICAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gaGlkZSBtb2RhbFxuICAgJHNjb3BlLiRvbignbW9kYWwuaGlkZGVuJywgZnVuY3Rpb24oKSB7XG4gICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG5cbiAgIH0pO1xuICAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gcmVtb3ZlIG1vZGFsXG4gICAkc2NvcGUuJG9uKCdtb2RhbC5yZW1vdmVkJywgZnVuY3Rpb24oKSB7XG4gICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gICB9KTtcblxuJHNjb3BlLmhvdXNlaG9sZCA9ICB1c2VyVG9rZW4udXNlcl9ob3VzZWhvbGQ7XG51c2VyU2VydmljZS5nZXRiYW5uZXIodXNlclRva2VuLnVzZXJfaG91c2Vob2xkKS50aGVuKGZ1bmN0aW9uKHJlcyl7XG5jb25zb2xlLmxvZyhyZXMuZGF0YVswXS51c2VyX2Jhbm5lcl9pbWFnZSk7XG4gICRzY29wZS5iYW5uZXIgPSByZXMuZGF0YVswXS51c2VyX2Jhbm5lcl9pbWFnZTtcbn0pO1xuXG5jb25zb2xlLmxvZyh1c2VyVG9rZW4uemlwKTtcblxudXNlclNlcnZpY2UuZ2V0V2VhdGhlcih1c2VyVG9rZW4uemlwKVxuLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAkc2NvcGUud2VhdGhlciA9IHJlcy5kYXRhO1xufSlcblxuXG59KS8vZW5kIG9mIGNvbnRyb2xsZXJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJsb2dpbkN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkYXV0aCwgJHN0YXRlLCBsb2dpblNlcnZpY2Upe1xuXG4kc2NvcGUubG9naW4gPSBmdW5jdGlvbih1c2VyKXtcbiAgLy8gY29uc29sZS5sb2codXNlcilcbiAgbG9naW5TZXJ2aWNlLnVzZXJMb2dpbih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAkYXV0aC5zZXRUb2tlbihyZXNwb25zZSlcbiAgICAgICRzdGF0ZS5nbygnaG9tZScpXG5cbiAgfSlcbn1cbiRzY29wZS5tYWtlVXNlciA9IGZ1bmN0aW9uKG5ld1VzZXIpe1xuICBsb2dpblNlcnZpY2UubWFrZVVzZXIobmV3VXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgJGF1dGguc2V0VG9rZW4ocmVzcG9uc2UpXG4gICAgICAkc3RhdGUuZ28oJ2hvbWUnKVxuICB9KVxufVxuICAkc2NvcGUuYXV0aGVudGljYXRlID0gZnVuY3Rpb24ocHJvdmlkZXIpIHtcbiAgJGF1dGguYXV0aGVudGljYXRlKHByb3ZpZGVyKX07XG4gIC8vICRzY29wZS50ZXN0ID0gXCJIZWxsbyBmcm9tIGxvZ2luIGNvbnRyb2xsZXJcIlxuXG5cbiAgJHNjb3BlLnJldmVhbGVyID0gZnVuY3Rpb24oKXtcbiAgJHNjb3BlLmhpZGUgPSAhJHNjb3BlLmhpZGU7XG4gfVxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcIm1ha2VDaG9yZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XG4gICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpXG4gIH1cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJzZXRSZXdhcmRzQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsKXtcbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdyZXdhcmRNb2RhbC5odG1sJywge1xuICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAkc2NvcGUubW9kYWwgPSBtb2RhbDtcbiAgfSk7XG4gICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwuc2hvdygpO1xuICB9O1xuICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gIH07XG4gIC8vIENsZWFudXAgdGhlIG1vZGFsIHdoZW4gd2UncmUgZG9uZSB3aXRoIGl0IVxuICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5yZW1vdmUoKTtcbiAgfSk7XG4gIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIGhpZGUgbW9kYWxcbiAgJHNjb3BlLiRvbignbW9kYWwuaGlkZGVuJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgfSk7XG4gIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIHJlbW92ZSBtb2RhbFxuICAkc2NvcGUuJG9uKCdtb2RhbC5yZW1vdmVkJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgfSk7XG4gIC8vYmFja2J1dHRvblxuICAkc2NvcGUuZ29iYWNrID0gZnVuY3Rpb24oKXtcbiAgICB3aW5kb3cuaGlzdG9yeS5nbygtMSlcbiAgfVxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcInNldHRpbmdzQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsKXtcbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdjaGFuZ2VQYXNzd29yZC5odG1sJywge1xuICAgICBpZDogJzEnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDEgPSBtb2RhbDtcbiAgIH0pO1xuXG4gICAvLyBNb2RhbCAyXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2NoYW5nZUhvdXNlaG9sZC5odG1sJywge1xuICAgICBpZDogJzInLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDIgPSBtb2RhbDtcbiAgIH0pO1xuXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2NoYW5nZVppcC5odG1sJywge1xuICAgICBpZDogJzMnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDMgPSBtb2RhbDtcbiAgIH0pO1xuXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2FkZFBhcmVudC5odG1sJywge1xuICAgICBpZDogJzQnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDQgPSBtb2RhbDtcbiAgIH0pO1xuXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3JlbW92ZUNoaWxkLmh0bWwnLCB7XG4gICAgIGlkOiAnNScsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsNSA9IG1vZGFsO1xuICAgfSk7XG5cblxuXG4gICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgaWYgKGluZGV4ID09IDEpICRzY29wZS5vTW9kYWwxLnNob3coKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSAyKSAkc2NvcGUub01vZGFsMi5zaG93KCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMykgJHNjb3BlLm9Nb2RhbDMuc2hvdygpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDQpICRzY29wZS5vTW9kYWw0LnNob3coKTtcbiAgICAgZWxzZSAkc2NvcGUub01vZGFsNS5zaG93KCk7XG4gICB9O1xuXG4gICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgIGlmIChpbmRleCA9PSAxKSAkc2NvcGUub01vZGFsMS5oaWRlKCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMikgJHNjb3BlLm9Nb2RhbDIuaGlkZSgpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDMpICRzY29wZS5vTW9kYWwzLmhpZGUoKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSA0KSAkc2NvcGUub01vZGFsNC5oaWRlKCk7XG4gICAgIGVsc2UgJHNjb3BlLm9Nb2RhbDUuaGlkZSgpO1xuICAgfTtcblxuICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDEucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWwyLnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsMy5yZW1vdmUoKTtcbiAgICAgJHNjb3BlLm9Nb2RhbDQucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWw1LnJlbW92ZSgpO1xuICAgfSk7XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwidHJhY2tlckN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCl7XG4gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgncGljQ29uZk1vZGFsLmh0bWwnLCB7XG4gICAgc2NvcGU6ICRzY29wZSxcbiAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICRzY29wZS5tb2RhbCA9IG1vZGFsO1xuICB9KTtcbiAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5zaG93KCk7XG4gIH07XG4gICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcbiAgfTtcbiAgLy8gQ2xlYW51cCB0aGUgbW9kYWwgd2hlbiB3ZSdyZSBkb25lIHdpdGggaXQhXG4gICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuICB9KTtcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gaGlkZSBtb2RhbFxuICAkc2NvcGUuJG9uKCdtb2RhbC5oaWRkZW4nLCBmdW5jdGlvbigpIHtcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxuICB9KTtcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gcmVtb3ZlIG1vZGFsXG4gICRzY29wZS4kb24oJ21vZGFsLnJlbW92ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxuICB9KTtcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJ1c2VySW5mb0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gaW5mbyBjb250cm9sbGVyXCJcblxufSlcbiJdfQ==
