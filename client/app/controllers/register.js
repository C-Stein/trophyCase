app.controller("RegisterCtrl", ["$scope", "$http",
  function($scope, $http) {
     

  $scope.registerUser = () => {
    console.log("registering user!");

    const newUser = {
      email: $scope.email,
      password: $scope.password
      }

    console.log("newUser ", newUser);

    $http
      .post('/register', newUser)
      .then(newUser => console.log('newUser ', newUser))
      .catch(console.error)
  }


}]);



