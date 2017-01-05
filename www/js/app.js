// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','starter.services','common.controllers','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
     AudioRecorderAPI.install();
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/home/menu.html',
      controller: 'AppCtrl'
    })
    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home/home.html',
          controller: 'HomeCtrl'
        }
      }
    })
    .state('app.testID', {
      url:'/testID',
      views: {
        'menuContent': {
          templateUrl: 'templates/home/testID.html',
          controller: 'HomeCtrl'
        }
      }
    })
    .state('app.test1', {
      url: '/test1',
      views: {
        'menuContent': {
          templateUrl: 'templates/test1/test1.html',
          controller:'test1Ctrl'
        }
      }
    })
    .state('app.audio', {
      url: '/audio',
      views: {
        'menuContent': {
          templateUrl: 'templates/audio/audio.html',
          controller:'audioCtrl'
        }
      }
    })
    .state('app.camera', {
      url: '/camera',
      views: {
        'menuContent': {
          templateUrl: 'templates/camera/camera.html',
          controller:'cameraCtrl'
        }
      }
    })
    .state('app.export', {
      url: '/export',
      views: {
        'menuContent': {
          templateUrl: 'templates/export/export.html',
          controller:'exportCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');

});
