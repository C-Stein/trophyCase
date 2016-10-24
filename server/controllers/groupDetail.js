'use strict'

const Group = require('../models/group')

module.exports.getGroupDetail = (req, res, err) => {
  let id = req.params.id
  Group
  .findOne({_id : id})
  .then(group => res.json({group}))
  .catch(err)
}

module.exports.addTrophyToGroup = (req, res, err) => {
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
}