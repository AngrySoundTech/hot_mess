'use strict';

/**
 * @ngdoc overview
 * @name hotMessApp
 * @description
 * # hotMessApp
 *
 * Main module of the application.
 */
angular.module('hotMessApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'firebase.Auth'
  ])

  .run(['$rootScope', '$location', 'auth', function ($rootScope, $location, auth) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      if (auth.$getAuth() === null) {
        if (next.loadedTemplateURL !== "views/login.html") {
          $location.path("/login");
        }
      }
    })
  }]);

