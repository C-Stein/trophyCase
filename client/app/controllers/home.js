app.controller("HomeCtrl", ["$scope", "$sessionStorage", "$http",
  function($scope, $sessionStorage, $http) {
     
$scope.fun = "funsies"

if ($sessionStorage.currentUser) {
  $scope.loggedInUser = $sessionStorage.currentUser
  $scope.currentUserEmail = $sessionStorage.currentUser.email;
  $scope.trophiesEarned = $sessionStorage.currentUser.trophiesEarned
  $scope.userId = $scope.loggedInUser._id
  console.log($scope.loggedInUser._id);
}

$http.get(`/api/userTrophies/${$scope.userId}`)
  .then( ({data}) => {
    console.log("data, ", data);
    $scope.trophies = data.trophies
  }
    )

}]);





