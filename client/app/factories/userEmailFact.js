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
      return "New User"
    }
  }
}
});
