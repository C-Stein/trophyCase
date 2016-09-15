var app = angular.module("Trophies", ['ngRoute']);

OAuth.initialize('nci1UBlarsDPP1X_cZqRAxYAxmk');

// OAuth.popup('github')
// .done(function(result) {
//   //use result.access_token in your API request 
//   //or use result.get|post|put|del|patch|me methods (see below)
// })
// .fail(function (err) {
//   //handle error with err
// });

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'//,
        // resolve: {
        //   "currentAuth": ["Auth", function(Auth) {
        //     return Auth.$requireAuth();
        //   }]
        //}
      }).when ('/trophies', {
        templateUrl: 'partials/trophies.html',
        controller: 'TrophiesCtrl'
      }).when ('/groups', {
        templateUrl: 'partials/groups.html',
        controller: 'GroupsCtrl',
        // resolve: {
        //   "currentAuth": ["Auth", function(Auth) {
        //     return Auth.$requireAuth();
        //   }]
        // }
      }).when ('/about', {
        templateUrl: 'partials/about.html',
        controller: 'AboutCtrl',
        resolve: {
          "currentAuth": ["Auth", function(Auth) {
            return Auth.$requireAuth();
          }]
        }
      }).otherwise ({
        redirectTo: '/'
      });
}]);