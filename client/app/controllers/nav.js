'use strict'

app.controller("NavCtrl", 
  ["$scope", "$http", "$location", "$sessionStorage",
  function($scope, $http, $location, $sessionStorage) {

    if ($sessionStorage.currentUser) {
      $scope.nameToDisplay = $sessionStorage.currentUser.email
    } else {
      $scope.nameToDisplay = "New User"
    }

    $scope.logout = () => {
      console.log("logging you out!");
      delete $sessionStorage.currentUser;
      console.log('$sessionStorage.currentUser', $sessionStorage.currentUser);
      $scope.nameToDisplay = "New User"
    }

}]);