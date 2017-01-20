'use strict'

app.controller("NavCtrl", 
  ["$scope", "$location", "$sessionStorage", "userEmail",
  function($scope, $location, $sessionStorage, userEmail) {

    $scope.nameToDisplay = userEmail.get();

    $scope.$watch(userEmail.get, function (newVal, oldVal, scope) {
        $scope.nameToDisplay = userEmail.get()
        $scope.display = ($scope.nameToDisplay !== "New User")
    });

    $scope.isCurrentTab =  (url) => url === $location.url();

    $scope.logout = () => {
      console.log("logging you out!");
      delete $sessionStorage.currentUser;
      delete $sessionStorage.userTrophies;
      delete $sessionStorage.userGroups;
      delete $sessionStorage.allUsers;
      console.log('$sessionStorage.currentUser on logout', $sessionStorage.currentUser);
      $scope.nameToDisplay = "New User"
    }

}]);