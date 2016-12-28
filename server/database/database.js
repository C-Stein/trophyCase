'use strict'

const mongoose = require('mongoose');

const MONGODB_URL = 'mongodb://trophy_owner:PASSWORD@ds145128.mlab.com:45128/trophy_case'

mongoose.Promise = Promise;

module.exports.connect = () => mongoose.connect(MONGODB_URL)