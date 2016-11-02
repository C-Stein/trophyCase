'use strict'

app.controller("NavCtrl", 
  ["$scope", "$http", "$location", "$sessionStorage", "userEmail",
  function($scope, $http, $location, $sessionStorage, userEmail) {

    $scope.nameToDisplay = userEmail.get();

    $scope.$watch(userEmail.get, function (newVal, oldVal, scope) {
      if ($sessionStorage.currentUser) {
        $scope.nameToDisplay = $sessionStorage.currentUser.email
      }
    });


    $scope.logout = () => {
      console.log("logging you out!");
      delete $sessionStorage.currentUser;
      delete $sessionStorage.userTrophies;
      delete $sessionStorage.userGroups;
      console.log('$sessionStorage.currentUser on logout', $sessionStorage.currentUser);
      $scope.nameToDisplay = "New User"
    }

}]);