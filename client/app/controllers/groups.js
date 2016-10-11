app.controller("GroupsCtrl", ["$scope", "$http", "$sessionStorage",
  function($scope, $http, $sessionStorage) {
     
$scope.fun = "groups are fun"

if ($sessionStorage.currentUser) {
  $scope.loggedInUser = $sessionStorage.currentUser
  $scope.userId = $scope.loggedInUser._id
}

  $http.get('/api/groups')
    .then( ({data: {groups}}) => 
      $scope.groups = groups
      )

$scope.createGroup = () => {
  let group = {
      groupName: $scope.groupName,
      groupDescription: $scope.groupDescription,
      groupCreator: $scope.userId,
      groupMembers: [],
  }

  $http
    .post('/api/groups', group)
      .then(() => {
        $scope.groupName = ""
        $scope.groupDescription = ""
        console.log("done");
      })
      .catch(console.error)
}

}]);
