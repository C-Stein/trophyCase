'use strict'

const User = require('../models/user')

module.exports.addTrophyToUser = (req, res, err) => {
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
}