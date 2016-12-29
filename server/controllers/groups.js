'use strict'

const Group = require('../models/group')

module.exports.getGroups = (req, res, err) => {
  Group
  .find()
  .then(groups => res.json({groups}))
  .catch(err)
}

module.exports.createGroup = (req, res, err) => {
  Group
    .create(req.body)
    .then((group) => {
      console.log("group", group)
      res.send("done") 
    })
}

module.exports.addUserToGroup = (req, res, err) => {
  let groupId = req.query.groupId
  let userId = req.query.userId
  Group
    .findByIdAndUpdate(groupId,
        { $push: { groupMembers: userId } }, { new: true},
        function (err, group){
          if (err) return handleError(err);
          res.send(group)
        })
  // User
  //   .findByIdAndUpdate(userId, 
  //     { $push: { groupsJoined: groupId } }, { new: true }, 
  //     function (err, user) {
  //       if (err) return handleError(err);
  //       res.send(user);
  //     })
}
