'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngCookies',
  'ngRoute',
  'myApp.register',
  'myApp.login',
  'myApp.forgetpass',
  'myApp.folders'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
