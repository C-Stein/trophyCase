app.controller("GroupDetailCtrl", 
  ["$scope", "$sessionStorage", "$http", "$routeParams", "$q", "$location", "allUsers",
  function($scope, $sessionStorage, $http, $routeParams, $q, $location, allUsers) {
    
    $scope.groupId = $routeParams.groupId;
    $scope.groupTrophies = []
    $scope.notGroupTrophies = []

  if ($sessionStorage.currentUser) {
    $scope.loggedInUser = $sessionStorage.currentUser
    $scope.userId = $scope.loggedInUser._id
  } else {
    $location.path('/login')
  }

//make it work w/o promise.all

    $http
      .get(`/api/groupDetail/${$scope.groupId}`)
      .then( ({data: {group}}) => {
        $scope.group = group

        $http.get('/api/trophies')
          .then( ({data: {trophies}}) => {
            $scope.allTrophies = trophies
          
          
          //$scope.trophies = group.groupTrophies

          //for each trophy in $scope.allTrophies
          for (let i = 0; i < $scope.allTrophies.length; i++) {
          //if the _id == any of the _ids in group.groupTrophies
            if (group.groupTrophies.includes($scope.allTrophies[i]._id)) {
          //push to $scope.groupTrophies
              $scope.groupTrophies.push($scope.allTrophies[i])
            } else {
          //else push to $scope.notGroupTrophies
              $scope.notGroupTrophies.push($scope.allTrophies[i])
            }
          }
          })
      listMembers()
      console.log($scope.group);
      })


    listMembers = () => {
      allUsers.get().then((data) => {
        $scope.something = data
        console.log("something", $scope.something)
      })
      $scope.members = $scope.group.groupMembers
    }

//make it work with promise.all 

  $scope.createTrophy = () => {
    // saveoff currently entered info as a "trophy"
    let trophy = {
      name: $scope.trophyName,
      description: $scope.trophyDescription,
    }

    //add trophy to $scope.notGroupTrophies and to the database 
    $http
      .post('/api/trophies', trophy)
      .then(() => {
          $scope.trophyName = ""
          $scope.trophyDescription = ""
          $scope.notGroupTrophies.push(trophy)
          console.log("done");
        })
      .catch(console.error)
  }

  $scope.addTrophy = (trophyId, trophy) =>{
    console.log("trophy added");
    console.log("trophy id!", trophyId);

    $http.put(`/api/groupDetail/`,
                {},
                { params: { groupId: $scope.groupId, trophyId}})
      .then((data) => {
        console.log('data', data);
        //push and pop from appropriate $scope.arrays
        $scope.notGroupTrophies = 
          $scope.notGroupTrophies.filter(item => item !== trophy);
        $scope.groupTrophies.push(trophy)
      })
  }

}]);