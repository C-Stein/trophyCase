'use strict'

const Group = require('../models/group')

module.exports.getGroups = (req, res, err) => {
  Group
  .find()
  .then(groups => res.json({groups}))
  .catch(err)
}