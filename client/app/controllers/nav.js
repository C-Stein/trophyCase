'use strict'

app.controller("NavCtrl", 
  ["$scope", "$http", "$location", "$sessionStorage",
  function($scope, $http, $location, $sessionStorage) {

    $scope.currentUserEmail = $sessionStorage.currentUser.email;


}]);