app.controller("TrophiesCtrl", ["$scope", "$http", "$sessionStorage", "$location", "$q",
  function($scope, $http, $sessionStorage, $location, $q) {
     

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

let promise1 = $http.get(`/api/trophies/`)
let promise2 = $http.get(`/api/userGroups/${$scope.userId}`)

  $q.all([promise1, promise2]) //using $q b/c Promise.all requires a $scope.$apply() 
  .then(values => {
    console.log("values", values);
    $sessionStorage.userTrophies = values[0].data.trophies
    $scope.trophies = values[0].data.trophies
    $sessionStorage.userGroups = values[1].data.groups
    $scope.groups = values[1].data.groups
    putTrophyObjInGroups()
  })


putTrophyObjInGroups = () => {
  for (var i = 0; i < $scope.groups.length; i++) {
    for (var k = 0; k < $scope.groups[i].groupTrophies.length; k++) {
      //console.log($scope.groups[i].groupTrophies[k])
      for (var j = 0; j < $scope.trophies.length; j++) {
        //console.log("--",$scope.trophies[j]._id)
        if($scope.groups[i].groupTrophies[k]=== $scope.trophies[j]._id){
          //console.log(`${$scope.groups[i].groupTrophies[k]}=== ${$scope.trophies[j]._id}`);
          $scope.groups[i].groupTrophies[k] = $scope.trophies[j]
        } else {
          //
        }
      }
    }
  }
}

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
