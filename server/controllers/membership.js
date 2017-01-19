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

module.exports.login = ({ session, body: { email, password } }, res, err) => {
  let loggedInUser;
  User.findOne({ email })
     .then(user => {
       if (user) {
        loggedInUser = user;
         return new Promise((resolve, reject) =>
           bcrypt.compare(password, user.password, (err, matches) => {
             if (err) {
               reject(err)
             } else {
               resolve(matches)
             }
           })
         )
       } else {
         res.send({ msg: 'Email does not exist in our system' })
       }
     })
     .then((matches) => {
       if (matches) {
         //session.email = email
         res.json({ loggedInUser, msg: true })
       } else {
         res.send({ msg: 'Password does not match' })
       }
      })
}