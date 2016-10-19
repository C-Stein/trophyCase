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
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  groupMembers: {
    type: [mongoose.Schema.Types.ObjectId]
  },
  groupTrophies: {
    type: [mongoose.Schema.Types.ObjectId]
  },
})