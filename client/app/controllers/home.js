app.controller("HomeCtrl", ["$scope", "$sessionStorage", "$http",
  function($scope, $sessionStorage, $http) {
     
$scope.fun = "funsies"

if ($sessionStorage.currentUser) {
  $scope.loggedInUser = $sessionStorage.currentUser
  
  $scope.trophiesEarned = $sessionStorage.currentUser.trophiesEarned
  $scope.userId = $scope.loggedInUser._id
  //console.log($scope.loggedInUser._id);
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


}]);
