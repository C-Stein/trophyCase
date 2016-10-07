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
        .then((data) => {
          console.log('data.data: ', data.data)
          if (data.data.msg == true) {
            $sessionStorage.currentUser = loginUser
            console.log(`logged in as ${loginUser.email}`)
          } else {
            alert(data.data.msg)
          }
          $location.path('/')
        })
        .catch(console.error)
    }
}]);
