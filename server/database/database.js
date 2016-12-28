'use strict'

const auth = require('../authTokens')

const mongoose = require('mongoose');

const MONGODB_URL = `mongodb://${auth.owner}:${auth.password}@ds145128.mlab.com:45128/trophy_case`

mongoose.Promise = Promise;

module.exports.connect = () => mongoose.connect(MONGODB_URL)