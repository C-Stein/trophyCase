'use strict'

app.controller("LoginCtrl", 
  ["$scope", "$http", "$location", "$localStorage", "$sessionStorage", "userEmail",
  function($scope, $http, $location, $localStorage, $sessionStorage, userEmail) {

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
            $sessionStorage.currentUser = data.data.loggedInUser
            userEmail.set(data.data.loggedInUser.email)
            console.log(`logged in as ${loginUser.email}`)
          } else {
            alert(data.data.msg)
          }
          $location.path('/')
        })
        .catch(console.error)
    }
}]);
