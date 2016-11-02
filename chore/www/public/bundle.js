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

angular.module('chore').controller("childHomeCtrl", function ($scope, $ionicModal, $window) {
  // $scope.test = "Message from  child Home controller"
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

  $scope.theme = "water"; //user.theme


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
"use strict";

angular.module('chore').controller("homeCtrl", function ($scope, $ionicModal, userService) {
  var userToken = userService.getUserInfo.sub;
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
}); //end of service
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm5nLWNvcmRvdmEubWluLmpzIiwiY29udHJvbGxlcnMvYWRkQ2hpbGRDdHJsLmpzIiwiY29udHJvbGxlcnMvYXNzaWduQ2hvcmVDdHJsLmpzIiwiY29udHJvbGxlcnMvY2FtZXJhQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NoaWxkQmFua0N0cmwuanMiLCJjb250cm9sbGVycy9jaGlsZEhvbWVDdHJsLmpzIiwiY29udHJvbGxlcnMvY2hpbGRMb2dpbkN0cmwuanMiLCJjb250cm9sbGVycy9lZGl0Q2hpbGRDdHJsLmpzIiwiY29udHJvbGxlcnMvaGlzdG9yeUN0cmwuanMiLCJjb250cm9sbGVycy9ob21lQ3RybC5qcyIsImNvbnRyb2xsZXJzL2xvZ2luQ3RybC5qcyIsImNvbnRyb2xsZXJzL21ha2VDaG9yZUN0cmwuanMiLCJjb250cm9sbGVycy9zZXRSZXdhcmRzQ3RybC5qcyIsImNvbnRyb2xsZXJzL3NldHRpbmdzQ3RybC5qcyIsImNvbnRyb2xsZXJzL3RyYWNrZXJDdHJsLmpzIiwiY29udHJvbGxlcnMvdXNlckluZm9DdHJsLmpzIiwic2VydmljZS9sb2dpblNlcnZpY2UuanMiLCJzZXJ2aWNlL3VzZXJTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsIiR1cmxSb3V0ZXJQcm92aWRlciIsIiRhdXRoUHJvdmlkZXIiLCJvdGhlcndpc2UiLCJzdGF0ZSIsInVybCIsInRlbXBsYXRlVXJsIiwiY29udHJvbGxlciIsImZhY2Vib29rIiwiY2xpZW50SWQiLCJyZXNwb25zZVR5cGUiLCJnb29nbGUiLCJydW4iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5Iiwid2luZG93IiwiY29yZG92YSIsInBsdWdpbnMiLCJLZXlib2FyZCIsImhpZGVLZXlib2FyZEFjY2Vzc29yeUJhciIsImRpc2FibGVTY3JvbGwiLCJTdGF0dXNCYXIiLCJzdHlsZURlZmF1bHQiLCJmYWN0b3J5IiwiZSIsIm4iLCJyIiwibyIsInR5cGUiLCJpc0F2YWlsYWJsZSIsImRlZmVyIiwiVGhyZWVEZWVUb3VjaCIsInJlc29sdmUiLCJyZWplY3QiLCJwcm9taXNlIiwiYWRkUXVpY2tBY3Rpb24iLCJ0IiwiaSIsImEiLCJjIiwidSIsInMiLCJsIiwiZiIsInRpdGxlIiwic3VidGl0bGUiLCJpY29uVHlwZSIsImljb25UZW1wbGF0ZSIsInRoZW4iLCJwdXNoIiwiY29uZmlndXJlUXVpY2tBY3Rpb25zIiwib25Ib21lSWNvblByZXNzZWQiLCJhZGRRdWlja0FjdGlvbkhhbmRsZXIiLCJlbmFibGVMaW5rUHJldmlldyIsImFkZEZvcmNlVG91Y2hIYW5kbGVyIiwid2F0Y2hGb3JjZVRvdWNoZXMiLCJzaG93IiwiYWN0aW9uc2hlZXQiLCJoaWRlIiwiY3JlYXRlQmFubmVyVmlldyIsIkFkTW9iIiwiY3JlYXRlSW50ZXJzdGl0aWFsVmlldyIsInJlcXVlc3RBZCIsInNob3dBZCIsInJlcXVlc3RJbnRlcnN0aXRpYWxBZCIsImNoZWNrIiwiYXBwQXZhaWxhYmlsaXR5IiwicHJvdmlkZXIiLCJzZXRQcmVmZXJlbmNlcyIsImlzT2JqZWN0IiwiQXBwUmF0ZSIsInByZWZlcmVuY2VzIiwidXNlTGFuZ3VhZ2UiLCJsYW5ndWFnZSIsImRpc3BsYXlBcHBOYW1lIiwiYXBwTmFtZSIsInByb21wdEFnYWluRm9yRWFjaE5ld1ZlcnNpb24iLCJwcm9tcHRGb3JOZXdWZXJzaW9uIiwib3BlblN0b3JlSW5BcHAiLCJ1c2VzVW50aWxQcm9tcHQiLCJ1c2VDdXN0b21SYXRlRGlhbG9nIiwic3RvcmVBcHBVUkwiLCJpb3MiLCJpb3NVUkwiLCJhbmRyb2lkIiwiYW5kcm9pZFVSTCIsImJsYWNrYmVycnkiLCJibGFja2JlcnJ5VVJMIiwid2luZG93czgiLCJ3aW5kb3dzVVJMIiwic2V0Q3VzdG9tTG9jYWxlIiwibWVzc2FnZSIsImNhbmNlbEJ1dHRvbkxhYmVsIiwibGF0ZXJCdXR0b25MYWJlbCIsInJhdGVCdXR0b25MYWJlbCIsImV4dGVuZCIsImN1c3RvbUxvY2FsZSIsIiRnZXQiLCJwcm9tcHRGb3JSYXRpbmciLCJuYXZpZ2F0ZVRvQXBwU3RvcmUiLCJvbkJ1dHRvbkNsaWNrZWQiLCJjYWxsYmFja3MiLCJiaW5kIiwib25SYXRlRGlhbG9nU2hvdyIsImdldEFwcE5hbWUiLCJnZXRBcHBWZXJzaW9uIiwiZ2V0UGFja2FnZU5hbWUiLCJnZXRWZXJzaW9uTnVtYmVyIiwiZ2V0VmVyc2lvbkNvZGUiLCJpbml0IiwibmF2aWdhdG9yIiwiZ2VvbG9jYXRpb24iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJjb25maWd1cmUiLCJiYWNrZ3JvdW5kR2VvTG9jYXRpb24iLCJub3RpZnkiLCJmaW5pc2giLCJzdGFydCIsInN0b3AiLCJoYXNQZXJtaXNzaW9uIiwibm90aWZpY2F0aW9uIiwiYmFkZ2UiLCJwcm9tcHRGb3JQZXJtaXNzaW9uIiwic2V0IiwiZ2V0IiwiY2xlYXIiLCJpbmNyZWFzZSIsImRlY3JlYXNlIiwic2NhbiIsImJhcmNvZGVTY2FubmVyIiwiZW5jb2RlIiwiJGJyb2FkY2FzdCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImJhdHRlcnkiLCJsb2NhdGlvbk1hbmFnZXIiLCJEZWxlZ2F0ZSIsImRpZERldGVybWluZVN0YXRlRm9yUmVnaW9uIiwiZGlkU3RhcnRNb25pdG9yaW5nRm9yUmVnaW9uIiwiZGlkRXhpdFJlZ2lvbiIsImRpZEVudGVyUmVnaW9uIiwiZGlkUmFuZ2VCZWFjb25zSW5SZWdpb24iLCJwZXJpcGhlcmFsTWFuYWdlckRpZFN0YXJ0QWR2ZXJ0aXNpbmciLCJwZXJpcGhlcmFsTWFuYWdlckRpZFVwZGF0ZVN0YXRlIiwiZGlkQ2hhbmdlQXV0aG9yaXphdGlvblN0YXR1cyIsInNldERlbGVnYXRlIiwic2V0Q2FsbGJhY2tEaWREZXRlcm1pbmVTdGF0ZUZvclJlZ2lvbiIsInNldENhbGxiYWNrRGlkU3RhcnRNb25pdG9yaW5nRm9yUmVnaW9uIiwic2V0Q2FsbGJhY2tEaWRFeGl0UmVnaW9uIiwic2V0Q2FsbGJhY2tEaWRFbnRlclJlZ2lvbiIsInNldENhbGxiYWNrRGlkUmFuZ2VCZWFjb25zSW5SZWdpb24iLCJzZXRDYWxsYmFja1BlcmlwaGVyYWxNYW5hZ2VyRGlkU3RhcnRBZHZlcnRpc2luZyIsInNldENhbGxiYWNrUGVyaXBoZXJhbE1hbmFnZXJEaWRVcGRhdGVTdGF0ZSIsInNldENhbGxiYWNrRGlkQ2hhbmdlQXV0aG9yaXphdGlvblN0YXR1cyIsImNyZWF0ZUJlYWNvblJlZ2lvbiIsIkJlYWNvblJlZ2lvbiIsImlzQmx1ZXRvb3RoRW5hYmxlZCIsIndoZW4iLCJlbmFibGVCbHVldG9vdGgiLCJkaXNhYmxlQmx1ZXRvb3RoIiwic3RhcnRNb25pdG9yaW5nRm9yUmVnaW9uIiwic3RvcE1vbml0b3JpbmdGb3JSZWdpb24iLCJyZXF1ZXN0U3RhdGVGb3JSZWdpb24iLCJzdGFydFJhbmdpbmdCZWFjb25zSW5SZWdpb24iLCJzdG9wUmFuZ2luZ0JlYWNvbnNJblJlZ2lvbiIsImdldEF1dGhvcml6YXRpb25TdGF0dXMiLCJyZXF1ZXN0V2hlbkluVXNlQXV0aG9yaXphdGlvbiIsInJlcXVlc3RBbHdheXNBdXRob3JpemF0aW9uIiwiZ2V0TW9uaXRvcmVkUmVnaW9ucyIsImdldFJhbmdlZFJlZ2lvbnMiLCJpc1JhbmdpbmdBdmFpbGFibGUiLCJpc01vbml0b3JpbmdBdmFpbGFibGVGb3JDbGFzcyIsInN0YXJ0QWR2ZXJ0aXNpbmciLCJzdG9wQWR2ZXJ0aXNpbmciLCJpc0FkdmVydGlzaW5nQXZhaWxhYmxlIiwiaXNBZHZlcnRpc2luZyIsImRpc2FibGVEZWJ1Z0xvZ3MiLCJlbmFibGVEZWJ1Z05vdGlmaWNhdGlvbnMiLCJkaXNhYmxlRGVidWdOb3RpZmljYXRpb25zIiwiZW5hYmxlRGVidWdMb2dzIiwiYXBwZW5kVG9EZXZpY2VMb2ciLCJibGUiLCJzdGFydFNjYW4iLCJzdG9wU2NhbiIsImNvbm5lY3QiLCJkaXNjb25uZWN0IiwicmVhZCIsIndyaXRlIiwid3JpdGVXaXRob3V0UmVzcG9uc2UiLCJ3cml0ZUNvbW1hbmQiLCJ3YXJuaW5nIiwic3RhcnROb3RpZmljYXRpb24iLCJzdG9wTm90aWZpY2F0aW9uIiwiaXNDb25uZWN0ZWQiLCJlbmFibGUiLCJpc0VuYWJsZWQiLCJibHVldG9vdGhTZXJpYWwiLCJjb25uZWN0SW5zZWN1cmUiLCJsaXN0IiwiZGlzY292ZXJVbnBhaXJlZCIsInNldERldmljZURpc2NvdmVyZWRMaXN0ZW5lciIsImNsZWFyRGV2aWNlRGlzY292ZXJlZExpc3RlbmVyIiwic2hvd0JsdWV0b290aFNldHRpbmdzIiwiYXZhaWxhYmxlIiwicmVhZFVudGlsIiwic3Vic2NyaWJlIiwic3Vic2NyaWJlUmF3RGF0YSIsInVuc3Vic2NyaWJlIiwidW5zdWJzY3JpYmVSYXdEYXRhIiwicmVhZFJTU0kiLCJicmlnaHRuZXNzIiwiZ2V0QnJpZ2h0bmVzcyIsInNldEJyaWdodG5lc3MiLCJzZXRLZWVwU2NyZWVuT24iLCJjcmVhdGVDYWxlbmRhciIsImNhbGVuZGFyIiwiZ2V0Q3JlYXRlQ2FsZW5kYXJPcHRpb25zIiwiY2FsZW5kYXJOYW1lIiwiZGVsZXRlQ2FsZW5kYXIiLCJjcmVhdGVFdmVudCIsImxvY2F0aW9uIiwibm90ZXMiLCJzdGFydERhdGUiLCJlbmREYXRlIiwiRGF0ZSIsImNyZWF0ZUV2ZW50V2l0aE9wdGlvbnMiLCJnZXRDYWxlbmRhck9wdGlvbnMiLCJPYmplY3QiLCJrZXlzIiwiaW5kZXhPZiIsImNyZWF0ZUV2ZW50SW50ZXJhY3RpdmVseSIsImNyZWF0ZUV2ZW50SW5OYW1lZENhbGVuZGFyIiwiZmluZEV2ZW50IiwibGlzdEV2ZW50c0luUmFuZ2UiLCJsaXN0Q2FsZW5kYXJzIiwiZmluZEFsbEV2ZW50c0luTmFtZWRDYWxlbmRhciIsIm1vZGlmeUV2ZW50IiwibmV3VGl0bGUiLCJuZXdMb2NhdGlvbiIsIm5ld05vdGVzIiwibmV3U3RhcnREYXRlIiwibmV3RW5kRGF0ZSIsImRlbGV0ZUV2ZW50IiwiZ2V0UGljdHVyZSIsImNhbWVyYSIsImNsZWFudXAiLCJjYXB0dXJlQXVkaW8iLCJkZXZpY2UiLCJjYXB0dXJlIiwiY2FwdHVyZUltYWdlIiwiY2FwdHVyZVZpZGVvIiwiZXhwaXJ5IiwiY3Z2IiwiemlwIiwic3VwcHJlc3NNYW51YWwiLCJzdXBwcmVzc0NvbmZpcm0iLCJoaWRlTG9nbyIsInNldENhcmRJT1Jlc3BvbnNlRmllbGRzIiwiaXNBcnJheSIsInNldFNjYW5lckNvbmZpZyIsInNjYW5DYXJkIiwiQ2FyZElPIiwibGVuZ3RoIiwiU3RyaW5nIiwiZXhwaXJ5X3llYXIiLCJzdWJzdHIiLCJjb3B5IiwiY2xpcGJvYXJkIiwicGFzdGUiLCJzYXZlIiwiY29udGFjdHMiLCJjcmVhdGUiLCJyZW1vdmUiLCJjbG9uZSIsImZpbmQiLCJmaWVsZHMiLCJwaWNrQ29udGFjdCIsImRhdGUiLCJtb2RlIiwiZGF0ZVBpY2tlciIsImdldERldmljZSIsImdldENvcmRvdmEiLCJnZXRNb2RlbCIsIm1vZGVsIiwiZ2V0TmFtZSIsIm5hbWUiLCJnZXRQbGF0Zm9ybSIsInBsYXRmb3JtIiwiZ2V0VVVJRCIsInV1aWQiLCJnZXRWZXJzaW9uIiwidmVyc2lvbiIsImdldE1hbnVmYWN0dXJlciIsIm1hbnVmYWN0dXJlciIsImdldEN1cnJlbnRBY2NlbGVyYXRpb24iLCJpc1VuZGVmaW5lZCIsImFjY2VsZXJvbWV0ZXIiLCJpc0Z1bmN0aW9uIiwid2F0Y2hBY2NlbGVyYXRpb24iLCJjYW5jZWwiLCJjbGVhcldhdGNoIiwid2F0Y2hJRCIsImZyZXF1ZW5jeSIsImdldEN1cnJlbnRIZWFkaW5nIiwiY29tcGFzcyIsIndhdGNoSGVhZGluZyIsImFsZXJ0IiwiY29uZmlybSIsInByb21wdCIsImlucHV0MSIsImJ1dHRvbkluZGV4IiwiYmVlcCIsImFjdGl2aXR5U3RhcnQiLCJwbGF0Zm9ybUlkIiwiYWN0aXZpdHlTdG9wIiwicHJvZ3Jlc3NTdGFydCIsInByb2dyZXNzU3RvcCIsInByb2dyZXNzVmFsdWUiLCJlbWFpbCIsIm9wZW4iLCJhZGRBbGlhcyIsImJyb3dzZXJJbml0IiwiYXBwSUQiLCJhcHBWZXJzaW9uIiwiZmFjZWJvb2tDb25uZWN0UGx1Z2luIiwibG9naW4iLCJzaG93RGlhbG9nIiwiYXBpIiwiZ2V0QWNjZXNzVG9rZW4iLCJnZXRMb2dpblN0YXR1cyIsImxvZ291dCIsInNldE9wdGlvbnMiLCJGYWNlYm9va0FkcyIsImNyZWF0ZUJhbm5lciIsInJlbW92ZUJhbm5lciIsInNob3dCYW5uZXIiLCJzaG93QmFubmVyQXRYWSIsImhpZGVCYW5uZXIiLCJwcmVwYXJlSW50ZXJzdGl0aWFsIiwic2hvd0ludGVyc3RpdGlhbCIsImNvbnN0YW50IiwiZ2V0RnJlZURpc2tTcGFjZSIsImV4ZWMiLCJjaGVja0RpciIsInRlc3QiLCJyZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMIiwiaXNEaXJlY3RvcnkiLCJjb2RlIiwiY2hlY2tGaWxlIiwiaXNGaWxlIiwiY3JlYXRlRGlyIiwiZXhjbHVzaXZlIiwiZ2V0RGlyZWN0b3J5IiwiY3JlYXRlRmlsZSIsImdldEZpbGUiLCJyZW1vdmVEaXIiLCJzdWNjZXNzIiwiZmlsZVJlbW92ZWQiLCJyZW1vdmVGaWxlIiwicmVtb3ZlUmVjdXJzaXZlbHkiLCJ3cml0ZUZpbGUiLCJjcmVhdGVXcml0ZXIiLCJhcHBlbmQiLCJzZWVrIiwidHJ1bmNhdGUiLCJvbndyaXRlZW5kIiwiZXJyb3IiLCJhYm9ydCIsIndyaXRlRXhpc3RpbmdGaWxlIiwicmVhZEFzVGV4dCIsImZpbGUiLCJGaWxlUmVhZGVyIiwib25sb2FkZW5kIiwidGFyZ2V0IiwicmVzdWx0IiwicmVhZEFzRGF0YVVSTCIsInJlYWRBc0JpbmFyeVN0cmluZyIsInJlYWRBc0FycmF5QnVmZmVyIiwibW92ZUZpbGUiLCJtb3ZlVG8iLCJtb3ZlRGlyIiwiY29weURpciIsImNvcHlUbyIsImNvcHlGaWxlIiwicmVhZEZpbGVNZXRhZGF0YSIsImZpbGVPcGVuZXIyIiwidW5pbnN0YWxsIiwiYXBwSXNJbnN0YWxsZWQiLCJkb3dubG9hZCIsIkZpbGVUcmFuc2ZlciIsImVuY29kZVVSSSIsInRpbWVvdXQiLCJvbnByb2dyZXNzIiwidXBsb2FkIiwiZmxhc2hsaWdodCIsInN3aXRjaE9uIiwic3dpdGNoT2ZmIiwidG9nZ2xlIiwiRmx1cnJ5QWRzIiwiZ2FQbHVnaW4iLCJ0cmFja0V2ZW50IiwidHJhY2tQYWdlIiwic2V0VmFyaWFibGUiLCJleGl0Iiwid2F0Y2hQb3NpdGlvbiIsImdldFByZWZlcnJlZExhbmd1YWdlIiwiZ2xvYmFsaXphdGlvbiIsImdldExvY2FsZU5hbWUiLCJnZXRGaXJzdERheU9mV2VlayIsImRhdGVUb1N0cmluZyIsInN0cmluZ1RvRGF0ZSIsImdldERhdGVQYXR0ZXJuIiwiZ2V0RGF0ZU5hbWVzIiwiaXNEYXlMaWdodFNhdmluZ3NUaW1lIiwibnVtYmVyVG9TdHJpbmciLCJzdHJpbmdUb051bWJlciIsImdldE51bWJlclBhdHRlcm4iLCJnZXRDdXJyZW5jeVBhdHRlcm4iLCJzdGFydFRyYWNrZXJXaXRoSWQiLCJhbmFseXRpY3MiLCJzZXRVc2VySWQiLCJkZWJ1Z01vZGUiLCJ0cmFja1ZpZXciLCJhZGRDdXN0b21EaW1lbnNpb24iLCJwYXJzZUludCIsImlzTmFOIiwidHJhY2tFeGNlcHRpb24iLCJ0cmFja1RpbWluZyIsImFkZFRyYW5zYWN0aW9uIiwiYWRkVHJhbnNhY3Rpb25JdGVtIiwiZ2V0TWFwIiwicGx1Z2luIiwibWFwcyIsImdldEVsZW1lbnRCeUlkIiwiTWFwIiwic2V0RGl2IiwiaXNNYXBMb2FkZWQiLCJhZGRNYXJrZXIiLCJnZXRNYXBUeXBlSWRzIiwibWFwVHlwZUlkIiwic2V0VmlzaWJsZSIsImF1dGgiLCJnb29nbGVwbGF5Z2FtZSIsInNpZ25vdXQiLCJpc1NpZ25lZEluIiwic2hvd1BsYXllciIsInN1Ym1pdFNjb3JlIiwic2hvd0FsbExlYWRlcmJvYXJkcyIsInNob3dMZWFkZXJib2FyZCIsInVubG9ja0FjaGlldmVtZW50IiwiaW5jcmVtZW50QWNoaWV2ZW1lbnQiLCJzaG93QWNoaWV2ZW1lbnRzIiwiZ29vZ2xlcGx1cyIsImlPU0FwaUtleSIsInNpbGVudExvZ2luIiwidHJ5U2lsZW50TG9naW4iLCJoZWFsdGhraXQiLCJjaGVja0F1dGhTdGF0dXMiLCJyZXF1ZXN0QXV0aG9yaXphdGlvbiIsInJlYWRUeXBlcyIsIndyaXRlVHlwZXMiLCJyZWFkRGF0ZU9mQmlydGgiLCJyZWFkR2VuZGVyIiwic2F2ZVdlaWdodCIsInVuaXQiLCJhbW91bnQiLCJyZWFkV2VpZ2h0Iiwic2F2ZUhlaWdodCIsInJlYWRIZWlnaHQiLCJmaW5kV29ya291dHMiLCJzYXZlV29ya291dCIsInF1ZXJ5U2FtcGxlVHlwZSIsInN0YXJ0U2VydmVyIiwiQ29ySHR0cGQiLCJzdG9wU2VydmVyIiwiZ2V0VVJMIiwiZ2V0TG9jYWxQYXRoIiwiaUFkIiwiZ2V0UGljdHVyZXMiLCJpbWFnZVBpY2tlciIsImRlZmF1bHRPcHRpb25zIiwic2V0RGVmYXVsdE9wdGlvbnMiLCJmb3JFYWNoIiwiZCIsImpvaW4iLCJjbG9zZSIsImV4ZWN1dGVTY3JpcHQiLCJpbnNlcnRDU1MiLCJrZWVwQXdha2UiLCJpbnNvbW5pYSIsImFsbG93U2xlZXBBZ2FpbiIsInNoYXJlIiwiSW5zdGFncmFtIiwiaW1hZ2UiLCJjYXB0aW9uIiwiY29uc29sZSIsImlzSW5zdGFsbGVkIiwiJGV2YWxBc3luYyIsImhpZGVBY2Nlc3NvcnlCYXIiLCJpc1Zpc2libGUiLCJjbGVhclNob3dXYXRjaCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCIkJGxpc3RlbmVycyIsImNsZWFySGlkZVdhdGNoIiwiZ2V0Rm9yS2V5IiwiS2V5Y2hhaW4iLCJzZXRGb3JLZXkiLCJyZW1vdmVGb3JLZXkiLCJuYXZpZ2F0ZSIsImxhdW5jaG5hdmlnYXRvciIsImxvY2FsIiwib24iLCJzY2hlZHVsZSIsImFkZCIsIndhcm4iLCJ1cGRhdGUiLCJjbGVhckFsbCIsImNhbmNlbEFsbCIsImlzUHJlc2VudCIsImlzU2NoZWR1bGVkIiwiaXNUcmlnZ2VyZWQiLCJyZWdpc3RlclBlcm1pc3Npb24iLCJnZXRBbGxJZHMiLCJnZXRJZHMiLCJnZXRTY2hlZHVsZWRJZHMiLCJnZXRUcmlnZ2VyZWRJZHMiLCJnZXRBbGwiLCJnZXRTY2hlZHVsZWQiLCJnZXRBbGxTY2hlZHVsZWQiLCJnZXRUcmlnZ2VyZWQiLCJnZXRBbGxUcmlnZ2VyZWQiLCJnZXREZWZhdWx0cyIsInNldERlZmF1bHRzIiwibU1lZGlhIiwic2VydmljZSIsImlzRGVmaW5lZCIsImdldER1cmF0aW9uIiwiZHVyYXRpb24iLCJsb2ciLCJwb3NpdGlvbiIsIm1lZGlhIiwiTWVkaWEiLCJzdGF0dXMiLCJwcm90b3R5cGUiLCJwbGF5IiwicGF1c2UiLCJyZWxlYXNlIiwic2Vla1RvIiwic2V0Vm9sdW1lIiwic3RhcnRSZWNvcmQiLCJzdG9wUmVjb3JkIiwiY3VycmVudFRpbWUiLCJuZXdNZWRpYSIsIk1vYkZveCIsIk1vUHViIiwicHJlbG9hZFNpbXBsZSIsIk5hdGl2ZUF1ZGlvIiwicHJlbG9hZENvbXBsZXgiLCJsb29wIiwidW5sb2FkIiwic2V0Vm9sdW1lRm9yQ29tcGxleEFzc2V0IiwiY29ubmVjdGlvbiIsImdldE5ldHdvcmsiLCJpc09ubGluZSIsIkNvbm5lY3Rpb24iLCJVTktOT1dOIiwiTk9ORSIsImlzT2ZmbGluZSIsImNsZWFyT2ZmbGluZVdhdGNoIiwiY2xlYXJPbmxpbmVXYXRjaCIsInBpbkRpYWxvZyIsInBsdWdpbk5vdEVuYWJsZWRNZXNzYWdlIiwiZGVjb3JhdGVQcm9taXNlIiwic3RvcmUiLCJFcnJvciIsImFyZ3VtZW50cyIsImFwcFByZWZlcmVuY2VzIiwiZmV0Y2giLCJwcmludGVyIiwicHJpbnQiLCJQcm9ncmVzc0luZGljYXRvciIsInNob3dTaW1wbGUiLCJzaG93U2ltcGxlV2l0aExhYmVsIiwic2hvd1NpbXBsZVdpdGhMYWJlbERldGFpbCIsInNob3dEZXRlcm1pbmF0ZSIsInNob3dEZXRlcm1pbmF0ZVdpdGhMYWJlbCIsInNob3dBbm51bGFyIiwic2hvd0FubnVsYXJXaXRoTGFiZWwiLCJzaG93QmFyIiwic2hvd0JhcldpdGhMYWJlbCIsInNob3dTdWNjZXNzIiwic2hvd1RleHQiLCJvbk5vdGlmaWNhdGlvbiIsInJlZ2lzdGVyIiwiZWNiIiwicXVlcnlTZWxlY3RvciIsInB1c2hOb3RpZmljYXRpb24iLCJ1bnJlZ2lzdGVyIiwic2V0QmFkZ2VOdW1iZXIiLCJzZXRBcHBsaWNhdGlvbkljb25CYWRnZU51bWJlciIsImluaXRpYWxpemUiLCJQdXNoTm90aWZpY2F0aW9uIiwiJGVtaXQiLCJvbkVycm9yIiwicmVnaXN0cmF0aW9uSWQiLCJnZXRCYWRnZU51bWJlciIsImdldEFwcGxpY2F0aW9uSWNvbkJhZGdlTnVtYmVyIiwic2V0Q29sb3IiLCJSZWNlbnRzQ29udHJvbCIsInNldERlc2NyaXB0aW9uIiwiY2FwdHVyZVRvRmlsZSIsImV4dGVuc2lvbiIsInF1YWxpdHkiLCJzY3JlZW5zaG90IiwiZmlsZVBhdGgiLCJmaWxlbmFtZSIsImNhcHR1cmVUb1VyaSIsIlVSSSIsInJlcXVlc3RQZXJtaXNzaW9uIiwic2VyaWFsIiwid3JpdGVIZXgiLCJVaW50OEFycmF5IiwicmVnaXN0ZXJSZWFkQ2FsbGJhY2siLCJzZW5kIiwic21zIiwic29jaWFsc2hhcmluZyIsInNoYXJlV2l0aE9wdGlvbnMiLCJzaGFyZVZpYVR3aXR0ZXIiLCJzaGFyZVZpYVdoYXRzQXBwIiwic2hhcmVWaWFGYWNlYm9vayIsInNoYXJlVmlhRmFjZWJvb2tXaXRoUGFzdGVNZXNzYWdlSGludCIsInNoYXJlVmlhU01TIiwic2hhcmVWaWFFbWFpbCIsInNoYXJlVmlhIiwiY2FuU2hhcmVWaWFFbWFpbCIsImNhblNoYXJlVmlhIiwic3Bpbm5lckRpYWxvZyIsInNwbGFzaHNjcmVlbiIsIm9wZW5EQiIsImlzU3RyaW5nIiwiYmdUeXBlIiwic3FsaXRlUGx1Z2luIiwib3BlbkRhdGFiYXNlIiwiZXhlY3V0ZSIsInRyYW5zYWN0aW9uIiwiZXhlY3V0ZVNxbCIsImluc2VydENvbGxlY3Rpb24iLCJzbGljZSIsInNwbGljZSIsIm5lc3RlZEV4ZWN1dGUiLCJkZWxldGVEQiIsImRlbGV0ZURhdGFiYXNlIiwib3ZlcmxheXNXZWJWaWV3IiwiU1RZTEVTIiwiREVGQVVMVCIsIkxJR0hUX0NPTlRFTlQiLCJCTEFDS19UUkFOU0xVQ0VOVCIsIkJMQUNLX09QQVFVRSIsInN0eWxlIiwic3R5bGVMaWdodENvbnRlbnQiLCJzdHlsZUJsYWNrVHJhbnNsdWNlbnQiLCJzdHlsZUJsYWNrT3BhcXVlIiwic3R5bGVDb2xvciIsImJhY2tncm91bmRDb2xvckJ5TmFtZSIsInN0eWxlSGV4IiwiYmFja2dyb3VuZENvbG9yQnlIZXhTdHJpbmciLCJzaG93U2hvcnRUb3AiLCJ0b2FzdCIsInNob3dTaG9ydENlbnRlciIsInNob3dTaG9ydEJvdHRvbSIsInNob3dMb25nVG9wIiwic2hvd0xvbmdDZW50ZXIiLCJzaG93TG9uZ0JvdHRvbSIsInNob3dXaXRoT3B0aW9ucyIsImNoZWNrU3VwcG9ydCIsInRvdWNoaWQiLCJhdXRoZW50aWNhdGUiLCJzcGVhayIsIlRUUyIsInZpYnJhdGUiLCJ2aWJyYXRlV2l0aFBhdHRlcm4iLCJjYW5jZWxWaWJyYXRpb24iLCJzZXRMaW1pdCIsImxpbWl0Iiwic2V0TWF4RHVyYXRpb24iLCJzZXRIaWdoUXVhbGl0eSIsImhpZ2hxdWFsaXR5IiwidXNlRnJvbnRDYW1lcmEiLCJmcm9udGNhbWVyYSIsInNldFBvcnRyYWl0T3ZlcmxheSIsInBvcnRyYWl0T3ZlcmxheSIsInNldExhbmRzY2FwZU92ZXJsYXkiLCJsYW5kc2NhcGVPdmVybGF5Iiwic2V0T3ZlcmxheVRleHQiLCJvdmVybGF5VGV4dCIsInZpZGVvY2FwdHVyZXBsdXMiLCJ1bnppcCIsIiRzY29wZSIsImdvYmFjayIsImhpc3RvcnkiLCJnbyIsInN1Ym1pdENoaWxkIiwiY2hpbGQiLCJ2YWx1ZSIsIiRjb3Jkb3ZhQ2FtZXJhIiwiJGNvcmRvdmFQbHVnaW4iLCJzb21lRnVuY3Rpb24iLCJ0YWtlUGljdHVyZSIsIm9wdGlvbnMiLCJkZXN0aW5hdGlvblR5cGUiLCJDYW1lcmEiLCJEZXN0aW5hdGlvblR5cGUiLCJEQVRBX1VSTCIsInNvdXJjZVR5cGUiLCJQaWN0dXJlU291cmNlVHlwZSIsIkNBTUVSQSIsImFsbG93RWRpdCIsImVuY29kaW5nVHlwZSIsIkVuY29kaW5nVHlwZSIsIkpQRUciLCJ0YXJnZXRXaWR0aCIsInRhcmdldEhlaWdodCIsInBvcG92ZXJPcHRpb25zIiwiQ2FtZXJhUG9wb3Zlck9wdGlvbnMiLCJzYXZlVG9QaG90b0FsYnVtIiwiY29ycmVjdE9yaWVudGF0aW9uIiwiaW1hZ2VEYXRhIiwiaW1nVVJJIiwiZXJyIiwidGhlbWUiLCJzZXRUaGVtZSIsInRoZW1lSW1hZ2UiLCIkaW9uaWNNb2RhbCIsIiR3aW5kb3ciLCJmcm9tVGVtcGxhdGVVcmwiLCJpZCIsInNjb3BlIiwiYmFja2Ryb3BDbGlja1RvQ2xvc2UiLCJhbmltYXRpb24iLCJtb2RhbCIsIm9Nb2RhbDEiLCJvcGVuTW9kYWwiLCJpbmRleCIsIm9Nb2RhbDIiLCJjbG9zZU1vZGFsIiwiJG9uIiwiY2hvaWNlIiwiJGF1dGgiLCIkc3RhdGUiLCJsb2dpblNlcnZpY2UiLCJsb2dpbkNoaWxkIiwidXNlciIsInVzZXJMb2dpbiIsInJlc3BvbnNlIiwic2V0VG9rZW4iLCJ1c2VyU2VydmljZSIsInVzZXJUb2tlbiIsImdldFVzZXJJbmZvIiwic3ViIiwic3VibWl0QmFubmVyIiwiYmFubmVyIiwiYmFubmVySW5mbyIsInVzZXJfaG91c2Vob2xkIiwidXNlcl9iYW5uZXJfaW1hZ2UiLCJwb3N0YmFubmVyIiwicmVzIiwiaG91c2Vob2xkIiwiZ2V0YmFubmVyIiwiZGF0YSIsImdldFdlYXRoZXIiLCJ3ZWF0aGVyIiwibWFrZVVzZXIiLCJuZXdVc2VyIiwicmV2ZWFsZXIiLCJvTW9kYWwzIiwib01vZGFsNCIsIm9Nb2RhbDUiLCIkaHR0cCIsIm1ldGhvZCIsIiRxIiwiZ2V0UGF5bG9hZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJ1c2VySWQiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBQSxRQUFRQyxNQUFSLENBQWUsT0FBZixFQUF3QixDQUFDLE9BQUQsRUFBVSxZQUFWLENBQXhCLEVBQ0NDLE1BREQsQ0FDUSxVQUFT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aEMsRUFBK0MsVUFBU21QLEtBQVQsRUFBZUUsRUFBZixFQUFrQmhDLEtBQWxCLEVBQXdCOztBQUV2RSxNQUFJYSxNQUFKO0FBQ0EsT0FBS0gsV0FBTCxHQUFtQlYsTUFBTWlDLFVBQU4sRUFBbkI7O0FBR0EsT0FBS2hCLFVBQUwsR0FBa0IsVUFBU0osTUFBVCxFQUFnQjtBQUNoQ3pRLFlBQVEyQyxHQUFSLENBQVk4TixNQUFaO0FBQ0F6USxZQUFRMkMsR0FBUixDQUFZOE4sT0FBT0csaUJBQW5CO0FBQ0EsV0FBT2MsTUFBTTtBQUNYQyxjQUFRLEtBREc7QUFFWHJ3QixXQUFJLGFBQWFtdkIsT0FBT0UsY0FGYjtBQUdYTSxZQUFNYSxLQUFLQyxTQUFMLENBQWUsRUFBQ25CLG1CQUFrQkgsT0FBT0csaUJBQTFCLEVBQWY7QUFISyxLQUFOLENBQVA7QUFLRCxHQVJEOztBQVVBLE9BQUtJLFNBQUwsR0FBaUIsVUFBU2dCLE1BQVQsRUFBZ0I7QUFDL0JoUyxZQUFRMkMsR0FBUixDQUFZcVAsTUFBWjtBQUNBLFdBQU9OLE1BQU07QUFDWEMsY0FBUSxLQURHO0FBRVhyd0IsV0FBSSxhQUFhMHdCO0FBRk4sS0FBTixDQUFQO0FBSUQsR0FORDs7QUFTQSxPQUFLZCxVQUFMLEdBQWtCLFlBQVU7QUFDNUIsV0FBT1EsTUFBTTtBQUNUQyxjQUFRLEtBREM7QUFFVHJ3QixXQUFJO0FBRkssS0FBTixDQUFQO0FBS0MsR0FORDtBQWFDLENBdENELEdBc0NHIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIElvbmljIFN0YXJ0ZXIgQXBwXHJcblxyXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xyXG4vLyAnc3RhcnRlcicgaXMgdGhlIG5hbWUgb2YgdGhpcyBhbmd1bGFyIG1vZHVsZSBleGFtcGxlIChhbHNvIHNldCBpbiBhIDxib2R5PiBhdHRyaWJ1dGUgaW4gaW5kZXguaHRtbClcclxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ2Nob3JlJywgWydpb25pYycsICdzYXRlbGxpemVyJ10pXHJcbi5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJGF1dGhQcm92aWRlcil7XHJcbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShcIi9jaGlsZC9ob21lXCIpO1xyXG4gICRzdGF0ZVByb3ZpZGVyXHJcbiAgLnN0YXRlKCdhZGRDaGlsZCcse1xyXG4gICAgdXJsOlwiL2FkZENoaWxkXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9hZGRDaGlsZC5odG1sXCIsXHJcbiAgICBjb250cm9sbGVyOiBcImFkZENoaWxkQ3RybFwiXHJcbiAgfSlcclxuICAuc3RhdGUoJ2Fzc2lnbkNob3JlJyx7XHJcbiAgICB1cmw6XCIvYXNzaWduQ2hvcmVcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2Fzc2lnbkNob3JlLmh0bWxcIixcclxuICAgIGNvbnRyb2xsZXI6IFwiYXNzaWduQ2hvcmVDdHJsXCJcclxuICB9KVxyXG4gIC5zdGF0ZSgnZWRpdENoaWxkJyx7XHJcbiAgICB1cmw6XCIvZWRpdENoaWxkLzppZFwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvZWRpdENoaWxkLmh0bWxcIixcclxuICAgIGNvbnRyb2xsZXI6IFwiZWRpdENoaWxkQ3RybFwiXHJcbiAgfSlcclxuICAuc3RhdGUoJ2hpc3RvcnknLHtcclxuICAgIHVybDpcIi9oaXN0b3J5XCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9oaXN0b3J5Lmh0bWxcIixcclxuICAgIGNvbnRyb2xsZXI6IFwiaGlzdG9yeUN0cmxcIlxyXG4gIH0pXHJcbiAgLnN0YXRlKCdob21lJyx7XHJcbiAgICB1cmw6XCIvaG9tZVwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvaG9tZS5odG1sXCIsXHJcbiAgICBjb250cm9sbGVyOiBcImhvbWVDdHJsXCJcclxuICB9KVxyXG4gIC5zdGF0ZSgnbG9naW4nLHtcclxuICAgIHVybDpcIi9sb2dpblwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvTG9naW4uaHRtbFwiLFxyXG4gICAgY29udHJvbGxlcjogXCJsb2dpbkN0cmxcIlxyXG4gIH0pXHJcbiAgLnN0YXRlKCdtYWtlQ2hvcmUnLHtcclxuICAgIHVybDpcIi9tYWtlQ2hvcmVcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL21ha2VDaG9yZS5odG1sXCIsXHJcbiAgICBjb250cm9sbGVyOiBcIm1ha2VDaG9yZUN0cmxcIlxyXG4gIH0pXHJcbiAgLnN0YXRlKCdzZXRSZXdhcmRzJyx7XHJcbiAgICB1cmw6XCIvc2V0UmV3YXJkcy86aWRcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL3NldFJld2FyZHMuaHRtbFwiLFxyXG4gICAgY29udHJvbGxlcjogXCJzZXRSZXdhcmRzQ3RybFwiXHJcbiAgfSlcclxuICAuc3RhdGUoJ3NldHRpbmdzJyx7XHJcbiAgICB1cmw6XCIvc2V0dGluZ3NcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL3NldHRpbmdzLmh0bWxcIixcclxuICAgIGNvbnRyb2xsZXI6IFwic2V0dGluZ3NDdHJsXCJcclxuICB9KVxyXG4gIC5zdGF0ZSgndHJhY2tlcicse1xyXG4gICAgdXJsOlwiL3RyYWNrZXIvOmlkXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy90cmFja2VyLmh0bWxcIixcclxuICAgIGNvbnRyb2xsZXI6IFwidHJhY2tlckN0cmxcIlxyXG4gIH0pXHJcbiAgLnN0YXRlKCd1c2VySW5mbycse1xyXG4gICAgdXJsOlwiL3VzZXJJbmZvXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy91c2VySW5mby5odG1sXCIsXHJcbiAgICBjb250cm9sbGVyOiBcInVzZXJJbmZvQ3RybFwiXHJcbiAgfSlcclxuICAuc3RhdGUoJ2NoaWxkQmFuaycse1xyXG4gICAgdXJsOlwiL2NoaWxkL2JhbmtcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2NoaWxkQmFuay5odG1sXCIsXHJcbiAgICBjb250cm9sbGVyOiBcImNoaWxkQmFua0N0cmxcIlxyXG4gIH0pXHJcbiAgLnN0YXRlKCdjaGlsZEhvbWUnLHtcclxuICAgIHVybDpcIi9jaGlsZC9ob21lXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9jaGlsZEhvbWUuaHRtbFwiLFxyXG4gICAgY29udHJvbGxlcjogXCJjaGlsZEhvbWVDdHJsXCJcclxuICB9KVxyXG4gIC5zdGF0ZSgnY2hpbGRMb2dpbicse1xyXG4gICAgdXJsOlwiL2NoaWxkL2xvZ2luXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9jaGlsZExvZ2luLmh0bWxcIixcclxuICAgIGNvbnRyb2xsZXI6IFwiY2hpbGRMb2dpbkN0cmxcIlxyXG4gIH0pXHJcblxyXG4gICRhdXRoUHJvdmlkZXIuZmFjZWJvb2soe1xyXG4gICAgY2xpZW50SWQ6ICczMzIyNzIwNTcxMzI2ODEnXHJcbiAgfSk7XHJcblxyXG4gIC8vIE9wdGlvbmFsOiBGb3IgY2xpZW50LXNpZGUgdXNlIChJbXBsaWNpdCBHcmFudCksIHNldCByZXNwb25zZVR5cGUgdG8gJ3Rva2VuJyAoZGVmYXVsdDogJ2NvZGUnKVxyXG4gICRhdXRoUHJvdmlkZXIuZmFjZWJvb2soe1xyXG4gICAgY2xpZW50SWQ6ICczMzIyNzIwNTcxMzI2ODEnLFxyXG4gICAgcmVzcG9uc2VUeXBlOiAndG9rZW4nXHJcbiAgfSk7XHJcblxyXG4gICRhdXRoUHJvdmlkZXIuZ29vZ2xlKHtcclxuICAgIGNsaWVudElkOiAnMjc1MzUyOTYwOTQ2LTVyY2FuM3FraGxzYzdtNTBoZXY1ZG4yZTJjYWU5bWJwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tJyxcclxuICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODEwMC8jL2xvZ2luLydcclxuICB9KTtcclxufSlcclxuXHJcblxyXG5cclxuLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xyXG4gICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgaWYod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xyXG4gICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXHJcbiAgICAgIC8vIGZvciBmb3JtIGlucHV0cylcclxuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcclxuXHJcbiAgICAgIC8vIERvbid0IHJlbW92ZSB0aGlzIGxpbmUgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZy4gSXQgc3RvcHMgdGhlIHZpZXdwb3J0XHJcbiAgICAgIC8vIGZyb20gc25hcHBpbmcgd2hlbiB0ZXh0IGlucHV0cyBhcmUgZm9jdXNlZC4gSW9uaWMgaGFuZGxlcyB0aGlzIGludGVybmFsbHkgZm9yXHJcbiAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxyXG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbCh0cnVlKTtcclxuICAgIH1cclxuICAgIGlmKHdpbmRvdy5TdGF0dXNCYXIpIHtcclxuICAgICAgU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KVxyXG4iLCIvKiFcclxuICogbmdDb3Jkb3ZhXHJcbiAqIHYwLjEuMjctYWxwaGFcclxuICogQ29weXJpZ2h0IDIwMTUgRHJpZnR5IENvLiBodHRwOi8vZHJpZnR5LmNvbS9cclxuICogU2VlIExJQ0VOU0UgaW4gdGhpcyByZXBvc2l0b3J5IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uXHJcbiAqL1xyXG4hZnVuY3Rpb24oKXthbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YVwiLFtcIm5nQ29yZG92YS5wbHVnaW5zXCJdKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLjNkdG91Y2hcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhM0RUb3VjaFwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7dmFyIG49W10scj17fSxvPWZ1bmN0aW9uKGUpe3JldHVybiBmdW5jdGlvbihuKXtmb3IodmFyIHIgaW4gZSluLnR5cGU9PT1yJiZlW3JdKCl9fTtyZXR1cm57aXNBdmFpbGFibGU6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIHdpbmRvdy5jb3Jkb3ZhP3dpbmRvdy5UaHJlZURlZVRvdWNoP3dpbmRvdy5UaHJlZURlZVRvdWNoLmlzQXZhaWxhYmxlKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KTpuLnJlamVjdChcIkNvdWxkIG5vdCBmaW5kIDNEIHRvdWNoIHBsdWdpblwiKTpuLnJlamVjdChcIk5vdCBzdXBwb3J0ZWQgaW4gYnJvd3NlclwiKSxuLnByb21pc2V9LGFkZFF1aWNrQWN0aW9uOmZ1bmN0aW9uKHQsaSxhLGMsdSxzKXt2YXIgbD1lLmRlZmVyKCksZj17dHlwZTp0LHRpdGxlOmksc3VidGl0bGU6dX07cmV0dXJuIGEmJihmLmljb25UeXBlPWEpLGMmJihmLmljb25UZW1wbGF0ZT1jKSx0aGlzLmlzQXZhaWxhYmxlKCkudGhlbihmdW5jdGlvbigpe24ucHVzaChmKSxyW3RdPXMsd2luZG93LlRocmVlRGVlVG91Y2guY29uZmlndXJlUXVpY2tBY3Rpb25zKG4pLHdpbmRvdy5UaHJlZURlZVRvdWNoLm9uSG9tZUljb25QcmVzc2VkPW8ociksbC5yZXNvbHZlKG4pfSxmdW5jdGlvbihlKXtsLnJlamVjdChlKX0pLGwucHJvbWlzZX0sYWRkUXVpY2tBY3Rpb25IYW5kbGVyOmZ1bmN0aW9uKG4sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiB0aGlzLmlzQXZhaWxhYmxlKCkudGhlbihmdW5jdGlvbigpe3Jbbl09dCx3aW5kb3cuVGhyZWVEZWVUb3VjaC5vbkhvbWVJY29uUHJlc3NlZD1vKHIpLGkucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKGUpe2kucmVqZWN0KGUpfSksaS5wcm9taXNlfSxlbmFibGVMaW5rUHJldmlldzpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gdGhpcy5pc0F2YWlsYWJsZSgpLnRoZW4oZnVuY3Rpb24oKXt3aW5kb3cuVGhyZWVEZWVUb3VjaC5lbmFibGVMaW5rUHJldmlldygpLG4ucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxhZGRGb3JjZVRvdWNoSGFuZGxlcjpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIHRoaXMuaXNBdmFpbGFibGUoKS50aGVuKGZ1bmN0aW9uKCl7d2luZG93LlRocmVlRGVlVG91Y2gud2F0Y2hGb3JjZVRvdWNoZXMobiksci5yZXNvbHZlKCEwKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmFjdGlvblNoZWV0XCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUFjdGlvblNoZWV0XCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntzaG93OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmFjdGlvbnNoZWV0LnNob3cocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9KSxvLnByb21pc2V9LGhpZGU6ZnVuY3Rpb24oKXtyZXR1cm4gbi5wbHVnaW5zLmFjdGlvbnNoZWV0LmhpZGUoKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuYWRNb2JcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQWRNb2JcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2NyZWF0ZUJhbm5lclZpZXc6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuQWRNb2IuY3JlYXRlQmFubmVyVmlldyhyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sY3JlYXRlSW50ZXJzdGl0aWFsVmlldzpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5BZE1vYi5jcmVhdGVJbnRlcnN0aXRpYWxWaWV3KHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxyZXF1ZXN0QWQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuQWRNb2IucmVxdWVzdEFkKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93QWQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuQWRNb2Iuc2hvd0FkKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxyZXF1ZXN0SW50ZXJzdGl0aWFsQWQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuQWRNb2IucmVxdWVzdEludGVyc3RpdGlhbEFkKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5hcHBBdmFpbGFiaWxpdHlcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQXBwQXZhaWxhYmlsaXR5XCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57Y2hlY2s6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBhcHBBdmFpbGFiaWxpdHkuY2hlY2sobixmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5hcHBSYXRlXCIsW10pLnByb3ZpZGVyKFwiJGNvcmRvdmFBcHBSYXRlXCIsW2Z1bmN0aW9uKCl7dGhpcy5zZXRQcmVmZXJlbmNlcz1mdW5jdGlvbihlKXtlJiZhbmd1bGFyLmlzT2JqZWN0KGUpJiYoQXBwUmF0ZS5wcmVmZXJlbmNlcy51c2VMYW5ndWFnZT1lLmxhbmd1YWdlfHxudWxsLEFwcFJhdGUucHJlZmVyZW5jZXMuZGlzcGxheUFwcE5hbWU9ZS5hcHBOYW1lfHxcIlwiLEFwcFJhdGUucHJlZmVyZW5jZXMucHJvbXB0QWdhaW5Gb3JFYWNoTmV3VmVyc2lvbj1lLnByb21wdEZvck5ld1ZlcnNpb258fCEwLEFwcFJhdGUucHJlZmVyZW5jZXMub3BlblN0b3JlSW5BcHA9ZS5vcGVuU3RvcmVJbkFwcHx8ITEsQXBwUmF0ZS5wcmVmZXJlbmNlcy51c2VzVW50aWxQcm9tcHQ9ZS51c2VzVW50aWxQcm9tcHR8fDMsQXBwUmF0ZS5wcmVmZXJlbmNlcy51c2VDdXN0b21SYXRlRGlhbG9nPWUudXNlQ3VzdG9tUmF0ZURpYWxvZ3x8ITEsQXBwUmF0ZS5wcmVmZXJlbmNlcy5zdG9yZUFwcFVSTC5pb3M9ZS5pb3NVUkx8fG51bGwsQXBwUmF0ZS5wcmVmZXJlbmNlcy5zdG9yZUFwcFVSTC5hbmRyb2lkPWUuYW5kcm9pZFVSTHx8bnVsbCxBcHBSYXRlLnByZWZlcmVuY2VzLnN0b3JlQXBwVVJMLmJsYWNrYmVycnk9ZS5ibGFja2JlcnJ5VVJMfHxudWxsLEFwcFJhdGUucHJlZmVyZW5jZXMuc3RvcmVBcHBVUkwud2luZG93czg9ZS53aW5kb3dzVVJMfHxudWxsKX0sdGhpcy5zZXRDdXN0b21Mb2NhbGU9ZnVuY3Rpb24oZSl7dmFyIG49e3RpdGxlOlwiUmF0ZSAlQFwiLG1lc3NhZ2U6XCJJZiB5b3UgZW5qb3kgdXNpbmcgJUAsIHdvdWxkIHlvdSBtaW5kIHRha2luZyBhIG1vbWVudCB0byByYXRlIGl0PyBJdCB3b27igJl0IHRha2UgbW9yZSB0aGFuIGEgbWludXRlLiBUaGFua3MgZm9yIHlvdXIgc3VwcG9ydCFcIixjYW5jZWxCdXR0b25MYWJlbDpcIk5vLCBUaGFua3NcIixsYXRlckJ1dHRvbkxhYmVsOlwiUmVtaW5kIE1lIExhdGVyXCIscmF0ZUJ1dHRvbkxhYmVsOlwiUmF0ZSBJdCBOb3dcIn07bj1hbmd1bGFyLmV4dGVuZChuLGUpLEFwcFJhdGUucHJlZmVyZW5jZXMuY3VzdG9tTG9jYWxlPW59LHRoaXMuJGdldD1bXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntwcm9tcHRGb3JSYXRpbmc6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpLG89QXBwUmF0ZS5wcm9tcHRGb3JSYXRpbmcobik7cmV0dXJuIHIucmVzb2x2ZShvKSxyLnByb21pc2V9LG5hdmlnYXRlVG9BcHBTdG9yZTpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKSxyPUFwcFJhdGUubmF2aWdhdGVUb0FwcFN0b3JlKCk7cmV0dXJuIG4ucmVzb2x2ZShyKSxuLnByb21pc2V9LG9uQnV0dG9uQ2xpY2tlZDpmdW5jdGlvbihlKXtBcHBSYXRlLnByZWZlcmVuY2VzLmNhbGxiYWNrcy5vbkJ1dHRvbkNsaWNrZWQ9ZS5iaW5kKHRoaXMpfSxvblJhdGVEaWFsb2dTaG93OmZ1bmN0aW9uKGUpe0FwcFJhdGUucHJlZmVyZW5jZXMuY2FsbGJhY2tzLm9uUmF0ZURpYWxvZ1Nob3c9ZS5iaW5kKHRoaXMpfX19XX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmFwcFZlcnNpb25cIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQXBwVmVyc2lvblwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2dldEFwcE5hbWU6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEuZ2V0QXBwVmVyc2lvbi5nZXRBcHBOYW1lKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0pLG4ucHJvbWlzZX0sZ2V0UGFja2FnZU5hbWU6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEuZ2V0QXBwVmVyc2lvbi5nZXRQYWNrYWdlTmFtZShmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9KSxuLnByb21pc2V9LGdldFZlcnNpb25OdW1iZXI6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEuZ2V0QXBwVmVyc2lvbi5nZXRWZXJzaW9uTnVtYmVyKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0pLG4ucHJvbWlzZX0sZ2V0VmVyc2lvbkNvZGU6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEuZ2V0QXBwVmVyc2lvbi5nZXRWZXJzaW9uQ29kZShmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9KSxuLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmJhY2tncm91bmRHZW9sb2NhdGlvblwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFCYWNrZ3JvdW5kR2VvbG9jYXRpb25cIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2luaXQ6ZnVuY3Rpb24oKXtuLm5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oZnVuY3Rpb24oZSl7cmV0dXJuIGV9KX0sY29uZmlndXJlOmZ1bmN0aW9uKHIpe3RoaXMuaW5pdCgpO3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmJhY2tncm91bmRHZW9Mb2NhdGlvbi5jb25maWd1cmUoZnVuY3Rpb24oZSl7by5ub3RpZnkoZSksbi5wbHVnaW5zLmJhY2tncm91bmRHZW9Mb2NhdGlvbi5maW5pc2goKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9LHIpLHRoaXMuc3RhcnQoKSxvLnByb21pc2V9LHN0YXJ0OmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuYmFja2dyb3VuZEdlb0xvY2F0aW9uLnN0YXJ0KGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHN0b3A6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5iYWNrZ3JvdW5kR2VvTG9jYXRpb24uc3RvcChmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5iYWRnZVwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFCYWRnZVwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2hhc1Blcm1pc3Npb246ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24uYmFkZ2UuaGFzUGVybWlzc2lvbihmdW5jdGlvbihlKXtlP24ucmVzb2x2ZSghMCk6bi5yZWplY3QoXCJZb3UgZG8gbm90IGhhdmUgcGVybWlzc2lvblwiKX0pLG4ucHJvbWlzZX0scHJvbXB0Rm9yUGVybWlzc2lvbjpmdW5jdGlvbigpe3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmJhZGdlLnByb21wdEZvclBlcm1pc3Npb24oKX0sc2V0OmZ1bmN0aW9uKG4scixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24uYmFkZ2UuaGFzUGVybWlzc2lvbihmdW5jdGlvbihlKXtlP3QucmVzb2x2ZShjb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmJhZGdlLnNldChuLHIsbykpOnQucmVqZWN0KFwiWW91IGRvIG5vdCBoYXZlIHBlcm1pc3Npb24gdG8gc2V0IEJhZGdlXCIpfSksdC5wcm9taXNlfSxnZXQ6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24uYmFkZ2UuaGFzUGVybWlzc2lvbihmdW5jdGlvbihlKXtlP2NvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24uYmFkZ2UuZ2V0KGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0pOm4ucmVqZWN0KFwiWW91IGRvIG5vdCBoYXZlIHBlcm1pc3Npb24gdG8gZ2V0IEJhZGdlXCIpfSksbi5wcm9taXNlfSxjbGVhcjpmdW5jdGlvbihuLHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5iYWRnZS5oYXNQZXJtaXNzaW9uKGZ1bmN0aW9uKGUpe2U/by5yZXNvbHZlKGNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24uYmFkZ2UuY2xlYXIobixyKSk6by5yZWplY3QoXCJZb3UgZG8gbm90IGhhdmUgcGVybWlzc2lvbiB0byBjbGVhciBCYWRnZVwiKX0pLG8ucHJvbWlzZX0saW5jcmVhc2U6ZnVuY3Rpb24obixyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gdGhpcy5oYXNQZXJtaXNzaW9uKCkudGhlbihmdW5jdGlvbigpe3QucmVzb2x2ZShjb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmJhZGdlLmluY3JlYXNlKG4scixvKSl9LGZ1bmN0aW9uKCl7dC5yZWplY3QoXCJZb3UgZG8gbm90IGhhdmUgcGVybWlzc2lvbiB0byBpbmNyZWFzZSBCYWRnZVwiKX0pLHQucHJvbWlzZX0sZGVjcmVhc2U6ZnVuY3Rpb24obixyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gdGhpcy5oYXNQZXJtaXNzaW9uKCkudGhlbihmdW5jdGlvbigpe3QucmVzb2x2ZShjb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmJhZGdlLmRlY3JlYXNlKG4scixvKSl9LGZ1bmN0aW9uKCl7dC5yZWplY3QoXCJZb3UgZG8gbm90IGhhdmUgcGVybWlzc2lvbiB0byBkZWNyZWFzZSBCYWRnZVwiKX0pLHQucHJvbWlzZX0sY29uZmlndXJlOmZ1bmN0aW9uKGUpe3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmJhZGdlLmNvbmZpZ3VyZShlKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuYmFyY29kZVNjYW5uZXJcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQmFyY29kZVNjYW5uZXJcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntzY2FuOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLmJhcmNvZGVTY2FubmVyLnNjYW4oZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbiksci5wcm9taXNlfSxlbmNvZGU6ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG49bnx8XCJURVhUX1RZUEVcIixjb3Jkb3ZhLnBsdWdpbnMuYmFyY29kZVNjYW5uZXIuZW5jb2RlKG4scixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5iYXR0ZXJ5U3RhdHVzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUJhdHRlcnlTdGF0dXNcIixbXCIkcm9vdFNjb3BlXCIsXCIkd2luZG93XCIsXCIkdGltZW91dFwiLGZ1bmN0aW9uKGUsbixyKXt2YXIgbz1mdW5jdGlvbihuKXtyKGZ1bmN0aW9uKCl7ZS4kYnJvYWRjYXN0KFwiJGNvcmRvdmFCYXR0ZXJ5U3RhdHVzOnN0YXR1c1wiLG4pfSl9LHQ9ZnVuY3Rpb24obil7cihmdW5jdGlvbigpe2UuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhQmF0dGVyeVN0YXR1czpjcml0aWNhbFwiLG4pfSl9LGk9ZnVuY3Rpb24obil7cihmdW5jdGlvbigpe2UuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhQmF0dGVyeVN0YXR1czpsb3dcIixuKX0pfTtyZXR1cm4gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRldmljZXJlYWR5XCIsZnVuY3Rpb24oKXtuYXZpZ2F0b3IuYmF0dGVyeSYmKG4uYWRkRXZlbnRMaXN0ZW5lcihcImJhdHRlcnlzdGF0dXNcIixvLCExKSxuLmFkZEV2ZW50TGlzdGVuZXIoXCJiYXR0ZXJ5Y3JpdGljYWxcIix0LCExKSxuLmFkZEV2ZW50TGlzdGVuZXIoXCJiYXR0ZXJ5bG93XCIsaSwhMSkpfSwhMSksITB9XSkucnVuKFtcIiRpbmplY3RvclwiLGZ1bmN0aW9uKGUpe2UuZ2V0KFwiJGNvcmRvdmFCYXR0ZXJ5U3RhdHVzXCIpfV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuYmVhY29uXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUJlYWNvblwiLFtcIiR3aW5kb3dcIixcIiRyb290U2NvcGVcIixcIiR0aW1lb3V0XCIsXCIkcVwiLGZ1bmN0aW9uKGUsbixyLG8pe3ZhciB0PW51bGwsaT1udWxsLGE9bnVsbCxjPW51bGwsdT1udWxsLHM9bnVsbCxsPW51bGwsZj1udWxsO3JldHVybiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZGV2aWNlcmVhZHlcIixmdW5jdGlvbigpe2lmKGUuY29yZG92YSYmZS5jb3Jkb3ZhLnBsdWdpbnMmJmUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlcil7dmFyIG89bmV3IGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5EZWxlZ2F0ZTtvLmRpZERldGVybWluZVN0YXRlRm9yUmVnaW9uPWZ1bmN0aW9uKGUpe3IoZnVuY3Rpb24oKXtuLiRicm9hZGNhc3QoXCIkY29yZG92YUJlYWNvbjpkaWREZXRlcm1pbmVTdGF0ZUZvclJlZ2lvblwiLGUpfSksdCYmdChlKX0sby5kaWRTdGFydE1vbml0b3JpbmdGb3JSZWdpb249ZnVuY3Rpb24oZSl7cihmdW5jdGlvbigpe24uJGJyb2FkY2FzdChcIiRjb3Jkb3ZhQmVhY29uOmRpZFN0YXJ0TW9uaXRvcmluZ0ZvclJlZ2lvblwiLGUpfSksaSYmaShlKX0sby5kaWRFeGl0UmVnaW9uPWZ1bmN0aW9uKGUpe3IoZnVuY3Rpb24oKXtuLiRicm9hZGNhc3QoXCIkY29yZG92YUJlYWNvbjpkaWRFeGl0UmVnaW9uXCIsZSl9KSxhJiZhKGUpfSxvLmRpZEVudGVyUmVnaW9uPWZ1bmN0aW9uKGUpe3IoZnVuY3Rpb24oKXtuLiRicm9hZGNhc3QoXCIkY29yZG92YUJlYWNvbjpkaWRFbnRlclJlZ2lvblwiLGUpfSksYyYmYyhlKX0sby5kaWRSYW5nZUJlYWNvbnNJblJlZ2lvbj1mdW5jdGlvbihlKXtyKGZ1bmN0aW9uKCl7bi4kYnJvYWRjYXN0KFwiJGNvcmRvdmFCZWFjb246ZGlkUmFuZ2VCZWFjb25zSW5SZWdpb25cIixlKX0pLHUmJnUoZSl9LG8ucGVyaXBoZXJhbE1hbmFnZXJEaWRTdGFydEFkdmVydGlzaW5nPWZ1bmN0aW9uKGUpe3IoZnVuY3Rpb24oKXtuLiRicm9hZGNhc3QoXCIkY29yZG92YUJlYWNvbjpwZXJpcGhlcmFsTWFuYWdlckRpZFN0YXJ0QWR2ZXJ0aXNpbmdcIixlKX0pLHMmJnMoZSl9LG8ucGVyaXBoZXJhbE1hbmFnZXJEaWRVcGRhdGVTdGF0ZT1mdW5jdGlvbihlKXtyKGZ1bmN0aW9uKCl7bi4kYnJvYWRjYXN0KFwiJGNvcmRvdmFCZWFjb246cGVyaXBoZXJhbE1hbmFnZXJEaWRVcGRhdGVTdGF0ZVwiLGUpfSksbCYmbChlKX0sby5kaWRDaGFuZ2VBdXRob3JpemF0aW9uU3RhdHVzPWZ1bmN0aW9uKGUpe3IoZnVuY3Rpb24oKXtuLiRicm9hZGNhc3QoXCIkY29yZG92YUJlYWNvbjpkaWRDaGFuZ2VBdXRob3JpemF0aW9uU3RhdHVzXCIsZSl9KSxmJiZmKGUpfSxlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuc2V0RGVsZWdhdGUobyl9fSwhMSkse3NldENhbGxiYWNrRGlkRGV0ZXJtaW5lU3RhdGVGb3JSZWdpb246ZnVuY3Rpb24oZSl7dD1lfSxzZXRDYWxsYmFja0RpZFN0YXJ0TW9uaXRvcmluZ0ZvclJlZ2lvbjpmdW5jdGlvbihlKXtpPWV9LHNldENhbGxiYWNrRGlkRXhpdFJlZ2lvbjpmdW5jdGlvbihlKXthPWV9LHNldENhbGxiYWNrRGlkRW50ZXJSZWdpb246ZnVuY3Rpb24oZSl7Yz1lfSxzZXRDYWxsYmFja0RpZFJhbmdlQmVhY29uc0luUmVnaW9uOmZ1bmN0aW9uKGUpe3U9ZX0sc2V0Q2FsbGJhY2tQZXJpcGhlcmFsTWFuYWdlckRpZFN0YXJ0QWR2ZXJ0aXNpbmc6ZnVuY3Rpb24oZSl7cz1lfSxzZXRDYWxsYmFja1BlcmlwaGVyYWxNYW5hZ2VyRGlkVXBkYXRlU3RhdGU6ZnVuY3Rpb24oZSl7bD1lfSxzZXRDYWxsYmFja0RpZENoYW5nZUF1dGhvcml6YXRpb25TdGF0dXM6ZnVuY3Rpb24oZSl7Zj1lfSxjcmVhdGVCZWFjb25SZWdpb246ZnVuY3Rpb24obixyLG8sdCxpKXtyZXR1cm4gbz1vfHx2b2lkIDAsdD10fHx2b2lkIDAsbmV3IGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5CZWFjb25SZWdpb24obixyLG8sdCxpKX0saXNCbHVldG9vdGhFbmFibGVkOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuaXNCbHVldG9vdGhFbmFibGVkKCkpfSxlbmFibGVCbHVldG9vdGg6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5lbmFibGVCbHVldG9vdGgoKSl9LGRpc2FibGVCbHVldG9vdGg6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5kaXNhYmxlQmx1ZXRvb3RoKCkpfSxzdGFydE1vbml0b3JpbmdGb3JSZWdpb246ZnVuY3Rpb24obil7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuc3RhcnRNb25pdG9yaW5nRm9yUmVnaW9uKG4pKX0sc3RvcE1vbml0b3JpbmdGb3JSZWdpb246ZnVuY3Rpb24obil7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuc3RvcE1vbml0b3JpbmdGb3JSZWdpb24obikpfSxyZXF1ZXN0U3RhdGVGb3JSZWdpb246ZnVuY3Rpb24obil7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIucmVxdWVzdFN0YXRlRm9yUmVnaW9uKG4pKX0sc3RhcnRSYW5naW5nQmVhY29uc0luUmVnaW9uOmZ1bmN0aW9uKG4pe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLnN0YXJ0UmFuZ2luZ0JlYWNvbnNJblJlZ2lvbihuKSl9LHN0b3BSYW5naW5nQmVhY29uc0luUmVnaW9uOmZ1bmN0aW9uKG4pe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLnN0b3BSYW5naW5nQmVhY29uc0luUmVnaW9uKG4pKX0sZ2V0QXV0aG9yaXphdGlvblN0YXR1czpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmdldEF1dGhvcml6YXRpb25TdGF0dXMoKSl9LHJlcXVlc3RXaGVuSW5Vc2VBdXRob3JpemF0aW9uOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIucmVxdWVzdFdoZW5JblVzZUF1dGhvcml6YXRpb24oKSl9LHJlcXVlc3RBbHdheXNBdXRob3JpemF0aW9uOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIucmVxdWVzdEFsd2F5c0F1dGhvcml6YXRpb24oKSl9LGdldE1vbml0b3JlZFJlZ2lvbnM6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5nZXRNb25pdG9yZWRSZWdpb25zKCkpfSxnZXRSYW5nZWRSZWdpb25zOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuZ2V0UmFuZ2VkUmVnaW9ucygpKX0saXNSYW5naW5nQXZhaWxhYmxlOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuaXNSYW5naW5nQXZhaWxhYmxlKCkpfSxpc01vbml0b3JpbmdBdmFpbGFibGVGb3JDbGFzczpmdW5jdGlvbihuKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5pc01vbml0b3JpbmdBdmFpbGFibGVGb3JDbGFzcyhuKSl9LHN0YXJ0QWR2ZXJ0aXNpbmc6ZnVuY3Rpb24obixyKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5zdGFydEFkdmVydGlzaW5nKG4scikpfSxzdG9wQWR2ZXJ0aXNpbmc6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5zdG9wQWR2ZXJ0aXNpbmcoKSl9LGlzQWR2ZXJ0aXNpbmdBdmFpbGFibGU6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5pc0FkdmVydGlzaW5nQXZhaWxhYmxlKCkpfSxpc0FkdmVydGlzaW5nOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuaXNBZHZlcnRpc2luZygpKX0sZGlzYWJsZURlYnVnTG9nczpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmRpc2FibGVEZWJ1Z0xvZ3MoKSl9LGVuYWJsZURlYnVnTm90aWZpY2F0aW9uczpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmVuYWJsZURlYnVnTm90aWZpY2F0aW9ucygpKX0sZGlzYWJsZURlYnVnTm90aWZpY2F0aW9uczpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmRpc2FibGVEZWJ1Z05vdGlmaWNhdGlvbnMoKSl9LGVuYWJsZURlYnVnTG9nczpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmVuYWJsZURlYnVnTG9ncygpKX0sYXBwZW5kVG9EZXZpY2VMb2c6ZnVuY3Rpb24obil7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuYXBwZW5kVG9EZXZpY2VMb2cobikpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5ibGVcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQkxFXCIsW1wiJHFcIixcIiR0aW1lb3V0XCIsXCIkbG9nXCIsZnVuY3Rpb24oZSxuLHIpe3JldHVybntzY2FuOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBibGUuc3RhcnRTY2FuKHIsZnVuY3Rpb24oZSl7dC5ub3RpZnkoZSl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSksbihmdW5jdGlvbigpe2JsZS5zdG9wU2NhbihmdW5jdGlvbigpe3QucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0pfSwxZTMqbyksdC5wcm9taXNlfSxzdGFydFNjYW46ZnVuY3Rpb24oZSxuLHIpe3JldHVybiBibGUuc3RhcnRTY2FuKGUsbixyKX0sc3RvcFNjYW46ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGJsZS5zdG9wU2NhbihmdW5jdGlvbigpe24ucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sY29ubmVjdDpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGJsZS5jb25uZWN0KG4sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sZGlzY29ubmVjdDpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGJsZS5kaXNjb25uZWN0KG4sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0scmVhZDpmdW5jdGlvbihuLHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBibGUucmVhZChuLHIsbyxmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSksdC5wcm9taXNlfSx3cml0ZTpmdW5jdGlvbihuLHIsbyx0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIGJsZS53cml0ZShuLHIsbyx0LGZ1bmN0aW9uKGUpe2kucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7aS5yZWplY3QoZSl9KSxpLnByb21pc2V9LHdyaXRlV2l0aG91dFJlc3BvbnNlOmZ1bmN0aW9uKG4scixvLHQpe3ZhciBpPWUuZGVmZXIoKTtyZXR1cm4gYmxlLndyaXRlV2l0aG91dFJlc3BvbnNlKG4scixvLHQsZnVuY3Rpb24oZSl7aS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtpLnJlamVjdChlKX0pLGkucHJvbWlzZX0sd3JpdGVDb21tYW5kOmZ1bmN0aW9uKGUsbixvLHQpe3JldHVybiByLndhcm5pbmcoXCJ3cml0ZUNvbW1hbmQgaXMgZGVwcmVjYXRlZCwgdXNlIHdyaXRlV2l0aG91dFJlc3BvbnNlXCIpLHRoaXMud3JpdGVXaXRob3V0UmVzcG9uc2UoZSxuLG8sdCl9LHN0YXJ0Tm90aWZpY2F0aW9uOmZ1bmN0aW9uKGUsbixyLG8sdCl7cmV0dXJuIGJsZS5zdGFydE5vdGlmaWNhdGlvbihlLG4scixvLHQpfSxzdG9wTm90aWZpY2F0aW9uOmZ1bmN0aW9uKG4scixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIGJsZS5zdG9wTm90aWZpY2F0aW9uKG4scixvLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7dC5yZWplY3QoZSl9KSx0LnByb21pc2V9LGlzQ29ubmVjdGVkOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gYmxlLmlzQ29ubmVjdGVkKG4sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sZW5hYmxlOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBibGUuZW5hYmxlKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9LGlzRW5hYmxlZDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gYmxlLmlzRW5hYmxlZChmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5ibHVldG9vdGhTZXJpYWxcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQmx1ZXRvb3RoU2VyaWFsXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntjb25uZWN0OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKSx0PWUuZGVmZXIoKSxpPSExO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5jb25uZWN0KHIsZnVuY3Rpb24oKXtpPSEwLG8ucmVzb2x2ZSh0KX0sZnVuY3Rpb24oZSl7aT09PSExJiZ0LnJlamVjdChlKSxvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sY29ubmVjdEluc2VjdXJlOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwuY29ubmVjdEluc2VjdXJlKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGRpc2Nvbm5lY3Q6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLmRpc2Nvbm5lY3QoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LGxpc3Q6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLmxpc3QoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sZGlzY292ZXJVbnBhaXJlZDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwuZGlzY292ZXJVbnBhaXJlZChmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxzZXREZXZpY2VEaXNjb3ZlcmVkTGlzdGVuZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLnNldERldmljZURpc2NvdmVyZWRMaXN0ZW5lcihmdW5jdGlvbihlKXtyLm5vdGlmeShlKX0pLHIucHJvbWlzZX0sY2xlYXJEZXZpY2VEaXNjb3ZlcmVkTGlzdGVuZXI6ZnVuY3Rpb24oKXtuLmJsdWV0b290aFNlcmlhbC5jbGVhckRldmljZURpc2NvdmVyZWRMaXN0ZW5lcigpfSxzaG93Qmx1ZXRvb3RoU2V0dGluZ3M6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLnNob3dCbHVldG9vdGhTZXR0aW5ncyhmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0saXNFbmFibGVkOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5pc0VuYWJsZWQoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxlbmFibGU6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLmVuYWJsZShmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LGlzQ29ubmVjdGVkOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5pc0Nvbm5lY3RlZChmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LGF2YWlsYWJsZTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwuYXZhaWxhYmxlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHJlYWQ6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLnJlYWQoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0scmVhZFVudGlsOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwucmVhZFVudGlsKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sd3JpdGU6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC53cml0ZShyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxzdWJzY3JpYmU6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5zdWJzY3JpYmUocixmdW5jdGlvbihlKXtvLm5vdGlmeShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHN1YnNjcmliZVJhd0RhdGE6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLnN1YnNjcmliZVJhd0RhdGEoZnVuY3Rpb24oZSl7ci5ub3RpZnkoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSx1bnN1YnNjcmliZTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwudW5zdWJzY3JpYmUoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHVuc3Vic2NyaWJlUmF3RGF0YTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwudW5zdWJzY3JpYmVSYXdEYXRhKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxjbGVhcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwuY2xlYXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHJlYWRSU1NJOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5yZWFkUlNTSShmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5icmlnaHRuZXNzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUJyaWdodG5lc3NcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2dldDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5jb3Jkb3ZhP24uY29yZG92YS5wbHVnaW5zLmJyaWdodG5lc3MuZ2V0QnJpZ2h0bmVzcyhmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSk6ci5yZWplY3QoXCJOb3Qgc3VwcG9ydGVkIHdpdGhvdXQgY29yZG92YS5qc1wiKSxyLnByb21pc2V9LHNldDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uY29yZG92YT9uLmNvcmRvdmEucGx1Z2lucy5icmlnaHRuZXNzLnNldEJyaWdodG5lc3MocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSk6by5yZWplY3QoXCJOb3Qgc3VwcG9ydGVkIHdpdGhvdXQgY29yZG92YS5qc1wiKSxvLnByb21pc2V9LHNldEtlZXBTY3JlZW5PbjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uY29yZG92YT9uLmNvcmRvdmEucGx1Z2lucy5icmlnaHRuZXNzLnNldEtlZXBTY3JlZW5PbihyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KTpvLnJlamVjdChcIk5vdCBzdXBwb3J0ZWQgd2l0aG91dCBjb3Jkb3ZhLmpzXCIpLG8ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuY2FsZW5kYXJcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQ2FsZW5kYXJcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2NyZWF0ZUNhbGVuZGFyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKSx0PW4ucGx1Z2lucy5jYWxlbmRhci5nZXRDcmVhdGVDYWxlbmRhck9wdGlvbnMoKTtyZXR1cm5cInN0cmluZ1wiPT10eXBlb2Ygcj90LmNhbGVuZGFyTmFtZT1yOnQ9YW5ndWxhci5leHRlbmQodCxyKSxuLnBsdWdpbnMuY2FsZW5kYXIuY3JlYXRlQ2FsZW5kYXIodCxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxkZWxldGVDYWxlbmRhcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5jYWxlbmRhci5kZWxldGVDYWxlbmRhcihyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGNyZWF0ZUV2ZW50OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKSx0PXt0aXRsZTpudWxsLGxvY2F0aW9uOm51bGwsbm90ZXM6bnVsbCxzdGFydERhdGU6bnVsbCxlbmREYXRlOm51bGx9O3JldHVybiB0PWFuZ3VsYXIuZXh0ZW5kKHQsciksbi5wbHVnaW5zLmNhbGVuZGFyLmNyZWF0ZUV2ZW50KHQudGl0bGUsdC5sb2NhdGlvbix0Lm5vdGVzLG5ldyBEYXRlKHQuc3RhcnREYXRlKSxuZXcgRGF0ZSh0LmVuZERhdGUpLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGNyZWF0ZUV2ZW50V2l0aE9wdGlvbnM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpLHQ9W10saT13aW5kb3cucGx1Z2lucy5jYWxlbmRhci5nZXRDYWxlbmRhck9wdGlvbnMoKSxhPXt0aXRsZTpudWxsLGxvY2F0aW9uOm51bGwsbm90ZXM6bnVsbCxzdGFydERhdGU6bnVsbCxlbmREYXRlOm51bGx9O3Q9T2JqZWN0LmtleXMoYSk7Zm9yKHZhciBjIGluIHIpLTE9PT10LmluZGV4T2YoYyk/aVtjXT1yW2NdOmFbY109cltjXTtyZXR1cm4gbi5wbHVnaW5zLmNhbGVuZGFyLmNyZWF0ZUV2ZW50V2l0aE9wdGlvbnMoYS50aXRsZSxhLmxvY2F0aW9uLGEubm90ZXMsbmV3IERhdGUoYS5zdGFydERhdGUpLG5ldyBEYXRlKGEuZW5kRGF0ZSksaSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxjcmVhdGVFdmVudEludGVyYWN0aXZlbHk6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpLHQ9e3RpdGxlOm51bGwsbG9jYXRpb246bnVsbCxub3RlczpudWxsLHN0YXJ0RGF0ZTpudWxsLGVuZERhdGU6bnVsbH07cmV0dXJuIHQ9YW5ndWxhci5leHRlbmQodCxyKSxuLnBsdWdpbnMuY2FsZW5kYXIuY3JlYXRlRXZlbnRJbnRlcmFjdGl2ZWx5KHQudGl0bGUsdC5sb2NhdGlvbix0Lm5vdGVzLG5ldyBEYXRlKHQuc3RhcnREYXRlKSxuZXcgRGF0ZSh0LmVuZERhdGUpLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGNyZWF0ZUV2ZW50SW5OYW1lZENhbGVuZGFyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKSx0PXt0aXRsZTpudWxsLGxvY2F0aW9uOm51bGwsbm90ZXM6bnVsbCxzdGFydERhdGU6bnVsbCxlbmREYXRlOm51bGwsY2FsZW5kYXJOYW1lOm51bGx9O3JldHVybiB0PWFuZ3VsYXIuZXh0ZW5kKHQsciksbi5wbHVnaW5zLmNhbGVuZGFyLmNyZWF0ZUV2ZW50SW5OYW1lZENhbGVuZGFyKHQudGl0bGUsdC5sb2NhdGlvbix0Lm5vdGVzLG5ldyBEYXRlKHQuc3RhcnREYXRlKSxuZXcgRGF0ZSh0LmVuZERhdGUpLHQuY2FsZW5kYXJOYW1lLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGZpbmRFdmVudDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCksdD17dGl0bGU6bnVsbCxsb2NhdGlvbjpudWxsLG5vdGVzOm51bGwsc3RhcnREYXRlOm51bGwsZW5kRGF0ZTpudWxsfTtyZXR1cm4gdD1hbmd1bGFyLmV4dGVuZCh0LHIpLG4ucGx1Z2lucy5jYWxlbmRhci5maW5kRXZlbnQodC50aXRsZSx0LmxvY2F0aW9uLHQubm90ZXMsbmV3IERhdGUodC5zdGFydERhdGUpLG5ldyBEYXRlKHQuZW5kRGF0ZSksZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sbGlzdEV2ZW50c0luUmFuZ2U6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5jYWxlbmRhci5saXN0RXZlbnRzSW5SYW5nZShyLG8sZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0pLHQucHJvbWlzZX0sbGlzdENhbGVuZGFyczpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmNhbGVuZGFyLmxpc3RDYWxlbmRhcnMoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sZmluZEFsbEV2ZW50c0luTmFtZWRDYWxlbmRhcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5jYWxlbmRhci5maW5kQWxsRXZlbnRzSW5OYW1lZENhbGVuZGFyKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sbW9kaWZ5RXZlbnQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpLHQ9e3RpdGxlOm51bGwsbG9jYXRpb246bnVsbCxub3RlczpudWxsLHN0YXJ0RGF0ZTpudWxsLGVuZERhdGU6bnVsbCxuZXdUaXRsZTpudWxsLG5ld0xvY2F0aW9uOm51bGwsbmV3Tm90ZXM6bnVsbCxuZXdTdGFydERhdGU6bnVsbCxuZXdFbmREYXRlOm51bGx9O3JldHVybiB0PWFuZ3VsYXIuZXh0ZW5kKHQsciksbi5wbHVnaW5zLmNhbGVuZGFyLm1vZGlmeUV2ZW50KHQudGl0bGUsdC5sb2NhdGlvbix0Lm5vdGVzLG5ldyBEYXRlKHQuc3RhcnREYXRlKSxuZXcgRGF0ZSh0LmVuZERhdGUpLHQubmV3VGl0bGUsdC5uZXdMb2NhdGlvbix0Lm5ld05vdGVzLG5ldyBEYXRlKHQubmV3U3RhcnREYXRlKSxuZXcgRGF0ZSh0Lm5ld0VuZERhdGUpLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGRlbGV0ZUV2ZW50OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKSx0PXtuZXdUaXRsZTpudWxsLGxvY2F0aW9uOm51bGwsbm90ZXM6bnVsbCxzdGFydERhdGU6bnVsbCxlbmREYXRlOm51bGx9O3JldHVybiB0PWFuZ3VsYXIuZXh0ZW5kKHQsciksbi5wbHVnaW5zLmNhbGVuZGFyLmRlbGV0ZUV2ZW50KHQubmV3VGl0bGUsdC5sb2NhdGlvbix0Lm5vdGVzLG5ldyBEYXRlKHQuc3RhcnREYXRlKSxuZXcgRGF0ZSh0LmVuZERhdGUpLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmNhbWVyYVwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFDYW1lcmFcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntnZXRQaWN0dXJlOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmNhbWVyYT8obmF2aWdhdG9yLmNhbWVyYS5nZXRQaWN0dXJlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LG4pLHIucHJvbWlzZSk6KHIucmVzb2x2ZShudWxsKSxyLnByb21pc2UpfSxjbGVhbnVwOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuY2FtZXJhLmNsZWFudXAoZnVuY3Rpb24oKXtuLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmNhcHR1cmVcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQ2FwdHVyZVwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2NhcHR1cmVBdWRpbzpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5kZXZpY2UuY2FwdHVyZT8obmF2aWdhdG9yLmRldmljZS5jYXB0dXJlLmNhcHR1cmVBdWRpbyhmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKSxyLnByb21pc2UpOihyLnJlc29sdmUobnVsbCksci5wcm9taXNlKX0sY2FwdHVyZUltYWdlOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmRldmljZS5jYXB0dXJlPyhuYXZpZ2F0b3IuZGV2aWNlLmNhcHR1cmUuY2FwdHVyZUltYWdlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LG4pLHIucHJvbWlzZSk6KHIucmVzb2x2ZShudWxsKSxyLnByb21pc2UpfSxjYXB0dXJlVmlkZW86ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZGV2aWNlLmNhcHR1cmU/KG5hdmlnYXRvci5kZXZpY2UuY2FwdHVyZS5jYXB0dXJlVmlkZW8oZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbiksci5wcm9taXNlKTooci5yZXNvbHZlKG51bGwpLHIucHJvbWlzZSl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmNhcmRJT1wiLFtdKS5wcm92aWRlcihcIiRjb3Jkb3ZhTmdDYXJkSU9cIixbZnVuY3Rpb24oKXt2YXIgZT1bXCJjYXJkX3R5cGVcIixcInJlZGFjdGVkX2NhcmRfbnVtYmVyXCIsXCJjYXJkX251bWJlclwiLFwiZXhwaXJ5X21vbnRoXCIsXCJleHBpcnlfeWVhclwiLFwic2hvcnRfZXhwaXJ5X3llYXJcIixcImN2dlwiLFwiemlwXCJdLG49e2V4cGlyeTohMCxjdnY6ITAsemlwOiExLHN1cHByZXNzTWFudWFsOiExLHN1cHByZXNzQ29uZmlybTohMSxoaWRlTG9nbzohMH07dGhpcy5zZXRDYXJkSU9SZXNwb25zZUZpZWxkcz1mdW5jdGlvbihuKXtuJiZhbmd1bGFyLmlzQXJyYXkobikmJihlPW4pfSx0aGlzLnNldFNjYW5lckNvbmZpZz1mdW5jdGlvbihlKXtlJiZhbmd1bGFyLmlzT2JqZWN0KGUpJiYobi5leHBpcnk9ZS5leHBpcnl8fCEwLG4uY3Z2PWUuY3Z2fHwhMCxuLnppcD1lLnppcHx8ITEsbi5zdXBwcmVzc01hbnVhbD1lLnN1cHByZXNzTWFudWFsfHwhMSxuLnN1cHByZXNzQ29uZmlybT1lLnN1cHByZXNzQ29uZmlybXx8ITEsbi5oaWRlTG9nbz1lLmhpZGVMb2dvfHwhMCl9LHRoaXMuJGdldD1bXCIkcVwiLGZ1bmN0aW9uKHIpe3JldHVybntzY2FuQ2FyZDpmdW5jdGlvbigpe3ZhciBvPXIuZGVmZXIoKTtyZXR1cm4gQ2FyZElPLnNjYW4obixmdW5jdGlvbihuKXtpZihudWxsPT09bilvLnJlamVjdChudWxsKTtlbHNle2Zvcih2YXIgcj17fSx0PTAsaT1lLmxlbmd0aDtpPnQ7dCsrKXt2YXIgYT1lW3RdO1wic2hvcnRfZXhwaXJ5X3llYXJcIj09PWE/clthXT1TdHJpbmcobi5leHBpcnlfeWVhcikuc3Vic3RyKDIsMil8fFwiXCI6clthXT1uW2FdfHxcIlwifW8ucmVzb2x2ZShyKX19LGZ1bmN0aW9uKCl7by5yZWplY3QobnVsbCl9KSxvLnByb21pc2V9fX1dfV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuY2xpcGJvYXJkXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUNsaXBib2FyZFwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57Y29weTpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uY29yZG92YS5wbHVnaW5zLmNsaXBib2FyZC5jb3B5KHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxwYXN0ZTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5jb3Jkb3ZhLnBsdWdpbnMuY2xpcGJvYXJkLnBhc3RlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5jb250YWN0c1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFDb250YWN0c1wiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue3NhdmU6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpLG89bmF2aWdhdG9yLmNvbnRhY3RzLmNyZWF0ZShuKTtyZXR1cm4gby5zYXZlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHJlbW92ZTpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCksbz1uYXZpZ2F0b3IuY29udGFjdHMuY3JlYXRlKG4pO3JldHVybiBvLnJlbW92ZShmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxjbG9uZTpmdW5jdGlvbihlKXt2YXIgbj1uYXZpZ2F0b3IuY29udGFjdHMuY3JlYXRlKGUpO3JldHVybiBuLmNsb25lKGUpfSxmaW5kOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKSxvPW4uZmllbGRzfHxbXCJpZFwiLFwiZGlzcGxheU5hbWVcIl07cmV0dXJuIGRlbGV0ZSBuLmZpZWxkcywwPT09T2JqZWN0LmtleXMobikubGVuZ3RoP25hdmlnYXRvci5jb250YWN0cy5maW5kKG8sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pOm5hdmlnYXRvci5jb250YWN0cy5maW5kKG8sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbiksci5wcm9taXNlfSxwaWNrQ29udGFjdDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmNvbnRhY3RzLnBpY2tDb250YWN0KGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmRhdGVQaWNrZXJcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhRGF0ZVBpY2tlclwiLFtcIiR3aW5kb3dcIixcIiRxXCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57c2hvdzpmdW5jdGlvbihyKXt2YXIgbz1uLmRlZmVyKCk7cmV0dXJuIHI9cnx8e2RhdGU6bmV3IERhdGUsbW9kZTpcImRhdGVcIn0sZS5kYXRlUGlja2VyLnNob3cocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5kZXZpY2VcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhRGV2aWNlXCIsW2Z1bmN0aW9uKCl7cmV0dXJue2dldERldmljZTpmdW5jdGlvbigpe3JldHVybiBkZXZpY2V9LGdldENvcmRvdmE6ZnVuY3Rpb24oKXtyZXR1cm4gZGV2aWNlLmNvcmRvdmF9LGdldE1vZGVsOmZ1bmN0aW9uKCl7cmV0dXJuIGRldmljZS5tb2RlbH0sZ2V0TmFtZTpmdW5jdGlvbigpe3JldHVybiBkZXZpY2UubmFtZX0sZ2V0UGxhdGZvcm06ZnVuY3Rpb24oKXtyZXR1cm4gZGV2aWNlLnBsYXRmb3JtfSxnZXRVVUlEOmZ1bmN0aW9uKCl7cmV0dXJuIGRldmljZS51dWlkfSxnZXRWZXJzaW9uOmZ1bmN0aW9uKCl7cmV0dXJuIGRldmljZS52ZXJzaW9ufSxnZXRNYW51ZmFjdHVyZXI6ZnVuY3Rpb24oKXtyZXR1cm4gZGV2aWNlLm1hbnVmYWN0dXJlcn19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZGV2aWNlTW90aW9uXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YURldmljZU1vdGlvblwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2dldEN1cnJlbnRBY2NlbGVyYXRpb246ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGFuZ3VsYXIuaXNVbmRlZmluZWQobmF2aWdhdG9yLmFjY2VsZXJvbWV0ZXIpfHwhYW5ndWxhci5pc0Z1bmN0aW9uKG5hdmlnYXRvci5hY2NlbGVyb21ldGVyLmdldEN1cnJlbnRBY2NlbGVyYXRpb24pPyhuLnJlamVjdChcIkRldmljZSBkbyBub3Qgc3VwcG9ydCB3YXRjaEFjY2VsZXJhdGlvblwiKSxuLnByb21pc2UpOihuYXZpZ2F0b3IuYWNjZWxlcm9tZXRlci5nZXRDdXJyZW50QWNjZWxlcmF0aW9uKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2UpfSx3YXRjaEFjY2VsZXJhdGlvbjpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7aWYoYW5ndWxhci5pc1VuZGVmaW5lZChuYXZpZ2F0b3IuYWNjZWxlcm9tZXRlcil8fCFhbmd1bGFyLmlzRnVuY3Rpb24obmF2aWdhdG9yLmFjY2VsZXJvbWV0ZXIud2F0Y2hBY2NlbGVyYXRpb24pKXJldHVybiByLnJlamVjdChcIkRldmljZSBkbyBub3Qgc3VwcG9ydCB3YXRjaEFjY2VsZXJhdGlvblwiKSxyLnByb21pc2U7dmFyIG89bmF2aWdhdG9yLmFjY2VsZXJvbWV0ZXIud2F0Y2hBY2NlbGVyYXRpb24oZnVuY3Rpb24oZSl7ci5ub3RpZnkoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKTtyZXR1cm4gci5wcm9taXNlLmNhbmNlbD1mdW5jdGlvbigpe25hdmlnYXRvci5hY2NlbGVyb21ldGVyLmNsZWFyV2F0Y2gobyl9LHIucHJvbWlzZS5jbGVhcldhdGNoPWZ1bmN0aW9uKGUpe25hdmlnYXRvci5hY2NlbGVyb21ldGVyLmNsZWFyV2F0Y2goZXx8byl9LHIucHJvbWlzZS53YXRjaElEPW8sci5wcm9taXNlfSxjbGVhcldhdGNoOmZ1bmN0aW9uKGUpe3JldHVybiBuYXZpZ2F0b3IuYWNjZWxlcm9tZXRlci5jbGVhcldhdGNoKGUpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5kZXZpY2VPcmllbnRhdGlvblwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFEZXZpY2VPcmllbnRhdGlvblwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7dmFyIG49e2ZyZXF1ZW5jeTozZTN9O3JldHVybntnZXRDdXJyZW50SGVhZGluZzpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmNvbXBhc3M/KG5hdmlnYXRvci5jb21wYXNzLmdldEN1cnJlbnRIZWFkaW5nKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2UpOihuLnJlamVjdChcIk5vIGNvbXBhc3Mgb24gRGV2aWNlXCIpLG4ucHJvbWlzZSl9LHdhdGNoSGVhZGluZzpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7aWYoIW5hdmlnYXRvci5jb21wYXNzKXJldHVybiBvLnJlamVjdChcIk5vIGNvbXBhc3Mgb24gRGV2aWNlXCIpLG8ucHJvbWlzZTt2YXIgdD1hbmd1bGFyLmV4dGVuZChuLHIpLGk9bmF2aWdhdG9yLmNvbXBhc3Mud2F0Y2hIZWFkaW5nKGZ1bmN0aW9uKGUpe28ubm90aWZ5KGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0sdCk7cmV0dXJuIG8ucHJvbWlzZS5jYW5jZWw9ZnVuY3Rpb24oKXtuYXZpZ2F0b3IuY29tcGFzcy5jbGVhcldhdGNoKGkpfSxvLnByb21pc2UuY2xlYXJXYXRjaD1mdW5jdGlvbihlKXtuYXZpZ2F0b3IuY29tcGFzcy5jbGVhcldhdGNoKGV8fGkpfSxvLnByb21pc2Uud2F0Y2hJRD1pLG8ucHJvbWlzZX0sY2xlYXJXYXRjaDpmdW5jdGlvbihlKXtyZXR1cm4gbmF2aWdhdG9yLmNvbXBhc3MuY2xlYXJXYXRjaChlKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZGlhbG9nc1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFEaWFsb2dzXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybnthbGVydDpmdW5jdGlvbihyLG8sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiBuLm5hdmlnYXRvci5ub3RpZmljYXRpb24/bmF2aWdhdG9yLm5vdGlmaWNhdGlvbi5hbGVydChyLGZ1bmN0aW9uKCl7aS5yZXNvbHZlKCl9LG8sdCk6KG4uYWxlcnQociksaS5yZXNvbHZlKCkpLGkucHJvbWlzZX0sY29uZmlybTpmdW5jdGlvbihyLG8sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiBuLm5hdmlnYXRvci5ub3RpZmljYXRpb24/bmF2aWdhdG9yLm5vdGlmaWNhdGlvbi5jb25maXJtKHIsZnVuY3Rpb24oZSl7aS5yZXNvbHZlKGUpfSxvLHQpOm4uY29uZmlybShyKT9pLnJlc29sdmUoMSk6aS5yZXNvbHZlKDIpLGkucHJvbWlzZX0scHJvbXB0OmZ1bmN0aW9uKHIsbyx0LGkpe3ZhciBhPWUuZGVmZXIoKTtpZihuLm5hdmlnYXRvci5ub3RpZmljYXRpb24pbmF2aWdhdG9yLm5vdGlmaWNhdGlvbi5wcm9tcHQocixmdW5jdGlvbihlKXthLnJlc29sdmUoZSl9LG8sdCxpKTtlbHNle3ZhciBjPW4ucHJvbXB0KHIsaSk7bnVsbCE9PWM/YS5yZXNvbHZlKHtpbnB1dDE6YyxidXR0b25JbmRleDoxfSk6YS5yZXNvbHZlKHtpbnB1dDE6YyxidXR0b25JbmRleDoyfSl9cmV0dXJuIGEucHJvbWlzZX0sYmVlcDpmdW5jdGlvbihlKXtyZXR1cm4gbmF2aWdhdG9yLm5vdGlmaWNhdGlvbi5iZWVwKGUpfSxhY3Rpdml0eVN0YXJ0OmZ1bmN0aW9uKG4scil7dmFyIG89ZS5kZWZlcigpO3JldHVyblwiYW5kcm9pZFwiPT09Y29yZG92YS5wbGF0Zm9ybUlkPyhuYXZpZ2F0b3Iubm90aWZpY2F0aW9uLmFjdGl2aXR5U3RhcnQocixuKSxvLnJlc29sdmUoKSk6by5yZWplY3QobixyKSxvLnByb21pc2V9LGFjdGl2aXR5U3RvcDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm5cImFuZHJvaWRcIj09PWNvcmRvdmEucGxhdGZvcm1JZD8obmF2aWdhdG9yLm5vdGlmaWNhdGlvbi5hY3Rpdml0eVN0b3AoKSxuLnJlc29sdmUoKSk6bi5yZWplY3QoKSxuLnByb21pc2V9LHByb2dyZXNzU3RhcnQ6ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuXCJhbmRyb2lkXCI9PT1jb3Jkb3ZhLnBsYXRmb3JtSWQ/KG5hdmlnYXRvci5ub3RpZmljYXRpb24ucHJvZ3Jlc3NTdGFydChyLG4pLG8ucmVzb2x2ZSgpKTpvLnJlamVjdChuLHIpLG8ucHJvbWlzZX0scHJvZ3Jlc3NTdG9wOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVyblwiYW5kcm9pZFwiPT09Y29yZG92YS5wbGF0Zm9ybUlkPyhuYXZpZ2F0b3Iubm90aWZpY2F0aW9uLnByb2dyZXNzU3RvcCgpLG4ucmVzb2x2ZSgpKTpuLnJlamVjdCgpLG4ucHJvbWlzZX0scHJvZ3Jlc3NWYWx1ZTpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuXCJhbmRyb2lkXCI9PT1jb3Jkb3ZhLnBsYXRmb3JtSWQ/KG5hdmlnYXRvci5ub3RpZmljYXRpb24ucHJvZ3Jlc3NWYWx1ZShuKSxyLnJlc29sdmUoKSk6ci5yZWplY3Qobiksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5lbWFpbENvbXBvc2VyXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUVtYWlsQ29tcG9zZXJcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntpc0F2YWlsYWJsZTpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLmVtYWlsLmlzQXZhaWxhYmxlKGZ1bmN0aW9uKGUpe2U/bi5yZXNvbHZlKCk6bi5yZWplY3QoKX0pLG4ucHJvbWlzZX0sb3BlbjpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5lbWFpbC5vcGVuKG4sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxhZGRBbGlhczpmdW5jdGlvbihlLG4pe2NvcmRvdmEucGx1Z2lucy5lbWFpbC5hZGRBbGlhcyhlLG4pfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5mYWNlYm9va1wiLFtdKS5wcm92aWRlcihcIiRjb3Jkb3ZhRmFjZWJvb2tcIixbZnVuY3Rpb24oKXt0aGlzLmJyb3dzZXJJbml0PWZ1bmN0aW9uKGUsbil7dGhpcy5hcHBJRD1lLHRoaXMuYXBwVmVyc2lvbj1ufHxcInYyLjBcIixmYWNlYm9va0Nvbm5lY3RQbHVnaW4uYnJvd3NlckluaXQodGhpcy5hcHBJRCx0aGlzLmFwcFZlcnNpb24pfSx0aGlzLiRnZXQ9W1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57bG9naW46ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBmYWNlYm9va0Nvbm5lY3RQbHVnaW4ubG9naW4obixmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxzaG93RGlhbG9nOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gZmFjZWJvb2tDb25uZWN0UGx1Z2luLnNob3dEaWFsb2cobixmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxhcGk6ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIGZhY2Vib29rQ29ubmVjdFBsdWdpbi5hcGkobixyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGdldEFjY2Vzc1Rva2VuOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBmYWNlYm9va0Nvbm5lY3RQbHVnaW4uZ2V0QWNjZXNzVG9rZW4oZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sZ2V0TG9naW5TdGF0dXM6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGZhY2Vib29rQ29ubmVjdFBsdWdpbi5nZXRMb2dpblN0YXR1cyhmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxsb2dvdXQ6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGZhY2Vib29rQ29ubmVjdFBsdWdpbi5sb2dvdXQoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX19fV19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5mYWNlYm9va0Fkc1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFGYWNlYm9va0Fkc1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57c2V0T3B0aW9uczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uRmFjZWJvb2tBZHMuc2V0T3B0aW9ucyhyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sY3JlYXRlQmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5GYWNlYm9va0Fkcy5jcmVhdGVCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHJlbW92ZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5GYWNlYm9va0Fkcy5yZW1vdmVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxzaG93QmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5GYWNlYm9va0Fkcy5zaG93QmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93QmFubmVyQXRYWTpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi5GYWNlYm9va0Fkcy5zaG93QmFubmVyQXRYWShyLG8sZnVuY3Rpb24oKXt0LnJlc29sdmUoKX0sZnVuY3Rpb24oKXt0LnJlamVjdCgpfSksdC5wcm9taXNlfSxoaWRlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLkZhY2Vib29rQWRzLmhpZGVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxwcmVwYXJlSW50ZXJzdGl0aWFsOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5GYWNlYm9va0Fkcy5wcmVwYXJlSW50ZXJzdGl0aWFsKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93SW50ZXJzdGl0aWFsOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLkZhY2Vib29rQWRzLnNob3dJbnRlcnN0aXRpYWwoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtcclxuci5yZWplY3QoKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmlsZVwiLFtdKS5jb25zdGFudChcIiRjb3Jkb3ZhRmlsZUVycm9yXCIsezE6XCJOT1RfRk9VTkRfRVJSXCIsMjpcIlNFQ1VSSVRZX0VSUlwiLDM6XCJBQk9SVF9FUlJcIiw0OlwiTk9UX1JFQURBQkxFX0VSUlwiLDU6XCJFTkNPRElOR19FUlJcIiw2OlwiTk9fTU9ESUZJQ0FUSU9OX0FMTE9XRURfRVJSXCIsNzpcIklOVkFMSURfU1RBVEVfRVJSXCIsODpcIlNZTlRBWF9FUlJcIiw5OlwiSU5WQUxJRF9NT0RJRklDQVRJT05fRVJSXCIsMTA6XCJRVU9UQV9FWENFRURFRF9FUlJcIiwxMTpcIlRZUEVfTUlTTUFUQ0hfRVJSXCIsMTI6XCJQQVRIX0VYSVNUU19FUlJcIn0pLnByb3ZpZGVyKFwiJGNvcmRvdmFGaWxlXCIsW2Z1bmN0aW9uKCl7dGhpcy4kZ2V0PVtcIiRxXCIsXCIkd2luZG93XCIsXCIkY29yZG92YUZpbGVFcnJvclwiLGZ1bmN0aW9uKGUsbixyKXtyZXR1cm57Z2V0RnJlZURpc2tTcGFjZTpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5leGVjKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9LFwiRmlsZVwiLFwiZ2V0RnJlZURpc2tTcGFjZVwiLFtdKSxuLnByb21pc2V9LGNoZWNrRGlyOmZ1bmN0aW9uKG8sdCl7dmFyIGk9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZpLnJlamVjdChcImRpcmVjdG9yeSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXt2YXIgYT1vK3Q7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKGEsZnVuY3Rpb24oZSl7ZS5pc0RpcmVjdG9yeT09PSEwP2kucmVzb2x2ZShlKTppLnJlamVjdCh7Y29kZToxMyxtZXNzYWdlOlwiaW5wdXQgaXMgbm90IGEgZGlyZWN0b3J5XCJ9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfWNhdGNoKGMpe2MubWVzc2FnZT1yW2MuY29kZV0saS5yZWplY3QoYyl9cmV0dXJuIGkucHJvbWlzZX0sY2hlY2tGaWxlOmZ1bmN0aW9uKG8sdCl7dmFyIGk9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZpLnJlamVjdChcImRpcmVjdG9yeSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXt2YXIgYT1vK3Q7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKGEsZnVuY3Rpb24oZSl7ZS5pc0ZpbGU9PT0hMD9pLnJlc29sdmUoZSk6aS5yZWplY3Qoe2NvZGU6MTMsbWVzc2FnZTpcImlucHV0IGlzIG5vdCBhIGZpbGVcIn0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9Y2F0Y2goYyl7Yy5tZXNzYWdlPXJbYy5jb2RlXSxpLnJlamVjdChjKX1yZXR1cm4gaS5wcm9taXNlfSxjcmVhdGVEaXI6ZnVuY3Rpb24obyx0LGkpe3ZhciBhPWUuZGVmZXIoKTsvXlxcLy8udGVzdCh0KSYmYS5yZWplY3QoXCJkaXJlY3RvcnkgY2Fubm90IHN0YXJ0IHdpdGggL1wiKSxpPWk/ITE6ITA7dmFyIGM9e2NyZWF0ZTohMCxleGNsdXNpdmU6aX07dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChvLGZ1bmN0aW9uKGUpe2UuZ2V0RGlyZWN0b3J5KHQsYyxmdW5jdGlvbihlKXthLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxhLnJlamVjdChlKX0pfWNhdGNoKHUpe3UubWVzc2FnZT1yW3UuY29kZV0sYS5yZWplY3QodSl9cmV0dXJuIGEucHJvbWlzZX0sY3JlYXRlRmlsZTpmdW5jdGlvbihvLHQsaSl7dmFyIGE9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZhLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpLGk9aT8hMTohMDt2YXIgYz17Y3JlYXRlOiEwLGV4Y2x1c2l2ZTppfTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKG8sZnVuY3Rpb24oZSl7ZS5nZXRGaWxlKHQsYyxmdW5jdGlvbihlKXthLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxhLnJlamVjdChlKX0pfWNhdGNoKHUpe3UubWVzc2FnZT1yW3UuY29kZV0sYS5yZWplY3QodSl9cmV0dXJuIGEucHJvbWlzZX0scmVtb3ZlRGlyOmZ1bmN0aW9uKG8sdCl7dmFyIGk9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZpLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwobyxmdW5jdGlvbihlKXtlLmdldERpcmVjdG9yeSh0LHtjcmVhdGU6ITF9LGZ1bmN0aW9uKGUpe2UucmVtb3ZlKGZ1bmN0aW9uKCl7aS5yZXNvbHZlKHtzdWNjZXNzOiEwLGZpbGVSZW1vdmVkOmV9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX1jYXRjaChhKXthLm1lc3NhZ2U9clthLmNvZGVdLGkucmVqZWN0KGEpfXJldHVybiBpLnByb21pc2V9LHJlbW92ZUZpbGU6ZnVuY3Rpb24obyx0KXt2YXIgaT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmkucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChvLGZ1bmN0aW9uKGUpe2UuZ2V0RmlsZSh0LHtjcmVhdGU6ITF9LGZ1bmN0aW9uKGUpe2UucmVtb3ZlKGZ1bmN0aW9uKCl7aS5yZXNvbHZlKHtzdWNjZXNzOiEwLGZpbGVSZW1vdmVkOmV9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX1jYXRjaChhKXthLm1lc3NhZ2U9clthLmNvZGVdLGkucmVqZWN0KGEpfXJldHVybiBpLnByb21pc2V9LHJlbW92ZVJlY3Vyc2l2ZWx5OmZ1bmN0aW9uKG8sdCl7dmFyIGk9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZpLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwobyxmdW5jdGlvbihlKXtlLmdldERpcmVjdG9yeSh0LHtjcmVhdGU6ITF9LGZ1bmN0aW9uKGUpe2UucmVtb3ZlUmVjdXJzaXZlbHkoZnVuY3Rpb24oKXtpLnJlc29sdmUoe3N1Y2Nlc3M6ITAsZmlsZVJlbW92ZWQ6ZX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfWNhdGNoKGEpe2EubWVzc2FnZT1yW2EuY29kZV0saS5yZWplY3QoYSl9cmV0dXJuIGkucHJvbWlzZX0sd3JpdGVGaWxlOmZ1bmN0aW9uKG8sdCxpLGEpe3ZhciBjPWUuZGVmZXIoKTsvXlxcLy8udGVzdCh0KSYmYy5yZWplY3QoXCJmaWxlLW5hbWUgY2Fubm90IHN0YXJ0IHdpdGggL1wiKSxhPWE/ITE6ITA7dmFyIHU9e2NyZWF0ZTohMCxleGNsdXNpdmU6YX07dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChvLGZ1bmN0aW9uKGUpe2UuZ2V0RmlsZSh0LHUsZnVuY3Rpb24oZSl7ZS5jcmVhdGVXcml0ZXIoZnVuY3Rpb24oZSl7dS5hcHBlbmQ9PT0hMCYmZS5zZWVrKGUubGVuZ3RoKSx1LnRydW5jYXRlJiZlLnRydW5jYXRlKHUudHJ1bmNhdGUpLGUub253cml0ZWVuZD1mdW5jdGlvbihlKXt0aGlzLmVycm9yP2MucmVqZWN0KHRoaXMuZXJyb3IpOmMucmVzb2x2ZShlKX0sZS53cml0ZShpKSxjLnByb21pc2UuYWJvcnQ9ZnVuY3Rpb24oKXtlLmFib3J0KCl9fSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYy5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxjLnJlamVjdChlKX0pfWNhdGNoKHMpe3MubWVzc2FnZT1yW3MuY29kZV0sYy5yZWplY3Qocyl9cmV0dXJuIGMucHJvbWlzZX0sd3JpdGVFeGlzdGluZ0ZpbGU6ZnVuY3Rpb24obyx0LGkpe3ZhciBhPWUuZGVmZXIoKTsvXlxcLy8udGVzdCh0KSYmYS5yZWplY3QoXCJmaWxlLW5hbWUgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKG8sZnVuY3Rpb24oZSl7ZS5nZXRGaWxlKHQse2NyZWF0ZTohMX0sZnVuY3Rpb24oZSl7ZS5jcmVhdGVXcml0ZXIoZnVuY3Rpb24oZSl7ZS5zZWVrKGUubGVuZ3RoKSxlLm9ud3JpdGVlbmQ9ZnVuY3Rpb24oZSl7dGhpcy5lcnJvcj9hLnJlamVjdCh0aGlzLmVycm9yKTphLnJlc29sdmUoZSl9LGUud3JpdGUoaSksYS5wcm9taXNlLmFib3J0PWZ1bmN0aW9uKCl7ZS5hYm9ydCgpfX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGEucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYS5yZWplY3QoZSl9KX1jYXRjaChjKXtjLm1lc3NhZ2U9cltjLmNvZGVdLGEucmVqZWN0KGMpfXJldHVybiBhLnByb21pc2V9LHJlYWRBc1RleHQ6ZnVuY3Rpb24obyx0KXt2YXIgaT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmkucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChvLGZ1bmN0aW9uKGUpe2UuZ2V0RmlsZSh0LHtjcmVhdGU6ITF9LGZ1bmN0aW9uKGUpe2UuZmlsZShmdW5jdGlvbihlKXt2YXIgbj1uZXcgRmlsZVJlYWRlcjtuLm9ubG9hZGVuZD1mdW5jdGlvbihlKXt2b2lkIDAhPT1lLnRhcmdldC5yZXN1bHR8fG51bGwhPT1lLnRhcmdldC5yZXN1bHQ/aS5yZXNvbHZlKGUudGFyZ2V0LnJlc3VsdCk6dm9pZCAwIT09ZS50YXJnZXQuZXJyb3J8fG51bGwhPT1lLnRhcmdldC5lcnJvcj9pLnJlamVjdChlLnRhcmdldC5lcnJvcik6aS5yZWplY3Qoe2NvZGU6bnVsbCxtZXNzYWdlOlwiUkVBREVSX09OTE9BREVORF9FUlJcIn0pfSxuLnJlYWRBc1RleHQoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9Y2F0Y2goYSl7YS5tZXNzYWdlPXJbYS5jb2RlXSxpLnJlamVjdChhKX1yZXR1cm4gaS5wcm9taXNlfSxyZWFkQXNEYXRhVVJMOmZ1bmN0aW9uKG8sdCl7dmFyIGk9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZpLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwobyxmdW5jdGlvbihlKXtlLmdldEZpbGUodCx7Y3JlYXRlOiExfSxmdW5jdGlvbihlKXtlLmZpbGUoZnVuY3Rpb24oZSl7dmFyIG49bmV3IEZpbGVSZWFkZXI7bi5vbmxvYWRlbmQ9ZnVuY3Rpb24oZSl7dm9pZCAwIT09ZS50YXJnZXQucmVzdWx0fHxudWxsIT09ZS50YXJnZXQucmVzdWx0P2kucmVzb2x2ZShlLnRhcmdldC5yZXN1bHQpOnZvaWQgMCE9PWUudGFyZ2V0LmVycm9yfHxudWxsIT09ZS50YXJnZXQuZXJyb3I/aS5yZWplY3QoZS50YXJnZXQuZXJyb3IpOmkucmVqZWN0KHtjb2RlOm51bGwsbWVzc2FnZTpcIlJFQURFUl9PTkxPQURFTkRfRVJSXCJ9KX0sbi5yZWFkQXNEYXRhVVJMKGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfWNhdGNoKGEpe2EubWVzc2FnZT1yW2EuY29kZV0saS5yZWplY3QoYSl9cmV0dXJuIGkucHJvbWlzZX0scmVhZEFzQmluYXJ5U3RyaW5nOmZ1bmN0aW9uKG8sdCl7dmFyIGk9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZpLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwobyxmdW5jdGlvbihlKXtlLmdldEZpbGUodCx7Y3JlYXRlOiExfSxmdW5jdGlvbihlKXtlLmZpbGUoZnVuY3Rpb24oZSl7dmFyIG49bmV3IEZpbGVSZWFkZXI7bi5vbmxvYWRlbmQ9ZnVuY3Rpb24oZSl7dm9pZCAwIT09ZS50YXJnZXQucmVzdWx0fHxudWxsIT09ZS50YXJnZXQucmVzdWx0P2kucmVzb2x2ZShlLnRhcmdldC5yZXN1bHQpOnZvaWQgMCE9PWUudGFyZ2V0LmVycm9yfHxudWxsIT09ZS50YXJnZXQuZXJyb3I/aS5yZWplY3QoZS50YXJnZXQuZXJyb3IpOmkucmVqZWN0KHtjb2RlOm51bGwsbWVzc2FnZTpcIlJFQURFUl9PTkxPQURFTkRfRVJSXCJ9KX0sbi5yZWFkQXNCaW5hcnlTdHJpbmcoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9Y2F0Y2goYSl7YS5tZXNzYWdlPXJbYS5jb2RlXSxpLnJlamVjdChhKX1yZXR1cm4gaS5wcm9taXNlfSxyZWFkQXNBcnJheUJ1ZmZlcjpmdW5jdGlvbihvLHQpe3ZhciBpPWUuZGVmZXIoKTsvXlxcLy8udGVzdCh0KSYmaS5yZWplY3QoXCJmaWxlLW5hbWUgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKG8sZnVuY3Rpb24oZSl7ZS5nZXRGaWxlKHQse2NyZWF0ZTohMX0sZnVuY3Rpb24oZSl7ZS5maWxlKGZ1bmN0aW9uKGUpe3ZhciBuPW5ldyBGaWxlUmVhZGVyO24ub25sb2FkZW5kPWZ1bmN0aW9uKGUpe3ZvaWQgMCE9PWUudGFyZ2V0LnJlc3VsdHx8bnVsbCE9PWUudGFyZ2V0LnJlc3VsdD9pLnJlc29sdmUoZS50YXJnZXQucmVzdWx0KTp2b2lkIDAhPT1lLnRhcmdldC5lcnJvcnx8bnVsbCE9PWUudGFyZ2V0LmVycm9yP2kucmVqZWN0KGUudGFyZ2V0LmVycm9yKTppLnJlamVjdCh7Y29kZTpudWxsLG1lc3NhZ2U6XCJSRUFERVJfT05MT0FERU5EX0VSUlwifSl9LG4ucmVhZEFzQXJyYXlCdWZmZXIoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9Y2F0Y2goYSl7YS5tZXNzYWdlPXJbYS5jb2RlXSxpLnJlamVjdChhKX1yZXR1cm4gaS5wcm9taXNlfSxtb3ZlRmlsZTpmdW5jdGlvbihyLG8sdCxpKXt2YXIgYT1lLmRlZmVyKCk7aT1pfHxvLCgvXlxcLy8udGVzdChvKXx8L15cXC8vLnRlc3QoaSkpJiZhLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwocixmdW5jdGlvbihlKXtlLmdldEZpbGUobyx7Y3JlYXRlOiExfSxmdW5jdGlvbihlKXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwodCxmdW5jdGlvbihuKXtlLm1vdmVUbyhuLGksZnVuY3Rpb24oZSl7YS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXthLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXthLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXthLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXthLnJlamVjdChlKX0pfWNhdGNoKGMpe2EucmVqZWN0KGMpfXJldHVybiBhLnByb21pc2V9LG1vdmVEaXI6ZnVuY3Rpb24ocixvLHQsaSl7dmFyIGE9ZS5kZWZlcigpO2k9aXx8bywoL15cXC8vLnRlc3Qobyl8fC9eXFwvLy50ZXN0KGkpKSYmYS5yZWplY3QoXCJmaWxlLW5hbWUgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKHIsZnVuY3Rpb24oZSl7ZS5nZXREaXJlY3Rvcnkobyx7Y3JlYXRlOiExfSxmdW5jdGlvbihlKXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwodCxmdW5jdGlvbihuKXtlLm1vdmVUbyhuLGksZnVuY3Rpb24oZSl7YS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXthLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXthLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXthLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXthLnJlamVjdChlKX0pfWNhdGNoKGMpe2EucmVqZWN0KGMpfXJldHVybiBhLnByb21pc2V9LGNvcHlEaXI6ZnVuY3Rpb24obyx0LGksYSl7dmFyIGM9ZS5kZWZlcigpO2E9YXx8dCwoL15cXC8vLnRlc3QodCl8fC9eXFwvLy50ZXN0KGEpKSYmYy5yZWplY3QoXCJmaWxlLW5hbWUgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKG8sZnVuY3Rpb24oZSl7ZS5nZXREaXJlY3RvcnkodCx7Y3JlYXRlOiExLGV4Y2x1c2l2ZTohMX0sZnVuY3Rpb24oZSl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKGksZnVuY3Rpb24obil7ZS5jb3B5VG8obixhLGZ1bmN0aW9uKGUpe2MucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxjLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGMucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYy5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxjLnJlamVjdChlKX0pfWNhdGNoKHUpe3UubWVzc2FnZT1yW3UuY29kZV0sYy5yZWplY3QodSl9cmV0dXJuIGMucHJvbWlzZX0sY29weUZpbGU6ZnVuY3Rpb24obyx0LGksYSl7dmFyIGM9ZS5kZWZlcigpO2E9YXx8dCwvXlxcLy8udGVzdCh0KSYmYy5yZWplY3QoXCJmaWxlLW5hbWUgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKG8sZnVuY3Rpb24oZSl7ZS5nZXRGaWxlKHQse2NyZWF0ZTohMSxleGNsdXNpdmU6ITF9LGZ1bmN0aW9uKGUpe24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChpLGZ1bmN0aW9uKG4pe2UuY29weVRvKG4sYSxmdW5jdGlvbihlKXtjLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYy5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxjLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGMucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYy5yZWplY3QoZSl9KX1jYXRjaCh1KXt1Lm1lc3NhZ2U9clt1LmNvZGVdLGMucmVqZWN0KHUpfXJldHVybiBjLnByb21pc2V9LHJlYWRGaWxlTWV0YWRhdGE6ZnVuY3Rpb24obyx0KXt2YXIgaT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmkucmVqZWN0KFwiZGlyZWN0b3J5IGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e3ZhciBhPW8rdDtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwoYSxmdW5jdGlvbihlKXtlLmZpbGUoZnVuY3Rpb24oZSl7aS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX1jYXRjaChjKXtjLm1lc3NhZ2U9cltjLmNvZGVdLGkucmVqZWN0KGMpfXJldHVybiBpLnByb21pc2V9fX1dfV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmlsZU9wZW5lcjJcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhRmlsZU9wZW5lcjJcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntvcGVuOmZ1bmN0aW9uKG4scil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuZmlsZU9wZW5lcjIub3BlbihuLHIse2Vycm9yOmZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSxzdWNjZXNzOmZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9fSksby5wcm9taXNlfSx1bmluc3RhbGw6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuZmlsZU9wZW5lcjIudW5pbnN0YWxsKG4se2Vycm9yOmZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxzdWNjZXNzOmZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9fSksci5wcm9taXNlfSxhcHBJc0luc3RhbGxlZDpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5maWxlT3BlbmVyMi5hcHBJc0luc3RhbGxlZChuLHtzdWNjZXNzOmZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX19KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmZpbGVUcmFuc2ZlclwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFGaWxlVHJhbnNmZXJcIixbXCIkcVwiLFwiJHRpbWVvdXRcIixmdW5jdGlvbihlLG4pe3JldHVybntkb3dubG9hZDpmdW5jdGlvbihyLG8sdCxpKXt2YXIgYT1lLmRlZmVyKCksYz1uZXcgRmlsZVRyYW5zZmVyLHU9dCYmdC5lbmNvZGVVUkk9PT0hMT9yOmVuY29kZVVSSShyKTtyZXR1cm4gdCYmdm9pZCAwIT09dC50aW1lb3V0JiZudWxsIT09dC50aW1lb3V0JiYobihmdW5jdGlvbigpe2MuYWJvcnQoKX0sdC50aW1lb3V0KSx0LnRpbWVvdXQ9bnVsbCksYy5vbnByb2dyZXNzPWZ1bmN0aW9uKGUpe2Eubm90aWZ5KGUpfSxhLnByb21pc2UuYWJvcnQ9ZnVuY3Rpb24oKXtjLmFib3J0KCl9LGMuZG93bmxvYWQodSxvLGEucmVzb2x2ZSxhLnJlamVjdCxpLHQpLGEucHJvbWlzZX0sdXBsb2FkOmZ1bmN0aW9uKHIsbyx0LGkpe3ZhciBhPWUuZGVmZXIoKSxjPW5ldyBGaWxlVHJhbnNmZXIsdT10JiZ0LmVuY29kZVVSST09PSExP3I6ZW5jb2RlVVJJKHIpO3JldHVybiB0JiZ2b2lkIDAhPT10LnRpbWVvdXQmJm51bGwhPT10LnRpbWVvdXQmJihuKGZ1bmN0aW9uKCl7Yy5hYm9ydCgpfSx0LnRpbWVvdXQpLHQudGltZW91dD1udWxsKSxjLm9ucHJvZ3Jlc3M9ZnVuY3Rpb24oZSl7YS5ub3RpZnkoZSl9LGEucHJvbWlzZS5hYm9ydD1mdW5jdGlvbigpe2MuYWJvcnQoKX0sYy51cGxvYWQobyx1LGEucmVzb2x2ZSxhLnJlamVjdCx0LGkpLGEucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmxhc2hsaWdodFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFGbGFzaGxpZ2h0XCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybnthdmFpbGFibGU6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5mbGFzaGxpZ2h0LmF2YWlsYWJsZShmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9KSxyLnByb21pc2V9LHN3aXRjaE9uOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuZmxhc2hsaWdodC5zd2l0Y2hPbihmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxzd2l0Y2hPZmY6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5mbGFzaGxpZ2h0LnN3aXRjaE9mZihmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSx0b2dnbGU6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5mbGFzaGxpZ2h0LnRvZ2dsZShmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5mbHVycnlBZHNcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhRmx1cnJ5QWRzXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntzZXRPcHRpb25zOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5GbHVycnlBZHMuc2V0T3B0aW9ucyhyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sY3JlYXRlQmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5GbHVycnlBZHMuY3JlYXRlQmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxyZW1vdmVCYW5uZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uRmx1cnJ5QWRzLnJlbW92ZUJhbm5lcihmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHNob3dCYW5uZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLkZsdXJyeUFkcy5zaG93QmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93QmFubmVyQXRYWTpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi5GbHVycnlBZHMuc2hvd0Jhbm5lckF0WFkocixvLGZ1bmN0aW9uKCl7dC5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7dC5yZWplY3QoKX0pLHQucHJvbWlzZX0saGlkZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5GbHVycnlBZHMuaGlkZUJhbm5lcihmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHByZXBhcmVJbnRlcnN0aXRpYWw6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLkZsdXJyeUFkcy5wcmVwYXJlSW50ZXJzdGl0aWFsKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93SW50ZXJzdGl0aWFsOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLkZsdXJyeUFkcy5zaG93SW50ZXJzdGl0aWFsKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ2FcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhR0FcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2luaXQ6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG89bz49MD9vOjEwLG4ucGx1Z2lucy5nYVBsdWdpbi5pbml0KGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7dC5yZWplY3QoZSl9LHIsbyksdC5wcm9taXNlfSx0cmFja0V2ZW50OmZ1bmN0aW9uKHIsbyx0LGksYSxjKXt2YXIgdT1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5nYVBsdWdpbi50cmFja0V2ZW50KGZ1bmN0aW9uKGUpe3UucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7dS5yZWplY3QoZSl9LHQsaSxhLGMpLHUucHJvbWlzZX0sdHJhY2tQYWdlOmZ1bmN0aW9uKHIsbyx0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5nYVBsdWdpbi50cmFja1BhZ2UoZnVuY3Rpb24oZSl7aS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtpLnJlamVjdChlKX0sdCksaS5wcm9taXNlfSxzZXRWYXJpYWJsZTpmdW5jdGlvbihyLG8sdCxpKXt2YXIgYT1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5nYVBsdWdpbi5zZXRWYXJpYWJsZShmdW5jdGlvbihlKXthLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2EucmVqZWN0KGUpfSx0LGkpLGEucHJvbWlzZX0sZXhpdDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmdhUGx1Z2luLmV4aXQoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ2VvbG9jYXRpb25cIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhR2VvbG9jYXRpb25cIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntnZXRDdXJyZW50UG9zaXRpb246ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LG4pLHIucHJvbWlzZX0sd2F0Y2hQb3NpdGlvbjpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCksbz1uYXZpZ2F0b3IuZ2VvbG9jYXRpb24ud2F0Y2hQb3NpdGlvbihmdW5jdGlvbihlKXtyLm5vdGlmeShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LG4pO3JldHVybiByLnByb21pc2UuY2FuY2VsPWZ1bmN0aW9uKCl7bmF2aWdhdG9yLmdlb2xvY2F0aW9uLmNsZWFyV2F0Y2gobyl9LHIucHJvbWlzZS5jbGVhcldhdGNoPWZ1bmN0aW9uKGUpe25hdmlnYXRvci5nZW9sb2NhdGlvbi5jbGVhcldhdGNoKGV8fG8pfSxyLnByb21pc2Uud2F0Y2hJRD1vLHIucHJvbWlzZX0sY2xlYXJXYXRjaDpmdW5jdGlvbihlKXtyZXR1cm4gbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmNsZWFyV2F0Y2goZSl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmdsb2JhbGl6YXRpb25cIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhR2xvYmFsaXphdGlvblwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2dldFByZWZlcnJlZExhbmd1YWdlOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZ2xvYmFsaXphdGlvbi5nZXRQcmVmZXJyZWRMYW5ndWFnZShmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxnZXRMb2NhbGVOYW1lOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZ2xvYmFsaXphdGlvbi5nZXRMb2NhbGVOYW1lKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9LGdldEZpcnN0RGF5T2ZXZWVrOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZ2xvYmFsaXphdGlvbi5nZXRGaXJzdERheU9mV2VlayhmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxkYXRlVG9TdHJpbmc6ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLmRhdGVUb1N0cmluZyhuLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9LHIpLG8ucHJvbWlzZX0sc3RyaW5nVG9EYXRlOmZ1bmN0aW9uKG4scil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZ2xvYmFsaXphdGlvbi5zdHJpbmdUb0RhdGUobixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSxyKSxvLnByb21pc2V9LGdldERhdGVQYXR0ZXJuOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmdsb2JhbGl6YXRpb24uZ2V0RGF0ZVBhdHRlcm4oZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbiksci5wcm9taXNlfSxnZXREYXRlTmFtZXM6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZ2xvYmFsaXphdGlvbi5nZXREYXRlTmFtZXMoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbiksci5wcm9taXNlfSxpc0RheUxpZ2h0U2F2aW5nc1RpbWU6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZ2xvYmFsaXphdGlvbi5pc0RheUxpZ2h0U2F2aW5nc1RpbWUobixmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxudW1iZXJUb1N0cmluZzpmdW5jdGlvbihuLHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmdsb2JhbGl6YXRpb24ubnVtYmVyVG9TdHJpbmcobixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSxyKSxvLnByb21pc2V9LHN0cmluZ1RvTnVtYmVyOmZ1bmN0aW9uKG4scil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZ2xvYmFsaXphdGlvbi5zdHJpbmdUb051bWJlcihuLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9LHIpLG8ucHJvbWlzZX0sZ2V0TnVtYmVyUGF0dGVybjpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLmdldE51bWJlclBhdHRlcm4oZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbiksci5wcm9taXNlfSxnZXRDdXJyZW5jeVBhdHRlcm46ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZ2xvYmFsaXphdGlvbi5nZXRDdXJyZW5jeVBhdHRlcm4obixmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5nb29nbGVBZHNcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhR29vZ2xlQWRzXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntzZXRPcHRpb25zOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5BZE1vYi5zZXRPcHRpb25zKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxjcmVhdGVCYW5uZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLkFkTW9iLmNyZWF0ZUJhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0scmVtb3ZlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLkFkTW9iLnJlbW92ZUJhbm5lcihmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHNob3dCYW5uZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLkFkTW9iLnNob3dCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dCYW5uZXJBdFhZOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLkFkTW9iLnNob3dCYW5uZXJBdFhZKHIsbyxmdW5jdGlvbigpe3QucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3QucmVqZWN0KCl9KSx0LnByb21pc2V9LGhpZGVCYW5uZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uQWRNb2IuaGlkZUJhbm5lcihmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHByZXBhcmVJbnRlcnN0aXRpYWw6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLkFkTW9iLnByZXBhcmVJbnRlcnN0aXRpYWwocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dJbnRlcnN0aXRpYWw6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uQWRNb2Iuc2hvd0ludGVyc3RpdGlhbChmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmdvb2dsZUFuYWx5dGljc1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFHb29nbGVBbmFseXRpY3NcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3N0YXJ0VHJhY2tlcldpdGhJZDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uYW5hbHl0aWNzLnN0YXJ0VHJhY2tlcldpdGhJZChyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHNldFVzZXJJZDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uYW5hbHl0aWNzLnNldFVzZXJJZChyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGRlYnVnTW9kZTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5hbmFseXRpY3MuZGVidWdNb2RlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSx0cmFja1ZpZXc6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmFuYWx5dGljcy50cmFja1ZpZXcocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxhZGRDdXN0b21EaW1lbnNpb246ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCksaT1wYXJzZUludChyLDEwKTtyZXR1cm4gaXNOYU4oaSkmJnQucmVqZWN0KCdQYXJhbWV0ZXIgXCJrZXlcIiBtdXN0IGJlIGFuIGludGVnZXIuJyksbi5hbmFseXRpY3MuYWRkQ3VzdG9tRGltZW5zaW9uKGksbyxmdW5jdGlvbigpe3QucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0pLHQucHJvbWlzZX0sdHJhY2tFdmVudDpmdW5jdGlvbihyLG8sdCxpKXt2YXIgYT1lLmRlZmVyKCk7cmV0dXJuIG4uYW5hbHl0aWNzLnRyYWNrRXZlbnQocixvLHQsaSxmdW5jdGlvbihlKXthLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2EucmVqZWN0KGUpfSksYS5wcm9taXNlfSx0cmFja0V4Y2VwdGlvbjpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi5hbmFseXRpY3MudHJhY2tFeGNlcHRpb24ocixvLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7dC5yZWplY3QoZSl9KSx0LnByb21pc2V9LHRyYWNrVGltaW5nOmZ1bmN0aW9uKHIsbyx0LGkpe3ZhciBhPWUuZGVmZXIoKTtyZXR1cm4gbi5hbmFseXRpY3MudHJhY2tUaW1pbmcocixvLHQsaSxmdW5jdGlvbihlKXthLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2EucmVqZWN0KGUpfSksYS5wcm9taXNlfSxhZGRUcmFuc2FjdGlvbjpmdW5jdGlvbihyLG8sdCxpLGEsYyl7dmFyIHU9ZS5kZWZlcigpO3JldHVybiBuLmFuYWx5dGljcy5hZGRUcmFuc2FjdGlvbihyLG8sdCxpLGEsYyxmdW5jdGlvbihlKXt1LnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3UucmVqZWN0KGUpfSksdS5wcm9taXNlfSxhZGRUcmFuc2FjdGlvbkl0ZW06ZnVuY3Rpb24ocixvLHQsaSxhLGMsdSl7dmFyIHM9ZS5kZWZlcigpO3JldHVybiBuLmFuYWx5dGljcy5hZGRUcmFuc2FjdGlvbkl0ZW0ocixvLHQsaSxhLGMsdSxmdW5jdGlvbihlKXtzLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3MucmVqZWN0KGUpfSkscy5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5nb29nbGVNYXBcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhR29vZ2xlTWFwXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3ZhciByPW51bGw7cmV0dXJue2dldE1hcDpmdW5jdGlvbihvKXt2YXIgdD1lLmRlZmVyKCk7aWYobi5wbHVnaW4uZ29vZ2xlLm1hcHMpe3ZhciBpPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFwX2NhbnZhc1wiKTtyPW4ucGx1Z2luLmdvb2dsZS5tYXBzLk1hcC5nZXRNYXAobyksci5zZXREaXYoaSksdC5yZXNvbHZlKHIpfWVsc2UgdC5yZWplY3QobnVsbCk7cmV0dXJuIHQucHJvbWlzZX0saXNNYXBMb2FkZWQ6ZnVuY3Rpb24oKXtyZXR1cm4hIXJ9LGFkZE1hcmtlcjpmdW5jdGlvbihuKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHIuYWRkTWFya2VyKG4sZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSksby5wcm9taXNlfSxnZXRNYXBUeXBlSWRzOmZ1bmN0aW9uKCl7cmV0dXJuIG4ucGx1Z2luLmdvb2dsZS5tYXBzLm1hcFR5cGVJZH0sc2V0VmlzaWJsZTpmdW5jdGlvbihuKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHIuc2V0VmlzaWJsZShuKSxvLnByb21pc2V9LGNsZWFudXA6ZnVuY3Rpb24oKXtyPW51bGx9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmdvb2dsZVBsYXlHYW1lXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUdvb2dsZVBsYXlHYW1lXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57YXV0aDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gZ29vZ2xlcGxheWdhbWUuYXV0aChmdW5jdGlvbihlKXtyZXR1cm4gbi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyZXR1cm4gbi5yZWplY3QoZSl9KSxuLnByb21pc2V9LHNpZ25vdXQ6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGdvb2dsZXBsYXlnYW1lLnNpZ25vdXQoZnVuY3Rpb24oZSl7cmV0dXJuIG4ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7cmV0dXJuIG4ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxpc1NpZ25lZEluOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBnb29nbGVwbGF5Z2FtZS5pc1NpZ25lZEluKGZ1bmN0aW9uKGUpe3JldHVybiBuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3JldHVybiBuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sc2hvd1BsYXllcjpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gZ29vZ2xlcGxheWdhbWUuc2hvd1BsYXllcihmdW5jdGlvbihlKXtyZXR1cm4gbi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyZXR1cm4gbi5yZWplY3QoZSl9KSxuLnByb21pc2V9LHN1Ym1pdFNjb3JlOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gZ29vZ2xlcGxheWdhbWUuc3VibWl0U2NvcmUobixmdW5jdGlvbihlKXtyZXR1cm4gci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyZXR1cm4gci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHNob3dBbGxMZWFkZXJib2FyZHM6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGdvb2dsZXBsYXlnYW1lLnNob3dBbGxMZWFkZXJib2FyZHMoZnVuY3Rpb24oZSl7cmV0dXJuIG4ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7cmV0dXJuIG4ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxzaG93TGVhZGVyYm9hcmQ6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBnb29nbGVwbGF5Z2FtZS5zaG93TGVhZGVyYm9hcmQobixmdW5jdGlvbihlKXtyZXR1cm4gci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyZXR1cm4gci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHVubG9ja0FjaGlldmVtZW50OmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gZ29vZ2xlcGxheWdhbWUudW5sb2NrQWNoaWV2ZW1lbnQobixmdW5jdGlvbihlKXtyZXR1cm4gci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyZXR1cm4gci5yZWplY3QoZSl9KSxyLnByb21pc2V9LGluY3JlbWVudEFjaGlldmVtZW50OmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gZ29vZ2xlcGxheWdhbWUuaW5jcmVtZW50QWNoaWV2ZW1lbnQobixmdW5jdGlvbihlKXtyZXR1cm4gci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyZXR1cm4gci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHNob3dBY2hpZXZlbWVudHM6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGdvb2dsZXBsYXlnYW1lLnNob3dBY2hpZXZlbWVudHMoZnVuY3Rpb24oZSl7cmV0dXJuIG4ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7cmV0dXJuIG4ucmVqZWN0KGUpfSksbi5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5nb29nbGVQbHVzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUdvb2dsZVBsdXNcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2xvZ2luOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gdm9pZCAwPT09ciYmKHI9e30pLG4ucGx1Z2lucy5nb29nbGVwbHVzLmxvZ2luKHtpT1NBcGlLZXk6cn0sZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sc2lsZW50TG9naW46ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiB2b2lkIDA9PT1yJiYocj17fSksbi5wbHVnaW5zLmdvb2dsZXBsdXMudHJ5U2lsZW50TG9naW4oe2lPU0FwaUtleTpyfSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxsb2dvdXQ6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7bi5wbHVnaW5zLmdvb2dsZXBsdXMubG9nb3V0KGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0pfSxkaXNjb25uZWN0OmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO24ucGx1Z2lucy5nb29nbGVwbHVzLmRpc2Nvbm5lY3QoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSl9LGlzQXZhaWxhYmxlOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuZ29vZ2xlcGx1cy5pc0F2YWlsYWJsZShmdW5jdGlvbihlKXtlP3IucmVzb2x2ZShlKTpyLnJlamVjdChlKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuaGVhbHRoS2l0XCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUhlYWx0aEtpdFwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57aXNBdmFpbGFibGU6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5oZWFsdGhraXQuYXZhaWxhYmxlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LGNoZWNrQXV0aFN0YXR1czpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8XCJIS1F1YW50aXR5VHlwZUlkZW50aWZpZXJIZWlnaHRcIixuLnBsdWdpbnMuaGVhbHRoa2l0LmNoZWNrQXV0aFN0YXR1cyh7dHlwZTpyfSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxyZXF1ZXN0QXV0aG9yaXphdGlvbjpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gcj1yfHxbXCJIS0NoYXJhY3RlcmlzdGljVHlwZUlkZW50aWZpZXJEYXRlT2ZCaXJ0aFwiLFwiSEtRdWFudGl0eVR5cGVJZGVudGlmaWVyQWN0aXZlRW5lcmd5QnVybmVkXCIsXCJIS1F1YW50aXR5VHlwZUlkZW50aWZpZXJIZWlnaHRcIl0sbz1vfHxbXCJIS1F1YW50aXR5VHlwZUlkZW50aWZpZXJBY3RpdmVFbmVyZ3lCdXJuZWRcIixcIkhLUXVhbnRpdHlUeXBlSWRlbnRpZmllckhlaWdodFwiLFwiSEtRdWFudGl0eVR5cGVJZGVudGlmaWVyRGlzdGFuY2VDeWNsaW5nXCJdLG4ucGx1Z2lucy5oZWFsdGhraXQucmVxdWVzdEF1dGhvcml6YXRpb24oe3JlYWRUeXBlczpyLHdyaXRlVHlwZXM6b30sZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0pLHQucHJvbWlzZX0scmVhZERhdGVPZkJpcnRoOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuaGVhbHRoa2l0LnJlYWREYXRlT2ZCaXJ0aChmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0pLHIucHJvbWlzZX0scmVhZEdlbmRlcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmhlYWx0aGtpdC5yZWFkR2VuZGVyKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSksci5wcm9taXNlfSxzYXZlV2VpZ2h0OmZ1bmN0aW9uKHIsbyx0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5oZWFsdGhraXQuc2F2ZVdlaWdodCh7dW5pdDpvfHxcImxiXCIsYW1vdW50OnIsZGF0ZTp0fHxuZXcgRGF0ZX0sZnVuY3Rpb24oZSl7aS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtpLnJlc29sdmUoZSl9KSxpLnByb21pc2V9LHJlYWRXZWlnaHQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuaGVhbHRoa2l0LnJlYWRXZWlnaHQoe3VuaXQ6cnx8XCJsYlwifSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0pLG8ucHJvbWlzZX0sc2F2ZUhlaWdodDpmdW5jdGlvbihyLG8sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuaGVhbHRoa2l0LnNhdmVIZWlnaHQoe3VuaXQ6b3x8XCJpblwiLGFtb3VudDpyLGRhdGU6dHx8bmV3IERhdGV9LGZ1bmN0aW9uKGUpe2kucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7aS5yZXNvbHZlKGUpfSksaS5wcm9taXNlfSxyZWFkSGVpZ2h0OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmhlYWx0aGtpdC5yZWFkSGVpZ2h0KHt1bml0OnJ8fFwiaW5cIn0sZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9KSxvLnByb21pc2V9LGZpbmRXb3Jrb3V0czpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmhlYWx0aGtpdC5maW5kV29ya291dHMoe30sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9KSxyLnByb21pc2V9LHNhdmVXb3Jrb3V0OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmhlYWx0aGtpdC5zYXZlV29ya291dChyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSksby5wcm9taXNlfSxxdWVyeVNhbXBsZVR5cGU6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuaGVhbHRoa2l0LnF1ZXJ5U2FtcGxlVHlwZShyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSksby5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5odHRwZFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFIdHRwZFwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue3N0YXJ0U2VydmVyOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLkNvckh0dHBkLnN0YXJ0U2VydmVyKG4sZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxzdG9wU2VydmVyOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuQ29ySHR0cGQuc3RvcFNlcnZlcihmdW5jdGlvbigpe24ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe24ucmVqZWN0KCl9KSxuLnByb21pc2V9LGdldFVSTDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLkNvckh0dHBkLmdldFVSTChmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKCl7bi5yZWplY3QoKX0pLG4ucHJvbWlzZX0sZ2V0TG9jYWxQYXRoOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuQ29ySHR0cGQuZ2V0TG9jYWxQYXRoKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oKXtuLnJlamVjdCgpfSksbi5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5pQWRcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhaUFkXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntzZXRPcHRpb25zOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5pQWQuc2V0T3B0aW9ucyhyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sY3JlYXRlQmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5pQWQuY3JlYXRlQmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxyZW1vdmVCYW5uZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uaUFkLnJlbW92ZUJhbm5lcihmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHNob3dCYW5uZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmlBZC5zaG93QmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93QmFubmVyQXRYWTpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi5pQWQuc2hvd0Jhbm5lckF0WFkocixvLGZ1bmN0aW9uKCl7dC5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7dC5yZWplY3QoKX0pLHQucHJvbWlzZX0saGlkZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5pQWQuaGlkZUJhbm5lcihmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHByZXBhcmVJbnRlcnN0aXRpYWw6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmlBZC5wcmVwYXJlSW50ZXJzdGl0aWFsKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93SW50ZXJzdGl0aWFsOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmlBZC5zaG93SW50ZXJzdGl0aWFsKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuaW1hZ2VQaWNrZXJcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhSW1hZ2VQaWNrZXJcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2dldFBpY3R1cmVzOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5pbWFnZVBpY2tlci5nZXRQaWN0dXJlcyhmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSxyKSxvLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmluQXBwQnJvd3NlclwiLFtdKS5wcm92aWRlcihcIiRjb3Jkb3ZhSW5BcHBCcm93c2VyXCIsW2Z1bmN0aW9uKCl7dmFyIGUsbj10aGlzLmRlZmF1bHRPcHRpb25zPXt9O3RoaXMuc2V0RGVmYXVsdE9wdGlvbnM9ZnVuY3Rpb24oZSl7bj1hbmd1bGFyLmV4dGVuZChuLGUpfSx0aGlzLiRnZXQ9W1wiJHJvb3RTY29wZVwiLFwiJHFcIixcIiR3aW5kb3dcIixcIiR0aW1lb3V0XCIsZnVuY3Rpb24ocixvLHQsaSl7cmV0dXJue29wZW46ZnVuY3Rpb24oYSxjLHUpe3ZhciBzPW8uZGVmZXIoKTtpZih1JiYhYW5ndWxhci5pc09iamVjdCh1KSlyZXR1cm4gcy5yZWplY3QoXCJvcHRpb25zIG11c3QgYmUgYW4gb2JqZWN0XCIpLHMucHJvbWlzZTt2YXIgbD1hbmd1bGFyLmV4dGVuZCh7fSxuLHUpLGY9W107YW5ndWxhci5mb3JFYWNoKGwsZnVuY3Rpb24oZSxuKXtmLnB1c2gobitcIj1cIitlKX0pO3ZhciBkPWYuam9pbigpO3JldHVybiBlPXQub3BlbihhLGMsZCksZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZHN0YXJ0XCIsZnVuY3Rpb24oZSl7aShmdW5jdGlvbigpe3IuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhSW5BcHBCcm93c2VyOmxvYWRzdGFydFwiLGUpfSl9LCExKSxlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2Fkc3RvcFwiLGZ1bmN0aW9uKGUpe3MucmVzb2x2ZShlKSxpKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFJbkFwcEJyb3dzZXI6bG9hZHN0b3BcIixlKX0pfSwhMSksZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVycm9yXCIsZnVuY3Rpb24oZSl7cy5yZWplY3QoZSksaShmdW5jdGlvbigpe3IuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhSW5BcHBCcm93c2VyOmxvYWRlcnJvclwiLGUpfSl9LCExKSxlLmFkZEV2ZW50TGlzdGVuZXIoXCJleGl0XCIsZnVuY3Rpb24oZSl7aShmdW5jdGlvbigpe3IuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhSW5BcHBCcm93c2VyOmV4aXRcIixlKX0pfSwhMSkscy5wcm9taXNlfSxjbG9zZTpmdW5jdGlvbigpe2UuY2xvc2UoKSxlPW51bGx9LHNob3c6ZnVuY3Rpb24oKXtlLnNob3coKX0sZXhlY3V0ZVNjcmlwdDpmdW5jdGlvbihuKXt2YXIgcj1vLmRlZmVyKCk7cmV0dXJuIGUuZXhlY3V0ZVNjcmlwdChuLGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0pLHIucHJvbWlzZX0saW5zZXJ0Q1NTOmZ1bmN0aW9uKG4pe3ZhciByPW8uZGVmZXIoKTtyZXR1cm4gZS5pbnNlcnRDU1MobixmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9KSxyLnByb21pc2V9fX1dfV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuaW5zb21uaWFcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhSW5zb21uaWFcIixbXCIkd2luZG93XCIsZnVuY3Rpb24oZSl7cmV0dXJue2tlZXBBd2FrZTpmdW5jdGlvbigpe3JldHVybiBlLnBsdWdpbnMuaW5zb21uaWEua2VlcEF3YWtlKCl9LGFsbG93U2xlZXBBZ2FpbjpmdW5jdGlvbigpe3JldHVybiBlLnBsdWdpbnMuaW5zb21uaWEuYWxsb3dTbGVlcEFnYWluKCl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmluc3RhZ3JhbVwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFJbnN0YWdyYW1cIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntzaGFyZTpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIHdpbmRvdy5JbnN0YWdyYW0/KEluc3RhZ3JhbS5zaGFyZShuLmltYWdlLG4uY2FwdGlvbixmdW5jdGlvbihlKXtlP3IucmVqZWN0KGUpOnIucmVzb2x2ZSghMCl9KSxyLnByb21pc2UpOihjb25zb2xlLmVycm9yKFwiVHJpZWQgdG8gY2FsbCBJbnN0YWdyYW0uc2hhcmUgYnV0IHRoZSBJbnN0YWdyYW0gcGx1Z2luIGlzbid0IGluc3RhbGxlZCFcIiksci5yZXNvbHZlKG51bGwpLHIucHJvbWlzZSl9LGlzSW5zdGFsbGVkOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiB3aW5kb3cuSW5zdGFncmFtPyhJbnN0YWdyYW0uaXNJbnN0YWxsZWQoZnVuY3Rpb24oZSxyKXtlP24ucmVqZWN0KGUpOm4ucmVzb2x2ZShyKX0pLG4ucHJvbWlzZSk6KGNvbnNvbGUuZXJyb3IoXCJUcmllZCB0byBjYWxsIEluc3RhZ3JhbS5pc0luc3RhbGxlZCBidXQgdGhlIEluc3RhZ3JhbSBwbHVnaW4gaXNuJ3QgaW5zdGFsbGVkIVwiKSxuLnJlc29sdmUobnVsbCksbi5wcm9taXNlKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMua2V5Ym9hcmRcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhS2V5Ym9hcmRcIixbXCIkcm9vdFNjb3BlXCIsZnVuY3Rpb24oZSl7dmFyIG49ZnVuY3Rpb24oKXtlLiRldmFsQXN5bmMoZnVuY3Rpb24oKXtlLiRicm9hZGNhc3QoXCIkY29yZG92YUtleWJvYXJkOnNob3dcIil9KX0scj1mdW5jdGlvbigpe2UuJGV2YWxBc3luYyhmdW5jdGlvbigpe2UuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhS2V5Ym9hcmQ6aGlkZVwiKX0pfTtyZXR1cm4gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRldmljZXJlYWR5XCIsZnVuY3Rpb24oKXtjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQmJih3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm5hdGl2ZS5rZXlib2FyZHNob3dcIixuLCExKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm5hdGl2ZS5rZXlib2FyZGhpZGVcIixyLCExKSl9KSx7aGlkZUFjY2Vzc29yeUJhcjpmdW5jdGlvbihlKXtyZXR1cm4gY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcihlKX0sY2xvc2U6ZnVuY3Rpb24oKXtyZXR1cm4gY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmNsb3NlKCl9LHNob3c6ZnVuY3Rpb24oKXtyZXR1cm4gY29yZG92YS5wbHVnaW5zLktleWJvYXJkLnNob3coKX0sZGlzYWJsZVNjcm9sbDpmdW5jdGlvbihlKXtyZXR1cm4gY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwoZSl9LGlzVmlzaWJsZTpmdW5jdGlvbigpe3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaXNWaXNpYmxlfSxjbGVhclNob3dXYXRjaDpmdW5jdGlvbigpe2RvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJuYXRpdmUua2V5Ym9hcmRzaG93XCIsbiksZS4kJGxpc3RlbmVyc1tcIiRjb3Jkb3ZhS2V5Ym9hcmQ6c2hvd1wiXT1bXX0sY2xlYXJIaWRlV2F0Y2g6ZnVuY3Rpb24oKXtkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibmF0aXZlLmtleWJvYXJkaGlkZVwiLHIpLGUuJCRsaXN0ZW5lcnNbXCIkY29yZG92YUtleWJvYXJkOmhpZGVcIl09W119fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmtleWNoYWluXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUtleWNoYWluXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57Z2V0Rm9yS2V5OmZ1bmN0aW9uKG4scil7dmFyIG89ZS5kZWZlcigpLHQ9bmV3IEtleWNoYWluO3JldHVybiB0LmdldEZvcktleShvLnJlc29sdmUsby5yZWplY3QsbixyKSxvLnByb21pc2V9LHNldEZvcktleTpmdW5jdGlvbihuLHIsbyl7dmFyIHQ9ZS5kZWZlcigpLGk9bmV3IEtleWNoYWluO3JldHVybiBpLnNldEZvcktleSh0LnJlc29sdmUsdC5yZWplY3QsbixyLG8pLHQucHJvbWlzZX0scmVtb3ZlRm9yS2V5OmZ1bmN0aW9uKG4scil7dmFyIG89ZS5kZWZlcigpLHQ9bmV3IEtleWNoYWluO3JldHVybiB0LnJlbW92ZUZvcktleShvLnJlc29sdmUsby5yZWplY3QsbixyKSxvLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmxhdW5jaE5hdmlnYXRvclwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFMYXVuY2hOYXZpZ2F0b3JcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntuYXZpZ2F0ZTpmdW5jdGlvbihuLHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBsYXVuY2huYXZpZ2F0b3IubmF2aWdhdGUobixyLGZ1bmN0aW9uKCl7dC5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSxvKSx0LnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmxvY2FsTm90aWZpY2F0aW9uXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUxvY2FsTm90aWZpY2F0aW9uXCIsW1wiJHFcIixcIiR3aW5kb3dcIixcIiRyb290U2NvcGVcIixcIiR0aW1lb3V0XCIsZnVuY3Rpb24oZSxuLHIsbyl7cmV0dXJuIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkZXZpY2VyZWFkeVwiLGZ1bmN0aW9uKCl7bi5jb3Jkb3ZhJiZuLmNvcmRvdmEucGx1Z2lucyYmbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uJiZuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwmJihuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwub24oXCJzY2hlZHVsZVwiLGZ1bmN0aW9uKGUsbil7byhmdW5jdGlvbigpe3IuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhTG9jYWxOb3RpZmljYXRpb246c2NoZWR1bGVcIixlLG4pfSl9KSxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwub24oXCJ0cmlnZ2VyXCIsZnVuY3Rpb24oZSxuKXtvKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFMb2NhbE5vdGlmaWNhdGlvbjp0cmlnZ2VyXCIsZSxuKX0pfSksbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLm9uKFwidXBkYXRlXCIsZnVuY3Rpb24oZSxuKXtvKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFMb2NhbE5vdGlmaWNhdGlvbjp1cGRhdGVcIixlLG4pfSl9KSxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwub24oXCJjbGVhclwiLGZ1bmN0aW9uKGUsbil7byhmdW5jdGlvbigpe3IuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhTG9jYWxOb3RpZmljYXRpb246Y2xlYXJcIixlLG4pfSl9KSxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwub24oXCJjbGVhcmFsbFwiLGZ1bmN0aW9uKGUpe28oZnVuY3Rpb24oKXtyLiRicm9hZGNhc3QoXCIkY29yZG92YUxvY2FsTm90aWZpY2F0aW9uOmNsZWFyYWxsXCIsZSl9KX0pLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5vbihcImNhbmNlbFwiLGZ1bmN0aW9uKGUsbil7byhmdW5jdGlvbigpe3IuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhTG9jYWxOb3RpZmljYXRpb246Y2FuY2VsXCIsZSxuKX0pfSksbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLm9uKFwiY2FuY2VsYWxsXCIsZnVuY3Rpb24oZSl7byhmdW5jdGlvbigpe3IuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhTG9jYWxOb3RpZmljYXRpb246Y2FuY2VsYWxsXCIsZSl9KX0pLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5vbihcImNsaWNrXCIsZnVuY3Rpb24oZSxuKXtvKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFMb2NhbE5vdGlmaWNhdGlvbjpjbGlja1wiLGUsbil9KX0pKX0sITEpLHtzY2hlZHVsZTpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbz1vfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5zY2hlZHVsZShyLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sbyksdC5wcm9taXNlfSxhZGQ6ZnVuY3Rpb24ocixvKXtjb25zb2xlLndhcm4oJ0RlcHJlY2F0ZWQ6IHVzZSBcInNjaGVkdWxlXCIgaW5zdGVhZC4nKTt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuc2NoZWR1bGUocixmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LG8pLHQucHJvbWlzZX0sdXBkYXRlOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLnVwZGF0ZShyLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sbyksdC5wcm9taXNlfSxjbGVhcjpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtcclxucmV0dXJuIG89b3x8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuY2xlYXIocixmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LG8pLHQucHJvbWlzZX0sY2xlYXJBbGw6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmNsZWFyQWxsKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sciksby5wcm9taXNlfSxjYW5jZWw6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuY2FuY2VsKHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxvKSx0LnByb21pc2V9LGNhbmNlbEFsbDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuY2FuY2VsQWxsKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sciksby5wcm9taXNlfSxpc1ByZXNlbnQ6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuaXNQcmVzZW50KHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxvKSx0LnByb21pc2V9LGlzU2NoZWR1bGVkOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmlzU2NoZWR1bGVkKHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxvKSx0LnByb21pc2V9LGlzVHJpZ2dlcmVkOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmlzVHJpZ2dlcmVkKHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxvKSx0LnByb21pc2V9LGhhc1Blcm1pc3Npb246ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmhhc1Blcm1pc3Npb24oZnVuY3Rpb24oZSl7ZT9vLnJlc29sdmUoZSk6by5yZWplY3QoZSl9LHIpLG8ucHJvbWlzZX0scmVnaXN0ZXJQZXJtaXNzaW9uOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gcj1yfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5yZWdpc3RlclBlcm1pc3Npb24oZnVuY3Rpb24oZSl7ZT9vLnJlc29sdmUoZSk6by5yZWplY3QoZSl9LHIpLG8ucHJvbWlzZX0scHJvbXB0Rm9yUGVybWlzc2lvbjpmdW5jdGlvbihyKXtjb25zb2xlLndhcm4oJ0RlcHJlY2F0ZWQ6IHVzZSBcInJlZ2lzdGVyUGVybWlzc2lvblwiIGluc3RlYWQuJyk7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLnJlZ2lzdGVyUGVybWlzc2lvbihmdW5jdGlvbihlKXtlP28ucmVzb2x2ZShlKTpvLnJlamVjdChlKX0sciksby5wcm9taXNlfSxnZXRBbGxJZHM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmdldEFsbElkcyhmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LHIpLG8ucHJvbWlzZX0sZ2V0SWRzOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gcj1yfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5nZXRJZHMoZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxyKSxvLnByb21pc2V9LGdldFNjaGVkdWxlZElkczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuZ2V0U2NoZWR1bGVkSWRzKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sciksby5wcm9taXNlfSxnZXRUcmlnZ2VyZWRJZHM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmdldFRyaWdnZXJlZElkcyhmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LHIpLG8ucHJvbWlzZX0sZ2V0OmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmdldChyLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sbyksdC5wcm9taXNlfSxnZXRBbGw6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmdldEFsbChmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LHIpLG8ucHJvbWlzZX0sZ2V0U2NoZWR1bGVkOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmdldFNjaGVkdWxlZChyLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sbyksdC5wcm9taXNlfSxnZXRBbGxTY2hlZHVsZWQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmdldEFsbFNjaGVkdWxlZChmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LHIpLG8ucHJvbWlzZX0sZ2V0VHJpZ2dlcmVkOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmdldFRyaWdnZXJlZChyLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sbyksdC5wcm9taXNlfSxnZXRBbGxUcmlnZ2VyZWQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmdldEFsbFRyaWdnZXJlZChmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LHIpLG8ucHJvbWlzZX0sZ2V0RGVmYXVsdHM6ZnVuY3Rpb24oKXtyZXR1cm4gbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmdldERlZmF1bHRzKCl9LHNldERlZmF1bHRzOmZ1bmN0aW9uKGUpe24uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5zZXREZWZhdWx0cyhlKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMubU1lZGlhQWRzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YU1NZWRpYUFkc1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57c2V0T3B0aW9uczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ubU1lZGlhLnNldE9wdGlvbnMocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LGNyZWF0ZUJhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ubU1lZGlhLmNyZWF0ZUJhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0scmVtb3ZlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLm1NZWRpYS5yZW1vdmVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxzaG93QmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5tTWVkaWEuc2hvd0Jhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0Jhbm5lckF0WFk6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4ubU1lZGlhLnNob3dCYW5uZXJBdFhZKHIsbyxmdW5jdGlvbigpe3QucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3QucmVqZWN0KCl9KSx0LnByb21pc2V9LGhpZGVCYW5uZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ubU1lZGlhLmhpZGVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxwcmVwYXJlSW50ZXJzdGl0aWFsOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5tTWVkaWEucHJlcGFyZUludGVyc3RpdGlhbChyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0ludGVyc3RpdGlhbDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5tTWVkaWEuc2hvd0ludGVyc3RpdGlhbChmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLm1lZGlhXCIsW10pLnNlcnZpY2UoXCJOZXdNZWRpYVwiLFtcIiRxXCIsXCIkaW50ZXJ2YWxcIixmdW5jdGlvbihlLG4pe2Z1bmN0aW9uIHIoZSl7YW5ndWxhci5pc0RlZmluZWQocyl8fChzPW4oZnVuY3Rpb24oKXswPmQmJihkPWUuZ2V0RHVyYXRpb24oKSxhJiZkPjAmJmEubm90aWZ5KHtkdXJhdGlvbjpkfSkpLGUuZ2V0Q3VycmVudFBvc2l0aW9uKGZ1bmN0aW9uKGUpe2U+LTEmJihmPWUpfSxmdW5jdGlvbihlKXtjb25zb2xlLmxvZyhcIkVycm9yIGdldHRpbmcgcG9zPVwiK2UpfSksYSYmYS5ub3RpZnkoe3Bvc2l0aW9uOmZ9KX0sMWUzKSl9ZnVuY3Rpb24gbygpe2FuZ3VsYXIuaXNEZWZpbmVkKHMpJiYobi5jYW5jZWwocykscz12b2lkIDApfWZ1bmN0aW9uIHQoKXtmPS0xLGQ9LTF9ZnVuY3Rpb24gaShlKXt0aGlzLm1lZGlhPW5ldyBNZWRpYShlLGZ1bmN0aW9uKGUpe28oKSx0KCksYS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvKCksdCgpLGEucmVqZWN0KGUpfSxmdW5jdGlvbihlKXtsPWUsYS5ub3RpZnkoe3N0YXR1czpsfSl9KX12YXIgYSxjLHUscyxsPW51bGwsZj0tMSxkPS0xO3JldHVybiBpLnByb3RvdHlwZS5wbGF5PWZ1bmN0aW9uKG4pe3JldHVybiBhPWUuZGVmZXIoKSxcIm9iamVjdFwiIT10eXBlb2YgbiYmKG49e30pLHRoaXMubWVkaWEucGxheShuKSxyKHRoaXMubWVkaWEpLGEucHJvbWlzZX0saS5wcm90b3R5cGUucGF1c2U9ZnVuY3Rpb24oKXtvKCksdGhpcy5tZWRpYS5wYXVzZSgpfSxpLnByb3RvdHlwZS5zdG9wPWZ1bmN0aW9uKCl7dGhpcy5tZWRpYS5zdG9wKCl9LGkucHJvdG90eXBlLnJlbGVhc2U9ZnVuY3Rpb24oKXt0aGlzLm1lZGlhLnJlbGVhc2UoKSx0aGlzLm1lZGlhPXZvaWQgMH0saS5wcm90b3R5cGUuc2Vla1RvPWZ1bmN0aW9uKGUpe3RoaXMubWVkaWEuc2Vla1RvKGUpfSxpLnByb3RvdHlwZS5zZXRWb2x1bWU9ZnVuY3Rpb24oZSl7dGhpcy5tZWRpYS5zZXRWb2x1bWUoZSl9LGkucHJvdG90eXBlLnN0YXJ0UmVjb3JkPWZ1bmN0aW9uKCl7dGhpcy5tZWRpYS5zdGFydFJlY29yZCgpfSxpLnByb3RvdHlwZS5zdG9wUmVjb3JkPWZ1bmN0aW9uKCl7dGhpcy5tZWRpYS5zdG9wUmVjb3JkKCl9LGkucHJvdG90eXBlLmN1cnJlbnRUaW1lPWZ1bmN0aW9uKCl7cmV0dXJuIGM9ZS5kZWZlcigpLHRoaXMubWVkaWEuZ2V0Q3VycmVudFBvc2l0aW9uKGZ1bmN0aW9uKGUpe2MucmVzb2x2ZShlKX0pLGMucHJvbWlzZX0saS5wcm90b3R5cGUuZ2V0RHVyYXRpb249ZnVuY3Rpb24oKXtyZXR1cm4gdT1lLmRlZmVyKCksdGhpcy5tZWRpYS5nZXREdXJhdGlvbihmdW5jdGlvbihlKXt1LnJlc29sdmUoZSl9KSx1LnByb21pc2V9LGl9XSkuZmFjdG9yeShcIiRjb3Jkb3ZhTWVkaWFcIixbXCJOZXdNZWRpYVwiLGZ1bmN0aW9uKGUpe3JldHVybntuZXdNZWRpYTpmdW5jdGlvbihuKXtyZXR1cm4gbmV3IGUobil9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLm1vYmZveEFkc1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFNb2JGb3hBZHNcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3NldE9wdGlvbnM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLk1vYkZveC5zZXRPcHRpb25zKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxjcmVhdGVCYW5uZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLk1vYkZveC5jcmVhdGVCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHJlbW92ZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb2JGb3gucmVtb3ZlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0sc2hvd0Jhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uTW9iRm94LnNob3dCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dCYW5uZXJBdFhZOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLk1vYkZveC5zaG93QmFubmVyQXRYWShyLG8sZnVuY3Rpb24oKXt0LnJlc29sdmUoKX0sZnVuY3Rpb24oKXt0LnJlamVjdCgpfSksdC5wcm9taXNlfSxoaWRlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLk1vYkZveC5oaWRlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0scHJlcGFyZUludGVyc3RpdGlhbDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uTW9iRm94LnByZXBhcmVJbnRlcnN0aXRpYWwocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dJbnRlcnN0aXRpYWw6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uTW9iRm94LnNob3dJbnRlcnN0aXRpYWwoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2luc1wiLFtcIm5nQ29yZG92YS5wbHVnaW5zLjNkdG91Y2hcIixcIm5nQ29yZG92YS5wbHVnaW5zLmFjdGlvblNoZWV0XCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5hZE1vYlwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuYXBwQXZhaWxhYmlsaXR5XCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5hcHBSYXRlXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5hcHBWZXJzaW9uXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5iYWNrZ3JvdW5kR2VvbG9jYXRpb25cIixcIm5nQ29yZG92YS5wbHVnaW5zLmJhZGdlXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5iYXJjb2RlU2Nhbm5lclwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuYmF0dGVyeVN0YXR1c1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuYmVhY29uXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5ibGVcIixcIm5nQ29yZG92YS5wbHVnaW5zLmJsdWV0b290aFNlcmlhbFwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuYnJpZ2h0bmVzc1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuY2FsZW5kYXJcIixcIm5nQ29yZG92YS5wbHVnaW5zLmNhbWVyYVwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuY2FwdHVyZVwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuY2xpcGJvYXJkXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5jb250YWN0c1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZGF0ZVBpY2tlclwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZGV2aWNlXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5kZXZpY2VNb3Rpb25cIixcIm5nQ29yZG92YS5wbHVnaW5zLmRldmljZU9yaWVudGF0aW9uXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5kaWFsb2dzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5lbWFpbENvbXBvc2VyXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5mYWNlYm9va1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmFjZWJvb2tBZHNcIixcIm5nQ29yZG92YS5wbHVnaW5zLmZpbGVcIixcIm5nQ29yZG92YS5wbHVnaW5zLmZpbGVUcmFuc2ZlclwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmlsZU9wZW5lcjJcIixcIm5nQ29yZG92YS5wbHVnaW5zLmZsYXNobGlnaHRcIixcIm5nQ29yZG92YS5wbHVnaW5zLmZsdXJyeUFkc1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ2FcIixcIm5nQ29yZG92YS5wbHVnaW5zLmdlb2xvY2F0aW9uXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5nbG9iYWxpemF0aW9uXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5nb29nbGVBZHNcIixcIm5nQ29yZG92YS5wbHVnaW5zLmdvb2dsZUFuYWx5dGljc1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ29vZ2xlTWFwXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5nb29nbGVQbGF5R2FtZVwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ29vZ2xlUGx1c1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuaGVhbHRoS2l0XCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5odHRwZFwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuaUFkXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5pbWFnZVBpY2tlclwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuaW5BcHBCcm93c2VyXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5pbnN0YWdyYW1cIixcIm5nQ29yZG92YS5wbHVnaW5zLmtleWJvYXJkXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5rZXljaGFpblwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMubGF1bmNoTmF2aWdhdG9yXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5sb2NhbE5vdGlmaWNhdGlvblwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMubWVkaWFcIixcIm5nQ29yZG92YS5wbHVnaW5zLm1NZWRpYUFkc1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMubW9iZm94QWRzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5tb3B1YkFkc1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMubmF0aXZlQXVkaW9cIixcIm5nQ29yZG92YS5wbHVnaW5zLm5ldHdvcmtcIixcIm5nQ29yZG92YS5wbHVnaW5zLnBpbkRpYWxvZ1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMucHJlZmVyZW5jZXNcIixcIm5nQ29yZG92YS5wbHVnaW5zLnByaW50ZXJcIixcIm5nQ29yZG92YS5wbHVnaW5zLnByb2dyZXNzSW5kaWNhdG9yXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5wdXNoXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5wdXNoX3Y1XCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5zbXNcIixcIm5nQ29yZG92YS5wbHVnaW5zLnNvY2lhbFNoYXJpbmdcIixcIm5nQ29yZG92YS5wbHVnaW5zLnNwaW5uZXJEaWFsb2dcIixcIm5nQ29yZG92YS5wbHVnaW5zLnNwbGFzaHNjcmVlblwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuc3FsaXRlXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5zdGF0dXNiYXJcIixcIm5nQ29yZG92YS5wbHVnaW5zLnRvYXN0XCIsXCJuZ0NvcmRvdmEucGx1Z2lucy50b3VjaGlkXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy52aWJyYXRpb25cIixcIm5nQ29yZG92YS5wbHVnaW5zLnZpZGVvQ2FwdHVyZVBsdXNcIixcIm5nQ29yZG92YS5wbHVnaW5zLnppcFwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuaW5zb21uaWFcIl0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMubW9wdWJBZHNcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhTW9QdWJBZHNcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3NldE9wdGlvbnM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLk1vUHViLnNldE9wdGlvbnMocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LGNyZWF0ZUJhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uTW9QdWIuY3JlYXRlQmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxyZW1vdmVCYW5uZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uTW9QdWIucmVtb3ZlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0sc2hvd0Jhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uTW9QdWIuc2hvd0Jhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0Jhbm5lckF0WFk6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4uTW9QdWIuc2hvd0Jhbm5lckF0WFkocixvLGZ1bmN0aW9uKCl7dC5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7dC5yZWplY3QoKX0pLHQucHJvbWlzZX0saGlkZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb1B1Yi5oaWRlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0scHJlcGFyZUludGVyc3RpdGlhbDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uTW9QdWIucHJlcGFyZUludGVyc3RpdGlhbChyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0ludGVyc3RpdGlhbDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb1B1Yi5zaG93SW50ZXJzdGl0aWFsKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMubmF0aXZlQXVkaW9cIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhTmF0aXZlQXVkaW9cIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3ByZWxvYWRTaW1wbGU6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5OYXRpdmVBdWRpby5wcmVsb2FkU2ltcGxlKHIsbyxmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSksdC5wcm9taXNlfSxwcmVsb2FkQ29tcGxleDpmdW5jdGlvbihyLG8sdCxpLGEpe3ZhciBjPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLk5hdGl2ZUF1ZGlvLnByZWxvYWRDb21wbGV4KHIsbyx0LGksYSxmdW5jdGlvbihlKXtjLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2MucmVqZWN0KGUpfSksYy5wcm9taXNlfSxwbGF5OmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuTmF0aXZlQXVkaW8ucGxheShyLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7dC5yZWplY3QoZSl9LG8pLHQucHJvbWlzZX0sc3RvcDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5OYXRpdmVBdWRpby5zdG9wKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sbG9vcDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5OYXRpdmVBdWRpby5sb29wKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sdW5sb2FkOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLk5hdGl2ZUF1ZGlvLnVubG9hZChyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHNldFZvbHVtZUZvckNvbXBsZXhBc3NldDpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLk5hdGl2ZUF1ZGlvLnNldFZvbHVtZUZvckNvbXBsZXhBc3NldChyLG8sZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0pLHQucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMubmV0d29ya1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFOZXR3b3JrXCIsW1wiJHJvb3RTY29wZVwiLFwiJHRpbWVvdXRcIixmdW5jdGlvbihlLG4pe3ZhciByPWZ1bmN0aW9uKCl7dmFyIHI9bmF2aWdhdG9yLmNvbm5lY3Rpb24udHlwZTtuKGZ1bmN0aW9uKCl7ZS4kYnJvYWRjYXN0KFwiJGNvcmRvdmFOZXR3b3JrOm9mZmxpbmVcIixyKX0pfSxvPWZ1bmN0aW9uKCl7dmFyIHI9bmF2aWdhdG9yLmNvbm5lY3Rpb24udHlwZTtuKGZ1bmN0aW9uKCl7ZS4kYnJvYWRjYXN0KFwiJGNvcmRvdmFOZXR3b3JrOm9ubGluZVwiLHIpfSl9O3JldHVybiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZGV2aWNlcmVhZHlcIixmdW5jdGlvbigpe25hdmlnYXRvci5jb25uZWN0aW9uJiYoZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm9mZmxpbmVcIixyLCExKSxkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwib25saW5lXCIsbywhMSkpfSkse2dldE5ldHdvcms6ZnVuY3Rpb24oKXtyZXR1cm4gbmF2aWdhdG9yLmNvbm5lY3Rpb24udHlwZX0saXNPbmxpbmU6ZnVuY3Rpb24oKXt2YXIgZT1uYXZpZ2F0b3IuY29ubmVjdGlvbi50eXBlO3JldHVybiBlIT09Q29ubmVjdGlvbi5VTktOT1dOJiZlIT09Q29ubmVjdGlvbi5OT05FfSxpc09mZmxpbmU6ZnVuY3Rpb24oKXt2YXIgZT1uYXZpZ2F0b3IuY29ubmVjdGlvbi50eXBlO3JldHVybiBlPT09Q29ubmVjdGlvbi5VTktOT1dOfHxlPT09Q29ubmVjdGlvbi5OT05FfSxjbGVhck9mZmxpbmVXYXRjaDpmdW5jdGlvbigpe2RvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJvZmZsaW5lXCIsciksZS4kJGxpc3RlbmVyc1tcIiRjb3Jkb3ZhTmV0d29yazpvZmZsaW5lXCJdPVtdfSxjbGVhck9ubGluZVdhdGNoOmZ1bmN0aW9uKCl7ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm9ubGluZVwiLG8pLGUuJCRsaXN0ZW5lcnNbXCIkY29yZG92YU5ldHdvcms6b25saW5lXCJdPVtdfX19XSkucnVuKFtcIiRpbmplY3RvclwiLGZ1bmN0aW9uKGUpe2UuZ2V0KFwiJGNvcmRvdmFOZXR3b3JrXCIpfV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMucGluRGlhbG9nXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVBpbkRpYWxvZ1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57cHJvbXB0OmZ1bmN0aW9uKHIsbyx0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5waW5EaWFsb2cucHJvbXB0KHIsZnVuY3Rpb24oZSl7aS5yZXNvbHZlKGUpfSxvLHQpLGkucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMucHJlZmVyZW5jZXNcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhUHJlZmVyZW5jZXNcIixbXCIkd2luZG93XCIsXCIkcVwiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3BsdWdpbk5vdEVuYWJsZWRNZXNzYWdlOlwiUGx1Z2luIG5vdCBlbmFibGVkXCIsZGVjb3JhdGVQcm9taXNlOmZ1bmN0aW9uKGUpe2Uuc3VjY2Vzcz1mdW5jdGlvbihuKXtyZXR1cm4gZS50aGVuKG4pLGV9LGUuZXJyb3I9ZnVuY3Rpb24obil7cmV0dXJuIGUudGhlbihudWxsLG4pLGV9fSxzdG9yZTpmdW5jdGlvbihyLG8sdCl7ZnVuY3Rpb24gaShlKXtjLnJlc29sdmUoZSl9ZnVuY3Rpb24gYShlKXtjLnJlamVjdChuZXcgRXJyb3IoZSkpfXZhciBjPW4uZGVmZXIoKSx1PWMucHJvbWlzZTtpZihlLnBsdWdpbnMpe3ZhciBzO3M9Mz09PWFyZ3VtZW50cy5sZW5ndGg/ZS5wbHVnaW5zLmFwcFByZWZlcmVuY2VzLnN0b3JlKHQscixvKTplLnBsdWdpbnMuYXBwUHJlZmVyZW5jZXMuc3RvcmUocixvKSxzLnRoZW4oaSxhKX1lbHNlIGMucmVqZWN0KG5ldyBFcnJvcih0aGlzLnBsdWdpbk5vdEVuYWJsZWRNZXNzYWdlKSk7cmV0dXJuIHRoaXMuZGVjb3JhdGVQcm9taXNlKHUpLHV9LGZldGNoOmZ1bmN0aW9uKHIsbyl7ZnVuY3Rpb24gdChlKXthLnJlc29sdmUoZSl9ZnVuY3Rpb24gaShlKXthLnJlamVjdChuZXcgRXJyb3IoZSkpfXZhciBhPW4uZGVmZXIoKSxjPWEucHJvbWlzZTtpZihlLnBsdWdpbnMpe3ZhciB1O3U9Mj09PWFyZ3VtZW50cy5sZW5ndGg/ZS5wbHVnaW5zLmFwcFByZWZlcmVuY2VzLmZldGNoKG8scik6ZS5wbHVnaW5zLmFwcFByZWZlcmVuY2VzLmZldGNoKHIpLHUudGhlbih0LGkpfWVsc2UgYS5yZWplY3QobmV3IEVycm9yKHRoaXMucGx1Z2luTm90RW5hYmxlZE1lc3NhZ2UpKTtyZXR1cm4gdGhpcy5kZWNvcmF0ZVByb21pc2UoYyksY30scmVtb3ZlOmZ1bmN0aW9uKHIsbyl7ZnVuY3Rpb24gdChlKXthLnJlc29sdmUoZSl9ZnVuY3Rpb24gaShlKXthLnJlamVjdChuZXcgRXJyb3IoZSkpfXZhciBhPW4uZGVmZXIoKSxjPWEucHJvbWlzZTtpZihlLnBsdWdpbnMpe3ZhciB1O3U9Mj09PWFyZ3VtZW50cy5sZW5ndGg/ZS5wbHVnaW5zLmFwcFByZWZlcmVuY2VzLnJlbW92ZShvLHIpOmUucGx1Z2lucy5hcHBQcmVmZXJlbmNlcy5yZW1vdmUociksdS50aGVuKHQsaSl9ZWxzZSBhLnJlamVjdChuZXcgRXJyb3IodGhpcy5wbHVnaW5Ob3RFbmFibGVkTWVzc2FnZSkpO3JldHVybiB0aGlzLmRlY29yYXRlUHJvbWlzZShjKSxjfSxzaG93OmZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlKXt0LnJlc29sdmUoZSl9ZnVuY3Rpb24gbyhlKXt0LnJlamVjdChuZXcgRXJyb3IoZSkpfXZhciB0PW4uZGVmZXIoKSxpPXQucHJvbWlzZTtyZXR1cm4gZS5wbHVnaW5zP2UucGx1Z2lucy5hcHBQcmVmZXJlbmNlcy5zaG93KCkudGhlbihyLG8pOnQucmVqZWN0KG5ldyBFcnJvcih0aGlzLnBsdWdpbk5vdEVuYWJsZWRNZXNzYWdlKSksdGhpcy5kZWNvcmF0ZVByb21pc2UoaSksaX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMucHJpbnRlclwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFQcmludGVyXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntpc0F2YWlsYWJsZTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW4ucHJpbnRlci5pc0F2YWlsYWJsZShmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9KSxyLnByb21pc2V9LHByaW50OmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbi5wcmludGVyLnByaW50KHIsbyxmdW5jdGlvbigpe3QucmVzb2x2ZSgpfSksdC5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5wcm9ncmVzc0luZGljYXRvclwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFQcm9ncmVzc1wiLFtmdW5jdGlvbigpe3JldHVybntzaG93OmZ1bmN0aW9uKGUpe3ZhciBuPWV8fFwiUGxlYXNlIHdhaXQuLi5cIjtyZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3Iuc2hvdyhuKX0sc2hvd1NpbXBsZTpmdW5jdGlvbihlKXt2YXIgbj1lfHwhMTtyZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3Iuc2hvd1NpbXBsZShuKX0sc2hvd1NpbXBsZVdpdGhMYWJlbDpmdW5jdGlvbihlLG4pe3ZhciByPWV8fCExLG89bnx8XCJMb2FkaW5nLi4uXCI7cmV0dXJuIFByb2dyZXNzSW5kaWNhdG9yLnNob3dTaW1wbGVXaXRoTGFiZWwocixvKX0sc2hvd1NpbXBsZVdpdGhMYWJlbERldGFpbDpmdW5jdGlvbihlLG4scil7dmFyIG89ZXx8ITEsdD1ufHxcIkxvYWRpbmcuLi5cIixpPXJ8fFwiUGxlYXNlIHdhaXRcIjtyZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3Iuc2hvd1NpbXBsZVdpdGhMYWJlbERldGFpbChvLHQsaSl9LHNob3dEZXRlcm1pbmF0ZTpmdW5jdGlvbihlLG4pe3ZhciByPWV8fCExLG89bnx8NWU0O3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93RGV0ZXJtaW5hdGUocixvKX0sc2hvd0RldGVybWluYXRlV2l0aExhYmVsOmZ1bmN0aW9uKGUsbixyKXt2YXIgbz1lfHwhMSx0PW58fDVlNCxpPXJ8fFwiTG9hZGluZy4uLlwiO3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93RGV0ZXJtaW5hdGVXaXRoTGFiZWwobyx0LGkpfSxzaG93QW5udWxhcjpmdW5jdGlvbihlLG4pe3ZhciByPWV8fCExLG89bnx8NWU0O3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93QW5udWxhcihyLG8pfSxzaG93QW5udWxhcldpdGhMYWJlbDpmdW5jdGlvbihlLG4scil7dmFyIG89ZXx8ITEsdD1ufHw1ZTQsaT1yfHxcIkxvYWRpbmcuLi5cIjtyZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3Iuc2hvd0FubnVsYXJXaXRoTGFiZWwobyx0LGkpfSxzaG93QmFyOmZ1bmN0aW9uKGUsbil7dmFyIHI9ZXx8ITEsbz1ufHw1ZTQ7cmV0dXJuIFByb2dyZXNzSW5kaWNhdG9yLnNob3dCYXIocixvKX0sc2hvd0JhcldpdGhMYWJlbDpmdW5jdGlvbihlLG4scil7dmFyIG89ZXx8ITEsdD1ufHw1ZTQsaT1yfHxcIkxvYWRpbmcuLi5cIjtyZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3Iuc2hvd0JhcldpdGhMYWJlbChvLHQsaSl9LHNob3dTdWNjZXNzOmZ1bmN0aW9uKGUsbil7dmFyIHI9ZXx8ITEsbz1ufHxcIlN1Y2Nlc3NcIjtyZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3Iuc2hvd1N1Y2Nlc3MocixvKX0sc2hvd1RleHQ6ZnVuY3Rpb24oZSxuLHIpe3ZhciBvPWV8fCExLHQ9bnx8XCJXYXJuaW5nXCIsaT1yfHxcImNlbnRlclwiO3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93VGV4dChvLHQsaSl9LGhpZGU6ZnVuY3Rpb24oKXtyZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3IuaGlkZSgpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5wdXNoXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVB1c2hcIixbXCIkcVwiLFwiJHdpbmRvd1wiLFwiJHJvb3RTY29wZVwiLFwiJHRpbWVvdXRcIixmdW5jdGlvbihlLG4scixvKXtyZXR1cm57b25Ob3RpZmljYXRpb246ZnVuY3Rpb24oZSl7byhmdW5jdGlvbigpe3IuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhUHVzaDpub3RpZmljYXRpb25SZWNlaXZlZFwiLGUpfSl9LHJlZ2lzdGVyOmZ1bmN0aW9uKHIpe3ZhciBvLHQ9ZS5kZWZlcigpO3JldHVybiB2b2lkIDAhPT1yJiZ2b2lkIDA9PT1yLmVjYiYmKG89bnVsbD09PWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbbmctYXBwXVwiKT9cImRvY3VtZW50LmJvZHlcIjpcImRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tuZy1hcHBdJylcIixyLmVjYj1cImFuZ3VsYXIuZWxlbWVudChcIitvK1wiKS5pbmplY3RvcigpLmdldCgnJGNvcmRvdmFQdXNoJykub25Ob3RpZmljYXRpb25cIiksbi5wbHVnaW5zLnB1c2hOb3RpZmljYXRpb24ucmVnaXN0ZXIoZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0sciksdC5wcm9taXNlfSx1bnJlZ2lzdGVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnB1c2hOb3RpZmljYXRpb24udW5yZWdpc3RlcihmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSxyKSxvLnByb21pc2V9LHNldEJhZGdlTnVtYmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnB1c2hOb3RpZmljYXRpb24uc2V0QXBwbGljYXRpb25JY29uQmFkZ2VOdW1iZXIoZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0sciksby5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5wdXNoX3Y1XCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVB1c2hWNVwiLFtcIiRxXCIsXCIkcm9vdFNjb3BlXCIsXCIkdGltZW91dFwiLGZ1bmN0aW9uKGUsbixyKXt2YXIgbztyZXR1cm57aW5pdGlhbGl6ZTpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG89UHVzaE5vdGlmaWNhdGlvbi5pbml0KG4pLHIucmVzb2x2ZShvKSxyLnByb21pc2V9LG9uTm90aWZpY2F0aW9uOmZ1bmN0aW9uKCl7cihmdW5jdGlvbigpe28ub24oXCJub3RpZmljYXRpb25cIixmdW5jdGlvbihlKXtuLiRlbWl0KFwiJGNvcmRvdmFQdXNoVjU6bm90aWZpY2F0aW9uUmVjZWl2ZWRcIixlKX0pfSl9LG9uRXJyb3I6ZnVuY3Rpb24oKXtyKGZ1bmN0aW9uKCl7by5vbihcImVycm9yXCIsZnVuY3Rpb24oZSl7bi4kZW1pdChcIiRjb3Jkb3ZhUHVzaFY1OmVycm9yT2NjdXJyZWRcIixlKX0pfSl9LHJlZ2lzdGVyOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiB2b2lkIDA9PT1vP24ucmVqZWN0KG5ldyBFcnJvcihcImluaXQgbXVzdCBiZSBjYWxsZWQgYmVmb3JlIGFueSBvdGhlciBvcGVyYXRpb25cIikpOm8ub24oXCJyZWdpc3RyYXRpb25cIixmdW5jdGlvbihlKXtuLnJlc29sdmUoZS5yZWdpc3RyYXRpb25JZCl9KSxuLnByb21pc2V9LHVucmVnaXN0ZXI6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIHZvaWQgMD09PW8/bi5yZWplY3QobmV3IEVycm9yKFwiaW5pdCBtdXN0IGJlIGNhbGxlZCBiZWZvcmUgYW55IG90aGVyIG9wZXJhdGlvblwiKSk6by51bnJlZ2lzdGVyKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9LGdldEJhZGdlTnVtYmVyOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiB2b2lkIDA9PT1vP24ucmVqZWN0KG5ldyBFcnJvcihcImluaXQgbXVzdCBiZSBjYWxsZWQgYmVmb3JlIGFueSBvdGhlciBvcGVyYXRpb25cIikpOm8uZ2V0QXBwbGljYXRpb25JY29uQmFkZ2VOdW1iZXIoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sc2V0QmFkZ2VOdW1iZXI6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiB2b2lkIDA9PT1vP3IucmVqZWN0KG5ldyBFcnJvcihcImluaXQgbXVzdCBiZSBjYWxsZWQgYmVmb3JlIGFueSBvdGhlciBvcGVyYXRpb25cIikpOm8uc2V0QXBwbGljYXRpb25JY29uQmFkZ2VOdW1iZXIoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbiksci5wcm9taXNlfSxmaW5pc2g6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIHZvaWQgMD09PW8/bi5yZWplY3QobmV3IEVycm9yKFwiaW5pdCBtdXN0IGJlIGNhbGxlZCBiZWZvcmUgYW55IG90aGVyIG9wZXJhdGlvblwiKSk6by5maW5pc2goZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMucmVjZW50c0NvbnRyb2xcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhUmVjZW50c1wiLGZ1bmN0aW9uKCl7cmV0dXJue3NldENvbG9yOmZ1bmN0aW9uKGUpe3JldHVybiBSZWNlbnRzQ29udHJvbC5zZXRDb2xvcihlKX0sc2V0RGVzY3JpcHRpb246ZnVuY3Rpb24oZSl7cmV0dXJuIFJlY2VudHNDb250cm9sLnNldERlc2NyaXB0aW9uKGUpfSxzZXRPcHRpb25zOmZ1bmN0aW9uKGUsbil7cmV0dXJuIFJlY2VudHNDb250cm9sLnNldE9wdGlvbnMoZSxuKX19fSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5zY3JlZW5zaG90XCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVNjcmVlbnNob3RcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntjYXB0dXJlVG9GaWxlOmZ1bmN0aW9uKG4pe3ZhciByPW58fHt9LG89ci5leHRlbnNpb258fFwianBnXCIsdD1yLnF1YWxpdHl8fFwiMTAwXCIsaT1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5zY3JlZW5zaG90PyhuYXZpZ2F0b3Iuc2NyZWVuc2hvdC5zYXZlKGZ1bmN0aW9uKGUsbil7ZT9pLnJlamVjdChlKTppLnJlc29sdmUobi5maWxlUGF0aCl9LG8sdCxyLmZpbGVuYW1lKSxpLnByb21pc2UpOihpLnJlc29sdmUobnVsbCksaS5wcm9taXNlKX0sY2FwdHVyZVRvVXJpOmZ1bmN0aW9uKG4pe3ZhciByPW58fHt9LG89ci5leHRlbnNpb258fFwianBnXCIsdD1yLnF1YWxpdHl8fFwiMTAwXCIsaT1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5zY3JlZW5zaG90PyhuYXZpZ2F0b3Iuc2NyZWVuc2hvdC5VUkkoZnVuY3Rpb24oZSxuKXtlP2kucmVqZWN0KGUpOmkucmVzb2x2ZShuLlVSSSl9LG8sdCxyLmZpbGVuYW1lKSxpLnByb21pc2UpOihpLnJlc29sdmUobnVsbCksaS5wcm9taXNlKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuc2VyaWFsXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVNlcmlhbFwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7dmFyIG49e307cmV0dXJuIG4ucmVxdWVzdFBlcm1pc3Npb249ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBzZXJpYWwucmVxdWVzdFBlcm1pc3Npb24obixmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sbi5vcGVuPWZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gc2VyaWFsLm9wZW4obixmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sbi53cml0ZT1mdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIHNlcmlhbC53cml0ZShuLGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxuLndyaXRlSGV4PWZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gc2VyaWFsLndyaXRlSGV4KG4sZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LG4ucmVhZD1mdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gc2VyaWFsLnJlYWQoZnVuY3Rpb24oZSl7dmFyIHI9bmV3IFVpbnQ4QXJyYXkoZSk7bi5yZXNvbHZlKHIpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sbi5yZWdpc3RlclJlYWRDYWxsYmFjaz1mdW5jdGlvbihlLG4pe3NlcmlhbC5yZWdpc3RlclJlYWRDYWxsYmFjayhmdW5jdGlvbihuKXt2YXIgcj1uZXcgVWludDhBcnJheShuKTtlKHIpfSxuKX0sbi5jbG9zZT1mdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gc2VyaWFsLmNsb3NlKGZ1bmN0aW9uKCl7bi5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxufV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuc21zXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVNtc1wiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue3NlbmQ6ZnVuY3Rpb24obixyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gc21zLnNlbmQobixyLG8sZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0pLHQucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuc29jaWFsU2hhcmluZ1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFTb2NpYWxTaGFyaW5nXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntzaGFyZTpmdW5jdGlvbihyLG8sdCxpKXt2YXIgYT1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCx0PXR8fG51bGwsaT1pfHxudWxsLG4ucGx1Z2lucy5zb2NpYWxzaGFyaW5nLnNoYXJlKHIsbyx0LGksZnVuY3Rpb24oKXthLnJlc29sdmUoITApfSxmdW5jdGlvbigpe2EucmVqZWN0KCExKX0pLGEucHJvbWlzZX0sc2hhcmVXaXRoT3B0aW9uczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5zb2NpYWxzaGFyaW5nLnNoYXJlV2l0aE9wdGlvbnMocixmdW5jdGlvbigpe28ucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoITEpfSksby5wcm9taXNlfSxzaGFyZVZpYVR3aXR0ZXI6ZnVuY3Rpb24ocixvLHQpe3ZhciBpPWUuZGVmZXIoKTtyZXR1cm4gbz1vfHxudWxsLHQ9dHx8bnVsbCxuLnBsdWdpbnMuc29jaWFsc2hhcmluZy5zaGFyZVZpYVR3aXR0ZXIocixvLHQsZnVuY3Rpb24oKXtpLnJlc29sdmUoITApfSxmdW5jdGlvbigpe2kucmVqZWN0KCExKX0pLGkucHJvbWlzZX0sc2hhcmVWaWFXaGF0c0FwcDpmdW5jdGlvbihyLG8sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsdD10fHxudWxsLG4ucGx1Z2lucy5zb2NpYWxzaGFyaW5nLnNoYXJlVmlhV2hhdHNBcHAocixvLHQsZnVuY3Rpb24oKXtpLnJlc29sdmUoITApfSxmdW5jdGlvbigpe2kucmVqZWN0KCExKX0pLGkucHJvbWlzZX0sc2hhcmVWaWFGYWNlYm9vazpmdW5jdGlvbihyLG8sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbz1vfHxudWxsLHQ9dHx8bnVsbCxuLnBsdWdpbnMuc29jaWFsc2hhcmluZy5zaGFyZVZpYUZhY2Vib29rKHIsbyx0LGZ1bmN0aW9uKCl7aS5yZXNvbHZlKCEwKX0sZnVuY3Rpb24oKXtpLnJlamVjdCghMSl9KSxpLnByb21pc2V9LHNoYXJlVmlhRmFjZWJvb2tXaXRoUGFzdGVNZXNzYWdlSGludDpmdW5jdGlvbihyLG8sdCxpKXt2YXIgYT1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCx0PXR8fG51bGwsbi5wbHVnaW5zLnNvY2lhbHNoYXJpbmcuc2hhcmVWaWFGYWNlYm9va1dpdGhQYXN0ZU1lc3NhZ2VIaW50KHIsbyx0LGksZnVuY3Rpb24oKXthLnJlc29sdmUoITApfSxmdW5jdGlvbigpe2EucmVqZWN0KCExKX0pLGEucHJvbWlzZX0sc2hhcmVWaWFTTVM6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5zb2NpYWxzaGFyaW5nLnNoYXJlVmlhU01TKHIsbyxmdW5jdGlvbigpe3QucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKCl7dC5yZWplY3QoITEpfSksdC5wcm9taXNlfSxzaGFyZVZpYUVtYWlsOmZ1bmN0aW9uKHIsbyx0LGksYSxjKXt2YXIgdT1lLmRlZmVyKCk7cmV0dXJuIHQ9dHx8bnVsbCxpPWl8fG51bGwsYT1hfHxudWxsLGM9Y3x8bnVsbCxuLnBsdWdpbnMuc29jaWFsc2hhcmluZy5zaGFyZVZpYUVtYWlsKHIsbyx0LGksYSxjLGZ1bmN0aW9uKCl7dS5yZXNvbHZlKCEwKX0sZnVuY3Rpb24oKXt1LnJlamVjdCghMSl9KSx1LnByb21pc2V9LHNoYXJlVmlhOmZ1bmN0aW9uKHIsbyx0LGksYSl7dmFyIGM9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsdD10fHxudWxsLGk9aXx8bnVsbCxhPWF8fG51bGwsbi5wbHVnaW5zLnNvY2lhbHNoYXJpbmcuc2hhcmVWaWEocixvLHQsaSxhLGZ1bmN0aW9uKCl7Yy5yZXNvbHZlKCEwKX0sZnVuY3Rpb24oKXtjLnJlamVjdCghMSl9KSxjLnByb21pc2V9LGNhblNoYXJlVmlhRW1haWw6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5zb2NpYWxzaGFyaW5nLmNhblNoYXJlVmlhRW1haWwoZnVuY3Rpb24oKXtyLnJlc29sdmUoITApfSxmdW5jdGlvbigpe3IucmVqZWN0KCExKX0pLHIucHJvbWlzZX0sY2FuU2hhcmVWaWE6ZnVuY3Rpb24ocixvLHQsaSxhKXt2YXIgYz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5zb2NpYWxzaGFyaW5nLmNhblNoYXJlVmlhKHIsbyx0LGksYSxmdW5jdGlvbihlKXtjLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2MucmVqZWN0KGUpfSksYy5wcm9taXNlfSxhdmFpbGFibGU6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIHdpbmRvdy5wbHVnaW5zLnNvY2lhbHNoYXJpbmcuYXZhaWxhYmxlKGZ1bmN0aW9uKGUpe2U/bi5yZXNvbHZlKCk6bi5yZWplY3QoKX0pLG4ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuc3Bpbm5lckRpYWxvZ1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFTcGlubmVyRGlhbG9nXCIsW1wiJHdpbmRvd1wiLGZ1bmN0aW9uKGUpe3JldHVybntzaG93OmZ1bmN0aW9uKG4scixvLHQpe3JldHVybiBvPW98fCExLGUucGx1Z2lucy5zcGlubmVyRGlhbG9nLnNob3cobixyLG8sdCl9LGhpZGU6ZnVuY3Rpb24oKXtyZXR1cm4gZS5wbHVnaW5zLnNwaW5uZXJEaWFsb2cuaGlkZSgpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5zcGxhc2hzY3JlZW5cIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhU3BsYXNoc2NyZWVuXCIsW2Z1bmN0aW9uKCl7cmV0dXJue2hpZGU6ZnVuY3Rpb24oKXtyZXR1cm4gbmF2aWdhdG9yLnNwbGFzaHNjcmVlbi5oaWRlKCl9LHNob3c6ZnVuY3Rpb24oKXtyZXR1cm4gbmF2aWdhdG9yLnNwbGFzaHNjcmVlbi5zaG93KCl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnNxbGl0ZVwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFTUUxpdGVcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue29wZW5EQjpmdW5jdGlvbihlLHIpe3JldHVybiBhbmd1bGFyLmlzT2JqZWN0KGUpJiYhYW5ndWxhci5pc1N0cmluZyhlKT8oXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHImJihlLmJnVHlwZT1yKSxuLnNxbGl0ZVBsdWdpbi5vcGVuRGF0YWJhc2UoZSkpOm4uc3FsaXRlUGx1Z2luLm9wZW5EYXRhYmFzZSh7bmFtZTplLGJnVHlwZTpyfSl9LGV4ZWN1dGU6ZnVuY3Rpb24obixyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi50cmFuc2FjdGlvbihmdW5jdGlvbihlKXtlLmV4ZWN1dGVTcWwocixvLGZ1bmN0aW9uKGUsbil7dC5yZXNvbHZlKG4pfSxmdW5jdGlvbihlLG4pe3QucmVqZWN0KG4pfSl9KSx0LnByb21pc2V9LGluc2VydENvbGxlY3Rpb246ZnVuY3Rpb24obixyLG8pe3ZhciB0PWUuZGVmZXIoKSxpPW8uc2xpY2UoMCk7cmV0dXJuIG4udHJhbnNhY3Rpb24oZnVuY3Rpb24oZSl7IWZ1bmN0aW9uIG4oKXt2YXIgbz1pLnNwbGljZSgwLDEpWzBdO3RyeXtlLmV4ZWN1dGVTcWwocixvLGZ1bmN0aW9uKGUscil7MD09PWkubGVuZ3RoP3QucmVzb2x2ZShyKTpuKCl9LGZ1bmN0aW9uKGUsbil7dC5yZWplY3Qobil9KX1jYXRjaChhKXt0LnJlamVjdChhKX19KCl9KSx0LnByb21pc2V9LG5lc3RlZEV4ZWN1dGU6ZnVuY3Rpb24obixyLG8sdCxpKXt2YXIgYT1lLmRlZmVyKCk7cmV0dXJuIG4udHJhbnNhY3Rpb24oZnVuY3Rpb24oZSl7ZS5leGVjdXRlU3FsKHIsdCxmdW5jdGlvbihlLG4pe2EucmVzb2x2ZShuKSxlLmV4ZWN1dGVTcWwobyxpLGZ1bmN0aW9uKGUsbil7YS5yZXNvbHZlKG4pfSl9KX0sZnVuY3Rpb24oZSxuKXthLnJlamVjdChuKX0pLGEucHJvbWlzZX0sZGVsZXRlREI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnNxbGl0ZVBsdWdpbi5kZWxldGVEYXRhYmFzZShyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnN0YXR1c2JhclwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFTdGF0dXNiYXJcIixbZnVuY3Rpb24oKXtyZXR1cm57b3ZlcmxheXNXZWJWaWV3OmZ1bmN0aW9uKGUpe3JldHVybiBTdGF0dXNCYXIub3ZlcmxheXNXZWJWaWV3KCEhZSl9LFNUWUxFUzp7REVGQVVMVDowLExJR0hUX0NPTlRFTlQ6MSxCTEFDS19UUkFOU0xVQ0VOVDoyLEJMQUNLX09QQVFVRTozfSxzdHlsZTpmdW5jdGlvbihlKXtzd2l0Y2goZSl7Y2FzZSAwOnJldHVybiBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7Y2FzZSAxOnJldHVybiBTdGF0dXNCYXIuc3R5bGVMaWdodENvbnRlbnQoKTtjYXNlIDI6cmV0dXJuIFN0YXR1c0Jhci5zdHlsZUJsYWNrVHJhbnNsdWNlbnQoKTtjYXNlIDM6cmV0dXJuIFN0YXR1c0Jhci5zdHlsZUJsYWNrT3BhcXVlKCk7ZGVmYXVsdDpyZXR1cm4gU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpfX0sc3R5bGVDb2xvcjpmdW5jdGlvbihlKXtyZXR1cm4gU3RhdHVzQmFyLmJhY2tncm91bmRDb2xvckJ5TmFtZShlKX0sc3R5bGVIZXg6ZnVuY3Rpb24oZSl7cmV0dXJuIFN0YXR1c0Jhci5iYWNrZ3JvdW5kQ29sb3JCeUhleFN0cmluZyhlKX0saGlkZTpmdW5jdGlvbigpe3JldHVybiBTdGF0dXNCYXIuaGlkZSgpfSxzaG93OmZ1bmN0aW9uKCl7cmV0dXJuIFN0YXR1c0Jhci5zaG93KCl9LGlzVmlzaWJsZTpmdW5jdGlvbigpe3JldHVybiBTdGF0dXNCYXIuaXNWaXNpYmxlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy50b2FzdFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFUb2FzdFwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57c2hvd1Nob3J0VG9wOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnRvYXN0LnNob3dTaG9ydFRvcChyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHNob3dTaG9ydENlbnRlcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy50b2FzdC5zaG93U2hvcnRDZW50ZXIocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxzaG93U2hvcnRCb3R0b206ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMudG9hc3Quc2hvd1Nob3J0Qm90dG9tKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sc2hvd0xvbmdUb3A6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMudG9hc3Quc2hvd0xvbmdUb3AocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxzaG93TG9uZ0NlbnRlcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy50b2FzdC5zaG93TG9uZ0NlbnRlcihyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHNob3dMb25nQm90dG9tOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnRvYXN0LnNob3dMb25nQm90dG9tKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sc2hvd1dpdGhPcHRpb25zOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnRvYXN0LnNob3dXaXRoT3B0aW9ucyhyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHNob3c6ZnVuY3Rpb24ocixvLHQpe3ZhciBpPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnRvYXN0LnNob3cocixvLHQsZnVuY3Rpb24oZSl7aS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtpLnJlamVjdChlKX0pLGkucHJvbWlzZX0saGlkZTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTt0cnl7bi5wbHVnaW5zLnRvYXN0LmhpZGUoKSxyLnJlc29sdmUoKX1jYXRjaChvKXtyLnJlamVjdChvJiZvLm1lc3NhZ2UpfXJldHVybiByLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnRvdWNoaWRcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhVG91Y2hJRFwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2NoZWNrU3VwcG9ydDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gd2luZG93LmNvcmRvdmE/dG91Y2hpZC5jaGVja1N1cHBvcnQoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pOm4ucmVqZWN0KFwiTm90IHN1cHBvcnRlZCB3aXRob3V0IGNvcmRvdmEuanNcIiksbi5wcm9taXNlfSxhdXRoZW50aWNhdGU6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiB3aW5kb3cuY29yZG92YT90b3VjaGlkLmF1dGhlbnRpY2F0ZShmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKTpyLnJlamVjdChcIk5vdCBzdXBwb3J0ZWQgd2l0aG91dCBjb3Jkb3ZhLmpzXCIpLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMudHRzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVRUU1wiLGZ1bmN0aW9uKCl7cmV0dXJue3NwZWFrOmZ1bmN0aW9uKGUsbixyKXtyZXR1cm4gVFRTLnNwZWFrKGUsbixyKX19fSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy51cHNQdXNoXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVVwc1B1c2hcIixbXCIkcVwiLFwiJHdpbmRvd1wiLFwiJHJvb3RTY29wZVwiLFwiJHRpbWVvdXRcIixmdW5jdGlvbihlLG4scixvKXtyZXR1cm57cmVnaXN0ZXI6ZnVuY3Rpb24odCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiBuLnB1c2gucmVnaXN0ZXIoZnVuY3Rpb24oZSl7byhmdW5jdGlvbigpe3IuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhVXBzUHVzaDpub3RpZmljYXRpb25SZWNlaXZlZFwiLGUpfSl9LGZ1bmN0aW9uKCl7aS5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe2kucmVqZWN0KGUpfSx0KSxpLnByb21pc2V9LHVucmVnaXN0ZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnB1c2gudW5yZWdpc3RlcihmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0sciksby5wcm9taXNlfSxzZXRCYWRnZU51bWJlcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucHVzaC5zZXRBcHBsaWNhdGlvbkljb25CYWRnZU51bWJlcihmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxyKSxvLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnZpYnJhdGlvblwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFWaWJyYXRpb25cIixbZnVuY3Rpb24oKXtyZXR1cm57dmlicmF0ZTpmdW5jdGlvbihlKXtyZXR1cm4gbmF2aWdhdG9yLm5vdGlmaWNhdGlvbi52aWJyYXRlKGUpfSx2aWJyYXRlV2l0aFBhdHRlcm46ZnVuY3Rpb24oZSxuKXtyZXR1cm4gbmF2aWdhdG9yLm5vdGlmaWNhdGlvbi52aWJyYXRlV2l0aFBhdHRlcm4oZSxuKX0sY2FuY2VsVmlicmF0aW9uOmZ1bmN0aW9uKCl7cmV0dXJuIG5hdmlnYXRvci5ub3RpZmljYXRpb24uY2FuY2VsVmlicmF0aW9uKCl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnZpZGVvQ2FwdHVyZVBsdXNcIixbXSkucHJvdmlkZXIoXCIkY29yZG92YVZpZGVvQ2FwdHVyZVBsdXNcIixbZnVuY3Rpb24oKXt2YXIgZT17fTt0aGlzLnNldExpbWl0PWZ1bmN0aW9uKG4pe2UubGltaXQ9bn0sdGhpcy5zZXRNYXhEdXJhdGlvbj1mdW5jdGlvbihuKXtlLmR1cmF0aW9uPW59LHRoaXMuc2V0SGlnaFF1YWxpdHk9ZnVuY3Rpb24obil7ZS5oaWdocXVhbGl0eT1ufSx0aGlzLnVzZUZyb250Q2FtZXJhPWZ1bmN0aW9uKG4pe2UuZnJvbnRjYW1lcmE9bn0sdGhpcy5zZXRQb3J0cmFpdE92ZXJsYXk9ZnVuY3Rpb24obil7ZS5wb3J0cmFpdE92ZXJsYXk9bn0sdGhpcy5zZXRMYW5kc2NhcGVPdmVybGF5PWZ1bmN0aW9uKG4pe2UubGFuZHNjYXBlT3ZlcmxheT1ufSx0aGlzLnNldE92ZXJsYXlUZXh0PWZ1bmN0aW9uKG4pe2Uub3ZlcmxheVRleHQ9bn0sdGhpcy4kZ2V0PVtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24obixyKXtyZXR1cm57Y2FwdHVyZVZpZGVvOmZ1bmN0aW9uKG8pe3ZhciB0PW4uZGVmZXIoKTtyZXR1cm4gci5wbHVnaW5zLnZpZGVvY2FwdHVyZXBsdXM/KHIucGx1Z2lucy52aWRlb2NhcHR1cmVwbHVzLmNhcHR1cmVWaWRlbyh0LnJlc29sdmUsdC5yZWplY3QsYW5ndWxhci5leHRlbmQoe30sZSxvKSksdC5wcm9taXNlKToodC5yZXNvbHZlKG51bGwpLHQucHJvbWlzZSl9fX1dfV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuemlwXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVppcFwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57dW56aXA6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4uemlwLnVuemlwKHIsbyxmdW5jdGlvbihlKXswPT09ZT90LnJlc29sdmUoKTp0LnJlamVjdCgpfSxmdW5jdGlvbihlKXt0Lm5vdGlmeShlKX0pLHQucHJvbWlzZX19fV0pfSgpOyIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJhZGRDaGlsZEN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcclxuICAvL2JhY2tidXR0b25cclxuICAkc2NvcGUuZ29iYWNrID0gZnVuY3Rpb24oKXtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxyXG4gIH1cclxuXHJcbiRzY29wZS5zdWJtaXRDaGlsZCA9IGZ1bmN0aW9uKGNoaWxkKXtcclxuICBjb25zb2xlLmxvZyhjaGlsZCk7XHJcbiAgJHNjb3BlLmNoaWxkID0gXCJcIjtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoaWxkLWlucHV0XCIpLnZhbHVlID0gXCJcIjtcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbn0pIC8vZW5kIG9mIGNvbnRyb2xsZXJcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImFzc2lnbkNob3JlQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xyXG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIGFzc2lnbiBjaG9yZSBjb250cm9sbGVyXCJcclxuXHJcbn0pXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoJ2NhbWVyYUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRjb3Jkb3ZhQ2FtZXJhKSB7XHJcblxyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkZXZpY2VyZWFkeVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICRjb3Jkb3ZhUGx1Z2luLnNvbWVGdW5jdGlvbigpLnRoZW4oc3VjY2VzcywgZXJyb3IpO1xyXG4gICAgfSwgZmFsc2UpO1xyXG5cclxuICAgIC8vIE9SIHdpdGggSU9OSUNcclxuXHJcbiAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgICAgJGNvcmRvdmFQbHVnaW4uc29tZUZ1bmN0aW9uKCkudGhlbihzdWNjZXNzLCBlcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgJHNjb3BlLnRha2VQaWN0dXJlID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgb3B0aW9ucyA9IHtcclxuICAgICAgcXVhbGl0eTogNTAsXHJcbiAgICAgIGRlc3RpbmF0aW9uVHlwZTogQ2FtZXJhLkRlc3RpbmF0aW9uVHlwZS5EQVRBX1VSTCxcclxuICAgICAgc291cmNlVHlwZTogQ2FtZXJhLlBpY3R1cmVTb3VyY2VUeXBlLkNBTUVSQSxcclxuICAgICAgYWxsb3dFZGl0OiBmYWxzZSxcclxuICAgICAgZW5jb2RpbmdUeXBlOiBDYW1lcmEuRW5jb2RpbmdUeXBlLkpQRUcsXHJcbiAgICAgIHRhcmdldFdpZHRoOiAzMDAsXHJcbiAgICAgIHRhcmdldEhlaWdodDogMzAwLFxyXG4gICAgICBwb3BvdmVyT3B0aW9uczogQ2FtZXJhUG9wb3Zlck9wdGlvbnMsXHJcbiAgICAgIHNhdmVUb1Bob3RvQWxidW06IGZhbHNlLFxyXG5cdCAgICBjb3JyZWN0T3JpZW50YXRpb246dHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICAkY29yZG92YUNhbWVyYS5nZXRQaWN0dXJlKG9wdGlvbnMpLnRoZW4oZnVuY3Rpb24oaW1hZ2VEYXRhKSB7XHJcbiAgICAgICRzY29wZS5pbWdVUkkgPSBcImRhdGE6aW1hZ2UvanBlZztiYXNlNjQsXCIgKyBpbWFnZURhdGE7XHJcbiAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgLy8gZXJyb3JcclxuICAgIH0pO1xyXG5cclxuICB9O1xyXG4gIH0sIGZhbHNlKTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImNoaWxkQmFua0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcclxuICAgJHNjb3BlLnRoZW1lID0gJ3dhdGVyJy8vbG9hZCB1c2VyIHRoZW1lXHJcblxyXG4gICAkc2NvcGUuc2V0VGhlbWUgPSBmdW5jdGlvbigpe1xyXG4gICAgIGlmKCRzY29wZS50aGVtZSA9PT0gJ2Jhc2ViYWxsJyl7XHJcbiAgICAgICAkc2NvcGUudGhlbWVJbWFnZSA9ICcuL2ltZy9pbWctYmFzZWJhbGwtdHJhbnMucG5nJ1xyXG4gICAgIH1cclxuICAgICBpZigkc2NvcGUudGhlbWUgPT09ICdjaGFybGllQnJvd24nKXtcclxuICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL3Nub29weS5wbmcnXHJcbiAgICAgfVxyXG4gICAgIGlmKCRzY29wZS50aGVtZSA9PT0gJ3ByaW5jZXNzJyl7XHJcbiAgICAgICAkc2NvcGUudGhlbWVJbWFnZSA9ICcuL2ltZy9Dcm93bl9QcmluY2Vzcy5wbmcnXHJcbiAgICAgfVxyXG4gICAgIGlmKCRzY29wZS50aGVtZSA9PT0gJ3N0YXJXYXJzJyl7XHJcbiAgICAgICAkc2NvcGUudGhlbWVJbWFnZSA9ICcuL2ltZy9kZWF0aC1zdGFyLTJuZC1pY29uLnBuZydcclxuICAgICB9XHJcbiAgICAgaWYoJHNjb3BlLnRoZW1lID09PSAnd2F0ZXInKXtcclxuICAgICAgICRzY29wZS50aGVtZUltYWdlID0gJy4vaW1nL1RyYW5zcGFyZW50X1dhdGVyX0Ryb3BfUE5HX1BpY3R1cmUucG5nJ1xyXG4gICAgIH1cclxuXHJcbiAgIH1cclxuICAgJHNjb3BlLnNldFRoZW1lKCk7XHJcbn0pXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJjaGlsZEhvbWVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwsICR3aW5kb3cpe1xyXG4gIC8vICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gIGNoaWxkIEhvbWUgY29udHJvbGxlclwiXHJcbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCd0aGVtZU1vZGFsLmh0bWwnLCB7XHJcbiAgICAgaWQ6ICcxJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXHJcbiAgICAgc2NvcGU6ICRzY29wZSxcclxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXHJcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXHJcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcclxuICAgICAkc2NvcGUub01vZGFsMSA9IG1vZGFsO1xyXG4gICB9KTtcclxuXHJcbiAgIC8vIE1vZGFsIDJcclxuICAvLyAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCd0YWtlUGljdHVyZU1vZGFsLmh0bWwnLCB7XHJcbiAgLy8gICAgaWQ6ICcyJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXHJcbiAgLy8gICAgc2NvcGU6ICRzY29wZSxcclxuICAvLyAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXHJcbiAgLy8gICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXHJcbiAgLy8gIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcclxuICAvLyAgICAkc2NvcGUub01vZGFsMiA9IG1vZGFsO1xyXG4gIC8vICB9KTtcclxuICAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKGluZGV4KSB7XHJcbiAgICAgaWYgKGluZGV4ID09IDEpICRzY29wZS5vTW9kYWwxLnNob3coKTtcclxuICAgICBlbHNlICRzY29wZS5vTW9kYWwyLnNob3coKTtcclxuICAgfTtcclxuXHJcbiAgICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgICBpZiAoaW5kZXggPT0gMSkgJHNjb3BlLm9Nb2RhbDEuaGlkZSgpO1xyXG4gICAgIGVsc2UgJHNjb3BlLm9Nb2RhbDIuaGlkZSgpO1xyXG4gICB9O1xyXG5cclxuICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcclxuICAgICAkc2NvcGUub01vZGFsMS5yZW1vdmUoKTtcclxuICAgICAkc2NvcGUub01vZGFsMi5yZW1vdmUoKTtcclxuXHJcbiAgIH0pO1xyXG5cclxuICAkc2NvcGUudGhlbWUgPSBcIndhdGVyXCIvL3VzZXIudGhlbWVcclxuXHJcblxyXG5cclxuXHJcbiAgJHNjb3BlLnNldFRoZW1lID0gZnVuY3Rpb24oY2hvaWNlKXtcclxuICAgIC8vc2VydmljZS5zZXRUaGVtZShjaG9pY2UpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgLy9pZihyZXNwb25zZS5zdGF0dXMgPT09IDIwMCl7XHJcbiAgICAkc2NvcGUudGhlbWUgPSBjaG9pY2VcclxuICAgIC8vICB9XHJcbi8vICB9KVxyXG4gIH1cclxuXHJcblxyXG5cclxuXHJcbn0pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiY2hpbGRMb2dpbkN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkYXV0aCwgJHN0YXRlLCBsb2dpblNlcnZpY2Upe1xyXG4gIC8vICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIGNoaWxkIExvZ2luIGNvbnRyb2xsZXJcIlxyXG5cclxuICAgJHNjb3BlLmxvZ2luQ2hpbGQgPSBmdW5jdGlvbih1c2VyKXtcclxuICAgICBjb25zb2xlLmxvZyh1c2VyKVxyXG4gICAgIGxvZ2luU2VydmljZS51c2VyTG9naW4odXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcclxuICAgICAgICRhdXRoLnNldFRva2VuKHJlc3BvbnNlKVxyXG4gICAgICAgICAkc3RhdGUuZ28oJ2NoaWxkSG9tZScpXHJcblxyXG4gICAgIH0pXHJcbiAgIH1cclxufSlcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImVkaXRDaGlsZEN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcclxuICAkc2NvcGUuZ29iYWNrID0gZnVuY3Rpb24oKXtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxyXG4gIH1cclxuXHJcbn0pXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJoaXN0b3J5Q3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xyXG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIEhpc3RvcnkgY29udHJvbGxlclwiXHJcblxyXG59KVxyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiaG9tZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCx1c2VyU2VydmljZSl7XHJcbnZhciB1c2VyVG9rZW4gPSB1c2VyU2VydmljZS5nZXRVc2VySW5mby5zdWI7XHJcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gSG9tZSBjb250cm9sbGVyXCJcclxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdiYW5uZXJNb2RhbC5odG1sJywge1xyXG4gICAgIHNjb3BlOiAkc2NvcGUsXHJcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXHJcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcclxuICAgICAkc2NvcGUubW9kYWwgPSBtb2RhbDtcclxuICAgfSk7XHJcbiAgICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcclxuICAgICAkc2NvcGUubW9kYWwuc2hvdygpO1xyXG4gICB9O1xyXG4gICAkc2NvcGUuc3VibWl0QmFubmVyID0gZnVuY3Rpb24oYmFubmVyKXtcclxuICAgICB2YXIgYmFubmVySW5mbyA9IHtcclxuICAgICAgIHVzZXJfaG91c2Vob2xkOnVzZXJUb2tlbi51c2VyX2hvdXNlaG9sZCxcclxuICAgICAgIHVzZXJfYmFubmVyX2ltYWdlOmJhbm5lclxyXG4gICAgIH1cclxuICAgICAgdXNlclNlcnZpY2UucG9zdGJhbm5lcihiYW5uZXJJbmZvKVxyXG4gICAgICAudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XHJcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsLWJveFwiKS52YWx1ZSA9ICcnO1xyXG4gICAgIH0pO1xyXG4gICB9O1xyXG4gICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWwtYm94XCIpLnZhbHVlID0gJyc7XHJcbiAgICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcclxuICAgfTtcclxuICAgLy8gQ2xlYW51cCB0aGUgbW9kYWwgd2hlbiB3ZSdyZSBkb25lIHdpdGggaXQhXHJcbiAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgJHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xyXG4gICB9KTtcclxuICAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gaGlkZSBtb2RhbFxyXG4gICAkc2NvcGUuJG9uKCdtb2RhbC5oaWRkZW4nLCBmdW5jdGlvbigpIHtcclxuICAgICAvLyBFeGVjdXRlIGFjdGlvblxyXG5cclxuICAgfSk7XHJcbiAgIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIHJlbW92ZSBtb2RhbFxyXG4gICAkc2NvcGUuJG9uKCdtb2RhbC5yZW1vdmVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgLy8gRXhlY3V0ZSBhY3Rpb25cclxuICAgfSk7XHJcblxyXG4kc2NvcGUuaG91c2Vob2xkID0gIHVzZXJUb2tlbi51c2VyX2hvdXNlaG9sZDtcclxudXNlclNlcnZpY2UuZ2V0YmFubmVyKHVzZXJUb2tlbi51c2VyX2hvdXNlaG9sZCkudGhlbihmdW5jdGlvbihyZXMpe1xyXG5jb25zb2xlLmxvZyhyZXMuZGF0YVswXS51c2VyX2Jhbm5lcl9pbWFnZSk7XHJcbiAgJHNjb3BlLmJhbm5lciA9IHJlcy5kYXRhWzBdLnVzZXJfYmFubmVyX2ltYWdlO1xyXG59KTtcclxuXHJcbmNvbnNvbGUubG9nKHVzZXJUb2tlbi56aXApO1xyXG5cclxudXNlclNlcnZpY2UuZ2V0V2VhdGhlcih1c2VyVG9rZW4uemlwKVxyXG4udGhlbihmdW5jdGlvbihyZXMpe1xyXG4gIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAkc2NvcGUud2VhdGhlciA9IHJlcy5kYXRhO1xyXG59KVxyXG5cclxuXHJcbn0pLy9lbmQgb2YgY29udHJvbGxlclxyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwibG9naW5DdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGF1dGgsICRzdGF0ZSwgbG9naW5TZXJ2aWNlKXtcclxuXHJcbiRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uKHVzZXIpe1xyXG4gIC8vIGNvbnNvbGUubG9nKHVzZXIpXHJcbiAgbG9naW5TZXJ2aWNlLnVzZXJMb2dpbih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxyXG4gICAgJGF1dGguc2V0VG9rZW4ocmVzcG9uc2UpXHJcbiAgICAgICRzdGF0ZS5nbygnaG9tZScpXHJcblxyXG4gIH0pXHJcbn1cclxuJHNjb3BlLm1ha2VVc2VyID0gZnVuY3Rpb24obmV3VXNlcil7XHJcbiAgbG9naW5TZXJ2aWNlLm1ha2VVc2VyKG5ld1VzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgJGF1dGguc2V0VG9rZW4ocmVzcG9uc2UpXHJcbiAgICAgICRzdGF0ZS5nbygnaG9tZScpXHJcbiAgfSlcclxufVxyXG4gICRzY29wZS5hdXRoZW50aWNhdGUgPSBmdW5jdGlvbihwcm92aWRlcikge1xyXG4gICRhdXRoLmF1dGhlbnRpY2F0ZShwcm92aWRlcil9O1xyXG4gIC8vICRzY29wZS50ZXN0ID0gXCJIZWxsbyBmcm9tIGxvZ2luIGNvbnRyb2xsZXJcIlxyXG5cclxuXHJcbiAgJHNjb3BlLnJldmVhbGVyID0gZnVuY3Rpb24oKXtcclxuICAkc2NvcGUuaGlkZSA9ICEkc2NvcGUuaGlkZTtcclxuIH1cclxuXHJcbn0pXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJtYWtlQ2hvcmVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XHJcbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5nbygtMSlcclxuICB9XHJcblxyXG59KVxyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwic2V0UmV3YXJkc0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCl7XHJcbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdyZXdhcmRNb2RhbC5odG1sJywge1xyXG4gICAgc2NvcGU6ICRzY29wZSxcclxuICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xyXG4gIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcclxuICAgICRzY29wZS5tb2RhbCA9IG1vZGFsO1xyXG4gIH0pO1xyXG4gICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcclxuICAgICRzY29wZS5tb2RhbC5zaG93KCk7XHJcbiAgfTtcclxuICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcclxuICB9O1xyXG4gIC8vIENsZWFudXAgdGhlIG1vZGFsIHdoZW4gd2UncmUgZG9uZSB3aXRoIGl0IVxyXG4gICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XHJcbiAgICAkc2NvcGUubW9kYWwucmVtb3ZlKCk7XHJcbiAgfSk7XHJcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gaGlkZSBtb2RhbFxyXG4gICRzY29wZS4kb24oJ21vZGFsLmhpZGRlbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gRXhlY3V0ZSBhY3Rpb25cclxuICB9KTtcclxuICAvLyBFeGVjdXRlIGFjdGlvbiBvbiByZW1vdmUgbW9kYWxcclxuICAkc2NvcGUuJG9uKCdtb2RhbC5yZW1vdmVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxyXG4gIH0pO1xyXG4gIC8vYmFja2J1dHRvblxyXG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xyXG4gICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpXHJcbiAgfVxyXG5cclxufSlcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcInNldHRpbmdzQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsKXtcclxuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ2NoYW5nZVBhc3N3b3JkLmh0bWwnLCB7XHJcbiAgICAgaWQ6ICcxJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXHJcbiAgICAgc2NvcGU6ICRzY29wZSxcclxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXHJcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXHJcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcclxuICAgICAkc2NvcGUub01vZGFsMSA9IG1vZGFsO1xyXG4gICB9KTtcclxuXHJcbiAgIC8vIE1vZGFsIDJcclxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdjaGFuZ2VIb3VzZWhvbGQuaHRtbCcsIHtcclxuICAgICBpZDogJzInLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcclxuICAgICBzY29wZTogJHNjb3BlLFxyXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcclxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcclxuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xyXG4gICAgICRzY29wZS5vTW9kYWwyID0gbW9kYWw7XHJcbiAgIH0pO1xyXG5cclxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdjaGFuZ2VaaXAuaHRtbCcsIHtcclxuICAgICBpZDogJzMnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcclxuICAgICBzY29wZTogJHNjb3BlLFxyXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcclxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcclxuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xyXG4gICAgICRzY29wZS5vTW9kYWwzID0gbW9kYWw7XHJcbiAgIH0pO1xyXG5cclxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdhZGRQYXJlbnQuaHRtbCcsIHtcclxuICAgICBpZDogJzQnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcclxuICAgICBzY29wZTogJHNjb3BlLFxyXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcclxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcclxuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xyXG4gICAgICRzY29wZS5vTW9kYWw0ID0gbW9kYWw7XHJcbiAgIH0pO1xyXG5cclxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdyZW1vdmVDaGlsZC5odG1sJywge1xyXG4gICAgIGlkOiAnNScsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxyXG4gICAgIHNjb3BlOiAkc2NvcGUsXHJcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxyXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xyXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XHJcbiAgICAgJHNjb3BlLm9Nb2RhbDUgPSBtb2RhbDtcclxuICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbihpbmRleCkge1xyXG4gICAgIGlmIChpbmRleCA9PSAxKSAkc2NvcGUub01vZGFsMS5zaG93KCk7XHJcbiAgICAgZWxzZSBpZihpbmRleCA9PSAyKSAkc2NvcGUub01vZGFsMi5zaG93KCk7XHJcbiAgICAgZWxzZSBpZihpbmRleCA9PSAzKSAkc2NvcGUub01vZGFsMy5zaG93KCk7XHJcbiAgICAgZWxzZSBpZihpbmRleCA9PSA0KSAkc2NvcGUub01vZGFsNC5zaG93KCk7XHJcbiAgICAgZWxzZSAkc2NvcGUub01vZGFsNS5zaG93KCk7XHJcbiAgIH07XHJcblxyXG4gICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKGluZGV4KSB7XHJcbiAgICAgaWYgKGluZGV4ID09IDEpICRzY29wZS5vTW9kYWwxLmhpZGUoKTtcclxuICAgICBlbHNlIGlmKGluZGV4ID09IDIpICRzY29wZS5vTW9kYWwyLmhpZGUoKTtcclxuICAgICBlbHNlIGlmKGluZGV4ID09IDMpICRzY29wZS5vTW9kYWwzLmhpZGUoKTtcclxuICAgICBlbHNlIGlmKGluZGV4ID09IDQpICRzY29wZS5vTW9kYWw0LmhpZGUoKTtcclxuICAgICBlbHNlICRzY29wZS5vTW9kYWw1LmhpZGUoKTtcclxuICAgfTtcclxuXHJcbiAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgJHNjb3BlLm9Nb2RhbDEucmVtb3ZlKCk7XHJcbiAgICAgJHNjb3BlLm9Nb2RhbDIucmVtb3ZlKCk7XHJcbiAgICAgJHNjb3BlLm9Nb2RhbDMucmVtb3ZlKCk7XHJcbiAgICAgJHNjb3BlLm9Nb2RhbDQucmVtb3ZlKCk7XHJcbiAgICAgJHNjb3BlLm9Nb2RhbDUucmVtb3ZlKCk7XHJcbiAgIH0pO1xyXG5cclxufSlcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcInRyYWNrZXJDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwpe1xyXG4gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgncGljQ29uZk1vZGFsLmh0bWwnLCB7XHJcbiAgICBzY29wZTogJHNjb3BlLFxyXG4gICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXHJcbiAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xyXG4gICAgJHNjb3BlLm1vZGFsID0gbW9kYWw7XHJcbiAgfSk7XHJcbiAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJHNjb3BlLm1vZGFsLnNob3coKTtcclxuICB9O1xyXG4gICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAkc2NvcGUubW9kYWwuaGlkZSgpO1xyXG4gIH07XHJcbiAgLy8gQ2xlYW51cCB0aGUgbW9kYWwgd2hlbiB3ZSdyZSBkb25lIHdpdGggaXQhXHJcbiAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcclxuICAgICRzY29wZS5tb2RhbC5yZW1vdmUoKTtcclxuICB9KTtcclxuICAvLyBFeGVjdXRlIGFjdGlvbiBvbiBoaWRlIG1vZGFsXHJcbiAgJHNjb3BlLiRvbignbW9kYWwuaGlkZGVuJywgZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxyXG4gIH0pO1xyXG4gIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIHJlbW92ZSBtb2RhbFxyXG4gICRzY29wZS4kb24oJ21vZGFsLnJlbW92ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIC8vIEV4ZWN1dGUgYWN0aW9uXHJcbiAgfSk7XHJcblxyXG59KVxyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwidXNlckluZm9DdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XHJcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gaW5mbyBjb250cm9sbGVyXCJcclxuXHJcbn0pXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLnNlcnZpY2UoJ2xvZ2luU2VydmljZScsIGZ1bmN0aW9uKCRodHRwKXtcclxuXHJcblxyXG4gIHRoaXMudXNlckxvZ2luID0gZnVuY3Rpb24odXNlcikge1xyXG4gICAgY29uc29sZS5sb2codXNlciwgXCJzZXJ2aWNlXCIpXHJcbiAgICByZXR1cm4gJGh0dHAoe1xyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICB1cmw6ICcvYXV0aC9sb2dpbicsXHJcbiAgICAgIGRhdGE6IHVzZXJcclxuICAgIH0pXHJcbiAgfVxyXG4gIHRoaXMubWFrZVVzZXIgPSBmdW5jdGlvbihuZXdVc2VyKSB7XHJcbiAgICByZXR1cm4gJGh0dHAoe1xyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICB1cmw6ICcvYXV0aC9zaWdudXAnLFxyXG4gICAgICBkYXRhOiBuZXdVc2VyXHJcbiAgICB9KVxyXG4gIH1cclxufSkgLy8gZW5kIG9mIHNlcnZpY2VcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuc2VydmljZSgndXNlclNlcnZpY2UnLCBmdW5jdGlvbigkaHR0cCwkcSwkYXV0aCl7XHJcblxyXG52YXIgYmFubmVyO1xyXG50aGlzLmdldFVzZXJJbmZvID0gJGF1dGguZ2V0UGF5bG9hZCgpO1xyXG5cclxuXHJcbnRoaXMucG9zdGJhbm5lciA9IGZ1bmN0aW9uKGJhbm5lcil7XHJcbiAgY29uc29sZS5sb2coYmFubmVyKTtcclxuICBjb25zb2xlLmxvZyhiYW5uZXIudXNlcl9iYW5uZXJfaW1hZ2UpO1xyXG4gIHJldHVybiAkaHR0cCh7XHJcbiAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICB1cmw6XCIvYmFubmVyL1wiICsgYmFubmVyLnVzZXJfaG91c2Vob2xkLFxyXG4gICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe3VzZXJfYmFubmVyX2ltYWdlOmJhbm5lci51c2VyX2Jhbm5lcl9pbWFnZX0pXHJcbiAgfSlcclxufVxyXG5cclxudGhpcy5nZXRiYW5uZXIgPSBmdW5jdGlvbih1c2VySWQpe1xyXG4gIGNvbnNvbGUubG9nKHVzZXJJZCk7XHJcbiAgcmV0dXJuICRodHRwKHtcclxuICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgIHVybDpcIi9iYW5uZXIvXCIgKyB1c2VySWRcclxuICB9KVxyXG59XHJcblxyXG5cclxudGhpcy5nZXRXZWF0aGVyID0gZnVuY3Rpb24oKXtcclxucmV0dXJuICRodHRwKHtcclxuICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgIHVybDonaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPXppcD04NDAxMCZ1bml0cz1pbXBlcmlhbCZhcHBpZD1jMTBlZjk5YzVhZmRlZTNmZGZiYTc4ZThjOTgxYTliNidcclxuICB9KVxyXG5cclxufTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxufSk7Ly9lbmQgb2Ygc2VydmljZVxyXG4iXX0=
