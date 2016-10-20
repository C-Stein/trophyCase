app.controller("GroupDetailCtrl", 
  ["$scope", "$sessionStorage", "$http", "$routeParams", "$q",
  function($scope, $sessionStorage, $http, $routeParams, $q) {
    
    $scope.groupId = $routeParams.groupId;
    $scope.groupTrophies = []
    $scope.notGroupTrophies = []

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



      console.log($scope.group);
      })


//make it work with promise.all ????

  

  $scope.createTrophy = () => {
    // saveoff currently entered info as a "trophy"
    let trophy = {
      name: $scope.trophyName,
      description: $scope.trophyDescription,
    }

    //add trophy to $scope.trophies and to the database 
    $http
      .post('/api/trophies', trophy)
      .then(() => {
          $scope.trophies.push(trophy)
          $scope.trophyName = ""
          $scope.trophyDescription = ""
          console.log("done");
        })
      .catch(console.error)
  }

  $scope.addTrophy = () =>{
    console.log("trophy added");
    // console.log("user id", $scope.loggedInUser._id);
    // console.log("group id!", groupId);

    // $http.put(`/api/userGroups`,
    //             {},
    //             { params: { groupId, userId: $scope.userId}})
    //   .then((data) => {
    //     console.log('data', data);
    //   })
  }


}]);