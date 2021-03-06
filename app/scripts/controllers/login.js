'use strict';
/**
 * @ngdoc function
 * @name hotMessApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('hotMessApp')
  .controller('LoginCtrl', ["$scope", "auth", "$location", "$firebaseArray", function ($scope, auth, $location, $firebaseArray) {

    $scope.loginBtn = true;
    $scope.logoutBtn = true;

    auth.$onAuthStateChanged(function (authData) {
      if (authData) {
        let userRef = firebase.database().ref("users/" +authData.uid);
        firebase.database().ref("users/" + authData.uid).update({
          uid: authData.uid,
          displayName: authData.displayName,
          photoURL: authData.photoURL
        });

        // Set money to zero if they don't have any (temporary workaround)
        let moneyRef = firebase.database().ref("users/" + authData.uid + "/money");
        moneyRef.once('value').then(function (money) {
          if (!money.val()) {
            userRef.update({
              money: 0
            })
          }
        });

        $scope.logoutBtn = true;
        $scope.loginBtn = false;
        redirect()
      }
    });



    // SignIn with a Provider
    $scope.oauthLogin = function (provider) {
      auth.$signInWithRedirect(provider)
        .then(function (authData) {
          console.log("logged");
          redirect();
        })
        .catch(function (error) {
          console.log("login error");
          showError(error);
        })
    };

    // Anonymous login method
    $scope.anonymousLogin = function () {
      auth.$signInAnonymously()
        .then(function (authData) {
          console.log("logged ", authData.uid);
        })
        .catch(function (error) {
          console.log("login error ", error);
        })
    };

    function redirect() {
      $location.path('/');
    }

    function showError(err) {
      $scope.err = err;
    }


  }]);
