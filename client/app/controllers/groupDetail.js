app.controller("GroupDetailCtrl", ["$scope", "$sessionStorage", "$http",
  function($scope, $sessionStorage, $http) {
     
$scope.fun = "funsies"

$scope.trophies =[]

$scope.group = {
                groupName: "example",
                groupDescription: "example description",
                groupCreator: "",
                groupMembers: [],
                groupTrophies: [],
              }

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