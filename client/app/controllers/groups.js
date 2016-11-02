app.controller("GroupsCtrl", ["$scope", "$http", "$sessionStorage",
  function($scope, $http, $sessionStorage) {
     
  $scope.fun = "groups are fun"

  if ($sessionStorage.currentUser) {
    $scope.loggedInUser = $sessionStorage.currentUser
    $scope.userId = $scope.loggedInUser._id
  }

  $http.get('/api/groups')
    .then( ({data: {groups}}) => {
      $scope.groups = groups
      console.log($scope.groups);
      
      $scope.groupsCreated = []
      for (let i = 0; i < $scope.groups.length; i++) {
        if ($scope.groups[i].groupCreator == $scope.userId) {
          $scope.groupsCreated.push($scope.groups[i])
        }
      }
    })


  $scope.joinGroup = (groupId) =>{
    console.log("group claimed");
    console.log("user id", $scope.loggedInUser._id);
    console.log("group id!", groupId);

    $http.put(`/api/userGroups`,
                {},
                { params: { groupId, userId: $scope.userId}})
      .then((data) => {
        console.log('data', data);
        delete $sessionStorage.userGroups;
        //alert "group added"
        //redirect to home page
      })
  }

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
