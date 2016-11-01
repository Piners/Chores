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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5nLWNvcmRvdmEubWluLmpzIiwiY29udHJvbGxlcnMvYWRkQ2hpbGRDdHJsLmpzIiwiY29udHJvbGxlcnMvYXNzaWduQ2hvcmVDdHJsLmpzIiwiY29udHJvbGxlcnMvY2FtZXJhQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NoaWxkQmFua0N0cmwuanMiLCJjb250cm9sbGVycy9jaGlsZEhvbWVDdHJsLmpzIiwiY29udHJvbGxlcnMvY2hpbGRMb2dpbkN0cmwuanMiLCJjb250cm9sbGVycy9lZGl0Q2hpbGRDdHJsLmpzIiwiY29udHJvbGxlcnMvaGlzdG9yeUN0cmwuanMiLCJjb250cm9sbGVycy9ob21lQ3RybC5qcyIsImNvbnRyb2xsZXJzL2xvZ2luQ3RybC5qcyIsImNvbnRyb2xsZXJzL21ha2VDaG9yZUN0cmwuanMiLCJjb250cm9sbGVycy9zZXRSZXdhcmRzQ3RybC5qcyIsImNvbnRyb2xsZXJzL3NldHRpbmdzQ3RybC5qcyIsImNvbnRyb2xsZXJzL3RyYWNrZXJDdHJsLmpzIiwiY29udHJvbGxlcnMvdXNlckluZm9DdHJsLmpzIiwic2VydmljZS9sb2dpblNlcnZpY2UuanMiLCJzZXJ2aWNlL3VzZXJTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJmYWN0b3J5IiwiZSIsIm4iLCJyIiwibyIsInR5cGUiLCJpc0F2YWlsYWJsZSIsImRlZmVyIiwid2luZG93IiwiY29yZG92YSIsIlRocmVlRGVlVG91Y2giLCJyZXNvbHZlIiwicmVqZWN0IiwicHJvbWlzZSIsImFkZFF1aWNrQWN0aW9uIiwidCIsImkiLCJhIiwiYyIsInUiLCJzIiwibCIsImYiLCJ0aXRsZSIsInN1YnRpdGxlIiwiaWNvblR5cGUiLCJpY29uVGVtcGxhdGUiLCJ0aGVuIiwicHVzaCIsImNvbmZpZ3VyZVF1aWNrQWN0aW9ucyIsIm9uSG9tZUljb25QcmVzc2VkIiwiYWRkUXVpY2tBY3Rpb25IYW5kbGVyIiwiZW5hYmxlTGlua1ByZXZpZXciLCJhZGRGb3JjZVRvdWNoSGFuZGxlciIsIndhdGNoRm9yY2VUb3VjaGVzIiwic2hvdyIsInBsdWdpbnMiLCJhY3Rpb25zaGVldCIsImhpZGUiLCJjcmVhdGVCYW5uZXJWaWV3IiwiQWRNb2IiLCJjcmVhdGVJbnRlcnN0aXRpYWxWaWV3IiwicmVxdWVzdEFkIiwic2hvd0FkIiwicmVxdWVzdEludGVyc3RpdGlhbEFkIiwiY2hlY2siLCJhcHBBdmFpbGFiaWxpdHkiLCJwcm92aWRlciIsInNldFByZWZlcmVuY2VzIiwiaXNPYmplY3QiLCJBcHBSYXRlIiwicHJlZmVyZW5jZXMiLCJ1c2VMYW5ndWFnZSIsImxhbmd1YWdlIiwiZGlzcGxheUFwcE5hbWUiLCJhcHBOYW1lIiwicHJvbXB0QWdhaW5Gb3JFYWNoTmV3VmVyc2lvbiIsInByb21wdEZvck5ld1ZlcnNpb24iLCJvcGVuU3RvcmVJbkFwcCIsInVzZXNVbnRpbFByb21wdCIsInVzZUN1c3RvbVJhdGVEaWFsb2ciLCJzdG9yZUFwcFVSTCIsImlvcyIsImlvc1VSTCIsImFuZHJvaWQiLCJhbmRyb2lkVVJMIiwiYmxhY2tiZXJyeSIsImJsYWNrYmVycnlVUkwiLCJ3aW5kb3dzOCIsIndpbmRvd3NVUkwiLCJzZXRDdXN0b21Mb2NhbGUiLCJtZXNzYWdlIiwiY2FuY2VsQnV0dG9uTGFiZWwiLCJsYXRlckJ1dHRvbkxhYmVsIiwicmF0ZUJ1dHRvbkxhYmVsIiwiZXh0ZW5kIiwiY3VzdG9tTG9jYWxlIiwiJGdldCIsInByb21wdEZvclJhdGluZyIsIm5hdmlnYXRlVG9BcHBTdG9yZSIsIm9uQnV0dG9uQ2xpY2tlZCIsImNhbGxiYWNrcyIsImJpbmQiLCJvblJhdGVEaWFsb2dTaG93IiwiZ2V0QXBwTmFtZSIsImdldEFwcFZlcnNpb24iLCJnZXRQYWNrYWdlTmFtZSIsImdldFZlcnNpb25OdW1iZXIiLCJnZXRWZXJzaW9uQ29kZSIsImluaXQiLCJuYXZpZ2F0b3IiLCJnZW9sb2NhdGlvbiIsImdldEN1cnJlbnRQb3NpdGlvbiIsImNvbmZpZ3VyZSIsImJhY2tncm91bmRHZW9Mb2NhdGlvbiIsIm5vdGlmeSIsImZpbmlzaCIsInN0YXJ0Iiwic3RvcCIsImhhc1Blcm1pc3Npb24iLCJub3RpZmljYXRpb24iLCJiYWRnZSIsInByb21wdEZvclBlcm1pc3Npb24iLCJzZXQiLCJnZXQiLCJjbGVhciIsImluY3JlYXNlIiwiZGVjcmVhc2UiLCJzY2FuIiwiYmFyY29kZVNjYW5uZXIiLCJlbmNvZGUiLCIkYnJvYWRjYXN0IiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiYmF0dGVyeSIsInJ1biIsImxvY2F0aW9uTWFuYWdlciIsIkRlbGVnYXRlIiwiZGlkRGV0ZXJtaW5lU3RhdGVGb3JSZWdpb24iLCJkaWRTdGFydE1vbml0b3JpbmdGb3JSZWdpb24iLCJkaWRFeGl0UmVnaW9uIiwiZGlkRW50ZXJSZWdpb24iLCJkaWRSYW5nZUJlYWNvbnNJblJlZ2lvbiIsInBlcmlwaGVyYWxNYW5hZ2VyRGlkU3RhcnRBZHZlcnRpc2luZyIsInBlcmlwaGVyYWxNYW5hZ2VyRGlkVXBkYXRlU3RhdGUiLCJkaWRDaGFuZ2VBdXRob3JpemF0aW9uU3RhdHVzIiwic2V0RGVsZWdhdGUiLCJzZXRDYWxsYmFja0RpZERldGVybWluZVN0YXRlRm9yUmVnaW9uIiwic2V0Q2FsbGJhY2tEaWRTdGFydE1vbml0b3JpbmdGb3JSZWdpb24iLCJzZXRDYWxsYmFja0RpZEV4aXRSZWdpb24iLCJzZXRDYWxsYmFja0RpZEVudGVyUmVnaW9uIiwic2V0Q2FsbGJhY2tEaWRSYW5nZUJlYWNvbnNJblJlZ2lvbiIsInNldENhbGxiYWNrUGVyaXBoZXJhbE1hbmFnZXJEaWRTdGFydEFkdmVydGlzaW5nIiwic2V0Q2FsbGJhY2tQZXJpcGhlcmFsTWFuYWdlckRpZFVwZGF0ZVN0YXRlIiwic2V0Q2FsbGJhY2tEaWRDaGFuZ2VBdXRob3JpemF0aW9uU3RhdHVzIiwiY3JlYXRlQmVhY29uUmVnaW9uIiwiQmVhY29uUmVnaW9uIiwiaXNCbHVldG9vdGhFbmFibGVkIiwid2hlbiIsImVuYWJsZUJsdWV0b290aCIsImRpc2FibGVCbHVldG9vdGgiLCJzdGFydE1vbml0b3JpbmdGb3JSZWdpb24iLCJzdG9wTW9uaXRvcmluZ0ZvclJlZ2lvbiIsInJlcXVlc3RTdGF0ZUZvclJlZ2lvbiIsInN0YXJ0UmFuZ2luZ0JlYWNvbnNJblJlZ2lvbiIsInN0b3BSYW5naW5nQmVhY29uc0luUmVnaW9uIiwiZ2V0QXV0aG9yaXphdGlvblN0YXR1cyIsInJlcXVlc3RXaGVuSW5Vc2VBdXRob3JpemF0aW9uIiwicmVxdWVzdEFsd2F5c0F1dGhvcml6YXRpb24iLCJnZXRNb25pdG9yZWRSZWdpb25zIiwiZ2V0UmFuZ2VkUmVnaW9ucyIsImlzUmFuZ2luZ0F2YWlsYWJsZSIsImlzTW9uaXRvcmluZ0F2YWlsYWJsZUZvckNsYXNzIiwic3RhcnRBZHZlcnRpc2luZyIsInN0b3BBZHZlcnRpc2luZyIsImlzQWR2ZXJ0aXNpbmdBdmFpbGFibGUiLCJpc0FkdmVydGlzaW5nIiwiZGlzYWJsZURlYnVnTG9ncyIsImVuYWJsZURlYnVnTm90aWZpY2F0aW9ucyIsImRpc2FibGVEZWJ1Z05vdGlmaWNhdGlvbnMiLCJlbmFibGVEZWJ1Z0xvZ3MiLCJhcHBlbmRUb0RldmljZUxvZyIsImJsZSIsInN0YXJ0U2NhbiIsInN0b3BTY2FuIiwiY29ubmVjdCIsImRpc2Nvbm5lY3QiLCJyZWFkIiwid3JpdGUiLCJ3cml0ZVdpdGhvdXRSZXNwb25zZSIsIndyaXRlQ29tbWFuZCIsIndhcm5pbmciLCJzdGFydE5vdGlmaWNhdGlvbiIsInN0b3BOb3RpZmljYXRpb24iLCJpc0Nvbm5lY3RlZCIsImVuYWJsZSIsImlzRW5hYmxlZCIsImJsdWV0b290aFNlcmlhbCIsImNvbm5lY3RJbnNlY3VyZSIsImxpc3QiLCJkaXNjb3ZlclVucGFpcmVkIiwic2V0RGV2aWNlRGlzY292ZXJlZExpc3RlbmVyIiwiY2xlYXJEZXZpY2VEaXNjb3ZlcmVkTGlzdGVuZXIiLCJzaG93Qmx1ZXRvb3RoU2V0dGluZ3MiLCJhdmFpbGFibGUiLCJyZWFkVW50aWwiLCJzdWJzY3JpYmUiLCJzdWJzY3JpYmVSYXdEYXRhIiwidW5zdWJzY3JpYmUiLCJ1bnN1YnNjcmliZVJhd0RhdGEiLCJyZWFkUlNTSSIsImJyaWdodG5lc3MiLCJnZXRCcmlnaHRuZXNzIiwic2V0QnJpZ2h0bmVzcyIsInNldEtlZXBTY3JlZW5PbiIsImNyZWF0ZUNhbGVuZGFyIiwiY2FsZW5kYXIiLCJnZXRDcmVhdGVDYWxlbmRhck9wdGlvbnMiLCJjYWxlbmRhck5hbWUiLCJkZWxldGVDYWxlbmRhciIsImNyZWF0ZUV2ZW50IiwibG9jYXRpb24iLCJub3RlcyIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJEYXRlIiwiY3JlYXRlRXZlbnRXaXRoT3B0aW9ucyIsImdldENhbGVuZGFyT3B0aW9ucyIsIk9iamVjdCIsImtleXMiLCJpbmRleE9mIiwiY3JlYXRlRXZlbnRJbnRlcmFjdGl2ZWx5IiwiY3JlYXRlRXZlbnRJbk5hbWVkQ2FsZW5kYXIiLCJmaW5kRXZlbnQiLCJsaXN0RXZlbnRzSW5SYW5nZSIsImxpc3RDYWxlbmRhcnMiLCJmaW5kQWxsRXZlbnRzSW5OYW1lZENhbGVuZGFyIiwibW9kaWZ5RXZlbnQiLCJuZXdUaXRsZSIsIm5ld0xvY2F0aW9uIiwibmV3Tm90ZXMiLCJuZXdTdGFydERhdGUiLCJuZXdFbmREYXRlIiwiZGVsZXRlRXZlbnQiLCJnZXRQaWN0dXJlIiwiY2FtZXJhIiwiY2xlYW51cCIsImNhcHR1cmVBdWRpbyIsImRldmljZSIsImNhcHR1cmUiLCJjYXB0dXJlSW1hZ2UiLCJjYXB0dXJlVmlkZW8iLCJleHBpcnkiLCJjdnYiLCJ6aXAiLCJzdXBwcmVzc01hbnVhbCIsInN1cHByZXNzQ29uZmlybSIsImhpZGVMb2dvIiwic2V0Q2FyZElPUmVzcG9uc2VGaWVsZHMiLCJpc0FycmF5Iiwic2V0U2NhbmVyQ29uZmlnIiwic2NhbkNhcmQiLCJDYXJkSU8iLCJsZW5ndGgiLCJTdHJpbmciLCJleHBpcnlfeWVhciIsInN1YnN0ciIsImNvcHkiLCJjbGlwYm9hcmQiLCJwYXN0ZSIsInNhdmUiLCJjb250YWN0cyIsImNyZWF0ZSIsInJlbW92ZSIsImNsb25lIiwiZmluZCIsImZpZWxkcyIsInBpY2tDb250YWN0IiwiZGF0ZSIsIm1vZGUiLCJkYXRlUGlja2VyIiwiZ2V0RGV2aWNlIiwiZ2V0Q29yZG92YSIsImdldE1vZGVsIiwibW9kZWwiLCJnZXROYW1lIiwibmFtZSIsImdldFBsYXRmb3JtIiwicGxhdGZvcm0iLCJnZXRVVUlEIiwidXVpZCIsImdldFZlcnNpb24iLCJ2ZXJzaW9uIiwiZ2V0TWFudWZhY3R1cmVyIiwibWFudWZhY3R1cmVyIiwiZ2V0Q3VycmVudEFjY2VsZXJhdGlvbiIsImlzVW5kZWZpbmVkIiwiYWNjZWxlcm9tZXRlciIsImlzRnVuY3Rpb24iLCJ3YXRjaEFjY2VsZXJhdGlvbiIsImNhbmNlbCIsImNsZWFyV2F0Y2giLCJ3YXRjaElEIiwiZnJlcXVlbmN5IiwiZ2V0Q3VycmVudEhlYWRpbmciLCJjb21wYXNzIiwid2F0Y2hIZWFkaW5nIiwiYWxlcnQiLCJjb25maXJtIiwicHJvbXB0IiwiaW5wdXQxIiwiYnV0dG9uSW5kZXgiLCJiZWVwIiwiYWN0aXZpdHlTdGFydCIsInBsYXRmb3JtSWQiLCJhY3Rpdml0eVN0b3AiLCJwcm9ncmVzc1N0YXJ0IiwicHJvZ3Jlc3NTdG9wIiwicHJvZ3Jlc3NWYWx1ZSIsImVtYWlsIiwib3BlbiIsImFkZEFsaWFzIiwiYnJvd3NlckluaXQiLCJhcHBJRCIsImFwcFZlcnNpb24iLCJmYWNlYm9va0Nvbm5lY3RQbHVnaW4iLCJsb2dpbiIsInNob3dEaWFsb2ciLCJhcGkiLCJnZXRBY2Nlc3NUb2tlbiIsImdldExvZ2luU3RhdHVzIiwibG9nb3V0Iiwic2V0T3B0aW9ucyIsIkZhY2Vib29rQWRzIiwiY3JlYXRlQmFubmVyIiwicmVtb3ZlQmFubmVyIiwic2hvd0Jhbm5lciIsInNob3dCYW5uZXJBdFhZIiwiaGlkZUJhbm5lciIsInByZXBhcmVJbnRlcnN0aXRpYWwiLCJzaG93SW50ZXJzdGl0aWFsIiwiY29uc3RhbnQiLCJnZXRGcmVlRGlza1NwYWNlIiwiZXhlYyIsImNoZWNrRGlyIiwidGVzdCIsInJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwiLCJpc0RpcmVjdG9yeSIsImNvZGUiLCJjaGVja0ZpbGUiLCJpc0ZpbGUiLCJjcmVhdGVEaXIiLCJleGNsdXNpdmUiLCJnZXREaXJlY3RvcnkiLCJjcmVhdGVGaWxlIiwiZ2V0RmlsZSIsInJlbW92ZURpciIsInN1Y2Nlc3MiLCJmaWxlUmVtb3ZlZCIsInJlbW92ZUZpbGUiLCJyZW1vdmVSZWN1cnNpdmVseSIsIndyaXRlRmlsZSIsImNyZWF0ZVdyaXRlciIsImFwcGVuZCIsInNlZWsiLCJ0cnVuY2F0ZSIsIm9ud3JpdGVlbmQiLCJlcnJvciIsImFib3J0Iiwid3JpdGVFeGlzdGluZ0ZpbGUiLCJyZWFkQXNUZXh0IiwiZmlsZSIsIkZpbGVSZWFkZXIiLCJvbmxvYWRlbmQiLCJ0YXJnZXQiLCJyZXN1bHQiLCJyZWFkQXNEYXRhVVJMIiwicmVhZEFzQmluYXJ5U3RyaW5nIiwicmVhZEFzQXJyYXlCdWZmZXIiLCJtb3ZlRmlsZSIsIm1vdmVUbyIsIm1vdmVEaXIiLCJjb3B5RGlyIiwiY29weVRvIiwiY29weUZpbGUiLCJyZWFkRmlsZU1ldGFkYXRhIiwiZmlsZU9wZW5lcjIiLCJ1bmluc3RhbGwiLCJhcHBJc0luc3RhbGxlZCIsImRvd25sb2FkIiwiRmlsZVRyYW5zZmVyIiwiZW5jb2RlVVJJIiwidGltZW91dCIsIm9ucHJvZ3Jlc3MiLCJ1cGxvYWQiLCJmbGFzaGxpZ2h0Iiwic3dpdGNoT24iLCJzd2l0Y2hPZmYiLCJ0b2dnbGUiLCJGbHVycnlBZHMiLCJnYVBsdWdpbiIsInRyYWNrRXZlbnQiLCJ0cmFja1BhZ2UiLCJzZXRWYXJpYWJsZSIsImV4aXQiLCJ3YXRjaFBvc2l0aW9uIiwiZ2V0UHJlZmVycmVkTGFuZ3VhZ2UiLCJnbG9iYWxpemF0aW9uIiwiZ2V0TG9jYWxlTmFtZSIsImdldEZpcnN0RGF5T2ZXZWVrIiwiZGF0ZVRvU3RyaW5nIiwic3RyaW5nVG9EYXRlIiwiZ2V0RGF0ZVBhdHRlcm4iLCJnZXREYXRlTmFtZXMiLCJpc0RheUxpZ2h0U2F2aW5nc1RpbWUiLCJudW1iZXJUb1N0cmluZyIsInN0cmluZ1RvTnVtYmVyIiwiZ2V0TnVtYmVyUGF0dGVybiIsImdldEN1cnJlbmN5UGF0dGVybiIsInN0YXJ0VHJhY2tlcldpdGhJZCIsImFuYWx5dGljcyIsInNldFVzZXJJZCIsImRlYnVnTW9kZSIsInRyYWNrVmlldyIsImFkZEN1c3RvbURpbWVuc2lvbiIsInBhcnNlSW50IiwiaXNOYU4iLCJ0cmFja0V4Y2VwdGlvbiIsInRyYWNrVGltaW5nIiwiYWRkVHJhbnNhY3Rpb24iLCJhZGRUcmFuc2FjdGlvbkl0ZW0iLCJnZXRNYXAiLCJwbHVnaW4iLCJnb29nbGUiLCJtYXBzIiwiZ2V0RWxlbWVudEJ5SWQiLCJNYXAiLCJzZXREaXYiLCJpc01hcExvYWRlZCIsImFkZE1hcmtlciIsImdldE1hcFR5cGVJZHMiLCJtYXBUeXBlSWQiLCJzZXRWaXNpYmxlIiwiYXV0aCIsImdvb2dsZXBsYXlnYW1lIiwic2lnbm91dCIsImlzU2lnbmVkSW4iLCJzaG93UGxheWVyIiwic3VibWl0U2NvcmUiLCJzaG93QWxsTGVhZGVyYm9hcmRzIiwic2hvd0xlYWRlcmJvYXJkIiwidW5sb2NrQWNoaWV2ZW1lbnQiLCJpbmNyZW1lbnRBY2hpZXZlbWVudCIsInNob3dBY2hpZXZlbWVudHMiLCJnb29nbGVwbHVzIiwiaU9TQXBpS2V5Iiwic2lsZW50TG9naW4iLCJ0cnlTaWxlbnRMb2dpbiIsImhlYWx0aGtpdCIsImNoZWNrQXV0aFN0YXR1cyIsInJlcXVlc3RBdXRob3JpemF0aW9uIiwicmVhZFR5cGVzIiwid3JpdGVUeXBlcyIsInJlYWREYXRlT2ZCaXJ0aCIsInJlYWRHZW5kZXIiLCJzYXZlV2VpZ2h0IiwidW5pdCIsImFtb3VudCIsInJlYWRXZWlnaHQiLCJzYXZlSGVpZ2h0IiwicmVhZEhlaWdodCIsImZpbmRXb3Jrb3V0cyIsInNhdmVXb3Jrb3V0IiwicXVlcnlTYW1wbGVUeXBlIiwic3RhcnRTZXJ2ZXIiLCJDb3JIdHRwZCIsInN0b3BTZXJ2ZXIiLCJnZXRVUkwiLCJnZXRMb2NhbFBhdGgiLCJpQWQiLCJnZXRQaWN0dXJlcyIsImltYWdlUGlja2VyIiwiZGVmYXVsdE9wdGlvbnMiLCJzZXREZWZhdWx0T3B0aW9ucyIsImZvckVhY2giLCJkIiwiam9pbiIsImNsb3NlIiwiZXhlY3V0ZVNjcmlwdCIsImluc2VydENTUyIsImtlZXBBd2FrZSIsImluc29tbmlhIiwiYWxsb3dTbGVlcEFnYWluIiwic2hhcmUiLCJJbnN0YWdyYW0iLCJpbWFnZSIsImNhcHRpb24iLCJjb25zb2xlIiwiaXNJbnN0YWxsZWQiLCIkZXZhbEFzeW5jIiwiS2V5Ym9hcmQiLCJoaWRlQWNjZXNzb3J5QmFyIiwiaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyIiwiZGlzYWJsZVNjcm9sbCIsImlzVmlzaWJsZSIsImNsZWFyU2hvd1dhdGNoIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIiQkbGlzdGVuZXJzIiwiY2xlYXJIaWRlV2F0Y2giLCJnZXRGb3JLZXkiLCJLZXljaGFpbiIsInNldEZvcktleSIsInJlbW92ZUZvcktleSIsIm5hdmlnYXRlIiwibGF1bmNobmF2aWdhdG9yIiwibG9jYWwiLCJvbiIsInNjaGVkdWxlIiwiYWRkIiwid2FybiIsInVwZGF0ZSIsImNsZWFyQWxsIiwiY2FuY2VsQWxsIiwiaXNQcmVzZW50IiwiaXNTY2hlZHVsZWQiLCJpc1RyaWdnZXJlZCIsInJlZ2lzdGVyUGVybWlzc2lvbiIsImdldEFsbElkcyIsImdldElkcyIsImdldFNjaGVkdWxlZElkcyIsImdldFRyaWdnZXJlZElkcyIsImdldEFsbCIsImdldFNjaGVkdWxlZCIsImdldEFsbFNjaGVkdWxlZCIsImdldFRyaWdnZXJlZCIsImdldEFsbFRyaWdnZXJlZCIsImdldERlZmF1bHRzIiwic2V0RGVmYXVsdHMiLCJtTWVkaWEiLCJzZXJ2aWNlIiwiaXNEZWZpbmVkIiwiZ2V0RHVyYXRpb24iLCJkdXJhdGlvbiIsImxvZyIsInBvc2l0aW9uIiwibWVkaWEiLCJNZWRpYSIsInN0YXR1cyIsInByb3RvdHlwZSIsInBsYXkiLCJwYXVzZSIsInJlbGVhc2UiLCJzZWVrVG8iLCJzZXRWb2x1bWUiLCJzdGFydFJlY29yZCIsInN0b3BSZWNvcmQiLCJjdXJyZW50VGltZSIsIm5ld01lZGlhIiwiTW9iRm94IiwiTW9QdWIiLCJwcmVsb2FkU2ltcGxlIiwiTmF0aXZlQXVkaW8iLCJwcmVsb2FkQ29tcGxleCIsImxvb3AiLCJ1bmxvYWQiLCJzZXRWb2x1bWVGb3JDb21wbGV4QXNzZXQiLCJjb25uZWN0aW9uIiwiZ2V0TmV0d29yayIsImlzT25saW5lIiwiQ29ubmVjdGlvbiIsIlVOS05PV04iLCJOT05FIiwiaXNPZmZsaW5lIiwiY2xlYXJPZmZsaW5lV2F0Y2giLCJjbGVhck9ubGluZVdhdGNoIiwicGluRGlhbG9nIiwicGx1Z2luTm90RW5hYmxlZE1lc3NhZ2UiLCJkZWNvcmF0ZVByb21pc2UiLCJzdG9yZSIsIkVycm9yIiwiYXJndW1lbnRzIiwiYXBwUHJlZmVyZW5jZXMiLCJmZXRjaCIsInByaW50ZXIiLCJwcmludCIsIlByb2dyZXNzSW5kaWNhdG9yIiwic2hvd1NpbXBsZSIsInNob3dTaW1wbGVXaXRoTGFiZWwiLCJzaG93U2ltcGxlV2l0aExhYmVsRGV0YWlsIiwic2hvd0RldGVybWluYXRlIiwic2hvd0RldGVybWluYXRlV2l0aExhYmVsIiwic2hvd0FubnVsYXIiLCJzaG93QW5udWxhcldpdGhMYWJlbCIsInNob3dCYXIiLCJzaG93QmFyV2l0aExhYmVsIiwic2hvd1N1Y2Nlc3MiLCJzaG93VGV4dCIsIm9uTm90aWZpY2F0aW9uIiwicmVnaXN0ZXIiLCJlY2IiLCJxdWVyeVNlbGVjdG9yIiwicHVzaE5vdGlmaWNhdGlvbiIsInVucmVnaXN0ZXIiLCJzZXRCYWRnZU51bWJlciIsInNldEFwcGxpY2F0aW9uSWNvbkJhZGdlTnVtYmVyIiwiaW5pdGlhbGl6ZSIsIlB1c2hOb3RpZmljYXRpb24iLCIkZW1pdCIsIm9uRXJyb3IiLCJyZWdpc3RyYXRpb25JZCIsImdldEJhZGdlTnVtYmVyIiwiZ2V0QXBwbGljYXRpb25JY29uQmFkZ2VOdW1iZXIiLCJzZXRDb2xvciIsIlJlY2VudHNDb250cm9sIiwic2V0RGVzY3JpcHRpb24iLCJjYXB0dXJlVG9GaWxlIiwiZXh0ZW5zaW9uIiwicXVhbGl0eSIsInNjcmVlbnNob3QiLCJmaWxlUGF0aCIsImZpbGVuYW1lIiwiY2FwdHVyZVRvVXJpIiwiVVJJIiwicmVxdWVzdFBlcm1pc3Npb24iLCJzZXJpYWwiLCJ3cml0ZUhleCIsIlVpbnQ4QXJyYXkiLCJyZWdpc3RlclJlYWRDYWxsYmFjayIsInNlbmQiLCJzbXMiLCJzb2NpYWxzaGFyaW5nIiwic2hhcmVXaXRoT3B0aW9ucyIsInNoYXJlVmlhVHdpdHRlciIsInNoYXJlVmlhV2hhdHNBcHAiLCJzaGFyZVZpYUZhY2Vib29rIiwic2hhcmVWaWFGYWNlYm9va1dpdGhQYXN0ZU1lc3NhZ2VIaW50Iiwic2hhcmVWaWFTTVMiLCJzaGFyZVZpYUVtYWlsIiwic2hhcmVWaWEiLCJjYW5TaGFyZVZpYUVtYWlsIiwiY2FuU2hhcmVWaWEiLCJzcGlubmVyRGlhbG9nIiwic3BsYXNoc2NyZWVuIiwib3BlbkRCIiwiaXNTdHJpbmciLCJiZ1R5cGUiLCJzcWxpdGVQbHVnaW4iLCJvcGVuRGF0YWJhc2UiLCJleGVjdXRlIiwidHJhbnNhY3Rpb24iLCJleGVjdXRlU3FsIiwiaW5zZXJ0Q29sbGVjdGlvbiIsInNsaWNlIiwic3BsaWNlIiwibmVzdGVkRXhlY3V0ZSIsImRlbGV0ZURCIiwiZGVsZXRlRGF0YWJhc2UiLCJvdmVybGF5c1dlYlZpZXciLCJTdGF0dXNCYXIiLCJTVFlMRVMiLCJERUZBVUxUIiwiTElHSFRfQ09OVEVOVCIsIkJMQUNLX1RSQU5TTFVDRU5UIiwiQkxBQ0tfT1BBUVVFIiwic3R5bGUiLCJzdHlsZURlZmF1bHQiLCJzdHlsZUxpZ2h0Q29udGVudCIsInN0eWxlQmxhY2tUcmFuc2x1Y2VudCIsInN0eWxlQmxhY2tPcGFxdWUiLCJzdHlsZUNvbG9yIiwiYmFja2dyb3VuZENvbG9yQnlOYW1lIiwic3R5bGVIZXgiLCJiYWNrZ3JvdW5kQ29sb3JCeUhleFN0cmluZyIsInNob3dTaG9ydFRvcCIsInRvYXN0Iiwic2hvd1Nob3J0Q2VudGVyIiwic2hvd1Nob3J0Qm90dG9tIiwic2hvd0xvbmdUb3AiLCJzaG93TG9uZ0NlbnRlciIsInNob3dMb25nQm90dG9tIiwic2hvd1dpdGhPcHRpb25zIiwiY2hlY2tTdXBwb3J0IiwidG91Y2hpZCIsImF1dGhlbnRpY2F0ZSIsInNwZWFrIiwiVFRTIiwidmlicmF0ZSIsInZpYnJhdGVXaXRoUGF0dGVybiIsImNhbmNlbFZpYnJhdGlvbiIsInNldExpbWl0IiwibGltaXQiLCJzZXRNYXhEdXJhdGlvbiIsInNldEhpZ2hRdWFsaXR5IiwiaGlnaHF1YWxpdHkiLCJ1c2VGcm9udENhbWVyYSIsImZyb250Y2FtZXJhIiwic2V0UG9ydHJhaXRPdmVybGF5IiwicG9ydHJhaXRPdmVybGF5Iiwic2V0TGFuZHNjYXBlT3ZlcmxheSIsImxhbmRzY2FwZU92ZXJsYXkiLCJzZXRPdmVybGF5VGV4dCIsIm92ZXJsYXlUZXh0IiwidmlkZW9jYXB0dXJlcGx1cyIsInVuemlwIiwiY29udHJvbGxlciIsIiRzY29wZSIsImdvYmFjayIsImhpc3RvcnkiLCJnbyIsIiRjb3Jkb3ZhQ2FtZXJhIiwiJGNvcmRvdmFQbHVnaW4iLCJzb21lRnVuY3Rpb24iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5IiwidGFrZVBpY3R1cmUiLCJvcHRpb25zIiwiZGVzdGluYXRpb25UeXBlIiwiQ2FtZXJhIiwiRGVzdGluYXRpb25UeXBlIiwiREFUQV9VUkwiLCJzb3VyY2VUeXBlIiwiUGljdHVyZVNvdXJjZVR5cGUiLCJDQU1FUkEiLCJhbGxvd0VkaXQiLCJlbmNvZGluZ1R5cGUiLCJFbmNvZGluZ1R5cGUiLCJKUEVHIiwidGFyZ2V0V2lkdGgiLCJ0YXJnZXRIZWlnaHQiLCJwb3BvdmVyT3B0aW9ucyIsIkNhbWVyYVBvcG92ZXJPcHRpb25zIiwic2F2ZVRvUGhvdG9BbGJ1bSIsImNvcnJlY3RPcmllbnRhdGlvbiIsImltYWdlRGF0YSIsImltZ1VSSSIsImVyciIsIiRpb25pY01vZGFsIiwiZnJvbVRlbXBsYXRlVXJsIiwic2NvcGUiLCJhbmltYXRpb24iLCJtb2RhbCIsIm9wZW5Nb2RhbCIsImNsb3NlTW9kYWwiLCIkb24iLCIkYXV0aCIsIiRzdGF0ZSIsImNoaWxkTG9naW5TZXJ2aWNlIiwidXNlciIsInVzZXJMb2dpbiIsInJlc3BvbnNlIiwic2V0VG9rZW4iLCJyZXZlYWxlciIsInVzZXJTZXJ2aWNlIiwibG9naW5TZXJ2aWNlIiwibWFrZVVzZXIiLCJuZXdVc2VyIiwiaWQiLCJiYWNrZHJvcENsaWNrVG9DbG9zZSIsIm9Nb2RhbDEiLCJvTW9kYWwyIiwib01vZGFsMyIsIm9Nb2RhbDQiLCJvTW9kYWw1IiwiaW5kZXgiLCIkaHR0cCIsIm1ldGhvZCIsInVybCIsImRhdGEiLCIkcSIsImdldFVzZXJJbmZvIiwiZ2V0UGF5bG9hZCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7Ozs7QUFNQSxDQUFDLFlBQVU7QUFBQ0EsVUFBUUMsTUFBUixDQUFlLFdBQWYsRUFBMkIsQ0FBQyxtQkFBRCxDQUEzQixHQUFrREQsUUFBUUMsTUFBUixDQUFlLDJCQUFmLEVBQTJDLEVBQTNDLEVBQStDQyxPQUEvQyxDQUF1RCxpQkFBdkQsRUFBeUUsQ0FBQyxJQUFELEVBQU0sVUFBU0MsQ0FBVCxFQUFXO0FBQUMsUUFBSUMsSUFBRSxFQUFOO0FBQUEsUUFBU0MsSUFBRSxFQUFYO0FBQUEsUUFBY0MsSUFBRSxTQUFGQSxDQUFFLENBQVNILENBQVQsRUFBVztBQUFDLGFBQU8sVUFBU0MsQ0FBVCxFQUFXO0FBQUMsYUFBSSxJQUFJQyxDQUFSLElBQWFGLENBQWI7QUFBZUMsWUFBRUcsSUFBRixLQUFTRixDQUFULElBQVlGLEVBQUVFLENBQUYsR0FBWjtBQUFmO0FBQWtDLE9BQXJEO0FBQXNELEtBQWxGLENBQW1GLE9BQU0sRUFBQ0csYUFBWSx1QkFBVTtBQUFDLFlBQUlKLElBQUVELEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPQyxPQUFPQyxPQUFQLEdBQWVELE9BQU9FLGFBQVAsR0FBcUJGLE9BQU9FLGFBQVAsQ0FBcUJKLFdBQXJCLENBQWlDLFVBQVNMLENBQVQsRUFBVztBQUFDQyxZQUFFUyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUExRCxFQUEyRCxVQUFTQSxDQUFULEVBQVc7QUFBQ0MsWUFBRVUsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBbkYsQ0FBckIsR0FBMEdDLEVBQUVVLE1BQUYsQ0FBUyxnQ0FBVCxDQUF6SCxHQUFvS1YsRUFBRVUsTUFBRixDQUFTLDBCQUFULENBQXBLLEVBQXlNVixFQUFFVyxPQUFsTjtBQUEwTixPQUFsUSxFQUFtUUMsZ0JBQWUsd0JBQVNDLENBQVQsRUFBV0MsQ0FBWCxFQUFhQyxDQUFiLEVBQWVDLENBQWYsRUFBaUJDLENBQWpCLEVBQW1CQyxDQUFuQixFQUFxQjtBQUFDLFlBQUlDLElBQUVwQixFQUFFTSxLQUFGLEVBQU47QUFBQSxZQUFnQmUsSUFBRSxFQUFDakIsTUFBS1UsQ0FBTixFQUFRUSxPQUFNUCxDQUFkLEVBQWdCUSxVQUFTTCxDQUF6QixFQUFsQixDQUE4QyxPQUFPRixNQUFJSyxFQUFFRyxRQUFGLEdBQVdSLENBQWYsR0FBa0JDLE1BQUlJLEVBQUVJLFlBQUYsR0FBZVIsQ0FBbkIsQ0FBbEIsRUFBd0MsS0FBS1osV0FBTCxHQUFtQnFCLElBQW5CLENBQXdCLFlBQVU7QUFBQ3pCLFlBQUUwQixJQUFGLENBQU9OLENBQVAsR0FBVW5CLEVBQUVZLENBQUYsSUFBS0ssQ0FBZixFQUFpQlosT0FBT0UsYUFBUCxDQUFxQm1CLHFCQUFyQixDQUEyQzNCLENBQTNDLENBQWpCLEVBQStETSxPQUFPRSxhQUFQLENBQXFCb0IsaUJBQXJCLEdBQXVDMUIsRUFBRUQsQ0FBRixDQUF0RyxFQUEyR2tCLEVBQUVWLE9BQUYsQ0FBVVQsQ0FBVixDQUEzRztBQUF3SCxTQUEzSixFQUE0SixVQUFTRCxDQUFULEVBQVc7QUFBQ29CLFlBQUVULE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQXBMLENBQXhDLEVBQThOb0IsRUFBRVIsT0FBdk87QUFBK08sT0FBcmtCLEVBQXNrQmtCLHVCQUFzQiwrQkFBUzdCLENBQVQsRUFBV2EsQ0FBWCxFQUFhO0FBQUMsWUFBSUMsSUFBRWYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU8sS0FBS0QsV0FBTCxHQUFtQnFCLElBQW5CLENBQXdCLFlBQVU7QUFBQ3hCLFlBQUVELENBQUYsSUFBS2EsQ0FBTCxFQUFPUCxPQUFPRSxhQUFQLENBQXFCb0IsaUJBQXJCLEdBQXVDMUIsRUFBRUQsQ0FBRixDQUE5QyxFQUFtRGEsRUFBRUwsT0FBRixDQUFVLENBQUMsQ0FBWCxDQUFuRDtBQUFpRSxTQUFwRyxFQUFxRyxVQUFTVixDQUFULEVBQVc7QUFBQ2UsWUFBRUosTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBN0gsR0FBK0hlLEVBQUVILE9BQXhJO0FBQWdKLE9BQTF3QixFQUEyd0JtQixtQkFBa0IsNkJBQVU7QUFBQyxZQUFJOUIsSUFBRUQsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU8sS0FBS0QsV0FBTCxHQUFtQnFCLElBQW5CLENBQXdCLFlBQVU7QUFBQ25CLGlCQUFPRSxhQUFQLENBQXFCc0IsaUJBQXJCLElBQXlDOUIsRUFBRVMsT0FBRixDQUFVLENBQUMsQ0FBWCxDQUF6QztBQUF1RCxTQUExRixFQUEyRixVQUFTVixDQUFULEVBQVc7QUFBQ0MsWUFBRVUsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBbkgsR0FBcUhDLEVBQUVXLE9BQTlIO0FBQXNJLE9BQTk3QixFQUErN0JvQixzQkFBcUIsOEJBQVMvQixDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFRixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBTyxLQUFLRCxXQUFMLEdBQW1CcUIsSUFBbkIsQ0FBd0IsWUFBVTtBQUFDbkIsaUJBQU9FLGFBQVAsQ0FBcUJ3QixpQkFBckIsQ0FBdUNoQyxDQUF2QyxHQUEwQ0MsRUFBRVEsT0FBRixDQUFVLENBQUMsQ0FBWCxDQUExQztBQUF3RCxTQUEzRixFQUE0RixVQUFTVixDQUFULEVBQVc7QUFBQ0UsWUFBRVMsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBcEgsR0FBc0hFLEVBQUVVLE9BQS9IO0FBQXVJLE9BQXZuQyxFQUFOO0FBQStuQyxHQUFwdUMsQ0FBekUsQ0FBbEQsRUFBazJDZixRQUFRQyxNQUFSLENBQWUsK0JBQWYsRUFBK0MsRUFBL0MsRUFBbURDLE9BQW5ELENBQTJELHFCQUEzRCxFQUFpRixDQUFDLElBQUQsRUFBTSxTQUFOLEVBQWdCLFVBQVNDLENBQVQsRUFBV0MsQ0FBWCxFQUFhO0FBQUMsV0FBTSxFQUFDaUMsTUFBSyxjQUFTaEMsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVrQyxPQUFGLENBQVVDLFdBQVYsQ0FBc0JGLElBQXRCLENBQTJCaEMsQ0FBM0IsRUFBNkIsVUFBU0YsQ0FBVCxFQUFXO0FBQUNHLFlBQUVPLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQXRELEdBQXdERyxFQUFFUyxPQUFqRTtBQUF5RSxPQUEzRyxFQUE0R3lCLE1BQUssZ0JBQVU7QUFBQyxlQUFPcEMsRUFBRWtDLE9BQUYsQ0FBVUMsV0FBVixDQUFzQkMsSUFBdEIsRUFBUDtBQUFvQyxPQUFoSyxFQUFOO0FBQXdLLEdBQXRNLENBQWpGLENBQWwyQyxFQUE0bkR4QyxRQUFRQyxNQUFSLENBQWUseUJBQWYsRUFBeUMsRUFBekMsRUFBNkNDLE9BQTdDLENBQXFELGVBQXJELEVBQXFFLENBQUMsSUFBRCxFQUFNLFNBQU4sRUFBZ0IsVUFBU0MsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxXQUFNLEVBQUNxQyxrQkFBaUIsMEJBQVNwQyxDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRWtDLE9BQUYsQ0FBVUksS0FBVixDQUFnQkQsZ0JBQWhCLENBQWlDcEMsQ0FBakMsRUFBbUMsWUFBVTtBQUFDQyxZQUFFTyxPQUFGO0FBQVksU0FBMUQsRUFBMkQsWUFBVTtBQUFDUCxZQUFFUSxNQUFGO0FBQVcsU0FBakYsR0FBbUZSLEVBQUVTLE9BQTVGO0FBQW9HLE9BQWxKLEVBQW1KNEIsd0JBQXVCLGdDQUFTdEMsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVrQyxPQUFGLENBQVVJLEtBQVYsQ0FBZ0JDLHNCQUFoQixDQUF1Q3RDLENBQXZDLEVBQXlDLFlBQVU7QUFBQ0MsWUFBRU8sT0FBRjtBQUFZLFNBQWhFLEVBQWlFLFlBQVU7QUFBQ1AsWUFBRVEsTUFBRjtBQUFXLFNBQXZGLEdBQXlGUixFQUFFUyxPQUFsRztBQUEwRyxPQUFoVCxFQUFpVDZCLFdBQVUsbUJBQVN2QyxDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRWtDLE9BQUYsQ0FBVUksS0FBVixDQUFnQkUsU0FBaEIsQ0FBMEJ2QyxDQUExQixFQUE0QixZQUFVO0FBQUNDLFlBQUVPLE9BQUY7QUFBWSxTQUFuRCxFQUFvRCxZQUFVO0FBQUNQLFlBQUVRLE1BQUY7QUFBVyxTQUExRSxHQUE0RVIsRUFBRVMsT0FBckY7QUFBNkYsT0FBcGIsRUFBcWI4QixRQUFPLGdCQUFTeEMsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVrQyxPQUFGLENBQVVJLEtBQVYsQ0FBZ0JHLE1BQWhCLENBQXVCeEMsQ0FBdkIsRUFBeUIsWUFBVTtBQUFDQyxZQUFFTyxPQUFGO0FBQVksU0FBaEQsRUFBaUQsWUFBVTtBQUFDUCxZQUFFUSxNQUFGO0FBQVcsU0FBdkUsR0FBeUVSLEVBQUVTLE9BQWxGO0FBQTBGLE9BQWxqQixFQUFtakIrQix1QkFBc0IsK0JBQVN6QyxDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRWtDLE9BQUYsQ0FBVUksS0FBVixDQUFnQkkscUJBQWhCLENBQXNDekMsQ0FBdEMsRUFBd0MsWUFBVTtBQUFDQyxZQUFFTyxPQUFGO0FBQVksU0FBL0QsRUFBZ0UsWUFBVTtBQUFDUCxZQUFFUSxNQUFGO0FBQVcsU0FBdEYsR0FBd0ZSLEVBQUVTLE9BQWpHO0FBQXlHLE9BQTlzQixFQUFOO0FBQXN0QixHQUFwdkIsQ0FBckUsQ0FBNW5ELEVBQXc3RWYsUUFBUUMsTUFBUixDQUFlLG1DQUFmLEVBQW1ELEVBQW5ELEVBQXVEQyxPQUF2RCxDQUErRCx5QkFBL0QsRUFBeUYsQ0FBQyxJQUFELEVBQU0sVUFBU0MsQ0FBVCxFQUFXO0FBQUMsV0FBTSxFQUFDNEMsT0FBTSxlQUFTM0MsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU91QyxnQkFBZ0JELEtBQWhCLENBQXNCM0MsQ0FBdEIsRUFBd0IsVUFBU0QsQ0FBVCxFQUFXO0FBQUNFLFlBQUVRLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQWpELEVBQWtELFVBQVNBLENBQVQsRUFBVztBQUFDRSxZQUFFUyxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUExRSxHQUE0RUUsRUFBRVUsT0FBckY7QUFBNkYsT0FBaEksRUFBTjtBQUF3SSxHQUExSixDQUF6RixDQUF4N0UsRUFBOHFGZixRQUFRQyxNQUFSLENBQWUsMkJBQWYsRUFBMkMsRUFBM0MsRUFBK0NnRCxRQUEvQyxDQUF3RCxpQkFBeEQsRUFBMEUsQ0FBQyxZQUFVO0FBQUMsU0FBS0MsY0FBTCxHQUFvQixVQUFTL0MsQ0FBVCxFQUFXO0FBQUNBLFdBQUdILFFBQVFtRCxRQUFSLENBQWlCaEQsQ0FBakIsQ0FBSCxLQUF5QmlELFFBQVFDLFdBQVIsQ0FBb0JDLFdBQXBCLEdBQWdDbkQsRUFBRW9ELFFBQUYsSUFBWSxJQUE1QyxFQUFpREgsUUFBUUMsV0FBUixDQUFvQkcsY0FBcEIsR0FBbUNyRCxFQUFFc0QsT0FBRixJQUFXLEVBQS9GLEVBQWtHTCxRQUFRQyxXQUFSLENBQW9CSyw0QkFBcEIsR0FBaUR2RCxFQUFFd0QsbUJBQUYsSUFBdUIsQ0FBQyxDQUEzSyxFQUE2S1AsUUFBUUMsV0FBUixDQUFvQk8sY0FBcEIsR0FBbUN6RCxFQUFFeUQsY0FBRixJQUFrQixDQUFDLENBQW5PLEVBQXFPUixRQUFRQyxXQUFSLENBQW9CUSxlQUFwQixHQUFvQzFELEVBQUUwRCxlQUFGLElBQW1CLENBQTVSLEVBQThSVCxRQUFRQyxXQUFSLENBQW9CUyxtQkFBcEIsR0FBd0MzRCxFQUFFMkQsbUJBQUYsSUFBdUIsQ0FBQyxDQUE5VixFQUFnV1YsUUFBUUMsV0FBUixDQUFvQlUsV0FBcEIsQ0FBZ0NDLEdBQWhDLEdBQW9DN0QsRUFBRThELE1BQUYsSUFBVSxJQUE5WSxFQUFtWmIsUUFBUUMsV0FBUixDQUFvQlUsV0FBcEIsQ0FBZ0NHLE9BQWhDLEdBQXdDL0QsRUFBRWdFLFVBQUYsSUFBYyxJQUF6YyxFQUE4Y2YsUUFBUUMsV0FBUixDQUFvQlUsV0FBcEIsQ0FBZ0NLLFVBQWhDLEdBQTJDakUsRUFBRWtFLGFBQUYsSUFBaUIsSUFBMWdCLEVBQStnQmpCLFFBQVFDLFdBQVIsQ0FBb0JVLFdBQXBCLENBQWdDTyxRQUFoQyxHQUF5Q25FLEVBQUVvRSxVQUFGLElBQWMsSUFBL2xCO0FBQXFtQixLQUFyb0IsRUFBc29CLEtBQUtDLGVBQUwsR0FBcUIsVUFBU3JFLENBQVQsRUFBVztBQUFDLFVBQUlDLElBQUUsRUFBQ3FCLE9BQU0sU0FBUCxFQUFpQmdELFNBQVEsOEhBQXpCLEVBQXdKQyxtQkFBa0IsWUFBMUssRUFBdUxDLGtCQUFpQixpQkFBeE0sRUFBME5DLGlCQUFnQixhQUExTyxFQUFOLENBQStQeEUsSUFBRUosUUFBUTZFLE1BQVIsQ0FBZXpFLENBQWYsRUFBaUJELENBQWpCLENBQUYsRUFBc0JpRCxRQUFRQyxXQUFSLENBQW9CeUIsWUFBcEIsR0FBaUMxRSxDQUF2RDtBQUF5RCxLQUEvOUIsRUFBZytCLEtBQUsyRSxJQUFMLEdBQVUsQ0FBQyxJQUFELEVBQU0sVUFBUzVFLENBQVQsRUFBVztBQUFDLGFBQU0sRUFBQzZFLGlCQUFnQix5QkFBUzVFLENBQVQsRUFBVztBQUFDLGNBQUlDLElBQUVGLEVBQUVNLEtBQUYsRUFBTjtBQUFBLGNBQWdCSCxJQUFFOEMsUUFBUTRCLGVBQVIsQ0FBd0I1RSxDQUF4QixDQUFsQixDQUE2QyxPQUFPQyxFQUFFUSxPQUFGLENBQVVQLENBQVYsR0FBYUQsRUFBRVUsT0FBdEI7QUFBOEIsU0FBeEcsRUFBeUdrRSxvQkFBbUIsOEJBQVU7QUFBQyxjQUFJN0UsSUFBRUQsRUFBRU0sS0FBRixFQUFOO0FBQUEsY0FBZ0JKLElBQUUrQyxRQUFRNkIsa0JBQVIsRUFBbEIsQ0FBK0MsT0FBTzdFLEVBQUVTLE9BQUYsQ0FBVVIsQ0FBVixHQUFhRCxFQUFFVyxPQUF0QjtBQUE4QixTQUFwTixFQUFxTm1FLGlCQUFnQix5QkFBUy9FLENBQVQsRUFBVztBQUFDaUQsa0JBQVFDLFdBQVIsQ0FBb0I4QixTQUFwQixDQUE4QkQsZUFBOUIsR0FBOEMvRSxFQUFFaUYsSUFBRixDQUFPLElBQVAsQ0FBOUM7QUFBMkQsU0FBNVMsRUFBNlNDLGtCQUFpQiwwQkFBU2xGLENBQVQsRUFBVztBQUFDaUQsa0JBQVFDLFdBQVIsQ0FBb0I4QixTQUFwQixDQUE4QkUsZ0JBQTlCLEdBQStDbEYsRUFBRWlGLElBQUYsQ0FBTyxJQUFQLENBQS9DO0FBQTRELFNBQXRZLEVBQU47QUFBOFksS0FBaGEsQ0FBMStCO0FBQTQ0QyxHQUF4NUMsQ0FBMUUsQ0FBOXFGLEVBQW1wSXBGLFFBQVFDLE1BQVIsQ0FBZSw4QkFBZixFQUE4QyxFQUE5QyxFQUFrREMsT0FBbEQsQ0FBMEQsb0JBQTFELEVBQStFLENBQUMsSUFBRCxFQUFNLFVBQVNDLENBQVQsRUFBVztBQUFDLFdBQU0sRUFBQ21GLFlBQVcsc0JBQVU7QUFBQyxZQUFJbEYsSUFBRUQsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9FLFFBQVE0RSxhQUFSLENBQXNCRCxVQUF0QixDQUFpQyxVQUFTbkYsQ0FBVCxFQUFXO0FBQUNDLFlBQUVTLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQTFELEdBQTREQyxFQUFFVyxPQUFyRTtBQUE2RSxPQUFwSCxFQUFxSHlFLGdCQUFlLDBCQUFVO0FBQUMsWUFBSXBGLElBQUVELEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPRSxRQUFRNEUsYUFBUixDQUFzQkMsY0FBdEIsQ0FBcUMsVUFBU3JGLENBQVQsRUFBVztBQUFDQyxZQUFFUyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUE5RCxHQUFnRUMsRUFBRVcsT0FBekU7QUFBaUYsT0FBaFAsRUFBaVAwRSxrQkFBaUIsNEJBQVU7QUFBQyxZQUFJckYsSUFBRUQsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9FLFFBQVE0RSxhQUFSLENBQXNCRSxnQkFBdEIsQ0FBdUMsVUFBU3RGLENBQVQsRUFBVztBQUFDQyxZQUFFUyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUFoRSxHQUFrRUMsRUFBRVcsT0FBM0U7QUFBbUYsT0FBaFgsRUFBaVgyRSxnQkFBZSwwQkFBVTtBQUFDLFlBQUl0RixJQUFFRCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0UsUUFBUTRFLGFBQVIsQ0FBc0JHLGNBQXRCLENBQXFDLFVBQVN2RixDQUFULEVBQVc7QUFBQ0MsWUFBRVMsT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBOUQsR0FBZ0VDLEVBQUVXLE9BQXpFO0FBQWlGLE9BQTVlLEVBQU47QUFBb2YsR0FBdGdCLENBQS9FLENBQW5wSSxFQUEydUpmLFFBQVFDLE1BQVIsQ0FBZSx5Q0FBZixFQUF5RCxFQUF6RCxFQUE2REMsT0FBN0QsQ0FBcUUsK0JBQXJFLEVBQXFHLENBQUMsSUFBRCxFQUFNLFNBQU4sRUFBZ0IsVUFBU0MsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxXQUFNLEVBQUN1RixNQUFLLGdCQUFVO0FBQUN2RixVQUFFd0YsU0FBRixDQUFZQyxXQUFaLENBQXdCQyxrQkFBeEIsQ0FBMkMsVUFBUzNGLENBQVQsRUFBVztBQUFDLGlCQUFPQSxDQUFQO0FBQVMsU0FBaEU7QUFBa0UsT0FBbkYsRUFBb0Y0RixXQUFVLG1CQUFTMUYsQ0FBVCxFQUFXO0FBQUMsYUFBS3NGLElBQUwsR0FBWSxJQUFJckYsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVrQyxPQUFGLENBQVUwRCxxQkFBVixDQUFnQ0QsU0FBaEMsQ0FBMEMsVUFBUzVGLENBQVQsRUFBVztBQUFDRyxZQUFFMkYsTUFBRixDQUFTOUYsQ0FBVCxHQUFZQyxFQUFFa0MsT0FBRixDQUFVMEQscUJBQVYsQ0FBZ0NFLE1BQWhDLEVBQVo7QUFBcUQsU0FBM0csRUFBNEcsVUFBUy9GLENBQVQsRUFBVztBQUFDRyxZQUFFUSxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUFwSSxFQUFxSUUsQ0FBckksR0FBd0ksS0FBSzhGLEtBQUwsRUFBeEksRUFBcUo3RixFQUFFUyxPQUE5SjtBQUFzSyxPQUE1UyxFQUE2U29GLE9BQU0saUJBQVU7QUFBQyxZQUFJOUYsSUFBRUYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVrQyxPQUFGLENBQVUwRCxxQkFBVixDQUFnQ0csS0FBaEMsQ0FBc0MsVUFBU2hHLENBQVQsRUFBVztBQUFDRSxZQUFFUSxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUEvRCxFQUFnRSxVQUFTQSxDQUFULEVBQVc7QUFBQ0UsWUFBRVMsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBeEYsR0FBMEZFLEVBQUVVLE9BQW5HO0FBQTJHLE9BQXpiLEVBQTBicUYsTUFBSyxnQkFBVTtBQUFDLFlBQUkvRixJQUFFRixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRWtDLE9BQUYsQ0FBVTBELHFCQUFWLENBQWdDSSxJQUFoQyxDQUFxQyxVQUFTakcsQ0FBVCxFQUFXO0FBQUNFLFlBQUVRLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQTlELEVBQStELFVBQVNBLENBQVQsRUFBVztBQUFDRSxZQUFFUyxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUF2RixHQUF5RkUsRUFBRVUsT0FBbEc7QUFBMEcsT0FBcGtCLEVBQU47QUFBNGtCLEdBQTFtQixDQUFyRyxDQUEzdUosRUFBNjdLZixRQUFRQyxNQUFSLENBQWUseUJBQWYsRUFBeUMsRUFBekMsRUFBNkNDLE9BQTdDLENBQXFELGVBQXJELEVBQXFFLENBQUMsSUFBRCxFQUFNLFVBQVNDLENBQVQsRUFBVztBQUFDLFdBQU0sRUFBQ2tHLGVBQWMseUJBQVU7QUFBQyxZQUFJakcsSUFBRUQsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9FLFFBQVEyQixPQUFSLENBQWdCZ0UsWUFBaEIsQ0FBNkJDLEtBQTdCLENBQW1DRixhQUFuQyxDQUFpRCxVQUFTbEcsQ0FBVCxFQUFXO0FBQUNBLGNBQUVDLEVBQUVTLE9BQUYsQ0FBVSxDQUFDLENBQVgsQ0FBRixHQUFnQlQsRUFBRVUsTUFBRixDQUFTLDRCQUFULENBQWhCO0FBQXVELFNBQXBILEdBQXNIVixFQUFFVyxPQUEvSDtBQUF1SSxPQUFqTCxFQUFrTHlGLHFCQUFvQiwrQkFBVTtBQUFDLGVBQU83RixRQUFRMkIsT0FBUixDQUFnQmdFLFlBQWhCLENBQTZCQyxLQUE3QixDQUFtQ0MsbUJBQW5DLEVBQVA7QUFBZ0UsT0FBalIsRUFBa1JDLEtBQUksYUFBU3JHLENBQVQsRUFBV0MsQ0FBWCxFQUFhQyxDQUFiLEVBQWU7QUFBQyxZQUFJVyxJQUFFZCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0UsUUFBUTJCLE9BQVIsQ0FBZ0JnRSxZQUFoQixDQUE2QkMsS0FBN0IsQ0FBbUNGLGFBQW5DLENBQWlELFVBQVNsRyxDQUFULEVBQVc7QUFBQ0EsY0FBRWMsRUFBRUosT0FBRixDQUFVRixRQUFRMkIsT0FBUixDQUFnQmdFLFlBQWhCLENBQTZCQyxLQUE3QixDQUFtQ0UsR0FBbkMsQ0FBdUNyRyxDQUF2QyxFQUF5Q0MsQ0FBekMsRUFBMkNDLENBQTNDLENBQVYsQ0FBRixHQUEyRFcsRUFBRUgsTUFBRixDQUFTLHlDQUFULENBQTNEO0FBQStHLFNBQTVLLEdBQThLRyxFQUFFRixPQUF2TDtBQUErTCxPQUFyZixFQUFzZjJGLEtBQUksZUFBVTtBQUFDLFlBQUl0RyxJQUFFRCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0UsUUFBUTJCLE9BQVIsQ0FBZ0JnRSxZQUFoQixDQUE2QkMsS0FBN0IsQ0FBbUNGLGFBQW5DLENBQWlELFVBQVNsRyxDQUFULEVBQVc7QUFBQ0EsY0FBRVEsUUFBUTJCLE9BQVIsQ0FBZ0JnRSxZQUFoQixDQUE2QkMsS0FBN0IsQ0FBbUNHLEdBQW5DLENBQXVDLFVBQVN2RyxDQUFULEVBQVc7QUFBQ0MsY0FBRVMsT0FBRixDQUFVVixDQUFWO0FBQWEsV0FBaEUsQ0FBRixHQUFvRUMsRUFBRVUsTUFBRixDQUFTLHlDQUFULENBQXBFO0FBQXdILFNBQXJMLEdBQXVMVixFQUFFVyxPQUFoTTtBQUF3TSxPQUE3dEIsRUFBOHRCNEYsT0FBTSxlQUFTdkcsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0UsUUFBUTJCLE9BQVIsQ0FBZ0JnRSxZQUFoQixDQUE2QkMsS0FBN0IsQ0FBbUNGLGFBQW5DLENBQWlELFVBQVNsRyxDQUFULEVBQVc7QUFBQ0EsY0FBRUcsRUFBRU8sT0FBRixDQUFVRixRQUFRMkIsT0FBUixDQUFnQmdFLFlBQWhCLENBQTZCQyxLQUE3QixDQUFtQ0ksS0FBbkMsQ0FBeUN2RyxDQUF6QyxFQUEyQ0MsQ0FBM0MsQ0FBVixDQUFGLEdBQTJEQyxFQUFFUSxNQUFGLENBQVMsMkNBQVQsQ0FBM0Q7QUFBaUgsU0FBOUssR0FBZ0xSLEVBQUVTLE9BQXpMO0FBQWlNLE9BQW44QixFQUFvOEI2RixVQUFTLGtCQUFTeEcsQ0FBVCxFQUFXQyxDQUFYLEVBQWFDLENBQWIsRUFBZTtBQUFDLFlBQUlXLElBQUVkLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPLEtBQUs0RixhQUFMLEdBQXFCeEUsSUFBckIsQ0FBMEIsWUFBVTtBQUFDWixZQUFFSixPQUFGLENBQVVGLFFBQVEyQixPQUFSLENBQWdCZ0UsWUFBaEIsQ0FBNkJDLEtBQTdCLENBQW1DSyxRQUFuQyxDQUE0Q3hHLENBQTVDLEVBQThDQyxDQUE5QyxFQUFnREMsQ0FBaEQsQ0FBVjtBQUE4RCxTQUFuRyxFQUFvRyxZQUFVO0FBQUNXLFlBQUVILE1BQUYsQ0FBUyw4Q0FBVDtBQUF5RCxTQUF4SyxHQUEwS0csRUFBRUYsT0FBbkw7QUFBMkwsT0FBeHFDLEVBQXlxQzhGLFVBQVMsa0JBQVN6RyxDQUFULEVBQVdDLENBQVgsRUFBYUMsQ0FBYixFQUFlO0FBQUMsWUFBSVcsSUFBRWQsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU8sS0FBSzRGLGFBQUwsR0FBcUJ4RSxJQUFyQixDQUEwQixZQUFVO0FBQUNaLFlBQUVKLE9BQUYsQ0FBVUYsUUFBUTJCLE9BQVIsQ0FBZ0JnRSxZQUFoQixDQUE2QkMsS0FBN0IsQ0FBbUNNLFFBQW5DLENBQTRDekcsQ0FBNUMsRUFBOENDLENBQTlDLEVBQWdEQyxDQUFoRCxDQUFWO0FBQThELFNBQW5HLEVBQW9HLFlBQVU7QUFBQ1csWUFBRUgsTUFBRixDQUFTLDhDQUFUO0FBQXlELFNBQXhLLEdBQTBLRyxFQUFFRixPQUFuTDtBQUEyTCxPQUE3NEMsRUFBODRDZ0YsV0FBVSxtQkFBUzVGLENBQVQsRUFBVztBQUFDLGVBQU9RLFFBQVEyQixPQUFSLENBQWdCZ0UsWUFBaEIsQ0FBNkJDLEtBQTdCLENBQW1DUixTQUFuQyxDQUE2QzVGLENBQTdDLENBQVA7QUFBdUQsT0FBMzlDLEVBQU47QUFBbStDLEdBQXIvQyxDQUFyRSxDQUE3N0ssRUFBMC9OSCxRQUFRQyxNQUFSLENBQWUsa0NBQWYsRUFBa0QsRUFBbEQsRUFBc0RDLE9BQXRELENBQThELHdCQUE5RCxFQUF1RixDQUFDLElBQUQsRUFBTSxVQUFTQyxDQUFULEVBQVc7QUFBQyxXQUFNLEVBQUMyRyxNQUFLLGNBQVMxRyxDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFRixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0UsUUFBUTJCLE9BQVIsQ0FBZ0J5RSxjQUFoQixDQUErQkQsSUFBL0IsQ0FBb0MsVUFBUzNHLENBQVQsRUFBVztBQUFDRSxZQUFFUSxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUE3RCxFQUE4RCxVQUFTQSxDQUFULEVBQVc7QUFBQ0UsWUFBRVMsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBdEYsRUFBdUZDLENBQXZGLEdBQTBGQyxFQUFFVSxPQUFuRztBQUEyRyxPQUE3SSxFQUE4SWlHLFFBQU8sZ0JBQVM1RyxDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFlBQUlDLElBQUVILEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxJQUFFQSxLQUFHLFdBQUwsRUFBaUJPLFFBQVEyQixPQUFSLENBQWdCeUUsY0FBaEIsQ0FBK0JDLE1BQS9CLENBQXNDNUcsQ0FBdEMsRUFBd0NDLENBQXhDLEVBQTBDLFVBQVNGLENBQVQsRUFBVztBQUFDRyxZQUFFTyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUFuRSxFQUFvRSxVQUFTQSxDQUFULEVBQVc7QUFBQ0csWUFBRVEsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBNUYsQ0FBakIsRUFBK0dHLEVBQUVTLE9BQXhIO0FBQWdJLE9BQW5ULEVBQU47QUFBMlQsR0FBN1UsQ0FBdkYsQ0FBMS9OLEVBQWk2T2YsUUFBUUMsTUFBUixDQUFlLGlDQUFmLEVBQWlELEVBQWpELEVBQXFEQyxPQUFyRCxDQUE2RCx1QkFBN0QsRUFBcUYsQ0FBQyxZQUFELEVBQWMsU0FBZCxFQUF3QixVQUF4QixFQUFtQyxVQUFTQyxDQUFULEVBQVdDLENBQVgsRUFBYUMsQ0FBYixFQUFlO0FBQUMsUUFBSUMsSUFBRSxTQUFGQSxDQUFFLENBQVNGLENBQVQsRUFBVztBQUFDQyxRQUFFLFlBQVU7QUFBQ0YsVUFBRThHLFVBQUYsQ0FBYSw4QkFBYixFQUE0QzdHLENBQTVDO0FBQStDLE9BQTVEO0FBQThELEtBQWhGO0FBQUEsUUFBaUZhLElBQUUsU0FBRkEsQ0FBRSxDQUFTYixDQUFULEVBQVc7QUFBQ0MsUUFBRSxZQUFVO0FBQUNGLFVBQUU4RyxVQUFGLENBQWEsZ0NBQWIsRUFBOEM3RyxDQUE5QztBQUFpRCxPQUE5RDtBQUFnRSxLQUEvSjtBQUFBLFFBQWdLYyxJQUFFLFNBQUZBLENBQUUsQ0FBU2QsQ0FBVCxFQUFXO0FBQUNDLFFBQUUsWUFBVTtBQUFDRixVQUFFOEcsVUFBRixDQUFhLDJCQUFiLEVBQXlDN0csQ0FBekM7QUFBNEMsT0FBekQ7QUFBMkQsS0FBek8sQ0FBME8sT0FBTzhHLFNBQVNDLGdCQUFULENBQTBCLGFBQTFCLEVBQXdDLFlBQVU7QUFBQ3ZCLGdCQUFVd0IsT0FBVixLQUFvQmhILEVBQUUrRyxnQkFBRixDQUFtQixlQUFuQixFQUFtQzdHLENBQW5DLEVBQXFDLENBQUMsQ0FBdEMsR0FBeUNGLEVBQUUrRyxnQkFBRixDQUFtQixpQkFBbkIsRUFBcUNsRyxDQUFyQyxFQUF1QyxDQUFDLENBQXhDLENBQXpDLEVBQW9GYixFQUFFK0csZ0JBQUYsQ0FBbUIsWUFBbkIsRUFBZ0NqRyxDQUFoQyxFQUFrQyxDQUFDLENBQW5DLENBQXhHO0FBQStJLEtBQWxNLEVBQW1NLENBQUMsQ0FBcE0sR0FBdU0sQ0FBQyxDQUEvTTtBQUFpTixHQUE5ZSxDQUFyRixFQUFza0JtRyxHQUF0a0IsQ0FBMGtCLENBQUMsV0FBRCxFQUFhLFVBQVNsSCxDQUFULEVBQVc7QUFBQ0EsTUFBRXVHLEdBQUYsQ0FBTSx1QkFBTjtBQUErQixHQUF4RCxDQUExa0IsQ0FBajZPLEVBQXNpUTFHLFFBQVFDLE1BQVIsQ0FBZSwwQkFBZixFQUEwQyxFQUExQyxFQUE4Q0MsT0FBOUMsQ0FBc0QsZ0JBQXRELEVBQXVFLENBQUMsU0FBRCxFQUFXLFlBQVgsRUFBd0IsVUFBeEIsRUFBbUMsSUFBbkMsRUFBd0MsVUFBU0MsQ0FBVCxFQUFXQyxDQUFYLEVBQWFDLENBQWIsRUFBZUMsQ0FBZixFQUFpQjtBQUFDLFFBQUlXLElBQUUsSUFBTjtBQUFBLFFBQVdDLElBQUUsSUFBYjtBQUFBLFFBQWtCQyxJQUFFLElBQXBCO0FBQUEsUUFBeUJDLElBQUUsSUFBM0I7QUFBQSxRQUFnQ0MsSUFBRSxJQUFsQztBQUFBLFFBQXVDQyxJQUFFLElBQXpDO0FBQUEsUUFBOENDLElBQUUsSUFBaEQ7QUFBQSxRQUFxREMsSUFBRSxJQUF2RCxDQUE0RCxPQUFPMEYsU0FBU0MsZ0JBQVQsQ0FBMEIsYUFBMUIsRUFBd0MsWUFBVTtBQUFDLFVBQUdoSCxFQUFFUSxPQUFGLElBQVdSLEVBQUVRLE9BQUYsQ0FBVTJCLE9BQXJCLElBQThCbkMsRUFBRVEsT0FBRixDQUFVMkIsT0FBVixDQUFrQmdGLGVBQW5ELEVBQW1FO0FBQUMsWUFBSWhILElBQUUsSUFBSUgsRUFBRVEsT0FBRixDQUFVMkIsT0FBVixDQUFrQmdGLGVBQWxCLENBQWtDQyxRQUF0QyxFQUFOLENBQXFEakgsRUFBRWtILDBCQUFGLEdBQTZCLFVBQVNySCxDQUFULEVBQVc7QUFBQ0UsWUFBRSxZQUFVO0FBQUNELGNBQUU2RyxVQUFGLENBQWEsMkNBQWIsRUFBeUQ5RyxDQUF6RDtBQUE0RCxXQUF6RSxHQUEyRWMsS0FBR0EsRUFBRWQsQ0FBRixDQUE5RTtBQUFtRixTQUE1SCxFQUE2SEcsRUFBRW1ILDJCQUFGLEdBQThCLFVBQVN0SCxDQUFULEVBQVc7QUFBQ0UsWUFBRSxZQUFVO0FBQUNELGNBQUU2RyxVQUFGLENBQWEsNENBQWIsRUFBMEQ5RyxDQUExRDtBQUE2RCxXQUExRSxHQUE0RWUsS0FBR0EsRUFBRWYsQ0FBRixDQUEvRTtBQUFvRixTQUEzUCxFQUE0UEcsRUFBRW9ILGFBQUYsR0FBZ0IsVUFBU3ZILENBQVQsRUFBVztBQUFDRSxZQUFFLFlBQVU7QUFBQ0QsY0FBRTZHLFVBQUYsQ0FBYSw4QkFBYixFQUE0QzlHLENBQTVDO0FBQStDLFdBQTVELEdBQThEZ0IsS0FBR0EsRUFBRWhCLENBQUYsQ0FBakU7QUFBc0UsU0FBOVYsRUFBK1ZHLEVBQUVxSCxjQUFGLEdBQWlCLFVBQVN4SCxDQUFULEVBQVc7QUFBQ0UsWUFBRSxZQUFVO0FBQUNELGNBQUU2RyxVQUFGLENBQWEsK0JBQWIsRUFBNkM5RyxDQUE3QztBQUFnRCxXQUE3RCxHQUErRGlCLEtBQUdBLEVBQUVqQixDQUFGLENBQWxFO0FBQXVFLFNBQW5jLEVBQW9jRyxFQUFFc0gsdUJBQUYsR0FBMEIsVUFBU3pILENBQVQsRUFBVztBQUFDRSxZQUFFLFlBQVU7QUFBQ0QsY0FBRTZHLFVBQUYsQ0FBYSx3Q0FBYixFQUFzRDlHLENBQXREO0FBQXlELFdBQXRFLEdBQXdFa0IsS0FBR0EsRUFBRWxCLENBQUYsQ0FBM0U7QUFBZ0YsU0FBMWpCLEVBQTJqQkcsRUFBRXVILG9DQUFGLEdBQXVDLFVBQVMxSCxDQUFULEVBQVc7QUFBQ0UsWUFBRSxZQUFVO0FBQUNELGNBQUU2RyxVQUFGLENBQWEscURBQWIsRUFBbUU5RyxDQUFuRTtBQUFzRSxXQUFuRixHQUFxRm1CLEtBQUdBLEVBQUVuQixDQUFGLENBQXhGO0FBQTZGLFNBQTNzQixFQUE0c0JHLEVBQUV3SCwrQkFBRixHQUFrQyxVQUFTM0gsQ0FBVCxFQUFXO0FBQUNFLFlBQUUsWUFBVTtBQUFDRCxjQUFFNkcsVUFBRixDQUFhLGdEQUFiLEVBQThEOUcsQ0FBOUQ7QUFBaUUsV0FBOUUsR0FBZ0ZvQixLQUFHQSxFQUFFcEIsQ0FBRixDQUFuRjtBQUF3RixTQUFsMUIsRUFBbTFCRyxFQUFFeUgsNEJBQUYsR0FBK0IsVUFBUzVILENBQVQsRUFBVztBQUFDRSxZQUFFLFlBQVU7QUFBQ0QsY0FBRTZHLFVBQUYsQ0FBYSw2Q0FBYixFQUEyRDlHLENBQTNEO0FBQThELFdBQTNFLEdBQTZFcUIsS0FBR0EsRUFBRXJCLENBQUYsQ0FBaEY7QUFBcUYsU0FBbjlCLEVBQW85QkEsRUFBRVEsT0FBRixDQUFVMkIsT0FBVixDQUFrQmdGLGVBQWxCLENBQWtDVSxXQUFsQyxDQUE4QzFILENBQTlDLENBQXA5QjtBQUFxZ0M7QUFBQyxLQUFsckMsRUFBbXJDLENBQUMsQ0FBcHJDLEdBQXVyQyxFQUFDMkgsdUNBQXNDLCtDQUFTOUgsQ0FBVCxFQUFXO0FBQUNjLFlBQUVkLENBQUY7QUFBSSxPQUF2RCxFQUF3RCtILHdDQUF1QyxnREFBUy9ILENBQVQsRUFBVztBQUFDZSxZQUFFZixDQUFGO0FBQUksT0FBL0csRUFBZ0hnSSwwQkFBeUIsa0NBQVNoSSxDQUFULEVBQVc7QUFBQ2dCLFlBQUVoQixDQUFGO0FBQUksT0FBekosRUFBMEppSSwyQkFBMEIsbUNBQVNqSSxDQUFULEVBQVc7QUFBQ2lCLFlBQUVqQixDQUFGO0FBQUksT0FBcE0sRUFBcU1rSSxvQ0FBbUMsNENBQVNsSSxDQUFULEVBQVc7QUFBQ2tCLFlBQUVsQixDQUFGO0FBQUksT0FBeFAsRUFBeVBtSSxpREFBZ0QseURBQVNuSSxDQUFULEVBQVc7QUFBQ21CLFlBQUVuQixDQUFGO0FBQUksT0FBelQsRUFBMFRvSSw0Q0FBMkMsb0RBQVNwSSxDQUFULEVBQVc7QUFBQ29CLFlBQUVwQixDQUFGO0FBQUksT0FBclgsRUFBc1hxSSx5Q0FBd0MsaURBQVNySSxDQUFULEVBQVc7QUFBQ3FCLFlBQUVyQixDQUFGO0FBQUksT0FBOWEsRUFBK2FzSSxvQkFBbUIsNEJBQVNySSxDQUFULEVBQVdDLENBQVgsRUFBYUMsQ0FBYixFQUFlVyxDQUFmLEVBQWlCQyxDQUFqQixFQUFtQjtBQUFDLGVBQU9aLElBQUVBLEtBQUcsS0FBSyxDQUFWLEVBQVlXLElBQUVBLEtBQUcsS0FBSyxDQUF0QixFQUF3QixJQUFJZCxFQUFFUSxPQUFGLENBQVUyQixPQUFWLENBQWtCZ0YsZUFBbEIsQ0FBa0NvQixZQUF0QyxDQUFtRHRJLENBQW5ELEVBQXFEQyxDQUFyRCxFQUF1REMsQ0FBdkQsRUFBeURXLENBQXpELEVBQTJEQyxDQUEzRCxDQUEvQjtBQUE2RixPQUFuakIsRUFBb2pCeUgsb0JBQW1CLDhCQUFVO0FBQUMsZUFBT3JJLEVBQUVzSSxJQUFGLENBQU96SSxFQUFFUSxPQUFGLENBQVUyQixPQUFWLENBQWtCZ0YsZUFBbEIsQ0FBa0NxQixrQkFBbEMsRUFBUCxDQUFQO0FBQXNFLE9BQXhwQixFQUF5cEJFLGlCQUFnQiwyQkFBVTtBQUFDLGVBQU92SSxFQUFFc0ksSUFBRixDQUFPekksRUFBRVEsT0FBRixDQUFVMkIsT0FBVixDQUFrQmdGLGVBQWxCLENBQWtDdUIsZUFBbEMsRUFBUCxDQUFQO0FBQW1FLE9BQXZ2QixFQUF3dkJDLGtCQUFpQiw0QkFBVTtBQUFDLGVBQU94SSxFQUFFc0ksSUFBRixDQUFPekksRUFBRVEsT0FBRixDQUFVMkIsT0FBVixDQUFrQmdGLGVBQWxCLENBQWtDd0IsZ0JBQWxDLEVBQVAsQ0FBUDtBQUFvRSxPQUF4MUIsRUFBeTFCQywwQkFBeUIsa0NBQVMzSSxDQUFULEVBQVc7QUFBQyxlQUFPRSxFQUFFc0ksSUFBRixDQUFPekksRUFBRVEsT0FBRixDQUFVMkIsT0FBVixDQUFrQmdGLGVBQWxCLENBQWtDeUIsd0JBQWxDLENBQTJEM0ksQ0FBM0QsQ0FBUCxDQUFQO0FBQTZFLE9BQTM4QixFQUE0OEI0SSx5QkFBd0IsaUNBQVM1SSxDQUFULEVBQVc7QUFBQyxlQUFPRSxFQUFFc0ksSUFBRixDQUFPekksRUFBRVEsT0FBRixDQUFVMkIsT0FBVixDQUFrQmdGLGVBQWxCLENBQWtDMEIsdUJBQWxDLENBQTBENUksQ0FBMUQsQ0FBUCxDQUFQO0FBQTRFLE9BQTVqQyxFQUE2akM2SSx1QkFBc0IsK0JBQVM3SSxDQUFULEVBQVc7QUFBQyxlQUFPRSxFQUFFc0ksSUFBRixDQUFPekksRUFBRVEsT0FBRixDQUFVMkIsT0FBVixDQUFrQmdGLGVBQWxCLENBQWtDMkIscUJBQWxDLENBQXdEN0ksQ0FBeEQsQ0FBUCxDQUFQO0FBQTBFLE9BQXpxQyxFQUEwcUM4SSw2QkFBNEIscUNBQVM5SSxDQUFULEVBQVc7QUFBQyxlQUFPRSxFQUFFc0ksSUFBRixDQUFPekksRUFBRVEsT0FBRixDQUFVMkIsT0FBVixDQUFrQmdGLGVBQWxCLENBQWtDNEIsMkJBQWxDLENBQThEOUksQ0FBOUQsQ0FBUCxDQUFQO0FBQWdGLE9BQWx5QyxFQUFteUMrSSw0QkFBMkIsb0NBQVMvSSxDQUFULEVBQVc7QUFBQyxlQUFPRSxFQUFFc0ksSUFBRixDQUFPekksRUFBRVEsT0FBRixDQUFVMkIsT0FBVixDQUFrQmdGLGVBQWxCLENBQWtDNkIsMEJBQWxDLENBQTZEL0ksQ0FBN0QsQ0FBUCxDQUFQO0FBQStFLE9BQXo1QyxFQUEwNUNnSix3QkFBdUIsa0NBQVU7QUFBQyxlQUFPOUksRUFBRXNJLElBQUYsQ0FBT3pJLEVBQUVRLE9BQUYsQ0FBVTJCLE9BQVYsQ0FBa0JnRixlQUFsQixDQUFrQzhCLHNCQUFsQyxFQUFQLENBQVA7QUFBMEUsT0FBdGdELEVBQXVnREMsK0JBQThCLHlDQUFVO0FBQUMsZUFBTy9JLEVBQUVzSSxJQUFGLENBQU96SSxFQUFFUSxPQUFGLENBQVUyQixPQUFWLENBQWtCZ0YsZUFBbEIsQ0FBa0MrQiw2QkFBbEMsRUFBUCxDQUFQO0FBQWlGLE9BQWpvRCxFQUFrb0RDLDRCQUEyQixzQ0FBVTtBQUFDLGVBQU9oSixFQUFFc0ksSUFBRixDQUFPekksRUFBRVEsT0FBRixDQUFVMkIsT0FBVixDQUFrQmdGLGVBQWxCLENBQWtDZ0MsMEJBQWxDLEVBQVAsQ0FBUDtBQUE4RSxPQUF0dkQsRUFBdXZEQyxxQkFBb0IsK0JBQVU7QUFBQyxlQUFPakosRUFBRXNJLElBQUYsQ0FBT3pJLEVBQUVRLE9BQUYsQ0FBVTJCLE9BQVYsQ0FBa0JnRixlQUFsQixDQUFrQ2lDLG1CQUFsQyxFQUFQLENBQVA7QUFBdUUsT0FBNzFELEVBQTgxREMsa0JBQWlCLDRCQUFVO0FBQUMsZUFBT2xKLEVBQUVzSSxJQUFGLENBQU96SSxFQUFFUSxPQUFGLENBQVUyQixPQUFWLENBQWtCZ0YsZUFBbEIsQ0FBa0NrQyxnQkFBbEMsRUFBUCxDQUFQO0FBQW9FLE9BQTk3RCxFQUErN0RDLG9CQUFtQiw4QkFBVTtBQUFDLGVBQU9uSixFQUFFc0ksSUFBRixDQUFPekksRUFBRVEsT0FBRixDQUFVMkIsT0FBVixDQUFrQmdGLGVBQWxCLENBQWtDbUMsa0JBQWxDLEVBQVAsQ0FBUDtBQUFzRSxPQUFuaUUsRUFBb2lFQywrQkFBOEIsdUNBQVN0SixDQUFULEVBQVc7QUFBQyxlQUFPRSxFQUFFc0ksSUFBRixDQUFPekksRUFBRVEsT0FBRixDQUFVMkIsT0FBVixDQUFrQmdGLGVBQWxCLENBQWtDb0MsNkJBQWxDLENBQWdFdEosQ0FBaEUsQ0FBUCxDQUFQO0FBQWtGLE9BQWhxRSxFQUFpcUV1SixrQkFBaUIsMEJBQVN2SixDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLGVBQU9DLEVBQUVzSSxJQUFGLENBQU96SSxFQUFFUSxPQUFGLENBQVUyQixPQUFWLENBQWtCZ0YsZUFBbEIsQ0FBa0NxQyxnQkFBbEMsQ0FBbUR2SixDQUFuRCxFQUFxREMsQ0FBckQsQ0FBUCxDQUFQO0FBQXVFLE9BQXZ3RSxFQUF3d0V1SixpQkFBZ0IsMkJBQVU7QUFBQyxlQUFPdEosRUFBRXNJLElBQUYsQ0FBT3pJLEVBQUVRLE9BQUYsQ0FBVTJCLE9BQVYsQ0FBa0JnRixlQUFsQixDQUFrQ3NDLGVBQWxDLEVBQVAsQ0FBUDtBQUFtRSxPQUF0MkUsRUFBdTJFQyx3QkFBdUIsa0NBQVU7QUFBQyxlQUFPdkosRUFBRXNJLElBQUYsQ0FBT3pJLEVBQUVRLE9BQUYsQ0FBVTJCLE9BQVYsQ0FBa0JnRixlQUFsQixDQUFrQ3VDLHNCQUFsQyxFQUFQLENBQVA7QUFBMEUsT0FBbjlFLEVBQW85RUMsZUFBYyx5QkFBVTtBQUFDLGVBQU94SixFQUFFc0ksSUFBRixDQUFPekksRUFBRVEsT0FBRixDQUFVMkIsT0FBVixDQUFrQmdGLGVBQWxCLENBQWtDd0MsYUFBbEMsRUFBUCxDQUFQO0FBQWlFLE9BQTlpRixFQUEraUZDLGtCQUFpQiw0QkFBVTtBQUFDLGVBQU96SixFQUFFc0ksSUFBRixDQUFPekksRUFBRVEsT0FBRixDQUFVMkIsT0FBVixDQUFrQmdGLGVBQWxCLENBQWtDeUMsZ0JBQWxDLEVBQVAsQ0FBUDtBQUFvRSxPQUEvb0YsRUFBZ3BGQywwQkFBeUIsb0NBQVU7QUFBQyxlQUFPMUosRUFBRXNJLElBQUYsQ0FBT3pJLEVBQUVRLE9BQUYsQ0FBVTJCLE9BQVYsQ0FBa0JnRixlQUFsQixDQUFrQzBDLHdCQUFsQyxFQUFQLENBQVA7QUFBNEUsT0FBaHdGLEVBQWl3RkMsMkJBQTBCLHFDQUFVO0FBQUMsZUFBTzNKLEVBQUVzSSxJQUFGLENBQU96SSxFQUFFUSxPQUFGLENBQVUyQixPQUFWLENBQWtCZ0YsZUFBbEIsQ0FBa0MyQyx5QkFBbEMsRUFBUCxDQUFQO0FBQTZFLE9BQW4zRixFQUFvM0ZDLGlCQUFnQiwyQkFBVTtBQUFDLGVBQU81SixFQUFFc0ksSUFBRixDQUFPekksRUFBRVEsT0FBRixDQUFVMkIsT0FBVixDQUFrQmdGLGVBQWxCLENBQWtDNEMsZUFBbEMsRUFBUCxDQUFQO0FBQW1FLE9BQWw5RixFQUFtOUZDLG1CQUFrQiwyQkFBUy9KLENBQVQsRUFBVztBQUFDLGVBQU9FLEVBQUVzSSxJQUFGLENBQU96SSxFQUFFUSxPQUFGLENBQVUyQixPQUFWLENBQWtCZ0YsZUFBbEIsQ0FBa0M2QyxpQkFBbEMsQ0FBb0QvSixDQUFwRCxDQUFQLENBQVA7QUFBc0UsT0FBdmpHLEVBQTlyQztBQUF1dkksR0FBNzJJLENBQXZFLENBQXRpUSxFQUE2OVlKLFFBQVFDLE1BQVIsQ0FBZSx1QkFBZixFQUF1QyxFQUF2QyxFQUEyQ0MsT0FBM0MsQ0FBbUQsYUFBbkQsRUFBaUUsQ0FBQyxJQUFELEVBQU0sVUFBTixFQUFpQixNQUFqQixFQUF3QixVQUFTQyxDQUFULEVBQVdDLENBQVgsRUFBYUMsQ0FBYixFQUFlO0FBQUMsV0FBTSxFQUFDeUcsTUFBSyxjQUFTekcsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxZQUFJVyxJQUFFZCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBTzJKLElBQUlDLFNBQUosQ0FBY2hLLENBQWQsRUFBZ0IsVUFBU0YsQ0FBVCxFQUFXO0FBQUNjLFlBQUVnRixNQUFGLENBQVM5RixDQUFUO0FBQVksU0FBeEMsRUFBeUMsVUFBU0EsQ0FBVCxFQUFXO0FBQUNjLFlBQUVILE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQWpFLEdBQW1FQyxFQUFFLFlBQVU7QUFBQ2dLLGNBQUlFLFFBQUosQ0FBYSxZQUFVO0FBQUNySixjQUFFSixPQUFGO0FBQVksV0FBcEMsRUFBcUMsVUFBU1YsQ0FBVCxFQUFXO0FBQUNjLGNBQUVILE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFdBQTdEO0FBQStELFNBQTVFLEVBQTZFLE1BQUlHLENBQWpGLENBQW5FLEVBQXVKVyxFQUFFRixPQUFoSztBQUF3SyxPQUE1TSxFQUE2TXNKLFdBQVUsbUJBQVNsSyxDQUFULEVBQVdDLENBQVgsRUFBYUMsQ0FBYixFQUFlO0FBQUMsZUFBTytKLElBQUlDLFNBQUosQ0FBY2xLLENBQWQsRUFBZ0JDLENBQWhCLEVBQWtCQyxDQUFsQixDQUFQO0FBQTRCLE9BQW5RLEVBQW9RaUssVUFBUyxvQkFBVTtBQUFDLFlBQUlsSyxJQUFFRCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBTzJKLElBQUlFLFFBQUosQ0FBYSxZQUFVO0FBQUNsSyxZQUFFUyxPQUFGO0FBQVksU0FBcEMsRUFBcUMsVUFBU1YsQ0FBVCxFQUFXO0FBQUNDLFlBQUVVLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQTdELEdBQStEQyxFQUFFVyxPQUF4RTtBQUFnRixPQUF4WCxFQUF5WHdKLFNBQVEsaUJBQVNuSyxDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFRixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBTzJKLElBQUlHLE9BQUosQ0FBWW5LLENBQVosRUFBYyxVQUFTRCxDQUFULEVBQVc7QUFBQ0UsWUFBRVEsT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBdkMsRUFBd0MsVUFBU0EsQ0FBVCxFQUFXO0FBQUNFLFlBQUVTLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQWhFLEdBQWtFRSxFQUFFVSxPQUEzRTtBQUFtRixPQUFoZixFQUFpZnlKLFlBQVcsb0JBQVNwSyxDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFRixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBTzJKLElBQUlJLFVBQUosQ0FBZXBLLENBQWYsRUFBaUIsVUFBU0QsQ0FBVCxFQUFXO0FBQUNFLFlBQUVRLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQTFDLEVBQTJDLFVBQVNBLENBQVQsRUFBVztBQUFDRSxZQUFFUyxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUFuRSxHQUFxRUUsRUFBRVUsT0FBOUU7QUFBc0YsT0FBOW1CLEVBQSttQjBKLE1BQUssY0FBU3JLLENBQVQsRUFBV0MsQ0FBWCxFQUFhQyxDQUFiLEVBQWU7QUFBQyxZQUFJVyxJQUFFZCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBTzJKLElBQUlLLElBQUosQ0FBU3JLLENBQVQsRUFBV0MsQ0FBWCxFQUFhQyxDQUFiLEVBQWUsVUFBU0gsQ0FBVCxFQUFXO0FBQUNjLFlBQUVKLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQXhDLEVBQXlDLFVBQVNBLENBQVQsRUFBVztBQUFDYyxZQUFFSCxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUFqRSxHQUFtRWMsRUFBRUYsT0FBNUU7QUFBb0YsT0FBeHVCLEVBQXl1QjJKLE9BQU0sZUFBU3RLLENBQVQsRUFBV0MsQ0FBWCxFQUFhQyxDQUFiLEVBQWVXLENBQWYsRUFBaUI7QUFBQyxZQUFJQyxJQUFFZixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBTzJKLElBQUlNLEtBQUosQ0FBVXRLLENBQVYsRUFBWUMsQ0FBWixFQUFjQyxDQUFkLEVBQWdCVyxDQUFoQixFQUFrQixVQUFTZCxDQUFULEVBQVc7QUFBQ2UsWUFBRUwsT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBM0MsRUFBNEMsVUFBU0EsQ0FBVCxFQUFXO0FBQUNlLFlBQUVKLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQXBFLEdBQXNFZSxFQUFFSCxPQUEvRTtBQUF1RixPQUF4MkIsRUFBeTJCNEosc0JBQXFCLDhCQUFTdkssQ0FBVCxFQUFXQyxDQUFYLEVBQWFDLENBQWIsRUFBZVcsQ0FBZixFQUFpQjtBQUFDLFlBQUlDLElBQUVmLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPMkosSUFBSU8sb0JBQUosQ0FBeUJ2SyxDQUF6QixFQUEyQkMsQ0FBM0IsRUFBNkJDLENBQTdCLEVBQStCVyxDQUEvQixFQUFpQyxVQUFTZCxDQUFULEVBQVc7QUFBQ2UsWUFBRUwsT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBMUQsRUFBMkQsVUFBU0EsQ0FBVCxFQUFXO0FBQUNlLFlBQUVKLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQW5GLEdBQXFGZSxFQUFFSCxPQUE5RjtBQUFzRyxPQUF0Z0MsRUFBdWdDNkosY0FBYSxzQkFBU3pLLENBQVQsRUFBV0MsQ0FBWCxFQUFhRSxDQUFiLEVBQWVXLENBQWYsRUFBaUI7QUFBQyxlQUFPWixFQUFFd0ssT0FBRixDQUFVLHNEQUFWLEdBQWtFLEtBQUtGLG9CQUFMLENBQTBCeEssQ0FBMUIsRUFBNEJDLENBQTVCLEVBQThCRSxDQUE5QixFQUFnQ1csQ0FBaEMsQ0FBekU7QUFBNEcsT0FBbHBDLEVBQW1wQzZKLG1CQUFrQiwyQkFBUzNLLENBQVQsRUFBV0MsQ0FBWCxFQUFhQyxDQUFiLEVBQWVDLENBQWYsRUFBaUJXLENBQWpCLEVBQW1CO0FBQUMsZUFBT21KLElBQUlVLGlCQUFKLENBQXNCM0ssQ0FBdEIsRUFBd0JDLENBQXhCLEVBQTBCQyxDQUExQixFQUE0QkMsQ0FBNUIsRUFBOEJXLENBQTlCLENBQVA7QUFBd0MsT0FBanVDLEVBQWt1QzhKLGtCQUFpQiwwQkFBUzNLLENBQVQsRUFBV0MsQ0FBWCxFQUFhQyxDQUFiLEVBQWU7QUFBQyxZQUFJVyxJQUFFZCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBTzJKLElBQUlXLGdCQUFKLENBQXFCM0ssQ0FBckIsRUFBdUJDLENBQXZCLEVBQXlCQyxDQUF6QixFQUEyQixVQUFTSCxDQUFULEVBQVc7QUFBQ2MsWUFBRUosT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBcEQsRUFBcUQsVUFBU0EsQ0FBVCxFQUFXO0FBQUNjLFlBQUVILE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQTdFLEdBQStFYyxFQUFFRixPQUF4RjtBQUFnRyxPQUFuM0MsRUFBbzNDaUssYUFBWSxxQkFBUzVLLENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPMkosSUFBSVksV0FBSixDQUFnQjVLLENBQWhCLEVBQWtCLFVBQVNELENBQVQsRUFBVztBQUFDRSxZQUFFUSxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUEzQyxFQUE0QyxVQUFTQSxDQUFULEVBQVc7QUFBQ0UsWUFBRVMsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBcEUsR0FBc0VFLEVBQUVVLE9BQS9FO0FBQXVGLE9BQW4vQyxFQUFvL0NrSyxRQUFPLGtCQUFVO0FBQUMsWUFBSTdLLElBQUVELEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPMkosSUFBSWEsTUFBSixDQUFXLFVBQVM5SyxDQUFULEVBQVc7QUFBQ0MsWUFBRVMsT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBcEMsRUFBcUMsVUFBU0EsQ0FBVCxFQUFXO0FBQUNDLFlBQUVVLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQTdELEdBQStEQyxFQUFFVyxPQUF4RTtBQUFnRixPQUF0bUQsRUFBdW1EbUssV0FBVSxxQkFBVTtBQUFDLFlBQUk5SyxJQUFFRCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBTzJKLElBQUljLFNBQUosQ0FBYyxVQUFTL0ssQ0FBVCxFQUFXO0FBQUNDLFlBQUVTLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQXZDLEVBQXdDLFVBQVNBLENBQVQsRUFBVztBQUFDQyxZQUFFVSxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUFoRSxHQUFrRUMsRUFBRVcsT0FBM0U7QUFBbUYsT0FBL3RELEVBQU47QUFBdXVELEdBQS93RCxDQUFqRSxDQUE3OVksRUFBZ3pjZixRQUFRQyxNQUFSLENBQWUsbUNBQWYsRUFBbUQsRUFBbkQsRUFBdURDLE9BQXZELENBQStELHlCQUEvRCxFQUF5RixDQUFDLElBQUQsRUFBTSxTQUFOLEVBQWdCLFVBQVNDLENBQVQsRUFBV0MsQ0FBWCxFQUFhO0FBQUMsV0FBTSxFQUFDbUssU0FBUSxpQkFBU2xLLENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVILEVBQUVNLEtBQUYsRUFBTjtBQUFBLFlBQWdCUSxJQUFFZCxFQUFFTSxLQUFGLEVBQWxCO0FBQUEsWUFBNEJTLElBQUUsQ0FBQyxDQUEvQixDQUFpQyxPQUFPZCxFQUFFK0ssZUFBRixDQUFrQlosT0FBbEIsQ0FBMEJsSyxDQUExQixFQUE0QixZQUFVO0FBQUNhLGNBQUUsQ0FBQyxDQUFILEVBQUtaLEVBQUVPLE9BQUYsQ0FBVUksQ0FBVixDQUFMO0FBQWtCLFNBQXpELEVBQTBELFVBQVNkLENBQVQsRUFBVztBQUFDZSxnQkFBSSxDQUFDLENBQUwsSUFBUUQsRUFBRUgsTUFBRixDQUFTWCxDQUFULENBQVIsRUFBb0JHLEVBQUVRLE1BQUYsQ0FBU1gsQ0FBVCxDQUFwQjtBQUFnQyxTQUF0RyxHQUF3R0csRUFBRVMsT0FBakg7QUFBeUgsT0FBL0ssRUFBZ0xxSyxpQkFBZ0IseUJBQVMvSyxDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRStLLGVBQUYsQ0FBa0JDLGVBQWxCLENBQWtDL0ssQ0FBbEMsRUFBb0MsWUFBVTtBQUFDQyxZQUFFTyxPQUFGO0FBQVksU0FBM0QsRUFBNEQsVUFBU1YsQ0FBVCxFQUFXO0FBQUNHLFlBQUVRLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQXBGLEdBQXNGRyxFQUFFUyxPQUEvRjtBQUF1RyxPQUFuVSxFQUFvVXlKLFlBQVcsc0JBQVU7QUFBQyxZQUFJbkssSUFBRUYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUUrSyxlQUFGLENBQWtCWCxVQUFsQixDQUE2QixZQUFVO0FBQUNuSyxZQUFFUSxPQUFGO0FBQVksU0FBcEQsRUFBcUQsVUFBU1YsQ0FBVCxFQUFXO0FBQUNFLFlBQUVTLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQTdFLEdBQStFRSxFQUFFVSxPQUF4RjtBQUFnRyxPQUExYyxFQUEyY3NLLE1BQUssZ0JBQVU7QUFBQyxZQUFJaEwsSUFBRUYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUUrSyxlQUFGLENBQWtCRSxJQUFsQixDQUF1QixVQUFTbEwsQ0FBVCxFQUFXO0FBQUNFLFlBQUVRLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQWhELEVBQWlELFVBQVNBLENBQVQsRUFBVztBQUFDRSxZQUFFUyxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUF6RSxHQUEyRUUsRUFBRVUsT0FBcEY7QUFBNEYsT0FBdmtCLEVBQXdrQnVLLGtCQUFpQiw0QkFBVTtBQUFDLFlBQUlqTCxJQUFFRixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRStLLGVBQUYsQ0FBa0JHLGdCQUFsQixDQUFtQyxVQUFTbkwsQ0FBVCxFQUFXO0FBQUNFLFlBQUVRLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQTVELEVBQTZELFVBQVNBLENBQVQsRUFBVztBQUFDRSxZQUFFUyxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUFyRixHQUF1RkUsRUFBRVUsT0FBaEc7QUFBd0csT0FBNXRCLEVBQTZ0QndLLDZCQUE0Qix1Q0FBVTtBQUFDLFlBQUlsTCxJQUFFRixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRStLLGVBQUYsQ0FBa0JJLDJCQUFsQixDQUE4QyxVQUFTcEwsQ0FBVCxFQUFXO0FBQUNFLFlBQUU0RixNQUFGLENBQVM5RixDQUFUO0FBQVksU0FBdEUsR0FBd0VFLEVBQUVVLE9BQWpGO0FBQXlGLE9BQTcyQixFQUE4MkJ5SywrQkFBOEIseUNBQVU7QUFBQ3BMLFVBQUUrSyxlQUFGLENBQWtCSyw2QkFBbEI7QUFBa0QsT0FBejhCLEVBQTA4QkMsdUJBQXNCLGlDQUFVO0FBQUMsWUFBSXBMLElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFK0ssZUFBRixDQUFrQk0scUJBQWxCLENBQXdDLFlBQVU7QUFBQ3BMLFlBQUVRLE9BQUY7QUFBWSxTQUEvRCxFQUFnRSxVQUFTVixDQUFULEVBQVc7QUFBQ0UsWUFBRVMsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBeEYsR0FBMEZFLEVBQUVVLE9BQW5HO0FBQTJHLE9BQXRtQyxFQUF1bUNtSyxXQUFVLHFCQUFVO0FBQUMsWUFBSTdLLElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFK0ssZUFBRixDQUFrQkQsU0FBbEIsQ0FBNEIsWUFBVTtBQUFDN0ssWUFBRVEsT0FBRjtBQUFZLFNBQW5ELEVBQW9ELFlBQVU7QUFBQ1IsWUFBRVMsTUFBRjtBQUFXLFNBQTFFLEdBQTRFVCxFQUFFVSxPQUFyRjtBQUE2RixPQUF6dUMsRUFBMHVDa0ssUUFBTyxrQkFBVTtBQUFDLFlBQUk1SyxJQUFFRixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRStLLGVBQUYsQ0FBa0JGLE1BQWxCLENBQXlCLFlBQVU7QUFBQzVLLFlBQUVRLE9BQUY7QUFBWSxTQUFoRCxFQUFpRCxZQUFVO0FBQUNSLFlBQUVTLE1BQUY7QUFBVyxTQUF2RSxHQUF5RVQsRUFBRVUsT0FBbEY7QUFBMEYsT0FBdDJDLEVBQXUyQ2lLLGFBQVksdUJBQVU7QUFBQyxZQUFJM0ssSUFBRUYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUUrSyxlQUFGLENBQWtCSCxXQUFsQixDQUE4QixZQUFVO0FBQUMzSyxZQUFFUSxPQUFGO0FBQVksU0FBckQsRUFBc0QsWUFBVTtBQUFDUixZQUFFUyxNQUFGO0FBQVcsU0FBNUUsR0FBOEVULEVBQUVVLE9BQXZGO0FBQStGLE9BQTcrQyxFQUE4K0MySyxXQUFVLHFCQUFVO0FBQUMsWUFBSXJMLElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFK0ssZUFBRixDQUFrQk8sU0FBbEIsQ0FBNEIsVUFBU3ZMLENBQVQsRUFBVztBQUFDRSxZQUFFUSxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUFyRCxFQUFzRCxVQUFTQSxDQUFULEVBQVc7QUFBQ0UsWUFBRVMsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBOUUsR0FBZ0ZFLEVBQUVVLE9BQXpGO0FBQWlHLE9BQXBuRCxFQUFxbkQwSixNQUFLLGdCQUFVO0FBQUMsWUFBSXBLLElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFK0ssZUFBRixDQUFrQlYsSUFBbEIsQ0FBdUIsVUFBU3RLLENBQVQsRUFBVztBQUFDRSxZQUFFUSxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUFoRCxFQUFpRCxVQUFTQSxDQUFULEVBQVc7QUFBQ0UsWUFBRVMsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBekUsR0FBMkVFLEVBQUVVLE9BQXBGO0FBQTRGLE9BQWp2RCxFQUFrdkQ0SyxXQUFVLG1CQUFTdEwsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUUrSyxlQUFGLENBQWtCUSxTQUFsQixDQUE0QnRMLENBQTVCLEVBQThCLFVBQVNGLENBQVQsRUFBVztBQUFDRyxZQUFFTyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUF2RCxFQUF3RCxVQUFTQSxDQUFULEVBQVc7QUFBQ0csWUFBRVEsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBaEYsR0FBa0ZHLEVBQUVTLE9BQTNGO0FBQW1HLE9BQTMzRCxFQUE0M0QySixPQUFNLGVBQVNySyxDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRStLLGVBQUYsQ0FBa0JULEtBQWxCLENBQXdCckssQ0FBeEIsRUFBMEIsWUFBVTtBQUFDQyxZQUFFTyxPQUFGO0FBQVksU0FBakQsRUFBa0QsVUFBU1YsQ0FBVCxFQUFXO0FBQUNHLFlBQUVRLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQTFFLEdBQTRFRyxFQUFFUyxPQUFyRjtBQUE2RixPQUEzL0QsRUFBNC9ENkssV0FBVSxtQkFBU3ZMLENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVILEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFK0ssZUFBRixDQUFrQlMsU0FBbEIsQ0FBNEJ2TCxDQUE1QixFQUE4QixVQUFTRixDQUFULEVBQVc7QUFBQ0csWUFBRTJGLE1BQUYsQ0FBUzlGLENBQVQ7QUFBWSxTQUF0RCxFQUF1RCxVQUFTQSxDQUFULEVBQVc7QUFBQ0csWUFBRVEsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBL0UsR0FBaUZHLEVBQUVTLE9BQTFGO0FBQWtHLE9BQXBvRSxFQUFxb0U4SyxrQkFBaUIsNEJBQVU7QUFBQyxZQUFJeEwsSUFBRUYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUUrSyxlQUFGLENBQWtCVSxnQkFBbEIsQ0FBbUMsVUFBUzFMLENBQVQsRUFBVztBQUFDRSxZQUFFNEYsTUFBRixDQUFTOUYsQ0FBVDtBQUFZLFNBQTNELEVBQTRELFVBQVNBLENBQVQsRUFBVztBQUFDRSxZQUFFUyxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUFwRixHQUFzRkUsRUFBRVUsT0FBL0Y7QUFBdUcsT0FBeHhFLEVBQXl4RStLLGFBQVksdUJBQVU7QUFBQyxZQUFJekwsSUFBRUYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUUrSyxlQUFGLENBQWtCVyxXQUFsQixDQUE4QixZQUFVO0FBQUN6TCxZQUFFUSxPQUFGO0FBQVksU0FBckQsRUFBc0QsVUFBU1YsQ0FBVCxFQUFXO0FBQUNFLFlBQUVTLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQTlFLEdBQWdGRSxFQUFFVSxPQUF6RjtBQUFpRyxPQUFqNkUsRUFBazZFZ0wsb0JBQW1CLDhCQUFVO0FBQUMsWUFBSTFMLElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFK0ssZUFBRixDQUFrQlksa0JBQWxCLENBQXFDLFlBQVU7QUFBQzFMLFlBQUVRLE9BQUY7QUFBWSxTQUE1RCxFQUE2RCxVQUFTVixDQUFULEVBQVc7QUFBQ0UsWUFBRVMsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBckYsR0FBdUZFLEVBQUVVLE9BQWhHO0FBQXdHLE9BQXhqRixFQUF5akY0RixPQUFNLGlCQUFVO0FBQUMsWUFBSXRHLElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFK0ssZUFBRixDQUFrQnhFLEtBQWxCLENBQXdCLFlBQVU7QUFBQ3RHLFlBQUVRLE9BQUY7QUFBWSxTQUEvQyxFQUFnRCxVQUFTVixDQUFULEVBQVc7QUFBQ0UsWUFBRVMsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBeEUsR0FBMEVFLEVBQUVVLE9BQW5GO0FBQTJGLE9BQXJyRixFQUFzckZpTCxVQUFTLG9CQUFVO0FBQUMsWUFBSTNMLElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFK0ssZUFBRixDQUFrQmEsUUFBbEIsQ0FBMkIsVUFBUzdMLENBQVQsRUFBVztBQUFDRSxZQUFFUSxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUFwRCxFQUFxRCxVQUFTQSxDQUFULEVBQVc7QUFBQ0UsWUFBRVMsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBN0UsR0FBK0VFLEVBQUVVLE9BQXhGO0FBQWdHLE9BQTF6RixFQUFOO0FBQWswRixHQUFoMkYsQ0FBekYsQ0FBaHpjLEVBQTR1aUJmLFFBQVFDLE1BQVIsQ0FBZSw4QkFBZixFQUE4QyxFQUE5QyxFQUFrREMsT0FBbEQsQ0FBMEQsb0JBQTFELEVBQStFLENBQUMsSUFBRCxFQUFNLFNBQU4sRUFBZ0IsVUFBU0MsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxXQUFNLEVBQUNzRyxLQUFJLGVBQVU7QUFBQyxZQUFJckcsSUFBRUYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVPLE9BQUYsR0FBVVAsRUFBRU8sT0FBRixDQUFVMkIsT0FBVixDQUFrQjJKLFVBQWxCLENBQTZCQyxhQUE3QixDQUEyQyxVQUFTL0wsQ0FBVCxFQUFXO0FBQUNFLFlBQUVRLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQXBFLEVBQXFFLFVBQVNBLENBQVQsRUFBVztBQUFDRSxZQUFFUyxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUE3RixDQUFWLEdBQXlHRSxFQUFFUyxNQUFGLENBQVMsa0NBQVQsQ0FBekcsRUFBc0pULEVBQUVVLE9BQS9KO0FBQXVLLE9BQXZNLEVBQXdNMEYsS0FBSSxhQUFTcEcsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVPLE9BQUYsR0FBVVAsRUFBRU8sT0FBRixDQUFVMkIsT0FBVixDQUFrQjJKLFVBQWxCLENBQTZCRSxhQUE3QixDQUEyQzlMLENBQTNDLEVBQTZDLFVBQVNGLENBQVQsRUFBVztBQUFDRyxZQUFFTyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUF0RSxFQUF1RSxVQUFTQSxDQUFULEVBQVc7QUFBQ0csWUFBRVEsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBL0YsQ0FBVixHQUEyR0csRUFBRVEsTUFBRixDQUFTLGtDQUFULENBQTNHLEVBQXdKUixFQUFFUyxPQUFqSztBQUF5SyxPQUFqWixFQUFrWnFMLGlCQUFnQix5QkFBUy9MLENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVILEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFTyxPQUFGLEdBQVVQLEVBQUVPLE9BQUYsQ0FBVTJCLE9BQVYsQ0FBa0IySixVQUFsQixDQUE2QkcsZUFBN0IsQ0FBNkMvTCxDQUE3QyxFQUErQyxVQUFTRixDQUFULEVBQVc7QUFBQ0csWUFBRU8sT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBeEUsRUFBeUUsVUFBU0EsQ0FBVCxFQUFXO0FBQUNHLFlBQUVRLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQWpHLENBQVYsR0FBNkdHLEVBQUVRLE1BQUYsQ0FBUyxrQ0FBVCxDQUE3RyxFQUEwSlIsRUFBRVMsT0FBbks7QUFBMkssT0FBem1CLEVBQU47QUFBaW5CLEdBQS9vQixDQUEvRSxDQUE1dWlCLEVBQTY4akJmLFFBQVFDLE1BQVIsQ0FBZSw0QkFBZixFQUE0QyxFQUE1QyxFQUFnREMsT0FBaEQsQ0FBd0Qsa0JBQXhELEVBQTJFLENBQUMsSUFBRCxFQUFNLFNBQU4sRUFBZ0IsVUFBU0MsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxXQUFNLEVBQUNpTSxnQkFBZSx3QkFBU2hNLENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVILEVBQUVNLEtBQUYsRUFBTjtBQUFBLFlBQWdCUSxJQUFFYixFQUFFa0MsT0FBRixDQUFVZ0ssUUFBVixDQUFtQkMsd0JBQW5CLEVBQWxCLENBQWdFLE9BQU0sWUFBVSxPQUFPbE0sQ0FBakIsR0FBbUJZLEVBQUV1TCxZQUFGLEdBQWVuTSxDQUFsQyxHQUFvQ1ksSUFBRWpCLFFBQVE2RSxNQUFSLENBQWU1RCxDQUFmLEVBQWlCWixDQUFqQixDQUF0QyxFQUEwREQsRUFBRWtDLE9BQUYsQ0FBVWdLLFFBQVYsQ0FBbUJELGNBQW5CLENBQWtDcEwsQ0FBbEMsRUFBb0MsVUFBU2QsQ0FBVCxFQUFXO0FBQUNHLFlBQUVPLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQTdELEVBQThELFVBQVNBLENBQVQsRUFBVztBQUFDRyxZQUFFUSxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUF0RixDQUExRCxFQUFrSkcsRUFBRVMsT0FBMUo7QUFBa0ssT0FBOVAsRUFBK1AwTCxnQkFBZSx3QkFBU3BNLENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVILEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFa0MsT0FBRixDQUFVZ0ssUUFBVixDQUFtQkcsY0FBbkIsQ0FBa0NwTSxDQUFsQyxFQUFvQyxVQUFTRixDQUFULEVBQVc7QUFBQ0csWUFBRU8sT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBN0QsRUFBOEQsVUFBU0EsQ0FBVCxFQUFXO0FBQUNHLFlBQUVRLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQXRGLEdBQXdGRyxFQUFFUyxPQUFqRztBQUF5RyxPQUFuWixFQUFvWjJMLGFBQVkscUJBQVNyTSxDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU47QUFBQSxZQUFnQlEsSUFBRSxFQUFDUSxPQUFNLElBQVAsRUFBWWtMLFVBQVMsSUFBckIsRUFBMEJDLE9BQU0sSUFBaEMsRUFBcUNDLFdBQVUsSUFBL0MsRUFBb0RDLFNBQVEsSUFBNUQsRUFBbEIsQ0FBb0YsT0FBTzdMLElBQUVqQixRQUFRNkUsTUFBUixDQUFlNUQsQ0FBZixFQUFpQlosQ0FBakIsQ0FBRixFQUFzQkQsRUFBRWtDLE9BQUYsQ0FBVWdLLFFBQVYsQ0FBbUJJLFdBQW5CLENBQStCekwsRUFBRVEsS0FBakMsRUFBdUNSLEVBQUUwTCxRQUF6QyxFQUFrRDFMLEVBQUUyTCxLQUFwRCxFQUEwRCxJQUFJRyxJQUFKLENBQVM5TCxFQUFFNEwsU0FBWCxDQUExRCxFQUFnRixJQUFJRSxJQUFKLENBQVM5TCxFQUFFNkwsT0FBWCxDQUFoRixFQUFvRyxVQUFTM00sQ0FBVCxFQUFXO0FBQUNHLFlBQUVPLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQTdILEVBQThILFVBQVNBLENBQVQsRUFBVztBQUFDRyxZQUFFUSxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUF0SixDQUF0QixFQUE4S0csRUFBRVMsT0FBdkw7QUFBK0wsT0FBL3JCLEVBQWdzQmlNLHdCQUF1QixnQ0FBUzNNLENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVILEVBQUVNLEtBQUYsRUFBTjtBQUFBLFlBQWdCUSxJQUFFLEVBQWxCO0FBQUEsWUFBcUJDLElBQUVSLE9BQU80QixPQUFQLENBQWVnSyxRQUFmLENBQXdCVyxrQkFBeEIsRUFBdkI7QUFBQSxZQUFvRTlMLElBQUUsRUFBQ00sT0FBTSxJQUFQLEVBQVlrTCxVQUFTLElBQXJCLEVBQTBCQyxPQUFNLElBQWhDLEVBQXFDQyxXQUFVLElBQS9DLEVBQW9EQyxTQUFRLElBQTVELEVBQXRFLENBQXdJN0wsSUFBRWlNLE9BQU9DLElBQVAsQ0FBWWhNLENBQVosQ0FBRixDQUFpQixLQUFJLElBQUlDLENBQVIsSUFBYWYsQ0FBYjtBQUFlLFdBQUMsQ0FBRCxLQUFLWSxFQUFFbU0sT0FBRixDQUFVaE0sQ0FBVixDQUFMLEdBQWtCRixFQUFFRSxDQUFGLElBQUtmLEVBQUVlLENBQUYsQ0FBdkIsR0FBNEJELEVBQUVDLENBQUYsSUFBS2YsRUFBRWUsQ0FBRixDQUFqQztBQUFmLFNBQXFELE9BQU9oQixFQUFFa0MsT0FBRixDQUFVZ0ssUUFBVixDQUFtQlUsc0JBQW5CLENBQTBDN0wsRUFBRU0sS0FBNUMsRUFBa0ROLEVBQUV3TCxRQUFwRCxFQUE2RHhMLEVBQUV5TCxLQUEvRCxFQUFxRSxJQUFJRyxJQUFKLENBQVM1TCxFQUFFMEwsU0FBWCxDQUFyRSxFQUEyRixJQUFJRSxJQUFKLENBQVM1TCxFQUFFMkwsT0FBWCxDQUEzRixFQUErRzVMLENBQS9HLEVBQWlILFVBQVNmLENBQVQsRUFBVztBQUFDRyxZQUFFTyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUExSSxFQUEySSxVQUFTQSxDQUFULEVBQVc7QUFBQ0csWUFBRVEsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBbkssR0FBcUtHLEVBQUVTLE9BQTlLO0FBQXNMLE9BQXZtQyxFQUF3bUNzTSwwQkFBeUIsa0NBQVNoTixDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU47QUFBQSxZQUFnQlEsSUFBRSxFQUFDUSxPQUFNLElBQVAsRUFBWWtMLFVBQVMsSUFBckIsRUFBMEJDLE9BQU0sSUFBaEMsRUFBcUNDLFdBQVUsSUFBL0MsRUFBb0RDLFNBQVEsSUFBNUQsRUFBbEIsQ0FBb0YsT0FBTzdMLElBQUVqQixRQUFRNkUsTUFBUixDQUFlNUQsQ0FBZixFQUFpQlosQ0FBakIsQ0FBRixFQUFzQkQsRUFBRWtDLE9BQUYsQ0FBVWdLLFFBQVYsQ0FBbUJlLHdCQUFuQixDQUE0Q3BNLEVBQUVRLEtBQTlDLEVBQW9EUixFQUFFMEwsUUFBdEQsRUFBK0QxTCxFQUFFMkwsS0FBakUsRUFBdUUsSUFBSUcsSUFBSixDQUFTOUwsRUFBRTRMLFNBQVgsQ0FBdkUsRUFBNkYsSUFBSUUsSUFBSixDQUFTOUwsRUFBRTZMLE9BQVgsQ0FBN0YsRUFBaUgsVUFBUzNNLENBQVQsRUFBVztBQUFDRyxZQUFFTyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUExSSxFQUEySSxVQUFTQSxDQUFULEVBQVc7QUFBQ0csWUFBRVEsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBbkssQ0FBdEIsRUFBMkxHLEVBQUVTLE9BQXBNO0FBQTRNLE9BQTc2QyxFQUE4NkN1TSw0QkFBMkIsb0NBQVNqTixDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU47QUFBQSxZQUFnQlEsSUFBRSxFQUFDUSxPQUFNLElBQVAsRUFBWWtMLFVBQVMsSUFBckIsRUFBMEJDLE9BQU0sSUFBaEMsRUFBcUNDLFdBQVUsSUFBL0MsRUFBb0RDLFNBQVEsSUFBNUQsRUFBaUVOLGNBQWEsSUFBOUUsRUFBbEIsQ0FBc0csT0FBT3ZMLElBQUVqQixRQUFRNkUsTUFBUixDQUFlNUQsQ0FBZixFQUFpQlosQ0FBakIsQ0FBRixFQUFzQkQsRUFBRWtDLE9BQUYsQ0FBVWdLLFFBQVYsQ0FBbUJnQiwwQkFBbkIsQ0FBOENyTSxFQUFFUSxLQUFoRCxFQUFzRFIsRUFBRTBMLFFBQXhELEVBQWlFMUwsRUFBRTJMLEtBQW5FLEVBQXlFLElBQUlHLElBQUosQ0FBUzlMLEVBQUU0TCxTQUFYLENBQXpFLEVBQStGLElBQUlFLElBQUosQ0FBUzlMLEVBQUU2TCxPQUFYLENBQS9GLEVBQW1IN0wsRUFBRXVMLFlBQXJILEVBQWtJLFVBQVNyTSxDQUFULEVBQVc7QUFBQ0csWUFBRU8sT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBM0osRUFBNEosVUFBU0EsQ0FBVCxFQUFXO0FBQUNHLFlBQUVRLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQXBMLENBQXRCLEVBQTRNRyxFQUFFUyxPQUFyTjtBQUE2TixPQUF4eEQsRUFBeXhEd00sV0FBVSxtQkFBU2xOLENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVILEVBQUVNLEtBQUYsRUFBTjtBQUFBLFlBQWdCUSxJQUFFLEVBQUNRLE9BQU0sSUFBUCxFQUFZa0wsVUFBUyxJQUFyQixFQUEwQkMsT0FBTSxJQUFoQyxFQUFxQ0MsV0FBVSxJQUEvQyxFQUFvREMsU0FBUSxJQUE1RCxFQUFsQixDQUFvRixPQUFPN0wsSUFBRWpCLFFBQVE2RSxNQUFSLENBQWU1RCxDQUFmLEVBQWlCWixDQUFqQixDQUFGLEVBQXNCRCxFQUFFa0MsT0FBRixDQUFVZ0ssUUFBVixDQUFtQmlCLFNBQW5CLENBQTZCdE0sRUFBRVEsS0FBL0IsRUFBcUNSLEVBQUUwTCxRQUF2QyxFQUFnRDFMLEVBQUUyTCxLQUFsRCxFQUF3RCxJQUFJRyxJQUFKLENBQVM5TCxFQUFFNEwsU0FBWCxDQUF4RCxFQUE4RSxJQUFJRSxJQUFKLENBQVM5TCxFQUFFNkwsT0FBWCxDQUE5RSxFQUFrRyxVQUFTM00sQ0FBVCxFQUFXO0FBQUNHLFlBQUVPLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQTNILEVBQTRILFVBQVNBLENBQVQsRUFBVztBQUFDRyxZQUFFUSxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUFwSixDQUF0QixFQUE0S0csRUFBRVMsT0FBckw7QUFBNkwsT0FBaGtFLEVBQWlrRXlNLG1CQUFrQiwyQkFBU25OLENBQVQsRUFBV0MsQ0FBWCxFQUFhO0FBQUMsWUFBSVcsSUFBRWQsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVrQyxPQUFGLENBQVVnSyxRQUFWLENBQW1Ca0IsaUJBQW5CLENBQXFDbk4sQ0FBckMsRUFBdUNDLENBQXZDLEVBQXlDLFVBQVNILENBQVQsRUFBVztBQUFDYyxZQUFFSixPQUFGLENBQVVWLENBQVY7QUFBYSxTQUFsRSxFQUFtRSxVQUFTQSxDQUFULEVBQVc7QUFBQ2MsWUFBRUgsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBM0YsR0FBNkZjLEVBQUVGLE9BQXRHO0FBQThHLE9BQS90RSxFQUFndUUwTSxlQUFjLHlCQUFVO0FBQUMsWUFBSXBOLElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFa0MsT0FBRixDQUFVZ0ssUUFBVixDQUFtQm1CLGFBQW5CLENBQWlDLFVBQVN0TixDQUFULEVBQVc7QUFBQ0UsWUFBRVEsT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBMUQsRUFBMkQsVUFBU0EsQ0FBVCxFQUFXO0FBQUNFLFlBQUVTLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQW5GLEdBQXFGRSxFQUFFVSxPQUE5RjtBQUFzRyxPQUEvMkUsRUFBZzNFMk0sOEJBQTZCLHNDQUFTck4sQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVrQyxPQUFGLENBQVVnSyxRQUFWLENBQW1Cb0IsNEJBQW5CLENBQWdEck4sQ0FBaEQsRUFBa0QsVUFBU0YsQ0FBVCxFQUFXO0FBQUNHLFlBQUVPLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQTNFLEVBQTRFLFVBQVNBLENBQVQsRUFBVztBQUFDRyxZQUFFUSxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUFwRyxHQUFzR0csRUFBRVMsT0FBL0c7QUFBdUgsT0FBaGlGLEVBQWlpRjRNLGFBQVkscUJBQVN0TixDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU47QUFBQSxZQUFnQlEsSUFBRSxFQUFDUSxPQUFNLElBQVAsRUFBWWtMLFVBQVMsSUFBckIsRUFBMEJDLE9BQU0sSUFBaEMsRUFBcUNDLFdBQVUsSUFBL0MsRUFBb0RDLFNBQVEsSUFBNUQsRUFBaUVjLFVBQVMsSUFBMUUsRUFBK0VDLGFBQVksSUFBM0YsRUFBZ0dDLFVBQVMsSUFBekcsRUFBOEdDLGNBQWEsSUFBM0gsRUFBZ0lDLFlBQVcsSUFBM0ksRUFBbEIsQ0FBbUssT0FBTy9NLElBQUVqQixRQUFRNkUsTUFBUixDQUFlNUQsQ0FBZixFQUFpQlosQ0FBakIsQ0FBRixFQUFzQkQsRUFBRWtDLE9BQUYsQ0FBVWdLLFFBQVYsQ0FBbUJxQixXQUFuQixDQUErQjFNLEVBQUVRLEtBQWpDLEVBQXVDUixFQUFFMEwsUUFBekMsRUFBa0QxTCxFQUFFMkwsS0FBcEQsRUFBMEQsSUFBSUcsSUFBSixDQUFTOUwsRUFBRTRMLFNBQVgsQ0FBMUQsRUFBZ0YsSUFBSUUsSUFBSixDQUFTOUwsRUFBRTZMLE9BQVgsQ0FBaEYsRUFBb0c3TCxFQUFFMk0sUUFBdEcsRUFBK0czTSxFQUFFNE0sV0FBakgsRUFBNkg1TSxFQUFFNk0sUUFBL0gsRUFBd0ksSUFBSWYsSUFBSixDQUFTOUwsRUFBRThNLFlBQVgsQ0FBeEksRUFBaUssSUFBSWhCLElBQUosQ0FBUzlMLEVBQUUrTSxVQUFYLENBQWpLLEVBQXdMLFVBQVM3TixDQUFULEVBQVc7QUFBQ0csWUFBRU8sT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBak4sRUFBa04sVUFBU0EsQ0FBVCxFQUFXO0FBQUNHLFlBQUVRLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQTFPLENBQXRCLEVBQWtRRyxFQUFFUyxPQUEzUTtBQUFtUixPQUEvK0YsRUFBZy9Ga04sYUFBWSxxQkFBUzVOLENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVILEVBQUVNLEtBQUYsRUFBTjtBQUFBLFlBQWdCUSxJQUFFLEVBQUMyTSxVQUFTLElBQVYsRUFBZWpCLFVBQVMsSUFBeEIsRUFBNkJDLE9BQU0sSUFBbkMsRUFBd0NDLFdBQVUsSUFBbEQsRUFBdURDLFNBQVEsSUFBL0QsRUFBbEIsQ0FBdUYsT0FBTzdMLElBQUVqQixRQUFRNkUsTUFBUixDQUFlNUQsQ0FBZixFQUFpQlosQ0FBakIsQ0FBRixFQUFzQkQsRUFBRWtDLE9BQUYsQ0FBVWdLLFFBQVYsQ0FBbUIyQixXQUFuQixDQUErQmhOLEVBQUUyTSxRQUFqQyxFQUEwQzNNLEVBQUUwTCxRQUE1QyxFQUFxRDFMLEVBQUUyTCxLQUF2RCxFQUE2RCxJQUFJRyxJQUFKLENBQVM5TCxFQUFFNEwsU0FBWCxDQUE3RCxFQUFtRixJQUFJRSxJQUFKLENBQVM5TCxFQUFFNkwsT0FBWCxDQUFuRixFQUF1RyxVQUFTM00sQ0FBVCxFQUFXO0FBQUNHLFlBQUVPLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQWhJLEVBQWlJLFVBQVNBLENBQVQsRUFBVztBQUFDRyxZQUFFUSxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUF6SixDQUF0QixFQUFpTEcsRUFBRVMsT0FBMUw7QUFBa00sT0FBanlHLEVBQU47QUFBeXlHLEdBQXYwRyxDQUEzRSxDQUE3OGpCLEVBQWsycUJmLFFBQVFDLE1BQVIsQ0FBZSwwQkFBZixFQUEwQyxFQUExQyxFQUE4Q0MsT0FBOUMsQ0FBc0QsZ0JBQXRELEVBQXVFLENBQUMsSUFBRCxFQUFNLFVBQVNDLENBQVQsRUFBVztBQUFDLFdBQU0sRUFBQytOLFlBQVcsb0JBQVM5TixDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFRixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT21GLFVBQVV1SSxNQUFWLElBQWtCdkksVUFBVXVJLE1BQVYsQ0FBaUJELFVBQWpCLENBQTRCLFVBQVMvTixDQUFULEVBQVc7QUFBQ0UsWUFBRVEsT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBckQsRUFBc0QsVUFBU0EsQ0FBVCxFQUFXO0FBQUNFLFlBQUVTLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQTlFLEVBQStFQyxDQUEvRSxHQUFrRkMsRUFBRVUsT0FBdEcsS0FBZ0hWLEVBQUVRLE9BQUYsQ0FBVSxJQUFWLEdBQWdCUixFQUFFVSxPQUFsSSxDQUFQO0FBQWtKLE9BQTFMLEVBQTJMcU4sU0FBUSxtQkFBVTtBQUFDLFlBQUloTyxJQUFFRCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT21GLFVBQVV1SSxNQUFWLENBQWlCQyxPQUFqQixDQUF5QixZQUFVO0FBQUNoTyxZQUFFUyxPQUFGO0FBQVksU0FBaEQsRUFBaUQsVUFBU1YsQ0FBVCxFQUFXO0FBQUNDLFlBQUVVLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQXpFLEdBQTJFQyxFQUFFVyxPQUFwRjtBQUE0RixPQUExVCxFQUFOO0FBQWtVLEdBQXBWLENBQXZFLENBQWwycUIsRUFBZ3dyQmYsUUFBUUMsTUFBUixDQUFlLDJCQUFmLEVBQTJDLEVBQTNDLEVBQStDQyxPQUEvQyxDQUF1RCxpQkFBdkQsRUFBeUUsQ0FBQyxJQUFELEVBQU0sVUFBU0MsQ0FBVCxFQUFXO0FBQUMsV0FBTSxFQUFDa08sY0FBYSxzQkFBU2pPLENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPbUYsVUFBVTBJLE1BQVYsQ0FBaUJDLE9BQWpCLElBQTBCM0ksVUFBVTBJLE1BQVYsQ0FBaUJDLE9BQWpCLENBQXlCRixZQUF6QixDQUFzQyxVQUFTbE8sQ0FBVCxFQUFXO0FBQUNFLFlBQUVRLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQS9ELEVBQWdFLFVBQVNBLENBQVQsRUFBVztBQUFDRSxZQUFFUyxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUF4RixFQUF5RkMsQ0FBekYsR0FBNEZDLEVBQUVVLE9BQXhILEtBQWtJVixFQUFFUSxPQUFGLENBQVUsSUFBVixHQUFnQlIsRUFBRVUsT0FBcEosQ0FBUDtBQUFvSyxPQUE5TSxFQUErTXlOLGNBQWEsc0JBQVNwTyxDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFRixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT21GLFVBQVUwSSxNQUFWLENBQWlCQyxPQUFqQixJQUEwQjNJLFVBQVUwSSxNQUFWLENBQWlCQyxPQUFqQixDQUF5QkMsWUFBekIsQ0FBc0MsVUFBU3JPLENBQVQsRUFBVztBQUFDRSxZQUFFUSxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUEvRCxFQUFnRSxVQUFTQSxDQUFULEVBQVc7QUFBQ0UsWUFBRVMsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBeEYsRUFBeUZDLENBQXpGLEdBQTRGQyxFQUFFVSxPQUF4SCxLQUFrSVYsRUFBRVEsT0FBRixDQUFVLElBQVYsR0FBZ0JSLEVBQUVVLE9BQXBKLENBQVA7QUFBb0ssT0FBNVosRUFBNlowTixjQUFhLHNCQUFTck8sQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9tRixVQUFVMEksTUFBVixDQUFpQkMsT0FBakIsSUFBMEIzSSxVQUFVMEksTUFBVixDQUFpQkMsT0FBakIsQ0FBeUJFLFlBQXpCLENBQXNDLFVBQVN0TyxDQUFULEVBQVc7QUFBQ0UsWUFBRVEsT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBL0QsRUFBZ0UsVUFBU0EsQ0FBVCxFQUFXO0FBQUNFLFlBQUVTLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQXhGLEVBQXlGQyxDQUF6RixHQUE0RkMsRUFBRVUsT0FBeEgsS0FBa0lWLEVBQUVRLE9BQUYsQ0FBVSxJQUFWLEdBQWdCUixFQUFFVSxPQUFwSixDQUFQO0FBQW9LLE9BQTFtQixFQUFOO0FBQWtuQixHQUFwb0IsQ0FBekUsQ0FBaHdyQixFQUFnOXNCZixRQUFRQyxNQUFSLENBQWUsMEJBQWYsRUFBMEMsRUFBMUMsRUFBOENnRCxRQUE5QyxDQUF1RCxrQkFBdkQsRUFBMEUsQ0FBQyxZQUFVO0FBQUMsUUFBSTlDLElBQUUsQ0FBQyxXQUFELEVBQWEsc0JBQWIsRUFBb0MsYUFBcEMsRUFBa0QsY0FBbEQsRUFBaUUsYUFBakUsRUFBK0UsbUJBQS9FLEVBQW1HLEtBQW5HLEVBQXlHLEtBQXpHLENBQU47QUFBQSxRQUFzSEMsSUFBRSxFQUFDc08sUUFBTyxDQUFDLENBQVQsRUFBV0MsS0FBSSxDQUFDLENBQWhCLEVBQWtCQyxLQUFJLENBQUMsQ0FBdkIsRUFBeUJDLGdCQUFlLENBQUMsQ0FBekMsRUFBMkNDLGlCQUFnQixDQUFDLENBQTVELEVBQThEQyxVQUFTLENBQUMsQ0FBeEUsRUFBeEgsQ0FBbU0sS0FBS0MsdUJBQUwsR0FBNkIsVUFBUzVPLENBQVQsRUFBVztBQUFDQSxXQUFHSixRQUFRaVAsT0FBUixDQUFnQjdPLENBQWhCLENBQUgsS0FBd0JELElBQUVDLENBQTFCO0FBQTZCLEtBQXRFLEVBQXVFLEtBQUs4TyxlQUFMLEdBQXFCLFVBQVMvTyxDQUFULEVBQVc7QUFBQ0EsV0FBR0gsUUFBUW1ELFFBQVIsQ0FBaUJoRCxDQUFqQixDQUFILEtBQXlCQyxFQUFFc08sTUFBRixHQUFTdk8sRUFBRXVPLE1BQUYsSUFBVSxDQUFDLENBQXBCLEVBQXNCdE8sRUFBRXVPLEdBQUYsR0FBTXhPLEVBQUV3TyxHQUFGLElBQU8sQ0FBQyxDQUFwQyxFQUFzQ3ZPLEVBQUV3TyxHQUFGLEdBQU16TyxFQUFFeU8sR0FBRixJQUFPLENBQUMsQ0FBcEQsRUFBc0R4TyxFQUFFeU8sY0FBRixHQUFpQjFPLEVBQUUwTyxjQUFGLElBQWtCLENBQUMsQ0FBMUYsRUFBNEZ6TyxFQUFFME8sZUFBRixHQUFrQjNPLEVBQUUyTyxlQUFGLElBQW1CLENBQUMsQ0FBbEksRUFBb0kxTyxFQUFFMk8sUUFBRixHQUFXNU8sRUFBRTRPLFFBQUYsSUFBWSxDQUFDLENBQXJMO0FBQXdMLEtBQWhTLEVBQWlTLEtBQUtoSyxJQUFMLEdBQVUsQ0FBQyxJQUFELEVBQU0sVUFBUzFFLENBQVQsRUFBVztBQUFDLGFBQU0sRUFBQzhPLFVBQVMsb0JBQVU7QUFBQyxjQUFJN08sSUFBRUQsRUFBRUksS0FBRixFQUFOLENBQWdCLE9BQU8yTyxPQUFPdEksSUFBUCxDQUFZMUcsQ0FBWixFQUFjLFVBQVNBLENBQVQsRUFBVztBQUFDLGdCQUFHLFNBQU9BLENBQVYsRUFBWUUsRUFBRVEsTUFBRixDQUFTLElBQVQsRUFBWixLQUErQjtBQUFDLG1CQUFJLElBQUlULElBQUUsRUFBTixFQUFTWSxJQUFFLENBQVgsRUFBYUMsSUFBRWYsRUFBRWtQLE1BQXJCLEVBQTRCbk8sSUFBRUQsQ0FBOUIsRUFBZ0NBLEdBQWhDLEVBQW9DO0FBQUMsb0JBQUlFLElBQUVoQixFQUFFYyxDQUFGLENBQU4sQ0FBVyx3QkFBc0JFLENBQXRCLEdBQXdCZCxFQUFFYyxDQUFGLElBQUttTyxPQUFPbFAsRUFBRW1QLFdBQVQsRUFBc0JDLE1BQXRCLENBQTZCLENBQTdCLEVBQStCLENBQS9CLEtBQW1DLEVBQWhFLEdBQW1FblAsRUFBRWMsQ0FBRixJQUFLZixFQUFFZSxDQUFGLEtBQU0sRUFBOUU7QUFBaUYsaUJBQUVOLE9BQUYsQ0FBVVIsQ0FBVjtBQUFhO0FBQUMsV0FBek0sRUFBME0sWUFBVTtBQUFDQyxjQUFFUSxNQUFGLENBQVMsSUFBVDtBQUFlLFdBQXBPLEdBQXNPUixFQUFFUyxPQUEvTztBQUF1UCxTQUE1UixFQUFOO0FBQW9TLEtBQXRULENBQTNTO0FBQW1tQixHQUFsekIsQ0FBMUUsQ0FBaDlzQixFQUErMHVCZixRQUFRQyxNQUFSLENBQWUsNkJBQWYsRUFBNkMsRUFBN0MsRUFBaURDLE9BQWpELENBQXlELG1CQUF6RCxFQUE2RSxDQUFDLElBQUQsRUFBTSxTQUFOLEVBQWdCLFVBQVNDLENBQVQsRUFBV0MsQ0FBWCxFQUFhO0FBQUMsV0FBTSxFQUFDcVAsTUFBSyxjQUFTcFAsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVPLE9BQUYsQ0FBVTJCLE9BQVYsQ0FBa0JvTixTQUFsQixDQUE0QkQsSUFBNUIsQ0FBaUNwUCxDQUFqQyxFQUFtQyxZQUFVO0FBQUNDLFlBQUVPLE9BQUY7QUFBWSxTQUExRCxFQUEyRCxZQUFVO0FBQUNQLFlBQUVRLE1BQUY7QUFBVyxTQUFqRixHQUFtRlIsRUFBRVMsT0FBNUY7QUFBb0csT0FBdEksRUFBdUk0TyxPQUFNLGlCQUFVO0FBQUMsWUFBSXRQLElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFTyxPQUFGLENBQVUyQixPQUFWLENBQWtCb04sU0FBbEIsQ0FBNEJDLEtBQTVCLENBQWtDLFVBQVN4UCxDQUFULEVBQVc7QUFBQ0UsWUFBRVEsT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBM0QsRUFBNEQsWUFBVTtBQUFDRSxZQUFFUyxNQUFGO0FBQVcsU0FBbEYsR0FBb0ZULEVBQUVVLE9BQTdGO0FBQXFHLE9BQTdRLEVBQU47QUFBcVIsR0FBblQsQ0FBN0UsQ0FBLzB1QixFQUFrdHZCZixRQUFRQyxNQUFSLENBQWUsNEJBQWYsRUFBNEMsRUFBNUMsRUFBZ0RDLE9BQWhELENBQXdELGtCQUF4RCxFQUEyRSxDQUFDLElBQUQsRUFBTSxVQUFTQyxDQUFULEVBQVc7QUFBQyxXQUFNLEVBQUN5UCxNQUFLLGNBQVN4UCxDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFRixFQUFFTSxLQUFGLEVBQU47QUFBQSxZQUFnQkgsSUFBRXNGLFVBQVVpSyxRQUFWLENBQW1CQyxNQUFuQixDQUEwQjFQLENBQTFCLENBQWxCLENBQStDLE9BQU9FLEVBQUVzUCxJQUFGLENBQU8sVUFBU3pQLENBQVQsRUFBVztBQUFDRSxZQUFFUSxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUFoQyxFQUFpQyxVQUFTQSxDQUFULEVBQVc7QUFBQ0UsWUFBRVMsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBekQsR0FBMkRFLEVBQUVVLE9BQXBFO0FBQTRFLE9BQTdJLEVBQThJZ1AsUUFBTyxnQkFBUzNQLENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVGLEVBQUVNLEtBQUYsRUFBTjtBQUFBLFlBQWdCSCxJQUFFc0YsVUFBVWlLLFFBQVYsQ0FBbUJDLE1BQW5CLENBQTBCMVAsQ0FBMUIsQ0FBbEIsQ0FBK0MsT0FBT0UsRUFBRXlQLE1BQUYsQ0FBUyxVQUFTNVAsQ0FBVCxFQUFXO0FBQUNFLFlBQUVRLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQWxDLEVBQW1DLFVBQVNBLENBQVQsRUFBVztBQUFDRSxZQUFFUyxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUEzRCxHQUE2REUsRUFBRVUsT0FBdEU7QUFBOEUsT0FBOVIsRUFBK1JpUCxPQUFNLGVBQVM3UCxDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFd0YsVUFBVWlLLFFBQVYsQ0FBbUJDLE1BQW5CLENBQTBCM1AsQ0FBMUIsQ0FBTixDQUFtQyxPQUFPQyxFQUFFNFAsS0FBRixDQUFRN1AsQ0FBUixDQUFQO0FBQWtCLE9BQXRXLEVBQXVXOFAsTUFBSyxjQUFTN1AsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUYsRUFBRU0sS0FBRixFQUFOO0FBQUEsWUFBZ0JILElBQUVGLEVBQUU4UCxNQUFGLElBQVUsQ0FBQyxJQUFELEVBQU0sYUFBTixDQUE1QixDQUFpRCxPQUFPLE9BQU85UCxFQUFFOFAsTUFBVCxFQUFnQixNQUFJaEQsT0FBT0MsSUFBUCxDQUFZL00sQ0FBWixFQUFlaVAsTUFBbkIsR0FBMEJ6SixVQUFVaUssUUFBVixDQUFtQkksSUFBbkIsQ0FBd0IzUCxDQUF4QixFQUEwQixVQUFTSCxDQUFULEVBQVc7QUFBQ0UsWUFBRVEsT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBbkQsRUFBb0QsVUFBU0EsQ0FBVCxFQUFXO0FBQUNFLFlBQUVTLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQTVFLENBQTFCLEdBQXdHeUYsVUFBVWlLLFFBQVYsQ0FBbUJJLElBQW5CLENBQXdCM1AsQ0FBeEIsRUFBMEIsVUFBU0gsQ0FBVCxFQUFXO0FBQUNFLFlBQUVRLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQW5ELEVBQW9ELFVBQVNBLENBQVQsRUFBVztBQUFDRSxZQUFFUyxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUE1RSxFQUE2RUMsQ0FBN0UsQ0FBeEgsRUFBd01DLEVBQUVVLE9BQWpOO0FBQXlOLE9BQWxvQixFQUFtb0JvUCxhQUFZLHVCQUFVO0FBQUMsWUFBSS9QLElBQUVELEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPbUYsVUFBVWlLLFFBQVYsQ0FBbUJNLFdBQW5CLENBQStCLFVBQVNoUSxDQUFULEVBQVc7QUFBQ0MsWUFBRVMsT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBeEQsRUFBeUQsVUFBU0EsQ0FBVCxFQUFXO0FBQUNDLFlBQUVVLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQWpGLEdBQW1GQyxFQUFFVyxPQUE1RjtBQUFvRyxPQUE5d0IsRUFBTjtBQUFzeEIsR0FBeHlCLENBQTNFLENBQWx0dkIsRUFBd2t4QmYsUUFBUUMsTUFBUixDQUFlLDhCQUFmLEVBQThDLEVBQTlDLEVBQWtEQyxPQUFsRCxDQUEwRCxvQkFBMUQsRUFBK0UsQ0FBQyxTQUFELEVBQVcsSUFBWCxFQUFnQixVQUFTQyxDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFdBQU0sRUFBQ2lDLE1BQUssY0FBU2hDLENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVGLEVBQUVLLEtBQUYsRUFBTixDQUFnQixPQUFPSixJQUFFQSxLQUFHLEVBQUMrUCxNQUFLLElBQUlyRCxJQUFKLEVBQU4sRUFBZXNELE1BQUssTUFBcEIsRUFBTCxFQUFpQ2xRLEVBQUVtUSxVQUFGLENBQWFqTyxJQUFiLENBQWtCaEMsQ0FBbEIsRUFBb0IsVUFBU0YsQ0FBVCxFQUFXO0FBQUNHLFlBQUVPLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQTdDLEVBQThDLFVBQVNBLENBQVQsRUFBVztBQUFDRyxZQUFFUSxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUF0RSxDQUFqQyxFQUF5R0csRUFBRVMsT0FBbEg7QUFBMEgsT0FBNUosRUFBTjtBQUFvSyxHQUFsTSxDQUEvRSxDQUF4a3hCLEVBQTQxeEJmLFFBQVFDLE1BQVIsQ0FBZSwwQkFBZixFQUEwQyxFQUExQyxFQUE4Q0MsT0FBOUMsQ0FBc0QsZ0JBQXRELEVBQXVFLENBQUMsWUFBVTtBQUFDLFdBQU0sRUFBQ3FRLFdBQVUscUJBQVU7QUFBQyxlQUFPakMsTUFBUDtBQUFjLE9BQXBDLEVBQXFDa0MsWUFBVyxzQkFBVTtBQUFDLGVBQU9sQyxPQUFPM04sT0FBZDtBQUFzQixPQUFqRixFQUFrRjhQLFVBQVMsb0JBQVU7QUFBQyxlQUFPbkMsT0FBT29DLEtBQWQ7QUFBb0IsT0FBMUgsRUFBMkhDLFNBQVEsbUJBQVU7QUFBQyxlQUFPckMsT0FBT3NDLElBQWQ7QUFBbUIsT0FBakssRUFBa0tDLGFBQVksdUJBQVU7QUFBQyxlQUFPdkMsT0FBT3dDLFFBQWQ7QUFBdUIsT0FBaE4sRUFBaU5DLFNBQVEsbUJBQVU7QUFBQyxlQUFPekMsT0FBTzBDLElBQWQ7QUFBbUIsT0FBdlAsRUFBd1BDLFlBQVcsc0JBQVU7QUFBQyxlQUFPM0MsT0FBTzRDLE9BQWQ7QUFBc0IsT0FBcFMsRUFBcVNDLGlCQUFnQiwyQkFBVTtBQUFDLGVBQU83QyxPQUFPOEMsWUFBZDtBQUEyQixPQUEzVixFQUFOO0FBQW1XLEdBQS9XLENBQXZFLENBQTUxeEIsRUFBcXh5QnBSLFFBQVFDLE1BQVIsQ0FBZSxnQ0FBZixFQUFnRCxFQUFoRCxFQUFvREMsT0FBcEQsQ0FBNEQsc0JBQTVELEVBQW1GLENBQUMsSUFBRCxFQUFNLFVBQVNDLENBQVQsRUFBVztBQUFDLFdBQU0sRUFBQ2tSLHdCQUF1QixrQ0FBVTtBQUFDLFlBQUlqUixJQUFFRCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT1QsUUFBUXNSLFdBQVIsQ0FBb0IxTCxVQUFVMkwsYUFBOUIsS0FBOEMsQ0FBQ3ZSLFFBQVF3UixVQUFSLENBQW1CNUwsVUFBVTJMLGFBQVYsQ0FBd0JGLHNCQUEzQyxDQUEvQyxJQUFtSGpSLEVBQUVVLE1BQUYsQ0FBUyx5Q0FBVCxHQUFvRFYsRUFBRVcsT0FBekssS0FBbUw2RSxVQUFVMkwsYUFBVixDQUF3QkYsc0JBQXhCLENBQStDLFVBQVNsUixDQUFULEVBQVc7QUFBQ0MsWUFBRVMsT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBeEUsRUFBeUUsVUFBU0EsQ0FBVCxFQUFXO0FBQUNDLFlBQUVVLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQWpHLEdBQW1HQyxFQUFFVyxPQUF4UixDQUFQO0FBQXdTLE9BQTNWLEVBQTRWMFEsbUJBQWtCLDJCQUFTclIsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUYsRUFBRU0sS0FBRixFQUFOLENBQWdCLElBQUdULFFBQVFzUixXQUFSLENBQW9CMUwsVUFBVTJMLGFBQTlCLEtBQThDLENBQUN2UixRQUFRd1IsVUFBUixDQUFtQjVMLFVBQVUyTCxhQUFWLENBQXdCRSxpQkFBM0MsQ0FBbEQsRUFBZ0gsT0FBT3BSLEVBQUVTLE1BQUYsQ0FBUyx5Q0FBVCxHQUFvRFQsRUFBRVUsT0FBN0QsQ0FBcUUsSUFBSVQsSUFBRXNGLFVBQVUyTCxhQUFWLENBQXdCRSxpQkFBeEIsQ0FBMEMsVUFBU3RSLENBQVQsRUFBVztBQUFDRSxZQUFFNEYsTUFBRixDQUFTOUYsQ0FBVDtBQUFZLFNBQWxFLEVBQW1FLFVBQVNBLENBQVQsRUFBVztBQUFDRSxZQUFFUyxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUEzRixFQUE0RkMsQ0FBNUYsQ0FBTixDQUFxRyxPQUFPQyxFQUFFVSxPQUFGLENBQVUyUSxNQUFWLEdBQWlCLFlBQVU7QUFBQzlMLG9CQUFVMkwsYUFBVixDQUF3QkksVUFBeEIsQ0FBbUNyUixDQUFuQztBQUFzQyxTQUFsRSxFQUFtRUQsRUFBRVUsT0FBRixDQUFVNFEsVUFBVixHQUFxQixVQUFTeFIsQ0FBVCxFQUFXO0FBQUN5RixvQkFBVTJMLGFBQVYsQ0FBd0JJLFVBQXhCLENBQW1DeFIsS0FBR0csQ0FBdEM7QUFBeUMsU0FBN0ksRUFBOElELEVBQUVVLE9BQUYsQ0FBVTZRLE9BQVYsR0FBa0J0UixDQUFoSyxFQUFrS0QsRUFBRVUsT0FBM0s7QUFBbUwsT0FBdjFCLEVBQXcxQjRRLFlBQVcsb0JBQVN4UixDQUFULEVBQVc7QUFBQyxlQUFPeUYsVUFBVTJMLGFBQVYsQ0FBd0JJLFVBQXhCLENBQW1DeFIsQ0FBbkMsQ0FBUDtBQUE2QyxPQUE1NUIsRUFBTjtBQUFvNkIsR0FBdDdCLENBQW5GLENBQXJ4eUIsRUFBaXkwQkgsUUFBUUMsTUFBUixDQUFlLHFDQUFmLEVBQXFELEVBQXJELEVBQXlEQyxPQUF6RCxDQUFpRSwyQkFBakUsRUFBNkYsQ0FBQyxJQUFELEVBQU0sVUFBU0MsQ0FBVCxFQUFXO0FBQUMsUUFBSUMsSUFBRSxFQUFDeVIsV0FBVSxHQUFYLEVBQU4sQ0FBc0IsT0FBTSxFQUFDQyxtQkFBa0IsNkJBQVU7QUFBQyxZQUFJMVIsSUFBRUQsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9tRixVQUFVbU0sT0FBVixJQUFtQm5NLFVBQVVtTSxPQUFWLENBQWtCRCxpQkFBbEIsQ0FBb0MsVUFBUzNSLENBQVQsRUFBVztBQUFDQyxZQUFFUyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUE3RCxFQUE4RCxVQUFTQSxDQUFULEVBQVc7QUFBQ0MsWUFBRVUsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBdEYsR0FBd0ZDLEVBQUVXLE9BQTdHLEtBQXVIWCxFQUFFVSxNQUFGLENBQVMsc0JBQVQsR0FBaUNWLEVBQUVXLE9BQTFKLENBQVA7QUFBMEssT0FBeE4sRUFBeU5pUixjQUFhLHNCQUFTM1IsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLElBQUcsQ0FBQ21GLFVBQVVtTSxPQUFkLEVBQXNCLE9BQU96UixFQUFFUSxNQUFGLENBQVMsc0JBQVQsR0FBaUNSLEVBQUVTLE9BQTFDLENBQWtELElBQUlFLElBQUVqQixRQUFRNkUsTUFBUixDQUFlekUsQ0FBZixFQUFpQkMsQ0FBakIsQ0FBTjtBQUFBLFlBQTBCYSxJQUFFMEUsVUFBVW1NLE9BQVYsQ0FBa0JDLFlBQWxCLENBQStCLFVBQVM3UixDQUFULEVBQVc7QUFBQ0csWUFBRTJGLE1BQUYsQ0FBUzlGLENBQVQ7QUFBWSxTQUF2RCxFQUF3RCxVQUFTQSxDQUFULEVBQVc7QUFBQ0csWUFBRVEsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBaEYsRUFBaUZjLENBQWpGLENBQTVCLENBQWdILE9BQU9YLEVBQUVTLE9BQUYsQ0FBVTJRLE1BQVYsR0FBaUIsWUFBVTtBQUFDOUwsb0JBQVVtTSxPQUFWLENBQWtCSixVQUFsQixDQUE2QnpRLENBQTdCO0FBQWdDLFNBQTVELEVBQTZEWixFQUFFUyxPQUFGLENBQVU0USxVQUFWLEdBQXFCLFVBQVN4UixDQUFULEVBQVc7QUFBQ3lGLG9CQUFVbU0sT0FBVixDQUFrQkosVUFBbEIsQ0FBNkJ4UixLQUFHZSxDQUFoQztBQUFtQyxTQUFqSSxFQUFrSVosRUFBRVMsT0FBRixDQUFVNlEsT0FBVixHQUFrQjFRLENBQXBKLEVBQXNKWixFQUFFUyxPQUEvSjtBQUF1SyxPQUFqbUIsRUFBa21CNFEsWUFBVyxvQkFBU3hSLENBQVQsRUFBVztBQUFDLGVBQU95RixVQUFVbU0sT0FBVixDQUFrQkosVUFBbEIsQ0FBNkJ4UixDQUE3QixDQUFQO0FBQXVDLE9BQWhxQixFQUFOO0FBQXdxQixHQUFodEIsQ0FBN0YsQ0FBankwQixFQUFpbDJCSCxRQUFRQyxNQUFSLENBQWUsMkJBQWYsRUFBMkMsRUFBM0MsRUFBK0NDLE9BQS9DLENBQXVELGlCQUF2RCxFQUF5RSxDQUFDLElBQUQsRUFBTSxTQUFOLEVBQWdCLFVBQVNDLENBQVQsRUFBV0MsQ0FBWCxFQUFhO0FBQUMsV0FBTSxFQUFDNlIsT0FBTSxlQUFTNVIsQ0FBVCxFQUFXQyxDQUFYLEVBQWFXLENBQWIsRUFBZTtBQUFDLFlBQUlDLElBQUVmLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFd0YsU0FBRixDQUFZVSxZQUFaLEdBQXlCVixVQUFVVSxZQUFWLENBQXVCMkwsS0FBdkIsQ0FBNkI1UixDQUE3QixFQUErQixZQUFVO0FBQUNhLFlBQUVMLE9BQUY7QUFBWSxTQUF0RCxFQUF1RFAsQ0FBdkQsRUFBeURXLENBQXpELENBQXpCLElBQXNGYixFQUFFNlIsS0FBRixDQUFRNVIsQ0FBUixHQUFXYSxFQUFFTCxPQUFGLEVBQWpHLEdBQThHSyxFQUFFSCxPQUF2SDtBQUErSCxPQUF0SyxFQUF1S21SLFNBQVEsaUJBQVM3UixDQUFULEVBQVdDLENBQVgsRUFBYVcsQ0FBYixFQUFlO0FBQUMsWUFBSUMsSUFBRWYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUV3RixTQUFGLENBQVlVLFlBQVosR0FBeUJWLFVBQVVVLFlBQVYsQ0FBdUI0TCxPQUF2QixDQUErQjdSLENBQS9CLEVBQWlDLFVBQVNGLENBQVQsRUFBVztBQUFDZSxZQUFFTCxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUExRCxFQUEyREcsQ0FBM0QsRUFBNkRXLENBQTdELENBQXpCLEdBQXlGYixFQUFFOFIsT0FBRixDQUFVN1IsQ0FBVixJQUFhYSxFQUFFTCxPQUFGLENBQVUsQ0FBVixDQUFiLEdBQTBCSyxFQUFFTCxPQUFGLENBQVUsQ0FBVixDQUFuSCxFQUFnSUssRUFBRUgsT0FBekk7QUFBaUosT0FBaFcsRUFBaVdvUixRQUFPLGdCQUFTOVIsQ0FBVCxFQUFXQyxDQUFYLEVBQWFXLENBQWIsRUFBZUMsQ0FBZixFQUFpQjtBQUFDLFlBQUlDLElBQUVoQixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsSUFBR0wsRUFBRXdGLFNBQUYsQ0FBWVUsWUFBZixFQUE0QlYsVUFBVVUsWUFBVixDQUF1QjZMLE1BQXZCLENBQThCOVIsQ0FBOUIsRUFBZ0MsVUFBU0YsQ0FBVCxFQUFXO0FBQUNnQixZQUFFTixPQUFGLENBQVVWLENBQVY7QUFBYSxTQUF6RCxFQUEwREcsQ0FBMUQsRUFBNERXLENBQTVELEVBQThEQyxDQUE5RCxFQUE1QixLQUFpRztBQUFDLGNBQUlFLElBQUVoQixFQUFFK1IsTUFBRixDQUFTOVIsQ0FBVCxFQUFXYSxDQUFYLENBQU4sQ0FBb0IsU0FBT0UsQ0FBUCxHQUFTRCxFQUFFTixPQUFGLENBQVUsRUFBQ3VSLFFBQU9oUixDQUFSLEVBQVVpUixhQUFZLENBQXRCLEVBQVYsQ0FBVCxHQUE2Q2xSLEVBQUVOLE9BQUYsQ0FBVSxFQUFDdVIsUUFBT2hSLENBQVIsRUFBVWlSLGFBQVksQ0FBdEIsRUFBVixDQUE3QztBQUFpRixnQkFBT2xSLEVBQUVKLE9BQVQ7QUFBaUIsT0FBbG1CLEVBQW1tQnVSLE1BQUssY0FBU25TLENBQVQsRUFBVztBQUFDLGVBQU95RixVQUFVVSxZQUFWLENBQXVCZ00sSUFBdkIsQ0FBNEJuUyxDQUE1QixDQUFQO0FBQXNDLE9BQTFwQixFQUEycEJvUyxlQUFjLHVCQUFTblMsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBTSxjQUFZRSxRQUFRNlIsVUFBcEIsSUFBZ0M1TSxVQUFVVSxZQUFWLENBQXVCaU0sYUFBdkIsQ0FBcUNsUyxDQUFyQyxFQUF1Q0QsQ0FBdkMsR0FBMENFLEVBQUVPLE9BQUYsRUFBMUUsSUFBdUZQLEVBQUVRLE1BQUYsQ0FBU1YsQ0FBVCxFQUFXQyxDQUFYLENBQXZGLEVBQXFHQyxFQUFFUyxPQUE3RztBQUFxSCxPQUE1ekIsRUFBNnpCMFIsY0FBYSx3QkFBVTtBQUFDLFlBQUlyUyxJQUFFRCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBTSxjQUFZRSxRQUFRNlIsVUFBcEIsSUFBZ0M1TSxVQUFVVSxZQUFWLENBQXVCbU0sWUFBdkIsSUFBc0NyUyxFQUFFUyxPQUFGLEVBQXRFLElBQW1GVCxFQUFFVSxNQUFGLEVBQW5GLEVBQThGVixFQUFFVyxPQUF0RztBQUE4RyxPQUFuOUIsRUFBbzlCMlIsZUFBYyx1QkFBU3RTLENBQVQsRUFBV0MsQ0FBWCxFQUFhO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU0sY0FBWUUsUUFBUTZSLFVBQXBCLElBQWdDNU0sVUFBVVUsWUFBVixDQUF1Qm9NLGFBQXZCLENBQXFDclMsQ0FBckMsRUFBdUNELENBQXZDLEdBQTBDRSxFQUFFTyxPQUFGLEVBQTFFLElBQXVGUCxFQUFFUSxNQUFGLENBQVNWLENBQVQsRUFBV0MsQ0FBWCxDQUF2RixFQUFxR0MsRUFBRVMsT0FBN0c7QUFBcUgsT0FBcm5DLEVBQXNuQzRSLGNBQWEsd0JBQVU7QUFBQyxZQUFJdlMsSUFBRUQsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU0sY0FBWUUsUUFBUTZSLFVBQXBCLElBQWdDNU0sVUFBVVUsWUFBVixDQUF1QnFNLFlBQXZCLElBQXNDdlMsRUFBRVMsT0FBRixFQUF0RSxJQUFtRlQsRUFBRVUsTUFBRixFQUFuRixFQUE4RlYsRUFBRVcsT0FBdEc7QUFBOEcsT0FBNXdDLEVBQTZ3QzZSLGVBQWMsdUJBQVN4UyxDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFRixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBTSxjQUFZRSxRQUFRNlIsVUFBcEIsSUFBZ0M1TSxVQUFVVSxZQUFWLENBQXVCc00sYUFBdkIsQ0FBcUN4UyxDQUFyQyxHQUF3Q0MsRUFBRVEsT0FBRixFQUF4RSxJQUFxRlIsRUFBRVMsTUFBRixDQUFTVixDQUFULENBQXJGLEVBQWlHQyxFQUFFVSxPQUF6RztBQUFpSCxPQUF4NkMsRUFBTjtBQUFnN0MsR0FBOThDLENBQXpFLENBQWpsMkIsRUFBMm01QmYsUUFBUUMsTUFBUixDQUFlLGlDQUFmLEVBQWlELEVBQWpELEVBQXFEQyxPQUFyRCxDQUE2RCx1QkFBN0QsRUFBcUYsQ0FBQyxJQUFELEVBQU0sVUFBU0MsQ0FBVCxFQUFXO0FBQUMsV0FBTSxFQUFDSyxhQUFZLHVCQUFVO0FBQUMsWUFBSUosSUFBRUQsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9FLFFBQVEyQixPQUFSLENBQWdCdVEsS0FBaEIsQ0FBc0JyUyxXQUF0QixDQUFrQyxVQUFTTCxDQUFULEVBQVc7QUFBQ0EsY0FBRUMsRUFBRVMsT0FBRixFQUFGLEdBQWNULEVBQUVVLE1BQUYsRUFBZDtBQUF5QixTQUF2RSxHQUF5RVYsRUFBRVcsT0FBbEY7QUFBMEYsT0FBbEksRUFBbUkrUixNQUFLLGNBQVMxUyxDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFRixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0UsUUFBUTJCLE9BQVIsQ0FBZ0J1USxLQUFoQixDQUFzQkMsSUFBdEIsQ0FBMkIxUyxDQUEzQixFQUE2QixZQUFVO0FBQUNDLFlBQUVTLE1BQUY7QUFBVyxTQUFuRCxHQUFxRFQsRUFBRVUsT0FBOUQ7QUFBc0UsT0FBMU8sRUFBMk9nUyxVQUFTLGtCQUFTNVMsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQ08sZ0JBQVEyQixPQUFSLENBQWdCdVEsS0FBaEIsQ0FBc0JFLFFBQXRCLENBQStCNVMsQ0FBL0IsRUFBaUNDLENBQWpDO0FBQW9DLE9BQXRTLEVBQU47QUFBOFMsR0FBaFUsQ0FBckYsQ0FBM201QixFQUFtZzZCSixRQUFRQyxNQUFSLENBQWUsNEJBQWYsRUFBNEMsRUFBNUMsRUFBZ0RnRCxRQUFoRCxDQUF5RCxrQkFBekQsRUFBNEUsQ0FBQyxZQUFVO0FBQUMsU0FBSytQLFdBQUwsR0FBaUIsVUFBUzdTLENBQVQsRUFBV0MsQ0FBWCxFQUFhO0FBQUMsV0FBSzZTLEtBQUwsR0FBVzlTLENBQVgsRUFBYSxLQUFLK1MsVUFBTCxHQUFnQjlTLEtBQUcsTUFBaEMsRUFBdUMrUyxzQkFBc0JILFdBQXRCLENBQWtDLEtBQUtDLEtBQXZDLEVBQTZDLEtBQUtDLFVBQWxELENBQXZDO0FBQXFHLEtBQXBJLEVBQXFJLEtBQUtuTyxJQUFMLEdBQVUsQ0FBQyxJQUFELEVBQU0sVUFBUzVFLENBQVQsRUFBVztBQUFDLGFBQU0sRUFBQ2lULE9BQU0sZUFBU2hULENBQVQsRUFBVztBQUFDLGNBQUlDLElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPMFMsc0JBQXNCQyxLQUF0QixDQUE0QmhULENBQTVCLEVBQThCLFVBQVNELENBQVQsRUFBVztBQUFDRSxjQUFFUSxPQUFGLENBQVVWLENBQVY7QUFBYSxXQUF2RCxFQUF3RCxVQUFTQSxDQUFULEVBQVc7QUFBQ0UsY0FBRVMsTUFBRixDQUFTWCxDQUFUO0FBQVksV0FBaEYsR0FBa0ZFLEVBQUVVLE9BQTNGO0FBQW1HLFNBQXRJLEVBQXVJc1MsWUFBVyxvQkFBU2pULENBQVQsRUFBVztBQUFDLGNBQUlDLElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPMFMsc0JBQXNCRSxVQUF0QixDQUFpQ2pULENBQWpDLEVBQW1DLFVBQVNELENBQVQsRUFBVztBQUFDRSxjQUFFUSxPQUFGLENBQVVWLENBQVY7QUFBYSxXQUE1RCxFQUE2RCxVQUFTQSxDQUFULEVBQVc7QUFBQ0UsY0FBRVMsTUFBRixDQUFTWCxDQUFUO0FBQVksV0FBckYsR0FBdUZFLEVBQUVVLE9BQWhHO0FBQXdHLFNBQXRSLEVBQXVSdVMsS0FBSSxhQUFTbFQsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxjQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBTzBTLHNCQUFzQkcsR0FBdEIsQ0FBMEJsVCxDQUExQixFQUE0QkMsQ0FBNUIsRUFBOEIsVUFBU0YsQ0FBVCxFQUFXO0FBQUNHLGNBQUVPLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFdBQXZELEVBQXdELFVBQVNBLENBQVQsRUFBVztBQUFDRyxjQUFFUSxNQUFGLENBQVNYLENBQVQ7QUFBWSxXQUFoRixHQUFrRkcsRUFBRVMsT0FBM0Y7QUFBbUcsU0FBNVosRUFBNlp3UyxnQkFBZSwwQkFBVTtBQUFDLGNBQUluVCxJQUFFRCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBTzBTLHNCQUFzQkksY0FBdEIsQ0FBcUMsVUFBU3BULENBQVQsRUFBVztBQUFDQyxjQUFFUyxPQUFGLENBQVVWLENBQVY7QUFBYSxXQUE5RCxFQUErRCxVQUFTQSxDQUFULEVBQVc7QUFBQ0MsY0FBRVUsTUFBRixDQUFTWCxDQUFUO0FBQVksV0FBdkYsR0FBeUZDLEVBQUVXLE9BQWxHO0FBQTBHLFNBQWpqQixFQUFrakJ5UyxnQkFBZSwwQkFBVTtBQUFDLGNBQUlwVCxJQUFFRCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBTzBTLHNCQUFzQkssY0FBdEIsQ0FBcUMsVUFBU3JULENBQVQsRUFBVztBQUFDQyxjQUFFUyxPQUFGLENBQVVWLENBQVY7QUFBYSxXQUE5RCxFQUErRCxVQUFTQSxDQUFULEVBQVc7QUFBQ0MsY0FBRVUsTUFBRixDQUFTWCxDQUFUO0FBQVksV0FBdkYsR0FBeUZDLEVBQUVXLE9BQWxHO0FBQTBHLFNBQXRzQixFQUF1c0IwUyxRQUFPLGtCQUFVO0FBQUMsY0FBSXJULElBQUVELEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPMFMsc0JBQXNCTSxNQUF0QixDQUE2QixVQUFTdFQsQ0FBVCxFQUFXO0FBQUNDLGNBQUVTLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFdBQXRELEVBQXVELFVBQVNBLENBQVQsRUFBVztBQUFDQyxjQUFFVSxNQUFGLENBQVNYLENBQVQ7QUFBWSxXQUEvRSxHQUFpRkMsRUFBRVcsT0FBMUY7QUFBa0csU0FBMzBCLEVBQU47QUFBbTFCLEtBQXIyQixDQUEvSTtBQUFzL0IsR0FBbGdDLENBQTVFLENBQW5nNkIsRUFBb2w4QmYsUUFBUUMsTUFBUixDQUFlLCtCQUFmLEVBQStDLEVBQS9DLEVBQW1EQyxPQUFuRCxDQUEyRCxxQkFBM0QsRUFBaUYsQ0FBQyxJQUFELEVBQU0sU0FBTixFQUFnQixVQUFTQyxDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFdBQU0sRUFBQ3NULFlBQVcsb0JBQVNyVCxDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRXVULFdBQUYsQ0FBY0QsVUFBZCxDQUF5QnJULENBQXpCLEVBQTJCLFlBQVU7QUFBQ0MsWUFBRU8sT0FBRjtBQUFZLFNBQWxELEVBQW1ELFlBQVU7QUFBQ1AsWUFBRVEsTUFBRjtBQUFXLFNBQXpFLEdBQTJFUixFQUFFUyxPQUFwRjtBQUE0RixPQUFwSSxFQUFxSTZTLGNBQWEsc0JBQVN2VCxDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRXVULFdBQUYsQ0FBY0MsWUFBZCxDQUEyQnZULENBQTNCLEVBQTZCLFlBQVU7QUFBQ0MsWUFBRU8sT0FBRjtBQUFZLFNBQXBELEVBQXFELFlBQVU7QUFBQ1AsWUFBRVEsTUFBRjtBQUFXLFNBQTNFLEdBQTZFUixFQUFFUyxPQUF0RjtBQUE4RixPQUE1USxFQUE2UThTLGNBQWEsd0JBQVU7QUFBQyxZQUFJeFQsSUFBRUYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUV1VCxXQUFGLENBQWNFLFlBQWQsQ0FBMkIsWUFBVTtBQUFDeFQsWUFBRVEsT0FBRjtBQUFZLFNBQWxELEVBQW1ELFlBQVU7QUFBQ1IsWUFBRVMsTUFBRjtBQUFXLFNBQXpFLEdBQTJFVCxFQUFFVSxPQUFwRjtBQUE0RixPQUFqWixFQUFrWitTLFlBQVcsb0JBQVN6VCxDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRXVULFdBQUYsQ0FBY0csVUFBZCxDQUF5QnpULENBQXpCLEVBQTJCLFlBQVU7QUFBQ0MsWUFBRU8sT0FBRjtBQUFZLFNBQWxELEVBQW1ELFlBQVU7QUFBQ1AsWUFBRVEsTUFBRjtBQUFXLFNBQXpFLEdBQTJFUixFQUFFUyxPQUFwRjtBQUE0RixPQUFyaEIsRUFBc2hCZ1QsZ0JBQWUsd0JBQVMxVCxDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFlBQUlXLElBQUVkLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFdVQsV0FBRixDQUFjSSxjQUFkLENBQTZCMVQsQ0FBN0IsRUFBK0JDLENBQS9CLEVBQWlDLFlBQVU7QUFBQ1csWUFBRUosT0FBRjtBQUFZLFNBQXhELEVBQXlELFlBQVU7QUFBQ0ksWUFBRUgsTUFBRjtBQUFXLFNBQS9FLEdBQWlGRyxFQUFFRixPQUExRjtBQUFrRyxPQUFycUIsRUFBc3FCaVQsWUFBVyxzQkFBVTtBQUFDLFlBQUkzVCxJQUFFRixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRXVULFdBQUYsQ0FBY0ssVUFBZCxDQUF5QixZQUFVO0FBQUMzVCxZQUFFUSxPQUFGO0FBQVksU0FBaEQsRUFBaUQsWUFBVTtBQUFDUixZQUFFUyxNQUFGO0FBQVcsU0FBdkUsR0FBeUVULEVBQUVVLE9BQWxGO0FBQTBGLE9BQXR5QixFQUF1eUJrVCxxQkFBb0IsNkJBQVM1VCxDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRXVULFdBQUYsQ0FBY00sbUJBQWQsQ0FBa0M1VCxDQUFsQyxFQUFvQyxZQUFVO0FBQUNDLFlBQUVPLE9BQUY7QUFBWSxTQUEzRCxFQUE0RCxZQUFVO0FBQUNQLFlBQUVRLE1BQUY7QUFBVyxTQUFsRixHQUFvRlIsRUFBRVMsT0FBN0Y7QUFBcUcsT0FBNTdCLEVBQTY3Qm1ULGtCQUFpQiw0QkFBVTtBQUFDLFlBQUk3VCxJQUFFRixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRXVULFdBQUYsQ0FBY08sZ0JBQWQsQ0FBK0IsWUFBVTtBQUFDN1QsWUFBRVEsT0FBRjtBQUFZLFNBQXRELEVBQXVELFlBQVU7QUFDdHcrQlIsWUFBRVMsTUFBRjtBQUFXLFNBRDByK0IsR0FDeHIrQlQsRUFBRVUsT0FEK3ErQjtBQUN2cStCLE9BRDhyOEIsRUFBTjtBQUN0cjhCLEdBRHdwOEIsQ0FBakYsQ0FBcGw4QixFQUNnQmYsUUFBUUMsTUFBUixDQUFlLHdCQUFmLEVBQXdDLEVBQXhDLEVBQTRDa1UsUUFBNUMsQ0FBcUQsbUJBQXJELEVBQXlFLEVBQUMsR0FBRSxlQUFILEVBQW1CLEdBQUUsY0FBckIsRUFBb0MsR0FBRSxXQUF0QyxFQUFrRCxHQUFFLGtCQUFwRCxFQUF1RSxHQUFFLGNBQXpFLEVBQXdGLEdBQUUsNkJBQTFGLEVBQXdILEdBQUUsbUJBQTFILEVBQThJLEdBQUUsWUFBaEosRUFBNkosR0FBRSwwQkFBL0osRUFBMEwsSUFBRyxvQkFBN0wsRUFBa04sSUFBRyxtQkFBck4sRUFBeU8sSUFBRyxpQkFBNU8sRUFBekUsRUFBeVVsUixRQUF6VSxDQUFrVixjQUFsVixFQUFpVyxDQUFDLFlBQVU7QUFBQyxTQUFLOEIsSUFBTCxHQUFVLENBQUMsSUFBRCxFQUFNLFNBQU4sRUFBZ0IsbUJBQWhCLEVBQW9DLFVBQVM1RSxDQUFULEVBQVdDLENBQVgsRUFBYUMsQ0FBYixFQUFlO0FBQUMsYUFBTSxFQUFDK1Qsa0JBQWlCLDRCQUFVO0FBQUMsY0FBSWhVLElBQUVELEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPRSxRQUFRMFQsSUFBUixDQUFhLFVBQVNsVSxDQUFULEVBQVc7QUFBQ0MsY0FBRVMsT0FBRixDQUFVVixDQUFWO0FBQWEsV0FBdEMsRUFBdUMsVUFBU0EsQ0FBVCxFQUFXO0FBQUNDLGNBQUVVLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFdBQS9ELEVBQWdFLE1BQWhFLEVBQXVFLGtCQUF2RSxFQUEwRixFQUExRixHQUE4RkMsRUFBRVcsT0FBdkc7QUFBK0csU0FBNUosRUFBNkp1VCxVQUFTLGtCQUFTaFUsQ0FBVCxFQUFXVyxDQUFYLEVBQWE7QUFBQyxjQUFJQyxJQUFFZixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsTUFBTThULElBQU4sQ0FBV3RULENBQVgsS0FBZUMsRUFBRUosTUFBRixDQUFTLCtCQUFULENBQWYsQ0FBeUQsSUFBRztBQUFDLGdCQUFJSyxJQUFFYixJQUFFVyxDQUFSLENBQVViLEVBQUVvVSx5QkFBRixDQUE0QnJULENBQTVCLEVBQThCLFVBQVNoQixDQUFULEVBQVc7QUFBQ0EsZ0JBQUVzVSxXQUFGLEtBQWdCLENBQUMsQ0FBakIsR0FBbUJ2VCxFQUFFTCxPQUFGLENBQVVWLENBQVYsQ0FBbkIsR0FBZ0NlLEVBQUVKLE1BQUYsQ0FBUyxFQUFDNFQsTUFBSyxFQUFOLEVBQVNqUSxTQUFRLDBCQUFqQixFQUFULENBQWhDO0FBQXVGLGFBQWpJLEVBQWtJLFVBQVN0RSxDQUFULEVBQVc7QUFBQ0EsZ0JBQUVzRSxPQUFGLEdBQVVwRSxFQUFFRixFQUFFdVUsSUFBSixDQUFWLEVBQW9CeFQsRUFBRUosTUFBRixDQUFTWCxDQUFULENBQXBCO0FBQWdDLGFBQTlLO0FBQWdMLFdBQTlMLENBQThMLE9BQU1pQixDQUFOLEVBQVE7QUFBQ0EsY0FBRXFELE9BQUYsR0FBVXBFLEVBQUVlLEVBQUVzVCxJQUFKLENBQVYsRUFBb0J4VCxFQUFFSixNQUFGLENBQVNNLENBQVQsQ0FBcEI7QUFBZ0Msa0JBQU9GLEVBQUVILE9BQVQ7QUFBaUIsU0FBcmYsRUFBc2Y0VCxXQUFVLG1CQUFTclUsQ0FBVCxFQUFXVyxDQUFYLEVBQWE7QUFBQyxjQUFJQyxJQUFFZixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsTUFBTThULElBQU4sQ0FBV3RULENBQVgsS0FBZUMsRUFBRUosTUFBRixDQUFTLCtCQUFULENBQWYsQ0FBeUQsSUFBRztBQUFDLGdCQUFJSyxJQUFFYixJQUFFVyxDQUFSLENBQVViLEVBQUVvVSx5QkFBRixDQUE0QnJULENBQTVCLEVBQThCLFVBQVNoQixDQUFULEVBQVc7QUFBQ0EsZ0JBQUV5VSxNQUFGLEtBQVcsQ0FBQyxDQUFaLEdBQWMxVCxFQUFFTCxPQUFGLENBQVVWLENBQVYsQ0FBZCxHQUEyQmUsRUFBRUosTUFBRixDQUFTLEVBQUM0VCxNQUFLLEVBQU4sRUFBU2pRLFNBQVEscUJBQWpCLEVBQVQsQ0FBM0I7QUFBNkUsYUFBdkgsRUFBd0gsVUFBU3RFLENBQVQsRUFBVztBQUFDQSxnQkFBRXNFLE9BQUYsR0FBVXBFLEVBQUVGLEVBQUV1VSxJQUFKLENBQVYsRUFBb0J4VCxFQUFFSixNQUFGLENBQVNYLENBQVQsQ0FBcEI7QUFBZ0MsYUFBcEs7QUFBc0ssV0FBcEwsQ0FBb0wsT0FBTWlCLENBQU4sRUFBUTtBQUFDQSxjQUFFcUQsT0FBRixHQUFVcEUsRUFBRWUsRUFBRXNULElBQUosQ0FBVixFQUFvQnhULEVBQUVKLE1BQUYsQ0FBU00sQ0FBVCxDQUFwQjtBQUFnQyxrQkFBT0YsRUFBRUgsT0FBVDtBQUFpQixTQUFyMEIsRUFBczBCOFQsV0FBVSxtQkFBU3ZVLENBQVQsRUFBV1csQ0FBWCxFQUFhQyxDQUFiLEVBQWU7QUFBQyxjQUFJQyxJQUFFaEIsRUFBRU0sS0FBRixFQUFOLENBQWdCLE1BQU04VCxJQUFOLENBQVd0VCxDQUFYLEtBQWVFLEVBQUVMLE1BQUYsQ0FBUywrQkFBVCxDQUFmLEVBQXlESSxJQUFFQSxJQUFFLENBQUMsQ0FBSCxHQUFLLENBQUMsQ0FBakUsQ0FBbUUsSUFBSUUsSUFBRSxFQUFDME8sUUFBTyxDQUFDLENBQVQsRUFBV2dGLFdBQVU1VCxDQUFyQixFQUFOLENBQThCLElBQUc7QUFBQ2QsY0FBRW9VLHlCQUFGLENBQTRCbFUsQ0FBNUIsRUFBOEIsVUFBU0gsQ0FBVCxFQUFXO0FBQUNBLGdCQUFFNFUsWUFBRixDQUFlOVQsQ0FBZixFQUFpQkcsQ0FBakIsRUFBbUIsVUFBU2pCLENBQVQsRUFBVztBQUFDZ0Isa0JBQUVOLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLGVBQTVDLEVBQTZDLFVBQVNBLENBQVQsRUFBVztBQUFDQSxrQkFBRXNFLE9BQUYsR0FBVXBFLEVBQUVGLEVBQUV1VSxJQUFKLENBQVYsRUFBb0J2VCxFQUFFTCxNQUFGLENBQVNYLENBQVQsQ0FBcEI7QUFBZ0MsZUFBekY7QUFBMkYsYUFBckksRUFBc0ksVUFBU0EsQ0FBVCxFQUFXO0FBQUNBLGdCQUFFc0UsT0FBRixHQUFVcEUsRUFBRUYsRUFBRXVVLElBQUosQ0FBVixFQUFvQnZULEVBQUVMLE1BQUYsQ0FBU1gsQ0FBVCxDQUFwQjtBQUFnQyxhQUFsTDtBQUFvTCxXQUF4TCxDQUF3TCxPQUFNa0IsQ0FBTixFQUFRO0FBQUNBLGNBQUVvRCxPQUFGLEdBQVVwRSxFQUFFZ0IsRUFBRXFULElBQUosQ0FBVixFQUFvQnZULEVBQUVMLE1BQUYsQ0FBU08sQ0FBVCxDQUFwQjtBQUFnQyxrQkFBT0YsRUFBRUosT0FBVDtBQUFpQixTQUFuc0MsRUFBb3NDaVUsWUFBVyxvQkFBUzFVLENBQVQsRUFBV1csQ0FBWCxFQUFhQyxDQUFiLEVBQWU7QUFBQyxjQUFJQyxJQUFFaEIsRUFBRU0sS0FBRixFQUFOLENBQWdCLE1BQU04VCxJQUFOLENBQVd0VCxDQUFYLEtBQWVFLEVBQUVMLE1BQUYsQ0FBUywrQkFBVCxDQUFmLEVBQXlESSxJQUFFQSxJQUFFLENBQUMsQ0FBSCxHQUFLLENBQUMsQ0FBakUsQ0FBbUUsSUFBSUUsSUFBRSxFQUFDME8sUUFBTyxDQUFDLENBQVQsRUFBV2dGLFdBQVU1VCxDQUFyQixFQUFOLENBQThCLElBQUc7QUFBQ2QsY0FBRW9VLHlCQUFGLENBQTRCbFUsQ0FBNUIsRUFBOEIsVUFBU0gsQ0FBVCxFQUFXO0FBQUNBLGdCQUFFOFUsT0FBRixDQUFVaFUsQ0FBVixFQUFZRyxDQUFaLEVBQWMsVUFBU2pCLENBQVQsRUFBVztBQUFDZ0Isa0JBQUVOLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLGVBQXZDLEVBQXdDLFVBQVNBLENBQVQsRUFBVztBQUFDQSxrQkFBRXNFLE9BQUYsR0FBVXBFLEVBQUVGLEVBQUV1VSxJQUFKLENBQVYsRUFBb0J2VCxFQUFFTCxNQUFGLENBQVNYLENBQVQsQ0FBcEI7QUFBZ0MsZUFBcEY7QUFBc0YsYUFBaEksRUFBaUksVUFBU0EsQ0FBVCxFQUFXO0FBQUNBLGdCQUFFc0UsT0FBRixHQUFVcEUsRUFBRUYsRUFBRXVVLElBQUosQ0FBVixFQUFvQnZULEVBQUVMLE1BQUYsQ0FBU1gsQ0FBVCxDQUFwQjtBQUFnQyxhQUE3SztBQUErSyxXQUFuTCxDQUFtTCxPQUFNa0IsQ0FBTixFQUFRO0FBQUNBLGNBQUVvRCxPQUFGLEdBQVVwRSxFQUFFZ0IsRUFBRXFULElBQUosQ0FBVixFQUFvQnZULEVBQUVMLE1BQUYsQ0FBU08sQ0FBVCxDQUFwQjtBQUFnQyxrQkFBT0YsRUFBRUosT0FBVDtBQUFpQixTQUE3akQsRUFBOGpEbVUsV0FBVSxtQkFBUzVVLENBQVQsRUFBV1csQ0FBWCxFQUFhO0FBQUMsY0FBSUMsSUFBRWYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE1BQU04VCxJQUFOLENBQVd0VCxDQUFYLEtBQWVDLEVBQUVKLE1BQUYsQ0FBUywrQkFBVCxDQUFmLENBQXlELElBQUc7QUFBQ1YsY0FBRW9VLHlCQUFGLENBQTRCbFUsQ0FBNUIsRUFBOEIsVUFBU0gsQ0FBVCxFQUFXO0FBQUNBLGdCQUFFNFUsWUFBRixDQUFlOVQsQ0FBZixFQUFpQixFQUFDNk8sUUFBTyxDQUFDLENBQVQsRUFBakIsRUFBNkIsVUFBUzNQLENBQVQsRUFBVztBQUFDQSxrQkFBRTRQLE1BQUYsQ0FBUyxZQUFVO0FBQUM3TyxvQkFBRUwsT0FBRixDQUFVLEVBQUNzVSxTQUFRLENBQUMsQ0FBVixFQUFZQyxhQUFZalYsQ0FBeEIsRUFBVjtBQUFzQyxpQkFBMUQsRUFBMkQsVUFBU0EsQ0FBVCxFQUFXO0FBQUNBLG9CQUFFc0UsT0FBRixHQUFVcEUsRUFBRUYsRUFBRXVVLElBQUosQ0FBVixFQUFvQnhULEVBQUVKLE1BQUYsQ0FBU1gsQ0FBVCxDQUFwQjtBQUFnQyxpQkFBdkc7QUFBeUcsZUFBbEosRUFBbUosVUFBU0EsQ0FBVCxFQUFXO0FBQUNBLGtCQUFFc0UsT0FBRixHQUFVcEUsRUFBRUYsRUFBRXVVLElBQUosQ0FBVixFQUFvQnhULEVBQUVKLE1BQUYsQ0FBU1gsQ0FBVCxDQUFwQjtBQUFnQyxlQUEvTDtBQUFpTSxhQUEzTyxFQUE0TyxVQUFTQSxDQUFULEVBQVc7QUFBQ0EsZ0JBQUVzRSxPQUFGLEdBQVVwRSxFQUFFRixFQUFFdVUsSUFBSixDQUFWLEVBQW9CeFQsRUFBRUosTUFBRixDQUFTWCxDQUFULENBQXBCO0FBQWdDLGFBQXhSO0FBQTBSLFdBQTlSLENBQThSLE9BQU1nQixDQUFOLEVBQVE7QUFBQ0EsY0FBRXNELE9BQUYsR0FBVXBFLEVBQUVjLEVBQUV1VCxJQUFKLENBQVYsRUFBb0J4VCxFQUFFSixNQUFGLENBQVNLLENBQVQsQ0FBcEI7QUFBZ0Msa0JBQU9ELEVBQUVILE9BQVQ7QUFBaUIsU0FBdi9ELEVBQXcvRHNVLFlBQVcsb0JBQVMvVSxDQUFULEVBQVdXLENBQVgsRUFBYTtBQUFDLGNBQUlDLElBQUVmLEVBQUVNLEtBQUYsRUFBTixDQUFnQixNQUFNOFQsSUFBTixDQUFXdFQsQ0FBWCxLQUFlQyxFQUFFSixNQUFGLENBQVMsK0JBQVQsQ0FBZixDQUF5RCxJQUFHO0FBQUNWLGNBQUVvVSx5QkFBRixDQUE0QmxVLENBQTVCLEVBQThCLFVBQVNILENBQVQsRUFBVztBQUFDQSxnQkFBRThVLE9BQUYsQ0FBVWhVLENBQVYsRUFBWSxFQUFDNk8sUUFBTyxDQUFDLENBQVQsRUFBWixFQUF3QixVQUFTM1AsQ0FBVCxFQUFXO0FBQUNBLGtCQUFFNFAsTUFBRixDQUFTLFlBQVU7QUFBQzdPLG9CQUFFTCxPQUFGLENBQVUsRUFBQ3NVLFNBQVEsQ0FBQyxDQUFWLEVBQVlDLGFBQVlqVixDQUF4QixFQUFWO0FBQXNDLGlCQUExRCxFQUEyRCxVQUFTQSxDQUFULEVBQVc7QUFBQ0Esb0JBQUVzRSxPQUFGLEdBQVVwRSxFQUFFRixFQUFFdVUsSUFBSixDQUFWLEVBQW9CeFQsRUFBRUosTUFBRixDQUFTWCxDQUFULENBQXBCO0FBQWdDLGlCQUF2RztBQUF5RyxlQUE3SSxFQUE4SSxVQUFTQSxDQUFULEVBQVc7QUFBQ0Esa0JBQUVzRSxPQUFGLEdBQVVwRSxFQUFFRixFQUFFdVUsSUFBSixDQUFWLEVBQW9CeFQsRUFBRUosTUFBRixDQUFTWCxDQUFULENBQXBCO0FBQWdDLGVBQTFMO0FBQTRMLGFBQXRPLEVBQXVPLFVBQVNBLENBQVQsRUFBVztBQUFDQSxnQkFBRXNFLE9BQUYsR0FBVXBFLEVBQUVGLEVBQUV1VSxJQUFKLENBQVYsRUFBb0J4VCxFQUFFSixNQUFGLENBQVNYLENBQVQsQ0FBcEI7QUFBZ0MsYUFBblI7QUFBcVIsV0FBelIsQ0FBeVIsT0FBTWdCLENBQU4sRUFBUTtBQUFDQSxjQUFFc0QsT0FBRixHQUFVcEUsRUFBRWMsRUFBRXVULElBQUosQ0FBVixFQUFvQnhULEVBQUVKLE1BQUYsQ0FBU0ssQ0FBVCxDQUFwQjtBQUFnQyxrQkFBT0QsRUFBRUgsT0FBVDtBQUFpQixTQUE3NkUsRUFBODZFdVUsbUJBQWtCLDJCQUFTaFYsQ0FBVCxFQUFXVyxDQUFYLEVBQWE7QUFBQyxjQUFJQyxJQUFFZixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsTUFBTThULElBQU4sQ0FBV3RULENBQVgsS0FBZUMsRUFBRUosTUFBRixDQUFTLCtCQUFULENBQWYsQ0FBeUQsSUFBRztBQUFDVixjQUFFb1UseUJBQUYsQ0FBNEJsVSxDQUE1QixFQUE4QixVQUFTSCxDQUFULEVBQVc7QUFBQ0EsZ0JBQUU0VSxZQUFGLENBQWU5VCxDQUFmLEVBQWlCLEVBQUM2TyxRQUFPLENBQUMsQ0FBVCxFQUFqQixFQUE2QixVQUFTM1AsQ0FBVCxFQUFXO0FBQUNBLGtCQUFFbVYsaUJBQUYsQ0FBb0IsWUFBVTtBQUFDcFUsb0JBQUVMLE9BQUYsQ0FBVSxFQUFDc1UsU0FBUSxDQUFDLENBQVYsRUFBWUMsYUFBWWpWLENBQXhCLEVBQVY7QUFBc0MsaUJBQXJFLEVBQXNFLFVBQVNBLENBQVQsRUFBVztBQUFDQSxvQkFBRXNFLE9BQUYsR0FBVXBFLEVBQUVGLEVBQUV1VSxJQUFKLENBQVYsRUFBb0J4VCxFQUFFSixNQUFGLENBQVNYLENBQVQsQ0FBcEI7QUFBZ0MsaUJBQWxIO0FBQW9ILGVBQTdKLEVBQThKLFVBQVNBLENBQVQsRUFBVztBQUFDQSxrQkFBRXNFLE9BQUYsR0FBVXBFLEVBQUVGLEVBQUV1VSxJQUFKLENBQVYsRUFBb0J4VCxFQUFFSixNQUFGLENBQVNYLENBQVQsQ0FBcEI7QUFBZ0MsZUFBMU07QUFBNE0sYUFBdFAsRUFBdVAsVUFBU0EsQ0FBVCxFQUFXO0FBQUNBLGdCQUFFc0UsT0FBRixHQUFVcEUsRUFBRUYsRUFBRXVVLElBQUosQ0FBVixFQUFvQnhULEVBQUVKLE1BQUYsQ0FBU1gsQ0FBVCxDQUFwQjtBQUFnQyxhQUFuUztBQUFxUyxXQUF6UyxDQUF5UyxPQUFNZ0IsQ0FBTixFQUFRO0FBQUNBLGNBQUVzRCxPQUFGLEdBQVVwRSxFQUFFYyxFQUFFdVQsSUFBSixDQUFWLEVBQW9CeFQsRUFBRUosTUFBRixDQUFTSyxDQUFULENBQXBCO0FBQWdDLGtCQUFPRCxFQUFFSCxPQUFUO0FBQWlCLFNBQTEzRixFQUEyM0Z3VSxXQUFVLG1CQUFTalYsQ0FBVCxFQUFXVyxDQUFYLEVBQWFDLENBQWIsRUFBZUMsQ0FBZixFQUFpQjtBQUFDLGNBQUlDLElBQUVqQixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsTUFBTThULElBQU4sQ0FBV3RULENBQVgsS0FBZUcsRUFBRU4sTUFBRixDQUFTLCtCQUFULENBQWYsRUFBeURLLElBQUVBLElBQUUsQ0FBQyxDQUFILEdBQUssQ0FBQyxDQUFqRSxDQUFtRSxJQUFJRSxJQUFFLEVBQUN5TyxRQUFPLENBQUMsQ0FBVCxFQUFXZ0YsV0FBVTNULENBQXJCLEVBQU4sQ0FBOEIsSUFBRztBQUFDZixjQUFFb1UseUJBQUYsQ0FBNEJsVSxDQUE1QixFQUE4QixVQUFTSCxDQUFULEVBQVc7QUFBQ0EsZ0JBQUU4VSxPQUFGLENBQVVoVSxDQUFWLEVBQVlJLENBQVosRUFBYyxVQUFTbEIsQ0FBVCxFQUFXO0FBQUNBLGtCQUFFcVYsWUFBRixDQUFlLFVBQVNyVixDQUFULEVBQVc7QUFBQ2tCLG9CQUFFb1UsTUFBRixLQUFXLENBQUMsQ0FBWixJQUFldFYsRUFBRXVWLElBQUYsQ0FBT3ZWLEVBQUVrUCxNQUFULENBQWYsRUFBZ0NoTyxFQUFFc1UsUUFBRixJQUFZeFYsRUFBRXdWLFFBQUYsQ0FBV3RVLEVBQUVzVSxRQUFiLENBQTVDLEVBQW1FeFYsRUFBRXlWLFVBQUYsR0FBYSxVQUFTelYsQ0FBVCxFQUFXO0FBQUMseUJBQUswVixLQUFMLEdBQVd6VSxFQUFFTixNQUFGLENBQVMsS0FBSytVLEtBQWQsQ0FBWCxHQUFnQ3pVLEVBQUVQLE9BQUYsQ0FBVVYsQ0FBVixDQUFoQztBQUE2QyxtQkFBekksRUFBMElBLEVBQUV1SyxLQUFGLENBQVF4SixDQUFSLENBQTFJLEVBQXFKRSxFQUFFTCxPQUFGLENBQVUrVSxLQUFWLEdBQWdCLFlBQVU7QUFBQzNWLHNCQUFFMlYsS0FBRjtBQUFVLG1CQUExTDtBQUEyTCxpQkFBdE47QUFBd04sZUFBbFAsRUFBbVAsVUFBUzNWLENBQVQsRUFBVztBQUFDQSxrQkFBRXNFLE9BQUYsR0FBVXBFLEVBQUVGLEVBQUV1VSxJQUFKLENBQVYsRUFBb0J0VCxFQUFFTixNQUFGLENBQVNYLENBQVQsQ0FBcEI7QUFBZ0MsZUFBL1I7QUFBaVMsYUFBM1UsRUFBNFUsVUFBU0EsQ0FBVCxFQUFXO0FBQUNBLGdCQUFFc0UsT0FBRixHQUFVcEUsRUFBRUYsRUFBRXVVLElBQUosQ0FBVixFQUFvQnRULEVBQUVOLE1BQUYsQ0FBU1gsQ0FBVCxDQUFwQjtBQUFnQyxhQUF4WDtBQUEwWCxXQUE5WCxDQUE4WCxPQUFNbUIsQ0FBTixFQUFRO0FBQUNBLGNBQUVtRCxPQUFGLEdBQVVwRSxFQUFFaUIsRUFBRW9ULElBQUosQ0FBVixFQUFvQnRULEVBQUVOLE1BQUYsQ0FBU1EsQ0FBVCxDQUFwQjtBQUFnQyxrQkFBT0YsRUFBRUwsT0FBVDtBQUFpQixTQUFoOEcsRUFBaThHZ1YsbUJBQWtCLDJCQUFTelYsQ0FBVCxFQUFXVyxDQUFYLEVBQWFDLENBQWIsRUFBZTtBQUFDLGNBQUlDLElBQUVoQixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsTUFBTThULElBQU4sQ0FBV3RULENBQVgsS0FBZUUsRUFBRUwsTUFBRixDQUFTLCtCQUFULENBQWYsQ0FBeUQsSUFBRztBQUFDVixjQUFFb1UseUJBQUYsQ0FBNEJsVSxDQUE1QixFQUE4QixVQUFTSCxDQUFULEVBQVc7QUFBQ0EsZ0JBQUU4VSxPQUFGLENBQVVoVSxDQUFWLEVBQVksRUFBQzZPLFFBQU8sQ0FBQyxDQUFULEVBQVosRUFBd0IsVUFBUzNQLENBQVQsRUFBVztBQUFDQSxrQkFBRXFWLFlBQUYsQ0FBZSxVQUFTclYsQ0FBVCxFQUFXO0FBQUNBLG9CQUFFdVYsSUFBRixDQUFPdlYsRUFBRWtQLE1BQVQsR0FBaUJsUCxFQUFFeVYsVUFBRixHQUFhLFVBQVN6VixDQUFULEVBQVc7QUFBQyx5QkFBSzBWLEtBQUwsR0FBVzFVLEVBQUVMLE1BQUYsQ0FBUyxLQUFLK1UsS0FBZCxDQUFYLEdBQWdDMVUsRUFBRU4sT0FBRixDQUFVVixDQUFWLENBQWhDO0FBQTZDLG1CQUF2RixFQUF3RkEsRUFBRXVLLEtBQUYsQ0FBUXhKLENBQVIsQ0FBeEYsRUFBbUdDLEVBQUVKLE9BQUYsQ0FBVStVLEtBQVYsR0FBZ0IsWUFBVTtBQUFDM1Ysc0JBQUUyVixLQUFGO0FBQVUsbUJBQXhJO0FBQXlJLGlCQUFwSztBQUFzSyxlQUExTSxFQUEyTSxVQUFTM1YsQ0FBVCxFQUFXO0FBQUNBLGtCQUFFc0UsT0FBRixHQUFVcEUsRUFBRUYsRUFBRXVVLElBQUosQ0FBVixFQUFvQnZULEVBQUVMLE1BQUYsQ0FBU1gsQ0FBVCxDQUFwQjtBQUFnQyxlQUF2UDtBQUF5UCxhQUFuUyxFQUFvUyxVQUFTQSxDQUFULEVBQVc7QUFBQ0EsZ0JBQUVzRSxPQUFGLEdBQVVwRSxFQUFFRixFQUFFdVUsSUFBSixDQUFWLEVBQW9CdlQsRUFBRUwsTUFBRixDQUFTWCxDQUFULENBQXBCO0FBQWdDLGFBQWhWO0FBQWtWLFdBQXRWLENBQXNWLE9BQU1pQixDQUFOLEVBQVE7QUFBQ0EsY0FBRXFELE9BQUYsR0FBVXBFLEVBQUVlLEVBQUVzVCxJQUFKLENBQVYsRUFBb0J2VCxFQUFFTCxNQUFGLENBQVNNLENBQVQsQ0FBcEI7QUFBZ0Msa0JBQU9ELEVBQUVKLE9BQVQ7QUFBaUIsU0FBNTdILEVBQTY3SGlWLFlBQVcsb0JBQVMxVixDQUFULEVBQVdXLENBQVgsRUFBYTtBQUFDLGNBQUlDLElBQUVmLEVBQUVNLEtBQUYsRUFBTixDQUFnQixNQUFNOFQsSUFBTixDQUFXdFQsQ0FBWCxLQUFlQyxFQUFFSixNQUFGLENBQVMsK0JBQVQsQ0FBZixDQUF5RCxJQUFHO0FBQUNWLGNBQUVvVSx5QkFBRixDQUE0QmxVLENBQTVCLEVBQThCLFVBQVNILENBQVQsRUFBVztBQUFDQSxnQkFBRThVLE9BQUYsQ0FBVWhVLENBQVYsRUFBWSxFQUFDNk8sUUFBTyxDQUFDLENBQVQsRUFBWixFQUF3QixVQUFTM1AsQ0FBVCxFQUFXO0FBQUNBLGtCQUFFOFYsSUFBRixDQUFPLFVBQVM5VixDQUFULEVBQVc7QUFBQyxzQkFBSUMsSUFBRSxJQUFJOFYsVUFBSixFQUFOLENBQXFCOVYsRUFBRStWLFNBQUYsR0FBWSxVQUFTaFcsQ0FBVCxFQUFXO0FBQUMseUJBQUssQ0FBTCxLQUFTQSxFQUFFaVcsTUFBRixDQUFTQyxNQUFsQixJQUEwQixTQUFPbFcsRUFBRWlXLE1BQUYsQ0FBU0MsTUFBMUMsR0FBaURuVixFQUFFTCxPQUFGLENBQVVWLEVBQUVpVyxNQUFGLENBQVNDLE1BQW5CLENBQWpELEdBQTRFLEtBQUssQ0FBTCxLQUFTbFcsRUFBRWlXLE1BQUYsQ0FBU1AsS0FBbEIsSUFBeUIsU0FBTzFWLEVBQUVpVyxNQUFGLENBQVNQLEtBQXpDLEdBQStDM1UsRUFBRUosTUFBRixDQUFTWCxFQUFFaVcsTUFBRixDQUFTUCxLQUFsQixDQUEvQyxHQUF3RTNVLEVBQUVKLE1BQUYsQ0FBUyxFQUFDNFQsTUFBSyxJQUFOLEVBQVdqUSxTQUFRLHNCQUFuQixFQUFULENBQXBKO0FBQXlNLG1CQUFqTyxFQUFrT3JFLEVBQUU0VixVQUFGLENBQWE3VixDQUFiLENBQWxPO0FBQWtQLGlCQUExUjtBQUE0UixlQUFoVSxFQUFpVSxVQUFTQSxDQUFULEVBQVc7QUFBQ0Esa0JBQUVzRSxPQUFGLEdBQVVwRSxFQUFFRixFQUFFdVUsSUFBSixDQUFWLEVBQW9CeFQsRUFBRUosTUFBRixDQUFTWCxDQUFULENBQXBCO0FBQWdDLGVBQTdXO0FBQStXLGFBQXpaLEVBQTBaLFVBQVNBLENBQVQsRUFBVztBQUFDQSxnQkFBRXNFLE9BQUYsR0FBVXBFLEVBQUVGLEVBQUV1VSxJQUFKLENBQVYsRUFBb0J4VCxFQUFFSixNQUFGLENBQVNYLENBQVQsQ0FBcEI7QUFBZ0MsYUFBdGM7QUFBd2MsV0FBNWMsQ0FBNGMsT0FBTWdCLENBQU4sRUFBUTtBQUFDQSxjQUFFc0QsT0FBRixHQUFVcEUsRUFBRWMsRUFBRXVULElBQUosQ0FBVixFQUFvQnhULEVBQUVKLE1BQUYsQ0FBU0ssQ0FBVCxDQUFwQjtBQUFnQyxrQkFBT0QsRUFBRUgsT0FBVDtBQUFpQixTQUFyaUosRUFBc2lKdVYsZUFBYyx1QkFBU2hXLENBQVQsRUFBV1csQ0FBWCxFQUFhO0FBQUMsY0FBSUMsSUFBRWYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE1BQU04VCxJQUFOLENBQVd0VCxDQUFYLEtBQWVDLEVBQUVKLE1BQUYsQ0FBUywrQkFBVCxDQUFmLENBQXlELElBQUc7QUFBQ1YsY0FBRW9VLHlCQUFGLENBQTRCbFUsQ0FBNUIsRUFBOEIsVUFBU0gsQ0FBVCxFQUFXO0FBQUNBLGdCQUFFOFUsT0FBRixDQUFVaFUsQ0FBVixFQUFZLEVBQUM2TyxRQUFPLENBQUMsQ0FBVCxFQUFaLEVBQXdCLFVBQVMzUCxDQUFULEVBQVc7QUFBQ0Esa0JBQUU4VixJQUFGLENBQU8sVUFBUzlWLENBQVQsRUFBVztBQUFDLHNCQUFJQyxJQUFFLElBQUk4VixVQUFKLEVBQU4sQ0FBcUI5VixFQUFFK1YsU0FBRixHQUFZLFVBQVNoVyxDQUFULEVBQVc7QUFBQyx5QkFBSyxDQUFMLEtBQVNBLEVBQUVpVyxNQUFGLENBQVNDLE1BQWxCLElBQTBCLFNBQU9sVyxFQUFFaVcsTUFBRixDQUFTQyxNQUExQyxHQUFpRG5WLEVBQUVMLE9BQUYsQ0FBVVYsRUFBRWlXLE1BQUYsQ0FBU0MsTUFBbkIsQ0FBakQsR0FBNEUsS0FBSyxDQUFMLEtBQVNsVyxFQUFFaVcsTUFBRixDQUFTUCxLQUFsQixJQUF5QixTQUFPMVYsRUFBRWlXLE1BQUYsQ0FBU1AsS0FBekMsR0FBK0MzVSxFQUFFSixNQUFGLENBQVNYLEVBQUVpVyxNQUFGLENBQVNQLEtBQWxCLENBQS9DLEdBQXdFM1UsRUFBRUosTUFBRixDQUFTLEVBQUM0VCxNQUFLLElBQU4sRUFBV2pRLFNBQVEsc0JBQW5CLEVBQVQsQ0FBcEo7QUFBeU0sbUJBQWpPLEVBQWtPckUsRUFBRWtXLGFBQUYsQ0FBZ0JuVyxDQUFoQixDQUFsTztBQUFxUCxpQkFBN1I7QUFBK1IsZUFBblUsRUFBb1UsVUFBU0EsQ0FBVCxFQUFXO0FBQUNBLGtCQUFFc0UsT0FBRixHQUFVcEUsRUFBRUYsRUFBRXVVLElBQUosQ0FBVixFQUFvQnhULEVBQUVKLE1BQUYsQ0FBU1gsQ0FBVCxDQUFwQjtBQUFnQyxlQUFoWDtBQUFrWCxhQUE1WixFQUE2WixVQUFTQSxDQUFULEVBQVc7QUFBQ0EsZ0JBQUVzRSxPQUFGLEdBQVVwRSxFQUFFRixFQUFFdVUsSUFBSixDQUFWLEVBQW9CeFQsRUFBRUosTUFBRixDQUFTWCxDQUFULENBQXBCO0FBQWdDLGFBQXpjO0FBQTJjLFdBQS9jLENBQStjLE9BQU1nQixDQUFOLEVBQVE7QUFBQ0EsY0FBRXNELE9BQUYsR0FBVXBFLEVBQUVjLEVBQUV1VCxJQUFKLENBQVYsRUFBb0J4VCxFQUFFSixNQUFGLENBQVNLLENBQVQsQ0FBcEI7QUFBZ0Msa0JBQU9ELEVBQUVILE9BQVQ7QUFBaUIsU0FBcHBLLEVBQXFwS3dWLG9CQUFtQiw0QkFBU2pXLENBQVQsRUFBV1csQ0FBWCxFQUFhO0FBQUMsY0FBSUMsSUFBRWYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE1BQU04VCxJQUFOLENBQVd0VCxDQUFYLEtBQWVDLEVBQUVKLE1BQUYsQ0FBUywrQkFBVCxDQUFmLENBQXlELElBQUc7QUFBQ1YsY0FBRW9VLHlCQUFGLENBQTRCbFUsQ0FBNUIsRUFBOEIsVUFBU0gsQ0FBVCxFQUFXO0FBQUNBLGdCQUFFOFUsT0FBRixDQUFVaFUsQ0FBVixFQUFZLEVBQUM2TyxRQUFPLENBQUMsQ0FBVCxFQUFaLEVBQXdCLFVBQVMzUCxDQUFULEVBQVc7QUFBQ0Esa0JBQUU4VixJQUFGLENBQU8sVUFBUzlWLENBQVQsRUFBVztBQUFDLHNCQUFJQyxJQUFFLElBQUk4VixVQUFKLEVBQU4sQ0FBcUI5VixFQUFFK1YsU0FBRixHQUFZLFVBQVNoVyxDQUFULEVBQVc7QUFBQyx5QkFBSyxDQUFMLEtBQVNBLEVBQUVpVyxNQUFGLENBQVNDLE1BQWxCLElBQTBCLFNBQU9sVyxFQUFFaVcsTUFBRixDQUFTQyxNQUExQyxHQUFpRG5WLEVBQUVMLE9BQUYsQ0FBVVYsRUFBRWlXLE1BQUYsQ0FBU0MsTUFBbkIsQ0FBakQsR0FBNEUsS0FBSyxDQUFMLEtBQVNsVyxFQUFFaVcsTUFBRixDQUFTUCxLQUFsQixJQUF5QixTQUFPMVYsRUFBRWlXLE1BQUYsQ0FBU1AsS0FBekMsR0FBK0MzVSxFQUFFSixNQUFGLENBQVNYLEVBQUVpVyxNQUFGLENBQVNQLEtBQWxCLENBQS9DLEdBQXdFM1UsRUFBRUosTUFBRixDQUFTLEVBQUM0VCxNQUFLLElBQU4sRUFBV2pRLFNBQVEsc0JBQW5CLEVBQVQsQ0FBcEo7QUFBeU0sbUJBQWpPLEVBQWtPckUsRUFBRW1XLGtCQUFGLENBQXFCcFcsQ0FBckIsQ0FBbE87QUFBMFAsaUJBQWxTO0FBQW9TLGVBQXhVLEVBQXlVLFVBQVNBLENBQVQsRUFBVztBQUFDQSxrQkFBRXNFLE9BQUYsR0FBVXBFLEVBQUVGLEVBQUV1VSxJQUFKLENBQVYsRUFBb0J4VCxFQUFFSixNQUFGLENBQVNYLENBQVQsQ0FBcEI7QUFBZ0MsZUFBclg7QUFBdVgsYUFBamEsRUFBa2EsVUFBU0EsQ0FBVCxFQUFXO0FBQUNBLGdCQUFFc0UsT0FBRixHQUFVcEUsRUFBRUYsRUFBRXVVLElBQUosQ0FBVixFQUFvQnhULEVBQUVKLE1BQUYsQ0FBU1gsQ0FBVCxDQUFwQjtBQUFnQyxhQUE5YztBQUFnZCxXQUFwZCxDQUFvZCxPQUFNZ0IsQ0FBTixFQUFRO0FBQUNBLGNBQUVzRCxPQUFGLEdBQVVwRSxFQUFFYyxFQUFFdVQsSUFBSixDQUFWLEVBQW9CeFQsRUFBRUosTUFBRixDQUFTSyxDQUFULENBQXBCO0FBQWdDLGtCQUFPRCxFQUFFSCxPQUFUO0FBQWlCLFNBQTd3TCxFQUE4d0x5VixtQkFBa0IsMkJBQVNsVyxDQUFULEVBQVdXLENBQVgsRUFBYTtBQUFDLGNBQUlDLElBQUVmLEVBQUVNLEtBQUYsRUFBTixDQUFnQixNQUFNOFQsSUFBTixDQUFXdFQsQ0FBWCxLQUFlQyxFQUFFSixNQUFGLENBQVMsK0JBQVQsQ0FBZixDQUF5RCxJQUFHO0FBQUNWLGNBQUVvVSx5QkFBRixDQUE0QmxVLENBQTVCLEVBQThCLFVBQVNILENBQVQsRUFBVztBQUFDQSxnQkFBRThVLE9BQUYsQ0FBVWhVLENBQVYsRUFBWSxFQUFDNk8sUUFBTyxDQUFDLENBQVQsRUFBWixFQUF3QixVQUFTM1AsQ0FBVCxFQUFXO0FBQUNBLGtCQUFFOFYsSUFBRixDQUFPLFVBQVM5VixDQUFULEVBQVc7QUFBQyxzQkFBSUMsSUFBRSxJQUFJOFYsVUFBSixFQUFOLENBQXFCOVYsRUFBRStWLFNBQUYsR0FBWSxVQUFTaFcsQ0FBVCxFQUFXO0FBQUMseUJBQUssQ0FBTCxLQUFTQSxFQUFFaVcsTUFBRixDQUFTQyxNQUFsQixJQUEwQixTQUFPbFcsRUFBRWlXLE1BQUYsQ0FBU0MsTUFBMUMsR0FBaURuVixFQUFFTCxPQUFGLENBQVVWLEVBQUVpVyxNQUFGLENBQVNDLE1BQW5CLENBQWpELEdBQTRFLEtBQUssQ0FBTCxLQUFTbFcsRUFBRWlXLE1BQUYsQ0FBU1AsS0FBbEIsSUFBeUIsU0FBTzFWLEVBQUVpVyxNQUFGLENBQVNQLEtBQXpDLEdBQStDM1UsRUFBRUosTUFBRixDQUFTWCxFQUFFaVcsTUFBRixDQUFTUCxLQUFsQixDQUEvQyxHQUF3RTNVLEVBQUVKLE1BQUYsQ0FBUyxFQUFDNFQsTUFBSyxJQUFOLEVBQVdqUSxTQUFRLHNCQUFuQixFQUFULENBQXBKO0FBQXlNLG1CQUFqTyxFQUFrT3JFLEVBQUVvVyxpQkFBRixDQUFvQnJXLENBQXBCLENBQWxPO0FBQXlQLGlCQUFqUztBQUFtUyxlQUF2VSxFQUF3VSxVQUFTQSxDQUFULEVBQVc7QUFBQ0Esa0JBQUVzRSxPQUFGLEdBQVVwRSxFQUFFRixFQUFFdVUsSUFBSixDQUFWLEVBQW9CeFQsRUFBRUosTUFBRixDQUFTWCxDQUFULENBQXBCO0FBQWdDLGVBQXBYO0FBQXNYLGFBQWhhLEVBQWlhLFVBQVNBLENBQVQsRUFBVztBQUFDQSxnQkFBRXNFLE9BQUYsR0FBVXBFLEVBQUVGLEVBQUV1VSxJQUFKLENBQVYsRUFBb0J4VCxFQUFFSixNQUFGLENBQVNYLENBQVQsQ0FBcEI7QUFBZ0MsYUFBN2M7QUFBK2MsV0FBbmQsQ0FBbWQsT0FBTWdCLENBQU4sRUFBUTtBQUFDQSxjQUFFc0QsT0FBRixHQUFVcEUsRUFBRWMsRUFBRXVULElBQUosQ0FBVixFQUFvQnhULEVBQUVKLE1BQUYsQ0FBU0ssQ0FBVCxDQUFwQjtBQUFnQyxrQkFBT0QsRUFBRUgsT0FBVDtBQUFpQixTQUFwNE0sRUFBcTRNMFYsVUFBUyxrQkFBU3BXLENBQVQsRUFBV0MsQ0FBWCxFQUFhVyxDQUFiLEVBQWVDLENBQWYsRUFBaUI7QUFBQyxjQUFJQyxJQUFFaEIsRUFBRU0sS0FBRixFQUFOLENBQWdCUyxJQUFFQSxLQUFHWixDQUFMLEVBQU8sQ0FBQyxNQUFNaVUsSUFBTixDQUFXalUsQ0FBWCxLQUFlLE1BQU1pVSxJQUFOLENBQVdyVCxDQUFYLENBQWhCLEtBQWdDQyxFQUFFTCxNQUFGLENBQVMsK0JBQVQsQ0FBdkMsQ0FBaUYsSUFBRztBQUFDVixjQUFFb1UseUJBQUYsQ0FBNEJuVSxDQUE1QixFQUE4QixVQUFTRixDQUFULEVBQVc7QUFBQ0EsZ0JBQUU4VSxPQUFGLENBQVUzVSxDQUFWLEVBQVksRUFBQ3dQLFFBQU8sQ0FBQyxDQUFULEVBQVosRUFBd0IsVUFBUzNQLENBQVQsRUFBVztBQUFDQyxrQkFBRW9VLHlCQUFGLENBQTRCdlQsQ0FBNUIsRUFBOEIsVUFBU2IsQ0FBVCxFQUFXO0FBQUNELG9CQUFFdVcsTUFBRixDQUFTdFcsQ0FBVCxFQUFXYyxDQUFYLEVBQWEsVUFBU2YsQ0FBVCxFQUFXO0FBQUNnQixzQkFBRU4sT0FBRixDQUFVVixDQUFWO0FBQWEsbUJBQXRDLEVBQXVDLFVBQVNBLENBQVQsRUFBVztBQUFDZ0Isc0JBQUVMLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLG1CQUEvRDtBQUFpRSxpQkFBM0csRUFBNEcsVUFBU0EsQ0FBVCxFQUFXO0FBQUNnQixvQkFBRUwsTUFBRixDQUFTWCxDQUFUO0FBQVksaUJBQXBJO0FBQXNJLGVBQTFLLEVBQTJLLFVBQVNBLENBQVQsRUFBVztBQUFDZ0Isa0JBQUVMLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLGVBQW5NO0FBQXFNLGFBQS9PLEVBQWdQLFVBQVNBLENBQVQsRUFBVztBQUFDZ0IsZ0JBQUVMLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLGFBQXhRO0FBQTBRLFdBQTlRLENBQThRLE9BQU1pQixDQUFOLEVBQVE7QUFBQ0QsY0FBRUwsTUFBRixDQUFTTSxDQUFUO0FBQVksa0JBQU9ELEVBQUVKLE9BQVQ7QUFBaUIsU0FBcnpOLEVBQXN6TjRWLFNBQVEsaUJBQVN0VyxDQUFULEVBQVdDLENBQVgsRUFBYVcsQ0FBYixFQUFlQyxDQUFmLEVBQWlCO0FBQUMsY0FBSUMsSUFBRWhCLEVBQUVNLEtBQUYsRUFBTixDQUFnQlMsSUFBRUEsS0FBR1osQ0FBTCxFQUFPLENBQUMsTUFBTWlVLElBQU4sQ0FBV2pVLENBQVgsS0FBZSxNQUFNaVUsSUFBTixDQUFXclQsQ0FBWCxDQUFoQixLQUFnQ0MsRUFBRUwsTUFBRixDQUFTLCtCQUFULENBQXZDLENBQWlGLElBQUc7QUFBQ1YsY0FBRW9VLHlCQUFGLENBQTRCblUsQ0FBNUIsRUFBOEIsVUFBU0YsQ0FBVCxFQUFXO0FBQUNBLGdCQUFFNFUsWUFBRixDQUFlelUsQ0FBZixFQUFpQixFQUFDd1AsUUFBTyxDQUFDLENBQVQsRUFBakIsRUFBNkIsVUFBUzNQLENBQVQsRUFBVztBQUFDQyxrQkFBRW9VLHlCQUFGLENBQTRCdlQsQ0FBNUIsRUFBOEIsVUFBU2IsQ0FBVCxFQUFXO0FBQUNELG9CQUFFdVcsTUFBRixDQUFTdFcsQ0FBVCxFQUFXYyxDQUFYLEVBQWEsVUFBU2YsQ0FBVCxFQUFXO0FBQUNnQixzQkFBRU4sT0FBRixDQUFVVixDQUFWO0FBQWEsbUJBQXRDLEVBQXVDLFVBQVNBLENBQVQsRUFBVztBQUFDZ0Isc0JBQUVMLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLG1CQUEvRDtBQUFpRSxpQkFBM0csRUFBNEcsVUFBU0EsQ0FBVCxFQUFXO0FBQUNnQixvQkFBRUwsTUFBRixDQUFTWCxDQUFUO0FBQVksaUJBQXBJO0FBQXNJLGVBQS9LLEVBQWdMLFVBQVNBLENBQVQsRUFBVztBQUFDZ0Isa0JBQUVMLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLGVBQXhNO0FBQTBNLGFBQXBQLEVBQXFQLFVBQVNBLENBQVQsRUFBVztBQUFDZ0IsZ0JBQUVMLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLGFBQTdRO0FBQStRLFdBQW5SLENBQW1SLE9BQU1pQixDQUFOLEVBQVE7QUFBQ0QsY0FBRUwsTUFBRixDQUFTTSxDQUFUO0FBQVksa0JBQU9ELEVBQUVKLE9BQVQ7QUFBaUIsU0FBMXVPLEVBQTJ1TzZWLFNBQVEsaUJBQVN0VyxDQUFULEVBQVdXLENBQVgsRUFBYUMsQ0FBYixFQUFlQyxDQUFmLEVBQWlCO0FBQUMsY0FBSUMsSUFBRWpCLEVBQUVNLEtBQUYsRUFBTixDQUFnQlUsSUFBRUEsS0FBR0YsQ0FBTCxFQUFPLENBQUMsTUFBTXNULElBQU4sQ0FBV3RULENBQVgsS0FBZSxNQUFNc1QsSUFBTixDQUFXcFQsQ0FBWCxDQUFoQixLQUFnQ0MsRUFBRU4sTUFBRixDQUFTLCtCQUFULENBQXZDLENBQWlGLElBQUc7QUFBQ1YsY0FBRW9VLHlCQUFGLENBQTRCbFUsQ0FBNUIsRUFBOEIsVUFBU0gsQ0FBVCxFQUFXO0FBQUNBLGdCQUFFNFUsWUFBRixDQUFlOVQsQ0FBZixFQUFpQixFQUFDNk8sUUFBTyxDQUFDLENBQVQsRUFBV2dGLFdBQVUsQ0FBQyxDQUF0QixFQUFqQixFQUEwQyxVQUFTM1UsQ0FBVCxFQUFXO0FBQUNDLGtCQUFFb1UseUJBQUYsQ0FBNEJ0VCxDQUE1QixFQUE4QixVQUFTZCxDQUFULEVBQVc7QUFBQ0Qsb0JBQUUwVyxNQUFGLENBQVN6VyxDQUFULEVBQVdlLENBQVgsRUFBYSxVQUFTaEIsQ0FBVCxFQUFXO0FBQUNpQixzQkFBRVAsT0FBRixDQUFVVixDQUFWO0FBQWEsbUJBQXRDLEVBQXVDLFVBQVNBLENBQVQsRUFBVztBQUFDQSxzQkFBRXNFLE9BQUYsR0FBVXBFLEVBQUVGLEVBQUV1VSxJQUFKLENBQVYsRUFBb0J0VCxFQUFFTixNQUFGLENBQVNYLENBQVQsQ0FBcEI7QUFBZ0MsbUJBQW5GO0FBQXFGLGlCQUEvSCxFQUFnSSxVQUFTQSxDQUFULEVBQVc7QUFBQ0Esb0JBQUVzRSxPQUFGLEdBQVVwRSxFQUFFRixFQUFFdVUsSUFBSixDQUFWLEVBQW9CdFQsRUFBRU4sTUFBRixDQUFTWCxDQUFULENBQXBCO0FBQWdDLGlCQUE1SztBQUE4SyxlQUFwTyxFQUFxTyxVQUFTQSxDQUFULEVBQVc7QUFBQ0Esa0JBQUVzRSxPQUFGLEdBQVVwRSxFQUFFRixFQUFFdVUsSUFBSixDQUFWLEVBQW9CdFQsRUFBRU4sTUFBRixDQUFTWCxDQUFULENBQXBCO0FBQWdDLGVBQWpSO0FBQW1SLGFBQTdULEVBQThULFVBQVNBLENBQVQsRUFBVztBQUFDQSxnQkFBRXNFLE9BQUYsR0FBVXBFLEVBQUVGLEVBQUV1VSxJQUFKLENBQVYsRUFBb0J0VCxFQUFFTixNQUFGLENBQVNYLENBQVQsQ0FBcEI7QUFBZ0MsYUFBMVc7QUFBNFcsV0FBaFgsQ0FBZ1gsT0FBTWtCLENBQU4sRUFBUTtBQUFDQSxjQUFFb0QsT0FBRixHQUFVcEUsRUFBRWdCLEVBQUVxVCxJQUFKLENBQVYsRUFBb0J0VCxFQUFFTixNQUFGLENBQVNPLENBQVQsQ0FBcEI7QUFBZ0Msa0JBQU9ELEVBQUVMLE9BQVQ7QUFBaUIsU0FBaHhQLEVBQWl4UCtWLFVBQVMsa0JBQVN4VyxDQUFULEVBQVdXLENBQVgsRUFBYUMsQ0FBYixFQUFlQyxDQUFmLEVBQWlCO0FBQUMsY0FBSUMsSUFBRWpCLEVBQUVNLEtBQUYsRUFBTixDQUFnQlUsSUFBRUEsS0FBR0YsQ0FBTCxFQUFPLE1BQU1zVCxJQUFOLENBQVd0VCxDQUFYLEtBQWVHLEVBQUVOLE1BQUYsQ0FBUywrQkFBVCxDQUF0QixDQUFnRSxJQUFHO0FBQUNWLGNBQUVvVSx5QkFBRixDQUE0QmxVLENBQTVCLEVBQThCLFVBQVNILENBQVQsRUFBVztBQUFDQSxnQkFBRThVLE9BQUYsQ0FBVWhVLENBQVYsRUFBWSxFQUFDNk8sUUFBTyxDQUFDLENBQVQsRUFBV2dGLFdBQVUsQ0FBQyxDQUF0QixFQUFaLEVBQXFDLFVBQVMzVSxDQUFULEVBQVc7QUFBQ0Msa0JBQUVvVSx5QkFBRixDQUE0QnRULENBQTVCLEVBQThCLFVBQVNkLENBQVQsRUFBVztBQUFDRCxvQkFBRTBXLE1BQUYsQ0FBU3pXLENBQVQsRUFBV2UsQ0FBWCxFQUFhLFVBQVNoQixDQUFULEVBQVc7QUFBQ2lCLHNCQUFFUCxPQUFGLENBQVVWLENBQVY7QUFBYSxtQkFBdEMsRUFBdUMsVUFBU0EsQ0FBVCxFQUFXO0FBQUNBLHNCQUFFc0UsT0FBRixHQUFVcEUsRUFBRUYsRUFBRXVVLElBQUosQ0FBVixFQUFvQnRULEVBQUVOLE1BQUYsQ0FBU1gsQ0FBVCxDQUFwQjtBQUFnQyxtQkFBbkY7QUFBcUYsaUJBQS9ILEVBQWdJLFVBQVNBLENBQVQsRUFBVztBQUFDQSxvQkFBRXNFLE9BQUYsR0FBVXBFLEVBQUVGLEVBQUV1VSxJQUFKLENBQVYsRUFBb0J0VCxFQUFFTixNQUFGLENBQVNYLENBQVQsQ0FBcEI7QUFBZ0MsaUJBQTVLO0FBQThLLGVBQS9OLEVBQWdPLFVBQVNBLENBQVQsRUFBVztBQUFDQSxrQkFBRXNFLE9BQUYsR0FBVXBFLEVBQUVGLEVBQUV1VSxJQUFKLENBQVYsRUFBb0J0VCxFQUFFTixNQUFGLENBQVNYLENBQVQsQ0FBcEI7QUFBZ0MsZUFBNVE7QUFBOFEsYUFBeFQsRUFBeVQsVUFBU0EsQ0FBVCxFQUFXO0FBQUNBLGdCQUFFc0UsT0FBRixHQUFVcEUsRUFBRUYsRUFBRXVVLElBQUosQ0FBVixFQUFvQnRULEVBQUVOLE1BQUYsQ0FBU1gsQ0FBVCxDQUFwQjtBQUFnQyxhQUFyVztBQUF1VyxXQUEzVyxDQUEyVyxPQUFNa0IsQ0FBTixFQUFRO0FBQUNBLGNBQUVvRCxPQUFGLEdBQVVwRSxFQUFFZ0IsRUFBRXFULElBQUosQ0FBVixFQUFvQnRULEVBQUVOLE1BQUYsQ0FBU08sQ0FBVCxDQUFwQjtBQUFnQyxrQkFBT0QsRUFBRUwsT0FBVDtBQUFpQixTQUFqeVEsRUFBa3lRZ1csa0JBQWlCLDBCQUFTelcsQ0FBVCxFQUFXVyxDQUFYLEVBQWE7QUFBQyxjQUFJQyxJQUFFZixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsTUFBTThULElBQU4sQ0FBV3RULENBQVgsS0FBZUMsRUFBRUosTUFBRixDQUFTLCtCQUFULENBQWYsQ0FBeUQsSUFBRztBQUFDLGdCQUFJSyxJQUFFYixJQUFFVyxDQUFSLENBQVViLEVBQUVvVSx5QkFBRixDQUE0QnJULENBQTVCLEVBQThCLFVBQVNoQixDQUFULEVBQVc7QUFBQ0EsZ0JBQUU4VixJQUFGLENBQU8sVUFBUzlWLENBQVQsRUFBVztBQUFDZSxrQkFBRUwsT0FBRixDQUFVVixDQUFWO0FBQWEsZUFBaEMsRUFBaUMsVUFBU0EsQ0FBVCxFQUFXO0FBQUNBLGtCQUFFc0UsT0FBRixHQUFVcEUsRUFBRUYsRUFBRXVVLElBQUosQ0FBVixFQUFvQnhULEVBQUVKLE1BQUYsQ0FBU1gsQ0FBVCxDQUFwQjtBQUFnQyxlQUE3RTtBQUErRSxhQUF6SCxFQUEwSCxVQUFTQSxDQUFULEVBQVc7QUFBQ0EsZ0JBQUVzRSxPQUFGLEdBQVVwRSxFQUFFRixFQUFFdVUsSUFBSixDQUFWLEVBQW9CeFQsRUFBRUosTUFBRixDQUFTWCxDQUFULENBQXBCO0FBQWdDLGFBQXRLO0FBQXdLLFdBQXRMLENBQXNMLE9BQU1pQixDQUFOLEVBQVE7QUFBQ0EsY0FBRXFELE9BQUYsR0FBVXBFLEVBQUVlLEVBQUVzVCxJQUFKLENBQVYsRUFBb0J4VCxFQUFFSixNQUFGLENBQVNNLENBQVQsQ0FBcEI7QUFBZ0Msa0JBQU9GLEVBQUVILE9BQVQ7QUFBaUIsU0FBMW5SLEVBQU47QUFBa29SLEtBQXRyUixDQUFWO0FBQWtzUixHQUE5c1IsQ0FBalcsQ0FEaEIsRUFDa2tTZixRQUFRQyxNQUFSLENBQWUsK0JBQWYsRUFBK0MsRUFBL0MsRUFBbURDLE9BQW5ELENBQTJELHFCQUEzRCxFQUFpRixDQUFDLElBQUQsRUFBTSxVQUFTQyxDQUFULEVBQVc7QUFBQyxXQUFNLEVBQUMyUyxNQUFLLGNBQVMxUyxDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFlBQUlDLElBQUVILEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPRSxRQUFRMkIsT0FBUixDQUFnQjBVLFdBQWhCLENBQTRCbEUsSUFBNUIsQ0FBaUMxUyxDQUFqQyxFQUFtQ0MsQ0FBbkMsRUFBcUMsRUFBQ3dWLE9BQU0sZUFBUzFWLENBQVQsRUFBVztBQUFDRyxjQUFFUSxNQUFGLENBQVNYLENBQVQ7QUFBWSxXQUEvQixFQUFnQ2dWLFNBQVEsbUJBQVU7QUFBQzdVLGNBQUVPLE9BQUY7QUFBWSxXQUEvRCxFQUFyQyxHQUF1R1AsRUFBRVMsT0FBaEg7QUFBd0gsT0FBNUosRUFBNkprVyxXQUFVLG1CQUFTN1csQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9FLFFBQVEyQixPQUFSLENBQWdCMFUsV0FBaEIsQ0FBNEJDLFNBQTVCLENBQXNDN1csQ0FBdEMsRUFBd0MsRUFBQ3lWLE9BQU0sZUFBUzFWLENBQVQsRUFBVztBQUFDRSxjQUFFUyxNQUFGLENBQVNYLENBQVQ7QUFBWSxXQUEvQixFQUFnQ2dWLFNBQVEsbUJBQVU7QUFBQzlVLGNBQUVRLE9BQUY7QUFBWSxXQUEvRCxFQUF4QyxHQUEwR1IsRUFBRVUsT0FBbkg7QUFBMkgsT0FBOVQsRUFBK1RtVyxnQkFBZSx3QkFBUzlXLENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPRSxRQUFRMkIsT0FBUixDQUFnQjBVLFdBQWhCLENBQTRCRSxjQUE1QixDQUEyQzlXLENBQTNDLEVBQTZDLEVBQUMrVSxTQUFRLGlCQUFTaFYsQ0FBVCxFQUFXO0FBQUNFLGNBQUVRLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFdBQWxDLEVBQTdDLEdBQWtGRSxFQUFFVSxPQUEzRjtBQUFtRyxPQUE3YyxFQUFOO0FBQXFkLEdBQXZlLENBQWpGLENBRGxrUyxFQUM2blRmLFFBQVFDLE1BQVIsQ0FBZSxnQ0FBZixFQUFnRCxFQUFoRCxFQUFvREMsT0FBcEQsQ0FBNEQsc0JBQTVELEVBQW1GLENBQUMsSUFBRCxFQUFNLFVBQU4sRUFBaUIsVUFBU0MsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxXQUFNLEVBQUMrVyxVQUFTLGtCQUFTOVcsQ0FBVCxFQUFXQyxDQUFYLEVBQWFXLENBQWIsRUFBZUMsQ0FBZixFQUFpQjtBQUFDLFlBQUlDLElBQUVoQixFQUFFTSxLQUFGLEVBQU47QUFBQSxZQUFnQlcsSUFBRSxJQUFJZ1csWUFBSixFQUFsQjtBQUFBLFlBQW1DL1YsSUFBRUosS0FBR0EsRUFBRW9XLFNBQUYsS0FBYyxDQUFDLENBQWxCLEdBQW9CaFgsQ0FBcEIsR0FBc0JnWCxVQUFVaFgsQ0FBVixDQUEzRCxDQUF3RSxPQUFPWSxLQUFHLEtBQUssQ0FBTCxLQUFTQSxFQUFFcVcsT0FBZCxJQUF1QixTQUFPclcsRUFBRXFXLE9BQWhDLEtBQTBDbFgsRUFBRSxZQUFVO0FBQUNnQixZQUFFMFUsS0FBRjtBQUFVLFNBQXZCLEVBQXdCN1UsRUFBRXFXLE9BQTFCLEdBQW1DclcsRUFBRXFXLE9BQUYsR0FBVSxJQUF2RixHQUE2RmxXLEVBQUVtVyxVQUFGLEdBQWEsVUFBU3BYLENBQVQsRUFBVztBQUFDZ0IsWUFBRThFLE1BQUYsQ0FBUzlGLENBQVQ7QUFBWSxTQUFsSSxFQUFtSWdCLEVBQUVKLE9BQUYsQ0FBVStVLEtBQVYsR0FBZ0IsWUFBVTtBQUFDMVUsWUFBRTBVLEtBQUY7QUFBVSxTQUF4SyxFQUF5SzFVLEVBQUUrVixRQUFGLENBQVc5VixDQUFYLEVBQWFmLENBQWIsRUFBZWEsRUFBRU4sT0FBakIsRUFBeUJNLEVBQUVMLE1BQTNCLEVBQWtDSSxDQUFsQyxFQUFvQ0QsQ0FBcEMsQ0FBekssRUFBZ05FLEVBQUVKLE9BQXpOO0FBQWlPLE9BQXJVLEVBQXNVeVcsUUFBTyxnQkFBU25YLENBQVQsRUFBV0MsQ0FBWCxFQUFhVyxDQUFiLEVBQWVDLENBQWYsRUFBaUI7QUFBQyxZQUFJQyxJQUFFaEIsRUFBRU0sS0FBRixFQUFOO0FBQUEsWUFBZ0JXLElBQUUsSUFBSWdXLFlBQUosRUFBbEI7QUFBQSxZQUFtQy9WLElBQUVKLEtBQUdBLEVBQUVvVyxTQUFGLEtBQWMsQ0FBQyxDQUFsQixHQUFvQmhYLENBQXBCLEdBQXNCZ1gsVUFBVWhYLENBQVYsQ0FBM0QsQ0FBd0UsT0FBT1ksS0FBRyxLQUFLLENBQUwsS0FBU0EsRUFBRXFXLE9BQWQsSUFBdUIsU0FBT3JXLEVBQUVxVyxPQUFoQyxLQUEwQ2xYLEVBQUUsWUFBVTtBQUFDZ0IsWUFBRTBVLEtBQUY7QUFBVSxTQUF2QixFQUF3QjdVLEVBQUVxVyxPQUExQixHQUFtQ3JXLEVBQUVxVyxPQUFGLEdBQVUsSUFBdkYsR0FBNkZsVyxFQUFFbVcsVUFBRixHQUFhLFVBQVNwWCxDQUFULEVBQVc7QUFBQ2dCLFlBQUU4RSxNQUFGLENBQVM5RixDQUFUO0FBQVksU0FBbEksRUFBbUlnQixFQUFFSixPQUFGLENBQVUrVSxLQUFWLEdBQWdCLFlBQVU7QUFBQzFVLFlBQUUwVSxLQUFGO0FBQVUsU0FBeEssRUFBeUsxVSxFQUFFb1csTUFBRixDQUFTbFgsQ0FBVCxFQUFXZSxDQUFYLEVBQWFGLEVBQUVOLE9BQWYsRUFBdUJNLEVBQUVMLE1BQXpCLEVBQWdDRyxDQUFoQyxFQUFrQ0MsQ0FBbEMsQ0FBekssRUFBOE1DLEVBQUVKLE9BQXZOO0FBQStOLE9BQXRvQixFQUFOO0FBQThvQixHQUE3cUIsQ0FBbkYsQ0FEN25ULEVBQ2c0VWYsUUFBUUMsTUFBUixDQUFlLDhCQUFmLEVBQThDLEVBQTlDLEVBQWtEQyxPQUFsRCxDQUEwRCxvQkFBMUQsRUFBK0UsQ0FBQyxJQUFELEVBQU0sU0FBTixFQUFnQixVQUFTQyxDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFdBQU0sRUFBQ3NMLFdBQVUscUJBQVU7QUFBQyxZQUFJckwsSUFBRUYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVrQyxPQUFGLENBQVVtVixVQUFWLENBQXFCL0wsU0FBckIsQ0FBK0IsVUFBU3ZMLENBQVQsRUFBVztBQUFDRSxZQUFFUSxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUF4RCxHQUEwREUsRUFBRVUsT0FBbkU7QUFBMkUsT0FBakgsRUFBa0gyVyxVQUFTLG9CQUFVO0FBQUMsWUFBSXJYLElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFa0MsT0FBRixDQUFVbVYsVUFBVixDQUFxQkMsUUFBckIsQ0FBOEIsVUFBU3ZYLENBQVQsRUFBVztBQUFDRSxZQUFFUSxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUF2RCxFQUF3RCxVQUFTQSxDQUFULEVBQVc7QUFBQ0UsWUFBRVMsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBaEYsR0FBa0ZFLEVBQUVVLE9BQTNGO0FBQW1HLE9BQXpQLEVBQTBQNFcsV0FBVSxxQkFBVTtBQUFDLFlBQUl0WCxJQUFFRixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRWtDLE9BQUYsQ0FBVW1WLFVBQVYsQ0FBcUJFLFNBQXJCLENBQStCLFVBQVN4WCxDQUFULEVBQVc7QUFBQ0UsWUFBRVEsT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBeEQsRUFBeUQsVUFBU0EsQ0FBVCxFQUFXO0FBQUNFLFlBQUVTLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQWpGLEdBQW1GRSxFQUFFVSxPQUE1RjtBQUFvRyxPQUFuWSxFQUFvWTZXLFFBQU8sa0JBQVU7QUFBQyxZQUFJdlgsSUFBRUYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVrQyxPQUFGLENBQVVtVixVQUFWLENBQXFCRyxNQUFyQixDQUE0QixVQUFTelgsQ0FBVCxFQUFXO0FBQUNFLFlBQUVRLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQXJELEVBQXNELFVBQVNBLENBQVQsRUFBVztBQUFDRSxZQUFFUyxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUE5RSxHQUFnRkUsRUFBRVUsT0FBekY7QUFBaUcsT0FBdmdCLEVBQU47QUFBK2dCLEdBQTdpQixDQUEvRSxDQURoNFUsRUFDKy9WZixRQUFRQyxNQUFSLENBQWUsNkJBQWYsRUFBNkMsRUFBN0MsRUFBaURDLE9BQWpELENBQXlELG1CQUF6RCxFQUE2RSxDQUFDLElBQUQsRUFBTSxTQUFOLEVBQWdCLFVBQVNDLENBQVQsRUFBV0MsQ0FBWCxFQUFhO0FBQUMsV0FBTSxFQUFDc1QsWUFBVyxvQkFBU3JULENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVILEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFeVgsU0FBRixDQUFZbkUsVUFBWixDQUF1QnJULENBQXZCLEVBQXlCLFlBQVU7QUFBQ0MsWUFBRU8sT0FBRjtBQUFZLFNBQWhELEVBQWlELFlBQVU7QUFBQ1AsWUFBRVEsTUFBRjtBQUFXLFNBQXZFLEdBQXlFUixFQUFFUyxPQUFsRjtBQUEwRixPQUFsSSxFQUFtSTZTLGNBQWEsc0JBQVN2VCxDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRXlYLFNBQUYsQ0FBWWpFLFlBQVosQ0FBeUJ2VCxDQUF6QixFQUEyQixZQUFVO0FBQUNDLFlBQUVPLE9BQUY7QUFBWSxTQUFsRCxFQUFtRCxZQUFVO0FBQUNQLFlBQUVRLE1BQUY7QUFBVyxTQUF6RSxHQUEyRVIsRUFBRVMsT0FBcEY7QUFBNEYsT0FBeFEsRUFBeVE4UyxjQUFhLHdCQUFVO0FBQUMsWUFBSXhULElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFeVgsU0FBRixDQUFZaEUsWUFBWixDQUF5QixZQUFVO0FBQUN4VCxZQUFFUSxPQUFGO0FBQVksU0FBaEQsRUFBaUQsWUFBVTtBQUFDUixZQUFFUyxNQUFGO0FBQVcsU0FBdkUsR0FBeUVULEVBQUVVLE9BQWxGO0FBQTBGLE9BQTNZLEVBQTRZK1MsWUFBVyxvQkFBU3pULENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVILEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFeVgsU0FBRixDQUFZL0QsVUFBWixDQUF1QnpULENBQXZCLEVBQXlCLFlBQVU7QUFBQ0MsWUFBRU8sT0FBRjtBQUFZLFNBQWhELEVBQWlELFlBQVU7QUFBQ1AsWUFBRVEsTUFBRjtBQUFXLFNBQXZFLEdBQXlFUixFQUFFUyxPQUFsRjtBQUEwRixPQUE3Z0IsRUFBOGdCZ1QsZ0JBQWUsd0JBQVMxVCxDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFlBQUlXLElBQUVkLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFeVgsU0FBRixDQUFZOUQsY0FBWixDQUEyQjFULENBQTNCLEVBQTZCQyxDQUE3QixFQUErQixZQUFVO0FBQUNXLFlBQUVKLE9BQUY7QUFBWSxTQUF0RCxFQUF1RCxZQUFVO0FBQUNJLFlBQUVILE1BQUY7QUFBVyxTQUE3RSxHQUErRUcsRUFBRUYsT0FBeEY7QUFBZ0csT0FBM3BCLEVBQTRwQmlULFlBQVcsc0JBQVU7QUFBQyxZQUFJM1QsSUFBRUYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUV5WCxTQUFGLENBQVk3RCxVQUFaLENBQXVCLFlBQVU7QUFBQzNULFlBQUVRLE9BQUY7QUFBWSxTQUE5QyxFQUErQyxZQUFVO0FBQUNSLFlBQUVTLE1BQUY7QUFBVyxTQUFyRSxHQUF1RVQsRUFBRVUsT0FBaEY7QUFBd0YsT0FBMXhCLEVBQTJ4QmtULHFCQUFvQiw2QkFBUzVULENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVILEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFeVgsU0FBRixDQUFZNUQsbUJBQVosQ0FBZ0M1VCxDQUFoQyxFQUFrQyxZQUFVO0FBQUNDLFlBQUVPLE9BQUY7QUFBWSxTQUF6RCxFQUEwRCxZQUFVO0FBQUNQLFlBQUVRLE1BQUY7QUFBVyxTQUFoRixHQUFrRlIsRUFBRVMsT0FBM0Y7QUFBbUcsT0FBOTZCLEVBQSs2Qm1ULGtCQUFpQiw0QkFBVTtBQUFDLFlBQUk3VCxJQUFFRixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRXlYLFNBQUYsQ0FBWTNELGdCQUFaLENBQTZCLFlBQVU7QUFBQzdULFlBQUVRLE9BQUY7QUFBWSxTQUFwRCxFQUFxRCxZQUFVO0FBQUNSLFlBQUVTLE1BQUY7QUFBVyxTQUEzRSxHQUE2RVQsRUFBRVUsT0FBdEY7QUFBOEYsT0FBempDLEVBQU47QUFBaWtDLEdBQS9sQyxDQUE3RSxDQUQvL1YsRUFDOHFZZixRQUFRQyxNQUFSLENBQWUsc0JBQWYsRUFBc0MsRUFBdEMsRUFBMENDLE9BQTFDLENBQWtELFlBQWxELEVBQStELENBQUMsSUFBRCxFQUFNLFNBQU4sRUFBZ0IsVUFBU0MsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxXQUFNLEVBQUN1RixNQUFLLGNBQVN0RixDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFlBQUlXLElBQUVkLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPSCxJQUFFQSxLQUFHLENBQUgsR0FBS0EsQ0FBTCxHQUFPLEVBQVQsRUFBWUYsRUFBRWtDLE9BQUYsQ0FBVXdWLFFBQVYsQ0FBbUJuUyxJQUFuQixDQUF3QixVQUFTeEYsQ0FBVCxFQUFXO0FBQUNjLFlBQUVKLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQWpELEVBQWtELFVBQVNBLENBQVQsRUFBVztBQUFDYyxZQUFFSCxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUExRSxFQUEyRUUsQ0FBM0UsRUFBNkVDLENBQTdFLENBQVosRUFBNEZXLEVBQUVGLE9BQXJHO0FBQTZHLE9BQWpKLEVBQWtKZ1gsWUFBVyxvQkFBUzFYLENBQVQsRUFBV0MsQ0FBWCxFQUFhVyxDQUFiLEVBQWVDLENBQWYsRUFBaUJDLENBQWpCLEVBQW1CQyxDQUFuQixFQUFxQjtBQUFDLFlBQUlDLElBQUVsQixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRWtDLE9BQUYsQ0FBVXdWLFFBQVYsQ0FBbUJDLFVBQW5CLENBQThCLFVBQVM1WCxDQUFULEVBQVc7QUFBQ2tCLFlBQUVSLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQXZELEVBQXdELFVBQVNBLENBQVQsRUFBVztBQUFDa0IsWUFBRVAsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBaEYsRUFBaUZjLENBQWpGLEVBQW1GQyxDQUFuRixFQUFxRkMsQ0FBckYsRUFBdUZDLENBQXZGLEdBQTBGQyxFQUFFTixPQUFuRztBQUEyRyxPQUE5UyxFQUErU2lYLFdBQVUsbUJBQVMzWCxDQUFULEVBQVdDLENBQVgsRUFBYVcsQ0FBYixFQUFlO0FBQUMsWUFBSUMsSUFBRWYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVrQyxPQUFGLENBQVV3VixRQUFWLENBQW1CRSxTQUFuQixDQUE2QixVQUFTN1gsQ0FBVCxFQUFXO0FBQUNlLFlBQUVMLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQXRELEVBQXVELFVBQVNBLENBQVQsRUFBVztBQUFDZSxZQUFFSixNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUEvRSxFQUFnRmMsQ0FBaEYsR0FBbUZDLEVBQUVILE9BQTVGO0FBQW9HLE9BQTdiLEVBQThia1gsYUFBWSxxQkFBUzVYLENBQVQsRUFBV0MsQ0FBWCxFQUFhVyxDQUFiLEVBQWVDLENBQWYsRUFBaUI7QUFBQyxZQUFJQyxJQUFFaEIsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVrQyxPQUFGLENBQVV3VixRQUFWLENBQW1CRyxXQUFuQixDQUErQixVQUFTOVgsQ0FBVCxFQUFXO0FBQUNnQixZQUFFTixPQUFGLENBQVVWLENBQVY7QUFBYSxTQUF4RCxFQUF5RCxVQUFTQSxDQUFULEVBQVc7QUFBQ2dCLFlBQUVMLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQWpGLEVBQWtGYyxDQUFsRixFQUFvRkMsQ0FBcEYsR0FBdUZDLEVBQUVKLE9BQWhHO0FBQXdHLE9BQXBsQixFQUFxbEJtWCxNQUFLLGdCQUFVO0FBQUMsWUFBSTdYLElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFa0MsT0FBRixDQUFVd1YsUUFBVixDQUFtQkksSUFBbkIsQ0FBd0IsVUFBUy9YLENBQVQsRUFBVztBQUFDRSxZQUFFUSxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUFqRCxFQUFrRCxVQUFTQSxDQUFULEVBQVc7QUFBQ0UsWUFBRVMsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBMUUsR0FBNEVFLEVBQUVVLE9BQXJGO0FBQTZGLE9BQWx0QixFQUFOO0FBQTB0QixHQUF4dkIsQ0FBL0QsQ0FEOXFZLEVBQ3crWmYsUUFBUUMsTUFBUixDQUFlLCtCQUFmLEVBQStDLEVBQS9DLEVBQW1EQyxPQUFuRCxDQUEyRCxxQkFBM0QsRUFBaUYsQ0FBQyxJQUFELEVBQU0sVUFBU0MsQ0FBVCxFQUFXO0FBQUMsV0FBTSxFQUFDMkYsb0JBQW1CLDRCQUFTMUYsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9tRixVQUFVQyxXQUFWLENBQXNCQyxrQkFBdEIsQ0FBeUMsVUFBUzNGLENBQVQsRUFBVztBQUFDRSxZQUFFUSxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUFsRSxFQUFtRSxVQUFTQSxDQUFULEVBQVc7QUFBQ0UsWUFBRVMsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBM0YsRUFBNEZDLENBQTVGLEdBQStGQyxFQUFFVSxPQUF4RztBQUFnSCxPQUFoSyxFQUFpS29YLGVBQWMsdUJBQVMvWCxDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFRixFQUFFTSxLQUFGLEVBQU47QUFBQSxZQUFnQkgsSUFBRXNGLFVBQVVDLFdBQVYsQ0FBc0JzUyxhQUF0QixDQUFvQyxVQUFTaFksQ0FBVCxFQUFXO0FBQUNFLFlBQUU0RixNQUFGLENBQVM5RixDQUFUO0FBQVksU0FBNUQsRUFBNkQsVUFBU0EsQ0FBVCxFQUFXO0FBQUNFLFlBQUVTLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQXJGLEVBQXNGQyxDQUF0RixDQUFsQixDQUEyRyxPQUFPQyxFQUFFVSxPQUFGLENBQVUyUSxNQUFWLEdBQWlCLFlBQVU7QUFBQzlMLG9CQUFVQyxXQUFWLENBQXNCOEwsVUFBdEIsQ0FBaUNyUixDQUFqQztBQUFvQyxTQUFoRSxFQUFpRUQsRUFBRVUsT0FBRixDQUFVNFEsVUFBVixHQUFxQixVQUFTeFIsQ0FBVCxFQUFXO0FBQUN5RixvQkFBVUMsV0FBVixDQUFzQjhMLFVBQXRCLENBQWlDeFIsS0FBR0csQ0FBcEM7QUFBdUMsU0FBekksRUFBMElELEVBQUVVLE9BQUYsQ0FBVTZRLE9BQVYsR0FBa0J0UixDQUE1SixFQUE4SkQsRUFBRVUsT0FBdks7QUFBK0ssT0FBcmQsRUFBc2Q0USxZQUFXLG9CQUFTeFIsQ0FBVCxFQUFXO0FBQUMsZUFBT3lGLFVBQVVDLFdBQVYsQ0FBc0I4TCxVQUF0QixDQUFpQ3hSLENBQWpDLENBQVA7QUFBMkMsT0FBeGhCLEVBQU47QUFBZ2lCLEdBQWxqQixDQUFqRixDQUR4K1osRUFDOG1iSCxRQUFRQyxNQUFSLENBQWUsaUNBQWYsRUFBaUQsRUFBakQsRUFBcURDLE9BQXJELENBQTZELHVCQUE3RCxFQUFxRixDQUFDLElBQUQsRUFBTSxVQUFTQyxDQUFULEVBQVc7QUFBQyxXQUFNLEVBQUNpWSxzQkFBcUIsZ0NBQVU7QUFBQyxZQUFJaFksSUFBRUQsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9tRixVQUFVeVMsYUFBVixDQUF3QkQsb0JBQXhCLENBQTZDLFVBQVNqWSxDQUFULEVBQVc7QUFBQ0MsWUFBRVMsT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBdEUsRUFBdUUsVUFBU0EsQ0FBVCxFQUFXO0FBQUNDLFlBQUVVLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQS9GLEdBQWlHQyxFQUFFVyxPQUExRztBQUFrSCxPQUFuSyxFQUFvS3VYLGVBQWMseUJBQVU7QUFBQyxZQUFJbFksSUFBRUQsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9tRixVQUFVeVMsYUFBVixDQUF3QkMsYUFBeEIsQ0FBc0MsVUFBU25ZLENBQVQsRUFBVztBQUFDQyxZQUFFUyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUEvRCxFQUFnRSxVQUFTQSxDQUFULEVBQVc7QUFBQ0MsWUFBRVUsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBeEYsR0FBMEZDLEVBQUVXLE9BQW5HO0FBQTJHLE9BQXhULEVBQXlUd1gsbUJBQWtCLDZCQUFVO0FBQUMsWUFBSW5ZLElBQUVELEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPbUYsVUFBVXlTLGFBQVYsQ0FBd0JFLGlCQUF4QixDQUEwQyxVQUFTcFksQ0FBVCxFQUFXO0FBQUNDLFlBQUVTLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQW5FLEVBQW9FLFVBQVNBLENBQVQsRUFBVztBQUFDQyxZQUFFVSxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUE1RixHQUE4RkMsRUFBRVcsT0FBdkc7QUFBK0csT0FBcmQsRUFBc2R5WCxjQUFhLHNCQUFTcFksQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT21GLFVBQVV5UyxhQUFWLENBQXdCRyxZQUF4QixDQUFxQ3BZLENBQXJDLEVBQXVDLFVBQVNELENBQVQsRUFBVztBQUFDRyxZQUFFTyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUFoRSxFQUFpRSxVQUFTQSxDQUFULEVBQVc7QUFBQ0csWUFBRVEsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBekYsRUFBMEZFLENBQTFGLEdBQTZGQyxFQUFFUyxPQUF0RztBQUE4RyxPQUEvbUIsRUFBZ25CMFgsY0FBYSxzQkFBU3JZLENBQVQsRUFBV0MsQ0FBWCxFQUFhO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9tRixVQUFVeVMsYUFBVixDQUF3QkksWUFBeEIsQ0FBcUNyWSxDQUFyQyxFQUF1QyxVQUFTRCxDQUFULEVBQVc7QUFBQ0csWUFBRU8sT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBaEUsRUFBaUUsVUFBU0EsQ0FBVCxFQUFXO0FBQUNHLFlBQUVRLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQXpGLEVBQTBGRSxDQUExRixHQUE2RkMsRUFBRVMsT0FBdEc7QUFBOEcsT0FBendCLEVBQTB3QjJYLGdCQUFlLHdCQUFTdFksQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9tRixVQUFVeVMsYUFBVixDQUF3QkssY0FBeEIsQ0FBdUMsVUFBU3ZZLENBQVQsRUFBVztBQUFDRSxZQUFFUSxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUFoRSxFQUFpRSxVQUFTQSxDQUFULEVBQVc7QUFBQ0UsWUFBRVMsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBekYsRUFBMEZDLENBQTFGLEdBQTZGQyxFQUFFVSxPQUF0RztBQUE4RyxPQUFuNkIsRUFBbzZCNFgsY0FBYSxzQkFBU3ZZLENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPbUYsVUFBVXlTLGFBQVYsQ0FBd0JNLFlBQXhCLENBQXFDLFVBQVN4WSxDQUFULEVBQVc7QUFBQ0UsWUFBRVEsT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBOUQsRUFBK0QsVUFBU0EsQ0FBVCxFQUFXO0FBQUNFLFlBQUVTLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQXZGLEVBQXdGQyxDQUF4RixHQUEyRkMsRUFBRVUsT0FBcEc7QUFBNEcsT0FBempDLEVBQTBqQzZYLHVCQUFzQiwrQkFBU3hZLENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPbUYsVUFBVXlTLGFBQVYsQ0FBd0JPLHFCQUF4QixDQUE4Q3hZLENBQTlDLEVBQWdELFVBQVNELENBQVQsRUFBVztBQUFDRSxZQUFFUSxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUF6RSxFQUEwRSxVQUFTQSxDQUFULEVBQVc7QUFBQ0UsWUFBRVMsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBbEcsR0FBb0dFLEVBQUVVLE9BQTdHO0FBQXFILE9BQWp1QyxFQUFrdUM4WCxnQkFBZSx3QkFBU3pZLENBQVQsRUFBV0MsQ0FBWCxFQUFhO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9tRixVQUFVeVMsYUFBVixDQUF3QlEsY0FBeEIsQ0FBdUN6WSxDQUF2QyxFQUF5QyxVQUFTRCxDQUFULEVBQVc7QUFBQ0csWUFBRU8sT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBbEUsRUFBbUUsVUFBU0EsQ0FBVCxFQUFXO0FBQUNHLFlBQUVRLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQTNGLEVBQTRGRSxDQUE1RixHQUErRkMsRUFBRVMsT0FBeEc7QUFBZ0gsT0FBLzNDLEVBQWc0QytYLGdCQUFlLHdCQUFTMVksQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT21GLFVBQVV5UyxhQUFWLENBQXdCUyxjQUF4QixDQUF1QzFZLENBQXZDLEVBQXlDLFVBQVNELENBQVQsRUFBVztBQUFDRyxZQUFFTyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUFsRSxFQUFtRSxVQUFTQSxDQUFULEVBQVc7QUFBQ0csWUFBRVEsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBM0YsRUFBNEZFLENBQTVGLEdBQStGQyxFQUFFUyxPQUF4RztBQUFnSCxPQUE3aEQsRUFBOGhEZ1ksa0JBQWlCLDBCQUFTM1ksQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9tRixVQUFVeVMsYUFBVixDQUF3QlUsZ0JBQXhCLENBQXlDLFVBQVM1WSxDQUFULEVBQVc7QUFBQ0UsWUFBRVEsT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBbEUsRUFBbUUsVUFBU0EsQ0FBVCxFQUFXO0FBQUNFLFlBQUVTLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQTNGLEVBQTRGQyxDQUE1RixHQUErRkMsRUFBRVUsT0FBeEc7QUFBZ0gsT0FBM3JELEVBQTRyRGlZLG9CQUFtQiw0QkFBUzVZLENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPbUYsVUFBVXlTLGFBQVYsQ0FBd0JXLGtCQUF4QixDQUEyQzVZLENBQTNDLEVBQTZDLFVBQVNELENBQVQsRUFBVztBQUFDRSxZQUFFUSxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUF0RSxFQUF1RSxVQUFTQSxDQUFULEVBQVc7QUFBQ0UsWUFBRVMsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBL0YsR0FBaUdFLEVBQUVVLE9BQTFHO0FBQWtILE9BQTcxRCxFQUFOO0FBQXEyRCxHQUF2M0QsQ0FBckYsQ0FEOW1iLEVBQzZqZmYsUUFBUUMsTUFBUixDQUFlLDZCQUFmLEVBQTZDLEVBQTdDLEVBQWlEQyxPQUFqRCxDQUF5RCxtQkFBekQsRUFBNkUsQ0FBQyxJQUFELEVBQU0sU0FBTixFQUFnQixVQUFTQyxDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFdBQU0sRUFBQ3NULFlBQVcsb0JBQVNyVCxDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRXNDLEtBQUYsQ0FBUWdSLFVBQVIsQ0FBbUJyVCxDQUFuQixFQUFxQixZQUFVO0FBQUNDLFlBQUVPLE9BQUY7QUFBWSxTQUE1QyxFQUE2QyxZQUFVO0FBQUNQLFlBQUVRLE1BQUY7QUFBVyxTQUFuRSxHQUFxRVIsRUFBRVMsT0FBOUU7QUFBc0YsT0FBOUgsRUFBK0g2UyxjQUFhLHNCQUFTdlQsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVzQyxLQUFGLENBQVFrUixZQUFSLENBQXFCdlQsQ0FBckIsRUFBdUIsWUFBVTtBQUFDQyxZQUFFTyxPQUFGO0FBQVksU0FBOUMsRUFBK0MsWUFBVTtBQUFDUCxZQUFFUSxNQUFGO0FBQVcsU0FBckUsR0FBdUVSLEVBQUVTLE9BQWhGO0FBQXdGLE9BQWhRLEVBQWlROFMsY0FBYSx3QkFBVTtBQUFDLFlBQUl4VCxJQUFFRixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRXNDLEtBQUYsQ0FBUW1SLFlBQVIsQ0FBcUIsWUFBVTtBQUFDeFQsWUFBRVEsT0FBRjtBQUFZLFNBQTVDLEVBQTZDLFlBQVU7QUFBQ1IsWUFBRVMsTUFBRjtBQUFXLFNBQW5FLEdBQXFFVCxFQUFFVSxPQUE5RTtBQUFzRixPQUEvWCxFQUFnWStTLFlBQVcsb0JBQVN6VCxDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRXNDLEtBQUYsQ0FBUW9SLFVBQVIsQ0FBbUJ6VCxDQUFuQixFQUFxQixZQUFVO0FBQUNDLFlBQUVPLE9BQUY7QUFBWSxTQUE1QyxFQUE2QyxZQUFVO0FBQUNQLFlBQUVRLE1BQUY7QUFBVyxTQUFuRSxHQUFxRVIsRUFBRVMsT0FBOUU7QUFBc0YsT0FBN2YsRUFBOGZnVCxnQkFBZSx3QkFBUzFULENBQVQsRUFBV0MsQ0FBWCxFQUFhO0FBQUMsWUFBSVcsSUFBRWQsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVzQyxLQUFGLENBQVFxUixjQUFSLENBQXVCMVQsQ0FBdkIsRUFBeUJDLENBQXpCLEVBQTJCLFlBQVU7QUFBQ1csWUFBRUosT0FBRjtBQUFZLFNBQWxELEVBQW1ELFlBQVU7QUFBQ0ksWUFBRUgsTUFBRjtBQUFXLFNBQXpFLEdBQTJFRyxFQUFFRixPQUFwRjtBQUE0RixPQUF2b0IsRUFBd29CaVQsWUFBVyxzQkFBVTtBQUFDLFlBQUkzVCxJQUFFRixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRXNDLEtBQUYsQ0FBUXNSLFVBQVIsQ0FBbUIsWUFBVTtBQUFDM1QsWUFBRVEsT0FBRjtBQUFZLFNBQTFDLEVBQTJDLFlBQVU7QUFBQ1IsWUFBRVMsTUFBRjtBQUFXLFNBQWpFLEdBQW1FVCxFQUFFVSxPQUE1RTtBQUFvRixPQUFsd0IsRUFBbXdCa1QscUJBQW9CLDZCQUFTNVQsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVzQyxLQUFGLENBQVF1UixtQkFBUixDQUE0QjVULENBQTVCLEVBQThCLFlBQVU7QUFBQ0MsWUFBRU8sT0FBRjtBQUFZLFNBQXJELEVBQXNELFlBQVU7QUFBQ1AsWUFBRVEsTUFBRjtBQUFXLFNBQTVFLEdBQThFUixFQUFFUyxPQUF2RjtBQUErRixPQUFsNUIsRUFBbTVCbVQsa0JBQWlCLDRCQUFVO0FBQUMsWUFBSTdULElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFc0MsS0FBRixDQUFRd1IsZ0JBQVIsQ0FBeUIsWUFBVTtBQUFDN1QsWUFBRVEsT0FBRjtBQUFZLFNBQWhELEVBQWlELFlBQVU7QUFBQ1IsWUFBRVMsTUFBRjtBQUFXLFNBQXZFLEdBQXlFVCxFQUFFVSxPQUFsRjtBQUEwRixPQUF6aEMsRUFBTjtBQUFpaUMsR0FBL2pDLENBQTdFLENBRDdqZixFQUM0c2hCZixRQUFRQyxNQUFSLENBQWUsbUNBQWYsRUFBbUQsRUFBbkQsRUFBdURDLE9BQXZELENBQStELHlCQUEvRCxFQUF5RixDQUFDLElBQUQsRUFBTSxTQUFOLEVBQWdCLFVBQVNDLENBQVQsRUFBV0MsQ0FBWCxFQUFhO0FBQUMsV0FBTSxFQUFDNlksb0JBQW1CLDRCQUFTNVksQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUU4WSxTQUFGLENBQVlELGtCQUFaLENBQStCNVksQ0FBL0IsRUFBaUMsVUFBU0YsQ0FBVCxFQUFXO0FBQUNHLFlBQUVPLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQTFELEVBQTJELFVBQVNBLENBQVQsRUFBVztBQUFDRyxZQUFFUSxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUFuRixHQUFxRkcsRUFBRVMsT0FBOUY7QUFBc0csT0FBdEosRUFBdUpvWSxXQUFVLG1CQUFTOVksQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUU4WSxTQUFGLENBQVlDLFNBQVosQ0FBc0I5WSxDQUF0QixFQUF3QixVQUFTRixDQUFULEVBQVc7QUFBQ0csWUFBRU8sT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBakQsRUFBa0QsVUFBU0EsQ0FBVCxFQUFXO0FBQUNHLFlBQUVRLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQTFFLEdBQTRFRyxFQUFFUyxPQUFyRjtBQUE2RixPQUExUixFQUEyUnFZLFdBQVUscUJBQVU7QUFBQyxZQUFJL1ksSUFBRUYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUU4WSxTQUFGLENBQVlFLFNBQVosQ0FBc0IsVUFBU2paLENBQVQsRUFBVztBQUFDRSxZQUFFUSxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUEvQyxFQUFnRCxZQUFVO0FBQUNFLFlBQUVTLE1BQUY7QUFBVyxTQUF0RSxHQUF3RVQsRUFBRVUsT0FBakY7QUFBeUYsT0FBelosRUFBMFpzWSxXQUFVLG1CQUFTaFosQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUU4WSxTQUFGLENBQVlHLFNBQVosQ0FBc0JoWixDQUF0QixFQUF3QixVQUFTRixDQUFULEVBQVc7QUFBQ0csWUFBRU8sT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBakQsRUFBa0QsVUFBU0EsQ0FBVCxFQUFXO0FBQUNHLFlBQUVRLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQTFFLEdBQTRFRyxFQUFFUyxPQUFyRjtBQUE2RixPQUE3aEIsRUFBOGhCdVksb0JBQW1CLDRCQUFTalosQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxZQUFJVyxJQUFFZCxFQUFFTSxLQUFGLEVBQU47QUFBQSxZQUFnQlMsSUFBRXFZLFNBQVNsWixDQUFULEVBQVcsRUFBWCxDQUFsQixDQUFpQyxPQUFPbVosTUFBTXRZLENBQU4sS0FBVUQsRUFBRUgsTUFBRixDQUFTLHFDQUFULENBQVYsRUFBMERWLEVBQUU4WSxTQUFGLENBQVlJLGtCQUFaLENBQStCcFksQ0FBL0IsRUFBaUNaLENBQWpDLEVBQW1DLFlBQVU7QUFBQ1csWUFBRUosT0FBRjtBQUFZLFNBQTFELEVBQTJELFVBQVNWLENBQVQsRUFBVztBQUFDYyxZQUFFSCxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUFuRixDQUExRCxFQUErSWMsRUFBRUYsT0FBeEo7QUFBZ0ssT0FBaHdCLEVBQWl3QmdYLFlBQVcsb0JBQVMxWCxDQUFULEVBQVdDLENBQVgsRUFBYVcsQ0FBYixFQUFlQyxDQUFmLEVBQWlCO0FBQUMsWUFBSUMsSUFBRWhCLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFOFksU0FBRixDQUFZbkIsVUFBWixDQUF1QjFYLENBQXZCLEVBQXlCQyxDQUF6QixFQUEyQlcsQ0FBM0IsRUFBNkJDLENBQTdCLEVBQStCLFVBQVNmLENBQVQsRUFBVztBQUFDZ0IsWUFBRU4sT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBeEQsRUFBeUQsVUFBU0EsQ0FBVCxFQUFXO0FBQUNnQixZQUFFTCxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUFqRixHQUFtRmdCLEVBQUVKLE9BQTVGO0FBQW9HLE9BQWw1QixFQUFtNUIwWSxnQkFBZSx3QkFBU3BaLENBQVQsRUFBV0MsQ0FBWCxFQUFhO0FBQUMsWUFBSVcsSUFBRWQsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUU4WSxTQUFGLENBQVlPLGNBQVosQ0FBMkJwWixDQUEzQixFQUE2QkMsQ0FBN0IsRUFBK0IsVUFBU0gsQ0FBVCxFQUFXO0FBQUNjLFlBQUVKLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQXhELEVBQXlELFVBQVNBLENBQVQsRUFBVztBQUFDYyxZQUFFSCxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUFqRixHQUFtRmMsRUFBRUYsT0FBNUY7QUFBb0csT0FBcGlDLEVBQXFpQzJZLGFBQVkscUJBQVNyWixDQUFULEVBQVdDLENBQVgsRUFBYVcsQ0FBYixFQUFlQyxDQUFmLEVBQWlCO0FBQUMsWUFBSUMsSUFBRWhCLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFOFksU0FBRixDQUFZUSxXQUFaLENBQXdCclosQ0FBeEIsRUFBMEJDLENBQTFCLEVBQTRCVyxDQUE1QixFQUE4QkMsQ0FBOUIsRUFBZ0MsVUFBU2YsQ0FBVCxFQUFXO0FBQUNnQixZQUFFTixPQUFGLENBQVVWLENBQVY7QUFBYSxTQUF6RCxFQUEwRCxVQUFTQSxDQUFULEVBQVc7QUFBQ2dCLFlBQUVMLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQWxGLEdBQW9GZ0IsRUFBRUosT0FBN0Y7QUFBcUcsT0FBeHJDLEVBQXlyQzRZLGdCQUFlLHdCQUFTdFosQ0FBVCxFQUFXQyxDQUFYLEVBQWFXLENBQWIsRUFBZUMsQ0FBZixFQUFpQkMsQ0FBakIsRUFBbUJDLENBQW5CLEVBQXFCO0FBQUMsWUFBSUMsSUFBRWxCLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFOFksU0FBRixDQUFZUyxjQUFaLENBQTJCdFosQ0FBM0IsRUFBNkJDLENBQTdCLEVBQStCVyxDQUEvQixFQUFpQ0MsQ0FBakMsRUFBbUNDLENBQW5DLEVBQXFDQyxDQUFyQyxFQUF1QyxVQUFTakIsQ0FBVCxFQUFXO0FBQUNrQixZQUFFUixPQUFGLENBQVVWLENBQVY7QUFBYSxTQUFoRSxFQUFpRSxVQUFTQSxDQUFULEVBQVc7QUFBQ2tCLFlBQUVQLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQXpGLEdBQTJGa0IsRUFBRU4sT0FBcEc7QUFBNEcsT0FBMTFDLEVBQTIxQzZZLG9CQUFtQiw0QkFBU3ZaLENBQVQsRUFBV0MsQ0FBWCxFQUFhVyxDQUFiLEVBQWVDLENBQWYsRUFBaUJDLENBQWpCLEVBQW1CQyxDQUFuQixFQUFxQkMsQ0FBckIsRUFBdUI7QUFBQyxZQUFJQyxJQUFFbkIsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUU4WSxTQUFGLENBQVlVLGtCQUFaLENBQStCdlosQ0FBL0IsRUFBaUNDLENBQWpDLEVBQW1DVyxDQUFuQyxFQUFxQ0MsQ0FBckMsRUFBdUNDLENBQXZDLEVBQXlDQyxDQUF6QyxFQUEyQ0MsQ0FBM0MsRUFBNkMsVUFBU2xCLENBQVQsRUFBVztBQUFDbUIsWUFBRVQsT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBdEUsRUFBdUUsVUFBU0EsQ0FBVCxFQUFXO0FBQUNtQixZQUFFUixNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUEvRixHQUFpR21CLEVBQUVQLE9BQTFHO0FBQWtILE9BQXhnRCxFQUFOO0FBQWdoRCxHQUE5aUQsQ0FBekYsQ0FENXNoQixFQUNzMWtCZixRQUFRQyxNQUFSLENBQWUsNkJBQWYsRUFBNkMsRUFBN0MsRUFBaURDLE9BQWpELENBQXlELG1CQUF6RCxFQUE2RSxDQUFDLElBQUQsRUFBTSxTQUFOLEVBQWdCLFVBQVNDLENBQVQsRUFBV0MsQ0FBWCxFQUFhO0FBQUMsUUFBSUMsSUFBRSxJQUFOLENBQVcsT0FBTSxFQUFDd1osUUFBTyxnQkFBU3ZaLENBQVQsRUFBVztBQUFDLFlBQUlXLElBQUVkLEVBQUVNLEtBQUYsRUFBTixDQUFnQixJQUFHTCxFQUFFMFosTUFBRixDQUFTQyxNQUFULENBQWdCQyxJQUFuQixFQUF3QjtBQUFDLGNBQUk5WSxJQUFFZ0csU0FBUytTLGNBQVQsQ0FBd0IsWUFBeEIsQ0FBTixDQUE0QzVaLElBQUVELEVBQUUwWixNQUFGLENBQVNDLE1BQVQsQ0FBZ0JDLElBQWhCLENBQXFCRSxHQUFyQixDQUF5QkwsTUFBekIsQ0FBZ0N2WixDQUFoQyxDQUFGLEVBQXFDRCxFQUFFOFosTUFBRixDQUFTalosQ0FBVCxDQUFyQyxFQUFpREQsRUFBRUosT0FBRixDQUFVUixDQUFWLENBQWpEO0FBQThELFNBQW5JLE1BQXdJWSxFQUFFSCxNQUFGLENBQVMsSUFBVCxFQUFlLE9BQU9HLEVBQUVGLE9BQVQ7QUFBaUIsT0FBNU0sRUFBNk1xWixhQUFZLHVCQUFVO0FBQUMsZUFBTSxDQUFDLENBQUMvWixDQUFSO0FBQVUsT0FBOU8sRUFBK09nYSxXQUFVLG1CQUFTamEsQ0FBVCxFQUFXO0FBQUMsWUFBSUUsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9KLEVBQUVnYSxTQUFGLENBQVlqYSxDQUFaLEVBQWMsVUFBU0QsQ0FBVCxFQUFXO0FBQUNHLFlBQUVPLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQXZDLEdBQXlDRyxFQUFFUyxPQUFsRDtBQUEwRCxPQUEvVSxFQUFnVnVaLGVBQWMseUJBQVU7QUFBQyxlQUFPbGEsRUFBRTBaLE1BQUYsQ0FBU0MsTUFBVCxDQUFnQkMsSUFBaEIsQ0FBcUJPLFNBQTVCO0FBQXNDLE9BQS9ZLEVBQWdaQyxZQUFXLG9CQUFTcGEsQ0FBVCxFQUFXO0FBQUMsWUFBSUUsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9KLEVBQUVtYSxVQUFGLENBQWFwYSxDQUFiLEdBQWdCRSxFQUFFUyxPQUF6QjtBQUFpQyxPQUF4ZCxFQUF5ZHFOLFNBQVEsbUJBQVU7QUFBQy9OLFlBQUUsSUFBRjtBQUFPLE9BQW5mLEVBQU47QUFBMmYsR0FBcGlCLENBQTdFLENBRHQxa0IsRUFDMDhsQkwsUUFBUUMsTUFBUixDQUFlLGtDQUFmLEVBQWtELEVBQWxELEVBQXNEQyxPQUF0RCxDQUE4RCx3QkFBOUQsRUFBdUYsQ0FBQyxJQUFELEVBQU0sVUFBU0MsQ0FBVCxFQUFXO0FBQUMsV0FBTSxFQUFDc2EsTUFBSyxnQkFBVTtBQUFDLFlBQUlyYSxJQUFFRCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT2lhLGVBQWVELElBQWYsQ0FBb0IsVUFBU3RhLENBQVQsRUFBVztBQUFDLGlCQUFPQyxFQUFFUyxPQUFGLENBQVVWLENBQVYsQ0FBUDtBQUFvQixTQUFwRCxFQUFxRCxVQUFTQSxDQUFULEVBQVc7QUFBQyxpQkFBT0MsRUFBRVUsTUFBRixDQUFTWCxDQUFULENBQVA7QUFBbUIsU0FBcEYsR0FBc0ZDLEVBQUVXLE9BQS9GO0FBQXVHLE9BQXhJLEVBQXlJNFosU0FBUSxtQkFBVTtBQUFDLFlBQUl2YSxJQUFFRCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT2lhLGVBQWVDLE9BQWYsQ0FBdUIsVUFBU3hhLENBQVQsRUFBVztBQUFDLGlCQUFPQyxFQUFFUyxPQUFGLENBQVVWLENBQVYsQ0FBUDtBQUFvQixTQUF2RCxFQUF3RCxVQUFTQSxDQUFULEVBQVc7QUFBQyxpQkFBT0MsRUFBRVUsTUFBRixDQUFTWCxDQUFULENBQVA7QUFBbUIsU0FBdkYsR0FBeUZDLEVBQUVXLE9BQWxHO0FBQTBHLE9BQXRSLEVBQXVSNlosWUFBVyxzQkFBVTtBQUFDLFlBQUl4YSxJQUFFRCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT2lhLGVBQWVFLFVBQWYsQ0FBMEIsVUFBU3phLENBQVQsRUFBVztBQUFDLGlCQUFPQyxFQUFFUyxPQUFGLENBQVVWLENBQVYsQ0FBUDtBQUFvQixTQUExRCxFQUEyRCxVQUFTQSxDQUFULEVBQVc7QUFBQyxpQkFBT0MsRUFBRVUsTUFBRixDQUFTWCxDQUFULENBQVA7QUFBbUIsU0FBMUYsR0FBNEZDLEVBQUVXLE9BQXJHO0FBQTZHLE9BQTFhLEVBQTJhOFosWUFBVyxzQkFBVTtBQUFDLFlBQUl6YSxJQUFFRCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT2lhLGVBQWVHLFVBQWYsQ0FBMEIsVUFBUzFhLENBQVQsRUFBVztBQUFDLGlCQUFPQyxFQUFFUyxPQUFGLENBQVVWLENBQVYsQ0FBUDtBQUFvQixTQUExRCxFQUEyRCxVQUFTQSxDQUFULEVBQVc7QUFBQyxpQkFBT0MsRUFBRVUsTUFBRixDQUFTWCxDQUFULENBQVA7QUFBbUIsU0FBMUYsR0FBNEZDLEVBQUVXLE9BQXJHO0FBQTZHLE9BQTlqQixFQUErakIrWixhQUFZLHFCQUFTMWEsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9pYSxlQUFlSSxXQUFmLENBQTJCMWEsQ0FBM0IsRUFBNkIsVUFBU0QsQ0FBVCxFQUFXO0FBQUMsaUJBQU9FLEVBQUVRLE9BQUYsQ0FBVVYsQ0FBVixDQUFQO0FBQW9CLFNBQTdELEVBQThELFVBQVNBLENBQVQsRUFBVztBQUFDLGlCQUFPRSxFQUFFUyxNQUFGLENBQVNYLENBQVQsQ0FBUDtBQUFtQixTQUE3RixHQUErRkUsRUFBRVUsT0FBeEc7QUFBZ0gsT0FBdnRCLEVBQXd0QmdhLHFCQUFvQiwrQkFBVTtBQUFDLFlBQUkzYSxJQUFFRCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT2lhLGVBQWVLLG1CQUFmLENBQW1DLFVBQVM1YSxDQUFULEVBQVc7QUFBQyxpQkFBT0MsRUFBRVMsT0FBRixDQUFVVixDQUFWLENBQVA7QUFBb0IsU0FBbkUsRUFBb0UsVUFBU0EsQ0FBVCxFQUFXO0FBQUMsaUJBQU9DLEVBQUVVLE1BQUYsQ0FBU1gsQ0FBVCxDQUFQO0FBQW1CLFNBQW5HLEdBQXFHQyxFQUFFVyxPQUE5RztBQUFzSCxPQUE3M0IsRUFBODNCaWEsaUJBQWdCLHlCQUFTNWEsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9pYSxlQUFlTSxlQUFmLENBQStCNWEsQ0FBL0IsRUFBaUMsVUFBU0QsQ0FBVCxFQUFXO0FBQUMsaUJBQU9FLEVBQUVRLE9BQUYsQ0FBVVYsQ0FBVixDQUFQO0FBQW9CLFNBQWpFLEVBQWtFLFVBQVNBLENBQVQsRUFBVztBQUFDLGlCQUFPRSxFQUFFUyxNQUFGLENBQVNYLENBQVQsQ0FBUDtBQUFtQixTQUFqRyxHQUFtR0UsRUFBRVUsT0FBNUc7QUFBb0gsT0FBOWhDLEVBQStoQ2thLG1CQUFrQiwyQkFBUzdhLENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPaWEsZUFBZU8saUJBQWYsQ0FBaUM3YSxDQUFqQyxFQUFtQyxVQUFTRCxDQUFULEVBQVc7QUFBQyxpQkFBT0UsRUFBRVEsT0FBRixDQUFVVixDQUFWLENBQVA7QUFBb0IsU0FBbkUsRUFBb0UsVUFBU0EsQ0FBVCxFQUFXO0FBQUMsaUJBQU9FLEVBQUVTLE1BQUYsQ0FBU1gsQ0FBVCxDQUFQO0FBQW1CLFNBQW5HLEdBQXFHRSxFQUFFVSxPQUE5RztBQUFzSCxPQUFuc0MsRUFBb3NDbWEsc0JBQXFCLDhCQUFTOWEsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9pYSxlQUFlUSxvQkFBZixDQUFvQzlhLENBQXBDLEVBQXNDLFVBQVNELENBQVQsRUFBVztBQUFDLGlCQUFPRSxFQUFFUSxPQUFGLENBQVVWLENBQVYsQ0FBUDtBQUFvQixTQUF0RSxFQUF1RSxVQUFTQSxDQUFULEVBQVc7QUFBQyxpQkFBT0UsRUFBRVMsTUFBRixDQUFTWCxDQUFULENBQVA7QUFBbUIsU0FBdEcsR0FBd0dFLEVBQUVVLE9BQWpIO0FBQXlILE9BQTkyQyxFQUErMkNvYSxrQkFBaUIsNEJBQVU7QUFBQyxZQUFJL2EsSUFBRUQsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9pYSxlQUFlUyxnQkFBZixDQUFnQyxVQUFTaGIsQ0FBVCxFQUFXO0FBQUMsaUJBQU9DLEVBQUVTLE9BQUYsQ0FBVVYsQ0FBVixDQUFQO0FBQW9CLFNBQWhFLEVBQWlFLFVBQVNBLENBQVQsRUFBVztBQUFDLGlCQUFPQyxFQUFFVSxNQUFGLENBQVNYLENBQVQsQ0FBUDtBQUFtQixTQUFoRyxHQUFrR0MsRUFBRVcsT0FBM0c7QUFBbUgsT0FBOWdELEVBQU47QUFBc2hELEdBQXhpRCxDQUF2RixDQUQxOGxCLEVBQzRrcEJmLFFBQVFDLE1BQVIsQ0FBZSw4QkFBZixFQUE4QyxFQUE5QyxFQUFrREMsT0FBbEQsQ0FBMEQsb0JBQTFELEVBQStFLENBQUMsSUFBRCxFQUFNLFNBQU4sRUFBZ0IsVUFBU0MsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxXQUFNLEVBQUNnVCxPQUFNLGVBQVMvUyxDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBTyxLQUFLLENBQUwsS0FBU0osQ0FBVCxLQUFhQSxJQUFFLEVBQWYsR0FBbUJELEVBQUVrQyxPQUFGLENBQVU4WSxVQUFWLENBQXFCaEksS0FBckIsQ0FBMkIsRUFBQ2lJLFdBQVVoYixDQUFYLEVBQTNCLEVBQXlDLFVBQVNGLENBQVQsRUFBVztBQUFDRyxZQUFFTyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUFsRSxFQUFtRSxVQUFTQSxDQUFULEVBQVc7QUFBQ0csWUFBRVEsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBM0YsQ0FBbkIsRUFBZ0hHLEVBQUVTLE9BQXpIO0FBQWlJLE9BQXBLLEVBQXFLdWEsYUFBWSxxQkFBU2piLENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVILEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPLEtBQUssQ0FBTCxLQUFTSixDQUFULEtBQWFBLElBQUUsRUFBZixHQUFtQkQsRUFBRWtDLE9BQUYsQ0FBVThZLFVBQVYsQ0FBcUJHLGNBQXJCLENBQW9DLEVBQUNGLFdBQVVoYixDQUFYLEVBQXBDLEVBQWtELFVBQVNGLENBQVQsRUFBVztBQUFDRyxZQUFFTyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUEzRSxFQUE0RSxVQUFTQSxDQUFULEVBQVc7QUFBQ0csWUFBRVEsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBcEcsQ0FBbkIsRUFBeUhHLEVBQUVTLE9BQWxJO0FBQTBJLE9BQXZWLEVBQXdWMFMsUUFBTyxrQkFBVTtBQUFDLFlBQUlwVCxJQUFFRixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0JMLEVBQUVrQyxPQUFGLENBQVU4WSxVQUFWLENBQXFCM0gsTUFBckIsQ0FBNEIsVUFBU3RULENBQVQsRUFBVztBQUFDRSxZQUFFUSxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUFyRDtBQUF1RCxPQUFqYixFQUFrYnFLLFlBQVcsc0JBQVU7QUFBQyxZQUFJbkssSUFBRUYsRUFBRU0sS0FBRixFQUFOLENBQWdCTCxFQUFFa0MsT0FBRixDQUFVOFksVUFBVixDQUFxQjVRLFVBQXJCLENBQWdDLFVBQVNySyxDQUFULEVBQVc7QUFBQ0UsWUFBRVEsT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBekQ7QUFBMkQsT0FBbmhCLEVBQW9oQkssYUFBWSx1QkFBVTtBQUFDLFlBQUlILElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFa0MsT0FBRixDQUFVOFksVUFBVixDQUFxQjVhLFdBQXJCLENBQWlDLFVBQVNMLENBQVQsRUFBVztBQUFDQSxjQUFFRSxFQUFFUSxPQUFGLENBQVVWLENBQVYsQ0FBRixHQUFlRSxFQUFFUyxNQUFGLENBQVNYLENBQVQsQ0FBZjtBQUEyQixTQUF4RSxHQUEwRUUsRUFBRVUsT0FBbkY7QUFBMkYsT0FBdHBCLEVBQU47QUFBOHBCLEdBQTVyQixDQUEvRSxDQUQ1a3BCLEVBQzAxcUJmLFFBQVFDLE1BQVIsQ0FBZSw2QkFBZixFQUE2QyxFQUE3QyxFQUFpREMsT0FBakQsQ0FBeUQsbUJBQXpELEVBQTZFLENBQUMsSUFBRCxFQUFNLFNBQU4sRUFBZ0IsVUFBU0MsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxXQUFNLEVBQUNJLGFBQVksdUJBQVU7QUFBQyxZQUFJSCxJQUFFRixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRWtDLE9BQUYsQ0FBVWtaLFNBQVYsQ0FBb0I5UCxTQUFwQixDQUE4QixVQUFTdkwsQ0FBVCxFQUFXO0FBQUNFLFlBQUVRLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQXZELEVBQXdELFVBQVNBLENBQVQsRUFBVztBQUFDRSxZQUFFUyxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUFoRixHQUFrRkUsRUFBRVUsT0FBM0Y7QUFBbUcsT0FBM0ksRUFBNEkwYSxpQkFBZ0IseUJBQVNwYixDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0osSUFBRUEsS0FBRyxnQ0FBTCxFQUFzQ0QsRUFBRWtDLE9BQUYsQ0FBVWtaLFNBQVYsQ0FBb0JDLGVBQXBCLENBQW9DLEVBQUNsYixNQUFLRixDQUFOLEVBQXBDLEVBQTZDLFVBQVNGLENBQVQsRUFBVztBQUFDRyxZQUFFTyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUF0RSxFQUF1RSxVQUFTQSxDQUFULEVBQVc7QUFBQ0csWUFBRVEsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBL0YsQ0FBdEMsRUFBdUlHLEVBQUVTLE9BQWhKO0FBQXdKLE9BQWhWLEVBQWlWMmEsc0JBQXFCLDhCQUFTcmIsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxZQUFJVyxJQUFFZCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0osSUFBRUEsS0FBRyxDQUFDLDJDQUFELEVBQTZDLDRDQUE3QyxFQUEwRixnQ0FBMUYsQ0FBTCxFQUFpSUMsSUFBRUEsS0FBRyxDQUFDLDRDQUFELEVBQThDLGdDQUE5QyxFQUErRSx5Q0FBL0UsQ0FBdEksRUFBZ1FGLEVBQUVrQyxPQUFGLENBQVVrWixTQUFWLENBQW9CRSxvQkFBcEIsQ0FBeUMsRUFBQ0MsV0FBVXRiLENBQVgsRUFBYXViLFlBQVd0YixDQUF4QixFQUF6QyxFQUFvRSxVQUFTSCxDQUFULEVBQVc7QUFBQ2MsWUFBRUosT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBN0YsRUFBOEYsVUFBU0EsQ0FBVCxFQUFXO0FBQUNjLFlBQUVILE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQXRILENBQWhRLEVBQXdYYyxFQUFFRixPQUFqWTtBQUF5WSxPQUE3d0IsRUFBOHdCOGEsaUJBQWdCLDJCQUFVO0FBQUMsWUFBSXhiLElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFa0MsT0FBRixDQUFVa1osU0FBVixDQUFvQkssZUFBcEIsQ0FBb0MsVUFBUzFiLENBQVQsRUFBVztBQUFDRSxZQUFFUSxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUE3RCxFQUE4RCxVQUFTQSxDQUFULEVBQVc7QUFBQ0UsWUFBRVEsT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBdkYsR0FBeUZFLEVBQUVVLE9BQWxHO0FBQTBHLE9BQW42QixFQUFvNkIrYSxZQUFXLHNCQUFVO0FBQUMsWUFBSXpiLElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFa0MsT0FBRixDQUFVa1osU0FBVixDQUFvQk0sVUFBcEIsQ0FBK0IsVUFBUzNiLENBQVQsRUFBVztBQUFDRSxZQUFFUSxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUF4RCxFQUF5RCxVQUFTQSxDQUFULEVBQVc7QUFBQ0UsWUFBRVEsT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBbEYsR0FBb0ZFLEVBQUVVLE9BQTdGO0FBQXFHLE9BQS9pQyxFQUFnakNnYixZQUFXLG9CQUFTMWIsQ0FBVCxFQUFXQyxDQUFYLEVBQWFXLENBQWIsRUFBZTtBQUFDLFlBQUlDLElBQUVmLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFa0MsT0FBRixDQUFVa1osU0FBVixDQUFvQk8sVUFBcEIsQ0FBK0IsRUFBQ0MsTUFBSzFiLEtBQUcsSUFBVCxFQUFjMmIsUUFBTzViLENBQXJCLEVBQXVCK1AsTUFBS25QLEtBQUcsSUFBSThMLElBQUosRUFBL0IsRUFBL0IsRUFBd0UsVUFBUzVNLENBQVQsRUFBVztBQUFDZSxZQUFFTCxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUFqRyxFQUFrRyxVQUFTQSxDQUFULEVBQVc7QUFBQ2UsWUFBRUwsT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBM0gsR0FBNkhlLEVBQUVILE9BQXRJO0FBQThJLE9BQXp1QyxFQUEwdUNtYixZQUFXLG9CQUFTN2IsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVrQyxPQUFGLENBQVVrWixTQUFWLENBQW9CVSxVQUFwQixDQUErQixFQUFDRixNQUFLM2IsS0FBRyxJQUFULEVBQS9CLEVBQThDLFVBQVNGLENBQVQsRUFBVztBQUFDRyxZQUFFTyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUF2RSxFQUF3RSxVQUFTQSxDQUFULEVBQVc7QUFBQ0csWUFBRU8sT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBakcsR0FBbUdHLEVBQUVTLE9BQTVHO0FBQW9ILE9BQXI0QyxFQUFzNENvYixZQUFXLG9CQUFTOWIsQ0FBVCxFQUFXQyxDQUFYLEVBQWFXLENBQWIsRUFBZTtBQUFDLFlBQUlDLElBQUVmLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFa0MsT0FBRixDQUFVa1osU0FBVixDQUFvQlcsVUFBcEIsQ0FBK0IsRUFBQ0gsTUFBSzFiLEtBQUcsSUFBVCxFQUFjMmIsUUFBTzViLENBQXJCLEVBQXVCK1AsTUFBS25QLEtBQUcsSUFBSThMLElBQUosRUFBL0IsRUFBL0IsRUFBd0UsVUFBUzVNLENBQVQsRUFBVztBQUFDZSxZQUFFTCxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUFqRyxFQUFrRyxVQUFTQSxDQUFULEVBQVc7QUFBQ2UsWUFBRUwsT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBM0gsR0FBNkhlLEVBQUVILE9BQXRJO0FBQThJLE9BQS9qRCxFQUFna0RxYixZQUFXLG9CQUFTL2IsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVrQyxPQUFGLENBQVVrWixTQUFWLENBQW9CWSxVQUFwQixDQUErQixFQUFDSixNQUFLM2IsS0FBRyxJQUFULEVBQS9CLEVBQThDLFVBQVNGLENBQVQsRUFBVztBQUFDRyxZQUFFTyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUF2RSxFQUF3RSxVQUFTQSxDQUFULEVBQVc7QUFBQ0csWUFBRU8sT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBakcsR0FBbUdHLEVBQUVTLE9BQTVHO0FBQW9ILE9BQTN0RCxFQUE0dERzYixjQUFhLHdCQUFVO0FBQUMsWUFBSWhjLElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFa0MsT0FBRixDQUFVa1osU0FBVixDQUFvQmEsWUFBcEIsQ0FBaUMsRUFBakMsRUFBb0MsVUFBU2xjLENBQVQsRUFBVztBQUFDRSxZQUFFUSxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUE3RCxFQUE4RCxVQUFTQSxDQUFULEVBQVc7QUFBQ0UsWUFBRVEsT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBdkYsR0FBeUZFLEVBQUVVLE9BQWxHO0FBQTBHLE9BQTkyRCxFQUErMkR1YixhQUFZLHFCQUFTamMsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVrQyxPQUFGLENBQVVrWixTQUFWLENBQW9CYyxXQUFwQixDQUFnQ2pjLENBQWhDLEVBQWtDLFVBQVNGLENBQVQsRUFBVztBQUFDRyxZQUFFTyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUEzRCxFQUE0RCxVQUFTQSxDQUFULEVBQVc7QUFBQ0csWUFBRU8sT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBckYsR0FBdUZHLEVBQUVTLE9BQWhHO0FBQXdHLE9BQS8vRCxFQUFnZ0V3YixpQkFBZ0IseUJBQVNsYyxDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRWtDLE9BQUYsQ0FBVWtaLFNBQVYsQ0FBb0JlLGVBQXBCLENBQW9DbGMsQ0FBcEMsRUFBc0MsVUFBU0YsQ0FBVCxFQUFXO0FBQUNHLFlBQUVPLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQS9ELEVBQWdFLFVBQVNBLENBQVQsRUFBVztBQUFDRyxZQUFFTyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUF6RixHQUEyRkcsRUFBRVMsT0FBcEc7QUFBNEcsT0FBeHBFLEVBQU47QUFBZ3FFLEdBQTlyRSxDQUE3RSxDQUQxMXFCLEVBQ3dtdkJmLFFBQVFDLE1BQVIsQ0FBZSx5QkFBZixFQUF5QyxFQUF6QyxFQUE2Q0MsT0FBN0MsQ0FBcUQsZUFBckQsRUFBcUUsQ0FBQyxJQUFELEVBQU0sVUFBU0MsQ0FBVCxFQUFXO0FBQUMsV0FBTSxFQUFDcWMsYUFBWSxxQkFBU3BjLENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPRSxRQUFRMkIsT0FBUixDQUFnQm1hLFFBQWhCLENBQXlCRCxXQUF6QixDQUFxQ3BjLENBQXJDLEVBQXVDLFlBQVU7QUFBQ0MsWUFBRVEsT0FBRjtBQUFZLFNBQTlELEVBQStELFlBQVU7QUFBQ1IsWUFBRVMsTUFBRjtBQUFXLFNBQXJGLEdBQXVGVCxFQUFFVSxPQUFoRztBQUF3RyxPQUFqSixFQUFrSjJiLFlBQVcsc0JBQVU7QUFBQyxZQUFJdGMsSUFBRUQsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9FLFFBQVEyQixPQUFSLENBQWdCbWEsUUFBaEIsQ0FBeUJDLFVBQXpCLENBQW9DLFlBQVU7QUFBQ3RjLFlBQUVTLE9BQUY7QUFBWSxTQUEzRCxFQUE0RCxZQUFVO0FBQUNULFlBQUVVLE1BQUY7QUFBVyxTQUFsRixHQUFvRlYsRUFBRVcsT0FBN0Y7QUFBcUcsT0FBN1IsRUFBOFI0YixRQUFPLGtCQUFVO0FBQUMsWUFBSXZjLElBQUVELEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPRSxRQUFRMkIsT0FBUixDQUFnQm1hLFFBQWhCLENBQXlCRSxNQUF6QixDQUFnQyxVQUFTeGMsQ0FBVCxFQUFXO0FBQUNDLFlBQUVTLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQXpELEVBQTBELFlBQVU7QUFBQ0MsWUFBRVUsTUFBRjtBQUFXLFNBQWhGLEdBQWtGVixFQUFFVyxPQUEzRjtBQUFtRyxPQUFuYSxFQUFvYTZiLGNBQWEsd0JBQVU7QUFBQyxZQUFJeGMsSUFBRUQsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9FLFFBQVEyQixPQUFSLENBQWdCbWEsUUFBaEIsQ0FBeUJHLFlBQXpCLENBQXNDLFVBQVN6YyxDQUFULEVBQVc7QUFBQ0MsWUFBRVMsT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBL0QsRUFBZ0UsWUFBVTtBQUFDQyxZQUFFVSxNQUFGO0FBQVcsU0FBdEYsR0FBd0ZWLEVBQUVXLE9BQWpHO0FBQXlHLE9BQXJqQixFQUFOO0FBQTZqQixHQUEva0IsQ0FBckUsQ0FEeG12QixFQUMrdndCZixRQUFRQyxNQUFSLENBQWUsdUJBQWYsRUFBdUMsRUFBdkMsRUFBMkNDLE9BQTNDLENBQW1ELGFBQW5ELEVBQWlFLENBQUMsSUFBRCxFQUFNLFNBQU4sRUFBZ0IsVUFBU0MsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxXQUFNLEVBQUNzVCxZQUFXLG9CQUFTclQsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUV5YyxHQUFGLENBQU1uSixVQUFOLENBQWlCclQsQ0FBakIsRUFBbUIsWUFBVTtBQUFDQyxZQUFFTyxPQUFGO0FBQVksU0FBMUMsRUFBMkMsWUFBVTtBQUFDUCxZQUFFUSxNQUFGO0FBQVcsU0FBakUsR0FBbUVSLEVBQUVTLE9BQTVFO0FBQW9GLE9BQTVILEVBQTZINlMsY0FBYSxzQkFBU3ZULENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVILEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFeWMsR0FBRixDQUFNakosWUFBTixDQUFtQnZULENBQW5CLEVBQXFCLFlBQVU7QUFBQ0MsWUFBRU8sT0FBRjtBQUFZLFNBQTVDLEVBQTZDLFlBQVU7QUFBQ1AsWUFBRVEsTUFBRjtBQUFXLFNBQW5FLEdBQXFFUixFQUFFUyxPQUE5RTtBQUFzRixPQUE1UCxFQUE2UDhTLGNBQWEsd0JBQVU7QUFBQyxZQUFJeFQsSUFBRUYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUV5YyxHQUFGLENBQU1oSixZQUFOLENBQW1CLFlBQVU7QUFBQ3hULFlBQUVRLE9BQUY7QUFBWSxTQUExQyxFQUEyQyxZQUFVO0FBQUNSLFlBQUVTLE1BQUY7QUFBVyxTQUFqRSxHQUFtRVQsRUFBRVUsT0FBNUU7QUFBb0YsT0FBelgsRUFBMFgrUyxZQUFXLG9CQUFTelQsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUV5YyxHQUFGLENBQU0vSSxVQUFOLENBQWlCelQsQ0FBakIsRUFBbUIsWUFBVTtBQUFDQyxZQUFFTyxPQUFGO0FBQVksU0FBMUMsRUFBMkMsWUFBVTtBQUFDUCxZQUFFUSxNQUFGO0FBQVcsU0FBakUsR0FBbUVSLEVBQUVTLE9BQTVFO0FBQW9GLE9BQXJmLEVBQXNmZ1QsZ0JBQWUsd0JBQVMxVCxDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFlBQUlXLElBQUVkLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFeWMsR0FBRixDQUFNOUksY0FBTixDQUFxQjFULENBQXJCLEVBQXVCQyxDQUF2QixFQUF5QixZQUFVO0FBQUNXLFlBQUVKLE9BQUY7QUFBWSxTQUFoRCxFQUFpRCxZQUFVO0FBQUNJLFlBQUVILE1BQUY7QUFBVyxTQUF2RSxHQUF5RUcsRUFBRUYsT0FBbEY7QUFBMEYsT0FBN25CLEVBQThuQmlULFlBQVcsc0JBQVU7QUFBQyxZQUFJM1QsSUFBRUYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUV5YyxHQUFGLENBQU03SSxVQUFOLENBQWlCLFlBQVU7QUFBQzNULFlBQUVRLE9BQUY7QUFBWSxTQUF4QyxFQUF5QyxZQUFVO0FBQUNSLFlBQUVTLE1BQUY7QUFBVyxTQUEvRCxHQUFpRVQsRUFBRVUsT0FBMUU7QUFBa0YsT0FBdHZCLEVBQXV2QmtULHFCQUFvQiw2QkFBUzVULENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVILEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFeWMsR0FBRixDQUFNNUksbUJBQU4sQ0FBMEI1VCxDQUExQixFQUE0QixZQUFVO0FBQUNDLFlBQUVPLE9BQUY7QUFBWSxTQUFuRCxFQUFvRCxZQUFVO0FBQUNQLFlBQUVRLE1BQUY7QUFBVyxTQUExRSxHQUE0RVIsRUFBRVMsT0FBckY7QUFBNkYsT0FBcDRCLEVBQXE0Qm1ULGtCQUFpQiw0QkFBVTtBQUFDLFlBQUk3VCxJQUFFRixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRXljLEdBQUYsQ0FBTTNJLGdCQUFOLENBQXVCLFlBQVU7QUFBQzdULFlBQUVRLE9BQUY7QUFBWSxTQUE5QyxFQUErQyxZQUFVO0FBQUNSLFlBQUVTLE1BQUY7QUFBVyxTQUFyRSxHQUF1RVQsRUFBRVUsT0FBaEY7QUFBd0YsT0FBemdDLEVBQU47QUFBaWhDLEdBQS9pQyxDQUFqRSxDQUQvdndCLEVBQ2szeUJmLFFBQVFDLE1BQVIsQ0FBZSwrQkFBZixFQUErQyxFQUEvQyxFQUFtREMsT0FBbkQsQ0FBMkQscUJBQTNELEVBQWlGLENBQUMsSUFBRCxFQUFNLFNBQU4sRUFBZ0IsVUFBU0MsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxXQUFNLEVBQUMwYyxhQUFZLHFCQUFTemMsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUUyYyxXQUFGLENBQWNELFdBQWQsQ0FBMEIsVUFBUzNjLENBQVQsRUFBVztBQUFDRyxZQUFFTyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUFuRCxFQUFvRCxVQUFTQSxDQUFULEVBQVc7QUFBQ0csWUFBRVEsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBNUUsRUFBNkVFLENBQTdFLEdBQWdGQyxFQUFFUyxPQUF6RjtBQUFpRyxPQUExSSxFQUFOO0FBQWtKLEdBQWhMLENBQWpGLENBRGwzeUIsRUFDc256QmYsUUFBUUMsTUFBUixDQUFlLGdDQUFmLEVBQWdELEVBQWhELEVBQW9EZ0QsUUFBcEQsQ0FBNkQsc0JBQTdELEVBQW9GLENBQUMsWUFBVTtBQUFDLFFBQUk5QyxDQUFKO0FBQUEsUUFBTUMsSUFBRSxLQUFLNGMsY0FBTCxHQUFvQixFQUE1QixDQUErQixLQUFLQyxpQkFBTCxHQUF1QixVQUFTOWMsQ0FBVCxFQUFXO0FBQUNDLFVBQUVKLFFBQVE2RSxNQUFSLENBQWV6RSxDQUFmLEVBQWlCRCxDQUFqQixDQUFGO0FBQXNCLEtBQXpELEVBQTBELEtBQUs0RSxJQUFMLEdBQVUsQ0FBQyxZQUFELEVBQWMsSUFBZCxFQUFtQixTQUFuQixFQUE2QixVQUE3QixFQUF3QyxVQUFTMUUsQ0FBVCxFQUFXQyxDQUFYLEVBQWFXLENBQWIsRUFBZUMsQ0FBZixFQUFpQjtBQUFDLGFBQU0sRUFBQzRSLE1BQUssY0FBUzNSLENBQVQsRUFBV0MsQ0FBWCxFQUFhQyxDQUFiLEVBQWU7QUFBQyxjQUFJQyxJQUFFaEIsRUFBRUcsS0FBRixFQUFOLENBQWdCLElBQUdZLEtBQUcsQ0FBQ3JCLFFBQVFtRCxRQUFSLENBQWlCOUIsQ0FBakIsQ0FBUCxFQUEyQixPQUFPQyxFQUFFUixNQUFGLENBQVMsMkJBQVQsR0FBc0NRLEVBQUVQLE9BQS9DLENBQXVELElBQUlRLElBQUV2QixRQUFRNkUsTUFBUixDQUFlLEVBQWYsRUFBa0J6RSxDQUFsQixFQUFvQmlCLENBQXBCLENBQU47QUFBQSxjQUE2QkcsSUFBRSxFQUEvQixDQUFrQ3hCLFFBQVFrZCxPQUFSLENBQWdCM2IsQ0FBaEIsRUFBa0IsVUFBU3BCLENBQVQsRUFBV0MsQ0FBWCxFQUFhO0FBQUNvQixjQUFFTSxJQUFGLENBQU8xQixJQUFFLEdBQUYsR0FBTUQsQ0FBYjtBQUFnQixXQUFoRCxFQUFrRCxJQUFJZ2QsSUFBRTNiLEVBQUU0YixJQUFGLEVBQU4sQ0FBZSxPQUFPamQsSUFBRWMsRUFBRTZSLElBQUYsQ0FBTzNSLENBQVAsRUFBU0MsQ0FBVCxFQUFXK2IsQ0FBWCxDQUFGLEVBQWdCaGQsRUFBRWdILGdCQUFGLENBQW1CLFdBQW5CLEVBQStCLFVBQVNoSCxDQUFULEVBQVc7QUFBQ2UsY0FBRSxZQUFVO0FBQUNiLGdCQUFFNEcsVUFBRixDQUFhLGdDQUFiLEVBQThDOUcsQ0FBOUM7QUFBaUQsYUFBOUQ7QUFBZ0UsV0FBM0csRUFBNEcsQ0FBQyxDQUE3RyxDQUFoQixFQUFnSUEsRUFBRWdILGdCQUFGLENBQW1CLFVBQW5CLEVBQThCLFVBQVNoSCxDQUFULEVBQVc7QUFBQ21CLGNBQUVULE9BQUYsQ0FBVVYsQ0FBVixHQUFhZSxFQUFFLFlBQVU7QUFBQ2IsZ0JBQUU0RyxVQUFGLENBQWEsK0JBQWIsRUFBNkM5RyxDQUE3QztBQUFnRCxhQUE3RCxDQUFiO0FBQTRFLFdBQXRILEVBQXVILENBQUMsQ0FBeEgsQ0FBaEksRUFBMlBBLEVBQUVnSCxnQkFBRixDQUFtQixXQUFuQixFQUErQixVQUFTaEgsQ0FBVCxFQUFXO0FBQUNtQixjQUFFUixNQUFGLENBQVNYLENBQVQsR0FBWWUsRUFBRSxZQUFVO0FBQUNiLGdCQUFFNEcsVUFBRixDQUFhLGdDQUFiLEVBQThDOUcsQ0FBOUM7QUFBaUQsYUFBOUQsQ0FBWjtBQUE0RSxXQUF2SCxFQUF3SCxDQUFDLENBQXpILENBQTNQLEVBQXVYQSxFQUFFZ0gsZ0JBQUYsQ0FBbUIsTUFBbkIsRUFBMEIsVUFBU2hILENBQVQsRUFBVztBQUFDZSxjQUFFLFlBQVU7QUFBQ2IsZ0JBQUU0RyxVQUFGLENBQWEsMkJBQWIsRUFBeUM5RyxDQUF6QztBQUE0QyxhQUF6RDtBQUEyRCxXQUFqRyxFQUFrRyxDQUFDLENBQW5HLENBQXZYLEVBQTZkbUIsRUFBRVAsT0FBdGU7QUFBOGUsU0FBenNCLEVBQTBzQnNjLE9BQU0saUJBQVU7QUFBQ2xkLFlBQUVrZCxLQUFGLElBQVVsZCxJQUFFLElBQVo7QUFBaUIsU0FBNXVCLEVBQTZ1QmtDLE1BQUssZ0JBQVU7QUFBQ2xDLFlBQUVrQyxJQUFGO0FBQVMsU0FBdHdCLEVBQXV3QmliLGVBQWMsdUJBQVNsZCxDQUFULEVBQVc7QUFBQyxjQUFJQyxJQUFFQyxFQUFFRyxLQUFGLEVBQU4sQ0FBZ0IsT0FBT04sRUFBRW1kLGFBQUYsQ0FBZ0JsZCxDQUFoQixFQUFrQixVQUFTRCxDQUFULEVBQVc7QUFBQ0UsY0FBRVEsT0FBRixDQUFVVixDQUFWO0FBQWEsV0FBM0MsR0FBNkNFLEVBQUVVLE9BQXREO0FBQThELFNBQS8yQixFQUFnM0J3YyxXQUFVLG1CQUFTbmQsQ0FBVCxFQUFXO0FBQUMsY0FBSUMsSUFBRUMsRUFBRUcsS0FBRixFQUFOLENBQWdCLE9BQU9OLEVBQUVvZCxTQUFGLENBQVluZCxDQUFaLEVBQWMsVUFBU0QsQ0FBVCxFQUFXO0FBQUNFLGNBQUVRLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFdBQXZDLEdBQXlDRSxFQUFFVSxPQUFsRDtBQUEwRCxTQUFoOUIsRUFBTjtBQUF3OUIsS0FBbGhDLENBQXBFO0FBQXdsQyxHQUFub0MsQ0FBcEYsQ0FEdG56QixFQUNnMTFCZixRQUFRQyxNQUFSLENBQWUsNEJBQWYsRUFBNEMsRUFBNUMsRUFBZ0RDLE9BQWhELENBQXdELGtCQUF4RCxFQUEyRSxDQUFDLFNBQUQsRUFBVyxVQUFTQyxDQUFULEVBQVc7QUFBQyxXQUFNLEVBQUNxZCxXQUFVLHFCQUFVO0FBQUMsZUFBT3JkLEVBQUVtQyxPQUFGLENBQVVtYixRQUFWLENBQW1CRCxTQUFuQixFQUFQO0FBQXNDLE9BQTVELEVBQTZERSxpQkFBZ0IsMkJBQVU7QUFBQyxlQUFPdmQsRUFBRW1DLE9BQUYsQ0FBVW1iLFFBQVYsQ0FBbUJDLGVBQW5CLEVBQVA7QUFBNEMsT0FBcEksRUFBTjtBQUE0SSxHQUFuSyxDQUEzRSxDQURoMTFCLEVBQ2lrMkIxZCxRQUFRQyxNQUFSLENBQWUsNkJBQWYsRUFBNkMsRUFBN0MsRUFBaURDLE9BQWpELENBQXlELG1CQUF6RCxFQUE2RSxDQUFDLElBQUQsRUFBTSxVQUFTQyxDQUFULEVBQVc7QUFBQyxXQUFNLEVBQUN3ZCxPQUFNLGVBQVN2ZCxDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFRixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0MsT0FBT2tkLFNBQVAsSUFBa0JBLFVBQVVELEtBQVYsQ0FBZ0J2ZCxFQUFFeWQsS0FBbEIsRUFBd0J6ZCxFQUFFMGQsT0FBMUIsRUFBa0MsVUFBUzNkLENBQVQsRUFBVztBQUFDQSxjQUFFRSxFQUFFUyxNQUFGLENBQVNYLENBQVQsQ0FBRixHQUFjRSxFQUFFUSxPQUFGLENBQVUsQ0FBQyxDQUFYLENBQWQ7QUFBNEIsU0FBMUUsR0FBNEVSLEVBQUVVLE9BQWhHLEtBQTBHZ2QsUUFBUWxJLEtBQVIsQ0FBYyx5RUFBZCxHQUF5RnhWLEVBQUVRLE9BQUYsQ0FBVSxJQUFWLENBQXpGLEVBQXlHUixFQUFFVSxPQUFyTixDQUFQO0FBQXFPLE9BQXhRLEVBQXlRaWQsYUFBWSx1QkFBVTtBQUFDLFlBQUk1ZCxJQUFFRCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0MsT0FBT2tkLFNBQVAsSUFBa0JBLFVBQVVJLFdBQVYsQ0FBc0IsVUFBUzdkLENBQVQsRUFBV0UsQ0FBWCxFQUFhO0FBQUNGLGNBQUVDLEVBQUVVLE1BQUYsQ0FBU1gsQ0FBVCxDQUFGLEdBQWNDLEVBQUVTLE9BQUYsQ0FBVVIsQ0FBVixDQUFkO0FBQTJCLFNBQS9ELEdBQWlFRCxFQUFFVyxPQUFyRixLQUErRmdkLFFBQVFsSSxLQUFSLENBQWMsK0VBQWQsR0FBK0Z6VixFQUFFUyxPQUFGLENBQVUsSUFBVixDQUEvRixFQUErR1QsRUFBRVcsT0FBaE4sQ0FBUDtBQUFnTyxPQUFoaEIsRUFBTjtBQUF3aEIsR0FBMWlCLENBQTdFLENBRGprMkIsRUFDMnIzQmYsUUFBUUMsTUFBUixDQUFlLDRCQUFmLEVBQTRDLEVBQTVDLEVBQWdEQyxPQUFoRCxDQUF3RCxrQkFBeEQsRUFBMkUsQ0FBQyxZQUFELEVBQWMsVUFBU0MsQ0FBVCxFQUFXO0FBQUMsUUFBSUMsSUFBRSxTQUFGQSxDQUFFLEdBQVU7QUFBQ0QsUUFBRThkLFVBQUYsQ0FBYSxZQUFVO0FBQUM5ZCxVQUFFOEcsVUFBRixDQUFhLHVCQUFiO0FBQXNDLE9BQTlEO0FBQWdFLEtBQWpGO0FBQUEsUUFBa0Y1RyxJQUFFLFNBQUZBLENBQUUsR0FBVTtBQUFDRixRQUFFOGQsVUFBRixDQUFhLFlBQVU7QUFBQzlkLFVBQUU4RyxVQUFGLENBQWEsdUJBQWI7QUFBc0MsT0FBOUQ7QUFBZ0UsS0FBL0osQ0FBZ0ssT0FBT0MsU0FBU0MsZ0JBQVQsQ0FBMEIsYUFBMUIsRUFBd0MsWUFBVTtBQUFDeEcsY0FBUTJCLE9BQVIsQ0FBZ0I0YixRQUFoQixLQUEyQnhkLE9BQU95RyxnQkFBUCxDQUF3QixxQkFBeEIsRUFBOEMvRyxDQUE5QyxFQUFnRCxDQUFDLENBQWpELEdBQW9ETSxPQUFPeUcsZ0JBQVAsQ0FBd0IscUJBQXhCLEVBQThDOUcsQ0FBOUMsRUFBZ0QsQ0FBQyxDQUFqRCxDQUEvRTtBQUFvSSxLQUF2TCxHQUF5TCxFQUFDOGQsa0JBQWlCLDBCQUFTaGUsQ0FBVCxFQUFXO0FBQUMsZUFBT1EsUUFBUTJCLE9BQVIsQ0FBZ0I0YixRQUFoQixDQUF5QkUsd0JBQXpCLENBQWtEamUsQ0FBbEQsQ0FBUDtBQUE0RCxPQUExRixFQUEyRmtkLE9BQU0saUJBQVU7QUFBQyxlQUFPMWMsUUFBUTJCLE9BQVIsQ0FBZ0I0YixRQUFoQixDQUF5QmIsS0FBekIsRUFBUDtBQUF3QyxPQUFwSixFQUFxSmhiLE1BQUssZ0JBQVU7QUFBQyxlQUFPMUIsUUFBUTJCLE9BQVIsQ0FBZ0I0YixRQUFoQixDQUF5QjdiLElBQXpCLEVBQVA7QUFBdUMsT0FBNU0sRUFBNk1nYyxlQUFjLHVCQUFTbGUsQ0FBVCxFQUFXO0FBQUMsZUFBT1EsUUFBUTJCLE9BQVIsQ0FBZ0I0YixRQUFoQixDQUF5QkcsYUFBekIsQ0FBdUNsZSxDQUF2QyxDQUFQO0FBQWlELE9BQXhSLEVBQXlSbWUsV0FBVSxxQkFBVTtBQUFDLGVBQU8zZCxRQUFRMkIsT0FBUixDQUFnQjRiLFFBQWhCLENBQXlCSSxTQUFoQztBQUEwQyxPQUF4VixFQUF5VkMsZ0JBQWUsMEJBQVU7QUFBQ3JYLGlCQUFTc1gsbUJBQVQsQ0FBNkIscUJBQTdCLEVBQW1EcGUsQ0FBbkQsR0FBc0RELEVBQUVzZSxXQUFGLENBQWMsdUJBQWQsSUFBdUMsRUFBN0Y7QUFBZ0csT0FBbmQsRUFBb2RDLGdCQUFlLDBCQUFVO0FBQUN4WCxpQkFBU3NYLG1CQUFULENBQTZCLHFCQUE3QixFQUFtRG5lLENBQW5ELEdBQXNERixFQUFFc2UsV0FBRixDQUFjLHVCQUFkLElBQXVDLEVBQTdGO0FBQWdHLE9BQTlrQixFQUFoTTtBQUFneEIsR0FBMThCLENBQTNFLENBRDNyM0IsRUFDbXQ1QnplLFFBQVFDLE1BQVIsQ0FBZSw0QkFBZixFQUE0QyxFQUE1QyxFQUFnREMsT0FBaEQsQ0FBd0Qsa0JBQXhELEVBQTJFLENBQUMsSUFBRCxFQUFNLFVBQVNDLENBQVQsRUFBVztBQUFDLFdBQU0sRUFBQ3dlLFdBQVUsbUJBQVN2ZSxDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFlBQUlDLElBQUVILEVBQUVNLEtBQUYsRUFBTjtBQUFBLFlBQWdCUSxJQUFFLElBQUkyZCxRQUFKLEVBQWxCLENBQStCLE9BQU8zZCxFQUFFMGQsU0FBRixDQUFZcmUsRUFBRU8sT0FBZCxFQUFzQlAsRUFBRVEsTUFBeEIsRUFBK0JWLENBQS9CLEVBQWlDQyxDQUFqQyxHQUFvQ0MsRUFBRVMsT0FBN0M7QUFBcUQsT0FBN0csRUFBOEc4ZCxXQUFVLG1CQUFTemUsQ0FBVCxFQUFXQyxDQUFYLEVBQWFDLENBQWIsRUFBZTtBQUFDLFlBQUlXLElBQUVkLEVBQUVNLEtBQUYsRUFBTjtBQUFBLFlBQWdCUyxJQUFFLElBQUkwZCxRQUFKLEVBQWxCLENBQStCLE9BQU8xZCxFQUFFMmQsU0FBRixDQUFZNWQsRUFBRUosT0FBZCxFQUFzQkksRUFBRUgsTUFBeEIsRUFBK0JWLENBQS9CLEVBQWlDQyxDQUFqQyxFQUFtQ0MsQ0FBbkMsR0FBc0NXLEVBQUVGLE9BQS9DO0FBQXVELE9BQTlOLEVBQStOK2QsY0FBYSxzQkFBUzFlLENBQVQsRUFBV0MsQ0FBWCxFQUFhO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOO0FBQUEsWUFBZ0JRLElBQUUsSUFBSTJkLFFBQUosRUFBbEIsQ0FBK0IsT0FBTzNkLEVBQUU2ZCxZQUFGLENBQWV4ZSxFQUFFTyxPQUFqQixFQUF5QlAsRUFBRVEsTUFBM0IsRUFBa0NWLENBQWxDLEVBQW9DQyxDQUFwQyxHQUF1Q0MsRUFBRVMsT0FBaEQ7QUFBd0QsT0FBalYsRUFBTjtBQUF5VixHQUEzVyxDQUEzRSxDQURudDVCLEVBQzRvNkJmLFFBQVFDLE1BQVIsQ0FBZSxtQ0FBZixFQUFtRCxFQUFuRCxFQUF1REMsT0FBdkQsQ0FBK0QseUJBQS9ELEVBQXlGLENBQUMsSUFBRCxFQUFNLFVBQVNDLENBQVQsRUFBVztBQUFDLFdBQU0sRUFBQzRlLFVBQVMsa0JBQVMzZSxDQUFULEVBQVdDLENBQVgsRUFBYUMsQ0FBYixFQUFlO0FBQUMsWUFBSVcsSUFBRWQsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU91ZSxnQkFBZ0JELFFBQWhCLENBQXlCM2UsQ0FBekIsRUFBMkJDLENBQTNCLEVBQTZCLFlBQVU7QUFBQ1ksWUFBRUosT0FBRjtBQUFZLFNBQXBELEVBQXFELFVBQVNWLENBQVQsRUFBVztBQUFDYyxZQUFFSCxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUE3RSxFQUE4RUcsQ0FBOUUsR0FBaUZXLEVBQUVGLE9BQTFGO0FBQWtHLE9BQTVJLEVBQU47QUFBb0osR0FBdEssQ0FBekYsQ0FENW82QixFQUM4NDZCZixRQUFRQyxNQUFSLENBQWUscUNBQWYsRUFBcUQsRUFBckQsRUFBeURDLE9BQXpELENBQWlFLDJCQUFqRSxFQUE2RixDQUFDLElBQUQsRUFBTSxTQUFOLEVBQWdCLFlBQWhCLEVBQTZCLFVBQTdCLEVBQXdDLFVBQVNDLENBQVQsRUFBV0MsQ0FBWCxFQUFhQyxDQUFiLEVBQWVDLENBQWYsRUFBaUI7QUFBQyxXQUFPNEcsU0FBU0MsZ0JBQVQsQ0FBMEIsYUFBMUIsRUFBd0MsWUFBVTtBQUFDL0csUUFBRU8sT0FBRixJQUFXUCxFQUFFTyxPQUFGLENBQVUyQixPQUFyQixJQUE4QmxDLEVBQUVPLE9BQUYsQ0FBVTJCLE9BQVYsQ0FBa0JnRSxZQUFoRCxJQUE4RGxHLEVBQUVPLE9BQUYsQ0FBVTJCLE9BQVYsQ0FBa0JnRSxZQUFsQixDQUErQjJZLEtBQTdGLEtBQXFHN2UsRUFBRU8sT0FBRixDQUFVMkIsT0FBVixDQUFrQmdFLFlBQWxCLENBQStCMlksS0FBL0IsQ0FBcUNDLEVBQXJDLENBQXdDLFVBQXhDLEVBQW1ELFVBQVMvZSxDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDRSxVQUFFLFlBQVU7QUFBQ0QsWUFBRTRHLFVBQUYsQ0FBYSxvQ0FBYixFQUFrRDlHLENBQWxELEVBQW9EQyxDQUFwRDtBQUF1RCxTQUFwRTtBQUFzRSxPQUF2SSxHQUF5SUEsRUFBRU8sT0FBRixDQUFVMkIsT0FBVixDQUFrQmdFLFlBQWxCLENBQStCMlksS0FBL0IsQ0FBcUNDLEVBQXJDLENBQXdDLFNBQXhDLEVBQWtELFVBQVMvZSxDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDRSxVQUFFLFlBQVU7QUFBQ0QsWUFBRTRHLFVBQUYsQ0FBYSxtQ0FBYixFQUFpRDlHLENBQWpELEVBQW1EQyxDQUFuRDtBQUFzRCxTQUFuRTtBQUFxRSxPQUFySSxDQUF6SSxFQUFnUkEsRUFBRU8sT0FBRixDQUFVMkIsT0FBVixDQUFrQmdFLFlBQWxCLENBQStCMlksS0FBL0IsQ0FBcUNDLEVBQXJDLENBQXdDLFFBQXhDLEVBQWlELFVBQVMvZSxDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDRSxVQUFFLFlBQVU7QUFBQ0QsWUFBRTRHLFVBQUYsQ0FBYSxrQ0FBYixFQUFnRDlHLENBQWhELEVBQWtEQyxDQUFsRDtBQUFxRCxTQUFsRTtBQUFvRSxPQUFuSSxDQUFoUixFQUFxWkEsRUFBRU8sT0FBRixDQUFVMkIsT0FBVixDQUFrQmdFLFlBQWxCLENBQStCMlksS0FBL0IsQ0FBcUNDLEVBQXJDLENBQXdDLE9BQXhDLEVBQWdELFVBQVMvZSxDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDRSxVQUFFLFlBQVU7QUFBQ0QsWUFBRTRHLFVBQUYsQ0FBYSxpQ0FBYixFQUErQzlHLENBQS9DLEVBQWlEQyxDQUFqRDtBQUFvRCxTQUFqRTtBQUFtRSxPQUFqSSxDQUFyWixFQUF3aEJBLEVBQUVPLE9BQUYsQ0FBVTJCLE9BQVYsQ0FBa0JnRSxZQUFsQixDQUErQjJZLEtBQS9CLENBQXFDQyxFQUFyQyxDQUF3QyxVQUF4QyxFQUFtRCxVQUFTL2UsQ0FBVCxFQUFXO0FBQUNHLFVBQUUsWUFBVTtBQUFDRCxZQUFFNEcsVUFBRixDQUFhLG9DQUFiLEVBQWtEOUcsQ0FBbEQ7QUFBcUQsU0FBbEU7QUFBb0UsT0FBbkksQ0FBeGhCLEVBQTZwQkMsRUFBRU8sT0FBRixDQUFVMkIsT0FBVixDQUFrQmdFLFlBQWxCLENBQStCMlksS0FBL0IsQ0FBcUNDLEVBQXJDLENBQXdDLFFBQXhDLEVBQWlELFVBQVMvZSxDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDRSxVQUFFLFlBQVU7QUFBQ0QsWUFBRTRHLFVBQUYsQ0FBYSxrQ0FBYixFQUFnRDlHLENBQWhELEVBQWtEQyxDQUFsRDtBQUFxRCxTQUFsRTtBQUFvRSxPQUFuSSxDQUE3cEIsRUFBa3lCQSxFQUFFTyxPQUFGLENBQVUyQixPQUFWLENBQWtCZ0UsWUFBbEIsQ0FBK0IyWSxLQUEvQixDQUFxQ0MsRUFBckMsQ0FBd0MsV0FBeEMsRUFBb0QsVUFBUy9lLENBQVQsRUFBVztBQUFDRyxVQUFFLFlBQVU7QUFBQ0QsWUFBRTRHLFVBQUYsQ0FBYSxxQ0FBYixFQUFtRDlHLENBQW5EO0FBQXNELFNBQW5FO0FBQXFFLE9BQXJJLENBQWx5QixFQUF5NkJDLEVBQUVPLE9BQUYsQ0FBVTJCLE9BQVYsQ0FBa0JnRSxZQUFsQixDQUErQjJZLEtBQS9CLENBQXFDQyxFQUFyQyxDQUF3QyxPQUF4QyxFQUFnRCxVQUFTL2UsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQ0UsVUFBRSxZQUFVO0FBQUNELFlBQUU0RyxVQUFGLENBQWEsaUNBQWIsRUFBK0M5RyxDQUEvQyxFQUFpREMsQ0FBakQ7QUFBb0QsU0FBakU7QUFBbUUsT0FBakksQ0FBOWdDO0FBQWtwQyxLQUFyc0MsRUFBc3NDLENBQUMsQ0FBdnNDLEdBQTBzQyxFQUFDK2UsVUFBUyxrQkFBUzllLENBQVQsRUFBV0MsQ0FBWCxFQUFhO0FBQUMsWUFBSVcsSUFBRWQsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9ILElBQUVBLEtBQUcsSUFBTCxFQUFVRixFQUFFTyxPQUFGLENBQVUyQixPQUFWLENBQWtCZ0UsWUFBbEIsQ0FBK0IyWSxLQUEvQixDQUFxQ0UsUUFBckMsQ0FBOEM5ZSxDQUE5QyxFQUFnRCxVQUFTRixDQUFULEVBQVc7QUFBQ2MsWUFBRUosT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBekUsRUFBMEVHLENBQTFFLENBQVYsRUFBdUZXLEVBQUVGLE9BQWhHO0FBQXdHLE9BQWhKLEVBQWlKcWUsS0FBSSxhQUFTL2UsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQ3lkLGdCQUFRc0IsSUFBUixDQUFhLHFDQUFiLEVBQW9ELElBQUlwZSxJQUFFZCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0gsSUFBRUEsS0FBRyxJQUFMLEVBQVVGLEVBQUVPLE9BQUYsQ0FBVTJCLE9BQVYsQ0FBa0JnRSxZQUFsQixDQUErQjJZLEtBQS9CLENBQXFDRSxRQUFyQyxDQUE4QzllLENBQTlDLEVBQWdELFVBQVNGLENBQVQsRUFBVztBQUFDYyxZQUFFSixPQUFGLENBQVVWLENBQVY7QUFBYSxTQUF6RSxFQUEwRUcsQ0FBMUUsQ0FBVixFQUF1RlcsRUFBRUYsT0FBaEc7QUFBd0csT0FBL1UsRUFBZ1Z1ZSxRQUFPLGdCQUFTamYsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxZQUFJVyxJQUFFZCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0gsSUFBRUEsS0FBRyxJQUFMLEVBQVVGLEVBQUVPLE9BQUYsQ0FBVTJCLE9BQVYsQ0FBa0JnRSxZQUFsQixDQUErQjJZLEtBQS9CLENBQXFDSyxNQUFyQyxDQUE0Q2pmLENBQTVDLEVBQThDLFVBQVNGLENBQVQsRUFBVztBQUFDYyxZQUFFSixPQUFGLENBQVVWLENBQVY7QUFBYSxTQUF2RSxFQUF3RUcsQ0FBeEUsQ0FBVixFQUFxRlcsRUFBRUYsT0FBOUY7QUFBc0csT0FBM2QsRUFBNGQ0RixPQUFNLGVBQVN0RyxDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFlBQUlXLElBQUVkLEVBQUVNLEtBQUYsRUFBTjtBQUNsditCLGVBQU9ILElBQUVBLEtBQUcsSUFBTCxFQUFVRixFQUFFTyxPQUFGLENBQVUyQixPQUFWLENBQWtCZ0UsWUFBbEIsQ0FBK0IyWSxLQUEvQixDQUFxQ3RZLEtBQXJDLENBQTJDdEcsQ0FBM0MsRUFBNkMsVUFBU0YsQ0FBVCxFQUFXO0FBQUNjLFlBQUVKLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQXRFLEVBQXVFRyxDQUF2RSxDQUFWLEVBQW9GVyxFQUFFRixPQUE3RjtBQUFxRyxPQUQ2cDlCLEVBQzVwOUJ3ZSxVQUFTLGtCQUFTbGYsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9KLElBQUVBLEtBQUcsSUFBTCxFQUFVRCxFQUFFTyxPQUFGLENBQVUyQixPQUFWLENBQWtCZ0UsWUFBbEIsQ0FBK0IyWSxLQUEvQixDQUFxQ00sUUFBckMsQ0FBOEMsVUFBU3BmLENBQVQsRUFBVztBQUFDRyxZQUFFTyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUF2RSxFQUF3RUUsQ0FBeEUsQ0FBVixFQUFxRkMsRUFBRVMsT0FBOUY7QUFBc0csT0FEaWg5QixFQUNoaDlCMlEsUUFBTyxnQkFBU3JSLENBQVQsRUFBV0MsQ0FBWCxFQUFhO0FBQUMsWUFBSVcsSUFBRWQsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9ILElBQUVBLEtBQUcsSUFBTCxFQUFVRixFQUFFTyxPQUFGLENBQVUyQixPQUFWLENBQWtCZ0UsWUFBbEIsQ0FBK0IyWSxLQUEvQixDQUFxQ3ZOLE1BQXJDLENBQTRDclIsQ0FBNUMsRUFBOEMsVUFBU0YsQ0FBVCxFQUFXO0FBQUNjLFlBQUVKLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQXZFLEVBQXdFRyxDQUF4RSxDQUFWLEVBQXFGVyxFQUFFRixPQUE5RjtBQUFzRyxPQURxNDhCLEVBQ3A0OEJ5ZSxXQUFVLG1CQUFTbmYsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9KLElBQUVBLEtBQUcsSUFBTCxFQUFVRCxFQUFFTyxPQUFGLENBQVUyQixPQUFWLENBQWtCZ0UsWUFBbEIsQ0FBK0IyWSxLQUEvQixDQUFxQ08sU0FBckMsQ0FBK0MsVUFBU3JmLENBQVQsRUFBVztBQUFDRyxZQUFFTyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUF4RSxFQUF5RUUsQ0FBekUsQ0FBVixFQUFzRkMsRUFBRVMsT0FBL0Y7QUFBdUcsT0FEdXY4QixFQUN0djhCMGUsV0FBVSxtQkFBU3BmLENBQVQsRUFBV0MsQ0FBWCxFQUFhO0FBQUMsWUFBSVcsSUFBRWQsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9ILElBQUVBLEtBQUcsSUFBTCxFQUFVRixFQUFFTyxPQUFGLENBQVUyQixPQUFWLENBQWtCZ0UsWUFBbEIsQ0FBK0IyWSxLQUEvQixDQUFxQ1EsU0FBckMsQ0FBK0NwZixDQUEvQyxFQUFpRCxVQUFTRixDQUFULEVBQVc7QUFBQ2MsWUFBRUosT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBMUUsRUFBMkVHLENBQTNFLENBQVYsRUFBd0ZXLEVBQUVGLE9BQWpHO0FBQXlHLE9BRHFtOEIsRUFDcG04QjJlLGFBQVkscUJBQVNyZixDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFlBQUlXLElBQUVkLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPSCxJQUFFQSxLQUFHLElBQUwsRUFBVUYsRUFBRU8sT0FBRixDQUFVMkIsT0FBVixDQUFrQmdFLFlBQWxCLENBQStCMlksS0FBL0IsQ0FBcUNTLFdBQXJDLENBQWlEcmYsQ0FBakQsRUFBbUQsVUFBU0YsQ0FBVCxFQUFXO0FBQUNjLFlBQUVKLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQTVFLEVBQTZFRyxDQUE3RSxDQUFWLEVBQTBGVyxFQUFFRixPQUFuRztBQUEyRyxPQUQrODdCLEVBQzk4N0I0ZSxhQUFZLHFCQUFTdGYsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxZQUFJVyxJQUFFZCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0gsSUFBRUEsS0FBRyxJQUFMLEVBQVVGLEVBQUVPLE9BQUYsQ0FBVTJCLE9BQVYsQ0FBa0JnRSxZQUFsQixDQUErQjJZLEtBQS9CLENBQXFDVSxXQUFyQyxDQUFpRHRmLENBQWpELEVBQW1ELFVBQVNGLENBQVQsRUFBVztBQUFDYyxZQUFFSixPQUFGLENBQVVWLENBQVY7QUFBYSxTQUE1RSxFQUE2RUcsQ0FBN0UsQ0FBVixFQUEwRlcsRUFBRUYsT0FBbkc7QUFBMkcsT0FEeXo3QixFQUN4ejdCc0YsZUFBYyx1QkFBU2hHLENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVILEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPSixJQUFFQSxLQUFHLElBQUwsRUFBVUQsRUFBRU8sT0FBRixDQUFVMkIsT0FBVixDQUFrQmdFLFlBQWxCLENBQStCMlksS0FBL0IsQ0FBcUM1WSxhQUFyQyxDQUFtRCxVQUFTbEcsQ0FBVCxFQUFXO0FBQUNBLGNBQUVHLEVBQUVPLE9BQUYsQ0FBVVYsQ0FBVixDQUFGLEdBQWVHLEVBQUVRLE1BQUYsQ0FBU1gsQ0FBVCxDQUFmO0FBQTJCLFNBQTFGLEVBQTJGRSxDQUEzRixDQUFWLEVBQXdHQyxFQUFFUyxPQUFqSDtBQUF5SCxPQURxcDdCLEVBQ3BwN0I2ZSxvQkFBbUIsNEJBQVN2ZixDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0osSUFBRUEsS0FBRyxJQUFMLEVBQVVELEVBQUVPLE9BQUYsQ0FBVTJCLE9BQVYsQ0FBa0JnRSxZQUFsQixDQUErQjJZLEtBQS9CLENBQXFDVyxrQkFBckMsQ0FBd0QsVUFBU3pmLENBQVQsRUFBVztBQUFDQSxjQUFFRyxFQUFFTyxPQUFGLENBQVVWLENBQVYsQ0FBRixHQUFlRyxFQUFFUSxNQUFGLENBQVNYLENBQVQsQ0FBZjtBQUEyQixTQUEvRixFQUFnR0UsQ0FBaEcsQ0FBVixFQUE2R0MsRUFBRVMsT0FBdEg7QUFBOEgsT0FEdSs2QixFQUN0KzZCeUYscUJBQW9CLDZCQUFTbkcsQ0FBVCxFQUFXO0FBQUMwZCxnQkFBUXNCLElBQVIsQ0FBYSwrQ0FBYixFQUE4RCxJQUFJL2UsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9KLElBQUVBLEtBQUcsSUFBTCxFQUFVRCxFQUFFTyxPQUFGLENBQVUyQixPQUFWLENBQWtCZ0UsWUFBbEIsQ0FBK0IyWSxLQUEvQixDQUFxQ1csa0JBQXJDLENBQXdELFVBQVN6ZixDQUFULEVBQVc7QUFBQ0EsY0FBRUcsRUFBRU8sT0FBRixDQUFVVixDQUFWLENBQUYsR0FBZUcsRUFBRVEsTUFBRixDQUFTWCxDQUFULENBQWY7QUFBMkIsU0FBL0YsRUFBZ0dFLENBQWhHLENBQVYsRUFBNkdDLEVBQUVTLE9BQXRIO0FBQThILE9BRDB2NkIsRUFDenY2QjhlLFdBQVUsbUJBQVN4ZixDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0osSUFBRUEsS0FBRyxJQUFMLEVBQVVELEVBQUVPLE9BQUYsQ0FBVTJCLE9BQVYsQ0FBa0JnRSxZQUFsQixDQUErQjJZLEtBQS9CLENBQXFDWSxTQUFyQyxDQUErQyxVQUFTMWYsQ0FBVCxFQUFXO0FBQUNHLFlBQUVPLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQXhFLEVBQXlFRSxDQUF6RSxDQUFWLEVBQXNGQyxFQUFFUyxPQUEvRjtBQUF1RyxPQUQ0bTZCLEVBQzNtNkIrZSxRQUFPLGdCQUFTemYsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9KLElBQUVBLEtBQUcsSUFBTCxFQUFVRCxFQUFFTyxPQUFGLENBQVUyQixPQUFWLENBQWtCZ0UsWUFBbEIsQ0FBK0IyWSxLQUEvQixDQUFxQ2EsTUFBckMsQ0FBNEMsVUFBUzNmLENBQVQsRUFBVztBQUFDRyxZQUFFTyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUFyRSxFQUFzRUUsQ0FBdEUsQ0FBVixFQUFtRkMsRUFBRVMsT0FBNUY7QUFBb0csT0FEbys1QixFQUNuKzVCZ2YsaUJBQWdCLHlCQUFTMWYsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9KLElBQUVBLEtBQUcsSUFBTCxFQUFVRCxFQUFFTyxPQUFGLENBQVUyQixPQUFWLENBQWtCZ0UsWUFBbEIsQ0FBK0IyWSxLQUEvQixDQUFxQ2MsZUFBckMsQ0FBcUQsVUFBUzVmLENBQVQsRUFBVztBQUFDRyxZQUFFTyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUE5RSxFQUErRUUsQ0FBL0UsQ0FBVixFQUE0RkMsRUFBRVMsT0FBckc7QUFBNkcsT0FEMDA1QixFQUN6MDVCaWYsaUJBQWdCLHlCQUFTM2YsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9KLElBQUVBLEtBQUcsSUFBTCxFQUFVRCxFQUFFTyxPQUFGLENBQVUyQixPQUFWLENBQWtCZ0UsWUFBbEIsQ0FBK0IyWSxLQUEvQixDQUFxQ2UsZUFBckMsQ0FBcUQsVUFBUzdmLENBQVQsRUFBVztBQUFDRyxZQUFFTyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUE5RSxFQUErRUUsQ0FBL0UsQ0FBVixFQUE0RkMsRUFBRVMsT0FBckc7QUFBNkcsT0FEZ3I1QixFQUMvcTVCMkYsS0FBSSxhQUFTckcsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxZQUFJVyxJQUFFZCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0gsSUFBRUEsS0FBRyxJQUFMLEVBQVVGLEVBQUVPLE9BQUYsQ0FBVTJCLE9BQVYsQ0FBa0JnRSxZQUFsQixDQUErQjJZLEtBQS9CLENBQXFDdlksR0FBckMsQ0FBeUNyRyxDQUF6QyxFQUEyQyxVQUFTRixDQUFULEVBQVc7QUFBQ2MsWUFBRUosT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBcEUsRUFBcUVHLENBQXJFLENBQVYsRUFBa0ZXLEVBQUVGLE9BQTNGO0FBQW1HLE9BRDBpNUIsRUFDemk1QmtmLFFBQU8sZ0JBQVM1ZixDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0osSUFBRUEsS0FBRyxJQUFMLEVBQVVELEVBQUVPLE9BQUYsQ0FBVTJCLE9BQVYsQ0FBa0JnRSxZQUFsQixDQUErQjJZLEtBQS9CLENBQXFDZ0IsTUFBckMsQ0FBNEMsVUFBUzlmLENBQVQsRUFBVztBQUFDRyxZQUFFTyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUFyRSxFQUFzRUUsQ0FBdEUsQ0FBVixFQUFtRkMsRUFBRVMsT0FBNUY7QUFBb0csT0FEazY0QixFQUNqNjRCbWYsY0FBYSxzQkFBUzdmLENBQVQsRUFBV0MsQ0FBWCxFQUFhO0FBQUMsWUFBSVcsSUFBRWQsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9ILElBQUVBLEtBQUcsSUFBTCxFQUFVRixFQUFFTyxPQUFGLENBQVUyQixPQUFWLENBQWtCZ0UsWUFBbEIsQ0FBK0IyWSxLQUEvQixDQUFxQ2lCLFlBQXJDLENBQWtEN2YsQ0FBbEQsRUFBb0QsVUFBU0YsQ0FBVCxFQUFXO0FBQUNjLFlBQUVKLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQTdFLEVBQThFRyxDQUE5RSxDQUFWLEVBQTJGVyxFQUFFRixPQUFwRztBQUE0RyxPQUQwdzRCLEVBQ3p3NEJvZixpQkFBZ0IseUJBQVM5ZixDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0osSUFBRUEsS0FBRyxJQUFMLEVBQVVELEVBQUVPLE9BQUYsQ0FBVTJCLE9BQVYsQ0FBa0JnRSxZQUFsQixDQUErQjJZLEtBQS9CLENBQXFDa0IsZUFBckMsQ0FBcUQsVUFBU2hnQixDQUFULEVBQVc7QUFBQ0csWUFBRU8sT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBOUUsRUFBK0VFLENBQS9FLENBQVYsRUFBNEZDLEVBQUVTLE9BQXJHO0FBQTZHLE9BRGduNEIsRUFDL200QnFmLGNBQWEsc0JBQVMvZixDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFlBQUlXLElBQUVkLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPSCxJQUFFQSxLQUFHLElBQUwsRUFBVUYsRUFBRU8sT0FBRixDQUFVMkIsT0FBVixDQUFrQmdFLFlBQWxCLENBQStCMlksS0FBL0IsQ0FBcUNtQixZQUFyQyxDQUFrRC9mLENBQWxELEVBQW9ELFVBQVNGLENBQVQsRUFBVztBQUFDYyxZQUFFSixPQUFGLENBQVVWLENBQVY7QUFBYSxTQUE3RSxFQUE4RUcsQ0FBOUUsQ0FBVixFQUEyRlcsRUFBRUYsT0FBcEc7QUFBNEcsT0FEdzkzQixFQUN2OTNCc2YsaUJBQWdCLHlCQUFTaGdCLENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVILEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPSixJQUFFQSxLQUFHLElBQUwsRUFBVUQsRUFBRU8sT0FBRixDQUFVMkIsT0FBVixDQUFrQmdFLFlBQWxCLENBQStCMlksS0FBL0IsQ0FBcUNvQixlQUFyQyxDQUFxRCxVQUFTbGdCLENBQVQsRUFBVztBQUFDRyxZQUFFTyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUE5RSxFQUErRUUsQ0FBL0UsQ0FBVixFQUE0RkMsRUFBRVMsT0FBckc7QUFBNkcsT0FEOHozQixFQUM3ejNCdWYsYUFBWSx1QkFBVTtBQUFDLGVBQU9sZ0IsRUFBRU8sT0FBRixDQUFVMkIsT0FBVixDQUFrQmdFLFlBQWxCLENBQStCMlksS0FBL0IsQ0FBcUNxQixXQUFyQyxFQUFQO0FBQTBELE9BRDR1M0IsRUFDM3UzQkMsYUFBWSxxQkFBU3BnQixDQUFULEVBQVc7QUFBQ0MsVUFBRU8sT0FBRixDQUFVMkIsT0FBVixDQUFrQmdFLFlBQWxCLENBQStCMlksS0FBL0IsQ0FBcUNzQixXQUFyQyxDQUFpRHBnQixDQUFqRDtBQUFvRCxPQUQrcDNCLEVBQWp0QztBQUM1ODBCLEdBRGs1MEIsQ0FBN0YsQ0FEOTQ2QixFQUU0bEdILFFBQVFDLE1BQVIsQ0FBZSw2QkFBZixFQUE2QyxFQUE3QyxFQUFpREMsT0FBakQsQ0FBeUQsbUJBQXpELEVBQTZFLENBQUMsSUFBRCxFQUFNLFNBQU4sRUFBZ0IsVUFBU0MsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxXQUFNLEVBQUNzVCxZQUFXLG9CQUFTclQsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVvZ0IsTUFBRixDQUFTOU0sVUFBVCxDQUFvQnJULENBQXBCLEVBQXNCLFlBQVU7QUFBQ0MsWUFBRU8sT0FBRjtBQUFZLFNBQTdDLEVBQThDLFlBQVU7QUFBQ1AsWUFBRVEsTUFBRjtBQUFXLFNBQXBFLEdBQXNFUixFQUFFUyxPQUEvRTtBQUF1RixPQUEvSCxFQUFnSTZTLGNBQWEsc0JBQVN2VCxDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRW9nQixNQUFGLENBQVM1TSxZQUFULENBQXNCdlQsQ0FBdEIsRUFBd0IsWUFBVTtBQUFDQyxZQUFFTyxPQUFGO0FBQVksU0FBL0MsRUFBZ0QsWUFBVTtBQUFDUCxZQUFFUSxNQUFGO0FBQVcsU0FBdEUsR0FBd0VSLEVBQUVTLE9BQWpGO0FBQXlGLE9BQWxRLEVBQW1ROFMsY0FBYSx3QkFBVTtBQUFDLFlBQUl4VCxJQUFFRixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRW9nQixNQUFGLENBQVMzTSxZQUFULENBQXNCLFlBQVU7QUFBQ3hULFlBQUVRLE9BQUY7QUFBWSxTQUE3QyxFQUE4QyxZQUFVO0FBQUNSLFlBQUVTLE1BQUY7QUFBVyxTQUFwRSxHQUFzRVQsRUFBRVUsT0FBL0U7QUFBdUYsT0FBbFksRUFBbVkrUyxZQUFXLG9CQUFTelQsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVvZ0IsTUFBRixDQUFTMU0sVUFBVCxDQUFvQnpULENBQXBCLEVBQXNCLFlBQVU7QUFBQ0MsWUFBRU8sT0FBRjtBQUFZLFNBQTdDLEVBQThDLFlBQVU7QUFBQ1AsWUFBRVEsTUFBRjtBQUFXLFNBQXBFLEdBQXNFUixFQUFFUyxPQUEvRTtBQUF1RixPQUFqZ0IsRUFBa2dCZ1QsZ0JBQWUsd0JBQVMxVCxDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFlBQUlXLElBQUVkLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFb2dCLE1BQUYsQ0FBU3pNLGNBQVQsQ0FBd0IxVCxDQUF4QixFQUEwQkMsQ0FBMUIsRUFBNEIsWUFBVTtBQUFDVyxZQUFFSixPQUFGO0FBQVksU0FBbkQsRUFBb0QsWUFBVTtBQUFDSSxZQUFFSCxNQUFGO0FBQVcsU0FBMUUsR0FBNEVHLEVBQUVGLE9BQXJGO0FBQTZGLE9BQTVvQixFQUE2b0JpVCxZQUFXLHNCQUFVO0FBQUMsWUFBSTNULElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFb2dCLE1BQUYsQ0FBU3hNLFVBQVQsQ0FBb0IsWUFBVTtBQUFDM1QsWUFBRVEsT0FBRjtBQUFZLFNBQTNDLEVBQTRDLFlBQVU7QUFBQ1IsWUFBRVMsTUFBRjtBQUFXLFNBQWxFLEdBQW9FVCxFQUFFVSxPQUE3RTtBQUFxRixPQUF4d0IsRUFBeXdCa1QscUJBQW9CLDZCQUFTNVQsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVvZ0IsTUFBRixDQUFTdk0sbUJBQVQsQ0FBNkI1VCxDQUE3QixFQUErQixZQUFVO0FBQUNDLFlBQUVPLE9BQUY7QUFBWSxTQUF0RCxFQUF1RCxZQUFVO0FBQUNQLFlBQUVRLE1BQUY7QUFBVyxTQUE3RSxHQUErRVIsRUFBRVMsT0FBeEY7QUFBZ0csT0FBejVCLEVBQTA1Qm1ULGtCQUFpQiw0QkFBVTtBQUFDLFlBQUk3VCxJQUFFRixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRW9nQixNQUFGLENBQVN0TSxnQkFBVCxDQUEwQixZQUFVO0FBQUM3VCxZQUFFUSxPQUFGO0FBQVksU0FBakQsRUFBa0QsWUFBVTtBQUFDUixZQUFFUyxNQUFGO0FBQVcsU0FBeEUsR0FBMEVULEVBQUVVLE9BQW5GO0FBQTJGLE9BQWppQyxFQUFOO0FBQXlpQyxHQUF2a0MsQ0FBN0UsQ0FGNWxHLEVBRW12SWYsUUFBUUMsTUFBUixDQUFlLHlCQUFmLEVBQXlDLEVBQXpDLEVBQTZDd2dCLE9BQTdDLENBQXFELFVBQXJELEVBQWdFLENBQUMsSUFBRCxFQUFNLFdBQU4sRUFBa0IsVUFBU3RnQixDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLGFBQVNDLENBQVQsQ0FBV0YsQ0FBWCxFQUFhO0FBQUNILGNBQVEwZ0IsU0FBUixDQUFrQnBmLENBQWxCLE1BQXVCQSxJQUFFbEIsRUFBRSxZQUFVO0FBQUMsWUFBRStjLENBQUYsS0FBTUEsSUFBRWhkLEVBQUV3Z0IsV0FBRixFQUFGLEVBQWtCeGYsS0FBR2djLElBQUUsQ0FBTCxJQUFRaGMsRUFBRThFLE1BQUYsQ0FBUyxFQUFDMmEsVUFBU3pELENBQVYsRUFBVCxDQUFoQyxHQUF3RGhkLEVBQUUyRixrQkFBRixDQUFxQixVQUFTM0YsQ0FBVCxFQUFXO0FBQUNBLGNBQUUsQ0FBQyxDQUFILEtBQU9xQixJQUFFckIsQ0FBVDtBQUFZLFNBQTdDLEVBQThDLFVBQVNBLENBQVQsRUFBVztBQUFDNGQsa0JBQVE4QyxHQUFSLENBQVksdUJBQXFCMWdCLENBQWpDO0FBQW9DLFNBQTlGLENBQXhELEVBQXdKZ0IsS0FBR0EsRUFBRThFLE1BQUYsQ0FBUyxFQUFDNmEsVUFBU3RmLENBQVYsRUFBVCxDQUEzSjtBQUFrTCxPQUEvTCxFQUFnTSxHQUFoTSxDQUF6QjtBQUErTixjQUFTbEIsQ0FBVCxHQUFZO0FBQUNOLGNBQVEwZ0IsU0FBUixDQUFrQnBmLENBQWxCLE1BQXVCbEIsRUFBRXNSLE1BQUYsQ0FBU3BRLENBQVQsR0FBWUEsSUFBRSxLQUFLLENBQTFDO0FBQTZDLGNBQVNMLENBQVQsR0FBWTtBQUFDTyxVQUFFLENBQUMsQ0FBSCxFQUFLMmIsSUFBRSxDQUFDLENBQVI7QUFBVSxjQUFTamMsQ0FBVCxDQUFXZixDQUFYLEVBQWE7QUFBQyxXQUFLNGdCLEtBQUwsR0FBVyxJQUFJQyxLQUFKLENBQVU3Z0IsQ0FBVixFQUFZLFVBQVNBLENBQVQsRUFBVztBQUFDRyxhQUFJVyxHQUFKLEVBQVFFLEVBQUVOLE9BQUYsQ0FBVVYsQ0FBVixDQUFSO0FBQXFCLE9BQTdDLEVBQThDLFVBQVNBLENBQVQsRUFBVztBQUFDRyxhQUFJVyxHQUFKLEVBQVFFLEVBQUVMLE1BQUYsQ0FBU1gsQ0FBVCxDQUFSO0FBQW9CLE9BQTlFLEVBQStFLFVBQVNBLENBQVQsRUFBVztBQUFDb0IsWUFBRXBCLENBQUYsRUFBSWdCLEVBQUU4RSxNQUFGLENBQVMsRUFBQ2diLFFBQU8xZixDQUFSLEVBQVQsQ0FBSjtBQUF5QixPQUFwSCxDQUFYO0FBQWlJLFNBQUlKLENBQUo7QUFBQSxRQUFNQyxDQUFOO0FBQUEsUUFBUUMsQ0FBUjtBQUFBLFFBQVVDLENBQVY7QUFBQSxRQUFZQyxJQUFFLElBQWQ7QUFBQSxRQUFtQkMsSUFBRSxDQUFDLENBQXRCO0FBQUEsUUFBd0IyYixJQUFFLENBQUMsQ0FBM0IsQ0FBNkIsT0FBT2pjLEVBQUVnZ0IsU0FBRixDQUFZQyxJQUFaLEdBQWlCLFVBQVMvZ0IsQ0FBVCxFQUFXO0FBQUMsYUFBT2UsSUFBRWhCLEVBQUVNLEtBQUYsRUFBRixFQUFZLG9CQUFpQkwsQ0FBakIseUNBQWlCQSxDQUFqQixPQUFxQkEsSUFBRSxFQUF2QixDQUFaLEVBQXVDLEtBQUsyZ0IsS0FBTCxDQUFXSSxJQUFYLENBQWdCL2dCLENBQWhCLENBQXZDLEVBQTBEQyxFQUFFLEtBQUswZ0IsS0FBUCxDQUExRCxFQUF3RTVmLEVBQUVKLE9BQWpGO0FBQXlGLEtBQXRILEVBQXVIRyxFQUFFZ2dCLFNBQUYsQ0FBWUUsS0FBWixHQUFrQixZQUFVO0FBQUM5Z0IsV0FBSSxLQUFLeWdCLEtBQUwsQ0FBV0ssS0FBWCxFQUFKO0FBQXVCLEtBQTNLLEVBQTRLbGdCLEVBQUVnZ0IsU0FBRixDQUFZOWEsSUFBWixHQUFpQixZQUFVO0FBQUMsV0FBSzJhLEtBQUwsQ0FBVzNhLElBQVg7QUFBa0IsS0FBMU4sRUFBMk5sRixFQUFFZ2dCLFNBQUYsQ0FBWUcsT0FBWixHQUFvQixZQUFVO0FBQUMsV0FBS04sS0FBTCxDQUFXTSxPQUFYLElBQXFCLEtBQUtOLEtBQUwsR0FBVyxLQUFLLENBQXJDO0FBQXVDLEtBQWpTLEVBQWtTN2YsRUFBRWdnQixTQUFGLENBQVlJLE1BQVosR0FBbUIsVUFBU25oQixDQUFULEVBQVc7QUFBQyxXQUFLNGdCLEtBQUwsQ0FBV08sTUFBWCxDQUFrQm5oQixDQUFsQjtBQUFxQixLQUF0VixFQUF1VmUsRUFBRWdnQixTQUFGLENBQVlLLFNBQVosR0FBc0IsVUFBU3BoQixDQUFULEVBQVc7QUFBQyxXQUFLNGdCLEtBQUwsQ0FBV1EsU0FBWCxDQUFxQnBoQixDQUFyQjtBQUF3QixLQUFqWixFQUFrWmUsRUFBRWdnQixTQUFGLENBQVlNLFdBQVosR0FBd0IsWUFBVTtBQUFDLFdBQUtULEtBQUwsQ0FBV1MsV0FBWDtBQUF5QixLQUE5YyxFQUErY3RnQixFQUFFZ2dCLFNBQUYsQ0FBWU8sVUFBWixHQUF1QixZQUFVO0FBQUMsV0FBS1YsS0FBTCxDQUFXVSxVQUFYO0FBQXdCLEtBQXpnQixFQUEwZ0J2Z0IsRUFBRWdnQixTQUFGLENBQVlRLFdBQVosR0FBd0IsWUFBVTtBQUFDLGFBQU90Z0IsSUFBRWpCLEVBQUVNLEtBQUYsRUFBRixFQUFZLEtBQUtzZ0IsS0FBTCxDQUFXamIsa0JBQVgsQ0FBOEIsVUFBUzNGLENBQVQsRUFBVztBQUFDaUIsVUFBRVAsT0FBRixDQUFVVixDQUFWO0FBQWEsT0FBdkQsQ0FBWixFQUFxRWlCLEVBQUVMLE9BQTlFO0FBQXNGLEtBQW5vQixFQUFvb0JHLEVBQUVnZ0IsU0FBRixDQUFZUCxXQUFaLEdBQXdCLFlBQVU7QUFBQyxhQUFPdGYsSUFBRWxCLEVBQUVNLEtBQUYsRUFBRixFQUFZLEtBQUtzZ0IsS0FBTCxDQUFXSixXQUFYLENBQXVCLFVBQVN4Z0IsQ0FBVCxFQUFXO0FBQUNrQixVQUFFUixPQUFGLENBQVVWLENBQVY7QUFBYSxPQUFoRCxDQUFaLEVBQThEa0IsRUFBRU4sT0FBdkU7QUFBK0UsS0FBdHZCLEVBQXV2QkcsQ0FBOXZCO0FBQWd3QixHQUExd0MsQ0FBaEUsRUFBNjBDaEIsT0FBNzBDLENBQXExQyxlQUFyMUMsRUFBcTJDLENBQUMsVUFBRCxFQUFZLFVBQVNDLENBQVQsRUFBVztBQUFDLFdBQU0sRUFBQ3doQixVQUFTLGtCQUFTdmhCLENBQVQsRUFBVztBQUFDLGVBQU8sSUFBSUQsQ0FBSixDQUFNQyxDQUFOLENBQVA7QUFBZ0IsT0FBdEMsRUFBTjtBQUE4QyxHQUF0RSxDQUFyMkMsQ0FGbnZJLEVBRWlxTEosUUFBUUMsTUFBUixDQUFlLDZCQUFmLEVBQTZDLEVBQTdDLEVBQWlEQyxPQUFqRCxDQUF5RCxtQkFBekQsRUFBNkUsQ0FBQyxJQUFELEVBQU0sU0FBTixFQUFnQixVQUFTQyxDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFdBQU0sRUFBQ3NULFlBQVcsb0JBQVNyVCxDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRXdoQixNQUFGLENBQVNsTyxVQUFULENBQW9CclQsQ0FBcEIsRUFBc0IsWUFBVTtBQUFDQyxZQUFFTyxPQUFGO0FBQVksU0FBN0MsRUFBOEMsWUFBVTtBQUFDUCxZQUFFUSxNQUFGO0FBQVcsU0FBcEUsR0FBc0VSLEVBQUVTLE9BQS9FO0FBQXVGLE9BQS9ILEVBQWdJNlMsY0FBYSxzQkFBU3ZULENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVILEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFd2hCLE1BQUYsQ0FBU2hPLFlBQVQsQ0FBc0J2VCxDQUF0QixFQUF3QixZQUFVO0FBQUNDLFlBQUVPLE9BQUY7QUFBWSxTQUEvQyxFQUFnRCxZQUFVO0FBQUNQLFlBQUVRLE1BQUY7QUFBVyxTQUF0RSxHQUF3RVIsRUFBRVMsT0FBakY7QUFBeUYsT0FBbFEsRUFBbVE4UyxjQUFhLHdCQUFVO0FBQUMsWUFBSXhULElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFd2hCLE1BQUYsQ0FBUy9OLFlBQVQsQ0FBc0IsWUFBVTtBQUFDeFQsWUFBRVEsT0FBRjtBQUFZLFNBQTdDLEVBQThDLFlBQVU7QUFBQ1IsWUFBRVMsTUFBRjtBQUFXLFNBQXBFLEdBQXNFVCxFQUFFVSxPQUEvRTtBQUF1RixPQUFsWSxFQUFtWStTLFlBQVcsb0JBQVN6VCxDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRXdoQixNQUFGLENBQVM5TixVQUFULENBQW9CelQsQ0FBcEIsRUFBc0IsWUFBVTtBQUFDQyxZQUFFTyxPQUFGO0FBQVksU0FBN0MsRUFBOEMsWUFBVTtBQUFDUCxZQUFFUSxNQUFGO0FBQVcsU0FBcEUsR0FBc0VSLEVBQUVTLE9BQS9FO0FBQXVGLE9BQWpnQixFQUFrZ0JnVCxnQkFBZSx3QkFBUzFULENBQVQsRUFBV0MsQ0FBWCxFQUFhO0FBQUMsWUFBSVcsSUFBRWQsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUV3aEIsTUFBRixDQUFTN04sY0FBVCxDQUF3QjFULENBQXhCLEVBQTBCQyxDQUExQixFQUE0QixZQUFVO0FBQUNXLFlBQUVKLE9BQUY7QUFBWSxTQUFuRCxFQUFvRCxZQUFVO0FBQUNJLFlBQUVILE1BQUY7QUFBVyxTQUExRSxHQUE0RUcsRUFBRUYsT0FBckY7QUFBNkYsT0FBNW9CLEVBQTZvQmlULFlBQVcsc0JBQVU7QUFBQyxZQUFJM1QsSUFBRUYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUV3aEIsTUFBRixDQUFTNU4sVUFBVCxDQUFvQixZQUFVO0FBQUMzVCxZQUFFUSxPQUFGO0FBQVksU0FBM0MsRUFBNEMsWUFBVTtBQUFDUixZQUFFUyxNQUFGO0FBQVcsU0FBbEUsR0FBb0VULEVBQUVVLE9BQTdFO0FBQXFGLE9BQXh3QixFQUF5d0JrVCxxQkFBb0IsNkJBQVM1VCxDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRXdoQixNQUFGLENBQVMzTixtQkFBVCxDQUE2QjVULENBQTdCLEVBQStCLFlBQVU7QUFBQ0MsWUFBRU8sT0FBRjtBQUFZLFNBQXRELEVBQXVELFlBQVU7QUFBQ1AsWUFBRVEsTUFBRjtBQUFXLFNBQTdFLEdBQStFUixFQUFFUyxPQUF4RjtBQUFnRyxPQUF6NUIsRUFBMDVCbVQsa0JBQWlCLDRCQUFVO0FBQUMsWUFBSTdULElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFd2hCLE1BQUYsQ0FBUzFOLGdCQUFULENBQTBCLFlBQVU7QUFBQzdULFlBQUVRLE9BQUY7QUFBWSxTQUFqRCxFQUFrRCxZQUFVO0FBQUNSLFlBQUVTLE1BQUY7QUFBVyxTQUF4RSxHQUEwRVQsRUFBRVUsT0FBbkY7QUFBMkYsT0FBamlDLEVBQU47QUFBeWlDLEdBQXZrQyxDQUE3RSxDQUZqcUwsRUFFd3pOZixRQUFRQyxNQUFSLENBQWUsbUJBQWYsRUFBbUMsQ0FBQywyQkFBRCxFQUE2QiwrQkFBN0IsRUFBNkQseUJBQTdELEVBQXVGLG1DQUF2RixFQUEySCwyQkFBM0gsRUFBdUosOEJBQXZKLEVBQXNMLHlDQUF0TCxFQUFnTyx5QkFBaE8sRUFBMFAsa0NBQTFQLEVBQTZSLGlDQUE3UixFQUErVCwwQkFBL1QsRUFBMFYsdUJBQTFWLEVBQWtYLG1DQUFsWCxFQUFzWiw4QkFBdFosRUFBcWIsNEJBQXJiLEVBQWtkLDBCQUFsZCxFQUE2ZSwyQkFBN2UsRUFBeWdCLDZCQUF6Z0IsRUFBdWlCLDRCQUF2aUIsRUFBb2tCLDhCQUFwa0IsRUFBbW1CLDBCQUFubUIsRUFBOG5CLGdDQUE5bkIsRUFBK3BCLHFDQUEvcEIsRUFBcXNCLDJCQUFyc0IsRUFBaXVCLGlDQUFqdUIsRUFBbXdCLDRCQUFud0IsRUFBZ3lCLCtCQUFoeUIsRUFBZzBCLHdCQUFoMEIsRUFBeTFCLGdDQUF6MUIsRUFBMDNCLCtCQUExM0IsRUFBMDVCLDhCQUExNUIsRUFBeTdCLDZCQUF6N0IsRUFBdTlCLHNCQUF2OUIsRUFBOCtCLCtCQUE5K0IsRUFBOGdDLGlDQUE5Z0MsRUFBZ2pDLDZCQUFoakMsRUFBOGtDLG1DQUE5a0MsRUFBa25DLDZCQUFsbkMsRUFBZ3BDLGtDQUFocEMsRUFBbXJDLDhCQUFuckMsRUFBa3RDLDZCQUFsdEMsRUFBZ3ZDLHlCQUFodkMsRUFBMHdDLHVCQUExd0MsRUFBa3lDLCtCQUFseUMsRUFBazBDLGdDQUFsMEMsRUFBbTJDLDZCQUFuMkMsRUFBaTRDLDRCQUFqNEMsRUFBODVDLDRCQUE5NUMsRUFBMjdDLG1DQUEzN0MsRUFBKzlDLHFDQUEvOUMsRUFBcWdELHlCQUFyZ0QsRUFBK2hELDZCQUEvaEQsRUFBNmpELDZCQUE3akQsRUFBMmxELDRCQUEzbEQsRUFBd25ELCtCQUF4bkQsRUFBd3BELDJCQUF4cEQsRUFBb3JELDZCQUFwckQsRUFBa3RELCtCQUFsdEQsRUFBa3ZELDJCQUFsdkQsRUFBOHdELHFDQUE5d0QsRUFBb3pELHdCQUFwekQsRUFBNjBELDJCQUE3MEQsRUFBeTJELHVCQUF6MkQsRUFBaTRELGlDQUFqNEQsRUFBbTZELGlDQUFuNkQsRUFBcThELGdDQUFyOEQsRUFBcytELDBCQUF0K0QsRUFBaWdFLDZCQUFqZ0UsRUFBK2hFLHlCQUEvaEUsRUFBeWpFLDJCQUF6akUsRUFBcWxFLDZCQUFybEUsRUFBbW5FLG9DQUFubkUsRUFBd3BFLHVCQUF4cEUsRUFBZ3JFLDRCQUFockUsQ0FBbkMsQ0FGeHpOLEVBRTBpU0QsUUFBUUMsTUFBUixDQUFlLDRCQUFmLEVBQTRDLEVBQTVDLEVBQWdEQyxPQUFoRCxDQUF3RCxrQkFBeEQsRUFBMkUsQ0FBQyxJQUFELEVBQU0sU0FBTixFQUFnQixVQUFTQyxDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFdBQU0sRUFBQ3NULFlBQVcsb0JBQVNyVCxDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRXloQixLQUFGLENBQVFuTyxVQUFSLENBQW1CclQsQ0FBbkIsRUFBcUIsWUFBVTtBQUFDQyxZQUFFTyxPQUFGO0FBQVksU0FBNUMsRUFBNkMsWUFBVTtBQUFDUCxZQUFFUSxNQUFGO0FBQVcsU0FBbkUsR0FBcUVSLEVBQUVTLE9BQTlFO0FBQXNGLE9BQTlILEVBQStINlMsY0FBYSxzQkFBU3ZULENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVILEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFeWhCLEtBQUYsQ0FBUWpPLFlBQVIsQ0FBcUJ2VCxDQUFyQixFQUF1QixZQUFVO0FBQUNDLFlBQUVPLE9BQUY7QUFBWSxTQUE5QyxFQUErQyxZQUFVO0FBQUNQLFlBQUVRLE1BQUY7QUFBVyxTQUFyRSxHQUF1RVIsRUFBRVMsT0FBaEY7QUFBd0YsT0FBaFEsRUFBaVE4UyxjQUFhLHdCQUFVO0FBQUMsWUFBSXhULElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFeWhCLEtBQUYsQ0FBUWhPLFlBQVIsQ0FBcUIsWUFBVTtBQUFDeFQsWUFBRVEsT0FBRjtBQUFZLFNBQTVDLEVBQTZDLFlBQVU7QUFBQ1IsWUFBRVMsTUFBRjtBQUFXLFNBQW5FLEdBQXFFVCxFQUFFVSxPQUE5RTtBQUFzRixPQUEvWCxFQUFnWStTLFlBQVcsb0JBQVN6VCxDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRXloQixLQUFGLENBQVEvTixVQUFSLENBQW1CelQsQ0FBbkIsRUFBcUIsWUFBVTtBQUFDQyxZQUFFTyxPQUFGO0FBQVksU0FBNUMsRUFBNkMsWUFBVTtBQUFDUCxZQUFFUSxNQUFGO0FBQVcsU0FBbkUsR0FBcUVSLEVBQUVTLE9BQTlFO0FBQXNGLE9BQTdmLEVBQThmZ1QsZ0JBQWUsd0JBQVMxVCxDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFlBQUlXLElBQUVkLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFeWhCLEtBQUYsQ0FBUTlOLGNBQVIsQ0FBdUIxVCxDQUF2QixFQUF5QkMsQ0FBekIsRUFBMkIsWUFBVTtBQUFDVyxZQUFFSixPQUFGO0FBQVksU0FBbEQsRUFBbUQsWUFBVTtBQUFDSSxZQUFFSCxNQUFGO0FBQVcsU0FBekUsR0FBMkVHLEVBQUVGLE9BQXBGO0FBQTRGLE9BQXZvQixFQUF3b0JpVCxZQUFXLHNCQUFVO0FBQUMsWUFBSTNULElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFeWhCLEtBQUYsQ0FBUTdOLFVBQVIsQ0FBbUIsWUFBVTtBQUFDM1QsWUFBRVEsT0FBRjtBQUFZLFNBQTFDLEVBQTJDLFlBQVU7QUFBQ1IsWUFBRVMsTUFBRjtBQUFXLFNBQWpFLEdBQW1FVCxFQUFFVSxPQUE1RTtBQUFvRixPQUFsd0IsRUFBbXdCa1QscUJBQW9CLDZCQUFTNVQsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUV5aEIsS0FBRixDQUFRNU4sbUJBQVIsQ0FBNEI1VCxDQUE1QixFQUE4QixZQUFVO0FBQUNDLFlBQUVPLE9BQUY7QUFBWSxTQUFyRCxFQUFzRCxZQUFVO0FBQUNQLFlBQUVRLE1BQUY7QUFBVyxTQUE1RSxHQUE4RVIsRUFBRVMsT0FBdkY7QUFBK0YsT0FBbDVCLEVBQW01Qm1ULGtCQUFpQiw0QkFBVTtBQUFDLFlBQUk3VCxJQUFFRixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRXloQixLQUFGLENBQVEzTixnQkFBUixDQUF5QixZQUFVO0FBQUM3VCxZQUFFUSxPQUFGO0FBQVksU0FBaEQsRUFBaUQsWUFBVTtBQUFDUixZQUFFUyxNQUFGO0FBQVcsU0FBdkUsR0FBeUVULEVBQUVVLE9BQWxGO0FBQTBGLE9BQXpoQyxFQUFOO0FBQWlpQyxHQUEvakMsQ0FBM0UsQ0FGMWlTLEVBRXVyVWYsUUFBUUMsTUFBUixDQUFlLCtCQUFmLEVBQStDLEVBQS9DLEVBQW1EQyxPQUFuRCxDQUEyRCxxQkFBM0QsRUFBaUYsQ0FBQyxJQUFELEVBQU0sU0FBTixFQUFnQixVQUFTQyxDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFdBQU0sRUFBQzBoQixlQUFjLHVCQUFTemhCLENBQVQsRUFBV0MsQ0FBWCxFQUFhO0FBQUMsWUFBSVcsSUFBRWQsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVrQyxPQUFGLENBQVV5ZixXQUFWLENBQXNCRCxhQUF0QixDQUFvQ3poQixDQUFwQyxFQUFzQ0MsQ0FBdEMsRUFBd0MsVUFBU0gsQ0FBVCxFQUFXO0FBQUNjLFlBQUVKLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQWpFLEVBQWtFLFVBQVNBLENBQVQsRUFBVztBQUFDYyxZQUFFSCxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUExRixHQUE0RmMsRUFBRUYsT0FBckc7QUFBNkcsT0FBMUosRUFBMkppaEIsZ0JBQWUsd0JBQVMzaEIsQ0FBVCxFQUFXQyxDQUFYLEVBQWFXLENBQWIsRUFBZUMsQ0FBZixFQUFpQkMsQ0FBakIsRUFBbUI7QUFBQyxZQUFJQyxJQUFFakIsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVrQyxPQUFGLENBQVV5ZixXQUFWLENBQXNCQyxjQUF0QixDQUFxQzNoQixDQUFyQyxFQUF1Q0MsQ0FBdkMsRUFBeUNXLENBQXpDLEVBQTJDQyxDQUEzQyxFQUE2Q0MsQ0FBN0MsRUFBK0MsVUFBU2hCLENBQVQsRUFBVztBQUFDaUIsWUFBRVAsT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBeEUsRUFBeUUsVUFBU0EsQ0FBVCxFQUFXO0FBQUNpQixZQUFFTixNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUFqRyxHQUFtR2lCLEVBQUVMLE9BQTVHO0FBQW9ILE9BQWxVLEVBQW1Vb2dCLE1BQUssY0FBUzlnQixDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFlBQUlXLElBQUVkLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFa0MsT0FBRixDQUFVeWYsV0FBVixDQUFzQlosSUFBdEIsQ0FBMkI5Z0IsQ0FBM0IsRUFBNkIsVUFBU0YsQ0FBVCxFQUFXO0FBQUNjLFlBQUVKLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQXRELEVBQXVELFVBQVNBLENBQVQsRUFBVztBQUFDYyxZQUFFSCxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUEvRSxFQUFnRkcsQ0FBaEYsR0FBbUZXLEVBQUVGLE9BQTVGO0FBQW9HLE9BQTFjLEVBQTJjcUYsTUFBSyxjQUFTL0YsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVrQyxPQUFGLENBQVV5ZixXQUFWLENBQXNCM2IsSUFBdEIsQ0FBMkIvRixDQUEzQixFQUE2QixVQUFTRixDQUFULEVBQVc7QUFBQ0csWUFBRU8sT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBdEQsRUFBdUQsVUFBU0EsQ0FBVCxFQUFXO0FBQUNHLFlBQUVRLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQS9FLEdBQWlGRyxFQUFFUyxPQUExRjtBQUFrRyxPQUE5a0IsRUFBK2tCa2hCLE1BQUssY0FBUzVoQixDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRWtDLE9BQUYsQ0FBVXlmLFdBQVYsQ0FBc0JFLElBQXRCLENBQTJCNWhCLENBQTNCLEVBQTZCLFVBQVNGLENBQVQsRUFBVztBQUFDRyxZQUFFTyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUF0RCxFQUF1RCxVQUFTQSxDQUFULEVBQVc7QUFBQ0csWUFBRVEsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBL0UsR0FBaUZHLEVBQUVTLE9BQTFGO0FBQWtHLE9BQWx0QixFQUFtdEJtaEIsUUFBTyxnQkFBUzdoQixDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRWtDLE9BQUYsQ0FBVXlmLFdBQVYsQ0FBc0JHLE1BQXRCLENBQTZCN2hCLENBQTdCLEVBQStCLFVBQVNGLENBQVQsRUFBVztBQUFDRyxZQUFFTyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUF4RCxFQUF5RCxVQUFTQSxDQUFULEVBQVc7QUFBQ0csWUFBRVEsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBakYsR0FBbUZHLEVBQUVTLE9BQTVGO0FBQW9HLE9BQTExQixFQUEyMUJvaEIsMEJBQXlCLGtDQUFTOWhCLENBQVQsRUFBV0MsQ0FBWCxFQUFhO0FBQUMsWUFBSVcsSUFBRWQsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVrQyxPQUFGLENBQVV5ZixXQUFWLENBQXNCSSx3QkFBdEIsQ0FBK0M5aEIsQ0FBL0MsRUFBaURDLENBQWpELEVBQW1ELFVBQVNILENBQVQsRUFBVztBQUFDYyxZQUFFSixPQUFGLENBQVVWLENBQVY7QUFBYSxTQUE1RSxFQUE2RSxVQUFTQSxDQUFULEVBQVc7QUFBQ2MsWUFBRUgsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBckcsR0FBdUdjLEVBQUVGLE9BQWhIO0FBQXdILE9BQTFnQyxFQUFOO0FBQWtoQyxHQUFoakMsQ0FBakYsQ0FGdnJVLEVBRTJ6V2YsUUFBUUMsTUFBUixDQUFlLDJCQUFmLEVBQTJDLEVBQTNDLEVBQStDQyxPQUEvQyxDQUF1RCxpQkFBdkQsRUFBeUUsQ0FBQyxZQUFELEVBQWMsVUFBZCxFQUF5QixVQUFTQyxDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFFBQUlDLElBQUUsYUFBVTtBQUFDLFVBQUlBLElBQUV1RixVQUFVd2MsVUFBVixDQUFxQjdoQixJQUEzQixDQUFnQ0gsRUFBRSxZQUFVO0FBQUNELFVBQUU4RyxVQUFGLENBQWEseUJBQWIsRUFBdUM1RyxDQUF2QztBQUEwQyxPQUF2RDtBQUF5RCxLQUExRztBQUFBLFFBQTJHQyxJQUFFLFNBQUZBLENBQUUsR0FBVTtBQUFDLFVBQUlELElBQUV1RixVQUFVd2MsVUFBVixDQUFxQjdoQixJQUEzQixDQUFnQ0gsRUFBRSxZQUFVO0FBQUNELFVBQUU4RyxVQUFGLENBQWEsd0JBQWIsRUFBc0M1RyxDQUF0QztBQUF5QyxPQUF0RDtBQUF3RCxLQUFoTixDQUFpTixPQUFPNkcsU0FBU0MsZ0JBQVQsQ0FBMEIsYUFBMUIsRUFBd0MsWUFBVTtBQUFDdkIsZ0JBQVV3YyxVQUFWLEtBQXVCbGIsU0FBU0MsZ0JBQVQsQ0FBMEIsU0FBMUIsRUFBb0M5RyxDQUFwQyxFQUFzQyxDQUFDLENBQXZDLEdBQTBDNkcsU0FBU0MsZ0JBQVQsQ0FBMEIsUUFBMUIsRUFBbUM3RyxDQUFuQyxFQUFxQyxDQUFDLENBQXRDLENBQWpFO0FBQTJHLEtBQTlKLEdBQWdLLEVBQUMraEIsWUFBVyxzQkFBVTtBQUFDLGVBQU96YyxVQUFVd2MsVUFBVixDQUFxQjdoQixJQUE1QjtBQUFpQyxPQUF4RCxFQUF5RCtoQixVQUFTLG9CQUFVO0FBQUMsWUFBSW5pQixJQUFFeUYsVUFBVXdjLFVBQVYsQ0FBcUI3aEIsSUFBM0IsQ0FBZ0MsT0FBT0osTUFBSW9pQixXQUFXQyxPQUFmLElBQXdCcmlCLE1BQUlvaUIsV0FBV0UsSUFBOUM7QUFBbUQsT0FBaEssRUFBaUtDLFdBQVUscUJBQVU7QUFBQyxZQUFJdmlCLElBQUV5RixVQUFVd2MsVUFBVixDQUFxQjdoQixJQUEzQixDQUFnQyxPQUFPSixNQUFJb2lCLFdBQVdDLE9BQWYsSUFBd0JyaUIsTUFBSW9pQixXQUFXRSxJQUE5QztBQUFtRCxPQUF6USxFQUEwUUUsbUJBQWtCLDZCQUFVO0FBQUN6YixpQkFBU3NYLG1CQUFULENBQTZCLFNBQTdCLEVBQXVDbmUsQ0FBdkMsR0FBMENGLEVBQUVzZSxXQUFGLENBQWMseUJBQWQsSUFBeUMsRUFBbkY7QUFBc0YsT0FBN1gsRUFBOFhtRSxrQkFBaUIsNEJBQVU7QUFBQzFiLGlCQUFTc1gsbUJBQVQsQ0FBNkIsUUFBN0IsRUFBc0NsZSxDQUF0QyxHQUF5Q0gsRUFBRXNlLFdBQUYsQ0FBYyx3QkFBZCxJQUF3QyxFQUFqRjtBQUFvRixPQUE5ZSxFQUF2SztBQUF1cEIsR0FBLzRCLENBQXpFLEVBQTI5QnBYLEdBQTM5QixDQUErOUIsQ0FBQyxXQUFELEVBQWEsVUFBU2xILENBQVQsRUFBVztBQUFDQSxNQUFFdUcsR0FBRixDQUFNLGlCQUFOO0FBQXlCLEdBQWxELENBQS85QixDQUYzelcsRUFFKzBZMUcsUUFBUUMsTUFBUixDQUFlLDZCQUFmLEVBQTZDLEVBQTdDLEVBQWlEQyxPQUFqRCxDQUF5RCxtQkFBekQsRUFBNkUsQ0FBQyxJQUFELEVBQU0sU0FBTixFQUFnQixVQUFTQyxDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFdBQU0sRUFBQytSLFFBQU8sZ0JBQVM5UixDQUFULEVBQVdDLENBQVgsRUFBYVcsQ0FBYixFQUFlO0FBQUMsWUFBSUMsSUFBRWYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVrQyxPQUFGLENBQVV1Z0IsU0FBVixDQUFvQjFRLE1BQXBCLENBQTJCOVIsQ0FBM0IsRUFBNkIsVUFBU0YsQ0FBVCxFQUFXO0FBQUNlLFlBQUVMLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQXRELEVBQXVERyxDQUF2RCxFQUF5RFcsQ0FBekQsR0FBNERDLEVBQUVILE9BQXJFO0FBQTZFLE9BQXJILEVBQU47QUFBNkgsR0FBM0osQ0FBN0UsQ0FGLzBZLEVBRTBqWmYsUUFBUUMsTUFBUixDQUFlLCtCQUFmLEVBQStDLEVBQS9DLEVBQW1EQyxPQUFuRCxDQUEyRCxxQkFBM0QsRUFBaUYsQ0FBQyxTQUFELEVBQVcsSUFBWCxFQUFnQixVQUFTQyxDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFdBQU0sRUFBQzBpQix5QkFBd0Isb0JBQXpCLEVBQThDQyxpQkFBZ0IseUJBQVM1aUIsQ0FBVCxFQUFXO0FBQUNBLFVBQUVnVixPQUFGLEdBQVUsVUFBUy9VLENBQVQsRUFBVztBQUFDLGlCQUFPRCxFQUFFMEIsSUFBRixDQUFPekIsQ0FBUCxHQUFVRCxDQUFqQjtBQUFtQixTQUF6QyxFQUEwQ0EsRUFBRTBWLEtBQUYsR0FBUSxVQUFTelYsQ0FBVCxFQUFXO0FBQUMsaUJBQU9ELEVBQUUwQixJQUFGLENBQU8sSUFBUCxFQUFZekIsQ0FBWixHQUFlRCxDQUF0QjtBQUF3QixTQUF0RjtBQUF1RixPQUFqSyxFQUFrSzZpQixPQUFNLGVBQVMzaUIsQ0FBVCxFQUFXQyxDQUFYLEVBQWFXLENBQWIsRUFBZTtBQUFDLGlCQUFTQyxDQUFULENBQVdmLENBQVgsRUFBYTtBQUFDaUIsWUFBRVAsT0FBRixDQUFVVixDQUFWO0FBQWEsa0JBQVNnQixDQUFULENBQVdoQixDQUFYLEVBQWE7QUFBQ2lCLFlBQUVOLE1BQUYsQ0FBUyxJQUFJbWlCLEtBQUosQ0FBVTlpQixDQUFWLENBQVQ7QUFBdUIsYUFBSWlCLElBQUVoQixFQUFFSyxLQUFGLEVBQU47QUFBQSxZQUFnQlksSUFBRUQsRUFBRUwsT0FBcEIsQ0FBNEIsSUFBR1osRUFBRW1DLE9BQUwsRUFBYTtBQUFDLGNBQUloQixDQUFKLENBQU1BLElBQUUsTUFBSTRoQixVQUFVN1QsTUFBZCxHQUFxQmxQLEVBQUVtQyxPQUFGLENBQVU2Z0IsY0FBVixDQUF5QkgsS0FBekIsQ0FBK0IvaEIsQ0FBL0IsRUFBaUNaLENBQWpDLEVBQW1DQyxDQUFuQyxDQUFyQixHQUEyREgsRUFBRW1DLE9BQUYsQ0FBVTZnQixjQUFWLENBQXlCSCxLQUF6QixDQUErQjNpQixDQUEvQixFQUFpQ0MsQ0FBakMsQ0FBN0QsRUFBaUdnQixFQUFFTyxJQUFGLENBQU9YLENBQVAsRUFBU0MsQ0FBVCxDQUFqRztBQUE2RyxTQUFqSSxNQUFzSUMsRUFBRU4sTUFBRixDQUFTLElBQUltaUIsS0FBSixDQUFVLEtBQUtILHVCQUFmLENBQVQsRUFBa0QsT0FBTyxLQUFLQyxlQUFMLENBQXFCMWhCLENBQXJCLEdBQXdCQSxDQUEvQjtBQUFpQyxPQUE3ZSxFQUE4ZStoQixPQUFNLGVBQVMvaUIsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxpQkFBU1csQ0FBVCxDQUFXZCxDQUFYLEVBQWE7QUFBQ2dCLFlBQUVOLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLGtCQUFTZSxDQUFULENBQVdmLENBQVgsRUFBYTtBQUFDZ0IsWUFBRUwsTUFBRixDQUFTLElBQUltaUIsS0FBSixDQUFVOWlCLENBQVYsQ0FBVDtBQUF1QixhQUFJZ0IsSUFBRWYsRUFBRUssS0FBRixFQUFOO0FBQUEsWUFBZ0JXLElBQUVELEVBQUVKLE9BQXBCLENBQTRCLElBQUdaLEVBQUVtQyxPQUFMLEVBQWE7QUFBQyxjQUFJakIsQ0FBSixDQUFNQSxJQUFFLE1BQUk2aEIsVUFBVTdULE1BQWQsR0FBcUJsUCxFQUFFbUMsT0FBRixDQUFVNmdCLGNBQVYsQ0FBeUJDLEtBQXpCLENBQStCOWlCLENBQS9CLEVBQWlDRCxDQUFqQyxDQUFyQixHQUF5REYsRUFBRW1DLE9BQUYsQ0FBVTZnQixjQUFWLENBQXlCQyxLQUF6QixDQUErQi9pQixDQUEvQixDQUEzRCxFQUE2RmdCLEVBQUVRLElBQUYsQ0FBT1osQ0FBUCxFQUFTQyxDQUFULENBQTdGO0FBQXlHLFNBQTdILE1BQWtJQyxFQUFFTCxNQUFGLENBQVMsSUFBSW1pQixLQUFKLENBQVUsS0FBS0gsdUJBQWYsQ0FBVCxFQUFrRCxPQUFPLEtBQUtDLGVBQUwsQ0FBcUIzaEIsQ0FBckIsR0FBd0JBLENBQS9CO0FBQWlDLE9BQW56QixFQUFvekIyTyxRQUFPLGdCQUFTMVAsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxpQkFBU1csQ0FBVCxDQUFXZCxDQUFYLEVBQWE7QUFBQ2dCLFlBQUVOLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLGtCQUFTZSxDQUFULENBQVdmLENBQVgsRUFBYTtBQUFDZ0IsWUFBRUwsTUFBRixDQUFTLElBQUltaUIsS0FBSixDQUFVOWlCLENBQVYsQ0FBVDtBQUF1QixhQUFJZ0IsSUFBRWYsRUFBRUssS0FBRixFQUFOO0FBQUEsWUFBZ0JXLElBQUVELEVBQUVKLE9BQXBCLENBQTRCLElBQUdaLEVBQUVtQyxPQUFMLEVBQWE7QUFBQyxjQUFJakIsQ0FBSixDQUFNQSxJQUFFLE1BQUk2aEIsVUFBVTdULE1BQWQsR0FBcUJsUCxFQUFFbUMsT0FBRixDQUFVNmdCLGNBQVYsQ0FBeUJwVCxNQUF6QixDQUFnQ3pQLENBQWhDLEVBQWtDRCxDQUFsQyxDQUFyQixHQUEwREYsRUFBRW1DLE9BQUYsQ0FBVTZnQixjQUFWLENBQXlCcFQsTUFBekIsQ0FBZ0MxUCxDQUFoQyxDQUE1RCxFQUErRmdCLEVBQUVRLElBQUYsQ0FBT1osQ0FBUCxFQUFTQyxDQUFULENBQS9GO0FBQTJHLFNBQS9ILE1BQW9JQyxFQUFFTCxNQUFGLENBQVMsSUFBSW1pQixLQUFKLENBQVUsS0FBS0gsdUJBQWYsQ0FBVCxFQUFrRCxPQUFPLEtBQUtDLGVBQUwsQ0FBcUIzaEIsQ0FBckIsR0FBd0JBLENBQS9CO0FBQWlDLE9BQTVuQyxFQUE2bkNpQixNQUFLLGdCQUFVO0FBQUMsaUJBQVNoQyxDQUFULENBQVdGLENBQVgsRUFBYTtBQUFDYyxZQUFFSixPQUFGLENBQVVWLENBQVY7QUFBYSxrQkFBU0csQ0FBVCxDQUFXSCxDQUFYLEVBQWE7QUFBQ2MsWUFBRUgsTUFBRixDQUFTLElBQUltaUIsS0FBSixDQUFVOWlCLENBQVYsQ0FBVDtBQUF1QixhQUFJYyxJQUFFYixFQUFFSyxLQUFGLEVBQU47QUFBQSxZQUFnQlMsSUFBRUQsRUFBRUYsT0FBcEIsQ0FBNEIsT0FBT1osRUFBRW1DLE9BQUYsR0FBVW5DLEVBQUVtQyxPQUFGLENBQVU2Z0IsY0FBVixDQUF5QjlnQixJQUF6QixHQUFnQ1IsSUFBaEMsQ0FBcUN4QixDQUFyQyxFQUF1Q0MsQ0FBdkMsQ0FBVixHQUFvRFcsRUFBRUgsTUFBRixDQUFTLElBQUltaUIsS0FBSixDQUFVLEtBQUtILHVCQUFmLENBQVQsQ0FBcEQsRUFBc0csS0FBS0MsZUFBTCxDQUFxQjdoQixDQUFyQixDQUF0RyxFQUE4SEEsQ0FBckk7QUFBdUksT0FBaDNDLEVBQU47QUFBdzNDLEdBQXQ1QyxDQUFqRixDQUYxalosRUFFb2ljbEIsUUFBUUMsTUFBUixDQUFlLDJCQUFmLEVBQTJDLEVBQTNDLEVBQStDQyxPQUEvQyxDQUF1RCxpQkFBdkQsRUFBeUUsQ0FBQyxJQUFELEVBQU0sU0FBTixFQUFnQixVQUFTQyxDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFdBQU0sRUFBQ0ksYUFBWSx1QkFBVTtBQUFDLFlBQUlILElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFMFosTUFBRixDQUFTdUosT0FBVCxDQUFpQjdpQixXQUFqQixDQUE2QixVQUFTTCxDQUFULEVBQVc7QUFBQ0UsWUFBRVEsT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBdEQsR0FBd0RFLEVBQUVVLE9BQWpFO0FBQXlFLE9BQWpILEVBQWtIdWlCLE9BQU0sZUFBU2pqQixDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFlBQUlXLElBQUVkLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFMFosTUFBRixDQUFTdUosT0FBVCxDQUFpQkMsS0FBakIsQ0FBdUJqakIsQ0FBdkIsRUFBeUJDLENBQXpCLEVBQTJCLFlBQVU7QUFBQ1csWUFBRUosT0FBRjtBQUFZLFNBQWxELEdBQW9ESSxFQUFFRixPQUE3RDtBQUFxRSxPQUEzTixFQUFOO0FBQW1PLEdBQWpRLENBQXpFLENBRnBpYyxFQUVpM2NmLFFBQVFDLE1BQVIsQ0FBZSxxQ0FBZixFQUFxRCxFQUFyRCxFQUF5REMsT0FBekQsQ0FBaUUsa0JBQWpFLEVBQW9GLENBQUMsWUFBVTtBQUFDLFdBQU0sRUFBQ21DLE1BQUssY0FBU2xDLENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVELEtBQUcsZ0JBQVQsQ0FBMEIsT0FBT29qQixrQkFBa0JsaEIsSUFBbEIsQ0FBdUJqQyxDQUF2QixDQUFQO0FBQWlDLE9BQTdFLEVBQThFb2pCLFlBQVcsb0JBQVNyakIsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUQsS0FBRyxDQUFDLENBQVYsQ0FBWSxPQUFPb2pCLGtCQUFrQkMsVUFBbEIsQ0FBNkJwakIsQ0FBN0IsQ0FBUDtBQUF1QyxPQUF4SixFQUF5SnFqQixxQkFBb0IsNkJBQVN0akIsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxZQUFJQyxJQUFFRixLQUFHLENBQUMsQ0FBVjtBQUFBLFlBQVlHLElBQUVGLEtBQUcsWUFBakIsQ0FBOEIsT0FBT21qQixrQkFBa0JFLG1CQUFsQixDQUFzQ3BqQixDQUF0QyxFQUF3Q0MsQ0FBeEMsQ0FBUDtBQUFrRCxPQUEzUSxFQUE0UW9qQiwyQkFBMEIsbUNBQVN2akIsQ0FBVCxFQUFXQyxDQUFYLEVBQWFDLENBQWIsRUFBZTtBQUFDLFlBQUlDLElBQUVILEtBQUcsQ0FBQyxDQUFWO0FBQUEsWUFBWWMsSUFBRWIsS0FBRyxZQUFqQjtBQUFBLFlBQThCYyxJQUFFYixLQUFHLGFBQW5DLENBQWlELE9BQU9rakIsa0JBQWtCRyx5QkFBbEIsQ0FBNENwakIsQ0FBNUMsRUFBOENXLENBQTlDLEVBQWdEQyxDQUFoRCxDQUFQO0FBQTBELE9BQWphLEVBQWtheWlCLGlCQUFnQix5QkFBU3hqQixDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFlBQUlDLElBQUVGLEtBQUcsQ0FBQyxDQUFWO0FBQUEsWUFBWUcsSUFBRUYsS0FBRyxHQUFqQixDQUFxQixPQUFPbWpCLGtCQUFrQkksZUFBbEIsQ0FBa0N0akIsQ0FBbEMsRUFBb0NDLENBQXBDLENBQVA7QUFBOEMsT0FBbmdCLEVBQW9nQnNqQiwwQkFBeUIsa0NBQVN6akIsQ0FBVCxFQUFXQyxDQUFYLEVBQWFDLENBQWIsRUFBZTtBQUFDLFlBQUlDLElBQUVILEtBQUcsQ0FBQyxDQUFWO0FBQUEsWUFBWWMsSUFBRWIsS0FBRyxHQUFqQjtBQUFBLFlBQXFCYyxJQUFFYixLQUFHLFlBQTFCLENBQXVDLE9BQU9rakIsa0JBQWtCSyx3QkFBbEIsQ0FBMkN0akIsQ0FBM0MsRUFBNkNXLENBQTdDLEVBQStDQyxDQUEvQyxDQUFQO0FBQXlELE9BQTdvQixFQUE4b0IyaUIsYUFBWSxxQkFBUzFqQixDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFlBQUlDLElBQUVGLEtBQUcsQ0FBQyxDQUFWO0FBQUEsWUFBWUcsSUFBRUYsS0FBRyxHQUFqQixDQUFxQixPQUFPbWpCLGtCQUFrQk0sV0FBbEIsQ0FBOEJ4akIsQ0FBOUIsRUFBZ0NDLENBQWhDLENBQVA7QUFBMEMsT0FBdnVCLEVBQXd1QndqQixzQkFBcUIsOEJBQVMzakIsQ0FBVCxFQUFXQyxDQUFYLEVBQWFDLENBQWIsRUFBZTtBQUFDLFlBQUlDLElBQUVILEtBQUcsQ0FBQyxDQUFWO0FBQUEsWUFBWWMsSUFBRWIsS0FBRyxHQUFqQjtBQUFBLFlBQXFCYyxJQUFFYixLQUFHLFlBQTFCLENBQXVDLE9BQU9rakIsa0JBQWtCTyxvQkFBbEIsQ0FBdUN4akIsQ0FBdkMsRUFBeUNXLENBQXpDLEVBQTJDQyxDQUEzQyxDQUFQO0FBQXFELE9BQXoyQixFQUEwMkI2aUIsU0FBUSxpQkFBUzVqQixDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFlBQUlDLElBQUVGLEtBQUcsQ0FBQyxDQUFWO0FBQUEsWUFBWUcsSUFBRUYsS0FBRyxHQUFqQixDQUFxQixPQUFPbWpCLGtCQUFrQlEsT0FBbEIsQ0FBMEIxakIsQ0FBMUIsRUFBNEJDLENBQTVCLENBQVA7QUFBc0MsT0FBMzdCLEVBQTQ3QjBqQixrQkFBaUIsMEJBQVM3akIsQ0FBVCxFQUFXQyxDQUFYLEVBQWFDLENBQWIsRUFBZTtBQUFDLFlBQUlDLElBQUVILEtBQUcsQ0FBQyxDQUFWO0FBQUEsWUFBWWMsSUFBRWIsS0FBRyxHQUFqQjtBQUFBLFlBQXFCYyxJQUFFYixLQUFHLFlBQTFCLENBQXVDLE9BQU9rakIsa0JBQWtCUyxnQkFBbEIsQ0FBbUMxakIsQ0FBbkMsRUFBcUNXLENBQXJDLEVBQXVDQyxDQUF2QyxDQUFQO0FBQWlELE9BQXJqQyxFQUFzakMraUIsYUFBWSxxQkFBUzlqQixDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFlBQUlDLElBQUVGLEtBQUcsQ0FBQyxDQUFWO0FBQUEsWUFBWUcsSUFBRUYsS0FBRyxTQUFqQixDQUEyQixPQUFPbWpCLGtCQUFrQlUsV0FBbEIsQ0FBOEI1akIsQ0FBOUIsRUFBZ0NDLENBQWhDLENBQVA7QUFBMEMsT0FBcnBDLEVBQXNwQzRqQixVQUFTLGtCQUFTL2pCLENBQVQsRUFBV0MsQ0FBWCxFQUFhQyxDQUFiLEVBQWU7QUFBQyxZQUFJQyxJQUFFSCxLQUFHLENBQUMsQ0FBVjtBQUFBLFlBQVljLElBQUViLEtBQUcsU0FBakI7QUFBQSxZQUEyQmMsSUFBRWIsS0FBRyxRQUFoQyxDQUF5QyxPQUFPa2pCLGtCQUFrQlcsUUFBbEIsQ0FBMkI1akIsQ0FBM0IsRUFBNkJXLENBQTdCLEVBQStCQyxDQUEvQixDQUFQO0FBQXlDLE9BQWp3QyxFQUFrd0NzQixNQUFLLGdCQUFVO0FBQUMsZUFBTytnQixrQkFBa0IvZ0IsSUFBbEIsRUFBUDtBQUFnQyxPQUFsekMsRUFBTjtBQUEwekMsR0FBdDBDLENBQXBGLENBRmozYyxFQUU4d2Z4QyxRQUFRQyxNQUFSLENBQWUsd0JBQWYsRUFBd0MsRUFBeEMsRUFBNENDLE9BQTVDLENBQW9ELGNBQXBELEVBQW1FLENBQUMsSUFBRCxFQUFNLFNBQU4sRUFBZ0IsWUFBaEIsRUFBNkIsVUFBN0IsRUFBd0MsVUFBU0MsQ0FBVCxFQUFXQyxDQUFYLEVBQWFDLENBQWIsRUFBZUMsQ0FBZixFQUFpQjtBQUFDLFdBQU0sRUFBQzZqQixnQkFBZSx3QkFBU2hrQixDQUFULEVBQVc7QUFBQ0csVUFBRSxZQUFVO0FBQUNELFlBQUU0RyxVQUFGLENBQWEsbUNBQWIsRUFBaUQ5RyxDQUFqRDtBQUFvRCxTQUFqRTtBQUFtRSxPQUEvRixFQUFnR2lrQixVQUFTLGtCQUFTL2pCLENBQVQsRUFBVztBQUFDLFlBQUlDLENBQUo7QUFBQSxZQUFNVyxJQUFFZCxFQUFFTSxLQUFGLEVBQVIsQ0FBa0IsT0FBTyxLQUFLLENBQUwsS0FBU0osQ0FBVCxJQUFZLEtBQUssQ0FBTCxLQUFTQSxFQUFFZ2tCLEdBQXZCLEtBQTZCL2pCLElBQUUsU0FBTzRHLFNBQVNvZCxhQUFULENBQXVCLFVBQXZCLENBQVAsR0FBMEMsZUFBMUMsR0FBMEQsb0NBQTVELEVBQWlHamtCLEVBQUVna0IsR0FBRixHQUFNLHFCQUFtQi9qQixDQUFuQixHQUFxQixpREFBekosR0FBNE1GLEVBQUVrQyxPQUFGLENBQVVpaUIsZ0JBQVYsQ0FBMkJILFFBQTNCLENBQW9DLFVBQVNqa0IsQ0FBVCxFQUFXO0FBQUNjLFlBQUVKLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQTdELEVBQThELFVBQVNBLENBQVQsRUFBVztBQUFDYyxZQUFFSCxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUF0RixFQUF1RkUsQ0FBdkYsQ0FBNU0sRUFBc1NZLEVBQUVGLE9BQS9TO0FBQXVULE9BQTliLEVBQStieWpCLFlBQVcsb0JBQVNua0IsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVrQyxPQUFGLENBQVVpaUIsZ0JBQVYsQ0FBMkJDLFVBQTNCLENBQXNDLFVBQVNya0IsQ0FBVCxFQUFXO0FBQUNHLFlBQUVPLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQS9ELEVBQWdFLFVBQVNBLENBQVQsRUFBVztBQUFDRyxZQUFFUSxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUF4RixFQUF5RkUsQ0FBekYsR0FBNEZDLEVBQUVTLE9BQXJHO0FBQTZHLE9BQW5sQixFQUFvbEIwakIsZ0JBQWUsd0JBQVNwa0IsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVrQyxPQUFGLENBQVVpaUIsZ0JBQVYsQ0FBMkJHLDZCQUEzQixDQUF5RCxVQUFTdmtCLENBQVQsRUFBVztBQUFDRyxZQUFFTyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUFsRixFQUFtRixVQUFTQSxDQUFULEVBQVc7QUFBQ0csWUFBRVEsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBM0csRUFBNEdFLENBQTVHLEdBQStHQyxFQUFFUyxPQUF4SDtBQUFnSSxPQUEvdkIsRUFBTjtBQUF1d0IsR0FBajBCLENBQW5FLENBRjl3ZixFQUVxcGhCZixRQUFRQyxNQUFSLENBQWUsMkJBQWYsRUFBMkMsRUFBM0MsRUFBK0NDLE9BQS9DLENBQXVELGdCQUF2RCxFQUF3RSxDQUFDLElBQUQsRUFBTSxZQUFOLEVBQW1CLFVBQW5CLEVBQThCLFVBQVNDLENBQVQsRUFBV0MsQ0FBWCxFQUFhQyxDQUFiLEVBQWU7QUFBQyxRQUFJQyxDQUFKLENBQU0sT0FBTSxFQUFDcWtCLFlBQVcsb0JBQVN2a0IsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9ILElBQUVza0IsaUJBQWlCamYsSUFBakIsQ0FBc0J2RixDQUF0QixDQUFGLEVBQTJCQyxFQUFFUSxPQUFGLENBQVVQLENBQVYsQ0FBM0IsRUFBd0NELEVBQUVVLE9BQWpEO0FBQXlELE9BQWpHLEVBQWtHb2pCLGdCQUFlLDBCQUFVO0FBQUM5akIsVUFBRSxZQUFVO0FBQUNDLFlBQUU0ZSxFQUFGLENBQUssY0FBTCxFQUFvQixVQUFTL2UsQ0FBVCxFQUFXO0FBQUNDLGNBQUV5a0IsS0FBRixDQUFRLHFDQUFSLEVBQThDMWtCLENBQTlDO0FBQWlELFdBQWpGO0FBQW1GLFNBQWhHO0FBQWtHLE9BQTlOLEVBQStOMmtCLFNBQVEsbUJBQVU7QUFBQ3prQixVQUFFLFlBQVU7QUFBQ0MsWUFBRTRlLEVBQUYsQ0FBSyxPQUFMLEVBQWEsVUFBUy9lLENBQVQsRUFBVztBQUFDQyxjQUFFeWtCLEtBQUYsQ0FBUSw4QkFBUixFQUF1QzFrQixDQUF2QztBQUEwQyxXQUFuRTtBQUFxRSxTQUFsRjtBQUFvRixPQUF0VSxFQUF1VWlrQixVQUFTLG9CQUFVO0FBQUMsWUFBSWhrQixJQUFFRCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBTyxLQUFLLENBQUwsS0FBU0gsQ0FBVCxHQUFXRixFQUFFVSxNQUFGLENBQVMsSUFBSW1pQixLQUFKLENBQVUsZ0RBQVYsQ0FBVCxDQUFYLEdBQWlGM2lCLEVBQUU0ZSxFQUFGLENBQUssY0FBTCxFQUFvQixVQUFTL2UsQ0FBVCxFQUFXO0FBQUNDLFlBQUVTLE9BQUYsQ0FBVVYsRUFBRTRrQixjQUFaO0FBQTRCLFNBQTVELENBQWpGLEVBQStJM2tCLEVBQUVXLE9BQXhKO0FBQWdLLE9BQTNnQixFQUE0Z0J5akIsWUFBVyxzQkFBVTtBQUFDLFlBQUlwa0IsSUFBRUQsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU8sS0FBSyxDQUFMLEtBQVNILENBQVQsR0FBV0YsRUFBRVUsTUFBRixDQUFTLElBQUltaUIsS0FBSixDQUFVLGdEQUFWLENBQVQsQ0FBWCxHQUFpRjNpQixFQUFFa2tCLFVBQUYsQ0FBYSxVQUFTcmtCLENBQVQsRUFBVztBQUFDQyxZQUFFUyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUF0QyxFQUF1QyxVQUFTQSxDQUFULEVBQVc7QUFBQ0MsWUFBRVUsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBL0QsQ0FBakYsRUFBa0pDLEVBQUVXLE9BQTNKO0FBQW1LLE9BQXJ0QixFQUFzdEJpa0IsZ0JBQWUsMEJBQVU7QUFBQyxZQUFJNWtCLElBQUVELEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPLEtBQUssQ0FBTCxLQUFTSCxDQUFULEdBQVdGLEVBQUVVLE1BQUYsQ0FBUyxJQUFJbWlCLEtBQUosQ0FBVSxnREFBVixDQUFULENBQVgsR0FBaUYzaUIsRUFBRTJrQiw2QkFBRixDQUFnQyxVQUFTOWtCLENBQVQsRUFBVztBQUFDQyxZQUFFUyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUF6RCxFQUEwRCxVQUFTQSxDQUFULEVBQVc7QUFBQ0MsWUFBRVUsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBbEYsQ0FBakYsRUFBcUtDLEVBQUVXLE9BQTlLO0FBQXNMLE9BQXQ3QixFQUF1N0IwakIsZ0JBQWUsd0JBQVNya0IsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU8sS0FBSyxDQUFMLEtBQVNILENBQVQsR0FBV0QsRUFBRVMsTUFBRixDQUFTLElBQUltaUIsS0FBSixDQUFVLGdEQUFWLENBQVQsQ0FBWCxHQUFpRjNpQixFQUFFb2tCLDZCQUFGLENBQWdDLFVBQVN2a0IsQ0FBVCxFQUFXO0FBQUNFLFlBQUVRLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQXpELEVBQTBELFVBQVNBLENBQVQsRUFBVztBQUFDRSxZQUFFUyxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUFsRixFQUFtRkMsQ0FBbkYsQ0FBakYsRUFBdUtDLEVBQUVVLE9BQWhMO0FBQXdMLE9BQTFwQyxFQUEycENtRixRQUFPLGtCQUFVO0FBQUMsWUFBSTlGLElBQUVELEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPLEtBQUssQ0FBTCxLQUFTSCxDQUFULEdBQVdGLEVBQUVVLE1BQUYsQ0FBUyxJQUFJbWlCLEtBQUosQ0FBVSxnREFBVixDQUFULENBQVgsR0FBaUYzaUIsRUFBRTRGLE1BQUYsQ0FBUyxVQUFTL0YsQ0FBVCxFQUFXO0FBQUNDLFlBQUVTLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQWxDLEVBQW1DLFVBQVNBLENBQVQsRUFBVztBQUFDQyxZQUFFVSxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUEzRCxDQUFqRixFQUE4SUMsRUFBRVcsT0FBdko7QUFBK0osT0FBNTFDLEVBQU47QUFBbzJDLEdBQXg1QyxDQUF4RSxDQUZycGhCLEVBRXdua0JmLFFBQVFDLE1BQVIsQ0FBZSxrQ0FBZixFQUFrRCxFQUFsRCxFQUFzREMsT0FBdEQsQ0FBOEQsaUJBQTlELEVBQWdGLFlBQVU7QUFBQyxXQUFNLEVBQUNnbEIsVUFBUyxrQkFBUy9rQixDQUFULEVBQVc7QUFBQyxlQUFPZ2xCLGVBQWVELFFBQWYsQ0FBd0Iva0IsQ0FBeEIsQ0FBUDtBQUFrQyxPQUF4RCxFQUF5RGlsQixnQkFBZSx3QkFBU2psQixDQUFULEVBQVc7QUFBQyxlQUFPZ2xCLGVBQWVDLGNBQWYsQ0FBOEJqbEIsQ0FBOUIsQ0FBUDtBQUF3QyxPQUE1SCxFQUE2SHVULFlBQVcsb0JBQVN2VCxDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLGVBQU8ra0IsZUFBZXpSLFVBQWYsQ0FBMEJ2VCxDQUExQixFQUE0QkMsQ0FBNUIsQ0FBUDtBQUFzQyxPQUE1TCxFQUFOO0FBQW9NLEdBQS9SLENBRnhua0IsRUFFeTVrQkosUUFBUUMsTUFBUixDQUFlLDhCQUFmLEVBQThDLEVBQTlDLEVBQWtEQyxPQUFsRCxDQUEwRCxvQkFBMUQsRUFBK0UsQ0FBQyxJQUFELEVBQU0sVUFBU0MsQ0FBVCxFQUFXO0FBQUMsV0FBTSxFQUFDa2xCLGVBQWMsdUJBQVNqbEIsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUQsS0FBRyxFQUFUO0FBQUEsWUFBWUUsSUFBRUQsRUFBRWlsQixTQUFGLElBQWEsS0FBM0I7QUFBQSxZQUFpQ3JrQixJQUFFWixFQUFFa2xCLE9BQUYsSUFBVyxLQUE5QztBQUFBLFlBQW9EcmtCLElBQUVmLEVBQUVNLEtBQUYsRUFBdEQsQ0FBZ0UsT0FBT21GLFVBQVU0ZixVQUFWLElBQXNCNWYsVUFBVTRmLFVBQVYsQ0FBcUI1VixJQUFyQixDQUEwQixVQUFTelAsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQ0QsY0FBRWUsRUFBRUosTUFBRixDQUFTWCxDQUFULENBQUYsR0FBY2UsRUFBRUwsT0FBRixDQUFVVCxFQUFFcWxCLFFBQVosQ0FBZDtBQUFvQyxTQUE1RSxFQUE2RW5sQixDQUE3RSxFQUErRVcsQ0FBL0UsRUFBaUZaLEVBQUVxbEIsUUFBbkYsR0FBNkZ4a0IsRUFBRUgsT0FBckgsS0FBK0hHLEVBQUVMLE9BQUYsQ0FBVSxJQUFWLEdBQWdCSyxFQUFFSCxPQUFqSixDQUFQO0FBQWlLLE9BQTVQLEVBQTZQNGtCLGNBQWEsc0JBQVN2bEIsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUQsS0FBRyxFQUFUO0FBQUEsWUFBWUUsSUFBRUQsRUFBRWlsQixTQUFGLElBQWEsS0FBM0I7QUFBQSxZQUFpQ3JrQixJQUFFWixFQUFFa2xCLE9BQUYsSUFBVyxLQUE5QztBQUFBLFlBQW9EcmtCLElBQUVmLEVBQUVNLEtBQUYsRUFBdEQsQ0FBZ0UsT0FBT21GLFVBQVU0ZixVQUFWLElBQXNCNWYsVUFBVTRmLFVBQVYsQ0FBcUJJLEdBQXJCLENBQXlCLFVBQVN6bEIsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQ0QsY0FBRWUsRUFBRUosTUFBRixDQUFTWCxDQUFULENBQUYsR0FBY2UsRUFBRUwsT0FBRixDQUFVVCxFQUFFd2xCLEdBQVosQ0FBZDtBQUErQixTQUF0RSxFQUF1RXRsQixDQUF2RSxFQUF5RVcsQ0FBekUsRUFBMkVaLEVBQUVxbEIsUUFBN0UsR0FBdUZ4a0IsRUFBRUgsT0FBL0csS0FBeUhHLEVBQUVMLE9BQUYsQ0FBVSxJQUFWLEdBQWdCSyxFQUFFSCxPQUEzSSxDQUFQO0FBQTJKLE9BQWpmLEVBQU47QUFBeWYsR0FBM2dCLENBQS9FLENBRno1a0IsRUFFcy9sQmYsUUFBUUMsTUFBUixDQUFlLDBCQUFmLEVBQTBDLEVBQTFDLEVBQThDQyxPQUE5QyxDQUFzRCxnQkFBdEQsRUFBdUUsQ0FBQyxJQUFELEVBQU0sVUFBU0MsQ0FBVCxFQUFXO0FBQUMsUUFBSUMsSUFBRSxFQUFOLENBQVMsT0FBT0EsRUFBRXlsQixpQkFBRixHQUFvQixVQUFTemxCLENBQVQsRUFBVztBQUFDLFVBQUlDLElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPcWxCLE9BQU9ELGlCQUFQLENBQXlCemxCLENBQXpCLEVBQTJCLFlBQVU7QUFBQ0MsVUFBRVEsT0FBRjtBQUFZLE9BQWxELEVBQW1ELFVBQVNWLENBQVQsRUFBVztBQUFDRSxVQUFFUyxNQUFGLENBQVNYLENBQVQ7QUFBWSxPQUEzRSxHQUE2RUUsRUFBRVUsT0FBdEY7QUFBOEYsS0FBOUksRUFBK0lYLEVBQUUwUyxJQUFGLEdBQU8sVUFBUzFTLENBQVQsRUFBVztBQUFDLFVBQUlDLElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPcWxCLE9BQU9oVCxJQUFQLENBQVkxUyxDQUFaLEVBQWMsWUFBVTtBQUFDQyxVQUFFUSxPQUFGO0FBQVksT0FBckMsRUFBc0MsVUFBU1YsQ0FBVCxFQUFXO0FBQUNFLFVBQUVTLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLE9BQTlELEdBQWdFRSxFQUFFVSxPQUF6RTtBQUFpRixLQUFuUSxFQUFvUVgsRUFBRXNLLEtBQUYsR0FBUSxVQUFTdEssQ0FBVCxFQUFXO0FBQUMsVUFBSUMsSUFBRUYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9xbEIsT0FBT3BiLEtBQVAsQ0FBYXRLLENBQWIsRUFBZSxZQUFVO0FBQUNDLFVBQUVRLE9BQUY7QUFBWSxPQUF0QyxFQUF1QyxVQUFTVixDQUFULEVBQVc7QUFBQ0UsVUFBRVMsTUFBRixDQUFTWCxDQUFUO0FBQVksT0FBL0QsR0FBaUVFLEVBQUVVLE9BQTFFO0FBQWtGLEtBQTFYLEVBQTJYWCxFQUFFMmxCLFFBQUYsR0FBVyxVQUFTM2xCLENBQVQsRUFBVztBQUFDLFVBQUlDLElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPcWxCLE9BQU9DLFFBQVAsQ0FBZ0IzbEIsQ0FBaEIsRUFBa0IsWUFBVTtBQUFDQyxVQUFFUSxPQUFGO0FBQVksT0FBekMsRUFBMEMsVUFBU1YsQ0FBVCxFQUFXO0FBQUNFLFVBQUVTLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLE9BQWxFLEdBQW9FRSxFQUFFVSxPQUE3RTtBQUFxRixLQUF2ZixFQUF3ZlgsRUFBRXFLLElBQUYsR0FBTyxZQUFVO0FBQUMsVUFBSXJLLElBQUVELEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPcWxCLE9BQU9yYixJQUFQLENBQVksVUFBU3RLLENBQVQsRUFBVztBQUFDLFlBQUlFLElBQUUsSUFBSTJsQixVQUFKLENBQWU3bEIsQ0FBZixDQUFOLENBQXdCQyxFQUFFUyxPQUFGLENBQVVSLENBQVY7QUFBYSxPQUE3RCxFQUE4RCxVQUFTRixDQUFULEVBQVc7QUFBQ0MsVUFBRVUsTUFBRixDQUFTWCxDQUFUO0FBQVksT0FBdEYsR0FBd0ZDLEVBQUVXLE9BQWpHO0FBQXlHLEtBQW5vQixFQUFvb0JYLEVBQUU2bEIsb0JBQUYsR0FBdUIsVUFBUzlsQixDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDMGxCLGFBQU9HLG9CQUFQLENBQTRCLFVBQVM3bEIsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRSxJQUFJMmxCLFVBQUosQ0FBZTVsQixDQUFmLENBQU4sQ0FBd0JELEVBQUVFLENBQUY7QUFBSyxPQUFyRSxFQUFzRUQsQ0FBdEU7QUFBeUUsS0FBbHZCLEVBQW12QkEsRUFBRWlkLEtBQUYsR0FBUSxZQUFVO0FBQUMsVUFBSWpkLElBQUVELEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPcWxCLE9BQU96SSxLQUFQLENBQWEsWUFBVTtBQUFDamQsVUFBRVMsT0FBRjtBQUFZLE9BQXBDLEVBQXFDLFVBQVNWLENBQVQsRUFBVztBQUFDQyxVQUFFVSxNQUFGLENBQVNYLENBQVQ7QUFBWSxPQUE3RCxHQUErREMsRUFBRVcsT0FBeEU7QUFBZ0YsS0FBdDJCLEVBQXUyQlgsQ0FBOTJCO0FBQWczQixHQUEzNEIsQ0FBdkUsQ0FGdC9sQixFQUUyOG5CSixRQUFRQyxNQUFSLENBQWUsdUJBQWYsRUFBdUMsRUFBdkMsRUFBMkNDLE9BQTNDLENBQW1ELGFBQW5ELEVBQWlFLENBQUMsSUFBRCxFQUFNLFVBQVNDLENBQVQsRUFBVztBQUFDLFdBQU0sRUFBQytsQixNQUFLLGNBQVM5bEIsQ0FBVCxFQUFXQyxDQUFYLEVBQWFDLENBQWIsRUFBZTtBQUFDLFlBQUlXLElBQUVkLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPMGxCLElBQUlELElBQUosQ0FBUzlsQixDQUFULEVBQVdDLENBQVgsRUFBYUMsQ0FBYixFQUFlLFVBQVNILENBQVQsRUFBVztBQUFDYyxZQUFFSixPQUFGLENBQVVWLENBQVY7QUFBYSxTQUF4QyxFQUF5QyxVQUFTQSxDQUFULEVBQVc7QUFBQ2MsWUFBRUgsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBakUsR0FBbUVjLEVBQUVGLE9BQTVFO0FBQW9GLE9BQTFILEVBQU47QUFBa0ksR0FBcEosQ0FBakUsQ0FGMzhuQixFQUVtcW9CZixRQUFRQyxNQUFSLENBQWUsaUNBQWYsRUFBaUQsRUFBakQsRUFBcURDLE9BQXJELENBQTZELHVCQUE3RCxFQUFxRixDQUFDLElBQUQsRUFBTSxTQUFOLEVBQWdCLFVBQVNDLENBQVQsRUFBV0MsQ0FBWCxFQUFhO0FBQUMsV0FBTSxFQUFDdWQsT0FBTSxlQUFTdGQsQ0FBVCxFQUFXQyxDQUFYLEVBQWFXLENBQWIsRUFBZUMsQ0FBZixFQUFpQjtBQUFDLFlBQUlDLElBQUVoQixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0gsSUFBRUEsS0FBRyxJQUFMLEVBQVVXLElBQUVBLEtBQUcsSUFBZixFQUFvQkMsSUFBRUEsS0FBRyxJQUF6QixFQUE4QmQsRUFBRWtDLE9BQUYsQ0FBVThqQixhQUFWLENBQXdCekksS0FBeEIsQ0FBOEJ0ZCxDQUE5QixFQUFnQ0MsQ0FBaEMsRUFBa0NXLENBQWxDLEVBQW9DQyxDQUFwQyxFQUFzQyxZQUFVO0FBQUNDLFlBQUVOLE9BQUYsQ0FBVSxDQUFDLENBQVg7QUFBYyxTQUEvRCxFQUFnRSxZQUFVO0FBQUNNLFlBQUVMLE1BQUYsQ0FBUyxDQUFDLENBQVY7QUFBYSxTQUF4RixDQUE5QixFQUF3SEssRUFBRUosT0FBakk7QUFBeUksT0FBbEwsRUFBbUxzbEIsa0JBQWlCLDBCQUFTaG1CLENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVILEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFa0MsT0FBRixDQUFVOGpCLGFBQVYsQ0FBd0JDLGdCQUF4QixDQUF5Q2htQixDQUF6QyxFQUEyQyxZQUFVO0FBQUNDLFlBQUVPLE9BQUYsQ0FBVSxDQUFDLENBQVg7QUFBYyxTQUFwRSxFQUFxRSxZQUFVO0FBQUNQLFlBQUVRLE1BQUYsQ0FBUyxDQUFDLENBQVY7QUFBYSxTQUE3RixHQUErRlIsRUFBRVMsT0FBeEc7QUFBZ0gsT0FBaFYsRUFBaVZ1bEIsaUJBQWdCLHlCQUFTam1CLENBQVQsRUFBV0MsQ0FBWCxFQUFhVyxDQUFiLEVBQWU7QUFBQyxZQUFJQyxJQUFFZixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0gsSUFBRUEsS0FBRyxJQUFMLEVBQVVXLElBQUVBLEtBQUcsSUFBZixFQUFvQmIsRUFBRWtDLE9BQUYsQ0FBVThqQixhQUFWLENBQXdCRSxlQUF4QixDQUF3Q2ptQixDQUF4QyxFQUEwQ0MsQ0FBMUMsRUFBNENXLENBQTVDLEVBQThDLFlBQVU7QUFBQ0MsWUFBRUwsT0FBRixDQUFVLENBQUMsQ0FBWDtBQUFjLFNBQXZFLEVBQXdFLFlBQVU7QUFBQ0ssWUFBRUosTUFBRixDQUFTLENBQUMsQ0FBVjtBQUFhLFNBQWhHLENBQXBCLEVBQXNISSxFQUFFSCxPQUEvSDtBQUF1SSxPQUF4Z0IsRUFBeWdCd2xCLGtCQUFpQiwwQkFBU2xtQixDQUFULEVBQVdDLENBQVgsRUFBYVcsQ0FBYixFQUFlO0FBQUMsWUFBSUMsSUFBRWYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9ILElBQUVBLEtBQUcsSUFBTCxFQUFVVyxJQUFFQSxLQUFHLElBQWYsRUFBb0JiLEVBQUVrQyxPQUFGLENBQVU4akIsYUFBVixDQUF3QkcsZ0JBQXhCLENBQXlDbG1CLENBQXpDLEVBQTJDQyxDQUEzQyxFQUE2Q1csQ0FBN0MsRUFBK0MsWUFBVTtBQUFDQyxZQUFFTCxPQUFGLENBQVUsQ0FBQyxDQUFYO0FBQWMsU0FBeEUsRUFBeUUsWUFBVTtBQUFDSyxZQUFFSixNQUFGLENBQVMsQ0FBQyxDQUFWO0FBQWEsU0FBakcsQ0FBcEIsRUFBdUhJLEVBQUVILE9BQWhJO0FBQXdJLE9BQWxzQixFQUFtc0J5bEIsa0JBQWlCLDBCQUFTbm1CLENBQVQsRUFBV0MsQ0FBWCxFQUFhVyxDQUFiLEVBQWU7QUFBQyxZQUFJQyxJQUFFZixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0osSUFBRUEsS0FBRyxJQUFMLEVBQVVDLElBQUVBLEtBQUcsSUFBZixFQUFvQlcsSUFBRUEsS0FBRyxJQUF6QixFQUE4QmIsRUFBRWtDLE9BQUYsQ0FBVThqQixhQUFWLENBQXdCSSxnQkFBeEIsQ0FBeUNubUIsQ0FBekMsRUFBMkNDLENBQTNDLEVBQTZDVyxDQUE3QyxFQUErQyxZQUFVO0FBQUNDLFlBQUVMLE9BQUYsQ0FBVSxDQUFDLENBQVg7QUFBYyxTQUF4RSxFQUF5RSxZQUFVO0FBQUNLLFlBQUVKLE1BQUYsQ0FBUyxDQUFDLENBQVY7QUFBYSxTQUFqRyxDQUE5QixFQUFpSUksRUFBRUgsT0FBMUk7QUFBa0osT0FBdDRCLEVBQXU0QjBsQixzQ0FBcUMsOENBQVNwbUIsQ0FBVCxFQUFXQyxDQUFYLEVBQWFXLENBQWIsRUFBZUMsQ0FBZixFQUFpQjtBQUFDLFlBQUlDLElBQUVoQixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0gsSUFBRUEsS0FBRyxJQUFMLEVBQVVXLElBQUVBLEtBQUcsSUFBZixFQUFvQmIsRUFBRWtDLE9BQUYsQ0FBVThqQixhQUFWLENBQXdCSyxvQ0FBeEIsQ0FBNkRwbUIsQ0FBN0QsRUFBK0RDLENBQS9ELEVBQWlFVyxDQUFqRSxFQUFtRUMsQ0FBbkUsRUFBcUUsWUFBVTtBQUFDQyxZQUFFTixPQUFGLENBQVUsQ0FBQyxDQUFYO0FBQWMsU0FBOUYsRUFBK0YsWUFBVTtBQUFDTSxZQUFFTCxNQUFGLENBQVMsQ0FBQyxDQUFWO0FBQWEsU0FBdkgsQ0FBcEIsRUFBNklLLEVBQUVKLE9BQXRKO0FBQThKLE9BQTVtQyxFQUE2bUMybEIsYUFBWSxxQkFBU3JtQixDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFlBQUlXLElBQUVkLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFa0MsT0FBRixDQUFVOGpCLGFBQVYsQ0FBd0JNLFdBQXhCLENBQW9Dcm1CLENBQXBDLEVBQXNDQyxDQUF0QyxFQUF3QyxZQUFVO0FBQUNXLFlBQUVKLE9BQUYsQ0FBVSxDQUFDLENBQVg7QUFBYyxTQUFqRSxFQUFrRSxZQUFVO0FBQUNJLFlBQUVILE1BQUYsQ0FBUyxDQUFDLENBQVY7QUFBYSxTQUExRixHQUE0RkcsRUFBRUYsT0FBckc7QUFBNkcsT0FBcHdDLEVBQXF3QzRsQixlQUFjLHVCQUFTdG1CLENBQVQsRUFBV0MsQ0FBWCxFQUFhVyxDQUFiLEVBQWVDLENBQWYsRUFBaUJDLENBQWpCLEVBQW1CQyxDQUFuQixFQUFxQjtBQUFDLFlBQUlDLElBQUVsQixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT1EsSUFBRUEsS0FBRyxJQUFMLEVBQVVDLElBQUVBLEtBQUcsSUFBZixFQUFvQkMsSUFBRUEsS0FBRyxJQUF6QixFQUE4QkMsSUFBRUEsS0FBRyxJQUFuQyxFQUF3Q2hCLEVBQUVrQyxPQUFGLENBQVU4akIsYUFBVixDQUF3Qk8sYUFBeEIsQ0FBc0N0bUIsQ0FBdEMsRUFBd0NDLENBQXhDLEVBQTBDVyxDQUExQyxFQUE0Q0MsQ0FBNUMsRUFBOENDLENBQTlDLEVBQWdEQyxDQUFoRCxFQUFrRCxZQUFVO0FBQUNDLFlBQUVSLE9BQUYsQ0FBVSxDQUFDLENBQVg7QUFBYyxTQUEzRSxFQUE0RSxZQUFVO0FBQUNRLFlBQUVQLE1BQUYsQ0FBUyxDQUFDLENBQVY7QUFBYSxTQUFwRyxDQUF4QyxFQUE4SU8sRUFBRU4sT0FBdko7QUFBK0osT0FBeDlDLEVBQXk5QzZsQixVQUFTLGtCQUFTdm1CLENBQVQsRUFBV0MsQ0FBWCxFQUFhVyxDQUFiLEVBQWVDLENBQWYsRUFBaUJDLENBQWpCLEVBQW1CO0FBQUMsWUFBSUMsSUFBRWpCLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPSCxJQUFFQSxLQUFHLElBQUwsRUFBVVcsSUFBRUEsS0FBRyxJQUFmLEVBQW9CQyxJQUFFQSxLQUFHLElBQXpCLEVBQThCQyxJQUFFQSxLQUFHLElBQW5DLEVBQXdDZixFQUFFa0MsT0FBRixDQUFVOGpCLGFBQVYsQ0FBd0JRLFFBQXhCLENBQWlDdm1CLENBQWpDLEVBQW1DQyxDQUFuQyxFQUFxQ1csQ0FBckMsRUFBdUNDLENBQXZDLEVBQXlDQyxDQUF6QyxFQUEyQyxZQUFVO0FBQUNDLFlBQUVQLE9BQUYsQ0FBVSxDQUFDLENBQVg7QUFBYyxTQUFwRSxFQUFxRSxZQUFVO0FBQUNPLFlBQUVOLE1BQUYsQ0FBUyxDQUFDLENBQVY7QUFBYSxTQUE3RixDQUF4QyxFQUF1SU0sRUFBRUwsT0FBaEo7QUFBd0osT0FBOXBELEVBQStwRDhsQixrQkFBaUIsNEJBQVU7QUFBQyxZQUFJeG1CLElBQUVGLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFa0MsT0FBRixDQUFVOGpCLGFBQVYsQ0FBd0JTLGdCQUF4QixDQUF5QyxZQUFVO0FBQUN4bUIsWUFBRVEsT0FBRixDQUFVLENBQUMsQ0FBWDtBQUFjLFNBQWxFLEVBQW1FLFlBQVU7QUFBQ1IsWUFBRVMsTUFBRixDQUFTLENBQUMsQ0FBVjtBQUFhLFNBQTNGLEdBQTZGVCxFQUFFVSxPQUF0RztBQUE4RyxPQUF6ekQsRUFBMHpEK2xCLGFBQVkscUJBQVN6bUIsQ0FBVCxFQUFXQyxDQUFYLEVBQWFXLENBQWIsRUFBZUMsQ0FBZixFQUFpQkMsQ0FBakIsRUFBbUI7QUFBQyxZQUFJQyxJQUFFakIsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVrQyxPQUFGLENBQVU4akIsYUFBVixDQUF3QlUsV0FBeEIsQ0FBb0N6bUIsQ0FBcEMsRUFBc0NDLENBQXRDLEVBQXdDVyxDQUF4QyxFQUEwQ0MsQ0FBMUMsRUFBNENDLENBQTVDLEVBQThDLFVBQVNoQixDQUFULEVBQVc7QUFBQ2lCLFlBQUVQLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQXZFLEVBQXdFLFVBQVNBLENBQVQsRUFBVztBQUFDaUIsWUFBRU4sTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBaEcsR0FBa0dpQixFQUFFTCxPQUEzRztBQUFtSCxPQUE3OUQsRUFBODlEMkssV0FBVSxxQkFBVTtBQUFDLFlBQUl0TCxJQUFFRCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0MsT0FBTzRCLE9BQVAsQ0FBZThqQixhQUFmLENBQTZCMWEsU0FBN0IsQ0FBdUMsVUFBU3ZMLENBQVQsRUFBVztBQUFDQSxjQUFFQyxFQUFFUyxPQUFGLEVBQUYsR0FBY1QsRUFBRVUsTUFBRixFQUFkO0FBQXlCLFNBQTVFLEdBQThFVixFQUFFVyxPQUF2RjtBQUErRixPQUFsbUUsRUFBTjtBQUEwbUUsR0FBeG9FLENBQXJGLENBRm5xb0IsRUFFbTRzQmYsUUFBUUMsTUFBUixDQUFlLGlDQUFmLEVBQWlELEVBQWpELEVBQXFEQyxPQUFyRCxDQUE2RCx1QkFBN0QsRUFBcUYsQ0FBQyxTQUFELEVBQVcsVUFBU0MsQ0FBVCxFQUFXO0FBQUMsV0FBTSxFQUFDa0MsTUFBSyxjQUFTakMsQ0FBVCxFQUFXQyxDQUFYLEVBQWFDLENBQWIsRUFBZVcsQ0FBZixFQUFpQjtBQUFDLGVBQU9YLElBQUVBLEtBQUcsQ0FBQyxDQUFOLEVBQVFILEVBQUVtQyxPQUFGLENBQVV5a0IsYUFBVixDQUF3QjFrQixJQUF4QixDQUE2QmpDLENBQTdCLEVBQStCQyxDQUEvQixFQUFpQ0MsQ0FBakMsRUFBbUNXLENBQW5DLENBQWY7QUFBcUQsT0FBN0UsRUFBOEV1QixNQUFLLGdCQUFVO0FBQUMsZUFBT3JDLEVBQUVtQyxPQUFGLENBQVV5a0IsYUFBVixDQUF3QnZrQixJQUF4QixFQUFQO0FBQXNDLE9BQXBJLEVBQU47QUFBNEksR0FBbkssQ0FBckYsQ0FGbjRzQixFQUU4bnRCeEMsUUFBUUMsTUFBUixDQUFlLGdDQUFmLEVBQWdELEVBQWhELEVBQW9EQyxPQUFwRCxDQUE0RCxzQkFBNUQsRUFBbUYsQ0FBQyxZQUFVO0FBQUMsV0FBTSxFQUFDc0MsTUFBSyxnQkFBVTtBQUFDLGVBQU9vRCxVQUFVb2hCLFlBQVYsQ0FBdUJ4a0IsSUFBdkIsRUFBUDtBQUFxQyxPQUF0RCxFQUF1REgsTUFBSyxnQkFBVTtBQUFDLGVBQU91RCxVQUFVb2hCLFlBQVYsQ0FBdUIza0IsSUFBdkIsRUFBUDtBQUFxQyxPQUE1RyxFQUFOO0FBQW9ILEdBQWhJLENBQW5GLENBRjludEIsRUFFbzF0QnJDLFFBQVFDLE1BQVIsQ0FBZSwwQkFBZixFQUEwQyxFQUExQyxFQUE4Q0MsT0FBOUMsQ0FBc0QsZ0JBQXRELEVBQXVFLENBQUMsSUFBRCxFQUFNLFNBQU4sRUFBZ0IsVUFBU0MsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxXQUFNLEVBQUM2bUIsUUFBTyxnQkFBUzltQixDQUFULEVBQVdFLENBQVgsRUFBYTtBQUFDLGVBQU9MLFFBQVFtRCxRQUFSLENBQWlCaEQsQ0FBakIsS0FBcUIsQ0FBQ0gsUUFBUWtuQixRQUFSLENBQWlCL21CLENBQWpCLENBQXRCLElBQTJDLGVBQWEsT0FBT0UsQ0FBcEIsS0FBd0JGLEVBQUVnbkIsTUFBRixHQUFTOW1CLENBQWpDLEdBQW9DRCxFQUFFZ25CLFlBQUYsQ0FBZUMsWUFBZixDQUE0QmxuQixDQUE1QixDQUEvRSxJQUErR0MsRUFBRWduQixZQUFGLENBQWVDLFlBQWYsQ0FBNEIsRUFBQ3pXLE1BQUt6USxDQUFOLEVBQVFnbkIsUUFBTzltQixDQUFmLEVBQTVCLENBQXRIO0FBQXFLLE9BQTNMLEVBQTRMaW5CLFNBQVEsaUJBQVNsbkIsQ0FBVCxFQUFXQyxDQUFYLEVBQWFDLENBQWIsRUFBZTtBQUFDLFlBQUlXLElBQUVkLEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFbW5CLFdBQUYsQ0FBYyxVQUFTcG5CLENBQVQsRUFBVztBQUFDQSxZQUFFcW5CLFVBQUYsQ0FBYW5uQixDQUFiLEVBQWVDLENBQWYsRUFBaUIsVUFBU0gsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQ2EsY0FBRUosT0FBRixDQUFVVCxDQUFWO0FBQWEsV0FBNUMsRUFBNkMsVUFBU0QsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQ2EsY0FBRUgsTUFBRixDQUFTVixDQUFUO0FBQVksV0FBdkU7QUFBeUUsU0FBbkcsR0FBcUdhLEVBQUVGLE9BQTlHO0FBQXNILE9BQTFWLEVBQTJWMG1CLGtCQUFpQiwwQkFBU3JuQixDQUFULEVBQVdDLENBQVgsRUFBYUMsQ0FBYixFQUFlO0FBQUMsWUFBSVcsSUFBRWQsRUFBRU0sS0FBRixFQUFOO0FBQUEsWUFBZ0JTLElBQUVaLEVBQUVvbkIsS0FBRixDQUFRLENBQVIsQ0FBbEIsQ0FBNkIsT0FBT3RuQixFQUFFbW5CLFdBQUYsQ0FBYyxVQUFTcG5CLENBQVQsRUFBVztBQUFDLFdBQUMsU0FBU0MsQ0FBVCxHQUFZO0FBQUMsZ0JBQUlFLElBQUVZLEVBQUV5bUIsTUFBRixDQUFTLENBQVQsRUFBVyxDQUFYLEVBQWMsQ0FBZCxDQUFOLENBQXVCLElBQUc7QUFBQ3huQixnQkFBRXFuQixVQUFGLENBQWFubkIsQ0FBYixFQUFlQyxDQUFmLEVBQWlCLFVBQVNILENBQVQsRUFBV0UsQ0FBWCxFQUFhO0FBQUMsc0JBQUlhLEVBQUVtTyxNQUFOLEdBQWFwTyxFQUFFSixPQUFGLENBQVVSLENBQVYsQ0FBYixHQUEwQkQsR0FBMUI7QUFBOEIsZUFBN0QsRUFBOEQsVUFBU0QsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQ2Esa0JBQUVILE1BQUYsQ0FBU1YsQ0FBVDtBQUFZLGVBQXhGO0FBQTBGLGFBQTlGLENBQThGLE9BQU1lLENBQU4sRUFBUTtBQUFDRixnQkFBRUgsTUFBRixDQUFTSyxDQUFUO0FBQVk7QUFBQyxXQUF4SixFQUFEO0FBQTRKLFNBQXRMLEdBQXdMRixFQUFFRixPQUFqTTtBQUF5TSxPQUFsbUIsRUFBbW1CNm1CLGVBQWMsdUJBQVN4bkIsQ0FBVCxFQUFXQyxDQUFYLEVBQWFDLENBQWIsRUFBZVcsQ0FBZixFQUFpQkMsQ0FBakIsRUFBbUI7QUFBQyxZQUFJQyxJQUFFaEIsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVtbkIsV0FBRixDQUFjLFVBQVNwbkIsQ0FBVCxFQUFXO0FBQUNBLFlBQUVxbkIsVUFBRixDQUFhbm5CLENBQWIsRUFBZVksQ0FBZixFQUFpQixVQUFTZCxDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDZSxjQUFFTixPQUFGLENBQVVULENBQVYsR0FBYUQsRUFBRXFuQixVQUFGLENBQWFsbkIsQ0FBYixFQUFlWSxDQUFmLEVBQWlCLFVBQVNmLENBQVQsRUFBV0MsQ0FBWCxFQUFhO0FBQUNlLGdCQUFFTixPQUFGLENBQVVULENBQVY7QUFBYSxhQUE1QyxDQUFiO0FBQTJELFdBQTFGO0FBQTRGLFNBQXRILEVBQXVILFVBQVNELENBQVQsRUFBV0MsQ0FBWCxFQUFhO0FBQUNlLFlBQUVMLE1BQUYsQ0FBU1YsQ0FBVDtBQUFZLFNBQWpKLEdBQW1KZSxFQUFFSixPQUE1SjtBQUFvSyxPQUF6ekIsRUFBMHpCOG1CLFVBQVMsa0JBQVN4bkIsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVnbkIsWUFBRixDQUFlVSxjQUFmLENBQThCem5CLENBQTlCLEVBQWdDLFVBQVNGLENBQVQsRUFBVztBQUFDRyxZQUFFTyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUF6RCxFQUEwRCxVQUFTQSxDQUFULEVBQVc7QUFBQ0csWUFBRVEsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBbEYsR0FBb0ZHLEVBQUVTLE9BQTdGO0FBQXFHLE9BQXA4QixFQUFOO0FBQTQ4QixHQUExK0IsQ0FBdkUsQ0FGcDF0QixFQUV3NHZCZixRQUFRQyxNQUFSLENBQWUsNkJBQWYsRUFBNkMsRUFBN0MsRUFBaURDLE9BQWpELENBQXlELG1CQUF6RCxFQUE2RSxDQUFDLFlBQVU7QUFBQyxXQUFNLEVBQUM2bkIsaUJBQWdCLHlCQUFTNW5CLENBQVQsRUFBVztBQUFDLGVBQU82bkIsVUFBVUQsZUFBVixDQUEwQixDQUFDLENBQUM1bkIsQ0FBNUIsQ0FBUDtBQUFzQyxPQUFuRSxFQUFvRThuQixRQUFPLEVBQUNDLFNBQVEsQ0FBVCxFQUFXQyxlQUFjLENBQXpCLEVBQTJCQyxtQkFBa0IsQ0FBN0MsRUFBK0NDLGNBQWEsQ0FBNUQsRUFBM0UsRUFBMElDLE9BQU0sZUFBU25vQixDQUFULEVBQVc7QUFBQyxnQkFBT0EsQ0FBUCxHQUFVLEtBQUssQ0FBTDtBQUFPLG1CQUFPNm5CLFVBQVVPLFlBQVYsRUFBUCxDQUFnQyxLQUFLLENBQUw7QUFBTyxtQkFBT1AsVUFBVVEsaUJBQVYsRUFBUCxDQUFxQyxLQUFLLENBQUw7QUFBTyxtQkFBT1IsVUFBVVMscUJBQVYsRUFBUCxDQUF5QyxLQUFLLENBQUw7QUFBTyxtQkFBT1QsVUFBVVUsZ0JBQVYsRUFBUCxDQUFvQztBQUFRLG1CQUFPVixVQUFVTyxZQUFWLEVBQVAsQ0FBaE07QUFBaU8sT0FBN1gsRUFBOFhJLFlBQVcsb0JBQVN4b0IsQ0FBVCxFQUFXO0FBQUMsZUFBTzZuQixVQUFVWSxxQkFBVixDQUFnQ3pvQixDQUFoQyxDQUFQO0FBQTBDLE9BQS9iLEVBQWdjMG9CLFVBQVMsa0JBQVMxb0IsQ0FBVCxFQUFXO0FBQUMsZUFBTzZuQixVQUFVYywwQkFBVixDQUFxQzNvQixDQUFyQyxDQUFQO0FBQStDLE9BQXBnQixFQUFxZ0JxQyxNQUFLLGdCQUFVO0FBQUMsZUFBT3dsQixVQUFVeGxCLElBQVYsRUFBUDtBQUF3QixPQUE3aUIsRUFBOGlCSCxNQUFLLGdCQUFVO0FBQUMsZUFBTzJsQixVQUFVM2xCLElBQVYsRUFBUDtBQUF3QixPQUF0bEIsRUFBdWxCaWMsV0FBVSxxQkFBVTtBQUFDLGVBQU8wSixVQUFVMUosU0FBakI7QUFBMkIsT0FBdm9CLEVBQU47QUFBK29CLEdBQTNwQixDQUE3RSxDQUZ4NHZCLEVBRW1ueEJ0ZSxRQUFRQyxNQUFSLENBQWUseUJBQWYsRUFBeUMsRUFBekMsRUFBNkNDLE9BQTdDLENBQXFELGVBQXJELEVBQXFFLENBQUMsSUFBRCxFQUFNLFNBQU4sRUFBZ0IsVUFBU0MsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxXQUFNLEVBQUMyb0IsY0FBYSxzQkFBUzFvQixDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRWtDLE9BQUYsQ0FBVTBtQixLQUFWLENBQWdCRCxZQUFoQixDQUE2QjFvQixDQUE3QixFQUErQixVQUFTRixDQUFULEVBQVc7QUFBQ0csWUFBRU8sT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBeEQsRUFBeUQsVUFBU0EsQ0FBVCxFQUFXO0FBQUNHLFlBQUVRLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQWpGLEdBQW1GRyxFQUFFUyxPQUE1RjtBQUFvRyxPQUE5SSxFQUErSWtvQixpQkFBZ0IseUJBQVM1b0IsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVrQyxPQUFGLENBQVUwbUIsS0FBVixDQUFnQkMsZUFBaEIsQ0FBZ0M1b0IsQ0FBaEMsRUFBa0MsVUFBU0YsQ0FBVCxFQUFXO0FBQUNHLFlBQUVPLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQTNELEVBQTRELFVBQVNBLENBQVQsRUFBVztBQUFDRyxZQUFFUSxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUFwRixHQUFzRkcsRUFBRVMsT0FBL0Y7QUFBdUcsT0FBbFMsRUFBbVNtb0IsaUJBQWdCLHlCQUFTN29CLENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVILEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFa0MsT0FBRixDQUFVMG1CLEtBQVYsQ0FBZ0JFLGVBQWhCLENBQWdDN29CLENBQWhDLEVBQWtDLFVBQVNGLENBQVQsRUFBVztBQUFDRyxZQUFFTyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUEzRCxFQUE0RCxVQUFTQSxDQUFULEVBQVc7QUFBQ0csWUFBRVEsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBcEYsR0FBc0ZHLEVBQUVTLE9BQS9GO0FBQXVHLE9BQXRiLEVBQXVib29CLGFBQVkscUJBQVM5b0IsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVrQyxPQUFGLENBQVUwbUIsS0FBVixDQUFnQkcsV0FBaEIsQ0FBNEI5b0IsQ0FBNUIsRUFBOEIsVUFBU0YsQ0FBVCxFQUFXO0FBQUNHLFlBQUVPLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQXZELEVBQXdELFVBQVNBLENBQVQsRUFBVztBQUFDRyxZQUFFUSxNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUFoRixHQUFrRkcsRUFBRVMsT0FBM0Y7QUFBbUcsT0FBbGtCLEVBQW1rQnFvQixnQkFBZSx3QkFBUy9vQixDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRWtDLE9BQUYsQ0FBVTBtQixLQUFWLENBQWdCSSxjQUFoQixDQUErQi9vQixDQUEvQixFQUFpQyxVQUFTRixDQUFULEVBQVc7QUFBQ0csWUFBRU8sT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBMUQsRUFBMkQsVUFBU0EsQ0FBVCxFQUFXO0FBQUNHLFlBQUVRLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQW5GLEdBQXFGRyxFQUFFUyxPQUE5RjtBQUFzRyxPQUFwdEIsRUFBcXRCc29CLGdCQUFlLHdCQUFTaHBCLENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVILEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFa0MsT0FBRixDQUFVMG1CLEtBQVYsQ0FBZ0JLLGNBQWhCLENBQStCaHBCLENBQS9CLEVBQWlDLFVBQVNGLENBQVQsRUFBVztBQUFDRyxZQUFFTyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUExRCxFQUEyRCxVQUFTQSxDQUFULEVBQVc7QUFBQ0csWUFBRVEsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBbkYsR0FBcUZHLEVBQUVTLE9BQTlGO0FBQXNHLE9BQXQyQixFQUF1MkJ1b0IsaUJBQWdCLHlCQUFTanBCLENBQVQsRUFBVztBQUFDLFlBQUlDLElBQUVILEVBQUVNLEtBQUYsRUFBTixDQUFnQixPQUFPTCxFQUFFa0MsT0FBRixDQUFVMG1CLEtBQVYsQ0FBZ0JNLGVBQWhCLENBQWdDanBCLENBQWhDLEVBQWtDLFVBQVNGLENBQVQsRUFBVztBQUFDRyxZQUFFTyxPQUFGLENBQVVWLENBQVY7QUFBYSxTQUEzRCxFQUE0RCxVQUFTQSxDQUFULEVBQVc7QUFBQ0csWUFBRVEsTUFBRixDQUFTWCxDQUFUO0FBQVksU0FBcEYsR0FBc0ZHLEVBQUVTLE9BQS9GO0FBQXVHLE9BQTEvQixFQUEyL0JzQixNQUFLLGNBQVNoQyxDQUFULEVBQVdDLENBQVgsRUFBYVcsQ0FBYixFQUFlO0FBQUMsWUFBSUMsSUFBRWYsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUVrQyxPQUFGLENBQVUwbUIsS0FBVixDQUFnQjNtQixJQUFoQixDQUFxQmhDLENBQXJCLEVBQXVCQyxDQUF2QixFQUF5QlcsQ0FBekIsRUFBMkIsVUFBU2QsQ0FBVCxFQUFXO0FBQUNlLFlBQUVMLE9BQUYsQ0FBVVYsQ0FBVjtBQUFhLFNBQXBELEVBQXFELFVBQVNBLENBQVQsRUFBVztBQUFDZSxZQUFFSixNQUFGLENBQVNYLENBQVQ7QUFBWSxTQUE3RSxHQUErRWUsRUFBRUgsT0FBeEY7QUFBZ0csT0FBaG9DLEVBQWlvQ3lCLE1BQUssZ0JBQVU7QUFBQyxZQUFJbkMsSUFBRUYsRUFBRU0sS0FBRixFQUFOLENBQWdCLElBQUc7QUFBQ0wsWUFBRWtDLE9BQUYsQ0FBVTBtQixLQUFWLENBQWdCeG1CLElBQWhCLElBQXVCbkMsRUFBRVEsT0FBRixFQUF2QjtBQUFtQyxTQUF2QyxDQUF1QyxPQUFNUCxDQUFOLEVBQVE7QUFBQ0QsWUFBRVMsTUFBRixDQUFTUixLQUFHQSxFQUFFbUUsT0FBZDtBQUF1QixnQkFBT3BFLEVBQUVVLE9BQVQ7QUFBaUIsT0FBenZDLEVBQU47QUFBaXdDLEdBQS94QyxDQUFyRSxDQUZubnhCLEVBRTA5ekJmLFFBQVFDLE1BQVIsQ0FBZSwyQkFBZixFQUEyQyxFQUEzQyxFQUErQ0MsT0FBL0MsQ0FBdUQsaUJBQXZELEVBQXlFLENBQUMsSUFBRCxFQUFNLFVBQVNDLENBQVQsRUFBVztBQUFDLFdBQU0sRUFBQ29wQixjQUFhLHdCQUFVO0FBQUMsWUFBSW5wQixJQUFFRCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0MsT0FBT0MsT0FBUCxHQUFlNm9CLFFBQVFELFlBQVIsQ0FBcUIsVUFBU3BwQixDQUFULEVBQVc7QUFBQ0MsWUFBRVMsT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBOUMsRUFBK0MsVUFBU0EsQ0FBVCxFQUFXO0FBQUNDLFlBQUVVLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQXZFLENBQWYsR0FBd0ZDLEVBQUVVLE1BQUYsQ0FBUyxrQ0FBVCxDQUF4RixFQUFxSVYsRUFBRVcsT0FBOUk7QUFBc0osT0FBL0wsRUFBZ00wb0IsY0FBYSxzQkFBU3JwQixDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFRixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0MsT0FBT0MsT0FBUCxHQUFlNm9CLFFBQVFDLFlBQVIsQ0FBcUIsVUFBU3RwQixDQUFULEVBQVc7QUFBQ0UsWUFBRVEsT0FBRixDQUFVVixDQUFWO0FBQWEsU0FBOUMsRUFBK0MsVUFBU0EsQ0FBVCxFQUFXO0FBQUNFLFlBQUVTLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQXZFLEVBQXdFQyxDQUF4RSxDQUFmLEdBQTBGQyxFQUFFUyxNQUFGLENBQVMsa0NBQVQsQ0FBMUYsRUFBdUlULEVBQUVVLE9BQWhKO0FBQXdKLE9BQWpZLEVBQU47QUFBeVksR0FBM1osQ0FBekUsQ0FGMTl6QixFQUVpODBCZixRQUFRQyxNQUFSLENBQWUsdUJBQWYsRUFBdUMsRUFBdkMsRUFBMkNDLE9BQTNDLENBQW1ELGFBQW5ELEVBQWlFLFlBQVU7QUFBQyxXQUFNLEVBQUN3cEIsT0FBTSxlQUFTdnBCLENBQVQsRUFBV0MsQ0FBWCxFQUFhQyxDQUFiLEVBQWU7QUFBQyxlQUFPc3BCLElBQUlELEtBQUosQ0FBVXZwQixDQUFWLEVBQVlDLENBQVosRUFBY0MsQ0FBZCxDQUFQO0FBQXdCLE9BQS9DLEVBQU47QUFBdUQsR0FBbkksQ0FGajgwQixFQUVzazFCTCxRQUFRQyxNQUFSLENBQWUsMkJBQWYsRUFBMkMsRUFBM0MsRUFBK0NDLE9BQS9DLENBQXVELGlCQUF2RCxFQUF5RSxDQUFDLElBQUQsRUFBTSxTQUFOLEVBQWdCLFlBQWhCLEVBQTZCLFVBQTdCLEVBQXdDLFVBQVNDLENBQVQsRUFBV0MsQ0FBWCxFQUFhQyxDQUFiLEVBQWVDLENBQWYsRUFBaUI7QUFBQyxXQUFNLEVBQUM4akIsVUFBUyxrQkFBU25qQixDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFZixFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRTBCLElBQUYsQ0FBT3NpQixRQUFQLENBQWdCLFVBQVNqa0IsQ0FBVCxFQUFXO0FBQUNHLFlBQUUsWUFBVTtBQUFDRCxjQUFFNEcsVUFBRixDQUFhLHNDQUFiLEVBQW9EOUcsQ0FBcEQ7QUFBdUQsV0FBcEU7QUFBc0UsU0FBbEcsRUFBbUcsWUFBVTtBQUFDZSxZQUFFTCxPQUFGO0FBQVksU0FBMUgsRUFBMkgsVUFBU1YsQ0FBVCxFQUFXO0FBQUNlLFlBQUVKLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQW5KLEVBQW9KYyxDQUFwSixHQUF1SkMsRUFBRUgsT0FBaEs7QUFBd0ssT0FBOU0sRUFBK015akIsWUFBVyxvQkFBU25rQixDQUFULEVBQVc7QUFBQyxZQUFJQyxJQUFFSCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRTBCLElBQUYsQ0FBTzBpQixVQUFQLENBQWtCLFlBQVU7QUFBQ2xrQixZQUFFTyxPQUFGO0FBQVksU0FBekMsRUFBMEMsVUFBU1YsQ0FBVCxFQUFXO0FBQUNHLFlBQUVRLE1BQUYsQ0FBU1gsQ0FBVDtBQUFZLFNBQWxFLEVBQW1FRSxDQUFuRSxHQUFzRUMsRUFBRVMsT0FBL0U7QUFBdUYsT0FBN1UsRUFBOFUwakIsZ0JBQWUsd0JBQVNwa0IsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsSUFBRUgsRUFBRU0sS0FBRixFQUFOLENBQWdCLE9BQU9MLEVBQUUwQixJQUFGLENBQU80aUIsNkJBQVAsQ0FBcUMsWUFBVTtBQUFDcGtCLFlBQUVPLE9BQUY7QUFBWSxTQUE1RCxFQUE2RFIsQ0FBN0QsR0FBZ0VDLEVBQUVTLE9BQXpFO0FBQWlGLE9BQTFjLEVBQU47QUFBa2QsR0FBNWdCLENBQXpFLENBRnRrMUIsRUFFOHAyQmYsUUFBUUMsTUFBUixDQUFlLDZCQUFmLEVBQTZDLEVBQTdDLEVBQWlEQyxPQUFqRCxDQUF5RCxtQkFBekQsRUFBNkUsQ0FBQyxZQUFVO0FBQUMsV0FBTSxFQUFDMHBCLFNBQVEsaUJBQVN6cEIsQ0FBVCxFQUFXO0FBQUMsZUFBT3lGLFVBQVVVLFlBQVYsQ0FBdUJzakIsT0FBdkIsQ0FBK0J6cEIsQ0FBL0IsQ0FBUDtBQUF5QyxPQUE5RCxFQUErRDBwQixvQkFBbUIsNEJBQVMxcEIsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxlQUFPd0YsVUFBVVUsWUFBVixDQUF1QnVqQixrQkFBdkIsQ0FBMEMxcEIsQ0FBMUMsRUFBNENDLENBQTVDLENBQVA7QUFBc0QsT0FBdEosRUFBdUowcEIsaUJBQWdCLDJCQUFVO0FBQUMsZUFBT2xrQixVQUFVVSxZQUFWLENBQXVCd2pCLGVBQXZCLEVBQVA7QUFBZ0QsT0FBbE8sRUFBTjtBQUEwTyxHQUF0UCxDQUE3RSxDQUY5cDJCLEVBRW8rMkI5cEIsUUFBUUMsTUFBUixDQUFlLG9DQUFmLEVBQW9ELEVBQXBELEVBQXdEZ0QsUUFBeEQsQ0FBaUUsMEJBQWpFLEVBQTRGLENBQUMsWUFBVTtBQUFDLFFBQUk5QyxJQUFFLEVBQU4sQ0FBUyxLQUFLNHBCLFFBQUwsR0FBYyxVQUFTM3BCLENBQVQsRUFBVztBQUFDRCxRQUFFNnBCLEtBQUYsR0FBUTVwQixDQUFSO0FBQVUsS0FBcEMsRUFBcUMsS0FBSzZwQixjQUFMLEdBQW9CLFVBQVM3cEIsQ0FBVCxFQUFXO0FBQUNELFFBQUV5Z0IsUUFBRixHQUFXeGdCLENBQVg7QUFBYSxLQUFsRixFQUFtRixLQUFLOHBCLGNBQUwsR0FBb0IsVUFBUzlwQixDQUFULEVBQVc7QUFBQ0QsUUFBRWdxQixXQUFGLEdBQWMvcEIsQ0FBZDtBQUFnQixLQUFuSSxFQUFvSSxLQUFLZ3FCLGNBQUwsR0FBb0IsVUFBU2hxQixDQUFULEVBQVc7QUFBQ0QsUUFBRWtxQixXQUFGLEdBQWNqcUIsQ0FBZDtBQUFnQixLQUFwTCxFQUFxTCxLQUFLa3FCLGtCQUFMLEdBQXdCLFVBQVNscUIsQ0FBVCxFQUFXO0FBQUNELFFBQUVvcUIsZUFBRixHQUFrQm5xQixDQUFsQjtBQUFvQixLQUE3TyxFQUE4TyxLQUFLb3FCLG1CQUFMLEdBQXlCLFVBQVNwcUIsQ0FBVCxFQUFXO0FBQUNELFFBQUVzcUIsZ0JBQUYsR0FBbUJycUIsQ0FBbkI7QUFBcUIsS0FBeFMsRUFBeVMsS0FBS3NxQixjQUFMLEdBQW9CLFVBQVN0cUIsQ0FBVCxFQUFXO0FBQUNELFFBQUV3cUIsV0FBRixHQUFjdnFCLENBQWQ7QUFBZ0IsS0FBelYsRUFBMFYsS0FBSzJFLElBQUwsR0FBVSxDQUFDLElBQUQsRUFBTSxTQUFOLEVBQWdCLFVBQVMzRSxDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLGFBQU0sRUFBQ29PLGNBQWEsc0JBQVNuTyxDQUFULEVBQVc7QUFBQyxjQUFJVyxJQUFFYixFQUFFSyxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0osRUFBRWlDLE9BQUYsQ0FBVXNvQixnQkFBVixJQUE0QnZxQixFQUFFaUMsT0FBRixDQUFVc29CLGdCQUFWLENBQTJCbmMsWUFBM0IsQ0FBd0N4TixFQUFFSixPQUExQyxFQUFrREksRUFBRUgsTUFBcEQsRUFBMkRkLFFBQVE2RSxNQUFSLENBQWUsRUFBZixFQUFrQjFFLENBQWxCLEVBQW9CRyxDQUFwQixDQUEzRCxHQUFtRlcsRUFBRUYsT0FBakgsS0FBMkhFLEVBQUVKLE9BQUYsQ0FBVSxJQUFWLEdBQWdCSSxFQUFFRixPQUE3SSxDQUFQO0FBQTZKLFNBQXZNLEVBQU47QUFBK00sS0FBN08sQ0FBcFc7QUFBbWxCLEdBQXhtQixDQUE1RixDQUZwKzJCLEVBRTJxNEJmLFFBQVFDLE1BQVIsQ0FBZSx1QkFBZixFQUF1QyxFQUF2QyxFQUEyQ0MsT0FBM0MsQ0FBbUQsYUFBbkQsRUFBaUUsQ0FBQyxJQUFELEVBQU0sU0FBTixFQUFnQixVQUFTQyxDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFdBQU0sRUFBQ3lxQixPQUFNLGVBQVN4cUIsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxZQUFJVyxJQUFFZCxFQUFFTSxLQUFGLEVBQU4sQ0FBZ0IsT0FBT0wsRUFBRXdPLEdBQUYsQ0FBTWljLEtBQU4sQ0FBWXhxQixDQUFaLEVBQWNDLENBQWQsRUFBZ0IsVUFBU0gsQ0FBVCxFQUFXO0FBQUMsZ0JBQUlBLENBQUosR0FBTWMsRUFBRUosT0FBRixFQUFOLEdBQWtCSSxFQUFFSCxNQUFGLEVBQWxCO0FBQTZCLFNBQXpELEVBQTBELFVBQVNYLENBQVQsRUFBVztBQUFDYyxZQUFFZ0YsTUFBRixDQUFTOUYsQ0FBVDtBQUFZLFNBQWxGLEdBQW9GYyxFQUFFRixPQUE3RjtBQUFxRyxPQUExSSxFQUFOO0FBQWtKLEdBQWhMLENBQWpFLENBRjNxNEI7QUFFKzU0QixDQUYxNjRCLEVBQUQ7OztBQ05BZixRQUFRQyxNQUFSLENBQWUsT0FBZixFQUF3QjZxQixVQUF4QixDQUFtQyxjQUFuQyxFQUFtRCxVQUFTQyxNQUFULEVBQWdCO0FBQ2pFO0FBQ0FBLFNBQU9DLE1BQVAsR0FBZ0IsWUFBVTtBQUN4QnRxQixXQUFPdXFCLE9BQVAsQ0FBZUMsRUFBZixDQUFrQixDQUFDLENBQW5CO0FBQ0QsR0FGRDtBQUlELENBTkQ7OztBQ0FBbHJCLFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCNnFCLFVBQXhCLENBQW1DLGlCQUFuQyxFQUFzRCxVQUFTQyxNQUFULEVBQWdCO0FBQ25FQSxVQUFPeFcsSUFBUCxHQUFjLHNDQUFkO0FBRUYsQ0FIRDs7O0FDQUF0VSxPQUFPNnFCLFVBQVAsQ0FBa0IsWUFBbEIsRUFBZ0MsVUFBU0MsTUFBVCxFQUFpQkksY0FBakIsRUFBaUM7O0FBRS9EamtCLFdBQVNDLGdCQUFULENBQTBCLGFBQTFCLEVBQXlDLFlBQVk7QUFDakRpa0IsbUJBQWVDLFlBQWYsR0FBOEJ4cEIsSUFBOUIsQ0FBbUNzVCxPQUFuQyxFQUE0Q1UsS0FBNUM7QUFDRCxHQUZILEVBRUssS0FGTDs7QUFJRTs7QUFFQXlWLGlCQUFlQyxLQUFmLENBQXFCLFlBQVc7QUFDOUJILG1CQUFlQyxZQUFmLEdBQThCeHBCLElBQTlCLENBQW1Dc1QsT0FBbkMsRUFBNENVLEtBQTVDO0FBQ0QsR0FGRDs7QUFJRmtWLFNBQU9TLFdBQVAsR0FBcUIsWUFBVztBQUM5QixRQUFJQyxVQUFVO0FBQ1psRyxlQUFTLEVBREc7QUFFWm1HLHVCQUFpQkMsT0FBT0MsZUFBUCxDQUF1QkMsUUFGNUI7QUFHWkMsa0JBQVlILE9BQU9JLGlCQUFQLENBQXlCQyxNQUh6QjtBQUlaQyxpQkFBVyxLQUpDO0FBS1pDLG9CQUFjUCxPQUFPUSxZQUFQLENBQW9CQyxJQUx0QjtBQU1aQyxtQkFBYSxHQU5EO0FBT1pDLG9CQUFjLEdBUEY7QUFRWkMsc0JBQWdCQyxvQkFSSjtBQVNaQyx3QkFBa0IsS0FUTjtBQVViQywwQkFBbUI7QUFWTixLQUFkOztBQWFBdkIsbUJBQWVqZCxVQUFmLENBQTBCdWQsT0FBMUIsRUFBbUM1cEIsSUFBbkMsQ0FBd0MsVUFBUzhxQixTQUFULEVBQW9CO0FBQzFENUIsYUFBTzZCLE1BQVAsR0FBZ0IsNEJBQTRCRCxTQUE1QztBQUNELEtBRkQsRUFFRyxVQUFTRSxHQUFULEVBQWM7QUFDZjtBQUNELEtBSkQ7QUFNRCxHQXBCRDtBQXFCQyxDQWpDSCxFQWlDSyxLQWpDTDs7O0FDQUE3c0IsUUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0I2cUIsVUFBeEIsQ0FBbUMsZUFBbkMsRUFBb0QsVUFBU0MsTUFBVCxFQUFnQjtBQUNqRUEsVUFBT3hXLElBQVAsR0FBYyw4QkFBZDtBQUVGLENBSEQ7OztBQ0FBdlUsUUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0I2cUIsVUFBeEIsQ0FBbUMsZUFBbkMsRUFBb0QsVUFBU0MsTUFBVCxFQUFpQitCLFdBQWpCLEVBQTZCO0FBQy9FO0FBQ0FBLGNBQVlDLGVBQVosQ0FBNEIsaUJBQTVCLEVBQStDO0FBQzdDQyxXQUFPakMsTUFEc0M7QUFFN0NrQyxlQUFXO0FBRmtDLEdBQS9DLEVBR0dwckIsSUFISCxDQUdRLFVBQVNxckIsS0FBVCxFQUFnQjtBQUN0Qm5DLFdBQU9tQyxLQUFQLEdBQWVBLEtBQWY7QUFDRCxHQUxEO0FBTUFuQyxTQUFPb0MsU0FBUCxHQUFtQixZQUFXO0FBQzVCcEMsV0FBT21DLEtBQVAsQ0FBYTdxQixJQUFiO0FBQ0QsR0FGRDtBQUdBMG9CLFNBQU9xQyxVQUFQLEdBQW9CLFlBQVc7QUFDN0JyQyxXQUFPbUMsS0FBUCxDQUFhMXFCLElBQWI7QUFDRCxHQUZEO0FBR0E7QUFDQXVvQixTQUFPc0MsR0FBUCxDQUFXLFVBQVgsRUFBdUIsWUFBVztBQUNoQ3RDLFdBQU9tQyxLQUFQLENBQWFuZCxNQUFiO0FBQ0QsR0FGRDtBQUdBO0FBQ0FnYixTQUFPc0MsR0FBUCxDQUFXLGNBQVgsRUFBMkIsWUFBVztBQUNwQztBQUNELEdBRkQ7QUFHQTtBQUNBdEMsU0FBT3NDLEdBQVAsQ0FBVyxlQUFYLEVBQTRCLFlBQVc7QUFDckM7QUFDRCxHQUZEO0FBSUQsQ0EzQkQ7OztBQ0FBcnRCLFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCNnFCLFVBQXhCLENBQW1DLGdCQUFuQyxFQUFxRCxVQUFTQyxNQUFULEVBQWlCdUMsS0FBakIsRUFBd0JDLE1BQXhCLEVBQWdDQyxpQkFBaEMsRUFBa0Q7QUFDckc7O0FBRUN6QyxTQUFPM1gsS0FBUCxHQUFlLFVBQVNxYSxJQUFULEVBQWM7QUFDNUI7QUFDQ0Qsc0JBQWtCRSxTQUFsQixDQUE0QkQsSUFBNUIsRUFBa0M1ckIsSUFBbEMsQ0FBdUMsVUFBUzhyQixRQUFULEVBQWtCO0FBQ3hEO0FBQ0NMLFlBQU1NLFFBQU4sQ0FBZUQsUUFBZjtBQUNFSixhQUFPckMsRUFBUCxDQUFVLFdBQVY7QUFFSCxLQUxEO0FBTUQsR0FSRDtBQVNBSCxTQUFPdEIsWUFBUCxHQUFzQixVQUFTeG1CLFFBQVQsRUFBbUI7QUFDekNxcUIsVUFBTTdELFlBQU4sQ0FBbUJ4bUIsUUFBbkI7QUFBNkIsR0FEN0I7QUFFQTtBQUNBOG5CLFNBQU84QyxRQUFQLEdBQWtCLFlBQVU7QUFDNUI5QyxXQUFPdm9CLElBQVAsR0FBYyxDQUFDdW9CLE9BQU92b0IsSUFBdEI7QUFFQSxHQUhBO0FBSUYsQ0FuQkQ7OztBQ0FBeEMsUUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0I2cUIsVUFBeEIsQ0FBbUMsZUFBbkMsRUFBb0QsVUFBU0MsTUFBVCxFQUFnQjtBQUNsRUEsU0FBT0MsTUFBUCxHQUFnQixZQUFVO0FBQ3hCdHFCLFdBQU91cUIsT0FBUCxDQUFlQyxFQUFmLENBQWtCLENBQUMsQ0FBbkI7QUFDRCxHQUZEO0FBSUQsQ0FMRDs7O0FDQUFsckIsUUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0I2cUIsVUFBeEIsQ0FBbUMsYUFBbkMsRUFBa0QsVUFBU0MsTUFBVCxFQUFnQjtBQUMvREEsVUFBT3hXLElBQVAsR0FBYyxpQ0FBZDtBQUVGLENBSEQ7OztBQ0FBdlUsUUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0I2cUIsVUFBeEIsQ0FBbUMsVUFBbkMsRUFBK0MsVUFBU0MsTUFBVCxFQUFpQitCLFdBQWpCLEVBQTZCZ0IsV0FBN0IsRUFBeUM7QUFDckYvQyxTQUFPeFcsSUFBUCxHQUFjLDhCQUFkO0FBQ0F1WSxjQUFZQyxlQUFaLENBQTRCLGtCQUE1QixFQUFnRDtBQUM5Q0MsV0FBT2pDLE1BRHVDO0FBRTlDa0MsZUFBVztBQUZtQyxHQUFoRCxFQUdHcHJCLElBSEgsQ0FHUSxVQUFTcXJCLEtBQVQsRUFBZ0I7QUFDdEJuQyxXQUFPbUMsS0FBUCxHQUFlQSxLQUFmO0FBQ0QsR0FMRDtBQU1BbkMsU0FBT29DLFNBQVAsR0FBbUIsWUFBVztBQUM1QnBDLFdBQU9tQyxLQUFQLENBQWE3cUIsSUFBYjtBQUNELEdBRkQ7QUFHQTBvQixTQUFPcUMsVUFBUCxHQUFvQixZQUFXO0FBQzdCckMsV0FBT21DLEtBQVAsQ0FBYTFxQixJQUFiO0FBQ0QsR0FGRDtBQUdBO0FBQ0F1b0IsU0FBT3NDLEdBQVAsQ0FBVyxVQUFYLEVBQXVCLFlBQVc7QUFDaEN0QyxXQUFPbUMsS0FBUCxDQUFhbmQsTUFBYjtBQUNELEdBRkQ7QUFHQTtBQUNBZ2IsU0FBT3NDLEdBQVAsQ0FBVyxjQUFYLEVBQTJCLFlBQVc7QUFDcEM7QUFDRCxHQUZEO0FBR0E7QUFDQXRDLFNBQU9zQyxHQUFQLENBQVcsZUFBWCxFQUE0QixZQUFXO0FBQ3JDO0FBQ0QsR0FGRDtBQUlGLENBM0JEOzs7QUNBQXJ0QixRQUFRQyxNQUFSLENBQWUsT0FBZixFQUF3QjZxQixVQUF4QixDQUFtQyxXQUFuQyxFQUFnRCxVQUFTQyxNQUFULEVBQWlCdUMsS0FBakIsRUFBd0JDLE1BQXhCLEVBQWdDUSxZQUFoQyxFQUE2Qzs7QUFFN0ZoRCxTQUFPM1gsS0FBUCxHQUFlLFVBQVNxYSxJQUFULEVBQWM7QUFDM0I7QUFDQU0saUJBQWFMLFNBQWIsQ0FBdUJELElBQXZCLEVBQTZCNXJCLElBQTdCLENBQWtDLFVBQVM4ckIsUUFBVCxFQUFrQjtBQUNsRDtBQUNBTCxZQUFNTSxRQUFOLENBQWVELFFBQWY7QUFDRUosYUFBT3JDLEVBQVAsQ0FBVSxNQUFWO0FBRUgsS0FMRDtBQU1ELEdBUkQ7QUFTQUgsU0FBT2lELFFBQVAsR0FBa0IsVUFBU0MsT0FBVCxFQUFpQjtBQUNqQ0YsaUJBQWFDLFFBQWIsQ0FBc0JDLE9BQXRCLEVBQStCcHNCLElBQS9CLENBQW9DLFVBQVM4ckIsUUFBVCxFQUFrQjtBQUNwREwsWUFBTU0sUUFBTixDQUFlRCxRQUFmO0FBQ0VKLGFBQU9yQyxFQUFQLENBQVUsTUFBVjtBQUNILEtBSEQ7QUFJRCxHQUxEO0FBTUVILFNBQU90QixZQUFQLEdBQXNCLFVBQVN4bUIsUUFBVCxFQUFtQjtBQUN6Q3FxQixVQUFNN0QsWUFBTixDQUFtQnhtQixRQUFuQjtBQUE2QixHQUQ3QjtBQUVBO0FBQ0E4bkIsU0FBTzhDLFFBQVAsR0FBa0IsWUFBVTtBQUM1QjlDLFdBQU92b0IsSUFBUCxHQUFjLENBQUN1b0IsT0FBT3ZvQixJQUF0QjtBQUVBLEdBSEE7QUFLRCxDQXpCRDs7O0FDQUF4QyxRQUFRQyxNQUFSLENBQWUsT0FBZixFQUF3QjZxQixVQUF4QixDQUFtQyxlQUFuQyxFQUFvRCxVQUFTQyxNQUFULEVBQWdCO0FBQ2xFQSxTQUFPQyxNQUFQLEdBQWdCLFlBQVU7QUFDeEJ0cUIsV0FBT3VxQixPQUFQLENBQWVDLEVBQWYsQ0FBa0IsQ0FBQyxDQUFuQjtBQUNELEdBRkQ7QUFJRCxDQUxEOzs7QUNBQWxyQixRQUFRQyxNQUFSLENBQWUsT0FBZixFQUF3QjZxQixVQUF4QixDQUFtQyxnQkFBbkMsRUFBcUQsVUFBU0MsTUFBVCxFQUFpQitCLFdBQWpCLEVBQTZCO0FBQ2hGQSxjQUFZQyxlQUFaLENBQTRCLGtCQUE1QixFQUFnRDtBQUM5Q0MsV0FBT2pDLE1BRHVDO0FBRTlDa0MsZUFBVztBQUZtQyxHQUFoRCxFQUdHcHJCLElBSEgsQ0FHUSxVQUFTcXJCLEtBQVQsRUFBZ0I7QUFDdEJuQyxXQUFPbUMsS0FBUCxHQUFlQSxLQUFmO0FBQ0QsR0FMRDtBQU1BbkMsU0FBT29DLFNBQVAsR0FBbUIsWUFBVztBQUM1QnBDLFdBQU9tQyxLQUFQLENBQWE3cUIsSUFBYjtBQUNELEdBRkQ7QUFHQTBvQixTQUFPcUMsVUFBUCxHQUFvQixZQUFXO0FBQzdCckMsV0FBT21DLEtBQVAsQ0FBYTFxQixJQUFiO0FBQ0QsR0FGRDtBQUdBO0FBQ0F1b0IsU0FBT3NDLEdBQVAsQ0FBVyxVQUFYLEVBQXVCLFlBQVc7QUFDaEN0QyxXQUFPbUMsS0FBUCxDQUFhbmQsTUFBYjtBQUNELEdBRkQ7QUFHQTtBQUNBZ2IsU0FBT3NDLEdBQVAsQ0FBVyxjQUFYLEVBQTJCLFlBQVc7QUFDcEM7QUFDRCxHQUZEO0FBR0E7QUFDQXRDLFNBQU9zQyxHQUFQLENBQVcsZUFBWCxFQUE0QixZQUFXO0FBQ3JDO0FBQ0QsR0FGRDtBQUdBO0FBQ0F0QyxTQUFPQyxNQUFQLEdBQWdCLFlBQVU7QUFDeEJ0cUIsV0FBT3VxQixPQUFQLENBQWVDLEVBQWYsQ0FBa0IsQ0FBQyxDQUFuQjtBQUNELEdBRkQ7QUFJRCxDQTlCRDs7O0FDQUFsckIsUUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0I2cUIsVUFBeEIsQ0FBbUMsY0FBbkMsRUFBbUQsVUFBU0MsTUFBVCxFQUFpQitCLFdBQWpCLEVBQTZCO0FBQzlFQSxjQUFZQyxlQUFaLENBQTRCLHFCQUE1QixFQUFtRDtBQUNoRG1CLFFBQUksR0FENEMsRUFDdkM7QUFDVGxCLFdBQU9qQyxNQUZ5QztBQUdoRG9ELDBCQUFzQixLQUgwQjtBQUloRGxCLGVBQVc7QUFKcUMsR0FBbkQsRUFLSXByQixJQUxKLENBS1MsVUFBU3FyQixLQUFULEVBQWdCO0FBQ3RCbkMsV0FBT3FELE9BQVAsR0FBaUJsQixLQUFqQjtBQUNELEdBUEY7O0FBU0M7QUFDQUosY0FBWUMsZUFBWixDQUE0QixzQkFBNUIsRUFBb0Q7QUFDbERtQixRQUFJLEdBRDhDLEVBQ3pDO0FBQ1RsQixXQUFPakMsTUFGMkM7QUFHbERvRCwwQkFBc0IsS0FINEI7QUFJbERsQixlQUFXO0FBSnVDLEdBQXBELEVBS0dwckIsSUFMSCxDQUtRLFVBQVNxckIsS0FBVCxFQUFnQjtBQUN0Qm5DLFdBQU9zRCxPQUFQLEdBQWlCbkIsS0FBakI7QUFDRCxHQVBEOztBQVNBSixjQUFZQyxlQUFaLENBQTRCLGdCQUE1QixFQUE4QztBQUM1Q21CLFFBQUksR0FEd0MsRUFDbkM7QUFDVGxCLFdBQU9qQyxNQUZxQztBQUc1Q29ELDBCQUFzQixLQUhzQjtBQUk1Q2xCLGVBQVc7QUFKaUMsR0FBOUMsRUFLR3ByQixJQUxILENBS1EsVUFBU3FyQixLQUFULEVBQWdCO0FBQ3RCbkMsV0FBT3VELE9BQVAsR0FBaUJwQixLQUFqQjtBQUNELEdBUEQ7O0FBU0FKLGNBQVlDLGVBQVosQ0FBNEIsZ0JBQTVCLEVBQThDO0FBQzVDbUIsUUFBSSxHQUR3QyxFQUNuQztBQUNUbEIsV0FBT2pDLE1BRnFDO0FBRzVDb0QsMEJBQXNCLEtBSHNCO0FBSTVDbEIsZUFBVztBQUppQyxHQUE5QyxFQUtHcHJCLElBTEgsQ0FLUSxVQUFTcXJCLEtBQVQsRUFBZ0I7QUFDdEJuQyxXQUFPd0QsT0FBUCxHQUFpQnJCLEtBQWpCO0FBQ0QsR0FQRDs7QUFTQUosY0FBWUMsZUFBWixDQUE0QixrQkFBNUIsRUFBZ0Q7QUFDOUNtQixRQUFJLEdBRDBDLEVBQ3JDO0FBQ1RsQixXQUFPakMsTUFGdUM7QUFHOUNvRCwwQkFBc0IsS0FId0I7QUFJOUNsQixlQUFXO0FBSm1DLEdBQWhELEVBS0dwckIsSUFMSCxDQUtRLFVBQVNxckIsS0FBVCxFQUFnQjtBQUN0Qm5DLFdBQU95RCxPQUFQLEdBQWlCdEIsS0FBakI7QUFDRCxHQVBEOztBQVdBbkMsU0FBT29DLFNBQVAsR0FBbUIsVUFBU3NCLEtBQVQsRUFBZ0I7QUFDakMsUUFBSUEsU0FBUyxDQUFiLEVBQWdCMUQsT0FBT3FELE9BQVAsQ0FBZS9yQixJQUFmLEdBQWhCLEtBQ0ssSUFBR29zQixTQUFTLENBQVosRUFBZTFELE9BQU9zRCxPQUFQLENBQWVoc0IsSUFBZixHQUFmLEtBQ0EsSUFBR29zQixTQUFTLENBQVosRUFBZTFELE9BQU91RCxPQUFQLENBQWVqc0IsSUFBZixHQUFmLEtBQ0EsSUFBR29zQixTQUFTLENBQVosRUFBZTFELE9BQU93RCxPQUFQLENBQWVsc0IsSUFBZixHQUFmLEtBQ0Ewb0IsT0FBT3lELE9BQVAsQ0FBZW5zQixJQUFmO0FBQ04sR0FORDs7QUFRQTBvQixTQUFPcUMsVUFBUCxHQUFvQixVQUFTcUIsS0FBVCxFQUFnQjtBQUNsQyxRQUFJQSxTQUFTLENBQWIsRUFBZ0IxRCxPQUFPcUQsT0FBUCxDQUFlNXJCLElBQWYsR0FBaEIsS0FDSyxJQUFHaXNCLFNBQVMsQ0FBWixFQUFlMUQsT0FBT3NELE9BQVAsQ0FBZTdyQixJQUFmLEdBQWYsS0FDQSxJQUFHaXNCLFNBQVMsQ0FBWixFQUFlMUQsT0FBT3VELE9BQVAsQ0FBZTlyQixJQUFmLEdBQWYsS0FDQSxJQUFHaXNCLFNBQVMsQ0FBWixFQUFlMUQsT0FBT3dELE9BQVAsQ0FBZS9yQixJQUFmLEdBQWYsS0FDQXVvQixPQUFPeUQsT0FBUCxDQUFlaHNCLElBQWY7QUFDTixHQU5EOztBQVFBdW9CLFNBQU9zQyxHQUFQLENBQVcsVUFBWCxFQUF1QixZQUFXO0FBQ2hDdEMsV0FBT3FELE9BQVAsQ0FBZXJlLE1BQWY7QUFDQWdiLFdBQU9zRCxPQUFQLENBQWV0ZSxNQUFmO0FBQ0FnYixXQUFPdUQsT0FBUCxDQUFldmUsTUFBZjtBQUNBZ2IsV0FBT3dELE9BQVAsQ0FBZXhlLE1BQWY7QUFDQWdiLFdBQU95RCxPQUFQLENBQWV6ZSxNQUFmO0FBQ0QsR0FORDtBQVFGLENBekVEOzs7QUNBQS9QLFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCNnFCLFVBQXhCLENBQW1DLGFBQW5DLEVBQWtELFVBQVNDLE1BQVQsRUFBaUIrQixXQUFqQixFQUE2QjtBQUM3RUEsY0FBWUMsZUFBWixDQUE0QixtQkFBNUIsRUFBaUQ7QUFDL0NDLFdBQU9qQyxNQUR3QztBQUUvQ2tDLGVBQVc7QUFGb0MsR0FBakQsRUFHR3ByQixJQUhILENBR1EsVUFBU3FyQixLQUFULEVBQWdCO0FBQ3RCbkMsV0FBT21DLEtBQVAsR0FBZUEsS0FBZjtBQUNELEdBTEQ7QUFNQW5DLFNBQU9vQyxTQUFQLEdBQW1CLFlBQVc7QUFDNUJwQyxXQUFPbUMsS0FBUCxDQUFhN3FCLElBQWI7QUFDRCxHQUZEO0FBR0Ewb0IsU0FBT3FDLFVBQVAsR0FBb0IsWUFBVztBQUM3QnJDLFdBQU9tQyxLQUFQLENBQWExcUIsSUFBYjtBQUNELEdBRkQ7QUFHQTtBQUNBdW9CLFNBQU9zQyxHQUFQLENBQVcsVUFBWCxFQUF1QixZQUFXO0FBQ2hDdEMsV0FBT21DLEtBQVAsQ0FBYW5kLE1BQWI7QUFDRCxHQUZEO0FBR0E7QUFDQWdiLFNBQU9zQyxHQUFQLENBQVcsY0FBWCxFQUEyQixZQUFXO0FBQ3BDO0FBQ0QsR0FGRDtBQUdBO0FBQ0F0QyxTQUFPc0MsR0FBUCxDQUFXLGVBQVgsRUFBNEIsWUFBVztBQUNyQztBQUNELEdBRkQ7QUFJRCxDQTFCRDs7O0FDQUFydEIsUUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0I2cUIsVUFBeEIsQ0FBbUMsY0FBbkMsRUFBbUQsVUFBU0MsTUFBVCxFQUFnQjtBQUNoRUEsVUFBT3hXLElBQVAsR0FBYyw4QkFBZDtBQUVGLENBSEQ7OztBQ0FBdlUsUUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0J3Z0IsT0FBeEIsQ0FBZ0MsY0FBaEMsRUFBZ0QsVUFBU2lPLEtBQVQsRUFBZTs7QUFHN0QsT0FBS2hCLFNBQUwsR0FBaUIsVUFBU0QsSUFBVCxFQUFlO0FBQzlCO0FBQ0EsV0FBT2lCLE1BQU07QUFDWEMsY0FBUSxNQURHO0FBRVhDLFdBQUssYUFGTTtBQUdYQyxZQUFNcEI7QUFISyxLQUFOLENBQVA7QUFLRCxHQVBEO0FBUUEsT0FBS08sUUFBTCxHQUFnQixVQUFTQyxPQUFULEVBQWtCO0FBQ2hDLFdBQU9TLE1BQU07QUFDWEMsY0FBUSxNQURHO0FBRVhDLFdBQUssY0FGTTtBQUdYQyxZQUFNWjtBQUhLLEtBQU4sQ0FBUDtBQUtELEdBTkQ7QUFPRCxDQWxCRCxHQWtCRzs7O0FDbEJIanVCLFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCd2dCLE9BQXhCLENBQWdDLGFBQWhDLEVBQStDLFVBQVNpTyxLQUFULEVBQWVJLEVBQWYsRUFBa0J4QixLQUFsQixFQUF3Qjs7QUFHdkUsT0FBS3lCLFdBQUwsR0FBbUJ6QixNQUFNMEIsVUFBTixFQUFuQjs7QUFFQWpSLFVBQVE4QyxHQUFSLENBQVksS0FBS2tPLFdBQWpCOztBQUVBaFIsVUFBUThDLEdBQVIsQ0FBWSxvQkFBWjtBQUtDLENBWkQsR0FZRyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIG5nQ29yZG92YVxuICogdjAuMS4yNy1hbHBoYVxuICogQ29weXJpZ2h0IDIwMTUgRHJpZnR5IENvLiBodHRwOi8vZHJpZnR5LmNvbS9cbiAqIFNlZSBMSUNFTlNFIGluIHRoaXMgcmVwb3NpdG9yeSBmb3IgbGljZW5zZSBpbmZvcm1hdGlvblxuICovXG4hZnVuY3Rpb24oKXthbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YVwiLFtcIm5nQ29yZG92YS5wbHVnaW5zXCJdKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLjNkdG91Y2hcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhM0RUb3VjaFwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7dmFyIG49W10scj17fSxvPWZ1bmN0aW9uKGUpe3JldHVybiBmdW5jdGlvbihuKXtmb3IodmFyIHIgaW4gZSluLnR5cGU9PT1yJiZlW3JdKCl9fTtyZXR1cm57aXNBdmFpbGFibGU6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIHdpbmRvdy5jb3Jkb3ZhP3dpbmRvdy5UaHJlZURlZVRvdWNoP3dpbmRvdy5UaHJlZURlZVRvdWNoLmlzQXZhaWxhYmxlKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KTpuLnJlamVjdChcIkNvdWxkIG5vdCBmaW5kIDNEIHRvdWNoIHBsdWdpblwiKTpuLnJlamVjdChcIk5vdCBzdXBwb3J0ZWQgaW4gYnJvd3NlclwiKSxuLnByb21pc2V9LGFkZFF1aWNrQWN0aW9uOmZ1bmN0aW9uKHQsaSxhLGMsdSxzKXt2YXIgbD1lLmRlZmVyKCksZj17dHlwZTp0LHRpdGxlOmksc3VidGl0bGU6dX07cmV0dXJuIGEmJihmLmljb25UeXBlPWEpLGMmJihmLmljb25UZW1wbGF0ZT1jKSx0aGlzLmlzQXZhaWxhYmxlKCkudGhlbihmdW5jdGlvbigpe24ucHVzaChmKSxyW3RdPXMsd2luZG93LlRocmVlRGVlVG91Y2guY29uZmlndXJlUXVpY2tBY3Rpb25zKG4pLHdpbmRvdy5UaHJlZURlZVRvdWNoLm9uSG9tZUljb25QcmVzc2VkPW8ociksbC5yZXNvbHZlKG4pfSxmdW5jdGlvbihlKXtsLnJlamVjdChlKX0pLGwucHJvbWlzZX0sYWRkUXVpY2tBY3Rpb25IYW5kbGVyOmZ1bmN0aW9uKG4sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiB0aGlzLmlzQXZhaWxhYmxlKCkudGhlbihmdW5jdGlvbigpe3Jbbl09dCx3aW5kb3cuVGhyZWVEZWVUb3VjaC5vbkhvbWVJY29uUHJlc3NlZD1vKHIpLGkucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKGUpe2kucmVqZWN0KGUpfSksaS5wcm9taXNlfSxlbmFibGVMaW5rUHJldmlldzpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gdGhpcy5pc0F2YWlsYWJsZSgpLnRoZW4oZnVuY3Rpb24oKXt3aW5kb3cuVGhyZWVEZWVUb3VjaC5lbmFibGVMaW5rUHJldmlldygpLG4ucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxhZGRGb3JjZVRvdWNoSGFuZGxlcjpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIHRoaXMuaXNBdmFpbGFibGUoKS50aGVuKGZ1bmN0aW9uKCl7d2luZG93LlRocmVlRGVlVG91Y2gud2F0Y2hGb3JjZVRvdWNoZXMobiksci5yZXNvbHZlKCEwKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmFjdGlvblNoZWV0XCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUFjdGlvblNoZWV0XCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntzaG93OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmFjdGlvbnNoZWV0LnNob3cocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9KSxvLnByb21pc2V9LGhpZGU6ZnVuY3Rpb24oKXtyZXR1cm4gbi5wbHVnaW5zLmFjdGlvbnNoZWV0LmhpZGUoKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuYWRNb2JcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQWRNb2JcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2NyZWF0ZUJhbm5lclZpZXc6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuQWRNb2IuY3JlYXRlQmFubmVyVmlldyhyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sY3JlYXRlSW50ZXJzdGl0aWFsVmlldzpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5BZE1vYi5jcmVhdGVJbnRlcnN0aXRpYWxWaWV3KHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxyZXF1ZXN0QWQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuQWRNb2IucmVxdWVzdEFkKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93QWQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuQWRNb2Iuc2hvd0FkKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxyZXF1ZXN0SW50ZXJzdGl0aWFsQWQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuQWRNb2IucmVxdWVzdEludGVyc3RpdGlhbEFkKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5hcHBBdmFpbGFiaWxpdHlcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQXBwQXZhaWxhYmlsaXR5XCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57Y2hlY2s6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBhcHBBdmFpbGFiaWxpdHkuY2hlY2sobixmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5hcHBSYXRlXCIsW10pLnByb3ZpZGVyKFwiJGNvcmRvdmFBcHBSYXRlXCIsW2Z1bmN0aW9uKCl7dGhpcy5zZXRQcmVmZXJlbmNlcz1mdW5jdGlvbihlKXtlJiZhbmd1bGFyLmlzT2JqZWN0KGUpJiYoQXBwUmF0ZS5wcmVmZXJlbmNlcy51c2VMYW5ndWFnZT1lLmxhbmd1YWdlfHxudWxsLEFwcFJhdGUucHJlZmVyZW5jZXMuZGlzcGxheUFwcE5hbWU9ZS5hcHBOYW1lfHxcIlwiLEFwcFJhdGUucHJlZmVyZW5jZXMucHJvbXB0QWdhaW5Gb3JFYWNoTmV3VmVyc2lvbj1lLnByb21wdEZvck5ld1ZlcnNpb258fCEwLEFwcFJhdGUucHJlZmVyZW5jZXMub3BlblN0b3JlSW5BcHA9ZS5vcGVuU3RvcmVJbkFwcHx8ITEsQXBwUmF0ZS5wcmVmZXJlbmNlcy51c2VzVW50aWxQcm9tcHQ9ZS51c2VzVW50aWxQcm9tcHR8fDMsQXBwUmF0ZS5wcmVmZXJlbmNlcy51c2VDdXN0b21SYXRlRGlhbG9nPWUudXNlQ3VzdG9tUmF0ZURpYWxvZ3x8ITEsQXBwUmF0ZS5wcmVmZXJlbmNlcy5zdG9yZUFwcFVSTC5pb3M9ZS5pb3NVUkx8fG51bGwsQXBwUmF0ZS5wcmVmZXJlbmNlcy5zdG9yZUFwcFVSTC5hbmRyb2lkPWUuYW5kcm9pZFVSTHx8bnVsbCxBcHBSYXRlLnByZWZlcmVuY2VzLnN0b3JlQXBwVVJMLmJsYWNrYmVycnk9ZS5ibGFja2JlcnJ5VVJMfHxudWxsLEFwcFJhdGUucHJlZmVyZW5jZXMuc3RvcmVBcHBVUkwud2luZG93czg9ZS53aW5kb3dzVVJMfHxudWxsKX0sdGhpcy5zZXRDdXN0b21Mb2NhbGU9ZnVuY3Rpb24oZSl7dmFyIG49e3RpdGxlOlwiUmF0ZSAlQFwiLG1lc3NhZ2U6XCJJZiB5b3UgZW5qb3kgdXNpbmcgJUAsIHdvdWxkIHlvdSBtaW5kIHRha2luZyBhIG1vbWVudCB0byByYXRlIGl0PyBJdCB3b27igJl0IHRha2UgbW9yZSB0aGFuIGEgbWludXRlLiBUaGFua3MgZm9yIHlvdXIgc3VwcG9ydCFcIixjYW5jZWxCdXR0b25MYWJlbDpcIk5vLCBUaGFua3NcIixsYXRlckJ1dHRvbkxhYmVsOlwiUmVtaW5kIE1lIExhdGVyXCIscmF0ZUJ1dHRvbkxhYmVsOlwiUmF0ZSBJdCBOb3dcIn07bj1hbmd1bGFyLmV4dGVuZChuLGUpLEFwcFJhdGUucHJlZmVyZW5jZXMuY3VzdG9tTG9jYWxlPW59LHRoaXMuJGdldD1bXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntwcm9tcHRGb3JSYXRpbmc6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpLG89QXBwUmF0ZS5wcm9tcHRGb3JSYXRpbmcobik7cmV0dXJuIHIucmVzb2x2ZShvKSxyLnByb21pc2V9LG5hdmlnYXRlVG9BcHBTdG9yZTpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKSxyPUFwcFJhdGUubmF2aWdhdGVUb0FwcFN0b3JlKCk7cmV0dXJuIG4ucmVzb2x2ZShyKSxuLnByb21pc2V9LG9uQnV0dG9uQ2xpY2tlZDpmdW5jdGlvbihlKXtBcHBSYXRlLnByZWZlcmVuY2VzLmNhbGxiYWNrcy5vbkJ1dHRvbkNsaWNrZWQ9ZS5iaW5kKHRoaXMpfSxvblJhdGVEaWFsb2dTaG93OmZ1bmN0aW9uKGUpe0FwcFJhdGUucHJlZmVyZW5jZXMuY2FsbGJhY2tzLm9uUmF0ZURpYWxvZ1Nob3c9ZS5iaW5kKHRoaXMpfX19XX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmFwcFZlcnNpb25cIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQXBwVmVyc2lvblwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2dldEFwcE5hbWU6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEuZ2V0QXBwVmVyc2lvbi5nZXRBcHBOYW1lKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0pLG4ucHJvbWlzZX0sZ2V0UGFja2FnZU5hbWU6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEuZ2V0QXBwVmVyc2lvbi5nZXRQYWNrYWdlTmFtZShmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9KSxuLnByb21pc2V9LGdldFZlcnNpb25OdW1iZXI6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEuZ2V0QXBwVmVyc2lvbi5nZXRWZXJzaW9uTnVtYmVyKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0pLG4ucHJvbWlzZX0sZ2V0VmVyc2lvbkNvZGU6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEuZ2V0QXBwVmVyc2lvbi5nZXRWZXJzaW9uQ29kZShmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9KSxuLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmJhY2tncm91bmRHZW9sb2NhdGlvblwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFCYWNrZ3JvdW5kR2VvbG9jYXRpb25cIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2luaXQ6ZnVuY3Rpb24oKXtuLm5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oZnVuY3Rpb24oZSl7cmV0dXJuIGV9KX0sY29uZmlndXJlOmZ1bmN0aW9uKHIpe3RoaXMuaW5pdCgpO3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmJhY2tncm91bmRHZW9Mb2NhdGlvbi5jb25maWd1cmUoZnVuY3Rpb24oZSl7by5ub3RpZnkoZSksbi5wbHVnaW5zLmJhY2tncm91bmRHZW9Mb2NhdGlvbi5maW5pc2goKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9LHIpLHRoaXMuc3RhcnQoKSxvLnByb21pc2V9LHN0YXJ0OmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuYmFja2dyb3VuZEdlb0xvY2F0aW9uLnN0YXJ0KGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHN0b3A6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5iYWNrZ3JvdW5kR2VvTG9jYXRpb24uc3RvcChmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5iYWRnZVwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFCYWRnZVwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2hhc1Blcm1pc3Npb246ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24uYmFkZ2UuaGFzUGVybWlzc2lvbihmdW5jdGlvbihlKXtlP24ucmVzb2x2ZSghMCk6bi5yZWplY3QoXCJZb3UgZG8gbm90IGhhdmUgcGVybWlzc2lvblwiKX0pLG4ucHJvbWlzZX0scHJvbXB0Rm9yUGVybWlzc2lvbjpmdW5jdGlvbigpe3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmJhZGdlLnByb21wdEZvclBlcm1pc3Npb24oKX0sc2V0OmZ1bmN0aW9uKG4scixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24uYmFkZ2UuaGFzUGVybWlzc2lvbihmdW5jdGlvbihlKXtlP3QucmVzb2x2ZShjb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmJhZGdlLnNldChuLHIsbykpOnQucmVqZWN0KFwiWW91IGRvIG5vdCBoYXZlIHBlcm1pc3Npb24gdG8gc2V0IEJhZGdlXCIpfSksdC5wcm9taXNlfSxnZXQ6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24uYmFkZ2UuaGFzUGVybWlzc2lvbihmdW5jdGlvbihlKXtlP2NvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24uYmFkZ2UuZ2V0KGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0pOm4ucmVqZWN0KFwiWW91IGRvIG5vdCBoYXZlIHBlcm1pc3Npb24gdG8gZ2V0IEJhZGdlXCIpfSksbi5wcm9taXNlfSxjbGVhcjpmdW5jdGlvbihuLHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5iYWRnZS5oYXNQZXJtaXNzaW9uKGZ1bmN0aW9uKGUpe2U/by5yZXNvbHZlKGNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24uYmFkZ2UuY2xlYXIobixyKSk6by5yZWplY3QoXCJZb3UgZG8gbm90IGhhdmUgcGVybWlzc2lvbiB0byBjbGVhciBCYWRnZVwiKX0pLG8ucHJvbWlzZX0saW5jcmVhc2U6ZnVuY3Rpb24obixyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gdGhpcy5oYXNQZXJtaXNzaW9uKCkudGhlbihmdW5jdGlvbigpe3QucmVzb2x2ZShjb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmJhZGdlLmluY3JlYXNlKG4scixvKSl9LGZ1bmN0aW9uKCl7dC5yZWplY3QoXCJZb3UgZG8gbm90IGhhdmUgcGVybWlzc2lvbiB0byBpbmNyZWFzZSBCYWRnZVwiKX0pLHQucHJvbWlzZX0sZGVjcmVhc2U6ZnVuY3Rpb24obixyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gdGhpcy5oYXNQZXJtaXNzaW9uKCkudGhlbihmdW5jdGlvbigpe3QucmVzb2x2ZShjb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmJhZGdlLmRlY3JlYXNlKG4scixvKSl9LGZ1bmN0aW9uKCl7dC5yZWplY3QoXCJZb3UgZG8gbm90IGhhdmUgcGVybWlzc2lvbiB0byBkZWNyZWFzZSBCYWRnZVwiKX0pLHQucHJvbWlzZX0sY29uZmlndXJlOmZ1bmN0aW9uKGUpe3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmJhZGdlLmNvbmZpZ3VyZShlKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuYmFyY29kZVNjYW5uZXJcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQmFyY29kZVNjYW5uZXJcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntzY2FuOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLmJhcmNvZGVTY2FubmVyLnNjYW4oZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbiksci5wcm9taXNlfSxlbmNvZGU6ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG49bnx8XCJURVhUX1RZUEVcIixjb3Jkb3ZhLnBsdWdpbnMuYmFyY29kZVNjYW5uZXIuZW5jb2RlKG4scixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5iYXR0ZXJ5U3RhdHVzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUJhdHRlcnlTdGF0dXNcIixbXCIkcm9vdFNjb3BlXCIsXCIkd2luZG93XCIsXCIkdGltZW91dFwiLGZ1bmN0aW9uKGUsbixyKXt2YXIgbz1mdW5jdGlvbihuKXtyKGZ1bmN0aW9uKCl7ZS4kYnJvYWRjYXN0KFwiJGNvcmRvdmFCYXR0ZXJ5U3RhdHVzOnN0YXR1c1wiLG4pfSl9LHQ9ZnVuY3Rpb24obil7cihmdW5jdGlvbigpe2UuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhQmF0dGVyeVN0YXR1czpjcml0aWNhbFwiLG4pfSl9LGk9ZnVuY3Rpb24obil7cihmdW5jdGlvbigpe2UuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhQmF0dGVyeVN0YXR1czpsb3dcIixuKX0pfTtyZXR1cm4gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRldmljZXJlYWR5XCIsZnVuY3Rpb24oKXtuYXZpZ2F0b3IuYmF0dGVyeSYmKG4uYWRkRXZlbnRMaXN0ZW5lcihcImJhdHRlcnlzdGF0dXNcIixvLCExKSxuLmFkZEV2ZW50TGlzdGVuZXIoXCJiYXR0ZXJ5Y3JpdGljYWxcIix0LCExKSxuLmFkZEV2ZW50TGlzdGVuZXIoXCJiYXR0ZXJ5bG93XCIsaSwhMSkpfSwhMSksITB9XSkucnVuKFtcIiRpbmplY3RvclwiLGZ1bmN0aW9uKGUpe2UuZ2V0KFwiJGNvcmRvdmFCYXR0ZXJ5U3RhdHVzXCIpfV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuYmVhY29uXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUJlYWNvblwiLFtcIiR3aW5kb3dcIixcIiRyb290U2NvcGVcIixcIiR0aW1lb3V0XCIsXCIkcVwiLGZ1bmN0aW9uKGUsbixyLG8pe3ZhciB0PW51bGwsaT1udWxsLGE9bnVsbCxjPW51bGwsdT1udWxsLHM9bnVsbCxsPW51bGwsZj1udWxsO3JldHVybiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZGV2aWNlcmVhZHlcIixmdW5jdGlvbigpe2lmKGUuY29yZG92YSYmZS5jb3Jkb3ZhLnBsdWdpbnMmJmUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlcil7dmFyIG89bmV3IGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5EZWxlZ2F0ZTtvLmRpZERldGVybWluZVN0YXRlRm9yUmVnaW9uPWZ1bmN0aW9uKGUpe3IoZnVuY3Rpb24oKXtuLiRicm9hZGNhc3QoXCIkY29yZG92YUJlYWNvbjpkaWREZXRlcm1pbmVTdGF0ZUZvclJlZ2lvblwiLGUpfSksdCYmdChlKX0sby5kaWRTdGFydE1vbml0b3JpbmdGb3JSZWdpb249ZnVuY3Rpb24oZSl7cihmdW5jdGlvbigpe24uJGJyb2FkY2FzdChcIiRjb3Jkb3ZhQmVhY29uOmRpZFN0YXJ0TW9uaXRvcmluZ0ZvclJlZ2lvblwiLGUpfSksaSYmaShlKX0sby5kaWRFeGl0UmVnaW9uPWZ1bmN0aW9uKGUpe3IoZnVuY3Rpb24oKXtuLiRicm9hZGNhc3QoXCIkY29yZG92YUJlYWNvbjpkaWRFeGl0UmVnaW9uXCIsZSl9KSxhJiZhKGUpfSxvLmRpZEVudGVyUmVnaW9uPWZ1bmN0aW9uKGUpe3IoZnVuY3Rpb24oKXtuLiRicm9hZGNhc3QoXCIkY29yZG92YUJlYWNvbjpkaWRFbnRlclJlZ2lvblwiLGUpfSksYyYmYyhlKX0sby5kaWRSYW5nZUJlYWNvbnNJblJlZ2lvbj1mdW5jdGlvbihlKXtyKGZ1bmN0aW9uKCl7bi4kYnJvYWRjYXN0KFwiJGNvcmRvdmFCZWFjb246ZGlkUmFuZ2VCZWFjb25zSW5SZWdpb25cIixlKX0pLHUmJnUoZSl9LG8ucGVyaXBoZXJhbE1hbmFnZXJEaWRTdGFydEFkdmVydGlzaW5nPWZ1bmN0aW9uKGUpe3IoZnVuY3Rpb24oKXtuLiRicm9hZGNhc3QoXCIkY29yZG92YUJlYWNvbjpwZXJpcGhlcmFsTWFuYWdlckRpZFN0YXJ0QWR2ZXJ0aXNpbmdcIixlKX0pLHMmJnMoZSl9LG8ucGVyaXBoZXJhbE1hbmFnZXJEaWRVcGRhdGVTdGF0ZT1mdW5jdGlvbihlKXtyKGZ1bmN0aW9uKCl7bi4kYnJvYWRjYXN0KFwiJGNvcmRvdmFCZWFjb246cGVyaXBoZXJhbE1hbmFnZXJEaWRVcGRhdGVTdGF0ZVwiLGUpfSksbCYmbChlKX0sby5kaWRDaGFuZ2VBdXRob3JpemF0aW9uU3RhdHVzPWZ1bmN0aW9uKGUpe3IoZnVuY3Rpb24oKXtuLiRicm9hZGNhc3QoXCIkY29yZG92YUJlYWNvbjpkaWRDaGFuZ2VBdXRob3JpemF0aW9uU3RhdHVzXCIsZSl9KSxmJiZmKGUpfSxlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuc2V0RGVsZWdhdGUobyl9fSwhMSkse3NldENhbGxiYWNrRGlkRGV0ZXJtaW5lU3RhdGVGb3JSZWdpb246ZnVuY3Rpb24oZSl7dD1lfSxzZXRDYWxsYmFja0RpZFN0YXJ0TW9uaXRvcmluZ0ZvclJlZ2lvbjpmdW5jdGlvbihlKXtpPWV9LHNldENhbGxiYWNrRGlkRXhpdFJlZ2lvbjpmdW5jdGlvbihlKXthPWV9LHNldENhbGxiYWNrRGlkRW50ZXJSZWdpb246ZnVuY3Rpb24oZSl7Yz1lfSxzZXRDYWxsYmFja0RpZFJhbmdlQmVhY29uc0luUmVnaW9uOmZ1bmN0aW9uKGUpe3U9ZX0sc2V0Q2FsbGJhY2tQZXJpcGhlcmFsTWFuYWdlckRpZFN0YXJ0QWR2ZXJ0aXNpbmc6ZnVuY3Rpb24oZSl7cz1lfSxzZXRDYWxsYmFja1BlcmlwaGVyYWxNYW5hZ2VyRGlkVXBkYXRlU3RhdGU6ZnVuY3Rpb24oZSl7bD1lfSxzZXRDYWxsYmFja0RpZENoYW5nZUF1dGhvcml6YXRpb25TdGF0dXM6ZnVuY3Rpb24oZSl7Zj1lfSxjcmVhdGVCZWFjb25SZWdpb246ZnVuY3Rpb24obixyLG8sdCxpKXtyZXR1cm4gbz1vfHx2b2lkIDAsdD10fHx2b2lkIDAsbmV3IGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5CZWFjb25SZWdpb24obixyLG8sdCxpKX0saXNCbHVldG9vdGhFbmFibGVkOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuaXNCbHVldG9vdGhFbmFibGVkKCkpfSxlbmFibGVCbHVldG9vdGg6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5lbmFibGVCbHVldG9vdGgoKSl9LGRpc2FibGVCbHVldG9vdGg6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5kaXNhYmxlQmx1ZXRvb3RoKCkpfSxzdGFydE1vbml0b3JpbmdGb3JSZWdpb246ZnVuY3Rpb24obil7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuc3RhcnRNb25pdG9yaW5nRm9yUmVnaW9uKG4pKX0sc3RvcE1vbml0b3JpbmdGb3JSZWdpb246ZnVuY3Rpb24obil7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuc3RvcE1vbml0b3JpbmdGb3JSZWdpb24obikpfSxyZXF1ZXN0U3RhdGVGb3JSZWdpb246ZnVuY3Rpb24obil7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIucmVxdWVzdFN0YXRlRm9yUmVnaW9uKG4pKX0sc3RhcnRSYW5naW5nQmVhY29uc0luUmVnaW9uOmZ1bmN0aW9uKG4pe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLnN0YXJ0UmFuZ2luZ0JlYWNvbnNJblJlZ2lvbihuKSl9LHN0b3BSYW5naW5nQmVhY29uc0luUmVnaW9uOmZ1bmN0aW9uKG4pe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLnN0b3BSYW5naW5nQmVhY29uc0luUmVnaW9uKG4pKX0sZ2V0QXV0aG9yaXphdGlvblN0YXR1czpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmdldEF1dGhvcml6YXRpb25TdGF0dXMoKSl9LHJlcXVlc3RXaGVuSW5Vc2VBdXRob3JpemF0aW9uOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIucmVxdWVzdFdoZW5JblVzZUF1dGhvcml6YXRpb24oKSl9LHJlcXVlc3RBbHdheXNBdXRob3JpemF0aW9uOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIucmVxdWVzdEFsd2F5c0F1dGhvcml6YXRpb24oKSl9LGdldE1vbml0b3JlZFJlZ2lvbnM6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5nZXRNb25pdG9yZWRSZWdpb25zKCkpfSxnZXRSYW5nZWRSZWdpb25zOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuZ2V0UmFuZ2VkUmVnaW9ucygpKX0saXNSYW5naW5nQXZhaWxhYmxlOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuaXNSYW5naW5nQXZhaWxhYmxlKCkpfSxpc01vbml0b3JpbmdBdmFpbGFibGVGb3JDbGFzczpmdW5jdGlvbihuKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5pc01vbml0b3JpbmdBdmFpbGFibGVGb3JDbGFzcyhuKSl9LHN0YXJ0QWR2ZXJ0aXNpbmc6ZnVuY3Rpb24obixyKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5zdGFydEFkdmVydGlzaW5nKG4scikpfSxzdG9wQWR2ZXJ0aXNpbmc6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5zdG9wQWR2ZXJ0aXNpbmcoKSl9LGlzQWR2ZXJ0aXNpbmdBdmFpbGFibGU6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5pc0FkdmVydGlzaW5nQXZhaWxhYmxlKCkpfSxpc0FkdmVydGlzaW5nOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuaXNBZHZlcnRpc2luZygpKX0sZGlzYWJsZURlYnVnTG9nczpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmRpc2FibGVEZWJ1Z0xvZ3MoKSl9LGVuYWJsZURlYnVnTm90aWZpY2F0aW9uczpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmVuYWJsZURlYnVnTm90aWZpY2F0aW9ucygpKX0sZGlzYWJsZURlYnVnTm90aWZpY2F0aW9uczpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmRpc2FibGVEZWJ1Z05vdGlmaWNhdGlvbnMoKSl9LGVuYWJsZURlYnVnTG9nczpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmVuYWJsZURlYnVnTG9ncygpKX0sYXBwZW5kVG9EZXZpY2VMb2c6ZnVuY3Rpb24obil7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuYXBwZW5kVG9EZXZpY2VMb2cobikpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5ibGVcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQkxFXCIsW1wiJHFcIixcIiR0aW1lb3V0XCIsXCIkbG9nXCIsZnVuY3Rpb24oZSxuLHIpe3JldHVybntzY2FuOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBibGUuc3RhcnRTY2FuKHIsZnVuY3Rpb24oZSl7dC5ub3RpZnkoZSl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSksbihmdW5jdGlvbigpe2JsZS5zdG9wU2NhbihmdW5jdGlvbigpe3QucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0pfSwxZTMqbyksdC5wcm9taXNlfSxzdGFydFNjYW46ZnVuY3Rpb24oZSxuLHIpe3JldHVybiBibGUuc3RhcnRTY2FuKGUsbixyKX0sc3RvcFNjYW46ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGJsZS5zdG9wU2NhbihmdW5jdGlvbigpe24ucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sY29ubmVjdDpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGJsZS5jb25uZWN0KG4sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sZGlzY29ubmVjdDpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGJsZS5kaXNjb25uZWN0KG4sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0scmVhZDpmdW5jdGlvbihuLHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBibGUucmVhZChuLHIsbyxmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSksdC5wcm9taXNlfSx3cml0ZTpmdW5jdGlvbihuLHIsbyx0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIGJsZS53cml0ZShuLHIsbyx0LGZ1bmN0aW9uKGUpe2kucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7aS5yZWplY3QoZSl9KSxpLnByb21pc2V9LHdyaXRlV2l0aG91dFJlc3BvbnNlOmZ1bmN0aW9uKG4scixvLHQpe3ZhciBpPWUuZGVmZXIoKTtyZXR1cm4gYmxlLndyaXRlV2l0aG91dFJlc3BvbnNlKG4scixvLHQsZnVuY3Rpb24oZSl7aS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtpLnJlamVjdChlKX0pLGkucHJvbWlzZX0sd3JpdGVDb21tYW5kOmZ1bmN0aW9uKGUsbixvLHQpe3JldHVybiByLndhcm5pbmcoXCJ3cml0ZUNvbW1hbmQgaXMgZGVwcmVjYXRlZCwgdXNlIHdyaXRlV2l0aG91dFJlc3BvbnNlXCIpLHRoaXMud3JpdGVXaXRob3V0UmVzcG9uc2UoZSxuLG8sdCl9LHN0YXJ0Tm90aWZpY2F0aW9uOmZ1bmN0aW9uKGUsbixyLG8sdCl7cmV0dXJuIGJsZS5zdGFydE5vdGlmaWNhdGlvbihlLG4scixvLHQpfSxzdG9wTm90aWZpY2F0aW9uOmZ1bmN0aW9uKG4scixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIGJsZS5zdG9wTm90aWZpY2F0aW9uKG4scixvLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7dC5yZWplY3QoZSl9KSx0LnByb21pc2V9LGlzQ29ubmVjdGVkOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gYmxlLmlzQ29ubmVjdGVkKG4sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sZW5hYmxlOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBibGUuZW5hYmxlKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9LGlzRW5hYmxlZDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gYmxlLmlzRW5hYmxlZChmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5ibHVldG9vdGhTZXJpYWxcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQmx1ZXRvb3RoU2VyaWFsXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntjb25uZWN0OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKSx0PWUuZGVmZXIoKSxpPSExO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5jb25uZWN0KHIsZnVuY3Rpb24oKXtpPSEwLG8ucmVzb2x2ZSh0KX0sZnVuY3Rpb24oZSl7aT09PSExJiZ0LnJlamVjdChlKSxvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sY29ubmVjdEluc2VjdXJlOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwuY29ubmVjdEluc2VjdXJlKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGRpc2Nvbm5lY3Q6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLmRpc2Nvbm5lY3QoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LGxpc3Q6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLmxpc3QoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sZGlzY292ZXJVbnBhaXJlZDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwuZGlzY292ZXJVbnBhaXJlZChmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxzZXREZXZpY2VEaXNjb3ZlcmVkTGlzdGVuZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLnNldERldmljZURpc2NvdmVyZWRMaXN0ZW5lcihmdW5jdGlvbihlKXtyLm5vdGlmeShlKX0pLHIucHJvbWlzZX0sY2xlYXJEZXZpY2VEaXNjb3ZlcmVkTGlzdGVuZXI6ZnVuY3Rpb24oKXtuLmJsdWV0b290aFNlcmlhbC5jbGVhckRldmljZURpc2NvdmVyZWRMaXN0ZW5lcigpfSxzaG93Qmx1ZXRvb3RoU2V0dGluZ3M6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLnNob3dCbHVldG9vdGhTZXR0aW5ncyhmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0saXNFbmFibGVkOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5pc0VuYWJsZWQoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxlbmFibGU6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLmVuYWJsZShmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LGlzQ29ubmVjdGVkOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5pc0Nvbm5lY3RlZChmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LGF2YWlsYWJsZTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwuYXZhaWxhYmxlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHJlYWQ6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLnJlYWQoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0scmVhZFVudGlsOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwucmVhZFVudGlsKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sd3JpdGU6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC53cml0ZShyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxzdWJzY3JpYmU6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5zdWJzY3JpYmUocixmdW5jdGlvbihlKXtvLm5vdGlmeShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHN1YnNjcmliZVJhd0RhdGE6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLnN1YnNjcmliZVJhd0RhdGEoZnVuY3Rpb24oZSl7ci5ub3RpZnkoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSx1bnN1YnNjcmliZTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwudW5zdWJzY3JpYmUoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHVuc3Vic2NyaWJlUmF3RGF0YTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwudW5zdWJzY3JpYmVSYXdEYXRhKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxjbGVhcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwuY2xlYXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHJlYWRSU1NJOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5yZWFkUlNTSShmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5icmlnaHRuZXNzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUJyaWdodG5lc3NcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2dldDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5jb3Jkb3ZhP24uY29yZG92YS5wbHVnaW5zLmJyaWdodG5lc3MuZ2V0QnJpZ2h0bmVzcyhmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSk6ci5yZWplY3QoXCJOb3Qgc3VwcG9ydGVkIHdpdGhvdXQgY29yZG92YS5qc1wiKSxyLnByb21pc2V9LHNldDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uY29yZG92YT9uLmNvcmRvdmEucGx1Z2lucy5icmlnaHRuZXNzLnNldEJyaWdodG5lc3MocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSk6by5yZWplY3QoXCJOb3Qgc3VwcG9ydGVkIHdpdGhvdXQgY29yZG92YS5qc1wiKSxvLnByb21pc2V9LHNldEtlZXBTY3JlZW5PbjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uY29yZG92YT9uLmNvcmRvdmEucGx1Z2lucy5icmlnaHRuZXNzLnNldEtlZXBTY3JlZW5PbihyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KTpvLnJlamVjdChcIk5vdCBzdXBwb3J0ZWQgd2l0aG91dCBjb3Jkb3ZhLmpzXCIpLG8ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuY2FsZW5kYXJcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQ2FsZW5kYXJcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2NyZWF0ZUNhbGVuZGFyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKSx0PW4ucGx1Z2lucy5jYWxlbmRhci5nZXRDcmVhdGVDYWxlbmRhck9wdGlvbnMoKTtyZXR1cm5cInN0cmluZ1wiPT10eXBlb2Ygcj90LmNhbGVuZGFyTmFtZT1yOnQ9YW5ndWxhci5leHRlbmQodCxyKSxuLnBsdWdpbnMuY2FsZW5kYXIuY3JlYXRlQ2FsZW5kYXIodCxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxkZWxldGVDYWxlbmRhcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5jYWxlbmRhci5kZWxldGVDYWxlbmRhcihyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGNyZWF0ZUV2ZW50OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKSx0PXt0aXRsZTpudWxsLGxvY2F0aW9uOm51bGwsbm90ZXM6bnVsbCxzdGFydERhdGU6bnVsbCxlbmREYXRlOm51bGx9O3JldHVybiB0PWFuZ3VsYXIuZXh0ZW5kKHQsciksbi5wbHVnaW5zLmNhbGVuZGFyLmNyZWF0ZUV2ZW50KHQudGl0bGUsdC5sb2NhdGlvbix0Lm5vdGVzLG5ldyBEYXRlKHQuc3RhcnREYXRlKSxuZXcgRGF0ZSh0LmVuZERhdGUpLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGNyZWF0ZUV2ZW50V2l0aE9wdGlvbnM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpLHQ9W10saT13aW5kb3cucGx1Z2lucy5jYWxlbmRhci5nZXRDYWxlbmRhck9wdGlvbnMoKSxhPXt0aXRsZTpudWxsLGxvY2F0aW9uOm51bGwsbm90ZXM6bnVsbCxzdGFydERhdGU6bnVsbCxlbmREYXRlOm51bGx9O3Q9T2JqZWN0LmtleXMoYSk7Zm9yKHZhciBjIGluIHIpLTE9PT10LmluZGV4T2YoYyk/aVtjXT1yW2NdOmFbY109cltjXTtyZXR1cm4gbi5wbHVnaW5zLmNhbGVuZGFyLmNyZWF0ZUV2ZW50V2l0aE9wdGlvbnMoYS50aXRsZSxhLmxvY2F0aW9uLGEubm90ZXMsbmV3IERhdGUoYS5zdGFydERhdGUpLG5ldyBEYXRlKGEuZW5kRGF0ZSksaSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxjcmVhdGVFdmVudEludGVyYWN0aXZlbHk6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpLHQ9e3RpdGxlOm51bGwsbG9jYXRpb246bnVsbCxub3RlczpudWxsLHN0YXJ0RGF0ZTpudWxsLGVuZERhdGU6bnVsbH07cmV0dXJuIHQ9YW5ndWxhci5leHRlbmQodCxyKSxuLnBsdWdpbnMuY2FsZW5kYXIuY3JlYXRlRXZlbnRJbnRlcmFjdGl2ZWx5KHQudGl0bGUsdC5sb2NhdGlvbix0Lm5vdGVzLG5ldyBEYXRlKHQuc3RhcnREYXRlKSxuZXcgRGF0ZSh0LmVuZERhdGUpLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGNyZWF0ZUV2ZW50SW5OYW1lZENhbGVuZGFyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKSx0PXt0aXRsZTpudWxsLGxvY2F0aW9uOm51bGwsbm90ZXM6bnVsbCxzdGFydERhdGU6bnVsbCxlbmREYXRlOm51bGwsY2FsZW5kYXJOYW1lOm51bGx9O3JldHVybiB0PWFuZ3VsYXIuZXh0ZW5kKHQsciksbi5wbHVnaW5zLmNhbGVuZGFyLmNyZWF0ZUV2ZW50SW5OYW1lZENhbGVuZGFyKHQudGl0bGUsdC5sb2NhdGlvbix0Lm5vdGVzLG5ldyBEYXRlKHQuc3RhcnREYXRlKSxuZXcgRGF0ZSh0LmVuZERhdGUpLHQuY2FsZW5kYXJOYW1lLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGZpbmRFdmVudDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCksdD17dGl0bGU6bnVsbCxsb2NhdGlvbjpudWxsLG5vdGVzOm51bGwsc3RhcnREYXRlOm51bGwsZW5kRGF0ZTpudWxsfTtyZXR1cm4gdD1hbmd1bGFyLmV4dGVuZCh0LHIpLG4ucGx1Z2lucy5jYWxlbmRhci5maW5kRXZlbnQodC50aXRsZSx0LmxvY2F0aW9uLHQubm90ZXMsbmV3IERhdGUodC5zdGFydERhdGUpLG5ldyBEYXRlKHQuZW5kRGF0ZSksZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sbGlzdEV2ZW50c0luUmFuZ2U6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5jYWxlbmRhci5saXN0RXZlbnRzSW5SYW5nZShyLG8sZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0pLHQucHJvbWlzZX0sbGlzdENhbGVuZGFyczpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmNhbGVuZGFyLmxpc3RDYWxlbmRhcnMoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sZmluZEFsbEV2ZW50c0luTmFtZWRDYWxlbmRhcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5jYWxlbmRhci5maW5kQWxsRXZlbnRzSW5OYW1lZENhbGVuZGFyKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sbW9kaWZ5RXZlbnQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpLHQ9e3RpdGxlOm51bGwsbG9jYXRpb246bnVsbCxub3RlczpudWxsLHN0YXJ0RGF0ZTpudWxsLGVuZERhdGU6bnVsbCxuZXdUaXRsZTpudWxsLG5ld0xvY2F0aW9uOm51bGwsbmV3Tm90ZXM6bnVsbCxuZXdTdGFydERhdGU6bnVsbCxuZXdFbmREYXRlOm51bGx9O3JldHVybiB0PWFuZ3VsYXIuZXh0ZW5kKHQsciksbi5wbHVnaW5zLmNhbGVuZGFyLm1vZGlmeUV2ZW50KHQudGl0bGUsdC5sb2NhdGlvbix0Lm5vdGVzLG5ldyBEYXRlKHQuc3RhcnREYXRlKSxuZXcgRGF0ZSh0LmVuZERhdGUpLHQubmV3VGl0bGUsdC5uZXdMb2NhdGlvbix0Lm5ld05vdGVzLG5ldyBEYXRlKHQubmV3U3RhcnREYXRlKSxuZXcgRGF0ZSh0Lm5ld0VuZERhdGUpLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGRlbGV0ZUV2ZW50OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKSx0PXtuZXdUaXRsZTpudWxsLGxvY2F0aW9uOm51bGwsbm90ZXM6bnVsbCxzdGFydERhdGU6bnVsbCxlbmREYXRlOm51bGx9O3JldHVybiB0PWFuZ3VsYXIuZXh0ZW5kKHQsciksbi5wbHVnaW5zLmNhbGVuZGFyLmRlbGV0ZUV2ZW50KHQubmV3VGl0bGUsdC5sb2NhdGlvbix0Lm5vdGVzLG5ldyBEYXRlKHQuc3RhcnREYXRlKSxuZXcgRGF0ZSh0LmVuZERhdGUpLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmNhbWVyYVwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFDYW1lcmFcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntnZXRQaWN0dXJlOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmNhbWVyYT8obmF2aWdhdG9yLmNhbWVyYS5nZXRQaWN0dXJlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LG4pLHIucHJvbWlzZSk6KHIucmVzb2x2ZShudWxsKSxyLnByb21pc2UpfSxjbGVhbnVwOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuY2FtZXJhLmNsZWFudXAoZnVuY3Rpb24oKXtuLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmNhcHR1cmVcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQ2FwdHVyZVwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2NhcHR1cmVBdWRpbzpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5kZXZpY2UuY2FwdHVyZT8obmF2aWdhdG9yLmRldmljZS5jYXB0dXJlLmNhcHR1cmVBdWRpbyhmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKSxyLnByb21pc2UpOihyLnJlc29sdmUobnVsbCksci5wcm9taXNlKX0sY2FwdHVyZUltYWdlOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmRldmljZS5jYXB0dXJlPyhuYXZpZ2F0b3IuZGV2aWNlLmNhcHR1cmUuY2FwdHVyZUltYWdlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LG4pLHIucHJvbWlzZSk6KHIucmVzb2x2ZShudWxsKSxyLnByb21pc2UpfSxjYXB0dXJlVmlkZW86ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZGV2aWNlLmNhcHR1cmU/KG5hdmlnYXRvci5kZXZpY2UuY2FwdHVyZS5jYXB0dXJlVmlkZW8oZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbiksci5wcm9taXNlKTooci5yZXNvbHZlKG51bGwpLHIucHJvbWlzZSl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmNhcmRJT1wiLFtdKS5wcm92aWRlcihcIiRjb3Jkb3ZhTmdDYXJkSU9cIixbZnVuY3Rpb24oKXt2YXIgZT1bXCJjYXJkX3R5cGVcIixcInJlZGFjdGVkX2NhcmRfbnVtYmVyXCIsXCJjYXJkX251bWJlclwiLFwiZXhwaXJ5X21vbnRoXCIsXCJleHBpcnlfeWVhclwiLFwic2hvcnRfZXhwaXJ5X3llYXJcIixcImN2dlwiLFwiemlwXCJdLG49e2V4cGlyeTohMCxjdnY6ITAsemlwOiExLHN1cHByZXNzTWFudWFsOiExLHN1cHByZXNzQ29uZmlybTohMSxoaWRlTG9nbzohMH07dGhpcy5zZXRDYXJkSU9SZXNwb25zZUZpZWxkcz1mdW5jdGlvbihuKXtuJiZhbmd1bGFyLmlzQXJyYXkobikmJihlPW4pfSx0aGlzLnNldFNjYW5lckNvbmZpZz1mdW5jdGlvbihlKXtlJiZhbmd1bGFyLmlzT2JqZWN0KGUpJiYobi5leHBpcnk9ZS5leHBpcnl8fCEwLG4uY3Z2PWUuY3Z2fHwhMCxuLnppcD1lLnppcHx8ITEsbi5zdXBwcmVzc01hbnVhbD1lLnN1cHByZXNzTWFudWFsfHwhMSxuLnN1cHByZXNzQ29uZmlybT1lLnN1cHByZXNzQ29uZmlybXx8ITEsbi5oaWRlTG9nbz1lLmhpZGVMb2dvfHwhMCl9LHRoaXMuJGdldD1bXCIkcVwiLGZ1bmN0aW9uKHIpe3JldHVybntzY2FuQ2FyZDpmdW5jdGlvbigpe3ZhciBvPXIuZGVmZXIoKTtyZXR1cm4gQ2FyZElPLnNjYW4obixmdW5jdGlvbihuKXtpZihudWxsPT09bilvLnJlamVjdChudWxsKTtlbHNle2Zvcih2YXIgcj17fSx0PTAsaT1lLmxlbmd0aDtpPnQ7dCsrKXt2YXIgYT1lW3RdO1wic2hvcnRfZXhwaXJ5X3llYXJcIj09PWE/clthXT1TdHJpbmcobi5leHBpcnlfeWVhcikuc3Vic3RyKDIsMil8fFwiXCI6clthXT1uW2FdfHxcIlwifW8ucmVzb2x2ZShyKX19LGZ1bmN0aW9uKCl7by5yZWplY3QobnVsbCl9KSxvLnByb21pc2V9fX1dfV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuY2xpcGJvYXJkXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUNsaXBib2FyZFwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57Y29weTpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uY29yZG92YS5wbHVnaW5zLmNsaXBib2FyZC5jb3B5KHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxwYXN0ZTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5jb3Jkb3ZhLnBsdWdpbnMuY2xpcGJvYXJkLnBhc3RlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5jb250YWN0c1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFDb250YWN0c1wiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue3NhdmU6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpLG89bmF2aWdhdG9yLmNvbnRhY3RzLmNyZWF0ZShuKTtyZXR1cm4gby5zYXZlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHJlbW92ZTpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCksbz1uYXZpZ2F0b3IuY29udGFjdHMuY3JlYXRlKG4pO3JldHVybiBvLnJlbW92ZShmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxjbG9uZTpmdW5jdGlvbihlKXt2YXIgbj1uYXZpZ2F0b3IuY29udGFjdHMuY3JlYXRlKGUpO3JldHVybiBuLmNsb25lKGUpfSxmaW5kOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKSxvPW4uZmllbGRzfHxbXCJpZFwiLFwiZGlzcGxheU5hbWVcIl07cmV0dXJuIGRlbGV0ZSBuLmZpZWxkcywwPT09T2JqZWN0LmtleXMobikubGVuZ3RoP25hdmlnYXRvci5jb250YWN0cy5maW5kKG8sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pOm5hdmlnYXRvci5jb250YWN0cy5maW5kKG8sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbiksci5wcm9taXNlfSxwaWNrQ29udGFjdDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmNvbnRhY3RzLnBpY2tDb250YWN0KGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmRhdGVQaWNrZXJcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhRGF0ZVBpY2tlclwiLFtcIiR3aW5kb3dcIixcIiRxXCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57c2hvdzpmdW5jdGlvbihyKXt2YXIgbz1uLmRlZmVyKCk7cmV0dXJuIHI9cnx8e2RhdGU6bmV3IERhdGUsbW9kZTpcImRhdGVcIn0sZS5kYXRlUGlja2VyLnNob3cocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5kZXZpY2VcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhRGV2aWNlXCIsW2Z1bmN0aW9uKCl7cmV0dXJue2dldERldmljZTpmdW5jdGlvbigpe3JldHVybiBkZXZpY2V9LGdldENvcmRvdmE6ZnVuY3Rpb24oKXtyZXR1cm4gZGV2aWNlLmNvcmRvdmF9LGdldE1vZGVsOmZ1bmN0aW9uKCl7cmV0dXJuIGRldmljZS5tb2RlbH0sZ2V0TmFtZTpmdW5jdGlvbigpe3JldHVybiBkZXZpY2UubmFtZX0sZ2V0UGxhdGZvcm06ZnVuY3Rpb24oKXtyZXR1cm4gZGV2aWNlLnBsYXRmb3JtfSxnZXRVVUlEOmZ1bmN0aW9uKCl7cmV0dXJuIGRldmljZS51dWlkfSxnZXRWZXJzaW9uOmZ1bmN0aW9uKCl7cmV0dXJuIGRldmljZS52ZXJzaW9ufSxnZXRNYW51ZmFjdHVyZXI6ZnVuY3Rpb24oKXtyZXR1cm4gZGV2aWNlLm1hbnVmYWN0dXJlcn19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZGV2aWNlTW90aW9uXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YURldmljZU1vdGlvblwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2dldEN1cnJlbnRBY2NlbGVyYXRpb246ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGFuZ3VsYXIuaXNVbmRlZmluZWQobmF2aWdhdG9yLmFjY2VsZXJvbWV0ZXIpfHwhYW5ndWxhci5pc0Z1bmN0aW9uKG5hdmlnYXRvci5hY2NlbGVyb21ldGVyLmdldEN1cnJlbnRBY2NlbGVyYXRpb24pPyhuLnJlamVjdChcIkRldmljZSBkbyBub3Qgc3VwcG9ydCB3YXRjaEFjY2VsZXJhdGlvblwiKSxuLnByb21pc2UpOihuYXZpZ2F0b3IuYWNjZWxlcm9tZXRlci5nZXRDdXJyZW50QWNjZWxlcmF0aW9uKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2UpfSx3YXRjaEFjY2VsZXJhdGlvbjpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7aWYoYW5ndWxhci5pc1VuZGVmaW5lZChuYXZpZ2F0b3IuYWNjZWxlcm9tZXRlcil8fCFhbmd1bGFyLmlzRnVuY3Rpb24obmF2aWdhdG9yLmFjY2VsZXJvbWV0ZXIud2F0Y2hBY2NlbGVyYXRpb24pKXJldHVybiByLnJlamVjdChcIkRldmljZSBkbyBub3Qgc3VwcG9ydCB3YXRjaEFjY2VsZXJhdGlvblwiKSxyLnByb21pc2U7dmFyIG89bmF2aWdhdG9yLmFjY2VsZXJvbWV0ZXIud2F0Y2hBY2NlbGVyYXRpb24oZnVuY3Rpb24oZSl7ci5ub3RpZnkoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKTtyZXR1cm4gci5wcm9taXNlLmNhbmNlbD1mdW5jdGlvbigpe25hdmlnYXRvci5hY2NlbGVyb21ldGVyLmNsZWFyV2F0Y2gobyl9LHIucHJvbWlzZS5jbGVhcldhdGNoPWZ1bmN0aW9uKGUpe25hdmlnYXRvci5hY2NlbGVyb21ldGVyLmNsZWFyV2F0Y2goZXx8byl9LHIucHJvbWlzZS53YXRjaElEPW8sci5wcm9taXNlfSxjbGVhcldhdGNoOmZ1bmN0aW9uKGUpe3JldHVybiBuYXZpZ2F0b3IuYWNjZWxlcm9tZXRlci5jbGVhcldhdGNoKGUpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5kZXZpY2VPcmllbnRhdGlvblwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFEZXZpY2VPcmllbnRhdGlvblwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7dmFyIG49e2ZyZXF1ZW5jeTozZTN9O3JldHVybntnZXRDdXJyZW50SGVhZGluZzpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmNvbXBhc3M/KG5hdmlnYXRvci5jb21wYXNzLmdldEN1cnJlbnRIZWFkaW5nKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2UpOihuLnJlamVjdChcIk5vIGNvbXBhc3Mgb24gRGV2aWNlXCIpLG4ucHJvbWlzZSl9LHdhdGNoSGVhZGluZzpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7aWYoIW5hdmlnYXRvci5jb21wYXNzKXJldHVybiBvLnJlamVjdChcIk5vIGNvbXBhc3Mgb24gRGV2aWNlXCIpLG8ucHJvbWlzZTt2YXIgdD1hbmd1bGFyLmV4dGVuZChuLHIpLGk9bmF2aWdhdG9yLmNvbXBhc3Mud2F0Y2hIZWFkaW5nKGZ1bmN0aW9uKGUpe28ubm90aWZ5KGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0sdCk7cmV0dXJuIG8ucHJvbWlzZS5jYW5jZWw9ZnVuY3Rpb24oKXtuYXZpZ2F0b3IuY29tcGFzcy5jbGVhcldhdGNoKGkpfSxvLnByb21pc2UuY2xlYXJXYXRjaD1mdW5jdGlvbihlKXtuYXZpZ2F0b3IuY29tcGFzcy5jbGVhcldhdGNoKGV8fGkpfSxvLnByb21pc2Uud2F0Y2hJRD1pLG8ucHJvbWlzZX0sY2xlYXJXYXRjaDpmdW5jdGlvbihlKXtyZXR1cm4gbmF2aWdhdG9yLmNvbXBhc3MuY2xlYXJXYXRjaChlKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZGlhbG9nc1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFEaWFsb2dzXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybnthbGVydDpmdW5jdGlvbihyLG8sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiBuLm5hdmlnYXRvci5ub3RpZmljYXRpb24/bmF2aWdhdG9yLm5vdGlmaWNhdGlvbi5hbGVydChyLGZ1bmN0aW9uKCl7aS5yZXNvbHZlKCl9LG8sdCk6KG4uYWxlcnQociksaS5yZXNvbHZlKCkpLGkucHJvbWlzZX0sY29uZmlybTpmdW5jdGlvbihyLG8sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiBuLm5hdmlnYXRvci5ub3RpZmljYXRpb24/bmF2aWdhdG9yLm5vdGlmaWNhdGlvbi5jb25maXJtKHIsZnVuY3Rpb24oZSl7aS5yZXNvbHZlKGUpfSxvLHQpOm4uY29uZmlybShyKT9pLnJlc29sdmUoMSk6aS5yZXNvbHZlKDIpLGkucHJvbWlzZX0scHJvbXB0OmZ1bmN0aW9uKHIsbyx0LGkpe3ZhciBhPWUuZGVmZXIoKTtpZihuLm5hdmlnYXRvci5ub3RpZmljYXRpb24pbmF2aWdhdG9yLm5vdGlmaWNhdGlvbi5wcm9tcHQocixmdW5jdGlvbihlKXthLnJlc29sdmUoZSl9LG8sdCxpKTtlbHNle3ZhciBjPW4ucHJvbXB0KHIsaSk7bnVsbCE9PWM/YS5yZXNvbHZlKHtpbnB1dDE6YyxidXR0b25JbmRleDoxfSk6YS5yZXNvbHZlKHtpbnB1dDE6YyxidXR0b25JbmRleDoyfSl9cmV0dXJuIGEucHJvbWlzZX0sYmVlcDpmdW5jdGlvbihlKXtyZXR1cm4gbmF2aWdhdG9yLm5vdGlmaWNhdGlvbi5iZWVwKGUpfSxhY3Rpdml0eVN0YXJ0OmZ1bmN0aW9uKG4scil7dmFyIG89ZS5kZWZlcigpO3JldHVyblwiYW5kcm9pZFwiPT09Y29yZG92YS5wbGF0Zm9ybUlkPyhuYXZpZ2F0b3Iubm90aWZpY2F0aW9uLmFjdGl2aXR5U3RhcnQocixuKSxvLnJlc29sdmUoKSk6by5yZWplY3QobixyKSxvLnByb21pc2V9LGFjdGl2aXR5U3RvcDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm5cImFuZHJvaWRcIj09PWNvcmRvdmEucGxhdGZvcm1JZD8obmF2aWdhdG9yLm5vdGlmaWNhdGlvbi5hY3Rpdml0eVN0b3AoKSxuLnJlc29sdmUoKSk6bi5yZWplY3QoKSxuLnByb21pc2V9LHByb2dyZXNzU3RhcnQ6ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuXCJhbmRyb2lkXCI9PT1jb3Jkb3ZhLnBsYXRmb3JtSWQ/KG5hdmlnYXRvci5ub3RpZmljYXRpb24ucHJvZ3Jlc3NTdGFydChyLG4pLG8ucmVzb2x2ZSgpKTpvLnJlamVjdChuLHIpLG8ucHJvbWlzZX0scHJvZ3Jlc3NTdG9wOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVyblwiYW5kcm9pZFwiPT09Y29yZG92YS5wbGF0Zm9ybUlkPyhuYXZpZ2F0b3Iubm90aWZpY2F0aW9uLnByb2dyZXNzU3RvcCgpLG4ucmVzb2x2ZSgpKTpuLnJlamVjdCgpLG4ucHJvbWlzZX0scHJvZ3Jlc3NWYWx1ZTpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuXCJhbmRyb2lkXCI9PT1jb3Jkb3ZhLnBsYXRmb3JtSWQ/KG5hdmlnYXRvci5ub3RpZmljYXRpb24ucHJvZ3Jlc3NWYWx1ZShuKSxyLnJlc29sdmUoKSk6ci5yZWplY3Qobiksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5lbWFpbENvbXBvc2VyXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUVtYWlsQ29tcG9zZXJcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntpc0F2YWlsYWJsZTpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLmVtYWlsLmlzQXZhaWxhYmxlKGZ1bmN0aW9uKGUpe2U/bi5yZXNvbHZlKCk6bi5yZWplY3QoKX0pLG4ucHJvbWlzZX0sb3BlbjpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5lbWFpbC5vcGVuKG4sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxhZGRBbGlhczpmdW5jdGlvbihlLG4pe2NvcmRvdmEucGx1Z2lucy5lbWFpbC5hZGRBbGlhcyhlLG4pfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5mYWNlYm9va1wiLFtdKS5wcm92aWRlcihcIiRjb3Jkb3ZhRmFjZWJvb2tcIixbZnVuY3Rpb24oKXt0aGlzLmJyb3dzZXJJbml0PWZ1bmN0aW9uKGUsbil7dGhpcy5hcHBJRD1lLHRoaXMuYXBwVmVyc2lvbj1ufHxcInYyLjBcIixmYWNlYm9va0Nvbm5lY3RQbHVnaW4uYnJvd3NlckluaXQodGhpcy5hcHBJRCx0aGlzLmFwcFZlcnNpb24pfSx0aGlzLiRnZXQ9W1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57bG9naW46ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBmYWNlYm9va0Nvbm5lY3RQbHVnaW4ubG9naW4obixmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxzaG93RGlhbG9nOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gZmFjZWJvb2tDb25uZWN0UGx1Z2luLnNob3dEaWFsb2cobixmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxhcGk6ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIGZhY2Vib29rQ29ubmVjdFBsdWdpbi5hcGkobixyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGdldEFjY2Vzc1Rva2VuOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBmYWNlYm9va0Nvbm5lY3RQbHVnaW4uZ2V0QWNjZXNzVG9rZW4oZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sZ2V0TG9naW5TdGF0dXM6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGZhY2Vib29rQ29ubmVjdFBsdWdpbi5nZXRMb2dpblN0YXR1cyhmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxsb2dvdXQ6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGZhY2Vib29rQ29ubmVjdFBsdWdpbi5sb2dvdXQoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX19fV19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5mYWNlYm9va0Fkc1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFGYWNlYm9va0Fkc1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57c2V0T3B0aW9uczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uRmFjZWJvb2tBZHMuc2V0T3B0aW9ucyhyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sY3JlYXRlQmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5GYWNlYm9va0Fkcy5jcmVhdGVCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHJlbW92ZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5GYWNlYm9va0Fkcy5yZW1vdmVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxzaG93QmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5GYWNlYm9va0Fkcy5zaG93QmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93QmFubmVyQXRYWTpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi5GYWNlYm9va0Fkcy5zaG93QmFubmVyQXRYWShyLG8sZnVuY3Rpb24oKXt0LnJlc29sdmUoKX0sZnVuY3Rpb24oKXt0LnJlamVjdCgpfSksdC5wcm9taXNlfSxoaWRlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLkZhY2Vib29rQWRzLmhpZGVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxwcmVwYXJlSW50ZXJzdGl0aWFsOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5GYWNlYm9va0Fkcy5wcmVwYXJlSW50ZXJzdGl0aWFsKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93SW50ZXJzdGl0aWFsOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLkZhY2Vib29rQWRzLnNob3dJbnRlcnN0aXRpYWwoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtcbnIucmVqZWN0KCl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmZpbGVcIixbXSkuY29uc3RhbnQoXCIkY29yZG92YUZpbGVFcnJvclwiLHsxOlwiTk9UX0ZPVU5EX0VSUlwiLDI6XCJTRUNVUklUWV9FUlJcIiwzOlwiQUJPUlRfRVJSXCIsNDpcIk5PVF9SRUFEQUJMRV9FUlJcIiw1OlwiRU5DT0RJTkdfRVJSXCIsNjpcIk5PX01PRElGSUNBVElPTl9BTExPV0VEX0VSUlwiLDc6XCJJTlZBTElEX1NUQVRFX0VSUlwiLDg6XCJTWU5UQVhfRVJSXCIsOTpcIklOVkFMSURfTU9ESUZJQ0FUSU9OX0VSUlwiLDEwOlwiUVVPVEFfRVhDRUVERURfRVJSXCIsMTE6XCJUWVBFX01JU01BVENIX0VSUlwiLDEyOlwiUEFUSF9FWElTVFNfRVJSXCJ9KS5wcm92aWRlcihcIiRjb3Jkb3ZhRmlsZVwiLFtmdW5jdGlvbigpe3RoaXMuJGdldD1bXCIkcVwiLFwiJHdpbmRvd1wiLFwiJGNvcmRvdmFGaWxlRXJyb3JcIixmdW5jdGlvbihlLG4scil7cmV0dXJue2dldEZyZWVEaXNrU3BhY2U6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEuZXhlYyhmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSxcIkZpbGVcIixcImdldEZyZWVEaXNrU3BhY2VcIixbXSksbi5wcm9taXNlfSxjaGVja0RpcjpmdW5jdGlvbihvLHQpe3ZhciBpPWUuZGVmZXIoKTsvXlxcLy8udGVzdCh0KSYmaS5yZWplY3QoXCJkaXJlY3RvcnkgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7dmFyIGE9byt0O24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChhLGZ1bmN0aW9uKGUpe2UuaXNEaXJlY3Rvcnk9PT0hMD9pLnJlc29sdmUoZSk6aS5yZWplY3Qoe2NvZGU6MTMsbWVzc2FnZTpcImlucHV0IGlzIG5vdCBhIGRpcmVjdG9yeVwifSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX1jYXRjaChjKXtjLm1lc3NhZ2U9cltjLmNvZGVdLGkucmVqZWN0KGMpfXJldHVybiBpLnByb21pc2V9LGNoZWNrRmlsZTpmdW5jdGlvbihvLHQpe3ZhciBpPWUuZGVmZXIoKTsvXlxcLy8udGVzdCh0KSYmaS5yZWplY3QoXCJkaXJlY3RvcnkgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7dmFyIGE9byt0O24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChhLGZ1bmN0aW9uKGUpe2UuaXNGaWxlPT09ITA/aS5yZXNvbHZlKGUpOmkucmVqZWN0KHtjb2RlOjEzLG1lc3NhZ2U6XCJpbnB1dCBpcyBub3QgYSBmaWxlXCJ9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfWNhdGNoKGMpe2MubWVzc2FnZT1yW2MuY29kZV0saS5yZWplY3QoYyl9cmV0dXJuIGkucHJvbWlzZX0sY3JlYXRlRGlyOmZ1bmN0aW9uKG8sdCxpKXt2YXIgYT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmEucmVqZWN0KFwiZGlyZWN0b3J5IGNhbm5vdCBzdGFydCB3aXRoIC9cIiksaT1pPyExOiEwO3ZhciBjPXtjcmVhdGU6ITAsZXhjbHVzaXZlOml9O3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwobyxmdW5jdGlvbihlKXtlLmdldERpcmVjdG9yeSh0LGMsZnVuY3Rpb24oZSl7YS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGEucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYS5yZWplY3QoZSl9KX1jYXRjaCh1KXt1Lm1lc3NhZ2U9clt1LmNvZGVdLGEucmVqZWN0KHUpfXJldHVybiBhLnByb21pc2V9LGNyZWF0ZUZpbGU6ZnVuY3Rpb24obyx0LGkpe3ZhciBhPWUuZGVmZXIoKTsvXlxcLy8udGVzdCh0KSYmYS5yZWplY3QoXCJmaWxlLW5hbWUgY2Fubm90IHN0YXJ0IHdpdGggL1wiKSxpPWk/ITE6ITA7dmFyIGM9e2NyZWF0ZTohMCxleGNsdXNpdmU6aX07dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChvLGZ1bmN0aW9uKGUpe2UuZ2V0RmlsZSh0LGMsZnVuY3Rpb24oZSl7YS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGEucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYS5yZWplY3QoZSl9KX1jYXRjaCh1KXt1Lm1lc3NhZ2U9clt1LmNvZGVdLGEucmVqZWN0KHUpfXJldHVybiBhLnByb21pc2V9LHJlbW92ZURpcjpmdW5jdGlvbihvLHQpe3ZhciBpPWUuZGVmZXIoKTsvXlxcLy8udGVzdCh0KSYmaS5yZWplY3QoXCJmaWxlLW5hbWUgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKG8sZnVuY3Rpb24oZSl7ZS5nZXREaXJlY3RvcnkodCx7Y3JlYXRlOiExfSxmdW5jdGlvbihlKXtlLnJlbW92ZShmdW5jdGlvbigpe2kucmVzb2x2ZSh7c3VjY2VzczohMCxmaWxlUmVtb3ZlZDplfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9Y2F0Y2goYSl7YS5tZXNzYWdlPXJbYS5jb2RlXSxpLnJlamVjdChhKX1yZXR1cm4gaS5wcm9taXNlfSxyZW1vdmVGaWxlOmZ1bmN0aW9uKG8sdCl7dmFyIGk9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZpLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwobyxmdW5jdGlvbihlKXtlLmdldEZpbGUodCx7Y3JlYXRlOiExfSxmdW5jdGlvbihlKXtlLnJlbW92ZShmdW5jdGlvbigpe2kucmVzb2x2ZSh7c3VjY2VzczohMCxmaWxlUmVtb3ZlZDplfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9Y2F0Y2goYSl7YS5tZXNzYWdlPXJbYS5jb2RlXSxpLnJlamVjdChhKX1yZXR1cm4gaS5wcm9taXNlfSxyZW1vdmVSZWN1cnNpdmVseTpmdW5jdGlvbihvLHQpe3ZhciBpPWUuZGVmZXIoKTsvXlxcLy8udGVzdCh0KSYmaS5yZWplY3QoXCJmaWxlLW5hbWUgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKG8sZnVuY3Rpb24oZSl7ZS5nZXREaXJlY3RvcnkodCx7Y3JlYXRlOiExfSxmdW5jdGlvbihlKXtlLnJlbW92ZVJlY3Vyc2l2ZWx5KGZ1bmN0aW9uKCl7aS5yZXNvbHZlKHtzdWNjZXNzOiEwLGZpbGVSZW1vdmVkOmV9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX1jYXRjaChhKXthLm1lc3NhZ2U9clthLmNvZGVdLGkucmVqZWN0KGEpfXJldHVybiBpLnByb21pc2V9LHdyaXRlRmlsZTpmdW5jdGlvbihvLHQsaSxhKXt2YXIgYz1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmMucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIiksYT1hPyExOiEwO3ZhciB1PXtjcmVhdGU6ITAsZXhjbHVzaXZlOmF9O3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwobyxmdW5jdGlvbihlKXtlLmdldEZpbGUodCx1LGZ1bmN0aW9uKGUpe2UuY3JlYXRlV3JpdGVyKGZ1bmN0aW9uKGUpe3UuYXBwZW5kPT09ITAmJmUuc2VlayhlLmxlbmd0aCksdS50cnVuY2F0ZSYmZS50cnVuY2F0ZSh1LnRydW5jYXRlKSxlLm9ud3JpdGVlbmQ9ZnVuY3Rpb24oZSl7dGhpcy5lcnJvcj9jLnJlamVjdCh0aGlzLmVycm9yKTpjLnJlc29sdmUoZSl9LGUud3JpdGUoaSksYy5wcm9taXNlLmFib3J0PWZ1bmN0aW9uKCl7ZS5hYm9ydCgpfX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGMucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYy5yZWplY3QoZSl9KX1jYXRjaChzKXtzLm1lc3NhZ2U9cltzLmNvZGVdLGMucmVqZWN0KHMpfXJldHVybiBjLnByb21pc2V9LHdyaXRlRXhpc3RpbmdGaWxlOmZ1bmN0aW9uKG8sdCxpKXt2YXIgYT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmEucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChvLGZ1bmN0aW9uKGUpe2UuZ2V0RmlsZSh0LHtjcmVhdGU6ITF9LGZ1bmN0aW9uKGUpe2UuY3JlYXRlV3JpdGVyKGZ1bmN0aW9uKGUpe2Uuc2VlayhlLmxlbmd0aCksZS5vbndyaXRlZW5kPWZ1bmN0aW9uKGUpe3RoaXMuZXJyb3I/YS5yZWplY3QodGhpcy5lcnJvcik6YS5yZXNvbHZlKGUpfSxlLndyaXRlKGkpLGEucHJvbWlzZS5hYm9ydD1mdW5jdGlvbigpe2UuYWJvcnQoKX19KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxhLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGEucmVqZWN0KGUpfSl9Y2F0Y2goYyl7Yy5tZXNzYWdlPXJbYy5jb2RlXSxhLnJlamVjdChjKX1yZXR1cm4gYS5wcm9taXNlfSxyZWFkQXNUZXh0OmZ1bmN0aW9uKG8sdCl7dmFyIGk9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZpLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwobyxmdW5jdGlvbihlKXtlLmdldEZpbGUodCx7Y3JlYXRlOiExfSxmdW5jdGlvbihlKXtlLmZpbGUoZnVuY3Rpb24oZSl7dmFyIG49bmV3IEZpbGVSZWFkZXI7bi5vbmxvYWRlbmQ9ZnVuY3Rpb24oZSl7dm9pZCAwIT09ZS50YXJnZXQucmVzdWx0fHxudWxsIT09ZS50YXJnZXQucmVzdWx0P2kucmVzb2x2ZShlLnRhcmdldC5yZXN1bHQpOnZvaWQgMCE9PWUudGFyZ2V0LmVycm9yfHxudWxsIT09ZS50YXJnZXQuZXJyb3I/aS5yZWplY3QoZS50YXJnZXQuZXJyb3IpOmkucmVqZWN0KHtjb2RlOm51bGwsbWVzc2FnZTpcIlJFQURFUl9PTkxPQURFTkRfRVJSXCJ9KX0sbi5yZWFkQXNUZXh0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfWNhdGNoKGEpe2EubWVzc2FnZT1yW2EuY29kZV0saS5yZWplY3QoYSl9cmV0dXJuIGkucHJvbWlzZX0scmVhZEFzRGF0YVVSTDpmdW5jdGlvbihvLHQpe3ZhciBpPWUuZGVmZXIoKTsvXlxcLy8udGVzdCh0KSYmaS5yZWplY3QoXCJmaWxlLW5hbWUgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKG8sZnVuY3Rpb24oZSl7ZS5nZXRGaWxlKHQse2NyZWF0ZTohMX0sZnVuY3Rpb24oZSl7ZS5maWxlKGZ1bmN0aW9uKGUpe3ZhciBuPW5ldyBGaWxlUmVhZGVyO24ub25sb2FkZW5kPWZ1bmN0aW9uKGUpe3ZvaWQgMCE9PWUudGFyZ2V0LnJlc3VsdHx8bnVsbCE9PWUudGFyZ2V0LnJlc3VsdD9pLnJlc29sdmUoZS50YXJnZXQucmVzdWx0KTp2b2lkIDAhPT1lLnRhcmdldC5lcnJvcnx8bnVsbCE9PWUudGFyZ2V0LmVycm9yP2kucmVqZWN0KGUudGFyZ2V0LmVycm9yKTppLnJlamVjdCh7Y29kZTpudWxsLG1lc3NhZ2U6XCJSRUFERVJfT05MT0FERU5EX0VSUlwifSl9LG4ucmVhZEFzRGF0YVVSTChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX1jYXRjaChhKXthLm1lc3NhZ2U9clthLmNvZGVdLGkucmVqZWN0KGEpfXJldHVybiBpLnByb21pc2V9LHJlYWRBc0JpbmFyeVN0cmluZzpmdW5jdGlvbihvLHQpe3ZhciBpPWUuZGVmZXIoKTsvXlxcLy8udGVzdCh0KSYmaS5yZWplY3QoXCJmaWxlLW5hbWUgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKG8sZnVuY3Rpb24oZSl7ZS5nZXRGaWxlKHQse2NyZWF0ZTohMX0sZnVuY3Rpb24oZSl7ZS5maWxlKGZ1bmN0aW9uKGUpe3ZhciBuPW5ldyBGaWxlUmVhZGVyO24ub25sb2FkZW5kPWZ1bmN0aW9uKGUpe3ZvaWQgMCE9PWUudGFyZ2V0LnJlc3VsdHx8bnVsbCE9PWUudGFyZ2V0LnJlc3VsdD9pLnJlc29sdmUoZS50YXJnZXQucmVzdWx0KTp2b2lkIDAhPT1lLnRhcmdldC5lcnJvcnx8bnVsbCE9PWUudGFyZ2V0LmVycm9yP2kucmVqZWN0KGUudGFyZ2V0LmVycm9yKTppLnJlamVjdCh7Y29kZTpudWxsLG1lc3NhZ2U6XCJSRUFERVJfT05MT0FERU5EX0VSUlwifSl9LG4ucmVhZEFzQmluYXJ5U3RyaW5nKGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfWNhdGNoKGEpe2EubWVzc2FnZT1yW2EuY29kZV0saS5yZWplY3QoYSl9cmV0dXJuIGkucHJvbWlzZX0scmVhZEFzQXJyYXlCdWZmZXI6ZnVuY3Rpb24obyx0KXt2YXIgaT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmkucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChvLGZ1bmN0aW9uKGUpe2UuZ2V0RmlsZSh0LHtjcmVhdGU6ITF9LGZ1bmN0aW9uKGUpe2UuZmlsZShmdW5jdGlvbihlKXt2YXIgbj1uZXcgRmlsZVJlYWRlcjtuLm9ubG9hZGVuZD1mdW5jdGlvbihlKXt2b2lkIDAhPT1lLnRhcmdldC5yZXN1bHR8fG51bGwhPT1lLnRhcmdldC5yZXN1bHQ/aS5yZXNvbHZlKGUudGFyZ2V0LnJlc3VsdCk6dm9pZCAwIT09ZS50YXJnZXQuZXJyb3J8fG51bGwhPT1lLnRhcmdldC5lcnJvcj9pLnJlamVjdChlLnRhcmdldC5lcnJvcik6aS5yZWplY3Qoe2NvZGU6bnVsbCxtZXNzYWdlOlwiUkVBREVSX09OTE9BREVORF9FUlJcIn0pfSxuLnJlYWRBc0FycmF5QnVmZmVyKGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfWNhdGNoKGEpe2EubWVzc2FnZT1yW2EuY29kZV0saS5yZWplY3QoYSl9cmV0dXJuIGkucHJvbWlzZX0sbW92ZUZpbGU6ZnVuY3Rpb24ocixvLHQsaSl7dmFyIGE9ZS5kZWZlcigpO2k9aXx8bywoL15cXC8vLnRlc3Qobyl8fC9eXFwvLy50ZXN0KGkpKSYmYS5yZWplY3QoXCJmaWxlLW5hbWUgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKHIsZnVuY3Rpb24oZSl7ZS5nZXRGaWxlKG8se2NyZWF0ZTohMX0sZnVuY3Rpb24oZSl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKHQsZnVuY3Rpb24obil7ZS5tb3ZlVG8obixpLGZ1bmN0aW9uKGUpe2EucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7YS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7YS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7YS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7YS5yZWplY3QoZSl9KX1jYXRjaChjKXthLnJlamVjdChjKX1yZXR1cm4gYS5wcm9taXNlfSxtb3ZlRGlyOmZ1bmN0aW9uKHIsbyx0LGkpe3ZhciBhPWUuZGVmZXIoKTtpPWl8fG8sKC9eXFwvLy50ZXN0KG8pfHwvXlxcLy8udGVzdChpKSkmJmEucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChyLGZ1bmN0aW9uKGUpe2UuZ2V0RGlyZWN0b3J5KG8se2NyZWF0ZTohMX0sZnVuY3Rpb24oZSl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKHQsZnVuY3Rpb24obil7ZS5tb3ZlVG8obixpLGZ1bmN0aW9uKGUpe2EucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7YS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7YS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7YS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7YS5yZWplY3QoZSl9KX1jYXRjaChjKXthLnJlamVjdChjKX1yZXR1cm4gYS5wcm9taXNlfSxjb3B5RGlyOmZ1bmN0aW9uKG8sdCxpLGEpe3ZhciBjPWUuZGVmZXIoKTthPWF8fHQsKC9eXFwvLy50ZXN0KHQpfHwvXlxcLy8udGVzdChhKSkmJmMucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChvLGZ1bmN0aW9uKGUpe2UuZ2V0RGlyZWN0b3J5KHQse2NyZWF0ZTohMSxleGNsdXNpdmU6ITF9LGZ1bmN0aW9uKGUpe24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChpLGZ1bmN0aW9uKG4pe2UuY29weVRvKG4sYSxmdW5jdGlvbihlKXtjLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYy5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxjLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGMucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYy5yZWplY3QoZSl9KX1jYXRjaCh1KXt1Lm1lc3NhZ2U9clt1LmNvZGVdLGMucmVqZWN0KHUpfXJldHVybiBjLnByb21pc2V9LGNvcHlGaWxlOmZ1bmN0aW9uKG8sdCxpLGEpe3ZhciBjPWUuZGVmZXIoKTthPWF8fHQsL15cXC8vLnRlc3QodCkmJmMucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChvLGZ1bmN0aW9uKGUpe2UuZ2V0RmlsZSh0LHtjcmVhdGU6ITEsZXhjbHVzaXZlOiExfSxmdW5jdGlvbihlKXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwoaSxmdW5jdGlvbihuKXtlLmNvcHlUbyhuLGEsZnVuY3Rpb24oZSl7Yy5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGMucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYy5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxjLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGMucmVqZWN0KGUpfSl9Y2F0Y2godSl7dS5tZXNzYWdlPXJbdS5jb2RlXSxjLnJlamVjdCh1KX1yZXR1cm4gYy5wcm9taXNlfSxyZWFkRmlsZU1ldGFkYXRhOmZ1bmN0aW9uKG8sdCl7dmFyIGk9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZpLnJlamVjdChcImRpcmVjdG9yeSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXt2YXIgYT1vK3Q7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKGEsZnVuY3Rpb24oZSl7ZS5maWxlKGZ1bmN0aW9uKGUpe2kucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9Y2F0Y2goYyl7Yy5tZXNzYWdlPXJbYy5jb2RlXSxpLnJlamVjdChjKX1yZXR1cm4gaS5wcm9taXNlfX19XX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmZpbGVPcGVuZXIyXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUZpbGVPcGVuZXIyXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57b3BlbjpmdW5jdGlvbihuLHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLmZpbGVPcGVuZXIyLm9wZW4obixyLHtlcnJvcjpmdW5jdGlvbihlKXtvLnJlamVjdChlKX0sc3VjY2VzczpmdW5jdGlvbigpe28ucmVzb2x2ZSgpfX0pLG8ucHJvbWlzZX0sdW5pbnN0YWxsOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLmZpbGVPcGVuZXIyLnVuaW5zdGFsbChuLHtlcnJvcjpmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sc3VjY2VzczpmdW5jdGlvbigpe3IucmVzb2x2ZSgpfX0pLHIucHJvbWlzZX0sYXBwSXNJbnN0YWxsZWQ6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuZmlsZU9wZW5lcjIuYXBwSXNJbnN0YWxsZWQobix7c3VjY2VzczpmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9fSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5maWxlVHJhbnNmZXJcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhRmlsZVRyYW5zZmVyXCIsW1wiJHFcIixcIiR0aW1lb3V0XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57ZG93bmxvYWQ6ZnVuY3Rpb24ocixvLHQsaSl7dmFyIGE9ZS5kZWZlcigpLGM9bmV3IEZpbGVUcmFuc2Zlcix1PXQmJnQuZW5jb2RlVVJJPT09ITE/cjplbmNvZGVVUkkocik7cmV0dXJuIHQmJnZvaWQgMCE9PXQudGltZW91dCYmbnVsbCE9PXQudGltZW91dCYmKG4oZnVuY3Rpb24oKXtjLmFib3J0KCl9LHQudGltZW91dCksdC50aW1lb3V0PW51bGwpLGMub25wcm9ncmVzcz1mdW5jdGlvbihlKXthLm5vdGlmeShlKX0sYS5wcm9taXNlLmFib3J0PWZ1bmN0aW9uKCl7Yy5hYm9ydCgpfSxjLmRvd25sb2FkKHUsbyxhLnJlc29sdmUsYS5yZWplY3QsaSx0KSxhLnByb21pc2V9LHVwbG9hZDpmdW5jdGlvbihyLG8sdCxpKXt2YXIgYT1lLmRlZmVyKCksYz1uZXcgRmlsZVRyYW5zZmVyLHU9dCYmdC5lbmNvZGVVUkk9PT0hMT9yOmVuY29kZVVSSShyKTtyZXR1cm4gdCYmdm9pZCAwIT09dC50aW1lb3V0JiZudWxsIT09dC50aW1lb3V0JiYobihmdW5jdGlvbigpe2MuYWJvcnQoKX0sdC50aW1lb3V0KSx0LnRpbWVvdXQ9bnVsbCksYy5vbnByb2dyZXNzPWZ1bmN0aW9uKGUpe2Eubm90aWZ5KGUpfSxhLnByb21pc2UuYWJvcnQ9ZnVuY3Rpb24oKXtjLmFib3J0KCl9LGMudXBsb2FkKG8sdSxhLnJlc29sdmUsYS5yZWplY3QsdCxpKSxhLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmZsYXNobGlnaHRcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhRmxhc2hsaWdodFwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57YXZhaWxhYmxlOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuZmxhc2hsaWdodC5hdmFpbGFibGUoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSksci5wcm9taXNlfSxzd2l0Y2hPbjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmZsYXNobGlnaHQuc3dpdGNoT24oZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sc3dpdGNoT2ZmOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuZmxhc2hsaWdodC5zd2l0Y2hPZmYoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sdG9nZ2xlOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuZmxhc2hsaWdodC50b2dnbGUoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmx1cnJ5QWRzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUZsdXJyeUFkc1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57c2V0T3B0aW9uczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uRmx1cnJ5QWRzLnNldE9wdGlvbnMocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LGNyZWF0ZUJhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uRmx1cnJ5QWRzLmNyZWF0ZUJhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0scmVtb3ZlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLkZsdXJyeUFkcy5yZW1vdmVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxzaG93QmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5GbHVycnlBZHMuc2hvd0Jhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0Jhbm5lckF0WFk6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4uRmx1cnJ5QWRzLnNob3dCYW5uZXJBdFhZKHIsbyxmdW5jdGlvbigpe3QucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3QucmVqZWN0KCl9KSx0LnByb21pc2V9LGhpZGVCYW5uZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uRmx1cnJ5QWRzLmhpZGVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxwcmVwYXJlSW50ZXJzdGl0aWFsOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5GbHVycnlBZHMucHJlcGFyZUludGVyc3RpdGlhbChyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0ludGVyc3RpdGlhbDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5GbHVycnlBZHMuc2hvd0ludGVyc3RpdGlhbChmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmdhXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUdBXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntpbml0OmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBvPW8+PTA/bzoxMCxuLnBsdWdpbnMuZ2FQbHVnaW4uaW5pdChmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSxyLG8pLHQucHJvbWlzZX0sdHJhY2tFdmVudDpmdW5jdGlvbihyLG8sdCxpLGEsYyl7dmFyIHU9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuZ2FQbHVnaW4udHJhY2tFdmVudChmdW5jdGlvbihlKXt1LnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3UucmVqZWN0KGUpfSx0LGksYSxjKSx1LnByb21pc2V9LHRyYWNrUGFnZTpmdW5jdGlvbihyLG8sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuZ2FQbHVnaW4udHJhY2tQYWdlKGZ1bmN0aW9uKGUpe2kucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7aS5yZWplY3QoZSl9LHQpLGkucHJvbWlzZX0sc2V0VmFyaWFibGU6ZnVuY3Rpb24ocixvLHQsaSl7dmFyIGE9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuZ2FQbHVnaW4uc2V0VmFyaWFibGUoZnVuY3Rpb24oZSl7YS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXthLnJlamVjdChlKX0sdCxpKSxhLnByb21pc2V9LGV4aXQ6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5nYVBsdWdpbi5leGl0KGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmdlb2xvY2F0aW9uXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUdlb2xvY2F0aW9uXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57Z2V0Q3VycmVudFBvc2l0aW9uOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKSxyLnByb21pc2V9LHdhdGNoUG9zaXRpb246ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpLG89bmF2aWdhdG9yLmdlb2xvY2F0aW9uLndhdGNoUG9zaXRpb24oZnVuY3Rpb24oZSl7ci5ub3RpZnkoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKTtyZXR1cm4gci5wcm9taXNlLmNhbmNlbD1mdW5jdGlvbigpe25hdmlnYXRvci5nZW9sb2NhdGlvbi5jbGVhcldhdGNoKG8pfSxyLnByb21pc2UuY2xlYXJXYXRjaD1mdW5jdGlvbihlKXtuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uY2xlYXJXYXRjaChlfHxvKX0sci5wcm9taXNlLndhdGNoSUQ9byxyLnByb21pc2V9LGNsZWFyV2F0Y2g6ZnVuY3Rpb24oZSl7cmV0dXJuIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5jbGVhcldhdGNoKGUpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5nbG9iYWxpemF0aW9uXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUdsb2JhbGl6YXRpb25cIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntnZXRQcmVmZXJyZWRMYW5ndWFnZTpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmdsb2JhbGl6YXRpb24uZ2V0UHJlZmVycmVkTGFuZ3VhZ2UoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sZ2V0TG9jYWxlTmFtZTpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmdsb2JhbGl6YXRpb24uZ2V0TG9jYWxlTmFtZShmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxnZXRGaXJzdERheU9mV2VlazpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmdsb2JhbGl6YXRpb24uZ2V0Rmlyc3REYXlPZldlZWsoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sZGF0ZVRvU3RyaW5nOmZ1bmN0aW9uKG4scil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZ2xvYmFsaXphdGlvbi5kYXRlVG9TdHJpbmcobixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSxyKSxvLnByb21pc2V9LHN0cmluZ1RvRGF0ZTpmdW5jdGlvbihuLHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmdsb2JhbGl6YXRpb24uc3RyaW5nVG9EYXRlKG4sZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0sciksby5wcm9taXNlfSxnZXREYXRlUGF0dGVybjpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLmdldERhdGVQYXR0ZXJuKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LG4pLHIucHJvbWlzZX0sZ2V0RGF0ZU5hbWVzOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmdsb2JhbGl6YXRpb24uZ2V0RGF0ZU5hbWVzKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LG4pLHIucHJvbWlzZX0saXNEYXlMaWdodFNhdmluZ3NUaW1lOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmdsb2JhbGl6YXRpb24uaXNEYXlMaWdodFNhdmluZ3NUaW1lKG4sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sbnVtYmVyVG9TdHJpbmc6ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLm51bWJlclRvU3RyaW5nKG4sZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0sciksby5wcm9taXNlfSxzdHJpbmdUb051bWJlcjpmdW5jdGlvbihuLHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmdsb2JhbGl6YXRpb24uc3RyaW5nVG9OdW1iZXIobixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSxyKSxvLnByb21pc2V9LGdldE51bWJlclBhdHRlcm46ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZ2xvYmFsaXphdGlvbi5nZXROdW1iZXJQYXR0ZXJuKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LG4pLHIucHJvbWlzZX0sZ2V0Q3VycmVuY3lQYXR0ZXJuOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmdsb2JhbGl6YXRpb24uZ2V0Q3VycmVuY3lQYXR0ZXJuKG4sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ29vZ2xlQWRzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUdvb2dsZUFkc1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57c2V0T3B0aW9uczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uQWRNb2Iuc2V0T3B0aW9ucyhyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sY3JlYXRlQmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5BZE1vYi5jcmVhdGVCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHJlbW92ZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5BZE1vYi5yZW1vdmVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxzaG93QmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5BZE1vYi5zaG93QmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93QmFubmVyQXRYWTpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi5BZE1vYi5zaG93QmFubmVyQXRYWShyLG8sZnVuY3Rpb24oKXt0LnJlc29sdmUoKX0sZnVuY3Rpb24oKXt0LnJlamVjdCgpfSksdC5wcm9taXNlfSxoaWRlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLkFkTW9iLmhpZGVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxwcmVwYXJlSW50ZXJzdGl0aWFsOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5BZE1vYi5wcmVwYXJlSW50ZXJzdGl0aWFsKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93SW50ZXJzdGl0aWFsOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLkFkTW9iLnNob3dJbnRlcnN0aXRpYWwoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5nb29nbGVBbmFseXRpY3NcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhR29vZ2xlQW5hbHl0aWNzXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntzdGFydFRyYWNrZXJXaXRoSWQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmFuYWx5dGljcy5zdGFydFRyYWNrZXJXaXRoSWQocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxzZXRVc2VySWQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmFuYWx5dGljcy5zZXRVc2VySWQocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxkZWJ1Z01vZGU6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYW5hbHl0aWNzLmRlYnVnTW9kZShmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0sdHJhY2tWaWV3OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5hbmFseXRpY3MudHJhY2tWaWV3KHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sYWRkQ3VzdG9tRGltZW5zaW9uOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpLGk9cGFyc2VJbnQociwxMCk7cmV0dXJuIGlzTmFOKGkpJiZ0LnJlamVjdCgnUGFyYW1ldGVyIFwia2V5XCIgbXVzdCBiZSBhbiBpbnRlZ2VyLicpLG4uYW5hbHl0aWNzLmFkZEN1c3RvbURpbWVuc2lvbihpLG8sZnVuY3Rpb24oKXt0LnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7dC5yZWplY3QoZSl9KSx0LnByb21pc2V9LHRyYWNrRXZlbnQ6ZnVuY3Rpb24ocixvLHQsaSl7dmFyIGE9ZS5kZWZlcigpO3JldHVybiBuLmFuYWx5dGljcy50cmFja0V2ZW50KHIsbyx0LGksZnVuY3Rpb24oZSl7YS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXthLnJlamVjdChlKX0pLGEucHJvbWlzZX0sdHJhY2tFeGNlcHRpb246ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4uYW5hbHl0aWNzLnRyYWNrRXhjZXB0aW9uKHIsbyxmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSksdC5wcm9taXNlfSx0cmFja1RpbWluZzpmdW5jdGlvbihyLG8sdCxpKXt2YXIgYT1lLmRlZmVyKCk7cmV0dXJuIG4uYW5hbHl0aWNzLnRyYWNrVGltaW5nKHIsbyx0LGksZnVuY3Rpb24oZSl7YS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXthLnJlamVjdChlKX0pLGEucHJvbWlzZX0sYWRkVHJhbnNhY3Rpb246ZnVuY3Rpb24ocixvLHQsaSxhLGMpe3ZhciB1PWUuZGVmZXIoKTtyZXR1cm4gbi5hbmFseXRpY3MuYWRkVHJhbnNhY3Rpb24ocixvLHQsaSxhLGMsZnVuY3Rpb24oZSl7dS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt1LnJlamVjdChlKX0pLHUucHJvbWlzZX0sYWRkVHJhbnNhY3Rpb25JdGVtOmZ1bmN0aW9uKHIsbyx0LGksYSxjLHUpe3ZhciBzPWUuZGVmZXIoKTtyZXR1cm4gbi5hbmFseXRpY3MuYWRkVHJhbnNhY3Rpb25JdGVtKHIsbyx0LGksYSxjLHUsZnVuY3Rpb24oZSl7cy5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtzLnJlamVjdChlKX0pLHMucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ29vZ2xlTWFwXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUdvb2dsZU1hcFwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXt2YXIgcj1udWxsO3JldHVybntnZXRNYXA6ZnVuY3Rpb24obyl7dmFyIHQ9ZS5kZWZlcigpO2lmKG4ucGx1Z2luLmdvb2dsZS5tYXBzKXt2YXIgaT1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1hcF9jYW52YXNcIik7cj1uLnBsdWdpbi5nb29nbGUubWFwcy5NYXAuZ2V0TWFwKG8pLHIuc2V0RGl2KGkpLHQucmVzb2x2ZShyKX1lbHNlIHQucmVqZWN0KG51bGwpO3JldHVybiB0LnByb21pc2V9LGlzTWFwTG9hZGVkOmZ1bmN0aW9uKCl7cmV0dXJuISFyfSxhZGRNYXJrZXI6ZnVuY3Rpb24obil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByLmFkZE1hcmtlcihuLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0pLG8ucHJvbWlzZX0sZ2V0TWFwVHlwZUlkczpmdW5jdGlvbigpe3JldHVybiBuLnBsdWdpbi5nb29nbGUubWFwcy5tYXBUeXBlSWR9LHNldFZpc2libGU6ZnVuY3Rpb24obil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByLnNldFZpc2libGUobiksby5wcm9taXNlfSxjbGVhbnVwOmZ1bmN0aW9uKCl7cj1udWxsfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5nb29nbGVQbGF5R2FtZVwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFHb29nbGVQbGF5R2FtZVwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2F1dGg6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGdvb2dsZXBsYXlnYW1lLmF1dGgoZnVuY3Rpb24oZSl7cmV0dXJuIG4ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7cmV0dXJuIG4ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxzaWdub3V0OmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBnb29nbGVwbGF5Z2FtZS5zaWdub3V0KGZ1bmN0aW9uKGUpe3JldHVybiBuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3JldHVybiBuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0saXNTaWduZWRJbjpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gZ29vZ2xlcGxheWdhbWUuaXNTaWduZWRJbihmdW5jdGlvbihlKXtyZXR1cm4gbi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyZXR1cm4gbi5yZWplY3QoZSl9KSxuLnByb21pc2V9LHNob3dQbGF5ZXI6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGdvb2dsZXBsYXlnYW1lLnNob3dQbGF5ZXIoZnVuY3Rpb24oZSl7cmV0dXJuIG4ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7cmV0dXJuIG4ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxzdWJtaXRTY29yZTpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGdvb2dsZXBsYXlnYW1lLnN1Ym1pdFNjb3JlKG4sZnVuY3Rpb24oZSl7cmV0dXJuIHIucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7cmV0dXJuIHIucmVqZWN0KGUpfSksci5wcm9taXNlfSxzaG93QWxsTGVhZGVyYm9hcmRzOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBnb29nbGVwbGF5Z2FtZS5zaG93QWxsTGVhZGVyYm9hcmRzKGZ1bmN0aW9uKGUpe3JldHVybiBuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3JldHVybiBuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sc2hvd0xlYWRlcmJvYXJkOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gZ29vZ2xlcGxheWdhbWUuc2hvd0xlYWRlcmJvYXJkKG4sZnVuY3Rpb24oZSl7cmV0dXJuIHIucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7cmV0dXJuIHIucmVqZWN0KGUpfSksci5wcm9taXNlfSx1bmxvY2tBY2hpZXZlbWVudDpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGdvb2dsZXBsYXlnYW1lLnVubG9ja0FjaGlldmVtZW50KG4sZnVuY3Rpb24oZSl7cmV0dXJuIHIucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7cmV0dXJuIHIucmVqZWN0KGUpfSksci5wcm9taXNlfSxpbmNyZW1lbnRBY2hpZXZlbWVudDpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGdvb2dsZXBsYXlnYW1lLmluY3JlbWVudEFjaGlldmVtZW50KG4sZnVuY3Rpb24oZSl7cmV0dXJuIHIucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7cmV0dXJuIHIucmVqZWN0KGUpfSksci5wcm9taXNlfSxzaG93QWNoaWV2ZW1lbnRzOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBnb29nbGVwbGF5Z2FtZS5zaG93QWNoaWV2ZW1lbnRzKGZ1bmN0aW9uKGUpe3JldHVybiBuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3JldHVybiBuLnJlamVjdChlKX0pLG4ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ29vZ2xlUGx1c1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFHb29nbGVQbHVzXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntsb2dpbjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHZvaWQgMD09PXImJihyPXt9KSxuLnBsdWdpbnMuZ29vZ2xlcGx1cy5sb2dpbih7aU9TQXBpS2V5OnJ9LGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHNpbGVudExvZ2luOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gdm9pZCAwPT09ciYmKHI9e30pLG4ucGx1Z2lucy5nb29nbGVwbHVzLnRyeVNpbGVudExvZ2luKHtpT1NBcGlLZXk6cn0sZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sbG9nb3V0OmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO24ucGx1Z2lucy5nb29nbGVwbHVzLmxvZ291dChmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9KX0sZGlzY29ubmVjdDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtuLnBsdWdpbnMuZ29vZ2xlcGx1cy5kaXNjb25uZWN0KGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0pfSxpc0F2YWlsYWJsZTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmdvb2dsZXBsdXMuaXNBdmFpbGFibGUoZnVuY3Rpb24oZSl7ZT9yLnJlc29sdmUoZSk6ci5yZWplY3QoZSl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmhlYWx0aEtpdFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFIZWFsdGhLaXRcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2lzQXZhaWxhYmxlOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuaGVhbHRoa2l0LmF2YWlsYWJsZShmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxjaGVja0F1dGhTdGF0dXM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fFwiSEtRdWFudGl0eVR5cGVJZGVudGlmaWVySGVpZ2h0XCIsbi5wbHVnaW5zLmhlYWx0aGtpdC5jaGVja0F1dGhTdGF0dXMoe3R5cGU6cn0sZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0scmVxdWVzdEF1dGhvcml6YXRpb246ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8W1wiSEtDaGFyYWN0ZXJpc3RpY1R5cGVJZGVudGlmaWVyRGF0ZU9mQmlydGhcIixcIkhLUXVhbnRpdHlUeXBlSWRlbnRpZmllckFjdGl2ZUVuZXJneUJ1cm5lZFwiLFwiSEtRdWFudGl0eVR5cGVJZGVudGlmaWVySGVpZ2h0XCJdLG89b3x8W1wiSEtRdWFudGl0eVR5cGVJZGVudGlmaWVyQWN0aXZlRW5lcmd5QnVybmVkXCIsXCJIS1F1YW50aXR5VHlwZUlkZW50aWZpZXJIZWlnaHRcIixcIkhLUXVhbnRpdHlUeXBlSWRlbnRpZmllckRpc3RhbmNlQ3ljbGluZ1wiXSxuLnBsdWdpbnMuaGVhbHRoa2l0LnJlcXVlc3RBdXRob3JpemF0aW9uKHtyZWFkVHlwZXM6cix3cml0ZVR5cGVzOm99LGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7dC5yZWplY3QoZSl9KSx0LnByb21pc2V9LHJlYWREYXRlT2ZCaXJ0aDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmhlYWx0aGtpdC5yZWFkRGF0ZU9mQmlydGgoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9KSxyLnByb21pc2V9LHJlYWRHZW5kZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5oZWFsdGhraXQucmVhZEdlbmRlcihmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0pLHIucHJvbWlzZX0sc2F2ZVdlaWdodDpmdW5jdGlvbihyLG8sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuaGVhbHRoa2l0LnNhdmVXZWlnaHQoe3VuaXQ6b3x8XCJsYlwiLGFtb3VudDpyLGRhdGU6dHx8bmV3IERhdGV9LGZ1bmN0aW9uKGUpe2kucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7aS5yZXNvbHZlKGUpfSksaS5wcm9taXNlfSxyZWFkV2VpZ2h0OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmhlYWx0aGtpdC5yZWFkV2VpZ2h0KHt1bml0OnJ8fFwibGJcIn0sZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9KSxvLnByb21pc2V9LHNhdmVIZWlnaHQ6ZnVuY3Rpb24ocixvLHQpe3ZhciBpPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmhlYWx0aGtpdC5zYXZlSGVpZ2h0KHt1bml0Om98fFwiaW5cIixhbW91bnQ6cixkYXRlOnR8fG5ldyBEYXRlfSxmdW5jdGlvbihlKXtpLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2kucmVzb2x2ZShlKX0pLGkucHJvbWlzZX0scmVhZEhlaWdodDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5oZWFsdGhraXQucmVhZEhlaWdodCh7dW5pdDpyfHxcImluXCJ9LGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSksby5wcm9taXNlfSxmaW5kV29ya291dHM6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5oZWFsdGhraXQuZmluZFdvcmtvdXRzKHt9LGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSksci5wcm9taXNlfSxzYXZlV29ya291dDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5oZWFsdGhraXQuc2F2ZVdvcmtvdXQocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0pLG8ucHJvbWlzZX0scXVlcnlTYW1wbGVUeXBlOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmhlYWx0aGtpdC5xdWVyeVNhbXBsZVR5cGUocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0pLG8ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuaHR0cGRcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhSHR0cGRcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntzdGFydFNlcnZlcjpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5Db3JIdHRwZC5zdGFydFNlcnZlcihuLGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0sc3RvcFNlcnZlcjpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLkNvckh0dHBkLnN0b3BTZXJ2ZXIoZnVuY3Rpb24oKXtuLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtuLnJlamVjdCgpfSksbi5wcm9taXNlfSxnZXRVUkw6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5Db3JIdHRwZC5nZXRVUkwoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbigpe24ucmVqZWN0KCl9KSxuLnByb21pc2V9LGdldExvY2FsUGF0aDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLkNvckh0dHBkLmdldExvY2FsUGF0aChmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKCl7bi5yZWplY3QoKX0pLG4ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuaUFkXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YWlBZFwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57c2V0T3B0aW9uczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uaUFkLnNldE9wdGlvbnMocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LGNyZWF0ZUJhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uaUFkLmNyZWF0ZUJhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0scmVtb3ZlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmlBZC5yZW1vdmVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxzaG93QmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5pQWQuc2hvd0Jhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0Jhbm5lckF0WFk6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4uaUFkLnNob3dCYW5uZXJBdFhZKHIsbyxmdW5jdGlvbigpe3QucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3QucmVqZWN0KCl9KSx0LnByb21pc2V9LGhpZGVCYW5uZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uaUFkLmhpZGVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxwcmVwYXJlSW50ZXJzdGl0aWFsOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5pQWQucHJlcGFyZUludGVyc3RpdGlhbChyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0ludGVyc3RpdGlhbDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5pQWQuc2hvd0ludGVyc3RpdGlhbChmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmltYWdlUGlja2VyXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUltYWdlUGlja2VyXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntnZXRQaWN0dXJlczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uaW1hZ2VQaWNrZXIuZ2V0UGljdHVyZXMoZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0sciksby5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5pbkFwcEJyb3dzZXJcIixbXSkucHJvdmlkZXIoXCIkY29yZG92YUluQXBwQnJvd3NlclwiLFtmdW5jdGlvbigpe3ZhciBlLG49dGhpcy5kZWZhdWx0T3B0aW9ucz17fTt0aGlzLnNldERlZmF1bHRPcHRpb25zPWZ1bmN0aW9uKGUpe249YW5ndWxhci5leHRlbmQobixlKX0sdGhpcy4kZ2V0PVtcIiRyb290U2NvcGVcIixcIiRxXCIsXCIkd2luZG93XCIsXCIkdGltZW91dFwiLGZ1bmN0aW9uKHIsbyx0LGkpe3JldHVybntvcGVuOmZ1bmN0aW9uKGEsYyx1KXt2YXIgcz1vLmRlZmVyKCk7aWYodSYmIWFuZ3VsYXIuaXNPYmplY3QodSkpcmV0dXJuIHMucmVqZWN0KFwib3B0aW9ucyBtdXN0IGJlIGFuIG9iamVjdFwiKSxzLnByb21pc2U7dmFyIGw9YW5ndWxhci5leHRlbmQoe30sbix1KSxmPVtdO2FuZ3VsYXIuZm9yRWFjaChsLGZ1bmN0aW9uKGUsbil7Zi5wdXNoKG4rXCI9XCIrZSl9KTt2YXIgZD1mLmpvaW4oKTtyZXR1cm4gZT10Lm9wZW4oYSxjLGQpLGUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRzdGFydFwiLGZ1bmN0aW9uKGUpe2koZnVuY3Rpb24oKXtyLiRicm9hZGNhc3QoXCIkY29yZG92YUluQXBwQnJvd3Nlcjpsb2Fkc3RhcnRcIixlKX0pfSwhMSksZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZHN0b3BcIixmdW5jdGlvbihlKXtzLnJlc29sdmUoZSksaShmdW5jdGlvbigpe3IuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhSW5BcHBCcm93c2VyOmxvYWRzdG9wXCIsZSl9KX0sITEpLGUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlcnJvclwiLGZ1bmN0aW9uKGUpe3MucmVqZWN0KGUpLGkoZnVuY3Rpb24oKXtyLiRicm9hZGNhc3QoXCIkY29yZG92YUluQXBwQnJvd3Nlcjpsb2FkZXJyb3JcIixlKX0pfSwhMSksZS5hZGRFdmVudExpc3RlbmVyKFwiZXhpdFwiLGZ1bmN0aW9uKGUpe2koZnVuY3Rpb24oKXtyLiRicm9hZGNhc3QoXCIkY29yZG92YUluQXBwQnJvd3NlcjpleGl0XCIsZSl9KX0sITEpLHMucHJvbWlzZX0sY2xvc2U6ZnVuY3Rpb24oKXtlLmNsb3NlKCksZT1udWxsfSxzaG93OmZ1bmN0aW9uKCl7ZS5zaG93KCl9LGV4ZWN1dGVTY3JpcHQ6ZnVuY3Rpb24obil7dmFyIHI9by5kZWZlcigpO3JldHVybiBlLmV4ZWN1dGVTY3JpcHQobixmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9KSxyLnByb21pc2V9LGluc2VydENTUzpmdW5jdGlvbihuKXt2YXIgcj1vLmRlZmVyKCk7cmV0dXJuIGUuaW5zZXJ0Q1NTKG4sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSksci5wcm9taXNlfX19XX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmluc29tbmlhXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUluc29tbmlhXCIsW1wiJHdpbmRvd1wiLGZ1bmN0aW9uKGUpe3JldHVybntrZWVwQXdha2U6ZnVuY3Rpb24oKXtyZXR1cm4gZS5wbHVnaW5zLmluc29tbmlhLmtlZXBBd2FrZSgpfSxhbGxvd1NsZWVwQWdhaW46ZnVuY3Rpb24oKXtyZXR1cm4gZS5wbHVnaW5zLmluc29tbmlhLmFsbG93U2xlZXBBZ2FpbigpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5pbnN0YWdyYW1cIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhSW5zdGFncmFtXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57c2hhcmU6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiB3aW5kb3cuSW5zdGFncmFtPyhJbnN0YWdyYW0uc2hhcmUobi5pbWFnZSxuLmNhcHRpb24sZnVuY3Rpb24oZSl7ZT9yLnJlamVjdChlKTpyLnJlc29sdmUoITApfSksci5wcm9taXNlKTooY29uc29sZS5lcnJvcihcIlRyaWVkIHRvIGNhbGwgSW5zdGFncmFtLnNoYXJlIGJ1dCB0aGUgSW5zdGFncmFtIHBsdWdpbiBpc24ndCBpbnN0YWxsZWQhXCIpLHIucmVzb2x2ZShudWxsKSxyLnByb21pc2UpfSxpc0luc3RhbGxlZDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gd2luZG93Lkluc3RhZ3JhbT8oSW5zdGFncmFtLmlzSW5zdGFsbGVkKGZ1bmN0aW9uKGUscil7ZT9uLnJlamVjdChlKTpuLnJlc29sdmUocil9KSxuLnByb21pc2UpOihjb25zb2xlLmVycm9yKFwiVHJpZWQgdG8gY2FsbCBJbnN0YWdyYW0uaXNJbnN0YWxsZWQgYnV0IHRoZSBJbnN0YWdyYW0gcGx1Z2luIGlzbid0IGluc3RhbGxlZCFcIiksbi5yZXNvbHZlKG51bGwpLG4ucHJvbWlzZSl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmtleWJvYXJkXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUtleWJvYXJkXCIsW1wiJHJvb3RTY29wZVwiLGZ1bmN0aW9uKGUpe3ZhciBuPWZ1bmN0aW9uKCl7ZS4kZXZhbEFzeW5jKGZ1bmN0aW9uKCl7ZS4kYnJvYWRjYXN0KFwiJGNvcmRvdmFLZXlib2FyZDpzaG93XCIpfSl9LHI9ZnVuY3Rpb24oKXtlLiRldmFsQXN5bmMoZnVuY3Rpb24oKXtlLiRicm9hZGNhc3QoXCIkY29yZG92YUtleWJvYXJkOmhpZGVcIil9KX07cmV0dXJuIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkZXZpY2VyZWFkeVwiLGZ1bmN0aW9uKCl7Y29yZG92YS5wbHVnaW5zLktleWJvYXJkJiYod2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJuYXRpdmUua2V5Ym9hcmRzaG93XCIsbiwhMSksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJuYXRpdmUua2V5Ym9hcmRoaWRlXCIsciwhMSkpfSkse2hpZGVBY2Nlc3NvcnlCYXI6ZnVuY3Rpb24oZSl7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIoZSl9LGNsb3NlOmZ1bmN0aW9uKCl7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5jbG9zZSgpfSxzaG93OmZ1bmN0aW9uKCl7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5zaG93KCl9LGRpc2FibGVTY3JvbGw6ZnVuY3Rpb24oZSl7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5kaXNhYmxlU2Nyb2xsKGUpfSxpc1Zpc2libGU6ZnVuY3Rpb24oKXtyZXR1cm4gY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmlzVmlzaWJsZX0sY2xlYXJTaG93V2F0Y2g6ZnVuY3Rpb24oKXtkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibmF0aXZlLmtleWJvYXJkc2hvd1wiLG4pLGUuJCRsaXN0ZW5lcnNbXCIkY29yZG92YUtleWJvYXJkOnNob3dcIl09W119LGNsZWFySGlkZVdhdGNoOmZ1bmN0aW9uKCl7ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm5hdGl2ZS5rZXlib2FyZGhpZGVcIixyKSxlLiQkbGlzdGVuZXJzW1wiJGNvcmRvdmFLZXlib2FyZDpoaWRlXCJdPVtdfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5rZXljaGFpblwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFLZXljaGFpblwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2dldEZvcktleTpmdW5jdGlvbihuLHIpe3ZhciBvPWUuZGVmZXIoKSx0PW5ldyBLZXljaGFpbjtyZXR1cm4gdC5nZXRGb3JLZXkoby5yZXNvbHZlLG8ucmVqZWN0LG4sciksby5wcm9taXNlfSxzZXRGb3JLZXk6ZnVuY3Rpb24obixyLG8pe3ZhciB0PWUuZGVmZXIoKSxpPW5ldyBLZXljaGFpbjtyZXR1cm4gaS5zZXRGb3JLZXkodC5yZXNvbHZlLHQucmVqZWN0LG4scixvKSx0LnByb21pc2V9LHJlbW92ZUZvcktleTpmdW5jdGlvbihuLHIpe3ZhciBvPWUuZGVmZXIoKSx0PW5ldyBLZXljaGFpbjtyZXR1cm4gdC5yZW1vdmVGb3JLZXkoby5yZXNvbHZlLG8ucmVqZWN0LG4sciksby5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5sYXVuY2hOYXZpZ2F0b3JcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhTGF1bmNoTmF2aWdhdG9yXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57bmF2aWdhdGU6ZnVuY3Rpb24obixyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbGF1bmNobmF2aWdhdG9yLm5hdmlnYXRlKG4scixmdW5jdGlvbigpe3QucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0sbyksdC5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5sb2NhbE5vdGlmaWNhdGlvblwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFMb2NhbE5vdGlmaWNhdGlvblwiLFtcIiRxXCIsXCIkd2luZG93XCIsXCIkcm9vdFNjb3BlXCIsXCIkdGltZW91dFwiLGZ1bmN0aW9uKGUsbixyLG8pe3JldHVybiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZGV2aWNlcmVhZHlcIixmdW5jdGlvbigpe24uY29yZG92YSYmbi5jb3Jkb3ZhLnBsdWdpbnMmJm4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbiYmbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsJiYobi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLm9uKFwic2NoZWR1bGVcIixmdW5jdGlvbihlLG4pe28oZnVuY3Rpb24oKXtyLiRicm9hZGNhc3QoXCIkY29yZG92YUxvY2FsTm90aWZpY2F0aW9uOnNjaGVkdWxlXCIsZSxuKX0pfSksbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLm9uKFwidHJpZ2dlclwiLGZ1bmN0aW9uKGUsbil7byhmdW5jdGlvbigpe3IuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhTG9jYWxOb3RpZmljYXRpb246dHJpZ2dlclwiLGUsbil9KX0pLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5vbihcInVwZGF0ZVwiLGZ1bmN0aW9uKGUsbil7byhmdW5jdGlvbigpe3IuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhTG9jYWxOb3RpZmljYXRpb246dXBkYXRlXCIsZSxuKX0pfSksbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLm9uKFwiY2xlYXJcIixmdW5jdGlvbihlLG4pe28oZnVuY3Rpb24oKXtyLiRicm9hZGNhc3QoXCIkY29yZG92YUxvY2FsTm90aWZpY2F0aW9uOmNsZWFyXCIsZSxuKX0pfSksbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLm9uKFwiY2xlYXJhbGxcIixmdW5jdGlvbihlKXtvKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFMb2NhbE5vdGlmaWNhdGlvbjpjbGVhcmFsbFwiLGUpfSl9KSxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwub24oXCJjYW5jZWxcIixmdW5jdGlvbihlLG4pe28oZnVuY3Rpb24oKXtyLiRicm9hZGNhc3QoXCIkY29yZG92YUxvY2FsTm90aWZpY2F0aW9uOmNhbmNlbFwiLGUsbil9KX0pLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5vbihcImNhbmNlbGFsbFwiLGZ1bmN0aW9uKGUpe28oZnVuY3Rpb24oKXtyLiRicm9hZGNhc3QoXCIkY29yZG92YUxvY2FsTm90aWZpY2F0aW9uOmNhbmNlbGFsbFwiLGUpfSl9KSxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwub24oXCJjbGlja1wiLGZ1bmN0aW9uKGUsbil7byhmdW5jdGlvbigpe3IuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhTG9jYWxOb3RpZmljYXRpb246Y2xpY2tcIixlLG4pfSl9KSl9LCExKSx7c2NoZWR1bGU6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuc2NoZWR1bGUocixmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LG8pLHQucHJvbWlzZX0sYWRkOmZ1bmN0aW9uKHIsbyl7Y29uc29sZS53YXJuKCdEZXByZWNhdGVkOiB1c2UgXCJzY2hlZHVsZVwiIGluc3RlYWQuJyk7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLnNjaGVkdWxlKHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxvKSx0LnByb21pc2V9LHVwZGF0ZTpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbz1vfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC51cGRhdGUocixmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LG8pLHQucHJvbWlzZX0sY2xlYXI6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7XG5yZXR1cm4gbz1vfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5jbGVhcihyLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sbyksdC5wcm9taXNlfSxjbGVhckFsbDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuY2xlYXJBbGwoZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxyKSxvLnByb21pc2V9LGNhbmNlbDpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbz1vfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5jYW5jZWwocixmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LG8pLHQucHJvbWlzZX0sY2FuY2VsQWxsOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gcj1yfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5jYW5jZWxBbGwoZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxyKSxvLnByb21pc2V9LGlzUHJlc2VudDpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbz1vfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5pc1ByZXNlbnQocixmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LG8pLHQucHJvbWlzZX0saXNTY2hlZHVsZWQ6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuaXNTY2hlZHVsZWQocixmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LG8pLHQucHJvbWlzZX0saXNUcmlnZ2VyZWQ6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuaXNUcmlnZ2VyZWQocixmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LG8pLHQucHJvbWlzZX0saGFzUGVybWlzc2lvbjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuaGFzUGVybWlzc2lvbihmdW5jdGlvbihlKXtlP28ucmVzb2x2ZShlKTpvLnJlamVjdChlKX0sciksby5wcm9taXNlfSxyZWdpc3RlclBlcm1pc3Npb246ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLnJlZ2lzdGVyUGVybWlzc2lvbihmdW5jdGlvbihlKXtlP28ucmVzb2x2ZShlKTpvLnJlamVjdChlKX0sciksby5wcm9taXNlfSxwcm9tcHRGb3JQZXJtaXNzaW9uOmZ1bmN0aW9uKHIpe2NvbnNvbGUud2FybignRGVwcmVjYXRlZDogdXNlIFwicmVnaXN0ZXJQZXJtaXNzaW9uXCIgaW5zdGVhZC4nKTt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwucmVnaXN0ZXJQZXJtaXNzaW9uKGZ1bmN0aW9uKGUpe2U/by5yZXNvbHZlKGUpOm8ucmVqZWN0KGUpfSxyKSxvLnByb21pc2V9LGdldEFsbElkczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuZ2V0QWxsSWRzKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sciksby5wcm9taXNlfSxnZXRJZHM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmdldElkcyhmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LHIpLG8ucHJvbWlzZX0sZ2V0U2NoZWR1bGVkSWRzOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gcj1yfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5nZXRTY2hlZHVsZWRJZHMoZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxyKSxvLnByb21pc2V9LGdldFRyaWdnZXJlZElkczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuZ2V0VHJpZ2dlcmVkSWRzKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sciksby5wcm9taXNlfSxnZXQ6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuZ2V0KHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxvKSx0LnByb21pc2V9LGdldEFsbDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuZ2V0QWxsKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sciksby5wcm9taXNlfSxnZXRTY2hlZHVsZWQ6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuZ2V0U2NoZWR1bGVkKHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxvKSx0LnByb21pc2V9LGdldEFsbFNjaGVkdWxlZDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuZ2V0QWxsU2NoZWR1bGVkKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sciksby5wcm9taXNlfSxnZXRUcmlnZ2VyZWQ6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuZ2V0VHJpZ2dlcmVkKHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxvKSx0LnByb21pc2V9LGdldEFsbFRyaWdnZXJlZDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuZ2V0QWxsVHJpZ2dlcmVkKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sciksby5wcm9taXNlfSxnZXREZWZhdWx0czpmdW5jdGlvbigpe3JldHVybiBuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuZ2V0RGVmYXVsdHMoKX0sc2V0RGVmYXVsdHM6ZnVuY3Rpb24oZSl7bi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLnNldERlZmF1bHRzKGUpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5tTWVkaWFBZHNcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhTU1lZGlhQWRzXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntzZXRPcHRpb25zOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5tTWVkaWEuc2V0T3B0aW9ucyhyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sY3JlYXRlQmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5tTWVkaWEuY3JlYXRlQmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxyZW1vdmVCYW5uZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ubU1lZGlhLnJlbW92ZUJhbm5lcihmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHNob3dCYW5uZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLm1NZWRpYS5zaG93QmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93QmFubmVyQXRYWTpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi5tTWVkaWEuc2hvd0Jhbm5lckF0WFkocixvLGZ1bmN0aW9uKCl7dC5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7dC5yZWplY3QoKX0pLHQucHJvbWlzZX0saGlkZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5tTWVkaWEuaGlkZUJhbm5lcihmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHByZXBhcmVJbnRlcnN0aXRpYWw6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLm1NZWRpYS5wcmVwYXJlSW50ZXJzdGl0aWFsKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93SW50ZXJzdGl0aWFsOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLm1NZWRpYS5zaG93SW50ZXJzdGl0aWFsKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMubWVkaWFcIixbXSkuc2VydmljZShcIk5ld01lZGlhXCIsW1wiJHFcIixcIiRpbnRlcnZhbFwiLGZ1bmN0aW9uKGUsbil7ZnVuY3Rpb24gcihlKXthbmd1bGFyLmlzRGVmaW5lZChzKXx8KHM9bihmdW5jdGlvbigpezA+ZCYmKGQ9ZS5nZXREdXJhdGlvbigpLGEmJmQ+MCYmYS5ub3RpZnkoe2R1cmF0aW9uOmR9KSksZS5nZXRDdXJyZW50UG9zaXRpb24oZnVuY3Rpb24oZSl7ZT4tMSYmKGY9ZSl9LGZ1bmN0aW9uKGUpe2NvbnNvbGUubG9nKFwiRXJyb3IgZ2V0dGluZyBwb3M9XCIrZSl9KSxhJiZhLm5vdGlmeSh7cG9zaXRpb246Zn0pfSwxZTMpKX1mdW5jdGlvbiBvKCl7YW5ndWxhci5pc0RlZmluZWQocykmJihuLmNhbmNlbChzKSxzPXZvaWQgMCl9ZnVuY3Rpb24gdCgpe2Y9LTEsZD0tMX1mdW5jdGlvbiBpKGUpe3RoaXMubWVkaWE9bmV3IE1lZGlhKGUsZnVuY3Rpb24oZSl7bygpLHQoKSxhLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28oKSx0KCksYS5yZWplY3QoZSl9LGZ1bmN0aW9uKGUpe2w9ZSxhLm5vdGlmeSh7c3RhdHVzOmx9KX0pfXZhciBhLGMsdSxzLGw9bnVsbCxmPS0xLGQ9LTE7cmV0dXJuIGkucHJvdG90eXBlLnBsYXk9ZnVuY3Rpb24obil7cmV0dXJuIGE9ZS5kZWZlcigpLFwib2JqZWN0XCIhPXR5cGVvZiBuJiYobj17fSksdGhpcy5tZWRpYS5wbGF5KG4pLHIodGhpcy5tZWRpYSksYS5wcm9taXNlfSxpLnByb3RvdHlwZS5wYXVzZT1mdW5jdGlvbigpe28oKSx0aGlzLm1lZGlhLnBhdXNlKCl9LGkucHJvdG90eXBlLnN0b3A9ZnVuY3Rpb24oKXt0aGlzLm1lZGlhLnN0b3AoKX0saS5wcm90b3R5cGUucmVsZWFzZT1mdW5jdGlvbigpe3RoaXMubWVkaWEucmVsZWFzZSgpLHRoaXMubWVkaWE9dm9pZCAwfSxpLnByb3RvdHlwZS5zZWVrVG89ZnVuY3Rpb24oZSl7dGhpcy5tZWRpYS5zZWVrVG8oZSl9LGkucHJvdG90eXBlLnNldFZvbHVtZT1mdW5jdGlvbihlKXt0aGlzLm1lZGlhLnNldFZvbHVtZShlKX0saS5wcm90b3R5cGUuc3RhcnRSZWNvcmQ9ZnVuY3Rpb24oKXt0aGlzLm1lZGlhLnN0YXJ0UmVjb3JkKCl9LGkucHJvdG90eXBlLnN0b3BSZWNvcmQ9ZnVuY3Rpb24oKXt0aGlzLm1lZGlhLnN0b3BSZWNvcmQoKX0saS5wcm90b3R5cGUuY3VycmVudFRpbWU9ZnVuY3Rpb24oKXtyZXR1cm4gYz1lLmRlZmVyKCksdGhpcy5tZWRpYS5nZXRDdXJyZW50UG9zaXRpb24oZnVuY3Rpb24oZSl7Yy5yZXNvbHZlKGUpfSksYy5wcm9taXNlfSxpLnByb3RvdHlwZS5nZXREdXJhdGlvbj1mdW5jdGlvbigpe3JldHVybiB1PWUuZGVmZXIoKSx0aGlzLm1lZGlhLmdldER1cmF0aW9uKGZ1bmN0aW9uKGUpe3UucmVzb2x2ZShlKX0pLHUucHJvbWlzZX0saX1dKS5mYWN0b3J5KFwiJGNvcmRvdmFNZWRpYVwiLFtcIk5ld01lZGlhXCIsZnVuY3Rpb24oZSl7cmV0dXJue25ld01lZGlhOmZ1bmN0aW9uKG4pe3JldHVybiBuZXcgZShuKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMubW9iZm94QWRzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YU1vYkZveEFkc1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57c2V0T3B0aW9uczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uTW9iRm94LnNldE9wdGlvbnMocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LGNyZWF0ZUJhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uTW9iRm94LmNyZWF0ZUJhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0scmVtb3ZlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLk1vYkZveC5yZW1vdmVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxzaG93QmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb2JGb3guc2hvd0Jhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0Jhbm5lckF0WFk6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4uTW9iRm94LnNob3dCYW5uZXJBdFhZKHIsbyxmdW5jdGlvbigpe3QucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3QucmVqZWN0KCl9KSx0LnByb21pc2V9LGhpZGVCYW5uZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uTW9iRm94LmhpZGVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxwcmVwYXJlSW50ZXJzdGl0aWFsOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb2JGb3gucHJlcGFyZUludGVyc3RpdGlhbChyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0ludGVyc3RpdGlhbDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb2JGb3guc2hvd0ludGVyc3RpdGlhbChmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zXCIsW1wibmdDb3Jkb3ZhLnBsdWdpbnMuM2R0b3VjaFwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuYWN0aW9uU2hlZXRcIixcIm5nQ29yZG92YS5wbHVnaW5zLmFkTW9iXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5hcHBBdmFpbGFiaWxpdHlcIixcIm5nQ29yZG92YS5wbHVnaW5zLmFwcFJhdGVcIixcIm5nQ29yZG92YS5wbHVnaW5zLmFwcFZlcnNpb25cIixcIm5nQ29yZG92YS5wbHVnaW5zLmJhY2tncm91bmRHZW9sb2NhdGlvblwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuYmFkZ2VcIixcIm5nQ29yZG92YS5wbHVnaW5zLmJhcmNvZGVTY2FubmVyXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5iYXR0ZXJ5U3RhdHVzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5iZWFjb25cIixcIm5nQ29yZG92YS5wbHVnaW5zLmJsZVwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuYmx1ZXRvb3RoU2VyaWFsXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5icmlnaHRuZXNzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5jYWxlbmRhclwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuY2FtZXJhXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5jYXB0dXJlXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5jbGlwYm9hcmRcIixcIm5nQ29yZG92YS5wbHVnaW5zLmNvbnRhY3RzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5kYXRlUGlja2VyXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5kZXZpY2VcIixcIm5nQ29yZG92YS5wbHVnaW5zLmRldmljZU1vdGlvblwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZGV2aWNlT3JpZW50YXRpb25cIixcIm5nQ29yZG92YS5wbHVnaW5zLmRpYWxvZ3NcIixcIm5nQ29yZG92YS5wbHVnaW5zLmVtYWlsQ29tcG9zZXJcIixcIm5nQ29yZG92YS5wbHVnaW5zLmZhY2Vib29rXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5mYWNlYm9va0Fkc1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmlsZVwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmlsZVRyYW5zZmVyXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5maWxlT3BlbmVyMlwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmxhc2hsaWdodFwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmx1cnJ5QWRzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5nYVwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ2VvbG9jYXRpb25cIixcIm5nQ29yZG92YS5wbHVnaW5zLmdsb2JhbGl6YXRpb25cIixcIm5nQ29yZG92YS5wbHVnaW5zLmdvb2dsZUFkc1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ29vZ2xlQW5hbHl0aWNzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5nb29nbGVNYXBcIixcIm5nQ29yZG92YS5wbHVnaW5zLmdvb2dsZVBsYXlHYW1lXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5nb29nbGVQbHVzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5oZWFsdGhLaXRcIixcIm5nQ29yZG92YS5wbHVnaW5zLmh0dHBkXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5pQWRcIixcIm5nQ29yZG92YS5wbHVnaW5zLmltYWdlUGlja2VyXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5pbkFwcEJyb3dzZXJcIixcIm5nQ29yZG92YS5wbHVnaW5zLmluc3RhZ3JhbVwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMua2V5Ym9hcmRcIixcIm5nQ29yZG92YS5wbHVnaW5zLmtleWNoYWluXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5sYXVuY2hOYXZpZ2F0b3JcIixcIm5nQ29yZG92YS5wbHVnaW5zLmxvY2FsTm90aWZpY2F0aW9uXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5tZWRpYVwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMubU1lZGlhQWRzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5tb2Jmb3hBZHNcIixcIm5nQ29yZG92YS5wbHVnaW5zLm1vcHViQWRzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5uYXRpdmVBdWRpb1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMubmV0d29ya1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMucGluRGlhbG9nXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5wcmVmZXJlbmNlc1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMucHJpbnRlclwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMucHJvZ3Jlc3NJbmRpY2F0b3JcIixcIm5nQ29yZG92YS5wbHVnaW5zLnB1c2hcIixcIm5nQ29yZG92YS5wbHVnaW5zLnB1c2hfdjVcIixcIm5nQ29yZG92YS5wbHVnaW5zLnNtc1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuc29jaWFsU2hhcmluZ1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuc3Bpbm5lckRpYWxvZ1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuc3BsYXNoc2NyZWVuXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5zcWxpdGVcIixcIm5nQ29yZG92YS5wbHVnaW5zLnN0YXR1c2JhclwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMudG9hc3RcIixcIm5nQ29yZG92YS5wbHVnaW5zLnRvdWNoaWRcIixcIm5nQ29yZG92YS5wbHVnaW5zLnZpYnJhdGlvblwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMudmlkZW9DYXB0dXJlUGx1c1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuemlwXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5pbnNvbW5pYVwiXSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5tb3B1YkFkc1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFNb1B1YkFkc1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57c2V0T3B0aW9uczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uTW9QdWIuc2V0T3B0aW9ucyhyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sY3JlYXRlQmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb1B1Yi5jcmVhdGVCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHJlbW92ZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb1B1Yi5yZW1vdmVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxzaG93QmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb1B1Yi5zaG93QmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93QmFubmVyQXRYWTpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi5Nb1B1Yi5zaG93QmFubmVyQXRYWShyLG8sZnVuY3Rpb24oKXt0LnJlc29sdmUoKX0sZnVuY3Rpb24oKXt0LnJlamVjdCgpfSksdC5wcm9taXNlfSxoaWRlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLk1vUHViLmhpZGVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxwcmVwYXJlSW50ZXJzdGl0aWFsOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb1B1Yi5wcmVwYXJlSW50ZXJzdGl0aWFsKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxzaG93SW50ZXJzdGl0aWFsOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLk1vUHViLnNob3dJbnRlcnN0aXRpYWwoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5uYXRpdmVBdWRpb1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFOYXRpdmVBdWRpb1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57cHJlbG9hZFNpbXBsZTpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLk5hdGl2ZUF1ZGlvLnByZWxvYWRTaW1wbGUocixvLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7dC5yZWplY3QoZSl9KSx0LnByb21pc2V9LHByZWxvYWRDb21wbGV4OmZ1bmN0aW9uKHIsbyx0LGksYSl7dmFyIGM9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuTmF0aXZlQXVkaW8ucHJlbG9hZENvbXBsZXgocixvLHQsaSxhLGZ1bmN0aW9uKGUpe2MucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7Yy5yZWplY3QoZSl9KSxjLnByb21pc2V9LHBsYXk6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5OYXRpdmVBdWRpby5wbGF5KHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0sbyksdC5wcm9taXNlfSxzdG9wOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLk5hdGl2ZUF1ZGlvLnN0b3AocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxsb29wOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLk5hdGl2ZUF1ZGlvLmxvb3AocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSx1bmxvYWQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuTmF0aXZlQXVkaW8udW5sb2FkKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sc2V0Vm9sdW1lRm9yQ29tcGxleEFzc2V0OmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuTmF0aXZlQXVkaW8uc2V0Vm9sdW1lRm9yQ29tcGxleEFzc2V0KHIsbyxmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSksdC5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5uZXR3b3JrXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YU5ldHdvcmtcIixbXCIkcm9vdFNjb3BlXCIsXCIkdGltZW91dFwiLGZ1bmN0aW9uKGUsbil7dmFyIHI9ZnVuY3Rpb24oKXt2YXIgcj1uYXZpZ2F0b3IuY29ubmVjdGlvbi50eXBlO24oZnVuY3Rpb24oKXtlLiRicm9hZGNhc3QoXCIkY29yZG92YU5ldHdvcms6b2ZmbGluZVwiLHIpfSl9LG89ZnVuY3Rpb24oKXt2YXIgcj1uYXZpZ2F0b3IuY29ubmVjdGlvbi50eXBlO24oZnVuY3Rpb24oKXtlLiRicm9hZGNhc3QoXCIkY29yZG92YU5ldHdvcms6b25saW5lXCIscil9KX07cmV0dXJuIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkZXZpY2VyZWFkeVwiLGZ1bmN0aW9uKCl7bmF2aWdhdG9yLmNvbm5lY3Rpb24mJihkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwib2ZmbGluZVwiLHIsITEpLGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJvbmxpbmVcIixvLCExKSl9KSx7Z2V0TmV0d29yazpmdW5jdGlvbigpe3JldHVybiBuYXZpZ2F0b3IuY29ubmVjdGlvbi50eXBlfSxpc09ubGluZTpmdW5jdGlvbigpe3ZhciBlPW5hdmlnYXRvci5jb25uZWN0aW9uLnR5cGU7cmV0dXJuIGUhPT1Db25uZWN0aW9uLlVOS05PV04mJmUhPT1Db25uZWN0aW9uLk5PTkV9LGlzT2ZmbGluZTpmdW5jdGlvbigpe3ZhciBlPW5hdmlnYXRvci5jb25uZWN0aW9uLnR5cGU7cmV0dXJuIGU9PT1Db25uZWN0aW9uLlVOS05PV058fGU9PT1Db25uZWN0aW9uLk5PTkV9LGNsZWFyT2ZmbGluZVdhdGNoOmZ1bmN0aW9uKCl7ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm9mZmxpbmVcIixyKSxlLiQkbGlzdGVuZXJzW1wiJGNvcmRvdmFOZXR3b3JrOm9mZmxpbmVcIl09W119LGNsZWFyT25saW5lV2F0Y2g6ZnVuY3Rpb24oKXtkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwib25saW5lXCIsbyksZS4kJGxpc3RlbmVyc1tcIiRjb3Jkb3ZhTmV0d29yazpvbmxpbmVcIl09W119fX1dKS5ydW4oW1wiJGluamVjdG9yXCIsZnVuY3Rpb24oZSl7ZS5nZXQoXCIkY29yZG92YU5ldHdvcmtcIil9XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5waW5EaWFsb2dcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhUGluRGlhbG9nXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntwcm9tcHQ6ZnVuY3Rpb24ocixvLHQpe3ZhciBpPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnBpbkRpYWxvZy5wcm9tcHQocixmdW5jdGlvbihlKXtpLnJlc29sdmUoZSl9LG8sdCksaS5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5wcmVmZXJlbmNlc1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFQcmVmZXJlbmNlc1wiLFtcIiR3aW5kb3dcIixcIiRxXCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57cGx1Z2luTm90RW5hYmxlZE1lc3NhZ2U6XCJQbHVnaW4gbm90IGVuYWJsZWRcIixkZWNvcmF0ZVByb21pc2U6ZnVuY3Rpb24oZSl7ZS5zdWNjZXNzPWZ1bmN0aW9uKG4pe3JldHVybiBlLnRoZW4obiksZX0sZS5lcnJvcj1mdW5jdGlvbihuKXtyZXR1cm4gZS50aGVuKG51bGwsbiksZX19LHN0b3JlOmZ1bmN0aW9uKHIsbyx0KXtmdW5jdGlvbiBpKGUpe2MucmVzb2x2ZShlKX1mdW5jdGlvbiBhKGUpe2MucmVqZWN0KG5ldyBFcnJvcihlKSl9dmFyIGM9bi5kZWZlcigpLHU9Yy5wcm9taXNlO2lmKGUucGx1Z2lucyl7dmFyIHM7cz0zPT09YXJndW1lbnRzLmxlbmd0aD9lLnBsdWdpbnMuYXBwUHJlZmVyZW5jZXMuc3RvcmUodCxyLG8pOmUucGx1Z2lucy5hcHBQcmVmZXJlbmNlcy5zdG9yZShyLG8pLHMudGhlbihpLGEpfWVsc2UgYy5yZWplY3QobmV3IEVycm9yKHRoaXMucGx1Z2luTm90RW5hYmxlZE1lc3NhZ2UpKTtyZXR1cm4gdGhpcy5kZWNvcmF0ZVByb21pc2UodSksdX0sZmV0Y2g6ZnVuY3Rpb24ocixvKXtmdW5jdGlvbiB0KGUpe2EucmVzb2x2ZShlKX1mdW5jdGlvbiBpKGUpe2EucmVqZWN0KG5ldyBFcnJvcihlKSl9dmFyIGE9bi5kZWZlcigpLGM9YS5wcm9taXNlO2lmKGUucGx1Z2lucyl7dmFyIHU7dT0yPT09YXJndW1lbnRzLmxlbmd0aD9lLnBsdWdpbnMuYXBwUHJlZmVyZW5jZXMuZmV0Y2gobyxyKTplLnBsdWdpbnMuYXBwUHJlZmVyZW5jZXMuZmV0Y2gociksdS50aGVuKHQsaSl9ZWxzZSBhLnJlamVjdChuZXcgRXJyb3IodGhpcy5wbHVnaW5Ob3RFbmFibGVkTWVzc2FnZSkpO3JldHVybiB0aGlzLmRlY29yYXRlUHJvbWlzZShjKSxjfSxyZW1vdmU6ZnVuY3Rpb24ocixvKXtmdW5jdGlvbiB0KGUpe2EucmVzb2x2ZShlKX1mdW5jdGlvbiBpKGUpe2EucmVqZWN0KG5ldyBFcnJvcihlKSl9dmFyIGE9bi5kZWZlcigpLGM9YS5wcm9taXNlO2lmKGUucGx1Z2lucyl7dmFyIHU7dT0yPT09YXJndW1lbnRzLmxlbmd0aD9lLnBsdWdpbnMuYXBwUHJlZmVyZW5jZXMucmVtb3ZlKG8scik6ZS5wbHVnaW5zLmFwcFByZWZlcmVuY2VzLnJlbW92ZShyKSx1LnRoZW4odCxpKX1lbHNlIGEucmVqZWN0KG5ldyBFcnJvcih0aGlzLnBsdWdpbk5vdEVuYWJsZWRNZXNzYWdlKSk7cmV0dXJuIHRoaXMuZGVjb3JhdGVQcm9taXNlKGMpLGN9LHNob3c6ZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUpe3QucmVzb2x2ZShlKX1mdW5jdGlvbiBvKGUpe3QucmVqZWN0KG5ldyBFcnJvcihlKSl9dmFyIHQ9bi5kZWZlcigpLGk9dC5wcm9taXNlO3JldHVybiBlLnBsdWdpbnM/ZS5wbHVnaW5zLmFwcFByZWZlcmVuY2VzLnNob3coKS50aGVuKHIsbyk6dC5yZWplY3QobmV3IEVycm9yKHRoaXMucGx1Z2luTm90RW5hYmxlZE1lc3NhZ2UpKSx0aGlzLmRlY29yYXRlUHJvbWlzZShpKSxpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5wcmludGVyXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVByaW50ZXJcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2lzQXZhaWxhYmxlOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbi5wcmludGVyLmlzQXZhaWxhYmxlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0pLHIucHJvbWlzZX0scHJpbnQ6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2luLnByaW50ZXIucHJpbnQocixvLGZ1bmN0aW9uKCl7dC5yZXNvbHZlKCl9KSx0LnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnByb2dyZXNzSW5kaWNhdG9yXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVByb2dyZXNzXCIsW2Z1bmN0aW9uKCl7cmV0dXJue3Nob3c6ZnVuY3Rpb24oZSl7dmFyIG49ZXx8XCJQbGVhc2Ugd2FpdC4uLlwiO3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93KG4pfSxzaG93U2ltcGxlOmZ1bmN0aW9uKGUpe3ZhciBuPWV8fCExO3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93U2ltcGxlKG4pfSxzaG93U2ltcGxlV2l0aExhYmVsOmZ1bmN0aW9uKGUsbil7dmFyIHI9ZXx8ITEsbz1ufHxcIkxvYWRpbmcuLi5cIjtyZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3Iuc2hvd1NpbXBsZVdpdGhMYWJlbChyLG8pfSxzaG93U2ltcGxlV2l0aExhYmVsRGV0YWlsOmZ1bmN0aW9uKGUsbixyKXt2YXIgbz1lfHwhMSx0PW58fFwiTG9hZGluZy4uLlwiLGk9cnx8XCJQbGVhc2Ugd2FpdFwiO3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93U2ltcGxlV2l0aExhYmVsRGV0YWlsKG8sdCxpKX0sc2hvd0RldGVybWluYXRlOmZ1bmN0aW9uKGUsbil7dmFyIHI9ZXx8ITEsbz1ufHw1ZTQ7cmV0dXJuIFByb2dyZXNzSW5kaWNhdG9yLnNob3dEZXRlcm1pbmF0ZShyLG8pfSxzaG93RGV0ZXJtaW5hdGVXaXRoTGFiZWw6ZnVuY3Rpb24oZSxuLHIpe3ZhciBvPWV8fCExLHQ9bnx8NWU0LGk9cnx8XCJMb2FkaW5nLi4uXCI7cmV0dXJuIFByb2dyZXNzSW5kaWNhdG9yLnNob3dEZXRlcm1pbmF0ZVdpdGhMYWJlbChvLHQsaSl9LHNob3dBbm51bGFyOmZ1bmN0aW9uKGUsbil7dmFyIHI9ZXx8ITEsbz1ufHw1ZTQ7cmV0dXJuIFByb2dyZXNzSW5kaWNhdG9yLnNob3dBbm51bGFyKHIsbyl9LHNob3dBbm51bGFyV2l0aExhYmVsOmZ1bmN0aW9uKGUsbixyKXt2YXIgbz1lfHwhMSx0PW58fDVlNCxpPXJ8fFwiTG9hZGluZy4uLlwiO3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93QW5udWxhcldpdGhMYWJlbChvLHQsaSl9LHNob3dCYXI6ZnVuY3Rpb24oZSxuKXt2YXIgcj1lfHwhMSxvPW58fDVlNDtyZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3Iuc2hvd0JhcihyLG8pfSxzaG93QmFyV2l0aExhYmVsOmZ1bmN0aW9uKGUsbixyKXt2YXIgbz1lfHwhMSx0PW58fDVlNCxpPXJ8fFwiTG9hZGluZy4uLlwiO3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93QmFyV2l0aExhYmVsKG8sdCxpKX0sc2hvd1N1Y2Nlc3M6ZnVuY3Rpb24oZSxuKXt2YXIgcj1lfHwhMSxvPW58fFwiU3VjY2Vzc1wiO3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93U3VjY2VzcyhyLG8pfSxzaG93VGV4dDpmdW5jdGlvbihlLG4scil7dmFyIG89ZXx8ITEsdD1ufHxcIldhcm5pbmdcIixpPXJ8fFwiY2VudGVyXCI7cmV0dXJuIFByb2dyZXNzSW5kaWNhdG9yLnNob3dUZXh0KG8sdCxpKX0saGlkZTpmdW5jdGlvbigpe3JldHVybiBQcm9ncmVzc0luZGljYXRvci5oaWRlKCl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnB1c2hcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhUHVzaFwiLFtcIiRxXCIsXCIkd2luZG93XCIsXCIkcm9vdFNjb3BlXCIsXCIkdGltZW91dFwiLGZ1bmN0aW9uKGUsbixyLG8pe3JldHVybntvbk5vdGlmaWNhdGlvbjpmdW5jdGlvbihlKXtvKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFQdXNoOm5vdGlmaWNhdGlvblJlY2VpdmVkXCIsZSl9KX0scmVnaXN0ZXI6ZnVuY3Rpb24ocil7dmFyIG8sdD1lLmRlZmVyKCk7cmV0dXJuIHZvaWQgMCE9PXImJnZvaWQgMD09PXIuZWNiJiYobz1udWxsPT09ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltuZy1hcHBdXCIpP1wiZG9jdW1lbnQuYm9keVwiOlwiZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW25nLWFwcF0nKVwiLHIuZWNiPVwiYW5ndWxhci5lbGVtZW50KFwiK28rXCIpLmluamVjdG9yKCkuZ2V0KCckY29yZG92YVB1c2gnKS5vbk5vdGlmaWNhdGlvblwiKSxuLnBsdWdpbnMucHVzaE5vdGlmaWNhdGlvbi5yZWdpc3RlcihmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSxyKSx0LnByb21pc2V9LHVucmVnaXN0ZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMucHVzaE5vdGlmaWNhdGlvbi51bnJlZ2lzdGVyKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9LHIpLG8ucHJvbWlzZX0sc2V0QmFkZ2VOdW1iZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMucHVzaE5vdGlmaWNhdGlvbi5zZXRBcHBsaWNhdGlvbkljb25CYWRnZU51bWJlcihmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSxyKSxvLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnB1c2hfdjVcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhUHVzaFY1XCIsW1wiJHFcIixcIiRyb290U2NvcGVcIixcIiR0aW1lb3V0XCIsZnVuY3Rpb24oZSxuLHIpe3ZhciBvO3JldHVybntpbml0aWFsaXplOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbz1QdXNoTm90aWZpY2F0aW9uLmluaXQobiksci5yZXNvbHZlKG8pLHIucHJvbWlzZX0sb25Ob3RpZmljYXRpb246ZnVuY3Rpb24oKXtyKGZ1bmN0aW9uKCl7by5vbihcIm5vdGlmaWNhdGlvblwiLGZ1bmN0aW9uKGUpe24uJGVtaXQoXCIkY29yZG92YVB1c2hWNTpub3RpZmljYXRpb25SZWNlaXZlZFwiLGUpfSl9KX0sb25FcnJvcjpmdW5jdGlvbigpe3IoZnVuY3Rpb24oKXtvLm9uKFwiZXJyb3JcIixmdW5jdGlvbihlKXtuLiRlbWl0KFwiJGNvcmRvdmFQdXNoVjU6ZXJyb3JPY2N1cnJlZFwiLGUpfSl9KX0scmVnaXN0ZXI6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIHZvaWQgMD09PW8/bi5yZWplY3QobmV3IEVycm9yKFwiaW5pdCBtdXN0IGJlIGNhbGxlZCBiZWZvcmUgYW55IG90aGVyIG9wZXJhdGlvblwiKSk6by5vbihcInJlZ2lzdHJhdGlvblwiLGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlLnJlZ2lzdHJhdGlvbklkKX0pLG4ucHJvbWlzZX0sdW5yZWdpc3RlcjpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gdm9pZCAwPT09bz9uLnJlamVjdChuZXcgRXJyb3IoXCJpbml0IG11c3QgYmUgY2FsbGVkIGJlZm9yZSBhbnkgb3RoZXIgb3BlcmF0aW9uXCIpKTpvLnVucmVnaXN0ZXIoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sZ2V0QmFkZ2VOdW1iZXI6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIHZvaWQgMD09PW8/bi5yZWplY3QobmV3IEVycm9yKFwiaW5pdCBtdXN0IGJlIGNhbGxlZCBiZWZvcmUgYW55IG90aGVyIG9wZXJhdGlvblwiKSk6by5nZXRBcHBsaWNhdGlvbkljb25CYWRnZU51bWJlcihmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxzZXRCYWRnZU51bWJlcjpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIHZvaWQgMD09PW8/ci5yZWplY3QobmV3IEVycm9yKFwiaW5pdCBtdXN0IGJlIGNhbGxlZCBiZWZvcmUgYW55IG90aGVyIG9wZXJhdGlvblwiKSk6by5zZXRBcHBsaWNhdGlvbkljb25CYWRnZU51bWJlcihmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKSxyLnByb21pc2V9LGZpbmlzaDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gdm9pZCAwPT09bz9uLnJlamVjdChuZXcgRXJyb3IoXCJpbml0IG11c3QgYmUgY2FsbGVkIGJlZm9yZSBhbnkgb3RoZXIgb3BlcmF0aW9uXCIpKTpvLmZpbmlzaChmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5yZWNlbnRzQ29udHJvbFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFSZWNlbnRzXCIsZnVuY3Rpb24oKXtyZXR1cm57c2V0Q29sb3I6ZnVuY3Rpb24oZSl7cmV0dXJuIFJlY2VudHNDb250cm9sLnNldENvbG9yKGUpfSxzZXREZXNjcmlwdGlvbjpmdW5jdGlvbihlKXtyZXR1cm4gUmVjZW50c0NvbnRyb2wuc2V0RGVzY3JpcHRpb24oZSl9LHNldE9wdGlvbnM6ZnVuY3Rpb24oZSxuKXtyZXR1cm4gUmVjZW50c0NvbnRyb2wuc2V0T3B0aW9ucyhlLG4pfX19KSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnNjcmVlbnNob3RcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhU2NyZWVuc2hvdFwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2NhcHR1cmVUb0ZpbGU6ZnVuY3Rpb24obil7dmFyIHI9bnx8e30sbz1yLmV4dGVuc2lvbnx8XCJqcGdcIix0PXIucXVhbGl0eXx8XCIxMDBcIixpPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLnNjcmVlbnNob3Q/KG5hdmlnYXRvci5zY3JlZW5zaG90LnNhdmUoZnVuY3Rpb24oZSxuKXtlP2kucmVqZWN0KGUpOmkucmVzb2x2ZShuLmZpbGVQYXRoKX0sbyx0LHIuZmlsZW5hbWUpLGkucHJvbWlzZSk6KGkucmVzb2x2ZShudWxsKSxpLnByb21pc2UpfSxjYXB0dXJlVG9Vcmk6ZnVuY3Rpb24obil7dmFyIHI9bnx8e30sbz1yLmV4dGVuc2lvbnx8XCJqcGdcIix0PXIucXVhbGl0eXx8XCIxMDBcIixpPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLnNjcmVlbnNob3Q/KG5hdmlnYXRvci5zY3JlZW5zaG90LlVSSShmdW5jdGlvbihlLG4pe2U/aS5yZWplY3QoZSk6aS5yZXNvbHZlKG4uVVJJKX0sbyx0LHIuZmlsZW5hbWUpLGkucHJvbWlzZSk6KGkucmVzb2x2ZShudWxsKSxpLnByb21pc2UpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5zZXJpYWxcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhU2VyaWFsXCIsW1wiJHFcIixmdW5jdGlvbihlKXt2YXIgbj17fTtyZXR1cm4gbi5yZXF1ZXN0UGVybWlzc2lvbj1mdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIHNlcmlhbC5yZXF1ZXN0UGVybWlzc2lvbihuLGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxuLm9wZW49ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBzZXJpYWwub3BlbihuLGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxuLndyaXRlPWZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gc2VyaWFsLndyaXRlKG4sZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LG4ud3JpdGVIZXg9ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBzZXJpYWwud3JpdGVIZXgobixmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sbi5yZWFkPWZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBzZXJpYWwucmVhZChmdW5jdGlvbihlKXt2YXIgcj1uZXcgVWludDhBcnJheShlKTtuLnJlc29sdmUocil9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxuLnJlZ2lzdGVyUmVhZENhbGxiYWNrPWZ1bmN0aW9uKGUsbil7c2VyaWFsLnJlZ2lzdGVyUmVhZENhbGxiYWNrKGZ1bmN0aW9uKG4pe3ZhciByPW5ldyBVaW50OEFycmF5KG4pO2Uocil9LG4pfSxuLmNsb3NlPWZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBzZXJpYWwuY2xvc2UoZnVuY3Rpb24oKXtuLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9LG59XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5zbXNcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhU21zXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57c2VuZDpmdW5jdGlvbihuLHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBzbXMuc2VuZChuLHIsbyxmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSksdC5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5zb2NpYWxTaGFyaW5nXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVNvY2lhbFNoYXJpbmdcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3NoYXJlOmZ1bmN0aW9uKHIsbyx0LGkpe3ZhciBhPWUuZGVmZXIoKTtyZXR1cm4gbz1vfHxudWxsLHQ9dHx8bnVsbCxpPWl8fG51bGwsbi5wbHVnaW5zLnNvY2lhbHNoYXJpbmcuc2hhcmUocixvLHQsaSxmdW5jdGlvbigpe2EucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKCl7YS5yZWplY3QoITEpfSksYS5wcm9taXNlfSxzaGFyZVdpdGhPcHRpb25zOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnNvY2lhbHNoYXJpbmcuc2hhcmVXaXRoT3B0aW9ucyhyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCEwKX0sZnVuY3Rpb24oKXtvLnJlamVjdCghMSl9KSxvLnByb21pc2V9LHNoYXJlVmlhVHdpdHRlcjpmdW5jdGlvbihyLG8sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsdD10fHxudWxsLG4ucGx1Z2lucy5zb2NpYWxzaGFyaW5nLnNoYXJlVmlhVHdpdHRlcihyLG8sdCxmdW5jdGlvbigpe2kucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKCl7aS5yZWplY3QoITEpfSksaS5wcm9taXNlfSxzaGFyZVZpYVdoYXRzQXBwOmZ1bmN0aW9uKHIsbyx0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCx0PXR8fG51bGwsbi5wbHVnaW5zLnNvY2lhbHNoYXJpbmcuc2hhcmVWaWFXaGF0c0FwcChyLG8sdCxmdW5jdGlvbigpe2kucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKCl7aS5yZWplY3QoITEpfSksaS5wcm9taXNlfSxzaGFyZVZpYUZhY2Vib29rOmZ1bmN0aW9uKHIsbyx0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxvPW98fG51bGwsdD10fHxudWxsLG4ucGx1Z2lucy5zb2NpYWxzaGFyaW5nLnNoYXJlVmlhRmFjZWJvb2socixvLHQsZnVuY3Rpb24oKXtpLnJlc29sdmUoITApfSxmdW5jdGlvbigpe2kucmVqZWN0KCExKX0pLGkucHJvbWlzZX0sc2hhcmVWaWFGYWNlYm9va1dpdGhQYXN0ZU1lc3NhZ2VIaW50OmZ1bmN0aW9uKHIsbyx0LGkpe3ZhciBhPWUuZGVmZXIoKTtyZXR1cm4gbz1vfHxudWxsLHQ9dHx8bnVsbCxuLnBsdWdpbnMuc29jaWFsc2hhcmluZy5zaGFyZVZpYUZhY2Vib29rV2l0aFBhc3RlTWVzc2FnZUhpbnQocixvLHQsaSxmdW5jdGlvbigpe2EucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKCl7YS5yZWplY3QoITEpfSksYS5wcm9taXNlfSxzaGFyZVZpYVNNUzpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnNvY2lhbHNoYXJpbmcuc2hhcmVWaWFTTVMocixvLGZ1bmN0aW9uKCl7dC5yZXNvbHZlKCEwKX0sZnVuY3Rpb24oKXt0LnJlamVjdCghMSl9KSx0LnByb21pc2V9LHNoYXJlVmlhRW1haWw6ZnVuY3Rpb24ocixvLHQsaSxhLGMpe3ZhciB1PWUuZGVmZXIoKTtyZXR1cm4gdD10fHxudWxsLGk9aXx8bnVsbCxhPWF8fG51bGwsYz1jfHxudWxsLG4ucGx1Z2lucy5zb2NpYWxzaGFyaW5nLnNoYXJlVmlhRW1haWwocixvLHQsaSxhLGMsZnVuY3Rpb24oKXt1LnJlc29sdmUoITApfSxmdW5jdGlvbigpe3UucmVqZWN0KCExKX0pLHUucHJvbWlzZX0sc2hhcmVWaWE6ZnVuY3Rpb24ocixvLHQsaSxhKXt2YXIgYz1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCx0PXR8fG51bGwsaT1pfHxudWxsLGE9YXx8bnVsbCxuLnBsdWdpbnMuc29jaWFsc2hhcmluZy5zaGFyZVZpYShyLG8sdCxpLGEsZnVuY3Rpb24oKXtjLnJlc29sdmUoITApfSxmdW5jdGlvbigpe2MucmVqZWN0KCExKX0pLGMucHJvbWlzZX0sY2FuU2hhcmVWaWFFbWFpbDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnNvY2lhbHNoYXJpbmcuY2FuU2hhcmVWaWFFbWFpbChmdW5jdGlvbigpe3IucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoITEpfSksci5wcm9taXNlfSxjYW5TaGFyZVZpYTpmdW5jdGlvbihyLG8sdCxpLGEpe3ZhciBjPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnNvY2lhbHNoYXJpbmcuY2FuU2hhcmVWaWEocixvLHQsaSxhLGZ1bmN0aW9uKGUpe2MucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7Yy5yZWplY3QoZSl9KSxjLnByb21pc2V9LGF2YWlsYWJsZTpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gd2luZG93LnBsdWdpbnMuc29jaWFsc2hhcmluZy5hdmFpbGFibGUoZnVuY3Rpb24oZSl7ZT9uLnJlc29sdmUoKTpuLnJlamVjdCgpfSksbi5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5zcGlubmVyRGlhbG9nXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVNwaW5uZXJEaWFsb2dcIixbXCIkd2luZG93XCIsZnVuY3Rpb24oZSl7cmV0dXJue3Nob3c6ZnVuY3Rpb24obixyLG8sdCl7cmV0dXJuIG89b3x8ITEsZS5wbHVnaW5zLnNwaW5uZXJEaWFsb2cuc2hvdyhuLHIsbyx0KX0saGlkZTpmdW5jdGlvbigpe3JldHVybiBlLnBsdWdpbnMuc3Bpbm5lckRpYWxvZy5oaWRlKCl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnNwbGFzaHNjcmVlblwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFTcGxhc2hzY3JlZW5cIixbZnVuY3Rpb24oKXtyZXR1cm57aGlkZTpmdW5jdGlvbigpe3JldHVybiBuYXZpZ2F0b3Iuc3BsYXNoc2NyZWVuLmhpZGUoKX0sc2hvdzpmdW5jdGlvbigpe3JldHVybiBuYXZpZ2F0b3Iuc3BsYXNoc2NyZWVuLnNob3coKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuc3FsaXRlXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVNRTGl0ZVwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57b3BlbkRCOmZ1bmN0aW9uKGUscil7cmV0dXJuIGFuZ3VsYXIuaXNPYmplY3QoZSkmJiFhbmd1bGFyLmlzU3RyaW5nKGUpPyhcInVuZGVmaW5lZFwiIT10eXBlb2YgciYmKGUuYmdUeXBlPXIpLG4uc3FsaXRlUGx1Z2luLm9wZW5EYXRhYmFzZShlKSk6bi5zcWxpdGVQbHVnaW4ub3BlbkRhdGFiYXNlKHtuYW1lOmUsYmdUeXBlOnJ9KX0sZXhlY3V0ZTpmdW5jdGlvbihuLHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLnRyYW5zYWN0aW9uKGZ1bmN0aW9uKGUpe2UuZXhlY3V0ZVNxbChyLG8sZnVuY3Rpb24oZSxuKXt0LnJlc29sdmUobil9LGZ1bmN0aW9uKGUsbil7dC5yZWplY3Qobil9KX0pLHQucHJvbWlzZX0saW5zZXJ0Q29sbGVjdGlvbjpmdW5jdGlvbihuLHIsbyl7dmFyIHQ9ZS5kZWZlcigpLGk9by5zbGljZSgwKTtyZXR1cm4gbi50cmFuc2FjdGlvbihmdW5jdGlvbihlKXshZnVuY3Rpb24gbigpe3ZhciBvPWkuc3BsaWNlKDAsMSlbMF07dHJ5e2UuZXhlY3V0ZVNxbChyLG8sZnVuY3Rpb24oZSxyKXswPT09aS5sZW5ndGg/dC5yZXNvbHZlKHIpOm4oKX0sZnVuY3Rpb24oZSxuKXt0LnJlamVjdChuKX0pfWNhdGNoKGEpe3QucmVqZWN0KGEpfX0oKX0pLHQucHJvbWlzZX0sbmVzdGVkRXhlY3V0ZTpmdW5jdGlvbihuLHIsbyx0LGkpe3ZhciBhPWUuZGVmZXIoKTtyZXR1cm4gbi50cmFuc2FjdGlvbihmdW5jdGlvbihlKXtlLmV4ZWN1dGVTcWwocix0LGZ1bmN0aW9uKGUsbil7YS5yZXNvbHZlKG4pLGUuZXhlY3V0ZVNxbChvLGksZnVuY3Rpb24oZSxuKXthLnJlc29sdmUobil9KX0pfSxmdW5jdGlvbihlLG4pe2EucmVqZWN0KG4pfSksYS5wcm9taXNlfSxkZWxldGVEQjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uc3FsaXRlUGx1Z2luLmRlbGV0ZURhdGFiYXNlKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuc3RhdHVzYmFyXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVN0YXR1c2JhclwiLFtmdW5jdGlvbigpe3JldHVybntvdmVybGF5c1dlYlZpZXc6ZnVuY3Rpb24oZSl7cmV0dXJuIFN0YXR1c0Jhci5vdmVybGF5c1dlYlZpZXcoISFlKX0sU1RZTEVTOntERUZBVUxUOjAsTElHSFRfQ09OVEVOVDoxLEJMQUNLX1RSQU5TTFVDRU5UOjIsQkxBQ0tfT1BBUVVFOjN9LHN0eWxlOmZ1bmN0aW9uKGUpe3N3aXRjaChlKXtjYXNlIDA6cmV0dXJuIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtjYXNlIDE6cmV0dXJuIFN0YXR1c0Jhci5zdHlsZUxpZ2h0Q29udGVudCgpO2Nhc2UgMjpyZXR1cm4gU3RhdHVzQmFyLnN0eWxlQmxhY2tUcmFuc2x1Y2VudCgpO2Nhc2UgMzpyZXR1cm4gU3RhdHVzQmFyLnN0eWxlQmxhY2tPcGFxdWUoKTtkZWZhdWx0OnJldHVybiBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCl9fSxzdHlsZUNvbG9yOmZ1bmN0aW9uKGUpe3JldHVybiBTdGF0dXNCYXIuYmFja2dyb3VuZENvbG9yQnlOYW1lKGUpfSxzdHlsZUhleDpmdW5jdGlvbihlKXtyZXR1cm4gU3RhdHVzQmFyLmJhY2tncm91bmRDb2xvckJ5SGV4U3RyaW5nKGUpfSxoaWRlOmZ1bmN0aW9uKCl7cmV0dXJuIFN0YXR1c0Jhci5oaWRlKCl9LHNob3c6ZnVuY3Rpb24oKXtyZXR1cm4gU3RhdHVzQmFyLnNob3coKX0saXNWaXNpYmxlOmZ1bmN0aW9uKCl7cmV0dXJuIFN0YXR1c0Jhci5pc1Zpc2libGV9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnRvYXN0XCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVRvYXN0XCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntzaG93U2hvcnRUb3A6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMudG9hc3Quc2hvd1Nob3J0VG9wKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sc2hvd1Nob3J0Q2VudGVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnRvYXN0LnNob3dTaG9ydENlbnRlcihyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHNob3dTaG9ydEJvdHRvbTpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy50b2FzdC5zaG93U2hvcnRCb3R0b20ocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxzaG93TG9uZ1RvcDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy50b2FzdC5zaG93TG9uZ1RvcChyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHNob3dMb25nQ2VudGVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnRvYXN0LnNob3dMb25nQ2VudGVyKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sc2hvd0xvbmdCb3R0b206ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMudG9hc3Quc2hvd0xvbmdCb3R0b20ocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxzaG93V2l0aE9wdGlvbnM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMudG9hc3Quc2hvd1dpdGhPcHRpb25zKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sc2hvdzpmdW5jdGlvbihyLG8sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMudG9hc3Quc2hvdyhyLG8sdCxmdW5jdGlvbihlKXtpLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2kucmVqZWN0KGUpfSksaS5wcm9taXNlfSxoaWRlOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3RyeXtuLnBsdWdpbnMudG9hc3QuaGlkZSgpLHIucmVzb2x2ZSgpfWNhdGNoKG8pe3IucmVqZWN0KG8mJm8ubWVzc2FnZSl9cmV0dXJuIHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMudG91Y2hpZFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFUb3VjaElEXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57Y2hlY2tTdXBwb3J0OmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiB3aW5kb3cuY29yZG92YT90b3VjaGlkLmNoZWNrU3VwcG9ydChmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSk6bi5yZWplY3QoXCJOb3Qgc3VwcG9ydGVkIHdpdGhvdXQgY29yZG92YS5qc1wiKSxuLnByb21pc2V9LGF1dGhlbnRpY2F0ZTpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIHdpbmRvdy5jb3Jkb3ZhP3RvdWNoaWQuYXV0aGVudGljYXRlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LG4pOnIucmVqZWN0KFwiTm90IHN1cHBvcnRlZCB3aXRob3V0IGNvcmRvdmEuanNcIiksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy50dHNcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhVFRTXCIsZnVuY3Rpb24oKXtyZXR1cm57c3BlYWs6ZnVuY3Rpb24oZSxuLHIpe3JldHVybiBUVFMuc3BlYWsoZSxuLHIpfX19KSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnVwc1B1c2hcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhVXBzUHVzaFwiLFtcIiRxXCIsXCIkd2luZG93XCIsXCIkcm9vdFNjb3BlXCIsXCIkdGltZW91dFwiLGZ1bmN0aW9uKGUsbixyLG8pe3JldHVybntyZWdpc3RlcjpmdW5jdGlvbih0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIG4ucHVzaC5yZWdpc3RlcihmdW5jdGlvbihlKXtvKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFVcHNQdXNoOm5vdGlmaWNhdGlvblJlY2VpdmVkXCIsZSl9KX0sZnVuY3Rpb24oKXtpLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7aS5yZWplY3QoZSl9LHQpLGkucHJvbWlzZX0sdW5yZWdpc3RlcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucHVzaC51bnJlZ2lzdGVyKGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSxyKSxvLnByb21pc2V9LHNldEJhZGdlTnVtYmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wdXNoLnNldEFwcGxpY2F0aW9uSWNvbkJhZGdlTnVtYmVyKGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LHIpLG8ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMudmlicmF0aW9uXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVZpYnJhdGlvblwiLFtmdW5jdGlvbigpe3JldHVybnt2aWJyYXRlOmZ1bmN0aW9uKGUpe3JldHVybiBuYXZpZ2F0b3Iubm90aWZpY2F0aW9uLnZpYnJhdGUoZSl9LHZpYnJhdGVXaXRoUGF0dGVybjpmdW5jdGlvbihlLG4pe3JldHVybiBuYXZpZ2F0b3Iubm90aWZpY2F0aW9uLnZpYnJhdGVXaXRoUGF0dGVybihlLG4pfSxjYW5jZWxWaWJyYXRpb246ZnVuY3Rpb24oKXtyZXR1cm4gbmF2aWdhdG9yLm5vdGlmaWNhdGlvbi5jYW5jZWxWaWJyYXRpb24oKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMudmlkZW9DYXB0dXJlUGx1c1wiLFtdKS5wcm92aWRlcihcIiRjb3Jkb3ZhVmlkZW9DYXB0dXJlUGx1c1wiLFtmdW5jdGlvbigpe3ZhciBlPXt9O3RoaXMuc2V0TGltaXQ9ZnVuY3Rpb24obil7ZS5saW1pdD1ufSx0aGlzLnNldE1heER1cmF0aW9uPWZ1bmN0aW9uKG4pe2UuZHVyYXRpb249bn0sdGhpcy5zZXRIaWdoUXVhbGl0eT1mdW5jdGlvbihuKXtlLmhpZ2hxdWFsaXR5PW59LHRoaXMudXNlRnJvbnRDYW1lcmE9ZnVuY3Rpb24obil7ZS5mcm9udGNhbWVyYT1ufSx0aGlzLnNldFBvcnRyYWl0T3ZlcmxheT1mdW5jdGlvbihuKXtlLnBvcnRyYWl0T3ZlcmxheT1ufSx0aGlzLnNldExhbmRzY2FwZU92ZXJsYXk9ZnVuY3Rpb24obil7ZS5sYW5kc2NhcGVPdmVybGF5PW59LHRoaXMuc2V0T3ZlcmxheVRleHQ9ZnVuY3Rpb24obil7ZS5vdmVybGF5VGV4dD1ufSx0aGlzLiRnZXQ9W1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihuLHIpe3JldHVybntjYXB0dXJlVmlkZW86ZnVuY3Rpb24obyl7dmFyIHQ9bi5kZWZlcigpO3JldHVybiByLnBsdWdpbnMudmlkZW9jYXB0dXJlcGx1cz8oci5wbHVnaW5zLnZpZGVvY2FwdHVyZXBsdXMuY2FwdHVyZVZpZGVvKHQucmVzb2x2ZSx0LnJlamVjdCxhbmd1bGFyLmV4dGVuZCh7fSxlLG8pKSx0LnByb21pc2UpOih0LnJlc29sdmUobnVsbCksdC5wcm9taXNlKX19fV19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy56aXBcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhWmlwXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybnt1bnppcDpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi56aXAudW56aXAocixvLGZ1bmN0aW9uKGUpezA9PT1lP3QucmVzb2x2ZSgpOnQucmVqZWN0KCl9LGZ1bmN0aW9uKGUpe3Qubm90aWZ5KGUpfSksdC5wcm9taXNlfX19XSl9KCk7IiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImFkZENoaWxkQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAvL2JhY2tidXR0b25cbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XG4gICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpXG4gIH1cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJhc3NpZ25DaG9yZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gYXNzaWduIGNob3JlIGNvbnRyb2xsZXJcIlxuXG59KVxuIiwibW9kdWxlLmNvbnRyb2xsZXIoJ2NhbWVyYUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRjb3Jkb3ZhQ2FtZXJhKSB7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRldmljZXJlYWR5XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICRjb3Jkb3ZhUGx1Z2luLnNvbWVGdW5jdGlvbigpLnRoZW4oc3VjY2VzcywgZXJyb3IpO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIC8vIE9SIHdpdGggSU9OSUNcblxuICAgICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgJGNvcmRvdmFQbHVnaW4uc29tZUZ1bmN0aW9uKCkudGhlbihzdWNjZXNzLCBlcnJvcik7XG4gICAgfSk7XG5cbiAgJHNjb3BlLnRha2VQaWN0dXJlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICBxdWFsaXR5OiA1MCxcbiAgICAgIGRlc3RpbmF0aW9uVHlwZTogQ2FtZXJhLkRlc3RpbmF0aW9uVHlwZS5EQVRBX1VSTCxcbiAgICAgIHNvdXJjZVR5cGU6IENhbWVyYS5QaWN0dXJlU291cmNlVHlwZS5DQU1FUkEsXG4gICAgICBhbGxvd0VkaXQ6IGZhbHNlLFxuICAgICAgZW5jb2RpbmdUeXBlOiBDYW1lcmEuRW5jb2RpbmdUeXBlLkpQRUcsXG4gICAgICB0YXJnZXRXaWR0aDogMzAwLFxuICAgICAgdGFyZ2V0SGVpZ2h0OiAzMDAsXG4gICAgICBwb3BvdmVyT3B0aW9uczogQ2FtZXJhUG9wb3Zlck9wdGlvbnMsXG4gICAgICBzYXZlVG9QaG90b0FsYnVtOiBmYWxzZSxcblx0ICAgIGNvcnJlY3RPcmllbnRhdGlvbjp0cnVlXG4gICAgfTtcblxuICAgICRjb3Jkb3ZhQ2FtZXJhLmdldFBpY3R1cmUob3B0aW9ucykudGhlbihmdW5jdGlvbihpbWFnZURhdGEpIHtcbiAgICAgICRzY29wZS5pbWdVUkkgPSBcImRhdGE6aW1hZ2UvanBlZztiYXNlNjQsXCIgKyBpbWFnZURhdGE7XG4gICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAvLyBlcnJvclxuICAgIH0pO1xuXG4gIH07XG4gIH0sIGZhbHNlKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJjaGlsZEJhbmtDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIGJhbmsgY29udHJvbGxlclwiXG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiY2hpbGRIb21lQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsKXtcbiAgLy8gJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSAgY2hpbGQgSG9tZSBjb250cm9sbGVyXCJcbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCd0aGVtZU1vZGFsLmh0bWwnLCB7XG4gICAgc2NvcGU6ICRzY29wZSxcbiAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICRzY29wZS5tb2RhbCA9IG1vZGFsO1xuICB9KTtcbiAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5zaG93KCk7XG4gIH07XG4gICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcbiAgfTtcbiAgLy8gQ2xlYW51cCB0aGUgbW9kYWwgd2hlbiB3ZSdyZSBkb25lIHdpdGggaXQhXG4gICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuICB9KTtcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gaGlkZSBtb2RhbFxuICAkc2NvcGUuJG9uKCdtb2RhbC5oaWRkZW4nLCBmdW5jdGlvbigpIHtcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxuICB9KTtcbiAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gcmVtb3ZlIG1vZGFsXG4gICRzY29wZS4kb24oJ21vZGFsLnJlbW92ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAvLyBFeGVjdXRlIGFjdGlvblxuICB9KTtcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJjaGlsZExvZ2luQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRhdXRoLCAkc3RhdGUsIGNoaWxkTG9naW5TZXJ2aWNlKXtcbiAgLy8gICRzY29wZS50ZXN0ID0gXCJNZXNzYWdlIGZyb20gY2hpbGQgTG9naW4gY29udHJvbGxlclwiXG5cbiAgICRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uKHVzZXIpe1xuICAgIC8vICBjb25zb2xlLmxvZyh1c2VyKVxuICAgICBjaGlsZExvZ2luU2VydmljZS51c2VyTG9naW4odXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAvLyAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgJGF1dGguc2V0VG9rZW4ocmVzcG9uc2UpXG4gICAgICAgICAkc3RhdGUuZ28oJ2NoaWxkSG9tZScpXG5cbiAgICAgfSlcbiAgIH1cbiAgICRzY29wZS5hdXRoZW50aWNhdGUgPSBmdW5jdGlvbihwcm92aWRlcikge1xuICAgJGF1dGguYXV0aGVudGljYXRlKHByb3ZpZGVyKX07XG4gICAvLyAkc2NvcGUudGVzdCA9IFwiSGVsbG8gZnJvbSBsb2dpbiBjb250cm9sbGVyXCJcbiAgICRzY29wZS5yZXZlYWxlciA9IGZ1bmN0aW9uKCl7XG4gICAkc2NvcGUuaGlkZSA9ICEkc2NvcGUuaGlkZTtcblxuICB9XG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImVkaXRDaGlsZEN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XG4gICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpXG4gIH1cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJoaXN0b3J5Q3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBIaXN0b3J5IGNvbnRyb2xsZXJcIlxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImhvbWVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwsdXNlclNlcnZpY2Upe1xuICAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBIb21lIGNvbnRyb2xsZXJcIlxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdiYW5uZXJNb2RhbC5odG1sJywge1xuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm1vZGFsID0gbW9kYWw7XG4gICB9KTtcbiAgICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAgJHNjb3BlLm1vZGFsLnNob3coKTtcbiAgIH07XG4gICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICAkc2NvcGUubW9kYWwuaGlkZSgpO1xuICAgfTtcbiAgIC8vIENsZWFudXAgdGhlIG1vZGFsIHdoZW4gd2UncmUgZG9uZSB3aXRoIGl0IVxuICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgJHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuICAgfSk7XG4gICAvLyBFeGVjdXRlIGFjdGlvbiBvbiBoaWRlIG1vZGFsXG4gICAkc2NvcGUuJG9uKCdtb2RhbC5oaWRkZW4nLCBmdW5jdGlvbigpIHtcbiAgICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgIH0pO1xuICAgLy8gRXhlY3V0ZSBhY3Rpb24gb24gcmVtb3ZlIG1vZGFsXG4gICAkc2NvcGUuJG9uKCdtb2RhbC5yZW1vdmVkJywgZnVuY3Rpb24oKSB7XG4gICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gICB9KTtcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJsb2dpbkN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkYXV0aCwgJHN0YXRlLCBsb2dpblNlcnZpY2Upe1xuXG4kc2NvcGUubG9naW4gPSBmdW5jdGlvbih1c2VyKXtcbiAgLy8gY29uc29sZS5sb2codXNlcilcbiAgbG9naW5TZXJ2aWNlLnVzZXJMb2dpbih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAkYXV0aC5zZXRUb2tlbihyZXNwb25zZSlcbiAgICAgICRzdGF0ZS5nbygnaG9tZScpXG5cbiAgfSlcbn1cbiRzY29wZS5tYWtlVXNlciA9IGZ1bmN0aW9uKG5ld1VzZXIpe1xuICBsb2dpblNlcnZpY2UubWFrZVVzZXIobmV3VXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgJGF1dGguc2V0VG9rZW4ocmVzcG9uc2UpXG4gICAgICAkc3RhdGUuZ28oJ2hvbWUnKVxuICB9KVxufVxuICAkc2NvcGUuYXV0aGVudGljYXRlID0gZnVuY3Rpb24ocHJvdmlkZXIpIHtcbiAgJGF1dGguYXV0aGVudGljYXRlKHByb3ZpZGVyKX07XG4gIC8vICRzY29wZS50ZXN0ID0gXCJIZWxsbyBmcm9tIGxvZ2luIGNvbnRyb2xsZXJcIlxuICAkc2NvcGUucmV2ZWFsZXIgPSBmdW5jdGlvbigpe1xuICAkc2NvcGUuaGlkZSA9ICEkc2NvcGUuaGlkZTtcblxuIH1cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJtYWtlQ2hvcmVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxuICB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwic2V0UmV3YXJkc0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCl7XG4gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgncmV3YXJkTW9kYWwuaHRtbCcsIHtcbiAgICBzY29wZTogJHNjb3BlLFxuICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgJHNjb3BlLm1vZGFsID0gbW9kYWw7XG4gIH0pO1xuICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLnNob3coKTtcbiAgfTtcbiAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwuaGlkZSgpO1xuICB9O1xuICAvLyBDbGVhbnVwIHRoZSBtb2RhbCB3aGVuIHdlJ3JlIGRvbmUgd2l0aCBpdCFcbiAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwucmVtb3ZlKCk7XG4gIH0pO1xuICAvLyBFeGVjdXRlIGFjdGlvbiBvbiBoaWRlIG1vZGFsXG4gICRzY29wZS4kb24oJ21vZGFsLmhpZGRlbicsIGZ1bmN0aW9uKCkge1xuICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gIH0pO1xuICAvLyBFeGVjdXRlIGFjdGlvbiBvbiByZW1vdmUgbW9kYWxcbiAgJHNjb3BlLiRvbignbW9kYWwucmVtb3ZlZCcsIGZ1bmN0aW9uKCkge1xuICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gIH0pO1xuICAvL2JhY2tidXR0b25cbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XG4gICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpXG4gIH1cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJzZXR0aW5nc0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCl7XG4gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnY2hhbmdlUGFzc3dvcmQuaHRtbCcsIHtcbiAgICAgaWQ6ICcxJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWwxID0gbW9kYWw7XG4gICB9KTtcblxuICAgLy8gTW9kYWwgMlxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdjaGFuZ2VIb3VzZWhvbGQuaHRtbCcsIHtcbiAgICAgaWQ6ICcyJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWwyID0gbW9kYWw7XG4gICB9KTtcblxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdjaGFuZ2VaaXAuaHRtbCcsIHtcbiAgICAgaWQ6ICczJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWwzID0gbW9kYWw7XG4gICB9KTtcblxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdhZGRQYXJlbnQuaHRtbCcsIHtcbiAgICAgaWQ6ICc0JywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWw0ID0gbW9kYWw7XG4gICB9KTtcblxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdyZW1vdmVDaGlsZC5odG1sJywge1xuICAgICBpZDogJzUnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDUgPSBtb2RhbDtcbiAgIH0pO1xuXG5cblxuICAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgIGlmIChpbmRleCA9PSAxKSAkc2NvcGUub01vZGFsMS5zaG93KCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMikgJHNjb3BlLm9Nb2RhbDIuc2hvdygpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDMpICRzY29wZS5vTW9kYWwzLnNob3coKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSA0KSAkc2NvcGUub01vZGFsNC5zaG93KCk7XG4gICAgIGVsc2UgJHNjb3BlLm9Nb2RhbDUuc2hvdygpO1xuICAgfTtcblxuICAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICBpZiAoaW5kZXggPT0gMSkgJHNjb3BlLm9Nb2RhbDEuaGlkZSgpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDIpICRzY29wZS5vTW9kYWwyLmhpZGUoKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSAzKSAkc2NvcGUub01vZGFsMy5oaWRlKCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gNCkgJHNjb3BlLm9Nb2RhbDQuaGlkZSgpO1xuICAgICBlbHNlICRzY29wZS5vTW9kYWw1LmhpZGUoKTtcbiAgIH07XG5cbiAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICRzY29wZS5vTW9kYWwxLnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsMi5yZW1vdmUoKTtcbiAgICAgJHNjb3BlLm9Nb2RhbDMucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWw0LnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsNS5yZW1vdmUoKTtcbiAgIH0pO1xuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcInRyYWNrZXJDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwpe1xuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3BpY0NvbmZNb2RhbC5odG1sJywge1xuICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAkc2NvcGUubW9kYWwgPSBtb2RhbDtcbiAgfSk7XG4gICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwuc2hvdygpO1xuICB9O1xuICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gIH07XG4gIC8vIENsZWFudXAgdGhlIG1vZGFsIHdoZW4gd2UncmUgZG9uZSB3aXRoIGl0IVxuICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5yZW1vdmUoKTtcbiAgfSk7XG4gIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIGhpZGUgbW9kYWxcbiAgJHNjb3BlLiRvbignbW9kYWwuaGlkZGVuJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgfSk7XG4gIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIHJlbW92ZSBtb2RhbFxuICAkc2NvcGUuJG9uKCdtb2RhbC5yZW1vdmVkJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgfSk7XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwidXNlckluZm9DdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIGluZm8gY29udHJvbGxlclwiXG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5zZXJ2aWNlKCdsb2dpblNlcnZpY2UnLCBmdW5jdGlvbigkaHR0cCl7XG5cblxuICB0aGlzLnVzZXJMb2dpbiA9IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICAvLyBjb25zb2xlLmxvZyh1c2VyLCBcInNlcnZpY2VcIilcbiAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIHVybDogJy9hdXRoL2xvZ2luJyxcbiAgICAgIGRhdGE6IHVzZXJcbiAgICB9KVxuICB9XG4gIHRoaXMubWFrZVVzZXIgPSBmdW5jdGlvbihuZXdVc2VyKSB7XG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB1cmw6ICcvYXV0aC9zaWdudXAnLFxuICAgICAgZGF0YTogbmV3VXNlclxuICAgIH0pXG4gIH1cbn0pIC8vIGVuZCBvZiBzZXJ2aWNlXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5zZXJ2aWNlKCd1c2VyU2VydmljZScsIGZ1bmN0aW9uKCRodHRwLCRxLCRhdXRoKXtcblxuXG50aGlzLmdldFVzZXJJbmZvID0gJGF1dGguZ2V0UGF5bG9hZCgpO1xuXG5jb25zb2xlLmxvZyh0aGlzLmdldFVzZXJJbmZvKTtcblxuY29uc29sZS5sb2coJ2hlbGxvIGZyb20gc2VydmljZScpO1xuXG5cblxuXG59KTsvL2VuZCBvZiBzZXJ2aWNlXG4iXX0=
