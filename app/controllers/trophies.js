app.controller("TrophiesCtrl", ["$scope", "$http",
  function($scope, $http) {
     
$scope.fun = "trophies are fun"

// $scope.trophies2 = trophyStorage

OAuth.initialize('nci1UBlarsDPP1X_cZqRAxYAxmk');

OAuth.popup('github', {cache: true})
.done(function(result) {
    result.me()
    .done(function (response) {
      if (response) {
        console.log(response);
      }
        console.log('name: ', response.name);
    })
})
.fail(function (err) {
  console.log("oauth fail?", err);
  //handle error with err
});

  $http.get('data/trophies.json').
    success(function(data) {
      $scope.trophies = data.trophies;
    }).
    error(function(data, status, headers, config) {
      // log error
    });

}]);