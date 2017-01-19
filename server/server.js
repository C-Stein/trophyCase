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

app.use(routes)

//listen
connect()
  .then(() => {
    app.listen(PORT, () => {
    console.log(`Hey, I'm listening on port ${PORT}`);
    })
  })
  .catch(console.error)
