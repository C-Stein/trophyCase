'use strict'

const { Router } = require('express')
const User = require('../models/user')
const Trophy = require('../models/trophy')
const Group = require('../models/group')

const router = Router()

const trophies = require('../controllers/trophies.js')
const groups = require('../controllers/groups.js')
const userInfo = require('../controllers/userInfo.js')
const membership = require('../controllers/membership.js')
const updateUser = require('../controllers/updateUser.js')
const groupDetail = require('../controllers/groupDetail.js')


router.post('/register', membership.register)

router.post('/login', membership.login)

router.get('/api/trophies', trophies.get)

router.post('/api/trophies', trophies.post)

router.get('/api/userTrophies/:id', userInfo.getUserTrophies)

router.get('/api/userGroups/:id', userInfo.getUserGroups)

router.put('/api/users', updateUser.addTrophyToUser);

router.put('/api/userGroups', updateUser.addGroupToUser);

router.post('/api/groups', groups.createGroup)

router.get('/api/groups', groups.getGroups)

router.get('/api/groupDetail/:id', groupDetail.getGroupDetail)

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
