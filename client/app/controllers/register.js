app.controller("RegisterCtrl", ["$scope", "$http", "$location",
  function($scope, $http, $location) {
     

  $scope.registerUser = () => {

    const newUser = {
      email: $scope.email,
      password: $scope.password
      }

    $http
      .post('/register', newUser)
      .then($location.path('/login'))
      .catch(console.error)
  }


}]);



