'use strict'

const mongoose = require('mongoose')

module.exports = mongoose.model('trophy', {
  name: String,
  description: String
})