'use strict'

app.controller("LoginCtrl", 
  ["$scope", "$http", "$location", "$localStorage", "$sessionStorage",
  function($scope, $http, $location, $localStorage, $sessionStorage) {
     
    // $scope.storage = $sessionStorage;
     
    // $scope.saveEmail = (email) => {
    //   storage.email = email;
    // }

    $scope.loginUser = () => {
      const loginUser = {
        email: $scope.email,
        password: $scope.password
      }

      $http
        .post('/login', loginUser)
        .then($sessionStorage.currentUser = loginUser)
        .then(console.log(`logged in as ${loginUser.email}`))
        .then($location.path('/'))
        .catch(console.error)
    }
}]);
