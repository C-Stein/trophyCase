app.controller("HomeCtrl", ["$scope", "$sessionStorage", "$http",
  function($scope, $sessionStorage, $http) {
     
$scope.fun = "funsies"

if ($sessionStorage.currentUser) {
  $scope.loggedInUser = $sessionStorage.currentUser
  
  $scope.trophiesEarned = $sessionStorage.currentUser.trophiesEarned
  $scope.userId = $scope.loggedInUser._id
  console.log($scope.loggedInUser._id);
}

if(!$sessionStorage.userTrophies){
  $http.get(`/api/userTrophies/${$scope.userId}`)
    .then( ({data}) => {
      //console.log("data, ", data);
      $sessionStorage.userTrophies = data.trophies
      //console.log("$sessionStorage.userTrophies", $sessionStorage.userTrophies)
      $scope.trophies = data.trophies
    })
} else {
  $scope.trophies = $sessionStorage.userTrophies
}

if(!$sessionStorage.userGroups){
  $http.get(`/api/userGroups/${$scope.userId}`)
    .then( ({data}) => {
      console.log("data, ", data);
      $sessionStorage.userGroups = data.groups
      $scope.groups = data.groups
    })
} else {
  $scope.groups = $sessionStorage.userGroups
}

//for each trophy in each group, replace the -id, with the trophy object
console.log("$scope.groups", $scope.groups)
for (var i = 0; i < $scope.groups.length; i++) {
  console.log("$scope.groups[i].groupTrophies", $scope.groups[i].groupTrophies)
  console.log("$scope.trophies", $scope.trophies);
//if  group trophy is in userTrophies, replace
// if($scope.trophies //includes $scope.groups[i].groupTrohies) {
  // replace $scope.groups[i].groupTrophies with actual trophy object
// } else {
     //remove from the array
//}
}

}]);
