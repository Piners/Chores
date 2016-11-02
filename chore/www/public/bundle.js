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

angular.module('chore').controller("addChildCtrl", function ($scope) {
  //backbutton
  $scope.goback = function () {
    window.history.go(-1);
  };

  $scope.submitChild = function (child) {
    console.log(child);
    $scope.child = "";
    document.getElementById("child-input").value = "";
  };
}); //end of controller
"use strict";

angular.module('chore').controller("assignChoreCtrl", function ($scope) {
   $scope.test = "Message from assign chore controller";
});
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
  $scope.user = userToken.sub;

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

  $scope.theme = $scope.user.user_theme;
  console.log($scope.user);

  $scope.setTheme = function (choice) {
    var data = {};
    data.theme = choice;
    data.user = $scope.user.user_id_pk;
    console.log(data);
    userService.postTheme(data).then(function (response) {
      if (response.status === 200) {
        $scope.theme = choice;
      }
    });
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

angular.module('chore').controller("homeCtrl", function ($scope, $ionicModal, userService) {
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

  // this.postTheme = function(data){
  //   return $http({
  //     method: 'GET',
  //     url:
  //     data: data
  //   }).then(function(res) {
  //       return res;
  //   }).catch(function(err) {
  //      console.log(err);
  //   })
  // }

}); //end of service
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm5nLWNvcmRvdmEubWluLmpzIiwiY29udHJvbGxlcnMvYWRkQ2hpbGRDdHJsLmpzIiwiY29udHJvbGxlcnMvYXNzaWduQ2hvcmVDdHJsLmpzIiwiY29udHJvbGxlcnMvY2FtZXJhQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NoaWxkQmFua0N0cmwuanMiLCJjb250cm9sbGVycy9jaGlsZEhvbWVDdHJsLmpzIiwiY29udHJvbGxlcnMvY2hpbGRMb2dpbkN0cmwuanMiLCJjb250cm9sbGVycy9lZGl0Q2hpbGRDdHJsLmpzIiwiY29udHJvbGxlcnMvaGlzdG9yeUN0cmwuanMiLCJjb250cm9sbGVycy9ob21lQ3RybC5qcyIsImNvbnRyb2xsZXJzL2xvZ2luQ3RybC5qcyIsImNvbnRyb2xsZXJzL21ha2VDaG9yZUN0cmwuanMiLCJjb250cm9sbGVycy9zZXRSZXdhcmRzQ3RybC5qcyIsImNvbnRyb2xsZXJzL3NldHRpbmdzQ3RybC5qcyIsImNvbnRyb2xsZXJzL3RyYWNrZXJDdHJsLmpzIiwiY29udHJvbGxlcnMvdXNlckluZm9DdHJsLmpzIiwic2VydmljZS9sb2dpblNlcnZpY2UuanMiLCJzZXJ2aWNlL3VzZXJTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsIiR1cmxSb3V0ZXJQcm92aWRlciIsIiRhdXRoUHJvdmlkZXIiLCJvdGhlcndpc2UiLCJzdGF0ZSIsInVybCIsInRlbXBsYXRlVXJsIiwiY29udHJvbGxlciIsImZhY2Vib29rIiwiY2xpZW50SWQiLCJyZXNwb25zZVR5cGUiLCJnb29nbGUiLCJydW4iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5Iiwid2luZG93IiwiY29yZG92YSIsInBsdWdpbnMiLCJLZXlib2FyZCIsImhpZGVLZXlib2FyZEFjY2Vzc29yeUJhciIsImRpc2FibGVTY3JvbGwiLCJTdGF0dXNCYXIiLCJzdHlsZURlZmF1bHQiLCJmYWN0b3J5IiwiZSIsIm4iLCJyIiwibyIsInR5cGUiLCJpc0F2YWlsYWJsZSIsImRlZmVyIiwiVGhyZWVEZWVUb3VjaCIsInJlc29sdmUiLCJyZWplY3QiLCJwcm9taXNlIiwiYWRkUXVpY2tBY3Rpb24iLCJ0IiwiaSIsImEiLCJjIiwidSIsInMiLCJsIiwiZiIsInRpdGxlIiwic3VidGl0bGUiLCJpY29uVHlwZSIsImljb25UZW1wbGF0ZSIsInRoZW4iLCJwdXNoIiwiY29uZmlndXJlUXVpY2tBY3Rpb25zIiwib25Ib21lSWNvblByZXNzZWQiLCJhZGRRdWlja0FjdGlvbkhhbmRsZXIiLCJlbmFibGVMaW5rUHJldmlldyIsImFkZEZvcmNlVG91Y2hIYW5kbGVyIiwid2F0Y2hGb3JjZVRvdWNoZXMiLCJzaG93IiwiYWN0aW9uc2hlZXQiLCJoaWRlIiwiY3JlYXRlQmFubmVyVmlldyIsIkFkTW9iIiwiY3JlYXRlSW50ZXJzdGl0aWFsVmlldyIsInJlcXVlc3RBZCIsInNob3dBZCIsInJlcXVlc3RJbnRlcnN0aXRpYWxBZCIsImNoZWNrIiwiYXBwQXZhaWxhYmlsaXR5IiwicHJvdmlkZXIiLCJzZXRQcmVmZXJlbmNlcyIsImlzT2JqZWN0IiwiQXBwUmF0ZSIsInByZWZlcmVuY2VzIiwidXNlTGFuZ3VhZ2UiLCJsYW5ndWFnZSIsImRpc3BsYXlBcHBOYW1lIiwiYXBwTmFtZSIsInByb21wdEFnYWluRm9yRWFjaE5ld1ZlcnNpb24iLCJwcm9tcHRGb3JOZXdWZXJzaW9uIiwib3BlblN0b3JlSW5BcHAiLCJ1c2VzVW50aWxQcm9tcHQiLCJ1c2VDdXN0b21SYXRlRGlhbG9nIiwic3RvcmVBcHBVUkwiLCJpb3MiLCJpb3NVUkwiLCJhbmRyb2lkIiwiYW5kcm9pZFVSTCIsImJsYWNrYmVycnkiLCJibGFja2JlcnJ5VVJMIiwid2luZG93czgiLCJ3aW5kb3dzVVJMIiwic2V0Q3VzdG9tTG9jYWxlIiwibWVzc2FnZSIsImNhbmNlbEJ1dHRvbkxhYmVsIiwibGF0ZXJCdXR0b25MYWJlbCIsInJhdGVCdXR0b25MYWJlbCIsImV4dGVuZCIsImN1c3RvbUxvY2FsZSIsIiRnZXQiLCJwcm9tcHRGb3JSYXRpbmciLCJuYXZpZ2F0ZVRvQXBwU3RvcmUiLCJvbkJ1dHRvbkNsaWNrZWQiLCJjYWxsYmFja3MiLCJiaW5kIiwib25SYXRlRGlhbG9nU2hvdyIsImdldEFwcE5hbWUiLCJnZXRBcHBWZXJzaW9uIiwiZ2V0UGFja2FnZU5hbWUiLCJnZXRWZXJzaW9uTnVtYmVyIiwiZ2V0VmVyc2lvbkNvZGUiLCJpbml0IiwibmF2aWdhdG9yIiwiZ2VvbG9jYXRpb24iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJjb25maWd1cmUiLCJiYWNrZ3JvdW5kR2VvTG9jYXRpb24iLCJub3RpZnkiLCJmaW5pc2giLCJzdGFydCIsInN0b3AiLCJoYXNQZXJtaXNzaW9uIiwibm90aWZpY2F0aW9uIiwiYmFkZ2UiLCJwcm9tcHRGb3JQZXJtaXNzaW9uIiwic2V0IiwiZ2V0IiwiY2xlYXIiLCJpbmNyZWFzZSIsImRlY3JlYXNlIiwic2NhbiIsImJhcmNvZGVTY2FubmVyIiwiZW5jb2RlIiwiJGJyb2FkY2FzdCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImJhdHRlcnkiLCJsb2NhdGlvbk1hbmFnZXIiLCJEZWxlZ2F0ZSIsImRpZERldGVybWluZVN0YXRlRm9yUmVnaW9uIiwiZGlkU3RhcnRNb25pdG9yaW5nRm9yUmVnaW9uIiwiZGlkRXhpdFJlZ2lvbiIsImRpZEVudGVyUmVnaW9uIiwiZGlkUmFuZ2VCZWFjb25zSW5SZWdpb24iLCJwZXJpcGhlcmFsTWFuYWdlckRpZFN0YXJ0QWR2ZXJ0aXNpbmciLCJwZXJpcGhlcmFsTWFuYWdlckRpZFVwZGF0ZVN0YXRlIiwiZGlkQ2hhbmdlQXV0aG9yaXphdGlvblN0YXR1cyIsInNldERlbGVnYXRlIiwic2V0Q2FsbGJhY2tEaWREZXRlcm1pbmVTdGF0ZUZvclJlZ2lvbiIsInNldENhbGxiYWNrRGlkU3RhcnRNb25pdG9yaW5nRm9yUmVnaW9uIiwic2V0Q2FsbGJhY2tEaWRFeGl0UmVnaW9uIiwic2V0Q2FsbGJhY2tEaWRFbnRlclJlZ2lvbiIsInNldENhbGxiYWNrRGlkUmFuZ2VCZWFjb25zSW5SZWdpb24iLCJzZXRDYWxsYmFja1BlcmlwaGVyYWxNYW5hZ2VyRGlkU3RhcnRBZHZlcnRpc2luZyIsInNldENhbGxiYWNrUGVyaXBoZXJhbE1hbmFnZXJEaWRVcGRhdGVTdGF0ZSIsInNldENhbGxiYWNrRGlkQ2hhbmdlQXV0aG9yaXphdGlvblN0YXR1cyIsImNyZWF0ZUJlYWNvblJlZ2lvbiIsIkJlYWNvblJlZ2lvbiIsImlzQmx1ZXRvb3RoRW5hYmxlZCIsIndoZW4iLCJlbmFibGVCbHVldG9vdGgiLCJkaXNhYmxlQmx1ZXRvb3RoIiwic3RhcnRNb25pdG9yaW5nRm9yUmVnaW9uIiwic3RvcE1vbml0b3JpbmdGb3JSZWdpb24iLCJyZXF1ZXN0U3RhdGVGb3JSZWdpb24iLCJzdGFydFJhbmdpbmdCZWFjb25zSW5SZWdpb24iLCJzdG9wUmFuZ2luZ0JlYWNvbnNJblJlZ2lvbiIsImdldEF1dGhvcml6YXRpb25TdGF0dXMiLCJyZXF1ZXN0V2hlbkluVXNlQXV0aG9yaXphdGlvbiIsInJlcXVlc3RBbHdheXNBdXRob3JpemF0aW9uIiwiZ2V0TW9uaXRvcmVkUmVnaW9ucyIsImdldFJhbmdlZFJlZ2lvbnMiLCJpc1JhbmdpbmdBdmFpbGFibGUiLCJpc01vbml0b3JpbmdBdmFpbGFibGVGb3JDbGFzcyIsInN0YXJ0QWR2ZXJ0aXNpbmciLCJzdG9wQWR2ZXJ0aXNpbmciLCJpc0FkdmVydGlzaW5nQXZhaWxhYmxlIiwiaXNBZHZlcnRpc2luZyIsImRpc2FibGVEZWJ1Z0xvZ3MiLCJlbmFibGVEZWJ1Z05vdGlmaWNhdGlvbnMiLCJkaXNhYmxlRGVidWdOb3RpZmljYXRpb25zIiwiZW5hYmxlRGVidWdMb2dzIiwiYXBwZW5kVG9EZXZpY2VMb2ciLCJibGUiLCJzdGFydFNjYW4iLCJzdG9wU2NhbiIsImNvbm5lY3QiLCJkaXNjb25uZWN0IiwicmVhZCIsIndyaXRlIiwid3JpdGVXaXRob3V0UmVzcG9uc2UiLCJ3cml0ZUNvbW1hbmQiLCJ3YXJuaW5nIiwic3RhcnROb3RpZmljYXRpb24iLCJzdG9wTm90aWZpY2F0aW9uIiwiaXNDb25uZWN0ZWQiLCJlbmFibGUiLCJpc0VuYWJsZWQiLCJibHVldG9vdGhTZXJpYWwiLCJjb25uZWN0SW5zZWN1cmUiLCJsaXN0IiwiZGlzY292ZXJVbnBhaXJlZCIsInNldERldmljZURpc2NvdmVyZWRMaXN0ZW5lciIsImNsZWFyRGV2aWNlRGlzY292ZXJlZExpc3RlbmVyIiwic2hvd0JsdWV0b290aFNldHRpbmdzIiwiYXZhaWxhYmxlIiwicmVhZFVudGlsIiwic3Vic2NyaWJlIiwic3Vic2NyaWJlUmF3RGF0YSIsInVuc3Vic2NyaWJlIiwidW5zdWJzY3JpYmVSYXdEYXRhIiwicmVhZFJTU0kiLCJicmlnaHRuZXNzIiwiZ2V0QnJpZ2h0bmVzcyIsInNldEJyaWdodG5lc3MiLCJzZXRLZWVwU2NyZWVuT24iLCJjcmVhdGVDYWxlbmRhciIsImNhbGVuZGFyIiwiZ2V0Q3JlYXRlQ2FsZW5kYXJPcHRpb25zIiwiY2FsZW5kYXJOYW1lIiwiZGVsZXRlQ2FsZW5kYXIiLCJjcmVhdGVFdmVudCIsImxvY2F0aW9uIiwibm90ZXMiLCJzdGFydERhdGUiLCJlbmREYXRlIiwiRGF0ZSIsImNyZWF0ZUV2ZW50V2l0aE9wdGlvbnMiLCJnZXRDYWxlbmRhck9wdGlvbnMiLCJPYmplY3QiLCJrZXlzIiwiaW5kZXhPZiIsImNyZWF0ZUV2ZW50SW50ZXJhY3RpdmVseSIsImNyZWF0ZUV2ZW50SW5OYW1lZENhbGVuZGFyIiwiZmluZEV2ZW50IiwibGlzdEV2ZW50c0luUmFuZ2UiLCJsaXN0Q2FsZW5kYXJzIiwiZmluZEFsbEV2ZW50c0luTmFtZWRDYWxlbmRhciIsIm1vZGlmeUV2ZW50IiwibmV3VGl0bGUiLCJuZXdMb2NhdGlvbiIsIm5ld05vdGVzIiwibmV3U3RhcnREYXRlIiwibmV3RW5kRGF0ZSIsImRlbGV0ZUV2ZW50IiwiZ2V0UGljdHVyZSIsImNhbWVyYSIsImNsZWFudXAiLCJjYXB0dXJlQXVkaW8iLCJkZXZpY2UiLCJjYXB0dXJlIiwiY2FwdHVyZUltYWdlIiwiY2FwdHVyZVZpZGVvIiwiZXhwaXJ5IiwiY3Z2IiwiemlwIiwic3VwcHJlc3NNYW51YWwiLCJzdXBwcmVzc0NvbmZpcm0iLCJoaWRlTG9nbyIsInNldENhcmRJT1Jlc3BvbnNlRmllbGRzIiwiaXNBcnJheSIsInNldFNjYW5lckNvbmZpZyIsInNjYW5DYXJkIiwiQ2FyZElPIiwibGVuZ3RoIiwiU3RyaW5nIiwiZXhwaXJ5X3llYXIiLCJzdWJzdHIiLCJjb3B5IiwiY2xpcGJvYXJkIiwicGFzdGUiLCJzYXZlIiwiY29udGFjdHMiLCJjcmVhdGUiLCJyZW1vdmUiLCJjbG9uZSIsImZpbmQiLCJmaWVsZHMiLCJwaWNrQ29udGFjdCIsImRhdGUiLCJtb2RlIiwiZGF0ZVBpY2tlciIsImdldERldmljZSIsImdldENvcmRvdmEiLCJnZXRNb2RlbCIsIm1vZGVsIiwiZ2V0TmFtZSIsIm5hbWUiLCJnZXRQbGF0Zm9ybSIsInBsYXRmb3JtIiwiZ2V0VVVJRCIsInV1aWQiLCJnZXRWZXJzaW9uIiwidmVyc2lvbiIsImdldE1hbnVmYWN0dXJlciIsIm1hbnVmYWN0dXJlciIsImdldEN1cnJlbnRBY2NlbGVyYXRpb24iLCJpc1VuZGVmaW5lZCIsImFjY2VsZXJvbWV0ZXIiLCJpc0Z1bmN0aW9uIiwid2F0Y2hBY2NlbGVyYXRpb24iLCJjYW5jZWwiLCJjbGVhcldhdGNoIiwid2F0Y2hJRCIsImZyZXF1ZW5jeSIsImdldEN1cnJlbnRIZWFkaW5nIiwiY29tcGFzcyIsIndhdGNoSGVhZGluZyIsImFsZXJ0IiwiY29uZmlybSIsInByb21wdCIsImlucHV0MSIsImJ1dHRvbkluZGV4IiwiYmVlcCIsImFjdGl2aXR5U3RhcnQiLCJwbGF0Zm9ybUlkIiwiYWN0aXZpdHlTdG9wIiwicHJvZ3Jlc3NTdGFydCIsInByb2dyZXNzU3RvcCIsInByb2dyZXNzVmFsdWUiLCJlbWFpbCIsIm9wZW4iLCJhZGRBbGlhcyIsImJyb3dzZXJJbml0IiwiYXBwSUQiLCJhcHBWZXJzaW9uIiwiZmFjZWJvb2tDb25uZWN0UGx1Z2luIiwibG9naW4iLCJzaG93RGlhbG9nIiwiYXBpIiwiZ2V0QWNjZXNzVG9rZW4iLCJnZXRMb2dpblN0YXR1cyIsImxvZ291dCIsInNldE9wdGlvbnMiLCJGYWNlYm9va0FkcyIsImNyZWF0ZUJhbm5lciIsInJlbW92ZUJhbm5lciIsInNob3dCYW5uZXIiLCJzaG93QmFubmVyQXRYWSIsImhpZGVCYW5uZXIiLCJwcmVwYXJlSW50ZXJzdGl0aWFsIiwic2hvd0ludGVyc3RpdGlhbCIsImNvbnN0YW50IiwiZ2V0RnJlZURpc2tTcGFjZSIsImV4ZWMiLCJjaGVja0RpciIsInRlc3QiLCJyZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMIiwiaXNEaXJlY3RvcnkiLCJjb2RlIiwiY2hlY2tGaWxlIiwiaXNGaWxlIiwiY3JlYXRlRGlyIiwiZXhjbHVzaXZlIiwiZ2V0RGlyZWN0b3J5IiwiY3JlYXRlRmlsZSIsImdldEZpbGUiLCJyZW1vdmVEaXIiLCJzdWNjZXNzIiwiZmlsZVJlbW92ZWQiLCJyZW1vdmVGaWxlIiwicmVtb3ZlUmVjdXJzaXZlbHkiLCJ3cml0ZUZpbGUiLCJjcmVhdGVXcml0ZXIiLCJhcHBlbmQiLCJzZWVrIiwidHJ1bmNhdGUiLCJvbndyaXRlZW5kIiwiZXJyb3IiLCJhYm9ydCIsIndyaXRlRXhpc3RpbmdGaWxlIiwicmVhZEFzVGV4dCIsImZpbGUiLCJGaWxlUmVhZGVyIiwib25sb2FkZW5kIiwidGFyZ2V0IiwicmVzdWx0IiwicmVhZEFzRGF0YVVSTCIsInJlYWRBc0JpbmFyeVN0cmluZyIsInJlYWRBc0FycmF5QnVmZmVyIiwibW92ZUZpbGUiLCJtb3ZlVG8iLCJtb3ZlRGlyIiwiY29weURpciIsImNvcHlUbyIsImNvcHlGaWxlIiwicmVhZEZpbGVNZXRhZGF0YSIsImZpbGVPcGVuZXIyIiwidW5pbnN0YWxsIiwiYXBwSXNJbnN0YWxsZWQiLCJkb3dubG9hZCIsIkZpbGVUcmFuc2ZlciIsImVuY29kZVVSSSIsInRpbWVvdXQiLCJvbnByb2dyZXNzIiwidXBsb2FkIiwiZmxhc2hsaWdodCIsInN3aXRjaE9uIiwic3dpdGNoT2ZmIiwidG9nZ2xlIiwiRmx1cnJ5QWRzIiwiZ2FQbHVnaW4iLCJ0cmFja0V2ZW50IiwidHJhY2tQYWdlIiwic2V0VmFyaWFibGUiLCJleGl0Iiwid2F0Y2hQb3NpdGlvbiIsImdldFByZWZlcnJlZExhbmd1YWdlIiwiZ2xvYmFsaXphdGlvbiIsImdldExvY2FsZU5hbWUiLCJnZXRGaXJzdERheU9mV2VlayIsImRhdGVUb1N0cmluZyIsInN0cmluZ1RvRGF0ZSIsImdldERhdGVQYXR0ZXJuIiwiZ2V0RGF0ZU5hbWVzIiwiaXNEYXlMaWdodFNhdmluZ3NUaW1lIiwibnVtYmVyVG9TdHJpbmciLCJzdHJpbmdUb051bWJlciIsImdldE51bWJlclBhdHRlcm4iLCJnZXRDdXJyZW5jeVBhdHRlcm4iLCJzdGFydFRyYWNrZXJXaXRoSWQiLCJhbmFseXRpY3MiLCJzZXRVc2VySWQiLCJkZWJ1Z01vZGUiLCJ0cmFja1ZpZXciLCJhZGRDdXN0b21EaW1lbnNpb24iLCJwYXJzZUludCIsImlzTmFOIiwidHJhY2tFeGNlcHRpb24iLCJ0cmFja1RpbWluZyIsImFkZFRyYW5zYWN0aW9uIiwiYWRkVHJhbnNhY3Rpb25JdGVtIiwiZ2V0TWFwIiwicGx1Z2luIiwibWFwcyIsImdldEVsZW1lbnRCeUlkIiwiTWFwIiwic2V0RGl2IiwiaXNNYXBMb2FkZWQiLCJhZGRNYXJrZXIiLCJnZXRNYXBUeXBlSWRzIiwibWFwVHlwZUlkIiwic2V0VmlzaWJsZSIsImF1dGgiLCJnb29nbGVwbGF5Z2FtZSIsInNpZ25vdXQiLCJpc1NpZ25lZEluIiwic2hvd1BsYXllciIsInN1Ym1pdFNjb3JlIiwic2hvd0FsbExlYWRlcmJvYXJkcyIsInNob3dMZWFkZXJib2FyZCIsInVubG9ja0FjaGlldmVtZW50IiwiaW5jcmVtZW50QWNoaWV2ZW1lbnQiLCJzaG93QWNoaWV2ZW1lbnRzIiwiZ29vZ2xlcGx1cyIsImlPU0FwaUtleSIsInNpbGVudExvZ2luIiwidHJ5U2lsZW50TG9naW4iLCJoZWFsdGhraXQiLCJjaGVja0F1dGhTdGF0dXMiLCJyZXF1ZXN0QXV0aG9yaXphdGlvbiIsInJlYWRUeXBlcyIsIndyaXRlVHlwZXMiLCJyZWFkRGF0ZU9mQmlydGgiLCJyZWFkR2VuZGVyIiwic2F2ZVdlaWdodCIsInVuaXQiLCJhbW91bnQiLCJyZWFkV2VpZ2h0Iiwic2F2ZUhlaWdodCIsInJlYWRIZWlnaHQiLCJmaW5kV29ya291dHMiLCJzYXZlV29ya291dCIsInF1ZXJ5U2FtcGxlVHlwZSIsInN0YXJ0U2VydmVyIiwiQ29ySHR0cGQiLCJzdG9wU2VydmVyIiwiZ2V0VVJMIiwiZ2V0TG9jYWxQYXRoIiwiaUFkIiwiZ2V0UGljdHVyZXMiLCJpbWFnZVBpY2tlciIsImRlZmF1bHRPcHRpb25zIiwic2V0RGVmYXVsdE9wdGlvbnMiLCJmb3JFYWNoIiwiZCIsImpvaW4iLCJjbG9zZSIsImV4ZWN1dGVTY3JpcHQiLCJpbnNlcnRDU1MiLCJrZWVwQXdha2UiLCJpbnNvbW5pYSIsImFsbG93U2xlZXBBZ2FpbiIsInNoYXJlIiwiSW5zdGFncmFtIiwiaW1hZ2UiLCJjYXB0aW9uIiwiY29uc29sZSIsImlzSW5zdGFsbGVkIiwiJGV2YWxBc3luYyIsImhpZGVBY2Nlc3NvcnlCYXIiLCJpc1Zpc2libGUiLCJjbGVhclNob3dXYXRjaCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCIkJGxpc3RlbmVycyIsImNsZWFySGlkZVdhdGNoIiwiZ2V0Rm9yS2V5IiwiS2V5Y2hhaW4iLCJzZXRGb3JLZXkiLCJyZW1vdmVGb3JLZXkiLCJuYXZpZ2F0ZSIsImxhdW5jaG5hdmlnYXRvciIsImxvY2FsIiwib24iLCJzY2hlZHVsZSIsImFkZCIsIndhcm4iLCJ1cGRhdGUiLCJjbGVhckFsbCIsImNhbmNlbEFsbCIsImlzUHJlc2VudCIsImlzU2NoZWR1bGVkIiwiaXNUcmlnZ2VyZWQiLCJyZWdpc3RlclBlcm1pc3Npb24iLCJnZXRBbGxJZHMiLCJnZXRJZHMiLCJnZXRTY2hlZHVsZWRJZHMiLCJnZXRUcmlnZ2VyZWRJZHMiLCJnZXRBbGwiLCJnZXRTY2hlZHVsZWQiLCJnZXRBbGxTY2hlZHVsZWQiLCJnZXRUcmlnZ2VyZWQiLCJnZXRBbGxUcmlnZ2VyZWQiLCJnZXREZWZhdWx0cyIsInNldERlZmF1bHRzIiwibU1lZGlhIiwic2VydmljZSIsImlzRGVmaW5lZCIsImdldER1cmF0aW9uIiwiZHVyYXRpb24iLCJsb2ciLCJwb3NpdGlvbiIsIm1lZGlhIiwiTWVkaWEiLCJzdGF0dXMiLCJwcm90b3R5cGUiLCJwbGF5IiwicGF1c2UiLCJyZWxlYXNlIiwic2Vla1RvIiwic2V0Vm9sdW1lIiwic3RhcnRSZWNvcmQiLCJzdG9wUmVjb3JkIiwiY3VycmVudFRpbWUiLCJuZXdNZWRpYSIsIk1vYkZveCIsIk1vUHViIiwicHJlbG9hZFNpbXBsZSIsIk5hdGl2ZUF1ZGlvIiwicHJlbG9hZENvbXBsZXgiLCJsb29wIiwidW5sb2FkIiwic2V0Vm9sdW1lRm9yQ29tcGxleEFzc2V0IiwiY29ubmVjdGlvbiIsImdldE5ldHdvcmsiLCJpc09ubGluZSIsIkNvbm5lY3Rpb24iLCJVTktOT1dOIiwiTk9ORSIsImlzT2ZmbGluZSIsImNsZWFyT2ZmbGluZVdhdGNoIiwiY2xlYXJPbmxpbmVXYXRjaCIsInBpbkRpYWxvZyIsInBsdWdpbk5vdEVuYWJsZWRNZXNzYWdlIiwiZGVjb3JhdGVQcm9taXNlIiwic3RvcmUiLCJFcnJvciIsImFyZ3VtZW50cyIsImFwcFByZWZlcmVuY2VzIiwiZmV0Y2giLCJwcmludGVyIiwicHJpbnQiLCJQcm9ncmVzc0luZGljYXRvciIsInNob3dTaW1wbGUiLCJzaG93U2ltcGxlV2l0aExhYmVsIiwic2hvd1NpbXBsZVdpdGhMYWJlbERldGFpbCIsInNob3dEZXRlcm1pbmF0ZSIsInNob3dEZXRlcm1pbmF0ZVdpdGhMYWJlbCIsInNob3dBbm51bGFyIiwic2hvd0FubnVsYXJXaXRoTGFiZWwiLCJzaG93QmFyIiwic2hvd0JhcldpdGhMYWJlbCIsInNob3dTdWNjZXNzIiwic2hvd1RleHQiLCJvbk5vdGlmaWNhdGlvbiIsInJlZ2lzdGVyIiwiZWNiIiwicXVlcnlTZWxlY3RvciIsInB1c2hOb3RpZmljYXRpb24iLCJ1bnJlZ2lzdGVyIiwic2V0QmFkZ2VOdW1iZXIiLCJzZXRBcHBsaWNhdGlvbkljb25CYWRnZU51bWJlciIsImluaXRpYWxpemUiLCJQdXNoTm90aWZpY2F0aW9uIiwiJGVtaXQiLCJvbkVycm9yIiwicmVnaXN0cmF0aW9uSWQiLCJnZXRCYWRnZU51bWJlciIsImdldEFwcGxpY2F0aW9uSWNvbkJhZGdlTnVtYmVyIiwic2V0Q29sb3IiLCJSZWNlbnRzQ29udHJvbCIsInNldERlc2NyaXB0aW9uIiwiY2FwdHVyZVRvRmlsZSIsImV4dGVuc2lvbiIsInF1YWxpdHkiLCJzY3JlZW5zaG90IiwiZmlsZVBhdGgiLCJmaWxlbmFtZSIsImNhcHR1cmVUb1VyaSIsIlVSSSIsInJlcXVlc3RQZXJtaXNzaW9uIiwic2VyaWFsIiwid3JpdGVIZXgiLCJVaW50OEFycmF5IiwicmVnaXN0ZXJSZWFkQ2FsbGJhY2siLCJzZW5kIiwic21zIiwic29jaWFsc2hhcmluZyIsInNoYXJlV2l0aE9wdGlvbnMiLCJzaGFyZVZpYVR3aXR0ZXIiLCJzaGFyZVZpYVdoYXRzQXBwIiwic2hhcmVWaWFGYWNlYm9vayIsInNoYXJlVmlhRmFjZWJvb2tXaXRoUGFzdGVNZXNzYWdlSGludCIsInNoYXJlVmlhU01TIiwic2hhcmVWaWFFbWFpbCIsInNoYXJlVmlhIiwiY2FuU2hhcmVWaWFFbWFpbCIsImNhblNoYXJlVmlhIiwic3Bpbm5lckRpYWxvZyIsInNwbGFzaHNjcmVlbiIsIm9wZW5EQiIsImlzU3RyaW5nIiwiYmdUeXBlIiwic3FsaXRlUGx1Z2luIiwib3BlbkRhdGFiYXNlIiwiZXhlY3V0ZSIsInRyYW5zYWN0aW9uIiwiZXhlY3V0ZVNxbCIsImluc2VydENvbGxlY3Rpb24iLCJzbGljZSIsInNwbGljZSIsIm5lc3RlZEV4ZWN1dGUiLCJkZWxldGVEQiIsImRlbGV0ZURhdGFiYXNlIiwib3ZlcmxheXNXZWJWaWV3IiwiU1RZTEVTIiwiREVGQVVMVCIsIkxJR0hUX0NPTlRFTlQiLCJCTEFDS19UUkFOU0xVQ0VOVCIsIkJMQUNLX09QQVFVRSIsInN0eWxlIiwic3R5bGVMaWdodENvbnRlbnQiLCJzdHlsZUJsYWNrVHJhbnNsdWNlbnQiLCJzdHlsZUJsYWNrT3BhcXVlIiwic3R5bGVDb2xvciIsImJhY2tncm91bmRDb2xvckJ5TmFtZSIsInN0eWxlSGV4IiwiYmFja2dyb3VuZENvbG9yQnlIZXhTdHJpbmciLCJzaG93U2hvcnRUb3AiLCJ0b2FzdCIsInNob3dTaG9ydENlbnRlciIsInNob3dTaG9ydEJvdHRvbSIsInNob3dMb25nVG9wIiwic2hvd0xvbmdDZW50ZXIiLCJzaG93TG9uZ0JvdHRvbSIsInNob3dXaXRoT3B0aW9ucyIsImNoZWNrU3VwcG9ydCIsInRvdWNoaWQiLCJhdXRoZW50aWNhdGUiLCJzcGVhayIsIlRUUyIsInZpYnJhdGUiLCJ2aWJyYXRlV2l0aFBhdHRlcm4iLCJjYW5jZWxWaWJyYXRpb24iLCJzZXRMaW1pdCIsImxpbWl0Iiwic2V0TWF4RHVyYXRpb24iLCJzZXRIaWdoUXVhbGl0eSIsImhpZ2hxdWFsaXR5IiwidXNlRnJvbnRDYW1lcmEiLCJmcm9udGNhbWVyYSIsInNldFBvcnRyYWl0T3ZlcmxheSIsInBvcnRyYWl0T3ZlcmxheSIsInNldExhbmRzY2FwZU92ZXJsYXkiLCJsYW5kc2NhcGVPdmVybGF5Iiwic2V0T3ZlcmxheVRleHQiLCJvdmVybGF5VGV4dCIsInZpZGVvY2FwdHVyZXBsdXMiLCJ1bnppcCIsIiRzY29wZSIsImdvYmFjayIsImhpc3RvcnkiLCJnbyIsInN1Ym1pdENoaWxkIiwiY2hpbGQiLCJ2YWx1ZSIsIiRjb3Jkb3ZhQ2FtZXJhIiwiJGNvcmRvdmFQbHVnaW4iLCJzb21lRnVuY3Rpb24iLCJ0YWtlUGljdHVyZSIsIm9wdGlvbnMiLCJkZXN0aW5hdGlvblR5cGUiLCJDYW1lcmEiLCJEZXN0aW5hdGlvblR5cGUiLCJEQVRBX1VSTCIsInNvdXJjZVR5cGUiLCJQaWN0dXJlU291cmNlVHlwZSIsIkNBTUVSQSIsImFsbG93RWRpdCIsImVuY29kaW5nVHlwZSIsIkVuY29kaW5nVHlwZSIsIkpQRUciLCJ0YXJnZXRXaWR0aCIsInRhcmdldEhlaWdodCIsInBvcG92ZXJPcHRpb25zIiwiQ2FtZXJhUG9wb3Zlck9wdGlvbnMiLCJzYXZlVG9QaG90b0FsYnVtIiwiY29ycmVjdE9yaWVudGF0aW9uIiwiaW1hZ2VEYXRhIiwiaW1nVVJJIiwiZXJyIiwidGhlbWUiLCJzZXRUaGVtZSIsInRoZW1lSW1hZ2UiLCIkaW9uaWNNb2RhbCIsIiRhdXRoIiwidXNlclNlcnZpY2UiLCJ1c2VyVG9rZW4iLCJnZXRQYXlsb2FkIiwiZ2V0VXNlckluZm8iLCJ1c2VyIiwic3ViIiwiZnJvbVRlbXBsYXRlVXJsIiwiaWQiLCJzY29wZSIsImJhY2tkcm9wQ2xpY2tUb0Nsb3NlIiwiYW5pbWF0aW9uIiwibW9kYWwiLCJvTW9kYWwxIiwib3Blbk1vZGFsIiwiaW5kZXgiLCJvTW9kYWwyIiwiY2xvc2VNb2RhbCIsIiRvbiIsInVzZXJfdGhlbWUiLCJjaG9pY2UiLCJkYXRhIiwidXNlcl9pZF9wayIsInBvc3RUaGVtZSIsInJlc3BvbnNlIiwiJHN0YXRlIiwibG9naW5TZXJ2aWNlIiwibG9naW5DaGlsZCIsInVzZXJMb2dpbiIsInNldFRva2VuIiwic3VibWl0QmFubmVyIiwiYmFubmVyIiwiYmFubmVySW5mbyIsInVzZXJfaG91c2Vob2xkIiwidXNlcl9iYW5uZXJfaW1hZ2UiLCJwb3N0YmFubmVyIiwicmVzIiwiaG91c2Vob2xkIiwiZ2V0YmFubmVyIiwiZ2V0V2VhdGhlciIsIndlYXRoZXIiLCJtYWtlVXNlciIsIm5ld1VzZXIiLCJyZXZlYWxlciIsIm9Nb2RhbDMiLCJvTW9kYWw0Iiwib01vZGFsNSIsIiRodHRwIiwibWV0aG9kIiwiJHEiLCJKU09OIiwic3RyaW5naWZ5IiwidXNlcklkIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQUEsUUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0IsQ0FBQyxPQUFELEVBQVUsWUFB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QWE0d0I7QUFGTixLQUFOLENBQVA7QUFJRCxHQU5EOztBQVNBLE9BQUtiLFVBQUwsR0FBa0IsWUFBVTtBQUM1QixXQUFPUSxNQUFNO0FBQ1RDLGNBQVEsS0FEQztBQUVUeHdCLFdBQUk7QUFGSyxLQUFOLENBQVA7QUFLQyxHQU5EOztBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBSUMsQ0EvQ0QsR0ErQ0ciLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW9uaWMgU3RhcnRlciBBcHBcclxuXHJcbi8vIGFuZ3VsYXIubW9kdWxlIGlzIGEgZ2xvYmFsIHBsYWNlIGZvciBjcmVhdGluZywgcmVnaXN0ZXJpbmcgYW5kIHJldHJpZXZpbmcgQW5ndWxhciBtb2R1bGVzXHJcbi8vICdzdGFydGVyJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxyXG4vLyB0aGUgMm5kIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvZiAncmVxdWlyZXMnXHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnY2hvcmUnLCBbJ2lvbmljJywgJ3NhdGVsbGl6ZXInXSlcclxuLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkYXV0aFByb3ZpZGVyKXtcclxuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKFwiL2NoaWxkL2hvbWVcIik7XHJcbiAgJHN0YXRlUHJvdmlkZXJcclxuICAuc3RhdGUoJ2FkZENoaWxkJyx7XHJcbiAgICB1cmw6XCIvYWRkQ2hpbGRcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2FkZENoaWxkLmh0bWxcIixcclxuICAgIGNvbnRyb2xsZXI6IFwiYWRkQ2hpbGRDdHJsXCJcclxuICB9KVxyXG4gIC5zdGF0ZSgnYXNzaWduQ2hvcmUnLHtcclxuICAgIHVybDpcIi9hc3NpZ25DaG9yZVwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvYXNzaWduQ2hvcmUuaHRtbFwiLFxyXG4gICAgY29udHJvbGxlcjogXCJhc3NpZ25DaG9yZUN0cmxcIlxyXG4gIH0pXHJcbiAgLnN0YXRlKCdlZGl0Q2hpbGQnLHtcclxuICAgIHVybDpcIi9lZGl0Q2hpbGQvOmlkXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9lZGl0Q2hpbGQuaHRtbFwiLFxyXG4gICAgY29udHJvbGxlcjogXCJlZGl0Q2hpbGRDdHJsXCJcclxuICB9KVxyXG4gIC5zdGF0ZSgnaGlzdG9yeScse1xyXG4gICAgdXJsOlwiL2hpc3RvcnlcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2hpc3RvcnkuaHRtbFwiLFxyXG4gICAgY29udHJvbGxlcjogXCJoaXN0b3J5Q3RybFwiXHJcbiAgfSlcclxuICAuc3RhdGUoJ2hvbWUnLHtcclxuICAgIHVybDpcIi9ob21lXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9ob21lLmh0bWxcIixcclxuICAgIGNvbnRyb2xsZXI6IFwiaG9tZUN0cmxcIlxyXG4gIH0pXHJcbiAgLnN0YXRlKCdsb2dpbicse1xyXG4gICAgdXJsOlwiL2xvZ2luXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9Mb2dpbi5odG1sXCIsXHJcbiAgICBjb250cm9sbGVyOiBcImxvZ2luQ3RybFwiXHJcbiAgfSlcclxuICAuc3RhdGUoJ21ha2VDaG9yZScse1xyXG4gICAgdXJsOlwiL21ha2VDaG9yZVwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvbWFrZUNob3JlLmh0bWxcIixcclxuICAgIGNvbnRyb2xsZXI6IFwibWFrZUNob3JlQ3RybFwiXHJcbiAgfSlcclxuICAuc3RhdGUoJ3NldFJld2FyZHMnLHtcclxuICAgIHVybDpcIi9zZXRSZXdhcmRzLzppZFwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvc2V0UmV3YXJkcy5odG1sXCIsXHJcbiAgICBjb250cm9sbGVyOiBcInNldFJld2FyZHNDdHJsXCJcclxuICB9KVxyXG4gIC5zdGF0ZSgnc2V0dGluZ3MnLHtcclxuICAgIHVybDpcIi9zZXR0aW5nc1wiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvc2V0dGluZ3MuaHRtbFwiLFxyXG4gICAgY29udHJvbGxlcjogXCJzZXR0aW5nc0N0cmxcIlxyXG4gIH0pXHJcbiAgLnN0YXRlKCd0cmFja2VyJyx7XHJcbiAgICB1cmw6XCIvdHJhY2tlci86aWRcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL3RyYWNrZXIuaHRtbFwiLFxyXG4gICAgY29udHJvbGxlcjogXCJ0cmFja2VyQ3RybFwiXHJcbiAgfSlcclxuICAuc3RhdGUoJ3VzZXJJbmZvJyx7XHJcbiAgICB1cmw6XCIvdXNlckluZm9cIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL3VzZXJJbmZvLmh0bWxcIixcclxuICAgIGNvbnRyb2xsZXI6IFwidXNlckluZm9DdHJsXCJcclxuICB9KVxyXG4gIC5zdGF0ZSgnY2hpbGRCYW5rJyx7XHJcbiAgICB1cmw6XCIvY2hpbGQvYmFua1wiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvY2hpbGRCYW5rLmh0bWxcIixcclxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRCYW5rQ3RybFwiXHJcbiAgfSlcclxuICAuc3RhdGUoJ2NoaWxkSG9tZScse1xyXG4gICAgdXJsOlwiL2NoaWxkL2hvbWVcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2NoaWxkSG9tZS5odG1sXCIsXHJcbiAgICBjb250cm9sbGVyOiBcImNoaWxkSG9tZUN0cmxcIlxyXG4gIH0pXHJcbiAgLnN0YXRlKCdjaGlsZExvZ2luJyx7XHJcbiAgICB1cmw6XCIvY2hpbGQvbG9naW5cIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2NoaWxkTG9naW4uaHRtbFwiLFxyXG4gICAgY29udHJvbGxlcjogXCJjaGlsZExvZ2luQ3RybFwiXHJcbiAgfSlcclxuXHJcbiAgJGF1dGhQcm92aWRlci5mYWNlYm9vayh7XHJcbiAgICBjbGllbnRJZDogJzMzMjI3MjA1NzEzMjY4MSdcclxuICB9KTtcclxuXHJcbiAgLy8gT3B0aW9uYWw6IEZvciBjbGllbnQtc2lkZSB1c2UgKEltcGxpY2l0IEdyYW50KSwgc2V0IHJlc3BvbnNlVHlwZSB0byAndG9rZW4nIChkZWZhdWx0OiAnY29kZScpXHJcbiAgJGF1dGhQcm92aWRlci5mYWNlYm9vayh7XHJcbiAgICBjbGllbnRJZDogJzMzMjI3MjA1NzEzMjY4MScsXHJcbiAgICByZXNwb25zZVR5cGU6ICd0b2tlbidcclxuICB9KTtcclxuXHJcbiAgJGF1dGhQcm92aWRlci5nb29nbGUoe1xyXG4gICAgY2xpZW50SWQ6ICcyNzUzNTI5NjA5NDYtNXJjYW4zcWtobHNjN201MGhldjVkbjJlMmNhZTltYnAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20nLFxyXG4gICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTAwLyMvbG9naW4vJ1xyXG4gIH0pO1xyXG59KVxyXG5cclxuXHJcblxyXG4ucnVuKGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtKSB7XHJcbiAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICBpZih3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XHJcbiAgICAgIC8vIEhpZGUgdGhlIGFjY2Vzc29yeSBiYXIgYnkgZGVmYXVsdCAocmVtb3ZlIHRoaXMgdG8gc2hvdyB0aGUgYWNjZXNzb3J5IGJhciBhYm92ZSB0aGUga2V5Ym9hcmRcclxuICAgICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxyXG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xyXG5cclxuICAgICAgLy8gRG9uJ3QgcmVtb3ZlIHRoaXMgbGluZSB1bmxlc3MgeW91IGtub3cgd2hhdCB5b3UgYXJlIGRvaW5nLiBJdCBzdG9wcyB0aGUgdmlld3BvcnRcclxuICAgICAgLy8gZnJvbSBzbmFwcGluZyB3aGVuIHRleHQgaW5wdXRzIGFyZSBmb2N1c2VkLiBJb25pYyBoYW5kbGVzIHRoaXMgaW50ZXJuYWxseSBmb3JcclxuICAgICAgLy8gYSBtdWNoIG5pY2VyIGtleWJvYXJkIGV4cGVyaWVuY2UuXHJcbiAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5kaXNhYmxlU2Nyb2xsKHRydWUpO1xyXG4gICAgfVxyXG4gICAgaWYod2luZG93LlN0YXR1c0Jhcikge1xyXG4gICAgICBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0pXHJcbiIsIi8qIVxyXG4gKiBuZ0NvcmRvdmFcclxuICogdjAuMS4yNy1hbHBoYVxyXG4gKiBDb3B5cmlnaHQgMjAxNSBEcmlmdHkgQ28uIGh0dHA6Ly9kcmlmdHkuY29tL1xyXG4gKiBTZWUgTElDRU5TRSBpbiB0aGlzIHJlcG9zaXRvcnkgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb25cclxuICovXHJcbiFmdW5jdGlvbigpe2FuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhXCIsW1wibmdDb3Jkb3ZhLnBsdWdpbnNcIl0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuM2R0b3VjaFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmEzRFRvdWNoXCIsW1wiJHFcIixmdW5jdGlvbihlKXt2YXIgbj1bXSxyPXt9LG89ZnVuY3Rpb24oZSl7cmV0dXJuIGZ1bmN0aW9uKG4pe2Zvcih2YXIgciBpbiBlKW4udHlwZT09PXImJmVbcl0oKX19O3JldHVybntpc0F2YWlsYWJsZTpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gd2luZG93LmNvcmRvdmE/d2luZG93LlRocmVlRGVlVG91Y2g/d2luZG93LlRocmVlRGVlVG91Y2guaXNBdmFpbGFibGUoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pOm4ucmVqZWN0KFwiQ291bGQgbm90IGZpbmQgM0QgdG91Y2ggcGx1Z2luXCIpOm4ucmVqZWN0KFwiTm90IHN1cHBvcnRlZCBpbiBicm93c2VyXCIpLG4ucHJvbWlzZX0sYWRkUXVpY2tBY3Rpb246ZnVuY3Rpb24odCxpLGEsYyx1LHMpe3ZhciBsPWUuZGVmZXIoKSxmPXt0eXBlOnQsdGl0bGU6aSxzdWJ0aXRsZTp1fTtyZXR1cm4gYSYmKGYuaWNvblR5cGU9YSksYyYmKGYuaWNvblRlbXBsYXRlPWMpLHRoaXMuaXNBdmFpbGFibGUoKS50aGVuKGZ1bmN0aW9uKCl7bi5wdXNoKGYpLHJbdF09cyx3aW5kb3cuVGhyZWVEZWVUb3VjaC5jb25maWd1cmVRdWlja0FjdGlvbnMobiksd2luZG93LlRocmVlRGVlVG91Y2gub25Ib21lSWNvblByZXNzZWQ9byhyKSxsLnJlc29sdmUobil9LGZ1bmN0aW9uKGUpe2wucmVqZWN0KGUpfSksbC5wcm9taXNlfSxhZGRRdWlja0FjdGlvbkhhbmRsZXI6ZnVuY3Rpb24obix0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIHRoaXMuaXNBdmFpbGFibGUoKS50aGVuKGZ1bmN0aW9uKCl7cltuXT10LHdpbmRvdy5UaHJlZURlZVRvdWNoLm9uSG9tZUljb25QcmVzc2VkPW8ociksaS5yZXNvbHZlKCEwKX0sZnVuY3Rpb24oZSl7aS5yZWplY3QoZSl9KSxpLnByb21pc2V9LGVuYWJsZUxpbmtQcmV2aWV3OmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiB0aGlzLmlzQXZhaWxhYmxlKCkudGhlbihmdW5jdGlvbigpe3dpbmRvdy5UaHJlZURlZVRvdWNoLmVuYWJsZUxpbmtQcmV2aWV3KCksbi5yZXNvbHZlKCEwKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9LGFkZEZvcmNlVG91Y2hIYW5kbGVyOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gdGhpcy5pc0F2YWlsYWJsZSgpLnRoZW4oZnVuY3Rpb24oKXt3aW5kb3cuVGhyZWVEZWVUb3VjaC53YXRjaEZvcmNlVG91Y2hlcyhuKSxyLnJlc29sdmUoITApfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuYWN0aW9uU2hlZXRcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQWN0aW9uU2hlZXRcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3Nob3c6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuYWN0aW9uc2hlZXQuc2hvdyhyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0pLG8ucHJvbWlzZX0saGlkZTpmdW5jdGlvbigpe3JldHVybiBuLnBsdWdpbnMuYWN0aW9uc2hlZXQuaGlkZSgpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5hZE1vYlwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFBZE1vYlwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57Y3JlYXRlQmFubmVyVmlldzpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5BZE1vYi5jcmVhdGVCYW5uZXJWaWV3KHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxjcmVhdGVJbnRlcnN0aXRpYWxWaWV3OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLkFkTW9iLmNyZWF0ZUludGVyc3RpdGlhbFZpZXcocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHJlcXVlc3RBZDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5BZE1vYi5yZXF1ZXN0QWQocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dBZDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5BZE1vYi5zaG93QWQocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHJlcXVlc3RJbnRlcnN0aXRpYWxBZDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5BZE1vYi5yZXF1ZXN0SW50ZXJzdGl0aWFsQWQocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmFwcEF2YWlsYWJpbGl0eVwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFBcHBBdmFpbGFiaWxpdHlcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntjaGVjazpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGFwcEF2YWlsYWJpbGl0eS5jaGVjayhuLGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmFwcFJhdGVcIixbXSkucHJvdmlkZXIoXCIkY29yZG92YUFwcFJhdGVcIixbZnVuY3Rpb24oKXt0aGlzLnNldFByZWZlcmVuY2VzPWZ1bmN0aW9uKGUpe2UmJmFuZ3VsYXIuaXNPYmplY3QoZSkmJihBcHBSYXRlLnByZWZlcmVuY2VzLnVzZUxhbmd1YWdlPWUubGFuZ3VhZ2V8fG51bGwsQXBwUmF0ZS5wcmVmZXJlbmNlcy5kaXNwbGF5QXBwTmFtZT1lLmFwcE5hbWV8fFwiXCIsQXBwUmF0ZS5wcmVmZXJlbmNlcy5wcm9tcHRBZ2FpbkZvckVhY2hOZXdWZXJzaW9uPWUucHJvbXB0Rm9yTmV3VmVyc2lvbnx8ITAsQXBwUmF0ZS5wcmVmZXJlbmNlcy5vcGVuU3RvcmVJbkFwcD1lLm9wZW5TdG9yZUluQXBwfHwhMSxBcHBSYXRlLnByZWZlcmVuY2VzLnVzZXNVbnRpbFByb21wdD1lLnVzZXNVbnRpbFByb21wdHx8MyxBcHBSYXRlLnByZWZlcmVuY2VzLnVzZUN1c3RvbVJhdGVEaWFsb2c9ZS51c2VDdXN0b21SYXRlRGlhbG9nfHwhMSxBcHBSYXRlLnByZWZlcmVuY2VzLnN0b3JlQXBwVVJMLmlvcz1lLmlvc1VSTHx8bnVsbCxBcHBSYXRlLnByZWZlcmVuY2VzLnN0b3JlQXBwVVJMLmFuZHJvaWQ9ZS5hbmRyb2lkVVJMfHxudWxsLEFwcFJhdGUucHJlZmVyZW5jZXMuc3RvcmVBcHBVUkwuYmxhY2tiZXJyeT1lLmJsYWNrYmVycnlVUkx8fG51bGwsQXBwUmF0ZS5wcmVmZXJlbmNlcy5zdG9yZUFwcFVSTC53aW5kb3dzOD1lLndpbmRvd3NVUkx8fG51bGwpfSx0aGlzLnNldEN1c3RvbUxvY2FsZT1mdW5jdGlvbihlKXt2YXIgbj17dGl0bGU6XCJSYXRlICVAXCIsbWVzc2FnZTpcIklmIHlvdSBlbmpveSB1c2luZyAlQCwgd291bGQgeW91IG1pbmQgdGFraW5nIGEgbW9tZW50IHRvIHJhdGUgaXQ/IEl0IHdvbuKAmXQgdGFrZSBtb3JlIHRoYW4gYSBtaW51dGUuIFRoYW5rcyBmb3IgeW91ciBzdXBwb3J0IVwiLGNhbmNlbEJ1dHRvbkxhYmVsOlwiTm8sIFRoYW5rc1wiLGxhdGVyQnV0dG9uTGFiZWw6XCJSZW1pbmQgTWUgTGF0ZXJcIixyYXRlQnV0dG9uTGFiZWw6XCJSYXRlIEl0IE5vd1wifTtuPWFuZ3VsYXIuZXh0ZW5kKG4sZSksQXBwUmF0ZS5wcmVmZXJlbmNlcy5jdXN0b21Mb2NhbGU9bn0sdGhpcy4kZ2V0PVtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue3Byb21wdEZvclJhdGluZzpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCksbz1BcHBSYXRlLnByb21wdEZvclJhdGluZyhuKTtyZXR1cm4gci5yZXNvbHZlKG8pLHIucHJvbWlzZX0sbmF2aWdhdGVUb0FwcFN0b3JlOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpLHI9QXBwUmF0ZS5uYXZpZ2F0ZVRvQXBwU3RvcmUoKTtyZXR1cm4gbi5yZXNvbHZlKHIpLG4ucHJvbWlzZX0sb25CdXR0b25DbGlja2VkOmZ1bmN0aW9uKGUpe0FwcFJhdGUucHJlZmVyZW5jZXMuY2FsbGJhY2tzLm9uQnV0dG9uQ2xpY2tlZD1lLmJpbmQodGhpcyl9LG9uUmF0ZURpYWxvZ1Nob3c6ZnVuY3Rpb24oZSl7QXBwUmF0ZS5wcmVmZXJlbmNlcy5jYWxsYmFja3Mub25SYXRlRGlhbG9nU2hvdz1lLmJpbmQodGhpcyl9fX1dfV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuYXBwVmVyc2lvblwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFBcHBWZXJzaW9uXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57Z2V0QXBwTmFtZTpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5nZXRBcHBWZXJzaW9uLmdldEFwcE5hbWUoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSksbi5wcm9taXNlfSxnZXRQYWNrYWdlTmFtZTpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5nZXRBcHBWZXJzaW9uLmdldFBhY2thZ2VOYW1lKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0pLG4ucHJvbWlzZX0sZ2V0VmVyc2lvbk51bWJlcjpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5nZXRBcHBWZXJzaW9uLmdldFZlcnNpb25OdW1iZXIoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSksbi5wcm9taXNlfSxnZXRWZXJzaW9uQ29kZTpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5nZXRBcHBWZXJzaW9uLmdldFZlcnNpb25Db2RlKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0pLG4ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuYmFja2dyb3VuZEdlb2xvY2F0aW9uXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUJhY2tncm91bmRHZW9sb2NhdGlvblwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57aW5pdDpmdW5jdGlvbigpe24ubmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihmdW5jdGlvbihlKXtyZXR1cm4gZX0pfSxjb25maWd1cmU6ZnVuY3Rpb24ocil7dGhpcy5pbml0KCk7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuYmFja2dyb3VuZEdlb0xvY2F0aW9uLmNvbmZpZ3VyZShmdW5jdGlvbihlKXtvLm5vdGlmeShlKSxuLnBsdWdpbnMuYmFja2dyb3VuZEdlb0xvY2F0aW9uLmZpbmlzaCgpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0sciksdGhpcy5zdGFydCgpLG8ucHJvbWlzZX0sc3RhcnQ6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5iYWNrZ3JvdW5kR2VvTG9jYXRpb24uc3RhcnQoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sc3RvcDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmJhY2tncm91bmRHZW9Mb2NhdGlvbi5zdG9wKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmJhZGdlXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUJhZGdlXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57aGFzUGVybWlzc2lvbjpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5iYWRnZS5oYXNQZXJtaXNzaW9uKGZ1bmN0aW9uKGUpe2U/bi5yZXNvbHZlKCEwKTpuLnJlamVjdChcIllvdSBkbyBub3QgaGF2ZSBwZXJtaXNzaW9uXCIpfSksbi5wcm9taXNlfSxwcm9tcHRGb3JQZXJtaXNzaW9uOmZ1bmN0aW9uKCl7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24uYmFkZ2UucHJvbXB0Rm9yUGVybWlzc2lvbigpfSxzZXQ6ZnVuY3Rpb24obixyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5iYWRnZS5oYXNQZXJtaXNzaW9uKGZ1bmN0aW9uKGUpe2U/dC5yZXNvbHZlKGNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24uYmFkZ2Uuc2V0KG4scixvKSk6dC5yZWplY3QoXCJZb3UgZG8gbm90IGhhdmUgcGVybWlzc2lvbiB0byBzZXQgQmFkZ2VcIil9KSx0LnByb21pc2V9LGdldDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5iYWRnZS5oYXNQZXJtaXNzaW9uKGZ1bmN0aW9uKGUpe2U/Y29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5iYWRnZS5nZXQoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSk6bi5yZWplY3QoXCJZb3UgZG8gbm90IGhhdmUgcGVybWlzc2lvbiB0byBnZXQgQmFkZ2VcIil9KSxuLnByb21pc2V9LGNsZWFyOmZ1bmN0aW9uKG4scil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmJhZGdlLmhhc1Blcm1pc3Npb24oZnVuY3Rpb24oZSl7ZT9vLnJlc29sdmUoY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5iYWRnZS5jbGVhcihuLHIpKTpvLnJlamVjdChcIllvdSBkbyBub3QgaGF2ZSBwZXJtaXNzaW9uIHRvIGNsZWFyIEJhZGdlXCIpfSksby5wcm9taXNlfSxpbmNyZWFzZTpmdW5jdGlvbihuLHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiB0aGlzLmhhc1Blcm1pc3Npb24oKS50aGVuKGZ1bmN0aW9uKCl7dC5yZXNvbHZlKGNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24uYmFkZ2UuaW5jcmVhc2UobixyLG8pKX0sZnVuY3Rpb24oKXt0LnJlamVjdChcIllvdSBkbyBub3QgaGF2ZSBwZXJtaXNzaW9uIHRvIGluY3JlYXNlIEJhZGdlXCIpfSksdC5wcm9taXNlfSxkZWNyZWFzZTpmdW5jdGlvbihuLHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiB0aGlzLmhhc1Blcm1pc3Npb24oKS50aGVuKGZ1bmN0aW9uKCl7dC5yZXNvbHZlKGNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24uYmFkZ2UuZGVjcmVhc2UobixyLG8pKX0sZnVuY3Rpb24oKXt0LnJlamVjdChcIllvdSBkbyBub3QgaGF2ZSBwZXJtaXNzaW9uIHRvIGRlY3JlYXNlIEJhZGdlXCIpfSksdC5wcm9taXNlfSxjb25maWd1cmU6ZnVuY3Rpb24oZSl7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24uYmFkZ2UuY29uZmlndXJlKGUpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5iYXJjb2RlU2Nhbm5lclwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFCYXJjb2RlU2Nhbm5lclwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue3NjYW46ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuYmFyY29kZVNjYW5uZXIuc2NhbihmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKSxyLnByb21pc2V9LGVuY29kZTpmdW5jdGlvbihuLHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbj1ufHxcIlRFWFRfVFlQRVwiLGNvcmRvdmEucGx1Z2lucy5iYXJjb2RlU2Nhbm5lci5lbmNvZGUobixyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmJhdHRlcnlTdGF0dXNcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQmF0dGVyeVN0YXR1c1wiLFtcIiRyb290U2NvcGVcIixcIiR3aW5kb3dcIixcIiR0aW1lb3V0XCIsZnVuY3Rpb24oZSxuLHIpe3ZhciBvPWZ1bmN0aW9uKG4pe3IoZnVuY3Rpb24oKXtlLiRicm9hZGNhc3QoXCIkY29yZG92YUJhdHRlcnlTdGF0dXM6c3RhdHVzXCIsbil9KX0sdD1mdW5jdGlvbihuKXtyKGZ1bmN0aW9uKCl7ZS4kYnJvYWRjYXN0KFwiJGNvcmRvdmFCYXR0ZXJ5U3RhdHVzOmNyaXRpY2FsXCIsbil9KX0saT1mdW5jdGlvbihuKXtyKGZ1bmN0aW9uKCl7ZS4kYnJvYWRjYXN0KFwiJGNvcmRvdmFCYXR0ZXJ5U3RhdHVzOmxvd1wiLG4pfSl9O3JldHVybiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZGV2aWNlcmVhZHlcIixmdW5jdGlvbigpe25hdmlnYXRvci5iYXR0ZXJ5JiYobi5hZGRFdmVudExpc3RlbmVyKFwiYmF0dGVyeXN0YXR1c1wiLG8sITEpLG4uYWRkRXZlbnRMaXN0ZW5lcihcImJhdHRlcnljcml0aWNhbFwiLHQsITEpLG4uYWRkRXZlbnRMaXN0ZW5lcihcImJhdHRlcnlsb3dcIixpLCExKSl9LCExKSwhMH1dKS5ydW4oW1wiJGluamVjdG9yXCIsZnVuY3Rpb24oZSl7ZS5nZXQoXCIkY29yZG92YUJhdHRlcnlTdGF0dXNcIil9XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5iZWFjb25cIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQmVhY29uXCIsW1wiJHdpbmRvd1wiLFwiJHJvb3RTY29wZVwiLFwiJHRpbWVvdXRcIixcIiRxXCIsZnVuY3Rpb24oZSxuLHIsbyl7dmFyIHQ9bnVsbCxpPW51bGwsYT1udWxsLGM9bnVsbCx1PW51bGwscz1udWxsLGw9bnVsbCxmPW51bGw7cmV0dXJuIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkZXZpY2VyZWFkeVwiLGZ1bmN0aW9uKCl7aWYoZS5jb3Jkb3ZhJiZlLmNvcmRvdmEucGx1Z2lucyYmZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyKXt2YXIgbz1uZXcgZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLkRlbGVnYXRlO28uZGlkRGV0ZXJtaW5lU3RhdGVGb3JSZWdpb249ZnVuY3Rpb24oZSl7cihmdW5jdGlvbigpe24uJGJyb2FkY2FzdChcIiRjb3Jkb3ZhQmVhY29uOmRpZERldGVybWluZVN0YXRlRm9yUmVnaW9uXCIsZSl9KSx0JiZ0KGUpfSxvLmRpZFN0YXJ0TW9uaXRvcmluZ0ZvclJlZ2lvbj1mdW5jdGlvbihlKXtyKGZ1bmN0aW9uKCl7bi4kYnJvYWRjYXN0KFwiJGNvcmRvdmFCZWFjb246ZGlkU3RhcnRNb25pdG9yaW5nRm9yUmVnaW9uXCIsZSl9KSxpJiZpKGUpfSxvLmRpZEV4aXRSZWdpb249ZnVuY3Rpb24oZSl7cihmdW5jdGlvbigpe24uJGJyb2FkY2FzdChcIiRjb3Jkb3ZhQmVhY29uOmRpZEV4aXRSZWdpb25cIixlKX0pLGEmJmEoZSl9LG8uZGlkRW50ZXJSZWdpb249ZnVuY3Rpb24oZSl7cihmdW5jdGlvbigpe24uJGJyb2FkY2FzdChcIiRjb3Jkb3ZhQmVhY29uOmRpZEVudGVyUmVnaW9uXCIsZSl9KSxjJiZjKGUpfSxvLmRpZFJhbmdlQmVhY29uc0luUmVnaW9uPWZ1bmN0aW9uKGUpe3IoZnVuY3Rpb24oKXtuLiRicm9hZGNhc3QoXCIkY29yZG92YUJlYWNvbjpkaWRSYW5nZUJlYWNvbnNJblJlZ2lvblwiLGUpfSksdSYmdShlKX0sby5wZXJpcGhlcmFsTWFuYWdlckRpZFN0YXJ0QWR2ZXJ0aXNpbmc9ZnVuY3Rpb24oZSl7cihmdW5jdGlvbigpe24uJGJyb2FkY2FzdChcIiRjb3Jkb3ZhQmVhY29uOnBlcmlwaGVyYWxNYW5hZ2VyRGlkU3RhcnRBZHZlcnRpc2luZ1wiLGUpfSkscyYmcyhlKX0sby5wZXJpcGhlcmFsTWFuYWdlckRpZFVwZGF0ZVN0YXRlPWZ1bmN0aW9uKGUpe3IoZnVuY3Rpb24oKXtuLiRicm9hZGNhc3QoXCIkY29yZG92YUJlYWNvbjpwZXJpcGhlcmFsTWFuYWdlckRpZFVwZGF0ZVN0YXRlXCIsZSl9KSxsJiZsKGUpfSxvLmRpZENoYW5nZUF1dGhvcml6YXRpb25TdGF0dXM9ZnVuY3Rpb24oZSl7cihmdW5jdGlvbigpe24uJGJyb2FkY2FzdChcIiRjb3Jkb3ZhQmVhY29uOmRpZENoYW5nZUF1dGhvcml6YXRpb25TdGF0dXNcIixlKX0pLGYmJmYoZSl9LGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5zZXREZWxlZ2F0ZShvKX19LCExKSx7c2V0Q2FsbGJhY2tEaWREZXRlcm1pbmVTdGF0ZUZvclJlZ2lvbjpmdW5jdGlvbihlKXt0PWV9LHNldENhbGxiYWNrRGlkU3RhcnRNb25pdG9yaW5nRm9yUmVnaW9uOmZ1bmN0aW9uKGUpe2k9ZX0sc2V0Q2FsbGJhY2tEaWRFeGl0UmVnaW9uOmZ1bmN0aW9uKGUpe2E9ZX0sc2V0Q2FsbGJhY2tEaWRFbnRlclJlZ2lvbjpmdW5jdGlvbihlKXtjPWV9LHNldENhbGxiYWNrRGlkUmFuZ2VCZWFjb25zSW5SZWdpb246ZnVuY3Rpb24oZSl7dT1lfSxzZXRDYWxsYmFja1BlcmlwaGVyYWxNYW5hZ2VyRGlkU3RhcnRBZHZlcnRpc2luZzpmdW5jdGlvbihlKXtzPWV9LHNldENhbGxiYWNrUGVyaXBoZXJhbE1hbmFnZXJEaWRVcGRhdGVTdGF0ZTpmdW5jdGlvbihlKXtsPWV9LHNldENhbGxiYWNrRGlkQ2hhbmdlQXV0aG9yaXphdGlvblN0YXR1czpmdW5jdGlvbihlKXtmPWV9LGNyZWF0ZUJlYWNvblJlZ2lvbjpmdW5jdGlvbihuLHIsbyx0LGkpe3JldHVybiBvPW98fHZvaWQgMCx0PXR8fHZvaWQgMCxuZXcgZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLkJlYWNvblJlZ2lvbihuLHIsbyx0LGkpfSxpc0JsdWV0b290aEVuYWJsZWQ6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5pc0JsdWV0b290aEVuYWJsZWQoKSl9LGVuYWJsZUJsdWV0b290aDpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmVuYWJsZUJsdWV0b290aCgpKX0sZGlzYWJsZUJsdWV0b290aDpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmRpc2FibGVCbHVldG9vdGgoKSl9LHN0YXJ0TW9uaXRvcmluZ0ZvclJlZ2lvbjpmdW5jdGlvbihuKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5zdGFydE1vbml0b3JpbmdGb3JSZWdpb24obikpfSxzdG9wTW9uaXRvcmluZ0ZvclJlZ2lvbjpmdW5jdGlvbihuKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5zdG9wTW9uaXRvcmluZ0ZvclJlZ2lvbihuKSl9LHJlcXVlc3RTdGF0ZUZvclJlZ2lvbjpmdW5jdGlvbihuKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5yZXF1ZXN0U3RhdGVGb3JSZWdpb24obikpfSxzdGFydFJhbmdpbmdCZWFjb25zSW5SZWdpb246ZnVuY3Rpb24obil7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuc3RhcnRSYW5naW5nQmVhY29uc0luUmVnaW9uKG4pKX0sc3RvcFJhbmdpbmdCZWFjb25zSW5SZWdpb246ZnVuY3Rpb24obil7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuc3RvcFJhbmdpbmdCZWFjb25zSW5SZWdpb24obikpfSxnZXRBdXRob3JpemF0aW9uU3RhdHVzOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuZ2V0QXV0aG9yaXphdGlvblN0YXR1cygpKX0scmVxdWVzdFdoZW5JblVzZUF1dGhvcml6YXRpb246ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5yZXF1ZXN0V2hlbkluVXNlQXV0aG9yaXphdGlvbigpKX0scmVxdWVzdEFsd2F5c0F1dGhvcml6YXRpb246ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5yZXF1ZXN0QWx3YXlzQXV0aG9yaXphdGlvbigpKX0sZ2V0TW9uaXRvcmVkUmVnaW9uczpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmdldE1vbml0b3JlZFJlZ2lvbnMoKSl9LGdldFJhbmdlZFJlZ2lvbnM6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5nZXRSYW5nZWRSZWdpb25zKCkpfSxpc1JhbmdpbmdBdmFpbGFibGU6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5pc1JhbmdpbmdBdmFpbGFibGUoKSl9LGlzTW9uaXRvcmluZ0F2YWlsYWJsZUZvckNsYXNzOmZ1bmN0aW9uKG4pe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmlzTW9uaXRvcmluZ0F2YWlsYWJsZUZvckNsYXNzKG4pKX0sc3RhcnRBZHZlcnRpc2luZzpmdW5jdGlvbihuLHIpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLnN0YXJ0QWR2ZXJ0aXNpbmcobixyKSl9LHN0b3BBZHZlcnRpc2luZzpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLnN0b3BBZHZlcnRpc2luZygpKX0saXNBZHZlcnRpc2luZ0F2YWlsYWJsZTpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmlzQWR2ZXJ0aXNpbmdBdmFpbGFibGUoKSl9LGlzQWR2ZXJ0aXNpbmc6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5pc0FkdmVydGlzaW5nKCkpfSxkaXNhYmxlRGVidWdMb2dzOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuZGlzYWJsZURlYnVnTG9ncygpKX0sZW5hYmxlRGVidWdOb3RpZmljYXRpb25zOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuZW5hYmxlRGVidWdOb3RpZmljYXRpb25zKCkpfSxkaXNhYmxlRGVidWdOb3RpZmljYXRpb25zOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuZGlzYWJsZURlYnVnTm90aWZpY2F0aW9ucygpKX0sZW5hYmxlRGVidWdMb2dzOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuZW5hYmxlRGVidWdMb2dzKCkpfSxhcHBlbmRUb0RldmljZUxvZzpmdW5jdGlvbihuKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5hcHBlbmRUb0RldmljZUxvZyhuKSl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmJsZVwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFCTEVcIixbXCIkcVwiLFwiJHRpbWVvdXRcIixcIiRsb2dcIixmdW5jdGlvbihlLG4scil7cmV0dXJue3NjYW46ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIGJsZS5zdGFydFNjYW4ocixmdW5jdGlvbihlKXt0Lm5vdGlmeShlKX0sZnVuY3Rpb24oZSl7dC5yZWplY3QoZSl9KSxuKGZ1bmN0aW9uKCl7YmxlLnN0b3BTY2FuKGZ1bmN0aW9uKCl7dC5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSl9LDFlMypvKSx0LnByb21pc2V9LHN0YXJ0U2NhbjpmdW5jdGlvbihlLG4scil7cmV0dXJuIGJsZS5zdGFydFNjYW4oZSxuLHIpfSxzdG9wU2NhbjpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gYmxlLnN0b3BTY2FuKGZ1bmN0aW9uKCl7bi5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxjb25uZWN0OmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gYmxlLmNvbm5lY3QobixmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxkaXNjb25uZWN0OmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gYmxlLmRpc2Nvbm5lY3QobixmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxyZWFkOmZ1bmN0aW9uKG4scixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIGJsZS5yZWFkKG4scixvLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7dC5yZWplY3QoZSl9KSx0LnByb21pc2V9LHdyaXRlOmZ1bmN0aW9uKG4scixvLHQpe3ZhciBpPWUuZGVmZXIoKTtyZXR1cm4gYmxlLndyaXRlKG4scixvLHQsZnVuY3Rpb24oZSl7aS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtpLnJlamVjdChlKX0pLGkucHJvbWlzZX0sd3JpdGVXaXRob3V0UmVzcG9uc2U6ZnVuY3Rpb24obixyLG8sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiBibGUud3JpdGVXaXRob3V0UmVzcG9uc2UobixyLG8sdCxmdW5jdGlvbihlKXtpLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2kucmVqZWN0KGUpfSksaS5wcm9taXNlfSx3cml0ZUNvbW1hbmQ6ZnVuY3Rpb24oZSxuLG8sdCl7cmV0dXJuIHIud2FybmluZyhcIndyaXRlQ29tbWFuZCBpcyBkZXByZWNhdGVkLCB1c2Ugd3JpdGVXaXRob3V0UmVzcG9uc2VcIiksdGhpcy53cml0ZVdpdGhvdXRSZXNwb25zZShlLG4sbyx0KX0sc3RhcnROb3RpZmljYXRpb246ZnVuY3Rpb24oZSxuLHIsbyx0KXtyZXR1cm4gYmxlLnN0YXJ0Tm90aWZpY2F0aW9uKGUsbixyLG8sdCl9LHN0b3BOb3RpZmljYXRpb246ZnVuY3Rpb24obixyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gYmxlLnN0b3BOb3RpZmljYXRpb24obixyLG8sZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0pLHQucHJvbWlzZX0saXNDb25uZWN0ZWQ6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBibGUuaXNDb25uZWN0ZWQobixmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxlbmFibGU6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGJsZS5lbmFibGUoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0saXNFbmFibGVkOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBibGUuaXNFbmFibGVkKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmJsdWV0b290aFNlcmlhbFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFCbHVldG9vdGhTZXJpYWxcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2Nvbm5lY3Q6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpLHQ9ZS5kZWZlcigpLGk9ITE7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLmNvbm5lY3QocixmdW5jdGlvbigpe2k9ITAsby5yZXNvbHZlKHQpfSxmdW5jdGlvbihlKXtpPT09ITEmJnQucmVqZWN0KGUpLG8ucmVqZWN0KGUpfSksby5wcm9taXNlfSxjb25uZWN0SW5zZWN1cmU6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5jb25uZWN0SW5zZWN1cmUocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sZGlzY29ubmVjdDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwuZGlzY29ubmVjdChmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sbGlzdDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwubGlzdChmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxkaXNjb3ZlclVucGFpcmVkOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5kaXNjb3ZlclVucGFpcmVkKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHNldERldmljZURpc2NvdmVyZWRMaXN0ZW5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwuc2V0RGV2aWNlRGlzY292ZXJlZExpc3RlbmVyKGZ1bmN0aW9uKGUpe3Iubm90aWZ5KGUpfSksci5wcm9taXNlfSxjbGVhckRldmljZURpc2NvdmVyZWRMaXN0ZW5lcjpmdW5jdGlvbigpe24uYmx1ZXRvb3RoU2VyaWFsLmNsZWFyRGV2aWNlRGlzY292ZXJlZExpc3RlbmVyKCl9LHNob3dCbHVldG9vdGhTZXR0aW5nczpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwuc2hvd0JsdWV0b290aFNldHRpbmdzKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxpc0VuYWJsZWQ6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLmlzRW5hYmxlZChmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LGVuYWJsZTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwuZW5hYmxlKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0saXNDb25uZWN0ZWQ6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLmlzQ29ubmVjdGVkKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0sYXZhaWxhYmxlOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5hdmFpbGFibGUoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0scmVhZDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwucmVhZChmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxyZWFkVW50aWw6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5yZWFkVW50aWwocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSx3cml0ZTpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLndyaXRlKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHN1YnNjcmliZTpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLnN1YnNjcmliZShyLGZ1bmN0aW9uKGUpe28ubm90aWZ5KGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sc3Vic2NyaWJlUmF3RGF0YTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwuc3Vic2NyaWJlUmF3RGF0YShmdW5jdGlvbihlKXtyLm5vdGlmeShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHVuc3Vic2NyaWJlOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC51bnN1YnNjcmliZShmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sdW5zdWJzY3JpYmVSYXdEYXRhOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC51bnN1YnNjcmliZVJhd0RhdGEoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LGNsZWFyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5jbGVhcihmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0scmVhZFJTU0k6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLnJlYWRSU1NJKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmJyaWdodG5lc3NcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQnJpZ2h0bmVzc1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57Z2V0OmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmNvcmRvdmE/bi5jb3Jkb3ZhLnBsdWdpbnMuYnJpZ2h0bmVzcy5nZXRCcmlnaHRuZXNzKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KTpyLnJlamVjdChcIk5vdCBzdXBwb3J0ZWQgd2l0aG91dCBjb3Jkb3ZhLmpzXCIpLHIucHJvbWlzZX0sc2V0OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5jb3Jkb3ZhP24uY29yZG92YS5wbHVnaW5zLmJyaWdodG5lc3Muc2V0QnJpZ2h0bmVzcyhyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KTpvLnJlamVjdChcIk5vdCBzdXBwb3J0ZWQgd2l0aG91dCBjb3Jkb3ZhLmpzXCIpLG8ucHJvbWlzZX0sc2V0S2VlcFNjcmVlbk9uOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5jb3Jkb3ZhP24uY29yZG92YS5wbHVnaW5zLmJyaWdodG5lc3Muc2V0S2VlcFNjcmVlbk9uKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pOm8ucmVqZWN0KFwiTm90IHN1cHBvcnRlZCB3aXRob3V0IGNvcmRvdmEuanNcIiksby5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5jYWxlbmRhclwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFDYWxlbmRhclwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57Y3JlYXRlQ2FsZW5kYXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpLHQ9bi5wbHVnaW5zLmNhbGVuZGFyLmdldENyZWF0ZUNhbGVuZGFyT3B0aW9ucygpO3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiByP3QuY2FsZW5kYXJOYW1lPXI6dD1hbmd1bGFyLmV4dGVuZCh0LHIpLG4ucGx1Z2lucy5jYWxlbmRhci5jcmVhdGVDYWxlbmRhcih0LGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGRlbGV0ZUNhbGVuZGFyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmNhbGVuZGFyLmRlbGV0ZUNhbGVuZGFyKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sY3JlYXRlRXZlbnQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpLHQ9e3RpdGxlOm51bGwsbG9jYXRpb246bnVsbCxub3RlczpudWxsLHN0YXJ0RGF0ZTpudWxsLGVuZERhdGU6bnVsbH07cmV0dXJuIHQ9YW5ndWxhci5leHRlbmQodCxyKSxuLnBsdWdpbnMuY2FsZW5kYXIuY3JlYXRlRXZlbnQodC50aXRsZSx0LmxvY2F0aW9uLHQubm90ZXMsbmV3IERhdGUodC5zdGFydERhdGUpLG5ldyBEYXRlKHQuZW5kRGF0ZSksZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sY3JlYXRlRXZlbnRXaXRoT3B0aW9uczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCksdD1bXSxpPXdpbmRvdy5wbHVnaW5zLmNhbGVuZGFyLmdldENhbGVuZGFyT3B0aW9ucygpLGE9e3RpdGxlOm51bGwsbG9jYXRpb246bnVsbCxub3RlczpudWxsLHN0YXJ0RGF0ZTpudWxsLGVuZERhdGU6bnVsbH07dD1PYmplY3Qua2V5cyhhKTtmb3IodmFyIGMgaW4gciktMT09PXQuaW5kZXhPZihjKT9pW2NdPXJbY106YVtjXT1yW2NdO3JldHVybiBuLnBsdWdpbnMuY2FsZW5kYXIuY3JlYXRlRXZlbnRXaXRoT3B0aW9ucyhhLnRpdGxlLGEubG9jYXRpb24sYS5ub3RlcyxuZXcgRGF0ZShhLnN0YXJ0RGF0ZSksbmV3IERhdGUoYS5lbmREYXRlKSxpLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGNyZWF0ZUV2ZW50SW50ZXJhY3RpdmVseTpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCksdD17dGl0bGU6bnVsbCxsb2NhdGlvbjpudWxsLG5vdGVzOm51bGwsc3RhcnREYXRlOm51bGwsZW5kRGF0ZTpudWxsfTtyZXR1cm4gdD1hbmd1bGFyLmV4dGVuZCh0LHIpLG4ucGx1Z2lucy5jYWxlbmRhci5jcmVhdGVFdmVudEludGVyYWN0aXZlbHkodC50aXRsZSx0LmxvY2F0aW9uLHQubm90ZXMsbmV3IERhdGUodC5zdGFydERhdGUpLG5ldyBEYXRlKHQuZW5kRGF0ZSksZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sY3JlYXRlRXZlbnRJbk5hbWVkQ2FsZW5kYXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpLHQ9e3RpdGxlOm51bGwsbG9jYXRpb246bnVsbCxub3RlczpudWxsLHN0YXJ0RGF0ZTpudWxsLGVuZERhdGU6bnVsbCxjYWxlbmRhck5hbWU6bnVsbH07cmV0dXJuIHQ9YW5ndWxhci5leHRlbmQodCxyKSxuLnBsdWdpbnMuY2FsZW5kYXIuY3JlYXRlRXZlbnRJbk5hbWVkQ2FsZW5kYXIodC50aXRsZSx0LmxvY2F0aW9uLHQubm90ZXMsbmV3IERhdGUodC5zdGFydERhdGUpLG5ldyBEYXRlKHQuZW5kRGF0ZSksdC5jYWxlbmRhck5hbWUsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sZmluZEV2ZW50OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKSx0PXt0aXRsZTpudWxsLGxvY2F0aW9uOm51bGwsbm90ZXM6bnVsbCxzdGFydERhdGU6bnVsbCxlbmREYXRlOm51bGx9O3JldHVybiB0PWFuZ3VsYXIuZXh0ZW5kKHQsciksbi5wbHVnaW5zLmNhbGVuZGFyLmZpbmRFdmVudCh0LnRpdGxlLHQubG9jYXRpb24sdC5ub3RlcyxuZXcgRGF0ZSh0LnN0YXJ0RGF0ZSksbmV3IERhdGUodC5lbmREYXRlKSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxsaXN0RXZlbnRzSW5SYW5nZTpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmNhbGVuZGFyLmxpc3RFdmVudHNJblJhbmdlKHIsbyxmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSksdC5wcm9taXNlfSxsaXN0Q2FsZW5kYXJzOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuY2FsZW5kYXIubGlzdENhbGVuZGFycyhmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxmaW5kQWxsRXZlbnRzSW5OYW1lZENhbGVuZGFyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmNhbGVuZGFyLmZpbmRBbGxFdmVudHNJbk5hbWVkQ2FsZW5kYXIocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxtb2RpZnlFdmVudDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCksdD17dGl0bGU6bnVsbCxsb2NhdGlvbjpudWxsLG5vdGVzOm51bGwsc3RhcnREYXRlOm51bGwsZW5kRGF0ZTpudWxsLG5ld1RpdGxlOm51bGwsbmV3TG9jYXRpb246bnVsbCxuZXdOb3RlczpudWxsLG5ld1N0YXJ0RGF0ZTpudWxsLG5ld0VuZERhdGU6bnVsbH07cmV0dXJuIHQ9YW5ndWxhci5leHRlbmQodCxyKSxuLnBsdWdpbnMuY2FsZW5kYXIubW9kaWZ5RXZlbnQodC50aXRsZSx0LmxvY2F0aW9uLHQubm90ZXMsbmV3IERhdGUodC5zdGFydERhdGUpLG5ldyBEYXRlKHQuZW5kRGF0ZSksdC5uZXdUaXRsZSx0Lm5ld0xvY2F0aW9uLHQubmV3Tm90ZXMsbmV3IERhdGUodC5uZXdTdGFydERhdGUpLG5ldyBEYXRlKHQubmV3RW5kRGF0ZSksZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sZGVsZXRlRXZlbnQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpLHQ9e25ld1RpdGxlOm51bGwsbG9jYXRpb246bnVsbCxub3RlczpudWxsLHN0YXJ0RGF0ZTpudWxsLGVuZERhdGU6bnVsbH07cmV0dXJuIHQ9YW5ndWxhci5leHRlbmQodCxyKSxuLnBsdWdpbnMuY2FsZW5kYXIuZGVsZXRlRXZlbnQodC5uZXdUaXRsZSx0LmxvY2F0aW9uLHQubm90ZXMsbmV3IERhdGUodC5zdGFydERhdGUpLG5ldyBEYXRlKHQuZW5kRGF0ZSksZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuY2FtZXJhXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUNhbWVyYVwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2dldFBpY3R1cmU6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuY2FtZXJhPyhuYXZpZ2F0b3IuY2FtZXJhLmdldFBpY3R1cmUoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbiksci5wcm9taXNlKTooci5yZXNvbHZlKG51bGwpLHIucHJvbWlzZSl9LGNsZWFudXA6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5jYW1lcmEuY2xlYW51cChmdW5jdGlvbigpe24ucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuY2FwdHVyZVwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFDYXB0dXJlXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57Y2FwdHVyZUF1ZGlvOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmRldmljZS5jYXB0dXJlPyhuYXZpZ2F0b3IuZGV2aWNlLmNhcHR1cmUuY2FwdHVyZUF1ZGlvKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LG4pLHIucHJvbWlzZSk6KHIucmVzb2x2ZShudWxsKSxyLnByb21pc2UpfSxjYXB0dXJlSW1hZ2U6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZGV2aWNlLmNhcHR1cmU/KG5hdmlnYXRvci5kZXZpY2UuY2FwdHVyZS5jYXB0dXJlSW1hZ2UoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbiksci5wcm9taXNlKTooci5yZXNvbHZlKG51bGwpLHIucHJvbWlzZSl9LGNhcHR1cmVWaWRlbzpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5kZXZpY2UuY2FwdHVyZT8obmF2aWdhdG9yLmRldmljZS5jYXB0dXJlLmNhcHR1cmVWaWRlbyhmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKSxyLnByb21pc2UpOihyLnJlc29sdmUobnVsbCksci5wcm9taXNlKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuY2FyZElPXCIsW10pLnByb3ZpZGVyKFwiJGNvcmRvdmFOZ0NhcmRJT1wiLFtmdW5jdGlvbigpe3ZhciBlPVtcImNhcmRfdHlwZVwiLFwicmVkYWN0ZWRfY2FyZF9udW1iZXJcIixcImNhcmRfbnVtYmVyXCIsXCJleHBpcnlfbW9udGhcIixcImV4cGlyeV95ZWFyXCIsXCJzaG9ydF9leHBpcnlfeWVhclwiLFwiY3Z2XCIsXCJ6aXBcIl0sbj17ZXhwaXJ5OiEwLGN2djohMCx6aXA6ITEsc3VwcHJlc3NNYW51YWw6ITEsc3VwcHJlc3NDb25maXJtOiExLGhpZGVMb2dvOiEwfTt0aGlzLnNldENhcmRJT1Jlc3BvbnNlRmllbGRzPWZ1bmN0aW9uKG4pe24mJmFuZ3VsYXIuaXNBcnJheShuKSYmKGU9bil9LHRoaXMuc2V0U2NhbmVyQ29uZmlnPWZ1bmN0aW9uKGUpe2UmJmFuZ3VsYXIuaXNPYmplY3QoZSkmJihuLmV4cGlyeT1lLmV4cGlyeXx8ITAsbi5jdnY9ZS5jdnZ8fCEwLG4uemlwPWUuemlwfHwhMSxuLnN1cHByZXNzTWFudWFsPWUuc3VwcHJlc3NNYW51YWx8fCExLG4uc3VwcHJlc3NDb25maXJtPWUuc3VwcHJlc3NDb25maXJtfHwhMSxuLmhpZGVMb2dvPWUuaGlkZUxvZ298fCEwKX0sdGhpcy4kZ2V0PVtcIiRxXCIsZnVuY3Rpb24ocil7cmV0dXJue3NjYW5DYXJkOmZ1bmN0aW9uKCl7dmFyIG89ci5kZWZlcigpO3JldHVybiBDYXJkSU8uc2NhbihuLGZ1bmN0aW9uKG4pe2lmKG51bGw9PT1uKW8ucmVqZWN0KG51bGwpO2Vsc2V7Zm9yKHZhciByPXt9LHQ9MCxpPWUubGVuZ3RoO2k+dDt0Kyspe3ZhciBhPWVbdF07XCJzaG9ydF9leHBpcnlfeWVhclwiPT09YT9yW2FdPVN0cmluZyhuLmV4cGlyeV95ZWFyKS5zdWJzdHIoMiwyKXx8XCJcIjpyW2FdPW5bYV18fFwiXCJ9by5yZXNvbHZlKHIpfX0sZnVuY3Rpb24oKXtvLnJlamVjdChudWxsKX0pLG8ucHJvbWlzZX19fV19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5jbGlwYm9hcmRcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQ2xpcGJvYXJkXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntjb3B5OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5jb3Jkb3ZhLnBsdWdpbnMuY2xpcGJvYXJkLmNvcHkocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHBhc3RlOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmNvcmRvdmEucGx1Z2lucy5jbGlwYm9hcmQucGFzdGUoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmNvbnRhY3RzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUNvbnRhY3RzXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57c2F2ZTpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCksbz1uYXZpZ2F0b3IuY29udGFjdHMuY3JlYXRlKG4pO3JldHVybiBvLnNhdmUoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0scmVtb3ZlOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKSxvPW5hdmlnYXRvci5jb250YWN0cy5jcmVhdGUobik7cmV0dXJuIG8ucmVtb3ZlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LGNsb25lOmZ1bmN0aW9uKGUpe3ZhciBuPW5hdmlnYXRvci5jb250YWN0cy5jcmVhdGUoZSk7cmV0dXJuIG4uY2xvbmUoZSl9LGZpbmQ6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpLG89bi5maWVsZHN8fFtcImlkXCIsXCJkaXNwbGF5TmFtZVwiXTtyZXR1cm4gZGVsZXRlIG4uZmllbGRzLDA9PT1PYmplY3Qua2V5cyhuKS5sZW5ndGg/bmF2aWdhdG9yLmNvbnRhY3RzLmZpbmQobyxmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSk6bmF2aWdhdG9yLmNvbnRhY3RzLmZpbmQobyxmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKSxyLnByb21pc2V9LHBpY2tDb250YWN0OmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuY29udGFjdHMucGlja0NvbnRhY3QoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZGF0ZVBpY2tlclwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFEYXRlUGlja2VyXCIsW1wiJHdpbmRvd1wiLFwiJHFcIixmdW5jdGlvbihlLG4pe3JldHVybntzaG93OmZ1bmN0aW9uKHIpe3ZhciBvPW4uZGVmZXIoKTtyZXR1cm4gcj1yfHx7ZGF0ZTpuZXcgRGF0ZSxtb2RlOlwiZGF0ZVwifSxlLmRhdGVQaWNrZXIuc2hvdyhyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmRldmljZVwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFEZXZpY2VcIixbZnVuY3Rpb24oKXtyZXR1cm57Z2V0RGV2aWNlOmZ1bmN0aW9uKCl7cmV0dXJuIGRldmljZX0sZ2V0Q29yZG92YTpmdW5jdGlvbigpe3JldHVybiBkZXZpY2UuY29yZG92YX0sZ2V0TW9kZWw6ZnVuY3Rpb24oKXtyZXR1cm4gZGV2aWNlLm1vZGVsfSxnZXROYW1lOmZ1bmN0aW9uKCl7cmV0dXJuIGRldmljZS5uYW1lfSxnZXRQbGF0Zm9ybTpmdW5jdGlvbigpe3JldHVybiBkZXZpY2UucGxhdGZvcm19LGdldFVVSUQ6ZnVuY3Rpb24oKXtyZXR1cm4gZGV2aWNlLnV1aWR9LGdldFZlcnNpb246ZnVuY3Rpb24oKXtyZXR1cm4gZGV2aWNlLnZlcnNpb259LGdldE1hbnVmYWN0dXJlcjpmdW5jdGlvbigpe3JldHVybiBkZXZpY2UubWFudWZhY3R1cmVyfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5kZXZpY2VNb3Rpb25cIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhRGV2aWNlTW90aW9uXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57Z2V0Q3VycmVudEFjY2VsZXJhdGlvbjpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gYW5ndWxhci5pc1VuZGVmaW5lZChuYXZpZ2F0b3IuYWNjZWxlcm9tZXRlcil8fCFhbmd1bGFyLmlzRnVuY3Rpb24obmF2aWdhdG9yLmFjY2VsZXJvbWV0ZXIuZ2V0Q3VycmVudEFjY2VsZXJhdGlvbik/KG4ucmVqZWN0KFwiRGV2aWNlIGRvIG5vdCBzdXBwb3J0IHdhdGNoQWNjZWxlcmF0aW9uXCIpLG4ucHJvbWlzZSk6KG5hdmlnYXRvci5hY2NlbGVyb21ldGVyLmdldEN1cnJlbnRBY2NlbGVyYXRpb24oZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZSl9LHdhdGNoQWNjZWxlcmF0aW9uOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtpZihhbmd1bGFyLmlzVW5kZWZpbmVkKG5hdmlnYXRvci5hY2NlbGVyb21ldGVyKXx8IWFuZ3VsYXIuaXNGdW5jdGlvbihuYXZpZ2F0b3IuYWNjZWxlcm9tZXRlci53YXRjaEFjY2VsZXJhdGlvbikpcmV0dXJuIHIucmVqZWN0KFwiRGV2aWNlIGRvIG5vdCBzdXBwb3J0IHdhdGNoQWNjZWxlcmF0aW9uXCIpLHIucHJvbWlzZTt2YXIgbz1uYXZpZ2F0b3IuYWNjZWxlcm9tZXRlci53YXRjaEFjY2VsZXJhdGlvbihmdW5jdGlvbihlKXtyLm5vdGlmeShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LG4pO3JldHVybiByLnByb21pc2UuY2FuY2VsPWZ1bmN0aW9uKCl7bmF2aWdhdG9yLmFjY2VsZXJvbWV0ZXIuY2xlYXJXYXRjaChvKX0sci5wcm9taXNlLmNsZWFyV2F0Y2g9ZnVuY3Rpb24oZSl7bmF2aWdhdG9yLmFjY2VsZXJvbWV0ZXIuY2xlYXJXYXRjaChlfHxvKX0sci5wcm9taXNlLndhdGNoSUQ9byxyLnByb21pc2V9LGNsZWFyV2F0Y2g6ZnVuY3Rpb24oZSl7cmV0dXJuIG5hdmlnYXRvci5hY2NlbGVyb21ldGVyLmNsZWFyV2F0Y2goZSl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmRldmljZU9yaWVudGF0aW9uXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YURldmljZU9yaWVudGF0aW9uXCIsW1wiJHFcIixmdW5jdGlvbihlKXt2YXIgbj17ZnJlcXVlbmN5OjNlM307cmV0dXJue2dldEN1cnJlbnRIZWFkaW5nOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuY29tcGFzcz8obmF2aWdhdG9yLmNvbXBhc3MuZ2V0Q3VycmVudEhlYWRpbmcoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZSk6KG4ucmVqZWN0KFwiTm8gY29tcGFzcyBvbiBEZXZpY2VcIiksbi5wcm9taXNlKX0sd2F0Y2hIZWFkaW5nOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtpZighbmF2aWdhdG9yLmNvbXBhc3MpcmV0dXJuIG8ucmVqZWN0KFwiTm8gY29tcGFzcyBvbiBEZXZpY2VcIiksby5wcm9taXNlO3ZhciB0PWFuZ3VsYXIuZXh0ZW5kKG4sciksaT1uYXZpZ2F0b3IuY29tcGFzcy53YXRjaEhlYWRpbmcoZnVuY3Rpb24oZSl7by5ub3RpZnkoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSx0KTtyZXR1cm4gby5wcm9taXNlLmNhbmNlbD1mdW5jdGlvbigpe25hdmlnYXRvci5jb21wYXNzLmNsZWFyV2F0Y2goaSl9LG8ucHJvbWlzZS5jbGVhcldhdGNoPWZ1bmN0aW9uKGUpe25hdmlnYXRvci5jb21wYXNzLmNsZWFyV2F0Y2goZXx8aSl9LG8ucHJvbWlzZS53YXRjaElEPWksby5wcm9taXNlfSxjbGVhcldhdGNoOmZ1bmN0aW9uKGUpe3JldHVybiBuYXZpZ2F0b3IuY29tcGFzcy5jbGVhcldhdGNoKGUpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5kaWFsb2dzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YURpYWxvZ3NcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2FsZXJ0OmZ1bmN0aW9uKHIsbyx0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIG4ubmF2aWdhdG9yLm5vdGlmaWNhdGlvbj9uYXZpZ2F0b3Iubm90aWZpY2F0aW9uLmFsZXJ0KHIsZnVuY3Rpb24oKXtpLnJlc29sdmUoKX0sbyx0KToobi5hbGVydChyKSxpLnJlc29sdmUoKSksaS5wcm9taXNlfSxjb25maXJtOmZ1bmN0aW9uKHIsbyx0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIG4ubmF2aWdhdG9yLm5vdGlmaWNhdGlvbj9uYXZpZ2F0b3Iubm90aWZpY2F0aW9uLmNvbmZpcm0ocixmdW5jdGlvbihlKXtpLnJlc29sdmUoZSl9LG8sdCk6bi5jb25maXJtKHIpP2kucmVzb2x2ZSgxKTppLnJlc29sdmUoMiksaS5wcm9taXNlfSxwcm9tcHQ6ZnVuY3Rpb24ocixvLHQsaSl7dmFyIGE9ZS5kZWZlcigpO2lmKG4ubmF2aWdhdG9yLm5vdGlmaWNhdGlvbiluYXZpZ2F0b3Iubm90aWZpY2F0aW9uLnByb21wdChyLGZ1bmN0aW9uKGUpe2EucmVzb2x2ZShlKX0sbyx0LGkpO2Vsc2V7dmFyIGM9bi5wcm9tcHQocixpKTtudWxsIT09Yz9hLnJlc29sdmUoe2lucHV0MTpjLGJ1dHRvbkluZGV4OjF9KTphLnJlc29sdmUoe2lucHV0MTpjLGJ1dHRvbkluZGV4OjJ9KX1yZXR1cm4gYS5wcm9taXNlfSxiZWVwOmZ1bmN0aW9uKGUpe3JldHVybiBuYXZpZ2F0b3Iubm90aWZpY2F0aW9uLmJlZXAoZSl9LGFjdGl2aXR5U3RhcnQ6ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuXCJhbmRyb2lkXCI9PT1jb3Jkb3ZhLnBsYXRmb3JtSWQ/KG5hdmlnYXRvci5ub3RpZmljYXRpb24uYWN0aXZpdHlTdGFydChyLG4pLG8ucmVzb2x2ZSgpKTpvLnJlamVjdChuLHIpLG8ucHJvbWlzZX0sYWN0aXZpdHlTdG9wOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVyblwiYW5kcm9pZFwiPT09Y29yZG92YS5wbGF0Zm9ybUlkPyhuYXZpZ2F0b3Iubm90aWZpY2F0aW9uLmFjdGl2aXR5U3RvcCgpLG4ucmVzb2x2ZSgpKTpuLnJlamVjdCgpLG4ucHJvbWlzZX0scHJvZ3Jlc3NTdGFydDpmdW5jdGlvbihuLHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm5cImFuZHJvaWRcIj09PWNvcmRvdmEucGxhdGZvcm1JZD8obmF2aWdhdG9yLm5vdGlmaWNhdGlvbi5wcm9ncmVzc1N0YXJ0KHIsbiksby5yZXNvbHZlKCkpOm8ucmVqZWN0KG4sciksby5wcm9taXNlfSxwcm9ncmVzc1N0b3A6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuXCJhbmRyb2lkXCI9PT1jb3Jkb3ZhLnBsYXRmb3JtSWQ/KG5hdmlnYXRvci5ub3RpZmljYXRpb24ucHJvZ3Jlc3NTdG9wKCksbi5yZXNvbHZlKCkpOm4ucmVqZWN0KCksbi5wcm9taXNlfSxwcm9ncmVzc1ZhbHVlOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm5cImFuZHJvaWRcIj09PWNvcmRvdmEucGxhdGZvcm1JZD8obmF2aWdhdG9yLm5vdGlmaWNhdGlvbi5wcm9ncmVzc1ZhbHVlKG4pLHIucmVzb2x2ZSgpKTpyLnJlamVjdChuKSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmVtYWlsQ29tcG9zZXJcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhRW1haWxDb21wb3NlclwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2lzQXZhaWxhYmxlOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuZW1haWwuaXNBdmFpbGFibGUoZnVuY3Rpb24oZSl7ZT9uLnJlc29sdmUoKTpuLnJlamVjdCgpfSksbi5wcm9taXNlfSxvcGVuOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLmVtYWlsLm9wZW4obixmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LGFkZEFsaWFzOmZ1bmN0aW9uKGUsbil7Y29yZG92YS5wbHVnaW5zLmVtYWlsLmFkZEFsaWFzKGUsbil9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmZhY2Vib29rXCIsW10pLnByb3ZpZGVyKFwiJGNvcmRvdmFGYWNlYm9va1wiLFtmdW5jdGlvbigpe3RoaXMuYnJvd3NlckluaXQ9ZnVuY3Rpb24oZSxuKXt0aGlzLmFwcElEPWUsdGhpcy5hcHBWZXJzaW9uPW58fFwidjIuMFwiLGZhY2Vib29rQ29ubmVjdFBsdWdpbi5icm93c2VySW5pdCh0aGlzLmFwcElELHRoaXMuYXBwVmVyc2lvbil9LHRoaXMuJGdldD1bXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntsb2dpbjpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGZhY2Vib29rQ29ubmVjdFBsdWdpbi5sb2dpbihuLGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHNob3dEaWFsb2c6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBmYWNlYm9va0Nvbm5lY3RQbHVnaW4uc2hvd0RpYWxvZyhuLGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LGFwaTpmdW5jdGlvbihuLHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gZmFjZWJvb2tDb25uZWN0UGx1Z2luLmFwaShuLHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sZ2V0QWNjZXNzVG9rZW46ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGZhY2Vib29rQ29ubmVjdFBsdWdpbi5nZXRBY2Nlc3NUb2tlbihmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxnZXRMb2dpblN0YXR1czpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gZmFjZWJvb2tDb25uZWN0UGx1Z2luLmdldExvZ2luU3RhdHVzKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9LGxvZ291dDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gZmFjZWJvb2tDb25uZWN0UGx1Z2luLmxvZ291dChmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfX19XX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmZhY2Vib29rQWRzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUZhY2Vib29rQWRzXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntzZXRPcHRpb25zOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5GYWNlYm9va0Fkcy5zZXRPcHRpb25zKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxjcmVhdGVCYW5uZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLkZhY2Vib29rQWRzLmNyZWF0ZUJhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0scmVtb3ZlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLkZhY2Vib29rQWRzLnJlbW92ZUJhbm5lcihmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHNob3dCYW5uZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLkZhY2Vib29rQWRzLnNob3dCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dCYW5uZXJBdFhZOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLkZhY2Vib29rQWRzLnNob3dCYW5uZXJBdFhZKHIsbyxmdW5jdGlvbigpe3QucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3QucmVqZWN0KCl9KSx0LnByb21pc2V9LGhpZGVCYW5uZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uRmFjZWJvb2tBZHMuaGlkZUJhbm5lcihmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHByZXBhcmVJbnRlcnN0aXRpYWw6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLkZhY2Vib29rQWRzLnByZXBhcmVJbnRlcnN0aXRpYWwocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dJbnRlcnN0aXRpYWw6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uRmFjZWJvb2tBZHMuc2hvd0ludGVyc3RpdGlhbChmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe1xyXG5yLnJlamVjdCgpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5maWxlXCIsW10pLmNvbnN0YW50KFwiJGNvcmRvdmFGaWxlRXJyb3JcIix7MTpcIk5PVF9GT1VORF9FUlJcIiwyOlwiU0VDVVJJVFlfRVJSXCIsMzpcIkFCT1JUX0VSUlwiLDQ6XCJOT1RfUkVBREFCTEVfRVJSXCIsNTpcIkVOQ09ESU5HX0VSUlwiLDY6XCJOT19NT0RJRklDQVRJT05fQUxMT1dFRF9FUlJcIiw3OlwiSU5WQUxJRF9TVEFURV9FUlJcIiw4OlwiU1lOVEFYX0VSUlwiLDk6XCJJTlZBTElEX01PRElGSUNBVElPTl9FUlJcIiwxMDpcIlFVT1RBX0VYQ0VFREVEX0VSUlwiLDExOlwiVFlQRV9NSVNNQVRDSF9FUlJcIiwxMjpcIlBBVEhfRVhJU1RTX0VSUlwifSkucHJvdmlkZXIoXCIkY29yZG92YUZpbGVcIixbZnVuY3Rpb24oKXt0aGlzLiRnZXQ9W1wiJHFcIixcIiR3aW5kb3dcIixcIiRjb3Jkb3ZhRmlsZUVycm9yXCIsZnVuY3Rpb24oZSxuLHIpe3JldHVybntnZXRGcmVlRGlza1NwYWNlOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLmV4ZWMoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0sXCJGaWxlXCIsXCJnZXRGcmVlRGlza1NwYWNlXCIsW10pLG4ucHJvbWlzZX0sY2hlY2tEaXI6ZnVuY3Rpb24obyx0KXt2YXIgaT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmkucmVqZWN0KFwiZGlyZWN0b3J5IGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e3ZhciBhPW8rdDtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwoYSxmdW5jdGlvbihlKXtlLmlzRGlyZWN0b3J5PT09ITA/aS5yZXNvbHZlKGUpOmkucmVqZWN0KHtjb2RlOjEzLG1lc3NhZ2U6XCJpbnB1dCBpcyBub3QgYSBkaXJlY3RvcnlcIn0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9Y2F0Y2goYyl7Yy5tZXNzYWdlPXJbYy5jb2RlXSxpLnJlamVjdChjKX1yZXR1cm4gaS5wcm9taXNlfSxjaGVja0ZpbGU6ZnVuY3Rpb24obyx0KXt2YXIgaT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmkucmVqZWN0KFwiZGlyZWN0b3J5IGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e3ZhciBhPW8rdDtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwoYSxmdW5jdGlvbihlKXtlLmlzRmlsZT09PSEwP2kucmVzb2x2ZShlKTppLnJlamVjdCh7Y29kZToxMyxtZXNzYWdlOlwiaW5wdXQgaXMgbm90IGEgZmlsZVwifSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX1jYXRjaChjKXtjLm1lc3NhZ2U9cltjLmNvZGVdLGkucmVqZWN0KGMpfXJldHVybiBpLnByb21pc2V9LGNyZWF0ZURpcjpmdW5jdGlvbihvLHQsaSl7dmFyIGE9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZhLnJlamVjdChcImRpcmVjdG9yeSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpLGk9aT8hMTohMDt2YXIgYz17Y3JlYXRlOiEwLGV4Y2x1c2l2ZTppfTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKG8sZnVuY3Rpb24oZSl7ZS5nZXREaXJlY3RvcnkodCxjLGZ1bmN0aW9uKGUpe2EucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxhLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGEucmVqZWN0KGUpfSl9Y2F0Y2godSl7dS5tZXNzYWdlPXJbdS5jb2RlXSxhLnJlamVjdCh1KX1yZXR1cm4gYS5wcm9taXNlfSxjcmVhdGVGaWxlOmZ1bmN0aW9uKG8sdCxpKXt2YXIgYT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmEucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIiksaT1pPyExOiEwO3ZhciBjPXtjcmVhdGU6ITAsZXhjbHVzaXZlOml9O3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwobyxmdW5jdGlvbihlKXtlLmdldEZpbGUodCxjLGZ1bmN0aW9uKGUpe2EucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxhLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGEucmVqZWN0KGUpfSl9Y2F0Y2godSl7dS5tZXNzYWdlPXJbdS5jb2RlXSxhLnJlamVjdCh1KX1yZXR1cm4gYS5wcm9taXNlfSxyZW1vdmVEaXI6ZnVuY3Rpb24obyx0KXt2YXIgaT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmkucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChvLGZ1bmN0aW9uKGUpe2UuZ2V0RGlyZWN0b3J5KHQse2NyZWF0ZTohMX0sZnVuY3Rpb24oZSl7ZS5yZW1vdmUoZnVuY3Rpb24oKXtpLnJlc29sdmUoe3N1Y2Nlc3M6ITAsZmlsZVJlbW92ZWQ6ZX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfWNhdGNoKGEpe2EubWVzc2FnZT1yW2EuY29kZV0saS5yZWplY3QoYSl9cmV0dXJuIGkucHJvbWlzZX0scmVtb3ZlRmlsZTpmdW5jdGlvbihvLHQpe3ZhciBpPWUuZGVmZXIoKTsvXlxcLy8udGVzdCh0KSYmaS5yZWplY3QoXCJmaWxlLW5hbWUgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKG8sZnVuY3Rpb24oZSl7ZS5nZXRGaWxlKHQse2NyZWF0ZTohMX0sZnVuY3Rpb24oZSl7ZS5yZW1vdmUoZnVuY3Rpb24oKXtpLnJlc29sdmUoe3N1Y2Nlc3M6ITAsZmlsZVJlbW92ZWQ6ZX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfWNhdGNoKGEpe2EubWVzc2FnZT1yW2EuY29kZV0saS5yZWplY3QoYSl9cmV0dXJuIGkucHJvbWlzZX0scmVtb3ZlUmVjdXJzaXZlbHk6ZnVuY3Rpb24obyx0KXt2YXIgaT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmkucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChvLGZ1bmN0aW9uKGUpe2UuZ2V0RGlyZWN0b3J5KHQse2NyZWF0ZTohMX0sZnVuY3Rpb24oZSl7ZS5yZW1vdmVSZWN1cnNpdmVseShmdW5jdGlvbigpe2kucmVzb2x2ZSh7c3VjY2VzczohMCxmaWxlUmVtb3ZlZDplfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9Y2F0Y2goYSl7YS5tZXNzYWdlPXJbYS5jb2RlXSxpLnJlamVjdChhKX1yZXR1cm4gaS5wcm9taXNlfSx3cml0ZUZpbGU6ZnVuY3Rpb24obyx0LGksYSl7dmFyIGM9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZjLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpLGE9YT8hMTohMDt2YXIgdT17Y3JlYXRlOiEwLGV4Y2x1c2l2ZTphfTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKG8sZnVuY3Rpb24oZSl7ZS5nZXRGaWxlKHQsdSxmdW5jdGlvbihlKXtlLmNyZWF0ZVdyaXRlcihmdW5jdGlvbihlKXt1LmFwcGVuZD09PSEwJiZlLnNlZWsoZS5sZW5ndGgpLHUudHJ1bmNhdGUmJmUudHJ1bmNhdGUodS50cnVuY2F0ZSksZS5vbndyaXRlZW5kPWZ1bmN0aW9uKGUpe3RoaXMuZXJyb3I/Yy5yZWplY3QodGhpcy5lcnJvcik6Yy5yZXNvbHZlKGUpfSxlLndyaXRlKGkpLGMucHJvbWlzZS5hYm9ydD1mdW5jdGlvbigpe2UuYWJvcnQoKX19KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxjLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGMucmVqZWN0KGUpfSl9Y2F0Y2gocyl7cy5tZXNzYWdlPXJbcy5jb2RlXSxjLnJlamVjdChzKX1yZXR1cm4gYy5wcm9taXNlfSx3cml0ZUV4aXN0aW5nRmlsZTpmdW5jdGlvbihvLHQsaSl7dmFyIGE9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZhLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwobyxmdW5jdGlvbihlKXtlLmdldEZpbGUodCx7Y3JlYXRlOiExfSxmdW5jdGlvbihlKXtlLmNyZWF0ZVdyaXRlcihmdW5jdGlvbihlKXtlLnNlZWsoZS5sZW5ndGgpLGUub253cml0ZWVuZD1mdW5jdGlvbihlKXt0aGlzLmVycm9yP2EucmVqZWN0KHRoaXMuZXJyb3IpOmEucmVzb2x2ZShlKX0sZS53cml0ZShpKSxhLnByb21pc2UuYWJvcnQ9ZnVuY3Rpb24oKXtlLmFib3J0KCl9fSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxhLnJlamVjdChlKX0pfWNhdGNoKGMpe2MubWVzc2FnZT1yW2MuY29kZV0sYS5yZWplY3QoYyl9cmV0dXJuIGEucHJvbWlzZX0scmVhZEFzVGV4dDpmdW5jdGlvbihvLHQpe3ZhciBpPWUuZGVmZXIoKTsvXlxcLy8udGVzdCh0KSYmaS5yZWplY3QoXCJmaWxlLW5hbWUgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKG8sZnVuY3Rpb24oZSl7ZS5nZXRGaWxlKHQse2NyZWF0ZTohMX0sZnVuY3Rpb24oZSl7ZS5maWxlKGZ1bmN0aW9uKGUpe3ZhciBuPW5ldyBGaWxlUmVhZGVyO24ub25sb2FkZW5kPWZ1bmN0aW9uKGUpe3ZvaWQgMCE9PWUudGFyZ2V0LnJlc3VsdHx8bnVsbCE9PWUudGFyZ2V0LnJlc3VsdD9pLnJlc29sdmUoZS50YXJnZXQucmVzdWx0KTp2b2lkIDAhPT1lLnRhcmdldC5lcnJvcnx8bnVsbCE9PWUudGFyZ2V0LmVycm9yP2kucmVqZWN0KGUudGFyZ2V0LmVycm9yKTppLnJlamVjdCh7Y29kZTpudWxsLG1lc3NhZ2U6XCJSRUFERVJfT05MT0FERU5EX0VSUlwifSl9LG4ucmVhZEFzVGV4dChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX1jYXRjaChhKXthLm1lc3NhZ2U9clthLmNvZGVdLGkucmVqZWN0KGEpfXJldHVybiBpLnByb21pc2V9LHJlYWRBc0RhdGFVUkw6ZnVuY3Rpb24obyx0KXt2YXIgaT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmkucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChvLGZ1bmN0aW9uKGUpe2UuZ2V0RmlsZSh0LHtjcmVhdGU6ITF9LGZ1bmN0aW9uKGUpe2UuZmlsZShmdW5jdGlvbihlKXt2YXIgbj1uZXcgRmlsZVJlYWRlcjtuLm9ubG9hZGVuZD1mdW5jdGlvbihlKXt2b2lkIDAhPT1lLnRhcmdldC5yZXN1bHR8fG51bGwhPT1lLnRhcmdldC5yZXN1bHQ/aS5yZXNvbHZlKGUudGFyZ2V0LnJlc3VsdCk6dm9pZCAwIT09ZS50YXJnZXQuZXJyb3J8fG51bGwhPT1lLnRhcmdldC5lcnJvcj9pLnJlamVjdChlLnRhcmdldC5lcnJvcik6aS5yZWplY3Qoe2NvZGU6bnVsbCxtZXNzYWdlOlwiUkVBREVSX09OTE9BREVORF9FUlJcIn0pfSxuLnJlYWRBc0RhdGFVUkwoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9Y2F0Y2goYSl7YS5tZXNzYWdlPXJbYS5jb2RlXSxpLnJlamVjdChhKX1yZXR1cm4gaS5wcm9taXNlfSxyZWFkQXNCaW5hcnlTdHJpbmc6ZnVuY3Rpb24obyx0KXt2YXIgaT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmkucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChvLGZ1bmN0aW9uKGUpe2UuZ2V0RmlsZSh0LHtjcmVhdGU6ITF9LGZ1bmN0aW9uKGUpe2UuZmlsZShmdW5jdGlvbihlKXt2YXIgbj1uZXcgRmlsZVJlYWRlcjtuLm9ubG9hZGVuZD1mdW5jdGlvbihlKXt2b2lkIDAhPT1lLnRhcmdldC5yZXN1bHR8fG51bGwhPT1lLnRhcmdldC5yZXN1bHQ/aS5yZXNvbHZlKGUudGFyZ2V0LnJlc3VsdCk6dm9pZCAwIT09ZS50YXJnZXQuZXJyb3J8fG51bGwhPT1lLnRhcmdldC5lcnJvcj9pLnJlamVjdChlLnRhcmdldC5lcnJvcik6aS5yZWplY3Qoe2NvZGU6bnVsbCxtZXNzYWdlOlwiUkVBREVSX09OTE9BREVORF9FUlJcIn0pfSxuLnJlYWRBc0JpbmFyeVN0cmluZyhlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX1jYXRjaChhKXthLm1lc3NhZ2U9clthLmNvZGVdLGkucmVqZWN0KGEpfXJldHVybiBpLnByb21pc2V9LHJlYWRBc0FycmF5QnVmZmVyOmZ1bmN0aW9uKG8sdCl7dmFyIGk9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZpLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwobyxmdW5jdGlvbihlKXtlLmdldEZpbGUodCx7Y3JlYXRlOiExfSxmdW5jdGlvbihlKXtlLmZpbGUoZnVuY3Rpb24oZSl7dmFyIG49bmV3IEZpbGVSZWFkZXI7bi5vbmxvYWRlbmQ9ZnVuY3Rpb24oZSl7dm9pZCAwIT09ZS50YXJnZXQucmVzdWx0fHxudWxsIT09ZS50YXJnZXQucmVzdWx0P2kucmVzb2x2ZShlLnRhcmdldC5yZXN1bHQpOnZvaWQgMCE9PWUudGFyZ2V0LmVycm9yfHxudWxsIT09ZS50YXJnZXQuZXJyb3I/aS5yZWplY3QoZS50YXJnZXQuZXJyb3IpOmkucmVqZWN0KHtjb2RlOm51bGwsbWVzc2FnZTpcIlJFQURFUl9PTkxPQURFTkRfRVJSXCJ9KX0sbi5yZWFkQXNBcnJheUJ1ZmZlcihlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX1jYXRjaChhKXthLm1lc3NhZ2U9clthLmNvZGVdLGkucmVqZWN0KGEpfXJldHVybiBpLnByb21pc2V9LG1vdmVGaWxlOmZ1bmN0aW9uKHIsbyx0LGkpe3ZhciBhPWUuZGVmZXIoKTtpPWl8fG8sKC9eXFwvLy50ZXN0KG8pfHwvXlxcLy8udGVzdChpKSkmJmEucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChyLGZ1bmN0aW9uKGUpe2UuZ2V0RmlsZShvLHtjcmVhdGU6ITF9LGZ1bmN0aW9uKGUpe24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTCh0LGZ1bmN0aW9uKG4pe2UubW92ZVRvKG4saSxmdW5jdGlvbihlKXthLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2EucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2EucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2EucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2EucmVqZWN0KGUpfSl9Y2F0Y2goYyl7YS5yZWplY3QoYyl9cmV0dXJuIGEucHJvbWlzZX0sbW92ZURpcjpmdW5jdGlvbihyLG8sdCxpKXt2YXIgYT1lLmRlZmVyKCk7aT1pfHxvLCgvXlxcLy8udGVzdChvKXx8L15cXC8vLnRlc3QoaSkpJiZhLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwocixmdW5jdGlvbihlKXtlLmdldERpcmVjdG9yeShvLHtjcmVhdGU6ITF9LGZ1bmN0aW9uKGUpe24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTCh0LGZ1bmN0aW9uKG4pe2UubW92ZVRvKG4saSxmdW5jdGlvbihlKXthLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2EucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2EucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2EucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2EucmVqZWN0KGUpfSl9Y2F0Y2goYyl7YS5yZWplY3QoYyl9cmV0dXJuIGEucHJvbWlzZX0sY29weURpcjpmdW5jdGlvbihvLHQsaSxhKXt2YXIgYz1lLmRlZmVyKCk7YT1hfHx0LCgvXlxcLy8udGVzdCh0KXx8L15cXC8vLnRlc3QoYSkpJiZjLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwobyxmdW5jdGlvbihlKXtlLmdldERpcmVjdG9yeSh0LHtjcmVhdGU6ITEsZXhjbHVzaXZlOiExfSxmdW5jdGlvbihlKXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwoaSxmdW5jdGlvbihuKXtlLmNvcHlUbyhuLGEsZnVuY3Rpb24oZSl7Yy5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGMucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYy5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxjLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGMucmVqZWN0KGUpfSl9Y2F0Y2godSl7dS5tZXNzYWdlPXJbdS5jb2RlXSxjLnJlamVjdCh1KX1yZXR1cm4gYy5wcm9taXNlfSxjb3B5RmlsZTpmdW5jdGlvbihvLHQsaSxhKXt2YXIgYz1lLmRlZmVyKCk7YT1hfHx0LC9eXFwvLy50ZXN0KHQpJiZjLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwobyxmdW5jdGlvbihlKXtlLmdldEZpbGUodCx7Y3JlYXRlOiExLGV4Y2x1c2l2ZTohMX0sZnVuY3Rpb24oZSl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKGksZnVuY3Rpb24obil7ZS5jb3B5VG8obixhLGZ1bmN0aW9uKGUpe2MucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxjLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGMucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYy5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxjLnJlamVjdChlKX0pfWNhdGNoKHUpe3UubWVzc2FnZT1yW3UuY29kZV0sYy5yZWplY3QodSl9cmV0dXJuIGMucHJvbWlzZX0scmVhZEZpbGVNZXRhZGF0YTpmdW5jdGlvbihvLHQpe3ZhciBpPWUuZGVmZXIoKTsvXlxcLy8udGVzdCh0KSYmaS5yZWplY3QoXCJkaXJlY3RvcnkgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7dmFyIGE9byt0O24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChhLGZ1bmN0aW9uKGUpe2UuZmlsZShmdW5jdGlvbihlKXtpLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfWNhdGNoKGMpe2MubWVzc2FnZT1yW2MuY29kZV0saS5yZWplY3QoYyl9cmV0dXJuIGkucHJvbWlzZX19fV19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5maWxlT3BlbmVyMlwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFGaWxlT3BlbmVyMlwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue29wZW46ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5maWxlT3BlbmVyMi5vcGVuKG4scix7ZXJyb3I6ZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9LHN1Y2Nlc3M6ZnVuY3Rpb24oKXtvLnJlc29sdmUoKX19KSxvLnByb21pc2V9LHVuaW5zdGFsbDpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5maWxlT3BlbmVyMi51bmluc3RhbGwobix7ZXJyb3I6ZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LHN1Y2Nlc3M6ZnVuY3Rpb24oKXtyLnJlc29sdmUoKX19KSxyLnByb21pc2V9LGFwcElzSW5zdGFsbGVkOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLmZpbGVPcGVuZXIyLmFwcElzSW5zdGFsbGVkKG4se3N1Y2Nlc3M6ZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmlsZVRyYW5zZmVyXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUZpbGVUcmFuc2ZlclwiLFtcIiRxXCIsXCIkdGltZW91dFwiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2Rvd25sb2FkOmZ1bmN0aW9uKHIsbyx0LGkpe3ZhciBhPWUuZGVmZXIoKSxjPW5ldyBGaWxlVHJhbnNmZXIsdT10JiZ0LmVuY29kZVVSST09PSExP3I6ZW5jb2RlVVJJKHIpO3JldHVybiB0JiZ2b2lkIDAhPT10LnRpbWVvdXQmJm51bGwhPT10LnRpbWVvdXQmJihuKGZ1bmN0aW9uKCl7Yy5hYm9ydCgpfSx0LnRpbWVvdXQpLHQudGltZW91dD1udWxsKSxjLm9ucHJvZ3Jlc3M9ZnVuY3Rpb24oZSl7YS5ub3RpZnkoZSl9LGEucHJvbWlzZS5hYm9ydD1mdW5jdGlvbigpe2MuYWJvcnQoKX0sYy5kb3dubG9hZCh1LG8sYS5yZXNvbHZlLGEucmVqZWN0LGksdCksYS5wcm9taXNlfSx1cGxvYWQ6ZnVuY3Rpb24ocixvLHQsaSl7dmFyIGE9ZS5kZWZlcigpLGM9bmV3IEZpbGVUcmFuc2Zlcix1PXQmJnQuZW5jb2RlVVJJPT09ITE/cjplbmNvZGVVUkkocik7cmV0dXJuIHQmJnZvaWQgMCE9PXQudGltZW91dCYmbnVsbCE9PXQudGltZW91dCYmKG4oZnVuY3Rpb24oKXtjLmFib3J0KCl9LHQudGltZW91dCksdC50aW1lb3V0PW51bGwpLGMub25wcm9ncmVzcz1mdW5jdGlvbihlKXthLm5vdGlmeShlKX0sYS5wcm9taXNlLmFib3J0PWZ1bmN0aW9uKCl7Yy5hYm9ydCgpfSxjLnVwbG9hZChvLHUsYS5yZXNvbHZlLGEucmVqZWN0LHQsaSksYS5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5mbGFzaGxpZ2h0XCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUZsYXNobGlnaHRcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2F2YWlsYWJsZTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmZsYXNobGlnaHQuYXZhaWxhYmxlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0pLHIucHJvbWlzZX0sc3dpdGNoT246ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5mbGFzaGxpZ2h0LnN3aXRjaE9uKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHN3aXRjaE9mZjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmZsYXNobGlnaHQuc3dpdGNoT2ZmKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHRvZ2dsZTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmZsYXNobGlnaHQudG9nZ2xlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmZsdXJyeUFkc1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFGbHVycnlBZHNcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3NldE9wdGlvbnM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLkZsdXJyeUFkcy5zZXRPcHRpb25zKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxjcmVhdGVCYW5uZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLkZsdXJyeUFkcy5jcmVhdGVCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHJlbW92ZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5GbHVycnlBZHMucmVtb3ZlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0sc2hvd0Jhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uRmx1cnJ5QWRzLnNob3dCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dCYW5uZXJBdFhZOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLkZsdXJyeUFkcy5zaG93QmFubmVyQXRYWShyLG8sZnVuY3Rpb24oKXt0LnJlc29sdmUoKX0sZnVuY3Rpb24oKXt0LnJlamVjdCgpfSksdC5wcm9taXNlfSxoaWRlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLkZsdXJyeUFkcy5oaWRlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0scHJlcGFyZUludGVyc3RpdGlhbDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uRmx1cnJ5QWRzLnByZXBhcmVJbnRlcnN0aXRpYWwocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dJbnRlcnN0aXRpYWw6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uRmx1cnJ5QWRzLnNob3dJbnRlcnN0aXRpYWwoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5nYVwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFHQVwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57aW5pdDpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbz1vPj0wP286MTAsbi5wbHVnaW5zLmdhUGx1Z2luLmluaXQoZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0scixvKSx0LnByb21pc2V9LHRyYWNrRXZlbnQ6ZnVuY3Rpb24ocixvLHQsaSxhLGMpe3ZhciB1PWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmdhUGx1Z2luLnRyYWNrRXZlbnQoZnVuY3Rpb24oZSl7dS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt1LnJlamVjdChlKX0sdCxpLGEsYyksdS5wcm9taXNlfSx0cmFja1BhZ2U6ZnVuY3Rpb24ocixvLHQpe3ZhciBpPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmdhUGx1Z2luLnRyYWNrUGFnZShmdW5jdGlvbihlKXtpLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2kucmVqZWN0KGUpfSx0KSxpLnByb21pc2V9LHNldFZhcmlhYmxlOmZ1bmN0aW9uKHIsbyx0LGkpe3ZhciBhPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmdhUGx1Z2luLnNldFZhcmlhYmxlKGZ1bmN0aW9uKGUpe2EucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7YS5yZWplY3QoZSl9LHQsaSksYS5wcm9taXNlfSxleGl0OmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuZ2FQbHVnaW4uZXhpdChmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5nZW9sb2NhdGlvblwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFHZW9sb2NhdGlvblwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2dldEN1cnJlbnRQb3NpdGlvbjpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbiksci5wcm9taXNlfSx3YXRjaFBvc2l0aW9uOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKSxvPW5hdmlnYXRvci5nZW9sb2NhdGlvbi53YXRjaFBvc2l0aW9uKGZ1bmN0aW9uKGUpe3Iubm90aWZ5KGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbik7cmV0dXJuIHIucHJvbWlzZS5jYW5jZWw9ZnVuY3Rpb24oKXtuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uY2xlYXJXYXRjaChvKX0sci5wcm9taXNlLmNsZWFyV2F0Y2g9ZnVuY3Rpb24oZSl7bmF2aWdhdG9yLmdlb2xvY2F0aW9uLmNsZWFyV2F0Y2goZXx8byl9LHIucHJvbWlzZS53YXRjaElEPW8sci5wcm9taXNlfSxjbGVhcldhdGNoOmZ1bmN0aW9uKGUpe3JldHVybiBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uY2xlYXJXYXRjaChlKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ2xvYmFsaXphdGlvblwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFHbG9iYWxpemF0aW9uXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57Z2V0UHJlZmVycmVkTGFuZ3VhZ2U6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLmdldFByZWZlcnJlZExhbmd1YWdlKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9LGdldExvY2FsZU5hbWU6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLmdldExvY2FsZU5hbWUoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sZ2V0Rmlyc3REYXlPZldlZWs6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLmdldEZpcnN0RGF5T2ZXZWVrKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9LGRhdGVUb1N0cmluZzpmdW5jdGlvbihuLHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmdsb2JhbGl6YXRpb24uZGF0ZVRvU3RyaW5nKG4sZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0sciksby5wcm9taXNlfSxzdHJpbmdUb0RhdGU6ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLnN0cmluZ1RvRGF0ZShuLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9LHIpLG8ucHJvbWlzZX0sZ2V0RGF0ZVBhdHRlcm46ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZ2xvYmFsaXphdGlvbi5nZXREYXRlUGF0dGVybihmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKSxyLnByb21pc2V9LGdldERhdGVOYW1lczpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLmdldERhdGVOYW1lcyhmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKSxyLnByb21pc2V9LGlzRGF5TGlnaHRTYXZpbmdzVGltZTpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLmlzRGF5TGlnaHRTYXZpbmdzVGltZShuLGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LG51bWJlclRvU3RyaW5nOmZ1bmN0aW9uKG4scil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZ2xvYmFsaXphdGlvbi5udW1iZXJUb1N0cmluZyhuLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9LHIpLG8ucHJvbWlzZX0sc3RyaW5nVG9OdW1iZXI6ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLnN0cmluZ1RvTnVtYmVyKG4sZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0sciksby5wcm9taXNlfSxnZXROdW1iZXJQYXR0ZXJuOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmdsb2JhbGl6YXRpb24uZ2V0TnVtYmVyUGF0dGVybihmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKSxyLnByb21pc2V9LGdldEN1cnJlbmN5UGF0dGVybjpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLmdldEN1cnJlbmN5UGF0dGVybihuLGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmdvb2dsZUFkc1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFHb29nbGVBZHNcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3NldE9wdGlvbnM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLkFkTW9iLnNldE9wdGlvbnMocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LGNyZWF0ZUJhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uQWRNb2IuY3JlYXRlQmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxyZW1vdmVCYW5uZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uQWRNb2IucmVtb3ZlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0sc2hvd0Jhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uQWRNb2Iuc2hvd0Jhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0Jhbm5lckF0WFk6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4uQWRNb2Iuc2hvd0Jhbm5lckF0WFkocixvLGZ1bmN0aW9uKCl7dC5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7dC5yZWplY3QoKX0pLHQucHJvbWlzZX0saGlkZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5BZE1vYi5oaWRlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0scHJlcGFyZUludGVyc3RpdGlhbDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uQWRNb2IucHJlcGFyZUludGVyc3RpdGlhbChyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0ludGVyc3RpdGlhbDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5BZE1vYi5zaG93SW50ZXJzdGl0aWFsKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ29vZ2xlQW5hbHl0aWNzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUdvb2dsZUFuYWx5dGljc1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57c3RhcnRUcmFja2VyV2l0aElkOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5hbmFseXRpY3Muc3RhcnRUcmFja2VyV2l0aElkKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sc2V0VXNlcklkOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5hbmFseXRpY3Muc2V0VXNlcklkKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sZGVidWdNb2RlOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmFuYWx5dGljcy5kZWJ1Z01vZGUoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHRyYWNrVmlldzpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uYW5hbHl0aWNzLnRyYWNrVmlldyhyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGFkZEN1c3RvbURpbWVuc2lvbjpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKSxpPXBhcnNlSW50KHIsMTApO3JldHVybiBpc05hTihpKSYmdC5yZWplY3QoJ1BhcmFtZXRlciBcImtleVwiIG11c3QgYmUgYW4gaW50ZWdlci4nKSxuLmFuYWx5dGljcy5hZGRDdXN0b21EaW1lbnNpb24oaSxvLGZ1bmN0aW9uKCl7dC5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSksdC5wcm9taXNlfSx0cmFja0V2ZW50OmZ1bmN0aW9uKHIsbyx0LGkpe3ZhciBhPWUuZGVmZXIoKTtyZXR1cm4gbi5hbmFseXRpY3MudHJhY2tFdmVudChyLG8sdCxpLGZ1bmN0aW9uKGUpe2EucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7YS5yZWplY3QoZSl9KSxhLnByb21pc2V9LHRyYWNrRXhjZXB0aW9uOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLmFuYWx5dGljcy50cmFja0V4Y2VwdGlvbihyLG8sZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0pLHQucHJvbWlzZX0sdHJhY2tUaW1pbmc6ZnVuY3Rpb24ocixvLHQsaSl7dmFyIGE9ZS5kZWZlcigpO3JldHVybiBuLmFuYWx5dGljcy50cmFja1RpbWluZyhyLG8sdCxpLGZ1bmN0aW9uKGUpe2EucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7YS5yZWplY3QoZSl9KSxhLnByb21pc2V9LGFkZFRyYW5zYWN0aW9uOmZ1bmN0aW9uKHIsbyx0LGksYSxjKXt2YXIgdT1lLmRlZmVyKCk7cmV0dXJuIG4uYW5hbHl0aWNzLmFkZFRyYW5zYWN0aW9uKHIsbyx0LGksYSxjLGZ1bmN0aW9uKGUpe3UucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7dS5yZWplY3QoZSl9KSx1LnByb21pc2V9LGFkZFRyYW5zYWN0aW9uSXRlbTpmdW5jdGlvbihyLG8sdCxpLGEsYyx1KXt2YXIgcz1lLmRlZmVyKCk7cmV0dXJuIG4uYW5hbHl0aWNzLmFkZFRyYW5zYWN0aW9uSXRlbShyLG8sdCxpLGEsYyx1LGZ1bmN0aW9uKGUpe3MucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7cy5yZWplY3QoZSl9KSxzLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmdvb2dsZU1hcFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFHb29nbGVNYXBcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7dmFyIHI9bnVsbDtyZXR1cm57Z2V0TWFwOmZ1bmN0aW9uKG8pe3ZhciB0PWUuZGVmZXIoKTtpZihuLnBsdWdpbi5nb29nbGUubWFwcyl7dmFyIGk9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBfY2FudmFzXCIpO3I9bi5wbHVnaW4uZ29vZ2xlLm1hcHMuTWFwLmdldE1hcChvKSxyLnNldERpdihpKSx0LnJlc29sdmUocil9ZWxzZSB0LnJlamVjdChudWxsKTtyZXR1cm4gdC5wcm9taXNlfSxpc01hcExvYWRlZDpmdW5jdGlvbigpe3JldHVybiEhcn0sYWRkTWFya2VyOmZ1bmN0aW9uKG4pe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gci5hZGRNYXJrZXIobixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9KSxvLnByb21pc2V9LGdldE1hcFR5cGVJZHM6ZnVuY3Rpb24oKXtyZXR1cm4gbi5wbHVnaW4uZ29vZ2xlLm1hcHMubWFwVHlwZUlkfSxzZXRWaXNpYmxlOmZ1bmN0aW9uKG4pe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gci5zZXRWaXNpYmxlKG4pLG8ucHJvbWlzZX0sY2xlYW51cDpmdW5jdGlvbigpe3I9bnVsbH19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ29vZ2xlUGxheUdhbWVcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhR29vZ2xlUGxheUdhbWVcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybnthdXRoOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBnb29nbGVwbGF5Z2FtZS5hdXRoKGZ1bmN0aW9uKGUpe3JldHVybiBuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3JldHVybiBuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sc2lnbm91dDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gZ29vZ2xlcGxheWdhbWUuc2lnbm91dChmdW5jdGlvbihlKXtyZXR1cm4gbi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyZXR1cm4gbi5yZWplY3QoZSl9KSxuLnByb21pc2V9LGlzU2lnbmVkSW46ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGdvb2dsZXBsYXlnYW1lLmlzU2lnbmVkSW4oZnVuY3Rpb24oZSl7cmV0dXJuIG4ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7cmV0dXJuIG4ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxzaG93UGxheWVyOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBnb29nbGVwbGF5Z2FtZS5zaG93UGxheWVyKGZ1bmN0aW9uKGUpe3JldHVybiBuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3JldHVybiBuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sc3VibWl0U2NvcmU6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBnb29nbGVwbGF5Z2FtZS5zdWJtaXRTY29yZShuLGZ1bmN0aW9uKGUpe3JldHVybiByLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3JldHVybiByLnJlamVjdChlKX0pLHIucHJvbWlzZX0sc2hvd0FsbExlYWRlcmJvYXJkczpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gZ29vZ2xlcGxheWdhbWUuc2hvd0FsbExlYWRlcmJvYXJkcyhmdW5jdGlvbihlKXtyZXR1cm4gbi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyZXR1cm4gbi5yZWplY3QoZSl9KSxuLnByb21pc2V9LHNob3dMZWFkZXJib2FyZDpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGdvb2dsZXBsYXlnYW1lLnNob3dMZWFkZXJib2FyZChuLGZ1bmN0aW9uKGUpe3JldHVybiByLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3JldHVybiByLnJlamVjdChlKX0pLHIucHJvbWlzZX0sdW5sb2NrQWNoaWV2ZW1lbnQ6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBnb29nbGVwbGF5Z2FtZS51bmxvY2tBY2hpZXZlbWVudChuLGZ1bmN0aW9uKGUpe3JldHVybiByLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3JldHVybiByLnJlamVjdChlKX0pLHIucHJvbWlzZX0saW5jcmVtZW50QWNoaWV2ZW1lbnQ6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBnb29nbGVwbGF5Z2FtZS5pbmNyZW1lbnRBY2hpZXZlbWVudChuLGZ1bmN0aW9uKGUpe3JldHVybiByLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3JldHVybiByLnJlamVjdChlKX0pLHIucHJvbWlzZX0sc2hvd0FjaGlldmVtZW50czpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gZ29vZ2xlcGxheWdhbWUuc2hvd0FjaGlldmVtZW50cyhmdW5jdGlvbihlKXtyZXR1cm4gbi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyZXR1cm4gbi5yZWplY3QoZSl9KSxuLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmdvb2dsZVBsdXNcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhR29vZ2xlUGx1c1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57bG9naW46ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiB2b2lkIDA9PT1yJiYocj17fSksbi5wbHVnaW5zLmdvb2dsZXBsdXMubG9naW4oe2lPU0FwaUtleTpyfSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxzaWxlbnRMb2dpbjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHZvaWQgMD09PXImJihyPXt9KSxuLnBsdWdpbnMuZ29vZ2xlcGx1cy50cnlTaWxlbnRMb2dpbih7aU9TQXBpS2V5OnJ9LGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGxvZ291dDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtuLnBsdWdpbnMuZ29vZ2xlcGx1cy5sb2dvdXQoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSl9LGRpc2Nvbm5lY3Q6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7bi5wbHVnaW5zLmdvb2dsZXBsdXMuZGlzY29ubmVjdChmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9KX0saXNBdmFpbGFibGU6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5nb29nbGVwbHVzLmlzQXZhaWxhYmxlKGZ1bmN0aW9uKGUpe2U/ci5yZXNvbHZlKGUpOnIucmVqZWN0KGUpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5oZWFsdGhLaXRcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhSGVhbHRoS2l0XCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntpc0F2YWlsYWJsZTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmhlYWx0aGtpdC5hdmFpbGFibGUoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sY2hlY2tBdXRoU3RhdHVzOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gcj1yfHxcIkhLUXVhbnRpdHlUeXBlSWRlbnRpZmllckhlaWdodFwiLG4ucGx1Z2lucy5oZWFsdGhraXQuY2hlY2tBdXRoU3RhdHVzKHt0eXBlOnJ9LGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHJlcXVlc3RBdXRob3JpemF0aW9uOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiByPXJ8fFtcIkhLQ2hhcmFjdGVyaXN0aWNUeXBlSWRlbnRpZmllckRhdGVPZkJpcnRoXCIsXCJIS1F1YW50aXR5VHlwZUlkZW50aWZpZXJBY3RpdmVFbmVyZ3lCdXJuZWRcIixcIkhLUXVhbnRpdHlUeXBlSWRlbnRpZmllckhlaWdodFwiXSxvPW98fFtcIkhLUXVhbnRpdHlUeXBlSWRlbnRpZmllckFjdGl2ZUVuZXJneUJ1cm5lZFwiLFwiSEtRdWFudGl0eVR5cGVJZGVudGlmaWVySGVpZ2h0XCIsXCJIS1F1YW50aXR5VHlwZUlkZW50aWZpZXJEaXN0YW5jZUN5Y2xpbmdcIl0sbi5wbHVnaW5zLmhlYWx0aGtpdC5yZXF1ZXN0QXV0aG9yaXphdGlvbih7cmVhZFR5cGVzOnIsd3JpdGVUeXBlczpvfSxmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSksdC5wcm9taXNlfSxyZWFkRGF0ZU9mQmlydGg6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5oZWFsdGhraXQucmVhZERhdGVPZkJpcnRoKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSksci5wcm9taXNlfSxyZWFkR2VuZGVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuaGVhbHRoa2l0LnJlYWRHZW5kZXIoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9KSxyLnByb21pc2V9LHNhdmVXZWlnaHQ6ZnVuY3Rpb24ocixvLHQpe3ZhciBpPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmhlYWx0aGtpdC5zYXZlV2VpZ2h0KHt1bml0Om98fFwibGJcIixhbW91bnQ6cixkYXRlOnR8fG5ldyBEYXRlfSxmdW5jdGlvbihlKXtpLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2kucmVzb2x2ZShlKX0pLGkucHJvbWlzZX0scmVhZFdlaWdodDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5oZWFsdGhraXQucmVhZFdlaWdodCh7dW5pdDpyfHxcImxiXCJ9LGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSksby5wcm9taXNlfSxzYXZlSGVpZ2h0OmZ1bmN0aW9uKHIsbyx0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5oZWFsdGhraXQuc2F2ZUhlaWdodCh7dW5pdDpvfHxcImluXCIsYW1vdW50OnIsZGF0ZTp0fHxuZXcgRGF0ZX0sZnVuY3Rpb24oZSl7aS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtpLnJlc29sdmUoZSl9KSxpLnByb21pc2V9LHJlYWRIZWlnaHQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuaGVhbHRoa2l0LnJlYWRIZWlnaHQoe3VuaXQ6cnx8XCJpblwifSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0pLG8ucHJvbWlzZX0sZmluZFdvcmtvdXRzOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuaGVhbHRoa2l0LmZpbmRXb3Jrb3V0cyh7fSxmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0pLHIucHJvbWlzZX0sc2F2ZVdvcmtvdXQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuaGVhbHRoa2l0LnNhdmVXb3Jrb3V0KHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9KSxvLnByb21pc2V9LHF1ZXJ5U2FtcGxlVHlwZTpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5oZWFsdGhraXQucXVlcnlTYW1wbGVUeXBlKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9KSxvLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmh0dHBkXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUh0dHBkXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57c3RhcnRTZXJ2ZXI6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuQ29ySHR0cGQuc3RhcnRTZXJ2ZXIobixmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHN0b3BTZXJ2ZXI6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5Db3JIdHRwZC5zdG9wU2VydmVyKGZ1bmN0aW9uKCl7bi5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7bi5yZWplY3QoKX0pLG4ucHJvbWlzZX0sZ2V0VVJMOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuQ29ySHR0cGQuZ2V0VVJMKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oKXtuLnJlamVjdCgpfSksbi5wcm9taXNlfSxnZXRMb2NhbFBhdGg6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5Db3JIdHRwZC5nZXRMb2NhbFBhdGgoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbigpe24ucmVqZWN0KCl9KSxuLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmlBZFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFpQWRcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3NldE9wdGlvbnM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmlBZC5zZXRPcHRpb25zKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxjcmVhdGVCYW5uZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmlBZC5jcmVhdGVCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHJlbW92ZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5pQWQucmVtb3ZlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0sc2hvd0Jhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uaUFkLnNob3dCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dCYW5uZXJBdFhZOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLmlBZC5zaG93QmFubmVyQXRYWShyLG8sZnVuY3Rpb24oKXt0LnJlc29sdmUoKX0sZnVuY3Rpb24oKXt0LnJlamVjdCgpfSksdC5wcm9taXNlfSxoaWRlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmlBZC5oaWRlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0scHJlcGFyZUludGVyc3RpdGlhbDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uaUFkLnByZXBhcmVJbnRlcnN0aXRpYWwocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dJbnRlcnN0aXRpYWw6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uaUFkLnNob3dJbnRlcnN0aXRpYWwoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5pbWFnZVBpY2tlclwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFJbWFnZVBpY2tlclwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57Z2V0UGljdHVyZXM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmltYWdlUGlja2VyLmdldFBpY3R1cmVzKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9LHIpLG8ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuaW5BcHBCcm93c2VyXCIsW10pLnByb3ZpZGVyKFwiJGNvcmRvdmFJbkFwcEJyb3dzZXJcIixbZnVuY3Rpb24oKXt2YXIgZSxuPXRoaXMuZGVmYXVsdE9wdGlvbnM9e307dGhpcy5zZXREZWZhdWx0T3B0aW9ucz1mdW5jdGlvbihlKXtuPWFuZ3VsYXIuZXh0ZW5kKG4sZSl9LHRoaXMuJGdldD1bXCIkcm9vdFNjb3BlXCIsXCIkcVwiLFwiJHdpbmRvd1wiLFwiJHRpbWVvdXRcIixmdW5jdGlvbihyLG8sdCxpKXtyZXR1cm57b3BlbjpmdW5jdGlvbihhLGMsdSl7dmFyIHM9by5kZWZlcigpO2lmKHUmJiFhbmd1bGFyLmlzT2JqZWN0KHUpKXJldHVybiBzLnJlamVjdChcIm9wdGlvbnMgbXVzdCBiZSBhbiBvYmplY3RcIikscy5wcm9taXNlO3ZhciBsPWFuZ3VsYXIuZXh0ZW5kKHt9LG4sdSksZj1bXTthbmd1bGFyLmZvckVhY2gobCxmdW5jdGlvbihlLG4pe2YucHVzaChuK1wiPVwiK2UpfSk7dmFyIGQ9Zi5qb2luKCk7cmV0dXJuIGU9dC5vcGVuKGEsYyxkKSxlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2Fkc3RhcnRcIixmdW5jdGlvbihlKXtpKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFJbkFwcEJyb3dzZXI6bG9hZHN0YXJ0XCIsZSl9KX0sITEpLGUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRzdG9wXCIsZnVuY3Rpb24oZSl7cy5yZXNvbHZlKGUpLGkoZnVuY3Rpb24oKXtyLiRicm9hZGNhc3QoXCIkY29yZG92YUluQXBwQnJvd3Nlcjpsb2Fkc3RvcFwiLGUpfSl9LCExKSxlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZXJyb3JcIixmdW5jdGlvbihlKXtzLnJlamVjdChlKSxpKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFJbkFwcEJyb3dzZXI6bG9hZGVycm9yXCIsZSl9KX0sITEpLGUuYWRkRXZlbnRMaXN0ZW5lcihcImV4aXRcIixmdW5jdGlvbihlKXtpKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFJbkFwcEJyb3dzZXI6ZXhpdFwiLGUpfSl9LCExKSxzLnByb21pc2V9LGNsb3NlOmZ1bmN0aW9uKCl7ZS5jbG9zZSgpLGU9bnVsbH0sc2hvdzpmdW5jdGlvbigpe2Uuc2hvdygpfSxleGVjdXRlU2NyaXB0OmZ1bmN0aW9uKG4pe3ZhciByPW8uZGVmZXIoKTtyZXR1cm4gZS5leGVjdXRlU2NyaXB0KG4sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSksci5wcm9taXNlfSxpbnNlcnRDU1M6ZnVuY3Rpb24obil7dmFyIHI9by5kZWZlcigpO3JldHVybiBlLmluc2VydENTUyhuLGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0pLHIucHJvbWlzZX19fV19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5pbnNvbW5pYVwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFJbnNvbW5pYVwiLFtcIiR3aW5kb3dcIixmdW5jdGlvbihlKXtyZXR1cm57a2VlcEF3YWtlOmZ1bmN0aW9uKCl7cmV0dXJuIGUucGx1Z2lucy5pbnNvbW5pYS5rZWVwQXdha2UoKX0sYWxsb3dTbGVlcEFnYWluOmZ1bmN0aW9uKCl7cmV0dXJuIGUucGx1Z2lucy5pbnNvbW5pYS5hbGxvd1NsZWVwQWdhaW4oKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuaW5zdGFncmFtXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUluc3RhZ3JhbVwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue3NoYXJlOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gd2luZG93Lkluc3RhZ3JhbT8oSW5zdGFncmFtLnNoYXJlKG4uaW1hZ2Usbi5jYXB0aW9uLGZ1bmN0aW9uKGUpe2U/ci5yZWplY3QoZSk6ci5yZXNvbHZlKCEwKX0pLHIucHJvbWlzZSk6KGNvbnNvbGUuZXJyb3IoXCJUcmllZCB0byBjYWxsIEluc3RhZ3JhbS5zaGFyZSBidXQgdGhlIEluc3RhZ3JhbSBwbHVnaW4gaXNuJ3QgaW5zdGFsbGVkIVwiKSxyLnJlc29sdmUobnVsbCksci5wcm9taXNlKX0saXNJbnN0YWxsZWQ6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIHdpbmRvdy5JbnN0YWdyYW0/KEluc3RhZ3JhbS5pc0luc3RhbGxlZChmdW5jdGlvbihlLHIpe2U/bi5yZWplY3QoZSk6bi5yZXNvbHZlKHIpfSksbi5wcm9taXNlKTooY29uc29sZS5lcnJvcihcIlRyaWVkIHRvIGNhbGwgSW5zdGFncmFtLmlzSW5zdGFsbGVkIGJ1dCB0aGUgSW5zdGFncmFtIHBsdWdpbiBpc24ndCBpbnN0YWxsZWQhXCIpLG4ucmVzb2x2ZShudWxsKSxuLnByb21pc2UpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5rZXlib2FyZFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFLZXlib2FyZFwiLFtcIiRyb290U2NvcGVcIixmdW5jdGlvbihlKXt2YXIgbj1mdW5jdGlvbigpe2UuJGV2YWxBc3luYyhmdW5jdGlvbigpe2UuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhS2V5Ym9hcmQ6c2hvd1wiKX0pfSxyPWZ1bmN0aW9uKCl7ZS4kZXZhbEFzeW5jKGZ1bmN0aW9uKCl7ZS4kYnJvYWRjYXN0KFwiJGNvcmRvdmFLZXlib2FyZDpoaWRlXCIpfSl9O3JldHVybiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZGV2aWNlcmVhZHlcIixmdW5jdGlvbigpe2NvcmRvdmEucGx1Z2lucy5LZXlib2FyZCYmKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibmF0aXZlLmtleWJvYXJkc2hvd1wiLG4sITEpLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibmF0aXZlLmtleWJvYXJkaGlkZVwiLHIsITEpKX0pLHtoaWRlQWNjZXNzb3J5QmFyOmZ1bmN0aW9uKGUpe3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKGUpfSxjbG9zZTpmdW5jdGlvbigpe3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuY2xvc2UoKX0sc2hvdzpmdW5jdGlvbigpe3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuc2hvdygpfSxkaXNhYmxlU2Nyb2xsOmZ1bmN0aW9uKGUpe3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbChlKX0saXNWaXNpYmxlOmZ1bmN0aW9uKCl7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5pc1Zpc2libGV9LGNsZWFyU2hvd1dhdGNoOmZ1bmN0aW9uKCl7ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm5hdGl2ZS5rZXlib2FyZHNob3dcIixuKSxlLiQkbGlzdGVuZXJzW1wiJGNvcmRvdmFLZXlib2FyZDpzaG93XCJdPVtdfSxjbGVhckhpZGVXYXRjaDpmdW5jdGlvbigpe2RvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJuYXRpdmUua2V5Ym9hcmRoaWRlXCIsciksZS4kJGxpc3RlbmVyc1tcIiRjb3Jkb3ZhS2V5Ym9hcmQ6aGlkZVwiXT1bXX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMua2V5Y2hhaW5cIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhS2V5Y2hhaW5cIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntnZXRGb3JLZXk6ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCksdD1uZXcgS2V5Y2hhaW47cmV0dXJuIHQuZ2V0Rm9yS2V5KG8ucmVzb2x2ZSxvLnJlamVjdCxuLHIpLG8ucHJvbWlzZX0sc2V0Rm9yS2V5OmZ1bmN0aW9uKG4scixvKXt2YXIgdD1lLmRlZmVyKCksaT1uZXcgS2V5Y2hhaW47cmV0dXJuIGkuc2V0Rm9yS2V5KHQucmVzb2x2ZSx0LnJlamVjdCxuLHIsbyksdC5wcm9taXNlfSxyZW1vdmVGb3JLZXk6ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCksdD1uZXcgS2V5Y2hhaW47cmV0dXJuIHQucmVtb3ZlRm9yS2V5KG8ucmVzb2x2ZSxvLnJlamVjdCxuLHIpLG8ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMubGF1bmNoTmF2aWdhdG9yXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUxhdW5jaE5hdmlnYXRvclwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue25hdmlnYXRlOmZ1bmN0aW9uKG4scixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIGxhdW5jaG5hdmlnYXRvci5uYXZpZ2F0ZShuLHIsZnVuY3Rpb24oKXt0LnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7dC5yZWplY3QoZSl9LG8pLHQucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMubG9jYWxOb3RpZmljYXRpb25cIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhTG9jYWxOb3RpZmljYXRpb25cIixbXCIkcVwiLFwiJHdpbmRvd1wiLFwiJHJvb3RTY29wZVwiLFwiJHRpbWVvdXRcIixmdW5jdGlvbihlLG4scixvKXtyZXR1cm4gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRldmljZXJlYWR5XCIsZnVuY3Rpb24oKXtuLmNvcmRvdmEmJm4uY29yZG92YS5wbHVnaW5zJiZuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24mJm4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbCYmKG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5vbihcInNjaGVkdWxlXCIsZnVuY3Rpb24oZSxuKXtvKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFMb2NhbE5vdGlmaWNhdGlvbjpzY2hlZHVsZVwiLGUsbil9KX0pLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5vbihcInRyaWdnZXJcIixmdW5jdGlvbihlLG4pe28oZnVuY3Rpb24oKXtyLiRicm9hZGNhc3QoXCIkY29yZG92YUxvY2FsTm90aWZpY2F0aW9uOnRyaWdnZXJcIixlLG4pfSl9KSxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwub24oXCJ1cGRhdGVcIixmdW5jdGlvbihlLG4pe28oZnVuY3Rpb24oKXtyLiRicm9hZGNhc3QoXCIkY29yZG92YUxvY2FsTm90aWZpY2F0aW9uOnVwZGF0ZVwiLGUsbil9KX0pLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5vbihcImNsZWFyXCIsZnVuY3Rpb24oZSxuKXtvKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFMb2NhbE5vdGlmaWNhdGlvbjpjbGVhclwiLGUsbil9KX0pLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5vbihcImNsZWFyYWxsXCIsZnVuY3Rpb24oZSl7byhmdW5jdGlvbigpe3IuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhTG9jYWxOb3RpZmljYXRpb246Y2xlYXJhbGxcIixlKX0pfSksbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLm9uKFwiY2FuY2VsXCIsZnVuY3Rpb24oZSxuKXtvKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFMb2NhbE5vdGlmaWNhdGlvbjpjYW5jZWxcIixlLG4pfSl9KSxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwub24oXCJjYW5jZWxhbGxcIixmdW5jdGlvbihlKXtvKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFMb2NhbE5vdGlmaWNhdGlvbjpjYW5jZWxhbGxcIixlKX0pfSksbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLm9uKFwiY2xpY2tcIixmdW5jdGlvbihlLG4pe28oZnVuY3Rpb24oKXtyLiRicm9hZGNhc3QoXCIkY29yZG92YUxvY2FsTm90aWZpY2F0aW9uOmNsaWNrXCIsZSxuKX0pfSkpfSwhMSkse3NjaGVkdWxlOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLnNjaGVkdWxlKHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxvKSx0LnByb21pc2V9LGFkZDpmdW5jdGlvbihyLG8pe2NvbnNvbGUud2FybignRGVwcmVjYXRlZDogdXNlIFwic2NoZWR1bGVcIiBpbnN0ZWFkLicpO3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbz1vfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5zY2hlZHVsZShyLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sbyksdC5wcm9taXNlfSx1cGRhdGU6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwudXBkYXRlKHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxvKSx0LnByb21pc2V9LGNsZWFyOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO1xyXG5yZXR1cm4gbz1vfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5jbGVhcihyLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sbyksdC5wcm9taXNlfSxjbGVhckFsbDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuY2xlYXJBbGwoZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxyKSxvLnByb21pc2V9LGNhbmNlbDpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbz1vfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5jYW5jZWwocixmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LG8pLHQucHJvbWlzZX0sY2FuY2VsQWxsOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gcj1yfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5jYW5jZWxBbGwoZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxyKSxvLnByb21pc2V9LGlzUHJlc2VudDpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbz1vfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5pc1ByZXNlbnQocixmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LG8pLHQucHJvbWlzZX0saXNTY2hlZHVsZWQ6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuaXNTY2hlZHVsZWQocixmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LG8pLHQucHJvbWlzZX0saXNUcmlnZ2VyZWQ6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuaXNUcmlnZ2VyZWQocixmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LG8pLHQucHJvbWlzZX0saGFzUGVybWlzc2lvbjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuaGFzUGVybWlzc2lvbihmdW5jdGlvbihlKXtlP28ucmVzb2x2ZShlKTpvLnJlamVjdChlKX0sciksby5wcm9taXNlfSxyZWdpc3RlclBlcm1pc3Npb246ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLnJlZ2lzdGVyUGVybWlzc2lvbihmdW5jdGlvbihlKXtlP28ucmVzb2x2ZShlKTpvLnJlamVjdChlKX0sciksby5wcm9taXNlfSxwcm9tcHRGb3JQZXJtaXNzaW9uOmZ1bmN0aW9uKHIpe2NvbnNvbGUud2FybignRGVwcmVjYXRlZDogdXNlIFwicmVnaXN0ZXJQZXJtaXNzaW9uXCIgaW5zdGVhZC4nKTt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwucmVnaXN0ZXJQZXJtaXNzaW9uKGZ1bmN0aW9uKGUpe2U/by5yZXNvbHZlKGUpOm8ucmVqZWN0KGUpfSxyKSxvLnByb21pc2V9LGdldEFsbElkczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuZ2V0QWxsSWRzKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sciksby5wcm9taXNlfSxnZXRJZHM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmdldElkcyhmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LHIpLG8ucHJvbWlzZX0sZ2V0U2NoZWR1bGVkSWRzOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gcj1yfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5nZXRTY2hlZHVsZWRJZHMoZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxyKSxvLnByb21pc2V9LGdldFRyaWdnZXJlZElkczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuZ2V0VHJpZ2dlcmVkSWRzKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sciksby5wcm9taXNlfSxnZXQ6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuZ2V0KHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxvKSx0LnByb21pc2V9LGdldEFsbDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuZ2V0QWxsKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sciksby5wcm9taXNlfSxnZXRTY2hlZHVsZWQ6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuZ2V0U2NoZWR1bGVkKHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxvKSx0LnByb21pc2V9LGdldEFsbFNjaGVkdWxlZDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuZ2V0QWxsU2NoZWR1bGVkKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sciksby5wcm9taXNlfSxnZXRUcmlnZ2VyZWQ6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuZ2V0VHJpZ2dlcmVkKHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxvKSx0LnByb21pc2V9LGdldEFsbFRyaWdnZXJlZDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuZ2V0QWxsVHJpZ2dlcmVkKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sciksby5wcm9taXNlfSxnZXREZWZhdWx0czpmdW5jdGlvbigpe3JldHVybiBuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuZ2V0RGVmYXVsdHMoKX0sc2V0RGVmYXVsdHM6ZnVuY3Rpb24oZSl7bi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLnNldERlZmF1bHRzKGUpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5tTWVkaWFBZHNcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhTU1lZGlhQWRzXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntzZXRPcHRpb25zOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5tTWVkaWEuc2V0T3B0aW9ucyhyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sY3JlYXRlQmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5tTWVkaWEuY3JlYXRlQmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxyZW1vdmVCYW5uZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ubU1lZGlhLnJlbW92ZUJhbm5lcihmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHNob3dCYW5uZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLm1NZWRpYS5zaG93QmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93QmFubmVyQXRYWTpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi5tTWVkaWEuc2hvd0Jhbm5lckF0WFkocixvLGZ1bmN0aW9uKCl7dC5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7dC5yZWplY3QoKX0pLHQucHJvbWlzZX0saGlkZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5tTWVkaWEuaGlkZUJhbm5lcihmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHByZXBhcmVJbnRlcnN0aXRpYWw6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLm1NZWRpYS5wcmVwYXJlSW50ZXJzdGl0aWFsKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93SW50ZXJzdGl0aWFsOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLm1NZWRpYS5zaG93SW50ZXJzdGl0aWFsKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMubWVkaWFcIixbXSkuc2VydmljZShcIk5ld01lZGlhXCIsW1wiJHFcIixcIiRpbnRlcnZhbFwiLGZ1bmN0aW9uKGUsbil7ZnVuY3Rpb24gcihlKXthbmd1bGFyLmlzRGVmaW5lZChzKXx8KHM9bihmdW5jdGlvbigpezA+ZCYmKGQ9ZS5nZXREdXJhdGlvbigpLGEmJmQ+MCYmYS5ub3RpZnkoe2R1cmF0aW9uOmR9KSksZS5nZXRDdXJyZW50UG9zaXRpb24oZnVuY3Rpb24oZSl7ZT4tMSYmKGY9ZSl9LGZ1bmN0aW9uKGUpe2NvbnNvbGUubG9nKFwiRXJyb3IgZ2V0dGluZyBwb3M9XCIrZSl9KSxhJiZhLm5vdGlmeSh7cG9zaXRpb246Zn0pfSwxZTMpKX1mdW5jdGlvbiBvKCl7YW5ndWxhci5pc0RlZmluZWQocykmJihuLmNhbmNlbChzKSxzPXZvaWQgMCl9ZnVuY3Rpb24gdCgpe2Y9LTEsZD0tMX1mdW5jdGlvbiBpKGUpe3RoaXMubWVkaWE9bmV3IE1lZGlhKGUsZnVuY3Rpb24oZSl7bygpLHQoKSxhLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28oKSx0KCksYS5yZWplY3QoZSl9LGZ1bmN0aW9uKGUpe2w9ZSxhLm5vdGlmeSh7c3RhdHVzOmx9KX0pfXZhciBhLGMsdSxzLGw9bnVsbCxmPS0xLGQ9LTE7cmV0dXJuIGkucHJvdG90eXBlLnBsYXk9ZnVuY3Rpb24obil7cmV0dXJuIGE9ZS5kZWZlcigpLFwib2JqZWN0XCIhPXR5cGVvZiBuJiYobj17fSksdGhpcy5tZWRpYS5wbGF5KG4pLHIodGhpcy5tZWRpYSksYS5wcm9taXNlfSxpLnByb3RvdHlwZS5wYXVzZT1mdW5jdGlvbigpe28oKSx0aGlzLm1lZGlhLnBhdXNlKCl9LGkucHJvdG90eXBlLnN0b3A9ZnVuY3Rpb24oKXt0aGlzLm1lZGlhLnN0b3AoKX0saS5wcm90b3R5cGUucmVsZWFzZT1mdW5jdGlvbigpe3RoaXMubWVkaWEucmVsZWFzZSgpLHRoaXMubWVkaWE9dm9pZCAwfSxpLnByb3RvdHlwZS5zZWVrVG89ZnVuY3Rpb24oZSl7dGhpcy5tZWRpYS5zZWVrVG8oZSl9LGkucHJvdG90eXBlLnNldFZvbHVtZT1mdW5jdGlvbihlKXt0aGlzLm1lZGlhLnNldFZvbHVtZShlKX0saS5wcm90b3R5cGUuc3RhcnRSZWNvcmQ9ZnVuY3Rpb24oKXt0aGlzLm1lZGlhLnN0YXJ0UmVjb3JkKCl9LGkucHJvdG90eXBlLnN0b3BSZWNvcmQ9ZnVuY3Rpb24oKXt0aGlzLm1lZGlhLnN0b3BSZWNvcmQoKX0saS5wcm90b3R5cGUuY3VycmVudFRpbWU9ZnVuY3Rpb24oKXtyZXR1cm4gYz1lLmRlZmVyKCksdGhpcy5tZWRpYS5nZXRDdXJyZW50UG9zaXRpb24oZnVuY3Rpb24oZSl7Yy5yZXNvbHZlKGUpfSksYy5wcm9taXNlfSxpLnByb3RvdHlwZS5nZXREdXJhdGlvbj1mdW5jdGlvbigpe3JldHVybiB1PWUuZGVmZXIoKSx0aGlzLm1lZGlhLmdldER1cmF0aW9uKGZ1bmN0aW9uKGUpe3UucmVzb2x2ZShlKX0pLHUucHJvbWlzZX0saX1dKS5mYWN0b3J5KFwiJGNvcmRvdmFNZWRpYVwiLFtcIk5ld01lZGlhXCIsZnVuY3Rpb24oZSl7cmV0dXJue25ld01lZGlhOmZ1bmN0aW9uKG4pe3JldHVybiBuZXcgZShuKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMubW9iZm94QWRzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YU1vYkZveEFkc1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57c2V0T3B0aW9uczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uTW9iRm94LnNldE9wdGlvbnMocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LGNyZWF0ZUJhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uTW9iRm94LmNyZWF0ZUJhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0scmVtb3ZlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLk1vYkZveC5yZW1vdmVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxzaG93QmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb2JGb3guc2hvd0Jhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0Jhbm5lckF0WFk6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4uTW9iRm94LnNob3dCYW5uZXJBdFhZKHIsbyxmdW5jdGlvbigpe3QucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3QucmVqZWN0KCl9KSx0LnByb21pc2V9LGhpZGVCYW5uZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uTW9iRm94LmhpZGVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxwcmVwYXJlSW50ZXJzdGl0aWFsOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb2JGb3gucHJlcGFyZUludGVyc3RpdGlhbChyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0ludGVyc3RpdGlhbDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb2JGb3guc2hvd0ludGVyc3RpdGlhbChmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zXCIsW1wibmdDb3Jkb3ZhLnBsdWdpbnMuM2R0b3VjaFwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuYWN0aW9uU2hlZXRcIixcIm5nQ29yZG92YS5wbHVnaW5zLmFkTW9iXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5hcHBBdmFpbGFiaWxpdHlcIixcIm5nQ29yZG92YS5wbHVnaW5zLmFwcFJhdGVcIixcIm5nQ29yZG92YS5wbHVnaW5zLmFwcFZlcnNpb25cIixcIm5nQ29yZG92YS5wbHVnaW5zLmJhY2tncm91bmRHZW9sb2NhdGlvblwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuYmFkZ2VcIixcIm5nQ29yZG92YS5wbHVnaW5zLmJhcmNvZGVTY2FubmVyXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5iYXR0ZXJ5U3RhdHVzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5iZWFjb25cIixcIm5nQ29yZG92YS5wbHVnaW5zLmJsZVwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuYmx1ZXRvb3RoU2VyaWFsXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5icmlnaHRuZXNzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5jYWxlbmRhclwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuY2FtZXJhXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5jYXB0dXJlXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5jbGlwYm9hcmRcIixcIm5nQ29yZG92YS5wbHVnaW5zLmNvbnRhY3RzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5kYXRlUGlja2VyXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5kZXZpY2VcIixcIm5nQ29yZG92YS5wbHVnaW5zLmRldmljZU1vdGlvblwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZGV2aWNlT3JpZW50YXRpb25cIixcIm5nQ29yZG92YS5wbHVnaW5zLmRpYWxvZ3NcIixcIm5nQ29yZG92YS5wbHVnaW5zLmVtYWlsQ29tcG9zZXJcIixcIm5nQ29yZG92YS5wbHVnaW5zLmZhY2Vib29rXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5mYWNlYm9va0Fkc1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmlsZVwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmlsZVRyYW5zZmVyXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5maWxlT3BlbmVyMlwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmxhc2hsaWdodFwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmx1cnJ5QWRzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5nYVwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ2VvbG9jYXRpb25cIixcIm5nQ29yZG92YS5wbHVnaW5zLmdsb2JhbGl6YXRpb25cIixcIm5nQ29yZG92YS5wbHVnaW5zLmdvb2dsZUFkc1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ29vZ2xlQW5hbHl0aWNzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5nb29nbGVNYXBcIixcIm5nQ29yZG92YS5wbHVnaW5zLmdvb2dsZVBsYXlHYW1lXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5nb29nbGVQbHVzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5oZWFsdGhLaXRcIixcIm5nQ29yZG92YS5wbHVnaW5zLmh0dHBkXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5pQWRcIixcIm5nQ29yZG92YS5wbHVnaW5zLmltYWdlUGlja2VyXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5pbkFwcEJyb3dzZXJcIixcIm5nQ29yZG92YS5wbHVnaW5zLmluc3RhZ3JhbVwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMua2V5Ym9hcmRcIixcIm5nQ29yZG92YS5wbHVnaW5zLmtleWNoYWluXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5sYXVuY2hOYXZpZ2F0b3JcIixcIm5nQ29yZG92YS5wbHVnaW5zLmxvY2FsTm90aWZpY2F0aW9uXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5tZWRpYVwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMubU1lZGlhQWRzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5tb2Jmb3hBZHNcIixcIm5nQ29yZG92YS5wbHVnaW5zLm1vcHViQWRzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5uYXRpdmVBdWRpb1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMubmV0d29ya1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMucGluRGlhbG9nXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5wcmVmZXJlbmNlc1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMucHJpbnRlclwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMucHJvZ3Jlc3NJbmRpY2F0b3JcIixcIm5nQ29yZG92YS5wbHVnaW5zLnB1c2hcIixcIm5nQ29yZG92YS5wbHVnaW5zLnB1c2hfdjVcIixcIm5nQ29yZG92YS5wbHVnaW5zLnNtc1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuc29jaWFsU2hhcmluZ1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuc3Bpbm5lckRpYWxvZ1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuc3BsYXNoc2NyZWVuXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5zcWxpdGVcIixcIm5nQ29yZG92YS5wbHVnaW5zLnN0YXR1c2JhclwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMudG9hc3RcIixcIm5nQ29yZG92YS5wbHVnaW5zLnRvdWNoaWRcIixcIm5nQ29yZG92YS5wbHVnaW5zLnZpYnJhdGlvblwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMudmlkZW9DYXB0dXJlUGx1c1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuemlwXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5pbnNvbW5pYVwiXSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5tb3B1YkFkc1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFNb1B1YkFkc1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57c2V0T3B0aW9uczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uTW9QdWIuc2V0T3B0aW9ucyhyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sY3JlYXRlQmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb1B1Yi5jcmVhdGVCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHJlbW92ZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb1B1Yi5yZW1vdmVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxzaG93QmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb1B1Yi5zaG93QmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93QmFubmVyQXRYWTpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi5Nb1B1Yi5zaG93QmFubmVyQXRYWShyLG8sZnVuY3Rpb24oKXt0LnJlc29sdmUoKX0sZnVuY3Rpb24oKXt0LnJlamVjdCgpfSksdC5wcm9taXNlfSxoaWRlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLk1vUHViLmhpZGVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxwcmVwYXJlSW50ZXJzdGl0aWFsOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb1B1Yi5wcmVwYXJlSW50ZXJzdGl0aWFsKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93SW50ZXJzdGl0aWFsOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLk1vUHViLnNob3dJbnRlcnN0aXRpYWwoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5uYXRpdmVBdWRpb1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFOYXRpdmVBdWRpb1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57cHJlbG9hZFNpbXBsZTpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLk5hdGl2ZUF1ZGlvLnByZWxvYWRTaW1wbGUocixvLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7dC5yZWplY3QoZSl9KSx0LnByb21pc2V9LHByZWxvYWRDb21wbGV4OmZ1bmN0aW9uKHIsbyx0LGksYSl7dmFyIGM9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuTmF0aXZlQXVkaW8ucHJlbG9hZENvbXBsZXgocixvLHQsaSxhLGZ1bmN0aW9uKGUpe2MucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7Yy5yZWplY3QoZSl9KSxjLnByb21pc2V9LHBsYXk6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5OYXRpdmVBdWRpby5wbGF5KHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0sbyksdC5wcm9taXNlfSxzdG9wOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLk5hdGl2ZUF1ZGlvLnN0b3AocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxsb29wOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLk5hdGl2ZUF1ZGlvLmxvb3AocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSx1bmxvYWQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuTmF0aXZlQXVkaW8udW5sb2FkKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sc2V0Vm9sdW1lRm9yQ29tcGxleEFzc2V0OmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuTmF0aXZlQXVkaW8uc2V0Vm9sdW1lRm9yQ29tcGxleEFzc2V0KHIsbyxmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSksdC5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5uZXR3b3JrXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YU5ldHdvcmtcIixbXCIkcm9vdFNjb3BlXCIsXCIkdGltZW91dFwiLGZ1bmN0aW9uKGUsbil7dmFyIHI9ZnVuY3Rpb24oKXt2YXIgcj1uYXZpZ2F0b3IuY29ubmVjdGlvbi50eXBlO24oZnVuY3Rpb24oKXtlLiRicm9hZGNhc3QoXCIkY29yZG92YU5ldHdvcms6b2ZmbGluZVwiLHIpfSl9LG89ZnVuY3Rpb24oKXt2YXIgcj1uYXZpZ2F0b3IuY29ubmVjdGlvbi50eXBlO24oZnVuY3Rpb24oKXtlLiRicm9hZGNhc3QoXCIkY29yZG92YU5ldHdvcms6b25saW5lXCIscil9KX07cmV0dXJuIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkZXZpY2VyZWFkeVwiLGZ1bmN0aW9uKCl7bmF2aWdhdG9yLmNvbm5lY3Rpb24mJihkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwib2ZmbGluZVwiLHIsITEpLGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJvbmxpbmVcIixvLCExKSl9KSx7Z2V0TmV0d29yazpmdW5jdGlvbigpe3JldHVybiBuYXZpZ2F0b3IuY29ubmVjdGlvbi50eXBlfSxpc09ubGluZTpmdW5jdGlvbigpe3ZhciBlPW5hdmlnYXRvci5jb25uZWN0aW9uLnR5cGU7cmV0dXJuIGUhPT1Db25uZWN0aW9uLlVOS05PV04mJmUhPT1Db25uZWN0aW9uLk5PTkV9LGlzT2ZmbGluZTpmdW5jdGlvbigpe3ZhciBlPW5hdmlnYXRvci5jb25uZWN0aW9uLnR5cGU7cmV0dXJuIGU9PT1Db25uZWN0aW9uLlVOS05PV058fGU9PT1Db25uZWN0aW9uLk5PTkV9LGNsZWFyT2ZmbGluZVdhdGNoOmZ1bmN0aW9uKCl7ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm9mZmxpbmVcIixyKSxlLiQkbGlzdGVuZXJzW1wiJGNvcmRvdmFOZXR3b3JrOm9mZmxpbmVcIl09W119LGNsZWFyT25saW5lV2F0Y2g6ZnVuY3Rpb24oKXtkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwib25saW5lXCIsbyksZS4kJGxpc3RlbmVyc1tcIiRjb3Jkb3ZhTmV0d29yazpvbmxpbmVcIl09W119fX1dKS5ydW4oW1wiJGluamVjdG9yXCIsZnVuY3Rpb24oZSl7ZS5nZXQoXCIkY29yZG92YU5ldHdvcmtcIil9XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5waW5EaWFsb2dcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhUGluRGlhbG9nXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntwcm9tcHQ6ZnVuY3Rpb24ocixvLHQpe3ZhciBpPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnBpbkRpYWxvZy5wcm9tcHQocixmdW5jdGlvbihlKXtpLnJlc29sdmUoZSl9LG8sdCksaS5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5wcmVmZXJlbmNlc1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFQcmVmZXJlbmNlc1wiLFtcIiR3aW5kb3dcIixcIiRxXCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57cGx1Z2luTm90RW5hYmxlZE1lc3NhZ2U6XCJQbHVnaW4gbm90IGVuYWJsZWRcIixkZWNvcmF0ZVByb21pc2U6ZnVuY3Rpb24oZSl7ZS5zdWNjZXNzPWZ1bmN0aW9uKG4pe3JldHVybiBlLnRoZW4obiksZX0sZS5lcnJvcj1mdW5jdGlvbihuKXtyZXR1cm4gZS50aGVuKG51bGwsbiksZX19LHN0b3JlOmZ1bmN0aW9uKHIsbyx0KXtmdW5jdGlvbiBpKGUpe2MucmVzb2x2ZShlKX1mdW5jdGlvbiBhKGUpe2MucmVqZWN0KG5ldyBFcnJvcihlKSl9dmFyIGM9bi5kZWZlcigpLHU9Yy5wcm9taXNlO2lmKGUucGx1Z2lucyl7dmFyIHM7cz0zPT09YXJndW1lbnRzLmxlbmd0aD9lLnBsdWdpbnMuYXBwUHJlZmVyZW5jZXMuc3RvcmUodCxyLG8pOmUucGx1Z2lucy5hcHBQcmVmZXJlbmNlcy5zdG9yZShyLG8pLHMudGhlbihpLGEpfWVsc2UgYy5yZWplY3QobmV3IEVycm9yKHRoaXMucGx1Z2luTm90RW5hYmxlZE1lc3NhZ2UpKTtyZXR1cm4gdGhpcy5kZWNvcmF0ZVByb21pc2UodSksdX0sZmV0Y2g6ZnVuY3Rpb24ocixvKXtmdW5jdGlvbiB0KGUpe2EucmVzb2x2ZShlKX1mdW5jdGlvbiBpKGUpe2EucmVqZWN0KG5ldyBFcnJvcihlKSl9dmFyIGE9bi5kZWZlcigpLGM9YS5wcm9taXNlO2lmKGUucGx1Z2lucyl7dmFyIHU7dT0yPT09YXJndW1lbnRzLmxlbmd0aD9lLnBsdWdpbnMuYXBwUHJlZmVyZW5jZXMuZmV0Y2gobyxyKTplLnBsdWdpbnMuYXBwUHJlZmVyZW5jZXMuZmV0Y2gociksdS50aGVuKHQsaSl9ZWxzZSBhLnJlamVjdChuZXcgRXJyb3IodGhpcy5wbHVnaW5Ob3RFbmFibGVkTWVzc2FnZSkpO3JldHVybiB0aGlzLmRlY29yYXRlUHJvbWlzZShjKSxjfSxyZW1vdmU6ZnVuY3Rpb24ocixvKXtmdW5jdGlvbiB0KGUpe2EucmVzb2x2ZShlKX1mdW5jdGlvbiBpKGUpe2EucmVqZWN0KG5ldyBFcnJvcihlKSl9dmFyIGE9bi5kZWZlcigpLGM9YS5wcm9taXNlO2lmKGUucGx1Z2lucyl7dmFyIHU7dT0yPT09YXJndW1lbnRzLmxlbmd0aD9lLnBsdWdpbnMuYXBwUHJlZmVyZW5jZXMucmVtb3ZlKG8scik6ZS5wbHVnaW5zLmFwcFByZWZlcmVuY2VzLnJlbW92ZShyKSx1LnRoZW4odCxpKX1lbHNlIGEucmVqZWN0KG5ldyBFcnJvcih0aGlzLnBsdWdpbk5vdEVuYWJsZWRNZXNzYWdlKSk7cmV0dXJuIHRoaXMuZGVjb3JhdGVQcm9taXNlKGMpLGN9LHNob3c6ZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUpe3QucmVzb2x2ZShlKX1mdW5jdGlvbiBvKGUpe3QucmVqZWN0KG5ldyBFcnJvcihlKSl9dmFyIHQ9bi5kZWZlcigpLGk9dC5wcm9taXNlO3JldHVybiBlLnBsdWdpbnM/ZS5wbHVnaW5zLmFwcFByZWZlcmVuY2VzLnNob3coKS50aGVuKHIsbyk6dC5yZWplY3QobmV3IEVycm9yKHRoaXMucGx1Z2luTm90RW5hYmxlZE1lc3NhZ2UpKSx0aGlzLmRlY29yYXRlUHJvbWlzZShpKSxpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5wcmludGVyXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVByaW50ZXJcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2lzQXZhaWxhYmxlOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbi5wcmludGVyLmlzQXZhaWxhYmxlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0pLHIucHJvbWlzZX0scHJpbnQ6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2luLnByaW50ZXIucHJpbnQocixvLGZ1bmN0aW9uKCl7dC5yZXNvbHZlKCl9KSx0LnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnByb2dyZXNzSW5kaWNhdG9yXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVByb2dyZXNzXCIsW2Z1bmN0aW9uKCl7cmV0dXJue3Nob3c6ZnVuY3Rpb24oZSl7dmFyIG49ZXx8XCJQbGVhc2Ugd2FpdC4uLlwiO3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93KG4pfSxzaG93U2ltcGxlOmZ1bmN0aW9uKGUpe3ZhciBuPWV8fCExO3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93U2ltcGxlKG4pfSxzaG93U2ltcGxlV2l0aExhYmVsOmZ1bmN0aW9uKGUsbil7dmFyIHI9ZXx8ITEsbz1ufHxcIkxvYWRpbmcuLi5cIjtyZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3Iuc2hvd1NpbXBsZVdpdGhMYWJlbChyLG8pfSxzaG93U2ltcGxlV2l0aExhYmVsRGV0YWlsOmZ1bmN0aW9uKGUsbixyKXt2YXIgbz1lfHwhMSx0PW58fFwiTG9hZGluZy4uLlwiLGk9cnx8XCJQbGVhc2Ugd2FpdFwiO3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93U2ltcGxlV2l0aExhYmVsRGV0YWlsKG8sdCxpKX0sc2hvd0RldGVybWluYXRlOmZ1bmN0aW9uKGUsbil7dmFyIHI9ZXx8ITEsbz1ufHw1ZTQ7cmV0dXJuIFByb2dyZXNzSW5kaWNhdG9yLnNob3dEZXRlcm1pbmF0ZShyLG8pfSxzaG93RGV0ZXJtaW5hdGVXaXRoTGFiZWw6ZnVuY3Rpb24oZSxuLHIpe3ZhciBvPWV8fCExLHQ9bnx8NWU0LGk9cnx8XCJMb2FkaW5nLi4uXCI7cmV0dXJuIFByb2dyZXNzSW5kaWNhdG9yLnNob3dEZXRlcm1pbmF0ZVdpdGhMYWJlbChvLHQsaSl9LHNob3dBbm51bGFyOmZ1bmN0aW9uKGUsbil7dmFyIHI9ZXx8ITEsbz1ufHw1ZTQ7cmV0dXJuIFByb2dyZXNzSW5kaWNhdG9yLnNob3dBbm51bGFyKHIsbyl9LHNob3dBbm51bGFyV2l0aExhYmVsOmZ1bmN0aW9uKGUsbixyKXt2YXIgbz1lfHwhMSx0PW58fDVlNCxpPXJ8fFwiTG9hZGluZy4uLlwiO3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93QW5udWxhcldpdGhMYWJlbChvLHQsaSl9LHNob3dCYXI6ZnVuY3Rpb24oZSxuKXt2YXIgcj1lfHwhMSxvPW58fDVlNDtyZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3Iuc2hvd0JhcihyLG8pfSxzaG93QmFyV2l0aExhYmVsOmZ1bmN0aW9uKGUsbixyKXt2YXIgbz1lfHwhMSx0PW58fDVlNCxpPXJ8fFwiTG9hZGluZy4uLlwiO3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93QmFyV2l0aExhYmVsKG8sdCxpKX0sc2hvd1N1Y2Nlc3M6ZnVuY3Rpb24oZSxuKXt2YXIgcj1lfHwhMSxvPW58fFwiU3VjY2Vzc1wiO3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93U3VjY2VzcyhyLG8pfSxzaG93VGV4dDpmdW5jdGlvbihlLG4scil7dmFyIG89ZXx8ITEsdD1ufHxcIldhcm5pbmdcIixpPXJ8fFwiY2VudGVyXCI7cmV0dXJuIFByb2dyZXNzSW5kaWNhdG9yLnNob3dUZXh0KG8sdCxpKX0saGlkZTpmdW5jdGlvbigpe3JldHVybiBQcm9ncmVzc0luZGljYXRvci5oaWRlKCl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnB1c2hcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhUHVzaFwiLFtcIiRxXCIsXCIkd2luZG93XCIsXCIkcm9vdFNjb3BlXCIsXCIkdGltZW91dFwiLGZ1bmN0aW9uKGUsbixyLG8pe3JldHVybntvbk5vdGlmaWNhdGlvbjpmdW5jdGlvbihlKXtvKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFQdXNoOm5vdGlmaWNhdGlvblJlY2VpdmVkXCIsZSl9KX0scmVnaXN0ZXI6ZnVuY3Rpb24ocil7dmFyIG8sdD1lLmRlZmVyKCk7cmV0dXJuIHZvaWQgMCE9PXImJnZvaWQgMD09PXIuZWNiJiYobz1udWxsPT09ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltuZy1hcHBdXCIpP1wiZG9jdW1lbnQuYm9keVwiOlwiZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW25nLWFwcF0nKVwiLHIuZWNiPVwiYW5ndWxhci5lbGVtZW50KFwiK28rXCIpLmluamVjdG9yKCkuZ2V0KCckY29yZG92YVB1c2gnKS5vbk5vdGlmaWNhdGlvblwiKSxuLnBsdWdpbnMucHVzaE5vdGlmaWNhdGlvbi5yZWdpc3RlcihmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSxyKSx0LnByb21pc2V9LHVucmVnaXN0ZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMucHVzaE5vdGlmaWNhdGlvbi51bnJlZ2lzdGVyKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9LHIpLG8ucHJvbWlzZX0sc2V0QmFkZ2VOdW1iZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMucHVzaE5vdGlmaWNhdGlvbi5zZXRBcHBsaWNhdGlvbkljb25CYWRnZU51bWJlcihmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSxyKSxvLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnB1c2hfdjVcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhUHVzaFY1XCIsW1wiJHFcIixcIiRyb290U2NvcGVcIixcIiR0aW1lb3V0XCIsZnVuY3Rpb24oZSxuLHIpe3ZhciBvO3JldHVybntpbml0aWFsaXplOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbz1QdXNoTm90aWZpY2F0aW9uLmluaXQobiksci5yZXNvbHZlKG8pLHIucHJvbWlzZX0sb25Ob3RpZmljYXRpb246ZnVuY3Rpb24oKXtyKGZ1bmN0aW9uKCl7by5vbihcIm5vdGlmaWNhdGlvblwiLGZ1bmN0aW9uKGUpe24uJGVtaXQoXCIkY29yZG92YVB1c2hWNTpub3RpZmljYXRpb25SZWNlaXZlZFwiLGUpfSl9KX0sb25FcnJvcjpmdW5jdGlvbigpe3IoZnVuY3Rpb24oKXtvLm9uKFwiZXJyb3JcIixmdW5jdGlvbihlKXtuLiRlbWl0KFwiJGNvcmRvdmFQdXNoVjU6ZXJyb3JPY2N1cnJlZFwiLGUpfSl9KX0scmVnaXN0ZXI6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIHZvaWQgMD09PW8/bi5yZWplY3QobmV3IEVycm9yKFwiaW5pdCBtdXN0IGJlIGNhbGxlZCBiZWZvcmUgYW55IG90aGVyIG9wZXJhdGlvblwiKSk6by5vbihcInJlZ2lzdHJhdGlvblwiLGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlLnJlZ2lzdHJhdGlvbklkKX0pLG4ucHJvbWlzZX0sdW5yZWdpc3RlcjpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gdm9pZCAwPT09bz9uLnJlamVjdChuZXcgRXJyb3IoXCJpbml0IG11c3QgYmUgY2FsbGVkIGJlZm9yZSBhbnkgb3RoZXIgb3BlcmF0aW9uXCIpKTpvLnVucmVnaXN0ZXIoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sZ2V0QmFkZ2VOdW1iZXI6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIHZvaWQgMD09PW8/bi5yZWplY3QobmV3IEVycm9yKFwiaW5pdCBtdXN0IGJlIGNhbGxlZCBiZWZvcmUgYW55IG90aGVyIG9wZXJhdGlvblwiKSk6by5nZXRBcHBsaWNhdGlvbkljb25CYWRnZU51bWJlcihmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxzZXRCYWRnZU51bWJlcjpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIHZvaWQgMD09PW8/ci5yZWplY3QobmV3IEVycm9yKFwiaW5pdCBtdXN0IGJlIGNhbGxlZCBiZWZvcmUgYW55IG90aGVyIG9wZXJhdGlvblwiKSk6by5zZXRBcHBsaWNhdGlvbkljb25CYWRnZU51bWJlcihmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKSxyLnByb21pc2V9LGZpbmlzaDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gdm9pZCAwPT09bz9uLnJlamVjdChuZXcgRXJyb3IoXCJpbml0IG11c3QgYmUgY2FsbGVkIGJlZm9yZSBhbnkgb3RoZXIgb3BlcmF0aW9uXCIpKTpvLmZpbmlzaChmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5yZWNlbnRzQ29udHJvbFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFSZWNlbnRzXCIsZnVuY3Rpb24oKXtyZXR1cm57c2V0Q29sb3I6ZnVuY3Rpb24oZSl7cmV0dXJuIFJlY2VudHNDb250cm9sLnNldENvbG9yKGUpfSxzZXREZXNjcmlwdGlvbjpmdW5jdGlvbihlKXtyZXR1cm4gUmVjZW50c0NvbnRyb2wuc2V0RGVzY3JpcHRpb24oZSl9LHNldE9wdGlvbnM6ZnVuY3Rpb24oZSxuKXtyZXR1cm4gUmVjZW50c0NvbnRyb2wuc2V0T3B0aW9ucyhlLG4pfX19KSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnNjcmVlbnNob3RcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhU2NyZWVuc2hvdFwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2NhcHR1cmVUb0ZpbGU6ZnVuY3Rpb24obil7dmFyIHI9bnx8e30sbz1yLmV4dGVuc2lvbnx8XCJqcGdcIix0PXIucXVhbGl0eXx8XCIxMDBcIixpPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLnNjcmVlbnNob3Q/KG5hdmlnYXRvci5zY3JlZW5zaG90LnNhdmUoZnVuY3Rpb24oZSxuKXtlP2kucmVqZWN0KGUpOmkucmVzb2x2ZShuLmZpbGVQYXRoKX0sbyx0LHIuZmlsZW5hbWUpLGkucHJvbWlzZSk6KGkucmVzb2x2ZShudWxsKSxpLnByb21pc2UpfSxjYXB0dXJlVG9Vcmk6ZnVuY3Rpb24obil7dmFyIHI9bnx8e30sbz1yLmV4dGVuc2lvbnx8XCJqcGdcIix0PXIucXVhbGl0eXx8XCIxMDBcIixpPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLnNjcmVlbnNob3Q/KG5hdmlnYXRvci5zY3JlZW5zaG90LlVSSShmdW5jdGlvbihlLG4pe2U/aS5yZWplY3QoZSk6aS5yZXNvbHZlKG4uVVJJKX0sbyx0LHIuZmlsZW5hbWUpLGkucHJvbWlzZSk6KGkucmVzb2x2ZShudWxsKSxpLnByb21pc2UpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5zZXJpYWxcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhU2VyaWFsXCIsW1wiJHFcIixmdW5jdGlvbihlKXt2YXIgbj17fTtyZXR1cm4gbi5yZXF1ZXN0UGVybWlzc2lvbj1mdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIHNlcmlhbC5yZXF1ZXN0UGVybWlzc2lvbihuLGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxuLm9wZW49ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBzZXJpYWwub3BlbihuLGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxuLndyaXRlPWZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gc2VyaWFsLndyaXRlKG4sZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LG4ud3JpdGVIZXg9ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBzZXJpYWwud3JpdGVIZXgobixmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sbi5yZWFkPWZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBzZXJpYWwucmVhZChmdW5jdGlvbihlKXt2YXIgcj1uZXcgVWludDhBcnJheShlKTtuLnJlc29sdmUocil9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxuLnJlZ2lzdGVyUmVhZENhbGxiYWNrPWZ1bmN0aW9uKGUsbil7c2VyaWFsLnJlZ2lzdGVyUmVhZENhbGxiYWNrKGZ1bmN0aW9uKG4pe3ZhciByPW5ldyBVaW50OEFycmF5KG4pO2Uocil9LG4pfSxuLmNsb3NlPWZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBzZXJpYWwuY2xvc2UoZnVuY3Rpb24oKXtuLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9LG59XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5zbXNcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhU21zXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57c2VuZDpmdW5jdGlvbihuLHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBzbXMuc2VuZChuLHIsbyxmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSksdC5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5zb2NpYWxTaGFyaW5nXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVNvY2lhbFNoYXJpbmdcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3NoYXJlOmZ1bmN0aW9uKHIsbyx0LGkpe3ZhciBhPWUuZGVmZXIoKTtyZXR1cm4gbz1vfHxudWxsLHQ9dHx8bnVsbCxpPWl8fG51bGwsbi5wbHVnaW5zLnNvY2lhbHNoYXJpbmcuc2hhcmUocixvLHQsaSxmdW5jdGlvbigpe2EucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKCl7YS5yZWplY3QoITEpfSksYS5wcm9taXNlfSxzaGFyZVdpdGhPcHRpb25zOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnNvY2lhbHNoYXJpbmcuc2hhcmVXaXRoT3B0aW9ucyhyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCEwKX0sZnVuY3Rpb24oKXtvLnJlamVjdCghMSl9KSxvLnByb21pc2V9LHNoYXJlVmlhVHdpdHRlcjpmdW5jdGlvbihyLG8sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsdD10fHxudWxsLG4ucGx1Z2lucy5zb2NpYWxzaGFyaW5nLnNoYXJlVmlhVHdpdHRlcihyLG8sdCxmdW5jdGlvbigpe2kucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKCl7aS5yZWplY3QoITEpfSksaS5wcm9taXNlfSxzaGFyZVZpYVdoYXRzQXBwOmZ1bmN0aW9uKHIsbyx0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCx0PXR8fG51bGwsbi5wbHVnaW5zLnNvY2lhbHNoYXJpbmcuc2hhcmVWaWFXaGF0c0FwcChyLG8sdCxmdW5jdGlvbigpe2kucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKCl7aS5yZWplY3QoITEpfSksaS5wcm9taXNlfSxzaGFyZVZpYUZhY2Vib29rOmZ1bmN0aW9uKHIsbyx0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxvPW98fG51bGwsdD10fHxudWxsLG4ucGx1Z2lucy5zb2NpYWxzaGFyaW5nLnNoYXJlVmlhRmFjZWJvb2socixvLHQsZnVuY3Rpb24oKXtpLnJlc29sdmUoITApfSxmdW5jdGlvbigpe2kucmVqZWN0KCExKX0pLGkucHJvbWlzZX0sc2hhcmVWaWFGYWNlYm9va1dpdGhQYXN0ZU1lc3NhZ2VIaW50OmZ1bmN0aW9uKHIsbyx0LGkpe3ZhciBhPWUuZGVmZXIoKTtyZXR1cm4gbz1vfHxudWxsLHQ9dHx8bnVsbCxuLnBsdWdpbnMuc29jaWFsc2hhcmluZy5zaGFyZVZpYUZhY2Vib29rV2l0aFBhc3RlTWVzc2FnZUhpbnQocixvLHQsaSxmdW5jdGlvbigpe2EucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKCl7YS5yZWplY3QoITEpfSksYS5wcm9taXNlfSxzaGFyZVZpYVNNUzpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnNvY2lhbHNoYXJpbmcuc2hhcmVWaWFTTVMocixvLGZ1bmN0aW9uKCl7dC5yZXNvbHZlKCEwKX0sZnVuY3Rpb24oKXt0LnJlamVjdCghMSl9KSx0LnByb21pc2V9LHNoYXJlVmlhRW1haWw6ZnVuY3Rpb24ocixvLHQsaSxhLGMpe3ZhciB1PWUuZGVmZXIoKTtyZXR1cm4gdD10fHxudWxsLGk9aXx8bnVsbCxhPWF8fG51bGwsYz1jfHxudWxsLG4ucGx1Z2lucy5zb2NpYWxzaGFyaW5nLnNoYXJlVmlhRW1haWwocixvLHQsaSxhLGMsZnVuY3Rpb24oKXt1LnJlc29sdmUoITApfSxmdW5jdGlvbigpe3UucmVqZWN0KCExKX0pLHUucHJvbWlzZX0sc2hhcmVWaWE6ZnVuY3Rpb24ocixvLHQsaSxhKXt2YXIgYz1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCx0PXR8fG51bGwsaT1pfHxudWxsLGE9YXx8bnVsbCxuLnBsdWdpbnMuc29jaWFsc2hhcmluZy5zaGFyZVZpYShyLG8sdCxpLGEsZnVuY3Rpb24oKXtjLnJlc29sdmUoITApfSxmdW5jdGlvbigpe2MucmVqZWN0KCExKX0pLGMucHJvbWlzZX0sY2FuU2hhcmVWaWFFbWFpbDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnNvY2lhbHNoYXJpbmcuY2FuU2hhcmVWaWFFbWFpbChmdW5jdGlvbigpe3IucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoITEpfSksci5wcm9taXNlfSxjYW5TaGFyZVZpYTpmdW5jdGlvbihyLG8sdCxpLGEpe3ZhciBjPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnNvY2lhbHNoYXJpbmcuY2FuU2hhcmVWaWEocixvLHQsaSxhLGZ1bmN0aW9uKGUpe2MucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7Yy5yZWplY3QoZSl9KSxjLnByb21pc2V9LGF2YWlsYWJsZTpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gd2luZG93LnBsdWdpbnMuc29jaWFsc2hhcmluZy5hdmFpbGFibGUoZnVuY3Rpb24oZSl7ZT9uLnJlc29sdmUoKTpuLnJlamVjdCgpfSksbi5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5zcGlubmVyRGlhbG9nXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVNwaW5uZXJEaWFsb2dcIixbXCIkd2luZG93XCIsZnVuY3Rpb24oZSl7cmV0dXJue3Nob3c6ZnVuY3Rpb24obixyLG8sdCl7cmV0dXJuIG89b3x8ITEsZS5wbHVnaW5zLnNwaW5uZXJEaWFsb2cuc2hvdyhuLHIsbyx0KX0saGlkZTpmdW5jdGlvbigpe3JldHVybiBlLnBsdWdpbnMuc3Bpbm5lckRpYWxvZy5oaWRlKCl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnNwbGFzaHNjcmVlblwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFTcGxhc2hzY3JlZW5cIixbZnVuY3Rpb24oKXtyZXR1cm57aGlkZTpmdW5jdGlvbigpe3JldHVybiBuYXZpZ2F0b3Iuc3BsYXNoc2NyZWVuLmhpZGUoKX0sc2hvdzpmdW5jdGlvbigpe3JldHVybiBuYXZpZ2F0b3Iuc3BsYXNoc2NyZWVuLnNob3coKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuc3FsaXRlXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVNRTGl0ZVwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57b3BlbkRCOmZ1bmN0aW9uKGUscil7cmV0dXJuIGFuZ3VsYXIuaXNPYmplY3QoZSkmJiFhbmd1bGFyLmlzU3RyaW5nKGUpPyhcInVuZGVmaW5lZFwiIT10eXBlb2YgciYmKGUuYmdUeXBlPXIpLG4uc3FsaXRlUGx1Z2luLm9wZW5EYXRhYmFzZShlKSk6bi5zcWxpdGVQbHVnaW4ub3BlbkRhdGFiYXNlKHtuYW1lOmUsYmdUeXBlOnJ9KX0sZXhlY3V0ZTpmdW5jdGlvbihuLHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLnRyYW5zYWN0aW9uKGZ1bmN0aW9uKGUpe2UuZXhlY3V0ZVNxbChyLG8sZnVuY3Rpb24oZSxuKXt0LnJlc29sdmUobil9LGZ1bmN0aW9uKGUsbil7dC5yZWplY3Qobil9KX0pLHQucHJvbWlzZX0saW5zZXJ0Q29sbGVjdGlvbjpmdW5jdGlvbihuLHIsbyl7dmFyIHQ9ZS5kZWZlcigpLGk9by5zbGljZSgwKTtyZXR1cm4gbi50cmFuc2FjdGlvbihmdW5jdGlvbihlKXshZnVuY3Rpb24gbigpe3ZhciBvPWkuc3BsaWNlKDAsMSlbMF07dHJ5e2UuZXhlY3V0ZVNxbChyLG8sZnVuY3Rpb24oZSxyKXswPT09aS5sZW5ndGg/dC5yZXNvbHZlKHIpOm4oKX0sZnVuY3Rpb24oZSxuKXt0LnJlamVjdChuKX0pfWNhdGNoKGEpe3QucmVqZWN0KGEpfX0oKX0pLHQucHJvbWlzZX0sbmVzdGVkRXhlY3V0ZTpmdW5jdGlvbihuLHIsbyx0LGkpe3ZhciBhPWUuZGVmZXIoKTtyZXR1cm4gbi50cmFuc2FjdGlvbihmdW5jdGlvbihlKXtlLmV4ZWN1dGVTcWwocix0LGZ1bmN0aW9uKGUsbil7YS5yZXNvbHZlKG4pLGUuZXhlY3V0ZVNxbChvLGksZnVuY3Rpb24oZSxuKXthLnJlc29sdmUobil9KX0pfSxmdW5jdGlvbihlLG4pe2EucmVqZWN0KG4pfSksYS5wcm9taXNlfSxkZWxldGVEQjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uc3FsaXRlUGx1Z2luLmRlbGV0ZURhdGFiYXNlKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuc3RhdHVzYmFyXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVN0YXR1c2JhclwiLFtmdW5jdGlvbigpe3JldHVybntvdmVybGF5c1dlYlZpZXc6ZnVuY3Rpb24oZSl7cmV0dXJuIFN0YXR1c0Jhci5vdmVybGF5c1dlYlZpZXcoISFlKX0sU1RZTEVTOntERUZBVUxUOjAsTElHSFRfQ09OVEVOVDoxLEJMQUNLX1RSQU5TTFVDRU5UOjIsQkxBQ0tfT1BBUVVFOjN9LHN0eWxlOmZ1bmN0aW9uKGUpe3N3aXRjaChlKXtjYXNlIDA6cmV0dXJuIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtjYXNlIDE6cmV0dXJuIFN0YXR1c0Jhci5zdHlsZUxpZ2h0Q29udGVudCgpO2Nhc2UgMjpyZXR1cm4gU3RhdHVzQmFyLnN0eWxlQmxhY2tUcmFuc2x1Y2VudCgpO2Nhc2UgMzpyZXR1cm4gU3RhdHVzQmFyLnN0eWxlQmxhY2tPcGFxdWUoKTtkZWZhdWx0OnJldHVybiBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCl9fSxzdHlsZUNvbG9yOmZ1bmN0aW9uKGUpe3JldHVybiBTdGF0dXNCYXIuYmFja2dyb3VuZENvbG9yQnlOYW1lKGUpfSxzdHlsZUhleDpmdW5jdGlvbihlKXtyZXR1cm4gU3RhdHVzQmFyLmJhY2tncm91bmRDb2xvckJ5SGV4U3RyaW5nKGUpfSxoaWRlOmZ1bmN0aW9uKCl7cmV0dXJuIFN0YXR1c0Jhci5oaWRlKCl9LHNob3c6ZnVuY3Rpb24oKXtyZXR1cm4gU3RhdHVzQmFyLnNob3coKX0saXNWaXNpYmxlOmZ1bmN0aW9uKCl7cmV0dXJuIFN0YXR1c0Jhci5pc1Zpc2libGV9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnRvYXN0XCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVRvYXN0XCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntzaG93U2hvcnRUb3A6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMudG9hc3Quc2hvd1Nob3J0VG9wKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sc2hvd1Nob3J0Q2VudGVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnRvYXN0LnNob3dTaG9ydENlbnRlcihyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHNob3dTaG9ydEJvdHRvbTpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy50b2FzdC5zaG93U2hvcnRCb3R0b20ocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxzaG93TG9uZ1RvcDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy50b2FzdC5zaG93TG9uZ1RvcChyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHNob3dMb25nQ2VudGVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnRvYXN0LnNob3dMb25nQ2VudGVyKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sc2hvd0xvbmdCb3R0b206ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMudG9hc3Quc2hvd0xvbmdCb3R0b20ocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxzaG93V2l0aE9wdGlvbnM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMudG9hc3Quc2hvd1dpdGhPcHRpb25zKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sc2hvdzpmdW5jdGlvbihyLG8sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMudG9hc3Quc2hvdyhyLG8sdCxmdW5jdGlvbihlKXtpLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2kucmVqZWN0KGUpfSksaS5wcm9taXNlfSxoaWRlOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3RyeXtuLnBsdWdpbnMudG9hc3QuaGlkZSgpLHIucmVzb2x2ZSgpfWNhdGNoKG8pe3IucmVqZWN0KG8mJm8ubWVzc2FnZSl9cmV0dXJuIHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMudG91Y2hpZFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFUb3VjaElEXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57Y2hlY2tTdXBwb3J0OmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiB3aW5kb3cuY29yZG92YT90b3VjaGlkLmNoZWNrU3VwcG9ydChmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSk6bi5yZWplY3QoXCJOb3Qgc3VwcG9ydGVkIHdpdGhvdXQgY29yZG92YS5qc1wiKSxuLnByb21pc2V9LGF1dGhlbnRpY2F0ZTpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIHdpbmRvdy5jb3Jkb3ZhP3RvdWNoaWQuYXV0aGVudGljYXRlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LG4pOnIucmVqZWN0KFwiTm90IHN1cHBvcnRlZCB3aXRob3V0IGNvcmRvdmEuanNcIiksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy50dHNcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhVFRTXCIsZnVuY3Rpb24oKXtyZXR1cm57c3BlYWs6ZnVuY3Rpb24oZSxuLHIpe3JldHVybiBUVFMuc3BlYWsoZSxuLHIpfX19KSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnVwc1B1c2hcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhVXBzUHVzaFwiLFtcIiRxXCIsXCIkd2luZG93XCIsXCIkcm9vdFNjb3BlXCIsXCIkdGltZW91dFwiLGZ1bmN0aW9uKGUsbixyLG8pe3JldHVybntyZWdpc3RlcjpmdW5jdGlvbih0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIG4ucHVzaC5yZWdpc3RlcihmdW5jdGlvbihlKXtvKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFVcHNQdXNoOm5vdGlmaWNhdGlvblJlY2VpdmVkXCIsZSl9KX0sZnVuY3Rpb24oKXtpLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7aS5yZWplY3QoZSl9LHQpLGkucHJvbWlzZX0sdW5yZWdpc3RlcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucHVzaC51bnJlZ2lzdGVyKGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSxyKSxvLnByb21pc2V9LHNldEJhZGdlTnVtYmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wdXNoLnNldEFwcGxpY2F0aW9uSWNvbkJhZGdlTnVtYmVyKGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LHIpLG8ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMudmlicmF0aW9uXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVZpYnJhdGlvblwiLFtmdW5jdGlvbigpe3JldHVybnt2aWJyYXRlOmZ1bmN0aW9uKGUpe3JldHVybiBuYXZpZ2F0b3Iubm90aWZpY2F0aW9uLnZpYnJhdGUoZSl9LHZpYnJhdGVXaXRoUGF0dGVybjpmdW5jdGlvbihlLG4pe3JldHVybiBuYXZpZ2F0b3Iubm90aWZpY2F0aW9uLnZpYnJhdGVXaXRoUGF0dGVybihlLG4pfSxjYW5jZWxWaWJyYXRpb246ZnVuY3Rpb24oKXtyZXR1cm4gbmF2aWdhdG9yLm5vdGlmaWNhdGlvbi5jYW5jZWxWaWJyYXRpb24oKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMudmlkZW9DYXB0dXJlUGx1c1wiLFtdKS5wcm92aWRlcihcIiRjb3Jkb3ZhVmlkZW9DYXB0dXJlUGx1c1wiLFtmdW5jdGlvbigpe3ZhciBlPXt9O3RoaXMuc2V0TGltaXQ9ZnVuY3Rpb24obil7ZS5saW1pdD1ufSx0aGlzLnNldE1heER1cmF0aW9uPWZ1bmN0aW9uKG4pe2UuZHVyYXRpb249bn0sdGhpcy5zZXRIaWdoUXVhbGl0eT1mdW5jdGlvbihuKXtlLmhpZ2hxdWFsaXR5PW59LHRoaXMudXNlRnJvbnRDYW1lcmE9ZnVuY3Rpb24obil7ZS5mcm9udGNhbWVyYT1ufSx0aGlzLnNldFBvcnRyYWl0T3ZlcmxheT1mdW5jdGlvbihuKXtlLnBvcnRyYWl0T3ZlcmxheT1ufSx0aGlzLnNldExhbmRzY2FwZU92ZXJsYXk9ZnVuY3Rpb24obil7ZS5sYW5kc2NhcGVPdmVybGF5PW59LHRoaXMuc2V0T3ZlcmxheVRleHQ9ZnVuY3Rpb24obil7ZS5vdmVybGF5VGV4dD1ufSx0aGlzLiRnZXQ9W1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihuLHIpe3JldHVybntjYXB0dXJlVmlkZW86ZnVuY3Rpb24obyl7dmFyIHQ9bi5kZWZlcigpO3JldHVybiByLnBsdWdpbnMudmlkZW9jYXB0dXJlcGx1cz8oci5wbHVnaW5zLnZpZGVvY2FwdHVyZXBsdXMuY2FwdHVyZVZpZGVvKHQucmVzb2x2ZSx0LnJlamVjdCxhbmd1bGFyLmV4dGVuZCh7fSxlLG8pKSx0LnByb21pc2UpOih0LnJlc29sdmUobnVsbCksdC5wcm9taXNlKX19fV19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy56aXBcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhWmlwXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybnt1bnppcDpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi56aXAudW56aXAocixvLGZ1bmN0aW9uKGUpezA9PT1lP3QucmVzb2x2ZSgpOnQucmVqZWN0KCl9LGZ1bmN0aW9uKGUpe3Qubm90aWZ5KGUpfSksdC5wcm9taXNlfX19XSl9KCk7IiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImFkZENoaWxkQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xyXG4gIC8vYmFja2J1dHRvblxyXG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xyXG4gICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpXHJcbiAgfVxyXG5cclxuJHNjb3BlLnN1Ym1pdENoaWxkID0gZnVuY3Rpb24oY2hpbGQpe1xyXG4gIGNvbnNvbGUubG9nKGNoaWxkKTtcclxuICAkc2NvcGUuY2hpbGQgPSBcIlwiO1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hpbGQtaW5wdXRcIikudmFsdWUgPSBcIlwiO1xyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxufSkgLy9lbmQgb2YgY29udHJvbGxlclxyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiYXNzaWduQ2hvcmVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XHJcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gYXNzaWduIGNob3JlIGNvbnRyb2xsZXJcIlxyXG5cclxufSlcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcignY2FtZXJhQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGNvcmRvdmFDYW1lcmEpIHtcclxuXHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRldmljZXJlYWR5XCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgJGNvcmRvdmFQbHVnaW4uc29tZUZ1bmN0aW9uKCkudGhlbihzdWNjZXNzLCBlcnJvcik7XHJcbiAgICB9LCBmYWxzZSk7XHJcblxyXG4gICAgLy8gT1Igd2l0aCBJT05JQ1xyXG5cclxuICAgICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgICAkY29yZG92YVBsdWdpbi5zb21lRnVuY3Rpb24oKS50aGVuKHN1Y2Nlc3MsIGVycm9yKTtcclxuICAgIH0pO1xyXG5cclxuICAkc2NvcGUudGFrZVBpY3R1cmUgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBvcHRpb25zID0ge1xyXG4gICAgICBxdWFsaXR5OiA1MCxcclxuICAgICAgZGVzdGluYXRpb25UeXBlOiBDYW1lcmEuRGVzdGluYXRpb25UeXBlLkRBVEFfVVJMLFxyXG4gICAgICBzb3VyY2VUeXBlOiBDYW1lcmEuUGljdHVyZVNvdXJjZVR5cGUuQ0FNRVJBLFxyXG4gICAgICBhbGxvd0VkaXQ6IGZhbHNlLFxyXG4gICAgICBlbmNvZGluZ1R5cGU6IENhbWVyYS5FbmNvZGluZ1R5cGUuSlBFRyxcclxuICAgICAgdGFyZ2V0V2lkdGg6IDMwMCxcclxuICAgICAgdGFyZ2V0SGVpZ2h0OiAzMDAsXHJcbiAgICAgIHBvcG92ZXJPcHRpb25zOiBDYW1lcmFQb3BvdmVyT3B0aW9ucyxcclxuICAgICAgc2F2ZVRvUGhvdG9BbGJ1bTogZmFsc2UsXHJcblx0ICAgIGNvcnJlY3RPcmllbnRhdGlvbjp0cnVlXHJcbiAgICB9O1xyXG5cclxuICAgICRjb3Jkb3ZhQ2FtZXJhLmdldFBpY3R1cmUob3B0aW9ucykudGhlbihmdW5jdGlvbihpbWFnZURhdGEpIHtcclxuICAgICAgJHNjb3BlLmltZ1VSSSA9IFwiZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCxcIiArIGltYWdlRGF0YTtcclxuICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAvLyBlcnJvclxyXG4gICAgfSk7XHJcblxyXG4gIH07XHJcbiAgfSwgZmFsc2UpO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiY2hpbGRCYW5rQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xyXG4gICAkc2NvcGUudGhlbWUgPSAnd2F0ZXInLy9sb2FkIHVzZXIgdGhlbWVcclxuXHJcbiAgICRzY29wZS5zZXRUaGVtZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAnYmFzZWJhbGwnKXtcclxuICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL2ltZy1iYXNlYmFsbC10cmFucy5wbmcnXHJcbiAgICAgfVxyXG4gICAgIGlmKCRzY29wZS50aGVtZSA9PT0gJ2NoYXJsaWVCcm93bicpe1xyXG4gICAgICAgJHNjb3BlLnRoZW1lSW1hZ2UgPSAnLi9pbWcvc25vb3B5LnBuZydcclxuICAgICB9XHJcbiAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAncHJpbmNlc3MnKXtcclxuICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL0Nyb3duX1ByaW5jZXNzLnBuZydcclxuICAgICB9XHJcbiAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAnc3RhcldhcnMnKXtcclxuICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL2RlYXRoLXN0YXItMm5kLWljb24ucG5nJ1xyXG4gICAgIH1cclxuICAgICBpZigkc2NvcGUudGhlbWUgPT09ICd3YXRlcicpe1xyXG4gICAgICAgJHNjb3BlLnRoZW1lSW1hZ2UgPSAnLi9pbWcvVHJhbnNwYXJlbnRfV2F0ZXJfRHJvcF9QTkdfUGljdHVyZS5wbmcnXHJcbiAgICAgfVxyXG5cclxuICAgfVxyXG4gICAkc2NvcGUuc2V0VGhlbWUoKTtcclxufSlcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImNoaWxkSG9tZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCwgJGF1dGgsIHVzZXJTZXJ2aWNlKXtcclxuICAvLyAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tICBjaGlsZCBIb21lIGNvbnRyb2xsZXJcIlxyXG4gIC8vdmFyIHVzZXJUb2tlbiA9IHVzZXJTZXJ2aWNlLmdldFVzZXJJbmZvLnN1YjtcclxuXHJcbiAgdmFyIHVzZXJUb2tlbiA9ICRhdXRoLmdldFBheWxvYWQoKTtcclxuICB1c2VyU2VydmljZS5nZXRVc2VySW5mbyA9IHVzZXJUb2tlbjtcclxuICAkc2NvcGUudXNlciA9IHVzZXJUb2tlbi5zdWI7XHJcblxyXG4gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgndGhlbWVNb2RhbC5odG1sJywge1xyXG4gICAgIGlkOiAnMScsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxyXG4gICAgIHNjb3BlOiAkc2NvcGUsXHJcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxyXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xyXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XHJcbiAgICAgJHNjb3BlLm9Nb2RhbDEgPSBtb2RhbDtcclxuICAgfSk7XHJcblxyXG4gICAvLyBNb2RhbCAyXHJcbiAgLy8gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgndGFrZVBpY3R1cmVNb2RhbC5odG1sJywge1xyXG4gIC8vICAgIGlkOiAnMicsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxyXG4gIC8vICAgIHNjb3BlOiAkc2NvcGUsXHJcbiAgLy8gICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxyXG4gIC8vICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xyXG4gIC8vICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XHJcbiAgLy8gICAgJHNjb3BlLm9Nb2RhbDIgPSBtb2RhbDtcclxuICAvLyAgfSk7XHJcbiAgICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbihpbmRleCkge1xyXG4gICAgIGlmIChpbmRleCA9PSAxKSAkc2NvcGUub01vZGFsMS5zaG93KCk7XHJcbiAgICAgZWxzZSAkc2NvcGUub01vZGFsMi5zaG93KCk7XHJcbiAgIH07XHJcblxyXG4gICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKGluZGV4KSB7XHJcbiAgICAgaWYgKGluZGV4ID09IDEpICRzY29wZS5vTW9kYWwxLmhpZGUoKTtcclxuICAgICBlbHNlICRzY29wZS5vTW9kYWwyLmhpZGUoKTtcclxuICAgfTtcclxuXHJcbiAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgJHNjb3BlLm9Nb2RhbDEucmVtb3ZlKCk7XHJcbiAgICAgJHNjb3BlLm9Nb2RhbDIucmVtb3ZlKCk7XHJcblxyXG4gICB9KTtcclxuXHJcblxyXG4gICRzY29wZS50aGVtZSA9ICRzY29wZS51c2VyLnVzZXJfdGhlbWVcclxuY29uc29sZS5sb2coJHNjb3BlLnVzZXIpO1xyXG5cclxuXHJcblxyXG4gICRzY29wZS5zZXRUaGVtZSA9IGZ1bmN0aW9uKGNob2ljZSl7XHJcbiAgICB2YXIgZGF0YSA9IHt9XHJcbiAgICBkYXRhLnRoZW1lID0gY2hvaWNlXHJcbiAgICBkYXRhLnVzZXIgPSAkc2NvcGUudXNlci51c2VyX2lkX3BrO1xyXG4gICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICB1c2VyU2VydmljZS5wb3N0VGhlbWUoZGF0YSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICBpZihyZXNwb25zZS5zdGF0dXMgPT09IDIwMCl7XHJcbiAgICAgICRzY29wZS50aGVtZSA9IGNob2ljZVxyXG4gICAgICB9XHJcbiAgfSlcclxuICB9XHJcblxyXG5cclxuXHJcblxyXG59KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImNoaWxkTG9naW5DdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGF1dGgsICRzdGF0ZSwgbG9naW5TZXJ2aWNlKXtcclxuICAvLyAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBjaGlsZCBMb2dpbiBjb250cm9sbGVyXCJcclxuXHJcbiAgICRzY29wZS5sb2dpbkNoaWxkID0gZnVuY3Rpb24odXNlcil7XHJcbiAgICAgY29uc29sZS5sb2codXNlcilcclxuICAgICBsb2dpblNlcnZpY2UudXNlckxvZ2luKHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXHJcbiAgICAgICAkYXV0aC5zZXRUb2tlbihyZXNwb25zZSlcclxuICAgICAgICAgJHN0YXRlLmdvKCdjaGlsZEhvbWUnKVxyXG5cclxuICAgICB9KVxyXG4gICB9XHJcbn0pXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJlZGl0Q2hpbGRDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XHJcbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5nbygtMSlcclxuICB9XHJcblxyXG59KVxyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiaGlzdG9yeUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcclxuICAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBIaXN0b3J5IGNvbnRyb2xsZXJcIlxyXG5cclxufSlcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImhvbWVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwsdXNlclNlcnZpY2Upe1xyXG52YXIgdXNlclRva2VuID0gdXNlclNlcnZpY2UuZ2V0VXNlckluZm8uc3ViO1xyXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2Jhbm5lck1vZGFsLmh0bWwnLCB7XHJcbiAgICAgc2NvcGU6ICRzY29wZSxcclxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcclxuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xyXG4gICAgICRzY29wZS5tb2RhbCA9IG1vZGFsO1xyXG4gICB9KTtcclxuICAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICRzY29wZS5tb2RhbC5zaG93KCk7XHJcbiAgIH07XHJcbiAgICRzY29wZS5zdWJtaXRCYW5uZXIgPSBmdW5jdGlvbihiYW5uZXIpe1xyXG4gICAgIHZhciBiYW5uZXJJbmZvID0ge1xyXG4gICAgICAgdXNlcl9ob3VzZWhvbGQ6dXNlclRva2VuLnVzZXJfaG91c2Vob2xkLFxyXG4gICAgICAgdXNlcl9iYW5uZXJfaW1hZ2U6YmFubmVyXHJcbiAgICAgfVxyXG4gICAgICB1c2VyU2VydmljZS5wb3N0YmFubmVyKGJhbm5lckluZm8pXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcclxuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWwtYm94XCIpLnZhbHVlID0gJyc7XHJcbiAgICAgfSk7XHJcbiAgIH07XHJcbiAgICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbC1ib3hcIikudmFsdWUgPSAnJztcclxuICAgICAkc2NvcGUubW9kYWwuaGlkZSgpO1xyXG4gICB9O1xyXG4gICAvLyBDbGVhbnVwIHRoZSBtb2RhbCB3aGVuIHdlJ3JlIGRvbmUgd2l0aCBpdCFcclxuICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcclxuICAgICAkc2NvcGUubW9kYWwucmVtb3ZlKCk7XHJcbiAgIH0pO1xyXG4gICAvLyBFeGVjdXRlIGFjdGlvbiBvbiBoaWRlIG1vZGFsXHJcbiAgICRzY29wZS4kb24oJ21vZGFsLmhpZGRlbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgIC8vIEV4ZWN1dGUgYWN0aW9uXHJcblxyXG4gICB9KTtcclxuICAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gcmVtb3ZlIG1vZGFsXHJcbiAgICRzY29wZS4kb24oJ21vZGFsLnJlbW92ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAvLyBFeGVjdXRlIGFjdGlvblxyXG4gICB9KTtcclxuXHJcbiRzY29wZS5ob3VzZWhvbGQgPSAgdXNlclRva2VuLnVzZXJfaG91c2Vob2xkO1xyXG51c2VyU2VydmljZS5nZXRiYW5uZXIodXNlclRva2VuLnVzZXJfaG91c2Vob2xkKS50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbmNvbnNvbGUubG9nKHJlcy5kYXRhWzBdLnVzZXJfYmFubmVyX2ltYWdlKTtcclxuICAkc2NvcGUuYmFubmVyID0gcmVzLmRhdGFbMF0udXNlcl9iYW5uZXJfaW1hZ2U7XHJcbn0pO1xyXG5cclxuY29uc29sZS5sb2codXNlclRva2VuLnppcCk7XHJcblxyXG51c2VyU2VydmljZS5nZXRXZWF0aGVyKHVzZXJUb2tlbi56aXApXHJcbi50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xyXG4gICRzY29wZS53ZWF0aGVyID0gcmVzLmRhdGE7XHJcbn0pXHJcblxyXG5cclxufSkvL2VuZCBvZiBjb250cm9sbGVyXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJsb2dpbkN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkYXV0aCwgJHN0YXRlLCBsb2dpblNlcnZpY2Upe1xyXG5cclxuJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24odXNlcil7XHJcbiAgLy8gY29uc29sZS5sb2codXNlcilcclxuICBsb2dpblNlcnZpY2UudXNlckxvZ2luKHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UpXHJcbiAgICAkYXV0aC5zZXRUb2tlbihyZXNwb25zZSlcclxuICAgICAgJHN0YXRlLmdvKCdob21lJylcclxuXHJcbiAgfSlcclxufVxyXG4kc2NvcGUubWFrZVVzZXIgPSBmdW5jdGlvbihuZXdVc2VyKXtcclxuICBsb2dpblNlcnZpY2UubWFrZVVzZXIobmV3VXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAkYXV0aC5zZXRUb2tlbihyZXNwb25zZSlcclxuICAgICAgJHN0YXRlLmdvKCdob21lJylcclxuICB9KVxyXG59XHJcbiAgJHNjb3BlLmF1dGhlbnRpY2F0ZSA9IGZ1bmN0aW9uKHByb3ZpZGVyKSB7XHJcbiAgJGF1dGguYXV0aGVudGljYXRlKHByb3ZpZGVyKX07XHJcbiAgLy8gJHNjb3BlLnRlc3QgPSBcIkhlbGxvIGZyb20gbG9naW4gY29udHJvbGxlclwiXHJcblxyXG5cclxuICAkc2NvcGUucmV2ZWFsZXIgPSBmdW5jdGlvbigpe1xyXG4gICRzY29wZS5oaWRlID0gISRzY29wZS5oaWRlO1xyXG4gfVxyXG5cclxufSlcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcIm1ha2VDaG9yZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcclxuICAkc2NvcGUuZ29iYWNrID0gZnVuY3Rpb24oKXtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxyXG4gIH1cclxuXHJcbn0pXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJzZXRSZXdhcmRzQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsKXtcclxuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3Jld2FyZE1vZGFsLmh0bWwnLCB7XHJcbiAgICBzY29wZTogJHNjb3BlLFxyXG4gICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXHJcbiAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xyXG4gICAgJHNjb3BlLm1vZGFsID0gbW9kYWw7XHJcbiAgfSk7XHJcbiAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJHNjb3BlLm1vZGFsLnNob3coKTtcclxuICB9O1xyXG4gICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAkc2NvcGUubW9kYWwuaGlkZSgpO1xyXG4gIH07XHJcbiAgLy8gQ2xlYW51cCB0aGUgbW9kYWwgd2hlbiB3ZSdyZSBkb25lIHdpdGggaXQhXHJcbiAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcclxuICAgICRzY29wZS5tb2RhbC5yZW1vdmUoKTtcclxuICB9KTtcclxuICAvLyBFeGVjdXRlIGFjdGlvbiBvbiBoaWRlIG1vZGFsXHJcbiAgJHNjb3BlLiRvbignbW9kYWwuaGlkZGVuJywgZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxyXG4gIH0pO1xyXG4gIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIHJlbW92ZSBtb2RhbFxyXG4gICRzY29wZS4kb24oJ21vZGFsLnJlbW92ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIC8vIEV4ZWN1dGUgYWN0aW9uXHJcbiAgfSk7XHJcbiAgLy9iYWNrYnV0dG9uXHJcbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5nbygtMSlcclxuICB9XHJcblxyXG59KVxyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwic2V0dGluZ3NDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwpe1xyXG4gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnY2hhbmdlUGFzc3dvcmQuaHRtbCcsIHtcclxuICAgICBpZDogJzEnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcclxuICAgICBzY29wZTogJHNjb3BlLFxyXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcclxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcclxuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xyXG4gICAgICRzY29wZS5vTW9kYWwxID0gbW9kYWw7XHJcbiAgIH0pO1xyXG5cclxuICAgLy8gTW9kYWwgMlxyXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2NoYW5nZUhvdXNlaG9sZC5odG1sJywge1xyXG4gICAgIGlkOiAnMicsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxyXG4gICAgIHNjb3BlOiAkc2NvcGUsXHJcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxyXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xyXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XHJcbiAgICAgJHNjb3BlLm9Nb2RhbDIgPSBtb2RhbDtcclxuICAgfSk7XHJcblxyXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2NoYW5nZVppcC5odG1sJywge1xyXG4gICAgIGlkOiAnMycsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxyXG4gICAgIHNjb3BlOiAkc2NvcGUsXHJcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxyXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xyXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XHJcbiAgICAgJHNjb3BlLm9Nb2RhbDMgPSBtb2RhbDtcclxuICAgfSk7XHJcblxyXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2FkZFBhcmVudC5odG1sJywge1xyXG4gICAgIGlkOiAnNCcsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxyXG4gICAgIHNjb3BlOiAkc2NvcGUsXHJcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxyXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xyXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XHJcbiAgICAgJHNjb3BlLm9Nb2RhbDQgPSBtb2RhbDtcclxuICAgfSk7XHJcblxyXG4gICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3JlbW92ZUNoaWxkLmh0bWwnLCB7XHJcbiAgICAgaWQ6ICc1JywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXHJcbiAgICAgc2NvcGU6ICRzY29wZSxcclxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXHJcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXHJcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcclxuICAgICAkc2NvcGUub01vZGFsNSA9IG1vZGFsO1xyXG4gICB9KTtcclxuXHJcblxyXG5cclxuICAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKGluZGV4KSB7XHJcbiAgICAgaWYgKGluZGV4ID09IDEpICRzY29wZS5vTW9kYWwxLnNob3coKTtcclxuICAgICBlbHNlIGlmKGluZGV4ID09IDIpICRzY29wZS5vTW9kYWwyLnNob3coKTtcclxuICAgICBlbHNlIGlmKGluZGV4ID09IDMpICRzY29wZS5vTW9kYWwzLnNob3coKTtcclxuICAgICBlbHNlIGlmKGluZGV4ID09IDQpICRzY29wZS5vTW9kYWw0LnNob3coKTtcclxuICAgICBlbHNlICRzY29wZS5vTW9kYWw1LnNob3coKTtcclxuICAgfTtcclxuXHJcbiAgICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgICBpZiAoaW5kZXggPT0gMSkgJHNjb3BlLm9Nb2RhbDEuaGlkZSgpO1xyXG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMikgJHNjb3BlLm9Nb2RhbDIuaGlkZSgpO1xyXG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMykgJHNjb3BlLm9Nb2RhbDMuaGlkZSgpO1xyXG4gICAgIGVsc2UgaWYoaW5kZXggPT0gNCkgJHNjb3BlLm9Nb2RhbDQuaGlkZSgpO1xyXG4gICAgIGVsc2UgJHNjb3BlLm9Nb2RhbDUuaGlkZSgpO1xyXG4gICB9O1xyXG5cclxuICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcclxuICAgICAkc2NvcGUub01vZGFsMS5yZW1vdmUoKTtcclxuICAgICAkc2NvcGUub01vZGFsMi5yZW1vdmUoKTtcclxuICAgICAkc2NvcGUub01vZGFsMy5yZW1vdmUoKTtcclxuICAgICAkc2NvcGUub01vZGFsNC5yZW1vdmUoKTtcclxuICAgICAkc2NvcGUub01vZGFsNS5yZW1vdmUoKTtcclxuICAgfSk7XHJcblxyXG59KVxyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwidHJhY2tlckN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCl7XHJcbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdwaWNDb25mTW9kYWwuaHRtbCcsIHtcclxuICAgIHNjb3BlOiAkc2NvcGUsXHJcbiAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcclxuICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XHJcbiAgICAkc2NvcGUubW9kYWwgPSBtb2RhbDtcclxuICB9KTtcclxuICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAkc2NvcGUubW9kYWwuc2hvdygpO1xyXG4gIH07XHJcbiAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbigpIHtcclxuICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XHJcbiAgfTtcclxuICAvLyBDbGVhbnVwIHRoZSBtb2RhbCB3aGVuIHdlJ3JlIGRvbmUgd2l0aCBpdCFcclxuICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xyXG4gICAgJHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xyXG4gIH0pO1xyXG4gIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIGhpZGUgbW9kYWxcclxuICAkc2NvcGUuJG9uKCdtb2RhbC5oaWRkZW4nLCBmdW5jdGlvbigpIHtcclxuICAgIC8vIEV4ZWN1dGUgYWN0aW9uXHJcbiAgfSk7XHJcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gcmVtb3ZlIG1vZGFsXHJcbiAgJHNjb3BlLiRvbignbW9kYWwucmVtb3ZlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gRXhlY3V0ZSBhY3Rpb25cclxuICB9KTtcclxuXHJcbn0pXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJ1c2VySW5mb0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcclxuICAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBpbmZvIGNvbnRyb2xsZXJcIlxyXG5cclxufSlcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuc2VydmljZSgnbG9naW5TZXJ2aWNlJywgZnVuY3Rpb24oJGh0dHApe1xyXG5cclxuXHJcbiAgdGhpcy51c2VyTG9naW4gPSBmdW5jdGlvbih1c2VyKSB7XHJcbiAgICBjb25zb2xlLmxvZyh1c2VyLCBcInNlcnZpY2VcIilcclxuICAgIHJldHVybiAkaHR0cCh7XHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIHVybDogJy9hdXRoL2xvZ2luJyxcclxuICAgICAgZGF0YTogdXNlclxyXG4gICAgfSlcclxuICB9XHJcbiAgdGhpcy5tYWtlVXNlciA9IGZ1bmN0aW9uKG5ld1VzZXIpIHtcclxuICAgIHJldHVybiAkaHR0cCh7XHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIHVybDogJy9hdXRoL3NpZ251cCcsXHJcbiAgICAgIGRhdGE6IG5ld1VzZXJcclxuICAgIH0pXHJcbiAgfVxyXG59KSAvLyBlbmQgb2Ygc2VydmljZVxyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5zZXJ2aWNlKCd1c2VyU2VydmljZScsIGZ1bmN0aW9uKCRodHRwLCRxLCRhdXRoKXtcclxuXHJcbnZhciBiYW5uZXI7XHJcbnRoaXMuZ2V0VXNlckluZm87XHJcblxyXG5cclxudGhpcy5wb3N0YmFubmVyID0gZnVuY3Rpb24oYmFubmVyKXtcclxuICBjb25zb2xlLmxvZyhiYW5uZXIpO1xyXG4gIGNvbnNvbGUubG9nKGJhbm5lci51c2VyX2Jhbm5lcl9pbWFnZSk7XHJcbiAgcmV0dXJuICRodHRwKHtcclxuICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgIHVybDpcIi9iYW5uZXIvXCIgKyBiYW5uZXIudXNlcl9ob3VzZWhvbGQsXHJcbiAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7dXNlcl9iYW5uZXJfaW1hZ2U6YmFubmVyLnVzZXJfYmFubmVyX2ltYWdlfSlcclxuICB9KVxyXG59XHJcblxyXG50aGlzLmdldGJhbm5lciA9IGZ1bmN0aW9uKHVzZXJJZCl7XHJcbiAgY29uc29sZS5sb2codXNlcklkKTtcclxuICByZXR1cm4gJGh0dHAoe1xyXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgdXJsOlwiL2Jhbm5lci9cIiArIHVzZXJJZFxyXG4gIH0pXHJcbn1cclxuXHJcblxyXG50aGlzLmdldFdlYXRoZXIgPSBmdW5jdGlvbigpe1xyXG5yZXR1cm4gJGh0dHAoe1xyXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgdXJsOidodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9emlwPTg0MDEwJnVuaXRzPWltcGVyaWFsJmFwcGlkPWMxMGVmOTljNWFmZGVlM2ZkZmJhNzhlOGM5ODFhOWI2J1xyXG4gIH0pXHJcblxyXG59O1xyXG5cclxuLy8gdGhpcy5wb3N0VGhlbWUgPSBmdW5jdGlvbihkYXRhKXtcclxuLy8gICByZXR1cm4gJGh0dHAoe1xyXG4vLyAgICAgbWV0aG9kOiAnR0VUJyxcclxuLy8gICAgIHVybDpcclxuLy8gICAgIGRhdGE6IGRhdGFcclxuLy8gICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4vLyAgICAgICByZXR1cm4gcmVzO1xyXG4vLyAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4vLyAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbi8vICAgfSlcclxuLy8gfVxyXG5cclxuXHJcblxyXG59KTsvL2VuZCBvZiBzZXJ2aWNlXHJcbiJdfQ==
