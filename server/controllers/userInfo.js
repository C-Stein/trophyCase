'use strict'

const User = require('../models/user')
const Trophy = require('../models/trophy')
const Group = require('../models/group')

module.exports.getUserGroups = (req, res, err) => {
    let id = req.params.id 
    User
      .findOne({_id : id})
      .then((data) => {
        console.log("data", data);
        console.log("data.password", data.password);
        console.log("data.groupsJoined", data.groupsJoined);
        let arrayofGroups = data.groupsJoined
        Group
          .find({ _id: { $in: arrayofGroups } } )
          .then(groups => res.json({groups}))
          .catch(err)
      })
      .catch(err)
    }