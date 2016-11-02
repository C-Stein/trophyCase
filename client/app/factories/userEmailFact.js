app.factory('userEmail', function($sessionStorage) { 
console.log("factory"); 
return {
  set: function(value) {
    $sessionStorage.currentUser.email = value;
  },
  get: function() {
    if ($sessionStorage.currentUser) {
      return $sessionStorage.currentUser.email
    } else {
      return "new user"
    }
  }
}
});


// appServices.factory('AuthService', function ($localStorage){
//     return {
//         set: function(entidy, value) {
//             $localStorage[entidy] = value;
//         },
//         get: function(entidy) {
//            return $localStorage[entidy];
//         }
//     }
// });