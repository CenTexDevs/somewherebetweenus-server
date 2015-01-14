/**
* Comment.js
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
  findByMeetingID: function(meetingID,cb) {

    console.log('meetingID is '+query.meetingID);

    Comment.find({'meetingID':meetingID}).exec(function (err, comments) {
      if (err) return cb(err);
      if (!comments) return cb(new Error('Comments not found.'));
      return cb(comments);
    });
  }
};

