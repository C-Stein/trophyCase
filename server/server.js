'use strict'

const { json } = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/trophycase'
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('client'))

app.use(json())

app.use(session({
  'store': new RedisStore({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  }),
  'secret': 'supersecretkey' //fine to put this on github
}))

app.use((req, res, next) => {
  app.locals.email = req.session.email
  console.log("user-mail: ", app.locals.email);
  next()
})

mongoose.Promise  = Promise

const Trophy = mongoose.model('trophy', {
  name: String,
  description: String
})

app.post('/login', ({ session, body: { email, password } }, res, err) => {
  User.findOne({ email })
     .then(user => {
       if (user) {
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
         res.render('login', { msg: 'Email does not exist in our system' })
       }
     })
     .then((matches) => {
       if (matches) {
         session.email = email
         res.redirect('/')
       } else {
         res.render('login', { msg: 'Password does not match' })
       }
      })
})

app.post('/register', ({body: {email, password}}, res) => {
      return new Promise((resolve, reject) => {
      bcrypt.hash(password, 15, (err, hash) => {
              if (err) {
                reject(err)
              } else {
                resolve(hash)
              }
            })
          })
      .then(hash => User.create({ email, password: hash }))
      .then(() => res.redirect('/login'))
      .catch(console.error)
})

app.get('/api/trophies', (req, res, err) => {
  Trophy
  .find()
  .then(trophies => res.json({trophies}))
  .catch(err)
})

mongoose.connect(MONGODB_URL, () => 
  app.listen(PORT, () => console.log(`listening on port ${PORT}`))
)