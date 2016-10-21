'use strict'

const Trophy = require('../models/trophy')

module.exports.get = (req, res, err) => {
  Trophy
  .find()
  .then(trophies => res.json({trophies}))
  .catch(err)
}