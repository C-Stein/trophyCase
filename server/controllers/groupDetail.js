'use strict'

const Group = require('../models/group')

module.exports.getGroupDetail = (req, res, err) => {
  let id = req.params.id
  Group
  .findOne({_id : id})
  .then(group => res.json({group}))
  .catch(err)
}