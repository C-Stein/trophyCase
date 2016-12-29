'use strict'

const { Router } = require('express')

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

router.post('/api/groupUsers', groups.addUserToGroup)

router.get('/api/groups', groups.getGroups)

router.get('/api/groupDetail/:id', groupDetail.getGroupDetail)

router.put(`/api/groupDetail/`, groupDetail.addTrophyToGroup)

module.exports = router
