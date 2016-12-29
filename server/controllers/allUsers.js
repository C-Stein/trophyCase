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

module.exports.getGroup = (req, res, err) => {
  let id = req.params.id
  console.log(`getGroupUsers id`, id)
    User
    .find({ groupsJoined: id })//where groups == group_id
    .then((users) => {
      console.log("users in this group", users);
      res.json(users)
    })
    .catch(err)
}

