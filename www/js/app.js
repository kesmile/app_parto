// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova'])
.config(function($stateProvider,$urlRouterProvider) {
  $stateProvider
  .state('index', {
    url: '/',
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  })
  .state('sub', {
    url: '/sub',
    templateUrl: 'templates/sub.html',
    controller: 'SubCtrl'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  });
  $urlRouterProvider.otherwise("/login");
})
.run(function($ionicPlatform,$cordovaSQLite,$rootScope,$timeout,$state) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    // $rootScope.db = $cordovaSQLite.openDB({ name: "parto.db" });
    // $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS login (id integer primary key, status INTEGER DEFAULT 0)");
    // $timeout(function() {
    //     $state.go('login');
    // }, 5000);
  });
})
