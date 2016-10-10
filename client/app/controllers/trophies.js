app.controller("TrophiesCtrl", ["$scope", "$http", "$sessionStorage",
  function($scope, $http, $sessionStorage) {
     
$scope.fun = "trophies are fun"

$http.get('/api/trophies')
  .then( ({data: {trophies}}) => 
    $scope.trophies = trophies
    )

if ($sessionStorage.currentUser) {
  $scope.loggedInUser = $sessionStorage.currentUser
  $scope.userId = $scope.loggedInUser._id
}

$scope.claimTrophy = (id) => {
  console.log("trophy claimed");
  console.log("user id", $scope.loggedInUser._id);
  console.log("trophy id!", id);
}


}]);