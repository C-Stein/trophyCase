app.factory('allUsers', function($sessionStorage, $http) { 
  console.log("all users factory"); 

  return {
    // set: function(value) {
    //   $sessionStorage.allUsers = value;
    // },
    get: function() {
      console.log("getting all users")
      if ($sessionStorage.allUsers) {
        console.log("returning allUsers")
        return $sessionStorage.allUsers
      } else {
        $http.get(`/api/allUsers`).
          then((data) => {
            console.log("allUsersFact data", data)
            $sessionStorage.allUsers = data.data
            return data.data
          })
      } 
    }
  }
});