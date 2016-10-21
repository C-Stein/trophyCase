'use strict'

const { Router } = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Trophy = require('../models/trophy')
const Group = require('../models/group')

const router = Router()

const trophies = require('../controllers/trophies.js')
const userInfo = require('../controllers/userInfo.js')


router.post('/register', ({body: {email, password}}, res) => {
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
})

router.post('/login', ({ session, body: { email, password } }, res, err) => {
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
         session.email = email
         res.json({ loggedInUser, msg: true })
       } else {
         res.send({ msg: 'Password does not match' })
       }
      })
})

router.get('/api/trophies', trophies.get)

router.post('/api/trophies', trophies.post)

router.get('/api/userTrophies/:id', (req, res, err) => {
    let id = req.params.id 
    User
      .findOne({_id : id})
      .then((data) => {
        console.log("data", data);
        console.log("data.password", data.password);
        console.log("data.trophiesEarned", data.trophiesEarned);
        let arrayofTrophies = data.trophiesEarned
        Trophy
          .find({ _id: { $in: arrayofTrophies } } )
          .then(trophies => res.json({trophies}))
          .catch(err)
      })
      .catch(err)
    })

router.get('/api/userGroups/:id', userInfo.getUserGroups)

  router.put('/api/users', (req, res, err) => {
    let trophyId = req.query.trophyId
    let userId = req.query.userId
    
    console.log('req.query', req.query);

    console.log('trophyId', trophyId);
    console.log('userId', userId);
    
    User
      .findByIdAndUpdate(userId, 
        { $push: { trophiesEarned: trophyId } }, { new: true }, 
        function (err, user) {
          if (err) return handleError(err);
          res.send(user);
        })  
  });

  router.put('/api/userGroups', (req, res, err) => {
    let groupId = req.query.groupId
    let userId = req.query.userId
    
    console.log('req.query', req.query);

    console.log('groupId', groupId);
    console.log('userId', userId);
    
    User
      .findByIdAndUpdate(userId, 
        { $push: { groupsJoined: groupId } }, { new: true }, 
        function (err, user) {
          if (err) return handleError(err);
          res.send(user);
        })  
  });

  router.post('/api/groups', (req, res, err) => {
    console.log("req.body", req.body);
    Group
      .create(req.body)
      .then((group) => {
        console.log("group", group)
        res.send("done") 
      })
  })

router.get('/api/groups', (req, res, err) => {
  Group
  .find()
  .then(groups => res.json({groups}))
  .catch(err)
})

router.get('/api/groupDetail/:id', (req, res, err) => {
  let id = req.params.id
  console.log("getting group id thing");
  Group
  .findOne({_id : id})
  .then(group => res.json({group}))
  .catch(err)
})

router.put(`/api/groupDetail/`, (req, res, err) => {
    let groupId = req.query.groupId
    let trophyId = req.query.trophyId
    
    console.log('req.query', req.query);

    console.log('groupId', groupId);
    console.log('trophyId', trophyId);
    
    Group
      .findByIdAndUpdate(groupId, 
        { $push: { groupTrophies: trophyId } }, { new: true }, 
        function (err, group) {
          if (err) return handleError(err);
          res.send(group);
        })
})

module.exports = router
