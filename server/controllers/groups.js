'use strict'

const Group = require('../models/group')

module.exports.getGroups = (req, res, err) => {
  Group
  .find()
  .then(groups => res.json({groups}))
  .catch(err)
}

module.exports.createGroup = (req, res, err) => {
  console.log("req.body", req.body);
  Group
    .create(req.body)
    .then((group) => {
      console.log("group", group)
      res.send("done") 
    })
}