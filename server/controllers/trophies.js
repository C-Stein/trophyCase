'use strict'

const Trophy = require('../models/trophy')

module.exports.get = (req, res, err) => {
  Trophy
  .find()
  .then(trophies => res.json({trophies}))
  .catch(err)
}

module.exports.post = (req, res, err) => {
  console.log("req.body", req.body);
    Trophy
      .create(req.body)
      .then((trophy) => {
        console.log("trophy", trophy)
        res.send("done") 
      })
}