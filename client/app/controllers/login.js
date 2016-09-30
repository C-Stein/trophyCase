'use strict'

app.controller("LoginCtrl", ["$scope", "$http", "$location",
  function($scope, $http, $location) {
     
    $scope.loginUser = () => {
      const loginUser = {
        email: $scope.email,
        password: $scope.password
      }

    $http
      .post('/login', loginUser)
      .then($location.path('/'))
      .catch(console.error)
  }

}]);