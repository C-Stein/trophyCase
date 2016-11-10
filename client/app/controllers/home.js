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

const indexes = []

// for each of the trophies in the  groups that the user is a member of
for (var i = 0; i < $scope.groups.length; i++) {
  for (var k = 0; k < $scope.groups[i].groupTrophies.length; k++) {
    console.log($scope.groups[i].groupTrophies[k])
    for (var j = 0; j < $scope.trophies.length; j++) {
      console.log("--",$scope.trophies[j]._id)
      if($scope.groups[i].groupTrophies[k]=== $scope.trophies[j]._id){
        console.log(`${$scope.groups[i].groupTrophies[k]}=== ${$scope.trophies[j]._id}`);
        $scope.groups[i].groupTrophies[k] = $scope.trophies[j]
      } else {
        console.log("else", i, k);
        indexes.push(k)
      }
    }
  }
}
console.log("indexes", indexes);


}]);

///////crap I might not need

// $scope.trophiesIEarned =[]

// for (var i = 0; i < $scope.trophies.length; i++) {
//   $scope.trophiesIEarned.push($scope.trophies[i]._id)
// }

// $scope.allAvailableTrophies = []
// //for each trophy in each group, replace the -id, with the trophy object
// console.log("$scope.groups", $scope.groups)
// for (var i = 0; i < $scope.groups.length; i++) {
//   console.log("$scope.groups[i].groupTrophies", $scope.groups[i].groupTrophies)
//   console.log("i", i);
//   for (var k = 0; k < $scope.groups[i].groupTrophies.length; k++) {
//     $scope.allAvailableTrophies.push($scope.groups[i].groupTrophies[k])
//   }
// }
// console.log("$scope.trophies", $scope.trophies);
//   console.log("$scope.allAvailableTrophies", $scope.allAvailableTrophies);

// $scope.intersection = (a, b) => {
//   console.log("interesection working");
//   a.filter(function(n) {
//     console.log("b.indexOf(n) != -1;", b.indexOf(n));
//     return b.indexOf(n) != -1;
// });

// }
//   $scope.intersection($scope.allAvailableTrophies, $scope.trophies)
//   console.log("$scope.allAvailableTrophies", $scope.allAvailableTrophies);
