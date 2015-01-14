/**
* Guest.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  
  attributes: {
    guestID:{
      type:'string'
    },
    meetingID:{
        type:'string'
    },
    comment:{
        type:'string'
    },
    logdatetime:{
        type:'integer'
    }
  },
  getMeetingComments_old: function(meetingID,cb) {
    console.log(cb);
    Comment.find({'meetingID':'1'}).exec(function (err, comments) {
      if (err) return cb(err);
      if (!comments) return cb(new Error('Comments not found.'));
      return cb(comments);
    });
  },
  getMeetingComments: function(meetingID,cb) {
    Comment.find({'meetingID':meetingID}).exec(function (err, guests) {
      if (err) return cb(err);
      if (!guests) return cb(new Error('User not found.'));
      return cb(guests);
    });
  }
};

