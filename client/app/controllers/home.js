app.controller("HomeCtrl", ["$scope", "$sessionStorage",
  function($scope, $sessionStorage) {
     
$scope.fun = "funsies"

$scope.currentUserEmail = $sessionStorage.currentUser.email;


}]);





