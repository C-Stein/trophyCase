app.controller("TrophiesCtrl", ["$scope", "$http", "$sessionStorage", "$location",
  function($scope, $http, $sessionStorage, $location) {
     

  $http.get('/api/trophies')
    .then( ({data: {trophies}}) => 
      $scope.trophies = trophies
      )

  if ($sessionStorage.currentUser) {
    $scope.loggedInUser = $sessionStorage.currentUser
    $scope.userId = $scope.loggedInUser._id
  } else {
    $location.path('/login')
  }

  // get (and list) all groups for logged in user

  //get (and list) all trophies for groups

  //adding a trophy to a user
  $scope.claimTrophy = (id) => {
    console.log("trophy claimed");
    console.log("user id", $scope.loggedInUser._id);
    console.log("trophy id!", id);

    $http.put(`/api/users`,
                {},
                { params: { trophyId: id, userId: $scope.userId}})
      .then((data) => {
        console.log('data', data);
        delete $sessionStorage.userTrophies;
        //alert "trophy added"
        //and/or redirect
      })
  }
}]);
