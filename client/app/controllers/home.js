app.controller("HomeCtrl", ["$scope", "$sessionStorage", "$http", "$q", "$timeout", "$location",
  function($scope, $sessionStorage, $http, $q, $timeout, $location) {

if ($sessionStorage.currentUser) {
  $scope.loggedInUser = $sessionStorage.currentUser
  
  $scope.trophiesEarned = $sessionStorage.currentUser.trophiesEarned
  $scope.userId = $scope.loggedInUser._id
} else {
  $location.path('/login')
}

// $scope.trophies = [];
// $scope.groups = [];

let promise1 = $http.get(`/api/userTrophies/${$scope.userId}`)
let promise2 = $http.get(`/api/userGroups/${$scope.userId}`)

Promise.all([promise1, promise2]) //using $q b/c Promise.all requires a $scope.$apply() 
  .then(values => {
    console.log("values", values);
    $sessionStorage.userTrophies = values[0].data.trophies
    $scope.trophies = values[0].data.trophies
    $sessionStorage.userGroups = values[1].data.groups
    $scope.groups = values[1].data.groups
    putTrophyObjInGroups()
  })
  .then($timeout)
  .catch(console.error)


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

  //removing a trophy from a user
  $scope.removeTrophy = (id) => {
    $http.delete(`/api/users`,
                    { params: {trophyId: id, userId: $scope.userId }})
      .then((data) => {
        console.log('data after removing trophy', data);
        delete $sessionStorage.userTrophies;
        //alert "trophy removed"
      })
  }
}]);
