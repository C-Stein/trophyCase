app.controller("GroupsCtrl", ["$scope", "$http", "$sessionStorage",
  function($scope, $http, $sessionStorage) {
     
$scope.fun = "groups are fun"

if ($sessionStorage.currentUser) {
  $scope.loggedInUser = $sessionStorage.currentUser
  $scope.userId = $scope.loggedInUser._id
}

$scope.createGroup = () => {
  const group = {
      groupName: $scope.groupName,
      groupDescription: $scope.groupDescription,
      groupCreator: $scope.userId,
      groupMembers: [],
  }

  $http
    .post('/api/groups', group)
      .then(() => {
        console.log("done");
      })
      .catch(console.error)
}

}]);
