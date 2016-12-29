app.controller("GroupsCtrl", ["$scope", "$http", "$sessionStorage", "$location",
  function($scope, $http, $sessionStorage, $location) {
     


  if ($sessionStorage.currentUser) {
    $scope.loggedInUser = $sessionStorage.currentUser
    $scope.userId = $scope.loggedInUser._id
  } else {
    $location.path('/login')
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

    $http.put(`/api/userGroups`,
                {},
                { params: { groupId, userId: $scope.userId}})
      .then((data) => {
        delete $sessionStorage.userGroups;
        //alert "group added"
        //redirect to home page
      })
    $http.post(`/api/groupUsers`,
                {},
                { params: { groupId, userId: $scope.userId}})
      .then((data) => {
        console.log("new data", data)
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
          $scope.groupsCreated.push(group)
          $scope.groups.push(group)
        })
        .catch(console.error)
  }

}]);
