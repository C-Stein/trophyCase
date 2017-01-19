'use strict'

const { json } = require('body-parser')
const express = require('express')
const bcrypt = require('bcrypt')
//const session = require('express-session')
//const RedisStore = require('connect-redis')(session)

const { connect } = require('./database/database')
const routes = require('./routes/')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('client'))

app.use(json())

// app.use(session({
//   'store': new RedisStore({
//     url: process.env.REDIS_URL || 'redis://localhost:6379'
//   }),
//   'secret': 'supersecretkey' //fine to put this on github
// }))

// app.use((req, res, next) => {
//   app.locals.email = req.session.email
//   console.log("user-mail: ", app.locals.email);
//   next()
// })

app.use(routes)

//listen
connect()
  .then(() => {
    app.listen(PORT, () => {
    console.log(`Hey, I'm listening on port ${PORT}`);
    })
  })
  .catch(console.error)
