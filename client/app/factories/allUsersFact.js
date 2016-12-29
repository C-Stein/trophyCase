app.factory('allUsers', function($sessionStorage, $http) { 
  console.log("all users factory"); 

  return {
    get: function() {
      console.log("getting all users")
      if ($sessionStorage.allUsers) {
        return new Promise((res, rej) => {
          console.log("returning allUsers from sessionStorage")
          res($sessionStorage.allUsers)
        })
      } else {
        return new Promise((res, rej) =>{
          $http.get(`/api/allUsers`)
            .then((data) => {
              console.log("allUsersFact data", data)
              $sessionStorage.allUsers = data.data
              res(data.data)
            })
        })
      } 
    }
  }
});