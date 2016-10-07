app.controller("HomeCtrl", ["$scope", "$sessionStorage",
  function($scope, $sessionStorage) {
     
$scope.fun = "funsies"

if ($sessionStorage.currentUser) {
  $scope.currentUserEmail = $sessionStorage.currentUser.email;
}

}]);





