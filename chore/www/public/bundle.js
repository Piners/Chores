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
"use strict";

angular.module('chore').controller("childBankCtrl", function ($scope) {
   $scope.test = "Message from bank controller";
});
'use strict';

angular.module('chore').controller("childHomeCtrl", function ($scope, $ionicModal) {
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
  $ionicModal.fromTemplateUrl('takePictureModal.html', {
    id: '2', // We need to use and ID to identify the modal that is firing the event!
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.oModal2 = modal;
  });
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5nLWNvcmRvdmEubWluLmpzIiwiY29udHJvbGxlcnMvYWRkQ2hpbGRDdHJsLmpzIiwiY29udHJvbGxlcnMvYXNzaWduQ2hvcmVDdHJsLmpzIiwiY29udHJvbGxlcnMvY2FtZXJhQ3RybC5qcyIsImNvbnRyb2xsZXJzL2NoaWxkQmFua0N0cmwuanMiLCJjb250cm9sbGVycy9jaGlsZEhvbWVDdHJsLmpzIiwiY29udHJvbGxlcnMvY2hpbGRMb2dpbkN0cmwuanMiLCJjb250cm9sbGVycy9lZGl0Q2hpbGRDdHJsLmpzIiwiY29udHJvbGxlcnMvaGlzdG9yeUN0cmwuanMiLCJjb250cm9sbGVycy9ob21lQ3RybC5qcyIsImNvbnRyb2xsZXJzL2xvZ2luQ3RybC5qcyIsImNvbnRyb2xsZXJzL21ha2VDaG9yZUN0cmwuanMiLCJjb250cm9sbGVycy9zZXRSZXdhcmRzQ3RybC5qcyIsImNvbnRyb2xsZXJzL3NldHRpbmdzQ3RybC5qcyIsImNvbnRyb2xsZXJzL3RyYWNrZXJDdHJsLmpzIiwiY29udHJvbGxlcnMvdXNlckluZm9DdHJsLmpzIiwic2VydmljZS9sb2dpblNlcnZpY2UuanMiLCJzZXJ2aWNlL3VzZXJTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJmYWN0b3J5IiwiZSIsIm4iLCJyIiwibyIsInR5cGUiLCJpc0F2YWlsYWJsZSIsImRlZmVyIiwid2luZG93IiwiY29yZG92YSIsIlRocmVlRGVlVG91Y2giLCJyZXNvbHZlIiwicmVqZWN0IiwicHJvbWlzZSIsImFkZFF1aWNrQWN0aW9uIiwidCIsImkiLCJhIiwiYyIsInUiLCJzIiwibCIsImYiLCJ0aXRsZSIsInN1YnRpdGxlIiwiaWNvblR5cGUiLCJpY29uVGVtcGxhdGUiLCJ0aGVuIiwicHVzaCIsImNvbmZpZ3VyZVF1aWNrQWN0aW9ucyIsIm9uSG9tZUljb25QcmVzc2VkIiwiYWRkUXVpY2tBY3Rpb25IYW5kbGVyIiwiZW5hYmxlTGlua1ByZXZpZXciLCJhZGRGb3JjZVRvdWNoSGFuZGxlciIsIndhdGNoRm9yY2VUb3VjaGVzIiwic2hvdyIsInBsdWdpbnMiLCJhY3Rpb25zaGVldCIsImhpZGUiLCJjcmVhdGVCYW5uZXJWaWV3IiwiQWRNb2IiLCJjcmVhdGVJbnRlcnN0aXRpYWxWaWV3IiwicmVxdWVzdEFkIiwic2hvd0FkIiwicmVxdWVzdEludGVyc3RpdGlhbEFkIiwiY2hlY2siLCJhcHBBdmFpbGFiaWxpdHkiLCJwcm92aWRlciIsInNldFByZWZlcmVuY2VzIiwiaXNPYmplY3QiLCJBcHBSYXRlIiwicHJlZmVyZW5jZXMiLCJ1c2VMYW5ndWFnZSIsImxhbmd1YWdlIiwiZGlzcGxheUFwcE5hbWUiLCJhcHBOYW1lIiwicHJvbXB0QWdhaW5Gb3JFYWNoTmV3VmVyc2lvbiIsInByb21wdEZvck5ld1ZlcnNpb24iLCJvcGVuU3RvcmVJbkFwcCIsInVzZXNVbnRpbFByb21wdCIsInVzZUN1c3RvbVJhdGVEaWFsb2ciLCJzdG9yZUFwcFVSTCIsImlvcyIsImlvc1VSTCIsImFuZHJvaWQiLCJhbmRyb2lkVVJMIiwiYmxhY2tiZXJyeSIsImJsYWNrYmVycnlVUkwiLCJ3aW5kb3dzOCIsIndpbmRvd3NVUkwiLCJzZXRDdXN0b21Mb2NhbGUiLCJtZXNzYWdlIiwiY2FuY2VsQnV0dG9uTGFiZWwiLCJsYXRlckJ1dHRvbkxhYmVsIiwicmF0ZUJ1dHRvbkxhYmVsIiwiZXh0ZW5kIiwiY3VzdG9tTG9jYWxlIiwiJGdldCIsInByb21wdEZvclJhdGluZyIsIm5hdmlnYXRlVG9BcHBTdG9yZSIsIm9uQnV0dG9uQ2xpY2tlZCIsImNhbGxiYWNrcyIsImJpbmQiLCJvblJhdGVEaWFsb2dTaG93IiwiZ2V0QXBwTmFtZSIsImdldEFwcFZlcnNpb24iLCJnZXRQYWNrYWdlTmFtZSIsImdldFZlcnNpb25OdW1iZXIiLCJnZXRWZXJzaW9uQ29kZSIsImluaXQiLCJuYXZpZ2F0b3IiLCJnZW9sb2NhdGlvbiIsImdldEN1cnJlbnRQb3NpdGlvbiIsImNvbmZpZ3VyZSIsImJhY2tncm91bmRHZW9Mb2NhdGlvbiIsIm5vdGlmeSIsImZpbmlzaCIsInN0YXJ0Iiwic3RvcCIsImhhc1Blcm1pc3Npb24iLCJub3RpZmljYXRpb24iLCJiYWRnZSIsInByb21wdEZvclBlcm1pc3Npb24iLCJzZXQiLCJnZXQiLCJjbGVhciIsImluY3JlYXNlIiwiZGVjcmVhc2UiLCJzY2FuIiwiYmFyY29kZVNjYW5uZXIiLCJlbmNvZGUiLCIkYnJvYWRjYXN0IiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiYmF0dGVyeSIsInJ1biIsImxvY2F0aW9uTWFuYWdlciIsIkRlbGVnYXRlIiwiZGlkRGV0ZXJtaW5lU3RhdGVGb3JSZWdpb24iLCJkaWRTdGFydE1vbml0b3JpbmdGb3JSZWdpb24iLCJkaWRFeGl0UmVnaW9uIiwiZGlkRW50ZXJSZWdpb24iLCJkaWRSYW5nZUJlYWNvbnNJblJlZ2lvbiIsInBlcmlwaGVyYWxNYW5hZ2VyRGlkU3RhcnRBZHZlcnRpc2luZyIsInBlcmlwaGVyYWxNYW5hZ2VyRGlkVXBkYXRlU3RhdGUiLCJkaWRDaGFuZ2VBdXRob3JpemF0aW9uU3RhdHVzIiwic2V0RGVsZWdhdGUiLCJzZXRDYWxsYmFja0RpZERldGVybWluZVN0YXRlRm9yUmVnaW9uIiwic2V0Q2FsbGJhY2tEaWRTdGFydE1vbml0b3JpbmdGb3JSZWdpb24iLCJzZXRDYWxsYmFja0RpZEV4aXRSZWdpb24iLCJzZXRDYWxsYmFja0RpZEVudGVyUmVnaW9uIiwic2V0Q2FsbGJhY2tEaWRSYW5nZUJlYWNvbnNJblJlZ2lvbiIsInNldENhbGxiYWNrUGVyaXBoZXJhbE1hbmFnZXJEaWRTdGFydEFkdmVydGlzaW5nIiwic2V0Q2FsbGJhY2tQZXJpcGhlcmFsTWFuYWdlckRpZFVwZGF0ZVN0YXRlIiwic2V0Q2FsbGJhY2tEaWRDaGFuZ2VBdXRob3JpemF0aW9uU3RhdHVzIiwiY3JlYXRlQmVhY29uUmVnaW9uIiwiQmVhY29uUmVnaW9uIiwiaXNCbHVldG9vdGhFbmFibGVkIiwid2hlbiIsImVuYWJsZUJsdWV0b290aCIsImRpc2FibGVCbHVldG9vdGgiLCJzdGFydE1vbml0b3JpbmdGb3JSZWdpb24iLCJzdG9wTW9uaXRvcmluZ0ZvclJlZ2lvbiIsInJlcXVlc3RTdGF0ZUZvclJlZ2lvbiIsInN0YXJ0UmFuZ2luZ0JlYWNvbnNJblJlZ2lvbiIsInN0b3BSYW5naW5nQmVhY29uc0luUmVnaW9uIiwiZ2V0QXV0aG9yaXphdGlvblN0YXR1cyIsInJlcXVlc3RXaGVuSW5Vc2VBdXRob3JpemF0aW9uIiwicmVxdWVzdEFsd2F5c0F1dGhvcml6YXRpb24iLCJnZXRNb25pdG9yZWRSZWdpb25zIiwiZ2V0UmFuZ2VkUmVnaW9ucyIsImlzUmFuZ2luZ0F2YWlsYWJsZSIsImlzTW9uaXRvcmluZ0F2YWlsYWJsZUZvckNsYXNzIiwic3RhcnRBZHZlcnRpc2luZyIsInN0b3BBZHZlcnRpc2luZyIsImlzQWR2ZXJ0aXNpbmdBdmFpbGFibGUiLCJpc0FkdmVydGlzaW5nIiwiZGlzYWJsZURlYnVnTG9ncyIsImVuYWJsZURlYnVnTm90aWZpY2F0aW9ucyIsImRpc2FibGVEZWJ1Z05vdGlmaWNhdGlvbnMiLCJlbmFibGVEZWJ1Z0xvZ3MiLCJhcHBlbmRUb0RldmljZUxvZyIsImJsZSIsInN0YXJ0U2NhbiIsInN0b3BTY2FuIiwiY29ubmVjdCIsImRpc2Nvbm5lY3QiLCJyZWFkIiwid3JpdGUiLCJ3cml0ZVdpdGhvdXRSZXNwb25zZSIsIndyaXRlQ29tbWFuZCIsIndhcm5pbmciLCJzdGFydE5vdGlmaWNhdGlvbiIsInN0b3BOb3RpZmljYXRpb24iLCJpc0Nvbm5lY3RlZCIsImVuYWJsZSIsImlzRW5hYmxlZCIsImJsdWV0b290aFNlcmlhbCIsImNvbm5lY3RJbnNlY3VyZSIsImxpc3QiLCJkaXNjb3ZlclVucGFpcmVkIiwic2V0RGV2aWNlRGlzY292ZXJlZExpc3RlbmVyIiwiY2xlYXJEZXZpY2VEaXNjb3ZlcmVkTGlzdGVuZXIiLCJzaG93Qmx1ZXRvb3RoU2V0dGluZ3MiLCJhdmFpbGFibGUiLCJyZWFkVW50aWwiLCJzdWJzY3JpYmUiLCJzdWJzY3JpYmVSYXdEYXRhIiwidW5zdWJzY3JpYmUiLCJ1bnN1YnNjcmliZVJhd0RhdGEiLCJyZWFkUlNTSSIsImJyaWdodG5lc3MiLCJnZXRCcmlnaHRuZXNzIiwic2V0QnJpZ2h0bmVzcyIsInNldEtlZXBTY3JlZW5PbiIsImNyZWF0ZUNhbGVuZGFyIiwiY2FsZW5kYXIiLCJnZXRDcmVhdGVDYWxlbmRhck9wdGlvbnMiLCJjYWxlbmRhck5hbWUiLCJkZWxldGVDYWxlbmRhciIsImNyZWF0ZUV2ZW50IiwibG9jYXRpb24iLCJub3RlcyIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJEYXRlIiwiY3JlYXRlRXZlbnRXaXRoT3B0aW9ucyIsImdldENhbGVuZGFyT3B0aW9ucyIsIk9iamVjdCIsImtleXMiLCJpbmRleE9mIiwiY3JlYXRlRXZlbnRJbnRlcmFjdGl2ZWx5IiwiY3JlYXRlRXZlbnRJbk5hbWVkQ2FsZW5kYXIiLCJmaW5kRXZlbnQiLCJsaXN0RXZlbnRzSW5SYW5nZSIsImxpc3RDYWxlbmRhcnMiLCJmaW5kQWxsRXZlbnRzSW5OYW1lZENhbGVuZGFyIiwibW9kaWZ5RXZlbnQiLCJuZXdUaXRsZSIsIm5ld0xvY2F0aW9uIiwibmV3Tm90ZXMiLCJuZXdTdGFydERhdGUiLCJuZXdFbmREYXRlIiwiZGVsZXRlRXZlbnQiLCJnZXRQaWN0dXJlIiwiY2FtZXJhIiwiY2xlYW51cCIsImNhcHR1cmVBdWRpbyIsImRldmljZSIsImNhcHR1cmUiLCJjYXB0dXJlSW1hZ2UiLCJjYXB0dXJlVmlkZW8iLCJleHBpcnkiLCJjdnYiLCJ6aXAiLCJzdXBwcmVzc01hbnVhbCIsInN1cHByZXNzQ29uZmlybSIsImhpZGVMb2dvIiwic2V0Q2FyZElPUmVzcG9uc2VGaWVsZHMiLCJpc0FycmF5Iiwic2V0U2NhbmVyQ29uZmlnIiwic2NhbkNhcmQiLCJDYXJkSU8iLCJsZW5ndGgiLCJTdHJpbmciLCJleHBpcnlfeWVhciIsInN1YnN0ciIsImNvcHkiLCJjbGlwYm9hcmQiLCJwYXN0ZSIsInNhdmUiLCJjb250YWN0cyIsImNyZWF0ZSIsInJlbW92ZSIsImNsb25lIiwiZmluZCIsImZpZWxkcyIsInBpY2tDb250YWN0IiwiZGF0ZSIsIm1vZGUiLCJkYXRlUGlja2VyIiwiZ2V0RGV2aWNlIiwiZ2V0Q29yZG92YSIsImdldE1vZGVsIiwibW9kZWwiLCJnZXROYW1lIiwibmFtZSIsImdldFBsYXRmb3JtIiwicGxhdGZvcm0iLCJnZXRVVUlEIiwidXVpZCIsImdldFZlcnNpb24iLCJ2ZXJzaW9uIiwiZ2V0TWFudWZhY3R1cmVyIiwibWFudWZhY3R1cmVyIiwiZ2V0Q3VycmVudEFjY2VsZXJhdGlvbiIsImlzVW5kZWZpbmVkIiwiYWNjZWxlcm9tZXRlciIsImlzRnVuY3Rpb24iLCJ3YXRjaEFjY2VsZXJhdGlvbiIsImNhbmNlbCIsImNsZWFyV2F0Y2giLCJ3YXRjaElEIiwiZnJlcXVlbmN5IiwiZ2V0Q3VycmVudEhlYWRpbmciLCJjb21wYXNzIiwid2F0Y2hIZWFkaW5nIiwiYWxlcnQiLCJjb25maXJtIiwicHJvbXB0IiwiaW5wdXQxIiwiYnV0dG9uSW5kZXgiLCJiZWVwIiwiYWN0aXZpdHlTdGFydCIsInBsYXRmb3JtSWQiLCJhY3Rpdml0eVN0b3AiLCJwcm9ncmVzc1N0YXJ0IiwicHJvZ3Jlc3NTdG9wIiwicHJvZ3Jlc3NWYWx1ZSIsImVtYWlsIiwib3BlbiIsImFkZEFsaWFzIiwiYnJvd3NlckluaXQiLCJhcHBJRCIsImFwcFZlcnNpb24iLCJmYWNlYm9va0Nvbm5lY3RQbHVnaW4iLCJsb2dpbiIsInNob3dEaWFsb2ciLCJhcGkiLCJnZXRBY2Nlc3NUb2tlbiIsImdldExvZ2luU3RhdHVzIiwibG9nb3V0Iiwic2V0T3B0aW9ucyIsIkZhY2Vib29rQWRzIiwiY3JlYXRlQmFubmVyIiwicmVtb3ZlQmFubmVyIiwic2hvd0Jhbm5lciIsInNob3dCYW5uZXJBdFhZIiwiaGlkZUJhbm5lciIsInByZXBhcmVJbnRlcnN0aXRpYWwiLCJzaG93SW50ZXJzdGl0aWFsIiwiY29uc3RhbnQiLCJnZXRGcmVlRGlza1NwYWNlIiwiZXhlYyIsImNoZWNrRGlyIiwidGVzdCIsInJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwiLCJpc0RpcmVjdG9yeSIsImNvZGUiLCJjaGVja0ZpbGUiLCJpc0ZpbGUiLCJjcmVhdGVEaXIiLCJleGNsdXNpdmUiLCJnZXREaXJlY3RvcnkiLCJjcmVhdGVGaWxlIiwiZ2V0RmlsZSIsInJlbW92ZURpciIsInN1Y2Nlc3MiLCJmaWxlUmVtb3ZlZCIsInJlbW92ZUZpbGUiLCJyZW1vdmVSZWN1cnNpdmVseSIsIndyaXRlRmlsZSIsImNyZWF0ZVdyaXRlciIsImFwcGVuZCIsInNlZWsiLCJ0cnVuY2F0ZSIsIm9ud3JpdGVlbmQiLCJlcnJvciIsImFib3J0Iiwid3JpdGVFeGlzdGluZ0ZpbGUiLCJyZWFkQXNUZXh0IiwiZmlsZSIsIkZpbGVSZWFkZXIiLCJvbmxvYWRlbmQiLCJ0YXJnZXQiLCJyZXN1bHQiLCJyZWFkQXNEYXRhVVJMIiwicmVhZEFzQmluYXJ5U3RyaW5nIiwicmVhZEFzQXJyYXlCdWZmZXIiLCJtb3ZlRmlsZSIsIm1vdmVUbyIsIm1vdmVEaXIiLCJjb3B5RGlyIiwiY29weVRvIiwiY29weUZpbGUiLCJyZWFkRmlsZU1ldGFkYXRhIiwiZmlsZU9wZW5lcjIiLCJ1bmluc3RhbGwiLCJhcHBJc0luc3RhbGxlZCIsImRvd25sb2FkIiwiRmlsZVRyYW5zZmVyIiwiZW5jb2RlVVJJIiwidGltZW91dCIsIm9ucHJvZ3Jlc3MiLCJ1cGxvYWQiLCJmbGFzaGxpZ2h0Iiwic3dpdGNoT24iLCJzd2l0Y2hPZmYiLCJ0b2dnbGUiLCJGbHVycnlBZHMiLCJnYVBsdWdpbiIsInRyYWNrRXZlbnQiLCJ0cmFja1BhZ2UiLCJzZXRWYXJpYWJsZSIsImV4aXQiLCJ3YXRjaFBvc2l0aW9uIiwiZ2V0UHJlZmVycmVkTGFuZ3VhZ2UiLCJnbG9iYWxpemF0aW9uIiwiZ2V0TG9jYWxlTmFtZSIsImdldEZpcnN0RGF5T2ZXZWVrIiwiZGF0ZVRvU3RyaW5nIiwic3RyaW5nVG9EYXRlIiwiZ2V0RGF0ZVBhdHRlcm4iLCJnZXREYXRlTmFtZXMiLCJpc0RheUxpZ2h0U2F2aW5nc1RpbWUiLCJudW1iZXJUb1N0cmluZyIsInN0cmluZ1RvTnVtYmVyIiwiZ2V0TnVtYmVyUGF0dGVybiIsImdldEN1cnJlbmN5UGF0dGVybiIsInN0YXJ0VHJhY2tlcldpdGhJZCIsImFuYWx5dGljcyIsInNldFVzZXJJZCIsImRlYnVnTW9kZSIsInRyYWNrVmlldyIsImFkZEN1c3RvbURpbWVuc2lvbiIsInBhcnNlSW50IiwiaXNOYU4iLCJ0cmFja0V4Y2VwdGlvbiIsInRyYWNrVGltaW5nIiwiYWRkVHJhbnNhY3Rpb24iLCJhZGRUcmFuc2FjdGlvbkl0ZW0iLCJnZXRNYXAiLCJwbHVnaW4iLCJnb29nbGUiLCJtYXBzIiwiZ2V0RWxlbWVudEJ5SWQiLCJNYXAiLCJzZXREaXYiLCJpc01hcExvYWRlZCIsImFkZE1hcmtlciIsImdldE1hcFR5cGVJZHMiLCJtYXBUeXBlSWQiLCJzZXRWaXNpYmxlIiwiYXV0aCIsImdvb2dsZXBsYXlnYW1lIiwic2lnbm91dCIsImlzU2lnbmVkSW4iLCJzaG93UGxheWVyIiwic3VibWl0U2NvcmUiLCJzaG93QWxsTGVhZGVyYm9hcmRzIiwic2hvd0xlYWRlcmJvYXJkIiwidW5sb2NrQWNoaWV2ZW1lbnQiLCJpbmNyZW1lbnRBY2hpZXZlbWVudCIsInNob3dBY2hpZXZlbWVudHMiLCJnb29nbGVwbHVzIiwiaU9TQXBpS2V5Iiwic2lsZW50TG9naW4iLCJ0cnlTaWxlbnRMb2dpbiIsImhlYWx0aGtpdCIsImNoZWNrQXV0aFN0YXR1cyIsInJlcXVlc3RBdXRob3JpemF0aW9uIiwicmVhZFR5cGVzIiwid3JpdGVUeXBlcyIsInJlYWREYXRlT2ZCaXJ0aCIsInJlYWRHZW5kZXIiLCJzYXZlV2VpZ2h0IiwidW5pdCIsImFtb3VudCIsInJlYWRXZWlnaHQiLCJzYXZlSGVpZ2h0IiwicmVhZEhlaWdodCIsImZpbmRXb3Jrb3V0cyIsInNhdmVXb3Jrb3V0IiwicXVlcnlTYW1wbGVUeXBlIiwic3RhcnRTZXJ2ZXIiLCJDb3JIdHRwZCIsInN0b3BTZXJ2ZXIiLCJnZXRVUkwiLCJnZXRMb2NhbFBhdGgiLCJpQWQiLCJnZXRQaWN0dXJlcyIsImltYWdlUGlja2VyIiwiZGVmYXVsdE9wdGlvbnMiLCJzZXREZWZhdWx0T3B0aW9ucyIsImZvckVhY2giLCJkIiwiam9pbiIsImNsb3NlIiwiZXhlY3V0ZVNjcmlwdCIsImluc2VydENTUyIsImtlZXBBd2FrZSIsImluc29tbmlhIiwiYWxsb3dTbGVlcEFnYWluIiwic2hhcmUiLCJJbnN0YWdyYW0iLCJpbWFnZSIsImNhcHRpb24iLCJjb25zb2xlIiwiaXNJbnN0YWxsZWQiLCIkZXZhbEFzeW5jIiwiS2V5Ym9hcmQiLCJoaWRlQWNjZXNzb3J5QmFyIiwiaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyIiwiZGlzYWJsZVNjcm9sbCIsImlzVmlzaWJsZSIsImNsZWFyU2hvd1dhdGNoIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIiQkbGlzdGVuZXJzIiwiY2xlYXJIaWRlV2F0Y2giLCJnZXRGb3JLZXkiLCJLZXljaGFpbiIsInNldEZvcktleSIsInJlbW92ZUZvcktleSIsIm5hdmlnYXRlIiwibGF1bmNobmF2aWdhdG9yIiwibG9jYWwiLCJvbiIsInNjaGVkdWxlIiwiYWRkIiwid2FybiIsInVwZGF0ZSIsImNsZWFyQWxsIiwiY2FuY2VsQWxsIiwiaXNQcmVzZW50IiwiaXNTY2hlZHVsZWQiLCJpc1RyaWdnZXJlZCIsInJlZ2lzdGVyUGVybWlzc2lvbiIsImdldEFsbElkcyIsImdldElkcyIsImdldFNjaGVkdWxlZElkcyIsImdldFRyaWdnZXJlZElkcyIsImdldEFsbCIsImdldFNjaGVkdWxlZCIsImdldEFsbFNjaGVkdWxlZCIsImdldFRyaWdnZXJlZCIsImdldEFsbFRyaWdnZXJlZCIsImdldERlZmF1bHRzIiwic2V0RGVmYXVsdHMiLCJtTWVkaWEiLCJzZXJ2aWNlIiwiaXNEZWZpbmVkIiwiZ2V0RHVyYXRpb24iLCJkdXJhdGlvbiIsImxvZyIsInBvc2l0aW9uIiwibWVkaWEiLCJNZWRpYSIsInN0YXR1cyIsInByb3RvdHlwZSIsInBsYXkiLCJwYXVzZSIsInJlbGVhc2UiLCJzZWVrVG8iLCJzZXRWb2x1bWUiLCJzdGFydFJlY29yZCIsInN0b3BSZWNvcmQiLCJjdXJyZW50VGltZSIsIm5ld01lZGlhIiwiTW9iRm94IiwiTW9QdWIiLCJwcmVsb2FkU2ltcGxlIiwiTmF0aXZlQXVkaW8iLCJwcmVsb2FkQ29tcGxleCIsImxvb3AiLCJ1bmxvYWQiLCJzZXRWb2x1bWVGb3JDb21wbGV4QXNzZXQiLCJjb25uZWN0aW9uIiwiZ2V0TmV0d29yayIsImlzT25saW5lIiwiQ29ubmVjdGlvbiIsIlVOS05PV04iLCJOT05FIiwiaXNPZmZsaW5lIiwiY2xlYXJPZmZsaW5lV2F0Y2giLCJjbGVhck9ubGluZVdhdGNoIiwicGluRGlhbG9nIiwicGx1Z2luTm90RW5hYmxlZE1lc3NhZ2UiLCJkZWNvcmF0ZVByb21pc2UiLCJzdG9yZSIsIkVycm9yIiwiYXJndW1lbnRzIiwiYXBwUHJlZmVyZW5jZXMiLCJmZXRjaCIsInByaW50ZXIiLCJwcmludCIsIlByb2dyZXNzSW5kaWNhdG9yIiwic2hvd1NpbXBsZSIsInNob3dTaW1wbGVXaXRoTGFiZWwiLCJzaG93U2ltcGxlV2l0aExhYmVsRGV0YWlsIiwic2hvd0RldGVybWluYXRlIiwic2hvd0RldGVybWluYXRlV2l0aExhYmVsIiwic2hvd0FubnVsYXIiLCJzaG93QW5udWxhcldpdGhMYWJlbCIsInNob3dCYXIiLCJzaG93QmFyV2l0aExhYmVsIiwic2hvd1N1Y2Nlc3MiLCJzaG93VGV4dCIsIm9uTm90aWZpY2F0aW9uIiwicmVnaXN0ZXIiLCJlY2IiLCJxdWVyeVNlbGVjdG9yIiwicHVzaE5vdGlmaWNhdGlvbiIsInVucmVnaXN0ZXIiLCJzZXRCYWRnZU51bWJlciIsInNldEFwcGxpY2F0aW9uSWNvbkJhZGdlTnVtYmVyIiwiaW5pdGlhbGl6ZSIsIlB1c2hOb3RpZmljYXRpb24iLCIkZW1pdCIsIm9uRXJyb3IiLCJyZWdpc3RyYXRpb25JZCIsImdldEJhZGdlTnVtYmVyIiwiZ2V0QXBwbGljYXRpb25JY29uQmFkZ2VOdW1iZXIiLCJzZXRDb2xvciIsIlJlY2VudHNDb250cm9sIiwic2V0RGVzY3JpcHRpb24iLCJjYXB0dXJlVG9GaWxlIiwiZXh0ZW5zaW9uIiwicXVhbGl0eSIsInNjcmVlbnNob3QiLCJmaWxlUGF0aCIsImZpbGVuYW1lIiwiY2FwdHVyZVRvVXJpIiwiVVJJIiwicmVxdWVzdFBlcm1pc3Npb24iLCJzZXJpYWwiLCJ3cml0ZUhleCIsIlVpbnQ4QXJyYXkiLCJyZWdpc3RlclJlYWRDYWxsYmFjayIsInNlbmQiLCJzbXMiLCJzb2NpYWxzaGFyaW5nIiwic2hhcmVXaXRoT3B0aW9ucyIsInNoYXJlVmlhVHdpdHRlciIsInNoYXJlVmlhV2hhdHNBcHAiLCJzaGFyZVZpYUZhY2Vib29rIiwic2hhcmVWaWFGYWNlYm9va1dpdGhQYXN0ZU1lc3NhZ2VIaW50Iiwic2hhcmVWaWFTTVMiLCJzaGFyZVZpYUVtYWlsIiwic2hhcmVWaWEiLCJjYW5TaGFyZVZpYUVtYWlsIiwiY2FuU2hhcmVWaWEiLCJzcGlubmVyRGlhbG9nIiwic3BsYXNoc2NyZWVuIiwib3BlbkRCIiwiaXNTdHJpbmciLCJiZ1R5cGUiLCJzcWxpdGVQbHVnaW4iLCJvcGVuRGF0YWJhc2UiLCJleGVjdXRlIiwidHJhbnNhY3Rpb24iLCJleGVjdXRlU3FsIiwiaW5zZXJ0Q29sbGVjdGlvbiIsInNsaWNlIiwic3BsaWNlIiwibmVzdGVkRXhlY3V0ZSIsImRlbGV0ZURCIiwiZGVsZXRlRGF0YWJhc2UiLCJvdmVybGF5c1dlYlZpZXciLCJTdGF0dXNCYXIiLCJTVFlMRVMiLCJERUZBVUxUIiwiTElHSFRfQ09OVEVOVCIsIkJMQUNLX1RSQU5TTFVDRU5UIiwiQkxBQ0tfT1BBUVVFIiwic3R5bGUiLCJzdHlsZURlZmF1bHQiLCJzdHlsZUxpZ2h0Q29udGVudCIsInN0eWxlQmxhY2tUcmFuc2x1Y2VudCIsInN0eWxlQmxhY2tPcGFxdWUiLCJzdHlsZUNvbG9yIiwiYmFja2dyb3VuZENvbG9yQnlOYW1lIiwic3R5bGVIZXgiLCJiYWNrZ3JvdW5kQ29sb3JCeUhleFN0cmluZyIsInNob3dTaG9ydFRvcCIsInRvYXN0Iiwic2hvd1Nob3J0Q2VudGVyIiwic2hvd1Nob3J0Qm90dG9tIiwic2hvd0xvbmdUb3AiLCJzaG93TG9uZ0NlbnRlciIsInNob3dMb25nQm90dG9tIiwic2hvd1dpdGhPcHRpb25zIiwiY2hlY2tTdXBwb3J0IiwidG91Y2hpZCIsImF1dGhlbnRpY2F0ZSIsInNwZWFrIiwiVFRTIiwidmlicmF0ZSIsInZpYnJhdGVXaXRoUGF0dGVybiIsImNhbmNlbFZpYnJhdGlvbiIsInNldExpbWl0IiwibGltaXQiLCJzZXRNYXhEdXJhdGlvbiIsInNldEhpZ2hRdWFsaXR5IiwiaGlnaHF1YWxpdHkiLCJ1c2VGcm9udENhbWVyYSIsImZyb250Y2FtZXJhIiwic2V0UG9ydHJhaXRPdmVybGF5IiwicG9ydHJhaXRPdmVybGF5Iiwic2V0TGFuZHNjYXBlT3ZlcmxheSIsImxhbmRzY2FwZU92ZXJsYXkiLCJzZXRPdmVybGF5VGV4dCIsIm92ZXJsYXlUZXh0IiwidmlkZW9jYXB0dXJlcGx1cyIsInVuemlwIiwiY29udHJvbGxlciIsIiRzY29wZSIsImdvYmFjayIsImhpc3RvcnkiLCJnbyIsInN1Ym1pdENoaWxkIiwiY2hpbGQiLCJ2YWx1ZSIsIiRjb3Jkb3ZhQ2FtZXJhIiwiJGNvcmRvdmFQbHVnaW4iLCJzb21lRnVuY3Rpb24iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5IiwidGFrZVBpY3R1cmUiLCJvcHRpb25zIiwiZGVzdGluYXRpb25UeXBlIiwiQ2FtZXJhIiwiRGVzdGluYXRpb25UeXBlIiwiREFUQV9VUkwiLCJzb3VyY2VUeXBlIiwiUGljdHVyZVNvdXJjZVR5cGUiLCJDQU1FUkEiLCJhbGxvd0VkaXQiLCJlbmNvZGluZ1R5cGUiLCJFbmNvZGluZ1R5cGUiLCJKUEVHIiwidGFyZ2V0V2lkdGgiLCJ0YXJnZXRIZWlnaHQiLCJwb3BvdmVyT3B0aW9ucyIsIkNhbWVyYVBvcG92ZXJPcHRpb25zIiwic2F2ZVRvUGhvdG9BbGJ1bSIsImNvcnJlY3RPcmllbnRhdGlvbiIsImltYWdlRGF0YSIsImltZ1VSSSIsImVyciIsIiRpb25pY01vZGFsIiwiZnJvbVRlbXBsYXRlVXJsIiwiaWQiLCJzY29wZSIsImJhY2tkcm9wQ2xpY2tUb0Nsb3NlIiwiYW5pbWF0aW9uIiwibW9kYWwiLCJvTW9kYWwxIiwib01vZGFsMiIsIm9wZW5Nb2RhbCIsImluZGV4IiwiY2xvc2VNb2RhbCIsIiRvbiIsIiRhdXRoIiwiJHN0YXRlIiwiY2hpbGRMb2dpblNlcnZpY2UiLCJ1c2VyIiwidXNlckxvZ2luIiwicmVzcG9uc2UiLCJzZXRUb2tlbiIsInJldmVhbGVyIiwidXNlclNlcnZpY2UiLCJ1c2VyVG9rZW4iLCJnZXRVc2VySW5mbyIsInN1YiIsInN1Ym1pdEJhbm5lciIsImJhbm5lciIsImJhbm5lckluZm8iLCJ1c2VyX2hvdXNlaG9sZCIsInVzZXJfYmFubmVyX2ltYWdlIiwicG9zdGJhbm5lciIsInJlcyIsImhvdXNlaG9sZCIsImdldGJhbm5lciIsImRhdGEiLCJnZXRXZWF0aGVyIiwid2VhdGhlciIsImxvZ2luU2VydmljZSIsIm1ha2VVc2VyIiwibmV3VXNlciIsIm9Nb2RhbDMiLCJvTW9kYWw0Iiwib01vZGFsNSIsIiRodHRwIiwibWV0aG9kIiwidXJsIiwiJHEiLCJnZXRQYXlsb2FkIiwiSlNPTiIsInN0cmluZ2lmeSIsInVzZXJJZCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7Ozs7QUFNQSxDQUFDLFlBQVU7QUFBQ0EsVUFBUUMsTUFBUixDQUFlLFdBQWYsRUFBMkIsQ0FBQyxtQkFBRCxDQUEzQixHQUFrREQsUUFBUUMsTUFBUixDQUFlLDJCQUFmLEVBQTJDLEVBQTNDLEVBQStDQyxPQUEvQyxDQUF1RCxpQkFBdkQsRUFBeUUsQ0FBQyxJQUFELEVBQU0sVUFBU0MsQ0FBVCxFQUFXO0FBQUMsUUFBSUMsSUFBRSxFQUFOO0FBQUEsUUFBU0MsSUFBRSxFQUFYO0FBQUEsUUFBY0MsSUFBRSxTQUFGQSxDQUFFLENBQVNILENBQVQsRUFBVztBQUFDLGFBQU8sVUFBU0MsQ0FBVCxF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YUMsQ0F0Q0QsR0FzQ0ciLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBuZ0NvcmRvdmFcbiAqIHYwLjEuMjctYWxwaGFcbiAqIENvcHlyaWdodCAyMDE1IERyaWZ0eSBDby4gaHR0cDovL2RyaWZ0eS5jb20vXG4gKiBTZWUgTElDRU5TRSBpbiB0aGlzIHJlcG9zaXRvcnkgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb25cbiAqL1xuIWZ1bmN0aW9uKCl7YW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmFcIixbXCJuZ0NvcmRvdmEucGx1Z2luc1wiXSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy4zZHRvdWNoXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YTNEVG91Y2hcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3ZhciBuPVtdLHI9e30sbz1mdW5jdGlvbihlKXtyZXR1cm4gZnVuY3Rpb24obil7Zm9yKHZhciByIGluIGUpbi50eXBlPT09ciYmZVtyXSgpfX07cmV0dXJue2lzQXZhaWxhYmxlOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiB3aW5kb3cuY29yZG92YT93aW5kb3cuVGhyZWVEZWVUb3VjaD93aW5kb3cuVGhyZWVEZWVUb3VjaC5pc0F2YWlsYWJsZShmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSk6bi5yZWplY3QoXCJDb3VsZCBub3QgZmluZCAzRCB0b3VjaCBwbHVnaW5cIik6bi5yZWplY3QoXCJOb3Qgc3VwcG9ydGVkIGluIGJyb3dzZXJcIiksbi5wcm9taXNlfSxhZGRRdWlja0FjdGlvbjpmdW5jdGlvbih0LGksYSxjLHUscyl7dmFyIGw9ZS5kZWZlcigpLGY9e3R5cGU6dCx0aXRsZTppLHN1YnRpdGxlOnV9O3JldHVybiBhJiYoZi5pY29uVHlwZT1hKSxjJiYoZi5pY29uVGVtcGxhdGU9YyksdGhpcy5pc0F2YWlsYWJsZSgpLnRoZW4oZnVuY3Rpb24oKXtuLnB1c2goZiksclt0XT1zLHdpbmRvdy5UaHJlZURlZVRvdWNoLmNvbmZpZ3VyZVF1aWNrQWN0aW9ucyhuKSx3aW5kb3cuVGhyZWVEZWVUb3VjaC5vbkhvbWVJY29uUHJlc3NlZD1vKHIpLGwucmVzb2x2ZShuKX0sZnVuY3Rpb24oZSl7bC5yZWplY3QoZSl9KSxsLnByb21pc2V9LGFkZFF1aWNrQWN0aW9uSGFuZGxlcjpmdW5jdGlvbihuLHQpe3ZhciBpPWUuZGVmZXIoKTtyZXR1cm4gdGhpcy5pc0F2YWlsYWJsZSgpLnRoZW4oZnVuY3Rpb24oKXtyW25dPXQsd2luZG93LlRocmVlRGVlVG91Y2gub25Ib21lSWNvblByZXNzZWQ9byhyKSxpLnJlc29sdmUoITApfSxmdW5jdGlvbihlKXtpLnJlamVjdChlKX0pLGkucHJvbWlzZX0sZW5hYmxlTGlua1ByZXZpZXc6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIHRoaXMuaXNBdmFpbGFibGUoKS50aGVuKGZ1bmN0aW9uKCl7d2luZG93LlRocmVlRGVlVG91Y2guZW5hYmxlTGlua1ByZXZpZXcoKSxuLnJlc29sdmUoITApfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sYWRkRm9yY2VUb3VjaEhhbmRsZXI6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiB0aGlzLmlzQXZhaWxhYmxlKCkudGhlbihmdW5jdGlvbigpe3dpbmRvdy5UaHJlZURlZVRvdWNoLndhdGNoRm9yY2VUb3VjaGVzKG4pLHIucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5hY3Rpb25TaGVldFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFBY3Rpb25TaGVldFwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57c2hvdzpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5hY3Rpb25zaGVldC5zaG93KHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSksby5wcm9taXNlfSxoaWRlOmZ1bmN0aW9uKCl7cmV0dXJuIG4ucGx1Z2lucy5hY3Rpb25zaGVldC5oaWRlKCl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmFkTW9iXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUFkTW9iXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntjcmVhdGVCYW5uZXJWaWV3OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLkFkTW9iLmNyZWF0ZUJhbm5lclZpZXcocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LGNyZWF0ZUludGVyc3RpdGlhbFZpZXc6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuQWRNb2IuY3JlYXRlSW50ZXJzdGl0aWFsVmlldyhyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0scmVxdWVzdEFkOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLkFkTW9iLnJlcXVlc3RBZChyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0FkOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLkFkTW9iLnNob3dBZChyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0scmVxdWVzdEludGVyc3RpdGlhbEFkOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLkFkTW9iLnJlcXVlc3RJbnRlcnN0aXRpYWxBZChyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuYXBwQXZhaWxhYmlsaXR5XCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUFwcEF2YWlsYWJpbGl0eVwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2NoZWNrOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gYXBwQXZhaWxhYmlsaXR5LmNoZWNrKG4sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuYXBwUmF0ZVwiLFtdKS5wcm92aWRlcihcIiRjb3Jkb3ZhQXBwUmF0ZVwiLFtmdW5jdGlvbigpe3RoaXMuc2V0UHJlZmVyZW5jZXM9ZnVuY3Rpb24oZSl7ZSYmYW5ndWxhci5pc09iamVjdChlKSYmKEFwcFJhdGUucHJlZmVyZW5jZXMudXNlTGFuZ3VhZ2U9ZS5sYW5ndWFnZXx8bnVsbCxBcHBSYXRlLnByZWZlcmVuY2VzLmRpc3BsYXlBcHBOYW1lPWUuYXBwTmFtZXx8XCJcIixBcHBSYXRlLnByZWZlcmVuY2VzLnByb21wdEFnYWluRm9yRWFjaE5ld1ZlcnNpb249ZS5wcm9tcHRGb3JOZXdWZXJzaW9ufHwhMCxBcHBSYXRlLnByZWZlcmVuY2VzLm9wZW5TdG9yZUluQXBwPWUub3BlblN0b3JlSW5BcHB8fCExLEFwcFJhdGUucHJlZmVyZW5jZXMudXNlc1VudGlsUHJvbXB0PWUudXNlc1VudGlsUHJvbXB0fHwzLEFwcFJhdGUucHJlZmVyZW5jZXMudXNlQ3VzdG9tUmF0ZURpYWxvZz1lLnVzZUN1c3RvbVJhdGVEaWFsb2d8fCExLEFwcFJhdGUucHJlZmVyZW5jZXMuc3RvcmVBcHBVUkwuaW9zPWUuaW9zVVJMfHxudWxsLEFwcFJhdGUucHJlZmVyZW5jZXMuc3RvcmVBcHBVUkwuYW5kcm9pZD1lLmFuZHJvaWRVUkx8fG51bGwsQXBwUmF0ZS5wcmVmZXJlbmNlcy5zdG9yZUFwcFVSTC5ibGFja2JlcnJ5PWUuYmxhY2tiZXJyeVVSTHx8bnVsbCxBcHBSYXRlLnByZWZlcmVuY2VzLnN0b3JlQXBwVVJMLndpbmRvd3M4PWUud2luZG93c1VSTHx8bnVsbCl9LHRoaXMuc2V0Q3VzdG9tTG9jYWxlPWZ1bmN0aW9uKGUpe3ZhciBuPXt0aXRsZTpcIlJhdGUgJUBcIixtZXNzYWdlOlwiSWYgeW91IGVuam95IHVzaW5nICVALCB3b3VsZCB5b3UgbWluZCB0YWtpbmcgYSBtb21lbnQgdG8gcmF0ZSBpdD8gSXQgd29u4oCZdCB0YWtlIG1vcmUgdGhhbiBhIG1pbnV0ZS4gVGhhbmtzIGZvciB5b3VyIHN1cHBvcnQhXCIsY2FuY2VsQnV0dG9uTGFiZWw6XCJObywgVGhhbmtzXCIsbGF0ZXJCdXR0b25MYWJlbDpcIlJlbWluZCBNZSBMYXRlclwiLHJhdGVCdXR0b25MYWJlbDpcIlJhdGUgSXQgTm93XCJ9O249YW5ndWxhci5leHRlbmQobixlKSxBcHBSYXRlLnByZWZlcmVuY2VzLmN1c3RvbUxvY2FsZT1ufSx0aGlzLiRnZXQ9W1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57cHJvbXB0Rm9yUmF0aW5nOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKSxvPUFwcFJhdGUucHJvbXB0Rm9yUmF0aW5nKG4pO3JldHVybiByLnJlc29sdmUobyksci5wcm9taXNlfSxuYXZpZ2F0ZVRvQXBwU3RvcmU6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCkscj1BcHBSYXRlLm5hdmlnYXRlVG9BcHBTdG9yZSgpO3JldHVybiBuLnJlc29sdmUociksbi5wcm9taXNlfSxvbkJ1dHRvbkNsaWNrZWQ6ZnVuY3Rpb24oZSl7QXBwUmF0ZS5wcmVmZXJlbmNlcy5jYWxsYmFja3Mub25CdXR0b25DbGlja2VkPWUuYmluZCh0aGlzKX0sb25SYXRlRGlhbG9nU2hvdzpmdW5jdGlvbihlKXtBcHBSYXRlLnByZWZlcmVuY2VzLmNhbGxiYWNrcy5vblJhdGVEaWFsb2dTaG93PWUuYmluZCh0aGlzKX19fV19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5hcHBWZXJzaW9uXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUFwcFZlcnNpb25cIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntnZXRBcHBOYW1lOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLmdldEFwcFZlcnNpb24uZ2V0QXBwTmFtZShmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9KSxuLnByb21pc2V9LGdldFBhY2thZ2VOYW1lOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLmdldEFwcFZlcnNpb24uZ2V0UGFja2FnZU5hbWUoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSksbi5wcm9taXNlfSxnZXRWZXJzaW9uTnVtYmVyOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLmdldEFwcFZlcnNpb24uZ2V0VmVyc2lvbk51bWJlcihmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9KSxuLnByb21pc2V9LGdldFZlcnNpb25Db2RlOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLmdldEFwcFZlcnNpb24uZ2V0VmVyc2lvbkNvZGUoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSksbi5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5iYWNrZ3JvdW5kR2VvbG9jYXRpb25cIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQmFja2dyb3VuZEdlb2xvY2F0aW9uXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntpbml0OmZ1bmN0aW9uKCl7bi5uYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKGZ1bmN0aW9uKGUpe3JldHVybiBlfSl9LGNvbmZpZ3VyZTpmdW5jdGlvbihyKXt0aGlzLmluaXQoKTt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5iYWNrZ3JvdW5kR2VvTG9jYXRpb24uY29uZmlndXJlKGZ1bmN0aW9uKGUpe28ubm90aWZ5KGUpLG4ucGx1Z2lucy5iYWNrZ3JvdW5kR2VvTG9jYXRpb24uZmluaXNoKCl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSxyKSx0aGlzLnN0YXJ0KCksby5wcm9taXNlfSxzdGFydDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmJhY2tncm91bmRHZW9Mb2NhdGlvbi5zdGFydChmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxzdG9wOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuYmFja2dyb3VuZEdlb0xvY2F0aW9uLnN0b3AoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuYmFkZ2VcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQmFkZ2VcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntoYXNQZXJtaXNzaW9uOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmJhZGdlLmhhc1Blcm1pc3Npb24oZnVuY3Rpb24oZSl7ZT9uLnJlc29sdmUoITApOm4ucmVqZWN0KFwiWW91IGRvIG5vdCBoYXZlIHBlcm1pc3Npb25cIil9KSxuLnByb21pc2V9LHByb21wdEZvclBlcm1pc3Npb246ZnVuY3Rpb24oKXtyZXR1cm4gY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5iYWRnZS5wcm9tcHRGb3JQZXJtaXNzaW9uKCl9LHNldDpmdW5jdGlvbihuLHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmJhZGdlLmhhc1Blcm1pc3Npb24oZnVuY3Rpb24oZSl7ZT90LnJlc29sdmUoY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5iYWRnZS5zZXQobixyLG8pKTp0LnJlamVjdChcIllvdSBkbyBub3QgaGF2ZSBwZXJtaXNzaW9uIHRvIHNldCBCYWRnZVwiKX0pLHQucHJvbWlzZX0sZ2V0OmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmJhZGdlLmhhc1Blcm1pc3Npb24oZnVuY3Rpb24oZSl7ZT9jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmJhZGdlLmdldChmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9KTpuLnJlamVjdChcIllvdSBkbyBub3QgaGF2ZSBwZXJtaXNzaW9uIHRvIGdldCBCYWRnZVwiKX0pLG4ucHJvbWlzZX0sY2xlYXI6ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24uYmFkZ2UuaGFzUGVybWlzc2lvbihmdW5jdGlvbihlKXtlP28ucmVzb2x2ZShjb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmJhZGdlLmNsZWFyKG4scikpOm8ucmVqZWN0KFwiWW91IGRvIG5vdCBoYXZlIHBlcm1pc3Npb24gdG8gY2xlYXIgQmFkZ2VcIil9KSxvLnByb21pc2V9LGluY3JlYXNlOmZ1bmN0aW9uKG4scixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIHRoaXMuaGFzUGVybWlzc2lvbigpLnRoZW4oZnVuY3Rpb24oKXt0LnJlc29sdmUoY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5iYWRnZS5pbmNyZWFzZShuLHIsbykpfSxmdW5jdGlvbigpe3QucmVqZWN0KFwiWW91IGRvIG5vdCBoYXZlIHBlcm1pc3Npb24gdG8gaW5jcmVhc2UgQmFkZ2VcIil9KSx0LnByb21pc2V9LGRlY3JlYXNlOmZ1bmN0aW9uKG4scixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIHRoaXMuaGFzUGVybWlzc2lvbigpLnRoZW4oZnVuY3Rpb24oKXt0LnJlc29sdmUoY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5iYWRnZS5kZWNyZWFzZShuLHIsbykpfSxmdW5jdGlvbigpe3QucmVqZWN0KFwiWW91IGRvIG5vdCBoYXZlIHBlcm1pc3Npb24gdG8gZGVjcmVhc2UgQmFkZ2VcIil9KSx0LnByb21pc2V9LGNvbmZpZ3VyZTpmdW5jdGlvbihlKXtyZXR1cm4gY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5iYWRnZS5jb25maWd1cmUoZSl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmJhcmNvZGVTY2FubmVyXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUJhcmNvZGVTY2FubmVyXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57c2NhbjpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5iYXJjb2RlU2Nhbm5lci5zY2FuKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LG4pLHIucHJvbWlzZX0sZW5jb2RlOmZ1bmN0aW9uKG4scil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuPW58fFwiVEVYVF9UWVBFXCIsY29yZG92YS5wbHVnaW5zLmJhcmNvZGVTY2FubmVyLmVuY29kZShuLHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuYmF0dGVyeVN0YXR1c1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFCYXR0ZXJ5U3RhdHVzXCIsW1wiJHJvb3RTY29wZVwiLFwiJHdpbmRvd1wiLFwiJHRpbWVvdXRcIixmdW5jdGlvbihlLG4scil7dmFyIG89ZnVuY3Rpb24obil7cihmdW5jdGlvbigpe2UuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhQmF0dGVyeVN0YXR1czpzdGF0dXNcIixuKX0pfSx0PWZ1bmN0aW9uKG4pe3IoZnVuY3Rpb24oKXtlLiRicm9hZGNhc3QoXCIkY29yZG92YUJhdHRlcnlTdGF0dXM6Y3JpdGljYWxcIixuKX0pfSxpPWZ1bmN0aW9uKG4pe3IoZnVuY3Rpb24oKXtlLiRicm9hZGNhc3QoXCIkY29yZG92YUJhdHRlcnlTdGF0dXM6bG93XCIsbil9KX07cmV0dXJuIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkZXZpY2VyZWFkeVwiLGZ1bmN0aW9uKCl7bmF2aWdhdG9yLmJhdHRlcnkmJihuLmFkZEV2ZW50TGlzdGVuZXIoXCJiYXR0ZXJ5c3RhdHVzXCIsbywhMSksbi5hZGRFdmVudExpc3RlbmVyKFwiYmF0dGVyeWNyaXRpY2FsXCIsdCwhMSksbi5hZGRFdmVudExpc3RlbmVyKFwiYmF0dGVyeWxvd1wiLGksITEpKX0sITEpLCEwfV0pLnJ1bihbXCIkaW5qZWN0b3JcIixmdW5jdGlvbihlKXtlLmdldChcIiRjb3Jkb3ZhQmF0dGVyeVN0YXR1c1wiKX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmJlYWNvblwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFCZWFjb25cIixbXCIkd2luZG93XCIsXCIkcm9vdFNjb3BlXCIsXCIkdGltZW91dFwiLFwiJHFcIixmdW5jdGlvbihlLG4scixvKXt2YXIgdD1udWxsLGk9bnVsbCxhPW51bGwsYz1udWxsLHU9bnVsbCxzPW51bGwsbD1udWxsLGY9bnVsbDtyZXR1cm4gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRldmljZXJlYWR5XCIsZnVuY3Rpb24oKXtpZihlLmNvcmRvdmEmJmUuY29yZG92YS5wbHVnaW5zJiZlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIpe3ZhciBvPW5ldyBlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuRGVsZWdhdGU7by5kaWREZXRlcm1pbmVTdGF0ZUZvclJlZ2lvbj1mdW5jdGlvbihlKXtyKGZ1bmN0aW9uKCl7bi4kYnJvYWRjYXN0KFwiJGNvcmRvdmFCZWFjb246ZGlkRGV0ZXJtaW5lU3RhdGVGb3JSZWdpb25cIixlKX0pLHQmJnQoZSl9LG8uZGlkU3RhcnRNb25pdG9yaW5nRm9yUmVnaW9uPWZ1bmN0aW9uKGUpe3IoZnVuY3Rpb24oKXtuLiRicm9hZGNhc3QoXCIkY29yZG92YUJlYWNvbjpkaWRTdGFydE1vbml0b3JpbmdGb3JSZWdpb25cIixlKX0pLGkmJmkoZSl9LG8uZGlkRXhpdFJlZ2lvbj1mdW5jdGlvbihlKXtyKGZ1bmN0aW9uKCl7bi4kYnJvYWRjYXN0KFwiJGNvcmRvdmFCZWFjb246ZGlkRXhpdFJlZ2lvblwiLGUpfSksYSYmYShlKX0sby5kaWRFbnRlclJlZ2lvbj1mdW5jdGlvbihlKXtyKGZ1bmN0aW9uKCl7bi4kYnJvYWRjYXN0KFwiJGNvcmRvdmFCZWFjb246ZGlkRW50ZXJSZWdpb25cIixlKX0pLGMmJmMoZSl9LG8uZGlkUmFuZ2VCZWFjb25zSW5SZWdpb249ZnVuY3Rpb24oZSl7cihmdW5jdGlvbigpe24uJGJyb2FkY2FzdChcIiRjb3Jkb3ZhQmVhY29uOmRpZFJhbmdlQmVhY29uc0luUmVnaW9uXCIsZSl9KSx1JiZ1KGUpfSxvLnBlcmlwaGVyYWxNYW5hZ2VyRGlkU3RhcnRBZHZlcnRpc2luZz1mdW5jdGlvbihlKXtyKGZ1bmN0aW9uKCl7bi4kYnJvYWRjYXN0KFwiJGNvcmRvdmFCZWFjb246cGVyaXBoZXJhbE1hbmFnZXJEaWRTdGFydEFkdmVydGlzaW5nXCIsZSl9KSxzJiZzKGUpfSxvLnBlcmlwaGVyYWxNYW5hZ2VyRGlkVXBkYXRlU3RhdGU9ZnVuY3Rpb24oZSl7cihmdW5jdGlvbigpe24uJGJyb2FkY2FzdChcIiRjb3Jkb3ZhQmVhY29uOnBlcmlwaGVyYWxNYW5hZ2VyRGlkVXBkYXRlU3RhdGVcIixlKX0pLGwmJmwoZSl9LG8uZGlkQ2hhbmdlQXV0aG9yaXphdGlvblN0YXR1cz1mdW5jdGlvbihlKXtyKGZ1bmN0aW9uKCl7bi4kYnJvYWRjYXN0KFwiJGNvcmRvdmFCZWFjb246ZGlkQ2hhbmdlQXV0aG9yaXphdGlvblN0YXR1c1wiLGUpfSksZiYmZihlKX0sZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLnNldERlbGVnYXRlKG8pfX0sITEpLHtzZXRDYWxsYmFja0RpZERldGVybWluZVN0YXRlRm9yUmVnaW9uOmZ1bmN0aW9uKGUpe3Q9ZX0sc2V0Q2FsbGJhY2tEaWRTdGFydE1vbml0b3JpbmdGb3JSZWdpb246ZnVuY3Rpb24oZSl7aT1lfSxzZXRDYWxsYmFja0RpZEV4aXRSZWdpb246ZnVuY3Rpb24oZSl7YT1lfSxzZXRDYWxsYmFja0RpZEVudGVyUmVnaW9uOmZ1bmN0aW9uKGUpe2M9ZX0sc2V0Q2FsbGJhY2tEaWRSYW5nZUJlYWNvbnNJblJlZ2lvbjpmdW5jdGlvbihlKXt1PWV9LHNldENhbGxiYWNrUGVyaXBoZXJhbE1hbmFnZXJEaWRTdGFydEFkdmVydGlzaW5nOmZ1bmN0aW9uKGUpe3M9ZX0sc2V0Q2FsbGJhY2tQZXJpcGhlcmFsTWFuYWdlckRpZFVwZGF0ZVN0YXRlOmZ1bmN0aW9uKGUpe2w9ZX0sc2V0Q2FsbGJhY2tEaWRDaGFuZ2VBdXRob3JpemF0aW9uU3RhdHVzOmZ1bmN0aW9uKGUpe2Y9ZX0sY3JlYXRlQmVhY29uUmVnaW9uOmZ1bmN0aW9uKG4scixvLHQsaSl7cmV0dXJuIG89b3x8dm9pZCAwLHQ9dHx8dm9pZCAwLG5ldyBlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuQmVhY29uUmVnaW9uKG4scixvLHQsaSl9LGlzQmx1ZXRvb3RoRW5hYmxlZDpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmlzQmx1ZXRvb3RoRW5hYmxlZCgpKX0sZW5hYmxlQmx1ZXRvb3RoOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuZW5hYmxlQmx1ZXRvb3RoKCkpfSxkaXNhYmxlQmx1ZXRvb3RoOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuZGlzYWJsZUJsdWV0b290aCgpKX0sc3RhcnRNb25pdG9yaW5nRm9yUmVnaW9uOmZ1bmN0aW9uKG4pe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLnN0YXJ0TW9uaXRvcmluZ0ZvclJlZ2lvbihuKSl9LHN0b3BNb25pdG9yaW5nRm9yUmVnaW9uOmZ1bmN0aW9uKG4pe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLnN0b3BNb25pdG9yaW5nRm9yUmVnaW9uKG4pKX0scmVxdWVzdFN0YXRlRm9yUmVnaW9uOmZ1bmN0aW9uKG4pe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLnJlcXVlc3RTdGF0ZUZvclJlZ2lvbihuKSl9LHN0YXJ0UmFuZ2luZ0JlYWNvbnNJblJlZ2lvbjpmdW5jdGlvbihuKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5zdGFydFJhbmdpbmdCZWFjb25zSW5SZWdpb24obikpfSxzdG9wUmFuZ2luZ0JlYWNvbnNJblJlZ2lvbjpmdW5jdGlvbihuKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5zdG9wUmFuZ2luZ0JlYWNvbnNJblJlZ2lvbihuKSl9LGdldEF1dGhvcml6YXRpb25TdGF0dXM6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5nZXRBdXRob3JpemF0aW9uU3RhdHVzKCkpfSxyZXF1ZXN0V2hlbkluVXNlQXV0aG9yaXphdGlvbjpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLnJlcXVlc3RXaGVuSW5Vc2VBdXRob3JpemF0aW9uKCkpfSxyZXF1ZXN0QWx3YXlzQXV0aG9yaXphdGlvbjpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLnJlcXVlc3RBbHdheXNBdXRob3JpemF0aW9uKCkpfSxnZXRNb25pdG9yZWRSZWdpb25zOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuZ2V0TW9uaXRvcmVkUmVnaW9ucygpKX0sZ2V0UmFuZ2VkUmVnaW9uczpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmdldFJhbmdlZFJlZ2lvbnMoKSl9LGlzUmFuZ2luZ0F2YWlsYWJsZTpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmlzUmFuZ2luZ0F2YWlsYWJsZSgpKX0saXNNb25pdG9yaW5nQXZhaWxhYmxlRm9yQ2xhc3M6ZnVuY3Rpb24obil7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuaXNNb25pdG9yaW5nQXZhaWxhYmxlRm9yQ2xhc3MobikpfSxzdGFydEFkdmVydGlzaW5nOmZ1bmN0aW9uKG4scil7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuc3RhcnRBZHZlcnRpc2luZyhuLHIpKX0sc3RvcEFkdmVydGlzaW5nOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuc3RvcEFkdmVydGlzaW5nKCkpfSxpc0FkdmVydGlzaW5nQXZhaWxhYmxlOmZ1bmN0aW9uKCl7cmV0dXJuIG8ud2hlbihlLmNvcmRvdmEucGx1Z2lucy5sb2NhdGlvbk1hbmFnZXIuaXNBZHZlcnRpc2luZ0F2YWlsYWJsZSgpKX0saXNBZHZlcnRpc2luZzpmdW5jdGlvbigpe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmlzQWR2ZXJ0aXNpbmcoKSl9LGRpc2FibGVEZWJ1Z0xvZ3M6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5kaXNhYmxlRGVidWdMb2dzKCkpfSxlbmFibGVEZWJ1Z05vdGlmaWNhdGlvbnM6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5lbmFibGVEZWJ1Z05vdGlmaWNhdGlvbnMoKSl9LGRpc2FibGVEZWJ1Z05vdGlmaWNhdGlvbnM6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5kaXNhYmxlRGVidWdOb3RpZmljYXRpb25zKCkpfSxlbmFibGVEZWJ1Z0xvZ3M6ZnVuY3Rpb24oKXtyZXR1cm4gby53aGVuKGUuY29yZG92YS5wbHVnaW5zLmxvY2F0aW9uTWFuYWdlci5lbmFibGVEZWJ1Z0xvZ3MoKSl9LGFwcGVuZFRvRGV2aWNlTG9nOmZ1bmN0aW9uKG4pe3JldHVybiBvLndoZW4oZS5jb3Jkb3ZhLnBsdWdpbnMubG9jYXRpb25NYW5hZ2VyLmFwcGVuZFRvRGV2aWNlTG9nKG4pKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuYmxlXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUJMRVwiLFtcIiRxXCIsXCIkdGltZW91dFwiLFwiJGxvZ1wiLGZ1bmN0aW9uKGUsbixyKXtyZXR1cm57c2NhbjpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gYmxlLnN0YXJ0U2NhbihyLGZ1bmN0aW9uKGUpe3Qubm90aWZ5KGUpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0pLG4oZnVuY3Rpb24oKXtibGUuc3RvcFNjYW4oZnVuY3Rpb24oKXt0LnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7dC5yZWplY3QoZSl9KX0sMWUzKm8pLHQucHJvbWlzZX0sc3RhcnRTY2FuOmZ1bmN0aW9uKGUsbixyKXtyZXR1cm4gYmxlLnN0YXJ0U2NhbihlLG4scil9LHN0b3BTY2FuOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBibGUuc3RvcFNjYW4oZnVuY3Rpb24oKXtuLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9LGNvbm5lY3Q6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBibGUuY29ubmVjdChuLGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LGRpc2Nvbm5lY3Q6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBibGUuZGlzY29ubmVjdChuLGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHJlYWQ6ZnVuY3Rpb24obixyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gYmxlLnJlYWQobixyLG8sZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0pLHQucHJvbWlzZX0sd3JpdGU6ZnVuY3Rpb24obixyLG8sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiBibGUud3JpdGUobixyLG8sdCxmdW5jdGlvbihlKXtpLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2kucmVqZWN0KGUpfSksaS5wcm9taXNlfSx3cml0ZVdpdGhvdXRSZXNwb25zZTpmdW5jdGlvbihuLHIsbyx0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIGJsZS53cml0ZVdpdGhvdXRSZXNwb25zZShuLHIsbyx0LGZ1bmN0aW9uKGUpe2kucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7aS5yZWplY3QoZSl9KSxpLnByb21pc2V9LHdyaXRlQ29tbWFuZDpmdW5jdGlvbihlLG4sbyx0KXtyZXR1cm4gci53YXJuaW5nKFwid3JpdGVDb21tYW5kIGlzIGRlcHJlY2F0ZWQsIHVzZSB3cml0ZVdpdGhvdXRSZXNwb25zZVwiKSx0aGlzLndyaXRlV2l0aG91dFJlc3BvbnNlKGUsbixvLHQpfSxzdGFydE5vdGlmaWNhdGlvbjpmdW5jdGlvbihlLG4scixvLHQpe3JldHVybiBibGUuc3RhcnROb3RpZmljYXRpb24oZSxuLHIsbyx0KX0sc3RvcE5vdGlmaWNhdGlvbjpmdW5jdGlvbihuLHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBibGUuc3RvcE5vdGlmaWNhdGlvbihuLHIsbyxmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSksdC5wcm9taXNlfSxpc0Nvbm5lY3RlZDpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGJsZS5pc0Nvbm5lY3RlZChuLGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LGVuYWJsZTpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gYmxlLmVuYWJsZShmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxpc0VuYWJsZWQ6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGJsZS5pc0VuYWJsZWQoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuYmx1ZXRvb3RoU2VyaWFsXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUJsdWV0b290aFNlcmlhbFwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57Y29ubmVjdDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCksdD1lLmRlZmVyKCksaT0hMTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwuY29ubmVjdChyLGZ1bmN0aW9uKCl7aT0hMCxvLnJlc29sdmUodCl9LGZ1bmN0aW9uKGUpe2k9PT0hMSYmdC5yZWplY3QoZSksby5yZWplY3QoZSl9KSxvLnByb21pc2V9LGNvbm5lY3RJbnNlY3VyZTpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLmNvbm5lY3RJbnNlY3VyZShyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxkaXNjb25uZWN0OmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5kaXNjb25uZWN0KGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxsaXN0OmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5saXN0KGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LGRpc2NvdmVyVW5wYWlyZWQ6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLmRpc2NvdmVyVW5wYWlyZWQoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sc2V0RGV2aWNlRGlzY292ZXJlZExpc3RlbmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5zZXREZXZpY2VEaXNjb3ZlcmVkTGlzdGVuZXIoZnVuY3Rpb24oZSl7ci5ub3RpZnkoZSl9KSxyLnByb21pc2V9LGNsZWFyRGV2aWNlRGlzY292ZXJlZExpc3RlbmVyOmZ1bmN0aW9uKCl7bi5ibHVldG9vdGhTZXJpYWwuY2xlYXJEZXZpY2VEaXNjb3ZlcmVkTGlzdGVuZXIoKX0sc2hvd0JsdWV0b290aFNldHRpbmdzOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5zaG93Qmx1ZXRvb3RoU2V0dGluZ3MoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LGlzRW5hYmxlZDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwuaXNFbmFibGVkKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0sZW5hYmxlOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5lbmFibGUoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxpc0Nvbm5lY3RlZDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwuaXNDb25uZWN0ZWQoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxhdmFpbGFibGU6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLmF2YWlsYWJsZShmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxyZWFkOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5yZWFkKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHJlYWRVbnRpbDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLnJlYWRVbnRpbChyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHdyaXRlOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwud3JpdGUocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sc3Vic2NyaWJlOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwuc3Vic2NyaWJlKHIsZnVuY3Rpb24oZSl7by5ub3RpZnkoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxzdWJzY3JpYmVSYXdEYXRhOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmJsdWV0b290aFNlcmlhbC5zdWJzY3JpYmVSYXdEYXRhKGZ1bmN0aW9uKGUpe3Iubm90aWZ5KGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sdW5zdWJzY3JpYmU6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLnVuc3Vic2NyaWJlKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSx1bnN1YnNjcmliZVJhd0RhdGE6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLnVuc3Vic2NyaWJlUmF3RGF0YShmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sY2xlYXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uYmx1ZXRvb3RoU2VyaWFsLmNsZWFyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxyZWFkUlNTSTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5ibHVldG9vdGhTZXJpYWwucmVhZFJTU0koZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuYnJpZ2h0bmVzc1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFCcmlnaHRuZXNzXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntnZXQ6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uY29yZG92YT9uLmNvcmRvdmEucGx1Z2lucy5icmlnaHRuZXNzLmdldEJyaWdodG5lc3MoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pOnIucmVqZWN0KFwiTm90IHN1cHBvcnRlZCB3aXRob3V0IGNvcmRvdmEuanNcIiksci5wcm9taXNlfSxzZXQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmNvcmRvdmE/bi5jb3Jkb3ZhLnBsdWdpbnMuYnJpZ2h0bmVzcy5zZXRCcmlnaHRuZXNzKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pOm8ucmVqZWN0KFwiTm90IHN1cHBvcnRlZCB3aXRob3V0IGNvcmRvdmEuanNcIiksby5wcm9taXNlfSxzZXRLZWVwU2NyZWVuT246ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmNvcmRvdmE/bi5jb3Jkb3ZhLnBsdWdpbnMuYnJpZ2h0bmVzcy5zZXRLZWVwU2NyZWVuT24ocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSk6by5yZWplY3QoXCJOb3Qgc3VwcG9ydGVkIHdpdGhvdXQgY29yZG92YS5qc1wiKSxvLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmNhbGVuZGFyXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUNhbGVuZGFyXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntjcmVhdGVDYWxlbmRhcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCksdD1uLnBsdWdpbnMuY2FsZW5kYXIuZ2V0Q3JlYXRlQ2FsZW5kYXJPcHRpb25zKCk7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIHI/dC5jYWxlbmRhck5hbWU9cjp0PWFuZ3VsYXIuZXh0ZW5kKHQsciksbi5wbHVnaW5zLmNhbGVuZGFyLmNyZWF0ZUNhbGVuZGFyKHQsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sZGVsZXRlQ2FsZW5kYXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuY2FsZW5kYXIuZGVsZXRlQ2FsZW5kYXIocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxjcmVhdGVFdmVudDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCksdD17dGl0bGU6bnVsbCxsb2NhdGlvbjpudWxsLG5vdGVzOm51bGwsc3RhcnREYXRlOm51bGwsZW5kRGF0ZTpudWxsfTtyZXR1cm4gdD1hbmd1bGFyLmV4dGVuZCh0LHIpLG4ucGx1Z2lucy5jYWxlbmRhci5jcmVhdGVFdmVudCh0LnRpdGxlLHQubG9jYXRpb24sdC5ub3RlcyxuZXcgRGF0ZSh0LnN0YXJ0RGF0ZSksbmV3IERhdGUodC5lbmREYXRlKSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxjcmVhdGVFdmVudFdpdGhPcHRpb25zOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKSx0PVtdLGk9d2luZG93LnBsdWdpbnMuY2FsZW5kYXIuZ2V0Q2FsZW5kYXJPcHRpb25zKCksYT17dGl0bGU6bnVsbCxsb2NhdGlvbjpudWxsLG5vdGVzOm51bGwsc3RhcnREYXRlOm51bGwsZW5kRGF0ZTpudWxsfTt0PU9iamVjdC5rZXlzKGEpO2Zvcih2YXIgYyBpbiByKS0xPT09dC5pbmRleE9mKGMpP2lbY109cltjXTphW2NdPXJbY107cmV0dXJuIG4ucGx1Z2lucy5jYWxlbmRhci5jcmVhdGVFdmVudFdpdGhPcHRpb25zKGEudGl0bGUsYS5sb2NhdGlvbixhLm5vdGVzLG5ldyBEYXRlKGEuc3RhcnREYXRlKSxuZXcgRGF0ZShhLmVuZERhdGUpLGksZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sY3JlYXRlRXZlbnRJbnRlcmFjdGl2ZWx5OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKSx0PXt0aXRsZTpudWxsLGxvY2F0aW9uOm51bGwsbm90ZXM6bnVsbCxzdGFydERhdGU6bnVsbCxlbmREYXRlOm51bGx9O3JldHVybiB0PWFuZ3VsYXIuZXh0ZW5kKHQsciksbi5wbHVnaW5zLmNhbGVuZGFyLmNyZWF0ZUV2ZW50SW50ZXJhY3RpdmVseSh0LnRpdGxlLHQubG9jYXRpb24sdC5ub3RlcyxuZXcgRGF0ZSh0LnN0YXJ0RGF0ZSksbmV3IERhdGUodC5lbmREYXRlKSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxjcmVhdGVFdmVudEluTmFtZWRDYWxlbmRhcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCksdD17dGl0bGU6bnVsbCxsb2NhdGlvbjpudWxsLG5vdGVzOm51bGwsc3RhcnREYXRlOm51bGwsZW5kRGF0ZTpudWxsLGNhbGVuZGFyTmFtZTpudWxsfTtyZXR1cm4gdD1hbmd1bGFyLmV4dGVuZCh0LHIpLG4ucGx1Z2lucy5jYWxlbmRhci5jcmVhdGVFdmVudEluTmFtZWRDYWxlbmRhcih0LnRpdGxlLHQubG9jYXRpb24sdC5ub3RlcyxuZXcgRGF0ZSh0LnN0YXJ0RGF0ZSksbmV3IERhdGUodC5lbmREYXRlKSx0LmNhbGVuZGFyTmFtZSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxmaW5kRXZlbnQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpLHQ9e3RpdGxlOm51bGwsbG9jYXRpb246bnVsbCxub3RlczpudWxsLHN0YXJ0RGF0ZTpudWxsLGVuZERhdGU6bnVsbH07cmV0dXJuIHQ9YW5ndWxhci5leHRlbmQodCxyKSxuLnBsdWdpbnMuY2FsZW5kYXIuZmluZEV2ZW50KHQudGl0bGUsdC5sb2NhdGlvbix0Lm5vdGVzLG5ldyBEYXRlKHQuc3RhcnREYXRlKSxuZXcgRGF0ZSh0LmVuZERhdGUpLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGxpc3RFdmVudHNJblJhbmdlOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuY2FsZW5kYXIubGlzdEV2ZW50c0luUmFuZ2UocixvLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7dC5yZWplY3QoZSl9KSx0LnByb21pc2V9LGxpc3RDYWxlbmRhcnM6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5jYWxlbmRhci5saXN0Q2FsZW5kYXJzKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LGZpbmRBbGxFdmVudHNJbk5hbWVkQ2FsZW5kYXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuY2FsZW5kYXIuZmluZEFsbEV2ZW50c0luTmFtZWRDYWxlbmRhcihyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LG1vZGlmeUV2ZW50OmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKSx0PXt0aXRsZTpudWxsLGxvY2F0aW9uOm51bGwsbm90ZXM6bnVsbCxzdGFydERhdGU6bnVsbCxlbmREYXRlOm51bGwsbmV3VGl0bGU6bnVsbCxuZXdMb2NhdGlvbjpudWxsLG5ld05vdGVzOm51bGwsbmV3U3RhcnREYXRlOm51bGwsbmV3RW5kRGF0ZTpudWxsfTtyZXR1cm4gdD1hbmd1bGFyLmV4dGVuZCh0LHIpLG4ucGx1Z2lucy5jYWxlbmRhci5tb2RpZnlFdmVudCh0LnRpdGxlLHQubG9jYXRpb24sdC5ub3RlcyxuZXcgRGF0ZSh0LnN0YXJ0RGF0ZSksbmV3IERhdGUodC5lbmREYXRlKSx0Lm5ld1RpdGxlLHQubmV3TG9jYXRpb24sdC5uZXdOb3RlcyxuZXcgRGF0ZSh0Lm5ld1N0YXJ0RGF0ZSksbmV3IERhdGUodC5uZXdFbmREYXRlKSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxkZWxldGVFdmVudDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCksdD17bmV3VGl0bGU6bnVsbCxsb2NhdGlvbjpudWxsLG5vdGVzOm51bGwsc3RhcnREYXRlOm51bGwsZW5kRGF0ZTpudWxsfTtyZXR1cm4gdD1hbmd1bGFyLmV4dGVuZCh0LHIpLG4ucGx1Z2lucy5jYWxlbmRhci5kZWxldGVFdmVudCh0Lm5ld1RpdGxlLHQubG9jYXRpb24sdC5ub3RlcyxuZXcgRGF0ZSh0LnN0YXJ0RGF0ZSksbmV3IERhdGUodC5lbmREYXRlKSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5jYW1lcmFcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQ2FtZXJhXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57Z2V0UGljdHVyZTpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5jYW1lcmE/KG5hdmlnYXRvci5jYW1lcmEuZ2V0UGljdHVyZShmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKSxyLnByb21pc2UpOihyLnJlc29sdmUobnVsbCksci5wcm9taXNlKX0sY2xlYW51cDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmNhbWVyYS5jbGVhbnVwKGZ1bmN0aW9uKCl7bi5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5jYXB0dXJlXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUNhcHR1cmVcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntjYXB0dXJlQXVkaW86ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZGV2aWNlLmNhcHR1cmU/KG5hdmlnYXRvci5kZXZpY2UuY2FwdHVyZS5jYXB0dXJlQXVkaW8oZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbiksci5wcm9taXNlKTooci5yZXNvbHZlKG51bGwpLHIucHJvbWlzZSl9LGNhcHR1cmVJbWFnZTpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5kZXZpY2UuY2FwdHVyZT8obmF2aWdhdG9yLmRldmljZS5jYXB0dXJlLmNhcHR1cmVJbWFnZShmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKSxyLnByb21pc2UpOihyLnJlc29sdmUobnVsbCksci5wcm9taXNlKX0sY2FwdHVyZVZpZGVvOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmRldmljZS5jYXB0dXJlPyhuYXZpZ2F0b3IuZGV2aWNlLmNhcHR1cmUuY2FwdHVyZVZpZGVvKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LG4pLHIucHJvbWlzZSk6KHIucmVzb2x2ZShudWxsKSxyLnByb21pc2UpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5jYXJkSU9cIixbXSkucHJvdmlkZXIoXCIkY29yZG92YU5nQ2FyZElPXCIsW2Z1bmN0aW9uKCl7dmFyIGU9W1wiY2FyZF90eXBlXCIsXCJyZWRhY3RlZF9jYXJkX251bWJlclwiLFwiY2FyZF9udW1iZXJcIixcImV4cGlyeV9tb250aFwiLFwiZXhwaXJ5X3llYXJcIixcInNob3J0X2V4cGlyeV95ZWFyXCIsXCJjdnZcIixcInppcFwiXSxuPXtleHBpcnk6ITAsY3Z2OiEwLHppcDohMSxzdXBwcmVzc01hbnVhbDohMSxzdXBwcmVzc0NvbmZpcm06ITEsaGlkZUxvZ286ITB9O3RoaXMuc2V0Q2FyZElPUmVzcG9uc2VGaWVsZHM9ZnVuY3Rpb24obil7biYmYW5ndWxhci5pc0FycmF5KG4pJiYoZT1uKX0sdGhpcy5zZXRTY2FuZXJDb25maWc9ZnVuY3Rpb24oZSl7ZSYmYW5ndWxhci5pc09iamVjdChlKSYmKG4uZXhwaXJ5PWUuZXhwaXJ5fHwhMCxuLmN2dj1lLmN2dnx8ITAsbi56aXA9ZS56aXB8fCExLG4uc3VwcHJlc3NNYW51YWw9ZS5zdXBwcmVzc01hbnVhbHx8ITEsbi5zdXBwcmVzc0NvbmZpcm09ZS5zdXBwcmVzc0NvbmZpcm18fCExLG4uaGlkZUxvZ289ZS5oaWRlTG9nb3x8ITApfSx0aGlzLiRnZXQ9W1wiJHFcIixmdW5jdGlvbihyKXtyZXR1cm57c2NhbkNhcmQ6ZnVuY3Rpb24oKXt2YXIgbz1yLmRlZmVyKCk7cmV0dXJuIENhcmRJTy5zY2FuKG4sZnVuY3Rpb24obil7aWYobnVsbD09PW4pby5yZWplY3QobnVsbCk7ZWxzZXtmb3IodmFyIHI9e30sdD0wLGk9ZS5sZW5ndGg7aT50O3QrKyl7dmFyIGE9ZVt0XTtcInNob3J0X2V4cGlyeV95ZWFyXCI9PT1hP3JbYV09U3RyaW5nKG4uZXhwaXJ5X3llYXIpLnN1YnN0cigyLDIpfHxcIlwiOnJbYV09blthXXx8XCJcIn1vLnJlc29sdmUocil9fSxmdW5jdGlvbigpe28ucmVqZWN0KG51bGwpfSksby5wcm9taXNlfX19XX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmNsaXBib2FyZFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFDbGlwYm9hcmRcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2NvcHk6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmNvcmRvdmEucGx1Z2lucy5jbGlwYm9hcmQuY29weShyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0scGFzdGU6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uY29yZG92YS5wbHVnaW5zLmNsaXBib2FyZC5wYXN0ZShmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuY29udGFjdHNcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhQ29udGFjdHNcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntzYXZlOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKSxvPW5hdmlnYXRvci5jb250YWN0cy5jcmVhdGUobik7cmV0dXJuIG8uc2F2ZShmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxyZW1vdmU6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpLG89bmF2aWdhdG9yLmNvbnRhY3RzLmNyZWF0ZShuKTtyZXR1cm4gby5yZW1vdmUoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sY2xvbmU6ZnVuY3Rpb24oZSl7dmFyIG49bmF2aWdhdG9yLmNvbnRhY3RzLmNyZWF0ZShlKTtyZXR1cm4gbi5jbG9uZShlKX0sZmluZDpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCksbz1uLmZpZWxkc3x8W1wiaWRcIixcImRpc3BsYXlOYW1lXCJdO3JldHVybiBkZWxldGUgbi5maWVsZHMsMD09PU9iamVjdC5rZXlzKG4pLmxlbmd0aD9uYXZpZ2F0b3IuY29udGFjdHMuZmluZChvLGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KTpuYXZpZ2F0b3IuY29udGFjdHMuZmluZChvLGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LG4pLHIucHJvbWlzZX0scGlja0NvbnRhY3Q6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5jb250YWN0cy5waWNrQ29udGFjdChmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5kYXRlUGlja2VyXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YURhdGVQaWNrZXJcIixbXCIkd2luZG93XCIsXCIkcVwiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3Nob3c6ZnVuY3Rpb24ocil7dmFyIG89bi5kZWZlcigpO3JldHVybiByPXJ8fHtkYXRlOm5ldyBEYXRlLG1vZGU6XCJkYXRlXCJ9LGUuZGF0ZVBpY2tlci5zaG93KHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZGV2aWNlXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YURldmljZVwiLFtmdW5jdGlvbigpe3JldHVybntnZXREZXZpY2U6ZnVuY3Rpb24oKXtyZXR1cm4gZGV2aWNlfSxnZXRDb3Jkb3ZhOmZ1bmN0aW9uKCl7cmV0dXJuIGRldmljZS5jb3Jkb3ZhfSxnZXRNb2RlbDpmdW5jdGlvbigpe3JldHVybiBkZXZpY2UubW9kZWx9LGdldE5hbWU6ZnVuY3Rpb24oKXtyZXR1cm4gZGV2aWNlLm5hbWV9LGdldFBsYXRmb3JtOmZ1bmN0aW9uKCl7cmV0dXJuIGRldmljZS5wbGF0Zm9ybX0sZ2V0VVVJRDpmdW5jdGlvbigpe3JldHVybiBkZXZpY2UudXVpZH0sZ2V0VmVyc2lvbjpmdW5jdGlvbigpe3JldHVybiBkZXZpY2UudmVyc2lvbn0sZ2V0TWFudWZhY3R1cmVyOmZ1bmN0aW9uKCl7cmV0dXJuIGRldmljZS5tYW51ZmFjdHVyZXJ9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmRldmljZU1vdGlvblwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFEZXZpY2VNb3Rpb25cIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntnZXRDdXJyZW50QWNjZWxlcmF0aW9uOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBhbmd1bGFyLmlzVW5kZWZpbmVkKG5hdmlnYXRvci5hY2NlbGVyb21ldGVyKXx8IWFuZ3VsYXIuaXNGdW5jdGlvbihuYXZpZ2F0b3IuYWNjZWxlcm9tZXRlci5nZXRDdXJyZW50QWNjZWxlcmF0aW9uKT8obi5yZWplY3QoXCJEZXZpY2UgZG8gbm90IHN1cHBvcnQgd2F0Y2hBY2NlbGVyYXRpb25cIiksbi5wcm9taXNlKToobmF2aWdhdG9yLmFjY2VsZXJvbWV0ZXIuZ2V0Q3VycmVudEFjY2VsZXJhdGlvbihmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlKX0sd2F0Y2hBY2NlbGVyYXRpb246ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO2lmKGFuZ3VsYXIuaXNVbmRlZmluZWQobmF2aWdhdG9yLmFjY2VsZXJvbWV0ZXIpfHwhYW5ndWxhci5pc0Z1bmN0aW9uKG5hdmlnYXRvci5hY2NlbGVyb21ldGVyLndhdGNoQWNjZWxlcmF0aW9uKSlyZXR1cm4gci5yZWplY3QoXCJEZXZpY2UgZG8gbm90IHN1cHBvcnQgd2F0Y2hBY2NlbGVyYXRpb25cIiksci5wcm9taXNlO3ZhciBvPW5hdmlnYXRvci5hY2NlbGVyb21ldGVyLndhdGNoQWNjZWxlcmF0aW9uKGZ1bmN0aW9uKGUpe3Iubm90aWZ5KGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbik7cmV0dXJuIHIucHJvbWlzZS5jYW5jZWw9ZnVuY3Rpb24oKXtuYXZpZ2F0b3IuYWNjZWxlcm9tZXRlci5jbGVhcldhdGNoKG8pfSxyLnByb21pc2UuY2xlYXJXYXRjaD1mdW5jdGlvbihlKXtuYXZpZ2F0b3IuYWNjZWxlcm9tZXRlci5jbGVhcldhdGNoKGV8fG8pfSxyLnByb21pc2Uud2F0Y2hJRD1vLHIucHJvbWlzZX0sY2xlYXJXYXRjaDpmdW5jdGlvbihlKXtyZXR1cm4gbmF2aWdhdG9yLmFjY2VsZXJvbWV0ZXIuY2xlYXJXYXRjaChlKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZGV2aWNlT3JpZW50YXRpb25cIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhRGV2aWNlT3JpZW50YXRpb25cIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3ZhciBuPXtmcmVxdWVuY3k6M2UzfTtyZXR1cm57Z2V0Q3VycmVudEhlYWRpbmc6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5jb21wYXNzPyhuYXZpZ2F0b3IuY29tcGFzcy5nZXRDdXJyZW50SGVhZGluZyhmdW5jdGlvbihlKXtuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlKToobi5yZWplY3QoXCJObyBjb21wYXNzIG9uIERldmljZVwiKSxuLnByb21pc2UpfSx3YXRjaEhlYWRpbmc6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO2lmKCFuYXZpZ2F0b3IuY29tcGFzcylyZXR1cm4gby5yZWplY3QoXCJObyBjb21wYXNzIG9uIERldmljZVwiKSxvLnByb21pc2U7dmFyIHQ9YW5ndWxhci5leHRlbmQobixyKSxpPW5hdmlnYXRvci5jb21wYXNzLndhdGNoSGVhZGluZyhmdW5jdGlvbihlKXtvLm5vdGlmeShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9LHQpO3JldHVybiBvLnByb21pc2UuY2FuY2VsPWZ1bmN0aW9uKCl7bmF2aWdhdG9yLmNvbXBhc3MuY2xlYXJXYXRjaChpKX0sby5wcm9taXNlLmNsZWFyV2F0Y2g9ZnVuY3Rpb24oZSl7bmF2aWdhdG9yLmNvbXBhc3MuY2xlYXJXYXRjaChlfHxpKX0sby5wcm9taXNlLndhdGNoSUQ9aSxvLnByb21pc2V9LGNsZWFyV2F0Y2g6ZnVuY3Rpb24oZSl7cmV0dXJuIG5hdmlnYXRvci5jb21wYXNzLmNsZWFyV2F0Y2goZSl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmRpYWxvZ3NcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhRGlhbG9nc1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57YWxlcnQ6ZnVuY3Rpb24ocixvLHQpe3ZhciBpPWUuZGVmZXIoKTtyZXR1cm4gbi5uYXZpZ2F0b3Iubm90aWZpY2F0aW9uP25hdmlnYXRvci5ub3RpZmljYXRpb24uYWxlcnQocixmdW5jdGlvbigpe2kucmVzb2x2ZSgpfSxvLHQpOihuLmFsZXJ0KHIpLGkucmVzb2x2ZSgpKSxpLnByb21pc2V9LGNvbmZpcm06ZnVuY3Rpb24ocixvLHQpe3ZhciBpPWUuZGVmZXIoKTtyZXR1cm4gbi5uYXZpZ2F0b3Iubm90aWZpY2F0aW9uP25hdmlnYXRvci5ub3RpZmljYXRpb24uY29uZmlybShyLGZ1bmN0aW9uKGUpe2kucmVzb2x2ZShlKX0sbyx0KTpuLmNvbmZpcm0ocik/aS5yZXNvbHZlKDEpOmkucmVzb2x2ZSgyKSxpLnByb21pc2V9LHByb21wdDpmdW5jdGlvbihyLG8sdCxpKXt2YXIgYT1lLmRlZmVyKCk7aWYobi5uYXZpZ2F0b3Iubm90aWZpY2F0aW9uKW5hdmlnYXRvci5ub3RpZmljYXRpb24ucHJvbXB0KHIsZnVuY3Rpb24oZSl7YS5yZXNvbHZlKGUpfSxvLHQsaSk7ZWxzZXt2YXIgYz1uLnByb21wdChyLGkpO251bGwhPT1jP2EucmVzb2x2ZSh7aW5wdXQxOmMsYnV0dG9uSW5kZXg6MX0pOmEucmVzb2x2ZSh7aW5wdXQxOmMsYnV0dG9uSW5kZXg6Mn0pfXJldHVybiBhLnByb21pc2V9LGJlZXA6ZnVuY3Rpb24oZSl7cmV0dXJuIG5hdmlnYXRvci5ub3RpZmljYXRpb24uYmVlcChlKX0sYWN0aXZpdHlTdGFydDpmdW5jdGlvbihuLHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm5cImFuZHJvaWRcIj09PWNvcmRvdmEucGxhdGZvcm1JZD8obmF2aWdhdG9yLm5vdGlmaWNhdGlvbi5hY3Rpdml0eVN0YXJ0KHIsbiksby5yZXNvbHZlKCkpOm8ucmVqZWN0KG4sciksby5wcm9taXNlfSxhY3Rpdml0eVN0b3A6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuXCJhbmRyb2lkXCI9PT1jb3Jkb3ZhLnBsYXRmb3JtSWQ/KG5hdmlnYXRvci5ub3RpZmljYXRpb24uYWN0aXZpdHlTdG9wKCksbi5yZXNvbHZlKCkpOm4ucmVqZWN0KCksbi5wcm9taXNlfSxwcm9ncmVzc1N0YXJ0OmZ1bmN0aW9uKG4scil7dmFyIG89ZS5kZWZlcigpO3JldHVyblwiYW5kcm9pZFwiPT09Y29yZG92YS5wbGF0Zm9ybUlkPyhuYXZpZ2F0b3Iubm90aWZpY2F0aW9uLnByb2dyZXNzU3RhcnQocixuKSxvLnJlc29sdmUoKSk6by5yZWplY3QobixyKSxvLnByb21pc2V9LHByb2dyZXNzU3RvcDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm5cImFuZHJvaWRcIj09PWNvcmRvdmEucGxhdGZvcm1JZD8obmF2aWdhdG9yLm5vdGlmaWNhdGlvbi5wcm9ncmVzc1N0b3AoKSxuLnJlc29sdmUoKSk6bi5yZWplY3QoKSxuLnByb21pc2V9LHByb2dyZXNzVmFsdWU6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVyblwiYW5kcm9pZFwiPT09Y29yZG92YS5wbGF0Zm9ybUlkPyhuYXZpZ2F0b3Iubm90aWZpY2F0aW9uLnByb2dyZXNzVmFsdWUobiksci5yZXNvbHZlKCkpOnIucmVqZWN0KG4pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZW1haWxDb21wb3NlclwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFFbWFpbENvbXBvc2VyXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57aXNBdmFpbGFibGU6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5lbWFpbC5pc0F2YWlsYWJsZShmdW5jdGlvbihlKXtlP24ucmVzb2x2ZSgpOm4ucmVqZWN0KCl9KSxuLnByb21pc2V9LG9wZW46ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuZW1haWwub3BlbihuLGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0sYWRkQWxpYXM6ZnVuY3Rpb24oZSxuKXtjb3Jkb3ZhLnBsdWdpbnMuZW1haWwuYWRkQWxpYXMoZSxuKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmFjZWJvb2tcIixbXSkucHJvdmlkZXIoXCIkY29yZG92YUZhY2Vib29rXCIsW2Z1bmN0aW9uKCl7dGhpcy5icm93c2VySW5pdD1mdW5jdGlvbihlLG4pe3RoaXMuYXBwSUQ9ZSx0aGlzLmFwcFZlcnNpb249bnx8XCJ2Mi4wXCIsZmFjZWJvb2tDb25uZWN0UGx1Z2luLmJyb3dzZXJJbml0KHRoaXMuYXBwSUQsdGhpcy5hcHBWZXJzaW9uKX0sdGhpcy4kZ2V0PVtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2xvZ2luOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gZmFjZWJvb2tDb25uZWN0UGx1Z2luLmxvZ2luKG4sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sc2hvd0RpYWxvZzpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGZhY2Vib29rQ29ubmVjdFBsdWdpbi5zaG93RGlhbG9nKG4sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sYXBpOmZ1bmN0aW9uKG4scil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBmYWNlYm9va0Nvbm5lY3RQbHVnaW4uYXBpKG4scixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxnZXRBY2Nlc3NUb2tlbjpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gZmFjZWJvb2tDb25uZWN0UGx1Z2luLmdldEFjY2Vzc1Rva2VuKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9LGdldExvZ2luU3RhdHVzOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBmYWNlYm9va0Nvbm5lY3RQbHVnaW4uZ2V0TG9naW5TdGF0dXMoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sbG9nb3V0OmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBmYWNlYm9va0Nvbm5lY3RQbHVnaW4ubG9nb3V0KGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9fX1dfV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmFjZWJvb2tBZHNcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhRmFjZWJvb2tBZHNcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3NldE9wdGlvbnM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLkZhY2Vib29rQWRzLnNldE9wdGlvbnMocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LGNyZWF0ZUJhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uRmFjZWJvb2tBZHMuY3JlYXRlQmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxyZW1vdmVCYW5uZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uRmFjZWJvb2tBZHMucmVtb3ZlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0sc2hvd0Jhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uRmFjZWJvb2tBZHMuc2hvd0Jhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0Jhbm5lckF0WFk6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4uRmFjZWJvb2tBZHMuc2hvd0Jhbm5lckF0WFkocixvLGZ1bmN0aW9uKCl7dC5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7dC5yZWplY3QoKX0pLHQucHJvbWlzZX0saGlkZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5GYWNlYm9va0Fkcy5oaWRlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0scHJlcGFyZUludGVyc3RpdGlhbDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uRmFjZWJvb2tBZHMucHJlcGFyZUludGVyc3RpdGlhbChyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0ludGVyc3RpdGlhbDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5GYWNlYm9va0Fkcy5zaG93SW50ZXJzdGl0aWFsKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7XG5yLnJlamVjdCgpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5maWxlXCIsW10pLmNvbnN0YW50KFwiJGNvcmRvdmFGaWxlRXJyb3JcIix7MTpcIk5PVF9GT1VORF9FUlJcIiwyOlwiU0VDVVJJVFlfRVJSXCIsMzpcIkFCT1JUX0VSUlwiLDQ6XCJOT1RfUkVBREFCTEVfRVJSXCIsNTpcIkVOQ09ESU5HX0VSUlwiLDY6XCJOT19NT0RJRklDQVRJT05fQUxMT1dFRF9FUlJcIiw3OlwiSU5WQUxJRF9TVEFURV9FUlJcIiw4OlwiU1lOVEFYX0VSUlwiLDk6XCJJTlZBTElEX01PRElGSUNBVElPTl9FUlJcIiwxMDpcIlFVT1RBX0VYQ0VFREVEX0VSUlwiLDExOlwiVFlQRV9NSVNNQVRDSF9FUlJcIiwxMjpcIlBBVEhfRVhJU1RTX0VSUlwifSkucHJvdmlkZXIoXCIkY29yZG92YUZpbGVcIixbZnVuY3Rpb24oKXt0aGlzLiRnZXQ9W1wiJHFcIixcIiR3aW5kb3dcIixcIiRjb3Jkb3ZhRmlsZUVycm9yXCIsZnVuY3Rpb24oZSxuLHIpe3JldHVybntnZXRGcmVlRGlza1NwYWNlOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLmV4ZWMoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0sXCJGaWxlXCIsXCJnZXRGcmVlRGlza1NwYWNlXCIsW10pLG4ucHJvbWlzZX0sY2hlY2tEaXI6ZnVuY3Rpb24obyx0KXt2YXIgaT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmkucmVqZWN0KFwiZGlyZWN0b3J5IGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e3ZhciBhPW8rdDtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwoYSxmdW5jdGlvbihlKXtlLmlzRGlyZWN0b3J5PT09ITA/aS5yZXNvbHZlKGUpOmkucmVqZWN0KHtjb2RlOjEzLG1lc3NhZ2U6XCJpbnB1dCBpcyBub3QgYSBkaXJlY3RvcnlcIn0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9Y2F0Y2goYyl7Yy5tZXNzYWdlPXJbYy5jb2RlXSxpLnJlamVjdChjKX1yZXR1cm4gaS5wcm9taXNlfSxjaGVja0ZpbGU6ZnVuY3Rpb24obyx0KXt2YXIgaT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmkucmVqZWN0KFwiZGlyZWN0b3J5IGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e3ZhciBhPW8rdDtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwoYSxmdW5jdGlvbihlKXtlLmlzRmlsZT09PSEwP2kucmVzb2x2ZShlKTppLnJlamVjdCh7Y29kZToxMyxtZXNzYWdlOlwiaW5wdXQgaXMgbm90IGEgZmlsZVwifSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX1jYXRjaChjKXtjLm1lc3NhZ2U9cltjLmNvZGVdLGkucmVqZWN0KGMpfXJldHVybiBpLnByb21pc2V9LGNyZWF0ZURpcjpmdW5jdGlvbihvLHQsaSl7dmFyIGE9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZhLnJlamVjdChcImRpcmVjdG9yeSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpLGk9aT8hMTohMDt2YXIgYz17Y3JlYXRlOiEwLGV4Y2x1c2l2ZTppfTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKG8sZnVuY3Rpb24oZSl7ZS5nZXREaXJlY3RvcnkodCxjLGZ1bmN0aW9uKGUpe2EucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxhLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGEucmVqZWN0KGUpfSl9Y2F0Y2godSl7dS5tZXNzYWdlPXJbdS5jb2RlXSxhLnJlamVjdCh1KX1yZXR1cm4gYS5wcm9taXNlfSxjcmVhdGVGaWxlOmZ1bmN0aW9uKG8sdCxpKXt2YXIgYT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmEucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIiksaT1pPyExOiEwO3ZhciBjPXtjcmVhdGU6ITAsZXhjbHVzaXZlOml9O3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwobyxmdW5jdGlvbihlKXtlLmdldEZpbGUodCxjLGZ1bmN0aW9uKGUpe2EucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxhLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGEucmVqZWN0KGUpfSl9Y2F0Y2godSl7dS5tZXNzYWdlPXJbdS5jb2RlXSxhLnJlamVjdCh1KX1yZXR1cm4gYS5wcm9taXNlfSxyZW1vdmVEaXI6ZnVuY3Rpb24obyx0KXt2YXIgaT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmkucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChvLGZ1bmN0aW9uKGUpe2UuZ2V0RGlyZWN0b3J5KHQse2NyZWF0ZTohMX0sZnVuY3Rpb24oZSl7ZS5yZW1vdmUoZnVuY3Rpb24oKXtpLnJlc29sdmUoe3N1Y2Nlc3M6ITAsZmlsZVJlbW92ZWQ6ZX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfWNhdGNoKGEpe2EubWVzc2FnZT1yW2EuY29kZV0saS5yZWplY3QoYSl9cmV0dXJuIGkucHJvbWlzZX0scmVtb3ZlRmlsZTpmdW5jdGlvbihvLHQpe3ZhciBpPWUuZGVmZXIoKTsvXlxcLy8udGVzdCh0KSYmaS5yZWplY3QoXCJmaWxlLW5hbWUgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKG8sZnVuY3Rpb24oZSl7ZS5nZXRGaWxlKHQse2NyZWF0ZTohMX0sZnVuY3Rpb24oZSl7ZS5yZW1vdmUoZnVuY3Rpb24oKXtpLnJlc29sdmUoe3N1Y2Nlc3M6ITAsZmlsZVJlbW92ZWQ6ZX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfWNhdGNoKGEpe2EubWVzc2FnZT1yW2EuY29kZV0saS5yZWplY3QoYSl9cmV0dXJuIGkucHJvbWlzZX0scmVtb3ZlUmVjdXJzaXZlbHk6ZnVuY3Rpb24obyx0KXt2YXIgaT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmkucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChvLGZ1bmN0aW9uKGUpe2UuZ2V0RGlyZWN0b3J5KHQse2NyZWF0ZTohMX0sZnVuY3Rpb24oZSl7ZS5yZW1vdmVSZWN1cnNpdmVseShmdW5jdGlvbigpe2kucmVzb2x2ZSh7c3VjY2VzczohMCxmaWxlUmVtb3ZlZDplfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9Y2F0Y2goYSl7YS5tZXNzYWdlPXJbYS5jb2RlXSxpLnJlamVjdChhKX1yZXR1cm4gaS5wcm9taXNlfSx3cml0ZUZpbGU6ZnVuY3Rpb24obyx0LGksYSl7dmFyIGM9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZjLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpLGE9YT8hMTohMDt2YXIgdT17Y3JlYXRlOiEwLGV4Y2x1c2l2ZTphfTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKG8sZnVuY3Rpb24oZSl7ZS5nZXRGaWxlKHQsdSxmdW5jdGlvbihlKXtlLmNyZWF0ZVdyaXRlcihmdW5jdGlvbihlKXt1LmFwcGVuZD09PSEwJiZlLnNlZWsoZS5sZW5ndGgpLHUudHJ1bmNhdGUmJmUudHJ1bmNhdGUodS50cnVuY2F0ZSksZS5vbndyaXRlZW5kPWZ1bmN0aW9uKGUpe3RoaXMuZXJyb3I/Yy5yZWplY3QodGhpcy5lcnJvcik6Yy5yZXNvbHZlKGUpfSxlLndyaXRlKGkpLGMucHJvbWlzZS5hYm9ydD1mdW5jdGlvbigpe2UuYWJvcnQoKX19KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxjLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGMucmVqZWN0KGUpfSl9Y2F0Y2gocyl7cy5tZXNzYWdlPXJbcy5jb2RlXSxjLnJlamVjdChzKX1yZXR1cm4gYy5wcm9taXNlfSx3cml0ZUV4aXN0aW5nRmlsZTpmdW5jdGlvbihvLHQsaSl7dmFyIGE9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZhLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwobyxmdW5jdGlvbihlKXtlLmdldEZpbGUodCx7Y3JlYXRlOiExfSxmdW5jdGlvbihlKXtlLmNyZWF0ZVdyaXRlcihmdW5jdGlvbihlKXtlLnNlZWsoZS5sZW5ndGgpLGUub253cml0ZWVuZD1mdW5jdGlvbihlKXt0aGlzLmVycm9yP2EucmVqZWN0KHRoaXMuZXJyb3IpOmEucmVzb2x2ZShlKX0sZS53cml0ZShpKSxhLnByb21pc2UuYWJvcnQ9ZnVuY3Rpb24oKXtlLmFib3J0KCl9fSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxhLnJlamVjdChlKX0pfWNhdGNoKGMpe2MubWVzc2FnZT1yW2MuY29kZV0sYS5yZWplY3QoYyl9cmV0dXJuIGEucHJvbWlzZX0scmVhZEFzVGV4dDpmdW5jdGlvbihvLHQpe3ZhciBpPWUuZGVmZXIoKTsvXlxcLy8udGVzdCh0KSYmaS5yZWplY3QoXCJmaWxlLW5hbWUgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKG8sZnVuY3Rpb24oZSl7ZS5nZXRGaWxlKHQse2NyZWF0ZTohMX0sZnVuY3Rpb24oZSl7ZS5maWxlKGZ1bmN0aW9uKGUpe3ZhciBuPW5ldyBGaWxlUmVhZGVyO24ub25sb2FkZW5kPWZ1bmN0aW9uKGUpe3ZvaWQgMCE9PWUudGFyZ2V0LnJlc3VsdHx8bnVsbCE9PWUudGFyZ2V0LnJlc3VsdD9pLnJlc29sdmUoZS50YXJnZXQucmVzdWx0KTp2b2lkIDAhPT1lLnRhcmdldC5lcnJvcnx8bnVsbCE9PWUudGFyZ2V0LmVycm9yP2kucmVqZWN0KGUudGFyZ2V0LmVycm9yKTppLnJlamVjdCh7Y29kZTpudWxsLG1lc3NhZ2U6XCJSRUFERVJfT05MT0FERU5EX0VSUlwifSl9LG4ucmVhZEFzVGV4dChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX1jYXRjaChhKXthLm1lc3NhZ2U9clthLmNvZGVdLGkucmVqZWN0KGEpfXJldHVybiBpLnByb21pc2V9LHJlYWRBc0RhdGFVUkw6ZnVuY3Rpb24obyx0KXt2YXIgaT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmkucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChvLGZ1bmN0aW9uKGUpe2UuZ2V0RmlsZSh0LHtjcmVhdGU6ITF9LGZ1bmN0aW9uKGUpe2UuZmlsZShmdW5jdGlvbihlKXt2YXIgbj1uZXcgRmlsZVJlYWRlcjtuLm9ubG9hZGVuZD1mdW5jdGlvbihlKXt2b2lkIDAhPT1lLnRhcmdldC5yZXN1bHR8fG51bGwhPT1lLnRhcmdldC5yZXN1bHQ/aS5yZXNvbHZlKGUudGFyZ2V0LnJlc3VsdCk6dm9pZCAwIT09ZS50YXJnZXQuZXJyb3J8fG51bGwhPT1lLnRhcmdldC5lcnJvcj9pLnJlamVjdChlLnRhcmdldC5lcnJvcik6aS5yZWplY3Qoe2NvZGU6bnVsbCxtZXNzYWdlOlwiUkVBREVSX09OTE9BREVORF9FUlJcIn0pfSxuLnJlYWRBc0RhdGFVUkwoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9Y2F0Y2goYSl7YS5tZXNzYWdlPXJbYS5jb2RlXSxpLnJlamVjdChhKX1yZXR1cm4gaS5wcm9taXNlfSxyZWFkQXNCaW5hcnlTdHJpbmc6ZnVuY3Rpb24obyx0KXt2YXIgaT1lLmRlZmVyKCk7L15cXC8vLnRlc3QodCkmJmkucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChvLGZ1bmN0aW9uKGUpe2UuZ2V0RmlsZSh0LHtjcmVhdGU6ITF9LGZ1bmN0aW9uKGUpe2UuZmlsZShmdW5jdGlvbihlKXt2YXIgbj1uZXcgRmlsZVJlYWRlcjtuLm9ubG9hZGVuZD1mdW5jdGlvbihlKXt2b2lkIDAhPT1lLnRhcmdldC5yZXN1bHR8fG51bGwhPT1lLnRhcmdldC5yZXN1bHQ/aS5yZXNvbHZlKGUudGFyZ2V0LnJlc3VsdCk6dm9pZCAwIT09ZS50YXJnZXQuZXJyb3J8fG51bGwhPT1lLnRhcmdldC5lcnJvcj9pLnJlamVjdChlLnRhcmdldC5lcnJvcik6aS5yZWplY3Qoe2NvZGU6bnVsbCxtZXNzYWdlOlwiUkVBREVSX09OTE9BREVORF9FUlJcIn0pfSxuLnJlYWRBc0JpbmFyeVN0cmluZyhlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX1jYXRjaChhKXthLm1lc3NhZ2U9clthLmNvZGVdLGkucmVqZWN0KGEpfXJldHVybiBpLnByb21pc2V9LHJlYWRBc0FycmF5QnVmZmVyOmZ1bmN0aW9uKG8sdCl7dmFyIGk9ZS5kZWZlcigpOy9eXFwvLy50ZXN0KHQpJiZpLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwobyxmdW5jdGlvbihlKXtlLmdldEZpbGUodCx7Y3JlYXRlOiExfSxmdW5jdGlvbihlKXtlLmZpbGUoZnVuY3Rpb24oZSl7dmFyIG49bmV3IEZpbGVSZWFkZXI7bi5vbmxvYWRlbmQ9ZnVuY3Rpb24oZSl7dm9pZCAwIT09ZS50YXJnZXQucmVzdWx0fHxudWxsIT09ZS50YXJnZXQucmVzdWx0P2kucmVzb2x2ZShlLnRhcmdldC5yZXN1bHQpOnZvaWQgMCE9PWUudGFyZ2V0LmVycm9yfHxudWxsIT09ZS50YXJnZXQuZXJyb3I/aS5yZWplY3QoZS50YXJnZXQuZXJyb3IpOmkucmVqZWN0KHtjb2RlOm51bGwsbWVzc2FnZTpcIlJFQURFUl9PTkxPQURFTkRfRVJSXCJ9KX0sbi5yZWFkQXNBcnJheUJ1ZmZlcihlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGkucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX1jYXRjaChhKXthLm1lc3NhZ2U9clthLmNvZGVdLGkucmVqZWN0KGEpfXJldHVybiBpLnByb21pc2V9LG1vdmVGaWxlOmZ1bmN0aW9uKHIsbyx0LGkpe3ZhciBhPWUuZGVmZXIoKTtpPWl8fG8sKC9eXFwvLy50ZXN0KG8pfHwvXlxcLy8udGVzdChpKSkmJmEucmVqZWN0KFwiZmlsZS1uYW1lIGNhbm5vdCBzdGFydCB3aXRoIC9cIik7dHJ5e24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChyLGZ1bmN0aW9uKGUpe2UuZ2V0RmlsZShvLHtjcmVhdGU6ITF9LGZ1bmN0aW9uKGUpe24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTCh0LGZ1bmN0aW9uKG4pe2UubW92ZVRvKG4saSxmdW5jdGlvbihlKXthLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2EucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2EucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2EucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2EucmVqZWN0KGUpfSl9Y2F0Y2goYyl7YS5yZWplY3QoYyl9cmV0dXJuIGEucHJvbWlzZX0sbW92ZURpcjpmdW5jdGlvbihyLG8sdCxpKXt2YXIgYT1lLmRlZmVyKCk7aT1pfHxvLCgvXlxcLy8udGVzdChvKXx8L15cXC8vLnRlc3QoaSkpJiZhLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwocixmdW5jdGlvbihlKXtlLmdldERpcmVjdG9yeShvLHtjcmVhdGU6ITF9LGZ1bmN0aW9uKGUpe24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTCh0LGZ1bmN0aW9uKG4pe2UubW92ZVRvKG4saSxmdW5jdGlvbihlKXthLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2EucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2EucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2EucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2EucmVqZWN0KGUpfSl9Y2F0Y2goYyl7YS5yZWplY3QoYyl9cmV0dXJuIGEucHJvbWlzZX0sY29weURpcjpmdW5jdGlvbihvLHQsaSxhKXt2YXIgYz1lLmRlZmVyKCk7YT1hfHx0LCgvXlxcLy8udGVzdCh0KXx8L15cXC8vLnRlc3QoYSkpJiZjLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwobyxmdW5jdGlvbihlKXtlLmdldERpcmVjdG9yeSh0LHtjcmVhdGU6ITEsZXhjbHVzaXZlOiExfSxmdW5jdGlvbihlKXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwoaSxmdW5jdGlvbihuKXtlLmNvcHlUbyhuLGEsZnVuY3Rpb24oZSl7Yy5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGMucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYy5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxjLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGMucmVqZWN0KGUpfSl9Y2F0Y2godSl7dS5tZXNzYWdlPXJbdS5jb2RlXSxjLnJlamVjdCh1KX1yZXR1cm4gYy5wcm9taXNlfSxjb3B5RmlsZTpmdW5jdGlvbihvLHQsaSxhKXt2YXIgYz1lLmRlZmVyKCk7YT1hfHx0LC9eXFwvLy50ZXN0KHQpJiZjLnJlamVjdChcImZpbGUtbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCAvXCIpO3RyeXtuLnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwobyxmdW5jdGlvbihlKXtlLmdldEZpbGUodCx7Y3JlYXRlOiExLGV4Y2x1c2l2ZTohMX0sZnVuY3Rpb24oZSl7bi5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKGksZnVuY3Rpb24obil7ZS5jb3B5VG8obixhLGZ1bmN0aW9uKGUpe2MucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxjLnJlamVjdChlKX0pfSxmdW5jdGlvbihlKXtlLm1lc3NhZ2U9cltlLmNvZGVdLGMucmVqZWN0KGUpfSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0sYy5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxjLnJlamVjdChlKX0pfWNhdGNoKHUpe3UubWVzc2FnZT1yW3UuY29kZV0sYy5yZWplY3QodSl9cmV0dXJuIGMucHJvbWlzZX0scmVhZEZpbGVNZXRhZGF0YTpmdW5jdGlvbihvLHQpe3ZhciBpPWUuZGVmZXIoKTsvXlxcLy8udGVzdCh0KSYmaS5yZWplY3QoXCJkaXJlY3RvcnkgY2Fubm90IHN0YXJ0IHdpdGggL1wiKTt0cnl7dmFyIGE9byt0O24ucmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTChhLGZ1bmN0aW9uKGUpe2UuZmlsZShmdW5jdGlvbihlKXtpLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2UubWVzc2FnZT1yW2UuY29kZV0saS5yZWplY3QoZSl9KX0sZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPXJbZS5jb2RlXSxpLnJlamVjdChlKX0pfWNhdGNoKGMpe2MubWVzc2FnZT1yW2MuY29kZV0saS5yZWplY3QoYyl9cmV0dXJuIGkucHJvbWlzZX19fV19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5maWxlT3BlbmVyMlwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFGaWxlT3BlbmVyMlwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue29wZW46ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5maWxlT3BlbmVyMi5vcGVuKG4scix7ZXJyb3I6ZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9LHN1Y2Nlc3M6ZnVuY3Rpb24oKXtvLnJlc29sdmUoKX19KSxvLnByb21pc2V9LHVuaW5zdGFsbDpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5maWxlT3BlbmVyMi51bmluc3RhbGwobix7ZXJyb3I6ZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9LHN1Y2Nlc3M6ZnVuY3Rpb24oKXtyLnJlc29sdmUoKX19KSxyLnByb21pc2V9LGFwcElzSW5zdGFsbGVkOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gY29yZG92YS5wbHVnaW5zLmZpbGVPcGVuZXIyLmFwcElzSW5zdGFsbGVkKG4se3N1Y2Nlc3M6ZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmlsZVRyYW5zZmVyXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUZpbGVUcmFuc2ZlclwiLFtcIiRxXCIsXCIkdGltZW91dFwiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2Rvd25sb2FkOmZ1bmN0aW9uKHIsbyx0LGkpe3ZhciBhPWUuZGVmZXIoKSxjPW5ldyBGaWxlVHJhbnNmZXIsdT10JiZ0LmVuY29kZVVSST09PSExP3I6ZW5jb2RlVVJJKHIpO3JldHVybiB0JiZ2b2lkIDAhPT10LnRpbWVvdXQmJm51bGwhPT10LnRpbWVvdXQmJihuKGZ1bmN0aW9uKCl7Yy5hYm9ydCgpfSx0LnRpbWVvdXQpLHQudGltZW91dD1udWxsKSxjLm9ucHJvZ3Jlc3M9ZnVuY3Rpb24oZSl7YS5ub3RpZnkoZSl9LGEucHJvbWlzZS5hYm9ydD1mdW5jdGlvbigpe2MuYWJvcnQoKX0sYy5kb3dubG9hZCh1LG8sYS5yZXNvbHZlLGEucmVqZWN0LGksdCksYS5wcm9taXNlfSx1cGxvYWQ6ZnVuY3Rpb24ocixvLHQsaSl7dmFyIGE9ZS5kZWZlcigpLGM9bmV3IEZpbGVUcmFuc2Zlcix1PXQmJnQuZW5jb2RlVVJJPT09ITE/cjplbmNvZGVVUkkocik7cmV0dXJuIHQmJnZvaWQgMCE9PXQudGltZW91dCYmbnVsbCE9PXQudGltZW91dCYmKG4oZnVuY3Rpb24oKXtjLmFib3J0KCl9LHQudGltZW91dCksdC50aW1lb3V0PW51bGwpLGMub25wcm9ncmVzcz1mdW5jdGlvbihlKXthLm5vdGlmeShlKX0sYS5wcm9taXNlLmFib3J0PWZ1bmN0aW9uKCl7Yy5hYm9ydCgpfSxjLnVwbG9hZChvLHUsYS5yZXNvbHZlLGEucmVqZWN0LHQsaSksYS5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5mbGFzaGxpZ2h0XCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUZsYXNobGlnaHRcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue2F2YWlsYWJsZTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmZsYXNobGlnaHQuYXZhaWxhYmxlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0pLHIucHJvbWlzZX0sc3dpdGNoT246ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5mbGFzaGxpZ2h0LnN3aXRjaE9uKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHN3aXRjaE9mZjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmZsYXNobGlnaHQuc3dpdGNoT2ZmKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LHRvZ2dsZTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmZsYXNobGlnaHQudG9nZ2xlKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmZsdXJyeUFkc1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFGbHVycnlBZHNcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3NldE9wdGlvbnM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLkZsdXJyeUFkcy5zZXRPcHRpb25zKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxjcmVhdGVCYW5uZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLkZsdXJyeUFkcy5jcmVhdGVCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHJlbW92ZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5GbHVycnlBZHMucmVtb3ZlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0sc2hvd0Jhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uRmx1cnJ5QWRzLnNob3dCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dCYW5uZXJBdFhZOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLkZsdXJyeUFkcy5zaG93QmFubmVyQXRYWShyLG8sZnVuY3Rpb24oKXt0LnJlc29sdmUoKX0sZnVuY3Rpb24oKXt0LnJlamVjdCgpfSksdC5wcm9taXNlfSxoaWRlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLkZsdXJyeUFkcy5oaWRlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0scHJlcGFyZUludGVyc3RpdGlhbDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uRmx1cnJ5QWRzLnByZXBhcmVJbnRlcnN0aXRpYWwocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dJbnRlcnN0aXRpYWw6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uRmx1cnJ5QWRzLnNob3dJbnRlcnN0aXRpYWwoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5nYVwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFHQVwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57aW5pdDpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbz1vPj0wP286MTAsbi5wbHVnaW5zLmdhUGx1Z2luLmluaXQoZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0scixvKSx0LnByb21pc2V9LHRyYWNrRXZlbnQ6ZnVuY3Rpb24ocixvLHQsaSxhLGMpe3ZhciB1PWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmdhUGx1Z2luLnRyYWNrRXZlbnQoZnVuY3Rpb24oZSl7dS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt1LnJlamVjdChlKX0sdCxpLGEsYyksdS5wcm9taXNlfSx0cmFja1BhZ2U6ZnVuY3Rpb24ocixvLHQpe3ZhciBpPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmdhUGx1Z2luLnRyYWNrUGFnZShmdW5jdGlvbihlKXtpLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2kucmVqZWN0KGUpfSx0KSxpLnByb21pc2V9LHNldFZhcmlhYmxlOmZ1bmN0aW9uKHIsbyx0LGkpe3ZhciBhPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmdhUGx1Z2luLnNldFZhcmlhYmxlKGZ1bmN0aW9uKGUpe2EucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7YS5yZWplY3QoZSl9LHQsaSksYS5wcm9taXNlfSxleGl0OmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuZ2FQbHVnaW4uZXhpdChmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5nZW9sb2NhdGlvblwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFHZW9sb2NhdGlvblwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2dldEN1cnJlbnRQb3NpdGlvbjpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbiksci5wcm9taXNlfSx3YXRjaFBvc2l0aW9uOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKSxvPW5hdmlnYXRvci5nZW9sb2NhdGlvbi53YXRjaFBvc2l0aW9uKGZ1bmN0aW9uKGUpe3Iubm90aWZ5KGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbik7cmV0dXJuIHIucHJvbWlzZS5jYW5jZWw9ZnVuY3Rpb24oKXtuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uY2xlYXJXYXRjaChvKX0sci5wcm9taXNlLmNsZWFyV2F0Y2g9ZnVuY3Rpb24oZSl7bmF2aWdhdG9yLmdlb2xvY2F0aW9uLmNsZWFyV2F0Y2goZXx8byl9LHIucHJvbWlzZS53YXRjaElEPW8sci5wcm9taXNlfSxjbGVhcldhdGNoOmZ1bmN0aW9uKGUpe3JldHVybiBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uY2xlYXJXYXRjaChlKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ2xvYmFsaXphdGlvblwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFHbG9iYWxpemF0aW9uXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57Z2V0UHJlZmVycmVkTGFuZ3VhZ2U6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLmdldFByZWZlcnJlZExhbmd1YWdlKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9LGdldExvY2FsZU5hbWU6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLmdldExvY2FsZU5hbWUoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sZ2V0Rmlyc3REYXlPZldlZWs6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLmdldEZpcnN0RGF5T2ZXZWVrKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9LGRhdGVUb1N0cmluZzpmdW5jdGlvbihuLHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmdsb2JhbGl6YXRpb24uZGF0ZVRvU3RyaW5nKG4sZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0sciksby5wcm9taXNlfSxzdHJpbmdUb0RhdGU6ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLnN0cmluZ1RvRGF0ZShuLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9LHIpLG8ucHJvbWlzZX0sZ2V0RGF0ZVBhdHRlcm46ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZ2xvYmFsaXphdGlvbi5nZXREYXRlUGF0dGVybihmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKSxyLnByb21pc2V9LGdldERhdGVOYW1lczpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLmdldERhdGVOYW1lcyhmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKSxyLnByb21pc2V9LGlzRGF5TGlnaHRTYXZpbmdzVGltZTpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLmlzRGF5TGlnaHRTYXZpbmdzVGltZShuLGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LG51bWJlclRvU3RyaW5nOmZ1bmN0aW9uKG4scil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuYXZpZ2F0b3IuZ2xvYmFsaXphdGlvbi5udW1iZXJUb1N0cmluZyhuLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9LHIpLG8ucHJvbWlzZX0sc3RyaW5nVG9OdW1iZXI6ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLnN0cmluZ1RvTnVtYmVyKG4sZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0sciksby5wcm9taXNlfSxnZXROdW1iZXJQYXR0ZXJuOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbmF2aWdhdG9yLmdsb2JhbGl6YXRpb24uZ2V0TnVtYmVyUGF0dGVybihmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKSxyLnByb21pc2V9LGdldEN1cnJlbmN5UGF0dGVybjpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5nbG9iYWxpemF0aW9uLmdldEN1cnJlbmN5UGF0dGVybihuLGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmdvb2dsZUFkc1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFHb29nbGVBZHNcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3NldE9wdGlvbnM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLkFkTW9iLnNldE9wdGlvbnMocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LGNyZWF0ZUJhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uQWRNb2IuY3JlYXRlQmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxyZW1vdmVCYW5uZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uQWRNb2IucmVtb3ZlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0sc2hvd0Jhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uQWRNb2Iuc2hvd0Jhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0Jhbm5lckF0WFk6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4uQWRNb2Iuc2hvd0Jhbm5lckF0WFkocixvLGZ1bmN0aW9uKCl7dC5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7dC5yZWplY3QoKX0pLHQucHJvbWlzZX0saGlkZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5BZE1vYi5oaWRlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0scHJlcGFyZUludGVyc3RpdGlhbDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uQWRNb2IucHJlcGFyZUludGVyc3RpdGlhbChyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0ludGVyc3RpdGlhbDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5BZE1vYi5zaG93SW50ZXJzdGl0aWFsKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ29vZ2xlQW5hbHl0aWNzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUdvb2dsZUFuYWx5dGljc1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57c3RhcnRUcmFja2VyV2l0aElkOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5hbmFseXRpY3Muc3RhcnRUcmFja2VyV2l0aElkKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sc2V0VXNlcklkOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5hbmFseXRpY3Muc2V0VXNlcklkKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sZGVidWdNb2RlOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmFuYWx5dGljcy5kZWJ1Z01vZGUoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHRyYWNrVmlldzpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uYW5hbHl0aWNzLnRyYWNrVmlldyhyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGFkZEN1c3RvbURpbWVuc2lvbjpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKSxpPXBhcnNlSW50KHIsMTApO3JldHVybiBpc05hTihpKSYmdC5yZWplY3QoJ1BhcmFtZXRlciBcImtleVwiIG11c3QgYmUgYW4gaW50ZWdlci4nKSxuLmFuYWx5dGljcy5hZGRDdXN0b21EaW1lbnNpb24oaSxvLGZ1bmN0aW9uKCl7dC5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSksdC5wcm9taXNlfSx0cmFja0V2ZW50OmZ1bmN0aW9uKHIsbyx0LGkpe3ZhciBhPWUuZGVmZXIoKTtyZXR1cm4gbi5hbmFseXRpY3MudHJhY2tFdmVudChyLG8sdCxpLGZ1bmN0aW9uKGUpe2EucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7YS5yZWplY3QoZSl9KSxhLnByb21pc2V9LHRyYWNrRXhjZXB0aW9uOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLmFuYWx5dGljcy50cmFja0V4Y2VwdGlvbihyLG8sZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0pLHQucHJvbWlzZX0sdHJhY2tUaW1pbmc6ZnVuY3Rpb24ocixvLHQsaSl7dmFyIGE9ZS5kZWZlcigpO3JldHVybiBuLmFuYWx5dGljcy50cmFja1RpbWluZyhyLG8sdCxpLGZ1bmN0aW9uKGUpe2EucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7YS5yZWplY3QoZSl9KSxhLnByb21pc2V9LGFkZFRyYW5zYWN0aW9uOmZ1bmN0aW9uKHIsbyx0LGksYSxjKXt2YXIgdT1lLmRlZmVyKCk7cmV0dXJuIG4uYW5hbHl0aWNzLmFkZFRyYW5zYWN0aW9uKHIsbyx0LGksYSxjLGZ1bmN0aW9uKGUpe3UucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7dS5yZWplY3QoZSl9KSx1LnByb21pc2V9LGFkZFRyYW5zYWN0aW9uSXRlbTpmdW5jdGlvbihyLG8sdCxpLGEsYyx1KXt2YXIgcz1lLmRlZmVyKCk7cmV0dXJuIG4uYW5hbHl0aWNzLmFkZFRyYW5zYWN0aW9uSXRlbShyLG8sdCxpLGEsYyx1LGZ1bmN0aW9uKGUpe3MucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7cy5yZWplY3QoZSl9KSxzLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmdvb2dsZU1hcFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFHb29nbGVNYXBcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7dmFyIHI9bnVsbDtyZXR1cm57Z2V0TWFwOmZ1bmN0aW9uKG8pe3ZhciB0PWUuZGVmZXIoKTtpZihuLnBsdWdpbi5nb29nbGUubWFwcyl7dmFyIGk9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBfY2FudmFzXCIpO3I9bi5wbHVnaW4uZ29vZ2xlLm1hcHMuTWFwLmdldE1hcChvKSxyLnNldERpdihpKSx0LnJlc29sdmUocil9ZWxzZSB0LnJlamVjdChudWxsKTtyZXR1cm4gdC5wcm9taXNlfSxpc01hcExvYWRlZDpmdW5jdGlvbigpe3JldHVybiEhcn0sYWRkTWFya2VyOmZ1bmN0aW9uKG4pe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gci5hZGRNYXJrZXIobixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9KSxvLnByb21pc2V9LGdldE1hcFR5cGVJZHM6ZnVuY3Rpb24oKXtyZXR1cm4gbi5wbHVnaW4uZ29vZ2xlLm1hcHMubWFwVHlwZUlkfSxzZXRWaXNpYmxlOmZ1bmN0aW9uKG4pe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gci5zZXRWaXNpYmxlKG4pLG8ucHJvbWlzZX0sY2xlYW51cDpmdW5jdGlvbigpe3I9bnVsbH19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ29vZ2xlUGxheUdhbWVcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhR29vZ2xlUGxheUdhbWVcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybnthdXRoOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBnb29nbGVwbGF5Z2FtZS5hdXRoKGZ1bmN0aW9uKGUpe3JldHVybiBuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3JldHVybiBuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sc2lnbm91dDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gZ29vZ2xlcGxheWdhbWUuc2lnbm91dChmdW5jdGlvbihlKXtyZXR1cm4gbi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyZXR1cm4gbi5yZWplY3QoZSl9KSxuLnByb21pc2V9LGlzU2lnbmVkSW46ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGdvb2dsZXBsYXlnYW1lLmlzU2lnbmVkSW4oZnVuY3Rpb24oZSl7cmV0dXJuIG4ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7cmV0dXJuIG4ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxzaG93UGxheWVyOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBnb29nbGVwbGF5Z2FtZS5zaG93UGxheWVyKGZ1bmN0aW9uKGUpe3JldHVybiBuLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3JldHVybiBuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sc3VibWl0U2NvcmU6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBnb29nbGVwbGF5Z2FtZS5zdWJtaXRTY29yZShuLGZ1bmN0aW9uKGUpe3JldHVybiByLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3JldHVybiByLnJlamVjdChlKX0pLHIucHJvbWlzZX0sc2hvd0FsbExlYWRlcmJvYXJkczpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gZ29vZ2xlcGxheWdhbWUuc2hvd0FsbExlYWRlcmJvYXJkcyhmdW5jdGlvbihlKXtyZXR1cm4gbi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyZXR1cm4gbi5yZWplY3QoZSl9KSxuLnByb21pc2V9LHNob3dMZWFkZXJib2FyZDpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIGdvb2dsZXBsYXlnYW1lLnNob3dMZWFkZXJib2FyZChuLGZ1bmN0aW9uKGUpe3JldHVybiByLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3JldHVybiByLnJlamVjdChlKX0pLHIucHJvbWlzZX0sdW5sb2NrQWNoaWV2ZW1lbnQ6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBnb29nbGVwbGF5Z2FtZS51bmxvY2tBY2hpZXZlbWVudChuLGZ1bmN0aW9uKGUpe3JldHVybiByLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3JldHVybiByLnJlamVjdChlKX0pLHIucHJvbWlzZX0saW5jcmVtZW50QWNoaWV2ZW1lbnQ6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBnb29nbGVwbGF5Z2FtZS5pbmNyZW1lbnRBY2hpZXZlbWVudChuLGZ1bmN0aW9uKGUpe3JldHVybiByLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3JldHVybiByLnJlamVjdChlKX0pLHIucHJvbWlzZX0sc2hvd0FjaGlldmVtZW50czpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gZ29vZ2xlcGxheWdhbWUuc2hvd0FjaGlldmVtZW50cyhmdW5jdGlvbihlKXtyZXR1cm4gbi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyZXR1cm4gbi5yZWplY3QoZSl9KSxuLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmdvb2dsZVBsdXNcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhR29vZ2xlUGx1c1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57bG9naW46ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiB2b2lkIDA9PT1yJiYocj17fSksbi5wbHVnaW5zLmdvb2dsZXBsdXMubG9naW4oe2lPU0FwaUtleTpyfSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxzaWxlbnRMb2dpbjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHZvaWQgMD09PXImJihyPXt9KSxuLnBsdWdpbnMuZ29vZ2xlcGx1cy50cnlTaWxlbnRMb2dpbih7aU9TQXBpS2V5OnJ9LGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LGxvZ291dDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtuLnBsdWdpbnMuZ29vZ2xlcGx1cy5sb2dvdXQoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSl9LGRpc2Nvbm5lY3Q6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7bi5wbHVnaW5zLmdvb2dsZXBsdXMuZGlzY29ubmVjdChmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9KX0saXNBdmFpbGFibGU6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5nb29nbGVwbHVzLmlzQXZhaWxhYmxlKGZ1bmN0aW9uKGUpe2U/ci5yZXNvbHZlKGUpOnIucmVqZWN0KGUpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5oZWFsdGhLaXRcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhSGVhbHRoS2l0XCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntpc0F2YWlsYWJsZTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmhlYWx0aGtpdC5hdmFpbGFibGUoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sY2hlY2tBdXRoU3RhdHVzOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gcj1yfHxcIkhLUXVhbnRpdHlUeXBlSWRlbnRpZmllckhlaWdodFwiLG4ucGx1Z2lucy5oZWFsdGhraXQuY2hlY2tBdXRoU3RhdHVzKHt0eXBlOnJ9LGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHJlcXVlc3RBdXRob3JpemF0aW9uOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiByPXJ8fFtcIkhLQ2hhcmFjdGVyaXN0aWNUeXBlSWRlbnRpZmllckRhdGVPZkJpcnRoXCIsXCJIS1F1YW50aXR5VHlwZUlkZW50aWZpZXJBY3RpdmVFbmVyZ3lCdXJuZWRcIixcIkhLUXVhbnRpdHlUeXBlSWRlbnRpZmllckhlaWdodFwiXSxvPW98fFtcIkhLUXVhbnRpdHlUeXBlSWRlbnRpZmllckFjdGl2ZUVuZXJneUJ1cm5lZFwiLFwiSEtRdWFudGl0eVR5cGVJZGVudGlmaWVySGVpZ2h0XCIsXCJIS1F1YW50aXR5VHlwZUlkZW50aWZpZXJEaXN0YW5jZUN5Y2xpbmdcIl0sbi5wbHVnaW5zLmhlYWx0aGtpdC5yZXF1ZXN0QXV0aG9yaXphdGlvbih7cmVhZFR5cGVzOnIsd3JpdGVUeXBlczpvfSxmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSksdC5wcm9taXNlfSxyZWFkRGF0ZU9mQmlydGg6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5oZWFsdGhraXQucmVhZERhdGVPZkJpcnRoKGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSksci5wcm9taXNlfSxyZWFkR2VuZGVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuaGVhbHRoa2l0LnJlYWRHZW5kZXIoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9KSxyLnByb21pc2V9LHNhdmVXZWlnaHQ6ZnVuY3Rpb24ocixvLHQpe3ZhciBpPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLmhlYWx0aGtpdC5zYXZlV2VpZ2h0KHt1bml0Om98fFwibGJcIixhbW91bnQ6cixkYXRlOnR8fG5ldyBEYXRlfSxmdW5jdGlvbihlKXtpLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2kucmVzb2x2ZShlKX0pLGkucHJvbWlzZX0scmVhZFdlaWdodDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5oZWFsdGhraXQucmVhZFdlaWdodCh7dW5pdDpyfHxcImxiXCJ9LGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSksby5wcm9taXNlfSxzYXZlSGVpZ2h0OmZ1bmN0aW9uKHIsbyx0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5oZWFsdGhraXQuc2F2ZUhlaWdodCh7dW5pdDpvfHxcImluXCIsYW1vdW50OnIsZGF0ZTp0fHxuZXcgRGF0ZX0sZnVuY3Rpb24oZSl7aS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtpLnJlc29sdmUoZSl9KSxpLnByb21pc2V9LHJlYWRIZWlnaHQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuaGVhbHRoa2l0LnJlYWRIZWlnaHQoe3VuaXQ6cnx8XCJpblwifSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0pLG8ucHJvbWlzZX0sZmluZFdvcmtvdXRzOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuaGVhbHRoa2l0LmZpbmRXb3Jrb3V0cyh7fSxmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0pLHIucHJvbWlzZX0sc2F2ZVdvcmtvdXQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuaGVhbHRoa2l0LnNhdmVXb3Jrb3V0KHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9KSxvLnByb21pc2V9LHF1ZXJ5U2FtcGxlVHlwZTpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5oZWFsdGhraXQucXVlcnlTYW1wbGVUeXBlKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9KSxvLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmh0dHBkXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUh0dHBkXCIsW1wiJHFcIixmdW5jdGlvbihlKXtyZXR1cm57c3RhcnRTZXJ2ZXI6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuQ29ySHR0cGQuc3RhcnRTZXJ2ZXIobixmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9LHN0b3BTZXJ2ZXI6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5Db3JIdHRwZC5zdG9wU2VydmVyKGZ1bmN0aW9uKCl7bi5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7bi5yZWplY3QoKX0pLG4ucHJvbWlzZX0sZ2V0VVJMOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuQ29ySHR0cGQuZ2V0VVJMKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oKXtuLnJlamVjdCgpfSksbi5wcm9taXNlfSxnZXRMb2NhbFBhdGg6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5Db3JIdHRwZC5nZXRMb2NhbFBhdGgoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbigpe24ucmVqZWN0KCl9KSxuLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLmlBZFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFpQWRcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3NldE9wdGlvbnM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmlBZC5zZXRPcHRpb25zKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxjcmVhdGVCYW5uZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmlBZC5jcmVhdGVCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHJlbW92ZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5pQWQucmVtb3ZlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0sc2hvd0Jhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uaUFkLnNob3dCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dCYW5uZXJBdFhZOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLmlBZC5zaG93QmFubmVyQXRYWShyLG8sZnVuY3Rpb24oKXt0LnJlc29sdmUoKX0sZnVuY3Rpb24oKXt0LnJlamVjdCgpfSksdC5wcm9taXNlfSxoaWRlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLmlBZC5oaWRlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0scHJlcGFyZUludGVyc3RpdGlhbDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uaUFkLnByZXBhcmVJbnRlcnN0aXRpYWwocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dJbnRlcnN0aXRpYWw6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uaUFkLnNob3dJbnRlcnN0aXRpYWwoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5pbWFnZVBpY2tlclwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFJbWFnZVBpY2tlclwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57Z2V0UGljdHVyZXM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLmltYWdlUGlja2VyLmdldFBpY3R1cmVzKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9LHIpLG8ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuaW5BcHBCcm93c2VyXCIsW10pLnByb3ZpZGVyKFwiJGNvcmRvdmFJbkFwcEJyb3dzZXJcIixbZnVuY3Rpb24oKXt2YXIgZSxuPXRoaXMuZGVmYXVsdE9wdGlvbnM9e307dGhpcy5zZXREZWZhdWx0T3B0aW9ucz1mdW5jdGlvbihlKXtuPWFuZ3VsYXIuZXh0ZW5kKG4sZSl9LHRoaXMuJGdldD1bXCIkcm9vdFNjb3BlXCIsXCIkcVwiLFwiJHdpbmRvd1wiLFwiJHRpbWVvdXRcIixmdW5jdGlvbihyLG8sdCxpKXtyZXR1cm57b3BlbjpmdW5jdGlvbihhLGMsdSl7dmFyIHM9by5kZWZlcigpO2lmKHUmJiFhbmd1bGFyLmlzT2JqZWN0KHUpKXJldHVybiBzLnJlamVjdChcIm9wdGlvbnMgbXVzdCBiZSBhbiBvYmplY3RcIikscy5wcm9taXNlO3ZhciBsPWFuZ3VsYXIuZXh0ZW5kKHt9LG4sdSksZj1bXTthbmd1bGFyLmZvckVhY2gobCxmdW5jdGlvbihlLG4pe2YucHVzaChuK1wiPVwiK2UpfSk7dmFyIGQ9Zi5qb2luKCk7cmV0dXJuIGU9dC5vcGVuKGEsYyxkKSxlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2Fkc3RhcnRcIixmdW5jdGlvbihlKXtpKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFJbkFwcEJyb3dzZXI6bG9hZHN0YXJ0XCIsZSl9KX0sITEpLGUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRzdG9wXCIsZnVuY3Rpb24oZSl7cy5yZXNvbHZlKGUpLGkoZnVuY3Rpb24oKXtyLiRicm9hZGNhc3QoXCIkY29yZG92YUluQXBwQnJvd3Nlcjpsb2Fkc3RvcFwiLGUpfSl9LCExKSxlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZXJyb3JcIixmdW5jdGlvbihlKXtzLnJlamVjdChlKSxpKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFJbkFwcEJyb3dzZXI6bG9hZGVycm9yXCIsZSl9KX0sITEpLGUuYWRkRXZlbnRMaXN0ZW5lcihcImV4aXRcIixmdW5jdGlvbihlKXtpKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFJbkFwcEJyb3dzZXI6ZXhpdFwiLGUpfSl9LCExKSxzLnByb21pc2V9LGNsb3NlOmZ1bmN0aW9uKCl7ZS5jbG9zZSgpLGU9bnVsbH0sc2hvdzpmdW5jdGlvbigpe2Uuc2hvdygpfSxleGVjdXRlU2NyaXB0OmZ1bmN0aW9uKG4pe3ZhciByPW8uZGVmZXIoKTtyZXR1cm4gZS5leGVjdXRlU2NyaXB0KG4sZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSksci5wcm9taXNlfSxpbnNlcnRDU1M6ZnVuY3Rpb24obil7dmFyIHI9by5kZWZlcigpO3JldHVybiBlLmluc2VydENTUyhuLGZ1bmN0aW9uKGUpe3IucmVzb2x2ZShlKX0pLHIucHJvbWlzZX19fV19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5pbnNvbW5pYVwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFJbnNvbW5pYVwiLFtcIiR3aW5kb3dcIixmdW5jdGlvbihlKXtyZXR1cm57a2VlcEF3YWtlOmZ1bmN0aW9uKCl7cmV0dXJuIGUucGx1Z2lucy5pbnNvbW5pYS5rZWVwQXdha2UoKX0sYWxsb3dTbGVlcEFnYWluOmZ1bmN0aW9uKCl7cmV0dXJuIGUucGx1Z2lucy5pbnNvbW5pYS5hbGxvd1NsZWVwQWdhaW4oKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuaW5zdGFncmFtXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUluc3RhZ3JhbVwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue3NoYXJlOmZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gd2luZG93Lkluc3RhZ3JhbT8oSW5zdGFncmFtLnNoYXJlKG4uaW1hZ2Usbi5jYXB0aW9uLGZ1bmN0aW9uKGUpe2U/ci5yZWplY3QoZSk6ci5yZXNvbHZlKCEwKX0pLHIucHJvbWlzZSk6KGNvbnNvbGUuZXJyb3IoXCJUcmllZCB0byBjYWxsIEluc3RhZ3JhbS5zaGFyZSBidXQgdGhlIEluc3RhZ3JhbSBwbHVnaW4gaXNuJ3QgaW5zdGFsbGVkIVwiKSxyLnJlc29sdmUobnVsbCksci5wcm9taXNlKX0saXNJbnN0YWxsZWQ6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIHdpbmRvdy5JbnN0YWdyYW0/KEluc3RhZ3JhbS5pc0luc3RhbGxlZChmdW5jdGlvbihlLHIpe2U/bi5yZWplY3QoZSk6bi5yZXNvbHZlKHIpfSksbi5wcm9taXNlKTooY29uc29sZS5lcnJvcihcIlRyaWVkIHRvIGNhbGwgSW5zdGFncmFtLmlzSW5zdGFsbGVkIGJ1dCB0aGUgSW5zdGFncmFtIHBsdWdpbiBpc24ndCBpbnN0YWxsZWQhXCIpLG4ucmVzb2x2ZShudWxsKSxuLnByb21pc2UpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5rZXlib2FyZFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFLZXlib2FyZFwiLFtcIiRyb290U2NvcGVcIixmdW5jdGlvbihlKXt2YXIgbj1mdW5jdGlvbigpe2UuJGV2YWxBc3luYyhmdW5jdGlvbigpe2UuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhS2V5Ym9hcmQ6c2hvd1wiKX0pfSxyPWZ1bmN0aW9uKCl7ZS4kZXZhbEFzeW5jKGZ1bmN0aW9uKCl7ZS4kYnJvYWRjYXN0KFwiJGNvcmRvdmFLZXlib2FyZDpoaWRlXCIpfSl9O3JldHVybiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZGV2aWNlcmVhZHlcIixmdW5jdGlvbigpe2NvcmRvdmEucGx1Z2lucy5LZXlib2FyZCYmKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibmF0aXZlLmtleWJvYXJkc2hvd1wiLG4sITEpLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibmF0aXZlLmtleWJvYXJkaGlkZVwiLHIsITEpKX0pLHtoaWRlQWNjZXNzb3J5QmFyOmZ1bmN0aW9uKGUpe3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKGUpfSxjbG9zZTpmdW5jdGlvbigpe3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuY2xvc2UoKX0sc2hvdzpmdW5jdGlvbigpe3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuc2hvdygpfSxkaXNhYmxlU2Nyb2xsOmZ1bmN0aW9uKGUpe3JldHVybiBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbChlKX0saXNWaXNpYmxlOmZ1bmN0aW9uKCl7cmV0dXJuIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5pc1Zpc2libGV9LGNsZWFyU2hvd1dhdGNoOmZ1bmN0aW9uKCl7ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm5hdGl2ZS5rZXlib2FyZHNob3dcIixuKSxlLiQkbGlzdGVuZXJzW1wiJGNvcmRvdmFLZXlib2FyZDpzaG93XCJdPVtdfSxjbGVhckhpZGVXYXRjaDpmdW5jdGlvbigpe2RvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJuYXRpdmUua2V5Ym9hcmRoaWRlXCIsciksZS4kJGxpc3RlbmVyc1tcIiRjb3Jkb3ZhS2V5Ym9hcmQ6aGlkZVwiXT1bXX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMua2V5Y2hhaW5cIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhS2V5Y2hhaW5cIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntnZXRGb3JLZXk6ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCksdD1uZXcgS2V5Y2hhaW47cmV0dXJuIHQuZ2V0Rm9yS2V5KG8ucmVzb2x2ZSxvLnJlamVjdCxuLHIpLG8ucHJvbWlzZX0sc2V0Rm9yS2V5OmZ1bmN0aW9uKG4scixvKXt2YXIgdD1lLmRlZmVyKCksaT1uZXcgS2V5Y2hhaW47cmV0dXJuIGkuc2V0Rm9yS2V5KHQucmVzb2x2ZSx0LnJlamVjdCxuLHIsbyksdC5wcm9taXNlfSxyZW1vdmVGb3JLZXk6ZnVuY3Rpb24obixyKXt2YXIgbz1lLmRlZmVyKCksdD1uZXcgS2V5Y2hhaW47cmV0dXJuIHQucmVtb3ZlRm9yS2V5KG8ucmVzb2x2ZSxvLnJlamVjdCxuLHIpLG8ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMubGF1bmNoTmF2aWdhdG9yXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YUxhdW5jaE5hdmlnYXRvclwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue25hdmlnYXRlOmZ1bmN0aW9uKG4scixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIGxhdW5jaG5hdmlnYXRvci5uYXZpZ2F0ZShuLHIsZnVuY3Rpb24oKXt0LnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7dC5yZWplY3QoZSl9LG8pLHQucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMubG9jYWxOb3RpZmljYXRpb25cIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhTG9jYWxOb3RpZmljYXRpb25cIixbXCIkcVwiLFwiJHdpbmRvd1wiLFwiJHJvb3RTY29wZVwiLFwiJHRpbWVvdXRcIixmdW5jdGlvbihlLG4scixvKXtyZXR1cm4gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRldmljZXJlYWR5XCIsZnVuY3Rpb24oKXtuLmNvcmRvdmEmJm4uY29yZG92YS5wbHVnaW5zJiZuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24mJm4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbCYmKG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5vbihcInNjaGVkdWxlXCIsZnVuY3Rpb24oZSxuKXtvKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFMb2NhbE5vdGlmaWNhdGlvbjpzY2hlZHVsZVwiLGUsbil9KX0pLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5vbihcInRyaWdnZXJcIixmdW5jdGlvbihlLG4pe28oZnVuY3Rpb24oKXtyLiRicm9hZGNhc3QoXCIkY29yZG92YUxvY2FsTm90aWZpY2F0aW9uOnRyaWdnZXJcIixlLG4pfSl9KSxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwub24oXCJ1cGRhdGVcIixmdW5jdGlvbihlLG4pe28oZnVuY3Rpb24oKXtyLiRicm9hZGNhc3QoXCIkY29yZG92YUxvY2FsTm90aWZpY2F0aW9uOnVwZGF0ZVwiLGUsbil9KX0pLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5vbihcImNsZWFyXCIsZnVuY3Rpb24oZSxuKXtvKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFMb2NhbE5vdGlmaWNhdGlvbjpjbGVhclwiLGUsbil9KX0pLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5vbihcImNsZWFyYWxsXCIsZnVuY3Rpb24oZSl7byhmdW5jdGlvbigpe3IuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhTG9jYWxOb3RpZmljYXRpb246Y2xlYXJhbGxcIixlKX0pfSksbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLm9uKFwiY2FuY2VsXCIsZnVuY3Rpb24oZSxuKXtvKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFMb2NhbE5vdGlmaWNhdGlvbjpjYW5jZWxcIixlLG4pfSl9KSxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwub24oXCJjYW5jZWxhbGxcIixmdW5jdGlvbihlKXtvKGZ1bmN0aW9uKCl7ci4kYnJvYWRjYXN0KFwiJGNvcmRvdmFMb2NhbE5vdGlmaWNhdGlvbjpjYW5jZWxhbGxcIixlKX0pfSksbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLm9uKFwiY2xpY2tcIixmdW5jdGlvbihlLG4pe28oZnVuY3Rpb24oKXtyLiRicm9hZGNhc3QoXCIkY29yZG92YUxvY2FsTm90aWZpY2F0aW9uOmNsaWNrXCIsZSxuKX0pfSkpfSwhMSkse3NjaGVkdWxlOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLnNjaGVkdWxlKHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxvKSx0LnByb21pc2V9LGFkZDpmdW5jdGlvbihyLG8pe2NvbnNvbGUud2FybignRGVwcmVjYXRlZDogdXNlIFwic2NoZWR1bGVcIiBpbnN0ZWFkLicpO3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbz1vfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5zY2hlZHVsZShyLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sbyksdC5wcm9taXNlfSx1cGRhdGU6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwudXBkYXRlKHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxvKSx0LnByb21pc2V9LGNsZWFyOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO1xucmV0dXJuIG89b3x8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuY2xlYXIocixmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LG8pLHQucHJvbWlzZX0sY2xlYXJBbGw6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmNsZWFyQWxsKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sciksby5wcm9taXNlfSxjYW5jZWw6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuY2FuY2VsKHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxvKSx0LnByb21pc2V9LGNhbmNlbEFsbDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuY2FuY2VsQWxsKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sciksby5wcm9taXNlfSxpc1ByZXNlbnQ6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuaXNQcmVzZW50KHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxvKSx0LnByb21pc2V9LGlzU2NoZWR1bGVkOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmlzU2NoZWR1bGVkKHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxvKSx0LnByb21pc2V9LGlzVHJpZ2dlcmVkOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmlzVHJpZ2dlcmVkKHIsZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxvKSx0LnByb21pc2V9LGhhc1Blcm1pc3Npb246ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmhhc1Blcm1pc3Npb24oZnVuY3Rpb24oZSl7ZT9vLnJlc29sdmUoZSk6by5yZWplY3QoZSl9LHIpLG8ucHJvbWlzZX0scmVnaXN0ZXJQZXJtaXNzaW9uOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gcj1yfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5yZWdpc3RlclBlcm1pc3Npb24oZnVuY3Rpb24oZSl7ZT9vLnJlc29sdmUoZSk6by5yZWplY3QoZSl9LHIpLG8ucHJvbWlzZX0scHJvbXB0Rm9yUGVybWlzc2lvbjpmdW5jdGlvbihyKXtjb25zb2xlLndhcm4oJ0RlcHJlY2F0ZWQ6IHVzZSBcInJlZ2lzdGVyUGVybWlzc2lvblwiIGluc3RlYWQuJyk7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLnJlZ2lzdGVyUGVybWlzc2lvbihmdW5jdGlvbihlKXtlP28ucmVzb2x2ZShlKTpvLnJlamVjdChlKX0sciksby5wcm9taXNlfSxnZXRBbGxJZHM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmdldEFsbElkcyhmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LHIpLG8ucHJvbWlzZX0sZ2V0SWRzOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gcj1yfHxudWxsLG4uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5nZXRJZHMoZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxyKSxvLnByb21pc2V9LGdldFNjaGVkdWxlZElkczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIHI9cnx8bnVsbCxuLmNvcmRvdmEucGx1Z2lucy5ub3RpZmljYXRpb24ubG9jYWwuZ2V0U2NoZWR1bGVkSWRzKGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sciksby5wcm9taXNlfSxnZXRUcmlnZ2VyZWRJZHM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmdldFRyaWdnZXJlZElkcyhmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LHIpLG8ucHJvbWlzZX0sZ2V0OmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmdldChyLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sbyksdC5wcm9taXNlfSxnZXRBbGw6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmdldEFsbChmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LHIpLG8ucHJvbWlzZX0sZ2V0U2NoZWR1bGVkOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmdldFNjaGVkdWxlZChyLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sbyksdC5wcm9taXNlfSxnZXRBbGxTY2hlZHVsZWQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmdldEFsbFNjaGVkdWxlZChmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LHIpLG8ucHJvbWlzZX0sZ2V0VHJpZ2dlcmVkOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmdldFRyaWdnZXJlZChyLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sbyksdC5wcm9taXNlfSxnZXRBbGxUcmlnZ2VyZWQ6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmdldEFsbFRyaWdnZXJlZChmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LHIpLG8ucHJvbWlzZX0sZ2V0RGVmYXVsdHM6ZnVuY3Rpb24oKXtyZXR1cm4gbi5jb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmxvY2FsLmdldERlZmF1bHRzKCl9LHNldERlZmF1bHRzOmZ1bmN0aW9uKGUpe24uY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbC5zZXREZWZhdWx0cyhlKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMubU1lZGlhQWRzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YU1NZWRpYUFkc1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57c2V0T3B0aW9uczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ubU1lZGlhLnNldE9wdGlvbnMocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LGNyZWF0ZUJhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ubU1lZGlhLmNyZWF0ZUJhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0scmVtb3ZlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLm1NZWRpYS5yZW1vdmVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxzaG93QmFubmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5tTWVkaWEuc2hvd0Jhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0Jhbm5lckF0WFk6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4ubU1lZGlhLnNob3dCYW5uZXJBdFhZKHIsbyxmdW5jdGlvbigpe3QucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3QucmVqZWN0KCl9KSx0LnByb21pc2V9LGhpZGVCYW5uZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ubU1lZGlhLmhpZGVCYW5uZXIoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfSxwcmVwYXJlSW50ZXJzdGl0aWFsOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5tTWVkaWEucHJlcGFyZUludGVyc3RpdGlhbChyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0ludGVyc3RpdGlhbDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5tTWVkaWEuc2hvd0ludGVyc3RpdGlhbChmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbigpe3IucmVqZWN0KCl9KSxyLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLm1lZGlhXCIsW10pLnNlcnZpY2UoXCJOZXdNZWRpYVwiLFtcIiRxXCIsXCIkaW50ZXJ2YWxcIixmdW5jdGlvbihlLG4pe2Z1bmN0aW9uIHIoZSl7YW5ndWxhci5pc0RlZmluZWQocyl8fChzPW4oZnVuY3Rpb24oKXswPmQmJihkPWUuZ2V0RHVyYXRpb24oKSxhJiZkPjAmJmEubm90aWZ5KHtkdXJhdGlvbjpkfSkpLGUuZ2V0Q3VycmVudFBvc2l0aW9uKGZ1bmN0aW9uKGUpe2U+LTEmJihmPWUpfSxmdW5jdGlvbihlKXtjb25zb2xlLmxvZyhcIkVycm9yIGdldHRpbmcgcG9zPVwiK2UpfSksYSYmYS5ub3RpZnkoe3Bvc2l0aW9uOmZ9KX0sMWUzKSl9ZnVuY3Rpb24gbygpe2FuZ3VsYXIuaXNEZWZpbmVkKHMpJiYobi5jYW5jZWwocykscz12b2lkIDApfWZ1bmN0aW9uIHQoKXtmPS0xLGQ9LTF9ZnVuY3Rpb24gaShlKXt0aGlzLm1lZGlhPW5ldyBNZWRpYShlLGZ1bmN0aW9uKGUpe28oKSx0KCksYS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvKCksdCgpLGEucmVqZWN0KGUpfSxmdW5jdGlvbihlKXtsPWUsYS5ub3RpZnkoe3N0YXR1czpsfSl9KX12YXIgYSxjLHUscyxsPW51bGwsZj0tMSxkPS0xO3JldHVybiBpLnByb3RvdHlwZS5wbGF5PWZ1bmN0aW9uKG4pe3JldHVybiBhPWUuZGVmZXIoKSxcIm9iamVjdFwiIT10eXBlb2YgbiYmKG49e30pLHRoaXMubWVkaWEucGxheShuKSxyKHRoaXMubWVkaWEpLGEucHJvbWlzZX0saS5wcm90b3R5cGUucGF1c2U9ZnVuY3Rpb24oKXtvKCksdGhpcy5tZWRpYS5wYXVzZSgpfSxpLnByb3RvdHlwZS5zdG9wPWZ1bmN0aW9uKCl7dGhpcy5tZWRpYS5zdG9wKCl9LGkucHJvdG90eXBlLnJlbGVhc2U9ZnVuY3Rpb24oKXt0aGlzLm1lZGlhLnJlbGVhc2UoKSx0aGlzLm1lZGlhPXZvaWQgMH0saS5wcm90b3R5cGUuc2Vla1RvPWZ1bmN0aW9uKGUpe3RoaXMubWVkaWEuc2Vla1RvKGUpfSxpLnByb3RvdHlwZS5zZXRWb2x1bWU9ZnVuY3Rpb24oZSl7dGhpcy5tZWRpYS5zZXRWb2x1bWUoZSl9LGkucHJvdG90eXBlLnN0YXJ0UmVjb3JkPWZ1bmN0aW9uKCl7dGhpcy5tZWRpYS5zdGFydFJlY29yZCgpfSxpLnByb3RvdHlwZS5zdG9wUmVjb3JkPWZ1bmN0aW9uKCl7dGhpcy5tZWRpYS5zdG9wUmVjb3JkKCl9LGkucHJvdG90eXBlLmN1cnJlbnRUaW1lPWZ1bmN0aW9uKCl7cmV0dXJuIGM9ZS5kZWZlcigpLHRoaXMubWVkaWEuZ2V0Q3VycmVudFBvc2l0aW9uKGZ1bmN0aW9uKGUpe2MucmVzb2x2ZShlKX0pLGMucHJvbWlzZX0saS5wcm90b3R5cGUuZ2V0RHVyYXRpb249ZnVuY3Rpb24oKXtyZXR1cm4gdT1lLmRlZmVyKCksdGhpcy5tZWRpYS5nZXREdXJhdGlvbihmdW5jdGlvbihlKXt1LnJlc29sdmUoZSl9KSx1LnByb21pc2V9LGl9XSkuZmFjdG9yeShcIiRjb3Jkb3ZhTWVkaWFcIixbXCJOZXdNZWRpYVwiLGZ1bmN0aW9uKGUpe3JldHVybntuZXdNZWRpYTpmdW5jdGlvbihuKXtyZXR1cm4gbmV3IGUobil9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLm1vYmZveEFkc1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFNb2JGb3hBZHNcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3NldE9wdGlvbnM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLk1vYkZveC5zZXRPcHRpb25zKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxjcmVhdGVCYW5uZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLk1vYkZveC5jcmVhdGVCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHJlbW92ZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb2JGb3gucmVtb3ZlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0sc2hvd0Jhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uTW9iRm94LnNob3dCYW5uZXIocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dCYW5uZXJBdFhZOmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLk1vYkZveC5zaG93QmFubmVyQXRYWShyLG8sZnVuY3Rpb24oKXt0LnJlc29sdmUoKX0sZnVuY3Rpb24oKXt0LnJlamVjdCgpfSksdC5wcm9taXNlfSxoaWRlQmFubmVyOmZ1bmN0aW9uKCl7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBuLk1vYkZveC5oaWRlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0scHJlcGFyZUludGVyc3RpdGlhbDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uTW9iRm94LnByZXBhcmVJbnRlcnN0aXRpYWwocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LHNob3dJbnRlcnN0aXRpYWw6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uTW9iRm94LnNob3dJbnRlcnN0aXRpYWwoZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtyLnJlamVjdCgpfSksci5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2luc1wiLFtcIm5nQ29yZG92YS5wbHVnaW5zLjNkdG91Y2hcIixcIm5nQ29yZG92YS5wbHVnaW5zLmFjdGlvblNoZWV0XCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5hZE1vYlwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuYXBwQXZhaWxhYmlsaXR5XCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5hcHBSYXRlXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5hcHBWZXJzaW9uXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5iYWNrZ3JvdW5kR2VvbG9jYXRpb25cIixcIm5nQ29yZG92YS5wbHVnaW5zLmJhZGdlXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5iYXJjb2RlU2Nhbm5lclwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuYmF0dGVyeVN0YXR1c1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuYmVhY29uXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5ibGVcIixcIm5nQ29yZG92YS5wbHVnaW5zLmJsdWV0b290aFNlcmlhbFwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuYnJpZ2h0bmVzc1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuY2FsZW5kYXJcIixcIm5nQ29yZG92YS5wbHVnaW5zLmNhbWVyYVwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuY2FwdHVyZVwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuY2xpcGJvYXJkXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5jb250YWN0c1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZGF0ZVBpY2tlclwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZGV2aWNlXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5kZXZpY2VNb3Rpb25cIixcIm5nQ29yZG92YS5wbHVnaW5zLmRldmljZU9yaWVudGF0aW9uXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5kaWFsb2dzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5lbWFpbENvbXBvc2VyXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5mYWNlYm9va1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmFjZWJvb2tBZHNcIixcIm5nQ29yZG92YS5wbHVnaW5zLmZpbGVcIixcIm5nQ29yZG92YS5wbHVnaW5zLmZpbGVUcmFuc2ZlclwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZmlsZU9wZW5lcjJcIixcIm5nQ29yZG92YS5wbHVnaW5zLmZsYXNobGlnaHRcIixcIm5nQ29yZG92YS5wbHVnaW5zLmZsdXJyeUFkc1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ2FcIixcIm5nQ29yZG92YS5wbHVnaW5zLmdlb2xvY2F0aW9uXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5nbG9iYWxpemF0aW9uXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5nb29nbGVBZHNcIixcIm5nQ29yZG92YS5wbHVnaW5zLmdvb2dsZUFuYWx5dGljc1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ29vZ2xlTWFwXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5nb29nbGVQbGF5R2FtZVwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuZ29vZ2xlUGx1c1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuaGVhbHRoS2l0XCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5odHRwZFwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuaUFkXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5pbWFnZVBpY2tlclwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuaW5BcHBCcm93c2VyXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5pbnN0YWdyYW1cIixcIm5nQ29yZG92YS5wbHVnaW5zLmtleWJvYXJkXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5rZXljaGFpblwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMubGF1bmNoTmF2aWdhdG9yXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5sb2NhbE5vdGlmaWNhdGlvblwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMubWVkaWFcIixcIm5nQ29yZG92YS5wbHVnaW5zLm1NZWRpYUFkc1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMubW9iZm94QWRzXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5tb3B1YkFkc1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMubmF0aXZlQXVkaW9cIixcIm5nQ29yZG92YS5wbHVnaW5zLm5ldHdvcmtcIixcIm5nQ29yZG92YS5wbHVnaW5zLnBpbkRpYWxvZ1wiLFwibmdDb3Jkb3ZhLnBsdWdpbnMucHJlZmVyZW5jZXNcIixcIm5nQ29yZG92YS5wbHVnaW5zLnByaW50ZXJcIixcIm5nQ29yZG92YS5wbHVnaW5zLnByb2dyZXNzSW5kaWNhdG9yXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5wdXNoXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5wdXNoX3Y1XCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5zbXNcIixcIm5nQ29yZG92YS5wbHVnaW5zLnNvY2lhbFNoYXJpbmdcIixcIm5nQ29yZG92YS5wbHVnaW5zLnNwaW5uZXJEaWFsb2dcIixcIm5nQ29yZG92YS5wbHVnaW5zLnNwbGFzaHNjcmVlblwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuc3FsaXRlXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy5zdGF0dXNiYXJcIixcIm5nQ29yZG92YS5wbHVnaW5zLnRvYXN0XCIsXCJuZ0NvcmRvdmEucGx1Z2lucy50b3VjaGlkXCIsXCJuZ0NvcmRvdmEucGx1Z2lucy52aWJyYXRpb25cIixcIm5nQ29yZG92YS5wbHVnaW5zLnZpZGVvQ2FwdHVyZVBsdXNcIixcIm5nQ29yZG92YS5wbHVnaW5zLnppcFwiLFwibmdDb3Jkb3ZhLnBsdWdpbnMuaW5zb21uaWFcIl0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMubW9wdWJBZHNcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhTW9QdWJBZHNcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3NldE9wdGlvbnM6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLk1vUHViLnNldE9wdGlvbnMocixmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbigpe28ucmVqZWN0KCl9KSxvLnByb21pc2V9LGNyZWF0ZUJhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uTW9QdWIuY3JlYXRlQmFubmVyKHIsZnVuY3Rpb24oKXtvLnJlc29sdmUoKX0sZnVuY3Rpb24oKXtvLnJlamVjdCgpfSksby5wcm9taXNlfSxyZW1vdmVCYW5uZXI6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4uTW9QdWIucmVtb3ZlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0sc2hvd0Jhbm5lcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uTW9QdWIuc2hvd0Jhbm5lcihyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0Jhbm5lckF0WFk6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4uTW9QdWIuc2hvd0Jhbm5lckF0WFkocixvLGZ1bmN0aW9uKCl7dC5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7dC5yZWplY3QoKX0pLHQucHJvbWlzZX0saGlkZUJhbm5lcjpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb1B1Yi5oaWRlQmFubmVyKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX0scHJlcGFyZUludGVyc3RpdGlhbDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4uTW9QdWIucHJlcGFyZUludGVyc3RpdGlhbChyLGZ1bmN0aW9uKCl7by5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoKX0pLG8ucHJvbWlzZX0sc2hvd0ludGVyc3RpdGlhbDpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5Nb1B1Yi5zaG93SW50ZXJzdGl0aWFsKGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKCl7ci5yZWplY3QoKX0pLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMubmF0aXZlQXVkaW9cIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhTmF0aXZlQXVkaW9cIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3ByZWxvYWRTaW1wbGU6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5OYXRpdmVBdWRpby5wcmVsb2FkU2ltcGxlKHIsbyxmdW5jdGlvbihlKXt0LnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3QucmVqZWN0KGUpfSksdC5wcm9taXNlfSxwcmVsb2FkQ29tcGxleDpmdW5jdGlvbihyLG8sdCxpLGEpe3ZhciBjPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLk5hdGl2ZUF1ZGlvLnByZWxvYWRDb21wbGV4KHIsbyx0LGksYSxmdW5jdGlvbihlKXtjLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2MucmVqZWN0KGUpfSksYy5wcm9taXNlfSxwbGF5OmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMuTmF0aXZlQXVkaW8ucGxheShyLGZ1bmN0aW9uKGUpe3QucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7dC5yZWplY3QoZSl9LG8pLHQucHJvbWlzZX0sc3RvcDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5OYXRpdmVBdWRpby5zdG9wKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sbG9vcDpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5OYXRpdmVBdWRpby5sb29wKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sdW5sb2FkOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLk5hdGl2ZUF1ZGlvLnVubG9hZChyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHNldFZvbHVtZUZvckNvbXBsZXhBc3NldDpmdW5jdGlvbihyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLk5hdGl2ZUF1ZGlvLnNldFZvbHVtZUZvckNvbXBsZXhBc3NldChyLG8sZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0pLHQucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMubmV0d29ya1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFOZXR3b3JrXCIsW1wiJHJvb3RTY29wZVwiLFwiJHRpbWVvdXRcIixmdW5jdGlvbihlLG4pe3ZhciByPWZ1bmN0aW9uKCl7dmFyIHI9bmF2aWdhdG9yLmNvbm5lY3Rpb24udHlwZTtuKGZ1bmN0aW9uKCl7ZS4kYnJvYWRjYXN0KFwiJGNvcmRvdmFOZXR3b3JrOm9mZmxpbmVcIixyKX0pfSxvPWZ1bmN0aW9uKCl7dmFyIHI9bmF2aWdhdG9yLmNvbm5lY3Rpb24udHlwZTtuKGZ1bmN0aW9uKCl7ZS4kYnJvYWRjYXN0KFwiJGNvcmRvdmFOZXR3b3JrOm9ubGluZVwiLHIpfSl9O3JldHVybiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZGV2aWNlcmVhZHlcIixmdW5jdGlvbigpe25hdmlnYXRvci5jb25uZWN0aW9uJiYoZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm9mZmxpbmVcIixyLCExKSxkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwib25saW5lXCIsbywhMSkpfSkse2dldE5ldHdvcms6ZnVuY3Rpb24oKXtyZXR1cm4gbmF2aWdhdG9yLmNvbm5lY3Rpb24udHlwZX0saXNPbmxpbmU6ZnVuY3Rpb24oKXt2YXIgZT1uYXZpZ2F0b3IuY29ubmVjdGlvbi50eXBlO3JldHVybiBlIT09Q29ubmVjdGlvbi5VTktOT1dOJiZlIT09Q29ubmVjdGlvbi5OT05FfSxpc09mZmxpbmU6ZnVuY3Rpb24oKXt2YXIgZT1uYXZpZ2F0b3IuY29ubmVjdGlvbi50eXBlO3JldHVybiBlPT09Q29ubmVjdGlvbi5VTktOT1dOfHxlPT09Q29ubmVjdGlvbi5OT05FfSxjbGVhck9mZmxpbmVXYXRjaDpmdW5jdGlvbigpe2RvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJvZmZsaW5lXCIsciksZS4kJGxpc3RlbmVyc1tcIiRjb3Jkb3ZhTmV0d29yazpvZmZsaW5lXCJdPVtdfSxjbGVhck9ubGluZVdhdGNoOmZ1bmN0aW9uKCl7ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm9ubGluZVwiLG8pLGUuJCRsaXN0ZW5lcnNbXCIkY29yZG92YU5ldHdvcms6b25saW5lXCJdPVtdfX19XSkucnVuKFtcIiRpbmplY3RvclwiLGZ1bmN0aW9uKGUpe2UuZ2V0KFwiJGNvcmRvdmFOZXR3b3JrXCIpfV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMucGluRGlhbG9nXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVBpbkRpYWxvZ1wiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57cHJvbXB0OmZ1bmN0aW9uKHIsbyx0KXt2YXIgaT1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5waW5EaWFsb2cucHJvbXB0KHIsZnVuY3Rpb24oZSl7aS5yZXNvbHZlKGUpfSxvLHQpLGkucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMucHJlZmVyZW5jZXNcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhUHJlZmVyZW5jZXNcIixbXCIkd2luZG93XCIsXCIkcVwiLGZ1bmN0aW9uKGUsbil7cmV0dXJue3BsdWdpbk5vdEVuYWJsZWRNZXNzYWdlOlwiUGx1Z2luIG5vdCBlbmFibGVkXCIsZGVjb3JhdGVQcm9taXNlOmZ1bmN0aW9uKGUpe2Uuc3VjY2Vzcz1mdW5jdGlvbihuKXtyZXR1cm4gZS50aGVuKG4pLGV9LGUuZXJyb3I9ZnVuY3Rpb24obil7cmV0dXJuIGUudGhlbihudWxsLG4pLGV9fSxzdG9yZTpmdW5jdGlvbihyLG8sdCl7ZnVuY3Rpb24gaShlKXtjLnJlc29sdmUoZSl9ZnVuY3Rpb24gYShlKXtjLnJlamVjdChuZXcgRXJyb3IoZSkpfXZhciBjPW4uZGVmZXIoKSx1PWMucHJvbWlzZTtpZihlLnBsdWdpbnMpe3ZhciBzO3M9Mz09PWFyZ3VtZW50cy5sZW5ndGg/ZS5wbHVnaW5zLmFwcFByZWZlcmVuY2VzLnN0b3JlKHQscixvKTplLnBsdWdpbnMuYXBwUHJlZmVyZW5jZXMuc3RvcmUocixvKSxzLnRoZW4oaSxhKX1lbHNlIGMucmVqZWN0KG5ldyBFcnJvcih0aGlzLnBsdWdpbk5vdEVuYWJsZWRNZXNzYWdlKSk7cmV0dXJuIHRoaXMuZGVjb3JhdGVQcm9taXNlKHUpLHV9LGZldGNoOmZ1bmN0aW9uKHIsbyl7ZnVuY3Rpb24gdChlKXthLnJlc29sdmUoZSl9ZnVuY3Rpb24gaShlKXthLnJlamVjdChuZXcgRXJyb3IoZSkpfXZhciBhPW4uZGVmZXIoKSxjPWEucHJvbWlzZTtpZihlLnBsdWdpbnMpe3ZhciB1O3U9Mj09PWFyZ3VtZW50cy5sZW5ndGg/ZS5wbHVnaW5zLmFwcFByZWZlcmVuY2VzLmZldGNoKG8scik6ZS5wbHVnaW5zLmFwcFByZWZlcmVuY2VzLmZldGNoKHIpLHUudGhlbih0LGkpfWVsc2UgYS5yZWplY3QobmV3IEVycm9yKHRoaXMucGx1Z2luTm90RW5hYmxlZE1lc3NhZ2UpKTtyZXR1cm4gdGhpcy5kZWNvcmF0ZVByb21pc2UoYyksY30scmVtb3ZlOmZ1bmN0aW9uKHIsbyl7ZnVuY3Rpb24gdChlKXthLnJlc29sdmUoZSl9ZnVuY3Rpb24gaShlKXthLnJlamVjdChuZXcgRXJyb3IoZSkpfXZhciBhPW4uZGVmZXIoKSxjPWEucHJvbWlzZTtpZihlLnBsdWdpbnMpe3ZhciB1O3U9Mj09PWFyZ3VtZW50cy5sZW5ndGg/ZS5wbHVnaW5zLmFwcFByZWZlcmVuY2VzLnJlbW92ZShvLHIpOmUucGx1Z2lucy5hcHBQcmVmZXJlbmNlcy5yZW1vdmUociksdS50aGVuKHQsaSl9ZWxzZSBhLnJlamVjdChuZXcgRXJyb3IodGhpcy5wbHVnaW5Ob3RFbmFibGVkTWVzc2FnZSkpO3JldHVybiB0aGlzLmRlY29yYXRlUHJvbWlzZShjKSxjfSxzaG93OmZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlKXt0LnJlc29sdmUoZSl9ZnVuY3Rpb24gbyhlKXt0LnJlamVjdChuZXcgRXJyb3IoZSkpfXZhciB0PW4uZGVmZXIoKSxpPXQucHJvbWlzZTtyZXR1cm4gZS5wbHVnaW5zP2UucGx1Z2lucy5hcHBQcmVmZXJlbmNlcy5zaG93KCkudGhlbihyLG8pOnQucmVqZWN0KG5ldyBFcnJvcih0aGlzLnBsdWdpbk5vdEVuYWJsZWRNZXNzYWdlKSksdGhpcy5kZWNvcmF0ZVByb21pc2UoaSksaX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMucHJpbnRlclwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFQcmludGVyXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntpc0F2YWlsYWJsZTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW4ucHJpbnRlci5pc0F2YWlsYWJsZShmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9KSxyLnByb21pc2V9LHByaW50OmZ1bmN0aW9uKHIsbyl7dmFyIHQ9ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbi5wcmludGVyLnByaW50KHIsbyxmdW5jdGlvbigpe3QucmVzb2x2ZSgpfSksdC5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5wcm9ncmVzc0luZGljYXRvclwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFQcm9ncmVzc1wiLFtmdW5jdGlvbigpe3JldHVybntzaG93OmZ1bmN0aW9uKGUpe3ZhciBuPWV8fFwiUGxlYXNlIHdhaXQuLi5cIjtyZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3Iuc2hvdyhuKX0sc2hvd1NpbXBsZTpmdW5jdGlvbihlKXt2YXIgbj1lfHwhMTtyZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3Iuc2hvd1NpbXBsZShuKX0sc2hvd1NpbXBsZVdpdGhMYWJlbDpmdW5jdGlvbihlLG4pe3ZhciByPWV8fCExLG89bnx8XCJMb2FkaW5nLi4uXCI7cmV0dXJuIFByb2dyZXNzSW5kaWNhdG9yLnNob3dTaW1wbGVXaXRoTGFiZWwocixvKX0sc2hvd1NpbXBsZVdpdGhMYWJlbERldGFpbDpmdW5jdGlvbihlLG4scil7dmFyIG89ZXx8ITEsdD1ufHxcIkxvYWRpbmcuLi5cIixpPXJ8fFwiUGxlYXNlIHdhaXRcIjtyZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3Iuc2hvd1NpbXBsZVdpdGhMYWJlbERldGFpbChvLHQsaSl9LHNob3dEZXRlcm1pbmF0ZTpmdW5jdGlvbihlLG4pe3ZhciByPWV8fCExLG89bnx8NWU0O3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93RGV0ZXJtaW5hdGUocixvKX0sc2hvd0RldGVybWluYXRlV2l0aExhYmVsOmZ1bmN0aW9uKGUsbixyKXt2YXIgbz1lfHwhMSx0PW58fDVlNCxpPXJ8fFwiTG9hZGluZy4uLlwiO3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93RGV0ZXJtaW5hdGVXaXRoTGFiZWwobyx0LGkpfSxzaG93QW5udWxhcjpmdW5jdGlvbihlLG4pe3ZhciByPWV8fCExLG89bnx8NWU0O3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93QW5udWxhcihyLG8pfSxzaG93QW5udWxhcldpdGhMYWJlbDpmdW5jdGlvbihlLG4scil7dmFyIG89ZXx8ITEsdD1ufHw1ZTQsaT1yfHxcIkxvYWRpbmcuLi5cIjtyZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3Iuc2hvd0FubnVsYXJXaXRoTGFiZWwobyx0LGkpfSxzaG93QmFyOmZ1bmN0aW9uKGUsbil7dmFyIHI9ZXx8ITEsbz1ufHw1ZTQ7cmV0dXJuIFByb2dyZXNzSW5kaWNhdG9yLnNob3dCYXIocixvKX0sc2hvd0JhcldpdGhMYWJlbDpmdW5jdGlvbihlLG4scil7dmFyIG89ZXx8ITEsdD1ufHw1ZTQsaT1yfHxcIkxvYWRpbmcuLi5cIjtyZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3Iuc2hvd0JhcldpdGhMYWJlbChvLHQsaSl9LHNob3dTdWNjZXNzOmZ1bmN0aW9uKGUsbil7dmFyIHI9ZXx8ITEsbz1ufHxcIlN1Y2Nlc3NcIjtyZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3Iuc2hvd1N1Y2Nlc3MocixvKX0sc2hvd1RleHQ6ZnVuY3Rpb24oZSxuLHIpe3ZhciBvPWV8fCExLHQ9bnx8XCJXYXJuaW5nXCIsaT1yfHxcImNlbnRlclwiO3JldHVybiBQcm9ncmVzc0luZGljYXRvci5zaG93VGV4dChvLHQsaSl9LGhpZGU6ZnVuY3Rpb24oKXtyZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3IuaGlkZSgpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5wdXNoXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVB1c2hcIixbXCIkcVwiLFwiJHdpbmRvd1wiLFwiJHJvb3RTY29wZVwiLFwiJHRpbWVvdXRcIixmdW5jdGlvbihlLG4scixvKXtyZXR1cm57b25Ob3RpZmljYXRpb246ZnVuY3Rpb24oZSl7byhmdW5jdGlvbigpe3IuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhUHVzaDpub3RpZmljYXRpb25SZWNlaXZlZFwiLGUpfSl9LHJlZ2lzdGVyOmZ1bmN0aW9uKHIpe3ZhciBvLHQ9ZS5kZWZlcigpO3JldHVybiB2b2lkIDAhPT1yJiZ2b2lkIDA9PT1yLmVjYiYmKG89bnVsbD09PWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbbmctYXBwXVwiKT9cImRvY3VtZW50LmJvZHlcIjpcImRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tuZy1hcHBdJylcIixyLmVjYj1cImFuZ3VsYXIuZWxlbWVudChcIitvK1wiKS5pbmplY3RvcigpLmdldCgnJGNvcmRvdmFQdXNoJykub25Ob3RpZmljYXRpb25cIiksbi5wbHVnaW5zLnB1c2hOb3RpZmljYXRpb24ucmVnaXN0ZXIoZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0sciksdC5wcm9taXNlfSx1bnJlZ2lzdGVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnB1c2hOb3RpZmljYXRpb24udW5yZWdpc3RlcihmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSxyKSxvLnByb21pc2V9LHNldEJhZGdlTnVtYmVyOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnB1c2hOb3RpZmljYXRpb24uc2V0QXBwbGljYXRpb25JY29uQmFkZ2VOdW1iZXIoZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0sciksby5wcm9taXNlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5wdXNoX3Y1XCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVB1c2hWNVwiLFtcIiRxXCIsXCIkcm9vdFNjb3BlXCIsXCIkdGltZW91dFwiLGZ1bmN0aW9uKGUsbixyKXt2YXIgbztyZXR1cm57aW5pdGlhbGl6ZTpmdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG89UHVzaE5vdGlmaWNhdGlvbi5pbml0KG4pLHIucmVzb2x2ZShvKSxyLnByb21pc2V9LG9uTm90aWZpY2F0aW9uOmZ1bmN0aW9uKCl7cihmdW5jdGlvbigpe28ub24oXCJub3RpZmljYXRpb25cIixmdW5jdGlvbihlKXtuLiRlbWl0KFwiJGNvcmRvdmFQdXNoVjU6bm90aWZpY2F0aW9uUmVjZWl2ZWRcIixlKX0pfSl9LG9uRXJyb3I6ZnVuY3Rpb24oKXtyKGZ1bmN0aW9uKCl7by5vbihcImVycm9yXCIsZnVuY3Rpb24oZSl7bi4kZW1pdChcIiRjb3Jkb3ZhUHVzaFY1OmVycm9yT2NjdXJyZWRcIixlKX0pfSl9LHJlZ2lzdGVyOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiB2b2lkIDA9PT1vP24ucmVqZWN0KG5ldyBFcnJvcihcImluaXQgbXVzdCBiZSBjYWxsZWQgYmVmb3JlIGFueSBvdGhlciBvcGVyYXRpb25cIikpOm8ub24oXCJyZWdpc3RyYXRpb25cIixmdW5jdGlvbihlKXtuLnJlc29sdmUoZS5yZWdpc3RyYXRpb25JZCl9KSxuLnByb21pc2V9LHVucmVnaXN0ZXI6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIHZvaWQgMD09PW8/bi5yZWplY3QobmV3IEVycm9yKFwiaW5pdCBtdXN0IGJlIGNhbGxlZCBiZWZvcmUgYW55IG90aGVyIG9wZXJhdGlvblwiKSk6by51bnJlZ2lzdGVyKGZ1bmN0aW9uKGUpe24ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7bi5yZWplY3QoZSl9KSxuLnByb21pc2V9LGdldEJhZGdlTnVtYmVyOmZ1bmN0aW9uKCl7dmFyIG49ZS5kZWZlcigpO3JldHVybiB2b2lkIDA9PT1vP24ucmVqZWN0KG5ldyBFcnJvcihcImluaXQgbXVzdCBiZSBjYWxsZWQgYmVmb3JlIGFueSBvdGhlciBvcGVyYXRpb25cIikpOm8uZ2V0QXBwbGljYXRpb25JY29uQmFkZ2VOdW1iZXIoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sc2V0QmFkZ2VOdW1iZXI6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiB2b2lkIDA9PT1vP3IucmVqZWN0KG5ldyBFcnJvcihcImluaXQgbXVzdCBiZSBjYWxsZWQgYmVmb3JlIGFueSBvdGhlciBvcGVyYXRpb25cIikpOm8uc2V0QXBwbGljYXRpb25JY29uQmFkZ2VOdW1iZXIoZnVuY3Rpb24oZSl7ci5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0sbiksci5wcm9taXNlfSxmaW5pc2g6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIHZvaWQgMD09PW8/bi5yZWplY3QobmV3IEVycm9yKFwiaW5pdCBtdXN0IGJlIGNhbGxlZCBiZWZvcmUgYW55IG90aGVyIG9wZXJhdGlvblwiKSk6by5maW5pc2goZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMucmVjZW50c0NvbnRyb2xcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhUmVjZW50c1wiLGZ1bmN0aW9uKCl7cmV0dXJue3NldENvbG9yOmZ1bmN0aW9uKGUpe3JldHVybiBSZWNlbnRzQ29udHJvbC5zZXRDb2xvcihlKX0sc2V0RGVzY3JpcHRpb246ZnVuY3Rpb24oZSl7cmV0dXJuIFJlY2VudHNDb250cm9sLnNldERlc2NyaXB0aW9uKGUpfSxzZXRPcHRpb25zOmZ1bmN0aW9uKGUsbil7cmV0dXJuIFJlY2VudHNDb250cm9sLnNldE9wdGlvbnMoZSxuKX19fSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5zY3JlZW5zaG90XCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVNjcmVlbnNob3RcIixbXCIkcVwiLGZ1bmN0aW9uKGUpe3JldHVybntjYXB0dXJlVG9GaWxlOmZ1bmN0aW9uKG4pe3ZhciByPW58fHt9LG89ci5leHRlbnNpb258fFwianBnXCIsdD1yLnF1YWxpdHl8fFwiMTAwXCIsaT1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5zY3JlZW5zaG90PyhuYXZpZ2F0b3Iuc2NyZWVuc2hvdC5zYXZlKGZ1bmN0aW9uKGUsbil7ZT9pLnJlamVjdChlKTppLnJlc29sdmUobi5maWxlUGF0aCl9LG8sdCxyLmZpbGVuYW1lKSxpLnByb21pc2UpOihpLnJlc29sdmUobnVsbCksaS5wcm9taXNlKX0sY2FwdHVyZVRvVXJpOmZ1bmN0aW9uKG4pe3ZhciByPW58fHt9LG89ci5leHRlbnNpb258fFwianBnXCIsdD1yLnF1YWxpdHl8fFwiMTAwXCIsaT1lLmRlZmVyKCk7cmV0dXJuIG5hdmlnYXRvci5zY3JlZW5zaG90PyhuYXZpZ2F0b3Iuc2NyZWVuc2hvdC5VUkkoZnVuY3Rpb24oZSxuKXtlP2kucmVqZWN0KGUpOmkucmVzb2x2ZShuLlVSSSl9LG8sdCxyLmZpbGVuYW1lKSxpLnByb21pc2UpOihpLnJlc29sdmUobnVsbCksaS5wcm9taXNlKX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuc2VyaWFsXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVNlcmlhbFwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7dmFyIG49e307cmV0dXJuIG4ucmVxdWVzdFBlcm1pc3Npb249ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiBzZXJpYWwucmVxdWVzdFBlcm1pc3Npb24obixmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sbi5vcGVuPWZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gc2VyaWFsLm9wZW4obixmdW5jdGlvbigpe3IucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtyLnJlamVjdChlKX0pLHIucHJvbWlzZX0sbi53cml0ZT1mdW5jdGlvbihuKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIHNlcmlhbC53cml0ZShuLGZ1bmN0aW9uKCl7ci5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSksci5wcm9taXNlfSxuLndyaXRlSGV4PWZ1bmN0aW9uKG4pe3ZhciByPWUuZGVmZXIoKTtyZXR1cm4gc2VyaWFsLndyaXRlSGV4KG4sZnVuY3Rpb24oKXtyLnJlc29sdmUoKX0sZnVuY3Rpb24oZSl7ci5yZWplY3QoZSl9KSxyLnByb21pc2V9LG4ucmVhZD1mdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gc2VyaWFsLnJlYWQoZnVuY3Rpb24oZSl7dmFyIHI9bmV3IFVpbnQ4QXJyYXkoZSk7bi5yZXNvbHZlKHIpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pLG4ucHJvbWlzZX0sbi5yZWdpc3RlclJlYWRDYWxsYmFjaz1mdW5jdGlvbihlLG4pe3NlcmlhbC5yZWdpc3RlclJlYWRDYWxsYmFjayhmdW5jdGlvbihuKXt2YXIgcj1uZXcgVWludDhBcnJheShuKTtlKHIpfSxuKX0sbi5jbG9zZT1mdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gc2VyaWFsLmNsb3NlKGZ1bmN0aW9uKCl7bi5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe24ucmVqZWN0KGUpfSksbi5wcm9taXNlfSxufV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuc21zXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVNtc1wiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue3NlbmQ6ZnVuY3Rpb24obixyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gc21zLnNlbmQobixyLG8sZnVuY3Rpb24oZSl7dC5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXt0LnJlamVjdChlKX0pLHQucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuc29jaWFsU2hhcmluZ1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFTb2NpYWxTaGFyaW5nXCIsW1wiJHFcIixcIiR3aW5kb3dcIixmdW5jdGlvbihlLG4pe3JldHVybntzaGFyZTpmdW5jdGlvbihyLG8sdCxpKXt2YXIgYT1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCx0PXR8fG51bGwsaT1pfHxudWxsLG4ucGx1Z2lucy5zb2NpYWxzaGFyaW5nLnNoYXJlKHIsbyx0LGksZnVuY3Rpb24oKXthLnJlc29sdmUoITApfSxmdW5jdGlvbigpe2EucmVqZWN0KCExKX0pLGEucHJvbWlzZX0sc2hhcmVXaXRoT3B0aW9uczpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5zb2NpYWxzaGFyaW5nLnNoYXJlV2l0aE9wdGlvbnMocixmdW5jdGlvbigpe28ucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKCl7by5yZWplY3QoITEpfSksby5wcm9taXNlfSxzaGFyZVZpYVR3aXR0ZXI6ZnVuY3Rpb24ocixvLHQpe3ZhciBpPWUuZGVmZXIoKTtyZXR1cm4gbz1vfHxudWxsLHQ9dHx8bnVsbCxuLnBsdWdpbnMuc29jaWFsc2hhcmluZy5zaGFyZVZpYVR3aXR0ZXIocixvLHQsZnVuY3Rpb24oKXtpLnJlc29sdmUoITApfSxmdW5jdGlvbigpe2kucmVqZWN0KCExKX0pLGkucHJvbWlzZX0sc2hhcmVWaWFXaGF0c0FwcDpmdW5jdGlvbihyLG8sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsdD10fHxudWxsLG4ucGx1Z2lucy5zb2NpYWxzaGFyaW5nLnNoYXJlVmlhV2hhdHNBcHAocixvLHQsZnVuY3Rpb24oKXtpLnJlc29sdmUoITApfSxmdW5jdGlvbigpe2kucmVqZWN0KCExKX0pLGkucHJvbWlzZX0sc2hhcmVWaWFGYWNlYm9vazpmdW5jdGlvbihyLG8sdCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiByPXJ8fG51bGwsbz1vfHxudWxsLHQ9dHx8bnVsbCxuLnBsdWdpbnMuc29jaWFsc2hhcmluZy5zaGFyZVZpYUZhY2Vib29rKHIsbyx0LGZ1bmN0aW9uKCl7aS5yZXNvbHZlKCEwKX0sZnVuY3Rpb24oKXtpLnJlamVjdCghMSl9KSxpLnByb21pc2V9LHNoYXJlVmlhRmFjZWJvb2tXaXRoUGFzdGVNZXNzYWdlSGludDpmdW5jdGlvbihyLG8sdCxpKXt2YXIgYT1lLmRlZmVyKCk7cmV0dXJuIG89b3x8bnVsbCx0PXR8fG51bGwsbi5wbHVnaW5zLnNvY2lhbHNoYXJpbmcuc2hhcmVWaWFGYWNlYm9va1dpdGhQYXN0ZU1lc3NhZ2VIaW50KHIsbyx0LGksZnVuY3Rpb24oKXthLnJlc29sdmUoITApfSxmdW5jdGlvbigpe2EucmVqZWN0KCExKX0pLGEucHJvbWlzZX0sc2hhcmVWaWFTTVM6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5zb2NpYWxzaGFyaW5nLnNoYXJlVmlhU01TKHIsbyxmdW5jdGlvbigpe3QucmVzb2x2ZSghMCl9LGZ1bmN0aW9uKCl7dC5yZWplY3QoITEpfSksdC5wcm9taXNlfSxzaGFyZVZpYUVtYWlsOmZ1bmN0aW9uKHIsbyx0LGksYSxjKXt2YXIgdT1lLmRlZmVyKCk7cmV0dXJuIHQ9dHx8bnVsbCxpPWl8fG51bGwsYT1hfHxudWxsLGM9Y3x8bnVsbCxuLnBsdWdpbnMuc29jaWFsc2hhcmluZy5zaGFyZVZpYUVtYWlsKHIsbyx0LGksYSxjLGZ1bmN0aW9uKCl7dS5yZXNvbHZlKCEwKX0sZnVuY3Rpb24oKXt1LnJlamVjdCghMSl9KSx1LnByb21pc2V9LHNoYXJlVmlhOmZ1bmN0aW9uKHIsbyx0LGksYSl7dmFyIGM9ZS5kZWZlcigpO3JldHVybiBvPW98fG51bGwsdD10fHxudWxsLGk9aXx8bnVsbCxhPWF8fG51bGwsbi5wbHVnaW5zLnNvY2lhbHNoYXJpbmcuc2hhcmVWaWEocixvLHQsaSxhLGZ1bmN0aW9uKCl7Yy5yZXNvbHZlKCEwKX0sZnVuY3Rpb24oKXtjLnJlamVjdCghMSl9KSxjLnByb21pc2V9LGNhblNoYXJlVmlhRW1haWw6ZnVuY3Rpb24oKXt2YXIgcj1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5zb2NpYWxzaGFyaW5nLmNhblNoYXJlVmlhRW1haWwoZnVuY3Rpb24oKXtyLnJlc29sdmUoITApfSxmdW5jdGlvbigpe3IucmVqZWN0KCExKX0pLHIucHJvbWlzZX0sY2FuU2hhcmVWaWE6ZnVuY3Rpb24ocixvLHQsaSxhKXt2YXIgYz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy5zb2NpYWxzaGFyaW5nLmNhblNoYXJlVmlhKHIsbyx0LGksYSxmdW5jdGlvbihlKXtjLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe2MucmVqZWN0KGUpfSksYy5wcm9taXNlfSxhdmFpbGFibGU6ZnVuY3Rpb24oKXt2YXIgbj1lLmRlZmVyKCk7cmV0dXJuIHdpbmRvdy5wbHVnaW5zLnNvY2lhbHNoYXJpbmcuYXZhaWxhYmxlKGZ1bmN0aW9uKGUpe2U/bi5yZXNvbHZlKCk6bi5yZWplY3QoKX0pLG4ucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuc3Bpbm5lckRpYWxvZ1wiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFTcGlubmVyRGlhbG9nXCIsW1wiJHdpbmRvd1wiLGZ1bmN0aW9uKGUpe3JldHVybntzaG93OmZ1bmN0aW9uKG4scixvLHQpe3JldHVybiBvPW98fCExLGUucGx1Z2lucy5zcGlubmVyRGlhbG9nLnNob3cobixyLG8sdCl9LGhpZGU6ZnVuY3Rpb24oKXtyZXR1cm4gZS5wbHVnaW5zLnNwaW5uZXJEaWFsb2cuaGlkZSgpfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy5zcGxhc2hzY3JlZW5cIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhU3BsYXNoc2NyZWVuXCIsW2Z1bmN0aW9uKCl7cmV0dXJue2hpZGU6ZnVuY3Rpb24oKXtyZXR1cm4gbmF2aWdhdG9yLnNwbGFzaHNjcmVlbi5oaWRlKCl9LHNob3c6ZnVuY3Rpb24oKXtyZXR1cm4gbmF2aWdhdG9yLnNwbGFzaHNjcmVlbi5zaG93KCl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnNxbGl0ZVwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFTUUxpdGVcIixbXCIkcVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGUsbil7cmV0dXJue29wZW5EQjpmdW5jdGlvbihlLHIpe3JldHVybiBhbmd1bGFyLmlzT2JqZWN0KGUpJiYhYW5ndWxhci5pc1N0cmluZyhlKT8oXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHImJihlLmJnVHlwZT1yKSxuLnNxbGl0ZVBsdWdpbi5vcGVuRGF0YWJhc2UoZSkpOm4uc3FsaXRlUGx1Z2luLm9wZW5EYXRhYmFzZSh7bmFtZTplLGJnVHlwZTpyfSl9LGV4ZWN1dGU6ZnVuY3Rpb24obixyLG8pe3ZhciB0PWUuZGVmZXIoKTtyZXR1cm4gbi50cmFuc2FjdGlvbihmdW5jdGlvbihlKXtlLmV4ZWN1dGVTcWwocixvLGZ1bmN0aW9uKGUsbil7dC5yZXNvbHZlKG4pfSxmdW5jdGlvbihlLG4pe3QucmVqZWN0KG4pfSl9KSx0LnByb21pc2V9LGluc2VydENvbGxlY3Rpb246ZnVuY3Rpb24obixyLG8pe3ZhciB0PWUuZGVmZXIoKSxpPW8uc2xpY2UoMCk7cmV0dXJuIG4udHJhbnNhY3Rpb24oZnVuY3Rpb24oZSl7IWZ1bmN0aW9uIG4oKXt2YXIgbz1pLnNwbGljZSgwLDEpWzBdO3RyeXtlLmV4ZWN1dGVTcWwocixvLGZ1bmN0aW9uKGUscil7MD09PWkubGVuZ3RoP3QucmVzb2x2ZShyKTpuKCl9LGZ1bmN0aW9uKGUsbil7dC5yZWplY3Qobil9KX1jYXRjaChhKXt0LnJlamVjdChhKX19KCl9KSx0LnByb21pc2V9LG5lc3RlZEV4ZWN1dGU6ZnVuY3Rpb24obixyLG8sdCxpKXt2YXIgYT1lLmRlZmVyKCk7cmV0dXJuIG4udHJhbnNhY3Rpb24oZnVuY3Rpb24oZSl7ZS5leGVjdXRlU3FsKHIsdCxmdW5jdGlvbihlLG4pe2EucmVzb2x2ZShuKSxlLmV4ZWN1dGVTcWwobyxpLGZ1bmN0aW9uKGUsbil7YS5yZXNvbHZlKG4pfSl9KX0sZnVuY3Rpb24oZSxuKXthLnJlamVjdChuKX0pLGEucHJvbWlzZX0sZGVsZXRlREI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnNxbGl0ZVBsdWdpbi5kZWxldGVEYXRhYmFzZShyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnN0YXR1c2JhclwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFTdGF0dXNiYXJcIixbZnVuY3Rpb24oKXtyZXR1cm57b3ZlcmxheXNXZWJWaWV3OmZ1bmN0aW9uKGUpe3JldHVybiBTdGF0dXNCYXIub3ZlcmxheXNXZWJWaWV3KCEhZSl9LFNUWUxFUzp7REVGQVVMVDowLExJR0hUX0NPTlRFTlQ6MSxCTEFDS19UUkFOU0xVQ0VOVDoyLEJMQUNLX09QQVFVRTozfSxzdHlsZTpmdW5jdGlvbihlKXtzd2l0Y2goZSl7Y2FzZSAwOnJldHVybiBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7Y2FzZSAxOnJldHVybiBTdGF0dXNCYXIuc3R5bGVMaWdodENvbnRlbnQoKTtjYXNlIDI6cmV0dXJuIFN0YXR1c0Jhci5zdHlsZUJsYWNrVHJhbnNsdWNlbnQoKTtjYXNlIDM6cmV0dXJuIFN0YXR1c0Jhci5zdHlsZUJsYWNrT3BhcXVlKCk7ZGVmYXVsdDpyZXR1cm4gU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpfX0sc3R5bGVDb2xvcjpmdW5jdGlvbihlKXtyZXR1cm4gU3RhdHVzQmFyLmJhY2tncm91bmRDb2xvckJ5TmFtZShlKX0sc3R5bGVIZXg6ZnVuY3Rpb24oZSl7cmV0dXJuIFN0YXR1c0Jhci5iYWNrZ3JvdW5kQ29sb3JCeUhleFN0cmluZyhlKX0saGlkZTpmdW5jdGlvbigpe3JldHVybiBTdGF0dXNCYXIuaGlkZSgpfSxzaG93OmZ1bmN0aW9uKCl7cmV0dXJuIFN0YXR1c0Jhci5zaG93KCl9LGlzVmlzaWJsZTpmdW5jdGlvbigpe3JldHVybiBTdGF0dXNCYXIuaXNWaXNpYmxlfX19XSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy50b2FzdFwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFUb2FzdFwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57c2hvd1Nob3J0VG9wOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnRvYXN0LnNob3dTaG9ydFRvcChyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHNob3dTaG9ydENlbnRlcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy50b2FzdC5zaG93U2hvcnRDZW50ZXIocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxzaG93U2hvcnRCb3R0b206ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMudG9hc3Quc2hvd1Nob3J0Qm90dG9tKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sc2hvd0xvbmdUb3A6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnBsdWdpbnMudG9hc3Quc2hvd0xvbmdUb3AocixmdW5jdGlvbihlKXtvLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe28ucmVqZWN0KGUpfSksby5wcm9taXNlfSxzaG93TG9uZ0NlbnRlcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucGx1Z2lucy50b2FzdC5zaG93TG9uZ0NlbnRlcihyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHNob3dMb25nQm90dG9tOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnRvYXN0LnNob3dMb25nQm90dG9tKHIsZnVuY3Rpb24oZSl7by5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0pLG8ucHJvbWlzZX0sc2hvd1dpdGhPcHRpb25zOmZ1bmN0aW9uKHIpe3ZhciBvPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnRvYXN0LnNob3dXaXRoT3B0aW9ucyhyLGZ1bmN0aW9uKGUpe28ucmVzb2x2ZShlKX0sZnVuY3Rpb24oZSl7by5yZWplY3QoZSl9KSxvLnByb21pc2V9LHNob3c6ZnVuY3Rpb24ocixvLHQpe3ZhciBpPWUuZGVmZXIoKTtyZXR1cm4gbi5wbHVnaW5zLnRvYXN0LnNob3cocixvLHQsZnVuY3Rpb24oZSl7aS5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtpLnJlamVjdChlKX0pLGkucHJvbWlzZX0saGlkZTpmdW5jdGlvbigpe3ZhciByPWUuZGVmZXIoKTt0cnl7bi5wbHVnaW5zLnRvYXN0LmhpZGUoKSxyLnJlc29sdmUoKX1jYXRjaChvKXtyLnJlamVjdChvJiZvLm1lc3NhZ2UpfXJldHVybiByLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnRvdWNoaWRcIixbXSkuZmFjdG9yeShcIiRjb3Jkb3ZhVG91Y2hJRFwiLFtcIiRxXCIsZnVuY3Rpb24oZSl7cmV0dXJue2NoZWNrU3VwcG9ydDpmdW5jdGlvbigpe3ZhciBuPWUuZGVmZXIoKTtyZXR1cm4gd2luZG93LmNvcmRvdmE/dG91Y2hpZC5jaGVja1N1cHBvcnQoZnVuY3Rpb24oZSl7bi5yZXNvbHZlKGUpfSxmdW5jdGlvbihlKXtuLnJlamVjdChlKX0pOm4ucmVqZWN0KFwiTm90IHN1cHBvcnRlZCB3aXRob3V0IGNvcmRvdmEuanNcIiksbi5wcm9taXNlfSxhdXRoZW50aWNhdGU6ZnVuY3Rpb24obil7dmFyIHI9ZS5kZWZlcigpO3JldHVybiB3aW5kb3cuY29yZG92YT90b3VjaGlkLmF1dGhlbnRpY2F0ZShmdW5jdGlvbihlKXtyLnJlc29sdmUoZSl9LGZ1bmN0aW9uKGUpe3IucmVqZWN0KGUpfSxuKTpyLnJlamVjdChcIk5vdCBzdXBwb3J0ZWQgd2l0aG91dCBjb3Jkb3ZhLmpzXCIpLHIucHJvbWlzZX19fV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMudHRzXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVRUU1wiLGZ1bmN0aW9uKCl7cmV0dXJue3NwZWFrOmZ1bmN0aW9uKGUsbixyKXtyZXR1cm4gVFRTLnNwZWFrKGUsbixyKX19fSksYW5ndWxhci5tb2R1bGUoXCJuZ0NvcmRvdmEucGx1Z2lucy51cHNQdXNoXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVVwc1B1c2hcIixbXCIkcVwiLFwiJHdpbmRvd1wiLFwiJHJvb3RTY29wZVwiLFwiJHRpbWVvdXRcIixmdW5jdGlvbihlLG4scixvKXtyZXR1cm57cmVnaXN0ZXI6ZnVuY3Rpb24odCl7dmFyIGk9ZS5kZWZlcigpO3JldHVybiBuLnB1c2gucmVnaXN0ZXIoZnVuY3Rpb24oZSl7byhmdW5jdGlvbigpe3IuJGJyb2FkY2FzdChcIiRjb3Jkb3ZhVXBzUHVzaDpub3RpZmljYXRpb25SZWNlaXZlZFwiLGUpfSl9LGZ1bmN0aW9uKCl7aS5yZXNvbHZlKCl9LGZ1bmN0aW9uKGUpe2kucmVqZWN0KGUpfSx0KSxpLnByb21pc2V9LHVucmVnaXN0ZXI6ZnVuY3Rpb24ocil7dmFyIG89ZS5kZWZlcigpO3JldHVybiBuLnB1c2gudW5yZWdpc3RlcihmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxmdW5jdGlvbihlKXtvLnJlamVjdChlKX0sciksby5wcm9taXNlfSxzZXRCYWRnZU51bWJlcjpmdW5jdGlvbihyKXt2YXIgbz1lLmRlZmVyKCk7cmV0dXJuIG4ucHVzaC5zZXRBcHBsaWNhdGlvbkljb25CYWRnZU51bWJlcihmdW5jdGlvbigpe28ucmVzb2x2ZSgpfSxyKSxvLnByb21pc2V9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnZpYnJhdGlvblwiLFtdKS5mYWN0b3J5KFwiJGNvcmRvdmFWaWJyYXRpb25cIixbZnVuY3Rpb24oKXtyZXR1cm57dmlicmF0ZTpmdW5jdGlvbihlKXtyZXR1cm4gbmF2aWdhdG9yLm5vdGlmaWNhdGlvbi52aWJyYXRlKGUpfSx2aWJyYXRlV2l0aFBhdHRlcm46ZnVuY3Rpb24oZSxuKXtyZXR1cm4gbmF2aWdhdG9yLm5vdGlmaWNhdGlvbi52aWJyYXRlV2l0aFBhdHRlcm4oZSxuKX0sY2FuY2VsVmlicmF0aW9uOmZ1bmN0aW9uKCl7cmV0dXJuIG5hdmlnYXRvci5ub3RpZmljYXRpb24uY2FuY2VsVmlicmF0aW9uKCl9fX1dKSxhbmd1bGFyLm1vZHVsZShcIm5nQ29yZG92YS5wbHVnaW5zLnZpZGVvQ2FwdHVyZVBsdXNcIixbXSkucHJvdmlkZXIoXCIkY29yZG92YVZpZGVvQ2FwdHVyZVBsdXNcIixbZnVuY3Rpb24oKXt2YXIgZT17fTt0aGlzLnNldExpbWl0PWZ1bmN0aW9uKG4pe2UubGltaXQ9bn0sdGhpcy5zZXRNYXhEdXJhdGlvbj1mdW5jdGlvbihuKXtlLmR1cmF0aW9uPW59LHRoaXMuc2V0SGlnaFF1YWxpdHk9ZnVuY3Rpb24obil7ZS5oaWdocXVhbGl0eT1ufSx0aGlzLnVzZUZyb250Q2FtZXJhPWZ1bmN0aW9uKG4pe2UuZnJvbnRjYW1lcmE9bn0sdGhpcy5zZXRQb3J0cmFpdE92ZXJsYXk9ZnVuY3Rpb24obil7ZS5wb3J0cmFpdE92ZXJsYXk9bn0sdGhpcy5zZXRMYW5kc2NhcGVPdmVybGF5PWZ1bmN0aW9uKG4pe2UubGFuZHNjYXBlT3ZlcmxheT1ufSx0aGlzLnNldE92ZXJsYXlUZXh0PWZ1bmN0aW9uKG4pe2Uub3ZlcmxheVRleHQ9bn0sdGhpcy4kZ2V0PVtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24obixyKXtyZXR1cm57Y2FwdHVyZVZpZGVvOmZ1bmN0aW9uKG8pe3ZhciB0PW4uZGVmZXIoKTtyZXR1cm4gci5wbHVnaW5zLnZpZGVvY2FwdHVyZXBsdXM/KHIucGx1Z2lucy52aWRlb2NhcHR1cmVwbHVzLmNhcHR1cmVWaWRlbyh0LnJlc29sdmUsdC5yZWplY3QsYW5ndWxhci5leHRlbmQoe30sZSxvKSksdC5wcm9taXNlKToodC5yZXNvbHZlKG51bGwpLHQucHJvbWlzZSl9fX1dfV0pLGFuZ3VsYXIubW9kdWxlKFwibmdDb3Jkb3ZhLnBsdWdpbnMuemlwXCIsW10pLmZhY3RvcnkoXCIkY29yZG92YVppcFwiLFtcIiRxXCIsXCIkd2luZG93XCIsZnVuY3Rpb24oZSxuKXtyZXR1cm57dW56aXA6ZnVuY3Rpb24ocixvKXt2YXIgdD1lLmRlZmVyKCk7cmV0dXJuIG4uemlwLnVuemlwKHIsbyxmdW5jdGlvbihlKXswPT09ZT90LnJlc29sdmUoKTp0LnJlamVjdCgpfSxmdW5jdGlvbihlKXt0Lm5vdGlmeShlKX0pLHQucHJvbWlzZX19fV0pfSgpOyIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJhZGRDaGlsZEN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlKXtcbiAgLy9iYWNrYnV0dG9uXG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxuICB9XG5cbiRzY29wZS5zdWJtaXRDaGlsZCA9IGZ1bmN0aW9uKGNoaWxkKXtcbiAgY29uc29sZS5sb2coY2hpbGQpO1xuICAkc2NvcGUuY2hpbGQgPSBcIlwiO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoaWxkLWlucHV0XCIpLnZhbHVlID0gXCJcIjtcbn1cblxuXG5cblxuXG59KSAvL2VuZCBvZiBjb250cm9sbGVyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiYXNzaWduQ2hvcmVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIGFzc2lnbiBjaG9yZSBjb250cm9sbGVyXCJcblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoJ2NhbWVyYUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRjb3Jkb3ZhQ2FtZXJhKSB7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRldmljZXJlYWR5XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICRjb3Jkb3ZhUGx1Z2luLnNvbWVGdW5jdGlvbigpLnRoZW4oc3VjY2VzcywgZXJyb3IpO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIC8vIE9SIHdpdGggSU9OSUNcblxuICAgICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgJGNvcmRvdmFQbHVnaW4uc29tZUZ1bmN0aW9uKCkudGhlbihzdWNjZXNzLCBlcnJvcik7XG4gICAgfSk7XG5cbiAgJHNjb3BlLnRha2VQaWN0dXJlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICBxdWFsaXR5OiA1MCxcbiAgICAgIGRlc3RpbmF0aW9uVHlwZTogQ2FtZXJhLkRlc3RpbmF0aW9uVHlwZS5EQVRBX1VSTCxcbiAgICAgIHNvdXJjZVR5cGU6IENhbWVyYS5QaWN0dXJlU291cmNlVHlwZS5DQU1FUkEsXG4gICAgICBhbGxvd0VkaXQ6IGZhbHNlLFxuICAgICAgZW5jb2RpbmdUeXBlOiBDYW1lcmEuRW5jb2RpbmdUeXBlLkpQRUcsXG4gICAgICB0YXJnZXRXaWR0aDogMzAwLFxuICAgICAgdGFyZ2V0SGVpZ2h0OiAzMDAsXG4gICAgICBwb3BvdmVyT3B0aW9uczogQ2FtZXJhUG9wb3Zlck9wdGlvbnMsXG4gICAgICBzYXZlVG9QaG90b0FsYnVtOiBmYWxzZSxcblx0ICAgIGNvcnJlY3RPcmllbnRhdGlvbjp0cnVlXG4gICAgfTtcblxuICAgICRjb3Jkb3ZhQ2FtZXJhLmdldFBpY3R1cmUob3B0aW9ucykudGhlbihmdW5jdGlvbihpbWFnZURhdGEpIHtcbiAgICAgICRzY29wZS5pbWdVUkkgPSBcImRhdGE6aW1hZ2UvanBlZztiYXNlNjQsXCIgKyBpbWFnZURhdGE7XG4gICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAvLyBlcnJvclxuICAgIH0pO1xuXG4gIH07XG4gIH0sIGZhbHNlKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJjaGlsZEJhbmtDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIGJhbmsgY29udHJvbGxlclwiXG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiY2hpbGRIb21lQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsKXtcbiAgLy8gJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSAgY2hpbGQgSG9tZSBjb250cm9sbGVyXCJcbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCd0aGVtZU1vZGFsLmh0bWwnLCB7XG4gICAgIGlkOiAnMScsIC8vIFdlIG5lZWQgdG8gdXNlIGFuZCBJRCB0byBpZGVudGlmeSB0aGUgbW9kYWwgdGhhdCBpcyBmaXJpbmcgdGhlIGV2ZW50IVxuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2UsXG4gICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICAkc2NvcGUub01vZGFsMSA9IG1vZGFsO1xuICAgfSk7XG5cbiAgIC8vIE1vZGFsIDJcbiAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgndGFrZVBpY3R1cmVNb2RhbC5odG1sJywge1xuICAgICBpZDogJzInLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDIgPSBtb2RhbDtcbiAgIH0pO1xuICAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgIGlmIChpbmRleCA9PSAxKSAkc2NvcGUub01vZGFsMS5zaG93KCk7XG4gICAgIGVsc2UgJHNjb3BlLm9Nb2RhbDIuc2hvdygpO1xuICAgfTtcblxuICAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICBpZiAoaW5kZXggPT0gMSkgJHNjb3BlLm9Nb2RhbDEuaGlkZSgpO1xuICAgICBlbHNlICRzY29wZS5vTW9kYWwyLmhpZGUoKTtcbiAgIH07XG5cbiAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICRzY29wZS5vTW9kYWwxLnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsMi5yZW1vdmUoKTtcblxuICAgfSk7XG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImNoaWxkTG9naW5DdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGF1dGgsICRzdGF0ZSwgY2hpbGRMb2dpblNlcnZpY2Upe1xuICAvLyAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBjaGlsZCBMb2dpbiBjb250cm9sbGVyXCJcblxuICAgJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24odXNlcil7XG4gICAgLy8gIGNvbnNvbGUubG9nKHVzZXIpXG4gICAgIGNoaWxkTG9naW5TZXJ2aWNlLnVzZXJMb2dpbih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgIC8vICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAkYXV0aC5zZXRUb2tlbihyZXNwb25zZSlcbiAgICAgICAgICRzdGF0ZS5nbygnY2hpbGRIb21lJylcblxuICAgICB9KVxuICAgfVxuICAgJHNjb3BlLmF1dGhlbnRpY2F0ZSA9IGZ1bmN0aW9uKHByb3ZpZGVyKSB7XG4gICAkYXV0aC5hdXRoZW50aWNhdGUocHJvdmlkZXIpfTtcbiAgIC8vICRzY29wZS50ZXN0ID0gXCJIZWxsbyBmcm9tIGxvZ2luIGNvbnRyb2xsZXJcIlxuICAgJHNjb3BlLnJldmVhbGVyID0gZnVuY3Rpb24oKXtcbiAgICRzY29wZS5oaWRlID0gISRzY29wZS5oaWRlO1xuXG4gIH1cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiZWRpdENoaWxkQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAkc2NvcGUuZ29iYWNrID0gZnVuY3Rpb24oKXtcbiAgICB3aW5kb3cuaGlzdG9yeS5nbygtMSlcbiAgfVxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcImhpc3RvcnlDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIEhpc3RvcnkgY29udHJvbGxlclwiXG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwiaG9tZUN0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCx1c2VyU2VydmljZSl7XG52YXIgdXNlclRva2VuID0gdXNlclNlcnZpY2UuZ2V0VXNlckluZm8uc3ViO1xuICAgJHNjb3BlLnRlc3QgPSBcIk1lc3NhZ2UgZnJvbSBIb21lIGNvbnRyb2xsZXJcIlxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdiYW5uZXJNb2RhbC5odG1sJywge1xuICAgICBzY29wZTogJHNjb3BlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm1vZGFsID0gbW9kYWw7XG4gICB9KTtcbiAgICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAgJHNjb3BlLm1vZGFsLnNob3coKTtcbiAgIH07XG4gICAkc2NvcGUuc3VibWl0QmFubmVyID0gZnVuY3Rpb24oYmFubmVyKXtcbiAgICAgdmFyIGJhbm5lckluZm8gPSB7XG4gICAgICAgdXNlcl9ob3VzZWhvbGQ6dXNlclRva2VuLnVzZXJfaG91c2Vob2xkLFxuICAgICAgIHVzZXJfYmFubmVyX2ltYWdlOmJhbm5lclxuICAgICB9XG4gICAgICB1c2VyU2VydmljZS5wb3N0YmFubmVyKGJhbm5lckluZm8pXG4gICAgICAudGhlbihmdW5jdGlvbihyZXMpe1xuICAgICAkc2NvcGUubW9kYWwuaGlkZSgpO1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWwtYm94XCIpLnZhbHVlID0gJyc7XG4gICAgIH0pO1xuICAgfTtcbiAgICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWwtYm94XCIpLnZhbHVlID0gJyc7XG4gICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gICB9O1xuICAgLy8gQ2xlYW51cCB0aGUgbW9kYWwgd2hlbiB3ZSdyZSBkb25lIHdpdGggaXQhXG4gICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAkc2NvcGUubW9kYWwucmVtb3ZlKCk7XG4gICB9KTtcbiAgIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIGhpZGUgbW9kYWxcbiAgICRzY29wZS4kb24oJ21vZGFsLmhpZGRlbicsIGZ1bmN0aW9uKCkge1xuICAgICAvLyBFeGVjdXRlIGFjdGlvblxuXG4gICB9KTtcbiAgIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIHJlbW92ZSBtb2RhbFxuICAgJHNjb3BlLiRvbignbW9kYWwucmVtb3ZlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAvLyBFeGVjdXRlIGFjdGlvblxuICAgfSk7XG5cbiRzY29wZS5ob3VzZWhvbGQgPSAgdXNlclRva2VuLnVzZXJfaG91c2Vob2xkO1xudXNlclNlcnZpY2UuZ2V0YmFubmVyKHVzZXJUb2tlbi51c2VyX2hvdXNlaG9sZCkudGhlbihmdW5jdGlvbihyZXMpe1xuY29uc29sZS5sb2cocmVzLmRhdGFbMF0udXNlcl9iYW5uZXJfaW1hZ2UpO1xuICAkc2NvcGUuYmFubmVyID0gcmVzLmRhdGFbMF0udXNlcl9iYW5uZXJfaW1hZ2U7XG59KTtcblxuY29uc29sZS5sb2codXNlclRva2VuLnppcCk7XG5cbnVzZXJTZXJ2aWNlLmdldFdlYXRoZXIodXNlclRva2VuLnppcClcbi50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbiAgJHNjb3BlLndlYXRoZXIgPSByZXMuZGF0YTtcbn0pXG5cblxufSkvL2VuZCBvZiBjb250cm9sbGVyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwibG9naW5DdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGF1dGgsICRzdGF0ZSwgbG9naW5TZXJ2aWNlKXtcblxuJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24odXNlcil7XG4gIC8vIGNvbnNvbGUubG9nKHVzZXIpXG4gIGxvZ2luU2VydmljZS51c2VyTG9naW4odXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgJGF1dGguc2V0VG9rZW4ocmVzcG9uc2UpXG4gICAgICAkc3RhdGUuZ28oJ2hvbWUnKVxuXG4gIH0pXG59XG4kc2NvcGUubWFrZVVzZXIgPSBmdW5jdGlvbihuZXdVc2VyKXtcbiAgbG9naW5TZXJ2aWNlLm1ha2VVc2VyKG5ld1VzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICRhdXRoLnNldFRva2VuKHJlc3BvbnNlKVxuICAgICAgJHN0YXRlLmdvKCdob21lJylcbiAgfSlcbn1cbiAgJHNjb3BlLmF1dGhlbnRpY2F0ZSA9IGZ1bmN0aW9uKHByb3ZpZGVyKSB7XG4gICRhdXRoLmF1dGhlbnRpY2F0ZShwcm92aWRlcil9O1xuICAvLyAkc2NvcGUudGVzdCA9IFwiSGVsbG8gZnJvbSBsb2dpbiBjb250cm9sbGVyXCJcblxuXG4gICRzY29wZS5yZXZlYWxlciA9IGZ1bmN0aW9uKCl7XG4gICRzY29wZS5oaWRlID0gISRzY29wZS5oaWRlO1xuIH1cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJtYWtlQ2hvcmVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICRzY29wZS5nb2JhY2sgPSBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKVxuICB9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwic2V0UmV3YXJkc0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCl7XG4gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgncmV3YXJkTW9kYWwuaHRtbCcsIHtcbiAgICBzY29wZTogJHNjb3BlLFxuICAgIGFuaW1hdGlvbjogJ3NsaWRlLWluLXVwJ1xuICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgJHNjb3BlLm1vZGFsID0gbW9kYWw7XG4gIH0pO1xuICAkc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLnNob3coKTtcbiAgfTtcbiAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwuaGlkZSgpO1xuICB9O1xuICAvLyBDbGVhbnVwIHRoZSBtb2RhbCB3aGVuIHdlJ3JlIGRvbmUgd2l0aCBpdCFcbiAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwucmVtb3ZlKCk7XG4gIH0pO1xuICAvLyBFeGVjdXRlIGFjdGlvbiBvbiBoaWRlIG1vZGFsXG4gICRzY29wZS4kb24oJ21vZGFsLmhpZGRlbicsIGZ1bmN0aW9uKCkge1xuICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gIH0pO1xuICAvLyBFeGVjdXRlIGFjdGlvbiBvbiByZW1vdmUgbW9kYWxcbiAgJHNjb3BlLiRvbignbW9kYWwucmVtb3ZlZCcsIGZ1bmN0aW9uKCkge1xuICAgIC8vIEV4ZWN1dGUgYWN0aW9uXG4gIH0pO1xuICAvL2JhY2tidXR0b25cbiAgJHNjb3BlLmdvYmFjayA9IGZ1bmN0aW9uKCl7XG4gICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpXG4gIH1cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdjaG9yZScpLmNvbnRyb2xsZXIoXCJzZXR0aW5nc0N0cmxcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCl7XG4gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnY2hhbmdlUGFzc3dvcmQuaHRtbCcsIHtcbiAgICAgaWQ6ICcxJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWwxID0gbW9kYWw7XG4gICB9KTtcblxuICAgLy8gTW9kYWwgMlxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdjaGFuZ2VIb3VzZWhvbGQuaHRtbCcsIHtcbiAgICAgaWQ6ICcyJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWwyID0gbW9kYWw7XG4gICB9KTtcblxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdjaGFuZ2VaaXAuaHRtbCcsIHtcbiAgICAgaWQ6ICczJywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWwzID0gbW9kYWw7XG4gICB9KTtcblxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdhZGRQYXJlbnQuaHRtbCcsIHtcbiAgICAgaWQ6ICc0JywgLy8gV2UgbmVlZCB0byB1c2UgYW5kIElEIHRvIGlkZW50aWZ5IHRoZSBtb2RhbCB0aGF0IGlzIGZpcmluZyB0aGUgZXZlbnQhXG4gICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgIGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZSxcbiAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICRzY29wZS5vTW9kYWw0ID0gbW9kYWw7XG4gICB9KTtcblxuICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdyZW1vdmVDaGlsZC5odG1sJywge1xuICAgICBpZDogJzUnLCAvLyBXZSBuZWVkIHRvIHVzZSBhbmQgSUQgdG8gaWRlbnRpZnkgdGhlIG1vZGFsIHRoYXQgaXMgZmlyaW5nIHRoZSBldmVudCFcbiAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgYmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlLFxuICAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcbiAgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgJHNjb3BlLm9Nb2RhbDUgPSBtb2RhbDtcbiAgIH0pO1xuXG5cblxuICAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgIGlmIChpbmRleCA9PSAxKSAkc2NvcGUub01vZGFsMS5zaG93KCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gMikgJHNjb3BlLm9Nb2RhbDIuc2hvdygpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDMpICRzY29wZS5vTW9kYWwzLnNob3coKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSA0KSAkc2NvcGUub01vZGFsNC5zaG93KCk7XG4gICAgIGVsc2UgJHNjb3BlLm9Nb2RhbDUuc2hvdygpO1xuICAgfTtcblxuICAgJHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICBpZiAoaW5kZXggPT0gMSkgJHNjb3BlLm9Nb2RhbDEuaGlkZSgpO1xuICAgICBlbHNlIGlmKGluZGV4ID09IDIpICRzY29wZS5vTW9kYWwyLmhpZGUoKTtcbiAgICAgZWxzZSBpZihpbmRleCA9PSAzKSAkc2NvcGUub01vZGFsMy5oaWRlKCk7XG4gICAgIGVsc2UgaWYoaW5kZXggPT0gNCkgJHNjb3BlLm9Nb2RhbDQuaGlkZSgpO1xuICAgICBlbHNlICRzY29wZS5vTW9kYWw1LmhpZGUoKTtcbiAgIH07XG5cbiAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICRzY29wZS5vTW9kYWwxLnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsMi5yZW1vdmUoKTtcbiAgICAgJHNjb3BlLm9Nb2RhbDMucmVtb3ZlKCk7XG4gICAgICRzY29wZS5vTW9kYWw0LnJlbW92ZSgpO1xuICAgICAkc2NvcGUub01vZGFsNS5yZW1vdmUoKTtcbiAgIH0pO1xuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Nob3JlJykuY29udHJvbGxlcihcInRyYWNrZXJDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwpe1xuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3BpY0NvbmZNb2RhbC5odG1sJywge1xuICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAkc2NvcGUubW9kYWwgPSBtb2RhbDtcbiAgfSk7XG4gICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwuc2hvdygpO1xuICB9O1xuICAkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gIH07XG4gIC8vIENsZWFudXAgdGhlIG1vZGFsIHdoZW4gd2UncmUgZG9uZSB3aXRoIGl0IVxuICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5yZW1vdmUoKTtcbiAgfSk7XG4gIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIGhpZGUgbW9kYWxcbiAgJHNjb3BlLiRvbignbW9kYWwuaGlkZGVuJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgfSk7XG4gIC8vIEV4ZWN1dGUgYWN0aW9uIG9uIHJlbW92ZSBtb2RhbFxuICAkc2NvcGUuJG9uKCdtb2RhbC5yZW1vdmVkJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gRXhlY3V0ZSBhY3Rpb25cbiAgfSk7XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5jb250cm9sbGVyKFwidXNlckluZm9DdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAkc2NvcGUudGVzdCA9IFwiTWVzc2FnZSBmcm9tIGluZm8gY29udHJvbGxlclwiXG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5zZXJ2aWNlKCdsb2dpblNlcnZpY2UnLCBmdW5jdGlvbigkaHR0cCl7XG5cblxuICB0aGlzLnVzZXJMb2dpbiA9IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICAvLyBjb25zb2xlLmxvZyh1c2VyLCBcInNlcnZpY2VcIilcbiAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIHVybDogJy9hdXRoL2xvZ2luJyxcbiAgICAgIGRhdGE6IHVzZXJcbiAgICB9KVxuICB9XG4gIHRoaXMubWFrZVVzZXIgPSBmdW5jdGlvbihuZXdVc2VyKSB7XG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB1cmw6ICcvYXV0aC9zaWdudXAnLFxuICAgICAgZGF0YTogbmV3VXNlclxuICAgIH0pXG4gIH1cbn0pIC8vIGVuZCBvZiBzZXJ2aWNlXG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hvcmUnKS5zZXJ2aWNlKCd1c2VyU2VydmljZScsIGZ1bmN0aW9uKCRodHRwLCRxLCRhdXRoKXtcblxudmFyIGJhbm5lcjtcbnRoaXMuZ2V0VXNlckluZm8gPSAkYXV0aC5nZXRQYXlsb2FkKCk7XG5cblxudGhpcy5wb3N0YmFubmVyID0gZnVuY3Rpb24oYmFubmVyKXtcbiAgY29uc29sZS5sb2coYmFubmVyKTtcbiAgY29uc29sZS5sb2coYmFubmVyLnVzZXJfYmFubmVyX2ltYWdlKTtcbiAgcmV0dXJuICRodHRwKHtcbiAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgdXJsOlwiL2Jhbm5lci9cIiArIGJhbm5lci51c2VyX2hvdXNlaG9sZCxcbiAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7dXNlcl9iYW5uZXJfaW1hZ2U6YmFubmVyLnVzZXJfYmFubmVyX2ltYWdlfSlcbiAgfSlcbn1cblxudGhpcy5nZXRiYW5uZXIgPSBmdW5jdGlvbih1c2VySWQpe1xuICBjb25zb2xlLmxvZyh1c2VySWQpO1xuICByZXR1cm4gJGh0dHAoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6XCIvYmFubmVyL1wiICsgdXNlcklkXG4gIH0pXG59XG5cblxudGhpcy5nZXRXZWF0aGVyID0gZnVuY3Rpb24oKXtcbnJldHVybiAkaHR0cCh7XG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIHVybDonaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPXppcD04NDAxMCZ1bml0cz1pbXBlcmlhbCZhcHBpZD1jMTBlZjk5YzVhZmRlZTNmZGZiYTc4ZThjOTgxYTliNidcbiAgfSlcblxufTtcblxuXG5cblxuXG5cbn0pOy8vZW5kIG9mIHNlcnZpY2VcbiJdfQ==
