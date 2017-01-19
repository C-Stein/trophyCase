'use strict'

const User = require('../models/user')

module.exports.addTrophyToUser = (req, res, err) => {
  let trophyId = req.query.trophyId
  let userId = req.query.userId
  
  User
    .findByIdAndUpdate(userId, 
      { $push: { trophiesEarned: trophyId } }, { new: true }, 
      function (err, user) {
        if (err) return handleError(err);
        res.send(user);
      })  
}

module.exports.addGroupToUser = (req, res, err) => {
  let groupId = req.query.groupId
  let userId = req.query.userId
  
  User
    .findByIdAndUpdate(userId, 
      { $push: { groupsJoined: groupId } }, { new: true }, 
      function (err, user) {
        if (err) return handleError(err);
        res.send(user);
      })  
}

module.exports.removeTrophy = (req, res, err) => {
  let trophyId = req.query.trophyId
  let userId = req.query.userId

  console.log("REMOVING TROPHY", req.query)

    User
    .findByIdAndUpdate(userId, 
     { $pull: { trophiesEarned: trophyId } }, { new: true }, 
      //{ $push: { trophiesEarned: trophyId } }, { new: true }, 
      function (err, user) {
        if (err) return handleError(err);
        res.send(user);
      }) 
}
