app.controller("TrophiesCtrl", ["$scope", "$http",
  function($scope, $http) {
     
$scope.fun = "trophies are fun"

$http.get('/api/trophies')
  .then( ({data: {trophies}}) => 
    $scope.trophies = trophies
    )


}]);