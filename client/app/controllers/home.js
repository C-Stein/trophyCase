app.controller("HomeCtrl", ["$scope", "$sessionStorage", "$http",
  function($scope, $sessionStorage, $http) {
     
$scope.fun = "funsies"

if ($sessionStorage.currentUser) {
  $scope.loggedInUser = $sessionStorage.currentUser
  $scope.currentUserEmail = $sessionStorage.currentUser.email;
  $scope.trophiesEarned = $sessionStorage.currentUser.trophiesEarned
}

$http.get('/api/userTrophies')
  .then( ({data}) => {
    console.log("data, ", data);
    $scope.trophies = data.trophies[0]
  }
    )

}]);





