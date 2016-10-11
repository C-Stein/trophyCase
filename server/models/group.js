'use strict'

const mongoose = require('mongoose')

module.exports = mongoose.model('Group', {
  groupName: {
    type: String,
    required: true,
    index: { unique: true },
  },
  groupDescription: {
    type: String,
    required: true,
  },
  groupCreator: {
    type: ObjectId,
    required: true,
  },
  groupMembers: {
    type: [ObjectId]
  },
})