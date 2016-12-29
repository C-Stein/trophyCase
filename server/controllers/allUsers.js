'use strict'

const User = require('../models/user')

module.exports.get = (req, res, err) => {
    User
      .find()
      .then((users) => {
        console.log("all users data", users);
        res.json(users)
      })
      .catch(err)
    }

