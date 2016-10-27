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
      delete $sessionStorage.userTrophies;
      delete $sessionStorage.userGroups;
      console.log('$sessionStorage.currentUser on logout', $sessionStorage.currentUser);
      $scope.nameToDisplay = "New User"
    }

}]);