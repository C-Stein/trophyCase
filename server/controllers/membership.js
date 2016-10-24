'use strict'

const bcrypt = require('bcrypt')
const User = require('../models/user')

module.exports.register = ({body: {email, password}}, res) => {
      return new Promise((resolve, reject) => {
      bcrypt.hash(password, 8, (err, hash) => {
              if (err) {
                reject(err)
              } else {
                resolve(hash)
              }
            })
          })
      .then(hash =>  {
        res.send({msg:"User successfully created"})
        return User.create({ email, password: hash })
      })
      .catch(console.error)
}