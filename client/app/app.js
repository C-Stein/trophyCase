var app = angular.module("Trophies", ['ngRoute', 'ngStorage']);

app.config(['$routeProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      }).when ('/trophies', {
        templateUrl: 'partials/trophies.html',
        controller: 'TrophiesCtrl'
      }).when ('/groups', {
        templateUrl: 'partials/groups.html',
        controller: 'GroupsCtrl',
      }).when ('/groupDetail/:id', {
        templateUrl: 'partials/groupDetail.html',
        controller: 'GroupDetailCtrl',
      }).when ('/progress', {
        templateUrl: 'partials/progress.html',
        controller: 'ProgressCtrl',
      }).when ('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl',
      }).when ('/register', {
        templateUrl: 'partials/register.html',
        controller: 'RegisterCtrl',
      }).otherwise ({
        redirectTo: '/'
      })

    //   $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false,
    // })
}]);